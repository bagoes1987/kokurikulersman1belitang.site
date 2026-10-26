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

      // Fallback ambil jawaban LKPD Day 1 dari server progress jika local kosong (pindah HP / ganti perangkat)
      if (!saved) {
        try {
          let prog = window.currentStudentProgress;
          if (!prog) {
            for (const id of idVars) {
              const rawP = localStorage.getItem('fincestem_progress_' + id);
              if (rawP) { prog = JSON.parse(rawP); break; }
            }
          }
          if (prog && prog.task_map && prog.task_map['1_lkpd'] && prog.task_map['1_lkpd'].content) {
            let parsed = prog.task_map['1_lkpd'].content;
            if (typeof parsed === 'string') {
              try { parsed = JSON.parse(parsed); } catch(e) {}
            }
            if (parsed && typeof parsed === 'object') {
              saved = parsed;
              for (const id of idVars) {
                try { localStorage.setItem('fincestem_lkpd_ft_day1_' + id, JSON.stringify(saved)); } catch(e) {}
              }
            }
          }
        } catch (e) {}
      }

      // Verifikasi Prasyarat Berjenjang: Siswa wajib membaca modul & mengisi kesimpulan
      let hasMateri = false;
      try {
        for (const id of idVars) {
          const localMateri = localStorage.getItem('fincestem_materi_ft_day1_' + id);
          if (localMateri) {
            const parsed = JSON.parse(localMateri);
            if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
              hasMateri = true;
              break;
            }
          }
        }
      } catch (e) {}

      // Fallback periksa server progress jika kesimpulan belum terbaca di storage lokal (pindah HP)
      if (!hasMateri) {
        try {
          let prog = window.currentStudentProgress;
          if (!prog) {
            for (const id of idVars) {
              const rawP = localStorage.getItem('fincestem_progress_' + id);
              if (rawP) { prog = JSON.parse(rawP); break; }
            }
          }
          if (prog && prog.task_map && prog.task_map['1_materi']) {
            hasMateri = true;
            const mTask = prog.task_map['1_materi'];
            const cText = (mTask.content && typeof mTask.content === 'object') ? (mTask.content.conclusion || mTask.content.text) : mTask.content;
            if (cText) {
              const mObj = { conclusion: cText, savedAt: mTask.submitted_at || mTask.updated_at || new Date().toISOString() };
              for (const id of idVars) {
                try { localStorage.setItem('fincestem_materi_ft_day1_' + id, JSON.stringify(mObj)); } catch(e) {}
              }
            }
          }
        } catch (e) {}
      }

      // Jika LKPD sudah pernah diisi atau disimpan sebagian atau ada catatan jawaban, jangan dikunci kembali
      if (saved && (saved.total_saku || saved.totalSaku || saved.submitted || saved.plan_emergency || saved.q1 || saved.commitment)) {
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

      // Fallback progress server untuk Day 2 jika pindah HP
      try {
        let prog = window.currentStudentProgress;
        if (!prog) {
          const rawP = localStorage.getItem('fincestem_progress_' + cleanNisn);
          if (rawP) prog = JSON.parse(rawP);
        }
        if (prog && prog.task_map) {
          if (prog.task_map['2_materi']) hasResumeAkpol = true;
          if (prog.task_map['2_materi_lawang']) hasResumeLawang = true;
          if (!savedAkpol && prog.task_map['2_lkpd'] && prog.task_map['2_lkpd'].content) {
            let p = prog.task_map['2_lkpd'].content;
            if (typeof p === 'string') { try { p = JSON.parse(p); } catch(e) {} }
            if (p && typeof p === 'object') savedAkpol = p;
          }
          if (!savedLawang && prog.task_map['2_lkpd_lawang'] && prog.task_map['2_lkpd_lawang'].content) {
            let p = prog.task_map['2_lkpd_lawang'].content;
            if (typeof p === 'string') { try { p = JSON.parse(p); } catch(e) {} }
            if (p && typeof p === 'object') savedLawang = p;
          }
        }
      } catch (e) {}

      if (savedAkpol && (savedAkpol.submitted || savedAkpol.savedAt)) hasResumeAkpol = true;
      if (savedLawang && (savedLawang.submitted || savedLawang.savedAt)) hasResumeLawang = true;

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

            <!-- Soal 2: Kepanjangan & Tanggal Pendaftaran AKPOL 2026 -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <label class="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                2. Apa kepanjangan dari AKPOL dan kapan tanggal Pendaftaran Online serta Verifikasi Penerimaan Taruna AKPOL Tahun 2026?
              </label>
              <textarea id="d2AkpolQ2" rows="3" ${isAkpolSubmitted ? 'disabled' : ''} placeholder="Tuliskan kepanjangan dari AKPOL dan tanggal pendaftaran online serta verifikasi (contoh: Akademi Kepolisian, tanggal 9 Maret – 30 Maret 2026)..." class="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-medium">${savedAkpol ? (savedAkpol.q2 || '') : ''}</textarea>
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
          if (localStorage.getItem("fincestem_refleksi_ft_d3_sesi2_" + id)) return true;
          if (localStorage.getItem("fincestem_lkpd_ft_day3_jtp1_" + id)) return true;
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd_jtp1'] || prog.task_map['3_materi_jtp1'] || prog.task_map['3_refleksi_jtp1']) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function checkIsD3Sesi3Done(cleanNisn) {
      try {
        const u = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
        const nisn = String(cleanNisn || u.nisn || u.identifier || '').trim();
        const ids = [nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), u.nis, u.identifier, u.username].filter(Boolean);

        for (const id of ids) {
          if (localStorage.getItem("fincestem_refleksi_ft_d3_sesi3_" + id)) return true;
          if (localStorage.getItem("fincestem_dok_ft_day3_museum_" + id) === "true") return true;
          const lkpdRaw = localStorage.getItem("fincestem_lkpd_ft_day3_museum_" + id);
          if (lkpdRaw) {
            try {
              const p = JSON.parse(lkpdRaw);
              if (p && (p.submitted || p.namaKendaraan)) return true;
            } catch(e) {}
          }
        }

        if (window.FincestemCore && FincestemCore.progress && FincestemCore.progress.getStudentProgress) {
          const prog = FincestemCore.progress.getStudentProgress(nisn);
          if (prog && prog.task_map) {
            if (prog.task_map['3_lkpd_museum'] || prog.task_map['3_materi_museum'] || prog.task_map['3_refleksi_museum'] || prog.task_map['3_dok_museum']) return true;
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
      const isS3Done = checkIsD3Sesi3Done(cleanNisn);

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

      // Fallback progress server untuk Day 3 jika pindah HP
      if (!saved || !hasMateriApel) {
        try {
          let prog = window.currentStudentProgress;
          if (!prog) {
            const rawP = localStorage.getItem('fincestem_progress_' + cleanNisn);
            if (rawP) prog = JSON.parse(rawP);
          }
          if (prog && prog.task_map) {
            if (!hasMateriApel && prog.task_map['3_materi']) hasMateriApel = true;
            if (!saved && prog.task_map['3_lkpd'] && prog.task_map['3_lkpd'].content) {
              let p = prog.task_map['3_lkpd'].content;
              if (typeof p === 'string') { try { p = JSON.parse(p); } catch(e) {} }
              if (p && typeof p === 'object') saved = p;
            }
          }
        } catch (e) {}
      }

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
              ${isS3Done ? '<span class="text-[11px] text-purple-200 font-bold ml-1">✓</span>' : (currentD3LkpdSession === 3 ? '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>' : '')}
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
        // SESI 2: JATIM PARK 1 - WISATA BEBAS & DOKUMENTASI
        mainEl.innerHTML = `
          <div class="flex flex-col gap-4 sm:gap-5">
            ${tabNavHtml}

            <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-sm flex flex-col items-center justify-center text-center gap-4 py-12">
              <div class="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <span class="material-symbols-outlined text-3xl">attractions</span>
              </div>

              <div class="max-w-md flex flex-col gap-1.5">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-200 text-blue-900 inline-block mx-auto">
                  Sesi 2 • Waktu Wisata &amp; Rekreasi Bebas
                </span>
                <h3 class="font-black text-xl text-slate-900">
                  Eksplorasi Murni di Jawa Timur Park 1
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  Pada Sesi 2 ini, Anda tidak dibebani oleh lembar kerja tertulis (LKPD) perhitungan matematika. Anda diberikan kebebasan penuh untuk berwisata, mencoba aneka wahana sains interaktif, serta menikmati rekreasi bersama kelompok.
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-white border border-blue-200 max-w-md w-full text-left text-xs text-slate-700 flex flex-col gap-2">
                <div class="font-extrabold text-blue-950 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600 text-base">checklist</span>
                  <span>Aktivitas di Sesi 2 Jatim Park 1:</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-emerald-600 font-bold">1.</span>
                  <span>Mengeksplorasi wahana sains dan budaya nusantara dengan tertib.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-emerald-600 font-bold">2.</span>
                  <span>Mengambil 1 foto dokumentasi kegiatan keseruan bersama kelompok.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-emerald-600 font-bold">3.</span>
                  <span>Menuliskan refleksi singkat kesan rekreasi di menu Dokumentasi.</span>
                </div>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                <a href="dokumentasi.html?day=3&sesi=2" class="flex-1 py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center">
                  <span class="material-symbols-outlined text-lg">photo_camera</span>
                  <span>Buka Dokumentasi &amp; Refleksi Sesi 2 &rarr;</span>
                </a>
                <a href="materi.html?day=3&sesi=2" class="py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 flex items-center justify-center gap-1.5 transition-all">
                  <span class="material-symbols-outlined text-base">menu_book</span>
                  <span>Lihat Modul</span>
                </a>
              </div>
            </div>
          </div>
        `;
      } else if (currentD3LkpdSession === 3) {
        // SESI 3: LEMBAR INVESTIGASI STEM MUSEUM ANGKUT KOTA BATU
        let hasMateriMuseum = false;
        try {
          const localMateri = localStorage.getItem('fincestem_materi_ft_day3_museum_' + cleanNisn);
          if (localMateri) {
            const parsed = JSON.parse(localMateri);
            if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
              hasMateriMuseum = true;
            }
          }
        } catch(e) {}

        let savedMuseum = null;
        try {
          const raw = localStorage.getItem('fincestem_lkpd_ft_day3_museum_' + cleanNisn);
          if (raw) {
            savedMuseum = JSON.parse(raw);
          }
        } catch(e) {}

        if (savedMuseum && (savedMuseum.submitted || savedMuseum.namaKendaraan)) {
          hasMateriMuseum = true;
        }

        const isMuseumSubmitted = !!(savedMuseum && savedMuseum.submitted);
        const isMuseumLockedByPrereq = !hasMateriMuseum;
        const isMuseumFormLocked = isReadOnly || isMuseumLockedByPrereq || isMuseumSubmitted;
        const readOnlyMuseumAttr = isMuseumFormLocked ? 'disabled' : '';

        mainEl.innerHTML = `
          <div class="flex flex-col gap-4 sm:gap-5">
            ${tabNavHtml}

            ${isMuseumLockedByPrereq ? `
              <!-- BANNER PERINGATAN PRASYARAT MODUL -->
              <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span class="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                    <h3 class="text-base font-extrabold text-amber-950">LKPD Museum Angkut Sesi 3 Masih Terkunci!</h3>
                  </div>
                </div>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Anda belum membaca <strong>Modul Belajar Day 3 Sesi 3 (Eksplorasi STEM Transportasi Dunia di Museum Angkut)</strong> atau belum menyimpan resume catatan pemahaman di bagian bawah modul.
                </p>
                <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a href="materi.html?day=3&sesi=3" class="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all">
                    <span class="material-symbols-outlined text-lg">menu_book</span>
                    <span>Buka Modul Museum Angkut Day 3 Sesi 3</span>
                  </a>
                  <a href="dashboard.html" class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                    <span>Kembali ke Beranda</span>
                  </a>
                </div>
              </div>
            ` : ''}

            <!-- BANNER IDENTITAS LKPD DAY 3 SESI 3 -->
            <div class="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3 border border-purple-700/40">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-purple-100 backdrop-blur-md">
                  Field Trip • Day 3 • Sesi 3
                </span>
                <span id="ftD3MuseumStatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isMuseumSubmitted ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white'}">
                  ${isMuseumSubmitted ? '✓ Telah Dikirim / Selesai' : 'Lembar Investigasi STEM Lapangan'}
                </span>
              </div>

              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                LKPD Investigasi Rekayasa Otomotif &amp; STEM Transportasi
              </h2>
              <span class="text-xs sm:text-sm font-semibold text-purple-200 leading-snug">
                Investigasi Lapangan Terpadu: Analisis Aerodinamika Bodi, Teknologi Powertrain, Rekayasa Struktur Keselamatan (Crumple Zone), dan Kalkulasi Finansial BBM pada 1 Kendaraan Pilihan di Museum Angkut Kota Batu.
              </span>
              <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-purple-200 font-semibold flex-wrap">
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">schedule</span>
                  <span>13.30 - 16.30 WIB</span>
                </span>
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">pin_drop</span>
                  <span>Museum Angkut Kota Batu</span>
                </span>
                <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                  <span class="material-symbols-outlined text-sm">person</span>
                  <span>${studentName} (${cleanNisn})</span>
                </span>
              </div>
            </div>

            <!-- FORM INVESTIGASI 4 PILAR STEM TRANSPORTASI -->
            <form id="formFtDay3LkpdSesi3" onsubmit="event.preventDefault();" class="flex flex-col gap-5 sm:gap-6">

              <!-- BAGIAN 0: IDENTITAS KENDARAAN RISET PILIHAN -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-purple-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-purple-600 text-2xl">directions_car</span>
                  <span>Identifikasi 1 Kendaraan Pilihan Riset Lapangan</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label for="ftD3MuseumNamaKendaraan" class="text-xs sm:text-sm font-bold text-slate-800">
                      Nama / Model Kendaraan Pilihan: <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" id="ftD3MuseumNamaKendaraan" value="${(savedMuseum && savedMuseum.namaKendaraan) ? savedMuseum.namaKendaraan.replace(/"/g, '&quot;') : ''}" ${readOnlyMuseumAttr} placeholder="Contoh: Chrysler Windsor Limousine 1947 / Boeing 737-200 / Ford Model T" class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400">
                  </div>

                  <div class="flex flex-col gap-1.5">
                    <label for="ftD3MuseumZona" class="text-xs sm:text-sm font-bold text-slate-800">
                      Zona Lokasi di Museum Angkut: <span class="text-rose-500">*</span>
                    </label>
                    <select id="ftD3MuseumZona" ${readOnlyMuseumAttr} class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all bg-white">
                      <option value="">-- Pilih Zona Temuan --</option>
                      <option value="Hall Utama (Koleksi Kepresidenan & Sejarah RI)" ${(savedMuseum && savedMuseum.zona === 'Hall Utama (Koleksi Kepresidenan & Sejarah RI)') ? 'selected' : ''}>Hall Utama (Koleksi Kepresidenan &amp; Sejarah RI)</option>
                      <option value="Zona Edukasi (Bedah Mesin & Rekayasa Powertrain)" ${(savedMuseum && savedMuseum.zona === 'Zona Edukasi (Bedah Mesin & Rekayasa Powertrain)') ? 'selected' : ''}>Zona Edukasi (Bedah Mesin &amp; Rekayasa Powertrain)</option>
                      <option value="Zona Aviasi / Dirgantara (Boeing 737 & Helikopter Rooftop)" ${(savedMuseum && savedMuseum.zona === 'Zona Aviasi / Dirgantara (Boeing 737 & Helikopter Rooftop)') ? 'selected' : ''}>Zona Aviasi / Dirgantara (Boeing 737 Rooftop)</option>
                      <option value="Zona Sunda Kelapa / Batavia Kuno" ${(savedMuseum && savedMuseum.zona === 'Zona Sunda Kelapa / Batavia Kuno') ? 'selected' : ''}>Zona Sunda Kelapa / Batavia Kuno</option>
                      <option value="Zona Gangster & Broadway USA" ${(savedMuseum && savedMuseum.zona === 'Zona Gangster & Broadway USA') ? 'selected' : ''}>Zona Gangster &amp; Broadway USA</option>
                      <option value="Zona Mancanegara (Eropa, Inggris, Italia, Jerman)" ${(savedMuseum && savedMuseum.zona === 'Zona Mancanegara (Eropa, Inggris, Italia, Jerman)') ? 'selected' : ''}>Zona Mancanegara (Eropa, Inggris, Italia, Jerman)</option>
                    </select>
                  </div>

                  <div class="flex flex-col gap-1.5 md:col-span-2">
                    <label for="ftD3MuseumTahunAsal" class="text-xs sm:text-sm font-bold text-slate-800">
                      Perkiraan Tahun Pembuatan &amp; Negara Asal Pabrikan:
                    </label>
                    <input type="text" id="ftD3MuseumTahunAsal" value="${(savedMuseum && savedMuseum.tahunAsal) ? savedMuseum.tahunAsal.replace(/"/g, '&quot;') : ''}" ${readOnlyMuseumAttr} placeholder="Contoh: Tahun 1947 - Amerika Serikat / Tahun 1908 - Detroit, USA / Tahun 1968 - Boeing Seattle" class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400">
                  </div>
                </div>
              </div>

              <!-- 1. PILAR SCIENCE: AERODINAMIKA & GAYA HAMBAT (DRAG FORCE) -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-purple-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-purple-600 text-2xl">air</span>
                  <span>1. Science (Aerodinamika &amp; Hambatan Udara): Bentuk Bodi &amp; Koefisien Drag</span>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-xs sm:text-sm font-bold text-slate-800">
                    A. Klasifikasikan bentuk bodi kendaraan pilihan Anda: <span class="text-rose-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-purple-50 has-[:checked]:border-purple-600 has-[:checked]:text-purple-950">
                      <input type="radio" name="ftD3MuseumBentukBodi" value="Boxy / Bersudut Kaku" class="accent-purple-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.bentukBodi === 'Boxy / Bersudut Kaku') ? 'checked' : ''}>
                      <div>
                        <span>Boxy / Bersudut Kaku</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Klasik era awal (1900–1930), hambatan udara tinggi (Cd ≈ 0.7–0.9).</span>
                      </div>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-purple-50 has-[:checked]:border-purple-600 has-[:checked]:text-purple-950">
                      <input type="radio" name="ftD3MuseumBentukBodi" value="Curved / Streamline Melengkung" class="accent-purple-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.bentukBodi === 'Curved / Streamline Melengkung') ? 'checked' : ''}>
                      <div>
                        <span>Curved / Melengkung Aerodinamis</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Lekukan streamline, membelah aliran udara laminar (Cd ≈ 0.28–0.45).</span>
                      </div>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-purple-50 has-[:checked]:border-purple-600 has-[:checked]:text-purple-950">
                      <input type="radio" name="ftD3MuseumBentukBodi" value="Fuselage / Sayap Airfoil" class="accent-purple-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.bentukBodi === 'Fuselage / Sayap Airfoil') ? 'checked' : ''}>
                      <div>
                        <span>Fuselage / Sayap Airfoil (Aviasi)</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Bodi pesawat/helikopter, memanfaatkan Hukum Bernoulli untuk gaya angkat.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 pt-1">
                  <label for="ftD3MuseumAnalisisAero" class="text-xs sm:text-sm font-bold text-slate-800">
                    B. Analisis Sains Hambatan Aliran Udara (Aerodynamic Drag Force): <span class="text-rose-500">*</span>
                  </label>
                  <span class="text-[11px] text-slate-500">Jelaskan bagaimana bentuk bodi dan lekukan kendaraan pilihanmu mempengaruhi hambatan aliran udara saat melaju kencang, serta dampaknya terhadap efisiensi energi atau stabilitas laju kendaraan (minimal 15–20 kata):</span>
                  <textarea id="ftD3MuseumAnalisisAero" rows="3" ${readOnlyMuseumAttr} placeholder="Contoh: Mobil Chrysler 1947 ini memiliki kontur bodi melengkung pada fender roda depan dan atap membulat. Walaupun belum seringan mobil masa kini, lekukan ini membantu mengalirkan udara ke samping sehingga mengurangi turbulensi drag di bagian belakang mobil dan menjaga kestabilan bodi saat melaju kencang..." class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400">${(savedMuseum && savedMuseum.analisisAerodinamika) ? savedMuseum.analisisAerodinamika : ''}</textarea>
                </div>
              </div>

              <!-- 2. PILAR TECHNOLOGY: MESIN, TRANSMISI & KONVERSI ENERGI -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-blue-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-blue-600 text-2xl">precision_manufacturing</span>
                  <span>2. Technology (Teknologi Powertrain): Sumber Energi &amp; Sistem Penggerak</span>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-xs sm:text-sm font-bold text-slate-800">
                    A. Jenis Sumber Tenaga / Mesin Penggerak: <span class="text-rose-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600 has-[:checked]:text-blue-950">
                      <input type="radio" name="ftD3MuseumSumberTenaga" value="Mesin Pembakaran Dalam (ICE Bensin/Diesel)" class="accent-blue-600" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.sumberTenaga === 'Mesin Pembakaran Dalam (ICE Bensin/Diesel)') ? 'checked' : ''}>
                      <span>⛽ Mesin ICE (Bensin/Diesel)</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600 has-[:checked]:text-blue-950">
                      <input type="radio" name="ftD3MuseumSumberTenaga" value="Mesin Turbofan / Jet Aviasi" class="accent-blue-600" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.sumberTenaga === 'Mesin Turbofan / Jet Aviasi') ? 'checked' : ''}>
                      <span>✈️ Turbofan / Jet Aviasi</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600 has-[:checked]:text-blue-950">
                      <input type="radio" name="ftD3MuseumSumberTenaga" value="Mesin Uap Eksternal" class="accent-blue-600" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.sumberTenaga === 'Mesin Uap Eksternal') ? 'checked' : ''}>
                      <span>🚂 Mesin Uap Eksternal</span>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600 has-[:checked]:text-blue-950">
                      <input type="radio" name="ftD3MuseumSumberTenaga" value="Motor Listrik / Hybrid" class="accent-blue-600" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.sumberTenaga === 'Motor Listrik / Hybrid') ? 'checked' : ''}>
                      <span>⚡ Motor Listrik / Hybrid</span>
                    </label>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 pt-1">
                  <label for="ftD3MuseumAnalisisTekno" class="text-xs sm:text-sm font-bold text-slate-800">
                    B. Analisis Komparasi Teknologi Mesin &amp; Efisiensi Energi: <span class="text-rose-500">*</span>
                  </label>
                  <span class="text-[11px] text-slate-500">Bandingkan teknologi mesin kendaraan pilihanmu dengan kendaraan modern masa kini (misal efisiensi termal bahan bakar fosil vs motor listrik tanpa emisi, atau teknologi starter kunci/tombol vs engkol putar kuno):</span>
                  <textarea id="ftD3MuseumAnalisisTekno" rows="3" ${readOnlyMuseumAttr} placeholder="Contoh: Mesin bensin 6-silinder pada mobil ini masih mengandalkan karburator mekanik sederhana dengan efisiensi termal sekitar 20%, di mana 80% energi terbuang menjadi panas knalpot. Dibandingkan teknologi Electric Vehicle (EV) modern saat ini, motor listrik mampu mengubah lebih dari 85% energi baterai menjadi gerak putar roda tanpa menghasilkan emisi gas buang karbon monoksida..." class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400">${(savedMuseum && savedMuseum.analisisTeknologi) ? savedMuseum.analisisTeknologi : ''}</textarea>
                </div>
              </div>

              <!-- 3. PILAR ENGINEERING: SASIS, MATERIAL & CRUMPLE ZONE KESELAMATAN -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-emerald-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-emerald-600 text-2xl">construction</span>
                  <span>3. Engineering (Rekayasa Sasis &amp; Keselamatan): Struktur Bodi &amp; Zona Impak</span>
                </div>

                <div class="flex flex-col gap-2">
                  <label class="text-xs sm:text-sm font-bold text-slate-800">
                    A. Konstruksi Sasis &amp; Material Bodi: <span class="text-rose-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                      <input type="radio" name="ftD3MuseumKonstruksiSasis" value="Body-on-Frame Baja Solid Tebal" class="accent-emerald-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.konstruksiSasis === 'Body-on-Frame Baja Solid Tebal') ? 'checked' : ''}>
                      <div>
                        <span>Body-on-Frame Baja Solid Tebal</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Sasis tangga baja kaku & bodi tebal tanpa zona deformasi (klasik).</span>
                      </div>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                      <input type="radio" name="ftD3MuseumKonstruksiSasis" value="Monocoque dengan Crumple Zone Terintegrasi" class="accent-emerald-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.konstruksiSasis === 'Monocoque dengan Crumple Zone Terintegrasi') ? 'checked' : ''}>
                      <div>
                        <span>Monocoque + Crumple Zone</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Sasis terintegrasi bodi ringan dengan zona penyerap benturan.</span>
                      </div>
                    </label>
                    <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-start gap-2.5 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                      <input type="radio" name="ftD3MuseumKonstruksiSasis" value="Duralumin & Komposit Serat Karbon" class="accent-emerald-600 mt-0.5" ${readOnlyMuseumAttr} ${(savedMuseum && savedMuseum.konstruksiSasis === 'Duralumin & Komposit Serat Karbon') ? 'checked' : ''}>
                      <div>
                        <span>Duralumin &amp; Serat Karbon</span>
                        <span class="block text-[11px] font-normal text-slate-500 mt-0.5">Struktur aviasi/supercar, bobot ultra-ringan dengan kekuatan tarik tinggi.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 pt-1">
                  <label for="ftD3MuseumAnalisisRekayasa" class="text-xs sm:text-sm font-bold text-slate-800">
                    B. Analisis Rekayasa Keselamatan (Hukum Impuls Fisika I = F · Δt): <span class="text-rose-500">*</span>
                  </label>
                  <span class="text-[11px] text-slate-500">Berdasarkan hukum impuls (I = F · Δt = Δp), jelaskan mengapa mobil modern sengaja dirancang memiliki crumple zone (zona depan sengaja ringsek saat tabrakan), berbeda dengan mobil tua klasik yang sangat kaku namun berbahaya bagi organ tubuh penumpang:</span>
                  <textarea id="ftD3MuseumAnalisisRekayasa" rows="3" ${readOnlyMuseumAttr} placeholder="Contoh: Mobil klasik memiliki bodi baja tebal yang sangat kaku. Saat tabrakan, mobil tidak ringsek namun waktu henti (Δt) sangat singkat (mendadak), sehingga gaya tumbukan impak (F = Δp / Δt) yang dialami penumpang menjadi sangat besar dan mematikan. Sebaliknya, rekayasa crumple zone modern sengaja dibuat ringsek untuk memperpanjang waktu deselerasi (Δt), sehingga gaya benturan yang diteruskan ke kabin berkurang drastis..." class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400">${(savedMuseum && savedMuseum.analisisRekayasa) ? savedMuseum.analisisRekayasa : ''}</textarea>
                </div>
              </div>

              <!-- 4. PILAR MATHEMATICS: KALKULASI KEBUTUHAN BBM & FINANSIAL PERJALANAN -->
              <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-4">
                <div class="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                  <span class="material-symbols-outlined text-amber-600 text-2xl">calculate</span>
                  <span>4. Mathematics &amp; Finance: Kalkulasi Konsumsi BBM &amp; Anggaran Rombongan</span>
                </div>

                <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                  <strong>Studi Kasus Rute Ekspedisi Batu &rarr; Bromo:</strong>
                  Misalkan kendaraan pilihanmu ini diuji menempuh rute dari Kota Batu menuju kawasan Bromo Tengger Semeru dengan jarak tempuh pulang-pergi (PP) sejauh <strong>120 km</strong>. Kendaraan memiliki efisiensi konsumsi BBM rata-rata <strong>1 Liter : 8 km</strong>, dan harga bahan bakar non-subsidi saat ini <strong>Rp 12.500 per Liter</strong>.
                </div>

                <!-- KALKULATOR INTERAKTIF -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div class="flex flex-col gap-1">
                    <label for="ftD3MuseumDistance" class="text-[11px] font-bold text-slate-700">Jarak Tempuh PP (km):</label>
                    <input type="number" id="ftD3MuseumDistance" value="${(savedMuseum && savedMuseum.jarakKm) ? savedMuseum.jarakKm : 120}" ${readOnlyMuseumAttr} oninput="calculateD3MuseumMath()" class="p-2.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-amber-600 bg-white">
                  </div>

                  <div class="flex flex-col gap-1">
                    <label for="ftD3MuseumFuelEff" class="text-[11px] font-bold text-slate-700">Konsumsi (km / Liter):</label>
                    <input type="number" id="ftD3MuseumFuelEff" value="${(savedMuseum && savedMuseum.konsumsiKmL) ? savedMuseum.konsumsiKmL : 8}" ${readOnlyMuseumAttr} oninput="calculateD3MuseumMath()" class="p-2.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-amber-600 bg-white">
                  </div>

                  <div class="flex flex-col gap-1">
                    <label for="ftD3MuseumFuelPrice" class="text-[11px] font-bold text-slate-700">Harga BBM / Liter (Rp):</label>
                    <input type="text" id="ftD3MuseumFuelPrice" value="${(savedMuseum && savedMuseum.hargaBbm) ? Number(savedMuseum.hargaBbm).toLocaleString('id-ID') : '12.500'}" ${readOnlyMuseumAttr} oninput="formatRupiahInput(this); calculateD3MuseumMath();" class="p-2.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-amber-600 bg-white">
                  </div>

                  <div class="flex flex-col gap-1">
                    <label for="ftD3MuseumSplitCount" class="text-[11px] font-bold text-slate-700">Anggota Patungan (Orang):</label>
                    <input type="number" id="ftD3MuseumSplitCount" value="${(savedMuseum && savedMuseum.jumlahSiswa) ? savedMuseum.jumlahSiswa : 4}" ${readOnlyMuseumAttr} oninput="calculateD3MuseumMath()" class="p-2.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-amber-600 bg-white">
                  </div>
                </div>

                <!-- LIVE DISPLAY HASIL KALKULASI -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col gap-1">
                    <span class="text-[11px] font-extrabold text-purple-900 uppercase">Volume BBM Diperlukan</span>
                    <span id="ftD3MuseumCalcFuelLiters" class="font-black text-lg text-purple-950">15.0 Liter</span>
                    <span class="text-[10px] text-purple-700">Rumus: 120 km ÷ 8 km/L</span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-1">
                    <span class="text-[11px] font-extrabold text-amber-900 uppercase">Total Estimasi Biaya BBM</span>
                    <span id="ftD3MuseumCalcTotalCost" class="font-black text-lg text-amber-950">Rp 187.500</span>
                    <span class="text-[10px] text-amber-700">Rumus: 15 L × Rp 12.500</span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col gap-1">
                    <span class="text-[11px] font-extrabold text-emerald-900 uppercase">Patungan per Siswa</span>
                    <span id="ftD3MuseumCalcPerPerson" class="font-black text-lg text-emerald-950">Rp 46.875</span>
                    <span class="text-[10px] text-emerald-700">Rumus: Rp 187.500 ÷ 4 siswa</span>
                  </div>
                </div>

                <div class="flex flex-col gap-1.5 pt-1">
                  <label for="ftD3MuseumAnalisisFinansial" class="text-xs sm:text-sm font-bold text-slate-800">
                    Refleksi Matematis &amp; Strategi Efisiensi Finansial: <span class="text-rose-500">*</span>
                  </label>
                  <span class="text-[11px] text-slate-500">Jelaskan bagaimana perhitungan matematis di atas membantu rombongan merencanakan anggaran perjalanan secara transparan dan akuntabel (minimal 15 kata):</span>
                  <textarea id="ftD3MuseumAnalisisFinansial" rows="3" ${readOnlyMuseumAttr} placeholder="Contoh: Dengan jarak 120 km dan rasio 1:8, mobil memerlukan 15 liter bensin senilai Rp 187.500. Jika dibagi rata berempat, masing-masing siswa hanya perlu urunan sebesar Rp 46.875. Perhitungan matematis ini penting dalam literasi finansial agar pengeluaran bahan bakar transparan dan tidak menguras uang saku cadangan..." class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm leading-relaxed outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-slate-400">${(savedMuseum && savedMuseum.analisisFinansial) ? savedMuseum.analisisFinansial : ''}</textarea>
                </div>
              </div>

              <!-- TOMBOL SIMPAN & KIRIM LKPD SESI 3 -->
              ${isMuseumSubmitted ? `
                <div class="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-xl">verified</span>
                    </div>
                    <div>
                      <h4 class="font-black text-sm">LKPD Sesi 3 Museum Angkut Telah Disimpan &amp; Terkirim!</h4>
                      <p class="text-xs text-emerald-800">Terkirim pada: ${savedMuseum && savedMuseum.submittedAt ? savedMuseum.submittedAt : 'Selesai'}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 w-full sm:w-auto">
                    <a href="dokumentasi.html?day=3&sesi=3" class="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center">
                      <span class="material-symbols-outlined text-base">photo_camera</span>
                      <span>Lanjut ke Dokumentasi &amp; Refleksi &rarr;</span>
                    </a>
                  </div>
                </div>
              ` : `
                <div class="pt-2 flex flex-col sm:flex-row gap-3">
                  <button id="btnSubmitD3MuseumLkpd" type="button" onclick="saveDay3MuseumLKPD(true)" class="flex-1 py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-xl">send</span>
                    <span>Simpan &amp; Kirim LKPD Sesi 3 (Museum Angkut)</span>
                  </button>
                  <button type="button" onclick="saveDay3MuseumLKPD(false)" class="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-base">save</span>
                    <span>Simpan Draf Saja</span>
                  </button>
                </div>
              `}
            </form>

            <!-- MODAL SUKSES SUBMIT LKPD SESI 3 -->
            <div id="modalD3MuseumLkpdSuccess" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 opacity-0 pointer-events-none">
              <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-slate-100 transform transition-all duration-200 scale-95">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-black uppercase text-purple-700 tracking-wider">Tahap 2 Selesai ✓</span>
                    <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">LKPD Museum Angkut Berhasil Terkirim!</h3>
                  </div>
                </div>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Data investigasi rekayasa otomotif, sains aerodinamika, teknologi powertrain, analisis crumple zone, dan kalkulasi BBM telah tercatat ke sistem.
                </p>
                <div class="flex flex-col gap-2 pt-2">
                  <a href="dokumentasi.html?day=3&sesi=3" class="w-full py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center">
                    <span class="material-symbols-outlined text-lg">photo_camera</span>
                    <span>Lanjut ke Dokumentasi Foto &amp; Refleksi &rarr;</span>
                  </a>
                  <button type="button" onclick="closeD3MuseumLkpdSuccessModal()" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all">
                    Tetap di Halaman LKPD
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;

        // Jalankan kalkulasi awal matematika Museum
        setTimeout(() => {
          calculateD3MuseumMath();
        }, 100);
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
    // HANDLER KHUSUS LKPD DAY 3 SESI 3 (MUSEUM ANGKUT)
    // ==========================================
    function calculateD3MuseumMath() {
      const distanceInput = document.getElementById('ftD3MuseumDistance');
      const fuelEffInput = document.getElementById('ftD3MuseumFuelEff');
      const fuelPriceInput = document.getElementById('ftD3MuseumFuelPrice');
      const splitInput = document.getElementById('ftD3MuseumSplitCount');

      if (!distanceInput || !fuelEffInput || !fuelPriceInput) return;

      const distance = Math.max(1, parseFloat(distanceInput.value) || 120);
      const fuelEff = Math.max(1, parseFloat(fuelEffInput.value) || 8);
      const fuelPrice = Math.max(1000, parseRupiah(fuelPriceInput.value) || 12500);
      const splitCount = Math.max(1, parseInt(splitInput ? splitInput.value : 4) || 4);

      const totalFuelLiters = Number((distance / fuelEff).toFixed(1));
      const totalCost = Math.round(totalFuelLiters * fuelPrice);
      const costPerPerson = Math.round(totalCost / splitCount);

      const fuelLitersEl = document.getElementById('ftD3MuseumCalcFuelLiters');
      const totalCostEl = document.getElementById('ftD3MuseumCalcTotalCost');
      const costPerPersonEl = document.getElementById('ftD3MuseumCalcPerPerson');

      if (fuelLitersEl) fuelLitersEl.textContent = totalFuelLiters.toLocaleString('id-ID') + ' Liter';
      if (totalCostEl) totalCostEl.textContent = 'Rp ' + totalCost.toLocaleString('id-ID');
      if (costPerPersonEl) costPerPersonEl.textContent = 'Rp ' + costPerPerson.toLocaleString('id-ID');
    }

    function saveDay3MuseumLKPD(isSubmit) {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';
      const cleanNisn = String(studentNisn).trim();

      const namaKendaraan = (document.getElementById('ftD3MuseumNamaKendaraan')?.value || '').trim();
      const zona = (document.getElementById('ftD3MuseumZona')?.value || '').trim();
      const tahunAsal = (document.getElementById('ftD3MuseumTahunAsal')?.value || '').trim();
      const bentukBodi = document.querySelector('input[name="ftD3MuseumBentukBodi"]:checked')?.value || '';
      const analisisAero = (document.getElementById('ftD3MuseumAnalisisAero')?.value || '').trim();
      const sumberTenaga = document.querySelector('input[name="ftD3MuseumSumberTenaga"]:checked')?.value || '';
      const analisisTekno = (document.getElementById('ftD3MuseumAnalisisTekno')?.value || '').trim();
      const konstruksiSasis = document.querySelector('input[name="ftD3MuseumKonstruksiSasis"]:checked')?.value || '';
      const analisisRekayasa = (document.getElementById('ftD3MuseumAnalisisRekayasa')?.value || '').trim();
      const distance = parseFloat(document.getElementById('ftD3MuseumDistance')?.value) || 120;
      const fuelEff = parseFloat(document.getElementById('ftD3MuseumFuelEff')?.value) || 8;
      const fuelPrice = parseRupiah(document.getElementById('ftD3MuseumFuelPrice')?.value) || 12500;
      const splitCount = parseInt(document.getElementById('ftD3MuseumSplitCount')?.value) || 4;
      const analisisFinansial = (document.getElementById('ftD3MuseumAnalisisFinansial')?.value || '').trim();

      if (isSubmit) {
        if (!namaKendaraan || namaKendaraan.length < 3) {
          FincestemCore.ui.toast('Tuliskan nama/model kendaraan pilihan Anda di Bagian Identifikasi!', 'warning');
          document.getElementById('ftD3MuseumNamaKendaraan')?.focus();
          return;
        }
        if (!zona) {
          FincestemCore.ui.toast('Pilih salah satu zona temuan di Museum Angkut!', 'warning');
          document.getElementById('ftD3MuseumZona')?.focus();
          return;
        }
        if (!bentukBodi) {
          FincestemCore.ui.toast('Pilih salah satu klasifikasi bentuk bodi kendaraan (Pilar 1A)!', 'warning');
          return;
        }
        if (!analisisAero || analisisAero.length < 15) {
          FincestemCore.ui.toast('Tuliskan analisis aerodinamika & drag force minimal 15 kata (Pilar 1B)!', 'warning');
          document.getElementById('ftD3MuseumAnalisisAero')?.focus();
          return;
        }
        if (!sumberTenaga) {
          FincestemCore.ui.toast('Pilih jenis sumber tenaga/mesin penggerak (Pilar 2A)!', 'warning');
          return;
        }
        if (!analisisTekno || analisisTekno.length < 15) {
          FincestemCore.ui.toast('Tuliskan analisis komparasi teknologi mesin minimal 15 kata (Pilar 2B)!', 'warning');
          document.getElementById('ftD3MuseumAnalisisTekno')?.focus();
          return;
        }
        if (!konstruksiSasis) {
          FincestemCore.ui.toast('Pilih konstruksi sasis & material bodi kendaraan (Pilar 3A)!', 'warning');
          return;
        }
        if (!analisisRekayasa || analisisRekayasa.length < 15) {
          FincestemCore.ui.toast('Tuliskan analisis rekayasa keselamatan crumple zone minimal 15 kata (Pilar 3B)!', 'warning');
          document.getElementById('ftD3MuseumAnalisisRekayasa')?.focus();
          return;
        }
        if (!analisisFinansial || analisisFinansial.length < 15) {
          FincestemCore.ui.toast('Tuliskan refleksi matematis & efisiensi finansial minimal 15 kata (Pilar 4)!', 'warning');
          document.getElementById('ftD3MuseumAnalisisFinansial')?.focus();
          return;
        }
      }

      const totalFuelLiters = Number((distance / fuelEff).toFixed(1));
      const totalCost = Math.round(totalFuelLiters * fuelPrice);
      const costPerPerson = Math.round(totalCost / splitCount);

      const payload = {
        day_number: 3,
        session: 3,
        location: 'Museum Angkut Kota Batu',
        namaKendaraan,
        zona,
        tahunAsal,
        bentukBodi,
        analisisAerodinamika: analisisAero,
        sumberTenaga,
        analisisTeknologi: analisisTekno,
        konstruksiSasis,
        analisisRekayasa,
        jarakKm: distance,
        konsumsiKmL: fuelEff,
        hargaBbm: fuelPrice,
        jumlahSiswa: splitCount,
        totalLiter: totalFuelLiters,
        totalBiaya: totalCost,
        biayaPerSiswa: costPerPerson,
        analisisFinansial,
        submitted: !!isSubmit,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btnSubmit = document.getElementById('btnSubmitD3MuseumLkpd');
      if (btnSubmit && isSubmit) {
        btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Mengirimkan Laporan...</span>';
        btnSubmit.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day3_museum_' + cleanNisn, JSON.stringify(payload));
        } catch(e) {}

        if (FincestemCore.progress && cleanNisn) {
          FincestemCore.progress.submitTask(cleanNisn, 3, 'lkpd_museum', payload);
        }

        if (isSubmit) {
          if (btnSubmit) {
            btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span><span>Laporan Terkirim</span>';
            btnSubmit.classList.remove('pointer-events-none', 'opacity-80');
          }
          const statusBadge = document.getElementById('ftD3MuseumStatusBadge');
          if (statusBadge) {
            statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-300 text-slate-950';
            statusBadge.textContent = '✓ Telah Dikirim / Selesai';
          }
          FincestemCore.ui.toast('LKPD Museum Angkut Sesi 3 berhasil dikirim! Mengarahkan ke Dokumentasi & Refleksi Kendaraan...', 'success');
          showD3MuseumLkpdSuccessModal();
          setTimeout(() => {
            window.location.href = 'dokumentasi.html?day=3&sesi=3';
          }, 1200);
        } else {
          FincestemCore.ui.toast('Draft LKPD Museum Angkut tersimpan.', 'info');
        }
      }, 400);
    }

    function showD3MuseumLkpdSuccessModal() {
      const modal = document.getElementById('modalD3MuseumLkpdSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeD3MuseumLkpdSuccessModal() {
      const modal = document.getElementById('modalD3MuseumLkpdSuccess');
      if (!modal) return;
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100');
    }

    window.calculateD3MuseumMath = calculateD3MuseumMath;
    window.saveDay3MuseumLKPD = saveDay3MuseumLKPD;
    window.showD3MuseumLkpdSuccessModal = showD3MuseumLkpdSuccessModal;
    window.closeD3MuseumLkpdSuccessModal = closeD3MuseumLkpdSuccessModal;


    // ==========================================
    
    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 4: GUNUNG BROMO (EXPLORATION & CULTURE)
    // ==========================================
    function renderFieldTripDay4LKPD(isReadOnly) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const studentName = activeUser.name || 'Peserta Field Trip';
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const cleanNisn = String(studentNisn).trim();

      // 1. Cek prasyarat kesimpulan modul Day 4
      let hasMateri = false;
      try {
        const localMateri = localStorage.getItem('fincestem_materi_ft_day4_' + cleanNisn);
        if (localMateri) {
          const parsed = JSON.parse(localMateri);
          if (parsed && (parsed.conclusion || parsed.text || parsed.content)) {
            hasMateri = true;
          }
        }
      } catch(e) {}

      // 2. Ambil data LKPD yang tersimpan sebelumnya
      let saved = null;
      try {
        const raw = localStorage.getItem('fincestem_lkpd_ft_day4_' + cleanNisn);
        if (raw) {
          saved = JSON.parse(raw);
        }
      } catch(e) {}

      // Fallback progress server untuk Day 4 jika pindah HP
      if (!saved || !hasMateri) {
        try {
          let prog = window.currentStudentProgress;
          if (!prog) {
            const rawP = localStorage.getItem('fincestem_progress_' + cleanNisn);
            if (rawP) prog = JSON.parse(rawP);
          }
          if (prog && prog.task_map) {
            if (!hasMateri && prog.task_map['4_materi']) hasMateri = true;
            if (!saved && prog.task_map['4_lkpd'] && prog.task_map['4_lkpd'].content) {
              let p = prog.task_map['4_lkpd'].content;
              if (typeof p === 'string') { try { p = JSON.parse(p); } catch(e) {} }
              if (p && typeof p === 'object') saved = p;
            }
          }
        } catch (e) {}
      }

      if (saved && (saved.submitted || saved.spots || saved.suhu)) {
        hasMateri = true;
      }

      const isSubmitted = !!(saved && saved.submitted);
      const isLockedByPrereq = !hasMateri;
      const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
      const readOnlyAttr = isFormLocked ? 'disabled' : '';

      const savedSpots = (saved && Array.isArray(saved.spots)) ? saved.spots : [];

      mainEl.innerHTML = `
        <div class="flex flex-col gap-4 sm:gap-5">
          ${isLockedByPrereq ? `
            <!-- BANNER PERINGATAN PRASYARAT MODUL -->
            <div class="bg-amber-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 flex flex-col gap-3 shadow-sm animate-pulse-once">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-amber-800 tracking-wider">Aktivitas Berurutan (Prasyarat Wajib)</span>
                  <h3 class="text-base font-extrabold text-amber-950">LKPD Day 4 Bromo Masih Terkunci!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Anda belum membaca <strong>Modul Belajar Day 4 (Eksplorasi Bentang Alam Kaldera Tengger &amp; Etnografi Budaya Suku Tengger)</strong> atau belum menyimpan resume catatan pemahaman di bagian bawah modul.
              </p>
              <div class="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a href="materi.html?day=4" class="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all">
                  <span class="material-symbols-outlined text-lg">menu_book</span>
                  <span>Buka Modul Bromo Day 4 Sekarang</span>
                </a>
                <a href="dashboard.html" class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 transition-all">
                  <span class="material-symbols-outlined text-lg">arrow_back</span>
                  <span>Kembali ke Beranda</span>
                </a>
              </div>
            </div>
          ` : ''}

          <!-- BANNER IDENTITAS LKPD DAY 4 -->
          <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-3 border border-amber-600/40">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                Field Trip • Day 4 • Exploration &amp; Culture
              </span>
              <span id="ftD4StatusBadge" class="px-3 py-1 rounded-full text-xs font-bold ${isSubmitted ? 'bg-amber-300 text-slate-950' : 'bg-white/20 text-white'}">
                ${isSubmitted ? '✓ Telah Dikirim / Selesai' : 'Lembar Observasi Lapangan'}
              </span>
            </div>

            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD Eksplorasi Bentang Alam Kaldera &amp; Etnografi Suku Tengger
            </h2>
            <span class="text-xs sm:text-sm font-semibold text-amber-200 leading-snug">
              Investigasi Lapangan Sederhana: Observasi Kerucut Pascakaldera, Hamparan Laut Pasir 2.100 mdpl, Flora Endemik TNBTS, serta Kearifan Tradisi Suku Tengger.
            </span>
            <div class="flex items-center gap-2 pt-2 border-t border-white/15 text-xs text-amber-200 font-semibold flex-wrap">
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>03.30 - Selesai WIB</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">landscape</span>
                <span>Kawasan Bromo Tengger Semeru</span>
              </span>
              <span class="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl">
                <span class="material-symbols-outlined text-sm">person</span>
                <span>${studentName} (${cleanNisn})</span>
              </span>
            </div>
          </div>

          <!-- FORM INVESTIGASI 2 PILAR: EXPLORATION & CULTURE -->
          <form id="formFtDay4Lkpd" onsubmit="event.preventDefault();" class="flex flex-col gap-5 sm:gap-6">

            <!-- BAGIAN 1: PILAR EXPLORATION -->
            <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-5">
              <div class="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                <span class="material-symbols-outlined text-amber-600 text-2xl">explore</span>
                <span>Bagian 1: Pilar Exploration (Jelajah Alam Bromo &amp; TNBTS)</span>
              </div>

              <!-- SOAL 1: CEKLIS LOKASI BENTANG ALAM -->
              <div class="flex flex-col gap-2.5">
                <label class="text-xs sm:text-sm font-bold text-slate-800">
                  1. Beri tanda centang (✓) pada titik lokasi bentang alam Kaldera Bromo yang kalian amati atau kunjungi hari ini: <span class="text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="checkbox" name="ftD4Spots" value="Puncak Penanjakan" class="accent-amber-600 rounded" ${readOnlyAttr} ${savedSpots.includes('Puncak Penanjakan') ? 'checked' : ''}>
                    <span>🌅 <strong>Puncak Penanjakan</strong> (Sunrise &amp; Panorama Kaldera)</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="checkbox" name="ftD4Spots" value="Laut Pasir (Pasir Berbisik)" class="accent-amber-600 rounded" ${readOnlyAttr} ${savedSpots.includes('Laut Pasir (Pasir Berbisik)') ? 'checked' : ''}>
                    <span>🏜️ <strong>Laut Pasir (Pasir Berbisik)</strong> (Elevasi 2.100 mdpl)</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="checkbox" name="ftD4Spots" value="Kawah Aktif Bromo" class="accent-amber-600 rounded" ${readOnlyAttr} ${savedSpots.includes('Kawah Aktif Bromo') ? 'checked' : ''}>
                    <span>🌋 <strong>Kawah Aktif Gunung Bromo</strong> (Elevasi 2.329 mdpl)</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="checkbox" name="ftD4Spots" value="Gunung Batok" class="accent-amber-600 rounded" ${readOnlyAttr} ${savedSpots.includes('Gunung Batok') ? 'checked' : ''}>
                    <span>⛰️ <strong>Gunung Batok</strong> (Kerucut Vulkanik Unik Dinding Bergaris)</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950 sm:col-span-2">
                    <input type="checkbox" name="ftD4Spots" value="Padang Savana (Bukit Teletubbies)" class="accent-amber-600 rounded" ${readOnlyAttr} ${savedSpots.includes('Padang Savana (Bukit Teletubbies)') ? 'checked' : ''}>
                    <span>🌿 <strong>Padang Savana (Bukit Teletubbies)</strong> (Hamparan Rumput Pegunungan TNBTS)</span>
                  </label>
                </div>
              </div>

              <!-- SOAL 2: KONDISI UDARA & PEMANDANGAN ALAM -->
              <div class="flex flex-col gap-3 pt-2 border-t border-slate-100">
                <label class="text-xs sm:text-sm font-bold text-slate-800">
                  2A. Bagaimana suhu dan kondisi udara yang kamu rasakan saat berada di Bromo dini hari hingga pagi hari? <span class="text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="radio" name="ftD4Suhu" value="Sangat Dingin & Berangin Kencang" class="accent-amber-600" ${readOnlyAttr} ${(saved && saved.suhu === 'Sangat Dingin & Berangin Kencang') ? 'checked' : ''}>
                    <span>❄️ Sangat Dingin &amp; Berangin Kencang</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="radio" name="ftD4Suhu" value="Sejuk Segar Disertai Kabut Tipis" class="accent-amber-600" ${readOnlyAttr} ${(saved && saved.suhu === 'Sejuk Segar Disertai Kabut Tipis') ? 'checked' : ''}>
                    <span>🌫️ Sejuk Segar Disertai Kabut</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-amber-400 cursor-pointer flex items-center gap-2 bg-slate-50 text-xs font-bold text-slate-800 transition-all has-[:checked]:bg-amber-50 has-[:checked]:border-amber-600 has-[:checked]:text-amber-950">
                    <input type="radio" name="ftD4Suhu" value="Cukup Hangat Setelah Matahari Terbit" class="accent-amber-600" ${readOnlyAttr} ${(saved && saved.suhu === 'Cukup Hangat Setelah Matahari Terbit') ? 'checked' : ''}>
                    <span>☀️ Cukup Hangat Terkena Sinar Matahari</span>
                  </label>
                </div>

                <div class="flex flex-col gap-1.5 pt-1">
                  <label for="ftD4KesanAlam" class="text-xs sm:text-sm font-bold text-slate-800">
                    2B. Tuliskan 1–2 kalimat singkat: Pemandangan bentang alam apa di Bromo yang paling membuatmu kagum? <span class="text-rose-500">*</span>
                  </label>
                  <textarea id="ftD4KesanAlam" rows="2" ${readOnlyAttr} placeholder="Contoh: Saya sangat kagum menyaksikan lautan pasir yang sangat luas membentang dengan latar kawah Bromo yang aktif dan Gunung Batok yang berdiri kokoh..." class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-slate-400">${(saved && saved.kesanAlam) ? saved.kesanAlam : ''}</textarea>
                </div>
              </div>

              <!-- SOAL 3: FLORA ENDEMIK & LARANGAN MEMETIK EDELWEIS -->
              <div class="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
                <label class="text-xs sm:text-sm font-bold text-slate-800">
                  3. Mengapa wisatawan dilarang keras memetik bunga Edelweis Jawa (<em>Anaphalis javanica</em>) liar di kawasan Bromo? <span class="text-rose-500">*</span>
                </label>
                <div class="flex flex-col gap-2">
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-start gap-2 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                    <input type="radio" name="ftD4Edelweis" value="Dilindungi agar tidak punah dan ekosistem lestari" class="accent-emerald-600 mt-0.5" ${readOnlyAttr} ${(saved && saved.alasanEdelweis === 'Dilindungi agar tidak punah dan ekosistem lestari') ? 'checked' : ''}>
                    <span>🌸 Karena Edelweis adalah flora langka yang dilindungi di Taman Nasional agar tidak punah dan keasrian ekosistem Bromo tetap lestari.</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer flex items-start gap-2 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-600 has-[:checked]:text-emerald-950">
                    <input type="radio" name="ftD4Edelweis" value="Karena beracun jika disentuh langsung" class="accent-emerald-600 mt-0.5" ${readOnlyAttr} ${(saved && saved.alasanEdelweis === 'Karena beracun jika disentuh langsung') ? 'checked' : ''}>
                    <span>⚠️ Karena getah bunga Edelweis liar mengandung racun berbahaya bagi kulit manusia.</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- BAGIAN 2: PILAR CULTURE -->
            <div class="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-5">
              <div class="flex items-center gap-2 text-purple-950 font-black text-base sm:text-lg border-b border-slate-100 pb-3">
                <span class="material-symbols-outlined text-purple-600 text-2xl">temple_buddhist</span>
                <span>Bagian 2: Pilar Culture (Kearifan Budaya Suku Tengger)</span>
              </div>

              <!-- SOAL 4: PURA LUHUR POTEN & MAKNA YADNYA KASADA -->
              <div class="flex flex-col gap-3">
                <label class="text-xs sm:text-sm font-bold text-slate-800">
                  4. Apa makna dan tujuan masyarakat Suku Tengger melaksanakan upacara adat Yadnya Kasada (melemparkan hasil bumi seperti sayuran/ternak ke kawah Bromo)? <span class="text-rose-500">*</span>
                </label>
                <div class="flex flex-col gap-2">
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer flex items-start gap-2 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-purple-50 has-[:checked]:border-purple-600 has-[:checked]:text-purple-950">
                    <input type="radio" name="ftD4Kasada" value="Wujud syukur atas rezeki hasil panen dan permohonan keselamatan kepada Sang Hyang Widhi serta leluhur" class="accent-purple-600 mt-0.5" ${readOnlyAttr} ${(saved && saved.maknaKasada === 'Wujud syukur atas rezeki hasil panen dan permohonan keselamatan kepada Sang Hyang Widhi serta leluhur') ? 'checked' : ''}>
                    <span>🙏 Sebagai wujud rasa syukur atas rezeki hasil bumi/panen dan permohonan keselamatan kepada Sang Hyang Widhi serta penghormatan kepada para leluhur (Rara Anteng &amp; Jaka Seger).</span>
                  </label>
                  <label class="p-3 rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer flex items-start gap-2 bg-slate-50 text-xs font-semibold text-slate-800 transition-all has-[:checked]:bg-purple-50 has-[:checked]:border-purple-600 has-[:checked]:text-purple-950">
                    <input type="radio" name="ftD4Kasada" value="Untuk membuang sisa panen sayur yang tidak laku terjual" class="accent-purple-600 mt-0.5" ${readOnlyAttr} ${(saved && saved.maknaKasada === 'Untuk membuang sisa panen sayur yang tidak laku terjual') ? 'checked' : ''}>
                    <span>📦 Untuk membuang kelebihan panen sayuran yang tidak habis terjual di pasar agribisnis Sukapura.</span>
                  </label>
                </div>
              </div>

              <!-- SOAL 5: ETIKA PELAJAR MENGHORMATI ADAT & ALAM BROMO -->
              <div class="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
                <label class="text-xs sm:text-sm font-bold text-slate-800">
                  5. Tuliskan 2 aturan sopan santun (etika) yang wajib dipatuhi siswa saat berwisata di kawasan suci Bromo dan bertemu warga Suku Tengger: <span class="text-rose-500">*</span>
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div class="flex flex-col gap-1">
                    <span class="text-[11px] font-bold text-slate-700">Etika 1: Kesopanan di Area Suci / Pura Poten</span>
                    <input type="text" id="ftD4Etika1" value="${(saved && saved.etika1) ? saved.etika1.replace(/"/g, '&quot;') : ''}" ${readOnlyAttr} placeholder="Contoh: Menjaga tutur kata sopan, tidak berisik, dan menghormati warga yang sedang beribadah." class="p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400">
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[11px] font-bold text-slate-700">Etika 2: Menjaga Kelestarian Alam Bromo</span>
                    <input type="text" id="ftD4Etika2" value="${(saved && saved.etika2) ? saved.etika2.replace(/"/g, '&quot;') : ''}" ${readOnlyAttr} placeholder="Contoh: Membawa kembali sampah sendiri (Zero Littering) dan tidak merusak tanaman pegunungan." class="p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400">
                  </div>
                </div>
              </div>
            </div>

            <!-- TOMBOL SIMPAN & KIRIM LKPD DAY 4 -->
            ${isSubmitted ? `
              <div class="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div>
                    <h4 class="font-black text-sm">LKPD Day 4 Bromo Telah Disimpan &amp; Terkirim!</h4>
                    <p class="text-xs text-emerald-800">Terkirim pada: ${saved && saved.submittedAt ? saved.submittedAt : 'Selesai'}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 w-full sm:w-auto">
                  <a href="dokumentasi.html?day=4" class="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center">
                    <span class="material-symbols-outlined text-base">photo_camera</span>
                    <span>Lanjut ke Dokumentasi &amp; Refleksi &rarr;</span>
                  </a>
                </div>
              </div>
            ` : `
              <div class="pt-2 flex flex-col sm:flex-row gap-3">
                <button id="btnSubmitD4BromoLkpd" type="button" onclick="saveDay4BromoLKPD(true)" class="flex-1 py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-xl">send</span>
                  <span>Simpan &amp; Kirim LKPD Day 4 (Gunung Bromo)</span>
                </button>
                <button type="button" onclick="saveDay4BromoLKPD(false)" class="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-base">save</span>
                  <span>Simpan Draf</span>
                </button>
              </div>
            `}
          </form>

          <!-- MODAL SUKSES SUBMIT LKPD DAY 4 -->
          <div id="modalD4BromoLkpdSuccess" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 opacity-0 pointer-events-none">
            <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-slate-100 transform transition-all duration-200 scale-95">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-black uppercase text-amber-700 tracking-wider">Tahap 2 Selesai ✓</span>
                  <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">LKPD Bromo Berhasil Terkirim!</h3>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Data observasi bentang alam kaldera, flora endemik TNBTS, serta catatan kearifan adat Suku Tengger telah tersimpan ke sistem.
              </p>
              <div class="flex flex-col gap-2 pt-2">
                <a href="dokumentasi.html?day=4" class="w-full py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center">
                  <span class="material-symbols-outlined text-lg">photo_camera</span>
                  <span>Lanjut ke Dokumentasi Foto &amp; Refleksi &rarr;</span>
                </a>
                <button type="button" onclick="closeD4BromoLkpdSuccessModal()" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all">
                  Tetap di Halaman LKPD
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function saveDay4BromoLKPD(isSubmit) {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';
      const cleanNisn = String(studentNisn).trim();

      const selectedSpots = Array.from(document.querySelectorAll('input[name="ftD4Spots"]:checked')).map(el => el.value);
      const suhu = document.querySelector('input[name="ftD4Suhu"]:checked')?.value || '';
      const kesanAlam = (document.getElementById('ftD4KesanAlam')?.value || '').trim();
      const edelweis = document.querySelector('input[name="ftD4Edelweis"]:checked')?.value || '';
      const kasada = document.querySelector('input[name="ftD4Kasada"]:checked')?.value || '';
      const etika1 = (document.getElementById('ftD4Etika1')?.value || '').trim();
      const etika2 = (document.getElementById('ftD4Etika2')?.value || '').trim();

      if (isSubmit) {
        if (!selectedSpots || selectedSpots.length === 0) {
          FincestemCore.ui.toast('Centang minimal 1 titik bentang alam yang kalian amati (Soal 1)!', 'warning');
          return;
        }
        if (!suhu) {
          FincestemCore.ui.toast('Pilih kondisi suhu udara yang dirasakan di Bromo (Soal 2A)!', 'warning');
          return;
        }
        if (!kesanAlam || kesanAlam.length < 10) {
          FincestemCore.ui.toast('Tuliskan kesan pemandangan alam Bromo minimal 1–2 kalimat (Soal 2B)!', 'warning');
          document.getElementById('ftD4KesanAlam')?.focus();
          return;
        }
        if (!edelweis) {
          FincestemCore.ui.toast('Pilih alasan mengapa dilarang memetik bunga Edelweis liar (Soal 3)!', 'warning');
          return;
        }
        if (!kasada) {
          FincestemCore.ui.toast('Pilih makna dan tujuan upacara adat Yadnya Kasada (Soal 4)!', 'warning');
          return;
        }
        if (!etika1 || !etika2) {
          FincestemCore.ui.toast('Lengkapi 2 aturan etika sopan santun di kawasan Bromo (Soal 5)!', 'warning');
          return;
        }
      }

      const payload = {
        day_number: 4,
        location: 'Taman Nasional Bromo Tengger Semeru',
        spots: selectedSpots,
        suhu: suhu,
        kesanAlam: kesanAlam,
        alasanEdelweis: edelweis,
        maknaKasada: kasada,
        etika1: etika1,
        etika2: etika2,
        submitted: !!isSubmit,
        submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      const btnSubmit = document.getElementById('btnSubmitD4BromoLkpd');
      if (btnSubmit && isSubmit) {
        btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Mengirimkan Laporan...</span>';
        btnSubmit.classList.add('pointer-events-none', 'opacity-80');
      }

      setTimeout(() => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day4_' + cleanNisn, JSON.stringify(payload));
        } catch(e) {}

        if (FincestemCore.progress && cleanNisn) {
          FincestemCore.progress.submitTask(cleanNisn, 4, 'lkpd', payload);
        }

        if (isSubmit) {
          if (btnSubmit) {
            btnSubmit.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span><span>Laporan Terkirim</span>';
            btnSubmit.classList.remove('pointer-events-none', 'opacity-80');
          }
          const statusBadge = document.getElementById('ftD4StatusBadge');
          if (statusBadge) {
            statusBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-amber-300 text-slate-950';
            statusBadge.textContent = '✓ Telah Dikirim / Selesai';
          }
          FincestemCore.ui.toast('LKPD Bromo Day 4 berhasil dikirim! Mengarahkan ke Dokumentasi Foto & Refleksi...', 'success');
          showD4BromoLkpdSuccessModal();
          setTimeout(() => {
            window.location.href = 'dokumentasi.html?day=4';
          }, 1200);
        } else {
          FincestemCore.ui.toast('Draf LKPD Bromo Day 4 tersimpan.', 'info');
        }
      }, 400);
    }

    function showD4BromoLkpdSuccessModal() {
      const modal = document.getElementById('modalD4BromoLkpdSuccess');
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeD4BromoLkpdSuccessModal() {
      const modal = document.getElementById('modalD4BromoLkpdSuccess');
      if (!modal) return;
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100');
    }

    window.renderFieldTripDay4LKPD = renderFieldTripDay4LKPD;
    window.saveDay4BromoLKPD = saveDay4BromoLKPD;
    window.showD4BromoLkpdSuccessModal = showD4BromoLkpdSuccessModal;
    window.closeD4BromoLkpdSuccessModal = closeD4BromoLkpdSuccessModal;

    // ==========================================
    // MODUL LKPD KHUSUS FIELD TRIP DAY 5 (YOGYAKARTA)
    // Sesi 1: Candi Prambanan (Pilar: EXPLORATION 100% - Simple & Praktis)
    // Sesi 2: Seni Batik Benang Ratu (Pilar: STEM)
    // Sesi 3: Kampus UNY (Wawasan & Refleksi)
    // ==========================================
    let currentD5LkpdSession = 1;

    function switchD5LkpdSession(targetSesi) {
      currentD5LkpdSession = Number(targetSesi);
      const urlParams = new URLSearchParams(window.location.search);
      const isReadOnlyUrl = (urlParams.get('readonly') === '1');
      renderFieldTripDay5LKPD(isReadOnlyUrl, currentD5LkpdSession);
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch(e) {}
    }

    
    function checkIsD5Sesi1RefleksiDone(cleanNisn) {
      try {
        const user = activeUser || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);

        for (const id of ids) {
          const rawRefl = localStorage.getItem('fincestem_refleksi_ft_day5_prambanan_' + id) || 
                          localStorage.getItem('fincestem_refleksi_ft_day5_' + id) ||
                          localStorage.getItem('fincestem_refl_ft_day5_' + id);
          if (rawRefl) {
            try {
              const parsed = JSON.parse(rawRefl);
              if (parsed && (parsed.submitted || parsed.content || parsed.submitted_at)) return true;
            } catch(e) {
              if (typeof rawRefl === 'string' && rawRefl.trim().length > 5) return true;
            }
          }
        }

        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_refleksi_prambanan'] || tm['5_refleksi']) {
            const task = tm['5_refleksi_prambanan'] || tm['5_refleksi'];
            if (task && (task.status === 'submitted' || task.content)) return true;
          }
        }
      } catch(e) {}
      return false;
    }

    function checkIsD5Sesi2MateriDone(cleanNisn) {
      try {
        const user = activeUser || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);
        for (const id of ids) {
          const raw = localStorage.getItem('fincestem_materi_ft_day5_batik_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && (p.conclusion || p.text || p.content)) return true;
            } catch(e) {}
          }
        }
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_materi_batik']) return true;
        }
      } catch(e) {}
      return false;
    }

    function checkIsD5Sesi3LkpdDone(cleanNisn) {
      try {
        const user = activeUser || {};
        const nisn = String(cleanNisn || user.nisn || user.identifier || '').trim();
        const ids = Array.from(new Set([nisn, nisn.replace(/^0+/, ''), nisn.padStart(10, '0'), user.nis, user.identifier])).filter(Boolean);
        for (const id of ids) {
          const raw = localStorage.getItem('fincestem_lkpd_ft_day5_uny_' + id);
          if (raw) {
            try {
              const p = JSON.parse(raw);
              if (p && p.submitted) return true;
            } catch(e) {}
          }
        }
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const tm = window.currentStudentProgress.task_map;
          if (tm['5_lkpd_uny'] && tm['5_lkpd_uny'].status === 'submitted') return true;
        }
      } catch(e) {}
      return false;
    }

    function renderFieldTripDay5LKPD(isReadOnly, targetSesi) {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

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

      const urlParams = new URLSearchParams(window.location.search);

      if (targetSesi !== undefined && targetSesi !== null) {
        currentD5LkpdSession = Number(targetSesi);
      } else {
        const reqSesi = parseInt(urlParams.get('sesi'));
        if (reqSesi === 2 || reqSesi === 3) {
          currentD5LkpdSession = reqSesi;
        } else {
          currentD5LkpdSession = 1;
        }
      }

      const isS1RefleksiDone = checkIsD5Sesi1RefleksiDone(cleanNisn);
      const isS2MateriDone = checkIsD5Sesi2MateriDone(cleanNisn);

      // Cek status LKPD Sesi 2 Batik
      let savedS2 = null;
      for (const id of idVars) {
        const rawS2 = localStorage.getItem('fincestem_lkpd_ft_day5_batik_' + id);
        if (rawS2) {
          try {
            savedS2 = JSON.parse(rawS2);
            break;
          } catch(e) {}
        }
      }
      if (!savedS2 && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        const task = tm['5_lkpd_batik'];
        if (task && task.content) {
          let p = task.content;
          if (typeof p === 'string') {
            try { p = JSON.parse(p); } catch(e) {}
          }
          if (p && typeof p === 'object') savedS2 = p;
        }
      }
      const isS2Submitted = !!(savedS2 && savedS2.submitted);

      // Cek status LKPD Sesi 3 UNY
      let savedS3 = null;
      for (const id of idVars) {
        const rawS3 = localStorage.getItem('fincestem_lkpd_ft_day5_uny_' + id);
        if (rawS3) {
          try {
            savedS3 = JSON.parse(rawS3);
            break;
          } catch(e) {}
        }
      }
      if (!savedS3 && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        const task = tm['5_lkpd_uny'];
        if (task && task.content) {
          let p = task.content;
          if (typeof p === 'string') {
            try { p = JSON.parse(p); } catch(e) {}
          }
          if (p && typeof p === 'object') savedS3 = p;
        }
      }
      const isS3Submitted = !!(savedS3 && savedS3.submitted);

      // 1. Cek prasyarat kesimpulan Modul Sesi 1 Candi Prambanan
      let hasMateriPrambanan = false;
      for (const id of idVars) {
        const rawM = localStorage.getItem('fincestem_materi_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_materi_ft_day5_' + id);
        if (rawM) {
          try {
            const p = JSON.parse(rawM);
            if (p && (p.conclusion || p.text)) {
              hasMateriPrambanan = true;
              break;
            }
          } catch(e) {}
        }
      }

      if (!hasMateriPrambanan && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        if (tm['5_materi_prambanan'] || tm['5_materi']) hasMateriPrambanan = true;
      }

      // 2. Ambil data LKPD Sesi 1 yang tersimpan sebelumnya
      let saved = null;
      for (const id of idVars) {
        const rawS = localStorage.getItem('fincestem_lkpd_ft_day5_prambanan_' + id) || localStorage.getItem('fincestem_lkpd_ft_day5_' + id);
        if (rawS) {
          try {
            saved = JSON.parse(rawS);
            break;
          } catch(e) {}
        }
      }

      // Fallback server progress
      if (!saved && window.currentStudentProgress && window.currentStudentProgress.task_map) {
        const tm = window.currentStudentProgress.task_map;
        const task = tm['5_lkpd_prambanan'] || tm['5_lkpd'];
        if (task && task.content) {
          let p = task.content;
          if (typeof p === 'string') {
            try { p = JSON.parse(p); } catch(e) {}
          }
          if (p && typeof p === 'object') saved = p;
        }
      }

      // Jika LKPD sudah pernah diisi sebagian atau disubmit, prasyarat otomatis tuntas
      if (saved && (saved.submitted || saved.candiDekat || saved.ceritaRelief || saved.kesanJelajah)) {
        hasMateriPrambanan = true;
      }

      const isSubmitted = !!(saved && saved.submitted);
      const isLockedByPrereq = (currentD5LkpdSession === 1) ? !hasMateriPrambanan : false;
      const isFormLocked = isReadOnly || isLockedByPrereq || isSubmitted;
      const readOnlyAttr = isFormLocked ? 'disabled' : '';

      // TAB NAVIGASI 3 SESI LKPD DAY 5
      const tabNavHtml = `
        <div class="p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-1.5 mb-2">
          <!-- TAB 1: CANDI PRAMBANAN (EXPLORATION) -->
          <button type="button" onclick="switchD5LkpdSession(1)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5LkpdSession === 1 ? 'bg-purple-700 text-white shadow-xs ring-2 ring-purple-400/40' : 'bg-slate-50 hover:bg-purple-50 text-purple-950 border border-purple-200'}">
            <span class="material-symbols-outlined text-base ${currentD5LkpdSession === 1 ? 'text-amber-300' : 'text-purple-600'}">temple_hindu</span>
            <span class="truncate">Sesi 1: LKPD Prambanan</span>
            ${isSubmitted ? '<span class="text-[11px] text-purple-200 font-bold ml-1">✓</span>' : (currentD5LkpdSession === 1 ? '<span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>' : '')}
          </button>

          <!-- TAB 2: BATIK BENANG RATU (STEM) -->
          <button type="button" onclick="switchD5LkpdSession(2)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5LkpdSession === 2 ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40' : (isS1RefleksiDone ? 'bg-slate-50 hover:bg-amber-50 text-amber-950 border border-amber-300' : 'bg-slate-100 text-slate-400 border border-slate-200')}">
            <span class="material-symbols-outlined text-base ${currentD5LkpdSession === 2 ? 'text-amber-200' : (isS1RefleksiDone ? 'text-amber-700' : 'text-slate-400')}">${isS1RefleksiDone ? 'palette' : 'lock'}</span>
            <span class="truncate">Sesi 2: LKPD Seni Batik</span>
            ${isS2Submitted ? '<span class="text-[11px] text-amber-200 font-bold ml-1">✓</span>' : (!isS1RefleksiDone ? '<span class="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold ml-1">Kunci</span>' : (currentD5LkpdSession === 2 ? '<span class="w-2 h-2 rounded-full bg-amber-300 animate-pulse ml-0.5"></span>' : ''))}
          </button>

          <!-- TAB 3: KAMPUS UNY (REFLEKSI STUDI LANJUT) -->
          <button type="button" onclick="switchD5LkpdSession(3)" class="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all cursor-pointer ${currentD5LkpdSession === 3 ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40' : 'bg-slate-50 hover:bg-blue-50 text-blue-950 border border-blue-200'}">
            <span class="material-symbols-outlined text-base ${currentD5LkpdSession === 3 ? 'text-amber-300' : 'text-blue-600'}">school</span>
            <span class="truncate">Sesi 3: LKPD Kampus UNY</span>
            ${isS3Submitted ? '<span class="text-[11px] text-blue-200 font-bold ml-1">✓</span>' : (currentD5LkpdSession === 3 ? '<span class="w-2 h-2 rounded-full bg-blue-300 animate-pulse ml-0.5"></span>' : '')}
          </button>
        </div>
      `;

      if (currentD5LkpdSession === 2) {
        if (!isS1RefleksiDone) {
          // KONDISI TERKUNCI: WAJIB SELESAIKAN REFLEKSI SESI 1 TERLEBIH DAHULU
          mainEl.innerHTML = `
            ${tabNavHtml}
            <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md w-fit">
                Field Trip • Day 5 • Sesi 2
              </span>
              <h2 class="font-black text-xl sm:text-2xl leading-tight">
                LKPD Sesi 2: Praktik Membatik (Pilar STEM)
              </h2>
              <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                Lembar kerja pengamatan sains kimia lilin malam, termodinamika canting tembaga, dan proses pelorotan kain mori di Sentra Batik Benang Ratu Yogyakarta.
              </p>
            </div>
            <div class="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-amber-300 shadow-sm flex flex-col items-center text-center gap-3.5">
              <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center ring-4 ring-amber-200/80 shadow-2xs">
                <span class="material-symbols-outlined text-3xl">lock</span>
              </div>
              <div class="flex flex-col gap-1 max-w-md">
                <h3 class="font-black text-lg text-slate-900">LKPD Sesi 2 (Batik Benang Ratu) Masih Terkunci</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Anda wajib menyelesaikan seluruh tahapan <strong>Sesi 1 Candi Prambanan</strong> hingga pengisian <strong>Jurnal Refleksi Sesi 1</strong> sebelum dapat membuka dan mengisi LKPD Sesi 2 Seni Batik.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full max-w-sm justify-center">
                <button type="button" onclick="switchD5LkpdSession(1)" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">arrow_back</span>
                  <span>Buka LKPD Sesi 1 Prambanan</span>
                </button>
                <a href="dashboard.html?day=5&task=refleksi" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">psychology</span>
                  <span>Buka Jurnal Refleksi Sesi 1</span>
                </a>
              </div>
            </div>
          `;
          return;
        }

        // KONDISI TERBUKA: SISWA TELAH MENYELESAIKAN REFLEKSI SESI 1!
        const valAliran = savedS2 ? (savedS2.aliranLilin || '') : '';
        const valRintang = savedS2 ? (savedS2.rintangWarna || '') : '';
        const valNglorod = savedS2 ? (savedS2.nglorodApung || '') : '';
        const valKesimpulan = savedS2 ? (savedS2.kesimpulanSains || '') : '';
        const s2Disabled = (isReadOnly || isS2Submitted) ? 'disabled' : '';

        mainEl.innerHTML = `
          ${tabNavHtml}

          <!-- BANNER LKPD FIELD TRIP DAY 5 SESI 2 -->
          <div class="bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-amber-100 backdrop-blur-md">
                Field Trip • Day 5 • Sesi 2
              </span>
              <span class="text-xs font-bold text-amber-200">Pukul 11.00 - 12.45 WIB</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD Sesi 2: Laboratorium Praktik Sains Membatik
            </h2>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-200 font-extrabold text-xs w-fit">
              <span class="material-symbols-outlined text-base">science</span>
              <span>Pilar Murni: 🔬 STEM (Sains, Teknologi, Rekayasa, Matematika)</span>
            </div>
            <p class="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
              Lembar observasi pembuktian sains saat memegang canting tembaga di Sentra Batik Benang Ratu: uji termodinamika suhu kerja lilin malam, pembuktian rintang hidrofobik zat warna, dan hukum Archimedes saat proses nglorod.
            </p>
          </div>

          <!-- KARTU IDENTITAS PESERTA -->
          <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 flex-wrap">
              <div class="flex items-center gap-2 text-amber-950 font-black text-xs sm:text-sm">
                <span class="material-symbols-outlined text-amber-700 text-lg">badge</span>
                <span>Identitas Peserta Praktikum STEM Batik</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${isS2Submitted ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}">
                ${isS2Submitted ? '✓ TERSUBMIT RESMI' : 'DRAFT PENGERJAAN'}
              </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div class="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Nama Siswa:</span>
                <strong class="text-slate-900 truncate block">${studentName}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">NISN:</span>
                <strong class="text-slate-900 truncate block">${studentNisn}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Kelas:</span>
                <strong class="text-slate-900 truncate block">${studentClass}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Fasilitator:</span>
                <strong class="text-slate-900 truncate block">${fasilName}</strong>
              </div>
            </div>
          </div>

          ${!isS2MateriDone ? `
          <!-- BANNER PERINGATAN MODUL BELUM DISIMPAN -->
          <div class="p-4 rounded-3xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-xl">lightbulb</span>
              </span>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-black text-amber-950 truncate">Saran Pengamatan Lapangan</span>
                <span class="text-[11px] text-amber-800 leading-relaxed font-medium">Anda belum menyimpan kesimpulan Modul Sesi 2. Sebaiknya baca materi agar memahami sains canting &amp; pelorotan.</span>
              </div>
            </div>
            <a href="materi.html?day=5&sesi=2" class="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0">
              <span class="material-symbols-outlined text-base">menu_book</span>
              <span>Buka Modul</span>
            </a>
          </div>
          ` : ''}

          <!-- FORM LKPD SESI 2: 4 BAGIAN INTERAKTIF RAMAH HP -->
          <form id="formFtDay5S2LKPD" onsubmit="event.preventDefault();" class="flex flex-col gap-4">

            <!-- BAGIAN 1: KONDISI ALIRAN LILIN & CANTING TEMBAGA -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-black text-sm">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Uji Termodinamika &amp; Kapilaritas Canting Tembaga (Teknologi &amp; Fisika)</h3>
                  <span class="text-[11px] font-bold text-amber-800">Pengamatan Laju Debit &amp; Daya Serap Serat Mori</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Amati kelancaran aliran lilin malam dari cucuk canting tembaga Anda ke atas permukaan kain mori primissima saat proses <em>nyanting</em>. Bagaimana kondisi termodinamika lilin malam tersebut?
              </p>
              <div class="flex flex-col gap-2 mt-1">
                <label class="p-3 rounded-2xl border ${valAliran === 'ideal' ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400' : 'border-slate-200 bg-white hover:bg-amber-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_aliranLilin" value="ideal" ${valAliran === 'ideal' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-amber-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[A] Suhu Ideal (60°C – 70°C) ✓</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lilin mengalir lancar melalui cucuk tembaga tanpa tetesan liar, meresap tembus ke dua sisi kain mori (tembus bolak-balik).</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valAliran === 'dingin' ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400' : 'border-slate-200 bg-white hover:bg-amber-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_aliranLilin" value="dingin" ${valAliran === 'dingin' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-amber-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[B] Suhu Kurang Panas (&lt; 60°C)</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lilin kental membeku di ujung cucuk tembaga, menyumbat canting, dan lapisan malam di atas kain rapuh mudah mengelupas.</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valAliran === 'panas' ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400' : 'border-slate-200 bg-white hover:bg-amber-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_aliranLilin" value="panas" ${valAliran === 'panas' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-amber-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[C] Suhu Terlalu Panas (&gt; 80°C)</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lilin mendidih berasap, mengalir terlalu deras meleber keluar garis pola (nyelepet), dan merusak kerapian motif geometri.</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- BAGIAN 2: UJI RINTANG SIFAT HIDROFOBIK LILIN MALAM -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-black text-sm">2</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Uji Rintang Sifat Hidrofobik Lilin Malam (Sains Kimia)</h3>
                  <span class="text-[11px] font-bold text-orange-800">Pembuktian Penolakan Partikel Pewarna Polar</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Setelah kain mori dicelupkan ke dalam larutan zat pewarna dingin, bagaimana efektivitas sifat hidrofobik lilin malam dalam mengunci serat kain?
              </p>
              <div class="flex flex-col gap-2 mt-1">
                <label class="p-3 rounded-2xl border ${valRintang === 'hidrofobik_sempurna' ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400' : 'border-slate-200 bg-white hover:bg-orange-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_rintangWarna" value="hidrofobik_sempurna" ${valRintang === 'hidrofobik_sempurna' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-orange-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[A] Menolak Warna Sempurna (Hidrofobik 100%) ✓</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Ikatan non-polar lilin menolak molekul air pewarna secara total; kain mori di bawah lapisan lilin tetap putih bersih tanpa noda.</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valRintang === 'rembes_retak' ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400' : 'border-slate-200 bg-white hover:bg-orange-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_rintangWarna" value="rembes_retak" ${valRintang === 'rembes_retak' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-orange-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[B] Terdapat Sedikit Rembesan Retakan (Efek Remekan)</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lilin mengalami retakan mikro saat kain ditekuk/dingin, warna meresap menciptakan aksen serat retak khas batik nusantara.</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valRintang === 'bocor_gagal' ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-400' : 'border-slate-200 bg-white hover:bg-orange-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_rintangWarna" value="bocor_gagal" ${valRintang === 'bocor_gagal' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-orange-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[C] Bocor / Gagal Menolak</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lapisan lilin terlalu tipis atau belum menembus kain mori bolak-balik sehingga zat warna merembes tembus merusak motif.</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- BAGIAN 3: UJI PELOROTAN (NGLOROD) & DENSITAS ARCHIMEDES -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-black text-sm">3</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Termofisika Pelorotan &amp; Densitas Archimedes (Fisika Nglorod)</h3>
                  <span class="text-[11px] font-bold text-teal-800">Pengamatan Pemisahan Fluida pada Air Mendidih 100°C</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Amati proses perebusan kain di dalam kancah air mendidih (Nglorod 100°C). Apa yang terjadi pada lilin malam dan di mana posisi lelehan lilin di dalam kancah?
              </p>
              <div class="flex flex-col gap-2 mt-1">
                <label class="p-3 rounded-2xl border ${valNglorod === 'apung_sempurna' ? 'border-teal-500 bg-teal-50/70 ring-1 ring-teal-400' : 'border-slate-200 bg-white hover:bg-teal-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_nglorodApung" value="apung_sempurna" ${valNglorod === 'apung_sempurna' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-teal-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[A] Meleleh &amp; Mengapung di Permukaan Air ✓</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Lilin mencair sempurna pada 100°C dan terangkat ke atas permukaan air karena massa jenis lilin (~0,9 g/cm³) lebih kecil dari massa jenis air (1,0 g/cm³).</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valNglorod === 'menempel' ? 'border-teal-500 bg-teal-50/70 ring-1 ring-teal-400' : 'border-slate-200 bg-white hover:bg-teal-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_nglorodApung" value="menempel" ${valNglorod === 'menempel' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-teal-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[B] Lilin Masih Menempel Sebagian</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Air belum mencapai titik didih 100°C sehingga peluruhan lilin dari jalinan serat selulosa mori belum tuntas.</span>
                  </div>
                </label>
                <label class="p-3 rounded-2xl border ${valNglorod === 'tenggelam' ? 'border-teal-500 bg-teal-50/70 ring-1 ring-teal-400' : 'border-slate-200 bg-white hover:bg-teal-50/40'} cursor-pointer flex items-start gap-3 transition-all">
                  <input type="radio" name="ftD5S2_nglorodApung" value="tenggelam" ${valNglorod === 'tenggelam' ? 'checked' : ''} ${s2Disabled} class="mt-0.5 accent-teal-600">
                  <div class="flex flex-col min-w-0 text-xs">
                    <strong class="text-slate-900 font-bold">[C] Lilin Tenggelam / Mengendap ke Dasar</strong>
                    <span class="text-slate-600 text-[11px] leading-relaxed mt-0.5">Terjadi anomali massa jenis atau lilin tercampur zat pemberat sehingga tidak terangkat gaya apung.</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- BAGIAN 4: KESIMPULAN SAINS PRAKTIS LAPANGAN -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-amber-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-black text-sm">4</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Kesimpulan Sains Praktis Lapangan (Refleksi STEM Singkat)</h3>
                  <span class="text-[11px] font-bold text-purple-800">Intisari Pembuktian Konsep Sains Saat Membatik</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Tuliskan 1 prinsip sains (kimia/fisika/rekayasa) yang paling menarik dan berhasil Anda buktikan langsung saat memegang canting &amp; kain hari ini:
              </p>
              <textarea id="ftD5S2_kesimpulanSains" rows="3" ${s2Disabled} class="w-full p-3 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 outline-none transition-all placeholder:text-slate-400 font-medium ${isS2Submitted ? 'bg-slate-100 text-slate-600' : ''}" placeholder="Contoh: Saya membuktikan bahwa lilin malam bersifat hidrofobik menolak zat warna air, dan saat proses nglorod lilin mengapung ke permukaan karena massa jenis lilin lebih ringan dari air mendidih...">${valKesimpulan}</textarea>
            </div>

            <!-- ACTION BAR SIMPAN / SUBMIT -->
            <div class="p-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              ${isS2Submitted ? `
                <div class="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                  <span class="material-symbols-outlined text-emerald-600 text-xl">verified</span>
                  <span>LKPD Sesi 2 Praktik Membatik Telah Terkirim Resmi ✓</span>
                </div>
                <button type="button" onclick="switchD5LkpdSession(1)" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">arrow_back</span>
                  <span>Kembali ke Sesi 1 Prambanan</span>
                </button>
              ` : `
                <span class="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Pastikan seluruh 3 uji pilihan &amp; 1 kesimpulan terisi sebelum mengirim.
                </span>
                <button id="btnSaveFtD5S2Lkpd" type="button" onclick="saveFtDay5S2LKPD()" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Simpan &amp; Kirim LKPD Sesi 2</span>
                </button>
              `}
            </div>

          </form>

          <!-- MODAL SUKSES SIMPAN LKPD SESI 2 -->
          <div id="modalLkpdFtD5S2Success" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 opacity-0 pointer-events-none transition-all duration-300">
            <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 border border-slate-100 transform scale-95 transition-all">
              <div class="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl">celebration</span>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-lg font-black text-slate-900 leading-tight">LKPD Praktik Membatik Tuntas!</h3>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Pengamatan sains STEM dan kesimpulan membatik di Sentra Benang Ratu berhasil disimpan dan disubmit ke sistem.
                </p>
              </div>
              <div class="flex flex-col gap-2 w-full mt-2">
                <button type="button" onclick="closeFtD5S2LkpdModal()" class="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs cursor-pointer transition-all">
                  Lihat Lembar Jawaban
                </button>
                <a href="dashboard.html?day=5" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-base">dashboard</span>
                  <span>Kembali ke Dashboard</span>
                </a>
              </div>
            </div>
          </div>
        `;
        return;
      }

      if (currentD5LkpdSession === 3) {
        // SESI 3: KUNJUNGAN EDUKASI KAMPUS UNY (REFLEKSI STUDI LANJUT & CITA-CITA MASA DEPAN)
        const valWawasan = savedS3 ? (savedS3.wawasanUny || '') : '';
        const valProdi = savedS3 ? (savedS3.prodiImpian || '') : '';
        const valAlasanProdi = savedS3 ? (savedS3.alasanProdi || '') : '';
        const valKomitmen = savedS3 ? (savedS3.komitmenSekolah || '') : '';
        const s3Disabled = (isReadOnly || isS3Submitted) ? 'disabled' : '';

        mainEl.innerHTML = `
          ${tabNavHtml}

          <!-- BANNER LKPD FIELD TRIP DAY 5 SESI 3 -->
          <div class="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col gap-2.5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-blue-100 backdrop-blur-md">
                Field Trip • Day 5 • Sesi 3
              </span>
              <span class="text-xs font-bold text-blue-200">Pukul 14.30 - 17.00 WIB</span>
            </div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              LKPD Sesi 3: Kunjungan Edukasi Kampus UNY
            </h2>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-400/20 text-blue-200 font-extrabold text-xs w-fit">
              <span class="material-symbols-outlined text-base">school</span>
              <span>Inspirasi Masa Depan: 🎓 Refleksi Studi Lanjut PTN (Murni Refleksi Mandiri)</span>
            </div>
            <p class="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
              Lembar refleksi personal siswa setelah mengamati kampus Universitas Negeri Yogyakarta (UNY): wawasan perguruan tinggi, pemilihan jurusan/prodi impian, dan komitmen ikhtiar nyata di sekolah untuk meraih cita-cita.
            </p>
          </div>

          <!-- KARTU IDENTITAS PESERTA -->
          <div class="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 flex-wrap">
              <div class="flex items-center gap-2 text-blue-950 font-black text-xs sm:text-sm">
                <span class="material-symbols-outlined text-blue-700 text-lg">badge</span>
                <span>Identitas Peserta Kunjungan Kampus UNY</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black ${isS3Submitted ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}">
                ${isS3Submitted ? '✓ TERSUBMIT RESMI' : 'DRAFT PENGERJAAN'}
              </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div class="p-2.5 rounded-2xl bg-blue-50/50 border border-blue-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Nama Siswa:</span>
                <strong class="text-slate-900 truncate block">${studentName}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-blue-50/50 border border-blue-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">NISN:</span>
                <strong class="text-slate-900 truncate block">${studentNisn}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-blue-50/50 border border-blue-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Kelas:</span>
                <strong class="text-slate-900 truncate block">${studentClass}</strong>
              </div>
              <div class="p-2.5 rounded-2xl bg-blue-50/50 border border-blue-200/60">
                <span class="text-slate-500 font-semibold block text-[10px]">Fasilitator:</span>
                <strong class="text-slate-900 truncate block">${fasilName}</strong>
              </div>
            </div>
          </div>

          <!-- FORM LKPD SESI 3: 3 PERTANYAAN REFLEKSI SEDERHANA -->
          <form id="formFtDay5S3LKPD" onsubmit="event.preventDefault();" class="flex flex-col gap-4">

            <!-- PERTANYAAN 1: WAWASAN YANG DIPEROLEH DI UNY -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">1</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Pengalaman &amp; Wawasan Kunjungan Kampus UNY</h3>
                  <span class="text-[11px] font-bold text-blue-800">Eksplorasi Lingkungan, Fasilitas &amp; Budaya Akademik PTN</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Apa saja pengalaman berharga, hal baru, atau inspirasi yang Anda peroleh selama mengamati kehidupan akademik, fasilitas kampus, laboratorium, atau lingkungan Universitas Negeri Yogyakarta?
              </p>
              <textarea id="ftD5S3_wawasanUny" rows="4" ${s3Disabled} class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${s3Disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}" placeholder="Tuliskan wawasan atau pengalaman berkesan Anda selama berada di Kampus UNY...">${valWawasan}</textarea>
            </div>

            <!-- PERTANYAAN 2: JURUSAN / PRODI IMPIAN DI UNY -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">2</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Pilihan Program Studi (Prodi) / Jurusan Impian</h3>
                  <span class="text-[11px] font-bold text-blue-800">Cita-Cita &amp; Alasan Minat Studi Lanjut</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Seandainya Anda nanti berkesempatan diterima kuliah di Universitas Negeri Yogyakarta (UNY), program studi (jurusan) apa yang paling ingin Anda ambil? Apa alasan dan minat mendalam Anda memilih jurusan tersebut?
              </p>
              <div class="flex flex-col gap-2">
                <div>
                  <label class="block text-[11px] font-bold text-slate-700 mb-1">Nama Jurusan / Program Studi Impian:</label>
                  <input type="text" id="ftD5S3_prodiImpian" value="${valProdi}" ${s3Disabled} class="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${s3Disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}" placeholder="Contoh: S1 Pendidikan Guru Sekolah Dasar / S1 Teknik Elektro / S1 Matematika / S1 Akuntansi / dll">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-slate-700 mb-1">Alasan Memilih Jurusan Tersebut:</label>
                  <textarea id="ftD5S3_alasanProdi" rows="3" ${s3Disabled} class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${s3Disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}" placeholder="Jelaskan alasan mengapa Anda tertarik dan memilih jurusan tersebut...">${valAlasanProdi}</textarea>
                </div>
              </div>
            </div>

            <!-- PERTANYAAN 3: KOMITMEN & IKHTIAR DI SEKOLAH -->
            <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div class="flex items-center gap-2.5 text-blue-950 border-b border-slate-100 pb-2">
                <span class="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-black text-sm">3</span>
                <div>
                  <h3 class="font-black text-sm sm:text-base">Komitmen &amp; Ikhtiar Nyata di Sekolah</h3>
                  <span class="text-[11px] font-bold text-blue-800">Aksi Nyata di SMAN 1 Belitang Mulai Sekarang</span>
                </div>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                Komitmen dan ikhtiar nyata apa yang akan Anda lakukan di SMAN 1 Belitang mulai sekarang (seperti kedisiplinan belajar, menjaga kestabilan nilai rapor semester 1–5, aktif organisasi/ekskul, atau ibadah &amp; doa) agar cita-cita menembus PTN tersebut dapat tercapai?
              </p>
              <textarea id="ftD5S3_komitmenSekolah" rows="4" ${s3Disabled} class="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${s3Disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}" placeholder="Tuliskan komitmen dan langkah nyata Anda di sekolah mulai saat ini...">${valKomitmen}</textarea>
            </div>

            <!-- TOMBOL AKSI SUBMIT / STATUS TERKUNCI -->
            ${!isS3Submitted && !isReadOnly ? `
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-3xl bg-surface-container-lowest border border-blue-200 shadow-xs">
              <button type="button" onclick="switchD5LkpdSession(2)" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                <span class="material-symbols-outlined text-base">arrow_back</span>
                <span>Kembali ke Sesi 2 Membatik</span>
              </button>
              <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <button id="btnSaveFtD5S3Draft" type="button" onclick="saveFtDay5S3LKPD(false)" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all">
                  <span class="material-symbols-outlined text-base">save</span>
                  <span>Simpan Draft</span>
                </button>
                <button id="btnSaveFtD5S3Lkpd" type="button" onclick="saveFtDay5S3LKPD(true)" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Kirim Jawaban Resmi Sesi 3</span>
                </button>
              </div>
            </div>
            ` : `
            <div class="p-4 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2.5 text-blue-900 font-bold">
                <span class="material-symbols-outlined text-blue-700 text-xl">verified</span>
                <span>LKPD Sesi 3 (Kunjungan Kampus UNY) Telah Tersimpan Resmi!</span>
              </div>
              <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button type="button" onclick="switchD5LkpdSession(1)" class="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs">
                  Sesi 1 Prambanan
                </button>
                <button type="button" onclick="switchD5LkpdSession(2)" class="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs">
                  Sesi 2 Batik
                </button>
                <a href="dashboard.html?day=5" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs">
                  <span class="material-symbols-outlined text-sm">dashboard</span>
                  <span>Dashboard</span>
                </a>
              </div>
            </div>
            `}

          </form>

          <!-- MODAL SUKSES SUBMIT LKPD SESI 3 -->
          <div id="modalLkpdFtD5S3Success" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300">
            <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 border border-slate-100 transform scale-95 transition-all">
              <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl">school</span>
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-lg font-black text-slate-900 leading-tight">LKPD Kampus UNY Tuntas!</h3>
                <p class="text-xs text-slate-600 leading-relaxed">
                  Refleksi wawasan kampus, jurusan impian, dan komitmen belajar Anda berhasil disimpan dan disubmit ke sistem.
                </p>
              </div>
              <div class="flex flex-col gap-2 w-full mt-2">
                <button type="button" onclick="closeFtD5S3LkpdModal()" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs cursor-pointer transition-all">
                  Lihat Lembar Jawaban
                </button>
                <a href="dashboard.html?day=5" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-base">dashboard</span>
                  <span>Kembali ke Dashboard</span>
                </a>
              </div>
            </div>
          </div>
        `;
        return;
      }

      // ==========================================
      // SESI 1: LKPD CANDI PRAMBANAN (MURNI EXPLORATION & SIMPEL)
      // ==========================================
      mainEl.innerHTML = `
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
                <h3 class="text-base font-extrabold text-amber-950">LKPD Sesi 1 Masih Terkunci!</h3>
              </div>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Sesuai alur kurikulum FINCESTEM Day 5, Anda <strong>wajib membaca Modul Belajar Sesi 1</strong> dan <strong>menyimpan resume pemahaman singkat</strong> mengenai Candi Prambanan sebelum dapat mengisi lembar kerja ini.
            </p>
            <div class="pt-1">
              <a href="materi.html?day=5&sesi=1" class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-base">menu_book</span>
                <span>Buka Modul & Isi Kesimpulan Sesi 1</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        ` : ''}

        <!-- IDENTITAS RESMI LKPD SESI 1 -->
        <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/15 text-purple-800">
              Field Trip • Day 5 • Sesi 1
            </span>
            <span id="ftD5S1StatusBadgeLkpd" class="px-3 py-1 rounded-full text-xs font-bold ${isLockedByPrereq ? 'bg-rose-100 text-rose-800' : (isSubmitted ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-blue-100 text-blue-800')}">
              ${isLockedByPrereq ? 'Terkunci (Belum Resume Modul)' : (isSubmitted ? '🔒 Telah Dikirim & Terkunci' : 'Lembar Kerja Eksplorasi Sederhana')}
            </span>
          </div>

          <h2 class="text-lg sm:text-xl font-black text-purple-950 leading-tight">
            LKPD 05-A: Eksplorasi Cagar Budaya Candi Prambanan
          </h2>

          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-800 font-extrabold text-xs w-fit border border-purple-200">
            <span class="material-symbols-outlined text-base text-purple-600">explore</span>
            <span>Pilar Utama: EXPLORATION (100% Penjelajahan Lapangan)</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Peserta: <strong>${studentName}</strong> (NISN: ${studentNisn} • ${studentClass})<br>
            Fasilitator Pembina: <strong>${fasilName}</strong>
          </p>
        </div>

        <form id="formFtDay5S1Lkpd" onsubmit="event.preventDefault(); saveFtDay5S1LKPD();" class="flex flex-col gap-4">

          <!-- BAGIAN 1: CHECKLIST JELAJAH CANDI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2 text-purple-950 font-extrabold text-base border-b border-surface-container pb-2.5">
              <span class="material-symbols-outlined text-xl text-purple-700">checklist</span>
              <span>Bagian 1: Checklist Jelajah Candi (Tinggal Centang)</span>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">
              Tandai candi mana saja yang sudah berhasil Anda dekati dan lihat langsung di pelataran:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <label class="p-3.5 rounded-2xl border ${saved?.candiSiwa ? 'border-purple-600 bg-purple-50/70' : 'border-slate-200 bg-slate-50/60'} flex items-center gap-3 cursor-pointer hover:bg-purple-50/50 transition-all font-bold text-slate-800 ${isFormLocked ? 'pointer-events-none' : ''}">
                <input id="chkD5CandiSiwa" type="checkbox" ${saved?.candiSiwa ? 'checked' : ''} ${readOnlyAttr} class="w-4 h-4 accent-purple-700 rounded">
                <span>Candi Siwa (Candi terbesar 47m di tengah)</span>
              </label>

              <label class="p-3.5 rounded-2xl border ${saved?.candiBrahma ? 'border-purple-600 bg-purple-50/70' : 'border-slate-200 bg-slate-50/60'} flex items-center gap-3 cursor-pointer hover:bg-purple-50/50 transition-all font-bold text-slate-800 ${isFormLocked ? 'pointer-events-none' : ''}">
                <input id="chkD5CandiBrahma" type="checkbox" ${saved?.candiBrahma ? 'checked' : ''} ${readOnlyAttr} class="w-4 h-4 accent-purple-700 rounded">
                <span>Candi Brahma (Candi sisi selatan)</span>
              </label>

              <label class="p-3.5 rounded-2xl border ${saved?.candiWisnu ? 'border-purple-600 bg-purple-50/70' : 'border-slate-200 bg-slate-50/60'} flex items-center gap-3 cursor-pointer hover:bg-purple-50/50 transition-all font-bold text-slate-800 ${isFormLocked ? 'pointer-events-none' : ''}">
                <input id="chkD5CandiWisnu" type="checkbox" ${saved?.candiWisnu ? 'checked' : ''} ${readOnlyAttr} class="w-4 h-4 accent-purple-700 rounded">
                <span>Candi Wisnu (Candi sisi utara)</span>
              </label>

              <label class="p-3.5 rounded-2xl border ${saved?.candiWahana ? 'border-purple-600 bg-purple-50/70' : 'border-slate-200 bg-slate-50/60'} flex items-center gap-3 cursor-pointer hover:bg-purple-50/50 transition-all font-bold text-slate-800 ${isFormLocked ? 'pointer-events-none' : ''}">
                <input id="chkD5CandiWahana" type="checkbox" ${saved?.candiWahana ? 'checked' : ''} ${readOnlyAttr} class="w-4 h-4 accent-purple-700 rounded">
                <span>Candi Wahana (Nandi / Angsa / Garuda di depan)</span>
              </label>
            </div>
          </div>

          <!-- BAGIAN 2: TEMUAN OBJEK DI LOKASI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3.5">
            <div class="flex items-center gap-2 text-purple-950 font-extrabold text-base border-b border-surface-container pb-2.5">
              <span class="material-symbols-outlined text-xl text-purple-700">travel_explore</span>
              <span>Bagian 2: Temuan Objek Lapangan (Pilihan Cepat)</span>
            </div>

            <!-- Pertanyaan 1: Candi yang paling dekat diamati -->
            <div>
              <label class="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                1. Candi yang Anda masuki atau Anda amati paling dekat:
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                ${['Candi Siwa', 'Candi Wisnu', 'Candi Brahma', 'Candi Nandi'].map(cName => `
                  <label class="p-3 rounded-xl border ${saved?.candiDekat === cName ? 'border-purple-600 bg-purple-50 text-purple-950 font-black ring-1 ring-purple-500' : 'border-slate-200 bg-slate-50 text-slate-700 font-semibold'} hover:bg-purple-50/70 cursor-pointer flex items-center justify-center gap-2 transition-all ${isFormLocked ? 'pointer-events-none' : ''}">
                    <input type="radio" name="d5CandiDekat" value="${cName}" ${saved?.candiDekat === cName ? 'checked' : ''} ${readOnlyAttr} class="accent-purple-700">
                    <span>${cName}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Pertanyaan 2: Objek nyata yang dilihat -->
            <div class="pt-2">
              <label class="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                2. Objek nyata yang Anda lihat langsung di sekitar candi tersebut:
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                ${[
                  { id: 'chkD5Objek1', key: 'arcaNandi', label: 'Arca batu lembu Nandi yang utuh' },
                  { id: 'chkD5Objek2', key: 'tanggaTinggi', label: 'Tangga batu yang tinggi menuju bilik candi' },
                  { id: 'chkD5Objek3', key: 'reliefDinding', label: 'Dinding batu yang penuh ukiran relief cerita' },
                  { id: 'chkD5Objek4', key: 'batuPugar', label: 'Bebatuan candi yang dikelompokkan untuk dipugar' }
                ].map(obj => `
                  <label class="p-3 rounded-xl border ${saved?.objekTemuan && saved.objekTemuan.includes(obj.key) ? 'border-purple-600 bg-purple-50/70' : 'border-slate-200 bg-slate-50'} flex items-center gap-2.5 cursor-pointer hover:bg-purple-50/50 transition-all font-semibold text-slate-800 ${isFormLocked ? 'pointer-events-none' : ''}">
                    <input id="${obj.id}" type="checkbox" value="${obj.key}" ${saved?.objekTemuan && saved.objekTemuan.includes(obj.key) ? 'checked' : ''} ${readOnlyAttr} class="w-4 h-4 accent-purple-700 rounded">
                    <span>${obj.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- BAGIAN 3: BERBURU CERITA RELIEF -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2 text-purple-950 font-extrabold text-base border-b border-surface-container pb-2.5">
              <span class="material-symbols-outlined text-xl text-purple-700">auto_stories</span>
              <span>Bagian 3: Berburu Cerita Relief (1-2 Kalimat)</span>
            </div>

            <div>
              <label class="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                Pilih tokoh atau adegan relief yang Anda temukan di lorong candi:
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                ${['Hanoman si Kera Putih', 'Rama Memanah', 'Dewi Shinta', 'Burung Jatayu', 'Tokoh Lainnya'].map(tName => `
                  <label class="p-2.5 rounded-xl border ${saved?.tokohRelief === tName ? 'border-purple-600 bg-purple-50 text-purple-950 font-black ring-1 ring-purple-500' : 'border-slate-200 bg-slate-50 text-slate-700 font-semibold'} hover:bg-purple-50/70 cursor-pointer flex items-center justify-center gap-2 transition-all ${isFormLocked ? 'pointer-events-none' : ''}">
                    <input type="radio" name="d5TokohRelief" value="${tName}" ${saved?.tokohRelief === tName ? 'checked' : ''} ${readOnlyAttr} class="accent-purple-700">
                    <span class="truncate">${tName}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="pt-1">
              <label class="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Tuliskan 1 kalimat singkat apa yang sedang terjadi di relief itu:
              </label>
              <input id="txtD5CeritaRelief" type="text" ${readOnlyAttr} value="${saved?.ceritaRelief || ''}" placeholder="Contoh: Saya melihat pahatan Hanoman melompati pepohonan membawa pesan rahasia Rama." class="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400">
            </div>
          </div>

          <!-- BAGIAN 4: KESAN JELAJAH CANDI -->
          <div class="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/25 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2 text-purple-950 font-extrabold text-base border-b border-surface-container pb-2.5">
              <span class="material-symbols-outlined text-xl text-purple-700">sentiment_satisfied</span>
              <span>Bagian 4: Kesan Jelajah Candi Prambanan (1 Kalimat)</span>
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                Apa 1 hal paling keren atau membuat Anda kagum saat melihat langsung Candi Prambanan hari ini?
              </label>
              <input id="txtD5KesanJelajah" type="text" ${readOnlyAttr} value="${saved?.kesanJelajah || ''}" placeholder="Contoh: Candi Siwa sangat megah dan ukiran batunya luar biasa rapi padahal dibuat seribu tahun lalu." class="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400">
            </div>
          </div>

          <!-- TOMBOL SUBMIT / SIMPAN -->
          ${isSubmitted ? `
            <div class="p-4 rounded-3xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-purple-700 text-3xl">task_alt</span>
                <div>
                  <h4 class="font-extrabold text-sm text-purple-950">LKPD Sesi 1 Berhasil Disimpan & Dinilai</h4>
                  <p class="text-xs text-slate-600">Jawaban eksplorasi Candi Prambanan Anda telah tersinkronisasi ke server FINCESTEM.</p>
                </div>
              </div>
              <button type="button" onclick="window.location.href='dashboard.html?day=5&task=asesmen'" class="px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap">
                Lanjut ke Asesmen Kuis Day 5
              </button>
            </div>
          ` : (isLockedByPrereq ? `
            <div class="p-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-xs text-center border border-slate-200">
              Form LKPD terkunci. Selesaikan resume modul Day 5 Sesi 1 terlebih dahulu untuk mengaktifkan tombol simpan.
            </div>
          ` : `
            <button id="btnSaveFtD5S1Lkpd" type="submit" class="w-full py-4 px-6 rounded-2xl bg-purple-700 hover:bg-purple-800 active:scale-[0.99] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <span class="material-symbols-outlined text-xl">save</span>
              <span>Simpan Hasil Eksplorasi Candi Prambanan</span>
            </button>
          `)}

        </form>

        <!-- MODAL SUKSES SIMPAN LKPD SESI 1 -->
        <div id="modalLkpdFtD5S1Success" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 opacity-0 pointer-events-none transition-all duration-300">
          <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4 border border-slate-100 transform scale-95 transition-all">
            <div class="w-16 h-16 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl">celebration</span>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-black text-slate-900 leading-tight">Eksplorasi Prambanan Tuntas!</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Jawaban LKPD Sesi 1 berhasil disimpan. Akses ke kuis Asesmen Day 5 dan dokumentasi foto sekarang telah terbuka.
              </p>
            </div>
            <div class="flex flex-col w-full gap-2 pt-2">
              <button type="button" onclick="window.location.href='dashboard.html?day=5&task=asesmen'" class="w-full py-3.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all">
                <span class="material-symbols-outlined text-lg">fact_check</span>
                <span>Buka Kuis Asesmen Day 5</span>
              </button>
              <button type="button" onclick="closeFtD5S1LkpdModal()" class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all">
                Tetap di Halaman Ini
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function saveFtDay5S1LKPD() {
      const studentNisn = activeUser.nisn || activeUser.identifier || '';
      const cleanNisn = String(studentNisn).trim();

      const candiSiwa = !!document.getElementById('chkD5CandiSiwa')?.checked;
      const candiBrahma = !!document.getElementById('chkD5CandiBrahma')?.checked;
      const candiWisnu = !!document.getElementById('chkD5CandiWisnu')?.checked;
      const candiWahana = !!document.getElementById('chkD5CandiWahana')?.checked;

      const candiDekatEl = document.querySelector('input[name="d5CandiDekat"]:checked');
      const candiDekat = candiDekatEl ? candiDekatEl.value : '';

      const objekTemuan = [];
      if (document.getElementById('chkD5Objek1')?.checked) objekTemuan.push('arcaNandi');
      if (document.getElementById('chkD5Objek2')?.checked) objekTemuan.push('tanggaTinggi');
      if (document.getElementById('chkD5Objek3')?.checked) objekTemuan.push('reliefDinding');
      if (document.getElementById('chkD5Objek4')?.checked) objekTemuan.push('batuPugar');

      const tokohReliefEl = document.querySelector('input[name="d5TokohRelief"]:checked');
      const tokohRelief = tokohReliefEl ? tokohReliefEl.value : '';

      const ceritaRelief = (document.getElementById('txtD5CeritaRelief')?.value || '').trim();
      const kesanJelajah = (document.getElementById('txtD5KesanJelajah')?.value || '').trim();

      if (!candiSiwa && !candiBrahma && !candiWisnu && !candiWahana) {
        FincestemCore.ui.toast('Harap centang minimal 1 candi yang sudah Anda jelajahi di Bagian 1!', 'warning');
        return;
      }

      if (!candiDekat) {
        FincestemCore.ui.toast('Pilih salah satu candi yang Anda masuki / amati paling dekat di Bagian 2!', 'warning');
        return;
      }

      const payload = {
        day: 5,
        sesi: 1,
        pilar: 'EXPLORATION',
        candiSiwa: candiSiwa,
        candiBrahma: candiBrahma,
        candiWisnu: candiWisnu,
        candiWahana: candiWahana,
        candiDekat: candiDekat,
        objekTemuan: objekTemuan,
        tokohRelief: tokohRelief,
        ceritaRelief: ceritaRelief,
        kesanJelajah: kesanJelajah,
        submitted: true,
        submittedAt: new Date().toISOString()
      };

      const btn = document.getElementById('btnSaveFtD5S1Lkpd');
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan Eksplorasi...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), studentNisn];
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day5_prambanan_' + id, JSON.stringify(payload));
          localStorage.setItem('fincestem_lkpd_ft_day5_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(studentNisn, 5, 'lkpd_prambanan', payload, function() {
          FincestemCore.progress.submitTask(studentNisn, 5, 'lkpd', payload, function() {
            showFtD5S1LkpdModal();
          });
        });
      } else {
        showFtD5S1LkpdModal();
      }
    }

    function showFtD5S1LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S1Success');
      if (!modal) return;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeFtD5S1LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S1Success');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      renderFieldTripDay5LKPD(false, 1);
    }

    function saveFtDay5S2LKPD() {
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const cleanNisn = String(studentNisn).trim();

      const aliranLilin = document.querySelector('input[name="ftD5S2_aliranLilin"]:checked')?.value;
      const rintangWarna = document.querySelector('input[name="ftD5S2_rintangWarna"]:checked')?.value;
      const nglorodApung = document.querySelector('input[name="ftD5S2_nglorodApung"]:checked')?.value;
      const kesimpulanSains = (document.getElementById('ftD5S2_kesimpulanSains')?.value || '').trim();

      if (!aliranLilin) {
        FincestemCore.ui.toast('Harap pilih hasil pengamatan aliran lilin & canting tembaga (Bagian 1)!', 'warning');
        return;
      }
      if (!rintangWarna) {
        FincestemCore.ui.toast('Harap pilih hasil pengamatan sifat rintang hidrofobik lilin (Bagian 2)!', 'warning');
        return;
      }
      if (!nglorodApung) {
        FincestemCore.ui.toast('Harap pilih hasil pengamatan proses pelorotan & densitas lilin (Bagian 3)!', 'warning');
        return;
      }
      if (!kesimpulanSains || kesimpulanSains.length < 10) {
        FincestemCore.ui.toast('Tuliskan kesimpulan sains praktis membatik Anda minimal beberapa kata (Bagian 4)!', 'warning');
        const el = document.getElementById('ftD5S2_kesimpulanSains');
        if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        return;
      }

      const payload = {
        aliranLilin,
        rintangWarna,
        nglorodApung,
        kesimpulanSains,
        submitted: true,
        submittedAt: new Date().toISOString()
      };

      const btn = document.getElementById('btnSaveFtD5S2Lkpd');
      if (btn) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan LKPD Sesi 2...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), studentNisn];
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day5_batik_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      if (FincestemCore.progress) {
        FincestemCore.progress.submitTask(studentNisn, 5, 'lkpd_batik', payload, function() {
          showFtD5S2LkpdModal();
        });
      } else {
        showFtD5S2LkpdModal();
      }
    }

    function showFtD5S2LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S2Success');
      if (!modal) {
        FincestemCore.ui.toast('LKPD Sesi 2 (Praktik Membatik) Berhasil Disimpan & Dikirim!', 'success');
        renderFieldTripDay5LKPD(false, 2);
        return;
      }
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeFtD5S2LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S2Success');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      renderFieldTripDay5LKPD(false, 2);
    }

    function saveFtDay5S3LKPD(isFinal) {
      if (isFinal === undefined) isFinal = true;
      const studentNisn = activeUser.nisn || activeUser.identifier || '-';
      const cleanNisn = String(studentNisn).trim();

      const wawasanUny = (document.getElementById('ftD5S3_wawasanUny')?.value || '').trim();
      const prodiImpian = (document.getElementById('ftD5S3_prodiImpian')?.value || '').trim();
      const alasanProdi = (document.getElementById('ftD5S3_alasanProdi')?.value || '').trim();
      const komitmenSekolah = (document.getElementById('ftD5S3_komitmenSekolah')?.value || '').trim();

      if (isFinal) {
        if (!wawasanUny || wawasanUny.length < 10) {
          FincestemCore.ui.toast('Tuliskan wawasan/pengalaman kunjungan UNY Anda (Pertanyaan 1)!', 'warning');
          const el = document.getElementById('ftD5S3_wawasanUny');
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
        if (!prodiImpian) {
          FincestemCore.ui.toast('Tuliskan nama jurusan / prodi impian Anda (Pertanyaan 2)!', 'warning');
          const el = document.getElementById('ftD5S3_prodiImpian');
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
        if (!alasanProdi || alasanProdi.length < 5) {
          FincestemCore.ui.toast('Tuliskan alasan Anda memilih jurusan tersebut (Pertanyaan 2)!', 'warning');
          const el = document.getElementById('ftD5S3_alasanProdi');
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
        if (!komitmenSekolah || komitmenSekolah.length < 10) {
          FincestemCore.ui.toast('Tuliskan komitmen & ikhtiar Anda di sekolah (Pertanyaan 3)!', 'warning');
          const el = document.getElementById('ftD5S3_komitmenSekolah');
          if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          return;
        }
      }

      const payload = {
        wawasanUny,
        prodiImpian,
        alasanProdi,
        komitmenSekolah,
        submitted: !!isFinal,
        submittedAt: new Date().toISOString()
      };

      const btn = document.getElementById('btnSaveFtD5S3Lkpd');
      if (btn && isFinal) {
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>Menyimpan LKPD Sesi 3...</span>';
        btn.classList.add('pointer-events-none', 'opacity-80');
      }

      const idVars = [cleanNisn, cleanNisn.replace(/^0+/, ''), cleanNisn.padStart(10, '0'), studentNisn];
      idVars.forEach(id => {
        try {
          localStorage.setItem('fincestem_lkpd_ft_day5_uny_' + id, JSON.stringify(payload));
        } catch(e) {}
      });

      if (isFinal) {
        if (FincestemCore.progress) {
          FincestemCore.progress.submitTask(studentNisn, 5, 'lkpd_uny', payload, function() {
            showFtD5S3LkpdModal();
          });
        } else {
          showFtD5S3LkpdModal();
        }
      } else {
        FincestemCore.ui.toast('Draft LKPD Sesi 3 Kampus UNY berhasil disimpan.', 'info');
      }
    }

    function showFtD5S3LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S3Success');
      if (!modal) {
        FincestemCore.ui.toast('LKPD Sesi 3 (Kampus UNY) Berhasil Disimpan & Dikirim!', 'success');
        renderFieldTripDay5LKPD(false, 3);
        return;
      }
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      const inner = modal.querySelector('div');
      if (inner) {
        inner.classList.remove('scale-95');
        inner.classList.add('scale-100');
      }
    }

    function closeFtD5S3LkpdModal() {
      const modal = document.getElementById('modalLkpdFtD5S3Success');
      if (!modal) return;
      modal.classList.remove('opacity-100');
      modal.classList.add('opacity-0', 'pointer-events-none');
      renderFieldTripDay5LKPD(false, 3);
    }

    window.renderFieldTripDay5LKPD = renderFieldTripDay5LKPD;
    window.switchD5LkpdSession = switchD5LkpdSession;
    window.saveFtDay5S1LKPD = saveFtDay5S1LKPD;
    window.showFtD5S1LkpdModal = showFtD5S1LkpdModal;
    window.closeFtD5S1LkpdModal = closeFtD5S1LkpdModal;
    window.saveFtDay5S2LKPD = saveFtDay5S2LKPD;
    window.showFtD5S2LkpdModal = showFtD5S2LkpdModal;
    window.closeFtD5S2LkpdModal = closeFtD5S2LkpdModal;
    window.saveFtDay5S3LKPD = saveFtDay5S3LKPD;
    window.showFtD5S3LkpdModal = showFtD5S3LkpdModal;
    window.closeFtD5S3LkpdModal = closeFtD5S3LkpdModal;


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