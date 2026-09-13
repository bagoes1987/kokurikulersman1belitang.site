<?php
/**
 * FINCESTEM 2026 - Evaluasi & Penilaian 4 Pilar API
 */
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'get';
$pdo = getDB();

if ($action === 'get') {
    $groupId = (int)($_GET['group_id'] ?? 0);
    if ($groupId) {
        $stmt = $pdo->prepare("SELECT * FROM `evaluasi_nilai` WHERE `group_id` = :gid LIMIT 1");
        $stmt->execute([':gid' => $groupId]);
        $row = $stmt->fetch();
        jsonResponse(true, 'Data nilai kelompok diambil', $row);
    } else {
        // Rekapitulasi semua kelompok untuk koordinator
        $stmt = $pdo->query("
            SELECT e.*, g.name AS group_name, g.class_name, g.zone, g.destination, g.leader_nisn
            FROM `evaluasi_nilai` e
            RIGHT JOIN `groups` g ON e.group_id = g.id
            ORDER BY g.class_name ASC, g.name ASC
        ");
        $all = $stmt->fetchAll();
        jsonResponse(true, 'Rekapitulasi seluruh nilai berhasil diambil', $all);
    }
}

if ($action === 'grade') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, 'Metode harus POST', null, 405);
    }

    $input = getJsonInput();
    if (empty($input)) $input = $_POST;

    $groupId       = (int)($input['group_id'] ?? 0);
    $facilitatorId = (int)($input['facilitator_id'] ?? 0);
    $financial     = (float)($input['score_financial'] ?? 0);
    $culture       = (float)($input['score_culture'] ?? 0);
    $exploration   = (float)($input['score_exploration'] ?? 0);
    $stem          = (float)($input['score_stem'] ?? 0);
    $feedback      = trim($input['feedback'] ?? '');

    if (!$groupId) {
        jsonResponse(false, 'ID Kelompok tidak valid!');
    }

    $stmt = $pdo->prepare("
        INSERT INTO `evaluasi_nilai` (`group_id`, `facilitator_id`, `score_financial`, `score_culture`, `score_exploration`, `score_stem`, `feedback`)
        VALUES (:gid, :fid, :fin, :cul, :exp, :stem, :fb)
        ON DUPLICATE KEY UPDATE
            `facilitator_id`    = VALUES(`facilitator_id`),
            `score_financial`   = VALUES(`score_financial`),
            `score_culture`     = VALUES(`score_culture`),
            `score_exploration` = VALUES(`score_exploration`),
            `score_stem`        = VALUES(`score_stem`),
            `feedback`          = VALUES(`feedback`),
            `graded_at`         = NOW()
    ");
    $stmt->execute([
        ':gid'  => $groupId,
        ':fid'  => $facilitatorId ?: null,
        ':fin'  => $financial,
        ':cul'  => $culture,
        ':exp'  => $exploration,
        ':stem' => $stem,
        ':fb'   => $feedback
    ]);

    jsonResponse(true, 'Penilaian 4 pilar FINCESTEM berhasil disimpan!');
}

jsonResponse(false, 'Aksi tidak valid', null, 400);
