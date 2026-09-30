<?php
/**
 * FINCESTEM 2026 - Student Progress & Facilitator Feedback API
 * Mengelola pelacakan progres tugas siswa (Day 1-7) dan pencatatan nilai & umpan balik fasilitator
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Pastikan tabel student_progress_eval ada
function ensureProgressTable($pdo) {
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
}

if ($method === 'GET') {
    $nisn = trim($_GET['nisn'] ?? '');
    $className = trim($_GET['class_name'] ?? '');

    try {
        $pdo = getDB();
        ensureProgressTable($pdo);

        if ($nisn) {
            $stmt = $pdo->prepare("
                SELECT * FROM `student_progress_eval` 
                WHERE `student_nisn` = :nisn 
                ORDER BY `day_number` ASC, `updated_at` DESC
            ");
            $stmt->execute([':nisn' => $nisn]);
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
                'task_map'        => $taskMap
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
                'lkpd'        => true,
                'asesmen'     => true,
                'refleksi'    => true,
                'dokumentasi' => true,
                'foto_profil' => ($scope !== 'trial_only')
            ];

            $resetLkpd = !empty($comp['lkpd']);
            $resetAsesmen = !empty($comp['asesmen']);
            $resetRefleksi = !empty($comp['refleksi']);
            $resetDok = !empty($comp['dokumentasi']);
            $resetPhoto = !empty($comp['foto_profil']);

            // 1. Hapus dari student_progress_eval sesuai filter komponen & hari
            $taskTypes = [];
            if ($resetLkpd) $taskTypes[] = "'lkpd'";
            if ($resetAsesmen) $taskTypes[] = "'asesmen'";
            if ($resetRefleksi) $taskTypes[] = "'refleksi'";
            if ($resetDok) $taskTypes[] = "'dokumentasi'";

            $deletedEval = 0;
            if (!empty($taskTypes)) {
                $typeSql = implode(',', $taskTypes);
                if ($targetDay >= 0) {
                    $stmt = $pdo->prepare("DELETE FROM `student_progress_eval` WHERE `student_nisn` = :nisn AND `day_number` = :day AND `task_type` IN ($typeSql)");
                    $stmt->execute([':nisn' => $nisn, ':day' => $targetDay]);
                } else {
                    $stmt = $pdo->prepare("DELETE FROM `student_progress_eval` WHERE `student_nisn` = :nisn AND `task_type` IN ($typeSql)");
                    $stmt->execute([':nisn' => $nisn]);
                }
                $deletedEval = $stmt->rowCount();
            }

            // 2. Hapus pengumpulan LKPD siswa jika opsi LKPD dicentang
            if ($resetLkpd) {
                try {
                    if ($targetDay === 0) {
                        $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` = :nisn AND (`title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `title` LIKE '%Gladi%')");
                        $stmtLkpd->execute([':nisn' => $nisn]);
                    } elseif ($targetDay > 0) {
                        $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` = :nisn AND `title` LIKE :dtit");
                        $stmtLkpd->execute([':nisn' => $nisn, ':dtit' => "%Day {$targetDay}%"]);
                    } else {
                        $stmtLkpd = $pdo->prepare("DELETE FROM `lkpd_submissions` WHERE `submitted_by_nisn` = :nisn");
                        $stmtLkpd->execute([':nisn' => $nisn]);
                    }
                } catch (Exception $e) {}
            }

            // 3. Hapus foto profil jika opsi foto profil dicentang
            $deletedPhoto = false;
            if ($resetPhoto) {
                try {
                    $stmtPhoto = $pdo->prepare("SELECT `photo_url` FROM `users` WHERE `identifier` = :id OR `nis` = :nis LIMIT 1");
                    $stmtPhoto->execute([':id' => $nisn, ':nis' => $nisn]);
                    $userRow = $stmtPhoto->fetch();
                    if ($userRow && !empty($userRow['photo_url'])) {
                        $photoFile = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . basename($userRow['photo_url']);
                        if (file_exists($photoFile) && is_file($photoFile)) {
                            @unlink($photoFile);
                            $deletedPhoto = true;
                        }
                    }

                    $cleanNisn = preg_replace('/[^A-Za-z0-9]/', '', $nisn);
                    if ($cleanNisn) {
                        $pattern = BASE_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'foto' . DIRECTORY_SEPARATOR . 'foto_' . $cleanNisn . '_*.*';
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

                    $stmtResetPhoto = $pdo->prepare("UPDATE `users` SET `photo_url` = NULL WHERE `identifier` = :id OR `nis` = :nis");
                    $stmtResetPhoto->execute([':id' => $nisn, ':nis' => $nisn]);
                } catch (Exception $e) {}
            }

            // 4. Hapus foto dokumentasi jika opsi dokumentasi dicentang
            if ($resetDok) {
                try {
                    if ($targetDay === 0) {
                        $stmtDoc = $pdo->prepare("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` = :nisn AND (`title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `caption` LIKE '%Day 0%')");
                        $stmtDoc->execute([':nisn' => $nisn]);
                    } else {
                        $stmtDoc = $pdo->prepare("DELETE FROM `dokumentasi_media` WHERE `uploaded_by_nisn` = :nisn");
                        $stmtDoc->execute([':nisn' => $nisn]);
                    }
                } catch (Exception $e) {}
            }

            $scopeMsg = $targetDay === 0 ? "khusus Day Uji Coba (Day 0)" : ($targetDay > 0 ? "Day {$targetDay}" : "seluruh hari");
            jsonResponse(true, "Data siswa (NISN {$nisn}) {$scopeMsg} berhasil di-reset sesuai pilihan komponen!", [
                'student_nisn'    => $nisn,
                'scope'           => $scope,
                'target_day'      => $targetDay,
                'deleted_records' => $deletedEval,
                'deleted_photo'   => $deletedPhoto
            ]);
        }

        // D. Reset MASSAL (semua siswa sekaligus: per-menu, per-hari, atau total)
        if ($action === 'reset_all_students') {
            $scope = $input['scope'] ?? 'all_days';
            $targetDay = isset($input['target_day']) ? (int)$input['target_day'] : -1;
            if ($scope === 'trial_only') {
                $targetDay = 0;
            }

            $comp = $input['components'] ?? [
                'lkpd'        => true,
                'asesmen'     => true,
                'refleksi'    => true,
                'dokumentasi' => true,
                'foto_profil' => ($scope !== 'trial_only')
            ];

            $resetLkpd = !empty($comp['lkpd']);
            $resetAsesmen = !empty($comp['asesmen']);
            $resetRefleksi = !empty($comp['refleksi']);
            $resetDok = !empty($comp['dokumentasi']);
            $resetPhoto = !empty($comp['foto_profil']);

            // 1. student_progress_eval
            $taskTypes = [];
            if ($resetLkpd) $taskTypes[] = "'lkpd'";
            if ($resetAsesmen) $taskTypes[] = "'asesmen'";
            if ($resetRefleksi) $taskTypes[] = "'refleksi'";
            if ($resetDok) $taskTypes[] = "'dokumentasi'";

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
                    if ($targetDay === 0) {
                        $pdo->exec("DELETE FROM `dokumentasi_media` WHERE `title` LIKE '%Day 0%' OR `title` LIKE '%Simulasi%' OR `caption` LIKE '%Day 0%'");
                    } else {
                        $stmtAllDocs = $pdo->query("SELECT `file_url` FROM `dokumentasi_media`");
                        if ($stmtAllDocs) {
                            while ($d = $stmtAllDocs->fetch()) {
                                if (!empty($d['file_url']) && strpos($d['file_url'], 'data:image') === false) {
                                    $docRel = ltrim(str_replace(['../', '..\\'], '', $d['file_url']), '/\\');
                                    $docPath = BASE_DIR . DIRECTORY_SEPARATOR . $docRel;
                                    if (file_exists($docPath) && is_file($docPath)) @unlink($docPath);
                                }
                            }
                        }
                        $pdo->exec("DELETE FROM `dokumentasi_media`");
                    }
                } catch (Exception $e) {}
            }

            $scopeMsg = $targetDay === 0 ? "khusus Day Uji Coba (Day 0)" : ($targetDay > 0 ? "Day {$targetDay}" : "seluruh hari");
            jsonResponse(true, "Seluruh data pengerjaan siswa ({$scopeMsg}) berhasil dibersihkan sesuai pilihan komponen!");
        }

        jsonResponse(false, 'Aksi tidak dikenali', null, 400);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memproses data: ' . $e->getMessage(), null, 500);
    }
}
