const fs = require('fs');

const appFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
let appContent = fs.readFileSync(appFile, 'utf8');

const heroStart = appContent.indexOf('/* ==========================================\r\n   KOMPONEN MANDIRI: HERO SECTION');
let heroStartFixed = heroStart !== -1 ? heroStart : appContent.indexOf('/* ==========================================\n   KOMPONEN MANDIRI: HERO SECTION');

const footerStart = appContent.indexOf('/* ==========================================\r\n   KOMPONEN MANDIRI: FOOTER');
let footerStartFixed = footerStart !== -1 ? footerStart : appContent.indexOf('/* ==========================================\n   KOMPONEN MANDIRI: FOOTER');

if (heroStartFixed === -1 || footerStartFixed === -1) {
    console.error("Could not find start/end bounds for Hero/Footer.");
    process.exit(1);
}

const homeContent = appContent.substring(heroStartFixed, footerStartFixed);

const imports = `import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import founderimg from "../assets/founder.webp";
import cofounderimg from "../assets/co-founder.webp";
import bgSec2 from "../assets/bg-sec2.webp";
import waLogo from "../assets/waLogo.png";

import iconWebDev from "../assets/Icon Web-Dev.png";
import iconAppDev from "../assets/Icon App-Dev.png";
import iconAIAgent from "../assets/Icon AI-Agent.png";
import iconVisualStorytelling from "../assets/Icon Visual Story Telling.png";
import iconBrandingStrategy from "../assets/Icon Branding Strategy.png";
import iconAnimationServices from "../assets/Icon Animation Services.png";

`;

let newHomeContent = imports + homeContent;

// Wrap them into a default export Home component
newHomeContent += `
export default function Home({ scrollToSection, setActiveTab }) {
  return (
    <>
      <HeroSection scrollToSection={scrollToSection} />
      <ServicesSection setActiveTab={setActiveTab} />
      <QnaSection />
    </>
  );
}
`;

fs.writeFileSync('d:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/pages/Home.jsx', newHomeContent);

// Remove the extracted parts from App.jsx
appContent = appContent.substring(0, heroStartFixed) + appContent.substring(footerStartFixed);

// Import Home in App.jsx
appContent = appContent.replace(
  'import { AppsTabSection } from "./pages/Apps";',
  'import { AppsTabSection } from "./pages/Apps";\nimport Home from "./pages/Home";'
);

// Remove the max-w-7xl constraint from <main>
appContent = appContent.replace(
  '<main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">',
  '<main className="relative z-10 w-full">'
);

// Replace the Hero route and remove standalone Services/Qna
appContent = appContent.replace(
  /<Route\s*path="\/"\s*element=\{\s*<HeroSection\s*scrollToSection=\{scrollToSection\}\s*\/>\s*\}\s*\/>/,
  '<Route path="/" element={<Home scrollToSection={scrollToSection} setActiveTab={ubahTabNavigasi} />} />'
);

// Remove standalone Services and Qna
appContent = appContent.replace(/\{\/\*\s*SECTION 2: SERVICES\s*\*\/\}\s*\{currentPath === "\/" && \(\s*<ServicesSection setActiveTab=\{ubahTabNavigasi\} \/>\s*\)\}\s*\{\/\*\s*SECTION 3: QnA\s*\*\/\}\s*\{currentPath === "\/" && <QnaSection \/>\}/, '');

fs.writeFileSync(appFile, appContent);
console.log("Successfully extracted Home!");
