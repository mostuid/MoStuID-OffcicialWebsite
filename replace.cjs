const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace import
content = content.replace(
  'import PortfolioTabSection from "./pages/Portfolio";',
  'import PortfolioTabSection from "./pages/Portfolio";\nimport { CoursesTabSection, CourseDetailSection } from "./pages/Courses";'
);

// Find start and end indices
const startStr = '/* ==========================================\r\n   DATA KELAS ONLINE - SUMBER TUNGGAL UNTUK COURSES';
let startIdx = content.indexOf(startStr);
if (startIdx === -1) {
    // try with \n
    startIdx = content.indexOf('/* ==========================================\n   DATA KELAS ONLINE - SUMBER TUNGGAL UNTUK COURSES');
}

const endStr = '// ==========================================\r\n// KOMPONEN MANDIRI: TAB ABOUT US (DIPERBAIKI)';
let endIdx = content.indexOf(endStr);
if (endIdx === -1) {
    endIdx = content.indexOf('// ==========================================\n// KOMPONEN MANDIRI: TAB ABOUT US (DIPERBAIKI)');
}

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + content.substring(endIdx);
  fs.writeFileSync(file, content);
  console.log('Successfully replaced');
} else {
  console.log('Could not find start or end index', startIdx, endIdx);
}
