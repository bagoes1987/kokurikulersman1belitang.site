/**
 * FINCESTEM 2026 - MODUL UI ADMIN PEMBAGIAN SISWA BINAAN
 * File: js/modules/admin-mentorship.js
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
  if (!window.escapeHtml) {
    window.escapeHtml = escapeHtml;
  }

  let currentSubTab = 'allstudents'; // 'allstudents', 'plotting', atau 'teachers'
  let selectedTeacherKey = null;
  let modalSelectedNisns = new Set();
  let studentModalFilter = {
    grade: 'ALL',
    rombel: 'ALL',
    category: 'UNASSIGNED', // 'ALL', 'FIELD_TRIP', 'NON_FIELD_TRIP', 'UNASSIGNED'
    search: ''
  };

  // State Sub-Tab 1: Rekap Status Siswa (Belum vs Sudah Ada Fasil)
  let mentorAllStudentsFilter = {
    status: 'ALL',       // 'ALL', 'UNASSIGNED', 'ASSIGNED'
    category: 'ALL',     // 'ALL', 'FIELD_TRIP', 'NON_FIELD_TRIP'
    grade: 'ALL',        // 'ALL', 'X', 'XI', 'XII'
    rombel: 'ALL',
    search: ''
  };
  let mentorAllCurrentPage = 1;
  let mentorAllPerPage = 100;
  let mentorBatchSelectedNisns = new Set();
  let targetQuickAssignNisns = [];

  let mentorshipSyncTimer = null;

  window.initAdminMentorshipView = function() {
    renderMentorshipStats();
    switchMentorshipSubTab(currentSubTab);
    if (window.FincestemMentorship && typeof window.FincestemMentorship.syncFromServer === 'function') {
      window.FincestemMentorship.syncFromServer(function(changed) {
        if (changed) {
          renderMentorshipStats();
          switchMentorshipSubTab(currentSubTab);
        }
      });
    }
    if (!mentorshipSyncTimer) {
      mentorshipSyncTimer = setInterval(function() {
        const panel = document.getElementById('panelAdminMentorship');
        const modal = document.getElementById('modalAssignStudents');
        const modalQuick = document.getElementById('modalQuickAssignTeacherSingleOrBatch');
        const isModalOpen = (modal && !modal.classList.contains('hidden')) || (modalQuick && !modalQuick.classList.contains('hidden'));
        if (panel && !panel.classList.contains('hidden') && !document.hidden && !isModalOpen) {
          if (window.FincestemMentorship && typeof window.FincestemMentorship.syncFromServer === 'function') {
            window.FincestemMentorship.syncFromServer(function(changed) {
              if (changed) {
                renderMentorshipStats();
                switchMentorshipSubTab(currentSubTab);
              }
            });
          }
        }
      }, 15000);
    }
  };

  window.syncMentorshipMultiPCNow = function() {
    if (!window.FincestemMentorship) return;
    const lbl = document.getElementById('lblSyncMentorshipBtn');
    const lblTop = document.getElementById('lblTopSyncMentorshipBtn');
    if (lbl) lbl.textContent = 'Menyinkronkan...';
    if (lblTop) lblTop.textContent = 'Menyinkronkan...';

    if (window.FincestemCore && FincestemCore.zones && typeof FincestemCore.zones.syncZones === 'function') {
      FincestemCore.zones.syncZones();
    }

    // Tarik dan gabungkan data antar-PC dari server secara aman & responsif tanpa membekukan browser
    window.FincestemMentorship.syncFromServer(function(changed) {
      if (lbl) lbl.textContent = 'Sinkronkan Server (Multi-PC)';
      if (lblTop) lblTop.textContent = 'Sinkronkan Server (Multi-PC)';

      // Perbarui UI secara non-blocking di frame berikutnya
      requestAnimationFrame(function() {
        renderMentorshipStats();
        switchMentorshipSubTab(currentSubTab);

        // Hanya perbarui tab lain JIKA tab tersebut sedang aktif terbuka di layar
        const pStudents = document.getElementById('panelAdminStudents');
        if (pStudents && !pStudents.classList.contains('hidden')) {
          if (typeof applyStudentFilters === 'function') applyStudentFilters();
        }
        const pMatrix = document.getElementById('panelAdminMatrix');
        if (pMatrix && !pMatrix.classList.contains('hidden')) {
          if (typeof window.renderAdminMatrixView === 'function') window.renderAdminMatrixView();
        }
        const pCards = document.getElementById('panelAdminCards');
        if (pCards && !pCards.classList.contains('hidden')) {
          if (typeof window.renderAdminCards === 'function') window.renderAdminCards();
        }
        const pRekap = document.getElementById('panelAdminRekap');
        if (pRekap && !pRekap.classList.contains('hidden')) {
          if (typeof window.renderAdminRekapView === 'function') window.renderAdminRekapView();
        }
      });

      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Data Pembagian Siswa Binaan berhasil disinkronkan antar-PC!', 'success');
      }
    });
  };

  window.switchMentorshipSubTab = function(tab) {
    currentSubTab = tab;
    const btnAll = document.getElementById('btnSubTabMentor_allstudents');
    const btnPlot = document.getElementById('btnSubTabMentor_plotting');
    const btnRekap = document.getElementById('btnSubTabMentor_rekap_fasil');
    const btnTeach = document.getElementById('btnSubTabMentor_teachers');
    const viewAll = document.getElementById('subviewMentor_allstudents');
    const viewPlot = document.getElementById('subviewMentor_plotting');
    const viewRekap = document.getElementById('subviewMentor_rekap_fasil');
    const viewTeach = document.getElementById('subviewMentor_teachers');

    const activeBtnClass = 'flex-1 py-2.5 px-3 text-xs font-bold rounded-xl bg-[#0875D1] text-white shadow-xs transition-all cursor-pointer';
    const inactiveBtnClass = 'flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer';

    if (btnAll) btnAll.className = (tab === 'allstudents') ? activeBtnClass : inactiveBtnClass;
    if (btnPlot) btnPlot.className = (tab === 'plotting') ? activeBtnClass : inactiveBtnClass;
    if (btnRekap) btnRekap.className = (tab === 'rekap_fasil') ? activeBtnClass : inactiveBtnClass;
    if (btnTeach) btnTeach.className = (tab === 'teachers') ? activeBtnClass : inactiveBtnClass;

    if (viewAll) viewAll.classList.toggle('hidden', tab !== 'allstudents');
    if (viewPlot) viewPlot.classList.toggle('hidden', tab !== 'plotting');
    if (viewRekap) viewRekap.classList.toggle('hidden', tab !== 'rekap_fasil');
    if (viewTeach) viewTeach.classList.toggle('hidden', tab !== 'teachers');

    if (tab === 'allstudents') {
      renderAllStudentsMentorshipView();
    } else if (tab === 'plotting') {
      renderPlottingView();
    } else if (tab === 'rekap_fasil') {
      renderRekapFasilView();
    } else if (tab === 'teachers') {
      renderTeachersListView();
    }
  };

  /**
   * RENDER STATISTIK KPI RINGKASAN & FILTER COUNTERS
   */
  function renderMentorshipStats() {
    if (!window.FincestemMentorship) return;
    const stats = window.FincestemMentorship.getSummaryStats();

    // Kartu 1: Field Trip
    const elFtTotal = document.getElementById('mentorStat_ftTotal');
    const elFtAssigned = document.getElementById('mentorStat_ftAssigned');
    const elFtUnassigned = document.getElementById('mentorStat_ftUnassigned');
    if (elFtTotal) elFtTotal.textContent = `${stats.ftTotal} Siswa`;
    if (elFtAssigned) elFtAssigned.textContent = `${stats.ftAssigned} Siswa`;
    if (elFtUnassigned) elFtUnassigned.textContent = `${stats.ftUnassigned} Siswa`;

    // Kartu 2: Non-Field Trip
    const elNonFtTotal = document.getElementById('mentorStat_nonFtTotal');
    const elNonFtAssigned = document.getElementById('mentorStat_nonFtAssigned');
    const elNonFtUnassigned = document.getElementById('mentorStat_nonFtUnassigned');
    if (elNonFtTotal) elNonFtTotal.textContent = `${stats.nonFtTotal} Siswa`;
    if (elNonFtAssigned) elNonFtAssigned.textContent = `${stats.nonFtAssigned} Siswa`;
    if (elNonFtUnassigned) elNonFtUnassigned.textContent = `${stats.nonFtUnassigned} Siswa`;

    // Kartu 3: Total Semua Siswa
    const elTotal = document.getElementById('mentorStat_total');
    const elAssigned = document.getElementById('mentorStat_assigned');
    const elUnassigned = document.getElementById('mentorStat_unassigned');
    if (elTotal) elTotal.textContent = `${stats.totalStudents.toLocaleString('id-ID')} Siswa`;
    if (elAssigned) elAssigned.textContent = `${stats.totalAssigned} Siswa`;
    if (elUnassigned) elUnassigned.textContent = `${stats.totalUnassigned} Siswa`;

    // Kartu 4: Guru Pembina Aktif
    const elTeachers = document.getElementById('mentorStat_teachers');
    if (elTeachers) elTeachers.textContent = `${stats.activeMentorsCount} Aktif (dari ${stats.totalTeachers} Guru)`;

    // Counter badge pada kontrol filter Sub-Tab 1
    const lblCountAll = document.getElementById('lblCountStatus_ALL');
    const lblCountUn = document.getElementById('lblCountStatus_UNASSIGNED');
    const lblCountAs = document.getElementById('lblCountStatus_ASSIGNED');
    const lblCatFt = document.getElementById('lblCountCat_FT');
    const lblCatNonFt = document.getElementById('lblCountCat_NON_FT');

    if (lblCountAll) lblCountAll.textContent = stats.totalStudents.toLocaleString('id-ID');
    if (lblCountUn) lblCountUn.textContent = stats.totalUnassigned.toLocaleString('id-ID');
    if (lblCountAs) lblCountAs.textContent = stats.totalAssigned.toLocaleString('id-ID');
    if (lblCatFt) lblCatFt.textContent = String(stats.ftTotal);
    if (lblCatNonFt) lblCatNonFt.textContent = String(stats.nonFtTotal);
  }

  /**
   * FILTER CEPAT DARI KARTU KPI METRIK ATAS
   */
  window.quickFilterMentorStudents = function(status, category) {
    mentorAllStudentsFilter.status = status || 'ALL';
    mentorAllStudentsFilter.category = category || 'ALL';
    mentorAllCurrentPage = 1;
    switchMentorshipSubTab('allstudents');
    updateMentorFilterButtonsUI();
    renderAllStudentsMentorshipView();
  };

  function updateMentorFilterButtonsUI() {
    // Update tombol Status Binaan
    const btnAll = document.getElementById('btnMentorFilterStatus_ALL');
    const btnUn = document.getElementById('btnMentorFilterStatus_UNASSIGNED');
    const btnAs = document.getElementById('btnMentorFilterStatus_ASSIGNED');

    if (btnAll) {
      btnAll.className = (mentorAllStudentsFilter.status === 'ALL')
        ? 'px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0875D1] text-white shadow-2xs transition-all cursor-pointer'
        : 'px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer';
    }
    if (btnUn) {
      btnUn.className = (mentorAllStudentsFilter.status === 'UNASSIGNED')
        ? 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-2xs transition-all cursor-pointer flex items-center gap-1'
        : 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer flex items-center gap-1';
    }
    if (btnAs) {
      btnAs.className = (mentorAllStudentsFilter.status === 'ASSIGNED')
        ? 'px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-2xs transition-all cursor-pointer flex items-center gap-1'
        : 'px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1';
    }

    // Update tombol Kategori Jalur
    const btnCatAll = document.getElementById('btnMentorFilterCat_ALL');
    const btnCatFt = document.getElementById('btnMentorFilterCat_FIELD_TRIP');
    const btnCatNonFt = document.getElementById('btnMentorFilterCat_NON_FIELD_TRIP');

    if (btnCatAll) {
      btnCatAll.className = (mentorAllStudentsFilter.category === 'ALL')
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-slate-800 shadow-2xs transition-all cursor-pointer'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer';
    }
    if (btnCatFt) {
      btnCatFt.className = (mentorAllStudentsFilter.category === 'FIELD_TRIP')
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-2xs transition-all cursor-pointer flex items-center gap-1'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1';
    }
    if (btnCatNonFt) {
      btnCatNonFt.className = (mentorAllStudentsFilter.category === 'NON_FIELD_TRIP')
        ? 'px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-700 text-white shadow-2xs transition-all cursor-pointer flex items-center gap-1'
        : 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1';
    }
  }

  window.setMentorAllStudentsStatusFilter = function(status) {
    mentorAllStudentsFilter.status = status;
    mentorAllCurrentPage = 1;
    updateMentorFilterButtonsUI();
    renderAllStudentsMentorshipView();
  };

  window.setMentorAllStudentsCatFilter = function(cat) {
    mentorAllStudentsFilter.category = cat;
    mentorAllCurrentPage = 1;
    updateMentorFilterButtonsUI();
    renderAllStudentsMentorshipView();
  };

  window.onMentorAllStudentsFilterChange = function() {
    const selGrade = document.getElementById('selectMentorFilterGrade');
    const selRombel = document.getElementById('selectMentorFilterRombel');
    const inSearch = document.getElementById('searchMentorAllStudents');

    mentorAllStudentsFilter.grade = selGrade ? selGrade.value : 'ALL';
    mentorAllStudentsFilter.rombel = selRombel ? selRombel.value : 'ALL';
    mentorAllStudentsFilter.search = inSearch ? inSearch.value.trim().toLowerCase() : '';
    mentorAllCurrentPage = 1;
    renderAllStudentsMentorshipView();
  };

  window.resetMentorAllStudentsFilters = function() {
    mentorAllStudentsFilter = {
      status: 'ALL',
      category: 'ALL',
      grade: 'ALL',
      rombel: 'ALL',
      search: ''
    };
    mentorAllCurrentPage = 1;
    const selGrade = document.getElementById('selectMentorFilterGrade');
    const selRombel = document.getElementById('selectMentorFilterRombel');
    const inSearch = document.getElementById('searchMentorAllStudents');
    if (selGrade) selGrade.value = 'ALL';
    if (selRombel) selRombel.value = 'ALL';
    if (inSearch) inSearch.value = '';
    updateMentorFilterButtonsUI();
    renderAllStudentsMentorshipView();
  };

  window.onMentorPerPageChange = function() {
    const sel = document.getElementById('selectMentorPerPage');
    if (sel) {
      mentorAllPerPage = parseInt(sel.value, 10) || 100;
      mentorAllCurrentPage = 1;
      renderAllStudentsMentorshipView();
    }
  };

  window.changeMentorAllStudentsPage = function(delta) {
    mentorAllCurrentPage += delta;
    renderAllStudentsMentorshipView();
  };

  /**
   * ==========================================
   * SUB-TAB 1: REKAP STATUS SEMUA SISWA
   * (BELUM VS SUDAH ADA FASILITATOR)
   * ==========================================
   */
  function renderAllStudentsMentorshipView() {
    if (!window.FincestemMentorship) return;
    const allStudents = window.FincestemMasterStudents || [];
    const tableBody = document.getElementById('tableBodyMentorAllStudents');
    const pageInfo = document.getElementById('mentorAllStudentsPageInfo');
    const lblCurPage = document.getElementById('lblMentorCurrentPage');
    const btnPrev = document.getElementById('btnMentorPrevPage');
    const btnNext = document.getElementById('btnMentorNextPage');
    const selRombel = document.getElementById('selectMentorFilterRombel');

    if (!tableBody) return;

    // Populate dropdown Rombel jika belum terisi
    if (selRombel && selRombel.options.length <= 1) {
      let rOpts = '<option value="ALL">Semua Kelas (33 Rombel)</option>';
      ['X', 'XI', 'XII'].forEach(lvl => {
        for (let i = 1; i <= 11; i++) {
          rOpts += `<option value="KELAS ${lvl}.${i}">Kelas ${lvl}.${i}</option>`;
        }
      });
      selRombel.innerHTML = rOpts;
    }

    // 1. O(1) Cache Data Guru & Assignments
    const assignMap = window.FincestemMentorship.getAssignmentsMap();
    const teachers = window.FincestemMentorship.getTeachers();

    const teacherMap = new Map();
    teachers.forEach(t => {
      const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
      teacherMap.set(k, t);
    });

    const fasilitatorByNisn = new Map();
    const coordinatorByNisn = new Map();

    for (const [tKey, entry] of Object.entries(assignMap)) {
      if (!entry || !Array.isArray(entry.student_nisns)) continue;
      const role = window.FincestemMentorship.getTeacherRole(tKey);
      const tObj = teacherMap.get(tKey) || window.FincestemMentorship.findTeacherByIdentifier(tKey);
      const tName = (tObj && tObj.nama_guru) || entry.teacher_name || tKey;
      const tInfo = { teacher_key: tKey, teacher_name: tName, teacher_role: role };

      entry.student_nisns.forEach(rawN => {
        const sN = String(rawN || '').trim();
        if (!sN) return;
        const digits = sN.replace(/\D/g, '');
        const padded = (digits.length >= 8 && digits.length <= 10) ? digits.padStart(10, '0') : sN;
        const unp = digits.replace(/^0+/, '') || sN;

        // Siswa yang diplot ke guru manapun (termasuk guru berkategori Koordinator) MEMILIKI FASILITATOR BINAAN!
        fasilitatorByNisn.set(sN, tInfo);
        if (digits) {
          fasilitatorByNisn.set(digits, tInfo);
          if (digits.length >= 8 && digits.length <= 10) fasilitatorByNisn.set(digits.padStart(10, '0'), tInfo);
          if (unp) fasilitatorByNisn.set(unp, tInfo);
        }

        if (role === 'KOORDINATOR') {
          coordinatorByNisn.set(sN, tInfo);
          if (digits) {
            coordinatorByNisn.set(digits, tInfo);
            if (digits.length >= 8 && digits.length <= 10) coordinatorByNisn.set(digits.padStart(10, '0'), tInfo);
            if (unp) coordinatorByNisn.set(unp, tInfo);
          }
        }
      });
    }

    // 2. O(1) Cache Zona Siswa
    const zMap = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones._getZonesMap)
      ? FincestemCore.zones._getZonesMap()
      : {};

    const checkIsFT = (sNisn, sObj) => {
      const rawDigits = sNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : sNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const z = zMap[sNisn] || zMap[paddedNisn] || (unpaddedNisn ? zMap[unpaddedNisn] : null) || sObj.zone;
      if (z) {
        const zUp = String(z).toUpperCase();
        return zUp.includes('LUAR') || zUp.includes('FIELD') || zUp.includes('TRIP');
      }
      return (sObj.zone === 'FINCESTEM LUAR OKU TIMUR' || sObj.is_field_trip === true);
    };

    // 3. Cache Koordinator Rombel dari Data Koordinator & Fasil
    let coordByClass = new Map();
    try {
      const local = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getLocalAssignments)
        ? FincestemCore.assignments.getLocalAssignments()
        : JSON.parse(localStorage.getItem('fincestem_role_assignments') || '{}');
      (local.coordinators || []).forEach(c => {
        const normC = String(c.class_name || '').replace(/^KELAS\s+/i, '').trim().toUpperCase();
        if (normC && (c.teacher_name || c.teacher_username)) {
          coordByClass.set(normC, c.teacher_name || c.teacher_username);
        }
      });
    } catch(e) {}

    // 4. Filter Siswa
    const statusFilter = mentorAllStudentsFilter.status;
    const catFilter = mentorAllStudentsFilter.category;
    const gradeFilter = mentorAllStudentsFilter.grade;
    const rombelFilter = mentorAllStudentsFilter.rombel;
    const searchFilter = mentorAllStudentsFilter.search;

    const normRombel = (rombelFilter !== 'ALL') ? rombelFilter.replace(/^KELAS\s+/i, '').trim().toUpperCase() : null;

    const filtered = [];
    for (let i = 0; i < allStudents.length; i++) {
      const s = allStudents[i];
      const sNisn = String(s.nisn || '').trim();
      const sNis = String(s.nis || '').trim();
      const digits = sNisn.replace(/\D/g, '');
      const padded = (digits.length >= 8 && digits.length <= 10) ? digits.padStart(10, '0') : sNisn;
      const unp = digits.replace(/^0+/, '');
      const sClass = (s.class || s.rombel || '').toUpperCase();
      const sClassNorm = sClass.replace(/^KELAS\s+/i, '').trim().toUpperCase();

      // Cek Fasilitator & Koordinator O(1)
      const fasilObj = fasilitatorByNisn.get(sNisn) || (digits ? fasilitatorByNisn.get(digits) : null) || fasilitatorByNisn.get(padded) || (unp ? fasilitatorByNisn.get(unp) : null) || (sNis ? fasilitatorByNisn.get(sNis) : null);
      const hasFasil = (fasilObj !== null);
      const coordObj = coordinatorByNisn.get(sNisn) || (digits ? coordinatorByNisn.get(digits) : null) || coordinatorByNisn.get(padded) || (unp ? coordinatorByNisn.get(unp) : null) || (sNis ? coordinatorByNisn.get(sNis) : null);
      const coordName = (coordObj && coordObj.teacher_name) || coordByClass.get(sClassNorm) || '-';

      // Cek Status
      if (statusFilter === 'UNASSIGNED' && hasFasil) continue;
      if (statusFilter === 'ASSIGNED' && !hasFasil) continue;

      // Cek Field Trip
      const isFT = checkIsFT(sNisn, s);
      if (catFilter === 'FIELD_TRIP' && !isFT) continue;
      if (catFilter === 'NON_FIELD_TRIP' && isFT) continue;

      // Cek Tingkat
      if (gradeFilter !== 'ALL') {
        const sLvl = String(s.level || '').toUpperCase();
        if (sLvl !== gradeFilter && !sClass.includes(' ' + gradeFilter + '.') && !sClass.startsWith(gradeFilter + '.')) continue;
      }

      // Cek Rombel
      if (normRombel !== null && sClassNorm !== normRombel) continue;

      // Cek Pencarian
      if (searchFilter) {
        const matchName = (s.nama || '').toLowerCase().includes(searchFilter);
        const matchNisn = sNisn.includes(searchFilter);
        const matchFasil = (fasilObj && (fasilObj.teacher_name || '').toLowerCase().includes(searchFilter));
        const matchCoord = (coordName && coordName.toLowerCase().includes(searchFilter));
        if (!matchName && !matchNisn && !matchFasil && !matchCoord) continue;
      }

      filtered.push({
        s,
        sNisn,
        isFT,
        fasilObj,
        hasFasil,
        coordName
      });
    }

    // 5. Pagination Calculation
    const totalRecords = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / mentorAllPerPage));
    if (mentorAllCurrentPage > totalPages) mentorAllCurrentPage = totalPages;
    if (mentorAllCurrentPage < 1) mentorAllCurrentPage = 1;

    const startIndex = (mentorAllCurrentPage - 1) * mentorAllPerPage;
    const endIndex = Math.min(startIndex + mentorAllPerPage, totalRecords);
    const visibleChunk = filtered.slice(startIndex, endIndex);

    if (pageInfo) {
      if (totalRecords === 0) {
        pageInfo.textContent = 'Menampilkan 0 dari 0 siswa';
      } else {
        pageInfo.textContent = `Menampilkan ${startIndex + 1} - ${endIndex} dari ${totalRecords.toLocaleString('id-ID')} siswa`;
      }
    }
    if (lblCurPage) lblCurPage.textContent = `Hal ${mentorAllCurrentPage} / ${totalPages}`;
    if (btnPrev) btnPrev.disabled = (mentorAllCurrentPage <= 1);
    if (btnNext) btnNext.disabled = (mentorAllCurrentPage >= totalPages);

    if (totalRecords === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="p-10 text-center text-slate-400 text-xs">
            <span class="material-symbols-outlined text-4xl text-slate-300 block mb-1">search_off</span>
            <span class="font-extrabold text-sm text-slate-700">Tidak ada data siswa yang cocok dengan filter.</span>
            <p class="text-slate-400 text-[11px] mt-1">Coba ubah status binaan atau reset filter di atas.</p>
            <button type="button" onclick="resetMentorAllStudentsFilters()" class="mt-2.5 px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs inline-flex items-center gap-1 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-sm">restart_alt</span>
              <span>Reset Filter</span>
            </button>
          </td>
        </tr>
      `;
      updateMentorBatchToolbar();
      return;
    }

    // 6. Render Tabel Rows
    let html = '';
    for (let i = 0; i < visibleChunk.length; i++) {
      const item = visibleChunk[i];
      const s = item.s;
      const sNisn = item.sNisn;
      const isFT = item.isFT;
      const hasFasil = item.hasFasil;
      const fasilObj = item.fasilObj;
      const coordName = item.coordName;
      const isChecked = mentorBatchSelectedNisns.has(sNisn);
      const rowNum = startIndex + i + 1;

      // Badge Jalur Kegiatan - Tombol Interaktif Satu-Klik untuk Ubah FT <-> Non-FT Seketika
      const targetZoneToggle = isFT ? 'FINCESTEM OKU TIMUR' : 'FINCESTEM LUAR OKU TIMUR';
      const badgeJalur = isFT
        ? `<button type="button" onclick="toggleMentorStudentZoneAction('${escapeHtml(sNisn)}', '${targetZoneToggle}')" class="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 inline-flex items-center gap-1 shadow-2xs cursor-pointer transition-all border border-amber-600/30" title="Klik untuk beralih ke Non-Field Trip (Sekolah)"><span class="material-symbols-outlined text-xs">directions_bus</span><span>Field Trip</span><span class="material-symbols-outlined text-[10px] ml-0.5 opacity-60">sync</span></button>`
        : `<button type="button" onclick="toggleMentorStudentZoneAction('${escapeHtml(sNisn)}', '${targetZoneToggle}')" class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-100 hover:bg-teal-200 active:scale-95 text-teal-900 border border-teal-300 inline-flex items-center gap-1 shadow-2xs cursor-pointer transition-all" title="Klik untuk beralih ke Field Trip"><span class="material-symbols-outlined text-xs">school</span><span>Non-FT</span><span class="material-symbols-outlined text-[10px] ml-0.5 opacity-60">sync</span></button>`;

      // Status & Fasilitator Badge
      let fasilBadge = '';
      if (hasFasil) {
        fasilBadge = `
          <div class="flex items-center gap-1.5 py-0.5">
            <span class="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
              <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              <span class="font-extrabold truncate max-w-[200px]" title="${escapeHtml(fasilObj.teacher_name)}">${escapeHtml(fasilObj.teacher_name)}</span>
            </span>
          </div>
        `;
      } else {
        fasilBadge = `
          <div class="flex items-center gap-1.5 py-0.5">
            <span class="px-2.5 py-1 rounded-xl text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
              <span class="material-symbols-outlined text-sm text-amber-700">warning</span>
              <span>⚠️ BELUM ADA FASILITATOR</span>
            </span>
          </div>
        `;
      }

      // Koordinator Info
      const coordHtml = (coordName && coordName !== '-')
        ? `<span class="text-xs font-bold text-slate-700 flex items-center gap-1"><span class="material-symbols-outlined text-sm text-[#0875D1]">assignment_ind</span><span class="truncate max-w-[160px]" title="${escapeHtml(coordName)}">${escapeHtml(coordName)}</span></span>`
        : `<span class="text-slate-300 font-bold">-</span>`;

      html += `
        <tr class="border-b border-slate-100 hover:bg-blue-50/40 transition-colors ${isChecked ? 'bg-blue-50/60' : ''}">
          <td class="py-2.5 px-3 text-center">
            <input type="checkbox" data-nisn="${escapeHtml(sNisn)}" onchange="toggleMentorStudentRowCheckbox('${escapeHtml(sNisn)}', this.checked)" ${isChecked ? 'checked' : ''} class="chk-student-row w-3.5 h-3.5 rounded text-[#0875D1] cursor-pointer">
          </td>
          <td class="py-2.5 px-2 text-center font-bold text-slate-400 text-xs">${rowNum}</td>
          <td class="py-2.5 px-3">
            <div class="flex flex-col">
              <span class="font-extrabold text-xs text-slate-800">${escapeHtml(s.nama || '-')}</span>
              <span class="text-[10px] text-slate-400 font-medium">${escapeHtml(s.gender || '')}</span>
            </div>
          </td>
          <td class="py-2.5 px-3">
            <div class="flex flex-col">
              <span class="font-mono font-bold text-slate-700 text-xs">${escapeHtml(sNisn)}</span>
              <span class="text-[10.5px] font-semibold text-slate-500">${escapeHtml(s.class || s.rombel || '-')}</span>
            </div>
          </td>
          <td class="py-2.5 px-3 text-center">${badgeJalur}</td>
          <td class="py-2.5 px-3">${fasilBadge}</td>
          <td class="py-2.5 px-3">${coordHtml}</td>
          <td class="py-2.5 px-3 text-center">
            <button type="button" onclick="openSingleStudentAssignModal('${escapeHtml(sNisn)}')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${hasFasil ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-[#0875D1] hover:bg-blue-700 text-white'}">
              <span>${hasFasil ? 'Ganti Guru' : '+ Tetapkan Guru'}</span>
            </button>
          </td>
        </tr>
      `;
    }

    tableBody.innerHTML = html;
    updateMentorBatchToolbar();
  }

  /**
   * BATCH ACTIONS & SELECTION FOR SUB-TAB 1
   */
  window.toggleMentorBatchSelectAll = function(checked) {
    const tableBody = document.getElementById('tableBodyMentorAllStudents');
    if (!tableBody) return;
    const cbs = tableBody.querySelectorAll('input.chk-student-row');
    cbs.forEach(cb => {
      cb.checked = checked;
      const n = cb.getAttribute('data-nisn');
      if (n) {
        if (checked) mentorBatchSelectedNisns.add(n);
        else mentorBatchSelectedNisns.delete(n);
      }
    });
    updateMentorBatchToolbar();
  };

  window.toggleMentorStudentRowCheckbox = function(nisn, checked) {
    if (checked) mentorBatchSelectedNisns.add(nisn);
    else mentorBatchSelectedNisns.delete(nisn);
    updateMentorBatchToolbar();
  };

  function updateMentorBatchToolbar() {
    const lblCount = document.getElementById('lblMentorBatchSelectedCount');
    const btnAssign = document.getElementById('btnBatchAssignMentor');
    const btnClear = document.getElementById('btnBatchClearMentor');
    const chkPage = document.getElementById('chkMentorBatchSelectAll');
    const chkHeader = document.getElementById('chkMentorHeaderAll');

    const btnPrint = document.getElementById('btnBatchPrintMentor');
    const count = mentorBatchSelectedNisns.size;
    if (lblCount) lblCount.textContent = `${count} siswa terpilih`;
    if (btnAssign) btnAssign.disabled = (count === 0);
    if (btnClear) btnClear.disabled = (count === 0);
    if (btnPrint) btnPrint.disabled = (count === 0);
    const btnSetNonFT = document.getElementById('btnBatchSetNonFT');
    const btnSetFT = document.getElementById('btnBatchSetFT');
    if (btnSetNonFT) btnSetNonFT.disabled = (count === 0);
    if (btnSetFT) btnSetFT.disabled = (count === 0);

    const tableBody = document.getElementById('tableBodyMentorAllStudents');
    if (tableBody) {
      const cbs = tableBody.querySelectorAll('input.chk-student-row');
      const allChecked = cbs.length > 0 && Array.from(cbs).every(cb => cb.checked);
      if (chkPage) chkPage.checked = allChecked;
      if (chkHeader) chkHeader.checked = allChecked;
    }
  }


  window.toggleMentorStudentZoneAction = function(nisn, targetZone) {
    if (!nisn || !window.FincestemCore || !FincestemCore.zones) return;
    const isToFT = String(targetZone).toUpperCase().includes('LUAR');
    const label = isToFT ? 'Field Trip (Luar OKU Timur)' : 'Non-Field Trip (Riset OKU Timur)';
    FincestemCore.zones.setStudentZone(nisn, targetZone, function() {
      renderAllStudentsMentorshipView();
      renderMentorshipStats();
      if (currentSubTab === 'plotting') renderPlottingView();
      if (typeof renderSelectedTeacherDetail === 'function') renderSelectedTeacherDetail();
      if (typeof window.refreshAdminStats === 'function') window.refreshAdminStats();
      if (typeof applyStudentFilters === 'function') applyStudentFilters();
      if (typeof renderAdminRekapView === 'function') renderAdminRekapView();
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Kategori siswa NISN ${nisn} berhasil dialihkan ke ${label}!`, 'success');
      }
    });
  };

  window.batchSetStudentZoneAction = function(targetZone) {
    if (!mentorBatchSelectedNisns || mentorBatchSelectedNisns.size === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu!');
      return;
    }
    const isToFT = String(targetZone).toUpperCase().includes('LUAR');
    const label = isToFT ? 'Field Trip (Luar OKU Timur)' : 'Non-Field Trip (Riset OKU Timur)';
    const selectedNisns = Array.from(mentorBatchSelectedNisns);

    if (!confirm(`Ubah ${selectedNisns.length} siswa terpilih menjadi "${label}"?`)) {
      return;
    }

    selectedNisns.forEach(nisn => {
      FincestemCore.zones.setStudentZone(nisn, targetZone);
    });

    renderAllStudentsMentorshipView();
    renderMentorshipStats();
    if (currentSubTab === 'plotting') renderPlottingView();
    if (typeof renderSelectedTeacherDetail === 'function') renderSelectedTeacherDetail();
    if (typeof window.refreshAdminStats === 'function') window.refreshAdminStats();
    if (typeof applyStudentFilters === 'function') applyStudentFilters();
    if (typeof renderAdminRekapView === 'function') renderAdminRekapView();
    if (window.FincestemCore && FincestemCore.ui) {
      FincestemCore.ui.toast(`Berhasil memindahkan ${selectedNisns.length} siswa ke ${label}!`, 'success');
    } else {
      alert(`Berhasil memindahkan ${selectedNisns.length} siswa ke ${label}!`);
    }
  };

  window.openBatchAssignModalAction = function() {
    if (mentorBatchSelectedNisns.size === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu!');
      return;
    }
    const allStudents = window.FincestemMasterStudents || [];
    const nisnList = Array.from(mentorBatchSelectedNisns);
    const infoList = [];
    const nisnSet = new Set(nisnList);

    allStudents.forEach(s => {
      const n = String(s.nisn || '').trim();
      if (nisnSet.has(n)) {
        infoList.push({ nisn: n, nama: s.nama, class: s.class || s.rombel });
      }
    });

    openQuickAssignModal(nisnList, infoList);
  };

  window.openSingleStudentAssignModal = function(nisn) {
    if (!nisn) return;
    const allStudents = window.FincestemMasterStudents || [];
    const sObj = allStudents.find(s => String(s.nisn || '').trim() === String(nisn).trim());
    const infoList = sObj ? [{ nisn: sObj.nisn, nama: sObj.nama, class: sObj.class || sObj.rombel }] : [{ nisn: nisn, nama: nisn }];
    openQuickAssignModal([String(nisn).trim()], infoList);
  };

  window.batchClearMentorAction = function() {
    if (mentorBatchSelectedNisns.size === 0) return;
    if (!confirm(`Lepaskan ${mentorBatchSelectedNisns.size} siswa terpilih dari seluruh guru pembina saat ini?`)) {
      return;
    }
    const map = window.FincestemMentorship.getAssignmentsMap();
    const nisnSet = new Set(mentorBatchSelectedNisns);
    let changed = false;

    Object.keys(map).forEach(tKey => {
      if (map[tKey] && Array.isArray(map[tKey].student_nisns)) {
        const before = map[tKey].student_nisns.length;
        map[tKey].student_nisns = map[tKey].student_nisns.filter(n => !nisnSet.has(String(n).trim()));
        if (map[tKey].student_nisns.length !== before) {
          map[tKey].updated_at = new Date().toISOString();
          changed = true;
        }
      }
    });

    if (changed) {
      window.FincestemMentorship.saveAssignmentsMap(map);
      mentorBatchSelectedNisns.clear();
      renderMentorshipStats();
      renderAllStudentsMentorshipView();
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast('Siswa terpilih berhasil dilepaskan dari pembina.', 'info');
      }
    }
  };

  /**
   * CETAK KARTU SISWA BINAAN TERPILIH / SESUAI FILTER
   */
  window.printSelectedMentorCardsAction = function() {
    if (mentorBatchSelectedNisns.size === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu untuk dicetak kartunya!');
      return;
    }
    const allStudents = window.FincestemMasterStudents || [];
    const nisnSet = new Set(mentorBatchSelectedNisns);
    const selectedList = allStudents.filter(s => nisnSet.has(String(s.nisn || '').trim()));

    if (window.FincestemMentorship && typeof window.FincestemMentorship.printMentorCardsCustom === 'function') {
      window.FincestemMentorship.printMentorCardsCustom({
        students: selectedList,
        title: `Kartu_Binaan_${selectedList.length}_Siswa_Terpilih`
      });
    }
  };

  window.printFilteredMentorCardsAction = function() {
    if (window.FincestemMentorship && typeof window.FincestemMentorship.printMentorCardsCustom === 'function') {
      let titleParts = ['Kartu_Binaan'];
      if (mentorAllStudentsFilter.grade !== 'ALL') titleParts.push('Kelas_' + mentorAllStudentsFilter.grade);
      if (mentorAllStudentsFilter.rombel !== 'ALL') titleParts.push(mentorAllStudentsFilter.rombel.replace(/\s+/g, '_'));
      if (mentorAllStudentsFilter.category !== 'ALL') titleParts.push(mentorAllStudentsFilter.category);
      if (mentorAllStudentsFilter.status !== 'ALL') titleParts.push(mentorAllStudentsFilter.status);

      window.FincestemMentorship.printMentorCardsCustom({
        className: mentorAllStudentsFilter.rombel,
        grade: mentorAllStudentsFilter.grade,
        category: mentorAllStudentsFilter.category,
        status: mentorAllStudentsFilter.status,
        title: titleParts.join('_')
      });
    }
  };

  /**
   * MODAL CETAK KARTU SISWA BINAAN FLEKSIBEL (PER-KELAS, FIELD TRIP, NON-FIELD TRIP, PER-GURU)
   */
  let modalPrintCatState = 'ALL';

  window.openPrintMentorCardsModal = function() {
    const modal = document.getElementById('modalPrintMentorCardsOptions');
    if (!modal) return;

    modalPrintCatState = 'ALL';
    updateModalPrintCatButtonsUI();

    const selRombel = document.getElementById('selectModalPrintRombel');
    const selGrade = document.getElementById('selectModalPrintGrade');
    const selTeacher = document.getElementById('selectModalPrintTeacher');
    const selStatus = document.getElementById('selectModalPrintStatus');

    if (selGrade) selGrade.value = 'ALL';
    if (selStatus) selStatus.value = 'ALL';

    // Populate Rombel jika belum terisi
    if (selRombel && selRombel.options.length <= 1) {
      let rOpts = '<option value="ALL">Semua Kelas (33 Rombel)</option>';
      ['X', 'XI', 'XII'].forEach(lvl => {
        for (let i = 1; i <= 11; i++) {
          rOpts += `<option value="KELAS ${lvl}.${i}">Kelas ${lvl}.${i}</option>`;
        }
      });
      selRombel.innerHTML = rOpts;
    }
    if (selRombel) selRombel.value = 'ALL';

    // Populate Guru
    if (selTeacher && window.FincestemMentorship) {
      const teachers = window.FincestemMentorship.getTeachers();
      let tOpts = '<option value="ALL">-- Semua Guru Pembina (Seluruh Siswa) --</option>';
      const seenNames = new Set();
      teachers.forEach(t => {
        const normName = String(t.nama_guru || '').trim().toUpperCase();
        if (!normName || seenNames.has(normName)) return;
        seenNames.add(normName);
        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        const role = window.FincestemMentorship.getTeacherRole(k);
        const roleBadge = role === 'FIELD_TRIP' ? '🚌 FT' : (role === 'KOORDINATOR' ? '🎯 Koord' : '🏫 Non-FT');
        tOpts += `<option value="${k}">${t.nama_guru} [${roleBadge}]</option>`;
      });
      selTeacher.innerHTML = tOpts;
      selTeacher.value = 'ALL';
    }

    modal.classList.remove('hidden');
    updateModalPrintSummary();
  };

  window.closePrintMentorCardsModal = function() {
    const modal = document.getElementById('modalPrintMentorCardsOptions');
    if (modal) modal.classList.add('hidden');
  };

  window.setModalPrintCategory = function(cat) {
    modalPrintCatState = cat;
    updateModalPrintCatButtonsUI();
    updateModalPrintSummary();
  };

  function updateModalPrintCatButtonsUI() {
    const btnAll = document.getElementById('btnModalPrintCat_ALL');
    const btnFT = document.getElementById('btnModalPrintCat_FIELD_TRIP');
    const btnNonFT = document.getElementById('btnModalPrintCat_NON_FIELD_TRIP');

    if (btnAll) btnAll.className = (modalPrintCatState === 'ALL')
      ? 'py-2 text-center text-xs font-bold rounded-lg bg-[#0875D1] text-white shadow-2xs transition-all cursor-pointer'
      : 'py-2 text-center text-xs font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition-all cursor-pointer';

    if (btnFT) btnFT.className = (modalPrintCatState === 'FIELD_TRIP')
      ? 'py-2 text-center text-xs font-bold rounded-lg bg-amber-500 text-slate-950 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1'
      : 'py-2 text-center text-xs font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1';

    if (btnNonFT) btnNonFT.className = (modalPrintCatState === 'NON_FIELD_TRIP')
      ? 'py-2 text-center text-xs font-bold rounded-lg bg-teal-700 text-white shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1'
      : 'py-2 text-center text-xs font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1';
  }

  window.onModalPrintFilterChanged = function() {
    updateModalPrintSummary();
  };

  window.updateModalPrintSummary = function() {
    const lblSummary = document.getElementById('lblModalPrintSummary');
    if (!lblSummary || !window.FincestemMasterStudents) return;

    const allStudents = window.FincestemMasterStudents || [];
    const selGrade = document.getElementById('selectModalPrintGrade');
    const selRombel = document.getElementById('selectModalPrintRombel');
    const selTeacher = document.getElementById('selectModalPrintTeacher');
    const selStatus = document.getElementById('selectModalPrintStatus');

    const gradeVal = selGrade ? selGrade.value : 'ALL';
    const rombelVal = selRombel ? selRombel.value : 'ALL';
    const teacherVal = selTeacher ? selTeacher.value : 'ALL';
    const statusVal = selStatus ? selStatus.value : 'ALL';

    const zMap = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones._getZonesMap)
      ? FincestemCore.zones._getZonesMap()
      : {};

    const checkIsFT = (sNisn, sObj) => {
      const rawDigits = sNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : sNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const z = zMap[sNisn] || zMap[paddedNisn] || (unpaddedNisn ? zMap[unpaddedNisn] : null) || sObj.zone;
      if (z) {
        const zUp = String(z).toUpperCase();
        return zUp.includes('LUAR') || zUp.includes('FIELD') || zUp.includes('TRIP');
      }
      return (sObj.zone === 'FINCESTEM LUAR OKU TIMUR' || sObj.is_field_trip === true);
    };

    const targetTeacherNisns = (teacherVal !== 'ALL' && window.FincestemMentorship)
      ? new Set(window.FincestemMentorship.getAssignedNisnsForTeacher(teacherVal))
      : null;

    const assignedNisns = window.FincestemMentorship ? window.FincestemMentorship.getAllAssignedNisns() : new Set();
    const targetClass = (rombelVal !== 'ALL') ? rombelVal.replace(/^KELAS\s+/i, '').trim().toUpperCase() : null;

    let matchCount = 0;
    for (let i = 0; i < allStudents.length; i++) {
      const s = allStudents[i];
      const sNisn = String(s.nisn || '').trim();
      const sClassRaw = (s.class || s.rombel || '').toUpperCase();
      const sClassNorm = sClassRaw.replace(/^KELAS\s+/i, '').trim();

      if (targetTeacherNisns && !targetTeacherNisns.has(sNisn)) continue;

      if (gradeVal !== 'ALL') {
        const sLvl = String(s.level || '').toUpperCase();
        if (sLvl !== gradeVal && !sClassRaw.includes(' ' + gradeVal + '.') && !sClassRaw.startsWith(gradeVal + '.')) continue;
      }

      if (targetClass && sClassNorm !== targetClass) continue;

      const isFT = checkIsFT(sNisn, s);
      if (modalPrintCatState === 'FIELD_TRIP' && !isFT) continue;
      if (modalPrintCatState === 'NON_FIELD_TRIP' && isFT) continue;

      const isMapped = (window.FincestemMentorship && typeof window.FincestemMentorship.isStudentAssigned === 'function')
        ? window.FincestemMentorship.isStudentAssigned(s)
        : assignedNisns.has(sNisn);
      if (statusVal === 'ASSIGNED' && !isMapped) continue;
      if (statusVal === 'UNASSIGNED' && isMapped) continue;

      matchCount++;
    }

    const pages = Math.ceil(matchCount / 10);
    lblSummary.innerHTML = `<span class="text-teal-900 font-extrabold">${matchCount} kartu siswa</span> (${pages} lembar Folio/F4)`;
  };

  window.executeModalPrintMentorCardsAction = function() {
    const selGrade = document.getElementById('selectModalPrintGrade');
    const selRombel = document.getElementById('selectModalPrintRombel');
    const selTeacher = document.getElementById('selectModalPrintTeacher');
    const selStatus = document.getElementById('selectModalPrintStatus');

    const gradeVal = selGrade ? selGrade.value : 'ALL';
    const rombelVal = selRombel ? selRombel.value : 'ALL';
    const teacherVal = selTeacher ? selTeacher.value : 'ALL';
    const statusVal = selStatus ? selStatus.value : 'ALL';

    let titleParts = ['Kartu_Binaan'];
    if (rombelVal !== 'ALL') titleParts.push(rombelVal.replace(/\s+/g, '_'));
    else if (gradeVal !== 'ALL') titleParts.push('Kelas_' + gradeVal);

    if (modalPrintCatState !== 'ALL') titleParts.push(modalPrintCatState);
    if (teacherVal !== 'ALL') {
      const tObj = window.FincestemMentorship.findTeacherByIdentifier(teacherVal);
      titleParts.push((tObj && tObj.nama_guru ? tObj.nama_guru : teacherVal).replace(/\s+/g, '_'));
    }

    const ok = window.FincestemMentorship.printMentorCardsCustom({
      category: modalPrintCatState,
      grade: gradeVal,
      className: rombelVal,
      teacherKey: teacherVal,
      status: statusVal,
      title: titleParts.join('_')
    });

    if (ok) {
      closePrintMentorCardsModal();
    }
  };

  /**
   * QUICK ASSIGN MODAL (SINGLE / BATCH)
   */
  window.openQuickAssignModal = function(nisnList, studentInfoList) {
    targetQuickAssignNisns = nisnList || [];
    if (targetQuickAssignNisns.length === 0) return;

    const modal = document.getElementById('modalQuickAssignTeacherSingleOrBatch');
    const badgeCount = document.getElementById('quickAssignStudentCountBadge');
    const targetListEl = document.getElementById('quickAssignTargetStudentList');
    const selectTeacher = document.getElementById('quickAssignSelectTeacher');

    if (badgeCount) badgeCount.textContent = `${targetQuickAssignNisns.length} Siswa`;

    if (targetListEl) {
      if (studentInfoList && studentInfoList.length) {
        targetListEl.innerHTML = studentInfoList.slice(0, 10).map(s => 
          `<div class="flex items-center justify-between py-0.5 border-b border-slate-100 last:border-0">
             <span class="truncate max-w-[240px] font-bold text-slate-800">${escapeHtml(s.nama || s.nisn)}</span>
             <span class="text-[10.5px] text-slate-400 font-mono">${escapeHtml(s.class || s.rombel || s.nisn)}</span>
           </div>`
        ).join('') + (studentInfoList.length > 10 ? `<div class="text-[10px] text-slate-400 pt-1">+ ${studentInfoList.length - 10} siswa lainnya...</div>` : '');
      } else {
        targetListEl.textContent = `${targetQuickAssignNisns.length} siswa terpilih`;
      }
    }

    // Populate Select Teacher dengan jumlah binaan saat ini
    if (selectTeacher && window.FincestemMentorship) {
      const teachers = window.FincestemMentorship.getTeachers();
      const teacherCounts = new Map();
      const teacherRoles = new Map();
      teachers.forEach(t => {
        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        teacherCounts.set(k, window.FincestemMentorship.getAssignedNisnsForTeacher(k).length);
        teacherRoles.set(k, window.FincestemMentorship.getTeacherRole(k));
      });

      // Urutkan berdasarkan beban terkecil dulu agar pembagian merata
      const sorted = [...teachers].sort((a, b) => {
        const kA = String(a.username || a.nip || a.kode_guru).toLowerCase();
        const kB = String(b.username || b.nip || b.kode_guru).toLowerCase();
        const countA = teacherCounts.get(kA) || 0;
        const countB = teacherCounts.get(kB) || 0;
        if (countA !== countB) return countA - countB;
        return (a.nama_guru || '').localeCompare(b.nama_guru || '');
      });

      let optHtml = '<option value="">-- Pilih Guru Pembina / Fasilitator --</option>';
      const seenNames = new Set();
      sorted.forEach(t => {
        const normName = String(t.nama_guru || '').replace(/\s+/g, ' ').trim().toUpperCase();
        if (!normName || seenNames.has(normName)) return;
        seenNames.add(normName);

        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        const count = teacherCounts.get(k) || 0;
        const role = teacherRoles.get(k) || 'NON_FIELD_TRIP';
        const roleBadge = role === 'FIELD_TRIP' ? '🚌 FT' : (role === 'KOORDINATOR' ? '🎯 Koord' : '🏫 Non-FT');
        optHtml += `<option value="${k}">${t.nama_guru} [${roleBadge}] (${count} Binaan)</option>`;
      });

      selectTeacher.innerHTML = optHtml;
    }

    if (modal) modal.classList.remove('hidden');
  };

  window.closeQuickAssignModal = function() {
    const modal = document.getElementById('modalQuickAssignTeacherSingleOrBatch');
    if (modal) modal.classList.add('hidden');
    targetQuickAssignNisns = [];
  };

  window.submitQuickAssignModalAction = function() {
    const select = document.getElementById('quickAssignSelectTeacher');
    const teacherKey = select ? select.value : '';
    if (!teacherKey) {
      alert('Pilih guru pembina terlebih dahulu dari daftar dropdown!');
      return;
    }
    if (!targetQuickAssignNisns || targetQuickAssignNisns.length === 0) {
      alert('Tidak ada siswa yang dipilih.');
      closeQuickAssignModal();
      return;
    }

    const success = window.FincestemMentorship.assignStudentsToTeacher(teacherKey, targetQuickAssignNisns);
    if (success) {
      const tObj = window.FincestemMentorship.findTeacherByIdentifier(teacherKey);
      const tName = (tObj && tObj.nama_guru) || teacherKey;
      if (window.FincestemCore && FincestemCore.ui) {
        FincestemCore.ui.toast(`Berhasil menetapkan ${targetQuickAssignNisns.length} siswa ke ${tName}!`, 'success');
      } else {
        alert(`Berhasil menetapkan ${targetQuickAssignNisns.length} siswa ke ${tName}!`);
      }
      closeQuickAssignModal();
      mentorBatchSelectedNisns.clear();
      renderMentorshipStats();
      renderAllStudentsMentorshipView();
      if (currentSubTab === 'plotting') renderPlottingView();
      if (currentSubTab === 'rekap_fasil' && typeof window.renderRekapFasilView === 'function') window.renderRekapFasilView();
    } else {
      alert('Gagal menetapkan siswa.');
    }
  };

  /**
   * ==========================================
   * SUB-TAB 1: PLOTTING SISWA BINAAN
   * ==========================================
   */
  function renderPlottingView() {
    if (!window.FincestemMentorship) return;
    const teachers = window.FincestemMentorship.getTeachers();

    // Populate Select Teacher jika belum terisi
    const select = document.getElementById('selectMentorTeacher');
    if (select) {
      const prevVal = select.value;
      let optHtml = '<option value="">-- Pilih Guru Fasilitator / Koordinator --</option>';

      // Pra-hitung jumlah binaan & role setiap guru (O(1) cache) sebelum sorting
      const teacherCounts = new Map();
      const teacherRoles = new Map();
      teachers.forEach(t => {
        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        teacherCounts.set(k, window.FincestemMentorship.getAssignedNisnsForTeacher(k).length);
        teacherRoles.set(k, window.FincestemMentorship.getTeacherRole(k));
      });

      // Urutkan: Guru yang sudah ada binaan di atas, lalu abjad
      const sortedTeachers = [...teachers].sort((a, b) => {
        const kA = String(a.username || a.nip || a.kode_guru).toLowerCase();
        const kB = String(b.username || b.nip || b.kode_guru).toLowerCase();
        const countA = teacherCounts.get(kA) || 0;
        const countB = teacherCounts.get(kB) || 0;
        if (countA !== countB) return countB - countA; // yang terbanyak di atas
        return (a.nama_guru || '').localeCompare(b.nama_guru || '');
      });

      const seenOptionNames = new Set();
      sortedTeachers.forEach(t => {
        const normName = String(t.nama_guru || '').replace(/\s+/g, ' ').trim().toUpperCase();
        if (!normName || seenOptionNames.has(normName)) return;
        seenOptionNames.add(normName);

        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        const count = teacherCounts.get(k) || 0;
        const role = teacherRoles.get(k) || 'NON_FIELD_TRIP';
        const roleBadge = role === 'FIELD_TRIP' ? '🚌 FT' : (role === 'KOORDINATOR' ? '🎯 Koord' : '🏫 Non-FT');
        const countText = count > 0 ? `(${count} Siswa)` : '(0 Siswa)';

        optHtml += `<option value="${k}">${t.nama_guru} [${roleBadge}] ${countText}</option>`;
      });

      select.innerHTML = optHtml;
      if (selectedTeacherKey && teachers.some(t => String(t.username || t.nip || t.kode_guru).toLowerCase() === selectedTeacherKey)) {
        select.value = selectedTeacherKey;
      } else if (prevVal && teachers.some(t => String(t.username || t.nip || t.kode_guru).toLowerCase() === prevVal)) {
        select.value = prevVal;
        selectedTeacherKey = prevVal;
      } else if (sortedTeachers.length > 0) {
        // Default otomatis pilih guru pertama
        selectedTeacherKey = String(sortedTeachers[0].username || sortedTeachers[0].nip || sortedTeachers[0].kode_guru).toLowerCase();
        select.value = selectedTeacherKey;
      }
    }

    renderSelectedTeacherDetail();
  }

  window.onMentorTeacherSelectChange = function() {
    const select = document.getElementById('selectMentorTeacher');
    if (!select) return;
    selectedTeacherKey = select.value;
    renderSelectedTeacherDetail();
  };

  function renderSelectedTeacherDetail() {
    const cardEl = document.getElementById('mentorTeacherDetailCard');
    const tableBody = document.getElementById('tableBodyMentorStudents');
    const countBadge = document.getElementById('mentorStudentCountBadge');
    const btnAdd = document.getElementById('btnAddStudentToMentor');
    const btnPrint = document.getElementById('btnPrintMentorCards');

    if (!selectedTeacherKey) {
      if (cardEl) cardEl.innerHTML = `<div class="p-6 text-center text-slate-400 text-xs">Pilih salah satu guru pembina di atas untuk melihat dan mengelola siswa binaan.</div>`;
      if (tableBody) tableBody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-slate-400 text-xs">Belum ada guru yang dipilih.</td></tr>`;
      if (btnAdd) btnAdd.disabled = true;
      if (btnPrint) btnPrint.disabled = true;
      return;
    }

    const teachers = window.FincestemMentorship.getTeachers();
    const tObj = teachers.find(t => 
      String(t.username || t.nip || t.kode_guru).toLowerCase() === selectedTeacherKey
    );

    if (!tObj) return;

    const isStudentFTMentor = (s) => (window.FincestemCore && FincestemCore.zones && FincestemCore.zones.isFieldTripStudent)
      ? FincestemCore.zones.isFieldTripStudent(s.nisn, s.class || s.rombel, s.zone)
      : (s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true);

    const currentRole = window.FincestemMentorship.getTeacherRole(selectedTeacherKey);
    const students = window.FincestemMentorship.getStudentsForTeacher(selectedTeacherKey);
    const ftCount = students.filter(s => isStudentFTMentor(s)).length;
    const nonFtCount = students.length - ftCount;

    if (btnAdd) btnAdd.disabled = false;
    if (btnPrint) btnPrint.disabled = (students.length === 0);
    if (countBadge) countBadge.textContent = `${students.length} Siswa Binaan (${ftCount} FT • ${nonFtCount} Non-FT)`;

    // Render Card Guru
    let roleBadgeHtml = '';
    if (currentRole === 'FIELD_TRIP') {
      roleBadgeHtml = `<span class="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 flex items-center gap-1 shadow-2xs"><span class="material-symbols-outlined text-sm">directions_bus</span><span>Pendamping Field Trip (Jogja-Bromo)</span></span>`;
    } else if (currentRole === 'KOORDINATOR') {
      roleBadgeHtml = `<span class="px-2.5 py-1 rounded-full text-xs font-black bg-cyan-600 text-white flex items-center gap-1 shadow-2xs"><span class="material-symbols-outlined text-sm">assignment_ind</span><span>Koordinator Projek</span></span>`;
    } else {
      roleBadgeHtml = `<span class="px-2.5 py-1 rounded-full text-xs font-black bg-teal-600 text-white flex items-center gap-1 shadow-2xs"><span class="material-symbols-outlined text-sm">school</span><span>Fasilitator Non-Field Trip (OKU Timur)</span></span>`;
    }

    if (cardEl) {
      cardEl.innerHTML = `
        <div class="flex flex-col">
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#0875D1]/15 text-[#0875D1] flex items-center justify-center font-black text-lg border border-[#0875D1]/30 shrink-0">
                ${(tObj.nama_guru || 'G').charAt(0).toUpperCase()}
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-extrabold text-sm sm:text-base text-slate-800">${escapeHtml(tObj.nama_guru)}</h4>
                  ${roleBadgeHtml}
                </div>
                <div class="flex items-center gap-3 text-xs text-slate-500 font-medium mt-0.5 flex-wrap">
                  <span>NIP: <strong>${escapeHtml(tObj.nip || '-')}</strong></span>
                  <span>Kode: <strong>${escapeHtml(tObj.kode_guru_display || tObj.kode_guru || '-')}</strong></span>
                  <span>Mapel: <strong>${escapeHtml(tObj.mata_pelajaran || '-')}</strong></span>
                  <span>User: <strong class="text-slate-700">${escapeHtml(tObj.username || '-')}</strong></span>
                </div>
              </div>
            </div>

            <!-- Opsi Ganti Kategori Peran -->
            <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <span class="text-[10.5px] font-bold text-slate-500 px-2">Set Peran:</span>
              <button type="button" onclick="setMentorTeacherRoleAction('FIELD_TRIP')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${currentRole === 'FIELD_TRIP' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">Field Trip</button>
              <button type="button" onclick="setMentorTeacherRoleAction('NON_FIELD_TRIP')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${currentRole === 'NON_FIELD_TRIP' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">Non-FT</button>
              <button type="button" onclick="setMentorTeacherRoleAction('KOORDINATOR')" class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${currentRole === 'KOORDINATOR' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}">Koord</button>
            </div>
          </div>
        </div>
      `;
    }

    // Render Tabel Siswa Binaan
    if (tableBody) {
      if (students.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" class="p-8 text-center text-slate-500 text-xs">
              <div class="flex flex-col items-center justify-center gap-2">
                <span class="material-symbols-outlined text-4xl text-slate-300">group_add</span>
                <span class="font-extrabold text-sm text-slate-700">Guru ini belum memiliki siswa binaan.</span>
                <p class="text-slate-400 text-xs max-w-md">Klik tombol di bawah ini untuk memilih dan menetapkan siswa tanggung jawab beliau (lintas kelas, Field Trip maupun Non-Field Trip).</p>
                <button type="button" onclick="openAssignStudentModal()" class="mt-2 px-5 py-2.5 rounded-xl bg-[#0875D1] hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs inline-flex items-center gap-2 shadow-md transition-all cursor-pointer">
                  <span class="material-symbols-outlined text-base">person_add</span>
                  <span>+ Tambah Siswa Binaan Sekarang</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      } else {
        // Urutkan: Field Trip dulu, lalu nama
        const sortedStudents = [...students].sort((a, b) => {
          const aIsFT = isStudentFTMentor(a);
          const bIsFT = isStudentFTMentor(b);
          if (aIsFT && !bIsFT) return -1;
          if (!aIsFT && bIsFT) return 1;
          return (a.nama || '').localeCompare(b.nama || '');
        });

        let html = '';
        sortedStudents.forEach((s, idx) => {
          const isFT = isStudentFTMentor(s);
          const targetDetailZone = isFT ? 'FINCESTEM OKU TIMUR' : 'FINCESTEM LUAR OKU TIMUR';
          const badge = isFT
            ? `<button type="button" onclick="toggleMentorStudentZoneAction('${s.nisn}', '${targetDetailZone}')" class="px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 inline-flex items-center gap-1 shadow-2xs cursor-pointer transition-all border border-amber-600/30" title="Klik untuk beralih ke Non-Field Trip"><span>🚌 Field Trip</span><span class="material-symbols-outlined text-[10px] opacity-60">sync</span></button>`
            : `<button type="button" onclick="toggleMentorStudentZoneAction('${s.nisn}', '${targetDetailZone}')" class="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-100 hover:bg-teal-200 active:scale-95 text-teal-800 border border-teal-200 inline-flex items-center gap-1 shadow-2xs cursor-pointer transition-all" title="Klik untuk beralih ke Field Trip"><span>🏫 Non-FT</span><span class="material-symbols-outlined text-[10px] opacity-60">sync</span></button>`;

          const mInfo = window.FincestemMentorship.getMentorsForStudent
            ? window.FincestemMentorship.getMentorsForStudent(s.nisn, s.class || s.rombel)
            : { coordinator_single: '-', facilitator1: '-' };
          const partnerLabel = (currentRole === 'KOORDINATOR')
            ? `Fasil: ${escapeHtml(mInfo.facilitator1 || '-')}`
            : `Koord: ${escapeHtml(mInfo.coordinator_single || '-')}`;

          html += `
            <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
              <td class="py-2.5 px-3 text-center font-bold text-slate-400 text-xs">${idx + 1}</td>
              <td class="py-2.5 px-3 font-mono font-bold text-slate-600 text-xs">${escapeHtml(s.nisn || '-')}</td>
              <td class="py-2.5 px-3 font-extrabold text-slate-800 text-xs">
                <span>${escapeHtml(s.nama || '-')}</span>
                <span class="text-[10px] text-slate-500 font-semibold block">${escapeHtml(s.gender || '')} • <span class="text-[#0875D1]">${partnerLabel}</span></span>
              </td>
              <td class="py-2.5 px-3 font-bold text-slate-700 text-xs">${escapeHtml(s.class || s.rombel || '-')}</td>
              <td class="py-2.5 px-3 text-center">${badge}</td>
              <td class="py-2.5 px-3 text-center">
                <button type="button" onclick="removeStudentFromMentorAction('${s.nisn}')" class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer" title="Lepaskan Siswa Dari Guru Ini">
                  <span class="material-symbols-outlined text-base">person_remove</span>
                </button>
              </td>
            </tr>
          `;
        });
        tableBody.innerHTML = html;
      }
    }
  }

  window.onChangeFacilitatorCoordinator = function(coordKey) {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    window.FincestemMentorship.setFacilitatorCoordinator(selectedTeacherKey, coordKey);
    renderMentorshipStats();
    renderPlottingView();
  };

  window.setMentorTeacherRoleAction = function(role) {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    window.FincestemMentorship.setTeacherRole(selectedTeacherKey, role);
    renderMentorshipStats();
    renderPlottingView();
  };

  window.removeStudentFromMentorAction = function(nisn) {
    if (!selectedTeacherKey || !nisn || !window.FincestemMentorship) return;
    if (confirm(`Lepaskan siswa dengan NISN ${nisn} dari tanggung jawab guru ini?`)) {
      window.FincestemMentorship.removeStudentFromTeacher(selectedTeacherKey, nisn);
      renderMentorshipStats();
      renderPlottingView();
    }
  };

  window.clearAllMentorStudentsAction = function() {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    if (confirm('Kosongkan semua daftar siswa binaan dari guru ini?')) {
      window.FincestemMentorship.clearTeacherAssignments(selectedTeacherKey);
      renderMentorshipStats();
      renderPlottingView();
    }
  };

  window.printCurrentMentorCardsAction = function() {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    window.FincestemMentorship.printMentorStudentCards(selectedTeacherKey);
  };

  /**
   * ==========================================
   * MODAL: PILIH & TETAPKAN SISWA KE GURU
   * ==========================================
   */
  window.openAssignStudentModal = function() {
    // Pastikan selectedTeacherKey terisi
    if (!selectedTeacherKey) {
      const select = document.getElementById('selectMentorTeacher');
      if (select && select.value) {
        selectedTeacherKey = select.value;
      } else if (window.FincestemMentorship) {
        const teachers = window.FincestemMentorship.getTeachers();
        if (teachers.length > 0) {
          selectedTeacherKey = String(teachers[0].username || teachers[0].nip || teachers[0].kode_guru).toLowerCase();
          if (select) select.value = selectedTeacherKey;
        }
      }
    }

    if (!selectedTeacherKey) {
      alert('Pilih guru pembina terlebih dahulu dari daftar dropdown!');
      return;
    }

    const modal = document.getElementById('modalAssignStudents');
    if (!modal) return;

    // Tampilkan nama guru target di modal
    const targetInfoEl = document.getElementById('modalMentorTargetInfo');
    if (targetInfoEl && window.FincestemMentorship) {
      const teachers = window.FincestemMentorship.getTeachers();
      const t = teachers.find(item => String(item.username || item.nip || item.kode_guru).toLowerCase() === selectedTeacherKey);
      if (t) {
        const r = window.FincestemMentorship.getTeacherRole(selectedTeacherKey);
        const rBadge = r === 'FIELD_TRIP' ? '🚌 Field Trip' : (r === 'KOORDINATOR' ? '🎯 Koordinator' : '🏫 Non-Field Trip');
        targetInfoEl.innerHTML = `Menetapkan binaan untuk: <strong class="text-white bg-teal-600/70 px-2 py-0.5 rounded-md">${escapeHtml(t.nama_guru)}</strong> <span class="text-teal-300 font-bold ml-1">(${rBadge})</span>`;
      }
    }

    modalSelectedNisns.clear();
    studentModalFilter = { grade: 'ALL', rombel: 'ALL', category: 'UNASSIGNED', search: '' };

    // Reset select inputs di modal
    const selRombel = document.getElementById('modalFilterRombel');
    const selCat = document.getElementById('modalFilterCategory');
    const inSearch = document.getElementById('modalSearchStudent');
    if (selRombel) selRombel.value = 'ALL';
    if (selCat) selCat.value = 'UNASSIGNED';
    if (inSearch) inSearch.value = '';

    // Reset tombol tingkat
    ['ALL', 'X', 'XI', 'XII'].forEach(g => {
      const btn = document.getElementById('btnModalGrade_' + g);
      if (btn) {
        btn.className = (g === 'ALL')
          ? 'flex-1 py-1 text-xs font-bold rounded-lg bg-[#0875D1] text-white shadow-2xs'
          : 'flex-1 py-1 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-800';
      }
    });

    // Populate Rombel jika belum
    if (selRombel && selRombel.options.length <= 1) {
      let rOpts = '<option value="ALL">Semua Kelas (33 Rombel)</option>';
      ['X', 'XI', 'XII'].forEach(lvl => {
        for (let i = 1; i <= 11; i++) {
          rOpts += `<option value="KELAS ${lvl}.${i}">Kelas ${lvl}.${i}</option>`;
        }
      });
      selRombel.innerHTML = rOpts;
    }

    modalVisibleLimit = 80;
    const mStats = window.FincestemMentorship ? window.FincestemMentorship.getSummaryStats() : null;
    if (mStats) {
      const optFT = document.querySelector('#modalFilterCategory option[value="FIELD_TRIP"]');
      const optNonFT = document.querySelector('#modalFilterCategory option[value="NON_FIELD_TRIP"]');
      if (optFT) optFT.textContent = `Hanya Siswa Field Trip 🚌 (${mStats.ftTotal})`;
      if (optNonFT) optNonFT.textContent = `Hanya Siswa Non-Field Trip 🏫 (${mStats.nonFtTotal})`;
    }
    modal.classList.remove('hidden');
    renderModalStudentsList();
  };

  window.closeAssignStudentModal = function() {
    const modal = document.getElementById('modalAssignStudents');
    if (modal) modal.classList.add('hidden');
    modalSelectedNisns.clear();
  };

  let modalStudentSearchDebounce = null;
  let modalVisibleLimit = 80;

  window.onModalStudentFilterChange = function() {
    clearTimeout(modalStudentSearchDebounce);
    modalStudentSearchDebounce = setTimeout(function() {
      const selRombel = document.getElementById('modalFilterRombel');
      const selCat = document.getElementById('modalFilterCategory');
      const inSearch = document.getElementById('modalSearchStudent');

      studentModalFilter.rombel = selRombel ? selRombel.value : 'ALL';
      studentModalFilter.category = selCat ? selCat.value : 'ALL';
      studentModalFilter.search = inSearch ? inSearch.value.trim().toLowerCase() : '';
      modalVisibleLimit = 80; // Reset pagination limit saat filter berubah

      renderModalStudentsList();
    }, 100);
  };

  window.setModalGradeFilter = function(grade) {
    studentModalFilter.grade = grade;
    modalVisibleLimit = 80;
    ['ALL', 'X', 'XI', 'XII'].forEach(g => {
      const btn = document.getElementById('btnModalGrade_' + g);
      if (btn) {
        btn.className = (g === grade)
          ? 'flex-1 py-1 text-xs font-bold rounded-lg bg-[#0875D1] text-white shadow-2xs'
          : 'flex-1 py-1 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-800';
      }
    });
    renderModalStudentsList();
  };

  window.loadMoreModalStudents = function() {
    modalVisibleLimit += 100;
    renderModalStudentsList();
  };

  function renderModalStudentsList() {
    const listContainer = document.getElementById('modalStudentListContainer');
    const countInfo = document.getElementById('modalSelectedCountInfo');
    const allStudents = window.FincestemMasterStudents || [];
    if (!listContainer) return;

    // 1. Ambil target role guru yang sedang aktif
    const targetRole = window.FincestemMentorship.getTeacherRole(selectedTeacherKey);
    const roleFilterType = (targetRole === 'KOORDINATOR') ? 'KOORDINATOR' : 'FASILITATOR';

    // 2. OPTIMASI TINGGI (O(1)): Cache data assignment & zona sekali saja sebelum loop!
    const assignMap = window.FincestemMentorship.getAssignmentsMap();
    const currentMentorNisns = new Set();
    const otherMentorByNisn = new Map(); // cleanNisn -> { teacher_key, teacher_name }

    // Indeks guru dan siswa binaannya sekali saja
    for (const [tKey, entry] of Object.entries(assignMap)) {
      if (!entry || !Array.isArray(entry.student_nisns)) continue;
      const r = window.FincestemMentorship.getTeacherRole(tKey);
      const isTarget = (tKey === selectedTeacherKey);

      if (isTarget) {
        entry.student_nisns.forEach(n => {
          const sN = String(n).trim();
          if (sN) {
            currentMentorNisns.add(sN);
            const digits = sN.replace(/\D/g, '');
            if (digits) {
              currentMentorNisns.add(digits.padStart(10, '0'));
              currentMentorNisns.add(digits.replace(/^0+/, ''));
            }
          }
        });
      } else {
        const tObj = window.FincestemMentorship.findTeacherByIdentifier(tKey);
        const tInfo = {
          teacher_key: tKey,
          teacher_name: (tObj && tObj.nama_guru) || entry.teacher_name || tKey
        };
        entry.student_nisns.forEach(n => {
          const sN = String(n).trim();
          if (sN) {
            otherMentorByNisn.set(sN, tInfo);
            const digits = sN.replace(/\D/g, '');
            if (digits) {
              otherMentorByNisn.set(digits.padStart(10, '0'), tInfo);
              otherMentorByNisn.set(digits.replace(/^0+/, ''), tInfo);
            }
          }
        });
      }
    }

    // Cache zona siswa dari localStorage sekali saja
    let studentZonesMap = {};
    try {
      const zRaw = localStorage.getItem('fincestem_student_zones_map');
      if (zRaw) studentZonesMap = JSON.parse(zRaw) || {};
    } catch(e) {}

    // Helper O(1) cek Field Trip tanpa panggil getStudentZone berulang-ulang
    const checkIsFT = (sNisn, sObj) => {
      const rawDigits = sNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : sNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const z = studentZonesMap[sNisn] || studentZonesMap[paddedNisn] || (unpaddedNisn ? studentZonesMap[unpaddedNisn] : null) || sObj.zone;
      if (z) {
        const zUp = String(z).toUpperCase();
        return zUp.includes('LUAR') || zUp.includes('FIELD') || zUp.includes('TRIP');
      }
      return (sObj.zone === 'FINCESTEM LUAR OKU TIMUR' || sObj.is_field_trip === true);
    };

    // 3. Filter data siswa dengan O(1) checks
    const gradeFilter = studentModalFilter.grade;
    const rombelFilter = studentModalFilter.rombel;
    const catFilter = studentModalFilter.category;
    const searchFilter = studentModalFilter.search;

    const normRombel = (rombelFilter !== 'ALL') ? rombelFilter.replace(/^KELAS\s+/i, '').trim().toUpperCase() : null;

    const filtered = [];
    for (let i = 0; i < allStudents.length; i++) {
      const s = allStudents[i];
      const sNisn = String(s.nisn || '').trim();

      // Cek apakah sudah dibina oleh guru ini
      if (currentMentorNisns.has(sNisn)) continue;

      // Filter Tingkat
      const sClass = (s.class || s.rombel || '').toUpperCase();
      if (gradeFilter !== 'ALL') {
        const sLvl = String(s.level || '').toUpperCase();
        if (sLvl !== gradeFilter && !sClass.includes(' ' + gradeFilter + '.') && !sClass.startsWith(gradeFilter + '.')) continue;
      }

      // Filter Rombel
      if (normRombel !== null) {
        const normS = sClass.replace(/^KELAS\s+/i, '').trim().toUpperCase();
        if (normS !== normRombel) continue;
      }

      // Cek FT dan pembina lain O(1)
      const isFT = checkIsFT(sNisn, s);
      const otherT = otherMentorByNisn.get(sNisn) || null;
      const isAssignedSameRole = (otherT !== null);

      // Filter Kategori
      if (catFilter === 'FIELD_TRIP' && !isFT) continue;
      if (catFilter === 'NON_FIELD_TRIP' && isFT) continue;
      if (catFilter === 'UNASSIGNED' && isAssignedSameRole) continue;

      // Filter Search
      if (searchFilter) {
        const matchName = (s.nama || '').toLowerCase().includes(searchFilter);
        const matchNisn = sNisn.includes(searchFilter);
        if (!matchName && !matchNisn) continue;
      }

      // Simpan objek dengan metadata terhitung untuk menghindari hitung ulang saat render HTML
      filtered.push({
        s,
        sNisn,
        isFT,
        otherT
      });
    }

    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong class="text-[#0875D1] font-black">${modalSelectedNisns.size}</strong> siswa | Menampilkan ${filtered.length} siswa`;
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          <span class="material-symbols-outlined text-3xl text-slate-300 block mb-1">search_off</span>
          Tidak ada siswa yang sesuai dengan filter pencarian.<br>
          <span class="text-[11px] text-slate-400">Ubah filter Kategori atau Rombel di atas untuk melihat siswa lainnya.</span>
        </div>
      `;
      return;
    }

    // 4. Render Chunk Cepat (Max modalVisibleLimit siswa terlebih dahulu untuk jaminan 60 FPS!)
    const visibleChunk = filtered.slice(0, modalVisibleLimit);
    let html = '';
    for (let i = 0; i < visibleChunk.length; i++) {
      const item = visibleChunk[i];
      const s = item.s;
      const sNisn = item.sNisn;
      const isFT = item.isFT;
      const otherT = item.otherT;
      const isChecked = modalSelectedNisns.has(sNisn);

      let otherMentorBadge = '';
      if (otherT) {
        otherMentorBadge = `<span class="text-[9.5px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200" title="Akan dipindahkan dari pembina lama">Pindah dari: ${escapeHtml(otherT.teacher_name)}</span>`;
      }

      html += `
        <label id="lblStudent_${sNisn}" class="p-2.5 rounded-xl border ${isChecked ? 'bg-blue-50/80 border-blue-400 shadow-2xs' : 'bg-white border-slate-200'} hover:border-slate-300 flex items-center justify-between gap-3 cursor-pointer transition-all select-none">
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <input type="checkbox" onchange="toggleModalStudentCheckbox('${sNisn}', this.checked)" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-[#0875D1] focus:ring-0 cursor-pointer">
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-extrabold text-xs text-slate-800 truncate">${escapeHtml(s.nama || '-')}</span>
                ${isFT ? `<button type="button" onclick="event.preventDefault(); event.stopPropagation(); toggleMentorStudentZoneAction('${sNisn}', 'FINCESTEM OKU TIMUR');" class="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-2xs" title="Klik untuk beralih ke Non-FT">🚌 FT</button>` : `<button type="button" onclick="event.preventDefault(); event.stopPropagation(); toggleMentorStudentZoneAction('${sNisn}', 'FINCESTEM LUAR OKU TIMUR');" class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-100 hover:bg-teal-200 text-teal-800 border border-teal-200 cursor-pointer shadow-2xs" title="Klik untuk beralih ke Field Trip">🏫 Non-FT</button>`}
                ${otherMentorBadge}
              </div>
              <div class="text-[10.5px] text-slate-500 font-medium">
                <span>NISN: ${escapeHtml(sNisn)}</span> • <span>${escapeHtml(s.class || s.rombel || '-')}</span>
              </div>
            </div>
          </div>
        </label>
      `;
    }

    if (filtered.length > modalVisibleLimit) {
      const remaining = filtered.length - modalVisibleLimit;
      html += `
        <div class="p-3 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center gap-1.5 mt-1">
          <span class="text-xs text-slate-500 font-medium">Menampilkan ${visibleChunk.length} dari ${filtered.length} siswa (masih ada ${remaining} siswa lainnya).</span>
          <button type="button" onclick="loadMoreModalStudents()" class="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 font-bold text-xs transition-all cursor-pointer">
            Tampilkan 100 Siswa Lagi (+100)
          </button>
        </div>
      `;
    }

    listContainer.innerHTML = html;
  }

  window.toggleModalStudentCheckbox = function(nisn, checked) {
    if (checked) {
      modalSelectedNisns.add(nisn);
    } else {
      modalSelectedNisns.delete(nisn);
    }
    const lbl = document.getElementById('lblStudent_' + nisn);
    if (lbl) {
      if (checked) {
        lbl.className = 'p-2.5 rounded-xl border bg-blue-50/80 border-blue-400 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition-all select-none';
      } else {
        lbl.className = 'p-2.5 rounded-xl border bg-white border-slate-200 hover:border-slate-300 flex items-center justify-between gap-3 cursor-pointer transition-all select-none';
      }
    }
    const countInfo = document.getElementById('modalSelectedCountInfo');
    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong class="text-[#0875D1] font-black">${modalSelectedNisns.size}</strong> siswa`;
    }
  };

  window.modalSelectAllVisible = function(select) {
    const listContainer = document.getElementById('modalStudentListContainer');
    if (!listContainer) return;
    const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = select;
      const nisnMatch = cb.getAttribute('onchange')?.match(/'([^']+)'/);
      if (nisnMatch && nisnMatch[1]) {
        const n = nisnMatch[1];
        if (select) modalSelectedNisns.add(n);
        else modalSelectedNisns.delete(n);

        const lbl = document.getElementById('lblStudent_' + n);
        if (lbl) {
          if (select) {
            lbl.className = 'p-2.5 rounded-xl border bg-blue-50/80 border-blue-400 shadow-2xs flex items-center justify-between gap-3 cursor-pointer transition-all select-none';
          } else {
            lbl.className = 'p-2.5 rounded-xl border bg-white border-slate-200 hover:border-slate-300 flex items-center justify-between gap-3 cursor-pointer transition-all select-none';
          }
        }
      }
    });
    const countInfo = document.getElementById('modalSelectedCountInfo');
    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong class="text-[#0875D1] font-black">${modalSelectedNisns.size}</strong> siswa`;
    }
  };

  window.submitAssignStudentsModal = function() {
    if (!selectedTeacherKey || modalSelectedNisns.size === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu dengan mencentang kotak pada daftar!');
      return;
    }

    const nisnArray = Array.from(modalSelectedNisns);
    const success = window.FincestemMentorship.assignStudentsToTeacher(selectedTeacherKey, nisnArray);

    if (success) {
      alert(`Berhasil menetapkan ${nisnArray.length} siswa ke guru ini!`);
      closeAssignStudentModal();
      renderMentorshipStats();
      renderPlottingView();
      if (typeof window.renderRekapFasilView === 'function') window.renderRekapFasilView();
    } else {
      alert('Gagal menetapkan siswa.');
    }
  };

  /**
   * ==========================================
   * SUB-TAB 2: KELOLA AKUN GURU (TAMBAH MANUAL)
   * ==========================================
   */
  function renderTeachersListView() {
    if (!window.FincestemMentorship) return;
    const teachers = window.FincestemMentorship.getTeachers();
    const tableBody = document.getElementById('tableBodyAllTeachersMentor');
    const map = window.FincestemMentorship.getAssignmentsMap();
    const inSearch = document.getElementById('searchTeacherMentor');
    const query = inSearch ? inSearch.value.trim().toLowerCase() : '';

    if (!tableBody) return;

    let filtered = teachers.filter(t => {
      if (!query) return true;
      return (t.nama_guru || '').toLowerCase().includes(query) ||
             String(t.nip || '').includes(query) ||
             String(t.username || '').toLowerCase().includes(query) ||
             String(t.kode_guru || '').toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-400 text-xs">Tidak ada guru yang sesuai pencarian.</td></tr>`;
      return;
    }

    let html = '';
    filtered.forEach((t, idx) => {
      const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
      const role = window.FincestemMentorship.getTeacherRole(k);
      const studentCount = window.FincestemMentorship.getAssignedNisnsForTeacher(k).length;
      const isCustom = !!t.is_custom;

      let roleBadge = '';
      if (role === 'FIELD_TRIP') {
        roleBadge = `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-black bg-amber-500 text-slate-950">🚌 Field Trip</span>`;
      } else if (role === 'KOORDINATOR') {
        roleBadge = `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-black bg-cyan-700 text-white">🎯 Koord</span>`;
      } else {
        roleBadge = `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-100 text-teal-800 border border-teal-200">🏫 Non-FT</span>`;
      }

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
          <td class="py-2.5 px-3 text-center font-bold text-slate-400 text-xs">${idx + 1}</td>
          <td class="py-2.5 px-3 font-extrabold text-slate-800 text-xs">
            <span>${escapeHtml(t.nama_guru || '-')}</span>
            ${isCustom ? '<span class="ml-1 text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">Manual Tambahan</span>' : ''}
            <span class="text-[10.5px] text-slate-400 font-semibold block">Mapel: ${escapeHtml(t.mata_pelajaran || '-')}</span>
          </td>
          <td class="py-2.5 px-3 font-mono text-slate-600 text-xs">${escapeHtml(t.nip || '-')}</td>
          <td class="py-2.5 px-3 font-mono font-bold text-slate-700 text-xs">
            <div>User: <strong class="text-[#0875D1]">${escapeHtml(t.username || '-')}</strong></div>
            <div class="text-[10px] text-slate-400">Pass: <strong>${escapeHtml(t.password || 'Fincestem2026!')}</strong></div>
          </td>
          <td class="py-2.5 px-3 text-center">${roleBadge}</td>
          <td class="py-2.5 px-3 text-center font-black ${studentCount > 0 ? 'text-[#0875D1]' : 'text-slate-300'} text-xs">
            ${studentCount} Siswa
          </td>
          <td class="py-2.5 px-3 text-center">
            <div class="flex items-center justify-center gap-1">
              <button type="button" onclick="quickJumpToPlottingForTeacher('${k}')" class="px-2.5 py-1 rounded-lg bg-[#0875D1]/10 text-[#0875D1] hover:bg-[#0875D1] hover:text-white font-bold text-[11px] transition-all cursor-pointer" title="Plot Siswa Binaan">
                <span>Plot Siswa</span>
              </button>
              ${isCustom ? `
                <button type="button" onclick="deleteCustomTeacherAction('${k}')" class="p-1 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer" title="Hapus Guru Tambahan">
                  <span class="material-symbols-outlined text-base">delete</span>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html;
  }

  window.onSearchTeacherMentorChange = function() {
    renderTeachersListView();
  };

  window.quickJumpToPlottingForTeacher = function(teacherKey) {
    selectedTeacherKey = teacherKey;
    switchMentorshipSubTab('plotting');
    const select = document.getElementById('selectMentorTeacher');
    if (select) select.value = teacherKey;
    renderSelectedTeacherDetail();
  };

  window.deleteCustomTeacherAction = function(teacherKey) {
    if (confirm('Hapus akun guru tambahan ini beserta seluruh pemetaan binaannya?')) {
      window.FincestemMentorship.deleteCustomTeacher(teacherKey);
      renderMentorshipStats();
      renderTeachersListView();
    }
  };

  /**
   * FORM MODAL: TAMBAH GURU BARU MANUAL
   */
  window.openAddTeacherModal = function() {
    const modal = document.getElementById('modalAddTeacherManual');
    if (modal) modal.classList.remove('hidden');
  };

  window.closeAddTeacherModal = function() {
    const modal = document.getElementById('modalAddTeacherManual');
    if (modal) modal.classList.add('hidden');
  };

  window.submitAddTeacherManualForm = function() {
    const inName = document.getElementById('addTeacher_nama');
    const inNip = document.getElementById('addTeacher_nip');
    const inMapel = document.getElementById('addTeacher_mapel');
    const inUser = document.getElementById('addTeacher_username');
    const inPass = document.getElementById('addTeacher_password');
    const inRole = document.getElementById('addTeacher_role');

    const nama = inName ? inName.value.trim() : '';
    const nip = inNip ? inNip.value.trim() : '-';
    const mapel = inMapel ? inMapel.value.trim() : 'Fasilitator Kokurikuler';
    const username = inUser ? inUser.value.trim() : '';
    const password = inPass ? inPass.value.trim() : 'Fincestem2026!';
    const roleCat = inRole ? inRole.value : 'NON_FIELD_TRIP';

    if (!nama || !username) {
      alert('Nama guru dan Username wajib diisi!');
      return;
    }

    const res = window.FincestemMentorship.saveNewTeacher({
      nama_guru: nama,
      nip: nip,
      mata_pelajaran: mapel,
      username: username,
      password: password,
      role_category: roleCat
    });

    if (res.success) {
      alert(res.message);
      closeAddTeacherModal();
      // Reset form
      if (inName) inName.value = '';
      if (inNip) inNip.value = '';
      if (inUser) inUser.value = '';
      renderMentorshipStats();
      renderTeachersListView();
    } else {
      alert(res.message);
    }
  };


  /* ==========================================================================
     SUB-TAB 3: REKAP SISWA BINAAN PER-FASILITATOR (BISA CETAK)
     ========================================================================== */

  let rekapFasilCachedData = [];
  let rekapSelectedTeacherKey = null;

  function getStudentNormalizedClass(s) {
    if (!s) return '';
    return String(s.class || s.kelas || s.class_name || s.rombel || '').replace(/^KELAS\s+/i, '').trim();
  }

  function isStudentFieldTripRekap(s) {
    if (!s) return false;
    const z = String(s.zone || s.zona || '').toUpperCase();
    return z.includes('LUAR') || z.includes('FIELD') || z.includes('TRIP');
  }

  window.renderRekapFasilView = function() {
    if (!window.FincestemMentorship) return;

    const allTeachers = window.FincestemMentorship.getTeachers() || [];

    // Kumpulkan data rekap per fasilitator
    let totalAssignedStudents = 0;
    let totalAssignedFT = 0;
    let totalAssignedNonFT = 0;
    let activeTeachersCount = 0;
    const allClassesSet = new Set();

    rekapFasilCachedData = allTeachers.map(t => {
      const key = String(t.username || t.nip || t.kode_guru).trim().toLowerCase();
      const students = window.FincestemMentorship.getStudentsForTeacher(key) || [];
      const role = window.FincestemMentorship.getTeacherRole(key) || (t.tugas_tambahan === 'KEPALA SEKOLAH' ? 'KEPALA SEKOLAH' : 'FASILITATOR');

      const classCounts = {};
      let ftCount = 0;
      students.forEach(s => {
        const cls = getStudentNormalizedClass(s) || 'Tanpa Kelas';
        classCounts[cls] = (classCounts[cls] || 0) + 1;
        allClassesSet.add(cls);
        if (isStudentFieldTripRekap(s)) ftCount++;
      });

      const totalCount = students.length;
      if (totalCount > 0) {
        activeTeachersCount++;
        totalAssignedStudents += totalCount;
        totalAssignedFT += ftCount;
        totalAssignedNonFT += (totalCount - ftCount);
      }

      return {
        key: key,
        rawTeacher: t,
        nama_guru: t.nama_guru || 'Tanpa Nama',
        nip: t.nip && t.nip !== '-' ? t.nip : (t.kode_guru || '-'),
        mata_pelajaran: t.mata_pelajaran || 'Fasilitator',
        role: role,
        students: students,
        total: totalCount,
        ftCount: ftCount,
        nonFtCount: totalCount - ftCount,
        classCounts: classCounts,
        classesList: Object.keys(classCounts).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      };
    });

    // Urutkan default: Guru dengan binaan terbanyak di atas, lalu abjad nama
    rekapFasilCachedData.sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.nama_guru.localeCompare(b.nama_guru);
    });

    // 1. Update KPI Summary Cards
    const elTotalT = document.getElementById('rekapFasilKpiTotalTeachers');
    const elActiveT = document.getElementById('rekapFasilKpiActiveTeachers');
    const elTotalS = document.getElementById('rekapFasilKpiTotalAssignedStudents');
    const elSubS = document.getElementById('rekapFasilKpiAssignedSub');
    const elAvgLoad = document.getElementById('rekapFasilKpiAverageLoad');

    if (elTotalT) elTotalT.textContent = `${allTeachers.length} Guru`;
    if (elActiveT) elActiveT.textContent = `${activeTeachersCount} Guru`;
    if (elTotalS) elTotalS.textContent = `${totalAssignedStudents} Siswa`;
    if (elSubS) elSubS.textContent = `🚌 ${totalAssignedFT} Field Trip • 🌾 ${totalAssignedNonFT} Non-FT`;
    const avg = activeTeachersCount > 0 ? (totalAssignedStudents / activeTeachersCount).toFixed(1) : '0';
    if (elAvgLoad) elAvgLoad.textContent = `${avg} Siswa/Guru`;

    // 2. Populate Dropdown Filter Kelas
    const selClass = document.getElementById('selectFilterRekapClass');
    if (selClass) {
      const curCls = selClass.value || 'ALL';
      const sortedClasses = Array.from(allClassesSet).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      let clsHtml = '<option value="ALL">Semua Kelas</option>';
      sortedClasses.forEach(c => {
        clsHtml += `<option value="${escapeHtml(c)}" ${curCls === c ? 'selected' : ''}>Kelas ${escapeHtml(c)}</option>`;
      });
      selClass.innerHTML = clsHtml;
    }

    // 3. Populate Dropdown Pemilih Guru Spesifik
    const selTeacher = document.getElementById('selectRekapTeacher');
    if (selTeacher) {
      const curTeacherVal = selTeacher.value;
      let optHtml = '<option value="">-- Pilih Guru Fasilitator untuk Rincian &amp; Cetak Lembar --</option>';
      rekapFasilCachedData.forEach(t => {
        const clsLabel = t.classesList.length > 0 ? ` • Kelas: ${t.classesList.join(', ')}` : '';
        const countLabel = t.total > 0 ? ` (${t.total} Siswa${clsLabel})` : ' (0 Siswa)';
        optHtml += `<option value="${escapeHtml(t.key)}" ${curTeacherVal === t.key ? 'selected' : ''}>${escapeHtml(t.nama_guru)}${escapeHtml(countLabel)}</option>`;
      });
      selTeacher.innerHTML = optHtml;
    }

    // 4. Render Master Table
    filterRekapFasilTable();

    // 5. Render Detail Guru jika sebelumnya sudah terpilih
    if (rekapSelectedTeacherKey) {
      renderRekapTeacherDetail(rekapSelectedTeacherKey);
    } else {
      closeRekapTeacherDetail();
    }
  };

  function filterRekapFasilTable() {
    const searchInput = document.getElementById('inputSearchRekapFasil');
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const statusVal = document.getElementById('selectFilterRekapStatus')?.value || 'ASSIGNED_ONLY';
    const classVal = document.getElementById('selectFilterRekapClass')?.value || 'ALL';
    const tbody = document.getElementById('tableBodyMasterRekapFasil');
    const tfoot = document.getElementById('tableFootMasterRekapFasil');
    if (!tbody) return;

    let filtered = rekapFasilCachedData.filter(t => {
      // Filter status
      if (statusVal === 'ASSIGNED_ONLY' && t.total === 0) return false;
      if (statusVal === 'ZERO_ONLY' && t.total > 0) return false;

      // Filter kelas
      if (classVal !== 'ALL') {
        if (!t.classesList.includes(classVal)) return false;
      }

      // Filter pencarian teks (nama, nip, atau kelas)
      if (searchVal) {
        const matchName = t.nama_guru.toLowerCase().includes(searchVal);
        const matchNip = String(t.nip).toLowerCase().includes(searchVal);
        const matchClass = t.classesList.some(c => c.toLowerCase().includes(searchVal));
        if (!matchName && !matchNip && !matchClass) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-10 text-center text-slate-400">
            <span class="material-symbols-outlined text-4xl block mb-1 text-slate-300">search_off</span>
            <span class="font-bold text-slate-600">Tidak ada data fasilitator yang cocok.</span>
            <p class="text-[11px] text-slate-400 mt-0.5">Coba sesuaikan kata kunci pencarian atau ubah opsi filter di atas.</p>
          </td>
        </tr>
      `;
      if (tfoot) tfoot.innerHTML = '';
      return;
    }

    let sumStudents = 0;
    let sumFT = 0;
    let sumNonFT = 0;

    let rowsHtml = '';
    filtered.forEach((t, i) => {
      sumStudents += t.total;
      sumFT += t.ftCount;
      sumNonFT += t.nonFtCount;

      // Badges kelas yang dibina
      let classBadgesHtml = '';
      if (t.classesList.length > 0) {
        classBadgesHtml = '<div class="flex items-center gap-1.5 flex-wrap">';
        t.classesList.forEach(cls => {
          const cCount = t.classCounts[cls] || 0;
          classBadgesHtml += `<span class="px-2 py-0.5 rounded-md text-[10.5px] font-black bg-indigo-50 text-indigo-900 border border-indigo-200" title="${cCount} siswa di kelas ${escapeHtml(cls)}">${escapeHtml(cls)} <span class="text-indigo-600 font-extrabold">(${cCount})</span></span>`;
        });
        classBadgesHtml += '</div>';
      } else {
        classBadgesHtml = '<span class="text-[11px] text-slate-400 italic">Belum ada binaan</span>';
      }

      const roleBadge = t.role === 'KOORDINATOR'
        ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200">Koordinator</span>'
        : (t.role === 'KEPALA SEKOLAH' 
            ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">Kepsek</span>'
            : '<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-teal-100 text-teal-800 border border-teal-200">Fasilitator</span>');

      rowsHtml += `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 ${t.total === 0 ? 'opacity-60 bg-slate-50/40' : ''}">
          <td class="py-3 px-3 text-center font-bold text-slate-500">${i + 1}</td>
          <td class="py-3 px-3">
            <div class="flex flex-col">
              <span class="font-extrabold text-slate-900 text-xs sm:text-[13px] hover:text-indigo-700 cursor-pointer" onclick="selectAndFocusRekapTeacher('${escapeHtml(t.key)}')">${escapeHtml(t.nama_guru)}</span>
              <span class="text-[10.5px] text-slate-400">NIP: ${escapeHtml(t.nip)} &bull; ${escapeHtml(t.mata_pelajaran)}</span>
            </div>
          </td>
          <td class="py-3 px-3 text-center">${roleBadge}</td>
          <td class="py-3 px-3">${classBadgesHtml}</td>
          <td class="py-3 px-3 text-center">
            ${t.total > 0 
              ? `<span class="px-3 py-1 rounded-xl text-xs font-black bg-indigo-600 text-white shadow-2xs">${t.total} Siswa</span>`
              : '<span class="px-2 py-0.5 rounded-lg text-[11px] font-bold text-slate-400 bg-slate-100 border border-slate-200">0 Siswa</span>'}
          </td>
          <td class="py-3 px-3 text-center">
            ${t.total > 0
              ? `<div class="flex items-center justify-center gap-1.5 text-[10.5px]">
                  <span class="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 font-extrabold border border-amber-200" title="Field Trip">${t.ftCount} FT</span>
                  <span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200" title="Non-Field Trip">${t.nonFtCount} NFT</span>
                </div>`
              : '<span class="text-[10.5px] text-slate-400">-</span>'}
          </td>
          <td class="py-3 px-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" onclick="selectAndFocusRekapTeacher('${escapeHtml(t.key)}')" class="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[11px] flex items-center gap-1 border border-indigo-200 transition-all cursor-pointer" title="Lihat rincian nama-nama siswa binaan guru ini">
                <span class="material-symbols-outlined text-sm">visibility</span>
                <span>Rincian</span>
              </button>
              ${t.total > 0 ? `
              <button type="button" onclick="printRekapSingleFasil('${escapeHtml(t.key)}')" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-extrabold text-[11px] flex items-center gap-1 border border-slate-200 transition-all cursor-pointer" title="Cetak Lembar Pembinaan Guru Ini">
                <span class="material-symbols-outlined text-sm text-indigo-600">print</span>
                <span>Cetak</span>
              </button>` : ''}
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = rowsHtml;

    if (tfoot) {
      tfoot.innerHTML = `
        <tr>
          <td colspan="4" class="py-3 px-3 text-right uppercase tracking-wider font-extrabold text-slate-600">
            TOTAL KESELURUHAN (${filtered.length} Guru):
          </td>
          <td class="py-3 px-3 text-center text-indigo-900 font-black text-sm">${sumStudents} Siswa</td>
          <td class="py-3 px-3 text-center text-slate-700 text-xs">
            <span class="text-amber-800 font-extrabold">${sumFT} FT</span> • <span class="text-emerald-800 font-extrabold">${sumNonFT} NFT</span>
          </td>
          <td></td>
        </tr>
      `;
    }
  };

  function onRekapTeacherSelectChange() {
    const sel = document.getElementById('selectRekapTeacher');
    const key = sel ? sel.value : '';
    if (key) {
      selectAndFocusRekapTeacher(key);
    } else {
      closeRekapTeacherDetail();
    }
  };

  function selectAndFocusRekapTeacher(key) {
    rekapSelectedTeacherKey = key;
    const sel = document.getElementById('selectRekapTeacher');
    if (sel && sel.value !== key) {
      sel.value = key;
    }
    renderRekapTeacherDetail(key);

    const cardDetail = document.getElementById('containerRekapTeacherDetail');
    if (cardDetail) {
      cardDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  function closeRekapTeacherDetail() {
    rekapSelectedTeacherKey = null;
    const sel = document.getElementById('selectRekapTeacher');
    if (sel) sel.value = '';
    const container = document.getElementById('containerRekapTeacherDetail');
    if (container) container.classList.add('hidden');
  };

  function renderRekapTeacherDetail(key) {
    const container = document.getElementById('containerRekapTeacherDetail');
    if (!container) return;

    const teacherData = rekapFasilCachedData.find(t => t.key === key);
    if (!teacherData) {
      container.classList.add('hidden');
      return;
    }

    container.classList.remove('hidden');

    const elInit = document.getElementById('detailRekapTeacherInitial');
    const elName = document.getElementById('detailRekapTeacherName');
    const elNip = document.getElementById('detailRekapTeacherNip');
    const elTotal = document.getElementById('detailRekapTeacherTotalStudents');
    const elBreak = document.getElementById('detailRekapTeacherBreakdown');
    const elRole = document.getElementById('detailRekapTeacherRoleBadge');
    const elClasses = document.getElementById('detailRekapTeacherClassBadges');
    const tbody = document.getElementById('tableBodyRekapTeacherStudents');

    if (elInit) elInit.textContent = (teacherData.nama_guru || 'G').charAt(0).toUpperCase();
    if (elName) elName.textContent = teacherData.nama_guru;
    if (elNip) elNip.textContent = teacherData.nip;
    if (elTotal) elTotal.textContent = `${teacherData.total} Siswa`;
    if (elBreak) elBreak.textContent = `🚌 ${teacherData.ftCount} Field Trip • 🌾 ${teacherData.nonFtCount} Non-FT`;
    if (elRole) {
      elRole.textContent = teacherData.role;
      elRole.className = teacherData.role === 'KOORDINATOR'
        ? 'px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200'
        : 'px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-100 text-indigo-800 border border-indigo-200';
    }

    if (elClasses) {
      if (teacherData.classesList.length > 0) {
        elClasses.innerHTML = teacherData.classesList.map(c => `
          <span class="px-2 py-0.5 rounded-md text-[10.5px] font-black bg-white text-indigo-800 border border-indigo-200 shadow-2xs">
            Kelas ${escapeHtml(c)} (${teacherData.classCounts[c]} siswa)
          </span>
        `).join('');
      } else {
        elClasses.innerHTML = '<span class="text-[11px] text-slate-400 italic">Belum ada siswa binaan yang di-assign.</span>';
      }
    }

    if (tbody) {
      if (teacherData.students.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-8 text-center text-slate-400">
              <span class="material-symbols-outlined text-3xl block mb-1">person_off</span>
              Guru ini belum memiliki siswa binaan. Anda dapat membagikan siswa di tab <strong>2. Plotting per-Guru Pembina</strong>.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = teacherData.students.map((s, idx) => {
          const isFT = isStudentFieldTripRekap(s);
          const sClass = getStudentNormalizedClass(s) || '-';
          return `
            <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100">
              <td class="py-2.5 px-3 text-center font-bold text-slate-500">${idx + 1}</td>
              <td class="py-2.5 px-3 font-mono text-[11px] text-slate-600">${escapeHtml(s.nisn || '-')}</td>
              <td class="py-2.5 px-3 font-mono text-[11px] text-slate-600">${escapeHtml(s.nis || '-')}</td>
              <td class="py-2.5 px-3 font-bold text-slate-800">${escapeHtml(s.nama || s.name || '-')}</td>
              <td class="py-2.5 px-3 text-center font-extrabold text-indigo-700">${escapeHtml(sClass)}</td>
              <td class="py-2.5 px-3 text-center">
                ${isFT 
                  ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">Field Trip</span>'
                  : '<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">Non-Field Trip</span>'}
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  /* ==========================================================================
     CETAK DOKUMEN RESMI REKAPITULASI (A4 LANDSCAPE & PORTRAIT PRINT-READY)
     ========================================================================== */

  // Helper template Kop Resmi SMAN 1 Belitang
  function getPrintKopHeaderHtml() {
    return `
      <div style="border-bottom: 3px double #000; padding-bottom: 6px; margin-bottom: 12px; text-align: center; line-height: 1.25;">
        <div style="font-size: 13pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">PEMERINTAH PROVINSI SUMATERA SELATAN</div>
        <div style="font-size: 12pt; font-weight: bold; text-transform: uppercase;">DINAS PENDIDIKAN</div>
        <div style="font-size: 16pt; font-weight: 900; text-transform: uppercase; margin: 2px 0;">SMA NEGERI 1 BELITANG</div>
        <div style="font-size: 8.5pt; color: #1e293b;">Jl. Siliwangi No. 01, Gumawang, Kec. Belitang, Kab. OKU Timur, Sumatera Selatan 32382</div>
        <div style="font-size: 8.5pt; color: #1e293b;">NPSN: 10606456 | Akreditasi: A | Laman: kokurikulersman1belitang.site</div>
      </div>
    `;
  }

  // 1. Cetak Rekapitulasi Seluruh Fasilitator
  function printRekapAllFasil() {
    if (!rekapFasilCachedData || rekapFasilCachedData.length === 0) {
      if (window.renderRekapFasilView) window.renderRekapFasilView();
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Pop-up terblokir oleh browser. Harap izinkan pop-up untuk mencetak dokumen!');
      return;
    }

    const activeList = rekapFasilCachedData.filter(t => t.total > 0);
    const zeroList = rekapFasilCachedData.filter(t => t.total === 0);

    let grandStudents = 0;
    let grandFT = 0;
    let grandNonFT = 0;

    const rowsHtml = activeList.map((t, idx) => {
      grandStudents += t.total;
      grandFT += t.ftCount;
      grandNonFT += t.nonFtCount;

      const classesStr = t.classesList.map(c => `${c} (${t.classCounts[c]})`).join(', ');

      return `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td>
            <strong>${escapeHtml(t.nama_guru)}</strong><br>
            <span style="font-size: 8pt; color: #475569;">NIP. ${escapeHtml(t.nip)}</span>
          </td>
          <td style="text-align: center;">${escapeHtml(t.role)}</td>
          <td>${escapeHtml(classesStr || '-')}</td>
          <td style="text-align: center; font-weight: bold;">${t.total}</td>
          <td style="text-align: center;">${t.ftCount}</td>
          <td style="text-align: center;">${t.nonFtCount}</td>
          <td style="text-align: left; font-size: 8pt; color: #94a3b8; height: 28px;">${idx + 1}. .........</td>
        </tr>
      `;
    }).join('');

    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const docHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Rekapitulasi_Siswa_Binaan_Fasilitator_2026</title>
  <style>
    @page { size: A4 landscape; margin: 12mm 15mm; }
    body { font-family: Arial, sans-serif; font-size: 9pt; color: #000; margin: 0; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 8.5pt; }
    th, td { border: 1px solid #333; padding: 5px 6px; }
    th { background-color: #f1f5f9; text-transform: uppercase; font-size: 8pt; }
    .kpi-bar { display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 12px; margin-bottom: 8px; font-size: 8.5pt; }
    .signature-row { display: flex; justify-content: space-between; margin-top: 25px; page-break-inside: avoid; }
    .sig-box { width: 42%; text-align: center; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  ${getPrintKopHeaderHtml()}

  <div style="text-align: center; margin-bottom: 12px;">
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
      REKAPITULASI PENUGASAN SISWA BINAAN FASILITATOR KOKURIKULER
    </div>
    <div style="font-size: 9pt; margin-top: 2px;">
      Tahun Pelajaran 2026/2027 • Tema: Finansial, Budaya &amp; STEM
    </div>
  </div>

  <div class="kpi-bar">
    <div><strong>Total Guru Aktif:</strong> ${activeList.length} Orang</div>
    <div><strong>Total Siswa Terbagi:</strong> ${grandStudents} Siswa</div>
    <div><strong>Rincian Jalur:</strong> ${grandFT} Peserta Field Trip &bull; ${grandNonFT} Peserta Non-Field Trip</div>
    <div><strong>Dicetak Pada:</strong> ${dateStr}</div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 25px;">No</th>
        <th>Nama Guru Fasilitator &amp; NIP</th>
        <th style="width: 85px;">Peran</th>
        <th>Rombel / Kelas yang Dibina (Jml Siswa)</th>
        <th style="width: 55px;">Total Binaan</th>
        <th style="width: 50px;">Field Trip</th>
        <th style="width: 50px;">Non-FT</th>
        <th style="width: 90px;">Tanda Tangan</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
    <tfoot>
      <tr style="font-weight: bold; background: #f8fafc;">
        <td colspan="4" style="text-align: right; text-transform: uppercase;">Total Keseluruhan:</td>
        <td style="text-align: center;">${grandStudents}</td>
        <td style="text-align: center;">${grandFT}</td>
        <td style="text-align: center;">${grandNonFT}</td>
        <td></td>
      </tr>
    </tfoot>
  </table>

  <div class="signature-row">
    <div class="sig-box">
      <div>Mengetahui,</div>
      <div style="margin-bottom: 50px;">Koordinator Kokurikuler</div>
      <div style="font-weight: bold; text-decoration: underline;">TIM KOORDINATOR PROJEK</div>
      <div>SMAN 1 Belitang</div>
    </div>
    <div class="sig-box">
      <div>Belitang, ${dateStr}</div>
      <div style="margin-bottom: 50px;">Kepala SMA Negeri 1 Belitang</div>
      <div style="font-weight: bold; text-decoration: underline;">HERI PRIYANTO, S.Pd., M.Pd.</div>
      <div>NIP. 198105052007011014</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(docHtml);
    printWin.document.close();
  };

  // 2. Cetak Lembar Siswa Binaan Khusus Guru Tertentu
  function printRekapSingleFasil(targetKey) {
    const key = targetKey || rekapSelectedTeacherKey;
    if (!key) {
      alert('Pilih guru fasilitator terlebih dahulu untuk mencetak lembar pembinaannya!');
      return;
    }

    const t = rekapFasilCachedData.find(item => item.key === key);
    if (!t) {
      alert('Data guru tidak ditemukan!');
      return;
    }

    if (!t.students || t.students.length === 0) {
      alert(`Guru ${t.nama_guru} belum memiliki siswa binaan untuk dicetak.`);
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Pop-up terblokir oleh browser. Harap izinkan pop-up untuk mencetak dokumen!');
      return;
    }

    const classesStr = t.classesList.map(c => `${c} (${t.classCounts[c]} siswa)`).join(', ');

    const rowsHtml = t.students.map((s, idx) => {
      const isFT = isStudentFieldTripRekap(s);
      const cls = getStudentNormalizedClass(s) || '-';
      const gender = s.gender || s.jk || '-';

      return `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td style="text-align: center; font-family: monospace;">${escapeHtml(s.nisn || '-')}</td>
          <td style="text-align: center; font-family: monospace;">${escapeHtml(s.nis || '-')}</td>
          <td><strong>${escapeHtml(s.nama || s.name || '-')}</strong></td>
          <td style="text-align: center;">${escapeHtml(gender)}</td>
          <td style="text-align: center; font-weight: bold;">${escapeHtml(cls)}</td>
          <td style="text-align: center;">${isFT ? 'Field Trip' : 'Non-Field Trip'}</td>
          <td style="text-align: left; font-size: 8pt; color: #94a3b8; height: 26px;">${idx + 1}. .........</td>
        </tr>
      `;
    }).join('');

    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const docHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Lembar_Binaan_${escapeHtml(t.nama_guru.replace(/\s+/g, '_'))}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { font-family: Arial, sans-serif; font-size: 9.5pt; color: #000; margin: 0; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 8.5pt; }
    th, td { border: 1px solid #333; padding: 5px 6px; }
    th { background-color: #f1f5f9; text-transform: uppercase; font-size: 8pt; }
    .info-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 14px; margin-bottom: 10px; font-size: 9pt; line-height: 1.5; }
    .signature-row { display: flex; justify-content: space-between; margin-top: 30px; page-break-inside: avoid; }
    .sig-box { width: 45%; text-align: center; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  ${getPrintKopHeaderHtml()}

  <div style="text-align: center; margin-bottom: 12px;">
    <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; text-decoration: underline;">
      LEMBAR PENUGASAN SISWA BINAAN FASILITATOR KOKURIKULER
    </div>
    <div style="font-size: 9pt; margin-top: 2px;">
      Tahun Pelajaran 2026/2027 • Tema: Finansial, Budaya &amp; STEM
    </div>
  </div>

  <div class="info-box">
    <table style="width: 100%; border: none; margin: 0; font-size: 9pt;">
      <tr style="border: none;">
        <td style="border: none; width: 140px; padding: 2px 0;"><strong>Nama Guru Pembina</strong></td>
        <td style="border: none; width: 15px; padding: 2px 0;">:</td>
        <td style="border: none; padding: 2px 0;"><strong>${escapeHtml(t.nama_guru)}</strong></td>
        <td style="border: none; width: 120px; padding: 2px 0;"><strong>Total Binaan</strong></td>
        <td style="border: none; width: 15px; padding: 2px 0;">:</td>
        <td style="border: none; padding: 2px 0;"><strong>${t.total} Siswa</strong></td>
      </tr>
      <tr style="border: none;">
        <td style="border: none; padding: 2px 0;">NIP / Kode Guru</td>
        <td style="border: none; padding: 2px 0;">:</td>
        <td style="border: none; padding: 2px 0;">${escapeHtml(t.nip)}</td>
        <td style="border: none; padding: 2px 0;">Rincian Jalur</td>
        <td style="border: none; padding: 2px 0;">:</td>
        <td style="border: none; padding: 2px 0;">${t.ftCount} Field Trip &bull; ${t.nonFtCount} Non-FT</td>
      </tr>
      <tr style="border: none;">
        <td style="border: none; padding: 2px 0;">Kelas yang Dibina</td>
        <td style="border: none; padding: 2px 0;">:</td>
        <td colspan="4" style="border: none; padding: 2px 0;"><strong>${escapeHtml(classesStr || '-')}</strong></td>
      </tr>
    </table>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 25px;">No</th>
        <th style="width: 75px;">NISN</th>
        <th style="width: 60px;">NIS</th>
        <th>Nama Lengkap Siswa</th>
        <th style="width: 35px;">L/P</th>
        <th style="width: 65px;">Kelas</th>
        <th style="width: 90px;">Jalur Kegiatan</th>
        <th style="width: 85px;">Paraf / Kehadiran</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="signature-row">
    <div class="sig-box">
      <div>Mengetahui,</div>
      <div style="margin-bottom: 50px;">Koordinator Kokurikuler</div>
      <div style="font-weight: bold; text-decoration: underline;">TIM KOORDINATOR PROJEK</div>
      <div>SMAN 1 Belitang</div>
    </div>
    <div class="sig-box">
      <div>Belitang, ${dateStr}</div>
      <div style="margin-bottom: 50px;">Guru Fasilitator Pembina</div>
      <div style="font-weight: bold; text-decoration: underline;">${escapeHtml(t.nama_guru)}</div>
      <div>NIP. ${escapeHtml(t.nip)}</div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(docHtml);
    printWin.document.close();
  };

  // 3. Ekspor Data Rekap Fasilitator ke format CSV
  function exportRekapFasilCSV() {
    if (!rekapFasilCachedData || rekapFasilCachedData.length === 0) {
      if (window.renderRekapFasilView) window.renderRekapFasilView();
    }

    const csvRows = [
      ['NO', 'NAMA_GURU', 'NIP', 'MATA_PELAJARAN', 'PERAN', 'KELAS_DIBINA', 'TOTAL_BINAAN', 'FIELD_TRIP', 'NON_FIELD_TRIP']
    ];

    rekapFasilCachedData.forEach((t, i) => {
      const classesStr = t.classesList.map(c => `${c} (${t.classCounts[c]})`).join('; ');
      csvRows.push([
        i + 1,
        `"${(t.nama_guru || '').replace(/"/g, '""')}"`,
        `"${(t.nip || '').replace(/"/g, '""')}"`,
        `"${(t.mata_pelajaran || '').replace(/"/g, '""')}"`,
        `"${(t.role || '').replace(/"/g, '""')}"`,
        `"${classesStr.replace(/"/g, '""')}"`,
        t.total,
        t.ftCount,
        t.nonFtCount
      ]);
    });

    const csvContent = '\uFEFF' + csvRows.map(e => e.join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'REKAP_SISWA_BINAAN_FASILITATOR_SMAN1BELITANG_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  window.filterRekapFasilTable = filterRekapFasilTable;
  window.onRekapTeacherSelectChange = onRekapTeacherSelectChange;
  window.selectAndFocusRekapTeacher = selectAndFocusRekapTeacher;
  window.closeRekapTeacherDetail = closeRekapTeacherDetail;
  window.printRekapAllFasil = printRekapAllFasil;
  window.printRekapSingleFasil = printRekapSingleFasil;
  window.exportRekapFasilCSV = exportRekapFasilCSV;

})(window);
