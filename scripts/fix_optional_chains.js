const fs = require('fs');

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Specific common patterns
  code = code.replace(/res\.data\?\.photo_url/g, '(res.data && res.data.photo_url)');
  code = code.replace(/res\.data\?\.teachers/g, '(res.data && res.data.teachers)');
  code = code.replace(/currentStudent\?\.nisn/g, '(currentStudent && currentStudent.nisn)');
  code = code.replace(/currentStudent\?\.class_name/g, '(currentStudent && currentStudent.class_name)');
  code = code.replace(/currentStudent\?\.class/g, '(currentStudent && currentStudent.class)');
  code = code.replace(/currentStudent\?\.zone/g, '(currentStudent && currentStudent.zone)');
  code = code.replace(/currentStudent\?\.facilitator_name/g, '(currentStudent && currentStudent.facilitator_name)');
  code = code.replace(/reflTask\.content\?\.content/g, '(reflTask.content && reflTask.content.content)');
  code = code.replace(/student\?\.is_location_exempt/g, '(student && student.is_location_exempt)');
  code = code.replace(/user\?\.is_location_exempt/g, '(user && user.is_location_exempt)');
  code = code.replace(/currentUser\?\.nis/g, '(currentUser && currentUser.nis)');
  code = code.replace(/currentUser\?\.identifier/g, '(currentUser && currentUser.identifier)');
  code = code.replace(/user\?\.nis/g, '(user && user.nis)');
  code = code.replace(/user\?\.identifier/g, '(user && user.identifier)');

  // Form input getters
  code = code.replace(/document\.getElementById\(([^)]+)\)\?\.checked/g, '(document.getElementById($1) && document.getElementById($1).checked)');
  code = code.replace(/document\.getElementById\(([^)]+)\)\?\.value/g, '(document.getElementById($1) ? document.getElementById($1).value : "")');
  code = code.replace(/document\.querySelector\(([^)]+)\)\?\.value/g, '(document.querySelector($1) ? document.querySelector($1).value : "")');
  code = code.replace(/document\.getElementById\(([^)]+)\)\?\.focus\(\)/g, '{ var _fEl = document.getElementById($1); if (_fEl) _fEl.focus(); }');

  // Element variables: qEl?.value, rEl?.value, zEl?.value, selDay?.value, inpScore?.value, selStars?.value, inpReason?.value
  code = code.replace(/qEl\?\.value/g, '(qEl ? qEl.value : "")');
  code = code.replace(/rEl\?\.value/g, '(rEl ? rEl.value : "")');
  code = code.replace(/zEl\?\.value/g, '(zEl ? zEl.value : "")');
  code = code.replace(/selDay\?\.value/g, '(selDay ? selDay.value : "")');
  code = code.replace(/inpScore\?\.value/g, '(inpScore ? inpScore.value : "")');
  code = code.replace(/selStars\?\.value/g, '(selStars ? selStars.value : "")');
  code = code.replace(/inpReason\?\.value/g, '(inpReason ? inpReason.value : "")');

  // Fasilitator latest feedback
  code = code.replace(/prog\?\.latest_feedback\?\.feedback/g, '(prog && prog.latest_feedback && prog.latest_feedback.feedback)');
  code = code.replace(/prog\.latest_feedback\?\.feedback/g, '(prog.latest_feedback && prog.latest_feedback.feedback)');

  // Cards
  code = code.replace(/nftMat\.cardA\?\.text/g, '(nftMat.cardA && nftMat.cardA.text)');
  code = code.replace(/nftMat\.cardA\?\.title/g, '(nftMat.cardA && nftMat.cardA.title)');
  code = code.replace(/nftMat\.cardB\?\.title/g, '(nftMat.cardB && nftMat.cardB.title)');
  code = code.replace(/nftMat\.cardC\?\.title/g, '(nftMat.cardC && nftMat.cardC.title)');
  code = code.replace(/nftMat\.cardD\?\.title/g, '(nftMat.cardD && nftMat.cardD.title)');
  code = code.replace(/nftMat\.cardE\?\.title/g, '(nftMat.cardE && nftMat.cardE.title)');
  code = code.replace(/c\.data\?\.text/g, '(c.data && c.data.text)');
  code = code.replace(/c\.data\?\.source/g, '(c.data && c.data.source)');

  fs.writeFileSync(filePath, code, 'utf8');

  const remaining = [...code.matchAll(/\?\.[a-zA-Z_]/g)];
  console.log(filePath + ' remaining optional chains:', remaining.length);
  if (remaining.length > 0) {
    const lines = code.split('\n');
    lines.forEach((l, i) => {
      if (/\?\.[a-zA-Z_]/.test(l)) console.log(`  Line ${i+1}: ${l.trim()}`);
    });
  }
}

cleanFile('siswa/dokumentasi.html');
cleanFile('siswa/dashboard.html');
cleanFile('guru/fasilitator.html');
cleanFile('admin/index.html');
