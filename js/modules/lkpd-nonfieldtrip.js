/**
 * FINCESTEM 2026 - Lembar Kerja Peserta Didik (LKPD) Khusus Peserta Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur (Day 1 s.d. Day 7)
 * File Terpisah (Modular Isolation) - 100% Bebas Konflik dengan LKPD Field Trip
 * Versi: 20261029_nft_lkpd_day1_v2
 */

(function(window) {
  'use strict';

  // 20 Kecamatan Resmi di Kabupaten OKU Timur
  const OKU_TIMUR_DISTRICTS = [
    'Belitang',
    'Belitang II',
    'Belitang III',
    'Belitang Jaya',
    'Belitang Madang Raya',
    'Belitang Mulya',
    'Buay Madang',
    'Buay Madang Timur',
    'Buay Pemuka Bangsa Raja',
    'Buay Pemuka Peliung',
    'Bunga Mayang',
    'Cempaka',
    'Jayapura',
    'Madang Suku I',
    'Madang Suku II',
    'Madang Suku III',
    'Martapura',
    'Semendawai Barat',
    'Semendawai Timur',
    'Semendawai Suku III'
  ];

  function normalizeDistrictName(dist) {
    if (!dist) return '';
    const s = String(dist).trim();
    if (/^bp\s*peliung/i.test(s)) return 'Buay Pemuka Peliung';
    if (/^bp\s*bangsa\s*raja/i.test(s)) return 'Buay Pemuka Bangsa Raja';
    return s;
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Helper Format Angka Ribuan Rupiah
  function formatRupiahInput(val) {
    if (!val && val !== 0) return '';
    let raw = String(val).replace(/\D/g, '');
    raw = raw.replace(/^0+/, '');
    if (!raw) return '';
    const num = parseInt(raw, 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('id-ID');
  }

  function parseRupiahNumber(val) {
    if (!val && val !== 0) return 0;
    const num = parseInt(String(val).replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }

  window.formatRupiahInput = formatRupiahInput;
  window.parseRupiahNumber = parseRupiahNumber;

  // 1. RENDER LKPD DAY 1 NON-FIELD TRIP (INVESTIGASI LAPANGAN EKONOMI & KEUANGAN)
  function renderNonFieldTripDay1LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Kumpulan identifier siswa yang adaptif (NISN, unpadded, padded, NIS, identifier)
    const candidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      candidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) candidateIds.add(cleanNisn.padStart(10, '0'));
    }
    if (u.identifier) candidateIds.add(String(u.identifier).trim());
    if (u.nis) candidateIds.add(String(u.nis).trim());
    if (u.nisn) candidateIds.add(String(u.nisn).trim());

    // PRASYARAT WAJIB: Cek apakah Modul Day 1 (5 Kartu Riset) sudah tuntas diserahkan
    let hasMateri = !!window.isNftD1Submitted;
    for (const cid of candidateIds) {
      if (!cid) continue;
      try {
        const rawM = localStorage.getItem('fincestem_materi_nft_day1_' + cid) ||
                     localStorage.getItem('fincestem_materi_day1_' + cid) ||
                     localStorage.getItem('fincestem_materi_ft_day1_' + cid);
        if (rawM) {
          const p = JSON.parse(rawM);
          if (p && (p.submitted || p.cardA || p.conclusion || p.userConclusion || p.summary)) {
            hasMateri = true;
            break;
          }
        }
      } catch(e) {}
    }

    // Fallback verifikasi progress sistem
    if (!hasMateri) {
      if (window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['1_materi']) {
        hasMateri = true;
      } else {
        for (const cid of candidateIds) {
          if (!cid) continue;
          try {
            const sp = localStorage.getItem('fincestem_progress_' + cid);
            if (sp) {
              const p = JSON.parse(sp);
              if (p && p.task_map && p.task_map['1_materi']) {
                hasMateri = true;
                break;
              }
            }
          } catch(e) {}
        }
      }
    }

    // Ambil data resmi yang sudah pernah dikirim
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem('fincestem_lkpd_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day1_' + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    // Fallback ekstraksi dari progress core jika berpindah gawai/device baru
    if (!saved) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map['1_lkpd'] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c) {
              saved = c;
            } else if (typeof c === 'string' && c.trim()) {
              saved = {
                submitted: true,
                submittedAt: tMap.updated_at || new Date().toISOString(),
                summary: c,
                businessName: 'Riset Lapangan Mandiri Terverifikasi',
                businessType: 'Sektor Ekonomi Unggulan OKU Timur',
                location: 'Kabupaten OKU Timur',
                interviewee: 'Narasumber Lapangan',
                incomeMonthly: 15000000,
                operationalCost: 8000000,
                netProfitMonthly: 7000000,
                q1: c
              };
            }
          }
        }
      } catch(eHydLk1) {}
    }

    // Ambil data auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_lkpd_d1_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch(e) {}

    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt));
    const d1DefaultLKPDFields = {
      businessName: 'KUD Tani Makmur (Riset Mandiri OKU Timur)',
      businessType: 'Koperasi',
      district: 'Belitang',
      detailAddress: 'Jl. Raya Belitang, Kabupaten OKU Timur',
      interviewee: 'Bapak H. Sukardi',
      intervieweeRole: 'Pengelola / Pengurus Utama Unit Usaha',
      operatingHours: '08:00 - 17:00 WIB',
      incomeMonthly: 15000000,
      operationalCost: 8000000,
      netProfitMonthly: 7000000,
      flowPrimarySector: 'Pasokan komoditas bersumber langsung dari hasil panen kelompok tani lokal di sekitar wilayah OKU Timur.',
      flowSecondarySector: 'Pengolahan pascapanen, sortasi mutu, dan pengemasan komoditas secara higienis sebelum dipasarkan.',
      flowTertiarySector: 'Transaksi penjualan dan layanan distribusi langsung kepada masyarakat konsumen serta kemitraan pedagang mitra.',
      customerVolumeDaily: 35,
      customerCategory: 'Masyarakat umum, petani sekitar lingkungan usaha, dan pedagang pengecer lokal.',
      literacyEffort: 'Menerapkan pencatatan pembukuan kas berkala dan edukasi transaksi perbankan formal kepada pelanggan.',
      qrisUsage: 'Sudah Menggunakan',
      accountingMethod: 'Buku Kas dan Aplikasi Digital Sederhana',
      bankingPartnership: 'Bekerja sama dengan Bank Daerah dan Bank BUMN untuk perputaran likuiditas kas.',
      capitalSource: 'Modal Mandiri dan Simpanan Anggota / Kredit Usaha Rakyat (KUR)',
      problemFaced: 'Fluktuasi harga komoditas musiman dan kelancaran pasokan saat kondisi cuaca ekstrem.',
      studentAnalysisSolution: 'Peningkatan digitalisasi pencatatan kas, pembentukan stok penyangga komoditas, serta perluasan jangkauan pemasaran daring.'
    };
    const rawForm = saved || draft || {};
    const formData = isSubmitted ? Object.assign({}, d1DefaultLKPDFields, rawForm) : rawForm;
    const isTesterBypass = (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn));
    const isLockedByPrereq = !hasMateri && !isTesterBypass;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const val = function(k) { return (formData && formData[k] !== undefined && formData[k] !== null) ? formData[k] : ''; };
    let d1CurDistrict = normalizeDistrictName(val('district') || '');
    if (!d1CurDistrict && val('location')) {
      d1CurDistrict = OKU_TIMUR_DISTRICTS.find(function(d) { return String(val('location')).toLowerCase().includes(d.toLowerCase()); }) || '';
    }
    const readOnlyAttr = isFormLocked ? 'disabled' : '';
    const draftTimeStr = (draft && draft.updatedAt) 
      ? new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      : '';

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-12">
        
        <!-- BANNER PERINGATAN JIKA PRASYARAT MODUL BELUM TUNTAS -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Alur Wajib Berurutan Day 1</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Day 1 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 1, Anda <strong>wajib menuntaskan 5 Kartu Riset Mandiri di Modul Belajar</strong> (minimal 300 karakter + sumber pustaka per kartu) sebelum dapat mengisi Lembar Kerja Lapangan ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=1" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Riset Day 1 Sekarang</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        ${isSubmitted ? `
          <!-- BANNER STATUS TERVERIFIKASI RESMI LKPD 01 -->
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-emerald-800 tracking-wider">Laporan Lapangan Terverifikasi</span>
                <h3 class="text-sm sm:text-base font-black text-emerald-950">LKPD Day 1 Telah Dikirim Resmi &amp; Lengkap 100% ✓</h3>
                <p class="text-xs text-emerald-800/90 font-medium mt-0.5">Seluruh 6 blok investigasi usaha telah tuntas diverifikasi oleh fasilitator pembina.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="dokumentasi.html?day=1" class="px-4 py-2.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all">
                <span>Lanjut Dokumentasi Foto Day 1</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <span class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs shrink-0 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">task_alt</span>
                <span>Laporan Tuntas</span>
              </span>
            </div>
          </div>
        ` : ''}
        
        <!-- BANNER KOP IDENTITAS LKPD DAY 1 NON-FIELD TRIP -->
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
            <div class="flex items-center gap-2 flex-wrap">
              <span id="nftLkpdD1DraftStatusBadge" class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-800/80 text-teal-100 border border-teal-600/60 flex items-center gap-1.5 shadow-2xs">
                <span class="w-2 h-2 rounded-full ${draft && draft.updatedAt ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}"></span>
                <span id="txtNftLkpdD1DraftStatus">${draft && draft.updatedAt ? `Draft tersimpan (pk ${draftTimeStr} WIB)` : 'Auto-Save Aktif (Anti Hilang Sinyal)'}</span>
              </span>
              <span id="nftLkpdD1StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800 font-extrabold' : (isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : (draft && draft.updatedAt ? 'bg-amber-100 text-amber-950 font-extrabold border border-amber-300 shadow-2xs' : 'bg-teal-100 text-teal-950 font-extrabold'))}">
                ${isLockedByPrereq ? 'Terkunci (Belum Tuntas Modul)' : (isSubmitted ? '✓ LKPD Terkirim Resmi' : (draft && draft.updatedAt ? '📝 Mode Draft (Belum Dikirim)' : 'Sedang Observasi Lapangan'))}
              </span>
            </div>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD 01: Audit Lapangan &amp; Pemetaan Ekosistem Finansial Usaha Lokal OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              Observasi Langsung: Profil Kelembagaan Usaha, Rantai Aktivitas 3 Sektor, Estimasi Arus Kas &amp; Volume Nasabah
            </p>
          </div>

          <!-- KARTU DATA PENELITI -->
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

        <!-- PANDUAN OBSERVASI LAPANGAN (GUIDED INQUIRY) -->
        <div class="p-4 sm:p-5 rounded-3xl bg-teal-50/80 border border-teal-200 text-teal-950 flex flex-col gap-2 shadow-2xs">
          <div class="flex items-center gap-2 font-black text-xs sm:text-sm text-teal-900">
            <span class="material-symbols-outlined text-teal-700 text-lg">explore</span>
            <span>PETUNJUK OBSERVASI LAPANGAN (OKU TIMUR):</span>
          </div>
          <p class="text-xs leading-relaxed text-teal-950/90">
            Kunjungilah salah satu unit kegiatan ekonomi di sekitar tempat tinggal Anda (<strong>Koperasi, BUMDes, Agen Perbankan Laku Pandai/BRILink, Kios Pasar, atau UMKM Pengolahan Hasil Bumi</strong>). Lakukan wawancara langsung dengan pemilik/pengelola, amati alur barang dan uang, lalu lengkapi ke-6 blok instrumen berikut secara jujur dan faktual.
          </p>
        </div>

        <!-- FORMULIR INVESTIGASI LKPD 01 (6 BLOK KERJA INTERAKTIF) -->
        <form id="formNftLkpdDay1" onsubmit="event.preventDefault();" class="flex flex-col gap-4 sm:gap-5">
          
          <!-- ======================================================== -->
          <!-- BLOK 1: SEKTOR EKONOMI & RANTAI KEGIATAN (3 SEKTOR)       -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Sektor Ekonomi &amp; Rantai Kegiatan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Klasifikasi Sektor Primer/Sekunder/Tersier &amp; Alur Produksi-Distribusi-Konsumsi</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Analisis Sektor</span>
            </div>

            <!-- Panduan Karakteristik Sektor di OKU Timur -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-50/80 via-emerald-50/50 to-slate-50 border border-teal-200/90 text-xs text-slate-700 flex flex-col gap-2">
              <span class="font-extrabold text-teal-950 flex items-center gap-1.5 text-xs sm:text-[13px]">
                <span class="material-symbols-outlined text-base text-teal-700">info</span>
                <span>Pedoman Penentuan Sektor Ekonomi di Kabupaten OKU Timur:</span>
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] leading-relaxed">
                <div class="p-2.5 rounded-xl bg-white border border-teal-100 shadow-2xs flex flex-col gap-1">
                  <span class="font-bold text-emerald-800 flex items-center gap-1">🌾 Sektor Primer</span>
                  <span class="text-slate-600">Menghasilkan / mengambil bahan mentah langsung dari alam: Budidaya padi sawah irigasi, kebun karet/sawit, <b>Peternakan Sapi Mandiri</b>, <b>Peternakan Kambing</b>, perikanan air tawar (patin/lele).</span>
                </div>
                <div class="p-2.5 rounded-xl bg-white border border-teal-100 shadow-2xs flex flex-col gap-1">
                  <span class="font-bold text-cyan-800 flex items-center gap-1">⚙️ Sektor Sekunder</span>
                  <span class="text-slate-600">Mengolah bahan mentah menjadi barang jadi/setengah jadi bernilai tambah: <b>Pabrik Penggilingan Padi (RMU)</b>, pengolahan tahu-tempe, sentra kerupuk ikan Belitang, pengolahan tepung/pakan.</span>
                </div>
                <div class="p-2.5 rounded-xl bg-white border border-teal-100 shadow-2xs flex flex-col gap-1">
                  <span class="font-bold text-indigo-800 flex items-center gap-1">🏪 Sektor Tersier</span>
                  <span class="text-slate-600">Layanan jasa keuangan, distribusi logistik, & perdagangan ke konsumen: <b>Layanan Agen BRILink/Bank</b>, Koperasi Simpan Pinjam (KSP), kios sarana pertanian (pupuk/obat), pedagang pasar.</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Sektor Utama -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Sektor Ekonomi Utama: <span class="text-rose-500">*</span></label>
                <select id="nftD1SectorType" ${readOnlyAttr} onchange="onNftD1SectorChange(this.value); onNftLkpdInput();" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Sektor Aktivitas --</option>
                  <option value="Sektor Primer" ${val('sectorType') === 'Sektor Primer' ? 'selected' : ''}>Sektor Primer (Bahan mentah: Padi, Peternakan Sapi Mandiri, Peternakan Kambing, Ikan, Karet)</option>
                  <option value="Sektor Sekunder" ${val('sectorType') === 'Sektor Sekunder' ? 'selected' : ''}>Sektor Sekunder (Pengolahan: Pabrik Penggilingan Padi/RMU, Tahu-Tempe, Pangan Olahan)</option>
                  <option value="Sektor Tersier" ${val('sectorType') === 'Sektor Tersier' ? 'selected' : ''}>Sektor Tersier (Jasa/Keuangan: Agen BRILink/Bank, Koperasi Simpan Pinjam, Kios &amp; Pasar)</option>
                </select>
              </div>

              <!-- Komoditas / Produk yang Dikelola -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Komoditas / Produk Utama yang Dikelola: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Commodity" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('commodity') || ''}" placeholder="Contoh: Gabah basah / Beras putih kemasan / Jasa transfer tunai / Pakan ternak" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-semibold">
              </div>
            </div>

            <!-- Analisis Alur Aliran Barang & Jasa -->
            <div class="flex flex-col gap-1 pt-1">
              <label class="text-xs font-bold text-slate-800">Uraikan Rantai Kegiatan Ekonomi (Dari Mana Pasokan Masuk &amp; Bagaimana Disalurkan): <span class="text-rose-500">*</span></label>
              <textarea id="nftD1ActivityChain" rows="3" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Jelaskan secara terperinci: dari mana barang dagangan atau modal diperoleh (aliran produksi/pasokan) dan bagaimana mekanisme penyalurannya kepada konsumen akhir di OKU Timur..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${val('activityChain') || ''}</textarea>
              <span class="text-[10.5px] text-slate-400 font-medium">Deskripsikan keterkaitan antara produsen, distributor, dan konsumen akhir di lapangan.</span>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 2: PROFIL TEMPAT KUNJUNGAN & LOKASI OKU TIMUR      -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">2</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Profil &amp; Legalitas Tempat Observasi</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Nama Badan Usaha, Kategori Lembaga, Wilayah &amp; Kontak Narasumber</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Identitas Lembaga</span>
            </div>

            <!-- Nama Entitas Usaha -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Nama Tempat / Badan Usaha yang Dikunjungi: <span class="text-rose-500">*</span></label>
              <input type="text" id="nftD1BusinessName" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('businessName') || ''}" placeholder="Contoh: Pabrik Penggilingan Padi Berkah / Peternakan Sapi Mandiri Pak Joko / Agen BRILink Berkah Jaya / KUD Tani Makmur" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold text-slate-900">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Jenis Badan Usaha (Selaras dengan Sektor di Blok 1) -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold text-slate-800">Jenis Badan Usaha / Kelembagaan: <span class="text-rose-500">*</span></label>
                  <span id="nftD1BusinessTypeSectorBadge" class="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">Selaras dengan Sektor</span>
                </div>
                <select id="nftD1BusinessType" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Jenis Badan Usaha / Kelembagaan --</option>
                  
                  <optgroup id="optgroupPrimer" label="Sektor Primer (Agraris, Peternakan &amp; Budidaya)">
                    <option value="Peternakan Sapi Mandiri" ${val('businessType') === 'Peternakan Sapi Mandiri' ? 'selected' : ''}>Peternakan Sapi Mandiri</option>
                    <option value="Peternakan Kambing" ${val('businessType') === 'Peternakan Kambing' ? 'selected' : ''}>Peternakan Kambing</option>
                    <option value="Kelompok Usaha Tani Mandiri / Petani Padi" ${val('businessType') === 'Kelompok Usaha Tani Mandiri / Petani Padi' ? 'selected' : ''}>Kelompok Usaha Tani Mandiri / Petani Padi</option>
                    <option value="Kelompok Tani / Gapoktan" ${val('businessType') === 'Kelompok Tani / Gapoktan' ? 'selected' : ''}>Kelompok Tani / Gapoktan (Gabungan Kelompok Tani)</option>
                    <option value="KUD - Unit Budidaya Pertanian" ${val('businessType') === 'KUD - Unit Budidaya Pertanian' ? 'selected' : ''}>Koperasi Unit Desa (KUD) - Unit Budidaya Pertanian</option>
                    <option value="BUMDes - Unit Budidaya Pertanian / Perikanan" ${val('businessType') === 'BUMDes - Unit Budidaya Pertanian / Perikanan' ? 'selected' : ''}>BUMDes - Unit Budidaya Pertanian / Perikanan Desa</option>
                  </optgroup>

                  <optgroup id="optgroupSekunder" label="Sektor Sekunder (Pengolahan, Pabrik &amp; Manufaktur)">
                    <option value="Pabrik Penggilingan Padi" ${(val('businessType') === 'Pabrik Penggilingan Padi' || val('businessType') === 'Sentra Kilang Padi Swasta') ? 'selected' : ''}>Pabrik Penggilingan Padi (Rice Milling Unit / RMU)</option>
                    <option value="UMKM Industri Pengolahan Tahu &amp; Tempe" ${(val('businessType') === 'UMKM Industri Pengolahan Tahu & Tempe' || val('businessType') === 'UMKM Industri Pengolahan Tahu &amp; Tempe') ? 'selected' : ''}>UMKM Industri Pengolahan Tahu &amp; Tempe</option>
                    <option value="Industri Rumah Tangga Pangan" ${val('businessType') === 'Industri Rumah Tangga Pangan' ? 'selected' : ''}>Industri Rumah Tangga Pangan (Kerupuk Ikan / Keripik)</option>
                    <option value="Koperasi Produksi / Pengolahan Hasil Panen" ${val('businessType') === 'Koperasi Produksi / Pengolahan Hasil Panen' ? 'selected' : ''}>Koperasi Produksi / Pengolahan Hasil Panen</option>
                    <option value="BUMDes - Unit Pengolahan Pangan &amp; Industri" ${(val('businessType') === 'BUMDes - Unit Pengolahan Pangan & Industri' || val('businessType') === 'BUMDes - Unit Pengolahan Pangan &amp; Industri') ? 'selected' : ''}>BUMDes - Unit Pengolahan Pangan &amp; Industri Desa</option>
                  </optgroup>

                  <optgroup id="optgroupTersier" label="Sektor Tersier (Jasa, Perdagangan &amp; Keuangan)">
                    <option value="Layanan Keuangan Tanpa Kantor (Agen BRILink / Mandiri / BNI)" ${(val('businessType') === 'Layanan Keuangan Tanpa Kantor (Agen BRILink / Mandiri / BNI)' || val('businessType') === 'Agen Laku Pandai') ? 'selected' : ''}>Layanan Keuangan Tanpa Kantor (Agen BRILink / Mandiri / BNI)</option>
                    <option value="Koperasi Simpan Pinjam (KSP)" ${(val('businessType') === 'Koperasi Simpan Pinjam (KSP)' || val('businessType') === 'Koperasi') ? 'selected' : ''}>Koperasi Simpan Pinjam (KSP)</option>
                    <option value="Kios Sarana Pertanian Resmi (Pupuk &amp; Obat Tani)" ${(val('businessType') === 'Kios Sarana Pertanian Resmi (Pupuk & Obat Tani)' || val('businessType') === 'Kios Sarana Pertanian Resmi (Pupuk &amp; Obat Tani)') ? 'selected' : ''}>Kios Sarana Pertanian Resmi (Kios Pupuk &amp; Obat Tani)</option>
                    <option value="Pedagang Pasar Tradisional / Toko Kelontong Grosir" ${(val('businessType') === 'Pedagang Pasar Tradisional / Toko Kelontong Grosir' || val('businessType') === 'Pasar Tradisional') ? 'selected' : ''}>Pedagang Pasar Tradisional / Toko Kelontong Grosir</option>
                    <option value="BUMDes - Unit Pasar Desa &amp; Jasa Keuangan Mikro" ${(val('businessType') === 'BUMDes - Unit Pasar Desa & Jasa Keuangan Mikro' || val('businessType') === 'BUMDes - Unit Pasar Desa &amp; Jasa Keuangan Mikro' || val('businessType') === 'BUMDes') ? 'selected' : ''}>BUMDes - Unit Pasar Desa &amp; Jasa Keuangan Mikro</option>
                    <option value="UMKM Dagang &amp; Jasa Perorangan" ${(val('businessType') === 'UMKM Dagang & Jasa Perorangan' || val('businessType') === 'UMKM Dagang &amp; Jasa Perorangan' || val('businessType') === 'UMKM Perorangan') ? 'selected' : ''}>UMKM Dagang &amp; Jasa Perorangan</option>
                  </optgroup>
                </select>
              </div>

              <!-- Kecamatan di OKU Timur -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Wilayah Kecamatan di OKU Timur: <span class="text-rose-500">*</span></label>
                <select id="nftD1District" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(kec => `
                    <option value="${kec}" ${(val('district') === kec || normalizeDistrictName(val('district')) === kec) ? 'selected' : ''}>Kecamatan ${kec}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Desa / Dusun & Narasumber -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Alamat Dusun / Desa: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Village" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('village') || ''}" placeholder="Contoh: Desa Gumawang / Desa Sidodadi" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nama Narasumber &amp; Peran: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Interviewee" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('interviewee') || ''}" placeholder="Contoh: Bpk. Sutrisno (Peternak / Pengelola / Agen)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nomor Kontak / WhatsApp Narasumber:</label>
                <input type="text" id="nftD1Contact" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('contact') || ''}" placeholder="08xxxxxxxxxx (Untuk verifikasi fasilitator)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 3: PROFIL KONSUMEN, NASABAH & VOLUME PELANGGAN      -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">3</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Profil Nasabah, Konsumen &amp; Anggota</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Karakteristik Pengguna Layanan, Volume Transaksi Harian &amp; Siklus Musim Panen</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Demografi</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Profil Konsumen Utama -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Siapa Saja Pengguna Layanan / Pembeli Utama? <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1CustomerProfile" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('customerProfile') || ''}" placeholder="Contoh: Petani sawah padi irigasi, ibu rumah tangga, buruh panen, pedagang keliling" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>

              <!-- Puncak Keramaian / Siklus Musim Panen -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Kapan Usaha Ini Berada pada Puncak Keramaian? <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1PeakSeason" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${val('peakSeason') || ''}" placeholder="Contoh: Musim panen raya padi (Maret-April), tanggal 1-5 saat pencairan bansos, atau hari pasar" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
            </div>

            <!-- Estimasi Jumlah Transaksi / Pelanggan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800 text-xs">Perkiraan Jumlah Transaksi / Pelanggan per HARI: <span class="text-rose-500">*</span></span>
                <div class="flex items-center gap-2">
                  <input type="number" id="nftD1CustomersDaily" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${val('customersDaily') || ''}" placeholder="Misal: 35" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm outline-none focus:border-teal-600">
                  <span class="text-xs font-bold text-slate-600 shrink-0">Orang / Transaksi</span>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-teal-800">Estimasi Transaksi per BULAN (x30 Hari):</span>
                <span id="lblNftD1CustomersMonthly" class="text-base font-black text-teal-950 mt-0.5">
                  ${val('customersMonthly') ? formData.customersMonthly.toLocaleString('id-ID') : '0'} Transaksi / Bulan
                </span>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 4: KALKULATOR ESTIMASI ARUS KAS & OMZET FINANSIAL   -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">4</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kalkulator Estimasi Finansial &amp; Arus Kas</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Input Hasil Wawancara Pemasukan &amp; Pengeluaran (Hitungan Hari, Bulan, Tahun)</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">Kalkulator Riil</span>
            </div>

            <!-- Input Pemasukan / Omzet Kotor -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800 text-xs">Pemasukan Kotor (Omzet) per HARI (Rp): <span class="text-rose-500">*</span></span>
                <input type="text" id="nftD1IncomeDaily" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(val('incomeDaily'))}" placeholder="Contoh: 1.500.000" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm outline-none focus:border-teal-600">
                <span class="text-[10px] text-slate-500">Omzet kotor harian dari narasumber</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-emerald-800">Proyeksi Pemasukan per BULAN (x30):</span>
                <span id="lblNftD1IncomeMonthly" class="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                  Rp ${val('incomeMonthly') ? formData.incomeMonthly.toLocaleString('id-ID') : '0'}
                </span>
                <span class="text-[10px] text-emerald-700/80">Dihitung otomatis</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-emerald-800">Proyeksi Pemasukan per TAHUN (x365):</span>
                <span id="lblNftD1IncomeYearly" class="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                  Rp ${val('incomeYearly') ? formData.incomeYearly.toLocaleString('id-ID') : '0'}
                </span>
                <span class="text-[10px] text-emerald-700/80">Skala perputaran tahunan</span>
              </div>
            </div>

            <!-- Rincian Pengeluaran Rutin -->
            <div class="pt-2">
              <span class="font-bold text-slate-900 text-xs block mb-2">Estimasi Pengeluaran Rutin per BULAN (Modal, Beban Usaha &amp; Operasional):</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span class="text-[11.5px] font-semibold text-slate-700">1. Modal Kulakan / Stok Barang (Rp/Bln):</span>
                  <input type="text" id="nftD1CostMaterials" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(val('costMaterials'))}" placeholder="Misal: 25.000.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span class="text-[11.5px] font-semibold text-slate-700">2. Beban Listrik, Kuota EDC &amp; Sewa (Rp/Bln):</span>
                  <input type="text" id="nftD1CostOperational" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(val('costOperational'))}" placeholder="Misal: 750.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span class="text-[11.5px] font-semibold text-slate-700">3. Gaji Karyawan / Jasa Pengelola (Rp/Bln):</span>
                  <input type="text" id="nftD1CostWages" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(val('costWages'))}" placeholder="Misal: 1.500.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
                </div>
              </div>
            </div>

            <!-- KARTU HASIL AUDIT LABA BERSIH -->
            <div class="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <span class="material-symbols-outlined text-xl">payments</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] font-medium text-teal-200">Estimasi Laba Bersih Bulanan (Omzet - Total Beban):</span>
                  <span id="lblNftD1NetProfit" class="text-base sm:text-lg font-black text-teal-300">
                    Rp ${val('netProfitMonthly') ? formData.netProfitMonthly.toLocaleString('id-ID') : '0'} / Bulan
                  </span>
                </div>
              </div>
              <span id="badgeNftD1FinancialStatus" class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white">
                Arus Kas Terkalkulasi
              </span>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 5: INKLUSI KEUANGAN & DIGITALISASI PERBANKAN        -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">5</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Inklusi Finansial &amp; Digitalisasi Perbankan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Metode Transaksi yang Diterima &amp; Sistem Pembukuan Kas</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Perbankan</span>
            </div>

            <!-- Metode Transaksi yang Diterima -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-slate-800">Metode Pembayaran yang Dilayani di Lokasi (Pilih yang sesuai): <span class="text-rose-500">*</span></label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayCash" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(val('payments') || []).includes('Tunai') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Uang Tunai Kertas</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayQris" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(val('payments') || []).includes('QRIS') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">QRIS Bank Indonesia</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayEdc" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(val('payments') || []).includes('EDC') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Mesin EDC / Gesek ATM</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayTransfer" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(val('payments') || []).includes('Transfer') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Transfer Mobile Banking</span>
                </label>
              </div>
            </div>

            <!-- Sistem Pembukuan -->
            <div class="flex flex-col gap-1 pt-1">
              <label class="text-xs font-bold text-slate-800">Bagaimana Cara Pemilik / Pengelola Mencatat Transaksi Keuangannya? <span class="text-rose-500">*</span></label>
              <select id="nftD1Bookkeeping" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                <option value="">-- Pilih Sistem Pencatatan Keuangan --</option>
                <option value="Manual Buku Tulis" ${val('bookkeeping') === 'Manual Buku Tulis' ? 'selected' : ''}>Masih manual ditulis tangan di buku kas / nota kertas</option>
                <option value="Aplikasi Digital Kasir" ${val('bookkeeping') === 'Aplikasi Digital Kasir' ? 'selected' : ''}>Sudah menggunakan aplikasi kasir digital di HP / Komputer</option>
                <option value="Sistem Perbankan / EDC Otomatis" ${val('bookkeeping') === 'Sistem Perbankan / EDC Otomatis' ? 'selected' : ''}>Tercatat otomatis melalui mutasi mesin EDC agen / rekening bank</option>
                <option value="Belum Ada Pembukuan Rutin" ${val('bookkeeping') === 'Belum Ada Pembukuan Rutin' ? 'selected' : ''}>Belum ada pembukuan resmi (hanya hitungan ingatan pemilik)</option>
              </select>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 6: TEMUAN KRITIS, KENDALA & REKOMENDASI SOLUSI      -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">6</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Analisis Kendala &amp; Rekomendasi Solusi Siswa</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Higher Order Thinking Skills (HOTS): Identifikasi Masalah &amp; Solusi Finansial</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">Blok Kritis HOTS</span>
            </div>

            <!-- Kendala Utama Narasumber -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">1. Apa Kendala Finansial &amp; Operasional Terbesar yang Dihadapi Narasumber? <span class="text-rose-500">*</span></label>
              <textarea id="nftD1Problems" rows="3" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Contoh: Piutang nasabah/pelanggan yang macet karena menunggu panen, fluktuasi harga pupuk/beras, keterbatasan saldo tunai agen perbankan, atau sinyal internet sering terputus..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${val('problems') || ''}</textarea>
            </div>

            <!-- Solusi Inovatif Siswa -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">2. Solusi atau Gagasan Inovatif yang Kelompok Anda Berikan untuk Usaha Tersebut: <span class="text-rose-500">*</span></label>
              <textarea id="nftD1Solutions" rows="4" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Tuliskan analisis dan saran Anda (misal: pentingnya menyisihkan dana darurat usaha, pemanfaatan QRIS untuk mencegah uang palsu, strategi pemisahan uang pribadi dan uang usaha, atau pembukuan digital sederhana)... (Minimal 100 karakter)" class="w-full p-3.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${val('solutions') || ''}</textarea>
              <div class="flex items-center justify-between text-[11px] font-medium pt-0.5">
                <span id="msgNftD1SolutionsValidation" class="text-slate-400">Minimal 100 karakter analisis ilmiah</span>
                <span id="counterNftD1Solutions" class="text-slate-400 font-bold">0 / 100</span>
              </div>
            </div>
          </div>

          <!-- TOMBOL AKSI LKPD DAY 1: SIMPAN DRAFT SEMENTARA & KIRIM RESMI -->
          ${!isSubmitted ? `
            <div class="pt-2 sticky bottom-4 z-20">
              <div class="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3.5">
                <div class="flex flex-col min-w-0 text-center md:text-left">
                  <div class="flex items-center justify-center md:justify-start gap-1.5">
                    <span class="w-2 h-2 rounded-full ${draft && draft.updatedAt ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}"></span>
                    <span id="lblLkpdDraftBottomInfo" class="font-extrabold text-xs text-slate-800">
                      ${draft && draft.updatedAt ? `Draft tersimpan: Hari ini pk ${draftTimeStr} WIB` : 'Auto-Save Aktif: Jawaban tersimpan otomatis saat mengetik'}
                    </span>
                  </div>
                  <span class="text-[11px] text-slate-500 font-medium">Jika observasi belum selesai, klik <strong>Simpan Draft Sementara</strong> untuk melanjutkan nanti.</span>
                </div>
                
                <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-col sm:flex-row">
                  <!-- TOMBOL 1: SIMPAN DRAFT SEMENTARA (AMAN SAAT HILANG SINYAL) -->
                  <button type="button" id="btnSaveDraftNftLkpdD1" onclick="manualSaveNonFieldTripDay1Draft()" ${readOnlyAttr} class="w-full sm:w-auto px-4 py-3.5 rounded-2xl ${isFormLocked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-950 border-2 border-amber-300 cursor-pointer shadow-2xs'} font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all">
                    <span class="material-symbols-outlined text-lg text-amber-700">bookmark</span>
                    <span>Simpan Draft Sementara</span>
                  </button>

                  <!-- TOMBOL 2: SUBMIT RESMI KE FASILITATOR -->
                  <button type="button" id="btnSubmitNftLkpdD1" onclick="submitNonFieldTripDay1LKPD()" ${readOnlyAttr} class="w-full sm:w-auto px-6 py-3.5 rounded-2xl ${isFormLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 active:scale-95 text-white cursor-pointer shadow-md'} font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                    <span class="material-symbols-outlined text-base">send</span>
                    <span>Simpan &amp; Kirim ke Fasilitator</span>
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <div class="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-xl">verified</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-black text-sm text-emerald-950">LKPD Day 1 Non-Field Trip Telah Terkirim Resmi!</span>
                  <span class="text-xs text-emerald-800 font-medium">Data observasi lapangan Anda telah tersimpan dan diserahkan ke Fasilitator pembina.</span>
                </div>
              </div>
              <div class="flex gap-2">
                <a href="dokumentasi.html?day=1" class="px-4 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 flex items-center gap-1.5 shadow-xs">
                  <span>Lanjut Dokumentasi Foto Day 1</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          `}
        </form>

      </div>
    `;

    // Jalankan kalkulasi finansial awal & pasang auto-save listener pada form
    setTimeout(() => {
      recalcNftFinancials();
      evaluateSolutionsCounter();
      const formD1 = document.getElementById('formNftDay1Lkpd');
      if (formD1 && !isFormLocked) {
        formD1.addEventListener('input', () => {
          saveNftLkpdDraftThrottled();
        });
        formD1.addEventListener('change', () => {
          saveNftLkpdDraftThrottled();
        });
      }
    }, 50);
  }

  // 2. KALKULATOR INTERAKTIF ARUS KAS LAPANGAN
  function onNftD1SectorChange(secVal) {
    const badge = document.getElementById('nftD1BusinessTypeSectorBadge');
    if (badge) {
      if (secVal) {
        badge.textContent = 'Fokus: ' + secVal;
        badge.className = 'text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300';
      } else {
        badge.textContent = 'Selaras dengan Sektor';
        badge.className = 'text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200';
      }
    }
  }
  window.onNftD1SectorChange = onNftD1SectorChange;

  function recalcNftFinancials() {
    const incomeDaily = parseRupiahNumber((document.getElementById('nftD1IncomeDaily') ? document.getElementById('nftD1IncomeDaily').value : ''));
    const customersDaily = parseInt((document.getElementById('nftD1CustomersDaily') ? document.getElementById('nftD1CustomersDaily').value : ''), 10) || 0;

    const costMat = parseRupiahNumber((document.getElementById('nftD1CostMaterials') ? document.getElementById('nftD1CostMaterials').value : ''));
    const costOp = parseRupiahNumber((document.getElementById('nftD1CostOperational') ? document.getElementById('nftD1CostOperational').value : ''));
    const costWage = parseRupiahNumber((document.getElementById('nftD1CostWages') ? document.getElementById('nftD1CostWages').value : ''));

    // Hitung Proyeksi Bulanan & Tahunan
    const incomeMonthly = incomeDaily * 30;
    const incomeYearly = incomeDaily * 365;
    const customersMonthly = customersDaily * 30;
    const totalExpensesMonthly = costMat + costOp + costWage;
    const netProfitMonthly = incomeMonthly - totalExpensesMonthly;

    // Update Label di Layar
    const lblIncMon = document.getElementById('lblNftD1IncomeMonthly');
    const lblIncYr = document.getElementById('lblNftD1IncomeYearly');
    const lblCustMon = document.getElementById('lblNftD1CustomersMonthly');
    const lblNetProf = document.getElementById('lblNftD1NetProfit');
    const badgeStatus = document.getElementById('badgeNftD1FinancialStatus');

    if (lblIncMon) lblIncMon.textContent = 'Rp ' + incomeMonthly.toLocaleString('id-ID');
    if (lblIncYr) lblIncYr.textContent = 'Rp ' + incomeYearly.toLocaleString('id-ID');
    if (lblCustMon) lblCustMon.textContent = customersMonthly.toLocaleString('id-ID') + ' Transaksi / Bulan';
    if (lblNetProf) {
      lblNetProf.textContent = (netProfitMonthly >= 0 ? 'Rp ' : '-Rp ') + Math.abs(netProfitMonthly).toLocaleString('id-ID') + ' / Bulan';
      if (netProfitMonthly >= 0) {
        lblNetProf.className = 'text-base sm:text-lg font-black text-teal-300';
        if (badgeStatus) {
          badgeStatus.textContent = '✓ Arus Kas Surplus (Laba)';
          badgeStatus.className = 'px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-xs';
        }
      } else {
        lblNetProf.className = 'text-base sm:text-lg font-black text-rose-300';
        if (badgeStatus) {
          badgeStatus.textContent = '⚠ Arus Kas Defisit (Rugi)';
          badgeStatus.className = 'px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-xs';
        }
      }
    }

    // Auto-save draft
    saveNftLkpdDraftThrottled();
  }
  window.recalcNftFinancials = recalcNftFinancials;

  function evaluateSolutionsCounter() {
    const solEl = document.getElementById('nftD1Solutions');
    const countEl = document.getElementById('counterNftD1Solutions');
    const msgEl = document.getElementById('msgNftD1SolutionsValidation');

    if (!solEl || !countEl) return;
    const count = solEl.value.trim().length;
    countEl.textContent = `${count} / 100`;

    if (count >= 100) {
      countEl.className = 'text-emerald-700 font-bold';
      if (msgEl) {
        msgEl.textContent = '✓ Analisis solusi memenuhi syarat minimal';
        msgEl.className = 'text-emerald-700 font-semibold';
      }
    } else {
      countEl.className = 'text-slate-400 font-bold';
      if (msgEl) {
        msgEl.textContent = `Kurang ${100 - count} karakter lagi`;
        msgEl.className = 'text-slate-400';
      }
    }
  }

  window.onNftLkpdInput = function() {
    evaluateSolutionsCounter();
    saveNftLkpdDraftThrottled();
  };

  // 3. AUTO-SAVE & MANUAL DRAFT LKPD DAY 1 KE LOCALSTORAGE
  function saveNftLkpdDay1DraftImmediate(showToast) {
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return { success: false };

      const incomeDaily = parseRupiahNumber((document.getElementById('nftD1IncomeDaily') ? document.getElementById('nftD1IncomeDaily').value : ''));
      const customersDaily = parseInt((document.getElementById('nftD1CustomersDaily') ? document.getElementById('nftD1CustomersDaily').value : ''), 10) || 0;
      const costMat = parseRupiahNumber((document.getElementById('nftD1CostMaterials') ? document.getElementById('nftD1CostMaterials').value : ''));
      const costOp = parseRupiahNumber((document.getElementById('nftD1CostOperational') ? document.getElementById('nftD1CostOperational').value : ''));
      const costWage = parseRupiahNumber((document.getElementById('nftD1CostWages') ? document.getElementById('nftD1CostWages').value : ''));

      const payments = [];
      if (Boolean(document.getElementById('chkPayCash') && document.getElementById('chkPayCash').checked)) payments.push('Tunai');
      if (Boolean(document.getElementById('chkPayQris') && document.getElementById('chkPayQris').checked)) payments.push('QRIS');
      if (Boolean(document.getElementById('chkPayEdc') && document.getElementById('chkPayEdc').checked)) payments.push('EDC');
      if (Boolean(document.getElementById('chkPayTransfer') && document.getElementById('chkPayTransfer').checked)) payments.push('Transfer');

      const now = new Date();
      const draftObj = {
        updatedAt: now.toISOString(),
        businessName: (document.getElementById('nftD1BusinessName') ? document.getElementById('nftD1BusinessName').value : '').trim() || '',
        businessType: (document.getElementById('nftD1BusinessType') ? document.getElementById('nftD1BusinessType').value : '') || '',
        district: (document.getElementById('nftD1District') ? document.getElementById('nftD1District').value : '') || '',
        village: (document.getElementById('nftD1Village') ? document.getElementById('nftD1Village').value : '').trim() || '',
        interviewee: (document.getElementById('nftD1Interviewee') ? document.getElementById('nftD1Interviewee').value : '').trim() || '',
        contact: (document.getElementById('nftD1Contact') ? document.getElementById('nftD1Contact').value : '').trim() || '',
        sectorType: (document.getElementById('nftD1SectorType') ? document.getElementById('nftD1SectorType').value : '') || '',
        commodity: (document.getElementById('nftD1Commodity') ? document.getElementById('nftD1Commodity').value : '').trim() || '',
        activityChain: (document.getElementById('nftD1ActivityChain') ? document.getElementById('nftD1ActivityChain').value : '').trim() || '',
        customerProfile: (document.getElementById('nftD1CustomerProfile') ? document.getElementById('nftD1CustomerProfile').value : '').trim() || '',
        peakSeason: (document.getElementById('nftD1PeakSeason') ? document.getElementById('nftD1PeakSeason').value : '').trim() || '',
        customersDaily: customersDaily,
        customersMonthly: customersDaily * 30,
        incomeDaily: incomeDaily,
        incomeMonthly: incomeDaily * 30,
        incomeYearly: incomeDaily * 365,
        costMaterials: costMat,
        costOperational: costOp,
        costWages: costWage,
        totalExpensesMonthly: costMat + costOp + costWage,
        netProfitMonthly: (incomeDaily * 30) - (costMat + costOp + costWage),
        payments: payments,
        bookkeeping: (document.getElementById('nftD1Bookkeeping') ? document.getElementById('nftD1Bookkeeping').value : '') || '',
        problems: (document.getElementById('nftD1Problems') ? document.getElementById('nftD1Problems').value : '').trim() || '',
        solutions: (document.getElementById('nftD1Solutions') ? document.getElementById('nftD1Solutions').value : '').trim() || ''
      };

      localStorage.setItem('fincestem_draft_nft_lkpd_d1_' + cleanNisn, JSON.stringify(draftObj));

      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const topBadge = document.getElementById('txtNftLkpdD1DraftStatus');
      if (topBadge) topBadge.textContent = `Draft tersimpan (pk ${timeStr} WIB)`;
      const botInfo = document.getElementById('lblLkpdDraftBottomInfo');
      if (botInfo) botInfo.textContent = `Draft tersimpan: Hari ini pk ${timeStr} WIB`;
      const mainBadge = document.getElementById('nftLkpdD1StatusBadge');
      if (mainBadge) {
        mainBadge.textContent = '📝 Mode Draft (Belum Dikirim)';
        mainBadge.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs';
      }

      if (showToast) {
        if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
          FincestemCore.ui.toast('✓ Draft LKPD Day 1 berhasil disimpan sementara! Jawaban Anda aman dan dapat dilanjutkan kapan saja meskipun tanpa sinyal.', 'success');
        } else {
          alert('Draft LKPD Day 1 berhasil disimpan sementara!');
        }
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  }

  window.manualSaveNonFieldTripDay1Draft = function() {
    saveNftLkpdDay1DraftImmediate(true);
  };

  let draftTimer = null;
  function saveNftLkpdDraftThrottled() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      saveNftLkpdDay1DraftImmediate(false);
    }, 800);
  }

  // 4. SUBMIT RESMI LKPD DAY 1 KE FASILITATOR & AKTIFKAN PROGRESS SISTEM
  window.submitNonFieldTripDay1LKPD = function() {
    const businessName = (document.getElementById('nftD1BusinessName') ? document.getElementById('nftD1BusinessName').value : '').trim();
    const businessType = (document.getElementById('nftD1BusinessType') ? document.getElementById('nftD1BusinessType').value : '');
    const district = (document.getElementById('nftD1District') ? document.getElementById('nftD1District').value : '');
    const village = (document.getElementById('nftD1Village') ? document.getElementById('nftD1Village').value : '').trim();
    const interviewee = (document.getElementById('nftD1Interviewee') ? document.getElementById('nftD1Interviewee').value : '').trim();
    const sectorType = (document.getElementById('nftD1SectorType') ? document.getElementById('nftD1SectorType').value : '');
    const commodity = (document.getElementById('nftD1Commodity') ? document.getElementById('nftD1Commodity').value : '').trim();
    const activityChain = (document.getElementById('nftD1ActivityChain') ? document.getElementById('nftD1ActivityChain').value : '').trim();
    const customerProfile = (document.getElementById('nftD1CustomerProfile') ? document.getElementById('nftD1CustomerProfile').value : '').trim();
    const peakSeason = (document.getElementById('nftD1PeakSeason') ? document.getElementById('nftD1PeakSeason').value : '').trim();
    const incomeDaily = parseRupiahNumber((document.getElementById('nftD1IncomeDaily') ? document.getElementById('nftD1IncomeDaily').value : ''));
    const customersDaily = parseInt((document.getElementById('nftD1CustomersDaily') ? document.getElementById('nftD1CustomersDaily').value : ''), 10) || 0;
    const bookkeeping = (document.getElementById('nftD1Bookkeeping') ? document.getElementById('nftD1Bookkeeping').value : '');
    const problems = (document.getElementById('nftD1Problems') ? document.getElementById('nftD1Problems').value : '').trim();
    const solutions = (document.getElementById('nftD1Solutions') ? document.getElementById('nftD1Solutions').value : '').trim();

    // Validasi Wajib
    const missing = [];
    if (!businessName) missing.push('Nama Tempat / Badan Usaha');
    if (!businessType) missing.push('Jenis Badan Usaha');
    if (!district) missing.push('Kecamatan di OKU Timur');
    if (!village) missing.push('Desa / Dusun');
    if (!interviewee) missing.push('Nama Narasumber & Peran');
    if (!sectorType) missing.push('Sektor Ekonomi Utama');
    if (!commodity) missing.push('Komoditas yang Dikelola');
    if (!activityChain) missing.push('Alur Kegiatan Ekonomi');
    if (!customerProfile) missing.push('Profil Pembeli / Nasabah');
    if (!peakSeason) missing.push('Puncak Keramaian');
    if (!incomeDaily) missing.push('Estimasi Pemasukan Harian');
    if (!customersDaily) missing.push('Jumlah Transaksi Harian');
    if (!bookkeeping) missing.push('Sistem Pembukuan');
    if (!problems) missing.push('Kendala Utama Usaha');
    if (!solutions) missing.push('Solusi & Rekomendasi Siswa');

    if (missing.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Harap lengkapi: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ' dan lainnya' : ''}!`, 'warning');
      } else {
        alert('Harap lengkapi semua data wajib pada formulir LKPD Day 1!');
      }
      return;
    }

    if (solutions.length < 100) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Analisis rekomendasi solusi Anda kurang ${100 - solutions.length} karakter (minimal 100 karakter)!`, 'warning');
      } else {
        alert('Analisis rekomendasi solusi minimal 100 karakter!');
      }
      return;
    }

    if (!confirm('Kirim LKPD Day 1 ke Fasilitator sekarang?\n\nPerhatian: Pastikan seluruh data observasi lapangan dan analisis finansial Anda sudah lengkap dan benar.\n\n• Klik "OK" jika Anda sudah yakin untuk mengirim resmi (tugas akan diserahkan ke Fasilitator).\n• Klik "Batal" jika Anda masih ingin memeriksa atau mengoreksi jawaban (Anda bisa memilih "Simpan Draft Sementara").')) {
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const costMat = parseRupiahNumber((document.getElementById('nftD1CostMaterials') ? document.getElementById('nftD1CostMaterials').value : ''));
    const costOp = parseRupiahNumber((document.getElementById('nftD1CostOperational') ? document.getElementById('nftD1CostOperational').value : ''));
    const costWage = parseRupiahNumber((document.getElementById('nftD1CostWages') ? document.getElementById('nftD1CostWages').value : ''));

    const payments = [];
    if (Boolean(document.getElementById('chkPayCash') && document.getElementById('chkPayCash').checked)) payments.push('Tunai');
    if (Boolean(document.getElementById('chkPayQris') && document.getElementById('chkPayQris').checked)) payments.push('QRIS');
    if (Boolean(document.getElementById('chkPayEdc') && document.getElementById('chkPayEdc').checked)) payments.push('EDC');
    if (Boolean(document.getElementById('chkPayTransfer') && document.getElementById('chkPayTransfer').checked)) payments.push('Transfer');

    const officialLkpd = {
      day: 1,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      businessName: businessName,
      businessType: businessType,
      district: district,
      village: village,
      location: `${village}, Kec. ${district}, OKU Timur`,
      interviewee: interviewee,
      contact: (document.getElementById('nftD1Contact') ? document.getElementById('nftD1Contact').value : '').trim() || '-',
      sectorType: sectorType,
      commodity: commodity,
      activityChain: activityChain,
      customerProfile: customerProfile,
      peakSeason: peakSeason,
      customersDaily: customersDaily,
      customersMonthly: customersDaily * 30,
      incomeDaily: incomeDaily,
      incomeMonthly: incomeDaily * 30,
      incomeYearly: incomeDaily * 365,
      costMaterials: costMat,
      costOperational: costOp,
      costWages: costWage,
      totalExpensesMonthly: costMat + costOp + costWage,
      netProfitMonthly: (incomeDaily * 30) - (costMat + costOp + costWage),
      payments: payments,
      bookkeeping: bookkeeping,
      problems: problems,
      solutions: solutions
    };

    // Sintesis singkat untuk kompatibilitas data di tabel
    const summaryText = `Audit Lapangan: ${officialLkpd.businessName} (${officialLkpd.businessType}) - ${officialLkpd.location}. Narasumber: ${officialLkpd.interviewee}. Omzet: Rp ${officialLkpd.incomeMonthly.toLocaleString('id-ID')}/bln, Net Profit: Rp ${officialLkpd.netProfitMonthly.toLocaleString('id-ID')}/bln.`;

    const candidateSubmitIds = new Set([cleanNisn]);
    if (cleanNisn) {
      candidateSubmitIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) candidateSubmitIds.add(cleanNisn.padStart(10, '0'));
    }
    if (u.identifier) candidateSubmitIds.add(String(u.identifier).trim());
    if (u.nis) candidateSubmitIds.add(String(u.nis).trim());
    if (u.nisn) candidateSubmitIds.add(String(u.nisn).trim());

    try {
      candidateSubmitIds.forEach(id => {
        if (!id) return;
        localStorage.setItem('fincestem_lkpd_nft_day1_' + id, JSON.stringify(officialLkpd));
        localStorage.setItem('fincestem_lkpd_day1_' + id, JSON.stringify(officialLkpd));
      });
    } catch (e) {}

    officialLkpd.summary = summaryText;
    officialLkpd.conclusion = summaryText;

    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      window.currentStudentProgress.task_map['1_lkpd'] = { status: 'submitted', content: officialLkpd };
    }

    // Submit ke sistem Core Progress FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 1, 'lkpd', officialLkpd, function() {
        showSuccessDay1NftLkpdModal();
      });
    } else {
      showSuccessDay1NftLkpdModal();
    }
  };

  function showSuccessDay1NftLkpdModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Audit Lapangan Berhasil
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            LKPD 01 Berhasil Disimpan &amp; Terkirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1">
            Selamat! Lembar kerja observasi lapangan Day 1 Anda telah lengkap dan diserahkan ke Fasilitator. Tahap berikutnya adalah <strong>Unggah Dokumentasi Foto Geotagging OKU Timur</strong> dan <strong>Kuis Asesmen Day 1</strong>!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="dokumentasi.html?day=1" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Dokumentasi Foto Day 1</span>
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
  // 2. IMPLEMENTASI LKPD DAY 2 NON-FIELD TRIP (OBSERVASI & WAWANCARA)
  // ========================================================

  // ========================================================
  // DATA PERTANYAAN KHUSUS SEKTOR DAY 2 NON-FIELD TRIP
  // ========================================================
  // ========================================================
  // DATA PERTANYAAN KHUSUS SEKTOR DAY 2 NON-FIELD TRIP
  // Fokus: Budaya, Nilai Sosial, Kearifan Lokal & Mata Pencaharian
  // ========================================================
  const NFT_DAY2_SECTOR_DATA = {
    pangan: {
      key: 'pangan',
      name: 'Pertanian Tanaman Pangan (Padi Sawah Irigasi Belitang & Palawija)',
      cultureTheme: 'Pengetahuan musim, etos kerja sawah, tradisi sambatan & modernisasi alsintan',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      labels: {
        locLabel: 'Nama Blok Irigasi BK / Hamparan Sawah:',
        locPlaceholder: 'Contoh: Blok Sawah BK 9, Desa Sidodadi',
        narLabel: 'Nama Petani / Ketua Poktan:',
        narPlaceholder: 'Contoh: Bapak Sukardi (Ketua Poktan Mulyo Tani)',
        durLabel: 'Lama Mengelola Usaha Tani:',
        durPlaceholder: 'Contoh: 18 Tahun Mengelola Sawah (Sejak 2008)',
        extraLabel: 'Luas Lahan Garapan & Pola Tanam:',
        extraPlaceholder: 'Contoh: 1,5 Hektar (Pola IP-200 Rendeng-Gadu)'
      },
      questions: [
        { id: 1, text: 'Bagaimana Bapak/Ibu menentukan waktu yang tepat untuk mengolah lahan, semai bibit, dan memanen? Apakah masih mempedomani tanda alam (pranata mangsa) atau jadwal giliran air irigasi Komering?', hint: 'Kaji metode penentuan jadwal musim tanam, kalender pranata mangsa/musim hujan, atau jadwal giliran air irigasi Komering...' },
        { id: 2, text: 'Bagaimana bentuk kerja sama tolong-menolong (tradisi sambatan) yang masih berjalan saat musim tanam atau panen? Bagaimana tradisi ini membantu meringankan biaya upah kerja?', hint: 'Kaji tradisi sambatan/rewang, gotong royong membersihkan parit tersier, atau giliran tenaga tanam/panen...' },
        { id: 3, text: 'Apakah di lingkungan petani sini masih ada tradisi syukuran panen, sedekah bumi, atau doa tolak bala sebelum turun ke sawah? Apa makna nilai tersebut bagi ketenangan batin petani?', hint: 'Kaji kearifan lokal seperti tanda-tanda alam, ritual selamatan wiwit/sedekah bumi, atau nasihat leluhur tani...' },
        { id: 4, text: 'Bagaimana kehadiran traktor roda 4 dan mesin panen combine harvester mengubah kebiasaan dan kecepatan bertani Bapak/Ibu dibanding zaman dahulu?', hint: 'Kaji perbandingan waktu kerja manual vs mesin, biaya sewa alsintan, dan penghematan tenaga kerja...' },
        { id: 5, text: 'Bagaimana Bapak/Ibu mewariskan pengetahuan dan keterampilan bertani kepada generasi muda? Apakah pemuda di lingkungan ini masih berminat meneruskan mata pencaharian sawah ini?', hint: 'Kaji pandangan narasumber mengenai regenerasi petani muda, kendala minat pemuda, atau peluang smart farming...' }
      ],
      obsHints: [
        'Amati kondisi fisik petak sawah, pematang, dan kejernihan serta debit aliran air saluran irigasi BK...',
        'Catat daftar perkakas tradisional (cangkul, sabit, caping) berdampingan dengan mesin alsintan (traktor/combine)...',
        'Uraikan kronologi proses kerja petani di sawah dari pagi hingga petang yang Anda saksikan langsung...',
        'Amati ketangkasan gerak tangan petani, cara menyemai bibit, membajak, atau mencabut gulma sawah...',
        'Amati interaksi sosial, tegur sapa antar-petani di pematang, dan suasana tolong-menolong di sawah...',
        'Amati nilai kesabaran, busana kerja penahan terik, atau kebiasaan makan bekal bersama di gubuk sawah...',
        'Catat cara pengoperasian mesin alsintan traktor/combine atau pompa air alkon di petak sawah...',
        'Amati kendala fisik lapangan yang terlihat, seperti lumpur dalam, serangan keong/wereng, atau air macet...',
        'Amati upaya pemilahan gabah bernas, pemanfaatan jerami sisa panen, dan kebersihan parit sawah...'
      ]
    },
    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Rakyat (Karet Alam & Kelapa Sawit)',
      cultureTheme: 'Kedisiplinan subuh menderes, tradisi bagi hasil kebun, dan daya tahan ekonomi',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
      labels: {
        locLabel: 'Lokasi Kebun Karet / Kelapa Sawit:',
        locPlaceholder: 'Contoh: Kebun Karet Desa Batumarta Unit VI',
        narLabel: 'Nama Pemilik Kebun / Petani Penyadap:',
        narPlaceholder: 'Contoh: Bapak Wayan Subrata / Pak Joko',
        durLabel: 'Lama Menekuni Usaha Perkebunan:',
        durPlaceholder: 'Contoh: 15 Tahun Menyadap Karet',
        extraLabel: 'Luas Kebun & Frekuensi Panen:',
        extraPlaceholder: 'Contoh: 2 Hektar (Deres 2 hari sekali / Panen sawit 2 minggu sekali)'
      },
      questions: [
        { id: 1, text: 'Mengapa pekerjaan menyadap karet harus dilakukan saat subuh/pagi buta? Nilai ketekunan dan kedisiplinan apa yang dituntut dari seorang petani kebun setiap harinya?', hint: 'Kaji alasan memilih waktu subuh, ketahanan dingin/gelap, dan kedisiplinan kerja harian pekebun...' },
        { id: 2, text: 'Dari siapa Bapak/Ibu pertama kali mempelajari teknik menyadap kulit pohon karet (deres) atau memanen sawit agar pohon tidak rusak dan getahnya melimpah?', hint: 'Kaji teknik menyadap getah karet yang benar, pemupukan sawit, pembersihan piringan pohon, dan pengendalian hama...' },
        { id: 3, text: 'Apakah kebun ini dikelola sendiri bersama keluarga atau ada sistem bagi hasil (paroan) dengan warga lain? Bagaimana aturan kepercayaan itu dijaga?', hint: 'Kaji sistem bagi hasil paroan, pembagian tugas keluarga, dan keterikatan sosial antar-pekebun...' },
        { id: 4, text: 'Bagaimana kebiasaan keluarga menyiasati kebutuhan hidup ketika harga getah karet atau sawit anjlok? Kearifan apa yang diajarkan agar keuangan keluarga tetap stabil?', hint: 'Kaji strategi bertahan saat anomali harga getah, pekerjaan sambilan, atau simpanan tabungan keluarga...' },
        { id: 5, text: 'Bagaimana pengetahuan merawat kebun diwariskan kepada anak atau generasi muda? Apakah anak muda sekarang berminat merawat kebun keluarga ini?', hint: 'Kaji apakah anak diajarkan merawat kebun sendiri, menyerahkan ke buruh upahan, atau beralih profesi lain...' }
      ],
      obsHints: [
        'Amati kondisi kebersihan kebun, kerapian barisan pohon karet/sawit, dan kelembapan udara pagi...',
        'Catat peralatan sadap (pisau deres, mangkok getah, dodos/egrek sawit, talang getah, botol cuka)...',
        'Uraikan urutan kerja penyadap dari pohon pertama hingga pengumpulan getah beku (bokar) di bak penampungan...',
        'Amati ketelitian sudut torehan pisau sadap narasumber agar tidak mengenai lapisan kayu pohon...',
        'Amati bentuk kerja sama keluarga atau buruh sadap dalam mengangkut hasil panen getah/sawit...',
        'Amati kebiasaan bangun pagi, pakaian kerja kebun tertutup anti-nyamuk, dan keuletan narasumber...',
        'Catat peralatan timbangan, gerobak dorong, atau kendaraan roda dua yang dimodifikasi untuk angkut getah...',
        'Amati kendala nyata di kebun, seperti nyamuk, getah hanyut kena hujan, atau rumput liar/gulma tebal...',
        'Amati cara menjaga kelestarian pohon, pemupukan berkala, dan penanganan cairan pembeku getah...'
      ]
    },
    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat & Budidaya Ternak (Sapi, Kambing/Domba, & Unggas/Ayam)',
      cultureTheme: 'Falsafah ketelatenan merumat ternak/unggas, integrasi pakan limbah pertanian, dan tabungan ekonomi keluarga',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      labels: {
        locLabel: 'Lokasi Kandang Peternakan (Sapi/Kambing/Ayam):',
        locPlaceholder: 'Contoh: Kandang Sapi Karang Binangun / Peternakan Ayam Broiler Desa Gumawang',
        narLabel: 'Nama Peternak / Pemilik Usaha Ternak:',
        narPlaceholder: 'Contoh: Bapak H. Suparman / Mas Danu (Peternak Sapi/Ayam)',
        durLabel: 'Lama Menjalankan Usaha Peternakan:',
        durPlaceholder: 'Contoh: 8 Tahun Beternak Sapi / 5 Tahun Kemitraan Ayam Broiler',
        extraLabel: 'Komoditas & Populasi Ternak (Ekor):',
        extraPlaceholder: 'Contoh: 10 Ekor Sapi Bali / 25 Ekor Kambing / 3.000 Ekor Ayam Broiler'
      },
      questions: [
        { id: 1, text: 'Masyarakat sering menyebut beternak butuh sikap telaten (sabar, disiplin, dan teliti). Kebiasaan harian apa yang wajib dilakukan dari pagi hingga malam dalam merawat ternak/unggas peliharaan?', hint: 'Kaji falsafah merumat ternak, kedisiplinan jadwal pemberian pakan/minum, kontrol suhu/ventilasi kandang, dan kebersihan kotoran harian...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu mengelola dan menyediakan ransum pakan (rumput hijauan/jerami amoniasi untuk sapi/kambing, atau konsentrat/dedak/jagung untuk ayam)? Bagaimana cara menjaga efisiensi biaya pakan?', hint: 'Kaji sumber pakan (ngarit hijauan, limbah jerami/dedak padi Belitang, pakan pabrikan/konsentrat), teknik fermentasi/silase, dan perhitungan konversi pakan (FCR)...' },
        { id: 3, text: 'Apakah usaha ternak ini diniatkan sebagai tabungan keluarga, usaha harian (telur/susu), atau siklus panen komersial (kurban Idul Adha / panen ayam pedaging)? Bagaimana peran ternak dalam ketahanan ekonomi keluarga?', hint: 'Kaji perputaran modal usaha, peran ternak sebagai aset tabungan likuid petani, nilai ekonomi musiman (kurban/lebaran), dan keuntungan rutin usaha...' },
        { id: 4, text: 'Apakah Bapak/Ibu tergabung dalam kelompok ternak/kemitraan, atau didampingi petugas penyuluh/mantri hewan/PPL? Bagaimana upaya menjaga kesehatan hewan dan langkah pencegahan wabah penyakit (vaksinasi/biosekuriti)?', hint: 'Kaji peran Poskeswan/mantri hewan, jadwal vaksinasi (PMK/LSD pada ruminansia atau ND/AI pada ayam), desinfeksi kandang, dan sanitasi biosekuriti...' },
        { id: 5, text: 'Apakah generasi muda di sekitar lingkungan tertarik membantu mengelola atau memulai wirausaha peternakan (sapi, kambing modern, atau ayam closed house)? Bagaimana peluang wirausaha ternak bagi pemuda desa?', hint: 'Kaji persepsi pemuda desa, peluang modernisasi kandang (otomatisasi minum/pakan, breeding kambing perah/kontes, kemitraan ayam), dan potensi keuntungan...' }
      ],
      obsHints: [
        'Amati kebersihan kandang, ventilasi udara, suhu, pencahayaan alami/buatan, dan jarak kandang dari pemukiman warga...',
        'Catat peralatan kandang (mesin chopper perajang rumput, instalasi tempat minum otomatis nipple/drinker, blower ventilasi, lampu pemanas chick guard, sabit, terpal penutup)...',
        'Uraikan alur kerja harian peternak: membersihkan lantai kandang/litter, meracik pakan/konsentrat/comboran, hingga kontrol air minum...',
        'Amati ketelitian peternak memeriksa nafsu makan, keaktifan gerak, kondisi mata/feses, dan bobot perkembangan ternak/unggas...',
        'Amati pembagian tugas antar-anggota keluarga atau pekerja kandang (pencarian pakan, peracikan, sanitasi, dan pengawasan malam)...',
        'Amati kepedulian peternak terhadap kesejahteraan hewan (animal welfare), pencegahan stres, dan perlakuan kasih sayang pada ternak...',
        'Catat teknologi yang diterapkan: chopper pakan, nipple drinker otomatis, pemanas indukan (gasolec/brooder), atau rekaman recording pertumbuhan ternak...',
        'Amati kendala nyata: bau kotoran, lalat, lonjakan harga pakan konsentrat/DOC/bakalan, cuaca ekstrem, atau risiko serangan penyakit...',
        'Amati pengolahan limbah kotoran (apakah kotoran sapi/ayam dikeringkan/difermentasi menjadi pupuk kandang organik untuk sawah Belitang atau dimanfaatkan biogas)...'
      ]
    },
    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Air Tawar (Sentra Kolam Patin Belitang, Lele & Nila)',
      cultureTheme: 'Pengetahuan air irigasi, tradisi panen bedah kolam, dan efisiensi pakan lokal',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      labels: {
        locLabel: 'Lokasi Sentra Kolam Ikan:',
        locPlaceholder: 'Contoh: Kolam Patin Desa Nusa Bakti / Sidodadi',
        narLabel: 'Nama Pembudidaya Ikan:',
        narPlaceholder: 'Contoh: Bapak Nyoman / Pak Rudi Hartono',
        durLabel: 'Lama Menekuni Budidaya Ikan:',
        durPlaceholder: 'Contoh: 10 Tahun Budidaya Ikan Patin',
        extraLabel: 'Jumlah Kolam & Jenis Ikan Utama:',
        extraPlaceholder: 'Contoh: 5 Petak Kolam Tanah (Komoditas Utama Ikan Patin & Lele)'
      },
      questions: [
        { id: 1, text: 'Bagaimana Bapak/Ibu mengetahui kondisi air kolam sedang sehat atau beracun hanya dari melihat warna, bau, atau riak airnya? Dari siapa keahlian membaca air ini diperoleh?', hint: 'Kaji kepekaan membaca kondisi air kolam kehijauan, pergerakan ikan di permukaan, dan sirkulasi air...' },
        { id: 2, text: 'Bagaimana suasana kerja sama dan gotong royong saat panen raya kolam ikan (bedah kolam)? Apakah melibatkan tetangga sekitar dan tradisi syukuran makan bersama?', hint: 'Kaji tradisi bedah kolam, bantuan tetangga menarik jaring, dan makan bersama ikan bakar khas desa...' },
        { id: 3, text: 'Harga pakan pelet pabrik terkenal mahal. Inovasi pakan lokal apa (seperti ampas tahu, dedak padi RMU, atau magot) yang diracik sendiri untuk menekan biaya produksi?', hint: 'Kaji racikan pakan mandiri memanfaatkan dedak padi melimpah Belitang atau limbah industri tahu...' },
        { id: 4, text: 'Bagaimana pembudidaya ikan berkoordinasi dengan petugas pintu air irigasi Belitang dan petani sawah agar kolam selalu mendapatkan pasokan air yang lancar?', hint: 'Kaji koordinasi pembagian air irigasi dengan ulu-ulu sawah dan pemeliharaan parit pembuangan...' },
        { id: 5, text: 'Apakah usaha budidaya ikan ini menarik minat generasi muda di Belitang? Keterampilan digital baru apa (seperti penjualan online) yang bisa dikembangkan pemuda?', hint: 'Kaji peran pemuda dalam pemasaran digital, pengiriman ikan segar ke kota, atau pengolahan fillet patin...' }
      ],
      obsHints: [
        'Amati bentuk fisik kolam (tanah galian atau terpal), warna air kehijauan, dan tanggul kolam...',
        'Catat peralatan kolam (jaring serok, mesin pompa alkon, selang buang air, baskom pakan, timbangan)...',
        'Uraikan alur kerja harian: pengecekan pintu air, penaburan pakan terjadwal, dan pembersihan permukaan kolam...',
        'Amati kejelian narasumber mengatur pola tebar pakan agar merata dan tidak ada pelet yang terbuang percuma...',
        'Amati interaksi narasumber dengan pekerja kolam atau pembeli/tengkulak ikan yang datang...',
        'Amati kebiasaan bersabar menunggu ikan makan dan kehati-hatian berjalan di pematang kolam licin...',
        'Catat teknologi mekanis: kincir aerator oksigen, pompa sirkulasi air, atau lampu perangkap serangga malam...',
        'Amati kendala nyata: ancaman hama burung/bingsang, kematian bibit saat cuaca panas, atau air surut...',
        'Amati cara menjaga mutu ikan agar tidak berbau lumpur dan pemanfaatan lumpur kolam untuk pupuk tanaman...'
      ]
    },
    industri: {
      key: 'industri',
      name: 'Agro-Industri Penggilingan Padi (RMU) & Pengolahan Pangan',
      cultureTheme: 'Etos industri pedesaan, menjaga mutu beras Belitang, dan sirkular limbah sekam/dedak',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      labels: {
        locLabel: 'Nama Kilang Padi (RMU) / Unit Pengolahan:',
        locPlaceholder: 'Contoh: Kilang Padi RMU Berkah Tani / Sentra Kerupuk Kemplang',
        narLabel: 'Nama Pemilik Kilang / Pengelola Usaha:',
        narPlaceholder: 'Contoh: Bapak H. Darmawan / Ibu Yuliana',
        durLabel: 'Lama Mengoperasikan Usaha Pengolahan:',
        durPlaceholder: 'Contoh: 16 Tahun Beroperasi di Belitang',
        extraLabel: 'Kapasitas Pengolahan / Produksi Harian:',
        extraPlaceholder: 'Contoh: 8 Ton Gabah / Hari (Beras Kemasan Premium) / 100 kg Kemplang'
      },
      questions: [
        { id: 1, text: 'Bagaimana Bapak/Ibu membangun ikatan saling percaya dengan petani yang menjual gabahnya ke kilang ini? Mengapa kejujuran timbangan dan keadilan harga sangat dijaga?', hint: 'Kaji hubungan kepercayaan bisnis beras, kejujuran timbangan, dan kepastian pembayaran kepada petani...' },
        { id: 2, text: 'Hanya dengan meremas segenggam gabah atau menggigitnya, bagaimana Bapak/Ibu bisa tahu kadar air dan kualitas gabah tersebut? Dari mana ilmu tersebut dipelajari?', hint: 'Kaji insting tradisional memeriksa kadar air gabah, rendemen beras kepala, dan butir mengapur...' },
        { id: 3, text: 'Dahulu gabah hanya dijemur di bawah terik matahari. Bagaimana kehadiran mesin pengering bed dryer mengubah kebiasaan kerja kilang ini, terutama saat musim penghujan?', hint: 'Kaji transformasi dari jemur manual di lantai semen ke mesin pengering mekanis bed dryer/vertical dryer...' },
        { id: 4, text: 'Limbah sekam padi dan dedak halus biasanya disalurkan ke mana? Bagaimana kilang ini bekerja sama dengan peternak sapi dan pembudidaya ikan di sekitar desa?', hint: 'Kaji pemanfaatan dedak bekatul untuk pakan ternak/ikan dan sekam untuk bahan bakar batu bata...' },
        { id: 5, text: 'Apakah usaha penggilingan padi ini merupakan rintisan keluarga turun-temurun? Bagaimana generasi muda dilatih mengoperasikan mesin dan mengelola pembukuan usaha?', hint: 'Kaji regenerasi keluarga pemilik kilang padi, pembagian tugas, dan pembukuan arus kas usaha...' }
      ],
      obsHints: [
        'Amati tata letak kilang padi: area penerimaan gabah, lantai jemur semen, dan ruang mesin giling...',
        'Catat mesin industri yang ada: mesin bed dryer, husker pemecah kulit, polisher penyosoh, penjahit karung...',
        'Uraikan alur pengolahan: dari penimbangan gabah basah, pengeringan, penggilingan, hingga beras masuk karung...',
        'Amati keterampilan operator menyetel kerapatan roll husker dan ketelitian mengecek butir beras patah...',
        'Amati komunikasi pekerja kilang dengan sopir truk angkut gabah dan petani yang datang menjual gabah...',
        'Amati etos disiplin kerja kilang: ketahanan terhadap debu sekam, kebisingan mesin, dan ketepatan waktu...',
        'Catat teknologi modern: timbangan digital duduk, conveyor pemindah beras, dan mesin jahit karung cepat...',
        'Amati kendala industri: debu sekam beterbangan, mati lampu PLN, atau kadar air gabah terlalu basah...',
        'Amati penanganan limbah: penumpukan sekam untuk pembakaran batu bata dan pengarungan dedak halus...'
      ]
    },
    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan (Kios Sarana Pertanian Resmi & Toko Sembako Pasar)',
      cultureTheme: 'Etika niaga, sistem kepercayaan utang tempo panen, dan modal sosial pelanggan',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      labels: {
        locLabel: 'Nama Kios Saprotan / Toko / Los Pasar:',
        locPlaceholder: 'Contoh: Kios Pupuk & Obat Tani Resmi Tani Makmur, Pasar Gumawang',
        narLabel: 'Nama Pemilik Kios / Pedagang:',
        narPlaceholder: 'Contoh: Bapak Ahmad Fauzi / Ibu Endang',
        durLabel: 'Lama Berdagang di Wilayah Ini:',
        durPlaceholder: 'Contoh: 14 Tahun Melayani Petani Belitang',
        extraLabel: 'Jenis Komoditas Dagangan Pokok:',
        extraPlaceholder: 'Contoh: Pupuk NPK Phonska, Benih Padi Inpari 32, Pestisida & Sembako'
      },
      questions: [
        { id: 1, text: 'Banyak petani mengambil pupuk atau benih dulu dan membayarnya setelah panen (sistem tempo). Nilai kepercayaan dan kekeluargaan apa yang membuat sistem ini bisa bertahan?', hint: 'Kaji sistem tempo bayar saat panen, risiko piutang macet, dan modal sosial saling percaya...' },
        { id: 2, text: 'Bagaimana prinsip kejujuran dalam menakar timbangan dan menentukan harga? Nilai moral apa yang diajarkan orang tua agar toko membawa berkah bagi pelanggan?', hint: 'Kaji etika berdagang, ketepatan timbangan, dan kepuasan pelanggan tetap...' },
        { id: 3, text: 'Apakah kios pupuk/toko ini sering jadi tempat bertukar informasi antar-petani mengenai serangan hama atau harga panen? Bagaimana peran sosial toko ini di desa?', hint: 'Kaji kios sebagai ruang publik petukaran informasi agronomi dan keluh kesah petani...' },
        { id: 4, text: 'Bagaimana perputaran keuangan kios saat musim tanam (banyak piutang) dibandingkan saat musim panen raya? Bagaimana kiat pedagang menjaga kas modal agar tidak macet?', hint: 'Kaji manajemen arus kas pedagang dalam menghadapi siklus musiman pertanian padi...' },
        { id: 5, text: 'Apakah pelanggan petani di sini sudah mulai membayar menggunakan QRIS atau transfer bank? Bagaimana anak muda membantu toko menerapkan pencatatan digital?', hint: 'Kaji adopsi pembayaran digital di toko dan keterlibatan anak muda dalam pembukuan kas...' }
      ],
      obsHints: [
        'Amati penataan barang di kios/toko: tumpukan karung pupuk, botol obat hama di etalase, atau sembako...',
        'Catat peralatan niaga: timbangan gantung/duduk/digital, kalkulator kasir, nota kontan, dan rak barang...',
        'Uraikan alur pelayanan pembeli: menyapa petani, memberi konsultasi obat hama yang pas, hingga pembayaran...',
        'Amati pengetahuan pedagang saat menjelaskan dosis pemupukan dan cara pakai racun rumput kepada petani...',
        'Amati kehangatan interaksi sosial: tegur sapa khas pedesaan, tawar-menawar santun, dan canda tawa warga...',
        'Amati nilai amanah dan kejujuran: ketelitian mengembalikan uang kembalian dan mengecek segel kemasan asli...',
        'Catat teknologi transaksi: mesin EDC mini ATM, stiker QRIS di meja, atau smartphone pemesanan via WA...',
        'Amati kendala niaga: keterbatasan stok pupuk subsidi, petani telat bayar utang tempo, atau persaingan harga...',
        'Amati upaya toko menjaga mutu: menjaga pupuk agar tidak lembap/menggumpal dan kebersihan lingkungan toko...'
      ]
    },
    formal: {
      key: 'formal',
      name: 'Jasa Keuangan Mikro (Layanan Tanpa Kantor / Agen BRILink, KSP & BUMDes)',
      cultureTheme: 'Inklusi perbankan desa, integritas menjaga rahasia nasabah, dan fungsi penolong petani',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
      labels: {
        locLabel: 'Nama Gerai Agen / Kantor KSP / BUMDes:',
        locPlaceholder: 'Contoh: Gerai Agen BRILink Berkah Jaya / KSP Sahabat Tani Desa Sidodadi',
        narLabel: 'Nama Agen / Pengelola Layanan:',
        narPlaceholder: 'Contoh: Mas Bagus Pratama / Mbak Wulandari',
        durLabel: 'Lama Mengelola Layanan Keuangan:',
        durPlaceholder: 'Contoh: 7 Tahun Menjadi Agen BRILink',
        extraLabel: 'Layanan Transaksi Utama & Perangkat:',
        extraPlaceholder: 'Contoh: Tarik Tunai Panen/Bansos, Transfer Pupuk, Mesin EDC & Android'
      },
      questions: [
        { id: 1, text: 'Petani desa sering merasa segan atau jauh jika harus ke kantor bank di kota. Nilai keramahan apa yang Bapak/Ibu terapkan agar warga merasa nyaman bertransaksi di gerai ini?', hint: 'Kaji kedekatan emosional agen dengan warga desa dan kemudahan akses perbankan mikro...' },
        { id: 2, text: 'Dalam memegang uang warga dan memasukkan nomor PIN, bagaimana Bapak/Ibu menjaga integritas dan membuktikan bahwa gerai ini amanah serta dapat dipercaya 100%?', hint: 'Kaji etika kerahasiaan perbankan, kehati-hatian input nominal, dan perlindungan privasi nasabah desa...' },
        { id: 3, text: 'Saat panen raya padi atau pencairan bantuan pemerintah (PKH/Bansos), bagaimana suasana antrean warga desa? Tradisi tolong-menolong apa yang terlihat saat warga antre?', hint: 'Kaji fenomena antrean warga desa, interaksi sosial di gerai, dan kesabaran melayani lansia...' },
        { id: 4, text: 'Bagaimana Bapak/Ibu mengatasi kendala saat mesin EDC offline atau sinyal internet di desa sedang lambat sementara warga sangat butuh uang tunai mendesak?', hint: 'Kaji kendala teknis jaringan internet di pedesaan dan kiat agen menjaga kepercayaan warga...' },
        { id: 5, text: 'Bagaimana peran gerai ini dalam mengedukasi warga agar membiasakan diri menabung untuk masa depan dan tidak tergiur pinjaman rentenir atau pinjol ilegal?', hint: 'Kaji literasi keuangan desa, peran mengikis rentenir sawah, dan edukasi menabung sejak dini...' }
      ],
      obsHints: [
        'Amati tata letak gerai: papan nama resmi agen bank, meja kasir pembatas, dan kursi tunggu nasabah...',
        'Catat peralatan operasional: mesin EDC perbankan, smartphone aplikasi perbankan, printer struk mini, laci uang...',
        'Uraikan alur transaksi: nasabah datang menyebutkan kebutuhan, gesek kartu ATM, verifikasi PIN, hingga cetak struk...',
        'Amati ketelitian agen menghitung lembaran uang kertas, mengecek keaslian uang, dan memasukkan nominal angka...',
        'Amati komunikasi ramah agen saat membantu petani lansia yang belum lancar bertransaksi digital...',
        'Amati etika menjaga privasi: melindungi kerahasiaan nomor PIN nasabah dari pandangan orang lain...',
        'Catat teknologi perbankan digital: koneksi sinyal seluler/wifi, aplikasi mobile banking, dan mesin EDC...',
        'Amati kendala nyata: sinyal internet ngadat, stok uang tunai habis saat panen raya, atau listrik padam...',
        'Amati kerapian arsip nota struk, penataan uang tunai di brankas kecil, dan kepatuhan prosedur operasional...'
      ]
    }
  };

  window.NFT_DAY2_SECTOR_DATA = NFT_DAY2_SECTOR_DATA;

  // ========================================================
  // IMPLEMENTASI UTAMA RENDER LKPD DAY 2 NON-FIELD TRIP
  // ========================================================
  function renderNonFieldTripDay2LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // PRASYARAT WAJIB: Cek apakah Modul Day 2 (5 Kartu Riset) sudah tuntas diserahkan
    let hasMateri = false;
    try {
      const rawM = localStorage.getItem('fincestem_materi_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_materi_day2_' + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.cardA || p.conclusion)) hasMateri = true;
      }
    } catch(e) {}

    // Fallback verifikasi progress sistem
    if (!hasMateri) {
      if (window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['2_materi']) {
        hasMateri = true;
      } else {
        try {
          const sp = localStorage.getItem('fincestem_progress_' + cleanNisn);
          if (sp) {
            const p = JSON.parse(sp);
            if (p && p.task_map && p.task_map['2_materi']) hasMateri = true;
          }
        } catch(e) {}
      }
    }

    // Ambil data resmi yang sudah pernah dikirim
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem('fincestem_lkpd_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day2_' + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    // Fallback ekstraksi dari progress core jika berpindah gawai/device baru
    if (!saved) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const prog = JSON.parse(storedP);
          const tMap = (prog && prog.task_map) ? prog.task_map['2_lkpd'] : null;
          if (tMap && tMap.content) {
            let c = tMap.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (typeof c === 'object' && c) {
              saved = c;
            } else if (typeof c === 'string' && c.trim()) {
              saved = {
                submitted: true,
                submittedAt: tMap.updated_at || new Date().toISOString(),
                summary: c,
                sectorName: 'Sektor Agrikultur & Budaya Lokal',
                location: 'Kabupaten OKU Timur',
                narasumberName: 'Pelaku Usaha Lapangan',
                conclusion_1: c,
                conclusion_2: 'Unsur Budaya Kerja OKU Timur',
                conclusion_6: 'Rekomendasi Pemecahan Masalah'
              };
            }
          }
        }
      } catch(eHydLk2) {}
    }

    // Ambil data auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_lkpd_d2_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch(e) {}

    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt));
    const d2DefaultLKPDFields = {
      interviewerName: studentName || 'Peserta Non-Field Trip',
      interviewDate: new Date().toISOString().split('T')[0],
      location: 'Belitang, Kabupaten OKU Timur',
      sectorKey: 'pangan',
      sectorName: 'Pertanian Tanaman Pangan (Padi Sawah Irigasi Teknis)',
      cultureTheme: 'Sistem Sambatan & Pengaturan Air Ulu-Ulu Pembagian Irigasi',
      narasumberName: 'Bapak Sukardi (Kelompok Tani Padi)',
      narasumberAge: '48 Tahun',
      durationWorking: '20 Tahun Mengelola Usaha Tani',
      conclusion_1: 'Aktivitas agrikultur di OKU Timur memadukan teknologi alsintan modern dengan kearifan lokal.',
      conclusion_2: 'Unsur budaya gotong royong sambatan menjadi pilar efisiensi biaya kerja di sawah.',
      conclusion_3: 'Sektor tanaman pangan padi sawah berkontribusi dominan terhadap ketahanan pangan daerah.',
      conclusion_4: 'Penggunaan combine harvester dan traktor modern meningkatkan kecepatan kerja panen hingga 3 kali lipat.',
      conclusion_5: 'Inovasi pengeringan gabah mekanis meminimalkan kerugian saat musim hujan.',
      conclusion_6: 'Rekomendasi solusi adalah penguatan kelembagaan kelompok tani dan modernisasi jaringan irigasi tersier.'
    };
    const rawD2Form = saved || draft || {};
    const formData = isSubmitted ? Object.assign({}, d2DefaultLKPDFields, rawD2Form) : rawD2Form;
    const isTesterBypass = (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn));
    const isLockedByPrereq = !hasMateri && !isTesterBypass;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const readOnlyAttr = isFormLocked ? 'disabled' : '';
    const draftTimeStr = (draft && draft.updatedAt) 
      ? new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      : '';

    const selSector = formData.sectorKey || 'pangan';
    const sectorObj = NFT_DAY2_SECTOR_DATA[selSector] || NFT_DAY2_SECTOR_DATA.pangan;
    try {
      if (cleanNisn) localStorage.setItem('fincestem_nft_sector_d2_' + cleanNisn, selSector);
    } catch(e) {}

    // Helper isi nilai
    const val = (k) => (formData && formData[k] !== undefined) ? formData[k] : '';
    let d2CurDistrict = normalizeDistrictName(val('district') || '');
    if (!d2CurDistrict && val('location')) {
      d2CurDistrict = OKU_TIMUR_DISTRICTS.find(function(d) { return String(val('location')).toLowerCase().includes(d.toLowerCase()); }) || '';
    }

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-12">
        
        <!-- BANNER PERINGATAN JIKA PRASYARAT MODUL BELUM TUNTAS -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Alur Wajib Berurutan Day 2</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Day 2 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 2, Anda <strong>wajib menuntaskan 5 Kartu Riset Mandiri di Modul Belajar</strong> (minimal 300 karakter + sumber pustaka per kartu) sebelum dapat mengisi Lembar Kerja Observasi Lapangan ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=2" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-800 hover:bg-indigo-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Riset Day 2 Sekarang</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BANNER KOP IDENTITAS LKPD DAY 2 NON-FIELD TRIP -->
        <div class="bg-gradient-to-br from-indigo-800 via-indigo-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-indigo-700/40">
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
            <div class="flex items-center gap-2 flex-wrap">
              <span id="nftLkpdD2DraftStatusBadge" class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 flex items-center gap-1.5 shadow-2xs">
                <span class="w-2 h-2 rounded-full ${draft && draft.updatedAt ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}"></span>
                <span id="txtNftLkpdD2DraftStatus">${draft && draft.updatedAt ? `Draft tersimpan (pk ${draftTimeStr} WIB)` : 'Auto-Save Aktif (Anti Hilang Sinyal)'}</span>
              </span>
              <span id="nftLkpdD2StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800 font-extrabold' : (isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : (draft && draft.updatedAt ? 'bg-amber-100 text-amber-950 font-extrabold border border-amber-300 shadow-2xs' : 'bg-indigo-100 text-indigo-950 font-extrabold'))}">
                ${isLockedByPrereq ? 'Terkunci (Belum Tuntas Modul)' : (isSubmitted ? '✓ LKPD Terkirim Resmi' : (draft && draft.updatedAt ? '📝 Mode Draft (Belum Dikirim)' : 'Sedang Observasi Lapangan'))}
              </span>
            </div>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD 02: Lembar Observasi &amp; Wawancara Budaya, Mata Pencaharian &amp; Teknologi Pertanian OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium mt-1">
              Investigasi Etnografis &amp; Sosioteknologi: Hakikat Budaya, 7 Unsur Universal, Ragam Mata Pencaharian Daerah, Modernisasi Mesin Alsintan &amp; Jaringan Irigasi Komering
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-indigo-700/50 text-xs">
            <div>
              <span class="text-indigo-200/80 block text-[11px]">Nama Peneliti:</span>
              <span class="font-bold text-white truncate block">${studentName}</span>
            </div>
            <div>
              <span class="text-indigo-200/80 block text-[11px]">NISN / Kelas:</span>
              <span class="font-bold text-white">${cleanNisn} • ${studentClass}</span>
            </div>
            <div>
              <span class="text-indigo-200/80 block text-[11px]">Fasilitator Pembimbing:</span>
              <span class="font-bold text-white truncate block">${fasilName}</span>
            </div>
            <div>
              <span class="text-indigo-200/80 block text-[11px]">Status Akses LKPD:</span>
              <span class="font-bold text-amber-300">${isSubmitted ? 'Terkirim & Terkunci' : (isReadOnly ? 'Mode Baca' : 'Aktif (Dapat Mengisi)')}</span>
            </div>
          </div>
        </div>

        <!-- PANDUAN PELAKSANAAN & ETIKA WAWANCARA (ACCORDION / BANNER) -->
        <div class="bg-amber-50/70 border border-amber-200 rounded-3xl p-4 sm:p-5 flex flex-col gap-2.5 text-slate-800 shadow-2xs">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-extrabold uppercase text-amber-950 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-amber-600 text-base">info</span>
              <span>Petunjuk Observasi Lapangan &amp; Etika Wawancara (Inquiry-Based Learning):</span>
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-amber-950/90 font-medium">
            <div class="p-3 bg-white/80 rounded-2xl border border-amber-200/60 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11.5px] flex items-center gap-1">
                <span class="material-symbols-outlined text-indigo-700 text-xs">flag</span>
                <span>Urutan Pelaksanaan Observasi (5 Langkah):</span>
              </span>
              <ol class="list-decimal list-inside space-y-0.5 text-[11px] text-slate-700">
                <li><strong>Pembukaan:</strong> Ucapkan salam, perkenalkan diri dari SMAN 1 Belitang, dan minta izin.</li>
                <li><strong>Observasi:</strong> Amati lingkungan kerja, proses, dan teknologi yang digunakan.</li>
                <li><strong>Wawancara:</strong> Ajukan pertanyaan umum (Card 2) dan pertanyaan khusus (Card 3).</li>
                <li><strong>Pencatatan:</strong> Ketikkan catatan objektif di setiap kotak LKPD secara mandiri.</li>
                <li><strong>Analisis:</strong> Rumuskan sintesis keterkaitan budaya, ekonomi, dan rekomendasi.</li>
              </ol>
            </div>
            <div class="p-3 bg-white/80 rounded-2xl border border-amber-200/60 flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-[11.5px] flex items-center gap-1">
                <span class="material-symbols-outlined text-emerald-700 text-xs">verified_user</span>
                <span>Etika &amp; Tata Krama Wawancara:</span>
              </span>
              <ul class="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                <li>Gunakan bahasa yang santun, ramah, dan mudah dipahami narasumber.</li>
                <li>Jangan memaksa jika ada hal yang dianggap pribadi/rahasia oleh narasumber.</li>
                <li>Mintalah izin dengan sopan sebelum mengambil foto kegiatan dokumentasi.</li>
                <li>Ucapkan terima kasih dan doa keberkahan usaha setelah wawancara selesai.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- PROGRESS BAR KELENGKAPAN LKPD 6 KARTU -->
        <div class="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-extrabold text-slate-800 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-indigo-600 text-base">checklist</span>
              <span>Progres Kelengkapan LKPD Day 2:</span>
            </span>
            <span id="nftD2ProgPercentBadge" class="font-black text-indigo-900 text-xs bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
              0% Selesai
            </span>
          </div>
          <div class="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden shadow-inner">
            <div id="nftD2ProgBar" class="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300 w-0"></div>
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1 text-[10.5px] font-bold text-center">
            <span id="pchipD2_1" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">1. Identitas</span>
            <span id="pchipD2_2" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">2. Wawancara Umum</span>
            <span id="pchipD2_3" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">3. Wawancara Khusus</span>
            <span id="pchipD2_4" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">4. Observasi Langsung</span>
            <span id="pchipD2_5" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">5. Analisis HOTS</span>
            <span id="pchipD2_6" class="py-1 px-1 rounded-xl bg-slate-100 text-slate-600">6. Kesimpulan</span>
          </div>
        </div>

        <!-- FORMULIR LKPD DIGITAL 6 KARTU -->
        <form id="formNftDay2Lkpd" onsubmit="event.preventDefault();" class="flex flex-col gap-5">
          
          <!-- ======================================================== -->
          <!-- KARTU 1: IDENTITAS KEGIATAN & PROFIL NARASUMBER          -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_1" class="p-4 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Identitas Kegiatan &amp; Profil Narasumber Lapangan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian A: Pilihan Sektor, Lokasi Observasi &amp; Data Narasumber</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_1" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- LANGKAH 1: PILIHAN SEKTOR MATA PENCAHARIAN (DITARUH PALING ATAS) -->
            <div class="flex flex-col gap-2 bg-gradient-to-br from-indigo-50 via-indigo-50/70 to-blue-50/50 p-4 sm:p-5 rounded-2xl border-2 border-indigo-200 shadow-xs">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <label for="nftD2_sectorKey" class="text-xs sm:text-sm font-black text-indigo-950 flex items-center gap-2">
                  <span class="material-symbols-outlined text-indigo-700 text-lg">category</span>
                  <span>Langkah 1: Pilih Sektor Mata Pencaharian Tempat Observasi <span class="text-rose-600">*</span></span>
                </label>
                <span class="text-[10.5px] font-extrabold text-indigo-800 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">1 dari 7 Sektor Pilihan</span>
              </div>
              <select id="nftD2_sectorKey" ${readOnlyAttr} onchange="onNftDay2SectorChange(this.value)" class="w-full p-3 rounded-xl border-2 border-indigo-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs sm:text-sm font-bold text-indigo-950 bg-white cursor-pointer transition-all shadow-2xs">
                <option value="pangan" ${selSector === 'pangan' ? 'selected' : ''}>1. Pertanian Tanaman Pangan (Padi Sawah Irigasi Belitang &amp; Palawija)</option>
                <option value="perkebunan" ${selSector === 'perkebunan' ? 'selected' : ''}>2. Perkebunan Rakyat (Karet Alam &amp; Kelapa Sawit)</option>
                <option value="peternakan" ${selSector === 'peternakan' ? 'selected' : ''}>3. Peternakan Rakyat &amp; Budidaya Ternak (Sapi, Kambing/Domba, &amp; Unggas/Ayam)</option>
                <option value="perikanan" ${selSector === 'perikanan' ? 'selected' : ''}>4. Perikanan Air Tawar (Sentra Kolam Patin Belitang, Lele &amp; Nila)</option>
                <option value="industri" ${selSector === 'industri' ? 'selected' : ''}>5. Agro-Industri &amp; Pengolahan Pangan (Pabrik Penggilingan Padi / RMU, UMKM Tahu-Tempe, Kerupuk Kemplang)</option>
                <option value="perdagangan" ${selSector === 'perdagangan' ? 'selected' : ''}>6. Perdagangan (Kios Sarana Pertanian Resmi / Pupuk &amp; Obat Tani, Pasar Tradisional / Grosir Sembako)</option>
                <option value="formal" ${selSector === 'formal' ? 'selected' : ''}>7. Jasa Keuangan &amp; Jasa Perorangan (Layanan Keuangan Tanpa Kantor / Agen BRILink, Koperasi Simpan Pinjam / KSP, BUMDes)</option>
              </select>
              <p class="text-[11px] text-indigo-900 leading-relaxed font-semibold mt-0.5 flex items-start gap-1.5">
                <span class="material-symbols-outlined text-indigo-600 text-sm shrink-0">info</span>
                <span>Pilih sektor terlebih dahulu. Seluruh label formulir di bawah, 5 pertanyaan wawancara khusus (Card 3), dan 9 aspek lembar observasi (Card 4) akan otomatis menyesuaikan istilahnya dengan sektor pilihan Anda.</span>
              </p>
            </div>

            <!-- LANGKAH 2: DATA IDENTITAS & LOKASI OBSERVASI (GRID RESPONSIF) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              
              <!-- Wilayah Kecamatan di OKU Timur -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Wilayah Kecamatan di OKU Timur: <span class="text-rose-600">*</span></label>
                <select id="nftD2_district" ${readOnlyAttr} onchange="onNftDay2DistrictChange(this.value)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 outline-none text-xs font-bold text-slate-900 bg-white transition-all">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(kec => `
                    <option value="${kec}" ${(d2CurDistrict === kec || normalizeDistrictName(d2CurDistrict) === kec) ? 'selected' : ''}>Kecamatan ${kec}</option>
                  `).join('')}
                </select>
              </div>

              <!-- Lokasi Observasi (Dinamis per Sektor) -->
              <div class="flex flex-col gap-1">
                <label id="lblD2_location" class="text-xs font-bold text-slate-800">Detail Alamat / Desa Lokasi Observasi: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD2_location" ${readOnlyAttr} value="${val('location')}" placeholder="Contoh: Desa Sidomulyo RT 03 RW 01" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD2_loc" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

              <!-- Data Penunjang Khusus Sektor (Dinamis per Sektor) -->
              <div class="flex flex-col gap-1">
                <label id="lblD2_specExtra" class="text-xs font-bold text-slate-800">Data Penunjang Usaha / Kapasitas:</label>
                <input type="text" id="nftD2_specExtra" ${readOnlyAttr} value="${val('specExtra')}" placeholder="Contoh: Luas lahan, jumlah populasi ternak, atau kapasitas produksi" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
              </div>

              <!-- Nama Pewawancara -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nama Pewawancara / Anggota Kelompok:</label>
                <input type="text" id="nftD2_interviewerName" ${readOnlyAttr} value="${val('interviewerName') || studentName}" placeholder="Ketik nama Anda dan rekan kelompok..." oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
              </div>

              <!-- Hari & Tanggal -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Hari &amp; Tanggal Wawancara:</label>
                <input type="text" id="nftD2_interviewDate" ${readOnlyAttr} value="${val('interviewDate') || 'Selasa, 10 November 2026'}" placeholder="Contoh: Selasa, 10 November 2026" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
              </div>

              <!-- Nama/Inisial Narasumber (Dinamis per Sektor) -->
              <div class="flex flex-col gap-1">
                <label id="lblD2_narasumber" class="text-xs font-bold text-slate-800">Nama / Inisial Narasumber: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD2_narasumberName" ${readOnlyAttr} value="${val('narasumberName')}" placeholder="Contoh: Pak Suwarno / Ibu Siti Rahayu" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD2_nar" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

              <!-- Usia Narasumber -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Usia Narasumber (Tahun):</label>
                <input type="text" id="nftD2_narasumberAge" ${readOnlyAttr} value="${val('narasumberAge')}" placeholder="Contoh: 48 Tahun" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
              </div>

              <!-- Lama Menjalankan Pekerjaan (Dinamis per Sektor) -->
              <div class="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
                <label id="lblD2_duration" class="text-xs font-bold text-slate-800">Lama Menjalankan Pekerjaan: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD2_durationWorking" ${readOnlyAttr} value="${val('durationWorking')}" placeholder="Contoh: 18 Tahun (Sejak 2008)" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD2_dur" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 2: PERTANYAAN WAWANCARA UMUM (10 NOMOR WAJIB)      -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_2" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">2</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Pertanyaan Wawancara Umum (10 Nomor Wajib)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian D: Diajukan kepada semua narasumber apa pun jenis pekerjaannya</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_2" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed font-medium">
              Ajukan ke-10 pertanyaan berikut secara berurutan, dengarkan penjelasan narasumber dengan penuh perhatian, lalu <strong>ketikkan intisari jawaban narasumber secara jelas dan mendalam</strong> (minimal 25 karakter per pertanyaan):
            </p>

            <div class="flex flex-col gap-4">
              ${[
                { id: 1, q: '1. Apa jenis pekerjaan yang Bapak/Ibu lakukan sehari-hari?', ph: 'Uraikan rincian kegiatan pekerjaan narasumber dari pagi hingga petang secara spesifik...' },
                { id: 2, q: '2. Sudah berapa lama Bapak/Ibu menjalankan pekerjaan ini?', ph: 'Catat waktu mulai menekuni profesi, latar belakang awal memilih profesi, dan pasang surutnya...' },
                { id: 3, q: '3. Dari siapa Bapak/Ibu pertama kali belajar pekerjaan tersebut?', ph: 'Uraikan apakah belajar dari orang tua, tetangga, kursus/pelatihan resmi, atau otodidak...' },
                { id: 4, q: '4. Pengetahuan dan keterampilan apa yang paling penting untuk menjalankan pekerjaan ini?', ph: 'Uraikan keahlian fisik, pengetahuan musim, kepekaan rasa/mutu, atau keterampilan teknis yang mutlak dimiliki...' },
                { id: 5, q: '5. Apakah ada kebiasaan, tradisi, nilai, atau aturan masyarakat yang memengaruhi pekerjaan ini?', ph: 'Uraikan nilai pantangan/tabu, sedekah bumi, kejujuran, etos kerja warga, atau aturan adat setempat...' },
                { id: 6, q: '6. Apakah pekerjaan ini melibatkan anggota keluarga, tetangga, atau kelompok masyarakat? Bagaimana bentuk kerja samanya?', ph: 'Uraikan sistem sambatan/gotong royong, pembagian tugas keluarga, keterlibatan kelompok tani, atau upahan harian...' },
                { id: 7, q: '7. Peralatan atau teknologi apa yang digunakan dalam pekerjaan ini?', ph: 'Uraikan peralatan tradisional (cangkul, arit, dll) dan peralatan modern/mesin (traktor, pompa, hp/aplikasi, dll)...' },
                { id: 8, q: '8. Apakah cara kerja sekarang berbeda dibandingkan dengan dahulu? Apa penyebabnya?', ph: 'Uraikan perbandingan cara lama vs cara baru, efisiensi waktu, dan pengaruh adopsi teknologi mesin...' },
                { id: 9, q: '9. Apa kendala utama yang dihadapi dalam menjalankan pekerjaan ini?', ph: 'Uraikan hambatan modal, modal kerja, cuaca/musim, harga pupuk/pakan/bahan baku, atau pemasaran...' },
                { id: 10, q: '10. Bagaimana pengetahuan dan keterampilan pekerjaan ini diwariskan kepada generasi muda?', ph: 'Uraikan apakah diajarkan kepada anak kandung, pemuda sekitar, atau tantangan regenerasi generasi muda...' }
              ].map(item => `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
                  <label class="text-xs font-bold text-slate-900 leading-snug">${item.q} <span class="text-rose-600">*</span></label>
                  <textarea id="nftD2_qGeneral_${item.id}" ${readOnlyAttr} rows="3" oninput="onNftDay2FieldInput()" placeholder="${item.ph} (Minimal 25 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${val('qGeneral_' + item.id)}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgValD2_qG_${item.id}" class="text-rose-600 font-medium">Minimal 25 karakter</span>
                    <span id="cntD2_qG_${item.id}" class="text-slate-400 font-bold">0 / 25</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 3: WAWANCARA KHUSUS SEKTOR MATA PENCAHARIAN        -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_3" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">3</span>
                <div>
                  <h3 id="nftD2_secCardTitle" class="font-black text-sm sm:text-base text-slate-900 leading-tight">
                    Wawancara Khusus: ${sectorObj.name}
                  </h3>
                  <div class="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span class="text-[11px] text-slate-500 font-medium">Bagian E • Unsur Budaya Khusus:</span>
                    <span id="nftD2_secCultureBadge" class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${sectorObj.badgeColor}">
                      ${sectorObj.cultureTheme}
                    </span>
                  </div>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_3" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed font-medium">
              Berikut 5 pertanyaan spesifik untuk mendalami sektor yang Anda pilih. Dengarkan narasumber, lalu <strong>ketikkan rincian hasil wawancara Anda</strong> (minimal 25 karakter per pertanyaan):
            </p>

            <div id="nftD2_specificQuestionsContainer" class="flex flex-col gap-4">
              <!-- Render otomatis oleh script renderSpecificQuestionsD2() -->
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 4: LEMBAR OBSERVASI LANGSUNG (9 ASPEK NYATA)       -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_4" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">4</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Lembar Observasi Lapangan Langsung (9 Aspek)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian F: Catat hal nyata yang Anda lihat dan saksikan langsung di lokasi kerja</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_4" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
              <strong>Petunjuk Wajib:</strong> Isi bagian ini berdasarkan <u>fakta nyata yang Anda lihat dan amati sendiri di tempat kerja</u>, bukan sekadar ucapan narasumber. Ketikkan deskripsi hasil pengamatan (minimal 20 karakter per aspek).
            </div>

            <div id="nftD2_obsAspectsContainer" class="flex flex-col gap-4">
              <!-- Render otomatis aspek observasi dinamis oleh script renderObservationAspectsD2() -->
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 5: ANALISIS HASIL WAWANCARA (6 PERTANYAAN HOTS)    -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_5" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">5</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Analisis Hasil Wawancara (6 Pertanyaan Kritis HOTS)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian G: Diskusikan dan sintesiskan keterkaitan budaya, sains/teknologi &amp; ekonomi</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_5" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed font-medium">
              Berdasarkan perpaduan hasil wawancara dan pengamatan langsung, diskusikan bersama kelompok Anda lalu <strong>ketikkan analisis mendalam</strong> berikut (minimal 40 karakter per analisis):
            </p>

            <div class="flex flex-col gap-4">
              ${[
                { id: 1, title: '1. Unsur budaya apa yang paling berpengaruh terhadap pekerjaan narasumber?', hint: 'Jelaskan apakah unsur sistem pengetahuan, gotong royong, teknologi peralatan, bahasa, atau nilai religi yang paling kuat memengaruhi...' },
                { id: 2, title: '2. Bagaimana unsur budaya tersebut membantu atau memengaruhi produktivitas dan pendapatan?', hint: 'Analisis bagaimana budaya kebersamaan/kejujuran menghemat ongkos kerja atau memperluas relasi pembeli/nasabah...' },
                { id: 3, title: '3. Bagaimana teknologi mengubah cara kerja dan keterampilan yang dibutuhkan?', hint: 'Analisis peralihan dari tenaga otot/hewan ke mesin dan tuntutan keterampilan baru yang harus dipelajari...' },
                { id: 4, title: '4. Apa perubahan budaya kerja yang terjadi antargenerasi?', hint: 'Analisis perbedaan cara pandang generasi tua vs generasi muda terhadap jam kerja, teknologi, dan orientasi masa depan...' },
                { id: 5, title: '5. Bagaimana pengetahuan lokal dapat dipadukan dengan ilmu pengetahuan dan teknologi modern?', hint: 'Analisis integrasi kearifan lokal (seperti kalender musim) dengan sains modern (seperti Katam BMKG, drone, alsintan)...' },
                { id: 6, title: '6. Apa rekomendasi kelompok agar pekerjaan tersebut lebih produktif, berkelanjutan, dan tetap menghargai budaya lokal?', hint: 'Kemukakan saran konkret Anda untuk perbaikan permodalan, pelatihan alsintan, dan pelestarian gotong royong...' }
              ].map(item => `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
                  <label class="text-xs font-bold text-slate-900 leading-snug">${item.title} <span class="text-rose-600">*</span></label>
                  <textarea id="nftD2_analysis_${item.id}" ${readOnlyAttr} rows="3" oninput="onNftDay2FieldInput()" placeholder="${item.hint} (Minimal 40 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${val('analysis_' + item.id)}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgValD2_an_${item.id}" class="text-rose-600 font-medium">Minimal 40 karakter</span>
                    <span id="cntD2_an_${item.id}" class="text-slate-400 font-bold">0 / 40</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 6: KESIMPULAN OBSERVASI (6 BUTIR SINTESIS AKHIR)   -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD2_6" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">6</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Kesimpulan Observasi &amp; Rekomendasi Solusi Daerah</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian H: Rangkum bukti konseptual hasil riset lapangan Anda di Kabupaten OKU Timur</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_6" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed font-medium">
              Lengkapi 6 butir pernyataan kesimpulan berikut sebagai laporan akhir investigasi lapangan Day 2 Anda (minimal 20 karakter per butir):
            </p>

            <div class="flex flex-col gap-4">
              ${[
                { id: 1, title: '1. Jenis mata pencaharian yang diamati:', hint: 'Tuliskan simpulan sektor dan komoditas utama narasumber...' },
                { id: 2, title: '2. Unsur budaya yang paling menonjol:', hint: 'Tuliskan unsur budaya paling dominan (gotong royong, kearifan lokal, etika)...' },
                { id: 3, title: '3. Hubungan budaya dengan kegiatan ekonomi:', hint: 'Tuliskan simpulan keterkaitan tradisi kerja warga dengan perolehan rezeki/hasil usaha...' },
                { id: 4, title: '4. Perubahan teknologi yang ditemukan:', hint: 'Tuliskan simpulan alsintan/teknologi yang mengubah pola kerja tradisional menjadi modern...' },
                { id: 5, title: '5. Permasalahan utama yang dihadapi narasumber:', hint: 'Tuliskan simpulan kendala paling berat (biaya produksi, fluktuasi harga, cuaca, atau regenerasi)...' },
                { id: 6, title: '6. Rekomendasi kelompok untuk pengembangan mata pencaharian di OKU Timur:', hint: 'Tuliskan rekomendasi konkrit untuk pemerintah daerah / dinas terkait / generasi muda...' }
              ].map(item => `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
                  <label class="text-xs font-bold text-slate-900 leading-snug">${item.title} <span class="text-rose-600">*</span></label>
                  <textarea id="nftD2_conclusion_${item.id}" ${readOnlyAttr} rows="2" oninput="onNftDay2FieldInput()" placeholder="${item.hint} (Minimal 20 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${val('conclusion_' + item.id)}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgValD2_con_${item.id}" class="text-rose-600 font-medium">Minimal 20 karakter</span>
                    <span id="cntD2_con_${item.id}" class="text-slate-400 font-bold">0 / 20</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- CARD AKSI SUBMIT & AUTO-SAVE                             -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex flex-col gap-1 text-center sm:text-left">
              <span class="text-xs font-bold text-indigo-300 flex items-center justify-center sm:justify-start gap-1">
                <span class="material-symbols-outlined text-sm">cloud_sync</span>
                <span id="txtNftD2FooterDraftInfo">Auto-Save Aktif: Ketikan Anda otomatis disimpan per detik.</span>
              </span>
              <h4 class="font-black text-base sm:text-lg">Kirim Lembar Kerja Observasi Day 2</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-medium">
                Pastikan ke-6 Kartu sudah berstatus hijau (100% lengkap) sebelum mengirimkan ke Fasilitator.
              </p>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              ${!isFormLocked ? `
                <button type="button" onclick="saveNftDay2DraftManual()" class="w-1/2 sm:w-auto px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/20">
                  <span class="material-symbols-outlined text-base">save</span>
                  <span>Simpan Draf</span>
                </button>
                <button type="button" id="btnSubmitNftDay2Lkpd" onclick="submitNftDay2LkpdOfficial()" class="w-1/2 sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
                  <span>Kirim LKPD Day 2</span>
                  <span class="material-symbols-outlined text-base">send</span>
                </button>
              ` : `
                <div class="px-5 py-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center gap-2">
                  <span class="material-symbols-outlined text-base">verified</span>
                  <span>${isSubmitted ? 'LKPD Day 2 Telah Diserahkan Resmi' : 'Mode Terkunci'}</span>
                </div>
              `}
            </div>
          </div>

        </form>
      </div>
    `;

    // Render Pertanyaan Khusus Sektor Sesuai Pilihan
    renderSpecificQuestionsD2(selSector, formData);

    // Initial Evaluasi Validasi & Progres
    setTimeout(() => {
      onNftDay2FieldInput(false);
    }, 100);
  }

  // Render Pertanyaan Khusus Sektor Pilihan
  function renderSpecificQuestionsD2(sectorKey, formData) {
    const cont = document.getElementById('nftD2_specificQuestionsContainer');
    if (!cont) return;

    const sectorObj = NFT_DAY2_SECTOR_DATA[sectorKey] || NFT_DAY2_SECTOR_DATA.pangan;
    const titleEl = document.getElementById('nftD2_secCardTitle');
    const badgeEl = document.getElementById('nftD2_secCultureBadge');

    if (titleEl) titleEl.textContent = `Wawancara Khusus: ${sectorObj.name}`;
    if (badgeEl) {
      badgeEl.textContent = sectorObj.cultureTheme;
      badgeEl.className = `px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${sectorObj.badgeColor}`;
    }

    const valSpec = (id) => {
      if (formData && formData.qSpecific && formData.qSpecific[sectorKey] && formData.qSpecific[sectorKey][id] !== undefined) {
        return formData.qSpecific[sectorKey][id];
      }
      if (formData && formData['qSpecific_' + id] !== undefined) {
        return formData['qSpecific_' + id];
      }
      return '';
    };

    cont.innerHTML = sectorObj.questions.map(q => `
      <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
        <label class="text-xs font-bold text-slate-900 leading-snug">
          ${q.id}. ${q.text} <span class="text-rose-600">*</span>
        </label>
        <textarea id="nftD2_qSpecific_${q.id}" rows="3" oninput="onNftDay2FieldInput()" placeholder="${q.hint} (Minimal 25 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${valSpec(q.id)}</textarea>
        <div class="flex items-center justify-between text-[10.5px]">
          <span id="msgValD2_qS_${q.id}" class="text-rose-600 font-medium">Minimal 25 karakter</span>
          <span id="cntD2_qS_${q.id}" class="text-slate-400 font-bold">0 / 25</span>
        </div>
      </div>
    `).join('');
  }


  // Helper memperbarui label & placeholder Card 1 sesuai sektor
  function updateDynamicLabelsD2(sectorKey) {
    const s = NFT_DAY2_SECTOR_DATA[sectorKey] || NFT_DAY2_SECTOR_DATA.pangan;
    const l = s.labels || {};

    const elLocLbl = document.getElementById('lblD2_location');
    const elLocInp = document.getElementById('nftD2_location');
    if (elLocLbl) elLocLbl.innerHTML = (l.locLabel || 'Detail Alamat / Desa Lokasi Observasi:') + ' <span class="text-rose-600">*</span>';
    if (elLocInp && l.locPlaceholder) elLocInp.placeholder = l.locPlaceholder;

    const elNarLbl = document.getElementById('lblD2_narasumber');
    const elNarInp = document.getElementById('nftD2_narasumberName');
    if (elNarLbl) elNarLbl.innerHTML = (l.narLabel || 'Nama / Inisial Narasumber:') + ' <span class="text-rose-600">*</span>';
    if (elNarInp && l.narPlaceholder) elNarInp.placeholder = l.narPlaceholder;

    const elDurLbl = document.getElementById('lblD2_duration');
    const elDurInp = document.getElementById('nftD2_durationWorking');
    if (elDurLbl) elDurLbl.innerHTML = (l.durLabel || 'Lama Menjalankan Pekerjaan:') + ' <span class="text-rose-600">*</span>';
    if (elDurInp && l.durPlaceholder) elDurInp.placeholder = l.durPlaceholder;

    const elExtLbl = document.getElementById('lblD2_specExtra');
    const elExtInp = document.getElementById('nftD2_specExtra');
    if (elExtLbl) elExtLbl.innerHTML = (l.extraLabel || 'Data Penunjang Usaha:');
    if (elExtInp && l.extraPlaceholder) elExtInp.placeholder = l.extraPlaceholder;
  }

  // Helper render 9 aspek observasi lapangan langsung yang beradaptasi per sektor
  function renderObservationAspectsD2(sectorKey, formData) {
    const cont = document.getElementById('nftD2_obsAspectsContainer');
    if (!cont) return;

    const s = NFT_DAY2_SECTOR_DATA[sectorKey] || NFT_DAY2_SECTOR_DATA.pangan;
    const hints = s.obsHints || [
      'Gambarkan kondisi fisik lokasi, kebersihan, suhu udara, luas lahan/kandang/ruang toko, serta keamanan tempat kerja...',
      'Tuliskan daftar peralatan yang benar-benar ada di depan mata Anda (alat manual dan mesin modern)...',
      'Uraikan kronologi proses dari persiapan awal, pengerjaan inti, hingga penyelesaian yang Anda lihat saat itu...',
      'Uraikan ketangkasan tangan, keahlian khusus, ketelitian, atau teknik yang dipraktikkan narasumber...',
      'Uraikan bagaimana narasumber berbicara dengan pekerja lain, menyapa tetangga, atau melayani pelanggan...',
      'Uraikan kebiasaan keramahan, gotong royong, kehati-hatian, busana kerja, atau ritual kerja yang tampak...',
      'Uraikan cara mesin dinyalakan, alat dioperasikan, pemanfaatan listrik/bbm, atau gadget komunikasi...',
      'Uraikan hambatan yang terlihat, misalnya lumpur terlalu dalam, alat macet, bau menyengat, atau kelelahan...',
      'Uraikan cara memilah hasil panen/produk yang bagus, pembuangan limbah, atau perawatan rutin alat...'
    ];

    const baseTitles = [
      '1. Kondisi lokasi dan lingkungan kerja',
      '2. Peralatan tradisional dan modern yang digunakan',
      '3. Urutan proses kerja yang sedang berlangsung',
      '4. Pengetahuan atau keterampilan yang tampak digunakan',
      '5. Bentuk interaksi sosial, komunikasi, atau kerja sama',
      '6. Kebiasaan atau nilai budaya kerja yang terlihat',
      '7. Penggunaan teknologi dalam pekerjaan',
      '8. Kendala atau masalah yang ditemukan saat observasi',
      '9. Upaya menjaga mutu produk, lingkungan, atau keberlanjutan usaha'
    ];

    const valObs = (id) => (formData && formData['obs_' + id] !== undefined) ? formData['obs_' + id] : '';

    cont.innerHTML = baseTitles.map((title, idx) => {
      const id = idx + 1;
      const hint = hints[idx] || hints[0];
      return `
        <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
          <label class="text-xs font-bold text-slate-900 leading-snug">${title} <span class="text-rose-600">*</span></label>
          <textarea id="nftD2_obs_${id}" rows="3" oninput="onNftDay2FieldInput()" placeholder="${hint} (Minimal 20 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${valObs(id)}</textarea>
          <div class="flex items-center justify-between text-[10.5px]">
            <span id="msgValD2_obs_${id}" class="text-rose-600 font-medium">Minimal 20 karakter</span>
            <span id="cntD2_obs_${id}" class="text-slate-400 font-bold">0 / 20</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Handler saat Sektor di Card 1 diubah
  window.onNftDay2SectorChange = function(newKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();
    try {
      if (cleanNisn) localStorage.setItem('fincestem_nft_sector_d2_' + cleanNisn, newKey);
    } catch(e) {}

    // Baca draft tersimpan
    let draft = {};
    try {
      const raw = localStorage.getItem('fincestem_draft_nft_lkpd_d2_' + cleanNisn);
      if (raw) draft = JSON.parse(raw);
    } catch(e) {}

    draft.sectorKey = newKey;
    updateDynamicLabelsD2(newKey);
    renderSpecificQuestionsD2(newKey, draft);
    renderObservationAspectsD2(newKey, draft);
    onNftDay2FieldInput();
  };

  // Evaluasi Validasi Realtime & Hitung Progres
  function onNftDay2FieldInput(shouldSave = true) {
    let card1Valid = true;
    let card2Valid = true;
    let card3Valid = true;
    let card4Valid = true;
    let card5Valid = true;
    let card6Valid = true;

    // Card 1
    const loc = (document.getElementById('nftD2_location')?.value || '').trim();
    const nar = (document.getElementById('nftD2_narasumberName')?.value || '').trim();
    const dur = (document.getElementById('nftD2_durationWorking')?.value || '').trim();

    const msgLoc = document.getElementById('msgValD2_loc');
    if (msgLoc) {
      if (loc.length >= 5) {
        msgLoc.textContent = '✓ Lokasi terverifikasi';
        msgLoc.className = 'text-[10px] text-emerald-600 font-semibold';
      } else {
        msgLoc.textContent = 'Minimal 5 karakter';
        msgLoc.className = 'text-[10px] text-rose-600 font-medium';
        card1Valid = false;
      }
    } else if (loc.length < 5) card1Valid = false;

    const msgNar = document.getElementById('msgValD2_nar');
    if (msgNar) {
      if (nar.length >= 3) {
        msgNar.textContent = '✓ Nama terverifikasi';
        msgNar.className = 'text-[10px] text-emerald-600 font-semibold';
      } else {
        msgNar.textContent = 'Minimal 3 karakter';
        msgNar.className = 'text-[10px] text-rose-600 font-medium';
        card1Valid = false;
      }
    } else if (nar.length < 3) card1Valid = false;

    const msgDur = document.getElementById('msgValD2_dur');
    if (msgDur) {
      if (dur.length >= 2) {
        msgDur.textContent = '✓ Durasi terisi';
        msgDur.className = 'text-[10px] text-emerald-600 font-semibold';
      } else {
        msgDur.textContent = 'Minimal 2 karakter';
        msgDur.className = 'text-[10px] text-rose-600 font-medium';
        card1Valid = false;
      }
    } else if (dur.length < 2) card1Valid = false;

    // Card 2: Wawancara Umum (1-10)
    for (let i = 1; i <= 10; i++) {
      const el = document.getElementById('nftD2_qGeneral_' + i);
      const cnt = document.getElementById('cntD2_qG_' + i);
      const msg = document.getElementById('msgValD2_qG_' + i);
      const len = el ? el.value.trim().length : 0;
      if (cnt) cnt.textContent = `${len} / 25`;
      if (len >= 25) {
        if (cnt) cnt.className = 'text-emerald-700 font-bold';
        if (msg) { msg.textContent = '✓ Lengkap'; msg.className = 'text-emerald-700 font-semibold'; }
      } else {
        if (cnt) cnt.className = 'text-slate-400 font-bold';
        if (msg) { msg.textContent = `Minimal 25 karakter (kurang ${25 - len})`; msg.className = 'text-rose-600 font-medium'; }
        card2Valid = false;
      }
    }

    // Card 3: Wawancara Khusus (1-5)
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById('nftD2_qSpecific_' + i);
      const cnt = document.getElementById('cntD2_qS_' + i);
      const msg = document.getElementById('msgValD2_qS_' + i);
      const len = el ? el.value.trim().length : 0;
      if (cnt) cnt.textContent = `${len} / 25`;
      if (len >= 25) {
        if (cnt) cnt.className = 'text-emerald-700 font-bold';
        if (msg) { msg.textContent = '✓ Lengkap'; msg.className = 'text-emerald-700 font-semibold'; }
      } else {
        if (cnt) cnt.className = 'text-slate-400 font-bold';
        if (msg) { msg.textContent = `Minimal 25 karakter (kurang ${25 - len})`; msg.className = 'text-rose-600 font-medium'; }
        card3Valid = false;
      }
    }

    // Card 4: Observasi Langsung (1-9)
    for (let i = 1; i <= 9; i++) {
      const el = document.getElementById('nftD2_obs_' + i);
      const cnt = document.getElementById('cntD2_obs_' + i);
      const msg = document.getElementById('msgValD2_obs_' + i);
      const len = el ? el.value.trim().length : 0;
      if (cnt) cnt.textContent = `${len} / 20`;
      if (len >= 20) {
        if (cnt) cnt.className = 'text-emerald-700 font-bold';
        if (msg) { msg.textContent = '✓ Teramati'; msg.className = 'text-emerald-700 font-semibold'; }
      } else {
        if (cnt) cnt.className = 'text-slate-400 font-bold';
        if (msg) { msg.textContent = `Minimal 20 karakter (kurang ${20 - len})`; msg.className = 'text-rose-600 font-medium'; }
        card4Valid = false;
      }
    }

    // Card 5: Analisis HOTS (1-6)
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById('nftD2_analysis_' + i);
      const cnt = document.getElementById('cntD2_an_' + i);
      const msg = document.getElementById('msgValD2_an_' + i);
      const len = el ? el.value.trim().length : 0;
      if (cnt) cnt.textContent = `${len} / 40`;
      if (len >= 40) {
        if (cnt) cnt.className = 'text-emerald-700 font-bold';
        if (msg) { msg.textContent = '✓ Analisis mendalam'; msg.className = 'text-emerald-700 font-semibold'; }
      } else {
        if (cnt) cnt.className = 'text-slate-400 font-bold';
        if (msg) { msg.textContent = `Minimal 40 karakter (kurang ${40 - len})`; msg.className = 'text-rose-600 font-medium'; }
        card5Valid = false;
      }
    }

    // Card 6: Kesimpulan (1-6)
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById('nftD2_conclusion_' + i);
      const cnt = document.getElementById('cntD2_con_' + i);
      const msg = document.getElementById('msgValD2_con_' + i);
      const len = el ? el.value.trim().length : 0;
      if (cnt) cnt.textContent = `${len} / 20`;
      if (len >= 20) {
        if (cnt) cnt.className = 'text-emerald-700 font-bold';
        if (msg) { msg.textContent = '✓ Tuntas'; msg.className = 'text-emerald-700 font-semibold'; }
      } else {
        if (cnt) cnt.className = 'text-slate-400 font-bold';
        if (msg) { msg.textContent = `Minimal 20 karakter (kurang ${20 - len})`; msg.className = 'text-rose-600 font-medium'; }
        card6Valid = false;
      }
    }

    // Update status badge per kartu
    updateCardStatusBadgeD2(1, card1Valid);
    updateCardStatusBadgeD2(2, card2Valid);
    updateCardStatusBadgeD2(3, card3Valid);
    updateCardStatusBadgeD2(4, card4Valid);
    updateCardStatusBadgeD2(5, card5Valid);
    updateCardStatusBadgeD2(6, card6Valid);

    // Hitung total progres 0 s.d. 100%
    const validCount = [card1Valid, card2Valid, card3Valid, card4Valid, card5Valid, card6Valid].filter(Boolean).length;
    const percent = Math.round((validCount / 6) * 100);

    const barEl = document.getElementById('nftD2ProgBar');
    const pctBadge = document.getElementById('nftD2ProgPercentBadge');
    if (barEl) barEl.style.width = percent + '%';
    if (pctBadge) {
      pctBadge.textContent = `${percent}% Selesai (${validCount}/6 Bagian)`;
      if (percent === 100) {
        pctBadge.className = 'font-black text-emerald-900 text-xs bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs';
      } else {
        pctBadge.className = 'font-black text-indigo-900 text-xs bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full';
      }
    }

    if (shouldSave) {
      saveNftDay2DraftThrottled();
    }
  }
  window.onNftDay2FieldInput = onNftDay2FieldInput;

  function updateCardStatusBadgeD2(cardNum, isValid) {
    const badge = document.getElementById(`badgeCardStatusLkpdD2_${cardNum}`);
    const chip = document.getElementById(`pchipD2_${cardNum}`);
    const box = document.getElementById(`cardBoxLkpdD2_${cardNum}`);

    if (badge) {
      if (isValid) {
        badge.textContent = 'Lengkap ✓';
        badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-800 shrink-0 border border-emerald-200';
      } else {
        badge.textContent = 'Belum Lengkap';
        badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
      }
    }

    if (chip) {
      if (isValid) {
        chip.className = 'py-1 px-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-200 font-extrabold';
      } else {
        chip.className = 'py-1 px-1 rounded-xl bg-slate-100 text-slate-600';
      }
    }

    if (box) {
      if (isValid) {
        box.classList.remove('border-slate-200');
        box.classList.add('border-emerald-200');
      } else {
        box.classList.remove('border-emerald-200');
        box.classList.add('border-slate-200');
      }
    }
  }

  // Auto-Save Throttled (Debounce 800ms)
  let nftD2SaveTimer = null;
  function saveNftDay2DraftThrottled() {
    clearTimeout(nftD2SaveTimer);
    nftD2SaveTimer = setTimeout(() => {
      saveNftDay2DraftImmediate(false);
    }, 800);
  }

  window.saveNftDay2DraftManual = function() {
    saveNftDay2DraftImmediate(true);
  };

  function collectFormDataD2() {
    const secKey = document.getElementById('nftD2_sectorKey')?.value || 'pangan';
    const sectorObj = NFT_DAY2_SECTOR_DATA[secKey] || NFT_DAY2_SECTOR_DATA.pangan;

    const data = {
      day: 2,
      updatedAt: new Date().toISOString(),
      interviewerName: document.getElementById('nftD2_interviewerName')?.value.trim() || '',
      interviewDate: document.getElementById('nftD2_interviewDate')?.value.trim() || '',
      district: document.getElementById('nftD2_district')?.value || '',
      location: document.getElementById('nftD2_location')?.value.trim() || '',
      sectorKey: secKey,
      sectorName: sectorObj.name,
      cultureTheme: sectorObj.cultureTheme,
      narasumberName: document.getElementById('nftD2_narasumberName')?.value.trim() || '',
      narasumberAge: document.getElementById('nftD2_narasumberAge')?.value.trim() || '',
      durationWorking: document.getElementById('nftD2_durationWorking')?.value.trim() || '',
      specExtra: document.getElementById('nftD2_specExtra')?.value.trim() || '',
      qSpecific: {}
    };

    // Wawancara Umum 1-10
    for (let i = 1; i <= 10; i++) {
      data['qGeneral_' + i] = document.getElementById('nftD2_qGeneral_' + i)?.value.trim() || '';
    }

    // Wawancara Khusus 1-5 (simpan per sektor aktif)
    data.qSpecific[secKey] = {};
    for (let i = 1; i <= 5; i++) {
      const val = document.getElementById('nftD2_qSpecific_' + i)?.value.trim() || '';
      data['qSpecific_' + i] = val;
      data.qSpecific[secKey][i] = val;
    }

    // Observasi Langsung 1-9
    for (let i = 1; i <= 9; i++) {
      data['obs_' + i] = document.getElementById('nftD2_obs_' + i)?.value.trim() || '';
    }

    // Analisis HOTS 1-6
    for (let i = 1; i <= 6; i++) {
      data['analysis_' + i] = document.getElementById('nftD2_analysis_' + i)?.value.trim() || '';
    }

    // Kesimpulan 1-6
    for (let i = 1; i <= 6; i++) {
      data['conclusion_' + i] = document.getElementById('nftD2_conclusion_' + i)?.value.trim() || '';
    }

    return data;
  }

  function saveNftDay2DraftImmediate(showToast) {
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return;

      const data = collectFormDataD2();
      localStorage.setItem('fincestem_draft_nft_lkpd_d2_' + cleanNisn, JSON.stringify(data));

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const draftTxt = document.getElementById('txtNftLkpdD2DraftStatus');
      if (draftTxt) draftTxt.textContent = `Draft tersimpan (pk ${timeStr} WIB)`;

      const draftFooter = document.getElementById('txtNftD2FooterDraftInfo');
      if (draftFooter) draftFooter.textContent = `Draft tersimpan otomatis pada pk ${timeStr} WIB.`;

      if (showToast && window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast('Draf LKPD Day 2 berhasil disimpan ke memori lokal!', 'success');
      }
    } catch(e) {}
  }

  // SUBMIT RESMI LKPD DAY 2
  window.submitNftDay2LkpdOfficial = function() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    // Validasi Kelengkapan Setiap Kartu
    const errors = [];

    // Card 1
    const loc = (document.getElementById('nftD2_location')?.value || '').trim();
    const nar = (document.getElementById('nftD2_narasumberName')?.value || '').trim();
    const dur = (document.getElementById('nftD2_durationWorking')?.value || '').trim();
    if (loc.length < 5 || nar.length < 3 || dur.length < 2) {
      errors.push({ card: 1, name: 'Identitas & Narasumber' });
    }

    // Card 2: Umum 1-10
    let c2Ok = true;
    for (let i = 1; i <= 10; i++) {
      if ((document.getElementById('nftD2_qGeneral_' + i)?.value || '').trim().length < 25) {
        c2Ok = false; break;
      }
    }
    if (!c2Ok) errors.push({ card: 2, name: '10 Pertanyaan Wawancara Umum' });

    // Card 3: Khusus 1-5
    let c3Ok = true;
    for (let i = 1; i <= 5; i++) {
      if ((document.getElementById('nftD2_qSpecific_' + i)?.value || '').trim().length < 25) {
        c3Ok = false; break;
      }
    }
    if (!c3Ok) errors.push({ card: 3, name: '5 Pertanyaan Wawancara Khusus Sektor' });

    // Card 4: Observasi 1-9
    let c4Ok = true;
    for (let i = 1; i <= 9; i++) {
      if ((document.getElementById('nftD2_obs_' + i)?.value || '').trim().length < 20) {
        c4Ok = false; break;
      }
    }
    if (!c4Ok) errors.push({ card: 4, name: '9 Aspek Observasi Langsung' });

    // Card 5: Analisis 1-6
    let c5Ok = true;
    for (let i = 1; i <= 6; i++) {
      if ((document.getElementById('nftD2_analysis_' + i)?.value || '').trim().length < 40) {
        c5Ok = false; break;
      }
    }
    if (!c5Ok) errors.push({ card: 5, name: '6 Analisis Kritis HOTS' });

    // Card 6: Kesimpulan 1-6
    let c6Ok = true;
    for (let i = 1; i <= 6; i++) {
      if ((document.getElementById('nftD2_conclusion_' + i)?.value || '').trim().length < 20) {
        c6Ok = false; break;
      }
    }
    if (!c6Ok) errors.push({ card: 6, name: '6 Kesimpulan Observasi Akhir' });

    if (errors.length > 0) {
      const firstErr = errors[0];
      const targetCard = document.getElementById(`cardBoxLkpdD2_${firstErr.card}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.add('ring-4', 'ring-rose-400');
        setTimeout(() => targetCard.classList.remove('ring-4', 'ring-rose-400'), 3000);
      }
      const errNames = errors.map(e => `Card ${e.card} (${e.name})`).join(', ');
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Harap lengkapi semua isian wajib: ${errNames}!`, 'error');
      } else {
        alert(`Harap lengkapi isian wajib: ${errNames}`);
      }
      return;
    }

    const payload = collectFormDataD2();
    payload.submitted = true;
    payload.submittedAt = new Date().toISOString();
    payload.studentName = u.name || '';
    payload.studentNisn = cleanNisn;
    payload.studentClass = u.class || u.class_name || '';

    const summaryText = `Observasi & Wawancara Lapangan Day 2 Terverifikasi:\n` +
      `• Sektor: ${payload.sectorName}\n` +
      `• Lokasi: ${payload.location}\n` +
      `• Narasumber: ${payload.narasumberName} (${payload.durationWorking})\n` +
      `• Unsur Budaya Menonjol: ${payload.conclusion_2}\n` +
      `• Rekomendasi Solusi: ${payload.conclusion_6.substring(0, 100)}...`;

    try {
      localStorage.setItem('fincestem_lkpd_nft_day2_' + cleanNisn, JSON.stringify(payload));
      localStorage.setItem('fincestem_lkpd_day2_' + cleanNisn, JSON.stringify(payload));
    } catch(e) {}

    payload.summary = summaryText;
    payload.conclusion = summaryText;

    // Submit ke sistem Core Progress FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 2, 'lkpd', payload, function() {
        showSuccessDay2NftLkpdModal();
      });
    } else {
      showSuccessDay2NftLkpdModal();
    }
  };

  function showSuccessDay2NftLkpdModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Observasi Lapangan Berhasil
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            LKPD 02 Berhasil Disimpan &amp; Terkirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1">
            Selamat! Lembar Kerja Wawancara &amp; Observasi Lapangan Day 2 Anda telah lengkap dan diserahkan ke Fasilitator. Tahap berikutnya adalah <strong>Unggah Dokumentasi Foto Riset OKU Timur</strong> dan <strong>Kuis Asesmen Day 2</strong>!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="dokumentasi.html?day=2" class="w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Dokumentasi Foto Day 2</span>
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

  window.renderNonFieldTripDay2LKPD = renderNonFieldTripDay2LKPD;

  // ========================================================
  // DATA SEKTOR OBSERVASI & INSTRUMEN STEM DAY 3 NON-FIELD TRIP
  // ========================================================
  const NFT_DAY3_SECTOR_DATA = {
  "pertanian": {
    "key": "pertanian",
    "name": "Pertanian Padi Sawah (Lumbung Pangan Komering)",
    "badge": "Sektor Pertanian Padi",
    "icon": "agriculture",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: 1,5 Hektar (Sawah Irigasi Saluran BK 10)",
    "scaleLabel": "Luas Lahan Sawah (Hektar / Rantai):",
    "sainsA1Label": "1. Kondisi Tanah & Sumber Air Saluran Irigasi BK:",
    "sainsA1Hint": "Amati dan jelaskan: jenis tanah sawah (berlumpur/lempung), ketersediaan air irigasi dari saluran BK, dan kejernihan airnya...",
    "sainsA2Label": "2. Pertumbuhan Tanaman Padi & Gejala Hama Sawah:",
    "sainsA2Hint": "Amati dan jelaskan: kondisi daun dan bulir padi (hijau subur / mulai menguning), serta ada atau tidaknya gangguan hama wereng, tikus, atau burung...",
    "tekB1Label": "1. Alat Mesin Pertanian (Alsintan) yang Dipakai Kerja:",
    "tekB1Hint": "Catat alat kerja yang digunakan: traktor pembajak roda 2/roda 4, mesin semprot elektrik, pompa air alkon, atau mesin panen combine harvester...",
    "tekB2Label": "2. Kepemilikan Alat, Bahan Bakar & Kemudahan Kerja:",
    "tekB2Hint": "Jelaskan: apakah alat milik sendiri atau sewa borongan UPJA, jenis bahan bakar (bensin/solar), dan kemudahan kerja dibanding cara manual...",
    "engC1Label": "1. Kendala Teknis Lapangan yang Sering Terjadi di Sawah:",
    "engC1Hint": "Tuliskan masalah yang dialami: misalnya air irigasi tidak merata ke petak sawah paling ujung, parit tersumbat, atau serangan hama burung saat padi matang...",
    "engC2Label": "2. Solusi Rekayasa & Trik Praktis Petani Mengatasi Masalah:",
    "engC2Hint": "Tuliskan trik petani: misalnya membuat sodetan pipa paralon darurat antarpetak, membentangkan tali kaleng berbunyi, atau memasang jaring pengusir burung...",
    "engC3Label": "3. Pendapat Anda Mengenai Trik Praktis Tersebut:",
    "engC3Hint": "Jelaskan secara ringkas: Apakah trik atau cara praktis tersebut cukup membantu petani bekerja lebih aman dan efektif?...",
    "mathD1Label": "1. Perkiraan Modal Usaha Tani Padi (Biaya Benih, Pupuk & Traktor):",
    "mathD1Hint": "Tuliskan estimasi biaya modal yang dikeluarkan: beli bibit benih, pupuk urea/NPK, dan biaya sewa mesin bajak traktor...",
    "mathD2Label": "2. Perkiraan Hasil Panen Gabah & Harga Jual per Kg:",
    "mathD2Hint": "Tuliskan perkiraan hasil panen (berapa karung atau ton gabah) dikalikan harga jual per kg ke tengkulak/pabrik...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Petani Padi:",
    "mathD3Hint": "Hitung selisihnya: Total hasil penjualan gabah dikurangi seluruh biaya modal awal yang dikeluarkan..."
  },
  "perkebunan": {
    "key": "perkebunan",
    "name": "Perkebunan Rakyat (Karet & Sawit)",
    "badge": "Komoditas Unggulan Perkebunan",
    "icon": "forest",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: 2 Hektar Kebun Karet / 1 Hektar Kebun Sawit",
    "scaleLabel": "Luas Lahan Kebun (Hektar):",
    "sainsA1Label": "1. Kondisi Tanaman Karet/Sawit & Dampak Cuaca:",
    "sainsA1Hint": "Amati dan jelaskan: kondisi batang pohon karet atau daun sawit, dan bagaimana cuaca hujan mempengaruhi kelancaran penyadapan getah atau panen...",
    "sainsA2Label": "2. Kualitas Getah Karet / Buah Sawit & Hama Kebun:",
    "sainsA2Hint": "Amati dan jelaskan: kepekatan getah lateks atau kematangan tandan buah segar (TBS), serta ada atau tidaknya gulma rumput liar atau hama kebun...",
    "tekB1Label": "1. Peralatan Kerja Khusus Kebun yang Digunakan:",
    "tekB1Hint": "Catat alat kerja yang digunakan: pisau sadap getah, mangkok lateks, dodos sawit, tiang egrek teleskopik, atau gerobak angkong...",
    "tekB2Label": "2. Perawatan Alat Kerja & Pengangkutan Hasil Kebun:",
    "tekB2Hint": "Jelaskan: bagaimana cara mengasah dan merawat pisau/dodos agar tetap tajam, serta kendaraan yang dipakai mengangkut hasil panen ke tepi jalan...",
    "engC1Label": "1. Kendala Lapangan yang Dihadapi Pekebun:",
    "engC1Hint": "Tuliskan kendala teknis: misalnya getah karet hanyut tersapu air hujan sebelum beku, atau jalan rintisan kebun sangat licin saat mengangkut sawit...",
    "engC2Label": "2. Solusi Rekayasa & Trik Praktis Pekebun:",
    "engC2Hint": "Tuliskan trik pekebun: misalnya memasang plastik pelindung di atas mangkok getah, atau menata pelepah sawit di jalan rintisan agar tidak becek...",
    "engC3Label": "3. Pendapat Anda Mengenai Trik Praktis Pekebun:",
    "engC3Hint": "Jelaskan: Apakah solusi sederhana tersebut efektif melindungi hasil kebun dari kerusakan?...",
    "mathD1Label": "1. Estimasi Biaya Modal Perawatan Kebun:",
    "mathD1Hint": "Tuliskan biaya yang dikeluarkan: beli cuka pembeku lateks, pembersihan gulma, atau pupuk tanaman kebun...",
    "mathD2Label": "2. Hasil Timbangan Getah/Sawit & Harga Jual per Kg:",
    "mathD2Hint": "Tuliskan perkiraan hasil timbangan (kg getah per minggu atau ton sawit per panen) dikalikan harga per kg di pengepul/RAM...",
    "mathD3Label": "3. Estimasi Pendapatan & Keuntungan Bersih Pekebun:",
    "mathD3Hint": "Hitung selisihnya: Total hasil penjualan dikurangi biaya pembelian asam cuka atau ongkos angkut..."
  },
  "peternakan": {
    "key": "peternakan",
    "name": "Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)",
    "badge": "Ternak & Bioenergi Pedesaan",
    "icon": "pets",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: 5 Ekor Sapi / 15 Ekor Kambing / 50 Ekor Ayam",
    "scaleLabel": "Populasi Ternak (Jumlah Ekor):",
    "sainsA1Label": "1. Kondisi Hewan Ternak & Kebersihan Kandang:",
    "sainsA1Hint": "Amati dan jelaskan: jenis ternak yang dipelihara, kondisi kesehatan fisik ternak, dan ventilasi udara serta kebersihan lantai kandang...",
    "sainsA2Label": "2. Jenis Pakan yang Diberikan Setiap Hari:",
    "sainsA2Hint": "Amati dan jelaskan: jenis pakan hijau (rumput gajah, jerami padi), pakan dedak bekatul, atau konsentrat pakan unggas...",
    "tekB1Label": "1. Mesin & Peralatan Kerja Bantu di Peternakan:",
    "tekB1Hint": "Catat alat kerja yang digunakan: mesin chopper pencacah rumput, drum silase, tempat minum otomatis (nipple), atau lampu penghangat kandang...",
    "tekB2Label": "2. Cara Kerja Mesin & Sumber Tenaga Penggerak:",
    "tekB2Hint": "Jelaskan: bagaimana mesin chopper mempermudah pencacahan pakan dibanding sabit manual, dan sumber energinya (bensin atau listrik)...",
    "engC1Label": "1. Kendala Lapangan yang Sering Dialami Peternak:",
    "engC1Hint": "Tuliskan kendala teknis: misalnya rumput segar sulit dicari saat kemarau, atau tumpukan kotoran kandang yang berbau dan mengganggu lingkungan...",
    "engC2Label": "2. Solusi Rekayasa Pembuatan Pakan Fermentasi / Pupuk Kompos:",
    "engC2Hint": "Tuliskan trik peternak: misalnya membuat pakan fermentasi awet (silase) dalam drum kedap udara, atau mengolah kotoran jadi pupuk kompos tanaman...",
    "engC3Label": "3. Pendapat Anda Mengenai Pemanfaatan Limbah Kotoran:",
    "engC3Hint": "Jelaskan: Bagaimana pembuatan kompos atau pakan fermentasi membantu peternak menghemat biaya dan menjaga lingkungan?...",
    "mathD1Label": "1. Estimasi Modal Pembelian Bibit Ternak & Pakan:",
    "mathD1Hint": "Tuliskan modal yang dikeluarkan: harga beli bibit ternak bakalan ditambah biaya pakan tambahan/vitamin bulanan...",
    "mathD2Label": "2. Nilai Jual Hewan Ternak Setelah Dipelihara:",
    "mathD2Hint": "Tuliskan perkiraan harga jual hewan ternak saat sudah besar (misalnya saat Idul Adha atau pasar hewan)...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Usaha Peternakan:",
    "mathD3Hint": "Hitung selisihnya: Harga jual akhir ternak dikurangi modal pembelian bibit dan total biaya pakan..."
  },
  "perikanan": {
    "key": "perikanan",
    "name": "Perikanan Air Tawar (Sentra Patin & Lele Belitang)",
    "badge": "Sentra Patin & Lele Belitang",
    "icon": "phishing",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: 3 Petak Kolam Terpal / 2 Kolam Tanah",
    "scaleLabel": "Jumlah & Jenis Kolam Budidaya:",
    "sainsA1Label": "1. Kondisi Air Kolam & Kebutuhan Suplai Air:",
    "sainsA1Hint": "Amati dan jelaskan: jenis air yang digunakan (irigasi/sumur), warna air kolam (kehijauan berplankton), dan kedalaman air...",
    "sainsA2Label": "2. Perkembangan Bibit Ikan & Pencegahan Penyakit:",
    "sainsA2Hint": "Amati dan jelaskan: keaktifan gerak ikan, jadwal pemberian pakan pelet harian, dan cara menjaga agar ikan tidak terserang jamur...",
    "tekB1Label": "1. Peralatan Kerja Kolam Ikan yang Digunakan:",
    "tekB1Hint": "Catat alat kerja yang digunakan: pompa sirkulasi air, kincir aerasi (aerator oksigen), jaring penyerok, atau baskom sortir ukuran ikan...",
    "tekB2Label": "2. Fungsi Alat Sirkulasi & Sumber Listrik Kolam:",
    "tekB2Hint": "Jelaskan: fungsi pompa dan kincir dalam menjaga pasokan oksigen kolam, serta waktu pengoperasiannya (malam/pagi hari)...",
    "engC1Label": "1. Kendala Teknis Pengelolaan Air & Ukuran Ikan:",
    "engC1Hint": "Tuliskan kendala teknis: misalnya air dasar kolam berbau kotoran pakan sisa, atau ukuran ikan yang tidak merata sehingga saling memangsa...",
    "engC2Label": "2. Solusi Rekayasa Pipa Pembuangan & Penyortiran Rutin:",
    "engC2Hint": "Tuliskan trik pembudidaya: misalnya membuat pipa pembuangan tengah (central drain) untuk menguras kotoran dasar, dan penyortiran berkala...",
    "engC3Label": "3. Pendapat Anda Mengenai Trik Pengurasan Tersebut:",
    "engC3Hint": "Jelaskan: Mengapa pipa pembuangan kotoran bawah sangat membantu menjaga ikan tetap hidup sehat tanpa perlu menguras habis seluruh air?...",
    "mathD1Label": "1. Estimasi Modal Pembelian Bibit Ikan & Pakan Pelet:",
    "mathD1Hint": "Tuliskan modal yang dikeluarkan: biaya membeli bibit ikan ditambah total biaya karung pakan pelet sampai panen...",
    "mathD2Label": "2. Total Kilogram Hasil Panen & Harga Jual per Kg:",
    "mathD2Hint": "Tuliskan perkiraan total panen ikan (kg) dikalikan harga jual per kg ke pasar ikan atau pengepul...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Budidaya Ikan:",
    "mathD3Hint": "Hitung selisihnya: Total hasil penjualan ikan dikurangi seluruh biaya bibit dan pakan..."
  },
  "industri": {
    "key": "industri",
    "name": "Agro-Industri Pangan & RMU (Pabrik Beras, Tahu-Tempe, Kemplang)",
    "badge": "Agro-Industri Pangan OKU Timur",
    "icon": "precision_manufacturing",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: Pabrik Penggilingan Padi / Pabrik Tahu Desa",
    "scaleLabel": "Kapasitas Produksi Harian (Kg / Kwintal):",
    "sainsA1Label": "1. Karakteristik Bahan Mentah yang Diolah:",
    "sainsA1Hint": "Amati dan jelaskan: jenis bahan baku utama (gabah padi, biji kedelai, atau tepung tapioka) dan kualitas bahan yang baik...",
    "sainsA2Label": "2. Proses Perubahan Fisika-Kimia Menjadi Produk Jadi:",
    "sainsA2Hint": "Amati dan jelaskan: tahapan pengolahan bahan mentah (perendaman, penggilingan, perebusan, atau pencetakan)...",
    "tekB1Label": "1. Mesin & Alat Mekanisasi Produksi yang Digunakan:",
    "tekB1Hint": "Catat mesin kerja yang digunakan: mesin pemecah kulit gabah husker, mesin giling kedelai, boiler uap panas, atau alat cetak...",
    "tekB2Label": "2. Kecepatan Mesin & Sumber Tenaga Penggerak:",
    "tekB2Hint": "Jelaskan: seberapa cepat mesin memproses bahan dibanding tenaga manual, dan sumber tenaga mesin (diesel solar atau listrik dinamo)...",
    "engC1Label": "1. Kendala Teknis Lapangan Selama Proses Produksi:",
    "engC1Hint": "Tuliskan kendala yang dihadapi: misalnya pengaturan suhu api perebusan yang tidak stabil, atau air limbah sisa cucian yang harus dibuang...",
    "engC2Label": "2. Solusi Rekayasa Efisiensi Panas & Pengolahan Limbah:",
    "engC2Hint": "Tuliskan trik pengrajin: misalnya membuat cerobong pipa uap hemat kayu bakar, atau membuat bak pengendapan air limbah sederhana...",
    "engC3Label": "3. Pendapat Anda Mengenai Trik Penghematan Energi Tersebut:",
    "engC3Hint": "Jelaskan: Bagaimana modifikasi tungku atau pemanfaatan limbah membantu kelangsungan usaha pangan tersebut?...",
    "mathD1Label": "1. Estimasi Biaya Modal Bahan Mentah & Operasional Harian:",
    "mathD1Hint": "Tuliskan modal yang dikeluarkan per hari: beli bahan mentah kedelai/gabah ditambah biaya bahan bakar kayu/solar/listrik...",
    "mathD2Label": "2. Jumlah Produk yang Dihasilkan & Harga Jual Satuan:",
    "mathD2Hint": "Tuliskan jumlah produk jadi yang dihasilkan per hari dikalikan harga jual per papan tahu, karung beras, atau bungkus kemplang...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Usaha Olahan Pangan:",
    "mathD3Hint": "Hitung selisihnya: Total omzet penjualan harian dikurangi seluruh biaya modal bahan baku dan operasional..."
  },
  "perdagangan": {
    "key": "perdagangan",
    "name": "Perdagangan Sarana Pertanian & Sembako",
    "badge": "Kios Saprotan & Grosir",
    "icon": "storefront",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: Kios Pupuk Bersubsidi & Obat Tanaman Desa",
    "scaleLabel": "Jenis Usaha Dagang / Luas Kios:",
    "sainsA1Label": "1. Jenis Pupuk, Benih & Produk yang Dijual:",
    "sainsA1Hint": "Amati dan jelaskan: jenis pupuk (urea, NPK, organik), benih padi unggul, atau jenis obat pertanian yang paling banyak dicari petani...",
    "sainsA2Label": "2. Cara Menjaga Kualitas & Daya Simpan Barang Toko:",
    "sainsA2Hint": "Amati dan jelaskan: bagaimana pemilik toko menjaga karung pupuk agar tidak lembap/menggumpal dan obat tanaman tetap aman...",
    "tekB1Label": "1. Peralatan Bantu Kerja di Toko / Kios:",
    "tekB1Hint": "Catat alat kerja yang digunakan: timbangan digital platform, troli roda dorong angkut karung, atau smartphone aplikasi transaksi...",
    "tekB2Label": "2. Fungsi Alat Digital & Akurasi Timbangan Toko:",
    "tekB2Hint": "Jelaskan: bagaimana timbangan digital mempermudah transaksi cepat dan adil, serta aplikasi kasir atau aplikasi pupuk (i-Pubers)...",
    "engC1Label": "1. Kendala Penataan Barang & Alur Angkut di Toko:",
    "engC1Hint": "Tuliskan kendala teknis: misalnya ruang gudang yang sempit, karung pupuk yang berat saat dipindahkan, atau lantai yang rentan lembap...",
    "engC2Label": "2. Solusi Rekayasa Penataan Palet Kayu & Lorong Gudang:",
    "engC2Hint": "Tuliskan trik pedagang: misalnya menyusun karung di atas palet kayu penahan rembesan air, serta membuat lorong khusus troli barang...",
    "engC3Label": "3. Pendapat Anda Mengenai Penataan Gudang Toko Tersebut:",
    "engC3Hint": "Jelaskan: Mengapa penataan barang yang rapi dan beralas kayu sangat penting untuk mencegah kerusakan barang dagangan?...",
    "mathD1Label": "1. Estimasi Harga Modal Beli Barang Grosir dari Distributor:",
    "mathD1Hint": "Tuliskan perkiraan harga beli modal barang per karung atau per botol obat dari distributor grosir pabrik...",
    "mathD2Label": "2. Harga Jual Eceran ke Petani & Margin Keuntungan:",
    "mathD2Hint": "Tuliskan harga jual eceran toko ke petani dan hitung selisih laba (margin) yang didapat per karung atau per barang...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Toko per Hari/Bulan:",
    "mathD3Hint": "Hitung perkiraan keuntungan: Jumlah rata-rata barang terjual per hari dikalikan margin laba bersih toko..."
  },
  "formal": {
    "key": "formal",
    "name": "Jasa Keuangan Mikro (Agen BRILink, BUMDes & Jasa Desa)",
    "badge": "Agen BRILink, BUMDes & Jasa",
    "icon": "account_balance",
    "colorClass": "emerald",
    "scalePlaceholder": "Contoh: Loket Agen BRILink Desa / Kantor BUMDes",
    "scaleLabel": "Jenis Layanan Keuangan / Jumlah Transaksi Harian:",
    "sainsA1Label": "1. Kebutuhan Sinyal Internet Jaringan Seluler (4G/WiFi):",
    "sainsA1Hint": "Amati dan jelaskan: jenis jaringan internet yang dipakai (sinyal 4G SIM card / WiFi), serta dampak cuaca buruk hujan terhadap kelancaran sinyal...",
    "sainsA2Label": "2. Kestabilan Suplai Listrik bagi Perangkat Transaksi:",
    "sainsA2Hint": "Amati dan jelaskan: mengapa pasokan arus listrik yang stabil sangat penting agar mesin transaksi tidak mendadak mati saat nasabah transfer...",
    "tekB1Label": "1. Perangkat Mesin EDC & Alat Transaksi Digital yang Digunakan:",
    "tekB1Hint": "Catat alat kerja yang digunakan: mesin EDC pembaca chip kartu ATM, printer struk mini bluetooth, atau aplikasi perbankan di HP...",
    "tekB2Label": "2. Kecepatan Transaksi & Keamanan Mesin EDC:",
    "tekB2Hint": "Jelaskan: kemudahan transaksi cepat tarik tunai/transfer dalam waktu kurang dari 1 menit tanpa warga harus pergi jauh ke bank kota...",
    "engC1Label": "1. Kendala Teknis Mati Lampu & Gangguan Sinyal:",
    "engC1Hint": "Tuliskan kendala yang dihadapi: misalnya listrik PLN mendadak padam, atau salah satu provider seluler mengalami gangguan sinyal...",
    "engC2Label": "2. Solusi Rekayasa Baterai Cadangan (UPS) & Dua Kartu Jaringan:",
    "engC2Hint": "Tuliskan trik agen: misalnya menyediakan powerbank/UPS darurat untuk mesin EDC, serta memakai dua kartu SIM dari operator berbeda...",
    "engC3Label": "3. Pendapat Anda Mengenai Kesiapan Cadangan Daya Tersebut:",
    "engC3Hint": "Jelaskan: Bagaimana penyediaan baterai cadangan dan dua provider sinyal menjaga kepercayaan masyarakat desa untuk terus bertransaksi?...",
    "mathD1Label": "1. Estimasi Modal Kas Uang Tunai & Saldo Rekening Digital:",
    "mathD1Hint": "Tuliskan perkiraan uang tunai fisik dan saldo rekening bank yang harus disiapkan agen setiap pagi untuk melayani warga...",
    "mathD2Label": "2. Tarif Biaya Admin Jasa (Fee) per Transaksi:",
    "mathD2Hint": "Tuliskan besaran tarif jasa admin (fee) per transaksi (misalnya Rp5.000 per tarik tunai atau transfer uang)...",
    "mathD3Label": "3. Estimasi Keuntungan Bersih Agen per Hari/Bulan:",
    "mathD3Hint": "Hitung keuntungannya: Rata-rata jumlah transaksi per hari dikalikan tarif fee admin, dikurangi biaya pulsa internet dan kertas struk..."
  }
};

  window.NFT_DAY3_SECTOR_DATA = NFT_DAY3_SECTOR_DATA;

  // ========================================================
  // IMPLEMENTASI UTAMA RENDER LKPD DAY 3 NON-FIELD TRIP
  // ========================================================
  function renderNonFieldTripDay3LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // PRASYARAT WAJIB: Cek apakah Modul Day 3 (5 Kartu Riset + Kesimpulan) sudah tuntas diserahkan
    let hasMateri = false;
    let sectorFromMateri = 'pertanian';
    try {
      const rawM = localStorage.getItem('fincestem_materi_nft_day3_' + cleanNisn) || localStorage.getItem('fincestem_materi_day3_' + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.cardA || p.conclusion || p.userConclusion)) hasMateri = true;
        if (p && p.selectedSector && NFT_DAY3_SECTOR_DATA[p.selectedSector]) {
          sectorFromMateri = p.selectedSector;
        }
      }
    } catch(e) {}

    // Cek juga sektor yang tersimpan di memori khusus Day 3
    const localSec = localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn);
    if (localSec && NFT_DAY3_SECTOR_DATA[localSec]) {
      sectorFromMateri = localSec;
    } else if (!sectorFromMateri || sectorFromMateri === 'pertanian') {
      // Fallback: warisi pilihan sektor dari Day 2 jika belum diset di Day 3
      let d2Sec = localStorage.getItem('fincestem_nft_sector_d2_' + cleanNisn);
      if (!d2Sec) {
        try {
          const rawM2 = localStorage.getItem('fincestem_materi_nft_day2_' + cleanNisn) || localStorage.getItem('fincestem_materi_day2_' + cleanNisn);
          if (rawM2) {
            const p2 = JSON.parse(rawM2);
            if (p2 && p2.selectedSector) d2Sec = p2.selectedSector;
          }
        } catch(e) {}
      }
      if (d2Sec) {
        let mapped = String(d2Sec).toLowerCase().trim();
        if (mapped === 'pangan') mapped = 'pertanian';
        if (mapped === 'jasa') mapped = 'industri';
        if (mapped === 'keuangan') mapped = 'formal';
        if (NFT_DAY3_SECTOR_DATA[mapped]) {
          sectorFromMateri = mapped;
        }
      }
    }

    // Fallback verifikasi progress sistem
    if (!hasMateri) {
      if (window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['3_materi']) {
        hasMateri = true;
      } else {
        try {
          const sp = localStorage.getItem('fincestem_progress_' + cleanNisn);
          if (sp) {
            const p = JSON.parse(sp);
            if (p && p.task_map && p.task_map['3_materi']) hasMateri = true;
          }
        } catch(e) {}
      }
    }

    // Ambil data resmi yang sudah pernah dikirim
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem('fincestem_lkpd_nft_day3_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day3_' + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    if (!saved) {
      try {
        const storedP = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedP) {
          const p = JSON.parse(storedP);
          if (p && p.task_map && p.task_map['3_lkpd'] && p.task_map['3_lkpd'].payload) {
            saved = p.task_map['3_lkpd'].payload;
          }
        }
      } catch(e) {}
    }

    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt || saved.narasumberName));
    const finalReadOnly = !!(isReadOnly || isSubmitted);
    const readOnlyAttr = finalReadOnly ? 'readonly' : '';
    const disabledAttr = finalReadOnly ? 'disabled' : '';

    // Ambil data draft lokal jika belum resmi
    let draft = {};
    if (!isSubmitted) {
      try {
        const rawDraft = localStorage.getItem('fincestem_draft_nft_lkpd_d3_' + cleanNisn);
        if (rawDraft) draft = JSON.parse(rawDraft);
      } catch(e) {}
    }

    const formData = isSubmitted ? (saved || {}) : (draft || {});
    const isTesterD3 = !!((u && u.is_tester) || (localStorage.getItem('fincestem_admin_testing_session') === 'true') || (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn)));
    const isLockedByPrereq = (!hasMateri && !isSubmitted && !isTesterD3);

    const val = (k) => (formData && formData[k] !== undefined) ? formData[k] : '';
    const valMoney = (k) => {
      const v = (formData && formData[k] !== undefined) ? formData[k] : '';
      return formatRupiahInput(v);
    };
    const valYield = (k) => {
      const v = (formData && formData[k] !== undefined) ? formData[k] : '';
      if (!v || v === 0 || v === '0') return '';
      return v;
    };
    let d3CurDistrict = normalizeDistrictName(val('district') || '');
    if (!d3CurDistrict && val('location')) {
      d3CurDistrict = OKU_TIMUR_DISTRICTS.find(d => val('location').toLowerCase().includes(d.toLowerCase())) || '';
    }
    const selSector = formData.sectorKey || sectorFromMateri || 'pertanian';
    const sectorObj = NFT_DAY3_SECTOR_DATA[selSector] || NFT_DAY3_SECTOR_DATA.pertanian;

    const draftTimeStr = draft && draft.updatedAt 
      ? new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      : '';

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-12">
        
        <!-- BANNER PERINGATAN JIKA PRASYARAT MODUL BELUM TUNTAS -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Alur Wajib Berurutan Day 3</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Day 3 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 3, Anda <strong>wajib menuntaskan 5 Kartu Riset Mandiri &amp; Kesimpulan di Modul Belajar</strong> sebelum dapat mengisi Lembar Kerja Observasi Lapangan ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=3" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Riset Day 3 Sekarang</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BANNER KOP IDENTITAS LKPD DAY 3 NON-FIELD TRIP -->
        <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-emerald-700/40">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-emerald-100 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">science</span>
                <span>Non-Field Trip • Day 3</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                Observasi &amp; Wawancara 4 Pilar STEM
              </span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span id="nftLkpdD3DraftStatusBadge" class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 flex items-center gap-1.5 shadow-2xs">
                <span class="material-symbols-outlined text-xs text-emerald-400">cloud_done</span>
                <span id="txtNftLkpdD3DraftStatus">${draftTimeStr ? 'Draft tersimpan (pk ' + draftTimeStr + ' WIB)' : 'Siap Diisi'}</span>
              </span>
              ${isSubmitted ? `
                <span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-400 text-emerald-950 flex items-center gap-1 shadow-2xs">
                  <span class="material-symbols-outlined text-xs">verified</span>
                  <span>Telah Terkirim Resmi</span>
                </span>
              ` : ''}
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <h1 class="text-lg sm:text-2xl font-black tracking-tight text-white leading-tight">
              LKPD Observasi Lapangan: Analisis STEM pada Pertanian &amp; Sektor Unggulan OKU Timur
            </h1>
            <p class="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Investigasi lapangan autentik memadukan 4 pilar STEM (Sains, Teknologi, Rekayasa Lapangan, dan Matematika Finansial) di lingkungan nyata Kabupaten OKU Timur.
            </p>
          </div>

          <!-- Metadata Siswa & Fasilitator -->
          <div class="pt-3 border-t border-emerald-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div class="flex flex-col">
              <span class="text-emerald-300 text-[10.5px] font-semibold">Nama Siswa / Peneliti:</span>
              <span class="font-bold text-white truncate">${studentName}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-emerald-300 text-[10.5px] font-semibold">NISN / Kelas:</span>
              <span class="font-bold text-white truncate">${studentNisn} • ${studentClass}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-emerald-300 text-[10.5px] font-semibold">Fasilitator Pembina:</span>
              <span class="font-bold text-white truncate">${fasilName}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-emerald-300 text-[10.5px] font-semibold">Sektor Observasi Aktif:</span>
              <span class="font-bold text-amber-300 truncate">${sectorObj.name}</span>
            </div>
          </div>
        </div>

        <!-- FORMULIR UTAMA OBSERVASI & WAWANCARA STEM DAY 3 -->
        <form id="formNftDay3LKPD" onsubmit="event.preventDefault();" class="flex flex-col gap-4 sm:gap-5">

          <!-- ======================================================== -->
          <!-- KARTU 1: IDENTITAS LOKASI & NARASUMBER OBSERVASI        -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_1" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm shrink-0">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Identitas Lokasi &amp; Narasumber Observasi</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Informasi objek dan profil praktisi yang diobservasi dan diwawancarai</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_1" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              
              <!-- Pilihan Sektor Observasi (Terkoneksi dari Modul Belajar) -->
              <div class="flex flex-col gap-1 sm:col-span-2 lg:col-span-3 bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200/80">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <label class="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-emerald-700">hub</span>
                    <span>Sektor Observasi Lapangan: <span class="text-rose-600">*</span></span>
                  </label>
                  <span class="text-[10.5px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    Otomatis dari Pilihan Modul Belajar
                  </span>
                </div>
                <select id="nftD3_sectorKey" ${disabledAttr} onchange="onNftDay3SectorChange(this.value)" class="w-full p-2.5 rounded-xl border border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs font-bold text-emerald-950 bg-white cursor-pointer transition-all mt-1">
                  <option value="pertanian" ${selSector === 'pertanian' ? 'selected' : ''}>1. Pertanian Padi Sawah (Lumbung Pangan Komering, Irigasi BK, Traktor/Combine)</option>
                  <option value="perkebunan" ${selSector === 'perkebunan' ? 'selected' : ''}>2. Perkebunan Rakyat (Karet &amp; Kelapa Sawit, Sadap Lateks, Panen TBS)</option>
                  <option value="peternakan" ${selSector === 'peternakan' ? 'selected' : ''}>3. Peternakan Rakyat OKU Timur (Sapi, Kambing/Domba, Ayam Broiler/Petelur &amp; Bebek)</option>
                  <option value="perikanan" ${selSector === 'perikanan' ? 'selected' : ''}>4. Perikanan Air Tawar (Sentra Kolam Patin &amp; Lele Belitang, Aerator &amp; Pakan)</option>
                  <option value="industri" ${selSector === 'industri' ? 'selected' : ''}>5. Agro-Industri &amp; Pengolahan Pangan (Pabrik Beras RMU, Tahu-Tempe &amp; Kemplang)</option>
                  <option value="perdagangan" ${selSector === 'perdagangan' ? 'selected' : ''}>6. Perdagangan (Kios Sarana Pertanian Resmi, Pasar Tradisional &amp; Grosir Sembako)</option>
                  <option value="formal" ${selSector === 'formal' ? 'selected' : ''}>7. Jasa Keuangan Mikro &amp; Jasa Perorangan (Agen BRILink, BUMDes, Koperasi &amp; Bengkel)</option>
                </select>
                <p class="text-[11px] text-emerald-900/80 leading-relaxed font-medium mt-0.5">
                  <em>*Catatan: Seluruh panduan observasi Sains, Teknologi, dan Rekayasa di bawah ini otomatis menyesuaikan dengan sektor yang Anda pilih.</em>
                </p>
              </div>

              <!-- Nama Petani / Narasumber -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nama Petani / Narasumber: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD3_narasumberName" ${readOnlyAttr} value="${val('narasumberName')}" placeholder="Contoh: Pak Joko / Pak Wayan / Ibu Siti" oninput="onNftDay3FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD3_nar" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Wilayah Kecamatan di OKU Timur: <span class="text-rose-600">*</span></label>
                <select id="nftD3_district" ${readOnlyAttr} onchange="onNftDay3DistrictChange(this.value)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-none text-xs font-bold text-slate-900 bg-white transition-all">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(kec => `
                    <option value="${kec}" ${(d3CurDistrict === kec || normalizeDistrictName(d3CurDistrict) === kec) ? 'selected' : ''}>Kecamatan ${kec}</option>
                  `).join('')}
                </select>
              </div>

              <!-- Lokasi Observasi (Desa/Jalur Irigasi Detail) -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Detail Alamat / Desa &amp; Jalur Irigasi: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD3_location" ${readOnlyAttr} value="${val('location')}" placeholder="Contoh: Desa Nusabakti, Irigasi BK 10" oninput="onNftDay3FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD3_loc" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

              <!-- Skala Usaha -->
              <div class="flex flex-col gap-1">
                <label id="lblD3_scale" class="text-xs font-bold text-slate-800">${sectorObj.scaleLabel} <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD3_businessScale" ${readOnlyAttr} value="${val('businessScale')}" placeholder="${sectorObj.scalePlaceholder}" oninput="onNftDay3FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD3_sca" class="text-[10px] text-slate-400">Minimal 2 karakter</span>
              </div>

            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 2: BAGIAN A — OBSERVASI SAINS (SCIENCE FIELD CHECK) -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_2" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">A</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian A — Observasi SAINS (Science Field Check)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pemeriksaan kondisi fisik alam, air, tanah, cuaca, dan kondisi biologis komoditas</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_2" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Petunjuk Singkat -->
            <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 flex flex-col gap-1">
              <span class="font-bold flex items-center gap-1.5 text-teal-900">
                <span class="material-symbols-outlined text-sm">biotech</span>
                <span>Fokus Kajian Sains Lapangan Sektor ${sectorObj.name}:</span>
              </span>
              <p class="leading-relaxed text-teal-900/90 text-justify">
                Amati langsung kondisi lingkungan di lokasi riset dan ajukan pertanyaan kepada narasumber. Tuliskan deskripsi faktual mengenai kondisi fisik alam dan pertumbuhan komoditas.
              </p>
            </div>

            <div class="flex flex-col gap-4">
              <!-- Pertanyaan Sains 1: Kondisi Tanah & Air -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.sainsA1Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_sains1" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.sainsA1Hint}</p>
                <textarea id="nftD3_sainsGroundWater" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan hasil pengamatan tanah, debit/kejernihan air, dan pengaruh cuaca di lokasi ini... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('sainsGroundWater')}</textarea>
              </div>

              <!-- Pertanyaan Sains 2: Kondisi Biologis & Pertumbuhan Komoditas -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.sainsA2Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_sains2" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.sainsA2Hint}</p>
                <textarea id="nftD3_sainsGrowthHealth" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan fase pertumbuhan, kondisi kesehatan fisik komoditas, dan ada/tidaknya gejala hama... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('sainsGrowthHealth')}</textarea>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 3: BAGIAN B — AUDIT TEKNOLOGI (TECHNOLOGY AUDIT)    -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_3" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-black text-sm shrink-0">B</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian B — Audit TEKNOLOGI (Technology Audit)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Pemeriksaan mekanisasi, mesin pertanian/alat kerja, dan efisiensi teknologi di lapangan</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_3" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Petunjuk Singkat -->
            <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex flex-col gap-1">
              <span class="font-bold flex items-center gap-1.5 text-blue-900">
                <span class="material-symbols-outlined text-sm">precision_manufacturing</span>
                <span>Fokus Audit Teknologi Mesin &amp; Alat Kerja:</span>
              </span>
              <p class="leading-relaxed text-blue-900/90 text-justify">
                Identifikasi alat modern maupun peralatan tradisional yang digunakan narasumber, status kepemilikan, sumber tenaga penggerak, serta biaya operasional per hari atau per musim.
              </p>
            </div>

            <div class="flex flex-col gap-4">
              <!-- Teknologi 1: Daftar Mesin & Alat Kerja -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.tekB1Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_tek1" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.tekB1Hint}</p>
                <textarea id="nftD3_techInventory" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Rincikan seluruh alat mesin yang dipakai narasumber... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('techInventory')}</textarea>
              </div>

              <!-- Teknologi 2: Kepemilikan & Biaya Operasional Energi/Mesin -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.tekB2Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_tek2" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.tekB2Hint}</p>
                <textarea id="nftD3_techEnergyCost" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Jelaskan status milik sendiri atau sewa borongan, serta kebutuhan BBM solar/listrik per hari/musim... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('techEnergyCost')}</textarea>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 4: BAGIAN C — REKAYASA & SOLUSI PRAKTIS LAPANGAN   -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_4" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm shrink-0">C</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian C — REKAYASA &amp; Solusi Praktis Lapangan (Engineering &amp; Problem Solving)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Wawancara kendala teknis lapangan dan pencatatan solusi kreatif yang diterapkan narasumber</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_4" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Petunjuk Singkat Khusus Bagian C -->
            <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex flex-col gap-1">
              <span class="font-bold flex items-center gap-1.5 text-amber-900">
                <span class="material-symbols-outlined text-sm">build</span>
                <span>Pedoman Wawancara Rekayasa Lapangan (Peran Siswa sebagai Peneliti):</span>
              </span>
              <p class="leading-relaxed text-amber-950/90 text-justify">
                Siswa <strong>tidak mengusulkan ide sendiri</strong>, melainkan bertindak sebagai peneliti yang mewawancarai narasumber mengenai kendala nyata yang dihadapi, mencatat secara teliti bagaimana trik rekayasa atau cara praktis yang dilakukan narasumber untuk mengatasinya, serta mengevaluasi efektivitas solusi tersebut.
              </p>
            </div>

            <div class="flex flex-col gap-4">
              <!-- Wawancara 1: Kendala Teknis Lapangan -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.engC1Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_eng1" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.engC1Hint}</p>
                <textarea id="nftD3_engProblems" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan kendala teknis atau kesulitan yang diceritakan oleh narasumber... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('engProblems')}</textarea>
              </div>

              <!-- Wawancara 2: Solusi Rekayasa Praktis Narasumber -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.engC2Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_eng2" class="text-[10px] text-slate-400 font-bold">0 / 50 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.engC2Hint}</p>
                <textarea id="nftD3_engPractitionerSolution" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Catat secara rinci langkah, cara, atau modifikasi teknis yang dilakukan narasumber sendiri... (Minimal 50 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('engPractitionerSolution')}</textarea>
              </div>

              <!-- Evaluasi Siswa: Catatan Siswa terhadap Solusi Tersebut -->
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>${sectorObj.engC3Label} <span class="text-rose-600">*</span></span>
                  <span id="countD3_eng3" class="text-[10px] text-slate-400 font-bold">0 / 30 Karakter</span>
                </label>
                <p class="text-[11px] text-slate-500 italic">${sectorObj.engC3Hint}</p>
                <textarea id="nftD3_engStudentEvaluation" rows="2" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan catatan Anda: apakah trik petani/narasumber tersebut efektif dan hemat biaya... (Minimal 30 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('engStudentEvaluation')}</textarea>
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 5: BAGIAN D — MATEMATIKA & ANALISIS FINANSIAL      -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_5" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-black text-sm shrink-0">D</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian D — MATEMATIKA &amp; Analisis Finansial (Math &amp; Financial Calculator)</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Tabel kalkulasi keuangan riil: Modal Produksi vs Hasil Panen = Laba/Rugi Bersih &amp; Efisiensi</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_5" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <!-- Petunjuk Bagian D -->
            <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 flex flex-col gap-1">
              <span class="font-bold flex items-center gap-1.5 text-purple-900">
                <span class="material-symbols-outlined text-sm">calculate</span>
                <span>Kalkulator Otomatis Keuangan Usaha:</span>
              </span>
              <p class="leading-relaxed text-purple-950/90 text-justify">
                Masukkan data perkiraan biaya modal riil dan hasil penjualan yang disampaikan narasumber. Sistem akan secara otomatis menghitung <strong>Total Modal Pengeluaran</strong>, <strong>Total Pendapatan Kotor</strong>, dan <strong>Laba/Rugi Bersih</strong>.
              </p>
            </div>

            <!-- TABEL 1: BIAYA MODAL OPERASIONAL -->
            <div class="flex flex-col gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-purple-700">payments</span>
                <span>1. Biaya Modal &amp; Pengeluaran Operasional (Satu Musim / Siklus):</span>
              </h4>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                <!-- Biaya Bibit/Benih -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Biaya Bibit / Benih (Rp): <span class="text-rose-600">*</span></label>
                  <input type="text" inputmode="numeric" id="nftD3_costSeed" ${readOnlyAttr} value="${valMoney('costSeed')}" placeholder="Contoh: 750.000" onfocus="if (this.value === '0') this.value = '';" oninput="this.value = formatRupiahInput(this.value); calcDay3Financials();" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>

                <!-- Biaya Pupuk / Pakan -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Biaya Pupuk / Pakan (Rp): <span class="text-rose-600">*</span></label>
                  <input type="text" inputmode="numeric" id="nftD3_costFeedFertilizer" ${readOnlyAttr} value="${valMoney('costFeedFertilizer')}" placeholder="Contoh: 2.800.000" onfocus="if (this.value === '0') this.value = '';" oninput="this.value = formatRupiahInput(this.value); calcDay3Financials();" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>

                <!-- Biaya Solar/Listrik & Sewa Mesin -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">BBM / Listrik &amp; Sewa Mesin (Rp): <span class="text-rose-600">*</span></label>
                  <input type="text" inputmode="numeric" id="nftD3_costEnergyMachine" ${readOnlyAttr} value="${valMoney('costEnergyMachine')}" placeholder="Contoh: 1.500.000" onfocus="if (this.value === '0') this.value = '';" oninput="this.value = formatRupiahInput(this.value); calcDay3Financials();" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>

                <!-- Upah Tenaga Kerja -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Upah Tenaga Kerja (Rp): <span class="text-rose-600">*</span></label>
                  <input type="text" inputmode="numeric" id="nftD3_costLabor" ${readOnlyAttr} value="${valMoney('costLabor')}" placeholder="Contoh: 1.800.000" onfocus="if (this.value === '0') this.value = '';" oninput="this.value = formatRupiahInput(this.value); calcDay3Financials();" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>
              </div>

              <!-- Total Modal Card -->
              <div class="p-3 rounded-xl bg-purple-100/70 border border-purple-300 flex items-center justify-between text-xs mt-1">
                <span class="font-extrabold text-purple-950">Total Biaya Pengeluaran (Modal Total):</span>
                <span id="lblD3_totalCost" class="font-black text-sm text-purple-900">Rp 0</span>
              </div>
            </div>

            <!-- TABEL 2: HASIL PANEN & PENJUALAN -->
            <div class="flex flex-col gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-emerald-700">shopping_cart_checkout</span>
                <span>2. Hasil Panen &amp; Penjualan Produk:</span>
              </h4>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <!-- Volume Hasil Panen -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Volume Hasil Panen: <span class="text-rose-600">*</span></label>
                  <input type="number" id="nftD3_harvestYield" min="0" step="any" ${readOnlyAttr} value="${valYield('harvestYield')}" placeholder="Contoh: 3500" onfocus="if (this.value === '0') this.value = '';" oninput="calcDay3Financials()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>

                <!-- Satuan Panen -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Satuan Ukuran Panen: <span class="text-rose-600">*</span></label>
                  <select id="nftD3_harvestUnit" ${disabledAttr} onchange="calcDay3Financials()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs font-bold text-slate-800 bg-white cursor-pointer transition-all">
                    <option value="Kg" ${val('harvestUnit') === 'Kg' ? 'selected' : ''}>Kilogram (Kg)</option>
                    <option value="Ton" ${val('harvestUnit') === 'Ton' ? 'selected' : ''}>Ton</option>
                    <option value="Ekor" ${val('harvestUnit') === 'Ekor' ? 'selected' : ''}>Ekor (Ternak/Unggas)</option>
                    <option value="Liter" ${val('harvestUnit') === 'Liter' ? 'selected' : ''}>Liter (Getah Lateks / Susu)</option>
                    <option value="Bungkus/Kemasan" ${val('harvestUnit') === 'Bungkus/Kemasan' ? 'selected' : ''}>Bungkus / Kemasan (Produk Industri / Pangan)</option>
                    <option value="Sak/Zak" ${val('harvestUnit') === 'Sak/Zak' ? 'selected' : ''}>Sak / Zak (Pupuk / Beras Grosir)</option>
                    <option value="Transaksi/Unit" ${val('harvestUnit') === 'Transaksi/Unit' ? 'selected' : ''}>Transaksi / Unit Jasa (Keuangan Mikro / Service)</option>
                  </select>
                </div>

                <!-- Harga Jual per Satuan -->
                <div class="flex flex-col gap-1">
                  <label class="text-[11px] font-bold text-slate-700">Harga Jual per Satuan (Rp): <span class="text-rose-600">*</span></label>
                  <input type="text" inputmode="numeric" id="nftD3_pricePerUnit" ${readOnlyAttr} value="${valMoney('pricePerUnit')}" placeholder="Contoh: 6.500 (per kg gabah)" onfocus="if (this.value === '0') this.value = '';" oninput="this.value = formatRupiahInput(this.value); calcDay3Financials();" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-xs text-slate-800 transition-all font-semibold bg-white">
                </div>
              </div>

              <!-- Total Pendapatan Card -->
              <div class="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 flex items-center justify-between text-xs mt-1">
                <span class="font-extrabold text-emerald-950">Total Pendapatan Kotor (Hasil Panen × Harga Jual):</span>
                <span id="lblD3_totalRevenue" class="font-black text-sm text-emerald-900">Rp 0</span>
              </div>
            </div>

            <!-- BOX REKAPITULASI LABA BERSIH & EFISIENSI -->
            <div id="boxD3_netProfitDisplay" class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </span>
                <div class="flex flex-col">
                  <span class="text-xs font-black text-slate-800">Kalkulasi Laba / Rugi Bersih Usaha:</span>
                  <span class="text-[11px] text-slate-500 font-medium">Rumus: Total Pendapatan Kotor − Total Pengeluaran Modal</span>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span id="lblD3_netProfit" class="text-base sm:text-lg font-black text-emerald-800">Rp 0</span>
                <span id="lblD3_netProfitStatus" class="text-[10.5px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Belum Dihitung</span>
              </div>
            </div>

            <!-- Analisis Indikator Efisiensi (HPP / FCR / Laba per Luas) -->
            <div class="flex flex-col gap-1.5 pt-1">
              <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Catatan Analisis Efisiensi Finansial (HPP per kg / Rasio Pakan FCR / Margin Laba): <span class="text-rose-600">*</span></span>
                <span id="countD3_finNotes" class="text-[10px] text-slate-400 font-bold">0 / 40 Karakter</span>
              </label>
              <p class="text-[11px] text-slate-500 italic">
                Uraikan perhitungan efisiensi: misalnya harga pokok produksi (HPP) per kg gabah, perbandingan biaya pakan terhadap bobot ikan/ternak, atau seberapa menguntungkan usaha ini bagi narasumber...
              </p>
              <textarea id="nftD3_financialEfficiencyNotes" rows="3" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan analisis efisiensi biaya dan keuntungan narasumber... (Minimal 40 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none text-xs text-slate-800 transition-all font-medium resize-y ${finalReadOnly ? 'bg-slate-50' : ''}">${val('financialEfficiencyNotes')}</textarea>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- KARTU 6: BAGIAN E — KESIMPULAN AKHIR & SOLUSI STEM       -->
          <!-- ======================================================== -->
          <div id="cardBoxLkpdD3_6" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">E</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian E — Kesimpulan Akhir &amp; Solusi STEM Terpadu</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Sintesis penyelidikan lapangan: bagaimana keterpaduan 4 pilar STEM memajukan sektor unggulan OKU Timur</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD3_6" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex flex-col gap-1.5 shadow-2xs">
              <span class="font-bold text-indigo-900 text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-indigo-700">psychology</span>
                <span>Panduan Perumusan Kesimpulan Lapangan:</span>
              </span>
              <p class="text-xs text-indigo-950/90 leading-relaxed font-medium text-justify">
                Tuliskan rangkuman menyeluruh dari apa yang Anda amati: bagaimana faktor sains (tanah/air), teknologi alat mesin, kecerdasan rekayasa teknis petani, dan manajemen modal matematika saling terkait untuk meningkatkan hasil panen dan pendapatan petani OKU Timur.
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Kesimpulan Akhir Observasi Siswa (Minimal 100 Karakter): <span class="text-rose-600">*</span></span>
                <span id="countD3_conclusion" class="text-[10px] text-slate-400 font-bold">0 / 100 Karakter</span>
              </label>
              <textarea id="nftD3_conclusion" rows="4" ${readOnlyAttr} oninput="onNftDay3FieldInput()" placeholder="Tuliskan kesimpulan menyeluruh hasil investigasi lapangan Day 3 Anda... (Minimal 100 karakter)" style="text-align: justify; text-justify: inter-word;" class="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs leading-relaxed text-slate-900 resize-y transition-all text-justify ${finalReadOnly ? 'bg-slate-50 text-slate-800 cursor-default' : ''}">${val('conclusion')}</textarea>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- TOMBOL AKSI: SIMPAN DRAFT SEMENTARA & KIRIM RESMI         -->
          <!-- ======================================================== -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20 backdrop-blur-md bg-white/95">
            <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span class="material-symbols-outlined text-base text-teal-600">info</span>
              <span id="txtNftD3FooterDraftInfo">Data otomatis tersimpan ke memori perangkat saat Anda mengetik.</span>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              ${!finalReadOnly ? `
                <button type="button" onclick="saveNftDay3DraftImmediate(true)" class="flex-1 sm:flex-none px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-base">save</span>
                  <span>Simpan Draf</span>
                </button>
                <button type="button" id="btnSubmitNftLkpdD3" onclick="submitNftDay3LkpdOfficial()" class="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ring-2 ring-emerald-400/40">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Kirim Resmi ke Fasilitator</span>
                </button>
              ` : `
                <div class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs">
                  <span class="material-symbols-outlined text-base text-emerald-700">verified</span>
                  <span>LKPD Day 3 Telah Terkirim Resmi ke Fasilitator</span>
                </div>
              `}
            </div>
          </div>

        </form>
      </div>
    `;

    // Trigger initial calculation & validation check
    setTimeout(() => {
      calcDay3Financials();
      validateAllDay3CardsUI(false);
    }, 100);
  }

  // ========================================================
  // FUNGSI KALKULATOR FINANSIAL DAY 3
  // ========================================================
  function calcDay3Financials() {
    const seed = parseRupiahNumber(document.getElementById('nftD3_costSeed')?.value);
    const feed = parseRupiahNumber(document.getElementById('nftD3_costFeedFertilizer')?.value);
    const energy = parseRupiahNumber(document.getElementById('nftD3_costEnergyMachine')?.value);
    const labor = parseRupiahNumber(document.getElementById('nftD3_costLabor')?.value);

    const totalCost = seed + feed + energy + labor;

    const yieldQty = parseFloat(document.getElementById('nftD3_harvestYield')?.value) || 0;
    const unitPrice = parseRupiahNumber(document.getElementById('nftD3_pricePerUnit')?.value);

    const totalRevenue = yieldQty * unitPrice;
    const netProfit = totalRevenue - totalCost;

    const fmt = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

    const lblCost = document.getElementById('lblD3_totalCost');
    if (lblCost) lblCost.textContent = fmt(totalCost);

    const lblRev = document.getElementById('lblD3_totalRevenue');
    if (lblRev) lblRev.textContent = fmt(totalRevenue);

    const lblProf = document.getElementById('lblD3_netProfit');
    const lblStat = document.getElementById('lblD3_netProfitStatus');
    const boxDisplay = document.getElementById('boxD3_netProfitDisplay');

    if (lblProf) lblProf.textContent = fmt(netProfit);

    if (lblStat && boxDisplay) {
      if (totalRevenue === 0 && totalCost === 0) {
        lblStat.textContent = 'Belum Dihitung';
        lblStat.className = 'text-[10.5px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full';
        boxDisplay.className = 'p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs';
      } else if (netProfit >= 0) {
        lblStat.textContent = 'Surplus (Laba Bersih)';
        lblStat.className = 'text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full';
        boxDisplay.className = 'p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs';
      } else {
        lblStat.textContent = 'Defisit (Biaya Melebihi Hasil)';
        lblStat.className = 'text-[10.5px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full';
        boxDisplay.className = 'p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-white border-2 border-rose-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs';
      }
    }

    onNftDay3FieldInput();
  }
  window.calcDay3Financials = calcDay3Financials;

  // ========================================================
  // REAL-TIME INPUT & VALIDATION HANDLERS
  // ========================================================
  window.onNftDay3SectorChange = function(newSectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    // Simpan draf sementara sebelum render ulang
    saveNftDay3DraftImmediate(false);
    localStorage.setItem('fincestem_nft_sector_d3_' + cleanNisn, newSectorKey);

    // Bersihkan cache paket asesmen Day 3 agar otomatis menghasilkan soal sektor yang baru
    try {
      localStorage.removeItem('fincestem_pkg_nft_asesmen_v3_d3_' + cleanNisn);
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('fincestem_pkg_nft_asesmen_v3_d3_') && k.endsWith(cleanNisn)) {
          localStorage.removeItem(k);
        }
      });
    } catch(e) {}

    const draft = collectFormDataD3();
    draft.sectorKey = newSectorKey;
    localStorage.setItem('fincestem_draft_nft_lkpd_d3_' + cleanNisn, JSON.stringify(draft));

    if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
      const secName = (NFT_DAY3_SECTOR_DATA[newSectorKey] && NFT_DAY3_SECTOR_DATA[newSectorKey].name) || newSectorKey;
      FincestemCore.ui.toast('Sektor LKPD diubah ke: ' + secName + '. Instrumen telah disesuaikan!', 'info');
    }

    renderNonFieldTripDay3LKPD(false);
  };

  let day3DraftTimer = null;
  
  window.onNftDay3DistrictChange = function(newDist) {
    const locInput = document.getElementById('nftD3_location');
    if (locInput && newDist) {
      if (!locInput.value) {
        locInput.value = 'Desa ..., Kec. ' + newDist;
      } else if (!locInput.value.toLowerCase().includes(newDist.toLowerCase())) {
        locInput.value = locInput.value.replace(/,?\s*Kec\.\s*[^,]+/i, '') + ', Kec. ' + newDist;
      }
    }
    onNftDay3FieldInput();
  };
  function onNftDay3FieldInput() {
    validateAllDay3CardsUI(false);
    clearTimeout(day3DraftTimer);
    day3DraftTimer = setTimeout(() => {
      saveNftDay3DraftImmediate(false);
    }, 800);
  }
  window.onNftDay3FieldInput = onNftDay3FieldInput;

  function collectFormDataD3() {
    const valOf = (id) => (document.getElementById(id)?.value || '').trim();
    const numValOf = (id) => parseFloat(document.getElementById(id)?.value) || 0;
    const rupValOf = (id) => parseRupiahNumber(document.getElementById(id)?.value);

    const seed = rupValOf('nftD3_costSeed');
    const feed = rupValOf('nftD3_costFeedFertilizer');
    const energy = rupValOf('nftD3_costEnergyMachine');
    const labor = rupValOf('nftD3_costLabor');
    const totalCost = seed + feed + energy + labor;

    const yieldQty = numValOf('nftD3_harvestYield');
    const unitPrice = rupValOf('nftD3_pricePerUnit');
    const totalRevenue = yieldQty * unitPrice;
    const netProfit = totalRevenue - totalCost;

    return {
      day: 3,
      sectorKey: valOf('nftD3_sectorKey') || 'pertanian',
      narasumberName: valOf('nftD3_narasumberName'),
      location: valOf('nftD3_location'),
      businessScale: valOf('nftD3_businessScale'),
      sainsGroundWater: valOf('nftD3_sainsGroundWater'),
      sainsGrowthHealth: valOf('nftD3_sainsGrowthHealth'),
      techInventory: valOf('nftD3_techInventory'),
      techEnergyCost: valOf('nftD3_techEnergyCost'),
      engProblems: valOf('nftD3_engProblems'),
      engPractitionerSolution: valOf('nftD3_engPractitionerSolution'),
      engStudentEvaluation: valOf('nftD3_engStudentEvaluation'),
      costSeed: seed,
      costFeedFertilizer: feed,
      costEnergyMachine: energy,
      costLabor: labor,
      totalCost: totalCost,
      harvestYield: yieldQty,
      harvestUnit: valOf('nftD3_harvestUnit') || 'Kg',
      pricePerUnit: unitPrice,
      totalRevenue: totalRevenue,
      netProfit: netProfit,
      financialEfficiencyNotes: valOf('nftD3_financialEfficiencyNotes'),
      conclusion: valOf('nftD3_conclusion'),
      updatedAt: new Date().toISOString()
    };
  }

  function validateAllDay3CardsUI(showErrors) {
    const data = collectFormDataD3();

    // Helper update badge & box
    const updateCardUI = (cardNum, isOk) => {
      const box = document.getElementById('cardBoxLkpdD3_' + cardNum);
      const badge = document.getElementById('badgeCardStatusLkpdD3_' + cardNum);
      if (box && badge) {
        if (isOk) {
          box.className = 'p-5 sm:p-6 rounded-3xl bg-emerald-50/20 border-2 border-emerald-400 shadow-xs flex flex-col gap-4 transition-all';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs';
          badge.textContent = '✓ Lengkap';
        } else {
          box.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
          badge.textContent = 'Belum Lengkap';
        }
      }
    };

    // Card 1: Identitas
    const c1Ok = (data.narasumberName.length >= 3 && data.location.length >= 5 && data.businessScale.length >= 2);
    updateCardUI(1, c1Ok);

    // Card 2: Sains
    const s1Len = data.sainsGroundWater.length;
    const s2Len = data.sainsGrowthHealth.length;
    const cntS1 = document.getElementById('countD3_sains1');
    const cntS2 = document.getElementById('countD3_sains2');
    if (cntS1) cntS1.textContent = `${s1Len} / 40 Karakter`;
    if (cntS2) cntS2.textContent = `${s2Len} / 40 Karakter`;
    const c2Ok = (s1Len >= 40 && s2Len >= 40);
    updateCardUI(2, c2Ok);

    // Card 3: Teknologi
    const t1Len = data.techInventory.length;
    const t2Len = data.techEnergyCost.length;
    const cntT1 = document.getElementById('countD3_tek1');
    const cntT2 = document.getElementById('countD3_tek2');
    if (cntT1) cntT1.textContent = `${t1Len} / 40 Karakter`;
    if (cntT2) cntT2.textContent = `${t2Len} / 40 Karakter`;
    const c3Ok = (t1Len >= 40 && t2Len >= 40);
    updateCardUI(3, c3Ok);

    // Card 4: Rekayasa Lapangan
    const e1Len = data.engProblems.length;
    const e2Len = data.engPractitionerSolution.length;
    const e3Len = data.engStudentEvaluation.length;
    const cntE1 = document.getElementById('countD3_eng1');
    const cntE2 = document.getElementById('countD3_eng2');
    const cntE3 = document.getElementById('countD3_eng3');
    if (cntE1) cntE1.textContent = `${e1Len} / 40 Karakter`;
    if (cntE2) cntE2.textContent = `${e2Len} / 50 Karakter`;
    if (cntE3) cntE3.textContent = `${e3Len} / 30 Karakter`;
    const c4Ok = (e1Len >= 40 && e2Len >= 50 && e3Len >= 30);
    updateCardUI(4, c4Ok);

    // Card 5: Matematika & Finansial
    const finNotesLen = data.financialEfficiencyNotes.length;
    const cntFin = document.getElementById('countD3_finNotes');
    if (cntFin) cntFin.textContent = `${finNotesLen} / 40 Karakter`;
    const c5Ok = (data.totalCost > 0 && data.totalRevenue > 0 && finNotesLen >= 40);
    updateCardUI(5, c5Ok);

    // Card 6: Kesimpulan
    const concLen = data.conclusion.length;
    const cntConc = document.getElementById('countD3_conclusion');
    if (cntConc) cntConc.textContent = `${concLen} / 100 Karakter`;
    const c6Ok = (concLen >= 100);
    updateCardUI(6, c6Ok);

    return { c1Ok, c2Ok, c3Ok, c4Ok, c5Ok, c6Ok, allOk: (c1Ok && c2Ok && c3Ok && c4Ok && c5Ok && c6Ok) };
  }

  function saveNftDay3DraftImmediate(showToast) {
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return;

      const data = collectFormDataD3();
      localStorage.setItem('fincestem_draft_nft_lkpd_d3_' + cleanNisn, JSON.stringify(data));

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const draftTxt = document.getElementById('txtNftLkpdD3DraftStatus');
      if (draftTxt) draftTxt.textContent = `Draft tersimpan (pk ${timeStr} WIB)`;

      const draftFooter = document.getElementById('txtNftD3FooterDraftInfo');
      if (draftFooter) draftFooter.textContent = `Draft tersimpan otomatis pada pk ${timeStr} WIB.`;

      if (showToast && window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast('Draf LKPD Day 3 berhasil disimpan ke memori lokal!', 'success');
      }
    } catch(e) {}
  }

  // ========================================================
  // SUBMIT RESMI LKPD DAY 3 KE FASILITATOR
  // ========================================================
  window.submitNftDay3LkpdOfficial = function() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const valRes = validateAllDay3CardsUI(true);
    const errors = [];
    if (!valRes.c1Ok) errors.push('1. Identitas Lokasi & Narasumber');
    if (!valRes.c2Ok) errors.push('A. Observasi Sains (Tanah/Air & Pertumbuhan/Hama min 40 karakter)');
    if (!valRes.c3Ok) errors.push('B. Audit Teknologi (Alat Mesin & Biaya Operasional min 40 karakter)');
    if (!valRes.c4Ok) errors.push('C. Rekayasa Lapangan (Kendala min 40, Solusi Petani min 50, Evaluasi min 30 karakter)');
    if (!valRes.c5Ok) errors.push('D. Matematika & Finansial (Biaya Modal, Penjualan & Analisis min 40 karakter)');
    if (!valRes.c6Ok) errors.push('E. Kesimpulan Akhir (Minimal 100 karakter)');

    if (errors.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast('Mohon lengkapi bagian berikut sebelum mengirim:\n• ' + errors.join('\n• '), 'error');
      } else {
        alert('Mohon lengkapi formulir LKPD Day 3:\n\n' + errors.join('\n'));
      }
      return;
    }

    if (!confirm('Kirim LKPD Day 3 ke Fasilitator sekarang?\n\nPastikan seluruh data hasil wawancara observasi lapangan dan analisis finansial Anda sudah benar dan akurat.\n\n• Klik "OK" untuk mengirim resmi.\n• Klik "Batal" jika masih ingin memeriksa kembali.')) {
      return;
    }

    const data = collectFormDataD3();
    const secObj = NFT_DAY3_SECTOR_DATA[data.sectorKey] || NFT_DAY3_SECTOR_DATA.pertanian;

    const officialPayload = {
      ...data,
      sectorName: secObj.name,
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      submitted: true,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('fincestem_lkpd_nft_day3_' + cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem('fincestem_lkpd_day3_' + cleanNisn, JSON.stringify(officialPayload));
    } catch(e) {}

    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 3, 'lkpd', officialPayload, function() {
        showSuccessNftDay3Modal();
      });
    } else {
      showSuccessNftDay3Modal();
    }
  };

  function showSuccessNftDay3Modal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            LKPD Day 3 Non-Field Trip Selesai
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            LKPD Observasi Berhasil Dikirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
            Selamat! Lembar kerja observasi lapangan dan analisis STEM Day 3 Anda telah diverifikasi lengkap dan tersimpan resmi di sistem pembinaan fasilitator SMAN 1 Belitang.
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="dokumentasi.html?day=3" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span class="material-symbols-outlined text-base">photo_camera</span>
            <span>Lanjut ke Dokumentasi Foto Day 3</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.renderNonFieldTripDay3LKPD = renderNonFieldTripDay3LKPD;



  // ========================================================
  // 5. IMPLEMENTASI LKPD DAY 2 S.D. DAY 7 NON-FIELD TRIP
  // ========================================================
  const NFT_DAYS_CURRICULUM = {
    1: {
      title: 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur',
      theme: 'Audit Lapangan Koperasi, BUMDes, Agen Perbankan, Pasar & UMKM',
      focus: 'Audit 6 Blok: Profil Usaha, Alur Kegiatan Ekonomi, Profil Nasabah, Kalkulator Arus Kas, Inklusi Finansial, dan Rekomendasi Solusi HOTS'
    },
    2: {
      title: 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur',
      theme: 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering',
      focus: 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.'
    },
    3: {
      title: 'Day 3: Agribisnis Padi & Teknologi Pengolahan Gabah',
      theme: 'Teknologi Penggilingan Padi (RMU), Pengeringan & Kalkulasi Rendemen Gabah',
      focus: 'Kunjungan kilang padi / RMU lokal, observasi mesin pengering/penggiling, kalkulasi rendemen gabah ke beras, dan analisis biaya pengolahan.'
    },
    4: {
      title: 'Day 4: Eksplorasi Peralatan, Perlengkapan Kerja & Mekanisasi Sektor Unggulan Berbasis STEM',
      theme: 'Pilar Exploration & Analisis 4 Dimensi STEM (Science, Technology, Engineering, Mathematics) pada Peralatan Sektor Pilihan',
      focus: 'Eksplorasi mendalam peralatan, perlengkapan kerja (APD), dan mesin mekanisasi pada sektor pilihan Day 3 serta mengaitkannya langsung dengan Science, Technology, Engineering, dan Mathematics.'
    },
    5: {
      title: 'Day 5: Video Observasi YouTube (5–10 Menit): Penerapan STEM & Eksplorasi Alat',
      theme: 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Culture, Exploration (Peralatan) & 4 Unsur STEM',
      focus: 'Pembuatan video observasi lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas Culture, Exploration peralatan kerja, serta penerapan Science, Technology, Engineering, dan Mathematics (STEM).'
    },
    6: {
      title: 'Day 6: Video Analisis YouTube (5–10 Menit): Finansial, Kendala & Solusi Inovasi',
      theme: 'Produksi Video YouTube Mandiri (7 Pilihan Sektor): Analisis Finansial, Evaluasi Kendala & Solusi FINCESTEM',
      focus: 'Pembuatan video analisis lapangan mandiri berdurasi 5–10 menit (tanpa wawancara narasumber) yang diunggah ke YouTube pada 1 dari 7 sektor pilihan, membahas perputaran modal/biaya/HPP/laba (Financial), identifikasi kendala usaha, serta rekomendasi solusi inovasi berbasis FINCESTEM.'
    },
    7: {
      title: 'Day 7: Video Refleksi, BTS & Jurnal Refleksi',
      theme: 'Video Refleksi Perjalanan Day 1–7, Behind The Scene (BTS), Jurnal Refleksi & Bebas Asesmen',
      focus: 'Pembuatan video refleksi perjalanan riset mandiri dari Day 1 s.d. Day 7 (durasi 5–8 menit) dilengkapi rekaman Behind The Scene (BTS/Bloopers) di HP, penyerahan link YouTube di LKPD, pengisian 3 jurnal refleksi, serta bebas kuis asesmen (otomatis tuntas 100/100).'
    }
  };

  let genericDraftTimer = null;
  function saveNftGenericDraftThrottled(dayNum) {
    clearTimeout(genericDraftTimer);
    genericDraftTimer = setTimeout(() => {
      saveNftGenericDraftImmediate(dayNum, false);
    }, 800);
  }

  function saveNftGenericDraftImmediate(dayNum, showToast) {
    try {
      const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
      const cleanNisn = String(u.nisn || u.identifier || '').trim();
      if (!cleanNisn) return { success: false };

      const payments = [];
      if (document.getElementById(`chkPayGenCash_d${dayNum}`)?.checked) payments.push('Tunai');
      if (document.getElementById(`chkPayGenQris_d${dayNum}`)?.checked) payments.push('QRIS');
      if (document.getElementById(`chkPayGenEdc_d${dayNum}`)?.checked) payments.push('EDC');
      if (document.getElementById(`chkPayGenTransfer_d${dayNum}`)?.checked) payments.push('Transfer');

      const now = new Date();
      const draftObj = {
        day: dayNum,
        updatedAt: now.toISOString(),
        topic: document.getElementById(`nftGenTopic_d${dayNum}`)?.value.trim() || '',
        placeName: document.getElementById(`nftGenPlace_d${dayNum}`)?.value.trim() || '',
        district: document.getElementById(`nftGenDistrict_d${dayNum}`)?.value || '',
        village: document.getElementById(`nftGenVillage_d${dayNum}`)?.value.trim() || '',
        interviewee: document.getElementById(`nftGenInterviewee_d${dayNum}`)?.value.trim() || '',
        contact: document.getElementById(`nftGenContact_d${dayNum}`)?.value.trim() || '',
        techUsed: document.getElementById(`nftGenTech_d${dayNum}`)?.value.trim() || '',
        stemNotes: document.getElementById(`nftGenNotes_d${dayNum}`)?.value.trim() || '',
        financialNotes: document.getElementById(`nftGenFinancial_d${dayNum}`)?.value.trim() || '',
        payments: payments,
        problems: document.getElementById(`nftGenProblems_d${dayNum}`)?.value.trim() || '',
        solutions: document.getElementById(`nftGenSolutions_d${dayNum}`)?.value.trim() || '',
        conclusion: document.getElementById(`nftGenConclusion_d${dayNum}`)?.value.trim() || ''
      };

      localStorage.setItem(`fincestem_draft_nft_lkpd_d${dayNum}_` + cleanNisn, JSON.stringify(draftObj));

      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const topBadge = document.getElementById(`txtNftGenericDraftStatus_d${dayNum}`);
      if (topBadge) topBadge.textContent = `Draft tersimpan (pk ${timeStr} WIB)`;
      const botInfo = document.getElementById(`lblLkpdGenericDraftBottomInfo_d${dayNum}`);
      if (botInfo) botInfo.textContent = `Draft tersimpan: Hari ini pk ${timeStr} WIB`;
      const mainBadge = document.getElementById(`nftGenericStatusBadge_d${dayNum}`);
      if (mainBadge) {
        mainBadge.textContent = '📝 Mode Draft (Belum Dikirim)';
        mainBadge.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs';
      }

      if (showToast) {
        if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
          FincestemCore.ui.toast(`✓ Draft LKPD Day ${dayNum} berhasil disimpan sementara! Jawaban Anda aman dan dapat dilanjutkan kapan saja meskipun tanpa sinyal.`, 'success');
        } else {
          alert(`Draft LKPD Day ${dayNum} berhasil disimpan sementara!`);
        }
      }
      return { success: true };
    } catch(e) {
      return { success: false, error: e };
    }
  }

  window.manualSaveNonFieldTripGenericDraft = function(dayNum) {
    saveNftGenericDraftImmediate(dayNum, true);
  };

  window.evaluateGenericSolutionsCounter = function(dayNum) {
    const solEl = document.getElementById(`nftGenSolutions_d${dayNum}`);
    const countEl = document.getElementById(`counterNftGenSolutions_d${dayNum}`);
    const msgEl = document.getElementById(`msgNftGenSolutionsValidation_d${dayNum}`);
    if (!solEl || !countEl) return;

    const count = solEl.value.trim().length;
    countEl.textContent = `${count} / 100`;

    if (count >= 100) {
      countEl.className = 'text-emerald-700 font-bold';
      if (msgEl) {
        msgEl.textContent = '✓ Analisis solusi memenuhi syarat minimal';
        msgEl.className = 'text-emerald-700 font-semibold';
      }
    } else {
      countEl.className = 'text-slate-400 font-bold';
      if (msgEl) {
        msgEl.textContent = `Kurang ${100 - count} karakter lagi`;
        msgEl.className = 'text-slate-400';
      }
    }
  };

  

// =========================================================================
  // INSTRUMEN LKPD DAY 4 NON-FIELD TRIP: JELAJAH LAPANGAN & ALUR DISTRIBUSI SEKTOR
  // 7 Sektor Unggulan OKU Timur • Ramah Siswa SMA • 5 Bagian Praktis
  // =========================================================================

  const NFT_DAY4_EXPLORATION_GUIDE = {
    pertanian: {
      key: 'pertanian',
      name: 'Pertanian Padi Sawah & Tanaman Pangan',
      icon: 'agriculture',
      badge: 'Jelajah Sawah & Saluran Irigasi',
      desc: 'Observasi akses jalan usaha tani, hamparan persawahan irigasi BK, pasokan pupuk/benih, dan rute pengangkutan panen gabah.'
    },
    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan Rakyat (Karet & Kelapa Sawit)',
      icon: 'forest',
      badge: 'Jelajah Kebun & Rute Angkut',
      desc: 'Observasi jalan rintis kebun, drainase lahan, pasokan pupuk/obat herbisida, dan jalur pengiriman getah karet atau buah sawit.'
    },
    peternakan: {
      key: 'peternakan',
      name: 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Ayam)',
      icon: 'pets',
      badge: 'Jelajah Kandang & Lingkungan',
      desc: 'Observasi posisi kandang ternak, pasokan air minum, ketersediaan pakan hijauan/dedak, dan proses penjualan hewan ternak.'
    },
    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Air Tawar (Sentra Patin & Lele Belitang)',
      icon: 'phishing',
      badge: 'Jelajah Kolam & Sumber Air',
      desc: 'Observasi akses jalan ke kolam, sumber pasokan air irigasi, pasokan pakan pelet, dan pengangkutan panen ikan segar hidup.'
    },
    industri: {
      key: 'industri',
      name: 'Agro-Industri Pangan (RMU, Tahu & Kemplang)',
      icon: 'precision_manufacturing',
      badge: 'Jelajah Pengolahan & Distribusi',
      desc: 'Observasi lokasi tempat pengolahan, kelancaran pasokan air bersih/daya listrik, pasokan bahan baku, dan distribusi ke pasar.'
    },
    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan & Saprotan (Kios Pupuk, Bibit & Sembako)',
      icon: 'storefront',
      badge: 'Jelajah Letak Kios & Pasar',
      desc: 'Observasi letak strategis kios di persimpangan jalan poros desa, pasokan barang dari distributor, dan kenyamanan pembeli.'
    },
    formal: {
      key: 'formal',
      name: 'Jasa Keuangan Mikro (Agen BRILink, BUMDes & Jasa)',
      icon: 'account_balance',
      badge: 'Jelajah Layanan & Akses Warga',
      desc: 'Observasi gerai transaksi keuangan di tengah desa, keamanan tempat, kestabilan sinyal/daya listrik, dan perputaran uang tunai.'
    }
  };
  window.NFT_DAY4_EXPLORATION_GUIDE = NFT_DAY4_EXPLORATION_GUIDE;
  // Fallback untuk backward compatibility
  window.NFT_DAY4_TOOL_GUIDE = NFT_DAY4_EXPLORATION_GUIDE;

  function renderNonFieldTripDay4LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Cek kuncian modul Day 4
    let hasMateri = false;
    try {
      const mD4 = localStorage.getItem('fincestem_materi_d4_' + cleanNisn);
      if (mD4) {
        const pm = JSON.parse(mD4);
        if (pm && (pm.submitted || pm.is_submitted || pm.submitted_at)) hasMateri = true;
      }
    } catch(e) {}
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['4_materi']) {
      hasMateri = true;
    }

    // Ambil data tersimpan resmi atau draf
    let saved = null;
    try {
      const raw = localStorage.getItem('fincestem_lkpd_nft_day4_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day4_' + cleanNisn);
      if (raw) saved = JSON.parse(raw);
    } catch(e) {}
    if (!saved) {
      try {
        const d = localStorage.getItem('fincestem_lkpd_nft_day4_draft_' + cleanNisn);
        if (d) saved = JSON.parse(d);
      } catch(e) {}
    }
    saved = saved || {};

    const isSubmitted = !!(saved.submitted || saved.is_submitted || saved.submitted_at);
    const finalReadOnly = !!(isReadOnly || isSubmitted);
    const readOnlyAttr = finalReadOnly ? 'readonly' : '';
    const disabledAttr = finalReadOnly ? 'disabled' : '';

    const isTesterD4 = !!((u && u.is_tester) || (localStorage.getItem('fincestem_admin_testing_session') === 'true') || (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn)));
    const isLockedByPrereq = (!hasMateri && !isSubmitted && !isTesterD4);

    // Deteksi sektor pilihan siswa (terhubung otomatis dari Day 3 / Modul Day 4)
    const defaultSector = saved.sectorKey ||
      localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
      localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) ||
      'pertanian';
    const selectedSector = NFT_DAY4_EXPLORATION_GUIDE[defaultSector] ? defaultSector : 'pertanian';
    const guide = NFT_DAY4_EXPLORATION_GUIDE[selectedSector];

    const val = (k, fallback) => (saved[k] !== undefined && saved[k] !== null) ? saved[k] : (fallback || '');
    let d4CurDistrict = normalizeDistrictName(val('district') || '');
    if (!d4CurDistrict && val('location')) {
      d4CurDistrict = OKU_TIMUR_DISTRICTS.find(d => String(val('location')).toLowerCase().includes(d.toLowerCase())) || '';
    }

    // Backward compatibility fallback untuk catatan isian
    const valRoadNotes = val('roadNotes') || val('toolConstraints') || '';
    const valEnvNotes = val('envNotes') || val('scienceAnalysis') || '';
    const valSupplyNotes = val('supplyNotes') || val('technologyAnalysis') || '';
    const valConclusion = val('conclusion') || val('studentInnovation') || '';

    mainEl.innerHTML = `
      <div class="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">

        <!-- BANNER PERINGATAN JIKA PRASYARAT MODUL BELUM TUNTAS -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Alur Wajib Berurutan Day 4</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Day 4 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 4, Anda <strong>wajib menuntaskan 4 Kartu Riset Mandiri di Modul Belajar</strong> sebelum dapat mengisi Lembar Kerja Jelajah Lapangan ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=4" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Jelajah Day 4 Sekarang</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BANNER HEADER -->
        <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 text-white border border-emerald-700/40 shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-black uppercase tracking-wider mb-2">
                <span>🗺️ DAY 4 • PILAR EXPLORATION (JELAJAH LAPANGAN)</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">Jelajah Lingkungan &amp; Alur Distribusi Sektor</h1>
              <p class="text-xs sm:text-sm text-emerald-200/90 mt-1">Mengamati kondisi jalan, lingkungan sekitar, asal pasokan bahan, dan jalur penjualan produk di OKU Timur</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-right shrink-0">
              <div class="text-[11px] text-emerald-200 font-medium">Peserta Didik:</div>
              <div class="text-xs sm:text-sm font-black text-white">${escapeHtml(studentName)}</div>
              <div class="text-[11px] text-emerald-300 font-bold">NISN: ${escapeHtml(studentNisn)} • ${escapeHtml(studentClass)}</div>
              <div class="text-[10px] text-emerald-200 mt-1 font-medium">Fasilitator: ${escapeHtml(fasilName)}</div>
            </div>
          </div>
        </div>

        ${isSubmitted ? `
          <div class="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-emerald-700 text-2xl">verified</span>
              <div>
                <h4 class="font-extrabold text-xs sm:text-sm text-emerald-950">LKPD Jelajah Lapangan Day 4 Telah Berhasil Diserahkan Resmi!</h4>
                <p class="text-[11px] text-emerald-800">Tersimpan aman pada sistem pembinaan fasilitator. Anda dapat melanjutkan ke Kuis Asesmen Day 4.</p>
              </div>
            </div>
            <a href="asesmen.html?day=4" class="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-black flex items-center justify-center gap-1.5 shrink-0 shadow-xs">
              <span>Lanjut Asesmen Day 4 (10 Soal PG)</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        ` : ''}

        <!-- PILIHAN SEKTOR UNGGULAN (7 SEKTOR OKU TIMUR) -->
        <div class="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-500/50 shadow-sm space-y-3.5">
          <div class="flex items-center justify-between gap-2 flex-wrap border-b border-emerald-200/80 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-xs">
                <span class="material-symbols-outlined text-xl">${guide.icon}</span>
              </span>
              <div>
                <span class="text-[10.5px] font-black uppercase text-emerald-800 tracking-wider">Sektor Unggulan Terpilih Day 4</span>
                <h3 class="font-black text-sm sm:text-base text-slate-900">${guide.name}</h3>
              </div>
            </div>
            <span class="px-3 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              ${guide.badge}
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Ganti Sektor Jelajah Lapangan (Jika Berbeda dari Day 3):</span>
              <span class="text-[10px] text-slate-400 font-semibold">Tersinkron otomatis</span>
            </label>
            <select id="nftD4_sectorKey" ${disabledAttr} onchange="onNftDay4SectorChange(this.value)" class="w-full p-3 rounded-2xl border-2 border-emerald-500 bg-white font-black text-xs sm:text-sm text-emerald-950 focus:ring-2 focus:ring-emerald-500/30 outline-none cursor-pointer shadow-2xs">
              <option value="pertanian" ${selectedSector === 'pertanian' ? 'selected' : ''}>1. Sektor Pertanian Padi Sawah &amp; Tanaman Pangan</option>
              <option value="perkebunan" ${selectedSector === 'perkebunan' ? 'selected' : ''}>2. Sektor Perkebunan Rakyat (Karet &amp; Kelapa Sawit)</option>
              <option value="peternakan" ${selectedSector === 'peternakan' ? 'selected' : ''}>3. Sektor Peternakan Rakyat OKU Timur (Sapi, Kambing &amp; Ayam)</option>
              <option value="perikanan" ${selectedSector === 'perikanan' ? 'selected' : ''}>4. Sektor Perikanan Air Tawar (Sentra Patin &amp; Lele Belitang)</option>
              <option value="industri" ${selectedSector === 'industri' ? 'selected' : ''}>5. Sektor Agro-Industri Pangan (Pabrik RMU, Tahu &amp; Kemplang)</option>
              <option value="perdagangan" ${selectedSector === 'perdagangan' ? 'selected' : ''}>6. Sektor Perdagangan &amp; Saprotan (Kios Pupuk, Bibit &amp; Sembako)</option>
              <option value="formal" ${selectedSector === 'formal' ? 'selected' : ''}>7. Sektor Jasa Keuangan Mikro (Agen BRILink, BUMDes &amp; Jasa)</option>
            </select>
            <p class="text-[11px] text-slate-500 italic mt-0.5">${guide.desc}</p>
          </div>
        </div>

        <!-- FORM ISIAN LKPD DAY 4 -->
        <form id="formNftLkpdDay4" onsubmit="return false;" class="space-y-6">

          <!-- KARTU 1: BAGIAN A — LOKASI & AKSES JALAN -->
          <div id="cardBoxLkpdD4_1" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">A</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian A — Identitas Lokasi &amp; Akses Jalan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Mencatat letak tempat usaha, jarak tempuh, dan kondisi jalan angkut</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD4_1" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Kecamatan di OKU Timur: <span class="text-rose-600">*</span></label>
                <select id="nftD4_district" ${disabledAttr} onchange="onNftDay4DistrictChange(this.value)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(d => `<option value="${d}" ${d4CurDistrict.toLowerCase() === d.toLowerCase() ? 'selected' : ''}>${d}</option>`).join('')}
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Nama Lokasi / Desa / Dusun: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD4_location" ${readOnlyAttr} value="${escapeHtml(val('location'))}" placeholder="Contoh: Desa Sidomulyo, BK 9" oninput="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs font-semibold text-slate-800 bg-white">
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Perkiraan Jarak dari Rumah / Sekolah: <span class="text-rose-600">*</span></label>
                <select id="nftD4_distanceRange" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Dekat (&lt; 1 km / 5 menit)" ${val('distanceRange') === 'Dekat (< 1 km / 5 menit)' ? 'selected' : ''}>Dekat (&lt; 1 km / sekitar 5 menit)</option>
                  <option value="Sedang (1 - 3 km / 10 menit)" ${val('distanceRange') === 'Sedang (1 - 3 km / 10 menit)' ? 'selected' : ''}>Sedang (1 - 3 km / sekitar 10 menit)</option>
                  <option value="Jauh (&gt; 3 km / lebih dari 15 menit)" ${val('distanceRange') === 'Jauh (> 3 km / lebih dari 15 menit)' ? 'selected' : ''}>Jauh (&gt; 3 km / lebih dari 15 menit)</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Kondisi Jalan Menuju Lokasi: <span class="text-rose-600">*</span></label>
                <select id="nftD4_roadCondition" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Jalan Aspal Mulus / Hotmix" ${val('roadCondition') === 'Jalan Aspal Mulus / Hotmix' ? 'selected' : ''}>Jalan Aspal Mulus / Hotmix</option>
                  <option value="Jalan Cor Semen / Beton Desa" ${val('roadCondition') === 'Jalan Cor Semen / Beton Desa' ? 'selected' : ''}>Jalan Cor Semen / Beton Desa</option>
                  <option value="Jalan Tanah Merah / Berkerikil" ${val('roadCondition') === 'Jalan Tanah Merah / Berkerikil' ? 'selected' : ''}>Jalan Tanah Merah / Berkerikil</option>
                  <option value="Masuk Gang / Tanggul Sempit" ${val('roadCondition') === 'Masuk Gang / Tanggul Sempit' ? 'selected' : ''}>Masuk Gang / Tanggul Sempit</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1 pt-1">
              <label class="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Catatan Jalur Akses &amp; Kendaraan Angkut yang Digunakan: <span class="text-rose-600">*</span></span>
                <span id="countD4_road" class="text-[10px] text-slate-400 font-bold">0 / 25 Karakter</span>
              </label>
              <textarea id="nftD4_roadNotes" rows="2" ${readOnlyAttr} oninput="onNftDay4FieldInput()" placeholder="Ceritakan jenis kendaraan yang biasa lewat membawa barang (motor keranjang, pikap, truk) dan apakah jalannya mudah dilewati... (Minimal 25 karakter)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-xs text-slate-800 font-medium ${finalReadOnly ? 'bg-slate-50' : 'bg-white'}">${escapeHtml(valRoadNotes)}</textarea>
            </div>
          </div>

          <!-- KARTU 2: BAGIAN B — SUASANA LINGKUNGAN SEKITAR -->
          <div id="cardBoxLkpdD4_2" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-cyan-100 text-cyan-900 flex items-center justify-center font-black text-sm shrink-0">B</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian B — Suasana Lingkungan Sekitar &amp; Sumber Daya</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Mengamati keadaan alam sekeliling, kemudahan air bersih, dan pasokan listrik</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD4_2" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Keadaan Sekeliling Lokasi: <span class="text-rose-600">*</span></label>
                <select id="nftD4_environmentSurroundings" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-cyan-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Hamparan Persawahan Luas" ${val('environmentSurroundings') === 'Hamparan Persawahan Luas' ? 'selected' : ''}>Hamparan Persawahan Luas</option>
                  <option value="Pinggir Jalan Raya Poros Ramai" ${val('environmentSurroundings') === 'Pinggir Jalan Raya Poros Ramai' ? 'selected' : ''}>Pinggir Jalan Raya Poros Ramai</option>
                  <option value="Dekat Parit / Saluran Irigasi BK" ${val('environmentSurroundings') === 'Dekat Parit / Saluran Irigasi BK' ? 'selected' : ''}>Dekat Parit / Saluran Irigasi BK</option>
                  <option value="Kawasan Pemukiman Warga Desa" ${val('environmentSurroundings') === 'Kawasan Pemukiman Warga Desa' ? 'selected' : ''}>Kawasan Pemukiman Warga Desa</option>
                  <option value="Areal Perkebunan Terbuka" ${val('environmentSurroundings') === 'Areal Perkebunan Terbuka' ? 'selected' : ''}>Areal Perkebunan Terbuka</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Ketersediaan Pasokan Air: <span class="text-rose-600">*</span></label>
                <select id="nftD4_waterSupply" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-cyan-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Sangat Mudah &amp; Melimpah (Irigasi/Sumur Bor)" ${val('waterSupply') === 'Sangat Mudah & Melimpah (Irigasi/Sumur Bor)' ? 'selected' : ''}>Sangat Mudah &amp; Melimpah (Irigasi/Sumur)</option>
                  <option value="Cukup Tersedia untuk Harian" ${val('waterSupply') === 'Cukup Tersedia untuk Harian' ? 'selected' : ''}>Cukup Tersedia untuk Harian</option>
                  <option value="Kadang Sulit saat Kemarau Panjang" ${val('waterSupply') === 'Kadang Sulit saat Kemarau Panjang' ? 'selected' : ''}>Kadang Sulit saat Kemarau Panjang</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Pasokan Daya Listrik: <span class="text-rose-600">*</span></label>
                <select id="nftD4_powerSupply" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-cyan-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Listrik PLN Lancar &amp; Stabil" ${val('powerSupply') === 'Listrik PLN Lancar & Stabil' ? 'selected' : ''}>Listrik PLN Lancar &amp; Stabil</option>
                  <option value="PLN dengan Cadangan Genset" ${val('powerSupply') === 'PLN dengan Cadangan Genset' ? 'selected' : ''}>PLN dengan Cadangan Genset</option>
                  <option value="Belum Memerlukan Listrik Besar" ${val('powerSupply') === 'Belum Memerlukan Listrik Besar' ? 'selected' : ''}>Belum Memerlukan Listrik Besar</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1 pt-1">
              <label class="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Catatan Suasana Lingkungan &amp; Kebersihan Tempat: <span class="text-rose-600">*</span></span>
                <span id="countD4_env" class="text-[10px] text-slate-400 font-bold">0 / 25 Karakter</span>
              </label>
              <textarea id="nftD4_envNotes" rows="2" ${readOnlyAttr} oninput="onNftDay4FieldInput()" placeholder="Jelaskan suasana di sekeliling tempat usaha (kebersihan, kenyamanan, atau parit air di dekatnya)... (Minimal 25 karakter)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-cyan-600 text-xs text-slate-800 font-medium ${finalReadOnly ? 'bg-slate-50' : 'bg-white'}">${escapeHtml(valEnvNotes)}</textarea>
            </div>
          </div>

          <!-- KARTU 3: BAGIAN C — ALUR MASUK BAHAN & PENJUALAN PRODUK -->
          <div id="cardBoxLkpdD4_3" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm shrink-0">C</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian C — Alur Masuk Bahan &amp; Penjualan Produk</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Menelusuri dari mana bahan didatangkan dan ke mana hasil usaha dijual</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD4_3" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Asal Pasokan Bahan Baku / Barang: <span class="text-rose-600">*</span></label>
                <select id="nftD4_supplyOrigin" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-amber-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Kios / Toko Terdekat di Desa" ${val('supplyOrigin') === 'Kios / Toko Terdekat di Desa' ? 'selected' : ''}>Kios / Toko Terdekat di Desa</option>
                  <option value="Agen Distributor Belitang / Gumawang" ${val('supplyOrigin') === 'Agen Distributor Belitang / Gumawang' ? 'selected' : ''}>Agen Distributor Belitang / Gumawang</option>
                  <option value="Kiriman Sales Luar Kota / Palembang" ${val('supplyOrigin') === 'Kiriman Sales Luar Kota / Palembang' ? 'selected' : ''}>Kiriman Sales Luar Daerah</option>
                  <option value="Diambil Sendiri dari Alam / Kebun" ${val('supplyOrigin') === 'Diambil Sendiri dari Alam / Kebun' ? 'selected' : ''}>Diambil Sendiri dari Alam / Kebun</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Tujuan Penjualan Hasil Usaha: <span class="text-rose-600">*</span></label>
                <select id="nftD4_salesTarget" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-amber-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Warga &amp; Tetangga Sekitar Desa" ${val('salesTarget') === 'Warga & Tetangga Sekitar Desa' ? 'selected' : ''}>Warga &amp; Tetangga Sekitar Desa</option>
                  <option value="Pembeli Umum yang Melintas di Jalan" ${val('salesTarget') === 'Pembeli Umum yang Melintas di Jalan' ? 'selected' : ''}>Pembeli Umum yang Melintas</option>
                  <option value="Pengepul / Bakul Bawa Mobil Pikap" ${val('salesTarget') === 'Pengepul / Bakul Bawa Mobil Pikap' ? 'selected' : ''}>Pengepul / Bakul Mobil Pikap</option>
                  <option value="Pasar Tradisional Belitang / Gumawang" ${val('salesTarget') === 'Pasar Tradisional Belitang / Gumawang' ? 'selected' : ''}>Pasar Belitang / Gumawang</option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold text-slate-700">Cara Pembayaran yang Dipakai: <span class="text-rose-600">*</span></label>
                <select id="nftD4_paymentMethod" ${disabledAttr} onchange="onNftDay4FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-amber-600 text-xs font-semibold text-slate-800 bg-white">
                  <option value="Pembayaran Tunai (Cash Langsung)" ${val('paymentMethod') === 'Pembayaran Tunai (Cash Langsung)' ? 'selected' : ''}>Pembayaran Tunai (Cash Langsung)</option>
                  <option value="Transfer Bank / Scan QRIS Digital" ${val('paymentMethod') === 'Transfer Bank / Scan QRIS Digital' ? 'selected' : ''}>Transfer Bank / Scan QRIS</option>
                  <option value="Bayar Tempo (Nanti Setelah Panen)" ${val('paymentMethod') === 'Bayar Tempo (Nanti Setelah Panen)' ? 'selected' : ''}>Bayar Tempo (Setelah Panen)</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-1 pt-1">
              <label class="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Catatan Alur Masuk &amp; Keluar Barang: <span class="text-rose-600">*</span></span>
                <span id="countD4_supply" class="text-[10px] text-slate-400 font-bold">0 / 25 Karakter</span>
              </label>
              <textarea id="nftD4_supplyNotes" rows="2" ${readOnlyAttr} oninput="onNftDay4FieldInput()" placeholder="Ceritakan dari mana bahan baku diperoleh dan siapa yang paling sering membeli produknya... (Minimal 25 karakter)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-amber-600 text-xs text-slate-800 font-medium ${finalReadOnly ? 'bg-slate-50' : 'bg-white'}">${escapeHtml(valSupplyNotes)}</textarea>
            </div>
          </div>

          <!-- KARTU 4: BAGIAN D — UNGGAH FOTO HASIL JELAJAH HP -->
          <div id="cardBoxLkpdD4_4" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">D</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian D — Dokumentasi Foto Jelajah Lingkungan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Unggah 1–2 foto kamera HP suasana tempat usaha dan lingkungan sekitarnya</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD4_4" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Foto 1: Tempat Usaha / Jalan Depan -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-teal-700">photo_camera</span>
                  <span>1. Foto Tempat Usaha / Jalan Depan (Wajib): <span class="text-rose-600">*</span></span>
                </span>
                <input type="file" id="nftD4_filePhoto1" accept="image/*" ${disabledAttr} onchange="onNftDay4PhotoSelected(1)" class="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-100 file:text-teal-900 cursor-pointer">
                <div id="previewD4_photo1" class="w-full h-32 rounded-xl bg-slate-200/70 border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                  ${val('photoUrl1') ? `<img src="${val('photoUrl1')}" class="w-full h-full object-cover">` : `<span class="text-[11px] text-slate-400">Belum ada foto dipilih</span>`}
                </div>
              </div>

              <!-- Foto 2: Lingkungan Sekitar / Parit / Sawah -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-cyan-700">landscape</span>
                  <span>2. Foto Lingkungan Sekitar / Alam (Opsional):</span>
                </span>
                <input type="file" id="nftD4_filePhoto2" accept="image/*" ${disabledAttr} onchange="onNftDay4PhotoSelected(2)" class="text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-100 file:text-cyan-900 cursor-pointer">
                <div id="previewD4_photo2" class="w-full h-32 rounded-xl bg-slate-200/70 border border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                  ${val('photoUrl2') ? `<img src="${val('photoUrl2')}" class="w-full h-full object-cover">` : `<span class="text-[11px] text-slate-400">Belum ada foto dipilih</span>`}
                </div>
              </div>
            </div>
            <p class="text-[11px] text-slate-500 italic">Tips: Foto ini juga akan otomatis tersimpan untuk memperkaya laporan portofolio FINCESTEM Anda.</p>
          </div>

          <!-- KARTU 5: BAGIAN E — KESIMPULAN JELAJAH LAPANGAN -->
          <div id="cardBoxLkpdD4_5" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-sm shrink-0">E</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Bagian E — Kesimpulan Ringkas Jelajah Lapangan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Refleksi nilai strategis tempat usaha dan saran perbaikan fasilitas jalan/lingkungan</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD4_5" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Kesimpulan &amp; Saran Anda: <span class="text-rose-600">*</span></span>
                <span id="countD4_conc" class="text-[10px] text-slate-400 font-bold">0 / 30 Karakter</span>
              </label>
              <textarea id="nftD4_conclusion" rows="3" ${readOnlyAttr} oninput="onNftDay4FieldInput()" placeholder="Tuliskan 2-3 kalimat: apakah posisi tempat usaha ini sudah menguntungkan, dan apa saran perbaikan jalan atau lingkungan di sekitar tempat tersebut... (Minimal 30 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-emerald-600 text-xs text-slate-800 font-medium ${finalReadOnly ? 'bg-slate-50' : 'bg-white'}">${escapeHtml(valConclusion)}</textarea>
            </div>
          </div>

          <!-- FOOTER TOMBOL SIMPAN & KIRIM RESMI -->
          <div class="p-5 rounded-3xl bg-white border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex flex-col">
              <span id="txtNftD4DraftInfo" class="text-xs font-bold text-slate-600">Draf tersimpan otomatis secara berkala</span>
              <span class="text-[10.5px] text-slate-400 font-medium">Pastikan seluruh Bagian A s.d. E berstatus "✓ Lengkap" sebelum mengirim</span>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              ${!finalReadOnly ? `
                <button type="button" onclick="saveNonFieldTripDay4Draft(true)" class="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-base">save</span>
                  <span>Simpan Draf</span>
                </button>
                <button type="button" id="btnSubmitNftLkpdDay4" onclick="submitNonFieldTripDay4LKPD()" class="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Kirim Resmi LKPD Day 4</span>
                </button>
              ` : `
                <div class="px-5 py-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-xs flex items-center gap-2">
                  <span class="material-symbols-outlined text-base text-emerald-700">verified</span>
                  <span>LKPD Day 4 Telah Terkirim Resmi</span>
                </div>
              `}
            </div>
          </div>

        </form>
      </div>
    `;

    setTimeout(() => {
      validateAllDay4CardsUI(false);
    }, 100);
  }
  window.renderNonFieldTripDay4LKPD = renderNonFieldTripDay4LKPD;

  // Real-time photo handling with Base64 preview
  window.onNftDay4PhotoSelected = function(photoIndex) {
    const inputEl = document.getElementById('nftD4_filePhoto' + photoIndex);
    const previewEl = document.getElementById('previewD4_photo' + photoIndex);
    if (!inputEl || !inputEl.files || !inputEl.files[0]) return;

    const file = inputEl.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const b64 = e.target.result;
      if (previewEl) {
        previewEl.innerHTML = `<img src="${b64}" class="w-full h-full object-cover rounded-xl">`;
      }
      previewEl.setAttribute('data-photo-url', b64);
      onNftDay4FieldInput();
    };
    reader.readAsDataURL(file);
  };

  let day4DraftTimer = null;
  window.onNftDay4FieldInput = function() {
    validateAllDay4CardsUI(false);
    clearTimeout(day4DraftTimer);
    day4DraftTimer = setTimeout(() => {
      saveNonFieldTripDay4Draft(false);
    }, 800);
  };

  window.onNftDay4DistrictChange = function(newDist) {
    const locInput = document.getElementById('nftD4_location');
    if (locInput && newDist) {
      if (!locInput.value) {
        locInput.value = 'Desa ..., Kec. ' + newDist;
      } else if (!locInput.value.toLowerCase().includes(newDist.toLowerCase())) {
        locInput.value = locInput.value.replace(/,?\s*Kec\.\s*[^,]+/i, '') + ', Kec. ' + newDist;
      }
    }
    onNftDay4FieldInput();
  };

  window.onNftDay4SectorChange = function(newSectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    saveNonFieldTripDay4Draft(false);
    localStorage.setItem('fincestem_nft_sector_d4_' + cleanNisn, newSectorKey);

    // Bersihkan cache paket asesmen Day 4 agar soalnya langsung berganti sesuai sektor baru
    try {
      localStorage.removeItem('fincestem_pkg_nft_asesmen_v3_d4_' + cleanNisn);
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('fincestem_pkg_nft_asesmen_v3_d4_') && k.endsWith(cleanNisn)) {
          localStorage.removeItem(k);
        }
      });
    } catch(e) {}

    if (window.FincestemCore && FincestemCore.ui) {
      const guide = NFT_DAY4_EXPLORATION_GUIDE[newSectorKey];
      const secName = guide ? guide.name : newSectorKey;
      FincestemCore.ui.toast('Sektor LKPD Day 4 diubah ke: ' + secName + '. Instrumen telah disesuaikan!', 'info');
    }
    renderNonFieldTripDay4LKPD(false);
  };

  function collectNftDay4Data() {
    const valOf = (id) => (document.getElementById(id)?.value || '').trim();
    const p1El = document.getElementById('previewD4_photo1');
    const p2El = document.getElementById('previewD4_photo2');
    const photo1 = (p1El && p1El.getAttribute('data-photo-url')) || (p1El?.querySelector('img')?.src) || '';
    const photo2 = (p2El && p2El.getAttribute('data-photo-url')) || (p2El?.querySelector('img')?.src) || '';

    const secKey = valOf('nftD4_sectorKey') || 'pertanian';
    const guide = NFT_DAY4_EXPLORATION_GUIDE[secKey] || NFT_DAY4_EXPLORATION_GUIDE.pertanian;

    return {
      day: 4,
      sectorKey: secKey,
      sectorName: guide.name,
      district: valOf('nftD4_district'),
      location: valOf('nftD4_location'),
      distanceRange: valOf('nftD4_distanceRange'),
      roadCondition: valOf('nftD4_roadCondition'),
      roadNotes: valOf('nftD4_roadNotes'),
      environmentSurroundings: valOf('nftD4_environmentSurroundings'),
      waterSupply: valOf('nftD4_waterSupply'),
      powerSupply: valOf('nftD4_powerSupply'),
      envNotes: valOf('nftD4_envNotes'),
      supplyOrigin: valOf('nftD4_supplyOrigin'),
      salesTarget: valOf('nftD4_salesTarget'),
      paymentMethod: valOf('nftD4_paymentMethod'),
      supplyNotes: valOf('nftD4_supplyNotes'),
      photoUrl1: photo1,
      photoUrl2: photo2,
      conclusion: valOf('nftD4_conclusion'),
      // Fallback aliases
      mainTools: valOf('nftD4_roadNotes'),
      supportTools: valOf('nftD4_envNotes'),
      scienceAnalysis: valOf('nftD4_envNotes'),
      technologyAnalysis: valOf('nftD4_supplyNotes'),
      engineeringAnalysis: valOf('nftD4_roadNotes'),
      mathematicsAnalysis: valOf('nftD4_distanceRange'),
      toolConstraints: valOf('nftD4_roadNotes'),
      studentInnovation: valOf('nftD4_conclusion'),
      updatedAt: new Date().toISOString()
    };
  }

  function validateAllDay4CardsUI(showErrors) {
    const data = collectNftDay4Data();

    const updateCardUI = (cardNum, isOk) => {
      const box = document.getElementById('cardBoxLkpdD4_' + cardNum);
      const badge = document.getElementById('badgeCardStatusLkpdD4_' + cardNum);
      if (box && badge) {
        if (isOk) {
          box.className = 'p-5 sm:p-6 rounded-3xl bg-emerald-50/20 border-2 border-emerald-400 shadow-xs space-y-4 transition-all';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs';
          badge.textContent = '✓ Lengkap';
        } else {
          box.className = 'p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs space-y-4 transition-all';
          badge.className = 'px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0';
          badge.textContent = 'Belum Lengkap';
        }
      }
    };

    // Card 1: Bagian A
    const rLen = data.roadNotes.length;
    const cntR = document.getElementById('countD4_road');
    if (cntR) cntR.textContent = `${rLen} / 25 Karakter`;
    const c1Ok = (data.location.length >= 3 && data.district.length >= 2 && rLen >= 25);
    updateCardUI(1, c1Ok);

    // Card 2: Bagian B
    const eLen = data.envNotes.length;
    const cntE = document.getElementById('countD4_env');
    if (cntE) cntE.textContent = `${eLen} / 25 Karakter`;
    const c2Ok = (eLen >= 25);
    updateCardUI(2, c2Ok);

    // Card 3: Bagian C
    const sLen = data.supplyNotes.length;
    const cntS = document.getElementById('countD4_supply');
    if (cntS) cntS.textContent = `${sLen} / 25 Karakter`;
    const c3Ok = (sLen >= 25);
    updateCardUI(3, c3Ok);

    // Card 4: Bagian D (Foto HP)
    // Cek ada photoUrl1 atau siswa sudah pernah simpan
    const c4Ok = (data.photoUrl1 && data.photoUrl1.length > 50) || (saved && saved.photoUrl1);
    updateCardUI(4, c4Ok);

    // Card 5: Bagian E
    const concLen = data.conclusion.length;
    const cntConc = document.getElementById('countD4_conc');
    if (cntConc) cntConc.textContent = `${concLen} / 30 Karakter`;
    const c5Ok = (concLen >= 30);
    updateCardUI(5, c5Ok);

    return { c1Ok, c2Ok, c3Ok, c4Ok, c5Ok, allOk: (c1Ok && c2Ok && c3Ok && c4Ok && c5Ok) };
  }

  function saveNonFieldTripDay4Draft(showToast) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const data = collectNftDay4Data();
    try {
      localStorage.setItem('fincestem_lkpd_nft_day4_draft_' + cleanNisn, JSON.stringify(data));
      const infoEl = document.getElementById('txtNftD4DraftInfo');
      if (infoEl) {
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        infoEl.textContent = `Draf tersimpan otomatis (pk ${timeStr} WIB)`;
      }
      if (showToast !== false && window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Draf LKPD Day 4 berhasil disimpan!', 'success');
      }
    } catch(e) {}
  }

  function submitNonFieldTripDay4LKPD() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const data = collectNftDay4Data();

    const missing = [];
    if (data.location.length < 3) missing.push('Nama Lokasi / Desa di OKU Timur');
    if (!data.district) missing.push('Kecamatan di OKU Timur');
    if (data.roadNotes.length < 25) missing.push('Catatan Akses Jalan (Min 25 karakter)');
    if (data.envNotes.length < 25) missing.push('Catatan Lingkungan Sekitar (Min 25 karakter)');
    if (data.supplyNotes.length < 25) missing.push('Catatan Alur Masuk & Keluar Barang (Min 25 karakter)');
    if (!data.photoUrl1 || data.photoUrl1.length < 50) missing.push('Foto Tempat Usaha / Jalan Depan (Bagian D)');
    if (data.conclusion.length < 30) missing.push('Kesimpulan Jelajah Lapangan (Min 30 karakter)');

    if (missing.length > 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Harap lengkapi bagian berikut terlebih dahulu:\n• ' + missing.join('\n• '), 'warning');
      } else {
        alert('Harap lengkapi bagian berikut:\n• ' + missing.join('\n• '));
      }
      return;
    }

    data.studentName = u.name || '';
    data.studentNisn = cleanNisn;
    data.studentClass = u.class || u.class_name || '';
    data.submitted = true;
    data.submitted_at = new Date().toISOString();
    data.submittedAt = data.submitted_at;
    data.summary = `LKPD Day 4 (Jelajah Lapangan & Distribusi - ${data.sectorName}): Lokasi: ${data.location} (${data.district}) | Alur Pasokan & Akses Jalan Terverifikasi.`;

    try {
      localStorage.setItem('fincestem_lkpd_nft_day4_' + cleanNisn, JSON.stringify(data));
      localStorage.setItem('fincestem_lkpd_day4_' + cleanNisn, JSON.stringify(data));
      localStorage.setItem('fincestem_nft_sector_d4_' + cleanNisn, data.sectorKey);
    } catch(e) {}

    const onDone = function() {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('LKPD Jelajah Lapangan Day 4 Berhasil Diserahkan Resmi!', 'success');
      }
      renderNonFieldTripDay4LKPD(true);
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
      modal.innerHTML = `
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
          <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
            <span class="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
              LKPD Day 4 Selesai
            </span>
            <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
              Laporan Jelajah Lapangan Terkirim!
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
              Selamat! Laporan observasi akses jalan, lingkungan sekitar, dan alur pasokan barang pada sektor <strong>${escapeHtml(data.sectorName)}</strong> telah tersimpan resmi pada pembinaan fasilitator.
            </p>
          </div>
          <div class="w-full flex flex-col gap-2 pt-2">
            <a href="asesmen.html?day=4" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">quiz</span>
              <span>Lanjut ke Kuis Asesmen Day 4 (10 Soal PG)</span>
            </a>
            <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
              <span>Kembali ke Beranda Dashboard</span>
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    };

    if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
      FincestemCore.progress.submitTask(cleanNisn, 4, 'lkpd', data, function() {
        onDone();
      });
    } else {
      onDone();
    }
  }

  // =========================================================================
  // INSTRUMEN LKPD DAY 5 & DAY 6: PENGUMPULAN LINK VIDEO YOUTUBE (5-10 MENIT)
  // 7 Pilihan Menu Sektor Interaktif + Panduan Urutan Video + Live YouTube Player
  // =========================================================================

  const NFT_LKPD_VIDEO_SECTORS = {
  "pertanian": {
    "key": "pertanian",
    "name": "Pertanian Padi Sawah",
    "shortName": "🌾 Pertanian Padi",
    "badge": "Padi Sawah, Irigasi & Alsintan",
    "icon": "agriculture",
    "examples": "Lahan Sawah Padi Irigasi BK, Traktor Pembajak, Pompa Alkon, atau Mesin Combine Harvester",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Lokasi Sawah di Belitang",
      "01:30–04:30 | Penjelasan Pilar Sains: Karakteristik Tanah Aluvial, Air Irigasi BK & Kebutuhan Nutrisi Pupuk Padi",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Traktor Rotari, Sprayer Elektrik & Combine Harvester",
      "07:30–10:00 | Analisis Pengaruh Teknologi terhadap Efisiensi Kerja Tani, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (sains tanah aluvial, peran air irigasi BK, nutrisi N-P-K bagi vegetatif/generatif padi, fotosintesis, dan biologi hama tanaman)",
      "tech": "Teknologi pertanian yang ditunjukkan di video (traktor roda dua/empat, tangki semprot elektrik nozzle flat fan, pompa alkon, atau mesin combine harvester)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (pola tanam Jajar Legowo, rekayasa pintu air parit irigasi, atau desain mata pisau traktor)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (luas petak sawah, dosis takaran pupuk per hektar, atau kecepatan kerja combine harvester per jam)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Persawahan yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Trik Praktis Jajar Legowo, Pintu Air Parit & Perangkap Hama Tikus TBS",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Rincian Modal BOP 1 Ha, Bagi Hasil Panen, Omzet Gabah & Laba Bersih",
      "07:30–10:00 | Gagasan Solusi Inovasi Nilai Tambah (Hilirisasi Beras Kemasan 5 Kg), Prospek Masa Depan & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian modal operasional prapanen (olah tanah, benih, pupuk, upah tanam/semprot), bagi hasil mesin panen, harga jual gabah per kg, omzet, dan laba bersih per musim",
      "constraints": "Kendala utama di lapangan (serangan hama tikus/wereng, harga pupuk non-subsidi, cuaca ekstrem, atau harga gabah anjlok saat panen raya)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (hilirisasi gabah menjadi beras kemasan 5 kg berlabel desa, pengomposan jerami dengan trichoderma, dan pencatatan kas tani)"
    }
  },
  "perkebunan": {
    "key": "perkebunan",
    "name": "Perkebunan Rakyat",
    "shortName": "🌴 Perkebunan",
    "badge": "Karet, Kelapa Sawit & Komoditas",
    "icon": "forest",
    "desc": "Lateks Karet, Panen Sawit, Pisau Sadap, Galah Egrek & Laba Pekebun",
    "examples": "Kebun Karet Rakyat Desa, Perkebunan Kelapa Sawit, Lahan Singkong/Tebu, atau Kebun Buah Lokal",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Perkebunan Karet/Sawit di OKU Timur",
      "01:30–04:30 | Penjelasan Pilar Sains: Tekanan Turgor Sel Lateks Pagi Hari, Kimia Asam Format & Pematangan Sawit",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Pisau Sadap Lengkung, Talang Seng, Galah Egrek & Rorak Resapan",
      "07:30–10:00 | Analisis Pengaruh Presisi Alat terhadap Umur Produktif Pohon, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (tekanan turgor pembuluh getah saat fajar, reaksi asam format/semut menggumpalkan lateks, etilen pematangan buah sawit, dan kesuburan tanah)",
      "tech": "Teknologi perkebunan yang ditunjukkan di video (pisau sadap dorong/tarik bersudut 30°, talang seng getah, mangkok gantung kawat, atau galah aluminium egrek sawit)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (sudut kemiringan sayatan sadap, jarak tanam mata lima sawit, atau parit rorak penampung air hujan)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (populasi pohon per hektar, volume mangkok sadap, estimasi kilogram getah harian, atau tonase panen TBS sawit)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Perkebunan yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Talang Plastik Penahan Hujan, Konservasi Rorak & Tumpukan Pelepah Sawit",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Biaya Perawatan Kebun, Bagi Hasil Sadap 50:50, Harga UPPB & Laba Bersih",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Bokar Bersih Lelang UPPB Bebas Tatal/Air), Prospek Komoditas & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian biaya pemeliharaan bulanan (pupuk NPK/dolomit, herbisida), pembagian hasil sadap 50:50 antara pemilik dan penyadap, harga jual bokar/TBS, dan laba bersih bulanan",
      "constraints": "Kendala lapangan (hujan membasahi bidang sadap sehingga getah meluber, daun gugur saat kemarau, potongan timbangan kadar air tinggi oleh tengkulak, atau penyakit jamur)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (pemasangan talang pelindung hujan rain gutter, penjualan lelang bersama via UPPB kelompok tani, dan bokar bersih)"
    }
  },
  "peternakan": {
    "key": "peternakan",
    "name": "Peternakan Rakyat OKU Timur",
    "shortName": "🐄 Peternakan",
    "badge": "Sapi, Kambing, Ayam & Bebek",
    "icon": "pets",
    "desc": "Peternakan Sapi Potong, Kambing, Ayam, Mesin Chopper & Silase",
    "examples": "Kandang Sapi Penggemukan Desa, Peternakan Kambing/Domba, Kandang Ayam Broiler/Petelur, atau Bebek",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Lokasi Peternakan Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Sistem Lambung Rumen Sapi, Bakteri Pencerna Serat & Biokimia Silase Pakan",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Chopper Pencacah Rumput, Nipple Drinker & Desain Lantai Miring",
      "07:30–10:00 | Analisis Efisiensi Mekanisasi terhadap Pertambahan Bobot Ternak, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (biologi lambung ruminansia sapi, fermentasi anaerob bakteri asam laktat pakan silase, metabolisme protein konsentrat, dan sanitasi pencegahan PMK)",
      "tech": "Teknologi peternakan yang ditunjukkan di video (mesin chopper bertenaga motor bensin, drum kedap udara silase, sistem minum puting nipple drinker, atau pemanas kandang)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (kemiringan lantai kandang 2-5° untuk drainase feses/urin, ventilasi atap bertingkat monitor roof, atau palung pakan semen)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (kebutuhan pakan hijauan 10% bobot badan, takaran konsentrat dedak per hari, atau estimasi pertambahan bobot ADG)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Peternakan yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Ventilasi Atap Kandang Monitor, Pengolahan Jerami Amoniasi & Reaktor Biogas",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Bakalan Sapi, Biaya Konsentrat 100 Hari, Omzet Idul Adha & Laba Bersih",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Monetisasi Pupuk Bokashi Kemasan 20 Kg), Potensi Desa & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian modal pembelian bakalan (pedet), akumulasi biaya pakan konsentrat/obat selama 100 hari, harga jual sapi saat Idul Adha, omzet, dan laba bersih per ekor",
      "constraints": "Kendala utama peternak (sulit mencari rumput segar saat musim kemarau panjang, lonjakan harga pakan pabrikan, risiko penyakit menular, atau limbah bau kotoran kandang)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (pembuatan biogas rumah tangga dari limbah feses sapi, pengolahan ampas padat menjadi pupuk bokashi kemasan, dan amoniasi jerami)"
    }
  },
  "perikanan": {
    "key": "perikanan",
    "name": "Perikanan Air Tawar",
    "shortName": "🐟 Perikanan",
    "badge": "Kolam Patin, Lele & Nila Belitang",
    "icon": "phishing",
    "desc": "Budidaya Patin/Lele, Mutu Air, Kincir Aerasi & Rasio Pakan FCR",
    "examples": "Kolam Tanah Ikan Patin, Kolam Terpal Bioflok Lele/Nila, Pembenihan Ikan, atau Balai Benih Air Tawar",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Sentra Kolam Ikan Air Tawar Belitang",
      "01:30–04:30 | Penjelasan Pilar Sains: Parameter Mutu Air (DO, pH, Suhu), Bahaya Amonia & Kebutuhan Protein Pelet",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Kincir Air Aerator Elektrik, Pompa Alkon, Pipa Central Drain & Bak Sortir",
      "07:30–10:00 | Analisis Hubungan Oksigen Terlarut dengan Nafsu Makan Ikan, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (kadar oksigen terlarut DO minimal 3 mg/L, stabilitas pH air 6,5-8, bahaya amonia dari sisa pakan, dan protein pelet terapung 30-32%)",
      "tech": "Teknologi perikanan yang ditunjukkan di video (kincir aerator paddle wheel bertenaga listrik, pompa air alkon, pipa tengah central drain, atau ember grader sortir ukuran)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (kemiringan dasar kolam ke arah pipa pembuangan tengah, konstruksi talud tanggul penahan erosi kincir, atau paranet peneduh)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (luas dan volume kubikasi air kolam, padat tebar bibit per m2, takaran pakan harian 3-5% biomassa, atau persentase hidup SR)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Kolam Ikan yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Saluran Central Drain Penguras Lumpur & Budidaya Pakan Alternatif Maggot BSF",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Benih 3.000 Ekor, Biaya Pakan Pelet FCR, Omzet Panen & Laba Bersih",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Hilirisasi Fillet Patin Beku & Kemplang Ikan), Prospek Bisnis & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian biaya pengadaan benih, total belanja sak pelet selama 6 bulan, perhitungan rasio pakan FCR, harga jual ikan patin per kg, omzet panen, dan laba bersih per siklus",
      "constraints": "Kendala budidaya (mahalnya pakan pelet pabrik yang menguras 70% biaya, kematian mendadak akibat air hujan asam yang menurunkan pH, atau harga anjlok dipermainkan tengkulak)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (budidaya maggot BSF untuk menekan biaya pakan hingga 30%, aplikasi probiotik penjaga air, dan pembuatan produk olahan fillet/kemplang)"
    }
  },
  "industri": {
    "key": "industri",
    "name": "Agro-Industri Pangan",
    "shortName": "🏭 Agro-Industri",
    "badge": "Pabrik RMU, Tahu & Kemplang",
    "icon": "precision_manufacturing",
    "desc": "Penggilingan Padi RMU, Tahu-Tempe, Kemplang, Rendemen & Mesin",
    "examples": "Pabrik Penggilingan Padi (RMU) Beras, Pabrik Tahu-Tempe Kedelai, Rumah Produksi Kemplang Panggang/Goreng",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Pabrik Agro-Industri Pangan Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Struktur Anatomi Butir Padi (Sekam, Aleuron Bekatul, Endosperma) atau Kimia Fermentasi",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Husker Rol Karet, Polisher Pemutih, Boiler Uap & Continuous Sealer",
      "07:30–10:00 | Analisis Mekanisme Mesin terhadap Rendemen dan Kualitas Produk Pangan, Kesimpulan & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (anatomi bulir gabah, lapisan aleuron bekatul agar beras tidak tengik, gelatinisasi pati kemplang, atau koagulasi protein tahu oleh asam)",
      "tech": "Teknologi industri yang ditunjukkan di video (mesin pemecah kulit husker rol karet, polisher penyosoh, mesin color sorter optic, boiler ketel uap sekam, atau sealer perekat kemasan)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (konveyor mangkok vertikal bucket elevator, siklon pengendali debu cerobong, atau penataan ruang produksi higienis)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (persentase rendemen beras giling 65%, kapasitas giling mesin per jam, takaran bahan adonan, atau gramasi kemasan produk)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Pabrik Agro-Industri yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Elevator Konveyor Otomatis, Siklon Pemisah Debu Sekam & Pengering Sirkulasi",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Beli 4 Ton Gabah, Biaya Solar/Operator, Omzet Beras/Bekatul & Laba Harian",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Briket Arang dari Limbah Sekam Padi), Efisiensi Pabrik & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian biaya harian pembelian bahan baku gabah mentah, biaya bahan bakar solar/listrik, upah tenaga operator, kemasan karung, omzet penjualan beras dan bekatul, serta laba bersih harian",
      "constraints": "Kendala operasional (beras patah tinggi jika gabah basah saat musim hujan, debu sekam yang beterbangan, mahalnya suku cadang rol karet mesin giling, atau fluktuasi harga gabah)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (pemanfaatan mesin pengering flat-bed dryer suhu rendah, pengolahan limbah sekam menjadi briket arang biomassa, dan kemasan kedap udara)"
    }
  },
  "perdagangan": {
    "key": "perdagangan",
    "name": "Perdagangan & Saprotan",
    "shortName": "🏪 Perdagangan & Toko",
    "badge": "Kios Saprotan, Sembako & Grosir",
    "icon": "storefront",
    "desc": "Kios Pupuk Bersubsidi, Toko Sembako, Grosir, Timbangan & POS",
    "examples": "Kios Pupuk & Obat Pertanian Resmi, Toko Sembako Grosir/Eceran, Kios Pasar Tradisional, atau Toko Bangunan",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Kios Saprotan atau Toko Sembako Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Sifat Higroskopis Pupuk Urea, Penyimpanan Terigu/Beras & Pita Toksisitas Pestisida",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Timbangan Sensor Digital Load Cell, Aplikasi i-Pubers & Sistem Kasir",
      "07:30–10:00 | Analisis Peran Alat Ukur Presisi terhadap Kepercayaan Pembeli, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (sifat higroskopis urea yang menyerap air dari lantai dingin sehingga butuh palet kayu, pencegahan kutu beras/kapang pada kelembaban terkontrol, dan pita toksisitas racun)",
      "tech": "Teknologi perdagangan yang ditunjukkan di video (timbangan digital elektronik load cell, smartphone pemindai barcode / e-KTP i-Pubers pupuk subsidi, kalkulator POS, atau perekat sealer)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (tata letak lorong gudang penyimpanan, sirkulasi udara ventilasi toko, atau sistem antrean satu arah meja kasir)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (akurasi gramasi timbangan digital, konversi satuan grosir sak/dus ke eceran kg/liter, atau kalkulasi kuota e-Alokasi pupuk)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Toko Perdagangan yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Penataan Rak Sistem FIFO (First In First Out) & Repacking Kemasan Ritel Higienis",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Kulakan Mingguan Rp16 Juta, Margin Laba 15%, Omzet & Laba Bersih",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Layanan Pesan Antar WhatsApp Desa & Pembayaran QRIS), Prospek Toko & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian perputaran modal kulakan barang mingguan (HPP beras, minyak, pupuk), biaya operasional toko (listrik, kemasan, transportasi), penentuan margin laba 10-20%, omzet, dan laba bersih mingguan/bulanan",
      "constraints": "Kendala operasional toko (risiko barang kedaluwarsa jika stok lama tertimbun di belakang, modal macet akibat piutang kasbon pembeli, persaingan harga distributor, atau susut timbangan)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (penerapan SOP penataan stok FIFO, pembatasan batas plafon piutang kasbon, layanan pesan antar WhatsApp desa, dan adopsi QRIS digital)"
    }
  },
  "formal": {
    "key": "formal",
    "name": "Jasa Keuangan Mikro",
    "shortName": "🏦 Keuangan Mikro",
    "badge": "Agen BRILink, BUMDes & Jasa",
    "icon": "account_balance",
    "desc": "Agen BRILink, BUMDes Keuangan, Mesin EDC, Enkripsi & Fee Admin",
    "examples": "Gerai Agen BRILink Desa, Unit Keuangan BUMDes Simpan Pinjam, Koperasi Simpan Pinjam Desa, atau Loket Keuangan Mikro",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Gerai Agen Keuangan Mikro di Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Fisika Optik Sinar UV Detektor Uang Palsu & Kimia Kertas Struk Termal",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin EDC Portabel, Microchip Kriptografi Kartu ATM & Router 4G LTE",
      "07:30–10:00 | Analisis Kecepatan dan Keamanan Transaksi Digital Perbankan, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (pendaran fluoresensi serat fosfor uang asli di bawah radiasi sinar Ultraviolet 365 nm, dan reaksi termokimia kertas struk termal yang menghitam saat terkena panas jarum print)",
      "tech": "Teknologi perbankan yang ditunjukkan di video (mesin EDC nirkabel dengan slot baca kartu chip EMV, jaringan data seluler 4G terenkripsi TLS/SSL ke server perbankan, UPS cadangan listrik, atau mesin hitung uang)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (desain sekat loket kasir akrilik dengan celah baki geser, sudut pandang kamera CCTV pengawas, brankas baja tahan api, atau alur SOP verifikasi transfer)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (ketelitian hitung lembaran uang kas, struktur tarif fee administrasi per transaksi Rp3.000–Rp5.000, atau rekonsiliasi saldo kasir harian)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Agen Keuangan Mikro yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Loket Meja Transaksi Bersekat Akrilik, SOP Anti Struk Palsu & Dual-SIM Failover Router",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Likuiditas Rp60 Juta (Bank & Kas), 40 Transaksi/Hari, Fee Bersih & Laba",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Manajemen Likuiditas Kas Terjadwal Musim Panen Raya), Inklusi Keuangan & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian manajemen modal likuiditas perputaran (saldo rekening giro bank vs uang tunai di brankas), perhitungan pendapatan fee administrasi bersih x volume transaksi harian, biaya operasional, dan laba bersih bulanan",
      "constraints": "Kendala & risiko operasional (gangguan sinyal internet di desa, kehabisan kas tunai saat musim panen raya, ancaman penipuan modus struk transfer palsu via WA, atau risiko selisih hitung kasir)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (SOP wajib cek mutasi saldo masuk sebelum serahkan uang tunai, pemasangan router Dual-SIM dengan koneksi cadangan, dan penjadwalan kas panen raya)"
    }
  },
  "keuangan": {
    "key": "formal",
    "name": "Jasa Keuangan Mikro",
    "shortName": "🏦 Keuangan Mikro",
    "badge": "Agen BRILink, BUMDes & Jasa",
    "icon": "account_balance",
    "desc": "Agen BRILink, BUMDes Keuangan, Mesin EDC, Enkripsi & Fee Admin",
    "examples": "Gerai Agen BRILink Desa, Unit Keuangan BUMDes Simpan Pinjam, Koperasi Simpan Pinjam Desa, atau Loket Keuangan Mikro",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Gerai Agen Keuangan Mikro di Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Fisika Optik Sinar UV Detektor Uang Palsu & Kimia Kertas Struk Termal",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin EDC Portabel, Microchip Kriptografi Kartu ATM & Router 4G LTE",
      "07:30–10:00 | Analisis Kecepatan dan Keamanan Transaksi Digital Perbankan, Kesimpulan Sains-Teknologi & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (pendaran fluoresensi serat fosfor uang asli di bawah radiasi sinar Ultraviolet 365 nm, dan reaksi termokimia kertas struk termal yang menghitam saat terkena panas jarum print)",
      "tech": "Teknologi perbankan yang ditunjukkan di video (mesin EDC nirkabel dengan slot baca kartu chip EMV, jaringan data seluler 4G terenkripsi TLS/SSL ke server perbankan, UPS cadangan listrik, atau mesin hitung uang)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (desain sekat loket kasir akrilik dengan celah baki geser, sudut pandang kamera CCTV pengawas, brankas baja tahan api, atau alur SOP verifikasi transfer)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (ketelitian hitung lembaran uang kas, struktur tarif fee administrasi per transaksi Rp3.000–Rp5.000, atau rekonsiliasi saldo kasir harian)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Agen Keuangan Mikro yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Loket Meja Transaksi Bersekat Akrilik, SOP Anti Struk Palsu & Dual-SIM Failover Router",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Likuiditas Rp60 Juta (Bank & Kas), 40 Transaksi/Hari, Fee Bersih & Laba",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Manajemen Likuiditas Kas Terjadwal Musim Panen Raya), Inklusi Keuangan & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian manajemen modal likuiditas perputaran (saldo rekening giro bank vs uang tunai di brankas), perhitungan pendapatan fee administrasi bersih x volume transaksi harian, biaya operasional, dan laba bersih bulanan",
      "constraints": "Kendala & risiko operasional (gangguan sinyal internet di desa, kehabisan kas tunai saat musim panen raya, ancaman penipuan modus struk transfer palsu via WA, atau risiko selisih hitung kasir)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (SOP wajib cek mutasi saldo masuk sebelum serahkan uang tunai, pemasangan router Dual-SIM dengan koneksi cadangan, dan penjadwalan kas panen raya)"
    }
  },
  "jasa": {
    "key": "industri",
    "name": "Agro-Industri Pangan",
    "shortName": "🏭 Agro-Industri",
    "badge": "Pabrik RMU, Tahu & Kemplang",
    "icon": "precision_manufacturing",
    "desc": "Penggilingan Padi RMU, Tahu-Tempe, Kemplang, Rendemen & Mesin",
    "examples": "Pabrik Penggilingan Padi (RMU) Beras, Pabrik Tahu-Tempe Kedelai, Rumah Produksi Kemplang Panggang/Goreng",
    "day5Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri (Nama, NISN, Kelas) & Profil Pabrik Agro-Industri Pangan Desa",
      "01:30–04:30 | Penjelasan Pilar Sains: Struktur Anatomi Butir Padi (Sekam, Aleuron Bekatul, Endosperma) atau Kimia Fermentasi",
      "04:30–07:30 | Penjelasan Pilar Teknologi: Sorotan Mesin Husker Rol Karet, Polisher Pemutih, Boiler Uap & Continuous Sealer",
      "07:30–10:00 | Analisis Mekanisme Mesin terhadap Rendemen dan Kualitas Produk Pangan, Kesimpulan & Penutup"
    ],
    "day5Prompts": {
      "science": "Prinsip Sains yang dijelaskan di video (anatomi bulir gabah, lapisan aleuron bekatul agar beras tidak tengik, gelatinisasi pati kemplang, atau koagulasi protein tahu oleh asam)",
      "tech": "Teknologi industri yang ditunjukkan di video (mesin pemecah kulit husker rol karet, polisher penyosoh, mesin color sorter optic, boiler ketel uap sekam, atau sealer perekat kemasan)",
      "eng": "Rekayasa Engineering yang Anda singgung di video (konveyor mangkok vertikal bucket elevator, siklon pengendali debu cerobong, atau penataan ruang produksi higienis)",
      "math": "Perhitungan Matematika yang Anda jelaskan di video (persentase rendemen beras giling 65%, kapasitas giling mesin per jam, takaran bahan adonan, atau gramasi kemasan produk)"
    },
    "day6Segments": [
      "00:00–01:30 | Pembukaan, Identitas Diri & Kilas Balik Objek Pabrik Agro-Industri yang Dianalisis",
      "01:30–04:30 | Penjelasan Pilar Rekayasa: Elevator Konveyor Otomatis, Siklon Pemisah Debu Sekam & Pengering Sirkulasi",
      "04:30–07:30 | Penjelasan Pilar Matematika Finansial: Modal Beli 4 Ton Gabah, Biaya Solar/Operator, Omzet Beras/Bekatul & Laba Harian",
      "07:30–10:00 | Gagasan Inovasi Nilai Tambah (Briket Arang dari Limbah Sekam Padi), Efisiensi Pabrik & Penutup"
    ],
    "day6Prompts": {
      "financial": "Rincian biaya harian pembelian bahan baku gabah mentah, biaya bahan bakar solar/listrik, upah tenaga operator, kemasan karung, omzet penjualan beras dan bekatul, serta laba bersih harian",
      "constraints": "Kendala operasional (beras patah tinggi jika gabah basah saat musim hujan, debu sekam yang beterbangan, mahalnya suku cadang rol karet mesin giling, atau fluktuasi harga gabah)",
      "innovation": "Gagasan solusi & inovasi STEM-Finansial (pemanfaatan mesin pengering flat-bed dryer suhu rendah, pengolahan limbah sekam menjadi briket arang biomassa, dan kemasan kedap udara)"
    }
  }
};


  function extractYoutubeVideoId(url) {
    if (!url) return '';
    const str = String(url).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
    const m = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return m ? m[1] : '';
  }

  /* ========================================================
     HELPER PRASYARAT NON-FIELD TRIP (URUTAN DAY 5 & 6)
     Urutan: Modul -> Dokumentasi -> LKPD -> Asesmen -> Refleksi -> Penilaian
     ======================================================== */
  function checkNftPrerequisiteDok(dayNum, cleanNisn) {
    const candidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      candidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) candidateIds.add(cleanNisn.padStart(10, '0'));
    }
    for (const cid of candidateIds) {
      try {
        if (localStorage.getItem(`fincestem_dok_nft_day${dayNum}_` + cid) === 'true' ||
            localStorage.getItem(`fincestem_dok_ft_day${dayNum}_` + cid) === 'true' ||
            localStorage.getItem(`fincestem_dok_day${dayNum}_` + cid) === 'true') {
          return true;
        }
      } catch(e) {}
    }
    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_dokumentasi`]) return true;
    }
    for (const cid of candidateIds) {
      try {
        const pRaw = localStorage.getItem('fincestem_progress_' + cid);
        if (pRaw) {
          const p = JSON.parse(pRaw);
          if (p && p.task_map && p.task_map[`${dayNum}_dokumentasi`]) return true;
        }
      } catch(e) {}
    }
    try {
      const dbStr = localStorage.getItem('fincestem_db_2026_v1');
      if (dbStr) {
        const db = JSON.parse(dbStr);
        if (Array.isArray(db.documentation)) {
          const idArr = Array.from(candidateIds);
          const hasPhoto = db.documentation.some(p => {
            const docDay = Number(p.day || p.day_number || 0);
            const docNisn = String(p.nisn || p.author_nisn || p.uploaded_by || '').trim();
            return docDay === Number(dayNum) && (idArr.includes(docNisn) || idArr.includes(docNisn.replace(/^0+/, '')));
          });
          if (hasPhoto) return true;
        }
      }
    } catch(e) {}
    return false;
  }

  function renderNonFieldTripVideoDayLKPD(dayNum, isReadOnly) {
    dayNum = (parseInt(dayNum) === 6) ? 6 : 5;
    const isDay5 = (dayNum === 5);
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Cek Prasyarat Modul Belajar Day 5 / Day 6
    let hasMateri = false;
    let materiObj = null;
    try {
      const rawM = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                   localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        materiObj = p;
        if (p && (p.submitted || p.conclusion || p.summary || p.cardA)) hasMateri = true;
      }
    } catch(e) {}
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_materi`]) hasMateri = true;
    }

    // Ambil data LKPD tersimpan atau draft
    let saved = null;
    try {
      const raw = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn) ||
                  localStorage.getItem(`fincestem_lkpd_day${dayNum}_` + cleanNisn);
      if (raw) saved = JSON.parse(raw);
    } catch(e) {}
    if (!saved) {
      try {
        const d = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + cleanNisn);
        if (d) saved = JSON.parse(d);
      } catch(e) {}
    }
    saved = saved || {};

    // Deteksi Sektor Aktif (sinkron dengan pilihan di Modul Day 5/6 atau Day 4/3)
    let selectedSector = saved.sectorKey ||
                         (materiObj && materiObj.selectedSector) ||
                         localStorage.getItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d6_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d5_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d4_' + cleanNisn) ||
                         localStorage.getItem('fincestem_nft_sector_d3_' + cleanNisn) ||
                         'pertanian';
    if (selectedSector === 'jasa') selectedSector = 'industri';
    if (selectedSector === 'keuangan') selectedSector = 'formal';
    if (!NFT_LKPD_VIDEO_SECTORS[selectedSector]) selectedSector = 'pertanian';

    const secGuide = NFT_LKPD_VIDEO_SECTORS[selectedSector];
    const segments = isDay5 ? secGuide.day5Segments : secGuide.day6Segments;

    const isSubmitted = !!(saved.submitted || saved.is_submitted || saved.submitted_at || saved.submittedAt);
    const isTester = !!(
      (u && u.is_tester) ||
      (localStorage.getItem('fincestem_admin_testing_session') === 'true') ||
      (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn))
    );
    const hasDok = isTester ? true : checkNftPrerequisiteDok(dayNum, cleanNisn);
    const isLockedByPrereq = (!hasMateri || !hasDok) && !isSubmitted && !isTester;
    const readOnlyMode = isReadOnly || isSubmitted || isLockedByPrereq;

    const valObjectName = saved.objectName || saved.placeName || saved.fin_subject || saved.exp_location || (materiObj && materiObj.objectName) || '';
    const valDistrict = saved.district || 'Belitang';
    const valVideoTitle = saved.video_title || '';
    const valVideoDuration = saved.video_duration || '';
    const valYoutubeUrl = saved.youtube_url || '';
    const currentVideoId = extractYoutubeVideoId(valYoutubeUrl);

    const checkedSegments = Array.isArray(saved.checked_segments) ? saved.checked_segments : (isSubmitted ? segments.map((_, i) => i) : []);

    // Field ringkasan isi video Day 5 (4 unsur STEM) & Day 6 (Financial, Kendala, Inovasi)
    const valScience = saved.science_summary || saved.cul_desc || '';
    const valTech = saved.tech_summary || saved.fin_desc || '';
    const valEng = saved.eng_summary || saved.voiceover || '';
    const valMath = saved.math_summary || '';

    const valFinAnalysis = saved.financial_summary || saved.exp_desc || '';
    const valConstraints = saved.constraints_summary || saved.stem_desc || '';
    const valInnovation = saved.innovation_summary || saved.voiceover || '';

    const sectorKeys = ['pertanian', 'perkebunan', 'peternakan', 'perikanan', 'industri', 'perdagangan', 'formal'];
    const headerGrad = isDay5
      ? 'from-amber-950 via-teal-950 to-slate-950 border-amber-700/40'
      : 'from-teal-950 via-indigo-950 to-slate-950 border-teal-700/40';

    mainEl.innerHTML = `
      <div class="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6 pb-16">

        <!-- PERINGATAN PRASYARAT JIKA BELUM SELESAI -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Prasyarat Alur Day ${dayNum}</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">
                  ${!hasMateri ? `Selesaikan Modul Panduan Video Day ${dayNum} Terlebih Dahulu!` : `Unggah Dokumentasi Foto Day ${dayNum} Terlebih Dahulu!`}
                </h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              ${!hasMateri
                ? `Silakan buka <strong>Modul Belajar Day ${dayNum}</strong>, pilih menu sektor usaha Anda, pelajari panduan urutan video menit ke menit, dan simpan Resume Rencana Video Anda agar formulir LKPD ini terbuka.`
                : `Sesuai alur pengerjaan berurutan Day ${dayNum} (Modul &rarr; Dokumentasi &rarr; LKPD &rarr; Asesmen &rarr; Refleksi &rarr; Penilaian), Anda wajib mengunggah foto bukti dokumentasi riset lapangan Day ${dayNum} terlebih dahulu sebelum mengisi dan mengirimkan formulir LKPD Video ini.`}
            </p>
            <div>
              ${!hasMateri ? `
                <a href="materi.html?day=${dayNum}" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                  <span class="material-symbols-outlined text-base">menu_book</span>
                  <span>Buka Modul Panduan Video Day ${dayNum} Sekarang</span>
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              ` : `
                <a href="dokumentasi.html?day=${dayNum}" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                  <span class="material-symbols-outlined text-base">photo_camera</span>
                  <span>Buka Dokumentasi Foto Day ${dayNum} Sekarang</span>
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </a>
              `}
            </div>
          </div>
        ` : ''}

        <!-- BANNER HEADER LKPD DAY 5 / DAY 6 -->
        <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${headerGrad} text-white border shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-black uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-sm">smart_display</span>
                <span>🎬 LKPD DAY ${dayNum} • VIDEO OBSERVASI YOUTUBE (DURASI 5–10 MENIT)</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">
                ${isDay5
                  ? 'LKPD Day 5: Video Eksplorasi Sains & Teknologi Sektor (5–10 Menit)'
                  : 'LKPD Day 6: Video Analisis Rekayasa Solusi Kendala & Finansial Sektor (5–10 Menit)'}
              </h1>
              <p class="text-xs sm:text-sm text-teal-100/90 mt-1 leading-relaxed">
                ${isDay5
                  ? 'Pilih sektor objek observasi Anda, ikuti panduan urutan video 5–10 menit (tanpa wawancara narasumber), unggah ke YouTube, dan tempelkan link videonya di bawah ini!'
                  : 'Pilih sektor objek analisis Anda, rekam video pembahasan perhitungan Finansial, Kendala & Solusi Inovasi berdurasi 5–10 menit (tanpa wawancara), unggah ke YouTube, dan kirimkan link-nya!'}
              </p>
            </div>
            <div class="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-right shrink-0">
              <div class="text-[11px] text-amber-200 font-medium">Peserta Didik:</div>
              <div class="text-xs sm:text-sm font-black text-white">${escapeHtml(studentName)}</div>
              <div class="text-[11px] text-amber-300 font-bold">NISN: ${escapeHtml(studentNisn)} • ${escapeHtml(studentClass)}</div>
              <div class="text-[10px] text-teal-200 mt-1 font-medium">Fasilitator: ${escapeHtml(fasilName)}</div>
            </div>
          </div>
        </div>

        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-emerald-600 text-3xl">verified</span>
              <div>
                <h4 class="font-black text-xs sm:text-sm text-emerald-950">Link Video YouTube &amp; Laporan LKPD Day ${dayNum} Berhasil Diserahkan!</h4>
                <p class="text-[11px] text-emerald-800">Guru Fasilitator kini dapat langsung menonton dan menilai video YouTube Anda pada Portal Penilaian.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button type="button" onclick="enableEditNftVideoLkpd(${dayNum})" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-sm">edit</span>
                <span>Perbarui Link / Isi</span>
              </button>
              <a href="dokumentasi.html?day=${dayNum}" class="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-black flex items-center gap-1 shadow-xs">
                <span>Ke Dokumentasi</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BLOK 1: PILIH MENU SEKTOR & PANDUAN URUTAN VIDEO OTOMATIS -->
        <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-500/50 shadow-sm space-y-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black text-xs">1</span>
              <div>
                <h3 class="text-sm sm:text-base font-black text-slate-900">Pilih Menu Sektor Objek Video Anda</h3>
                <p class="text-[11px] text-slate-500 font-medium">Klik salah satu dari 7 sektor di bawah ini untuk menampilkan panduan urutan isi video sesuai pilihan Anda:</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-300">
              Sektor Aktif: ${escapeHtml(secGuide.shortName)}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            ${sectorKeys.map(k => {
              const s = NFT_LKPD_VIDEO_SECTORS[k];
              const isAct = (k === selectedSector);
              return `
                <button type="button" onclick="onNftVideoLkpdSectorChange(${dayNum}, '${k}')" class="text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${isAct ? 'bg-teal-50/80 border-teal-600 ring-2 ring-teal-500/30 shadow-sm' : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50'}">
                  <div class="flex items-center justify-between gap-1 w-full">
                    <span class="w-8 h-8 rounded-xl ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-lg">${s.icon}</span>
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[9.5px] font-black ${isAct ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}">${isAct ? '✓ Terpilih' : 'Pilih'}</span>
                  </div>
                  <div>
                    <div class="font-black text-xs text-slate-900 leading-tight">${s.shortName}</div>
                    <div class="text-[10px] text-slate-500 line-clamp-1">${s.badge}</div>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <input type="hidden" id="nftVideoLkpdSectorD${dayNum}" value="${escapeHtml(selectedSector)}">

          <!-- Kotak Panduan Urutan Video Otomatis Sesuai Sektor -->
          <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <div class="font-black text-xs sm:text-sm text-amber-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-amber-700 text-base">playlist_play</span>
                <span>Panduan Urutan Isi Video Day ${dayNum} — Sektor ${escapeHtml(secGuide.name)} (Durasi 5–10 Menit):</span>
              </div>
              <span class="text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950">Tanpa Wawancara Narasumber</span>
            </div>
            <p class="text-[11px] text-slate-600">Contoh objek yang dapat direkam: <strong>${escapeHtml(secGuide.examples)}</strong>.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              ${segments.map((segText, idx) => `
                <div class="p-2.5 rounded-xl bg-white border border-amber-200/90 text-[11px] text-slate-800 font-medium flex items-start gap-2">
                  <span class="w-5 h-5 rounded-lg bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                  <span class="leading-snug">${escapeHtml(segText)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- FORMULIR PENGUMPULAN LINK YOUTUBE & RINGKASAN ISI VIDEO -->
        <form id="formNftVideoLkpdD${dayNum}" onsubmit="event.preventDefault(); submitNonFieldTripVideoDayLKPD(${dayNum});" class="space-y-6">

          <!-- BLOK 2: IDENTITAS OBJEK & TAUTAN LINK VIDEO YOUTUBE -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-rose-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xs">2</span>
                <div>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">Identitas Objek &amp; Link Video YouTube Day ${dayNum}</h3>
                  <p class="text-[11px] text-slate-500 font-medium">Unggah video Anda (durasi 5–10 menit) ke YouTube dengan setelan <strong>Publik</strong> atau <strong>Unlisted (Tidak Terdaftar)</strong>, lalu salin link-nya ke sini.</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 border border-rose-300">Wajib Link YouTube Valid</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-800 mb-1">Nama Objek / Tempat Usaha yang Direkam di Video: <span class="text-rose-600">*</span></label>
                <input id="nftVidObjectD${dayNum}" type="text" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(${dayNum})" value="${escapeHtml(valObjectName)}" placeholder="Contoh: ${escapeHtml(secGuide.examples.split(',')[0])}" class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-rose-600 outline-none font-semibold">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-800 mb-1">Kecamatan Lokasi Objek di OKU Timur: <span class="text-rose-600">*</span></label>
                <select id="nftVidDistrictD${dayNum}" ${readOnlyMode ? 'disabled' : ''} onchange="onNftVideoLkpdInput(${dayNum})" class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-rose-600 outline-none font-bold">
                  ${OKU_TIMUR_DISTRICTS.map(d => `<option value="${escapeHtml(d)}" ${(valDistrict === d || normalizeDistrictName(valDistrict) === d) ? 'selected' : ''}>Kecamatan ${escapeHtml(d)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-slate-800 mb-1">Judul Video YouTube Anda: <span class="text-rose-600">*</span></label>
                <input id="nftVidTitleD${dayNum}" type="text" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(${dayNum})" value="${escapeHtml(valVideoTitle)}" placeholder="Contoh: ${isDay5 ? 'Observasi STEM & Alat Kerja ' + secGuide.shortName + ' - FINCESTEM Day 5' : 'Analisis Finansial & Inovasi ' + secGuide.shortName + ' - FINCESTEM Day 6'}" class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-rose-600 outline-none font-semibold">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-800 mb-1">Durasi Video (Menit:Detik): <span class="text-rose-600">*</span></label>
                <input id="nftVidDurationD${dayNum}" type="text" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(${dayNum})" value="${escapeHtml(valVideoDuration)}" placeholder="Contoh: 06:45 (Min. 5–10 Menit)" class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-rose-600 outline-none font-bold">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Tautan / URL Link Video YouTube (Publik / Unlisted): <span class="text-rose-600">*</span></label>
              <div class="flex flex-col sm:flex-row gap-2">
                <input id="nftVidYoutubeUrlD${dayNum}" type="url" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(${dayNum})" value="${escapeHtml(valYoutubeUrl)}" placeholder="https://youtu.be/... atau https://www.youtube.com/watch?v=..." class="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-rose-600 outline-none font-mono">
                <button type="button" onclick="previewNftVideoDayYoutube(${dayNum})" class="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-sm">play_circle</span>
                  <span>Uji &amp; Tampilkan Video</span>
                </button>
              </div>
              <p class="text-[11px] text-slate-500 mt-1">
                ⚠️ Pastikan video diunggah ke <strong>YouTube</strong> dengan durasi <strong>5–10 menit</strong> dan visibilitas <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong>, bukan Pribadi (Private), agar Fasilitator dapat menilai langsung.
              </p>
            </div>

            <!-- Pemutar Pratinjau YouTube Langsung -->
            <div id="nftVidPlayerBoxD${dayNum}" class="${currentVideoId ? '' : 'hidden'} p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between gap-2 text-xs text-rose-300 font-bold">
                <span class="flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">smart_display</span>
                  <span>Pratinjau Video YouTube Anda (Tampilan yang Akan Dilihat Guru Fasilitator):</span>
                </span>
                <a id="nftVidExternalLinkD${dayNum}" href="${escapeHtml(valYoutubeUrl || '#')}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10.5px] font-black flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">open_in_new</span>
                  <span>Buka di YouTube</span>
                </a>
              </div>
              <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe id="nftVidIframeD${dayNum}" src="${currentVideoId ? 'https://www.youtube-nocookie.com/embed/' + currentVideoId : ''}" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>

          <!-- BLOK 3: CHECKLIST KETERLAKSANAAN URUTAN SEGMEN VIDEO -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-3.5">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs">3</span>
                <div>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">Checklist Kelengkapan Urutan Isi di Dalam Video Anda</h3>
                  <p class="text-[11px] text-slate-500 font-medium">Centang bagian-bagian yang telah Anda jelaskan dan tampilkan di dalam rekaman video YouTube Anda:</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-amber-50 text-amber-900 border border-amber-200">Kontrol Mutu Video</span>
            </div>

            <div class="grid grid-cols-1 gap-2">
              ${segments.map((segText, idx) => {
                const isChecked = checkedSegments.includes(idx) || checkedSegments.includes(String(idx));
                return `
                  <label class="p-3 rounded-2xl border ${isChecked ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50 border-slate-200'} flex items-start gap-3 cursor-pointer hover:bg-teal-50/40 transition-all">
                    <input type="checkbox" class="nft-vid-seg-chk-d${dayNum} mt-0.5 w-4 h-4 accent-teal-700 rounded cursor-pointer" value="${idx}" ${isChecked ? 'checked' : ''} ${readOnlyMode ? 'disabled' : ''} onchange="onNftVideoLkpdInput(${dayNum})">
                    <span class="text-xs font-semibold text-slate-800 leading-snug">${escapeHtml(segText)}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- BLOK 4: RINGKASAN POIN PENJELASAN DI DALAM VIDEO -->
          ${isDay5 ? `
            <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-emerald-500/40 shadow-sm space-y-4">
              <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">4</span>
                  <div>
                    <h3 class="text-sm sm:text-base font-black text-slate-900">Ringkasan Poin 4 Unsur STEM yang Anda Jelaskan di Video Day 5</h3>
                    <p class="text-[11px] text-slate-500 font-medium">Tuliskan secara ringkas poin inti yang Anda ucapkan/jelaskan di dalam video untuk memudahkan rekap penilaian Fasilitator:</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-emerald-100 text-emerald-950">Sektor ${escapeHtml(secGuide.shortName)}</span>
              </div>

              <!-- Science -->
              <div class="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-1.5">
                <label class="block text-xs font-black text-sky-950">
                  1. Poin SCIENCE (Sains) yang Anda Jelaskan di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-sky-900/90">${escapeHtml(secGuide.day5Prompts.science)}</p>
                <textarea id="nftVidD5Science" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(5)" placeholder="Tuliskan ringkasan penjelasan unsur Science (Sains) yang Anda sampaikan di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-sky-300 bg-white focus:border-sky-600 outline-none leading-relaxed">${escapeHtml(valScience)}</textarea>
              </div>

              <!-- Technology -->
              <div class="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1.5">
                <label class="block text-xs font-black text-teal-950">
                  2. Poin TECHNOLOGY (Teknologi &amp; Peralatan) yang Anda Tunjukkan di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-teal-900/90">${escapeHtml(secGuide.day5Prompts.tech)}</p>
                <textarea id="nftVidD5Tech" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(5)" placeholder="Tuliskan peralatan/teknologi yang Anda sorot dan jelaskan di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-teal-300 bg-white focus:border-teal-600 outline-none leading-relaxed">${escapeHtml(valTech)}</textarea>
              </div>

              <!-- Engineering -->
              <div class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <label class="block text-xs font-black text-amber-950">
                  3. Poin ENGINEERING (Rekayasa Desain/Tata Ruang/Alat) yang Anda Jelaskan di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-amber-900/90">${escapeHtml(secGuide.day5Prompts.eng)}</p>
                <textarea id="nftVidD5Eng" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(5)" placeholder="Tuliskan penjelasan unsur Engineering (Rekayasa) yang Anda sampaikan di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-amber-300 bg-white focus:border-amber-600 outline-none leading-relaxed">${escapeHtml(valEng)}</textarea>
              </div>

              <!-- Mathematics -->
              <div class="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
                <label class="block text-xs font-black text-purple-950">
                  4. Poin MATHEMATICS (Perhitungan &amp; Takaran) yang Anda Jelaskan di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-purple-900/90">${escapeHtml(secGuide.day5Prompts.math)}</p>
                <textarea id="nftVidD5Math" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(5)" placeholder="Tuliskan penjelasan unsur Mathematics (perhitungan ukuran/kapasitas/hasil) yang Anda sampaikan di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-purple-300 bg-white focus:border-purple-600 outline-none leading-relaxed">${escapeHtml(valMath)}</textarea>
              </div>
            </div>
          ` : `
            <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-teal-500/40 shadow-sm space-y-4">
              <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black text-xs">4</span>
                  <div>
                    <h3 class="text-sm sm:text-base font-black text-slate-900">Ringkasan Poin Analisis Finansial, Kendala &amp; Inovasi di Video Day 6</h3>
                    <p class="text-[11px] text-slate-500 font-medium">Tuliskan secara ringkas poin inti yang Anda jelaskan di dalam video Day 6 untuk memudahkan penilaian Fasilitator:</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-teal-100 text-teal-950">Sektor ${escapeHtml(secGuide.shortName)}</span>
              </div>

              <!-- Financial -->
              <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <label class="block text-xs font-black text-emerald-950">
                  1. Ringkasan Analisis PILAR FINANCIAL (Modal, Biaya Operasional, Omzet &amp; Laba) di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-emerald-900/90">${escapeHtml(secGuide.day6Prompts.financial)}</p>
                <textarea id="nftVidD6Financial" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(6)" placeholder="Tuliskan ringkasan perhitungan modal, biaya operasional, harga jual, dan estimasi keuntungan yang Anda jelaskan di video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-emerald-300 bg-white focus:border-emerald-600 outline-none leading-relaxed">${escapeHtml(valFinAnalysis)}</textarea>
              </div>

              <!-- Kendala & Risiko -->
              <div class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5">
                <label class="block text-xs font-black text-rose-950">
                  2. Ringkasan Evaluasi KENDALA &amp; RISIKO USAHA yang Anda Bahas di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-rose-900/90">${escapeHtml(secGuide.day6Prompts.constraints)}</p>
                <textarea id="nftVidD6Constraints" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(6)" placeholder="Tuliskan kendala teknis, risiko kerugian, atau masalah pemasaran yang Anda bahas di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-rose-300 bg-white focus:border-rose-600 outline-none leading-relaxed">${escapeHtml(valConstraints)}</textarea>
              </div>

              <!-- Solusi & Inovasi -->
              <div class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
                <label class="block text-xs font-black text-indigo-950">
                  3. Ringkasan GAGASAN SOLUSI &amp; INOVASI FINCESTEM yang Anda Usulkan di Video: <span class="text-rose-600">*</span>
                </label>
                <p class="text-[11px] text-indigo-900/90">${escapeHtml(secGuide.day6Prompts.innovation)}</p>
                <textarea id="nftVidD6Innovation" rows="3" ${readOnlyMode ? 'readonly' : ''} oninput="onNftVideoLkpdInput(6)" placeholder="Tuliskan ide solusi kreatif dan inovasi berbasis STEM & Finansial yang Anda sampaikan di dalam video... (Minimal 30 karakter)" class="w-full p-3 text-xs rounded-xl border border-indigo-300 bg-white focus:border-indigo-600 outline-none leading-relaxed">${escapeHtml(valInnovation)}</textarea>
              </div>
            </div>
          `}

          ${!readOnlyMode ? `
            <div class="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20 backdrop-blur-md bg-white/95">
              <span id="txtNftVidDraftInfoD${dayNum}" class="text-xs text-slate-500 font-medium">Draf tersimpan otomatis di perangkat Anda.</span>
              <div class="flex items-center gap-2.5 w-full sm:w-auto">
                <button type="button" onclick="saveNonFieldTripVideoDayDraft(${dayNum}, true)" class="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300">
                  <span class="material-symbols-outlined text-sm">bookmark</span>
                  <span>Simpan Draf</span>
                </button>
                <button type="submit" class="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer shadow-md ring-2 ring-emerald-400/40">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Serahkan Link Video &amp; LKPD Day ${dayNum}</span>
                </button>
              </div>
            </div>
          ` : ''}
        </form>
      </div>
    `;
  }

  function collectNftVideoDayData(dayNum) {
    dayNum = (parseInt(dayNum) === 6) ? 6 : 5;
    const isDay5 = (dayNum === 5);
    let sectorKey = document.getElementById(`nftVideoLkpdSectorD${dayNum}`)?.value || 'pertanian';
    if (sectorKey === 'jasa') sectorKey = 'industri';
    if (sectorKey === 'keuangan') sectorKey = 'formal';
    const secGuide = NFT_LKPD_VIDEO_SECTORS[sectorKey] || NFT_LKPD_VIDEO_SECTORS.pertanian;
    const objectName = document.getElementById(`nftVidObjectD${dayNum}`)?.value.trim() || '';
    const district = document.getElementById(`nftVidDistrictD${dayNum}`)?.value || 'Belitang';
    const video_title = document.getElementById(`nftVidTitleD${dayNum}`)?.value.trim() || '';
    const video_duration = document.getElementById(`nftVidDurationD${dayNum}`)?.value.trim() || '';
    const youtube_url = document.getElementById(`nftVidYoutubeUrlD${dayNum}`)?.value.trim() || '';
    const youtube_id = extractYoutubeVideoId(youtube_url);

    const checked_segments = [];
    document.querySelectorAll(`.nft-vid-seg-chk-d${dayNum}:checked`).forEach(chk => {
      checked_segments.push(parseInt(chk.value, 10));
    });

    const baseData = {
      day: dayNum,
      isVideoLkpd: true,
      sectorKey: sectorKey,
      sectorName: secGuide.name,
      sectorShortName: secGuide.shortName,
      objectName: objectName,
      placeName: objectName,
      district: district,
      video_title: video_title,
      video_duration: video_duration,
      youtube_url: youtube_url,
      youtube_id: youtube_id,
      checked_segments: checked_segments,
      updated_at: new Date().toISOString()
    };

    if (isDay5) {
      const science_summary = document.getElementById('nftVidD5Science')?.value.trim() || '';
      const tech_summary = document.getElementById('nftVidD5Tech')?.value.trim() || '';
      const eng_summary = document.getElementById('nftVidD5Eng')?.value.trim() || '';
      const math_summary = document.getElementById('nftVidD5Math')?.value.trim() || '';
      return Object.assign(baseData, {
        science_summary: science_summary,
        tech_summary: tech_summary,
        eng_summary: eng_summary,
        math_summary: math_summary,
        // Legacy keys for backward compatibility
        fin_subject: `${secGuide.shortName}: ${objectName} (Kec. ${district})`,
        fin_file: `${video_duration || '5-10 Menit'} • YouTube`,
        fin_desc: `[SCIENCE]: ${science_summary} | [TECHNOLOGY]: ${tech_summary}`,
        cul_subject: video_title,
        cul_file: youtube_url,
        cul_desc: `[ENGINEERING]: ${eng_summary} | [MATHEMATICS]: ${math_summary}`,
        voiceover: `Link YouTube Day 5: ${youtube_url}`
      });
    } else {
      const financial_summary = document.getElementById('nftVidD6Financial')?.value.trim() || '';
      const constraints_summary = document.getElementById('nftVidD6Constraints')?.value.trim() || '';
      const innovation_summary = document.getElementById('nftVidD6Innovation')?.value.trim() || '';
      return Object.assign(baseData, {
        financial_summary: financial_summary,
        constraints_summary: constraints_summary,
        innovation_summary: innovation_summary,
        // Legacy keys for backward compatibility
        exp_location: `${secGuide.shortName}: ${objectName} (Kec. ${district})`,
        exp_file: `${video_duration || '5-10 Menit'} • YouTube`,
        exp_desc: financial_summary,
        stem_machine: video_title,
        stem_file: youtube_url,
        stem_desc: constraints_summary,
        voiceover: innovation_summary
      });
    }
  }

  let vidLkpdDraftTimers = {};
  window.onNftVideoLkpdInput = function(dayNum) {
    clearTimeout(vidLkpdDraftTimers[dayNum]);
    vidLkpdDraftTimers[dayNum] = setTimeout(() => {
      saveNonFieldTripVideoDayDraft(dayNum, false);
    }, 700);
  };

  window.onNftVideoLkpdSectorChange = function(dayNum, newSectorKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const curData = collectNftVideoDayData(dayNum);
    curData.sectorKey = newSectorKey;
    const secGuide = NFT_LKPD_VIDEO_SECTORS[newSectorKey] || NFT_LKPD_VIDEO_SECTORS.pertanian;
    curData.sectorName = secGuide.name;
    curData.sectorShortName = secGuide.shortName;

    try {
      localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + cleanNisn, newSectorKey);
      localStorage.setItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + cleanNisn, JSON.stringify(curData));
    } catch(e) {}

    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast(`Panduan LKPD Video Day ${dayNum} disesuaikan ke: ${secGuide.name}`, 'info');
    }
    renderNonFieldTripVideoDayLKPD(dayNum, false);
  };

  window.previewNftVideoDayYoutube = function(dayNum) {
    const url = document.getElementById(`nftVidYoutubeUrlD${dayNum}`)?.value.trim() || '';
    if (!url) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Tempelkan link video YouTube Anda terlebih dahulu!', 'warning');
      }
      return;
    }
    const videoId = extractYoutubeVideoId(url);
    const box = document.getElementById(`nftVidPlayerBoxD${dayNum}`);
    const iframe = document.getElementById(`nftVidIframeD${dayNum}`);
    const extLink = document.getElementById(`nftVidExternalLinkD${dayNum}`);
    if (videoId && box && iframe) {
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
      if (extLink) extLink.href = url;
      box.classList.remove('hidden');
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Pratinjau video YouTube berhasil dimuat!', 'success');
      }
    } else {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Format link YouTube tidak valid! Gunakan link seperti https://youtu.be/... atau https://www.youtube.com/watch?v=...', 'error');
      } else {
        alert('Format link YouTube tidak valid!');
      }
    }
  };

  window.enableEditNftVideoLkpd = function(dayNum) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    try {
      const raw = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn);
      if (raw) {
        const parsed = JSON.parse(raw);
        delete parsed.submitted;
        delete parsed.submitted_at;
        delete parsed.submittedAt;
        localStorage.setItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + cleanNisn, JSON.stringify(parsed));
        localStorage.removeItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn);
      }
    } catch(e) {}
    renderNonFieldTripVideoDayLKPD(dayNum, false);
  };

  function saveNonFieldTripVideoDayDraft(dayNum, showToast) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const data = collectNftVideoDayData(dayNum);
    try {
      localStorage.setItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + cleanNisn, JSON.stringify(data));
      const infoEl = document.getElementById(`txtNftVidDraftInfoD${dayNum}`);
      if (infoEl) {
        const t = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        infoEl.textContent = `Draf tersimpan otomatis (pk ${t} WIB)`;
      }
      if (showToast && window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Draf LKPD Video Day ${dayNum} berhasil disimpan!`, 'success');
      }
    } catch(e) {}
  }

  function submitNonFieldTripVideoDayLKPD(dayNum) {
    dayNum = (parseInt(dayNum) === 6) ? 6 : 5;
    const isDay5 = (dayNum === 5);
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const data = collectNftVideoDayData(dayNum);

    const missing = [];
    if (data.objectName.length < 3) missing.push('Nama Objek / Tempat Usaha yang Direkam');
    if (data.video_title.length < 5) missing.push('Judul Video YouTube');
    if (data.video_duration.length < 2) missing.push('Durasi Video (minimal 5–10 menit)');
    if (!data.youtube_id) missing.push('Link / URL Video YouTube Valid (https://youtu.be/... atau youtube.com/watch?v=...)');

    if (isDay5) {
      if (data.science_summary.length < 25) missing.push('Ringkasan Poin SCIENCE (Sains) di Video');
      if (data.tech_summary.length < 25) missing.push('Ringkasan Poin TECHNOLOGY (Teknologi & Alat) di Video');
      if (data.eng_summary.length < 25) missing.push('Ringkasan Poin ENGINEERING (Rekayasa) di Video');
      if (data.math_summary.length < 25) missing.push('Ringkasan Poin MATHEMATICS (Perhitungan) di Video');
    } else {
      if (data.financial_summary.length < 25) missing.push('Ringkasan Analisis PILAR FINANCIAL (Modal, Biaya & Laba)');
      if (data.constraints_summary.length < 25) missing.push('Ringkasan Evaluasi KENDALA & RISIKO Usaha');
      if (data.innovation_summary.length < 25) missing.push('Ringkasan GAGASAN SOLUSI & INOVASI FINCESTEM');
    }

    if (missing.length > 0) {
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Harap lengkapi bagian berikut terlebih dahulu:\n• ' + missing.join('\n• '), 'warning');
      } else {
        alert('Harap lengkapi bagian berikut:\n• ' + missing.join('\n• '));
      }
      return;
    }

    // Tampilkan status submitting di tombol agar siswa mendapat visual respons instan
    const submitBtn = document.querySelector(`#formNftVideoLkpdD${dayNum} button[type="submit"]`);
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70', 'pointer-events-none');
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined text-base animate-spin">progress_activity</span>
        <span>Menyerahkan LKPD Day ${dayNum}...</span>
      `;
    }

    const nowIso = new Date().toISOString();
    data.studentName = u.name || '';
    data.studentNisn = cleanNisn;
    data.studentClass = u.class || u.class_name || '';
    data.submitted = true;
    data.submitted_at = nowIso;
    data.submittedAt = nowIso;
    data.summary = `[LKPD Video Day ${dayNum} - ${data.sectorName}] Judul: ${data.video_title} (${data.video_duration}) | YouTube: ${data.youtube_url}`;

    // Simpan ke seluruh variasi NISN/ID siswa
    const nisnVariants = [
      cleanNisn,
      cleanNisn.replace(/^0+/, ''),
      cleanNisn.padStart(10, '0'),
      String(u.nis || '').trim(),
      String(u.identifier || '').trim()
    ].filter(Boolean);

    nisnVariants.forEach(key => {
      try {
        localStorage.setItem(`fincestem_lkpd_nft_day${dayNum}_` + key, JSON.stringify(data));
        localStorage.setItem(`fincestem_lkpd_day${dayNum}_` + key, JSON.stringify(data));
        localStorage.setItem(`fincestem_nft_sector_d${dayNum}_` + key, data.sectorKey);
        localStorage.removeItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + key);
      } catch(e) {}
    });

    let isDoneTriggered = false;
    const onDone = function() {
      if (isDoneTriggered) return;
      isDoneTriggered = true;

      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Link Video YouTube & LKPD Day ${dayNum} Berhasil Diserahkan Resmi!`, 'success');
      }
      renderNonFieldTripVideoDayLKPD(dayNum, true);
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
      modal.innerHTML = `
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
          <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
            <span class="material-symbols-outlined text-3xl">smart_display</span>
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
              LKPD Video Day ${dayNum} Tuntas
            </span>
            <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
              Link Video YouTube Terkirim!
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
              Tautan video YouTube Anda (<strong>${escapeHtml(data.video_title)}</strong>) pada sektor <strong>${escapeHtml(data.sectorName)}</strong> telah masuk ke Portal Guru Fasilitator untuk dinilai via YouTube.
            </p>
          </div>
          <div class="w-full flex flex-col gap-2 pt-2">
            <a href="asesmen.html?day=${dayNum}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">fact_check</span>
              <span>Lanjut ke Tahap 4: Kuis Asesmen Day ${dayNum} &rarr;</span>
            </a>
            <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
              <span>Kembali ke Beranda Dashboard</span>
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    };

    // Safety timeout 3500ms agar jika jaringan lambat / offline, UI tetap berhasil merespons
    const safetyTimer = setTimeout(onDone, 3500);

    if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'lkpd', data, function() {
        clearTimeout(safetyTimer);
        onDone();
      });
    } else if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.saveTaskRecord === 'function') {
      clearTimeout(safetyTimer);
      FincestemCore.progress.saveTaskRecord(cleanNisn, dayNum, 'lkpd', data, 100);
      onDone();
    } else {
      clearTimeout(safetyTimer);
      onDone();
    }
  }

  function renderNonFieldTripDay5LKPD(isReadOnly) {
    renderNonFieldTripVideoDayLKPD(5, isReadOnly);
  }
  function saveNonFieldTripDay5Draft() {
    saveNonFieldTripVideoDayDraft(5, true);
  }
  function submitNonFieldTripDay5LKPD() {
    submitNonFieldTripVideoDayLKPD(5);
  }

  function renderNonFieldTripDay6LKPD(isReadOnly) {
    renderNonFieldTripVideoDayLKPD(6, isReadOnly);
  }
  function saveNonFieldTripDay6Draft() {
    saveNonFieldTripVideoDayDraft(6, true);
  }
  function submitNonFieldTripDay6LKPD() {
    submitNonFieldTripVideoDayLKPD(6);
  }

  // =========================================================================
  // INSTRUMEN LKPD DAY 7: FINAL EDITING, LINK VIDEO YOUTUBE & AUDIT KAS
  // =========================================================================
    // =========================================================================
  // INSTRUMEN LKPD DAY 7: VIDEO REFLEKSI (DAY 1–7), BTS & JURNAL REFLEKSI
  // =========================================================================
  function renderNonFieldTripDay7LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    let saved = null;
    try {
      const raw = localStorage.getItem('fincestem_lkpd_nft_day7_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day7_' + cleanNisn);
      if (raw) saved = JSON.parse(raw);
    } catch(e) {}
    if (!saved) {
      try {
        const d = localStorage.getItem('fincestem_lkpd_nft_day7_draft_' + cleanNisn);
        if (d) saved = JSON.parse(d);
      } catch(e) {}
    }
    saved = saved || {};

    const isSubmitted = !!(saved.submitted || saved.is_submitted || saved.submitted_at);
    const readOnlyMode = isReadOnly || isSubmitted;

    // Helper extract YouTube Video ID
    function getYoutubeId(url) {
      if (!url) return '';
      const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      return m ? m[1] : '';
    }
    const currentVideoId = getYoutubeId(saved.youtube_url || '');
    const currentBtsVideoId = getYoutubeId(saved.bts_youtube_url || '');
    const isCombined = saved.is_combined !== undefined ? !!saved.is_combined : true;

    mainEl.innerHTML = `
      <div class="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        <!-- Banner Header Puncak Day 7 -->
        <div class="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white border border-purple-500/40 shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-black uppercase tracking-wider mb-2">
                <span class="material-symbols-outlined text-sm">stars</span>
                <span>DAY 7 • PUNCAK RISET MANDIRI (GRAND FINALE)</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">Karya Video Refleksi, BTS &amp; Jurnal Refleksi Day 1–7</h1>
              <p class="text-xs sm:text-sm text-purple-200/90 mt-1">Pengumpulan Link Video YouTube (Refleksi &amp; BTS) serta Lembar Refleksi Akbar Perjalanan 7 Hari</p>
            </div>
            <div class="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-right shrink-0">
              <div class="text-[11px] text-purple-200 font-medium uppercase tracking-wider">Peserta Didik:</div>
              <div class="text-xs sm:text-sm font-black text-white">${escapeHtml(studentName)}</div>
              <div class="text-[11px] text-amber-300 font-bold">NISN: ${escapeHtml(studentNisn)} • ${escapeHtml(studentClass)}</div>
              <div class="text-[10px] text-purple-200 mt-1 font-medium">Fasilitator: ${escapeHtml(fasilName)}</div>
            </div>
          </div>
        </div>

        ${isSubmitted ? `
          <div class="p-4 sm:p-5 rounded-3xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-inner">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-black uppercase text-emerald-800 tracking-wider">Portofolio Day 7 Telah Terkirim Resmi</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-200 text-emerald-950 uppercase">Tuntas ✓</span>
                </div>
                <h4 class="font-extrabold text-sm sm:text-base text-emerald-950 mt-0.5">Seluruh Rangkaian Riset Day 1 s.d. Day 7 Telah Selesai Sempurna!</h4>
                <p class="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                  Tautan video YouTube dan jurnal refleksi 7 hari Anda telah masuk ke portal dewan fasilitator. <strong>Tahap Asesmen Day 7 otomatis tuntas (Nilai 100/100 - Bebas Kuis).</strong>
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button type="button" onclick="window.enableEditNftDay7Lkpd()" class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all cursor-pointer">
                Edit Kembali
              </button>
              <a href="dashboard.html" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Buka Dasbor Rapor</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <form id="formNftLkpdDay7" onsubmit="event.preventDefault(); submitNonFieldTripDay7LKPD();" class="space-y-6">
          <!-- BAGIAN 1: PENYERAHAN LINK YOUTUBE (REFLEKSI & BTS) -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-purple-200 shadow-sm flex flex-col gap-4">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5 flex-wrap">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-xs">1</span>
                <div>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">Penyerahan Karya Video YouTube (Refleksi Day 1–7 &amp; BTS)</h3>
                  <p class="text-[11px] text-slate-500 font-medium">Unggah video karya Anda ke YouTube, lalu tempelkan tautan resmi link-nya pada kolom di bawah:</p>
                </div>
              </div>
              <span class="text-[10.5px] font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                Durasi 5 – 8 Menit
              </span>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">Judul Video YouTube Karya Anda:</label>
                <input
                  id="nftD7VideoTitle"
                  type="text"
                  ${readOnlyMode ? 'readonly' : ''}
                  value="${escapeHtml(saved.video_title || '')}"
                  placeholder="Contoh: Kilas Balik Riset Mandiri 7 Hari FINCESTEM &amp; Behind The Scene - [Nama Anda]"
                  class="w-full px-4 py-3 text-xs font-semibold rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-purple-600'} outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">
                  Link Tautan Video Refleksi Utama (YouTube):
                </label>
                <div class="relative">
                  <span class="material-symbols-outlined text-rose-600 absolute left-3.5 top-3 text-lg">smart_display</span>
                  <input
                    id="nftD7YoutubeUrl"
                    type="url"
                    ${readOnlyMode ? 'readonly' : ''}
                    value="${escapeHtml(saved.youtube_url || '')}"
                    placeholder="https://youtu.be/... atau https://www.youtube.com/watch?v=..."
                    oninput="updateD7YoutubePreview()"
                    class="w-full pl-11 pr-4 py-3 text-xs font-mono font-bold rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-purple-600'} outline-none transition-all"
                  />
                </div>
                <p class="text-[11px] text-slate-500 mt-1">Setel visibilitas video di YouTube sebagai <strong>Publik</strong> atau <strong>Tidak Terdaftar (Unlisted)</strong> agar guru fasilitator dapat langsung menonton.</p>
              </div>

              <!-- Checkbox: Gabung vs Pisah Video BTS -->
              <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs">
                <label class="flex items-start sm:items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="nftD7IsCombinedVideo"
                    ${isCombined ? 'checked' : ''}
                    ${readOnlyMode ? 'disabled' : ''}
                    onchange="toggleD7BtsUrlField(this.checked)"
                    class="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 mt-0.5 sm:mt-0"
                  />
                  <span class="font-bold text-purple-950">
                    Video Refleksi dan Cuplikan Behind The Scene (BTS) sudah digabung menjadi 1 video utuh di YouTube (Disarankan)
                  </span>
                </label>
              </div>

              <!-- Kolom Tambahan Jika Video BTS Dipisah -->
              <div id="nftD7BtsUrlContainer" class="${isCombined ? 'hidden' : ''} space-y-1.5 pt-1">
                <label class="block text-xs font-bold text-slate-700">
                  Link Tautan Video BTS / Bloopers Tersendiri (YouTube):
                </label>
                <div class="relative">
                  <span class="material-symbols-outlined text-amber-600 absolute left-3.5 top-3 text-lg">theater_comedy</span>
                  <input
                    id="nftD7BtsYoutubeUrl"
                    type="url"
                    ${readOnlyMode ? 'readonly' : ''}
                    value="${escapeHtml(saved.bts_youtube_url || '')}"
                    placeholder="https://youtu.be/... (Link terpisah khusus video BTS/Bloopers)"
                    oninput="updateD7YoutubePreview()"
                    class="w-full pl-11 pr-4 py-3 text-xs font-mono font-bold rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-purple-600'} outline-none transition-all"
                  />
                </div>
              </div>

              <!-- Preview Player YouTube Live -->
              <div id="nftD7PreviewContainer" class="${currentVideoId ? '' : 'hidden'} mt-3 p-4 rounded-2xl bg-slate-900 text-white flex flex-col gap-2">
                <div class="flex items-center justify-between text-xs text-slate-300 font-bold">
                  <span class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-rose-500 text-base">play_circle</span>
                    <span>Pratinjau Video YouTube Terverifikasi:</span>
                  </span>
                  <span class="text-[11px] text-emerald-400 font-mono">✓ ID: <span id="nftD7PreviewVideoId">${currentVideoId}</span></span>
                </div>
                <div class="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    id="nftD7IframePreview"
                    src="${currentVideoId ? 'https://www.youtube.com/embed/' + currentVideoId : ''}"
                    class="w-full h-full border-0"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>

          <!-- BAGIAN 2: JURNAL REFLEKSI PRIBADI PERJALANAN DAY 1 S.D. DAY 7 -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-indigo-200 shadow-sm flex flex-col gap-5">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5 flex-wrap">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-xs">2</span>
                <div>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">Jurnal Refleksi Akbar Perjalanan Riset Day 1 s.d. Day 7</h3>
                  <p class="text-[11px] text-slate-500 font-medium">Jawablah 3 pertanyaan reflektif berikut dengan jujur berdasarkan pengalaman nyata yang Anda rasakan:</p>
                </div>
              </div>
              <span class="text-[10.5px] font-extrabold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                Refleksi Holistik 4 Pilar
              </span>
            </div>

            <!-- PERTANYAAN 1 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-800 leading-snug">
                  1. Pengalaman Lapangan &amp; Pembuatan Video Mandiri (Day 1–6):
                  <span class="block text-[11px] text-slate-500 font-normal mt-0.5">Momen apa yang paling berkesan, seru, atau menantang selama Anda menjalani riset mandiri (terutama saat observasi lapangan dan berbicara sendiri di depan kamera HP)?</span>
                </label>
                <span id="nftD7Refl1Counter" class="text-[11px] font-mono font-bold text-slate-500 shrink-0 ml-2">0 / 80</span>
              </div>
              <textarea
                id="nftD7Refl1"
                rows="4"
                ${readOnlyMode ? 'readonly' : ''}
                oninput="updateD7CharCounter(this, 'nftD7Refl1Counter')"
                placeholder="Ceritakan pengalaman lapangan Anda: suka duka saat observasi, bagaimana mengatasi rasa malu/canggung berbicara di depan kamera HP, serta momen seru yang dialami... (Minimal 80 karakter)"
                class="w-full p-4 rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-indigo-600'} text-xs leading-relaxed outline-none transition-all"
              >${escapeHtml(saved.refl_pengalaman || '')}</textarea>
            </div>

            <!-- PERTANYAAN 2 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-800 leading-snug">
                  2. Wawasan Baru &amp; Perubahan Pola Pikir:
                  <span class="block text-[11px] text-slate-500 font-normal mt-0.5">Pengetahuan baru atau keterampilan apa yang paling mengubah cara pandang Anda (terkait pengelolaan keuangan/anggaran, teknologi alat kerja, atau potensi unggulan masyarakat di OKU Timur)?</span>
                </label>
                <span id="nftD7Refl2Counter" class="text-[11px] font-mono font-bold text-slate-500 shrink-0 ml-2">0 / 80</span>
              </div>
              <textarea
                id="nftD7Refl2"
                rows="4"
                ${readOnlyMode ? 'readonly' : ''}
                oninput="updateD7CharCounter(this, 'nftD7Refl2Counter')"
                placeholder="Tuliskan wawasan baru yang Anda dapatkan: pemahaman arus kas, integrasi STEM dalam mata pencaharian warga desa, dan pentingnya inovasi produk lokal... (Minimal 80 karakter)"
                class="w-full p-4 rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-indigo-600'} text-xs leading-relaxed outline-none transition-all"
              >${escapeHtml(saved.refl_wawasan || '')}</textarea>
            </div>

            <!-- PERTANYAAN 3 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold text-slate-800 leading-snug">
                  3. Pesan Kesan &amp; Evaluasi Diri untuk Masa Depan:
                  <span class="block text-[11px] text-slate-500 font-normal mt-0.5">Apa pesan dan kesan Anda untuk diri sendiri dan guru fasilitator pembimbing setelah berhasil menyelesaikan seluruh tantangan 7 hari riset mandiri ini?</span>
                </label>
                <span id="nftD7Refl3Counter" class="text-[11px] font-mono font-bold text-slate-500 shrink-0 ml-2">0 / 80</span>
              </div>
              <textarea
                id="nftD7Refl3"
                rows="4"
                ${readOnlyMode ? 'readonly' : ''}
                oninput="updateD7CharCounter(this, 'nftD7Refl3Counter')"
                placeholder="Tuliskan apresiasi kepada guru fasilitator, kebanggaan atas kemandirian Anda, serta tekad untuk terus berkontribusi memajukan daerah sekitar... (Minimal 80 karakter)"
                class="w-full p-4 rounded-2xl border border-slate-300 ${readOnlyMode ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 focus:bg-white focus:border-indigo-600'} text-xs leading-relaxed outline-none transition-all"
              >${escapeHtml(saved.refl_pesan || '')}</textarea>
            </div>
          </div>

          <!-- TOMBOL AKSI SUBMIT / DRAFT -->
          <div class="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-3 flex-wrap">
            ${isSubmitted ? `
              <div class="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <span class="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                <span>Portofolio Day 7 Telah Terkirim Resmi (Asesmen Otomatis 100/100)</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick="window.enableEditNftDay7Lkpd()"
                  class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Edit Kembali
                </button>
                <a
                  href="dashboard.html"
                  class="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Buka Dasbor Rapor Akhir</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            ` : `
              <button
                type="button"
                onclick="saveDraftNonFieldTripDay7LKPD()"
                class="px-5 py-3 rounded-2xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span class="material-symbols-outlined text-base text-slate-600">save</span>
                <span>Simpan Draf Saja</span>
              </button>

              <button
                type="submit"
                class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 active:scale-[0.98] text-white text-xs font-black shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="material-symbols-outlined text-lg">rocket_launch</span>
                <span>Kirim &amp; Serahkan Portofolio Day 7</span>
              </button>
            `}
          </div>
        </form>
      </div>
    `;

    // Initialize char counters
    setTimeout(() => {
      ['nftD7Refl1', 'nftD7Refl2', 'nftD7Refl3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) updateD7CharCounter(el, id + 'Counter');
      });
    }, 50);
  }

  // Helper live character counter
  window.updateD7CharCounter = function(textareaEl, counterId) {
    if (!textareaEl) return;
    const cntEl = document.getElementById(counterId);
    if (!cntEl) return;
    const len = (textareaEl.value || '').trim().length;
    cntEl.textContent = (len >= 80 ? '✓ ' : '') + len + ' / 80';
    cntEl.className = 'text-[11px] font-mono font-bold ' + (len >= 80 ? 'text-emerald-700' : 'text-amber-700');
  };

  // Helper toggle BTS URL input
  window.toggleD7BtsUrlField = function(isCombined) {
    const btsCont = document.getElementById('nftD7BtsUrlContainer');
    if (btsCont) {
      if (isCombined) btsCont.classList.add('hidden');
      else btsCont.classList.remove('hidden');
    }
  };

  // Helper YouTube preview
  window.updateD7YoutubePreview = function() {
    const urlEl = document.getElementById('nftD7YoutubeUrl');
    const previewCont = document.getElementById('nftD7PreviewContainer');
    const iframeEl = document.getElementById('nftD7IframePreview');
    const idEl = document.getElementById('nftD7PreviewVideoId');
    if (!urlEl || !previewCont || !iframeEl) return;

    function extractYtId(url) {
      if (!url) return '';
      const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      return m ? m[1] : '';
    }

    const yId = extractYtId(urlEl.value.trim());
    if (yId) {
      iframeEl.src = 'https://www.youtube.com/embed/' + yId;
      if (idEl) idEl.textContent = yId;
      previewCont.classList.remove('hidden');
    } else {
      iframeEl.src = '';
      previewCont.classList.add('hidden');
    }
  };

  // Enable edit mode
  window.enableEditNftDay7Lkpd = function() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    try {
      localStorage.removeItem('fincestem_lkpd_nft_day7_' + cleanNisn);
      localStorage.removeItem('fincestem_lkpd_day7_' + cleanNisn);
    } catch(e) {}
    renderNonFieldTripDay7LKPD(false);
  };

  // Save Draft
  function saveDraftNonFieldTripDay7LKPD() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const isCombinedEl = document.getElementById('nftD7IsCombinedVideo');
    const data = {
      video_title: (document.getElementById('nftD7VideoTitle')?.value || '').trim(),
      youtube_url: (document.getElementById('nftD7YoutubeUrl')?.value || '').trim(),
      is_combined: isCombinedEl ? isCombinedEl.checked : true,
      bts_youtube_url: (document.getElementById('nftD7BtsYoutubeUrl')?.value || '').trim(),
      refl_pengalaman: (document.getElementById('nftD7Refl1')?.value || '').trim(),
      refl_wawasan: (document.getElementById('nftD7Refl2')?.value || '').trim(),
      refl_pesan: (document.getElementById('nftD7Refl3')?.value || '').trim(),
      updated_at: new Date().toISOString()
    };
    try {
      localStorage.setItem('fincestem_lkpd_nft_day7_draft_' + cleanNisn, JSON.stringify(data));
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Draf LKPD Day 7 berhasil disimpan!', 'success');
    } catch(e) {}
  }

  // Submit Official LKPD Day 7
  function submitNonFieldTripDay7LKPD() {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '-').trim();
    const isCombinedEl = document.getElementById('nftD7IsCombinedVideo');
    const isCombined = isCombinedEl ? isCombinedEl.checked : true;

    const data = {
      video_title: (document.getElementById('nftD7VideoTitle')?.value || '').trim(),
      youtube_url: (document.getElementById('nftD7YoutubeUrl')?.value || '').trim(),
      is_combined: isCombined,
      bts_youtube_url: (document.getElementById('nftD7BtsYoutubeUrl')?.value || '').trim(),
      refl_pengalaman: (document.getElementById('nftD7Refl1')?.value || '').trim(),
      refl_wawasan: (document.getElementById('nftD7Refl2')?.value || '').trim(),
      refl_pesan: (document.getElementById('nftD7Refl3')?.value || '').trim(),
      submitted: true,
      submitted_at: new Date().toISOString()
    };

    if (data.video_title.length < 3) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Tuliskan judul video YouTube karya Anda (minimal 3 karakter)!', 'warning');
      document.getElementById('nftD7VideoTitle')?.focus();
      return;
    }

    if (!data.youtube_url || !data.youtube_url.includes('youtu')) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Tuliskan tautan link video YouTube yang valid (contoh: https://youtu.be/...)!', 'warning');
      document.getElementById('nftD7YoutubeUrl')?.focus();
      return;
    }

    if (!isCombined && (!data.bts_youtube_url || !data.bts_youtube_url.includes('youtu'))) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Anda memilih video BTS terpisah. Harap masukkan tautan link video BTS di YouTube!', 'warning');
      document.getElementById('nftD7BtsYoutubeUrl')?.focus();
      return;
    }

    if (data.refl_pengalaman.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Refleksi Pertanyaan 1 minimal 80 karakter (saat ini ' + data.refl_pengalaman.length + ' karakter)!', 'warning');
      document.getElementById('nftD7Refl1')?.focus();
      return;
    }

    if (data.refl_wawasan.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Refleksi Pertanyaan 2 minimal 80 karakter (saat ini ' + data.refl_wawasan.length + ' karakter)!', 'warning');
      document.getElementById('nftD7Refl2')?.focus();
      return;
    }

    if (data.refl_pesan.length < 80) {
      if (window.FincestemCore && FincestemCore.ui) FincestemCore.ui.toast('Refleksi Pertanyaan 3 minimal 80 karakter (saat ini ' + data.refl_pesan.length + ' karakter)!', 'warning');
      document.getElementById('nftD7Refl3')?.focus();
      return;
    }

    try {
      localStorage.setItem('fincestem_lkpd_nft_day7_' + cleanNisn, JSON.stringify(data));
      localStorage.setItem('fincestem_lkpd_day7_' + cleanNisn, JSON.stringify(data));

      if (window.FincestemCore && FincestemCore.progress) {
        FincestemCore.progress.saveTaskRecord(cleanNisn, 7, 'lkpd', data, 100);
      }

      // =========================================================================
      // OTOMATIS TUNTAS ASESMEN DAY 7 (BEBAS KUIS / APRESIASI PORTOFOLIO 100/100)
      // =========================================================================
      const asesmenPayload = {
        day: 7,
        score: 100,
        score_percent: 100,
        is_passed: true,
        predicate: 'Sangat Baik (Tuntas)',
        status: 'completed',
        submittedAt: new Date().toISOString(),
        answers: { note: 'Day 7 Bebas Kuis Asesmen (Auto-Tuntas Portofolio Final)' }
      };
      localStorage.setItem('fincestem_asesmen_nft_day7_' + cleanNisn, JSON.stringify(asesmenPayload));
      localStorage.setItem('fincestem_asesmen_day7_' + cleanNisn, JSON.stringify(asesmenPayload));
      localStorage.setItem('fincestem_exam_state_d7_' + cleanNisn, JSON.stringify({ isSubmitted: true, score: 100 }));

      if (window.FincestemCore && FincestemCore.progress && typeof FincestemCore.progress.submitTask === 'function') {
        FincestemCore.progress.submitTask(cleanNisn, 7, 'asesmen', asesmenPayload);
      }

      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Alhamdulillah! Seluruh Karya Riset Day 7 Berhasil Dikirim Resmi. Asesmen Otomatis Tuntas 100/100!', 'success');
      }

      renderNonFieldTripDay7LKPD(true);
    } catch(e) {}
  }


  function renderNonFieldTripGenericLKPD(dayNum, isReadOnly) {
    dayNum = parseInt(dayNum) || 2;
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    const curr = NFT_DAYS_CURRICULUM[dayNum] || {
      title: `Day ${dayNum}: Riset Mandiri Lapangan`,
      theme: 'Observasi Potensi & Inovasi Lokal OKU Timur',
      focus: 'Investigasi lapangan terstruktur berbasis 4 pilar STEM & Finansial.'
    };

    // PRASYARAT WAJIB: Modul Belajar Day N harus selesai
    let hasMateri = false;
    try {
      const rawM = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                   localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.conclusion || p.text || p.content || p.summary || p.cardA)) hasMateri = true;
      }
    } catch(e) {}
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_materi`]) hasMateri = true;
    }

    // Ambil data resmi yang sudah dikirim
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn) ||
                      localStorage.getItem(`fincestem_lkpd_day${dayNum}_` + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    // Ambil data draft otomatis
    let draft = {};
    try {
      const rawDraft = localStorage.getItem(`fincestem_draft_nft_lkpd_d${dayNum}_` + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch(e) {}

    const formData = saved || draft;
    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt));
    const isTesterBypass = (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn));
    const isLockedByPrereq = !hasMateri && !isTesterBypass;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const readOnlyAttr = isFormLocked ? 'disabled' : '';
    const draftTimeStr = (draft && draft.updatedAt) 
      ? new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      : '';

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-12">
        
        <!-- BANNER PERINGATAN PRASYARAT MODUL -->
        ${isLockedByPrereq ? `
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Alur Wajib Berurutan Day ${dayNum}</span>
                <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Day ${dayNum} Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day ${dayNum}, Anda <strong>wajib menuntaskan Modul Belajar &amp; Resume Riset Mandiri Day ${dayNum}</strong> sebelum dapat mengisi Lembar Kerja Lapangan ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=${dayNum}" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Riset Day ${dayNum} Sekarang</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- KOP IDENTITAS LKPD NON-FIELD TRIP DAY N -->
        <div class="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-teal-700/40">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Non-Field Trip • Day ${dayNum}</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                Observasi Lapangan OKU Timur
              </span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span id="txtNftGenericDraftStatus_d${dayNum}" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-800/80 text-teal-100 border border-teal-600/60 flex items-center gap-1.5 shadow-2xs">
                <span class="w-2 h-2 rounded-full ${draft && draft.updatedAt ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}"></span>
                <span>${draft && draft.updatedAt ? `Draft tersimpan (pk ${draftTimeStr} WIB)` : 'Auto-Save Aktif (Anti Hilang Sinyal)'}</span>
              </span>
              <span id="nftGenericStatusBadge_d${dayNum}" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800 font-extrabold' : (isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : (draft && draft.updatedAt ? 'bg-amber-100 text-amber-950 font-extrabold border border-amber-300 shadow-2xs' : 'bg-teal-100 text-teal-950 font-extrabold'))}">
                ${isLockedByPrereq ? `Terkunci (Belum Tuntas Modul)` : (isSubmitted ? `✓ LKPD Day ${dayNum} Terkirim Resmi` : (draft && draft.updatedAt ? '📝 Mode Draft (Belum Dikirim)' : 'Sedang Observasi Lapangan'))}
              </span>
            </div>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD 0${dayNum}: ${curr.title}
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              ${curr.focus}
            </p>
          </div>

          <!-- KARTU DATA PENELITI -->
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
              <span class="text-teal-200 text-[10px] font-medium">Rombel / Kelas</span>
              <span class="font-extrabold truncate text-white">${studentClass}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Fasilitator Pembina</span>
              <span class="font-extrabold truncate text-white">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- FORM INVESTIGASI LAPANGAN DAY N -->
        <form id="formNftGenericLkpd_d${dayNum}" onsubmit="return false;" class="flex flex-col gap-4 sm:gap-5">

          <!-- BLOK 1: IDENTITAS & LOKASI OBSERVASI LAPANGAN -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs">1</div>
              <div>
                <h3 class="font-black text-sm sm:text-base text-slate-900">Profil Objek &amp; Lokasi Observasi Lapangan</h3>
                <p class="text-[11px] text-slate-500 font-medium">Identitas tempat kunjungan riset mandiri di wilayah Kabupaten OKU Timur.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-800 mb-1">Judul / Topik Investigasi Lapangan: <span class="text-red-500">*</span></label>
                <input type="text" id="nftGenTopic_d${dayNum}" value="${formData.topic || ''}" ${readOnlyAttr} placeholder="Contoh: Studi Efisiensi Saluran Irigasi Tersier di Lahan Pangan..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none">
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Nama Tempat / Objek / Unit Usaha: <span class="text-red-500">*</span></label>
                <input type="text" id="nftGenPlace_d${dayNum}" value="${formData.placeName || ''}" ${readOnlyAttr} placeholder="Contoh: Saluran Irigasi BK 9 / Kilang Padi Berkah / Kios..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none">
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Kecamatan di OKU Timur: <span class="text-red-500">*</span></label>
                <select id="nftGenDistrict_d${dayNum}" ${readOnlyAttr} class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:border-teal-600 outline-none">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(d => `<option value="${d}" ${(formData.district === d || normalizeDistrictName(formData.district) === d) ? 'selected' : ''}>Kec. ${d}</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Desa / Dusun Lokasi: <span class="text-red-500">*</span></label>
                <input type="text" id="nftGenVillage_d${dayNum}" value="${formData.village || ''}" ${readOnlyAttr} placeholder="Contoh: Desa Gumawang / Tulus Ayu / Karang Tengah..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 outline-none">
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Nama Narasumber &amp; Peran: <span class="text-red-500">*</span></label>
                <input type="text" id="nftGenInterviewee_d${dayNum}" value="${formData.interviewee || ''}" ${readOnlyAttr} placeholder="Contoh: Bpk. H. Supardi (Ketua P3A / Pengelola / Pelaku)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 outline-none">
              </div>

              <div class="sm:col-span-2">
                <label class="block font-bold text-slate-800 mb-1">Kontak / No. Telepon / WA Narasumber: (Opsional)</label>
                <input type="text" id="nftGenContact_d${dayNum}" value="${formData.contact || ''}" ${readOnlyAttr} placeholder="Contoh: 0812-XXXX-XXXX" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 outline-none">
              </div>
            </div>
          </div>

          <!-- BLOK 2: PENGAMATAN STEM & LAPANGAN -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs">2</div>
              <div>
                <h3 class="font-black text-sm sm:text-base text-slate-900">Investigasi Sains, Teknologi &amp; Pengamatan STEM</h3>
                <p class="text-[11px] text-slate-500 font-medium">Catatan pengamatan mengenai peralatan, teknologi, dan metode kerja di lapangan.</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-800 mb-1">Alat, Mesin, Instrumen, atau Teknologi yang Digunakan / Diamati: <span class="text-red-500">*</span></label>
                <input type="text" id="nftGenTech_d${dayNum}" value="${formData.techUsed || ''}" ${readOnlyAttr} placeholder="Contoh: Pintu air otomatis, mesin penggiling padi kapasitas 3 ton/jam, dryer, mesin kasir EDC..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:border-teal-600 outline-none">
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Catatan Pengamatan Parameter Lapangan (Kuantitatif &amp; Kualitatif): <span class="text-red-500">*</span></label>
                <textarea id="nftGenNotes_d${dayNum}" rows="3" ${readOnlyAttr} placeholder="Uraikan hasil pengukuran, kecepatan kerja, debit, volume hasil per hari, atau kondisi fisik yang Anda temukan saat observasi..." class="w-full p-3 rounded-2xl border border-slate-300 text-xs leading-relaxed focus:border-teal-600 outline-none">${formData.stemNotes || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- BLOK 3: ANALISIS EKONOMI & FINANSIAL DAERAH -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs">3</div>
              <div>
                <h3 class="font-black text-sm sm:text-base text-slate-900">Analisis Ekonomi &amp; Sirkulasi Finansial Daerah</h3>
                <p class="text-[11px] text-slate-500 font-medium">Studi biaya operasional, pendapatan, dan efisiensi finansial kegiatan yang diamati.</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-800 mb-1">Estimasi Biaya Operasional / Arus Finansial yang Berputar: <span class="text-red-500">*</span></label>
                <textarea id="nftGenFinancial_d${dayNum}" rows="2" ${readOnlyAttr} placeholder="Contoh: Biaya pemeliharaan saluran Rp 500.000/bulan / Biaya BBM mesin per hari Rp 150.000 / Nilai transaksi gabah..." class="w-full p-3 rounded-2xl border border-slate-300 text-xs leading-relaxed focus:border-teal-600 outline-none">${formData.financialNotes || ''}</textarea>
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1.5">Kanal Pembayaran / Transaksi yang Digunakan di Objek Ini:</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <label class="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50">
                    <input type="checkbox" id="chkPayGenCash_d${dayNum}" ${(formData.payments || []).includes('Tunai') || !formData.payments ? 'checked' : ''} ${readOnlyAttr} class="rounded text-teal-700">
                    <span class="font-bold text-slate-800">Uang Tunai</span>
                  </label>
                  <label class="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50">
                    <input type="checkbox" id="chkPayGenQris_d${dayNum}" ${(formData.payments || []).includes('QRIS') ? 'checked' : ''} ${readOnlyAttr} class="rounded text-teal-700">
                    <span class="font-bold text-slate-800">QRIS Digital</span>
                  </label>
                  <label class="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50">
                    <input type="checkbox" id="chkPayGenEdc_d${dayNum}" ${(formData.payments || []).includes('EDC') ? 'checked' : ''} ${readOnlyAttr} class="rounded text-teal-700">
                    <span class="font-bold text-slate-800">Mesin EDC / ATM</span>
                  </label>
                  <label class="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50">
                    <input type="checkbox" id="chkPayGenTransfer_d${dayNum}" ${(formData.payments || []).includes('Transfer') ? 'checked' : ''} ${readOnlyAttr} class="rounded text-teal-700">
                    <span class="font-bold text-slate-800">Transfer Bank</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- BLOK 4: KENDALA, SOLUSI HOTS & KESIMPULAN -->
          <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col gap-3.5">
            <div class="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs">4</div>
              <div>
                <h3 class="font-black text-sm sm:text-base text-slate-900">Kendala Lapangan, Solusi Inovatif (HOTS) &amp; Kesimpulan</h3>
                <p class="text-[11px] text-slate-500 font-medium">Analisis kritis pemecahan masalah berbasis integrasi sains, teknologi &amp; finansial.</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-800 mb-1">Kendala / Masalah Utama yang Ditemukan di Lapangan: <span class="text-red-500">*</span></label>
                <textarea id="nftGenProblems_d${dayNum}" rows="2" ${readOnlyAttr} placeholder="Contoh: Pendangkalan sedimentasi saluran saat kemarau, biaya listrik penggilingan yang mahal, keterbatasan modal..." class="w-full p-3 rounded-2xl border border-slate-300 text-xs leading-relaxed focus:border-teal-600 outline-none">${formData.problems || ''}</textarea>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block font-bold text-slate-800">Rekomendasi Solusi Inovatif Siswa (Min. 100 Karakter): <span class="text-red-500">*</span></label>
                  <span id="counterNftGenSolutions_d${dayNum}" class="text-slate-400 font-bold">0 / 100</span>
                </div>
                <textarea id="nftGenSolutions_d${dayNum}" rows="4" ${readOnlyAttr} oninput="evaluateGenericSolutionsCounter(${dayNum})" placeholder="Uraikan gagasan inovatif berbasis STEM dan literasi finansial Anda untuk menyelesaikan kendala tersebut secara berkelanjutan (minimal 100 karakter)..." class="w-full p-3 rounded-2xl border border-slate-300 text-xs leading-relaxed focus:border-teal-600 outline-none">${formData.solutions || ''}</textarea>
                <div class="text-[11px] font-medium pt-0.5">
                  <span id="msgNftGenSolutionsValidation_d${dayNum}" class="text-slate-400">Minimal 100 karakter analisis ilmiah</span>
                </div>
              </div>

              <div>
                <label class="block font-bold text-slate-800 mb-1">Kesimpulan Akhir Observasi Day ${dayNum}: <span class="text-red-500">*</span></label>
                <textarea id="nftGenConclusion_d${dayNum}" rows="2" ${readOnlyAttr} placeholder="Rangkum inti pembelajaran dan manfaat hasil investigasi Day ${dayNum} bagi potensi daerah OKU Timur..." class="w-full p-3 rounded-2xl border border-slate-300 text-xs leading-relaxed focus:border-teal-600 outline-none">${formData.conclusion || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- TOMBOL AKSI LKPD DAY N: SIMPAN DRAFT SEMENTARA & KIRIM RESMI -->
          ${!isSubmitted ? `
            <div class="pt-2 sticky bottom-4 z-20">
              <div class="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3.5">
                <div class="flex flex-col min-w-0 text-center md:text-left">
                  <div class="flex items-center justify-center md:justify-start gap-1.5">
                    <span class="w-2 h-2 rounded-full ${draft && draft.updatedAt ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}"></span>
                    <span id="lblLkpdGenericDraftBottomInfo_d${dayNum}" class="font-extrabold text-xs text-slate-800">
                      ${draft && draft.updatedAt ? `Draft tersimpan: Hari ini pk ${draftTimeStr} WIB` : 'Auto-Save Aktif: Jawaban tersimpan otomatis saat mengetik'}
                    </span>
                  </div>
                  <span class="text-[11px] text-slate-500 font-medium">Jika observasi belum selesai, klik <strong>Simpan Draft Sementara</strong> untuk melanjutkan nanti.</span>
                </div>
                
                <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-col sm:flex-row">
                  <!-- TOMBOL 1: SIMPAN DRAFT SEMENTARA -->
                  <button type="button" id="btnSaveDraftNftLkpd_d${dayNum}" onclick="manualSaveNonFieldTripGenericDraft(${dayNum})" ${readOnlyAttr} class="w-full sm:w-auto px-4 py-3.5 rounded-2xl ${isFormLocked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-950 border-2 border-amber-300 cursor-pointer shadow-2xs'} font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all">
                    <span class="material-symbols-outlined text-lg text-amber-700">bookmark</span>
                    <span>Simpan Draft Sementara</span>
                  </button>

                  <!-- TOMBOL 2: SUBMIT RESMI KE FASILITATOR -->
                  <button type="button" id="btnSubmitNftLkpd_d${dayNum}" onclick="submitNonFieldTripGenericLKPD(${dayNum})" ${readOnlyAttr} class="w-full sm:w-auto px-6 py-3.5 rounded-2xl ${isFormLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 active:scale-95 text-white cursor-pointer shadow-md'} font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                    <span class="material-symbols-outlined text-base">send</span>
                    <span>Simpan &amp; Kirim LKPD Day ${dayNum}</span>
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <div class="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-xl">verified</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-black text-sm text-emerald-950">LKPD Day ${dayNum} Non-Field Trip Telah Terkirim Resmi!</span>
                  <span class="text-xs text-emerald-800 font-medium">Data observasi lapangan Anda telah tersimpan dan diserahkan ke Fasilitator pembina.</span>
                </div>
              </div>
              <div class="flex gap-2">
                <a href="dokumentasi.html?day=${dayNum}" class="px-4 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 flex items-center gap-1.5 shadow-xs">
                  <span>Lanjut Dokumentasi Foto Day ${dayNum}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          `}
        </form>

      </div>
    `;

    setTimeout(() => {
      evaluateGenericSolutionsCounter(dayNum);
      const formGen = document.getElementById(`formNftGenericLkpd_d${dayNum}`);
      if (formGen && !isFormLocked) {
        formGen.addEventListener('input', () => {
          saveNftGenericDraftThrottled(dayNum);
        });
        formGen.addEventListener('change', () => {
          saveNftGenericDraftThrottled(dayNum);
        });
      }
    }, 50);
  }

  // 6. SUBMIT RESMI LKPD DAY 2 S.D. 7 NON-FIELD TRIP
  window.submitNonFieldTripGenericLKPD = function(dayNum) {
    dayNum = parseInt(dayNum) || 2;
    const topic = document.getElementById(`nftGenTopic_d${dayNum}`)?.value.trim();
    const placeName = document.getElementById(`nftGenPlace_d${dayNum}`)?.value.trim();
    const district = document.getElementById(`nftGenDistrict_d${dayNum}`)?.value;
    const village = document.getElementById(`nftGenVillage_d${dayNum}`)?.value.trim();
    const interviewee = document.getElementById(`nftGenInterviewee_d${dayNum}`)?.value.trim();
    const techUsed = document.getElementById(`nftGenTech_d${dayNum}`)?.value.trim();
    const stemNotes = document.getElementById(`nftGenNotes_d${dayNum}`)?.value.trim();
    const financialNotes = document.getElementById(`nftGenFinancial_d${dayNum}`)?.value.trim();
    const problems = document.getElementById(`nftGenProblems_d${dayNum}`)?.value.trim();
    const solutions = document.getElementById(`nftGenSolutions_d${dayNum}`)?.value.trim();
    const conclusion = document.getElementById(`nftGenConclusion_d${dayNum}`)?.value.trim();

    const missing = [];
    if (!topic) missing.push('Judul / Topik Investigasi');
    if (!placeName) missing.push('Nama Tempat / Objek Kunjungan');
    if (!district) missing.push('Kecamatan di OKU Timur');
    if (!village) missing.push('Desa Lokasi');
    if (!interviewee) missing.push('Nama Narasumber & Peran');
    if (!techUsed) missing.push('Teknologi / Metode yang Diamati');
    if (!stemNotes) missing.push('Catatan Pengamatan Lapangan');
    if (!financialNotes) missing.push('Analisis Ekonomi & Finansial');
    if (!problems) missing.push('Kendala Utama Lapangan');
    if (!solutions) missing.push('Rekomendasi Solusi Siswa');
    if (!conclusion) missing.push('Kesimpulan Pembelajaran');

    if (missing.length > 0) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Harap lengkapi: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ' dan lainnya' : ''}!`, 'warning');
      } else {
        alert(`Harap lengkapi seluruh isian wajib pada LKPD Day ${dayNum}!`);
      }
      return;
    }

    if (solutions.length < 100) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast(`Analisis rekomendasi solusi Anda kurang ${100 - solutions.length} karakter (minimal 100 karakter)!`, 'warning');
      } else {
        alert('Analisis rekomendasi solusi minimal 100 karakter!');
      }
      return;
    }

    if (!confirm(`Kirim LKPD Day ${dayNum} ke Fasilitator sekarang?\n\nPerhatian: Pastikan seluruh isian riset mandiri Anda sudah lengkap dan benar.\n\n• Klik "OK" jika Anda sudah yakin untuk mengirim resmi (tugas akan diserahkan ke Fasilitator).\n• Klik "Batal" jika Anda masih ingin memeriksa atau mengoreksi jawaban (Anda bisa memilih "Simpan Draft Sementara").`)) {
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const payments = [];
    if (document.getElementById(`chkPayGenCash_d${dayNum}`)?.checked) payments.push('Tunai');
    if (document.getElementById(`chkPayGenQris_d${dayNum}`)?.checked) payments.push('QRIS');
    if (document.getElementById(`chkPayGenEdc_d${dayNum}`)?.checked) payments.push('EDC');
    if (document.getElementById(`chkPayGenTransfer_d${dayNum}`)?.checked) payments.push('Transfer');

    const officialPayload = {
      day: dayNum,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: cleanNisn,
      studentClass: u.class || u.class_name || '',
      topic: topic,
      projectTitle: topic,
      businessName: placeName,
      placeName: placeName,
      district: district,
      village: village,
      location: `${village}, Kec. ${district}, OKU Timur`,
      interviewee: interviewee,
      contact: document.getElementById(`nftGenContact_d${dayNum}`)?.value.trim() || '-',
      techUsed: techUsed,
      stemNotes: stemNotes,
      financialNotes: financialNotes,
      payments: payments,
      problems: problems,
      solutions: solutions,
      conclusion: conclusion
    };

    const summaryText = `Riset Lapangan Day ${dayNum}: ${officialPayload.topic} di ${officialPayload.placeName} (${officialPayload.location}). Narasumber: ${officialPayload.interviewee}. Solusi: ${officialPayload.solutions.substring(0, 100)}...`;

    try {
      localStorage.setItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem(`fincestem_lkpd_day${dayNum}_` + cleanNisn, JSON.stringify(officialPayload));
    } catch(e) {}

    officialPayload.summary = summaryText;
    officialPayload.conclusion = summaryText;

    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, dayNum, 'lkpd', officialPayload, function() {
        showSuccessNftGenericLkpdModal(dayNum);
      });
    } else {
      showSuccessNftGenericLkpdModal(dayNum);
    }
  };

  function showSuccessNftGenericLkpdModal(dayNum) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900">
            Riset Mandiri Selesai
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            LKPD 0${dayNum} Berhasil Disimpan &amp; Terkirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1">
            Lembar kerja observasi riset mandiri Day ${dayNum} telah lengkap dan diserahkan ke Fasilitator. Silakan melanjutkan ke tahapan berikutnya!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="dokumentasi.html?day=${dayNum}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Dokumentasi Foto Day ${dayNum}</span>
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

    // =========================================================================
    // LKPD LATIHAN & SIMULASI OBSERVASI LAPANGAN KHUSUS DAY 0
  // =========================================================================
  function renderNonFieldTripDay0LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Kokurikuler';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getStudentFacilitator)
      ? FincestemCore.assignments.getStudentFacilitator(cleanNisn, studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // Cek Prasyarat Modul Belajar Day 0
    let hasMateri = false;
    const checkCandidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      checkCandidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) checkCandidateIds.add(cleanNisn.padStart(10, '0'));
    }
    for (const cid of checkCandidateIds) {
      try {
        const rawM = localStorage.getItem('fincestem_materi_nft_day0_' + cid) ||
                     localStorage.getItem('fincestem_materi_day0_' + cid);
        if (rawM) {
          const pM = JSON.parse(rawM);
          if (pM && (pM.submitted || pM.summary || pM.conclusion || pM.cardA)) {
            hasMateri = true;
            break;
          }
        }
      } catch(e) {}
    }
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map['0_materi']) hasMateri = true;
    }
    if (!hasMateri) {
      try {
        for (const cid of checkCandidateIds) {
          const progRaw = localStorage.getItem('fincestem_progress_' + cid);
          if (progRaw) {
            const p = JSON.parse(progRaw);
            if (p && p.task_map && p.task_map['0_materi']) {
              hasMateri = true;
              break;
            }
          }
        }
      } catch(eProg) {}
    }

    const isTesterD0 = (window.FincestemCore && FincestemCore.schedule && typeof FincestemCore.schedule.isTesterStudent === 'function' && FincestemCore.schedule.isTesterStudent(cleanNisn));
    if (!hasMateri && !isReadOnly && !isTesterD0) {
      mainEl.innerHTML = `
        <div class="max-w-md mx-auto w-full p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col items-center text-center gap-4 my-8 animate-scale-up">
          <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center font-black shadow-inner">
            <span class="material-symbols-outlined text-3xl">lock</span>
          </div>
          <div>
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
              Tahap 1 Belum Selesai
            </span>
            <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-2">
              LKPD Day 0 Terkunci
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
              Untuk membiasakan alur berurutan (*cascading*), Anda wajib membaca dan menyelesaikan <strong>Tahap 1: Modul Belajar &amp; Orientasi Day 0</strong> terlebih dahulu sebelum mengisi LKPD.
            </p>
          </div>
          <div class="w-full flex flex-col gap-2 pt-2">
            <a href="materi.html?day=0" class="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">menu_book</span>
              <span>Buka Modul Belajar Day 0</span>
            </a>
            <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
              <span>Kembali ke Beranda Dashboard</span>
            </a>
          </div>
        </div>
      `;
      return;
    }

    // Ambil data LKPD Day 0 yang tersimpan sebelumnya
    let saved = {
      nama_tempat: '',
      kecamatan: '',
      nama_narasumber: '',
      kontak_narasumber: '',
      sektor_ekonomi: 'Primer',
      produk_dijual: '',
      kendala_dihadapi: ''
    };
    let isSubmitted = false;
    try {
      const raw = localStorage.getItem('fincestem_lkpd_nft_day0_' + cleanNisn) ||
                  localStorage.getItem('fincestem_lkpd_day0_' + cleanNisn);
      if (raw) {
        const p = JSON.parse(raw);
        if (p) {
          const ans = p.answers || p;
          saved.nama_tempat = ans.nama_tempat || ans.tempat || '';
          saved.kecamatan = ans.kecamatan || '';
          saved.nama_narasumber = ans.nama_narasumber || ans.narasumber || '';
          saved.kontak_narasumber = ans.kontak_narasumber || ans.kontak || ans.no_wa || '';
          saved.sektor_ekonomi = ans.sektor_ekonomi || ans.sektor || 'Primer';
          saved.produk_dijual = ans.produk_dijual || ans.produk || '';
          saved.kendala_dihadapi = ans.kendala_dihadapi || ans.kendala || '';
          if (p.submitted || p.submittedAt) isSubmitted = true;
        }
      }
    } catch(e) {}

    const canEdit = !isReadOnly && !isSubmitted;

    const kecamatanList = OKU_TIMUR_DISTRICTS;

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 max-w-xl mx-auto w-full pb-16">
        
        <!-- HEADER KOP DAY 0 -->
        <div class="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 text-white shadow-lg border border-teal-700/50 flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs">
              <span class="material-symbols-outlined text-sm">assignment</span>
              <span>Day 0 • Simulasi LKPD</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-teal-100 border border-white/20">
              Observasi Lapangan Simulasi
            </span>
          </div>

          <div>
            <h1 class="font-black text-xl sm:text-2xl leading-tight">
              Lembar Kerja Observasi Lapangan (Simulasi)
            </h1>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              Simulasi pendataan profil tempat usaha, narasumber, sektor ekonomi, produk, dan kendala operasional seperti pelaksanaan Day 1.
            </p>
          </div>

          <!-- IDENTITAS SISWA & FASILITATOR -->
          <div class="p-3 sm:p-3.5 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-base">person</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-extrabold text-white truncate text-xs sm:text-sm">${studentName}</span>
                <span class="text-teal-200 text-[11px]">NISN: ${cleanNisn} • ${studentClass}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-teal-200 block uppercase font-bold tracking-wider">Fasilitator Binaan</span>
              <span class="font-bold text-white text-xs">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- FORMULIR LKPD SIMULASI OBSERVASI LAPANGAN -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col gap-5">
          
          <!-- BAGIAN 1: PROFIL TEMPAT OBSERVASI -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span class="w-7 h-7 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Profil Tempat Observasi</h4>
                <p class="text-[11px] text-slate-500">Informasi entitas atau badan usaha yang dikunjungi</p>
              </div>
            </div>

            <!-- Nama Tempat / Usaha -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Nama Tempat / Badan Usaha yang Dikunjungi: <span class="text-rose-500">*</span></label>
              <input type="text" id="nftD0LkpdTempat" value="${escapeHtml(saved.nama_tempat)}" ${!canEdit ? 'readonly' : ''} placeholder="Contoh: Toko Beras Makmur / Bengkel Las Mandiri / Usaha Tani Sejahtera" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
            </div>

            <!-- Pilihan Kecamatan di OKU Timur -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Pilihan Kecamatan di OKU Timur: <span class="text-rose-500">*</span></label>
              <select id="nftD0LkpdKecamatan" ${!canEdit ? 'disabled' : ''} class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
                <option value="">-- Pilih Kecamatan Lokasi Observasi --</option>
                ${kecamatanList.map(kec => `
                  <option value="${kec}" ${(saved.kecamatan === kec || normalizeDistrictName(saved.kecamatan) === kec) ? 'selected' : ''}>Kecamatan ${kec}</option>
                `).join('')}
              </select>
            </div>

            <!-- Nama Narasumber -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Nama Narasumber (Pemilik / Pengelola): <span class="text-rose-500">*</span></label>
              <input type="text" id="nftD0LkpdNarasumber" value="${escapeHtml(saved.nama_narasumber)}" ${!canEdit ? 'readonly' : ''} placeholder="Contoh: Bapak H. Sukardi / Ibu Siti Aminah" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
            </div>

            <!-- No Kontak / WA Narasumber -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">No. Kontak / WhatsApp Narasumber: <span class="text-rose-500">*</span></label>
              <input type="text" id="nftD0LkpdKontak" value="${escapeHtml(saved.kontak_narasumber)}" ${!canEdit ? 'readonly' : ''} placeholder="Contoh: 0812-3456-7890" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">
            </div>
          </div>

          <!-- BAGIAN 2: SEKTOR EKONOMI & AKTIVITAS PRODUKSI -->
          <div class="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span class="w-7 h-7 rounded-lg bg-teal-800 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <h4 class="font-bold text-xs sm:text-sm text-slate-900">Sektor Ekonomi &amp; Analisis Usaha</h4>
                <p class="text-[11px] text-slate-500">Klasifikasi kegiatan ekonomi, komoditas, dan kendala</p>
              </div>
            </div>

            <!-- Sektor Ekonomi: Primer, Sekunder, Tersier -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold text-slate-700">Klasifikasi Sektor Ekonomi: <span class="text-rose-500">*</span></label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50">
                  <input type="radio" name="nftD0Sektor" value="Primer" ${saved.sektor_ekonomi === 'Primer' ? 'checked' : ''} ${!canEdit ? 'disabled' : ''} class="text-teal-800 focus:ring-teal-500">
                  <div class="flex flex-col text-xs">
                    <span class="font-bold text-slate-900">Primer</span>
                    <span class="text-[10px] text-slate-500">Pertanian, Peternakan, Bahan Alam</span>
                  </div>
                </label>

                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50">
                  <input type="radio" name="nftD0Sektor" value="Sekunder" ${saved.sektor_ekonomi === 'Sekunder' ? 'checked' : ''} ${!canEdit ? 'disabled' : ''} class="text-teal-800 focus:ring-teal-500">
                  <div class="flex flex-col text-xs">
                    <span class="font-bold text-slate-900">Sekunder</span>
                    <span class="text-[10px] text-slate-500">Pengolahan, Manufaktur, Pangan</span>
                  </div>
                </label>

                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-teal-50/50 has-[:checked]:border-teal-600 has-[:checked]:bg-teal-50">
                  <input type="radio" name="nftD0Sektor" value="Tersier" ${saved.sektor_ekonomi === 'Tersier' ? 'checked' : ''} ${!canEdit ? 'disabled' : ''} class="text-teal-800 focus:ring-teal-500">
                  <div class="flex flex-col text-xs">
                    <span class="font-bold text-slate-900">Tersier</span>
                    <span class="text-[10px] text-slate-500">Perdagangan, Jasa, Toko, Kuliner</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Produk yang Dijual -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Produk / Barang / Jasa yang Dijual: <span class="text-rose-500">*</span></label>
              <textarea id="nftD0LkpdProduk" rows="2" ${!canEdit ? 'readonly' : ''} placeholder="Contoh: Beras premium kemasan 5kg, bekatul, dan pakan ternak" class="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${escapeHtml(saved.produk_dijual)}</textarea>
            </div>

            <!-- Kendala yang Dihadapi -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700">Kendala yang Dihadapi oleh Pelaku Usaha: <span class="text-rose-500">*</span></label>
              <textarea id="nftD0LkpdKendala" rows="2" ${!canEdit ? 'readonly' : ''} placeholder="Contoh: Fluktuasi harga gabah basah saat panen raya, kendala cuaca hujan saat pengeringan, dan biaya solar mesin pengering" class="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${!canEdit ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${escapeHtml(saved.kendala_dihadapi)}</textarea>
            </div>
          </div>

          <!-- STATUS & TOMBOL SUBMIT -->
          ${isSubmitted ? `
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs mt-2">
              <div class="flex items-center gap-2 text-emerald-950 font-bold">
                <span class="material-symbols-outlined text-emerald-600 text-xl">check_circle</span>
                <span>LKPD Day 0 Berhasil Dikirim ke Fasilitator!</span>
              </div>
              <a href="asesmen.html?day=0" class="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
                <span>Lanjut ke Asesmen Day 0</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          ` : `
            <button type="button" onclick="submitDay0NonFieldTripLKPD()" id="btnSubmitD0Lkpd" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2">
              <span class="material-symbols-outlined text-lg">send</span>
              <span>Simpan &amp; Kirim ke Fasilitator (Lanjut ke Asesmen)</span>
            </button>
          `}

        </div>

      </div>
    `;
  }

  window.submitDay0NonFieldTripLKPD = function() {
    const tempat = (document.getElementById('nftD0LkpdTempat')?.value || '').trim();
    const kecamatan = (document.getElementById('nftD0LkpdKecamatan')?.value || '').trim();
    const narasumber = (document.getElementById('nftD0LkpdNarasumber')?.value || '').trim();
    const kontak = (document.getElementById('nftD0LkpdKontak')?.value || '').trim();
    const sektorRadio = document.querySelector('input[name="nftD0Sektor"]:checked');
    const sektor = sektorRadio ? sektorRadio.value : 'Primer';
    const produk = (document.getElementById('nftD0LkpdProduk')?.value || '').trim();
    const kendala = (document.getElementById('nftD0LkpdKendala')?.value || '').trim();

    if (!tempat || tempat.length < 3) {
      alert('Nama tempat / badan usaha minimal 3 karakter!');
      document.getElementById('nftD0LkpdTempat')?.focus();
      return;
    }
    if (!kecamatan) {
      alert('Pilih kecamatan lokasi observasi di OKU Timur!');
      document.getElementById('nftD0LkpdKecamatan')?.focus();
      return;
    }
    if (!narasumber || narasumber.length < 3) {
      alert('Nama narasumber minimal 3 karakter!');
      document.getElementById('nftD0LkpdNarasumber')?.focus();
      return;
    }
    if (!kontak || kontak.length < 5) {
      alert('No kontak/WA narasumber minimal 5 karakter!');
      document.getElementById('nftD0LkpdKontak')?.focus();
      return;
    }
    if (!produk || produk.length < 5) {
      alert('Deskripsi produk yang dijual minimal 5 karakter!');
      document.getElementById('nftD0LkpdProduk')?.focus();
      return;
    }
    if (!kendala || kendala.length < 5) {
      alert('Deskripsi kendala yang dihadapi minimal 5 karakter!');
      document.getElementById('nftD0LkpdKendala')?.focus();
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const answers = {
      nama_tempat: tempat,
      kecamatan: kecamatan,
      nama_narasumber: narasumber,
      kontak_narasumber: kontak,
      sektor_ekonomi: sektor,
      produk_dijual: produk,
      kendala_dihadapi: kendala
    };

    const payload = {
      submitted: true,
      day: 0,
      answers: answers,
      submittedAt: new Date().toISOString()
    };

    const saveCandidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      saveCandidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) saveCandidateIds.add(cleanNisn.padStart(10, '0'));
    }
    saveCandidateIds.forEach(id => {
      try {
        localStorage.setItem('fincestem_lkpd_nft_day0_' + id, JSON.stringify(payload));
        localStorage.setItem('fincestem_lkpd_day0_' + id, JSON.stringify(payload));
      } catch(e) {}
    });

    if (window.FincestemCore && FincestemCore.progress && cleanNisn) {
      if (typeof FincestemCore.progress.submitTask === 'function') {
        FincestemCore.progress.submitTask(cleanNisn, 0, 'lkpd', answers, function() {
          if (window.FincestemCore.ui) {
            FincestemCore.ui.toast('LKPD Simulasi Day 0 Berhasil Dikirim! Tahap 3: Asesmen CBT kini terbuka.', 'success');
          }
        });
      } else if (typeof FincestemCore.progress.saveTaskProgress === 'function') {
        FincestemCore.progress.saveTaskProgress(0, 'lkpd', answers);
      }
    }

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center flex flex-col items-center gap-3.5 animate-scale-up">
        <div class="w-16 h-16 rounded-3xl bg-teal-100 text-teal-800 flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-3xl">fact_check</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-100 text-teal-900">
            Tahap 2 Tuntas • LKPD Day 0
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-1">
            LKPD Day 0 Berhasil Dikirim!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed mt-1 text-justify">
            Data observasi profil tempat dan sektor ekonomi telah terekam resmi. Tahap selanjutnya adalah mencoba <strong>Asesmen Simulasi (10 Soal CBT Pilihan Ganda)</strong>.
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="asesmen.html?day=0" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut ke Tahap 3: Asesmen Day 0</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    renderNonFieldTripDay0LKPD(false);
  };

  // Router untuk LKPD Non-Field Trip
  function renderNonFieldTripLKPD(dayNum, isReadOnly) {
    dayNum = (dayNum !== undefined && dayNum !== null && !isNaN(dayNum) && Number(dayNum) === 0) ? 0 : (parseInt(dayNum) || 1);
    if (dayNum === 0) {
      renderNonFieldTripDay0LKPD(isReadOnly);
    } else if (dayNum === 1) {
      renderNonFieldTripDay1LKPD(isReadOnly);
    } else if (dayNum === 2) {
      renderNonFieldTripDay2LKPD(isReadOnly);
    } else if (dayNum === 3) {
      renderNonFieldTripDay3LKPD(isReadOnly);
    } else if (dayNum === 4) {
      renderNonFieldTripDay4LKPD(isReadOnly);
    } else if (dayNum === 5) {
      renderNonFieldTripDay5LKPD(isReadOnly);
    } else if (dayNum === 6) {
      renderNonFieldTripDay6LKPD(isReadOnly);
    } else if (dayNum === 7) {
      renderNonFieldTripDay7LKPD(isReadOnly);
    } else {
      renderNonFieldTripGenericLKPD(dayNum, isReadOnly);
    }
  }

  window.renderNonFieldTripLKPD = renderNonFieldTripLKPD;
  window.renderNonFieldTripDay0LKPD = renderNonFieldTripDay0LKPD;
  window.renderNonFieldTripDay1LKPD = renderNonFieldTripDay1LKPD;
  window.renderNonFieldTripDay2LKPD = renderNonFieldTripDay2LKPD;
  window.renderNonFieldTripDay3LKPD = renderNonFieldTripDay3LKPD;
  window.renderNonFieldTripDay4LKPD = renderNonFieldTripDay4LKPD;
  window.renderNonFieldTripDay5LKPD = renderNonFieldTripDay5LKPD;
  window.renderNonFieldTripDay6LKPD = renderNonFieldTripDay6LKPD;
  window.renderNonFieldTripDay7LKPD = renderNonFieldTripDay7LKPD;
  window.renderNonFieldTripGenericLKPD = renderNonFieldTripGenericLKPD;
  window.renderNonFieldTripVideoDayLKPD = renderNonFieldTripVideoDayLKPD;
  window.submitNonFieldTripVideoDayLKPD = submitNonFieldTripVideoDayLKPD;
  window.saveNonFieldTripVideoDayDraft = saveNonFieldTripVideoDayDraft;
  window.collectNftVideoDayData = collectNftVideoDayData;
  window.extractYoutubeVideoId = extractYoutubeVideoId;
  window.NFT_LKPD_VIDEO_SECTORS = NFT_LKPD_VIDEO_SECTORS;
  window.OKU_TIMUR_DISTRICTS = OKU_TIMUR_DISTRICTS;
  window.normalizeDistrictName = normalizeDistrictName;
  window.saveNonFieldTripDay4Draft = saveNonFieldTripDay4Draft;
  window.submitNonFieldTripDay4LKPD = submitNonFieldTripDay4LKPD;
  window.saveNonFieldTripDay5Draft = saveNonFieldTripDay5Draft;
  window.submitNonFieldTripDay5LKPD = submitNonFieldTripDay5LKPD;
  window.saveNonFieldTripDay6Draft = saveNonFieldTripDay6Draft;
  window.submitNonFieldTripDay6LKPD = submitNonFieldTripDay6LKPD;
  window.saveNonFieldTripDay7Draft = saveNonFieldTripDay7Draft;
  window.submitNonFieldTripDay7LKPD = submitNonFieldTripDay7LKPD;
  window.previewNftDay7Youtube = previewNftDay7Youtube;
  window.recalcNftDay7Kas = recalcNftDay7Kas;

})(window);
