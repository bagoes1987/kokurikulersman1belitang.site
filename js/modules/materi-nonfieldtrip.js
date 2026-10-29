/**
 * FINCESTEM 2026 - Modul Belajar Digital Khusus Peserta Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur (Day 1 s.d. Day 7)
 * File Terpisah (Modular Isolation) - Bebas Konflik dengan Modul Field Trip
 * Versi: 20261028_nft_v1
 */

(function(window) {
  'use strict';

  // 1. HELPER ANTI-SPAM & VALIDASI KARAKTER ILMIAH
  function validateScientificContent(text, minChars) {
    if (!text || typeof text !== 'string') return { valid: false, count: 0, reason: 'Teks masih kosong' };
    const trimmed = text.trim();
    const count = trimmed.length;

    if (count < minChars) {
      return { valid: false, count: count, reason: `Kurang ${minChars - count} karakter (Minimal ${minChars} karakter)` };
    }

    // Deteksi huruf berulang (spam seperti aaaaaa / zzzzzz)
    if (/(.)\1{6,}/i.test(trimmed)) {
      return { valid: false, count: count, reason: 'Terdeteksi karakter berulang (spam). Tuliskan kalimat ilmiah yang wajar.' };
    }

    // Deteksi keragaman kata (minimal 12 kata unik untuk tulisan ilmiah)
    const words = trimmed.toLowerCase().match(/\b[a-z0-9\-]{2,}\b/gi) || [];
    const uniqueWords = new Set(words);
    if (uniqueWords.size < 12) {
      return { valid: false, count: count, reason: 'Keragaman kata terlalu sedikit. Uraikan analisis Anda lebih mendalam.' };
    }

    return { valid: true, count: count, reason: 'Memenuhi syarat' };
  }

  function validateSourceCitation(source, minChars) {
    if (!source || typeof source !== 'string') return { valid: false, count: 0, sourcesCount: 0, reason: 'Sumber rujukan belum diisi' };
    const trimmed = source.trim();
    const count = trimmed.length;
    if (count < minChars) {
      return { valid: false, count: count, sourcesCount: 0, reason: `Kurang ${minChars - count} karakter (Cantumkan judul referensi, pengarang/penerbit, hal, atau URL resmi)` };
    }

    // Hitung estimasi jumlah rujukan jika siswa menginput lebih dari 1 sumber
    // Siswa bisa memisahkan dengan baris baru, titik koma (;), atau penomoran (1., 2., dst)
    const rawItems = trimmed.split(/(?:\r?\n|;|\b\d+[\.\)]\s+)/);
    const validItems = rawItems
      .map(s => s.trim())
      .filter(s => s.length >= 8); // Syarat per rujukan minimal 8 karakter agar terhitung sebagai entri valid

    const sourcesCount = Math.max(1, validItems.length);

    if (sourcesCount > 1) {
      return { valid: true, count: count, sourcesCount: sourcesCount, reason: `✓ ${sourcesCount} Sumber rujukan terverifikasi` };
    }
    return { valid: true, count: count, sourcesCount: 1, reason: '✓ Sumber rujukan valid' };
  }

  // Helper untuk menambah nomor rujukan otomatis (+ Tambah Rujukan Lain)
  window.appendNextSource = function(key) {
    const srcEl = document.getElementById('nftSource' + key);
    if (!srcEl) return;
    const currentVal = srcEl.value;
    const trimmed = currentVal.trim();

    if (!trimmed) {
      srcEl.value = '1. ';
    } else {
      // Cari nomor terakhir jika teks sudah memiliki format 1., 2., dst
      const matches = trimmed.match(/(?:^|\n)\s*(\d+)[\.\)]/g);
      let nextNum = 2;
      if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const numPart = parseInt(lastMatch.replace(/\D/g, ''), 10);
        if (!isNaN(numPart)) nextNum = numPart + 1;
        srcEl.value = trimmed + '\n' + nextNum + '. ';
      } else {
        // Jika belum ada penomoran, ubah baris pertama jadi 1. dan tambah baris 2.
        if (!trimmed.startsWith('1.')) {
          srcEl.value = '1. ' + trimmed + '\n2. ';
        } else {
          srcEl.value = trimmed + '\n2. ';
        }
      }
    }

    srcEl.focus();
    srcEl.setSelectionRange(srcEl.value.length, srcEl.value.length);
    if (typeof window.onNftCardInput === 'function') {
      window.onNftCardInput(key);
    }
  };

  // 2. RENDER MODUL BELAJAR DAY 1 NON-FIELD TRIP (5 RESEARCH CARDS)
  function renderDay1NonFieldTripModule(container) {
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Cek apakah data Day 1 sudah pernah dikirim resmi sebelumnya
    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem('fincestem_materi_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_materi_day1_' + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    // Cek auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_materi_d1_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt));
    const dataA = (savedOfficial && savedOfficial.cardA) || draft.cardA || { text: '', source: '' };
    const dataB = (savedOfficial && savedOfficial.cardB) || draft.cardB || { text: '', source: '' };
    const dataC = (savedOfficial && savedOfficial.cardC) || draft.cardC || { text: '', source: '' };
    const dataD = (savedOfficial && savedOfficial.cardD) || draft.cardD || { text: '', source: '' };
    const dataE = (savedOfficial && savedOfficial.cardE) || draft.cardE || { text: '', source: '' };

    container.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-8">
        
        <!-- HEADER IDENTITAS MODUL DAY 1 NON-FIELD TRIP -->
        <div class="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-teal-700/40">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Non-Field Trip • Day 1</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                Pilar Financial &amp; Economics
              </span>
            </div>
            <span id="badgeNftD1Status" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Riset Terkirim Resmi' : 'Sedang Bekerja (Mandiri)'}
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Modul Riset Day 1: Fondasi Ekonomi, Literasi Finansial &amp; Pemetaan Potensi OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian, serta Identifikasi Komoditas Unggulan Daerah
            </p>
          </div>

          <!-- KARTU DATA SISWA & PEMBINA -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Nama Peneliti</span>
              <span class="font-extrabold truncate text-white">${studentName}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white">${studentNisn}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Rombel Terdaftar</span>
              <span class="font-extrabold truncate text-white">${studentClass}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Fasilitator Pembina</span>
              <span class="font-extrabold truncate text-white">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- PETUNJUK KERJA AKADEMIK (ATURAN KETAT) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-300/80 text-amber-950 flex flex-col gap-2 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
            <span class="material-symbols-outlined text-amber-700 text-lg">psychology</span>
            <span>PETUNJUK RISET MANDIRI (INQUIRY-BASED LEARNING):</span>
          </div>
          <p class="text-xs leading-relaxed text-amber-950/90">
            Sebagai peserta <strong>Non-Field Trip</strong>, Anda tidak disajikan teks siap saji melainkan <strong>diwajibkan meneliti dan mencari materi sendiri</strong> dari buku paket ekonomi, jurnal, modul perpustakaan, maupun situs rujukan kredibel (Bank Indonesia, BPS OKU Timur, Pemkab).
          </p>
          <ul class="text-[11.5px] text-amber-950/90 space-y-1 list-disc list-inside font-medium pt-1">
            <li>Tuntaskan <strong>5 Kartu Riset (A, B, C, D, E)</strong> dengan analisis kritis dan kalimat orisinal Anda sendiri.</li>
            <li>Setiap kartu wajib memenuhi <strong>minimal 300 karakter analisis mendalam</strong> (anti-copy paste asal-asalan).</li>
            <li>Wajib mencantumkan <strong>Sumber Rujukan Valid (minimal 20 karakter)</strong> pada setiap kartu yang Anda kerjakan.</li>
            <li>Tombol simpan dan kirim ke Fasilitator baru akan terbuka setelah <strong>kelima kartu berstatus hijau (100% lengkap)</strong>.</li>
          </ul>
        </div>

        <!-- PROGRESS BAR INDIKATOR DAY 1 -->
        <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-700 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-teal-600">checklist</span>
              <span>Progres Kelengkapan 5 Kartu Riset:</span>
            </span>
            <span id="lblNftD1ProgressCount" class="font-black text-teal-800">0 / 5 Kartu Terpenuhi</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div id="barNftD1Progress" class="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- 5 RESEARCH CARDS (A, B, C, D, E)                         -->
        <!-- ======================================================== -->
        <form id="formNftDay1Cards" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          
          <!-- KARTU A: KEGIATAN EKONOMI -->
          <div id="cardBoxA" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">A</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kegiatan Ekonomi &amp; 3 Sektor Aktivitas</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Produksi, Distribusi, Konsumsi &amp; Klasifikasi Sektor</span>
                </div>
              </div>
              <span id="badgeCardStatusA" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Panduan Poin Riset -->
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian hakiki kegiatan ekonomi manusia dalam memenuhi kebutuhan hidup.</li>
                <li>Perbedaan serta keterkaitan erat antara proses Produksi, Distribusi, dan Konsumsi.</li>
                <li>Pengertian dan contoh nyata <strong>Sektor Primer</strong> (ekstraktif/alam), <strong>Sektor Sekunder</strong> (industri olahan), dan <strong>Sektor Tersier</strong> (jasa).</li>
              </ol>
            </div>

            <!-- Kolom Esai Analisis Siswa -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftTextA" rows="6" oninput="onNftCardInput('A')" placeholder="Tuliskan hasil kajian mandiri Anda mengenai pengertian kegiatan ekonomi, alur produksi-distribusi-konsumsi, serta pembagian sektor primer, sekunder, dan tersier secara terperinci... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataA.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationA" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterA" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan) -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSource('A')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftSourceA" rows="2" oninput="onNftCardInput('A')" placeholder="Contoh rujukan (Bisa 1 atau lebih):&#10;1. Buku Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28&#10;2. Modul Pengantar Teori Ekonomi Mikro (Kemendikbud)" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataA.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceA" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU B: LITERASI & PENGELOLAAN KEUANGAN -->
          <div id="cardBoxB" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">B</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Literasi dan Pengelolaan Keuangan (Financial Literacy)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Jenis-Jenis Finansial &amp; 5 Pilar Manajemen Arus Kas</span>
                </div>
              </div>
              <span id="badgeCardStatusB" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Klasifikasi 4 jenis finansial: Keuangan Pribadi (*personal finance*), Bisnis (*business*), Publik (*negara*), dan Internasional.</li>
                <li>Aspek pengelolaan keuangan: Manajemen arus kas (pemasukan vs pengeluaran), anggaran tabungan terencana, urgensi dana darurat (*emergency fund*), dasar-dasar investasi, dan mitigasi risiko kebangkrutan.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftTextB" rows="6" oninput="onNftCardInput('B')" placeholder="Uraikan pemahaman mendalam Anda mengenai 4 jenis finansial serta bagaimana mengelola pemasukan, tabungan, dana darurat, dan investasi secara bijak... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataB.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationB" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterB" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan) -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul OJK / Web Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSource('B')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftSourceB" rows="2" oninput="onNftCardInput('B')" placeholder="Contoh rujukan (Bisa 1 atau lebih):&#10;1. Modul Literasi Keuangan OJK RI (Sikapi Uangmu), Manajemen Keuangan Pribadi&#10;2. Buku Panduan Mengelola Arus Kas Siswa" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataB.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceB" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU C: KEBANKSENTRALAN (BANK INDONESIA) -->
          <div id="cardBoxC" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">C</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kebanksentralan &amp; Bank Indonesia</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Independensi, Tugas Utama, Sistem Pembayaran &amp; Stabilitas Rupiah</span>
                </div>
              </div>
              <span id="badgeCardStatusC" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian bank sentral dan kedudukannya sebagai lembaga negara independen.</li>
                <li>Tugas dan fungsi utama bank sentral (moneter, regulasi, dan pengawasan sistem pembayaran).</li>
                <li>Mengenal Bank Indonesia (BI): Tujuan tunggal memelihara kestabilan nilai Rupiah.</li>
                <li>Peran nyata BI dalam menjaga stabilitas sistem keuangan serta modernisasi pembayaran non-tunai (QRIS, BI-FAST).</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftTextC" rows="6" oninput="onNftCardInput('C')" placeholder="Jelaskan peran bank sentral, fungsi Bank Indonesia, kebijakan moneter, dan bagaimana stabilitas nilai tukar Rupiah dijaga dari inflasi... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataC.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationC" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterC" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan) -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Situs Resmi Bank Indonesia):</span>
                </label>
                <button type="button" onclick="appendNextSource('C')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftSourceC" rows="2" oninput="onNftCardInput('C')" placeholder="Contoh rujukan (Bisa 1 atau lebih):&#10;1. Portal Edukasi Bank Indonesia (www.bi.go.id), Mengenal BI &amp; Sistem Pembayaran&#10;2. UU No. 23 Tahun 1999 tentang Bank Indonesia" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataC.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceC" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU D: BADAN USAHA DAN KOPERASI -->
          <div id="cardBoxD" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">D</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Badan Usaha &amp; Koperasi Indonesia</h3>
                  <span class="text-[11px] text-slate-500 font-medium">BUMN, BUMS, BUMD, Landasan Hukum UU 25/1992 &amp; Prinsip SHU</span>
                </div>
              </div>
              <span id="badgeCardStatusD" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian badan usaha dan perbedaan peranan BUMN, BUMS, serta BUMD di Indonesia.</li>
                <li>Pengertian koperasi serta dasar hukum resminya (UUD 1945 Pasal 33 &amp; UU No. 25 Tahun 1992).</li>
                <li>Kegiatan usaha, asas kekeluargaan, dan prinsip-prinsip operasional koperasi (keanggotaan sukarela, pembagian SHU sebanding jasa anggota).</li>
                <li>Peran nyata koperasi dalam menyejahterakan anggota dan menggerakkan ekonomi kerakyatan.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftTextD" rows="6" oninput="onNftCardInput('D')" placeholder="Tuliskan telaah Anda tentang badan usaha, fungsi BUMN/BUMS, serta hakikat koperasi sebagai soko guru perekonomian Indonesia... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataD.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan) -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / UU Koperasi / Web Kemenkop UKM):</span>
                </label>
                <button type="button" onclick="appendNextSource('D')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftSourceD" rows="2" oninput="onNftCardInput('D')" placeholder="Contoh rujukan (Bisa 1 atau lebih):&#10;1. Undang-Undang RI No. 25 Tahun 1992 tentang Perkoperasian&#10;2. Modul Pengantar Badan Usaha Koperasi, Kemenkop UKM RI" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataD.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU E: POTENSI SEKTOR EKONOMI OKU TIMUR -->
          <div id="cardBoxE" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">E</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kegiatan &amp; Potensi Sektor Ekonomi OKU Timur</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Lumbung Padi, Perkebunan, UMKM Belitang &amp; Peluang Usaha Lokal</span>
                </div>
              </div>
              <span id="badgeCardStatusE" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis (Konteks Nyata OKU Timur):</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Potensi sektor pertanian (padi sawah irigasi teknis Belitang) dan perkebunan (karet, kelapa sawit) di OKU Timur.</li>
                <li>Potensi peternakan (sapi potong) dan perikanan air tawar (kolam patin/lele).</li>
                <li>Perdagangan dan dinamika UMKM lokal (pasar Gumawang Belitang, pengolahan hasil panen).</li>
                <li>Persebaran potensi ekonomi antar-kecamatan di Kabupaten OKU Timur.</li>
                <li>Identifikasi produk unggulan lokal dan peluang usaha potensial bagi generasi muda di masa depan.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftTextE" rows="6" oninput="onNftCardInput('E')" placeholder="Uraikan kondisi riil perekonomian Kabupaten OKU Timur: keunggulan komparatif sebagai lumbung pangan, komoditas unggulan, UMKM lokal, dan peluang wirausaha masa depan... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataE.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationE" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterE" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan (Mendukung Multi-Rujukan) -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (BPS OKU Timur / Web Pemkab / Observasi):</span>
                </label>
                <button type="button" onclick="appendNextSource('E')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 border border-teal-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftSourceE" rows="2" oninput="onNftCardInput('E')" placeholder="Contoh rujukan (Bisa 1 atau lebih):&#10;1. BPS Kabupaten OKU Timur, Publikasi Kabupaten OKU Timur Dalam Angka&#10;2. Situs Resmi Pemkab OKU Timur (okutimurkab.go.id), Profil Potensi Daerah" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataE.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceE" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- TOMBOL SUBMIT RESMI DAY 1 -->
          <div class="p-5 rounded-3xl bg-surface-container-lowest border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20 backdrop-blur-md bg-white/95">
            <div class="flex flex-col min-w-0 text-center sm:text-left">
              <span id="lblSummaryProgress" class="font-black text-xs sm:text-sm text-slate-900">0 dari 5 Kartu Riset Memenuhi Syarat</span>
              <span class="text-[11px] text-slate-500 font-medium">Seluruh kartu wajib mencapai minimal 300 karakter dan mencantumkan sumber rujukan.</span>
            </div>
            
            <button type="button" id="btnSubmitNftD1Materi" onclick="submitNftDay1Materi()" disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-300 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs">
              <span class="material-symbols-outlined text-base">lock</span>
              <span>Lengkapi 5 Kartu Terlebih Dahulu</span>
            </button>
          </div>
        </form>

      </div>
    `;

    // Pasang listener input & evaluasi kondisi awal
    setTimeout(() => {
      evaluateAllNftCards(false);
    }, 50);
  }

  // 3. LOGIKA EVALUASI REAL-TIME KARTU A S.D. E
  window.onNftCardInput = function(cardKey) {
    evaluateCard(cardKey, true);
    evaluateAllNftCards(true);
  };

  function evaluateCard(key, autoSave) {
    const textEl = document.getElementById('nftText' + key);
    const srcEl = document.getElementById('nftSource' + key);
    const boxEl = document.getElementById('cardBox' + key);
    const badgeEl = document.getElementById('badgeCardStatus' + key);
    const countEl = document.getElementById('counter' + key);
    const msgValEl = document.getElementById('msgValidation' + key);
    const msgSrcEl = document.getElementById('msgSource' + key);

    if (!textEl || !srcEl) return false;

    const valText = validateScientificContent(textEl.value, 300);
    const valSrc = validateSourceCitation(srcEl.value, 20);

    // Update counter
    if (countEl) countEl.textContent = `${valText.count} / 300`;

    if (valText.valid) {
      if (countEl) countEl.className = 'text-emerald-700 font-bold';
      if (msgValEl) {
        msgValEl.textContent = '✓ Analisis memenuhi batas minimum';
        msgValEl.className = 'text-emerald-700 font-semibold';
      }
    } else {
      if (countEl) countEl.className = 'text-slate-400 font-bold';
      if (msgValEl) {
        msgValEl.textContent = valText.reason;
        msgValEl.className = 'text-rose-600 font-semibold';
      }
    }

    if (valSrc.valid) {
      if (msgSrcEl) {
        msgSrcEl.textContent = valSrc.reason;
        msgSrcEl.className = 'text-[10.5px] text-emerald-700 font-semibold';
      }
    } else {
      if (msgSrcEl) {
        msgSrcEl.textContent = valSrc.reason;
        msgSrcEl.className = 'text-[10.5px] text-rose-600 font-semibold';
      }
    }

    const isCardComplete = valText.valid && valSrc.valid;

    if (isCardComplete) {
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-emerald-400 shadow-sm flex flex-col gap-3.5 transition-all';
      if (badgeEl) {
        badgeEl.textContent = '✓ Lengkap';
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0';
      }
    } else {
      if (boxEl) boxEl.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all';
      if (badgeEl) {
        badgeEl.textContent = 'Belum Lengkap';
        badgeEl.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
      }
    }

    if (autoSave) {
      saveNftDraftThrottled();
    }

    return isCardComplete;
  }

  function evaluateAllNftCards(autoSave) {
    const keys = ['A', 'B', 'C', 'D', 'E'];
    let completedCount = 0;

    keys.forEach(k => {
      if (evaluateCard(k, false)) completedCount++;
    });

    const pct = Math.round((completedCount / keys.length) * 100);

    const barEl = document.getElementById('barNftD1Progress');
    const lblProg = document.getElementById('lblNftD1ProgressCount');
    const lblSummary = document.getElementById('lblSummaryProgress');
    const btnSubmit = document.getElementById('btnSubmitNftD1Materi');

    if (barEl) barEl.style.width = pct + '%';
    if (lblProg) lblProg.textContent = `${completedCount} / 5 Kartu Terpenuhi (${pct}%)`;
    if (lblSummary) lblSummary.textContent = `${completedCount} dari 5 Kartu Riset Memenuhi Syarat (${pct}%)`;

    if (btnSubmit) {
      if (completedCount === keys.length) {
        btnSubmit.disabled = false;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ring-2 ring-emerald-400/40';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">send</span>
          <span>Simpan &amp; Kirim Riset Day 1 ke Fasilitator</span>
        `;
      } else {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">lock</span>
          <span>Lengkapi 5 Kartu Terlebih Dahulu (${completedCount}/5)</span>
        `;
      }
    }
  }

  // 4. AUTO-SAVE DRAFT KARTU (THROTTLED PER 1.5 DETIK)
  let saveDraftTimer = null;
  function saveNftDraftThrottled() {
    clearTimeout(saveDraftTimer);
    saveDraftTimer = setTimeout(() => {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
        const cleanNisn = String(u.nisn || u.identifier || '').trim();
        if (!cleanNisn) return;

        const draftObj = {
          updatedAt: new Date().toISOString(),
          cardA: { text: document.getElementById('nftTextA')?.value || '', source: document.getElementById('nftSourceA')?.value || '' },
          cardB: { text: document.getElementById('nftTextB')?.value || '', source: document.getElementById('nftSourceB')?.value || '' },
          cardC: { text: document.getElementById('nftTextC')?.value || '', source: document.getElementById('nftSourceC')?.value || '' },
          cardD: { text: document.getElementById('nftTextD')?.value || '', source: document.getElementById('nftSourceD')?.value || '' },
          cardE: { text: document.getElementById('nftTextE')?.value || '', source: document.getElementById('nftSourceE')?.value || '' }
        };

        localStorage.setItem('fincestem_draft_nft_materi_d1_' + cleanNisn, JSON.stringify(draftObj));
      } catch (e) {}
    }, 1200);
  }

  // 5. SUBMIT RESMI DAY 1 MATERI KE FASILITATOR & AKTIFKAN PROGRESS
  window.submitNftDay1Materi = function() {
    const keys = ['A', 'B', 'C', 'D', 'E'];
    const invalidKeys = [];
    keys.forEach(k => {
      if (!evaluateCard(k, false)) invalidKeys.push(k);
    });

    if (invalidKeys.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat (minimal 300 karakter & sumber valid)!`, 'error');
      } else {
        alert(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat!`);
      }
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const officialPayload = {
      day: 1,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      cardA: { title: 'Kegiatan Ekonomi & Sektor Utama', text: document.getElementById('nftTextA').value.trim(), source: document.getElementById('nftSourceA').value.trim() },
      cardB: { title: 'Literasi dan Pengelolaan Keuangan', text: document.getElementById('nftTextB').value.trim(), source: document.getElementById('nftSourceB').value.trim() },
      cardC: { title: 'Kebanksentralan & Bank Indonesia', text: document.getElementById('nftTextC').value.trim(), source: document.getElementById('nftSourceC').value.trim() },
      cardD: { title: 'Badan Usaha & Koperasi', text: document.getElementById('nftTextD').value.trim(), source: document.getElementById('nftSourceD').value.trim() },
      cardE: { title: 'Potensi Sektor Ekonomi OKU Timur', text: document.getElementById('nftTextE').value.trim(), source: document.getElementById('nftSourceE').value.trim() }
    };

    // Sintesis singkat untuk kompatibilitas resume modul di dashboard
    const summaryText = `Riset Mandiri Day 1 Non-Field Trip Terverifikasi (5 Kartu Lengkap):\n` +
      `• Topik A: ${officialPayload.cardA.text.substring(0, 80)}...\n` +
      `• Topik B: ${officialPayload.cardB.text.substring(0, 80)}...\n` +
      `• Topik C: ${officialPayload.cardC.text.substring(0, 80)}...\n` +
      `• Topik D: ${officialPayload.cardD.text.substring(0, 80)}...\n` +
      `• Topik E: ${officialPayload.cardE.text.substring(0, 80)}...`;

    // Simpan di local storage resmi
    try {
      localStorage.setItem('fincestem_materi_nft_day1_' + cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem('fincestem_materi_day1_' + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
      localStorage.setItem('fincestem_materi_ft_day1_' + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
    } catch(e) {}

    // Update status progress sistem FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 1, 'materi', summaryText, function() {
        showSuccessDay1NftModal();
      });
    } else {
      showSuccessDay1NftModal();
    }
  };

  function showSuccessDay1NftModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Riset Mandiri Berhasil
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day 1 Berhasil Disimpan &amp; Terkirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1">
            Selamat! 5 Kartu Riset Anda telah lengkap dan diserahkan ke Fasilitator. Akses menuju <strong>Lembar Kerja (LKPD) Day 1</strong> sekarang telah terbuka!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=1" class="w-full py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Buka LKPD Day 1</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ========================================================
  // 6. RENDER MODUL BELAJAR DAY 2 NON-FIELD TRIP (5 KARTU)
  // Tema: Budaya & Sistem Mata Pencaharian OKU Timur
  // ========================================================
  function renderDay2NonFieldTripModule(container) {
    if (!container) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Cek apakah data Day 2 sudah pernah dikirim resmi sebelumnya
    let savedOfficial = null;
    try {
      const rawOff = localStorage.getItem('fincestem_materi_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_materi_day2_' + cleanNisn);
      if (rawOff) savedOfficial = JSON.parse(rawOff);
    } catch (e) {}

    // Cek auto-save draft sementara Day 2
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_materi_d2_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt));
    const dataA = (savedOfficial && savedOfficial.cardA) || draft.cardA || { text: '', source: '' };
    const dataB = (savedOfficial && savedOfficial.cardB) || draft.cardB || { text: '', source: '' };
    const dataC = (savedOfficial && savedOfficial.cardC) || draft.cardC || { text: '', source: '' };
    const dataD = (savedOfficial && savedOfficial.cardD) || draft.cardD || { text: '', source: '' };
    const dataE = (savedOfficial && savedOfficial.cardE) || draft.cardE || { text: '', source: '' };

    container.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-8">
        
        <!-- HEADER IDENTITAS MODUL DAY 2 NON-FIELD TRIP -->
        <div class="bg-gradient-to-br from-indigo-900 via-slate-900 to-teal-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-indigo-700/40">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-indigo-100 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Non-Field Trip • Day 2</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                Pilar Culture &amp; Humaniora
              </span>
            </div>
            <span id="badgeNftD2Status" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Riset Terkirim Resmi' : 'Sedang Bekerja (Mandiri)'}
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Modul Riset Day 2: Budaya &amp; Sistem Mata Pencaharian Masyarakat OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium mt-1">
              Kajian Antropologis Hakikat Kebudayaan, 7 Unsur Universal Kebudayaan, serta Ragam Sistem Mata Pencaharian Daerah
            </p>
          </div>

          <!-- KARTU DATA SISWA & PEMBINA -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-indigo-200 text-[10px] font-medium">Nama Peneliti</span>
              <span class="font-extrabold truncate text-white">${studentName}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-indigo-200 text-[10px] font-medium">NISN / Identitas</span>
              <span class="font-extrabold truncate text-white">${studentNisn}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-indigo-200 text-[10px] font-medium">Rombel Terdaftar</span>
              <span class="font-extrabold truncate text-white">${studentClass}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-indigo-200 text-[10px] font-medium">Fasilitator Pembina</span>
              <span class="font-extrabold truncate text-white">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- PETUNJUK KERJA AKADEMIK (ATURAN KETAT DAY 2) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-300/80 text-amber-950 flex flex-col gap-2 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
            <span class="material-symbols-outlined text-amber-700 text-lg">psychology</span>
            <span>PETUNJUK RISET MANDIRI DAY 2 (INQUIRY-BASED LEARNING):</span>
          </div>
          <p class="text-xs leading-relaxed text-amber-950/90">
            Sebagai peserta <strong>Non-Field Trip</strong>, Anda diwajibkan melakukan investigasi pustaka dan observasi mandiri mengenai <strong>Budaya dan Sistem Mata Pencaharian Masyarakat OKU Timur</strong> dari buku sosiologi/antropologi, modul kurikulum, portal BPS, dan dokumen resmi Pemkab OKU Timur.
          </p>
          <ul class="text-[11.5px] text-amber-950/90 space-y-1 list-disc list-inside font-medium pt-1">
            <li>Tuntaskan <strong>5 Kartu Riset (A, B, C, D, E)</strong> dengan analisis kritis dan kalimat orisinal Anda sendiri.</li>
            <li>Setiap kartu wajib memenuhi <strong>minimal 300 karakter analisis mendalam</strong> (anti-copy paste kalimat berulang).</li>
            <li>Wajib mencantumkan <strong>Sumber Rujukan Valid (minimal 20 karakter)</strong> pada setiap kartu yang Anda kerjakan.</li>
            <li>Tombol simpan dan kirim ke Fasilitator baru akan aktif setelah <strong>kelima kartu berstatus hijau (100% lengkap)</strong>.</li>
          </ul>
        </div>

        <!-- PROGRESS BAR INDIKATOR DAY 2 -->
        <div class="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-700 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-indigo-600">checklist</span>
              <span>Progres Kelengkapan 5 Kartu Riset Day 2:</span>
            </span>
            <span id="lblNftD2ProgressCount" class="font-black text-indigo-800">0 / 5 Kartu Terpenuhi</span>
          </div>
          <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div id="barNftD2Progress" class="h-full bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- 5 RESEARCH CARDS DAY 2 (A, B, C, D, E)                   -->
        <!-- ======================================================== -->
        <form id="formNftDay2Cards" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          
          <!-- KARTU A: HAKIKAT BUDAYA & HUBUNGAN DENGAN EKONOMI -->
          <div id="cardBoxD2_A" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">A</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Hakikat Budaya &amp; Hubungannya dengan Mata Pencaharian</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pengertian Budaya (Koentjaraningrat/Tylor), Nilai Tradisi &amp; Etos Kerja Ekonomi</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_A" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Panduan Poin Riset -->
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian kebudayaan secara etimologis (budi-daya / <em>colere</em>) dan menurut antropolog (Koentjaraningrat / E.B. Tylor) sebagai keseluruhan sistem gagasan, tindakan, dan hasil karya cipta manusia.</li>
                <li>Bagaimana nilai budaya, etos kerja, kearifan lokal, dan norma sosial memotivasi cara masyarakat bekerja dan mencari nafkah.</li>
                <li>Hubungan timbal balik: bagaimana pola mata pencaharian (seperti tradisi bercocok tanam) melahirkan budaya gotong royong, musyawarah, dan upacara adat di masyarakat.</li>
              </ol>
            </div>

            <!-- Kolom Esai Analisis Siswa -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextA" rows="6" oninput="onNftD2CardInput('A')" placeholder="Uraikan hasil kajian mandiri Anda mengenai pengertian budaya, peran nilai budaya dalam etos kerja, serta keterkaitan erat antara tradisi kebudayaan dengan sistem mata pencaharian hidup masyarakat... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataA.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD2_A" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD2_A" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <!-- Kolom Sumber Rujukan -->
            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSourceD2('A')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftD2SourceA" rows="2" oninput="onNftD2CardInput('A')" placeholder="Contoh rujukan:&#10;1. Buku Pengantar Ilmu Antropologi (Koentjaraningrat), Bab Kebudayaan&#10;2. Modul Sosiologi/Antropologi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek)" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataA.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_A" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan (pisahkan dengan nomor atau baris baru). Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU B: 7 UNSUR UNIVERSAL KEBUDAYAAN DI OKU TIMUR -->
          <div id="cardBoxD2_B" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">B</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">7 Unsur Kebudayaan Universal dalam Kehidupan Multikultural OKU Timur</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bahasa, Pengetahuan, Sosial, Mata Pencaharian, Teknologi, Religi &amp; Kesenian</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_B" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Uraian 7 unsur kebudayaan universal (Koentjaraningrat): Bahasa, Sistem Pengetahuan, Organisasi Sosial, Sistem Mata Pencaharian, Peralatan Hidup &amp; Teknologi, Sistem Religi/Kepercayaan, dan Kesenian.</li>
                <li>Realitas keberagaman budaya di OKU Timur: perpaduan harmonis budaya suku asli Komering dan warga transmigran (Jawa, Bali, Sunda) di wilayah Belitang dan sekitarnya.</li>
                <li>Contoh sistem pengetahuan lokal (seperti penanggalan musim tanam/pranata mangsa, kearifan pengelolaan tanah, atau sistem musyawarah desa).</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextB" rows="6" oninput="onNftD2CardInput('B')" placeholder="Uraikan pemahaman mendalam Anda mengenai 7 unsur kebudayaan universal serta bagaimana wujud nyata kehidupan multikultural masyarakat OKU Timur dalam kehidupan sehari-hari... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataB.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD2_B" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD2_B" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSourceD2('B')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftD2SourceB" rows="2" oninput="onNftD2CardInput('B')" placeholder="Contoh rujukan:&#10;1. Profil Kebudayaan dan Pariwisata Kabupaten OKU Timur (Disbudpar OKU Timur)&#10;2. Jurnal Antropologi Indonesia / Buku Sejarah Transmigrasi Belitang" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataB.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_B" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU C: MATA PENCAHARIAN PERTANIAN PANGAN & PERKEBUNAN -->
          <div id="cardBoxD2_C" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">C</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Mata Pencaharian Sektor Pertanian Pangan &amp; Perkebunan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Padi Sawah Irigasi Teknis, Rotasi Palawija, serta Perkebunan Karet &amp; Sawit</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_C" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Karakteristik sistem mata pencaharian petani padi sawah irigasi teknis di OKU Timur sebagai lumbung pangan utama Sumatera Selatan.</li>
                <li>Pola rotasi tanam padi dan tanaman palawija (jagung, kedelai, cabai) dalam menjaga ketahanan pangan dan pendapatan petani.</li>
                <li>Profil komoditas perkebunan rakyat (karet dan kelapa sawit): alur budidaya/penyadapan, pemasaran, dan pengaruh fluktuasi harga komoditas terhadap ekonomi keluarga tani.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextC" rows="6" oninput="onNftD2CardInput('C')" placeholder="Uraikan hasil analisis Anda mengenai mata pencaharian petani sawah padi di Belitang, peranan saluran irigasi teknis Komering, serta potensi perkebunan karet dan sawit di OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataC.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD2_C" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD2_C" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSourceD2('C')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftD2SourceC" rows="2" oninput="onNftD2CardInput('C')" placeholder="Contoh rujukan:&#10;1. Dinas Pertanian Kabupaten OKU Timur / BPS OKU Timur Dalam Angka (Sektor Pertanian)&#10;2. Modul Geografi / Ekonomi Pertanian SMA" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataC.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_C" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU D: PERIKANAN, PETERNAKAN & INDUSTRI RUMAH TANGGA -->
          <div id="cardBoxD2_D" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">D</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Mata Pencaharian Sektor Perikanan, Peternakan &amp; Industri Rumah Tangga</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Budidaya Patin-Lele, Peternakan Sapi, Industri Kemplang/Rengginang &amp; Pandai Besi</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_D" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Potensi mata pencaharian pembudidaya ikan air tawar (patin, lele, nila) dan sistem peternakan (sapi potong, kambing, unggas) di pedesaan OKU Timur.</li>
                <li>Profil industri rumah tangga (<em>home industry</em>) pengolahan pangan lokal (seperti kerupuk kemplang, sale pisang, rengginang, tahu-tempe) dan kerajinan pandai besi.</li>
                <li>Analisis nilai tambah ekonomi (<em>added value</em>) dari pengolahan bahan mentah pertanian/perikanan menjadi produk olahan bernilai jual tinggi.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextD" rows="6" oninput="onNftD2CardInput('D')" placeholder="Tuliskan analisis komprehensif Anda mengenai budidaya perikanan air tawar, sistem peternakan sapi/kambing, serta geliat industri rumah tangga lokal dalam mengolah hasil pangan daerah... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataD.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD2_D" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD2_D" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSourceD2('D')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftD2SourceD" rows="2" oninput="onNftD2CardInput('D')" placeholder="Contoh rujukan:&#10;1. Dinas Perikanan dan Peternakan OKU Timur / Data Sentra Ikan Patin OKU Timur&#10;2. Profil UMKM & Industri Rumah Tangga Dinas Koperasi & UKM OKU Timur" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataD.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_D" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU E: PERDAGANGAN, JASA & PEKERJAAN FORMAL -->
          <div id="cardBoxD2_E" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">E</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Mata Pencaharian Sektor Perdagangan, Jasa &amp; Pekerjaan Formal</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pasar Gumawang, Logistik Pertanian, Agen Perbankan Digital &amp; Profesi ASN/Swasta</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_E" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Peran pasar tradisional (Pasar Gumawang Belitang, Pasar Martapura) dan pusat grosir dalam sirkulasi perputaran uang dan rantai pasok daerah.</li>
                <li>Perkembangan sektor jasa pedesaan: transportasi dan logistik hasil panen, bengkel alat mesin pertanian (alsintan), serta agen perbankan digital (seperti BRILink/BUMDes).</li>
                <li>Peran tenaga kerja formal (Aparatur Sipil Negara/ASN, Guru, Tenaga Kesehatan/Medis, Karyawan BUMN/Bank/Perusahaan Swasta) dalam pelayanan publik dan stabilitas sosial-ekonomi OKU Timur.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextE" rows="6" oninput="onNftD2CardInput('E')" placeholder="Uraikan pemikiran Anda mengenai pusat perdagangan Belitang, perkembangan jasa transportasi/perbankan desa, serta peranan krusial tenaga kerja formal dalam memajukan OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataE.text || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgValidationD2_E" class="text-rose-600 font-semibold">Minimal 300 karakter</span>
                <span id="counterD2_E" class="text-slate-400 font-bold">0 / 300</span>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
              <div class="flex items-center justify-between gap-2">
                <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                  <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
                </label>
                <button type="button" onclick="appendNextSourceD2('E')" class="px-2.5 py-1 rounded-xl text-[11px] font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200 flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                  <span class="material-symbols-outlined text-xs">add_circle</span>
                  <span>+ Tambah Rujukan Lain</span>
                </button>
              </div>
              <textarea id="nftD2SourceE" rows="2" oninput="onNftD2CardInput('E')" placeholder="Contoh rujukan:&#10;1. Dinas Perdagangan dan Perindustrian OKU Timur / BKPSDM OKU Timur&#10;2. BPS OKU Timur (Publikasi Statistik Ketenagakerjaan & Perdagangan Daerah)" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataE.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_E" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- FOOTER AKSI SIMPAN DRAFT & SUBMIT RESMI DAY 2 -->
          <div class="sticky bottom-3 z-30 p-4 sm:p-5 rounded-3xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <div class="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black shrink-0 border border-indigo-500/30">
                <span class="material-symbols-outlined text-xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span id="lblNftD2SummaryProg" class="font-extrabold text-xs sm:text-sm text-white">0 dari 5 Kartu Riset Memenuhi Syarat</span>
                <span class="text-[11px] text-slate-400 font-medium">Tersimpan otomatis sebagai draft lokal</span>
              </div>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button type="button" id="btnSubmitNftDay2Materi" onclick="submitNftDay2Materi()" disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs">
                <span class="material-symbols-outlined text-base">lock</span>
                <span>Lengkapi 5 Kartu Terlebih Dahulu (0/5)</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    `;

    // Evaluasi awal semua kartu Day 2
    ['A', 'B', 'C', 'D', 'E'].forEach(k => evaluateCardD2(k, true));
    updateDay2OverallProgress();
  }

  // Helper untuk menambah nomor rujukan otomatis pada kartu Day 2
  window.appendNextSourceD2 = function(key) {
    const srcEl = document.getElementById('nftD2Source' + key);
    if (!srcEl) return;
    const currentVal = srcEl.value;
    const trimmed = currentVal.trim();

    if (!trimmed) {
      srcEl.value = '1. ';
    } else {
      const matches = trimmed.match(/(?:^|\n)\s*(\d+)[\.\)]/g);
      let nextNum = 2;
      if (matches && matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const numPart = parseInt(lastMatch.replace(/\D/g, ''), 10);
        if (!isNaN(numPart)) nextNum = numPart + 1;
        srcEl.value = trimmed + '\n' + nextNum + '. ';
      } else {
        if (!trimmed.startsWith('1.')) {
          srcEl.value = '1. ' + trimmed + '\n2. ';
        } else {
          srcEl.value = trimmed + '\n2. ';
        }
      }
    }

    srcEl.focus();
    srcEl.setSelectionRange(srcEl.value.length, srcEl.value.length);
    if (typeof window.onNftD2CardInput === 'function') {
      window.onNftD2CardInput(key);
    }
  };

  // Evaluator per kartu Day 2
  function evaluateCardD2(key, updateUI) {
    const textEl = document.getElementById('nftD2Text' + key);
    const srcEl = document.getElementById('nftD2Source' + key);
    if (!textEl || !srcEl) return false;

    const valText = validateScientificContent(textEl.value, 300);
    const valSrc = validateSourceCitation(srcEl.value, 20);

    const isComplete = valText.valid && valSrc.valid;

    if (updateUI) {
      const cardBox = document.getElementById('cardBoxD2_' + key);
      const badge = document.getElementById('badgeCardStatusD2_' + key);
      const msgV = document.getElementById('msgValidationD2_' + key);
      const cntV = document.getElementById('counterD2_' + key);
      const msgS = document.getElementById('msgSourceD2_' + key);

      if (cntV) {
        cntV.textContent = `${valText.count} / 300`;
        cntV.className = valText.count >= 300 ? 'text-emerald-600 font-bold' : 'text-slate-400 font-bold';
      }

      if (msgV) {
        msgV.textContent = valText.reason;
        msgV.className = valText.valid ? 'text-emerald-600 font-bold' : 'text-rose-600 font-semibold';
      }

      if (msgS) {
        msgS.textContent = valSrc.reason;
        msgS.className = valSrc.valid ? 'text-emerald-600 font-bold' : 'text-slate-400 font-medium';
      }

      if (badge) {
        if (isComplete) {
          badge.textContent = '✓ Lengkap & Valid';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-800 shrink-0';
        } else {
          badge.textContent = 'Belum Lengkap';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
        }
      }

      if (cardBox) {
        if (isComplete) {
          cardBox.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-emerald-400 shadow-2xs flex flex-col gap-3.5 transition-all';
        } else {
          cardBox.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all';
        }
      }
    }

    return isComplete;
  }

  // Handler input kartu Day 2
  window.onNftD2CardInput = function(key) {
    evaluateCardD2(key, true);
    updateDay2OverallProgress();
    saveNftD2DraftThrottled();
  };

  // Update progress bar Day 2
  function updateDay2OverallProgress() {
    const keys = ['A', 'B', 'C', 'D', 'E'];
    let completedCount = 0;
    keys.forEach(k => {
      if (evaluateCardD2(k, false)) completedCount++;
    });

    const pct = Math.round((completedCount / keys.length) * 100);
    const bar = document.getElementById('barNftD2Progress');
    const lblProg = document.getElementById('lblNftD2ProgressCount');
    const lblSummary = document.getElementById('lblNftD2SummaryProg');
    const btnSubmit = document.getElementById('btnSubmitNftDay2Materi');

    if (bar) bar.style.width = pct + '%';
    if (lblProg) lblProg.textContent = `${completedCount} / 5 Kartu Terpenuhi (${pct}%)`;
    if (lblSummary) lblSummary.textContent = `${completedCount} dari 5 Kartu Riset Memenuhi Syarat (${pct}%)`;

    if (btnSubmit) {
      if (completedCount === keys.length) {
        btnSubmit.disabled = false;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ring-2 ring-emerald-400/40';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">send</span>
          <span>Simpan &amp; Kirim Riset Day 2 ke Fasilitator</span>
        `;
      } else {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-500 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed transition-all shadow-xs';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">lock</span>
          <span>Lengkapi 5 Kartu Terlebih Dahulu (${completedCount}/5)</span>
        `;
      }
    }
  }

  // Auto-save draft Day 2
  let saveDraftD2Timer = null;
  function saveNftD2DraftThrottled() {
    clearTimeout(saveDraftD2Timer);
    saveDraftD2Timer = setTimeout(() => {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
        const cleanNisn = String(u.nisn || u.identifier || '').trim();
        if (!cleanNisn) return;

        const draftObj = {
          updatedAt: new Date().toISOString(),
          cardA: { text: document.getElementById('nftD2TextA')?.value || '', source: document.getElementById('nftD2SourceA')?.value || '' },
          cardB: { text: document.getElementById('nftD2TextB')?.value || '', source: document.getElementById('nftD2SourceB')?.value || '' },
          cardC: { text: document.getElementById('nftD2TextC')?.value || '', source: document.getElementById('nftD2SourceC')?.value || '' },
          cardD: { text: document.getElementById('nftD2TextD')?.value || '', source: document.getElementById('nftD2SourceD')?.value || '' },
          cardE: { text: document.getElementById('nftD2TextE')?.value || '', source: document.getElementById('nftD2SourceE')?.value || '' }
        };

        localStorage.setItem('fincestem_draft_nft_materi_d2_' + cleanNisn, JSON.stringify(draftObj));
      } catch (e) {}
    }, 1200);
  }

  // Submit resmi Day 2 Materi ke Fasilitator
  window.submitNftDay2Materi = function() {
    const keys = ['A', 'B', 'C', 'D', 'E'];
    const invalidKeys = [];
    keys.forEach(k => {
      if (!evaluateCardD2(k, false)) invalidKeys.push(k);
    });

    if (invalidKeys.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat (minimal 300 karakter & sumber valid)!`, 'error');
      } else {
        alert(`Kartu ${invalidKeys.join(', ')} belum memenuhi syarat!`);
      }
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const officialPayload = {
      day: 2,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      cardA: { title: 'Hakikat Budaya & Keterkaitan Ekonomi', text: document.getElementById('nftD2TextA').value.trim(), source: document.getElementById('nftD2SourceA').value.trim() },
      cardB: { title: '7 Unsur Kebudayaan Universal OKU Timur', text: document.getElementById('nftD2TextB').value.trim(), source: document.getElementById('nftD2SourceB').value.trim() },
      cardC: { title: 'Mata Pencaharian Pertanian Pangan & Perkebunan', text: document.getElementById('nftD2TextC').value.trim(), source: document.getElementById('nftD2SourceC').value.trim() },
      cardD: { title: 'Mata Pencaharian Perikanan, Peternakan & UMKM', text: document.getElementById('nftD2TextD').value.trim(), source: document.getElementById('nftD2SourceD').value.trim() },
      cardE: { title: 'Mata Pencaharian Perdagangan, Jasa & Formal', text: document.getElementById('nftD2TextE').value.trim(), source: document.getElementById('nftD2SourceE').value.trim() }
    };

    const summaryText = `Riset Mandiri Day 2 Non-Field Trip Terverifikasi (5 Kartu Lengkap):\n` +
      `• Topik A: ${officialPayload.cardA.text.substring(0, 80)}...\n` +
      `• Topik B: ${officialPayload.cardB.text.substring(0, 80)}...\n` +
      `• Topik C: ${officialPayload.cardC.text.substring(0, 80)}...\n` +
      `• Topik D: ${officialPayload.cardD.text.substring(0, 80)}...\n` +
      `• Topik E: ${officialPayload.cardE.text.substring(0, 80)}...`;

    try {
      localStorage.setItem('fincestem_materi_nft_day2_' + cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem('fincestem_materi_day2_' + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
      localStorage.setItem('fincestem_materi_ft_day2_' + cleanNisn, JSON.stringify({ conclusion: summaryText, savedAt: officialPayload.submittedAt }));
    } catch(e) {}

    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 2, 'materi', summaryText, function() {
        showSuccessDay2NftModal();
      });
    } else {
      showSuccessDay2NftModal();
    }
  };

  function showSuccessDay2NftModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Riset Mandiri Berhasil
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            Modul Day 2 Berhasil Disimpan &amp; Terkirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1">
            Selamat! 5 Kartu Riset Budaya &amp; Mata Pencaharian OKU Timur telah lengkap dan diserahkan ke Fasilitator. Akses menuju <strong>Lembar Kerja (LKPD) Day 2</strong> sekarang telah terbuka!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="lkpd.html?day=2" class="w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Buka LKPD Day 2</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Fallback untuk hari Non-Field Trip yang belum dikonfigurasi
  function renderGenericNonFieldTripModule(container, dayNum) {
    if (!container) return;
    container.innerHTML = `
      <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-4xl text-teal-600">school</span>
        <h3 class="font-black text-base text-slate-900">Modul Riset Non-Field Trip Day ${dayNum}</h3>
        <p class="text-xs text-slate-600 max-w-md">Modul riset mandiri lokal OKU Timur untuk Day ${dayNum} sedang dalam persiapan kurikulum resmi.</p>
        <a href="dashboard.html" class="mt-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">Kembali ke Dashboard</a>
      </div>
    `;
  }

  // Ekspor fungsi ke window global
  window.renderDay1NonFieldTripModule = renderDay1NonFieldTripModule;
  window.renderDay2NonFieldTripModule = renderDay2NonFieldTripModule;
  window.renderGenericNonFieldTripModule = renderGenericNonFieldTripModule;

})(window);
