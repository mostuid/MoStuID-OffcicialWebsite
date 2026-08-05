import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import founderimg from "./assets/founder.png";
import cofounderimg from "./assets/co-founder.png";
import whoNext from "./assets/Whos-Next.png";
import logoImg from "./assets/logo-mostu.png";
import bgSec2 from './assets/bg-sec2.png';
import webPorto1Img from "./assets/Web-Porto1.gif";
import webPorto2Img from "./assets/Web-Porto2.gif";
import webPorto3Img from "./assets/Web-Porto3.gif";
import webPorto4Img from "./assets/Web-Porto4.gif";
import webPorto5Img from "./assets/Web-Porto5.gif";
import animPorto1Img from "./assets/Anim-Porto1.jpg";
import videoPorto1Img from "./assets/Video-Porto1.png";
import videoPorto2Img from "./assets/Video-Porto2.png";
import waLogo from "./assets/waLogo.png";

// IMPORT ASSET ICON
import iconWebDev from "./assets/Icon Web-Dev.png";
import iconAppDev from "./assets/Icon App-Dev.png";
import iconAIAgent from "./assets/Icon AI-Agent.png";
import iconVisualStorytelling from "./assets/Icon Visual Story Telling.png";
import iconBrandingStrategy from "./assets/Icon Branding Strategy.png";
import iconAnimationServices from "./assets/Icon Animation Services.png";

// ✅ FIXED: Style objects diekstrak ke konstanta
const STYLE = {
  heroMobile: {
    position: 'absolute',
    top: '125px',
    left: 0,
    right: 0,
    paddingLeft: '16px',
    paddingRight: '16px',
    zIndex: 20
  }
};

