-- ======================================================================
-- FINCESTEM 2026 - Migration Update Schema v2
-- Pembaruan Tabel Users (Foto, Zona, Pembina) & Tabel Jadwal Day 1-7
-- ======================================================================

SET NAMES utf8mb4;

-- 1. Tambahkan kolom photo_url, zone, coordinator_name, facilitator_name ke tabel users jika belum ada
ALTER TABLE `users` 
  ADD COLUMN IF NOT EXISTS `photo_url` VARCHAR(255) DEFAULT NULL COMMENT 'Path URL foto profil siswa' AFTER `gender`,
  ADD COLUMN IF NOT EXISTS `zone` VARCHAR(50) DEFAULT 'FINCESTEM OKU TIMUR' COMMENT 'Zona Riset Siswa' AFTER `class_name`,
  ADD COLUMN IF NOT EXISTS `coordinator_name` VARCHAR(150) DEFAULT 'Drs. H. Koordinator FINCESTEM' COMMENT 'Nama Guru Koordinator' AFTER `assignment`,
  ADD COLUMN IF NOT EXISTS `facilitator_name` VARCHAR(150) DEFAULT 'Tim Fasilitator SMAN 1 Belitang' COMMENT 'Nama Guru Fasilitator' AFTER `coordinator_name`;

-- 2. Buat tabel day_schedules untuk kontrol buka/tutup Day 1 s.d. Day 7
CREATE TABLE IF NOT EXISTS `day_schedules` (
  `day_number` INT PRIMARY KEY COMMENT 'Nomor Hari (1 - 7)',
  `title` VARCHAR(150) NOT NULL COMMENT 'Judul Tema Hari',
  `theme` VARCHAR(100) NOT NULL COMMENT 'Sub Tema Riset',
  `date` DATE NOT NULL COMMENT 'Tanggal Pelaksanaan',
  `start_time` TIME NOT NULL DEFAULT '07:00:00' COMMENT 'Jam Mulai Pengerjaan',
  `end_time` TIME NOT NULL DEFAULT '18:00:00' COMMENT 'Jam Selesai Pengerjaan',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1 = Buka (Open), 0 = Tutup (Locked)',
  `auto_schedule` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1 = Otomatis sesuai tanggal dan jam, 0 = Manual override',
  `description` TEXT DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Data Default Day 1 s.d. Day 7 (9 November s.d. 15 November 2026)
INSERT INTO `day_schedules` (`day_number`, `title`, `theme`, `date`, `start_time`, `end_time`, `is_active`, `auto_schedule`, `description`) VALUES
(1, 'Day 1: Orientasi & Pembekalan Riset', 'Pembekalan STEM & Etika Riset Lapangan', '2026-11-09', '07:00:00', '18:00:00', 1, 1, 'Pengenalan instrumen observasi, sosialisasi modul kokurikuler, dan konsolidasi tim ekspedisi.'),
(2, 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', 'STEM Sains & Konservasi Lingkungan Belitang', '2026-11-10', '07:00:00', '18:00:00', 0, 1, 'Pengambilan sampel kualitas air saluran irigasi, identifikasi flora-fauna sawah pasang surut.'),
(3, 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', 'Teknologi Pertanian Modern & Mekanisasi', '2026-11-11', '07:00:00', '18:00:00', 0, 1, 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.'),
(4, 'Day 4: Literasi Finansial & Rantai Pasok Pangan', 'Financial Literacy & Ekonomi Agrikultur', '2026-11-12', '07:00:00', '18:00:00', 0, 1, 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.'),
(5, 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', 'Culture & Kearifan Lokal Komunitas Multikultural', '2026-11-13', '07:00:00', '18:00:00', 0, 1, 'Wawancara tetua adat, kajian tradisi gotong royong lumbung desa, dan pencatatan nilai-nilai budaya.'),
(6, 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', 'Data Science & Penyusunan Laporan Proyek', '2026-11-14', '07:00:00', '18:00:00', 0, 1, 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.'),
(7, 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', 'Diseminasi Temuan & Refleksi Kokurikuler', '2026-11-15', '07:00:00', '20:00:00', 0, 1, 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.')
ON DUPLICATE KEY UPDATE 
  `title` = VALUES(`title`),
  `theme` = VALUES(`theme`),
  `date` = VALUES(`date`),
  `start_time` = VALUES(`start_time`),
  `end_time` = VALUES(`end_time`),
  `description` = VALUES(`description`);
