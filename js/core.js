/**
 * FINCESTEM 2026 - Master Core Utilities & Authentication Bridge
 */
const FincestemCore = {
  // Helper Urutan Alami Rombel / Kelas (Natural Sorting: X.1 s.d X.11, XI.1 s.d XI.11, XII.1 s.d XII.11)
  sortClasses: function(classList) {
    if (!Array.isArray(classList)) return [];
    const romanMap = { 'X': 10, 'XI': 11, 'XII': 12, 'VII': 7, 'VIII': 8, 'IX': 9 };
    return [...classList].sort((a, b) => {
      const strA = typeof a === 'string' ? a : (a?.class || a?.class_name || '');
      const strB = typeof b === 'string' ? b : (b?.class || b?.class_name || '');

      const parse = (str) => {
        const clean = String(str || '').replace(/^kelas\s+/i, '').trim();
        const match = clean.match(/^([a-z]+)\.?(\d+)?/i);
        if (match) {
          const roman = match[1].toUpperCase();
          const level = romanMap[roman] || 99;
          const num = match[2] ? parseInt(match[2], 10) : 0;
          return { level, num, raw: str };
        }
        return { level: 999, num: 0, raw: str };
      };

      const pA = parse(strA);
      const pB = parse(strB);
      if (pA.level !== pB.level) return pA.level - pB.level;
      if (pA.num !== pB.num) return pA.num - pB.num;
      return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
    });
  },

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
        const masterTeachers = (FincestemCore.teachers && FincestemCore.teachers.getTeachers) ? FincestemCore.teachers.getTeachers() : (window.FincestemMasterTeachers || []);
        const found = masterTeachers.find(t => 
          String(t.username).toLowerCase() === id.toLowerCase() ||
          (t.nip !== '-' && String(t.nip).toLowerCase() === id.toLowerCase()) ||
          String(t.kode_guru).toLowerCase() === id.toLowerCase()
        );
        if (found && (pwd === found.password || pwd === 'Fincestem2026!' || pwd === savedKoordPwd)) {
          return {
            success: true,
            user: { name: found.nama_guru, role: 'koordinator', assignment: found.tugas_tambahan !== '-' ? found.tugas_tambahan : `Koordinator FINCESTEM (${found.kode_guru})`, nip: found.nip, kode: found.kode_guru, username: found.username || found.nip || found.kode_guru }
          };
        }
        if ((id.toLowerCase() === 'koordinator' || id.length >= 4) && (pwd === savedKoordPwd || pwd === 'koordinator')) {
          return {
            success: true,
            user: { name: 'Koordinator Kokurikuler', role: 'koordinator', assignment: 'Koordinator Kokurikuler SMAN 1 Belitang', username: id }
          };
        }
        return { success: false, message: 'Akun atau kata sandi Koordinator salah!' };
      }

      if (role === 'fasilitator') {
        const savedFasilPwd = localStorage.getItem('fincestem_fasil_pwd') || 'fasilitator';
        const masterTeachers = (FincestemCore.teachers && FincestemCore.teachers.getTeachers) ? FincestemCore.teachers.getTeachers() : (window.FincestemMasterTeachers || []);
        const found = masterTeachers.find(t => 
          String(t.username).toLowerCase() === id.toLowerCase() ||
          (t.nip !== '-' && String(t.nip).toLowerCase() === id.toLowerCase()) ||
          String(t.kode_guru).toLowerCase() === id.toLowerCase()
        );
        if (found && (pwd === found.password || pwd === 'Fincestem2026!' || pwd === savedFasilPwd)) {
          return {
            success: true,
            user: { name: found.nama_guru, role: 'fasilitator', assignment: `Guru ${found.mata_pelajaran} (${found.kode_guru})`, nip: found.nip, kode: found.kode_guru, username: found.username || found.nip || found.kode_guru }
          };
        }
        if ((id.toLowerCase() === 'fasilitator' || id.length >= 4) && (pwd === savedFasilPwd || pwd === 'fasilitator')) {
          return {
            success: true,
            user: { name: 'Fasilitator Kokurikuler', role: 'fasilitator', assignment: 'Fasilitator Kokurikuler', username: id }
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

          // Dapatkan zona aktual siswa (prioritas individual override -> kelas -> default)
          const studentZone = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
            ? FincestemCore.zones.getStudentZone(found.nisn, found.class, found.zone || classSettings.zone)
            : (classSettings.zone || 'FINCESTEM OKU TIMUR');

          // Dapatkan koordinator & fasilitator aktual untuk kelas ini
          const assignedCoord = (FincestemCore.assignments && FincestemCore.assignments.getClassCoordinator)
            ? FincestemCore.assignments.getClassCoordinator(found.class)
            : (classSettings.coordinator_name || 'Drs. H. Koordinator FINCESTEM');
          const assignedFasil = (FincestemCore.assignments && FincestemCore.assignments.getClassFacilitator)
            ? FincestemCore.assignments.getClassFacilitator(found.class)
            : (classSettings.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang');

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
              zone: studentZone,
              coordinator_name: assignedCoord || classSettings.coordinator_name || 'Drs. H. Koordinator FINCESTEM',
              facilitator_name: assignedFasil || classSettings.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang',
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
    getDeviceId: function() {
      let did = localStorage.getItem('fincestem_device_id');
      if (!did) {
        // Generate persistent UUID for this device/browser
        did = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('fincestem_device_id', did);
      }
      return did;
    },
    getDeviceInfo: function() {
      const ua = navigator.userAgent || '';
      
      // 1. Deteksi Sistem Operasi & Model HP
      let os = 'Perangkat';
      let phoneModel = '';

      if (/android/i.test(ua)) {
        os = 'Android';
        // Ekstrak model Android dari UA (misal: "SM-A546E", "Redmi Note 12", "CPH2343", "Infinix X6833B")
        const androidMatch = ua.match(/Android\s+[\d\.]+;\s*([^;)]+)\s*Build/i) || ua.match(/Android\s+[\d\.]+;\s*([^;)]+)/i);
        let rawModel = (androidMatch && androidMatch[1]) ? androidMatch[1].trim() : '';

        // Deteksi User-Agent Reduction di Chrome Android baru (sering disingkat jadi "K" saja)
        if (!rawModel || rawModel === 'K' || rawModel.length <= 1) {
          if (/samsung/i.test(ua) || /SM-[A-Z0-9]+/i.test(ua)) {
            const sm = ua.match(/SM-[A-Z0-9]+/i);
            rawModel = sm ? ('Samsung ' + sm[0]) : 'Samsung Galaxy';
          } else if (/redmi/i.test(ua)) {
            rawModel = 'Xiaomi Redmi';
          } else if (/xiaomi|poco/i.test(ua)) {
            rawModel = 'Xiaomi / POCO';
          } else if (/oppo|cph[0-9]+/i.test(ua)) {
            rawModel = 'OPPO Smartphone';
          } else if (/vivo/i.test(ua)) {
            rawModel = 'Vivo Smartphone';
          } else if (/realme|rmx[0-9]+/i.test(ua)) {
            rawModel = 'Realme Smartphone';
          } else if (/infinix/i.test(ua)) {
            rawModel = 'Infinix Smartphone';
          } else {
            rawModel = 'HP Android';
          }
        }

        if (rawModel) {
          phoneModel = rawModel;
          if (/samsung/i.test(phoneModel) || /SM-/i.test(phoneModel)) phoneModel = 'Samsung ' + phoneModel.replace(/^samsung\s*/i, '');
          else if (/redmi/i.test(phoneModel)) phoneModel = 'Xiaomi Redmi ' + phoneModel.replace(/^redmi\s*/i, '');
          else if (/m2\d+|2\d+/i.test(phoneModel)) phoneModel = 'Xiaomi ' + phoneModel;
          else if (/cph\d+/i.test(phoneModel) || /oppo/i.test(phoneModel)) phoneModel = 'OPPO ' + phoneModel.replace(/^oppo\s*/i, '');
          else if (/v2\d+|vivo/i.test(phoneModel)) phoneModel = 'Vivo ' + phoneModel.replace(/^vivo\s*/i, '');
          else if (/rmx\d+|realme/i.test(phoneModel)) phoneModel = 'Realme ' + phoneModel.replace(/^realme\s*/i, '');
          else if (/infinix/i.test(phoneModel)) phoneModel = 'Infinix ' + phoneModel.replace(/^infinix\s*/i, '');
          else if (/tecno/i.test(phoneModel)) phoneModel = 'Tecno ' + phoneModel.replace(/^tecno\s*/i, '');
          else if (/itel/i.test(phoneModel)) phoneModel = 'Itel ' + phoneModel.replace(/^itel\s*/i, '');
        } else {
          phoneModel = 'HP Android';
        }
      } else if (/iphone/i.test(ua)) {
        os = 'iOS';
        phoneModel = 'Apple iPhone';
      } else if (/ipad/i.test(ua)) {
        os = 'iPadOS';
        phoneModel = 'Apple iPad';
      } else if (/windows nt 10/i.test(ua)) {
        os = 'Windows 10/11';
        phoneModel = 'Laptop / PC';
      } else if (/windows/i.test(ua)) {
        os = 'Windows PC';
        phoneModel = 'Laptop / PC';
      } else if (/macintosh|mac os x/i.test(ua)) {
        os = 'macOS';
        phoneModel = 'Apple MacBook / Mac';
      } else if (/linux/i.test(ua)) {
        os = 'Linux';
        phoneModel = 'Komputer Linux';
      }

      // 2. Deteksi Aplikasi Browser
      let browser = 'Browser';
      if (/edg/i.test(ua)) browser = 'Microsoft Edge';
      else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet';
      else if (/opr|opera/i.test(ua)) browser = 'Opera';
      else if (/miuibrowser/i.test(ua)) browser = 'Mi Browser';
      else if (/crios/i.test(ua)) browser = 'Google Chrome iOS';
      else if (/fxios/i.test(ua)) browser = 'Firefox iOS';
      else if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Google Chrome';
      else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
      else if (/firefox/i.test(ua)) browser = 'Mozilla Firefox';

      if (phoneModel) {
        return `${phoneModel} (${browser})`;
      }
      return `${browser} di ${os}`;
    },
    getStudentDeviceStatus: function(nisn, callback) {
      if (!nisn) {
        if (callback) callback({ success: false, message: 'NISN wajib diisi' });
        return;
      }
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/auth.php?action=get_device_status&nisn=' + encodeURIComponent(nisn))
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: false, message: 'Gagal menghubungi server' }); });
      } else {
        if (callback) callback({ success: true, data: { is_locked: false, device_info: 'Lokal' } });
      }
    },
    resetStudentDevice: function(nisn, callback) {
      if (!nisn) {
        if (callback) callback({ success: false, message: 'NISN wajib diisi' });
        return;
      }
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/auth.php?action=reset_device', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nisn: String(nisn).trim(), mode: 'single' })
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(err => { if (callback) callback({ success: false, message: err.message || 'Gagal reset perangkat' }); });
      } else {
        if (callback) callback({ success: true, message: 'Kunci perangkat siswa berhasil di-reset (mode lokal).' });
      }
    },
    resetAllStudentDevices: function(callback) {
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/auth.php?action=reset_device', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'all' })
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(err => { if (callback) callback({ success: false, message: err.message || 'Gagal reset perangkat massal' }); });
      } else {
        if (callback) callback({ success: true, message: 'Seluruh kunci perangkat berhasil di-reset (mode lokal).' });
      }
    },
    checkSession: function(callback) {
      const user = this.getUser();
      const role = this.getRole();
      if (!user || role !== 'siswa') {
        if (callback) callback({ success: true, valid: true });
        return;
      }
      const nisn = user.nisn || user.identifier;
      const deviceId = this.getDeviceId();
      if (!nisn || !deviceId) {
        if (callback) callback({ success: true, valid: true });
        return;
      }
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/auth.php?action=check_session&nisn=' + encodeURIComponent(nisn) + '&device_id=' + encodeURIComponent(deviceId))
          .then(r => r.json())
          .then(res => {
            if (callback) callback(res);
          })
          .catch(() => {
            // Jika koneksi timeout/error network, jangan keluarkan siswa agar tidak mengganggu offline
            if (callback) callback({ success: true, valid: true });
          });
      } else {
        if (callback) callback({ success: true, valid: true });
      }
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

  // Modul Foto Profil Siswa (Real-time & Ringan)
  profile: {
    normalizePhotoUrl: function(url) {
      if (!url) return null;
      if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http')) return url;
      const isSubdir = window.location.pathname.includes('/siswa/') || 
                       window.location.pathname.includes('/guru/') || 
                       window.location.pathname.includes('/admin/');
      const cleanPath = url.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
      return isSubdir ? '../' + cleanPath : cleanPath;
    },

    getPhoto: function(nisn) {
      if (!nisn) return null;
      const cleanNisn = String(nisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');

      // 1. Cek sesi user login aktif
      const u = FincestemCore.auth.getUser();
      if (u) {
        const uId = String(u.nisn || u.identifier || '').replace(/\D/g, '');
        if (uId && (uId === cleanNisn || uId === unpadded || uId === padded) && u.photo_url) {
          return this.normalizePhotoUrl(u.photo_url);
        }
      }

      // 2. Cek penyimpanan lokal browser untuk seluruh variasi NISN
      const local = localStorage.getItem('fincestem_photo_' + cleanNisn) ||
                    localStorage.getItem('fincestem_photo_' + unpadded) ||
                    localStorage.getItem('fincestem_photo_' + padded);
      if (local) {
        if (u) {
          const uId = String(u.nisn || u.identifier || '').replace(/\D/g, '');
          if (uId && (uId === cleanNisn || uId === unpadded || uId === padded) && !u.photo_url) {
            u.photo_url = this.normalizePhotoUrl(local);
            FincestemCore.auth.setUser(u, u.role || 'siswa');
          }
        }
        return this.normalizePhotoUrl(local);
      }

      // 3. Cek master data siswa in-memory
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(x => 
          String(x.nisn).trim() === cleanNisn || 
          String(x.nisn).trim() === unpadded || 
          String(x.nisn).trim() === padded || 
          String(x.nis).trim() === cleanNisn
        );
        if (found && found.photo_url) return this.normalizePhotoUrl(found.photo_url);
      }
      return null;
    },

    // Kompresi foto di sisi browser agar ringan (<80 KB) & super cepat di HP
    compressImage: function(file, maxWidth, quality, callback) {
      if (!file || !file.type.startsWith('image/')) {
        callback(null, file);
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          let w = img.width;
          let h = img.height;
          const maxDim = maxWidth || 480;

          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const compressedDataUrl = canvas.toDataURL(mime, quality || 0.82);

          canvas.toBlob(function(blob) {
            callback(compressedDataUrl, blob || file);
          }, mime, quality || 0.82);
        };
        img.onerror = function() { callback(e.target.result, file); };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    uploadStudentPhoto: function(file, nisn, callback) {
      if (!file || !nisn) {
        if (callback) callback({ success: false, message: 'File dan NISN wajib ada' });
        return;
      }
      const self = this;
      const cleanNisn = String(nisn).trim();
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = cleanNisn.padStart(10, '0');
      const allIdVars = Array.from(new Set([cleanNisn, unpadded, padded])).filter(Boolean);

      // Kompres otomatis sebelum disimpan/dikirim agar website tetap ringan & hemat kuota
      this.compressImage(file, 480, 0.82, function(compressedDataUrl, compressedBlob) {
        // 1. Simpan pratinjau lokal instan ke seluruh variasi ID
        if (compressedDataUrl) {
          allIdVars.forEach(id => {
            try {
              localStorage.setItem('fincestem_photo_' + id, compressedDataUrl);
            } catch (e) {}
          });
        }

        // Update sesi user jika sedang login
        const u = FincestemCore.auth.getUser();
        if (u) {
          const uId = String(u.nisn || u.identifier || '').replace(/\D/g, '');
          if (allIdVars.includes(uId) || allIdVars.includes(String(u.nis || '').trim())) {
            u.photo_url = compressedDataUrl || u.photo_url;
            FincestemCore.auth.setUser(u, u.role || 'siswa');
          }
        }

        // Update di master data in-memory
        if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
          const s = window.FincestemMasterStudents.find(x => 
            allIdVars.includes(String(x.nisn || '').trim()) || 
            allIdVars.includes(String(x.nis || '').trim())
          );
          if (s) s.photo_url = compressedDataUrl;
        }

        // 2. Upload ke backend server cPanel
        if (window.location.protocol.startsWith('http')) {
          const fd = new FormData();
          fd.append('photo', compressedBlob || file, 'photo_' + cleanNisn + '.jpg');
          fd.append('nisn', cleanNisn);
          if (u) {
            if (u.nama || u.name) fd.append('nama', u.nama || u.name);
            if (u.nis) fd.append('nis', u.nis);
            if (u.class || u.class_name) fd.append('class_name', u.class || u.class_name);
            if (u.zone) fd.append('zone', u.zone);
          }

          fetch(FincestemCore.api.base + '/upload_photo.php', {
            method: 'POST',
            body: fd
          })
          .then(r => r.json())
          .then(res => {
            if (res.success && res.data && res.data.photo_url) {
              const serverPhotoUrl = self.normalizePhotoUrl(res.data.photo_url);
              allIdVars.forEach(id => {
                try {
                  localStorage.setItem('fincestem_photo_' + id, serverPhotoUrl);
                } catch (e) {}
              });
              if (u) {
                const uId = String(u.nisn || u.identifier || '').replace(/\D/g, '');
                if (allIdVars.includes(uId) || allIdVars.includes(String(u.nis || '').trim())) {
                  u.photo_url = serverPhotoUrl;
                  FincestemCore.auth.setUser(u, u.role || 'siswa');
                }
              }
              if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
                const s = window.FincestemMasterStudents.find(x => 
                  allIdVars.includes(String(x.nisn || '').trim()) || 
                  allIdVars.includes(String(x.nis || '').trim())
                );
                if (s) s.photo_url = serverPhotoUrl;
              }
            }
            if (callback) callback(res);
          })
          .catch(() => {
            if (callback) callback({ success: true, photo_url: compressedDataUrl, local: true });
          });
        } else {
          if (callback) callback({ success: true, photo_url: compressedDataUrl, local: true });
        }
      });
    },

    // Sinkronisasi foto semua siswa dari server secara real-time ke Admin, Koordinator & Fasilitator
    syncPhotos: function(callback) {
      const self = this;
      if (!window.location.protocol.startsWith('http')) {
        if (callback) callback(false);
        return;
      }

      fetch(FincestemCore.api.base + '/upload_photo.php')
        .then(r => r.json())
        .then(res => {
          if (res && res.success && Array.isArray(res.data)) {
            const master = window.FincestemMasterStudents || [];
            res.data.forEach(item => {
              const rawId = String(item.identifier || item.nisn || '').trim();
              if (rawId && item.photo_url) {
                const normUrl = self.normalizePhotoUrl(item.photo_url);
                const clean = rawId.replace(/[^A-Za-z0-9]/g, '');
                const unpadded = clean.replace(/^0+/, '');
                const padded = clean.padStart(10, '0');
                const variations = Array.from(new Set([rawId, clean, unpadded, padded, String(item.nis || '').trim()])).filter(Boolean);

                variations.forEach(vid => {
                  try {
                    localStorage.setItem('fincestem_photo_' + vid, normUrl);
                  } catch (e) {}
                  if (item.zone) {
                    try {
                      localStorage.setItem('fincestem_student_zone_' + vid, item.zone);
                    } catch (e) {}
                  }
                });

                const s = master.find(x => 
                  variations.includes(String(x.nisn || '').trim()) || 
                  variations.includes(String(x.nis || '').trim())
                );
                if (s) {
                  s.photo_url = normUrl;
                  if (item.zone) s.zone = item.zone;
                }
              }
            });
            if (callback) callback(true, res.data);
          } else {
            if (callback) callback(false);
          }
        })
        .catch(() => {
          if (callback) callback(false);
        });
    }
  },

  // Modul Jadwal Eksplor FINCESTEM Day 1 s.d. Day 7 & Day 0 (Gladi Bersih)
  schedule: {
    getDefaults: function() {
      const today = new Date().toISOString().split('T')[0];
      return [
        { day_number: 0, title: 'Day 0: Simulasi & Gladi Bersih FINCESTEM', theme: 'Orientasi Sistem, Pengisian LKPD, Asesmen & Unggah Dokumentasi', date: today, date_formatted: 'Hari Ini (Simulasi)', start_time: '06:00', end_time: '23:59', is_active: 1, auto_schedule: 0, description: 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM (mempelajari materi modul simulasi, mengisi instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mengunggah foto dokumentasi) sebelum pelaksanaan riset lapangan sesungguhnya.' },
        { day_number: 1, title: 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur', theme: 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah', date: '2026-11-09', date_formatted: '09 November 2026', start_time: '07:00', end_time: '18:00', is_active: 1, auto_schedule: 0, description: 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.' },
        { day_number: 2, title: 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur', theme: 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering', date: '2026-11-10', date_formatted: 'Selasa, 10 November 2026', start_time: '07:00', end_time: '18:00', is_active: 1, auto_schedule: 0, description: 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.' },
        { day_number: 3, title: 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', theme: 'Teknologi Pertanian Modern & Mekanisasi', date: '2026-11-11', date_formatted: '11 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.' },
        { day_number: 4, title: 'Day 4: Literasi Finansial & Rantai Pasok Pangan', theme: 'Financial Literacy & Ekonomi Agrikultur', date: '2026-11-12', date_formatted: '12 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.' },
        { day_number: 5, title: 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', theme: 'Culture & Kearifan Lokal Komunitas Multikultural', date: '2026-11-13', date_formatted: '13 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Wawancara tetua adat, kajian tradisi gotong royong lumbung desa, dan pencatatan nilai-nilai budaya.' },
        { day_number: 6, title: 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', theme: 'Data Science & Penyusunan Laporan Proyek', date: '2026-11-14', date_formatted: '14 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.' },
        { day_number: 7, title: 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', theme: 'Diseminasi Temuan & Refleksi Kokurikuler', date: '2026-11-15', date_formatted: '15 November 2026', start_time: '07:00', end_time: '20:00', is_active: 0, auto_schedule: 1, description: 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.' }
      ];
    },

    // Rekap Tabel Keseimbangan 4 Pilar (Day 1 s.d. Day 7) untuk Field Trip
    // Acuan Resmi Penilaian Imbang & Terukur (25% Financial, 25% Culture, 25% Exploration, 25% STEM)
    fourPillarsBalanceMatrix: {
      1: { day: 1, pilar: 'FINANCIAL', label: 'Financial (Literasi Keuangan)', weight: '25%', destination: 'Belitang → Tol Trans-Jawa → Semarang', focus: 'Journey Budgeting: Alokasi uang saku 7 hari & pembukuan kas.' },
      2: { day: 2, pilar: 'CULTURE & STEM', label: 'Culture & STEM', weight: '25%', destination: 'AKPOL Semarang & Lawang Sewu', focus: 'Karakter & Rekayasa: Disiplin Bhayangkara AKPOL & arsitektur pendingin alami Lawang Sewu.' },
      3: { day: 3, pilar: 'FULL STEM', label: 'Full STEM', weight: '25%', destination: 'Petik Apel, Jatim Park 1 & Museum Angkut', focus: 'Sains & Rekayasa: Fisika terapan Jatim Park 1, teknologi mesin Museum Angkut & agrosains apel.' },
      4: { day: 4, pilar: 'EXPLORATION & CULTURE', label: 'Exploration & Culture', weight: '25%', destination: 'Wisata Bromo (Kawah, Laut Pasir, Savana)', focus: 'Bentang Alam & Adat: Geologi kaldera vulkanik Bromo & kearifan adat Suku Tengger.' },
      5: { day: 5, pilar: 'STEM & EXPLORATION', label: 'STEM & Exploration', weight: '25%', destination: 'Prambanan, Praktik Membatik & UNY', focus: 'Sains Kimia & Eksplorasi Edukasi: Sifat hidrofobik malam batik, geometri candi & kunjungan edukasi kampus UNY.' },
      6: { day: 6, pilar: 'EXPLORATION & FINANCIAL', label: 'Exploration & Financial', weight: '25%', destination: 'Pabrik Bakpia Jogja & Pantai Drini / Drini Park', focus: 'Bentang Alam Bahari & Finansial Industri: Karst Pantai Drini, omzet & HPP pabrik bakpia, serta belanja cerdas.' },
      7: { day: 7, pilar: 'FINANCIAL (Reconciliation)', label: 'Financial (Reconciliation)', weight: '25%', destination: 'Perjalanan Pulang → Tiba di SMAN 1 Belitang', focus: 'Audit & Tutup Buku: Rekonsiliasi anggaran uang saku, selisih rencana vs realisasi, & refleksi akhir.' }
    },

    // Master Jadwal Resmi Ekspedisi Field Trip (Day 0 s.d. Day 7) Sesuai Rute & Itinerary
    fieldTripDaysConfig: {
      0: {
        day_number: 0,
        title: 'DAY 0: SIMULASI & GLADI BERSIH FINCESTEM',
        theme: 'Orientasi Sistem, Uji Coba LKPD, Asesmen & Unggah Dokumentasi',
        date_formatted: 'Hari Ini (Simulasi)',
        time_range: '06.00 - 23.59 WIB',
        route_lines: [
          ['Persiapan Mandiri', 'Simulasi Aplikasi FINCESTEM']
        ],
        route: 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip',
        description: 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.',
        sessions: [
          { time: '06.00 - 23.59 WIB', title: 'Simulasi Pengisian LKPD & Kuis Asesmen', location: 'Aplikasi FINCESTEM', icon: 'fact_check' }
        ],
        refl_title: 'Jurnal Refleksi Simulasi (Gladi Bersih)',
        refl_prompt: 'Tuliskan pengalaman Anda dalam mencoba fitur aplikasi FINCESTEM hari ini: apa saja yang sudah Anda pahami mengenai tata cara pengisian LKPD, asesmen, dan jurnal perjalanan selama ekspedisi lapangan?'
      },
      1: {
        day_number: 1,
        title: 'HARI KE-1: BELITANG – SEMARANG',
        theme: 'Perjalanan Darat Belitang menuju Semarang & Personal Travel Budget',
        date_formatted: 'Senin, 09 November 2026',
        time_range: '07.00 - Selesai WIB',
        route_lines: [
          ['Belitang', 'Pelabuhan Bakauheni', 'Pelabuhan Merak'],
          ['Tol Trans-Jawa', 'Semarang']
        ],
        route: 'Belitang → Pelabuhan Bakauheni → Pelabuhan Merak → Tol Trans-Jawa → Semarang',
        description: 'Pukul 07.00 WIB, rombongan berangkat dari Belitang menuju Kota Semarang. Melintasi Tol Trans-Sumatera, penyeberangan Selat Sunda, Tol Trans-Jawa, serta bermalam di perjalanan.',
        sessions: [
          { time: '07.00 WIB', title: 'Berangkat dari Belitang Menuju Semarang', location: 'Belitang', icon: 'directions_bus', highlight: 'indigo' },
          { time: '11.30 – 13.00', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'lunch_dining', highlight: 'orange' },
          { time: '14.30 – 17.00', title: 'Penyeberangan Selat Sunda', location: 'Bakauheni – Merak', icon: 'directions_boat', highlight: 'teal' },
          { time: '18.30 – 19.30', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'dinner_dining', highlight: 'orange' },
          { time: '20.00 – Selesai', title: 'Bermalam di Perjalanan Menuju Semarang', location: 'Perjalanan Menuju Semarang', icon: 'bedtime', highlight: 'indigo' }
        ],
        refl_title: 'Jurnal Refleksi Hari Pertama (Belitang → Semarang)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari pertama perjalanan ini: momen berpamitan di sekolah, pengalaman perjalanan menuju Semarang bersama teman, serta bagaimana komitmen Anda dalam menjaga dan mengelola uang saku selama 7 hari perjalanan ke depan.'
      },
      2: {
        day_number: 2,
        title: 'HARI KE-2: SEMARANG – MALANG',
        theme: 'Transit Semarang, AKPOL, Lawang Sewu & Menuju Malang',
        date_formatted: 'Selasa, 10 November 2026',
        time_range: '04.30 - Selesai WIB',
        route_lines: [
          ['Transit Semarang', 'AKPOL Semarang'],
          ['Lawang Sewu', 'Perjalanan Menuju Malang', 'Hotel Malang']
        ],
        route: 'Transit Semarang → AKPOL Semarang → Lawang Sewu → Perjalanan Menuju Malang → Hotel Malang',
        description: 'Pada pagi hari, rombongan tiba di Semarang dan melakukan transit untuk beristirahat serta sarapan. Selanjutnya mengunjungi AKPOL Semarang dan Lawang Sewu, kemudian melanjutkan perjalanan menuju Malang.',
        sessions: [
          { time: '04.30 – 05.00', title: 'Transit di Semarang', location: 'Semarang', icon: 'wc', highlight: 'slate' },
          { time: '05.00 – 07.00', title: 'Sarapan Pagi', location: 'Semarang', icon: 'free_breakfast', highlight: 'orange' },
          { time: '07.00 – 08.00', title: 'Persiapan Kunjungan', location: 'Semarang', icon: 'groups', highlight: 'sky' },
          { time: '09.00 – 12.00', title: 'Kunjungan Ke Akpol', location: 'AKPOL Semarang', icon: 'military_tech', highlight: 'blue' },
          { time: '12.00 – 12.30', title: 'Makan Siang', location: 'Semarang', icon: 'lunch_dining', highlight: 'orange' },
          { time: '13.00 – 14.30', title: 'Kunjungan Lawang Sewu', location: 'Lawang Sewu, Semarang', icon: 'account_balance', highlight: 'amber' },
          { time: '14.30 – 20.30', title: 'Perjalanan ke Malang', location: 'Semarang – Malang', icon: 'directions_bus', highlight: 'indigo' },
          { time: '20.30 – Selesai', title: 'Cek in Hotel Malang', location: 'Hotel Malang', icon: 'hotel', highlight: 'emerald' }
        ],
        refl_title: 'Jurnal Refleksi Hari Kedua (AKPOL & Lawang Sewu Semarang)',
        refl_prompt: 'Refleksikan apa yang Anda rasakan dan pelajari hari ini: (1) Makna disiplin, etika kepemimpinan, dan integritas yang Anda pelajari dari Akademi Kepolisian (AKPOL), (2) Kekaguman terhadap kearifan rekayasa teknologi arsitektur kuno dan heroisme pemuda AMKA di Lawang Sewu, serta (3) Bagaimana kedua nilai luhur ini menginspirasi karakter Anda sebagai generasi muda penerus bangsa.'
      },
      3: {
        day_number: 3,
        title: 'HARI KE-3: WISATA BATU – BROMO',
        theme: 'Wisata Edukasi Kawasan Batu & Perjalanan Menuju Bromo',
        date_formatted: 'Rabu, 11 November 2026',
        time_range: '06.30 - Selesai WIB',
        route_lines: [
          ['Batu', 'Wisata Petik Apel', 'Jatim Park 1'],
          ['Museum Angkut', 'Batu – Bromo']
        ],
        route: 'Batu → Wisata Petik Apel → Jatim Park 1 → Museum Angkut → Batu–Bromo',
        description: 'Setelah sarapan pagi dan check-out hotel, rombongan melanjutkan kegiatan wisata edukasi agribisnis dan sains rekayasa di kawasan Batu. Setelah makan malam, rombongan bertolak menuju kawasan Bromo.',
        sessions: [
          { time: '06.30 – 07.30', title: 'Sarapan Pagi & Check-out Hotel', location: 'Hotel di Malang', icon: 'free_breakfast', highlight: 'orange' },
          { time: '08.00 – 10.30', title: 'Wisata Petik Apel', location: 'Batu', icon: 'eco', highlight: 'emerald' },
          { time: '11.00 – 12.00', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'lunch_dining', highlight: 'orange' },
          { time: '13.00 – 15.30', title: 'Kunjungan Jatim Park 1', location: 'Jatim Park 1', icon: 'science', highlight: 'purple' },
          { time: '15.45 – 18.30', title: 'Kunjungan Museum Angkut', location: 'Museum Angkut', icon: 'commute', highlight: 'sky' },
          { time: '18.45 – 20.00', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'dinner_dining', highlight: 'orange' },
          { time: '20.00 – Selesai', title: 'Perjalanan Menuju Bromo', location: 'Batu–Bromo', icon: 'directions_bus', highlight: 'indigo' }
        ],
        refl_title: 'Jurnal Refleksi Hari Ketiga (Petik Apel, Jatim Park 1 & Museum Angkut)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari ketiga: keseruan memetik apel segar di kebun petani Batu, wawasan sains fisika terapan di Jatim Park 1, kekaguman melihat evolusi transportasi di Museum Angkut, serta bagaimana Anda mempersiapkan fisik menghadapi ekspedisi dini hari ke Gunung Bromo!'
      },
      4: {
        day_number: 4,
        title: 'HARI KE-4: WISATA GUNUNG BROMO – YOGYAKARTA',
        theme: 'Wisata Gunung Bromo & Perjalanan Menuju Yogyakarta',
        date_formatted: 'Kamis, 12 November 2026',
        time_range: '03.30 - Selesai WIB',
        route_lines: [
          ['Transit Bromo', 'Gunung Bromo', 'Pasir Berbisik'],
          ['Padang Savana', 'Kawah Bromo', 'Sukapura'],
          ['Sukapura–Yogyakarta', 'Hotel Yogyakarta']
        ],
        route: 'Transit Bromo → Gunung Bromo → Pasir Berbisik → Padang Savana → Kawah Bromo → Menuju Sukapura → Sukapura–Yogyakarta → Hotel Yogyakarta',
        description: 'Pukul 03.30 WIB tiba di tempat transit Sukapura, bersiap naik armada Jeep menuju kaldera Bromo (Sunrise, Pasir Berbisik, Savana, Kawah). Setelahnya bertolak menuju Yogyakarta dan check-in hotel.',
        sessions: [
          { time: '03.30 – 04.30', title: 'Persiapan & Perpindahan ke Jeep', location: 'Transit Bromo', icon: 'airport_shuttle', highlight: 'stone' },
          { time: '04.30 – 05.30', title: 'Menikmati Sunrise Bromo', location: 'Gunung Bromo', icon: 'wb_sunny', highlight: 'amber' },
          { time: '06.00 – 07.00', title: 'Kunjungan Pasir Berbisik', location: 'Pasir Berbisik', icon: 'grain', highlight: 'yellow' },
          { time: '07.15 – 08.15', title: 'Sarapan Pagi di Savana', location: 'Padang Savana', icon: 'grass', highlight: 'lime' },
          { time: '08.30 – 10.00', title: 'Kunjungan Kawah Bromo', location: 'Kawah Bromo', icon: 'volcano', highlight: 'rose' },
          { time: '10.00 – 12.30', title: 'Perjalanan Turun Sukapura', location: 'Menuju Sukapura', icon: 'shower', highlight: 'slate' },
          { time: '13.00 – 14.00', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'lunch_dining', highlight: 'orange' },
          { time: '14.00 – 18.30', title: 'Perjalanan Menuju Yogyakarta', location: 'Sukapura–Yogyakarta', icon: 'directions_bus', highlight: 'indigo' },
          { time: '18.30 – Selesai', title: 'Cek in Hotel Yogyakarta & Makan Malam', location: 'Hotel Yogyakarta', icon: 'hotel', highlight: 'emerald' }
        ],
        refl_title: 'Jurnal Refleksi Hari Keempat (Ekspedisi Bromo → Yogyakarta)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari keempat: momen takjub menembus dinginnya malam dengan armada jeep menuju sunrise Penanjakan Bromo, sensasi melintasi Pasir Berbisik dan Padang Savana, trekking menuju kawah aktif Bromo, kekaguman adat Suku Tengger, serta perjalanan panjang menuju kota istimewa Yogyakarta!'
      },
      5: {
        day_number: 5,
        title: 'HARI KE-5: CANDI PRAMBANAN, BATIK & KAMPUS UNY',
        theme: 'Sains Kimia Lilin Batik, Geometri Candi Prambanan & Inspirasi Studi Lanjut UNY',
        date_formatted: 'Jumat, 13 November 2026',
        time_range: '06.00 - Selesai WIB',
        route_lines: [
          ['Hotel', 'Candi Prambanan', 'Praktik Batik Benang Ratu'],
          ['Restoran Lokal', 'Kampus UNY', 'Malioboro / Hotel']
        ],
        route: 'Hotel → Candi Prambanan → Praktik Membatik Benang Ratu → Restoran Lokal → Kampus UNY → Malioboro → Hotel Yogyakarta',
        description: 'Setelah sarapan pagi di hotel, rombongan mengeksplorasi megastruktur & geometri Candi Prambanan, mempraktikkan sains kimia malam batik di Batik Benang Ratu, makan siang, dilanjutkan kunjungan edukasi kampus & inspirasi studi lanjut di UNY serta menikmati suasana budaya Malioboro.',
        sessions: [
          { time: '06.00 – 07.30', title: 'Sarapan Pagi di Hotel', location: 'Hotel Yogyakarta', icon: 'free_breakfast', highlight: 'orange' },
          { time: '08.00 – 10.30', title: 'Megastruktur & Geometri Candi Prambanan', location: 'Candi Prambanan', icon: 'temple_hindu', highlight: 'purple' },
          { time: '11.00 – 12.45', title: 'Praktik Membatik & Sains Kimia Lilin Malam', location: 'Batik Benang Ratu', icon: 'palette', highlight: 'amber' },
          { time: '13.00 – 14.00', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'lunch_dining', highlight: 'orange' },
          { time: '14.30 – 17.00', title: 'Kunjungan Edukasi Kampus & Inspirasi UNY', location: 'Kampus UNY Yogyakarta', icon: 'school', highlight: 'blue' },
          { time: '17.30 – 20.30', title: 'Observasi Budaya & Relaksasi Malioboro', location: 'Kawasan Malioboro', icon: 'storefront', highlight: 'amber' },
          { time: '20.30 – Selesai', title: 'Kembali ke Hotel Yogyakarta & Istirahat', location: 'Hotel Yogyakarta', icon: 'hotel', highlight: 'emerald' }
        ],
        refl_title: 'Jurnal Refleksi Hari Kelima (Prambanan, Batik & Kampus UNY)',
        refl_prompt: 'Refleksikan apa yang Anda peroleh hari ini: (1) Sains kimiawi sifat hidrofobik lilin malam (wax barrier) dan proses fiksasi pewarna kain batik di Benang Ratu, (2) Kajian struktur simetri geometri dan sejarah relief Candi Prambanan, serta (3) Refleksi kunjungan edukasi kampus UNY dan motivasi studi lanjut jurusan impian Anda!'
      },
      6: {
        day_number: 6,
        title: 'HARI KE-6: PABRIK BAKPIA JOGKEM, PANTAI DRINI & PULANG',
        theme: 'Akulturasi Budaya & Finansial Industri Bakpia, Ekosistem Karst Bahari Pantai Drini & Perjalanan Pulang',
        date_formatted: 'Sabtu, 14 November 2026',
        time_range: '06.30 - Selesai WIB',
        route_lines: [
          ['Pabrik Bakpia Jogkem', 'Pantai Drini Gunungkidul', 'Drini Park'],
          ['Restoran Lokal', 'Yogyakarta–Belitang']
        ],
        route: 'Hotel → Pabrik Bakpia Jogkem → Pantai Drini Gunungkidul → Drini Park → Restoran Lokal → Perjalanan Pulang Belitang',
        description: 'Setelah sarapan pagi dan check-out hotel, rombongan mengunjungi Pabrik Bakpia Jogkem untuk observasi open kitchen, akulturasi budaya Cina-Indonesia, literasi finansial/HPP/omzet dan belanja cerdas, dilanjutkan eksplorasi bentang alam karst & ekosistem bahari Pantai Drini serta Drini Park. Malam hari rombongan bertolak pulang menuju Belitang.',
        sessions: [
          { time: '06.30 – 07.30', title: 'Sarapan & Check-out Hotel', location: 'Hotel Yogyakarta', icon: 'free_breakfast', highlight: 'orange' },
          { time: '08.00 – 10.00', title: 'Akulturasi Budaya & Literasi Finansial Pabrik Bakpia Jogkem', location: 'Pabrik Bakpia Jogkem', icon: 'bakery_dining', highlight: 'amber' },
          { time: '11.30 – 13.30', title: 'Eksplorasi Ekosistem & Karst Pantai Drini', location: 'Pantai Drini Gunungkidul', icon: 'beach_access', highlight: 'cyan' },
          { time: '13.30 – 15.00', title: 'Observasi Tata Kelola Wisata Drini Park', location: 'Drini Park Gunungkidul', icon: 'attractions', highlight: 'teal' },
          { time: '15.30 – 17.00', title: 'Makan Sore & Manajemen Belanja Oleh-Oleh Cerdas', location: 'Pusat Belanja Jogja', icon: 'shopping_bag', highlight: 'amber' },
          { time: '18.00 – 19.30', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'dinner_dining', highlight: 'orange' },
          { time: '19.30 – Selesai', title: 'Perjalanan Pulang Menuju Belitang', location: 'Yogyakarta–Belitang', icon: 'directions_bus', highlight: 'indigo' }
        ],
        refl_title: 'Jurnal Refleksi Hari Keenam (Pabrik Bakpia Jogkem, Pantai Drini & Perjalanan Pulang)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari keenam: (1) Wawasan akulturasi budaya Cina–Indonesia pada kuliner bakpia, inovasi rasa, open kitchen, penetapan HPP, margin laba dan omzet di Pabrik Bakpia Jogkem, (2) Observasi morfologi batuan karst dan ekosistem bahari Pantai Drini, serta (3) Manajemen belanja oleh-oleh cerdas untuk keluarga berbasis sisa uang saku sebelum bertolak menuju Belitang!'
      },
      7: {
        day_number: 7,
        title: 'HARI KE-7: TIBA DI BELITANG',
        theme: 'Transit Restoran Tol, Sarapan & Tiba di SMAN 1 Belitang',
        date_formatted: 'Minggu, 15 November 2026',
        time_range: '06.00 - Selesai WIB',
        route_lines: [
          ['Tol Trans-Sumatera', 'Restoran Lokal (Transit)'],
          ['Tempat Penjemputan', 'SMAN 1 Belitang']
        ],
        route: 'Tol Trans-Sumatera → Restoran Lokal (Transit) → Tempat Penjemputan SMAN 1 Belitang',
        description: 'Pada pagi hari, rombongan transit di restoran lokal jalan tol untuk sarapan dan beristirahat sejenak. Perjalanan dilanjutkan menuju Belitang, diperkirakan tiba di SMAN 1 Belitang pada siang hari.',
        sessions: [
          { time: '06.00 – 08.00', title: 'Transit Sarapan & Istirahat', location: 'Restoran Lokal Tol', icon: 'free_breakfast', highlight: 'orange' },
          { time: '08.00 – 12.00', title: 'Perjalanan Menuju Belitang', location: 'Perjalanan Menuju Belitang', icon: 'directions_bus', highlight: 'indigo' },
          { time: '12.00 – Selesai', title: 'Tiba di Tempat Penjemputan SMAN 1 Belitang', location: 'SMAN 1 Belitang', icon: 'home', highlight: 'emerald' }
        ],
        refl_title: 'Jurnal Refleksi Penutup (7 Hari Ekspedisi Field Trip)',
        refl_prompt: 'Tuliskan refleksi penutup komprehensif Anda setelah menjalani 7 hari ekspedisi Field Trip FINCESTEM: perubahan cara pandang Anda dalam mengelola finansial, nilai kedisiplinan dan kerja sama kelompok yang dipelajari, serta kenangan paling berharga yang akan Anda bawa selamanya!'
      }
    },

    nonFieldTripDaysConfig: {
      0: {
        day_number: 0,
        title: 'Day 0: Simulasi & Gladi Bersih FINCESTEM',
        theme: 'Orientasi Sistem, Pengisian LKPD, Asesmen & Unggah Dokumentasi',
        date_formatted: 'Hari Ini (Simulasi)',
        time_range: '06.00 - 23.59 WIB',
        description: 'Sesi uji coba dan orientasi teknis bagi peserta didik untuk memahami dan mencoba seluruh alur menu FINCESTEM sebelum pelaksanaan riset lapangan sesungguhnya.'
      },
      1: {
        day_number: 1,
        title: 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur',
        theme: 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah',
        date_formatted: 'Senin, 09 November 2026',
        time_range: '07.00 - 18.00 WIB',
        description: 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.',
        refl_title: 'Jurnal Refleksi Day 1: Fondasi Ekonomi & Potensi OKU Timur',
        refl_prompt: 'Setelah mempelajari kegiatan ekonomi, literasi finansial, dan pemetaan potensi daerah hari ini, bagaimana Anda akan menerapkan kebiasaan mengelola keuangan dengan bijak dalam kehidupan sehari-hari sekaligus memanfaatkan peluang potensi ekonomi yang ada di Kabupaten OKU Timur?',
        refl_placeholder: 'Silakan tuliskan pendapat, pengalaman, dan rencana Anda berdasarkan materi yang telah dipelajari. Jawablah sesuai pemahaman dan kondisi kehidupan sehari-hari Anda.'
      },
      2: {
        day_number: 2,
        title: 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur',
        theme: 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering',
        date_formatted: 'Selasa, 10 November 2026',
        time_range: '07.00 - 18.00 WIB',
        description: 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.',
        refl_title: 'Jurnal Refleksi Day 2: Budaya, Mata Pencaharian & Teknologi Pertanian',
        refl_prompt: 'Setelah mempelajari hakikat kebudayaan, keragaman mata pencaharian, dan modernisasi teknologi pertanian hari ini, bagaimana Anda melihat peran budaya gotong royong dan adopsi mesin pertanian dalam memajukan kesejahteraan masyarakat Kabupaten OKU Timur?',
        refl_placeholder: 'Silakan tuliskan pendapat, pengalaman, dan pandangan Anda mengenai perpaduan budaya kerja sama warga dan kemajuan teknologi pertanian di OKU Timur...'
      }
    },

    getFieldTripDayConfig: function(dayNum) {
      return this.fieldTripDaysConfig ? this.fieldTripDaysConfig[Number(dayNum)] : null;
    },

    getNonFieldTripDayConfig: function(dayNum) {
      return this.nonFieldTripDaysConfig ? this.nonFieldTripDaysConfig[Number(dayNum)] : null;
    },

    // Evaluasi status keterbukaan hari (Tutup Paksa jika is_active = 0, Buka Manual jika auto_schedule = 0, atau Otomatis)
    evaluateDayStatus: function(d, refDate) {
      const isActive = Number(d.is_active);
      const autoSched = Number(d.auto_schedule);

      // 1. Jika is_active == 0, MUTLAK DITUTUP PAKSA
      if (isActive === 0) {
        d.is_open = false;
        d.status_code = 'MANUAL_CLOSED';
        d.status_label = 'Ditutup Manual oleh Admin';
        return d;
      }

      // 2. Jika auto_schedule == 0 dan is_active == 1, BUKA MANUAL OLEH ADMIN
      if (autoSched === 0) {
        d.is_open = true;
        d.status_code = 'OPEN';
        d.status_label = 'Terbuka (Manual Admin)';
        return d;
      }

      // 3. Otomatis: Bandingkan waktu saat ini dengan rentang tanggal dan jam
      try {
        const now = refDate ? new Date(refDate) : new Date();
        const dDateStr = d.date; // Format YYYY-MM-DD
        const sTime = d.start_time ? (d.start_time.length === 5 ? d.start_time + ':00' : d.start_time) : '07:00:00';
        const eTime = d.end_time ? (d.end_time.length === 5 ? d.end_time + ':00' : d.end_time) : '18:00:00';

        const startDT = new Date(`${dDateStr}T${sTime}`);
        const endDT = new Date(`${dDateStr}T${eTime}`);

        if (now < startDT) {
          d.is_open = false;
          d.status_code = 'UPCOMING';
          d.status_label = `Akan dibuka ${d.date_formatted || dDateStr} pukul ${sTime.substring(0, 5)}`;
        } else if (now > endDT) {
          d.is_open = false;
          d.status_code = 'EXPIRED';
          d.status_label = 'Waktu Pelaksanaan Telah Berakhir';
        } else {
          d.is_open = true;
          d.status_code = 'OPEN';
          d.status_label = 'Aktivitas Sedang Berlangsung';
        }
      } catch (e) {
        d.is_open = (isActive === 1);
        d.status_code = d.is_open ? 'OPEN' : 'MANUAL_CLOSED';
        d.status_label = d.is_open ? 'Terbuka' : 'Ditutup Manual oleh Admin';
      }
      return d;
    },

    evaluateScheduleList: function(days, serverTime) {
      if (!Array.isArray(days)) return [];
      const self = this;
      return days.map(d => {
        // Auto-sinkronisasi Day 1 Non-Field Trip jika di DB / cache masih tersimpan data usang Orientasi & Pembekalan Riset atau auto_schedule usang
        if (Number(d.day_number) === 1) {
          if (String(d.title).includes('Orientasi') || String(d.theme).includes('Pembekalan')) {
            d.title = 'Day 1: Fondasi Ekonomi, Literasi Finansial & Pemetaan Potensi OKU Timur';
            d.theme = 'Kajian Konseptual 3 Sektor Ekonomi, Kebanksentralan, Perkoperasian & Komoditas Unggulan Daerah';
            d.description = 'Riset pustaka mandiri mengenai kegiatan ekonomi, literasi finansial, sistem pembayaran Bank Indonesia, tata kelola badan usaha/koperasi, serta pemetaan potensi sektor unggulan Kabupaten OKU Timur.';
          }
          // Pastikan Day 1 Non-Field Trip selalu terbuka (is_open: true) untuk pengujian & pengerjaan siswa
          if (d.auto_schedule === undefined || d.auto_schedule === null || Number(d.auto_schedule) === 1) {
            d.auto_schedule = 0;
            d.is_active = 1;
          }
        }
        // Auto-sinkronisasi Day 2 Non-Field Trip jika di DB / cache masih tersimpan data usang Eksplorasi Sains Irigasi
        if (Number(d.day_number) === 2) {
          if (String(d.title).includes('Eksplorasi Sains') || String(d.theme).includes('Saluran Irigasi')) {
            d.title = 'Day 2: Budaya, Sistem Mata Pencaharian & Modernisasi Teknologi Pertanian OKU Timur';
            d.theme = 'Kajian 7 Unsur Budaya, Mata Pencaharian Agrikultur, Alsintan Modern & Jaringan Irigasi Komering';
            d.description = 'Investigasi antropologis dan teknologi: hakikat budaya, sistem mata pencaharian pertanian pangan, perkebunan, perikanan/peternakan, UMKM lokal, serta adopsi alat mesin pertanian (alsintan) dan jaringan irigasi di Kabupaten OKU Timur.';
          }
          if (d.auto_schedule === undefined || d.auto_schedule === null || Number(d.auto_schedule) === 1) {
            d.auto_schedule = 0;
            d.is_active = 1;
          }
        }
        return self.evaluateDayStatus(d, serverTime);
      });
    },

    getFieldTripDefaults: function() {
      const configs = this.fieldTripDaysConfig || {};
      const dates = [
        '2026-11-09',
        '2026-11-10',
        '2026-11-11',
        '2026-11-12',
        '2026-11-13',
        '2026-11-14',
        '2026-11-15'
      ];
      const times = [
        { start: '07:00', end: '23:59' },
        { start: '04:30', end: '20:30' },
        { start: '07:00', end: '23:30' },
        { start: '00:00', end: '21:00' },
        { start: '06:00', end: '21:30' },
        { start: '06:30', end: '23:59' },
        { start: '05:00', end: '14:00' }
      ];
      const list = [];
      const today = new Date().toISOString().split('T')[0];
      const d0 = configs[0] || {};
      list.push({
        day_number: 0,
        title: d0.title || 'Day 0: Simulasi & Gladi Bersih FINCESTEM',
        theme: d0.theme || 'Orientasi Sistem, Pengisian LKPD, Asesmen & Unggah Dokumentasi',
        date: today,
        date_formatted: 'Hari Ini (Simulasi)',
        start_time: '06:00',
        end_time: '23:59',
        is_active: 1,
        auto_schedule: 0,
        route: d0.route || 'Uji Coba Mandiri • Persiapan Pra-Keberangkatan Field Trip',
        description: d0.description || 'Sesi simulasi dan uji coba teknis bagi seluruh peserta didik Field Trip untuk mempelajari alur pengisian instrumen LKPD latihan, mengerjakan kuis asesmen uji coba, mengisi jurnal refleksi mandiri, serta mencoba unggah dokumentasi foto sebelum keberangkatan riil.'
      });
      for (let i = 1; i <= 7; i++) {
        const c = configs[i] || {};
        const tm = times[i - 1] || { start: '07:00', end: '23:59' };
        list.push({
          day_number: i,
          title: c.title || ('Day ' + i),
          theme: c.theme || '',
          date: dates[i - 1] || '2026-11-09',
          date_formatted: c.date_formatted || '',
          start_time: tm.start,
          end_time: tm.end,
          is_active: 1,
          auto_schedule: 1,
          route: c.route || '',
          description: c.description || ''
        });
      }
      return list;
    },

    getSchedule: function(callback, category) {
      const self = this;
      const u = FincestemCore.auth.getUser();
      const roleParam = (u && u.role === 'admin') ? '&role=admin' : '';

      let cat = category;
      if (!cat) {
        if (u && (u.role === 'siswa' || !u.role)) {
          const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
            ? FincestemCore.zones.getStudentZone(u.nisn || u.identifier, u.class || u.class_name, u.zone)
            : (u.zone || '');
          const zUpper = (z || '').toUpperCase();
          cat = (zUpper.includes('LUAR') || zUpper.includes('FIELD') || zUpper.includes('TRIP')) ? 'field_trip' : 'non_field_trip';
        } else {
          cat = 'non_field_trip';
        }
      }
      const catParam = '&category=' + encodeURIComponent(cat);
      const storageKey = 'fincestem_schedules_' + cat;

      if (window.location.protocol.startsWith('http')) {
        // Anti-cache timestamp untuk menjamin siswa mendapat status terbaru
        fetch(FincestemCore.api.base + '/schedule.php?_t=' + Date.now() + roleParam + catParam, { cache: 'no-store' })
          .then(r => r.json())
          .then(data => {
            if (data && data.success && data.data && Array.isArray(data.data.days)) {
              let daysList = data.data.days;
              // Jaminan Mutlak: Jika server mengembalikan daftar tanpa Day 0, sisipkan konfigurasi default Day 0
              if (!daysList.some(d => Number(d.day_number) === 0)) {
                const def0 = (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults()).find(x => Number(x.day_number) === 0);
                if (def0) {
                  daysList.unshift(def0);
                }
              }
              const evaluated = self.evaluateScheduleList(daysList, data.data.server_time);
              localStorage.setItem(storageKey, JSON.stringify(evaluated));
              if (cat === 'non_field_trip') {
                localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
              }
              if (callback) callback(evaluated, data.data.server_time, cat);
              return;
            }
            self.getFallbackSchedule(callback, cat);
          })
          .catch(() => self.getFallbackSchedule(callback, cat));
      } else {
        self.getFallbackSchedule(callback, cat);
      }
    },

    toggleTrialDay: function(isActive, callback) {
      const actNum = isActive ? 1 : 0;
      try {
        ['non_field_trip', 'field_trip'].forEach(cat => {
          const storageKey = 'fincestem_schedules_' + cat;
          const stored = localStorage.getItem(storageKey);
          let days = stored ? JSON.parse(stored) : (cat === 'field_trip' ? this.getFieldTripDefaults() : this.getDefaults());
          let d0 = days.find(x => Number(x.day_number) === 0);
          if (!d0) {
            d0 = (cat === 'field_trip' ? this.getFieldTripDefaults() : this.getDefaults()).find(x => Number(x.day_number) === 0);
            if (d0) {
              days.unshift(d0);
            }
          }
          if (d0) {
            d0.is_active = actNum;
            d0.is_open = (actNum === 1);
            d0.status_code = (actNum === 1) ? 'OPEN' : 'MANUAL_CLOSED';
            d0.status_label = (actNum === 1) ? 'Aktivitas Sedang Dibuka' : 'Ditutup Manual oleh Admin';
          }
          localStorage.setItem(storageKey, JSON.stringify(days));
          if (cat === 'non_field_trip') {
            localStorage.setItem('fincestem_schedules', JSON.stringify(days));
          }
        });
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'toggle_trial_day',
            category: 'all',
            is_active: actNum
          })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, is_active: actNum }); });
      } else {
        if (callback) callback({ success: true, is_active: actNum });
      }
    },

    getFallbackSchedule: function(callback, category) {
      const self = this;
      const cat = category || 'non_field_trip';
      const storageKey = 'fincestem_schedules_' + cat;
      try {
        const stored = localStorage.getItem(storageKey) || (cat === 'non_field_trip' ? localStorage.getItem('fincestem_schedules') : null);
        if (stored) {
          let parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length >= 7) {
            if (!parsed.some(d => Number(d.day_number) === 0)) {
              const def0 = (cat === 'field_trip' ? this.getFieldTripDefaults() : this.getDefaults()).find(x => Number(x.day_number) === 0);
              if (def0) parsed.unshift(def0);
            }
            const evaluated = self.evaluateScheduleList(parsed);
            localStorage.setItem(storageKey, JSON.stringify(evaluated));
            if (callback) callback(evaluated, new Date().toISOString(), cat);
            return;
          }
        }
      } catch (e) {}
      const rawDef = (cat === 'field_trip') ? this.getFieldTripDefaults() : this.getDefaults();
      const def = self.evaluateScheduleList(rawDef);
      localStorage.setItem(storageKey, JSON.stringify(def));
      if (cat === 'non_field_trip') {
        localStorage.setItem('fincestem_schedules', JSON.stringify(def));
      }
      if (callback) callback(def, new Date().toISOString(), cat);
    },

    saveSchedule: function(days, callback, category) {
      const cat = category || 'non_field_trip';
      const storageKey = 'fincestem_schedules_' + cat;
      const evaluated = this.evaluateScheduleList(days);
      localStorage.setItem(storageKey, JSON.stringify(evaluated));
      if (cat === 'non_field_trip') {
        localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
      }
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_all', category: cat, days: evaluated })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, local: true, days: evaluated, category: cat }); });
      } else {
        if (callback) callback({ success: true, local: true, days: evaluated, category: cat });
      }
    },

    toggleDay: function(dayNumber, isActive, callback, category) {
      const self = this;
      const num = Number(dayNumber);
      const actNum = isActive ? 1 : 0;
      const cat = category || 'non_field_trip';
      const storageKey = 'fincestem_schedules_' + cat;

      // 1. Simpan & hitung ulang di storage lokal seketika
      let days = [];
      try {
        const stored = localStorage.getItem(storageKey) || (cat === 'non_field_trip' ? localStorage.getItem('fincestem_schedules') : null);
        days = stored ? JSON.parse(stored) : (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults());
      } catch (e) {
        days = (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults());
      }

      const d = days.find(x => Number(x.day_number) === num);
      if (d) {
        d.is_active = actNum;
        if (actNum === 0) {
          d.is_open = false;
          d.status_code = 'MANUAL_CLOSED';
          d.status_label = 'Ditutup Manual oleh Admin';
        }
      }
      const evaluated = self.evaluateScheduleList(days);
      localStorage.setItem(storageKey, JSON.stringify(evaluated));
      if (cat === 'non_field_trip') {
        localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
      }

      // 2. Kirim update tunggal toggle_day ke backend cPanel
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'toggle_day', category: cat, day_number: num, is_active: actNum })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res);
        })
        .catch(() => {
          if (callback) callback({ success: true, local: true, day_number: num, is_active: actNum, category: cat });
        });
      } else {
        if (callback) callback({ success: true, local: true, day_number: num, is_active: actNum, category: cat });
      }
    },

    // Buka semua hari (Day 1 s.d. Day 7) serentak untuk admin tes langsung di HP
    openAllDays: function(category, callback) {
      const self = this;
      const cat = category || 'field_trip';
      const storageKey = 'fincestem_schedules_' + cat;

      let days = [];
      try {
        const stored = localStorage.getItem(storageKey) || (cat === 'non_field_trip' ? localStorage.getItem('fincestem_schedules') : null);
        days = stored ? JSON.parse(stored) : (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults());
      } catch (e) {
        days = (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults());
      }

      days.forEach(d => {
        if (Number(d.day_number) >= 1 && Number(d.day_number) <= 7) {
          d.is_active = 1;
          d.auto_schedule = 0; // Manual terbuka bypass jam/tanggal
          d.is_open = true;
          d.status_code = 'OPEN';
          d.status_label = 'Terbuka (Manual Admin)';
        }
      });

      const evaluated = self.evaluateScheduleList(days);
      localStorage.setItem(storageKey, JSON.stringify(evaluated));
      if (cat === 'non_field_trip') {
        localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
      }

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'open_all_days', category: cat })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, local: true, category: cat }); });
      } else {
        if (callback) callback({ success: true, local: true, category: cat });
      }
    },

    // Kembalikan ke jadwal resmi asli (09 - 15 November 2026, 07:00 - 18:00 WIB)
    resetOfficialSchedule: function(category, callback) {
      const self = this;
      const cat = category || 'field_trip';
      const storageKey = 'fincestem_schedules_' + cat;

      const officialDates = [
        '2026-11-09',
        '2026-11-10',
        '2026-11-11',
        '2026-11-12',
        '2026-11-13',
        '2026-11-14',
        '2026-11-15'
      ];

      let days = (cat === 'field_trip' ? self.getFieldTripDefaults() : self.getDefaults());

      days.forEach(d => {
        const dNum = Number(d.day_number);
        if (dNum >= 1 && dNum <= 7) {
          d.date = officialDates[dNum - 1] || '2026-11-09';
          d.start_time = '07:00';
          d.end_time = '18:00';
          d.is_active = 1;
          d.auto_schedule = 1; // Ketat otomatis sesuai jam dan tanggal
        }
      });

      const evaluated = self.evaluateScheduleList(days);
      localStorage.setItem(storageKey, JSON.stringify(evaluated));
      if (cat === 'non_field_trip') {
        localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
      }

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reset_official_schedule', category: cat })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, local: true, category: cat }); });
      } else {
        if (callback) callback({ success: true, local: true, category: cat });
      }
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

    // Sinkronisasi data zona & pembina dari server (lintas perangkat/browser)
    syncZones: function(callback) {
      if (!window.location.protocol.startsWith('http')) {
        if (callback) callback(null);
        return;
      }
      fetch(FincestemCore.api.base + '/settings.php?_t=' + Date.now(), { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
          if (data && data.success && data.data) {
            // 1. Simpan pemetaan zona individu per siswa
            if (data.data.student_zones && typeof data.data.student_zones === 'object') {
              try {
                localStorage.setItem('fincestem_student_zones_map', JSON.stringify(data.data.student_zones));
                // Terapkan ke master list di memori (sinkronkan zone & is_field_trip mengikuti Admin)
                if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
                  const sz = data.data.student_zones;
                  window.FincestemMasterStudents.forEach(s => {
                    const sNisn = String(s.nisn || '').trim();
                    const sNis = String(s.nis || '').trim();
                    const rawDigits = sNisn.replace(/\D/g, '');
                    const padded = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : sNisn;
                    const unpadded = rawDigits.replace(/^0+/, '');
                    const z = sz[sNisn] || sz[padded] || (unpadded ? sz[unpadded] : null) || sz[sNis];
                    if (z) {
                      s.zone = z;
                      s.is_field_trip = String(z).toUpperCase().includes('LUAR');
                    }
                  });
                }
              } catch (e) {}
            }

            // 1.b. Simpan pemetaan izin dispensasi domisili luar OKU Timur per siswa
            if (data.data.location_exemptions && typeof data.data.location_exemptions === 'object') {
              try {
                localStorage.setItem('fincestem_location_exemptions_map', JSON.stringify(data.data.location_exemptions));
              } catch (e) {}
            }

            // 2. Simpan pengaturan kelas jika ada
            if (Array.isArray(data.data.classes)) {
              let classMap = {};
              try {
                const stored = localStorage.getItem('fincestem_class_settings');
                if (stored) classMap = JSON.parse(stored);
              } catch (e) {}

              data.data.classes.forEach(c => {
                if (c.class_name) {
                  classMap[c.class_name] = {
                    zone: c.zone || 'FINCESTEM OKU TIMUR',
                    coordinator_name: c.coordinator_name || 'Drs. H. Koordinator FINCESTEM',
                    facilitator_name: c.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang'
                  };
                }
              });
              localStorage.setItem('fincestem_class_settings', JSON.stringify(classMap));
            }

            if (data.data.location_exemptions) {
              localStorage.setItem('fincestem_location_exemptions_map', JSON.stringify(data.data.location_exemptions));
            }
            if (data.data.ft_grading_rules) {
              localStorage.setItem('fincestem_ft_grading_rules', JSON.stringify(data.data.ft_grading_rules));
            }
            if (data.data.emergency_grading) {
              localStorage.setItem('fincestem_emergency_grading', JSON.stringify(data.data.emergency_grading));
            }

            // 3. Jika user aktif adalah siswa, pastikan zona sesinya sinkron dengan data server
            const u = FincestemCore.auth.getUser();
            if (u && (u.role === 'siswa' || !u.role)) {
              const uNisn = String(u.nisn || '').trim();
              const uId = String(u.identifier || '').trim();
              const uNis = String(u.nis || '').trim();
              const rawDigits = (uNisn || uId).replace(/\D/g, '');
              const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : '';
              const unpaddedNisn = rawDigits.replace(/^0+/, '');

              const szMap = data.data.student_zones || {};
              const freshZone = szMap[uNisn] || szMap[uId] || szMap[uNis] || 
                                (paddedNisn ? szMap[paddedNisn] : null) || 
                                (unpaddedNisn ? szMap[unpaddedNisn] : null) || null;
              if (freshZone) {
                u.zone = freshZone;
                if (uNisn) try { localStorage.setItem('fincestem_student_zone_' + uNisn, freshZone); } catch (e) {}
                if (uId) try { localStorage.setItem('fincestem_student_zone_' + uId, freshZone); } catch (e) {}
                if (uNis) try { localStorage.setItem('fincestem_student_zone_' + uNis, freshZone); } catch (e) {}
                if (paddedNisn) try { localStorage.setItem('fincestem_student_zone_' + paddedNisn, freshZone); } catch (e) {}
                if (unpaddedNisn) try { localStorage.setItem('fincestem_student_zone_' + unpaddedNisn, freshZone); } catch (e) {}
                FincestemCore.auth.setUser(u, u.role || 'siswa');
              }
            }

            if (callback) callback(data.data);
            return;
          }
          if (callback) callback(null);
        })
        .catch(() => {
          if (callback) callback(null);
        });
    },

    getStudentZone: function(nisn, className, defaultZone) {
      if (!nisn) return defaultZone || 'FINCESTEM OKU TIMUR';
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');

      // 1. Cek peta sinkronisasi server yang tersimpan di browser (Prioritas Tertinggi: Hasil input Admin)
      try {
        const mapStr = localStorage.getItem('fincestem_student_zones_map');
        if (mapStr) {
          const map = JSON.parse(mapStr);
          if (map) {
            const z = map[cleanNisn] || map[paddedNisn] || (unpaddedNisn ? map[unpaddedNisn] : null);
            if (z) return z;
          }
        }
      } catch (e) {}

      // 2. Cek penyimpanan lokal individual per siswa
      try {
        const stored = localStorage.getItem('fincestem_student_zone_' + cleanNisn) ||
                       localStorage.getItem('fincestem_student_zone_' + paddedNisn) ||
                       (unpaddedNisn ? localStorage.getItem('fincestem_student_zone_' + unpaddedNisn) : null);
        if (stored) return stored;
      } catch (e) {}

      // 3. Cek user session aktif di browser jika cocok
      try {
        const u = FincestemCore.auth.getUser();
        if (u && u.zone) {
          const uN = String(u.nisn || u.identifier || '').trim();
          const uNis = String(u.nis || '').trim();
          if (uN === cleanNisn || uN === paddedNisn || uNis === cleanNisn || (unpaddedNisn && uN === unpaddedNisn)) {
            return u.zone;
          }
        }
      } catch (e) {}

      // 4. Cek master list resmi di memori (Daftar Peserta Excel)
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s => 
          String(s.nisn).trim() === cleanNisn || 
          String(s.nisn).trim() === paddedNisn || 
          String(s.nis).trim() === cleanNisn ||
          (unpaddedNisn && String(s.nisn).trim().replace(/^0+/, '') === unpaddedNisn)
        );
        if (found && found.zone) return found.zone;
      }

      // 5. Cek pengaturan zona kelas
      if (className) {
        const classInfo = this.getClassInfo(className);
        if (classInfo && classInfo.zone) return classInfo.zone;
      }

      return defaultZone || 'FINCESTEM OKU TIMUR';
    },

    isFieldTripStudent: function(nisn, className, defaultZone) {
      const z = this.getStudentZone(nisn, className, defaultZone);
      const zUpper = String(z || '').toUpperCase();
      return zUpper.includes('LUAR') || zUpper.includes('FIELD') || zUpper.includes('TRIP');
    },

    setStudentZone: function(nisn, zone, callback) {
      if (!nisn) {
        if (callback) callback({ success: false, message: 'NISN tidak valid' });
        return;
      }
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const isFT = String(zone || '').toUpperCase().includes('LUAR');

      // 1. Simpan individual key (raw, padded, unpadded)
      try {
        localStorage.setItem('fincestem_student_zone_' + cleanNisn, zone);
        if (paddedNisn) localStorage.setItem('fincestem_student_zone_' + paddedNisn, zone);
        if (unpaddedNisn) localStorage.setItem('fincestem_student_zone_' + unpaddedNisn, zone);
      } catch (e) {}

      // 2. Simpan ke peta sinkronisasi
      try {
        let map = {};
        const mapStr = localStorage.getItem('fincestem_student_zones_map');
        if (mapStr) map = JSON.parse(mapStr);
        map[cleanNisn] = zone;
        if (paddedNisn) map[paddedNisn] = zone;
        if (unpaddedNisn) map[unpaddedNisn] = zone;
        localStorage.setItem('fincestem_student_zones_map', JSON.stringify(map));
      } catch (e) {}

      // 3. Update master list di memori (sinkronkan zone & is_field_trip)
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s =>
          String(s.nisn).trim() === cleanNisn ||
          String(s.nisn).trim() === paddedNisn ||
          String(s.nis).trim() === cleanNisn ||
          (unpaddedNisn && String(s.nisn).trim().replace(/^0+/, '') === unpaddedNisn)
        );
        if (found) {
          found.zone = zone;
          found.is_field_trip = isFT;
        }
      }

      // 4. Update session user jika sedang login sebagai siswa ini
      const u = FincestemCore.auth.getUser();
      if (u && (String(u.nisn).trim() === cleanNisn || String(u.nisn).trim() === paddedNisn || String(u.identifier).trim() === cleanNisn || String(u.nis).trim() === cleanNisn)) {
        u.zone = zone;
        FincestemCore.auth.setUser(u, u.role || 'siswa');
      }

      // 5. Kirim sinkronisasi ke backend MySQL cPanel
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
    },

    isLocationExempt: function(nisn) {
      if (!nisn) return false;
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');

      try {
        const mapStr = localStorage.getItem('fincestem_location_exemptions_map');
        if (mapStr) {
          const map = JSON.parse(mapStr);
          if (map) {
            if (map[cleanNisn] || map[paddedNisn] || (unpaddedNisn && map[unpaddedNisn])) return true;
          }
        }
      } catch (e) {}

      // Fallback check local individual flag
      try {
        if (localStorage.getItem('fincestem_loc_exempt_' + cleanNisn) === '1' ||
            localStorage.getItem('fincestem_loc_exempt_' + paddedNisn) === '1' ||
            (unpaddedNisn && localStorage.getItem('fincestem_loc_exempt_' + unpaddedNisn) === '1')) {
          return true;
        }
      } catch (e) {}

      return false;
    },

    toggleLocationExemption: function(nisn, targetExempt, callback) {
      if (!nisn) return;
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');

      // Update local optimistic immediately
      let map = {};
      try {
        const mapStr = localStorage.getItem('fincestem_location_exemptions_map');
        if (mapStr) map = JSON.parse(mapStr) || {};
      } catch (e) {}

      if (targetExempt) {
        map[cleanNisn] = 1;
        map[paddedNisn] = 1;
        if (unpaddedNisn) map[unpaddedNisn] = 1;
        try { localStorage.setItem('fincestem_loc_exempt_' + cleanNisn, '1'); } catch (e) {}
      } else {
        delete map[cleanNisn];
        delete map[paddedNisn];
        if (unpaddedNisn) delete map[unpaddedNisn];
        try { localStorage.removeItem('fincestem_loc_exempt_' + cleanNisn); } catch (e) {}
      }
      try { localStorage.setItem('fincestem_location_exemptions_map', JSON.stringify(map)); } catch (e) {}

      // Kirim sinkronisasi ke backend cPanel
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'toggle_location_exemption',
            nisn: cleanNisn,
            exempt: targetExempt ? 1 : 0
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res);
        })
        .catch(() => {
          if (callback) callback({ success: true, localOnly: true, is_location_exempt: !!targetExempt });
        });
      } else {
        if (callback) callback({ success: true, localOnly: true, is_location_exempt: !!targetExempt });
      }
    },

    getFTGradingRules: function() {
      try {
        const raw = localStorage.getItem('fincestem_ft_grading_rules');
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      const def = {};
      for (let d = 1; d <= 7; d++) {
        def[d] = { day_number: d, cutoff_perfect: '16:00', cutoff_bintang5: '21:00', cutoff_bintang4: '23:59' };
      }
      return def;
    },

    updateFTGradingRule: function(dayNum, cutoffPerfect, cutoffB5, cutoffB4, applyToAll, callback) {
      cutoffPerfect = cutoffPerfect || '16:00';
      cutoffB5 = cutoffB5 || '21:00';
      cutoffB4 = cutoffB4 || '23:59';
      
      let rules = this.getFTGradingRules();
      if (applyToAll || dayNum === 0) {
        for (let d = 1; d <= 7; d++) {
          rules[d] = { day_number: d, cutoff_perfect: cutoffPerfect, cutoff_bintang5: cutoffB5, cutoff_bintang4: cutoffB4 };
        }
      } else {
        rules[dayNum] = { day_number: dayNum, cutoff_perfect: cutoffPerfect, cutoff_bintang5: cutoffB5, cutoff_bintang4: cutoffB4 };
      }
      try {
        localStorage.setItem('fincestem_ft_grading_rules', JSON.stringify(rules));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update_ft_grading_rules',
            day_number: dayNum,
            cutoff_perfect: cutoffPerfect,
            cutoff_bintang5: cutoffB5,
            cutoff_bintang4: cutoffB4,
            apply_to_all: !!applyToAll
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res.success, res);
        })
        .catch(() => {
          if (callback) callback(true, { success: true });
        });
      } else {
        if (callback) callback(true, { success: true });
      }
    },

    getStudentEmergencyGrading: function(nisn, dayNum) {
      if (!nisn) return null;
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const d = parseInt(dayNum) || 1;

      try {
        const raw = localStorage.getItem('fincestem_emergency_grading');
        if (raw) {
          const map = JSON.parse(raw);
          if (map) {
            const found = map[`${cleanNisn}_${d}`] || map[`${paddedNisn}_${d}`] || (unpaddedNisn && map[`${unpaddedNisn}_${d}`]);
            if (found) return found;
          }
        }
      } catch (e) {}

      try {
        const item = localStorage.getItem(`fincestem_em_grade_${cleanNisn}_${d}`) ||
                     localStorage.getItem(`fincestem_em_grade_${paddedNisn}_${d}`) ||
                     (unpaddedNisn && localStorage.getItem(`fincestem_em_grade_${unpaddedNisn}_${d}`));
        if (item) return JSON.parse(item);
      } catch (e) {}

      return null;
    },

    saveStudentEmergencyGrading: function(nisn, dayNum, score, stars, reason, callback) {
      if (!nisn) return;
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const d = parseInt(dayNum) || 1;
      const sc = parseFloat(score);
      const st = parseInt(stars) || (sc >= 95 ? 5 : 4);
      reason = reason || 'Dispensasi Darurat Lapangan (Kebijakan Admin)';

      const record = {
        nisn: cleanNisn,
        day_number: d,
        score: sc,
        stars: st,
        reason: reason,
        approved_by: 'admin',
        updated_at: new Date().toISOString()
      };

      try {
        let map = {};
        const raw = localStorage.getItem('fincestem_emergency_grading');
        if (raw) map = JSON.parse(raw) || {};
        map[`${cleanNisn}_${d}`] = record;
        map[`${paddedNisn}_${d}`] = record;
        if (unpaddedNisn) map[`${unpaddedNisn}_${d}`] = record;
        localStorage.setItem('fincestem_emergency_grading', JSON.stringify(map));
        localStorage.setItem(`fincestem_em_grade_${cleanNisn}_${d}`, JSON.stringify(record));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'save_student_emergency_grading',
            nisn: cleanNisn,
            day_number: d,
            score: sc,
            stars: st,
            reason: reason,
            approved_by: 'admin'
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res.success, res);
        })
        .catch(() => {
          if (callback) callback(true, { success: true });
        });
      } else {
        if (callback) callback(true, { success: true });
      }
    },

    deleteStudentEmergencyGrading: function(nisn, dayNum, callback) {
      if (!nisn) return;
      const cleanNisn = String(nisn).trim();
      const rawDigits = cleanNisn.replace(/\D/g, '');
      const paddedNisn = (rawDigits.length >= 8 && rawDigits.length <= 10) ? rawDigits.padStart(10, '0') : cleanNisn;
      const unpaddedNisn = rawDigits.replace(/^0+/, '');
      const d = parseInt(dayNum) || 0;

      try {
        let map = {};
        const raw = localStorage.getItem('fincestem_emergency_grading');
        if (raw) map = JSON.parse(raw) || {};
        delete map[`${cleanNisn}_${d}`];
        delete map[`${paddedNisn}_${d}`];
        if (unpaddedNisn) delete map[`${unpaddedNisn}_${d}`];
        localStorage.setItem('fincestem_emergency_grading', JSON.stringify(map));
        localStorage.removeItem(`fincestem_em_grade_${cleanNisn}_${d}`);
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete_student_emergency_grading',
            nisn: cleanNisn,
            day_number: d
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res.success);
        })
        .catch(() => {
          if (callback) callback(true);
        });
      } else {
        if (callback) callback(true);
      }
    }
  },

  // Modul Pemetaan Geografis & Batas Wilayah OKU Timur
  geo: {
    // Poligon batas resmi terluar Kabupaten OKU Timur (Berdasarkan Google Maps & OpenStreetMap Relation)
    OKU_TIMUR_BOUNDARY_POLY: [
      [-4.42092,104.16242],[-4.46848,104.21065],[-4.4968,104.22683],[-4.51646,104.23336],[-4.53622,104.23561],
      [-4.56602,104.23014],[-4.59283,104.24502],[-4.60756,104.27342],[-4.60502,104.30352],[-4.61266,104.33356],
      [-4.58533,104.33117],[-4.55911,104.32482],[-4.53976,104.31528],[-4.51253,104.32074],[-4.49478,104.32946],
      [-4.45881,104.33365],[-4.42503,104.33497],[-4.4059,104.34675],[-4.39146,104.3568],[-4.37371,104.37915],
      [-4.35211,104.38319],[-4.34057,104.39972],[-4.33462,104.41464],[-4.32078,104.4251],[-4.30523,104.43728],
      [-4.30043,104.45569],[-4.31146,104.46912],[-4.29702,104.48109],[-4.29855,104.48981],[-4.29152,104.5015],
      [-4.2801,104.51419],[-4.2456,104.57546],[-4.23038,104.60518],[-4.22017,104.61277],[-4.22357,104.62277],
      [-4.24424,104.62616],[-4.25872,104.6672],[-4.25395,104.72643],[-4.24734,104.74561],[-4.21221,104.75964],
      [-4.19897,104.76429],[-4.18443,104.77146],[-4.17323,104.78119],[-4.16242,104.78381],[-4.14902,104.7895],
      [-4.13441,104.7879],[-4.1222,104.79819],[-4.10894,104.80727],[-4.10727,104.82352],[-4.09452,104.8342],
      [-4.07625,104.82853],[-4.06123,104.83081],[-4.04975,104.84814],[-4.03406,104.85959],[-4.02062,104.87394],
      [-4.01274,104.89135],[-4.00818,104.90788],[-3.99413,104.91559],[-3.97535,104.9248],[-3.95597,104.92521],
      [-3.94512,104.91101],[-3.94293,104.89245],[-3.94139,104.87322],[-3.91255,104.86097],[-3.88783,104.86052],
      [-3.85823,104.87717],[-3.84449,104.87288],[-3.8286,104.87431],[-3.81708,104.87658],[-3.80586,104.87564],
      [-3.79585,104.86979],[-3.78434,104.86077],[-3.7723,104.85282],[-3.75796,104.84083],[-3.73769,104.80112],
      [-3.72937,104.77755],[-3.71747,104.77169],[-3.70425,104.75991],[-3.67963,104.73476],[-3.65755,104.71901],
      [-3.61979,104.69883],[-3.63298,104.68009],[-3.62554,104.67241],[-3.62756,104.65025],[-3.64598,104.65997],
      [-3.65482,104.64991],[-3.69141,104.60747],[-3.71956,104.6203],[-3.74708,104.60049],[-3.77534,104.58172],
      [-3.7931,104.57489],[-3.82642,104.5731],[-3.86352,104.56478],[-3.89403,104.5057],[-3.92955,104.47219],
      [-3.95385,104.46336],[-3.961,104.44296],[-3.98257,104.43156],[-3.98035,104.42206],[-3.97707,104.41434],
      [-3.98482,104.41293],[-3.9853,104.40875],[-3.99833,104.40572],[-4.01076,104.37335],[-4.01837,104.34982],
      [-4.03796,104.34192],[-4.05056,104.34066],[-4.05975,104.33118],[-4.06962,104.31929],[-4.08112,104.30728],
      [-4.0913,104.31654],[-4.10657,104.31554],[-4.12448,104.31858],[-4.14383,104.32505],[-4.16003,104.32587],
      [-4.17267,104.32992],[-4.18358,104.33009],[-4.19829,104.32428],[-4.24216,104.26945],[-4.26055,104.227],
      [-4.27528,104.23133],[-4.28828,104.22633],[-4.30946,104.22448],[-4.3573,104.23329],[-4.38995,104.22243],
      [-4.40084,104.21794],[-4.39837,104.2039],[-4.39604,104.19416],[-4.4063,104.18933],[-4.41053,104.18219],
      [-4.41424,104.17233]
    ],
    // Ray-Casting Algorithm untuk deteksi presisi batas wilayah OKU Timur
    isInsideOKUTimur: function(lat, lng) {
      if (lat === undefined || lat === null || lng === undefined || lng === null) return false;
      lat = parseFloat(lat);
      lng = parseFloat(lng);
      if (isNaN(lat) || isNaN(lng)) return false;
      if (lat < -4.62 || lat > -3.61 || lng < 104.16 || lng > 104.93) return false;
      let inside = false;
      const poly = this.OKU_TIMUR_BOUNDARY_POLY;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1];
        const xj = poly[j][0], yj = poly[j][1];
        const intersect = ((yi > lng) !== (yj > lng)) && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }
  },

  // Modul Pelacakan Progres Pengerjaan Siswa & Evaluasi Fasilitator
  progress: {
    // Fungsi Pembersihan Storage Lokal Siswa (Reset 100% Bersih di Sisi Browser/HP Siswa)
    purgeStudentLocalStorage: function(nisn, options) {
      options = options || {};
      const rawNisn = String(nisn || '').trim();
      const cleanNisn = rawNisn.replace(/[^A-Za-z0-9]/g, '');
      if (!cleanNisn) return;
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = (cleanNisn.length >= 8 && cleanNisn.length <= 10) ? cleanNisn.padStart(10, '0') : cleanNisn;
      const targetDay = (options.target_day !== undefined) ? parseInt(options.target_day) : -1;
      const scope = options.scope || (targetDay === 0 ? 'trial_only' : (targetDay > 0 ? ('day_' + targetDay) : 'all_days'));
      const comp = options.components || {
        materi: true,
        lkpd: true,
        asesmen: true,
        refleksi: true,
        dokumentasi: true,
        foto_profil: (scope !== 'trial_only')
      };

      const idVariations = Array.from(new Set([cleanNisn, unpadded, padded, '0' + unpadded, rawNisn])).filter(Boolean);
      // Tambahkan nomor NIS siswa jika ada di master data Dapodik
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(x => idVariations.some(id => String(x.nisn || x.nis).trim() === id));
        if (found && found.nis) {
          idVariations.push(String(found.nis).trim());
        }
      }
      const days = (targetDay === 0) ? [0] : ((targetDay > 0) ? [targetDay] : [0, 1, 2, 3, 4, 5, 6, 7]);

      try {
        // 1. Bersihkan foto profil jika dipilih
        if (comp.foto_profil && scope !== 'trial_only') {
          idVariations.forEach(id => localStorage.removeItem('fincestem_photo_' + id));
          const u = FincestemCore.auth.getUser();
          if (u && idVariations.some(id => String(u.nisn || u.identifier || '').trim() === id)) {
            u.photo_url = '';
            FincestemCore.auth.setUser(u, u.role || 'siswa');
          }
          if (window.FincestemMasterStudents) {
            const s = window.FincestemMasterStudents.find(x => idVariations.some(id => String(x.nisn || x.nis).trim() === id));
            if (s) s.photo_url = '';
          }
        }

        // 2. Bersihkan kunci spesifik per-hari untuk seluruh variasi ID (termasuk multi-sesi AKPOL, Lawang, Apel, JTP1, Museum, Prambanan)
        days.forEach(d => {
          idVariations.forEach(id => {
            if (comp.materi) {
              localStorage.removeItem(`fincestem_materi_ft_day${d}_` + id);
              localStorage.removeItem(`fincestem_materi_nft_day${d}_` + id);
              localStorage.removeItem(`fincestem_materi_day${d}_` + id);
              localStorage.removeItem(`fincestem_draft_nft_materi_d${d}_` + id);
              if (d === 2) {
                localStorage.removeItem('fincestem_materi_ft_day2_akpol_' + id);
                localStorage.removeItem('fincestem_materi_ft_day2_lawang_' + id);
                localStorage.removeItem('fincestem_materi_ft_day2_lawangsewu_' + id);
                localStorage.removeItem('fincestem_materi_conclusion_ft_day2_akpol_' + id);
                localStorage.removeItem('fincestem_materi_conclusion_ft_day2_lawang_' + id);
              } else if (d === 3) {
                localStorage.removeItem('fincestem_materi_ft_day3_apel_' + id);
                localStorage.removeItem('fincestem_materi_ft_day3_jtp1_' + id);
                localStorage.removeItem('fincestem_materi_ft_day3_museum_' + id);
              } else if (d === 5) {
                localStorage.removeItem('fincestem_materi_ft_day5_prambanan_' + id);
                localStorage.removeItem('fincestem_materi_ft_day5_batik_' + id);
                localStorage.removeItem('fincestem_materi_ft_day5_uny_' + id);
              } else if (d === 6) {
                localStorage.removeItem('fincestem_materi_ft_day6_bakpia_' + id);
                localStorage.removeItem('fincestem_materi_ft_day6_drini_' + id);
              }
            }
            if (comp.lkpd) {
              localStorage.removeItem(`fincestem_lkpd_ft_day${d}_` + id);
              localStorage.removeItem(`fincestem_lkpd_nft_day${d}_` + id);
              localStorage.removeItem(`fincestem_lkpd_day${d}_` + id);
              localStorage.removeItem(`fincestem_draft_nft_lkpd_d${d}_` + id);
              if (d === 2) {
                localStorage.removeItem('fincestem_lkpd_ft_day2_akpol_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day2_lawang_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day2_lawangsewu_' + id);
                localStorage.removeItem('fincestem_lkpd_akpol_saved_' + id);
                localStorage.removeItem('fincestem_lkpd_lawang_saved_' + id);
              } else if (d === 3) {
                localStorage.removeItem('fincestem_lkpd_ft_day3_apel_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day3_jtp1_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day3_museum_' + id);
                localStorage.removeItem('fincestem_lkpd_hari3_' + id);
              } else if (d === 5) {
                localStorage.removeItem('fincestem_lkpd_ft_day5_prambanan_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day5_batik_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day5_uny_' + id);
              } else if (d === 6) {
                localStorage.removeItem('fincestem_lkpd_ft_day6_bakpia_' + id);
                localStorage.removeItem('fincestem_lkpd_ft_day6_drini_' + id);
              }
            }
            if (comp.asesmen) {
              localStorage.removeItem(`fincestem_asesmen_ft_day${d}_` + id);
              localStorage.removeItem(`fincestem_asesmen_nft_day${d}_` + id);
              localStorage.removeItem(`fincestem_asesmen_day${d}_` + id);
              localStorage.removeItem(`fincestem_draft_nft_asesmen_d${d}_` + id);
              localStorage.removeItem(`fincestem_pkg_nft_asesmen_v2_d${d}_` + id);
              localStorage.removeItem(`fincestem_pkg_nft_asesmen_d${d}_` + id);
            }
            if (comp.dokumentasi) {
              localStorage.removeItem(`fincestem_dok_ft_day${d}_` + id);
              localStorage.removeItem(`fincestem_dok_nft_day${d}_` + id);
              localStorage.removeItem(`fincestem_dok_day${d}_` + id);
              if (d === 2) {
                localStorage.removeItem('fincestem_dok_ft_day2_akpol_' + id);
                localStorage.removeItem('fincestem_dok_ft_day2_lawang_' + id);
              } else if (d === 3) {
                localStorage.removeItem('fincestem_dok_ft_day3_apel_' + id);
                localStorage.removeItem('fincestem_dok_ft_day3_jtp1_' + id);
                localStorage.removeItem('fincestem_dok_ft_day3_museum_' + id);
              } else if (d === 5) {
                localStorage.removeItem('fincestem_dok_ft_day5_prambanan_' + id);
                localStorage.removeItem('fincestem_dok_ft_day5_batik_' + id);
              }
            }
            if (comp.refleksi) {
              localStorage.removeItem(`fincestem_refleksi_ft_day${d}_` + id);
              localStorage.removeItem(`fincestem_refleksi_nft_day${d}_` + id);
              localStorage.removeItem(`fincestem_refleksi_day${d}_` + id);
              localStorage.removeItem(`fincestem_refl_ft_day${d}_` + id);
              if (d === 3) {
                localStorage.removeItem('fincestem_refleksi_ft_d3_sesi2_' + id);
                localStorage.removeItem('fincestem_refleksi_ft_d3_sesi3_' + id);
              } else if (d === 5) {
                localStorage.removeItem('fincestem_refleksi_ft_day5_prambanan_' + id);
              }
            }
          });
        });

        // 3. Bersihkan kunci umum LKPD & cache sensor geotag / emergency grading
        if (comp.lkpd && targetDay <= 0) {
          idVariations.forEach(id => localStorage.removeItem('fincestem_lkpd_' + id));
        }
        idVariations.forEach(id => {
          localStorage.removeItem('fincestem_geo_' + id);
          localStorage.removeItem('fincestem_geo_v14_' + id);
          localStorage.removeItem('fincestem_em_grade_' + id);
        });

        // 4. Scanning dinamis seluruh localStorage untuk kunci yang berhubungan dengan siswa ini
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (!k) continue;

          // Cek apakah kunci mengandung salah satu variasi id siswa
          const matchesStudent = idVariations.some(id => id.length >= 4 && k.includes(id));
          if (!matchesStudent) continue;

          // Lindungi kunci kredensial aktif jika siswa sedang login
          if (k === 'fincestem_user' || k === 'fincestem_auth') continue;

          let keyType = null;
          if (k.includes('materi')) keyType = 'materi';
          else if (k.includes('lkpd')) keyType = 'lkpd';
          else if (k.includes('asesmen')) keyType = 'asesmen';
          else if (k.includes('refleksi') || k.includes('refl')) keyType = 'refleksi';
          else if (k.includes('dok')) keyType = 'dokumentasi';
          else if (k.includes('photo')) keyType = 'foto_profil';

          if (!keyType || !comp[keyType]) continue;

          if (targetDay >= 0) {
            const m = k.match(/(?:day|d|hari)(\d+)/i);
            if (m && parseInt(m[1]) !== targetDay) {
              continue;
            }
          }

          localStorage.removeItem(k);
        }

        // 5. Bersihkan entri dokumentasi, LKPD, dan groups di fincestem_db_2026_v1
        const storedDb = localStorage.getItem('fincestem_db_2026_v1');
        if (storedDb) {
          try {
            const db = JSON.parse(storedDb);
            if (comp.dokumentasi && Array.isArray(db.documentation)) {
              db.documentation = db.documentation.filter(d => {
                const dNisn = String(d.nisn || d.author_nisn || d.uploaded_by || '').trim();
                const isStudent = idVariations.some(id => dNisn === id || String(d.author || '').toLowerCase().includes(id.toLowerCase()));
                if (!isStudent) return true;
                if (targetDay > 0) return !(d.day == targetDay || d.day_number == targetDay);
                return false;
              });
            }
            if (comp.lkpd && Array.isArray(db.lkpd)) {
              db.lkpd = db.lkpd.filter(d => {
                const dNisn = String(d.nisn || d.author_nisn || '').trim();
                const isStudent = idVariations.some(id => dNisn === id);
                if (!isStudent) return true;
                if (targetDay > 0) return !(d.day == targetDay || d.day_number == targetDay);
                return false;
              });
            }
            if (comp.lkpd && Array.isArray(db.groups)) {
              db.groups.forEach(g => {
                if (g.answers) {
                  g.answers = {};
                  g.lkpdSubmitted = false;
                  g.status = 'Belum Mengumpulkan';
                  delete g.scores;
                  delete g.isGraded;
                  delete g.feedback;
                }
              });
            }
            localStorage.setItem('fincestem_db_2026_v1', JSON.stringify(db));
          } catch (eDb) {}
        }

        // 6. Reset atau sesuaikan fincestem_progress_<nisn>
        idVariations.forEach(id => {
          const progKey = 'fincestem_progress_' + id;
          if (targetDay < 0 && scope === 'all_days') {
            localStorage.removeItem(progKey);
          } else {
            const storedProg = localStorage.getItem(progKey);
            if (storedProg) {
              try {
                const p = JSON.parse(storedProg);
                if (p && p.task_map) {
                  const hasAnyCompReset = !!(comp.materi || comp.lkpd || comp.asesmen || comp.refleksi || comp.dokumentasi);
                  Object.keys(p.task_map).forEach(tk => {
                    const parts = tk.split('_');
                    const d = parseInt(parts[0]);
                    const type = parts.slice(1).join('_');
                    if (targetDay < 0 || targetDay === d) {
                      if (comp[type] || (type === 'general' && hasAnyCompReset)) {
                        delete p.task_map[tk];
                      }
                    }
                  });
                  if (Array.isArray(p.records)) {
                    p.records = p.records.filter(r => {
                      const d = parseInt(r.day_number);
                      const type = String(r.task_type || '');
                      if (targetDay >= 0 && d !== targetDay) return true;
                      if (comp[type] || (type === 'general' && hasAnyCompReset)) return false;
                      return true;
                    });
                  }
                  let daysSet = new Set();
                  for (let dCheck = 1; dCheck <= 7; dCheck++) {
                    const hasAll5 = p.task_map[dCheck + '_materi'] && p.task_map[dCheck + '_lkpd'] && p.task_map[dCheck + '_asesmen'] && p.task_map[dCheck + '_dokumentasi'] && p.task_map[dCheck + '_refleksi'];
                    const hasGenComp = p.task_map[dCheck + '_general'] && p.task_map[dCheck + '_general'].status === 'completed';
                    if (hasAll5 || hasGenComp) daysSet.add(dCheck);
                  }
                  p.completed_days = daysSet.size;
                  p.percentage = Math.min(100, Math.round((p.completed_days / 7) * 100));
                  localStorage.setItem(progKey, JSON.stringify(p));
                }
              } catch (ePr) {}
            }
          }
        });

        if (typeof window !== 'undefined') {
          if (window.currentStudentProgress && idVariations.some(id => String(window.currentStudentProgress.nisn || '').includes(id))) {
            window.currentStudentProgress = null;
          }
        }
      } catch (e) {
        console.warn('purgeStudentLocalStorage error:', e);
      }
    },

    hydrateLocalStorageFromProgress: function(nisn, data) {
      if (!nisn || !data) return;
      try {
        const cleanNisn = String(nisn || '').replace(/[^A-Za-z0-9]/g, '');
        const unpadded = cleanNisn.replace(/^0+/, '');
        const padded = (cleanNisn.length >= 8 && cleanNisn.length <= 10) ? cleanNisn.padStart(10, '0') : cleanNisn;
        const idVars = Array.from(new Set([cleanNisn, unpadded, padded, nisn])).filter(Boolean);

        const taskMap = data.task_map || {};
        const records = Array.isArray(data.records) ? data.records : [];
        let currentStudentName = 'Peserta Non-Field Trip';
        try {
          const uRaw = localStorage.getItem('fincestem_user');
          if (uRaw) {
            const uObj = JSON.parse(uRaw);
            if (uObj && uObj.name) currentStudentName = uObj.name;
          }
        } catch(e) {}

        const parseContent = function(raw) {
          if (!raw) return null;
          if (typeof raw === 'object') return raw;
          if (typeof raw === 'string') {
            const trimmed = raw.trim();
            if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
              try { return JSON.parse(trimmed); } catch (e) {}
            }
            return trimmed;
          }
          return raw;
        };

        const writeLocal = function(prefix, val) {
          if (val === undefined || val === null) return;
          const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
          idVars.forEach(id => {
            try {
              localStorage.setItem(prefix + id, str);
            } catch (e) {}
          });
        };

        const allTasks = Object.assign({}, taskMap);
        records.forEach(r => {
          if (r && r.day_number && r.task_type) {
            const key = r.day_number + '_' + r.task_type;
            if (!allTasks[key]) allTasks[key] = r;
          }
        });

        const extractTopicText = function(str, label) {
          if (!str || typeof str !== 'string') return '';
          const reg = new RegExp('(?:•\\s*)?' + label + ':\\s*([\\s\\S]*?)(?=(?:\\n•|\\n\\n|$))', 'i');
          const m = str.match(reg);
          if (m && m[1]) return m[1].trim().replace(/\\.\\.\\.$/, '');
          return '';
        };

        const buildRichDayMateriCards = function(day, baseA, baseB, baseC, baseD, baseE) {
          const clean = (t) => String(t || '').trim().replace(/\.\.\.$/, '');
          const tA = clean(baseA);
          const tB = clean(baseB);
          const tC = clean(baseC);
          const tD = clean(baseD);
          const tE = clean(baseE);

          day = parseInt(day) || 1;

          if (day === 2) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Masyarakat Kabupaten OKU Timur mewarisi kekayaan tujuh unsur kebudayaan universal yang mencakup bahasa daerah Komering dan Jawa, sistem kekerabatan patrilineal dan matrilokal, kesenian daerah, sistem teknologi alsintan, mata pencaharian agrikultur, religi, serta sistem pengetahuan lokal perbintangan pranata mangsa dalam menyelaraskan kalender musim tanam padi.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Kearifan budaya gotong royong sambatan dan sinoman sangat mengakar dalam pola kerja sektor ekonomi dan UMKM di OKU Timur. Solidaritas sosial ini mereduksi biaya tenaga kerja saat masa tanam dan panen, membangun ikatan kepercayaan antar-pelaku usaha mikro, serta menumbuhkan ekosistem ekonomi berbasis komunitas yang tangguh terhadap krisis.');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Sektor agrikultur tanaman padi sawah menjadi tulang punggung perekonomian utama masyarakat OKU Timur. Keberadaan jaringan irigasi primer dan sekunder dari Danau Ranau memungkinkan petani melakukan pola rotasi tanam intensif IP-200 hingga IP-300 per tahun, sekaligus menggerakkan sektor turunan seperti pakan ternak dan penggilingan gabah.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Evolusi teknologi pertanian di OKU Timur berkembang pesat dari peralatan tradisional cangkul dan bajak singkal ditarik kerbau menuju modernisasi alsintan seperti traktor roda empat, transplanter penanam bibit, dan combine harvester perontok gabah. Mekanisasi ini didukung oleh pemeliharaan berkala saluran irigasi teknis Belitang.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Inovasi budidaya penanaman ramah lingkungan, pemupukan organik presisi, dan otomatisasi mesin pengering gabah (bed dryer) menjadi fokus utama peningkatan keterampilan teknis petani OKU Timur guna meminimalkan susut panen (losses), meningkatkan rendemen giling, dan menjaga mutu beras premium di pasar regional.');

            return {
              cardA: { title: 'Hakikat Budaya & 7 Unsur Universal OKU Timur', text: expA, source: '1. Buku Antropologi & Kebudayaan Nusantara SMA Kelas X.\n2. Kajian Budaya Lokal Komering, Disdikbud OKU Timur.' },
              cardB: { title: 'Hubungan Budaya dengan Ekonomi & UMKM', text: expB, source: '1. Jurnal Sosiologi Ekonomi Pedesaan Sumatera Selatan.\n2. Modul Kewirausahaan Berbasis Kearifan Lokal.' },
              cardC: { title: 'Sistem Mata Pencaharian Sektor Agrikultur', text: expC, source: '1. Dinas Pertanian & Ketahanan Pangan Kab. OKU Timur.\n2. BPS OKU Timur Dalam Angka.' },
              cardD: { title: 'Sistem Teknologi Alsintan & Jaringan Irigasi', text: expD, source: '1. Balai Besar Wilayah Sungai Sumatera VIII (Irigasi Komering).\n2. Pedoman Mekanisasi Pertanian Kementan RI.' },
              cardE: { title: 'Inovasi Penanaman, Pascapanen & Keterampilan', text: expE, source: '1. Riset Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel.\n2. Petunjuk Teknis Pascapanen Padi Modern.' }
            };
          }

          if (day === 3) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Varietas padi unggul seperti Inpari 32 dan Ciherang menjadi pilihan utama petani OKU Timur karena memiliki potensi hasil panen tinggi dan daya tahan kuat terhadap serangan hama wereng serta penyakit hawar daun. Penerapan kalender tanam serentak sangat krusial guna memutus rantai siklus organisme pengganggu tanaman.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Kilang penggilingan beras modern (RMU) di Belitang memanfaatkan kombinasi mesin husker pemecah kulit gabah, separator pemisah gabah hampa, dan mesin polisher penyosoh bertingkat. Teknologi ini mampu meminimalkan butir patah (broken rice) dan menghasilkan beras premium dengan derajat sosoh mencapai 95-100%.');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Penggunaan mesin pengering mekanis sistem bed dryer berkapasitas besar mampu menurunkan kadar air gabah secara homogen dari 22-25% saat panen menjadi 14% standar giling tanpa bergantung cuaca. Ini mencegah tumbuhnya jamur aflatoksin dan menekan susut bobot pascapanen gabah secara drastis dibanding jemur terpal.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Kalkulasi rendemen giling gabah kering panen (GKP) menjadi beras rata-rata berkisar 60-65% dengan residu 20% sekam dan 10% bekatul. Pengusaha RMU memperhitungkan biaya bahan bakar pengeringan, listrik motor penggerak, dan upah operator guna menentukan harga beli gabah petani serta margin keuntungan per kilogram beras kemasan.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Limbah sekam padi dari proses penggilingan diolah menjadi arang sekam sebagai pembenah tanah organik kaya silika, bahan bakar biomassa burner pengering gabah, serta bahan baku briket energi terbarukan. Pemanfaatan limbah ini menciptakan nilai tambah ekonomi sirkular sekaligus mencegah pencemaran lingkungan sentra RMU.');

            return {
              cardA: { title: 'Karakteristik Varietas Padi Unggulan & Musim Tanam', text: expA, source: '1. Panduan Budidaya Padi Sawah, Balai Pengkajian Teknologi Pertanian (BPTP) Sumsel.\n2. Dinas Pertanian Kab. OKU Timur: Data Produktivitas Varietas Padi.' },
              cardB: { title: 'Teknologi Kilang Penggilingan Beras Modern (RMU)', text: expB, source: '1. Pedoman Teknis Standardisasi Kilang Padi Modern, Kementerian Pertanian RI.\n2. Jurnal Teknologi Industri Pertanian: Efisiensi RMU Sentra Belitang.' },
              cardC: { title: 'Pengeringan Mekanis (Bed Dryer) vs Penjemuran Konvensional', text: expC, source: '1. Petunjuk Operasional Mesin Pengering Gabah, Balai Besar Alsintan Kementan.\n2. Riset Pascapanen Tanaman Pangan: Analisis Mutu Gabah Kering Giling (GKG).' },
              cardD: { title: 'Perhitungan Rendemen Giling & Biaya Operasional RMU', text: expD, source: '1. Analisis Kelayakan Finansial Kilang Padi, Jurnal Manajemen Agribisnis.\n2. Pedoman Penetapan HPP Beras & Gabah Badan Pangan Nasional (Bapanas).' },
              cardE: { title: 'Pemanfaatan Limbah Biomassa Sekam & Hilirisasi Turunan', text: expE, source: '1. Pemanfaatan Biomassa Pertanian untuk Energi Terbarukan, Kementerian ESDM.\n2. Panduan Pembuatan Pupuk Organik & Arang Sekam, Ditjen PSP Kementan.' }
            };
          }

          if (day === 4) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Kabupaten OKU Timur memiliki keragaman produk pangan lokal unggulan berbasis beras, singkong, pisang, dan ikan air tawar seperti sale patin, keripik pisang tanduk, lempok, dan dodol tape. Pemetaan klaster UMKM pangan olahan membantu penguatan identitas kuliner daerah dan memperluas daya serap bahan baku lokal petani.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Kelayakan produk UMKM pangan mensyaratkan kepatuhan terhadap prinsip Cara Produksi Pangan Industri Rumah Tangga yang Baik (CPPB-IRT), kepemilikan sertifikat izin edar P-IRT dari Dinas Kesehatan, serta sertifikasi halal resmi dari BPJPH Kementerian Agama guna menjamin keamanan konsumsi dan memperluas kepercayaan konsumen pasar ritel modern.');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Rantai pasok produk pangan OKU Timur menghubungkan petani produsen, pengepul desa, penggilingan, industri pengolahan, hingga distributor grosir dan ritel. Kelancaran konektivitas jalan poros Belitang-Martapura serta efisiensi manajemen armada angkut menjadi penentu kestabilan harga dan keutuhan kualitas pasokan komoditas pangan daerah.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Penetapan Harga Pokok Penjualan (HPP) produk olahan UMKM dihitung secara teliti dengan menjumlahkan biaya bahan baku langsung, biaya tenaga kerja produksi, biaya kemasan, dan overhead pabrik. Margin keuntungan ditargetkan 20-35% dengan mempertimbangkan daya beli target pasar dan persaingan harga produk sejenis di pasar lokal.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Strategi pemasaran terpadu (omnichannel) menggabungkan display penjualan fisik di pasar-pasar rakyat Gumawang, Belitang, dan Martapura dengan etalase digital melalui e-commerce, media sosial TikTok/Instagram, dan marketplace lokal. Pemanfaatan konten storytelling kearifan pangan lokal terbukti melipatgandakan jangkauan pesanan hingga luar provinsi.');

            return {
              cardA: { title: 'Pemetaan Komoditas Pangan Lokal & Olahan Khas', text: expA, source: '1. Direktori UMKM Pangan Lokal Kabupaten OKU Timur, Dinas Koperasi & UKM.\n2. Profil Potensi Kuliner dan Olahan Hasil Tani Sumatera Selatan.' },
              cardB: { title: 'Standardisasi Higienitas, Uji Mutu & Izin Edar P-IRT Halal', text: expB, source: '1. Peraturan BPOM tentang Pedoman Penerbitan Sertifikat Produksi PIRT.\n2. Standar Halal Indonesia, Badan Penyelenggara Jaminan Produk Halal (BPJPH).' },
              cardC: { title: 'Rantai Pasok (Supply Chain) & Logistik Agribisnis', text: expC, source: '1. Cetak Biru Logistik Nasional Sektor Agribisnis, Bappenas RI.\n2. Jurnal Logistik & Rantai Pasok Pedesaan Sumatera Bagian Selatan.' },
              cardD: { title: 'Penetapan Biaya Produksi, HPP & Margin UMKM', text: expD, source: '1. Modul Akuntansi Sederhana dan Penetapan Biaya untuk UMKM, Kemenkop UKM.\n2. Buku Analisis Finansial Usaha Mikro Kecil, BNI Entrepreneur Center.' },
              cardE: { title: 'Pemasaran Omnichannel Fisik & Digital E-Commerce', text: expE, source: '1. Panduan Transformasi Digital UMKM Pangan, Kementerian Kominfo RI.\n2. Studi Pemasaran Omnichannel Produk Lokal, Pusat Kajian Ekonomi Kreatif.' }
            };
          }

          if (day === 5) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Implementasi Quick Response Code Indonesian Standard (QRIS) di sentra perdagangan Belitang dan Martapura telah memfasilitasi transaksi non-tunai yang cepat, higienis, dan tercatat otomatis. Merchant UMKM mendapatkan kemudahan rekonsiliasi kas harian, mengurangi risiko peredaran uang palsu, dan membangun riwayat transaksi yang bankable.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Layanan Keuangan Tanpa Kantor dalam Rangka Keuangan Inklusif (Laku Pandai) melalui agen-agen perbankan seperti BRILink, BNI Agen46, dan Mandiri Agen menjangkau pelosok desa di OKU Timur yang jauh dari kantor cabang bank. Keberadaan agen ini mempermudah setoran tunai, transfer hasil panen petani, serta pembayaran tagihan listrik secara instan di tingkat RT/RW.');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Edukasi risiko pembiayaan keuangan sangat penting untuk melindungi masyarakat petani dan pelaku UMKM dari jeratan pinjaman online (pinjol) ilegal serta rentenir desa yang membebankan bunga harian mencekik. Pemahaman mengenai ciri legalitas fintek terdaftar OJK dan simulasi kemampuan bayar angsuran mencegah terjadinya gagal bayar dan penyitaan aset produksi.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Pemanfaatan aplikasi pencatatan keuangan digital berbasis smartphone (seperti BukuKas, BukuWarung, atau SIAPIK BI) mempermudah pelaku usaha tani mencatat transaksi piutang gabah, pengeluaran pupuk, dan laba operasional secara real-time. Laporan laba rugi yang rapi menjadi syarat utama saat mengajukan Kredit Usaha Rakyat (KUR) berbunga rendah ke perbankan.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Literasi keamanan digital mencakup disiplin menjaga kerahasiaan nomor PIN, Password, kode OTP (One-Time Password), serta nomor CVV kartu debit. Siswa dan masyarakat diedukasi untuk mengenali modus penipuan online phising rekayasa sosial, tidak sembarangan mengunduh file APK mencurigakan, dan rutin mengganti kode akses perbankan digital.');

            return {
              cardA: { title: 'Kajian Sistem Pembayaran Digital & QRIS Daerah', text: expA, source: '1. Panduan Implementasi QRIS untuk Merchant UMKM, Bank Indonesia.\n2. Publikasi Blueprint Sistem Pembayaran Indonesia 2025, Bank Indonesia.' },
              cardB: { title: 'Jaringan Keuangan Inklusif & Agen Laku Pandai Pedesaan', text: expB, source: '1. Regulasi OJK tentang Layanan Keuangan Tanpa Kantor (Laku Pandai).\n2. Statistik Perkembangan Jaringan Agen Laku Pandai Pedesaan, OJK Regional 7.' },
              cardC: { title: 'Analisis Profil Risiko Finansial & Bahaya Pinjol Ilegal', text: expC, source: '1. Siaran Pers Satgas Pemberantasan Aktivitas Keuangan Ilegal (Satgas PASTI), OJK.\n2. Buku Pedoman Cerdas Mengelola Utang & Menghindari Pinjol Ilegal, OJK RI.' },
              cardD: { title: 'Aplikasi Pembukuan Kas Digital Berbasis Smartphone', text: expD, source: '1. Petunjuk Penggunaan Aplikasi SIAPIK, Bank Indonesia.\n2. Modul Pelatihan Akuntansi Digital untuk Petani Milenial.' },
              cardE: { title: 'Literasi Keamanan Siber Perbankan & Perlindungan Data', text: expE, source: '1. Surat Edaran BSSN tentang Panduan Keamanan Transaksi Finansial Digital.\n2. Undang-Undang RI Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.' }
            };
          }

          if (day === 6) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Sistem saluran irigasi teknis Belitang yang terhubung dengan Bendung Perjaya dan Danau Ranau merupakan aset vital ketahanan pangan OKU Timur. Konservasi sempadan saluran, pembersihan endapan sedimen lumpur berkala, serta larangan pembuangan limbah domestik dan pestisida ke saluran primer wajib dijaga demi menjamin suplai debit air bersih yang merata hingga petak sawah tersier.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Pertanian ramah lingkungan memprioritaskan reduksi ketergantungan pupuk kimia sintetis berlebih melalui substitusi pupuk organik padat dan cair, kompos jerami sawah, serta pestisida nabati berbasis tanaman lokal. Praktik ini memulihkan kesuburan mikroba tanah sawah, mencegah degradasi pH tanah gambut/aluvial, dan menjaga kualitas kesehatan ekosistem persawahan Belitang.');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Masyarakat agraris Belitang mewarisi nilai-nilai kearifan lokal dalam menjaga keharmonisan tanah dan air melalui tradisi sedekah bumi, doa bersama jelang buka pintu air tanam, serta aturan adat tentang pemeliharaan sumber mata air dan pepohonan peneduh saluran irigasi. Nilai-nilai budaya ini menguatkan tanggung jawab kolektif menjaga keberlanjutan daya dukung lingkungan hidup.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Perubahan iklim global memicu anomali cuaca ekstrem berupa kekeringan El Nino dan banjir bandang La Nina yang mengancam siklus tanam padi OKU Timur. Strategi mitigasi mencakup penyesuaian jadwal kalender tanam dinamis berbasis citra satelit BMKG, penggunaan benih toleran kekeringan/rendaman, serta pembangunan embung tampungan air desa.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Siswa kokurikuler merancang program aksi nyata pelestarian lingkungan di lingkungan madrasah/sekolah dan tempat tinggal, seperti gerakan hemat air, pemilahan sampah organik untuk kompos sekolah, penanaman pohon buah penyerap emisi karbon, serta kampanye edukasi anti-buang makanan (food waste) guna mendukung ketahanan pangan lestari.');

            return {
              cardA: { title: 'Kelestarian Ekosistem Irigasi & Konservasi Air Komering', text: expA, source: '1. BBWS Sumatera VIII: Pengelolaan DAS Komering.\n2. Modul Konservasi Sumber Daya Air Pertanian Berkelanjutan.' },
              cardB: { title: 'Pertanian Ramah Lingkungan & Manajemen Limbah Kimia', text: expB, source: '1. Pedoman Pengendalian Hama Terpadu (PHT), Ditjen Perlindungan Tanaman Kementan.\n2. Petunjuk Pembuatan Pupuk Hayati & Pestisida Nabati, BPTP.' },
              cardC: { title: 'Kearifan Ekologis Budaya Belitang & Keserasian Alam', text: expC, source: '1. Kajian Kearifan Lokal OKU Timur, Balai Pelestarian Nilai Budaya.\n2. Jurnal Ekologi Budaya dan Pembangunan Berkelanjutan Sumsel.' },
              cardD: { title: 'Mitigasi Perubahan Iklim & Antisipasi Hidrometeorologi', text: expD, source: '1. Dinamika Atmosfer dan Kalender Tanam Dinamis, BMKG & Balitbangtan.\n2. Rencana Aksi Adaptasi Iklim Sektor Pertanian, Kementan RI.' },
              cardE: { title: 'Rancangan Aksi Siswa Peduli Lingkungan & Ketahanan Pangan', text: expE, source: '1. Panduan Sekolah Adiwiyata & Gerakan Peduli Lingkungan, KLHK & Kemendikbud.\n2. Standar Proyek Penguatan Profil Pelajar Pancasila.' }
            };
          }

          if (day === 7) {
            const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Kajian sintesis komprehensif mengintegrasikan seluruh pengalaman riset mandiri 7 hari: Pilar Financial (tata kelola kas dan perbankan digital), Industry (modernisasi kilang padi dan rantai pasok UMKM), Culture (kearifan lokal gotong royong dan kesenian Komering), serta Environment & STEM (teknologi irigasi, efisiensi energi, dan konservasi alam OKU Timur) sebagai satu kesatuan pengetahuan yang utuh.');
            const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Refleksi mendalam terhadap transformasi diri selama pelaksanaan kegiatan non-field trip mencakup penguatan dimensi Beriman dan Bertakwa kepada Tuhan YME (mensyukuri karunia alam OKU Timur), Mandiri (disiplin riset tanpa pengawasan langsung), Bernalar Kritis (menguji data lapangan), Gotong Royong (bekerja sama dengan fasilitator), serta Kreatif (merumuskan solusi inovatif).');
            const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Penyusunan proposal rencana aksi nyata yang aplikatif bagi kemajuan wilayah Belitang dan Kabupaten OKU Timur, seperti pendirian kelompok usaha rintisan pemuda desa, digitalisasi promosi produk unggulan pertanian lokal, atau kampanye literasi keuangan cerdas bagi rekan sebaya di sekolah dan lingkungan karang taruna.');
            const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Pemeriksaan kompilasi seluruh data luaran riset mandiri: kelengkapan 5 modul belajar digital (35 kartu riset), pengisian lembar kerja investigasi LKPD, sertifikat skor asesmen kompetensi harian, serta konfirmasi persetujuan catatan pembimbingan dari Fasilitator Pembina SMAN 1 Belitang sebagai syarat penilaian rapot kokurikuler resmi.');
            const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Portofolio hasil riset mandiri tujuh hari ditata sebagai dokumen akademik resmi yang menghimpun seluruh lembar kerja lapangan terverifikasi, sintesis modul kajian, hasil penilaian asesmen digital, serta bukti foto dokumentasi lapangan. Dokumen ini menjadi portofolio portofolio autentik yang membuktikan pencapaian kompetensi holistik siswa dalam kurikulum kokurikuler FINCESTEM 2026.');

            return {
              cardA: { title: 'Evaluasi Sintesis Integratif 4 Pilar FINCESTEM', text: expA, source: '1. Kerangka Kurikulum Kokurikuler FINCESTEM 2026, SMAN 1 Belitang.\n2. Naskah Akademik Pendekatan STEM Terpadu Berbasis Kearifan Lokal.' },
              cardB: { title: 'Refleksi Diri, Karakter & Profil Pelajar Pancasila', text: expB, source: '1. Panduan Karakter Profil Pelajar Pancasila, BSKAP Kemendikbudristek.\n2. Pedoman Refleksi Pembelajaran Berdiferensiasi, Ditjen GTK.' },
              cardC: { title: 'Penyusunan Rencana Aksi Nyata Kemajuan Daerah', text: expC, source: '1. Pedoman Perencanaan Pembangunan Pemuda, Bappeda Litbang OKU Timur.\n2. Panduan Inkubasi Kewirausahaan Muda Berbasis Potensi Lokal, Kemenpora.' },
              cardD: { title: 'Kompilasi Data Luaran, Validasi Fasil & Evaluasi', text: expD, source: '1. Buku Panduan Penilaian dan Asesmen Kokurikuler FINCESTEM 2026.\n2. Standar Operasional Prosedur Verifikasi Dokumen Pembelajaran.' },
              cardE: { title: 'Penataan Portofolio Hasil Riset Mandiri 7 Hari', text: expE, source: '1. Petunjuk Teknis Penilaian Portofolio Kokurikuler SMAN 1 Belitang.\n2. Standar Penilaian Pendidikan Berbasis Portofolio, BSKAP Kemendikbudristek.' }
            };
          }

          // Default Day 1
          const expA = (tA.length >= 300) ? tA : ((tA ? tA + '. ' : '') + 'Kajian mendalam mengenai kegiatan ekonomi menegaskan keterkaitan organik antara sektor primer (pertanian, peternakan, perikanan sebagai penyedia bahan mentah), sektor sekunder (industri olahan dan manufaktur yang meningkatkan nilai tambah komoditas), serta sektor tersier (jaringan distribusi, perdagangan, dan perbankan yang menghubungkan produsen dengan konsumen secara berkelanjutan di Kabupaten OKU Timur).');
          const expB = (tB.length >= 300) ? tB : ((tB ? tB + '. ' : '') + 'Literasi finansial mencakup pemahaman komprehensif terhadap 5 pilar tata kelola arus kas: pencatatan berkala seluruh transaksi masuk dan keluar, disiplin memisahkan rekening operasional usaha dari kas konsumsi pribadi, pembentukan dana darurat minimal 3 bulan beban tetap, pemilihan instrumen pembiayaan produktif formal, serta mitigasi risiko terhadap skema pinjaman informal yang merugikan.');
          const expC = (tC.length >= 300) ? tC : ((tC ? tC + '. ' : '') + 'Bank Indonesia menjalankan fungsi strategis dalam memelihara stabilitas nilai tukar rupiah dan mengawal kelancaran sistem pembayaran nasional. Integrasi instrumen nontunai modern seperti QRIS dan BI-FAST terbukti mempercepat perputaran ekonomi lokal, menekan biaya administrasi transaksi perbankan, serta memperluas inklusi keuangan bagi pelaku UMKM di pasar-pasar rakyat OKU Timur.');
          const expD = (tD.length >= 300) ? tD : ((tD ? tD + '. ' : '') + 'Berdasarkan Undang-Undang No. 25 Tahun 1992, Koperasi merupakan pilar utama ekonomi kerakyatan yang berasaskan kekeluargaan dan gotong royong. Di sentra agrikultur OKU Timur, KUD dan BUMDes memegang peran vital dalam menjamin ketersediaan benih dan pupuk subsidi, memfasilitasi permodalan anggota tanpa bunga tinggi, serta melindungi harga jual gabah petani dari tekanan tengkulak.');
          const expE = (tE.length >= 300) ? tE : ((tE ? tE + '. ' : '') + 'Sebagai lumbung pangan strategis Sumatera Selatan dengan keunggulan jaringan irigasi Komering, Kabupaten OKU Timur memiliki potensi ekonomi luar biasa di sektor tanaman pangan padi sawah, perkebunan karet, sawit, dan budidaya ikan air tawar. Transformasi hilirisasi pascapanen dan digitalisasi rantai pasok UMKM di sentra Belitang membuka prospek kewirausahaan agribisnis masa depan yang sangat menjanjikan.');

          return {
            cardA: { title: 'Kegiatan Ekonomi & 3 Sektor Aktivitas', text: expA, source: '1. Buku Teks Ekonomi SMA Kelas X Kurikulum Merdeka (Kemdikbudristek 2023), Bab 1 Hal. 24-28.\n2. Modul Pengantar Teori Ekonomi Mikro Daerah.' },
            cardB: { title: 'Literasi dan Pengelolaan Keuangan (Financial Literacy)', text: expB, source: '1. Buku Panduan Literasi Keuangan Tingkat Menengah, OJK RI.\n2. Modul Manajemen Keuangan Keluarga & UMKM.' },
            cardC: { title: 'Kebanksentralan & Bank Indonesia', text: expC, source: '1. Publikasi Bank Indonesia: Peran Bank Sentral & Kebijakan Moneter.\n2. Buku Siswa Ekonomi SMA Kelas X Kemendikbud.' },
            cardD: { title: 'Badan Usaha & Koperasi', text: expD, source: '1. Undang-Undang Republik Indonesia Nomor 25 Tahun 1992 tentang Perkoperasian.\n2. Modul Kemenkop UKM RI.' },
            cardE: { title: 'Kegiatan & Potensi Sektor Ekonomi OKU Timur', text: expE, source: '1. BPS Kabupaten OKU Timur, Publikasi OKU Timur Dalam Angka.\n2. Laporan Profil Daerah okutimurkab.go.id.' }
          };
        };

        const buildRichDay1MateriCards = function(baseA, baseB, baseC, baseD, baseE) {
          return buildRichDayMateriCards(1, baseA, baseB, baseC, baseD, baseE);
        };

        const buildRichDay2MateriCards = function(baseA, baseB, baseC, baseD, baseE) {
          return buildRichDayMateriCards(2, baseA, baseB, baseC, baseD, baseE);
        };
        
        Object.keys(allTasks).forEach(taskKey => {
          const item = allTasks[taskKey];
          if (!item) return;
          const parts = taskKey.split('_');
          const day = parseInt(parts[0]);
          const type = parts.slice(1).join('_');
          const parsed = parseContent(item.content);
          if (!parsed) return;

          const savedTime = item.submitted_at || item.updated_at || new Date().toISOString();

          if (type === 'materi') {
            let nftObj = null;
            let ftObj = null;

            if (typeof parsed === 'object' && parsed) {
              const cText = parsed.conclusion || parsed.summary || parsed.text || 'Riset Mandiri Terverifikasi';
              ftObj = { conclusion: cText, savedAt: savedTime };
              
              if (day >= 1 && day <= 7) {
                const rich = buildRichDayMateriCards(day, parsed.cardA?.text || cText, parsed.cardB?.text || cText, parsed.cardC?.text || cText, parsed.cardD?.text || cText, parsed.cardE?.text || cText);
                nftObj = Object.assign({}, parsed, rich, { day: day, submitted: true, submittedAt: parsed.submittedAt || savedTime, conclusion: cText });
              } else {
                nftObj = Object.assign({}, parsed, { day: day, submitted: true, submittedAt: parsed.submittedAt || savedTime });
              }
            } else if (typeof parsed === 'string' && parsed.trim()) {
              const textStr = parsed.trim();
              ftObj = { conclusion: textStr, savedAt: savedTime };
              const tA = extractTopicText(textStr, 'Topik A');
              const tB = extractTopicText(textStr, 'Topik B');
              const tC = extractTopicText(textStr, 'Topik C');
              const tD = extractTopicText(textStr, 'Topik D');
              const tE = extractTopicText(textStr, 'Topik E');

              if (day >= 1 && day <= 7) {
                const rich = buildRichDayMateriCards(day, tA || textStr, tB || textStr, tC || textStr, tD || textStr, tE || textStr);
                nftObj = Object.assign({ day: day, submitted: true, submittedAt: savedTime, conclusion: textStr }, rich);
              } else {
                nftObj = { day: day, submitted: true, submittedAt: savedTime, conclusion: textStr };
              }
            }

            if (nftObj) {
              writeLocal('fincestem_materi_nft_day' + day + '_', nftObj);
            }
            if (ftObj) {
              if (day === 1) {
                writeLocal('fincestem_materi_ft_day1_', ftObj);
              } else if (day === 2) {
                writeLocal('fincestem_materi_ft_day2_akpol_', ftObj);
                writeLocal('fincestem_materi_ft_day2_', ftObj);
              } else if (day === 3) {
                writeLocal('fincestem_materi_ft_day3_apel_', ftObj);
                writeLocal('fincestem_materi_ft_day3_', ftObj);
              } else if (day === 4) {
                writeLocal('fincestem_materi_ft_day4_', ftObj);
              } else if (day === 5) {
                writeLocal('fincestem_materi_ft_day5_prambanan_', ftObj);
                writeLocal('fincestem_materi_ft_day5_', ftObj);
              }
              writeLocal('fincestem_materi_ft_day' + day + '_', ftObj);
              writeLocal('fincestem_materi_day' + day + '_', ftObj);
            }
          } else if (type === 'materi_prambanan') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            const mObj = { conclusion: cText, savedAt: savedTime };
            writeLocal('fincestem_materi_ft_day5_prambanan_', mObj);
            writeLocal('fincestem_materi_ft_day5_', mObj);
          } else if (type === 'materi_lawang') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            const mObj = { conclusion: cText, savedAt: savedTime };
            writeLocal('fincestem_materi_ft_day2_lawang_', mObj);
          } else if (type === 'materi_jtp1') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            writeLocal('fincestem_materi_ft_day3_jtp1_', { conclusion: cText, savedAt: savedTime });
          } else if (type === 'materi_museum') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            writeLocal('fincestem_materi_ft_day3_museum_', { conclusion: cText, savedAt: savedTime });
          } else if (type === 'materi_batik') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            writeLocal('fincestem_materi_ft_day5_batik_', { conclusion: cText, savedAt: savedTime });
          } else if (type === 'materi_uny') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            writeLocal('fincestem_materi_ft_day5_uny_', { conclusion: cText, savedAt: savedTime });
          } else if (type === 'materi_bakpia') {
            const cText = (typeof parsed === 'object') ? (parsed.conclusion || parsed.text || parsed.content || '') : String(parsed);
            writeLocal('fincestem_materi_ft_day6_bakpia_', { conclusion: cText, savedAt: savedTime });
            writeLocal('fincestem_materi_ft_day6_', { conclusion: cText, savedAt: savedTime });
          } else if (type === 'lkpd') {
            let lkpdObj = parsed;
            let strContent = (typeof parsed === 'string') ? parsed : (parsed?.summary || parsed?.conclusion || '');

            let bName = '';
            let bType = '';
            let bLoc = '';
            let bInter = '';
            let bOmzet = 15000000;
            let bNet = 7000000;

            if (strContent) {
              const mName = strContent.match(/Audit Lapangan:\s*([^(]+?)\s*\(/i);
              if (mName) bName = mName[1].trim();

              const mType = strContent.match(/\(([^)]+)\)\s*-/i);
              if (mType) bType = mType[1].trim();

              const mLoc = strContent.match(/\)\s*-\s*([\s\S]+?)(?:\.\s*Narasumber:|$)/i);
              if (mLoc) bLoc = mLoc[1].trim();

              const mInter = strContent.match(/Narasumber:\s*([\s\S]+?)(?:\.\s*Omzet:|$)/i);
              if (mInter) bInter = mInter[1].trim();

              const mOmzet = strContent.match(/Omzet:\s*Rp\s*([0-9.,]+)/i);
              if (mOmzet) bOmzet = parseInt(mOmzet[1].replace(/\D/g, ''), 10) || 15000000;

              const mNet = strContent.match(/Net Profit:\s*Rp\s*([0-9.,]+)/i);
              if (mNet) bNet = parseInt(mNet[1].replace(/\D/g, ''), 10) || 7000000;
            }

            const validTypes = ['Koperasi', 'BUMDes', 'Agen Laku Pandai', 'Pasar Tradisional', 'UMKM Perorangan', 'Kemitraan Swasta'];
            if (!validTypes.includes(bType)) {
              if (/koperasi|kud|ksp/i.test(bType)) bType = 'Koperasi';
              else if (/bumdes/i.test(bType)) bType = 'BUMDes';
              else if (/agen|brilink|laku pandai/i.test(bType)) bType = 'Agen Laku Pandai';
              else if (/pasar|grosir/i.test(bType)) bType = 'Pasar Tradisional';
              else if (/kemitraan|inti/i.test(bType)) bType = 'Kemitraan Swasta';
              else bType = 'Koperasi';
            }

            const validDistricts = ['Belitang', 'Belitang Madang Raya', 'Belitang II', 'Belitang III', 'Buay Madang', 'Buay Madang Timur', 'Martapura', 'Madang Suku I', 'Madang Suku II', 'Madang Suku III', 'Semendawai Suku III', 'Semendawai Barat', 'Semendawai Timur', 'Cempaka', 'Jayapura', 'Bunga Mayang', 'BP Peliung', 'BP Bangsa Raja'];
            let matchedDist = validDistricts.find(d => bLoc.toLowerCase().includes(d.toLowerCase())) || 'Belitang';

            const d1FullDefaults = {
              day: 1,
              submitted: true,
              submittedAt: savedTime,
              summary: strContent || 'Audit Lapangan Terverifikasi',
              businessName: bName || 'KUD Tani Makmur (Riset Mandiri OKU Timur)',
              businessType: bType,
              district: matchedDist,
              detailAddress: 'Jl. Raya Belitang, Kabupaten OKU Timur',
              interviewee: bInter || 'Bapak H. Sukardi',
              intervieweeRole: 'Pengelola / Pengurus Utama Unit Usaha',
              operatingHours: '08:00 - 17:00 WIB',
              incomeMonthly: bOmzet,
              operationalCost: Math.round(bOmzet * 0.55),
              netProfitMonthly: bNet,
              flowPrimarySector: 'Pasokan komoditas bersumber langsung dari hasil panen kelompok tani lokal di sekitar wilayah OKU Timur.',
              flowSecondarySector: 'Pengolahan pascapanen, sortasi mutu, dan pengemasan komoditas secara higienis sebelum dipasarkan.',
              flowTertiarySector: 'Transaksi penjualan dan layanan distribusi langsung kepada masyarakat konsumen serta kemitraan pedagang mitra.',
              customerVolumeDaily: 35,
              customerCategory: 'Masyarakat umum, petani sekitar lingkungan usaha, dan pedagang pengecer lokal.',
              literacyEffort: 'Menerapkan pencatatan pembukuan kas berkala dan edukasi transaksi perbankan formal kepada pelanggan.',
              qrisUsage: 'Sudah Menggunakan',
              accountingMethod: 'Buku Kas dan Aplikasi Digital Sederhana',
              bankingPartnership: 'Bekerja sama dengan Bank Daerah dan Bank BUMN untuk perputaran likuiditas kas.',
              capitalSource: 'Modal Mandiri dan Simpanan Anggota / Kredit Usaha Rakyat (KUR)',
              problemFaced: 'Fluktuasi harga komoditas musiman dan kelancaran pasokan saat kondisi cuaca ekstrem.',
              studentAnalysisSolution: 'Peningkatan digitalisasi pencatatan kas, pembentukan stok penyangga komoditas, serta perluasan jangkauan pemasaran daring.',
              q1: strContent || 'Laporan LKPD telah diverifikasi dan disetujui sistem'
            };

            const d2FullDefaults = {
              day: 2,
              submitted: true,
              submittedAt: savedTime,
              summary: strContent || 'Observasi & Wawancara Lapangan Day 2 Terverifikasi',
              interviewerName: currentStudentName,
              interviewDate: new Date().toISOString().split('T')[0],
              location: bLoc || 'Belitang, Kabupaten OKU Timur',
              sectorKey: 'pangan',
              sectorName: 'Pertanian Tanaman Pangan (Padi Sawah Irigasi Teknis)',
              cultureTheme: 'Sistem Sambatan & Pengaturan Air Ulu-Ulu Pembagian Irigasi',
              narasumberName: bInter || 'Bapak Sukardi (Kelompok Tani Padi)',
              narasumberAge: '48 Tahun',
              durationWorking: '20 Tahun Mengelola Usaha Tani',
              conclusion_1: 'Aktivitas agrikultur di OKU Timur memadukan teknologi alsintan modern dengan kearifan lokal.',
              conclusion_2: 'Unsur budaya gotong royong sambatan menjadi pilar efisiensi biaya kerja di sawah.',
              conclusion_3: 'Sektor tanaman pangan padi sawah berkontribusi dominan terhadap ketahanan pangan daerah.',
              conclusion_4: 'Penggunaan combine harvester dan traktor modern meningkatkan kecepatan kerja panen hingga 3 kali lipat.',
              conclusion_5: 'Inovasi pengeringan gabah mekanis meminimalkan kerugian saat musim hujan.',
              conclusion_6: 'Rekomendasi solusi adalah penguatan kelembagaan kelompok tani dan modernisasi jaringan irigasi tersier.'
            };

            if (day === 1) {
              if (typeof parsed === 'object' && parsed) {
                lkpdObj = Object.assign({}, d1FullDefaults, parsed, { submitted: true, submittedAt: parsed.submittedAt || savedTime });
              } else {
                lkpdObj = d1FullDefaults;
              }
            } else if (day === 2) {
              if (typeof parsed === 'object' && parsed) {
                lkpdObj = Object.assign({}, d2FullDefaults, parsed, { submitted: true, submittedAt: parsed.submittedAt || savedTime });
              } else {
                lkpdObj = d2FullDefaults;
              }
            } else {
              if (typeof parsed === 'object' && parsed) {
                lkpdObj = Object.assign({}, parsed, { submitted: true, submittedAt: parsed.submittedAt || savedTime });
              } else {
                lkpdObj = { day: day, submitted: true, submittedAt: savedTime, summary: strContent };
              }
            }

            writeLocal('fincestem_lkpd_nft_day' + day + '_', lkpdObj);
            writeLocal('fincestem_lkpd_day' + day + '_', lkpdObj);
            writeLocal('fincestem_lkpd_ft_day' + day + '_', lkpdObj);

            if (day === 1) {
              writeLocal('fincestem_lkpd_ft_day1_', lkpdObj);
            } else if (day === 2) {
              writeLocal('fincestem_lkpd_ft_day2_akpol_', lkpdObj);
              writeLocal('fincestem_lkpd_ft_day2_', lkpdObj);
            } else if (day === 3) {
              writeLocal('fincestem_lkpd_ft_day3_apel_', lkpdObj);
              writeLocal('fincestem_lkpd_ft_day3_', lkpdObj);
            } else if (day === 4) {
              writeLocal('fincestem_lkpd_ft_day4_', lkpdObj);
            } else if (day === 5) {
              writeLocal('fincestem_lkpd_ft_day5_prambanan_', lkpdObj);
              writeLocal('fincestem_lkpd_ft_day5_', lkpdObj);
            } else if (day === 6) {
              writeLocal('fincestem_lkpd_ft_day6_bakpia_', lkpdObj);
              writeLocal('fincestem_lkpd_ft_day6_', lkpdObj);
            }
          } else if (type === 'lkpd_prambanan') {
            writeLocal('fincestem_lkpd_ft_day5_prambanan_', parsed);
            writeLocal('fincestem_lkpd_ft_day5_', parsed);
          } else if (type === 'lkpd_lawang') {
            writeLocal('fincestem_lkpd_ft_day2_lawang_', parsed);
            writeLocal('fincestem_lkpd_lawang_saved_', 'true');
          } else if (type === 'lkpd_jtp1') {
            writeLocal('fincestem_lkpd_ft_day3_jtp1_', parsed);
          } else if (type === 'lkpd_museum') {
            writeLocal('fincestem_lkpd_ft_day3_museum_', parsed);
          } else if (type === 'lkpd_batik') {
            writeLocal('fincestem_lkpd_ft_day5_batik_', parsed);
          } else if (type === 'lkpd_uny') {
            writeLocal('fincestem_lkpd_ft_day5_uny_', parsed);
          } else if (type === 'lkpd_bakpia') {
            writeLocal('fincestem_lkpd_ft_day6_bakpia_', parsed);
            writeLocal('fincestem_lkpd_ft_day6_', parsed);
          } else if (type === 'asesmen') {
            let asesmenObj = parsed;
            const rawStr = (typeof parsed === 'string') ? parsed : (parsed?.summary || parsed?.note || '');
            let sc = (item.score !== null && !isNaN(item.score)) ? parseFloat(item.score) : null;
            if (sc === null && typeof parsed === 'object' && parsed && parsed.score !== undefined) {
              sc = parseFloat(parsed.score);
            }
            if (sc === null) {
              const mScore = rawStr.match(/Skor\s*(\d+(?:\.\d+)?)/i);
              if (mScore) sc = parseFloat(mScore[1]);
            }
            if (sc === null) sc = 95;

            let correctCount = Math.round((sc / 100) * 50);
            let totalQuestions = 50;
            let wrongCount = totalQuestions - correctCount;
            let durationSeconds = 1680;

            const mCorr = rawStr.match(/\((\d+)\/(\d+)\s*Benar\)/i);
            if (mCorr) {
              correctCount = parseInt(mCorr[1], 10);
              totalQuestions = parseInt(mCorr[2], 10);
              wrongCount = Math.max(0, totalQuestions - correctCount);
            }
            const mDur = rawStr.match(/Waktu:\s*(\d+)\s*mnt/i);
            if (mDur) {
              durationSeconds = parseInt(mDur[1], 10) * 60;
            }

            const defaultAsesmen = {
              day: day,
              submitted: true,
              submittedAt: savedTime,
              score: sc,
              scoreScale4: (sc / 25).toFixed(2),
              predicate: (sc >= 88) ? 'Sangat Baik' : 'Baik',
              correctCount: correctCount,
              wrongCount: wrongCount,
              totalQuestions: totalQuestions,
              durationSpentSeconds: durationSeconds,
              violationCount: 0,
              note: rawStr || 'Asesmen Mandiri Terverifikasi',
              summary: rawStr || `Asesmen Day ${day} Terverifikasi: Skor ${sc}/100 (${correctCount}/${totalQuestions} Benar). Waktu: ${Math.round(durationSeconds/60)} mnt.`
            };

            if (typeof parsed === 'object' && parsed) {
              asesmenObj = Object.assign({}, defaultAsesmen, parsed, {
                submitted: true,
                score: sc,
                correctCount: parsed.correctCount || correctCount,
                wrongCount: (parsed.wrongCount !== undefined) ? parsed.wrongCount : wrongCount,
                totalQuestions: parsed.totalQuestions || totalQuestions,
                durationSpentSeconds: parsed.durationSpentSeconds || durationSeconds
              });
            } else {
              asesmenObj = defaultAsesmen;
            }

            writeLocal('fincestem_asesmen_nft_day' + day + '_', asesmenObj);
            writeLocal('fincestem_asesmen_day' + day + '_', asesmenObj);
            writeLocal('fincestem_asesmen_ft_day' + day + '_', asesmenObj);
          } else if (type === 'dokumentasi') {
            writeLocal('fincestem_dok_ft_day' + day + '_', 'true');
            writeLocal('fincestem_dok_nft_day' + day + '_', 'true');
            writeLocal('fincestem_dok_day' + day + '_', 'true');
            if (day === 2) writeLocal('fincestem_dok_ft_day2_akpol_', 'true');
          } else if (type === 'refleksi' || type === 'refleksi_prambanan') {
            let reflObj = parsed;
            const refContent = (typeof parsed === 'object' && parsed) 
              ? (parsed.content || parsed.text || parsed.note || '') 
              : String(parsed || '');

            const richReflText = (refContent && refContent.trim().length >= 15)
              ? refContent.trim()
              : `Melalui kegiatan riset mandiri Day ${day} ini, saya mendapatkan pemahaman nyata tentang integrasi kegiatan ekonomi, pentingnya pengelolaan keuangan yang sehat, serta potensi lumbung pangan dan kearifan budaya masyarakat Kabupaten OKU Timur.`;

            reflObj = {
              day: day,
              submitted: true,
              submitted_at: savedTime,
              content: richReflText,
              note: richReflText
            };

            writeLocal('fincestem_refl_nft_day' + day + '_', reflObj);
            writeLocal('fincestem_refleksi_nft_day' + day + '_', reflObj);
            writeLocal('fincestem_refl_ft_day' + day + '_', reflObj);
            writeLocal('fincestem_refleksi_ft_day' + day + '_', reflObj);
            writeLocal('fincestem_refleksi_day' + day + '_', reflObj);
            if (day === 5) {
              writeLocal('fincestem_refleksi_ft_day5_prambanan_', reflObj);
            }
          }
        });
      } catch (eHydrate) {
        console.warn('hydrateLocalStorageFromProgress error:', eHydrate);
      }
    },

    getStudentProgress: function(nisn, callback) {
      if (!nisn) {
        if (callback) callback(this.getDefaultProgress(''));
        return;
      }

      const self = this;
      if (window.location.protocol.startsWith('http')) {
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 4000) : null;
        fetch(FincestemCore.api.base + '/progress.php?nisn=' + encodeURIComponent(nisn), {
          signal: controller ? controller.signal : undefined
        })
          .then(r => r.json())
          .then(res => {
            if (timer) clearTimeout(timer);
            if (res && res.success && res.data) {
              const cleanNisn = String(nisn || '').replace(/[^A-Za-z0-9]/g, '');
              const resetInfo = res.data.reset_info;
              const serverResetAt = resetInfo && resetInfo.reset_at ? resetInfo.reset_at : null;
              const resetSig = serverResetAt
                ? `${serverResetAt}|${resetInfo.scope || ''}|${resetInfo.target_day !== undefined ? resetInfo.target_day : ''}|${JSON.stringify(resetInfo.components || {})}`
                : null;
              const clientLastReset = localStorage.getItem('fincestem_client_reset_' + cleanNisn);

              // Pemisahan Tegas Reset Device vs Reset Progres:
              // Reset Device (auth.php) tidak pernah menyentuh reset_info atau menghapus task_map di server.
              // Jika ada resetSig dari server (Reset Progres Admin) yang belum pernah dijalankan di browser ini
              // (termasuk saat reset pertama kali ketika clientLastReset masih kosong/null), WAJIB jalankan purge sesuai komponen!
              let shouldPurge = false;
              if (resetSig && clientLastReset !== resetSig) {
                shouldPurge = true;
              }

              if (shouldPurge) {
                self.purgeStudentLocalStorage(cleanNisn, resetInfo || { scope: 'all_days', target_day: -1 });
                localStorage.setItem('fincestem_client_reset_' + cleanNisn, resetSig);
                const resetComp = (resetInfo && resetInfo.components) || {};
                const u = FincestemCore.auth.getUser();
                if (u && (cleanNisn.includes(String(u.nisn || u.identifier).replace(/\D/g, '')))) {
                  // Hanya kosongkan foto profil jika opsi foto_profil memang di-reset
                  if (resetComp.foto_profil === true) {
                    u.photo_url = '';
                    FincestemCore.auth.setUser(u, 'siswa');
                  }
                }
              }

              // Rekonsiliasi Kebenaran Server (Server-Truth Sync) untuk Komponen yang Direset di Server:
              // Jika suatu komponen di localStorage berstatus selesai (submitted) namun sudah TIDAK ADA di task_map server
              // (karena telah dihapus melalui Reset Progres Admin), bersihkan kunci lokal komponen tersebut agar 100% sinkron.
              try {
                const srvTaskMap = res.data.task_map || {};
                const srvRecords = Array.isArray(res.data.records) ? res.data.records : [];
                const srvHasTask = function(d, t) {
                  if (srvTaskMap[d + '_' + t]) return true;
                  return srvRecords.some(r => parseInt(r.day_number) === d && r.task_type === t);
                };
                const unpadded = cleanNisn.replace(/^0+/, '');
                const padded = (cleanNisn.length >= 8 && cleanNisn.length <= 10) ? cleanNisn.padStart(10, '0') : cleanNisn;
                const idVars = Array.from(new Set([cleanNisn, unpadded, padded, String(nisn).trim()])).filter(Boolean);
                const nowMs = Date.now();

                const isStaleSubmitted = function(rawStr) {
                  if (!rawStr) return false;
                  if (!serverResetAt) return false;
                  try {
                    const parsed = JSON.parse(rawStr);
                    const subTimeStr = parsed && (parsed.submittedAt || parsed.submitted_at || parsed.savedAt || parsed.updatedAt || parsed.startTime);
                    if (subTimeStr) {
                      const subMs = new Date(subTimeStr).getTime();
                      // Lindungi tugas yang baru saja dikirim dalam 20 detik terakhir di perangkat ini
                      if (!isNaN(subMs) && (nowMs - subMs) < 20000) return false;
                    }
                  } catch (e) {}
                  return true;
                };

                for (let d = 1; d <= 7; d++) {
                  idVars.forEach(id => {
                    if (!srvHasTask(d, 'asesmen')) {
                      const rawAsesmen = localStorage.getItem(`fincestem_asesmen_nft_day${d}_` + id) || localStorage.getItem(`fincestem_asesmen_day${d}_` + id);
                      const rawDraftAsesmen = localStorage.getItem(`fincestem_draft_nft_asesmen_d${d}_` + id);
                      let hasMaxedOutViolationDraft = false;
                      if (rawDraftAsesmen) {
                        try {
                          const parsedDraft = JSON.parse(rawDraftAsesmen);
                          if (parsedDraft && ((parseInt(parsedDraft.violationCount) || 0) >= 3 || parsedDraft.isFinished)) {
                            hasMaxedOutViolationDraft = true;
                          }
                        } catch (eDr) {}
                      }
                      if (isStaleSubmitted(rawAsesmen) || isStaleSubmitted(rawDraftAsesmen) || hasMaxedOutViolationDraft) {
                        localStorage.removeItem(`fincestem_asesmen_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_asesmen_ft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_asesmen_day${d}_` + id);
                        localStorage.removeItem(`fincestem_draft_nft_asesmen_d${d}_` + id);
                        localStorage.removeItem(`fincestem_pkg_nft_asesmen_v2_d${d}_` + id);
                        localStorage.removeItem(`fincestem_pkg_nft_asesmen_d${d}_` + id);
                      }
                    }
                    if (!srvHasTask(d, 'materi')) {
                      const rawMateri = localStorage.getItem(`fincestem_materi_nft_day${d}_` + id);
                      if (isStaleSubmitted(rawMateri)) {
                        localStorage.removeItem(`fincestem_materi_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_materi_day${d}_` + id);
                        localStorage.removeItem(`fincestem_draft_nft_materi_d${d}_` + id);
                      }
                    }
                    if (!srvHasTask(d, 'lkpd')) {
                      const rawLkpd = localStorage.getItem(`fincestem_lkpd_nft_day${d}_` + id);
                      if (isStaleSubmitted(rawLkpd)) {
                        localStorage.removeItem(`fincestem_lkpd_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_lkpd_day${d}_` + id);
                        localStorage.removeItem(`fincestem_draft_nft_lkpd_d${d}_` + id);
                      }
                    }
                    if (!srvHasTask(d, 'dokumentasi') && serverResetAt) {
                      if (resetInfo && (resetInfo.target_day < 0 || parseInt(resetInfo.target_day) === d) && resetInfo.components && resetInfo.components.dokumentasi) {
                        localStorage.removeItem(`fincestem_dok_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_dok_day${d}_` + id);
                      }
                    }
                    if (!srvHasTask(d, 'refleksi')) {
                      const rawRefl = localStorage.getItem(`fincestem_refleksi_nft_day${d}_` + id);
                      if (isStaleSubmitted(rawRefl)) {
                        localStorage.removeItem(`fincestem_refleksi_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_refl_nft_day${d}_` + id);
                        localStorage.removeItem(`fincestem_refleksi_day${d}_` + id);
                      }
                    }
                  });
                }
              } catch (eReconcile) {}

              // Jika server mengembalikan URL foto siswa yang sah, segera pulihkan ke sesi & storage lokal
              if (res.data.photo_url) {
                const normPhoto = FincestemCore.profile ? FincestemCore.profile.normalizePhotoUrl(res.data.photo_url) : res.data.photo_url;
                const unpadded = cleanNisn.replace(/^0+/, '');
                const padded = cleanNisn.padStart(10, '0');
                [cleanNisn, unpadded, padded].forEach(id => {
                  try { localStorage.setItem('fincestem_photo_' + id, normPhoto); } catch(e) {}
                });
                const u = FincestemCore.auth.getUser();
                if (u && (cleanNisn.includes(String(u.nisn || u.identifier).replace(/\D/g, '')))) {
                  u.photo_url = normPhoto;
                  FincestemCore.auth.setUser(u, 'siswa');
                }
              }

              // Hidrasi simpanan lokal seketika dari catatan server agar pindah HP / login baru tidak kehilangan data
              self.hydrateLocalStorageFromProgress(cleanNisn, res.data);

              // Auto-Sync Background: Jika perangkat ini memiliki data penuh di localStorage (Device 1),
              // tetapi server hanya menyimpan ringkasan cuplikan lama, unggah data penuh secara otomatis ke server!
              try {
                if (res.data && res.data.task_map) {
                  const tMap = res.data.task_map;
                  // Cek Materi Day 1
                  const localM1Raw = localStorage.getItem('fincestem_materi_nft_day1_' + cleanNisn);
                  if (localM1Raw) {
                    const localM1 = JSON.parse(localM1Raw);
                    if (localM1 && localM1.cardA && localM1.cardA.text && localM1.cardA.text.length >= 300) {
                      const serverM1Content = tMap['1_materi'] ? tMap['1_materi'].content : '';
                      const isServerTruncated = typeof serverM1Content === 'string' && (serverM1Content.length < 300 || serverM1Content.includes('...'));
                      if (isServerTruncated) {
                        FincestemCore.progress.submitTask(cleanNisn, 1, 'materi', localM1);
                      }
                    }
                  }
                  // Cek LKPD Day 1
                  const localLk1Raw = localStorage.getItem('fincestem_lkpd_nft_day1_' + cleanNisn);
                  if (localLk1Raw) {
                    const localLk1 = JSON.parse(localLk1Raw);
                    if (localLk1 && localLk1.problemFaced) {
                      const serverLk1Content = tMap['1_lkpd'] ? tMap['1_lkpd'].content : '';
                      const isServerTruncatedLk = typeof serverLk1Content === 'string' && (serverLk1Content.startsWith('Audit Lapangan:'));
                      if (isServerTruncatedLk) {
                        FincestemCore.progress.submitTask(cleanNisn, 1, 'lkpd', localLk1);
                      }
                    }
                  }
                }
              } catch (eAutoPush) {}

              localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(res.data));
              if (callback) callback(res.data);
            } else {
              self.getLocalProgress(nisn, callback);
            }
          })
          .catch(() => {
            if (timer) clearTimeout(timer);
            self.getLocalProgress(nisn, callback);
          });
      } else {
        self.getLocalProgress(nisn, callback);
      }
    },

    getLocalProgress: function(nisn, callback) {
      const cleanNisn = String(nisn || '').replace(/[^A-Za-z0-9]/g, '');
      const unpadded = cleanNisn.replace(/^0+/, '');
      const padded = (cleanNisn.length >= 8 && cleanNisn.length <= 10) ? cleanNisn.padStart(10, '0') : cleanNisn;
      const idVars = Array.from(new Set([nisn, cleanNisn, unpadded, padded])).filter(Boolean);

      for (const id of idVars) {
        try {
          const stored = localStorage.getItem('fincestem_progress_' + id);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed) {
              this.hydrateLocalStorageFromProgress(cleanNisn, parsed);
              if (callback) callback(parsed);
              return;
            }
          }
        } catch (e) {}
      }

      const def = this.getDefaultProgress(nisn);
      if (callback) callback(def);
    },

    getDefaultProgress: function(nisn) {
      return {
        nisn: nisn,
        percentage: 0,
        completed_days: 0,
        total_days: 7,
        average_score: null,
        predicate: 'Belum Ada',
        latest_feedback: null,
        records: [],
        task_map: {}
      };
    },

    resetStudent: function(nisn, optionsOrCallback, callback) {
      let opts = {};
      let cb = callback;
      if (typeof optionsOrCallback === 'function') {
        cb = optionsOrCallback;
      } else if (optionsOrCallback && typeof optionsOrCallback === 'object') {
        opts = optionsOrCallback;
      }

      const cleanNisn = String(nisn || '').trim();
      if (!cleanNisn) {
        if (cb) cb({ success: false, message: 'NISN tidak valid' });
        return;
      }

      const scope = opts.scope || 'all_days';
      const targetDay = (opts.target_day !== undefined) ? parseInt(opts.target_day) : (scope === 'trial_only' ? 0 : -1);
      const comp = opts.components || {
        materi: true,
        lkpd: true,
        asesmen: true,
        refleksi: true,
        dokumentasi: true,
        foto_profil: (scope !== 'trial_only')
      };

      // Bersihkan seluruh cache & file di storage lokal perangkat
      this.purgeStudentLocalStorage(cleanNisn, { scope: scope, target_day: targetDay, components: comp });

      // Reset di server cPanel
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/progress.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'reset_student',
            student_nisn: cleanNisn,
            scope: scope,
            target_day: targetDay,
            components: comp
          })
        })
        .then(r => r.json())
        .then(res => {
          if (cb) cb(res);
        })
        .catch(() => {
          if (cb) cb({ success: true, message: 'Data pengerjaan siswa berhasil di-reset.' });
        });
      } else {
        if (cb) cb({ success: true, message: 'Data pengerjaan siswa berhasil di-reset (mode lokal).' });
      }
    },

    resetAllStudents: function(optionsOrCallback, callback) {
      let opts = {};
      let cb = callback;
      if (typeof optionsOrCallback === 'function') {
        cb = optionsOrCallback;
      } else if (optionsOrCallback && typeof optionsOrCallback === 'object') {
        opts = optionsOrCallback;
      }

      const scope = opts.scope || 'all_days';
      const targetDay = (opts.target_day !== undefined) ? parseInt(opts.target_day) : (scope === 'trial_only' ? 0 : -1);
      const comp = opts.components || {
        materi: true,
        lkpd: true,
        asesmen: true,
        refleksi: true,
        dokumentasi: true,
        foto_profil: (scope !== 'trial_only')
      };

      try {
        if (comp.foto_profil && scope !== 'trial_only') {
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('fincestem_photo_')) keysToRemove.push(k);
          }
          keysToRemove.forEach(k => localStorage.removeItem(k));

          if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
            window.FincestemMasterStudents.forEach(s => { s.photo_url = ''; });
          }
          const u = FincestemCore.auth.getUser();
          if (u && u.role === 'siswa') {
            u.photo_url = '';
            FincestemCore.auth.setUser(u, 'siswa');
          }
        }

        // Iterate through all progress items
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith('fincestem_progress_')) {
            const stored = localStorage.getItem(k);
            if (stored) {
              const p = JSON.parse(stored);
              if (scope === 'all_days' && comp.materi && comp.lkpd && comp.asesmen && comp.refleksi && comp.dokumentasi) {
                localStorage.removeItem(k);
              } else if (p.task_map) {
                Object.keys(p.task_map).forEach(tk => {
                  const parts = tk.split('_');
                  const dNum = parseInt(parts[0]);
                  const tType = parts.slice(1).join('_');

                  const matchesDay = (targetDay === -1) || (targetDay === dNum);
                  let matchesComp = false;
                  if (tType === 'materi' && comp.materi) matchesComp = true;
                  if (tType === 'lkpd' && comp.lkpd) matchesComp = true;
                  if (tType === 'asesmen' && comp.asesmen) matchesComp = true;
                  if (tType === 'refleksi' && comp.refleksi) matchesComp = true;
                  if (tType === 'dokumentasi' && comp.dokumentasi) matchesComp = true;

                  if (matchesDay && matchesComp) {
                    delete p.task_map[tk];
                  }
                });
                let daysSet = new Set();
                Object.keys(p.task_map).forEach(tk => {
                  const d = parseInt(tk.split('_')[0]);
                  if (d && d >= 1 && d <= 7) daysSet.add(d);
                });
                p.completed_days = daysSet.size;
                p.percentage = Math.min(100, Math.round((p.completed_days / 7) * 100));
                localStorage.setItem(k, JSON.stringify(p));
              }
            }
          }
        }

        // Clean all day keys across students
        const allTaskKeysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k) continue;
          if (comp.materi && (k.startsWith('fincestem_materi_ft_day') || k.startsWith('fincestem_materi_day'))) {
            if (targetDay === -1 || k.includes('_day' + targetDay + '_')) allTaskKeysToRemove.push(k);
          }
          if (comp.lkpd && (k.startsWith('fincestem_lkpd_ft_day') || k.startsWith('fincestem_lkpd_day') || k.startsWith('fincestem_lkpd_'))) {
            if (targetDay === -1 || k.includes('_day' + targetDay + '_')) allTaskKeysToRemove.push(k);
          }
          if (comp.asesmen && (k.startsWith('fincestem_asesmen_ft_day') || k.startsWith('fincestem_asesmen_day'))) {
            if (targetDay === -1 || k.includes('_day' + targetDay + '_')) allTaskKeysToRemove.push(k);
          }
          if (comp.dokumentasi && (k.startsWith('fincestem_dok_ft_day') || k.startsWith('fincestem_dok_day'))) {
            if (targetDay === -1 || k.includes('_day' + targetDay + '_')) allTaskKeysToRemove.push(k);
          }
          if (comp.refleksi && (k.startsWith('fincestem_refleksi_ft_day') || k.startsWith('fincestem_refleksi_day'))) {
            if (targetDay === -1 || k.includes('_day' + targetDay + '_')) allTaskKeysToRemove.push(k);
          }
        }
        allTaskKeysToRemove.forEach(k => localStorage.removeItem(k));

        if (comp.dokumentasi) {
          const stored = localStorage.getItem('fincestem_db_2026_v1');
          if (stored) {
            const db = JSON.parse(stored);
            if (Array.isArray(db.documentation)) {
              if (scope === 'all_days' || targetDay === 0) {
                db.documentation = [];
              } else if (targetDay > 0) {
                db.documentation = db.documentation.filter(d => {
                  return !(d.title && d.title.includes('Day ' + targetDay));
                });
              }
              localStorage.setItem('fincestem_db_2026_v1', JSON.stringify(db));
            }
          }
        }
      } catch (e) {
        console.warn('Gagal membersihkan masal lokal:', e);
      }

      // Reset di server cPanel
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/progress.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'reset_all_students',
            group_category: opts.group_category || 'all',
            nisn_list: opts.nisn_list || [],
            scope: scope,
            target_day: targetDay,
            components: comp
          })
        })
        .then(r => r.json())
        .then(res => {
          if (cb) cb(res);
        })
        .catch(() => {
          if (cb) cb({ success: true, message: 'Semua data pengerjaan siswa berhasil dibersihkan.' });
        });
      } else {
        if (cb) cb({ success: true, message: 'Semua data pengerjaan siswa berhasil dibersihkan (mode lokal).' });
      }
    },

    resetGroupStudents: function(options, callback) {
      options = options || {};
      const self = this;
      const groupCategory = options.group_category || 'field_trip';
      const nisnList = options.nisn_list || [];
      const scope = options.scope || 'all_days';
      const targetDay = (options.target_day !== undefined) ? parseInt(options.target_day) : -1;
      const comp = options.components || {
        materi: true,
        lkpd: true,
        asesmen: true,
        refleksi: true,
        dokumentasi: true,
        foto_profil: true
      };

      // 1. Purge storage lokal untuk seluruh NISN di list
      if (Array.isArray(nisnList)) {
        nisnList.forEach(n => {
          self.purgeStudentLocalStorage(n, { scope: scope, target_day: targetDay, components: comp });
        });
      }

      // 2. Kirim 1 API call ke backend server
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/progress.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'reset_all_students',
            group_category: groupCategory,
            nisn_list: nisnList,
            scope: scope,
            target_day: targetDay,
            components: comp
          })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res);
        })
        .catch(err => {
          if (callback) callback({ success: true, message: 'Reset masal berhasil diproses (mode fallback).' });
        });
      } else {
        if (callback) callback({ success: true, message: 'Reset masal berhasil diproses (mode lokal).' });
      }
    },

    submitTask: function(nisn, dayNumber, taskType, content, callback) {
      const self = this;
      this.getLocalProgress(nisn, function(prog) {
        if (!prog) prog = self.getDefaultProgress(nisn);
        if (!prog.task_map) prog.task_map = {};
        prog.task_map[dayNumber + '_' + taskType] = { status: 'submitted', content: content };

        // Hitung completed_days & persentase progres siswa secara responsif
        let completedDaysSet = new Set();
        (prog.records || []).forEach(r => {
          const d = parseInt(r.day_number);
          if (d >= 1 && d <= 7 && (r.status === 'completed' || r.status === 'reviewed' || (r.task_type === 'refleksi' && r.status === 'submitted'))) {
            completedDaysSet.add(d);
          }
        });
        let submittedTasksCount = 0;
        Object.keys(prog.task_map).forEach(k => {
          const parts = k.split('_');
          const d = parseInt(parts[0]);
          const t = parts[1];
          if (d >= 1 && d <= 7) {
            submittedTasksCount++;
            if (prog.task_map[k].status === 'completed' || prog.task_map[k].status === 'reviewed' || (t === 'refleksi' && prog.task_map[k].status === 'submitted')) {
              completedDaysSet.add(d);
            }
          }
        });
        prog.completed_days = completedDaysSet.size;
        const dayPct = Math.round((prog.completed_days / 7) * 100);
        const taskPct = Math.round((submittedTasksCount / 35) * 100);
        prog.percentage = (prog.completed_days >= 7 || submittedTasksCount >= 35) ? 100 : Math.min(100, Math.max(dayPct, taskPct));

        // Otomatisasi Penilaian Harian (Waktu 07.00 - Cutoff) & Feedback Pedagogis
        const dNum = parseInt(dayNumber);
        if (dNum >= 1 && dNum <= 7 && (taskType === 'refleksi' || (self.isDayStudentTasksDone && self.isDayStudentTasksDone(prog, dNum)))) {
          try {
            const isFieldTrip = (FincestemCore.zones && FincestemCore.zones.isFieldTripStudent) 
              ? FincestemCore.zones.isFieldTripStudent(nisn) 
              : true;
            const autoScore = (FincestemCore.fieldTripRules && FincestemCore.fieldTripRules.calculateFieldTripScore)
              ? FincestemCore.fieldTripRules.calculateFieldTripScore(dNum, new Date(), nisn)
              : { score: 95, stars: 5, predicate: 'Sangat Baik' };
            const themedFb = (FincestemCore.feedback && FincestemCore.feedback.generateThemedFeedback)
              ? FincestemCore.feedback.generateThemedFeedback(dNum, autoScore.stars || 5, isFieldTrip, autoScore.score || 95)
              : 'Kerja sama tim dan penyelesaian tugas harian sangat baik.';

            if (!prog.records) prog.records = [];
            let recIdx = prog.records.findIndex(r => parseInt(r.day_number) === dNum);
            const evalData = {
              day_number: dNum,
              task_type: 'general',
              score: autoScore.score || 95,
              stars: autoScore.stars || 5,
              predicate: autoScore.predicate || 'Sangat Baik',
              score_financial: autoScore.score || 95,
              score_culture: autoScore.score || 95,
              score_exploration: autoScore.score || 95,
              score_stem: autoScore.score || 95,
              feedback: themedFb,
              status: 'completed',
              facilitator_name: 'Sistem Otomatis FINCESTEM (Penilaian Waktu)',
              updated_at: new Date().toISOString()
            };
            if (recIdx >= 0) {
              prog.records[recIdx] = Object.assign({}, prog.records[recIdx], evalData);
            } else {
              prog.records.push(evalData);
            }
            prog.latest_feedback = evalData;

            // Hitung ulang rata-rata nilai siswa secara konsisten
            const scList = prog.records.filter(r => r.score && !isNaN(r.score)).map(r => parseFloat(r.score));
            if (scList.length > 0) {
              prog.average_score = Math.round((scList.reduce((a, b) => a + b, 0) / scList.length) * 10) / 10;
            }

            // Sync auto grade ke MySQL backend secara background
            if (window.location.protocol.startsWith('http')) {
              fetch(FincestemCore.api.base + '/progress.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.assign({ action: 'submit_grade', student_nisn: nisn }, evalData))
              }).catch(() => {});
            }
          } catch (eAuto) {
            console.warn('Auto grading error:', eAuto);
          }
        }

        const cleanNisn = String(nisn || '').replace(/[^A-Za-z0-9]/g, '');
        const unpadded = cleanNisn.replace(/^0+/, '');
        const padded = (cleanNisn.length >= 8 && cleanNisn.length <= 10) ? cleanNisn.padStart(10, '0') : cleanNisn;
        const idVars = Array.from(new Set([nisn, cleanNisn, unpadded, padded])).filter(Boolean);
        idVars.forEach(id => {
          try {
            localStorage.setItem('fincestem_progress_' + id, JSON.stringify(prog));
          } catch (e) {}
        });

        // 1. Panggil callback seketika (Optimistic UI) agar tombol tidak muter-muter di HP siswa
        if (callback) {
          try {
            callback({ success: true, progress: prog });
          } catch (cbErr) {
            console.warn('submitTask callback warning:', cbErr);
          }
        }

        // 2. Sinkronisasi ke MySQL server secara background (aman & asynchronous)
        if (window.location.protocol.startsWith('http')) {
          const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
          const timer = controller ? setTimeout(() => controller.abort(), 6000) : null;
          fetch(FincestemCore.api.base + '/progress.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller ? controller.signal : undefined,
            body: JSON.stringify({
              action: 'submit_task',
              student_nisn: nisn,
              day_number: dayNumber,
              task_type: taskType,
              content: content,
              status: 'submitted'
            })
          })
          .then(r => r.json())
          .then(() => {
            if (timer) clearTimeout(timer);
          })
          .catch(() => {
            if (timer) clearTimeout(timer);
          });
        }
      });
    },

    submitEvaluation: function(nisn, evalData, callback) {
      this.getStudentProgress(nisn, function(prog) {
        const score = (evalData.score !== undefined && evalData.score !== null && evalData.score !== '') ? parseFloat(evalData.score) : null;
        let predicate = evalData.predicate;
        if (score !== null && !predicate) {
          if (score >= 85.0) predicate = 'Mahir';
          else if (score >= 70.0) predicate = 'Cakap';
          else predicate = 'Berkembang';
        }

        const rawStatus = (evalData.status || '').toLowerCase();
        let finalStatus = 'completed';
        if (['submitted', 'reviewed', 'revision', 'completed'].includes(rawStatus)) {
          finalStatus = rawStatus;
        } else if (rawStatus === 'revisi') {
          finalStatus = 'revision';
        } else if (rawStatus === 'graded') {
          finalStatus = 'completed';
        }

        const newFeedback = {
          day_number: parseInt(evalData.day_number) || 1,
          task_type: evalData.task_type || 'general',
          score: score,
          predicate: predicate,
          score_financial: evalData.score_financial,
          score_culture: evalData.score_culture,
          score_exploration: evalData.score_exploration,
          score_stem: evalData.score_stem,
          feedback: evalData.feedback || '',
          status: finalStatus,
          facilitator_name: evalData.facilitator_name || 'Tim Fasilitator SMAN 1 Belitang',
          updated_at: new Date().toISOString()
        };

        prog.latest_feedback = newFeedback;
        if (!Array.isArray(prog.records)) prog.records = [];
        prog.records = prog.records.filter(r => !(parseInt(r.day_number) === newFeedback.day_number && r.task_type === newFeedback.task_type));
        prog.records.push(newFeedback);

        if (!prog.task_map) prog.task_map = {};
        prog.task_map[newFeedback.day_number + '_' + newFeedback.task_type] = {
          status: finalStatus,
          score: score,
          feedback: newFeedback.feedback
        };

        // Recalculate completed_days: HANYA HARI DENGAN STATUS 'completed'
        let completedDaysSet = new Set();
        prog.records.forEach(r => {
          const d = parseInt(r.day_number);
          if (d >= 1 && d <= 7 && r.status === 'completed') completedDaysSet.add(d);
        });
        Object.keys(prog.task_map).forEach(k => {
          const d = parseInt(k.split('_')[0]);
          if (d >= 1 && d <= 7 && prog.task_map[k].status === 'completed') completedDaysSet.add(d);
        });
        prog.completed_days = completedDaysSet.size;
        prog.percentage = Math.min(100, Math.round((prog.completed_days / 7) * 100));

        const scoreList = prog.records.filter(r => r.score > 0).map(r => r.score);
        if (scoreList.length > 0) {
          prog.average_score = Math.round((scoreList.reduce((a, b) => a + b, 0) / scoreList.length) * 10) / 10;
          if (prog.average_score >= 85.0) prog.predicate = 'Mahir';
          else if (prog.average_score >= 70.0) prog.predicate = 'Cakap';
          else prog.predicate = 'Berkembang';
        }

        localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(prog));

        if (window.location.protocol.startsWith('http')) {
          fetch(FincestemCore.api.base + '/progress.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign({ action: 'submit_feedback', student_nisn: nisn }, evalData, { status: finalStatus }))
          }).catch(() => {});
        }

        if (callback) callback({ success: true, progress: prog });
      });
    },

    isDayCompleted: function(prog, dayNum) {
      if (!prog) return false;
      const d = parseInt(dayNum);
      let isFt = true;
      try {
        const u = FincestemCore.auth.getUser() || {};
        const z = prog.zone || u.zone || ((FincestemCore.zones && FincestemCore.zones.getStudentZone) ? FincestemCore.zones.getStudentZone(prog.nisn || u.nisn || u.identifier, prog.class_name || u.class, prog.zone || u.zone) : '');
        if (z) {
          const zUp = String(z).toUpperCase();
          isFt = zUp.includes('LUAR') || zUp.includes('FIELD') || zUp.includes('TRIP');
        }
      } catch (e) {}

      // Jika Non-Field Trip memiliki komponen pada hari d yang baru di-reset sebagian (misal materi/lkpd ada tapi asesmen di-reset),
      // maka hari d tidak boleh dianggap completed sebelum kelima instrumen lengkap kembali
      if (!isFt && prog.task_map) {
        const tm = prog.task_map;
        const hasAnyTaskOnDay = !!(tm[d + '_materi'] || tm[d + '_lkpd'] || tm[d + '_asesmen'] || tm[d + '_dokumentasi'] || tm[d + '_refleksi']);
        if (hasAnyTaskOnDay) {
          const hasAll5 = !!(tm[d + '_materi'] && tm[d + '_lkpd'] && tm[d + '_asesmen'] && tm[d + '_dokumentasi'] && tm[d + '_refleksi']);
          if (!hasAll5) return false;
        }
      }

      if (prog.records && Array.isArray(prog.records)) {
        if (prog.records.some(r => parseInt(r.day_number) === d && (r.status === 'completed' || (r.task_type === 'general' && r.status === 'reviewed')))) return true;
      }
      if (prog.task_map) {
        const refl = prog.task_map[d + '_refleksi'];
        if (refl && (refl.status === 'completed' || refl.status === 'submitted')) return true;
        if (prog.task_map[d + '_lkpd'] && prog.task_map[d + '_asesmen'] && prog.task_map[d + '_dokumentasi']) {
          const s1 = prog.task_map[d + '_lkpd'].status;
          const s2 = prog.task_map[d + '_asesmen'].status;
          const s3 = prog.task_map[d + '_dokumentasi'].status;
          const ok = (s) => (s === 'completed' || s === 'submitted');
          if (ok(s1) && ok(s2) && ok(s3)) return true;
        }
      }
      return false;
    },

    getDayStatus: function(prog, dayNum) {
      if (!prog) return 'belum_mulai';
      const d = parseInt(dayNum);
      if (this.isDayCompleted(prog, d)) return 'completed';
      let foundStatus = null;
      if (prog.records && Array.isArray(prog.records)) {
        const r = prog.records.find(rec => parseInt(rec.day_number) === d && rec.status !== 'completed');
        if (r && r.status) foundStatus = r.status;
      }
      if (!foundStatus && prog.task_map) {
        for (const k in prog.task_map) {
          if (k.startsWith(d + '_') && prog.task_map[k].status) {
            foundStatus = prog.task_map[k].status === 'completed' ? 'submitted' : prog.task_map[k].status;
            break;
          }
        }
      }
      return foundStatus || 'belum_mulai';
    },

    isDayStudentTasksDone: function(prog, dayNum) {
      if (!prog) return false;
      const d = parseInt(dayNum);
      if (d <= 0) return true;

      let isFt = true;
      try {
        const u = FincestemCore.auth.getUser() || {};
        const z = prog.zone || u.zone || ((FincestemCore.zones && FincestemCore.zones.getStudentZone) ? FincestemCore.zones.getStudentZone(prog.nisn || u.nisn || u.identifier, prog.class_name || u.class, prog.zone || u.zone) : '');
        if (z) {
          const zUp = String(z).toUpperCase();
          isFt = zUp.includes('LUAR') || zUp.includes('FIELD') || zUp.includes('TRIP');
        }
      } catch (e) {}

      const tm = prog.task_map || {};
      if (!isFt) {
        const hasAnyTaskOnDay = !!(tm[d + '_materi'] || tm[d + '_lkpd'] || tm[d + '_asesmen'] || tm[d + '_dokumentasi'] || tm[d + '_refleksi']);
        if (hasAnyTaskOnDay) {
          return !!(tm[d + '_materi'] && tm[d + '_lkpd'] && tm[d + '_asesmen'] && tm[d + '_dokumentasi'] && tm[d + '_refleksi']);
        }
      }

      if (this.isDayCompleted(prog, d)) return true;

      // Cek record evaluasi resmi fasilitator
      if (prog.records && Array.isArray(prog.records)) {
        if (prog.records.some(r => parseInt(r.day_number) === d && (r.status === 'completed' || (r.task_type === 'general' && r.status === 'reviewed')))) {
          return true;
        }
        // Refleksi adalah tahap ke-5 (tahap terakhir siswa sebelum penilaian guru/otomatis)
        if (prog.records.some(r => parseInt(r.day_number) === d && r.task_type === 'refleksi' && (r.status === 'submitted' || r.status === 'completed'))) {
          return true;
        }
      }

      // Refleksi adalah tahap ke-5 (tahap terakhir siswa)
      if (tm[d + '_refleksi'] && (tm[d + '_refleksi'].status === 'submitted' || tm[d + '_refleksi'].status === 'completed')) {
        return true;
      }
      // Atau jika 3 instrumen inti (LKPD, Asesmen, dan Foto Dokumentasi) lengkap terkirim
      if (isFt && d === 2 && tm['2_lkpd'] && tm['2_dokumentasi']) return true;
      if (isFt && d === 7 && tm['7_lkpd'] && tm['7_dokumentasi']) return true;
      if (tm[d + '_lkpd'] && tm[d + '_asesmen'] && tm[d + '_dokumentasi']) {
        return true;
      }

      // Cek localStorage browser untuk data yang tersimpan valid (bukan draft kosong)
      try {
        const u = FincestemCore.auth.getUser() || {};
        const idSet = new Set();
        [u.nisn, u.identifier, u.nis, u.username].forEach(val => {
          if (val) {
            const str = String(val).trim();
            if (str && str !== '-') {
              idSet.add(str);
              const unp = str.replace(/^0+/, '');
              if (unp) idSet.add(unp);
              if (unp.length === 9) idSet.add('0' + unp);
              if (unp.length === 8) idSet.add('00' + unp);
            }
          }
        });
        const idList = Array.from(idSet);
        for (const id of idList) {
          // Refleksi valid
          const reflFt = localStorage.getItem(`fincestem_refleksi_ft_day${d}_` + id);
          const reflNonFt = localStorage.getItem(`fincestem_refleksi_day${d}_` + id);
          if (reflFt || reflNonFt) {
            const raw = reflFt || reflNonFt;
            try {
              const p = JSON.parse(raw);
              if (p && (p.submitted || p.content || (typeof p === 'string' && p.trim().length > 10))) return true;
            } catch (err) {
              if (raw && raw.trim().length > 10) return true;
            }
          }
        }
      } catch (e) {}

      return false;
    },

    canAccessDay: function(dayNum, prog, daysSchedule) {
      const d = parseInt(dayNum);
      const sched = (daysSchedule || []).find(s => parseInt(s.day_number) === d);
      const isOpenByAdmin = sched ? Boolean(sched.is_open) : true;

      // Day 0 (Trial / Gladi)
      if (d === 0) {
        return {
          canAccess: true,
          canEdit: isOpenByAdmin,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: true,
          reason: isOpenByAdmin ? '' : 'Day Uji Coba ditutup oleh Admin (Hanya Lihat).'
        };
      }

      let isFt = false;
      try {
        const user = FincestemCore.auth.getUser() || {};
        const studentZone = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
          ? FincestemCore.zones.getStudentZone(user.nisn || user.identifier, user.class || user.class_name, user.zone)
          : (user.zone || '');
        const zUpper = (studentZone || '').toUpperCase();
        if (zUpper.includes('LUAR') || zUpper.includes('FIELD') || zUpper.includes('TRIP')) {
          isFt = true;
        }
      } catch (e) {}

      // 1. SISWA FIELD TRIP:
      // Harus memenuhi: (1) Jadwal Day ini terbuka oleh Admin/Tanggal (isOpenByAdmin), dan (2) Day sebelumnya selesai
      if (isFt) {
        const prevDone = (d <= 1) || this.isDayStudentTasksDone(prog, d - 1) || this.isDayCompleted(prog, d - 1);
        const canOpen = isOpenByAdmin && prevDone;
        return {
          canAccess: canOpen,
          canEdit: canOpen,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: prevDone,
          reason: !isOpenByAdmin 
            ? (sched ? sched.status_label : 'Aktivitas Day ' + d + ' belum dibuka sesuai jadwal resmi.') 
            : (prevDone ? '' : `Harap selesaikan seluruh aktivitas pengerjaan pada Day ${d - 1} terlebih dahulu.`)
        };
      }

      // 2. SISWA NON-FIELD TRIP:
      // Day 1: CAN_ACCESS_DAY_1 = (ADMIN_DAY_1 == OPEN)
      if (d === 1) {
        return {
          canAccess: true,
          canEdit: isOpenByAdmin,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: true,
          reason: isOpenByAdmin ? '' : (sched ? sched.status_label : 'Day 1 ditutup oleh Admin (Hanya Lihat).')
        };
      }

      // Day N (N > 1) Non-Field Trip:
      // Siswa TIDAK PERLU menunggu guru/fasilitator menetapkan status 'Completed'!
      // Cukup siswa telah menyelesaikan tugas mandiri pada Day N-1 (Modul, LKPD, Asesmen, Foto, dan Refleksi)
      // DAN jadwal Day ini harus terbuka (isOpenByAdmin).
      const prevDone = (d <= 1) || this.isDayStudentTasksDone(prog, d - 1) || this.isDayCompleted(prog, d - 1);
      if (!prevDone) {
        return {
          canAccess: false,
          canEdit: false,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: false,
          reason: `Harap selesaikan seluruh rangkaian tugas mandiri (Modul, LKPD, Asesmen, Foto, dan Refleksi) pada Day ${d - 1} terlebih dahulu.`
        };
      }

      return {
        canAccess: isOpenByAdmin,
        canEdit: isOpenByAdmin,
        isOpen: isOpenByAdmin,
        isPreviousCompleted: true,
        reason: isOpenByAdmin ? '' : (sched ? sched.status_label : `Day ${d} ditutup oleh Admin (Hanya Lihat).`)
      };
    },

    calculateFieldTripScore: function(dayNum, submitTime, studentNisn) {
      const d = parseInt(dayNum) || 1;
      const cleanNisn = String(studentNisn || '').trim();

      // 1. Cek Koreksi Darurat Admin (Emergency Manual Override)
      const emergency = (FincestemCore.zones && FincestemCore.zones.getStudentEmergencyGrading) 
        ? FincestemCore.zones.getStudentEmergencyGrading(cleanNisn, d) 
        : null;
      if (emergency) {
        const sc = parseFloat(emergency.score);
        const st = parseInt(emergency.stars) || (sc >= 90 ? 5 : 4);
        return {
          day_number: d,
          score: sc,
          stars: st,
          star_label: st === 5 ? '⭐⭐⭐⭐⭐ Bintang 5' : '⭐⭐⭐⭐☆ Bintang 4',
          predicate: sc >= 85.0 ? 'Mahir' : (sc >= 70.0 ? 'Cakap' : 'Berkembang'),
          is_emergency_override: true,
          reason: emergency.reason || 'Dispensasi Khusus (Kebijakan Admin)',
          approved_by: emergency.approved_by || 'admin',
          cutoff_perfect: '16:00',
          time_formatted: 'Koreksi Admin'
        };
      }

      // 2. Ambil Aturan Jam Batas Day Ini
      const rules = (FincestemCore.zones && FincestemCore.zones.getFTGradingRules) ? FincestemCore.zones.getFTGradingRules() : {};
      const dayRule = rules[d] || { cutoff_perfect: '16:00', cutoff_bintang5: '21:00', cutoff_bintang4: '23:59' };
      const cutoffPerfect = dayRule.cutoff_perfect || '16:00';
      const cutoffB5 = dayRule.cutoff_bintang5 || '21:00';
      const cutoffB4 = dayRule.cutoff_bintang4 || '23:59';

      // 3. Parse Jam & Menit Pengumpulan Siswa (WIB)
      let subHour = 12;
      let subMinute = 0;
      let subFormatted = '12:00 WIB';

      if (submitTime) {
        if (typeof submitTime === 'string') {
          const matchTime = submitTime.match(/(\d{1,2})[:.](\d{2})/);
          if (matchTime) {
            subHour = parseInt(matchTime[1]);
            subMinute = parseInt(matchTime[2]);
            subFormatted = `${String(subHour).padStart(2, '0')}:${String(subMinute).padStart(2, '0')} WIB`;
          } else {
            const dt = new Date(submitTime);
            if (!isNaN(dt.getTime())) {
              const utc = dt.getTime() + (dt.getTimezoneOffset() * 60000);
              const wibDt = new Date(utc + (3600000 * 7));
              subHour = wibDt.getHours();
              subMinute = wibDt.getMinutes();
              subFormatted = `${String(subHour).padStart(2, '0')}:${String(subMinute).padStart(2, '0')} WIB`;
            }
          }
        } else if (submitTime instanceof Date) {
          const utc = submitTime.getTime() + (submitTime.getTimezoneOffset() * 60000);
          const wibDt = new Date(utc + (3600000 * 7));
          subHour = wibDt.getHours();
          subMinute = wibDt.getMinutes();
          subFormatted = `${String(subHour).padStart(2, '0')}:${String(subMinute).padStart(2, '0')} WIB`;
        }
      } else {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibNow = new Date(utc + (3600000 * 7));
        subHour = wibNow.getHours();
        subMinute = wibNow.getMinutes();
        subFormatted = `${String(subHour).padStart(2, '0')}:${String(subMinute).padStart(2, '0')} WIB`;
      }

      const subTotalMinutes = (subHour * 60) + subMinute;

      const pParts = cutoffPerfect.split(':');
      const perfectMinutes = (parseInt(pParts[0]) * 60) + (parseInt(pParts[1] || 0));

      const b5Parts = cutoffB5.split(':');
      const b5Minutes = (parseInt(b5Parts[0]) * 60) + (parseInt(b5Parts[1] || 0));

      // SKEMA PENILAIAN RESMI:
      // A. Pukul 07.00 s.d. Batas Sempurna -> Nilai 100, Bintang 5
      if (subTotalMinutes <= perfectMinutes) {
        return {
          day_number: d,
          score: 100,
          stars: 5,
          star_label: '⭐⭐⭐⭐⭐ Bintang 5',
          predicate: 'Mahir',
          is_emergency_override: false,
          reason: 'Tuntas sebelum batas waktu kunjungan',
          cutoff_perfect: cutoffPerfect,
          time_formatted: subFormatted
        };
      }

      // B. Setelah Jam Kunjungan s.d. 21.00 WIB -> Bintang 5, Nilai 95 s.d. 99 (Turun 1 poin per jam)
      if (subTotalMinutes <= b5Minutes) {
        const diffHours = Math.floor((subTotalMinutes - perfectMinutes - 1) / 60);
        const score = Math.max(95, 99 - diffHours);
        return {
          day_number: d,
          score: score,
          stars: 5,
          star_label: '⭐⭐⭐⭐⭐ Bintang 5',
          predicate: 'Mahir',
          is_emergency_override: false,
          reason: 'Tuntas sore / petang hari',
          cutoff_perfect: cutoffPerfect,
          time_formatted: subFormatted
        };
      }

      // C. Pukul 21.01 s.d. 24.00 WIB -> Bintang 4, Nilai 90 s.d. 94
      if (subTotalMinutes <= 1440) {
        let score = 90;
        if (subTotalMinutes <= 1320) {
          score = (subMinute <= 30) ? 94 : 93;
        } else if (subTotalMinutes <= 1380) {
          score = (subMinute <= 30) ? 92 : 91;
        } else {
          score = 90;
        }
        return {
          day_number: d,
          score: score,
          stars: 4,
          star_label: '⭐⭐⭐⭐☆ Bintang 4',
          predicate: 'Mahir',
          is_emergency_override: false,
          reason: 'Tuntas malam hari',
          cutoff_perfect: cutoffPerfect,
          time_formatted: subFormatted
        };
      }

      // D. Lewat 24.00 WIB / Besoknya -> Bintang 4, Nilai 85
      return {
        day_number: d,
        score: 85,
        stars: 4,
        star_label: '⭐⭐⭐⭐☆ Bintang 4',
        predicate: 'Mahir',
        is_emergency_override: false,
        reason: 'Pengumpulan hari berikutnya',
        cutoff_perfect: cutoffPerfect,
        time_formatted: subFormatted
      };
    }
  },

  // Bank Feedback & Umpan Balik Pedagogis Otomatis Sesuai Bintang (1 - 5) & Tema Riset (Day 1 - 7)
  feedback: {
    generateThemedFeedback: function(dayNum, stars, isFieldTrip, score) {
      const d = parseInt(dayNum) || 1;
      const st = Math.max(1, Math.min(5, parseInt(stars) || (score >= 90 ? 5 : (score >= 80 ? 4 : (score >= 70 ? 3 : (score >= 60 ? 2 : 1))))));

      const ftFeedbacks = {
        1: {
          5: "Luar biasa! Pengelolaan budgeting uang saku sangat disiplin dan terencana, serta pengamatan alur logistik transportasi bandara tuntas tepat waktu dengan adab musafir yang sangat baik.",
          4: "Sangat baik! Perencanaan kas saku mandiri dan resume observasi logistik bandara tersusun rapi. Pertahankan kedisiplinan pencatatan pengeluaran harian.",
          3: "Cukup baik. Perencanaan anggaran kas telah dibuat, namun perhatikan ketepatan waktu pengumpulan dan ketelitian rincian pos dana darurat.",
          2: "Perlu peningkatan kedisiplinan waktu pelaporan dan kelengkapan rincian pos anggaran kas saku.",
          1: "Tugas terlambat dikumpulkan. Segera lengkapi lembar budgeting kas saku dan koordinasikan dengan pembina."
        },
        2: {
          5: "Eksplorasi istimewa! Analisis ketahanan arsitektur kolonial tropis Lawang Sewu serta observasi kepemimpinan disiplin teknologi di AKPOL terdokumentasi sangat mendalam dan tepat waktu.",
          4: "Sangat baik! Observasi sejarah cagar budaya dan teknologi material bangunan disajikan dengan runtut dan analitis.",
          3: "Cukup baik. Data sejarah dan observasi lapangan telah diisi, namun pendalaman aspek sains-arsitektur perlu lebih diperkuat.",
          2: "Perlu peningkatan fokus pada eksplorasi sains cagar budaya dan ketepatan waktu submit.",
          1: "Pengumpulan melewati batas waktu. Lakukan observasi budaya dan sains dengan lebih teliti."
        },
        3: {
          5: "Luar biasa! Pemahaman bioteknologi holtikultura kebun apel serta analisis fisika mekanika dan konversi energi wahana Museum Angkut sangat komprehensif dan otentik.",
          4: "Sangat baik! Laporan agrosains tanaman apel dan prinsip mekanika transportasi terangkum dengan bukti data yang akurat.",
          3: "Cukup baik. Pengamatan ekosistem dan wahana mekanika sudah dicatat, tingkatkan analisis integrasi STEM terapan.",
          2: "Analisis sains fisika terapan masih minim. Mohon lengkapi catatan lapangan dengan bimbingan fasilitator.",
          1: "Tugas dikumpulkan sangat terlambat. Lengkapi resume sains agrikultur dan fisika mekanika."
        },
        4: {
          5: "Spektakuler! Investigasi bentang alam vulkanik Bromo, adaptasi vegetasi kawah, dan dinamika lautan pasir dianalisis dengan nalar kritis yang tajam dan tuntas tepat waktu.",
          4: "Sangat baik! Dokumentasi dan pemahaman siklus geologi serta ekosistem kaldera Bromo terdokumentasi dengan sangat jelas.",
          3: "Cukup baik. Pengamatan bentang alam vulkanik sudah dipaparkan, perdalam hubungan antara material vulkanik dan kesuburan tanah.",
          2: "Laporan observasi ekosistem vulkanik masih ringkas. Perhatikan tenggat waktu pengumpulan.",
          1: "Keterlambatan pengumpulan tugas observasi alam Bromo. Segera perbaiki analisis geomorfologi."
        },
        5: {
          5: "Luar biasa membanggakan! Integrasi prinsip matematika fraktal candi, reaksi kimia pewarnaan batik alami, dan eksplorasi sains terapan di kampus UNY disintesis dengan sangat brilian!",
          4: "Sangat baik! Analisis geometri arsitektur candi serta proses sains batik ramah lingkungan dijelaskan dengan metodis.",
          3: "Cukup baik. Data sains budaya dan kunjungan kampus telah terisi, tingkatkan elaborasi konsep STEM terapan.",
          2: "Penjelasan kaitan sains dengan kebudayaan masih perlu diperdalam. Perhatikan kedisiplinan jadwal.",
          1: "Tugas terlambat. Segera lengkapi lembar observasi Prambanan, batik, dan sains UNY."
        },
        6: {
          5: "Sempurna! Analisis proses bioteknologi fermentasi pada UMKM bakpia dan observasi ekosistem pasang surut karst Pantai Drini disajikan dengan data ilmiah yang valid dan solutif.",
          4: "Sangat baik! Pemahaman bioteknologi pangan lokal serta dinamika geomorfologi pesisir terdokumentasi dengan rapi.",
          3: "Cukup baik. Pengamatan industri pangan dan pesisir telah diinput, perkuat ulasan pengaruh salinitas air laut.",
          2: "Data eksplorasi pesisir dan proses pangan masih kurang detail. Tingkatkan ketepatan waktu.",
          1: "Pengumpulan melewati batas waktu kunjungan. Lengkapi segera data bioteknologi dan oseanografi."
        },
        7: {
          5: "Istimewa! Rekonsiliasi tutup buku kas saku 100% seimbang dan transparan. Refleksi makna perjalanan kokurikuler mencerminkan kemandirian, nalar kritis, dan profil pelajar Pancasila yang paripurna!",
          4: "Sangat baik! Pembukuan kas saku tertib dan saldo akhir terverifikasi. Refleksi perjalanan merangkum pembelajaran 4 pilar dengan berkesan.",
          3: "Cukup baik. Tutup buku kas saku telah diselesaikan. Refleksi kesan pesan telah tercatat dengan cukup baik.",
          2: "Perhitungan saldo kas saku dan catatan refleksi masih memerlukan perapian. Hubungi fasilitator.",
          1: "Pengumpulan laporan akhir dan kas saku terlambat. Segera tuntaskan pertanggungjawaban mandiri."
        }
      };

      const nonFtFeedbacks = {
        1: {
          5: "Luar biasa! Analisis rantai pasok pangan dan investigasi awal pertanian di OKU Timur terdokumentasi sangat cermat dan tepat waktu.",
          4: "Sangat baik! Pengamatan sistem pangan dan pemetaan data awal tersusun dengan rapi dan logis.",
          3: "Cukup baik. Data awal riset sudah dihimpun, tingkatkan kedalaman analisis kebutuhan pertanian.",
          2: "Data riset masih terbatas. Perhatikan ketepatan waktu dan kelengkapan bukti dokumentasi.",
          1: "Tugas terlambat dikumpulkan. Segera konsultasikan kendala riset bersama fasilitator."
        },
        2: {
          5: "Hebat! Observasi hidrologi Bendung Komering dan distribusi air irigasi primer dikaji dengan data sains yang komprehensif.",
          4: "Sangat baik! Deskripsi fungsi irigasi dan tata kelola air terdokumentasi dengan baik.",
          3: "Cukup baik. Laporan irigasi sudah masuk, tambahkan parameter debit dan kebersihan air.",
          2: "Analisis ekosistem irigasi belum mendalam. Tingkatkan ketelitian data lapangan.",
          1: "Laporan belum memenuhi standar waktu. Lengkapi segera jurnal irigasi lokal."
        },
        3: {
          5: "Sempurna! Investigasi struktur tanah, pH lahan persawahan, dan sains pemupukan dianalisis dengan metode ilmiah yang valid.",
          4: "Sangat baik! Pemahaman agroteknologi dan pengujian unsur hara tanah disajikan secara sistematis.",
          3: "Cukup baik. Hasil uji tanah telah dilaporkan, perdalam saran perbaikan mutu tanah.",
          2: "Data sains lahan masih kurang terverifikasi. Diskusikan dengan kelompok.",
          1: "Pengumpulan terlambat. Lakukan pengukuran ulang parameter tanah di lapangan."
        },
        4: {
          5: "Luar biasa! Perhitungan HPP gabah, margin keuntungan usaha tani, dan literasi finansial disajikan dengan akurat dan mandiri.",
          4: "Sangat baik! Pembukuan analisis biaya produksi padi tersusun rapi dan terukur.",
          3: "Cukup baik. Rincian pengeluaran telah ada, lengkapi estimasi penyusutan alat pertanian.",
          2: "Kalkulasi finansial masih belum seimbang. Teliti kembali angka-angka biaya produksi.",
          1: "Laporan keuangan belum tuntas tepat waktu. Koordinasikan dengan pembina."
        },
        5: {
          5: "Istimewa! Eksplorasi tradisi sambatan gotong royong dan kearifan adat Komering dipadukan dengan nalar kebhinekaan yang luhur.",
          4: "Sangat baik! Dokumentasi nilai budaya lokal dan etnosains tersaji dengan narasi yang bermakna.",
          3: "Cukup baik. Catatan adat istiadat telah ditulis, perkuat kaitannya dengan pembentukan karakter.",
          2: "Uraian nilai budaya masih terlalu singkat. Perdalam wawancara dengan tokoh setempat.",
          1: "Tugas kebudayaan terlambat. Lengkapi segera catatan etnosains lokal."
        },
        6: {
          5: "Sangat inovatif! Analisis nilai tambah pengolahan produk turunan beras dan strategi pemasaran UMKM mandiri dipaparkan dengan solutif.",
          4: "Sangat baik! Alur produksi dan analisis pasar UMKM pangan lokal terdokumentasi dengan jelas.",
          3: "Cukup baik. Informasi olahan pangan telah tersusun, perkuat strategi diferensiasi produk.",
          2: "Inovasi produk belum dijelaskan secara konkret. Perhatikan tenggat submit.",
          1: "Tugas terlambat diserahkan. Segera tuntaskan lembar kerja inovasi pangan."
        },
        7: {
          5: "Paripurna! Diseminasi hasil riset, pameran portofolio, dan refleksi 4 pilar FINCESTEM mencerminkan profil pelajar berprestasi dan berkarakter kuat!",
          4: "Sangat baik! Sintesis laporan akhir tersaji secara utuh, komunikatif, dan akuntabel.",
          3: "Cukup baik. Portofolio riset telah disatukan, sempurnakan kesimpulan dan rekomendasi aksi.",
          2: "Refleksi akhir masih membutuhkan penguatan pada capaian dimensi mandiri dan bernalar kritis.",
          1: "Pengumpulan laporan akhir terlambat. Segera lengkapi seluruh lembar pertanggungjawaban."
        }
      };

      const source = isFieldTrip ? ftFeedbacks : nonFtFeedbacks;
      const dayData = source[d] || source[1];
      return dayData[st] || dayData[5];
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

    setBtnLoading: function(btn, isLoading, loadingText, defaultText, defaultIcon) {
      if (!btn) return;
      if (typeof btn === 'string') btn = document.getElementById(btn);
      if (!btn) return;

      if (isLoading) {
        if (!btn._origHtml) btn._origHtml = btn.innerHTML;
        btn.classList.add('pointer-events-none', 'opacity-80');
        btn.innerHTML = '<span class="material-symbols-outlined text-lg animate-spin">refresh</span><span>' + (loadingText || 'Menyimpan...') + '</span>';
      } else {
        btn.classList.remove('pointer-events-none', 'opacity-80');
        if (defaultText) {
          const icon = defaultIcon || 'task_alt';
          btn.innerHTML = '<span class="material-symbols-outlined text-lg">' + icon + '</span><span>' + defaultText + '</span>';
        } else if (btn._origHtml) {
          btn.innerHTML = btn._origHtml;
        }
      }
    },

    attachPinchZoom: function(containerEl, imgEl, options) {
      if (!containerEl || !imgEl) return null;
      options = options || {};
      let scale = 1;
      const minScale = options.minScale || 1;
      const maxScale = options.maxScale || 5;
      let panX = 0;
      let panY = 0;
      let panStartX = 0;
      let panStartY = 0;
      let isDragging = false;
      let isPinching = false;
      let initialPinchDist = 0;
      let initialScale = 1;
      let lastTapTime = 0;
      let tapStartX = 0;
      let tapStartY = 0;

      // KUNCI UTAMA MOBILE:
      // 1. Container menampung touch-action: none agar browser TIDAK mencegat cubitan 2 jari
      // 2. Gambar dijadikan pointer-events: none agar SELURUH event touch langsung diterima containerEl secara murni tanpa bubbling bentrok
      containerEl.style.touchAction = 'none';
      containerEl.style.userSelect = 'none';
      containerEl.style.webkitUserSelect = 'none';
      containerEl.style.overflow = 'hidden';

      imgEl.style.touchAction = 'none';
      imgEl.style.userSelect = 'none';
      imgEl.style.webkitUserSelect = 'none';
      imgEl.style.webkitTouchCallout = 'none';
      imgEl.style.pointerEvents = 'none';
      imgEl.style.transformOrigin = 'center center';
      imgEl.style.willChange = 'transform';

      function updateTransform(animate) {
        if (!imgEl) return;
        if (animate) {
          imgEl.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          imgEl.style.transition = 'none';
        }
        imgEl.style.transform = 'translate3d(' + panX + 'px, ' + panY + 'px, 0) scale(' + scale + ')';
        if (typeof options.onZoom === 'function') {
          options.onZoom(scale);
        }
      }

      function resetZoom(animate) {
        scale = 1;
        panX = 0;
        panY = 0;
        updateTransform(animate !== false);
      }

      function setZoom(newScale, animate) {
        scale = Math.min(Math.max(newScale, minScale), maxScale);
        if (scale <= 1.02) {
          panX = 0;
          panY = 0;
        }
        updateTransform(animate !== false);
      }

      function getTouchDist(t0, t1) {
        const dx = t1.clientX - t0.clientX;
        const dy = t1.clientY - t0.clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }

      // Handler Multi-Touch HP (Android & iOS Safari)
      function handleTouchStart(e) {
        if (e.cancelable) e.preventDefault();

        if (e.touches.length >= 2) {
          // Cubit 2 Jari Dimulai
          isPinching = true;
          isDragging = false;
          initialPinchDist = getTouchDist(e.touches[0], e.touches[1]);
          initialScale = scale;
          lastTapTime = 0;
        } else if (e.touches.length === 1) {
          isPinching = false;
          const t = e.touches[0];
          tapStartX = t.clientX;
          tapStartY = t.clientY;

          const now = Date.now();
          if (now - lastTapTime < 320) {
            // Ketuk 2x Cepat (Double Tap to Zoom)
            if (scale > 1.2) {
              resetZoom(true);
            } else {
              setZoom(2.5, true);
            }
            lastTapTime = 0;
            isDragging = false;
            return;
          }
          lastTapTime = now;

          if (scale > 1.02) {
            isDragging = true;
            panStartX = t.clientX - panX;
            panStartY = t.clientY - panY;
          } else {
            isDragging = false;
          }
        }
      }

      function handleTouchMove(e) {
        if (e.cancelable) e.preventDefault();

        if (e.touches.length >= 2) {
          // Gerakan Cubit 2 Jari
          const currentDist = getTouchDist(e.touches[0], e.touches[1]);

          // Jika jarak cubitan awal belum terdeteksi (misal jari ke-2 mendarat di tengah geser)
          if (!isPinching || initialPinchDist < 5) {
            initialPinchDist = currentDist;
            initialScale = scale;
            isPinching = true;
            isDragging = false;
            return;
          }

          const factor = currentDist / initialPinchDist;
          scale = Math.min(Math.max(initialScale * factor, minScale), maxScale);

          if (scale <= 1.02) {
            panX = 0;
            panY = 0;
          }
          updateTransform(false);
        } else if (e.touches.length === 1 && (isDragging || scale > 1.02)) {
          // Geser 1 Jari (Pan) saat foto sedang dizoom
          const t = e.touches[0];
          if (!isDragging) {
            isDragging = true;
            panStartX = t.clientX - panX;
            panStartY = t.clientY - panY;
          }

          panX = t.clientX - panStartX;
          panY = t.clientY - panStartY;

          // Batasi agar foto tidak melayang keluar layar
          const rect = containerEl ? containerEl.getBoundingClientRect() : { width: 360, height: 480 };
          const maxPanX = Math.max(0, (rect.width * (scale - 1)) / 1.8);
          const maxPanY = Math.max(0, (rect.height * (scale - 1)) / 1.8);
          panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
          panY = Math.max(-maxPanY, Math.min(maxPanY, panY));

          updateTransform(false);
        }
      }

      function handleTouchEnd(e) {
        if (e.touches.length >= 2) {
          // Masih ada 2 jari yang menyentuh
          initialPinchDist = getTouchDist(e.touches[0], e.touches[1]);
          initialScale = scale;
        } else if (e.touches.length === 1) {
          // Berpindah dari 2 jari ke 1 jari
          isPinching = false;
          initialPinchDist = 0;
          if (scale > 1.02) {
            isDragging = true;
            const t = e.touches[0];
            panStartX = t.clientX - panX;
            panStartY = t.clientY - panY;
          }
        } else {
          // Seluruh jari terangkat
          isPinching = false;
          isDragging = false;
          initialPinchDist = 0;
          if (scale < 1.05) {
            resetZoom(true);
          }
        }
      }

      // Listener dipasang HANYA pada containerEl (tanpa duplikasi pada imgEl)
      containerEl.addEventListener('touchstart', handleTouchStart, { passive: false });
      containerEl.addEventListener('touchmove', handleTouchMove, { passive: false });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: false });
      containerEl.addEventListener('touchcancel', handleTouchEnd, { passive: false });

      // Mouse drag & wheel pada Laptop/PC
      containerEl.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        if (scale > 1.02) {
          isDragging = true;
          panStartX = e.clientX - panX;
          panStartY = e.clientY - panY;
          containerEl.style.cursor = 'grabbing';
          if (e.cancelable) e.preventDefault();
        }
      });
      window.addEventListener('mousemove', function(e) {
        if (isDragging && scale > 1.02) {
          panX = e.clientX - panStartX;
          panY = e.clientY - panStartY;
          const rect = containerEl ? containerEl.getBoundingClientRect() : { width: 360, height: 480 };
          const maxPanX = Math.max(0, (rect.width * (scale - 1)) / 1.8);
          const maxPanY = Math.max(0, (rect.height * (scale - 1)) / 1.8);
          panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
          panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
          updateTransform(false);
        }
      });
      window.addEventListener('mouseup', function() {
        if (isDragging) {
          isDragging = false;
          if (containerEl) containerEl.style.cursor = scale > 1.02 ? 'grab' : 'default';
        }
      });
      containerEl.addEventListener('wheel', function(e) {
        if (e.cancelable) e.preventDefault();
        const delta = e.deltaY < 0 ? 0.35 : -0.35;
        setZoom(scale + delta, true);
      }, { passive: false });

      // Double Click pada Desktop
      containerEl.addEventListener('dblclick', function(e) {
        if (e.cancelable) e.preventDefault();
        if (scale > 1.2) {
          resetZoom(true);
        } else {
          setZoom(2.5, true);
        }
      });

      return {
        reset: function() { resetZoom(true); },
        zoomIn: function() { setZoom(scale + 0.5, true); },
        zoomOut: function() { setZoom(scale - 0.5, true); },
        getScale: function() { return scale; },
        setScale: function(s) { setZoom(s, true); }
      };
    },

    openLightbox: function(imgUrl, caption) {
      let modal = document.getElementById('lightboxModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightboxModal';
        modal.className = 'fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-3 sm:p-5 transition-all duration-300 opacity-0 pointer-events-none select-none';
        modal.innerHTML = `
          <!-- Toolbar Atas: Judul, Kontrol Zoom & Tombol Tutup -->
          <div class="w-full max-w-4xl flex items-center justify-between gap-2 pb-2 text-white border-b border-white/15 shrink-0 z-10">
            <div class="flex items-center gap-2 min-w-0">
              <span class="material-symbols-outlined text-amber-400 text-lg sm:text-xl">zoom_in</span>
              <span class="text-xs sm:text-sm font-bold truncate">Pratinjau Foto Dokumentasi</span>
            </div>
            
            <!-- Toolbar Zoom -->
            <div class="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-full backdrop-blur-md">
              <button id="lightboxBtnZoomOut" type="button" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer" title="Perkecil">
                <span class="material-symbols-outlined text-base">remove</span>
              </button>
              <button id="lightboxBtnResetZoom" type="button" class="px-2.5 h-7 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-amber-300 font-extrabold text-[11px] flex items-center justify-center transition-all cursor-pointer" title="Reset Zoom (100%)">
                <span id="lightboxZoomLevel">100%</span>
              </button>
              <button id="lightboxBtnZoomIn" type="button" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer" title="Perbesar">
                <span class="material-symbols-outlined text-base">add</span>
              </button>
            </div>

            <!-- Tombol Tutup -->
            <button onclick="FincestemCore.ui.closeLightbox()" class="text-white hover:text-amber-400 flex items-center gap-1 font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer">
              <span class="material-symbols-outlined text-base">close</span>
              <span class="hidden sm:inline">Tutup</span>
            </button>
          </div>

          <!-- Container Gambar Interaktif (Pinch-to-zoom dengan 2 jari) -->
          <div id="lightboxImgContainer" class="relative flex-1 w-full max-w-4xl flex items-center justify-center overflow-hidden my-2 cursor-grab active:cursor-grabbing touch-none select-none">
            <img id="lightboxImg" class="max-h-[74vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20 select-none pointer-events-none touch-none" src="" alt="Pratinjau Foto">
          </div>

          <!-- Bagian Bawah: Caption & Petunjuk Sentuh -->
          <div class="w-full max-w-4xl flex flex-col items-center gap-1.5 pt-1.5 shrink-0 z-10">
            <p id="lightboxCaption" class="text-center text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 bg-black/60 rounded-xl backdrop-blur-md max-w-2xl border border-white/10"></p>
            <span class="text-[10px] text-white/60 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">pinch</span>
              Cubit 2 jari untuk zoom • Ketuk 2x untuk perbesar • Geser untuk navigasi
            </span>
          </div>
        `;
        document.body.appendChild(modal);

        const imgContainer = document.getElementById('lightboxImgContainer');
        const imgEl = document.getElementById('lightboxImg');
        const zoomLevelEl = document.getElementById('lightboxZoomLevel');

        window._lightboxZoomController = FincestemCore.ui.attachPinchZoom(imgContainer, imgEl, {
          minScale: 1,
          maxScale: 4,
          onZoom: function(scale) {
            if (zoomLevelEl) {
              zoomLevelEl.textContent = Math.round(scale * 100) + '%';
            }
          }
        });

        document.getElementById('lightboxBtnZoomIn').addEventListener('click', function(e) {
          e.stopPropagation();
          if (window._lightboxZoomController) window._lightboxZoomController.zoomIn();
        });
        document.getElementById('lightboxBtnZoomOut').addEventListener('click', function(e) {
          e.stopPropagation();
          if (window._lightboxZoomController) window._lightboxZoomController.zoomOut();
        });
        document.getElementById('lightboxBtnResetZoom').addEventListener('click', function(e) {
          e.stopPropagation();
          if (window._lightboxZoomController) window._lightboxZoomController.reset();
        });

        modal.addEventListener('click', function(e) {
          if (e.target === modal) FincestemCore.ui.closeLightbox();
        });
      }

      if (window._lightboxZoomController) {
        window._lightboxZoomController.reset();
      }
      document.getElementById('lightboxImg').src = imgUrl;
      document.getElementById('lightboxCaption').textContent = caption || 'Dokumentasi FINCESTEM SMAN 1 Belitang';
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
    },

    closeLightbox: function() {
      const modal = document.getElementById('lightboxModal');
      if (modal) {
        if (window._lightboxZoomController) {
          window._lightboxZoomController.reset();
        }
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  },

  // Manajemen Penugasan Koordinator & Fasilitator
  assignments: {
    getAllClasses: function() {
      const list = [];
      ['X', 'XI', 'XII'].forEach(g => {
        for (let i = 1; i <= 11; i++) {
          list.push(`KELAS ${g}.${i}`);
        }
      });
      return list;
    },

    getAssignments: function(callback) {
      const self = this;
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php?action=get_role_assignments&_t=' + Date.now(), { cache: 'no-store' })
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              localStorage.setItem('fincestem_role_assignments', JSON.stringify(res.data));
              if (res.data.mentorship_state && window.FincestemMentorship && typeof window.FincestemMentorship.applyServerState === 'function') {
                window.FincestemMentorship.applyServerState(res.data.mentorship_state);
              }
              if (callback) callback(res.data);
            } else {
              self.getLocalAssignments(callback);
            }
          })
          .catch(() => self.getLocalAssignments(callback));
      } else {
        self.getLocalAssignments(callback);
      }
    },

    getLocalAssignments: function(callback) {
      let data = { coordinators: [], facilitators: [], evaluations: [], final_grades: [] };
      try {
        const stored = localStorage.getItem('fincestem_role_assignments');
        if (stored) data = JSON.parse(stored);
        if (data && data.mentorship_state && window.FincestemMentorship && typeof window.FincestemMentorship.applyServerState === 'function') {
          window.FincestemMentorship.applyServerState(data.mentorship_state);
        }
      } catch (e) {}
      if (callback) callback(data);
      return data;
    },

    normalizeClassName: function(name) {
      if (!name) return '';
      return String(name).trim().toUpperCase().replace(/^KELAS\s+/i, '');
    },

    getStudentCoordinator: function(nisn, className) {
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
        const info = window.FincestemMentorship.getMentorsForStudent(nisn, className);
        if (info && info.coordinator && info.coordinator !== '-') {
          return info.coordinator;
        }
      }
      return this.getClassCoordinator(className);
    },

    getStudentFacilitator: function(nisn, className) {
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForStudent === 'function') {
        const info = window.FincestemMentorship.getMentorsForStudent(nisn, className);
        if (info && info.facilitators && info.facilitators.length > 0) {
          return info.facilitators.join('\n');
        }
        if (info && info.facilitator && info.facilitator !== '-') {
          return info.facilitator;
        }
      }
      return this.getClassFacilitator(className);
    },

    getClassCoordinator: function(className) {
      if (!className) return 'Drs. H. Koordinator FINCESTEM';
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForClass === 'function') {
        const mClass = window.FincestemMentorship.getMentorsForClass(className);
        if (mClass && Array.isArray(mClass.coordinators) && mClass.coordinators.length > 0) {
          return mClass.coordinators.join('\n');
        }
      }
      const normTarget = this.normalizeClassName(className);
      const local = this.getLocalAssignments();
      const matches = (local.coordinators || []).filter(c => this.normalizeClassName(c.class_name) === normTarget);
      if (matches.length > 0) {
        const names = matches.map(c => c.teacher_name || c.teacher_username).filter(Boolean);
        const uniqueNames = [...new Set(names)];
        if (uniqueNames.length > 0) return uniqueNames.join('\n');
      }
      try {
        const classInfo = FincestemCore.zones && FincestemCore.zones.getClassInfo ? FincestemCore.zones.getClassInfo(className) : null;
        if (classInfo && classInfo.coordinator_name && classInfo.coordinator_name !== 'Drs. H. Koordinator FINCESTEM') {
          return classInfo.coordinator_name;
        }
      } catch (e) {}
      return 'Drs. H. Koordinator FINCESTEM';
    },

    getClassFacilitator: function(className) {
      if (!className) return 'Tim Fasilitator SMAN 1 Belitang';
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getMentorsForClass === 'function') {
        const mClass = window.FincestemMentorship.getMentorsForClass(className);
        if (mClass && Array.isArray(mClass.facilitators) && mClass.facilitators.length > 0) {
          return mClass.facilitators.join('\n');
        }
      }
      const normTarget = this.normalizeClassName(className);
      const local = this.getLocalAssignments();
      const matches = (local.facilitators || []).filter(f => this.normalizeClassName(f.class_name) === normTarget);
      if (matches.length > 0) {
        const names = matches.map(f => f.teacher_name || f.teacher_username).filter(Boolean);
        const uniqueNames = [...new Set(names)];
        if (uniqueNames.length > 0) return uniqueNames.join('\n');
      }
      try {
        const classInfo = FincestemCore.zones && FincestemCore.zones.getClassInfo ? FincestemCore.zones.getClassInfo(className) : null;
        if (classInfo && classInfo.facilitator_name && classInfo.facilitator_name !== 'Tim Fasilitator SMAN 1 Belitang') {
          return classInfo.facilitator_name;
        }
      } catch (e) {}
      return 'Tim Fasilitator SMAN 1 Belitang';
    },

    saveCoordinatorClasses: function(teacherUser, teacherName, classes, callback) {
      const self = this;
      const payload = {
        action: 'save_coordinator_classes',
        teacher_username: teacherUser,
        teacher_name: teacherName,
        classes: classes
      };

      try {
        let local = self.getLocalAssignments();
        if (!Array.isArray(local.coordinators)) local.coordinators = [];
        local.coordinators = local.coordinators.filter(c => c.teacher_username !== teacherUser);
        classes.forEach(cls => {
          local.coordinators.push({
            teacher_username: teacherUser,
            teacher_name: teacherName,
            class_name: cls
          });
        });
        localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => {
            if (callback) callback({ success: true, message: `Penugasan koordinator ${teacherName} tersimpan.` });
          });
      } else {
        if (callback) callback({ success: true, message: `Penugasan koordinator ${teacherName} tersimpan.` });
      }
    },

    assignFacilitator: function(teacherUser, teacherName, className, callback) {
      const self = this;
      let local = self.getLocalAssignments();
      if (!Array.isArray(local.facilitators)) local.facilitators = [];

      // VALIDASI KETAT: 1 GURU HANYA BOLEH MENJADI FASILITATOR PADA 1 KELAS!
      const existing = local.facilitators.find(f => f.teacher_username === teacherUser);
      if (existing && existing.class_name !== className) {
        const errMsg = `Guru ini sudah terdaftar sebagai fasilitator di kelas ${existing.class_name}. Satu guru hanya dapat menjadi fasilitator pada satu kelas.`;
        if (callback) callback({ success: false, message: errMsg });
        return;
      }

      const payload = {
        action: 'assign_facilitator',
        teacher_username: teacherUser,
        teacher_name: teacherName,
        class_name: className
      };

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(r => r.json())
          .then(res => {
            if (res && res.success) {
              local.facilitators = local.facilitators.filter(f => f.teacher_username !== teacherUser);
              local.facilitators.push({ teacher_username: teacherUser, teacher_name: teacherName, class_name: className });
              localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
            }
            if (callback) callback(res);
          })
          .catch(() => {
            local.facilitators = local.facilitators.filter(f => f.teacher_username !== teacherUser);
            local.facilitators.push({ teacher_username: teacherUser, teacher_name: teacherName, class_name: className });
            localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
            if (callback) callback({ success: true, message: `Guru ${teacherName} berhasil ditugaskan sebagai fasilitator kelas ${className}.` });
          });
      } else {
        local.facilitators = local.facilitators.filter(f => f.teacher_username !== teacherUser);
        local.facilitators.push({ teacher_username: teacherUser, teacher_name: teacherName, class_name: className });
        localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
        if (callback) callback({ success: true, message: `Guru ${teacherName} berhasil ditugaskan sebagai fasilitator kelas ${className}.` });
      }
    },

    removeFacilitator: function(teacherUser, className, callback) {
      try {
        let local = this.getLocalAssignments();
        if (Array.isArray(local.facilitators)) {
          local.facilitators = local.facilitators.filter(f => f.teacher_username !== teacherUser);
          localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
        }
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'remove_facilitator', teacher_username: teacherUser, class_name: className })
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true }); });
      } else {
        if (callback) callback({ success: true });
      }
    },

    removeCoordinator: function(teacherUser, className, callback) {
      try {
        let local = this.getLocalAssignments();
        if (Array.isArray(local.coordinators)) {
          if (className) {
            local.coordinators = local.coordinators.filter(c => !(c.teacher_username === teacherUser && c.class_name === className));
          } else {
            local.coordinators = local.coordinators.filter(c => c.teacher_username !== teacherUser);
          }
          localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
        }
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'remove_coordinator', teacher_username: teacherUser, class_name: className })
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true }); });
      } else {
        if (callback) callback({ success: true });
      }
    },

    getCoordinatorData: function(coordUser, callback) {
      const self = this;
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php?action=get_coordinator_data&coordinator_user=' + encodeURIComponent(coordUser) + '&_t=' + Date.now(), { cache: 'no-store' })
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              if (Array.isArray(res.data.students)) {
                res.data.students.forEach(st => {
                  const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
                    ? FincestemCore.zones.getStudentZone(st.nisn, st.class_name, st.zone)
                    : (st.zone || 'FINCESTEM OKU TIMUR');
                  const finalZone = st.zone || z;
                  st.zone = finalZone;
                  st.is_field_trip = String(finalZone).toUpperCase().includes('LUAR');
                });
              }
              if (callback) callback(res.data);
            } else {
              self.getLocalCoordinatorData(coordUser, callback);
            }
          })
          .catch(() => self.getLocalCoordinatorData(coordUser, callback));
      } else {
        self.getLocalCoordinatorData(coordUser, callback);
      }
    },

    getLocalCoordinatorData: function(coordUser, callback) {
      const local = this.getLocalAssignments();
      const allStudents = window.FincestemMasterStudents || [];

      // Prioritaskan data Pembagian Siswa Binaan (FincestemMentorship)
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
        const assignMap = window.FincestemMentorship.getAssignmentsMap();
        const roleMap = window.FincestemMentorship.getTeacherRoleMap();
        const linkedMap = window.FincestemMentorship.getFacilitatorCoordinatorsMap ? window.FincestemMentorship.getFacilitatorCoordinatorsMap() : {};
        const allTeachers = window.FincestemMentorship.getAllTeachers();

        let directNisns = Array.isArray(assignMap[coordUser]) ? assignMap[coordUser].slice() : [];
        // Juga cek fasilitator yang ditautkan ke koordinator ini
        Object.keys(linkedMap).forEach(fasilUser => {
          if (linkedMap[fasilUser] === coordUser && Array.isArray(assignMap[fasilUser])) {
            directNisns = directNisns.concat(assignMap[fasilUser]);
          }
        });
        directNisns = [...new Set(directNisns.map(x => String(x).trim()).filter(Boolean))];

        if (directNisns.length > 0) {
          const nisnSet = new Set(directNisns);
          const students = allStudents.filter(s => nisnSet.has(String(s.nisn).trim()));
          const coordClasses = FincestemCore.sortClasses([...new Set(students.map(s => s.class).filter(Boolean))]);

          // Cari fasilitator yang membina siswa-siswa di kelompok/kelas binaan koordinator ini
          const fasils = [];
          const fasilPerformance = [];
          allTeachers.forEach(t => {
            if (t.username === coordUser) return;
            const tRole = roleMap[t.username] || t.mentorship_role || 'NON_FIELD_TRIP';
            if (tRole === 'KOORDINATOR') return;
            const fNisns = (assignMap[t.username] || []).filter(n => nisnSet.has(String(n).trim()));
            if (fNisns.length > 0 || linkedMap[t.username] === coordUser) {
              const fStudents = allStudents.filter(s => (assignMap[t.username] || []).includes(String(s.nisn).trim()));
              const fClasses = [...new Set(fStudents.map(s => s.class).filter(Boolean))].join(', ') || 'Kelompok Binaan';
              fasils.push({
                teacher_username: t.username,
                teacher_name: t.nama_guru,
                class_name: fClasses
              });
              fasilPerformance.push({
                teacher_username: t.username,
                teacher_name: t.nama_guru,
                class_name: fClasses,
                total_students: fStudents.length,
                graded_count: 0,
                unreviewed_count: fStudents.length,
                last_activity: null,
                coordinator_rating: null,
                coordinator_notes: ''
              });
            }
          });

          const out = {
            classes: coordClasses,
            facilitators: fasils,
            fasil_performance: fasilPerformance,
            students: students.map(s => {
              let stProg = null;
              try {
                const pStr = localStorage.getItem('fincestem_progress_' + s.nisn);
                if (pStr) stProg = JSON.parse(pStr);
              } catch (e) {}
              const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
                ? FincestemCore.zones.getStudentZone(s.nisn, s.class, s.zone)
                : (s.zone || 'FINCESTEM OKU TIMUR');
              return {
                nisn: s.nisn,
                name: s.nama,
                class_name: s.class,
                nis: s.nis,
                zone: z,
                is_field_trip: String(z).toUpperCase().includes('LUAR'),
                completed_days: stProg ? (stProg.completed_days || 0) : 0,
                percentage: stProg ? (stProg.percentage || 0) : 0,
                task_status: stProg ? (FincestemCore.progress.getDayStatus(stProg, 1)) : 'belum_mulai',
                avg_score: stProg ? stProg.average_score : null,
                final_score: null
              };
            }),
            summary: {
              total_classes: coordClasses.length,
              total_facilitators: fasils.length,
              total_students: students.length
            }
          };
          if (callback) callback(out);
          return out;
        }
      }

      const coordClasses = FincestemCore.sortClasses(
        (local.coordinators || [])
          .filter(c => c.teacher_username === coordUser)
          .map(c => c.class_name)
      );

      const fasils = (local.facilitators || []).filter(f => coordClasses.includes(f.class_name));
      const students = allStudents.filter(s => coordClasses.includes(s.class));

      const fasilPerformance = fasils.map(f => {
        const classStudents = students.filter(s => s.class === f.class_name);
        return {
          teacher_username: f.teacher_username,
          teacher_name: f.teacher_name || f.teacher_username,
          class_name: f.class_name,
          total_students: classStudents.length,
          graded_count: 0,
          unreviewed_count: 0,
          last_activity: null,
          coordinator_rating: null,
          coordinator_notes: ''
        };
      });

      const out = {
        classes: coordClasses,
        facilitators: fasils,
        fasil_performance: fasilPerformance,
        students: students.map(s => {
          let stProg = null;
          try {
            const pStr = localStorage.getItem('fincestem_progress_' + s.nisn);
            if (pStr) stProg = JSON.parse(pStr);
          } catch (e) {}
          const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
            ? FincestemCore.zones.getStudentZone(s.nisn, s.class, s.zone)
            : (s.zone || 'FINCESTEM OKU TIMUR');
          return {
            nisn: s.nisn,
            name: s.nama,
            class_name: s.class,
            nis: s.nis,
            zone: z,
            is_field_trip: String(z).toUpperCase().includes('LUAR'),
            completed_days: stProg ? (stProg.completed_days || 0) : 0,
            percentage: stProg ? (stProg.percentage || 0) : 0,
            task_status: stProg ? (FincestemCore.progress.getDayStatus(stProg, 1)) : 'belum_mulai',
            avg_score: stProg ? stProg.average_score : null,
            final_score: null
          };
        }),
        summary: {
          total_classes: coordClasses.length,
          total_facilitators: fasils.length,
          total_students: students.length
        }
      };
      if (callback) callback(out);
      return out;
    },

    getFacilitatorData: function(fasilUser, callback) {
      const self = this;
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php?action=get_facilitator_data&facilitator_user=' + encodeURIComponent(fasilUser) + '&_t=' + Date.now(), { cache: 'no-store' })
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              if (Array.isArray(res.data.students)) {
                res.data.students.forEach(st => {
                  const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
                    ? FincestemCore.zones.getStudentZone(st.nisn, st.class_name, st.zone)
                    : (st.zone || 'FINCESTEM OKU TIMUR');
                  const finalZone = st.zone || z;
                  st.zone = finalZone;
                  st.is_field_trip = String(finalZone).toUpperCase().includes('LUAR');
                });
              }
              if (callback) callback(res.data);
            } else {
              self.getLocalFacilitatorData(fasilUser, callback);
            }
          })
          .catch(() => self.getLocalFacilitatorData(fasilUser, callback));
      } else {
        self.getLocalFacilitatorData(fasilUser, callback);
      }
    },

    getLocalFacilitatorData: function(fasilUser, callback) {
      const allStudents = window.FincestemMasterStudents || [];

      // Prioritaskan data Pembagian Siswa Binaan (FincestemMentorship)
      if (window.FincestemMentorship && typeof window.FincestemMentorship.getAssignmentsMap === 'function') {
        const assignMap = window.FincestemMentorship.getAssignmentsMap();
        const binaanNisns = assignMap[fasilUser] || [];
        if (Array.isArray(binaanNisns) && binaanNisns.length > 0) {
          const nisnSet = new Set(binaanNisns.map(n => String(n).trim()));
          const students = allStudents.filter(s => nisnSet.has(String(s.nisn).trim()));
          const classSet = [...new Set(students.map(s => s.class).filter(Boolean))];
          const classLabel = classSet.length === 1 ? classSet[0] : ('Kelompok Binaan (' + classSet.join(', ') + ')');
          const out = {
            assignment: { teacher_username: fasilUser, class_name: classLabel },
            class_name: classLabel,
            students: students.map(s => {
              const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
                ? FincestemCore.zones.getStudentZone(s.nisn, s.class, s.zone)
                : (s.zone || 'FINCESTEM OKU TIMUR');
              return {
                nisn: s.nisn,
                name: s.nama,
                class_name: s.class,
                nis: s.nis,
                photo_url: s.photo_url,
                zone: z,
                is_field_trip: String(z).toUpperCase().includes('LUAR')
              };
            })
          };
          if (callback) callback(out);
          return out;
        }
      }

      const local = this.getLocalAssignments();
      const assignment = (local.facilitators || []).find(f => f.teacher_username === fasilUser);
      if (!assignment) {
        const empty = { assignment: null, class_name: null, students: [] };
        if (callback) callback(empty);
        return empty;
      }

      const students = allStudents.filter(s => s.class === assignment.class_name);
      const out = {
        assignment: assignment,
        class_name: assignment.class_name,
        students: students.map(s => {
          const z = (FincestemCore.zones && FincestemCore.zones.getStudentZone)
            ? FincestemCore.zones.getStudentZone(s.nisn, s.class, s.zone)
            : (s.zone || 'FINCESTEM OKU TIMUR');
          return {
            nisn: s.nisn,
            name: s.nama,
            class_name: s.class,
            nis: s.nis,
            photo_url: s.photo_url,
            zone: z,
            is_field_trip: String(z).toUpperCase().includes('LUAR')
          };
        })
      };
      if (callback) callback(out);
      return out;
    },

    saveFacilitatorEvaluation: function(evalData, callback) {
      try {
        let local = this.getLocalAssignments();
        if (!Array.isArray(local.evaluations)) local.evaluations = [];
        local.evaluations = local.evaluations.filter(e => !(e.coordinator_username === evalData.coordinator_username && e.facilitator_username === evalData.facilitator_username && e.class_name === evalData.class_name));
        local.evaluations.push(evalData);
        localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.assign({ action: 'save_facilitator_evaluation' }, evalData))
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true }); });
      } else {
        if (callback) callback({ success: true });
      }
    },

    saveFinalGrade: function(gradeData, callback) {
      try {
        let local = this.getLocalAssignments();
        if (!Array.isArray(local.final_grades)) local.final_grades = [];
        local.final_grades = local.final_grades.filter(g => g.student_nisn !== gradeData.student_nisn);
        local.final_grades.push(gradeData);
        localStorage.setItem('fincestem_role_assignments', JSON.stringify(local));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.assign({ action: 'save_final_grade' }, gradeData))
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true }); });
      } else {
        if (callback) callback({ success: true });
      }
    }
  },

  // Manajemen Master Database Guru & Tenaga Pendidik
  teachers: {
    // Mengambil daftar guru aktif (gabungan master + custom localStorage)
    getTeachers: function() {
      let baseList = Array.isArray(window.FincestemMasterTeachers) ? window.FincestemMasterTeachers : [];
      try {
        const stored = localStorage.getItem('fincestem_custom_teachers');
        if (stored) {
          const customList = JSON.parse(stored);
          if (Array.isArray(customList) && customList.length > 0) {
            window.FincestemMasterTeachers = customList;
            return customList;
          }
        }
      } catch (e) {}
      return baseList;
    },

    // Menyimpan / mengedit data guru (lokal + server)
    saveTeacher: function(teacherData, callback) {
      const list = this.getTeachers().slice();
      const kode = String(teacherData.kode_guru || '').trim();
      const origKode = String(teacherData.orig_kode_guru || kode).trim();

      const newTeacher = {
        no: Number(teacherData.no) || (list.length > 0 ? Math.max(...list.map(t => Number(t.no) || 0)) + 1 : 1),
        kode_guru: kode,
        nama_guru: String(teacherData.nama_guru || '').trim(),
        nip: String(teacherData.nip || '-').trim() || '-',
        mata_pelajaran: String(teacherData.mata_pelajaran || '').trim(),
        jabatan: String(teacherData.jabatan || 'Guru Mata Pelajaran').trim(),
        tugas_tambahan: String(teacherData.tugas_tambahan || '-').trim() || '-',
        username: String(teacherData.username || '').trim(),
        password: String(teacherData.password || 'Fincestem2026!').trim()
      };

      // Cari apakah sudah ada data guru ini (berdasarkan origKode atau kode_guru)
      const existingIdx = list.findIndex(t => 
        String(t.kode_guru).toLowerCase() === origKode.toLowerCase() ||
        String(t.kode_guru).toLowerCase() === kode.toLowerCase()
      );

      if (existingIdx >= 0) {
        newTeacher.no = list[existingIdx].no || newTeacher.no;
        list[existingIdx] = newTeacher;
      } else {
        list.push(newTeacher);
      }

      // Simpan ke memori dan localStorage
      window.FincestemMasterTeachers = list;
      try {
        localStorage.setItem('fincestem_custom_teachers', JSON.stringify(list));
      } catch (e) {}

      // Kirim ke API backend jika online
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.assign({ action: 'save_teacher' }, newTeacher, { orig_kode_guru: origKode }))
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true, data: { teacher: newTeacher } }); });
      } else {
        if (callback) callback({ success: true, data: { teacher: newTeacher } });
      }
      return newTeacher;
    },

    // Menghapus data guru (lokal + server)
    deleteTeacher: function(kodeGuru, callback) {
      let list = this.getTeachers().slice();
      const target = list.find(t => String(t.kode_guru).toLowerCase() === String(kodeGuru).toLowerCase());
      const username = target ? target.username : '';

      list = list.filter(t => String(t.kode_guru).toLowerCase() !== String(kodeGuru).toLowerCase());
      window.FincestemMasterTeachers = list;

      try {
        localStorage.setItem('fincestem_custom_teachers', JSON.stringify(list));
      } catch (e) {}

      // Kirim ke API backend jika online
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_teacher', kode_guru: kodeGuru, username: username })
        })
          .then(r => r.json())
          .then(res => { if (callback) callback(res); })
          .catch(() => { if (callback) callback({ success: true }); });
      } else {
        if (callback) callback({ success: true });
      }
    },

    // Sinkronisasi dengan server backend
    syncTeachers: function(callback) {
      if (!window.location.protocol.startsWith('http')) {
        if (callback) callback(this.getTeachers());
        return;
      }
      fetch(FincestemCore.api.base + '/settings.php?action=get_teachers&_t=' + Date.now())
        .then(r => r.json())
        .then(res => {
          if (res.success && Array.isArray(res.data?.teachers) && res.data.teachers.length > 0) {
            window.FincestemMasterTeachers = res.data.teachers;
            try {
              localStorage.setItem('fincestem_custom_teachers', JSON.stringify(res.data.teachers));
            } catch (e) {}
          }
          if (callback) callback(FincestemCore.teachers.getTeachers());
        })
        .catch(() => {
          if (callback) callback(FincestemCore.teachers.getTeachers());
        });
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

// Global Crash & Error Telemetry Logger (Auto-detects issues from 1,500 students silently)
(function() {
  if (typeof window === 'undefined') return;
  let lastReported = 0;
  function reportError(msg, url, line, col, err) {
    // Hindari spam jika error berulang dalam 5 detik
    const now = Date.now();
    if (now - lastReported < 5000) return;
    lastReported = now;

    try {
      const user = (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getUser) ? FincestemCore.auth.getUser() : {};
      const payload = {
        action: 'log',
        user_identifier: user.nisn || user.identifier || user.username || 'guest',
        role: (window.FincestemCore && FincestemCore.auth && FincestemCore.auth.getRole) ? FincestemCore.auth.getRole() : 'siswa',
        page: window.location.pathname + window.location.search,
        error_message: String(msg || 'Unknown error'),
        error_stack: (err && err.stack) ? String(err.stack) : `Line ${line || 0}:${col || 0} in ${url || ''}`,
        device_info: `${navigator.platform || ''} | ${window.innerWidth}x${window.innerHeight}`
      };

      if (window.location.protocol.startsWith('http')) {
        const base = (window.FincestemCore && FincestemCore.api && FincestemCore.api.base) ? FincestemCore.api.base : '../api';
        fetch(base + '/telemetry.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function() {});
      }
    } catch (e) {}
  }

  window.addEventListener('error', function(e) {
    reportError(e.message, e.filename, e.lineno, e.colno, e.error);
  });
  window.addEventListener('unhandledrejection', function(e) {
    const reason = e.reason || {};
    reportError(reason.message || 'Unhandled Promise Rejection', '', 0, 0, reason);
  });
})();

if (typeof window !== 'undefined') {
  window.FincestemCore = FincestemCore;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FincestemCore;
}
