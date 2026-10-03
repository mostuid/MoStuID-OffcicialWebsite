import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import kelasNgonten from "../assets/kelasNgonten.png";
import underDev from "../assets/underDev.png";

/* ==========================================
   DATA KELAS ONLINE - SUMBER TUNGGAL UNTUK COURSES
   ========================================== */
export const coursesData = [
  {
    slug: "ngonten",
    title: "Kelas Ngonten",
    status: "ready",
    year: 2026, // Tambahkan tahun
    shortDesc: "Bikin konten media sosial yang bikin orang berhenti scroll.",
    thumbnail: kelasNgonten,
    trailerId: "Cpi1BIsR-xI",
    trailerThumbnail: "https://img.youtube.com/vi/Cpi1BIsR-xI/maxresdefault.jpg",
    hero: {
      eyebrow: "Kelas Ngonten",
      headline: "Belajar Bikin Konten Menarik Untuk Branding Kamu",
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
    status: "later",
    year: 2026,
    shortDesc: "Bangun website sendiri dari nol sampai online, tanpa harus jago coding dulu.",
    thumbnail: null,
    trailerId: null,
    trailerThumbnail: underDev,
    hero: {
      eyebrow: "Kelas Web Development",
      headline: "Punya ide bisnis atau portofolio? Saatnya kamu yang bikin website-nya sendiri!",
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
    ctaText: "Daftar Kelas Web Development",
    waMessage: "Halo MoStu.ID, saya tertarik untuk ikut Kelas Web Development. Boleh info jadwal dan detail pendaftarannya?"
  },
  {
    slug: "app-development",
    title: "Kelas Bikin Aplikasi",
    status: "later",
    year: 2026,
    shortDesc: "Wujudkan ide aplikasi impianmu jadi aplikasi yang benar-benar bisa dipakai.",
    thumbnail: null,
    trailerId: null,
    trailerThumbnail: underDev,
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
    year: 2027,
    shortDesc: "Otomatisasi workflow bisnis pakai n8n, tanpa perlu jadi programmer.",
    thumbnail: null
  },
  {
    slug: "animasi",
    title: "Kelas Bikin Animasi",
    status: "later",
    year: 2027,
    shortDesc: "Animasi 2D/3D untuk motion graphics dan explainer video.",
    thumbnail: null
  },
  {
    slug: "videografi-fotografi",
    title: "Kelas Videografi/Fotografi",
    status: "later",
    year: 2027,
    shortDesc: "Produksi visual sinematik dan fotografi profesional dari nol.",
    thumbnail: null
  },
];

/* ==========================================
   KOMPONEN MANDIRI: TAB COURSES (KELAS ONLINE) - VERSI PREMIUM
   ========================================== */
export function CoursesTabSection() {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    if (course.status === "later") return;
    navigate(`/courses/${course.slug}`);
  };

  // Fungsi untuk menampilkan konten thumbnail
  const renderThumbnailContent = (course) => {
    // Jika ada thumbnail, tampilkan gambar penuh
    if (course.thumbnail) {
      return (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      );
    }

    // Jika tidak ada thumbnail, tampilkan teks judul
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 via-neutral-800/80 to-neutral-950/90 flex items-center justify-center">
        <span className="text-neutral-500 text-sm sm:text-base font-poppins font-semibold text-center px-4">
          {course.title}
        </span>
      </div>
    );
  };

  return (
    <div className="pt-28 md:pt-32 pb-8 md:pb-12 min-h-[70vh] w-full relative overflow-hidden">
      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 select-none relative z-10 animate-slide-down">
        <div className="flex justify-center mb-4">
          <span className="bg-[#FF5500]/20 text-[#FF5500] text-[10px] lg:text-xs font-chivo font-bold uppercase tracking-widest px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#FF5500]/30 backdrop-blur-sm">
            Exclusive Courses
          </span>
        </div>

        <h2 className="text-4xl sm:text-3xl lg:text-4xl font-poppins font-black mb-3 tracking-tight relative inline-block">
          <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
            Belajar Dari Praktisi
          </span>
          <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
        </h2>

        <p className="text-neutral-200 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
          Materi praktis dari pengalaman proyek nyata.
        </p>
      </div>

      {/* Grid Kartu Kelas */}
      <div className="w-[95%] max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10">
        {coursesData.map((course, i) => {
          const isClickable = course.status !== "later";
          const hasThumbnail = !!course.thumbnail;

          return (
            <div
              key={course.slug}
              onClick={() => handleCourseClick(course)}
              className={`
                group relative rounded-2xl overflow-hidden opacity-0 animate-slide-up
                transition-all duration-500 ease-out
                ${isClickable
                  ? "cursor-pointer hover:-translate-y-3 hover:scale-[1.02]"
                  : "cursor-default"
                }
              `}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Background Glassmorphism */}
              <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br 
                ${course.status === "ready" ? "from-[#FF5500]/15 via-[#FF5500]/5 to-transparent" : ""}
                ${course.status === "soon" ? "from-white/10 via-white/5 to-transparent" : ""}
                ${course.status === "later" ? "from-neutral-800/30 via-neutral-800/10 to-transparent" : ""}
                backdrop-blur-xl border border-white/10
              `} />

              {/* Inner glow hover effect */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-700
                ${isClickable ? "bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/10 group-hover:via-[#FF5500]/15 group-hover:to-[#FF5500]/25" : ""}
              `} />

              {/* Efek glow #FF5500 di sudut */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-700
                ${course.status === "ready" ? "bg-[#FF5500]/20 group-hover:bg-[#FF5500]/35" : ""}
                ${course.status === "soon" ? "bg-white/10 group-hover:bg-white/20" : ""}
                ${course.status === "later" ? "bg-neutral-800/20" : ""}
              `} />
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-700
                ${course.status === "ready" ? "bg-[#FF5500]/15 group-hover:bg-[#FF5500]/25" : ""}
                ${course.status === "soon" ? "bg-white/5 group-hover:bg-white/15" : ""}
                ${course.status === "later" ? "bg-neutral-800/10" : ""}
              `} />

              {/* Garis dekoratif #FF5500 di tepi */}
              <div className={`absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent transition-all duration-500
                ${isClickable ? "group-hover:via-[#FF5500]/70" : ""}
              `} />
              <div className={`absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent transition-all duration-500
                ${isClickable ? "group-hover:via-[#FF5500]/70" : ""}
              `} />

              {/* Border glow saat hover */}
              <div className={`absolute inset-0 rounded-2xl border transition-all duration-500 pointer-events-none
                ${isClickable ? "border-white/5 group-hover:border-[#FF5500]/40" : "border-neutral-800/50"}
              `} />
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none
                ${isClickable ? "opacity-0 group-hover:opacity-100 shadow-[inset_0_0_60px_rgba(255,85,0,0.08)]" : ""}
              `} />

              {/* THUMBNAIL AREA */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                {renderThumbnailContent(course)}

                {/* Overlay gelap untuk status "later" */}
                {course.status === "later" && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-5" />
                )}

                {/* BADGE STATUS - POSISI DI POJOK KANAN ATAS */}
                <div className="absolute top-3 right-3 z-10">
                  <span className={`
      text-[9px] sm:text-[10px] font-chivo font-bold uppercase tracking-wider 
      px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-sm border
      ${course.status === "ready"
                      ? "bg-[#FF5500]/90 text-white border-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.3)]"
                      : course.status === "soon"
                        ? "bg-white/20 text-white border-white/30 backdrop-blur-md"
                        : "bg-neutral-950/80 text-neutral-400 border-neutral-700"
                    }
    `}>
                    {course.status === "ready" ? "Dibuka" : course.status === "soon" ? "Segera Hadir" : "Coming Soon"}
                  </span>
                </div>
              </div>

              {/* Konten teks */}
              <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className={`
                    font-poppins font-bold text-sm sm:text-base lg:text-lg 
                    transition-colors duration-300
                    ${isClickable ? "text-white group-hover:text-[#FF5500]" : "text-neutral-500"}
                    leading-tight
                  `}>
                    {course.title}
                  </h3>

                  {isClickable && (
                    <svg className="w-4 h-4 text-[#FF5500] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </div>

                <p className={`
                  text-[11px] sm:text-xs lg:text-sm font-light leading-relaxed flex-1
                  ${isClickable ? "text-neutral-400 group-hover:text-neutral-300" : "text-neutral-600"}
                  transition-colors duration-300
                  line-clamp-2
                `}>
                  {course.shortDesc}
                </p>

                {/* Divider dekoratif */}
                <div className={`
  mt-3 pt-3 border-t transition-all duration-300
  ${isClickable ? "border-white/5 group-hover:border-[#FF5500]/20" : "border-neutral-800/30"}
`}>
                  <div className="flex items-center justify-between">
                    <span className={`
      text-[9px] sm:text-[10px] font-mono uppercase tracking-widest
      ${course.status === "ready" ? "text-[#FF5500]/60" : ""}
      ${course.status === "soon" ? "text-white/30" : ""}
      ${course.status === "later" ? "text-neutral-600" : ""}
    `}>
                      {/* Tampilkan tahun untuk status ready, atau status teks untuk lainnya */}
                      {course.status === "ready" ? course.year : course.status === "soon" ? "⌛ Segera" : "⏳ Coming Soon"}
                    </span>

                    {isClickable && (
                      <span className="text-[9px] sm:text-[10px] font-chivo font-bold uppercase tracking-wider text-[#FF5500]/40 group-hover:text-[#FF5500] transition-colors duration-300">
                        Lihat Detail
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Bottom */}
      <div className="relative z-10 mt-10 md:mt-12 text-center animate-slide-up [animation-delay:400ms] w-[95%] max-w-[80%] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full px-5 sm:px-6 py-4 sm:py-2.5 hover:border-[#FF5500]/40 transition-all duration-300 group w-full box-border">

          <span className="text-neutral-200 text-[13px] sm:text-sm font-chivo font-medium group-hover:text-white transition-colors duration-300 text-center sm:text-left">
            Butuh rekomendasi kelas yang cocok untukmu?
          </span>

          {/* Perubahan: Tambahkan w-full agar memenuhi lebar div di mobile */}
          <a
            href={`https://wa.me/6285111401924?text=${encodeURIComponent("Halo MoStu.ID, saya butuh rekomendasi kelas yang sesuai dengan kebutuhan saya. Boleh dibantu?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#FF5500] text-white font-chivo font-bold px-4 sm:px-5 py-2.5 sm:py-2 rounded-full text-[12px] uppercase tracking-wider hover:shadow-[0_0_30px_rgba(255,85,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Konsultasi</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   KOMPONEN MANDIRI: HALAMAN DETAIL KELAS - VERSI PREMIUM
   ========================================== */
export function CourseDetailSection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!course) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
        <p className="text-neutral-400 mb-4 relative z-10">Kelas yang kamu cari tidak ditemukan.</p>
        <button onClick={() => navigate("/courses")} className="relative z-10 text-[#FF5500] font-chivo text-sm uppercase tracking-wider hover:underline cursor-pointer">
          Kembali ke Courses
        </button>
      </div>
    );
  }

  const waLink = `https://wa.me/6285111401924?text=${encodeURIComponent(course.waMessage || `Halo MoStu.ID, saya ingin tahu lebih lanjut tentang Kelas ${course.title}.`)}`;

  if (course.status === "later" || !course.hero) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center relative">
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
    <div className="pt-28 md:pt-32 pb-8 md:pb-12 w-full relative overflow-hidden">
      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Wrapper Konten */}
      <div className="w-[95%] max-w-[80%] mx-auto relative z-10">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/courses")}
          className="relative z-10 flex items-center gap-2 text-neutral-400 hover:text-[#FF5500] font-chivo text-xs uppercase tracking-wider transition-all duration-300 group mb-8"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>Back to Courses</span>
      </button>

      {/* ==================== HERO SECTION ==================== */}
      <div className="relative z-10 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className={`
      inline-block text-[10px] font-chivo font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border mb-4
      ${course.status === "ready"
              ? "bg-[#FF5500]/20 text-[#FF5500] border-[#FF5500]/30"
              : "bg-white/10 text-neutral-200 border-white/20"
            }
    `}>
            {course.hero.eyebrow}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-black text-white tracking-tight mb-8 mt-8 leading-tight">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              {course.hero.headline}
            </span>
            <span className="absolute -inset-1 -z-0 rounded-lg"></span>
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            {course.hero.subheadline}
          </p>
        </div>
      </div>

      {/* ==================== VIDEO + HARGA ==================== */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Video - 2 kolom dengan rasio 9:16 di mobile, 16:9 di desktop */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#FF5500]/10 group bg-black">
          {/* Container video dengan rasio berbeda: 9:16 di mobile, 16:9 di desktop */}
          <div className="relative w-full">
            {/* Mobile: 9:16 (177.78%), Desktop: 16:9 (56.25%) */}
            <div className="lg:pb-[56.25%] pb-[177.78%]" />

            {/* Thumbnail */}
            <img
              src={course.trailerThumbnail || `https://img.youtube.com/vi/${course.trailerId}/hqdefault.jpg`}
              alt={`Thumbnail ${course.title}`}
              className="w-full h-full object-cover absolute inset-0 z-10"
              id={`thumbnail-${course.slug}`}
            />

            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20 z-10" />

            {/* Play Button */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
              onClick={(e) => {
                const container = e.currentTarget.closest('.lg\\:col-span-2');
                const thumbnail = container?.querySelector(`#thumbnail-${course.slug}`);
                const iframe = container?.querySelector(`#video-iframe-${course.slug}`);
                const playButton = e.currentTarget;

                if (thumbnail && iframe) {
                  // Sembunyikan thumbnail dan play button
                  thumbnail.classList.add('hidden');
                  playButton.classList.add('hidden');
                  // Tampilkan iframe
                  iframe.classList.remove('hidden');
                  // Set src with autoplay
                  iframe.src = iframe.dataset.src + '&autoplay=1';
                }
              }}
            >
              <div className="w-16 h-16 rounded-full bg-[#FF5500]/90 backdrop-blur-sm border-2 border-white/30 shadow-2xl shadow-[#FF5500]/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#FF5500] group-hover:scale-105">
                <svg className="w-8 h-8 fill-current text-white ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* YouTube Iframe - posisi absolute di tempat yang sama */}
            <iframe
              id={`video-iframe-${course.slug}`}
              className="video-iframe w-full h-full absolute inset-0 z-30 hidden"
              data-src={`https://www.youtube.com/embed/${course.trailerId}?rel=0&modestbranding=1`}
              title={`Trailer Kelas ${course.title}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Harga & CTA - 1 kolom */}
        <div className="relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between">
          {/* Badge promo */}
          <div className="absolute -top-3 -right-3">
            <span className="bg-[#FF5500] text-white text-[9px] font-chivo font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-[#FF5500]/30">
              Promo Terbatas!
            </span>
          </div>

          <div>
            <p className="text-neutral-400 text-sm font-chivo uppercase tracking-wider mb-1">Harga Investasi</p>
            <div className="flex items-end gap-3 mb-1">
              <span className="text-4xl font-poppins font-black text-white">Rp 499K</span>
              <span className="text-neutral-500 text-sm line-through">Rp 999K</span>
            </div>
            <p className="text-[#FF5500] text-xs font-chivo font-medium">Diskon 50% • Periode terbatas</p>
          </div>

          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <svg className="w-4 h-4 text-[#FF5500]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span>Akses kelas selamanya</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <svg className="w-4 h-4 text-[#FF5500]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span>Sertifikat kelulusan</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <svg className="w-4 h-4 text-[#FF5500]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span>Konsultasi via grup diskusi</span>
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider text-center hover:shadow-[0_0_40px_rgba(255,85,0,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#FF5500]/20"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>

      {/* ==================== DESKRIPSI PROMOSI ==================== */}
      <div className="relative z-10 mb-12">
        <div className="prose prose-invert max-w-none">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-poppins font-black text-white inline-block relative">
              <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent">
                Kenapa Harus Ikut Kelas Ini?
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {course.benefits?.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF5500]/30 transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#FF5500]/20 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-[#FF5500]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-300 text-sm font-light leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== MATERI PEMBELAJARAN ==================== */}
      <div className="relative z-10 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-poppins font-black text-white inline-block relative">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent">
              Materi Pembelajaran
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>
          <p className="text-neutral-400 text-sm font-light mt-2">Praktis, langsung aplikatif, dan siap dipraktekkan</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {course.curriculum?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF5500]/30 hover:bg-white/[0.08] transition-all duration-300 group"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#FF5500]/20 text-[#FF5500] text-xs font-chivo font-bold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-neutral-300 text-sm font-light group-hover:text-white transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== TESTIMONI / SOSIAL PROOF ==================== */}
      <div className="relative z-10 mb-12">
        <div className="text-center mb-6">
          <h3 className="text-sm font-poppins font-semibold text-white/60 uppercase tracking-wider">
            Testimoni Peserta
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex text-[#FF5500] text-sm">★★★★★</div>
            </div>
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              "Materinya sangat praktis dan langsung bisa dipraktekkan. Recommended!"
            </p>
            <p className="text-neutral-500 text-sm font-mono mt-2">— Andi, Content Creator</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex text-[#FF5500] text-sm">★★★★★</div>
            </div>
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              "Kelasnya worth it banget! Dapet insight baru yang nggak didapat di tempat lain."
            </p>
            <p className="text-neutral-500 text-sm font-mono mt-2">— Sarah, Digital Marketer</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex text-[#FF5500] text-sm">★★★★★</div>
            </div>
            <p className="text-neutral-300 text-sm font-light leading-relaxed">
              "Penyampaiannya mudah dipahami, cocok untuk pemula sekalipun."
            </p>
            <p className="text-neutral-500 text-sm font-mono mt-2">— Rizky, Freelancer</p>
          </div>
        </div>
      </div>

      {/* ==================== CTA BESAR ==================== */}
      <div className="relative z-10 text-center">
        <div className="relative rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto overflow-hidden">
          {/* Efek glow dekoratif */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF5500]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-poppins font-black text-white mb-2">
              Siap Mengembangkan Skill-mu?
            </h3>
            <p className="text-neutral-200 text-sm font-light mb-6 max-w-md mx-auto">
              Bergabung dengan kelas ini dan mulai perjalanan belajarmu!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF5500] to-[#e64a00] text-white font-chivo font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider hover:shadow-[0_0_50px_rgba(255,85,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#FF5500]/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.128.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.078l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Daftar Sekarang</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
