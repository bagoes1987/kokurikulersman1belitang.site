const fs = require('fs');

function checkFile(path) {
    const content = fs.readFileSync(path, 'utf8');
    let pos = 0;
    let count = 0;
    while ((pos = content.indexOf('<script', pos)) !== -1) {
        const start = content.indexOf('>', pos) + 1;
        const end = content.indexOf('</script>', start);
        if (end === -1) break;
        const scriptTag = content.substring(pos, start);
        if (!scriptTag.includes('src=')) {
            count++;
            const scriptCode = content.substring(start, end);
            try {
                new Function(scriptCode);
            } catch (err) {
                console.error(`ERROR in ${path} script #${count}:`, err.message);
                return false;
            }
        }
        pos = end + 9;
    }
    console.log(`${path}: All ${count} inline scripts passed syntax check.`);
    return true;
}

const ok1 = checkFile('guru/fasilitator.html');
const ok2 = checkFile('siswa/dashboard.html');

if (!ok1 || !ok2) {
    process.exit(1);
} else {
    console.log('ALL SYNTAX CHECKS PASSED!');
}
