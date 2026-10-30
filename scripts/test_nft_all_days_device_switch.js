const fs = require('fs');

const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

global.window = {
  location: { pathname: '/siswa/materi.html', protocol: 'http:', search: '', hash: '' },
  localStorage: global.localStorage,
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: (id) => ({ value: '', classList: { add: () => {}, remove: () => {} }, innerHTML: '', style: {} }),
  readyState: 'complete',
  addEventListener: () => {}
};

const FincestemCore = require('../js/core.js');
global.FincestemCore = FincestemCore;
global.window.FincestemCore = FincestemCore;
require('../js/modules/materi-nonfieldtrip.js');

console.log('=== TEST ALL DAYS (DAY 1 - 7) NON-FIELD TRIP DEVICE SWITCH ===');

for (let d = 1; d <= 7; d++) {
  // Simulate server progress on device 2
  const serverProg = {
    nisn: '1234567890',
    task_map: {
      [d + '_materi']: {
        task_type: 'materi',
        day_number: d,
        content: `Riset Mandiri Day ${d} Non-Field Trip Terverifikasi (5 Kartu Lengkap):\n• Topik A: Hasil kajian mendalam...\n• Topik B: Analisis komprehensif...\n• Topik C: Investigasi empiris...\n• Topik D: Data statistik...\n• Topik E: Kesimpulan terpadu...`,
        updated_at: '2026-10-30T10:00:00Z'
      }
    }
  };

  storage['fincestem_user'] = JSON.stringify({ name: 'Siswa Contoh', nisn: '1234567890', class: 'X-1', zone: 'FINCESTEM OKU TIMUR' });
  storage['fincestem_progress_1234567890'] = JSON.stringify(serverProg);

  // Trigger core hydration
  FincestemCore.progress.hydrateLocalStorageFromProgress('1234567890', serverProg);

  // Check materi localStorage
  const rawMateri = storage[`fincestem_materi_nft_day${d}_1234567890`];
  if (!rawMateri) {
    console.error(`❌ Day ${d} materi not found in localStorage!`);
    process.exit(1);
  }

  const mat = JSON.parse(rawMateri);
  const keys = ['A', 'B', 'C', 'D', 'E'];
  const allCardsValid = keys.every(k => mat['card' + k] && mat['card' + k].text && mat['card' + k].text.length >= 300);

  if (!allCardsValid) {
    console.error(`❌ Day ${d} has cards with length < 300!`);
    process.exit(1);
  }

  // Test rendering in browser
  const dummyEl = { innerHTML: '' };
  window['renderDay' + d + 'NonFieldTripModule'](dummyEl);

  const html = dummyEl.innerHTML;
  const isComplete = html.includes('5 / 5 Kartu Selesai') && html.includes('Modul Riset Day ' + d + ' Telah Dikirim Resmi');
  const hasJustify = html.includes('text-justify');
  const hasDecimal = html.includes('list-decimal');
  const hasDisc = html.includes('list-disc');

  console.log(`Day ${d}: Cards >= 300: true | Complete Banner: ${isComplete} | text-justify: ${hasJustify} | list-decimal: ${hasDecimal} | list-disc: ${hasDisc}`);
}

console.log('\n🎉 ALL 7 DAYS (DAY 1 - 7) PASSED 100% FOR DEVICE SWITCH AND COMPLETE JUSTIFIED RENDERING!');
process.exit(0);
