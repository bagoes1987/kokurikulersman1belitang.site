-- ======================================================================
-- FINCESTEM 2026 - SMAN 1 BELITANG
-- Skema Basis Data MySQL (Kompatibel dengan cPanel / phpMyAdmin)
-- ======================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------
-- 1. TABEL PENGGUNA (users)
-- Menyimpan data login seluruh Siswa, Fasilitator, Koordinator, dan Admin
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `identifier` VARCHAR(50) NOT NULL UNIQUE COMMENT 'NISN untuk siswa, NIP/Username untuk guru/admin',
  `password_hash` VARCHAR(255) NOT NULL COMMENT 'Kata sandi atau hash sandi',
  `name` VARCHAR(150) NOT NULL COMMENT 'Nama Lengkap Siswa / Guru / Admin',
  `role` ENUM('siswa', 'fasilitator', 'koordinator', 'admin') NOT NULL DEFAULT 'siswa',
  `gender` ENUM('L', 'P') DEFAULT NULL COMMENT 'Jenis Kelamin',
  `class_name` VARCHAR(50) DEFAULT NULL COMMENT 'Kelas siswa (misal: X.1, XI.3)',
  `assignment` VARCHAR(150) DEFAULT NULL COMMENT 'Tugas tambahan (misal: Pembina Kelas XI)',
  `phone` VARCHAR(30) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_role` (`role`),
  INDEX `idx_class` (`class_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 2. TABEL KELOMPOK EKSPEDISI (groups)
