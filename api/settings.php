<?php
/**
 * FINCESTEM 2026 - Zone & Pembina Settings Endpoint
 * Mengatur pembagian zona riset (OKU TIMUR / LUAR OKU TIMUR) dan penugasan Koordinator/Fasilitator
 */
require_once __DIR__ . '/db.php';

// Pastikan respon anti-cache aktif
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$method = $_SERVER['REQUEST_METHOD'];

function ensureRoleTables($pdo) {
    static $checked = false;
    if ($checked) return;
    $lockFile = sys_get_temp_dir() . '/fincestem_tables_v2.lock';
    if (file_exists($lockFile) && (time() - filemtime($lockFile) < 3600)) {
        $checked = true;
        return;
    }

    try {
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `zone` VARCHAR(50) DEFAULT 'FINCESTEM OKU TIMUR' AFTER `photo_url`");
    } catch (Exception $e) {}

    try {
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_id` VARCHAR(100) DEFAULT NULL AFTER `zone`");
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_info` VARCHAR(255) DEFAULT NULL AFTER `device_id`");
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `device_locked_at` DATETIME DEFAULT NULL AFTER `device_info`");
    } catch (Exception $eDev) {}

    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `student_custom_zones` (
                `nisn` VARCHAR(50) PRIMARY KEY,
                `zone` VARCHAR(50) NOT NULL,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Tabel Dispensasi Domisili Siswa Luar OKU Timur (Whitelist Admin Bebas Pinalti Bintang 1)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `student_location_exemptions` (
                `nisn` VARCHAR(50) PRIMARY KEY,
                `reason` VARCHAR(255) DEFAULT 'Domisili Luar OKU Timur',
                `approved_by` VARCHAR(100) DEFAULT 'admin',
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $eEx) {}

    // Tabel Pengaturan Jam Batas Penilaian Field Trip Day 1 s.d. Day 7
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `field_trip_grading_rules` (
                `day_number` INT PRIMARY KEY,
                `cutoff_perfect` TIME NOT NULL DEFAULT '16:00:00',
                `cutoff_bintang5` TIME NOT NULL DEFAULT '21:00:00',
                `cutoff_bintang4` TIME NOT NULL DEFAULT '23:59:59',
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
        $cntR = (int)$pdo->query("SELECT COUNT(*) FROM `field_trip_grading_rules`")->fetchColumn();
        if ($cntR === 0) {
            $pdo->exec("
                INSERT INTO `field_trip_grading_rules` (`day_number`, `cutoff_perfect`, `cutoff_bintang5`, `cutoff_bintang4`) VALUES
                (1, '16:00:00', '21:00:00', '23:59:59'),
                (2, '16:00:00', '21:00:00', '23:59:59'),
                (3, '16:00:00', '21:00:00', '23:59:59'),
                (4, '16:00:00', '21:00:00', '23:59:59'),
                (5, '16:00:00', '21:00:00', '23:59:59'),
                (6, '16:00:00', '21:00:00', '23:59:59'),
                (7, '16:00:00', '21:00:00', '23:59:59')
            ");
        }
    } catch (Exception $eFtRules) {}

    // Tabel Koreksi Darurat Penilaian Siswa Field Trip (Emergency Manual Override)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `student_emergency_grading` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `nisn` VARCHAR(50) NOT NULL,
                `day_number` INT NOT NULL,
                `score` DECIMAL(5,2) NOT NULL,
                `stars` INT NOT NULL DEFAULT 5,
                `reason` VARCHAR(255) DEFAULT 'Dispensasi Darurat Lapangan',
                `approved_by` VARCHAR(100) DEFAULT 'admin',
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY `uniq_nisn_day` (`nisn`, `day_number`),
                INDEX `idx_em_nisn` (`nisn`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $eEmGrad) {}

    // Tabel penugasan Koordinator (Banyak kelas per Koordinator / Many-to-Many)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `class_coordinators` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `teacher_username` VARCHAR(100) NOT NULL,
                `teacher_name` VARCHAR(150) DEFAULT NULL,
                `class_name` VARCHAR(50) NOT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY `uniq_coord_class` (`teacher_username`, `class_name`),
                INDEX `idx_coord_user` (`teacher_username`),
                INDEX `idx_coord_class` (`class_name`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Tabel penugasan Fasilitator (Strict: 1 Guru hanya pada 1 Kelas! UNIQUE pada teacher_username)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `class_facilitators` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `teacher_username` VARCHAR(100) NOT NULL UNIQUE,
                `teacher_name` VARCHAR(150) DEFAULT NULL,
                `class_name` VARCHAR(50) NOT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX `idx_fasil_class` (`class_name`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Tabel catatan evaluasi Koordinator terhadap kinerja Fasilitator
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `facilitator_evaluations` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `coordinator_username` VARCHAR(100) NOT NULL,
                `facilitator_username` VARCHAR(100) NOT NULL,
                `class_name` VARCHAR(50) NOT NULL,
                `rating` INT NOT NULL DEFAULT 5,
                `notes` TEXT DEFAULT NULL,
                `evaluation_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY `uniq_eval` (`coordinator_username`, `facilitator_username`, `class_name`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Tabel nilai akhir kokurikuler yang ditetapkan Fasilitator
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `student_final_grades` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `student_nisn` VARCHAR(50) NOT NULL UNIQUE,
                `class_name` VARCHAR(50) NOT NULL,
                `final_score` DECIMAL(5,2) DEFAULT NULL,
                `final_predicate` VARCHAR(20) DEFAULT NULL,
                `notes` TEXT DEFAULT NULL,
                `facilitator_username` VARCHAR(100) DEFAULT NULL,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX `idx_fg_class` (`class_name`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Tabel Master Guru & Tenaga Pendidik (CRUD Terkoneksi Database)
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS `teachers` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `kode_guru` VARCHAR(50) NOT NULL UNIQUE,
                `nama_guru` VARCHAR(255) NOT NULL,
                `nip` VARCHAR(50) DEFAULT '-',
                `mata_pelajaran` VARCHAR(255) NOT NULL,
                `jabatan` VARCHAR(100) DEFAULT 'Guru Mata Pelajaran',
                `tugas_tambahan` VARCHAR(255) DEFAULT '-',
                `username` VARCHAR(100) NOT NULL UNIQUE,
                `password` VARCHAR(100) NOT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX `idx_tch_user` (`username`),
                INDEX `idx_tch_code` (`kode_guru`),
                INDEX `idx_tch_name` (`nama_guru`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ");
    } catch (Exception $e) {}

    // Auto-sync Peserta Field Trip dari file resmi field_trip_students.json (455 Siswa)
    try {
        $ftFile = __DIR__ . '/../field_trip_students.json';
        if (file_exists($ftFile)) {
            $ftMtime = (int)filemtime($ftFile);
            $lastMtime = null;
            try {
                $stmtChk = $pdo->prepare("SELECT `value` FROM `app_settings` WHERE `key_name` = 'field_trip_sync_mtime' LIMIT 1");
                $stmtChk->execute();
                $lastMtime = $stmtChk->fetchColumn();
            } catch (Exception $eN) {}

            if ($lastMtime === false || $lastMtime === null || (int)$lastMtime < $ftMtime) {
                $rawFt = file_get_contents($ftFile);
                $ftStudents = json_decode($rawFt, true);
                if (is_array($ftStudents) && count($ftStudents) > 0) {
                    // Simpan override manual Admin yang sudah ada di student_custom_zones sebelum sinkronisasi
                    $existingCustom = [];
                    try {
                        $existingCustom = $pdo->query("SELECT `nisn`, `zone` FROM `student_custom_zones`")->fetchAll(PDO::FETCH_KEY_PAIR);
                    } catch (Exception $eCust) {}

                    $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM OKU TIMUR' WHERE `role` = 'siswa'");
                    // JANGAN DELETE student_custom_zones agar perubahan manual admin tidak terhapus!
                    // Siswa di tabel student_custom_zones akan tetap mempertahankan zona yang diubah admin.

                    $nisList = [];
                    $nisnList = [];
                    foreach ($ftStudents as $st) {
                        if (!empty($st['nis'])) $nisList[] = "'" . addslashes(trim($st['nis'])) . "'";
                        if (!empty($st['nisn'])) $nisnList[] = "'" . addslashes(trim($st['nisn'])) . "'";
                    }

                    if (!empty($nisList)) {
                        $chunks = array_chunk($nisList, 100);
                        foreach ($chunks as $chunk) {
                            $inNis = implode(',', $chunk);
                            $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `nis` IN ($inNis)");
                        }
                    }
                    if (!empty($nisnList)) {
                        $chunks = array_chunk($nisnList, 100);
                        foreach ($chunks as $chunk) {
                            $inNisn = implode(',', $chunk);
                            $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `identifier` IN ($inNisn)");
                        }
                    }
                    $nameList = [];
                    foreach ($ftStudents as $st) {
                        $nm = !empty($st['nama']) ? $st['nama'] : (!empty($st['name']) ? $st['name'] : '');
                        if (!empty($nm)) $nameList[] = "'" . addslashes(trim($nm)) . "'";
                    }
                    if (!empty($nameList)) {
                        $chunks = array_chunk($nameList, 100);
                        foreach ($chunks as $chunk) {
                            $inName = implode(',', $chunk);
                            $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `name` IN ($inName)");
                        }
                    }

                    $insertValues = [];
                    foreach ($ftStudents as $st) {
                        $n = addslashes(trim($st['nisn']));
                        if ($n) {
                            $insertValues[] = "('$n', 'FINCESTEM LUAR OKU TIMUR')";
                        }
                    }
                    if (!empty($insertValues)) {
                        $chunks = array_chunk($insertValues, 100);
                        foreach ($chunks as $chunk) {
                            $valSql = implode(',', $chunk);
                            // Gunakan INSERT IGNORE agar perubahan manual Admin di student_custom_zones TIDAK tertimpa
                            $pdo->exec("INSERT IGNORE INTO `student_custom_zones` (`nisn`, `zone`) VALUES $valSql");
                        }
                    }

                    // Terapkan kembali seluruh override manual Admin ke tabel users
                    if (!empty($existingCustom)) {
                        $stmtRestoreUser = $pdo->prepare("UPDATE `users` SET `zone` = :z WHERE (`identifier` = :id OR `identifier` = :padded OR `identifier` = :unpadded OR `nis` = :nis) AND `role` = 'siswa'");
                        $stmtRestoreCust = $pdo->prepare("INSERT INTO `student_custom_zones` (`nisn`, `zone`) VALUES (:id, :z) ON DUPLICATE KEY UPDATE `zone` = VALUES(`zone`)");
                        foreach ($existingCustom as $cNisn => $cZone) {
                            $cleanN = trim((string)$cNisn);
                            $digits = preg_replace('/\D/', '', $cleanN);
                            $padded = (strlen($digits) >= 8 && strlen($digits) <= 10) ? str_pad($digits, 10, '0', STR_PAD_LEFT) : $cleanN;
                            $unpadded = ltrim($digits, '0') ?: $cleanN;
                            $stmtRestoreUser->execute([
                                ':z'        => $cZone,
                                ':id'       => $cleanN,
                                ':padded'   => $padded,
                                ':unpadded' => $unpadded,
                                ':nis'      => $cleanN
                            ]);
                            $stmtRestoreCust->execute([':id' => $cleanN, ':z' => $cZone]);
                        }
                    }

                    try {
                        $pdo->exec("CREATE TABLE IF NOT EXISTS `app_settings` (`key_name` VARCHAR(50) PRIMARY KEY, `value` TEXT, `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)");
                        $stmtSave = $pdo->prepare("REPLACE INTO `app_settings` (`key_name`, `value`) VALUES ('field_trip_sync_mtime', :m)");
                        $stmtSave->execute([':m' => (string)$ftMtime]);
                    } catch (Exception $eS) {}
                }
            }
        }
    } catch (Exception $eFt) {}

    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `app_settings` (`key_name` VARCHAR(50) PRIMARY KEY, `value` LONGTEXT, `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        $pdo->exec("ALTER TABLE `app_settings` MODIFY COLUMN `value` LONGTEXT");
    } catch (Exception $eAppSet) {}

    @touch($lockFile);
    $checked = true;
}

function getMentorshipState($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT `value` FROM `app_settings` WHERE `key_name` = 'mentorship_state_v1' LIMIT 1");
        $stmt->execute();
        $raw = $stmt->fetchColumn();
        if ($raw) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                return [
                    'assignments'     => isset($decoded['assignments']) && is_array($decoded['assignments']) ? $decoded['assignments'] : [],
                    'teacher_roles'   => isset($decoded['teacher_roles']) && is_array($decoded['teacher_roles']) ? $decoded['teacher_roles'] : [],
                    'custom_teachers' => isset($decoded['custom_teachers']) && is_array($decoded['custom_teachers']) ? $decoded['custom_teachers'] : []
                ];
            }
        }
    } catch (Exception $e) {}
    return ['assignments' => [], 'teacher_roles' => [], 'custom_teachers' => []];
}

function buildCustomZonesLookup($pdo) {
    $map = [];
    try {
        $stmtCust = $pdo->query("SELECT `nisn`, `zone` FROM `student_custom_zones`");
        while ($r = $stmtCust->fetch()) {
            if (!empty($r['nisn']) && !empty($r['zone'])) {
                $n = trim($r['nisn']);
                $z = trim($r['zone']);
                $map[$n] = $z;
                $cleanN = preg_replace('/\D/', '', $n);
                if (strlen($cleanN) >= 8 && strlen($cleanN) <= 10) {
                    $map[str_pad($cleanN, 10, '0', STR_PAD_LEFT)] = $z;
                    $map[ltrim($cleanN, '0')] = $z;
                }
            }
        }
    } catch (Exception $e) {}
    return $map;
}

function resolveStudentZoneWithAdminOverride($stu, $customZonesMap) {
    $id = trim((string)($stu['nisn'] ?? $stu['identifier'] ?? ''));
    $nis = trim((string)($stu['nis'] ?? ''));
    if ($id && isset($customZonesMap[$id])) return $customZonesMap[$id];
    if ($id) {
        $cleanId = preg_replace('/\D/', '', $id);
        if (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) {
            $padded = str_pad($cleanId, 10, '0', STR_PAD_LEFT);
            $unpadded = ltrim($cleanId, '0');
            if (isset($customZonesMap[$padded])) return $customZonesMap[$padded];
            if ($unpadded && isset($customZonesMap[$unpadded])) return $customZonesMap[$unpadded];
        }
    }
    if ($nis && isset($customZonesMap[$nis])) return $customZonesMap[$nis];
    return !empty($stu['zone']) ? $stu['zone'] : 'FINCESTEM OKU TIMUR';
}

if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    $nisn   = trim($_GET['nisn'] ?? '');

    try {
        $pdo = getDB();
        ensureRoleTables($pdo);

        // Aksi eksplisit untuk sinkronisasi peserta Field Trip dari Excel (455 Siswa)
        if ($action === 'sync_field_trip_excel') {
            $ftFile = __DIR__ . '/../field_trip_students.json';
            if (!file_exists($ftFile)) {
                jsonResponse(false, 'Berkas data field_trip_students.json tidak ditemukan!', null, 404);
            }
            $rawFt = file_get_contents($ftFile);
            $ftStudents = json_decode($rawFt, true);
            if (!is_array($ftStudents) || empty($ftStudents)) {
                jsonResponse(false, 'Format data field_trip_students.json tidak valid!', null, 500);
            }

            // 1. Reset semua siswa ke status Non-Field Trip (OKU TIMUR)
            $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM OKU TIMUR' WHERE `role` = 'siswa'");
            $pdo->exec("DELETE FROM `student_custom_zones`");

            // 2. Kumpulkan NIS & NISN Field Trip
            $nisList = [];
            $nisnList = [];
            foreach ($ftStudents as $st) {
                if (!empty($st['nis'])) $nisList[] = "'" . addslashes(trim($st['nis'])) . "'";
                if (!empty($st['nisn'])) $nisnList[] = "'" . addslashes(trim($st['nisn'])) . "'";
            }

            if (!empty($nisList)) {
                $chunks = array_chunk($nisList, 100);
                foreach ($chunks as $chunk) {
                    $inNis = implode(',', $chunk);
                    $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `nis` IN ($inNis)");
                }
            }
            if (!empty($nisnList)) {
                $chunks = array_chunk($nisnList, 100);
                foreach ($chunks as $chunk) {
                    $inNisn = implode(',', $chunk);
                    $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `identifier` IN ($inNisn)");
                }
            }
            $nameList = [];
            foreach ($ftStudents as $st) {
                $nm = !empty($st['nama']) ? $st['nama'] : (!empty($st['name']) ? $st['name'] : '');
                if (!empty($nm)) $nameList[] = "'" . addslashes(trim($nm)) . "'";
            }
            if (!empty($nameList)) {
                $chunks = array_chunk($nameList, 100);
                foreach ($chunks as $chunk) {
                    $inName = implode(',', $chunk);
                    $pdo->exec("UPDATE `users` SET `zone` = 'FINCESTEM LUAR OKU TIMUR' WHERE `role` = 'siswa' AND `name` IN ($inName)");
                }
            }

            // 3. Masukkan ke student_custom_zones
            $insertValues = [];
            foreach ($ftStudents as $st) {
                $n = addslashes(trim($st['nisn']));
                if ($n) {
                    $insertValues[] = "('$n', 'FINCESTEM LUAR OKU TIMUR')";
                }
            }
            if (!empty($insertValues)) {
                $chunks = array_chunk($insertValues, 100);
                foreach ($chunks as $chunk) {
                    $valSql = implode(',', $chunk);
                    $pdo->exec("INSERT INTO `student_custom_zones` (`nisn`, `zone`) VALUES $valSql ON DUPLICATE KEY UPDATE `zone` = VALUES(`zone`)");
                }
            }

            try {
                $pdo->exec("CREATE TABLE IF NOT EXISTS `app_settings` (`key_name` VARCHAR(50) PRIMARY KEY, `value` TEXT, `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)");
                $stmtSave = $pdo->prepare("REPLACE INTO `app_settings` (`key_name`, `value`) VALUES ('field_trip_sync_mtime', :m)");
                $stmtSave->execute([':m' => (string)filemtime($ftFile)]);
            } catch (Exception $eS) {}

            $counts = $pdo->query("SELECT `zone`, COUNT(*) AS cnt FROM `users` WHERE `role` = 'siswa' GROUP BY `zone`")->fetchAll(PDO::FETCH_KEY_PAIR);

            jsonResponse(true, "Sinkronisasi berhasil! Sebanyak " . count($ftStudents) . " siswa resmi ditetapkan sebagai Peserta Field Trip (Luar OKU Timur).", [
                'field_trip_count' => count($ftStudents),
                'database_counts'  => $counts
            ]);
        }

        // Jika diminta data siswa tunggal
        if ($action === 'get_student' && $nisn) {
            $stmt = $pdo->prepare("SELECT * FROM `users` WHERE (`identifier` = :id OR `nis` = :nis) AND `role` = 'siswa' LIMIT 1");
            $stmt->execute([':id' => $nisn, ':nis' => $nisn]);
            $stu = $stmt->fetch();
            if ($stu) {
                unset($stu['password_hash']);
                $customZonesMap = buildCustomZonesLookup($pdo);
                $stu['zone'] = resolveStudentZoneWithAdminOverride($stu, $customZonesMap);
                $stu['is_field_trip'] = (stripos($stu['zone'], 'LUAR') !== false);
                // Sinkronkan nama koordinator & fasilitator terbaru dari penugasan kelas (cocokkan format 'KELAS X.1' maupun 'X.1')
                if (!empty($stu['class_name'])) {
                    $rawCls = trim($stu['class_name']);
                    $clsWithout = trim(preg_replace('/^KELAS\s+/i', '', $rawCls));
                    $clsWith = 'KELAS ' . $clsWithout;

                    try {
                        $cStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_coordinators` WHERE `class_name` = :c OR `class_name` = :cWith OR `class_name` = :cWithout ORDER BY `teacher_name` ASC");
                        $cStmt->execute([':c' => $rawCls, ':cWith' => $clsWith, ':cWithout' => $clsWithout]);
                        $coords = $cStmt->fetchAll(PDO::FETCH_COLUMN);
                        if (!empty($coords)) {
                            $stu['coordinator_name'] = implode(', ', array_unique(array_filter($coords)));
                        }
                    } catch (Exception $eC) {}

                    try {
                        $fStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_facilitators` WHERE `class_name` = :c OR `class_name` = :cWith OR `class_name` = :cWithout ORDER BY `teacher_name` ASC");
                        $fStmt->execute([':c' => $rawCls, ':cWith' => $clsWith, ':cWithout' => $clsWithout]);
                        $fasils = $fStmt->fetchAll(PDO::FETCH_COLUMN);
                        if (!empty($fasils)) {
                            $stu['facilitator_name'] = implode(', ', array_unique(array_filter($fasils)));
                        }
                    } catch (Exception $eF) {}
                }
                jsonResponse(true, 'Data profil siswa berhasil ditemukan', ['student' => $stu]);
            } else {
                jsonResponse(false, 'Siswa tidak ditemukan di database', null, 404);
            }
        }

        // Ambil data seluruh guru & tenaga pendidik (A-Z)
        if ($action === 'get_teachers') {
            $teachers = $pdo->query("SELECT * FROM `teachers` ORDER BY `nama_guru` ASC")->fetchAll();
            jsonResponse(true, 'Data guru berhasil dimuat', ['teachers' => $teachers]);
        }

        // Ambil penugasan peran Koordinator & Fasilitator + Pembagian Siswa Binaan (Mentorship)
        if ($action === 'get_role_assignments') {
            $coordinators = $pdo->query("SELECT * FROM `class_coordinators` ORDER BY `teacher_username` ASC, `class_name` ASC")->fetchAll();
            $facilitators = $pdo->query("SELECT * FROM `class_facilitators` ORDER BY `class_name` ASC, `teacher_username` ASC")->fetchAll();
            $evaluations  = $pdo->query("SELECT * FROM `facilitator_evaluations` ORDER BY `evaluation_date` DESC")->fetchAll();
            $finalGrades  = $pdo->query("SELECT * FROM `student_final_grades` ORDER BY `class_name` ASC, `student_nisn` ASC")->fetchAll();
            $mentorship   = getMentorshipState($pdo);

            jsonResponse(true, 'Data penugasan peran berhasil dimuat', [
                'coordinators'     => $coordinators,
                'facilitators'     => $facilitators,
                'evaluations'      => $evaluations,
                'final_grades'     => $finalGrades,
                'mentorship_state' => $mentorship
            ]);
        }

        if ($action === 'get_mentorship_data') {
            jsonResponse(true, 'Data pembagian siswa binaan berhasil dimuat', getMentorshipState($pdo));
        }

        // Ambil data khusus Koordinator yang sedang login (Utamakan Pembagian Siswa Binaan)
        if ($action === 'get_coordinator_data') {
            $coordUser = trim($_GET['coordinator_user'] ?? '');
            if (!$coordUser) {
                jsonResponse(false, 'Username Koordinator wajib ditentukan!', null, 400);
            }

            $mState = getMentorshipState($pdo);
            $mAssigns = $mState['assignments'] ?? [];
            $cleanCoord = strtolower($coordUser);

            // Cek apakah koordinator ini memiliki siswa binaan di mentorship_state_v1
            $mentorNisns = [];
            $mentorFacilitators = [];
            foreach ($mAssigns as $tKey => $entry) {
                if (!is_array($entry)) continue;
                $tKeyLower = strtolower(trim((string)$tKey));
                $linkedCoord = strtolower(trim((string)($entry['coordinator_key'] ?? '')));
                $role = strtoupper(trim((string)($entry['teacher_role'] ?? '')));
                $nisns = isset($entry['student_nisns']) && is_array($entry['student_nisns']) ? $entry['student_nisns'] : [];

                if ($tKeyLower === $cleanCoord) {
                    foreach ($nisns as $n) {
                        if (trim((string)$n) !== '') $mentorNisns[] = trim((string)$n);
                    }
                } elseif ($linkedCoord === $cleanCoord && !empty($nisns)) {
                    foreach ($nisns as $n) {
                        if (trim((string)$n) !== '') $mentorNisns[] = trim((string)$n);
                    }
                    $mentorFacilitators[$tKeyLower] = [
                        'teacher_username' => $tKeyLower,
                        'teacher_name'     => $entry['teacher_name'] ?? $tKeyLower,
                        'student_nisns'    => array_values(array_unique(array_map('trim', $nisns)))
                    ];
                }
            }
            $mentorNisns = array_values(array_unique($mentorNisns));

            // Jika Koordinator punya siswa binaan langsung, temukan juga Fasilitator yang membina siswa-siswa tersebut
            if (!empty($mentorNisns)) {
                $nisnLookup = array_flip($mentorNisns);
                foreach ($mAssigns as $tKey => $entry) {
                    if (!is_array($entry)) continue;
                    $tKeyLower = strtolower(trim((string)$tKey));
                    $role = strtoupper(trim((string)($entry['teacher_role'] ?? 'NON_FIELD_TRIP')));
                    if ($tKeyLower === $cleanCoord || $role === 'KOORDINATOR') continue;
                    $nisns = isset($entry['student_nisns']) && is_array($entry['student_nisns']) ? $entry['student_nisns'] : [];
                    $overlap = [];
                    foreach ($nisns as $n) {
                        $cn = trim((string)$n);
                        if ($cn !== '' && isset($nisnLookup[$cn])) $overlap[] = $cn;
                    }
                    if (!empty($overlap) && !isset($mentorFacilitators[$tKeyLower])) {
                        $mentorFacilitators[$tKeyLower] = [
                            'teacher_username' => $tKeyLower,
                            'teacher_name'     => $entry['teacher_name'] ?? $tKeyLower,
                            'student_nisns'    => $overlap
                        ];
                    }
                }

                // Expand NISN variants (padded 10 digit & unpadded)
                $expandedNisns = [];
                foreach ($mentorNisns as $n) {
                    $expandedNisns[] = $n;
                    $digits = preg_replace('/\D/', '', $n);
                    if (strlen($digits) >= 8 && strlen($digits) <= 10) {
                        $expandedNisns[] = str_pad($digits, 10, '0', STR_PAD_LEFT);
                        $unp = ltrim($digits, '0');
                        if ($unp) $expandedNisns[] = $unp;
                    }
                }
                $expandedNisns = array_values(array_unique($expandedNisns));
                $inNisn = implode(',', array_fill(0, count($expandedNisns), '?'));

                $stmtStu = $pdo->prepare("
                    SELECT u.identifier AS nisn, u.name, u.class_name, u.nis, u.gender, u.zone,
                           fg.final_score, fg.final_predicate
                    FROM `users` u
                    LEFT JOIN `student_final_grades` fg ON u.identifier = fg.student_nisn
                    WHERE u.identifier IN ($inNisn) AND u.role = 'siswa'
                    ORDER BY u.class_name ASC, u.name ASC
                ");
                $stmtStu->execute($expandedNisns);
                $students = $stmtStu->fetchAll();
                $customZonesMap = buildCustomZonesLookup($pdo);

                $progressMap = [];
                try {
                    $stmtProg = $pdo->prepare("
                        SELECT p.student_nisn, p.day_number, p.task_type, p.status, p.score, p.updated_at
                        FROM `student_progress_eval` p
                        WHERE p.student_nisn IN ($inNisn)
                    ");
                    $stmtProg->execute($expandedNisns);
                    foreach ($stmtProg->fetchAll() as $pRow) {
                        $sNisn = $pRow['student_nisn'];
                        if (!isset($progressMap[$sNisn])) {
                            $progressMap[$sNisn] = [
                                'completed_days'  => 0,
                                'total_submitted' => 0,
                                'latest_status'   => 'belum_mulai',
                                'scores'          => [],
                                'last_active'     => null
                            ];
                        }
                        if ($pRow['status'] === 'completed') $progressMap[$sNisn]['completed_days']++;
                        if (in_array($pRow['status'], ['submitted', 'reviewed', 'revision', 'completed'])) $progressMap[$sNisn]['total_submitted']++;
                        $progressMap[$sNisn]['latest_status'] = $pRow['status'];
                        if ($pRow['score'] > 0) $progressMap[$sNisn]['scores'][] = (float)$pRow['score'];
                        if (!$progressMap[$sNisn]['last_active'] || strtotime($pRow['updated_at']) > strtotime($progressMap[$sNisn]['last_active'])) {
                            $progressMap[$sNisn]['last_active'] = $pRow['updated_at'];
                        }
                    }
                } catch (Exception $e) {}

                $classesSet = [];
                foreach ($students as &$stu) {
                    $sNisn = $stu['nisn'];
                    if (!empty($stu['class_name'])) $classesSet[$stu['class_name']] = true;
                    $stu['zone'] = resolveStudentZoneWithAdminOverride($stu, $customZonesMap);
                    $stu['is_field_trip'] = (stripos($stu['zone'], 'LUAR') !== false);
                    $pr = $progressMap[$sNisn] ?? null;
                    $stu['completed_days'] = $pr ? $pr['completed_days'] : 0;
                    $stu['percentage'] = min(100, round(($stu['completed_days'] / 7) * 100));
                    $stu['task_status'] = $pr ? $pr['latest_status'] : 'belum_mulai';
                    $stu['avg_score'] = ($pr && count($pr['scores']) > 0) ? round(array_sum($pr['scores']) / count($pr['scores']), 1) : null;
                }
                unset($stu);

                $classes = array_keys($classesSet);
                $stmtEval = $pdo->prepare("SELECT * FROM `facilitator_evaluations` WHERE `coordinator_username` = :u");
                $stmtEval->execute([':u' => $coordUser]);
                $evalMap = [];
                foreach ($stmtEval->fetchAll() as $ev) {
                    $evalMap[strtolower($ev['facilitator_username'])] = $ev;
                }

                $fasilList = [];
                $fasilPerformance = [];
                foreach ($mentorFacilitators as $fKey => $fInfo) {
                    $fNisnSet = array_flip($fInfo['student_nisns']);
                    $fStudents = array_filter($students, function($s) use ($fNisnSet) {
                        $n = trim((string)$s['nisn']);
                        $unp = ltrim(preg_replace('/\D/', '', $n), '0');
                        $pad = str_pad($unp, 10, '0', STR_PAD_LEFT);
                        return isset($fNisnSet[$n]) || isset($fNisnSet[$unp]) || isset($fNisnSet[$pad]);
                    });
                    $fClasses = array_values(array_unique(array_filter(array_map(fn($s) => $s['class_name'] ?? '', $fStudents))));
                    $classLabel = !empty($fClasses) ? implode(', ', array_slice($fClasses, 0, 3)) . (count($fClasses) > 3 ? '...' : '') : 'Kelompok Binaan';

                    foreach ($fClasses as $fc) {
                        $fasilList[] = [
                            'teacher_username' => $fInfo['teacher_username'],
                            'teacher_name'     => $fInfo['teacher_name'],
                            'class_name'       => $fc
                        ];
                    }
                    if (empty($fClasses)) {
                        $fasilList[] = [
                            'teacher_username' => $fInfo['teacher_username'],
                            'teacher_name'     => $fInfo['teacher_name'],
                            'class_name'       => 'Kelompok Binaan'
                        ];
                    }

                    $gradedCount = 0;
                    $unreviewedCount = 0;
                    $lastActivity = null;
                    foreach ($fStudents as $cs) {
                        $pr = $progressMap[$cs['nisn']] ?? null;
                        if ($pr) {
                            if (in_array($pr['latest_status'], ['reviewed', 'completed'])) $gradedCount++;
                            elseif (in_array($pr['latest_status'], ['submitted', 'revision'])) $unreviewedCount++;
                            if ($pr['last_active'] && (!$lastActivity || strtotime($pr['last_active']) > strtotime($lastActivity))) {
                                $lastActivity = $pr['last_active'];
                            }
                        }
                    }
                    $eval = $evalMap[$fKey] ?? null;
                    $fasilPerformance[] = [
                        'teacher_username'   => $fInfo['teacher_username'],
                        'teacher_name'       => $fInfo['teacher_name'],
                        'class_name'         => $classLabel,
                        'total_students'     => count($fStudents),
                        'graded_count'       => $gradedCount,
                        'unreviewed_count'   => $unreviewedCount,
                        'last_activity'      => $lastActivity,
                        'coordinator_rating' => $eval ? (int)$eval['rating'] : null,
                        'coordinator_notes'  => $eval ? $eval['notes'] : ''
                    ];
                }

                jsonResponse(true, 'Data portal koordinator (Siswa Binaan) berhasil dimuat', [
                    'classes'           => $classes,
                    'facilitators'      => $fasilList,
                    'fasil_performance' => $fasilPerformance,
                    'students'          => $students,
                    'summary'           => [
                        'total_classes'      => count($classes),
                        'total_facilitators' => count($mentorFacilitators),
                        'total_students'     => count($students)
                    ]
                ]);
            }

            // Kelas yang dikoordinasikan
            $stmt = $pdo->prepare("SELECT `class_name` FROM `class_coordinators` WHERE `teacher_username` = :u ORDER BY `class_name` ASC");
            $stmt->execute([':u' => $coordUser]);
            $classes = $stmt->fetchAll(PDO::FETCH_COLUMN);

            if (empty($classes)) {
                jsonResponse(true, 'Koordinator belum memiliki kelas penugasan.', [
                    'classes'      => [],
                    'facilitators' => [],
                    'students'     => [],
                    'summary'      => ['total_classes' => 0, 'total_facilitators' => 0, 'total_students' => 0]
                ]);
            }

            // Urutkan kelas secara alami: X.1 s.d X.11, XI.1 s.d XI.11, XII.1 s.d XII.11
            $romanMap = ['X' => 10, 'XI' => 11, 'XII' => 12, 'VII' => 7, 'VIII' => 8, 'IX' => 9];
            usort($classes, function($a, $b) use ($romanMap) {
                $cleanA = trim(preg_replace('/^kelas\s+/i', '', (string)$a));
                $cleanB = trim(preg_replace('/^kelas\s+/i', '', (string)$b));
                $pA = [999, 0];
                $pB = [999, 0];
                if (preg_match('/^([a-z]+)\.?(\d+)?/i', $cleanA, $mA)) {
                    $pA = [$romanMap[strtoupper($mA[1])] ?? 99, isset($mA[2]) ? (int)$mA[2] : 0];
                }
                if (preg_match('/^([a-z]+)\.?(\d+)?/i', $cleanB, $mB)) {
                    $pB = [$romanMap[strtoupper($mB[1])] ?? 99, isset($mB[2]) ? (int)$mB[2] : 0];
                }
                if ($pA[0] !== $pB[0]) return $pA[0] - $pB[0];
                if ($pA[1] !== $pB[1]) return $pA[1] - $pB[1];
                return strnatcasecmp($a, $b);
            });

            $inPlaceholders = implode(',', array_fill(0, count($classes), '?'));

            // Fasilitator di kelas-kelas tersebut (hubungan turunan Koordinator -> Kelas -> Fasilitator)
            $stmtFasil = $pdo->prepare("SELECT * FROM `class_facilitators` WHERE `class_name` IN ($inPlaceholders) ORDER BY `class_name` ASC");
            $stmtFasil->execute($classes);
            $facilitators = $stmtFasil->fetchAll();

            // Evaluasi koordinator untuk fasilitator
            $stmtEval = $pdo->prepare("SELECT * FROM `facilitator_evaluations` WHERE `coordinator_username` = :u");
            $stmtEval->execute([':u' => $coordUser]);
            $evalMap = [];
            foreach ($stmtEval->fetchAll() as $ev) {
                $evalMap[$ev['facilitator_username'] . '_' . $ev['class_name']] = $ev;
            }

            // Siswa di kelas-kelas tersebut
            $stmtStu = $pdo->prepare("
                SELECT u.identifier AS nisn, u.name, u.class_name, u.nis, u.gender, u.zone,
                       fg.final_score, fg.final_predicate
                FROM `users` u
                LEFT JOIN `student_final_grades` fg ON u.identifier = fg.student_nisn
                WHERE u.class_name IN ($inPlaceholders) AND u.role = 'siswa'
                ORDER BY u.class_name ASC, u.name ASC
            ");
            $stmtStu->execute($classes);
            $students = $stmtStu->fetchAll();
            $customZonesMap = buildCustomZonesLookup($pdo);

            // Rekap progress per siswa dari student_progress_eval
            $progressMap = [];
            try {
                $stmtProg = $pdo->prepare("
                    SELECT p.student_nisn, p.day_number, p.task_type, p.status, p.score, p.updated_at
                    FROM `student_progress_eval` p
                    JOIN `users` u ON p.student_nisn = u.identifier
                    WHERE u.class_name IN ($inPlaceholders)
                ");
                $stmtProg->execute($classes);
                foreach ($stmtProg->fetchAll() as $pRow) {
                    $sNisn = $pRow['student_nisn'];
                    if (!isset($progressMap[$sNisn])) {
                        $progressMap[$sNisn] = [
                            'completed_days' => 0,
                            'total_submitted' => 0,
                            'latest_status' => 'belum_mulai',
                            'scores' => [],
                            'last_active' => null
                        ];
                    }
                    if ($pRow['status'] === 'completed') {
                        $progressMap[$sNisn]['completed_days']++;
                    }
                    if (in_array($pRow['status'], ['submitted', 'reviewed', 'revision', 'completed'])) {
                        $progressMap[$sNisn]['total_submitted']++;
                    }
                    $progressMap[$sNisn]['latest_status'] = $pRow['status'];
                    if ($pRow['score'] > 0) {
                        $progressMap[$sNisn]['scores'][] = (float)$pRow['score'];
                    }
                    if (!$progressMap[$sNisn]['last_active'] || strtotime($pRow['updated_at']) > strtotime($progressMap[$sNisn]['last_active'])) {
                        $progressMap[$sNisn]['last_active'] = $pRow['updated_at'];
                    }
                }
            } catch (Exception $e) {}

            // Attach progress info & Admin zone override to students
            foreach ($students as &$stu) {
                $sNisn = $stu['nisn'];
                $stu['zone'] = resolveStudentZoneWithAdminOverride($stu, $customZonesMap);
                $stu['is_field_trip'] = (stripos($stu['zone'], 'LUAR') !== false);
                $pr = $progressMap[$sNisn] ?? null;
                $stu['completed_days'] = $pr ? $pr['completed_days'] : 0;
                $stu['percentage'] = min(100, round(($stu['completed_days'] / 7) * 100));
                $stu['task_status'] = $pr ? $pr['latest_status'] : 'belum_mulai';
                $stu['avg_score'] = ($pr && count($pr['scores']) > 0) ? round(array_sum($pr['scores']) / count($pr['scores']), 1) : null;
            }
            unset($stu);

            // Performa masing-masing fasilitator
            $fasilPerformance = [];
            foreach ($facilitators as $f) {
                $fUser = $f['teacher_username'];
                $fClass = $f['class_name'];
                $evalKey = $fUser . '_' . $fClass;

                // Hitung tugas siswa di kelas ini
                $classStudents = array_filter($students, fn($s) => $s['class_name'] === $fClass);
                $totalStuInClass = count($classStudents);
                $gradedCount = 0;
                $unreviewedCount = 0;
                $lastActivity = null;

                foreach ($classStudents as $cs) {
                    $pr = $progressMap[$cs['nisn']] ?? null;
                    if ($pr) {
                        if (in_array($pr['latest_status'], ['reviewed', 'completed'])) $gradedCount++;
                        elseif (in_array($pr['latest_status'], ['submitted', 'revision'])) $unreviewedCount++;
                        if ($pr['last_active'] && (!$lastActivity || strtotime($pr['last_active']) > strtotime($lastActivity))) {
                            $lastActivity = $pr['last_active'];
                        }
                    }
                }

                $eval = $evalMap[$evalKey] ?? null;
                $fasilPerformance[] = [
                    'teacher_username'   => $fUser,
                    'teacher_name'       => $f['teacher_name'] ?? $fUser,
                    'class_name'         => $fClass,
                    'total_students'     => $totalStuInClass,
                    'graded_count'       => $gradedCount,
                    'unreviewed_count'   => $unreviewedCount,
                    'last_activity'      => $lastActivity,
                    'coordinator_rating' => $eval ? (int)$eval['rating'] : null,
                    'coordinator_notes'  => $eval ? $eval['notes'] : ''
                ];
            }

            jsonResponse(true, 'Data portal koordinator berhasil dimuat', [
                'classes'           => $classes,
                'facilitators'      => $facilitators,
                'fasil_performance' => $fasilPerformance,
                'students'          => $students,
                'summary'           => [
                    'total_classes'      => count($classes),
                    'total_facilitators' => count($facilitators),
                    'total_students'     => count($students)
                ]
            ]);
        }

        // Ambil data khusus Fasilitator yang sedang login (Utamakan Pembagian Siswa Binaan)
        if ($action === 'get_facilitator_data') {
            $fasilUser = trim($_GET['facilitator_user'] ?? '');
            if (!$fasilUser) {
                jsonResponse(false, 'Username Fasilitator wajib ditentukan!', null, 400);
            }

            $mState = getMentorshipState($pdo);
            $mAssigns = $mState['assignments'] ?? [];
            $cleanFasil = strtolower($fasilUser);
            $mentorEntry = null;
            foreach ($mAssigns as $tKey => $entry) {
                if (strtolower(trim((string)$tKey)) === $cleanFasil && is_array($entry) && !empty($entry['student_nisns'])) {
                    $mentorEntry = $entry;
                    break;
                }
            }

            if ($mentorEntry && !empty($mentorEntry['student_nisns'])) {
                $expandedNisns = [];
                foreach ($mentorEntry['student_nisns'] as $n) {
                    $cn = trim((string)$n);
                    if ($cn === '') continue;
                    $expandedNisns[] = $cn;
                    $digits = preg_replace('/\D/', '', $cn);
                    if (strlen($digits) >= 8 && strlen($digits) <= 10) {
                        $expandedNisns[] = str_pad($digits, 10, '0', STR_PAD_LEFT);
                        $unp = ltrim($digits, '0');
                        if ($unp) $expandedNisns[] = $unp;
                    }
                }
                $expandedNisns = array_values(array_unique($expandedNisns));

                if (!empty($expandedNisns)) {
                    $inNisn = implode(',', array_fill(0, count($expandedNisns), '?'));
                    $stmtStu = $pdo->prepare("
                        SELECT u.identifier AS nisn, u.name, u.class_name, u.nis, u.gender, u.photo_url, u.zone,
                               fg.final_score, fg.final_predicate, fg.notes AS final_notes
                        FROM `users` u
                        LEFT JOIN `student_final_grades` fg ON u.identifier = fg.student_nisn
                        WHERE u.identifier IN ($inNisn) AND u.role = 'siswa'
                        ORDER BY u.class_name ASC, u.name ASC
                    ");
                    $stmtStu->execute($expandedNisns);
                    $students = $stmtStu->fetchAll();
                    $customZonesMap = buildCustomZonesLookup($pdo);

                    $progressMap = [];
                    try {
                        $stmtProg = $pdo->prepare("
                            SELECT p.student_nisn, p.day_number, p.task_type, p.status, p.score, p.updated_at
                            FROM `student_progress_eval` p
                            WHERE p.student_nisn IN ($inNisn)
                        ");
                        $stmtProg->execute($expandedNisns);
                        foreach ($stmtProg->fetchAll() as $pRow) {
                            $sNisn = $pRow['student_nisn'];
                            if (!isset($progressMap[$sNisn])) {
                                $progressMap[$sNisn] = [
                                    'completed_days'  => 0,
                                    'total_submitted' => 0,
                                    'latest_status'   => 'belum_mulai',
                                    'scores'          => [],
                                    'last_active'     => null
                                ];
                            }
                            if ($pRow['status'] === 'completed') $progressMap[$sNisn]['completed_days']++;
                            if (in_array($pRow['status'], ['submitted', 'reviewed', 'revision', 'completed'])) $progressMap[$sNisn]['total_submitted']++;
                            $progressMap[$sNisn]['latest_status'] = $pRow['status'];
                            if ($pRow['score'] > 0) $progressMap[$sNisn]['scores'][] = (float)$pRow['score'];
                            if (!$progressMap[$sNisn]['last_active'] || strtotime($pRow['updated_at']) > strtotime($progressMap[$sNisn]['last_active'])) {
                                $progressMap[$sNisn]['last_active'] = $pRow['updated_at'];
                            }
                        }
                    } catch (Exception $e) {}

                    foreach ($students as &$stu) {
                        $sNisn = $stu['nisn'];
                        $stu['zone'] = resolveStudentZoneWithAdminOverride($stu, $customZonesMap);
                        $stu['is_field_trip'] = (stripos($stu['zone'], 'LUAR') !== false);
                        $pr = $progressMap[$sNisn] ?? null;
                        $stu['completed_days'] = $pr ? $pr['completed_days'] : 0;
                        $stu['percentage'] = min(100, round(($stu['completed_days'] / 7) * 100));
                        $stu['task_status'] = $pr ? $pr['latest_status'] : 'belum_mulai';
                        $stu['avg_score'] = ($pr && count($pr['scores']) > 0) ? round(array_sum($pr['scores']) / count($pr['scores']), 1) : null;
                    }
                    unset($stu);

                    $assignmentObj = [
                        'teacher_username' => $fasilUser,
                        'teacher_name'     => $mentorEntry['teacher_name'] ?? $fasilUser,
                        'class_name'       => 'Binaan Anda'
                    ];

                    jsonResponse(true, 'Data siswa binaan berhasil dimuat', [
                        'assignment' => $assignmentObj,
                        'class_name' => 'Binaan Anda',
                        'students'   => $students
                    ]);
                }
            }

            $stmt = $pdo->prepare("SELECT * FROM `class_facilitators` WHERE `teacher_username` = :u LIMIT 1");
            $stmt->execute([':u' => $fasilUser]);
            $assignment = $stmt->fetch();

            if (!$assignment) {
                jsonResponse(true, 'Fasilitator belum ditugaskan pada kelas manapun.', [
                    'assignment' => null,
                    'students'   => []
                ]);
            }

            $className = $assignment['class_name'];

            // Ambil seluruh siswa di kelas fasilitator tersebut
            $stmtStu = $pdo->prepare("
                SELECT u.identifier AS nisn, u.name, u.class_name, u.nis, u.gender, u.photo_url, u.zone,
                       fg.final_score, fg.final_predicate, fg.notes AS final_notes
                FROM `users` u
                LEFT JOIN `student_final_grades` fg ON u.identifier = fg.student_nisn
                WHERE u.class_name = :c AND u.role = 'siswa'
                ORDER BY u.name ASC
            ");
            $stmtStu->execute([':c' => $className]);
            $students = $stmtStu->fetchAll();
            $customZonesMap = buildCustomZonesLookup($pdo);

            // Rekap progress per siswa di kelas fasilitator dari student_progress_eval
            $progressMap = [];
            try {
                $stmtProg = $pdo->prepare("
                    SELECT p.student_nisn, p.day_number, p.task_type, p.status, p.score, p.updated_at
                    FROM `student_progress_eval` p
                    JOIN `users` u ON p.student_nisn = u.identifier
                    WHERE u.class_name = :c
                ");
                $stmtProg->execute([':c' => $className]);
                foreach ($stmtProg->fetchAll() as $pRow) {
                    $sNisn = $pRow['student_nisn'];
                    if (!isset($progressMap[$sNisn])) {
                        $progressMap[$sNisn] = [
                            'completed_days' => 0,
                            'total_submitted' => 0,
                            'latest_status' => 'belum_mulai',
                            'scores' => [],
                            'last_active' => null
                        ];
                    }
                    if ($pRow['status'] === 'completed') {
                        $progressMap[$sNisn]['completed_days']++;
                    }
                    if (in_array($pRow['status'], ['submitted', 'reviewed', 'revision', 'completed'])) {
                        $progressMap[$sNisn]['total_submitted']++;
                    }
                    $progressMap[$sNisn]['latest_status'] = $pRow['status'];
                    if ($pRow['score'] > 0) {
                        $progressMap[$sNisn]['scores'][] = (float)$pRow['score'];
                    }
                    if (!$progressMap[$sNisn]['last_active'] || strtotime($pRow['updated_at']) > strtotime($progressMap[$sNisn]['last_active'])) {
                        $progressMap[$sNisn]['last_active'] = $pRow['updated_at'];
                    }
                }
            } catch (Exception $e) {}

            foreach ($students as &$stu) {
                $sNisn = $stu['nisn'];
                $stu['zone'] = resolveStudentZoneWithAdminOverride($stu, $customZonesMap);
                $stu['is_field_trip'] = (stripos($stu['zone'], 'LUAR') !== false);
                $pr = $progressMap[$sNisn] ?? null;
                $stu['completed_days'] = $pr ? $pr['completed_days'] : 0;
                $stu['percentage'] = min(100, round(($stu['completed_days'] / 7) * 100));
                $stu['task_status'] = $pr ? $pr['latest_status'] : 'belum_mulai';
                $stu['avg_score'] = ($pr && count($pr['scores']) > 0) ? round(array_sum($pr['scores']) / count($pr['scores']), 1) : null;
            }
            unset($stu);

            jsonResponse(true, "Data siswa binaan kelas {$className} berhasil dimuat", [
                'assignment' => $assignment,
                'class_name' => $className,
                'students'   => $students
            ]);
        }

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

        // Urutkan rombel secara alami: X.1 .. X.11, XI.1 .. XI.11, XII.1 .. XII.11
        $romanMap = ['X' => 10, 'XI' => 11, 'XII' => 12, 'VII' => 7, 'VIII' => 8, 'IX' => 9];
        usort($classes, function($a, $b) use ($romanMap) {
            $nameA = is_array($a) ? ($a['class_name'] ?? '') : (string)$a;
            $nameB = is_array($b) ? ($b['class_name'] ?? '') : (string)$b;
            $cleanA = trim(preg_replace('/^kelas\s+/i', '', $nameA));
            $cleanB = trim(preg_replace('/^kelas\s+/i', '', $nameB));
            $pA = [999, 0];
            $pB = [999, 0];
            if (preg_match('/^([a-z]+)\.?(\d+)?/i', $cleanA, $mA)) {
                $pA = [$romanMap[strtoupper($mA[1])] ?? 99, isset($mA[2]) ? (int)$mA[2] : 0];
            }
            if (preg_match('/^([a-z]+)\.?(\d+)?/i', $cleanB, $mB)) {
                $pB = [$romanMap[strtoupper($mB[1])] ?? 99, isset($mB[2]) ? (int)$mB[2] : 0];
            }
            if ($pA[0] !== $pB[0]) return $pA[0] - $pB[0];
            if ($pA[1] !== $pB[1]) return $pA[1] - $pB[1];
            return strnatcasecmp($nameA, $nameB);
        });

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

        // 3. Ambil seluruh pemetaan zona per-siswa yang telah ditentukan (individual overrides)
        $studentZones = [];
        try {
            $stmtStudents = $pdo->query("
                SELECT `identifier`, `nis`, `zone`
                FROM `users`
                WHERE `role` = 'siswa' AND `zone` IS NOT NULL AND `zone` != ''
            ");
            while ($row = $stmtStudents->fetch()) {
                $z = trim($row['zone']);
                $id = trim($row['identifier'] ?? '');
                $nis = trim($row['nis'] ?? '');
                if ($id) {
                    $studentZones[$id] = $z;
                    $cleanId = preg_replace('/\D/', '', $id);
                    if (strlen($cleanId) >= 8 && strlen($cleanId) <= 10) {
                        $studentZones[str_pad($cleanId, 10, '0', STR_PAD_LEFT)] = $z;
                        $studentZones[ltrim($cleanId, '0')] = $z;
                    }
                }
                if ($nis) $studentZones[$nis] = $z;
            }
        } catch (Exception $e) {}

        try {
            $stmtCust = $pdo->query("SELECT `nisn`, `zone` FROM `student_custom_zones`");
            while ($r = $stmtCust->fetch()) {
                if (!empty($r['nisn']) && !empty($r['zone'])) {
                    $n = trim($r['nisn']);
                    $z = trim($r['zone']);
                    $studentZones[$n] = $z;
                    $cleanN = preg_replace('/\D/', '', $n);
                    if (strlen($cleanN) >= 8 && strlen($cleanN) <= 10) {
                        $studentZones[str_pad($cleanN, 10, '0', STR_PAD_LEFT)] = $z;
                        $studentZones[ltrim($cleanN, '0')] = $z;
                    }
                }
            }
        } catch (Exception $e) {}

        // 4. Role Assignments (Coordinators & Facilitators)
        $coordinators = [];
        $facilitators = [];
        try {
            $coordinators = $pdo->query("SELECT * FROM `class_coordinators` ORDER BY `teacher_username` ASC")->fetchAll();
            $facilitators = $pdo->query("SELECT * FROM `class_facilitators` ORDER BY `class_name` ASC")->fetchAll();
        } catch (Exception $e) {}

        // 5. Dispensasi Domisili Luar OKU Timur (Whitelist Admin)
        $locationExemptions = [];
        try {
            $stmtEx = $pdo->query("SELECT `nisn` FROM `student_location_exemptions`");
            while ($r = $stmtEx->fetch()) {
                $n = trim($r['nisn']);
                if ($n) {
                    $locationExemptions[$n] = 1;
                    $cleanN = preg_replace('/\D/', '', $n);
                    if (strlen($cleanN) >= 8 && strlen($cleanN) <= 10) {
                        $locationExemptions[str_pad($cleanN, 10, '0', STR_PAD_LEFT)] = 1;
                        $locationExemptions[ltrim($cleanN, '0')] = 1;
                    }
                }
            }
        } catch (Exception $e) {}

        // 6. Pengaturan Waktu Penilaian Field Trip Day 1 - 7
        $ftGradingRules = [];
        try {
            $stmtRules = $pdo->query("SELECT `day_number`, `cutoff_perfect`, `cutoff_bintang5`, `cutoff_bintang4` FROM `field_trip_grading_rules` ORDER BY `day_number` ASC");
            while ($r = $stmtRules->fetch()) {
                $d = (int)$r['day_number'];
                $ftGradingRules[$d] = [
                    'day_number'      => $d,
                    'cutoff_perfect'  => substr($r['cutoff_perfect'], 0, 5),
                    'cutoff_bintang5' => substr($r['cutoff_bintang5'], 0, 5),
                    'cutoff_bintang4' => substr($r['cutoff_bintang4'], 0, 5)
                ];
            }
        } catch (Exception $e) {}

        // 7. Koreksi Darurat Penilaian Siswa Field Trip (Emergency Manual Override)
        $emergencyGrading = [];
        try {
            $stmtEm = $pdo->query("SELECT `nisn`, `day_number`, `score`, `stars`, `reason`, `approved_by` FROM `student_emergency_grading`");
            while ($r = $stmtEm->fetch()) {
                $n = trim($r['nisn']);
                $d = (int)$r['day_number'];
                $item = [
                    'nisn'        => $n,
                    'day_number'  => $d,
                    'score'       => (float)$r['score'],
                    'stars'       => (int)$r['stars'],
                    'reason'      => $r['reason'],
                    'approved_by' => $r['approved_by']
                ];
                $emergencyGrading["{$n}_{$d}"] = $item;
                $cleanN = preg_replace('/\D/', '', $n);
                if (strlen($cleanN) >= 8 && strlen($cleanN) <= 10) {
                    $emergencyGrading[str_pad($cleanN, 10, '0', STR_PAD_LEFT) . "_{$d}"] = $item;
                    $emergencyGrading[ltrim($cleanN, '0') . "_{$d}"] = $item;
                }
            }
        } catch (Exception $e) {}

        jsonResponse(true, 'Data pengaturan zona, penugasan pembina & penilaian berhasil dimuat', [
            'classes'              => $classes,
            'zone_counts'          => $zoneCounts,
            'student_zones'        => $studentZones,
            'location_exemptions'  => $locationExemptions,
            'coordinators'         => $coordinators,
            'facilitators'         => $facilitators,
            'ft_grading_rules'     => $ftGradingRules,
            'emergency_grading'    => $emergencyGrading
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

    try {
        $pdo = getDB();
        ensureRoleTables($pdo);

        // A. PENGATURAN KOORDINATOR KELAS (Many-to-Many: 1 Guru dapat mengoordinasikan beberapa kelas)
        if ($action === 'save_coordinator_classes') {
            $teacherUser = trim($input['teacher_username'] ?? '');
            $teacherName = trim($input['teacher_name'] ?? '');
            $classes     = $input['classes'] ?? [];

            if (!$teacherUser) {
                jsonResponse(false, 'Username/NIP Koordinator wajib dipilih!', null, 400);
            }

            if (!is_array($classes)) {
                $classes = array_filter(array_map('trim', explode(',', (string)$classes)));
            }

            // Catat kelas lama guru ini sebelum dihapus
            $oldClasses = [];
            try {
                $stmtOld = $pdo->prepare("SELECT DISTINCT `class_name` FROM `class_coordinators` WHERE `teacher_username` = :u");
                $stmtOld->execute([':u' => $teacherUser]);
                $oldClasses = $stmtOld->fetchAll(PDO::FETCH_COLUMN);
            } catch (Exception $eOld) {}

            // Hapus kelas koordinator sebelumnya untuk guru ini
            $stmtDel = $pdo->prepare("DELETE FROM `class_coordinators` WHERE `teacher_username` = :u");
            $stmtDel->execute([':u' => $teacherUser]);

            // Simpan kelas-kelas baru
            $stmtIns = $pdo->prepare("
                INSERT INTO `class_coordinators` (`teacher_username`, `teacher_name`, `class_name`)
                VALUES (:u, :name, :c)
            ");

            $savedCount = 0;
            foreach ($classes as $cls) {
                $cls = trim($cls);
                if ($cls) {
                    $stmtIns->execute([':u' => $teacherUser, ':name' => $teacherName, ':c' => $cls]);
                    $savedCount++;
                }
            }

            // Sinkronkan nama koordinator ke tabel users untuk setiap rombel terdampak
            $allAffectedClasses = array_unique(array_merge($oldClasses, $classes));
            foreach ($allAffectedClasses as $cls) {
                $cls = trim($cls);
                if (!$cls) continue;
                try {
                    $cStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_coordinators` WHERE `class_name` = :c ORDER BY `teacher_name` ASC");
                    $cStmt->execute([':c' => $cls]);
                    $coords = $cStmt->fetchAll(PDO::FETCH_COLUMN);
                    $coordStr = !empty($coords) ? implode(', ', array_filter($coords)) : 'Drs. H. Koordinator FINCESTEM';
                    
                    $uStmt = $pdo->prepare("UPDATE `users` SET `coordinator_name` = :coord WHERE `class_name` = :c AND `role` = 'siswa'");
                    $uStmt->execute([':coord' => $coordStr, ':c' => $cls]);
                } catch (Exception $eUpd) {}
            }

            jsonResponse(true, "Penugasan koordinator untuk {$teacherName} berhasil disimpan ({$savedCount} rombel).", [
                'teacher_username' => $teacherUser,
                'classes'          => $classes
            ]);
        }

        // B. PENGATURAN FASILITATOR KELAS (Strict: 1 Guru hanya boleh menjadi Fasilitator pada 1 Kelas!)
        if ($action === 'assign_facilitator') {
            $teacherUser = trim($input['teacher_username'] ?? '');
            $teacherName = trim($input['teacher_name'] ?? '');
            $className   = trim($input['class_name'] ?? '');

            if (!$teacherUser || !$className) {
                jsonResponse(false, 'Guru dan Kelas penugasan fasilitator wajib dipilih!', null, 400);
            }

            // CEK VALIDASI KETAT: Apakah guru ini sudah terdaftar sebagai fasilitator di kelas lain?
            $stmtCheck = $pdo->prepare("SELECT `class_name` FROM `class_facilitators` WHERE `teacher_username` = :u LIMIT 1");
            $stmtCheck->execute([':u' => $teacherUser]);
            $existing = $stmtCheck->fetch();

            if ($existing) {
                if ($existing['class_name'] === $className) {
                    jsonResponse(true, "Guru {$teacherName} sudah terdaftar sebagai fasilitator pada kelas {$className}.");
                }
                // Tolak dengan pesan exact sesuai permintaan pengguna
                jsonResponse(
                    false,
                    "Guru ini sudah terdaftar sebagai fasilitator di kelas {$existing['class_name']}. Satu guru hanya dapat menjadi fasilitator pada satu kelas.",
                    ['existing_class' => $existing['class_name']],
                    400
                );
            }

            // Simpan fasilitator ke kelas ini
            $stmtIns = $pdo->prepare("
                INSERT INTO `class_facilitators` (`teacher_username`, `teacher_name`, `class_name`)
                VALUES (:u, :name, :c)
            ");
            $stmtIns->execute([':u' => $teacherUser, ':name' => $teacherName, ':c' => $className]);

            // Sinkronkan ke tabel users untuk rombel ini
            try {
                $uStmt = $pdo->prepare("UPDATE `users` SET `facilitator_name` = :fasil WHERE `class_name` = :c AND `role` = 'siswa'");
                $uStmt->execute([':fasil' => $teacherName, ':c' => $className]);
            } catch (Exception $eUpdF) {}

            jsonResponse(true, "Guru {$teacherName} berhasil ditugaskan sebagai Fasilitator pada kelas {$className}!");
        }

        // C. HAPUS FASILITATOR
        if ($action === 'remove_facilitator') {
            $teacherUser = trim($input['teacher_username'] ?? '');
            $className   = trim($input['class_name'] ?? '');

            if (!$teacherUser) {
                jsonResponse(false, 'Username/NIP Fasilitator wajib ditentukan!', null, 400);
            }

            if ($className) {
                $stmt = $pdo->prepare("DELETE FROM `class_facilitators` WHERE `teacher_username` = :u AND `class_name` = :c");
                $stmt->execute([':u' => $teacherUser, ':c' => $className]);
                try {
                    $uStmt = $pdo->prepare("UPDATE `users` SET `facilitator_name` = 'Tim Fasilitator SMAN 1 Belitang' WHERE `class_name` = :c AND `role` = 'siswa'");
                    $uStmt->execute([':c' => $className]);
                } catch (Exception $e) {}
            } else {
                $stmtCls = $pdo->prepare("SELECT `class_name` FROM `class_facilitators` WHERE `teacher_username` = :u");
                $stmtCls->execute([':u' => $teacherUser]);
                $fClasses = $stmtCls->fetchAll(PDO::FETCH_COLUMN);

                $stmt = $pdo->prepare("DELETE FROM `class_facilitators` WHERE `teacher_username` = :u");
                $stmt->execute([':u' => $teacherUser]);

                foreach ($fClasses as $fc) {
                    try {
                        $uStmt = $pdo->prepare("UPDATE `users` SET `facilitator_name` = 'Tim Fasilitator SMAN 1 Belitang' WHERE `class_name` = :c AND `role` = 'siswa'");
                        $uStmt->execute([':c' => $fc]);
                    } catch (Exception $e) {}
                }
            }

            jsonResponse(true, "Penugasan fasilitator berhasil dicabut.");
        }

        // D. HAPUS KOORDINATOR
        if ($action === 'remove_coordinator') {
            $teacherUser = trim($input['teacher_username'] ?? '');
            $className   = trim($input['class_name'] ?? '');

            if (!$teacherUser) {
                jsonResponse(false, 'Username/NIP Koordinator wajib ditentukan!', null, 400);
            }

            $targetClasses = [];
            if ($className) {
                $targetClasses = [$className];
                $stmt = $pdo->prepare("DELETE FROM `class_coordinators` WHERE `teacher_username` = :u AND `class_name` = :c");
                $stmt->execute([':u' => $teacherUser, ':c' => $className]);
            } else {
                $stmtCls = $pdo->prepare("SELECT `class_name` FROM `class_coordinators` WHERE `teacher_username` = :u");
                $stmtCls->execute([':u' => $teacherUser]);
                $targetClasses = $stmtCls->fetchAll(PDO::FETCH_COLUMN);

                $stmt = $pdo->prepare("DELETE FROM `class_coordinators` WHERE `teacher_username` = :u");
                $stmt->execute([':u' => $teacherUser]);
            }

            foreach ($targetClasses as $cls) {
                try {
                    $cStmt = $pdo->prepare("SELECT `teacher_name` FROM `class_coordinators` WHERE `class_name` = :c ORDER BY `teacher_name` ASC");
                    $cStmt->execute([':c' => $cls]);
                    $coords = $cStmt->fetchAll(PDO::FETCH_COLUMN);
                    $coordStr = !empty($coords) ? implode(', ', array_filter($coords)) : 'Drs. H. Koordinator FINCESTEM';
                    
                    $uStmt = $pdo->prepare("UPDATE `users` SET `coordinator_name` = :coord WHERE `class_name` = :c AND `role` = 'siswa'");
                    $uStmt->execute([':coord' => $coordStr, ':c' => $cls]);
                } catch (Exception $e) {}
            }

            jsonResponse(true, "Penugasan koordinator berhasil dihapus.");
        }

        // E. CATATAN EVALUASI KOORDINATOR TERHADAP KINERJA FASILITATOR
        if ($action === 'save_facilitator_evaluation') {
            $coordUser  = trim($input['coordinator_username'] ?? '');
            $fasilUser  = trim($input['facilitator_username'] ?? '');
            $className  = trim($input['class_name'] ?? '');
            $rating     = (int)($input['rating'] ?? 5);
            $notes      = trim($input['notes'] ?? '');

            if (!$coordUser || !$fasilUser || !$className) {
                jsonResponse(false, 'Data koordinator, fasilitator, dan kelas wajib lengkap!', null, 400);
            }

            $stmt = $pdo->prepare("
                INSERT INTO `facilitator_evaluations` 
                    (`coordinator_username`, `facilitator_username`, `class_name`, `rating`, `notes`, `evaluation_date`)
                VALUES 
                    (:coord, :fasil, :c, :r, :n, NOW())
                ON DUPLICATE KEY UPDATE
                    `rating` = VALUES(`rating`),
                    `notes`  = VALUES(`notes`),
                    `evaluation_date` = NOW()
            ");
            $stmt->execute([
                ':coord' => $coordUser,
                ':fasil' => $fasilUser,
                ':c'     => $className,
                ':r'     => $rating,
                ':n'     => $notes
            ]);

            jsonResponse(true, "Catatan evaluasi kinerja fasilitator berhasil disimpan!");
        }

        // F. FASILITATOR MEMBERIKAN NILAI AKHIR KOKURIKULER
        if ($action === 'save_final_grade') {
            $nisn       = trim($input['student_nisn'] ?? '');
            $className  = trim($input['class_name'] ?? '');
            $score      = isset($input['final_score']) && $input['final_score'] !== '' ? (float)$input['final_score'] : null;
            $predicate  = trim($input['final_predicate'] ?? '');
            $notes      = trim($input['notes'] ?? '');
            $fasilUser  = trim($input['facilitator_username'] ?? '');

            if (!$nisn || !$className) {
                jsonResponse(false, 'NISN dan Rombel siswa wajib diisi!', null, 400);
            }

            if ($score !== null && !$predicate) {
                if ($score >= 88) $predicate = 'Sangat Baik (A)';
                elseif ($score >= 75) $predicate = 'Baik (B)';
                elseif ($score >= 65) $predicate = 'Cukup (C)';
                else $predicate = 'Perlu Bimbingan (D)';
            }

            $stmt = $pdo->prepare("
                INSERT INTO `student_final_grades` 
                    (`student_nisn`, `class_name`, `final_score`, `final_predicate`, `notes`, `facilitator_username`, `updated_at`)
                VALUES 
                    (:nisn, :c, :sc, :pred, :n, :fasil, NOW())
                ON DUPLICATE KEY UPDATE
                    `final_score`          = VALUES(`final_score`),
                    `final_predicate`      = VALUES(`final_predicate`),
                    `notes`                = VALUES(`notes`),
                    `facilitator_username` = VALUES(`facilitator_username`),
                    `updated_at`           = NOW()
            ");
            $stmt->execute([
                ':nisn'  => $nisn,
                ':c'     => $className,
                ':sc'    => $score,
                ':pred'  => $predicate,
                ':n'     => $notes,
                ':fasil' => $fasilUser
            ]);

            jsonResponse(true, "Nilai akhir kokurikuler untuk NISN {$nisn} berhasil disimpan!");
        }

        // G. LEGACY & ZONA: set_class_zone
        if ($action === 'set_class_zone') {
            $className = trim($input['class_name'] ?? '');
            $zone      = trim($input['zone'] ?? 'FINCESTEM OKU TIMUR');

            if (!$className) {
                jsonResponse(false, 'Nama kelas/rombel wajib dipilih!', null, 400);
            }

            $stmt = $pdo->prepare("UPDATE `users` SET `zone` = :z WHERE `class_name` = :c AND `role` = 'siswa'");
            $stmt->execute([':z' => $zone, ':c' => $className]);
            $count = $stmt->rowCount();

            jsonResponse(true, "Berhasil mengatur zona '{$zone}' untuk rombel {$className} ({$count} siswa).");
        }

        // H. LEGACY & ZONA: set_pembina
        if ($action === 'set_pembina') {
            $className   = trim($input['class_name'] ?? '');
            $gradeLevel  = trim($input['grade_level'] ?? '');
            $coordName   = trim($input['coordinator_name'] ?? '');
            $fasilName   = trim($input['facilitator_name'] ?? '');

            if (!$className && !$gradeLevel) {
                jsonResponse(false, 'Harap tentukan target kelas atau tingkat!', null, 400);
            }

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
        }

        // I. LEGACY & ZONA: set_student_zone
        if ($action === 'set_student_zone') {
            $nisn = trim($input['nisn'] ?? '');
            $zone = trim($input['zone'] ?? 'FINCESTEM OKU TIMUR');

            if (!$nisn) {
                jsonResponse(false, 'NISN / Pengenal siswa wajib diisi!', null, 400);
            }

            // Cari variasi NISN (padded 10 digit, tanpa 0 di depan) dan nomor NIS
            $cleanDigits = preg_replace('/\D/', '', $nisn);
            $paddedNisn = (strlen($cleanDigits) >= 8 && strlen($cleanDigits) <= 10) ? str_pad($cleanDigits, 10, '0', STR_PAD_LEFT) : $nisn;
            $unpaddedNisn = ltrim($cleanDigits, '0');

            // 1. Simpan di tabel users
            $stmt = $pdo->prepare("
                UPDATE `users` 
                SET `zone` = :z 
                WHERE (`identifier` = :nisn1 OR `identifier` = :padded OR `identifier` = :unpadded OR `nis` = :nisn2) AND `role` = 'siswa'
            ");
            $stmt->execute([
                ':z'        => $zone,
                ':nisn1'    => $nisn,
                ':padded'   => $paddedNisn,
                ':unpadded' => $unpaddedNisn,
                ':nisn2'    => $nisn
            ]);
            $count = $stmt->rowCount();

            // 2. Simpan juga di tabel persisten student_custom_zones untuk kedua format (asli & padded)
            try {
                $stmtCust = $pdo->prepare("
                    INSERT INTO `student_custom_zones` (`nisn`, `zone`) VALUES (:nisn, :z)
                    ON DUPLICATE KEY UPDATE `zone` = VALUES(`zone`), `updated_at` = CURRENT_TIMESTAMP
                ");
                $stmtCust->execute([':nisn' => $nisn, ':z' => $zone]);
                if ($paddedNisn !== $nisn) {
                    $stmtCust->execute([':nisn' => $paddedNisn, ':z' => $zone]);
                }
                if ($unpaddedNisn && $unpaddedNisn !== $nisn) {
                    $stmtCust->execute([':nisn' => $unpaddedNisn, ':z' => $zone]);
                }
            } catch (Exception $e2) {}

            jsonResponse(true, "Zona untuk siswa {$nisn} berhasil diperbarui menjadi '{$zone}'.", [
                'nisn' => $nisn,
                'zone' => $zone,
                'affected_rows' => $count
            ]);
        }

        // I.2. DISPENSASI DOMISILI LUAR OKU TIMUR (ADMIN WHITELIST BEBAS PINALTI BINTANG 1)
        if ($action === 'toggle_location_exemption') {
            $nisn = trim($input['nisn'] ?? '');
            if (!$nisn) {
                jsonResponse(false, 'NISN siswa wajib disertakan!', null, 400);
            }
            $cleanNisn = preg_replace('/\D/', '', $nisn);
            $paddedNisn = (strlen($cleanNisn) >= 8 && strlen($cleanNisn) <= 10) ? str_pad($cleanNisn, 10, '0', STR_PAD_LEFT) : $nisn;
            $unpaddedNisn = ltrim($cleanNisn, '0');

            // Cek apakah saat ini sudah berstatus dispensasi
            $stmtChk = $pdo->prepare("SELECT COUNT(*) FROM `student_location_exemptions` WHERE `nisn` IN (:n, :p, :u)");
            $stmtChk->execute([':n' => $nisn, ':p' => $paddedNisn, ':u' => $unpaddedNisn ?: $nisn]);
            $exists = $stmtChk->fetchColumn() > 0;

            // Target state
            $targetState = isset($input['exempt']) ? (bool)$input['exempt'] : !$exists;

            if ($targetState) {
                $stmtIns = $pdo->prepare("
                    INSERT INTO `student_location_exemptions` (`nisn`, `approved_by`)
                    VALUES (:n, 'admin')
                    ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP
                ");
                $stmtIns->execute([':n' => $nisn]);
                if ($paddedNisn !== $nisn) {
                    $stmtIns->execute([':n' => $paddedNisn]);
                }
                if ($unpaddedNisn && $unpaddedNisn !== $nisn) {
                    $stmtIns->execute([':n' => $unpaddedNisn]);
                }
                $isExempt = true;
                $msg = "Izin dispensasi domisili luar OKU Timur untuk siswa {$nisn} berhasil DIAKTIFKAN (Bebas Pinalti Bintang 1).";
            } else {
                $stmtDel = $pdo->prepare("DELETE FROM `student_location_exemptions` WHERE `nisn` IN (:n, :p, :u)");
                $stmtDel->execute([':n' => $nisn, ':p' => $paddedNisn, ':u' => $unpaddedNisn ?: $nisn]);
                $isExempt = false;
                $msg = "Izin dispensasi domisili luar OKU Timur untuk siswa {$nisn} berhasil DINONAKTIFKAN.";
            }

            jsonResponse(true, $msg, [
                'nisn' => $nisn,
                'is_location_exempt' => $isExempt
            ]);
        }

        // J. MANAJEMEN GURU (CRUD: TAMBAH / EDIT GURU)
        if ($action === 'save_teacher') {
            $kode     = trim($input['kode_guru'] ?? '');
            $nama     = trim($input['nama_guru'] ?? '');
            $nip      = trim($input['nip'] ?? '-') ?: '-';
            $mapel    = trim($input['mata_pelajaran'] ?? '');
            $jabatan  = trim($input['jabatan'] ?? 'Guru Mata Pelajaran') ?: 'Guru Mata Pelajaran';
            $tugas    = trim($input['tugas_tambahan'] ?? '-') ?: '-';
            $user     = trim($input['username'] ?? '');
            $pass     = trim($input['password'] ?? 'Fincestem2026!') ?: 'Fincestem2026!';
            $origKode = trim($input['orig_kode_guru'] ?? '');

            if (!$kode || !$nama || !$user) {
                jsonResponse(false, 'Kode Guru, Nama Guru, dan Username wajib diisi!', null, 400);
            }

            // Jika ubah kode guru, pastikan kode baru belum terpakai oleh guru lain
            if ($origKode && $origKode !== $kode) {
                $stmtChk = $pdo->prepare("SELECT id FROM `teachers` WHERE `kode_guru` = :k AND `kode_guru` != :orig LIMIT 1");
                $stmtChk->execute([':k' => $kode, ':orig' => $origKode]);
                if ($stmtChk->fetch()) {
                    jsonResponse(false, "Kode Guru '{$kode}' sudah digunakan oleh data guru lain!", null, 400);
                }
            }

            // Upsert ke tabel teachers
            $stmt = $pdo->prepare("
                INSERT INTO `teachers` (`kode_guru`, `nama_guru`, `nip`, `mata_pelajaran`, `jabatan`, `tugas_tambahan`, `username`, `password`, `created_at`, `updated_at`)
                VALUES (:k, :n, :nip, :m, :j, :t, :u, :p, NOW(), NOW())
                ON DUPLICATE KEY UPDATE
                    `nama_guru`       = VALUES(`nama_guru`),
                    `nip`             = VALUES(`nip`),
                    `mata_pelajaran`  = VALUES(`mata_pelajaran`),
                    `jabatan`         = VALUES(`jabatan`),
                    `tugas_tambahan`  = VALUES(`tugas_tambahan`),
                    `username`        = VALUES(`username`),
                    `password`        = VALUES(`password`),
                    `updated_at`      = NOW()
            ");
            $stmt->execute([
                ':k'   => $kode,
                ':n'   => $nama,
                ':nip' => $nip,
                ':m'   => $mapel,
                ':j'   => $jabatan,
                ':t'   => $tugas,
                ':u'   => $user,
                ':p'   => $pass
            ]);

            // Sinkronkan ke tabel users untuk autentikasi langsung
            try {
                $roleUser = 'guru';
                if (stripos($tugas, 'KOORD') !== false) $roleUser = 'koordinator';

                $stmtUser = $pdo->prepare("
                    INSERT INTO `users` (`identifier`, `password_hash`, `name`, `role`, `assignment`)
                    VALUES (:u, :p, :n, :r, :a)
                    ON DUPLICATE KEY UPDATE
                        `password_hash` = VALUES(`password_hash`),
                        `name`          = VALUES(`name`),
                        `role`          = VALUES(`role`),
                        `assignment`    = VALUES(`assignment`),
                        `updated_at`    = NOW()
                ");
                $stmtUser->execute([
                    ':u' => $user,
                    ':p' => $pass,
                    ':n' => $nama,
                    ':r' => $roleUser,
                    ':a' => $tugas !== '-' ? $tugas : "Guru {$mapel} ({$kode})"
                ]);
            } catch (Exception $eu) {}

            // Perbarui nama guru di class_coordinators & class_facilitators jika sudah terdaftar
            try {
                $stmtUpdC = $pdo->prepare("UPDATE `class_coordinators` SET `teacher_name` = :n WHERE `teacher_username` = :u");
                $stmtUpdC->execute([':n' => $nama, ':u' => $user]);
                $stmtUpdF = $pdo->prepare("UPDATE `class_facilitators` SET `teacher_name` = :n WHERE `teacher_username` = :u");
                $stmtUpdF->execute([':n' => $nama, ':u' => $user]);
            } catch (Exception $ecf) {}

            jsonResponse(true, "Data guru '{$nama}' ({$kode}) berhasil disimpan!", [
                'teacher' => [
                    'kode_guru'      => $kode,
                    'nama_guru'      => $nama,
                    'nip'            => $nip,
                    'mata_pelajaran' => $mapel,
                    'jabatan'        => $jabatan,
                    'tugas_tambahan' => $tugas,
                    'username'       => $user,
                    'password'       => $pass
                ]
            ]);
        }

        // K. MANAJEMEN GURU (CRUD: HAPUS GURU)
        if ($action === 'delete_teacher') {
            $kode = trim($input['kode_guru'] ?? '');
            $user = trim($input['username'] ?? '');

            if (!$kode && !$user) {
                jsonResponse(false, 'Kode Guru atau Username wajib diberikan untuk menghapus!', null, 400);
            }

            if ($kode) {
                $stmt = $pdo->prepare("DELETE FROM `teachers` WHERE `kode_guru` = :k");
                $stmt->execute([':k' => $kode]);
            }
            if ($user) {
                $stmtU = $pdo->prepare("DELETE FROM `users` WHERE `identifier` = :u AND `role` IN ('guru', 'koordinator', 'fasilitator')");
                $stmtU->execute([':u' => $user]);
                $stmtC = $pdo->prepare("DELETE FROM `class_coordinators` WHERE `teacher_username` = :u");
                $stmtC->execute([':u' => $user]);
                $stmtF = $pdo->prepare("DELETE FROM `class_facilitators` WHERE `teacher_username` = :u");
                $stmtF->execute([':u' => $user]);
            }

            jsonResponse(true, "Data guru berhasil dihapus dari sistem.");
        }

        // L. PENGATURAN JAM BATAS PENILAIAN FIELD TRIP (DAY 1 - 7)
        if ($action === 'update_ft_grading_rules') {
            $dayNum = isset($input['day_number']) ? (int)$input['day_number'] : 0;
            $cutoffPerf = trim($input['cutoff_perfect'] ?? '16:00:00');
            $cutoffB5   = trim($input['cutoff_bintang5'] ?? '21:00:00');
            $cutoffB4   = trim($input['cutoff_bintang4'] ?? '23:59:59');
            $applyAll   = !empty($input['apply_to_all']) || ($dayNum === 0);

            if (strlen($cutoffPerf) === 5) $cutoffPerf .= ':00';
            if (strlen($cutoffB5) === 5) $cutoffB5 .= ':00';
            if (strlen($cutoffB4) === 5) $cutoffB4 .= ':00';

            if ($applyAll) {
                for ($d = 1; $d <= 7; $d++) {
                    $stmt = $pdo->prepare("
                        INSERT INTO `field_trip_grading_rules` (`day_number`, `cutoff_perfect`, `cutoff_bintang5`, `cutoff_bintang4`)
                        VALUES (:d, :p, :b5, :b4)
                        ON DUPLICATE KEY UPDATE
                            `cutoff_perfect` = VALUES(`cutoff_perfect`),
                            `cutoff_bintang5` = VALUES(`cutoff_bintang5`),
                            `cutoff_bintang4` = VALUES(`cutoff_bintang4`),
                            `updated_at` = NOW()
                    ");
                    $stmt->execute([':d' => $d, ':p' => $cutoffPerf, ':b5' => $cutoffB5, ':b4' => $cutoffB4]);
                }
                jsonResponse(true, "Jam batas penilaian Field Trip berhasil diperbarui untuk SELURUH Day 1 s.d. Day 7 (Batas Nilai 100: " . substr($cutoffPerf, 0, 5) . " WIB).", [
                    'applied_to'      => 'all_days',
                    'cutoff_perfect'  => substr($cutoffPerf, 0, 5),
                    'cutoff_bintang5' => substr($cutoffB5, 0, 5),
                    'cutoff_bintang4' => substr($cutoffB4, 0, 5)
                ]);
            } else {
                $stmt = $pdo->prepare("
                    INSERT INTO `field_trip_grading_rules` (`day_number`, `cutoff_perfect`, `cutoff_bintang5`, `cutoff_bintang4`)
                    VALUES (:d, :p, :b5, :b4)
                    ON DUPLICATE KEY UPDATE
                        `cutoff_perfect` = VALUES(`cutoff_perfect`),
                        `cutoff_bintang5` = VALUES(`cutoff_bintang5`),
                        `cutoff_bintang4` = VALUES(`cutoff_bintang4`),
                        `updated_at` = NOW()
                ");
                $stmt->execute([':d' => $dayNum, ':p' => $cutoffPerf, ':b5' => $cutoffB5, ':b4' => $cutoffB4]);
                jsonResponse(true, "Jam batas penilaian Day {$dayNum} berhasil diperbarui (Batas Nilai 100: " . substr($cutoffPerf, 0, 5) . " WIB).", [
                    'day_number'      => $dayNum,
                    'cutoff_perfect'  => substr($cutoffPerf, 0, 5),
                    'cutoff_bintang5' => substr($cutoffB5, 0, 5),
                    'cutoff_bintang4' => substr($cutoffB4, 0, 5)
                ]);
            }
        }

        // M. KOREKSI DARURAT PENILAIAN SISWA FIELD TRIP (EMERGENCY MANUAL OVERRIDE)
        if ($action === 'save_student_emergency_grading') {
            $nisn = trim($input['nisn'] ?? '');
            $dayNum = (int)($input['day_number'] ?? 1);
            $score = isset($input['score']) ? (float)$input['score'] : 100.0;
            $stars = isset($input['stars']) ? (int)$input['stars'] : ($score >= 95 ? 5 : 4);
            $reason = trim($input['reason'] ?? 'Dispensasi Darurat Lapangan');
            $approvedBy = trim($input['approved_by'] ?? 'admin');

            if (!$nisn || $dayNum < 1 || $dayNum > 7) {
                jsonResponse(false, 'NISN dan Day Number (1-7) wajib diisi valid!', null, 400);
            }

            $stmt = $pdo->prepare("
                INSERT INTO `student_emergency_grading` (`nisn`, `day_number`, `score`, `stars`, `reason`, `approved_by`)
                VALUES (:n, :d, :sc, :st, :r, :a)
                ON DUPLICATE KEY UPDATE
                    `score` = VALUES(`score`),
                    `stars` = VALUES(`stars`),
                    `reason` = VALUES(`reason`),
                    `approved_by` = VALUES(`approved_by`),
                    `updated_at` = NOW()
            ");
            $stmt->execute([
                ':n'  => $nisn,
                ':d'  => $dayNum,
                ':sc' => $score,
                ':st' => $stars,
                ':r'  => $reason,
                ':a'  => $approvedBy
            ]);

            jsonResponse(true, "Koreksi darurat Day {$dayNum} untuk siswa {$nisn} berhasil disimpan (Nilai: {$score}, Bintang: {$stars}).", [
                'nisn'        => $nisn,
                'day_number'  => $dayNum,
                'score'       => $score,
                'stars'       => $stars,
                'reason'      => $reason,
                'approved_by' => $approvedBy
            ]);
        }

        // N. HAPUS KOREKSI DARURAT (KEMBALI KE HITUNGAN OTOMATIS WAKTU)
        if ($action === 'delete_student_emergency_grading') {
            $nisn = trim($input['nisn'] ?? '');
            $dayNum = (int)($input['day_number'] ?? 0);
            if ($dayNum > 0) {
                $stmt = $pdo->prepare("DELETE FROM `student_emergency_grading` WHERE `nisn` = :n AND `day_number` = :d");
                $stmt->execute([':n' => $nisn, ':d' => $dayNum]);
            } else {
                $stmt = $pdo->prepare("DELETE FROM `student_emergency_grading` WHERE `nisn` = :n");
                $stmt->execute([':n' => $nisn]);
            }
            jsonResponse(true, "Koreksi darurat berhasil dihapus. Penilaian Day {$dayNum} dikembalikan ke kalkulasi waktu otomatis.");
        }

        // O. SIMPAN PEMBAGIAN SISWA BINAAN (MENTORSHIP FASILITATOR & KOORDINATOR)
        if ($action === 'save_mentorship_data') {
            $current = getMentorshipState($pdo);
            if (isset($input['assignments']) && is_array($input['assignments'])) {
                $current['assignments'] = $input['assignments'];
            }
            if (isset($input['teacher_roles']) && is_array($input['teacher_roles'])) {
                $current['teacher_roles'] = $input['teacher_roles'];
            }
            if (isset($input['custom_teachers']) && is_array($input['custom_teachers'])) {
                $current['custom_teachers'] = $input['custom_teachers'];
            }

            $stmtSave = $pdo->prepare("REPLACE INTO `app_settings` (`key_name`, `value`) VALUES ('mentorship_state_v1', :val)");
            $stmtSave->execute([':val' => json_encode($current, JSON_UNESCAPED_UNICODE)]);

            jsonResponse(true, 'Data Pembagian Siswa Binaan berhasil disinkronkan ke server.', $current);
        }

        jsonResponse(false, 'Aksi tidak valid', null, 400);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memproses aksi: ' . $e->getMessage(), null, 500);
    }
}
