/**
 * FINCESTEM 2026 - Engine Asesmen Digital Khusus Non-Field Trip
 * Riset Mandiri di Wilayah Kabupaten OKU Timur
 * 
 * Fitur Utama:
 * 1. Seeded Randomizer (50 Soal dari Bank 200 berimbang 5 Indikator x 10 Soal per NISN)
 * 2. Fisher-Yates Choice Shuffler (Opsi A, B, C, D, E diacak per siswa)
 * 3. One-by-One Question Format & Drawer Navigasi 1-50 (Hijau, Kuning, Abu-abu)
 * 4. Timer 60 Menit Sinkron Lokal (Anti-Reset saat Refresh)
 * 5. FINCESTEM Exam Shield (Anti-SS Blackout on blur, Tab-Switch Max 3x, Watermark NISN)
 * 6. Real-time Local Storage Auto-Save & Integrasi Progress Core
 * 
 * File Terpisah - Bebas Konflik dengan Field Trip
 * Versi: 20261029_nft_asesmen_v1
 */

(function(window) {
  'use strict';

  // State Ujian
  let examState = {
    dayNum: 1,
    student: null,
    cleanNisn: '',
    pkg: null, // 50 soal terpilih
    currentIdx: 0, // 0 sampai 49
    answers: {}, // { [idx]: 'A' | 'B' | ... }
    markedDoubt: {}, // { [idx]: true }
    startTime: null,
    durationSeconds: 3600, // 60 menit
    remainingSeconds: 3600,
    violationCount: 0,
    isExamActive: false,
    isExamFinished: false,
    timerInterval: null
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // PRNG (Seeded Randomizer)
  function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    return function() {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = c << 21 | c >>> 11;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  function getSeededRandom(seedStr) {
    const seedGen = xmur3(seedStr);
    return sfc32(seedGen(), seedGen(), seedGen(), seedGen());
  }

  // Fisher-Yates Shuffle dengan Seeded Random
  function seededShuffle(array, rng) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  /**
   * Bangun Paket 50 Soal dari Bank 200 (10 Soal x 5 Indikator)
   */
  function generateStudentPackage(dayNum, cleanNisn) {
    const storageKey = `fincestem_pkg_nft_asesmen_d${dayNum}_${cleanNisn}`;
    try {
      const savedPkg = localStorage.getItem(storageKey);
      if (savedPkg) {
        return JSON.parse(savedPkg);
      }
    } catch(e) {}

    const allBank = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(dayNum)) || [];
    if (!allBank.length) return [];

    const rng = getSeededRandom(`fincestem_nft_day_${dayNum}_nisn_${cleanNisn}`);

    // Kelompokkan 40 soal per indikator (A, B, C, D, E)
    const grouped = { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [] };
    allBank.forEach(q => {
      if (grouped[q.indicatorCode]) {
        grouped[q.indicatorCode].push(q);
      }
    });

    const chosen50 = [];
    ['A', 'B', 'C', 'D', 'E'].forEach(code => {
      const pool = grouped[code] || [];
      const shuffled = seededShuffle(pool, rng);
      const picked10 = shuffled.slice(0, 10);
      chosen50.push(...picked10);
    });

    // Acak urutan 50 soal agar tersebar merata antar-indikator
    const mixed50 = seededShuffle(chosen50, rng);

    // Acak urutan pilihan (A, B, C, D, E) untuk tiap butir soal
    const finalPackage = mixed50.map((origQ, idx) => {
      const shuffledOptions = seededShuffle(origQ.options, rng);
      const keys = ['A', 'B', 'C', 'D', 'E'];
      let newCorrectKey = 'A';

      const remappedOptions = shuffledOptions.map((opt, optIdx) => {
        const assignedKey = keys[optIdx];
        if (opt.key === origQ.correct) {
          newCorrectKey = assignedKey;
        }
        return {
          key: assignedKey,
          text: opt.text,
          originalKey: opt.key
        };
      });

      return {
        questionIndex: idx, // 0 s.d. 49
        displayNumber: idx + 1, // 1 s.d. 50
        originalId: origQ.id,
        indicatorCode: origQ.indicatorCode,
        indicatorName: origQ.indicatorName,
        question: origQ.question,
        options: remappedOptions,
        correctKey: newCorrectKey,
        explanation: origQ.explanation || ''
      };
    });

    try {
      localStorage.setItem(storageKey, JSON.stringify(finalPackage));
    } catch(e) {}

    return finalPackage;
  }

  /**
   * Inisialisasi Halaman Asesmen Siswa
   */
  function initNonFieldTripAsesmenPage(dayNum) {
    dayNum = parseInt(dayNum) || 1;
    examState.dayNum = dayNum;

    const u = (window.FincestemCore && window.FincestemCore.auth && window.FincestemCore.auth.getUser()) || window.activeUser || {};
    examState.student = u;
    examState.cleanNisn = String(u.nisn || u.identifier || '').trim();

    if (!examState.cleanNisn) {
      alert('Sesi login tidak terdeteksi. Silakan login kembali.');
      window.location.replace('index.html');
      return;
    }

    // Cek Prasyarat: Modul Belajar & LKPD Day N harus selesai
    const hasMateri = checkPrerequisiteMateri(dayNum, examState.cleanNisn);
    const hasLkpd = checkPrerequisiteLkpd(dayNum, examState.cleanNisn);

    if (!hasMateri || !hasLkpd) {
      renderPrerequisiteLockedScreen(hasMateri, hasLkpd, dayNum);
      return;
    }

    // Cek apakah siswa sudah pernah menyelesaikan asesmen resmi
    const officialResult = getSavedOfficialAsesmen(dayNum, examState.cleanNisn);
    if (officialResult && (officialResult.submitted || officialResult.score !== undefined)) {
      renderCompletedResultScreen(officialResult);
      return;
    }

    // Ambil atau bangkitkan paket 50 soal
    examState.pkg = generateStudentPackage(dayNum, examState.cleanNisn);
    if (!examState.pkg || !examState.pkg.length) {
      alert('Bank soal Day ' + dayNum + ' belum tersedia di sistem.');
      window.location.replace('dashboard.html');
      return;
    }

    // Cek draft pengerjaan yang sedang berjalan
    loadDraftProgress();

    // Render layar selamat datang / mulai ujian atau lanjut mengerjakan
    if (examState.isExamActive && !examState.isExamFinished) {
      activateVolume100Watchdog();
      startExamTimer();
      renderExamScreen();
      bindExamShieldListeners();
      startScreenIntegrityWatchdog();
    } else {
      renderExamWelcomeScreen();
    }
  }

  function checkPrerequisiteMateri(dayNum, cleanNisn) {
    try {
      const rawM = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cleanNisn) ||
                   localStorage.getItem(`fincestem_materi_day${dayNum}_` + cleanNisn);
      if (rawM) {
        const p = JSON.parse(rawM);
        if (p && (p.submitted || p.cardA || p.conclusion)) return true;
      }
    } catch(e) {}
    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_materi`]) return true;
    }
    return false;
  }

  function checkPrerequisiteLkpd(dayNum, cleanNisn) {
    try {
      const rawLk = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_` + cleanNisn) ||
                    localStorage.getItem(`fincestem_lkpd_day${dayNum}_` + cleanNisn);
      if (rawLk) {
        const p = JSON.parse(rawLk);
        if (p && (p.submitted || p.submittedAt)) return true;
      }
    } catch(e) {}
    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_lkpd`]) return true;
    }
    return false;
  }

  function getSavedOfficialAsesmen(dayNum, cleanNisn) {
    try {
      const raw = localStorage.getItem(`fincestem_asesmen_nft_day${dayNum}_` + cleanNisn) ||
                  localStorage.getItem(`fincestem_asesmen_day${dayNum}_` + cleanNisn);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  }

  function loadDraftProgress() {
    const draftKey = `fincestem_draft_nft_asesmen_d${examState.dayNum}_${examState.cleanNisn}`;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (d) {
          examState.answers = d.answers || {};
          examState.markedDoubt = d.markedDoubt || {};
          examState.currentIdx = d.currentIdx || 0;
          examState.violationCount = d.violationCount || 0;
          if (d.startTime) {
            examState.startTime = new Date(d.startTime);
            const elapsed = Math.floor((Date.now() - examState.startTime.getTime()) / 1000);
            examState.remainingSeconds = Math.max(0, examState.durationSeconds - elapsed);
            if (examState.remainingSeconds > 0) {
              examState.isExamActive = true;
            } else {
              // Waktu sudah habis saat ditinggal
              submitExam(true, 'Waktu 60 Menit Habis');
            }
          }
        }
      }
    } catch(e) {}
  }

  function saveDraftProgress() {
    const draftKey = `fincestem_draft_nft_asesmen_d${examState.dayNum}_${examState.cleanNisn}`;
    try {
      const payload = {
        day: examState.dayNum,
        startTime: examState.startTime ? examState.startTime.toISOString() : null,
        currentIdx: examState.currentIdx,
        answers: examState.answers,
        markedDoubt: examState.markedDoubt,
        violationCount: examState.violationCount,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(draftKey, JSON.stringify(payload));
    } catch(e) {}
  }

  /**
   * LAYAR 1: TERKUNCI OLEH PRASYARAT
   */
  function renderPrerequisiteLockedScreen(hasMateri, hasLkpd, dayNum) {
    const root = document.getElementById('examRootContainer');
    if (!root) return;

    let lockReason = '';
    let actionBtn = '';
    if (!hasMateri) {
      lockReason = `Anda wajib menyelesaikan <strong>Tahap 1: Modul Belajar &amp; Resume Riset Day ${dayNum}</strong> terlebih dahulu.`;
      actionBtn = `<a href="materi.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka Modul Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
    } else if (!hasLkpd) {
      lockReason = `Anda wajib menyelesaikan dan mengirimkan <strong>Tahap 2: Lembar Kerja Peserta Didik (LKPD) Day ${dayNum}</strong> terlebih dahulu.`;
      actionBtn = `<a href="lkpd.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka LKPD Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
    }

    root.innerHTML = `
      <div class="max-w-md mx-auto w-full p-6 sm:p-7 rounded-3xl bg-white border-2 border-amber-300 shadow-xl text-center flex flex-col items-center gap-4 my-8 animate-fade-in">
        <div class="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-inner">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900">
            Alur Berurutan Day ${dayNum}
          </span>
          <h3 class="font-black text-lg sm:text-xl text-slate-900 mt-2">
            Kuis Asesmen Day ${dayNum} Masih Terkunci!
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5">
            ${lockReason}
          </p>
        </div>
        <div class="w-full flex flex-col gap-2 pt-2">
          ${actionBtn}
          <a href="dashboard.html" class="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>
      </div>
    `;
  }

  /**
   * LAYAR 2: WELCOME & PERSIAPAN UJIAN (PETUNJUK RESMI)
   */
  function renderExamWelcomeScreen() {
    const root = document.getElementById('examRootContainer');
    if (!root) return;

    const studentName = examState.student?.name || 'Peserta Non-Field Trip';
    const studentNisn = examState.cleanNisn;
    const studentClass = examState.student?.class || examState.student?.class_name || 'Kelas X';

    root.innerHTML = `
      <div class="max-w-xl mx-auto w-full p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col gap-5 my-6 animate-scale-up">
        
        <!-- KOP ATAS IDENTITAS ASESMEN -->
        <div class="bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-teal-700/50">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs">
              <span class="material-symbols-outlined text-sm">school</span>
              <span>Non-Field Trip • Day ${examState.dayNum}</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-teal-200 border border-white/15">
              Riset Mandiri OKU Timur
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              Kuis Asesmen Kompetensi Day ${examState.dayNum}
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              Uji pemahaman komprehensif berbasis 5 indikator literasi finansial &amp; potensi ekonomi OKU Timur.
            </p>
          </div>

          <!-- KARTU DATA SISWA -->
          <div class="grid grid-cols-3 gap-2 pt-3 border-t border-white/15 text-xs">
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Nama Peserta</span>
              <strong class="truncate text-white">${escapeHtml(studentName)}</strong>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">NISN</span>
              <strong class="truncate text-white">${escapeHtml(studentNisn)}</strong>
            </div>
            <div class="p-2.5 rounded-2xl bg-white/10 flex flex-col">
              <span class="text-teal-200 text-[10px] font-medium">Kelas</span>
              <strong class="truncate text-white">${escapeHtml(studentClass)}</strong>
            </div>
          </div>
        </div>

        <!-- SPESIFIKASI DAN ATURAN UJIAN (EXAM RULES) -->
        <div class="flex flex-col gap-2.5 text-xs text-slate-700">
          <h4 class="font-black text-sm text-slate-900 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-teal-700 text-base">rule</span>
            <span>Ketentuan &amp; Tata Tertib Asesmen:</span>
          </h4>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">Jumlah Soal</span>
              <strong class="text-sm text-slate-900 font-black">50 Soal PG</strong>
              <span class="text-[10.5px] text-slate-500">Pilihan Ganda (A - E)</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">Durasi Waktu</span>
              <strong class="text-sm text-teal-800 font-black">60 Menit</strong>
              <span class="text-[10.5px] text-slate-500">Mundur otomatis</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5 col-span-2 sm:col-span-1">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">KKM Kelulusan</span>
              <strong class="text-sm text-slate-900 font-black">75 / 100</strong>
              <span class="text-[10.5px] text-slate-500">Standar Kompetensi</span>
            </div>
          </div>

          <!-- PERINGATAN SISTEM BENTENG EXAM SHIELD -->
          <div class="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex flex-col gap-2 shadow-2xs">
            <div class="flex items-center gap-2 font-black text-xs text-rose-900">
              <span class="material-symbols-outlined text-rose-600 text-lg">shield</span>
              <span>Sistem Proteksi Keamanan "FINCESTEM Exam Shield" Aktif:</span>
            </div>
            <ul class="text-[11.5px] text-rose-900 space-y-1 list-disc list-inside font-medium leading-relaxed">
              <li><strong>Anti-Screenshot:</strong> Layar soal seketika menjadi <strong>HITAM PEKAT</strong> jika Anda mencoba mengambil tangkapan layar (screenshot).</li>
              <li><strong>Deteksi Pindah Tab / Buka Aplikasi Lain:</strong> Dilarang membuka Google, WhatsApp, atau aplikasi lain. Sistem mendeteksi otomatis maksimal <strong>3 kali pelanggaran</strong> sebelum ujian <strong>DIKUNCI &amp; DIKIRIM PAKSA</strong>!</li>
              <li><strong>Anti-Split Screen &amp; Layar Mengambang:</strong> Dilarang membagi layar menjadi 2 (Split Screen), menggunakan layar mengambang (Floating Window / Pop-up), atau monitor ganda. Sistem mendeteksi otomatis dan seketika mengunci layar!</li>
              <li><strong>Alarm Sirine Nyaring:</strong> Sirine keamanan akan berbunyi otomatis saat pelanggaran terdeteksi.</li>
              <li><strong>Watermark Identitas:</strong> Layar soal dilindungi watermark identitas Nama &amp; NISN Anda.</li>
              <li><strong>Auto-Save:</strong> Setiap pilihan yang Anda klik langsung tersimpan aman secara instan.</li>
            </ul>
          </div>

          <!-- GERBANG PENGUNCIAN SUARA 100% (MUTLAK & ANTI-TURUN) -->
          <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-amber-50 to-orange-50 border-2 border-amber-400 text-slate-900 flex flex-col gap-3.5 shadow-sm">
            
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                <span class="material-symbols-outlined text-2xl animate-pulse">lock</span>
              </div>
              <div class="flex flex-col text-left">
                <span class="text-xs font-black uppercase tracking-wider text-amber-950">Penguncian Suara 100% (Syarat Mutlak Asesmen)</span>
                <span class="text-[11px] text-slate-600 font-medium leading-tight">Tombol mulai asesmen otomatis terkunci sampai suara dikunci di 100%.</span>
              </div>
            </div>

            <!-- Petunjuk Ringkas & Peringatan Anti-Turunkan Volume -->
            <div class="p-3.5 rounded-2xl bg-white/95 border border-amber-300 text-xs text-slate-700 leading-relaxed space-y-1.5">
              <p class="font-bold text-amber-950 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-amber-600 text-base">gavel</span>
                <span>Regulasi Keamanan Ujian (Exam Shield):</span>
              </p>
              <p class="text-[11.5px] text-slate-600 leading-relaxed">
                1. Pastikan volume speaker HP Anda berada di <strong>100% (Maksimal)</strong>.<br>
                2. Tekan tombol <strong>Kunci Suara di 100% &amp; Uji Sirine</strong> di bawah.<br>
                3. Sistem mengunci volume di <strong>100% secara mutlak</strong>. Anda dilarang mengecilkan suara sampai ujian selesai (menekan tombol volume samping HP saat ujian memicu sensor kehilangan fokus &amp; dianggap pelanggaran otomatis).
              </p>
            </div>

            <!-- Tombol Kunci Suara 100% & Uji Sirine -->
            <div class="flex flex-col gap-2">
              <button type="button" id="btnTestAudioGate" onclick="window.handleGateLockVolume100()" class="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer">
                <span class="material-symbols-outlined text-lg" id="iconBtnAudioGate">lock_open</span>
                <span id="txtBtnTestAudio">🔒 Kunci Suara di 100% &amp; Uji Sirine Ujian</span>
              </button>
            </div>

            <!-- Meter Indikator Volume 100% -->
            <div id="volumeMeterContainer" class="p-3.5 rounded-2xl bg-white border border-amber-200 flex flex-col gap-2 shadow-inner">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-700 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-slate-500">volume_up</span>
                  <span>Status Volume Ujian:</span>
                </span>
                <span id="volumeLevelText" class="font-black text-slate-500">Belum Dikunci (Terkunci 0%)</span>
              </div>

              <!-- Bar Meter 100% -->
              <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
                <div id="volumeProgressBar" class="h-full bg-slate-300 transition-all duration-300 w-0"></div>
              </div>

              <div class="flex items-center justify-between text-[10px] text-slate-400 font-bold px-0.5">
                <span>0% (Hening)</span>
                <span class="text-amber-600">Standar Pengawas</span>
                <span class="text-emerald-700 font-black">100% (Wajib Terkunci)</span>
              </div>

              <!-- Pesan Status Volume -->
              <div id="volumeStatusMessage" class="p-2.5 rounded-xl bg-slate-50 text-[11px] font-bold text-slate-600 text-center border border-slate-200">
                Silakan tekan tombol di atas untuk mengunci volume sistem di 100% dan menguji sirine ujian.
              </div>
            </div>

          </div>
        </div>

        <!-- TOMBOL AKSI MULAI UJIAN (OTOMATIS NGELOCK / TIDAK TAMPIL SEBELUM DIKUNCI 100%) -->
        <div id="startExamActionContainer" class="hidden flex-col gap-2 pt-1 animate-scale-up">
          <button type="button" onclick="window.startNonFieldTripExamNow()" class="w-full py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <span class="material-symbols-outlined text-xl">play_circle</span>
            <span>Saya Siap, Mulai Asesmen Sekarang (60 Menit)</span>
          </button>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1">
            <span>Batal &amp; Kembali ke Dashboard</span>
          </a>
        </div>

        <!-- STATUS TERKUNCI (TAMPIL KETIKA BELUM DIKUNCI 100%) -->
        <div id="lockedExamNotice" class="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-base text-slate-400">lock</span>
          <span>Tombol Mulai Ujian Terkunci (Wajib Kunci Suara di 100% &amp; Uji Sirine)</span>
        </div>

      </div>
    `;
  }

  let isVolumeCalibrationPassed = false;

  window.handleGateLockVolume100 = function() {
    const btn = document.getElementById('btnTestAudioGate');
    const btnTxt = document.getElementById('txtBtnTestAudio');
    const iconBtn = document.getElementById('iconBtnAudioGate');
    const bar = document.getElementById('volumeProgressBar');
    const levelTxt = document.getElementById('volumeLevelText');
    const msg = document.getElementById('volumeStatusMessage');
    const startContainer = document.getElementById('startExamActionContainer');
    const lockNotice = document.getElementById('lockedExamNotice');

    // 1. Kunci Volume Audio Browser di 100% (volume = 1.0, muted = false)
    activateVolume100Watchdog();

    // 2. Putar bunyi sirine alarm ujian 100%
    if (btn) btn.classList.add('animate-pulse');
    if (btnTxt) btnTxt.textContent = 'Mengunci Suara di 100% & Menguji Sirine...';

    window.testExamAlarmSound();

    // 3. Update UI Realtime ke 100% Terkunci
    if (bar) {
      bar.style.width = '100%';
      bar.className = 'h-full bg-emerald-500 transition-all duration-300';
    }
    if (levelTxt) {
      levelTxt.textContent = '100% (TERKUNCI MUTLAK ✓)';
      levelTxt.className = 'font-black text-emerald-600';
    }
    if (msg) {
      msg.innerHTML = `<span class="text-emerald-900 font-extrabold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-base text-emerald-600">check_circle</span> Volume Suara Berhasil Dikunci di 100%. Tombol Mulai Asesmen Telah Terbuka!</span>`;
      msg.className = 'p-3 rounded-xl bg-emerald-50 text-[11.5px] font-bold text-center border border-emerald-300 shadow-2xs leading-snug';
    }

    setTimeout(() => {
      isVolumeCalibrationPassed = true;
      if (btn) {
        btn.classList.remove('animate-pulse');
        btn.className = 'w-full py-3.5 px-4 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-default';
      }
      if (iconBtn) iconBtn.textContent = 'lock';
      if (btnTxt) btnTxt.textContent = '✓ Suara Terkunci di 100% (Anti-Turunkan Aktif)';

      // Buka Tombol Mulai Ujian secara otomatis
      if (startContainer) {
        startContainer.classList.remove('hidden');
        startContainer.classList.add('flex');
      }
      if (lockNotice) lockNotice.classList.add('hidden');
    }, 1200);
  };

  /**
   * EKSEKUSI MULAI UJIAN
   */
  window.startNonFieldTripExamNow = function() {
    if (!isVolumeCalibrationPassed) {
      alert('Harap tekan tombol "Kunci Suara di 100% & Uji Sirine Ujian" terlebih dahulu sebelum memulai asesmen!');
      return;
    }
    activateVolume100Watchdog();
    primeAudioElements();
    examState.isExamActive = true;
    examState.isExamFinished = false;
    if (!examState.startTime) {
      examState.startTime = new Date();
      examState.remainingSeconds = examState.durationSeconds;
    }
    saveDraftProgress();
    startExamTimer();
    renderExamScreen();
    bindExamShieldListeners();
    startScreenIntegrityWatchdog();

    // Minta Layar Penuh (Fullscreen) jika didukung
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch(e) {}
  };

  /**
   * TIMER COUNTDOWN 60 MENIT
   */
  function startExamTimer() {
    clearInterval(examState.timerInterval);
    examState.timerInterval = setInterval(() => {
      examState.remainingSeconds--;
      if (examState.remainingSeconds <= 0) {
        clearInterval(examState.timerInterval);
        submitExam(true, 'Waktu Ujian 60 Menit Telah Habis');
      } else {
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('examCountdownTimer');
    if (!timerEl) return;

    const m = Math.floor(examState.remainingSeconds / 60);
    const s = examState.remainingSeconds % 60;
    const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    timerEl.textContent = str;

    // Kedip merah saat sisa waktu < 5 menit
    if (examState.remainingSeconds <= 300) {
      timerEl.className = 'font-black text-xs sm:text-sm text-rose-500 animate-pulse';
    } else {
      timerEl.className = 'font-black text-xs sm:text-sm text-amber-300';
    }
  }

  /**
   * LAYAR 3: INTERFACE UJIAN UTAMA (SATU PER SATU)
   */
  function renderExamScreen() {
    const root = document.getElementById('examRootContainer');
    if (!root) return;

    const q = examState.pkg[examState.currentIdx];
    if (!q) return;

    const totalQuestions = examState.pkg.length; // 50
    const answeredCount = Object.keys(examState.answers).length;
    const isDoubt = !!examState.markedDoubt[examState.currentIdx];
    const currentSelectedOption = examState.answers[examState.currentIdx] || '';

    const studentName = examState.student?.name || 'Siswa';
    const studentNisn = examState.cleanNisn;
    const nowHour = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    root.innerHTML = `
      <!-- WATERMARK SAMAR PENGAMAN (ANTI-FOTO JOKI) -->
      <div class="fixed inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden opacity-[0.06] select-none text-slate-900 font-black text-sm sm:text-base leading-loose text-center rotate-[-25deg]">
        ${escapeHtml(studentName)} • ${escapeHtml(studentNisn)} • FINCESTEM SMAN 1 BELITANG • ${nowHour} WIB<br>
        LEMBAR ASESMEN DIGITAL RESMI • HAK CIPTA KOKURIKULER 2026<br>
        ${escapeHtml(studentName)} • ${escapeHtml(studentNisn)} • FINCESTEM SMAN 1 BELITANG • ${nowHour} WIB
      </div>

      <!-- OVERLAY BLACKOUT SAAT ATTEMPT SCREENSHOT / BLUR -->
      <div id="blackoutOverlay" class="hidden fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center text-white">
        <span class="material-symbols-outlined text-5xl text-rose-500 animate-pulse">visibility_off</span>
        <h3 class="font-black text-lg sm:text-xl mt-3">Layar Diamankan (Anti-Screenshot)</h3>
        <p class="text-xs sm:text-sm text-slate-300 max-w-sm mt-1 leading-relaxed">
          Tangkapan layar dinonaktifkan demi integritas asesmen. Sentuh atau kembali ke layar untuk melanjutkan.
        </p>
      </div>

      <!-- MAIN EXAM CONTAINER -->
      <div id="examQuestionContent" class="max-w-xl mx-auto w-full flex flex-col gap-3 sm:gap-4 my-2 sm:my-4 transition-all duration-150">
        
        <!-- HEADER STATUS UJIAN (STICKY TOP) -->
        <div class="sticky top-2 z-30 p-3 sm:p-4 rounded-2xl bg-slate-950/95 backdrop-blur-md text-white border border-slate-800 shadow-lg flex items-center justify-between gap-2">
          
          <!-- Timer Mundur 60 Menit -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-lg">timer</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sisa Waktu:</span>
              <span id="examCountdownTimer" class="font-black text-xs sm:text-sm text-amber-300">--:--</span>
            </div>
          </div>

          <!-- Pelanggaran Tab Counter -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span id="examViolationCounterIcon" class="material-symbols-outlined text-sm ${examState.violationCount > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}">gpp_maybe</span>
            <span id="examViolationCounterBadge" class="text-[11px] font-bold ${examState.violationCount > 0 ? 'text-rose-300' : 'text-slate-300'}">
              Pelanggaran: <strong>${examState.violationCount} / 3</strong>
            </span>
          </div>

          <!-- Tombol Buka Laci Daftar Soal (1-50) -->
          <button type="button" onclick="window.openQuestionDrawerModal()" class="px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer border border-teal-600">
            <span class="material-symbols-outlined text-sm">grid_view</span>
            <span class="hidden sm:inline">Daftar Soal</span>
            <span class="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-black">${answeredCount}/${totalQuestions}</span>
          </button>
        </div>

        <!-- KARTU BUTIR SOAL SATU PER SATU -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden">
          
          <!-- BAR INFORMASI NOMOR SOAL & INDIKATOR -->
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-xl bg-slate-900 text-white font-black text-xs sm:text-sm shadow-2xs">
                Soal ${q.displayNumber} / ${totalQuestions}
              </span>
              <span class="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-teal-50 text-teal-900 border border-teal-200 truncate max-w-[200px] sm:max-w-none">
                ${q.indicatorName}
              </span>
            </div>

            <!-- Tombol Tandai Ragu-ragu -->
            <button type="button" onclick="window.toggleDoubtCurrentQuestion()" class="px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isDoubt 
                ? 'bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }">
              <span class="material-symbols-outlined text-sm ${isDoubt ? 'text-amber-950 font-black' : 'text-slate-500'}">bookmark</span>
              <span>${isDoubt ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
            </button>
          </div>

          <!-- TEKS PERTANYAAN (ANTI-COPY) -->
          <div class="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold select-none py-1">
            ${escapeHtml(q.question)}
          </div>

          <!-- PILIHAN JAWABAN (A, B, C, D, E) RAMAH JEMPOL SMARTPHONE -->
          <div class="flex flex-col gap-2 pt-1 select-none">
            ${q.options.map(opt => {
              const isSelected = (currentSelectedOption === opt.key);
              return `
                <button type="button" onclick="window.selectExamOption('${opt.key}')" class="w-full text-left p-3.5 sm:p-4 rounded-2xl flex items-start gap-3 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-50 border-2 border-teal-600 text-teal-950 shadow-xs font-bold' 
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-800 font-medium'
                }">
                  <span class="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 transition-all ${
                    isSelected ? 'bg-teal-700 text-white shadow-2xs' : 'bg-white border border-slate-300 text-slate-700'
                  }">
                    ${opt.key}
                  </span>
                  <span class="text-xs sm:text-sm leading-snug pt-0.5 flex-1">${escapeHtml(opt.text)}</span>
                  ${isSelected ? `<span class="material-symbols-outlined text-teal-700 text-base shrink-0 mt-0.5">check_circle</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>

        </div>

        <!-- BAR NAVIGASI BAWAH: PREV, DAFTAR SOAL, NEXT / FINISH -->
        <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-2">
          
          <!-- Tombol Sebelumnya -->
          <button type="button" onclick="window.navExamQuestion(-1)" ${examState.currentIdx === 0 ? 'disabled class="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 cursor-not-allowed font-bold text-xs flex items-center gap-1"' : 'class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1 cursor-pointer transition-all shadow-2xs"'}>
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Sebelumnya</span>
          </button>

          <!-- Indikator Tengah -->
          <span class="text-xs font-bold text-slate-500">
            ${examState.currentIdx + 1} / ${totalQuestions}
          </span>

          <!-- Tombol Berikutnya atau Selesai -->
          ${examState.currentIdx < totalQuestions - 1 ? `
            <button type="button" onclick="window.navExamQuestion(1)" class="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs flex items-center gap-1 cursor-pointer transition-all shadow-xs">
              <span>Selanjutnya</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          ` : `
            <button type="button" onclick="window.confirmSubmitExam()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md">
              <span class="material-symbols-outlined text-sm">send</span>
              <span>Selesai &amp; Kirim</span>
            </button>
          `}

        </div>

      </div>

      <!-- MODAL LACI DAFTAR SOAL (GRID 1 - 50) -->
      <div id="modalExamDrawer" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
        <div class="bg-white rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 flex flex-col gap-4 max-h-[85vh] overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="font-black text-sm sm:text-base text-slate-900">Daftar Butir Soal (1 - 50)</h3>
              <p class="text-[11px] text-slate-500 font-medium">Klik nomor soal untuk melompat langsung</p>
            </div>
            <button type="button" onclick="window.closeQuestionDrawerModal()" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <!-- KETERANGAN WARNA INDIKATOR -->
          <div class="flex items-center justify-between text-[11px] font-bold px-2 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <span class="flex items-center gap-1 text-emerald-800"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Dijawab (${answeredCount})</span>
            <span class="flex items-center gap-1 text-amber-800"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Ragu (${Object.keys(examState.markedDoubt).length})</span>
            <span class="flex items-center gap-1 text-slate-600"><span class="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300"></span> Belum (${totalQuestions - answeredCount})</span>
          </div>

          <!-- GRID 50 NOMOR SOAL -->
          <div class="grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-y-auto p-1 max-h-[40vh]">
            ${examState.pkg.map((_, i) => {
              const isAns = (examState.answers[i] !== undefined);
              const isDbt = !!examState.markedDoubt[i];
              const isCur = (i === examState.currentIdx);

              let style = 'bg-slate-100 text-slate-700 border-slate-200';
              if (isDbt) style = 'bg-amber-400 text-amber-950 font-black border-amber-500 shadow-2xs';
              else if (isAns) style = 'bg-emerald-600 text-white font-black border-emerald-700 shadow-2xs';

              return `
                <button type="button" onclick="window.jumpToQuestionIndex(${i})" class="w-full aspect-square rounded-xl text-xs font-bold flex items-center justify-center border transition-all cursor-pointer ${style} ${
                  isCur ? 'ring-2 ring-teal-600 ring-offset-1' : ''
                }">
                  ${i + 1}
                </button>
              `;
            }).join('')}
          </div>

          <!-- FOOTER LACI: TOMBOL KUMPULKAN -->
          <div class="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button type="button" onclick="window.confirmSubmitExam()" class="w-full py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-base">send</span>
              <span>Kumpulkan Ujian Sekarang</span>
            </button>
            <button type="button" onclick="window.closeQuestionDrawerModal()" class="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">
              Kembali ke Lembar Soal
            </button>
          </div>

        </div>
      </div>
    `;

    updateTimerDisplay();
  }

  // Interaktivitas Jawaban Siswa
  window.selectExamOption = function(optKey) {
    examState.answers[examState.currentIdx] = optKey;
    saveDraftProgress();
    renderExamScreen();
  };

  window.toggleDoubtCurrentQuestion = function() {
    if (examState.markedDoubt[examState.currentIdx]) {
      delete examState.markedDoubt[examState.currentIdx];
    } else {
      examState.markedDoubt[examState.currentIdx] = true;
    }
    saveDraftProgress();
    renderExamScreen();
  };

  window.navExamQuestion = function(delta) {
    const newIdx = examState.currentIdx + delta;
    if (newIdx >= 0 && newIdx < examState.pkg.length) {
      examState.currentIdx = newIdx;
      saveDraftProgress();
      renderExamScreen();
    }
  };

  window.openQuestionDrawerModal = function() {
    const modal = document.getElementById('modalExamDrawer');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeQuestionDrawerModal = function() {
    const modal = document.getElementById('modalExamDrawer');
    if (modal) modal.classList.add('hidden');
  };

  window.jumpToQuestionIndex = function(idx) {
    examState.currentIdx = idx;
    saveDraftProgress();
    window.closeQuestionDrawerModal();
    renderExamScreen();
  };

  /**
   * AUDIO ALARM KEAMANAN & SIREN GENERATOR
   * File Audio Utama: "alarm ujian.mp3"
   * Dilengkapi Cadangan Web Audio API Synthesizer (Zero-Failure Architecture)
   */
  let alarmAudioEl = null;
  let audioCtx = null;
  let alarmInterval = null;
  let compressorNode = null;
  let volume100WatchdogInterval = null;

  function activateVolume100Watchdog() {
    primeAudioElements();
    const a = getAlarmAudioElement();
    if (a) {
      a.volume = 1.0;
      a.muted = false;
    }
    if (volume100WatchdogInterval) clearInterval(volume100WatchdogInterval);
    volume100WatchdogInterval = setInterval(() => {
      const audio = getAlarmAudioElement();
      if (audio) {
        if (audio.volume < 1.0) audio.volume = 1.0;
        if (audio.muted) audio.muted = false;
      }
    }, 150);
  }

  function getAlarmAudioElement() {
    if (!alarmAudioEl) {
      try {
        alarmAudioEl = new Audio();
        // Path prioritas dari folder siswa maupun root
        alarmAudioEl.src = '../alarm%20ujian.mp3';
        alarmAudioEl.loop = true;
        alarmAudioEl.volume = 1.0;
        alarmAudioEl.muted = false;
        alarmAudioEl.preload = 'auto';

        // Event listener anti-turunkan volume: jika volume dicoba diturunkan, seketika dipaksa kembali ke 1.0
        alarmAudioEl.addEventListener('volumechange', () => {
          if (alarmAudioEl.volume < 1.0 || alarmAudioEl.muted) {
            alarmAudioEl.volume = 1.0;
            alarmAudioEl.muted = false;
          }
        });

        alarmAudioEl.onerror = function() {
          try {
            alarmAudioEl.src = 'alarm%20ujian.mp3';
          } catch(e) {}
        };
      } catch(e) {
        console.warn('Audio element error:', e);
      }
    }
    return alarmAudioEl;
  }

  function primeAudioElements() {
    initAudioContext();
    try {
      const a = getAlarmAudioElement();
      if (a) {
        a.load();
      }
    } catch(e) {}
  }

  function initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !audioCtx) {
        audioCtx = new AudioCtx();
        // Master Dynamics Compressor: Memaksimalkan desibel keluaran tanpa distorsi
        compressorNode = audioCtx.createDynamicsCompressor();
        compressorNode.threshold.setValueAtTime(-18, audioCtx.currentTime);
        compressorNode.knee.setValueAtTime(12, audioCtx.currentTime);
        compressorNode.ratio.setValueAtTime(20, audioCtx.currentTime);
        compressorNode.attack.setValueAtTime(0.001, audioCtx.currentTime);
        compressorNode.release.setValueAtTime(0.06, audioCtx.currentTime);
        compressorNode.connect(audioCtx.destination);
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn('AudioContext init error:', e);
    }
  }

  function playSingleAlarmBeep() {
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const targetDest = compressorNode || audioCtx.destination;

      // Master Gain Tingkat Maksimal (0.95)
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.95, now);
      masterGain.gain.setValueAtTime(0.95, now + 0.32);
      masterGain.gain.exponentialRampToValueAtTime(0.01, now + 0.36);
      masterGain.connect(targetDest);

      // OSCILLATOR 1: Nada Utama Melengking Menukik Tajam (Sawtooth 1600Hz -> 800Hz)
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(1600, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.16);
      osc1.frequency.setValueAtTime(1500, now + 0.17);
      osc1.frequency.exponentialRampToValueAtTime(700, now + 0.34);

      // OSCILLATOR 2: Nada Disonan Kasar Penambah Ketegangan (Square 1200Hz -> 600Hz)
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1200, now);
      osc2.frequency.exponentialRampToValueAtTime(600, now + 0.16);
      osc2.frequency.setValueAtTime(1100, now + 0.17);
      osc2.frequency.exponentialRampToValueAtTime(550, now + 0.34);

      // Gain sub-harmonis osc2
      const gain2 = audioCtx.createGain();
      gain2.gain.setValueAtTime(0.7, now);

      osc1.connect(masterGain);
      osc2.connect(gain2);
      gain2.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.36);
      osc2.stop(now + 0.36);
    } catch (e) {
      console.warn('Play alarm error:', e);
    }
  }

  function startExamAlarmLoop() {
    stopExamAlarmLoop();

    let mp3Started = false;
    try {
      const audio = getAlarmAudioElement();
      if (audio) {
        audio.currentTime = 0;
        audio.loop = true;
        audio.volume = 1.0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            mp3Started = true;
          }).catch((err) => {
            console.warn('MP3 playback blocked, falling back to Web Audio:', err);
            startSynthesizedAlarmLoop();
          });
        } else {
          mp3Started = true;
        }
      } else {
        startSynthesizedAlarmLoop();
      }
    } catch(e) {
      console.warn('MP3 error, falling back:', e);
      startSynthesizedAlarmLoop();
    }
  }

  function stopExamAlarmLoop() {
    try {
      if (alarmAudioEl) {
        alarmAudioEl.pause();
        alarmAudioEl.currentTime = 0;
      }
    } catch(e) {}
    stopSynthesizedAlarmLoop();
  }

  function startSynthesizedAlarmLoop() {
    stopSynthesizedAlarmLoop();
    playSingleAlarmBeep();
    alarmInterval = setInterval(() => {
      playSingleAlarmBeep();
    }, 380);
  }

  function stopSynthesizedAlarmLoop() {
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmInterval = null;
    }
  }

  /**
   * GETARAN DARURAT (HAPTIC VIBRATION API)
   * Bergetar kencang dan berdengung keras di atas meja saat terdeteksi pelanggaran
   */
  let vibrateInterval = null;

  function startExamVibrationLoop() {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        // Pola getar berulang kencang: 500ms getar, 200ms jeda, 500ms getar, 200ms jeda, 800ms getar
        navigator.vibrate([500, 200, 500, 200, 800]);
        clearInterval(vibrateInterval);
        vibrateInterval = setInterval(() => {
          if (navigator.vibrate) {
            navigator.vibrate([500, 200, 500, 200, 800]);
          }
        }, 2200);
      }
    } catch(e) {}
  }

  function stopExamVibrationLoop() {
    try {
      if (vibrateInterval) {
        clearInterval(vibrateInterval);
        vibrateInterval = null;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(0);
      }
    } catch(e) {}
  }

  window.testExamAlarmSound = function() {
    activateVolume100Watchdog();
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch(e) {}
    try {
      const audio = getAlarmAudioElement();
      if (audio) {
        audio.currentTime = 0;
        audio.loop = false;
        audio.volume = 1.0;
        audio.muted = false;
        const p = audio.play();
        if (p) {
          p.then(() => {
            // Berhenti setelah 2.5 detik suara tes sirine jika bukan dalam modal pelanggaran
            setTimeout(() => {
              try {
                if (!isViolationModalOpen) {
                  audio.pause();
                  audio.currentTime = 0;
                }
              } catch(e) {}
            }, 2500);
          }).catch(() => {
            playSingleAlarmBeep();
          });
        }
      } else {
        playSingleAlarmBeep();
      }
    } catch(e) {
      playSingleAlarmBeep();
    }
  };

  /**
   * PEMBERSIH CLIPBOARD OTOMATIS (ANTI-COPY/ANTI-SS PASTE)
   */
  function wipeClipboard() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('⚠️ DILARANG MENGAMBIL SCREENSHOT! FINCESTEM EXAM SHIELD AKTIF.').catch(() => {});
      }
    } catch(e) {}
  }

  /**
   * DETEKSI KOMBINASI TOMBOL SCREENSHOT (PRINTSCREEN, WIN+SHIFT+S, CTRL+P, DLL)
   */
  function isScreenshotAttempt(e) {
    if (!e) return false;
    const k = e.key || '';
    const code = e.code || '';
    const which = e.which || e.keyCode;

    // Tombol PrintScreen / Snapshot di segala keyboard
    if (k === 'PrintScreen' || code === 'PrintScreen' || which === 44 || k === 'Snapshot') {
      return true;
    }
    // Windows Snipping Tool: Win+Shift+S / Ctrl+Shift+S / Alt+Shift+S
    if (e.shiftKey && (k === 's' || k === 'S' || code === 'KeyS' || which === 83)) {
      if (e.metaKey || e.ctrlKey || e.altKey) return true;
    }
    // Cetak / Save PDF: Ctrl+P / Cmd+P
    if ((e.ctrlKey || e.metaKey) && (k === 'p' || k === 'P' || code === 'KeyP' || which === 80)) {
      return true;
    }
    // DevTools: F12 atau Ctrl+Shift+I / J / C
    if (which === 123 || ((e.ctrlKey || e.metaKey) && e.shiftKey && (which === 73 || which === 74 || which === 67))) {
      return true;
    }
    return false;
  }

  /**
   * PROTEKSI EXAM SHIELD (TAB-SWITCH, SCREENSHOT, COPY, SPLIT SCREEN, FLOATING WINDOW, DUAL DISPLAY)
   * Dilengkapi Debounce & State Machine Anti-Double Count
   */
  let shieldBound = false;
  let isTabAway = false;
  let isViolationModalOpen = false;
  let lastViolationTime = 0;
  let screenIntegrityWatchdogInterval = null;
  const VIOLATION_DEBOUNCE_MS = 3000; // Minimal 3 detik jeda antar-pelanggaran

  /**
   * DETEKSI DUA LAYAR (SPLIT SCREEN), LAYAR MENGAMBANG (FLOATING WINDOW) & MONITOR GANDA
   */
  function detectMultiWindowViolation() {
    if (!examState.isExamActive || examState.isExamFinished) return null;

    const screenW = screen.width || window.outerWidth || 1;
    const screenH = screen.height || window.outerHeight || 1;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // 1. Deteksi Picture-in-Picture (Video Mengambang)
    if (document.pictureInPictureElement) {
      try { document.exitPictureInPicture(); } catch(e) {}
      return 'Video Mengambang (Picture-in-Picture)';
    }

    // 2. Deteksi Layar Ganda / Multi-Monitor di PC/Laptop
    if (window.screen && window.screen.isExtended) {
      return 'Layar Ganda / Multi-Monitor (Terhubung 2 Layar)';
    }

    // 3. Deteksi Split Screen (Layar Belah) & Floating Window di Mobile / Tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchstart' in window) || (screenW <= 1024);

    if (isMobile) {
      const isPortrait = screenH >= screenW;
      if (isPortrait) {
        // Posisi tegak (Portrait): Split Screen memotong tinggi layar (< 62% tinggi fisik layar)
        const hRatio = winH / screenH;
        if (hRatio < 0.62) {
          return 'Layar Belah (Split Screen) - Tinggi layar terpotong menjadi 2';
        }
      } else {
        // Posisi tidur (Landscape): Split Screen memotong lebar layar (< 68% lebar fisik layar)
        const wRatio = winW / screenW;
        if (wRatio < 0.68) {
          return 'Layar Belah (Split Screen) - Lebar layar terpotong menjadi 2';
        }
      }

      // Deteksi Floating Window mini di HP (Jendela browser diperkecil melayang)
      if ((winW / screenW < 0.80) && (winH / screenH < 0.75)) {
        return 'Layar Mengambang (Floating Window / Pop-up View)';
      }
    } else {
      // 4. Deteksi Jendela Terbelah di PC / Laptop (Desktop Split Window < 65% lebar layar)
      if (winW / screenW < 0.65) {
        return 'Jendela Terbelah (Split Screen Desktop) - Wajib 1 Layar Penuh';
      }
    }

    return null;
  }

  function startScreenIntegrityWatchdog() {
    if (screenIntegrityWatchdogInterval) clearInterval(screenIntegrityWatchdogInterval);
    screenIntegrityWatchdogInterval = setInterval(() => {
      if (!examState.isExamActive || examState.isExamFinished) return;

      // Cek apakah ada pelanggaran rasio Split Screen atau Floating Window
      const violationReason = detectMultiWindowViolation();
      if (violationReason) {
        handleTabExit(violationReason);
        return;
      }

      // Cek kehilangan fokus (ketika siswa mengetuk floating window lain seperti kalkulator/chat melayang)
      if (typeof document.hasFocus === 'function' && !document.hasFocus() && !isTabAway && !isViolationModalOpen) {
        handleTabExit('Layar kehilangan fokus (Interaksi dengan Layar Mengambang / Aplikasi Lain)');
      }
    }, 400);
  }

  function stopScreenIntegrityWatchdog() {
    if (screenIntegrityWatchdogInterval) {
      clearInterval(screenIntegrityWatchdogInterval);
      screenIntegrityWatchdogInterval = null;
    }
  }

  function bindExamShieldListeners() {
    if (shieldBound) return;
    shieldBound = true;

    // 1. Blokir Copy, Cut, Context Menu
    document.addEventListener('copy', (e) => { e.preventDefault(); wipeClipboard(); return false; });
    document.addEventListener('cut', (e) => { e.preventDefault(); wipeClipboard(); return false; });
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });

    // 2. Cegah Tombol Screenshot di Keyboard (PrtScn, Win+Shift+S, Ctrl+P) via Capture Phase
    window.addEventListener('keydown', (e) => {
      if (isScreenshotAttempt(e)) {
        e.preventDefault();
        e.stopPropagation();
        triggerBlackout('Upaya tangkapan layar (Screenshot Keyboard)');
        wipeClipboard();
        if (examState.isExamActive && !examState.isExamFinished) {
          isTabAway = true;
          handleTabReturn('Upaya tangkapan layar (Screenshot Keyboard)');
        }
        return false;
      }
    }, true);

    window.addEventListener('keyup', (e) => {
      if (isScreenshotAttempt(e)) {
        e.preventDefault();
        e.stopPropagation();
        triggerBlackout('Upaya tangkapan layar (Screenshot Keyboard)');
        wipeClipboard();
        if (examState.isExamActive && !examState.isExamFinished) {
          isTabAway = true;
          handleTabReturn('Upaya tangkapan layar (Screenshot Keyboard)');
        }
        return false;
      }
    }, true);

    // 3. Deteksi Tab Switch & Minimize melalui visibilitychange
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleTabExit('Meninggalkan tab lembar asesmen');
      } else {
        handleTabReturn('Meninggalkan tab lembar asesmen');
      }
    });

    // 4. Deteksi Blur/Focus (Snipping Tool, ganti window, floating window, atau screenshot HP)
    window.addEventListener('blur', () => {
      handleTabExit('Layar kehilangan fokus / upaya screenshot / layar mengambang');
    });

    window.addEventListener('focus', () => {
      handleTabReturn('Layar kehilangan fokus / upaya screenshot');
    });

    // 5. Deteksi Perubahan Ukuran Layar Realtime (Resize / Split Screen Drag)
    window.addEventListener('resize', () => {
      if (examState.isExamActive && !examState.isExamFinished) {
        const violationReason = detectMultiWindowViolation();
        if (violationReason) {
          handleTabExit(violationReason);
        } else if (isTabAway) {
          handleTabReturn('Kembali ke satu layar penuh');
        }
      }
    });

    // 6. Deteksi Keluar Layar Penuh (Fullscreen Change)
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && examState.isExamActive && !examState.isExamFinished) {
        handleTabExit('Keluar dari Mode Layar Penuh (Fullscreen)');
      }
    });
    document.addEventListener('webkitfullscreenchange', () => {
      if (!document.webkitFullscreenElement && examState.isExamActive && !examState.isExamFinished) {
        handleTabExit('Keluar dari Mode Layar Penuh (Fullscreen)');
      }
    });

    // 7. Deteksi Mouse Keluar Jendela Browser (PC/Laptop Dual Display)
    document.addEventListener('mouseleave', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isViolationModalOpen) {
        triggerBlackout('Kursor mouse keluar dari area lembar asesmen');
      }
    });
    document.addEventListener('mouseenter', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isTabAway && !isViolationModalOpen) {
        removeBlackout();
      }
    });

    // 8. Klik pada overlay blackout untuk kembali
    const bo = document.getElementById('examShieldFullBlackout');
    if (bo) {
      bo.onclick = function() {
        handleTabReturn('Kembali dari pelepasan fokus layar');
      };
    }
  }

  function handleTabExit(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    triggerBlackout(reason);
    isTabAway = true;
  }

  function handleTabReturn(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    removeBlackout();
    wipeClipboard();
    if (isTabAway) {
      isTabAway = false;
      triggerViolation(reason || 'Meninggalkan lembar asesmen / membuka aplikasi lain');
    }
  }

  function triggerBlackout(reason) {
    try {
      document.documentElement.classList.add('exam-shield-blackout-active');
      document.body.classList.add('exam-shield-blackout-active');
      const bo = document.getElementById('examShieldFullBlackout');
      if (bo) {
        bo.style.display = 'flex';
        const titleEl = document.getElementById('examBlackoutTitle');
        const descEl = document.getElementById('examBlackoutDesc');
        const iconEl = document.getElementById('examBlackoutIcon');

        if (reason && (reason.includes('Split Screen') || reason.includes('Layar Belah') || reason.includes('Layar Ganda') || reason.includes('Dual Monitor') || reason.includes('Terbelah'))) {
          if (titleEl) titleEl.textContent = '⚠️ TERDETEKSI 2 LAYAR (SPLIT SCREEN / DUAL MONITOR)';
          if (descEl) descEl.innerHTML = `Sistem mendeteksi <strong>${escapeHtml(reason)}</strong>.<br><span class="text-rose-400 font-bold">Dilarang keras membagi layar atau menghubungkan 2 layar! Kembalikan ke 1 Layar Penuh untuk membuka soal.</span>`;
          if (iconEl) iconEl.textContent = 'splitscreen';
        } else if (reason && (reason.includes('Mengambang') || reason.includes('Floating') || reason.includes('Pop-up'))) {
          if (titleEl) titleEl.textContent = '⚠️ TERDETEKSI LAYAR MENGAMBANG (FLOATING WINDOW)';
          if (descEl) descEl.innerHTML = `Sistem mendeteksi <strong>${escapeHtml(reason)}</strong>.<br><span class="text-rose-400 font-bold">Tutup semua aplikasi mengambang dan kembali ke layar asesmen penuh.</span>`;
          if (iconEl) iconEl.textContent = 'picture_in_picture';
        } else if (reason && reason.includes('Kursor')) {
          if (titleEl) titleEl.textContent = '⚠️ KURSOR KELUAR DARI AREA UJIAN';
          if (descEl) descEl.innerHTML = `Kursor mouse Anda keluar dari batas layar lembar asesmen.<br><span class="text-rose-400 font-bold">Arahkan kursor kembali ke dalam lembar asesmen untuk melanjutkan.</span>`;
          if (iconEl) iconEl.textContent = 'near_me_disabled';
        } else {
          if (titleEl) titleEl.textContent = 'Layar Diamankan (Anti-Screenshot / Exam Shield)';
          if (descEl) descEl.innerHTML = `Sistem mendeteksi upaya penangkapan layar atau pelepasan fokus.<br><span class="text-rose-400 font-bold">Sentuh layar atau kembali ke tab asesmen untuk melanjutkan.</span>`;
          if (iconEl) iconEl.textContent = 'shield_lock';
        }
      }
      const el = document.getElementById('examQuestionContent');
      if (el) el.style.filter = 'blur(60px) brightness(0)';
      const ov = document.getElementById('blackoutOverlay');
      if (ov) ov.classList.remove('hidden');
    } catch(e) {}
    wipeClipboard();
  }

  function removeBlackout() {
    try {
      document.documentElement.classList.remove('exam-shield-blackout-active');
      document.body.classList.remove('exam-shield-blackout-active');
      const bo = document.getElementById('examShieldFullBlackout');
      if (bo) bo.style.display = 'none';
      const el = document.getElementById('examQuestionContent');
      if (el) el.style.filter = 'none';
      const ov = document.getElementById('blackoutOverlay');
      if (ov) ov.classList.add('hidden');
    } catch(e) {}
  }

  function updateViolationCounterDisplay() {
    const badge = document.getElementById('examViolationCounterBadge');
    const icon = document.getElementById('examViolationCounterIcon');
    if (badge) {
      badge.innerHTML = `Pelanggaran: <strong>${examState.violationCount} / 3</strong>`;
      badge.className = `text-[11px] font-bold ${examState.violationCount > 0 ? 'text-rose-300' : 'text-slate-300'}`;
    }
    if (icon) {
      icon.className = `material-symbols-outlined text-sm ${examState.violationCount > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`;
    }
  }

  function getOrCreateViolationContainer() {
    let container = document.getElementById('examViolationModalContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'examViolationModalContainer';
      document.body.appendChild(container);
    }
    return container;
  }

  function triggerViolation(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    if (isViolationModalOpen) return; // Jangan hitung berulang jika modal sedang terbuka

    const now = Date.now();
    if (now - lastViolationTime < VIOLATION_DEBOUNCE_MS) {
      return; // Batasi interval debounce minimal 3 detik
    }
    lastViolationTime = now;

    examState.violationCount++;
    saveDraftProgress();
    updateViolationCounterDisplay();

    showViolationModal(examState.violationCount, reason);
  }

  function showViolationModal(count, reason) {
    isViolationModalOpen = true;
    const container = getOrCreateViolationContainer();
    startExamAlarmLoop();
    startExamVibrationLoop();

    let title = '';
    let message = '';
    let badgeColor = '';
    let alertIcon = 'campaign';
    let alertBadgeText = 'PELANGGARAN SISTEM EXAM SHIELD';

    if (reason && (reason.includes('Split Screen') || reason.includes('Layar Belah') || reason.includes('Layar Ganda') || reason.includes('Dual Monitor') || reason.includes('Terbelah'))) {
      alertBadgeText = 'PELANGGARAN DUA LAYAR / SPLIT SCREEN';
      alertIcon = 'splitscreen';
    } else if (reason && (reason.includes('Mengambang') || reason.includes('Floating') || reason.includes('Pop-up'))) {
      alertBadgeText = 'PELANGGARAN LAYAR MENGAMBANG';
      alertIcon = 'picture_in_picture';
    }

    if (count === 1) {
      title = 'Peringatan Pelanggaran (1/3)';
      message = `Anda terdeteksi melakukan pelanggaran integritas asesmen (${escapeHtml(reason)}). Harap tetap berada di 1 layar penuh! Sisa toleransi Anda tinggal <strong>2 kali</strong> lagi.`;
      badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
      if (!alertIcon || alertIcon === 'campaign') alertIcon = 'gpp_maybe';
    } else if (count === 2) {
      title = 'PERINGATAN KERAS (2/3)!';
      message = `Anda terdeteksi kembali melakukan pelanggaran (${escapeHtml(reason)}). Ini adalah peringatan terakhir! Jika terdeteksi <strong>1 KALI LAGI</strong>, sistem akan otomatis <strong>MENGUNCI &amp; MENGIRIM PAKSA</strong> lembar ujian Anda.`;
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-400';
      if (!alertIcon || alertIcon === 'campaign') alertIcon = 'warning';
    } else {
      title = 'DISKUALIFIKASI OTOMATIS (3/3)';
      message = `Batas toleransi pelanggaran (3x) telah habis! Sistem secara otomatis <strong>mengunci dan mengumpulkan lembar jawaban Anda</strong> saat ini juga.`;
      badgeColor = 'bg-red-600 text-white border-red-700';
      alertIcon = 'block';
    }

    container.innerHTML = `
      <div id="examViolationModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-emergency-strobe select-none">
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border-2 ${count >= 2 ? 'border-rose-500' : 'border-amber-500'} flex flex-col items-center text-center gap-4 animate-scale-up">
          
          <!-- BEACON STROBO DARURAT ATAS -->
          <div class="w-full py-2 px-3 rounded-2xl bg-rose-700 text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 animate-pulse shadow-md">
            <span class="material-symbols-outlined text-base">emergency_home</span>
            <span>PERINGATAN DARURAT: PELANGGARAN TERDETEKSI</span>
            <span class="material-symbols-outlined text-base">emergency_home</span>
          </div>

          <!-- IKON ALARM PULSING -->
          <div class="relative flex items-center justify-center my-1">
            <span class="absolute w-20 h-20 rounded-full ${count >= 2 ? 'bg-rose-500/30' : 'bg-amber-500/30'} animate-ping"></span>
            <div class="w-16 h-16 rounded-2xl ${count >= 2 ? 'bg-rose-600' : 'bg-amber-500'} text-white flex items-center justify-center shadow-lg relative z-10">
              <span class="material-symbols-outlined text-4xl animate-pulse">${alertIcon}</span>
            </div>
          </div>

          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badgeColor} border shadow-2xs">
              <span class="material-symbols-outlined text-sm">crisis_alert</span>
              <span>PELANGGARAN SISTEM EXAM SHIELD</span>
            </div>
            <h3 class="font-black text-xl sm:text-2xl text-slate-900 mt-2.5">
              ${title}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-medium">
              ${message}
            </p>
          </div>

          <!-- KOTAK INDIKATOR TOLERANSI SISA -->
          <div class="w-full p-3.5 rounded-2xl ${count >= 3 ? 'bg-rose-950 text-rose-100' : 'bg-rose-50 border border-rose-200 text-rose-950'} text-xs font-bold flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm text-rose-600 animate-pulse">volume_up</span>
              <span>Sirine &amp; Getar Aktif</span>
            </span>
            <span class="px-2.5 py-1 rounded-xl ${count >= 3 ? 'bg-rose-600 text-white' : 'bg-rose-200 text-rose-900'} font-black">
              Pelanggaran ${count} dari 3
            </span>
          </div>

          <!-- TOMBOL AKSI DISMISS ATAU FORCE SUBMIT COUNTDOWN -->
          <div class="w-full pt-1">
            ${count < 3 ? `
              <button type="button" onclick="window.dismissExamViolationModal()" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer">
                <span class="material-symbols-outlined text-base">volume_off</span>
                <span>Saya Mengerti &amp; Matikan Alarm (Lanjut Ujian)</span>
              </button>
            ` : `
              <div class="p-3.5 rounded-2xl bg-rose-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim Paksa &amp; Mengunci Lembar Ujian...</span>
              </div>
            `}
          </div>

        </div>
      </div>
    `;

    if (count >= 3) {
      setTimeout(() => {
        stopExamAlarmLoop();
        stopExamVibrationLoop();
        submitExam(true, 'Force Submit (Pelanggaran Tab 3x)');
      }, 2500);
    }
  }

  window.dismissExamViolationModal = function() {
    stopExamAlarmLoop();
    stopExamVibrationLoop();
    isViolationModalOpen = false;
    isTabAway = false;
    lastViolationTime = Date.now();
    const container = document.getElementById('examViolationModalContainer');
    if (container) container.innerHTML = '';
    removeBlackout();
    updateViolationCounterDisplay();
    try { window.focus(); } catch(e) {}
  };

  /**
   * KONFIRMASI PENGUMPULAN UJIAN
   */
  window.confirmSubmitExam = function() {
    const totalQ = examState.pkg.length;
    const answeredCount = Object.keys(examState.answers).length;
    const unansweredCount = totalQ - answeredCount;

    let confirmMsg = 'Kumpulkan dan selesaikan Kuis Asesmen Day ' + examState.dayNum + ' sekarang?\n\n';
    if (unansweredCount > 0) {
      confirmMsg += `PERHATIAN: Masih ada ${unansweredCount} butir soal yang BELUM ANDA JAWAB!\n\n`;
    }
    confirmMsg += `• Soal Dijawab: ${answeredCount} dari ${totalQ}\n`;
    confirmMsg += `• Setelah dikumpulkan, lembar jawaban akan dinilai secara otomatis dan tidak dapat diulang kembali.\n\nLanjutkan mengumpulkan?`;

    if (confirm(confirmMsg)) {
      submitExam(false, 'Selesai Mandiri');
    }
  };

  /**
   * HITUNG NILAI & SUBMIT HASIL RESMI
   */
  function submitExam(isForce, noteReason) {
    if (examState.isExamFinished) return;
    examState.isExamFinished = true;
    examState.isExamActive = false;
    clearInterval(examState.timerInterval);
    stopExamAlarmLoop();
    stopExamVibrationLoop();
    stopScreenIntegrityWatchdog();
    if (volume100WatchdogInterval) {
      clearInterval(volume100WatchdogInterval);
      volume100WatchdogInterval = null;
    }

    // Hitung jawaban benar
    let correctCount = 0;
    examState.pkg.forEach((q, idx) => {
      const studentChoice = examState.answers[idx];
      if (studentChoice === q.correctKey) {
        correctCount++;
      }
    });

    const totalQuestions = examState.pkg.length; // 50
    const score = Math.round((correctCount / totalQuestions) * 100);
    const durationSpent = examState.durationSeconds - examState.remainingSeconds;

    const u = examState.student || {};
    const officialPayload = {
      day: examState.dayNum,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: examState.cleanNisn,
      studentClass: u.class || u.class_name || '',
      score: score,
      correctCount: correctCount,
      wrongCount: totalQuestions - correctCount,
      totalQuestions: totalQuestions,
      durationSpentSeconds: durationSpent,
      violationCount: examState.violationCount,
      note: noteReason || 'Asesmen Mandiri',
      answers: examState.answers
    };

    // Simpan ke storage resmi
    try {
      localStorage.setItem(`fincestem_asesmen_nft_day${examState.dayNum}_` + examState.cleanNisn, JSON.stringify(officialPayload));
      localStorage.setItem(`fincestem_asesmen_day${examState.dayNum}_` + examState.cleanNisn, JSON.stringify(officialPayload));
    } catch(e) {}

    // Kirim ke sistem Core Progress FINCESTEM
    const summaryNote = `Asesmen Day ${examState.dayNum} (Non-Field Trip): Skor ${score}/100 (${correctCount}/${totalQuestions} Benar). Waktu: ${Math.round(durationSpent/60)} mnt. ${noteReason || ''}`;
    if (window.FincestemCore && window.FincestemCore.progress && window.FincestemCore.progress.submitTask) {
      window.FincestemCore.progress.submitTask(examState.cleanNisn, examState.dayNum, 'asesmen', summaryNote, function() {
        renderCompletedResultScreen(officialPayload);
      });
    } else {
      renderCompletedResultScreen(officialPayload);
    }
  }

  /**
   * LAYAR 4: HASIL NILAI & REVIEW
   */
  function renderCompletedResultScreen(result) {
    const root = document.getElementById('examRootContainer');
    if (!root) return;

    const score = result.score || 0;
    const isPassed = (score >= 75);
    const dayNum = result.day || examState.dayNum;
    const studentName = result.studentName || examState.student?.name || 'Peserta';

    root.innerHTML = `
      <div class="max-w-md mx-auto w-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col items-center text-center gap-4 my-8 animate-scale-up">
        
        <!-- BADGE SKOR BESAR -->
        <div class="w-20 h-20 rounded-3xl ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-4xl">${isPassed ? 'verified' : 'military_tech'}</span>
        </div>

        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${isPassed ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}">
            ${isPassed ? 'Asesmen Tuntas &amp; Kompeten' : 'Asesmen Selesai'}
          </span>
          <h3 class="font-black text-xl sm:text-2xl text-slate-900 mt-2">
            Hasil Kuis Asesmen Day ${dayNum}
          </h3>
          <p class="text-xs text-slate-500 font-medium mt-0.5">
            Selamat, <strong>${escapeHtml(studentName)}</strong>! Jawaban Anda telah terekam resmi di server fasilitator.
          </p>
        </div>

        <!-- KOTAK SKOR ANGKA -->
        <div class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1 items-center justify-center shadow-inner">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider">Nilai Akhir Anda</span>
          <span class="text-4xl sm:text-5xl font-black ${isPassed ? 'text-teal-800' : 'text-amber-800'} tracking-tight">
            ${score}
          </span>
          <span class="text-[11px] text-slate-500 font-semibold">Skala Penilaian: 0 - 100</span>
        </div>

        <!-- STATISTIK RINCIAN -->
        <div class="w-full grid grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col">
            <span class="text-emerald-700 text-[10px] font-bold">Jawaban Benar</span>
            <strong class="text-emerald-950 font-black text-sm">${result.correctCount || 0} Soal</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col">
            <span class="text-rose-700 text-[10px] font-bold">Jawaban Salah</span>
            <strong class="text-rose-950 font-black text-sm">${result.wrongCount || 0} Soal</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex flex-col">
            <span class="text-slate-500 text-[10px] font-bold">Pelanggaran</span>
            <strong class="text-slate-800 font-black text-sm">${result.violationCount || 0}x</strong>
          </div>
        </div>

        <!-- INFO TAHAP BERIKUTNYA -->
        <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 text-xs text-left flex items-start gap-2.5 leading-relaxed w-full">
          <span class="material-symbols-outlined text-teal-700 text-base shrink-0 mt-0.5">lock_open</span>
          <div>
            <strong class="block text-teal-900 font-extrabold text-[11.5px]">Tahap 4 &amp; 5 Telah Terbuka:</strong>
            <p class="text-slate-600 font-medium mt-0.5">
              Anda kini dapat melanjutkan ke <strong>Dokumentasi Foto Lapangan</strong> dan <strong>Jurnal Refleksi Mandiri Day ${dayNum}</strong> di beranda dashboard.
            </p>
          </div>
        </div>

        <!-- TOMBOL AKSI KEMBALI -->
        <div class="w-full flex flex-col gap-2 pt-1">
          <a href="dokumentasi.html?day=${dayNum}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all">
            <span>Lanjut ke Dokumentasi Foto Day ${dayNum}</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>

      </div>
    `;
  }

  window.initNonFieldTripAsesmenPage = initNonFieldTripAsesmenPage;

})(window);
