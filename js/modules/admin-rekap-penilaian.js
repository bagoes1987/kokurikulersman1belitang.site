/**
 * FINCESTEM 2026 - MODUL ADMIN REKAPITULASI PENILAIAN & RAPOR REAL-TIME
 * File: js/modules/admin-rekap-penilaian.js
 * 
 * Fitur:
 * 1. KPI Cards Ringkasan Kinerja (% Pengerjaan Siswa, % Penilaian Fasil, Antrean Belum Dinilai, Rapor Day 7)
 * 2. Tab 1: Monitoring Kinerja Fasilitator & Pengerjaan Siswa (116 Guru & Antrean Belum Dinilai)
 * 3. Tab 2: Matriks Penilaian Real-Time (Filter Multi-Dimensi: Per Kelas, Per Hari, Per Fasil, Per Jalur)
 * 4. Tab 3: Rekap Nilai Rapor Kokurikuler 4 Pilar & Predikat Resmi (Mahir, Cakap, Berkembang) Siap Cetak & Ekspor Excel
 */

(function(window) {
  'use strict';

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // State Utama Rekapitulasi
  const state = {
    isLoaded: false,
    isLoading: false,
    lastSyncTime: null,
    currentSubTab: 'monitoring', // 'monitoring', 'matrix', 'rapor'
    
    // Raw Server & Client Data
    serverStudents: {}, // nisn -> summary
    serverDays: {},     // `${nisn}_${day}` -> day record
    serverFinalGrades: {}, // nisn -> student_final_grades row
    enrichedStudents: [],
    facilitatorStats: [],
    
    // Filters Tab 1: Monitoring Fasil
    filterMonitoring: {
      search: '',
      status: 'ALL' // 'ALL', 'COMPLETE', 'ACTIVE', 'PENDING'
    },

    // Filters Tab 2: Matriks Penilaian Harian
    filterMatrix: {
      kelas: 'ALL',
      hari: 'ALL', // 'ALL', '1'..'7'
      fasil: 'ALL',
      category: 'ALL', // 'ALL', 'FIELD_TRIP', 'NON_FIELD_TRIP'
      status: 'ALL',   // 'ALL', 'NOT_SUBMITTED', 'PENDING', 'GRADED'
      search: ''
    },
    matrixPage: 1,
    matrixPerPage: 50,

    // Filters Tab 3: Rekap Rapor Kokurikuler
    filterRapor: {
      kelas: 'ALL',
      fasil: 'ALL',
      category: 'ALL',
      predikat: 'ALL', // 'ALL', 'Mahir', 'Cakap', 'Berkembang', 'BELUM_ADA'
      search: ''
    },
    raporPage: 1,
    raporPerPage: 50,
    monitoringPage: 1,
    monitoringPerPage: 10,

    // Modal Antrean Fasil
    modalFasilKey: null
  };

  /**
   * Mengambil data master siswa dari window
   */
  function getMasterStudents() {
    return Array.isArray(window.FincestemMasterStudents) ? window.FincestemMasterStudents : [];
  }

  /**
   * Mengambil data master guru dari FincestemMentorship atau window
   */
  function getMasterTeachers() {
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getTeachers === 'function') {
      return window.FincestemMentorship.getTeachers();
    }
    return Array.isArray(window.FincestemMasterTeachers) ? window.FincestemMasterTeachers : [];
  }

  /**
   * Mengambil pemetaan mentorship guru -> siswa
   */
  function getAssignmentsMap() {
    if (state.serverMentorship && state.serverMentorship.assignments && Object.keys(state.serverMentorship.assignments).length > 0) {
      return state.serverMentorship.assignments;
    }
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
      const local = window.FincestemMentorship.getAssignmentsMap();
      if (local && Object.keys(local).length > 0) return local;
    }
    return {};
  }

  function renderLoadingState() {
    const container = document.getElementById('tblMonitoringFasilBody');
    if (container && (!state.facilitatorStats || state.facilitatorStats.length === 0)) {
      container.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-12 text-slate-500">
            <div class="inline-flex items-center gap-3">
              <span class="material-symbols-outlined text-2xl text-[#0875D1] animate-spin">progress_activity</span>
              <span class="text-sm font-bold text-slate-700">Memuat data kinerja fasilitator dan siswa binaan dari server...</span>
            </div>
          </td>
        </tr>
      `;
    }
  }

  /**
   * Inisialisasi Modul & Sinkronisasi Pertama Kali
   */
  function initAdminRekapPenilaian(forceRefresh) {
    if (state.isLoaded && !forceRefresh) {
      processEnrichedData();
      renderAllViews();
      return;
    }
    renderLoadingState();
    fetchRekapDataFromServer();
  }

  /**
   * Tarik data rekapitulasi penilaian dari backend secara real-time
   */
  function fetchRekapDataFromServer(callback) {
    state.isLoading = true;
    updateSyncButtonState(true);

    const apiBase = (window.FincestemCore && FincestemCore.api && FincestemCore.api.base) ? FincestemCore.api.base : '../api';

    const pRecap = fetch(apiBase + '/progress.php?action=admin_recap')
      .then(res => res.json())
      .catch(err => {
        console.warn('[AdminRekapPenilaian] Gagal menarik data backend:', err);
        return null;
      });

    const pMentorship = new Promise((resolve) => {
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, 5000);

      if (window.FincestemMentorship && typeof window.FincestemMentorship.syncFromServer === 'function') {
        window.FincestemMentorship.syncFromServer(function(changed, data) {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            resolve(data);
          }
        });
      } else {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          resolve(null);
        }
      }
    });

    const pFinalGrades = fetch(apiBase + '/settings.php?action=get_role_assignments&_t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .catch(() => null);

    Promise.all([pRecap, pMentorship, pFinalGrades]).then(([json, mentorData, roleAssignData]) => {
      state.isLoading = false;
      updateSyncButtonState(false);

      // Parse official final_grades from server + localStorage fallback
      const fgMap = {};
      const ingestFg = (arr) => {
        if (!Array.isArray(arr)) return;
        arr.forEach(g => {
          if (!g || !g.student_nisn) return;
          const rawN = String(g.student_nisn).trim();
          const noZero = rawN.replace(/^0+/, '');
          const pad10 = rawN.padStart(10, '0');
          [rawN, noZero, pad10].filter(Boolean).forEach(k => { fgMap[k] = g; });
        });
      };
      try {
        if (window.FincestemCore && FincestemCore.assignments) {
          const localA = FincestemCore.assignments.getLocalAssignments();
          if (localA && localA.final_grades) ingestFg(localA.final_grades);
        }
      } catch (eLoc) {}
      if (roleAssignData && roleAssignData.success && roleAssignData.data && Array.isArray(roleAssignData.data.final_grades)) {
        ingestFg(roleAssignData.data.final_grades);
      }
      state.serverFinalGrades = fgMap;

      if (json && json.success && json.data) {
        const sMap = {};
        if (Array.isArray(json.data.students)) {
          json.data.students.forEach(s => {
            if (s && s.student_nisn) {
              sMap[String(s.student_nisn).trim()] = s;
            }
          });
        }
        state.serverStudents = sMap;

        const dMap = {};
        if (Array.isArray(json.data.days)) {
          json.data.days.forEach(d => {
            if (d && d.student_nisn && d.day_number) {
              const key = `${String(d.student_nisn).trim()}_${d.day_number}`;
              dMap[key] = d;
            }
          });
        }
        state.serverDays = dMap;
        if (json.data && json.data.mentorship) {
          state.serverMentorship = json.data.mentorship;
          if (window.FincestemMentorship && typeof window.FincestemMentorship.applyServerState === 'function') {
            window.FincestemMentorship.applyServerState(json.data.mentorship);
          }
        }
        state.lastSyncTime = new Date();
        state.isLoaded = true;

        processEnrichedData();
        renderAllViews();
        if (typeof callback === 'function') callback(true);
      } else {
        processEnrichedData();
        renderAllViews();
        if (typeof callback === 'function') callback(false);
      }
    }).catch(err => {
      console.warn('[AdminRekapPenilaian] Exception in fetchRekapDataFromServer:', err);
      state.isLoading = false;
      updateSyncButtonState(false);
      processEnrichedData();
      renderAllViews();
      if (typeof callback === 'function') callback(false);
    });
  }

  /**
   * Gabungkan master siswa, pemetaan fasilitator, dan progres backend
   */
  function getStudentNormalizedClass(s) {
    if (!s) return '';
    return String(s.class || s.kelas || s.class_name || s.rombel || '').replace(/^KELAS\s+/i, '').trim();
  }

  /**
   * Gabungkan master siswa, pemetaan binaan fasilitator, dan progres backend
   */
  function processEnrichedData() {
    const students = getMasterStudents();
    const teachers = getMasterTeachers();

    // 1. Buat mapping siswa ke guru binaan secara akurat dari modul Mentorship resmi
    const studentToMentorMap = {};

    teachers.forEach(tc => {
      const key = String(tc.username || tc.nip || tc.kode_guru).trim().toLowerCase();
      let rawBinaan = [];
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getStudentsForTeacher === 'function') {
        rawBinaan = window.FincestemMentorship.getStudentsForTeacher(key) || [];
        if (!rawBinaan.length && tc.nip && tc.nip !== '-') {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.nip) || [];
        }
        if (!rawBinaan.length && tc.username) {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.username) || [];
        }
        if (!rawBinaan.length && tc.kode_guru && tc.kode_guru !== '-') {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.kode_guru) || [];
        }
        if (!rawBinaan.length && tc.nama_guru) {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.nama_guru) || [];
        }
      }
      if (!rawBinaan.length) {
        let assignsMap = {};
        if (state.serverMentorship && state.serverMentorship.assignments && Object.keys(state.serverMentorship.assignments).length > 0) {
          assignsMap = state.serverMentorship.assignments;
        } else if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
          assignsMap = window.FincestemMentorship.getAssignmentsMap() || {};
        }
        const candidateKeys = [key, tc.username, tc.nip, tc.kode_guru, tc.nama_guru].filter(Boolean).map(k => String(k).trim().toLowerCase());
        let matchedEntry = null;
        for (const ck of candidateKeys) {
          if (assignsMap[ck]) { matchedEntry = assignsMap[ck]; break; }
        }
        if (!matchedEntry && tc.nama_guru) {
          const normName = tc.nama_guru.toLowerCase().replace(/[^a-z]/g, '');
          for (const ak of Object.keys(assignsMap)) {
            const entry = assignsMap[ak];
            if (entry && entry.teacher_name && entry.teacher_name.toLowerCase().replace(/[^a-z]/g, '') === normName) {
              matchedEntry = entry;
              break;
            }
          }
        }
        if (matchedEntry && Array.isArray(matchedEntry.student_nisns) && matchedEntry.student_nisns.length > 0) {
          const nisnSet = new Set(matchedEntry.student_nisns.map(n => String(n).trim()));
          rawBinaan = students.filter(s => {
            const sn = String(s.nisn || s.identifier || '').trim();
            const unp = sn.replace(/^0+/, '');
            const pad = (sn.length >= 8 && sn.length <= 10) ? sn.padStart(10, '0') : sn;
            return nisnSet.has(sn) || nisnSet.has(unp) || nisnSet.has(pad);
          });
          if (rawBinaan.length === 0) {
            rawBinaan = matchedEntry.student_nisns.map(n => ({
              nisn: n,
              name: 'Siswa ' + n,
              class: 'Binaan'
            }));
          }
        }
      }
      rawBinaan.forEach(st => {
        const nisn = String(st.nisn || st.identifier || '').trim();
        if (nisn) {
          studentToMentorMap[nisn] = {
            teacherKey: key,
            teacherName: tc.nama_guru,
            teacher: tc
          };
        }
      });
    });

    // Fallback: jika ada siswa yang belum masuk map, periksa findMentorForStudent
    students.forEach(st => {
      const nisn = String(st.nisn || st.identifier || '').trim();
      if (!studentToMentorMap[nisn] && window.FincestemMentorship && typeof window.FincestemMentorship.findMentorForStudent === 'function') {
        const m = window.FincestemMentorship.findMentorForStudent(nisn);
        if (m && m.teacher_name) {
          studentToMentorMap[nisn] = {
            teacherKey: m.teacher_key,
            teacherName: m.teacher_name,
            teacher: m.teacher
          };
        }
      }
    });

    // 2. Perkaya data setiap siswa
    const enriched = students.map(st => {
      const nisn = String(st.nisn || st.identifier || '').trim();
      const srvSumm = state.serverStudents[nisn] || null;
      const mentorInfo = studentToMentorMap[nisn] || null;

      // Hitung submission tasks (target 35 instrumen)
      const totalSubmissions = srvSumm ? parseInt(srvSumm.total_submissions || 0) : 0;
      const submissionPct = Math.min(100, Math.round((totalSubmissions / 35) * 100));

      // Ambil riwayat Day 1 s/d 7
      const days = {};
      let totalGradedDays = 0;
      let hasPendingDay = false;

      for (let d = 1; d <= 7; d++) {
        const dRec = state.serverDays[`${nisn}_${d}`] ||
                     state.serverDays[`${nisn.replace(/^0+/, '')}_${d}`] ||
                     state.serverDays[`${nisn.padStart(10, '0')}_${d}`] ||
                     null;
        let dayStatus = 'not_submitted'; // 'not_submitted', 'pending', 'graded'
        let dayScore = null;
        let dayPred = null;

        if (dRec) {
          if (dRec.score !== null && dRec.score !== undefined && dRec.score !== '') {
            dayStatus = 'graded';
            dayScore = parseFloat(dRec.score);
            dayPred = dRec.predicate || (dayScore >= 85 ? 'Mahir' : (dayScore >= 70 ? 'Cakap' : 'Berkembang'));
            totalGradedDays++;
          } else if (dRec.status === 'completed' || dRec.status === 'reviewed') {
            dayStatus = 'graded';
            totalGradedDays++;
          } else if (parseInt(dRec.student_tasks_count || 0) > 0 || dRec.status === 'submitted') {
            dayStatus = 'pending';
            hasPendingDay = true;
          }
        }

        days[d] = {
          record: dRec,
          status: dayStatus,
          score: dayScore,
          predicate: dayPred
        };
      }

      // Rapor Akhir: Prioritaskan Penetapan Resmi Fasilitator (student_final_grades / 7_final), lalu Day 7, lalu estimasi
      const day7 = days[7];
      const fgRec = state.serverFinalGrades[nisn] ||
                    state.serverFinalGrades[nisn.replace(/^0+/, '')] ||
                    state.serverFinalGrades[nisn.padStart(10, '0')] ||
                    null;
      if (fgRec && fgRec.final_score !== null && fgRec.final_score !== undefined && fgRec.final_score !== '') {
        hasPendingDay = false;
      }

      const isFT = (window.FincestemCore && FincestemCore.zones && typeof FincestemCore.zones.isFieldTripStudent === 'function')
        ? FincestemCore.zones.isFieldTripStudent(nisn, st.class_name || st.class || st.kelas, st.zone)
        : ((st.category || st.zone || '').toUpperCase().includes('LUAR') || (st.category || '').toUpperCase().includes('FIELD_TRIP') || st.is_field_trip === true);

      let finalScore = null;
      let finalPred = null;
      let finalNotes = '';
      let finalSource = 'pending';
      let finScore = null;
      let culScore = null;
      let expScore = null;
      let stemScore = null;

      if (day7 && day7.record) {
        if (day7.record.fin !== null && day7.record.fin !== undefined && day7.record.fin !== '') finScore = parseFloat(day7.record.fin);
        if (day7.record.cul !== null && day7.record.cul !== undefined && day7.record.cul !== '') culScore = parseFloat(day7.record.cul);
        if (day7.record.exp !== null && day7.record.exp !== undefined && day7.record.exp !== '') expScore = parseFloat(day7.record.exp);
        if (day7.record.stem !== null && day7.record.stem !== undefined && day7.record.stem !== '') stemScore = parseFloat(day7.record.stem);
      }

      const toRaporPred = (sc, rawP) => {
        if (sc !== null && sc !== undefined && !isNaN(sc)) {
          const n = parseFloat(sc);
          return n >= 85 ? 'Mahir' : (n >= 70 ? 'Cakap' : 'Berkembang');
        }
        const p = String(rawP || '').trim().toLowerCase();
        if (p === 'mahir' || p === 'sangat baik') return 'Mahir';
        if (p === 'cakap' || p === 'baik') return 'Cakap';
        if (p === 'berkembang' || p === 'cukup' || p.includes('bimbingan') || p.includes('perlu')) return 'Berkembang';
        return null;
      };

      if (fgRec && fgRec.final_score !== null && fgRec.final_score !== undefined && fgRec.final_score !== '') {
        finalScore = parseFloat(fgRec.final_score);
        finalPred = toRaporPred(finalScore, fgRec.final_predicate);
        finalNotes = fgRec.notes || '';
        finalSource = 'fasil_final';
        finScore = finalScore;
        culScore = finalScore;
        expScore = finalScore;
        stemScore = finalScore;
      } else if (day7 && day7.status === 'graded' && day7.score !== null) {
        finalScore = day7.score;
        finalPred = toRaporPred(finalScore, day7.predicate);
        finalSource = 'day7';
        if (finScore === null) finScore = finalScore;
        if (culScore === null) culScore = finalScore;
        if (expScore === null) expScore = finalScore;
        if (stemScore === null) stemScore = finalScore;
      } else if (srvSumm && srvSumm.final_score !== null && srvSumm.final_score !== undefined && srvSumm.final_score !== '') {
        finalScore = parseFloat(srvSumm.final_score);
        finalPred = toRaporPred(finalScore, srvSumm.final_predicate);
        finalSource = 'fasil_final';
        finScore = finalScore;
        culScore = finalScore;
        expScore = finalScore;
        stemScore = finalScore;
      } else if (isFT && totalGradedDays >= 7) {
        finalScore = 95.0;
        finalPred = 'Mahir';
        finalSource = 'system_ft';
        finScore = 95; culScore = 95; expScore = 95; stemScore = 95;
      }

      // Jika Fasilitator menetapkan Nilai Akhir manual, selaraskan nilai per-hari (Day 1–7) yang sudah dinilai/dikerjakan
      if (finalSource === 'fasil_final' && finalScore !== null) {
        for (let d = 1; d <= 7; d++) {
          if (days[d] && (days[d].status === 'graded' || days[d].score !== null)) {
            days[d].score = finalScore;
            days[d].predicate = finalPred;
          }
        }
      }

      return {
        nisn: nisn,
        name: st.name || st.nama || '-',
        className: st.class_name || st.class || st.kelas || '-',
        category: isFT ? 'FIELD_TRIP' : 'NON_FIELD_TRIP',
        gender: st.gender || st.jenis_kelamin || '-',
        mentorKey: mentorInfo ? mentorInfo.teacherKey : null,
        mentorName: mentorInfo ? mentorInfo.teacherName : 'Belum Ditentukan',
        totalSubmissions: totalSubmissions,
        submissionPct: submissionPct,
        totalGradedDays: totalGradedDays,
        hasPendingDay: hasPendingDay,
        days: days,
        finalScore: finalScore,
        finalPred: finalPred,
        finalNotes: finalNotes,
        finalSource: finalSource,
        finScore: finScore,
        culScore: culScore,
        expScore: expScore,
        stemScore: stemScore,
        lastActive: srvSumm ? srvSumm.last_active : null
      };
    });
    state.enrichedStudents = enriched;

    // Index enriched students by NISN untuk lookup kilat
    const enrichedByNisn = {};
    enriched.forEach(e => {
      enrichedByNisn[e.nisn] = e;
    });

    // 3. Kalkulasi Metrik Kinerja Setiap Guru Fasilitator
    const fasilMetrics = teachers.map((tc, idx) => {
      const key = String(tc.username || tc.nip || tc.kode_guru).trim().toLowerCase();
      let rawBinaan = [];
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getStudentsForTeacher === 'function') {
        rawBinaan = window.FincestemMentorship.getStudentsForTeacher(key) || [];
        if (!rawBinaan.length && tc.nip && tc.nip !== '-') {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.nip) || [];
        }
        if (!rawBinaan.length && tc.username) {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.username) || [];
        }
        if (!rawBinaan.length && tc.kode_guru && tc.kode_guru !== '-') {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.kode_guru) || [];
        }
        if (!rawBinaan.length && tc.nama_guru) {
          rawBinaan = window.FincestemMentorship.getStudentsForTeacher(tc.nama_guru) || [];
        }
      }
      if (!rawBinaan.length) {
        let assignsMap = {};
        if (state.serverMentorship && state.serverMentorship.assignments && Object.keys(state.serverMentorship.assignments).length > 0) {
          assignsMap = state.serverMentorship.assignments;
        } else if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
          assignsMap = window.FincestemMentorship.getAssignmentsMap() || {};
        }
        const candidateKeys = [key, tc.username, tc.nip, tc.kode_guru, tc.nama_guru].filter(Boolean).map(k => String(k).trim().toLowerCase());
        let matchedEntry = null;
        for (const ck of candidateKeys) {
          if (assignsMap[ck]) { matchedEntry = assignsMap[ck]; break; }
        }
        if (!matchedEntry && tc.nama_guru) {
          const normName = tc.nama_guru.toLowerCase().replace(/[^a-z]/g, '');
          for (const ak of Object.keys(assignsMap)) {
            const entry = assignsMap[ak];
            if (entry && entry.teacher_name && entry.teacher_name.toLowerCase().replace(/[^a-z]/g, '') === normName) {
              matchedEntry = entry;
              break;
            }
          }
        }
        if (matchedEntry && Array.isArray(matchedEntry.student_nisns) && matchedEntry.student_nisns.length > 0) {
          const nisnSet = new Set(matchedEntry.student_nisns.map(n => String(n).trim()));
          rawBinaan = students.filter(s => {
            const sn = String(s.nisn || s.identifier || '').trim();
            const unp = sn.replace(/^0+/, '');
            const pad = (sn.length >= 8 && sn.length <= 10) ? sn.padStart(10, '0') : sn;
            return nisnSet.has(sn) || nisnSet.has(unp) || nisnSet.has(pad);
          });
          if (rawBinaan.length === 0) {
            rawBinaan = matchedEntry.student_nisns.map(n => ({
              nisn: n,
              name: 'Siswa ' + n,
              class: 'Binaan'
            }));
          }
        }
      }

      // Ambil daftar kelas binaan unik dan siswa binaan yang diperkaya
      const classCounts = {};
      const binaanEnriched = [];
      rawBinaan.forEach(s => {
        const cls = getStudentNormalizedClass(s) || 'Tanpa Kelas';
        classCounts[cls] = (classCounts[cls] || 0) + 1;
        const sNisn = String(s.nisn || s.identifier || '').trim();
        const unp = sNisn.replace(/^0+/, '');
        const pad = (sNisn.length >= 8 && sNisn.length <= 10) ? sNisn.padStart(10, '0') : sNisn;
        const enr = (sNisn && enrichedByNisn[sNisn]) || (unp && enrichedByNisn[unp]) || (pad && enrichedByNisn[pad]);
        if (enr) {
          binaanEnriched.push(enr);
        }
      });

      let classesList = Object.keys(classCounts).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      // Fallback: periksa penugasan per-rombel di FincestemCore.assignments jika belum ada di mentorship
      if (classesList.length === 0 && window.FincestemCore && FincestemCore.assignments && typeof FincestemCore.assignments.getLocalAssignments === 'function') {
        try {
          const local = FincestemCore.assignments.getLocalAssignments() || {};
          const allAssigned = [...(local.facilitators || []), ...(local.coordinators || [])];
          allAssigned.forEach(as => {
            const mUser = String(as.teacher_username || '').toLowerCase();
            const mName = String(as.teacher_name || '').toLowerCase();
            if (mUser === key || (tc.nama_guru && mName.includes(tc.nama_guru.toLowerCase()))) {
              const cls = String(as.class_name || '').replace(/^KELAS\s+/i, '').trim();
              if (cls && !classesList.includes(cls)) {
                classesList.push(cls);
              }
            }
          });
          classesList.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        } catch(e) {}
      }
      // Fallback tambahan: jika rawBinaan masih kosong namun classesList ditemukan dari rombel, ambil siswa rombel tersebut
      if (rawBinaan.length === 0 && classesList.length > 0) {
        const clsSet = new Set(classesList.map(c => String(c).toUpperCase().replace(/^KELAS\s+/i, '').trim()));
        rawBinaan = students.filter(s => {
          const sc = getStudentNormalizedClass(s).toUpperCase();
          return clsSet.has(sc);
        });
        rawBinaan.forEach(s => {
          const sNisn = String(s.nisn || s.identifier || '').trim();
          const unp = sNisn.replace(/^0+/, '');
          const pad = (sNisn.length >= 8 && sNisn.length <= 10) ? sNisn.padStart(10, '0') : sNisn;
          const enr = (sNisn && enrichedByNisn[sNisn]) || (unp && enrichedByNisn[unp]) || (pad && enrichedByNisn[pad]);
          if (enr && !binaanEnriched.includes(enr)) {
            binaanEnriched.push(enr);
          }
        });
      }
      const totalBinaan = rawBinaan.length;

      // Siswa yang sudah mengumpulkan setidaknya 1 tugas
      const submittedStudents = binaanEnriched.filter(st => st.totalSubmissions > 0);
      const submittedCount = submittedStudents.length;
      const submittedPct = totalBinaan > 0 ? Math.round((submittedCount / totalBinaan) * 100) : 0;

      // Siswa yang sudah dinilai fasil (setidaknya 1 hari atau Day 7)
      const gradedStudents = binaanEnriched.filter(st => st.totalGradedDays > 0);
      const gradedCount = gradedStudents.length;
      const gradedPct = totalBinaan > 0 ? Math.round((gradedCount / totalBinaan) * 100) : 0;

      // Siswa yang sudah dinilai Nilai Rapor Akhir resmi (oleh fasilitator)
      const finalGradedStudents = binaanEnriched.filter(st => st.finalScore !== null && st.finalScore !== undefined && st.finalScore !== '');
      const finalGradedCount = finalGradedStudents.length;
      const finalGradedPct = totalBinaan > 0 ? Math.round((finalGradedCount / totalBinaan) * 100) : 0;

      // Siswa yang sudah mengumpulkan tugas namun BELUM DINILAI fasil (Antrean)
      const pendingStudents = binaanEnriched.filter(st => st.hasPendingDay);
      const pendingCount = pendingStudents.length;

      // Tentukan status kinerja guru berdasarkan Nilai Rapor Akhir
      let statusKinerja = 'TERTUNDA';
      let statusLabel = 'Belum Menilai (0%)';
      let statusColor = 'rose';

      if (totalBinaan === 0) {
        statusKinerja = 'NON_AKTIF';
        statusLabel = 'Tanpa Siswa Binaan';
        statusColor = 'slate';
      } else if (finalGradedCount === totalBinaan) {
        statusKinerja = 'SELESAI';
        statusLabel = 'Tuntas 100%';
        statusColor = 'emerald';
      } else if (finalGradedCount > 0) {
        statusKinerja = 'PROSES';
        statusLabel = `Sebagian (${finalGradedCount}/${totalBinaan})`;
        statusColor = 'amber';
      }

      return {
        no: idx + 1,
        teacherKey: key,
        nama_guru: tc.nama_guru || '-',
        nip: tc.nip && tc.nip !== '-' ? tc.nip : (tc.kode_guru || '-'),
        classes: classesList,
        totalBinaan: totalBinaan,
        submittedCount: submittedCount,
        submittedPct: submittedPct,
        gradedCount: gradedCount,
        gradedPct: gradedPct,
        finalGradedCount: finalGradedCount,
        finalGradedPct: finalGradedPct,
        pendingCount: pendingCount,
        pendingStudents: pendingStudents,
        day7DoneCount: finalGradedCount,
        statusKinerja: statusKinerja,
        statusLabel: statusLabel,
        statusColor: statusColor,
        binaanEnriched: binaanEnriched
      };
    });

    // Urutkan fasilitator: Guru yang memiliki binaan di atas (bina terbanyak lebih dulu), lalu abjad
    fasilMetrics.sort((a, b) => {
      if (a.totalBinaan > 0 && b.totalBinaan === 0) return -1;
      if (b.totalBinaan > 0 && a.totalBinaan === 0) return 1;
      if (b.totalBinaan !== a.totalBinaan) return b.totalBinaan - a.totalBinaan;
      return a.nama_guru.localeCompare(b.nama_guru);
    });
    fasilMetrics.forEach((f, i) => f.no = i + 1);

    state.facilitatorStats = fasilMetrics;
  }

  function renderAllViews() {
    renderKPIHeaderCards();
    if (state.currentSubTab === 'monitoring') {
      renderSubTabMonitoring();
    } else if (state.currentSubTab === 'matrix') {
      renderSubTabMatrix();
    } else if (state.currentSubTab === 'rapor') {
      renderSubTabRapor();
    }
  }

  /**
   * Update Status Tombol Sinkronisasi
   */
  function updateSyncButtonState(loading) {
    const btn = document.getElementById('btnSyncRekapPenilaian');
    const lbl = document.getElementById('lblSyncRekapPenilaian');
    if (!btn || !lbl) return;

    if (loading) {
      btn.disabled = true;
      lbl.innerHTML = '<span class="inline-block animate-spin mr-1">⟳</span> Menyinkronkan...';
      btn.classList.add('opacity-70');
    } else {
      btn.disabled = false;
      lbl.textContent = 'Sinkronkan Real-Time';
      btn.classList.remove('opacity-70');
    }
  }

  /**
   * Ganti Sub-Tab Rekapitulasi (Monitoring / Matriks / Rapor)
   */
  window.switchAdminRekapSubTab = function(tabName) {
    state.currentSubTab = tabName;

    const tabs = ['monitoring', 'matrix', 'rapor'];
    tabs.forEach(t => {
      const btn = document.getElementById('btnAdmRekapSub_' + t);
      const view = document.getElementById('viewAdmRekapSub_' + t);
      if (btn) {
        if (t === tabName) {
          btn.className = 'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#0875D1] text-white shadow-sm border border-blue-400/40';
        } else {
          btn.className = 'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200';
        }
      }
      if (view) {
        if (t === tabName) view.classList.remove('hidden');
        else view.classList.add('hidden');
      }
    });

    renderAllViews();
  };

  /**
   * 1. HEADER KPI CARDS (Real-time Overview)
   */
  function renderKPIHeaderCards() {
    const totalStudents = state.enrichedStudents.length || 1165;
    
    // Rata-rata Pengerjaan Siswa (%)
    let totalSubmitPct = 0;
    state.enrichedStudents.forEach(st => totalSubmitPct += st.submissionPct);
    const avgStudentProgress = totalStudents > 0 ? Math.round(totalSubmitPct / totalStudents) : 0;

    // Persentase Penilaian Fasilitator Selesai (%)
    let totalAssignedStudents = 0;
    let totalFinalGradedStudents = 0;
    let totalPendingQueue = 0;
    let totalCompleteTeachers = 0;
    let totalPartialTeachers = 0;
    let totalNoneTeachers = 0;

    state.facilitatorStats.forEach(f => {
      if (f.totalBinaan > 0) {
        totalAssignedStudents += f.totalBinaan;
        totalFinalGradedStudents += f.finalGradedCount;
        totalPendingQueue += f.pendingCount;
        if (f.statusKinerja === 'SELESAI') totalCompleteTeachers++;
        else if (f.statusKinerja === 'PROSES') totalPartialTeachers++;
        else if (f.statusKinerja === 'TERTUNDA') totalNoneTeachers++;
      }
    });

    const avgFasilGrading = totalAssignedStudents > 0 ? (Math.round((totalFinalGradedStudents / totalAssignedStudents) * 1000) / 10) : 0;

    // Update Elemen di UI
    const elTotStud = document.getElementById('kpiRekapTotalStudents');
    const elAvgProg = document.getElementById('kpiRekapAvgProgress');
    const elAvgFasil = document.getElementById('kpiRekapFasilDone');
    const elPending = document.getElementById('kpiRekapPendingGrading');
    const elRaporDone = document.getElementById('kpiRekapRaporReady');
    const elSyncTime = document.getElementById('lblRekapLastSyncTime');

    if (elTotStud) elTotStud.textContent = totalStudents.toLocaleString('id-ID');
    if (elAvgProg) elAvgProg.textContent = `${avgStudentProgress}%`;
    if (elAvgFasil) {
      elAvgFasil.textContent = `${avgFasilGrading}%`;
      const subEl = elAvgFasil.parentElement.nextElementSibling;
      if (subEl) subEl.textContent = `${totalFinalGradedStudents}/${totalAssignedStudents} Siswa • ${totalCompleteTeachers} Fasil Tuntas`;
    }
    if (elPending) {
      elPending.textContent = totalPendingQueue;
      if (totalPendingQueue > 0) {
        elPending.parentElement.classList.add('text-amber-600');
      } else {
        elPending.parentElement.classList.remove('text-amber-600');
      }
    }
    if (elRaporDone) elRaporDone.textContent = `${totalFinalGradedStudents} Siswa`;

    if (elSyncTime) {
      const nowStr = state.lastSyncTime ? state.lastSyncTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB' : 'Baru saja';
      elSyncTime.textContent = `Sinkron Terakhir: ${nowStr}`;
    }

    // Update Badge Count di Baris Filter Cepat
    const bAssigned = document.getElementById('badgeFasilCount_ASSIGNED');
    const bComplete = document.getElementById('badgeFasilCount_COMPLETE');
    const bPartial = document.getElementById('badgeFasilCount_PARTIAL');
    const bNone = document.getElementById('badgeFasilCount_NONE');
    if (bAssigned) bAssigned.textContent = (totalCompleteTeachers + totalPartialTeachers + totalNoneTeachers);
    if (bComplete) bComplete.textContent = totalCompleteTeachers;
    if (bPartial) bPartial.textContent = totalPartialTeachers;
    if (bNone) bNone.textContent = totalNoneTeachers;
  }

  /**
   * 2. TAB 1: MONITORING KINERJA FASILITATOR & PENGERJAAN
   */
  function renderSubTabMonitoring() {
    const container = document.getElementById('tbodyRekapMonitoringFasil');
    const countEl = document.getElementById('lblCountMonitoringFasil');
    if (!container) return;

    let list = [...state.facilitatorStats];
    const sTerm = (state.filterMonitoring.search || '').trim().toLowerCase();
    const stFilter = state.filterMonitoring.status;

    // Filter Pencarian Guru / NIP
    if (sTerm) {
      list = list.filter(f => 
        f.nama_guru.toLowerCase().includes(sTerm) || 
        f.nip.toLowerCase().includes(sTerm) ||
        f.classes.some(c => c.toLowerCase().includes(sTerm))
      );
    }

    // Update highlight button pill filter cepat
    ['ASSIGNED', 'COMPLETE', 'PARTIAL', 'NONE'].forEach(stKey => {
      const btn = document.getElementById('pillFasilFilter_' + stKey);
      if (btn) {
        const isActive = (stFilter === stKey);
        if (isActive) {
          if (stKey === 'COMPLETE') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-emerald-600 text-white shadow-xs border border-emerald-500 cursor-pointer flex items-center gap-1.5';
          else if (stKey === 'PARTIAL') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-amber-600 text-white shadow-xs border border-amber-500 cursor-pointer flex items-center gap-1.5';
          else if (stKey === 'NONE') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-rose-600 text-white shadow-xs border border-rose-500 cursor-pointer flex items-center gap-1.5';
          else btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-[#0875D1] text-white shadow-xs border border-blue-500 cursor-pointer flex items-center gap-1.5';
        } else {
          if (stKey === 'COMPLETE') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs cursor-pointer flex items-center gap-1.5';
          else if (stKey === 'PARTIAL') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs cursor-pointer flex items-center gap-1.5';
          else if (stKey === 'NONE') btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white hover:bg-rose-50 text-rose-800 border border-rose-300 shadow-2xs cursor-pointer flex items-center gap-1.5';
          else btn.className = 'px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-white hover:bg-blue-50 text-slate-700 border border-slate-300 shadow-2xs cursor-pointer flex items-center gap-1.5';
        }
      }
    });

    const selEl = document.getElementById('selFilterMonitoringStatus');
    if (selEl && selEl.value !== stFilter) {
      selEl.value = stFilter;
    }

    // Filter Status Kinerja
    if (stFilter !== 'ALL') {
      if (stFilter === 'ASSIGNED') list = list.filter(f => f.totalBinaan > 0);
      else if (stFilter === 'COMPLETE') list = list.filter(f => f.statusKinerja === 'SELESAI');
      else if (stFilter === 'PARTIAL' || stFilter === 'ACTIVE') list = list.filter(f => f.statusKinerja === 'PROSES');
      else if (stFilter === 'PENDING') list = list.filter(f => f.pendingCount > 0);
      else if (stFilter === 'NONE') list = list.filter(f => f.statusKinerja === 'TERTUNDA');
    }

    const totalItems = list.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.monitoringPerPage));
    if (state.monitoringPage > totalPages) state.monitoringPage = totalPages;
    if (state.monitoringPage < 1) state.monitoringPage = 1;

    const startIdx = (state.monitoringPage - 1) * state.monitoringPerPage;
    const paginatedList = list.slice(startIdx, startIdx + state.monitoringPerPage);

    const pageEl = document.getElementById('lblPageMonitoringFasil');
    const prevBtn = document.getElementById('btnPrevPageMonitoringFasil');
    const nextBtn = document.getElementById('btnNextPageMonitoringFasil');

    if (countEl) {
      countEl.textContent = totalItems === 0
        ? 'Menampilkan 0 dari 0 Fasilitator'
        : `Menampilkan ${startIdx + 1} - ${Math.min(startIdx + state.monitoringPerPage, totalItems)} dari ${totalItems} Fasilitator`;
    }
    if (pageEl) pageEl.textContent = `Hal ${state.monitoringPage} dari ${totalPages}`;
    if (prevBtn) prevBtn.disabled = (state.monitoringPage <= 1);
    if (nextBtn) nextBtn.disabled = (state.monitoringPage >= totalPages);

    if (paginatedList.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-12 text-slate-400">
            <span class="material-symbols-outlined text-4xl mb-2 text-slate-300 block">search_off</span>
            <p class="text-sm font-semibold">Tidak ditemukan guru fasilitator dengan kriteria filter tersebut.</p>
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    paginatedList.forEach((f, idx) => {
      const rowNum = startIdx + idx + 1;
      const classBadges = f.classes.length > 0 
        ? `<div class="flex flex-wrap gap-1">${f.classes.map(c => `<span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">${escapeHtml(c)}</span>`).join('')}</div>`
        : '<span class="text-slate-400 text-xs italic">Belum diplot</span>';

      // Badge Antrean Belum Dinilai
      let pendingBadge = '';
      if (f.pendingCount > 0) {
        pendingBadge = `
          <button onclick="openModalAntreanFasil('${escapeHtml(f.teacherKey)}')" class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer shadow-2xs whitespace-nowrap" title="Klik untuk lihat nama siswa yang belum dinilai">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
            <span>${f.pendingCount} Menunggu</span>
            <span class="material-symbols-outlined text-xs">visibility</span>
          </button>
        `;
      } else {
        pendingBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 whitespace-nowrap">
          <span class="material-symbols-outlined text-xs">check_circle</span> 0 Antrean
        </span>`;
      }

      // Status Badge Kinerja Penilaian Rapor Akhir
      let statusBadge = '';
      if (f.statusKinerja === 'SELESAI') {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Tuntas 100%</span>`;
      } else if (f.statusKinerja === 'PROSES') {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Sebagian</span>`;
      } else if (f.statusKinerja === 'TERTUNDA') {
        statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs whitespace-nowrap"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Belum Menilai</span>`;
      } else {
        statusBadge = `<span class="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 whitespace-nowrap">Non-Aktif</span>`;
      }

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="px-2.5 py-2.5 text-center text-xs font-semibold text-slate-500">${rowNum}</td>
          <td class="px-3 py-2.5 min-w-[170px] max-w-[220px]">
            <div class="font-bold text-slate-800 text-xs leading-snug">${escapeHtml(f.nama_guru)}</div>
            <div class="text-[10.5px] text-slate-400 font-medium truncate">NIP: ${escapeHtml(f.nip)}</div>
          </td>
          <td class="px-2.5 py-2.5 max-w-[200px]">
            ${classBadges}
          </td>
          <td class="px-2.5 py-2.5 text-center whitespace-nowrap">
            <span class="inline-block px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-blue-50 text-[#0875D1] border border-blue-200 whitespace-nowrap">
              ${f.totalBinaan} Siswa
            </span>
          </td>
          <td class="px-2.5 py-2.5 w-28">
            <div class="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1 gap-1">
              <span>${f.submittedPct}%</span>
              <span class="text-[10px] text-slate-400 font-normal">(${f.submittedCount}/${f.totalBinaan})</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
              <div class="h-full bg-cyan-500 rounded-full transition-all" style="width: ${f.submittedPct}%"></div>
            </div>
          </td>
          <td class="px-3 py-2.5 w-36">
            <div class="flex items-center justify-between text-[11px] font-black text-slate-800 mb-1 gap-1">
              <span class="${f.finalGradedCount === f.totalBinaan && f.totalBinaan > 0 ? 'text-emerald-700 font-black' : (f.finalGradedCount > 0 ? 'text-amber-700 font-black' : 'text-rose-700 font-black')}">${f.finalGradedPct}%</span>
              <span class="text-[10px] text-slate-500 font-bold">(${f.finalGradedCount}/${f.totalBinaan})</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80">
              <div class="h-full rounded-full transition-all ${f.finalGradedCount === f.totalBinaan && f.totalBinaan > 0 ? 'bg-emerald-500' : (f.finalGradedCount > 0 ? 'bg-amber-500' : 'bg-rose-400')}" style="width: ${f.finalGradedPct}%"></div>
            </div>
            <div class="text-[9.5px] mt-0.5 font-bold ${f.finalGradedCount === f.totalBinaan && f.totalBinaan > 0 ? 'text-emerald-600' : (f.finalGradedCount > 0 ? 'text-amber-600' : 'text-rose-500')}">
              ${f.finalGradedCount === f.totalBinaan && f.totalBinaan > 0 ? '✓ Lengkap' : (f.finalGradedCount > 0 ? `Sisa ${f.totalBinaan - f.finalGradedCount} Siswa` : 'Belum Mulai')}
            </div>
          </td>
          <td class="px-2.5 py-2.5 text-center whitespace-nowrap">
            ${pendingBadge}
          </td>
          <td class="px-2.5 py-2.5 text-center whitespace-nowrap">
            ${statusBadge}
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;
  }

  /**
   * Filter Event Handlers untuk Tab 1 (Monitoring Fasil)
   */
  window.filterMonitoringFasilSearch = function(val) {
    state.filterMonitoring.search = val;
    state.monitoringPage = 1;
    renderSubTabMonitoring();
  };

  window.filterMonitoringFasilStatus = function(val) {
    state.filterMonitoring.status = val;
    state.monitoringPage = 1;
    renderSubTabMonitoring();
  };

  window.filterMonitoringFasilQuick = function(statusKey) {
    state.filterMonitoring.status = statusKey;
    state.monitoringPage = 1;
    const selEl = document.getElementById('selFilterMonitoringStatus');
    if (selEl) selEl.value = statusKey;
    renderSubTabMonitoring();
  };

  window.copyUnfinishedFasilToWA = function() {
    const assigned = state.facilitatorStats.filter(f => f.totalBinaan > 0);
    const unfinished = assigned.filter(f => f.statusKinerja !== 'SELESAI');
    
    if (unfinished.length === 0) {
      if (window.FincestemCore && FincestemCore.ui && typeof FincestemCore.ui.toast === 'function') {
        FincestemCore.ui.toast('Alhamdulillah! Seluruh Guru Fasilitator (' + assigned.length + ' guru) sudah 100% menyelesaikan penilaian rapor siswa binaannya.', 'success');
      } else {
        alert('Alhamdulillah! Seluruh Guru Fasilitator (' + assigned.length + ' guru) sudah 100% menyelesaikan penilaian rapor siswa binaannya.');
      }
      return;
    }

    const none = unfinished.filter(f => f.statusKinerja === 'TERTUNDA');
    const partial = unfinished.filter(f => f.statusKinerja === 'PROSES');

    let text = `📢 *PEMBERITAHUAN MONITORING PENILAIAN RAPOR KOKURIKULER FINCESTEM 2026*\n`;
    text += `_Update per: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} Pukul ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB_\n\n`;
    text += `Berikut daftar Bapak/Ibu Guru Fasilitator yang *belum menyelesaikan nilai rapor binaan*:\n\n`;

    if (none.length > 0) {
      text += `🔴 *BELUM MENILAI SAMA SEKALI (${none.length} Guru):*\n`;
      none.forEach((f, i) => {
        text += `${i + 1}. ${f.nama_guru} (${f.classes.join(', ') || '-'}) : 0/${f.totalBinaan} siswa\n`;
      });
      text += `\n`;
    }

    if (partial.length > 0) {
      text += `🟡 *BARU MENILAI SEBAGIAN (${partial.length} Guru):*\n`;
      partial.forEach((f, i) => {
        const sisa = f.totalBinaan - f.finalGradedCount;
        text += `${i + 1}. ${f.nama_guru} (${f.classes.join(', ') || '-'}) : ${f.finalGradedCount}/${f.totalBinaan} siswa (Sisa ${sisa})\n`;
      });
      text += `\n`;
    }

    text += `Mohon Bapak/Ibu Fasilitator dapat segera melengkapi penilaian rapor di portal:\n🔗 https://kokurikulersman1belitang.site/guru/fasilitator.html\n\nTerima kasih atas kerja samanya. 🙏`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.FincestemCore && FincestemCore.ui && typeof FincestemCore.ui.toast === 'function') {
          FincestemCore.ui.toast(`Berhasil menyalin daftar ${unfinished.length} guru belum selesai ke clipboard! Siap dipaste ke WhatsApp.`, 'success');
        } else {
          alert(`Daftar ${unfinished.length} guru belum selesai berhasil disalin ke clipboard! Silakan paste ke WhatsApp.`);
        }
      }).catch(() => {
        prompt('Salin teks rekap berikut:', text);
      });
    } else {
      prompt('Salin teks rekap berikut:', text);
    }
  };

  window.pageMonitoringNext = function() {
    state.monitoringPage++;
    renderSubTabMonitoring();
  };

  window.pageMonitoringPrev = function() {
    state.monitoringPage--;
    renderSubTabMonitoring();
  };

  /**
   * 3. TAB 2: MATRIKS PENILAIAN REAL-TIME (Per Kelas & Per Hari)
   */
  function renderSubTabMatrix() {
    populateMatrixDropdownFilters();

    const container = document.getElementById('tbodyRekapMatrixSiswa');
    const countEl = document.getElementById('lblCountMatrixSiswa');
    const pageEl = document.getElementById('lblPageMatrixSiswa');
    const prevBtn = document.getElementById('btnPrevPageMatrixSiswa');
    const nextBtn = document.getElementById('btnNextPageMatrixSiswa');
    if (!container) return;

    let list = [...state.enrichedStudents];
    const f = state.filterMatrix;

    // Filter Kelas
    if (f.kelas !== 'ALL') {
      list = list.filter(st => st.className === f.kelas);
    }

    // Filter Jalur
    if (f.category !== 'ALL') {
      list = list.filter(st => st.category === f.category);
    }

    // Filter Fasilitator
    if (f.fasil !== 'ALL') {
      list = list.filter(st => st.mentorKey === f.fasil || st.mentorName === f.fasil);
    }

    // Filter Hari Tertentu
    if (f.hari !== 'ALL') {
      const hNum = parseInt(f.hari);
      if (f.status === 'NOT_SUBMITTED') {
        list = list.filter(st => st.days[hNum].status === 'not_submitted');
      } else if (f.status === 'PENDING') {
        list = list.filter(st => st.days[hNum].status === 'pending');
      } else if (f.status === 'GRADED') {
        list = list.filter(st => st.days[hNum].status === 'graded');
      }
    } else {
      // Status Global
      if (f.status === 'NOT_SUBMITTED') {
        list = list.filter(st => st.totalSubmissions === 0);
      } else if (f.status === 'PENDING') {
        list = list.filter(st => st.hasPendingDay);
      } else if (f.status === 'GRADED') {
        list = list.filter(st => st.totalGradedDays > 0);
      }
    }

    // Filter Pencarian NISN / Nama
    if (f.search.trim()) {
      const term = f.search.trim().toLowerCase();
      list = list.filter(st => st.nisn.includes(term) || st.name.toLowerCase().includes(term));
    }

    // Pagination
    const totalItems = list.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.matrixPerPage));
    if (state.matrixPage > totalPages) state.matrixPage = totalPages;
    if (state.matrixPage < 1) state.matrixPage = 1;

    const startIdx = (state.matrixPage - 1) * state.matrixPerPage;
    const paginatedList = list.slice(startIdx, startIdx + state.matrixPerPage);

    if (countEl) countEl.textContent = `Menampilkan ${startIdx + 1} - ${Math.min(startIdx + state.matrixPerPage, totalItems)} dari ${totalItems} Siswa`;
    if (pageEl) pageEl.textContent = `Hal ${state.matrixPage} dari ${totalPages}`;
    if (prevBtn) prevBtn.disabled = (state.matrixPage <= 1);
    if (nextBtn) nextBtn.disabled = (state.matrixPage >= totalPages);

    if (paginatedList.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            <span class="material-symbols-outlined text-4xl mb-2 text-slate-300 block">search_off</span>
            <p class="text-sm font-semibold">Tidak ditemukan siswa dengan kriteria filter tersebut.</p>
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    paginatedList.forEach((st, idx) => {
      const rowNum = startIdx + idx + 1;

      // Badge Jalur
      const trackBadge = st.category === 'FIELD_TRIP'
        ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">Field Trip</span>`
        : `<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-sky-100 text-sky-800 border border-sky-200">Non-FT</span>`;

      // Mini Indicator Day 1 s/d 7
      let daysIndicator = '<div class="flex items-center gap-1.5 flex-wrap">';
      for (let d = 1; d <= 7; d++) {
        const dObj = st.days[d];
        if (dObj.status === 'graded') {
          daysIndicator += `
            <div class="flex flex-col items-center" title="Day ${d}: Nilai ${dObj.score} (${dObj.predicate})">
              <span class="text-[9px] font-bold text-slate-400">D${d}</span>
              <span class="w-6 h-6 rounded-lg bg-emerald-500 text-white font-black text-[10px] flex items-center justify-center shadow-2xs">${dObj.score}</span>
            </div>
          `;
        } else if (dObj.status === 'pending') {
          daysIndicator += `
            <div class="flex flex-col items-center" title="Day ${d}: Sudah kumpul, menunggu dinilai fasil">
              <span class="text-[9px] font-bold text-slate-400">D${d}</span>
              <span class="w-6 h-6 rounded-lg bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center animate-pulse shadow-2xs">⏱</span>
            </div>
          `;
        } else {
          daysIndicator += `
            <div class="flex flex-col items-center" title="Day ${d}: Belum mengerjakan">
              <span class="text-[9px] font-bold text-slate-400">D${d}</span>
              <span class="w-6 h-6 rounded-lg bg-slate-100 text-slate-400 font-bold text-[10px] flex items-center justify-center border border-slate-200">-</span>
            </div>
          `;
        }
      }
      daysIndicator += '</div>';

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="px-4 py-3 text-center text-xs font-semibold text-slate-500">${rowNum}</td>
          <td class="px-4 py-3">
            <div class="font-bold text-slate-800 text-xs sm:text-sm leading-tight">${escapeHtml(st.name)}</div>
            <div class="text-[11px] text-slate-400 font-mono">NISN: ${escapeHtml(st.nisn)}</div>
          </td>
          <td class="px-4 py-3">
            <div class="font-bold text-slate-700 text-xs">${escapeHtml(st.className)}</div>
            <div class="mt-0.5">${trackBadge}</div>
          </td>
          <td class="px-4 py-3">
            <div class="text-xs font-semibold text-slate-800 leading-tight">${escapeHtml(st.mentorName)}</div>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>${st.submissionPct}%</span>
              <span class="text-[10px] text-slate-400 font-normal">(${st.totalSubmissions}/35 tugas)</span>
            </div>
            <div class="w-28 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full bg-[#0875D1] rounded-full transition-all" style="width: ${st.submissionPct}%"></div>
            </div>
          </td>
          <td class="px-4 py-3">
            ${daysIndicator}
          </td>
          <td class="px-4 py-3 text-center text-[11px] text-slate-400">
            ${st.lastActive ? escapeHtml(st.lastActive.slice(0, 16)) : '-'}
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;
  }

  function populateMatrixDropdownFilters() {
    const selKelas = document.getElementById('selRekapMatrixKelas');
    const selFasil = document.getElementById('selRekapMatrixFasil');
    if (!selKelas || selKelas.children.length > 1) return; // Sudah terisi

    // Isi Dropdown Kelas (urut numerik X.1, X.2, ..., X.10, X.11, XI.1, ...)
    const classes = Array.from(new Set(state.enrichedStudents.map(st => st.className))).sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' }));
    classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = `Kelas ${c}`;
      selKelas.appendChild(opt);
    });

    // Isi Dropdown Fasil
    if (selFasil) {
      state.facilitatorStats.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.teacherKey;
        opt.textContent = f.nama_guru;
        selFasil.appendChild(opt);
      });
    }
  }

  window.onMatrixFilterChange = function() {
    const selKelas = document.getElementById('selRekapMatrixKelas');
    const selHari = document.getElementById('selRekapMatrixHari');
    const selFasil = document.getElementById('selRekapMatrixFasil');
    const selCat = document.getElementById('selRekapMatrixCategory');
    const selStat = document.getElementById('selRekapMatrixStatus');
    const inpSearch = document.getElementById('inpRekapMatrixSearch');

    if (selKelas) state.filterMatrix.kelas = selKelas.value;
    if (selHari) state.filterMatrix.hari = selHari.value;
    if (selFasil) state.filterMatrix.fasil = selFasil.value;
    if (selCat) state.filterMatrix.category = selCat.value;
    if (selStat) state.filterMatrix.status = selStat.value;
    if (inpSearch) state.filterMatrix.search = inpSearch.value;

    state.matrixPage = 1;
    renderSubTabMatrix();
  };

  window.pageMatrixNext = function() {
    state.matrixPage++;
    renderSubTabMatrix();
  };

  window.pageMatrixPrev = function() {
    state.matrixPage--;
    renderSubTabMatrix();
  };

  /**
   * 4. TAB 3: REKAP NILAI RAPOR KOKURIKULER (4 Pilar & Predikat Resmi Final)
   */
  function renderSubTabRapor() {
    populateRaporDropdownFilters();

    const container = document.getElementById('tbodyRekapRaporSiswa');
    const countEl = document.getElementById('lblCountRaporSiswa');
    const pageEl = document.getElementById('lblPageRaporSiswa');
    const prevBtn = document.getElementById('btnPrevPageRaporSiswa');
    const nextBtn = document.getElementById('btnNextPageRaporSiswa');
    if (!container) return;

    let list = [...state.enrichedStudents];
    const f = state.filterRapor;

    // Filter Kelas
    if (f.kelas !== 'ALL') {
      list = list.filter(st => st.className === f.kelas);
    }

    // Filter Jalur
    if (f.category !== 'ALL') {
      list = list.filter(st => st.category === f.category);
    }

    // Filter Fasilitator
    if (f.fasil !== 'ALL') {
      list = list.filter(st => st.mentorKey === f.fasil || st.mentorName === f.fasil);
    }

    // Filter Predikat
    if (f.predikat !== 'ALL') {
      if (f.predikat === 'BELUM_ADA') {
        list = list.filter(st => st.finalScore === null);
      } else {
        list = list.filter(st => st.finalPred === f.predikat);
      }
    }

    // Filter Pencarian
    if (f.search.trim()) {
      const term = f.search.trim().toLowerCase();
      list = list.filter(st => st.nisn.includes(term) || st.name.toLowerCase().includes(term));
    }

    // Render Distribusi Predikat Rapor
    let countMahir = 0;
    let countCakap = 0;
    let countBerkembang = 0;
    let countBelum = 0;

    list.forEach(st => {
      if (st.finalPred === 'Mahir') countMahir++;
      else if (st.finalPred === 'Cakap') countCakap++;
      else if (st.finalPred === 'Berkembang') countBerkembang++;
      else countBelum++;
    });

    const elM = document.getElementById('badgeCountRaporMahir');
    const elC = document.getElementById('badgeCountRaporCakap');
    const elB = document.getElementById('badgeCountRaporBerkembang');
    const elPending = document.getElementById('badgeCountRaporPending');

    if (elM) elM.textContent = `${countMahir} Mahir`;
    if (elC) elC.textContent = `${countCakap} Cakap`;
    if (elB) elB.textContent = `${countBerkembang} Berkembang`;
    if (elPending) elPending.textContent = `${countBelum} Belum Dinilai`;

    // Update Executive Summary Bar & Per-Class Download Label
    const totalFiltered = list.length;
    const readyCount = countMahir + countCakap + countBerkembang;
    const readyPct = totalFiltered > 0 ? Math.round((readyCount / totalFiltered) * 100) : 0;

    const elTot = document.getElementById('lblRaporTotalFiltered');
    const elReady = document.getElementById('lblRaporReadyFiltered');
    const elPct = document.getElementById('lblRaporReadyPct');
    const elBtnCsv = document.getElementById('lblBtnExportRaporCsv');

    if (elTot) elTot.textContent = `${totalFiltered} Siswa`;
    if (elReady) elReady.textContent = `${readyCount} Siswa (${countBelum} Menunggu)`;
    if (elPct) elPct.textContent = `${readyPct}%`;
    if (elBtnCsv) elBtnCsv.textContent = f.kelas !== 'ALL' ? `Download Excel (Kelas ${f.kelas})` : 'Download Excel (Semua Kelas)';

    const setBar = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.style.width = (totalFiltered > 0 ? ((count / totalFiltered) * 100).toFixed(1) : 0) + '%';
    };
    setBar('barRaporMahir', countMahir);
    setBar('barRaporCakap', countCakap);
    setBar('barRaporBerkembang', countBerkembang);
    setBar('barRaporPending', countBelum);

    // Pagination
    const totalItems = list.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.raporPerPage));
    if (state.raporPage > totalPages) state.raporPage = totalPages;
    if (state.raporPage < 1) state.raporPage = 1;

    const startIdx = (state.raporPage - 1) * state.raporPerPage;
    const paginatedList = list.slice(startIdx, startIdx + state.raporPerPage);

    if (countEl) countEl.textContent = `Menampilkan ${startIdx + 1} - ${Math.min(startIdx + state.raporPerPage, totalItems)} dari ${totalItems} Siswa`;
    if (pageEl) pageEl.textContent = `Hal ${state.raporPage} dari ${totalPages}`;
    if (prevBtn) prevBtn.disabled = (state.raporPage <= 1);
    if (nextBtn) nextBtn.disabled = (state.raporPage >= totalPages);

    if (paginatedList.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-12 text-slate-400">
            <span class="material-symbols-outlined text-4xl mb-2 text-slate-300 block">search_off</span>
            <p class="text-sm font-semibold">Tidak ditemukan data rapor dengan kriteria filter tersebut.</p>
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    paginatedList.forEach((st, idx) => {
      const rowNum = startIdx + idx + 1;

      // Predikat Badge
      let predBadge = '';
      if (st.finalPred === 'Mahir') {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500 text-white shadow-2xs">🏆 Mahir</span>`;
      } else if (st.finalPred === 'Cakap') {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-sky-500 text-white shadow-2xs">🌟 Cakap</span>`;
      } else if (st.finalPred === 'Berkembang') {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-2xs">🌱 Berkembang</span>`;
      } else {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400 border border-slate-200">⏳ Belum Dinilai</span>`;
      }

      const jalurBadge = st.category === 'FIELD_TRIP'
        ? `<span class="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[9.5px] border border-amber-200">🚌 Field Trip</span>`
        : `<span class="inline-block px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[9.5px] border border-teal-200">🏫 Non-FT</span>`;

      const sourceTag = st.finalSource === 'fasil_final'
        ? `<div class="text-[9.5px] font-bold text-emerald-700 mt-0.5">✓ Disahkan Fasil</div>`
        : (st.finalSource === 'day7'
            ? `<div class="text-[9.5px] font-semibold text-sky-700 mt-0.5">Evaluasi Day 7</div>`
            : (st.finalSource === 'system_ft' ? `<div class="text-[9.5px] font-semibold text-amber-700 mt-0.5">Otomatis FT</div>` : ''));

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="px-3 py-3 text-center text-xs font-semibold text-slate-500">${rowNum}</td>
          <td class="px-3 py-3">
            <div class="font-bold text-slate-800 text-xs sm:text-sm leading-tight">${escapeHtml(st.name)}</div>
            <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span class="text-[10.5px] text-slate-400 font-mono">NISN: ${escapeHtml(st.nisn)}</span>
              ${jalurBadge}
            </div>
          </td>
          <td class="px-3 py-3 text-xs font-bold text-slate-700 whitespace-nowrap">
            ${escapeHtml(st.className)}
          </td>
          <td class="px-3 py-3 text-xs text-slate-700 font-medium max-w-xs truncate">
            ${escapeHtml(st.mentorName)}
          </td>
          <td class="px-3 py-3 text-center font-bold text-xs text-emerald-700">
            ${st.finScore !== null ? st.finScore : '-'}
          </td>
          <td class="px-3 py-3 text-center font-bold text-xs text-indigo-700">
            ${st.culScore !== null ? st.culScore : '-'}
          </td>
          <td class="px-3 py-3 text-center font-bold text-xs text-amber-700">
            ${st.expScore !== null ? st.expScore : '-'}
          </td>
          <td class="px-3 py-3 text-center font-bold text-xs text-cyan-700">
            ${st.stemScore !== null ? st.stemScore : '-'}
          </td>
          <td class="px-3 py-3 text-center">
            ${st.finalScore !== null ? `<span class="font-black text-sm text-[#0875D1]">${st.finalScore}</span>${sourceTag}` : '<span class="text-slate-400 text-xs">-</span>'}
          </td>
          <td class="px-3 py-3 text-center">
            ${predBadge}
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;
  }

  function populateRaporDropdownFilters() {
    const selKelas = document.getElementById('selRekapRaporKelas');
    const selFasil = document.getElementById('selRekapRaporFasil');
    if (!selKelas || selKelas.children.length > 1) return;

    const classes = Array.from(new Set(state.enrichedStudents.map(st => st.className))).sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' }));
    classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = `Kelas ${c}`;
      selKelas.appendChild(opt);
    });

    if (selFasil) {
      state.facilitatorStats.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.teacherKey;
        opt.textContent = f.nama_guru;
        selFasil.appendChild(opt);
      });
    }
  }

  window.onRaporFilterChange = function() {
    const selKelas = document.getElementById('selRekapRaporKelas');
    const selFasil = document.getElementById('selRekapRaporFasil');
    const selCat = document.getElementById('selRekapRaporCategory');
    const selPred = document.getElementById('selRekapRaporPredikat');
    const inpSearch = document.getElementById('inpRekapRaporSearch');

    if (selKelas) state.filterRapor.kelas = selKelas.value;
    if (selFasil) state.filterRapor.fasil = selFasil.value;
    if (selCat) state.filterRapor.category = selCat.value;
    if (selPred) state.filterRapor.predikat = selPred.value;
    if (inpSearch) state.filterRapor.search = inpSearch.value;

    state.raporPage = 1;
    renderSubTabRapor();
  };

  window.pageRaporNext = function() {
    state.raporPage++;
    renderSubTabRapor();
  };

  window.pageRaporPrev = function() {
    state.raporPage--;
    renderSubTabRapor();
  };

  /**
   * 5. MODAL: LIHAT SISWA BELUM DINILAI (Antrean Fasil) & Salin Pengingat WA
   */
  window.openModalAntreanFasil = function(teacherKey) {
    state.modalFasilKey = teacherKey;
    const fasil = state.facilitatorStats.find(f => f.teacherKey === teacherKey);
    if (!fasil) return;

    const modal = document.getElementById('modalAntreanPenilaianFasil');
    const titleEl = document.getElementById('lblModalAntreanFasilName');
    const bodyEl = document.getElementById('tbodyModalAntreanSiswa');
    const countEl = document.getElementById('lblModalAntreanCount');
    if (!modal || !bodyEl) return;

    if (titleEl) titleEl.textContent = fasil.nama_guru;
    if (countEl) countEl.textContent = `${fasil.pendingCount} Siswa Menunggu Penilaian`;

    if (fasil.pendingStudents.length === 0) {
      bodyEl.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-8 text-emerald-600 font-bold text-xs">
            Tidak ada antrean penilaian. Semua tugas siswa binaan telah dinilai!
          </td>
        </tr>
      `;
    } else {
      let html = '';
      fasil.pendingStudents.forEach((st, i) => {
        // Cari hari mana saja yang pending
        const pendingDays = [];
        for (let d = 1; d <= 7; d++) {
          if (st.days[d].status === 'pending') {
            pendingDays.push(`Day ${d}`);
          }
        }

        html += `
          <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
            <td class="px-3 py-2.5 text-center text-slate-500 font-semibold">${i + 1}</td>
            <td class="px-3 py-2.5 font-bold text-slate-800">${escapeHtml(st.name)}</td>
            <td class="px-3 py-2.5 text-slate-600 font-mono">${escapeHtml(st.nisn)}</td>
            <td class="px-3 py-2.5 font-semibold text-slate-700">${escapeHtml(st.className)}</td>
            <td class="px-3 py-2.5">
              <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-200">
                ${pendingDays.join(', ')}
              </span>
            </td>
          </tr>
        `;
      });
      bodyEl.innerHTML = html;
    }

    modal.classList.remove('hidden');
  };

  window.closeModalAntreanFasil = function() {
    const modal = document.getElementById('modalAntreanPenilaianFasil');
    if (modal) modal.classList.add('hidden');
  };

  /**
   * Salin template pesan WhatsApp pengingat untuk fasilitator
   */
  window.copyReminderWaFasil = function() {
    if (!state.modalFasilKey) return;
    const fasil = state.facilitatorStats.find(f => f.teacherKey === state.modalFasilKey);
    if (!fasil || fasil.pendingStudents.length === 0) {
      alert('Tidak ada siswa yang menunggu penilaian untuk guru ini.');
      return;
    }

    const studentNames = fasil.pendingStudents.map((st, i) => `${i + 1}. ${st.name} (${st.className})`).join('\n');
    const msg = `*PEMBERITAHUAN KOORDINATOR KOKURIKULER SMAN 1 BELITANG 2026*\n\nYth. Bapak/Ibu Fasilitator: *${fasil.nama_guru}*\n\nMohon bantuannya untuk memeriksa dan memberikan evaluasi nilai harian/rapor bagi siswa binaan Anda berikut yang telah mengumpulkan tugas:\n\n${studentNames}\n\nSilakan login ke portal Fasilitator: https://kokurikulersman1belitang.site/guru/fasilitator.html\n\nTerima kasih atas dedikasi dan kerja samanya! 🙏`;

    navigator.clipboard.writeText(msg).then(() => {
      alert('Template pesan pengingat WhatsApp berhasil disalin ke clipboard! Silakan paste langsung ke chat WA guru bersangkutan.');
    }).catch(err => {
      alert('Gagal menyalin otomatis: ' + err);
    });
  };

  /**
   * 6. EKSPOR EXCEL / CSV REKAP RAPOR KOKURIKULER (UTF-8 BOM)
   */
  window.exportRekapRaporCSV = function() {
    let list = [...state.enrichedStudents];
    const f = state.filterRapor;

    if (f.kelas !== 'ALL') list = list.filter(st => st.className === f.kelas);
    if (f.category !== 'ALL') list = list.filter(st => st.category === f.category);
    if (f.fasil !== 'ALL') list = list.filter(st => st.mentorKey === f.fasil || st.mentorName === f.fasil);
    if (f.predikat !== 'ALL') {
      if (f.predikat === 'BELUM_ADA') list = list.filter(st => st.finalScore === null);
      else list = list.filter(st => st.finalPred === f.predikat);
    }
    if (f.search.trim()) {
      const term = f.search.trim().toLowerCase();
      list = list.filter(st => st.nisn.includes(term) || st.name.toLowerCase().includes(term));
    }

    if (list.length === 0) {
      alert('Tidak ada data rapor untuk diekspor!');
      return;
    }

    let csv = '\uFEFF'; // UTF-8 BOM agar Excel membaca rapi tanpa error encoding
    csv += 'No,NISN,Nama Siswa,Kelas,Jalur,Guru Fasilitator,Skor Finansial,Skor Budaya,Skor Eksplorasi,Skor STEM,Nilai Akhir Rapor,Predikat Rapor,Status Pengesahan,Narasi Rapor\n';

    list.forEach((st, idx) => {
      const statusTxt = st.finalSource === 'fasil_final' ? 'Disahkan Fasilitator' : (st.finalSource === 'day7' ? 'Evaluasi Day 7' : (st.finalSource === 'system_ft' ? 'Otomatis FT' : 'Belum Dinilai'));
      const row = [
        idx + 1,
        `"${st.nisn}"`,
        `"${st.name.replace(/"/g, '""')}"`,
        `"${st.className}"`,
        `"${st.category}"`,
        `"${st.mentorName.replace(/"/g, '""')}"`,
        st.finScore !== null ? st.finScore : '',
        st.culScore !== null ? st.culScore : '',
        st.expScore !== null ? st.expScore : '',
        st.stemScore !== null ? st.stemScore : '',
        st.finalScore !== null ? st.finalScore : '',
        `"${st.finalPred || 'Belum Ada'}"`,
        `"${statusTxt}"`,
        `"${(st.finalNotes || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
      ];
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filterDesc = f.kelas !== 'ALL' ? `_${f.kelas}` : '_Semua_Kelas';
    a.download = `Rekap_Nilai_Rapor_Kokurikuler_2026${filterDesc}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * 7. CETAK RESMI LEMBAR REKAP RAPOR KOKURIKULER (A4 Landscape dengan Kop Sekolah)
   */
  window.printRekapRaporKokurikuler = function() {
    let list = [...state.enrichedStudents];
    const f = state.filterRapor;

    if (f.kelas !== 'ALL') list = list.filter(st => st.className === f.kelas);
    if (f.category !== 'ALL') list = list.filter(st => st.category === f.category);
    if (f.fasil !== 'ALL') list = list.filter(st => st.mentorKey === f.fasil || st.mentorName === f.fasil);
    if (f.predikat !== 'ALL') {
      if (f.predikat === 'BELUM_ADA') list = list.filter(st => st.finalScore === null);
      else list = list.filter(st => st.finalPred === f.predikat);
    }
    if (f.search.trim()) {
      const term = f.search.trim().toLowerCase();
      list = list.filter(st => st.nisn.includes(term) || st.name.toLowerCase().includes(term));
    }

    if (list.length === 0) {
      alert('Tidak ada data rapor untuk dicetak.');
      return;
    }

    const titleFilter = f.kelas !== 'ALL' ? `Kelas ${f.kelas}` : 'Seluruh Siswa (Kelas X, XI, XII)';

    // Buka jendela print baru dengan format A4 Landscape profesional
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up terblokir! Izinkan pop-up peramban Anda untuk mencetak rekap.');
      return;
    }

    const rowsHtml = list.map((st, i) => `
      <tr style="border-bottom: 1px solid #cbd5e1;">
        <td style="padding: 5px; text-align: center; font-size: 11px;">${i + 1}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-family: monospace;">${escapeHtml(st.nisn)}</td>
        <td style="padding: 5px; font-size: 11px; font-weight: bold;">${escapeHtml(st.name)}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px;">${escapeHtml(st.className)}</td>
        <td style="padding: 5px; font-size: 10px;">${escapeHtml(st.mentorName)}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.finScore !== null ? st.finScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.culScore !== null ? st.culScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.expScore !== null ? st.expScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.stemScore !== null ? st.stemScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 12px; font-weight: bold; color: #0875D1;">${st.finalScore !== null ? st.finalScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${escapeHtml(st.finalPred || 'Belum Ada')}</td>
      </tr>
    `).join('');

    const printContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Rekapitulasi Nilai Rapor Kokurikuler 2026 - ${titleFilter}</title>
        <style>
          @page { size: A4 landscape; margin: 12mm 15mm; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; margin: 0; padding: 0; }
          .kop-surat { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 12px; }
          .kop-logo { width: 65px; height: 65px; object-fit: contain; margin-right: 15px; }
          .kop-text { flex: 1; text-align: center; }
          .kop-text h3 { margin: 0; font-size: 12px; font-weight: bold; letter-spacing: 0.5px; }
          .kop-text h2 { margin: 2px 0; font-size: 15px; font-weight: 900; letter-spacing: 1px; }
          .kop-text h1 { margin: 2px 0; font-size: 17px; font-weight: 900; color: #0875D1; }
          .kop-text p { margin: 0; font-size: 10px; color: #475569; }
          .table-rekap { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .table-rekap th { background-color: #f1f5f9; border: 1px solid #94a3b8; padding: 6px 4px; font-size: 11px; font-weight: bold; text-align: center; }
          .table-rekap td { border: 1px solid #cbd5e1; }
          .ttd-container { margin-top: 25px; display: flex; justify-content: space-between; page-break-inside: avoid; }
          .ttd-box { width: 260px; text-align: center; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="kop-surat">
          <img src="../aset/logo.png" class="kop-logo" onerror="this.style.display='none'">
          <div class="kop-text">
            <h3>PEMERINTAH PROVINSI SUMATERA SELATAN</h3>
            <h3>DINAS PENDIDIKAN</h3>
            <h2>SMA NEGERI 1 BELITANG</h2>
            <p>Jalan Kolonel Dani Effendi, Gumawang, Kec. Belitang, Kab. OKU Timur, Sumatera Selatan 32182</p>
            <p>Laman: kokurikulersman1belitang.site | Surel: sman1belitang@gmail.com</p>
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 14px; text-transform: uppercase; font-weight: 900;">REKAPITULASI NILAI RAPOR KOKURIKULER FINCESTEM 2026</h3>
          <p style="margin: 2px 0 0 0; font-size: 11px; color: #475569;">Target Evaluasi: <strong>${titleFilter}</strong> | Dicetak pada: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <table class="table-rekap">
          <thead>
            <tr>
              <th rowspan="2" style="width: 30px;">No</th>
              <th rowspan="2" style="width: 85px;">NISN</th>
              <th rowspan="2">Nama Peserta Didik</th>
              <th rowspan="2" style="width: 55px;">Kelas</th>
              <th rowspan="2" style="width: 140px;">Guru Fasilitator</th>
              <th colspan="4">Skor Dimensi Pilar Kokurikuler</th>
              <th rowspan="2" style="width: 60px;">Nilai Akhir</th>
              <th rowspan="2" style="width: 80px;">Predikat</th>
            </tr>
            <tr>
              <th style="width: 45px;">Finansial</th>
              <th style="width: 45px;">Budaya</th>
              <th style="width: 45px;">Eksplorasi</th>
              <th style="width: 45px;">STEM</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="ttd-container">
          <div class="ttd-box">
            <p style="margin-bottom: 60px;">Koordinator Program Kokurikuler,</p>
            <p style="font-weight: bold; text-decoration: underline; margin: 0;">TIM KOORDINATOR FINCESTEM</p>
            <p style="margin: 0;">SMAN 1 Belitang</p>
          </div>
          <div class="ttd-box">
            <p style="margin-bottom: 60px;">Belitang, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>Kepala SMAN 1 Belitang,</p>
            <p style="font-weight: bold; text-decoration: underline; margin: 0;">H. PRIOYONO, S.Pd., M.M.</p>
            <p style="margin: 0;">NIP. 19710608 199702 1 002</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Ekspos ke window
  window.initAdminRekapPenilaian = initAdminRekapPenilaian;
  window.FincestemAdminRekapPenilaian = {
    init: initAdminRekapPenilaian,
    refresh: function() {
      if (window.FincestemMentorship && typeof window.FincestemMentorship.syncFromServer === 'function') {
        window.FincestemMentorship.syncFromServer(function() {
          fetchRekapDataFromServer();
        });
      } else {
        fetchRekapDataFromServer();
      }
    },
    getState: function() { return state; }
  };

})(window);
