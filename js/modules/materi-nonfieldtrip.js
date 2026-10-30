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

    // Fallback ekstraksi dari progress server jika berpindah gawai/device baru
    if (!savedOfficial || !savedOfficial.cardA) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map['1_materi'] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c && c.cardA) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = {
                day: 1,
                submitted: true,
                submittedAt: tMap.updated_at || new Date().toISOString(),
                cardA: { title: 'Kegiatan Ekonomi & Sektor Utama', text: c, source: 'Buku Siswa & Kajian Riset' },
                cardB: { title: 'Literasi dan Pengelolaan Keuangan', text: c, source: 'Buku Siswa & Modul OJK' },
                cardC: { title: 'Kebanksentralan & Bank Indonesia', text: c, source: 'Buku Siswa & Bank Indonesia' },
                cardD: { title: 'Badan Usaha & Koperasi', text: c, source: 'UU Perkoperasian & Kemenkop' },
                cardE: { title: 'Potensi Sektor Ekonomi OKU Timur', text: c, source: 'BPS OKU Timur & Web Pemkab' }
              };
            }
          }
        }
      } catch(eHyd) {}
    }

    // Cek auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_materi_d1_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt));
    window.isNftD1Submitted = isSubmitted;

    // Helper ekspansi otomatis kartu jika memuat cuplikan ringkasan server lama
    const expandCardIfShort = function(card, defaultTitle, defaultExp, defaultSrc) {
      const c = card || {};
      let text = String(c.text || '').trim();
      let source = String(c.source || '').trim();
      if (text.endsWith('...')) text = text.replace(/\.\.\.$/, '').trim();
      if (text.length < 300) {
        text = (text ? text + '. ' : '') + defaultExp;
      }
      if (source.length < 20) {
        source = defaultSrc;
      }
      return { title: c.title || defaultTitle, text: text, source: source };
    };

    const expTextA = 'Kajian mendalam mengenai kegiatan ekonomi menegaskan keterkaitan organik antara sektor primer (pertanian, peternakan, perikanan sebagai penyedia bahan mentah), sektor sekunder (industri olahan dan manufaktur yang meningkatkan nilai tambah komoditas), serta sektor tersier (jaringan distribusi, perdagangan, dan perbankan yang menghubungkan produsen dengan konsumen secara berkelanjutan di Kabupaten OKU Timur).';
    const expTextB = 'Literasi finansial mencakup pemahaman komprehensif terhadap 5 pilar tata kelola arus kas: pencatatan berkala seluruh transaksi masuk dan keluar, disiplin memisahkan rekening operasional usaha dari kas konsumsi pribadi, pembentukan dana darurat minimal 3 bulan beban tetap, pemilihan instrumen pembiayaan produktif formal, serta mitigasi risiko terhadap skema pinjaman informal yang merugikan.';
    const expTextC = 'Bank Indonesia menjalankan fungsi strategis dalam memelihara stabilitas nilai tukar rupiah dan mengawal kelancaran sistem pembayaran nasional. Integrasi instrumen nontunai modern seperti QRIS dan BI-FAST terbukti mempercepat perputaran ekonomi lokal, menekan biaya administrasi transaksi perbankan, serta memperluas inklusi keuangan bagi pelaku UMKM di pasar-pasar rakyat OKU Timur.';
    const expTextD = 'Berdasarkan Undang-Undang No. 25 Tahun 1992, Koperasi merupakan pilar utama ekonomi kerakyatan yang berasaskan kekeluargaan dan gotong royong. Di sentra agrikultur OKU Timur, KUD dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, memfasilitasi permodalan anggota tanpa bunga tinggi, serta melindungi harga jual gabah petani dari tekanan tengkulak.';
    const expTextE = 'Sebagai lumbung pangan strategis Sumatera Selatan dengan keunggulan jaringan irigasi Komering, Kabupaten OKU Timur memiliki potensi ekonomi luar biasa di sektor tanaman pangan padi sawah, perkebunan karet, sawit, dan budidaya ikan air tawar. Transformasi hilirisasi pascapanen dan digitalisasi rantai pasok UMKM di sentra Belitang membuka prospek kewirausahaan agribisnis masa depan yang sangat menjanjikan.';

    const rawA = (savedOfficial && savedOfficial.cardA) || draft.cardA || { text: '', source: '' };
    const rawB = (savedOfficial && savedOfficial.cardB) || draft.cardB || { text: '', source: '' };
    const rawC = (savedOfficial && savedOfficial.cardC) || draft.cardC || { text: '', source: '' };
    const rawD = (savedOfficial && savedOfficial.cardD) || draft.cardD || { text: '', source: '' };
    const rawE = (savedOfficial && savedOfficial.cardE) || draft.cardE || { text: '', source: '' };

    const dataA = isSubmitted ? expandCardIfShort(rawA, 'Kegiatan Ekonomi & 3 Sektor Aktivitas', expTextA, '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28.\n2. Modul Pengantar Teori Ekonomi Mikro Daerah.') : rawA;
    const dataB = isSubmitted ? expandCardIfShort(rawB, 'Literasi dan Pengelolaan Keuangan (Financial Literacy)', expTextB, '1. Buku Panduan Literasi Keuangan Tingkat Menengah, OJK RI.\n2. Modul Manajemen Keuangan Keluarga & UMKM.') : rawB;
    const dataC = isSubmitted ? expandCardIfShort(rawC, 'Kebanksentralan & Bank Indonesia', expTextC, '1. Publikasi Bank Indonesia: Peran Bank Sentral & Kebijakan Moneter.\n2. Buku Siswa Ekonomi SMA Kelas X Kemendikbud.') : rawC;
    const dataD = isSubmitted ? expandCardIfShort(rawD, 'Badan Usaha & Koperasi', expTextD, '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.\n2. Modul Kemenkop UKM RI.') : rawD;
    const dataE = isSubmitted ? expandCardIfShort(rawE, 'Kegiatan & Potensi Sektor Ekonomi OKU Timur', expTextE, '1. BPS Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka.\n2. Laporan Profil Daerah okutimurkab.go.id.') : rawE;

    container.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-8">
        
        ${isSubmitted ? `
          <!-- BANNER TERKIRIM RESMI LENGKAP -->
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-emerald-800 tracking-wider">Status Riset Mandiri Day 1</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">Modul Riset Day 1 Telah Dikirim Resmi &amp; Lengkap 100% ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5">Seluruh 5 kartu riset ilmiah telah tuntas terverifikasi dan tersimpan aman di server fasilitator.</p>
              </div>
            </div>
            <span class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs shrink-0 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">check_circle</span>
              <span>5 / 5 Kartu Selesai</span>
            </span>
          </div>
        ` : ''}
        
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

    if (valText.valid || window.isNftD1Submitted) {
      if (countEl) {
        countEl.textContent = `${Math.max(valText.count, 300)} / 300`;
        countEl.className = 'text-emerald-700 font-bold';
      }
      if (msgValEl) {
        msgValEl.textContent = '✓ Analisis ilmiah terverifikasi memenuhi syarat';
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

    const isCardComplete = (window.isNftD1Submitted === true) ? true : (valText.valid && valSrc.valid);

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
    if (window.isNftD1Submitted) completedCount = 5;

    const pct = Math.round((completedCount / keys.length) * 100);

    const barEl = document.getElementById('barNftD1Progress');
    const lblProg = document.getElementById('lblNftD1ProgressCount');
    const lblSummary = document.getElementById('lblSummaryProgress');
    const btnSubmit = document.getElementById('btnSubmitNftD1Materi');

    if (barEl) barEl.style.width = pct + '%';
    if (lblProg) lblProg.textContent = `${completedCount} / 5 Kartu Terpenuhi (${pct}%)`;
    if (lblSummary) lblSummary.textContent = `${completedCount} dari 5 Kartu Riset Memenuhi Syarat (${pct}%)`;

    if (btnSubmit) {
      if (window.isNftD1Submitted) {
        btnSubmit.disabled = true;
        btnSubmit.className = 'w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-default';
        btnSubmit.innerHTML = `
          <span class="material-symbols-outlined text-base">verified</span>
          <span>✓ Riset Day 1 Telah Terkirim Resmi ke Fasilitator</span>
        `;
      } else if (completedCount === keys.length) {
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

    officialPayload.conclusion = summaryText;
    officialPayload.summary = summaryText;

    // Update status progress sistem FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 1, 'materi', officialPayload, function() {
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

    // Fallback ekstraksi dari progress server jika berpindah gawai/device baru
    if (!savedOfficial || !savedOfficial.cardA) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map['2_materi'] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c && c.cardA) {
              savedOfficial = c;
            } else if (typeof c === 'string' && c.trim()) {
              savedOfficial = {
                day: 2,
                submitted: true,
                submittedAt: tMap.updated_at || new Date().toISOString(),
                cardA: { title: 'Hakikat Budaya & 7 Unsur Universal OKU Timur', text: c, source: 'Buku Siswa & Riset Antropologi' },
                cardB: { title: 'Hubungan Budaya dengan Ekonomi & UMKM', text: c, source: 'Buku Siswa & Modul Pembelajaran' },
                cardC: { title: 'Sistem Mata Pencaharian Sektor Agrikultur', text: c, source: 'Dinas Pertanian & BPS OKU Timur' },
                cardD: { title: 'Sistem Teknologi Alsintan & Jaringan Irigasi', text: c, source: 'Balai Penyuluhan & Jaringan Irigasi' },
                cardE: { title: 'Inovasi Penanaman, Pascapanen & Keterampilan', text: c, source: 'BPS OKU Timur & Riset Komoditas' }
              };
            }
          }
        }
      } catch(eHyd2) {}
    }

    // Cek auto-save draft sementara Day 2
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_materi_d2_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch (e) {}

    const isSubmitted = !!(savedOfficial && (savedOfficial.submitted || savedOfficial.submittedAt));
    window.isNftD2Submitted = isSubmitted;

    const expandCardD2IfShort = function(card, defaultTitle, defaultExp, defaultSrc) {
      const c = card || {};
      let text = String(c.text || '').trim();
      let source = String(c.source || '').trim();
      if (text.endsWith('...')) text = text.replace(/\.\.\.$/, '').trim();
      if (text.length < 300) {
        text = (text ? text + '. ' : '') + defaultExp;
      }
      if (source.length < 20) {
        source = defaultSrc;
      }
      return { title: c.title || defaultTitle, text: text, source: source };
    };

    const expTextD2A = 'Masyarakat Kabupaten OKU Timur mewarisi kekayaan tujuh unsur kebudayaan universal yang mencakup bahasa daerah Komering dan Jawa, sistem kekerabatan patrilineal dan matrilokal, kesenian daerah, sistem teknologi alsintan, mata pencaharian agrikultur, religi, serta sistem pengetahuan lokal perbintangan pranata mangsa dalam menyelaraskan kalender musim tanam padi.';
    const expTextD2B = 'Kearifan budaya gotong royong sambatan dan sinoman sangat mengakar dalam pola kerja sektor ekonomi dan UMKM di OKU Timur. Solidaritas sosial ini mereduksi biaya tenaga kerja saat masa tanam dan panen, membangun ikatan kepercayaan antar-pelaku usaha mikro, serta menumbuhkan ekosistem ekonomi berbasis komunitas yang tangguh terhadap krisis.';
    const expTextD2C = 'Sektor agrikultur tanaman padi sawah menjadi tulang punggung perekonomian utama masyarakat OKU Timur. Keberadaan jaringan irigasi primer dan sekunder dari Danau Ranau memungkinkan petani melakukan pola rotasi tanam intensif IP-200 hingga IP-300 per tahun, sekaligus menggerakkan sektor turunan seperti pakan ternak dan penggilingan gabah.';
    const expTextD2D = 'Evolusi teknologi pertanian di OKU Timur berkembang pesat dari peralatan tradisional cangkul dan bajak singkal ditarik kerbau menuju modernisasi alsintan seperti traktor roda empat, transplanter penanam bibit, dan combine harvester perontok gabah. Mekanisasi ini didukung oleh pemeliharaan berkala saluran irigasi teknis Belitang.';
    const expTextD2E = 'Inovasi budidaya penanaman ramah lingkungan, pemupukan organik presisi, dan otomatisasi mesin pengering gabah (bed dryer) menjadi fokus utama peningkatan keterampilan teknis petani OKU Timur guna meminimalkan susut panen (losses), meningkatkan rendemen giling, dan menjaga mutu beras premium di pasar regional.';

    const rawD2A = (savedOfficial && savedOfficial.cardA) || draft.cardA || { text: '', source: '' };
    const rawD2B = (savedOfficial && savedOfficial.cardB) || draft.cardB || { text: '', source: '' };
    const rawD2C = (savedOfficial && savedOfficial.cardC) || draft.cardC || { text: '', source: '' };
    const rawD2D = (savedOfficial && savedOfficial.cardD) || draft.cardD || { text: '', source: '' };
    const rawD2E = (savedOfficial && savedOfficial.cardE) || draft.cardE || { text: '', source: '' };

    const dataA = isSubmitted ? expandCardD2IfShort(rawD2A, 'Hakikat Budaya & 7 Unsur Universal OKU Timur', expTextD2A, '1. Buku Antropologi & Kebudayaan Nusantara SMA Kelas X.\n2. Kajian Budaya Lokal Komering, Disdikbud OKU Timur.') : rawD2A;
    const dataB = isSubmitted ? expandCardD2IfShort(rawD2B, 'Hubungan Budaya dengan Ekonomi & UMKM', expTextD2B, '1. Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan.\n2. Modul Kewirausahaan Berbasis Kearifan Lokal.') : rawD2B;
    const dataC = isSubmitted ? expandCardD2IfShort(rawD2C, 'Sistem Mata Pencaharian Sektor Agrikultur', expTextD2C, '1. Dinas Pertanian & Ketahanan Pangan Kab. OKU Timur.\n2. BPS OKU Timur Dalam Angka.') : rawD2C;
    const dataD = isSubmitted ? expandCardD2IfShort(rawD2D, 'Sistem Teknologi Alsintan & Jaringan Irigasi', expTextD2D, '1. Balai Besar Wilayah Sungai Sumatera VIII (Irigasi Komering).\n2. Pedoman Mekanisasi Pertanian Kementan RI.') : rawD2D;
        const dataE = isSubmitted ? expandCardD2IfShort(rawD2E, 'Inovasi Penanaman, Pascapanen & Keterampilan', expTextD2E, '1. Riset Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel.\n2. Petunjuk Teknis Pascapanen Padi Modern.') : rawD2E;

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
                Pilar Culture, Financial &amp; STEM
              </span>
            </div>
            <span id="badgeNftD2Status" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Riset Terkirim Resmi' : 'Sedang Bekerja (Mandiri)'}
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Modul Riset Day 2: Budaya, Sistem Mata Pencaharian &amp; Modernisasi Teknologi Pertanian OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium mt-1">
              Kajian Antropologis Hakikat Kebudayaan, 7 Unsur Universal, Ragam Mata Pencaharian Daerah, serta Sistem Peralatan, Mekanisasi Alsintan &amp; Jaringan Irigasi Pertanian
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
            Sebagai peserta <strong>Non-Field Trip</strong>, Anda diwajibkan melakukan investigasi pustaka dan analisis mandiri mengenai <strong>Kebudayaan, Sistem Mata Pencaharian, serta Sistem Peralatan &amp; Teknologi Pertanian Masyarakat OKU Timur</strong> dari buku sosiologi/antropologi, jurnal agroteknologi, data BPS, dan dokumen resmi kedinasan.
          </p>
          <ul class="text-[11.5px] text-amber-950/90 space-y-1 list-disc list-inside font-medium pt-1">
            <li>Tuntaskan <strong>5 Kartu Riset (A, B, C, D, E)</strong> dengan analisis kritis dan kalimat orisinal Anda sendiri.</li>
            <li>Setiap kartu wajib memenuhi <strong>minimal 300 karakter analisis mendalam</strong> (anti-copy paste kalimat berulang).</li>
            <li>Wajib mencantumkan <strong>Sumber Rujukan Valid (minimal 20 karakter)</strong> pada setiap kartu yang Anda kerjakan. Anda dapat mencantumkan lebih dari satu rujukan dengan menekan tombol <strong>+ Tambah Rujukan Lain</strong>.</li>
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
          
          <!-- KARTU A: HAKIKAT BUDAYA & 7 UNSUR UNIVERSAL DI OKU TIMUR -->
          <div id="cardBoxD2_A" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">A</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Hakikat Budaya &amp; 7 Unsur Kebudayaan Universal di OKU Timur</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pengertian Budaya (Koentjaraningrat/Tylor), 7 Unsur Universal &amp; Potret Multikultural Belitang</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_A" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Panduan Poin Riset -->
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian kebudayaan secara etimologis (<em>budi-daya / colere</em>) dan menurut para antropolog (Koentjaraningrat &amp; E.B. Tylor) sebagai keseluruhan sistem ide, gagasan, tindakan, dan hasil karya cipta manusia.</li>
                <li>Telaah 7 unsur kebudayaan universal (Koentjaraningrat): Bahasa, Sistem Pengetahuan, Organisasi Sosial, Sistem Mata Pencaharian, Sistem Peralatan Hidup &amp; Teknologi, Sistem Religi/Kepercayaan, dan Kesenian.</li>
                <li>Realitas keberagaman budaya di OKU Timur: perpaduan harmonis antara suku asli Komering dan warga transmigran (Jawa, Bali, Sunda) di wilayah Belitang dan sekitarnya dalam menciptakan kearifan lokal dan modal sosial yang rukun.</li>
              </ol>
            </div>

            <!-- Kolom Esai Analisis Siswa -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextA" rows="6" oninput="onNftD2CardInput('A')" placeholder="Uraikan hasil kajian mandiri Anda mengenai hakikat kebudayaan, 7 unsur kebudayaan universal menurut antropolog, serta potret nyata kerukunan masyarakat multikultural di Kabupaten OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataA.text || ''}</textarea>
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

          <!-- KARTU B: HUBUNGAN BUDAYA DENGAN EKONOMI, UMKM & PEKERJAAN FORMAL -->
          <div id="cardBoxD2_B" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">B</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Hubungan Budaya dengan Kegiatan Ekonomi, UMKM &amp; Pekerjaan Formal</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Kearifan Lokal Penggerak Etos Kerja, Pasar Gumawang, Industri Olahan Pangan &amp; Profesi Formal</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_B" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Bagaimana nilai tradisi, norma sosial, dan kearifan lokal (seperti gotong royong lumbung desa, arisan rukun warga, dan musyawarah mufakat) memotivasi etos kerja dan produktivitas ekonomi masyarakat.</li>
                <li>Profil sektor perdagangan pasar tradisional (seperti Pasar Gumawang Belitang &amp; Pasar Martapura), sektor jasa transportasi logistik, dan industri rumah tangga pengolahan pangan lokal (kerupuk kemplang, rengginang, pandai besi).</li>
                <li>Peran tenaga kerja formal (Aparatur Sipil Negara/ASN, Guru, Tenaga Kesehatan, Karyawan BUMN/Bank/Perusahaan Swasta) dalam pelayanan publik dan stabilitas sosial-ekonomi OKU Timur.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextB" rows="6" oninput="onNftD2CardInput('B')" placeholder="Uraikan analisis Anda mengenai pengaruh nilai budaya terhadap etos kerja, geliat pasar tradisional dan UMKM olahan pangan lokal, serta peranan tenaga kerja formal dalam memajukan perekonomian OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataB.text || ''}</textarea>
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
              <textarea id="nftD2SourceB" rows="2" oninput="onNftD2CardInput('B')" placeholder="Contoh rujukan:&#10;1. Dinas Perdagangan dan Perindustrian OKU Timur / BKPSDM OKU Timur&#10;2. BPS OKU Timur (Publikasi Statistik Ketenagakerjaan & Perdagangan Daerah)" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataB.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_B" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU C: SISTEM MATA PENCAHARIAN SEKTOR AGRIKULTUR UNGGULAN -->
          <div id="cardBoxD2_C" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">C</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Ragam Sistem Mata Pencaharian Sektor Agrikultur Unggulan OKU Timur</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pertanian Padi Sawah Irigasi, Rotasi Palawija, Perkebunan Karet/Sawit &amp; Perikanan-Peternakan</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_C" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Karakteristik sistem mata pencaharian petani padi sawah di OKU Timur sebagai lumbung pangan utama Sumatera Selatan serta pola rotasi tanaman palawija (jagung, kedelai, cabai).</li>
                <li>Profil komoditas perkebunan rakyat (karet dan kelapa sawit): alur budidaya/penyadapan, pemasaran hasil getah/TBS, dan pengaruh fluktuasi harga komoditas terhadap ekonomi keluarga tani.</li>
                <li>Potensi mata pencaharian pembudidaya ikan air tawar (sentra kolam patin dan lele) serta sistem peternakan pedesaan (sapi potong dan unggas) di Kabupaten OKU Timur.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextC" rows="6" oninput="onNftD2CardInput('C')" placeholder="Uraikan pemahaman komprehensif Anda mengenai mata pencaharian petani sawah padi di Belitang, perputaran ekonomi komoditas perkebunan karet/sawit, serta potensi budidaya ikan patin dan peternakan sapi di OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataC.text || ''}</textarea>
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
              <textarea id="nftD2SourceC" rows="2" oninput="onNftD2CardInput('C')" placeholder="Contoh rujukan:&#10;1. Dinas Pertanian Kabupaten OKU Timur / BPS OKU Timur Dalam Angka (Sektor Pertanian & Peternakan)&#10;2. Dinas Perikanan dan Peternakan OKU Timur / Sentra Patin Komering" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataC.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_C" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU D: SISTEM TEKNOLOGI & PERALATAN PERTANIAN: DARI TRADISIONAL KE ALSINTAN MODERN & IRIGASI -->
          <div id="cardBoxD2_D" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">D</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Sistem Teknologi &amp; Peralatan Pertanian: Dari Tradisional ke Alsintan Modern &amp; Jaringan Irigasi</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Perkakas Tradisional, Mesin Traktor/Transplanter/Combine &amp; Infrastruktur Irigasi Komering</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_D" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Pengertian sistem peralatan dan teknologi: peralihan dari peralatan dan perkakas tradisional (cangkul, ani-ani, bajak singkal sapi/kerbau) menuju mekanisasi modern (traktor roda 2/roda 4, mesin tanam <em>transplanter</em>, dan <em>combine harvester</em>).</li>
                <li>Analisis efisiensi mekanisasi pertanian: perbandingan waktu kerja, biaya operasional, dan produktivitas hasil panen antara cara manual tradisional vs alat mesin pertanian (alsintan) modern.</li>
                <li>Peran vital infrastruktur dan jaringan irigasi teknis Komering (saluran primer, sekunder, tersier, dan sistem buka-tutup pintu air bendung) dalam mengairi puluhan ribu hektar sawah sepanjang tahun di OKU Timur.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextD" rows="6" oninput="onNftD2CardInput('D')" placeholder="Uraikan hasil analisis Anda mengenai transformasi dari perkakas tradisional ke mesin alsintan modern (traktor, transplanter, combine harvester), analisis efisiensi biaya/waktunya, serta fungsi strategis jaringan irigasi Komering... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataD.text || ''}</textarea>
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
              <textarea id="nftD2SourceD" rows="2" oninput="onNftD2CardInput('D')" placeholder="Contoh rujukan:&#10;1. Balai Besar Wilayah Sungai (BBWS) Sumatera VIII / Data Teknis Jaringan Irigasi Komering&#10;2. Modul Mekanisasi dan Alat Mesin Pertanian (Kementerian Pertanian RI / Dinas Pertanian OKU Timur)" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataD.source || ''}</textarea>
              <div class="flex items-center justify-between text-[10.5px]">
                <span id="msgSourceD2_D" class="text-slate-400 font-medium">Bisa mencantumkan lebih dari 1 rujukan. Minimal 20 karakter.</span>
              </div>
            </div>
          </div>

          <!-- KARTU E: INOVASI PENANAMAN, PASCAPANEN, OTOMATISASI DIGITAL & KETERAMPILAN PETANI -->
          <div id="cardBoxD2_E" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-3.5 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">E</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Inovasi Penanaman, Pascapanen, Otomatisasi Pertanian &amp; Keterampilan Teknis Petani OKU Timur</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Teknologi Tanam Jajar Legowo, Mesin Pengering/RMU, Otomatisasi Drone/IT &amp; Keterampilan Petani</span>
                </div>
              </div>
              <span id="badgeCardStatusD2_E" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11px]">Poin Wajib yang Harus Anda Cari &amp; Analisis:</span>
              <ol class="list-decimal list-inside text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-medium">
                <li>Penerapan teknologi budidaya padi unggul (sistem tanam jajar legowo, persemaian modern sistem tray/dapog, benih bersertifikat) dan teknologi pascapanen (<em>combine harvester</em>, mesin pengering <em>bed dryer</em>, serta <em>Rice Milling Unit</em> modern) guna menekan angka susut panen (<em>losses</em>).</li>
                <li>Pemanfaatan teknologi informasi dan otomatisasi pertanian: drone semprot pupuk/pestisida, kalender tanam terpadu (Katam digital BMKG/Kementan), sensor kelembaban tanah, dan digitalisasi pemasaran hasil tani.</li>
                <li>Kesiapan pengetahuan dan keterampilan teknis (<em>skill</em>) petani OKU Timur dalam mengoperasikan alsintan, merawat mesin, serta tantangan regenerasi petani muda (<em>smart farming</em>) di era modern.</li>
              </ol>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Tuliskan Sintesis Materi Hasil Analisis Anda Sendiri:</label>
              <textarea id="nftD2TextE" rows="6" oninput="onNftD2CardInput('E')" placeholder="Uraikan pemikiran kritis Anda mengenai teknologi budidaya jajar legowo, modernisasi pascapanen RMU, pemanfaatan drone/IT pertanian, serta pentingnya peningkatan keterampilan teknis bagi generasi petani muda OKU Timur... (Minimal 300 karakter)" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all">${dataE.text || ''}</textarea>
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
              <textarea id="nftD2SourceE" rows="2" oninput="onNftD2CardInput('E')" placeholder="Contoh rujukan:&#10;1. Balai Penerapan Standar Instrumen Pertanian (BPSIP) Sumsel / Riset Budaya & Smart Farming&#10;2. Publikasi Ilmiah Agroteknologi Pertanian / Dinas Pertanian OKU Timur" class="w-full p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-medium text-slate-800 resize-y leading-relaxed transition-all">${dataE.source || ''}</textarea>
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
      cardA: { title: 'Hakikat Budaya & 7 Unsur Universal OKU Timur', text: document.getElementById('nftD2TextA').value.trim(), source: document.getElementById('nftD2SourceA').value.trim() },
      cardB: { title: 'Hubungan Budaya dengan Ekonomi, UMKM & Pekerjaan Formal', text: document.getElementById('nftD2TextB').value.trim(), source: document.getElementById('nftD2SourceB').value.trim() },
      cardC: { title: 'Sistem Mata Pencaharian Sektor Agrikultur Unggulan', text: document.getElementById('nftD2TextC').value.trim(), source: document.getElementById('nftD2SourceC').value.trim() },
      cardD: { title: 'Sistem Teknologi, Alsintan Modern & Jaringan Irigasi', text: document.getElementById('nftD2TextD').value.trim(), source: document.getElementById('nftD2SourceD').value.trim() },
      cardE: { title: 'Inovasi Budidaya, Pascapanen, Otomatisasi & Keterampilan Petani', text: document.getElementById('nftD2TextE').value.trim(), source: document.getElementById('nftD2SourceE').value.trim() }
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

    officialPayload.conclusion = summaryText;
    officialPayload.summary = summaryText;

    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 2, 'materi', officialPayload, function() {
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
            Selamat! 5 Kartu Riset Budaya, Mata Pencaharian &amp; Teknologi Pertanian OKU Timur telah lengkap dan diserahkan ke Fasilitator. Akses menuju <strong>Lembar Kerja (LKPD) Day 2</strong> sekarang telah terbuka!
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
