/**
 * FINCESTEM 2026 - MODUL REKAP PENILAIAN FASILITATOR & MONITORING KOORDINATOR
 * File: js/modules/guru-rekap-monitoring.js
 * 
 * 1. Rekap Penilaian & Rapor Siswa Binaan untuk GURU FASILITATOR
 *    - Tabel Rapor 4 Pilar (Finansial, Budaya, Eksplorasi, STEM) & Predikat Resmi
 *    - Cetak Lembar Rekap Nilai Siswa Binaan (A4 Portrait resmi dengan Kop SMAN 1 Belitang)
 *    - Ekspor Excel / CSV
 * 2. Panel Monitoring untuk GURU KOORDINATOR
 *    - Deteksi otomatis Guru Koordinator
 *    - Monitoring Kinerja Fasilitator Binaan (% Penilaian & Antrean Belum Dinilai)
 *    - Salin Pesan Pengingat WhatsApp ke Fasilitator
 *    - Monitoring Siswa se-Wilayah Koordinasi & Cetak Rekap Kolektif
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

  const state = {
    isCoord: false,
    rekapStudentsData: [],
    coordFasilStats: [],
    coordStudentsData: [],
    filterCoordClass: 'ALL',
    filterCoordHari: 'ALL',
    filterCoordStatus: 'ALL',
    searchCoord: ''
  };

  /**
   * Deteksi apakah akun guru yang sedang login adalah Koordinator
   */
  function isCurrentUserCoordinator() {
    const user = (window.FincestemCore && FincestemCore.auth) ? FincestemCore.auth.getUser() : null;
    if (!user) return false;
    const userKey = String(user.username || user.nip || user.name || user.kode_guru || '').trim().toLowerCase();

    // 1. Cek dari mentorship module
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getTeacherRole === 'function') {
      const role = window.FincestemMentorship.getTeacherRole(userKey);
      if (role === 'KOORDINATOR') return true;
    }

    // 2. Cek tugas tambahan dari object session user
    const tt = String(user.tugas_tambahan || user.jabatan || user.role || user.mapel || '').toUpperCase();
    if (tt.includes('KOORDINATOR') || tt.includes('KOORD')) return true;

    // 3. Cek dari master teachers SMAN 1 Belitang
    const masterList = window.FincestemMasterTeachers || [];
    const found = masterList.find(t => 
      String(t.username || '').toLowerCase() === userKey ||
      String(t.nip || '').toLowerCase() === userKey ||
      String(t.kode_guru || '').toLowerCase() === userKey ||
      String(t.nama_guru || '').toLowerCase() === userKey
    );
    if (found) {
      const mtt = String(found.tugas_tambahan || found.mata_pelajaran || found.jabatan || '').toUpperCase();
      if (mtt.includes('KOORDINATOR') || mtt.includes('KOORD')) return true;
    }

    // 4. Cek apakah ada fasilitator yang mengarah ke koordinator ini di assignments map
    if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
      const map = window.FincestemMentorship.getAssignmentsMap();
      const isLinked = Object.values(map).some(e => e && e.coordinator_key && String(e.coordinator_key).toLowerCase() === userKey);
      if (isLinked) return true;
    }

    return false;
  }

  /**
   * Inisialisasi Deteksi Role & Tombol Sidebar saat halaman fasilitator dimuat
   */
  function initGuruRekapMonitoring() {
    const isCoord = isCurrentUserCoordinator();
    state.isCoord = isCoord;

    const btnKoord = document.getElementById('btnSideFasMonitoringKoord');
    if (btnKoord) {
      if (isCoord) {
        btnKoord.classList.remove('hidden');
      } else {
        btnKoord.classList.add('hidden');
      }
    }

    // Perbarui badge di banner utama jika Koordinator
    const badgeRole = document.querySelector('#fasUserMetaMain')?.parentElement?.querySelector('.inline-flex');
    if (isCoord && badgeRole) {
      badgeRole.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full bg-amber-950 animate-pulse"></span>
        <span>GURU KOORDINATOR &amp; FASILITATOR</span>
      `;
      badgeRole.className = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10.5px] font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 shadow-xs border border-amber-300';
    }
  }

  /**
   * =========================================================================
   * BAGIAN 1: REKAP PENILAIAN & RAPOR SISWA BINAAN FASILITATOR
   * =========================================================================
   */
  window.renderFasRekapBinaanView = function() {
    const container = document.getElementById('tbodyFasRekapBinaan');
    const lblCount = document.getElementById('lblFasRekapBinaanCount');
    if (!container) return;

    // Ambil daftar siswa binaan yang sedang aktif di halaman
    let stuList = Array.isArray(window.assignedStudents) && window.assignedStudents.length > 0 ? window.assignedStudents : [];
    if (stuList.length === 0) {
      const user = (window.FincestemCore && FincestemCore.auth) ? FincestemCore.auth.getUser() : null;
      const teacherCandidates = [
        user && user.username,
        user && user.nip,
        user && user.kode,
        user && user.name,
        user && user.nama_guru
      ].filter(Boolean);
      if (window.FincestemMentorship) {
        for (const cand of teacherCandidates) {
          const list = window.FincestemMentorship.getStudentsForTeacher(cand);
          if (list && list.length > 0) {
            stuList = list.map(s => {
              const isFT = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones.isFieldTripStudent)
                ? FincestemCore.zones.isFieldTripStudent(s.nisn)
                : String(s.zone || '').toUpperCase().includes('LUAR');
              return {
                nisn: s.nisn,
                name: s.nama || s.name,
                class_name: s.class || s.rombel || '-',
                nis: s.nis,
                zone: s.zone,
                is_field_trip: isFT
              };
            });
            window.assignedStudents = stuList;
            break;
          }
        }
      }
    }
    
    let countMahir = 0;
    let countCakap = 0;
    let countBerkembang = 0;
    let countPending = 0;

    const enriched = stuList.map((stu, idx) => {
      let prog = null;
      try {
        const pStr = localStorage.getItem('fincestem_progress_' + stu.nisn);
        if (pStr) prog = JSON.parse(pStr);
      } catch (e) {}

      const isFT = stu.is_field_trip || (stu.zone && String(stu.zone).toUpperCase().includes('LUAR'));
      const completedDays = prog ? (prog.completed_days || 0) : 0;
      
      // Ambil nilai Day 7 atau rata-rata
      let finalScore = null;
      let finalPred = null;
      let finScore = null;
      let culScore = null;
      let expScore = null;
      let stemScore = null;

      if (prog && prog.records) {
        const d7 = prog.records.find(r => parseInt(r.day_number) === 7 && (r.task_type === 'final' || r.task_type === 'general' || r.score));
        if (d7 && d7.score !== null && d7.score !== undefined && d7.score !== '') {
          finalScore = parseFloat(d7.score);
          finalPred = d7.predicate || (finalScore >= 85 ? 'Mahir' : (finalScore >= 70 ? 'Cakap' : 'Berkembang'));
          finScore = d7.score_financial !== null ? parseFloat(d7.score_financial) : finalScore;
          culScore = d7.score_culture !== null ? parseFloat(d7.score_culture) : finalScore;
          expScore = d7.score_exploration !== null ? parseFloat(d7.score_exploration) : finalScore;
          stemScore = d7.score_stem !== null ? parseFloat(d7.score_stem) : finalScore;
        } else if (isFT && completedDays >= 7) {
          finalScore = 95.0;
          finalPred = 'Mahir';
          finScore = 95; culScore = 95; expScore = 95; stemScore = 95;
        }
      }

      // Sinkronkan nilai 4 pilar dari server MySQL secara real-time
      const cleanNisn = String(stu.nisn || '').trim();
      const sSum = window._fasilStudentSummaryMap && window._fasilStudentSummaryMap[cleanNisn];
      const sDay1 = window._fasilStudentDayMap && window._fasilStudentDayMap[cleanNisn + '_1'];
      const sDay2 = window._fasilStudentDayMap && window._fasilStudentDayMap[cleanNisn + '_2'];
      const sDay3 = window._fasilStudentDayMap && window._fasilStudentDayMap[cleanNisn + '_3'];
      const sDay4 = window._fasilStudentDayMap && window._fasilStudentDayMap[cleanNisn + '_4'];
      const sDay7 = window._fasilStudentDayMap && window._fasilStudentDayMap[cleanNisn + '_7'];

      if (sDay1 && sDay1.score && finScore === null) finScore = parseFloat(sDay1.score);
      if (sDay2 && sDay2.score && culScore === null) culScore = parseFloat(sDay2.score);
      if (sDay3 && sDay3.score && stemScore === null) stemScore = parseFloat(sDay3.score);
      if (sDay4 && sDay4.score && expScore === null) expScore = parseFloat(sDay4.score);
      if (sDay7 && sDay7.score && finalScore === null) {
        finalScore = parseFloat(sDay7.score);
        finalPred = sDay7.predicate || (finalScore >= 85 ? 'Mahir' : (finalScore >= 70 ? 'Cakap' : 'Berkembang'));
      } else if (sSum && sSum.avg_score && finalScore === null) {
        finalScore = Math.round(parseFloat(sSum.avg_score) * 10) / 10;
        finalPred = sSum.day7_predicate || (finalScore >= 85 ? 'Mahir' : (finalScore >= 70 ? 'Cakap' : 'Berkembang'));
      }

      if (finalPred === 'Mahir') countMahir++;
      else if (finalPred === 'Cakap') countCakap++;
      else if (finalPred === 'Berkembang') countBerkembang++;
      else countPending++;

      return {
        no: idx + 1,
        nisn: stu.nisn,
        name: stu.name,
        className: stu.class_name || '-',
        isFT: isFT,
        finScore: finScore,
        culScore: culScore,
        expScore: expScore,
        stemScore: stemScore,
        finalScore: finalScore,
        finalPred: finalPred
      };
    });

    state.rekapStudentsData = enriched;

    // Update KPI Badges
    const elM = document.getElementById('lblFasCountMahir');
    const elC = document.getElementById('lblFasCountCakap');
    const elB = document.getElementById('lblFasCountBerkembang');
    const elP = document.getElementById('lblFasCountPending');
    if (elM) elM.textContent = `${countMahir} Mahir`;
    if (elC) elC.textContent = `${countCakap} Cakap`;
    if (elB) elB.textContent = `${countBerkembang} Berkembang`;
    if (elP) elP.textContent = `${countPending} Menunggu Day 7`;

    if (lblCount) lblCount.textContent = `Menampilkan ${enriched.length} Siswa Binaan Anda`;

    if (enriched.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-10 text-slate-400 text-xs">
            Belum ada siswa binaan yang terdaftar untuk akun ini.
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    enriched.forEach((st, i) => {
      let predBadge = '';
      if (st.finalPred === 'Mahir') {
        predBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-2xs">Mahir</span>`;
      } else if (st.finalPred === 'Cakap') {
        predBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-500 text-white shadow-2xs">Cakap</span>`;
      } else if (st.finalPred === 'Berkembang') {
        predBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-2xs">Berkembang</span>`;
      } else {
        predBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400 border border-slate-200">Menunggu Day 7</span>`;
      }

      const trackBadge = st.isFT
        ? `<span class="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-amber-100 text-amber-800">Field Trip</span>`
        : `<span class="px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-sky-100 text-sky-800">Non-FT</span>`;

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors text-xs">
          <td class="px-3 py-2.5 text-center text-slate-500 font-semibold">${i + 1}</td>
          <td class="px-3 py-2.5">
            <div class="font-bold text-slate-800">${escapeHtml(st.name)}</div>
            <div class="text-[10px] text-slate-400 font-mono">NISN: ${escapeHtml(st.nisn)}</div>
          </td>
          <td class="px-3 py-2.5 font-bold text-slate-700">${escapeHtml(st.className)}</td>
          <td class="px-3 py-2.5">${trackBadge}</td>
          <td class="px-3 py-2.5 text-center font-bold text-emerald-700">${st.finScore !== null ? st.finScore : '-'}</td>
          <td class="px-3 py-2.5 text-center font-bold text-indigo-700">${st.culScore !== null ? st.culScore : '-'}</td>
          <td class="px-3 py-2.5 text-center font-bold text-amber-700">${st.expScore !== null ? st.expScore : '-'}</td>
          <td class="px-3 py-2.5 text-center font-bold text-cyan-700">${st.stemScore !== null ? st.stemScore : '-'}</td>
          <td class="px-3 py-2.5 text-center font-black text-[#006a61]">${st.finalScore !== null ? st.finalScore : '-'}</td>
          <td class="px-3 py-2.5 text-center">${predBadge}</td>
        </tr>
      `;
    });

    container.innerHTML = html;
  };

  /**
   * Cetak Lembar Rekap Nilai Siswa Binaan Fasilitator (A4 Portrait Kop SMAN 1 Belitang)
   */
  window.printRekapBinaanFasil = function() {
    const list = state.rekapStudentsData;
    if (!list || list.length === 0) {
      alert('Tidak ada data siswa binaan untuk dicetak.');
      return;
    }

    const user = (window.FincestemCore && FincestemCore.auth) ? FincestemCore.auth.getUser() : null;
    const fasilName = (user && (user.name || user.nama_guru)) || 'Guru Fasilitator';
    const fasilNip = (user && user.nip && user.nip !== '-') ? user.nip : '-';

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up terblokir! Izinkan pop-up peramban Anda untuk mencetak.');
      return;
    }

    const rowsHtml = list.map((st, i) => `
      <tr style="border-bottom: 1px solid #cbd5e1;">
        <td style="padding: 5px; text-align: center; font-size: 11px;">${i + 1}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-family: monospace;">${escapeHtml(st.nisn)}</td>
        <td style="padding: 5px; font-size: 11px; font-weight: bold;">${escapeHtml(st.name)}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px;">${escapeHtml(st.className)}</td>
        <td style="padding: 5px; text-align: center; font-size: 10px;">${st.isFT ? 'Field Trip' : 'Non-FT'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.finScore !== null ? st.finScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.culScore !== null ? st.culScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.expScore !== null ? st.expScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${st.stemScore !== null ? st.stemScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 12px; font-weight: bold; color: #006a61;">${st.finalScore !== null ? st.finalScore : '-'}</td>
        <td style="padding: 5px; text-align: center; font-size: 11px; font-weight: bold;">${escapeHtml(st.finalPred || 'Belum Ada')}</td>
      </tr>
    `).join('');

    const printContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Rekap Nilai Siswa Binaan - ${fasilName}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm 15mm; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; margin: 0; padding: 0; }
          .kop-surat { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 12px; }
          .kop-logo { width: 60px; height: 60px; object-fit: contain; margin-right: 15px; }
          .kop-text { flex: 1; text-align: center; }
          .kop-text h3 { margin: 0; font-size: 12px; font-weight: bold; }
          .kop-text h2 { margin: 2px 0; font-size: 14px; font-weight: 900; }
          .kop-text h1 { margin: 2px 0; font-size: 16px; font-weight: 900; color: #006a61; }
          .kop-text p { margin: 0; font-size: 10px; color: #475569; }
          .table-rekap { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .table-rekap th { background-color: #f1f5f9; border: 1px solid #94a3b8; padding: 5px 3px; font-size: 10.5px; font-weight: bold; text-align: center; }
          .table-rekap td { border: 1px solid #cbd5e1; }
          .ttd-container { margin-top: 25px; display: flex; justify-content: space-between; page-break-inside: avoid; }
          .ttd-box { width: 230px; text-align: center; font-size: 11px; }
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
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 13px; text-transform: uppercase; font-weight: 900;">LEMBAR REKAPITULASI NILAI SISWA BINAAN KOKURIKULER 2026</h3>
          <p style="margin: 2px 0 0 0; font-size: 11px; color: #475569;">Guru Fasilitator: <strong>${escapeHtml(fasilName)}</strong> ${fasilNip !== '-' ? `(NIP: ${fasilNip})` : ''} | Total: ${list.length} Siswa</p>
        </div>

        <table class="table-rekap">
          <thead>
            <tr>
              <th rowspan="2" style="width: 25px;">No</th>
              <th rowspan="2" style="width: 80px;">NISN</th>
              <th rowspan="2">Nama Peserta Didik</th>
              <th rowspan="2" style="width: 45px;">Kelas</th>
              <th rowspan="2" style="width: 55px;">Jalur</th>
              <th colspan="4">Skor Dimensi Pilar</th>
              <th rowspan="2" style="width: 45px;">Akhir</th>
              <th rowspan="2" style="width: 75px;">Predikat</th>
            </tr>
            <tr>
              <th style="width: 35px;">Fin</th>
              <th style="width: 35px;">Bud</th>
              <th style="width: 35px;">Eksp</th>
              <th style="width: 35px;">STEM</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="ttd-container">
          <div class="ttd-box">
            <p style="margin-bottom: 50px;">Mengetahui,<br>Koordinator Program Kokurikuler,</p>
            <p style="font-weight: bold; text-decoration: underline; margin: 0;">TIM KOORDINATOR FINCESTEM</p>
            <p style="margin: 0;">SMAN 1 Belitang</p>
          </div>
          <div class="ttd-box">
            <p style="margin-bottom: 50px;">Belitang, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br>Guru Fasilitator Pembimbing,</p>
            <p style="font-weight: bold; text-decoration: underline; margin: 0;">${escapeHtml(fasilName)}</p>
            <p style="margin: 0;">${fasilNip !== '-' ? 'NIP. ' + escapeHtml(fasilNip) : 'Fasilitator Kokurikuler'}</p>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  /**
   * Ekspor CSV Rapor Binaan Fasilitator
   */
  window.exportRekapBinaanCSV = function() {
    const list = state.rekapStudentsData;
    if (!list || list.length === 0) {
      alert('Tidak ada data siswa binaan untuk diekspor.');
      return;
    }

    let csv = '\uFEFF';
    csv += 'No,NISN,Nama Siswa,Kelas,Jalur,Skor Finansial,Skor Budaya,Skor Eksplorasi,Skor STEM,Nilai Akhir Rapor,Predikat Rapor\n';

    list.forEach((st, i) => {
      const row = [
        i + 1,
        `"${st.nisn}"`,
        `"${st.name.replace(/"/g, '""')}"`,
        `"${st.className}"`,
        `"${st.isFT ? 'Field Trip' : 'Non-Field Trip'}"`,
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
    a.download = `Rekap_Nilai_Binaan_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * =========================================================================
   * BAGIAN 2: PANEL MONITORING KHUSUS GURU KOORDINATOR
   * =========================================================================
   */
  window.renderFasMonitoringKoordView = function() {
    if (!state.isCoord) return;
    fetchCoordDataFromServer();
  };

  function fetchCoordDataFromServer() {
    const user = (window.FincestemCore && FincestemCore.auth) ? FincestemCore.auth.getUser() : null;
    const userKey = String(user ? (user.username || user.nip || user.name) : '').trim().toLowerCase();

    fetch('../api/progress.php?action=admin_recap')
      .then(res => res.json())
      .then(json => {
        if (!json || !json.success || !json.data) return;

        const allTeachers = (window.FincestemMentorship && typeof window.FincestemMentorship.getTeachers === 'function')
          ? window.FincestemMentorship.getTeachers()
          : (window.FincestemMasterTeachers || []);

        const assignMap = (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function')
          ? window.FincestemMentorship.getAssignmentsMap()
          : {};

        // Saring guru fasilitator yang berada di bawah koordinasi koordinator ini
        // (Atau jika tidak ada mapping eksplisit coordinator_key, koordinator dapat melihat seluruh fasilitator di jenjang kelasnya)
        let coordFasils = allTeachers.filter(tc => {
          const tKey = String(tc.username || tc.nip || tc.kode_guru).trim().toLowerCase();
          const entry = assignMap[tKey];
          if (entry && entry.coordinator_key && String(entry.coordinator_key).toLowerCase() === userKey) {
            return true;
          }
          return false;
        });

        // Fallback: Jika mapping coordinator_key belum diisi Admin, tampilkan seluruh guru fasilitator agar koordinator tetap bisa memantau
        if (coordFasils.length === 0) {
          coordFasils = allTeachers;
        }

        // Siapkan summary progress
        const sMap = {};
        if (Array.isArray(json.data.students)) {
          json.data.students.forEach(s => { sMap[String(s.student_nisn).trim()] = s; });
        }

        const dMap = {};
        if (Array.isArray(json.data.days)) {
          json.data.days.forEach(d => {
            dMap[`${String(d.student_nisn).trim()}_${d.day_number}`] = d;
          });
        }

        // Kalkulasi Metrik Fasilitator Binaan Koordinator
        let totalAssignedStudents = 0;
        let totalGradedStudents = 0;
        let totalPendingQueue = 0;

        const fasilRows = coordFasils.map((tc, i) => {
          const tKey = String(tc.username || tc.nip || tc.kode_guru).trim().toLowerCase();
          let binaan = [];
          if (window.FincestemMentorship && typeof window.FincestemMentorship.getStudentsForTeacher === 'function') {
            binaan = window.FincestemMentorship.getStudentsForTeacher(tKey) || [];
            if (!binaan.length && tc.nip && tc.nip !== '-') binaan = window.FincestemMentorship.getStudentsForTeacher(tc.nip) || [];
            if (!binaan.length && tc.username) binaan = window.FincestemMentorship.getStudentsForTeacher(tc.username) || [];
            if (!binaan.length && tc.kode_guru && tc.kode_guru !== '-') binaan = window.FincestemMentorship.getStudentsForTeacher(tc.kode_guru) || [];
            if (!binaan.length && tc.nama_guru) binaan = window.FincestemMentorship.getStudentsForTeacher(tc.nama_guru) || [];
          }
          if (!binaan.length) {
            const assignsMap = (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function')
              ? window.FincestemMentorship.getAssignmentsMap() : {};
            const candidateKeys = [tKey, tc.username, tc.nip, tc.kode_guru, tc.nama_guru].filter(Boolean).map(k => String(k).trim().toLowerCase());
            let matchedEntry = null;
            for (const ck of candidateKeys) {
              if (assignsMap[ck]) { matchedEntry = assignsMap[ck]; break; }
            }
            if (matchedEntry && Array.isArray(matchedEntry.student_nisns) && matchedEntry.student_nisns.length > 0) {
              const allStudents = window.FincestemMasterStudents || [];
              const nisnSet = new Set(matchedEntry.student_nisns.map(n => String(n).trim()));
              binaan = allStudents.filter(s => {
                const sn = String(s.nisn || s.identifier || '').trim();
                const unp = sn.replace(/^0+/, '');
                const pad = (sn.length >= 8 && sn.length <= 10) ? sn.padStart(10, '0') : sn;
                return nisnSet.has(sn) || nisnSet.has(unp) || nisnSet.has(pad);
              });
            }
          }

          const classCounts = {};
          let submittedCount = 0;
          let gradedCount = 0;
          let pendingCount = 0;
          const pendingStudentsList = [];

          binaan.forEach(s => {
            const cls = String(s.class || s.kelas || s.class_name || s.rombel || '').replace(/^KELAS\s+/i, '').trim();
            if (cls) classCounts[cls] = (classCounts[cls] || 0) + 1;

            const sNisn = String(s.nisn || s.identifier || '').trim();
            const sSumm = sMap[sNisn];
            const hasSub = sSumm && parseInt(sSumm.total_submissions || 0) > 0;
            const hasGrade = sSumm && parseInt(sSumm.graded_days_count || 0) > 0;

            if (hasSub) submittedCount++;
            if (hasGrade) gradedCount++;

            // Cek apakah ada antrean
            let isPending = false;
            for (let d = 1; d <= 7; d++) {
              const dRec = dMap[`${sNisn}_${d}`];
              if (dRec && parseInt(dRec.student_tasks_count || 0) > 0 && (dRec.score === null || dRec.score === '')) {
                isPending = true;
                break;
              }
            }
            if (isPending) {
              pendingCount++;
              pendingStudentsList.push(s);
            }
          });

          const totalBinaan = binaan.length;
          totalAssignedStudents += totalBinaan;
          totalGradedStudents += gradedCount;
          totalPendingQueue += pendingCount;

          const gradedPct = totalBinaan > 0 ? Math.round((gradedCount / totalBinaan) * 100) : 0;
          const submittedPct = totalBinaan > 0 ? Math.round((submittedCount / totalBinaan) * 100) : 0;

          return {
            no: i + 1,
            teacherKey: tKey,
            nama_guru: tc.nama_guru,
            nip: tc.nip && tc.nip !== '-' ? tc.nip : (tc.kode_guru || '-'),
            classes: Object.keys(classCounts).sort(),
            totalBinaan: totalBinaan,
            submittedCount: submittedCount,
            submittedPct: submittedPct,
            gradedCount: gradedCount,
            gradedPct: gradedPct,
            pendingCount: pendingCount,
            pendingStudentsList: pendingStudentsList
          };
        });

        state.coordFasilStats = fasilRows;

        // Update KPI Header Koordinator
        const elTotF = document.getElementById('kpiCoordTotalFasil');
        const elTotS = document.getElementById('kpiCoordTotalStudents');
        const elAvgG = document.getElementById('kpiCoordAvgGrading');
        const elPend = document.getElementById('kpiCoordPending');

        if (elTotF) elTotF.textContent = `${fasilRows.length} Guru`;
        if (elTotS) elTotS.textContent = `${totalAssignedStudents} Siswa`;
        const avg = totalAssignedStudents > 0 ? Math.round((totalGradedStudents / totalAssignedStudents) * 100) : 0;
        if (elAvgG) elAvgG.textContent = `${avg}% (${totalGradedStudents}/${totalAssignedStudents})`;
        if (elPend) elPend.textContent = totalPendingQueue;

        renderCoordFasilTable();
      })
      .catch(err => console.warn('[GuruRekapMonitoring] Gagal memuat data koordinator:', err));
  }

  function renderCoordFasilTable() {
    const tbody = document.getElementById('tbodyCoordFasilList');
    if (!tbody) return;

    if (state.coordFasilStats.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400 text-xs">Tidak ada data fasilitator.</td></tr>`;
      return;
    }

    let html = '';
    state.coordFasilStats.forEach((f, idx) => {
      const clsBadges = f.classes.length > 0
        ? f.classes.map(c => `<span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 mr-1">${escapeHtml(c)}</span>`).join('')
        : '<span class="text-slate-400 text-xs italic">-</span>';

      let pendingBadge = '';
      if (f.pendingCount > 0) {
        pendingBadge = `
          <button onclick="copyReminderWaFromCoord('${escapeHtml(f.teacherKey)}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 transition-all cursor-pointer" title="Klik untuk salin pengingat WA ke guru ini">
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>${f.pendingCount} Menunggu</span>
            <span class="material-symbols-outlined text-xs">chat</span>
          </button>
        `;
      } else {
        pendingBadge = `<span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">✓ Tuntas</span>`;
      }

      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
          <td class="px-3 py-2.5 text-center text-slate-500 font-semibold">${idx + 1}</td>
          <td class="px-3 py-2.5">
            <div class="font-bold text-slate-800">${escapeHtml(f.nama_guru)}</div>
            <div class="text-[10.5px] text-slate-400">NIP: ${escapeHtml(f.nip)}</div>
          </td>
          <td class="px-3 py-2.5">${clsBadges}</td>
          <td class="px-3 py-2.5 text-center font-bold text-slate-700">${f.totalBinaan} Siswa</td>
          <td class="px-3 py-2.5">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>${f.gradedPct}%</span>
              <span class="text-[10px] text-slate-400 font-normal">(${f.gradedCount}/${f.totalBinaan})</span>
            </div>
            <div class="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${f.gradedPct}%"></div>
            </div>
          </td>
          <td class="px-3 py-2.5 text-center">${pendingBadge}</td>
          <td class="px-3 py-2.5 text-center">
            <button onclick="copyReminderWaFromCoord('${escapeHtml(f.teacherKey)}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10.5px] flex items-center gap-1 mx-auto shadow-2xs transition-all cursor-pointer">
              <span class="material-symbols-outlined text-xs">content_copy</span>
              <span>Ingatkan WA</span>
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  window.copyReminderWaFromCoord = function(tKey) {
    const fasil = state.coordFasilStats.find(f => f.teacherKey === tKey);
    if (!fasil) return;

    const studentList = fasil.pendingStudentsList.length > 0
      ? fasil.pendingStudentsList.map((s, i) => `${i + 1}. ${s.nama || s.name} (${s.class || s.class_name})`).join('\n')
      : 'Siswa binaan Anda';

    const msg = `*PEMBERITAHUAN KOORDINATOR PROJEK KOKURIKULER SMAN 1 BELITANG 2026*\n\nYth. Bapak/Ibu: *${fasil.nama_guru}*\n\nMohon bantuannya untuk meninjau dan memberikan evaluasi nilai harian/rapor bagi siswa binaan Anda yang telah mengumpulkan tugas:\n\n${studentList}\n\nSilakan login ke portal Fasilitator: https://kokurikulersman1belitang.site/guru/fasilitator.html\n\nTerima kasih atas dedikasi dan kerja samanya! 🙏`;

    navigator.clipboard.writeText(msg).then(() => {
      alert(`Pesan pengingat WhatsApp untuk ${fasil.nama_guru} berhasil disalin ke clipboard! Silakan paste ke chat WA beliau.`);
    }).catch(err => {
      alert('Gagal menyalin otomatis: ' + err);
    });
  };

  // Ekspos ke window
  window.GuruRekapMonitoring = {
    init: initGuruRekapMonitoring,
    isCoordinator: isCurrentUserCoordinator
  };

  // Auto-init saat DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initGuruRekapMonitoring, 300);
  });

})(window);
