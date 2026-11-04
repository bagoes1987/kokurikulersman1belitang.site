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
  const STORAGE_KEY_MENTOR_CUSTOM_TEACHERS = 'fincestem_mentorship_custom_teachers';

  function normalizeTeacherName(name) {
    return String(name || '').replace(/\s+/g, ' ').trim().toUpperCase();
  }

  // In-Memory High-Performance Caches untuk mencegah ribuan JSON.parse & query localStorage berulang
  let _cachedTeachersList = null;
  let _cachedTeacherIdentifierIndex = null;
  let _cachedTeacherRolesMap = null;
  let _cachedAssignmentsMap = null;

  function invalidateMentorshipCache(keepAssignments) {
    _cachedTeachersList = null;
    _cachedTeacherIdentifierIndex = null;
    _cachedTeacherRolesMap = null;
    if (!keepAssignments) {
      _cachedAssignmentsMap = null;
    }
  }

  const MentorshipModule = {
    invalidateCache: invalidateMentorshipCache,
    findMentorForStudent: function(nisn) {
      const res = this.getTeacherForStudent(nisn);
      if (!res) return null;
      const tObj = this.findTeacherByIdentifier(res.teacher_key);
      return {
        teacher_key: res.teacher_key,
        teacher_name: res.teacher_name,
        teacher_role: res.teacher_role,
        teacher: tObj
      };
    },

    /**
     * ==========================================
     * 1. DATA GURU (MASTER UNIK 86 GURU + CUSTOM TAMBAHAN)
     * ==========================================
     */
    getTeachers: function(forceFresh) {
      if (!forceFresh && _cachedTeachersList !== null) {
        return _cachedTeachersList;
      }
      // 1. Ambil Guru Master Bawaan SMAN 1 Belitang (116 baris penugasan -> 86 guru unik)
      let masterList = Array.isArray(window.FincestemMasterTeachers) ? window.FincestemMasterTeachers : [];
      
      // 2. Ambil Guru Tambahan Manual dari LocalStorage
      let customList = [];
      try {
        const rawMentorCustom = localStorage.getItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS);
        if (rawMentorCustom) {
          const parsed = JSON.parse(rawMentorCustom);
          if (Array.isArray(parsed)) customList = customList.concat(parsed);
        }
        const rawLegacyCustom = localStorage.getItem(STORAGE_KEY_CUSTOM_TEACHERS);
        if (rawLegacyCustom) {
          const parsedLegacy = JSON.parse(rawLegacyCustom);
          if (Array.isArray(parsedLegacy)) customList = customList.concat(parsedLegacy);
        }
      } catch (e) {
        console.warn('Gagal membaca custom teachers:', e);
      }

      const rawAll = [...masterList, ...customList];
      const uniqueTeachers = [];
      const indexByName = new Map();
      const indexByUser = new Map();
      const indexByNip = new Map();

      rawAll.forEach(item => {
        if (!item || !item.nama_guru) return;
        const normName = normalizeTeacherName(item.nama_guru);
        const normUser = String(item.username || '').trim().toLowerCase();
        const normNip = (item.nip && String(item.nip).trim() !== '-') ? String(item.nip).trim().toLowerCase() : '';
        const normKode = String(item.kode_guru || '').trim();

        let existingIdx = -1;
        if (normName && indexByName.has(normName)) {
          existingIdx = indexByName.get(normName);
        } else if (normUser && indexByUser.has(normUser)) {
          existingIdx = indexByUser.get(normUser);
        } else if (normNip && indexByNip.has(normNip)) {
          existingIdx = indexByNip.get(normNip);
        }

        if (existingIdx === -1) {
          const cloned = Object.assign({}, item, {
            no: uniqueTeachers.length + 1,
            kode_guru_list: normKode ? [normKode] : [],
            kode_guru_display: normKode || '-',
            mapel_list: (item.mata_pelajaran && item.mata_pelajaran !== '-') ? [String(item.mata_pelajaran).trim()] : [],
            tugas_list: (item.tugas_tambahan && item.tugas_tambahan !== '-') ? [String(item.tugas_tambahan).trim()] : [],
            aliases: []
          });
          if (normUser) cloned.aliases.push(normUser);
          if (normNip && !cloned.aliases.includes(normNip)) cloned.aliases.push(normNip);
          if (normKode && !cloned.aliases.includes(normKode.toLowerCase())) cloned.aliases.push(normKode.toLowerCase());

          const newIdx = uniqueTeachers.length;
          uniqueTeachers.push(cloned);
          if (normName) indexByName.set(normName, newIdx);
          if (normUser) indexByUser.set(normUser, newIdx);
          if (normNip) indexByNip.set(normNip, newIdx);
        } else {
          // Gabungkan baris penugasan ganda (mapel / kode_guru / tugas_tambahan) ke 1 akun guru unik
          const existing = uniqueTeachers[existingIdx];
          if (normKode && !existing.kode_guru_list.includes(normKode)) {
            existing.kode_guru_list.push(normKode);
            existing.kode_guru_display = existing.kode_guru_list.join(', ');
          }
          const mapelStr = String(item.mata_pelajaran || '').trim();
          if (mapelStr && mapelStr !== '-' && !existing.mapel_list.includes(mapelStr)) {
            existing.mapel_list.push(mapelStr);
            existing.mata_pelajaran = existing.mapel_list.join(', ');
          }
          const tugasStr = String(item.tugas_tambahan || '').trim();
          if (tugasStr && tugasStr !== '-' && !existing.tugas_list.includes(tugasStr)) {
            existing.tugas_list.push(tugasStr);
            existing.tugas_tambahan = existing.tugas_list.join(' • ');
          }
          if ((!existing.nip || existing.nip === '-') && normNip) {
            existing.nip = String(item.nip).trim();
          }
          if (normUser && !existing.aliases.includes(normUser)) {
            existing.aliases.push(normUser);
            indexByUser.set(normUser, existingIdx);
          }
          if (normNip && !existing.aliases.includes(normNip)) {
            existing.aliases.push(normNip);
            indexByNip.set(normNip, existingIdx);
          }
          if (normKode && !existing.aliases.includes(normKode.toLowerCase())) {
            existing.aliases.push(normKode.toLowerCase());
          }
        }
      });

      _cachedTeachersList = uniqueTeachers;

      // Bangun lookup index O(1) identifier -> teacher object
      const identMap = new Map();
      uniqueTeachers.forEach(t => {
        const u = String(t.username || '').trim().toLowerCase();
        const nip = String(t.nip || '').trim().toLowerCase();
        const kode = String(t.kode_guru || '').trim().toLowerCase();
        const normName = normalizeTeacherName(t.nama_guru);
        if (u) identMap.set(u, t);
        if (nip && nip !== '-') identMap.set(nip, t);
        if (kode && kode !== '-') identMap.set(kode, t);
        if (normName) identMap.set(normName, t);
        if (Array.isArray(t.aliases)) {
          t.aliases.forEach(a => {
            const cleanA = String(a || '').trim().toLowerCase();
            if (cleanA) identMap.set(cleanA, t);
          });
        }
      });
      _cachedTeacherIdentifierIndex = identMap;

      return uniqueTeachers;
    },

    findTeacherByIdentifier: function(identifier) {
      if (!identifier) return null;
      const cleanKey = String(identifier).trim().toLowerCase();
      const normName = normalizeTeacherName(identifier);

      if (_cachedTeacherIdentifierIndex) {
        const found = _cachedTeacherIdentifierIndex.get(cleanKey) || _cachedTeacherIdentifierIndex.get(normName);
        if (found) return found;
      }

      const teachers = this.getTeachers();
      if (_cachedTeacherIdentifierIndex) {
        const found = _cachedTeacherIdentifierIndex.get(cleanKey) || _cachedTeacherIdentifierIndex.get(normName);
        if (found) return found;
      }
      return teachers.find(t =>
        String(t.username || '').toLowerCase() === cleanKey ||
        String(t.nip || '').toLowerCase() === cleanKey ||
        String(t.kode_guru || '').toLowerCase() === cleanKey ||
        (Array.isArray(t.aliases) && t.aliases.includes(cleanKey)) ||
        normalizeTeacherName(t.nama_guru) === normName
      ) || null;
    },

    resolveCanonicalKey: function(identifier) {
      if (!identifier) return '';
      const found = this.findTeacherByIdentifier(identifier);
      if (found) {
        return String(found.username || found.nip || found.kode_guru).trim().toLowerCase();
      }
      return String(identifier).trim().toLowerCase();
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

      // Simpan ke storage custom teachers mentorship
      try {
        let customList = [];
        const raw = localStorage.getItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS);
        if (raw) customList = JSON.parse(raw) || [];
        customList.push(newTeacher);
        localStorage.setItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS, JSON.stringify(customList));

        // Update runtime window.FincestemMasterTeachers agar langsung bisa login
        if (Array.isArray(window.FincestemMasterTeachers)) {
          window.FincestemMasterTeachers.push(newTeacher);
        }

        // Set role jika disediakan
        if (teacherData.role_category) {
          this.setTeacherRole(cleanUser, teacherData.role_category);
        } else {
          this.syncToServer();
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
        const raw = localStorage.getItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS);
        if (raw) customList = JSON.parse(raw) || [];

        const filtered = customList.filter(t => 
          String(t.username).trim().toLowerCase() !== cleanId &&
          String(t.kode_guru).trim().toLowerCase() !== cleanId
        );

        localStorage.setItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS, JSON.stringify(filtered));

        // Hapus juga assignment binaannya
        this.clearTeacherAssignments(identifier);
        this.syncToServer();

        return true;
      } catch (e) {
        return false;
      }
    },

    /**
     * SINKRONISASI REAL-TIME KE DATABASE SERVER (cPanel / MySQL)
     */
    getApiBase: function() {
      if (window.FincestemCore && FincestemCore.api && FincestemCore.api.base) {
        return FincestemCore.api.base;
      }
      return '../api';
    },

    syncToServer: function(callback, isAdminSave) {
      if (!window.location || !window.location.protocol.startsWith('http')) {
        if (callback) callback({ success: true });
        return;
      }
      const self = this;
      try {
        const assignments = this.getAssignmentsMap();
        let teacherRoles = {};
        try {
          const rawR = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
          if (rawR) teacherRoles = JSON.parse(rawR) || {};
        } catch (eR) {}
        let customTeachers = [];
        try {
          const rawC = localStorage.getItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS);
          if (rawC) customTeachers = JSON.parse(rawC) || [];
        } catch (eC) {}

        fetch(this.getApiBase() + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save_mentorship_data',
            replace_all: !!isAdminSave,
            assignments: assignments,
            teacher_roles: teacherRoles,
            custom_teachers: customTeachers,
            student_zones: (function() { try { const z = localStorage.getItem('fincestem_student_zones_map'); return z ? (JSON.parse(z) || {}) : {}; } catch(e) { return {}; } })()
          })
        })
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              self.applyServerState(res.data);
            }
            if (callback) callback(res);
          })
          .catch(() => { if (callback) callback({ success: false }); });
      } catch (e) {
        if (callback) callback({ success: false });
      }
    },

    applyServerState: function(state) {
      if (!state || typeof state !== 'object') return false;
      invalidateMentorshipCache(true);
      let updated = false;
      try {
        // 1. Smart Merge Assignments per-Guru (Multi-PC Safe)
        const localAssigns = this.getAssignmentsMap(true);
        const serverAssigns = (state.assignments && typeof state.assignments === 'object') ? state.assignments : {};
        let mergedAssigns = Object.assign({}, localAssigns);
        let assignChanged = false;

        let totalServerStudents = 0;
        Object.values(serverAssigns).forEach(e => {
          if (e && Array.isArray(e.student_nisns)) totalServerStudents += e.student_nisns.length;
        });
        let totalLocalStudents = 0;
        Object.values(localAssigns).forEach(e => {
          if (e && Array.isArray(e.student_nisns)) totalLocalStudents += e.student_nisns.length;
        });

        // Proteksi: jika server memiliki banyak siswa binaan sedangkan lokal kosong, ambil server utuh!
        if (totalServerStudents > 0 && totalLocalStudents === 0) {
          mergedAssigns = Object.assign({}, serverAssigns);
          assignChanged = true;
        } else {
          Object.keys(serverAssigns).forEach(tKey => {
            const sEntry = serverAssigns[tKey];
            if (!sEntry || typeof sEntry !== 'object') return;
            const lEntry = mergedAssigns[tKey];
            if (!lEntry) {
              mergedAssigns[tKey] = sEntry;
              assignChanged = true;
            } else {
              const sCount = Array.isArray(sEntry.student_nisns) ? sEntry.student_nisns.length : 0;
              const lCount = Array.isArray(lEntry.student_nisns) ? lEntry.student_nisns.length : 0;
              const sTime = sEntry.updated_at ? Date.parse(sEntry.updated_at) || 0 : 0;
              const lTime = lEntry.updated_at ? Date.parse(lEntry.updated_at) || 0 : 0;

              // Ambil server jika ada data siswa sedangkan lokal kosong, atau server lebih baru, atau server lebih lengkap
              if (sCount > 0 && lCount === 0) {
                mergedAssigns[tKey] = sEntry;
                assignChanged = true;
              } else if (sTime >= lTime && JSON.stringify(lEntry) !== JSON.stringify(sEntry)) {
                mergedAssigns[tKey] = sEntry;
                assignChanged = true;
              } else if (sCount > lCount) {
                mergedAssigns[tKey] = sEntry;
                assignChanged = true;
              }
            }
          });
        }

        if (assignChanged || (serverAssigns && Object.keys(serverAssigns).length > 0)) {
          _cachedAssignmentsMap = mergedAssigns;
          try {
            localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(mergedAssigns));
          } catch (e) {}
          updated = true;
        }

        // 2. Smart Merge Teacher Roles per-Guru
        const serverRoles = (state.teacher_roles && typeof state.teacher_roles === 'object') ? state.teacher_roles : {};
        if (Object.keys(serverRoles).length > 0) {
          let localRoles = {};
          try {
            const rawR = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
            if (rawR) localRoles = JSON.parse(rawR) || {};
          } catch (eR) {}
          const mergedRoles = Object.assign({}, localRoles, serverRoles);
          if (JSON.stringify(localRoles) !== JSON.stringify(mergedRoles)) {
            localStorage.setItem(STORAGE_KEY_TEACHER_ROLES, JSON.stringify(mergedRoles));
            _cachedTeacherRolesMap = mergedRoles;
            updated = true;
          }
        }

        // 3. Smart Merge Custom Teachers
        if (Array.isArray(state.custom_teachers) && state.custom_teachers.length > 0) {
          let localCust = [];
          try {
            const rawC = localStorage.getItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS);
            if (rawC) localCust = JSON.parse(rawC) || [];
          } catch (eC) {}
          const custMap = new Map();
          localCust.forEach(c => { if (c && c.username) custMap.set(String(c.username).toLowerCase(), c); });
          state.custom_teachers.forEach(c => { if (c && c.username) custMap.set(String(c.username).toLowerCase(), c); });
          const mergedCust = Array.from(custMap.values());
          if (JSON.stringify(localCust) !== JSON.stringify(mergedCust)) {
            localStorage.setItem(STORAGE_KEY_MENTOR_CUSTOM_TEACHERS, JSON.stringify(mergedCust));
            _cachedTeachersList = null;
            _cachedTeacherIdentifierIndex = null;
            updated = true;
          }
        }

        // 4. Smart Merge & Sinkronisasi Zona Siswa (Field Trip vs Non-Field Trip)
        if (state.student_zones && typeof state.student_zones === 'object') {
          let localZones = {};
          try {
            const rawZ = localStorage.getItem('fincestem_student_zones_map');
            if (rawZ) localZones = JSON.parse(rawZ) || {};
          } catch (eZ) {}
          // JANGAN menimpa perubahan lokal yang baru saja disimpan oleh Admin
          // Server state digabungkan dulu, lalu localZones menimpa (local takes priority)
          const mergedZones = Object.assign({}, state.student_zones, localZones);
          if (JSON.stringify(localZones) !== JSON.stringify(mergedZones)) {
            localStorage.setItem('fincestem_student_zones_map', JSON.stringify(mergedZones));
            updated = true;
          }
          Object.keys(mergedZones).forEach(n => {
            const z = state.student_zones[n];
            if (z) {
              try { localStorage.setItem('fincestem_student_zone_' + n, z); } catch (e) {}
            }
          });
          if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
            window.FincestemMasterStudents.forEach(s => {
              const sNisn = String(s.nisn || '').trim();
              const sNis = String(s.nis || '').trim();
              const rawDigits = sNisn.replace(/\D/g, '');
              const padded = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : sNisn;
              const unpadded = rawDigits.replace(/^0+/, '');
              const z = mergedZones[sNisn] || mergedZones[padded] || (unpadded ? mergedZones[unpadded] : null) || mergedZones[sNis];
              if (z) {
                s.zone = z;
                s.is_field_trip = String(z).toUpperCase().includes('LUAR');
              }
            });
          }
        }
      } catch (e) {}
      invalidateMentorshipCache(true);
      return updated;
    },

    syncFromServer: function(callback) {
      const self = this;
      if (!window.location || !window.location.protocol.startsWith('http')) {
        if (callback) callback(false);
        return;
      }
      fetch(this.getApiBase() + '/settings.php?action=get_mentorship_data&_t=' + Date.now(), { cache: 'no-store' })
        .then(r => r.json())
        .then(res => {
          if (res && res.success && res.data) {
            const serverAssigns = (res.data.assignments && typeof res.data.assignments === 'object') ? res.data.assignments : {};
            const serverRoles = (res.data.teacher_roles && typeof res.data.teacher_roles === 'object') ? res.data.teacher_roles : {};
            const localAssignsBefore = self.getAssignmentsMap(true);
            let localRolesBefore = {};
            try {
              const r = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
              if (r) localRolesBefore = JSON.parse(r) || {};
            } catch (e) {}

            // Cek apakah PC ini memiliki data lokal yang belum pernah terunggah ke server (misal PC Kantor)
            const hasUnsyncedLocal = Object.keys(localAssignsBefore).some(k => !serverAssigns[k]) ||
                                     Object.keys(localRolesBefore).some(k => !serverRoles[k]);

            const changed = self.applyServerState(res.data);
            invalidateMentorshipCache();

            if (hasUnsyncedLocal) {
              self.syncToServer(function() {
                if (callback) callback(true, res.data);
              });
            } else {
              if (callback) callback(changed, res.data);
            }
          } else {
            if (callback) callback(false);
          }
        })
        .catch(() => {
          if (callback) callback(false);
        });
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
      const canonicalKey = this.resolveCanonicalKey(teacherIdentifier);

      if (_cachedTeacherRolesMap === null) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
          _cachedTeacherRolesMap = raw ? (JSON.parse(raw) || {}) : {};
        } catch (e) {
          _cachedTeacherRolesMap = {};
        }
      }

      if (_cachedTeacherRolesMap[canonicalKey]) return _cachedTeacherRolesMap[canonicalKey];
      if (_cachedTeacherRolesMap[cleanKey]) return _cachedTeacherRolesMap[cleanKey];

      // Fallback deteksi dari tugas tambahan bawaan
      const found = this.findTeacherByIdentifier(teacherIdentifier);
      if (found) {
        const tt = String(found.tugas_tambahan || '').toUpperCase();
        const mp = String(found.mata_pelajaran || '').toUpperCase();
        if (tt.includes('KOORD') || mp.includes('KOORD')) return 'KOORDINATOR';
      }
      return 'NON_FIELD_TRIP';
    },

    setTeacherRole: function(teacherIdentifier, roleCategory) {
      if (!teacherIdentifier) return;
      const canonicalKey = this.resolveCanonicalKey(teacherIdentifier);
      try {
        let map = {};
        const raw = localStorage.getItem(STORAGE_KEY_TEACHER_ROLES);
        if (raw) map = JSON.parse(raw) || {};
        map[canonicalKey] = roleCategory;
        localStorage.setItem(STORAGE_KEY_TEACHER_ROLES, JSON.stringify(map));
        _cachedTeacherRolesMap = map;

        // Sinkronkan juga role di dalam assignments map jika sudah ada
        const assignMap = this.getAssignmentsMap();
        if (assignMap[canonicalKey]) {
          assignMap[canonicalKey].teacher_role = roleCategory;
          this.saveAssignmentsMap(assignMap);
        }
        this.syncToServer();
      } catch (e) {}
    },

    /**
     * ==========================================
     * 2. PEMETAAN SISWA BINAAN (MENTOR ASSIGNMENTS)
     * ==========================================
     */
    getAssignmentsMap: function(forceFresh) {
      if (!forceFresh && _cachedAssignmentsMap !== null && typeof _cachedAssignmentsMap === 'object' && Object.keys(_cachedAssignmentsMap).length > 0) {
        return _cachedAssignmentsMap;
      }
      try {
        const raw = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
        if (raw) {
          const map = JSON.parse(raw);
          if (map && typeof map === 'object' && Object.keys(map).length > 0) {
            _cachedAssignmentsMap = map;
            return map;
          }
        }
      } catch (e) {}
      if (_cachedAssignmentsMap && typeof _cachedAssignmentsMap === 'object') {
        return _cachedAssignmentsMap;
      }
      _cachedAssignmentsMap = {};
      return _cachedAssignmentsMap;
    },

    saveAssignmentsMap: function(map, isAdminSave) {
      _cachedAssignmentsMap = map;
      try {
        localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(map));
        this.syncToServer(null, isAdminSave !== false);
        return true;
      } catch (e) {
        console.error('Gagal simpan assignments map:', e);
        return false;
      }
    },

    setFacilitatorCoordinator: function(facilitatorIdentifier, coordinatorIdentifier) {
      if (!facilitatorIdentifier) return false;
      const fasilObj = this.findTeacherByIdentifier(facilitatorIdentifier);
      const fasilKey = fasilObj
        ? String(fasilObj.username || fasilObj.nip || fasilObj.kode_guru).trim().toLowerCase()
        : String(facilitatorIdentifier).trim().toLowerCase();
      const fasilName = fasilObj ? fasilObj.nama_guru : fasilKey;
      const fasilRole = this.getTeacherRole(fasilKey);

      const map = this.getAssignmentsMap();
      if (!map[fasilKey]) {
        map[fasilKey] = {
          teacher_name: fasilName,
          teacher_role: fasilRole,
          student_nisns: []
        };
      }

      if (!coordinatorIdentifier) {
        delete map[fasilKey].coordinator_key;
        delete map[fasilKey].coordinator_name;
      } else {
        const coordObj = this.findTeacherByIdentifier(coordinatorIdentifier);
        const coordKey = coordObj
          ? String(coordObj.username || coordObj.nip || coordObj.kode_guru).trim().toLowerCase()
          : String(coordinatorIdentifier).trim().toLowerCase();
        const coordName = coordObj ? coordObj.nama_guru : coordKey;
        map[fasilKey].coordinator_key = coordKey;
        map[fasilKey].coordinator_name = coordName;
      }
      map[fasilKey].updated_at = new Date().toISOString();
      return this.saveAssignmentsMap(map);
    },

    getFacilitatorCoordinator: function(facilitatorIdentifier) {
      if (!facilitatorIdentifier) return null;
      const fasilKey = this.resolveCanonicalKey(facilitatorIdentifier);
      const map = this.getAssignmentsMap();
      const entry = map[fasilKey] || map[String(facilitatorIdentifier).trim().toLowerCase()];
      if (entry && entry.coordinator_key) {
        return {
          coordinator_key: entry.coordinator_key,
          coordinator_name: entry.coordinator_name || entry.coordinator_key
        };
      }
      return null;
    },

    getAssignedNisnsForTeacher: function(teacherIdentifier) {
      if (!teacherIdentifier) return [];
      const cleanKey = String(teacherIdentifier).trim().toLowerCase();
      const tObj = this.findTeacherByIdentifier(teacherIdentifier);
      const map = this.getAssignmentsMap();
      const keysToCheck = new Set([cleanKey]);
      if (tObj) {
        if (tObj.username) keysToCheck.add(String(tObj.username).trim().toLowerCase());
        if (tObj.nip && tObj.nip !== '-') keysToCheck.add(String(tObj.nip).trim().toLowerCase());
        if (tObj.kode_guru && tObj.kode_guru !== '-') keysToCheck.add(String(tObj.kode_guru).trim().toLowerCase());
        if (tObj.nama_guru) {
          keysToCheck.add(String(tObj.nama_guru).trim().toLowerCase());
          const normN = normalizeTeacherName(tObj.nama_guru);
          if (normN) keysToCheck.add(normN);
        }
        if (Array.isArray(tObj.aliases)) {
          tObj.aliases.forEach(a => keysToCheck.add(String(a).toLowerCase()));
        }
      }
      const nisnSet = new Set();
      Object.keys(map).forEach(k => {
        const entry = map[k];
        if (!entry) return;
        const entryMatch = keysToCheck.has(k) ||
          (tObj && entry.teacher_name && normalizeTeacherName(entry.teacher_name) === normalizeTeacherName(tObj.nama_guru));
        if (entryMatch && Array.isArray(entry.student_nisns)) {
          entry.student_nisns.forEach(n => {
            const sN = String(n).trim();
            if (sN) nisnSet.add(sN);
          });
        }
      });

      // Jika guru ini adalah Koordinator, gabungkan juga siswa dari Fasilitator yang ditautkan ke Koordinator ini
      const role = this.getTeacherRole(cleanKey);
      if (role === 'KOORDINATOR') {
        Object.values(map).forEach(entry => {
          if (entry && entry.coordinator_key && keysToCheck.has(String(entry.coordinator_key).toLowerCase())) {
            if (Array.isArray(entry.student_nisns)) {
              entry.student_nisns.forEach(n => {
                const sN = String(n).trim();
                if (sN) nisnSet.add(sN);
              });
            }
          }
        });
      }

      return Array.from(nisnSet);
    },

    getStudentsForTeacher: function(teacherIdentifier) {
      const nisns = this.getAssignedNisnsForTeacher(teacherIdentifier);
      if (!nisns || !nisns.length) return [];

      const allStudents = window.FincestemMasterStudents || [];
      const nisnSet = new Set();
      nisns.forEach(n => {
        const clean = String(n).trim();
        if (!clean) return;
        nisnSet.add(clean);
        const digits = clean.replace(/\D/g, '');
        if (digits.length >= 8 && digits.length <= 10) {
          nisnSet.add(digits.padStart(10, '0'));
          const unp = digits.replace(/^0+/, '');
          if (unp) nisnSet.add(unp);
        }
      });

      const matched = allStudents.filter(s => {
        const cleanNisn = String(s.nisn || '').trim();
        const sNis = String(s.nis || '').trim();
        return nisnSet.has(cleanNisn) || (sNis && nisnSet.has(sNis));
      });
      if (matched.length > 0) return matched;
      return nisns.map(n => ({
        nisn: n,
        nama: 'Siswa ' + n,
        name: 'Siswa ' + n,
        class: 'Binaan',
        rombel: 'Binaan'
      }));
    },

    assignStudentsToTeacher: function(teacherIdentifier, nisnArray) {
      if (!teacherIdentifier || !Array.isArray(nisnArray)) return false;
      const tObj = this.findTeacherByIdentifier(teacherIdentifier);
      const cleanKey = tObj
        ? String(tObj.username || tObj.nip || tObj.kode_guru).trim().toLowerCase()
        : String(teacherIdentifier).trim().toLowerCase();
      const map = this.getAssignmentsMap();

      const teacherName = tObj ? tObj.nama_guru : cleanKey;
      const teacherRole = this.getTeacherRole(cleanKey);

      // Pastikan entry guru ada
      if (!map[cleanKey]) {
        map[cleanKey] = {
          teacher_name: teacherName,
          teacher_role: teacherRole,
          student_nisns: []
        };
      } else {
        map[cleanKey].teacher_name = teacherName;
        map[cleanKey].teacher_role = teacherRole;
      }

      // Gabungkan NISN baru (set unik) dari entry langsung guru ini
      const currentDirect = Array.isArray(map[cleanKey].student_nisns) ? map[cleanKey].student_nisns : [];
      const existingSet = new Set(currentDirect.map(n => String(n).trim()).filter(Boolean));
      const newlyAddedNisns = new Set();
      nisnArray.forEach(n => {
        const sN = String(n).trim();
        if (sN) {
          existingSet.add(sN);
          newlyAddedNisns.add(sN);
        }
      });

      // Lepas NISN ini dari guru pembina lain (1 siswa dibina oleh 1 Guru Fasilitator Utama)
      // Perbarui juga timestamp pada guru lain yang terkena pelepasan siswa
      const nowIso = new Date().toISOString();
      const aliasSet = new Set(tObj && Array.isArray(tObj.aliases) ? tObj.aliases : []);
      Object.keys(map).forEach(otherKey => {
        if (otherKey !== cleanKey) {
          if (aliasSet.has(otherKey.toLowerCase())) {
            delete map[otherKey];
          } else if (Array.isArray(map[otherKey].student_nisns)) {
            const beforeCount = map[otherKey].student_nisns.length;
            map[otherKey].student_nisns = map[otherKey].student_nisns.filter(n => !newlyAddedNisns.has(String(n).trim()));
            if (map[otherKey].student_nisns.length !== beforeCount) {
              map[otherKey].updated_at = nowIso;
            }
          }
        }
      });

      map[cleanKey].student_nisns = Array.from(existingSet);
      map[cleanKey].updated_at = nowIso;

      return this.saveAssignmentsMap(map, true);
    },

    removeStudentFromTeacher: function(teacherIdentifier, nisn) {
      if (!teacherIdentifier || !nisn) return false;
      const tObj = this.findTeacherByIdentifier(teacherIdentifier);
      const cleanKey = tObj
        ? String(tObj.username || tObj.nip || tObj.kode_guru).trim().toLowerCase()
        : String(teacherIdentifier).trim().toLowerCase();
      const cleanNisn = String(nisn).trim();
      const map = this.getAssignmentsMap();
      const keysToCheck = new Set([cleanKey, String(teacherIdentifier).trim().toLowerCase()]);
      if (tObj && Array.isArray(tObj.aliases)) {
        tObj.aliases.forEach(a => keysToCheck.add(String(a).toLowerCase()));
      }

      let changed = false;
      keysToCheck.forEach(k => {
        if (map[k] && Array.isArray(map[k].student_nisns)) {
          map[k].student_nisns = map[k].student_nisns.filter(n => String(n).trim() !== cleanNisn);
          map[k].updated_at = new Date().toISOString();
          changed = true;
        }
      });
      return changed ? this.saveAssignmentsMap(map) : false;
    },

    clearTeacherAssignments: function(teacherIdentifier) {
      if (!teacherIdentifier) return false;
      const tObj = this.findTeacherByIdentifier(teacherIdentifier);
      const cleanKey = tObj
        ? String(tObj.username || tObj.nip || tObj.kode_guru).trim().toLowerCase()
        : String(teacherIdentifier).trim().toLowerCase();
      const map = this.getAssignmentsMap();
      const keysToCheck = new Set([cleanKey, String(teacherIdentifier).trim().toLowerCase()]);
      if (tObj && Array.isArray(tObj.aliases)) {
        tObj.aliases.forEach(a => keysToCheck.add(String(a).toLowerCase()));
      }

      let changed = false;
      const nowIso = new Date().toISOString();
      keysToCheck.forEach(k => {
        if (map[k]) {
          if (k === cleanKey) {
            map[k].student_nisns = [];
            map[k].updated_at = nowIso;
          } else {
            delete map[k];
          }
          changed = true;
        }
      });
      return changed ? this.saveAssignmentsMap(map) : false;
    },

    getTeacherForStudent: function(nisn, filterRole) {
      if (!nisn) return null;
      const cleanNisn = String(nisn).trim();
      const digits = cleanNisn.replace(/\D/g, '');
      const padded = (digits.length >= 8 && digits.length <= 10) ? digits.padStart(10, '0') : cleanNisn;
      const unpadded = digits.replace(/^0+/, '') || cleanNisn;
      const map = this.getAssignmentsMap();

      for (const [tKey, entry] of Object.entries(map)) {
        if (entry && Array.isArray(entry.student_nisns)) {
          const role = this.getTeacherRole(tKey);
          if (filterRole === 'KOORDINATOR' && role !== 'KOORDINATOR') continue;

          if (
            entry.student_nisns.includes(cleanNisn) ||
            entry.student_nisns.includes(padded) ||
            entry.student_nisns.includes(unpadded)
          ) {
            const tObj = this.findTeacherByIdentifier(tKey);
            return {
              teacher_key: tKey,
              teacher_name: (tObj && tObj.nama_guru) || entry.teacher_name || tKey,
              teacher_role: role,
              coordinator_key: entry.coordinator_key || '',
              coordinator_name: entry.coordinator_name || ''
            };
          }
        }
      }
      return null;
    },

    /**
     * Mengambil Nama Koordinator (dari Data Koordinator & Fasil per Kelas)
     * & Fasilitator Siswa (dari Pembagian Siswa Binaan per NISN)
     * Digunakan untuk Dashboard Siswa, Cetak Kartu Siswa, dan Cetak Kartu Binaan.
     */
    getMentorsForStudent: function(nisn, studentClass) {
      const result = {
        coordinator: '-',
        coordinator_name: '',
        coordinator_single: '-',
        facilitator: '-',
        facilitator_name: '',
        facilitator_key: '',
        facilitators: [],
        facilitator1: '-',
        facilitator2: '-'
      };

      // 1. KOORDINATOR: Ambil dari pengaturan Menu Data Koordinator & Fasil (per Kelas/Rombel)
      if (studentClass) {
        const normTarget = String(studentClass || '').replace(/^KELAS\s+/i, '').trim().toUpperCase();
        try {
          const local = (window.FincestemCore && FincestemCore.assignments && FincestemCore.assignments.getLocalAssignments)
            ? FincestemCore.assignments.getLocalAssignments()
            : JSON.parse(localStorage.getItem('fincestem_role_assignments') || '{}');
          const coordMatches = (local.coordinators || []).filter(c =>
            String(c.class_name || '').replace(/^KELAS\s+/i, '').trim().toUpperCase() === normTarget
          );
          if (coordMatches.length > 0) {
            const cNames = [...new Set(coordMatches.map(c => c.teacher_name || c.teacher_username).filter(Boolean))];
            if (cNames.length > 0) {
              result.coordinator = cNames[0];
              result.coordinator_single = cNames[0];
              result.coordinator_name = cNames.join('\n');
            }
          }
        } catch (e) {}
      }

      if (!nisn) return result;

      // 2. FASILITATOR: Murni diambil dari Pembagian Siswa Binaan berdasarkan NISN siswa
      const cleanNisn = String(nisn).trim();
      const digits = cleanNisn.replace(/\D/g, '');
      const padded = (digits.length >= 8 && digits.length <= 10) ? digits.padStart(10, '0') : cleanNisn;
      const unpadded = digits.replace(/^0+/, '') || cleanNisn;
      const map = this.getAssignmentsMap();

      const candidateNisns = new Set([cleanNisn, padded, unpadded]);
      if (studentClass || nisn) {
        const allStu = window.FincestemMasterStudents || [];
        const stuObj = allStu.find(s => 
          String(s.nisn || '').trim() === cleanNisn ||
          String(s.nis || '').trim() === cleanNisn ||
          (digits && String(s.nisn || '').replace(/\D/g, '') === digits) ||
          (digits && String(s.nis || '').replace(/\D/g, '') === digits)
        );
        if (stuObj) {
          if (stuObj.nisn) {
            const sn = String(stuObj.nisn).trim();
            candidateNisns.add(sn);
            candidateNisns.add(sn.padStart(10, '0'));
            candidateNisns.add(sn.replace(/^0+/, ''));
          }
          if (stuObj.nis) {
            candidateNisns.add(String(stuObj.nis).trim());
          }
        }
      }

      const fasilNames = [];

      for (const [tKey, entry] of Object.entries(map)) {
        if (!entry || !Array.isArray(entry.student_nisns)) continue;
        const tRole = this.getTeacherRole(tKey);
        const isMatched = entry.student_nisns.some(storedN => {
          const sClean = String(storedN || '').trim();
          const sDigits = sClean.replace(/\D/g, '');
          return candidateNisns.has(sClean) || 
                 (sDigits && digits && sDigits === digits) ||
                 candidateNisns.has(sClean.padStart(10, '0')) ||
                 candidateNisns.has(sClean.replace(/^0+/, ''));
        });
        if (isMatched) {
          const tObj = this.findTeacherByIdentifier(tKey);
          const tName = (tObj && tObj.nama_guru) || entry.teacher_name || tKey;
          if (tName && !fasilNames.includes(tName)) {
            fasilNames.push(tName);
          }
          if (!result.facilitator_key) result.facilitator_key = tKey;
        }
      }

      if (fasilNames.length > 0) {
        result.facilitators = [fasilNames[0]]; // Fasilitator binaan siswa tunggal (1 Siswa = 1 Fasil)
        result.facilitator = fasilNames[0];
        result.facilitator_name = fasilNames[0];
        result.facilitator1 = fasilNames[0] || '-';
        result.facilitator2 = '-';
      } else {
        result.facilitator = '-';
        result.facilitator_name = '-';
        result.facilitators = [];
        result.facilitator1 = '-';
        result.facilitator2 = '-';
      }

      return result;
    },

    /**
     * Mengambil Ringkasan Koordinator & Fasilitator untuk suatu Rombel berdasarkan Pembagian Siswa Binaan
     */
    getMentorsForClass: function(className) {
      const allStudents = window.FincestemMasterStudents || [];
      const normTarget = String(className || '').replace(/^KELAS\s+/i, '').trim().toUpperCase();
      const classStudents = allStudents.filter(s => {
        const sNorm = String(s.class || s.rombel || '').replace(/^KELAS\s+/i, '').trim().toUpperCase();
        return sNorm === normTarget;
      });

      const coords = new Set();
      const fasils = new Set();

      classStudents.forEach(s => {
        const m = this.getMentorsForStudent(s.nisn, className);
        if (m.coordinator_name) {
          m.coordinator_name.split('\n').forEach(c => { if (c.trim()) coords.add(c.trim()); });
        }
        if (m.facilitator_name) {
          m.facilitator_name.split('\n').forEach(f => { if (f.trim()) fasils.add(f.trim()); });
        }
      });

      return {
        coordinators: Array.from(coords),
        facilitators: Array.from(fasils),
        coordinator_text: coords.size > 0 ? Array.from(coords).join('\n') : '',
        facilitator_text: fasils.size > 0 ? Array.from(fasils).join('\n') : ''
      };
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

      const zMap = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones._getZonesMap) ? FincestemCore.zones._getZonesMap() : null;

      for (let i = 0; i < allStudents.length; i++) {
        const s = allStudents[i];
        const sNisn = String(s.nisn || '').trim();
        let isFT = false;
        if (zMap && zMap[sNisn]) {
          isFT = String(zMap[sNisn]).toUpperCase().includes('LUAR');
        } else if (window.FincestemCore && FincestemCore.zones) {
          isFT = FincestemCore.zones.isFieldTripStudent(sNisn, s.class || s.rombel, s.zone);
        } else {
          isFT = (s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true);
        }
        const isMapped = assignedNisns.has(sNisn);

        if (isFT) {
          ftTotal++;
          if (isMapped) ftAssigned++;
        } else {
          nonFtTotal++;
          if (isMapped) nonFtAssigned++;
        }
      }

      const totalAssignedStudents = ftAssigned + nonFtAssigned;
      const totalUnassignedStudents = Math.max(0, allStudents.length - totalAssignedStudents);

      // Hitung guru yang sudah punya binaan
      let activeMentorsCount = 0;
      Object.values(map).forEach(e => {
        if (e && Array.isArray(e.student_nisns) && e.student_nisns.length > 0) {
          activeMentorsCount++;
        }
      });

      return {
        totalStudents: allStudents.length,
        totalAssigned: totalAssignedStudents,
        totalUnassigned: totalUnassignedStudents,
        ftTotal: ftTotal,
        ftAssigned: ftAssigned,
        ftUnassigned: Math.max(0, ftTotal - ftAssigned),
        nonFtTotal: nonFtTotal,
        nonFtAssigned: nonFtAssigned,
        nonFtUnassigned: Math.max(0, nonFtTotal - nonFtAssigned),
        totalTeachers: teachers.length,
        activeMentorsCount: activeMentorsCount
      };
    },

    /**
     * ==========================================
     * 4. CETAK KARTU KHUSUS SISWA BINAAN GURU / FLEKSIBEL (PER-KELAS, FIELD TRIP, NON-FIELD TRIP)
     * ==========================================
     */
    printMentorStudentCards: function(teacherIdentifier) {
      const tObj = this.findTeacherByIdentifier(teacherIdentifier);
      const teacherName = tObj ? tObj.nama_guru : teacherIdentifier;
      return this.printMentorCardsCustom({
        teacherKey: teacherIdentifier,
        title: `Kartu_Binaan_${teacherName}`
      });
    },

    printMentorCardsCustom: function(options) {
      options = options || {};
      let students = options.students;

      if (!Array.isArray(students)) {
        const allStudents = window.FincestemMasterStudents || [];
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

        const targetTeacher = (options.teacherKey && options.teacherKey !== 'ALL') ? String(options.teacherKey).toLowerCase() : null;
        const targetTeacherNisns = targetTeacher ? new Set(this.getAssignedNisnsForTeacher(targetTeacher)) : null;

        const targetGrade = (options.grade && options.grade !== 'ALL') ? String(options.grade).toUpperCase() : null;
        const targetClass = (options.className && options.className !== 'ALL')
          ? options.className.replace(/^KELAS\s+/i, '').trim().toUpperCase()
          : null;

        const targetCategory = options.category || 'ALL'; // 'ALL', 'FIELD_TRIP', 'NON_FIELD_TRIP'
        const targetStatus = options.status || 'ALL';     // 'ALL', 'ASSIGNED', 'UNASSIGNED'

        const assignedNisns = this.getAllAssignedNisns();

        students = allStudents.filter(s => {
          const sNisn = String(s.nisn || '').trim();
          const sClassRaw = (s.class || s.rombel || '').toUpperCase();
          const sClassNorm = sClassRaw.replace(/^KELAS\s+/i, '').trim();

          // Filter Guru
          if (targetTeacherNisns && !targetTeacherNisns.has(sNisn)) return false;

          // Filter Tingkat
          if (targetGrade) {
            const sLvl = String(s.level || '').toUpperCase();
            if (sLvl !== targetGrade && !sClassRaw.includes(' ' + targetGrade + '.') && !sClassRaw.startsWith(targetGrade + '.')) return false;
          }

          // Filter Kelas / Rombel
          if (targetClass && sClassNorm !== targetClass) return false;

          // Filter Jalur (Field Trip vs Non-Field Trip)
          const isFT = checkIsFT(sNisn, s);
          if (targetCategory === 'FIELD_TRIP' && !isFT) return false;
          if (targetCategory === 'NON_FIELD_TRIP' && isFT) return false;

          // Filter Status Binaan
          const isMapped = assignedNisns.has(sNisn);
          if (targetStatus === 'ASSIGNED' && !isMapped) return false;
          if (targetStatus === 'UNASSIGNED' && isMapped) return false;

          return true;
        });
      }

      if (!students || !students.length) {
        if (window.FincestemCore && FincestemCore.ui) {
          FincestemCore.ui.toast('Tidak ada siswa yang sesuai filter untuk dicetak kartunya!', 'warning');
        } else {
          alert('Tidak ada siswa yang sesuai filter untuk dicetak kartunya!');
        }
        return false;
      }

      // Gunakan container #printAreaCards di level body agar tampil saat @media print
      let printEl = document.getElementById('printAreaCards');
      if (!printEl) {
        printEl = document.createElement('div');
        printEl.id = 'printAreaCards';
        printEl.className = 'hidden';
        document.body.appendChild(printEl);
      } else if (printEl.parentElement !== document.body) {
        document.body.appendChild(printEl);
      }

      const CARDS_PER_PAGE = 10;
      let pagesHtml = '';

      for (let i = 0; i < students.length; i += CARDS_PER_PAGE) {
        const pageCards = students.slice(i, i + CARDS_PER_PAGE);
        const isLastPage = (i + CARDS_PER_PAGE) >= students.length;

        pagesHtml += `
          <div class="print-page ${!isLastPage ? 'page-break-card' : ''}" style="width: 100%; box-sizing: border-box; padding: 2mm 1mm; display: grid; grid-template-columns: repeat(2, 1fr); grid-auto-rows: minmax(59.5mm, auto); gap: 4mm 5mm; page-break-after: ${!isLastPage ? 'always' : 'auto'}; break-after: ${!isLastPage ? 'page' : 'auto'};">
            ${pageCards.map((s) => {
              const isFT = (window.FincestemCore && FincestemCore.zones && FincestemCore.zones.isFieldTripStudent)
                ? FincestemCore.zones.isFieldTripStudent(s.nisn, s.class || s.rombel, s.zone)
                : (s.zone === 'FINCESTEM LUAR OKU TIMUR' || s.is_field_trip === true);
              const username = s.nisn || '-';
              const password = s.nis || s.password || (s.nisn ? s.nisn.slice(-6) : '123456');
              const mentorInfo = this.getMentorsForStudent(s.nisn, s.class || s.rombel);
              const coordLabel = mentorInfo.coordinator_single || mentorInfo.coordinator || '-';
              const fasilName = mentorInfo.facilitator1 && mentorInfo.facilitator1 !== '-'
                ? mentorInfo.facilitator1
                : (mentorInfo.facilitator && mentorInfo.facilitator !== 'Belum Ditentukan' && mentorInfo.facilitator !== '-' ? mentorInfo.facilitator : '-');

              return `
                <div style="border: 1px dashed #64748b; padding: 1.5mm; box-sizing: border-box; background: #ffffff; page-break-inside: avoid;">
                  <div style="border: 1.5px solid #000000; border-radius: 6px; padding: 6px 9px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-family: Arial, Helvetica, sans-serif; height: 56.5mm; overflow: hidden; color: #000000;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 7px; border-bottom: 1.5px solid #000000; padding-bottom: 3.5px; text-align: center;">
                      <img src="../logo%20smansa%20png.png" style="width: 25px; height: 30px; object-fit: contain;" onerror="this.src='../LOGO SMAN1 BELITANG.png'">
                      <div style="line-height: 1.15; color: #000000;">
                        <div style="font-size: 11.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">KARTU LOGIN</div>
                        <div style="font-size: 9.5px; font-weight: bold; color: #000000;">Kegiatan Kokurikuler SMAN 1 Belitang</div>
                        <div style="font-size: 8.5px; color: #000000; font-weight: 600;">Tahun Pelajaran 2026/2027</div>
                      </div>
                    </div>

                    <div style="padding: 3px 0; font-size: 9px; line-height: 1.25; color: #000000;">
                      <table style="width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;">
                        <tbody>
                          <tr>
                            <td style="width: 58px; color: #000000; font-weight: bold; padding: 1px 0; white-space: nowrap;">Nama Siswa</td>
                            <td style="width: 8px; text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td style="font-weight: 900; color: #000000; text-transform: uppercase; padding: 1px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(s.nama || '-')}</td>
                            <td rowspan="2" style="vertical-align: top; text-align: right; padding-left: 6px; width: 82px;">
                              <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 2px 4px; text-align: center; background: #ffffff; display: block; box-sizing: border-box;">
                                <div style="font-size: 7.5px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; color: #000000; white-space: nowrap; line-height: 1.1;">
                                  ${isFT ? 'FIELD TRIP' : 'NON-FIELD TRIP'}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #000000; font-weight: bold; padding: 1px 0;">Kelas</td>
                            <td style="text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td style="font-weight: 900; color: #000000; padding: 1px 0;">${escapeHtml(s.class || s.rombel || '-')}</td>
                          </tr>
                          <tr>
                            <td style="color: #000000; font-weight: bold; padding: 1px 0;">Username</td>
                            <td style="text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td colspan="2" style="font-family: 'Courier New', Courier, monospace; font-weight: 900; font-size: 10px; color: #000000; padding: 1px 0; letter-spacing: 0.5px;">${escapeHtml(username)}</td>
                          </tr>
                          <tr>
                            <td style="color: #000000; font-weight: bold; padding: 1px 0;">Password</td>
                            <td style="text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td colspan="2" style="font-family: 'Courier New', Courier, monospace; font-weight: 900; font-size: 10px; color: #000000; padding: 1px 0; letter-spacing: 0.5px;">${escapeHtml(password)}</td>
                          </tr>
                          <tr>
                            <td style="color: #000000; font-weight: bold; padding: 1px 0;">Koordinator</td>
                            <td style="text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td colspan="2" style="font-weight: 800; color: #000000; padding: 1px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(coordLabel)}</td>
                          </tr>
                          <tr>
                            <td style="color: #000000; font-weight: bold; padding: 1px 0; white-space: nowrap;">Fasilitator</td>
                            <td style="text-align: center; font-weight: bold; color: #000000; padding: 1px 0;">:</td>
                            <td colspan="2" style="font-weight: 800; color: #000000; padding: 1px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                              ${escapeHtml(fasilName)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style="border-top: 1px solid #000000; padding-top: 2px; text-align: center; font-size: 8px; color: #000000; font-weight: bold;">
                      Alamat Website: https://kokurikulersman1belitang.site/
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      printEl.innerHTML = pagesHtml;

      const title = options.title || 'Kartu_Siswa_Binaan';
      const originalTitle = document.title;
      document.title = title.replace(/\s+/g, '_');
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
      return true;
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
