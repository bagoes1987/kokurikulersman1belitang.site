<?php
/**
 * FINCESTEM 2026 - Dokumentasi Media Lapangan (Foto & Video) API
 * Mendukung pemisahan foto kamera HP (Geotag Otentik) vs unggahan galeri
 * Terintegrasi ke portal Fasilitator, Koordinator, dan Admin
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'list';
$pdo = getDB();

if ($action === 'list') {
    $where = [];
    $params = [];

    $groupId = (int)($_GET['group_id'] ?? 0);
    if ($groupId > 0) {
        $where[] = "d.group_id = :gid";
        $params[':gid'] = $groupId;
    }

    $nisn = trim($_GET['nisn'] ?? '');
    if ($nisn !== '') {
        $where[] = "d.uploaded_by_nisn = :nisn";
        $params[':nisn'] = $nisn;
    }

    $className = trim($_GET['class_name'] ?? '');
    if ($className !== '') {
        $where[] = "(g.class_name = :cls OR u.class_name = :cls)";
        $params[':cls'] = $className;
    }

    $source = trim($_GET['source'] ?? '');
    if ($source !== '') {
        $where[] = "d.source = :src";
        $params[':src'] = $source;
    }

    $whereSql = !empty($where) ? ('WHERE ' . implode(' AND ', $where)) : '';
    $limit = min(500, max(1, (int)($_GET['limit'] ?? 300)));

    $sql = "
        SELECT d.*, 
               COALESCE(g.name, 'Kelompok Riset') AS group_name, 
               COALESCE(g.class_name, u.class_name, '-') AS class_name, 
               COALESCE(g.zone, u.zone, 'OKU TIMUR') AS zone,
               COALESCE(u.name, d.uploaded_by_nisn, 'Peserta Didik') AS student_name
        FROM `dokumentasi_media` d
        LEFT JOIN `groups` g ON d.group_id = g.id
        LEFT JOIN `users` u ON (d.uploaded_by_nisn = u.identifier OR d.uploaded_by_nisn = u.nis)
        $whereSql
        ORDER BY d.created_at DESC
        LIMIT $limit
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    // Pastikan field source dan has_geotag konsisten di setiap row
    $media = array_map(function($r) {
        $src = !empty($r['source']) ? $r['source'] : (!empty($r['gps_location']) ? 'camera' : 'gallery');
        $hasGps = (isset($r['has_geotag']) && $r['has_geotag'] !== null) 
            ? (int)$r['has_geotag'] 
            : (($src === 'camera' && !empty($r['gps_location'])) ? 1 : 0);
        $r['source'] = $src;
        $r['has_geotag'] = $hasGps;
        return $r;
    }, $rows);

    jsonResponse(true, 'Dokumentasi berhasil diambil', $media);
}

if ($action === 'add') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) $input = $_POST;

    $groupId     = (int)($input['group_id'] ?? 0);
    $title       = trim($input['title'] ?? 'Dokumentasi Riset Lapangan');
    $caption     = trim($input['caption'] ?? '');
    $mediaType   = trim($input['media_type'] ?? 'foto');
    $fileUrl     = trim($input['file_url'] ?? '');
    $source      = trim($input['source'] ?? 'camera');
    $hasGeotag   = isset($input['has_geotag']) ? (int)$input['has_geotag'] : ($source === 'camera' ? 1 : 0);
    $gpsLocation = trim($input['gps_location'] ?? '');
    if ($source === 'gallery' || $hasGeotag === 0) {
        $gpsLocation = ''; // Galeri tidak memiliki geotag
    }
    $uploadedBy  = trim($input['uploaded_by'] ?? '');

    if (!$fileUrl) {
        jsonResponse(false, 'File Media wajib disertakan!');
    }

    // Jika file_url berupa Base64 Data URL, simpan sebagai file fisik JPG di server hosting
    if (preg_match('/^data:image\/(\w+);base64,/', $fileUrl, $type)) {
        $data = substr($fileUrl, strpos($fileUrl, ',') + 1);
        $decoded = base64_decode($data);
        if ($decoded !== false) {
            $destDir = UPLOAD_DIR . DIRECTORY_SEPARATOR . 'foto';
            if (!file_exists($destDir)) {
                @mkdir($destDir, 0755, true);
            }
            $cleanUser = preg_replace('/[^a-zA-Z0-9_-]/', '', $uploadedBy) ?: 'siswa';
            $prefix = ($source === 'camera') ? 'dok_cam_' : 'dok_gal_';
            $fileName = $prefix . $cleanUser . '_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.jpg';
            $filePath = $destDir . DIRECTORY_SEPARATOR . $fileName;
            if (@file_put_contents($filePath, $decoded)) {
                $fileUrl = 'uploads/foto/' . $fileName;
            }
        }
    }

    if ($groupId <= 0) {
        $firstGroup = $pdo->query("SELECT `id` FROM `groups` LIMIT 1")->fetch();
        if ($firstGroup) {
            $groupId = (int)$firstGroup['id'];
        } else {
            $pdo->exec("INSERT INTO `groups` (`name`, `class_name`, `zone`) VALUES ('Kelompok Riset Umum', 'Kelas X', 'OKU TIMUR')");
            $groupId = (int)$pdo->lastInsertId();
        }
    }

    // Cek kolom source & has_geotag pada tabel dokumentasi_media (auto-migration aman)
    $hasNewCols = false;
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM `dokumentasi_media` LIKE 'has_geotag'")->fetchAll();
        if (empty($cols)) {
            $pdo->exec("ALTER TABLE `dokumentasi_media` ADD COLUMN `source` VARCHAR(20) DEFAULT 'camera', ADD COLUMN `has_geotag` TINYINT(1) DEFAULT 1");
        }
        $hasNewCols = true;
    } catch (Exception $e) {
        $hasNewCols = false;
    }

    if ($hasNewCols) {
        $stmt = $pdo->prepare("
            INSERT INTO `dokumentasi_media` (`group_id`, `title`, `caption`, `media_type`, `file_url`, `gps_location`, `uploaded_by_nisn`, `source`, `has_geotag`)
            VALUES (:gid, :t, :cap, :mt, :fu, :gps, :ub, :src, :hg)
        ");
        $stmt->execute([
            ':gid' => $groupId,
            ':t'   => $title,
            ':cap' => $caption,
            ':mt'  => $mediaType,
            ':fu'  => $fileUrl,
            ':gps' => $gpsLocation,
            ':ub'  => $uploadedBy,
            ':src' => $source,
            ':hg'  => $hasGeotag
        ]);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO `dokumentasi_media` (`group_id`, `title`, `caption`, `media_type`, `file_url`, `gps_location`, `uploaded_by_nisn`)
            VALUES (:gid, :t, :cap, :mt, :fu, :gps, :ub)
        ");
        $stmt->execute([
            ':gid' => $groupId,
            ':t'   => $title,
            ':cap' => $caption,
            ':mt'  => $mediaType,
            ':fu'  => $fileUrl,
            ':gps' => $gpsLocation,
            ':ub'  => $uploadedBy
        ]);
    }

    jsonResponse(true, 'Dokumentasi riset berhasil diunggah!', ['id' => (int)$pdo->lastInsertId(), 'file_url' => $fileUrl]);
}

if ($action === 'delete') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }
    $input = getJsonInput();
    if (empty($input)) $input = $_POST;
    $id = (int)($input['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(false, 'ID dokumentasi tidak valid');
    }
    $stmt = $pdo->prepare("SELECT `file_url` FROM `dokumentasi_media` WHERE `id` = :id");
    $stmt->execute([':id' => $id]);
    $doc = $stmt->fetch();
    if ($doc && !empty($doc['file_url']) && strpos($doc['file_url'], 'data:image') === false) {
        $docRel = ltrim(str_replace(['../', '..\\'], '', $doc['file_url']), '/\\');
        $docPath = BASE_DIR . DIRECTORY_SEPARATOR . $docRel;
        if (file_exists($docPath)) @unlink($docPath);
    }
    $del = $pdo->prepare("DELETE FROM `dokumentasi_media` WHERE `id` = :id");
    $del->execute([':id' => $id]);
    jsonResponse(true, 'Dokumentasi berhasil dihapus');
}

jsonResponse(false, 'Aksi tidak valid', null, 400);
