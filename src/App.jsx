import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Home from "./pages/Home";
import AboutTabSection from "./pages/About";
import PortfolioTabSection from "./pages/Portfolio";
import { CoursesTabSection, CourseDetailSection } from "./pages/Courses";
import { AppsTabSection } from "./pages/Apps";
import { ProductsTabSection } from "./pages/Products";
import { ToolsTabSection } from "./pages/Tools";
import waLogo from "./assets/waLogo.png";
import logoImg from "./assets/logo-mostu.png";

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
        title="Figma Prototype"
      />
      {/* Tombol kembali yang elegan */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[10000] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/80 hover:bg-[#FF5500] text-white rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg group"
        title="Kembali"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}

function App() {
  // ==========================================
  // STATE & HOOKS
  // ==========================================
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [splashComplete, setSplashComplete] = useState(true);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('splash_shown');
    if (hasShownSplash) {
      setSplashComplete(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setSplashComplete(true);
    sessionStorage.setItem('splash_shown', 'true');
  };

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

  // State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuClosing(false);
      }, 280);
    } else {
      setIsMobileMenuOpen(true);
      setIsMenuClosing(false);
    }
  };

  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [isShiny, setIsShiny] = useState(false);
  const [mouseOpacity, setMouseOpacity] = useState(1);

  useEffect(() => {
    const handleScrollMouse = () => {
      const currentScroll = window.scrollY;
      if (currentScroll === 0) {
        setMouseOpacity(1);
      } else {
        const newOpacity = Math.max(0, 1 - currentScroll / 150);
        setMouseOpacity(newOpacity);
      }
    };
    window.addEventListener("scroll", handleScrollMouse, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMouse);
  }, []);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleCloseDropdown = () => {
      toggleMenu();
    };
    window.addEventListener("scroll", handleCloseDropdown, { passive: true });
    return () => window.removeEventListener("scroll", handleCloseDropdown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageAktif = params.get("page");
    if (pageAktif && pageAktif !== "home") {
      setActiveTab(pageAktif);
    }
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }, 50);
  }, []);

  // ✅ PERBAIKAN UTAMA: Fungsi navigasi yang lebih robust
  const ubahTabNavigasi = (tabBaru) => {
    console.log("🔵 Navigasi ke:", tabBaru); // Debugging

    // Set active tab
    setActiveTab(tabBaru);

    // Navigasi berdasarkan tab
    if (tabBaru === "home") {
      navigate("/", { replace: false });
    } else {
      navigate("/" + tabBaru, { replace: false });
    }

    // Scroll ke atas
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    // Tutup menu mobile jika terbuka
    if (isMobileMenuOpen) {
      toggleMenu();
    }
  };

  // ✅ PERBAIKAN: useEffect untuk sync URL dengan state
  useEffect(() => {
    const currentTab = location.pathname.replace('/', '') || 'home';
    if (currentTab !== activeTab && currentTab !== '') {
      setActiveTab(currentTab);
    }
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageAktif = params.get("page") || "home";
    if (!window.history.state) {
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

  const isPrototypePage = location.pathname.includes('/portfolio/prototype-');

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
        <div className="fixed bottom-6 right-6 z-[10000]">
          <a
            href={`https://wa.me/6285111401924?text=${encodeURIComponent("Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda.")}`}
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

  return (
    <div className="min-h-screen grid-bg relative overflow-x-hidden bg-darkBg text-white selection:bg-agency-orange selection:text-white">
      {/* !splashComplete && <SplashScreen onComplete={handleSplashComplete} /> */}

      {splashComplete && (
        <>
          {isPrototypePage ? (
            <Routes>
              <Route path="/portfolio/prototype-airlines" element={<PrototypeRedirect />} />
              <Route path="/portfolio/prototype-gogreen" element={<PrototypeRedirect />} />
              <Route path="/portfolio/prototype-corepack" element={<PrototypeRedirect />} />
            </Routes>
          ) : (
            <>
              {/* NAVBAR HEADER */}
              <header
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-[100px] transition-all duration-500 w-[95%] max-w-[80%] ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"
                  }`}
              >
                <div className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#FF5500]/5 via-white/5 to-[#FF5500]/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(255,85,0,0.08)] overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF5500]/10 rounded-full blur-3xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#FF5500]/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
                </div>

                <div className="relative px-6 md:px-8 py-3 flex justify-between items-center">
                  {/* LOGO */}
                  <div
                    className="flex items-center cursor-pointer select-none group"
                    onClick={() => {
                      ubahTabNavigasi("home");
                    }}
                  >
                    <img src={logoImg} alt="MoStu Logo" className="h-7 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer" />
                  </div>

                  {/* NAV LINK DESKTOP */}
                  <nav className="hidden md:flex items-center space-x-10 text-sm text-neutral-300 font-chivo font-normal uppercase tracking-widest">
                    <button
                      onClick={() => {
                        ubahTabNavigasi("portfolio");
                        setPortfolioFilter("all");
                      }}
                      className={`hover:text-[#FF5500] transition-colors relative py-1.5 cursor-pointer group ${activeTab === "portfolio" ? "text-[#FF5500]" : "text-neutral-300"}`}
                    >
                      Portfolio
                      <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "portfolio" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                    </button>
                    <button onClick={() => ubahTabNavigasi("products")} className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "products" ? "text-[#FF5500]" : "text-neutral-300"}`}>Products<span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "products" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /></button><button onClick={() => ubahTabNavigasi("tools")} className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "tools" ? "text-[#FF5500]" : "text-neutral-300"}`}>Tools<span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "tools" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /></button><button onClick={() => ubahTabNavigasi("apps")} className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "apps" ? "text-[#FF5500]" : "text-neutral-300"}`}>Apps<span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "apps" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /></button>
                    <button
                      onClick={() => ubahTabNavigasi("about")}
                      className={`hover:text-[#FF5500] tracking-wide transition-colors relative py-1.5 cursor-pointer group ${activeTab === "about" ? "text-[#FF5500]" : "text-neutral-300"}`}
                    >
                      About
                      <span className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FF5500] transition-all duration-300 rounded-full ${activeTab === "about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                    </button>
                  </nav>

                  {/* ✅ PERBAIKAN: CTA COURSES dengan handler langsung */}
                  <div className="hidden md:block">
                    <button
                      onClick={() => {
                        console.log("🟢 Tombol Courses diklik!");
                        ubahTabNavigasi("courses");
                      }}
                      className="bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold px-5 py-2 rounded-full text-sm tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.3)] transition-all duration-300 shadow-md active:scale-95 text-center cursor-pointer"
                    >
                      Courses
                    </button>
                  </div>

                  {/* TOMBOL MOBILE */}
                  <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col items-center justify-center gap-[6px] w-8 h-8 bg-transparent border-none cursor-pointer select-none focus:outline-none relative"
                    aria-label="Toggle Menu"
                  >
                    <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen
                      ? 'w-6 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                      : 'w-4'
                      }`} />
                    <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen
                      ? 'w-6 -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                      : 'w-6'
                      }`} />
                    <span className={`block h-[2.5px] bg-[#FF5500] rounded-full ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'
                      }`} />
                  </button>

                  {/* DROPDOWN MENU - Dengan wrapper */}
                  {(isMobileMenuOpen || isMenuClosing) && (
                    <div className="absolute top-full left-0 right-0 md:hidden mt-3">
                      <div className={`w-full max-w-70 mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl px-5 py-5 flex flex-col space-y-3 shadow-2xl z-50 overflow-visible text-center items-center ${isMenuClosing ? 'dropdown-out' : 'dropdown-in'
                        }`}>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF5500]/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5500]/5 rounded-full blur-2xl pointer-events-none" />

                        <button
                          onClick={() => {
                            ubahTabNavigasi("portfolio");
                            setPortfolioFilter("all");
                          }}
                          className={`w-full text-center font-chivo text-sm tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "portfolio" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                        >
                          Portfolio
                        </button>
                        <button onClick={() => { ubahTabNavigasi("products"); }} className={`w-full text-center font-chivo text-sm tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "products" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}>Products</button><button onClick={() => { ubahTabNavigasi("tools"); }} className={`w-full text-center font-chivo text-sm tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "tools" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}>Tools</button><button onClick={() => { ubahTabNavigasi("apps"); }} className={`w-full text-center font-chivo text-sm tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "apps" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}>Apps</button>
                        <button
                          onClick={() => { ubahTabNavigasi("about"); }}
                          className={`w-full text-center font-chivo text-sm tracking-widest py-2 border-b border-white/5 cursor-pointer transition-colors ${activeTab === "about" ? "text-[#FF5500] font-bold" : "text-neutral-300 hover:text-[#FF5500]"}`}
                        >
                          About
                        </button>

                        <div className="pt-1 w-full">
                          <button
                            onClick={() => {
                              console.log("🟢 Mobile Courses diklik!");
                              ubahTabNavigasi("courses");
                            }}
                            className="w-full bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold py-2 rounded-xl text-sm tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300 active:scale-95 text-center cursor-pointer"
                          >
                            Courses
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </header>

              {/* AREA KONTEN UTAMA */}
              <main className="relative z-10 w-full">
                <Routes>
                  <Route path="/" element={<Home scrollToSection={scrollToSection} setActiveTab={ubahTabNavigasi} />} />
                  <Route path="/portfolio" element={<PortfolioTabSection currentFilter={portfolioFilter} setFilter={setPortfolioFilter} setActiveTab={ubahTabNavigasi} />} />
                  <Route path="/courses" element={<CoursesTabSection setActiveTab={ubahTabNavigasi} />} />
                  <Route path="/courses/:slug" element={<CourseDetailSection setActiveTab={ubahTabNavigasi} />} />
                  <Route path="/portfolio/prototype-airlines" element={<PrototypeRedirect />} />
                  <Route path="/portfolio/prototype-gogreen" element={<PrototypeRedirect />} />
                  <Route path="/products" element={<ProductsTabSection />} />
                  <Route path="/tools" element={<ToolsTabSection />} />
                  <Route path="/apps" element={<AppsTabSection />} />
                  <Route path="/about" element={<AboutTabSection />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>



              {/* FOOTER */}
              <Footer setActiveTab={ubahTabNavigasi} scrollToSection={scrollToSection} />

              {/* WHATSAPP FLOATING BUTTON */}
              <div
                className="fixed z-50 animate-slide-up focus:outline-none group"
                style={{
                  animationDelay: "0s, 0s",
                  bottom: isMobile ? '16px' : '24px',
                  right: isMobile ? '8px' : '24px',
                }}
              >
                <div className="relative">
                  <div className={`absolute right-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap ${isMobile ? 'mr-[12px]' : 'mr-[20px]'
                    }`}>
                    <span className={`bg-white text-black font-chivo font-semibold rounded-lg border border-gray-200 shadow-lg shadow-black/10 relative ${isMobile
                      ? 'text-[10px] px-2.5 py-1.5'
                      : 'text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5'
                      }`}>
                      Get in Touch!
                      <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-white"></div>
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/6285111401924?text=${encodeURIComponent(
                      "Halo MoStu.ID, saya ingin berkonsultasi mengenai layanan agensi digital Anda."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat via WhatsApp"
                    className={`flex items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:scale-110 active:scale-95 group relative ${isMobile ? 'w-[86px] h-[86px]' : 'w-[110px] h-[110px]'
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
        </>
      )}
    </div>
  );
}


function Footer({ setActiveTab, scrollToSection }) {
  return (
    <footer className="w-full bg-black/90 py-12 px-6 border-t border-white/5 relative z-10">
      <div className="w-[95%] max-w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div
            className="flex items-end gap-3 cursor-pointer"
            onClick={() => {
              setActiveTab("home");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
          >
            <div className="h-12 flex items-center justify-center">
              <img src={logoImg} alt="MoStu Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col items-start justify-end translate-y-[2px]">
              <span className="font-mono text-[10px] sm:text-xs text-white uppercase tracking-widest mb-0.5">Digital &</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#FF5500] uppercase tracking-widest">Creative Agency</span>
            </div>
          </div>
          <p className="text-neutral-500 text-xs font-light max-w-sm leading-relaxed">
            Mitra agensi digital Anda untuk web, app, branding, dan automasi cerdas. Mari berkembang bersama.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 text-xs font-chivo tracking-widest text-neutral-500">
          <div className="flex gap-6 uppercase">
            <button onClick={() => { setActiveTab("home"); setTimeout(() => scrollToSection("services-area"), 100); }} className="hover:text-[#FF5500] transition-colors cursor-pointer">Services</button>
            <button onClick={() => { setActiveTab("portfolio"); window.scrollTo(0, 0); }} className="hover:text-[#FF5500] transition-colors cursor-pointer">Portfolio</button>
            <button onClick={() => { setActiveTab("about"); window.scrollTo(0, 0); }} className="hover:text-[#FF5500] transition-colors cursor-pointer">About Us</button>
          </div>
          <p className="opacity-50 text-center md:text-right">
            © 2024-2026 MoStu.ID. <br className="block md:hidden" />
            All rights reserved.
          </p>
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
