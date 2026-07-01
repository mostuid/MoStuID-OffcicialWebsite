import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import founderimg from "./assets/founder.png";
import cofounderimg from "./assets/co-founder.png";
import markeximg from "./assets/marketing-executive.png";
import providimg from "./assets/professional-videgrapher.png";
import logoImg from "./assets/logo-mostu.png";
import bgSec2 from './assets/bg-sec2.png';
import webPorto1Img from "./assets/Web-Porto1.gif";
import webPorto2Img from "./assets/Web-Porto2.gif";
import animPorto1Img from "./assets/Anim-Porto1.jpg";
import videoPorto1Img from "./assets/Video-Porto1.png";

// IMPORT ASSET ICON
import iconWebSoftware from "./assets/Icon Web-Software.png";
import iconAIAgent from "./assets/Icon AI-Agent.png";
import iconVisualStorytelling from "./assets/Icon Visual Story Telling.png";
import iconBrandingStrategy from "./assets/Icon Branding Strategy.png";
import iconAnimationServices from "./assets/Icon Animation Services.png";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname; // Ini akan membaca URL browser saat ini (misal: "/" atau "/portfolio")
  const [activeTab, setActiveTab] = useState("home");
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const sec2Ref = useRef(null);

  // State kontrol untuk membuka dan menutup Modal Project Brief & Member
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // State kontrol khusus untuk membuka dan menutup Dropdown Menu Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logika 1: Sembunyikan/Munculkan Header (PC & HP)
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      // Logika 2: Tutup otomatis menu dropdown jika user melakukan scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="min-h-screen grid-bg relative overflow-x-hidden bg-darkBg text-white selection:bg-agency-orange selection:text-white">

      {/* NAVBAR HEADER: Auto-Hide on Scroll & Sticky Position (PC & HP) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-darkBg/80 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center relative">
          {/* LOGO */}
          <div className="flex items-center cursor-pointer select-none group" onClick={() => { ubahTabNavigasi("home"); setIsMobileMenuOpen(false); }}>
            <img src={logoImg} alt="MoStu Logo" className="h-9 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer" />
          </div>

          {/* NAV LINK DESKTOP */}
          <nav className="hidden md:flex items-center space-x-12 text-[13px] text-neutral-300 font-chivo font-normal uppercase tracking-widest">
            {/* PERTAMA: Services */}
            <button onClick={() => { ubahTabNavigasi("home"); setTimeout(() => scrollToSection("services-area"), 100); }} className="hover:text-white transition-colors py-1.5 cursor-pointer">
              Services
            </button>

            {/* KEDUA: Portfolio */}
            <button onClick={() => { ubahTabNavigasi("portfolio"); setPortfolioFilter("all"); }} className={`hover:text-white transition-colors relative py-1.5 cursor-pointer ${activeTab === "portfolio" ? "text-white" : ""}`}>
              Portfolio
              {activeTab === "portfolio" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-agency-orange" />}
            </button>

            {/* KETIGA: Products */}
            <button onClick={() => ubahTabNavigasi("products")} className={`hover:text-white tracking-wide transition-colors relative py-1.5 cursor-pointer ${activeTab === "products" ? "text-white" : ""}`}>
              Products
              {activeTab === "products" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-agency-orange" />}
            </button>

            {/* KEEMPAT: About Us */}
            <button onClick={() => ubahTabNavigasi("about")} className={`hover:text-white tracking-wide transition-colors relative py-1.5 cursor-pointer ${activeTab === "about" ? "text-white" : ""}`}>
              About Us
              {activeTab === "about" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-agency-orange" />}
            </button>
          </nav>

          {/* CTA MEMBER (DESKTOP ONLY) */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="bg-white text-black font-chivo font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-300 shadow-md shadow-white/5 active:scale-95 text-center cursor-pointer"
            >
              Get Member
            </button>
          </div>

          {/* TOMBOL PENGONTROL DROPDOWN MOBILE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center space-x-2 bg-neutral-900/60 border border-white/10 px-4 py-2 rounded-xl text-xs font-chivo uppercase tracking-wider text-neutral-200 hover:text-white hover:border-white/20 transition-all cursor-pointer select-none focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span>Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* DROPDOWN MENU INTERFACE: FIX LEBAR MENGIKUTI GARIS MERAH (HANYA SISI KANAN) */}
          {isMobileMenuOpen && (
            // GANTI KELAS DI SINI: left-0 dibuang, diganti left-auto w-[55vw] sm:w-[45vh] agar lebarnya proporsional di kanan
            <div className="absolute top-full right-6 left-auto w-[40vw] max-w-70 bg-neutral-950/95 backdrop-blur-lg border border-white/5 rounded-2xl px-6 py-6 flex flex-col space-y-4 md:hidden animate-slide-down shadow-2xl z-50 overflow-y-auto text-right items-end mt-2">
              <button
                onClick={() => { ubahTabNavigasi("home"); setIsMobileMenuOpen(false); setTimeout(() => scrollToSection("services-area"), 100); }}
                className="w-full text-right text-neutral-300 hover:text-white font-chivo text-xs uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => { ubahTabNavigasi("portfolio"); setPortfolioFilter("all"); setIsMobileMenuOpen(false); }}
                className={`w-full text-right font-chivo text-xs uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer ${activeTab === "portfolio" ? "text-white font-bold" : "text-neutral-300"}`}
              >
                Portfolio
              </button>
              <button
                onClick={() => { ubahTabNavigasi("products"); setIsMobileMenuOpen(false); }}
                className={`w-full text-right font-chivo text-xs uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer ${activeTab === "products" ? "text-white font-bold" : "text-neutral-300"}`}
              >
                Products
              </button>
              <button
                onClick={() => { ubahTabNavigasi("about"); setIsMobileMenuOpen(false); }}
                className={`w-full text-right font-chivo text-xs uppercase tracking-widest py-2 border-b border-white/5 cursor-pointer ${activeTab === "about" ? "text-white font-bold" : "text-neutral-300"}`}
              >
                About Us
              </button>

              {/* CTA Get Member Mobile */}
              <div className="pt-2 w-full">
                <button
                  onClick={() => { setIsMemberModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full bg-white text-black window-click font-chivo font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all duration-300 active:scale-95 text-center cursor-pointer shadow-md"
                >
                  Get Member
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* AREA KONTEN UTAMA */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 overflow-y-clip">

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

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <div className="mt-20">
                <div className="py-16 max-w-5xl mx-auto min-h-[75vh] flex flex-col justify-center animate-slide-up">
                  {/* Header Section */}
                  <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-poppins font-black mb-3 tracking-tight">
                      Our Digital Products
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                      Eksplorasi ekosistem tools digital premium kami yang dirancang khusus untuk mempercepat skalabilitas, produktivitas, dan kreativitas bisnismu.
                    </p>
                  </div>

                  {/* Grid Container untuk 4 Tools */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">

                    {/* TOOL 1: AI VOICE GENERATOR (AKTIF) - Muncul Pertama */}
                    <div className="bg-neutral-900/40 backdrop-blur-md p-6 rounded-2xl border border-neutral-850 hover:border-[#FF5500]/40 transition-all duration-500 group flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(255,85,0,0.06)] opacity-0 animate-slide-up">
                      <div>
                        {/* Icon/Badge Area */}
                        <div className="w-12 h-12 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500] mb-4 group-hover:scale-105 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                          </svg>
                        </div>
                        <h3 className="font-poppins font-bold text-lg mb-1 group-hover:text-[#FF5500] transition-colors duration-300">
                          AI Voice Generator
                        </h3>
                        <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">
                          Ubah teks menjadi suara manusia buatan AI. Voice over yang sangat realistis, natural, dan siap pakai untuk kebutuhan konten video marketing Anda.
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => window.open("https://gemini.google.com/share/aa1654ce2d36", "_blank")}
                        className="w-full mt-2 border border-neutral-800 bg-neutral-950 hover:bg-white hover:text-black hover:border-white text-neutral-300 font-chivo font-medium py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] text-center cursor-pointer shadow-md"
                      >
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

      {/* FLOATING WHATSAPP CTA BUTTON */}
      <div
        className="fixed bottom-6 right-6 z-50 animate-slide-up focus:outline-none"
        style={{ animationDelay: "0s, 0s" }}
      >
        <a
          href={`https://wa.me/62882016312643?text=${encodeURIComponent(
            "Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
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

  /* =========================================================================
     🔥 SLOT ANGGOTA BARU KUSTOM & KONFIGURASI LAYOUT CONTAINER NAMA
     ========================================================================= */
  const heroSlides = [
    {
      img: founderimg,
      name: "Bang Eija",
      role: "Founder / Lead Developer"
    },
    {
      img: cofounderimg,
      name: "Mohd. Daniel",
      role: "Co-Founder / Art Director"
    },
    {
      img: markeximg,
      name: "Mhd. Andre F",
      role: "Marketing Executive"
    },
    {
      img: providimg,
      name: "Noval Pratama",
      role: "Professional Videographer"
    }
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

  const [isMobileDevice, setIsMobileDevice] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const tanganiPerubahanLayar = () => {
      setIsMobileDevice(window.innerWidth < 1024);
    };
    window.addEventListener("resize", tanganiPerubahanLayar);
    return () => window.removeEventListener("resize", tanganiPerubahanLayar);
  }, []);

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
      const config = isMobileDevice ? SETTING_SCROLL_HP : SETTING_SCROLL_PC;
      if (currentScroll <= 5 || currentScroll <= config.mulaiPudar) {
        setMouseOpacity(1); setMouseTranslateY(0);
      } else if (currentScroll >= config.hilangTotal) {
        setMouseOpacity(0); setMouseTranslateY(config.jarakSembunyi);
      } else {
        const totalRentang = config.hilangTotal - config.mulaiPudar;
        const jarakBerjalan = currentScroll - config.mulaiPudar;
        const progress = jarakBerjalan / totalRentang;
        setMouseOpacity(Math.max(0, Math.min(1, 1 - progress)));
        const multiplierY = isMobileDevice ? 0.6 : 1.0;
        setMouseTranslateY(progress * config.jarakSembunyi * multiplierY);
      }
    };
    handleScrollMouse();
    window.addEventListener("scroll", handleScrollMouse, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMouse);
  }, [isMobileDevice]);

  return (
    <div
      // 🔥 UTAMA: px-0 di mobile dan px-4 di desktop diaktifkan penuh di sini, bray!
      className="relative flex flex-col lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen lg:h-screen pt-16 lg:pt-0 pb-0 lg:pb-0 px-0 lg:px-4"
      // 🔥 UTAMA: clipPath dilepas total di mobile (none) agar tidak memotong elemen/ornamen meluber keluar layar
      style={{ clipPath: isMobileDevice ? "none" : "inset(0px -100vw 0px -100vw)" }}
    >
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
<div className="w-full lg:col-span-8 flex flex-col justify-center pt-6 sm:pt-12 lg:pt-0 relative z-20 text-center lg:text-left px-4 lg:px-0 mt-10 sm:mt-16 lg:mt-0">
  <div className="relative mb-2 sm:mb-4">
    <p className="font-chivo font-thin text-base sm:text-2xl lg:text-[30px] text-white tracking-wide lg:absolute lg:top-[-2.3rem] lg:left-[28.3rem] z-10 whitespace-nowrap animate-slide-right select-none mb-1 lg:mb-0">
      Digital & Creative
    </p>
    <h1 className="font-poppins font-bold text-[16vw] lg:text-[170px] tracking-tight leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)] relative z-20 select-none opacity-0 animate-title-left">
      <span
        className={`block bg-clip-text text-transparent ${isShiny ? "animate-classic-shiny" : ""}`}
        style={{
          WebkitTextFillColor: "transparent",
          backgroundImage: "linear-gradient(90deg, #D7E1EA 0%, #D7E1EA 40%, #ffffff 50%, #D7E1EA 60%, #DBDEE9 100%)",
          backgroundSize: "300% 100%",
          backgroundPosition: isShiny ? "" : "0% center"
        }}
      >
        AGENCY
      </span>
    </h1>
  </div>
  <div className="font-chivo font-normal text-[10px] sm:text-sm text-white tracking-[0.12em] md:tracking-[0.22em] px-2 lg:pl-2 lg:px-0 relative z-10 select-none opacity-0 animate-slide-right [animation-delay:150ms] min-h-5 flex items-center justify-center lg:justify-start gap-1 uppercase">
    <TypewriterEffect
      services={[
        "WE BUILD PROFESSIONAL WEBSITES & SOFTWARE",
        "WE DELIVER CINEMATIC VISUAL STORYTELLING",
        "WE PRODUCE ENGAGING ANIMATIONS",
        "WE DEVELOP STRONG BRAND STRATEGIES"
      ]}
    />
  </div>
  <div className="flex items-center justify-center lg:justify-start space-x-4 pt-6 sm:pt-10 px-2 lg:pl-2 lg:px-0 opacity-0 animate-slide-up [animation-delay:0.3s]">
    <button onClick={() => setIsBriefModalOpen(true)} className="bg-white text-black window-click font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-neutral-200 transition-all active:scale-95 text-center cursor-pointer shadow-xl shadow-white/5">Start a Project</button>
    <a href={waLink} target="_blank" rel="noopener noreferrer" className="border border-neutral-700 bg-neutral-900/40 text-neutral-300 font-chivo font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm tracking-wide hover:bg-white/30 hover:text-white hover:border-white transition-all duration-300 active:scale-95 cursor-pointer text-center block">Get in Touch!</a>
  </div>

        {/* IKON MOUSE */}
        {(() => {
          const POSISI_HP = { left: "1px", bottom: "-520px" };
          const POSISI_PC = { left: "167px", top: "400px" };
          return (
            <div
              className="transition-all duration-500 ease-out"
              style={{
                // 🔥 KUNCI UTAMA: Di HP diubah ke absolute agar terikat & terpotong di dalam container Hero Section saja
                position: isMobileDevice ? "absolute" : "absolute",
                zIndex: 100,
                pointerEvents: mouseOpacity > 0 ? "auto" : "none",
                opacity: mouseOpacity,
                left: isMobileDevice ? POSISI_HP.left : POSISI_PC.left,
                bottom: isMobileDevice ? POSISI_HP.bottom : "auto",
                top: isMobileDevice ? "auto" : POSISI_PC.top,
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
        const SETTING_HP = { tinggiWadah: "550px", lebarLingkaran: "400px", lebarMaxFoto: "550px" };
        const SETTING_PC = { lebarLingkaran: "620px", lebarMaxFoto: "690px" };

        return (
          <div
            // 🔥 UTAMA: px-0 ditambahkan tegas di sini agar sisi kanan-kiri container pembungkus gambar bersih tanpa padding bawaan
            className="w-full lg:col-span-4 relative flex justify-center lg:justify-end items-end mt-auto lg:mt-0 lg:h-full lg:absolute lg:bottom-0 lg:right-0 z-10 px-0"
            style={{
              height: isMobileDevice ? SETTING_HP.tinggiWadah : "100%",
              // 🔥 UTAMA: overflow dipastikan 'visible' di mobile biar bayangan pudar foto atau sisi lingkaran jingga luar bebas mekar
              overflow: isMobileDevice ? "visible" : "visible"
            }}
          >
            {/* LINGKARAN BACKGROUND ABSOLUT STATIS */}
            <div
              className="absolute bottom-[-2%] right-auto lg:right-[-3%] bg-[#FF5500] rounded-full -z-10 shadow-[0_0_60px_rgba(255,85,0,0.25)] opacity-0 animate-slide-up [animation-delay:0.4s]"
              style={{
                width: isMobileDevice ? SETTING_HP.lebarLingkaran : SETTING_PC.lebarLingkaran,
                height: isMobileDevice ? SETTING_HP.lebarLingkaran : SETTING_PC.lebarLingkaran
              }}
            />

            {/* WRAPPER ELEMEN SLIDER FOTO */}
            <div className="relative w-full h-full flex justify-center lg:justify-end items-end px-0">
              {heroSlides.map((slide, idx) => {
                const isActive = idx === activeSlide;
                const isEvenIndex = idx % 2 === 0;

                let imgAnimClass = "opacity-0 pointer-events-none";

                if (isActive) {
                  imgAnimClass = isEvenIndex ? "slide-in-right-custom" : "slide-in-left-custom";
                } else if (hasInteracted) {
                  const wasActive = (activeSlide === 0 ? heroSlides.length - 1 : activeSlide - 1) === idx;
                  if (wasActive) {
                    imgAnimClass = isEvenIndex ? "slide-out-left-custom" : "slide-out-right-custom";
                  }
                }

                return (
                  <div
                    key={idx}
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
                        style={{ maxWidth: isMobileDevice ? SETTING_HP.lebarMaxFoto : SETTING_PC.lebarMaxFoto }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CONTAINER TRANSPARAN PAPAN NAMA */}
            <div
              className="absolute z-30 flex flex-col justify-center items-center text-left select-none bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl shadow-2xl"
              style={{
                left: isMobileDevice ? textContainerConfig.hpLeft : textContainerConfig.pcLeft,
                bottom: isMobileDevice ? textContainerConfig.hpBottom : textContainerConfig.pcBottom,
                minWidth: isMobileDevice ? textContainerConfig.hpMinWidth : textContainerConfig.pcMinWidth,
                minHeight: isMobileDevice ? textContainerConfig.hpMinHeight : textContainerConfig.pcMinHeight,
                padding: isMobileDevice ? textContainerConfig.hpPadding : textContainerConfig.pcPadding,
                transform: isMobileDevice && textContainerConfig.hpLeft === "50%" ? "translateX(-50%)" : "none"
              }}
            >
              <h2 className="font-poppins font-bold text-lg sm:text-2xl text-white tracking-tight drop-shadow-md min-h-7 sm:min-h-9 flex items-center">
                <span className={displayName && displayName.length < heroSlides[activeSlide].name.length ? "typewriter-cursor" : ""}>
                  {displayName}
                </span>
              </h2>
              <p className="font-mono text-[#FF5500] text-[10px] sm:text-xs uppercase tracking-wider font-semibold mt-0.5 drop-shadow-sm min-h-4 flex items-center">
                <span className={displayRole ? "typewriter-cursor" : ""}>
                  {displayRole}
                </span>
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-linear-to-t from-darkBg via-darkBg/60 to-transparent z-20 pointer-events-none" />
          </div>
        );
      })()}

    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: SECTION 2 (SERVICES CONTAINER)
   ========================================== */
function ServicesSection({ sec2Ref, isSec2Visible, setActiveTab }) {
  const servicesData = [
    {
      id: "web-dev",
      title: "Web/Software Developing",
      icon: <img src={iconWebSoftware} alt="Web Software Icon" className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110" />,
      animDelay: ""
    },
    {
      id: "ai-agent",
      title: "AI Automation",
      icon: <img src={iconAIAgent} alt="AI Agent Icon" className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110" />,
      animDelay: ""
    },
    {
      id: "visual-story",
      title: "Visual Storytelling",
      icon: <img src={iconVisualStorytelling} alt="Visual Story Telling Icon" className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110" />,
      animDelay: "[animation-delay:100ms]"
    },
    {
      id: "animation",
      title: "Animation Services",
      icon: <img src={iconAnimationServices} alt="Animation Services Icon" className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110" />,
      animDelay: "[animation-delay:200ms]"
    },
    {
      id: "branding",
      title: "Branding Strategy",
      icon: <img src={iconBrandingStrategy} alt="Branding Strategy Icon" className="w-32 h-32 object-contain transition-transform duration-500 group-hover:scale-110" />,
      animDelay: "[animation-delay:300ms]"
    }
  ];

  const handleServiceClick = (serviceId) => {
    localStorage.setItem("selected_portfolio_category", serviceId);
    setActiveTab("portfolio");
  };

  return (
    <section id="services-area" ref={sec2Ref} className="relative h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${bgSec2})` }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#FF5500] via-[#FF5500]/35 to-transparent pointer-events-none z-0" />

      {/* SINKRONISASI INTERSECTION OBSERVER */}
      <div className={`max-w-5xl mx-auto w-full relative z-10 text-center select-none ${isSec2Visible ? 'animate-slide-down' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <p className="font-chivo font-thin text-sm text-white tracking-widest uppercase mb-2">Layanan Kami</p>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">Solusi kreatif & digital untuk bisnis Anda.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`
        bg-white/30 backdrop-blur-md px-5 sm:px-6 py-4 sm:py-6 rounded-xl border border-white/50
        flex items-center justify-between
        transition-all duration-500
        hover:bg-white/60 hover:-translate-y-1
        hover:shadow-[0_15px_30px_rgba(255,85,0,0.08)]
        cursor-pointer group opacity-0
        ${index === servicesData.length - 1 ? 'md:col-span-2 md:max-w-[50%] md:mx-auto' : ''}
        ${isSec2Visible ? 'animate-slide-up ' + service.animDelay : ''}
      `}
            >
              <div className="flex items-center space-x-4 sm:space-x-6 text-left w-full">
                <div className="flex justify-center items-center shrink-0 bg-transparent w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                  {service.icon}
                </div>

                <h3 className="font-poppins font-semibold text-sm sm:text-base md:text-lg text-neutral-200 group-hover:text-white transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
              </div>

              <div className="flex items-center space-x-1 text-xs font-mono font-bold text-neutral-400 group-hover:text-black transition-colors duration-300 pl-2 sm:pl-4 shrink-0">
                <span className="hidden lg:inline opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  View <br /> Project
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          ))}
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
   KOMPONEN MANDIRI: TAB PORTFOLIO + MODAL YOUTUBE
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
    { id: "ai-agent", name: "AI Automation" },
    { id: "visual-story", name: "Visual Storytelling" },
    { id: "animation", name: "Animation Services" },
    { id: "branding", name: "Branding Strategy" },
  ];

  const projects = [
    {
      title: "Terapi Kesehatan Sejati",
      cat: "web-dev",
      desc: "Website promosi layanan terapi kesehatan yang informatif dan berorientasi pada peningkatan kepercayaan pasien.",
      meta: "Web Development Project &bull; 2026",
      delay: "",
      link: "https://terapikesehatansejati.netlify.app/",
      image: webPorto1Img,
      videoYoutubeId: null
    },
    {
      title: "Go Green Parallax Website",
      cat: "web-dev",
      desc: "Website prototype buatan MoStu Agency untuk client yang tertarik memiliki website dengan desain dan animasi yang menarik.",
      meta: "Web Development Prototype &bull; 2026",
      delay: "",
      link: "https://go-green-paralax.vercel.app/",
      image: webPorto2Img,
      videoYoutubeId: null
    },
    {
      title: "Digital Product Campaign",
      cat: "visual-story",
      desc: "Video promosi produk digital dengan visual menarik, komunikatif, dan berorientasi hasil.",
      meta: "Videography Projects &bull; 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: videoPorto1Img,
      videoYoutubeId: "FbdM_EwI1pk"
    },
    {
      title: "Video Profil Prof. Dr. Ghazali Syamni",
      cat: "visual-story",
      desc: "Video profil pengukuhan guru besar dengan mengangkat mengangkat perjalanan akademik, kontribusi keilmuan beliau.",
      meta: "Videography Projects &bull; 2026",
      delay: "[animation-delay:300ms]",
      link: null,
      image: null,
      videoYoutubeId: "zFJzxtdbuok"
    },
    {
      title: "PT Perta Arun Gas Animation",
      cat: "animation",
      desc: "Visual edukatif untuk meningkatkan kesadaran keselamatan dan budaya kerja.",
      meta: "Animation Project &bull; 2026",
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
      {/* HEADER NAVIGASI KATEGORI - Dengan Dropdown */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-20">
        {/* Sub Judul - Di mobile rata tengah, di desktop rata kiri */}
        <div className="animate-slide-down text-center md:text-left">
          <h2 className="text-4xl font-black tracking-tight mb-2 font-poppins">Portofolio Kami</h2>
          <p className="text-neutral-400 max-w-xl font-light text-sm mx-auto md:mx-0">Silahkan eksplorasi karya terbaik pilihan kami.</p>
        </div>

        {/* Dropdown Kategori - Di sebelah kanan */}
        <div className="relative self-center md:self-end animate-slide-left mx-auto md:mx-0 md:ml-10" ref={dropdownRef}>
          {/* Label di atas dropdown - di desktop rata kiri, di mobile rata tengah */}
          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5 text-center md:text-left md:ml-5">
            Projects Categories
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

      {/* GRID DAFTAR PORTOFOLIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {filteredProjects.map((project, i) => (
          <div
            key={i}
            onClick={(e) => handleCardClick(e, project)}
            className={`bg-neutral-900/40 backdrop-blur-md p-6 rounded-xl border border-neutral-850 hover:border-[#FF5500]/40 transition-all duration-500 group flex flex-col justify-between opacity-0 animate-slide-up ${project.delay} ${project.link || project.videoYoutubeId ? 'hover:shadow-[0_12px_24px_rgba(255,85,0,0.06)] cursor-pointer' : ''}`}
          >
            <div>
              {/* AREA PREVIEW GAMBAR ATAU MOCKUP */}
              <div className="h-44 bg-neutral-950 rounded-lg mb-4 border border-neutral-850 flex items-center justify-center overflow-hidden relative">
                {project.image ? (
                  <div className="w-full h-full relative flex items-center justify-center">
                    {/* CEK APAPUN JIKA FILE ADALAH FORMAT MP4 LOKAL */}
                    {typeof project.image === 'string' && project.image.endsWith('.mp4') ? (
                      <video
                        src={project.image}
                        className="w-full h-full object-cover opacity-100"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-100"
                      />
                    )}

                    {/* Jika item ini merupakan penunjuk video YouTube, berikan tombol Play statis di tengahnya */}
                    {project.videoYoutubeId && (
                      <div className="absolute p-3 rounded-full bg-black/60 border border-white/20 text-white group-hover:scale-110 transition-transform duration-300 pointer-events-none z-30">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ) : project.videoYoutubeId ? (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${project.videoYoutubeId}/hqdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-100"
                    />
                    <div className="absolute p-3 rounded-full bg-black/60 border border-white/20 text-white group-hover:scale-110 transition-transform duration-300 pointer-events-none z-30">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-neutral-950 to-neutral-900/40" />
                )}
              </div>

              <h3 className="font-poppins font-bold text-lg mb-1 group-hover:text-[#FF5500] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">{project.desc}</p>
            </div>
            <p className="text-neutral-500 text-[11px] font-mono" dangerouslySetInnerHTML={{ __html: project.meta }} />
          </div>
        ))}
      </div>

      {/* POP-UP LIGHTBOX MODAL PENAYANG YOUTUBE */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
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
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: TAB ABOUT US
   ==========================================  */
function AboutTabSection() {
  // SEGMEN TIM DIKEMBALIKAN SESUAI REQUEST-MU
  const team = [
    { role: "Founder / Lead Developer", name: "Mhd. Reza Erdiansyah", image: founderimg, delay: "" },
    { role: "Co-Founder / Art Director", name: "Mohd. Daniel", image: cofounderimg, delay: "[animation-delay:100ms]" },
    { role: "Marketing Executive", name: "Mhd. Andre Fahairahi", image: markeximg, delay: "[animation-delay:200ms]" },
    { role: "Provessional Videographer", name: "Noval Pratama", image: providimg, delay: "[animation-delay:300ms]" }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto space-y-20 animate-slide-up">

      {/* ==========================================
   TENTANG PERUSAHAAN (MENGGUNAKAN BG-SEC2.PNG) + TIMELINE
   ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch select-none">
        <div className="md:col-span-7 space-y-0 text-left relative">
          {/* Judul About MoStu - Rata kiri tanpa garis */}
          <h2 className="text-4xl font-poppins font-black tracking-tight text-white mb-6">
            About MoStu
          </h2>

          {/* Garis Vertikal Timeline - dimulai dari setelah judul */}
          <div className="absolute left-0 top-13 bottom-0 w-0.5 bg-[#FF5500]/30 rounded-full"></div>

          {/* Paragraf 1 */}
          <div className="relative pl-6 pb-6">
            <div className="absolute left-0 top-2 w-3 h-3 bg-[#FF5500]/60 rounded-full border-2 border-[#FF5500] -ml-1.75"></div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              MoStu (Mostanir Studios) berawal pada tahun 2024 sebagai layanan Agency yang bergerak di bidang animasi, foto & videografi, pengembangan website, dan visualisasi 3D.
            </p>
          </div>

          {/* Paragraf 2 */}
          <div className="relative pl-6 pb-6">
            <div className="absolute left-0 top-2 w-3 h-3 bg-[#FF5500]/60 rounded-full border-2 border-[#FF5500] -ml-1.75"></div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Ide ini lahir dari sebuah meja warkop, ditemani segelas kopi pancung khas Aceh dan obrolan panjang tentang mimpi, kreativitas, serta harapan untuk membangun sesuatu yang bermanfaat. Hingga hari ini, Mostanir Studios masih dalam proses bertumbuh dan belajar.
            </p>
          </div>

          {/* Paragraf 3 */}
          <div className="relative pl-6 pb-6">
            <div className="absolute left-0 top-2 w-3 h-3 bg-[#FF5500]/60 rounded-full border-2 border-[#FF5500] -ml-1.75"></div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Kami memang bukan tim besar, bahkan belum memiliki perjalanan yang begitu panjang. Namun kami percaya, bahwa setiap karya yang dikerjakan dengan sungguh-sungguh akan menemukan jalannya sendiri.
            </p>
          </div>

          {/* Paragraf 4 */}
          <div className="relative pl-6 pb-6">
            <div className="absolute left-0 top-2 w-3 h-3 bg-[#FF5500]/60 rounded-full border-2 border-[#FF5500] -ml-1.75"></div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Dari proyek ke proyek, kami terus mengembangkan kemampuan, memperluas pengalaman, dan berusaha memberikan hasil terbaik bagi setiap klien yang mempercayakan kebutuhannya kepada kami, dengan penuh tanggung jawab.
            </p>
          </div>

          {/* Paragraf 5 (terakhir) */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-2 w-3 h-3 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-1.75 shadow-lg shadow-[#FF5500]/30"></div>
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              Perjalanan ini masih panjang, dan kami memilih untuk terus belajar, berkarya, serta bertumbuh bersama setiap kepercayaan yang Anda berikan.
            </p>
          </div>
        </div>

        {/* WADAH FOTO PROFIL PERUSAHAAN - Tinggi menyesuaikan dengan konten kiri */}
        <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-neutral-850 flex items-center justify-center bg-neutral-900 h-full min-h-75">
          <img
            src={bgSec2}
            alt="MoStu Corporate Visual"
            className="w-full h-full object-cover object-center opacity-80 absolute inset-0"
          />
          {/* Efek Overlay Teks Elegan di Atas Gambar */}
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

      {/* ==========================================
   TOMBOL DOWNLOAD COMPANY PROFILE
   ========================================== */}
      <div className="flex justify-center border-t border-neutral-900/60">
        <a
          href="https://drive.google.com/file/d/18ZAaMazo9MeIC_VigtfQl1wHEcIoZ_uw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF5500] hover:bg-[#e64a00] text-white font-poppins font-semibold px-8 py-4 rounded-xl text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#FF5500]/20 hover:shadow-[#FF5500]/40 cursor-pointer"
        >
          {/* Icon PDF */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span>Lihat Company Profile (G-Drive) </span>
          {/* Icon Arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.5L21 12m0 0l-7.5 5.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* ==========================================
   PROFILE COMPANY (VISI, MISI, NILAI)
   ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start select-none py-8 border-t border-neutral-900/60">

        {/* Visi */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-[#FF5500] rounded-full"></div>
            <h3 className="text-xl font-poppins font-bold text-white tracking-tight">Visi</h3>
          </div>
          <p className="text-neutral-400 text-sm font-light leading-relaxed pl-4">
            Menjadi mitra kreatif digital terpercaya yang menghubungkan ide-ide brilian dengan eksekusi visual berkualitas tinggi, serta mendorong pertumbuhan bisnis di era digital.
          </p>
        </div>

        {/* Misi */}
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

        {/* Nilai / Value */}
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

      {/* ==========================================
         SEGMEN TIM MASTERMINDS
         ========================================== */}
      <div>
        {/* FIX UKURAN JUDUL: Disamakan text-4xl font-black agar seimbang dengan About MoStu */}
        <div className="text-left mb-12 select-none">
          <h3 className="text-4xl font-poppins font-black tracking-tight text-white">Our Masterminds</h3>
          <p className="text-neutral-400 font-light text-xs sm:text-sm mt-2">Sinergi para profesional di balik keandalan produk digital MoStu.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className={`flex flex-col items-center text-center group opacity-0 animate-slide-up ${member.delay}`}>

              {/* BOX CONTAINER FOTO */}
              <div className="w-full aspect-4/5 bg-linear-to-t from-neutral-900/60 to-transparent border border-neutral-850/40 rounded-2xl mb-4 relative flex items-end justify-center overflow-hidden transition-all duration-700 group-hover:border-[#FF5500]/30 group-hover:shadow-[0_15px_30px_rgba(255,85,0,0.04)]">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-neutral-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-darkBg via-darkBg/60 to-transparent z-20 pointer-events-none" />
              </div>

              <h4 className="font-poppins font-bold text-sm sm:text-base text-neutral-200 group-hover:text-[#FF5500] transition-colors duration-300">{member.name}</h4>
              <p className="font-mono text-neutral-500 text-[10px] sm:text-xs mt-0.5 uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: SECTION 3 (QnA CONTAINER)
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

  return (
    <section id="qna-area" className="relative py-24 px-6 md:px-12 grid-bg bg-darkBg overflow-hidden border-t border-neutral-900">
      <div className="max-w-3xl mx-auto relative z-10 select-none">

        <ScrollAnimateWrapper qnaAnimationClass="animate-slide-down">
          <div className="text-center mb-16">
            <p className="font-chivo font-thin text-sm text-neutral-400 tracking-widest uppercase mb-2">Pertanyaan Umum</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">Pertanyaan Soal Jasa Kami</h2>
          </div>
        </ScrollAnimateWrapper>

        <div className="space-y-4">
          {qnaData.map((item, idx) => (
            <ScrollAnimateWrapper key={idx} qnaAnimationClass={item.animClass}>
              <div
                className="bg-[#FF5500] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{ ...item.delayStyle }}
              >
                <div className="w-full p-5 text-left flex justify-between items-center font-poppins font-semibold text-sm sm:text-base text-white gap-4 cursor-default">
                  <span>{item.q}</span>
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className={`w-7 h-7 border border-white/40 rounded-full flex items-center justify-center text-lg text-white/80 font-bold cursor-pointer transition-all duration-300 focus:outline-none shrink-0 ${openIndex === idx ? 'rotate-45 bg-[#FF5500] text-white border-white' : 'hover:bg-white/10 hover:text-white hover:border-white'}`}
                  >
                    +
                  </button>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-40 border-t border-neutral-100' : 'max-h-0'}`}>
                  <p className="p-5 font-poppins font-normal text-xs sm:text-sm text-neutral-600 leading-relaxed bg-neutral-50">{item.a}</p>
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
   KOMPONEN MANDIRI: FOOTER
   ========================================== */
function Footer({ setActiveTab, scrollToSection }) {
  return (
    <footer className="bg-black/40 border-t border-neutral-900 py-16 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 select-none">
        <div className="md:col-span-5 flex flex-col items-start space-y-4">
          <div className="cursor-pointer" onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src={logoImg} alt="MoStu Logo" className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 cursor-pointer" />
          </div>
          <p className="font-chivo font-thin text-xs sm:text-sm text-neutral-400 tracking-wide max-w-sm leading-relaxed">Menghadirkan solusi digital tangguh dengan eksekusi visual yang presisi. Kami membantu mentransformasikan ide kreatif menjadi identitas digital yang berdaya saing tinggi.</p>
        </div>

        <div className="md:col-span-4 flex flex-col space-y-3 text-xs sm:text-sm">
          <h4 className="font-poppins font-bold text-#FF5500 tracking-wide uppercase text-xs text-[#FF5500]">Hubungi Kami</h4>
          <p className="font-poppins font-normal text-neutral-400 leading-relaxed">Kecamatan Muara Dua, Lhokseumawe,<br />Aceh, Indonesia.</p>
          <a
            href="mailto:mostuid@gmail.com"
            className="font-chivo font-normal text-neutral-300 hover:text-white transition-colors cursor-pointer block"
          >
            📧 mostuid@gmail.com <br /> ☎︎ +62 882-0163-12643
          </a>
        </div>

        <div className="md:col-span-3 flex flex-col space-y-4">
          <h4 className="font-poppins font-bold text-#fff tracking-wide uppercase text-xs text-[#FF5500]">Ikuti Kami</h4>
          <div className="flex flex-col space-y-2 text-xs sm:text-sm font-chivo font-light text-neutral-400">
            <a href="https://www.instagram.com/mostu.id/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer"><span>Instagram</span></a>
            <a href="https://www.tiktok.com/@mostu.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2 cursor-pointer"><span>TikTok</span></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900/60 text-center text-[10px] sm:text-xs font-chivo font-thin text-neutral-500 select-none">
        &copy; {new Date().getFullYear()} MoStu Agency. All rights reserved.
      </div>
    </footer>
  );
}

export default App;