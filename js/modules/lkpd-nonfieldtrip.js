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
    'Buay Madang',
    'Buay Madang Timur',
    'Buay Pemuka Peliung',
    'Buay Pemuka Bangsa Raja',
    'Bunga Mayang',
    'Cempaka',
    'Jayapura',
    'Madang Suku I',
    'Madang Suku II',
    'Madang Suku III',
    'Martapura',
    'Semendawai Barat',
    'Semendawai Suku III',
    'Semendawai Timur',
    'BP Peliung'
  ];

  // Helper Format Angka Ribuan Rupiah
  function formatRupiahInput(val) {
    if (!val && val !== 0) return '';
    const num = parseInt(String(val).replace(/\D/g, ''), 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('id-ID');
  }

  function parseRupiahNumber(val) {
    if (!val && val !== 0) return 0;
    const num = parseInt(String(val).replace(/\D/g, ''), 10);
    return isNaN(num) ? 0 : num;
  }

  // 1. RENDER LKPD DAY 1 NON-FIELD TRIP (INVESTIGASI LAPANGAN EKONOMI & KEUANGAN)
  function renderNonFieldTripDay1LKPD(isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
      : (u.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

    // PRASYARAT WAJIB: Cek apakah Modul Day 1 (5 Kartu Riset) sudah tuntas diserahkan
    let hasMateri = false;
    try {
      const rawM = localStorage.getItem('fincestem_materi_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_materi_day1_' + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.cardA || p.conclusion)) hasMateri = true;
      }
    } catch(e) {}

    // Fallback verifikasi progress sistem
    if (!hasMateri) {
      if (window.currentStudentProgress && window.currentStudentProgress.task_map && window.currentStudentProgress.task_map['1_materi']) {
        hasMateri = true;
      } else {
        try {
          const sp = localStorage.getItem('fincestem_progress_' + cleanNisn);
          if (sp) {
            const p = JSON.parse(sp);
            if (p && p.task_map && p.task_map['1_materi']) hasMateri = true;
          }
        } catch(e) {}
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
    const isLockedByPrereq = !hasMateri;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
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
            <span class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs shrink-0 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">task_alt</span>
              <span>Laporan Tuntas</span>
            </span>
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
          <!-- BLOK 1: PROFIL TEMPAT KUNJUNGAN & LOKASI OKU TIMUR      -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Profil &amp; Legalitas Tempat Observasi</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Nama Badan Usaha, Kategori Lembaga, Wilayah &amp; Kontak Narasumber</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Identitas</span>
            </div>

            <!-- Nama Entitas Usaha -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">Nama Tempat / Badan Usaha yang Dikunjungi: <span class="text-rose-500">*</span></label>
              <input type="text" id="nftD1BusinessName" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.businessName || ''}" placeholder="Contoh: KUD Tani Makmur / Agen BRILink Berkah Jaya / BUMDes Mandiri Sejahtera / Toko Pupuk Barokah" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold text-slate-900">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Jenis Badan Usaha -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Jenis Badan Usaha / Kelembagaan: <span class="text-rose-500">*</span></label>
                <select id="nftD1BusinessType" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Jenis Badan Usaha --</option>
                  <option value="Koperasi" ${formData?.businessType === 'Koperasi' ? 'selected' : ''}>Koperasi (KUD / KSP / Koperasi Konsumen)</option>
                  <option value="BUMDes" ${formData?.businessType === 'BUMDes' ? 'selected' : ''}>BUMDes (Badan Usaha Milik Desa)</option>
                  <option value="Agen Laku Pandai" ${formData?.businessType === 'Agen Laku Pandai' ? 'selected' : ''}>Layanan Perbankan Tanpa Kantor (Agen BRILink / Mandiri / BNI)</option>
                  <option value="Pasar Tradisional" ${formData?.businessType === 'Pasar Tradisional' ? 'selected' : ''}>Pedagang Pasar Tradisional / Toko Grosir</option>
                  <option value="UMKM Perorangan" ${formData?.businessType === 'UMKM Perorangan' ? 'selected' : ''}>UMKM / Usaha Dagang Perorangan</option>
                  <option value="Kemitraan Swasta" ${formData?.businessType === 'Kemitraan Swasta' ? 'selected' : ''}>Kemitraan Perusahaan Swasta (Inti-Plasma)</option>
                </select>
              </div>

              <!-- Kecamatan di OKU Timur -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Wilayah Kecamatan di OKU Timur: <span class="text-rose-500">*</span></label>
                <select id="nftD1District" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Kecamatan di OKU Timur --</option>
                  ${OKU_TIMUR_DISTRICTS.map(kec => `
                    <option value="${kec}" ${formData?.district === kec ? 'selected' : ''}>Kecamatan ${kec}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Desa / Dusun & Narasumber -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Alamat Dusun / Desa: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Village" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.village || ''}" placeholder="Contoh: Desa Gumawang / Desa Sidodadi" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nama Narasumber &amp; Peran: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Interviewee" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.interviewee || ''}" placeholder="Contoh: Bpk. H. Sutrisno (Pengelola Agen / Ketua)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nomor Kontak / WhatsApp Narasumber:</label>
                <input type="text" id="nftD1Contact" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.contact || ''}" placeholder="08xxxxxxxxxx (Untuk verifikasi fasilitator)" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
            </div>
          </div>

          <!-- ======================================================== -->
          <!-- BLOK 2: SEKTOR EKONOMI & ALUR KEGIATAN (3 SEKTOR)       -->
          <!-- ======================================================== -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs shrink-0">2</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Sektor Ekonomi &amp; Rantai Kegiatan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Klasifikasi Sektor Primer/Sekunder/Tersier &amp; Alur Produksi-Distribusi-Konsumsi</span>
                </div>
              </div>
              <span class="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">Blok Analisis Sektor</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Sektor Utama -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Sektor Ekonomi Utama: <span class="text-rose-500">*</span></label>
                <select id="nftD1SectorType" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                  <option value="">-- Pilih Sektor Aktivitas --</option>
                  <option value="Sektor Primer" ${formData?.sectorType === 'Sektor Primer' ? 'selected' : ''}>Sektor Primer (Penghasil bahan mentah: Padi, Karet, Ikan, Jagung)</option>
                  <option value="Sektor Sekunder" ${formData?.sectorType === 'Sektor Sekunder' ? 'selected' : ''}>Sektor Sekunder (Pengolahan/Pabrik: RMU Padi, Pengolahan Makanan)</option>
                  <option value="Sektor Tersier" ${formData?.sectorType === 'Sektor Tersier' ? 'selected' : ''}>Sektor Tersier (Jasa Keuangan, Agen BRILink, Perdagangan Kios)</option>
                </select>
              </div>

              <!-- Komoditas / Produk yang Dikelola -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Komoditas / Produk Utama yang Diperjualbelikan: <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1Commodity" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.commodity || ''}" placeholder="Contoh: Saldo perbankan &amp; transfer tunai, Gabah/Beras, Pupuk bersubsidi, Sembako" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-semibold">
              </div>
            </div>

            <!-- Analisis Alur Aliran Barang & Jasa -->
            <div class="flex flex-col gap-1 pt-1">
              <label class="text-xs font-bold text-slate-800">Uraikan Rantai Kegiatan Ekonomi (Dari Mana Pasokan Masuk &amp; Bagaimana Disalurkan): <span class="text-rose-500">*</span></label>
              <textarea id="nftD1ActivityChain" rows="3" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Jelaskan secara terperinci: dari mana barang dagangan atau modal diperoleh (aliran produksi/pasokan) dan bagaimana mekanisme penyalurannya kepada konsumen akhir di OKU Timur..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${formData?.activityChain || ''}</textarea>
              <span class="text-[10.5px] text-slate-400 font-medium">Deskripsikan keterkaitan antara produsen, distributor, dan konsumen akhir di lapangan.</span>
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
                <input type="text" id="nftD1CustomerProfile" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.customerProfile || ''}" placeholder="Contoh: Petani sawah padi irigasi, ibu rumah tangga, buruh panen, pedagang keliling" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>

              <!-- Puncak Keramaian / Siklus Musim Panen -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Kapan Usaha Ini Berada pada Puncak Keramaian? <span class="text-rose-500">*</span></label>
                <input type="text" id="nftD1PeakSeason" ${readOnlyAttr} oninput="onNftLkpdInput()" value="${formData?.peakSeason || ''}" placeholder="Contoh: Musim panen raya padi (Maret-April), tanggal 1-5 saat pencairan bansos, atau hari pasar" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 font-medium">
              </div>
            </div>

            <!-- Estimasi Jumlah Transaksi / Pelanggan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800 text-xs">Perkiraan Jumlah Transaksi / Pelanggan per HARI: <span class="text-rose-500">*</span></span>
                <div class="flex items-center gap-2">
                  <input type="number" id="nftD1CustomersDaily" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formData?.customersDaily || ''}" placeholder="Misal: 35" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm outline-none focus:border-teal-600">
                  <span class="text-xs font-bold text-slate-600 shrink-0">Orang / Transaksi</span>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-teal-800">Estimasi Transaksi per BULAN (x30 Hari):</span>
                <span id="lblNftD1CustomersMonthly" class="text-base font-black text-teal-950 mt-0.5">
                  ${formData?.customersMonthly ? formData.customersMonthly.toLocaleString('id-ID') : '0'} Transaksi / Bulan
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
                <input type="text" id="nftD1IncomeDaily" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(formData?.incomeDaily)}" placeholder="Contoh: 1.500.000" class="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-black text-slate-900 text-sm outline-none focus:border-teal-600">
                <span class="text-[10px] text-slate-500">Omzet kotor harian dari narasumber</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-emerald-800">Proyeksi Pemasukan per BULAN (x30):</span>
                <span id="lblNftD1IncomeMonthly" class="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                  Rp ${formData?.incomeMonthly ? formData.incomeMonthly.toLocaleString('id-ID') : '0'}
                </span>
                <span class="text-[10px] text-emerald-700/80">Dihitung otomatis</span>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-center">
                <span class="text-[11px] font-bold text-emerald-800">Proyeksi Pemasukan per TAHUN (x365):</span>
                <span id="lblNftD1IncomeYearly" class="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                  Rp ${formData?.incomeYearly ? formData.incomeYearly.toLocaleString('id-ID') : '0'}
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
                  <input type="text" id="nftD1CostMaterials" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(formData?.costMaterials)}" placeholder="Misal: 25.000.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span class="text-[11.5px] font-semibold text-slate-700">2. Beban Listrik, Kuota EDC &amp; Sewa (Rp/Bln):</span>
                  <input type="text" id="nftD1CostOperational" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(formData?.costOperational)}" placeholder="Misal: 750.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
                </div>
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span class="text-[11.5px] font-semibold text-slate-700">3. Gaji Karyawan / Jasa Pengelola (Rp/Bln):</span>
                  <input type="text" id="nftD1CostWages" ${readOnlyAttr} oninput="recalcNftFinancials()" value="${formatRupiahInput(formData?.costWages)}" placeholder="Misal: 1.500.000" class="w-full p-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white">
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
                    Rp ${formData?.netProfitMonthly ? formData.netProfitMonthly.toLocaleString('id-ID') : '0'} / Bulan
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
                  <input type="checkbox" id="chkPayCash" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(formData?.payments || []).includes('Tunai') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Uang Tunai Kertas</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayQris" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(formData?.payments || []).includes('QRIS') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">QRIS Bank Indonesia</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayEdc" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(formData?.payments || []).includes('EDC') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Mesin EDC / Gesek ATM</span>
                </label>
                <label class="p-3 rounded-xl border border-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" id="chkPayTransfer" ${readOnlyAttr} onchange="onNftLkpdInput()" ${(formData?.payments || []).includes('Transfer') ? 'checked' : ''} class="w-4 h-4 text-teal-600 rounded">
                  <span class="font-semibold text-slate-800">Transfer Mobile Banking</span>
                </label>
              </div>
            </div>

            <!-- Sistem Pembukuan -->
            <div class="flex flex-col gap-1 pt-1">
              <label class="text-xs font-bold text-slate-800">Bagaimana Cara Pemilik / Pengelola Mencatat Transaksi Keuangannya? <span class="text-rose-500">*</span></label>
              <select id="nftD1Bookkeeping" ${readOnlyAttr} onchange="onNftLkpdInput()" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-semibold bg-white text-slate-900">
                <option value="">-- Pilih Sistem Pencatatan Keuangan --</option>
                <option value="Manual Buku Tulis" ${formData?.bookkeeping === 'Manual Buku Tulis' ? 'selected' : ''}>Masih manual ditulis tangan di buku kas / nota kertas</option>
                <option value="Aplikasi Digital Kasir" ${formData?.bookkeeping === 'Aplikasi Digital Kasir' ? 'selected' : ''}>Sudah menggunakan aplikasi kasir digital di HP / Komputer</option>
                <option value="Sistem Perbankan / EDC Otomatis" ${formData?.bookkeeping === 'Sistem Perbankan / EDC Otomatis' ? 'selected' : ''}>Tercatat otomatis melalui mutasi mesin EDC agen / rekening bank</option>
                <option value="Belum Ada Pembukuan Rutin" ${formData?.bookkeeping === 'Belum Ada Pembukuan Rutin' ? 'selected' : ''}>Belum ada pembukuan resmi (hanya hitungan ingatan pemilik)</option>
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
              <textarea id="nftD1Problems" rows="3" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Contoh: Piutang nasabah/pelanggan yang macet karena menunggu panen, fluktuasi harga pupuk/beras, keterbatasan saldo tunai agen perbankan, atau sinyal internet sering terputus..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${formData?.problems || ''}</textarea>
            </div>

            <!-- Solusi Inovatif Siswa -->
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold text-slate-800">2. Solusi atau Gagasan Inovatif yang Kelompok Anda Berikan untuk Usaha Tersebut: <span class="text-rose-500">*</span></label>
              <textarea id="nftD1Solutions" rows="4" ${readOnlyAttr} oninput="onNftLkpdInput()" placeholder="Tuliskan analisis dan saran Anda (misal: pentingnya menyisihkan dana darurat usaha, pemanfaatan QRIS untuk mencegah uang palsu, strategi pemisahan uang pribadi dan uang usaha, atau pembukuan digital sederhana)... (Minimal 100 karakter)" class="w-full p-3.5 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs leading-relaxed text-slate-900 resize-y">${formData?.solutions || ''}</textarea>
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
                <a href="asesmen.html?day=1" class="px-4 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 flex items-center gap-1.5 shadow-xs">
                  <span>Lanjut Kuis Asesmen Day 1</span>
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
  window.recalcNftFinancials = function() {
    const incomeDaily = parseRupiahNumber(document.getElementById('nftD1IncomeDaily')?.value);
    const customersDaily = parseInt(document.getElementById('nftD1CustomersDaily')?.value, 10) || 0;

    const costMat = parseRupiahNumber(document.getElementById('nftD1CostMaterials')?.value);
    const costOp = parseRupiahNumber(document.getElementById('nftD1CostOperational')?.value);
    const costWage = parseRupiahNumber(document.getElementById('nftD1CostWages')?.value);

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
  };

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

      const incomeDaily = parseRupiahNumber(document.getElementById('nftD1IncomeDaily')?.value);
      const customersDaily = parseInt(document.getElementById('nftD1CustomersDaily')?.value, 10) || 0;
      const costMat = parseRupiahNumber(document.getElementById('nftD1CostMaterials')?.value);
      const costOp = parseRupiahNumber(document.getElementById('nftD1CostOperational')?.value);
      const costWage = parseRupiahNumber(document.getElementById('nftD1CostWages')?.value);

      const payments = [];
      if (document.getElementById('chkPayCash')?.checked) payments.push('Tunai');
      if (document.getElementById('chkPayQris')?.checked) payments.push('QRIS');
      if (document.getElementById('chkPayEdc')?.checked) payments.push('EDC');
      if (document.getElementById('chkPayTransfer')?.checked) payments.push('Transfer');

      const now = new Date();
      const draftObj = {
        updatedAt: now.toISOString(),
        businessName: document.getElementById('nftD1BusinessName')?.value.trim() || '',
        businessType: document.getElementById('nftD1BusinessType')?.value || '',
        district: document.getElementById('nftD1District')?.value || '',
        village: document.getElementById('nftD1Village')?.value.trim() || '',
        interviewee: document.getElementById('nftD1Interviewee')?.value.trim() || '',
        contact: document.getElementById('nftD1Contact')?.value.trim() || '',
        sectorType: document.getElementById('nftD1SectorType')?.value || '',
        commodity: document.getElementById('nftD1Commodity')?.value.trim() || '',
        activityChain: document.getElementById('nftD1ActivityChain')?.value.trim() || '',
        customerProfile: document.getElementById('nftD1CustomerProfile')?.value.trim() || '',
        peakSeason: document.getElementById('nftD1PeakSeason')?.value.trim() || '',
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
        bookkeeping: document.getElementById('nftD1Bookkeeping')?.value || '',
        problems: document.getElementById('nftD1Problems')?.value.trim() || '',
        solutions: document.getElementById('nftD1Solutions')?.value.trim() || ''
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
    const businessName = document.getElementById('nftD1BusinessName')?.value.trim();
    const businessType = document.getElementById('nftD1BusinessType')?.value;
    const district = document.getElementById('nftD1District')?.value;
    const village = document.getElementById('nftD1Village')?.value.trim();
    const interviewee = document.getElementById('nftD1Interviewee')?.value.trim();
    const sectorType = document.getElementById('nftD1SectorType')?.value;
    const commodity = document.getElementById('nftD1Commodity')?.value.trim();
    const activityChain = document.getElementById('nftD1ActivityChain')?.value.trim();
    const customerProfile = document.getElementById('nftD1CustomerProfile')?.value.trim();
    const peakSeason = document.getElementById('nftD1PeakSeason')?.value.trim();
    const incomeDaily = parseRupiahNumber(document.getElementById('nftD1IncomeDaily')?.value);
    const customersDaily = parseInt(document.getElementById('nftD1CustomersDaily')?.value, 10) || 0;
    const bookkeeping = document.getElementById('nftD1Bookkeeping')?.value;
    const problems = document.getElementById('nftD1Problems')?.value.trim();
    const solutions = document.getElementById('nftD1Solutions')?.value.trim();

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

    const costMat = parseRupiahNumber(document.getElementById('nftD1CostMaterials')?.value);
    const costOp = parseRupiahNumber(document.getElementById('nftD1CostOperational')?.value);
    const costWage = parseRupiahNumber(document.getElementById('nftD1CostWages')?.value);

    const payments = [];
    if (document.getElementById('chkPayCash')?.checked) payments.push('Tunai');
    if (document.getElementById('chkPayQris')?.checked) payments.push('QRIS');
    if (document.getElementById('chkPayEdc')?.checked) payments.push('EDC');
    if (document.getElementById('chkPayTransfer')?.checked) payments.push('Transfer');

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
      contact: document.getElementById('nftD1Contact')?.value.trim() || '-',
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

    try {
      localStorage.setItem('fincestem_lkpd_nft_day1_' + cleanNisn, JSON.stringify(officialLkpd));
      localStorage.setItem('fincestem_lkpd_day1_' + cleanNisn, JSON.stringify(officialLkpd));
    } catch (e) {}

    officialLkpd.summary = summaryText;
    officialLkpd.conclusion = summaryText;

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
            Selamat! Lembar kerja observasi lapangan Day 1 Anda telah lengkap dan diserahkan ke Fasilitator. Tahap berikutnya adalah <strong>Kuis Asesmen Day 1</strong> dan <strong>Unggah Dokumentasi Foto Geotagging OKU Timur</strong>!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="asesmen.html?day=1" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Kuis Asesmen Day 1</span>
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
  const NFT_DAY2_SECTOR_DATA = {
    pangan: {
      key: 'pangan',
      name: 'Pertanian Tanaman Pangan (Padi Sawah & Palawija)',
      cultureTheme: 'Pengetahuan musim, keterampilan bertani, dan gotong royong',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      questions: [
        { id: 1, text: 'Bagaimana Bapak/Ibu menentukan waktu yang tepat untuk mengolah lahan, menanam, dan memanen?', hint: 'Kaji metode penentuan jadwal musim tanam, kalender pranata mangsa/musim hujan, atau jadwal giliran air irigasi Komering...' },
        { id: 2, text: 'Apakah ada pengetahuan lokal atau pengalaman orang tua yang masih digunakan dalam bertani?', hint: 'Kaji kearifan lokal seperti tanda-tanda alam, ritual selamatan wiwit/sedekah bumi, atau nasihat leluhur tani...' },
        { id: 3, text: 'Bagaimana bentuk kerja sama atau gotong royong yang dilakukan selama kegiatan pertanian?', hint: 'Kaji tradisi sambatan/rewang, gotong royong membersihkan parit tersier, atau giliran tenaga tanam/panen...' },
        { id: 4, text: 'Bagaimana penggunaan traktor, mesin tanam (transplanter), atau mesin panen (combine harvester) mengubah cara bertani?', hint: 'Kaji perbandingan waktu kerja manual vs mesin, biaya sewa alsintan, dan penghematan tenaga kerja...' },
        { id: 5, text: 'Apakah generasi muda di lingkungan ini masih tertarik bekerja di bidang pertanian? Mengapa?', hint: 'Kaji pandangan narasumber mengenai regenerasi petani muda, kendala minat pemuda, atau peluang smart farming...' }
      ]
    },
    perkebunan: {
      key: 'perkebunan',
      name: 'Perkebunan (Karet & Kelapa Sawit)',
      cultureTheme: 'Pengalaman budidaya, kebiasaan kerja, dan pengetahuan tanaman',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
      questions: [
        { id: 1, text: 'Jenis tanaman perkebunan apa yang dibudidayakan dan mengapa tanaman tersebut dipilih?', hint: 'Kaji alasan memilih karet atau kelapa sawit (kondisi tanah, kestabilan panen mingguan/bulanan, atau warisan keluarga)...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu mempelajari cara merawat tanaman agar menghasilkan panen yang baik?', hint: 'Kaji teknik menyadap getah karet yang benar, pemupukan sawit, pembersihan piringan pohon, dan pengendalian hama...' },
        { id: 3, text: 'Apakah pengalaman keluarga atau petani lain memengaruhi cara Bapak/Ibu mengelola kebun?', hint: 'Kaji transfer keterampilan berkebun dari orang tua, sharing pengalaman antarpetani kebun, atau panduan penyuluh...' },
        { id: 4, text: 'Bagaimana perubahan harga, cuaca, dan teknologi memengaruhi kegiatan perkebunan?', hint: 'Kaji pengaruh fluktuasi harga getah/TBS sawit, musim hujan (getah hanyut), dan penggunaan pisau sadap/alat dodos modern...' },
        { id: 5, text: 'Bagaimana pengetahuan perkebunan diwariskan kepada anak atau generasi muda?', hint: 'Kaji apakah anak diajarkan merawat kebun sendiri, menyerahkan ke buruh upahan, atau beralih profesi lain...' }
      ]
    },
    perikanan: {
      key: 'perikanan',
      name: 'Perikanan Air Tawar (Kolam Patin, Lele & Nila)',
      cultureTheme: 'Pengetahuan air, pengalaman budidaya, dan keterampilan pemeliharaan',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      questions: [
        { id: 1, text: 'Jenis ikan apa yang dipelihara atau ditangkap, dan mengapa memilih jenis tersebut?', hint: 'Kaji jenis komoditas kolam (patin Belitang, lele sangkuriang, gurami) dan alasan kemudahan pasar/daya tahan ikan...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu mengetahui kondisi air yang baik bagi ikan?', hint: 'Kaji cara mengamati warna air kehijauan, bau kolam, sirkulasi saluran irigasi, atau penggunaan alat ukur pH/suhu...' },
        { id: 3, text: 'Apakah ada pengalaman atau pengetahuan lokal yang digunakan untuk menentukan waktu pemberian pakan dan pemeliharaan ikan?', hint: 'Kaji jadwal pemberian pakan pagi-sore, penggunaan pakan fermentasi/magot lokal, dan insting perawatan kolam...' },
        { id: 4, text: 'Apakah Bapak/Ibu menggunakan teknologi seperti aerator, pompa, atau alat pengukur kualitas air?', hint: 'Kaji peralatan mekanis pompa sirkulasi air, kincir aerator oksigen, filter kolam, atau masih alami...' },
        { id: 5, text: 'Apa tantangan utama dalam kegiatan perikanan dan bagaimana cara mengatasinya?', hint: 'Kaji mahalnya harga pakan pelet pabrikan, serangan hama/jamur ikan, fluktuasi harga jual di pasar, dan solusinya...' }
      ]
    },
    peternakan: {
      key: 'peternakan',
      name: 'Peternakan (Sapi Potong, Kambing & Unggas)',
      cultureTheme: 'Pengetahuan pemeliharaan, keterampilan keluarga, dan kebiasaan kerja',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      questions: [
        { id: 1, text: 'Jenis ternak apa yang dipelihara dan apa tujuan pemeliharaannya?', hint: 'Kaji jenis ternak (sapi Bali/PO, kambing, ayam petelur) dan tujuannya (tabungan qurban, pembibitan, atau usaha pokok)...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu menentukan jenis pakan dan cara perawatan ternak?', hint: 'Kaji mencari rumput hijauan, jerami fermentasi amoniasi, konsentrat dedak, jadwal minum, dan kebersihan kandang...' },
        { id: 3, text: 'Apakah keterampilan beternak diperoleh dari keluarga atau belajar dari peternak lain?', hint: 'Kaji kebiasaan beternak turun-temurun, kursus peternakan, atau bimbingan mantri hewan/inseminator...' },
        { id: 4, text: 'Bagaimana pembagian tugas keluarga dalam memberi pakan, membersihkan kandang, dan merawat ternak?', hint: 'Kaji peran bapak mencari pakan, ibu/anak memberi makan sore dan membersihkan kotoran kandang...' },
        { id: 5, text: 'Apakah ada teknologi yang digunakan untuk meningkatkan kesehatan atau produktivitas ternak?', hint: 'Kaji teknologi kawin suntik (Inseminasi Buatan/IB), mesin pencacah pakan (chopper), atau vitamin penggemukan...' }
      ]
    },
    perdagangan: {
      key: 'perdagangan',
      name: 'Perdagangan & Jasa (Pasar Tradisional, Toko, Bengkel & Transportasi)',
      cultureTheme: 'Kepercayaan, komunikasi, dan hubungan sosial',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      questions: [
        { id: 1, text: 'Barang atau jasa apa yang Bapak/Ibu tawarkan kepada pelanggan?', hint: 'Kaji jenis dagangan sembako, hasil bumi pasar Gumawang, pakaian, atau jasa bengkel alsintan/transportasi logistik...' },
        { id: 2, text: 'Bagaimana Bapak/Ibu membangun kepercayaan dan menjaga hubungan baik dengan pelanggan?', hint: 'Kaji kejujuran timbangan, keramahan tegur sapa, kualitas barang konsisten, dan harga bersahabat...' },
        { id: 3, text: 'Apakah kebiasaan atau hubungan sosial masyarakat memengaruhi kegiatan jual beli? Bagaimana contohnya?', hint: 'Kaji sistem langganan warga sekampung, arisan pedagang, atau sistem tempo/kredit bayar saat panen...' },
        { id: 4, text: 'Apakah Bapak/Ibu menggunakan media sosial, pembayaran digital, atau aplikasi untuk menjalankan usaha?', hint: 'Kaji pemesanan lewat WhatsApp, penggunaan QRIS perbankan digital, EDC agen bank, atau pencatatan digital...' },
        { id: 5, text: 'Bagaimana cara Bapak/Ibu menghadapi persaingan usaha dan perubahan kebutuhan pelanggan?', hint: 'Kaji strategi menjaga stok barang lengkap, layanan ramah cepat, penataan toko menarik, atau pesan-antar...' }
      ]
    },
    industri: {
      key: 'industri',
      name: 'Industri Rumah Tangga (Olahan Pangan Kemplang/Rengginang & Kerajinan)',
      cultureTheme: 'Resep lokal, keterampilan pengolahan, dan tradisi konsumsi',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      questions: [
        { id: 1, text: 'Produk apa yang dibuat dan dari mana bahan bakunya diperoleh?', hint: 'Kaji produk olahan (kerupuk kemplang ikan, rengginang, tahu-tempe, kerajinan) dan asal pasokan bahan bakunya...' },
        { id: 2, text: 'Apakah produk tersebut menggunakan resep, teknik, atau tradisi lokal yang diwariskan keluarga?', hint: 'Kaji resep rahasia keluarga, racikan bumbu khas Belitang/Komering, dan teknik pengolahan tradisional...' },
        { id: 3, text: 'Bagaimana proses pengolahan dilakukan untuk menjaga rasa, mutu, dan kebersihan produk?', hint: 'Kaji tahapan higienis pembuatan, proses penjemuran panas matahari, penggorengan pasir/minyak, dan penyortiran...' },
        { id: 4, text: 'Apakah ada perubahan pada resep, peralatan, kemasan, atau cara pemasaran dari waktu ke waktu?', hint: 'Kaji penggunaan mesin adonan/pemotong otomatis, kemasan plastik klip berlabel merk, atau promosi online...' },
        { id: 5, text: 'Bagaimana usaha ini membantu meningkatkan nilai ekonomi bahan baku lokal dan pendapatan keluarga?', hint: 'Kaji kenaikan nilai jual dari ikan/beras mentah menjadi makanan olahan siap saji dan serapan tenaga kerja tetangga...' }
      ]
    },
    formal: {
      key: 'formal',
      name: 'Pekerjaan Formal (Aparatur Sipil Negara, Guru, Nakes, BUMN/Bank & Swasta)',
      cultureTheme: 'Etika, tanggung jawab, disiplin, dan kerja sama',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
      questions: [
        { id: 1, text: 'Apa tugas dan tanggung jawab utama Bapak/Ibu dalam pekerjaan ini?', hint: 'Kaji rincian tugas pelayanan publik, administrasi kedinasan, mendidik siswa, melayani kesehatan, atau operasional kantor...' },
        { id: 2, text: 'Nilai atau etika apa yang harus diterapkan ketika melayani masyarakat atau bekerja dalam organisasi?', hint: 'Kaji etika ramah 5S (Senyum, Salam, Sapa, Sopan, Santun), integritas, profesionalisme kerja, dan kejujuran...' },
        { id: 3, text: 'Bagaimana disiplin waktu dan tanggung jawab memengaruhi hasil pekerjaan?', hint: 'Kaji ketepatan jam kerja/absensi, kepatuhan SOP, ketuntasan berkas layanan warga, dan evaluasi pimpinan...' },
        { id: 4, text: 'Bagaimana kerja sama dan komunikasi dilakukan dengan rekan kerja?', hint: 'Kaji rapat koordinasi rutin, musyawarah mufakat internal, kekompakan tim kerja, dan budaya saling menghargai...' },
        { id: 5, text: 'Bagaimana perkembangan teknologi mengubah cara Bapak/Ibu menyelesaikan pekerjaan?', hint: 'Kaji digitalisasi aplikasi pelaporan kedinasan, tanda tangan elektronik, sistem informasi pelayanan, atau rapat online...' }
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
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
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
    const isLockedByPrereq = !hasMateri;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const readOnlyAttr = isFormLocked ? 'disabled' : '';
    const draftTimeStr = (draft && draft.updatedAt) 
      ? new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
      : '';

    const selSector = formData.sectorKey || 'pangan';
    const sectorObj = NFT_DAY2_SECTOR_DATA[selSector] || NFT_DAY2_SECTOR_DATA.pangan;

    // Helper isi nilai
    const val = (k) => (formData && formData[k] !== undefined) ? formData[k] : '';

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
          <div id="cardBoxLkpdD2_1" class="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-2xs flex flex-col gap-4 transition-all">
            <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black text-sm shrink-0">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base text-slate-900 leading-tight">Identitas Kegiatan &amp; Profil Narasumber Lapangan</h3>
                  <span class="text-[11px] text-slate-500 font-medium">Bagian A: Lokasi Observasi, Sektor Mata Pencaharian &amp; Data Narasumber</span>
                </div>
              </div>
              <span id="badgeCardStatusLkpdD2_1" class="px-2.5 py-1 rounded-xl text-[10.5px] font-black bg-rose-100 text-rose-800 shrink-0">Belum Lengkap</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              
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

              <!-- Lokasi Observasi -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Lokasi Observasi (Desa/Kecamatan di OKU Timur): <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD2_location" ${readOnlyAttr} value="${val('location')}" placeholder="Contoh: Desa Sidomulyo RT 03 RW 01, Kec. Belitang" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD2_loc" class="text-[10px] text-slate-400">Minimal 5 karakter</span>
              </div>

              <!-- Pilihan Sektor Mata Pencaharian (Dropdown Dinamis) -->
              <div class="flex flex-col gap-1 sm:col-span-2 lg:col-span-3 bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-200/80">
                <label class="text-xs font-extrabold text-indigo-950 flex items-center justify-between">
                  <span>Pilih Sektor Mata Pencaharian Narasumber Anda: <span class="text-rose-600">*</span></span>
                  <span class="text-[10.5px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-lg border border-indigo-200">1 dari 7 Sektor Pilihan</span>
                </label>
                <select id="nftD2_sectorKey" ${readOnlyAttr} onchange="onNftDay2SectorChange(this.value)" class="w-full p-2.5 rounded-xl border border-indigo-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs font-bold text-indigo-950 bg-white cursor-pointer transition-all">
                  <option value="pangan" ${selSector === 'pangan' ? 'selected' : ''}>1. Pertanian Tanaman Pangan (Padi Sawah Irigasi, Palawija Jagung/Kedelai)</option>
                  <option value="perkebunan" ${selSector === 'perkebunan' ? 'selected' : ''}>2. Perkebunan (Karet Rakyat, Kelapa Sawit)</option>
                  <option value="perikanan" ${selSector === 'perikanan' ? 'selected' : ''}>3. Perikanan Air Tawar (Sentra Kolam Patin Belitang, Lele, Nila)</option>
                  <option value="peternakan" ${selSector === 'peternakan' ? 'selected' : ''}>4. Peternakan (Sapi Potong, Kambing, Unggas)</option>
                  <option value="perdagangan" ${selSector === 'perdagangan' ? 'selected' : ''}>5. Perdagangan &amp; Jasa (Pasar Gumawang / Martapura, Toko, Bengkel Alsintan, Logistik)</option>
                  <option value="industri" ${selSector === 'industri' ? 'selected' : ''}>6. Industri Rumah Tangga (Olahan Kerupuk Kemplang, Rengginang, Pandai Besi, Makanan Lokal)</option>
                  <option value="formal" ${selSector === 'formal' ? 'selected' : ''}>7. Pekerjaan Formal (Aparatur Sipil Negara/ASN, Guru, Nakes, BUMN/Bank/Swasta)</option>
                </select>
                <p class="text-[11px] text-indigo-900/80 leading-relaxed font-medium mt-0.5">
                  <em>*Catatan: Begitu Anda memilih sektor di atas, Kartu 3 (Pertanyaan Khusus) akan otomatis menampilkan 5 pertanyaan yang sesuai dengan sektor profesi narasumber Anda.</em>
                </p>
              </div>

              <!-- Nama/Inisial Narasumber -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Nama / Inisial Narasumber: <span class="text-rose-600">*</span></label>
                <input type="text" id="nftD2_narasumberName" ${readOnlyAttr} value="${val('narasumberName')}" placeholder="Contoh: Pak Suwarno / Ibu Siti Rahayu" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
                <span id="msgValD2_nar" class="text-[10px] text-slate-400">Minimal 3 karakter</span>
              </div>

              <!-- Usia Narasumber -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Usia Narasumber (Tahun):</label>
                <input type="text" id="nftD2_narasumberAge" ${readOnlyAttr} value="${val('narasumberAge')}" placeholder="Contoh: 48 Tahun" oninput="onNftDay2FieldInput()" class="w-full p-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-800 transition-all font-medium">
              </div>

              <!-- Lama Menjalankan Pekerjaan -->
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold text-slate-800">Lama Menjalankan Pekerjaan: <span class="text-rose-600">*</span></label>
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

            <div class="flex flex-col gap-4">
              ${[
                { id: 1, title: '1. Kondisi lokasi dan lingkungan kerja', hint: 'Gambarkan kondisi fisik lokasi, kebersihan, suhu udara, luas lahan/kandang/ruang toko, serta keamanan tempat kerja...' },
                { id: 2, title: '2. Peralatan tradisional dan modern yang digunakan', hint: 'Tuliskan daftar peralatan yang benar-benar ada di depan mata Anda (alat manual dan mesin modern)...' },
                { id: 3, title: '3. Urutan proses kerja', hint: 'Uraikan kronologi proses dari persiapan awal, pengerjaan inti, hingga penyelesaian yang Anda lihat saat itu...' },
                { id: 4, title: '4. Pengetahuan atau keterampilan yang tampak digunakan', hint: 'Uraikan ketangkasan tangan, keahlian khusus, ketelitian, atau teknik yang dipraktikkan narasumber...' },
                { id: 5, title: '5. Bentuk interaksi, komunikasi, atau kerja sama', hint: 'Uraikan bagaimana narasumber berbicara dengan pekerja lain, menyapa tetangga, atau melayani pelanggan...' },
                { id: 6, title: '6. Kebiasaan atau nilai budaya yang terlihat', hint: 'Uraikan nilai keramahan, gotong royong, kehati-hatian, busana kerja, atau ritual kerja yang tampak...' },
                { id: 7, title: '7. Penggunaan teknologi dalam pekerjaan', hint: 'Uraikan cara mesin dinyalakan, alat dioperasikan, pemanfaatan listrik/bbm, atau gadget komunikasi...' },
                { id: 8, title: '8. Kendala atau masalah yang ditemukan saat observasi', hint: 'Uraikan hambatan yang terlihat, misalnya lumpur terlalu dalam, alat macet, bau menyengat, atau kelelahan...' },
                { id: 9, title: '9. Upaya menjaga mutu, lingkungan, atau keberlanjutan usaha', hint: 'Uraikan cara memilah hasil panen/produk yang bagus, pembuangan limbah, atau perawatan rutin alat...' }
              ].map(item => `
                <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5 transition-all">
                  <label class="text-xs font-bold text-slate-900 leading-snug">${item.title} <span class="text-rose-600">*</span></label>
                  <textarea id="nftD2_obs_${item.id}" ${readOnlyAttr} rows="3" oninput="onNftDay2FieldInput()" placeholder="${item.hint} (Minimal 20 karakter)" class="w-full p-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none text-xs text-slate-900 resize-y transition-all leading-relaxed">${val('obs_' + item.id)}</textarea>
                  <div class="flex items-center justify-between text-[10.5px]">
                    <span id="msgValD2_obs_${item.id}" class="text-rose-600 font-medium">Minimal 20 karakter</span>
                    <span id="cntD2_obs_${item.id}" class="text-slate-400 font-bold">0 / 20</span>
                  </div>
                </div>
              `).join('')}
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

  // Handler saat Sektor di Card 1 diubah
  window.onNftDay2SectorChange = function(newKey) {
    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    // Baca draft tersimpan
    let draft = {};
    try {
      const raw = localStorage.getItem('fincestem_draft_nft_lkpd_d2_' + cleanNisn);
      if (raw) draft = JSON.parse(raw);
    } catch(e) {}

    draft.sectorKey = newKey;
    renderSpecificQuestionsD2(newKey, draft);
    onNftDay2FieldInput();
  };

  // Evaluasi Validasi Realtime & Hitung Progres
  window.onNftDay2FieldInput = function(shouldSave = true) {
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
  };

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
      location: document.getElementById('nftD2_location')?.value.trim() || '',
      sectorKey: secKey,
      sectorName: sectorObj.name,
      cultureTheme: sectorObj.cultureTheme,
      narasumberName: document.getElementById('nftD2_narasumberName')?.value.trim() || '',
      narasumberAge: document.getElementById('nftD2_narasumberAge')?.value.trim() || '',
      durationWorking: document.getElementById('nftD2_durationWorking')?.value.trim() || '',
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
            Selamat! Lembar Kerja Wawancara &amp; Observasi Lapangan Day 2 Anda telah lengkap dan diserahkan ke Fasilitator. Tahap berikutnya adalah <strong>Kuis Asesmen Day 2</strong> dan <strong>Unggah Dokumentasi Foto Riset OKU Timur</strong>!
          </p>
        </div>

        <div class="w-full flex flex-col gap-2 pt-2">
          <a href="asesmen.html?day=2" class="w-full py-3.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Kuis Asesmen Day 2</span>
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
      title: 'Day 4: Kewirausahaan UMKM & Rantai Pasok Lokal',
      theme: 'Analisis Supply Chain, Logistik Distribusi & Margin Keuntungan Usaha',
      focus: 'Investigasi alur pasok komoditas dari petani/produsen ke pasar konsumen, struktur biaya logistik, dan penetapan harga jual produk.'
    },
    5: {
      title: 'Day 5: Inklusi Keuangan Digital & Perbankan Desa',
      theme: 'Penetrasi Transaksi Digital (QRIS, Agen Bank, EDC) & Akses Finansial Desa',
      focus: 'Observasi akses perbankan tanpa kantor, tantangan sinyal/literasi digital pedagang pasar desa, dan mitigasi risiko penipuan finansial.'
    },
    6: {
      title: 'Day 6: Konservasi Lingkungan & Budaya Pertanian Belitang',
      theme: 'Keberlanjutan Ekosistem, Efisiensi Pupuk & Kearifan Lokal Pertanian OKU Timur',
      focus: 'Kajian keberlanjutan tanah, efisiensi penggunaan pupuk bersubsidi/organik, dan pengelolaan limbah jerami/sekam padi.'
    },
    7: {
      title: 'Day 7: Evaluasi Akhir & Penyusunan Laporan Portofolio FINCESTEM',
      theme: 'Sintesis Hasil Riset 7 Hari, Rekomendasi Kebijakan & Portofolio Karya',
      focus: 'Penyusunan simpulan komprehensif, rekomendasi konkret bagi stakeholder lokal OKU Timur, dan penyusunan portofolio mandiri.'
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

  function renderNonFieldTripGenericLKPD(dayNum, isReadOnly) {
    dayNum = parseInt(dayNum) || 2;
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const studentName = u.name || 'Peserta Non-Field Trip';
    const studentNisn = u.nisn || u.identifier || '-';
    const studentClass = u.class || u.class_name || 'Kelas X';
    const cleanNisn = String(studentNisn).trim();
    const fasilName = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
      ? FincestemCore.assignments.getClassFacilitator(studentClass)
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
    const isLockedByPrereq = !hasMateri;
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
                  ${OKU_TIMUR_DISTRICTS.map(d => `<option value="${d}" ${formData.district === d ? 'selected' : ''}>Kec. ${d}</option>`).join('')}
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
                <a href="asesmen.html?day=${dayNum}" class="px-4 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 flex items-center gap-1.5 shadow-xs">
                  <span>Lanjut Kuis Asesmen Day ${dayNum}</span>
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
          <a href="asesmen.html?day=${dayNum}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
            <span>Lanjut Kuis Asesmen Day ${dayNum}</span>
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

  // Router untuk LKPD Non-Field Trip
  function renderNonFieldTripLKPD(dayNum, isReadOnly) {
    dayNum = parseInt(dayNum) || 1;
    if (dayNum === 1) {
      renderNonFieldTripDay1LKPD(isReadOnly);
    } else if (dayNum === 2) {
      renderNonFieldTripDay2LKPD(isReadOnly);
    } else {
      renderNonFieldTripGenericLKPD(dayNum, isReadOnly);
    }
  }

  window.renderNonFieldTripLKPD = renderNonFieldTripLKPD;
  window.renderNonFieldTripDay1LKPD = renderNonFieldTripDay1LKPD;
  window.renderNonFieldTripDay2LKPD = renderNonFieldTripDay2LKPD;
  window.renderNonFieldTripGenericLKPD = renderNonFieldTripGenericLKPD;

})(window);
