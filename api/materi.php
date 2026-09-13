<?php
/**
 * FINCESTEM 2026 - Modul Materi & Pembelajaran API
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'list';
$pdo = getDB();

if ($action === 'list') {
    $pillar = $_GET['pillar'] ?? '';
    if ($pillar && in_array($pillar, ['financial', 'culture', 'exploration', 'stem', 'umum'])) {
        $stmt = $pdo->prepare("SELECT * FROM `materi` WHERE `pillar` = :p ORDER BY `id` DESC");
        $stmt->execute([':p' => $pillar]);
    } else {
        $stmt = $pdo->query("SELECT * FROM `materi` ORDER BY `id` DESC");
    }
    $items = $stmt->fetchAll();
    jsonResponse(true, 'Data materi berhasil diambil', $items);
}

if ($action === 'add') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) $input = $_POST;

    $title        = trim($input['title'] ?? '');
    $pillar       = trim($input['pillar'] ?? 'umum');
    $description  = trim($input['description'] ?? '');
    $fileUrl      = trim($input['file_url'] ?? '');
    $fileType     = trim($input['file_type'] ?? 'pdf');
    $externalLink = trim($input['external_link'] ?? '');
    $uploadedBy   = trim($input['uploaded_by'] ?? 'Guru Pembina');

    if (!$title) {
        jsonResponse(false, 'Judul materi wajib diisi!');
    }

    $stmt = $pdo->prepare("
        INSERT INTO `materi` (`title`, `pillar`, `description`, `file_url`, `file_type`, `external_link`, `uploaded_by`)
        VALUES (:t, :p, :d, :f, :ft, :el, :ub)
    ");
    $stmt->execute([
        ':t'  => $title,
        ':p'  => $pillar,
        ':d'  => $description,
        ':f'  => $fileUrl,
        ':ft' => $fileType,
        ':el' => $externalLink,
        ':ub' => $uploadedBy
    ]);

    jsonResponse(true, 'Materi pembelajaran berhasil ditambahkan!', ['id' => (int)$pdo->lastInsertId()]);
}

if ($action === 'delete') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }
    $input = getJsonInput();
    $id = (int)($input['id'] ?? 0);
    if (!$id) jsonResponse(false, 'ID materi tidak valid!');

    $stmt = $pdo->prepare("DELETE FROM `materi` WHERE `id` = :id");
    $stmt->execute([':id' => $id]);
    jsonResponse(true, 'Materi berhasil dihapus!');
}

jsonResponse(false, 'Aksi tidak valid', null, 400);
