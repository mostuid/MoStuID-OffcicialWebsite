const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
const regex = /`/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Backtick at ${match.index}: ${content.substring(match.index - 10, match.index + 10)}`);
}
