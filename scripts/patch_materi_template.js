// scripts/patch_materi_template.js
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'js', 'modules', 'materi-nonfieldtrip.js');
let code = fs.readFileSync(targetFile, 'utf8');

console.log('Target file length before:', code.length);

// Tambahkan window.loadDefaultNftSynthesis jika belum ada
const funcSynthesis = `  // Helper Memuat Rangkuman Intisari Otomatis ke Kartu Siswa
  window.loadDefaultNftSynthesis = function(dayNum, cardKey) {
    dayNum = parseInt(dayNum) || 1;
    const cfg = NFT_MATERI_CONFIG[dayNum] || NFT_MATERI_CONFIG[1];
    let targetCard = null;
    if ((dayNum === 3 || dayNum === 4) && cfg.sectors) {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      const curSec = (dayNum === 4) 
        ? (localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) || localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian')
        : (localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) || 'pertanian');
      const secObj = cfg.sectors[curSec] || cfg.sectors.pertanian;
      targetCard = (secObj && secObj.cards) ? secObj.cards.find(x => x.key === cardKey) : null;
    } else if (cfg.cards) {
      targetCard = cfg.cards.find(x => x.key === cardKey);
    }
    if (!targetCard) return;

    const txtEl = document.getElementById(\`nftD\${dayNum}Text\${cardKey}\`);
    const srcEl = document.getElementById(\`nftD\${dayNum}Source\${cardKey}\`);
    if (txtEl) {
      txtEl.value = targetCard.defaultExp || '';
    }
    if (srcEl && (!srcEl.value || srcEl.value.trim().length < 20)) {
      srcEl.value = targetCard.defaultSources || '';
    }
    if (typeof window.onNftCardInputUnified === 'function') {
      window.onNftCardInputUnified(dayNum, cardKey);
    }
    if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
      FincestemCore.ui.toast(\`Rangkuman materi resmi untuk Kartu \${cardKey} berhasil dimuat! Anda dapat menyempurnakannya.\`, 'success');
    }
  };
`;

if (!code.includes('window.loadDefaultNftSynthesis =')) {
  code = code.replace('// 3. ENGINE UNIVERSAL RENDER MODUL RISET NON-FIELD TRIP', funcSynthesis + '\n  // 3. ENGINE UNIVERSAL RENDER MODUL RISET NON-FIELD TRIP');
  console.log('BERHASIL menyematkan window.loadDefaultNftSynthesis.');
}

// Sekarang perbarui template perenderan kartu di dalam renderNonFieldTripDayModule
// Pola lama:
const oldCardBlock = `                <!-- Panduan Poin Riset dengan Penomoran Numbering Rapi Rata Kanan-Kiri -->
                <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">fact_check</span>
                    <span>Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
                  </span>
                  <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium text-justify">
                    \${c.guidedPoints.map(p => \`<li class="pl-1 text-justify leading-relaxed">\${p}</li>\`).join('')}
                  </ol>
                </div>

                <!-- Kolom Esai Analisis Siswa (Rata Kanan-Kiri) -->
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>`;

const newCardBlock = `                <!-- Pokok Silabus Resmi (Jika Didefinisikan) -->
                \${c.syllabusItems && c.syllabusItems.length > 0 ? \`
                  <div class="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200/90 text-xs text-teal-950 flex flex-col gap-1.5 shadow-2xs">
                    <span class="font-black text-teal-900 text-xs flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-teal-700">menu_book</span>
                      <span>Pokok Bahasan Silabus Resmi:</span>
                    </span>
                    <div class="space-y-1.5 text-xs text-slate-800 font-semibold leading-relaxed">
                      \${c.syllabusItems.map(item => \`<div class="whitespace-pre-line pl-1">\${item}</div>\`).join('')}
                    </div>
                  </div>
                \` : ''}

                <!-- Panduan Poin Riset dengan Penomoran Numbering Rapi Rata Kanan-Kiri -->
                <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1.5 shadow-2xs">
                  <span class="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-teal-700">fact_check</span>
                    <span>Poin Wajib yang Harus Anda Pahami &amp; Analisis:</span>
                  </span>
                  <ol class="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium text-justify">
                    \${c.guidedPoints.map(p => \`<li class="pl-1 text-justify leading-relaxed whitespace-pre-line">\${p}</li>\`).join('')}
                  </ol>
                </div>

                <!-- Bahan Bacaan & Rangkuman Materi Pembelajaran Lengkap (Jika Tersedia) -->
                \${c.studyMaterial ? \`
                  <div class="rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/40 via-white to-slate-50/70 shadow-2xs overflow-hidden">
                    <div class="p-3.5 bg-gradient-to-r from-teal-800/10 via-teal-700/5 to-transparent border-b border-teal-200/80 flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-teal-700 text-base">local_library</span>
                        <h4 class="font-black text-xs sm:text-sm text-teal-950">Bahan Bacaan &amp; Kajian Materi Pembelajaran Lengkap:</h4>
                      </div>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-700 text-white shrink-0">Bahan Ajar Resmi</span>
                    </div>
                    <div class="p-4 text-xs leading-relaxed text-slate-800 space-y-3 font-medium text-justify">
                      \${c.studyMaterial}
                    </div>
                  </div>
                \` : ''}

                <!-- Kolom Esai Analisis Siswa (Rata Kanan-Kiri) -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between gap-2">
                    <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
                    \${!isSubmitted ? \`
                      <button type="button" onclick="loadDefaultNftSynthesis(\${dayNum}, '\${k}')" class="px-2.5 py-1 rounded-xl text-[10.5px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                        <span class="material-symbols-outlined text-xs">auto_fix_high</span>
                        <span>Gunakan Rangkuman Intisari</span>
                      </button>
                    \` : ''}
                  </div>`;

if (code.includes(oldCardBlock)) {
  code = code.replace(oldCardBlock, newCardBlock);
  console.log('BERHASIL memperbarui template perenderan kartu.');
} else {
  console.log('PERINGATAN: Blok template lama tidak cocok secara persis. Memeriksa varian...');
  // Coba cari substring
  const idx = code.indexOf('<!-- Panduan Poin Riset dengan Penomoran');
  console.log('Index of guide block:', idx);
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log('File materi-nonfieldtrip.js updated successfully. Length now:', code.length);
