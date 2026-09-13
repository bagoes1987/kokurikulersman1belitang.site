<?php
/**
 * FINCESTEM 2026 - Student Photo Upload Endpoint
 * Menyimpan foto profil siswa yang diunggah dari HP ke server dan database
 */
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Metode HTTP harus POST', null, 405);
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

// Bersihkan NISN untuk nama file
$cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
$filename = 'foto_' . $cleanNisn . '_' . time() . '.' . $ext;
$targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
$relativeUrl = '../uploads/foto/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    jsonResponse(false, 'Gagal menyimpan foto ke server hosting!', null, 500);
}

// Hapus foto profil lama jika ada
try {
    $pdo = getDB();
    $stmtOld = $pdo->prepare("SELECT `photo_url` FROM `users` WHERE `identifier` = :id OR `nis` = :nis LIMIT 1");
    $stmtOld->execute([':id' => $nisn, ':nis' => $nisn]);
    $oldRow = $stmtOld->fetch();
    if ($oldRow && !empty($oldRow['photo_url'])) {
        $oldFile = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . basename($oldRow['photo_url']);
        if (file_exists($oldFile) && $oldFile !== $targetPath) {
            @unlink($oldFile);
        }
    }

    // Update URL foto di database
    $stmt = $pdo->prepare("
        UPDATE `users` 
        SET `photo_url` = :url 
        WHERE `identifier` = :id OR `nis` = :nis
    ");
    $stmt->execute([
        ':url' => $relativeUrl,
        ':id'  => $nisn,
        ':nis' => $nisn
    ]);

    jsonResponse(true, 'Foto profil berhasil diperbarui!', [
        'photo_url' => $relativeUrl,
        'filename'  => $filename,
        'nisn'      => $nisn
    ]);
} catch (Exception $e) {
    // Tetap kembalikan sukses file jika db gagal terhubung lokal
    jsonResponse(true, 'Foto tersimpan di server!', [
        'photo_url' => $relativeUrl,
        'filename'  => $filename,
        'nisn'      => $nisn,
        'db_note'   => $e->getMessage()
    ]);
}
