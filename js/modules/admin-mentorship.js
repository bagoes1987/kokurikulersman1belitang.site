/**
 * FINCESTEM 2026 - MODUL UI ADMIN PEMBAGIAN SISWA BINAAN
 * File: js/modules/admin-mentorship.js
 */

(function(window) {
  'use strict';

  let currentSubTab = 'plotting'; // 'plotting' atau 'teachers'
  let selectedTeacherKey = null;
  let modalSelectedNisns = new Set();
  let studentModalFilter = {
    grade: 'ALL',
    rombel: 'ALL',
    category: 'UNASSIGNED', // 'ALL', 'FIELD_TRIP', 'NON_FIELD_TRIP', 'UNASSIGNED'
    search: ''
  };

  window.initAdminMentorshipView = function() {
    renderMentorshipStats();
    switchMentorshipSubTab(currentSubTab);
  };

  window.switchMentorshipSubTab = function(tab) {
    currentSubTab = tab;
    const btnPlot = document.getElementById('btnSubTabMentor_plotting');
    const btnTeach = document.getElementById('btnSubTabMentor_teachers');
    const viewPlot = document.getElementById('subviewMentor_plotting');
    const viewTeach = document.getElementById('subviewMentor_teachers');

    if (tab === 'plotting') {
      if (btnPlot) btnPlot.className = 'flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-[#0875D1] text-white shadow-xs transition-all cursor-pointer';
      if (btnTeach) btnTeach.className = 'flex-1 py-2 px-3 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer';
      if (viewPlot) viewPlot.classList.remove('hidden');
      if (viewTeach) viewTeach.classList.add('hidden');
      renderPlottingView();
    } else {
      if (btnPlot) btnPlot.className = 'flex-1 py-2 px-3 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer';
      if (btnTeach) btnTeach.className = 'flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-[#0875D1] text-white shadow-xs transition-all cursor-pointer';
      if (viewPlot) viewPlot.classList.add('hidden');
      if (viewTeach) viewTeach.classList.remove('hidden');
      renderTeachersListView();
    }
  };

  /**
   * RENDER STATISTIK KPI RINGKASAN
   */
  function renderMentorshipStats() {
    if (!window.FincestemMentorship) return;
    const stats = window.FincestemMentorship.getSummaryStats();

    const elTotal = document.getElementById('mentorStat_total');
    const elAssigned = document.getElementById('mentorStat_assigned');
    const elUnassigned = document.getElementById('mentorStat_unassigned');
    const elTeachers = document.getElementById('mentorStat_teachers');

    if (elTotal) elTotal.textContent = stats.totalStudents.toLocaleString('id-ID');
    if (elAssigned) elAssigned.textContent = `${stats.totalAssigned} Siswa (${stats.ftAssigned} FT • ${stats.nonFtAssigned} Non-FT)`;
    if (elUnassigned) elUnassigned.textContent = `${stats.totalUnassigned} Siswa`;
    if (elTeachers) elTeachers.textContent = `${stats.activeMentorsCount} Aktif Membina (dari ${stats.totalTeachers} Guru)`;
  }

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

      // Urutkan: Guru yang sudah ada binaan di atas, lalu abjad
      const map = window.FincestemMentorship.getAssignmentsMap();
      const sortedTeachers = [...teachers].sort((a, b) => {
        const kA = String(a.username || a.nip || a.kode_guru).toLowerCase();
        const kB = String(b.username || b.nip || b.kode_guru).toLowerCase();
        const countA = (map[kA] && map[kA].student_nisns) ? map[kA].student_nisns.length : 0;
        const countB = (map[kB] && map[kB].student_nisns) ? map[kB].student_nisns.length : 0;
        if (countA !== countB) return countB - countA; // yang terbanyak di atas
        return (a.nama_guru || '').localeCompare(b.nama_guru || '');
      });

      sortedTeachers.forEach(t => {
        const k = String(t.username || t.nip || t.kode_guru).toLowerCase();
        const count = (map[k] && map[k].student_nisns) ? map[k].student_nisns.length : 0;
        const role = window.FincestemMentorship.getTeacherRole(k);
        const roleBadge = role === 'FIELD_TRIP' ? '🚌 FT' : (role === 'KOORDINATOR' ? '🎯 Koord' : '🏫 Non-FT');
        const countText = count > 0 ? `(${count} Siswa)` : '(0 Siswa)';

        optHtml += `<option value="${k}">${t.nama_guru} [${roleBadge}] ${countText}</option>`;
      });

      select.innerHTML = optHtml;
      if (prevVal && teachers.some(t => String(t.username || t.nip || t.kode_guru).toLowerCase() === prevVal)) {
        select.value = prevVal;
        selectedTeacherKey = prevVal;
      } else if (!selectedTeacherKey && sortedTeachers.length > 0) {
        // Default pilih guru pertama
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

    const currentRole = window.FincestemMentorship.getTeacherRole(selectedTeacherKey);
    const students = window.FincestemMentorship.getStudentsForTeacher(selectedTeacherKey);
    const ftCount = students.filter(s => s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true).length;
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
                <span>Kode: <strong>${escapeHtml(tObj.kode_guru || '-')}</strong></span>
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
      `;
    }

    // Render Tabel Siswa Binaan
    if (tableBody) {
      if (students.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" class="p-8 text-center text-slate-400 text-xs">
              <span class="material-symbols-outlined text-4xl text-slate-300 block mb-1">group_add</span>
              Belum ada siswa yang ditetapkan ke guru ini.<br>
              Klik tombol <strong>[+ Tambah Siswa Binaan]</strong> di atas untuk membagi siswa ke guru ini.
            </td>
          </tr>
        `;
      } else {
        // Urutkan: Field Trip dulu, lalu nama
        const sortedStudents = [...students].sort((a, b) => {
          const aIsFT = a.zone === 'FINCESTEM LUAR OKU TIMUR' || a.is_field_trip === true;
          const bIsFT = b.zone === 'FINCESTEM LUAR OKU TIMUR' || b.is_field_trip === true;
          if (aIsFT && !bIsFT) return -1;
          if (!aIsFT && bIsFT) return 1;
          return (a.nama || '').localeCompare(b.nama || '');
        });

        let html = '';
        sortedStudents.forEach((s, idx) => {
          const isFT = s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true;
          const badge = isFT
            ? `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-black bg-amber-500 text-slate-950">🚌 Field Trip</span>`
            : `<span class="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-teal-100 text-teal-800 border border-teal-200">🏫 Non-FT</span>`;

          html += `
            <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
              <td class="py-2.5 px-3 text-center font-bold text-slate-400 text-xs">${idx + 1}</td>
              <td class="py-2.5 px-3 font-mono font-bold text-slate-600 text-xs">${escapeHtml(s.nisn || '-')}</td>
              <td class="py-2.5 px-3 font-extrabold text-slate-800 text-xs">
                <span>${escapeHtml(s.nama || '-')}</span>
                <span class="text-[10px] text-slate-400 font-semibold block">${escapeHtml(s.gender || '')}</span>
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

  window.setMentorTeacherRoleAction = function(role) {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    window.FincestemMentorship.setTeacherRole(selectedTeacherKey, role);
    renderMentorshipStats();
    renderSelectedTeacherDetail();
  };

  window.removeStudentFromMentorAction = function(nisn) {
    if (!selectedTeacherKey || !nisn || !window.FincestemMentorship) return;
    if (confirm(`Lepaskan siswa dengan NISN ${nisn} dari tanggung jawab guru ini?`)) {
      window.FincestemMentorship.removeStudentFromTeacher(selectedTeacherKey, nisn);
      renderMentorshipStats();
      renderSelectedTeacherDetail();
    }
  };

  window.clearAllMentorStudentsAction = function() {
    if (!selectedTeacherKey || !window.FincestemMentorship) return;
    if (confirm('Kosongkan semua daftar siswa binaan dari guru ini?')) {
      window.FincestemMentorship.clearTeacherAssignments(selectedTeacherKey);
      renderMentorshipStats();
      renderSelectedTeacherDetail();
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
    if (!selectedTeacherKey) {
      alert('Pilih guru pembina terlebih dahulu!');
      return;
    }
    const modal = document.getElementById('modalAssignStudents');
    if (!modal) return;

    modalSelectedNisns.clear();
    studentModalFilter = { grade: 'ALL', rombel: 'ALL', category: 'UNASSIGNED', search: '' };

    // Reset select inputs di modal
    const selRombel = document.getElementById('modalFilterRombel');
    const selCat = document.getElementById('modalFilterCategory');
    const inSearch = document.getElementById('modalSearchStudent');
    if (selRombel) selRombel.value = 'ALL';
    if (selCat) selCat.value = 'UNASSIGNED';
    if (inSearch) inSearch.value = '';

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

    renderModalStudentsList();
    modal.classList.remove('hidden');
  };

  window.closeAssignStudentModal = function() {
    const modal = document.getElementById('modalAssignStudents');
    if (modal) modal.classList.add('hidden');
    modalSelectedNisns.clear();
  };

  window.onModalStudentFilterChange = function() {
    const selRombel = document.getElementById('modalFilterRombel');
    const selCat = document.getElementById('modalFilterCategory');
    const inSearch = document.getElementById('modalSearchStudent');

    studentModalFilter.rombel = selRombel ? selRombel.value : 'ALL';
    studentModalFilter.category = selCat ? selCat.value : 'ALL';
    studentModalFilter.search = inSearch ? inSearch.value.trim().toLowerCase() : '';

    renderModalStudentsList();
  };

  window.setModalGradeFilter = function(grade) {
    studentModalFilter.grade = grade;
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

  function renderModalStudentsList() {
    const listContainer = document.getElementById('modalStudentListContainer');
    const countInfo = document.getElementById('modalSelectedCountInfo');
    const allStudents = window.FincestemMasterStudents || [];
    const assignedNisns = window.FincestemMentorship.getAllAssignedNisns();
    const currentMentorNisns = new Set(window.FincestemMentorship.getAssignedNisnsForTeacher(selectedTeacherKey));

    if (!listContainer) return;

    // Filter Siswa
    const filtered = allStudents.filter(s => {
      const sNisn = String(s.nisn || '').trim();
      const sClass = (s.class || s.rombel || '').toUpperCase();
      const isFT = s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true;
      const isAssigned = assignedNisns.has(sNisn);
      const isAlreadyInThisTeacher = currentMentorNisns.has(sNisn);

      // Jangan tampilkan yang sudah ada di guru ini
      if (isAlreadyInThisTeacher) return false;

      // Filter Tingkat
      if (studentModalFilter.grade !== 'ALL') {
        const g = studentModalFilter.grade;
        if (!sClass.includes(' ' + g + '.') && !sClass.startsWith(g + '.')) return false;
      }

      // Filter Rombel
      if (studentModalFilter.rombel !== 'ALL') {
        const normR = studentModalFilter.rombel.replace(/^KELAS\s+/i, '').trim().toUpperCase();
        const normS = sClass.replace(/^KELAS\s+/i, '').trim().toUpperCase();
        if (normS !== normR) return false;
      }

      // Filter Kategori
      if (studentModalFilter.category === 'FIELD_TRIP' && !isFT) return false;
      if (studentModalFilter.category === 'NON_FIELD_TRIP' && isFT) return false;
      if (studentModalFilter.category === 'UNASSIGNED' && isAssigned) return false;

      // Filter Search
      if (studentModalFilter.search) {
        const q = studentModalFilter.search;
        const matchName = (s.nama || '').toLowerCase().includes(q);
        const matchNisn = sNisn.includes(q);
        if (!matchName && !matchNisn) return false;
      }

      return true;
    });

    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong>${modalSelectedNisns.size}</strong> siswa | Menampilkan ${filtered.length} siswa`;
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          Tidak ada siswa yang sesuai dengan filter pencarian.
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(s => {
      const sNisn = String(s.nisn || '').trim();
      const isFT = s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true;
      const isAssignedToOther = assignedNisns.has(sNisn);
      const isChecked = modalSelectedNisns.has(sNisn);

      let otherMentorBadge = '';
      if (isAssignedToOther) {
        const otherT = window.FincestemMentorship.getTeacherForStudent(sNisn);
        otherMentorBadge = `<span class="text-[9.5px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200" title="Akan dipindahkan dari pembina lama">Pindah dari: ${escapeHtml(otherT ? otherT.teacher_name : 'Guru Lain')}</span>`;
      }

      html += `
        <label class="p-2.5 rounded-xl border ${isChecked ? 'bg-blue-50/70 border-blue-400' : 'bg-white border-slate-200'} hover:border-slate-300 flex items-center justify-between gap-3 cursor-pointer transition-all select-none">
          <div class="flex items-center gap-2.5 min-w-0">
            <input type="checkbox" onchange="toggleModalStudentCheckbox('${sNisn}', this.checked)" ${isChecked ? 'checked' : ''} class="w-4 h-4 rounded text-[#0875D1] focus:ring-0 cursor-pointer">
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-extrabold text-xs text-slate-800 truncate">${escapeHtml(s.nama || '-')}</span>
                ${isFT ? '<span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-slate-950">🚌 FT</span>' : '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-100 text-teal-800 border border-teal-200">🏫 Non-FT</span>'}
                ${otherMentorBadge}
              </div>
              <div class="text-[10.5px] text-slate-500 font-medium">
                <span>NISN: ${escapeHtml(sNisn)}</span> • <span>${escapeHtml(s.class || s.rombel || '-')}</span>
              </div>
            </div>
          </div>
        </label>
      `;
    });

    listContainer.innerHTML = html;
  }

  window.toggleModalStudentCheckbox = function(nisn, checked) {
    if (checked) {
      modalSelectedNisns.add(nisn);
    } else {
      modalSelectedNisns.delete(nisn);
    }
    const countInfo = document.getElementById('modalSelectedCountInfo');
    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong>${modalSelectedNisns.size}</strong> siswa`;
    }
  };

  window.modalSelectAllVisible = function(select) {
    const listContainer = document.getElementById('modalStudentListContainer');
    if (!listContainer) return;
    const checkboxes = listContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = select;
      // trigger event
      const nisnMatch = cb.getAttribute('onchange')?.match(/'([^']+)'/);
      if (nisnMatch && nisnMatch[1]) {
        if (select) modalSelectedNisns.add(nisnMatch[1]);
        else modalSelectedNisns.delete(nisnMatch[1]);
      }
    });
    const countInfo = document.getElementById('modalSelectedCountInfo');
    if (countInfo) {
      countInfo.innerHTML = `Terpilih: <strong>${modalSelectedNisns.size}</strong> siswa`;
    }
  };

  window.submitAssignStudentsModal = function() {
    if (!selectedTeacherKey || modalSelectedNisns.size === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu!');
      return;
    }

    const nisnArray = Array.from(modalSelectedNisns);
    const success = window.FincestemMentorship.assignStudentsToTeacher(selectedTeacherKey, nisnArray);

    if (success) {
      alert(`Berhasil menetapkan ${nisnArray.length} siswa ke guru ini!`);
      closeAssignStudentModal();
      renderMentorshipStats();
      renderPlottingView();
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
      const studentCount = (map[k] && map[k].student_nisns) ? map[k].student_nisns.length : 0;
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

})(window);
