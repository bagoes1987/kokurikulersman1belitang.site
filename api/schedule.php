<?php
/**
 * FINCESTEM 2026 - Schedule & Day 1-7 Control Endpoint
 * Menyajikan dan mengelola jadwal harian eksplorasi serta status buka/tutup aktivitas
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $now = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
    $nowTimestamp = $now->getTimestamp();
    $nowDateStr = $now->format('Y-m-d');
    $nowTimeStr = $now->format('H:i:s');

    try {
        $pdo = getDB();
        $stmt = $pdo->query("SELECT * FROM `day_schedules` ORDER BY `day_number` ASC");
        $rows = $stmt->fetchAll();
    } catch (Exception $e) {
        // Fallback default jika tabel belum termigrasi
        $rows = [
            ['day_number' => 1, 'title' => 'Day 1: Orientasi & Pembekalan Riset', 'theme' => 'Pembekalan STEM & Etika Riset', 'date' => '2026-11-09', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 1, 'auto_schedule' => 1, 'description' => 'Sosialisasi instrumen riset dan konsolidasi tim.'],
            ['day_number' => 2, 'title' => 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', 'theme' => 'STEM Sains & Konservasi Lingkungan Belitang', 'date' => '2026-11-10', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pengambilan sampel kualitas air irigasi.'],
            ['day_number' => 3, 'title' => 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', 'theme' => 'Teknologi Pertanian Modern & Mekanisasi', 'date' => '2026-11-11', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Observasi mekanisasi pascapanen.'],
            ['day_number' => 4, 'title' => 'Day 4: Literasi Finansial & Rantai Pasok Pangan', 'theme' => 'Financial Literacy & Ekonomi Agrikultur', 'date' => '2026-11-12', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Analisis biaya dan wawancara rantai pasok.'],
            ['day_number' => 5, 'title' => 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', 'theme' => 'Culture & Kearifan Lokal Komunitas', 'date' => '2026-11-13', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Kajian tradisi gotong royong dan etnosains.'],
            ['day_number' => 6, 'title' => 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', 'theme' => 'Data Science & Penyusunan Laporan', 'date' => '2026-11-14', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pengolahan data dan finalisasi berkas LKPD.'],
            ['day_number' => 7, 'title' => 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', 'theme' => 'Diseminasi Temuan & Refleksi Akhir', 'date' => '2026-11-15', 'start_time' => '07:00:00', 'end_time' => '20:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pameran poster dan refleksi mandiri.']
        ];
    }

    $days = [];
    foreach ($rows as $r) {
        $dayNum = (int)$r['day_number'];
        $dDate = $r['date'];
        $startTime = $r['start_time'];
        $endTime = $r['end_time'];
        $isActive = (int)$r['is_active'];
        $autoSched = (int)$r['auto_schedule'];

        $startDT = new DateTime($dDate . ' ' . $startTime, new DateTimeZone('Asia/Jakarta'));
        $endDT   = new DateTime($dDate . ' ' . $endTime, new DateTimeZone('Asia/Jakarta'));
        $startTs = $startDT->getTimestamp();
        $endTs   = $endDT->getTimestamp();

        $isOpen = false;
        $statusCode = 'LOCKED';
        $statusLabel = 'Terkunci';

        if ($isActive === 0) {
            $isOpen = false;
            $statusCode = 'MANUAL_CLOSED';
            $statusLabel = 'Ditutup Manual oleh Admin';
        } elseif ($autoSched === 0) {
            // Manual mode aktif
            $isOpen = true;
            $statusCode = 'OPEN';
            $statusLabel = 'Terbuka (Manual Admin)';
        } else {
            // Otomatis berdasarkan tanggal & jam
            if ($nowTimestamp < $startTs) {
                $isOpen = false;
                $statusCode = 'UPCOMING';
                $statusLabel = 'Akan dibuka ' . date('d M Y', $startTs) . ' pukul ' . substr($startTime, 0, 5);
            } elseif ($nowTimestamp > $endTs) {
                $isOpen = false;
                $statusCode = 'EXPIRED';
                $statusLabel = 'Waktu Pelaksanaan Telah Berakhir';
            } else {
                $isOpen = true;
                $statusCode = 'OPEN';
                $statusLabel = 'Aktivitas Sedang Berlangsung';
            }
        }

        $days[] = [
            'day_number'    => $dayNum,
            'title'         => $r['title'],
            'theme'         => $r['theme'],
            'date'          => $dDate,
            'date_formatted'=> date('d F Y', strtotime($dDate)),
            'start_time'    => substr($startTime, 0, 5),
            'end_time'      => substr($endTime, 0, 5),
            'is_active'     => $isActive,
            'auto_schedule' => $autoSched,
            'description'   => $r['description'],
            'is_open'       => $isOpen,
            'status_code'   => $statusCode,
            'status_label'  => $statusLabel
        ];
    }

    jsonResponse(true, 'Data jadwal berhasil diambil', [
        'server_time' => $now->format('Y-m-d H:i:s'),
        'server_date' => $nowDateStr,
        'days'        => $days
    ]);
}

if ($method === 'POST') {
    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $action = $input['action'] ?? 'update_day';

    if ($action === 'toggle_day') {
        $dayNum = (int)($input['day_number'] ?? 0);
        $isActive = isset($input['is_active']) ? (int)$input['is_active'] : 1;

        if ($dayNum < 1 || $dayNum > 7) {
            jsonResponse(false, 'Nomor hari tidak valid (harus 1 - 7)', null, 400);
        }

        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("UPDATE `day_schedules` SET `is_active` = :act WHERE `day_number` = :d");
            $stmt->execute([':act' => $isActive, ':d' => $dayNum]);
            jsonResponse(true, 'Status Day ' . $dayNum . ' berhasil diubah menjadi ' . ($isActive ? 'Buka' : 'Tutup'));
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal mengubah status: ' . $e->getMessage(), null, 500);
        }
    }

    if ($action === 'update_all' || $action === 'update_day') {
        $dayList = $input['days'] ?? [];
        if (!is_array($dayList) || empty($dayList)) {
            // Jika single update
            if (isset($input['day_number'])) {
                $dayList = [$input];
            }
        }

        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("
                INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`)
                VALUES (:day, :title, :theme, :dDate, :sTime, :eTime, :act, :auto, :desc)
                ON DUPLICATE KEY UPDATE
                    `title` = VALUES(`title`),
                    `theme` = VALUES(`theme`),
                    `date` = VALUES(`date`),
                    `start_time` = VALUES(`start_time`),
                    `end_time` = VALUES(`end_time`),
                    `is_active` = VALUES(`is_active`),
                    `auto_schedule` = VALUES(`auto_schedule`),
                    `description` = VALUES(`description`)
            ");

            foreach ($dayList as $d) {
                $stmt->execute([
                    ':day'   => (int)$d['day_number'],
                    ':title' => $d['title'] ?? ('Day ' . $d['day_number']),
                    ':theme' => $d['theme'] ?? '',
                    ':dDate' => $d['date'] ?? '2026-11-09',
                    ':sTime' => strlen($d['start_time'] ?? '') === 5 ? $d['start_time'] . ':00' : ($d['start_time'] ?? '07:00:00'),
                    ':eTime' => strlen($d['end_time'] ?? '') === 5 ? $d['end_time'] . ':00' : ($d['end_time'] ?? '18:00:00'),
                    ':act'   => isset($d['is_active']) ? (int)$d['is_active'] : 1,
                    ':auto'  => isset($d['auto_schedule']) ? (int)$d['auto_schedule'] : 1,
                    ':desc'  => $d['description'] ?? ''
                ]);
            }

            jsonResponse(true, 'Pengaturan jadwal berhasil disimpan ke database!');
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal menyimpan jadwal: ' . $e->getMessage(), null, 500);
        }
    }

    jsonResponse(false, 'Aksi tidak dikenali', null, 400);
}
