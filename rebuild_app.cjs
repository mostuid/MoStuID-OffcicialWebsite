const fs = require('fs');
const execSync = require('child_process').execSync;

const originalApp = execSync('git show HEAD:src/App.jsx').toString('utf8');
let content = originalApp;

// 1. Add imports
content = content.replace(
    'import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";',
    `import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AboutTabSection from "./pages/About";
import PortfolioTabSection from "./pages/Portfolio";
import { CoursesTabSection, CourseDetailSection } from "./pages/Courses";
import { AppsTabSection } from "./pages/Apps";
import Home from "./pages/Home";`
);

// 2. Change all "products" to "apps" in App.jsx (only activeTab references)
content = content.replace(/activeTab === "products"/g, 'activeTab === "apps"');
content = content.replace(/ubahTabNavigasi\("products"\)/g, 'ubahTabNavigasi("apps")');
content = content.replace(/>\s*Products\s*</g, '>Apps<');
content = content.replace(/>\s*Products\s*<span/g, '>\n                      Apps\n                      <span');
content = content.replace(/>\n\s*Products\n/g, '>\n                      Apps\n');

// 3. Remove inline components that were extracted:
// HeroSection, ServicesSection, QnaSection, ScrollAnimateWrapper, TypewriterEffect, 
// PortfolioTabSection, AboutTabSection, CoursesTabSection, CourseDetailSection, AppsTabSection
// (AppsTabSection was inline in Route)

const removeBlock = (startStr, endStr) => {
    let s = content.indexOf(startStr);
    let e = content.indexOf(endStr);
    if (s !== -1 && e !== -1) {
        content = content.substring(0, s) + content.substring(e);
    }
};

removeBlock('/* ==========================================\r\n   DATA KELAS ONLINE', '/* ==========================================\r\n   KOMPONEN MANDIRI: TAB ABOUT US');
removeBlock('/* ==========================================\n   DATA KELAS ONLINE', '/* ==========================================\n   KOMPONEN MANDIRI: TAB ABOUT US');

removeBlock('/* ==========================================\r\n   KOMPONEN MANDIRI: TAB ABOUT US', 'function App() {');
removeBlock('/* ==========================================\n   KOMPONEN MANDIRI: TAB ABOUT US', 'function App() {');

// Remove Hero, Services, Qna, ScrollAnimateWrapper
// Find where Hero starts:
let heroStart = content.indexOf('/* ==========================================\r\n   KONFIGURASI UKURAN PER BREAKPOINT');
if (heroStart === -1) heroStart = content.indexOf('/* ==========================================\n   KONFIGURASI UKURAN PER BREAKPOINT');
if (heroStart === -1) heroStart = content.indexOf('const HERO_CONFIG');

let footerStart = content.indexOf('/* ==========================================\r\n   KOMPONEN MANDIRI: FOOTER');
if (footerStart === -1) footerStart = content.indexOf('/* ==========================================\n   KOMPONEN MANDIRI: FOOTER');

if (heroStart !== -1 && footerStart !== -1) {
    content = content.substring(0, heroStart) + content.substring(footerStart);
}

// Remove TypewriterEffect
let twStart = content.indexOf('/* =========================================================================\r\n   KOMPONEN PEMBANTU: AUTOMATIC TYPEWRITER EFFECT');
if (twStart === -1) twStart = content.indexOf('/* =========================================================================\n   KOMPONEN PEMBANTU: AUTOMATIC TYPEWRITER EFFECT');
let endApp = content.indexOf('export default App;');
if (twStart !== -1 && endApp !== -1) {
    content = content.substring(0, twStart) + content.substring(endApp);
}

// 4. Update the Routes block and main container
let routesRegex = /<main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">[\s\S]*?<\/Routes>\s*<\/main>/;
let newRoutes = `<main className="relative z-10 w-full">
                <Routes>
                  <Route path="/" element={<Home scrollToSection={scrollToSection} setActiveTab={ubahTabNavigasi} />} />
                  <Route path="/portfolio" element={<div className="mt-20"><PortfolioTabSection currentFilter={portfolioFilter} setFilter={setPortfolioFilter} setActiveTab={ubahTabNavigasi} /></div>} />
                  <Route path="/courses" element={<div className="mt-20"><CoursesTabSection setActiveTab={ubahTabNavigasi} /></div>} />
                  <Route path="/courses/:slug" element={<div className="mt-20"><CourseDetailSection setActiveTab={ubahTabNavigasi} /></div>} />
                  <Route path="/portfolio/prototype-airlines" element={<PrototypeRedirect />} />
                  <Route path="/portfolio/prototype-gogreen" element={<PrototypeRedirect />} />
                  <Route path="/apps" element={<AppsTabSection />} />
                  <Route path="/about" element={<div className="mt-20"><AboutTabSection /></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>`;
content = content.replace(routesRegex, newRoutes);

// 5. Remove lingering Services and Qna renders below main
let removeRenderServicesQna = /\{\/\*\s*SECTION 2: SERVICES\s*\*\/\}\s*\{currentPath === "\/" && \(\s*<ServicesSection setActiveTab=\{ubahTabNavigasi\} \/>\s*\)\}\s*\{\/\*\s*SECTION 3: QnA\s*\*\/\}\s*\{currentPath === "\/" && <QnaSection \/>\}/;
content = content.replace(removeRenderServicesQna, '');

fs.writeFileSync('d:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx', content);
console.log("App.jsx rebuilt cleanly!");
