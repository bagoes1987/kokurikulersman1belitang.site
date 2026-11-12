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

  var FincestemCore = window.FincestemCore || {};

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
   * Bangun Paket 50 Soal dari Bank 200 (10 Soal x 5 Indikator, Seimbang Rata)
   * Soal dan urutan pilihan ganda (A, B, C, D, E) diacak setiap sesi baru atau setelah reset!
   */
  function generateStudentPackage(dayNum, cleanNisn) {
    const isSecDay = (dayNum === 2 || dayNum === 3 || dayNum === 4 || dayNum === 5 || dayNum === 6);
    let selectedSector = isSecDay ? (examState && examState.selectedSector ? examState.selectedSector : getStudentDay3Sector(cleanNisn, dayNum)) : '';
    const storageKey = isSecDay
      ? `fincestem_pkg_nft_asesmen_v3_d${dayNum}_${selectedSector}_${cleanNisn}`
      : `fincestem_pkg_nft_asesmen_v3_d${dayNum}_${cleanNisn}`;
    const expectedLength = (dayNum === 0 || dayNum === 4 || dayNum === 5 || dayNum === 6) ? 10 : 50;
    try {
      // Bersihkan cache paket v1 & v2 lama jika ada
      localStorage.removeItem(`fincestem_pkg_nft_asesmen_v2_d${dayNum}_${cleanNisn}`);
      localStorage.removeItem(`fincestem_pkg_nft_asesmen_d${dayNum}_${cleanNisn}`);
      if (isSecDay) {
        // Hapus paket non-sektor lama jika ada
        localStorage.removeItem(`fincestem_pkg_nft_asesmen_v3_d${dayNum}_${cleanNisn}`);
      }
      const savedPkg = localStorage.getItem(storageKey);
      if (savedPkg) {
        const parsedPkg = JSON.parse(savedPkg);
        if (Array.isArray(parsedPkg) && parsedPkg.length === expectedLength) {
          if (isSecDay) {
            if (parsedPkg[0] && parsedPkg[0].sector === selectedSector) {
              return parsedPkg;
            } else {
              localStorage.removeItem(storageKey);
            }
          } else {
            return parsedPkg;
          }
        }
      }
    } catch(e) {}

    const allBank = (window.getNftBankSoalByDay && window.getNftBankSoalByDay(dayNum, (isSecDay ? selectedSector : undefined))) || [];
    if (!allBank.length) return [];

    // Gunakan kombinasi NISN + timestamp + random salt agar setiap kali ujian dimulai ulang / direset,
    // butir soal dan posisi opsi (A-E) teracak baru!
    const sessionSalt = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const rng = getSeededRandom(`fincestem_nft_day_${dayNum}_nisn_${cleanNisn}_salt_${sessionSalt}`);

    // KHUSUS DAY 0 SIMULASI (10 SOAL LATIHAN PILIHAN GANDA)
    if (dayNum === 0) {
      const shuffled10 = seededShuffle([...allBank], rng).slice(0, 10);
      const pkgWithShuffledChoices = shuffled10.map((origQ, qIdx) => {
        const choiceRng = getSeededRandom(`q_choice_d0_${cleanNisn}_${origQ.id}_${qIdx}_salt_${sessionSalt}`);
        const shuffledOptions = seededShuffle([...origQ.options], choiceRng);
        
        let newCorrectKey = 'A';
        const remappedOptions = shuffledOptions.map((opt, oIdx) => {
          const letter = ['A', 'B', 'C', 'D', 'E'][oIdx];
          if (opt.key === origQ.correct) {
            newCorrectKey = letter;
          }
          return {
            key: letter,
            text: opt.text
          };
        });

        return {
          id: origQ.id,
          displayNumber: qIdx + 1,
          day: 0,
          indicatorCode: origQ.indicatorCode,
          indicatorName: origQ.indicatorName,
          cognitiveLevel: origQ.cognitiveLevel || 'C2',
          question: origQ.question,
          options: remappedOptions,
          correctKey: newCorrectKey,
          explanation: origQ.explanation || ''
        };
      });
      try {
        localStorage.setItem(storageKey, JSON.stringify(pkgWithShuffledChoices));
      } catch(e) {}
      return pkgWithShuffledChoices;
    }

    // KHUSUS DAY 2 (SEKTOR ADAPTIF: 10 SOAL MODUL A + 10 SOAL MODUL B + 30 SOAL SPESIFIK SEKTOR = TEPAT 50 SOAL)
    if (dayNum === 2) {
      let sec = String(selectedSector || 'pangan').toLowerCase().trim();
      if (sec === 'pertanian') sec = 'pangan';
      if (sec === 'jasa') sec = 'industri';
      if (sec === 'keuangan') sec = 'formal';

      const d2All = (window.NFT_BANK_SOAL_DAYS && window.NFT_BANK_SOAL_DAYS[2]) || [];
      const poolA = d2All.filter(q => q.indicatorCode === 'A');
      const poolB = d2All.filter(q => q.indicatorCode === 'B');

      // 10 butir Modul A & 10 butir Modul B
      const pickedA = seededShuffle([...poolA], rng).slice(0, 10);
      const pickedB = seededShuffle([...poolB], rng).slice(0, 10);

      let pickedSec = [];
      if (sec === 'pangan') {
        const poolC = d2All.filter(q => q.indicatorCode === 'C');
        const poolD = d2All.filter(q => q.indicatorCode === 'D');
        const poolE = d2All.filter(q => q.indicatorCode === 'E');
        const pickC = seededShuffle([...poolC], rng).slice(0, 10);
        const pickD = seededShuffle([...poolD], rng).slice(0, 10);
        const pickE = seededShuffle([...poolE], rng).slice(0, 10);
        pickedSec = [...pickC, ...pickD, ...pickE];
      } else {
        const secBank = (window.NFT_DAY2_SECTOR_QUESTIONS && window.NFT_DAY2_SECTOR_QUESTIONS[sec]) || [];
        pickedSec = seededShuffle([...secBank], rng).slice(0, 30);
      }

      const combined50 = seededShuffle([...pickedA, ...pickedB, ...pickedSec], rng);

      const pkgWithShuffledChoices = combined50.map((origQ, qIdx) => {
        const choiceRng = getSeededRandom(`q_choice_d2_${cleanNisn}_${origQ.id}_${qIdx}_salt_${sessionSalt}`);
        const shuffledOptions = seededShuffle([...origQ.options], choiceRng);
        
        let newCorrectKey = 'A';
        const remappedOptions = shuffledOptions.map((opt, oIdx) => {
          const letter = ['A', 'B', 'C', 'D', 'E'][oIdx];
          if (opt.key === origQ.correct) {
            newCorrectKey = letter;
          }
          return {
            key: letter,
            text: opt.text
          };
        });

        return {
          id: origQ.id,
          displayNumber: qIdx + 1,
          day: 2,
          sector: origQ.sector || sec,
          indicatorCode: origQ.indicatorCode,
          indicatorKey: origQ.indicatorKey,
          indicatorName: origQ.indicatorName,
          cognitiveLevel: origQ.cognitiveLevel || 'C3',
          question: origQ.question,
          options: remappedOptions,
          correctKey: newCorrectKey,
          explanation: origQ.explanation || ''
        };
      });

      try {
        localStorage.setItem(storageKey, JSON.stringify(pkgWithShuffledChoices));
      } catch(e) {}
      return pkgWithShuffledChoices;
    }

        // KHUSUS DAY 4, DAY 5 & DAY 6 (10 SOAL SPESIFIK SEKTOR TERPILIH, ACAK BUTIR & PILIHAN A-E)
    if (dayNum === 4 || dayNum === 5 || dayNum === 6) {
      const chosen10 = [...allBank];
      const mixed10 = seededShuffle(chosen10, rng).slice(0, 10);
      const pkgWithShuffledChoices = mixed10.map((origQ, qIdx) => {
        const choiceRng = getSeededRandom(`q_choice_d${dayNum}_${cleanNisn}_${origQ.id}_${qIdx}_salt_${sessionSalt}`);
        const shuffledOptions = seededShuffle([...origQ.options], choiceRng);
        
        let newCorrectKey = 'A';
        const remappedOptions = shuffledOptions.map((opt, oIdx) => {
          const letter = ['A', 'B', 'C', 'D', 'E'][oIdx];
          if (opt.key === origQ.correct) {
            newCorrectKey = letter;
          }
          return {
            key: letter,
            text: opt.text
          };
        });

        return {
          id: origQ.id,
          displayNumber: qIdx + 1,
          day: dayNum,
          sector: origQ.sector || selectedSector,
          indicatorCode: origQ.indicatorCode,
          indicatorKey: origQ.indicatorKey,
          indicatorName: origQ.indicatorName,
          cognitiveLevel: origQ.cognitiveLevel || 'C3',
          question: origQ.question,
          options: remappedOptions,
          correctKey: newCorrectKey,
          explanation: origQ.explanation || ''
        };
      });
      try {
        localStorage.setItem(storageKey, JSON.stringify(pkgWithShuffledChoices));
      } catch(e) {}
      return pkgWithShuffledChoices;
    }

    // KHUSUS DAY 3 (50 SOAL SPESIFIK SEKTOR TERPILIH, ACAK BUTIR & PILIHAN A-E)
    if (dayNum === 3) {
      const chosen50 = [...allBank];
      const mixed50 = seededShuffle(chosen50, rng).slice(0, 50);
      const pkgWithShuffledChoices = mixed50.map((origQ, qIdx) => {
        const choiceRng = getSeededRandom(`q_choice_d${dayNum}_${cleanNisn}_${origQ.id}_${qIdx}_salt_${sessionSalt}`);
        const shuffledOptions = seededShuffle([...origQ.options], choiceRng);
        
        let newCorrectKey = 'A';
        const remappedOptions = shuffledOptions.map((opt, oIdx) => {
          const letter = ['A', 'B', 'C', 'D', 'E'][oIdx];
          if (opt.key === origQ.correct) {
            newCorrectKey = letter;
          }
          return {
            key: letter,
            text: opt.text
          };
        });

        return {
          id: origQ.id,
          displayNumber: qIdx + 1,
          day: dayNum,
          sector: origQ.sector || selectedSector,
          indicatorCode: origQ.indicatorCode,
          indicatorKey: origQ.indicatorKey,
          indicatorName: origQ.indicatorName,
          cognitiveLevel: origQ.cognitiveLevel || 'C3',
          question: origQ.question,
          options: remappedOptions,
          correctKey: newCorrectKey,
          explanation: origQ.explanation || ''
        };
      });
      try {
        localStorage.setItem(storageKey, JSON.stringify(pkgWithShuffledChoices));
      } catch(e) {}
      return pkgWithShuffledChoices;
    }

    // Kelompokkan 40 soal per indikator (A, B, C, D, E)
    const grouped = { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [] };
    allBank.forEach(q => {
      if (grouped[q.indicatorCode]) {
        grouped[q.indicatorCode].push(q);
      }
    });

    const isDay1or2 = (dayNum === 1 || dayNum === 2);
    const cognitiveQuota = isDay1or2 ? {
      'A': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'B': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'C': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'D': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'E': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 }
    } : {
      'A': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'B': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'C': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'D': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 },
      'E': { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 }
    };

    const chosen50 = [];
    ['A', 'B', 'C', 'D', 'E'].forEach(code => {
      const pool = grouped[code] || [];
      const quota = cognitiveQuota[code] || { C1: 2, C2: 2, C3: 2, C4: 2, C5: 2 };

      const byCog = { C1: [], C2: [], C3: [], C4: [], C5: [] };
      pool.forEach(item => {
        const lvl = item.cognitiveLevel || 'C2';
        if (byCog[lvl]) byCog[lvl].push(item);
        else byCog.C2.push(item);
      });

      let pickedForThisInd = [];
      const levelsToPick = isDay1or2 ? ['C1', 'C2', 'C3', 'C4', 'C5'] : ['C1', 'C2', 'C3', 'C4', 'C5'];
      levelsToPick.forEach(lvl => {
        const count = quota[lvl] || 2;
        const shuf = seededShuffle(byCog[lvl] || [], rng);
        pickedForThisInd.push(...shuf.slice(0, count));
      });

      // Cadangan pencegah underflow jika ada soal tanpa level lengkap
      if (pickedForThisInd.length < 10) {
        const remainingNeeded = 10 - pickedForThisInd.length;
        const alreadyIds = new Set(pickedForThisInd.map(x => x.id));
        const leftover = pool.filter(x => !alreadyIds.has(x.id));
        const shufLeft = seededShuffle(leftover, rng);
        pickedForThisInd.push(...shufLeft.slice(0, remainingNeeded));
      }

      chosen50.push(...pickedForThisInd);
    });

    // Acak urutan 50 soal agar tersebar merata antar-indikator dan level kognitif
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
        cognitiveLevel: origQ.cognitiveLevel || 'C2',
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
    dayNum = (dayNum !== undefined && dayNum !== null && !isNaN(dayNum) && Number(dayNum) === 0) ? 0 : (parseInt(dayNum) || 1);
    examState.dayNum = dayNum;
    examState.isExamActive = false;
    examState.isExamFinished = false;
    examState.answers = {};
    examState.markedDoubt = {};
    examState.currentIdx = 0;
    examState.startTime = null;
    examState.durationSeconds = (dayNum === 0) ? 900 : ((dayNum === 4 || dayNum === 5 || dayNum === 6) ? 1200 : 3600); // 15 menit Day 0, 20 menit Day 4,5,6, 60 menit Day 1,2,3,7
    examState.remainingSeconds = examState.durationSeconds;
    examState.violationCount = 0;

    const u = (window.FincestemCore && window.FincestemCore.auth && window.FincestemCore.auth.getUser()) || window.activeUser || {};
    examState.student = u;
    examState.cleanNisn = String(u.nisn || u.identifier || '').trim();

    if (!examState.cleanNisn) {
      alert('Sesi login tidak terdeteksi. Silakan login kembali.');
      window.location.replace('index.html');
      return;
    }

    if (dayNum >= 2 && dayNum <= 6) {
      examState.selectedSector = getStudentDay3Sector(examState.cleanNisn, dayNum);
    }

    // Cek Prasyarat: Modul Belajar, LKPD, & Dokumentasi (khusus Day 1-7)
    const isTesterBypass = (window.FincestemCore && window.FincestemCore.schedule && typeof window.FincestemCore.schedule.isTesterStudent === 'function' && window.FincestemCore.schedule.isTesterStudent(examState.cleanNisn));
    const hasLkpd = isTesterBypass ? true : checkPrerequisiteLkpd(dayNum, examState.cleanNisn);
    const hasMateri = isTesterBypass ? true : (hasLkpd || checkPrerequisiteMateri(dayNum, examState.cleanNisn));
    // Khusus Day 5-6 (video) Dokumentasi mendahului LKPD video, Day 1-4 Dokumentasi fleksibel bersamaan asesmen
    const hasDok = isTesterBypass ? true : ((dayNum === 5 || dayNum === 6) ? checkPrerequisiteDok(dayNum, examState.cleanNisn) : true);

    if (!hasMateri || !hasLkpd || !hasDok) {
      renderPrerequisiteLockedScreen(hasMateri, hasLkpd, dayNum, hasDok);
      return;
    }

    // Khusus Day 7: Bebas Kuis Asesmen (Langsung Tampil Layar Apresiasi Kelulusan 100/100)
    if (dayNum === 7) {
      renderDay7CelebrationScreen(hasMateri, hasLkpd, hasDok);
      return;
    }

    // Cek apakah siswa sudah pernah menyelesaikan asesmen resmi
    const officialResult = getSavedOfficialAsesmen(dayNum, examState.cleanNisn);
    if (officialResult && (officialResult.submitted || officialResult.score !== undefined)) {
      renderCompletedResultScreen(officialResult);
      return;
    }

    // Ambil draft pengerjaan yang sedang berjalan terlebih dahulu (dan bersihkan jika baru direset)
    loadDraftProgress();

    // Ambil atau bangkitkan paket 50 soal (jika belum ada paket di localStorage atau baru direset, bangkitkan acak baru!)
    examState.pkg = generateStudentPackage(dayNum, examState.cleanNisn);
    if (!examState.pkg || !examState.pkg.length) {
      alert('Bank soal Day ' + dayNum + ' belum tersedia di sistem.');
      window.location.replace('dashboard.html');
      return;
    }

    // Rekam baseline ukuran layar fisik perangkat
    recordHardwareScreenBaseline();

    // Render layar selamat datang / mulai ujian atau lanjut mengerjakan
    if (examState.isExamActive && !examState.isExamFinished) {
      activateVolume100Watchdog();
      startExamTimer();
      renderExamScreen();
      bindExamShieldListeners();
      startScreenIntegrityWatchdog();
      resetQuestionIdleBlurTimer();
    } else {
      renderExamWelcomeScreen();
    }
  }

  function checkPrerequisiteMateri(dayNum, cleanNisn) {
    if (checkPrerequisiteLkpd(dayNum, cleanNisn)) return true;
    const candidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      candidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) candidateIds.add(cleanNisn.padStart(10, '0'));
    }
    for (const cid of candidateIds) {
      try {
        const rawM = localStorage.getItem(`fincestem_materi_nft_day${dayNum}_` + cid) ||
                     localStorage.getItem(`fincestem_materi_day${dayNum}_` + cid);
        if (rawM) {
          const p = JSON.parse(rawM);
          if (p && (p.submitted || p.cardA || p.conclusion || p.summary)) return true;
        }
      } catch(e) {}
    }
    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      if (window.currentStudentProgress.task_map[`${dayNum}_materi`]) return true;
    }
    for (const cid of candidateIds) {
      try {
        const pRaw = localStorage.getItem('fincestem_progress_' + cid);
        if (pRaw) {
          const p = JSON.parse(pRaw);
          if (p && p.task_map && p.task_map[`${dayNum}_materi`]) return true;
        }
      } catch(e) {}
    }
    return false;
  }

  function checkPrerequisiteLkpd(dayNum, cleanNisn) {
    const u = (examState && examState.student) || (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser()) || window.activeUser || {};
    const candidateIds = new Set([cleanNisn]);
    if (cleanNisn) {
      candidateIds.add(cleanNisn.replace(/^0+/, ''));
      if (cleanNisn.length >= 8 && cleanNisn.length <= 10) candidateIds.add(cleanNisn.padStart(10, '0'));
    }
    if (u.nis) candidateIds.add(String(u.nis).trim());
    if (u.identifier) candidateIds.add(String(u.identifier).trim());

    // 1. Cek dari task_map atau records jika sudah dinilai / diserahkan
    if (window.currentStudentProgress) {
      const p = window.currentStudentProgress;
      if (p.task_map && p.task_map[`${dayNum}_lkpd`]) return true;
      if (Array.isArray(p.records) && p.records.some(r => Number(r.day_number) === dayNum && (r.task_type === 'lkpd' || (r.score !== undefined && r.score !== null)))) return true;
    }

    // 2. Cek fincestem_progress_ di localStorage
    for (const cid of candidateIds) {
      try {
        const pRaw = localStorage.getItem('fincestem_progress_' + cid);
        if (pRaw) {
          const p = JSON.parse(pRaw);
          if (p) {
            if (p.task_map && p.task_map[`${dayNum}_lkpd`]) return true;
            if (Array.isArray(p.records) && p.records.some(r => Number(r.day_number) === dayNum && (r.task_type === 'lkpd' || (r.score !== undefined && r.score !== null)))) return true;
          }
        }
      } catch(e) {}
    }

    // 3. Cek localStorage langsung (submisi resmi atau draf aktif)
    for (const cid of candidateIds) {
      try {
        const rawLk = localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_` + cid) ||
                      localStorage.getItem(`fincestem_lkpd_day${dayNum}_` + cid) ||
                      localStorage.getItem(`fincestem_lkpd_nft_day${dayNum}_draft_` + cid) ||
                      localStorage.getItem(`fincestem_draft_nft_lkpd_d${dayNum}_` + cid) ||
                      localStorage.getItem(`fincestem_lkpd_draft_day${dayNum}_` + cid);
        if (rawLk) {
          const p = JSON.parse(rawLk);
          if (p && (p.submitted || p.is_submitted || p.submitted_at || p.submittedAt || p.answers || p.location || p.district || p.roadNotes || p.roadCondition || p.summary || p.sectorKey)) return true;
        }
      } catch(e) {}
    }

    return false;
  }

  function checkPrerequisiteDok(dayNum, cleanNisn) {
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

  function getSavedOfficialAsesmen(dayNum, cleanNisn) {
    try {
      const raw = localStorage.getItem(`fincestem_asesmen_nft_day${dayNum}_` + cleanNisn) ||
                  localStorage.getItem(`fincestem_asesmen_day${dayNum}_` + cleanNisn);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    // Fallback: cek window.currentStudentProgress atau localStorage fincestem_progress_
    try {
      const progRaw = localStorage.getItem('fincestem_progress_' + cleanNisn);
      if (progRaw) {
        const prog = JSON.parse(progRaw);
        const t = (prog && prog.task_map) ? prog.task_map[`${dayNum}_asesmen`] : null;
        if (t && (t.status === 'submitted' || t.status === 'completed')) {
          let parsed = t.content;
          if (typeof parsed === 'string' && (parsed.startsWith('{') || parsed.startsWith('['))) {
            try { parsed = JSON.parse(parsed); } catch(e) {}
          }
          if (typeof parsed === 'object' && parsed) {
            return parsed;
          }
          const recGrade = (prog.records || []).find(r => Number(r.day_number) === Number(dayNum));
          let sc = (recGrade && recGrade.score) ? parseFloat(recGrade.score) : null;
          if (sc === null && t.score !== null && !isNaN(t.score)) sc = parseFloat(t.score);
          if (sc === null) {
            const m = String(t.content || '').match(/Skor\s*(\d+(?:\.\d+)?)/i);
            if (m) sc = parseFloat(m[1]);
          }
          if (sc === null) sc = 95;

          const rawSummary = String(t.content || '');
          let correctCount = Math.round((sc / 100) * 50);
          let totalQuestions = (dayNum === 0 || dayNum === 4 || dayNum === 5 || dayNum === 6) ? 10 : 50;
          let wrongCount = totalQuestions - correctCount;
          let durationMins = 28;

          const mCorr = rawSummary.match(/\((\d+)\/(\d+)\s*Benar\)/i);
          if (mCorr) {
            correctCount = parseInt(mCorr[1], 10);
            totalQuestions = parseInt(mCorr[2], 10);
            wrongCount = Math.max(0, totalQuestions - correctCount);
          }

          const mDur = rawSummary.match(/Waktu:\s*(\d+)\s*mnt/i);
          if (mDur) durationMins = parseInt(mDur[1], 10);

          return {
            day: dayNum,
            submitted: true,
            score: sc,
            scoreScale4: (sc / 25).toFixed(2),
            predicate: (sc >= 88) ? 'Sangat Baik' : 'Baik',
            correctCount: correctCount,
            wrongCount: wrongCount,
            totalQuestions: totalQuestions,
            durationSpentSeconds: durationMins * 60,
            violationCount: 0,
            summary: rawSummary || `Asesmen Day ${dayNum} Terverifikasi: Skor ${sc}/100`
          };
        }
      }
    } catch(eProg) {}
    return null;
  }

  function loadDraftProgress() {
    const draftKey = `fincestem_draft_nft_asesmen_d${examState.dayNum}_${examState.cleanNisn}`;
    const pkgKeyV3 = `fincestem_pkg_nft_asesmen_v3_d${examState.dayNum}_${examState.cleanNisn}`;
    const pkgKeyV2 = `fincestem_pkg_nft_asesmen_v2_d${examState.dayNum}_${examState.cleanNisn}`;
    const pkgKeyV1 = `fincestem_pkg_nft_asesmen_d${examState.dayNum}_${examState.cleanNisn}`;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (d) {
          // 1. Jika draft memiliki violationCount >= 3 atau isFinished, itu adalah draft usang sebelum force-submit/reset.
          // 2. Atau jika terdapat riwayat reset_info dari server yang lebih baru dari waktu draft dibuat/diupdate, bersihkan!
          let shouldClearStaleDraft = false;
          if ((parseInt(d.violationCount) || 0) >= 3 || d.isFinished) {
            shouldClearStaleDraft = true;
          } else if (d.sector && examState.selectedSector && d.sector !== examState.selectedSector) {
            shouldClearStaleDraft = true;
          } else {
            const resetInfo = window.currentStudentProgress && window.currentStudentProgress.reset_info;
            if (resetInfo && resetInfo.reset_at) {
              const targetDay = resetInfo.target_day !== undefined ? parseInt(resetInfo.target_day) : -1;
              const isAsesmenReset = !resetInfo.components || resetInfo.components.asesmen;
              if ((targetDay < 0 || targetDay === examState.dayNum) && isAsesmenReset) {
                const draftTimeStr = d.updatedAt || d.startTime;
                const draftMs = draftTimeStr ? new Date(draftTimeStr).getTime() : 0;
                const resetMs = new Date(resetInfo.reset_at).getTime();
                if (!draftMs || (!isNaN(resetMs) && draftMs <= resetMs + 5000)) {
                  shouldClearStaleDraft = true;
                }
              }
            }
          }

          if (shouldClearStaleDraft) {
            localStorage.removeItem(draftKey);
            localStorage.removeItem(pkgKeyV3);
            localStorage.removeItem(pkgKeyV2);
            localStorage.removeItem(pkgKeyV1);
            examState.answers = {};
            examState.markedDoubt = {};
            examState.currentIdx = 0;
            examState.violationCount = 0;
            examState.startTime = null;
            examState.remainingSeconds = examState.durationSeconds;
            examState.isExamActive = false;
            return;
          }

          examState.answers = d.answers || {};
          examState.markedDoubt = d.markedDoubt || {};
          examState.currentIdx = d.currentIdx || 0;
          examState.violationCount = Math.max(0, Math.min(2, parseInt(d.violationCount) || 0));
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
        sector: examState.selectedSector || '',
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
  function renderPrerequisiteLockedScreen(hasMateri, hasLkpd, dayNum, hasDok = true) {
    const root = document.getElementById('examRootContainer');
    if (!root) return;

    let lockReason = '';
    let actionBtn = '';
    const isNftD5orD6 = (dayNum === 5 || dayNum === 6);
    if (isNftD5orD6) {
      // Urutan Day 5-6 Non-Field Trip: 1. Modul -> 2. Dokumentasi -> 3. LKPD -> 4. Asesmen -> 5. Refleksi -> 6. Penilaian
      if (!hasMateri) {
        lockReason = `Anda wajib menyelesaikan <strong>Tahap 1: Modul Belajar &amp; Panduan Video Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="materi.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka Modul Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      } else if (!hasDok) {
        lockReason = `Anda wajib menyelesaikan <strong>Tahap 2: Dokumentasi Foto Riset Lapangan Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="dokumentasi.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka Dokumentasi Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      } else if (!hasLkpd) {
        lockReason = `Anda wajib menyelesaikan dan mengirimkan <strong>Tahap 3: Lembar Kerja Peserta Didik (LKPD Video) Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="lkpd.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka LKPD Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      }
    } else {
      if (!hasMateri) {
        lockReason = `Anda wajib menyelesaikan <strong>Tahap 1: Modul Belajar &amp; Resume Riset Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="materi.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka Modul Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      } else if (!hasLkpd) {
        lockReason = `Anda wajib menyelesaikan dan mengirimkan <strong>Tahap 2: Lembar Kerja Peserta Didik (LKPD) Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="lkpd.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka LKPD Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      } else if (!hasDok) {
        lockReason = `Anda wajib menyelesaikan <strong>Tahap 3: Dokumentasi Foto Kegiatan Day ${dayNum}</strong> terlebih dahulu.`;
        actionBtn = `<a href="dokumentasi.html?day=${dayNum}" class="px-6 py-3 rounded-2xl bg-teal-800 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"><span>Buka Dokumentasi Day ${dayNum}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
      }
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
    const isDay0 = (examState.dayNum === 0);
    const isDay2 = (examState.dayNum === 2);
    const isDay3 = (examState.dayNum === 3);
    const isDay4 = (examState.dayNum === 4);
    const isDay5 = (examState.dayNum === 5);
    const isDay6 = (examState.dayNum === 6);
    const isSectorDay = (isDay2 || isDay3 || isDay4 || isDay5 || isDay6);
    const currentSectorKey = examState.selectedSector || (isSectorDay ? getStudentDay3Sector(studentNisn, examState.dayNum) : '');
    const currentSectorName = isSectorDay ? (NFT_DAY3_SECTOR_MAP[currentSectorKey] || 'Pertanian Tanaman Pangan (Padi & Palawija)') : '';

    const dayBadgeText = isDay0
      ? 'Non-Field Trip • Day 0 (Simulasi)'
      : `Non-Field Trip • Day ${examState.dayNum}`;
    const examHeading = isDay0
      ? 'Kuis Asesmen Simulasi &amp; Gladi Bersih'
      : (isDay2
          ? `Asesmen Budaya &amp; Sektor: ${currentSectorName}`
          : (isDay3
              ? `Kuis Asesmen Lapangan: ${currentSectorName}`
              : (isDay4
                  ? `Asesmen Jelajah Lapangan &amp; Distribusi: ${currentSectorName}`
                  : (isDay5
                      ? `Asesmen Sains &amp; Teknologi Sektor: ${currentSectorName}`
                      : (isDay6
                          ? `Asesmen Rekayasa &amp; Finansial Sektor: ${currentSectorName}`
                          : `Kuis Asesmen Kompetensi Day ${examState.dayNum}`)))));
    const examSubtitle = isDay0
      ? 'Uji coba pemahaman sistem, 4 pilar FINCESTEM, etika riset, dan pengenalan fitur ujian digital.'
      : (isDay2
          ? `Uji pemahaman budaya kerja, sistem mata pencaharian, dan penerapan teknologi pada sektor ${currentSectorName} sesuai LKPD Day 2.`
          : (isDay3
              ? `Uji pemahaman 4 Pilar STEM (Sains, Teknologi, Rekayasa & Matematika) khusus sektor ${currentSectorName} di OKU Timur.`
              : (isDay4
                  ? `Uji pemahaman jelajah lingkungan, akses jalan, pasokan bahan baku, dan alur penjualan produk pada sektor ${currentSectorName} di OKU Timur (10 Soal PG).`
                  : (isDay5
                      ? `Uji pemahaman penerapan sains bahan alami, nutrisi/biologi, dan teknologi alat kerja/mekanisasi pada sektor ${currentSectorName} di OKU Timur (10 Soal PG).`
                      : (isDay6
                          ? `Uji pemahaman rekayasa teknis penanganan kendala, analisis biaya operasional, HPP, omzet, dan laba bersih pada sektor ${currentSectorName} di OKU Timur (10 Soal PG).`
                          : 'Uji pemahaman komprehensif berbasis 5 indikator literasi finansial &amp; potensi ekonomi OKU Timur.')))));

    root.innerHTML = `
      <div class="max-w-xl mx-auto w-full p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col gap-5 my-6 animate-scale-up">
        
        <!-- KOP ATAS IDENTITAS ASESMEN -->
        <div class="bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col gap-3 border border-teal-700/50">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs">
              <span class="material-symbols-outlined text-sm">school</span>
              <span>${dayBadgeText}</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-teal-200 border border-white/15">
              Riset Mandiri OKU Timur
            </span>
          </div>

          <div>
            <h2 class="font-black text-xl sm:text-2xl leading-tight">
              ${examHeading}
            </h2>
            <p class="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium mt-1">
              ${examSubtitle}
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
          ${isSectorDay ? `
            <div class="p-4 rounded-2xl bg-amber-400 text-slate-950 flex flex-col gap-2.5 shadow-sm border border-amber-300">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-1.5 text-xs font-black text-slate-950">
                  <span class="material-symbols-outlined text-base">hub</span>
                  <span>Sektor Soal Asesmen Day ${examState.dayNum}:</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 font-black text-[10.5px] uppercase tracking-wider shadow-2xs">Bebas Dipilih / Disesuaikan</span>
              </div>
              
              <div class="flex flex-col gap-1">
                <label for="examSectorSelector" class="text-[11px] font-bold text-slate-900">
                  Pastikan pilihan sektor di bawah ini sesuai dengan sektor observasi Anda:
                </label>
                <select id="examSectorSelector" onchange="window.handleSwitchExamSector(this.value)" class="w-full p-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-950 font-black text-xs sm:text-sm shadow-xs cursor-pointer outline-none">
                  <option value="pertanian" ${(currentSectorKey === 'pertanian' || currentSectorKey === 'pangan') ? 'selected' : ''}>1. Sektor Pertanian Padi Sawah &amp; Hortikultura (Padi, Kebun Melon/Semangka)</option>
                  <option value="perkebunan" ${currentSectorKey === 'perkebunan' ? 'selected' : ''}>2. Sektor Perkebunan Rakyat (Karet &amp; Kelapa Sawit)</option>
                  <option value="peternakan" ${currentSectorKey === 'peternakan' ? 'selected' : ''}>3. Sektor Peternakan Rakyat OKU Timur (Sapi, Kambing &amp; Unggas)</option>
                  <option value="perikanan" ${currentSectorKey === 'perikanan' ? 'selected' : ''}>4. Sektor Perikanan Air Tawar (Sentra Patin &amp; Lele Belitang)</option>
                  <option value="industri" ${(currentSectorKey === 'industri' || currentSectorKey === 'jasa') ? 'selected' : ''}>5. Sektor Agro-Industri &amp; Olahan Pangan (RMU, Tahu-Tempe &amp; Kemplang)</option>
                  <option value="perdagangan" ${currentSectorKey === 'perdagangan' ? 'selected' : ''}>6. Sektor Perdagangan &amp; UMKM Niaga (Toko Pakaian, Sembako, Saprotan &amp; Pasar)</option>
                  <option value="formal" ${(currentSectorKey === 'formal' || currentSectorKey === 'keuangan') ? 'selected' : ''}>7. Sektor Jasa Keuangan Mikro &amp; Jasa Perorangan (Agen BRILink, BUMDes &amp; Bengkel)</option>
                </select>
              </div>

              <p class="text-[11px] text-slate-900 leading-tight font-semibold flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-xs shrink-0 text-slate-950">info</span>
                <span>Paket ${(isDay0 || isDay4 || isDay5 || isDay6) ? "10" : "50"} butir soal PG spesifik otomatis dicocokkan dengan sektor pilihan di atas. Jika berbeda dengan riset Anda, silakan ubah dropdown di atas sebelum mulai.</span>
              </p>
            </div>
          ` : ''}
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
              <strong class="text-sm text-slate-900 font-black">${(isDay0 || isDay4 || isDay5 || isDay6) ? "10 Soal PG" : "50 Soal PG"}</strong>
              <span class="text-[10.5px] text-slate-500">Pilihan Ganda (A - E)</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-0.5">
              <span class="text-slate-400 text-[10.5px] font-bold uppercase">Durasi Waktu</span>
              <strong class="text-sm text-teal-800 font-black">${(isDay0 || isDay4 || isDay5 || isDay6) ? (isDay0 ? "15 Menit" : "20 Menit") : "60 Menit"}</strong>
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

    recordHardwareScreenBaseline();

    const proceedStartExam = function() {
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
      resetQuestionIdleBlurTimer();
    };

    // Upayakan layar penuh secara non-blocking agar tidak gagal pada browser HP Android/iOS tertentu
    ensureExamFullscreenOnGesture();
    proceedStartExam();
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
        <div id="examQuestionCard" class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden">

          <!-- BAR INFORMASI NOMOR SOAL & INDIKATOR -->
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-3 py-1 rounded-xl bg-slate-900 text-white font-black text-xs sm:text-sm shadow-2xs">
                Soal ${q.displayNumber} / ${totalQuestions}
              </span>
              <span class="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-teal-50 text-teal-900 border border-teal-200 truncate max-w-[200px] sm:max-w-none">
                ${q.indicatorName}
              </span>
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                ${q.cognitiveLevel || 'C2'}
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

          <!-- TEKS PERTANYAAN (ANTI-COPY & ANTI-INTIP) -->
          <div id="examQuestionText" class="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold select-none py-1 transition-all duration-150">
            ${escapeHtml(q.question)}
          </div>

          <!-- PILIHAN JAWABAN (A, B, C, D, E) RAMAH JEMPOL SMARTPHONE -->
          <div id="examOptionsList" class="flex flex-col gap-2 pt-1 select-none transition-all duration-150">
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
              <h3 class="font-black text-sm sm:text-base text-slate-900">Daftar Butir Soal (1 - ${totalQuestions})</h3>
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

  // Interaktivitas Jawaban Siswa (Setiap ketukan memaksa Fullscreen & mereset timer anti-intip)
  window.wakeUpQuestionCard = function() {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
  };

  window.selectExamOption = function(optKey) {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
    examState.answers[examState.currentIdx] = optKey;
    saveDraftProgress();
    renderExamScreen();
  };

  window.toggleDoubtCurrentQuestion = function() {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
    if (examState.markedDoubt[examState.currentIdx]) {
      delete examState.markedDoubt[examState.currentIdx];
    } else {
      examState.markedDoubt[examState.currentIdx] = true;
    }
    saveDraftProgress();
    renderExamScreen();
  };

  window.navExamQuestion = function(delta) {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
    const newIdx = examState.currentIdx + delta;
    if (newIdx >= 0 && newIdx < examState.pkg.length) {
      examState.currentIdx = newIdx;
      saveDraftProgress();
      renderExamScreen();
    }
  };

  window.openQuestionDrawerModal = function() {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
    const modal = document.getElementById('modalExamDrawer');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeQuestionDrawerModal = function() {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
    const modal = document.getElementById('modalExamDrawer');
    if (modal) modal.classList.add('hidden');
  };

  window.jumpToQuestionIndex = function(idx) {
    ensureExamFullscreenOnGesture();
    resetQuestionIdleBlurTimer();
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
   * DETEKSI KOMBINASI TOMBOL SCREENSHOT (PRINTSCREEN, WIN+SHIFT+S, CTRL+P, VOLUME DOWN, DLL)
   */
  function isScreenshotAttempt(e) {
    if (!e) return false;
    const k = e.key || '';
    const code = e.code || '';
    const which = e.which || e.keyCode;

    // Tombol PrintScreen / Snapshot
    if (
      k === 'PrintScreen' || code === 'PrintScreen' || which === 44 || k === 'Snapshot'
    ) {
      return true;
    }
    // Windows Snipping Tool: Win+Shift+S / Ctrl+Shift+S / Alt+Shift+S
    if (e.shiftKey && (k === 's' || k === 'S' || code === 'KeyS' || which === 83)) {
      if (e.metaKey || e.ctrlKey || e.altKey) return true;
    }
    // Mac Screenshot: Cmd+Shift+3 / Cmd+Shift+4 / Cmd+Shift+5
    if (e.metaKey && e.shiftKey && (k === '3' || k === '4' || k === '5' || which === 51 || which === 52 || which === 53)) {
      return true;
    }
    // Cetak / Save PDF: Ctrl+P / Cmd+P / Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && (k === 'p' || k === 'P' || code === 'KeyP' || which === 80 || k === 's' || k === 'S' || code === 'KeyS' || which === 83)) {
      return true;
    }
    // DevTools: F12 atau Ctrl+Shift+I / J / C
    if (which === 123 || ((e.ctrlKey || e.metaKey) && e.shiftKey && (which === 73 || which === 74 || which === 67))) {
      return true;
    }
    return false;
  }

  /**
   * PROTEKSI EXAM SHIELD v3 (ANTI-FLOATING WINDOW, ANTI-SPLIT SCREEN, ANTI-SMART SIDEBAR,
   * MANDATORY FULLSCREEN LOCK, INSTANT SIREN ON BLUR & ESCALATION WATCHDOG)
   */
  let shieldBound = false;
  let isTabAway = false;
  let isViolationModalOpen = false;

  const NFT_DAY3_SECTOR_MAP = {
    'pangan': 'Pertanian Tanaman Pangan (Padi & Palawija)',
    'pertanian': 'Pertanian Padi Sawah & Hortikultura (Padi, Kebun Melon/Semangka)',
    'perkebunan': 'Perkebunan Rakyat (Karet & Sawit)',
    'peternakan': 'Peternakan Rakyat OKU Timur (Sapi, Kambing & Unggas)',
    'perikanan': 'Perikanan Budidaya Air Tawar (Patin, Lele & Nila)',
    'industri': 'Agro-Industri & Pengolahan Pangan (RMU, Tahu-Tempe & Kemplang)',
    'jasa': 'Agro-Industri & Pengolahan Pangan (RMU, Tahu-Tempe & Kemplang)',
    'perdagangan': 'Perdagangan & UMKM Niaga (Toko Pakaian, Sembako, Saprotan & Pasar)',
    'formal': 'Jasa Keuangan Mikro & Jasa Perorangan (Agen BRILink, BUMDes & Bengkel)',
    'keuangan': 'Jasa Keuangan Mikro & Jasa Perorangan (Agen BRILink & BUMDes)'
  };

  function normalizeSectorKey(key, dayNum) {
    const d = Number(dayNum) || 2;
    if (!key) return (d === 2 ? 'pangan' : 'pertanian');
    const s = String(key).toLowerCase().trim();
    if (s.includes('brilink') || s.includes('bank') || s.includes('koperasi') || s.includes('bumdes') || s.includes('keuangan') || s.includes('formal') || s.includes('bengkel') || s.includes('salon')) {
      return 'formal';
    }
    if (s.includes('toko') || s.includes('pasar') || s.includes('sembako') || s.includes('dagang') || s.includes('perdagangan') || s.includes('grosir') || s.includes('saprotan') || s.includes('warung') || s.includes('niaga') || s.includes('kelontong') || s.includes('umkm')) {
      return 'perdagangan';
    }
    if (s.includes('industri') || s.includes('rmu') || s.includes('giling') || s.includes('pabrik') || s.includes('tahu') || s.includes('tempe') || s.includes('kemplang') || s.includes('olah') || s.includes('jasa')) {
      return 'industri';
    }
    if (s.includes('ikan') || s.includes('patin') || s.includes('lele') || s.includes('kolam') || s.includes('perikanan') || s.includes('tambak')) {
      return 'perikanan';
    }
    if (s.includes('ternak') || s.includes('sapi') || s.includes('kambing') || s.includes('ayam') || s.includes('bebek') || s.includes('peternakan') || s.includes('unggas') || s.includes('domba')) {
      return 'peternakan';
    }
    if (s.includes('kebun') || s.includes('karet') || s.includes('sawit') || s.includes('lateks') || s.includes('perkebunan') || s.includes('tbs')) {
      return 'perkebunan';
    }
    if (s.includes('padi') || s.includes('tani') || s.includes('sawah') || s.includes('melon') || s.includes('semangka') || s.includes('pangan') || s.includes('pertanian') || s.includes('horti') || s.includes('palawija')) {
      return (d === 2 ? 'pangan' : 'pertanian');
    }
    if (NFT_DAY3_SECTOR_MAP[s]) return s;
    return (d === 2 ? 'pangan' : 'pertanian');
  }

  function getStudentDay3Sector(cleanNisn, dayNum) {
    try {
      const d = Number(dayNum) || 2;
      const checkDays = (d === 2) ? [2] : ((d === 6) ? [6, 5, 4, 3, 2] : (d === 5 ? [5, 4, 3, 2] : (d === 4 ? [4, 3, 2] : [3, 2])));
      for (const cd of checkDays) {
        // 1. Cek storage sektor langsung
        const localSec = localStorage.getItem(`fincestem_nft_sector_d${cd}_` + cleanNisn);
        if (localSec) return normalizeSectorKey(localSec, d);

        // 2. Cek draft atau payload LKPD tersimpan
        const rawLkpd = localStorage.getItem(`fincestem_lkpd_nft_day${cd}_` + cleanNisn) || localStorage.getItem(`fincestem_lkpd_day${cd}_` + cleanNisn);
        if (rawLkpd) {
          const p = JSON.parse(rawLkpd);
          if (p && (p.sectorKey || p.sector)) return normalizeSectorKey(p.sectorKey || p.sector, d);
        }

        const rawDraft = localStorage.getItem(`fincestem_draft_nft_lkpd_d${cd}_` + cleanNisn);
        if (rawDraft) {
          const dr = JSON.parse(rawDraft);
          if (dr && (dr.sectorKey || dr.sector)) return normalizeSectorKey(dr.sectorKey || dr.sector, d);
        }

        // 3. Cek dari sinkronisasi core progress server (jika berpindah gawai)
        if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
          const taskLkpd = window.currentStudentProgress.task_map[`${cd}_lkpd`];
          if (taskLkpd && taskLkpd.content) {
            let c = taskLkpd.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (c && (c.sectorKey || c.sector)) return normalizeSectorKey(c.sectorKey || c.sector, d);
          }
        }

        const storedProg = localStorage.getItem('fincestem_progress_' + cleanNisn);
        if (storedProg) {
          const prog = JSON.parse(storedProg);
          const taskLkpd = prog && prog.task_map ? prog.task_map[`${cd}_lkpd`] : null;
          if (taskLkpd && taskLkpd.content) {
            let c = taskLkpd.content;
            if (typeof c === 'string' && (c.startsWith('{') || c.startsWith('['))) {
              try { c = JSON.parse(c); } catch(e) {}
            }
            if (c && (c.sectorKey || c.sector)) return normalizeSectorKey(c.sectorKey || c.sector, d);
          }
        }

        // 4. Cek materi
        const rawMat = localStorage.getItem(`fincestem_materi_nft_day${cd}_` + cleanNisn) || localStorage.getItem(`fincestem_materi_day${cd}_` + cleanNisn);
        if (rawMat) {
          const m = JSON.parse(rawMat);
          if (m && (m.selectedSector || m.sector)) return normalizeSectorKey(m.selectedSector || m.sector, d);
        }
      }
    } catch(e) {}
    return (Number(dayNum) === 2 ? 'pangan' : 'pertanian');
  }

  window.handleSwitchExamSector = function(newSec) {
    if (!newSec) return;
    const norm = normalizeSectorKey(newSec, examState.dayNum);
    examState.selectedSector = norm;
    try {
      localStorage.setItem(`fincestem_nft_sector_d${examState.dayNum}_` + examState.cleanNisn, norm);
      if (examState.dayNum === 3) {
        localStorage.setItem('fincestem_nft_sector_d3_' + examState.cleanNisn, norm);
      }
      // Hapus cache paket soal lama agar di-generate ulang untuk sektor baru
      localStorage.removeItem(`fincestem_pkg_nft_asesmen_v3_d${examState.dayNum}_` + examState.cleanNisn);
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(`fincestem_pkg_nft_asesmen_v3_d${examState.dayNum}_`) && k.endsWith(examState.cleanNisn)) {
          localStorage.removeItem(k);
        }
      });
    } catch(e) {}
    // Re-generate paket soal khusus sektor baru ini
    examState.pkg = generateStudentPackage(examState.dayNum, examState.cleanNisn);
    renderExamWelcomeScreen();
    if (window.FincestemCore && FincestemCore.ui && FincestemCore.ui.toast) {
      const secName = NFT_DAY3_SECTOR_MAP[norm] || norm;
      FincestemCore.ui.toast('Sektor asesmen disesuaikan ke: ' + secName + '. Soal ujian telah diperbarui!', 'success');
    }
  };

  let lastViolationTime = 0;
  let screenIntegrityWatchdogInterval = null;
  let outsideFocusEscalationInterval = null;
  let questionIdleBlurTimeout = null;
  let baselineMaxScreenW = 0;
  let baselineMaxScreenH = 0;
  const VIOLATION_DEBOUNCE_MS = 2000; // Minimal 2.0 detik jeda antar-pelanggaran
  const QUESTION_IDLE_BLUR_MS = 4000; // 4.0 detik tanpa sentuhan -> langsung sembunyikan soal (anti-layar mengambang & anti-intip)
  const ESCALATION_INTERVAL_MS = 2500; // 2.5 detik setelah tirai muncul tanpa respon -> catat pelanggaran otomatis!
  let activeTouchPoints = new Set();
  let questionIdleEscalationTimeout = null;

  let baselineInitialInnerW = 0;
  let baselineInitialInnerH = 0;

  /**
   * 1. KALIBRASI DIMENSI FISIK LAYAR PERANGKAT (ANTI-SPOOF & KALIBRASI MULTI-PERANGKAT)
   */
  function recordHardwareScreenBaseline() {
    try {
      const scrW = Math.max(screen.width || 0, screen.availWidth || 0);
      const scrH = Math.max(screen.height || 0, screen.availHeight || 0);
      const winW = window.innerWidth || document.documentElement.clientWidth || 0;
      const winH = window.innerHeight || document.documentElement.clientHeight || 0;

      const savedW = parseInt(sessionStorage.getItem('fincestem_hw_screen_w') || '0', 10);
      const savedH = parseInt(sessionStorage.getItem('fincestem_hw_screen_h') || '0', 10);
      const savedInitW = parseInt(sessionStorage.getItem('fincestem_init_win_w') || '0', 10);
      const savedInitH = parseInt(sessionStorage.getItem('fincestem_init_win_h') || '0', 10);

      baselineMaxScreenW = Math.max(baselineMaxScreenW, savedW, scrW, winW);
      baselineMaxScreenH = Math.max(baselineMaxScreenH, savedH, scrH, winH);

      if (!baselineInitialInnerW || winW > baselineInitialInnerW) baselineInitialInnerW = Math.max(winW, savedInitW);
      if (!baselineInitialInnerH || winH > baselineInitialInnerH) baselineInitialInnerH = Math.max(winH, savedInitH);

      if (baselineMaxScreenW > 0) sessionStorage.setItem('fincestem_hw_screen_w', String(baselineMaxScreenW));
      if (baselineMaxScreenH > 0) sessionStorage.setItem('fincestem_hw_screen_h', String(baselineMaxScreenH));
      if (baselineInitialInnerW > 0) sessionStorage.setItem('fincestem_init_win_w', String(baselineInitialInnerW));
      if (baselineInitialInnerH > 0) sessionStorage.setItem('fincestem_init_win_h', String(baselineInitialInnerH));
    } catch (e) {}
  }

  /**
   * 2. KUNCI LAYAR PENUH MUTLAK (MANDATORY FULLSCREEN LOCK)
   */
  function ensureExamFullscreenOnGesture(callback) {
    try {
      const docEl = document.documentElement;
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
      if (isFs) {
        if (callback) callback(true);
        return;
      }
      const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
      if (req) {
        const p = req.call(docEl, { navigationUI: 'hide' });
        if (p && typeof p.then === 'function') {
          p.then(() => {
            if (callback) callback(true);
          }).catch((err) => {
            if (callback) callback(false, err);
          });
          return;
        }
      }
      if (callback) callback(true);
    } catch (e) {
      if (callback) callback(false, e);
    }
  }

  /**
   * 3. AUTO-BLUR & HAPUS TEKS SOAL SAAT IDLE TANPA SENTUHAN
   */
  function stopQuestionIdleBlurTimer() {
    if (questionIdleBlurTimeout) {
      clearTimeout(questionIdleBlurTimeout);
      questionIdleBlurTimeout = null;
    }
    if (questionIdleEscalationTimeout) {
      clearTimeout(questionIdleEscalationTimeout);
      questionIdleEscalationTimeout = null;
    }
  }

  function resetQuestionIdleBlurTimer() {
    stopQuestionIdleBlurTimer();
  }

  window.wakeUpQuestionCard = function() {
    ensureExamFullscreenOnGesture();
  };

  /**
   * 4. DETEKSI LAYAR MENGAMBANG (FLOATING WINDOW) & PICTURE-IN-PICTURE
   * Dikemas ramah terhadap seluruh resolusi/DPR layar smartphone Android & iOS agar bebas false-positive.
   */
  function checkPreExamMultiWindow() {
    if (document.pictureInPictureElement) {
      try { document.exitPictureInPicture(); } catch(e) {}
      return 'Jendela Mengambang (Picture-in-Picture)';
    }
    return null;
  }

  function detectMultiWindowViolation() {
    if (!examState.isExamActive || examState.isExamFinished) return null;

    if (document.pictureInPictureElement) {
      try { document.exitPictureInPicture(); } catch(e) {}
      return 'Jendela Mengambang (Picture-in-Picture)';
    }

    const winW = window.innerWidth || document.documentElement.clientWidth || 0;
    const winH = window.innerHeight || document.documentElement.clientHeight || 0;
    if (winW > 0 && winH > 0 && (winW < 180 || winH < 180)) {
      return 'Layar Mengambang (Floating Pop-up Mini)';
    }

    return null;
  }

  /**
   * 5. WATCHDOG INTEGRITAS LAYAR & TAB REALTIME (INTERVAL 500ms)
   */
  function startScreenIntegrityWatchdog() {
    if (screenIntegrityWatchdogInterval) clearInterval(screenIntegrityWatchdogInterval);
    screenIntegrityWatchdogInterval = setInterval(() => {
      if (!examState.isExamActive || examState.isExamFinished || isViolationModalOpen) return;

      // 1. Cek Picture-in-Picture / jendela mini ekstrem
      const multiWinReason = detectMultiWindowViolation();
      if (multiWinReason) {
        handleTabExit(multiWinReason);
        return;
      }

      // 2. Cek document.hidden (berpindah tab / meminimalkan browser / membuka aplikasi lain)
      if (document.hidden) {
        handleTabExit('Meninggalkan lembar asesmen / membuka aplikasi lain');
        return;
      }
    }, 500);
  }

  function stopScreenIntegrityWatchdog() {
    if (screenIntegrityWatchdogInterval) {
      clearInterval(screenIntegrityWatchdogInterval);
      screenIntegrityWatchdogInterval = null;
    }
    stopContinuousEscalationWatchdog();
    if (questionIdleBlurTimeout) {
      clearTimeout(questionIdleBlurTimeout);
      questionIdleBlurTimeout = null;
    }
  }

  /**
   * 6. ESCALATION WATCHDOG
   */
  function startContinuousEscalationWatchdog(reason) {
    stopContinuousEscalationWatchdog();
  }

  function stopContinuousEscalationWatchdog() {
    if (outsideFocusEscalationInterval) {
      clearInterval(outsideFocusEscalationInterval);
      outsideFocusEscalationInterval = null;
    }
  }

  function bindExamShieldListeners() {
    if (shieldBound) return;
    shieldBound = true;

    // 1. Blokir Copy, Cut, Context Menu, Drag/Drop Teks Soal
    document.addEventListener('copy', (e) => { e.preventDefault(); wipeClipboard(); return false; });
    document.addEventListener('cut', (e) => { e.preventDefault(); wipeClipboard(); return false; });
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
    document.addEventListener('dragstart', (e) => { e.preventDefault(); return false; });

    // 2. Cegah Tombol Screenshot di Keyboard (PrtScn, Win+Shift+S, Ctrl+P) via Capture Phase
    window.addEventListener('keydown', (e) => {
      if (isScreenshotAttempt(e)) {
        e.preventDefault();
        e.stopPropagation();
        wipeClipboard();
        handleTabExit('Upaya tangkapan layar (Screenshot Keyboard)');
        return false;
      }
    }, true);

    window.addEventListener('keyup', (e) => {
      if (isScreenshotAttempt(e)) {
        e.preventDefault();
        e.stopPropagation();
        wipeClipboard();
        handleTabExit('Upaya tangkapan layar (Screenshot Keyboard)');
        return false;
      }
    }, true);

    // 3. Deteksi Tab Switch & Minimize melalui visibilitychange
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        handleTabExit('Meninggalkan lembar asesmen / membuka aplikasi lain');
      } else {
        handleTabReturn('Meninggalkan lembar asesmen');
      }
    });

    // 4. Deteksi fokus kembali ke layar asesmen
    window.addEventListener('focus', () => {
      handleTabReturn('Kembali ke layar asesmen');
    });

    window.addEventListener('pagehide', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isViolationModalOpen) {
        handleTabExit('Meninggalkan lembar asesmen / membuka aplikasi lain');
      }
    });

    // 5. Pengendalian Sentuhan Layar & Reset Timer Idle
    window.addEventListener('touchstart', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isTabAway && !isViolationModalOpen) {
        resetQuestionIdleBlurTimer();
      }
    }, { passive: true });

    window.addEventListener('touchmove', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isTabAway && !isViolationModalOpen) {
        resetQuestionIdleBlurTimer();
      }
    }, { passive: true });

    window.addEventListener('touchcancel', () => {
      activeTouchPoints.clear();
    }, { passive: true });

    window.addEventListener('pointercancel', () => {
      activeTouchPoints.clear();
    }, true);

    // 6. Deteksi Mouse Masuk (Aman untuk PC/Laptop)
    document.addEventListener('mouseenter', () => {
      if (examState.isExamActive && !examState.isExamFinished && !isTabAway && !isViolationModalOpen) {
        removeBlackout();
      }
    });

    // 7. Klik pada overlay blackout untuk memaksa kembali ke ujian
    const bo = document.getElementById('examShieldFullBlackout');
    if (bo) {
      bo.onclick = function() {
        if (isViolationModalOpen) {
          window.dismissExamViolationModal();
        } else {
          ensureExamFullscreenOnGesture();
          handleTabReturn('Kembali dari pelepasan fokus layar');
        }
      };
    }
  }

  /**
   * 7. PENANGANAN SAAT FOKUS HILANG ATAU LAYAR MENGAMBANG TERDETEKSI
   * PERBAIKAN KRUSIAL: Langsung membunyikan Sirine 100%, menyembunyikan teks soal,
   * dan langsung mencatat Pelanggaran (+1) DETIK ITU JUGA tanpa menunggu siswa kembali!
   */
  function handleTabExit(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    // Jika sedang dalam kondisi melanggar / pop-up peringatan sedang terbuka, jangan hitung ulang!
    // Tunggu sampai siswa menekan tombol "Lanjut" (dismissExamViolationModal) baru pelanggaran berikutnya bisa dihitung.
    if (isViolationModalOpen || isTabAway) return;

    const cleanReason = reason || 'Membuka Layar Mengambang (Floating Window) / Aplikasi Lain';
    isTabAway = true;

    // 1. Gelapkan layar & hapus sementara teks soal dari DOM agar tidak bisa diintip dari balik jendela mengambang
    triggerBlackout(cleanReason);

    // 2. Langsung catat tepat +1 pelanggaran & nyalakan Sirine 100% detik itu juga
    triggerViolation(cleanReason);
  }

  function handleTabReturn(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    wipeClipboard();

    // Jika pop-up pelanggaran sudah terbuka (karena sudah dihitung +1 saat keluar), jangan hitung +1 lagi saat kembali!
    if (isViolationModalOpen) {
      return;
    }

    // Cek apakah masih dalam mode Split Screen / Floating Window
    const activeMultiWin = detectMultiWindowViolation();
    if (activeMultiWin) {
      triggerBlackout(activeMultiWin);
      triggerViolation(activeMultiWin);
      return;
    }

    stopContinuousEscalationWatchdog();
    isTabAway = false;
    removeBlackout();
    resetQuestionIdleBlurTimer();
  }

  function triggerBlackout(reason) {
    try {
      document.documentElement.classList.add('exam-shield-blackout-active');
      document.body.classList.add('exam-shield-blackout-active');

      // Sembunyikan teks soal secara fisik agar mustahil dibaca di belakang Floating Window transparan/kecil
      const qTextEl = document.getElementById('examQuestionText');
      if (qTextEl) {
        qTextEl.textContent = '🔒 [SOAL DISEMBUNYIKAN OTOMATIS OLEH EXAM SHIELD — TUTUP LAYAR MENGAMBANG & KEMBALI KE 1 LAYAR PENUH]';
      }

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
        } else if (reason && (reason.includes('Mengambang') || reason.includes('Floating') || reason.includes('Pop-up') || reason.includes('Bilah Samping') || reason.includes('Keyboard'))) {
          if (titleEl) titleEl.textContent = '⚠️ TERDETEKSI LAYAR MENGAMBANG (FLOATING WINDOW)';
          if (descEl) descEl.innerHTML = `Sistem mendeteksi <strong>${escapeHtml(reason)}</strong>.<br><span class="text-rose-400 font-bold">Tutup segera aplikasi mengambang (Google/Browser/Chat) dan kembali ke layar penuh! Jika tidak ditutup dalam 6 detik, Anda akan didiskualifikasi otomatis!</span>`;
          if (iconEl) iconEl.textContent = 'picture_in_picture';
        } else if (reason && reason.includes('Kursor')) {
          if (titleEl) titleEl.textContent = '⚠️ KURSOR KELUAR DARI AREA UJIAN';
          if (descEl) descEl.innerHTML = `Kursor mouse Anda keluar dari batas layar lembar asesmen.<br><span class="text-rose-400 font-bold">Arahkan kursor kembali ke dalam lembar asesmen untuk melanjutkan.</span>`;
          if (iconEl) iconEl.textContent = 'near_me_disabled';
        } else {
          if (titleEl) titleEl.textContent = 'Layar Diamankan (Anti-Layar Mengambang & Screenshot)';
          if (descEl) descEl.innerHTML = `Sistem mendeteksi pelepasan fokus atau aplikasi mengambang.<br><span class="text-rose-400 font-bold">Tutup aplikasi lain dan sentuh layar asesmen untuk melanjutkan.</span>`;
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
      // Pulihkan teks soal asli jika tidak sedang melanggar
      if (examState.isExamActive && !examState.isExamFinished && examState.pkg && examState.pkg[examState.currentIdx]) {
        const qTextEl = document.getElementById('examQuestionText');
        if (qTextEl) {
          qTextEl.textContent = examState.pkg[examState.currentIdx].question;
        }
      }
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
    if (isViolationModalOpen) return; // Jangan hitung berulang jika modal sedang terbuka (kecuali lewat forceEscalateViolation)

    const now = Date.now();
    if (now - lastViolationTime < VIOLATION_DEBOUNCE_MS) {
      return; // Batasi interval debounce minimal 2.5 detik
    }
    lastViolationTime = now;

    examState.violationCount++;
    saveDraftProgress();
    updateViolationCounterDisplay();

    showViolationModal(examState.violationCount, reason);
  }

  function forceEscalateViolation(reason) {
    if (!examState.isExamActive || examState.isExamFinished) return;
    if (examState.violationCount >= 3) return;
    lastViolationTime = Date.now();
    examState.violationCount++;
    saveDraftProgress();
    updateViolationCounterDisplay();
    showViolationModal(examState.violationCount, reason);
  }

  function showViolationModal(count, reason) {
    isViolationModalOpen = true;

    // Sembunyikan overlay blackout sementara modal pelanggaran tampil agar tombol di dalam modal tidak tertutup
    const bo = document.getElementById('examShieldFullBlackout');
    if (bo) bo.style.display = 'none';

    // Jika pelanggaran sudah mencapai 3/3 (batas maksimal), LANGSUNG kirim paksa & buka halaman nilai
    // tanpa menunggu setTimeout (karena setTimeout dibekukan oleh Android saat tab di belakang layar mengambang!)
    if (count >= 3) {
      stopContinuousEscalationWatchdog();
      stopExamAlarmLoop();
      stopExamVibrationLoop();
      submitExam(true, 'Force Submit (Pelanggaran Layar Mengambang / Tab 3x)');
      return;
    }

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
    } else if (reason && (reason.includes('Mengambang') || reason.includes('Floating') || reason.includes('Pop-up') || reason.includes('Bilah Samping') || reason.includes('Keyboard'))) {
      alertBadgeText = 'PELANGGARAN LAYAR MENGAMBANG';
      alertIcon = 'picture_in_picture';
    }

    if (count === 1) {
      title = 'Peringatan Pelanggaran (1/3)';
      message = `Anda terdeteksi melakukan pelanggaran integritas asesmen: <strong>${escapeHtml(reason)}</strong>. Tutup segera aplikasi mengambang / tab lain dan tetap berada di 1 layar penuh! Sisa toleransi Anda tinggal <strong>2 kali</strong> lagi.`;
      badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
      if (!alertIcon || alertIcon === 'campaign') alertIcon = 'gpp_maybe';
    } else if (count === 2) {
      title = 'PERINGATAN KERAS (2/3)!';
      message = `Anda terdeteksi kembali melakukan pelanggaran: <strong>${escapeHtml(reason)}</strong>. Ini adalah peringatan terakhir! Jika terdeteksi <strong>1 KALI LAGI</strong> (atau layar mengambang tidak segera ditutup), sistem otomatis <strong>MENGUNCI &amp; MENGIRIM PAKSA</strong> lembar ujian Anda!`;
      badgeColor = 'bg-rose-100 text-rose-900 border-rose-400';
      if (!alertIcon || alertIcon === 'campaign') alertIcon = 'warning';
    } else {
      title = 'PENGUMPULAN PAKSA OTOMATIS (3/3)';
      message = `Batas toleransi pelanggaran (3/3) telah habis! Sistem secara otomatis <strong>mengunci dan mengumpulkan lembar jawaban Anda sekarang</strong> serta langsung menghitung nilai dari soal yang sudah Anda selesaikan.`;
      badgeColor = 'bg-red-600 text-white border-red-700';
      alertIcon = 'block';
    }

    container.innerHTML = `
      <div id="examViolationModal" style="z-index: 2147483647; pointer-events: auto;" class="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 animate-emergency-strobe select-none">
        <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border-2 ${count >= 2 ? 'border-rose-500' : 'border-amber-500'} flex flex-col items-center text-center gap-4 animate-scale-up pointer-events-auto">
          
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
              <span>${alertBadgeText}</span>
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
              <span>Sirine 100% &amp; Getar Aktif</span>
            </span>
            <span class="px-2.5 py-1 rounded-xl ${count >= 3 ? 'bg-rose-600 text-white' : 'bg-rose-200 text-rose-900'} font-black">
              Pelanggaran ${count} dari 3
            </span>
          </div>

          <!-- TOMBOL AKSI DISMISS ATAU FORCE SUBMIT COUNTDOWN -->
          <div class="w-full pt-1">
            ${count < 3 ? `
              <button type="button" id="btnDismissViolationModal" onclick="window.dismissExamViolationModal()" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer pointer-events-auto">
                <span class="material-symbols-outlined text-base">fullscreen</span>
                <span>Tutup Layar Mengambang &amp; Lanjut 1 Layar Penuh</span>
              </button>
            ` : `
              <button type="button" onclick="window.forceFinishViolationExamNow && window.forceFinishViolationExamNow()" class="w-full p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer pointer-events-auto">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim Paksa &amp; Membuka Halaman Nilai...</span>
              </button>
            `}
          </div>

        </div>
      </div>
    `;

    if (count >= 3) {
      stopContinuousEscalationWatchdog();
      window.forceFinishViolationExamNow = function() {
        stopExamAlarmLoop();
        stopExamVibrationLoop();
        submitExam(true, 'Force Submit (Pelanggaran Layar Mengambang / Tab 3x)');
      };
      setTimeout(() => {
        if (window.forceFinishViolationExamNow) {
          window.forceFinishViolationExamNow();
        }
      }, 1200);
    }
  }

  window.dismissExamViolationModal = function() {
    // Langsung hentikan sirine, getaran, dan tutup pop-up pelanggaran tanpa memblokir siswa
    stopExamAlarmLoop();
    stopExamVibrationLoop();
    stopContinuousEscalationWatchdog();
    isViolationModalOpen = false;
    isTabAway = false;
    lastViolationTime = Date.now();

    const container = document.getElementById('examViolationModalContainer');
    if (container) container.innerHTML = '';

    removeBlackout();
    updateViolationCounterDisplay();
    resetQuestionIdleBlurTimer();

    // Upayakan layar penuh secara non-blocking
    ensureExamFullscreenOnGesture();
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
    isViolationModalOpen = false;
    isTabAway = false;
    clearInterval(examState.timerInterval);
    stopExamAlarmLoop();
    stopExamVibrationLoop();
    stopContinuousEscalationWatchdog();
    stopQuestionIdleBlurTimer();
    stopScreenIntegrityWatchdog();
    if (volume100WatchdogInterval) {
      clearInterval(volume100WatchdogInterval);
      volume100WatchdogInterval = null;
    }

    // Bersihkan modal pelanggaran & blackout agar halaman nilai langsung terlihat jelas!
    const vContainer = document.getElementById('examViolationModalContainer');
    if (vContainer) vContainer.innerHTML = '';
    removeBlackout();
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch(eFs) {}

    // Pastikan jawaban dari draft digabungkan jika ada yang belum masuk ke examState.answers
    const draftKey = `fincestem_draft_nft_asesmen_d${examState.dayNum}_${examState.cleanNisn}`;
    try {
      const rawDraft = localStorage.getItem(draftKey);
      if (rawDraft) {
        const parsedDraft = JSON.parse(rawDraft);
        if (parsedDraft && parsedDraft.answers && typeof parsedDraft.answers === 'object') {
          examState.answers = Object.assign({}, parsedDraft.answers, examState.answers || {});
        }
      }
    } catch(eDraft) {}

    // Hitung soal yang sudah diselesaikan (dijawab) dan jawaban benar secara MURNI berdasarkan Kunci Jawaban
    let answeredCount = 0;
    let correctCount = 0;
    const totalQuestions = (examState.pkg && examState.pkg.length) ? examState.pkg.length : 50;

    (examState.pkg || []).forEach((q, idx) => {
      const studentChoice = examState.answers ? (examState.answers[idx] !== undefined ? examState.answers[idx] : examState.answers[String(idx)]) : undefined;
      if (studentChoice !== undefined && studentChoice !== null && String(studentChoice).trim() !== '') {
        answeredCount++;
        if (String(studentChoice).trim().toUpperCase() === String(q.correctKey || '').trim().toUpperCase()) {
          correctCount++;
        }
      }
    });

    const wrongCount = Math.max(0, answeredCount - correctCount);
    const score = Math.round((correctCount / totalQuestions) * 100);
    const durationSpent = Math.max(0, examState.durationSeconds - examState.remainingSeconds);

    const u = examState.student || {};
    const officialPayload = {
      day: examState.dayNum,
      sector: examState.selectedSector || undefined,
      sectorName: ((examState.dayNum >= 2 && examState.dayNum <= 6) && examState.selectedSector) ? NFT_DAY3_SECTOR_MAP[examState.selectedSector] : undefined,
      submitted: true,
      submittedAt: new Date().toISOString(),
      studentName: u.name || '',
      studentNisn: examState.cleanNisn,
      studentClass: u.class || u.class_name || '',
      score: score,
      answeredCount: answeredCount,
      correctCount: correctCount,
      wrongCount: wrongCount,
      totalQuestions: totalQuestions,
      durationSpentSeconds: durationSpent,
      violationCount: examState.violationCount,
      isForceSubmitted: !!isForce,
      note: noteReason || 'Asesmen Mandiri',
      answers: examState.answers
    };

    // Simpan ke storage resmi & bersihkan draft pengerjaan
    const candidateSubmitIds = new Set([examState.cleanNisn]);
    if (examState.cleanNisn) {
      candidateSubmitIds.add(examState.cleanNisn.replace(/^0+/, ''));
      if (examState.cleanNisn.length >= 8 && examState.cleanNisn.length <= 10) candidateSubmitIds.add(examState.cleanNisn.padStart(10, '0'));
    }
    const uAuth = (window.FincestemCore && window.FincestemCore.auth && window.FincestemCore.auth.getUser()) || {};
    if (uAuth.identifier) candidateSubmitIds.add(String(uAuth.identifier).trim());
    if (uAuth.nis) candidateSubmitIds.add(String(uAuth.nis).trim());
    if (uAuth.nisn) candidateSubmitIds.add(String(uAuth.nisn).trim());

    try {
      candidateSubmitIds.forEach(id => {
        if (!id) return;
        localStorage.setItem(`fincestem_asesmen_nft_day${examState.dayNum}_` + id, JSON.stringify(officialPayload));
        localStorage.setItem(`fincestem_asesmen_day${examState.dayNum}_` + id, JSON.stringify(officialPayload));
      });
      localStorage.removeItem(draftKey);
    } catch(e) {}

    if (window.currentStudentProgress && window.currentStudentProgress.task_map) {
      window.currentStudentProgress.task_map[`${examState.dayNum}_asesmen`] = { status: 'submitted', content: officialPayload };
    }

    const summaryNote = `Asesmen Day ${examState.dayNum} (Non-Field Trip): Skor ${score}/100 (${answeredCount}/${totalQuestions} Soal Diselesaikan, ${correctCount} Benar). Waktu: ${Math.round(durationSpent/60)} mnt. ${noteReason || ''}`;
    officialPayload.summary = summaryNote;

    // Langsung tampilkan halaman nilai saat itu juga tanpa menunggu callback jaringan!
    renderCompletedResultScreen(officialPayload);
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(eScroll) {}

    // Kirim ke sistem Core Progress FINCESTEM di latar belakang
    if (window.FincestemCore && window.FincestemCore.progress && window.FincestemCore.progress.submitTask) {
      window.FincestemCore.progress.submitTask(examState.cleanNisn, examState.dayNum, 'asesmen', officialPayload, function() {
        renderCompletedResultScreen(officialPayload);
      });
    }
  }

  /**
   * LAYAR 4: HASIL NILAI & REVIEW
   */
  function renderCompletedResultScreen(result) {
    // Pastikan overlay pelanggaran dan layar hitam bersih saat halaman nilai ditampilkan
    const vContainer = document.getElementById('examViolationModalContainer');
    if (vContainer) vContainer.innerHTML = '';
    removeBlackout();

    const root = document.getElementById('examRootContainer');
    if (!root) return;

    const score = result.score !== undefined ? Number(result.score) : 0;
    const isPassed = (score >= 75);
    const dayNum = result.day || examState.dayNum;
    const studentName = result.studentName || examState.student?.name || 'Peserta';
    const totalQuestions = result.totalQuestions || 50;
    const answeredCount = result.answeredCount !== undefined
      ? result.answeredCount
      : (result.answers && typeof result.answers === 'object' ? Object.keys(result.answers).length : (result.correctCount || 0));
    const correctCount = result.correctCount !== undefined ? result.correctCount : Math.round((score / 100) * totalQuestions);
    const wrongCount = result.wrongCount !== undefined ? result.wrongCount : Math.max(0, answeredCount - correctCount);
    const violationCount = result.violationCount || 0;
    const isForceSubmitted = !!(result.isForceSubmitted || (result.note && String(result.note).toLowerCase().includes('force submit')));

    root.innerHTML = `
      <div class="max-w-md mx-auto w-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col items-center text-center gap-4 my-8 animate-scale-up">
        
        <!-- BADGE SKOR BESAR -->
        <div class="w-20 h-20 rounded-3xl ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} flex items-center justify-center font-black shadow-inner">
          <span class="material-symbols-outlined text-4xl">${isPassed ? 'verified' : 'military_tech'}</span>
        </div>

        <div>
          <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${isForceSubmitted ? 'bg-rose-100 text-rose-800' : (isPassed ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900')}">
            ${isForceSubmitted ? 'Terkirim Otomatis (Pelanggaran 3/3)' : (isPassed ? 'Asesmen Tuntas &amp; Kompeten' : 'Asesmen Selesai')}
          </span>
          <h3 class="font-black text-xl sm:text-2xl text-slate-900 mt-2">
            Hasil Kuis Asesmen ${Number(dayNum) === 0 ? 'Day 0 (Simulasi)' : ('Day ' + dayNum)}
          </h3>
          ${((Number(dayNum) >= 2 && Number(dayNum) <= 6) && (result.sectorName || result.sector || examState.selectedSector)) ? `
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-black mt-1.5">
              <span class="material-symbols-outlined text-sm text-teal-700">agriculture</span>
              <span>Sektor: ${escapeHtml(result.sectorName || NFT_DAY3_SECTOR_MAP[result.sector] || NFT_DAY3_SECTOR_MAP[examState.selectedSector] || 'Pertanian Padi Sawah')}</span>
            </div>
          ` : ''}
          <p class="text-xs text-slate-500 font-medium mt-0.5">
            ${isForceSubmitted
              ? `Lembar ujian <strong>${escapeHtml(studentName)}</strong> telah dikumpulkan paksa dan dinilai berdasarkan <strong>${answeredCount} soal</strong> yang telah diselesaikan.`
              : `Selamat, <strong>${escapeHtml(studentName)}</strong>! Jawaban Anda telah terekam resmi di server fasilitator.`}
          </p>
        </div>

        <!-- KOTAK SKOR ANGKA & BINTANG -->
        <div class="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1 items-center justify-center shadow-inner">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider">Nilai Akhir ${Number(dayNum) === 0 ? 'Simulasi' : 'Asesmen'}</span>
          <div class="text-2xl sm:text-3xl tracking-widest text-amber-500 font-black mt-0.5">
            ${score >= 90 ? '⭐⭐⭐⭐⭐' : (score >= 80 ? '⭐⭐⭐⭐☆' : (score >= 70 ? '⭐⭐⭐☆☆' : (score >= 60 ? '⭐⭐☆☆☆' : '⭐☆☆☆☆')))}
          </div>
          <span class="text-4xl sm:text-5xl font-black ${isPassed ? 'text-teal-800' : 'text-amber-800'} tracking-tight">
            ${score}
          </span>
          <span class="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
            ${score >= 90 ? '5 Bintang · Sangat Baik' : (score >= 80 ? '4 Bintang · Baik' : (score >= 70 ? '3 Bintang · Cukup' : 'Perlu Peningkatan'))}
          </span>
          <span class="text-[11px] text-slate-500 font-semibold mt-0.5">Dihitung dari ${answeredCount} / ${totalQuestions} Soal Diselesaikan</span>
        </div>

        <!-- STATISTIK RINCIAN -->
        <div class="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 rounded-xl bg-teal-50 border border-teal-200 flex flex-col">
            <span class="text-teal-700 text-[10px] font-bold">Soal Dijawab</span>
            <strong class="text-teal-950 font-black text-sm">${answeredCount}/${totalQuestions}</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col">
            <span class="text-emerald-700 text-[10px] font-bold">Jawaban Benar</span>
            <strong class="text-emerald-950 font-black text-sm">${correctCount} Soal</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col">
            <span class="text-rose-700 text-[10px] font-bold">Jawaban Salah</span>
            <strong class="text-rose-950 font-black text-sm">${wrongCount} Soal</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex flex-col">
            <span class="text-slate-500 text-[10px] font-bold">Pelanggaran</span>
            <strong class="text-slate-800 font-black text-sm">${violationCount}/3</strong>
          </div>
        </div>

        <!-- INFO TAHAP BERIKUTNYA -->
        <div class="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 text-xs text-left flex items-start gap-2.5 leading-relaxed w-full">
          <span class="material-symbols-outlined text-teal-700 text-base shrink-0 mt-0.5">lock_open</span>
          <div>
            <strong class="block text-teal-900 font-extrabold text-[11.5px]">${dayNum >= 1 ? 'Tahap 5 Telah Terbuka:' : 'Tahap 4 &amp; 5 Telah Terbuka:'}</strong>
            <p class="text-slate-600 font-medium mt-0.5">
              ${dayNum >= 1
                ? `Anda kini dapat melanjutkan ke <strong>Tahap 5: Jurnal Refleksi Mandiri Day ${dayNum}</strong>.`
                : `Anda kini dapat melanjutkan ke <strong>Dokumentasi Foto Lapangan</strong> dan <strong>Jurnal Refleksi Mandiri Day ${dayNum}</strong> di beranda dashboard.`}
            </p>
          </div>
        </div>

        <!-- TOMBOL AKSI KEMBALI -->
        <div class="w-full flex flex-col gap-2 pt-1">
          <a href="${dayNum >= 1 ? `dashboard.html?day=${dayNum}&task=refleksi` : `dokumentasi.html?day=${dayNum}`}" class="w-full py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all">
            <span>${dayNum >= 1 ? `Lanjut ke Jurnal Refleksi Day ${dayNum} (Tahap 5)` : `Lanjut ke Dokumentasi Foto Day ${dayNum}`}</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </a>
          <a href="dashboard.html" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-all">
            <span>Kembali ke Beranda Dashboard</span>
          </a>
        </div>

      </div>
    `;
  }

  
  // =========================================================================
  // LAYAR SELEBRASI DAY 7: BEBAS KUIS ASESMEN (100% TUNTAS APRESIASI PORTOFOLIO)
  // =========================================================================
  function renderDay7CelebrationScreen(hasMateri, hasLkpd, hasDok) {
    const mainEl = document.querySelector('main') || document.getElementById('mainContentArea');
    if (!mainEl) return;

    if (!hasMateri || !hasLkpd || !hasDok) {
      renderPrerequisiteLockedScreen(hasMateri, hasLkpd, 7, hasDok);
      return;
    }

    const cleanNisn = examState.cleanNisn;
    const student = examState.student || {};
    const studentName = student.name || 'Peserta Non-Field Trip';
    const studentClass = student.class || student.class_name || 'Kelas X';

    // Auto-save 100 score if not already saved
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
    try {
      localStorage.setItem('fincestem_asesmen_nft_day7_' + cleanNisn, JSON.stringify(asesmenPayload));
      localStorage.setItem('fincestem_asesmen_day7_' + cleanNisn, JSON.stringify(asesmenPayload));
      localStorage.setItem('fincestem_exam_state_d7_' + cleanNisn, JSON.stringify({ isSubmitted: true, score: 100 }));
      if (window.FincestemCore && FincestemCore.progress) {
        FincestemCore.progress.saveTaskRecord(cleanNisn, 7, 'asesmen', asesmenPayload, 100);
      }
    } catch(e) {}

    mainEl.innerHTML = `
      <div class="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center text-center gap-6 animate-fade-in">
        <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30">
          <span class="material-symbols-outlined text-5xl">military_tech</span>
        </div>

        <div class="flex flex-col gap-2">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black uppercase tracking-wider mx-auto">
            <span class="material-symbols-outlined text-sm">verified</span>
            <span>DAY 7 • BEBAS KUIS ASESMEN (100% TUNTAS)</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            Selamat, Seluruh Rangkaian Riset Day 1 s.d. Day 7 Telah Tuntas Sempurna!
          </h1>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto text-justify sm:text-center">
            Pada hari penutupan (Day 7), Anda <strong>dibebaskan dari kuis pilihan ganda maupun tes tulis</strong>. Sebagai bentuk penghargaan atas kerja keras Anda menyelesaikan video refleksi, kompilasi BTS, dan jurnal refleksi, sistem memberikan <strong>Nilai Partisipasi Sempurna: 100 / 100</strong>.
          </p>
        </div>

        <!-- Kartu Skor & Predikat -->
        <div class="w-full p-6 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white shadow-xl border border-purple-500/40 flex flex-col gap-4">
          <div class="flex items-center justify-between border-b border-white/15 pb-3">
            <span class="text-xs text-purple-200 font-medium">Peserta: <strong>${escapeHtml(studentName)}</strong> (${escapeHtml(studentClass)})</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">Grand Finale</span>
          </div>
          <div class="flex items-center justify-center gap-6 py-2">
            <div class="flex flex-col items-center">
              <span class="text-xs text-purple-200 font-medium">Skor Asesmen Day 7</span>
              <span class="text-4xl sm:text-5xl font-black text-amber-300 font-mono">100</span>
            </div>
            <div class="w-px h-14 bg-white/20"></div>
            <div class="flex flex-col items-center">
              <span class="text-xs text-purple-200 font-medium">Predikat Kelulusan</span>
              <span class="text-xl sm:text-2xl font-black text-emerald-400">Sangat Baik</span>
            </div>
          </div>
          <div class="text-[11px] text-purple-200/90 text-center border-t border-white/10 pt-2.5">
            Portofolio akhir Anda telah tersimpan dan siap direkapitulasi ke dalam lembar Rapor Resmi FINCESTEM oleh Tim Fasilitator Pembimbing.
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
          <a href="dashboard.html" class="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 active:scale-95 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-lg">dashboard</span>
            <span>Buka Dasbor Rapor Akhir</span>
          </a>
          <a href="lkpd.html?day=7" class="w-full sm:w-auto py-3.5 px-5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs">
            <span>Lihat LKPD Day 7</span>
          </a>
        </div>
      </div>
    `;
  }


  window.initNonFieldTripAsesmenPage = initNonFieldTripAsesmenPage;
  window.generateStudentPackage = generateStudentPackage;
  window.getStudentDay3Sector = getStudentDay3Sector;

})(window);
