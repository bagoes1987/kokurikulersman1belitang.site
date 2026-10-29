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
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map['1_materi']) hasMateri = true;
    }

    // Ambil data resmi yang sudah pernah dikirim
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem('fincestem_lkpd_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day1_' + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    // Ambil data auto-save draft sementara
    let draft = {};
    try {
      const rawDraft = localStorage.getItem('fincestem_draft_nft_lkpd_d1_' + cleanNisn);
      if (rawDraft) draft = JSON.parse(rawDraft);
    } catch(e) {}

    const formData = saved || draft;
    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt));
    const isLockedByPrereq = !hasMateri;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const readOnlyAttr = isFormLocked ? 'disabled' : '';

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
            <span id="nftLkpdD1StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800 font-extrabold' : (isSubmitted ? 'bg-emerald-400 text-slate-950 font-black shadow-xs' : 'bg-teal-100 text-teal-950 font-extrabold')}">
              ${isLockedByPrereq ? 'Terkunci (Belum Tuntas Modul)' : (isSubmitted ? '✓ LKPD Terkirim Resmi' : 'Sedang Observasi Lapangan')}
            </span>
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

          <!-- TOMBOL SUBMIT RESMI LKPD DAY 1 -->
          ${!isSubmitted ? `
            <div class="pt-2 sticky bottom-4 z-20">
              <div class="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="flex flex-col min-w-0 text-center sm:text-left">
                  <span id="lblLkpdSubmitProgress" class="font-black text-xs sm:text-sm text-slate-900">Periksa Kelengkapan 6 Blok Investigasi</span>
                  <span class="text-[11px] text-slate-500 font-medium">Pastikan seluruh data hasil wawancara di lapangan telah terisi valid.</span>
                </div>
                
                <button type="button" id="btnSubmitNftLkpdD1" onclick="submitNonFieldTripDay1LKPD()" ${readOnlyAttr} class="w-full sm:w-auto px-6 py-3.5 rounded-2xl ${isFormLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 active:scale-95 text-white cursor-pointer shadow-md'} font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Simpan &amp; Kirim LKPD Day 1 ke Fasilitator</span>
                </button>
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

    // Jalankan kalkulasi finansial awal
    setTimeout(() => {
      recalcNftFinancials();
      evaluateSolutionsCounter();
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

  // 3. AUTO-SAVE DRAFT LKPD KE LOCALSTORAGE
  let draftTimer = null;
  function saveNftLkpdDraftThrottled() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
        const cleanNisn = String(u.nisn || u.identifier || '').trim();
        if (!cleanNisn) return;

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

        const draftObj = {
          updatedAt: new Date().toISOString(),
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
      } catch (e) {}
    }, 1200);
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

    // Submit ke sistem Core Progress FINCESTEM
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 1, 'lkpd', summaryText, function() {
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

  // Generic router untuk LKPD Non-Field Trip
  function renderNonFieldTripLKPD(dayNum, isReadOnly) {
    if (dayNum === 1) {
      renderNonFieldTripDay1LKPD(isReadOnly);
    } else {
      renderNonFieldTripGenericLKPD(dayNum, isReadOnly);
    }
  }

  function renderNonFieldTripGenericLKPD(dayNum, isReadOnly) {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    mainEl.innerHTML = `
      <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-4xl text-teal-600">assignment</span>
        <h3 class="font-black text-base text-slate-900">LKPD Non-Field Trip Day ${dayNum}</h3>
        <p class="text-xs text-slate-600 max-w-md">Lembar kerja observasi lokal OKU Timur untuk Day ${dayNum} sedang dalam persiapan.</p>
        <a href="dashboard.html" class="mt-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">Kembali ke Dashboard</a>
      </div>
    `;
  }

  window.renderNonFieldTripLKPD = renderNonFieldTripLKPD;
  window.renderNonFieldTripDay1LKPD = renderNonFieldTripDay1LKPD;
  window.renderNonFieldTripGenericLKPD = renderNonFieldTripGenericLKPD;

})(window);
