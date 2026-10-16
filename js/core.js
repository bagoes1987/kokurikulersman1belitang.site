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
      const local = localStorage.getItem('fincestem_photo_' + cleanNisn);
      if (local) return this.normalizePhotoUrl(local);

      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(x => String(x.nisn).trim() === cleanNisn || String(x.nis).trim() === cleanNisn);
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

      // Kompres otomatis sebelum disimpan/dikirim agar website tetap ringan & hemat kuota
      this.compressImage(file, 480, 0.82, function(compressedDataUrl, compressedBlob) {
        // 1. Simpan pratinjau lokal instan
        if (compressedDataUrl) {
          try {
            localStorage.setItem('fincestem_photo_' + cleanNisn, compressedDataUrl);
          } catch (e) {
            console.warn('LocalStorage quota exceeded for photo preview', e);
          }
        }

        // Update sesi user jika sedang login
        const u = FincestemCore.auth.getUser();
        if (u && (String(u.nisn).trim() === cleanNisn || String(u.identifier).trim() === cleanNisn)) {
          u.photo_url = compressedDataUrl || u.photo_url;
          FincestemCore.auth.setUser(u, u.role);
        }

        // Update di master data in-memory
        if (window.FincestemMasterStudents) {
          const s = window.FincestemMasterStudents.find(x => String(x.nisn).trim() === cleanNisn || String(x.nis).trim() === cleanNisn);
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
              try {
                localStorage.setItem('fincestem_photo_' + cleanNisn, serverPhotoUrl);
              } catch (e) {}
              if (u && (String(u.nisn).trim() === cleanNisn || String(u.identifier).trim() === cleanNisn)) {
                u.photo_url = serverPhotoUrl;
                FincestemCore.auth.setUser(u, u.role);
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
              const id = String(item.identifier || item.nisn || '').trim();
              if (id && item.photo_url) {
                const normUrl = self.normalizePhotoUrl(item.photo_url);
                try {
                  localStorage.setItem('fincestem_photo_' + id, normUrl);
                } catch (e) {}

                if (item.zone) {
                  try {
                    localStorage.setItem('fincestem_student_zone_' + id, item.zone);
                  } catch (e) {}
                }

                const s = master.find(x => String(x.nisn).trim() === id || String(x.nis).trim() === id);
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
        { day_number: 1, title: 'Day 1: Orientasi & Pembekalan Riset', theme: 'Pembekalan STEM & Etika Riset Lapangan', date: '2026-11-09', date_formatted: '09 November 2026', start_time: '07:00', end_time: '18:00', is_active: 1, auto_schedule: 1, description: 'Pengenalan instrumen observasi, sosialisasi modul kokurikuler, dan konsolidasi tim ekspedisi.' },
        { day_number: 2, title: 'Day 2: Eksplorasi Sains & Ekosistem Irigasi', theme: 'STEM Sains & Konservasi Lingkungan Belitang', date: '2026-11-10', date_formatted: '10 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Pengambilan sampel kualitas air saluran irigasi, identifikasi flora-fauna sawah pasang surut.' },
        { day_number: 3, title: 'Day 3: Rekayasa Teknologi & Pengukuran Lapangan', theme: 'Teknologi Pertanian Modern & Mekanisasi', date: '2026-11-11', date_formatted: '11 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Observasi mekanisasi pengolahan pascapanen, pengoperasian sensor lingkungan dan dokumentasi teknologi.' },
        { day_number: 4, title: 'Day 4: Literasi Finansial & Rantai Pasok Pangan', theme: 'Financial Literacy & Ekonomi Agrikultur', date: '2026-11-12', date_formatted: '12 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Analisis biaya produksi, wawancara harga pasar komoditas beras, serta simulasi manajemen modal usaha tani.' },
        { day_number: 5, title: 'Day 5: Eksplorasi Budaya & Etnosains Nusantara', theme: 'Culture & Kearifan Lokal Komunitas Multikultural', date: '2026-11-13', date_formatted: '13 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Wawancara tetua adat, kajian tradisi gotong royong lumbung desa, dan pencatatan nilai-nilai budaya.' },
        { day_number: 6, title: 'Day 6: Sintesis Data & Penyusunan Instrumen LKPD', theme: 'Data Science & Penyusunan Laporan Proyek', date: '2026-11-14', date_formatted: '14 November 2026', start_time: '07:00', end_time: '18:00', is_active: 0, auto_schedule: 1, description: 'Pengolahan data statistik hasil observasi 4 pilar, input laporan akhir, dan upload berkas LKPD.' },
        { day_number: 7, title: 'Day 7: Gelar Karya Ilmiah, Presentasi & Refleksi', theme: 'Diseminasi Temuan & Refleksi Kokurikuler', date: '2026-11-15', date_formatted: '15 November 2026', start_time: '07:00', end_time: '20:00', is_active: 0, auto_schedule: 1, description: 'Pameran poster riset, presentasi di depan dewan penguji dan fasilitator, serta pengisian lembar refleksi mandiri.' }
      ];
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
        theme: 'Perjalanan Darat Belitang menuju Semarang',
        date_formatted: 'Senin, 09 November 2026',
        time_range: '07.00 - Selesai WIB',
        route_lines: [
          ['Belitang', 'Pelabuhan Bakauheni', 'Pelabuhan Merak'],
          ['Tol Trans-Jawa', 'Semarang']
        ],
        route: 'Belitang → Pelabuhan Bakauheni → Pelabuhan Merak → Tol Trans-Jawa → Semarang',
        description: 'Pukul 07.00 WIB, rombongan berangkat dari Belitang menuju Kota Semarang. Makan siang dan makan malam di restoran lokal serta bermalam di perjalanan menuju Semarang.',
        sessions: [
          { time: '07.00 WIB', title: 'Berangkat dari Belitang Menuju Semarang', location: 'Belitang', icon: 'directions_bus' },
          { time: 'Siang', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: 'Malam', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: 'Malam', title: 'Bermalam di Perjalanan Menuju Semarang', location: 'Perjalanan Menuju Semarang', icon: 'night_shelter' }
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
        description: 'Pada pagi hari, rombongan tiba di Semarang dan melakukan transit untuk beristirahat serta sarapan. Selanjutnya, rombongan melaksanakan persiapan kunjungan, mengunjungi AKPOL Semarang dan Lawang Sewu, kemudian melanjutkan perjalanan menuju Malang.',
        sessions: [
          { time: '04.30 – 05.00 WIB', title: 'Transit di Semarang', location: 'Semarang', icon: 'wc' },
          { time: '05.00 – 07.00 WIB', title: 'Sarapan Pagi', location: 'Semarang', icon: 'restaurant' },
          { time: '07.00 – 08.00 WIB', title: 'Persiapan Kunjungan', location: 'Persiapan Kunjungan', icon: 'groups' },
          { time: '09.00 – 12.00 WIB', title: 'Kunjungan ke AKPOL Semarang', location: 'AKPOL Semarang', icon: 'local_police' },
          { time: '12.00 – 12.30 WIB', title: 'Makan Siang', location: 'Semarang', icon: 'restaurant' },
          { time: '13.00 – 14.30 WIB', title: 'Kunjungan ke Lawang Sewu', location: 'Lawang Sewu, Semarang', icon: 'museum' },
          { time: '14.30 – 20.30 WIB', title: 'Perjalanan Menuju Malang', location: 'Perjalanan Menuju Malang', icon: 'directions_bus' },
          { time: '20.30 s.d. Selesai', title: 'Check-in Hotel', location: 'Hotel Malang', icon: 'hotel' }
        ],
        refl_title: 'Jurnal Refleksi Hari Kedua (AKPOL, Lawang Sewu → Malang)',
        refl_prompt: 'Refleksikan apa yang Anda rasakan dan pelajari hari ini: (1) Inspirasi kedisiplinan dan kepemimpinan taruna AKPOL Semarang bagi masa depan Anda, (2) Kekaguman sains arsitektur pasif Lawang Sewu dan heroisme pemuda AMKA, serta (3) Kebiasaan Anda dalam mengendalikan pengeluaran uang saku selama perjalanan panjang menuju hotel di Malang.'
      },
      3: {
        day_number: 3,
        title: 'HARI KE-3: WISATA BATU – BROMO',
        theme: 'Wisata Edukasi Kawasan Batu & Perjalanan Menuju Bromo',
        date_formatted: 'Rabu, 11 November 2026',
        time_range: '08.00 - Selesai WIB',
        route_lines: [
          ['Batu', 'Wisata Petik Apel', 'Jatim Park 1'],
          ['Museum Angkut', 'Batu – Bromo']
        ],
        route: 'Batu → Wisata Petik Apel → Jatim Park 1 → Museum Angkut → Batu–Bromo',
        description: 'Setelah sarapan pagi dan check-out hotel, rombongan melanjutkan kegiatan wisata edukasi di kawasan Batu. Setelah makan malam, rombongan melanjutkan perjalanan menuju kawasan Bromo dan bermalam di perjalanan.',
        sessions: [
          { time: '08.00 – 10.30 WIB', title: 'Wisata Petik Apel', location: 'Batu', icon: 'eco' },
          { time: '11.00 – 12.00 WIB', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '13.00 – 15.30 WIB', title: 'Kunjungan Wisata Edukasi', location: 'Jatim Park 1', icon: 'science' },
          { time: '15.45 – 18.30 WIB', title: 'Kunjungan Wisata Edukasi', location: 'Museum Angkut', icon: 'commute' },
          { time: '18.45 – 20.00 WIB', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '20.00 WIB', title: 'Perjalanan Menuju Bromo', location: 'Batu–Bromo', icon: 'directions_bus' }
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
        description: 'Pada pukul 03.30 WIB, rombongan tiba di tempat transit sebelum melanjutkan perjalanan menggunakan Jeep menuju kawasan wisata Gunung Bromo. Setelah seluruh rangkaian wisata Bromo selesai, rombongan melanjutkan perjalanan menuju Yogyakarta. Setibanya di hotel, rombongan melakukan check-in, makan malam, dan beristirahat.',
        sessions: [
          { time: '03.30 – 04.30 WIB', title: 'Persiapan dan Perpindahan ke Jeep', location: 'Transit Bromo', icon: 'airport_shuttle' },
          { time: '04.30 – 05.30 WIB', title: 'Menikmati Matahari Terbit (Sunrise)', location: 'Gunung Bromo', icon: 'wb_sunny' },
          { time: '06.00 – 07.00 WIB', title: 'Kunjungan Wisata', location: 'Pasir Berbisik', icon: 'grain' },
          { time: '07.15 – 08.15 WIB', title: 'Sarapan Pagi', location: 'Padang Savana', icon: 'restaurant' },
          { time: '08.30 – 10.00 WIB', title: 'Kunjungan Wisata', location: 'Kawah Bromo', icon: 'volcano' },
          { time: '10.00 WIB', title: 'Perjalanan Turun', location: 'Menuju Sukapura', icon: 'directions_bus' },
          { time: '13.00 – 14.00 WIB', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '14.00 WIB', title: 'Perjalanan Menuju Yogyakarta', location: 'Sukapura–Yogyakarta', icon: 'directions_bus' },
          { time: '18.30 WIB', title: 'Check-in dan Makan Malam', location: 'Hotel Yogyakarta', icon: 'hotel' }
        ],
        refl_title: 'Jurnal Refleksi Hari Keempat (Ekspedisi Bromo → Yogyakarta)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari keempat: momen takjub menembus dinginnya malam dengan armada jeep menuju sunrise Penanjakan Bromo, sensasi melintasi Pasir Berbisik dan Padang Savana, trekking menuju kawah aktif Bromo, kekaguman adat Suku Tengger, serta perjalanan panjang menuju kota istimewa Yogyakarta!'
      },
      5: {
        day_number: 5,
        title: 'HARI KE-5: WISATA EDUKASI YOGYAKARTA',
        theme: 'Candi Prambanan, Belajar Membatik, UNY & Free Program',
        date_formatted: 'Jumat, 13 November 2026',
        time_range: '06.00 - Selesai WIB',
        route_lines: [
          ['Hotel', 'Candi Prambanan', 'Batik Benang Ratu'],
          ['Restoran Lokal', 'Universitas Negeri Yogyakarta (UNY)', 'Hotel Yogyakarta']
        ],
        route: 'Hotel → Candi Prambanan → Batik Benang Ratu → Restoran Lokal → Universitas Negeri Yogyakarta (UNY) → Hotel Yogyakarta',
        description: 'Setelah sarapan pagi di hotel, rombongan melaksanakan kegiatan wisata edukasi di Yogyakarta. Rombongan beristirahat dan bermalam di hotel di Yogyakarta.',
        sessions: [
          { time: '06.00 – 07.00 WIB', title: 'Sarapan Pagi', location: 'Hotel', icon: 'restaurant' },
          { time: '07.30 – 10.00 WIB', title: 'Kunjungan Wisata Edukasi', location: 'Candi Prambanan', icon: 'temple_hindu' },
          { time: '10.30 – 13.00 WIB', title: 'Belajar Membatik', location: 'Batik Benang Ratu', icon: 'palette' },
          { time: '13.15 – 14.15 WIB', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '15.00 – 17.30 WIB', title: 'Kunjungan Edukatif', location: 'Universitas Negeri Yogyakarta (UNY)', icon: 'school' },
          { time: '18.00 WIB', title: 'Kembali ke Hotel dan Makan Malam', location: 'Hotel Yogyakarta', icon: 'restaurant' },
          { time: 'Malam', title: 'Acara Bebas (Free Program)', location: 'Hotel', icon: 'nightlife' }
        ],
        refl_title: 'Jurnal Refleksi Hari Kelima (Candi Prambanan, Membatik & UNY)',
        refl_prompt: 'Refleksikan apa yang Anda peroleh hari ini: (1) Kekaguman mahakarya arsitektur batu dan relief Candi Prambanan, (2) Pengalaman tangan Anda sendiri mencanting malam panas di Batik Benang Ratu, (3) Inspirasi akademik saat mengunjungi kampus UNY, serta (4) Dinamika interaksi sosial budaya di Malioboro!'
      },
      6: {
        day_number: 6,
        title: 'HARI KE-6: YOGYAKARTA – BELITANG',
        theme: 'Pabrik Bakpia, Pantai Drini, Drini Park & Perjalanan Pulang',
        date_formatted: 'Sabtu, 14 November 2026',
        time_range: '07.30 - Selesai WIB',
        route_lines: [
          ['Pabrik Bakpia Jogja', 'Pantai Drini', 'Drini Park'],
          ['Restoran Lokal', 'Yogyakarta–Belitang']
        ],
        route: 'Pabrik Bakpia Jogja → Pantai Drini → Drini Park → Restoran Lokal → Yogyakarta–Belitang',
        description: 'Setelah sarapan pagi dan check-out hotel, rombongan melanjutkan kegiatan wisata sebelum kembali ke Belitang. Setelah makan malam, rombongan memulai perjalanan kembali menuju Belitang dan bermalam di perjalanan.',
        sessions: [
          { time: '07.30 – 09.00 WIB', title: 'Kunjungan Wisata Edukasi', location: 'Pabrik Bakpia Jogja', icon: 'bakery_dining' },
          { time: '10.30 – 13.00 WIB', title: 'Kunjungan Wisata', location: 'Pantai Drini', icon: 'beach_access' },
          { time: '13.00 – 14.00 WIB', title: 'Makan Siang', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '14.15 – 16.30 WIB', title: 'Kunjungan Wisata', location: 'Drini Park', icon: 'attractions' },
          { time: '18.30 – 19.30 WIB', title: 'Makan Malam', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: '19.30 WIB', title: 'Perjalanan Pulang', location: 'Yogyakarta–Belitang', icon: 'directions_bus' }
        ],
        refl_title: 'Jurnal Refleksi Hari Keenam (Pabrik Bakpia, Pantai Drini & Perjalanan Pulang)',
        refl_prompt: 'Ceritakan pengalaman Anda di hari keenam: wawasan industri kreatif dan manajemen biaya di Pabrik Bakpia Jogja, keindahan sains ekosistem bahari dan tebing karst di Pantai Drini & Drini Park, serta persiapan perjalanan darat kembali menuju kampung halaman Belitang!'
      },
      7: {
        day_number: 7,
        title: 'HARI KE-7: TIBA DI BELITANG',
        theme: 'Transit Restoran Lokal, Sarapan & Tiba di SMAN 1 Belitang',
        date_formatted: 'Minggu, 15 November 2026',
        time_range: 'Pagi - Siang WIB',
        route_lines: [
          ['Tol Trans-Sumatera', 'Restoran Lokal (Transit)'],
          ['Tempat Penjemputan', 'SMAN 1 Belitang']
        ],
        route: 'Tol Trans-Sumatera → Restoran Lokal (Transit) → Tempat Penjemputan SMAN 1 Belitang',
        description: 'Pada pagi hari, rombongan transit di restoran lokal untuk sarapan dan beristirahat sejenak. Perjalanan kemudian dilanjutkan menuju Belitang. Rombongan diperkirakan tiba di tempat penjemputan pada siang hari.',
        sessions: [
          { time: 'Pagi', title: 'Transit untuk Sarapan & Istirahat', location: 'Restoran Lokal', icon: 'restaurant' },
          { time: 'Pagi – Siang', title: 'Perjalanan Menuju Belitang', location: 'Perjalanan Menuju Belitang', icon: 'directions_bus' },
          { time: 'Siang', title: 'Tiba di Tempat Penjemputan', location: 'SMAN 1 Belitang', icon: 'home' }
        ],
        refl_title: 'Jurnal Refleksi Penutup (7 Hari Ekspedisi Field Trip)',
        refl_prompt: 'Tuliskan refleksi penutup komprehensif Anda setelah menjalani 7 hari ekspedisi Field Trip FINCESTEM: perubahan cara pandang Anda dalam mengelola finansial, nilai kedisiplinan dan kerja sama kelompok yang dipelajari, serta kenangan paling berharga yang akan Anda bawa selamanya!'
      }
    },

    getFieldTripDayConfig: function(dayNum) {
      return this.fieldTripDaysConfig ? this.fieldTripDaysConfig[Number(dayNum)] : null;
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
      return days.map(d => self.evaluateDayStatus(d, serverTime));
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
              const evaluated = self.evaluateScheduleList(data.data.days, data.data.server_time);
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
          const d0 = days.find(x => Number(x.day_number) === 0);
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
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length >= 7) {
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
                // Terapkan ke master list di memori
                if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
                  window.FincestemMasterStudents.forEach(s => {
                    const z = data.data.student_zones[s.nisn] || data.data.student_zones[s.nis];
                    if (z) s.zone = z;
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

    setStudentZone: function(nisn, zone, callback) {
      if (!nisn) {
        if (callback) callback({ success: false, message: 'NISN tidak valid' });
        return;
      }
      const cleanNisn = String(nisn).trim();

      // 1. Simpan individual key
      try {
        localStorage.setItem('fincestem_student_zone_' + cleanNisn, zone);
      } catch (e) {}

      // 2. Simpan ke peta sinkronisasi
      try {
        let map = {};
        const mapStr = localStorage.getItem('fincestem_student_zones_map');
        if (mapStr) map = JSON.parse(mapStr);
        map[cleanNisn] = zone;
        localStorage.setItem('fincestem_student_zones_map', JSON.stringify(map));
      } catch (e) {}

      // 3. Update master list di memori
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s => String(s.nisn).trim() === cleanNisn || String(s.nis).trim() === cleanNisn);
        if (found) {
          found.zone = zone;
        }
      }

      // 4. Update session user jika sedang login sebagai siswa ini
      const u = FincestemCore.auth.getUser();
      if (u && (String(u.nisn).trim() === cleanNisn || String(u.identifier).trim() === cleanNisn || String(u.nis).trim() === cleanNisn)) {
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

  // Modul Pelacakan Progres Pengerjaan Siswa & Evaluasi Fasilitator
  progress: {
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

      // Selective localStorage purging
      try {
        if (comp.foto_profil && scope !== 'trial_only') {
          localStorage.removeItem('fincestem_photo_' + cleanNisn);
          const u = FincestemCore.auth.getUser();
          if (u && (String(u.nisn).trim() === cleanNisn || String(u.identifier).trim() === cleanNisn)) {
            u.photo_url = '';
            FincestemCore.auth.setUser(u, u.role || 'siswa');
          }
          if (window.FincestemMasterStudents) {
            const s = window.FincestemMasterStudents.find(x => String(x.nisn).trim() === cleanNisn || String(x.nis).trim() === cleanNisn);
            if (s) s.photo_url = '';
          }
        }

        // Filter progress in localStorage
        const progKey = 'fincestem_progress_' + cleanNisn;
        const storedProg = localStorage.getItem(progKey);
        if (storedProg) {
          const p = JSON.parse(storedProg);
          if (scope === 'all_days' && comp.materi && comp.lkpd && comp.asesmen && comp.refleksi && comp.dokumentasi) {
            localStorage.removeItem(progKey);
          } else if (p.task_map) {
            Object.keys(p.task_map).forEach(k => {
              const parts = k.split('_');
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
                delete p.task_map[k];
              }
            });
            let daysSet = new Set();
            Object.keys(p.task_map).forEach(k => {
              const d = parseInt(k.split('_')[0]);
              if (d && d >= 1 && d <= 7) daysSet.add(d);
            });
            p.completed_days = daysSet.size;
            p.percentage = Math.min(100, Math.round((p.completed_days / 7) * 100));
            localStorage.setItem(progKey, JSON.stringify(p));
          }
        }

        // Purge individual day task keys for this student
        const dayList = (targetDay === 0) ? [0] : ((targetDay > 0) ? [targetDay] : [0, 1, 2, 3, 4, 5, 6, 7]);
        dayList.forEach(d => {
          if (comp.materi) {
            localStorage.removeItem(`fincestem_materi_ft_day${d}_` + cleanNisn);
            localStorage.removeItem(`fincestem_materi_day${d}_` + cleanNisn);
          }
          if (comp.lkpd) {
            localStorage.removeItem(`fincestem_lkpd_ft_day${d}_` + cleanNisn);
            localStorage.removeItem(`fincestem_lkpd_day${d}_` + cleanNisn);
            localStorage.removeItem('fincestem_lkpd_' + cleanNisn);
          }
          if (comp.asesmen) {
            localStorage.removeItem(`fincestem_asesmen_ft_day${d}_` + cleanNisn);
            localStorage.removeItem(`fincestem_asesmen_day${d}_` + cleanNisn);
          }
          if (comp.dokumentasi) {
            localStorage.removeItem(`fincestem_dok_ft_day${d}_` + cleanNisn);
            localStorage.removeItem(`fincestem_dok_day${d}_` + cleanNisn);
          }
          if (comp.refleksi) {
            localStorage.removeItem(`fincestem_refleksi_ft_day${d}_` + cleanNisn);
            localStorage.removeItem(`fincestem_refleksi_day${d}_` + cleanNisn);
          }
        });

        if (comp.dokumentasi) {
          const stored = localStorage.getItem('fincestem_db_2026_v1');
          if (stored) {
            const db = JSON.parse(stored);
            if (Array.isArray(db.documentation)) {
              db.documentation = db.documentation.filter(d => {
                const dNisn = String(d.nisn || d.author_nisn || '').trim();
                const isStudent = (dNisn === cleanNisn || String(d.author || '').toLowerCase().includes(cleanNisn));
                if (!isStudent) return true;
                if (targetDay > 0) {
                  return !(d.title && d.title.includes('Day ' + targetDay));
                }
                // Jika targetDay === 0 (Uji Coba) atau all_days, bersihkan dokumentasi siswa ini
                return false;
              });
              localStorage.setItem('fincestem_db_2026_v1', JSON.stringify(db));
            }
          }
        }
      } catch (e) {
        console.warn('Gagal membersihkan cache lokal:', e);
      }

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

    submitTask: function(nisn, dayNumber, taskType, content, callback) {
      const self = this;
      this.getLocalProgress(nisn, function(prog) {
        if (!prog) prog = self.getDefaultProgress(nisn);
        if (!prog.task_map) prog.task_map = {};
        prog.task_map[dayNumber + '_' + taskType] = { status: 'submitted', content: content };

        // ATURAN FINCESTEM: Submit tugas dari siswa TIDAK menambah completed_days!
        // completed_days HANYA bertambah jika Fasilitator memberikan status 'completed'
        let completedDaysSet = new Set();
        (prog.records || []).forEach(r => {
          const d = parseInt(r.day_number);
          if (d >= 1 && d <= 7 && r.status === 'completed') completedDaysSet.add(d);
        });
        Object.keys(prog.task_map).forEach(k => {
          const d = parseInt(k.split('_')[0]);
          if (d >= 1 && d <= 7 && prog.task_map[k].status === 'completed') completedDaysSet.add(d);
        });
        prog.completed_days = completedDaysSet.size;
        prog.percentage = Math.min(100, Math.round((prog.completed_days / 7) * 100));

        try {
          localStorage.setItem('fincestem_progress_' + nisn, JSON.stringify(prog));
        } catch (e) {}

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
          if (score >= 90) predicate = 'Sangat Baik';
          else if (score >= 80) predicate = 'Baik';
          else if (score >= 70) predicate = 'Cukup';
          else if (score >= 60) predicate = 'Kurang';
          else predicate = 'Sangat Kurang';
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
          if (prog.average_score >= 90) prog.predicate = 'Sangat Baik';
          else if (prog.average_score >= 80) prog.predicate = 'Baik';
          else if (prog.average_score >= 70) prog.predicate = 'Cukup';
          else if (prog.average_score >= 60) prog.predicate = 'Kurang';
          else prog.predicate = 'Sangat Kurang';
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
      if (prog.records && Array.isArray(prog.records)) {
        if (prog.records.some(r => parseInt(r.day_number) === d && r.status === 'completed')) return true;
      }
      if (prog.task_map) {
        for (const k in prog.task_map) {
          if (k.startsWith(d + '_') && prog.task_map[k].status === 'completed') return true;
        }
      }
      return false;
    },

    getDayStatus: function(prog, dayNum) {
      if (!prog) return 'belum_mulai';
      const d = parseInt(dayNum);
      let foundStatus = null;
      if (prog.records && Array.isArray(prog.records)) {
        const r = prog.records.find(rec => parseInt(rec.day_number) === d);
        if (r && r.status) foundStatus = r.status;
      }
      if (!foundStatus && prog.task_map) {
        for (const k in prog.task_map) {
          if (k.startsWith(d + '_') && prog.task_map[k].status) {
            foundStatus = prog.task_map[k].status;
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

      const tm = prog.task_map || {};
      // Refleksi adalah tahap ke-5 (tahap terakhir siswa)
      if (tm[d + '_refleksi'] && (tm[d + '_refleksi'].status === 'submitted' || tm[d + '_refleksi'].status === 'completed')) {
        return true;
      }
      // Atau jika 3 instrumen inti (LKPD, Asesmen, dan Foto Dokumentasi) lengkap terkirim
      if (tm[d + '_lkpd'] && tm[d + '_asesmen'] && tm[d + '_dokumentasi']) {
        return true;
      }

      // Cek localStorage browser untuk data yang tersimpan valid (bukan draft kosong)
      try {
        const u = FincestemCore.auth.getUser() || {};
        const idList = [u.nisn, u.identifier, u.nis].filter(Boolean);
        for (const id of idList) {
          // Refleksi valid
          const reflFt = localStorage.getItem(`fincestem_refleksi_ft_day${d}_` + id);
          const reflNonFt = localStorage.getItem(`fincestem_refleksi_day${d}_` + id);
          if (reflFt || reflNonFt) {
            const raw = reflFt || reflNonFt;
            try {
              const p = JSON.parse(raw);
              if (p && (p.content || (typeof p === 'string' && p.trim().length > 10))) return true;
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
          canAccess: isOpenByAdmin,
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
      const prevDone = this.isDayStudentTasksDone(prog, d - 1) || this.isDayCompleted(prog, d - 1);
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
          predicate: sc >= 90 ? 'Sangat Baik' : (sc >= 80 ? 'Baik' : (sc >= 70 ? 'Cukup' : (sc >= 60 ? 'Kurang' : 'Sangat Kurang'))),
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
          predicate: 'Sangat Baik',
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
          predicate: 'Sangat Baik',
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
          predicate: 'Baik',
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
        predicate: 'Baik',
        is_emergency_override: false,
        reason: 'Pengumpulan hari berikutnya',
        cutoff_perfect: cutoffPerfect,
        time_formatted: subFormatted
      };
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
        fetch(FincestemCore.api.base + '/settings.php?action=get_role_assignments')
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
              localStorage.setItem('fincestem_role_assignments', JSON.stringify(res.data));
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
      } catch (e) {}
      if (callback) callback(data);
      return data;
    },

    normalizeClassName: function(name) {
      if (!name) return '';
      return String(name).trim().toUpperCase().replace(/^KELAS\s+/i, '');
    },

    getClassCoordinator: function(className) {
      if (!className) return 'Drs. H. Koordinator FINCESTEM';
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
        fetch(FincestemCore.api.base + '/settings.php?action=get_coordinator_data&coordinator_user=' + encodeURIComponent(coordUser))
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
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
      const coordClasses = FincestemCore.sortClasses(
        (local.coordinators || [])
          .filter(c => c.teacher_username === coordUser)
          .map(c => c.class_name)
      );

      const fasils = (local.facilitators || []).filter(f => coordClasses.includes(f.class_name));
      const allStudents = window.FincestemMasterStudents || [];
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
          return {
            nisn: s.nisn,
            name: s.nama,
            class_name: s.class,
            nis: s.nis,
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
        fetch(FincestemCore.api.base + '/settings.php?action=get_facilitator_data&facilitator_user=' + encodeURIComponent(fasilUser))
          .then(r => r.json())
          .then(res => {
            if (res && res.success && res.data) {
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
      const local = this.getLocalAssignments();
      const assignment = (local.facilitators || []).find(f => f.teacher_username === fasilUser);
      if (!assignment) {
        const empty = { assignment: null, class_name: null, students: [] };
        if (callback) callback(empty);
        return empty;
      }

      const allStudents = window.FincestemMasterStudents || [];
      const students = allStudents.filter(s => s.class === assignment.class_name);
      const out = {
        assignment: assignment,
        class_name: assignment.class_name,
        students: students.map(s => ({
          nisn: s.nisn,
          name: s.nama,
          class_name: s.class,
          nis: s.nis,
          photo_url: s.photo_url,
          zone: s.zone
        }))
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
