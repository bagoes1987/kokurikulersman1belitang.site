<?php
/**
 * FINCESTEM 2026 - Pengumpulan LKPD Siswa API
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'get';
$pdo = getDB();

// 1. Ambil LKPD berdasarkan kelompok
if ($action === 'get') {
    $groupId = (int)($_GET['group_id'] ?? 0);
    $pillar  = $_GET['pillar'] ?? '';

    if (!$groupId) {
        jsonResponse(false, 'Parameter group_id wajib disertakan!');
    }

    if ($pillar) {
        $stmt = $pdo->prepare("SELECT * FROM `lkpd_submissions` WHERE `group_id` = :gid AND `pillar` = :p LIMIT 1");
        $stmt->execute([':gid' => $groupId, ':p' => $pillar]);
        $row = $stmt->fetch();
    } else {
        $stmt = $pdo->prepare("SELECT * FROM `lkpd_submissions` WHERE `group_id` = :gid ORDER BY `submitted_at` DESC");
        $stmt->execute([':gid' => $groupId]);
        $row = $stmt->fetchAll();
    }

    jsonResponse(true, 'Data LKPD berhasil diambil', $row);
}

// 2. Simpan / Kirim Lembar Kerja LKPD
if ($action === 'submit') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) $input = $_POST;

    $groupId       = (int)($input['group_id'] ?? 0);
    $pillar        = trim($input['pillar'] ?? '');
    $title         = trim($input['title'] ?? 'Lembar Kerja Siswa');
    $answers       = $input['answers'] ?? [];
    $attachmentUrl = trim($input['attachment_url'] ?? '');
    $status        = trim($input['status'] ?? 'Terkirim');
    $nisn          = trim($input['submitted_by'] ?? '');

    if (!$groupId || !$pillar) {
        jsonResponse(false, 'ID Kelompok dan Pilar wajib diisi!');
    }

    $answersJson = is_string($answers) ? $answers : json_encode($answers, JSON_UNESCAPED_UNICODE);

    // Cek apakah sudah pernah ada submit untuk pilar ini di kelompok tersebut
    $chk = $pdo->prepare("SELECT `id` FROM `lkpd_submissions` WHERE `group_id` = :gid AND `pillar` = :p LIMIT 1");
    $chk->execute([':gid' => $groupId, ':p' => $pillar]);
    $existing = $chk->fetch();

    if ($existing) {
        $stmt = $pdo->prepare("
            UPDATE `lkpd_submissions` 
            SET `title` = :t, `answers_json` = :ans, `attachment_url` = :att, `status` = :st, `submitted_by_nisn` = :nisn, `updated_at` = NOW()
            WHERE `id` = :id
        ");
        $stmt->execute([
            ':t'    => $title,
            ':ans'  => $answersJson,
            ':att'  => $attachmentUrl,
            ':st'   => $status,
            ':nisn' => $nisn,
            ':id'   => $existing['id']
        ]);
        jsonResponse(true, 'LKPD Pilar ' . ucfirst($pillar) . ' berhasil diperbarui!', ['id' => (int)$existing['id']]);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO `lkpd_submissions` (`group_id`, `pillar`, `title`, `answers_json`, `attachment_url`, `status`, `submitted_by_nisn`)
            VALUES (:gid, :p, :t, :ans, :att, :st, :nisn)
        ");
        $stmt->execute([
            ':gid'  => $groupId,
            ':p'    => $pillar,
            ':t'    => $title,
            ':ans'  => $answersJson,
            ':att'  => $attachmentUrl,
            ':st'   => $status,
            ':nisn' => $nisn
        ]);
        jsonResponse(true, 'LKPD Pilar ' . ucfirst($pillar) . ' berhasil dikirim!', ['id' => (int)$pdo->lastInsertId()]);
    }
}

jsonResponse(false, 'Aksi tidak valid', null, 400);
