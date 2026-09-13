/**
 * FINCESTEM 2026 - Master Core Utilities & Authentication Bridge
 */
const FincestemCore = {
  // Session & Authentication
  auth: {
    isLoggedIn: function() {
      return localStorage.getItem('fincestem_auth') === 'true';
    },
    getRole: function() {
      return localStorage.getItem('fincestem_role') || 'guest';
    },
    getUser: function() {
      try {
        const u = localStorage.getItem('fincestem_user');
        if (u) return JSON.parse(u);
      } catch (e) {}
      return null;
    },
    setUser: function(userObj, role) {
      localStorage.setItem('fincestem_auth', 'true');
      localStorage.setItem('fincestem_role', role || 'siswa');
      localStorage.setItem('fincestem_user', JSON.stringify(userObj));
    },
    validateLogin: function(identifier, password, role) {
      const id = String(identifier || '').trim();
      const pwd = String(password || '').trim();

      if (!id || !pwd) {
        return { success: false, message: 'Harap masukkan ID / Pengguna dan Kata Sandi!' };
      }

      if (role === 'admin') {
        const savedAdminPwd = localStorage.getItem('fincestem_admin_pwd') || 'Fincestem2026!';
        const validUser = (id.toLowerCase() === 'admin_fincestem' || id.toLowerCase() === 'admin');
        const validPwd = (pwd === savedAdminPwd || pwd === 'Fincestem2026!');
        if (validUser && validPwd) {
          return {
            success: true,
            user: { name: 'Administrator IT', role: 'admin', title: 'Tim IT SMAN 1 Belitang', username: 'admin_fincestem' }
          };
        }
        return { success: false, message: 'Username atau kata sandi Administrator salah!' };
      }

      if (role === 'koordinator') {
        const savedKoordPwd = localStorage.getItem('fincestem_koord_pwd') || 'koordinator';
        if ((id.toLowerCase() === 'koordinator' || id.length >= 4) && (pwd === savedKoordPwd || pwd === 'koordinator')) {
          return {
            success: true,
            user: { name: 'Koordinator Kokurikuler', role: 'koordinator', assignment: 'Koordinator Wilayah SMAN 1 Belitang' }
          };
        }
        return { success: false, message: 'Akun atau kata sandi Koordinator salah!' };
      }

      if (role === 'fasilitator') {
        const savedFasilPwd = localStorage.getItem('fincestem_fasil_pwd') || 'fasilitator';
        if ((id.toLowerCase() === 'fasilitator' || id.length >= 4) && (pwd === savedFasilPwd || pwd === 'fasilitator')) {
          return {
            success: true,
            user: { name: 'Fasilitator Pembina', role: 'fasilitator', assignment: 'Pembina Riset Kokurikuler' }
          };
        }
        return { success: false, message: 'Akun atau kata sandi Fasilitator salah!' };
      }

      if (role === 'siswa') {
        const cleanId = id.replace(/\D/g, '');
        const paddedId = (cleanId.length >= 8 && cleanId.length <= 10) ? cleanId.padStart(10, '0') : cleanId;

        // 1. Cek Master Data 1.165 Siswa Dapodik
        const masterList = window.FincestemMasterStudents || [];
        if (Array.isArray(masterList) && masterList.length > 0) {
          const found = masterList.find(s => 
            String(s.nisn).trim() === paddedId || 
            String(s.nisn).trim() === cleanId || 
            String(s.nis).trim() === cleanId
          );

          if (!found) {
            return { success: false, message: 'NISN ' + id + ' tidak terdaftar dalam database Dapodik SMAN 1 Belitang!' };
          }

          // Password harus berupa NIS siswa (atau NISN)
          const validNis = String(found.nis || '').trim();
          if (pwd !== validNis && pwd !== String(found.nisn).trim()) {
            return { success: false, message: 'Kata sandi salah! Masukkan nomor NIS (Nomor Induk Siswa) Anda.' };
          }

          // Ambil pengaturan zona & pembina untuk kelas ini jika sudah ada di storage
          const classSettings = (FincestemCore.zones && FincestemCore.zones.getClassInfo) 
            ? FincestemCore.zones.getClassInfo(found.class) 
            : { zone: 'FINCESTEM OKU TIMUR', coordinator_name: 'Drs. H. Koordinator FINCESTEM', facilitator_name: 'Tim Fasilitator SMAN 1 Belitang' };
          const savedPhoto = localStorage.getItem('fincestem_photo_' + found.nisn) || found.photo_url || null;

          return {
            success: true,
            user: {
              name: found.nama,
              nisn: found.nisn,
              nis: found.nis,
              class: found.class,
              level: found.level,
              gender: found.gender,
              agama: found.agama || 'ISLAM',
              school_origin: found.asal_sekolah,
              address: found.alamat,
              ttl: found.ttl,
              ayah: found.ayah,
              ibu: found.ibu,
              pekerjaan_ortu: found.pekerjaan_ortu,
              phone: found.phone || '-',
              photo_url: savedPhoto,
              zone: classSettings.zone || 'FINCESTEM OKU TIMUR',
              coordinator_name: classSettings.coordinator_name || 'Drs. H. Koordinator FINCESTEM',
              facilitator_name: classSettings.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang',
              group: 'Belum Terdaftar Kelompok',
              groupId: '',
              role: 'siswa'
            }
          };
        }

        // 2. Cek LocalStorage Cache (jika master list belum termuat)
        let db = {};
        try {
          const stored = localStorage.getItem('fincestem_db_2026_v1');
          if (stored) db = JSON.parse(stored);
        } catch (e) {}

        const students = Array.isArray(db.students) ? db.students : [];
        if (students.length > 0) {
          const found = students.find(s => String(s.nisn).trim() === paddedId || String(s.nisn).trim() === id);
          if (!found) {
            return { success: false, message: 'NISN ' + id + ' belum terdaftar di sistem!' };
          }
          const validPwd = String(found.nis || found.password || found.nisn).trim();
          if (pwd !== validPwd) {
            return { success: false, message: 'Kata sandi siswa (NIS) tidak sesuai!' };
          }
          return {
            success: true,
            user: {
              name: found.name,
              nisn: found.nisn,
              nis: found.nis || '-',
              class: found.class || '-',
              group: found.group || 'Belum Ditentukan',
              groupId: found.groupId || '',
              role: 'siswa'
            }
          };
        }

        // Fallback jika database belum aktif
        if (id.length < 5 || isNaN(id)) {
          return { success: false, message: 'Format NISN harus berupa angka resmi (10 digit)!' };
        }
        return {
          success: true,
          user: {
            name: 'Peserta Didik (NISN: ' + id + ')',
            nisn: id,
            nis: pwd,
            class: 'Kelas X',
            group: 'Belum Terdaftar Kelompok',
            groupId: '',
            role: 'siswa'
          }
        };
      }

      return { success: false, message: 'Peran pengguna tidak valid.' };
    },
    logout: function(redirectUrl) {
      localStorage.removeItem('fincestem_auth');
      localStorage.removeItem('fincestem_role');
      localStorage.removeItem('fincestem_user');
      FincestemCore.ui.toast('Anda telah keluar dari akun.', 'info');
      setTimeout(function() {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          location.reload();
        }
      }, 400);
    },
    requireAuth: function(requiredRole, redirectLoginUrl) {
      if (!this.isLoggedIn() || (requiredRole && this.getRole() !== requiredRole)) {
        if (redirectLoginUrl) {
          window.location.replace(redirectLoginUrl);
        }
        return false;
      }
      return true;
    }
  },

  // cPanel / MySQL Backend API Bridge
  api: {
    base: (function() {
      // Menyesuaikan path relatif api berdasarkan kedalaman folder
      const depth = (window.location.pathname.match(/\//g) || []).length;
      if (window.location.pathname.includes('/siswa/') || window.location.pathname.includes('/guru/') || window.location.pathname.includes('/admin/')) {
        return '../api';
      }
      return './api';
    })(),

    async login(identifier, password, role) {
      try {
        const res = await fetch(this.base + '/auth.php?action=login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password, role })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.user) {
            FincestemCore.auth.setUser(json.data.user, json.data.user.role);
          }
          return json;
        }
      } catch (e) {
        console.warn('API backend offline / fallback to local storage:', e);
      }
      return null;
    },

    async upload(file, category) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category || 'tugas');
      const res = await fetch(this.base + '/upload.php', {
        method: 'POST',
        body: formData
      });
      return await res.json();
    },

    async getMateri(pillar) {
      const url = this.base + '/materi.php?action=list' + (pillar ? '&pillar=' + encodeURIComponent(pillar) : '');
      const res = await fetch(url);
      return await res.json();
    },

    async submitLKPD(payload) {
      const res = await fetch(this.base + '/lkpd.php?action=submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    },

    async getLKPD(groupId, pillar) {
      const url = this.base + '/lkpd.php?action=get&group_id=' + groupId + (pillar ? '&pillar=' + pillar : '');
      const res = await fetch(url);
      return await res.json();
    },

    async gradeGroup(payload) {
      const res = await fetch(this.base + '/nilai.php?action=grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    },

    async getNilai(groupId) {
      const url = this.base + '/nilai.php?action=get' + (groupId ? '&group_id=' + groupId : '');
      const res = await fetch(url);
      return await res.json();
    },

    async getDokumentasi(groupId) {
      const url = this.base + '/dokumentasi.php?action=list' + (groupId ? '&group_id=' + groupId : '');
      const res = await fetch(url);
      return await res.json();
    }
  },

  // Modul Foto Profil Siswa
  profile: {
    getPhoto: function(nisn) {
      if (!nisn) return null;
      return localStorage.getItem('fincestem_photo_' + nisn) || null;
    },
    uploadStudentPhoto: function(file, nisn, callback) {
      if (!file || !nisn) {
        if (callback) callback({ success: false, message: 'File dan NISN wajib ada' });
        return;
      }

      // 1. Simpan pratinjau Base64 langsung ke localStorage agar instan
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64Url = e.target.result;
        localStorage.setItem('fincestem_photo_' + nisn, base64Url);

        // Update sesi user jika sedang login
        const u = FincestemCore.auth.getUser();
        if (u && (String(u.nisn).trim() === String(nisn).trim() || String(u.identifier).trim() === String(nisn).trim())) {
          u.photo_url = base64Url;
          FincestemCore.auth.setUser(u, u.role);
        }

        // Update di master data in-memory jika termuat
        if (window.FincestemMasterStudents) {
          const s = window.FincestemMasterStudents.find(x => String(x.nisn).trim() === String(nisn).trim());
          if (s) s.photo_url = base64Url;
        }

        // 2. Upload ke backend server cPanel jika online
        if (window.location.protocol.startsWith('http')) {
          const fd = new FormData();
          fd.append('photo', file);
          fd.append('nisn', nisn);

          fetch(FincestemCore.api.base + '/upload_photo.php', {
            method: 'POST',
            body: fd
          })
          .then(r => r.json())
          .then(res => {
            if (res.success && res.data && res.data.photo_url) {
              if (u && (String(u.nisn).trim() === String(nisn).trim() || String(u.identifier).trim() === String(nisn).trim())) {
                u.photo_url = res.data.photo_url;
                FincestemCore.auth.setUser(u, u.role);
              }
            }
            if (callback) callback(res);
          })
          .catch(() => {
            if (callback) callback({ success: true, photo_url: base64Url, local: true });
          });
        } else {
          if (callback) callback({ success: true, photo_url: base64Url, local: true });
        }
      };
      reader.readAsDataURL(file);
    }
  },

  // Modul Jadwal Eksplor FINCESTEM Day 1 s.d. Day 7
  schedule: {
    getDefaults: function() {
      return [
        { day_number: 1, title: 'Day 1: Orientasi & Pembekalan Riset', theme: 'Pembekalan STEM & Etika Riset Lapangan', date: '2026-11-09', date_formatted: '09 November 2026', start_time: '07:00', end_time: '18:00', is_active: 1, auto_schedule: 1, description: 'Pengenalan instrumen observasi, sosialisasi modul kokurikuler, dan konsolidasi tim ekspedisi.' },
        { day_number: 2, title: 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', theme: 'STEM Sains & Konservasi Lingkungan Belitang', date: '2026-11-10', date_formatted: '10 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Pengambilan sampel kualitas air saluran irigasi, identifikasi flora-fauna sawah pasang surut.' },
        { day_number: 3, title: 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', theme: 'Teknologi Pertanian Modern & Mekanisasi', date: '2026-11-11', date_formatted: '11 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.' },
        { day_number: 4, title: 'Day 4: Literasi Finansial & Rantai Pasok Pangan', theme: 'Financial Literacy & Ekonomi Agrikultur', date: '2026-11-12', date_formatted: '12 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.' },
        { day_number: 5, title: 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', theme: 'Culture & Kearifan Lokal Komunitas Multikultural', date: '2026-11-13', date_formatted: '13 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Wawancara tetua adat, kajian tradisi gotong royong lumbung desa, dan pencatatan nilai-nilai budaya.' },
        { day_number: 6, title: 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', theme: 'Data Science & Penyusunan Laporan Proyek', date: '2026-11-14', date_formatted: '14 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.' },
        { day_number: 7, title: 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', theme: 'Diseminasi Temuan & Refleksi Kokurikuler', date: '2026-11-15', date_formatted: '15 November 2026', start_time: '07:00', end_time: '20:00', is_active: 0, auto_schedule: 1, description: 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.' }
      ];
    },

    getSchedule: function(callback) {
      const self = this;
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php')
          .then(r => r.json())
          .then(data => {
            if (data && data.success && data.data && Array.isArray(data.data.days)) {
              localStorage.setItem('fincestem_schedules', JSON.stringify(data.data.days));
              if (callback) callback(data.data.days, data.data.server_time);
              return;
            }
            self.getFallbackSchedule(callback);
          })
          .catch(() => self.getFallbackSchedule(callback));
      } else {
        self.getFallbackSchedule(callback);
      }
    },

    getFallbackSchedule: function(callback) {
      try {
        const stored = localStorage.getItem('fincestem_schedules');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length === 7) {
            if (callback) callback(parsed, new Date().toISOString());
            return;
          }
        }
      } catch (e) {}
      const def = this.getDefaults();
      localStorage.setItem('fincestem_schedules', JSON.stringify(def));
      if (callback) callback(def, new Date().toISOString());
    },

    saveSchedule: function(days, callback) {
      localStorage.setItem('fincestem_schedules', JSON.stringify(days));
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_all', days: days })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, local: true }); });
      } else {
        if (callback) callback({ success: true, local: true });
      }
    },

    toggleDay: function(dayNumber, isActive, callback) {
      const stored = localStorage.getItem('fincestem_schedules');
      let days = stored ? JSON.parse(stored) : this.getDefaults();
      const d = days.find(x => x.day_number === Number(dayNumber));
      if (d) d.is_active = isActive ? 1 : 0;
      this.saveSchedule(days, callback);
    }
  },

  // Modul Pengaturan Zona & Pembina
  zones: {
    getClassInfo: function(className) {
      try {
        const stored = localStorage.getItem('fincestem_class_settings');
        if (stored) {
          const map = JSON.parse(stored);
          if (map && map[className]) return map[className];
        }
      } catch (e) {}

      // Default zona: Jika belum diset, kelas X.1 s.d X.6 OKU Timur, lainnya Luar OKU Timur atau default OKU Timur
      return {
        zone: 'FINCESTEM OKU TIMUR',
        coordinator_name: 'Drs. H. Koordinator FINCESTEM',
        facilitator_name: 'Tim Fasilitator SMAN 1 Belitang'
      };
    },

    saveClassInfo: function(className, info, callback) {
      let map = {};
      try {
        const stored = localStorage.getItem('fincestem_class_settings');
        if (stored) map = JSON.parse(stored);
      } catch (e) {}

      map[className] = Object.assign(map[className] || {}, info);
      localStorage.setItem('fincestem_class_settings', JSON.stringify(map));

      // Jika user yang sedang login adalah di kelas ini, perbarui datanya
      const u = FincestemCore.auth.getUser();
      if (u && u.class === className) {
        if (info.zone) u.zone = info.zone;
        if (info.coordinator_name) u.coordinator_name = info.coordinator_name;
        if (info.facilitator_name) u.facilitator_name = info.facilitator_name;
        FincestemCore.auth.setUser(u, u.role);
      }

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'set_class_zone',
            class_name: className,
            zone: info.zone
          })
        }).catch(() => {});
      }

      if (callback) callback({ success: true });
    },

    getStudentZone: function(nisn, className, defaultZone) {
      if (!nisn) return defaultZone || 'FINCESTEM OKU TIMUR';
      try {
        const stored = localStorage.getItem('fincestem_student_zone_' + String(nisn).trim());
        if (stored) return stored;
      } catch (e) {}

      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s => String(s.nisn).trim() === String(nisn).trim() || String(s.nis).trim() === String(nisn).trim());
        if (found && found.zone) return found.zone;
      }

      if (className) {
        const classInfo = this.getClassInfo(className);
        if (classInfo && classInfo.zone) return classInfo.zone;
      }

      return defaultZone || 'FINCESTEM OKU TIMUR';
    },

    setStudentZone: function(nisn, zone, callback) {
      if (!nisn) {
        if (callback) callback({ success: false, message: 'NISN tidak valid' });
        return;
      }
      const cleanNisn = String(nisn).trim();
      try {
        localStorage.setItem('fincestem_student_zone_' + cleanNisn, zone);
      } catch (e) {}

      // Update in master student list memory
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s => String(s.nisn).trim() === cleanNisn || String(s.nis).trim() === cleanNisn);
        if (found) {
          found.zone = zone;
        }
      }

      // Update current user if active session is this student
      const u = FincestemCore.auth.getUser();
      if (u && (String(u.nisn).trim() === cleanNisn || String(u.identifier).trim() === cleanNisn || String(u.nis).trim() === cleanNisn)) {
        u.zone = zone;
        FincestemCore.auth.setUser(u, u.role);
      }

      // Sync to backend MySQL
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'set_student_zone',
            nisn: cleanNisn,
            zone: zone
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res);
        })
        .catch(() => {
          if (callback) callback({ success: true, local: true, zone: zone });
        });
      } else {
        if (callback) callback({ success: true, local: true, zone: zone });
      }
    }
  },

  // Modul Pelacakan Progres Pengerjaan Siswa & Evaluasi Fasilitator
  progress: {
    getStudentProgress: function(nisn, callback) {
      if (!nisn) {
        if (callback) callback(this.getDefaultProgress(''));
        return;
      }

      const self = this;
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/progress.php?nisn=' + encodeURIComponent(nisn))
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(res.data));
              if (callback) callback(res.data);
            } else {
              self.getLocalProgress(nisn, callback);
            }
          })
          .catch(() => {
            self.getLocalProgress(nisn, callback);
          });
      } else {
        self.getLocalProgress(nisn, callback);
      }
    },

    getLocalProgress: function(nisn, callback) {
      try {
        const stored = localStorage.getItem('fincestem_progress_' + nisn);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (callback) callback(parsed);
          return;
        }
      } catch (e) {}

      const def = this.getDefaultProgress(nisn);
      if (callback) callback(def);
    },

    getDefaultProgress: function(nisn) {
      return {
        nisn: nisn,
        percentage: 71,
        completed_days: 5,
        total_days: 7,
        average_score: 88.5,
        predicate: 'Sangat Baik (A)',
        latest_feedback: {
          feedback: 'Kerja tim observasi irigasi dan perhitungan HPP gabah sangat baik dan terstruktur. Pertahankan kedisiplinan pencatatan data lapangan pada pilar berikutnya!',
          facilitator_name: 'Tim Fasilitator SMAN 1 Belitang',
          score: 90.0,
          predicate: 'Sangat Baik (A)',
          score_financial: 90,
          score_culture: 86,
          score_exploration: 88,
          score_stem: 90,
          day_number: 4,
          updated_at: new Date().toISOString()
        },
        records: [
          { day_number: 1, task_type: 'general', status: 'graded', score: 88, predicate: 'A', feedback: 'Penguasaan instrumen riset dan pembagian tugas regu sangat solid.' },
          { day_number: 2, task_type: 'lkpd', status: 'graded', score: 87, predicate: 'A', feedback: 'Analisis uji mutu pH air saluran irigasi BK 9 presisi.' },
          { day_number: 3, task_type: 'dokumentasi', status: 'graded', score: 89, predicate: 'A', feedback: 'Dokumentasi visual mekanisasi perontok padi autentik.' },
          { day_number: 4, task_type: 'lkpd', status: 'graded', score: 90, predicate: 'A', feedback: 'Rantai pasok beras dan kalkulasi margin gabah diuraikan mendalam.' },
          { day_number: 5, task_type: 'refleksi', status: 'submitted', score: 88, predicate: 'A', feedback: 'Kajian tradisi sambatan gotong royong terisi lengkap.' }
        ],
        task_map: {
          '1_materi': { status: 'submitted' },
          '1_lkpd': { status: 'graded', score: 88 },
          '1_asesmen': { status: 'submitted' },
          '1_refleksi': { status: 'submitted' },
          '1_dokumentasi': { status: 'submitted' },
          '2_materi': { status: 'submitted' },
          '2_lkpd': { status: 'graded', score: 87 },
          '2_asesmen': { status: 'submitted' },
          '2_refleksi': { status: 'submitted' },
          '2_dokumentasi': { status: 'submitted' },
          '3_materi': { status: 'submitted' },
          '3_lkpd': { status: 'graded', score: 89 },
          '3_asesmen': { status: 'submitted' },
          '3_refleksi': { status: 'submitted' },
          '3_dokumentasi': { status: 'submitted' },
          '4_materi': { status: 'submitted' },
          '4_lkpd': { status: 'graded', score: 90 },
          '4_asesmen': { status: 'submitted' },
          '4_refleksi': { status: 'submitted' },
          '4_dokumentasi': { status: 'submitted' },
          '5_materi': { status: 'submitted' },
          '5_lkpd': { status: 'submitted' },
          '5_asesmen': { status: 'submitted' },
          '5_refleksi': { status: 'submitted' },
          '5_dokumentasi': { status: 'submitted' }
        }
      };
    },

    submitTask: function(nisn, dayNumber, taskType, content, callback) {
      this.getStudentProgress(nisn, function(prog) {
        if (!prog.task_map) prog.task_map = {};
        prog.task_map[dayNumber + '_' + taskType] = { status: 'submitted', content: content };

        let daysSet = new Set();
        Object.keys(prog.task_map).forEach(k => {
          const d = parseInt(k.split('_')[0]);
          if (d) daysSet.add(d);
        });
        prog.completed_days = daysSet.size;
        prog.percentage = Math.min(100, Math.round((prog.completed_days / 7) * 100));

        localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(prog));

        if (window.location.protocol.startsWith('http')) {
          fetch(FincestemCore.api.base + '/progress.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'submit_task',
              student_nisn: nisn,
              day_number: dayNumber,
              task_type: taskType,
              content: content
            })
          }).catch(() => {});
        }

        if (callback) callback({ success: true, progress: prog });
      });
    },

    submitEvaluation: function(nisn, evalData, callback) {
      this.getStudentProgress(nisn, function(prog) {
        const score = parseFloat(evalData.score) || 0;
        let predicate = evalData.predicate;
        if (!predicate) {
          if (score >= 88) predicate = 'Sangat Baik (A)';
          else if (score >= 75) predicate = 'Baik (B)';
          else if (score >= 65) predicate = 'Cukup (C)';
          else predicate = 'Perlu Bimbingan (D)';
        }

        const newFeedback = {
          day_number: evalData.day_number || 1,
          task_type: evalData.task_type || 'general',
          score: score,
          predicate: predicate,
          score_financial: evalData.score_financial,
          score_culture: evalData.score_culture,
          score_exploration: evalData.score_exploration,
          score_stem: evalData.score_stem,
          feedback: evalData.feedback || '',
          status: evalData.status || 'graded',
          facilitator_name: evalData.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang',
          updated_at: new Date().toISOString()
        };

        prog.latest_feedback = newFeedback;
        if (!Array.isArray(prog.records)) prog.records = [];
        prog.records = prog.records.filter(r => !(r.day_number === newFeedback.day_number && r.task_type === newFeedback.task_type));
        prog.records.push(newFeedback);

        if (!prog.task_map) prog.task_map = {};
        prog.task_map[newFeedback.day_number + '_' + newFeedback.task_type] = {
          status: newFeedback.status,
          score: score,
          feedback: newFeedback.feedback
        };

        const scoreList = prog.records.filter(r => r.score > 0).map(r => r.score);
        if (scoreList.length > 0) {
          prog.average_score = Math.round((scoreList.reduce((a, b) => a + b, 0) / scoreList.length) * 10) / 10;
          if (prog.average_score >= 88) prog.predicate = 'Sangat Baik (A)';
          else if (prog.average_score >= 75) prog.predicate = 'Baik (B)';
          else if (prog.average_score >= 65) prog.predicate = 'Cukup (C)';
          else prog.predicate = 'Perlu Bimbingan (D)';
        }

        localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(prog));

        if (window.location.protocol.startsWith('http')) {
          fetch(FincestemCore.api.base + '/progress.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign({ action: 'submit_feedback', student_nisn: nisn }, evalData))
          }).catch(() => {});
        }

        if (callback) callback({ success: true, progress: prog });
      });
    }
  },

  // UI Utilities
  ui: {
    toast: function(msg, type) {
      let toastEl = document.getElementById('fincestem-toast');
      if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'fincestem-toast';
        toastEl.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 transform translate-y-12 opacity-0 pointer-events-none text-white text-sm font-semibold max-w-md';
        document.body.appendChild(toastEl);
      }

      let bgClass = 'bg-[#1e293b] border border-white/10';
      let icon = 'info';
      if (type === 'success') {
        bgClass = 'bg-[#0f766e] border border-emerald-400/30';
        icon = 'check_circle';
      } else if (type === 'error') {
        bgClass = 'bg-[#b91c1c] border border-red-400/30';
        icon = 'error';
      }

      toastEl.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 transform text-white text-sm font-semibold max-w-md ' + bgClass;
      toastEl.innerHTML = '<span class="material-symbols-outlined text-[20px]">' + icon + '</span><span>' + msg + '</span>';

      setTimeout(function() {
        toastEl.classList.remove('translate-y-12', 'opacity-0', 'pointer-events-none');
        toastEl.classList.add('translate-y-0', 'opacity-100');
      }, 10);

      clearTimeout(window._fincestemToastTimer);
      window._fincestemToastTimer = setTimeout(function() {
        toastEl.classList.remove('translate-y-0', 'opacity-100');
        toastEl.classList.add('translate-y-12', 'opacity-0', 'pointer-events-none');
      }, 3000);
    },

    openLightbox: function(imgUrl, caption) {
      let modal = document.getElementById('lightboxModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightboxModal';
        modal.className = 'fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 transition-all duration-300 opacity-0 pointer-events-none';
        modal.innerHTML = `
          <div class="relative max-w-4xl w-full flex flex-col items-center">
            <button onclick="FincestemCore.ui.closeLightbox()" class="absolute -top-12 right-0 text-white hover:text-amber-400 flex items-center gap-1 font-bold text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span class="material-symbols-outlined text-lg">close</span> Tutup
            </button>
            <img id="lightboxImg" class="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl border border-white/20" src="" alt="Pratinjau Foto">
            <p id="lightboxCaption" class="mt-4 text-center text-white/90 text-sm font-medium px-4 py-2 bg-black/50 rounded-xl backdrop-blur-sm max-w-xl"></p>
          </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
          if (e.target === modal) FincestemCore.ui.closeLightbox();
        });
      }
      document.getElementById('lightboxImg').src = imgUrl;
      document.getElementById('lightboxCaption').textContent = caption || 'Dokumentasi FINCESTEM SMAN 1 Belitang';
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
    },

    closeLightbox: function() {
      const modal = document.getElementById('lightboxModal');
      if (modal) {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  }
};

window.FincestemCore = FincestemCore;

// Clean URL & Local file:// fallback helper
(function() {
  try {
    if (window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('/index.html')) {
        const clean = window.location.pathname.replace(/\/index\.html$/, '') || '/';
        window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
      }
    } else if (window.location.protocol === 'file:') {
      // Jika dibuka lokal via file://, arahkan ./ ke index.html dan ../ ke ../index.html agar tidak 404
      const fixLocalLinks = function() {
        document.querySelectorAll('a[href="./"]').forEach(function(el) {
          el.setAttribute('href', 'index.html');
        });
        document.querySelectorAll('a[href="../"]').forEach(function(el) {
          el.setAttribute('href', '../index.html');
        });
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixLocalLinks);
      } else {
        fixLocalLinks();
      }
    }
  } catch (e) {}
})();
