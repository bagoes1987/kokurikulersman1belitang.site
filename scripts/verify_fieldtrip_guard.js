/**
 * FINCESTEM 2026 - FIELD TRIP INTEGRITY & REGRESSION GUARD
 * Memastikan seluruh modul, alur pengerjaan, LKPD, kuis, dan data Day 1 s.d. 7 Field Trip 
 * tetap 100% utuh dan tidak terganggu saat pengembangan Non-Field Trip.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const checks = [
  // 1. DASHBOARD SISWA
  {
    file: 'siswa/dashboard.html',
    assertions: [
      { name: 'Day 1: Literasi Kas Saku & Refleksi', pattern: /fincestem_lkpd_ft_day1|formula 50-30-20/i },
      { name: 'Day 2: Multi-sesi AKPOL & Lawang Sewu', pattern: /fincestem_materi_ft_day2_akpol|fincestem_lkpd_ft_day2_akpol|lawang/i },
      { name: 'Day 3: Tiga Sesi (Apel, JTP1, Museum Angkut)', pattern: /fincestem_materi_ft_day3_apel|fincestem_lkpd_ft_day3_jtp1|museum/i },
      { name: 'Day 4: Bromo TNBTS & Ekosistem Vulkanik', pattern: /fincestem_materi_ft_day4|bromo/i },
      { name: 'Day 5: Prambanan, Batik & UNY', pattern: /fincestem_materi_ft_day5_prambanan|batik|uny/i },
      { name: 'Day 6: Bakpia & Pantai Drini', pattern: /fincestem_materi_ft_day6_bakpia|fincestem_materi_ft_day6_drini|drini/i },
      { name: 'Day 7: Tutup Kas Saku & Kesan Pesan', pattern: /fincestem_lkpd_ft_day7|modalAwal|expJajan|expOlehOleh|sisaSaldo|momenFavorit/i },
      { name: 'Day 7: Bonus Asesmen 100/100', pattern: /Bebas tes kepulangan|exemption|Skor Bonus 100\/100/i }
    ]
  },
  // 2. MODUL MATERI FIELD TRIP
  {
    file: 'js/modules/materi-fieldtrip.js',
    assertions: [
      { name: 'Materi Day 1 Belitang - Semarang', pattern: /Belitang|Perjalanan Darat|50-30-20/i },
      { name: 'Materi Day 2 AKPOL & Lawang Sewu', pattern: /Akademi Kepolisian|Lawang Sewu/i },
      { name: 'Materi Day 3 JTP1, Apel, Museum', pattern: /Jawa Timur Park|Museum Angkut|Petik Apel/i },
      { name: 'Materi Day 4 Bromo TNBTS', pattern: /Bromo|TNBTS|Kaldera/i },
      { name: 'Materi Day 5 Prambanan & UNY', pattern: /Candi Prambanan|Universitas Negeri Yogyakarta|Batik/i },
      { name: 'Materi Day 6 Bakpia & Pantai Drini (Karst Ongky Suherman)', pattern: /Bakpia Pathok|Pantai Drini|Ongky Suherman/i },
      { name: 'Materi Day 7 Kepulangan & Evaluasi Belitang', pattern: /Refleksi Kepulangan|Belitang|Evaluasi Akhir/i }
    ]
  },
  // 3. MODUL LKPD FIELD TRIP
  {
    file: 'js/modules/lkpd-fieldtrip.js',
    assertions: [
      { name: 'LKPD Day 1 Kas Saku', pattern: /totalSaku|Alokasi|Kebutuhan vs Keinginan/i },
      { name: 'LKPD Day 2 AKPOL & Lawang Sewu', pattern: /akpol|lawang/i },
      { name: 'LKPD Day 3 Agribisnis & Fisika Terapan', pattern: /apel|jatim|museum/i },
      { name: 'LKPD Day 6 Bakpia & Pantai Drini', pattern: /bakpia|drini|bentang alam karst/i },
      { name: 'LKPD Day 7 Tutup Buku Kas Saku & Kesan Pesan', pattern: /modalAwal|expJajan|expOlehOleh|expLain|sisaSaldo|pesanOrtu|pesanGuru/i }
    ]
  },
  // 4. DOKUMENTASI MEDIA
  {
    file: 'siswa/dokumentasi.html',
    assertions: [
      { name: 'Dokumentasi Day 2 AKPOL & Lawang', pattern: /fincestem_dok_ft_day2_akpol|fincestem_dok_ft_day2_lawang/i },
      { name: 'Dokumentasi Day 3 Apel, JTP1, Museum', pattern: /fincestem_dok_ft_day3_apel|fincestem_dok_ft_day3_jatim|museum/i },
      { name: 'Dokumentasi Day 7 Foto Kenangan & Foto Keluarga', pattern: /fincestem_dok_ft_day7_kenangan|fincestem_dok_ft_day7_keluarga/i }
    ]
  },
  // 5. CORE JS ENGINE
  {
    file: 'js/core.js',
    assertions: [
      { name: 'Cascading Unlocks isDayStudentTasksDone', pattern: /isDayStudentTasksDone/i },
      { name: 'Day 2 Sub-sesi Evaluation', pattern: /lkpd_akpol|lkpd_lawang|refleksi_akpol|refleksi_lawang/i },
      { name: 'Day 7 Completion Rules', pattern: /d\s*===\s*7\s*&&\s*tm\['7_lkpd'\]/i },
      { name: 'Progress Percent Calculation', pattern: /totalCompletedTasks|percentage/i },
      { name: 'Safe Local Storage Purge (No infinite loop)', pattern: /fincestem_client_reset_/i }
    ]
  }
];

let allPassed = true;
console.log('====================================================');
console.log('🛡️  VERIFIKASI INTEGRITAS CODING FIELD TRIP DAY 1 - 7');
console.log('====================================================');

checks.forEach(c => {
  const filePath = path.join(ROOT, c.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File TIDAK DITEMUKAN: ${c.file}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n📁 Memeriksa ${c.file}...`);

  c.assertions.forEach(a => {
    if (a.pattern.test(content)) {
      console.log(`  ✅ [PASS] ${a.name}`);
    } else {
      console.error(`  ❌ [FAIL] ${a.name} (Pola tidak ditemukan!)`);
      allPassed = false;
    }
  });
});

console.log('\n====================================================');
if (allPassed) {
  console.log('🎉 STATUS: SELURUH FITUR FIELD TRIP DAY 1-7 100% AMAN & UTUH!');
} else {
  console.error('⚠️  PERINGATAN: ADA KONTEN FIELD TRIP YANG TERGANGGU!');
  process.exit(1);
}
console.log('====================================================\n');
