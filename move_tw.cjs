const fs = require('fs');
const appFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
const homeFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/pages/Home.jsx';

let appContent = fs.readFileSync(appFile, 'utf8');
const twStart = appContent.indexOf('function TypewriterEffect');
const twEnd = appContent.indexOf('export default App;');
const twContent = appContent.substring(twStart, twEnd);

appContent = appContent.substring(0, twStart) + appContent.substring(twEnd);
fs.writeFileSync(appFile, appContent);

let homeContent = fs.readFileSync(homeFile, 'utf8');
homeContent += '\n' + twContent;
fs.writeFileSync(homeFile, homeContent);

console.log('Moved TypewriterEffect to Home.jsx');
