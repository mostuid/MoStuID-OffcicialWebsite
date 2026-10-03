const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace all backtick strings with standard strings
content = content.replace(/`\?page=\$\{pageAktif\}`/g, "'?page=' + pageAktif");
content = content.replace(/`fixed top-4 left-1\/2 -translate-x-1\/2 z-50 rounded-\[100px\] transition-all duration-300 \$\{[\s\S]*?\}`/, `('fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-[100px] transition-all duration-300 ' + (isScrolled ? 'bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 shadow-2xl py-3 px-6' : 'bg-transparent py-4 px-6'))`);

// Are there any other backticks? Let's just fix the mismatched one.
fs.writeFileSync('src/App.jsx', content);
