const fs = require('fs');
const path = require('path');
const vm = require('vm');

const bankSoalCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data', 'bank-soal-nonfieldtrip.js'), 'utf8');
const asesmenCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'asesmen-nonfieldtrip.js'), 'utf8');

const mockStorage = {};
const mockWindow = {
  location: { replace: () => {}, href: '', search: '?day=3' },
  localStorage: {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; }
  },
  activeUser: { name: 'Default User', nisn: '12345', class: 'X-E1' },
  FincestemCore: {
    auth: {
      getUser: () => mockWindow.activeUser
    },
    progress: {
      submitTask: (nisn, day, task, payload, cb) => cb && cb()
    }
  }
};

const domElements = {};
const ctx = {
  window: mockWindow,
  document: {
    getElementById: (id) => {
      if (!domElements[id]) {
        domElements[id] = { innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} } };
      }
      return domElements[id];
    },
    addEventListener: () => {},
    fullscreenElement: null,
    exitFullscreen: async () => {}
  },
  localStorage: mockWindow.localStorage,
  navigator: { userAgent: 'Chrome' },
  location: mockWindow.location,
  alert: (msg) => console.log('ALERT:', msg),
  confirm: () => true
};

vm.createContext(ctx);
vm.runInContext(bankSoalCode, ctx);
vm.runInContext(asesmenCode, ctx);

console.log('✅ Both scripts loaded in VM successfully!');

// Test sectors
const sectors = ['pertanian', 'perkebunan', 'perikanan', 'peternakan'];

sectors.forEach(sec => {
  const nisn = 'NISN_' + sec.toUpperCase();
  // Set student sector in storage
  mockStorage['fincestem_nft_sector_d3_' + nisn] = sec;
  // Set prerequisite materi and lkpd
  mockStorage['fincestem_materi_nft_day3_' + nisn] = JSON.stringify({ submitted: true, sector: sec });
  mockStorage['fincestem_lkpd_nft_day3_' + nisn] = JSON.stringify({ submitted: true, sector: sec });

  mockWindow.activeUser = { name: 'Test Student ' + sec, nisn: nisn, class: 'X-E2' };
  ctx.window.initNonFieldTripAsesmenPage(3);

  const pkgKey = `fincestem_pkg_nft_asesmen_v2_d3_${sec}_${nisn}`;
  const pkg = JSON.parse(mockStorage[pkgKey] || '[]');
  console.log(`\nTesting sector: ${sec}`);
  console.log(`- Package questions count: ${pkg.length} (Expected: 50)`);
  if (pkg.length !== 50) throw new Error('Package length mismatch! Got: ' + pkg.length);

  // Check that all questions belong to this sector
  const wrongSectorQ = pkg.filter(q => q.sector !== sec);
  console.log(`- Non-matching sector questions: ${wrongSectorQ.length} (Expected: 0)`);
  if (wrongSectorQ.length > 0) throw new Error('Found wrong sector questions!');

  // Check indicators distribution (10 per indicator A-E)
  const indCounts = {};
  pkg.forEach(q => { indCounts[q.indicatorCode] = (indCounts[q.indicatorCode] || 0) + 1; });
  console.log(`- Indicators distribution:`, indCounts);
  ['A', 'B', 'C', 'D', 'E'].forEach(code => {
    if (indCounts[code] !== 10) throw new Error(`Indicator ${code} count is not 10!`);
  });

  // Verify options count & correct key
  let validKeys = true;
  pkg.forEach(q => {
    if (!q.options || q.options.length !== 5) validKeys = false;
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correctKey)) validKeys = false;
  });
  console.log(`- Options integrity (5 options A-E and valid correctKey): ${validKeys}`);
  if (!validKeys) throw new Error('Option integrity check failed!');
});

console.log('\n--- Checking Day 0, Day 1, and Day 2 ---');
// Day 0
mockStorage['fincestem_materi_nft_day0_999'] = JSON.stringify({ submitted: true });
mockStorage['fincestem_lkpd_nft_day0_999'] = JSON.stringify({ submitted: true });
mockWindow.activeUser = { name: 'Day 0 Tester', nisn: '999', class: 'X-E1' };
ctx.window.initNonFieldTripAsesmenPage(0);
const d0Pkg = JSON.parse(mockStorage['fincestem_pkg_nft_asesmen_v2_d0_999'] || '[]');
console.log('Day 0 package length:', d0Pkg.length, '(Expected: 10)');
if (d0Pkg.length !== 10) throw new Error('Day 0 mismatch!');

// Day 1
mockStorage['fincestem_materi_nft_day1_888'] = JSON.stringify({ submitted: true });
mockStorage['fincestem_lkpd_nft_day1_888'] = JSON.stringify({ submitted: true });
mockWindow.activeUser = { name: 'Day 1 Tester', nisn: '888', class: 'X-E1' };
ctx.window.initNonFieldTripAsesmenPage(1);
const d1Pkg = JSON.parse(mockStorage['fincestem_pkg_nft_asesmen_v2_d1_888'] || '[]');
console.log('Day 1 package length:', d1Pkg.length, '(Expected: 50)');
if (d1Pkg.length !== 50) throw new Error('Day 1 mismatch!');

// Day 2
mockStorage['fincestem_materi_nft_day2_777'] = JSON.stringify({ submitted: true });
mockStorage['fincestem_lkpd_nft_day2_777'] = JSON.stringify({ submitted: true });
mockWindow.activeUser = { name: 'Day 2 Tester', nisn: '777', class: 'X-E1' };
ctx.window.initNonFieldTripAsesmenPage(2);
const d2Pkg = JSON.parse(mockStorage['fincestem_pkg_nft_asesmen_v2_d2_777'] || '[]');
console.log('Day 2 package length:', d2Pkg.length, '(Expected: 50)');
if (d2Pkg.length !== 50) throw new Error('Day 2 mismatch!');

console.log('\n🎉 ALL E2E ASESMEN TESTS PASSED 100%!');
