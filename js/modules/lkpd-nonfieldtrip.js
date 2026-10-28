/**
 * FINCESTEM 2026 - Lembar Kerja Peserta Didik (LKPD) Khusus Peserta Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur (Day 1 s.d. Day 7)
 * File Terpisah (Modular Isolation) - Bebas Konflik dengan LKPD Field Trip
 * Versi: 20261028_nft_lkpd_v1
 */

(function(window) {
  'use strict';

  function formatNumberId(val) {
    if (!val && val !== 0) return '';
    const num = parseInt(String(val).replace(/\D/g, ''), 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('id-ID');
  }

  // 1. RENDER LKPD DAY 1 NON-FIELD TRIP
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

    // Cek apakah Modul Day 1 (5 Kartu Riset) sudah selesai
    let hasMateri = false;
    try {
      const rawM = localStorage.getItem('fincestem_materi_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_materi_day1_' + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.cardA || p.conclusion)) hasMateri = true;
      }
    } catch(e) {}

    // Fallback cek progress server
    if (!hasMateri && window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map['1_materi']) hasMateri = true;
    }

    // Ambil data LKPD yang tersimpan sebelumnya
    let saved = null;
    try {
      const rawLkpd = localStorage.getItem('fincestem_lkpd_nft_day1_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_day1_' + cleanNisn);
      if (rawLkpd) saved = JSON.parse(rawLkpd);
    } catch(e) {}

    const isSubmitted = !!(saved && (saved.submitted || saved.submittedAt));
    const isLockedByPrereq = !hasMateri;
    const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
    const readOnlyAttr = isFormLocked ? 'disabled' : '';

    mainEl.innerHTML = `
      <div class="flex flex-col gap-4 sm:gap-5 pb-8">
        
        ${isLockedByPrereq ? `
          <!-- BANNER PERINGATAN PRASYARAT MODUL -->
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                <h3 class="text-base font-extrabold text-amber-950">LKPD Day 1 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 1, Anda <strong>wajib menyelesaikan 5 Kartu Riset Mandiri di Modul Belajar</strong> (minimal 300 karakter per kartu) sebelum dapat mengisi lembar kerja ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=1" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Tuntaskan Modul Riset Day 1 Sekarang</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BANNER IDENTITAS LKPD DAY 1 NON-FIELD TRIP -->
        <div class="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-teal-700/40">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">school</span>
                <span>Non-Field Trip • Day 1</span>
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                Pilar Financial &amp; Exploration
              </span>
            </div>
            <span id="nftLkpdD1StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800' : (isSubmitted ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-blue-100 text-blue-900')}">
              ${isLockedByPrereq ? 'Terkunci (Belum Tuntas Modul)' : (isSubmitted ? '✓ LKPD Terkirim Resmi' : 'Lembar Kerja Peserta Didik')}
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD 01: Fondasi Ekonomi, Literasi Finansial &amp; Desain Riset Potensi OKU Timur
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              Kajian Lapangan Mandiri: Penetapan Objek Riset, Pembagian Tim, &amp; Penyusunan Rencana Anggaran Kas
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Nama Siswa</span>
              <span class="font-extrabold truncate text-white">${studentName}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">NISN</span>
              <span class="font-extrabold truncate text-white">${studentNisn}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Rombel</span>
              <span class="font-extrabold truncate text-white">${studentClass}</span>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Fasilitator</span>
              <span class="font-extrabold truncate text-white">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- FORM LKPD DAY 1 -->
        <form id="formNftLkpdDay1" onsubmit="event.preventDefault();" class="flex flex-col gap-4">
          
          <!-- BAGIAN 1: IDENTITAS RENCANA PROYEK RISET -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
            <div class="flex items-center gap-2 text-teal-900 font-black text-base border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-xl text-teal-700">target</span>
              <span>Bagian 1: Desain &amp; Sasaran Riset Lokal OKU Timur</span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-800">1. Judul / Tema Riset yang Dipilih Kelompok Anda:</label>
              <input type="text" id="nftD1ProjectTitle" ${readOnlyAttr} value="${saved?.projectTitle || ''}" placeholder="Contoh: Analisis Kualitas Air Saluran Irigasi BK 3 Terhadap Pertumbuhan Padi di Desa Sidodadi" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-900">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-800">2. Lokasi / Objek Observasi Lapangan di OKU Timur:</label>
              <input type="text" id="nftD1Location" ${readOnlyAttr} value="${saved?.location || ''}" placeholder="Contoh: Saluran Irigasi BK 3 Belitang, Penggilingan Padi Desa Gumawang, atau UMKM Pasar Belitang" class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs font-medium text-slate-900">
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-800">3. Anggota Kelompok &amp; Pembagian Tugas Riset:</label>
              <textarea id="nftD1TeamRoles" rows="3" ${readOnlyAttr} placeholder="Tuliskan nama anggota kelompok Anda beserta tanggung jawabnya (misal: pencatat data, pewawancara, fotografer lapangan, dll)..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 resize-y">${saved?.teamRoles || ''}</textarea>
            </div>
          </div>

          <!-- BAGIAN 2: RENCANA ANGGARAN BIAYA RISET (BUDGETING) -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
            <div class="flex items-center gap-2 text-teal-900 font-black text-base border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-xl text-amber-600">account_balance_wallet</span>
              <span>Bagian 2: Rencana Anggaran Biaya Operasional Riset (RAB)</span>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed">
              Susun estimasi pengeluaran mandiri kelompok selama 7 hari pelaksanaan riset lokal:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800">Biaya Transportasi / Bensin Lapangan (Rp):</span>
                <input type="text" id="nftD1BudgetTransport" ${readOnlyAttr} value="${formatNumberId(saved?.budgetTransport)}" placeholder="0" class="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900">
              </div>
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800">Biaya Bahan / Cetak Instrumen / Kuota (Rp):</span>
                <input type="text" id="nftD1BudgetMaterials" ${readOnlyAttr} value="${formatNumberId(saved?.budgetMaterials)}" placeholder="0" class="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900">
              </div>
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800">Biaya Konsumsi Ringan Riset (Rp):</span>
                <input type="text" id="nftD1BudgetConsumption" ${readOnlyAttr} value="${formatNumberId(saved?.budgetConsumption)}" placeholder="0" class="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900">
              </div>
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                <span class="font-bold text-slate-800">Dana Cadangan Darurat Kelompok (Rp):</span>
                <input type="text" id="nftD1BudgetEmergency" ${readOnlyAttr} value="${formatNumberId(saved?.budgetEmergency)}" placeholder="0" class="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900">
              </div>
            </div>
          </div>

          <!-- BAGIAN 3: METODE PENGUMPULAN DATA -->
          <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
            <div class="flex items-center gap-2 text-teal-900 font-black text-base border-b border-slate-100 pb-2.5">
              <span class="material-symbols-outlined text-xl text-blue-600">biotech</span>
              <span>Bagian 3: Instrumen &amp; Rencana Wawancara Lapangan</span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-800">Siapa Narasumber Kunci yang Akan Diwawancarai &amp; Apa yang Hendak Ditanyakan?</label>
              <textarea id="nftD1InterviewPlan" rows="4" ${readOnlyAttr} placeholder="Sebutkan profil narasumber (misal: Ketua P3A Petani Pemakai Air, Pemilik Penggilingan Padi, Peternak, atau Sesepuh Adat) serta 3 pertanyaan pokok yang akan diajukan..." class="w-full p-3 rounded-xl border border-slate-300 focus:border-teal-600 outline-none text-xs text-slate-900 resize-y">${saved?.interviewPlan || ''}</textarea>
            </div>
          </div>

          <!-- TOMBOL SUBMIT LKPD DAY 1 -->
          ${!isSubmitted ? `
            <div class="pt-2">
              <button type="button" onclick="submitNonFieldTripDay1LKPD()" ${readOnlyAttr} class="w-full py-3.5 px-6 rounded-2xl ${isFormLocked ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer active:scale-95 shadow-md'} font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                <span class="material-symbols-outlined text-base">send</span>
                <span>Simpan &amp; Kirim LKPD Day 1 ke Fasilitator</span>
              </button>
            </div>
          ` : `
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2 font-bold">
                <span class="material-symbols-outlined text-emerald-600 text-lg">verified</span>
                <span>LKPD Day 1 Non-Field Trip telah berhasil dikirimkan!</span>
              </div>
              <a href="dashboard.html" class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700">Ke Beranda</a>
            </div>
          `}
        </form>

      </div>
    `;
  }

  // SUBMIT HANDLER LKPD DAY 1 NON-FIELD TRIP
  window.submitNonFieldTripDay1LKPD = function() {
    const title = document.getElementById('nftD1ProjectTitle')?.value.trim();
    const loc = document.getElementById('nftD1Location')?.value.trim();
    const roles = document.getElementById('nftD1TeamRoles')?.value.trim();
    const interview = document.getElementById('nftD1InterviewPlan')?.value.trim();

    if (!title || !loc || !roles || !interview) {
      if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
        FincestemCore.ui.toast('Lengkapi seluruh pertanyaan LKPD Day 1 sebelum mengirim!', 'warning');
      } else {
        alert('Lengkapi seluruh pertanyaan LKPD Day 1 sebelum mengirim!');
      }
      return;
    }

    const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const cleanNisn = String(u.nisn || u.identifier || '').trim();

    const lkpdPayload = {
      day: 1,
      submitted: true,
      submittedAt: new Date().toISOString(),
      projectTitle: title,
      location: loc,
      teamRoles: roles,
      budgetTransport: document.getElementById('nftD1BudgetTransport')?.value.trim(),
      budgetMaterials: document.getElementById('nftD1BudgetMaterials')?.value.trim(),
      budgetConsumption: document.getElementById('nftD1BudgetConsumption')?.value.trim(),
      budgetEmergency: document.getElementById('nftD1BudgetEmergency')?.value.trim(),
      interviewPlan: interview
    };

    try {
      localStorage.setItem('fincestem_lkpd_nft_day1_' + cleanNisn, JSON.stringify(lkpdPayload));
      localStorage.setItem('fincestem_lkpd_day1_' + cleanNisn, JSON.stringify(lkpdPayload));
    } catch(e) {}

    // Update progress
    if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.submitTask) {
      FincestemCore.progress.submitTask(cleanNisn, 1, 'lkpd', JSON.stringify(lkpdPayload), function() {
        FincestemCore.ui.toast('LKPD Day 1 Berhasil Disimpan & Dikirim!', 'success');
        setTimeout(() => { location.reload(); }, 600);
      });
    } else {
      alert('LKPD Day 1 Berhasil Disimpan & Dikirim!');
      location.reload();
    }
  };

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
        <p class="text-xs text-slate-600 max-w-md">Lembar kerja riset mandiri OKU Timur untuk Day ${dayNum} sedang disiapkan.</p>
        <a href="dashboard.html" class="mt-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs">Kembali ke Dashboard</a>
      </div>
    `;
  }

  window.renderNonFieldTripLKPD = renderNonFieldTripLKPD;
  window.renderNonFieldTripDay1LKPD = renderNonFieldTripDay1LKPD;
  window.renderNonFieldTripGenericLKPD = renderNonFieldTripGenericLKPD;

})(window);
