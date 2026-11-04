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
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
      return window.FincestemMentorship.getAssignmentsMap();
    }
    return {};
  }

  /**
   * Inisialisasi Modul & Sinkronisasi Pertama Kali
   */
  function initAdminRekapPenilaian(forceRefresh) {
    if (state.isLoaded && !forceRefresh) {
      renderAllViews();
      return;
    }
    fetchRekapDataFromServer();
  }

  /**
   * Tarik data rekapitulasi penilaian dari backend secara real-time
   */
  function fetchRekapDataFromServer(callback) {
    state.isLoading = true;
    updateSyncButtonState(true);

    fetch('../api/progress.php?action=admin_recap')
      .then(res => res.json())
      .then(json => {
        state.isLoading = false;
        updateSyncButtonState(false);

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
          state.lastSyncTime = new Date();
          state.isLoaded = true;

          processEnrichedData();
          renderAllViews();
          if (typeof callback === 'function') callback(true);
        } else {
          // Fallback jika API gagal atau kosong
          processEnrichedData();
          renderAllViews();
          if (typeof callback === 'function') callback(false);
        }
      })
      .catch(err => {
        console.warn('[AdminRekapPenilaian] Gagal menarik data backend, menggunakan fallback:', err);
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
  function processEnrichedData() {
    const students = getMasterStudents();
    const teachers = getMasterTeachers();
    const assignMap = getAssignmentsMap();

    // Buat index pencarian fasilitator berdasarkan NISN siswa
    const studentToMentorMap = {};
    Object.keys(assignMap).forEach(teacherKey => {
      const entry = assignMap[teacherKey];
      if (entry && Array.isArray(entry.student_nisns)) {
        const teacherName = (entry.teacher && entry.teacher.nama_guru) || teacherKey;
        entry.student_nisns.forEach(nisn => {
          studentToMentorMap[String(nisn).trim()] = {
            teacherKey: teacherKey,
            teacherName: teacherName,
            teacher: entry.teacher
          };
        });
      }
    });

    // 1. Perkaya data setiap siswa
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
        const dRec = state.serverDays[`${nisn}_${d}`] || null;
        let dayStatus = 'not_submitted'; // 'not_submitted', 'pending', 'graded'
        let dayScore = null;
        let dayPred = null;

        if (dRec) {
          if (dRec.score !== null && dRec.score !== undefined && dRec.score !== '') {
            dayStatus = 'graded';
            dayScore = parseFloat(dRec.score);
            dayPred = dRec.predicate || (dayScore >= 85 ? 'Mahir' : (dayScore >= 70 ? 'Cakap' : 'Berkembang'));
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

      // Rapor Akhir Day 7
      const day7 = days[7];
      let finalScore = null;
      let finalPred = null;
      let finScore = null;
      let culScore = null;
      let expScore = null;
      let stemScore = null;

      if (day7 && day7.status === 'graded') {
        finalScore = day7.score;
        finalPred = day7.predicate;
        if (day7.record) {
          finScore = day7.record.fin !== null ? parseFloat(day7.record.fin) : finalScore;
          culScore = day7.record.cul !== null ? parseFloat(day7.record.cul) : finalScore;
          expScore = day7.record.exp !== null ? parseFloat(day7.record.exp) : finalScore;
          stemScore = day7.record.stem !== null ? parseFloat(day7.record.stem) : finalScore;
        }
      } else if (st.category === 'FIELD_TRIP' && totalGradedDays >= 7) {
        // Field Trip auto calc jika tuntas
        finalScore = 95.0;
        finalPred = 'Mahir';
        finScore = 95; culScore = 95; expScore = 95; stemScore = 95;
      }

      return {
        nisn: nisn,
        name: st.name || st.nama || '-',
        className: st.class_name || st.kelas || '-',
        category: (st.category || '').toUpperCase().includes('FIELD_TRIP') ? 'FIELD_TRIP' : 'NON_FIELD_TRIP',
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
        finScore: finScore,
        culScore: culScore,
        expScore: expScore,
        stemScore: stemScore,
        lastActive: srvSumm ? srvSumm.last_active : null
      };
    });
    state.enrichedStudents = enriched;

    // 2. Kalkulasi Metrik Kinerja Setiap Guru Fasilitator (116 Guru)
    const fasilMetrics = teachers.map((tc, idx) => {
      const tKey = String(tc.kode_guru || tc.username || tc.nama_guru).trim();
      const assignment = assignMap[tKey] || null;
      const assignedNisns = (assignment && Array.isArray(assignment.student_nisns)) ? assignment.student_nisns.map(n => String(n).trim()) : [];
      const assignedClasses = (assignment && Array.isArray(assignment.classes)) ? assignment.classes : [];

      // Dapatkan data siswa binaan guru ini
      const binaanStudents = enriched.filter(st => assignedNisns.includes(st.nisn));
      const totalBinaan = binaanStudents.length;

      // Siswa yang sudah mengumpulkan setidaknya 1 tugas
      const submittedStudents = binaanStudents.filter(st => st.totalSubmissions > 0);
      const submittedCount = submittedStudents.length;
      const submittedPct = totalBinaan > 0 ? Math.round((submittedCount / totalBinaan) * 100) : 0;

      // Siswa yang sudah dinilai fasil (setidaknya 1 hari atau Day 7)
      const gradedStudents = binaanStudents.filter(st => st.totalGradedDays > 0);
      const gradedCount = gradedStudents.length;
      const gradedPct = totalBinaan > 0 ? Math.round((gradedCount / totalBinaan) * 100) : 0;

      // Siswa yang sudah mengumpulkan tugas namun BELUM DINILAI fasil (Antrean)
      const pendingStudents = binaanStudents.filter(st => st.hasPendingDay);
      const pendingCount = pendingStudents.length;

      // Siswa yang tuntas Day 7
      const day7DoneCount = binaanStudents.filter(st => st.finalScore !== null).length;

      // Tentukan status kinerja guru
      let statusKinerja = 'TERTUNDA';
      let statusLabel = 'Belum Ada Penilaian';
      let statusColor = 'rose';

      if (totalBinaan === 0) {
        statusKinerja = 'NON_AKTIF';
        statusLabel = 'Tanpa Siswa Binaan';
        statusColor = 'slate';
      } else if (gradedCount === totalBinaan && pendingCount === 0) {
        statusKinerja = 'SELESAI';
        statusLabel = 'Tuntas 100%';
        statusColor = 'emerald';
      } else if (gradedCount > 0 || submittedCount > 0) {
        statusKinerja = 'PROSES';
        statusLabel = pendingCount > 0 ? `${pendingCount} Menunggu Dinilai` : 'Aktif Menilai';
        statusColor = pendingCount > 0 ? 'amber' : 'sky';
      }

      return {
        no: idx + 1,
        teacherKey: tKey,
        nama_guru: tc.nama_guru || '-',
        nip: tc.nip || '-',
        classes: assignedClasses,
        totalBinaan: totalBinaan,
        submittedCount: submittedCount,
        submittedPct: submittedPct,
        gradedCount: gradedCount,
        gradedPct: gradedPct,
        pendingCount: pendingCount,
        pendingStudents: pendingStudents,
        day7DoneCount: day7DoneCount,
        statusKinerja: statusKinerja,
        statusLabel: statusLabel,
        statusColor: statusColor
      };
    });
    state.facilitatorStats = fasilMetrics;
  }

  /**
   * Render seluruh bagian UI Rekap Penilaian & Rapor
   */
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
    let totalGradedStudents = 0;
    let totalPendingQueue = 0;
    let totalRaporDay7Done = 0;

    state.facilitatorStats.forEach(f => {
      totalAssignedStudents += f.totalBinaan;
      totalGradedStudents += f.gradedCount;
      totalPendingQueue += f.pendingCount;
      totalRaporDay7Done += f.day7DoneCount;
    });

    const avgFasilGrading = totalAssignedStudents > 0 ? Math.round((totalGradedStudents / totalAssignedStudents) * 100) : 0;

    // Update Elemen di UI
    const elTotStud = document.getElementById('kpiRekapTotalStudents');
    const elAvgProg = document.getElementById('kpiRekapAvgProgress');
    const elAvgFasil = document.getElementById('kpiRekapFasilDone');
    const elPending = document.getElementById('kpiRekapPendingGrading');
    const elRaporDone = document.getElementById('kpiRekapRaporReady');
    const elSyncTime = document.getElementById('lblRekapLastSyncTime');

    if (elTotStud) elTotStud.textContent = totalStudents.toLocaleString('id-ID');
    if (elAvgProg) elAvgProg.textContent = `${avgStudentProgress}%`;
    if (elAvgFasil) elAvgFasil.textContent = `${avgFasilGrading}% (${totalGradedStudents}/${totalAssignedStudents})`;
    if (elPending) {
      elPending.textContent = totalPendingQueue;
      if (totalPendingQueue > 0) {
        elPending.parentElement.classList.add('text-amber-600');
      } else {
        elPending.parentElement.classList.remove('text-amber-600');
      }
    }
    if (elRaporDone) elRaporDone.textContent = `${totalRaporDay7Done} Siswa`;

    if (elSyncTime) {
      const nowStr = state.lastSyncTime ? state.lastSyncTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB' : 'Baru saja';
      elSyncTime.textContent = `Sinkron Terakhir: ${nowStr}`;
    }
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

    // Filter Status Kinerja
    if (stFilter !== 'ALL') {
      if (stFilter === 'COMPLETE') list = list.filter(f => f.statusKinerja === 'SELESAI');
      else if (stFilter === 'ACTIVE') list = list.filter(f => f.statusKinerja === 'PROSES');
      else if (stFilter === 'PENDING') list = list.filter(f => f.pendingCount > 0);
      else if (stFilter === 'NONE') list = list.filter(f => f.statusKinerja === 'TERTUNDA');
    }

    if (countEl) countEl.textContent = `Menampilkan ${list.length} dari ${state.facilitatorStats.length} Fasilitator`;

    if (list.length === 0) {
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
    list.forEach((f, idx) => {
      const classBadges = f.classes.length > 0 
        ? f.classes.map(c => `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 mr-1 mb-1">${escapeHtml(c)}</span>`).join('')
        : '<span class="text-slate-400 text-xs italic">Belum diplot</span>';

      // Badge Antrean Belum Dinilai
      let pendingBadge = '';
      if (f.pendingCount > 0) {
        pendingBadge = `
          <button onclick="openModalAntreanFasil('${escapeHtml(f.teacherKey)}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer shadow-2xs" title="Klik untuk lihat nama siswa yang belum dinilai">
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>${f.pendingCount} Menunggu</span>
            <span class="material-symbols-outlined text-xs">visibility</span>
          </button>
        `;
      } else {
        pendingBadge = `<span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <span class="material-symbols-outlined text-xs">check_circle</span> 0 Antrean
        </span>`;
      }

      // Status Badge
      let statusBadge = '';
      if (f.statusKinerja === 'SELESAI') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500 text-white shadow-2xs">Tuntas 100%</span>`;
      } else if (f.statusKinerja === 'PROSES') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-sky-500 text-white shadow-2xs">Aktif Menilai</span>`;
      } else if (f.statusKinerja === 'TERTUNDA') {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-500 text-white shadow-2xs">Belum Ada Nilai</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-600">Non-Aktif</span>`;
      }

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="px-4 py-3 text-center text-xs font-semibold text-slate-500">${idx + 1}</td>
          <td class="px-4 py-3">
            <div class="font-bold text-slate-800 text-xs sm:text-sm leading-tight">${escapeHtml(f.nama_guru)}</div>
            <div class="text-[11px] text-slate-400 font-medium">NIP: ${escapeHtml(f.nip)}</div>
          </td>
          <td class="px-4 py-3 max-w-xs">
            ${classBadges}
          </td>
          <td class="px-4 py-3 text-center">
            <span class="inline-block px-2.5 py-1 rounded-xl text-xs font-extrabold bg-blue-50 text-[#0875D1] border border-blue-200">
              ${f.totalBinaan} Siswa
            </span>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>${f.submittedPct}%</span>
              <span class="text-[10px] text-slate-400 font-normal">(${f.submittedCount}/${f.totalBinaan})</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full transition-all" style="width: ${f.submittedPct}%"></div>
            </div>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>${f.gradedPct}%</span>
              <span class="text-[10px] text-slate-400 font-normal">(${f.gradedCount}/${f.totalBinaan})</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full transition-all" style="width: ${f.gradedPct}%"></div>
            </div>
          </td>
          <td class="px-4 py-3 text-center">
            ${pendingBadge}
          </td>
          <td class="px-4 py-3 text-center">
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
    renderSubTabMonitoring();
  };

  window.filterMonitoringFasilStatus = function(val) {
    state.filterMonitoring.status = val;
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

    // Isi Dropdown Kelas
    const classes = Array.from(new Set(state.enrichedStudents.map(st => st.className))).sort();
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
    if (elPending) elPending.textContent = `${countBelum} Menunggu Day 7`;

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
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500 text-white shadow-2xs">Mahir</span>`;
      } else if (st.finalPred === 'Cakap') {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-sky-500 text-white shadow-2xs">Cakap</span>`;
      } else if (st.finalPred === 'Berkembang') {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-white shadow-2xs">Berkembang</span>`;
      } else {
        predBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400 border border-slate-200">Menunggu Day 7</span>`;
      }

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="px-4 py-3 text-center text-xs font-semibold text-slate-500">${rowNum}</td>
          <td class="px-4 py-3">
            <div class="font-bold text-slate-800 text-xs sm:text-sm leading-tight">${escapeHtml(st.name)}</div>
            <div class="text-[11px] text-slate-400 font-mono">NISN: ${escapeHtml(st.nisn)}</div>
          </td>
          <td class="px-4 py-3 text-xs font-bold text-slate-700">
            ${escapeHtml(st.className)}
          </td>
          <td class="px-4 py-3 text-xs text-slate-700 font-medium max-w-xs truncate">
            ${escapeHtml(st.mentorName)}
          </td>
          <td class="px-4 py-3 text-center font-bold text-xs text-emerald-700">
            ${st.finScore !== null ? st.finScore : '-'}
          </td>
          <td class="px-4 py-3 text-center font-bold text-xs text-indigo-700">
            ${st.culScore !== null ? st.culScore : '-'}
          </td>
          <td class="px-4 py-3 text-center font-bold text-xs text-amber-700">
            ${st.expScore !== null ? st.expScore : '-'}
          </td>
          <td class="px-4 py-3 text-center font-bold text-xs text-cyan-700">
            ${st.stemScore !== null ? st.stemScore : '-'}
          </td>
          <td class="px-4 py-3 text-center">
            ${st.finalScore !== null ? `<span class="font-black text-sm text-[#0875D1]">${st.finalScore}</span>` : '<span class="text-slate-400 text-xs">-</span>'}
          </td>
          <td class="px-4 py-3 text-center">
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

    const classes = Array.from(new Set(state.enrichedStudents.map(st => st.className))).sort();
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
    csv += 'No,NISN,Nama Siswa,Kelas,Jalur,Guru Fasilitator,Skor Finansial,Skor Budaya,Skor Eksplorasi,Skor STEM,Nilai Akhir Rapor,Predikat Rapor\n';

    list.forEach((st, idx) => {
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
        `"${st.finalPred || 'Belum Ada'}"`
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
    refresh: function() { fetchRekapDataFromServer(); },
    getState: function() { return state; }
  };

})(window);
