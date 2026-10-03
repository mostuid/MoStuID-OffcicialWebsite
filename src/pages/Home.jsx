import React, { useState, useEffect, useRef } from "react";
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
import { AppsTabSection } from "./Apps";

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


const HERO_CONFIG = {
  desktop: { // Landscape >= 1024
    h1Size: 180,
    labelSize: 30,
    labelTop: -75,
    labelRight: 40,
    circleSize: 610,
    photoMaxWidth: 580,
    photoMinHeight: 640,
    badgeMinWidth: 300,
    badgeRight: 40,
    badgeBottom: 70,
    mouseLeft: 166,
    mouseTop: 690,
  },
  tabletLandscape: { // Landscape < 1024
    h1Size: 90,
    labelSize: 20,
    labelTop: -40,
    labelRight: 26,
    circleSize: 350,
    photoMaxWidth: 350,
    photoMinHeight: 400,
    badgeMinWidth: 200,
    badgeRight: 20,
    badgeBottom: 40,
    mouseLeft: 108,
    mouseTop: 448,
  },
  tabletPortrait: { // Portrait >= 768
    h1Size: 100, // slightly smaller than 125 for better proportion
    labelSize: 22,
    circleSize: 480,
    photoMaxWidth: 480,
    photoMinHeight: 500,
    badgeMinWidth: 260,
    badgeBottom: 50,
  },
  mobileLg: { // Portrait 640 - 767
    h1Size: 88,
    labelSize: 20,
    circleSize: 400,
    photoMaxWidth: 400,
    photoMinHeight: 420,
    badgeMinWidth: 220,
    badgeBottom: 50,
  },
  mobileMd: { // Portrait 480 - 639
    h1Size: 64,
    labelSize: 16,
    circleSize: 320,
    photoMaxWidth: 320,
    photoMinHeight: 360,
    badgeMinWidth: 200,
    badgeBottom: 40,
  },
  mobileSm: { // Portrait < 480
    h1Size: 60,
    labelSize: 20,
    circleSize: 300,
    photoMaxWidth: 350,
    photoMinHeight: 350,
    badgeMinWidth: 190,
    badgeBottom: 32,
  },
};

function getTierKey() {
  const width = window.innerWidth;
  const isLandscape = window.innerWidth > window.innerHeight;

  if (isLandscape) {
    if (width >= 1280) return "desktop";
    return "tabletLandscape"; // Phone/tablet landscape
  } else {
    if (width >= 768) return "tabletPortrait"; // iPad portrait
    if (width >= 640) return "mobileLg";
    if (width >= 480) return "mobileMd";
    return "mobileSm";
  }
}

