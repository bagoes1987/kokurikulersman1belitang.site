/**
 * FINCESTEM 2026 - Master Mock Database & Storage Bridge
 * Terhubung otomatis ke LocalStorage browser sehingga data siswa, guru, dan admin tersinkronisasi.
 */
const FINCESTEM_DB_KEY = 'fincestem_db_2026_v1';

const defaultDB = {
  version: '2026.1',
  currentUser: null,
  groups: [],
  modules: [
    {
      id: 'mod-financial',
      pillar: 'Financial',
      title: 'Literasi Finansial & Tata Niaga Gabah Belitang',
      subtitle: 'Manajemen Keuangan Pertanian & Rantai Nilai Ekonomi',
      desc: 'Memahami kalkulasi HPP, margin pedagang pengumpul, pembukuan agribisnis digital, dan pembiayaan lumbung desa modern.',
      duration: '45 Menit',
      color: 'amber',
      accent: '#d97706',
      icon: 'payments',
      contents: [
        'Konsep Dasar Biaya Produksi (Benih, Pupuk, Mesin Combine Harvester).',
        'Studi Kasus Pembentukan Harga Gabah Kering Panen (GKP) vs Gabah Kering Giling (GKG).',
        'Model Perbankan Rakyat & Peran Bank Daerah dalam Ketahanan Pangan OKU Timur.'
      ]
    },
    {
      id: 'mod-culture',
      pillar: 'Culture',
      title: 'Kearifan Lokal & Multikulturalisme Belitang',
      subtitle: 'Akulturasi Budaya Komering, Jawa Kolonisasi & Bali',
      desc: 'Mengeksplorasi toleransi budaya, sejarah penamaan Blok Kurungan (BK), tradisi gotong royong sambatan, dan kearifan ekologis leluhur.',
      duration: '40 Menit',
      color: 'purple',
      accent: '#7c3aed',
      icon: 'account_balance',
      contents: [
        'Kronik Sejarah Kolonisasi Belanda 1937 di Belitang.',
        'Integrasi Sosio-Kultural Masyarakat Transmigran dan Penduduk Asli Komering.',
        'Nilai Falsafah Luhur: Piil Pesenggiri dan Semangat Gotong Royong Petani.'
      ]
    },
    {
      id: 'mod-exploration',
      pillar: 'Exploration',
      title: 'Eksplorasi Spasial & Daerah Aliran Sungai Komering',
      subtitle: 'Pemetaan Geografis, Topografi & Manajemen Saluran Terbuka',
      desc: 'Observasi bentang alam, morfologi tanah alluvial, navigasi rute lapangan, dan survei tata ruang perairan terpadu OKU Timur.',
      duration: '50 Menit',
      color: 'emerald',
      accent: '#059669',
      icon: 'explore',
      contents: [
        'Peta Daerah Irigasi Komering seluas 120.000 Hektar.',
        'Metode Pengukuran Elevasi Saluran Primer, Sekunder, dan Tersier.',
        'Keselamatan dan Manajemen Risiko Ekspedisi Riset Lapangan Peserta Didik.'
      ]
    },
    {
      id: 'mod-stem',
      pillar: 'STEM',
      title: 'Sains, Rekayasa Irigasi & Kualitas Air Pertanian',
      subtitle: 'Pengujian Laboratorium Lapangan & Teknologi Tepat Guna',
      desc: 'Pengukuran debit aliran air (Q = A x v), analisis baku mutu pH, kekeruhan, konduktivitas listrik (EC), dan pemanfaatan sensor IoT tanah.',
      duration: '60 Menit',
      color: 'blue',
      accent: '#2563eb',
      icon: 'science',
      contents: [
        'Prinsip Fluida Dinamis pada Pintu Air Romijn dan Bendung Gerak.',
        'Prosedur Pengujian pH Meter Digital dan Kit Uji Kimia Air Lapangan.',
        'Desain Solusi Rekayasa Berkelanjutan Mengurangi Sedimentasi Saluran Irigasi.'
      ]
    }
  ],
  documentation: []
};

const FincestemDB = {
  get: function() {
    try {
      const stored = localStorage.getItem(FINCESTEM_DB_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error, using memory default', e);
    }
    this.save(defaultDB);
    return JSON.parse(JSON.stringify(defaultDB));
  },

  save: function(data) {
    try {
      localStorage.setItem(FINCESTEM_DB_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save DB state', e);
    }
  },

  getGroup: function(groupId) {
    const db = this.get();
    return db.groups.find(g => g.id === groupId) || db.groups[0];
  },

  updateGroupLKPD: function(groupId, lkpdData, fileName, fileSize) {
    const db = this.get();
    const grp = db.groups.find(g => g.id === groupId);
    if (grp) {
      grp.lkpdSubmitted = true;
      grp.status = 'Menunggu Penilaian';
      grp.submittedAt = 'Baru saja';
      grp.fileName = fileName || 'Laporan_LKPD_Terkirim.pdf';
      grp.fileSize = fileSize || '2.5 MB';
      grp.answers = Object.assign({}, grp.answers, lkpdData);
      this.save(db);
      return grp;
    }
    return null;
  },

  gradeGroup: function(groupId, rubricScores, feedback) {
    const db = this.get();
    const grp = db.groups.find(g => g.id === groupId);
    if (grp) {
      const fin = parseInt(rubricScores.financial) || 0;
      const cul = parseInt(rubricScores.culture) || 0;
      const exp = parseInt(rubricScores.exploration) || 0;
      const stem = parseInt(rubricScores.stem) || 0;
      const avg = Math.round((fin + cul + exp + stem) / 4);

      grp.scores = { financial: fin, culture: cul, exploration: exp, stem: stem, average: avg };
      grp.isGraded = true;
      grp.status = 'Selesai Dinilai (' + avg + '/100)';
      grp.feedback = feedback || 'Dinilai oleh Fasilitator.';
      this.save(db);
      return grp;
    }
    return null;
  },

  approveRoute: function(groupId) {
    const db = this.get();
    const grp = db.groups.find(g => g.id === groupId);
    if (grp) {
      grp.routeStatus = 'Disetujui';
      this.save(db);
      return grp;
    }
    return null;
  },

  addDocumentation: function(photo) {
    const db = this.get();
    if (!Array.isArray(db.documentation)) db.documentation = [];
    const newDoc = {
      id: 'doc-' + Date.now(),
      title: photo.title || 'Dokumentasi Lapangan Baru',
      category: photo.category || 'STEM',
      pillar: photo.pillar || photo.category || 'STEM',
      author: photo.author || 'Siswa',
      date: photo.date || 'Baru saja',
      url: photo.url || '',
      description: photo.description || ''
    };
    db.documentation.unshift(newDoc);
    this.save(db);
    return newDoc;
  },

  resetDefaults: function() {
    this.save(defaultDB);
    return defaultDB;
  }
};

// Expose globally
window.FincestemDB = FincestemDB;
