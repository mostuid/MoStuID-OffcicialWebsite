const execSync = require('child_process').execSync;
const fs = require('fs');
const originalApp = execSync('git show HEAD:src/App.jsx').toString('utf8');
const lines = originalApp.split('\n');
let start = lines.findIndex(l => l.includes('{isPrototypePage ? ('));
let end = lines.findIndex(l => l.includes('<Route path="/portfolio/prototype-airlines"'));
console.log(lines.slice(start, end).join('\n'));
fs.writeFileSync('missing_header.txt', lines.slice(start, end).join('\n'));
