/**
 * FINCESTEM 2026 - Modul Admin: Bank Soal & Kunci Jawaban Asesmen
 * Khusus Peserta Non-Field Trip (Riset Mandiri di Wilayah Kabupaten OKU Timur)
 * File Modular Terpisah - Bebas Konflik dengan Modul Lain
 * Versi: 20261029_nft_bs1
 */

(function(window) {
  'use strict';

  let currentDay = 1;
  let currentIndicator = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  let pageSize = 25; // 25 soal per halaman agar ringan

  const INDICATOR_BADGES = {
    'A': {
      bg: 'bg-teal-100 text-teal-900 border-teal-300',
      tag: 'Indikator A • Kegiatan Ekonomi'
    },
    'B': {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      tag: 'Indikator B • Literasi Finansial'
    },
    'C': {
      bg: 'bg-sky-100 text-sky-900 border-sky-300',
      tag: 'Indikator C • Kebanksentralan & BI'
    },
    'D': {
      bg: 'bg-amber-100 text-amber-950 border-amber-300',
      tag: 'Indikator D • Badan Usaha & Koperasi'
    },
    'E': {
      bg: 'bg-purple-100 text-purple-950 border-purple-300',
      tag: 'Indikator E • Potensi OKU Timur'
    }
  };

  function initAdminBankSoalView() {
    renderAdminBankSoalView();
  }

  function renderAdminBankSoalView() {
    const container = document.getElementById('panelAdminBanksoal');
    if (!container) return;

    const allQuestions = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(currentDay)) || [];
    const indicators = (window.getNftBankSoalIndicators && window.getNftBankSoalIndicators()) || [];

    // Filter data
    let filtered = allQuestions.slice();

    if (currentIndicator !== 'ALL') {
      filtered = filtered.filter(q => q.indicatorCode === currentIndicator);
    }

    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(q => {
        return (
          q.question.toLowerCase().includes(qLower) ||
          q.indicatorName.toLowerCase().includes(qLower) ||
          (q.explanation && q.explanation.toLowerCase().includes(qLower)) ||
          q.options.some(opt => opt.text.toLowerCase().includes(qLower))
        );
      });
    }

    // Pagination
    const totalFiltered = filtered.length;
    let paginated = filtered;
    let totalPages = 1;

    if (pageSize !== 'ALL') {
      const sizeNum = parseInt(pageSize, 10) || 25;
      totalPages = Math.ceil(totalFiltered / sizeNum) || 1;
      if (currentPage > totalPages) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIndex = (currentPage - 1) * sizeNum;
      paginated = filtered.slice(startIndex, startIndex + sizeNum);
    }

    // Render HTML
    container.innerHTML = `
      <!-- 1. HEADER BANNER UTAMA: BANK SOAL ASESMEN (NON-FIELD TRIP) -->
      <div class="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white border border-teal-700/50 shadow-md flex flex-col gap-3.5">
        <div class="flex items-center justify-between flex-wrap gap-2.5">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
              <span class="material-symbols-outlined text-sm">school</span>
              <span>Khusus Non-Field Trip</span>
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-teal-200 border border-white/15">
              Riset Mandiri Wilayah OKU Timur
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="window.printBankSoalPdf()" class="px-3.5 py-2 rounded-xl bg-teal-700/80 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer border border-teal-500/50">
              <span class="material-symbols-outlined text-base">print</span>
              <span>Cetak / Ekspor Kunci</span>
            </button>
          </div>
        </div>

        <div>
          <h2 class="font-black text-lg sm:text-2xl text-white tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-2xl text-teal-400">quiz</span>
            <span>Bank Soal Asesmen (Non-Field Trip)</span>
          </h2>
          <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
            Database butir soal pilihan ganda, kunci jawaban resmi terverifikasi, dan sebaran 5 indikator kurikulum FINCESTEM. Soal diacak 50 butir per siswa dengan durasi 60 menit.
          </p>
        </div>

        <!-- STATS BARIS RINGKAS -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
          <div class="p-3 rounded-2xl bg-white/10 flex flex-col">
            <span class="text-teal-200 text-[10.5px] font-medium">Total Bank Soal Day ${currentDay}</span>
            <span class="font-black text-sm sm:text-base text-white">${allQuestions.length} Soal PG</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/10 flex flex-col">
            <span class="text-teal-200 text-[10.5px] font-medium">Diacak per Siswa</span>
            <span class="font-black text-sm sm:text-base text-amber-300">50 Soal Berimbang</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/10 flex flex-col">
            <span class="text-teal-200 text-[10.5px] font-medium">Durasi Ujian Siswa</span>
            <span class="font-black text-sm sm:text-base text-white">60 Menit (72 dtk/soal)</span>
          </div>
          <div class="p-3 rounded-2xl bg-white/10 flex flex-col">
            <span class="text-teal-200 text-[10.5px] font-medium">Proteksi Keamanan</span>
            <span class="font-black text-sm sm:text-base text-emerald-400">Exam Shield Aktif</span>
          </div>
        </div>
      </div>

      <!-- 2. PEMILIH TAB PER DAY (DAY 1 S.D. DAY 7) -->
      <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-base text-teal-700">calendar_view_day</span>
            <span>Pilih Hari Asesmen (Per Day):</span>
          </span>
          <span class="text-[11px] text-slate-500 font-medium">Klik tombol Day untuk melihat bank soal masing-masing hari</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          ${[1, 2, 3, 4, 5, 6, 7].map(d => {
            const isAct = (d === currentDay);
            const count = (d === 1) ? 200 : 0;
            const subtitle = (d === 1) ? '200 Soal Siap' : 'Persiapan';
            return `
              <button type="button" onclick="window.switchBankSoalDay(${d})" class="p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isAct 
                  ? 'bg-teal-800 text-white font-black shadow-md border-2 border-teal-600' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 font-bold'
              }">
                <span class="text-xs sm:text-sm">Day ${d}</span>
                <span class="text-[10px] ${isAct ? 'text-amber-300 font-extrabold' : 'text-slate-400'}">${subtitle}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 3. FILTER INDIKATOR & KOTAK PENCARIAN LIVE -->
      <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <!-- Filter Indikator Materi -->
          <div class="md:col-span-5 flex flex-col gap-1">
            <label class="text-xs font-bold text-slate-700">Filter Indikator Materi:</label>
            <select id="selBankSoalIndicator" onchange="window.filterBankSoalIndicator(this.value)" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none">
              <option value="ALL" ${currentIndicator === 'ALL' ? 'selected' : ''}>Semua Indikator (Total 200 Soal)</option>
              <option value="A" ${currentIndicator === 'A' ? 'selected' : ''}>Indikator A: Kegiatan Ekonomi (40 Soal)</option>
              <option value="B" ${currentIndicator === 'B' ? 'selected' : ''}>Indikator B: Literasi Finansial (40 Soal)</option>
              <option value="C" ${currentIndicator === 'C' ? 'selected' : ''}>Indikator C: Kebanksentralan &amp; BI (40 Soal)</option>
              <option value="D" ${currentIndicator === 'D' ? 'selected' : ''}>Indikator D: Badan Usaha &amp; Koperasi (40 Soal)</option>
              <option value="E" ${currentIndicator === 'E' ? 'selected' : ''}>Indikator E: Potensi Sektor OKU Timur (40 Soal)</option>
            </select>
          </div>

          <!-- Live Search Box -->
          <div class="md:col-span-5 flex flex-col gap-1">
            <label class="text-xs font-bold text-slate-700">Cari Kata Kunci / Pertanyaan:</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
              <input type="text" id="txtBankSoalSearch" value="${escapeHtml(searchQuery)}" oninput="window.onBankSoalSearchInput(this.value)" placeholder="Ketik kata kunci (misal: koperasi, padi, inflasi, QRIS)..." class="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none transition-all">
              ${searchQuery ? `
                <button type="button" onclick="window.clearBankSoalSearch()" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs">
                  <span class="material-symbols-outlined text-base">close</span>
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Tampilan per Halaman -->
          <div class="md:col-span-2 flex flex-col gap-1">
            <label class="text-xs font-bold text-slate-700">Tampilan:</label>
            <select id="selBankSoalPageSize" onchange="window.changeBankSoalPageSize(this.value)" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:border-teal-600 outline-none">
              <option value="25" ${pageSize == 25 ? 'selected' : ''}>25 Soal / Hal</option>
              <option value="50" ${pageSize == 50 ? 'selected' : ''}>50 Soal / Hal</option>
              <option value="ALL" ${pageSize === 'ALL' ? 'selected' : ''}>Tampilkan Semua</option>
            </select>
          </div>

        </div>

        <!-- INDIKATOR CHIPS (QUICK FILTER) -->
        <div class="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 text-[11px]">
          <span class="font-bold text-slate-400 text-[10px] uppercase">Pintas Indikator:</span>
          <button type="button" onclick="window.filterBankSoalIndicator('ALL')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'ALL' ? 'bg-teal-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">Semua (200)</button>
          <button type="button" onclick="window.filterBankSoalIndicator('A')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'A' ? 'bg-teal-700 text-white' : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200'}">A: Kegiatan Ekonomi (40)</button>
          <button type="button" onclick="window.filterBankSoalIndicator('B')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'B' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'}">B: Literasi Finansial (40)</button>
          <button type="button" onclick="window.filterBankSoalIndicator('C')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'C' ? 'bg-sky-700 text-white' : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200'}">C: Bank Sentral &amp; BI (40)</button>
          <button type="button" onclick="window.filterBankSoalIndicator('D')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'D' ? 'bg-amber-700 text-white' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'}">D: Badan Usaha &amp; Koperasi (40)</button>
          <button type="button" onclick="window.filterBankSoalIndicator('E')" class="px-2.5 py-1 rounded-lg font-bold transition-all ${currentIndicator === 'E' ? 'bg-purple-700 text-white' : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'}">E: Potensi OKU Timur (40)</button>
        </div>
      </div>

      <!-- 4. BAR STATUS HASIL PENCARIAN & PAGINATION ATAS -->
      <div class="flex items-center justify-between flex-wrap gap-2 px-1 text-xs text-slate-600 font-semibold">
        <div class="flex items-center gap-1.5">
          <span>Menampilkan <strong>${paginated.length}</strong> dari <strong>${totalFiltered}</strong> butir soal</span>
          ${searchQuery ? `<span class="text-teal-700 font-bold">(Pencarian: "${escapeHtml(searchQuery)}")</span>` : ''}
          ${currentIndicator !== 'ALL' ? `<span class="text-amber-800 font-bold">(Indikator ${currentIndicator})</span>` : ''}
        </div>

        ${pageSize !== 'ALL' && totalPages > 1 ? `
          <div class="flex items-center gap-1">
            <button type="button" onclick="window.changeBankSoalPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed text-xs"' : 'class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer shadow-2xs"'}>
              &larr; Prev
            </button>
            <span class="px-2 text-xs font-bold text-slate-700">Hal ${currentPage} / ${totalPages}</span>
            <button type="button" onclick="window.changeBankSoalPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed text-xs"' : 'class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer shadow-2xs"'}>
              Next &rarr;
            </button>
          </div>
        ` : ''}
      </div>

      <!-- 5. DAFTAR KARTU BUTIR SOAL & KUNCI JAWABAN -->
      <div class="flex flex-col gap-4">
        ${paginated.length === 0 ? `
          <div class="bg-surface-container-lowest rounded-3xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center gap-2">
            <span class="material-symbols-outlined text-4xl text-slate-400">search_off</span>
            <h4 class="font-black text-sm text-slate-700">Tidak ada butir soal yang sesuai</h4>
            <p class="text-xs text-slate-500">Coba ubah kata kunci pencarian atau ganti filter indikator materi.</p>
            <button type="button" onclick="window.clearBankSoalFilters()" class="mt-2 px-4 py-2 rounded-xl bg-teal-800 text-white font-bold text-xs">Reset Seluruh Filter</button>
          </div>
        ` : paginated.map((q) => {
          const badgeCfg = INDICATOR_BADGES[q.indicatorCode] || { bg: 'bg-slate-100 text-slate-800 border-slate-300', tag: q.indicatorName };
          const formattedId = String(q.id).padStart(3, '0');

          return `
            <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all flex flex-col gap-3.5">
              
              <!-- KOP KARTU SOAL: NOMOR, INDIKATOR, KUNCI BADGE -->
              <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <span class="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    #${formattedId}
                  </span>
                  <span class="px-2.5 py-1 rounded-xl text-[11px] font-extrabold border ${badgeCfg.bg}">
                    ${badgeCfg.tag} (No. ${q.numberInIndicator || q.id})
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                    <span class="material-symbols-outlined text-xs">verified</span>
                    <span>Kunci Resmi: Opsi (${q.correct})</span>
                  </span>
                </div>
              </div>

              <!-- TEKS PERTANYAAN -->
              <div class="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                ${escapeHtml(q.question)}
              </div>

              <!-- PILIHAN GANDA (A, B, C, D, E) DENGAN HIGHLIGHT HIJAU PADA KUNCI -->
              <div class="flex flex-col gap-2 pt-1">
                ${q.options.map(opt => {
                  const isCorrect = (opt.key === q.correct);
                  return `
                    <div class="p-3 rounded-2xl flex items-center justify-between gap-3 text-xs transition-all ${
                      isCorrect 
                        ? 'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 font-black shadow-xs' 
                        : 'bg-slate-50/80 border border-slate-200 text-slate-700 font-medium'
                    }">
                      <div class="flex items-start gap-2.5 min-w-0">
                        <span class="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }">
                          ${opt.key}
                        </span>
                        <span class="leading-snug pt-0.5">${escapeHtml(opt.text)}</span>
                      </div>
                      ${isCorrect ? `
                        <span class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10.5px] font-black shrink-0 flex items-center gap-1 shadow-2xs">
                          <span class="material-symbols-outlined text-xs">check</span>
                          <span>Kunci Jawaban</span>
                        </span>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- PEMBAHASAN / RASIONALISASI JAWABAN -->
              ${q.explanation ? `
                <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
                  <span class="material-symbols-outlined text-base text-amber-700 shrink-0 mt-0.5">lightbulb</span>
                  <div class="flex flex-col gap-0.5">
                    <span class="font-extrabold text-[11px] uppercase tracking-wider text-amber-900">Pembahasan &amp; Rasionalisasi Kunci:</span>
                    <p class="font-medium text-slate-700">${escapeHtml(q.explanation)}</p>
                  </div>
                </div>
              ` : ''}

            </div>
          `;
        }).join('')}
      </div>

      <!-- 6. PAGINATION BAWAH -->
      ${pageSize !== 'ALL' && totalPages > 1 ? `
        <div class="flex items-center justify-center gap-2 pt-4 pb-8">
          <button type="button" onclick="window.changeBankSoalPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled class="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed font-bold text-xs"' : 'class="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer shadow-xs"'}>
            &larr; Halaman Sebelumnya
          </button>
          <span class="px-3 text-xs font-black text-slate-700">Halaman ${currentPage} dari ${totalPages}</span>
          <button type="button" onclick="window.changeBankSoalPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled class="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed font-bold text-xs"' : 'class="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer shadow-xs"'}>
            Halaman Berikutnya &rarr;
          </button>
        </div>
      ` : ''}
    `;
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Interaktivitas UI
  window.switchBankSoalDay = function(dayNum) {
    currentDay = parseInt(dayNum) || 1;
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.filterBankSoalIndicator = function(code) {
    currentIndicator = code || 'ALL';
    currentPage = 1;
    renderAdminBankSoalView();
  };

  let searchDebounceTimer = null;
  window.onBankSoalSearchInput = function(val) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      searchQuery = val || '';
      currentPage = 1;
      renderAdminBankSoalView();
      const inputEl = document.getElementById('txtBankSoalSearch');
      if (inputEl) {
        inputEl.focus();
        inputEl.selectionStart = inputEl.selectionEnd = inputEl.value.length;
      }
    }, 200);
  };

  window.clearBankSoalSearch = function() {
    searchQuery = '';
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.clearBankSoalFilters = function() {
    searchQuery = '';
    currentIndicator = 'ALL';
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.changeBankSoalPageSize = function(size) {
    pageSize = (size === 'ALL') ? 'ALL' : parseInt(size, 10);
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.changeBankSoalPage = function(page) {
    currentPage = page;
    renderAdminBankSoalView();
    const panel = document.getElementById('panelAdminBanksoal');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Cetak / Ekspor PDF Ringkasan Kunci Jawaban
  window.printBankSoalPdf = function() {
    const allQuestions = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(currentDay)) || [];
    if (!allQuestions.length) {
      alert('Belum ada data butir soal untuk Day ini.');
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Gagal membuka jendela cetak. Pastikan pop-up diizinkan.');
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Bank Soal & Kunci Jawaban Asesmen Day ${currentDay} Non-Field Trip</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #111; padding: 20px; }
          .kop { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
          .kop h2 { margin: 0; font-size: 14pt; }
          .kop p { margin: 3px 0 0; font-size: 10pt; color: #444; }
          .meta { font-size: 9.5pt; margin-bottom: 15px; background: #f4f4f4; padding: 8px 12px; border-radius: 6px; }
          .item-soal { margin-bottom: 16px; page-break-inside: avoid; border-bottom: 1px dashed #ccc; padding-bottom: 12px; }
          .q-text { font-weight: bold; margin-bottom: 6px; }
          .opt-list { margin-left: 18px; margin-bottom: 6px; }
          .opt-item { margin-bottom: 2px; }
          .opt-item.correct { font-weight: bold; color: #007a3d; }
          .key-badge { display: inline-block; background: #007a3d; color: #fff; padding: 1px 6px; border-radius: 4px; font-size: 8pt; margin-left: 6px; }
          .explanation { font-size: 9pt; background: #fffde7; padding: 5px 8px; border-left: 3px solid #fbc02d; margin-top: 4px; color: #444; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 15px;">
          <button onclick="window.print()" style="padding: 8px 16px; background: #006a61; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Cetak Dokumen (Print / Save PDF)</button>
        </div>
        <div class="kop">
          <h2>KOKURIKULER FINCESTEM 2026 - SMAN 1 BELITANG</h2>
          <p>DOKUMEN RESMI BANK SOAL &amp; KUNCI JAWABAN ASESMEN (NON-FIELD TRIP)</p>
          <p><strong>DAY ${currentDay}: Fondasi Ekonomi, Literasi Finansial &amp; Pemetaan Potensi OKU Timur</strong></p>
        </div>
        <div class="meta">
          <strong>Total Soal:</strong> ${allQuestions.length} Butir PG &bull; 
          <strong>Diacak per Siswa:</strong> 50 Butir &bull; 
          <strong>Waktu:</strong> 60 Menit &bull; 
          <strong>Target:</strong> Khusus Peserta Non-Field Trip (Riset Mandiri)
        </div>
        <div>
          ${allQuestions.map((q, idx) => `
            <div class="item-soal">
              <div class="q-text">
                No. ${idx + 1}. [${q.indicatorName}] ${q.question}
              </div>
              <div class="opt-list">
                ${q.options.map(opt => `
                  <div class="opt-item ${opt.key === q.correct ? 'correct' : ''}">
                    (${opt.key}) ${opt.text}
                    ${opt.key === q.correct ? '<span class="key-badge">✓ KUNCI</span>' : ''}
                  </div>
                `).join('')}
              </div>
              ${q.explanation ? `<div class="explanation"><strong>Pembahasan:</strong> ${q.explanation}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
  };

  window.initAdminBankSoalView = initAdminBankSoalView;
  window.renderAdminBankSoalView = renderAdminBankSoalView;

})(window);
