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

          return {
            success: true,
            user: {
              name: found.nama,
              nisn: found.nisn,
              nis: found.nis,
              class: found.class,
              level: found.level,
              gender: found.gender,
              school_origin: found.asal_sekolah,
              address: found.alamat,
              ttl: found.ttl,
              ayah: found.ayah,
              ibu: found.ibu,
              pekerjaan_ortu: found.pekerjaan_ortu,
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
