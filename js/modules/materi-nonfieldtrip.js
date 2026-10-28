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
    if (!source || typeof source !== 'string') return { valid: false, count: 0, reason: 'Sumber belum diisi' };
    const trimmed = source.trim();
    const count = trimmed.length;
    if (count < minChars) {
      return { valid: false, count: count, reason: `Kurang ${minChars - count} karakter (Cantumkan judul buku, penulis, hal, atau URL resmi)` };
    }
    return { valid: true, count: count, reason: 'Sumber valid' };
  }

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

            <!-- Kolom Sumber Rujukan -->
            <div class="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                <span>Sumber Rujukan Wajib (Buku / Modul / URL Resmi):</span>
              </label>
              <input type="text" id="nftSourceA" value="${dataA.source || ''}" oninput="onNftCardInput('A')" placeholder="Contoh: Buku Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800">
              <span id="msgSourceA" class="text-[10.5px] text-slate-400 font-medium">Cantumkan judul referensi, pengarang/penerbit, dan nomor halaman (minimal 20 karakter).</span>
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

            <div class="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                <span>Sumber Rujukan Wajib (Buku / Modul OJK / Web Resmi):</span>
              </label>
              <input type="text" id="nftSourceB" value="${dataB.source || ''}" oninput="onNftCardInput('B')" placeholder="Contoh: Modul Edukasi Literasi Keuangan Otoritas Jasa Keuangan (OJK) RI, Sikapi Uangmu" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800">
              <span id="msgSourceB" class="text-[10.5px] text-slate-400 font-medium">Cantumkan rujukan pustaka atau laman resmi (minimal 20 karakter).</span>
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

            <div class="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                <span>Sumber Rujukan Wajib (Buku / Situs Resmi Bank Indonesia):</span>
              </label>
              <input type="text" id="nftSourceC" value="${dataC.source || ''}" oninput="onNftCardInput('C')" placeholder="Contoh: Portal Resmi Bank Indonesia (www.bi.go.id), Profil &amp; Fungsi Utama BI" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800">
              <span id="msgSourceC" class="text-[10.5px] text-slate-400 font-medium">Cantumkan rujukan pustaka atau tautan situs resmi (minimal 20 karakter).</span>
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

            <div class="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                <span>Sumber Rujukan Wajib (Buku / Undang-Undang Koperasi):</span>
              </label>
              <input type="text" id="nftSourceD" value="${dataD.source || ''}" oninput="onNftCardInput('D')" placeholder="Contoh: Undang-Undang RI No. 25 Tahun 1992 tentang Perkoperasian / Buku Ekonomi SMA" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800">
              <span id="msgSourceD" class="text-[10.5px] text-slate-400 font-medium">Cantumkan rujukan pustaka atau regulasi resmi (minimal 20 karakter).</span>
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

            <div class="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <label class="text-xs font-bold text-slate-800 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-amber-600">menu_book</span>
                <span>Sumber Rujukan Wajib (BPS OKU Timur / Web Pemkab / Observasi):</span>
              </label>
              <input type="text" id="nftSourceE" value="${dataE.source || ''}" oninput="onNftCardInput('E')" placeholder="Contoh: BPS Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka / Portal Resmi okutimurkab.go.id" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-800">
              <span id="msgSourceE" class="text-[10.5px] text-slate-400 font-medium">Cantumkan publikasi data statistik atau dokumen resmi daerah (minimal 20 karakter).</span>
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
        msgSrcEl.textContent = '✓ Sumber rujukan valid';
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
  window.renderGenericNonFieldTripModule = renderGenericNonFieldTripModule;

})(window);