function App() {

  // ==========================================
  // KOMPONEN REDIRECT UNTUK PROTOTYPE
  // ==========================================
  function PrototypeRedirect() {
    const location = useLocation();

    const pathParts = location.pathname.split('/');
    const folderName = pathParts[pathParts.length - 1];
    const iframeSrc = `/prototypes/${folderName}/index.html`;

    return (
      <div className="fixed inset-0 w-full h-full bg-white" style={{ zIndex: 9999 }}>
        <iframe
          src={iframeSrc}
          className="w-full h-full border-0"
          title="Prototype"
          allowFullScreen
        />
        {/* Tombol WhatsApp - Tetap Tampil */}
        <div className="fixed bottom-6 right-6 z-[10000]">
          <a
            href={`https://wa.me/62882016312643?text=${encodeURIComponent("Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a] active:scale95 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.128.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Di dalam komponen App, tambahkan:
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = useState("home");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const sec2Ref = useRef(null);

  // State kontrol untuk membuka dan menutup Modal Project Brief & Member
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  // Fungsi toggle - tombol langsung berubah, dropdown tetap animasi
  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      // Tombol langsung berubah ke hamburger
      setIsMobileMenuOpen(false);
      // Trigger animasi keluar untuk dropdown
      setIsMenuClosing(true);
      // Reset isMenuClosing setelah animasi selesai
      setTimeout(() => {
        setIsMenuClosing(false);
      }, 280);
    } else {
      // Tombol langsung berubah ke X
      setIsMobileMenuOpen(true);
      setIsMenuClosing(false);
    }
  };

  // State untuk melacak visibilitas Header saat scroll (Auto-Hide)
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const [isShiny, setIsShiny] = useState(false);

  // =========================================================================
  // State untuk mengontrol visibilitas ikon mouse (fade in / fade out)
  // =========================================================================
  const [mouseOpacity, setMouseOpacity] = useState(1);

  // useEffect baru: Mengatur opacity ikon mouse mengikuti perputaran scroll
  useEffect(() => {
    const handleScrollMouse = () => {
      const currentScroll = window.scrollY;

      if (currentScroll === 0) {
        // Jika layar mentok di paling atas, paksa kembali terlihat penuh
        setMouseOpacity(1);
      } else {
        // Menghitung pudarnya ikon dalam jarak 150px pertama saat scroll ke bawah
        // Semakin ke bawah, nilainya semakin mendekati 0
        const newOpacity = Math.max(0, 1 - currentScroll / 150);
        setMouseOpacity(newOpacity);
      }
    };

    window.addEventListener("scroll", handleScrollMouse, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMouse);
  }, []);

  // =========================================================================
  // LOGIKA AUTO-HIDE HEADER & AUTO-CLOSE DROPDOWN SAAT SCROLL
  // =========================================================================
  // ✅ FIXED: Pisahkan menjadi dua effect untuk menghindari re-register listener
  // Effect 1: Auto-hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect 2: Tutup dropdown saat scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleCloseDropdown = () => {
      toggleMenu();
    };

    window.addEventListener("scroll", handleCloseDropdown, { passive: true });
    return () => window.removeEventListener("scroll", handleCloseDropdown);
  }, [isMobileMenuOpen]);

  // =========================================================================
  // LOGIKA KUSTOM REFRESH BROWSER (SEMUA TAB OTOMATIS KEMBALI KE LAYAR PALING ATAS)
  // =========================================================================
  useEffect(() => {
    // 1. Ambil query parameter "?page=" dari URL saat ini
    const params = new URLSearchParams(window.location.search);
    const pageAktif = params.get("page");

    if (pageAktif && pageAktif !== "home") {
      // JIKA DI TAB LAIN (Portfolio, Products, About Us): Kunci tab aktifnya terlebih dahulu
      setActiveTab(pageAktif);
    }

    // 2. KUNCIAN UTAMA: Paksa semua halaman (termasuk Home & Tab Lain) lompat ke koordinat top: 0 saat refresh
    // Menggunakan setTimeout 50ms agar React selesai merender komponennya dulu, baru layarnya ditarik ke atas
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant" // "instant" memastikan layar langsung di atas tanpa gerak animasi smooth saat refresh
      });
    }, 50);
  }, []);

  // =========================================================================
  // LOGIKA NAVIGASI RIWAYAT BROWSER (ANTI-RELOAD PAGE)
  // =========================================================================
  const ubahTabNavigasi = (tabBaru) => {
    setActiveTab(tabBaru);

    // 🔥 SELIPAN 2: Alihkan sistem navigasi menggunakan push rute resmi dari react-router-dom
    if (tabBaru === "home") {
      navigate("/"); // Mengubah URL menjadi paling bersih (mostu.id/)
    } else {
      navigate(`/${tabBaru}`); // Mengubah URL menjadi (mostu.id/portfolio, mostu.id/about, dll)
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Membaca parameter halaman aktif saat pertama kali web dimuat di browser
    const params = new URLSearchParams(window.location.search);
    const pageAktif = params.get("page") || "home";

    if (!window.history.state) {
      // 🔥 SELIPAN PERBAIKAN: Mencegah penulisan paksa '?page=home' di URL saat pertama kali user mendarat di website
      const urlAwal = pageAktif === "home" ? window.location.pathname : `?page=${pageAktif}`;
      window.history.replaceState({ tab: pageAktif }, "", urlAwal);
    }

    const tanganiTombolBrowser = (event) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("popstate", tanganiTombolBrowser);
    return () => {
      window.removeEventListener("popstate", tanganiTombolBrowser);
    };
  }, []);

  // =========================================================================

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
      if (sec2Ref.current) observer.unobserve(sec2Ref.current);
    };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "portfolio") {
      const savedCategory = localStorage.getItem("selected_portfolio_category");
      if (savedCategory) {
        setPortfolioFilter(savedCategory);
        localStorage.removeItem("selected_portfolio_category");
      }
    }
  }, [activeTab]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cek apakah halaman saat ini adalah prototype
  const isPrototypePage = location.pathname.includes('/portfolio/prototype-');

  return (
    <div className="min-h-screen grid-bg relative overflow-x-hidden bg-darkBg text-white selection:bg-agency-orange selection:text-white">

      {/* JIKA HALAMAN PROTOTYPE - TAMPILKAN FULL SCREEN TANPA ELEMEN LAIN */}
      {isPrototypePage ? (
        <Routes>
          <Route path="/portfolio/prototype-airlines" element={<PrototypeRedirect />} />
          <Route path="/portfolio/prototype-gogreen" element={<PrototypeRedirect />} />
          <Route path="/portfolio/prototype-corepack" element={<PrototypeRedirect />} />
        </Routes>
      ) : (
        <>
          {/* NAVBAR HEADER: Auto-Hide on Scroll & Sticky Position (PC & HP) - VERSI PILL SHAPE DENGAN GLASSMORPHISM MODERN */}
          <header
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-[100px] transition-all duration-500 w-[95%] max-w-[80%] ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
              }`}
          >
            {/* Background Glassmorphism dengan gradient & blur */}
            <div className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#FF5500]/5 via-white/5 to-[#FF5500]/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(255,85,0,0.08)] overflow-hidden">
              {/* Efek glow oranye di tepi */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#FF5500]/5 rounded-full blur-3xl" />

              {/* Garis dekoratif di tepi bawah */}
              <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
            </div>

            <div className="relative px-6 md:px-8 py-3 flex justify-between items-center">
              {/* LOGO */}
              <div className="flex items-center cursor-pointer select-none group" onClick={() => { ubahTabNavigasi("home"); setIsMobileMenuOpen(false); }}>
                <img src={logoImg} alt="MoStu Logo" className="h-8 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer" />
              </div>

              {/* NAV LINK DESKTOP */}
              <nav className="hidden md:flex items-center space-x-8 text-[12px] text-neutral-300 font-chivo font-normal uppercase tracking-widest">
                {/* PERTAMA: Courses */}
                <button onClick={() => ubahTabNavigasi("courses")} className={`hover:text-[#FF5500] transition-colors relative py-1.5 cursor-pointer group ${activeTab === "courses" ? "text-[#FF5500]" : "text-neutral-300"}`}>
                  Courses
                  <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "courses" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>

                {/* KEDUA: Portfolio */}
                <button onClick={() => { ubahTabNavigasi("portfolio"); setPortfolioFilter("all"); }} className={`hover:text-[#FF5500] transition-colors relative py-1.5 cursor-pointer group ${activeTab === "portfolio" ? "text-[#FF5500]" : "text-neutral-300"}`}>
                  Portfolio
                  <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "portfolio" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>

                {/* KETIGA: Products */}
                <button onClick={() => ubahTabNavigasi("products")} className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "products" ? "text-[#FF5500]" : "text-neutral-300"}`}>
                  Products
                  <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>

                {/* KEEMPAT: About Us */}
                <button onClick={() => ubahTabNavigasi("about")} className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "about" ? "text-[#FF5500]" : "text-neutral-300"}`}>
                  About Us
                  <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </button>
              </nav>

              {/* CTA MEMBER (DESKTOP ONLY) - DENGAN GRADIENT */}
              <div className="hidden md:block">
                <button
                  onClick={() => setIsMemberModalOpen(true)}
                  className="bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold px-5 py-2 rounded-full text-[10px] uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.3)] transition-all duration-300 shadow-md active:scale-95 text-center cursor-pointer"
                >
                  Get Member
                </button>
              </div>

              {/* TOMBOL PENGONTROL DROPDOWN MOBILE - HAMBURGER MENU (Langsung Berubah) */}
              <button
                onClick={toggleMenu}
                className="md:hidden flex flex-col items-center justify-center gap-[6px] w-8 h-8 bg-transparent border-none cursor-pointer select-none focus:outline-none relative"
                aria-label="Toggle Menu"
              >
                {/* Garis Atas - Pendek */}
                <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen
                  ? 'w-6 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : 'w-4'
                  }`} />

                {/* Garis Tengah - Panjang */}
                <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen
                  ? 'w-6 -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : 'w-6'
                  }`} />

                {/* Garis Bawah - Pendek (Hilang saat terbuka) */}
                <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'
                  }`} />
              </button>

              {/* DROPDOWN MENU - ANIMASI MASUK & KELUAR HALUS */}
              {(isMobileMenuOpen || isMenuClosing) && (
                <div className={`absolute top-full right-0 left-auto w-[55vw] max-w-70 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-5 flex flex-col space-y-3 md:hidden shadow-2xl z-50 overflow-visible text-right items-end mt-3 ${isMenuClosing ? 'dropdown-out' : 'dropdown-in'
                  }`}>
                  {/* Background glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF5500]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none" />

                  <button
                    onClick={() => { ubahTabNavigasi("courses"); toggleMenu(); }}
                    className={`w-full text-right font-chivo text-[11px] uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "courses" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => { ubahTabNavigasi("portfolio"); setPortfolioFilter("all"); toggleMenu(); }}
                    className={`w-full text-right font-chivo text-[11px] uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "portfolio" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => { ubahTabNavigasi("products"); toggleMenu(); }}
                    className={`w-full text-right font-chivo text-[11px] uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "products" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                  >
                    Products
                  </button>
                  <button
                    onClick={() => { ubahTabNavigasi("about"); toggleMenu(); }}
                    className={`w-full text-right font-chivo text-[11px] uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "about" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                  >
                    About Us
                  </button>

                  <div className="pt-1 w-full">
                    <button
                      onClick={() => { setIsMemberModalOpen(true); toggleMenu(); }}
                      className="w-full bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold py-2 rounded-xl text-[10px] uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300 active:scale-95 text-center cursor-pointer"
                    >
                      Get Member
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* AREA KONTEN UTAMA */}
          <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={
                  <HeroSection
                    scrollToSection={scrollToSection}
                    setIsBriefModalOpen={setIsBriefModalOpen}
                  />
                }
              />

              {/* PORTFOLIO */}
              <Route
                path="/portfolio"
                element={
                  <div className="mt-20">
                    <PortfolioTabSection
                      currentFilter={portfolioFilter}
                      setFilter={setPortfolioFilter}
                      setActiveTab={ubahTabNavigasi}
                    />
                  </div>
                }
              />

              {/* COURSES */}
              <Route
                path="/courses"
                element={
                  <div className="mt-20">
                    <CoursesTabSection setActiveTab={ubahTabNavigasi} />
                  </div>
                }
              />
              <Route
                path="/courses/:slug"
                element={
                  <div className="mt-20">
                    <CourseDetailSection setActiveTab={ubahTabNavigasi} />
                  </div>
                }
              />

              {/* PROTOTYPES */}
              <Route path="/portfolio/prototype-airlines" element={<PrototypeRedirect />} />
              <Route path="/portfolio/prototype-gogreen" element={<PrototypeRedirect />} />

              {/* PRODUCTS */}
              <Route
                path="/products"
                element={
                  <div className="mt-20">
                    {/* Efek glow background */}
                    <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />
                    <div className="py-16 max-w-5xl mx-auto min-h-[75vh] flex flex-col justify-center animate-slide-up">
                      {/* Header Section */}
                      <div className="text-center max-w-xl mx-auto mb-12 select-none">
                        <h2 className="text-3xl sm:text-4xl font-poppins font-black mb-3 tracking-tight relative inline-block">
                          <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
                            Our Digital Products
                          </span>
                          {/* Efek glow kecil dan rapi */}
                          <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
                          {/* Efek glow tipis di bawah */}
                          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
                        </h2>
                        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                          Eksplorasi ekosistem tools digital premium kami yang dirancang khusus untuk mempercepat skalabilitas, produktivitas, dan kreativitas bisnismu.
                        </p>
                      </div>

                      {/* Grid Container untuk 4 Tools - GLASSMORPHISM */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
                        {/* TOOL 1: AI VOICE GENERATOR */}
                        <div className="group relative p-6 rounded-2xl flex flex-col justify-between opacity-0 animate-slide-up hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">
                          {/* Background Glassmorphism */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/5 group-hover:via-[#FF5500]/10 group-hover:to-[#FF5500]/20 transition-all duration-700" />

                          {/* Glow effects */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />

                          {/* Garis dekoratif */}
                          <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                          <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                          <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-500" />

                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#FF5500]/20 backdrop-blur-sm border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] mb-4 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(255,85,0,0.2)]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                              </svg>
                            </div>
                            <h3 className="font-poppins font-bold text-lg text-white group-hover:text-[#FF5500] transition-colors duration-300 mb-1">
                              AI Voice Generator
                            </h3>
                            <p className="text-neutral-400 text-xs font-light leading-relaxed">Ubah teks menjadi suara manusia buatan AI. Voice over yang sangat realistis, natural, dan siap pakai untuk kebutuhan konten video marketing Anda.</p>
                          </div>

                          <button onClick={(e) => { e.stopPropagation(); window.open("https://gemini.google.com/share/aa1654ce2d36", "_blank"); }}
                            className="relative z-10 mt-4 w-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white text-neutral-300 font-chivo font-medium py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] group-hover:shadow-[0_0_30px_rgba(255,85,0,0.1)]">
                            Launch Tool ➔
                          </button>
                        </div>

                        {/* TOOL 2: UI/UX PREMIUM TEMPLATES (COMING SOON) - Delay 100ms */}
                        <div className="bg-neutral-900/20 backdrop-blur-sm p-6 rounded-2xl border border-neutral-900 flex flex-col justify-between opacity-0 animate-slide-up [animation-delay:100ms] select-none">
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-500 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 0 2.4 2.249h1.64a2.25 2.25 0 0 0 2.4-2.249 3 3 0 0 0-.66-1.128ZM9.53 16.122a3 3 0 1 1 4.94 0M9.53 16.122a3 3 0 0 0 .47.11h3.41a3 3 0 0 0 .47-.11m4.94 0a3 3 0 0 1-.66 1.128 2.25 2.25 0 0 1 2.4 2.249h1.64a2.25 2.25 0 0 1 2.4-2.249 3 3 0 0 1-5.78-1.128ZM15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                            </div>
                            <h3 className="font-poppins font-bold text-lg mb-1 text-neutral-400">
                              Premium UI Kit
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed mb-4">
                              Sistem komponen visual, landing page template, dan kerangka desain UI/UX modern siap pakai untuk Figma dan React.
                            </p>
                          </div>
                          <span className="inline-block text-center border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase tracking-widest py-1.5 rounded-xl bg-neutral-950/40">
                            Coming Soon
                          </span>
                        </div>

                        {/* TOOL 3: INSTANT LANDING GENERATOR (COMING SOON) - Delay 200ms */}
                        <div className="bg-neutral-900/20 backdrop-blur-sm p-6 rounded-2xl border border-neutral-900 flex flex-col justify-between opacity-0 animate-slide-up [animation-delay:200ms] select-none">
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-500 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                              </svg>
                            </div>
                            <h3 className="font-poppins font-bold text-lg mb-1 text-neutral-400">
                              Page Generator
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed mb-4">
                              Rakit halaman landing page promosi produk atau portofolio bisnis Anda secara instan dalam hitungan menit tanpa koding.
                            </p>
                          </div>
                          <span className="inline-block text-center border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase tracking-widest py-1.5 rounded-xl bg-neutral-950/40">
                            Coming Soon
                          </span>
                        </div>

                        {/* TOOL 4: CINEMATIC MOTION ASSETS (COMING SOON) - Delay 300ms */}
                        <div className="bg-neutral-900/20 backdrop-blur-sm p-6 rounded-2xl border border-neutral-900 flex flex-col justify-between opacity-0 animate-slide-up [animation-delay:300ms] select-none">
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-500 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
                              </svg>
                            </div>
                            <h3 className="font-poppins font-bold text-lg mb-1 text-neutral-400">
                              Motion Assets Pack
                            </h3>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed mb-4">
                              Koleksi aset bumper video, overlay cinematic, sound effects, dan grafis gerak transisi premium untuk editor video.
                            </p>
                          </div>
                          <span className="inline-block text-center border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase tracking-widest py-1.5 rounded-xl bg-neutral-950/40">
                            Coming Soon
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                }
              />

              {/* ABOUT */}
              <Route
                path="/about"
                element={
                  <div className="mt-20">
                    <AboutTabSection />
                  </div>
                }
              />

              {/* 404 - POSISI PALING BAWAH */}
              <Route path="*" element={<NotFound />} />

            </Routes>

          </main>

          {/* SECTION 2: SERVICES CONTAINER */}
          {currentPath === "/" && (
            <ServicesSection sec2Ref={sec2Ref} isSec2Visible={isSec2Visible} setActiveTab={ubahTabNavigasi} />
          )}

          {/* SECTION 3: QnA CONTAINER */}
          {currentPath === "/" && <QnaSection />}

          {/* FOOTER CONTAINER */}
          <Footer setActiveTab={ubahTabNavigasi} scrollToSection={scrollToSection} />

          {/* Modul Pop-up Formulir Project Brief */}
          <ProjectBriefModal isOpen={isBriefModalOpen} onClose={() => setIsBriefModalOpen(false)} />

          {/* Modul Pop-up Pendaftaran Member Eksklusif MoStu */}
          <MemberRegistrationModal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} />

          {/* FLOATING WHATSAPP CTA BUTTON - DENGAN LABEL HOVER & ANIMASI SLIDE FROM RIGHT */}
          <div
            className="fixed z-50 animate-slide-up focus:outline-none group"
            style={{
              animationDelay: "0s, 0s",
              bottom: isMobile ? '16px' : '24px',
              right: isMobile ? '8px' : '24px',
            }}
          >
            <div className="relative">
              {/* Tooltip/Label "Hire Us!" */}
              <div className={`absolute right-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap ${isMobile ? 'mr-[12px]' : 'mr-[20px]'
                }`}>
                <span className={`bg-white text-black font-chivo font-semibold rounded-lg border border-gray-200 shadow-lg shadow-black/10 relative ${isMobile
                  ? 'text-[10px] px-2.5 py-1.5'
                  : 'text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5'
                  }`}>
                  Hire Us!
                  <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-white"></div>
                </span>
              </div>

              {/* Tombol WhatsApp */}
              <a
                href={`https://wa.me/62882016312643?text=${encodeURIComponent(
                  "Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat via WhatsApp"
                className={`flex items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 group relative ${isMobile ? 'w-[86px] h-[86px]' : 'w-[86px] h-[86px]'
                  }`}
              >
                <div className={`absolute rounded-full bg-[#25D366]/20 animate-ping-slow ${isMobile ? 'inset-2' : 'inset-4'
                  }`}></div>

                <img
                  src={waLogo}
                  alt="WhatsApp"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:rotate-6 relative z-10"
                />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================================
   KOMPONEN PEMBANTU: AUTOMATIC TYPEWRITER EFFECT FOR SERVICES
   ========================================================================= */
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

/* ==========================================
   KOMPONEN MANDIRI: SECTION 1 (HERO CONTAINER)
   ========================================== */
function HeroSection({ scrollToSection, setIsBriefModalOpen }) {
  const waNumber = "62882016312643";
  const waMessage = encodeURIComponent(
    "Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda.  Mohon informasikan detail layanan, harga, dan bagaimana cara memulai proyek dengan tim Anda. Terima kasih!"
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const [isShiny, setIsShiny] = useState(true);
  const [mouseOpacity, setMouseOpacity] = useState(1);
  const [mouseTranslateY, setMouseTranslateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* =========================================================================
     🔥 SLOT ANGGOTA BARU KUSTOM & KONFIGURASI LAYOUT CONTAINER NAMA
     ========================================================================= */
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

  const textContainerConfig = {
    pcLeft: "78%",
    pcBottom: "120px",
    hpLeft: "50%",
    hpBottom: "70px",

    pcMinWidth: "300px",
    pcMinHeight: "50px",
    pcPadding: "1rem",

    hpMinWidth: "250px",
    hpMinHeight: "50px",
    hpPadding: "0.75rem"
  };

  /* ========================================================================= */

  const [activeSlide, setActiveSlide] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ✅ FIXED: Gabungkan menjadi satu state untuk deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      const config = isMobile ? SETTING_SCROLL_HP : SETTING_SCROLL_PC;
      if (currentScroll <= 5 || currentScroll <= config.mulaiPudar) {
        setMouseOpacity(1); setMouseTranslateY(0);
      } else if (currentScroll >= config.hilangTotal) {
        setMouseOpacity(0); setMouseTranslateY(config.jarakSembunyi);
      } else {
        const totalRentang = config.hilangTotal - config.mulaiPudar;
        const jarakBerjalan = currentScroll - config.mulaiPudar;
        const progress = jarakBerjalan / totalRentang;
        setMouseOpacity(Math.max(0, Math.min(1, 1 - progress)));
        const multiplierY = isMobile ? 0.6 : 1.0;
        setMouseTranslateY(progress * config.jarakSembunyi * multiplierY);
      }
    };
    handleScrollMouse();
    window.addEventListener("scroll", handleScrollMouse, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMouse);
  }, [isMobile]);

  return (
    <div
      className="relative flex flex-col lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen lg:h-screen pt-16 lg:pt-0 pb-0 lg:pb-0 px-0 lg:px-4"
      style={{ clipPath: isMobile ? "none" : "inset(0px -100vw 0px -100vw)" }}
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


      {/* SISI KIRI: TEXT & ACTIONS */}
      <div
        className={`w-full lg:col-span-8 flex flex-col justify-center pt-6 sm:pt-12 lg:pt-0 relative z-20 text-center lg:text-left px-4 lg:px-0 ${isMobile ? 'absolute top-20 left-0 right-0' : ''}`}
        style={isMobile ? STYLE.heroMobile : undefined}
      >
        <div className="relative mb-2 sm:mb-4">
          <p className="font-chivo font-thin text-base sm:text-2xl lg:text-[30px] text-white tracking-wide lg:absolute lg:top-[-2.3rem] lg:left-[28.3rem] z-10 whitespace-nowrap animate-slide-right select-none mb-1 lg:mb-0">
            Digital & Creative
          </p>
          <h1 className="font-poppins font-bold text-[16vw] lg:text-[170px] tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)] relative z-20 select-none opacity-0 animate-title-left">
            <span
              className="block bg-clip-text text-transparent relative z-10 animate-shimmer-sweep"
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
        <div className="font-chivo font-normal text-[10px] sm:text-sm text-white tracking-[0.12em] md:tracking-[0.22em] px-2 lg:pl-2 lg:px-0 relative z-10 select-none opacity-0 animate-slide-right [animation-delay:150ms] min-h-5 flex items-center justify-center lg:justify-start gap-1 uppercase">
          <TypewriterEffect
            services={[
              "WE BUILD STUNNING WEBSITES & APPS",
              "WE DELIVER CINEMATIC VISUAL STORYTELLING",
              "WE PRODUCE ENGAGING ANIMATIONS",
              "WE DEVELOP STRONG BRAND STRATEGIES"
            ]}
          />
        </div>
        <div className="flex items-center justify-center lg:justify-start space-x-4 pt-6 sm:pt-10 px-2 lg:pl-2 lg:px-0 opacity-0 animate-slide-up [animation-delay:0.3s]">
          {/* Tombol Get Order! */}
          <button
            onClick={() => setIsBriefModalOpen(true)}
            className="bg-white text-black window-click font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-neutral-200 transition-all active:scale-95 text-center cursor-pointer shadow-xl shadow-white/5 w-[140px] sm:w-[160px]"
          >
            Get Order
          </button>

          {/* Tombol Get in Touch! */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-700 bg-neutral-900/40 text-neutral-300 font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-white/30 hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer text-center block w-[140px] sm:w-[160px]"
          >
            Reach Us!
          </a>
        </div>

        {/* IKON MOUSE */}
        {(() => {
          const POSISI_HP = { left: "1px", bottom: "-470px" };
          const POSISI_PC = { left: "167px", top: "400px" };
          return (
            <div
              className="transition-all duration-500 ease-out"
              style={{
                position: isMobile ? "absolute" : "absolute",
                zIndex: 100,
                pointerEvents: mouseOpacity > 0 ? "auto" : "none",
                opacity: mouseOpacity,
                left: isMobile ? POSISI_HP.left : POSISI_PC.left,
                bottom: isMobile ? POSISI_HP.bottom : "auto",
                top: isMobile ? "auto" : POSISI_PC.top,
                transform: `translateY(${mouseTranslateY}px) scale(${0.95 + mouseOpacity * 0.05})`
              }}
            >
              <div onClick={() => scrollToSection("services-area")} className="w-5 h-9 border-2 border-white rounded-full flex justify-center p-1.5 animate-bounce cursor-pointer hover:border-white transition-colors">
                <div className="w-0.5 h-2 bg-neutral-300 rounded-full"></div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SISI KANAN: ANIMATED SLIDER AREA */}
      {(() => {
        const SETTING_HP = { tinggiWadah: "520px", lebarLingkaran: "400px", lebarMaxFoto: "550px" };
        const SETTING_PC = { lebarLingkaran: "620px", lebarMaxFoto: "580px" };

        return (
          <div
            className={`w-full lg:col-span-4 relative flex justify-center lg:justify-end items-end mt-auto lg:mt-0 lg:h-full lg:absolute lg:bottom-0 lg:right-0 z-10 px-0 ${isMobile ? 'mt-48' : ''}`}
            style={{
              height: isMobile ? SETTING_HP.tinggiWadah : "100%",
              overflow: isMobile ? "visible" : "visible"
            }}
          >
            {/* LINGKARAN BACKGROUND ABSOLUT STATIS */}
            <div
              className="absolute bottom-[0.5%] right-auto lg:right-[-3%] bg-[#FF5500] rounded-full -z-10 shadow-[0_0_60px_rgba(255,85,0,0.25)] opacity-0 animate-slide-up [animation-delay:0.4s]"
              style={{
                width: isMobile ? SETTING_HP.lebarLingkaran : SETTING_PC.lebarLingkaran,
                height: isMobile ? SETTING_HP.lebarLingkaran : SETTING_PC.lebarLingkaran
              }}
            />

            {/* WRAPPER ELEMEN SLIDER FOTO */}
            <div className="relative w-full h-full flex justify-center lg:justify-end items-end px-0">
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
                    className="absolute bottom-0 flex flex-col items-center lg:items-end justify-end w-full h-full px-0"
                    style={{
                      pointerEvents: isActive ? "auto" : "none"
                    }}
                  >
                    {/* FOTO TALENT SLIDING */}
                    <div className={`h-full w-auto relative ${imgAnimClass}`}>
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="h-full w-auto object-contain object-bottom relative z-10 select-none pointer-events-none transform origin-bottom transition-transform duration-700 hover:scale-[1.02]"
                        style={{ maxWidth: isMobile ? SETTING_HP.lebarMaxFoto : SETTING_PC.lebarMaxFoto }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CONTAINER TRANSPARAN PAPAN NAMA - DENGAN GLASSMORPHISM DOMINAN #FF5500 */}
            <div
              className="absolute z-30 flex flex-col justify-center items-center text-left select-none bg-[#FF5500]/10 backdrop-blur-xl border border-[#FF5500]/30 rounded-xl shadow-2xl shadow-[#FF5500]/30"
              style={{
                left: isMobile ? textContainerConfig.hpLeft : textContainerConfig.pcLeft,
                bottom: isMobile ? textContainerConfig.hpBottom : textContainerConfig.pcBottom,
                minWidth: isMobile ? '200px' : textContainerConfig.pcMinWidth,
                minHeight: isMobile ? '56px' : textContainerConfig.pcMinHeight,
                padding: isMobile ? '10px 12px' : textContainerConfig.pcPadding,
                transform: isMobile && textContainerConfig.hpLeft === "50%"
                  ? "translate(-50%, -15px)"
                  : "translateY(-30px)"
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
              <h2 className="font-poppins font-bold text-lg sm:text-2xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,85,0,0.3)] min-h-7 sm:min-h-9 flex items-center relative z-10">
                <span className={displayName && displayName.length < heroSlides[activeSlide].name.length ? "typewriter-cursor" : ""}>
                  {displayName}
                </span>
              </h2>

              {/* ROLE - WARNA PUTIH DENGAN OPACITY 60% */}
              <p className="font-mono text-white/60 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-0.5 drop-shadow-[0_0_15px_rgba(255,85,0,0.4)] min-h-4 flex items-center relative z-10">
                <span className={displayRole ? "typewriter-cursor" : ""}>
                  {displayRole}
                </span>
              </p>
            </div>
          </div>
        );
      })()}

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
      className="relative min-h-screen lg:min-h-[100vh] flex flex-col justify-center items-center py-16 sm:py-20 lg:py-12 px-4 md:px-6 lg:px-12 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgSec2})` }}
    >
      {/* Overlay gelap dengan gradasi oranye */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FF5500]/20 via-[#FF5500]/10 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none z-0" />

      {/* SINKRONISASI INTERSECTION OBSERVER */}
      <div className={`max-w-6xl mx-auto w-full relative z-10 text-center select-none ${isSec2Visible ? 'animate-slide-down' : 'opacity-0'}`}>

        {/* Header Section - Services */}
        {/* Our Services Badge - DI ATAS Judul */}
        <div className="inline-block mb-4">
          <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
            Our Services
          </span>
        </div>

        <div className="text-center mb-6 lg:mb-8">
          {/* Judul Utama */}
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-2 relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Solusi Kreatif & Digital
            </span>
            {/* Efek glow kecil dan rapi */}
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            {/* Efek glow tipis di bawah */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>

          {/* Deskripsi */}
          <p className="text-neutral-300 text-[11px] sm:text-xs lg:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4 mt-2">
            Kami hadir dengan layanan terbaik dan terintegrasi untuk membantu bisnis Anda berkembang jadi lebih efisien di era digital.
          </p>
        </div>

        {/* Grid Layanan - 2 KOLOM DI MOBILE, 3 KOLOM DI DESKTOP */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 max-w-6xl mx-auto">
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
                  <h3 className="font-poppins font-bold text-xs sm:text-sm lg:text-lg text-white group-hover:text-[#FF5500] transition-colors duration-300 mb-1 lg:mb-2">
                    {service.title}
                  </h3>

                  {/* Description - proporsional dengan teks header */}
                  <p className="text-neutral-300 text-[11px] sm:text-xs lg:text-sm font-light leading-relaxed group-hover:text-neutral-200 transition-colors duration-300 flex-1">
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
            <span className="text-neutral-200 text-[10px] sm:text-xs lg:text-sm font-chivo font-medium group-hover:text-white transition-colors duration-300">
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
   KOMPONEN MANDIRI: INTERACTIVE PROJECT BRIEF FORM MODAL
   ========================================== */
function ProjectBriefModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientContact: "",
    clientSocial: "",
    serviceType: "web-dev",
    dynamicRequirement: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const getDynamicLabelAndPlaceholder = () => {
    switch (formData.serviceType) {
      case "branding":
        return {
          label: "Detail Kebutuhan Branding Strategy *",
          placeholder: "Jelaskan tentang brand Anda, apa keunikannya, pengembangan/jasa yang Anda inginkan untuk brand Anda?"
        };
      case "web-dev":
        return {
          label: "Detail Kebutuhan Web/Software Developing *",
          placeholder: "Jelaskan fitur utama yang wajib ada (payment gateway, sistem login), target fungsi aplikasi, atau referensi website yang Anda sukai..."
        };
      case "visual-story":
        return {
          label: "Detail Kebutuhan Visual Storytelling *",
          placeholder: "Jelaskan jenis visual yang Anda butuhkan (e.g., 3D spatial render interior, video dokumenter cinematic), perkiraan durasi, and konsep cerita yang ingin disampaikan..."
        };
      case "animation":
        return {
          label: "Detail Kebutuhan Animation Services *",
          placeholder: "Jelaskan kebutuhan aset animasi Anda (background bergerak untuk game Visual Novel, bumper motion graphics logo), gaya visual (2D/3D), atau referensi gerak..."
        };
      default:
        return {
          label: "Detail Kebutuhan Proyek *",
          placeholder: "Jelaskan secara rinci detail kebutuhan jasa pengembangan yang Anda inginkan..."
        };
    }
  };

  const dynamicSetup = getDynamicLabelAndPlaceholder();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceNames = {
      "web-dev": "Web/Software Developing",
      "visual-story": "Visual Storytelling",
      "animation": "Animation Services",
      "branding": "Branding Strategy"
    };

    const formatLayanan = serviceNames[formData.serviceType] || formData.serviceType;

    const waText =
      `*REKAPAN BRIEF CLIENT MOSTU AGENCY*
      ---------------------------------------
      # *Nama / Brand:* ${formData.clientName}
      # *Kontak WA:* ${formData.clientContact}
      # *Email / IG:* ${formData.clientSocial || "-"}
      # *Kategori Layanan:* ${formatLayanan}

      [ DETAIL REQUIREMENTS ]
      "${formData.dynamicRequirement}"
      ---------------------------------------
      _Pesan otomatis dikirim melalui Formulir Interaktif MoStu Agency_`;

    const targetWANumber = "62882016312643";
    const waFinalLink = `https://wa.me/${targetWANumber}?text=${encodeURIComponent(waText)}`;

    setIsSubmitted(true);

    setTimeout(() => {
      window.open(waFinalLink, "_blank");
      setIsSubmitted(false);
      setFormData({ clientName: "", clientContact: "", clientSocial: "", serviceType: "web-dev", dynamicRequirement: "" });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-neutral-950 border border-neutral-850 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col animate-slide-up">
        <div className="p-6 border-b border-neutral-900 flex justify-between items-center select-none shrink-0">
          <div>
            <h3 className="font-poppins font-black text-lg text-white tracking-tight">Rancang Proyek Tangguhmu</h3>
            <p className="text-neutral-400 font-light text-xs mt-0.5">Berikan kami data brief dasar untuk kalkulasi eksekusi yang presisi.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 font-poppins">
          {isSubmitted ? (
            <div className="py-12 text-center flex flex-col justify-center items-center space-y-3 animate-fade-up">
              <div className="w-12 h-12 bg-[#FF5500]/10 border border-[#FF5500]/40 rounded-full flex items-center justify-center text-[#FF5500] animate-bounce">✓</div>
              <h4 className="font-bold text-base">Membuka WhatsApp...</h4>
              <p className="text-neutral-400 text-xs font-light max-w-xs leading-relaxed">Sistem sedang memformat rekapan brief ke aplikasi WhatsApp Anda secara aman.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Nama / Nama Brand *</label>
                  <input required type="text" placeholder="Mhd. Reza Erdiansyah / Mohd Daniel" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Kontak WA *</label>
                  <input required type="text" placeholder="081234xxx" value={formData.clientContact} onChange={(e) => setFormData({ ...formData, clientContact: e.target.value })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Email atau Akun Instagram</label>
                <input type="text" placeholder="e.g., mostuid@gmail.com / @mostu.id" value={formData.clientSocial} onChange={(e) => setFormData({ ...formData, clientSocial: e.target.value })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light" />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Kategori Layanan Utama</label>
                <select value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value, dynamicRequirement: "" })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light cursor-pointer">
                  <option value="web-dev">Web/Software Developing</option>
                  <option value="visual-story">Visual Storytelling</option>
                  <option value="animation">Animation Services</option>
                  <option value="branding">Branding Strategy</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono #FF5500 uppercase tracking-wider block transition-colors duration-300 text-[#FF5500]">
                  {dynamicSetup.label}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={dynamicSetup.placeholder}
                  value={formData.dynamicRequirement}
                  onChange={(e) => setFormData({ ...formData, dynamicRequirement: e.target.value })}
                  className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light resize-none leading-relaxed transition-all duration-300 min-h-35"
                />
              </div>

              <button type="submit" className="w-full bg-white text-black font-chivo font-semibold py-3 rounded-lg text-sm tracking-wide hover:bg-neutral-200 transition-all active:scale-[0.98] mt-4 cursor-pointer shadow-lg">
                Kirim Brief Strategis Ke MoStu.ID
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: POP UP PENDAFTARAN MEMBER EKSKLUSIF
   ========================================== */
function MemberRegistrationModal({ isOpen, onClose }) {
  const [memberData, setMemberData] = useState({ name: "", contact: "" });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleMemberSubmit = (e) => {
    e.preventDefault();

    const memberText =
      `*REGISTRASI MEMBER PREMIUM MOSTU AGENCY*
      ---------------------------------------
      # *Nama Pendaftar:* ${memberData.name}
      # *Kontak Person:* ${memberData.contact}
      # *Paket Langganan:* Premium Member (75k/Bulan)

      [ BENEFIT AKSES EKASUKLUSIF ]
      - Dapat akses produk digital free semuanya.
      - Harga spesial tiap pemesanan jasa.
      - VIP delivery project.
      ---------------------------------------
      _Pesan registrasi instan dari Portal MoStu.ID_`;

    const targetWANumber = "62882016312643";
    const waMemberLink = `https://wa.me/${targetWANumber}?text=${encodeURIComponent(memberText)}`;

    setIsSent(true);
    setTimeout(() => {
      window.open(waMemberLink, "_blank");
      setIsSent(false);
      setMemberData({ name: "", contact: "" });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-neutral-950 border border-neutral-850 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative flex flex-col font-poppins animate-slide-up">

        {/* Header */}
        <div className="p-6 border-b border-neutral-900 flex justify-between items-center select-none shrink-0">
          <div>
            <h3 className="font-bold text-lg text-white tracking-tight">MoStu Premium Member</h3>
            <p className="text-neutral-400 font-light text-xs mt-0.5">Gabung lingkaran eksklusif untuk skalabilitas tinggi.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all cursor-pointer focus:outline-none">&times;</button>
        </div>

        {/* Konten Utama */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSent ? (
            <div className="py-8 text-center flex flex-col justify-center items-center space-y-3 animate-fade-up">
              <div className="w-12 h-12 bg-[#FF5500]/10 border border-[#FF5500]/40 rounded-full flex items-center justify-center text-[#FF5500] animate-bounce">✓</div>
              <h4 className="font-bold text-base">Menghubungkan ke WA...</h4>
              <p className="text-neutral-400 text-xs font-light max-w-xs leading-relaxed">Menyiapkan draf validasi invoice premium member MoStu Anda.</p>
            </div>
          ) : (
            <>
              {/* Box Nilai Harga */}
              <div className="bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-xl p-4 text-center">
                <span className="text-neutral-400 text-xs uppercase tracking-wider font-mono block">Biaya Investasi Member</span>
                <div className="flex items-baseline justify-center space-x-1 mt-1">
                  <span className="text-2xl font-black text-white">Rp 75.000</span>
                  <span className="text-neutral-400 text-xs font-light">/ bulan</span>
                </div>
              </div>

              {/* List Kelebihan Member */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#FF5500]">Keuntungan Eksklusif:</h4>
                <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#FF5500] font-bold shrink-0">#</span>
                    <span>Dapat akses produk digital free semuanya.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#FF5500] font-bold shrink-0">#</span>
                    <span>Harga spesial tiap pemesanan jasa.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <span className="text-[#FF5500] font-bold shrink-0">#</span>
                    <span>VIP delivery project.</span>
                  </li>
                </ul>
              </div>

              <hr className="border-neutral-900" />

              {/* Form Input Data */}
              <form onSubmit={handleMemberSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">Nama Lengkap / Brand *</label>
                  <input required type="text" placeholder="e.g., Mhd. Reza Erdiansyah" value={memberData.name} onChange={(e) => setMemberData({ ...memberData, name: e.target.value })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">No. WhatsApp Aktif *</label>
                  <input required type="text" placeholder="e.g., 088201xxxxxx" value={memberData.contact} onChange={(e) => setMemberData({ ...memberData, contact: e.target.value })} className="w-full bg-neutral-900/60 border border-neutral-850 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]/60 font-light" />
                </div>
                <button type="submit" className="w-full bg-white text-black font-chivo font-bold py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-[0.98] mt-4 cursor-pointer shadow-lg">
                  Daftar Member Sekarang
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: TAB PORTFOLIO - VERSI STABIL
   ========================================== */
function PortfolioTabSection({ currentFilter, setFilter }) {
  // State khusus untuk melacak video mana yang sedang aktif diputar di pop-up
  const [activeVideoId, setActiveVideoId] = useState(null);

  // State untuk dropdown kategori
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { id: "all", name: "All Our Projects" },
    { id: "web-dev", name: "Web/Software" },
    { id: "app-dev", name: "App Developing" },
    { id: "ai-agent", name: "AI Automation" },
    { id: "visual-story", name: "Visual Storytelling" },
    { id: "animation", name: "Animation Services" },
    { id: "branding", name: "Branding Strategy" },
  ];

  const projects = [
    {
      title: "Piring Situek",
      cat: "web-dev",
      desc: "Website bisnis UMKM piring cantik yang terbuat dari pelepah pinang",
      meta: "Web Development Project • 2026",
      delay: "",
      link: "https://situek.com/",
      image: webPorto5Img,
    },
    {
      title: "MoStu Airline Prototype",
      cat: "web-dev",
      desc: "Prototype landing page modern dengan animasi parallax",
      meta: "Web Prototype • 2026",
      delay: "",
      link: null,
      image: webPorto4Img,
      isPrototype: true,
      folderName: "prototype-airlines"
    },
    {
      title: "Terapi Kesehatan Sejati",
      cat: "web-dev",
      desc: "Website promosi layanan terapi kesehatan yang informatif dan berorientasi pada peningkatan kepercayaan pasien.",
      meta: "Web Development Project • 2026",
      delay: "",
      link: "https://terapikesehatansejati.com/",
      image: webPorto1Img,
    },
    {
      title: "Go Green Parallax Prototype",
      cat: "web-dev",
      desc: "Website interaktif dengan animasi parallax untuk campaign lingkungan",
      meta: "Web Prototype • 2026",
      delay: "",
      link: null,
      image: webPorto2Img,
      isPrototype: true,
      folderName: "prototype-gogreen"
    },
    {
      title: "Core Pack Prototype",
      cat: "web-dev",
      desc: "Website interaktif dengan animasi parallax untuk campaign bisnis packaging",
      meta: "Web Prototype • 2026",
      delay: "",
      link: null,
      image: webPorto3Img,
      isPrototype: true,
      folderName: "prototype-corepack"
    },
    {
      title: "Nama Aplikasi Anda",
      cat: "app-dev",
      desc: "Deskripsi singkat tentang aplikasi yang Anda kembangkan",
      meta: "App Development Project • 2026",
      delay: "[animation-delay:200ms]",
      link: null,
      image: webPorto1Img,
    },
    {
      title: "Digital Product Campaign",
      cat: "visual-story",
      desc: "Video promosi produk digital dengan visual menarik, komunikatif, dan berorientasi hasil.",
      meta: "Videography Projects • 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: videoPorto1Img,
      videoYoutubeId: "FbdM_EwI1pk"
    },
    {
      title: "Video Cinematic Aqiqah",
      cat: "visual-story",
      desc: "Mengabadikan momen aqiqah melalui visual sinematik yang emosional, hangat, dan penuh makna.",
      meta: "Videography Projects • 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: videoPorto2Img,
      videoYoutubeId: "bVjdp2FYwoI"
    },
    {
      title: "Video Profil Prof. Dr. Ghazali Syamni",
      cat: "visual-story",
      desc: "Video profil pengukuhan guru besar dengan mengangkat perjalanan akademik, kontribusi keilmuan beliau.",
      meta: "Videography Projects • 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: null,
      videoYoutubeId: "zFJzxtdbuok"
    },
    {
      title: "Video Profil Prof. Dr. drh. Farida Athaillah M.Si",
      cat: "visual-story",
      desc: "Menghadirkan cerita perjalanan akademik melalui visual yang sinematik dan komunikatif.",
      meta: "Videography Projects • 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: null,
      videoYoutubeId: "vSMJBn-kT_I"
    },
    {
      title: "PT Perta Arun Gas Animation",
      cat: "animation",
      desc: "Visual edukatif untuk meningkatkan kesadaran keselamatan dan budaya kerja.",
      meta: "Animation Project • 2026",
      delay: "[animation-delay:400ms]",
      link: "https://www.youtube.com/playlist?list=PLYQpjQwcSKW9jG1wHX6KXY_sMytqHeHQ0",
      image: animPorto1Img,
      videoYoutubeId: null
    },
  ];

  const filteredProjects = currentFilter === "all" ? projects : projects.filter(p => p.cat === currentFilter);

  // Aksi ketika kartu portofolio diklik
  const handleCardClick = (e, project) => {
    e.stopPropagation();

    // Skenario 0: Jika ada Video prototype web langsung dari path
    if (project.isPrototype) {
      window.open(`/portfolio/${project.folderName}`, '_blank');
      return;
    }

    // Skenario 1: Jika ada Video Youtube, buka jendela pop-up penayang
    if (project.videoYoutubeId) {
      setActiveVideoId(project.videoYoutubeId);
      return;
    }

    // Skenario 2: Jika ada link web external, buka tautan di tab baru
    if (project.link) {
      const hiddenAnchor = document.createElement("a");
      hiddenAnchor.href = project.link;
      hiddenAnchor.target = "_blank";
      hiddenAnchor.rel = "noopener noreferrer";
      document.body.appendChild(hiddenAnchor);
      hiddenAnchor.click();
      document.body.removeChild(hiddenAnchor);
    }
  };

  return (
    <div className="py-12 min-h-[70vh]">
      {/* Efek glow background - seperti di Home */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER NAVIGASI KATEGORI - Dengan Dropdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-20">
        {/* Sub Judul - Di mobile rata tengah, di desktop rata kiri */}
        <div className="animate-slide-down text-center md:text-left">
          <h2 className="text-4xl font-black tracking-tight mb-2 font-poppins relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Portofolio Kami
            </span>
            {/* Efek glow kecil dan rapi */}
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            {/* Efek glow tipis di bawah */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>
          <p className="text-neutral-400 max-w-xl font-light text-sm mx-auto md:mx-0 mt-2">Silahkan eksplorasi karya terbaik pilihan kami.</p>
        </div>

        {/* Dropdown Kategori - Di sebelah kanan */}
        <div className="relative self-center md:self-end animate-slide-left mx-auto md:mx-0 md:ml-10" ref={dropdownRef}>
          {/* Label di atas dropdown - di desktop rata kiri, di mobile rata tengah */}
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5 text-center md:text-left md:ml-5">
            Categories
          </p>

          {/* Tombol Dropdown - width menyesuaikan konten */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-neutral-900/40 border border-neutral-700/50 hover:border-[#FF5500]/40 text-neutral-300 hover:text-white font-poppins text-sm font-medium transition-all duration-300 cursor-pointer justify-between mx-auto md:mx-0"
          >
            <span className="whitespace-nowrap">
              {categories.find(cat => cat.id === currentFilter)?.name || "All Projects"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Menu Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-neutral-950/95 backdrop-blur-lg border border-neutral-800 rounded-xl shadow-2xl py-2 z-100 animate-slide-down">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-2.5 text-sm font-poppins transition-all duration-200 cursor-pointer ${currentFilter === cat.id
                    ? "text-[#FF5500] bg-[#FF5500]/10 font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {currentFilter === cat.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#FF5500]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                    <span className={currentFilter === cat.id ? "ml-0" : "ml-7"}>{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID DAFTAR PORTOFOLIO - VERSI STABIL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredProjects.map((project, i) => (
          <div
            key={`${project.title}-${i}`}
            onClick={(e) => handleCardClick(e, project)}
            className={`
              group relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 
              rounded-2xl overflow-hidden cursor-pointer opacity-0 animate-slide-up ${project.delay}
              transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF5500]/20
              ${(project.link || project.videoYoutubeId || project.isPrototype) ? 'cursor-pointer' : ''}
              flex flex-col border border-white/5 hover:border-[#FF5500]/40
            `}
          >
            {/* Background gelap solid dengan efek glass tipis */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#FF5500]/5 pointer-events-none" />

            {/* Efek glow di sudut - sederhana */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF5500]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF5500]/20 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />

            {/* Garis dekoratif #FF5500 */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent group-hover:via-[#FF5500]/70 transition-all duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent group-hover:via-[#FF5500]/70 transition-all duration-500 pointer-events-none" />

            {/* Konten */}
            <div className="relative z-10 flex flex-col h-full p-5">
              {/* AREA PREVIEW GAMBAR */}
              <div className="w-full aspect-video rounded-lg mb-4 overflow-hidden relative bg-neutral-800/80 border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-400">
                {project.image ? (
                  <div className="w-full h-full relative">
                    {typeof project.image === 'string' && project.image.endsWith('.mp4') ? (
                      <video src={project.image} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    {project.videoYoutubeId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-400">
                        <div className="p-3 rounded-full bg-[#FF5500]/30 backdrop-blur-sm border-2 border-[#FF5500]/50 shadow-lg shadow-[#FF5500]/30">
                          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ) : project.videoYoutubeId ? (
                  <div className="w-full h-full relative">
                    <img
                      src={`https://img.youtube.com/vi/${project.videoYoutubeId}/hqdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <div className="p-3 rounded-full bg-[#FF5500]/30 backdrop-blur-sm border-2 border-[#FF5500]/50 shadow-lg shadow-[#FF5500]/30">
                        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-poppins font-bold text-base sm:text-lg text-white group-hover:text-[#FF5500] transition-colors duration-300 mb-1 line-clamp-1">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
                {project.desc}
              </p>

              {/* Meta */}
              <p className="text-neutral-500 text-[10px] sm:text-[11px] font-mono mt-3 text-[#FF5500]/60 border-t border-white/5 pt-2">
                {project.meta}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* POP-UP LIGHTBOX MODAL PENAYANG YOUTUBE */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 z-50 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-900 p-2 rounded-full border border-neutral-800 transition-colors cursor-pointer"
              title="Close Player"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   DATA KELAS ONLINE - SUMBER TUNGGAL UNTUK COURSES
   ========================================== */
const coursesData = [
  {
    slug: "ngonten",
    title: "Kelas Ngonten",
    status: "ready", // ready | soon | later
    badge: "Dibuka",
    shortDesc: "Bikin konten media sosial yang bikin orang berhenti scroll.",
    icon: <img src={iconVisualStorytelling} alt="Ngonten Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90" />,
    trailerId: "FbdM_EwI1pk",
    hero: {
      eyebrow: "Kelas Ngonten",
      headline: "Berhenti nebak-nebak, mulai ngonten yang beneran dilihat orang",
      subheadline: "Pelajari cara riset ide, bikin hook 3 detik pertama, dan susun konten yang konsisten tanpa harus mikir dari nol tiap hari."
    },
    painPoints: [
      "Sudah posting rutin tapi reach-nya stuck di situ-situ aja.",
      "Bingung mau ngonten apa setiap hari, akhirnya skip posting.",
      "Konten terasa 'jualan banget' sampai orang malas nonton sampai habis."
    ],
    benefits: [
      "Framework riset ide konten yang nggak pernah kehabisan bahan",
      "Teknik hook 3 detik pertama supaya orang nggak langsung scroll",
      "Cara bikin content plan mingguan yang realistis buat dikerjain sendiri",
      "Studi kasus konten yang terbukti nambah engagement dan followers"
    ],
    curriculum: [
      "Riset niche & audiens: ngonten buat siapa, kenapa mereka peduli",
      "Formula hook, isi, dan closing yang gampang ditiru",
      "Editing ringan biar konten terasa rapi tanpa effort berlebihan",
      "Strategi posting & evaluasi performa tiap minggu"
    ],
    ctaText: "Daftar Kelas Ngonten",
    waMessage: "Halo MoStu.ID, saya tertarik untuk ikut Kelas Ngonten. Boleh info jadwal dan detail pendaftarannya?"
  },
  {
    slug: "web-development",
    title: "Kelas Bikin Website",
    status: "soon",
    badge: "Segera Hadir",
    shortDesc: "Bangun website sendiri dari nol sampai online, tanpa harus jago coding dulu.",
    icon: <img src={iconWebDev} alt="Web Development Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90" />,
    trailerId: "FbdM_EwI1pk",
    hero: {
      eyebrow: "Kelas Web Development",
      headline: "Punya ide bisnis atau portofolio? Saatnya kamu yang bikin website-nya sendiri",
      subheadline: "Belajar dari dasar HTML, CSS, sampai membangun website modern yang responsif — dibimbing langsung oleh tim yang sehari-hari mengerjakan proyek klien."
    },
    painPoints: [
      "Selalu bergantung sama orang lain setiap butuh update website.",
      "Sudah coba belajar sendiri dari internet, tapi materinya berserakan dan bikin bingung.",
      "Takut coding itu susah dan cuma buat orang IT."
    ],
    benefits: [
      "Roadmap belajar yang jelas, dari nol sampai bisa deploy website sendiri",
      "Praktik langsung bikin proyek nyata, bukan cuma teori",
      "Dibimbing oleh developer yang aktif mengerjakan proyek klien setiap hari",
      "Akses komunitas untuk tanya-jawab selama proses belajar"
    ],
    curriculum: [
      "Dasar HTML, CSS, dan struktur halaman web modern",
      "Membuat tampilan responsif untuk HP, tablet, dan desktop",
      "Pengenalan React dan cara kerja website interaktif",
      "Deploy website supaya bisa diakses publik"
    ],
    ctaText: "Gabung Waitlist Web Development",
    waMessage: "Halo MoStu.ID, saya ingin masuk waitlist Kelas Web Development. Tolong kabari saya saat pendaftaran dibuka ya."
  },
  {
    slug: "app-development",
    title: "Kelas Bikin Aplikasi",
    status: "soon",
    badge: "Segera Hadir",
    shortDesc: "Wujudkan ide aplikasi impianmu jadi aplikasi yang benar-benar bisa dipakai.",
    icon: <img src={iconAppDev} alt="App Development Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90" />,
    trailerId: "FbdM_EwI1pk",
    hero: {
      eyebrow: "Kelas App Development",
      headline: "Dari ide di kepala, jadi aplikasi yang bisa di-install orang lain",
      subheadline: "Kelas ini mengajarkan cara berpikir dan membangun aplikasi mobile dari konsep sampai siap dirilis, dengan studi kasus dari proyek-proyek nyata."
    },
    painPoints: [
      "Punya ide aplikasi tapi nggak tahu harus mulai dari mana.",
      "Merasa app development itu ranah yang terlalu rumit untuk dipelajari sendiri.",
      "Sudah pakai no-code tools tapi mentok pas butuh fitur yang lebih custom."
    ],
    benefits: [
      "Memahami alur berpikir sebelum membangun aplikasi: dari masalah ke fitur",
      "Praktik membangun aplikasi mobile dari awal sampai bisa dicoba di HP sendiri",
      "Tips memilih fitur mana yang penting duluan supaya aplikasi cepat jadi",
      "Insight dari pengalaman tim MoStu mengerjakan aplikasi untuk klien"
    ],
    curriculum: [
      "Dasar logika pemrograman untuk aplikasi mobile",
      "Membangun tampilan (UI) dan alur (UX) aplikasi yang mudah dipakai",
      "Menghubungkan aplikasi dengan data (database sederhana)",
      "Persiapan sebelum aplikasi dirilis ke pengguna"
    ],
    ctaText: "Gabung Waitlist App Development",
    waMessage: "Halo MoStu.ID, saya ingin masuk waitlist Kelas App Development. Tolong kabari saya saat pendaftaran dibuka ya."
  },
  {
    slug: "n8n-automation",
    title: "n8n Automation",
    status: "later",
    badge: "Coming Soon",
    shortDesc: "Otomatisasi workflow bisnis pakai n8n, tanpa perlu jadi programmer.",
    icon: <img src={iconAIAgent} alt="n8n Automation Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-60" />
  },
  {
    slug: "animasi",
    title: "Kelas Bikin Animasi",
    status: "later",
    badge: "Coming Soon",
    shortDesc: "Animasi 2D/3D untuk motion graphics dan explainer video.",
    icon: <img src={iconAnimationServices} alt="Animasi Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-60" />
  },
  {
    slug: "videografi-fotografi",
    title: "Kelas Videografi/Fotografi",
    status: "later",
    badge: "Coming Soon",
    shortDesc: "Produksi visual sinematik dan fotografi profesional dari nol.",
    icon: <img src={iconVisualStorytelling} alt="Videografi Fotografi Icon" className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-60" />
  },
];

/* ==========================================
   KOMPONEN MANDIRI: TAB COURSES (KELAS ONLINE)
   ========================================== */
function CoursesTabSection() {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    if (course.status === "later") return;
    navigate(`/courses/${course.slug}`);
  };

  return (
    <div className="py-12 min-h-[70vh] relative">
      {/* Efek glow background - konsisten dengan tab lain */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 select-none relative z-10">
        <div className="inline-block mb-4">
          <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
            Kelas Online
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-poppins font-black mb-3 tracking-tight relative inline-block">
          <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
            Belajar Langsung Dari Kami
          </span>
          <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
          Kelas online praktis yang disusun langsung dari pengalaman kami mengerjakan proyek klien sehari-hari.
        </p>
      </div>

      {/* Grid Kartu Kelas - RASIO 4:5 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        {coursesData.map((course, i) => {
          const isClickable = course.status !== "later";
          return (
            <div
              key={course.slug}
              onClick={() => handleCourseClick(course)}
              className={`
          group relative rounded-2xl overflow-hidden opacity-0 animate-slide-up
          transition-all duration-400 flex flex-col border
          ${isClickable
                  ? "cursor-pointer bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 border-white/5 hover:border-[#FF5500]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF5500]/20"
                  : "cursor-default bg-neutral-900/20 border-neutral-900"
                }
        `}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* THUMBNAIL - TANPA TOMBOL PLAY */}
              <div className="relative w-full aspect-4/5 bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF5500]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none" />

                {course.icon}

                {/* Badge Status - TETAP ADA */}
                <span className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-chivo font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-full backdrop-blur-sm border ${course.status === "ready"
                    ? "bg-[#FF5500]/25 text-[#FF5500] border-[#FF5500]/40"
                    : course.status === "soon"
                      ? "bg-white/10 text-neutral-200 border-white/20"
                      : "bg-neutral-950/60 text-neutral-500 border-neutral-800"
                  }`}>
                  {course.badge}
                </span>
              </div>

              {/* Konten teks */}
              <div className="relative z-10 p-3.5 sm:p-4 flex-1 flex flex-col">
                <h3 className={`font-poppins font-bold text-xs sm:text-sm lg:text-base mb-1 transition-colors duration-300 ${isClickable ? "text-white group-hover:text-[#FF5500]" : "text-neutral-400"}`}>
                  {course.title}
                </h3>
                <p className={`text-[10px] sm:text-xs font-light leading-relaxed flex-1 line-clamp-2 ${isClickable ? "text-neutral-400" : "text-neutral-600"}`}>
                  {course.shortDesc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: HALAMAN DETAIL KELAS
   ========================================== */
function CourseDetailSection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!course) {
    return (
      <div className="py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-neutral-400 mb-4">Kelas yang kamu cari tidak ditemukan.</p>
        <button onClick={() => navigate("/courses")} className="text-[#FF5500] font-chivo text-sm uppercase tracking-wider hover:underline cursor-pointer">
          Kembali ke Courses
        </button>
      </div>
    );
  }

  const waLink = `https://wa.me/62882016312643?text=${encodeURIComponent(course.waMessage || `Halo MoStu.ID, saya ingin tahu lebih lanjut tentang Kelas ${course.title}.`)}`;

  // Fallback tampilan untuk kelas yang masih "Coming Soon" (belum ada materi storytelling)
  if (course.status === "later" || !course.hero) {
    return (
      <div className="py-24 text-center min-h-[60vh] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
        <span className="bg-neutral-900/60 text-neutral-400 text-[10px] font-chivo font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-neutral-800 mb-4 relative z-10">
          Coming Soon
        </span>
        <h2 className="text-2xl sm:text-3xl font-poppins font-black text-white mb-3 relative z-10">{course.title}</h2>
        <p className="text-neutral-400 text-sm font-light max-w-md mx-auto mb-6 relative z-10">
          Kelas ini sedang kami siapkan. Pantau terus halaman Courses untuk info jadwal pendaftarannya.
        </p>
        <button onClick={() => navigate("/courses")} className="relative z-10 text-[#FF5500] font-chivo text-sm uppercase tracking-wider hover:underline cursor-pointer">
          Kembali ke Courses
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12 relative">
      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/courses")}
        className="relative z-10 flex items-center gap-2 text-neutral-400 hover:text-[#FF5500] font-chivo text-xs uppercase tracking-wider transition-colors cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Courses
      </button>

      {/* Hero */}
      <div className="relative z-10 text-center max-w-2xl mx-auto animate-slide-up">
        <span className={`inline-block text-[10px] font-chivo font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-4 ${course.status === "ready" ? "bg-[#FF5500]/20 text-[#FF5500] border-[#FF5500]/30" : "bg-white/10 text-neutral-200 border-white/20"
          }`}>
          {course.hero.eyebrow}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-black text-white tracking-tight mb-4 leading-tight">
          {course.hero.headline}
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
          {course.hero.subheadline}
        </p>
      </div>

      {/* Video Trailer */}
      <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#FF5500]/10 animate-slide-up">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${course.trailerId}?rel=0&modestbranding=1`}
          title={`Trailer Kelas ${course.title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Pain Points */}
      {course.painPoints && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {course.painPoints.map((point, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      {course.benefits && (
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-poppins font-bold text-white mb-4 text-center">
            Yang Akan Kamu Dapatkan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#FF5500] shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curriculum */}
      {course.curriculum && (
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-poppins font-bold text-white mb-4 text-center">
            Apa Saja Yang Dipelajari
          </h3>
          <div className="space-y-2.5">
            {course.curriculum.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF5500]/20 text-[#FF5500] text-[11px] font-chivo font-bold flex items-center justify-center">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-neutral-300 text-xs sm:text-sm font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Bawah */}
      <div className="relative z-10 text-center pt-4 pb-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.3)] transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
        >
          {course.ctaText}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </a>
        <p className="text-neutral-500 text-[11px] font-light mt-3">Chat langsung dengan tim kami di WhatsApp</p>
      </div>
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: TAB ABOUT US (DIPERBAIKI)
   ==========================================  */
function AboutTabSection() {
  const team = [
    { role: "Founder / Lead Developer", name: "Mhd. Reza Erdiansyah", image: founderimg, delay: "" },
    { role: "Co-Founder / Art Director", name: "Mohd. Daniel", image: cofounderimg, delay: "[animation-delay:100ms]" },
    { role: "Maybe it's you?", name: "Who's Next?", image: whoNext, delay: "[animation-delay:100ms]" },
    { role: "Maybe it's you?", name: "Who's Next?", image: whoNext, delay: "[animation-delay:100ms]" },
  ];

  return (
    <div className="py-12 max-w-5x2 mx-auto space-y-20 animate-slide-up ">

      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch select-none">
        <div className="md:col-span-7 space-y-0 text-left relative">
          <div className="text-left mb-8 select-none">
            <h3 className="text-4xl font-poppins font-black tracking-tight text-white relative inline-block">
              <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
                About MoStu
              </span>
              {/* Efek glow kecil dan rapi */}
              <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
              {/* Efek glow tipis di bawah */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
            </h3>
            <p className="text-neutral-400 font-semibold text-xs sm:text-sm mt-2">Sejarah perjalanan kami dalam membangun solusi kreatif dan digital.</p>
          </div>

          {/* TIMELINE DENGAN GARIS TERHUBUNG - TEPAT DI TENGAH DOT */}
          <div className="relative pl-2">
            {/* Garis vertikal - dari tengah dot pertama sampai tengah dot terakhir */}
            <div className="absolute left-1.5 top-[12px] bottom-[12px] w-[5px] bg-gradient-to-b from-[#FF5500]/60 via-[#FF5500]/30 to-transparent rounded-full" />

            {/* Item 1 */}
            <div className="relative pl-6 pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                MoStu (Mostanir Studios) berawal pada tahun 2024 sebagai layanan Agency yang bergerak di bidang animasi, foto & videografi, pengembangan website, dan visualisasi 3D.
              </p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-6 pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Ide ini lahir dari sebuah meja warkop, ditemani segelas kopi pancung khas Aceh dan obrolan panjang tentang mimpi, kreativitas, serta harapan untuk membangun sesuatu yang bermanfaat. Hingga hari ini, Mostanir Studios masih dalam proses bertumbuh dan belajar.
              </p>
            </div>

            {/* Item 3 */}
            <div className="relative pl-6 pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Kami memang bukan tim besar, bahkan belum memiliki perjalanan yang begitu panjang. Namun kami percaya, bahwa setiap karya yang dikerjakan dengan sungguh-sungguh akan menemukan jalannya sendiri.
              </p>
            </div>

            {/* Item 4 */}
            <div className="relative pl-6 pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Dari proyek ke proyek, kami terus mengembangkan kemampuan, memperluas pengalaman, dan berusaha memberikan hasil terbaik bagi setiap klien yang mempercayakan kebutuhannya kepada kami, dengan penuh tanggung jawab.
              </p>
            </div>

            {/* Item 5 (terakhir) */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_25px_rgba(255,85,0,0.5)] z-10" />
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Perjalanan ini masih panjang, dan kami memilih untuk terus belajar, berkarya, serta bertumbuh bersama setiap kepercayaan yang Anda berikan.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-neutral-850 flex items-center justify-center bg-neutral-900 h-full min-h-75">
          <img
            src={bgSec2}
            alt="MoStu Corporate Visual"
            className="w-full h-full object-cover object-center opacity-80 absolute inset-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left z-10">
            <span className="font-poppins font-bold text-4xl text-[#ffb792] block drop-shadow-[0_0_15px_rgba(255,85,0,0.65)] select-none">
              Since 2024
            </span>
            <span className="text-neutral-300 font-mono text-[10px] uppercase tracking-widest mt-2 block">
              From Simple Ideas to Meaningful Solutions
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-neutral-900/60">
        <a
          href="https://drive.google.com/file/d/18ZAaMazo9MeIC_VigtfQl1wHEcIoZ_uw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF5500] hover:bg-[#e64a00] text-white font-poppins font-semibold px-8 py-4 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#FF5500]/20 hover:shadow-[#FF5500]/40 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span>Lihat Company Profile (G-Drive) </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.5L21 12m0 0l-7.5 5.5M21 12H3" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start select-none py-8 border-t border-neutral-900/60">
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-[#FF5500] rounded-full"></div>
            <h3 className="text-xl font-poppins font-bold text-white tracking-tight">Visi</h3>
          </div>
          <p className="text-neutral-400 text-sm font-light leading-relaxed pl-4">
            Menjadi mitra kreatif digital terpercaya yang menghubungkan ide-ide brilian dengan eksekusi visual berkualitas tinggi, serta mendorong pertumbuhan bisnis di era digital.
          </p>
        </div>
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-[#FF5500] rounded-full"></div>
            <h3 className="text-xl font-poppins font-bold text-white tracking-tight">Misi</h3>
          </div>
          <ul className="text-neutral-400 text-sm font-light leading-relaxed pl-4 space-y-2 list-disc list-inside">
            <li>Memberikan layanan pengembangan website & software yang responsif dan berkualitas.</li>
            <li>Menghadirkan konten visual storytelling yang impactful dan berdaya jual tinggi.</li>
            <li>Membangun strategi brand yang kuat dan identitas digital yang konsisten.</li>
            <li>Terus berinovasi dan mengikuti perkembangan teknologi digital terkini.</li>
          </ul>
        </div>
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-[#FF5500] rounded-full"></div>
            <h3 className="text-xl font-poppins font-bold text-white tracking-tight">Nilai Kami</h3>
          </div>
          <div className="pl-4 space-y-3">
            <div>
              <h4 className="text-sm font-poppins font-semibold text-[#FF5500]">Kreatif & Inovatif</h4>
              <p className="text-neutral-400 text-sm font-light">Selalu mencari pendekatan baru dalam setiap karya.</p>
            </div>
            <div>
              <h4 className="text-sm font-poppins font-semibold text-[#FF5500]">Integritas & Tanggung Jawab</h4>
              <p className="text-neutral-400 text-sm font-light">Bekerja dengan komitmen dan profesionalisme tinggi.</p>
            </div>
            <div>
              <h4 className="text-sm font-poppins font-semibold text-[#FF5500]">Kolaborasi</h4>
              <p className="text-neutral-400 text-sm font-light">Membangun sinergi dengan klien untuk hasil terbaik.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== OUR MASTERMINDS - TANPA HOVER & OUTLINE RECTANGLE ===== */}
      <div>
        <div className="text-center mb-12 select-none">
          <h3 className="text-4xl font-poppins font-black tracking-tight text-white relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Our Masterminds
            </span>
            {/* Efek glow kecil dan rapi */}
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            {/* Efek glow tipis di bawah */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h3>
          <p className="text-neutral-400 font-semibold text-xs sm:text-sm mt-2">Sinergi para profesional di balik keandalan produk digital MoStu.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1150px] mx-auto">
          {team.map((member, i) => (
            <div key={i} className={`flex flex-col items-center text-center opacity-0 animate-slide-up ${member.delay}`}>
              {/* Container foto dengan glassmorphism ringan */}
              <div className="w-full aspect-4/5 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 rounded-2xl mb-4 relative flex items-end justify-center overflow-hidden border border-white/5">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
                {/* Efek glow subtle */}
                <div className="absolute -top-20 -right-20 w-32 h-32 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none" />

                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center relative z-10"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-neutral-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-darkBg via-darkBg/60 to-transparent z-20 pointer-events-none" />
              </div>

              <h4 className="font-poppins font-bold text-sm sm:text-base text-neutral-200">
                {member.name}
              </h4>
              <p className="font-mono text-neutral-500 text-[10px] sm:text-xs mt-0.5 uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      a: "Harga layanan kami bersifat fleksibel and disesuaikan dengan skala serta kompleksitas proyek Anda. Kami menyediakan paket terstruktur untuk UMKM hingga solusi kustom korporat. Hubungi kami untuk mendapatkan penawaran harga yang transparan sesuai anggaran Anda.",
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
      a: "Cukup klik tombol 'Start a Project' atau hubungi langsung via email/media sosial kami. Tim kami akan segera menjadwalkan sesi konsultasi gratis untuk menganalisis strategi kebutuhan Anda.",
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

      <div className="max-w-3xl mx-auto relative z-10 select-none">
        <ScrollAnimateWrapper qnaAnimationClass="animate-slide-down">
          <div className="text-center mb-12">
            {/* Badge - Rata Tengah (sama dengan Services) */}
            <div className="flex justify-center mb-4">
              <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
                FAQ
              </span>
            </div>

            {/* Judul Utama - ukuran sama dengan Services */}
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-2 relative inline-block">
              <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
                Pertanyaan Soal Jasa Kami
              </span>
              <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
            </h2>

            {/* Deskripsi - ukuran sama dengan Services */}
            <p className="text-neutral-300 text-[11px] sm:text-xs lg:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4 mt-2">
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
                  transition-all duration-500
                  ${openIndex === idx ? 'scale-[1.02]' : ''}
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
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-60 mt-4 border-t border-white/10 pt-4' : 'max-h-0'
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

/* ==========================================
   KOMPONEN MANDIRI: FOOTER - MODERN & PROPORSIONAL
   ========================================== */
function Footer({ setActiveTab, scrollToSection }) {
  return (
    <footer className="relative bg-black/30 backdrop-blur-sm border-t border-white/5 overflow-hidden">
      {/* Efek glow background - seperti section lain */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Grid Footer Utama - HP: 1 kolom, Desktop: KIRI & KANAN */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">

          {/* KIRI: Logo & Deskripsi - HP: tengah, Desktop: kiri */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-md mx-auto md:mx-0">
            <div
              className="cursor-pointer flex-shrink-0"
              onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img
                src={logoImg}
                alt="MoStu Logo"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            </div>
            <p className="font-chivo font-light text-[11px] sm:text-xs text-neutral-400/80 tracking-wide leading-relaxed max-w-[320px] sm:max-w-sm">
              Kami hadirkan solusi digital terintegrasi: <span className="text-[#FF5500]">pengembangan web & aplikasi</span>, <span className="text-[#FF5500]">AI automation</span>, dan <span className="text-[#FF5500]">visual branding</span> untuk mendukung pertumbuhan bisnis Anda.
            </p>
          </div>

          {/* KANAN: Hubungi Kami & Ikuti Kami - HP: 2 kolom, Desktop: gap 150px rata kanan */}
          <div className="flex flex-row gap-8 md:gap-[150px] items-start justify-center md:justify-end w-full md:w-auto">

            {/* Hubungi Kami - dengan SVG icon */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <h4 className="font-poppins font-bold text-[#FFF] tracking-wider uppercase text-[10px] sm:text-xs mb-1">
                Hubungi Kami
              </h4>
              <a
                href="mailto:mostuid@gmail.com"
                className="font-chivo font-light text-[11px] sm:text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 text-[#FF5500] group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <span>mostuid@gmail.com</span>
              </a>
              <a
                href="tel:+62882016312643"
                className="font-chivo font-light text-[11px] sm:text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 text-[#FF5500] group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.038-1.158.376l-1.54 2.03a11.25 11.25 0 01-6.641-6.641l2.03-1.54c.338-.256.486-.718.376-1.158l-1.106-4.423A1.125 1.125 0 007.372 3.75H6A2.25 2.25 0 003.75 6v.75z" />
                </svg>
                <span>+62 882-0163-12643</span>
              </a>
            </div>

            {/* Ikuti Kami - dengan SVG Instagram & TikTok */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <h4 className="font-poppins font-bold text-[#FFF] tracking-wider uppercase text-[10px] sm:text-xs mb-1">
                Ikuti Kami
              </h4>
              <div className="flex flex-col space-y-2.5 font-chivo font-light text-neutral-400">

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/mostu.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] sm:text-xs hover:text-white transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  <svg
                    className="w-4 h-4 text-[#FF5500] group-hover:text-white transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span>Instagram</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@mostu.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] sm:text-xs hover:text-white transition-colors flex items-center gap-2 cursor-pointer group"
                >
                  <svg
                    className="w-4 h-4 text-[#FF5500] group-hover:text-white transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 4.48-3.91 7.96-8.21 7.88-4.33-.08-8.03-3.92-7.82-8.32.2-4.13 3.62-7.69 7.78-7.83v4.09c-.58.03-1.17.15-1.73.38-1.24.52-2.18 1.63-2.42 2.96-.24 1.33.11 2.74.91 3.78.8 1.04 2.06 1.66 3.36 1.63 1.8-.04 3.34-1.34 3.95-3.04.35-1.1.35-2.27.35-3.41V.02h-.01z" />
                  </svg>
                  <span>TikTok</span>
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Garis dekoratif #FF5500 */}
        <div className="mt-8 pt-6 border-t border-white/5 relative">
          <div className="absolute -top-[1px] left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />

          {/* ALAMAT & COPYRIGHT - HP: center, Desktop: left & right */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px]">
            {/* Alamat dengan icon pin */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-[#FF5500]/50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-neutral-500/60 text-center md:text-left">
                Kecamatan Muara Dua, Lhokseumawe, Aceh, Indonesia
              </span>
            </div>

            {/* Copyright */}
            <span className="text-neutral-500/60 text-center md:text-right">
              &copy; {new Date().getFullYear()} MoStu Agency. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-[#FF5500]/10 rounded-full flex items-center justify-center">
          <span className="text-5xl font-bold text-[#FF5500]">404</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-neutral-400 mb-2">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <p className="text-neutral-500 text-sm">Mengalihkan ke beranda dalam 3 detik...</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#FF5500] hover:bg-[#e64a00] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

export default App;