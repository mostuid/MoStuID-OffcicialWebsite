import React, { useState, useEffect, useRef } from 'react';
import webPorto1Img from "../assets/Web-Porto1.gif";
import webPorto2Img from "../assets/Web-Porto2.gif";
import webPorto3Img from "../assets/Web-Porto3.gif";
import webPorto4Img from "../assets/Web-Porto4.gif";
import webPorto5Img from "../assets/Web-Porto5.gif";
import videoPorto1Img from "../assets/Video-Porto1.png";
import videoPorto2Img from "../assets/Video-Porto2.png";

export default function PortfolioTabSection({ currentFilter, setFilter }) {
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
    { id: "web-dev", name: "Web Development" },
    { id: "app-dev", name: "App Development" },
    { id: "ai-agent", name: "AI Automation" },
    { id: "visual-story", name: "Visual Storytelling" },
    { id: "animation", name: "Animation Services" },
    { id: "branding", name: "Branding Strategy" },
  ];

  const projects = [
    {
      title: "Gardenia Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Animasi pembelajaran dengan penyampaian visual yang jelas, ringkas, dan mudah dipahami.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "ZfPSIhIT2u0"
    },
    {
      title: "Piring Situek",
      cat: "web-dev",
      desc: "Website bisnis UMKM piring cantik yang terbuat dari pelepah pinang.",
      meta: "Web Development Project • 2026",
      link: "https://situek.com/",
      image: webPorto5Img,
    },
    {
      title: "Video Cinematic Aqiqah",
      cat: "visual-story",
      desc: "Mengabadikan momen aqiqah melalui visual sinematik yang emosional, hangat, dan penuh makna.",
      meta: "Videography Projects • 2026",
      link: null,
      image: videoPorto2Img,
      videoYoutubeId: "bVjdp2FYwoI"
    },
    {
      title: "Go Green Parallax Prototype",
      cat: "web-dev",
      desc: "Website interaktif dengan animasi parallax untuk campaign lingkungan.",
      meta: "Web Prototype • 2026",
      link: null,
      image: webPorto2Img,
      isPrototype: true,
      folderName: "prototype-gogreen"
    },
    {
      title: "HSSE Demo Room (PAG Animation)",
      cat: "animation",
      desc: "Konten animasi untuk mendukung sosialisasi standar HSSE di lingkungan operasional.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "X8ZYb5uPA-Y"
    },
    {
      title: "Terapi Kesehatan Sejati",
      cat: "web-dev",
      desc: "Website promosi layanan terapi kesehatan yang informatif dan berorientasi pada peningkatan kepercayaan pasien.",
      meta: "Web Development Project • 2026",
      link: "https://terapikesehatansejati.com/",
      image: webPorto1Img,
    },
    {
      title: "Arun Regas Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Video edukasi keselamatan yang dikembangkan untuk meningkatkan pemahaman karyawan.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "6FqccjJoNsA"
    },
    {
      title: "Video Profil Prof. Dr. drh. Farida",
      cat: "visual-story",
      desc: "Menghadirkan cerita perjalanan akademik melalui visual yang sinematik dan komunikatif.",
      meta: "Videography Projects • 2026",
      link: null,
      image: null,
      videoYoutubeId: "vSMJBn-kT_I"
    },
    {
      title: "Cut Nyak Dhien Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Media pembelajaran visual untuk mendukung penerapan budaya keselamatan di lingkungan kerja.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "Y8Hs9PiioX4"
    },
    {
      title: "Multi Purpose Building (PAG Animation)",
      cat: "animation",
      desc: "Animasi informatif yang menyampaikan prosedur keselamatan secara menarik dan mudah dipahami.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "8cEiHKGphOg"
    },
    {
      title: "Core Pack Prototype",
      cat: "web-dev",
      desc: "Website interaktif dengan animasi parallax untuk campaign bisnis packaging.",
      meta: "Web Prototype • 2026",
      link: null,
      image: webPorto3Img,
      isPrototype: true,
      folderName: "prototype-corepack"
    },
    {
      title: "Digital Product Campaign",
      cat: "visual-story",
      desc: "Video promosi produk digital dengan visual menarik, komunikatif, dan berorientasi hasil.",
      meta: "Videography Projects • 2026",
      link: null,
      image: videoPorto1Img,
      videoYoutubeId: "FbdM_EwI1pk"
    },
    {
      title: "Malahayati Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Animasi explainer yang mengedepankan pesan keselamatan kerja secara efektif dan komunikatif.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "ShAONj4T1og"
    },
    {
      title: "MoStu Airline Prototype",
      cat: "web-dev",
      desc: "Prototype landing page modern dengan animasi parallax.",
      meta: "Web Prototype • 2026",
      link: null,
      image: webPorto4Img,
      isPrototype: true,
      folderName: "prototype-airlines"
    },
    {
      title: "Teuku Umar Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Animasi edukatif untuk meningkatkan kesadaran HSSE dan budaya kerja yang aman.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "WTB_hhqREG0"
    },
    {
      title: "Video Profil Prof. Dr. Ghazali Syamni",
      cat: "visual-story",
      desc: "Video profil pengukuhan guru besar dengan mengangkat perjalanan akademik dan kontribusi keilmuan beliau.",
      meta: "Videography Projects • 2026",
      link: null,
      image: null,
      videoYoutubeId: "zFJzxtdbuok"
    },
    {
      title: "LNG Hub Meeting Room (PAG Animation)",
      cat: "animation",
      desc: "Animasi explainer sebagai media edukasi untuk memperkuat budaya keselamatan kerja.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "ADTREAXhhQA"
    },
    {
      title: "Sayap Kanan Hall (PAG Animation)",
      cat: "animation",
      desc: "Video explainer keselamatan kerja yang dirancang untuk mendukung program HSSE perusahaan.",
      meta: "HSSE Explainer Animation • PT Perta Arun Gas • 2026",
      link: null,
      image: null,
      videoYoutubeId: "DOpL-puiDAI"
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
    <div className="pt-28 md:pt-32 pb-12 min-h-[70vh] w-full relative overflow-hidden">
      {/* Efek glow background - seperti di Home */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER NAVIGASI KATEGORI - Dengan Dropdown */}
      <div className="w-[95%] max-w-[80%] mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-20">
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
          <p className="text-neutral-200 font-semibold text-sm sm:text-sm mt-2">Eksplorasi hasil karya terbaik kami.</p>
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
      <div className="w-[95%] max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
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
