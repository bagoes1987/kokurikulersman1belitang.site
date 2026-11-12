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
 * Pastikan tabel day_schedules dan day_schedules_field_trip ada dan memiliki data awal
 */
function ensureDaySchedulesTable($pdo) {
    if (file_exists(__DIR__ . '/.db_schema_ready')) return;
    static $checked = false;
    if ($checked) return;
    $checked = true;

    // Bersihkan file lock usang jika pernah ada agar tidak menghalangi pengecekan Day 0
    $lockFile = sys_get_temp_dir() . '/fincestem_schedules_table.lock';
    if (file_exists($lockFile)) {
        @unlink($lockFile);
    }

    try {
        // 0. Tabel Akun Siswa Uji Coba Terbatas (VIP Tester Whitelist Admin)
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `tester_students` (
              `nisn` VARCHAR(32) NOT NULL PRIMARY KEY,
              `nis` VARCHAR(32) DEFAULT '',
              `student_name` VARCHAR(150) DEFAULT '',
              `class_name` VARCHAR(50) DEFAULT '',
              `zone` VARCHAR(100) DEFAULT '',
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        // 1. Tabel Jadwal Non-Field Trip (Reguler OKU Timur)
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
        $today = date('Y-m-d');
        if ($cnt === 0) {
            $pdo->exec("
                INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES
                (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM sebelum pelaksanaan riset lapangan sesungguhnya.'),
                (1, 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur', 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah', '2026-11-09', '07:00:00', '18:00:00', 1, 1, 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.'),
                (2, 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur', 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering', '2026-11-10', '07:00:00', '18:00:00', 1, 0, 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.'),
                (3, 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', 'Teknologi Pertanian Modern & Mekanisasi', '2026-11-11', '07:00:00', '18:00:00', 0, 1, 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.'),
                (4, 'Day 4: EXPLORATION', 'Eksplorasi Peralatan, Perlengkapan Kerja & Analisis 4 Dimensi STEM Sektor Pilihan', '2026-11-12', '07:00:00', '18:00:00', 0, 1, 'Eksplorasi mendalam peralatan, perlengkapan kerja (APD), dan mesin mekanisasi pada sektor pilihan Day 3 serta mengaitkannya langsung dengan Science, Technology, Engineering, dan Mathematics (STEM).'),
                (5, 'Day 5: Video Observasi YouTube (5–10 Menit): Penerapan STEM & Eksplorasi Alat', 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Culture, Exploration (Peralatan) & 4 Unsur STEM', '2026-11-13', '07:00:00', '18:00:00', 0, 1, 'Pembuatan video observasi lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas Culture, Exploration peralatan kerja, serta penerapan Science, Technology, Engineering, dan Mathematics (STEM).'),
                (6, 'Day 6: Video Analisis YouTube (5–10 Menit): Finansial, Kendala & Solusi Inovasi', 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Analisis Finansial, Evaluasi Kendala & Solusi FINCESTEM', '2026-11-14', '07:00:00', '18:00:00', 0, 1, 'Pembuatan video analisis lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas perputaran modal/biaya/HPP/laba (Financial), identifikasi kendala usaha, serta rekomendasi solusi inovasi berbasis FINCESTEM.'),
                (7, 'Day 7: Video Refleksi, BTS & Jurnal Refleksi', 'Refleksi Perjalanan Riset Day 1–7, Video YouTube, BTS & Bebas Asesmen', '2026-11-15', '07:00:00', '18:00:00', 0, 1, 'Pembuatan video refleksi perjalanan riset mandiri dari Day 1 s.d. Day 7 (5–8 menit) dilengkapi cuplikan Behind The Scene (BTS / Bloopers), unggah foto bebas diri ber-Google Geotag, pengisian jurnal refleksi, serta apresiasi kelulusan riset (Bebas Kuis Asesmen 100/100).')
            ");
        } else {
            // Migrasi Otomatis Day 7 Non-Field Trip (Update Judul & Jam 18:00)
            try {
                $pdo->exec("UPDATE `day_schedules` SET `title` = 'Day 7: Video Refleksi, BTS & Jurnal Refleksi', `theme` = 'Refleksi Perjalanan Riset Day 1–7, Video YouTube, BTS & Bebas Asesmen', `end_time` = '18:00:00' WHERE `day_number` = 7 AND (`end_time` = '20:00:00' OR `title` LIKE '%Final Editing%' OR `title` LIKE '%Gelar Karya%')");
            } catch(Exception $eMig) {}

            $cnt0 = (int)$pdo->query("SELECT COUNT(*) FROM `day_schedules` WHERE `day_number` = 0")->fetchColumn();
            if ($cnt0 === 0) {
                $pdo->exec("
                    INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES
                    (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM sebelum pelaksanaan riset lapangan sesungguhnya.')
                ");
            }
            // Auto-update Day 1 Non-Field Trip jika di DB masih bertuliskan Orientasi & Pembekalan Riset serta buka akses pengerjaan susulan
            $pdo->exec("
                UPDATE `day_schedules` 
                SET `title` = 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur',
                    `theme` = 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah',
                    `description` = 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.',
                    `is_active` = 1,
                    `auto_schedule` = 0
                WHERE `day_number` = 1
            ");
            $pdo->exec("UPDATE `day_schedules_field_trip` SET `is_active` = 1, `auto_schedule` = 0 WHERE `day_number` = 1");

            // Auto-update Day 2: pastikan aktif dan auto_schedule = 0 (buka penuh hingga 23:59)
            $pdo->exec("
                UPDATE `day_schedules`
                SET `is_active` = 1, `auto_schedule` = 0, `end_time` = '23:59:00'
                WHERE `day_number` = 2
            ");
            $pdo->exec("UPDATE `day_schedules_field_trip` SET `is_active` = 1, `auto_schedule` = 0, `end_time` = '23:59:00' WHERE `day_number` = 2");

            // Auto-update Day 3: Analisis STEM pada 7 Sektor Unggulan OKU Timur (terkunci terjadwal otomatis buka Rabu 11 Nov 07:00 WIB)
            $pdo->exec("
                UPDATE `day_schedules`
                SET `title` = 'Day 3: Analisis STEM pada 7 Sektor Unggulan OKU Timur',
                    `theme` = 'Kajian Sains, Teknologi, Rekayasa Lapangan & Matematika Finansial',
                    `description` = 'Observasi dan investigasi lapangan autentik memadukan 4 pilar STEM (Sains, Teknologi, Engineering, dan Matematika) pada sektor agrikultur pangan, perkebunan, peternakan, perikanan, agro-industri pangan, perdagangan niaga, atau jasa keuangan di Kabupaten OKU Timur.',
                    `date` = '2026-11-11',
                    `start_time` = '07:00:00',
                    `end_time` = '23:59:00',
                    `is_active` = 1,
                    `auto_schedule` = 1
                WHERE `day_number` = 3
            ");
            $pdo->exec("UPDATE `day_schedules_field_trip` SET `date` = '2026-11-11', `start_time` = '07:00:00', `end_time` = '23:59:00', `is_active` = 1, `auto_schedule` = 1 WHERE `day_number` = 3");
            $pdo->exec("UPDATE `day_schedules_field_trip` SET `date` = '2026-11-12', `start_time` = '04:00:00', `end_time` = '23:59:00', `is_active` = 1, `auto_schedule` = 1 WHERE `day_number` = 4");
            $pdo->exec("UPDATE `day_schedules` SET `date` = '2026-11-12', `start_time` = '07:00:00', `end_time` = '23:59:00', `is_active` = 1, `auto_schedule` = 1 WHERE `day_number` = 4");
            $pdo->exec("UPDATE `day_schedules_field_trip` SET `date` = '2026-11-13', `start_time` = '07:00:00', `end_time` = '23:59:00', `is_active` = 1, `auto_schedule` = 1 WHERE `day_number` = 5");
            $pdo->exec("UPDATE `day_schedules` SET `date` = '2026-11-13', `start_time` = '07:00:00', `end_time` = '23:59:00', `is_active` = 1, `auto_schedule` = 1 WHERE `day_number` = 5");

            // Auto-update Day 4 Non-Field Trip ke konsep Eksplorasi Peralatan & Analisis STEM
            $pdo->exec("
                UPDATE `day_schedules` 
                SET `title` = 'Day 4: EXPLORATION',
                    `theme` = 'Eksplorasi Peralatan, Perlengkapan Kerja & Analisis 4 Dimensi STEM Sektor Pilihan',
                    `description` = 'Eksplorasi mendalam peralatan, perlengkapan kerja (APD), dan mesin mekanisasi pada sektor pilihan Day 3 serta mengaitkannya langsung dengan Science, Technology, Engineering, dan Mathematics (STEM).'
                WHERE `day_number` = 4 AND (`title` LIKE '%Rantai Pasok%' OR `theme` LIKE '%Irigasi Komering%' OR `theme` LIKE '%Financial%')
            ");
            // Auto-update Day 5 & Day 6 Non-Field Trip ke konsep Video YouTube 5-10 Menit (7 Sektor)
            $pdo->exec("
                UPDATE `day_schedules`
                SET `title` = 'Day 5: Video Observasi YouTube (5–10 Menit): Penerapan STEM & Eksplorasi Alat',
                    `theme` = 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Culture, Exploration (Peralatan) & 4 Unsur STEM',
                    `description` = 'Pembuatan video observasi lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas Culture, Exploration peralatan kerja, serta penerapan Science, Technology, Engineering, dan Mathematics (STEM).'
                WHERE `day_number` = 5 AND `title` NOT LIKE '%Video Observasi YouTube%'
            ");
            $pdo->exec("
                UPDATE `day_schedules`
                SET `title` = 'Day 6: Video Analisis YouTube (5–10 Menit): Finansial, Kendala & Solusi Inovasi',
                    `theme` = 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Analisis Finansial, Evaluasi Kendala & Solusi FINCESTEM',
                    `description` = 'Pembuatan video analisis lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas perputaran modal/biaya/HPP/laba (Financial), identifikasi kendala usaha, serta rekomendasi solusi inovasi berbasis FINCESTEM.'
                WHERE `day_number` = 6 AND `title` NOT LIKE '%Video Analisis YouTube%'
            ");
        }

        // 2. Tabel Jadwal Field Trip (Ekspedisi Luar 2026)
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `day_schedules_field_trip` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `day_number` INT NOT NULL UNIQUE,
              `title` VARCHAR(150) NOT NULL,
              `theme` VARCHAR(150) DEFAULT NULL,
              `date` DATE NOT NULL,
              `start_time` TIME NOT NULL DEFAULT '07:00:00',
              `end_time` TIME NOT NULL DEFAULT '23:59:00',
              `is_active` TINYINT(1) NOT NULL DEFAULT 1,
              `auto_schedule` TINYINT(1) NOT NULL DEFAULT 0,
              `route` VARCHAR(255) DEFAULT NULL,
              `description` TEXT DEFAULT NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX `idx_ft_day` (`day_number`),
              INDEX `idx_ft_active` (`is_active`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $cntFt = (int)$pdo->query("SELECT COUNT(*) FROM `day_schedules_field_trip`")->fetchColumn();
        if ($cntFt === 0) {
            $pdo->exec("
                INSERT INTO `day_schedules_field_trip` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `route`, `description`) VALUES
                (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip', 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.'),
                (1, 'Day 1: Keberangkatan Belitang → Semarang', 'Perjalanan Darat, Penyeberangan Selat Sunda & Manajemen Logistik Finansial', '2026-11-09', '07:00:00', '23:59:00', 1, 0, 'SMAN 1 Belitang → Pelabuhan Bakauheni → Kapal Ferry Selat Sunda → Merak → Tol Trans-Jawa → Transit Semarang', 'Perjalanan rombongan bus dari Belitang menuju Pelabuhan Bakauheni, penyeberangan kapal ferry Selat Sunda ke Merak, lanjut melintasi Tol Trans-Jawa via Cirebon menuju transit Semarang.'),
                (2, 'Day 2: AKPOL Semarang, Lawang Sewu → Malang', 'Kedisiplinan Taruna AKPOL, Sains Arsitektur Lawang Sewu & Etape Menuju Malang', '2026-11-10', '04:30:00', '20:30:00', 1, 0, 'Transit Semarang → AKPOL Semarang → Lawang Sewu → Tol Trans-Jawa → Hotel Kota Malang', 'Transit bersih diri di Semarang, kunjungan edukasi kedisiplinan di Akademi Kepolisian (AKPOL), eksplorasi sains arsitektur pasif Lawang Sewu, dan perjalanan tol menuju Kota Malang.'),
                (3, 'Day 3: Wisata Petik Apel Batu, Jatim Park 1 & Museum Angkut', 'Sains Hortikultura Apel Batu, Fisika Terapan Jatim Park 1 & Sejarah Transportasi', '2026-11-11', '07:00:00', '23:30:00', 1, 0, 'Hotel Malang → Agrowisata Petik Apel Batu → Jatim Park 1 → Museum Angkut → Transit Bromo', 'Eksplorasi sains hortikultura di kebun apel Kota Batu, wahana sains & teknologi terapan di Jatim Park 1, pembelajaran sejarah otomotif di Museum Angkut, serta perjalanan menuju transit Gunung Bromo.'),
                (4, 'Day 4: Sunrise Bromo, Kawah Bromo → Yogyakarta', 'Geologi Vulkanisme Bromo, Ekosistem Kaldera Tengger & Etape Menuju Yogyakarta', '2026-11-12', '00:00:00', '21:00:00', 1, 0, 'Rest Area Transit → Jeep Bromo → Sunrise Penanjakan → Kawah Bromo & Pasir Berbisik → Savana → Tol Jogja', 'Ekspedisi dini hari menggunakan Jeep 4x4, menyaksikan fenomena matahari terbit di Penanjakan, eksplorasi kawah aktif Bromo, lautan Pasir Berbisik, Padang Savana, serta perjalanan tol menuju Yogyakarta.'),
                (5, 'Day 5: Candi Prambanan, Praktik Membatik & Kampus UNY', 'Heritage Prambanan, Kriya Batik Benang Ratu & Eksplorasi Akademik UNY', '2026-11-13', '06:00:00', '21:30:00', 1, 0, 'Hotel Yogyakarta → Candi Prambanan → Sentra Batik Benang Ratu → Restoran Lokal → Kampus UNY → Hotel / Malioboro', 'Wisata cagar budaya mahakarya arsitektur Candi Hindu Prambanan, praktik langsung seni membatik menggunakan canting di Batik Benang Ratu, kunjungan akademik ke Universitas Negeri Yogyakarta (UNY), dan wisata budaya Malioboro.'),
                (6, 'Day 6: Industri Pabrik Bakpia, Bahari Pantai Drini → Belitang', 'Analisis Industri Pangan Bakpia, Sains Bahari Pantai Drini & Perjalanan Pulang', '2026-11-14', '06:30:00', '23:59:00', 1, 0, 'Hotel Yogyakarta → Pabrik Bakpia Khas Jogja → Pantai Drini Gunungkidul → Drini Park → Perjalanan Pulang ke Belitang', 'Observasi proses manufaktur industri kuliner oleh-oleh di Pabrik Bakpia Jogja, eksplorasi sains bahari dan keindahan tebing karst di Pantai Drini & Drini Park Gunungkidul, serta perjalanan rombongan kembali menuju Belitang OKU Timur.'),
                (7, 'Day 7: Penyeberangan Selat Sunda & Tiba di Belitang', 'Etape Terakhir Sumatera, Evaluasi Ekspedisi & Penyambutan SMAN 1 Belitang', '2026-11-15', '05:00:00', '14:00:00', 1, 0, 'Pelabuhan Merak → Kapal Ferry Selat Sunda → Bakauheni → Tol Trans-Sumatera → SMAN 1 Belitang', 'Penyeberangan kembali Selat Sunda dari Merak ke Bakauheni, melintasi Tol Trans-Sumatera menuju OKU Timur, kedatangan rombongan di SMAN 1 Belitang, dan penutupan resmi seluruh kegiatan kokurikuler.')
            ");
        } else {
            $cntFt0 = (int)$pdo->query("SELECT COUNT(*) FROM `day_schedules_field_trip` WHERE `day_number` = 0")->fetchColumn();
            if ($cntFt0 === 0) {
                $pdo->exec("
                    INSERT INTO `day_schedules_field_trip` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `route`, `description`) VALUES
                    (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip', 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.')
                ");
            }
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
    $category = strtolower(trim($_GET['category'] ?? 'non_field_trip'));
    $tableName = ($category === 'field_trip') ? 'day_schedules_field_trip' : 'day_schedules';

    try {
        $pdo = getDB();
        ensureDaySchedulesTable($pdo);
        $stmt = $pdo->query("SELECT * FROM `{$tableName}` ORDER BY `day_number` ASC");
        $rows = $stmt->fetchAll();
    } catch (Exception $e) {
        $rows = [];
    }

    if (empty($rows)) {
        $today = date('Y-m-d');
        if ($category === 'field_trip') {
            $rows = [
                ['day_number' => 0, 'title' => 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'theme' => 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', 'date' => $today, 'start_time' => '06:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip', 'description' => 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.'],
                ['day_number' => 1, 'title' => 'Day 1: Keberangkatan Belitang → Semarang', 'theme' => 'Perjalanan Darat, Penyeberangan Selat Sunda & Manajemen Logistik Finansial', 'date' => '2026-11-09', 'start_time' => '07:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'SMAN 1 Belitang → Bakauheni → Ferry Selat Sunda → Merak → Tol Trans-Jawa → Semarang', 'description' => 'Perjalanan rombongan bus dari Belitang menuju Pelabuhan Bakauheni, penyeberangan kapal ferry Selat Sunda ke Merak, lanjut melintasi Tol Trans-Jawa via Cirebon menuju transit Semarang.'],
                ['day_number' => 2, 'title' => 'Day 2: AKPOL Semarang, Lawang Sewu → Malang', 'theme' => 'Kedisiplinan Taruna AKPOL, Sains Arsitektur Lawang Sewu & Etape Menuju Malang', 'date' => '2026-11-10', 'start_time' => '04:30:00', 'end_time' => '20:30:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Transit Semarang → AKPOL Semarang → Lawang Sewu → Tol Menuju Malang', 'description' => 'Transit bersih diri di Semarang, kunjungan edukasi kedisiplinan di Akademi Kepolisian (AKPOL), eksplorasi sains arsitektur pasif Lawang Sewu, dan perjalanan tol menuju Kota Malang.'],
                ['day_number' => 3, 'title' => 'Day 3: Wisata Petik Apel Batu, Jatim Park 1 & Museum Angkut', 'theme' => 'Sains Hortikultura Apel Batu, Fisika Terapan Jatim Park 1 & Sejarah Transportasi', 'date' => '2026-11-11', 'start_time' => '07:00:00', 'end_time' => '23:30:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Malang → Petik Apel Batu → Jatim Park 1 → Museum Angkut → Transit Bromo', 'description' => 'Eksplorasi sains hortikultura di kebun apel Kota Batu, wahana sains & teknologi terapan di Jatim Park 1, pembelajaran sejarah otomotif di Museum Angkut, serta perjalanan menuju transit Gunung Bromo.'],
                ['day_number' => 4, 'title' => 'Day 4: Sunrise Bromo, Kawah Bromo → Yogyakarta', 'theme' => 'Geologi Vulkanisme Bromo, Ekosistem Kaldera Tengger & Etape Menuju Yogyakarta', 'date' => '2026-11-12', 'start_time' => '00:00:00', 'end_time' => '21:00:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Rest Area → Jeep Bromo → Sunrise Penanjakan → Kawah & Savana → Tol Jogja', 'description' => 'Ekspedisi dini hari menggunakan Jeep 4x4, menyaksikan fenomena matahari terbit di Penanjakan, eksplorasi kawah aktif Bromo, lautan Pasir Berbisik, Padang Savana, serta perjalanan tol menuju Yogyakarta.'],
                ['day_number' => 5, 'title' => 'Day 5: Candi Prambanan, Praktik Membatik & Kampus UNY', 'theme' => 'Heritage Prambanan, Kriya Batik Benang Ratu & Eksplorasi Akademik UNY', 'date' => '2026-11-13', 'start_time' => '06:00:00', 'end_time' => '21:30:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Hotel Jogja → Candi Prambanan → Sentra Batik → Kampus UNY → Malioboro', 'description' => 'Wisata cagar budaya mahakarya arsitektur Candi Hindu Prambanan, praktik langsung seni membatik menggunakan canting di Batik Benang Ratu, kunjungan akademik ke Universitas Negeri Yogyakarta (UNY), dan wisata budaya Malioboro.'],
                ['day_number' => 6, 'title' => 'Day 6: Industri Pabrik Bakpia, Bahari Pantai Drini → Belitang', 'theme' => 'Analisis Industri Pangan Bakpia, Sains Bahari Pantai Drini & Perjalanan Pulang', 'date' => '2026-11-14', 'start_time' => '06:30:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Hotel Jogja → Pabrik Bakpia → Pantai Drini → Drini Park → Tol Trans-Jawa', 'description' => 'Observasi proses manufaktur industri kuliner oleh-oleh di Pabrik Bakpia Jogja, eksplorasi sains bahari dan keindahan tebing karst di Pantai Drini & Drini Park Gunungkidul, serta perjalanan rombongan kembali menuju Belitang OKU Timur.'],
                ['day_number' => 7, 'title' => 'Day 7: Penyeberangan Selat Sunda & Tiba di Belitang', 'theme' => 'Etape Terakhir Sumatera, Evaluasi Ekspedisi & Penyambutan SMAN 1 Belitang', 'date' => '2026-11-15', 'start_time' => '05:00:00', 'end_time' => '14:00:00', 'is_active' => 1, 'auto_schedule' => 0, 'route' => 'Merak → Ferry Selat Sunda → Bakauheni → Tol Trans-Sumatera → SMAN 1 Belitang', 'description' => 'Penyeberangan kembali Selat Sunda dari Merak ke Bakauheni, melintasi Tol Trans-Sumatera menuju OKU Timur, kedatangan rombongan di SMAN 1 Belitang, dan penutupan resmi seluruh kegiatan kokurikuler.']
            ];
        } else {
            $rows = [
                ['day_number' => 0, 'title' => 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'theme' => 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', 'date' => $today, 'start_time' => '06:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'description' => 'Sesi uji coba dan orientasi teknis seluruh fitur aplikasi FINCESTEM sebelum pelaksanaan asli.'],
                ['day_number' => 1, 'title' => 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur', 'theme' => 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah', 'date' => '2026-11-09', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 1, 'auto_schedule' => 0, 'description' => 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.'],
                ['day_number' => 2, 'title' => 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur', 'theme' => 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering', 'date' => '2026-11-10', 'start_time' => '07:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'description' => 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.'],
                ['day_number' => 3, 'title' => 'Day 3: Analisis STEM pada 7 Sektor Unggulan OKU Timur', 'theme' => 'Kajian Sains, Teknologi, Rekayasa Lapangan & Matematika Finansial', 'date' => '2026-11-11', 'start_time' => '07:00:00', 'end_time' => '23:59:00', 'is_active' => 1, 'auto_schedule' => 0, 'description' => 'Observasi dan investigasi lapangan autentik memadukan 4 pilar STEM (Sains, Teknologi, Engineering, dan Matematika) pada sektor agrikultur pangan, perkebunan, peternakan, perikanan, agro-industri pangan, perdagangan niaga, atau jasa keuangan di Kabupaten OKU Timur.'],
                ['day_number' => 4, 'title' => 'Day 4: EXPLORATION', 'theme' => 'Eksplorasi Peralatan, Perlengkapan Kerja & Analisis 4 Dimensi STEM Sektor Pilihan', 'date' => '2026-11-12', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Eksplorasi mendalam peralatan, perlengkapan kerja (APD), dan mesin mekanisasi pada sektor pilihan Day 3 serta mengaitkannya langsung dengan Science, Technology, Engineering, dan Mathematics (STEM).'],
                ['day_number' => 5, 'title' => 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', 'theme' => 'Culture & Kearifan Lokal Komunitas Multikultural', 'date' => '2026-11-13', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Kajian tradisi gotong royong dan etnosains.'],
                ['day_number' => 6, 'title' => 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', 'theme' => 'Data Science & Penyusunan Laporan Proyek', 'date' => '2026-11-14', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.'],
                ['day_number' => 7, 'title' => 'Day 7: Video Refleksi, BTS & Jurnal Refleksi', 'theme' => 'Refleksi Perjalanan Riset Day 1–7, Video YouTube, BTS & Bebas Asesmen', 'date' => '2026-11-15', 'start_time' => '07:00:00', 'end_time' => '18:00:00', 'is_active' => 0, 'auto_schedule' => 1, 'description' => 'Pembuatan video refleksi perjalanan riset mandiri dari Day 1 s.d. Day 7 (5–8 menit) dilengkapi cuplikan Behind The Scene (BTS / Bloopers), unggah foto bebas diri ber-Google Geotag, pengisian jurnal refleksi, serta apresiasi kelulusan riset (Bebas Kuis Asesmen 100/100).']
            ];
        }
    }

    // JAMINAN MUTLAK: Pastikan Day 0 selalu ada di $rows
    $hasDay0 = false;
    foreach ($rows as $r) {
        if ((int)$r['day_number'] === 0) {
            $hasDay0 = true;
            break;
        }
    }
    if (!$hasDay0) {
        $today = date('Y-m-d');
        $desc0 = ($category === 'field_trip')
            ? 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.'
            : 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM sebelum pelaksanaan riset lapangan sesungguhnya.';
        $route0 = ($category === 'field_trip') ? 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip' : '';
        
        $day0Row = [
            'id'            => 0,
            'day_number'    => 0,
            'title'         => 'Day 0: Simulasi & Gladi Bersih FINCESTEM',
            'theme'         => 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi',
            'date'          => $today,
            'start_time'    => '06:00:00',
            'end_time'      => '23:59:00',
            'is_active'     => 1,
            'auto_schedule' => 0,
            'route'         => $route0,
            'description'   => $desc0
        ];

        try {
            if (isset($pdo) && $pdo) {
                if ($category === 'field_trip') {
                    $pdo->exec("INSERT IGNORE INTO `day_schedules_field_trip` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `route`, `description`) VALUES (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, '{$route0}', '{$desc0}')");
                } else {
                    $pdo->exec("INSERT IGNORE INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', '{$today}', '06:00:00', '23:59:00', 1, 0, '{$desc0}')");
                }
            }
        } catch (Exception $eIns0) {}

        array_unshift($rows, $day0Row);
    }

    $testerRows = [];
    $testerNisns = [];
    $isReqTester = false;
    $reqNisn = trim($_GET['nisn'] ?? '');
    try {
        if (isset($pdo) && $pdo) {
            $stmtT = $pdo->query("SELECT * FROM `tester_students` ORDER BY `created_at` DESC");
            if ($stmtT) {
                $testerRows = $stmtT->fetchAll(PDO::FETCH_ASSOC);
                foreach ($testerRows as $tr) {
                    $tn = trim((string)($tr['nisn'] ?? ''));
                    if ($tn !== '') {
                        $testerNisns[] = $tn;
                        if ($reqNisn !== '' && $role !== 'admin') {
                            if ($reqNisn === $tn || ltrim($reqNisn, '0') === ltrim($tn, '0')) {
                                $isReqTester = true;
                            }
                        }
                    }
                }
            }
        }
    } catch (Exception $eTester) {}

    $days = [];
    foreach ($rows as $r) {
        $dayNum = (int)$r['day_number'];
        $dDate = $r['date'];
        $startTime = $r['start_time'];
        $endTime = $r['end_time'];
        $isActive = (int)$r['is_active'];
        $autoSched = (int)$r['auto_schedule'];

        // Day 0 (Day Uji Coba / Simulasi): Mode manual penuh, status terbuka/tutup dikendalikan oleh is_active dari Admin
        if ($dayNum === 0) {
            $autoSched = 0;
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

        // Jika siswa yang sedang request terdaftar di Akun Uji Coba (VIP Tester), buka semua hari khusus untuk dirinya
        $origActive = $isActive;
        $origAuto = $autoSched;
        if ($isReqTester) {
            $isActive = 1;
            $autoSched = 0;
            $isOpen = true;
            $statusCode = 'OPEN';
            $statusLabel = '🧪 Terbuka (Akun Uji Coba Admin)';
        }

        $days[] = [
            'id'               => (int)($r['id'] ?? 0),
            'orig_is_active'   => $origActive,
            'orig_auto_schedule'=> $origAuto,
            'is_tester_bypass' => $isReqTester,
            'day_number'    => $dayNum,
            'title'         => $r['title'],
            'theme'         => $r['theme'],
            'date'          => $dDate,
            'date_formatted'=> date('d M Y', strtotime($dDate)),
            'start_time'    => substr($startTime, 0, 5),
            'end_time'      => substr($endTime, 0, 5),
            'is_active'     => $isActive,
            'auto_schedule' => $autoSched,
            'route'         => $r['route'] ?? '',
            'description'   => $r['description'],
            'is_open'       => $isOpen,
            'status_code'   => $statusCode,
            'status_label'  => $statusLabel
        ];
    }

    jsonResponse(true, 'Data jadwal berhasil diambil', [
        'server_time' => $now->format('Y-m-d H:i:s'),
        'server_date' => $nowDateStr,
        'category'    => $category,
        'days'            => $days,
        'tester_students' => $testerRows,
        'tester_nisns'    => $testerNisns,
        'is_tester'       => $isReqTester
    ]);
}

if ($method === 'POST') {
    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $action = $input['action'] ?? 'update_day';
    $category = strtolower(trim($input['category'] ?? 'non_field_trip'));
    $tableName = ($category === 'field_trip') ? 'day_schedules_field_trip' : 'day_schedules';

    // AKSI KHUSUS TESTER: TAMBAH / HAPUS / RESET DAFTAR AKUN SISWA UJI COBA (VIP TESTER)
    if ($action === 'add_tester') {
        $nisn = trim((string)($input['nisn'] ?? ''));
        $nis = trim((string)($input['nis'] ?? ''));
        $studentName = trim((string)($input['student_name'] ?? ''));
        $className = trim((string)($input['class_name'] ?? ''));
        $zone = trim((string)($input['zone'] ?? 'FINCESTEM OKU TIMUR'));

        if ($nisn === '') {
            jsonResponse(false, 'NISN siswa wajib diisi!', null, 400);
        }

        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);

            $stmt = $pdo->prepare("
                INSERT INTO `tester_students` (`nisn`, `nis`, `student_name`, `class_name`, `zone`)
                VALUES (:nisn, :nis, :name, :cls, :zone)
                ON DUPLICATE KEY UPDATE
                    `nis` = VALUES(`nis`),
                    `student_name` = VALUES(`student_name`),
                    `class_name` = VALUES(`class_name`),
                    `zone` = VALUES(`zone`)
            ");
            $stmt->execute([
                ':nisn' => $nisn,
                ':nis'  => $nis,
                ':name' => $studentName,
                ':cls'  => $className,
                ':zone' => $zone
            ]);

            // Bebaskan kunci perangkat siswa ini agar Admin bisa tes dari HP/laptop manapun tanpa mengunci HP siswa asli
            try {
                $stmtUnl = $pdo->prepare("UPDATE `users` SET `device_id` = NULL, `device_info` = NULL, `device_locked_at` = NULL WHERE `identifier` = :n1 OR `identifier` = :n2");
                $stmtUnl->execute([':n1' => $nisn, ':n2' => ltrim($nisn, '0')]);
            } catch (Exception $eUnl) {}

            $rowsT = $pdo->query("SELECT * FROM `tester_students` ORDER BY `created_at` DESC")->fetchAll(PDO::FETCH_ASSOC);
            $nisnsT = array_values(array_filter(array_map(function($r) { return trim((string)($r['nisn'] ?? '')); }, $rowsT)));

            jsonResponse(true, 'Siswa ' . ($studentName ?: $nisn) . ' berhasil ditambahkan sebagai Akun Uji Coba (VIP Tester)! Seluruh Day 0–7 kini terbuka khusus untuk akun ini.', [
                'tester_students' => $rowsT,
                'tester_nisns'    => $nisnsT
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal menambahkan siswa uji coba: ' . $e->getMessage(), null, 500);
        }
    }

    if ($action === 'remove_tester') {
        $nisn = trim((string)($input['nisn'] ?? ''));
        if ($nisn === '') {
            jsonResponse(false, 'NISN siswa wajib diisi!', null, 400);
        }
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);

            $stmt = $pdo->prepare("DELETE FROM `tester_students` WHERE `nisn` = :n1 OR `nisn` = :n2");
            $stmt->execute([':n1' => $nisn, ':n2' => ltrim($nisn, '0')]);

            // Reset kunci perangkat siswa agar saat siswa asli login di HP-nya tidak terblokir bekas tes Admin
            try {
                $stmtUnl = $pdo->prepare("UPDATE `users` SET `device_id` = NULL, `device_info` = NULL, `device_locked_at` = NULL WHERE `identifier` = :n1 OR `identifier` = :n2");
                $stmtUnl->execute([':n1' => $nisn, ':n2' => ltrim($nisn, '0')]);
            } catch (Exception $eUnl) {}

            $rowsT = $pdo->query("SELECT * FROM `tester_students` ORDER BY `created_at` DESC")->fetchAll(PDO::FETCH_ASSOC);
            $nisnsT = array_values(array_filter(array_map(function($r) { return trim((string)($r['nisn'] ?? '')); }, $rowsT)));

            jsonResponse(true, 'Akses Uji Coba siswa berhasil dicabut! Akun siswa kembali mengikuti jadwal resmi.', [
                'tester_students' => $rowsT,
                'tester_nisns'    => $nisnsT
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal mencabut akses tester: ' . $e->getMessage(), null, 500);
        }
    }

    if ($action === 'clear_all_testers') {
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);

            try {
                $pdo->exec("UPDATE `users` SET `device_id` = NULL, `device_info` = NULL, `device_locked_at` = NULL WHERE `identifier` IN (SELECT `nisn` FROM `tester_students`)");
            } catch (Exception $eUnl) {}

            $pdo->exec("DELETE FROM `tester_students`");

            jsonResponse(true, 'Seluruh Akun Uji Coba (VIP Tester) telah dicabut dan dikembalikan ke aturan jadwal resmi!', [
                'tester_students' => [],
                'tester_nisns'    => []
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal menghapus daftar tester: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI MASTER 1: BUKA SEMUA HARI DAY 1 - 7 (UNTUK ADMIN TES & COBA LANGSUNG DI HP)
    if ($action === 'open_all_days') {
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);
            // Set is_active = 1 dan auto_schedule = 0 agar sistem bypass tanggal/jam dan langsung TERBUKA
            $pdo->exec("UPDATE `{$tableName}` SET `is_active` = 1, `auto_schedule` = 0 WHERE `day_number` >= 1 AND `day_number` <= 7");

            jsonResponse(true, 'Semua Jadwal Utama Day 1 s.d. Day 7 (' . ($category === 'field_trip' ? 'Field Trip' : 'Non-Field Trip') . ') berhasil DIBUKA SERENTAK! Seluruh menu di HP siswa dan admin langsung dapat dicoba sekarang.', [
                'category' => $category,
                'status'   => 'ALL_OPEN'
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal membuka jadwal: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI MASTER 1B: TUTUP SEMUA HARI DAY 1 - 7 (KUNCI PAKSA DARI ADMIN)
    if ($action === 'close_all_days') {
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);
            $pdo->exec("UPDATE `{$tableName}` SET `is_active` = 0 WHERE `day_number` >= 1 AND `day_number` <= 7");

            jsonResponse(true, 'Semua Jadwal Utama Day 1 s.d. Day 7 (' . ($category === 'field_trip' ? 'Field Trip' : 'Non-Field Trip') . ') berhasil DITUTUP PAKSA!', [
                'category' => $category,
                'status'   => 'ALL_CLOSED'
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal menutup jadwal: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI MASTER 2: KEMBALIKAN KE JADWAL ASLI (09 - 15 NOVEMBER 2026, 07:00 - 18:00 WIB)
    if ($action === 'reset_official_schedule') {
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);

            $officialDates = [
                1 => '2026-11-09',
                2 => '2026-11-10',
                3 => '2026-11-11',
                4 => '2026-11-12',
                5 => '2026-11-13',
                6 => '2026-11-14',
                7 => '2026-11-15'
            ];

            $stmtUpdate = $pdo->prepare("
                UPDATE `{$tableName}` 
                SET `date` = :dDate, 
                    `start_time` = '07:00:00', 
                    `end_time` = '18:00:00', 
                    `is_active` = 1, 
                    `auto_schedule` = 1 
                WHERE `day_number` = :day
            ");

            foreach ($officialDates as $dayNum => $dateStr) {
                $stmtUpdate->execute([
                    ':dDate' => $dateStr,
                    ':day'   => $dayNum
                ]);
            }

            jsonResponse(true, 'Pengaturan jadwal (' . ($category === 'field_trip' ? 'Field Trip' : 'Non-Field Trip') . ') berhasil DIKEMBALIKAN KE JADWAL RESMI! Pelaksanaan resmi terkunci pada 09 - 15 November 2026, dibuka pukul 07.00 dan ditutup pukul 18.00 WIB setiap harinya.', [
                'category' => $category,
                'status'   => 'OFFICIAL_RESET'
            ]);
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal mengembalikan jadwal resmi: ' . $e->getMessage(), null, 500);
        }
    }

    // AKSI KHUSUS: Toggle sakelar Day Uji Coba (Aktifkan / Nonaktifkan / Sembunyikan)
    if ($action === 'toggle_trial_day') {
        $isActive = isset($input['is_active']) ? (int)$input['is_active'] : 0;
        $today = date('Y-m-d');
        try {
            $pdo = getDB();
            ensureDaySchedulesTable($pdo);

            // 1. Non-Field Trip
            $stmt = $pdo->prepare("
                INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`)
                VALUES (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', :dToday, '06:00:00', '23:59:00', :act, 0, 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM sebelum pelaksanaan riset lapangan sesungguhnya.')
                ON DUPLICATE KEY UPDATE `is_active` = :act2
            ");
            $stmt->execute([':dToday' => $today, ':act' => $isActive, ':act2' => $isActive]);

            // 2. Field Trip
            try {
                $stmtFt = $pdo->prepare("
                    INSERT INTO `day_schedules_field_trip` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `route`, `description`)
                    VALUES (0, 'Day 0: Simulasi & Gladi Bersih FINCESTEM', 'Orientasi Sistem, Pengisian LKPD, Asesmen Latihan & Unggah Dokumentasi', :dToday, '06:00:00', '23:59:00', :act, 0, 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip', 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.')
                    ON DUPLICATE KEY UPDATE `is_active` = :act2
                ");
                $stmtFt->execute([':dToday' => $today, ':act' => $isActive, ':act2' => $isActive]);
            } catch (Exception $eFt) {}

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
            if ($isActive === 1) {
                // Ketika admin memilih BUKA, set is_active = 1 DAN auto_schedule = 0
                // agar hari langsung TERBUKA tanpa terhalang jam/tanggal masa depan
                $stmt = $pdo->prepare("UPDATE `{$tableName}` SET `is_active` = 1, `auto_schedule` = 0 WHERE `day_number` = :d");
                $stmt->execute([':d' => $dayNum]);
            } else {
                // Ketika admin memilih TUTUP paksa
                $stmt = $pdo->prepare("UPDATE `{$tableName}` SET `is_active` = 0 WHERE `day_number` = :d");
                $stmt->execute([':d' => $dayNum]);
            }

            jsonResponse(true, 'Status Day ' . $dayNum . ' (' . ($category === 'field_trip' ? 'Field Trip' : 'Non-Field Trip') . ') berhasil diubah menjadi ' . ($isActive ? 'Buka' : 'Tutup (Paksa)'), [
                'day_number' => $dayNum,
                'category'   => $category,
                'is_active'  => $isActive,
                'auto_schedule' => ($isActive === 1 ? 0 : 1),
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

            if ($category === 'field_trip') {
                $stmt = $pdo->prepare("
                    INSERT INTO `day_schedules_field_trip` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `route`, `description`)
                    VALUES (:day, :title, :theme, :dDate, :sTime, :eTime, :act, :auto, :route, :desc)
                    ON DUPLICATE KEY UPDATE
                        `title` = VALUES(`title`),
                        `theme` = VALUES(`theme`),
                        `date` = VALUES(`date`),
                        `start_time` = VALUES(`start_time`),
                        `end_time` = VALUES(`end_time`),
                        `is_active` = VALUES(`is_active`),
                        `auto_schedule` = VALUES(`auto_schedule`),
                        `route` = VALUES(`route`),
                        `description` = VALUES(`description`)
                ");
                foreach ($dayList as $d) {
                    $stmt->execute([
                        ':day'   => (int)$d['day_number'],
                        ':title' => $d['title'] ?? ('Day ' . $d['day_number']),
                        ':theme' => $d['theme'] ?? '',
                        ':dDate' => $d['date'] ?? '2026-11-09',
                        ':sTime' => strlen($d['start_time'] ?? '') === 5 ? $d['start_time'] . ':00' : ($d['start_time'] ?? '07:00:00'),
                        ':eTime' => strlen($d['end_time'] ?? '') === 5 ? $d['end_time'] . ':00' : ($d['end_time'] ?? '23:59:00'),
                        ':act'   => isset($d['is_active']) ? (int)$d['is_active'] : 1,
                        ':auto'  => isset($d['auto_schedule']) ? (int)$d['auto_schedule'] : 0,
                        ':route' => $d['route'] ?? '',
                        ':desc'  => $d['description'] ?? ''
                    ]);
                }
            } else {
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
            }

            jsonResponse(true, 'Pengaturan jadwal (' . ($category === 'field_trip' ? 'Field Trip' : 'Non-Field Trip') . ') berhasil disimpan ke database!');
        } catch (Exception $e) {
            jsonResponse(false, 'Gagal menyimpan jadwal: ' . $e->getMessage(), null, 500);
        }
    }

    jsonResponse(false, 'Aksi tidak dikenali', null, 400);
}
