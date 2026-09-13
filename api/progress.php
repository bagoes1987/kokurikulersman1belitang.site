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
      `status` ENUM('belum_mulai', 'draft', 'submitted', 'review', 'graded', 'revisi') NOT NULL DEFAULT 'submitted',
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

                if (in_array($r['status'], ['submitted', 'graded', 'review'])) {
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
                SELECT `student_nisn`, COUNT(DISTINCT `day_number`) as completed_days, AVG(`score`) as avg_score, MAX(`updated_at`) as last_active
                FROM `student_progress_eval`
                WHERE `status` IN ('submitted', 'graded')
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
            $status      = trim($input['status'] ?? 'graded');
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

        jsonResponse(false, 'Aksi tidak dikenali', null, 400);
    } catch (Exception $e) {
        jsonResponse(false, 'Gagal memproses data: ' . $e->getMessage(), null, 500);
    }
}
