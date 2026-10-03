const fs = require('fs');

const appFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
let appContent = fs.readFileSync(appFile, 'utf8');

const heroStart = appContent.indexOf('function HeroSection');

const footerStart = appContent.indexOf('/* ==========================================\r\n   KOMPONEN MANDIRI: FOOTER');
let footerStartFixed = footerStart !== -1 ? footerStart : appContent.indexOf('/* ==========================================\n   KOMPONEN MANDIRI: FOOTER');

if (heroStart === -1 || footerStartFixed === -1) {
    console.error("Could not find start/end bounds for Hero/Footer.");
    process.exit(1);
}

const homeContent = appContent.substring(heroStart, footerStartFixed);

const imports = `import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import founderimg from "../assets/founder.webp";
import cofounderimg from "../assets/co-founder.webp";
import bgSec2 from "../assets/bg-sec2.webp";
import waLogo from "../assets/waLogo.png";
import whoNext from "../assets/Whos-Next.webp";

import iconWebDev from "../assets/Icon Web-Dev.png";
import iconAppDev from "../assets/Icon App-Dev.png";
import iconAIAgent from "../assets/Icon AI-Agent.png";
import iconVisualStorytelling from "../assets/Icon Visual Story Telling.png";
import iconBrandingStrategy from "../assets/Icon Branding Strategy.png";
import iconAnimationServices from "../assets/Icon Animation Services.png";

const BREAKPOINT_ORDER = [
  { key: "desktopLg", min: 1440 },
  { key: "desktopMd", min: 1200 },
  { key: "desktopSm", min: 1024 },
  { key: "tabletLg", min: 864 },
  { key: "tabletMd", min: 768 },
  { key: "tabletSm", min: 640 },
  { key: "mobileLg", min: 540 },
  { key: "mobileMd", min: 480 },
  { key: "mobileSm", min: 0 },
];

function getTierKey(width) {
  for (const bp of BREAKPOINT_ORDER) {
    if (width >= bp.min) return bp.key;
  }
  return "mobileSm";
}

`;

let newHomeContent = imports + homeContent;

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

appContent = appContent.substring(0, heroStart) + appContent.substring(footerStartFixed);

appContent = appContent.replace(
  'import { AppsTabSection } from "./pages/Apps";',
  'import { AppsTabSection } from "./pages/Apps";\nimport Home from "./pages/Home";'
);

appContent = appContent.replace(
  '<main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">',
  '<main className="relative z-10 w-full">'
);

const r = new RegExp('<Route\\s*path="/"\\s*element=\\{\\s*<HeroSection[\\s\\S]*?\\/>\\s*\\}\\s*\\/>');
appContent = appContent.replace(
  r,
  '<Route path="/" element={<Home scrollToSection={scrollToSection} setActiveTab={ubahTabNavigasi} />} />'
);

appContent = appContent.replace(/\{\/\*\s*SECTION 2: SERVICES\s*\*\/\}\s*\{currentPath === "\/" && \(\s*<ServicesSection setActiveTab=\{ubahTabNavigasi\} \/>\s*\)\}\s*\{\/\*\s*SECTION 3: QnA\s*\*\/\}\s*\{currentPath === "\/" && <QnaSection \/>\}/, '');

fs.writeFileSync(appFile, appContent);
console.log("Successfully extracted Home!");
