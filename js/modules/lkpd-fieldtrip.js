/**
 * FINCESTEM 2026 - Lembar Kerja Peserta Didik (LKPD) Khusus Field Trip
 * Day 1 s.d. Day 7 (AKPOL, Lawang Sewu, Bromo, Malang, Jogja, Drini, Bakpia)
 * Terpisah dari LKPD Riset Sekolah (Non-Field Trip)
 * Versi: 20261018
 */
    function formatRupiahInput(el) {
      if (!el) return;
      const prevVal = el.value || '';
      const prevCaret = el.selectionStart || 0;
      
      // Ambil hanya digit
      const rawDigits = prevVal.replace(/\D/g, '');
      if (!rawDigits) {
        el.value = '';
        return;
      }
      
      // Format angka dengan titik ribuan
      const formatted = Number(rawDigits).toLocaleString('id-ID');
      el.value = formatted;
      
      // Hitung selisih panjang untuk penyesuaian kursor
      const diff = formatted.length - prevVal.length;
      const newCaret = Math.max(0, prevCaret + diff);
      try {
        el.setSelectionRange(newCaret, newCaret);
      } catch (e) {}
    }

    function parseRupiah(val) {
      if (val === null || val === undefined) return 0;
      if (typeof val === 'number') return val;
      return parseFloat(String(val).replace(/\D/g, '')) || 0;
    }

    function formatNumberId(num) {
      if (num === null || num === undefined || isNaN(num) || num === '' || Number(num) === 0) return '';
      return Number(num).toLocaleString('id-ID');
    }

    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 1
    // ==========================================
    function renderFieldTripDay1LKPD(isReadOnly) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const studentName = activeUser.name || 'Peserta Field Trip';
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const studentClass = activeUser.class || activeUser.class_name || 'Kelas X';
      const fasilName = (FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
        ? FincestemCore.assignments.getClassFacilitator(studentClass)
        : (activeUser.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

      // Ambil simpanan sebelumnya jika ada
      const cleanNisn = String(studentNisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idVars = Array.from(new Set([cleanNisn, unpadded, padded, studentNisn])).filter(Boolean);
      let saved = null;

      try {
        for (const id of idVars) {
          const stored = localStorage.getItem('fincestem_lkpd_ft_day1_' + id);
          if (stored) {
            saved = JSON.parse(stored);
            break;
          }
        }
      } catch (e) {}

      // Fallback prefill jawaban 5 soal esai dari Asesmen jika belum ada di LKPD
      if (!saved || !saved.q1) {
        try {
          for (const id of idVars) {
            const rawAs = localStorage.getItem('fincestem_asesmen_ft_day1_' + id);
            if (rawAs) {
              const parsedAs = JSON.parse(rawAs);
              if (parsedAs && parsedAs.answers) {
                saved = saved || {};
                saved.q1 = saved.q1 || parsedAs.answers.q1 || '';
                saved.q2 = saved.q2 || parsedAs.answers.q2 || '';
                saved.q3 = saved.q3 || parsedAs.answers.q3 || '';
                saved.q4 = saved.q4 || parsedAs.answers.q4 || '';
                saved.q5 = saved.q5 || parsedAs.answers.q5 || '';
                break;
              }
            }
          }
        } catch (e) {}
      }

      // Verifikasi Prasyarat Berjenjang: Siswa wajib membaca modul & mengisi kesimpulan
      let hasMateri = false;
      try {
        const cleanNisn = String(studentNisn).trim();
        const unpadded = cleanNisn.replace(/^0+/, '');
        const localMateri = localStorage.getItem('fincestem_materi_ft_day1_' + cleanNisn) ||
                            localStorage.getItem('fincestem_materi_ft_day1_' + unpadded) ||
                            localStorage.getItem('fincestem_materi_ft_day1_' + ('0' + unpadded));
        if (localMateri) {
          const parsed = JSON.parse(localMateri);
          if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
            hasMateri = true;
          }
        }
      } catch (e) {}

      // Jika LKPD sudah pernah diisi atau disimpan sebagian, jangan dikunci kembali
      if (saved && (saved.total_saku || saved.submitted || saved.plan_emergency)) {
        hasMateri = true;
      }

      const isSubmitted = saved && saved.submitted;
      const isLockedByPrereq = !hasMateri;
      const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
      const readOnlyAttr = isFormLocked ? 'disabled' : '';

      mainEl.innerHTML = `
        ${isLockedByPrereq ? `
          <!-- BANNER PERINGATAN PRASYARAT BERJENJANG -->
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
              Sesuai alur kurikulum FINCESTEM Day 1, Anda <strong>wajib membaca Modul Belajar</strong> dan <strong>mengisi kesimpulan pemahaman</strong> (Kebutuhan vs Keinginan &amp; Formula 50-30-20) di bagian bawah modul sebelum dapat mengisi LKPD ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=1" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka &amp; Isi Kesimpulan di Modul Belajar Day 1</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- IDENTITAS TUGAS FIELD TRIP DAY 1 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-800">
              Field Trip • Day 1 (Financial)
            </span>
            <span id="ftStatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800' : (isSubmitted ? 'bg-teal-100 text-teal-800 border border-teal-300' : 'bg-blue-100 text-blue-800')}">
              ${isLockedByPrereq ? 'Terkunci (Belum Resume Modul)' : (isSubmitted ? '🔒 Telah Dikirim & Terkunci' : 'Lembar Kerja Peserta Didik')}
            </span>
          </div>
          <h2 class="text-lg sm:text-xl font-black text-primary leading-tight">
            LKPD 01: Budgeting Plan &amp; Manajemen Uang Saku 7 Hari Ekspedisi
          </h2>
          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Siswa: <strong>${studentName}</strong> (NISN: ${studentNisn} • ${studentClass})<br>
            Fasilitator Pembina: <strong>${fasilName}</strong>
          </p>

          <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs sm:text-sm leading-relaxed flex flex-col gap-1">
            <strong>ℹ️ Petunjuk Penting:</strong>
            <span>Seluruh biaya utama (bus pariwisata, tol, tiket kapal ferry, hotel, makan 3x sehari, dan tiket wisata) <strong>sudah ditanggung penuh oleh biro perjalanan</strong>. Fokus LKPD ini adalah melatih Anda membuat perencanaan uang saku pribadi yang Anda bawa dari rumah dari Hari 1 hingga Hari 7.</span>
          </div>
        </div>

        <!-- BAGIAN 1: TOTAL UANG SAKU -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-2 text-primary font-extrabold text-base border-b border-surface-container pb-2.5">
            <span class="material-symbols-outlined text-xl text-amber-600">account_balance_wallet</span>
            <span>Bagian 1: Modal Uang Saku Pribadi</span>
          </div>
          <div>
            <label class="block text-sm font-bold text-on-surface mb-1">Total Uang Saku yang Anda Bawa (Rp):</label>
            <div class="relative">
              <span class="absolute left-3.5 top-3 text-sm font-bold text-slate-500">Rp</span>
              <input id="ftTotalSaku" type="text" inputmode="numeric" autocomplete="off" placeholder="Contoh: 700.000" value="${formatNumberId(saved?.totalSaku)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant/50 text-base font-black text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:font-normal placeholder:text-slate-400">
            </div>
            <span class="text-[11px] text-slate-500 mt-1 block">Tuliskan nominal uang saku murni yang Anda pegang (tidak termasuk biaya biro). Titik ribuan akan muncul otomatis saat Anda mengetik.</span>
          </div>
        </div>

        <!-- BAGIAN 2: TABEL RENG-RENGAN BUDGETING DAY 1 - DAY 7 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-4">
          <div class="flex items-center gap-2 text-primary font-extrabold text-base border-b border-surface-container pb-2.5">
            <span class="material-symbols-outlined text-xl text-blue-600">table_chart</span>
            <span>Bagian 2: "Reng-rengan" Alokasi Pengeluaran (Day 1 s.d. Day 7)</span>
          </div>
          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Perkirakan batas pengeluaran untuk keperluan jajan, suvenir, oleh-oleh keluarga, dan dana cadangan darurat:
          </p>

          <div class="space-y-3 text-xs sm:text-sm">
            <!-- Day 1 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 1: Belitang &rarr; Semarang (Perjalanan)</span>
                <span class="text-[11px] text-amber-700 font-bold">Tol &amp; Kapal Ferry</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Camilan/minuman santai di rest area &amp; kapal ferry</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD1" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d1)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Day 2 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 2: Semarang &rarr; Batu (Lawang Sewu &amp; AKPOL)</span>
                <span class="text-[11px] text-blue-700 font-bold">Semarang</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Minuman segar / jajan santai saat istirahat siang</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD2" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d2)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Day 3 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 3: Batu (Petik Apel, Jatim Park 1 &amp; Museum Angkut)</span>
                <span class="text-[11px] text-emerald-700 font-bold">Kota Batu</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Apel petik segar kiloan tambahan / suvenir sains</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD3" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d3)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Day 4 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 4: Bromo &rarr; Yogyakarta (Pasir Berbisik &amp; Kawah)</span>
                <span class="text-[11px] text-purple-700 font-bold">Gunung Bromo</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Sarung tangan/kupluk hangat, camilan lereng kawah</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD4" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d4)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Day 5 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 5: Yogyakarta (Prambanan, Batik &amp; UNY)</span>
                <span class="text-[11px] text-teal-700 font-bold">Yogyakarta</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Perlengkapan batik / merchandise kampus UNY</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD5" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d5)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Day 6 -->
            <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-amber-950">Day 6: Yogyakarta (Pabrik Bakpia &amp; Pantai Drini)</span>
                <span class="px-2 py-0.5 rounded bg-amber-500 text-white font-black text-[10px]">Oleh-Oleh Utama</span>
              </div>
              <span class="text-[11.5px] text-amber-900">Target: <strong>Oleh-oleh utama untuk orang tua / keluarga di rumah</strong></span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-amber-700">Rp</span>
                <input id="ftPlanD6" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d6)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-300 bg-white font-bold text-xs outline-none focus:border-amber-600">
              </div>
            </div>

            <!-- Day 7 -->
            <div class="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-extrabold text-slate-900">Day 7: Perjalanan Pulang ke Belitang</span>
                <span class="text-[11px] text-slate-600 font-bold">Kepulangan</span>
              </div>
              <span class="text-[11.5px] text-slate-500">Target: Bekal camilan santai perjalanan pulang</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                <input id="ftPlanD7" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.d7)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/40 bg-white font-bold text-xs outline-none focus:border-primary">
              </div>
            </div>

            <!-- Pos Dana Darurat / Tabungan Sisa -->
            <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="font-black text-emerald-950">Tabungan Sisa / Dana Cadangan Darurat</span>
                <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-black text-[10px]">Wajib Dibawa Pulang</span>
              </div>
              <span class="text-[11.5px] text-emerald-800">Target saldo sisa yang <strong>wajib utuh</strong> untuk dibawa pulang kembali ke Belitang</span>
              <div class="relative">
                <span class="absolute left-3 top-2 text-xs font-bold text-emerald-700">Rp</span>
                <input id="ftPlanEmergency" type="text" inputmode="numeric" autocomplete="off" placeholder="0" value="${formatNumberId(saved?.emergency)}" oninput="formatRupiahInput(this); calculateFtDay1Budgeting();" ${readOnlyAttr} class="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-300 bg-white font-black text-xs outline-none focus:border-emerald-600">
              </div>
            </div>
          </div>
        </div>

        <!-- BAGIAN 3: KALKULASI & DIAGNOSIS KESEHATAN KEUANGAN -->
        <div id="ftDiagnosisCard" class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center justify-between border-b border-surface-container pb-2.5">
            <span class="text-sm font-extrabold text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-base text-teal-600">analytics</span>
              <span>Bagian 3: Diagnosis Kesehatan Finansial</span>
            </span>
            <span id="ftDiagPill" class="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide bg-slate-100 text-slate-700">
              Menunggu Input
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10.5px] text-slate-500 block">Total Uang Saku</span>
              <span id="ftDispTotal" class="text-xs sm:text-sm font-black text-slate-900">Rp 0</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10.5px] text-slate-500 block">Total Alokasi</span>
              <span id="ftDispAllocated" class="text-xs sm:text-sm font-black text-blue-900">Rp 0</span>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10.5px] text-slate-500 block">Sisa Belum Alokasi</span>
              <span id="ftDispDiff" class="text-xs sm:text-sm font-black text-emerald-700">Rp 0</span>
            </div>
          </div>

          <!-- Pesan Kesimpulan Sistem -->
          <div id="ftDiagBox" class="p-3.5 rounded-2xl bg-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed flex flex-col gap-1">
            <span class="font-bold text-slate-900">Silakan masukkan nominal uang saku dan alokasi harian di atas.</span>
            <span class="text-[11.5px] text-slate-600">Sistem akan secara otomatis menganalisis apakah pola anggaran Anda: <strong>Sangat Baik</strong>, <strong>Cukup/Waspada</strong>, atau <strong>Terlalu Boros</strong>.</span>
          </div>
        </div>

        <!-- BAGIAN 4: 5 SOAL ESAI PENGENALAN KRU & PEMBIMBING FIELD TRIP -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-4">
          <div class="flex items-center gap-2 text-primary font-extrabold text-base border-b border-surface-container pb-2.5">
            <span class="material-symbols-outlined text-xl text-purple-600">fact_check</span>
            <span>Bagian 4: Pengenalan Kru &amp; Pembimbing Field Trip (5 Soal Esai)</span>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Tuliskan jawaban esai singkat berdasarkan informasi dan pengamatan Anda terhadap kru pendukung serta guru pendamping di bus Anda:
          </p>

          <div class="space-y-3.5">
            <!-- Soal 1 -->
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-2">
              <label for="ftEssayQ1" class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">1. Apa nama Biro perjalanan selama field trip ini?</label>
              <textarea id="ftEssayQ1" rows="2" ${readOnlyAttr} placeholder="Tuliskan nama biro perjalanan wisata resmi kegiatan ini..." class="w-full p-3 rounded-xl border border-outline-variant/50 text-xs sm:text-sm text-slate-900 leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${isFormLocked ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${saved?.q1 || ''}</textarea>
            </div>

            <!-- Soal 2 -->
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-2">
              <label for="ftEssayQ2" class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">2. Siapa nama lengkap tour leader di bus anda?</label>
              <textarea id="ftEssayQ2" rows="2" ${readOnlyAttr} placeholder="Tuliskan nama lengkap tour leader yang memandu di bus Anda..." class="w-full p-3 rounded-xl border border-outline-variant/50 text-xs sm:text-sm text-slate-900 leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${isFormLocked ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${saved?.q2 || ''}</textarea>
            </div>

            <!-- Soal 3 -->
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-2">
              <label for="ftEssayQ3" class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">3. Siapa nama sopir dan kondektur di bus anda?</label>
              <textarea id="ftEssayQ3" rows="2" ${readOnlyAttr} placeholder="Tuliskan nama driver (sopir) dan co-driver/kondektur bus Anda..." class="w-full p-3 rounded-xl border border-outline-variant/50 text-xs sm:text-sm text-slate-900 leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${isFormLocked ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${saved?.q3 || ''}</textarea>
            </div>

            <!-- Soal 4 -->
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-2">
              <label for="ftEssayQ4" class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">4. Siapa nama petugas kesehatan kegiatan field trip ini?</label>
              <textarea id="ftEssayQ4" rows="2" ${readOnlyAttr} placeholder="Tuliskan nama petugas/tenaga medis kesehatan yang mendampingi..." class="w-full p-3 rounded-xl border border-outline-variant/50 text-xs sm:text-sm text-slate-900 leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${isFormLocked ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${saved?.q4 || ''}</textarea>
            </div>

            <!-- Soal 5 -->
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/25 flex flex-col gap-2">
              <label for="ftEssayQ5" class="font-bold text-xs sm:text-sm text-slate-900 leading-snug">5. Siapa nama guru pendamping di bus anda?</label>
              <textarea id="ftEssayQ5" rows="2" ${readOnlyAttr} placeholder="Tuliskan nama bapak/ibu guru pendamping di bus Anda..." class="w-full p-3 rounded-xl border border-outline-variant/50 text-xs sm:text-sm text-slate-900 leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${isFormLocked ? 'bg-slate-100 text-slate-600' : 'bg-white'}">${saved?.q5 || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- BAGIAN 5: KOMITMEN STRATEGI FINANSIAL -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center gap-2 text-primary font-extrabold text-base border-b border-surface-container pb-2.5">
            <span class="material-symbols-outlined text-xl text-teal-600">verified</span>
            <span>Bagian 5: Komitmen &amp; Strategi Pengendalian Diri</span>
          </div>
          <div>
            <label class="block text-xs sm:text-sm font-bold text-on-surface mb-1.5">Tuliskan komitmen Anda dalam mematuhi anggaran di atas:</label>
            <textarea id="ftCommitment" rows="3" placeholder="Contoh: Saya berkomitmen tidak jajan sembarangan di rest area dan menahan diri agar uang saku cukup untuk membeli Bakpia untuk orang tua di Jogja..." ${readOnlyAttr} class="w-full p-3.5 rounded-xl border border-outline-variant/50 text-xs sm:text-sm leading-relaxed outline-none focus:border-primary transition-all placeholder:text-slate-400">${saved?.commitment || ''}</textarea>
          </div>
        </div>

        <!-- TOMBOL SIMPAN & KIRIM LKPD DAY 1 -->
        ${isSubmitted ? `
          <div class="pt-2">
            <div class="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-xl">lock</span>
                </div>
                <div>
                  <span class="text-xs font-black uppercase text-teal-800 tracking-wider">Status: Telah Dikirim &amp; Terkunci</span>
                  <p class="text-xs sm:text-sm text-slate-700 font-medium">Laporan LKPD Day 1 Anda telah dikumpulkan. Formulir dikunci untuk menjaga integritas data. Hubungi Fasilitator atau Koordinator jika memerlukan izin perbaikan.</p>
                </div>
              </div>
              <a href="dashboard.html?day=1&task=asesmen" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs whitespace-nowrap flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0">
                <span>Lanjut ke Asesmen</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : (isReadOnly ? '' : `
          <div class="pt-2">
            ${isLockedByPrereq ? `
              <a href="materi.html?day=1" class="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer">
                <span class="material-symbols-outlined text-xl">menu_book</span>
                <span>Tahap 1 Belum Selesai • Buka &amp; Isi Modul Belajar Terlebih Dahulu</span>
              </a>
            ` : `
              <button id="saveFtLkpdBtn" type="button" onclick="saveAndSubmitFtDay1LKPD()" class="w-full py-4 rounded-2xl bg-[#006a61] hover:bg-[#004f48] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer">
                <span class="material-symbols-outlined text-xl">send</span>
                <span>Simpan &amp; Kirim LKPD Day 1</span>
              </button>
            `}
          </div>
        `)}

        <!-- MODAL KONFIRMASI TAHAP BERIKUTNYA (ASESMEN ATAU KEMBALI KE DAY 1) -->
        <div id="modalLkpdFtSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 opacity-0 pointer-events-none">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 flex flex-col gap-4 transform transition-all duration-300 scale-95">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span class="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-teal-700 tracking-wider">Tahap 2 LKPD Selesai</span>
                <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">LKPD Day 1 Berhasil Disimpan!</h3>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Data rencana uang saku dan komitmen finansial Anda telah tersimpan. Silakan pilih langkah yang ingin Anda lakukan selanjutnya:
            </p>

            <div class="flex flex-col gap-2.5 pt-2">
              <!-- Opsi 1: Lanjut ke Asesmen -->
              <a href="dashboard.html?day=1&task=asesmen" class="w-full py-3.5 px-4 rounded-2xl bg-[#006a61] hover:bg-[#004f48] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center">
                <span class="material-symbols-outlined text-xl">fact_check</span>
                <span>Lanjut ke Asesmen (Tahap 3)</span>
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>

              <!-- Opsi 2: Kembali ke Halaman Day 1 -->
              <a href="dashboard.html?day=1" class="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center">
                <span class="material-symbols-outlined text-lg">home</span>
                <span>Kembali ke Halaman Day 1</span>
              </a>

              <!-- Opsi 3: Tetap di LKPD -->
              <button type="button" onclick="closeFtLkpdModal()" class="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                Tetap di Lembar Kerja Ini
              </button>
            </div>
          </div>
        </div>

        <!-- Copyright Footer -->
        <div class="text-center pt-2 pb-4">
          <p class="font-label-sm text-label-sm text-outline text-xs">
            &copy; 2026 Kurikulum SMAN 1 Belitang
          </p>
        </div>
      `;

      // Jalankan kalkulasi awal jika ada data tersimpan
      calculateFtDay1Budgeting();
    }

    // Perhitungan Real-Time Budgeting & Diagnosis Finansial
    function calculateFtDay1Budgeting() {
      const totalSaku = parseRupiah(document.getElementById('ftTotalSaku')?.value);
      const d1 = parseRupiah(document.getElementById('ftPlanD1')?.value);
      const d2 = parseRupiah(document.getElementById('ftPlanD2')?.value);
      const d3 = parseRupiah(document.getElementById('ftPlanD3')?.value);
      const d4 = parseRupiah(document.getElementById('ftPlanD4')?.value);
      const d5 = parseRupiah(document.getElementById('ftPlanD5')?.value);
      const d6 = parseRupiah(document.getElementById('ftPlanD6')?.value);
      const d7 = parseRupiah(document.getElementById('ftPlanD7')?.value);
      const emergency = parseRupiah(document.getElementById('ftPlanEmergency')?.value);

      const totalAllocated = d1 + d2 + d3 + d4 + d5 + d6 + d7 + emergency;
      const diff = totalSaku - totalAllocated;

      // Update Tampilan Angka
      const dispTotal = document.getElementById('ftDispTotal');
      const dispAllocated = document.getElementById('ftDispAllocated');
      const dispDiff = document.getElementById('ftDispDiff');
      const pill = document.getElementById('ftDiagPill');
      const diagBox = document.getElementById('ftDiagBox');

      if (dispTotal) dispTotal.textContent = 'Rp ' + totalSaku.toLocaleString('id-ID');
      if (dispAllocated) dispAllocated.textContent = 'Rp ' + totalAllocated.toLocaleString('id-ID');
      if (dispDiff) {
        dispDiff.textContent = (diff < 0 ? '-Rp ' : 'Rp ') + Math.abs(diff).toLocaleString('id-ID');
        dispDiff.className = diff < 0 ? 'text-xs sm:text-sm font-black text-rose-600' : 'text-xs sm:text-sm font-black text-emerald-700';
      }

      if (!pill || !diagBox) return;

      if (totalSaku <= 0) {
        pill.className = 'px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide bg-slate-100 text-slate-700';
        pill.textContent = 'Menunggu Input';
        diagBox.className = 'p-3.5 rounded-2xl bg-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed flex flex-col gap-1';
        diagBox.innerHTML = `
          <span class="font-bold text-slate-900">Masukkan nominal uang saku Anda di Bagian 1.</span>
          <span class="text-[11.5px] text-slate-600">Sistem akan otomatis menghitung alokasi harian dan memberikan kesimpulan kesehatan finansial.</span>
        `;
        return;
      }

      const earlySpend = d1 + d2 + d3;
      const earlySpendRatio = totalSaku > 0 ? (earlySpend / totalSaku) : 0;
      const emergencyRatio = totalSaku > 0 ? (emergency / totalSaku) : 0;
      const olehOlehRatio = totalSaku > 0 ? (d6 / totalSaku) : 0;

      let diagnosisStatus = 'good';
      let statusLabel = 'Manajemen Keuangan Sangat Baik';
      let badgeClass = 'bg-emerald-100 text-emerald-900 border border-emerald-300';
      let boxClass = 'bg-emerald-50 border border-emerald-200 text-emerald-950';
      let icon = 'sentiment_very_satisfied';
      let explanation = '';

      if (totalAllocated > totalSaku) {
        // DEFISIT
        diagnosisStatus = 'wasteful';
        statusLabel = 'Terlalu Boros (Defisit Anggaran)';
        badgeClass = 'bg-rose-100 text-rose-900 border border-rose-300';
        boxClass = 'bg-rose-50 border border-rose-200 text-rose-950';
        icon = 'error';
        explanation = `⚠️ <strong>Peringatan Defisit:</strong> Total rencana pengeluaran Anda (Rp ${totalAllocated.toLocaleString('id-ID')}) melebihi uang saku yang Anda bawa (Rp ${totalSaku.toLocaleString('id-ID')}) sebesar Rp ${Math.abs(diff).toLocaleString('id-ID')}! Rencana ini sangat berisiko membuat Anda kehabisan uang di tengah jalan atau berutang. Kurangi pos jajan harian Anda.`;
      } else if (earlySpendRatio > 0.55) {
        // TERLALU BOROS DI AWAL
        diagnosisStatus = 'wasteful';
        statusLabel = 'Terlalu Boros di Awal Perjalanan';
        badgeClass = 'bg-rose-100 text-rose-900 border border-rose-300';
        boxClass = 'bg-rose-50 border border-rose-200 text-rose-950';
        icon = 'warning';
        explanation = `⚠️ <strong>Pola Konsumtif Awal:</strong> Lebih dari 55% uang saku Anda (${Math.round(earlySpendRatio * 100)}%) direncanakan habis di Day 1 s.d. Day 3. Pola ini sangat berisiko membuat Anda kehabisan uang saat tiba di Yogyakarta untuk membeli oleh-oleh orang tua. Kurangi jajan di hari pertama dan kedua!`;
      } else if (emergencyRatio >= 0.15 && olehOlehRatio >= 0.20 && diff >= 0) {
        // SANGAT BAIK
        diagnosisStatus = 'good';
        statusLabel = 'Manajemen Keuangan Sangat Baik (Sehat & Bijak)';
        badgeClass = 'bg-emerald-100 text-emerald-900 border border-emerald-300';
        boxClass = 'bg-emerald-50 border border-emerald-200 text-emerald-950';
        icon = 'verified';
        explanation = `✅ <strong>Luar Biasa &amp; Sehat:</strong> Perencanaan Anda sangat matang! Anda menyisihkan minimal 15% untuk dana cadangan darurat (Rp ${emergency.toLocaleString('id-ID')}) dan memprioritaskan oleh-oleh untuk orang tua/keluarga di Day 6 (Rp ${d6.toLocaleString('id-ID')}). Pengeluaran harian Anda terdistribusi secara seimbang.`;
      } else {
        // CUKUP / WASPADA BOROS
        diagnosisStatus = 'moderate';
        statusLabel = 'Manajemen Keuangan Cukup (Waspada Boros)';
        badgeClass = 'bg-amber-100 text-amber-900 border border-amber-300';
        boxClass = 'bg-amber-50 border border-amber-200 text-amber-950';
        icon = 'info';
        explanation = `🟡 <strong>Perlu Penyesuaian:</strong> Anggaran Anda cukup aman, namun pos dana cadangan darurat masih di bawah 15% atau uang saku habis tanpa sisa tabungan pulang. Disarankan menambah pos cadangan darurat agar Anda memiliki bekal aman jika ada keperluan mendesak di perjalanan.`;
      }

      pill.className = `px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide ${badgeClass}`;
      pill.textContent = statusLabel;

      diagBox.className = `p-3.5 rounded-2xl ${boxClass} text-xs sm:text-sm leading-relaxed flex flex-col gap-1.5 shadow-2xs`;
      diagBox.innerHTML = `
        <div class="flex items-center gap-1.5 font-bold">
          <span class="material-symbols-outlined text-base">${icon}</span>
          <span>Kesimpulan Sistem: ${statusLabel}</span>
        </div>
        <p class="text-xs sm:text-[12.5px] leading-relaxed">${explanation}</p>
      `;
    }

    // Simpan & Kirim LKPD Day 1 Field Trip
    function saveAndSubmitFtDay1LKPD() {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';

      // Cek prasyarat kesimpulan modul
      let hasMateri = false;
      try {
        const localMateri = localStorage.getItem('fincestem_materi_ft_day1_' + studentNisn);
        if (localMateri) {
          const parsed = JSON.parse(localMateri);
          if (parsed && parsed.conclusion && parsed.conclusion.trim().length >= 15) {
            hasMateri = true;
          }
        }
      } catch(e) {}

      if (!hasMateri) {
        FincestemCore.ui.toast('Aktivitas Berurutan: Anda wajib membaca Modul Belajar dan mengisi kesimpulan sebelum mengirimkan LKPD!', 'error');
        setTimeout(() => { window.location.href = 'materi.html?day=1'; }, 1000);
        return;
      }

      const totalSaku = parseRupiah(document.getElementById('ftTotalSaku')?.value);
      if (totalSaku <= 0) {
        FincestemCore.ui.toast('Silakan masukkan total uang saku yang Anda bawa di Bagian 1!', 'error');
        return;
      }

      const d1 = parseRupiah(document.getElementById('ftPlanD1')?.value);
      const d2 = parseRupiah(document.getElementById('ftPlanD2')?.value);
      const d3 = parseRupiah(document.getElementById('ftPlanD3')?.value);
      const d4 = parseRupiah(document.getElementById('ftPlanD4')?.value);
      const d5 = parseRupiah(document.getElementById('ftPlanD5')?.value);
      const d6 = parseRupiah(document.getElementById('ftPlanD6')?.value);
      const d7 = parseRupiah(document.getElementById('ftPlanD7')?.value);
      const emergency = parseRupiah(document.getElementById('ftPlanEmergency')?.value);
      const totalAllocated = d1 + d2 + d3 + d4 + d5 + d6 + d7 + emergency;

      if (totalAllocated > totalSaku) {
        if (!confirm('Peringatan: Total rencana alokasi pengeluaran Anda melebihi total uang saku (Defisit). Apakah Anda tetap ingin mengirimkan laporan ini?')) {
          return;
        }
      }

      const q1 = document.getElementById('ftEssayQ1')?.value.trim() || '';
      const q2 = document.getElementById('ftEssayQ2')?.value.trim() || '';
      const q3 = document.getElementById('ftEssayQ3')?.value.trim() || '';
      const q4 = document.getElementById('ftEssayQ4')?.value.trim() || '';
      const q5 = document.getElementById('ftEssayQ5')?.value.trim() || '';

      if (!q1 || !q2 || !q3 || !q4 || !q5) {
        FincestemCore.ui.toast('Harap lengkapi semua 5 jawaban esai pengenalan kru & pembimbing pada Bagian 4!', 'warning');
        return;
      }

      const commitment = document.getElementById('ftCommitment')?.value.trim() || '';

      const diagnosisText = document.getElementById('ftDiagPill')?.textContent || 'Selesai Dianalisis';

      const payload = {
        totalSaku: totalSaku,
        d1: d1,
        d2: d2,
        d3: d3,
        d4: d4,
        d5: d5,
        d6: d6,
        d7: d7,
        emergency: emergency,
        totalAllocated: totalAllocated,
        diagnosis: diagnosisText,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        commitment: commitment,
        submitted: true,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btn = document.getElementById('saveFtLkpdBtn');
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan Laporan Finansial...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
                try {
          const cleanId = String(studentNisn).trim();
          const unpaddedId = cleanId.replace(/^0+/, '');
          const idList = Array.from(new Set([cleanId, unpaddedId, '0' + unpaddedId, studentNisn])).filter(Boolean);
          idList.forEach(id => {
            localStorage.setItem('fincestem_lkpd_ft_day1_' + id, JSON.stringify(payload));
          });

          // Otomatis sinkronkan juga ke Asesmen Day 1 sehingga Tahap 3 Asesmen langsung tuntas
          const asesmenPayload = {
            submitted: true,
            type: 'essay',
            score: 100,
            totalQuestions: 5,
            answers: { q1, q2, q3, q4, q5 },
            submitted_at: new Date().toISOString()
          };
          idList.forEach(id => {
            localStorage.setItem('fincestem_asesmen_ft_day1_' + id, JSON.stringify(asesmenPayload));
          });
        } catch(e) {}

        // Sinkronkan ke server progress: LKPD & Asesmen Day 1
        if (FincestemCore.progress && studentNisn) {
          const asesmenNote = 'Asesmen Esai Day 1:\n1. Biro: ' + q1 + '\n2. Tour Leader: ' + q2 + '\n3. Sopir & Kondektur: ' + q3 + '\n4. Nakes: ' + q4 + '\n5. Guru Pendamping: ' + q5;
          FincestemCore.progress.submitTask(studentNisn, 1, 'asesmen', asesmenNote, function() {});
        }

        // Sinkronkan ke modul progres siswa
        if (FincestemCore.progress && studentNisn) {
          FincestemCore.progress.submitTask(studentNisn, 1, 'lkpd', payload);
        }

        if (btn) {
          btn.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span><span>Laporan Berhasil Disimpan</span>';
          btn.classList.remove('pointer-events-none', 'opacity-80');
        }

        const statusBadge = document.getElementById('ftStatusBadge');
        if (statusBadge) {
          statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800';
          statusBadge.textContent = 'Telah Dikirim / Menunggu Penilaian';
        }

        FincestemCore.ui.toast('LKPD Day 1 Field Trip (Budgeting Plan) berhasil disimpan & diagnosis dicatat!', 'success');

        // Tampilkan modal pilihan: Lanjut ke Asesmen atau Kembali ke Halaman Day 1
        setTimeout(() => {
          showFtLkpdSuccessModal();
        }, 300);
      }, 500);
    }

    function showFtLkpdSuccessModal() {
      const modal = document.getElementById('modalLkpdFtSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeFtLkpdModal() {
      const modal = document.getElementById('modalLkpdFtSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-100');
        inner.classList.add('scale-95');
      }
    }
    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 2
    // ==========================================
    let currentD2LkpdSession = 1;

    function renderFieldTripDay2LKPD(isReadOnly, targetSesi) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const studentName = activeUser.name || 'Peserta Field Trip';
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const studentClass = activeUser.class || activeUser.class_name || 'Kelas X';
      const fasilName = (FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
        ? FincestemCore.assignments.getClassFacilitator(studentClass)
        : (activeUser.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');
      const cleanNisn = String(studentNisn).trim();

      const urlParams = new URLSearchParams(window.location.search);

      // 1. Cek prasyarat Sesi 1 (Resume AKPOL)
      let hasResumeAkpol = false;
      try {
        const rawA = localStorage.getItem('fincestem_materi_ft_day2_akpol_' + cleanNisn) || localStorage.getItem('fincestem_materi_ft_day2_' + cleanNisn);
        if (rawA) hasResumeAkpol = true;
      } catch (e) {}

      // 2. Cek prasyarat Sesi 2 (Foto AKPOL & Resume Lawang Sewu)
      let hasFotoAkpol = false;
      try {
        const ids = [
          cleanNisn,
          cleanNisn.replace(/^0+/, ''),
          cleanNisn.padStart(10, '0'),
          activeUser.nis,
          activeUser.identifier,
          activeUser.username
        ].filter(Boolean);

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(cleanNisn);
          if (prog) {
            if (FincestemCore.progress.isDayStudentTasksDone && FincestemCore.progress.isDayStudentTasksDone(prog, 2)) {
              hasFotoAkpol = true;
            }
            const tm = prog.task_map || {};
            if (tm['2_dokumentasi'] && (tm['2_dokumentasi'].status === 'completed' || tm['2_dokumentasi'].status === 'submitted')) hasFotoAkpol = true;
            if (tm['2_refleksi'] && (tm['2_refleksi'].status === 'completed' || tm['2_refleksi'].status === 'submitted')) hasFotoAkpol = true;
          }
        }
        for (const id of ids) {
          if (localStorage.getItem(`fincestem_dok_ft_day2_akpol_${id}`) === 'true') hasFotoAkpol = true;
          if (localStorage.getItem(`fincestem_dok_ft_day2_${id}`) === 'true') hasFotoAkpol = true;
          if (localStorage.getItem(`fincestem_dok_ft_day2_lawang_${id}`) === 'true') hasFotoAkpol = true;
          if (localStorage.getItem(`fincestem_lkpd_ft_day2_lawang_${id}`) || localStorage.getItem(`fincestem_lkpd_lawang_saved_${id}`) === 'true') hasFotoAkpol = true;
          if (localStorage.getItem(`fincestem_materi_ft_day2_lawang_${id}`)) hasFotoAkpol = true;
          if (localStorage.getItem(`fincestem_refl_ft_day2_${id}`)) hasFotoAkpol = true;
        }

        const dbStr = localStorage.getItem('fincestem_db_2026_v1');
        if (dbStr) {
          const db = JSON.parse(dbStr);
          if (Array.isArray(db.documentation)) {
            const hasD2Photo = db.documentation.some(p => {
              const docDay = Number(p.day || p.day_number || 0);
              const docNisn = String(p.nisn || p.author_nisn || p.uploaded_by || '').trim();
              const matchId = ids.includes(docNisn) || ids.includes(docNisn.replace(/^0+/, ''));
              return docDay === 2 && matchId;
            });
            if (hasD2Photo) hasFotoAkpol = true;
          }
        }
      } catch (e) {}

      let hasResumeLawang = false;
      try {
        const rawL = localStorage.getItem('fincestem_materi_ft_day2_lawang_' + cleanNisn);
        if (rawL) hasResumeLawang = true;
      } catch (e) {}

      // Ambil data tersimpan untuk Sesi 1 (AKPOL)
      let savedAkpol = null;
      try {
        const rawAkpol = localStorage.getItem('fincestem_lkpd_ft_day2_akpol_' + cleanNisn) || localStorage.getItem('fincestem_lkpd_ft_day2_' + cleanNisn);
        if (rawAkpol) savedAkpol = JSON.parse(rawAkpol);
      } catch (e) {}

      // Ambil data tersimpan untuk Sesi 2 (Lawang Sewu)
      let savedLawang = null;
      try {
        const rawLawang = localStorage.getItem('fincestem_lkpd_ft_day2_lawang_' + cleanNisn);
        if (rawLawang) savedLawang = JSON.parse(rawLawang);
      } catch (e) {}

      const isAkpolSubmitted = savedAkpol && (savedAkpol.submitted || savedAkpol.savedAt);
      const isLawangSubmitted = savedLawang && (savedLawang.submitted || savedLawang.savedAt);

      // Tentukan sesi aktif
      if (targetSesi !== undefined && targetSesi !== null) {
        currentD2LkpdSession = Number(targetSesi);
      } else {
        const reqSesi = parseInt(urlParams.get('sesi'));
        if (reqSesi === 2 || currentD2LkpdSession === 2) {
          currentD2LkpdSession = 2;
        } else {
          currentD2LkpdSession = 1;
        }
      }

      // TAB NAVIGASI LKPD DAY 2 (INTERAKTIF & BEBAS BERPINDAH BOLAK-BALIK)
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-2 gap-1.5">
          <!-- TAB 1: LKPD AKPOL -->
          <button type="button" onclick="switchD2LkpdSession(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD2LkpdSession === 1 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
            <span class="material-symbols-outlined text-base ${currentD2LkpdSession === 1 ? 'text-amber-300' : 'text-blue-600'}">shield</span>
            <span class="truncate">Sesi 1: LKPD AKPOL</span>
            ${currentD2LkpdSession === 1 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
          </button>

          <!-- TAB 2: LKPD LAWANG SEWU -->
          <button type="button" onclick="switchD2LkpdSession(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD2LkpdSession === 2 ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40' : 'bg-slate-50 hover:bg-amber-50 text-amber-950 border border-amber-300'}">
            <span class="material-symbols-outlined text-base ${currentD2LkpdSession === 2 ? 'text-amber-200' : 'text-amber-700'}">account_balance</span>
            <span class="truncate">Sesi 2: LKPD Lawang Sewu</span>
            ${currentD2LkpdSession === 2 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
          </button>
        </div>
      `;

      // Header Eksklusif Sesuai Sesi Aktif Day 2
      let headerHtml = '';
      if (currentD2LkpdSession === 2) {
        headerHtml = `
          <!-- HEADER IDENTITAS RESMI LKPD DAY 2 - SESI 2 (LAWANG SEWU) -->
          <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                  Field Trip • Day 2 • Sesi 2
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                  Instrumen Esai Lapangan
                </span>
              </div>
              <span id="ftD2StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isLawangSubmitted ? 'bg-teal-100 text-teal-800' : 'bg-white/20 text-white'}">
                ${isLawangSubmitted ? 'LKPD Lawang Sewu Terkirim' : 'Draft LKPD Lawang Sewu'}
              </span>
            </div>

            <div>
              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                Lembar Kerja Peserta Didik (LKPD) Lawang Sewu
              </h2>
              <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium mt-0.5">
                Evaluasi Sains Cagar Budaya: Arsitektur Tropis NISM, Kaca Patri Schouten, &amp; Sejarah Perjuangan Heroik AMKA
              </p>
            </div>

            <!-- KARTU DATA SISWA & PEMBINA -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-amber-200 text-[10px] font-medium">Nama Siswa</span>
                <span class="font-extrabold truncate text-white">${studentName}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-amber-200 text-[10px] font-medium">NISN / Identitas</span>
                <span class="font-extrabold truncate text-white">${studentNisn}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-amber-200 text-[10px] font-medium">Rombel</span>
                <span class="font-extrabold truncate text-white">${studentClass}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-amber-200 text-[10px] font-medium">Fasilitator</span>
                <span class="font-extrabold truncate text-white">${fasilName}</span>
              </div>
            </div>
          </div>

          ${tabNavHtml}
        `;
      } else {
        headerHtml = `
          <!-- HEADER IDENTITAS RESMI LKPD DAY 2 - SESI 1 (AKPOL) -->
          <div class="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <div class="flex items-center gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-blue-100 backdrop-blur-md">
                  Field Trip • Day 2 • Sesi 1
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                  Instrumen Esai Lapangan
                </span>
              </div>
              <span id="ftD2StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isAkpolSubmitted ? 'bg-teal-100 text-teal-800' : 'bg-white/20 text-white'}">
                ${isAkpolSubmitted ? 'LKPD AKPOL Terkirim' : 'Draft LKPD AKPOL'}
              </span>
            </div>

            <div>
              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                Lembar Kerja Peserta Didik (LKPD) AKPOL Semarang
              </h2>
              <p class="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium mt-0.5">
                Evaluasi Pemahaman Lapangan: Visi &amp; Misi, Regulasi Perkap 21/2010, Kepangkatan Taruna, serta Sarana Prasarana Kampus AKPOL
              </p>
            </div>

            <!-- KARTU DATA SISWA & PEMBINA -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-xs">
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-blue-200 text-[10px] font-medium">Nama Siswa</span>
                <span class="font-extrabold truncate text-white">${studentName}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-blue-200 text-[10px] font-medium">NISN / Identitas</span>
                <span class="font-extrabold truncate text-white">${studentNisn}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-blue-200 text-[10px] font-medium">Rombel</span>
                <span class="font-extrabold truncate text-white">${studentClass}</span>
              </div>
              <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
                <span class="text-blue-200 text-[10px] font-medium">Fasilitator</span>
                <span class="font-extrabold truncate text-white">${fasilName}</span>
              </div>
            </div>
          </div>

          ${tabNavHtml}
        `;
      }

      mainEl.innerHTML = `
        ${headerHtml}

        ${currentD2LkpdSession === 1 ? `
        <!-- ========================================== -->
        <!-- KONTEN SESI 1: LKPD AKPOL (5 SOAL ESAI) -->
        <!-- ========================================== -->
        <div id="contentLkpdD2S1" class="flex flex-col gap-4">
          ${!hasResumeAkpol ? `
            <div class="p-5 sm:p-6 rounded-3xl bg-amber-500/15 border-2 border-amber-400 text-amber-950 flex flex-col gap-3 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Prasyarat Belum Terpenuhi</span>
                  <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD AKPOL Masih Terkunci!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Anda belum membaca modul materi AKPOL atau belum menyimpan kesimpulan pemahaman materi AKPOL.
              </p>
              <div class="pt-1">
                <a href="materi.html?day=2&sesi=1" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all">
                  <span class="material-symbols-outlined text-base">menu_book</span>
                  <span>Buka &amp; Simpan Resume Modul AKPOL</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ` : ''}

          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-xs flex flex-col gap-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <span class="material-symbols-outlined text-xl">military_tech</span>
                </div>
                <div>
                  <span class="text-xs uppercase font-extrabold text-blue-700 tracking-wider">Sesi 1 • Kunjungan Pagi (09.00 – 12.00)</span>
                  <h3 class="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">5 Soal Esai Pemahaman AKPOL Semarang</h3>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800">Bobot: 25 Poin</span>
            </div>

            <!-- Soal 1: Visi AKPOL -->
            <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                1. Tuliskan rumusan Visi Akademi Kepolisian (AKPOL) yang menjadi cita-cita utama dalam pembentukan perwira Polri:
              </label>
              <textarea id="d2AkpolQ1" rows="3" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Tuliskan rumusan visi AKPOL secara lengkap..." class="w-full p-3 rounded-xl border border-blue-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q1 || '') : ''}</textarea>
            </div>

            <!-- Soal 2: Kepanjangan & Status AKPOL -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                2. Apa kepanjangan dari singkatan AKPOL, berada di bawah naungan lembaga polri apa, serta di kota mana kampus pusatnya berada?
              </label>
              <textarea id="d2AkpolQ2" rows="3" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Tuliskan kepanjangan, lembaga penaung (Lemdiklat Polri), dan kota lokasinya..." class="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q2 || '') : ''}</textarea>
            </div>

            <!-- Soal 3: Tingkatan Kepangkatan Taruna (Perkap 21/2010) -->
            <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                3. Berdasarkan Peraturan Kapolri (Perkap) No. 21 Tahun 2010, sebutkan secara urut 4 tingkatan kepangkatan Taruna AKPOL dari tingkat I (awal masuk) sampai dengan tingkat IV (kelulusan):
              </label>
              <textarea id="d2AkpolQ3" rows="3" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Tuliskan urutan pangkat: Bharatutar, Brigdatar, Brigtutar, Brigtar, serta pangkat saat dilantik kelulusan..." class="w-full p-3 rounded-xl border border-blue-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q3 || '') : ''}</textarea>
            </div>

            <!-- Soal 4: Nama Gubernur & Wagub AKPOL -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                4. Sebutkan nama lengkap beserta pangkat dan gelar resmi dari Gubernur AKPOL dan Wakil Gubernur AKPOL yang saat ini memimpin Akademi Kepolisian:
              </label>
              <textarea id="d2AkpolQ4" rows="3" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Tuliskan nama lengkap Gubernur dan Wagub beserta pangkat jenderal dan gelar..." class="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q4 || '') : ''}</textarea>
            </div>

            <!-- Soal 5: 5 Fasilitas Utama Kampus AKPOL -->
            <div class="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                5. Sebutkan dan jelaskan fungsi dari minimal 5 Fasilitas Utama yang terdapat di lingkungan Kampus Akademi Kepolisian (dari 9 fasilitas resmi web akpol.ac.id):
              </label>
              <textarea id="d2AkpolQ5" rows="4" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Sebutkan minimal 5 fasilitas (contoh: Smart Classroom, Lab Bahasa, Lab Cyber Crime, Kolam Renang Standar Internasional, Gedung Catur Prasetya, dsb.) beserta fungsinya..." class="w-full p-3 rounded-xl border border-blue-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q5 || '') : ''}</textarea>
            </div>
          </div>

          <!-- TOMBOL SIMPAN LKPD AKPOL -->
          <div class="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <a href="materi.html?day=2&sesi=1" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>Kembali ke Modul AKPOL</span>
            </a>

            ${isAkpolSubmitted ? `
              <div class="p-3 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 font-bold text-xs sm:text-sm flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-600">lock</span>
                <span>LKPD AKPOL Telah Dikirim &amp; Terkunci</span>
              </div>
              <a href="dokumentasi.html?day=2&sesi=1" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">photo_camera</span>
                <span>Lanjut ke Foto Dokumentasi AKPOL</span>
              </a>
            ` : (hasResumeAkpol ? `
              <button id="btnSaveLkpdAkpol" onclick="saveLkpdAkpol()" class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">save</span>
                <span>Simpan LKPD AKPOL &amp; Lanjut ke Foto</span>
              </button>
            ` : `
              <button disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-400 font-bold text-xs sm:text-sm cursor-not-allowed flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-base">lock</span>
                <span>Selesaikan Modul AKPOL Terlebih Dahulu</span>
              </button>
            `)}
          </div>
        </div>
        ` : `
        <!-- ========================================== -->
        <!-- KONTEN SESI 2: LKPD LAWANG SEWU (5 SOAL ESAI) -->
        <!-- ========================================== -->
        <div id="contentLkpdD2S2" class="flex flex-col gap-4">
          ${!hasFotoAkpol ? `
            <div class="p-5 sm:p-6 rounded-3xl bg-amber-500/15 border-2 border-amber-400 text-amber-950 flex flex-col gap-3 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                  <h3 class="text-base sm:text-lg font-black text-amber-950">LKPD Lawang Sewu Masih Terkunci!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Anda harus menyelesaikan seluruh rangkaian <strong>Sesi 1 (LKPD AKPOL &amp; Upload Foto Dokumentasi AKPOL)</strong> terlebih dahulu sebelum mengerjakan LKPD Lawang Sewu.
              </p>
              <div class="flex items-center gap-2 pt-1 flex-wrap">
                <button type="button" onclick="switchD2LkpdSession(1)" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-base">arrow_back</span>
                  <span>Buka LKPD AKPOL</span>
                </button>
                <a href="dokumentasi.html?day=2&sesi=1" class="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-base">photo_camera</span>
                  <span>Unggah Foto AKPOL</span>
                </a>
              </div>
            </div>
          ` : (!hasResumeLawang ? `
            <div class="p-5 sm:p-6 rounded-3xl bg-amber-500/15 border-2 border-amber-400 text-amber-950 flex flex-col gap-3 shadow-sm">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Prasyarat Modul Sesi 2</span>
                  <h3 class="text-base sm:text-lg font-black text-amber-950">Resume Modul Lawang Sewu Belum Disimpan!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Anda wajib membaca modul Lawang Sewu dan menyimpan kesimpulan pemahaman materi Lawang Sewu terlebih dahulu.
              </p>
              <div class="pt-1">
                <a href="materi.html?day=2&sesi=2" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all">
                  <span class="material-symbols-outlined text-base">menu_book</span>
                  <span>Buka &amp; Simpan Resume Lawang Sewu</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ` : '')}

          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col gap-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <span class="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div>
                  <span class="text-xs uppercase font-extrabold text-amber-700 tracking-wider">Sesi 2 • Kunjungan Siang (13.00 – 14.30)</span>
                  <h3 class="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">5 Soal Esai Cagar Budaya Lawang Sewu</h3>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900">Bobot: 25 Poin</span>
            </div>

            <!-- Soal 1: Kepanjangan NISM & Fungsi Awal -->
            <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                1. Apa kepanjangan dari NISM, dan apa fungsi utama gedung Lawang Sewu saat pertama kali dibangun pada masa Hindia Belanda?
              </label>
              <textarea id="d2LawangQ1" rows="3" ${isLawangSubmitted || !hasFotoAkpol || !hasResumeLawang ? 'disabled' : ''} placeholder="Tuliskan kepanjangan NISM dan perannya sebagai kantor pusat perkeretaapian..." class="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-medium">${savedLawang ? (savedLawang.q1 || '') : ''}</textarea>
            </div>

            <!-- Soal 2: Etimologi & Fakta Jumlah Pintu -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                2. Mengapa masyarakat Semarang menyebut gedung ini "Lawang Sewu" (Seribu Pintu), dan berapa jumlah daun pintu fisik yang sebenarnya berdasarkan data sejarah arsitektur?
              </label>
              <textarea id="d2LawangQ2" rows="3" ${isLawangSubmitted || !hasFotoAkpol || !hasResumeLawang ? 'disabled' : ''} placeholder="Jelaskan alasan sebutan Lawang Sewu dan jumlah fisik pintu sebenarnya (928 bidang pintu)..." class="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-medium">${savedLawang ? (savedLawang.q2 || '') : ''}</textarea>
            </div>

            <!-- Soal 3: Arsitek & Gaya Nieuwe Indische Bouwstijl -->
            <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                3. Sebutkan nama arsitek perancang gedung Lawang Sewu serta gaya arsitektur khas yang diterapkannya:
              </label>
              <textarea id="d2LawangQ3" rows="3" ${isLawangSubmitted || !hasFotoAkpol || !hasResumeLawang ? 'disabled' : ''} placeholder="Tuliskan arsitek (Prof. Jacob F. Klinkhamer & B.J. Ouëndag) serta gaya Nieuwe Indische Bouwstijl..." class="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-medium">${savedLawang ? (savedLawang.q3 || '') : ''}</textarea>
            </div>

            <!-- Soal 4: STEM Fisika Bangunan Tropis -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                4. Bagaimana para perancang Lawang Sewu menyiasati iklim panas Kota Semarang agar gedung tetap sejuk alami tanpa AC? Jelaskan minimal 2 rekayasa fisik bangunannya:
              </label>
              <textarea id="d2LawangQ4" rows="3" ${isLawangSubmitted || !hasFotoAkpol || !hasResumeLawang ? 'disabled' : ''} placeholder="Jelaskan prinsip ventilasi silang, plafon tinggi > 4 meter, atau ruang bawah tanah penampung air..." class="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-medium">${savedLawang ? (savedLawang.q4 || '') : ''}</textarea>
            </div>

            <!-- Soal 5: Heroisme Pertempuran Lima Hari AMKA -->
            <div class="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                5. Jelaskan peristiwa bersejarah yang pernah terjadi di Lawang Sewu pada bulan Oktober 1945 dan organisasi pemuda apa yang berjuang mempertahankan gedung tersebut:
              </label>
              <textarea id="d2LawangQ5" rows="3" ${isLawangSubmitted || !hasFotoAkpol || !hasResumeLawang ? 'disabled' : ''} placeholder="Jelaskan Pertempuran Lima Hari di Semarang melawan Kidō Butai dan perjuangan pemuda AMKA..." class="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-medium">${savedLawang ? (savedLawang.q5 || '') : ''}</textarea>
            </div>
          </div>

          <!-- TOMBOL SIMPAN LKPD LAWANG SEWU -->
          <div class="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <a href="materi.html?day=2&sesi=2" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>Kembali ke Modul Lawang Sewu</span>
            </a>

            ${isLawangSubmitted ? `
              <div class="p-3 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 font-bold text-xs sm:text-sm flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-600">lock</span>
                <span>LKPD Lawang Sewu Telah Dikirim &amp; Terkunci</span>
              </div>
              <a href="dokumentasi.html?day=2&sesi=2" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">photo_camera</span>
                <span>Lanjut ke Foto Dokumentasi Lawang Sewu</span>
              </a>
            ` : (hasFotoAkpol && hasResumeLawang ? `
              <button id="btnSaveLkpdLawang" onclick="saveLkpdLawang()" class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span class="material-symbols-outlined text-lg">save</span>
                <span>Simpan LKPD Lawang Sewu &amp; Lanjut ke Foto</span>
              </button>
            ` : `
              <button disabled class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-200 text-slate-400 font-bold text-xs sm:text-sm cursor-not-allowed flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-base">lock</span>
                <span>Tuntaskan Sesi 1 &amp; Modul Lawang Sewu Terlebih Dahulu</span>
              </button>
            `)}
          </div>
        </div>
        `}

        <!-- MODAL NOTIFIKASI BERHASIL DISIMPAN DAY 2 -->
        <div id="modalD2LkpdSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 opacity-0 pointer-events-none">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 flex flex-col gap-4 transform transition-all duration-300 scale-95">
            <div class="flex items-center gap-3">
              <div id="modalD2IconBox" class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span class="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <div class="flex flex-col">
                <span id="modalD2Subtitle" class="text-xs font-black uppercase text-blue-700 tracking-wider">LKPD Berhasil Disimpan</span>
                <h3 id="modalD2Title" class="text-base sm:text-lg font-black text-slate-900 leading-snug">LKPD AKPOL Tersimpan!</h3>
              </div>
            </div>

            <p id="modalD2Desc" class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Jawaban esai Anda telah tersimpan dengan aman di server. Langkah berikutnya adalah mengambil foto geotag di lokasi kunjungan.
            </p>

            <div class="flex flex-col gap-2.5 pt-2">
              <a id="modalD2NextBtn" href="dokumentasi.html?day=2&sesi=1" class="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center">
                <span class="material-symbols-outlined text-xl">photo_camera</span>
                <span id="modalD2NextText">Lanjut ke Foto Dokumentasi AKPOL</span>
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
              <button type="button" onclick="closeD2LkpdSuccessModal()" class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all text-center cursor-pointer">
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function switchD2LkpdSession(sesi) {
      currentD2LkpdSession = Number(sesi);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('sesi', String(sesi));
        window.history.replaceState(null, '', url.toString());
      } catch (e) {}

      renderFieldTripDay2LKPD(false, sesi);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function saveLkpdAkpol() {
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const cleanNisn = String(studentNisn).trim();
      const q1 = (document.getElementById('d2AkpolQ1') ? document.getElementById('d2AkpolQ1').value : '').trim();
      const q2 = (document.getElementById('d2AkpolQ2') ? document.getElementById('d2AkpolQ2').value : '').trim();
      const q3 = (document.getElementById('d2AkpolQ3') ? document.getElementById('d2AkpolQ3').value : '').trim();
      const q4 = (document.getElementById('d2AkpolQ4') ? document.getElementById('d2AkpolQ4').value : '').trim();
      const q5 = (document.getElementById('d2AkpolQ5') ? document.getElementById('d2AkpolQ5').value : '').trim();

      if (!q1 || !q2 || !q3 || !q4 || !q5) {
        FincestemCore.ui.toast('Harap lengkapi seluruh 5 butir soal esai LKPD AKPOL sebelum menyimpan!', 'warning');
        return;
      }

      const payload = {
        day: 2,
        session: 'akpol',
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        submitted: true,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btn = document.getElementById('btnSaveLkpdAkpol');
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan LKPD AKPOL...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day2_akpol_' + cleanNisn, JSON.stringify(payload));
          localStorage.setItem('fincestem_lkpd_ft_day2_' + cleanNisn, JSON.stringify(payload));
        } catch (e) {}

        if (FincestemCore.progress && cleanNisn) {
          FincestemCore.progress.submitTask(cleanNisn, 2, 'lkpd', payload);
        }

        FincestemCore.ui.toast('LKPD AKPOL berhasil disimpan! Silakan lanjut mengunggah foto geotag AKPOL.', 'success');

        // Buka modal sukses
        const modal = document.getElementById('modalD2LkpdSuccess');
        const iconBox = document.getElementById('modalD2IconBox');
        const sub = document.getElementById('modalD2Subtitle');
        const tit = document.getElementById('modalD2Title');
        const desc = document.getElementById('modalD2Desc');
        const nextBtn = document.getElementById('modalD2NextBtn');
        const nextText = document.getElementById('modalD2NextText');

        if (modal) {
          if (iconBox) iconBox.className = 'w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md';
          if (sub) { sub.textContent = 'Sesi 1 Tuntas'; sub.className = 'text-xs font-black uppercase text-blue-700 tracking-wider'; }
          if (tit) tit.textContent = 'LKPD AKPOL Berhasil Disimpan!';
          if (desc) desc.textContent = 'Kelima jawaban esai Anda telah tersimpan di server. Lanjutkan mengambil dan mengunggah Foto Dokumentasi Geotag AKPOL.';
          if (nextBtn) {
            nextBtn.href = 'dokumentasi.html?day=2&sesi=1';
            nextBtn.className = 'w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center';
          }
          if (nextText) nextText.textContent = 'Lanjut ke Foto Dokumentasi AKPOL';

          modal.classList.remove('opacity-0', 'pointer-events-none');
          modal.classList.add('opacity-100');
          const inner = modal.querySelector('div');
          if (inner) { inner.classList.remove('scale-95'); inner.classList.add('scale-100'); }
        }
      }, 400);
    }

    function saveLkpdLawang() {
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const cleanNisn = String(studentNisn).trim();
      const q1 = (document.getElementById('d2LawangQ1') ? document.getElementById('d2LawangQ1').value : '').trim();
      const q2 = (document.getElementById('d2LawangQ2') ? document.getElementById('d2LawangQ2').value : '').trim();
      const q3 = (document.getElementById('d2LawangQ3') ? document.getElementById('d2LawangQ3').value : '').trim();
      const q4 = (document.getElementById('d2LawangQ4') ? document.getElementById('d2LawangQ4').value : '').trim();
      const q5 = (document.getElementById('d2LawangQ5') ? document.getElementById('d2LawangQ5').value : '').trim();

      if (!q1 || !q2 || !q3 || !q4 || !q5) {
        FincestemCore.ui.toast('Harap lengkapi seluruh 5 butir soal esai LKPD Lawang Sewu sebelum menyimpan!', 'warning');
        return;
      }

      const payload = {
        day: 2,
        session: 'lawang_sewu',
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        submitted: true,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btn = document.getElementById('btnSaveLkpdLawang');
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan LKPD Lawang Sewu...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day2_lawang_' + cleanNisn, JSON.stringify(payload));
        } catch (e) {}

        if (FincestemCore.progress && cleanNisn) {
          FincestemCore.progress.submitTask(cleanNisn, 2, 'lkpd_lawang', payload);
        }

        FincestemCore.ui.toast('LKPD Lawang Sewu berhasil disimpan! Silakan lanjut mengunggah foto geotag Lawang Sewu.', 'success');

        // Buka modal sukses
        const modal = document.getElementById('modalD2LkpdSuccess');
        const iconBox = document.getElementById('modalD2IconBox');
        const sub = document.getElementById('modalD2Subtitle');
        const tit = document.getElementById('modalD2Title');
        const desc = document.getElementById('modalD2Desc');
        const nextBtn = document.getElementById('modalD2NextBtn');
        const nextText = document.getElementById('modalD2NextText');

        if (modal) {
          if (iconBox) iconBox.className = 'w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md';
          if (sub) { sub.textContent = 'Sesi 2 Tuntas'; sub.className = 'text-xs font-black uppercase text-amber-700 tracking-wider'; }
          if (tit) tit.textContent = 'LKPD Lawang Sewu Berhasil Disimpan!';
          if (desc) desc.textContent = 'Seluruh jawaban esai Lawang Sewu telah tersimpan. Langkah berikutnya adalah mengambil foto geotag di fasad Lawang Sewu.';
          if (nextBtn) {
            nextBtn.href = 'dokumentasi.html?day=2&sesi=2';
            nextBtn.className = 'w-full py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center';
          }
          if (nextText) nextText.textContent = 'Lanjut ke Foto Dokumentasi Lawang Sewu';

          modal.classList.remove('opacity-0', 'pointer-events-none');
          modal.classList.add('opacity-100');
          const inner = modal.querySelector('div');
          if (inner) { inner.classList.remove('scale-95'); inner.classList.add('scale-100'); }
        }
      }, 400);
    }

    function closeD2LkpdSuccessModal() {
      const modal = document.getElementById('modalD2LkpdSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      const inner = modal.querySelector('div');
      if (inner) { inner.classList.remove('scale-100'); inner.classList.add('scale-95'); }
    }


    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 3 (KOTA BATU)
    // Sesi 1: Wisata Petik Apel Mandiri Batu (Aktif)
    // Sesi 2: Jatim Park 1 - Science Center (Segera Hadir)
    // Sesi 3: Museum Angkut Kota Batu (Segera Hadir)
    // ==========================================
    function checkIsD3Sesi1Done(cleanNisn) {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
        const nisn = String(cleanNisn || u.nisn || u.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), u.nis, u.identifier, u.username].filter(Boolean);

        for (const id of ids) {
          // 0. Cek Dokumentasi Petik Apel
          if (localStorage.getItem("fincestem_dok_ft_day3_apel_" + id) === "true") return true;
          // 1. Cek LKPD Petik Apel (disubmit atau tersimpan)
          const lkpdRaw = localStorage.getItem('fincestem_lkpd_ft_day3_apel_' + id) || localStorage.getItem('fincestem_lkpd_ft_day3_' + id);
          if (lkpdRaw) {
            try {
              const p = JSON.parse(lkpdRaw);
              if (p && (p.submitted || p.varietas || p.applesEaten !== undefined)) return true;
            } catch(e) {}
          }
          // 2. Cek Asesmen Day 3
          const asesmenRaw = localStorage.getItem('fincestem_asesmen_ft_day3_' + id);
          if (asesmenRaw) return true;
          // 3. Cek Kesimpulan Modul Petik Apel
          const materiRaw = localStorage.getItem('fincestem_materi_ft_day3_apel_' + id);
          if (materiRaw) {
            try {
              const p = JSON.parse(materiRaw);
              if (p && (p.conclusion || p.text)) return true;
            } catch(e) {}
          }
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd'] || prog.task_map['3_materi'] || prog.task_map['3_asesmen']) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function checkIsD3Sesi2Done(cleanNisn) {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
        const nisn = String(cleanNisn || u.nisn || u.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), u.nis, u.identifier, u.username].filter(Boolean);

        for (const id of ids) {
          if (localStorage.getItem('fincestem_lkpd_ft_day3_jtp1_' + id)) return true;
          if (localStorage.getItem('fincestem_materi_ft_day3_jtp1_' + id)) return true;
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd_jtp1'] || prog.task_map['3_materi_jtp1']) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    let currentD3LkpdSession = 1;

    function renderFieldTripDay3LKPD(isReadOnly, targetSesi) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const studentName = activeUser.name || 'Peserta Field Trip';
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const studentClass = activeUser.class || activeUser.class_name || 'Kelas X';
      const fasilName = (FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
        ? FincestemCore.assignments.getClassFacilitator(studentClass)
        : (activeUser.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');
      const cleanNisn = String(studentNisn).trim();

      const urlParams = new URLSearchParams(window.location.search);
      const isS1Done = checkIsD3Sesi1Done(cleanNisn);
      const isS2Done = checkIsD3Sesi2Done(cleanNisn);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD3LkpdSession = Number(targetSesi);
      } else {
        const reqSesi = parseInt(urlParams.get('sesi'));
        if ((reqSesi === 2 || currentD3LkpdSession === 2) && isS1Done) {
          currentD3LkpdSession = 2;
        } else if ((reqSesi === 3 || currentD3LkpdSession === 3) && isS2Done) {
          currentD3LkpdSession = 3;
        } else {
          currentD3LkpdSession = 1;
        }
      }

      // Validasi proteksi sekuensial LKPD
      if (currentD3LkpdSession === 2 && !isS1Done) {
        currentD3LkpdSession = 1;
      } else if (currentD3LkpdSession === 3 && !isS2Done) {
        currentD3LkpdSession = isS1Done ? 2 : 1;
      }

      // Verifikasi Prasyarat Modul: Siswa wajib membaca modul & mengisi kesimpulan Sesi 1 Petik Apel
      let hasMateriApel = false;
      try {
        const localMateri = localStorage.getItem('fincestem_materi_ft_day3_apel_' + cleanNisn) ||
                            localStorage.getItem('fincestem_materi_ft_day3_' + cleanNisn);
        if (localMateri) {
          const parsed = JSON.parse(localMateri);
          if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
            hasMateriApel = true;
          }
        }
      } catch(e) {}

      // Ambil data LKPD yang tersimpan sebelumnya
      let saved = null;
      try {
        const raw = localStorage.getItem('fincestem_lkpd_ft_day3_apel_' + cleanNisn) ||
                    localStorage.getItem('fincestem_lkpd_ft_day3_' + cleanNisn);
        if (raw) {
          saved = JSON.parse(raw);
        }
      } catch(e) {}

      if (saved && (saved.submitted || saved.varietas || saved.applesEaten !== undefined)) {
        hasMateriApel = true;
      }

      const isSubmitted = !!(saved && saved.submitted);
      const isLockedByPrereq = false;
      const isFormLocked = isReadOnly || isSubmitted;
      const readOnlyAttr = isFormLocked ? 'disabled' : '';

      // 1. MENU TAB NAVIGASI UTAMA 3 SESI LKPD (DI ATAS)
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          <!-- TAB 1: PETIK APEL (SELALU TERBUKA) -->
          <button type="button" onclick="switchD3LkpdSession(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3LkpdSession === 1 ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40' : 'bg-slate-50 hover:bg-emerald-50 text-emerald-950 border border-emerald-300'}">
            <span class="material-symbols-outlined text-base ${currentD3LkpdSession === 1 ? 'text-amber-300' : 'text-emerald-600'}">nutrition</span>
            <span class="truncate">Sesi 1: LKPD Petik Apel</span>
            ${isSubmitted ? '<span class="text-[11px] text-emerald-200 font-bold ml-1">✓</span>' : (currentD3LkpdSession === 1 ? '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>' : '')}
          </button>

          <!-- TAB 2: JATIM PARK 1 (TERKUNCI / TERBUKA JIKA LKPD SESI 1 SELESAI) -->
          ${isS1Done ? `
            <button type="button" onclick="switchD3LkpdSession(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3LkpdSession === 2 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
              <span class="material-symbols-outlined text-base ${currentD3LkpdSession === 2 ? 'text-amber-300' : 'text-blue-600'}">science</span>
              <span class="truncate">Sesi 2: Jatim Park 1</span>
              ${isS2Done ? '<span class="text-[11px] text-blue-200 font-bold ml-1">✓</span>' : (currentD3LkpdSession === 2 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : '')}
            </button>
          ` : `
            <button type="button" onclick="handleLockedD3LkpdSessionClick(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" title="Sesi 2 terbuka setelah LKPD Sesi 1 selesai">
              <span class="material-symbols-outlined text-base text-slate-400">lock</span>
              <span class="truncate">Sesi 2: Jatim Park 1</span>
            </button>
          `}

          <!-- TAB 3: MUSEUM ANGKUT (TERKUNCI / TERBUKA JIKA LKPD SESI 2 SELESAI) -->
          ${isS2Done ? `
            <button type="button" onclick="switchD3LkpdSession(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD3LkpdSession === 3 ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-400/40' : 'bg-slate-50 hover:bg-purple-50 text-purple-950 border border-purple-200'}">
              <span class="material-symbols-outlined text-base ${currentD3LkpdSession === 3 ? 'text-amber-300' : 'text-purple-600'}">directions_car</span>
              <span class="truncate">Sesi 3: Museum Angkut</span>
              ${currentD3LkpdSession === 3 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : ''}
            </button>
          ` : `
            <button type="button" onclick="handleLockedD3LkpdSessionClick(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed" title="Sesi 3 terbuka setelah LKPD Sesi 2 selesai">
              <span class="material-symbols-outlined text-base text-slate-400">lock</span>
              <span class="truncate">Sesi 3: Museum Angkut</span>
            </button>
          `}
        </div>
      `;

      if (currentD3LkpdSession === 1) {
        // SESI 1: FORM LKPD PETIK APEL BATU
        mainEl.innerHTML = `
          <div class="flex flex-col gap-4 sm:gap-5">
            ${tabNavHtml}

            ${isLockedByPrereq ? `
              <!-- BANNER PERINGATAN PRASYARAT MODUL -->
              <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span class="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                    <h3 class="text-base font-extrabold text-amber-950">LKPD Petik Apel Day 3 Sesi 1 Masih Terkunci!</h3>
                  </div>
                </div>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Anda belum membaca <strong>Modul Belajar Day 3 Sesi 1 (Eksplorasi Agrobisnis &amp; Sains Apel Batu)</strong> atau belum menyimpan resume catatan pemahaman di bagian bawah modul.
                </p>
                <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a href="materi.html?day=3&sesi=1" class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all">
                    <span class="material-symbols-outlined text-lg">menu_book</span>
                    <span>Buka Modul Petik Apel Day 3 Sekarang</span>
                  </a>
                  <a href="dashboard.html" class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Kembali ke Beranda</span>
                  </a>
                </div>
              </div>
            ` : ''}

            <!-- BANNER IDENTITAS LKPD DAY 3 SESI 1 -->
            <div class="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3 border border-emerald-700/40">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-emerald-100 backdrop-blur-md">
                  Field Trip • Day 3 • Sesi 1
                </span>
                <span id="ftD3StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white'}">
                  ${isSubmitted ? '✓ Telah Dikirim / Selesai' : 'Lembar Kerja Riset Mandiri'}
                </span>
              </div>

              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                LKPD Eksplorasi Sains Hortikultura &amp; Agrobisnis Apel Batu
              </h2>
              <span class="text-xs sm:text-sm font-semibold text-emerald-200 leading-snug">
                Investigasi Terpadu: Sains Varietas Apel, Sensor GPS Smartphone, Rekayasa Pertanian, dan Perhitungan Konsumsi Finansial.
              </span>
              <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-emerald-200 font-semibold flex-wrap">
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>08.00 - 10.30 WIB</span>
                </span>
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">pin_drop</span>
                  <span>Kebun Apel Mandiri Batu</span>
                </span>
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span>${studentName} (${cleanNisn})</span>
                </span>
              </div>
            </div>

            <!-- FORM INVESTIGASI 4 PILAR FINCESTEM -->
            <form id="formFtDay3Lkpd" onsubmit="event.preventDefault();" class="flex flex-col gap-5 sm:gap-6">

              <!-- 1. PILAR SCIENCE: IDENTIFIKASI VARIETAS & CIRI FISIK APEL -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-emerald-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-emerald-600 text-2xl">biotech</span>
                  <span>1. Science (Sains Buah Apel): Varietas &amp; Karakteristik Fisik/Rasa</span>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-xs sm:text-sm font-bold text-slate-800">
                    A. Jenis varietas apel apa yang kamu petik dan makan langsung di kebun apel ini?
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                      <input type="radio" name="ftD3Varietas" value="Manalagi" class="accent-emerald-600" ${readOnlyAttr} ${(saved && saved.varietas === 'Manalagi') ? 'checked' : ''}>
                      <span>🍏 Apel Manalagi</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-rose-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-rose-50 has-[:checked]:border-rose-600 has-[:checked]:text-rose-950">
                      <input type="radio" name="ftD3Varietas" value="Rome Beauty" class="accent-rose-600" ${readOnlyAttr} ${(saved && saved.varietas === 'Rome Beauty') ? 'checked' : ''}>
                      <span>🍎 Rome Beauty</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-red-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-red-50 has-[:checked]:border-red-600 has-[:checked]:text-red-950">
                      <input type="radio" name="ftD3Varietas" value="Anna" class="accent-red-600" ${readOnlyAttr} ${(saved && saved.varietas === 'Anna') ? 'checked' : ''}>
                      <span>🍎 Apel Anna</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                      <input type="radio" name="ftD3Varietas" value="Campuran" class="accent-amber-600" ${readOnlyAttr} ${(saved && saved.varietas === 'Campuran') ? 'checked' : ''}>
                      <span>🍏🍎 Campuran (Mencicipi >1)</span>
                    </label>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="ftD3CiriFisik" class="text-xs sm:text-sm font-bold text-slate-800">
                    B. Deskripsikan ciri fisik dan karakteristik rasa apel yang kamu ketahui dari buah yang kamu makan:
                  </label>
                  <p class="text-[11.5px] text-slate-500 leading-relaxed">
                    Jelaskan warna kulit buah, tekstur renyah/empuknya daging buah, tingkat rasa manis atau asam segar, serta aroma khas yang kamu rasakan. (Perhatikan ciri apel masak: berwarna merah/kuning, baru dipetik terasa asam segar, dan lebih manis setelah disimpan 2–3 hari).
                  </p>
                  <textarea id="ftD3CiriFisik" rows="3" ${readOnlyAttr} class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400 ${isFormLocked ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : ''}" placeholder="Contoh: Apel yang saya petik kulitnya merah semburat kuning, daging buah renyah berair, rasanya ada asam segar khas baru dipetik dari pohon, sesuai dengan ciri apel yang masak di kebun...">${saved ? (saved.ciriFisik || '') : ''}</textarea>
                </div>
              </div>

              <!-- 2. PILAR TECHNOLOGY: SENSOR GPS & ALTIMETER DIGITAL SMARTPHONE -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div class="flex items-center gap-2 text-blue-950 font-black text-base sm:text-lg">
                    <span class="material-symbols-outlined text-blue-600 text-2xl">satellite_alt</span>
                    <span>2. Technology: Uji Sensor Satelit GPS &amp; Altimeter Digital Smartphone</span>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                    Otomatisasi Sensor HP
                  </span>
                </div>

                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Gunakan sensor satelit GPS dan altimeter digital di ponsel Anda untuk mendeteksi koordinat geografis dan membuktikan ketinggian lokasi kebun apel (≥800 mdpl).
                </p>

                <!-- Tombol 1-Klik Deteksi Sensor GPS Otomatis -->
                <div class="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2.5 text-xs text-blue-900 font-semibold">
                    <span class="material-symbols-outlined text-blue-600 text-2xl">my_location</span>
                    <div class="flex flex-col">
                      <span class="font-bold">Uji Pembacaan Sensor Satelit Sekarang:</span>
                      <span id="ftD3GpsStatusText" class="text-[11px] text-blue-700">Tekan tombol di samping untuk mengambil data posisi langsung dari sensor HP</span>
                    </div>
                  </div>
                  ${!isFormLocked ? `
                    <button type="button" onclick="detectD3PetikApelGps()" id="btnDetectD3Gps" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
                      <span class="material-symbols-outlined text-base">radar</span>
                      <span>Ambil Data Sensor GPS Otomatis</span>
                    </button>
                  ` : ''}
                </div>

                <!-- Input Koordinat & Elevasi Otomatis -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div class="flex flex-col gap-1">
                    <label class="font-bold text-slate-700">Latitude (Garis Lintang):</label>
                    <input type="text" id="ftD3GpsLat" value="${saved ? (saved.gpsLat || '') : ''}" ${readOnlyAttr} placeholder="-7.854..." class="p-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-blue-500 bg-slate-50">
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="font-bold text-slate-700">Longitude (Garis Bujur):</label>
                    <input type="text" id="ftD3GpsLng" value="${saved ? (saved.gpsLng || '') : ''}" ${readOnlyAttr} placeholder="112.523..." class="p-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-blue-500 bg-slate-50">
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="font-bold text-slate-700">Elevasi Altimeter (mdpl):</label>
                    <input type="text" id="ftD3GpsAlt" value="${saved ? (saved.gpsAlt || '') : ''}" ${readOnlyAttr} placeholder="± 950 mdpl" class="p-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-blue-500 bg-slate-50 font-bold text-blue-900">
                  </div>
                  <div class="flex flex-col gap-1">
                    <label class="font-bold text-slate-700">Akurasi Satelit GPS:</label>
                    <input type="text" id="ftD3GpsAcc" value="${saved ? (saved.gpsAccuracy || '') : ''}" ${readOnlyAttr} placeholder="Akurasi ± 5 meter" class="p-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-blue-500 bg-slate-50">
                  </div>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="ftD3AnalisisGps" class="text-xs sm:text-sm font-bold text-slate-800">
                    Analisis Pembuktian Ketinggian Dataran Tinggi (≥800 mdpl):
                  </label>
                  <textarea id="ftD3AnalisisGps" rows="2" ${readOnlyAttr} class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 ${isFormLocked ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : ''}" placeholder="Contoh: Dari pembacaan sensor GPS HP, kebun berada pada elevasi 965 mdpl. Hal ini membuktikan kebenaran hipotesis bahwa tanaman apel membutuhkan ketinggian di atas 800 mdpl agar beriklim sejuk...">${saved ? (saved.analisisGps || '') : ''}</textarea>
                </div>
              </div>

              <!-- 3. PILAR ENGINEERING: SISTEM REKAYASA BUDIDAYA PERTANIAN -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-amber-600 text-2xl">precision_manufacturing</span>
                  <span>3. Engineering: Sistem Rekayasa Budidaya Pertanian di Kebun Apel</span>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label for="ftD3SistemRekayasa" class="text-xs sm:text-sm font-bold text-slate-800">
                    Sistem rekayasa pertanian apa yang kalian dapatkan dan amati langsung di kebun apel ini?
                  </label>
                  <p class="text-[11.5px] text-slate-500 leading-relaxed">
                    Jelaskan cara kerja dan manfaat teknik rekayasa yang dilakukan petani (misalnya: pelengkungan cabang mendatar / <em>branch bending</em>, perompesan daun buatan / <em>defoliasi</em> untuk panen 2x setahun, atau teknik okulasi sambung pucuk).
                  </p>
                  <textarea id="ftD3SistemRekayasa" rows="4" ${readOnlyAttr} class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-slate-400 leading-relaxed ${isFormLocked ? 'bg-slate-100 text-slate-600 cursor-not-allowed' : ''}" placeholder="Contoh: Kami mengamati petani melakukan pelengkungan cabang (branch bending) dengan tali pengikat mendatar. Tujuannya memperlambat hormon auksin ke atas sehingga merangsang tunas bunga tumbuh merata di setiap cabang. Petani juga merompes daun secara manual setelah panen untuk menggantikan musim gugur alami...">${saved ? (saved.sistemRekayasa || '') : ''}</textarea>
                </div>
              </div>

              <!-- 4. PILAR MATHEMATICS: PERHITUNGAN KONSUMSI APEL & HARGA PER KILO -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div class="flex items-center gap-2 text-indigo-950 font-black text-base sm:text-lg">
                    <span class="material-symbols-outlined text-indigo-600 text-2xl">calculate</span>
                    <span>4. Mathematics: Perhitungan Konsumsi Apel &amp; Analisis Tiket Masuk</span>
                  </div>
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                    Standar Rasio: 1 kg ≈ 8 butir
                  </span>
                </div>

                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Masukkan jumlah apel yang kamu makan di dalam kebun dan harga per kilogram dari hasil wawancara ke petani kebun setempat:
                </p>

                <!-- Input Interaktif Matematika & Finansial -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                    <label for="ftD3ApplesEaten" class="font-bold text-slate-800">
                      Jumlah Butir Apel yang Kamu Makan di Kebun:
                    </label>
                    <div class="flex items-center gap-2">
                      <input type="number" min="0" max="50" id="ftD3ApplesEaten" oninput="calculateD3PetikApelMath()" value="${saved ? (saved.applesEaten !== undefined ? saved.applesEaten : 6) : 6}" ${readOnlyAttr} class="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold text-emerald-800 outline-none focus:border-indigo-500 bg-white">
                      <span class="text-slate-600 font-bold shrink-0">Butir</span>
                    </div>
                    <span class="text-[11px] text-slate-500">Estimasi praktis agrikultur: 1 kg rata-rata berisi 8 butir buah.</span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                    <label for="ftD3PricePerKg" class="font-bold text-slate-800">
                      Harga Per Kilogram Apel (Wawancara Petani):
                    </label>
                    <div class="flex items-center gap-2">
                      <span class="text-slate-600 font-bold shrink-0">Rp</span>
                      <input type="text" id="ftD3PricePerKg" oninput="formatRupiahInput(this); calculateD3PetikApelMath()" value="${saved ? (formatNumberId(saved.pricePerKg) || '35.000') : '35.000'}" ${readOnlyAttr} class="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 outline-none focus:border-indigo-500 bg-white">
                      <span class="text-slate-600 font-bold shrink-0">/ kg</span>
                    </div>
                    <span class="text-[11px] text-slate-500">Tanyakan langsung harga petik segar ke petani kebun di tempat (kisaran Rp 35.000 – Rp 40.000 / kg).</span>
                  </div>
                </div>

                <!-- Live Hasil Perhitungan Otomatis -->
                <div class="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col gap-3">
                  <span class="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-indigo-700 text-base">analytics</span>
                    Hasil Kalkulasi Otomatis Konsumsi Apel:
                  </span>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div class="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col">
                      <span class="text-slate-500 text-[11px]">Total Berat Apel Dimakan:</span>
                      <span id="ftD3CalcKg" class="text-base sm:text-lg font-black text-emerald-700">0,75 kg</span>
                      <span class="text-[10.5px] text-slate-400">Rumus: butir ÷ 8</span>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col">
                      <span class="text-slate-500 text-[11px]">Nilai Rupiah Buah Dimakan:</span>
                      <span id="ftD3CalcRupiah" class="text-base sm:text-lg font-black text-blue-900">Rp 26.250</span>
                      <span class="text-[10.5px] text-slate-400">Rumus: berat (kg) × harga</span>
                    </div>

                    <div class="bg-white p-3 rounded-xl border border-indigo-100 flex flex-col">
                      <span class="text-slate-500 text-[11px]">Tiket Masuk Kebun (Makan Sepuasnya):</span>
                      <span class="text-base sm:text-lg font-black text-slate-900">Rp 25.000</span>
                      <span class="text-[10.5px] text-slate-400">Per orang di lokasi</span>
                    </div>
                  </div>

                  <!-- Status Evaluasi Impas Tiket -->
                  <div id="ftD3StatusImpasBox" class="p-3 rounded-xl bg-white border border-indigo-300 text-xs flex items-center justify-between gap-2 flex-wrap">
                    <span id="ftD3StatusImpasText" class="font-extrabold text-indigo-950">
                      Evaluasi Titik Impas (BEP) Tiket Masuk:
                    </span>
                    <span id="ftD3StatusImpasBadge" class="px-2.5 py-1 rounded-lg text-[11px] font-black bg-blue-100 text-blue-900">
                      Menghitung...
                    </span>
                  </div>
                </div>

                
              </div>

              <!-- TOMBOL AKSI SIMPAN & SUBMIT LKPD -->
              ${!isFormLocked ? `
                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="button" onclick="saveDay3PetikApelLKPD(false)" class="flex-1 py-3.5 px-4 rounded-2xl bg-white border border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-black text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-lg">save</span>
                    <span>Simpan Sebagai Draft</span>
                  </button>

                  <button type="button" onclick="saveDay3PetikApelLKPD(true)" id="btnSubmitD3Lkpd" class="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-lg">send</span>
                    <span>Kirim Laporan LKPD Petik Apel</span>
                  </button>
                </div>
              ` : (isSubmitted ? `
                <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div class="flex items-center gap-2 text-xs font-bold">
                    <span class="material-symbols-outlined text-emerald-600 text-xl">verified</span>
                    <span>LKPD Day 3 Sesi 1 (Petik Apel) telah berhasil dikirimkan pada ${saved ? (saved.submittedAt || '') : 'hari ini'}.</span>
                  </div>
                  <a href="dokumentasi.html?day=3&sesi=1" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition-all flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-base">photo_camera</span>
                    <span>Lanjut ke Dokumentasi Foto Petik Apel &rarr;</span>
                  </a>
                </div>
              ` : '')}
            </form>
          </div>

          <!-- MODAL NOTIFIKASI SUKSES SUBMIT LKPD DAY 3 SESI 1 -->
          <div id="modalD3LkpdSuccess" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200 opacity-0 pointer-events-none">
            <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 transform transition-transform duration-200 scale-95">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-emerald-700 tracking-wider">Tahap 2 Selesai ✓</span>
                  <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">LKPD Petik Apel Berhasil Terkirim!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Data observasi varietas buah, pembacaan sensor GPS pegunungan, sistem rekayasa hortikultura, dan perhitungan konsumsi telah dicatat ke sistem.
              </p>
              <div class="flex flex-col gap-2 pt-2">
                <a href="dokumentasi.html?day=3&sesi=1" class="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center">
                  <span class="material-symbols-outlined text-lg">photo_camera</span>
                  <span>Lanjut ke Dokumentasi Foto Petik Apel &rarr;</span>
                </a>
                <button type="button" onclick="closeD3LkpdSuccessModal()" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all">
                  Tetap di Halaman LKPD
                </button>
              </div>
            </div>
          </div>
        `;

        // Jalankan kalkulasi awal matematika
        setTimeout(() => {
          calculateD3PetikApelMath();
        }, 100);

      } else if (currentD3LkpdSession === 2) {
        // SESI 2: JATIM PARK 1 - PREVIEW
        mainEl.innerHTML = `
          <div class="flex flex-col gap-4 sm:gap-5">
            ${tabNavHtml}
            <div class="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center text-center gap-3 py-12">
              <div class="w-14 h-14 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <span class="material-symbols-outlined text-3xl">science</span>
              </div>
              <h3 class="font-black text-lg sm:text-xl text-slate-900">
                LKPD Sesi 2: Jawa Timur Park 1 (Science Center)
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                Lembar kerja eksplorasi fisika terapan, sains interaktif, dan galeri budaya nusantara di Jatim Park 1 akan disiapkan pada tahap perancangan Sesi 2.
              </p>
              <div class="pt-2">
                <button type="button" onclick="switchD3LkpdSession(1)" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Kembali ke Sesi 1: LKPD Petik Apel</span>
                </button>
              </div>
            </div>
          </div>
        `;
      } else if (currentD3LkpdSession === 3) {
        // SESI 3: MUSEUM ANGKUT - PREVIEW
        mainEl.innerHTML = `
          <div class="flex flex-col gap-4 sm:gap-5">
            ${tabNavHtml}
            <div class="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center text-center gap-3 py-12">
              <div class="w-14 h-14 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-xs">
                <span class="material-symbols-outlined text-3xl">directions_car</span>
              </div>
              <h3 class="font-black text-lg sm:text-xl text-slate-900">
                LKPD Sesi 3: Museum Angkut Kota Batu
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
                Lembar kerja investigasi rekayasa alat transportasi dunia dan sejarah peradaban otomotif akan disiapkan pada tahap perancangan Sesi 3.
              </p>
              <div class="pt-2">
                <button type="button" onclick="switchD3LkpdSession(1)" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Kembali ke Sesi 1: LKPD Petik Apel</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }

    function switchD3LkpdSession(sesi) {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';
      const cleanNisn = String(studentNisn).trim();
      const isS1Done = checkIsD3Sesi1Done(cleanNisn);
      const isS2Done = checkIsD3Sesi2Done(cleanNisn);

      const target = Number(sesi);
      if (target === 2 && !isS1Done) {
        FincestemCore.ui.toast('Sesi 2 (Jatim Park 1) masih terkunci! Anda wajib menyelesaikan dan mengirimkan LKPD Sesi 1 terlebih dahulu.', 'warning');
        return;
      }
      if (target === 3 && !isS2Done) {
        FincestemCore.ui.toast('Sesi 3 (Museum Angkut) masih terkunci! Anda wajib menyelesaikan LKPD Sesi 2 terlebih dahulu.', 'warning');
        return;
      }

      currentD3LkpdSession = target;
      const urlParams = new URLSearchParams(window.location.search);
      const isReadOnly = urlParams.get('mode') === 'view';
      renderFieldTripDay3LKPD(isReadOnly, currentD3LkpdSession);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    function handleLockedD3LkpdSessionClick(sesi) {
      if (sesi === 2) {
        FincestemCore.ui.toast('LKPD Sesi 2 (Jatim Park 1) masih terkunci! Selesaikan dan kirimkan LKPD Sesi 1 Petik Apel terlebih dahulu.', 'warning');
      } else if (sesi === 3) {
        FincestemCore.ui.toast('LKPD Sesi 3 (Museum Angkut) masih terkunci! Selesaikan LKPD Sesi 2 Jatim Park 1 terlebih dahulu.', 'warning');
      }
    }

        function detectD3PetikApelGps() {
      const statusText = document.getElementById('ftD3GpsStatusText');
      const btn = document.getElementById('btnDetectD3Gps');

      if (!navigator.geolocation) {
        FincestemCore.ui.toast('Perangkat Anda tidak mendukung fitur Geolocation GPS.', 'error');
        return;
      }

      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-base animate-spin">refresh</span><span>Membaca Satelit...</span>';
        btn.classList.add('pointer-events-none', 'opacity-70');
      }
      if (statusText) statusText.textContent = 'Menghubungkan ke chip satelit GPS...';

      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const acc = Math.round(position.coords.accuracy || 5);
          let alt = position.coords.altitude ? Math.round(position.coords.altitude) : null;

          // Jika altitude null (umum di browser mobile), estimasi ketinggian pegunungan Batu
          if (!alt || isNaN(alt)) {
            alt = 965; // Ketinggian rata-rata kebun apel di Bumiaji / Tulungrejo Batu
          }

          const latInput = document.getElementById('ftD3GpsLat');
          const lngInput = document.getElementById('ftD3GpsLng');
          const altInput = document.getElementById('ftD3GpsAlt');
          const accInput = document.getElementById('ftD3GpsAcc');

          if (latInput) latInput.value = lat;
          if (lngInput) lngInput.value = lng;
          if (altInput) altInput.value = alt + ' mdpl (Dataran Tinggi)';
          if (accInput) accInput.value = '± ' + acc + ' meter';

          if (btn) {
            btn.innerHTML = '<span class="material-symbols-outlined text-base">check</span><span>GPS Terkoneksi</span>';
            btn.classList.remove('pointer-events-none', 'opacity-70');
          }
          if (statusText) statusText.textContent = `✓ Koordinat (${lat}, ${lng}) dan Elevasi ${alt} mdpl berhasil dideteksi!`;

          FincestemCore.ui.toast(`Sensor GPS terhubung! Posisi: ${lat}, ${lng} (${alt} mdpl)`, 'success');
        },
        function(error) {
          // Fallback jika GPS tidak diizinkan atau diuji di desktop
          const latInput = document.getElementById('ftD3GpsLat');
          const lngInput = document.getElementById('ftD3GpsLng');
          const altInput = document.getElementById('ftD3GpsAlt');
          const accInput = document.getElementById('ftD3GpsAcc');

          if (latInput && !latInput.value) latInput.value = '-7.868214';
          if (lngInput && !lngInput.value) lngInput.value = '112.527319';
          if (altInput && !altInput.value) altInput.value = '965 mdpl (Dataran Tinggi)';
          if (accInput && !accInput.value) accInput.value = '± 5 meter (Akurat)';

          if (btn) {
            btn.innerHTML = '<span class="material-symbols-outlined text-base">radar</span><span>Ambil Data Sensor GPS Otomatis</span>';
            btn.classList.remove('pointer-events-none', 'opacity-70');
          }
          if (statusText) statusText.textContent = 'Koordinat acuan kebun apel Batu dimuat (Izin GPS belum aktif).';
          FincestemCore.ui.toast('Koordinat referensi kebun apel Batu (965 mdpl) berhasil disinkronkan.', 'info');
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    }

    function calculateD3PetikApelMath() {
      const eatenInput = document.getElementById('ftD3ApplesEaten');
      const priceInput = document.getElementById('ftD3PricePerKg');
      if (!eatenInput || !priceInput) return;

      const apples = Math.max(0, parseInt(eatenInput.value) || 0);
      const pricePerKg = parseRupiah(priceInput.value) || 35000;

      // Rasio praktis: 1 kg = 8 butir
      const totalKg = Number((apples / 8).toFixed(2));
      const totalRupiah = Math.round(totalKg * pricePerKg);
      const ticketPrice = 25000;

      const kgEl = document.getElementById('ftD3CalcKg');
      const rupiahEl = document.getElementById('ftD3CalcRupiah');
      const impasBadge = document.getElementById('ftD3StatusImpasBadge');
      const impasBox = document.getElementById('ftD3StatusImpasBox');

      if (kgEl) kgEl.textContent = totalKg.toLocaleString('id-ID') + ' kg';
      if (rupiahEl) rupiahEl.textContent = 'Rp ' + totalRupiah.toLocaleString('id-ID');

      if (impasBadge && impasBox) {
        if (totalRupiah >= ticketPrice) {
          const surplus = totalRupiah - ticketPrice;
          impasBadge.className = 'px-2.5 py-1 rounded-lg text-[11px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300';
          impasBadge.innerHTML = `🎉 Impas &amp; Surplus Nilai Apel (+Rp ${surplus.toLocaleString('id-ID')})`;
          impasBox.className = 'p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs flex items-center justify-between gap-2 flex-wrap';
        } else {
          const gap = ticketPrice - totalRupiah;
          impasBadge.className = 'px-2.5 py-1 rounded-lg text-[11px] font-black bg-blue-100 text-blue-950 border border-blue-300';
          impasBadge.innerHTML = `ℹ️ Pengalaman Rekreasi (Konsumsi Rp ${totalRupiah.toLocaleString('id-ID')} dari tiket Rp 25.000)`;
          impasBox.className = 'p-3 rounded-xl bg-blue-50 border border-blue-300 text-xs flex items-center justify-between gap-2 flex-wrap';
        }
      }
    }

    function saveDay3PetikApelLKPD(isSubmit) {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';
      const cleanNisn = String(studentNisn).trim();

      const selectedVarietas = document.querySelector('input[name="ftD3Varietas"]:checked')?.value || '';
      const ciriFisik = (document.getElementById('ftD3CiriFisik')?.value || '').trim();
      const gpsLat = (document.getElementById('ftD3GpsLat')?.value || '').trim();
      const gpsLng = (document.getElementById('ftD3GpsLng')?.value || '').trim();
      const gpsAlt = (document.getElementById('ftD3GpsAlt')?.value || '').trim();
      const gpsAccuracy = (document.getElementById('ftD3GpsAcc')?.value || '').trim();
      const analisisGps = (document.getElementById('ftD3AnalisisGps')?.value || '').trim();
      const sistemRekayasa = (document.getElementById('ftD3SistemRekayasa')?.value || '').trim();
      const applesEaten = parseInt(document.getElementById('ftD3ApplesEaten')?.value) || 0;
      const pricePerKg = parseRupiah(document.getElementById('ftD3PricePerKg')?.value) || 24000;
      

      if (isSubmit) {
        if (!selectedVarietas) {
          FincestemCore.ui.toast('Pilih salah satu varietas apel yang kamu makan (Bagian 1A)!', 'warning');
          return;
        }
        if (!ciriFisik || ciriFisik.length < 15) {
          FincestemCore.ui.toast('Tuliskan deskripsi ciri fisik & rasa apel minimal 10-15 kata (Bagian 1B)!', 'warning');
          document.getElementById('ftD3CiriFisik')?.focus();
          return;
        }
        if (!gpsLat || !gpsLng) {
          FincestemCore.ui.toast('Tekan tombol Ambil Data Sensor GPS Otomatis (Bagian 2)!', 'warning');
          return;
        }
        if (!sistemRekayasa || sistemRekayasa.length < 20) {
          FincestemCore.ui.toast('Jelaskan sistem rekayasa pertanian yang kalian amati di kebun apel (Bagian 3)!', 'warning');
          document.getElementById('ftD3SistemRekayasa')?.focus();
          return;
        }
        
      }

      const totalKg = Number((applesEaten / 8).toFixed(2));
      const totalRupiah = Math.round(totalKg * pricePerKg);

      const payload = {
        day_number: 3,
        session: 1,
        location: 'Kebun Petik Apel Mandiri Batu',
        varietas: selectedVarietas,
        ciriFisik: ciriFisik,
        gpsLat: gpsLat,
        gpsLng: gpsLng,
        gpsAlt: gpsAlt,
        gpsAccuracy: gpsAccuracy,
        analisisGps: analisisGps,
        sistemRekayasa: sistemRekayasa,
        applesEaten: applesEaten,
        pricePerKg: pricePerKg,
        totalKg: totalKg,
        totalRupiah: totalRupiah,
        kesimpulanMath: '',
        submitted: !!isSubmit,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btnSubmit = document.getElementById('btnSubmitD3Lkpd');
      if (btnSubmit && isSubmit) {
        btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Mengirimkan Laporan...</span>';
        btnSubmit.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day3_apel_' + cleanNisn, JSON.stringify(payload));
          localStorage.setItem('fincestem_lkpd_ft_day3_' + cleanNisn, JSON.stringify(payload));
        } catch(e) {}

        if (FincestemCore.progress && cleanNisn) {
          FincestemCore.progress.submitTask(cleanNisn, 3, 'lkpd', payload);
        }

        if (isSubmit) {
          if (btnSubmit) {
            btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span><span>Laporan Terkirim</span>';
            btnSubmit.classList.remove('pointer-events-none', 'opacity-80');
          }
          const statusBadge = document.getElementById('ftD3StatusBadge');
          if (statusBadge) {
            statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-300 text-slate-950';
            statusBadge.textContent = '✓ Telah Dikirim / Selesai';
          }
          FincestemCore.ui.toast('LKPD Petik Apel Day 3 Sesi 1 berhasil dikirim! Mengarahkan ke Dokumentasi Foto...', 'success');
          showD3LkpdSuccessModal();
          setTimeout(() => {
            window.location.href = 'dokumentasi.html?day=3&sesi=1';
          }, 1200);
        } else {
          FincestemCore.ui.toast('Draft LKPD Petik Apel tersimpan.', 'info');
        }
      }, 400);
    }

    function showD3LkpdSuccessModal() {
      const modal = document.getElementById('modalD3LkpdSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) { inner.classList.remove('scale-95'); inner.classList.add('scale-100'); }
    }

    function closeD3LkpdSuccessModal() {
      const modal = document.getElementById('modalD3LkpdSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      const inner = modal.querySelector('div');
      if (inner) { inner.classList.remove('scale-100'); inner.classList.add('scale-95'); }
    }

    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 4 S.D. 7
    // ==========================================
    function renderFieldTripGenericLKPD(dayNum, isReadOnly) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const ftCfg = (FincestemCore.schedule && FincestemCore.schedule.getFieldTripDayConfig)
        ? FincestemCore.schedule.getFieldTripDayConfig(dayNum)
        : null;

      const title = ftCfg ? ftCfg.title : `Day ${dayNum}: Lembar Kerja Riset Lapangan Field Trip`;
      const theme = ftCfg ? ftCfg.theme : 'Investigasi 4 Pilar FINCESTEM Lapangan';
      const route = ftCfg ? ftCfg.route : 'Rute Resmi Ekspedisi Field Trip 2026';
      const date = ftCfg ? ftCfg.date_formatted : `Day ${dayNum}`;

      const studentName = activeUser.name || 'Peserta Field Trip';
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const studentClass = activeUser.class || activeUser.class_name || 'Kelas X';
      const fasilName = (FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
        ? FincestemCore.assignments.getClassFacilitator(studentClass)
        : (activeUser.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

      const cleanNisn = String(studentNisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const idVars = Array.from(new Set([cleanNisn, unpadded, padded, studentNisn])).filter(Boolean);

      // Ambil data yang tersimpan sebelumnya
      let saved = null;
      try {
        for (const id of idVars) {
          const stored = localStorage.getItem(`fincestem_lkpd_ft_day${dayNum}_` + id);
          if (stored) {
            saved = JSON.parse(stored);
            break;
          }
        }
      } catch (e) {}

      // Verifikasi Prasyarat Berjenjang: Siswa wajib membaca modul & mengisi kesimpulan Day X
      let hasMateri = false;
      try {
        const cleanNisn = String(studentNisn).trim();
        const unpadded = cleanNisn.replace(/^0+/, '');
        const localMateri = localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + cleanNisn) ||
                            localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + unpadded) ||
                            localStorage.getItem(`fincestem_materi_ft_day${dayNum}_` + ('0' + unpadded));
        if (localMateri) {
          const parsed = JSON.parse(localMateri);
          if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
            hasMateri = true;
          }
        }
      } catch (e) {}

      if (saved && (saved.submitted || saved.obsSains)) {
        hasMateri = true;
      }

      const isSubmitted = saved && saved.submitted;
      const isLockedByPrereq = !hasMateri;
      const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
      const readOnlyAttr = isFormLocked ? 'disabled' : '';

      mainEl.innerHTML = `
        ${isLockedByPrereq ? `
          <!-- BANNER PERINGATAN PRASYARAT BERJENJANG -->
          <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                <h3 class="text-base font-extrabold text-amber-950">LKPD Day ${dayNum} Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Anda belum membaca <strong>Modul Belajar Day ${dayNum} (${title})</strong> atau belum menyimpan kesimpulan pemahaman di bagian bawah modul.
            </p>
            <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a href="materi.html?day=${dayNum}" class="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all">
                <span class="material-symbols-outlined text-lg">menu_book</span>
                <span>Buka Modul Belajar Day ${dayNum} Sekarang</span>
              </a>
              <a href="dashboard.html" class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all">
                <span class="material-symbols-outlined text-lg">arrow_back</span>
                <span>Kembali ke Beranda</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- BANNER IDENTITAS LKPD DAY ${dayNum} -->
        <div class="bg-gradient-to-br from-teal-700 via-[#006a61] to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-teal-100 backdrop-blur-md">
              Field Trip • Day ${dayNum}
            </span>
            <span id="ftGenStatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-emerald-400 text-slate-950' : 'bg-white/20 text-white'}">
              ${isSubmitted ? '✓ Telah Dikirim (Bintang 5 Otomatis)' : 'Lembar Kerja Mandiri'}
            </span>
          </div>

          <h2 class="font-black text-xl sm:text-2xl leading-tight">
            ${title}
          </h2>
          <span class="text-xs sm:text-sm font-semibold text-teal-200 leading-snug">
            ${theme}
          </span>
          <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-teal-200 font-semibold flex-wrap">
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">calendar_today</span>
              <span>${date}</span>
            </span>
            <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
              <span class="material-symbols-outlined text-sm">alt_route</span>
              <span>${route}</span>
            </span>
          </div>

          <!-- KARTU DATA SISWA -->
          <div class="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span class="text-teal-200 block text-[10px] uppercase font-bold">Nama Peserta</span>
              <span class="font-bold text-white truncate block">${studentName}</span>
            </div>
            <div>
              <span class="text-teal-200 block text-[10px] uppercase font-bold">NISN</span>
              <span class="font-bold text-white truncate block">${studentNisn}</span>
            </div>
            <div>
              <span class="text-teal-200 block text-[10px] uppercase font-bold">Kelas</span>
              <span class="font-bold text-white truncate block">${studentClass}</span>
            </div>
            <div>
              <span class="text-teal-200 block text-[10px] uppercase font-bold">Fasilitator</span>
              <span class="font-bold text-white truncate block">${fasilName}</span>
            </div>
          </div>
        </div>

        <!-- FORM INVESTIGASI 4 PILAR TERPADU -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 text-teal-950 pb-2 border-b border-slate-100">
            <div class="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              <span class="material-symbols-outlined text-lg">science</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase text-teal-700 tracking-wider">Instrumen Lapangan</span>
              <h3 class="font-extrabold text-base text-on-surface">1. Observasi Sains &amp; Lingkungan Day ${dayNum}</h3>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Deskripsikan hasil pengamatan ilmiah Anda terkait fenomena alam, kondisi lingkungan, suhu udara, keanekaragaman hayati, atau materi sains di titik destinasi hari ini:
          </p>
          <textarea id="ftGenObsSains" ${readOnlyAttr} rows="4" class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all ${isLockedByPrereq ? 'bg-slate-100 cursor-not-allowed' : ''}" placeholder="Tuliskan temuan observasi sains & lingkungan di sini...">${(saved && saved.obsSains) || ''}</textarea>
        </div>

        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 text-teal-950 pb-2 border-b border-slate-100">
            <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              <span class="material-symbols-outlined text-lg">precision_manufacturing</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase text-blue-700 tracking-wider">Instrumen Lapangan</span>
              <h3 class="font-extrabold text-base text-on-surface">2. Rekayasa &amp; Teknologi (STEM) Day ${dayNum}</h3>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Jelaskan penerapan teknologi, alat transportasi, sistem mekanika/mesin produksi, atau inovasi rekayasa yang Anda temukan di lokasi riset:
          </p>
          <textarea id="ftGenTeknologi" ${readOnlyAttr} rows="4" class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all ${isLockedByPrereq ? 'bg-slate-100 cursor-not-allowed' : ''}" placeholder="Tuliskan analisis teknologi & rekayasa di sini...">${(saved && saved.teknologi) || ''}</textarea>
        </div>

        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 text-teal-950 pb-2 border-b border-slate-100">
            <div class="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              <span class="material-symbols-outlined text-lg">payments</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase text-amber-700 tracking-wider">Buku Kas Harian</span>
              <h3 class="font-extrabold text-base text-on-surface">3. Manajemen Finansial &amp; Pengeluaran Uang Saku Day ${dayNum}</h3>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-800">Total Pengeluaran Uang Saku Hari Ini (Rp):</label>
              <input id="ftGenBiaya" type="text" ${readOnlyAttr} value="${(saved && saved.biaya) || ''}" class="p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:border-amber-600 outline-none ${isLockedByPrereq ? 'bg-slate-100 cursor-not-allowed' : ''}" placeholder="Contoh: Rp 35.000">
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="font-bold text-slate-800">Rincian Pos Belanja &amp; Alokasi Hemat:</label>
              <input id="ftGenCatatanFin" type="text" ${readOnlyAttr} value="${(saved && saved.catatanFin) || ''}" class="p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:border-amber-600 outline-none ${isLockedByPrereq ? 'bg-slate-100 cursor-not-allowed' : ''}" placeholder="Contoh: Air mineral, suvenir kecil, obat pribadi">
            </div>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-4">
          <div class="flex items-center gap-2.5 text-teal-950 pb-2 border-b border-slate-100">
            <div class="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shrink-0">
              <span class="material-symbols-outlined text-lg">diversity_3</span>
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black uppercase text-purple-700 tracking-wider">Karakter &amp; Nilai Budaya</span>
              <h3 class="font-extrabold text-base text-on-surface">4. Kolaborasi Tim &amp; Kearifan Budaya Day ${dayNum}</h3>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Uraikan bagaimana kekompakan kelompok Anda, dinamika pembagian tugas, serta nilai etika/budaya lokal yang Anda pelajari hari ini:
          </p>
          <textarea id="ftGenBudaya" ${readOnlyAttr} rows="3" class="w-full p-4 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-900 leading-relaxed focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all ${isLockedByPrereq ? 'bg-slate-100 cursor-not-allowed' : ''}" placeholder="Tuliskan catatan kerja sama dan nilai budaya di sini...">${(saved && saved.budaya) || ''}</textarea>
        </div>

        <!-- TOMBOL SIMPAN & KIRIM LKPD -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <a href="dashboard.html" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 flex items-center justify-center gap-2 transition-all">
            <span class="material-symbols-outlined text-lg">arrow_back</span>
            <span>Kembali ke Beranda</span>
          </a>
          ${isSubmitted ? `
            <div class="flex items-center gap-2 p-3.5 rounded-2xl bg-teal-50 border border-teal-300 text-teal-950 font-bold text-xs sm:text-sm">
              <span class="material-symbols-outlined text-teal-600">lock</span>
              <span>LKPD Day ${dayNum} Telah Dikirim &amp; Terkunci</span>
            </div>
            <a href="dashboard.html?day=${dayNum}&task=asesmen" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2">
              <span>Lanjut ke Asesmen Day ${dayNum}</span>
              <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          ` : `
            <button id="saveFtLkpdGenBtn" type="button" onclick="saveFieldTripGenericLKPD(${dayNum})" ${readOnlyAttr} class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${isLockedByPrereq ? 'opacity-50 pointer-events-none' : ''}">
              <span class="material-symbols-outlined text-lg">save</span>
              <span>Simpan &amp; Kirim LKPD Day ${dayNum}</span>
            </button>
          `}
        </div>

        <!-- MODAL SUKSES PENGIRIMAN LKPD -->
        <div id="modalLkpdFtGenSuccess" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300 opacity-0 pointer-events-none">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 text-center transform scale-95 transition-transform duration-200">
            <div class="w-16 h-16 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
              <span class="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-xs font-black uppercase text-teal-800 tracking-wider">Tahap 2 Selesai</span>
              <h3 class="text-lg font-black text-slate-900 leading-tight">LKPD Day ${dayNum} Berhasil Disimpan!</h3>
              <p class="text-xs text-slate-600 leading-relaxed mt-1">
                Data lembar kerja Anda telah terekam. Tahap berikutnya adalah <strong>Kuis Asesmen Day ${dayNum} (Tahap 3)</strong>.
              </p>
            </div>
            <div class="flex flex-col gap-2 pt-2">
              <a href="dashboard.html?day=${dayNum}&task=asesmen" class="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-lg">fact_check</span>
                <span>Lanjut ke Kuis Asesmen Day ${dayNum}</span>
              </a>
              <button type="button" onclick="document.getElementById('modalLkpdFtGenSuccess').classList.add('opacity-0', 'pointer-events-none')" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all">
                Tetap di Halaman Ini
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function saveFieldTripGenericLKPD(dayNum) {
      const studentNisn = activeUser ? (activeUser.nisn || activeUser.identifier || '') : '';
      const obsSains = document.getElementById('ftGenObsSains')?.value.trim() || '';
      const teknologi = document.getElementById('ftGenTeknologi')?.value.trim() || '';
      const biaya = document.getElementById('ftGenBiaya')?.value.trim() || '';
      const catatanFin = document.getElementById('ftGenCatatanFin')?.value.trim() || '';
      const budaya = document.getElementById('ftGenBudaya')?.value.trim() || '';

      if (!obsSains || obsSains.length < 15) {
        FincestemCore.ui.toast(`Harap isi deskripsi observasi sains & lingkungan Day ${dayNum} minimal beberapa kalimat!`, 'warning');
        return;
      }

      const btn = document.getElementById('saveFtLkpdGenBtn');
      if (btn) {
        btn.classList.add('pointer-events-none', 'opacity-80');
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan Lembar Kerja...</span>';
      }

      const payload = {
        day: dayNum,
        submitted: true,
        obsSains: obsSains,
        teknologi: teknologi,
        biaya: biaya,
        catatanFin: catatanFin,
        budaya: budaya,
        submitted_at: new Date().toISOString()
      };

      try {
        const cleanNisn = String(studentNisn).trim();
        const unpadded = cleanNisn.replace(/^0+/, '');
        localStorage.setItem(`fincestem_lkpd_ft_day${dayNum}_` + cleanNisn, JSON.stringify(payload));
        localStorage.setItem(`fincestem_lkpd_ft_day${dayNum}_` + unpadded, JSON.stringify(payload));
        localStorage.setItem(`fincestem_lkpd_ft_day${dayNum}_` + ('0' + unpadded), JSON.stringify(payload));
      } catch (e) {}

      if (FincestemCore.progress && studentNisn) {
        FincestemCore.progress.submitTask(studentNisn, dayNum, 'lkpd', payload);
      }

      setTimeout(() => {
        if (btn) {
          btn.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span><span>Lembar Kerja Berhasil Disimpan</span>';
          btn.classList.remove('pointer-events-none', 'opacity-80');
        }

        const badge = document.getElementById('ftGenStatusBadge');
        if (badge) {
          badge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-slate-950';
          badge.textContent = '✓ Telah Dikirim (Bintang 5 Otomatis)';
        }

        FincestemCore.ui.toast(`LKPD Day ${dayNum} Field Trip berhasil disimpan!`, 'success');

        const modal = document.getElementById('modalLkpdFtGenSuccess');
        if (modal) {
          modal.classList.remove('opacity-0', 'pointer-events-none');
          modal.classList.add('opacity-100');
          const inner = modal.querySelector('div');
          if (inner) {
            inner.classList.remove('scale-95');
            inner.classList.add('scale-100');
          }
        }
      }, 400);
    }