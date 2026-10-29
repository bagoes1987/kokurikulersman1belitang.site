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
      startExamTimer();
      renderExamScreen();
      bindExamShieldListeners();
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
              <span class="text-[10.5px] text-slate-500">Acak dari 200 Bank Soal</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">Durasi Waktu</span>
              <strong class="text-sm text-teal-800 font-black">60 Menit</strong>
              <span class="text-[10.5px] text-slate-500">Mundur otomatis</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5 col-span-2 sm:col-span-1">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">Sistem Pengacakan</span>
              <strong class="text-sm text-slate-900 font-black">Soal &amp; Opsi Acak</strong>
              <span class="text-[10.5px] text-slate-500">Tiap siswa berbeda</span>
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
              <li><strong>Alarm Sirine Nyaring:</strong> Sirine keamanan akan berbunyi otomatis saat pelanggaran terdeteksi.</li>
              <li><strong>Watermark Identitas:</strong> Layar soal dilindungi watermark identitas Nama &amp; NISN Anda.</li>
              <li><strong>Auto-Save:</strong> Setiap pilihan yang Anda klik langsung tersimpan aman secara instan.</li>
            </ul>
          </div>

          <!-- KOTAK TES BUNYI ALARM -->
          <div class="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">campaign</span>
              </span>
              <div class="flex flex-col text-left">
                <span class="text-xs font-black text-amber-950">Alarm Audio Keamanan Aktif</span>
                <span class="text-[10.5px] text-amber-800">Sirine berbunyi jika pindah tab atau coba screenshot</span>
              </div>
            </div>
            <button type="button" onclick="window.testExamAlarmSound()" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1 shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-sm">volume_up</span>
              <span>Uji Sirine</span>
            </button>
          </div>
        </div>

        <!-- TOMBOL AKSI MULAI UJIAN -->
        <div class="flex flex-col gap-2 pt-1">
          <button type="button" onclick="window.startNonFieldTripExamNow()" class="w-full py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <span class="material-symbols-outlined text-xl">play_circle</span>
            <span>Saya Siap, Mulai Asesmen Sekarang (60 Menit)</span>
          </button>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1">
            <span>Batal &amp; Kembali ke Dashboard</span>
          </a>
        </div>

      </div>
    `;
  }

  /**
   * EKSEKUSI MULAI UJIAN
   */
  window.startNonFieldTripExamNow = function() {
    initAudioContext();
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
   * AUDIO ALARM KEAMANAN & SIREN GENERATOR (WEB AUDIO API)
   * Berbunyi keras saat terdeteksi tab-switch, screenshot, atau buka aplikasi lain
   */
  let audioCtx = null;
  let alarmInterval = null;

  function initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !audioCtx) {
        audioCtx = new AudioCtx();
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
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      
      // Siren warble: high (920Hz) -> mid (620Hz) -> high (920Hz) -> low (520Hz)
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.linearRampToValueAtTime(620, now + 0.15);
      osc.frequency.linearRampToValueAtTime(920, now + 0.3);
      osc.frequency.linearRampToValueAtTime(520, now + 0.45);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.setValueAtTime(0.35, now + 0.42);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn('Play alarm error:', e);
    }
  }

  function startExamAlarmLoop() {
    stopExamAlarmLoop();
    playSingleAlarmBeep();
    alarmInterval = setInterval(() => {
      playSingleAlarmBeep();
    }, 650);
  }

  function stopExamAlarmLoop() {
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmInterval = null;
    }
  }

  window.testExamAlarmSound = function() {
    initAudioContext();
    playSingleAlarmBeep();
  };

  /**
   * PROTEKSI EXAM SHIELD (TAB-SWITCH, SCREENSHOT, COPY)
   * Dilengkapi Debounce & State Machine Anti-Double Count
   */
  let shieldBound = false;
  let isTabAway = false;
  let isViolationModalOpen = false;
  let lastViolationTime = 0;
  const VIOLATION_DEBOUNCE_MS = 3000; // Minimal 3 detik jeda antar-pelanggaran

  function bindExamShieldListeners() {
    if (shieldBound) return;
    shieldBound = true;

    // 1. Blokir Copy, Cut, Context Menu
    document.addEventListener('copy', (e) => { e.preventDefault(); return false; });
    document.addEventListener('cut', (e) => { e.preventDefault(); return false; });
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });

    // 2. Deteksi Tab Switch & Minimize melalui visibilitychange
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleTabExit('Meninggalkan tab lembar asesmen');
      } else {
        handleTabReturn('Meninggalkan tab lembar asesmen');
      }
    });

    // 3. Deteksi Blur/Focus (Pindah window atau upaya screenshot laptop/HP)
    window.addEventListener('blur', () => {
      handleTabExit('Layar kehilangan fokus / upaya screenshot');
    });

    window.addEventListener('focus', () => {
      handleTabReturn('Layar kehilangan fokus / upaya screenshot');
    });
  }

  function handleTabExit(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    triggerBlackout();
    isTabAway = true;
  }

  function handleTabReturn(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    removeBlackout();
    if (isTabAway) {
      isTabAway = false;
      triggerViolation(reason || 'Meninggalkan lembar asesmen / membuka aplikasi lain');
    }
  }

  function triggerBlackout() {
    const el = document.getElementById('examQuestionContent');
    const ov = document.getElementById('blackoutOverlay');
    if (el) el.style.filter = 'blur(40px) brightness(0)';
    if (ov) ov.classList.remove('hidden');
  }

  function removeBlackout() {
    const el = document.getElementById('examQuestionContent');
    const ov = document.getElementById('blackoutOverlay');
    if (el) el.style.filter = 'none';
    if (ov) ov.classList.add('hidden');
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

    let title = '';
    let message = '';
    let badgeColor = '';
    let alertIcon = 'campaign';

    if (count === 1) {
      title = 'Peringatan Pelanggaran (1/3)';
      message = `Anda terdeteksi meninggalkan lembar asesmen (${escapeHtml(reason)}). Harap tetap berada di layar ujian! Sisa toleransi Anda tinggal <strong>2 kali</strong> lagi.`;
      badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
      alertIcon = 'gpp_maybe';
    } else if (count === 2) {
      title = 'PERINGATAN KERAS (2/3)!';
      message = `Anda terdeteksi kembali meninggalkan ujian (${escapeHtml(reason)}). Ini adalah peringatan terakhir! Jika terdeteksi <strong>1 KALI LAGI</strong>, sistem akan otomatis <strong>MENGUNCI &amp; MENGIRIM PAKSA</strong> lembar ujian Anda.`;
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-400';
      alertIcon = 'warning';
    } else {
      title = 'DISKUALIFIKASI OTOMATIS (3/3)';
      message = `Batas toleransi pelanggaran (3x) telah habis! Sistem secara otomatis <strong>mengunci dan mengumpulkan lembar jawaban Anda</strong> saat ini juga.`;
      badgeColor = 'bg-red-600 text-white border-red-700';
      alertIcon = 'block';
    }

    container.innerHTML = `
      <div id="examViolationModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border-2 ${count >= 2 ? 'border-rose-500' : 'border-amber-500'} flex flex-col items-center text-center gap-4 animate-scale-up">
          
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
              <span>Alarm Sirine Aktif</span>
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
        submitExam(true, 'Force Submit (Pelanggaran Tab 3x)');
      }, 2500);
    }
  }

  window.dismissExamViolationModal = function() {
    stopExamAlarmLoop();
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
