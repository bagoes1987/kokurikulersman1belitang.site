<?php
/**
 * FINCESTEM 2026 - Student Photo Upload Endpoint
 * Menyimpan foto profil siswa yang diunggah dari HP ke server dan database
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDB();
        $stmt = $pdo->query("
            SELECT `identifier`, `nis`, `photo_url`, `zone` 
            FROM `users` 
            WHERE (`role` = 'siswa' OR `role` IS NULL) AND `photo_url` IS NOT NULL AND `photo_url` != ''
        ");
        $photos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse(true, 'Data foto profil siswa berhasil dimuat', $photos);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memuat daftar foto: ' . $e->getMessage(), []);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Metode HTTP harus GET atau POST', null, 405);
}

$nisn = trim($_POST['nisn'] ?? '');
if (!$nisn) {
    // Coba baca dari header atau request
    $nisn = trim($_GET['nisn'] ?? '');
}

if (!$nisn) {
    jsonResponse(false, 'Parameter NISN siswa diperlukan!', null, 400);
}

if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['photo']['error'] ?? 'FILE_MISSING';
    jsonResponse(false, 'Gagal menerima file foto. Kode error: ' . $errCode, null, 400);
}

$file = $_FILES['photo'];
$maxSize = 5 * 1024 * 1024; // 5 MB
if ($file['size'] > $maxSize) {
    jsonResponse(false, 'Ukuran foto maksimal 5 MB!', null, 400);
}

// Validasi MIME type
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
$allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp'
];

if (!isset($allowedMimes[$mime])) {
    jsonResponse(false, 'Format file tidak didukung! Harap unggah foto berekstensi JPG, PNG, atau WEBP.', null, 400);
}

$ext = $allowedMimes[$mime];
$targetDir = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto';
if (!file_exists($targetDir)) {
    @mkdir($targetDir, 0755, true);
}

// Bersihkan NISN untuk nama file & siapkan seluruh variasi ID (padded 10 digit, unpadded, NIS)
$cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
$unpadded = ltrim($cleanNisn, '0');
$padded = (strlen($cleanNisn) >= 8 && strlen($cleanNisn) <= 10) ? str_pad($cleanNisn, 10, '0', STR_PAD_LEFT) : $cleanNisn;
$allIds = array_values(array_unique(array_filter([$nisn, $cleanNisn, $unpadded, $padded])));

$filename = 'foto_' . $cleanNisn . '_' . time() . '.' . $ext;
$targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
$relativeUrl = '../uploads/foto/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    jsonResponse(false, 'Gagal menyimpan foto ke server hosting!', null, 500);
}

try {
    $pdo = getDB();

    // 1. Kumpulkan seluruh ID siswa di database (identifier, nis)
    $inTemp = "'" . implode("','", array_map('addslashes', $allIds)) . "'";
    $uFind = $pdo->query("SELECT `id`, `identifier`, `nis`, `photo_url` FROM `users` WHERE `identifier` IN ($inTemp) OR `nis` IN ($inTemp)");
    if ($uFind) {
        while ($ur = $uFind->fetch()) {
            if (!empty($ur['identifier'])) $allIds[] = $ur['identifier'];
            if (!empty($ur['nis'])) $allIds[] = $ur['nis'];
            if (!empty($ur['photo_url'])) {
                $oldFile = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . basename($ur['photo_url']);
                if (file_exists($oldFile) && $oldFile !== $targetPath && is_file($oldFile)) {
                    @unlink($oldFile);
                }
            }
        }
    }
    $allIds = array_values(array_unique(array_filter($allIds)));
    $inIds = "'" . implode("','", array_map('addslashes', $allIds)) . "'";

    // Hapus file fisik foto profil lama berdasarkan variasi nama file
    foreach ([$cleanNisn, $unpadded, $padded] as $cid) {
        if ($cid) {
            $pattern = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . 'foto_' . $cid . '_*.*';
            $matched = glob($pattern);
            if ($matched) {
                foreach ($matched as $mf) {
                    if (is_file($mf) && $mf !== $targetPath) {
                        @unlink($mf);
                    }
                }
            }
        }
    }

    // 2. Perbarui seluruh record pengguna yang cocok di tabel users
    $updStmt = $pdo->prepare("UPDATE `users` SET `photo_url` = :url WHERE `identifier` IN ($inIds) OR `nis` IN ($inIds)");
    $updStmt->execute([':url' => $relativeUrl]);
    $affected = $updStmt->rowCount();

    // 3. Jika user sama sekali belum terdaftar di tabel users, sisipkan otomatis
    if ($affected === 0) {
        $studentName = trim($_POST['nama'] ?? $_POST['name'] ?? ('Peserta Didik NISN ' . $cleanNisn));
        $studentNis = trim($_POST['nis'] ?? $unpadded);
        $studentClass = trim($_POST['class_name'] ?? '');
        $studentZone = trim($_POST['zone'] ?? 'FINCESTEM OKU TIMUR');
        $gradeLevel = 'X';
        if (strpos($studentClass, 'XI') !== false && strpos($studentClass, 'XII') === false) $gradeLevel = 'XI';
        if (strpos($studentClass, 'XII') !== false) $gradeLevel = 'XII';

        $insStmt = $pdo->prepare("
            INSERT INTO `users` (`identifier`, `nis`, `password_hash`, `name`, `role`, `grade_level`, `class_name`, `photo_url`, `zone`) 
            VALUES (:id, :nis, :pwd, :name, 'siswa', :grade, :class, :url, :zone)
            ON DUPLICATE KEY UPDATE `photo_url` = VALUES(`photo_url`)
        ");
        $insStmt->execute([
            ':id'    => $padded,
            ':nis'   => $studentNis,
            ':pwd'   => $studentNis,
            ':name'  => $studentName,
            ':grade' => $gradeLevel,
            ':class' => $studentClass,
            ':url'   => $relativeUrl,
            ':zone'  => $studentZone
        ]);
    }

    // 4. Nonaktifkan flag foto_profil pada student_reset_meta agar foto baru TIDAK terhapus otomatis oleh reset lama
    try {
        $stmtMeta = $pdo->query("SELECT `nisn`, `components` FROM `student_reset_meta` WHERE `nisn` IN ($inIds)");
        if ($stmtMeta) {
            while ($mRow = $stmtMeta->fetch()) {
                if (!empty($mRow['components'])) {
                    $compObj = json_decode($mRow['components'], true);
                    if (is_array($compObj) && !empty($compObj['foto_profil'])) {
                        $compObj['foto_profil'] = false;
                        $updMeta = $pdo->prepare("UPDATE `student_reset_meta` SET `components` = :c WHERE `nisn` = :n");
                        $updMeta->execute([':c' => json_encode($compObj), ':n' => $mRow['nisn']]);
                    }
                }
            }
        }
    } catch (Exception $eMeta) {}

    jsonResponse(true, 'Foto profil siswa berhasil disimpan dan disinkronkan ke seluruh portal!', [
        'photo_url'  => $relativeUrl,
        'clean_url'  => 'uploads/foto/' . $filename,
        'filename'   => $filename,
        'nisn'       => $nisn,
        'clean_nisn' => $cleanNisn,
        'updated'    => true
    ]);
} catch (Exception $e) {
    jsonResponse(true, 'Foto tersimpan di server hosting!', [
        'photo_url'  => $relativeUrl,
        'clean_url'  => 'uploads/foto/' . $filename,
        'filename'   => $filename,
        'nisn'       => $nisn,
        'db_note'    => $e->getMessage()
    ]);
}
