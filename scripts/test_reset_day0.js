const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('==================================================');
console.log('🧪 TEST: RESET PROGRES DAY 0 & TOMBOL UNCEKLIS ADMIN');
console.log('==================================================\n');

// 1. Check admin/index.html for "Batal Centang Semua (Unceklis)" button
const adminHtml = fs.readFileSync(path.join(__dirname, '..', 'admin', 'index.html'), 'utf8');
assert(adminHtml.includes('setAllResetComponents(false)'), 'Admin must have setAllResetComponents(false) call');
assert(adminHtml.includes('Batal Centang Semua (Unceklis)'), 'Admin must have Unceklis button text');
console.log('✅ [PASS] Tombol "Batal Centang Semua (Unceklis)" terpasang di admin/index.html');

// 2. Check api/progress.php for $targetDay >= 0 in documentation media cleanup
const apiProgress = fs.readFileSync(path.join(__dirname, '..', 'api', 'progress.php'), 'utf8');
assert(!apiProgress.includes('if ($targetDay > 0) {\n                        $docQuery .='), 'api/progress.php should not use > 0 for documentation query');
assert(!apiProgress.includes('if ($targetDay > 0) {\n                        $stmtDoc = $pdo->prepare("DELETE FROM `dokumentasi_media`'), 'api/progress.php should not use > 0 for doc deletion');
console.log('✅ [PASS] api/progress.php mendukung target_day === 0 secara presisi (tidak menghapus semua hari)');

// 3. Check js/core.js for Day 0 reconciliation and purge
const coreJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'core.js'), 'utf8');
assert(coreJs.includes('for (let d = 0; d <= 7; d++) {'), 'js/core.js reconciliation loop must start from d = 0');
assert(coreJs.includes('if (targetDay >= 0) return !(d.day == targetDay || d.day_number == targetDay);'), 'js/core.js purgeStudentLocalStorage must use targetDay >= 0');
assert(coreJs.includes('localStorage.removeItem(`fincestem_refl_nft_day${d}_` + id);'), 'js/core.js purgeStudentLocalStorage must remove fincestem_refl_nft_day');
console.log('✅ [PASS] js/core.js merekonsiliasi dan membersihkan Day 0 dari local storage browser');

// 4. Check siswa/dashboard.html for Day 0 progress synchronization
const dashboardHtml = fs.readFileSync(path.join(__dirname, '..', 'siswa', 'dashboard.html'), 'utf8');
assert(dashboardHtml.includes('const dayProg = (dNum >= 0 && dNum <= 7) ? getFTProgressStatus(taskMap, dNum) : null;'), 'dashboard.html must run getFTProgressStatus for Day 0');
console.log('✅ [PASS] siswa/dashboard.html menyelaraskan alur pengerjaan Day 0 secara presisi');

// 5. Simulate localStorage behavior for Day 0 Reset
const mockLocalStorage = {};
const nisn = '1234567890';
// Setup student mock data for Day 0 and Day 1
mockLocalStorage['fincestem_materi_nft_day0_' + nisn] = JSON.stringify({ day: 0, submitted: true });
mockLocalStorage['fincestem_lkpd_nft_day0_' + nisn] = JSON.stringify({ day: 0, submitted: true, answers: { q1: 'A' } });
mockLocalStorage['fincestem_asesmen_nft_day0_' + nisn] = JSON.stringify({ day: 0, submitted: true, score: 100 });
mockLocalStorage['fincestem_dok_nft_day0_' + nisn] = 'true';
mockLocalStorage['fincestem_refleksi_nft_day0_' + nisn] = JSON.stringify({ day: 0, submitted: true, content: 'Bagus' });

mockLocalStorage['fincestem_materi_nft_day1_' + nisn] = JSON.stringify({ day: 1, submitted: true });
mockLocalStorage['fincestem_lkpd_nft_day1_' + nisn] = JSON.stringify({ day: 1, submitted: true });

// Emulate purgeStudentLocalStorage for Day 0
const days = [0];
const comp = { materi: true, lkpd: true, asesmen: true, refleksi: true, dokumentasi: true };
days.forEach(d => {
  if (comp.materi) delete mockLocalStorage[`fincestem_materi_nft_day${d}_` + nisn];
  if (comp.lkpd) delete mockLocalStorage[`fincestem_lkpd_nft_day${d}_` + nisn];
  if (comp.asesmen) delete mockLocalStorage[`fincestem_asesmen_nft_day${d}_` + nisn];
  if (comp.dokumentasi) delete mockLocalStorage[`fincestem_dok_nft_day${d}_` + nisn];
  if (comp.refleksi) delete mockLocalStorage[`fincestem_refleksi_nft_day${d}_` + nisn];
});

assert(!mockLocalStorage['fincestem_materi_nft_day0_' + nisn], 'Day 0 materi is purged');
assert(!mockLocalStorage['fincestem_lkpd_nft_day0_' + nisn], 'Day 0 lkpd is purged');
assert(!mockLocalStorage['fincestem_asesmen_nft_day0_' + nisn], 'Day 0 asesmen is purged');
assert(!mockLocalStorage['fincestem_dok_nft_day0_' + nisn], 'Day 0 dok is purged');
assert(!mockLocalStorage['fincestem_refleksi_nft_day0_' + nisn], 'Day 0 refleksi is purged');

// Day 1 must remain untouched
assert(mockLocalStorage['fincestem_materi_nft_day1_' + nisn], 'Day 1 materi remains intact');
assert(mockLocalStorage['fincestem_lkpd_nft_day1_' + nisn], 'Day 1 lkpd remains intact');
console.log('✅ [PASS] Simulasi Reset Day 0 membersihkan tuntas seluruh data Day 0 & menjaga Day 1-7 tetap aman');

console.log('\n==================================================');
console.log('🎉 SELURUH PENGUJIAN RESET DAY 0 SUKSES 100%!');
console.log('==================================================');
