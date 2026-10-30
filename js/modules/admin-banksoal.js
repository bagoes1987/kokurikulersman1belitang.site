/**
 * FINCESTEM 2026 - Modul Admin: Bank Soal & Kunci Jawaban Asesmen
 * Khusus Peserta Non-Field Trip (Riset Mandiri di Wilayah Kabupaten OKU Timur)
 * Desain Ramping, Rapi, Profesional dengan Pagination 10, 20, 30, 40, 50
 * File Modular Terpisah - Bebas Konflik dengan Modul Lain
 * Versi: 20261029_nft_bs2_compact
 */

(function(window) {
  'use strict';

  let currentDay = 1;
  let currentIndicator = 'ALL';
  let currentCognitive = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  let pageSize = 10; // Default 10 soal per halaman agar tidak scroll panjang
  let expandAllExplanations = false;

  const INDICATOR_BADGES = {
    'A': {
      bg: 'bg-teal-50 text-teal-800 border-teal-200',
      badge: 'bg-teal-700 text-white',
      name: 'Indikator A • Kegiatan Ekonomi'
    },
    'B': {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'bg-emerald-700 text-white',
      name: 'Indikator B • Literasi Finansial'
    },
    'C': {
      bg: 'bg-sky-50 text-sky-800 border-sky-200',
      badge: 'bg-sky-700 text-white',
      name: 'Indikator C • Kebanksentralan & BI'
    },
    'D': {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      badge: 'bg-amber-700 text-white',
      name: 'Indikator D • Badan Usaha & Koperasi'
    },
    'E': {
      bg: 'bg-purple-50 text-purple-900 border-purple-200',
      badge: 'bg-purple-700 text-white',
      name: 'Indikator E • Potensi OKU Timur'
    }
  };

  function initAdminBankSoalView() {
    renderAdminBankSoalView();
  }

  function renderAdminBankSoalView() {
    const container = document.getElementById('panelAdminBanksoal');
    if (!container) return;

    const allQuestions = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(currentDay)) || [];
    const indicatorsList = (window.getNftBankSoalIndicators && window.getNftBankSoalIndicators(currentDay)) || [];

    // 1. Filter Data
    let filtered = allQuestions.slice();

    if (currentIndicator !== 'ALL') {
      filtered = filtered.filter(q => q.indicatorCode === currentIndicator);
    }

    if (currentCognitive !== 'ALL') {
      filtered = filtered.filter(q => q.cognitiveLevel === currentCognitive);
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

    // 2. Pagination Calculations
    const totalFiltered = filtered.length;
    const sizeNum = parseInt(pageSize, 10) || 10;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / sizeNum));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * sizeNum;
    const endIndex = Math.min(startIndex + sizeNum, totalFiltered);
    const paginated = filtered.slice(startIndex, endIndex);

    // 3. Render Component HTML
    container.innerHTML = `
      <!-- ======================================================== -->
      <!-- HEADER BANNER PROFESIONAL & RINGKAS                      -->
      <!-- ======================================================== -->
      <div class="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 rounded-2xl p-4 sm:p-5 text-white border border-teal-700/40 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs">
              <span class="material-symbols-outlined text-xs">school</span>
              <span>Khusus Non-Field Trip</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-white/10 text-teal-200 border border-white/10">
              Riset Mandiri Wilayah OKU Timur
            </span>
            <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-teal-800/80 text-teal-100 border border-teal-600/50">
              Day ${currentDay} • 200 Soal Pilihan Ganda
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="window.printBankSoalPdf()" class="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer border border-teal-500/40">
              <span class="material-symbols-outlined text-sm">print</span>
              <span>Cetak Kunci (PDF)</span>
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10 pt-2.5">
          <div>
            <h2 class="font-black text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
              <span class="material-symbols-outlined text-teal-400 text-xl">quiz</span>
              <span>Bank Soal Asesmen (Non-Field Trip)</span>
            </h2>
            <p class="text-[11.5px] text-teal-100/80 font-medium">
              Database butir soal, kunci jawaban resmi, dan sebaran 5 indikator. Setiap siswa mendapat 50 soal acak (waktu 60 menit).
            </p>
          </div>

          <!-- Quick Stats Pill -->
          <div class="flex items-center gap-2 text-xs shrink-0 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <div class="flex items-center gap-1">
              <span class="text-slate-400 text-[11px]">Bank:</span>
              <strong class="text-white">${allQuestions.length} Soal</strong>
            </div>
            <span class="text-white/20">•</span>
            <div class="flex items-center gap-1">
              <span class="text-slate-400 text-[11px]">Ujian:</span>
              <strong class="text-amber-300">50 Soal</strong>
            </div>
            <span class="text-white/20">•</span>
            <div class="flex items-center gap-1">
              <span class="text-slate-400 text-[11px]">Waktu:</span>
              <strong class="text-emerald-400">60 Menit</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PEMILIH PER DAY (DAY 1 S.D. DAY 7) - FORMAT RAMPING      -->
      <!-- ======================================================== -->
      <div class="bg-surface-container-lowest rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-between gap-2 flex-wrap">
        <div class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-teal-700 text-sm">calendar_month</span>
          <span class="text-xs font-black uppercase tracking-wider text-slate-700">Pilih Hari:</span>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${[1, 2, 3, 4, 5, 6, 7].map(d => {
            const isAct = (d === currentDay);
            const isReady = (d === 1 || d === 2);
            return `
              <button type="button" onclick="window.switchBankSoalDay(${d})" class="px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer ${
                isAct 
                  ? 'bg-teal-800 text-white shadow-2xs border border-teal-700' 
                  : (isReady 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                      : 'bg-slate-50 text-slate-400 border border-slate-200/60')
              }">
                <span>Day ${d}</span>
                ${isReady ? `<span class="w-1.5 h-1.5 rounded-full ${isAct ? 'bg-amber-400' : 'bg-emerald-500'}"></span>` : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- TOOLBAR KONTROL FILTER & SEARCHING (KOMPAK)             -->
      <!-- ======================================================== -->
      <div class="bg-surface-container-lowest rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex flex-col gap-2.5">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
          
          <!-- 1. Search Box -->
          <div class="sm:col-span-6 relative">
            <span class="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-lg">search</span>
            <input type="text" id="txtBankSoalSearch" value="${escapeHtml(searchQuery)}" oninput="window.onBankSoalSearchInput(this.value)" placeholder="Cari kata kunci (koperasi, padi, inflasi, QRIS, dsb)..." class="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none">
            ${searchQuery ? `
              <button type="button" onclick="window.clearBankSoalSearch()" class="absolute right-2 top-2 text-slate-400 hover:text-slate-600">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            ` : ''}
          </div>

          <!-- 2. Filter Indikator Dropdown -->
          <div class="sm:col-span-4">
            <select id="selBankSoalIndicator" onchange="window.filterBankSoalIndicator(this.value)" class="w-full p-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:border-teal-600 outline-none">
              <option value="ALL" ${currentIndicator === 'ALL' ? 'selected' : ''}>Semua Indikator (${allQuestions.length} Soal)</option>
              ${indicatorsList.map(ind => `
                <option value="${ind.code}" ${currentIndicator === ind.code ? 'selected' : ''}>${ind.code}: ${ind.name} (40)</option>
              `).join('')}
            </select>
          </div>

          <!-- 3. PILIHAN PAGINATION: 10, 20, 30, 40, 50 -->
          <div class="sm:col-span-2 flex items-center gap-1.5 justify-end">
            <span class="text-[11px] font-bold text-slate-500 whitespace-nowrap">Per Halaman:</span>
            <select id="selBankSoalPageSize" onchange="window.changeBankSoalPageSize(this.value)" class="p-1.5 rounded-xl border border-teal-600 bg-teal-50 text-xs font-extrabold text-teal-950 focus:ring-1 focus:ring-teal-600 outline-none cursor-pointer">
              <option value="10" ${sizeNum === 10 ? 'selected' : ''}>10 Soal</option>
              <option value="20" ${sizeNum === 20 ? 'selected' : ''}>20 Soal</option>
              <option value="30" ${sizeNum === 30 ? 'selected' : ''}>30 Soal</option>
              <option value="40" ${sizeNum === 40 ? 'selected' : ''}>40 Soal</option>
              <option value="50" ${sizeNum === 50 ? 'selected' : ''}>50 Soal</option>
            </select>
          </div>

        </div>

        <!-- QUICK FILTER CHIPS & TOGGLE PEMBAHASAN -->
        <div class="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap text-xs">
          <div class="flex items-center gap-1 flex-wrap">
            <span class="text-[10px] font-extrabold text-slate-400 uppercase mr-1">Indikator:</span>
            <button type="button" onclick="window.filterBankSoalIndicator('ALL')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentIndicator === 'ALL' ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">Semua</button>
            ${indicatorsList.map(ind => `
              <button type="button" onclick="window.filterBankSoalIndicator('${ind.code}')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentIndicator === ind.code ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${ind.code} (40)</button>
            `).join('')}
          </div>

          <div class="flex items-center gap-2">
            <button type="button" onclick="window.toggleAllExplanations()" class="px-2.5 py-1 rounded-lg text-[11px] font-extrabold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 cursor-pointer transition-all shadow-2xs">
              <span class="material-symbols-outlined text-xs text-amber-700">${expandAllExplanations ? 'visibility_off' : 'visibility'}</span>
              <span>${expandAllExplanations ? 'Tutup Semua Pembahasan' : 'Buka Semua Pembahasan'}</span>
            </button>
          </div>
        </div>

        <!-- BARIS KEDUA: FILTER LEVEL KOGNITIF (TAKSONOMI BLOOM) -->
        <div class="flex items-center gap-1 flex-wrap pt-1 border-t border-slate-100 text-xs">
          <span class="text-[10px] font-extrabold text-indigo-700 uppercase mr-1">Bloom:</span>
          <button type="button" onclick="window.filterBankSoalCognitive('ALL')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'ALL' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">Semua Level (${allQuestions.length})</button>
          <button type="button" onclick="window.filterBankSoalCognitive('C1')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'C1' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}">C1 Mengingat (${currentDay === 2 ? 40 : 50})</button>
          <button type="button" onclick="window.filterBankSoalCognitive('C2')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'C2' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}">C2 Memahami (${currentDay === 2 ? 40 : 50})</button>
          <button type="button" onclick="window.filterBankSoalCognitive('C3')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'C3' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}">C3 Menerapkan (${currentDay === 2 ? 40 : 50})</button>
          <button type="button" onclick="window.filterBankSoalCognitive('C4')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'C4' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}">C4 Menganalisis (${currentDay === 2 ? 40 : 50})</button>
          ${currentDay === 2 ? `
            <button type="button" onclick="window.filterBankSoalCognitive('C5')" class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentCognitive === 'C5' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'}">C5 Mengevaluasi (40)</button>
          ` : ''}
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PAGINATION BAR ATAS (NAVIGASI CEPAT TANPA SCROLL)       -->
      <!-- ======================================================== -->
      ${renderPaginationBar(currentPage, totalPages, totalFiltered, startIndex, endIndex, sizeNum, 'top')}

      <!-- ======================================================== -->
      <!-- DAFTAR KARTU BUTIR SOAL (DESAIN RAMPING & PROFESIONAL)  -->
      <!-- ======================================================== -->
      <div class="flex flex-col gap-3">
        ${paginated.length === 0 ? `
          <div class="bg-surface-container-lowest rounded-2xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center gap-2">
            <span class="material-symbols-outlined text-3xl text-slate-400">search_off</span>
            <h4 class="font-black text-sm text-slate-700">Tidak ada butir soal yang sesuai</h4>
            <p class="text-xs text-slate-500">Coba ubah kata kunci pencarian atau ganti filter indikator.</p>
            <button type="button" onclick="window.clearBankSoalFilters()" class="mt-1 px-3 py-1.5 rounded-xl bg-teal-800 text-white font-bold text-xs">Reset Seluruh Filter</button>
          </div>
        ` : paginated.map((q) => {
          const badgeCfg = INDICATOR_BADGES[q.indicatorCode] || { bg: 'bg-slate-100 text-slate-800 border-slate-300', badge: 'bg-slate-700 text-white', name: q.indicatorName };
          const formattedId = String(q.id).padStart(3, '0');

          return `
            <div class="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:border-teal-400 hover:shadow-xs transition-all flex flex-col gap-2.5">
              
              <!-- KOP SOAL: NOMOR, INDIKATOR, DAN KUNCI JAWABAN -->
              <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 flex-wrap">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-black text-xs shadow-2xs">
                    #${formattedId}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${badgeCfg.bg}">
                    ${badgeCfg.name} (No. ${q.numberInIndicator || q.id})
                  </span>
                  <span class="px-2 py-0.5 rounded-lg text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Bloom: ${q.cognitiveLevel || 'C2'}
                  </span>
                </div>

                <div class="flex items-center gap-1.5">
                  <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                    <span class="material-symbols-outlined text-xs">check_circle</span>
                    <span>Kunci: (${q.correct})</span>
                  </span>
                </div>
              </div>

              <!-- TEKS PERTANYAAN -->
              <div class="text-xs sm:text-[13px] text-slate-900 leading-relaxed font-semibold">
                ${escapeHtml(q.question)}
              </div>

              <!-- PILIHAN GANDA: FORMAT RAMPING DENGAN HIGHLIGHT KUNCI HIJAU -->
              <div class="grid grid-cols-1 gap-1.5 pt-0.5">
                ${q.options.map(opt => {
                  const isCorrect = (opt.key === q.correct);
                  return `
                    <div class="px-3 py-2 rounded-xl flex items-center justify-between gap-2.5 text-xs transition-all ${
                      isCorrect 
                        ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-black shadow-2xs' 
                        : 'bg-slate-50/70 border border-slate-200/80 text-slate-700 font-medium'
                    }">
                      <div class="flex items-start gap-2 min-w-0">
                        <span class="w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }">
                          ${opt.key}
                        </span>
                        <span class="leading-snug">${escapeHtml(opt.text)}</span>
                      </div>
                      ${isCorrect ? `
                        <span class="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shrink-0 flex items-center gap-0.5 shadow-2xs">
                          <span class="material-symbols-outlined text-[11px]">check</span>
                          <span>Kunci Benar</span>
                        </span>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- ACCORDION PEMBAHASAN / RASIONALISASI KUNCI -->
              ${q.explanation ? `
                <details ${expandAllExplanations ? 'open' : ''} class="group rounded-xl border border-amber-200/80 bg-amber-50/50 text-xs transition-all">
                  <summary class="px-3 py-1.5 font-bold text-amber-900 cursor-pointer flex items-center justify-between select-none hover:bg-amber-100/50 rounded-xl transition-all">
                    <span class="flex items-center gap-1.5 text-[11px]">
                      <span class="material-symbols-outlined text-xs text-amber-600">lightbulb</span>
                      <span>Pembahasan &amp; Rasionalisasi Kunci</span>
                    </span>
                    <span class="material-symbols-outlined text-sm text-amber-700 transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div class="px-3 pb-2.5 pt-1 text-[11.5px] font-medium text-slate-700 leading-relaxed border-t border-amber-100 mt-1">
                    ${escapeHtml(q.explanation)}
                  </div>
                </details>
              ` : ''}

            </div>
          `;
        }).join('')}
      </div>

      <!-- ======================================================== -->
      <!-- PAGINATION BAR BAWAH                                     -->
      <!-- ======================================================== -->
      ${renderPaginationBar(currentPage, totalPages, totalFiltered, startIndex, endIndex, sizeNum, 'bottom')}
    `;
  }

  // Komponen Pagination Terpadu (Atas & Bawah)
  function renderPaginationBar(current, total, totalRecords, start, end, size, position) {
    if (totalRecords === 0) return '';

    const pages = getPaginationPageNumbers(current, total);

    return `
      <div class="bg-surface-container-lowest rounded-2xl px-3.5 py-2.5 border border-slate-200/90 shadow-2xs flex items-center justify-between flex-wrap gap-2 text-xs">
        
        <!-- Status Info Data -->
        <div class="flex items-center gap-1 text-slate-600 font-semibold text-[11.5px]">
          <span>Menampilkan <strong>${start + 1} - ${end}</strong> dari <strong>${totalRecords}</strong> Soal</span>
          <span class="text-slate-300">|</span>
          <span class="text-teal-800 font-bold">Halaman ${current} dari ${total}</span>
        </div>

        <!-- Tombol Nomor Halaman & Navigasi -->
        <div class="flex items-center gap-1">
          <!-- Tombol Pertama & Prev -->
          <button type="button" onclick="window.changeBankSoalPage(1)" ${current <= 1 ? 'disabled class="w-7 h-7 rounded-lg bg-slate-100 text-slate-300 cursor-not-allowed flex items-center justify-center"' : 'class="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shadow-2xs cursor-pointer"'} title="Halaman Pertama">
            <span class="material-symbols-outlined text-sm">first_page</span>
          </button>
          <button type="button" onclick="window.changeBankSoalPage(${current - 1})" ${current <= 1 ? 'disabled class="w-7 h-7 rounded-lg bg-slate-100 text-slate-300 cursor-not-allowed flex items-center justify-center"' : 'class="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shadow-2xs cursor-pointer"'} title="Sebelumnya">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <!-- Nomor Halaman -->
          <div class="flex items-center gap-1">
            ${pages.map(p => {
              if (p === '...') {
                return `<span class="w-7 h-7 flex items-center justify-center text-slate-400 font-bold text-xs">...</span>`;
              }
              const isCurrent = (p === current);
              return `
                <button type="button" onclick="window.changeBankSoalPage(${p})" class="w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-teal-800 text-white shadow-2xs' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-2xs'
                }">
                  ${p}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Tombol Next & Terakhir -->
          <button type="button" onclick="window.changeBankSoalPage(${current + 1})" ${current >= total ? 'disabled class="w-7 h-7 rounded-lg bg-slate-100 text-slate-300 cursor-not-allowed flex items-center justify-center"' : 'class="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shadow-2xs cursor-pointer"'} title="Berikutnya">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          <button type="button" onclick="window.changeBankSoalPage(${total})" ${current >= total ? 'disabled class="w-7 h-7 rounded-lg bg-slate-100 text-slate-300 cursor-not-allowed flex items-center justify-center"' : 'class="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center shadow-2xs cursor-pointer"'} title="Halaman Terakhir">
            <span class="material-symbols-outlined text-sm">last_page</span>
          </button>
        </div>

      </div>
    `;
  }

  // Hitung nomor halaman dinamis
  function getPaginationPageNumbers(current, total) {
    if (total <= 7) {
      const arr = [];
      for (let i = 1; i <= total; i++) arr.push(i);
      return arr;
    }
    const pages = [];
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (current < total - 2) pages.push('...');
    if (!pages.includes(total)) pages.push(total);
    return pages;
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

  // Handler Event Global Window
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

  window.filterBankSoalCognitive = function(lvl) {
    currentCognitive = lvl || 'ALL';
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
    currentCognitive = 'ALL';
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.changeBankSoalPageSize = function(size) {
    pageSize = parseInt(size, 10) || 10;
    currentPage = 1;
    renderAdminBankSoalView();
  };

  window.changeBankSoalPage = function(page) {
    currentPage = parseInt(page, 10) || 1;
    renderAdminBankSoalView();
    const panel = document.getElementById('panelAdminBanksoal');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.toggleAllExplanations = function() {
    expandAllExplanations = !expandAllExplanations;
    renderAdminBankSoalView();
  };

  // Cetak / Ekspor PDF Ringkasan Kunci Jawaban
  window.printBankSoalPdf = function() {
    const allQuestions = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(currentDay)) || [];
    const indicatorsList = (window.getNftBankSoalIndicators && window.getNftBankSoalIndicators(currentDay)) || [];
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
          <p><strong>DAY ${currentDay}: ${currentDay === 2 ? 'Budaya, Sistem Mata Pencaharian &amp; Modernisasi Teknologi Pertanian OKU Timur' : 'Fondasi Ekonomi, Literasi Finansial &amp; Pemetaan Potensi OKU Timur'}</strong></p>
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
