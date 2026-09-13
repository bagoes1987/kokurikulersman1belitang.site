<?php
/**
 * FINCESTEM 2026 - Dokumentasi Media Lapangan (Foto & Video) API
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'list';
$pdo = getDB();

if ($action === 'list') {
    $groupId = (int)($_GET['group_id'] ?? 0);
    if ($groupId) {
        $stmt = $pdo->prepare("SELECT * FROM `dokumentasi_media` WHERE `group_id` = :gid ORDER BY `created_at` DESC");
        $stmt->execute([':gid' => $groupId]);
    } else {
        $stmt = $pdo->query("
            SELECT d.*, g.name AS group_name, g.class_name, g.zone
            FROM `dokumentasi_media` d
            LEFT JOIN `groups` g ON d.group_id = g.id
            ORDER BY d.created_at DESC
            LIMIT 50
        ");
    }
    $media = $stmt->fetchAll();
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
    $gpsLocation = trim($input['gps_location'] ?? '');
    $uploadedBy  = trim($input['uploaded_by'] ?? '');

    if (!$groupId || !$fileUrl) {
        jsonResponse(false, 'ID Kelompok dan File Media wajib disertakan!');
    }

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

    jsonResponse(true, 'Dokumentasi riset berhasil diunggah!', ['id' => (int)$pdo->lastInsertId()]);
}

jsonResponse(false, 'Aksi tidak valid', null, 400);
