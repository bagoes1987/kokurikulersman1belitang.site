/**
 * FINCESTEM 2026 - MODUL PEMBAGIAN SISWA BINAAN & MENTORSHIP FASILITATOR
 * File: js/modules/mentorship-fasil.js
 * 
 * Fitur Utama:
 * 1. Manajemen Akun Guru: Memanggil otomatis 116 guru master + Tambah Guru Baru Manual (Username, Password, Peran).
 * 2. Plotting Siswa Binaan Lintas Kelas: Membagi siswa (baik Field Trip maupun Non-Field Trip) ke guru tanggung jawab.
 * 3. Cetak Kartu Siswa Binaan: Cetak kartu login khusus kelompok siswa binaan guru tertentu (tanpa ribet potong per kelas).
 * 4. Zero Conflict Architecture: Terisolasi 100%, tidak mengganggu coding Field Trip Day 1-7 atau core lainnya.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY_ASSIGNMENTS = 'fincestem_mentorship_assignments';
  const STORAGE_KEY_TEACHER_ROLES = 'fincestem_mentorship_teacher_roles';
  const STORAGE_KEY_CUSTOM_TEACHERS = 'fincestem_custom_teachers';

  const MentorshipModule = {

    /**
     * ==========================================
     * 1. DATA GURU (MASTER 116 + CUSTOM TAMBAHAN)
     * ==========================================
     */
    getTeachers: function() {
      // 1. Ambil 116 Guru Master Bawaan SMAN 1 Belitang
      let masterList = Array.isArray(window.FincestemMasterTeachers) ? window.FincestemMasterTeachers : [];
      
      // 2. Ambil Guru Tambahan Manual dari LocalStorage
      let customList = [];
      try {
        const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_TEACHERS);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) customList = parsed;
        }
      } catch (e) {
        console.warn('Gagal membaca custom teachers:', e);
      }

      // Gabungkan master + custom (hindari duplikasi berdasarkan kode/username)
      const combined = [...masterList];
      customList.forEach(ct => {
        const exists = combined.some(t => 
          String(t.kode_guru).toUpperCase() === String(ct.kode_guru).toUpperCase() ||
          String(t.username).toLowerCase() === String(ct.username).toLowerCase()
        );
        if (!exists) {
          combined.push(ct);
        }
      });

      return combined;
    },

    saveNewTeacher: function(teacherData) {
      if (!teacherData || !teacherData.nama_guru || !teacherData.username) {
        return { success: false, message: 'Nama guru dan Username wajib diisi!' };
      }

      const all = this.getTeachers();
      const cleanUser = String(teacherData.username).trim().toLowerCase();
      const cleanKode = String(teacherData.kode_guru || ('G_' + Date.now().toString().slice(-4))).trim().toUpperCase();

      // Cek duplikasi username
      const dup = all.find(t => String(t.username).trim().toLowerCase() === cleanUser);
      if (dup) {
        return { success: false, message: `Username "${cleanUser}" sudah digunakan oleh ${dup.nama_guru}!` };
      }

      const newTeacher = {
        no: all.length + 1,
        kode_guru: cleanKode,
        nama_guru: String(teacherData.nama_guru).trim(),
        nip: String(teacherData.nip || '-').trim(),
        mata_pelajaran: String(teacherData.mata_pelajaran || 'Fasilitator Kokurikuler').trim(),
        jabatan: String(teacherData.jabatan || 'Guru Pendamping').trim(),
        tugas_tambahan: String(teacherData.tugas_tambahan || '-').trim(),
        username: cleanUser,
        password: String(teacherData.password || 'Fincestem2026!').trim(),
        is_custom: true,
        created_at: new Date().toISOString()
      };

      // Simpan ke storage custom teachers
      try {
        let customList = [];
        const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_TEACHERS);
        if (raw) customList = JSON.parse(raw) || [];
        customList.push(newTeacher);
        localStorage.setItem(STORAGE_KEY_CUSTOM_TEACHERS, JSON.stringify(customList));

        // Update runtime window.FincestemMasterTeachers agar langsung bisa login
        if (Array.isArray(window.FincestemMasterTeachers)) {
          window.FincestemMasterTeachers.push(newTeacher);
        }

        // Set role jika disediakan
        if (teacherData.role_category) {
          this.setTeacherRole(cleanUser, teacherData.role_category);
        }

        return { success: true, teacher: newTeacher, message: 'Guru baru berhasil ditambahkan ke sistem!' };
      } catch (e) {
        return { success: false, message: 'Gagal menyimpan: ' + e.message };
      }
    },

    deleteCustomTeacher: function(identifier) {
      if (!identifier) return false;
      const cleanId = String(identifier).trim().toLowerCase();
      try {
        let customList = [];
        const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_TEACHERS);
        if (raw) customList = JSON.parse(raw) || [];

        const filtered = customList.filter(t => 
          String(t.username).trim().toLowerCase() !== cleanId &&
          String(t.kode_guru).trim().toLowerCase() !== cleanId
        );

        localStorage.setItem(STORAGE_KEY_CUSTOM_TEACHERS, JSON.stringify(filtered));

        // Hapus juga assignment binaannya
        this.clearTeacherAssignments(identifier);

        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * Role Kategori Guru:
     * - 'FIELD_TRIP' = Guru Pendamping Lapangan (Berangkat ke Jogja-Bromo)
     * - 'NON_FIELD_TRIP' = Guru Fasilitator Riset Mandiri (OKU Timur)
     * - 'KOORDINATOR' = Koordinator Projek Kokurikuler
     */
    getTeacherRole: function(teacherIdentifier) {
      if (!teacherIdentifier) return 'NON_FIELD_TRIP';
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      try {
        const raw = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
        if (raw) {
          const map = JSON.parse(raw);
          if (map && map[cleanKey]) return map[cleanKey];
        }
      } catch (e) {}

      // Fallback deteksi dari tugas tambahan bawaan
      const teachers = this.getTeachers();
      const found = teachers.find(t => 
        String(t.username).toLowerCase() === cleanKey ||
        String(t.nip).toLowerCase() === cleanKey ||
        String(t.kode_guru).toLowerCase() === cleanKey
      );
      if (found) {
        const tt = String(found.tugas_tambahan || '').toUpperCase();
        if (tt.includes('KOORD')) return 'KOORDINATOR';
      }
      return 'NON_FIELD_TRIP';
    },

    setTeacherRole: function(teacherIdentifier, roleCategory) {
      if (!teacherIdentifier) return;
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      try {
        let map = {};
        const raw = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
        if (raw) map = JSON.parse(raw) || {};
        map[cleanKey] = roleCategory;
        localStorage.setItem(STORAGE_KEY_TEACHER_ROLES, JSON.stringify(map));
      } catch (e) {}
    },

    /**
     * ==========================================
     * 2. PEMETAAN SISWA BINAAN (MENTOR ASSIGNMENTS)
     * ==========================================
     */
    getAssignmentsMap: function() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
        if (raw) {
          const map = JSON.parse(raw);
          if (map && typeof map === 'object') return map;
        }
      } catch (e) {}
      return {};
    },

    saveAssignmentsMap: function(map) {
      try {
        localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(map));
        return true;
      } catch (e) {
        console.error('Gagal simpan assignments map:', e);
        return false;
      }
    },

    getAssignedNisnsForTeacher: function(teacherIdentifier) {
      if (!teacherIdentifier) return [];
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const map = this.getAssignmentsMap();
      const entry = map[cleanKey];
      if (entry && Array.isArray(entry.student_nisns)) {
        return entry.student_nisns;
      }
      return [];
    },

    getStudentsForTeacher: function(teacherIdentifier) {
      const nisns = this.getAssignedNisnsForTeacher(teacherIdentifier);
      if (!nisns || !nisns.length) return [];

      const allStudents = window.FincestemMasterStudents || [];
      const nisnSet = new Set(nisns.map(n => String(n).trim()));

      return allStudents.filter(s => {
        const cleanNisn = String(s.nisn || '').trim();
        return nisnSet.has(cleanNisn);
      });
    },

    assignStudentsToTeacher: function(teacherIdentifier, nisnArray) {
      if (!teacherIdentifier || !Array.isArray(nisnArray)) return false;
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const map = this.getAssignmentsMap();

      // Temukan info nama guru
      const teachers = this.getTeachers();
      const tObj = teachers.find(t => 
        String(t.username).toLowerCase() === cleanKey ||
        String(t.nip).toLowerCase() === cleanKey ||
        String(t.kode_guru).toLowerCase() === cleanKey
      );
      const teacherName = tObj ? tObj.nama_guru : cleanKey;
      const teacherRole = this.getTeacherRole(cleanKey);

      // Pastikan entry guru ada
      if (!map[cleanKey]) {
        map[cleanKey] = {
          teacher_name: teacherName,
          teacher_role: teacherRole,
          student_nisns: []
        };
      }

      // Gabungkan NISN baru (set unik)
      const existingSet = new Set(map[cleanKey].student_nisns);
      nisnArray.forEach(n => {
        const sN = String(n).trim();
        if (sN) existingSet.add(sN);
      });

      // Lepas NISN ini dari guru lain jika ada (1 siswa 1 guru pembina utama)
      Object.keys(map).forEach(otherKey => {
        if (otherKey !== cleanKey && Array.isArray(map[otherKey].student_nisns)) {
          map[otherKey].student_nisns = map[otherKey].student_nisns.filter(n => !existingSet.has(String(n).trim()));
        }
      });

      map[cleanKey].student_nisns = Array.from(existingSet);
      map[cleanKey].updated_at = new Date().toISOString();

      return this.saveAssignmentsMap(map);
    },

    removeStudentFromTeacher: function(teacherIdentifier, nisn) {
      if (!teacherIdentifier || !nisn) return false;
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const cleanNisn = String(nisn).trim();
      const map = this.getAssignmentsMap();

      if (map[cleanKey] && Array.isArray(map[cleanKey].student_nisns)) {
        map[cleanKey].student_nisns = map[cleanKey].student_nisns.filter(n => String(n).trim() !== cleanNisn);
        map[cleanKey].updated_at = new Date().toISOString();
        return this.saveAssignmentsMap(map);
      }
      return false;
    },

    clearTeacherAssignments: function(teacherIdentifier) {
      if (!teacherIdentifier) return false;
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const map = this.getAssignmentsMap();
      if (map[cleanKey]) {
        delete map[cleanKey];
        return this.saveAssignmentsMap(map);
      }
      return false;
    },

    getTeacherForStudent: function(nisn) {
      if (!nisn) return null;
      const cleanNisn = String(nisn).trim();
      const map = this.getAssignmentsMap();

      for (const [tKey, entry] of Object.entries(map)) {
        if (entry && Array.isArray(entry.student_nisns)) {
          if (entry.student_nisns.includes(cleanNisn)) {
            return {
              teacher_key: tKey,
              teacher_name: entry.teacher_name || tKey,
              teacher_role: entry.teacher_role || 'NON_FIELD_TRIP'
            };
          }
        }
      }
      return null;
    },

    getAllAssignedNisns: function() {
      const map = this.getAssignmentsMap();
      const set = new Set();
      Object.values(map).forEach(entry => {
        if (entry && Array.isArray(entry.student_nisns)) {
          entry.student_nisns.forEach(n => set.add(String(n).trim()));
        }
      });
      return set;
    },

    /**
     * ==========================================
     * 3. STATISTIK RINGKASAN
     * ==========================================
     */
    getSummaryStats: function() {
      const allStudents = window.FincestemMasterStudents || [];
      const assignedNisns = this.getAllAssignedNisns();
      const teachers = this.getTeachers();
      const map = this.getAssignmentsMap();

      let ftTotal = 0;
      let nonFtTotal = 0;
      let ftAssigned = 0;
      let nonFtAssigned = 0;

      allStudents.forEach(s => {
        const isFT = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones.isFieldTripStudent)
          ? FincestemCore.zones.isFieldTripStudent(s.nisn, s.class || s.rombel, s.zone)
          : (s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true);
        const sNisn = String(s.nisn || '').trim();
        const isMapped = assignedNisns.has(sNisn);

        if (isFT) {
          ftTotal++;
          if (isMapped) ftAssigned++;
        } else {
          nonFtTotal++;
          if (isMapped) nonFtAssigned++;
        }
      });

      // Hitung guru yang sudah punya binaan
      let activeMentorsCount = 0;
      Object.values(map).forEach(e => {
        if (e && Array.isArray(e.student_nisns) && e.student_nisns.length > 0) {
          activeMentorsCount++;
        }
      });

      return {
        totalStudents: allStudents.length,
        totalAssigned: assignedNisns.size,
        totalUnassigned: allStudents.length - assignedNisns.size,
        ftTotal: ftTotal,
        ftAssigned: ftAssigned,
        ftUnassigned: ftTotal - ftAssigned,
        nonFtTotal: nonFtTotal,
        nonFtAssigned: nonFtAssigned,
        nonFtUnassigned: nonFtTotal - nonFtAssigned,
        totalTeachers: teachers.length,
        activeMentorsCount: activeMentorsCount
      };
    },

    /**
     * ==========================================
     * 4. CETAK KARTU KHUSUS SISWA BINAAN GURU
     * ==========================================
     */
    printMentorStudentCards: function(teacherIdentifier) {
      const students = this.getStudentsForTeacher(teacherIdentifier);
      if (!students || !students.length) {
        alert('Guru ini belum memiliki siswa binaan untuk dicetak kartunya!');
        return;
      }

      const teachers = this.getTeachers();
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const tObj = teachers.find(t => 
        String(t.username).toLowerCase() === cleanKey ||
        String(t.nip).toLowerCase() === cleanKey ||
        String(t.kode_guru).toLowerCase() === cleanKey
      );
      const teacherName = tObj ? tObj.nama_guru : teacherIdentifier;
      const teacherRole = this.getTeacherRole(teacherIdentifier);
      const roleLabel = teacherRole === 'FIELD_TRIP' ? 'Pendamping Field Trip' : 'Fasilitator Non-Field Trip';

      // Buat container print khusus di memory
      let printEl = document.getElementById('printAreaMentorCards');
      if (!printEl) {
        printEl = document.createElement('div');
        printEl.id = 'printAreaMentorCards';
        printEl.className = 'hidden print:block';
        document.body.appendChild(printEl);
      }

      const CARDS_PER_PAGE = 10;
      let pagesHtml = '';

      for (let i = 0; i < students.length; i += CARDS_PER_PAGE) {
        const pageCards = students.slice(i, i + CARDS_PER_PAGE);
        const isLastPage = (i + CARDS_PER_PAGE) >= students.length;
        const pageNum = Math.floor(i / CARDS_PER_PAGE) + 1;
        const totalPages = Math.ceil(students.length / CARDS_PER_PAGE);

        pagesHtml += `
          <div class="card-page ${!isLastPage ? 'page-break-card' : ''} p-4 bg-white text-slate-900" style="page-break-after: ${!isLastPage ? 'always' : 'auto'}; break-after: ${!isLastPage ? 'page' : 'auto'};">
            
            <!-- HEADER KOP HALAMAN CETAK -->
            <div class="border-b-2 border-slate-800 pb-2 mb-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-black text-sm">F</div>
                <div>
                  <h3 class="font-black text-xs uppercase tracking-wider text-slate-900 leading-tight">Kartu Login Peserta Kokurikuler FINCESTEM 2026</h3>
                  <p class="text-[10px] text-slate-600 font-medium">Pembina: <strong>${escapeHtml(teacherName)}</strong> (${roleLabel})</p>
                </div>
              </div>
              <div class="text-right text-[10px] text-slate-500 font-bold">
                <span>Hal ${pageNum} dari ${totalPages} • Total: ${students.length} Siswa</span>
              </div>
            </div>

            <!-- GRID KARTU (2 KOLOM X 5 BARIS = 10 KARTU PER LEMBAR F4) -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              ${pageCards.map((s) => {
                const isFT = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones.isFieldTripStudent)
                  ? FincestemCore.zones.isFieldTripStudent(s.nisn, s.class || s.rombel, s.zone)
                  : (s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true);
                const badgeText = isFT ? '🚌 Field Trip' : '🏫 Non-Field Trip';
                const badgeBg = isFT ? 'background-color: #f59e0b; color: #000;' : 'background-color: #0d9488; color: #fff;';
                const pwd = s.password || (s.nisn ? s.nisn.slice(-6) : '123456');

                return `
                  <div style="border: 1.5px solid #334155; border-radius: 10px; padding: 7px; display: flex; flex-direction: column; justify-content: space-between; height: 130px; box-sizing: border-box; background: #fff;">
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px;">
                      <span style="font-size: 8.5px; font-weight: 900; color: #0f172a; text-transform: uppercase;">SMAN 1 BELITANG</span>
                      <span style="font-size: 8px; font-weight: 800; padding: 1px 5px; border-radius: 4px; ${badgeBg}">${badgeText}</span>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center; margin-top: 3px;">
                      <div style="width: 36px; height: 36px; border-radius: 8px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; color: #475569; shrink: 0;">
                        ${(s.nama || 'S').charAt(0).toUpperCase()}
                      </div>
                      <div style="min-width: 0; flex: 1;">
                        <h4 style="font-size: 10.5px; font-weight: 900; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${escapeHtml(s.nama || '-')}
                        </h4>
                        <div style="font-size: 8.5px; color: #475569; font-weight: 600;">
                          <span>NISN: <strong>${escapeHtml(s.nisn || '-')}</strong></span> • <span>${escapeHtml(s.class || s.rombel || '-')}</span>
                        </div>
                      </div>
                    </div>

                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; margin-top: 3px; font-size: 8.5px;">
                      <div>User: <strong style="color: #0f172a;">${escapeHtml(s.nisn || '-')}</strong></div>
                      <div>Pass: <strong style="color: #0f172a; font-family: monospace;">${escapeHtml(pwd)}</strong></div>
                    </div>

                    <div style="font-size: 7.5px; color: #64748b; text-align: center; margin-top: 2px;">
                      Pembina: <strong>${escapeHtml(teacherName)}</strong>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

          </div>
        `;
      }

      printEl.innerHTML = pagesHtml;

      // Panggil Dialog Print Browser
      const originalTitle = document.title;
      document.title = `Kartu_Login_Binaan_${teacherName.replace(/\s+/g, '_')}`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Daftarkan ke window
  window.FincestemMentorship = MentorshipModule;

})(window);
