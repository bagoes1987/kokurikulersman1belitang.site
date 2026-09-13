<?php
/**
 * FINCESTEM 2026 - Zone & Pembina Settings Endpoint
 * Mengatur pembagian zona riset (OKU TIMUR / LUAR OKU TIMUR) dan penugasan Koordinator/Fasilitator
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $pdo = getDB();

        // 1. Ringkasan per Rombel
        $stmt = $pdo->query("
            SELECT 
                `class_name`,
                `grade_level`,
                COALESCE(NULLIF(`zone`, ''), 'FINCESTEM OKU TIMUR') AS `zone`,
                COALESCE(NULLIF(`coordinator_name`, ''), 'Drs. H. Koordinator FINCESTEM') AS `coordinator_name`,
                COALESCE(NULLIF(`facilitator_name`, ''), 'Tim Fasilitator SMAN 1 Belitang') AS `facilitator_name`,
                COUNT(*) AS `total_students`
            FROM `users`
            WHERE `role` = 'siswa'
            GROUP BY `class_name`, `grade_level`, `zone`, `coordinator_name`, `facilitator_name`
            ORDER BY `class_name` ASC
        ");
        $classes = $stmt->fetchAll();

        // 2. Hitung total per zona
        $stmtZone = $pdo->query("
            SELECT 
                COALESCE(NULLIF(`zone`, ''), 'FINCESTEM OKU TIMUR') AS `zone_name`,
                COUNT(*) AS `count`
            FROM `users`
            WHERE `role` = 'siswa'
            GROUP BY `zone_name`
        ");
        $zoneCounts = $stmtZone->fetchAll(PDO::FETCH_KEY_PAIR);

        jsonResponse(true, 'Data pengaturan zona berhasil dimuat', [
            'classes'     => $classes,
            'zone_counts' => $zoneCounts
        ]);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal mengambil data pengaturan: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $action = $input['action'] ?? '';

    if ($action === 'set_class_zone') {
        $className = trim($input['class_name'] ?? '');
        $zone      = trim($input['zone'] ?? 'FINCESTEM OKU TIMUR');

        if (!$className) {
            jsonResponse(false, 'Nama kelas/rombel wajib dipilih!', null, 400);
        }

        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("UPDATE `users` SET `zone` = :z WHERE `class_name` = :c AND `role` = 'siswa'");
            $stmt->execute([':z' => $zone, ':c' => $className]);
            $count = $stmt->rowCount();

            jsonResponse(true, "Berhasil mengatur zona '{$zone}' untuk rombel {$className} ({$count} siswa).");
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal memperbarui zona kelas: ' . $e->getMessage(), null, 500);
        }
    }

    if ($action === 'set_pembina') {
        $className   = trim($input['class_name'] ?? '');
        $gradeLevel  = trim($input['grade_level'] ?? '');
        $coordName   = trim($input['coordinator_name'] ?? '');
        $fasilName   = trim($input['facilitator_name'] ?? '');

        if (!$className && !$gradeLevel) {
            jsonResponse(false, 'Harap tentukan target kelas atau tingkat!', null, 400);
        }

        try {
            $pdo = getDB();
            if ($className && $className !== 'ALL') {
                $stmt = $pdo->prepare("
                    UPDATE `users` 
                    SET `coordinator_name` = :coord, `facilitator_name` = :fasil 
                    WHERE `class_name` = :c AND `role` = 'siswa'
                ");
                $stmt->execute([':coord' => $coordName, ':fasil' => $fasilName, ':c' => $className]);
            } else {
                $stmt = $pdo->prepare("
                    UPDATE `users` 
                    SET `coordinator_name` = :coord, `facilitator_name` = :fasil 
                    WHERE `grade_level` = :g AND `role` = 'siswa'
                ");
                $stmt->execute([':coord' => $coordName, ':fasil' => $fasilName, ':g' => $gradeLevel]);
            }

            jsonResponse(true, "Penugasan Koordinator & Fasilitator berhasil diperbarui.");
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal memperbarui pembina: ' . $e->getMessage(), null, 500);
        }
    }

    jsonResponse(false, 'Aksi tidak valid', null, 400);
}
