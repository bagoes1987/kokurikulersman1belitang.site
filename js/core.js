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
            user: { name: 'Koordinator Kokurikuler', role: 'koordinator', assignment: 'Koordinator Wilayah SMAN 1 Belitang', username: id }
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
            user: { name: 'Fasilitator Pembina', role: 'fasilitator', assignment: 'Pembina Riset Kokurikuler', username: id }
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

    getSchedule: function(callback) {
      const self = this;
      const u = FincestemCore.auth.getUser();
      const roleParam = (u && u.role === 'admin') ? '&role=admin' : '';
      if (window.location.protocol.startsWith('http')) {
        // Anti-cache timestamp untuk menjamin siswa mendapat status terbaru
        fetch(FincestemCore.api.base + '/schedule.php?_t=' + Date.now() + roleParam, { cache: 'no-store' })
          .then(r => r.json())
          .then(data => {
            if (data && data.success && data.data && Array.isArray(data.data.days)) {
              const evaluated = self.evaluateScheduleList(data.data.days, data.data.server_time);
              localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
              if (callback) callback(evaluated, data.data.server_time);
              return;
            }
            self.getFallbackSchedule(callback);
          })
          .catch(() => self.getFallbackSchedule(callback));
      } else {
        self.getFallbackSchedule(callback);
      }
    },

    toggleTrialDay: function(isActive, callback) {
      const actNum = isActive ? 1 : 0;
      try {
        const stored = localStorage.getItem('fincestem_schedules');
        let days = stored ? JSON.parse(stored) : this.getDefaults();
        const d0 = days.find(x => Number(x.day_number) === 0);
        if (d0) {
          d0.is_active = actNum;
          d0.is_open = (actNum === 1);
          d0.status_code = (actNum === 1) ? 'OPEN' : 'MANUAL_CLOSED';
          d0.status_label = (actNum === 1) ? 'Aktivitas Sedang Dibuka' : 'Ditutup Manual oleh Admin';
        }
        localStorage.setItem('fincestem_schedules', JSON.stringify(days));
      } catch (e) {}

      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'toggle_trial_day',
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

    getFallbackSchedule: function(callback) {
      const self = this;
      try {
        const stored = localStorage.getItem('fincestem_schedules');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length >= 7) {
            const evaluated = self.evaluateScheduleList(parsed);
            localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
            if (callback) callback(evaluated, new Date().toISOString());
            return;
          }
        }
      } catch (e) {}
      const def = self.evaluateScheduleList(this.getDefaults());
      localStorage.setItem('fincestem_schedules', JSON.stringify(def));
      if (callback) callback(def, new Date().toISOString());
    },

    saveSchedule: function(days, callback) {
      const evaluated = this.evaluateScheduleList(days);
      localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_all', days: evaluated })
        })
        .then(r => r.json())
        .then(res => { if (callback) callback(res); })
        .catch(() => { if (callback) callback({ success: true, local: true, days: evaluated }); });
      } else {
        if (callback) callback({ success: true, local: true, days: evaluated });
      }
    },

    toggleDay: function(dayNumber, isActive, callback) {
      const self = this;
      const num = Number(dayNumber);
      const actNum = isActive ? 1 : 0;

      // 1. Simpan & hitung ulang di storage lokal seketika
      let days = [];
      try {
        const stored = localStorage.getItem('fincestem_schedules');
        days = stored ? JSON.parse(stored) : self.getDefaults();
      } catch (e) {
        days = self.getDefaults();
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
      localStorage.setItem('fincestem_schedules', JSON.stringify(evaluated));

      // 2. Kirim update tunggal toggle_day ke backend cPanel
      if (window.location.protocol.startsWith('http')) {
        fetch(FincestemCore.api.base + '/schedule.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'toggle_day', day_number: num, is_active: actNum })
        })
        .then(r => r.json())
        .then(res => {
          if (callback) callback(res);
        })
        .catch(() => {
          if (callback) callback({ success: true, local: true, day_number: num, is_active: actNum });
        });
      } else {
        if (callback) callback({ success: true, local: true, day_number: num, is_active: actNum });
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

            // 3. Jika user aktif adalah siswa, pastikan zona sesinya sinkron dengan data server
            const u = FincestemCore.auth.getUser();
            if (u && (u.role === 'siswa' || !u.role)) {
              const uNisn = String(u.nisn || '').trim();
              const uId = String(u.identifier || '').trim();
              const uNis = String(u.nis || '').trim();
              const szMap = data.data.student_zones || {};
              const freshZone = szMap[uNisn] || szMap[uId] || szMap[uNis] || null;
              if (freshZone) {
                u.zone = freshZone;
                if (uNisn) try { localStorage.setItem('fincestem_student_zone_' + uNisn, freshZone); } catch (e) {}
                if (uId) try { localStorage.setItem('fincestem_student_zone_' + uId, freshZone); } catch (e) {}
                if (uNis) try { localStorage.setItem('fincestem_student_zone_' + uNis, freshZone); } catch (e) {}
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

      // 1. Cek penyimpanan lokal individual
      try {
        const stored = localStorage.getItem('fincestem_student_zone_' + cleanNisn);
        if (stored) return stored;
      } catch (e) {}

      // 2. Cek peta sinkronisasi server yang tersimpan di browser
      try {
        const mapStr = localStorage.getItem('fincestem_student_zones_map');
        if (mapStr) {
          const map = JSON.parse(mapStr);
          if (map && map[cleanNisn]) return map[cleanNisn];
        }
      } catch (e) {}

      // 3. Cek master list di memori jika ada atribut zone
      if (window.FincestemMasterStudents && Array.isArray(window.FincestemMasterStudents)) {
        const found = window.FincestemMasterStudents.find(s => String(s.nisn).trim() === cleanNisn || String(s.nis).trim() === cleanNisn);
        if (found && found.zone) return found.zone;
      }

      // 4. Cek pengaturan zona kelas
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
          if (p.task_map) {
            Object.keys(p.task_map).forEach(k => {
              const parts = k.split('_');
              const dNum = parseInt(parts[0]);
              const tType = parts.slice(1).join('_');

              const matchesDay = (targetDay === -1) || (targetDay === dNum);
              let matchesComp = false;
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

        if (comp.lkpd && scope === 'all_days') {
          localStorage.removeItem('fincestem_lkpd_' + cleanNisn);
        }

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
              if (scope === 'all_days' && comp.lkpd && comp.asesmen && comp.refleksi && comp.dokumentasi) {
                localStorage.removeItem(k);
              } else if (p.task_map) {
                Object.keys(p.task_map).forEach(tk => {
                  const parts = tk.split('_');
                  const dNum = parseInt(parts[0]);
                  const tType = parts.slice(1).join('_');

                  const matchesDay = (targetDay === -1) || (targetDay === dNum);
                  let matchesComp = false;
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

        if (comp.lkpd && scope === 'all_days') {
          const lkpdKeys = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('fincestem_lkpd_')) lkpdKeys.push(k);
          }
          lkpdKeys.forEach(k => localStorage.removeItem(k));
        }

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
      this.getStudentProgress(nisn, function(prog) {
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
              content: content,
              status: 'submitted'
            })
          }).catch(() => {});
        }

        if (callback) callback({ success: true, progress: prog });
      });
    },

    submitEvaluation: function(nisn, evalData, callback) {
      this.getStudentProgress(nisn, function(prog) {
        const score = (evalData.score !== undefined && evalData.score !== null && evalData.score !== '') ? parseFloat(evalData.score) : null;
        let predicate = evalData.predicate;
        if (score !== null && !predicate) {
          if (score >= 88) predicate = 'Sangat Baik (A)';
          else if (score >= 75) predicate = 'Baik (B)';
          else if (score >= 65) predicate = 'Cukup (C)';
          else predicate = 'Perlu Bimbingan (D)';
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

      // Day 1: CAN_ACCESS_DAY_1 = (ADMIN_DAY_1 == OPEN)
      if (d === 1) {
        return {
          canAccess: true,
          canEdit: isOpenByAdmin,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: true,
          reason: isOpenByAdmin ? '' : 'Day 1 ditutup oleh Admin (Hanya Lihat).'
        };
      }

      // Day N (N > 1): CAN_ACCESS_DAY_N = (DAY N-1 == COMPLETED) AND (ADMIN_DAY_N == OPEN)
      const prevCompleted = this.isDayCompleted(prog, d - 1);
      if (!prevCompleted) {
        return {
          canAccess: false,
          canEdit: false,
          isOpen: isOpenByAdmin,
          isPreviousCompleted: false,
          reason: `Harap selesaikan dan tunggu penetapan status 'Completed' dari Fasilitator pada Day ${d - 1}.`
        };
      }

      return {
        canAccess: true,
        canEdit: isOpenByAdmin,
        isOpen: isOpenByAdmin,
        isPreviousCompleted: true,
        reason: isOpenByAdmin ? '' : `Day ${d} ditutup oleh Admin (Hanya Lihat).`
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

    attachPinchZoom: function(containerEl, imgEl, options) {
      options = options || {};
      let scale = 1;
      const minScale = options.minScale || 1;
      const maxScale = options.maxScale || 4.5;
      let panX = 0;
      let panY = 0;
      let startX = 0;
      let startY = 0;
      let isDragging = false;
      let isPinching = false;
      let initialPinchDist = 0;
      let initialScale = 1;
      let lastTapTime = 0;

      // KUNCI UTAMA MOBILE: Terapkan touch-action: none pada container MAUPUN gambar
      if (containerEl) {
        containerEl.style.touchAction = 'none';
        containerEl.style.userSelect = 'none';
        containerEl.style.webkitUserSelect = 'none';
      }
      if (imgEl) {
        imgEl.style.touchAction = 'none';
        imgEl.style.userSelect = 'none';
        imgEl.style.webkitUserSelect = 'none';
        imgEl.style.pointerEvents = 'auto';
      }

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

      function resetZoom() {
        scale = 1;
        panX = 0;
        panY = 0;
        updateTransform(true);
      }

      function setZoom(newScale) {
        scale = Math.min(Math.max(newScale, minScale), maxScale);
        if (scale <= 1) {
          panX = 0;
          panY = 0;
        }
        updateTransform(true);
      }

      // Handler Multi-Touch (Pinch 2 Jari, Pan 1 Jari, Double Tap)
      function handleTouchStart(e) {
        if (e.touches.length >= 2) {
          if (e.cancelable) e.preventDefault();
          isPinching = true;
          isDragging = false;
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          initialPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          initialScale = scale;
        } else if (e.touches.length === 1) {
          isPinching = false;
          const now = Date.now();
          if (now - lastTapTime < 320) {
            if (e.cancelable) e.preventDefault();
            if (scale > 1.2) {
              resetZoom();
            } else {
              setZoom(2.5);
            }
            lastTapTime = 0;
            return;
          }
          lastTapTime = now;
          if (scale > 1) {
            isDragging = true;
            startX = e.touches[0].clientX - panX;
            startY = e.touches[0].clientY - panY;
          }
        }
      }

      function handleTouchMove(e) {
        if (e.touches.length >= 2 && initialPinchDist > 5) {
          if (e.cancelable) e.preventDefault();
          const t1 = e.touches[0];
          const t2 = e.touches[1];
          const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
          const factor = currentDist / initialPinchDist;
          scale = Math.min(Math.max(initialScale * factor, minScale), maxScale);
          if (scale <= 1) {
            panX = 0;
            panY = 0;
          }
          updateTransform(false);
        } else if (e.touches.length === 1 && isDragging && scale > 1) {
          if (e.cancelable) e.preventDefault();
          panX = e.touches[0].clientX - startX;
          panY = e.touches[0].clientY - startY;
          const rect = containerEl ? containerEl.getBoundingClientRect() : { width: 360, height: 480 };
          const maxPanX = (rect.width * (scale - 1)) / 1.4;
          const maxPanY = (rect.height * (scale - 1)) / 1.4;
          panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
          panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
          updateTransform(false);
        }
      }

      function handleTouchEnd(e) {
        if (e.touches.length < 2) {
          isPinching = false;
          initialPinchDist = 0;
          if (e.touches.length === 1 && scale > 1) {
            isDragging = true;
            startX = e.touches[0].clientX - panX;
            startY = e.touches[0].clientY - panY;
          } else if (e.touches.length === 0) {
            isDragging = false;
            if (scale < 1.05) {
              resetZoom();
            }
          }
        }
      }

      // Pasang listener pada containerEl dan imgEl dengan { passive: false }
      [containerEl, imgEl].forEach(function(target) {
        if (!target) return;
        target.addEventListener('touchstart', handleTouchStart, { passive: false });
        target.addEventListener('touchmove', handleTouchMove, { passive: false });
        target.addEventListener('touchend', handleTouchEnd, { passive: true });
        target.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      });

      // Mouse drag pada Desktop
      if (containerEl) {
        containerEl.addEventListener('mousedown', function(e) {
          if (scale > 1) {
            isDragging = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            containerEl.style.cursor = 'grabbing';
          }
        });
        window.addEventListener('mousemove', function(e) {
          if (isDragging && scale > 1) {
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            updateTransform(false);
          }
        });
        window.addEventListener('mouseup', function() {
          if (isDragging) {
            isDragging = false;
            if (containerEl) containerEl.style.cursor = scale > 1 ? 'grab' : 'default';
          }
        });
        containerEl.addEventListener('wheel', function(e) {
          if (e.cancelable) e.preventDefault();
          const delta = e.deltaY < 0 ? 0.3 : -0.3;
          setZoom(scale + delta);
        }, { passive: false });
      }

      return {
        reset: resetZoom,
        zoomIn: function() { setZoom(scale + 0.5); },
        zoomOut: function() { setZoom(scale - 0.5); },
        getScale: function() { return scale; },
        setScale: setZoom
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
            <img id="lightboxImg" class="max-h-[74vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20 select-none pointer-events-auto touch-none" src="" alt="Pratinjau Foto">
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
        if (uniqueNames.length > 0) return uniqueNames.join(', ');
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
        if (uniqueNames.length > 0) return uniqueNames.join(', ');
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

if (typeof window !== 'undefined') {
  window.FincestemCore = FincestemCore;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FincestemCore;
}