-- Menyimpan data kelompok riset kokurikuler
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `groups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL COMMENT 'Nama Kelompok (misal: Kelompok 1 - STEM Irigasi)',
  `class_name` VARCHAR(50) NOT NULL COMMENT 'Kelas asal kelompok',
  `leader_nisn` VARCHAR(50) DEFAULT NULL COMMENT 'NISN Ketua Kelompok',
  `zone` VARCHAR(100) DEFAULT 'Zona OKU Timur' COMMENT 'Zona Riset (OKU Timur / Luar OKU Timur)',
  `destination` VARCHAR(255) DEFAULT NULL COMMENT 'Lokasi/Rute Observasi Riset',
  `route_status` ENUM('Menunggu', 'Disetujui', 'Ditolak') NOT NULL DEFAULT 'Menunggu',
  `route_notes` TEXT DEFAULT NULL COMMENT 'Catatan persetujuan rute dari koordinator',
  `facilitator_id` INT DEFAULT NULL COMMENT 'ID Guru Fasilitator Pembina',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_class_group` (`class_name`),
  INDEX `idx_status` (`route_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 3. TABEL ANGGOTA KELOMPOK (group_members)
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `group_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `student_nisn` VARCHAR(50) NOT NULL,
  `role_in_group` VARCHAR(50) DEFAULT 'Anggota' COMMENT 'Ketua, Sekretaris, Anggota',
  `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_student_group` (`student_nisn`),
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 4. TABEL MATERI & MODUL PEMBELAJARAN (materi)
-- Modul referensi yang diunggah oleh Fasilitator atau Admin
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `materi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL COMMENT 'Judul Modul / Materi',
  `pillar` ENUM('financial', 'culture', 'exploration', 'stem', 'umum') NOT NULL DEFAULT 'umum',
  `description` TEXT DEFAULT NULL,
  `file_url` VARCHAR(255) DEFAULT NULL COMMENT 'Path URL file PDF atau dokumen di server',
  `file_type` VARCHAR(20) DEFAULT 'pdf' COMMENT 'pdf, docx, video, link',
  `external_link` VARCHAR(255) DEFAULT NULL COMMENT 'Link video YouTube / Google Drive tambahan',
  `uploaded_by` VARCHAR(150) DEFAULT 'Tim Kurikulum',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 5. TABEL PENGUMPULAN LKPD (lkpd_submissions)
-- Lembar kerja digital 4 pilar yang dikumpulkan oleh kelompok siswa
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lkpd_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `pillar` ENUM('financial', 'culture', 'exploration', 'stem') NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `answers_json` LONGTEXT DEFAULT NULL COMMENT 'Data jawaban isian LKPD format JSON',
  `attachment_url` VARCHAR(255) DEFAULT NULL COMMENT 'File laporan PDF atau foto pendukung',
  `status` ENUM('Draft', 'Terkirim', 'Dinilai', 'Perlu Revisi') NOT NULL DEFAULT 'Terkirim',
  `submitted_by_nisn` VARCHAR(50) DEFAULT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE CASCADE,
  INDEX `idx_group_pillar` (`group_id`, `pillar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 6. TABEL PENILAIAN FASILITATOR (evaluasi_nilai)
-- Rekapitulasi nilai 4 pilar FINCESTEM per kelompok
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `evaluasi_nilai` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL UNIQUE,
  `facilitator_id` INT DEFAULT NULL,
  `score_financial` DECIMAL(5, 2) DEFAULT 0.00 COMMENT 'Skor Pilar 1: Financial',
  `score_culture` DECIMAL(5, 2) DEFAULT 0.00 COMMENT 'Skor Pilar 2: Culture',
  `score_exploration` DECIMAL(5, 2) DEFAULT 0.00 COMMENT 'Skor Pilar 3: Exploration',
  `score_stem` DECIMAL(5, 2) DEFAULT 0.00 COMMENT 'Skor Pilar 4: STEM',
  `final_average` DECIMAL(5, 2) GENERATED ALWAYS AS ((`score_financial` + `score_culture` + `score_exploration` + `score_stem`) / 4) STORED,
  `feedback` TEXT DEFAULT NULL COMMENT 'Catatan evaluasi guru pembina',
  `is_published` TINYINT(1) DEFAULT 1,
  `graded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 7. TABEL DOKUMENTASI MEDIA (dokumentasi_media)
-- Foto dan video riset lapangan yang diunggah siswa
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `dokumentasi_media` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL COMMENT 'Judul Dokumentasi',
  `caption` TEXT DEFAULT NULL COMMENT 'Deskripsi / narasi kegiatan',
  `media_type` ENUM('foto', 'video') NOT NULL DEFAULT 'foto',
  `file_url` VARCHAR(255) NOT NULL COMMENT 'URL file foto atau video di server',
  `thumbnail_url` VARCHAR(255) DEFAULT NULL,
  `gps_location` VARCHAR(100) DEFAULT NULL COMMENT 'Koordinat latitude, longitude atau nama lokasi',
  `uploaded_by_nisn` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE CASCADE,
  INDEX `idx_media_group` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- 8. TABEL PRESENSI SISWA (presensi)
-- Kehadiran peserta didik selama kegiatan riset lapangan
-- ----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `presensi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_nisn` VARCHAR(50) NOT NULL,
  `group_id` INT DEFAULT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('Hadir', 'Izin', 'Sakit', 'Alpa') NOT NULL DEFAULT 'Hadir',
  `notes` VARCHAR(255) DEFAULT NULL,
  `recorded_by` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_student_date` (`student_nisn`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- AKUN DEFAULT AWAL (Bisa langsung digunakan login pertama kali)
-- Sandi default dapat diganti setelah masuk sistem
-- ----------------------------------------------------------------------
INSERT INTO `users` (`identifier`, `password_hash`, `name`, `role`, `assignment`) VALUES
('admin', 'admin2026', 'Administrator IT', 'admin', 'Tim IT SMAN 1 Belitang'),
('koordinator', 'koordinator2026', 'Koordinator Kokurikuler', 'koordinator', 'Koordinator Wilayah SMAN 1 Belitang'),
('fasilitator', 'fasilitator2026', 'Fasilitator Pembina', 'fasilitator', 'Pembina Kokurikuler FINCESTEM')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

SET FOREIGN_KEY_CHECKS = 1;
