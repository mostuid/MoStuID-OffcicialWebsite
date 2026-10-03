const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
content = content.replace(
  'import { CoursesTabSection, CourseDetailSection } from "./pages/Courses";',
  'import { CoursesTabSection, CourseDetailSection } from "./pages/Courses";\nimport { AppsTabSection } from "./pages/Apps";'
);

// 2. Replace activeTab checks and button texts
content = content.replace(/activeTab === "products"/g, 'activeTab === "apps"');
content = content.replace(/ubahTabNavigasi\("products"\)/g, 'ubahTabNavigasi("apps")');
content = content.replace(/>\s*Products\s*</g, '>Apps<');
content = content.replace(/>\s*Products\s*<span/g, '>\n                      Apps\n                      <span');
content = content.replace(/>\n\s*Products\n/g, '>\n                      Apps\n');

// Replace the large route element with the imported component
const startSearch = '<Route\\s+path="/products"\\s+element=\\{\\s*<div className="mt-20">\\s*<div className="absolute inset-0';
const rx = new RegExp('<Route[\\s\\S]*?path="/products"[\\s\\S]*?element=\\{[\\s\\S]*?<div className="mt-20">[\\s\\S]*?<div className="absolute inset-0[\\s\\S]*?</div>\\s*\\}\\s*/>');
content = content.replace(rx, '<Route\n                    path="/apps"\n                    element={<AppsTabSection />}\n                  />');

fs.writeFileSync(file, content);
console.log('App.jsx updated for Apps');