function HeroSection({ scrollToSection, setActiveTab }) {
  const waNumber = "6285111401924";
  const waMessage = encodeURIComponent(
    "Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda.  Mohon informasikan detail layanan, harga, dan bagaimana cara memulai proyek dengan tim Anda. Terima kasih!"
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const [isShiny, setIsShiny] = useState(true);
  const [mouseOpacity, setMouseOpacity] = useState(1);
  const [mouseTranslateY, setMouseTranslateY] = useState(0);
  const [tier, setTier] = useState("desktop");
  const isPortraitLayout = !["desktop", "tabletLandscape"].includes(tier);

  // Config aktif untuk breakpoint saat ini. Kalau sebuah field tidak
  // didefinisikan di tier kecil (mis. labelTop hanya ada di desktop
  // karena label itu cuma absolute di desktop), fallback ke desktop.
  const cfg = { ...HERO_CONFIG.desktop, ...HERO_CONFIG[tier] };

  const heroSlides = [
    {
      id: 'founder',
      img: founderimg,
      name: "Bang Eija",
      role: "Founder / Lead Developer"
    },
    {
      id: 'cofounder',
      img: cofounderimg,
      name: "Mohd. Daniel",
      role: "Co-Founder / Art Director"
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleSend = () => {
    if (!customMessage.trim()) return;
    const url = `https://wa.me/6285111401924?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank");
    setIsModalOpen(false);
    setCustomMessage("");
  };

  // ✅ Deteksi breakpoint berdasarkan width & orientasi
  useEffect(() => {
    const checkTier = () => {
      setTier(getTierKey());
    };
    checkTier();
    window.addEventListener('resize', checkTier);
    return () => window.removeEventListener('resize', checkTier);
  }, []);

  // LOGIKA AUTO-LOOP SLIDE (Ganti tiap 5 detik)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      setHasInteracted(true);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // LOGIKA PENGETIKAN LINIER MENGGUNAKAN SATU INTERVAL AMAN
  const [displayName, setDisplayName] = useState("");
  const [displayRole, setDisplayRole] = useState("");

  useEffect(() => {
    const currentName = heroSlides[activeSlide].name;
    const currentRole = heroSlides[activeSlide].role;

    setDisplayName("");
    setDisplayRole("");

    let currentTick = 0;
    const nameLength = currentName.length;
    const roleLength = currentRole.length;
    const totalTicks = nameLength + roleLength;

    const typewriterInterval = setInterval(() => {
      currentTick++;

      if (currentTick <= nameLength) {
        setDisplayName(currentName.substring(0, currentTick));
      } else if (currentTick <= totalTicks) {
        const roleProgress = currentTick - nameLength;
        setDisplayRole(currentRole.substring(0, roleProgress));
      } else {
        clearInterval(typewriterInterval);
      }
    }, 50);

    return () => clearInterval(typewriterInterval);
  }, [activeSlide]);

  useEffect(() => {
    let timerStart, timerReset, timeoutNext, intervalLoop;
    timerStart = setTimeout(() => {
      setIsShiny(true);
      timerReset = setTimeout(() => { setIsShiny(false); }, 3000);
    }, 1200);
    timeoutNext = setTimeout(() => {
      setIsShiny(true);
      setTimeout(() => { setIsShiny(false); }, 3000);
      intervalLoop = setInterval(() => {
        setIsShiny(true);
        setTimeout(() => { setIsShiny(false); }, 3000);
      }, 6000);
    }, 8200);
    return () => {
      clearTimeout(timerStart);
      clearTimeout(timerReset);
      clearTimeout(timeoutNext);
      if (intervalLoop) clearInterval(intervalLoop);
    };
  }, []);

  const SETTING_SCROLL_HP = { mulaiPudar: 10, hilangTotal: 80, jarakSembunyi: 150 };
  const SETTING_SCROLL_PC = { mulaiPudar: 40, hilangTotal: 300, jarakSembunyi: 200 };

  useEffect(() => {
    const handleScrollMouse = () => {
      const currentScroll = window.scrollY;
      const config = isPortraitLayout ? SETTING_SCROLL_HP : SETTING_SCROLL_PC;
      if (currentScroll <= 5 || currentScroll <= config.mulaiPudar) {
        setMouseOpacity(1); setMouseTranslateY(0);
      } else if (currentScroll >= config.hilangTotal) {
        setMouseOpacity(0); setMouseTranslateY(config.jarakSembunyi);
      } else {
        const totalRentang = config.hilangTotal - config.mulaiPudar;
        const jarakBerjalan = currentScroll - config.mulaiPudar;
        const progress = jarakBerjalan / totalRentang;
        setMouseOpacity(Math.max(0, Math.min(1, 1 - progress)));
        const multiplierY = isPortraitLayout ? 0.6 : 1.0;
        setMouseTranslateY(progress * config.jarakSembunyi * multiplierY);
      }
    };
    handleScrollMouse();
    window.addEventListener("scroll", handleScrollMouse, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMouse);
  }, [isPortraitLayout]);

  return (
    <div
      className="relative w-full min-h-0 xl:min-h-screen flex flex-col"
      style={{ clipPath: isPortraitLayout ? "none" : "inset(0px -100vw 0px -100vw)" }}
    >
      {/* EFEK GLOW BACKGROUND - SEPERTI QNA */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* SUNTIKAN KEYFRAMES ANIMASI FOTO SELANG SELING */}
      <style>{`
        @keyframes slideInFromRight {
          0% { transform: translateX(35px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutToLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-35px); opacity: 0; }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-35px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutToRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(35px); opacity: 0; }
        }
        @keyframes cursorBlink {
          50% { border-color: transparent }
        }

        .slide-in-right-custom { animation: slideInFromRight 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .slide-out-left-custom { animation: slideOutToLeft 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .slide-in-left-custom { animation: slideInFromLeft 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .slide-out-right-custom { animation: slideOutToRight 0.75s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        
        .typewriter-cursor { border-right: 2px solid #FF5500; animation: cursorBlink 0.75s step-end infinite; }
      `}</style>

      {/* =========================================================================
          ✅ SATU DIV UTAMA yang membungkus TEKS + FOTO — sama seperti
          `.hero > div` di situek.com. Keduanya jadi flex-child dari parent
          yang SAMA (flex-basis %), dan `items-stretch` membuat keduanya
          selalu berbagi tinggi yang sama juga. Semua angka ukuran di bawah
          ini diambil dari HERO_CONFIG (px tetap per breakpoint), BUKAN
          clamp/vw, persis gaya Situek.
          ========================================================================= */}
      <div className="relative z-10 w-[95%] max-w-[80%] mx-auto flex-1 flex flex-col landscape:flex-row items-stretch pt-28 sm:pt-32 landscape:pt-32 px-6 landscape:px-8 gap-4 landscape:gap-2 pb-0">

        {/* SISI KIRI: TEXT & ACTIONS */}
        <div className="relative z-20 w-full landscape:basis-[56%] shrink-0 landscape:shrink flex flex-col justify-center pt-4 landscape:pt-0 text-center landscape:text-left">
          <div className="relative mb-2 sm:mb-4 inline-block w-full max-w-max mx-auto landscape:mx-0">
            <p
              className="font-chivo font-thin text-white tracking-wide z-10 whitespace-nowrap animate-slide-right select-none mb-1 landscape:mb-2 text-center landscape:text-right landscape:pr-16 w-full block"
              style={{
                fontSize: `${cfg.labelSize}px`,
              }}
            >
              Digital & Creative
            </p>
            <h1
              className="font-poppins font-bold tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)] relative z-20 select-none opacity-0 animate-title-left"
              style={{ fontSize: `${cfg.h1Size}px` }}
            >
              <span
                className="block pb-2 sm:pb-4 pr-2 sm:pr-4 bg-clip-text text-transparent relative z-10 animate-shimmer-sweep"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90deg, #FF5500 0%, #ffffff 35%, #ffffff 65%, #FF5500 100%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% center"
                }}
              >
                AGENCY
              </span>
              {/* Efek glow kecil dan rapi */}
              <span className="absolute -inset-1 bg-[#FF5500]/20 blur-2xl -z-0 rounded-lg pointer-events-none" />
            </h1>
          </div>
          <div className="font-chivo font-normal text-[10px] sm:text-sm text-white tracking-[0.12em] landscape:tracking-[0.22em] px-2 landscape:pl-2 landscape:px-0 relative z-10 select-none opacity-0 animate-slide-right [animation-delay:150ms] h-12 sm:h-auto sm:min-h-6 flex items-center justify-center landscape:justify-start uppercase text-center landscape:text-left">
            <span className="inline">
              <TypewriterEffect
                services={[
                  "WE BUILD STUNNING WEBSITES & APPS",
                  "WE DELIVER CINEMATIC VISUAL STORYTELLING",
                  "WE PRODUCE ENGAGING ANIMATIONS",
                  "WE DEVELOP STRONG BRAND STRATEGIES"
                ]}
              />
            </span>
          </div>
          <div className="flex items-center justify-center landscape:justify-start space-x-4 pt-6 sm:pt-10 px-2 landscape:pl-2 landscape:px-0 opacity-0 animate-slide-up [animation-delay:0.3s]">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black window-click font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-neutral-200 transition-all active:scale-95 text-center cursor-pointer shadow-xl shadow-white/5 w-[140px] sm:w-[160px] inline-block"
            >
              Reach Us!
            </button>

            {/* Tombol Get in Touch! */}
            <button
              onClick={() => {
                setActiveTab("apps");
                window.scrollTo(0, 0);
              }}
              className="border border-neutral-700 bg-neutral-900/40 text-neutral-300 font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-white/30 hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer text-center block w-[140px] sm:w-[160px]"
            >
              Our Apps
            </button>
          </div>


        </div>

        {/* SISI KANAN: ANIMATED SLIDER AREA
            ✅ Anak flex biasa (bukan lg:absolute bottom-0 right-0 lagi),
            persis seperti `.hero-right{flex:1;position:relative}` di
            situek.com — foto & badge di dalamnya absolute relatif ke
            KOTAK INI SENDIRI, bukan ke hero secara keseluruhan. */}
        <div
          className="relative z-10 w-full flex-1 min-h-0 landscape:basis-[42%] landscape:shrink-0 flex justify-center landscape:justify-end items-end"
          style={{ minHeight: `${cfg.photoMinHeight}px` }}
        >

          {/* LINGKARAN BACKGROUND ABSOLUT STATIS */}
          <div
            className="absolute bottom-[2%] right-auto landscape:right-[2%] rounded-full -z-10 shadow-[0_0_60px_rgba(255,85,0,0.25)] opacity-0 animate-zoom-in [animation-delay:0.3s] bg-[#FF5500]"
            style={{
              width: `${cfg.circleSize}px`,
              height: `${cfg.circleSize}px`,
            }}
          />

          {/* WRAPPER ELEMEN SLIDER FOTO */}
          <div className="absolute inset-0 w-full flex justify-center landscape:justify-end items-end pointer-events-none">
            {heroSlides.map((slide) => {
              const isActive = slide.id === heroSlides[activeSlide].id;
              const isEvenIndex = heroSlides.indexOf(slide) % 2 === 0;

              let imgAnimClass = "opacity-0 pointer-events-none";

              if (isActive) {
                imgAnimClass = isEvenIndex ? "slide-in-right-custom" : "slide-in-left-custom";
              } else if (hasInteracted) {
                const wasActive = heroSlides.indexOf(slide) === (activeSlide === 0 ? heroSlides.length - 1 : activeSlide - 1);
                if (wasActive) {
                  imgAnimClass = isEvenIndex ? "slide-out-left-custom" : "slide-out-right-custom";
                }
              }

              return (
                <div
                  key={slide.id}
                  className="absolute inset-0 flex flex-col items-center landscape:items-end justify-end w-full px-0"
                  style={{
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  {/* FOTO TALENT SLIDING */}
                  <div className={`h-full w-auto relative ${imgAnimClass}`}>
                    <img
                      src={slide.img}
                      alt={slide.name}
                      fetchPriority={isActive ? "high" : "auto"}
                      loading={isActive ? "eager" : "lazy"}
                      className="h-full w-auto object-contain object-bottom relative z-10 select-none pointer-events-none transform origin-bottom transition-transform duration-700 hover:scale-[1.02]"
                      style={{ maxWidth: `${cfg.photoMaxWidth}px` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTAINER TRANSPARAN PAPAN NAMA - DENGAN GLASSMORPHISM DOMINAN #FF5500
              posisi & minWidth sekarang px tetap dari HERO_CONFIG */}
          <div
            className="absolute z-30 flex flex-col justify-center items-center text-left select-none bg-[#FF5500]/10 backdrop-blur-xl border border-[#FF5500]/30 rounded-xl shadow-2xl shadow-[#FF5500]/30"
            style={{
              right: isPortraitLayout ? "auto" : `${cfg.badgeRight}px`,
              left: isPortraitLayout ? "50%" : "auto",
              bottom: isPortraitLayout ? `${cfg.badgeBottom}px` : `${cfg.badgeBottom}px`,
              minWidth: `${cfg.badgeMinWidth}px`,
              padding: isPortraitLayout ? "10px 12px" : "16px",
              transform: isPortraitLayout ? "translate(-50%, -15px)" : "translateY(-30px)"
            }}
          >
            {/* Background gradasi #FF5500 */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF5500]/20 via-[#FF5500]/5 to-[#FF5500]/10 pointer-events-none" />

            {/* Efek glow #FF5500 di sudut */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF5500]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#FF5500]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Garis dekoratif #FF5500 di tepi */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/50 to-transparent" />
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/50 to-transparent" />

            {/* Pinggiran glow */}
            <div className="absolute inset-0 rounded-xl border border-[#FF5500]/20 pointer-events-none" />

            {/* NAMA - WARNA PUTIH */}
            <h2 className="font-poppins font-bold text-lg sm:text-2xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,85,0,0.3)] min-h-7 sm:min-h-9 flex items-center relative z-10 whitespace-nowrap">
              <span className={displayName && displayName.length < heroSlides[activeSlide].name.length ? "typewriter-cursor" : ""}>
                {displayName}
              </span>
            </h2>

            {/* ROLE - WARNA PUTIH DENGAN OPACITY 60% */}
            <p className="font-mono text-white/60 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-0.5 drop-shadow-[0_0_15px_rgba(255,85,0,0.4)] min-h-4 flex items-center relative z-10 whitespace-nowrap">
              <span className={displayRole ? "typewriter-cursor" : ""}>
                {displayRole}
              </span>
            </p>
          </div>
        </div>

      </div>

      {/* Modal Popup Contact */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-neutral-900 border border-white/10 p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-poppins font-bold text-white mb-2">Reach Us!</h3>
            <p className="text-sm text-neutral-400 mb-6 font-chivo">Tuliskan pesan atau kebutuhan proyekmu, lalu kirim langsung ke WhatsApp admin kami.</p>
            
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Contoh: Halo MoStu.ID, saya ingin berkonsultasi mengenai pembuatan website e-commerce..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-chivo outline-none focus:border-[#FF5500]/50 focus:bg-white/10 transition-all resize-none mb-6 placeholder-neutral-600"
            ></textarea>
            
            <button
              onClick={handleSend}
              disabled={!customMessage.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-[#e64a00] disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-chivo font-bold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Kirim ke WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// KOMPONEN MANDIRI: SECTION 2 (SERVICES CONTAINER) - VERSI GLASSMORPHISM MODERN
// ==========================================
function ServicesSection({ setActiveTab }) {
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const sec2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSec2Visible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sec2Ref.current) {
      observer.observe(sec2Ref.current);
    }

    return () => {
      if (sec2Ref.current) {
        observer.unobserve(sec2Ref.current);
      }
    };
  }, []);

  const servicesData = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Kami membangun website yang responsif, scalable, dan user-friendly untuk mendukung pertumbuhan bisnis digital Anda.",
      icon: <img src={iconWebDev} alt="Web Software Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: ""
    },
    {
      id: "app-dev",
      title: "App Development",
      description: "Kembangkan aplikasi mobile & desktop yang powerful dengan performa tinggi dan pengalaman pengguna yang optimal.",
      icon: <img src={iconAppDev} alt="App Software Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: ""
    },
    {
      id: "ai-agent",
      title: "AI Automation",
      description: "Otomatisasi bisnis dengan kecerdasan buatan. Mulai dari chatbot hingga sistem analitik prediktif untuk efisiensi maksimal.",
      icon: <img src={iconAIAgent} alt="AI Agent Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: "[animation-delay:100ms]"
    },
    {
      id: "visual-story",
      title: "Visual Storytelling",
      description: "Kisahkan brand Anda melalui visual yang memukau. Video sinematik, 3D render, dan konten visual yang impactful.",
      icon: <img src={iconVisualStorytelling} alt="Visual Story Telling Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: "[animation-delay:200ms]"
    },
    {
      id: "animation",
      title: "Animation Services",
      description: "Animasi 2D/3D profesional untuk berbagai kebutuhan: explainer video, motion graphics, hingga visual efek cinematic.",
      icon: <img src={iconAnimationServices} alt="Animation Services Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: "[animation-delay:300ms]"
    },
    {
      id: "branding",
      title: "Branding Strategy",
      description: "Bangun identitas brand yang kuat dan konsisten. Dari logo design, brand guidelines, hingga strategi positioning pasar.",
      icon: <img src={iconBrandingStrategy} alt="Branding Strategy Icon" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />,
      animDelay: "[animation-delay:400ms]"
    }
  ];

  const handleServiceClick = (serviceId) => {
    localStorage.setItem("selected_portfolio_category", serviceId);
    setActiveTab("portfolio");
  };

  return (
    <section
      id="services-area"
      ref={sec2Ref}
      className="relative min-h-0 xl:min-h-screen flex flex-col justify-center items-center py-16 sm:py-20 lg:py-12 px-4 md:px-6 lg:px-12 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgSec2})` }}
    >
      {/* Overlay gelap dengan gradasi oranye */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FF5500]/20 via-[#FF5500]/10 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none z-0" />

      {/* SINKRONISASI INTERSECTION OBSERVER */}
      <div className={`w-[95%] max-w-[80%] mx-auto relative z-10 text-center select-none ${isSec2Visible ? 'animate-slide-down' : 'opacity-0'}`}>

        {/* Header Section - Services */}
        {/* Our Services Badge - DI ATAS Judul */}
        <div className="inline-block mb-4">
          <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
            Our Services
          </span>
        </div>

        <div className="text-center mb-6 lg:mb-8">
          {/* Judul Utama */}
          <h2 className="font-poppins font-bold text-3xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-2 relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Solusi Kreatif & Digital
            </span>
            {/* Efek glow kecil dan rapi */}
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            {/* Efek glow tipis di bawah */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>

          {/* Deskripsi */}
          <p className="text-neutral-100 text-[12px] sm:text-xs lg:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4 mt-2">
            Kami hadir dengan layanan terbaik dan terintegrasi untuk membantu bisnis Anda berkembang jadi lebih efisien di era digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 w-full">
          {servicesData.map((service, index) => {
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`
                  group relative p-3 sm:p-4 lg:p-6 rounded-2xl 
                  cursor-pointer opacity-0
                  ${isSec2Visible ? 'animate-slide-up ' + service.animDelay : ''}
                  overflow-hidden
                  flex flex-col
                  h-full
                  transition-all duration-500
                  hover:-translate-y-2 hover:scale-[1.02]
                `}
              >
                {/* Background Glassmorphism */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/5 group-hover:via-[#FF5500]/10 group-hover:to-[#FF5500]/20 transition-all duration-700" />

                {/* Efek glow #FF5500 di sudut */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/25 transition-all duration-700" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/20 transition-all duration-700" />

                {/* Glow center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />

                {/* Garis dekoratif #FF5500 di tepi atas & bawah */}
                <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />

                {/* Pinggiran glow saat hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-500" />

                {/* Shadow ekstra saat hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[inset_0_0_50px_rgba(255,85,0,0.05)]" />

                {/* Konten */}
                <div className="relative z-10 flex flex-col items-center text-center flex-1">
                  {/* Icon dengan circle background - GLASSMORPHISM */}
                  <div className="relative mb-2 lg:mb-3">
                    <div className="absolute inset-0 bg-[#FF5500]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full bg-gradient-to-br from-white/20 to-[#FF5500]/20 border border-white/20 flex items-center justify-center group-hover:border-[#FF5500]/50 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,85,0,0.3)] backdrop-blur-sm">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[56px] lg:h-[56px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title - proporsional */}
                  <h3 className="font-poppins font-bold text-sm sm:text-sm lg:text-lg text-white group-hover:text-[#FF5500] transition-colors duration-300 mb-1 lg:mb-2">
                    {service.title}
                  </h3>

                  {/* Description - proporsional dengan teks header */}
                  <p className="text-neutral-200 text-[12px] sm:text-xs lg:text-sm font-light group-hover:text-neutral-200 transition-colors duration-300 flex-1 leading-[16px]">
                    {service.description}
                  </p>

                  {/* CTA Link dengan animasi - TANPA GARIS BAWAH */}
                  <div className="mt-2 lg:mt-3 flex items-center justify-center gap-1.5 lg:gap-2 text-[#FF5500] font-chivo text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span>View Projects</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3 lg:w-3.5 lg:h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>

                  {/* Nomor urut dengan efek glass */}
                  <div className="absolute top-1.5 right-2 lg:top-2 lg:right-3 text-xl sm:text-3xl lg:text-4xl font-black text-white/10 group-hover:text-[#FF5500]/20 transition-colors duration-500 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom */}
        <div className="mt-6 lg:mt-8 text-center">
          <div
            className="inline-flex items-center gap-2 lg:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 lg:px-6 py-2 hover:border-[#FF5500]/50 transition-all duration-300 group cursor-pointer hover:bg-[#FF5500]/10"
            onClick={() => setActiveTab("portfolio")}
          >
            <span className="text-neutral-200 text-[12px] sm:text-xs lg:text-sm font-chivo font-medium group-hover:text-white transition-colors duration-300">
              Lihat Semua Layanan
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#FF5500] transform group-hover:translate-x-1 transition-transform duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: TAB PORTFOLIO - VERSI STABIL
   ========================================== */


// ==========================================
// KOMPONEN MANDIRI: TAB ABOUT US (DIPERBAIKI)
// ==========================================  */


/* ==========================================
   KOMPONEN MANDIRI: SECTION 3 (QnA CONTAINER) - GLASSMORPHISM MODERN
   ========================================== */
function QnaSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const qnaData = [
    {
      q: "Layanan apa saja yang disediakan oleh MoStu?",
      a: "Kami berfokus pada tiga pilar utama kreatif digital: Pengembangan Website & Software super cepat, Visual Storytelling (Animasi, 3D Render, Video Sinematik), serta Perancangan Strategi Identitas Brand & Konten Media Sosial.",
      animClass: "animate-slide-left",
      delayStyle: { animationDelay: "0s" }
    },
    {
      q: "Berapa biaya atau harga untuk setiap layanan di MoStu?",
      a: "Harga layanan kami bersifat fleksibel and disesuaikan dengan skala serta kompleksitas proyek Anda. Kami menyediakan paket terstruktur untuk UMKM hingga solusi kustom korporat. Hubungi kami untuk mendapatkan penawaran harga yang sesuai anggaran Anda.",
      animClass: "animate-slide-right",
      delayStyle: { animationDelay: "0.15s" }
    },
    {
      q: "Apakah eksekusi proyek bisa disesuaikan dengan kebutuhan kustom?",
      a: "Ya, seluruh proses desain, pengembangan web, hingga aset visual di agensi kami dikerjakan secara exclusif and presisi tanpa template kaku, murni mengikuti strategi target audiens bisnis Anda.",
      animClass: "animate-slide-left",
      delayStyle: { animationDelay: "0.3s" }
    },
    {
      q: "Bagaimana cara memulai kolaborasi proyek?",
      a: "Cukup klik tombol 'Get Order' atau hubungi langsung via email/media sosial kami. Tim kami akan segera menjadwalkan sesi konsultasi gratis untuk menganalisis strategi kebutuhan Anda.",
      animClass: "animate-slide-right",
      delayStyle: { animationDelay: "0.45s" }
    }
  ];

  const toggleQnA = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="qna-area" className="relative py-24 px-6 md:px-12 grid-bg bg-darkBg overflow-hidden border-t border-neutral-900">
      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[95%] sm:max-w-[80%] lg:max-w-4xl mx-auto relative z-10 select-none">
        <ScrollAnimateWrapper qnaAnimationClass="animate-slide-down">
          <div className="text-center mb-12">
            {/* Badge - Rata Tengah (sama dengan Services) */}
            <div className="flex justify-center mb-4">
              <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
                FAQ
              </span>
            </div>

            {/* Judul Utama - ukuran sama dengan Services */}
            <h2 className="font-poppins font-bold text-3xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-2 relative inline-block">
              <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
                Pertanyaan Umum
              </span>
              <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
            </h2>

            {/* Deskripsi - ukuran sama dengan Services */}
            <p className="text-neutral-100 text-[12px] sm:text-xs lg:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4 mt-2">
              Temukan jawaban atas pertanyaan yang paling sering diajukan tentang layanan kami.
            </p>
          </div>
        </ScrollAnimateWrapper>

        <div className="space-y-4">
          {qnaData.map((item, idx) => (
            <ScrollAnimateWrapper key={idx} qnaAnimationClass={item.animClass}>
              <div
                className={`
                  group relative rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-300
                `}
                style={{ ...item.delayStyle }}
                onClick={() => toggleQnA(idx)}
              >
                {/* Background Glassmorphism */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/5 group-hover:via-[#FF5500]/10 group-hover:to-[#FF5500]/20 transition-all duration-700" />

                {/* Efek glow #FF5500 di sudut */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/25 transition-all duration-700" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/20 transition-all duration-700" />

                {/* Glow center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />

                {/* Garis dekoratif #FF5500 */}
                <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500 pointer-events-none" />

                {/* Border glow saat hover */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[inset_0_0_50px_rgba(255,85,0,0.05)] pointer-events-none" />

                {/* Konten */}
                <div className="relative z-10 p-5 sm:p-6">
                  <div className="flex justify-between items-start gap-4">
                    {/* Pertanyaan - ukuran lebih besar */}
                    <span className={`font-poppins font-semibold text-sm sm:text-base lg:text-lg transition-colors duration-300 flex-1 pt-1 ${openIndex === idx ? 'text-[#FF5500]' : 'text-white group-hover:text-[#FF5500]'
                      }`}>
                      {item.q}
                    </span>

                    {/* Tombol + / - dengan glassmorphism */}
                    <button
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center 
                        text-xl font-bold transition-all duration-300 shrink-0
                        backdrop-blur-sm
                        ${openIndex === idx
                          ? 'bg-[#FF5500]/30 border-[#FF5500]/50 text-[#FF5500] rotate-45 shadow-[0_0_30px_rgba(255,85,0,0.2)]'
                          : 'bg-white/10 border-white/20 text-white/70 hover:bg-[#FF5500]/20 hover:border-[#FF5500]/40 hover:text-[#FF5500] hover:shadow-[0_0_20px_rgba(255,85,0,0.1)]'
                        }
                        border
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleQnA(idx);
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Jawaban - ukuran sama dengan deskripsi Services */}
                  <div className={`transition-all duration-300 ease-out overflow-hidden ${openIndex === idx ? 'max-h-60 mt-4 border-t border-white/10 pt-4' : 'max-h-0'
                    }`}>
                    <p className="font-poppins font-normal text-[11px] sm:text-xs lg:text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   PASTIKAN FUNGSI INI ADA DI BAWAHNYA AGAR TESTER TIDAK BLANK
   ========================================== */
function ScrollAnimateWrapper({ children, qnaAnimationClass }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return (
    <div ref={elementRef} className={`transition-all duration-500 ${isVisible ? qnaAnimationClass : "opacity-0"}`}>
      {children}
    </div>
  );
}


export default function Home({ scrollToSection, setActiveTab }) {
  return (
    <>
      <HeroSection scrollToSection={scrollToSection} setActiveTab={setActiveTab} />
      <ServicesSection setActiveTab={setActiveTab} />
      <QnaSection />
    </>
  );
}

function TypewriterEffect({ services }) {
  const [currentText, setCurrentText] = useState("");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = services[serviceIndex];

    // Mengatur kecepatan: mengetik lebih cepat (75ms), menghapus sangat cepat (35ms)
    const typingSpeed = isDeleting ? 15 : 40;

    const handleType = () => {
      if (!isDeleting) {
        // Menambah huruf satu per satu
        setCurrentText(fullText.substring(0, currentText.length + 1));

        // Jika kalimat sudah lengkap mengetik, beri jeda diam selama 2.5 detik
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1250);
          return;
        }
      } else {
        // Mengurangi huruf satu per satu (efek backspace)
        setCurrentText(fullText.substring(0, currentText.length - 1));

        // Jika kalimat sudah terhapus habis, pindah ke index layanan berikutnya
        if (currentText === "") {
          setIsDeleting(false);
          setServiceIndex((prev) => (prev + 1) % services.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, serviceIndex, services]);

  return (
    <>
      <span>{currentText}</span>
      {/* Batang kursor berkedip ala mesin tik lama */}
      <span className="w-0.5 h-[1em] bg-agency-orange animate-pulse font-bold ml-0.5">|</span>
    </>
  );
}

