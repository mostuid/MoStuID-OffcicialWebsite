const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const count = (content.match(/`/g) || []).length;
console.log('Total backticks:', count);
