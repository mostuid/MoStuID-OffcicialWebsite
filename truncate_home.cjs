const fs = require('fs');
const content = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const p = content.indexOf('/* ==========================================\n   KOMPONEN MANDIRI: SECTION 1 (HERO CONTAINER)', 40000);
if (p !== -1) {
    fs.writeFileSync('src/pages/Home.jsx', content.substring(0, p));
    console.log('Truncated Home.jsx at index', p);
} else {
    console.log('Truncation point not found!');
}
