const fs = require('fs');

const homeFile = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/pages/Home.jsx';
let content = fs.readFileSync(homeFile, 'utf8');

const heroConfigString = `
const HERO_CONFIG = {
  desktop: {
    h1Size: 170,          // px, ukuran font "AGENCY"
    labelSize: 30,        // px, ukuran font "Digital & Creative"
    labelTop: -38,        // px, jarak label ke atas h1 (nilai negatif)
    labelRight: 40,       // px, jarak label dari kanan blok teks
    circleSize: 620,      // px, diameter lingkaran oranye
    photoMaxWidth: 580,   // px, lebar maksimum foto talent
    photoMinHeight: 640,  // px, jaga-jaga agar wrapper foto tidak collapse
    badgeMinWidth: 300,   // px
    badgeRight: 40,       // px, jarak badge nama dari kanan wrapper foto
    badgeBottom: 70,      // px, jarak badge nama dari bawah wrapper foto
    mouseLeft: 166,        // px, posisi ikon mouse dari kiri blok teks
    mouseTop: 690,        // px, posisi ikon mouse dari atas blok teks
  },
  tablet: { // 768 - 1023
    h1Size: 110,
    labelSize: 22,
    labelTop: -25,        // scaled from -38
    labelRight: 26,       // scaled from 40
    circleSize: 460,
    photoMaxWidth: 560,
    photoMinHeight: 480,
    badgeMinWidth: 240,
    badgeRight: 26,       // scaled from 40
    badgeBottom: 60,
    mouseLeft: 108,       // scaled from 166
    mouseTop: 448,        // scaled from 690
  },
  mobileLg: { // 640 - 767
    h1Size: 88,
    labelSize: 20,
    circleSize: 400,
    photoMaxWidth: 400,
    photoMinHeight: 420,
    badgeMinWidth: 220,
    badgeBottom: 50,
  },
  mobileMd: { // 480 - 639
    h1Size: 64,
    labelSize: 16,
    circleSize: 320,
    photoMaxWidth: 320,
    photoMinHeight: 360,
    badgeMinWidth: 200,
    badgeBottom: 40,
  },
  mobileSm: { // < 480
    h1Size: 60,
    labelSize: 20,
    circleSize: 300,
    photoMaxWidth: 350,
    photoMinHeight: 350,
    badgeMinWidth: 190,
    badgeBottom: 32,
  },
};
`;

// Insert HERO_CONFIG before function getTierKey
content = content.replace('function getTierKey(width) {', heroConfigString + '\nfunction getTierKey(width) {');

// Replace base64 with imports
content = content.replace(/FOUNDER_BASE64/g, 'founderimg');
content = content.replace(/COFOUNDER_BASE64/g, 'cofounderimg');

// Fix min-h-[100svh] to not force 100vh on mobile vertical to prevent image overflow under navbar
// The user request: "saya rasa masalah ini muncul karena kita memaksa hero wajib 100vh. Ayo lakukan agar tidak ada kesalahan yang serupa"
// We remove `min-h-[100svh]` on mobile, so it just takes the space it needs, and the images are pushed to bottom.
content = content.replace(
  'className="relative w-full min-h-[100svh] md:min-h-screen flex flex-col"',
  'className="relative w-full min-h-0 md:min-h-screen flex flex-col pb-8 md:pb-0 pt-20 md:pt-0"' // padding to avoid navbar
);

fs.writeFileSync(homeFile, content);
console.log('Fixed Home.jsx configurations');
