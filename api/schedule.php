<?php
/**
 * FINCESTEM 2026 - Schedule & Day 1-7 Control Endpoint
 * Menyajikan dan mengelola jadwal harian eksplorasi serta status buka/tutup aktivitas
 */
require_once __DIR__ . '/db.php';

// Pastikan header anti-cache aktif agar browser siswa tidak menyimpan data kedaluwarsa
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$method = $_SERVER['REQUEST_METHOD'];

/**
 * Pastikan tabel day_schedules ada dan memiliki 7 hari awal jika database cPanel belum termigrasi
 */
function ensureDaySchedulesTable($pdo) {
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `day_schedules` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `day_number` INT NOT NULL UNIQUE,
              `title` VARCHAR(150) NOT NULL,
              `theme` VARCHAR(150) DEFAULT NULL,
              `date` DATE NOT NULL,
              `start_time` TIME NOT NULL DEFAULT '07:00:00',
              `end_time` TIME NOT NULL DEFAULT '18:00:00',
              `is_active` TINYINT(1) NOT NULL DEFAULT 1,
              `auto_schedule` TINYINT(1) NOT NULL DEFAULT 1,
              `description` TEXT DEFAULT NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX `idx_day` (`day_number`),
              INDEX `idx_active` (`is_active`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $cnt = (int)$pdo->query("SELECT COUNT(*) FROM `day_schedules`")->fetchColumn();
        if ($cnt === 0) {
            $pdo->exec("
                INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES
                (1, 'Day 1: Orientasi & Pembekalan Riset', 'Pembekalan STEM & Etika Riset Lapangan', '2026-11-09', '07:00:00', '18:00:00', 1, 1, 'Pengenalan instrumen observasi, sosialisasi modul kokurikuler, dan konsolidasi tim ekspedisi.'),
                (2, 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', 'STEM Sains & Konservasi Lingkungan Belitang', '2026-11-10', '07:00:00', '18:00:00', 0, 1, 'Pengambilan sampel kualitas air saluran irigasi, identifikasi flora-fauna sawah pasang surut.'),
                (3, 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', 'Teknologi Pertanian Modern & Mekanisasi', '2026-11-11', '07:00:00', '18:00:00', 0, 1, 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.'),
                (4, 'Day 4: Literasi Finansial & Rantai Pasok Pangan', 'Financial Literacy & Ekonomi Agrikultur', '2026-11-12', '07:00:00', '18:00:00', 0, 1, 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.'),
                (5, 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', 'Culture & Kearifan Lokal Komunitas Multikultural', '2026-11-13', '07:00:00', '18:00:00', 0, 1, 'Wawancara tetua adat, kajian tradisi gotong royong lumbung desa, dan pencatatan nilai-nilai budaya.'),
                (6, 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', 'Data Science & Penyusunan Laporan Proyek', '2026-11-14', '07:00:00', '18:00:00', 0, 1, 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.'),
                (7, 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', 'Diseminasi Temuan & Refleksi Kokurikuler', '2026-11-15', '07:00:00', '20:00:00', 0, 1, 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.')
            ");
        }
        $cnt0 = (int)$pdo->query("SELECT COUNT(*) FROM `day_schedules` WHERE `day_number` = 0")->fetchColumn();
        if ($cnt0 === 0) {
            $today = date('Y-m-d');
            $pdo->exec("
                INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES
                (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM (mempelajari materi modul simulasi, mengisi instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mengunggah foto dokumentasi) sebelum pelaksanaan riset lapangan sesungguhnya.')
            ");
        }
    } catch (Exception $e) {
        // Fallback jika ada batasan izin di cPanel
    }
}

if ($method === 'GET') {
    $now = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
    $nowTimestamp = $now->getTimestamp();
    $nowDateStr = $now->format('Y-m-d');
    $nowTimeStr = $now->format('H:i:s');
    $role = strtolower(trim($_GET['role'] ?? ''));

    try {
        $pdo = getDB();
        ensureDaySchedulesTable($pdo);
        $stmt = $pdo->query("SELECT * FROM `day_schedules` ORDER BY `day_number` ASC");
        $rows = $stmt->fetchAll();
    } catch (Exception $e) {
        // Fallback default jika tabel belum termigrasi
        $today = date('Y-m-d');
        $rows = [
            ['day_number' => 0, 'title' => 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'theme' => 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', 'date' => $today, 'start_time' => '06:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'description' => 'Sesi uji coba dan orientasi teknis seluruh fitur aplikasi FINCESTEM sebelum pelaksanaan asli.'],
            ['day_number' => 1, 'title' => 'Day 1: Orientasi & Pembekalan Riset', 'theme' => 'Pembekalan STEM & Etika Riset Lapangan', 'date' => '2026-11-09', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 1, 'auto_schedule' => 1, 'description' => 'Sosialisasi instrumen riset dan konsolidasi tim.'],
            ['day_number' => 2, 'title' => 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', 'theme' => 'STEM Sains & Konservasi Lingkungan Belitang', 'date' => '2026-11-10', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pengambilan sampel kualitas air irigasi.'],
            ['day_number' => 3, 'title' => 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', 'theme' => 'Teknologi Pertanian Modern & Mekanisasi', 'date' => '2026-11-11', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Observasi mekanisasi pascapanen.'],
            ['day_number' => 4, 'title' => 'Day 4: Literasi Finansial & Rantai Pasok Pangan', 'theme' => 'Financial Literacy & Ekonomi Agrikultur', 'date' => '2026-11-12', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.'],
            ['day_number' => 5, 'title' => 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', 'theme' => 'Culture & Kearifan Lokal Komunitas Multikultural', 'date' => '2026-11-13', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Kajian tradisi gotong royong dan etnosains.'],
            ['day_number' => 6, 'title' => 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', 'theme' => 'Data Science & Penyusunan Laporan Proyek', 'date' => '2026-11-14', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.'],
            ['day_number' => 7, 'title' => 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', 'theme' => 'Diseminasi Temuan & Refleksi Kokurikuler', 'date' => '2026-11-15', 'start_time' => '07:00:00', 'end_time' => '20:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.']
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

        // Jika Day 0 (Day Uji Coba) sedang dinonaktifkan (is_active = 0) dan bukan admin yang meminta, sembunyikan sepenuhnya!
        if ($dayNum === 0 && $isActive === 0 && $role !== 'admin') {
            continue;
        }

        $startDT = new DateTime($dDate . ' ' . $startTime, new DateTimeZone('Asia/Jakarta'));
        $endDT   = new DateTime($dDate . ' ' . $endTime, new DateTimeZone('Asia/Jakarta'));
        $startTs = $startDT->getTimestamp();
        $endTs   = $endDT->getTimestamp();

        $isOpen = false;
        $statusCode = 'LOCKED';
        $statusLabel = 'Terkunci';

        // Logika Status: Jika is_active = 0, MUTLAK DITUTUP PAKSA apapun kondisi tanggal/jamnya
        if ($isActive === 0) {
            $isOpen = false;
            $statusCode = 'MANUAL_CLOSED';
            $statusLabel = 'Ditutup Manual oleh Admin';
        } elseif ($autoSched === 0) {
            // Manual mode aktif & is_active = 1 -> Terbuka
            $isOpen = true;
            $statusCode = 'OPEN';
            $statusLabel = 'Terbuka (Manual Admin)';
        } else {
            // Otomatis berdasarkan tanggal & jam Asia/Jakarta
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
                $statusLabel = 'Aktivitas Sedang Dibuka';
            }
        }

        $days[] = [
            'id'            => (int)($r['id'] ?? 0),
            'day_number'    => $dayNum,
            'title'         => $r['title'],
            'theme'         => $r['theme'],
            'date'          => $dDate,
            'date_formatted'=> date('d M Y', strtotime($dDate)),
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

    // AKSI KHUSUS: Toggle sakelar Day Uji Coba (Aktifkan / Nonaktifkan / Sembunyikan)
    if ($action === 'toggle_trial_day') {
        $isActive = isset($input['is_active']) ? (int)$input['is_active'] : 0;
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);
            $stmt = $pdo->prepare("UPDATE `day_schedules` SET `is_active` = :act WHERE `day_number` = 0");
            $stmt->execute([':act' => $isActive]);

            jsonResponse(true, 'Status Day Uji Coba berhasil diubah menjadi ' . ($isActive ? 'AKTIF (Tampil di Siswa & Guru)' : 'NONAKTIF (Disembunyikan)'), [
                'day_number' => 0,
                'is_active'  => $isActive,
                'is_open'    => ($isActive === 1)
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal mengubah status Day Uji Coba: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI 1: Toggle sakelar buka/tutup cepat dari admin
    if ($action === 'toggle_day') {
        $dayNum = (int)($input['day_number'] ?? 0);
        $isActive = isset($input['is_active']) ? (int)$input['is_active'] : 0;

        if ($dayNum < 0 || $dayNum > 7) {
            jsonResponse(false, 'Nomor hari tidak valid (harus 0 - 7)', null, 400);
        }

        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);
            $stmt = $pdo->prepare("UPDATE `day_schedules` SET `is_active` = :act WHERE `day_number` = :d");
            $stmt->execute([':act' => $isActive, ':d' => $dayNum]);

            jsonResponse(true, 'Status Day ' . $dayNum . ' berhasil diubah menjadi ' . ($isActive ? 'Buka' : 'Tutup (Paksa)'), [
                'day_number' => $dayNum,
                'is_active'  => $isActive,
                'is_open'    => ($isActive === 1)
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal mengubah status: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI 2: Update rincian seluruh hari / per-hari
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
            ensureDaySchedulesTable($pdo);
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
