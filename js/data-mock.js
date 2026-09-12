/**
 * FINCESTEM 2026 - Master Mock Database & Storage Bridge
 * Terhubung otomatis ke LocalStorage browser sehingga data siswa, guru, dan admin tersinkronisasi.
 */
const FINCESTEM_DB_KEY = 'fincestem_db_2026_v1';

const defaultDB = {
  version: '2026.1',
  currentUser: {
    nisn: '007261944',
    name: 'Anindya Putri Rahayu',
    class: 'XI MIPA 1',
    group: 'Kelompok 4 - Belitang Cerdas',
    groupId: 'group-4',
    role: 'Ketua Kelompok',
    phone: '0812-7890-1234',
    email: 'anindya.putri@sman1belitang.sch.id'
  },
  groups: [
    {
      id: 'group-4',
      number: 4,
      name: 'Kelompok 4 - Belitang Cerdas',
      class: 'XI MIPA 1',
      zone: 'Zona OKU Timur',
      destination: 'Saluran Irigasi Primer BK 9 & Sentra Penggilingan Padi',
      leader: 'Anindya Putri Rahayu',
      facilitator: 'Rahmat Hidayat, S.Pd., Gr.',
      status: 'Laporan Dikirim',
      lkpdSubmitted: true,
      submittedAt: '12 Sep 2026, 14:30 WIB',
      fileName: 'Laporan_Kelompok4_FINCESTEM_BK9.pdf',
      fileSize: '3.4 MB',
      answers: {
        ph: '6.8',
        debit: '14.2 m3/s',
        suhu: '28.5 °C',
        hpp: 'Rp 6.200 / kg',
        hargaJual: 'Rp 7.400 / kg',
        catatanBudaya: 'Tradisi sambatan / gotong royong para petani transmigran Belitang dalam pengelolaan air saluran irigasi sekunder sangat terjaga.',
        kesimpulan: 'Kualitas air saluran irigasi BK 9 memenuhi standar baku mutu pertanian kelas II dengan pH optimal untuk varietas Ciherang dan Inpari 32.'
      },
      routeStatus: 'Disetujui',
      scores: {
        financial: 95,
        culture: 92,
        exploration: 96,
        stem: 94,
        average: 94
      },
      isGraded: true,
      feedback: 'Analisis debit air dan perhitungan marjin ekonomi sangat akurat. Dokumentasi lapangan lengkap dan memenuhi standar akademik.'
    },
    {
      id: 'group-1',
      number: 1,
      name: 'Kelompok 1 - Sinar Komering',
      class: 'XI MIPA 1',
      zone: 'Zona OKU Timur',
      destination: 'Hulu Sungai Komering & Situs Sejarah Candi Martapura',
      leader: 'Ahmad Fauzi',
      facilitator: 'Rahmat Hidayat, S.Pd., Gr.',
      status: 'Selesai Dinilai',
      lkpdSubmitted: true,
      submittedAt: '11 Sep 2026, 16:15 WIB',
      fileName: 'LKPD_Kelompok1_Final.pdf',
      fileSize: '2.8 MB',
      answers: {},
      routeStatus: 'Disetujui',
      scores: { financial: 90, culture: 94, exploration: 92, stem: 90, average: 92 },
      isGraded: true,
      feedback: 'Analisis kearifan lokal sangat mendalam.'
    },
    {
      id: 'group-2',
      number: 2,
      name: 'Kelompok 2 - Sriwijaya Muda',
      class: 'XI MIPA 2',
      zone: 'Zona OKU Timur',
      destination: 'Bendungan Perjaya & Saluran Sekunder BK 3',
      leader: 'Rian Pratama',
      facilitator: 'Rahmat Hidayat, S.Pd., Gr.',
      status: 'Menunggu Penilaian',
      lkpdSubmitted: true,
      submittedAt: '12 Sep 2026, 11:20 WIB',
      fileName: 'Laporan_Kelompok2_Perjaya.pdf',
      fileSize: '4.1 MB',
      answers: {},
      routeStatus: 'Menunggu',
      scores: null,
      isGraded: false,
      feedback: ''
    },
    {
      id: 'group-3',
      number: 3,
      name: 'Kelompok 3 - Mitra Tani Belitang',
      class: 'XI MIPA 2',
      zone: 'Zona Luar OKU Timur',
      destination: 'Balai Besar Riset Padi Sukamandi & Pasar Induk Jakabaring',
      leader: 'Siti Aminah',
      facilitator: 'Rahmat Hidayat, S.Pd., Gr.',
      status: 'Eksplorasi Lapangan',
      lkpdSubmitted: false,
      submittedAt: null,
      fileName: null,
      fileSize: null,
      answers: {},
      routeStatus: 'Disetujui',
      scores: null,
      isGraded: false,
      feedback: ''
    }
  ],
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
  documentation: [
    {
      id: 'doc-1',
      title: 'Pengambilan Sampel Air di Pintu Pembagi BK 9',
      category: 'STEM',
      pillar: 'STEM',
      author: 'Kelompok 4 - Belitang Cerdas',
      date: '12 Sep 2026, 09:15 WIB',
      url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      description: 'Pengujian pH air irigasi menggunakan pH meter digital dan kertas lakmus terstandar.'
    },
    {
      id: 'doc-2',
      title: 'Wawancara Analisis Harga Bersama Petani & Penebas Gabah',
      category: 'Financial',
      pillar: 'Financial',
      author: 'Kelompok 4 - Belitang Cerdas',
      date: '12 Sep 2026, 10:45 WIB',
      url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      description: 'Diskusi struktur biaya benih, pupuk subsidi, dan biaya angkut gabah menuju penggilingan.'
    },
    {
      id: 'doc-3',
      title: 'Dokumentasi Prasasti dan Struktur Bangunan Pintu Air Kolonial',
      category: 'Culture',
      pillar: 'Culture',
      author: 'Kelompok 4 - Belitang Cerdas',
      date: '12 Sep 2026, 11:30 WIB',
      url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
      description: 'Pencatatan data sejarah arsitektur hidrolik peninggalan era kolonisasi 1937.'
    },
    {
      id: 'doc-4',
      title: 'Survei Aliran Debit Air Menggunakan Metode Current Meter',
      category: 'Exploration',
      pillar: 'Exploration',
      author: 'Kelompok 4 - Belitang Cerdas',
      date: '12 Sep 2026, 13:10 WIB',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      description: 'Pengukuran kecepatan aliran saluran sekunder untuk kalkulasi debit volume per detik.'
    }
  ]
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
    const newDoc = {
      id: 'doc-' + Date.now(),
      title: photo.title || 'Dokumentasi Lapangan Baru',
      category: photo.category || 'STEM',
      pillar: photo.pillar || photo.category || 'STEM',
      author: photo.author || 'Kelompok 4 - Belitang Cerdas',
      date: 'Baru saja',
      url: photo.url || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      description: photo.description || 'Dokumentasi kegiatan kokurikuler lapangan FINCESTEM 2026.'
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
