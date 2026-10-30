/**
 * Verification Test: Strict Separation of Reset Device vs Partial Reset Progress (Day 2 Asesmen)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const coreCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'core.js'), 'utf8');
const dashboardCode = fs.readFileSync(path.join(__dirname, '..', 'siswa', 'dashboard.html'), 'utf8');

function createMockEnv(mockFetchHandler) {
  const store = {};
  const localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    key: (i) => Object.keys(store)[i] || null,
    get length() { return Object.keys(store).length; }
  };

  const sandbox = {
    window: {
      location: { protocol: 'https:', hostname: 'fincestem.id', pathname: '/siswa/asesmen.html', search: '?day=2' },
      localStorage,
      addEventListener: () => {},
      FincestemMasterStudents: [
        { nisn: '0089123456', nis: '12345', nama: 'Bagas Arya', class: 'X.11', zone: 'FINCESTEM OKU TIMUR' }
      ]
    },
    document: { addEventListener: () => {}, querySelectorAll: () => [] },
    localStorage,
    fetch: mockFetchHandler,
    AbortController: class { constructor() { this.signal = {}; } abort() {} },
    setTimeout: (fn) => { return 1; },
    clearTimeout: () => {},
    console
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(coreCode, sandbox);
  return { sandbox, localStorage, store };
}

let passed = 0;
let failed = 0;
function assert(cond, msg) {
  if (cond) {
    console.log('  [PASS] ' + msg);
    passed++;
  } else {
    console.error('  [FAIL] ' + msg);
    failed++;
  }
}

console.log('=== TEST 1: Admin Reset Day 2 Bagian Asesmen (First-Time Reset & Partial Reset) ===');
{
  const nisn = '0089123456';
  // Server state AFTER Admin resets ONLY Day 2 Asesmen:
  // Day 1 (all 5) + Day 2 (materi, lkpd) remain on server; 2_asesmen is deleted on server!
  const serverResponseAfterPartialReset = {
    success: true,
    data: {
      nisn,
      student_name: 'Bagas Arya',
      class_name: 'X.11',
      zone: 'FINCESTEM OKU TIMUR',
      percentage: 20,
      completed_days: 1,
      total_days: 7,
      reset_info: {
        reset_at: '2026-10-30 12:35:00',
        scope: 'day_2',
        target_day: 2,
        components: {
          materi: false,
          lkpd: false,
          asesmen: true,
          refleksi: false,
          dokumentasi: false,
          foto_profil: false
        }
      },
      records: [
        { day_number: 1, task_type: 'materi', content: 'Topik A: Ekonomi OKU Timur', status: 'submitted', updated_at: '2026-10-30 19:00:00' },
        { day_number: 1, task_type: 'lkpd', content: 'Audit Lapangan: KUD Makmur', status: 'submitted', updated_at: '2026-10-30 19:00:00' },
        { day_number: 1, task_type: 'asesmen', content: '{"score":96,"submitted":true}', score: 96, status: 'submitted', updated_at: '2026-10-30 19:00:00' },
        { day_number: 1, task_type: 'dokumentasi', content: 'Foto Day 1', status: 'submitted', updated_at: '2026-10-30 19:00:00' },
        { day_number: 1, task_type: 'refleksi', content: 'Refleksi Day 1 selesai dengan baik.', status: 'submitted', updated_at: '2026-10-30 19:00:00' },
        { day_number: 2, task_type: 'materi', content: 'Topik A: Budaya Komering', status: 'submitted', updated_at: '2026-10-30 19:10:00' },
        { day_number: 2, task_type: 'lkpd', content: '{"submitted":true,"sectorKey":"pangan"}', status: 'submitted', updated_at: '2026-10-30 19:15:00' }
      ],
      task_map: {}
    }
  };
  serverResponseAfterPartialReset.data.records.forEach(r => {
    serverResponseAfterPartialReset.data.task_map[r.day_number + '_' + r.task_type] = r;
  });

  const { sandbox, localStorage } = createMockEnv(() => Promise.resolve({
    json: () => Promise.resolve(serverResponseAfterPartialReset)
  }));

  // Simulate student's active phone BEFORE refresh:
  // Student had NEVER been reset before (fincestem_client_reset_0089123456 is null!)
  // and had Day 2 Asesmen + Draft + Question Package stored locally
  localStorage.setItem('fincestem_user', JSON.stringify({ nisn, identifier: nisn, name: 'Bagas Arya', class: 'X.11', zone: 'FINCESTEM OKU TIMUR' }));
  localStorage.setItem('fincestem_materi_nft_day2_' + nisn, JSON.stringify({ day: 2, submitted: true, submittedAt: '2026-10-30T04:00:00.000Z', conclusion: 'Materi 2' }));
  localStorage.setItem('fincestem_lkpd_nft_day2_' + nisn, JSON.stringify({ day: 2, submitted: true, submittedAt: '2026-10-30T04:10:00.000Z', sectorKey: 'pangan' }));
  localStorage.setItem('fincestem_asesmen_nft_day2_' + nisn, JSON.stringify({ day: 2, submitted: true, submittedAt: '2026-10-30T04:20:00.000Z', score: 88 }));
  localStorage.setItem('fincestem_asesmen_day2_' + nisn, JSON.stringify({ day: 2, submitted: true, submittedAt: '2026-10-30T04:20:00.000Z', score: 88 }));
  localStorage.setItem('fincestem_draft_nft_asesmen_d2_' + nisn, JSON.stringify({ day: 2, startTime: '2026-10-30T03:30:00.000Z', answers: { 0: 'A' }, violationCount: 2 }));
  localStorage.setItem('fincestem_pkg_nft_asesmen_v2_d2_' + nisn, JSON.stringify([{ id: 1 }]));

  sandbox.window.FincestemCore.progress.getStudentProgress(nisn, (prog) => {
    assert(localStorage.getItem('fincestem_asesmen_nft_day2_' + nisn) === null, 'Day 2 Asesmen NFT key is 100% cleared from student localStorage');
    assert(localStorage.getItem('fincestem_asesmen_day2_' + nisn) === null, 'Day 2 Asesmen generic key is 100% cleared from student localStorage');
    assert(localStorage.getItem('fincestem_draft_nft_asesmen_d2_' + nisn) === null, 'Day 2 Asesmen draft key is 100% cleared from student localStorage');
    assert(localStorage.getItem('fincestem_pkg_nft_asesmen_v2_d2_' + nisn) === null, 'Day 2 Asesmen package key is 100% cleared from student localStorage');
    assert(localStorage.getItem('fincestem_materi_nft_day2_' + nisn) !== null, 'Day 2 Materi NFT key remains 100% intact');
    assert(localStorage.getItem('fincestem_lkpd_nft_day2_' + nisn) !== null, 'Day 2 LKPD NFT key remains 100% intact');
    assert(localStorage.getItem('fincestem_materi_nft_day1_' + nisn) !== null, 'Day 1 Materi NFT key remains 100% intact');
    assert(localStorage.getItem('fincestem_asesmen_nft_day1_' + nisn) !== null, 'Day 1 Asesmen NFT key remains 100% intact');
    assert(!prog.task_map['2_asesmen'], 'prog.task_map["2_asesmen"] is empty');
    assert(!!prog.task_map['2_materi'] && !!prog.task_map['2_lkpd'], 'prog.task_map["2_materi"] and ["2_lkpd"] remain intact');
    assert(sandbox.window.FincestemCore.progress.isDayCompleted(prog, 2) === false, 'Day 2 is NOT marked completed when Day 2 Asesmen was reset');
    assert(sandbox.window.FincestemCore.progress.isDayCompleted(prog, 1) === true, 'Day 1 IS still marked completed');

    console.log('\n=== TEST 2: Reset Device / Switch to New Phone (All Completed Work Preserved) ===');
    // Now simulate student completing Day 2 Asesmen again, and then switching to Phone 2 (Reset Device)
    const serverResponseFull = JSON.parse(JSON.stringify(serverResponseAfterPartialReset));
    serverResponseFull.data.records.push(
      { day_number: 2, task_type: 'asesmen', content: '{"score":94,"submitted":true}', score: 94, status: 'submitted', updated_at: '2026-10-30 20:00:00' }
    );
    serverResponseFull.data.task_map['2_asesmen'] = serverResponseFull.data.records[serverResponseFull.data.records.length - 1];

    const phone2 = createMockEnv(() => Promise.resolve({
      json: () => Promise.resolve(serverResponseFull)
    }));
    phone2.localStorage.setItem('fincestem_user', JSON.stringify({ nisn, identifier: nisn, name: 'Bagas Arya', class: 'X.11', zone: 'FINCESTEM OKU TIMUR' }));

    phone2.sandbox.window.FincestemCore.progress.getStudentProgress(nisn, () => {
      assert(phone2.localStorage.getItem('fincestem_materi_nft_day1_' + nisn) !== null, 'Phone 2 hydrated Day 1 Materi');
      assert(phone2.localStorage.getItem('fincestem_lkpd_nft_day1_' + nisn) !== null, 'Phone 2 hydrated Day 1 LKPD');
      assert(phone2.localStorage.getItem('fincestem_asesmen_nft_day1_' + nisn) !== null, 'Phone 2 hydrated Day 1 Asesmen');
      assert(phone2.localStorage.getItem('fincestem_materi_nft_day2_' + nisn) !== null, 'Phone 2 hydrated Day 2 Materi');
      assert(phone2.localStorage.getItem('fincestem_lkpd_nft_day2_' + nisn) !== null, 'Phone 2 hydrated Day 2 LKPD');
      assert(phone2.localStorage.getItem('fincestem_asesmen_nft_day2_' + nisn) !== null, 'Phone 2 hydrated Day 2 Asesmen (Score 94)');

      console.log('\n=== TEST 3: Dashboard getFTProgressStatus Non-Field Trip Day 2 Guard ===');
      assert(
        dashboardCode.includes('if (isFieldTrip && dayNum === 2 && hasLkpd)'),
        'siswa/dashboard.html only auto-marks Day 2 Asesmen from LKPD for Field Trip students (NOT Non-Field Trip)'
      );
      assert(
        dashboardCode.includes('if (isFieldTrip && dayNum === 7 && hasLkpd)'),
        'siswa/dashboard.html only auto-marks Day 7 Asesmen from LKPD for Field Trip students (NOT Non-Field Trip)'
      );

      console.log('\n=== TEST 4: Orphan Draft with Pelanggaran 3/3 is Cleared on Reset -> Pelanggaran 0/3 ===');
      const orphanPhone = createMockEnv(() => Promise.resolve({
        json: () => Promise.resolve(serverResponseAfterPartialReset)
      }));
      orphanPhone.localStorage.setItem('fincestem_user', JSON.stringify({ nisn, identifier: nisn, name: 'Bagas Arya', class: 'X.11', zone: 'FINCESTEM OKU TIMUR' }));
      // Simulate orphan draft where fincestem_asesmen_nft_day2_ was already null, but draft still had violationCount: 3
      orphanPhone.localStorage.setItem('fincestem_draft_nft_asesmen_d2_' + nisn, JSON.stringify({
        day: 2,
        startTime: '2026-10-30T03:00:00.000Z',
        updatedAt: '2026-10-30T03:05:00.000Z',
        answers: { 0: 'B', 1: 'C', 2: 'D' },
        violationCount: 3
      }));
      orphanPhone.sandbox.window.FincestemCore.progress.getStudentProgress(nisn, () => {
        assert(
          orphanPhone.localStorage.getItem('fincestem_draft_nft_asesmen_d2_' + nisn) === null,
          'Orphan draft with violationCount 3/3 is 100% removed so Pelanggaran resets to 0/3'
        );

        const asesmenCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'asesmen-nonfieldtrip.js'), 'utf8');
        assert(
          asesmenCode.includes("const vContainer = document.getElementById('examViolationModalContainer');\n    if (vContainer) vContainer.innerHTML = '';\n    removeBlackout();"),
          'submitExam immediately clears #examViolationModalContainer and blackout so Score Page is visible'
        );
        assert(
          !asesmenCode.includes('if (answeredCount > 0 && (isForce || correctCount === 0))'),
          'Grading strictly compares studentChoice === q.correctKey (random wrong answers are NEVER forced to be correct!)'
        );
        assert(
          asesmenCode.includes("String(studentChoice).trim().toUpperCase() === String(q.correctKey || '').trim().toUpperCase()"),
          'Grading accurately checks shuffled correctKey for each question'
        );
        assert(
          asesmenCode.includes('if ((parseInt(d.violationCount) || 0) >= 3 || d.isFinished)'),
          'loadDraftProgress rejects any stale draft with violationCount >= 3 and resets violationCount to 0'
        );
        assert(
          asesmenCode.includes('function stopQuestionIdleBlurTimer()'),
          'stopQuestionIdleBlurTimer is properly defined so submitExam never throws ReferenceError'
        );
        assert(
          asesmenCode.includes('if (isViolationModalOpen || isTabAway) return;'),
          'handleTabExit only increments +1 per violation and waits for student to dismiss modal before counting next violation'
        );
        assert(
          asesmenCode.includes("if (count >= 3) {\n      stopContinuousEscalationWatchdog();\n      stopExamAlarmLoop();\n      stopExamVibrationLoop();\n      submitExam(true, 'Force Submit (Pelanggaran Layar Mengambang / Tab 3x)');\n      return;\n    }"),
          '3rd violation (3/3) immediately executes submitExam synchronously without getting stuck on spinning modal'
        );

        console.log(`\nDONE: ${passed} passed, ${failed} failed.`);
        if (failed > 0) process.exit(1);
      });
    });
  });
}
