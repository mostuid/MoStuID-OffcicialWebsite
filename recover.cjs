const fs = require('fs');

const temp = fs.readFileSync('temp_app.jsx', 'utf8');
const pFooter = temp.indexOf('function Footer');
const footerAndBelow = temp.substring(pFooter);

let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app + '\n' + footerAndBelow;

fs.writeFileSync('src/App.jsx', app);
console.log('Appended Footer and NotFound to App.jsx');
