<?php
/**
 * FINCESTEM 2026 - Student Progress & Facilitator Feedback API
 * Mengelola pelacakan progres tugas siswa (Day 1-7) dan pencatatan nilai & umpan balik fasilitator
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Pastikan tabel student_progress_eval dan tabel sinkronisasi reset ada
function ensureProgressTable($pdo) {
    static $checked = false;
    if ($checked) return;
    $lockFile = sys_get_temp_dir() . '/fincestem_progress_table_v3.lock';
    if (file_exists($lockFile) && (time() - filemtime($lockFile) < 3600)) {
        $checked = true;
        return;
    }

    $sql = "
    CREATE TABLE IF NOT EXISTS `student_progress_eval` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `student_nisn` VARCHAR(50) NOT NULL,
      `day_number` INT NOT NULL DEFAULT 1,
      `task_type` VARCHAR(50) NOT NULL DEFAULT 'lkpd' COMMENT 'materi, lkpd, asesmen, refleksi, dokumentasi, general',
      `content` TEXT DEFAULT NULL,
      `status` VARCHAR(50) NOT NULL DEFAULT 'submitted',
      `score` DECIMAL(5, 2) DEFAULT NULL,
      `predicate` VARCHAR(20) DEFAULT NULL,
      `score_financial` DECIMAL(5, 2) DEFAULT NULL,
      `score_culture` DECIMAL(5, 2) DEFAULT NULL,
      `score_exploration` DECIMAL(5, 2) DEFAULT NULL,
      `score_stem` DECIMAL(5, 2) DEFAULT NULL,
      `feedback` TEXT DEFAULT NULL,
      `facilitator_name` VARCHAR(150) DEFAULT NULL,
      `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY `uniq_student_day_task` (`student_nisn`, `day_number`, `task_type`),
      INDEX `idx_student_nisn` (`student_nisn`),
      INDEX `idx_day_number` (`day_number`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    try {
        $pdo->exec($sql);
        $pdo->exec("ALTER TABLE `student_progress_eval` MODIFY COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'submitted'");
    } catch (Exception $e) {}

    try {
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `reset_at` DATETIME DEFAULT NULL");
    } catch (Exception $e) {}

    try {
        $pdo->exec("
        CREATE TABLE IF NOT EXISTS `student_reset_meta` (
          `nisn` VARCHAR(50) PRIMARY KEY,
          `scope` VARCHAR(50) NOT NULL DEFAULT 'all_days',
          `target_day` INT NOT NULL DEFAULT -1,
          `components` TEXT DEFAULT NULL,
          `reset_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          INDEX `idx_reset_at` (`reset_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    } catch (Exception $e) {}

    try {
        $pdo->exec("
        CREATE TABLE IF NOT EXISTS `app_system_meta` (
          `meta_key` VARCHAR(100) PRIMARY KEY,
          `meta_value` TEXT DEFAULT NULL,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    } catch (Exception $e) {}

    @touch($lockFile);
    $checked = true;
}

if ($method === 'GET') {
    $nisn = trim($_GET['nisn'] ?? '');
    $className = trim($_GET['class_name'] ?? '');

    try {
        $pdo = getDB();
        ensureProgressTable($pdo);

        if ($nisn) {
            // Ambil data reset_at termutakhir (spesifik siswa atau grup/global reset)
            $resetInfo = null;
            try {
                $cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
                $unpadded = ltrim($cleanNisn, '0');
                $padded = (strlen($cleanNisn) >= 8 && strlen($cleanNisn) <= 10) ? str_pad($cleanNisn, 10, '0', STR_PAD_LEFT) : $cleanNisn;
                $allIds = array_values(array_unique(array_filter([$nisn, $cleanNisn, $unpadded, $padded])));

                // Dapatkan NIS dan zona siswa dari tabel users jika ada
                $studentZone = '';
                $inIdsSql = "'" . implode("','", array_map('addslashes', $allIds)) . "'";
                $uStmt = $pdo->query("SELECT `zone`, `reset_at`, `nis` FROM `users` WHERE `identifier` IN ($inIdsSql) OR `nis` IN ($inIdsSql) LIMIT 1");
                $uRow = $uStmt ? $uStmt->fetch() : null;
                if ($uRow) {
                    $studentZone = $uRow['zone'] ?? '';
                    if (!empty($uRow['nis'])) $allIds[] = $uRow['nis'];
                }
                $allIds = array_values(array_unique(array_filter($allIds)));
                $inIdsSql = "'" . implode("','", array_map('addslashes', $allIds)) . "'";
                $isFieldTrip = (stripos($studentZone, 'LUAR') !== false || stripos($studentZone, 'FIELD') !== false);

                // 1. Cek student_reset_meta
                $stmtReset = $pdo->query("
                    SELECT `scope`, `target_day`, `components`, `reset_at` 
                    FROM `student_reset_meta` 
                    WHERE `nisn` IN ($inIdsSql) 
                    ORDER BY `reset_at` DESC LIMIT 1
                ");
                $rMeta = $stmtReset ? $stmtReset->fetch() : null;

                // 2. Cek app_system_meta (global_reset, field_trip_reset, non_field_trip_reset)
                $metaCheckKeys = ["'global_reset'"];
                if ($isFieldTrip) {
                    $metaCheckKeys[] = "'field_trip_reset'";
                } else {
                    $metaCheckKeys[] = "'non_field_trip_reset'";
                }
                $inMetaKeys = implode(',', $metaCheckKeys);
                $stmtGlobal = $pdo->query("SELECT `meta_key`, `meta_value`, `updated_at` FROM `app_system_meta` WHERE `meta_key` IN ($inMetaKeys) ORDER BY `updated_at` DESC");
                $gMetas = $stmtGlobal ? $stmtGlobal->fetchAll() : [];

                $latestResetTime = null;
                $effectiveReset = null;

                if ($rMeta && !empty($rMeta['reset_at'])) {
                    $latestResetTime = strtotime($rMeta['reset_at']);
                    $compDecoded = !empty($rMeta['components']) ? json_decode($rMeta['components'], true) : null;
                    $effectiveReset = [
                        'reset_at'   => $rMeta['reset_at'],
                        'scope'      => $rMeta['scope'] ?? 'all_days',
                        'target_day' => (int)($rMeta['target_day'] ?? -1),
                        'components' => $compDecoded
                    ];
                }

                foreach ($gMetas as $gMeta) {
                    if (!empty($gMeta['updated_at'])) {
                        $gTime = strtotime($gMeta['updated_at']);
                        if ($latestResetTime === null || $gTime > $latestResetTime) {
                            $latestResetTime = $gTime;
                            $gParsed = json_decode($gMeta['meta_value'] ?? '{}', true) ?: [];
                            $effectiveReset = [
                                'reset_at'   => $gMeta['updated_at'],
                                'scope'      => $gParsed['scope'] ?? 'all_days',
                                'target_day' => (int)($gParsed['target_day'] ?? -1),
                                'components' => $gParsed['components'] ?? null
                            ];
                        }
                    }
                }

                if ($uRow && !empty($uRow['reset_at'])) {
                    $uTime = strtotime($uRow['reset_at']);
                    if ($latestResetTime === null || $uTime > $latestResetTime) {
                        $latestResetTime = $uTime;
                        $effectiveReset = [
                            'reset_at'   => $uRow['reset_at'],
                            'scope'      => 'all_days',
                            'target_day' => -1,
                            'components' => null
                        ];
                    }
                }

                $resetInfo = $effectiveReset;
            } catch (Exception $eReset) {}

            $cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
            $unpadded = ltrim($cleanNisn, '0');
            $padded = (strlen($cleanNisn) >= 8 && strlen($cleanNisn) <= 10) ? str_pad($cleanNisn, 10, '0', STR_PAD_LEFT) : $cleanNisn;
            $allNisns = array_values(array_unique(array_filter([$nisn, $cleanNisn, $unpadded, $padded])));
            $inNisns = "'" . implode("','", array_map('addslashes', $allNisns)) . "'";

            $stmt = $pdo->prepare("
                SELECT * FROM `student_progress_eval` 
                WHERE `student_nisn` IN ($inNisns)
                ORDER BY `day_number` ASC, `updated_at` DESC
            ");
            $stmt->execute();
            $records = $stmt->fetchAll();

            $completedDays = [];
            $scores = [];
            $latestFeedback = null;
            $taskMap = [];

            foreach ($records as $r) {
                $d = (int)$r['day_number'];
                $t = $r['task_type'];
                $taskMap[$d . '_' . $t] = $r;

                // Aturan Ketat FINCESTEM: Hanya jika status = 'completed' progress bertambah ke Day berikutnya
                if ($r['status'] === 'completed' && $d >= 1 && $d <= 7) {
                    $completedDays[$d] = true;
                }

                if ($r['score'] !== null && is_numeric($r['score']) && (float)$r['score'] > 0) {
                    $scores[] = (float)$r['score'];
                }

                if (!empty($r['feedback']) && ($latestFeedback === null || strtotime($r['updated_at']) > strtotime($latestFeedback['updated_at']))) {
                    $latestFeedback = $r;
                }
            }

            $totalTargetDays = 7;
            $completedCount = count($completedDays);
            $percentage = min(100, round(($completedCount / $totalTargetDays) * 100));

            $avgScore = count($scores) > 0 ? round(array_sum($scores) / count($scores), 1) : null;
            $predicate = 'Belum Ada';
            if ($avgScore !== null) {
                if ($avgScore >= 88) $predicate = 'Sangat Baik (A)';
                elseif ($avgScore >= 75) $predicate = 'Baik (B)';
                elseif ($avgScore >= 65) $predicate = 'Cukup (C)';
                else $predicate = 'Perlu Bimbingan (D)';
            }

            jsonResponse(true, 'Data progres siswa berhasil diambil', [
                'nisn'            => $nisn,
                'percentage'      => $percentage,
                'completed_days'  => $completedCount,
                'total_days'      => $totalTargetDays,
                'average_score'   => $avgScore,
                'predicate'       => $predicate,
                'latest_feedback' => $latestFeedback,
                'records'         => $records,
                'task_map'        => $taskMap,
                'reset_info'      => $resetInfo
            ]);
        } elseif ($className) {
            $stmt = $pdo->prepare("
                SELECT p.*, u.name, u.class_name
                FROM `student_progress_eval` p
                JOIN `users` u ON p.student_nisn = u.identifier
                WHERE u.class_name = :c
                ORDER BY u.name ASC, p.day_number ASC
            ");
            $stmt->execute([':c' => $className]);
            $rows = $stmt->fetchAll();
            jsonResponse(true, 'Data progres kelas berhasil diambil', $rows);
        } else {
            $stmt = $pdo->query("
                SELECT `student_nisn`, 
                       COUNT(DISTINCT CASE WHEN `status` = 'completed' AND `day_number` BETWEEN 1 AND 7 THEN `day_number` END) as completed_days, 
                       AVG(CASE WHEN `score` > 0 THEN `score` END) as avg_score, 
                       MAX(`updated_at`) as last_active
                FROM `student_progress_eval`
                GROUP BY `student_nisn`
            ");
            $summary = $stmt->fetchAll();
            jsonResponse(true, 'Rekap progres berhasil diambil', $summary);
        }
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memuat progres: ' . $e->getMessage(), null, 500);
    }
}

if ($method === 'POST') {
    $input = getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $action = $input['action'] ?? 'submit_task';

    try {
        $pdo = getDB();
        ensureProgressTable($pdo);

        // A. Siswa mengumpulkan tugas harian / catatan
        if ($action === 'submit_task') {
            $nisn    = trim($input['student_nisn'] ?? $input['nisn'] ?? '');
            $dayNum  = (int)($input['day_number'] ?? 1);
            $taskType= trim($input['task_type'] ?? 'lkpd');
            $content = is_array($input['content'] ?? '') ? json_encode($input['content'], JSON_UNESCAPED_UNICODE) : trim($input['content'] ?? '');
            $status  = trim($input['status'] ?? 'submitted');

            if (!$nisn) {
                jsonResponse(false, 'NISN siswa wajib diisi!', null, 400);
            }

            $stmt = $pdo->prepare("
                INSERT INTO `student_progress_eval` 
                    (`student_nisn`, `day_number`, `task_type`, `content`, `status`, `updated_at`)
                VALUES 
                    (:nisn, :d, :t, :c, :st, NOW())
                ON DUPLICATE KEY UPDATE
                    `content` = VALUES(`content`),
                    `status`  = VALUES(`status`),
                    `updated_at` = NOW()
            ");
            $stmt->execute([
                ':nisn' => $nisn,
                ':d'    => $dayNum,
                ':t'    => $taskType,
                ':c'    => $content,
                ':st'   => $status
            ]);

            jsonResponse(true, "Tugas Day {$dayNum} ({$taskType}) berhasil dikirim!", [
                'student_nisn' => $nisn,
                'day_number'   => $dayNum,
                'task_type'    => $taskType,
                'status'       => $status
            ]);
        }

        // B. Fasilitator / Admin memberikan nilai dan umpan balik (feedback)
        if ($action === 'submit_grade' || $action === 'submit_feedback') {
            $nisn        = trim($input['student_nisn'] ?? $input['nisn'] ?? '');
            $dayNum      = (int)($input['day_number'] ?? 1);
            $taskType    = trim($input['task_type'] ?? 'general');
            $score       = isset($input['score']) && $input['score'] !== '' ? (float)$input['score'] : null;
            $predicate   = trim($input['predicate'] ?? '');
            $feedback    = trim($input['feedback'] ?? '');
            $rawStatus   = strtolower(trim($input['status'] ?? ''));
            if (in_array($rawStatus, ['submitted', 'reviewed', 'revision', 'completed'])) {
                $status = $rawStatus;
            } elseif ($rawStatus === 'revisi') {
                $status = 'revision';
            } elseif ($rawStatus === 'graded') {
                $status = 'completed';
            } else {
                $status = ($score !== null) ? 'completed' : 'reviewed';
            }
            $fasilName   = trim($input['facilitator_name'] ?? 'Tim Fasilitator SMAN 1 Belitang');
            $scoreFin    = isset($input['score_financial']) ? (float)$input['score_financial'] : null;
            $scoreCul    = isset($input['score_culture']) ? (float)$input['score_culture'] : null;
            $scoreExp    = isset($input['score_exploration']) ? (float)$input['score_exploration'] : null;
            $scoreStem   = isset($input['score_stem']) ? (float)$input['score_stem'] : null;

            if (!$nisn) {
                jsonResponse(false, 'NISN target evaluasi wajib diisi!', null, 400);
            }

            if ($score !== null && !$predicate) {
                if ($score >= 88) $predicate = 'Sangat Baik (A)';
                elseif ($score >= 75) $predicate = 'Baik (B)';
                elseif ($score >= 65) $predicate = 'Cukup (C)';
                else $predicate = 'Perlu Bimbingan (D)';
            }

            $stmt = $pdo->prepare("
                INSERT INTO `student_progress_eval` 
                    (`student_nisn`, `day_number`, `task_type`, `score`, `predicate`, `score_financial`, `score_culture`, `score_exploration`, `score_stem`, `feedback`, `status`, `facilitator_name`, `updated_at`)
                VALUES 
                    (:nisn, :d, :t, :sc, :pred, :sfin, :scul, :sexp, :sstem, :fb, :st, :fasil, NOW())
                ON DUPLICATE KEY UPDATE
                    `score`             = VALUES(`score`),
                    `predicate`         = VALUES(`predicate`),
                    `score_financial`   = VALUES(`score_financial`),
                    `score_culture`     = VALUES(`score_culture`),
                    `score_exploration` = VALUES(`score_exploration`),
                    `score_stem`        = VALUES(`score_stem`),
                    `feedback`          = VALUES(`feedback`),
                    `status`            = VALUES(`status`),
                    `facilitator_name`  = VALUES(`facilitator_name`),
                    `updated_at`        = NOW()
            ");
            $stmt->execute([
                ':nisn'  => $nisn,
                ':d'     => $dayNum,
                ':t'     => $taskType,
                ':sc'    => $score,
                ':pred'  => $predicate,
                ':sfin'  => $scoreFin,
                ':scul'  => $scoreCul,
                ':sexp'  => $scoreExp,
                ':sstem' => $scoreStem,
                ':fb'    => $feedback,
                ':st'    => $status,
                ':fasil' => $fasilName
            ]);

            jsonResponse(true, "Nilai dan feedback untuk siswa (NISN {$nisn}) berhasil disimpan!", [
                'student_nisn'     => $nisn,
                'score'            => $score,
                'predicate'        => $predicate,
                'feedback'         => $feedback,
                'facilitator_name' => $fasilName
            ]);
        }

        // C. Reset data pengerjaan siswa spesifik (fleksibel: per-menu, per-hari, atau total)
        if ($action === 'reset_student') {
            $nisn = trim($input['student_nisn'] ?? $input['nisn'] ?? '');
            if (!$nisn) {
                jsonResponse(false, 'NISN siswa target reset wajib diisi!', null, 400);
            }

            $scope = $input['scope'] ?? 'all_days'; // 'trial_only', 'all_days', 'day_x'
            $targetDay = isset($input['target_day']) ? (int)$input['target_day'] : -1;
            if ($scope === 'trial_only') {
                $targetDay = 0;
            }

            $comp = $input['components'] ?? [
                'materi'      => true,
                'lkpd'        => true,
                'asesmen'     => true,
                'refleksi'    => true,
                'dokumentasi' => true,
                'foto_profil' => ($scope !== 'trial_only')
            ];

            $resetMateri = !empty($comp['materi']);
            $resetLkpd = !empty($comp['lkpd']);
            $resetAsesmen = !empty($comp['asesmen']);
            $resetRefleksi = !empty($comp['refleksi']);
            $resetDok = !empty($comp['dokumentasi']);
            $resetPhoto = !empty($comp['foto_profil']);

            // Identifikasi seluruh variasi ID siswa (padded, unpadded, NIS)
            $cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
            $unpadded = ltrim($cleanNisn, '0');
            $padded = (strlen($cleanNisn) >= 8 && strlen($cleanNisn) <= 10) ? str_pad($cleanNisn, 10, '0', STR_PAD_LEFT) : $cleanNisn;
            $allIds = array_values(array_unique(array_filter([$nisn, $cleanNisn, $unpadded, $padded])));

            try {
                $inTemp = "'" . implode("','", array_map('addslashes', $allIds)) . "'";
                $uFind = $pdo->query("SELECT `identifier`, `nis`, `photo_url` FROM `users` WHERE `identifier` IN ($inTemp) OR `nis` IN ($inTemp)");
                if ($uFind) {
                    while ($ur = $uFind->fetch()) {
                        if (!empty($ur['identifier'])) $allIds[] = $ur['identifier'];
                        if (!empty($ur['nis'])) $allIds[] = $ur['nis'];
                    }
                }
                $allIds = array_values(array_unique(array_filter($allIds)));
            } catch (Exception $eU) {}

            $inIds = "'" . implode("','", array_map('addslashes', $allIds)) . "'";

            // 1. Hapus dari student_progress_eval sesuai filter komponen & hari
            $taskTypes = [];
            if ($resetMateri) $taskTypes[] = "'materi'";
            if ($resetLkpd) $taskTypes[] = "'lkpd'";
            if ($resetAsesmen) $taskTypes[] = "'asesmen'";
            if ($resetRefleksi) $taskTypes[] = "'refleksi'";
            if ($resetDok) $taskTypes[] = "'dokumentasi'";

            $deletedEval = 0;
            if (!empty($taskTypes)) {
                $typeSql = implode(',', $taskTypes);
                if ($targetDay >= 0) {
                    $stmt = $pdo->prepare("DELETE FROM `student_progress_eval` WHERE `student_nisn` IN ($inIds) AND `day_number` = :day AND `task_type` IN ($typeSql)");
                    $stmt->execute([':day' => $targetDay]);
                } else {
                    $pdo->exec("DELETE FROM `student_progress_eval` WHERE `student_nisn` IN ($inIds) AND `task_type` IN ($typeSql)");
                }
            }

            // 2. Hapus pengumpulan LKPD siswa jika opsi LKPD dicentang
            if ($resetLkpd) {
                try {
                    if ($targetDay === 0) {
                        $pdo->exec("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inIds) AND (`title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `title` LIKE '%Gladi%')");
                    } elseif ($targetDay > 0) {
                        $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inIds) AND `title` LIKE :dtit");
                        $stmtLkpd->execute([':dtit' => "%Day {$targetDay}%"]);
                    } else {
                        $pdo->exec("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inIds)");
                    }
                } catch (Exception $e) {}
            }

            // 3. Hapus foto profil jika opsi foto profil dicentang
            $deletedPhoto = false;
            if ($resetPhoto) {
                try {
                    $stmtPhoto = $pdo->query("SELECT `photo_url` FROM `users` WHERE `identifier` IN ($inIds) OR `nis` IN ($inIds)");
                    if ($stmtPhoto) {
                        while ($userRow = $stmtPhoto->fetch()) {
                            if (!empty($userRow['photo_url'])) {
                                $photoFile = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . basename($userRow['photo_url']);
                                if (file_exists($photoFile) && is_file($photoFile)) {
                                    @unlink($photoFile);
                                    $deletedPhoto = true;
                                }
                            }
                        }
                    }

                    foreach ([$cleanNisn, $unpadded, $padded] as $cid) {
                        if ($cid) {
                            $pattern = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . 'foto_' . $cid . '_*.*';
                            $matchedFiles = glob($pattern);
                            if ($matchedFiles) {
                                foreach ($matchedFiles as $f) {
                                    if (is_file($f)) {
                                        @unlink($f);
                                        $deletedPhoto = true;
                                    }
                                }
                            }
                        }
                    }

                    $pdo->exec("UPDATE `users` SET `photo_url` = NULL WHERE `identifier` IN ($inIds) OR `nis` IN ($inIds)");
                } catch (Exception $e) {}
            }

            // 4. Hapus foto dokumentasi jika opsi dokumentasi dicentang
            if ($resetDok) {
                try {
                    $docQuery = "SELECT `id`, `file_url` FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inIds)";
                    if ($targetDay > 0) {
                        $docQuery .= " AND (`title` LIKE :dtit OR `caption` LIKE :dtit)";
                    }
                    $stmtDocFind = $pdo->prepare($docQuery);
                    $docParams = [];
                    if ($targetDay > 0) $docParams[':dtit'] = "%Day {$targetDay}%";
                    $stmtDocFind->execute($docParams);
                    $docs = $stmtDocFind->fetchAll();
                    foreach ($docs as $d) {
                        if (!empty($d['file_url']) && strpos($d['file_url'], 'data:image') === false) {
                            $docRel = ltrim(str_replace(['../', '..\\'], '', $d['file_url']), '/\\');
                            $docPath = BASE_DIR . DIRECTORY_SEPARATOR . $docRel;
                            if (file_exists($docPath) && is_file($docPath)) @unlink($docPath);
                        }
                    }

                    if ($targetDay > 0) {
                        $stmtDoc = $pdo->prepare("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inIds) AND (`title` LIKE :dtit OR `caption` LIKE :dtit)");
                        $stmtDoc->execute([':dtit' => "%Day {$targetDay}%"]);
                    } else {
                        $pdo->exec("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inIds)");
                    }
                } catch (Exception $e) {}
            }

            // 5. Catat timestamp reset agar device/browser siswa langsung mendeteksi dan membersihkan cache lokal
            $nowStr = date('Y-m-d H:i:s');
            try {
                $stmtMeta = $pdo->prepare("
                    INSERT INTO `student_reset_meta` (`nisn`, `scope`, `target_day`, `components`, `reset_at`)
                    VALUES (:nisn, :scope, :tday, :comp, :now)
                    ON DUPLICATE KEY UPDATE 
                        `scope` = VALUES(`scope`),
                        `target_day` = VALUES(`target_day`),
                        `components` = VALUES(`components`),
                        `reset_at` = VALUES(`reset_at`)
                ");

                foreach ($allIds as $sid) {
                    $stmtMeta->execute([
                        ':nisn'  => $sid,
                        ':scope' => $scope,
                        ':tday'  => $targetDay,
                        ':comp'  => json_encode($comp),
                        ':now'   => $nowStr
                    ]);
                }

                $pdo->exec("UPDATE `users` SET `reset_at` = '$nowStr' WHERE `identifier` IN ($inIds) OR `nis` IN ($inIds)");
            } catch (Exception $eMeta) {}

            $scopeMsg = $targetDay === 0 ? "khusus Day Uji Coba (Day 0)" : ($targetDay > 0 ? "Day {$targetDay}" : "seluruh hari");
            jsonResponse(true, "Data siswa (NISN {$nisn}) {$scopeMsg} berhasil di-reset sampai bersih total!", [
                'student_nisn'    => $nisn,
                'scope'           => $scope,
                'target_day'      => $targetDay,
                'deleted_records' => $deletedEval,
                'deleted_photo'   => $deletedPhoto,
                'reset_at'        => $nowStr
            ]);
        }

        // D. Reset MASSAL (semua siswa sekaligus: grup Field Trip, Non-Field Trip, atau Total)
        if ($action === 'reset_all_students' || $action === 'reset_group_students') {
            $scope = $input['scope'] ?? 'all_days';
            $targetDay = isset($input['target_day']) ? (int)$input['target_day'] : -1;
            if ($scope === 'trial_only') {
                $targetDay = 0;
            }

            $groupCategory = trim($input['group_category'] ?? $input['group'] ?? 'all');
            $nisnList = $input['nisn_list'] ?? [];
            if (!is_array($nisnList)) $nisnList = [];

            $comp = $input['components'] ?? [
                'materi'      => true,
                'lkpd'        => true,
                'asesmen'     => true,
                'refleksi'    => true,
                'dokumentasi' => true,
                'foto_profil' => ($scope !== 'trial_only')
            ];

            $resetMateri = !empty($comp['materi']);
            $resetLkpd = !empty($comp['lkpd']);
            $resetAsesmen = !empty($comp['asesmen']);
            $resetRefleksi = !empty($comp['refleksi']);
            $resetDok = !empty($comp['dokumentasi']);
            $resetPhoto = !empty($comp['foto_profil']);

            $taskTypes = [];
            if ($resetMateri) $taskTypes[] = "'materi'";
            if ($resetLkpd) $taskTypes[] = "'lkpd'";
            if ($resetAsesmen) $taskTypes[] = "'asesmen'";
            if ($resetRefleksi) $taskTypes[] = "'refleksi'";
            if ($resetDok) $taskTypes[] = "'dokumentasi'";

            $nowStr = date('Y-m-d H:i:s');
            $isGroupSpecific = ($groupCategory === 'field_trip' || $groupCategory === 'non_field_trip' || !empty($nisnList));

            if ($isGroupSpecific) {
                // Kumpulkan seluruh target identifier untuk grup ini
                $targetIds = [];
                foreach ($nisnList as $n) {
                    $c = preg_replace('/[^A-Za-z0-9]/', '', (string)$n);
                    if ($c) {
                        $targetIds[] = $c;
                        $targetIds[] = ltrim($c, '0');
                        if (strlen($c) >= 8 && strlen($c) <= 10) $targetIds[] = str_pad($c, 10, '0', STR_PAD_LEFT);
                    }
                }

                // Tambahkan dari tabel users berdasarkan kategori zona
                try {
                    $zoneSql = "";
                    if ($groupCategory === 'field_trip') {
                        $zoneSql = " AND (`zone` LIKE '%LUAR%' OR `zone` LIKE '%FIELD%' OR `zone` LIKE '%TRIP%')";
                    } elseif ($groupCategory === 'non_field_trip') {
                        $zoneSql = " AND NOT (`zone` LIKE '%LUAR%' OR `zone` LIKE '%FIELD%' OR `zone` LIKE '%TRIP%')";
                    }
                    $uStmt = $pdo->query("SELECT `identifier`, `nis`, `photo_url` FROM `users` WHERE (`role` = 'siswa' OR `role` IS NULL){$zoneSql}");
                    if ($uStmt) {
                        while ($ur = $uStmt->fetch()) {
                            if (!empty($ur['identifier'])) {
                                $targetIds[] = $ur['identifier'];
                                $c = preg_replace('/[^A-Za-z0-9]/', '', $ur['identifier']);
                                if ($c) {
                                    $targetIds[] = $c;
                                    $targetIds[] = ltrim($c, '0');
                                }
                            }
                            if (!empty($ur['nis'])) $targetIds[] = $ur['nis'];
                        }
                    }
                } catch (Exception $eU) {}

                $targetIds = array_values(array_unique(array_filter($targetIds)));

                // Eksekusi per-chunk (500 per batch) untuk stabilitas SQL query
                $chunks = array_chunk($targetIds, 400);
                foreach ($chunks as $chunk) {
                    $inSql = "'" . implode("','", array_map('addslashes', $chunk)) . "'";

                    // 1. student_progress_eval
                    if (!empty($taskTypes)) {
                        $typeSql = implode(',', $taskTypes);
                        if ($targetDay >= 0) {
                            $stmt = $pdo->prepare("DELETE FROM `student_progress_eval` WHERE `student_nisn` IN ($inSql) AND `day_number` = :day AND `task_type` IN ($typeSql)");
                            $stmt->execute([':day' => $targetDay]);
                        } else {
                            $pdo->exec("DELETE FROM `student_progress_eval` WHERE `student_nisn` IN ($inSql) AND `task_type` IN ($typeSql)");
                        }
                    }

                    // 2. lkpd_submissions
                    if ($resetLkpd) {
                        if ($targetDay === 0) {
                            $pdo->exec("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inSql) AND (`title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `title` LIKE '%Gladi%')");
                        } elseif ($targetDay > 0) {
                            $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inSql) AND `title` LIKE :dtit");
                            $stmtLkpd->execute([':dtit' => "%Day {$targetDay}%"]);
                        } else {
                            $pdo->exec("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` IN ($inSql)");
                        }
                    }

                    // 3. Foto profil
                    if ($resetPhoto) {
                        $stmtPhoto = $pdo->query("SELECT `photo_url` FROM `users` WHERE `identifier` IN ($inSql) OR `nis` IN ($inSql)");
                        if ($stmtPhoto) {
                            while ($userRow = $stmtPhoto->fetch()) {
                                if (!empty($userRow['photo_url'])) {
                                    $photoFile = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . basename($userRow['photo_url']);
                                    if (file_exists($photoFile) && is_file($photoFile)) @unlink($photoFile);
                                }
                            }
                        }
                        $pdo->exec("UPDATE `users` SET `photo_url` = NULL WHERE `identifier` IN ($inSql) OR `nis` IN ($inSql)");
                    }

                    // 4. Dokumentasi media
                    if ($resetDok) {
                        $docQuery = "SELECT `id`, `file_url` FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inSql)";
                        if ($targetDay > 0) $docQuery .= " AND (`title` LIKE '%Day {$targetDay}%' OR `caption` LIKE '%Day {$targetDay}%')";
                        $stmtDocFind = $pdo->query($docQuery);
                        if ($stmtDocFind) {
                            while ($d = $stmtDocFind->fetch()) {
                                if (!empty($d['file_url']) && strpos($d['file_url'], 'data:image') === false) {
                                    $docRel = ltrim(str_replace(['../', '..\\'], '', $d['file_url']), '/\\');
                                    $docPath = BASE_DIR . DIRECTORY_SEPARATOR . $docRel;
                                    if (file_exists($docPath) && is_file($docPath)) @unlink($docPath);
                                }
                            }
                        }
                        if ($targetDay > 0) {
                            $pdo->exec("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inSql) AND (`title` LIKE '%Day {$targetDay}%' OR `caption` LIKE '%Day {$targetDay}%')");
                        } else {
                            $pdo->exec("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` IN ($inSql)");
                        }
                    }

                    // 5. Update users.reset_at
                    $pdo->exec("UPDATE `users` SET `reset_at` = '$nowStr' WHERE `identifier` IN ($inSql) OR `nis` IN ($inSql)");

                    // 6. Catat ke student_reset_meta
                    $stmtMeta = $pdo->prepare("
                        INSERT INTO `student_reset_meta` (`nisn`, `scope`, `target_day`, `components`, `reset_at`)
                        VALUES (:nisn, :scope, :tday, :comp, :now)
                        ON DUPLICATE KEY UPDATE 
                            `scope` = VALUES(`scope`),
                            `target_day` = VALUES(`target_day`),
                            `components` = VALUES(`components`),
                            `reset_at` = VALUES(`reset_at`)
                    ");
                    foreach ($chunk as $sid) {
                        $stmtMeta->execute([
                            ':nisn'  => $sid,
                            ':scope' => $scope,
                            ':tday'  => $targetDay,
                            ':comp'  => json_encode($comp),
                            ':now'   => $nowStr
                        ]);
                    }
                }

                // Catat flag grup ke app_system_meta
                $metaKey = ($groupCategory === 'field_trip') ? 'field_trip_reset' : 'non_field_trip_reset';
                $gVal = json_encode([
                    'reset_at'       => $nowStr,
                    'group_category' => $groupCategory,
                    'scope'          => $scope,
                    'target_day'     => $targetDay,
                    'components'     => $comp
                ]);
                $stmtG = $pdo->prepare("
                    INSERT INTO `app_system_meta` (`meta_key`, `meta_value`, `updated_at`)
                    VALUES (:mkey, :val, :now)
                    ON DUPLICATE KEY UPDATE 
                        `meta_value` = VALUES(`meta_value`),
                        `updated_at` = VALUES(`updated_at`)
                ");
                $stmtG->execute([':mkey' => $metaKey, ':val' => $gVal, ':now' => $nowStr]);

                $groupLabel = ($groupCategory === 'field_trip') ? 'Siswa Field Trip' : 'Siswa Non-Field Trip';
                $scopeMsg = $targetDay === 0 ? "khusus Day Uji Coba (Day 0)" : ($targetDay > 0 ? "Day {$targetDay}" : "seluruh hari");
                jsonResponse(true, "Seluruh data {$groupLabel} ({$scopeMsg}) berhasil di-reset sampai bersih total!", [
                    'group_category' => $groupCategory,
                    'scope'          => $scope,
                    'target_day'     => $targetDay,
                    'reset_at'       => $nowStr,
                    'target_count'   => count($targetIds)
                ]);
            } else {
                // RESET TOTAL SELURUH SISWA (GLOBAL)
                // 1. student_progress_eval
                if (!empty($taskTypes)) {
                    $typeSql = implode(',', $taskTypes);
                    if ($targetDay >= 0) {
                        $stmt = $pdo->prepare("DELETE FROM `student_progress_eval` WHERE `day_number` = :day AND `task_type` IN ($typeSql)");
                        $stmt->execute([':day' => $targetDay]);
                    } else {
                        $pdo->exec("DELETE FROM `student_progress_eval` WHERE `task_type` IN ($typeSql)");
                    }
                }

                // 2. lkpd_submissions
                if ($resetLkpd) {
                    try {
                        if ($targetDay === 0) {
                            $pdo->exec("DELETE FROM `lkpd_submissions` WHERE `title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `title` LIKE '%Gladi%'");
                        } elseif ($targetDay > 0) {
                            $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `title` LIKE :dtit");
                            $stmtLkpd->execute([':dtit' => "%Day {$targetDay}%"]);
                        } else {
                            $pdo->exec("DELETE FROM `lkpd_submissions`");
                        }
                    } catch (Exception $e) {}
                }

                // 3. Foto profil
                if ($resetPhoto) {
                    try {
                        $pdo->exec("UPDATE `users` SET `photo_url` = NULL WHERE `role` = 'siswa' OR `role` IS NULL");
                        $fotoDir = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto';
                        if (is_dir($fotoDir)) {
                            $files = glob($fotoDir . DIRECTORY_SEPARATOR . 'foto_*.*');
                            if ($files) {
                                foreach ($files as $f) {
                                    if (is_file($f)) @unlink($f);
                                }
                            }
                        }
                    } catch (Exception $e) {}
                }

                // 4. Dokumentasi media
                if ($resetDok) {
                    try {
                        $whereDocs = "";
                        if ($targetDay > 0) {
                            $whereDocs = " WHERE `title` LIKE '%Day {$targetDay}%' OR `caption` LIKE '%Day {$targetDay}%'";
                        }
                        $stmtAllDocs = $pdo->query("SELECT `file_url` FROM `dokumentasi_media`" . $whereDocs);
                        if ($stmtAllDocs) {
                            while ($d = $stmtAllDocs->fetch()) {
                                if (!empty($d['file_url']) && strpos($d['file_url'], 'data:image') === false) {
                                    $docRel = ltrim(str_replace(['../', '..\\'], '', $d['file_url']), '/\\');
                                    $docPath = BASE_DIR . DIRECTORY_SEPARATOR . $docRel;
                                    if (file_exists($docPath) && is_file($docPath)) @unlink($docPath);
                                }
                            }
                        }
                        if ($targetDay > 0) {
                            $pdo->exec("DELETE FROM `dokumentasi_media` WHERE `title` LIKE '%Day {$targetDay}%' OR `caption` LIKE '%Day {$targetDay}%'");
                        } else {
                            $pdo->exec("DELETE FROM `dokumentasi_media`");
                        }
                    } catch (Exception $e) {}
                }

                // 5. Catat timestamp reset global agar seluruh perangkat siswa mendeteksi dan membersihkan cache lokal
                try {
                    $gVal = json_encode([
                        'reset_at'   => $nowStr,
                        'scope'      => $scope,
                        'target_day' => $targetDay,
                        'components' => $comp
                    ]);
                    $stmtG = $pdo->prepare("
                        INSERT INTO `app_system_meta` (`meta_key`, `meta_value`, `updated_at`)
                        VALUES ('global_reset', :val, :now)
                        ON DUPLICATE KEY UPDATE 
                            `meta_value` = VALUES(`meta_value`),
                            `updated_at` = VALUES(`updated_at`)
                    ");
                    $stmtG->execute([':val' => $gVal, ':now' => $nowStr]);

                    $pdo->exec("UPDATE `users` SET `reset_at` = '$nowStr' WHERE `role` = 'siswa' OR `role` IS NULL");
                } catch (Exception $eMeta) {}

                $scopeMsg = $targetDay === 0 ? "khusus Day Uji Coba (Day 0)" : ($targetDay > 0 ? "Day {$targetDay}" : "seluruh hari");
                jsonResponse(true, "Seluruh data pengerjaan siswa ({$scopeMsg}) berhasil dibersihkan sesuai pilihan komponen!", [
                    'scope'      => $scope,
                    'target_day' => $targetDay,
                    'reset_at'   => $nowStr
                ]);
            }
        }

        jsonResponse(false, 'Aksi tidak dikenali', null, 400);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memproses data: ' . $e->getMessage(), null, 500);
    }
}
