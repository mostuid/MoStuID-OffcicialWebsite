import React from 'react';
import founderimg from "../assets/founder.webp";
import cofounderimg from "../assets/co-founder.webp";
import whoNext from "../assets/Whos-Next.webp";
import bgSec2 from '../assets/bg-sec2.webp';

export default function AboutTabSection() {
  const team = [
    { role: "Founder / Lead Developer", name: "Mhd. Reza Erdiansyah", image: founderimg, delay: "" },
    { role: "Co-Founder / Art Director", name: "Mohd. Daniel", image: cofounderimg, delay: "[animation-delay:100ms]" },
    { role: "Maybe it's you?", name: "Who's Next?", image: whoNext, delay: "[animation-delay:100ms]" },
    { role: "Maybe it's you?", name: "Who's Next?", image: whoNext, delay: "[animation-delay:100ms]" },
  ];

  return (
    <div className="pt-28 md:pt-32 pb-6 md:pb-12 w-full mx-auto animate-slide-up relative overflow-hidden">
      {/* Efek glow background */}
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[95%] max-w-[80%] mx-auto space-y-12 md:space-y-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch select-none">
        <div className="md:col-span-7 space-y-0 text-left relative">

          {/* Judul About MoStu - Rata tengah di mobile, rata kiri di desktop */}
          <div className="text-center md:text-left mb-14 md:mb-8 select-none">
            <h3 className="text-4xl md:text-4xl font-poppins font-black tracking-tight text-white relative inline-block">
              <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
                About MoStu
              </span>
              {/* Efek glow kecil dan rapi */}
              <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
              {/* Efek glow tipis di bawah */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
            </h3>
            <p className="text-neutral-200 font-semibold text-sm sm:text-sm mt-4">Sejarah perjalanan bisnis kami.</p>
          </div>

          {/* TIMELINE DENGAN GARIS TERHUBUNG - TEPAT DI TENGAH DOT */}
          <div className="relative pl-2">
            {/* Garis vertikal - dari tengah dot pertama sampai tengah dot terakhir */}
            <div className="absolute left-1.5 top-[12px] bottom-[12px] w-[5px] bg-gradient-to-b from-[#FF5500]/60 via-[#FF5500]/30 to-transparent rounded-full" />

            {/* Item 1 */}
            <div className="relative pl-6 pb-5 md:pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm sm:text-sm font-light leading-relaxed">
                MoStu (Mostanir Studios) berawal pada tahun 2024 sebagai layanan Agency yang bergerak di bidang animasi, foto & videografi, pengembangan website, dan visualisasi 3D.
              </p>
            </div>

            {/* Item 2 */}
            <div className="relative pl-6 pb-5 md:pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm sm:text-sm font-light leading-relaxed">
                Ide ini lahir dari sebuah meja warkop, ditemani segelas kopi pancung khas Aceh dan obrolan panjang tentang mimpi, kreativitas, serta harapan untuk membangun sesuatu yang bermanfaat. Hingga hari ini, Mostanir Studios masih dalam proses bertumbuh dan belajar.
              </p>
            </div>

            {/* Item 3 */}
            <div className="relative pl-6 pb-5 md:pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm sm:text-sm font-light leading-relaxed">
                Kami memang bukan tim besar, bahkan belum memiliki perjalanan yang begitu panjang. Namun kami percaya, bahwa setiap karya yang dikerjakan dengan sungguh-sungguh akan menemukan jalannya sendiri.
              </p>
            </div>

            {/* Item 4 */}
            <div className="relative pl-6 pb-5 md:pb-6">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_20px_rgba(255,85,0,0.4)] z-10" />
              <p className="text-neutral-400 text-sm sm:text-sm font-light leading-relaxed">
                Dari proyek ke proyek, kami terus mengembangkan kemampuan, memperluas pengalaman, dan berusaha memberikan hasil terbaik bagi setiap klien yang mempercayakan kebutuhannya kepada kami, dengan penuh tanggung jawab.
              </p>
            </div>

            {/* Item 5 (terakhir) */}
            <div className="relative pl-6 mb-8">
              <div className="absolute left-0 top-2 w-4 h-4 bg-[#FF5500] rounded-full border-2 border-[#FF5500] -ml-[7px] shadow-[0_0_25px_rgba(255,85,0,0.5)] z-10" />
              <p className="text-neutral-400 text-sm sm:text-sm font-light leading-relaxed">
                Perjalanan ini masih panjang, dan kami memilih untuk terus belajar, berkarya, serta bertumbuh bersama setiap kepercayaan yang Anda berikan.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-neutral-850 flex items-center justify-center bg-neutral-900 h-64 md:h-full min-h-75">
          <img
            src={bgSec2}
            alt="MoStu Corporate Visual"
            className="w-full h-full object-cover object-center opacity-80 absolute inset-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left z-10">
            <span className="font-poppins font-bold text-3xl md:text-4xl text-[#ffb792] block drop-shadow-[0_0_15px_rgba(255,85,0,0.65)] select-none">
              Since 2024
            </span>
            <span className="text-neutral-300 font-mono text-[10px] uppercase tracking-widest mt-2 block">
              From Simple Ideas to Meaningful Solutions
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-neutral-900/60 pt-6 md:pt-8">
        <a
          href="https://drive.google.com/file/d/18ZAaMazo9MeIC_VigtfQl1wHEcIoZ_uw/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF5500] hover:bg-[#e64a00] text-white font-poppins font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl text-xs md:text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#FF5500]/20 hover:shadow-[#FF5500]/40 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-5 md:w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span>Lihat Company Profile (G-Drive) </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.5L21 12m0 0l-7.5 5.5M21 12H3" />
          </svg>
        </a>
      </div>

      <div className="relative rounded-2xl overflow-hidden mt-10 md:mt-12">
        {/* Card Background & Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5" />
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
        <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
        <div className="absolute inset-0 border border-white/5 rounded-2xl" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start select-none p-8 md:p-10 relative z-10">
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1 h-8 bg-[#FF5500] rounded-full shadow-[0_0_15px_rgba(255,85,0,0.6)]"></div>
              <h3 className="text-xl md:text-2xl font-poppins font-bold text-white tracking-tight">Visi</h3>
            </div>
            <p className="text-neutral-300 text-sm sm:text-sm font-light leading-relaxed pl-4">
              Menjadi mitra kreatif digital terpercaya yang menghubungkan ide-ide brilian dengan eksekusi visual berkualitas tinggi, serta mendorong pertumbuhan bisnis di era digital.
            </p>
          </div>
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1 h-8 bg-[#FF5500] rounded-full shadow-[0_0_15px_rgba(255,85,0,0.6)]"></div>
              <h3 className="text-xl md:text-2xl font-poppins font-bold text-white tracking-tight">Misi</h3>
            </div>
            <ul className="text-neutral-300 text-sm sm:text-sm font-light leading-relaxed pl-4 space-y-2 list-disc list-inside">
              <li>Mengembangkan websites/apps yang berkualitas.</li>
              <li>Menciptakan konten visual yang menarik dan efektif.</li>
              <li>Membangun brand dan identitas digital yang kuat.</li>
              <li>Berinovasi mengikuti perkembangan teknologi.</li>
            </ul>
          </div>
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-1 h-8 bg-[#FF5500] rounded-full shadow-[0_0_15px_rgba(255,85,0,0.6)]"></div>
              <h3 className="text-xl md:text-2xl font-poppins font-bold text-white tracking-tight">Nilai Kami</h3>
            </div>
            <div className="pl-4 space-y-4">
              <div>
                <h4 className="text-sm md:text-sm font-poppins font-semibold text-[#FF5500] mb-1">Kreatif & Inovatif</h4>
                <p className="text-neutral-300 text-sm sm:text-sm font-light">Selalu mencari pendekatan baru dalam setiap karya.</p>
              </div>
              <div>
                <h4 className="text-sm md:text-sm font-poppins font-semibold text-[#FF5500] mb-1">Integritas & Tanggung Jawab</h4>
                <p className="text-neutral-300 text-sm sm:text-sm font-light">Bekerja dengan komitmen dan profesionalisme tinggi.</p>
              </div>
              <div>
                <h4 className="text-sm md:text-sm font-poppins font-semibold text-[#FF5500] mb-1">Kolaborasi</h4>
                <p className="text-neutral-300 text-sm sm:text-sm font-light">Membangun sinergi dengan klien untuk hasil terbaik.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== OUR MASTERMINDS - TANPA HOVER & OUTLINE RECTANGLE ===== */}
      <div>
        <div className="text-center mb-8 md:mb-12 select-none">
          <h3 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-white relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Our Masterminds
            </span>
            {/* Efek glow kecil dan rapi */}
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            {/* Efek glow tipis di bawah */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h3>
          <p className="text-neutral-200 font-semibold text-sm sm:text-sm mt-4">Sinergi profesional di balik MoStu Agency.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
          {team.map((member, i) => (
            <div key={i} className={`flex flex-col items-center text-center opacity-0 animate-slide-up ${member.delay}`}>
              {/* Container foto dengan glassmorphism ringan */}
              <div className="w-full aspect-4/5 bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 rounded-2xl mb-3 md:mb-4 relative flex items-end justify-center overflow-hidden border border-white/5">
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

              <h4 className="font-poppins font-bold text-xs sm:text-sm md:text-base text-neutral-200">
                {member.name}
              </h4>
              <p className="font-mono text-neutral-500 text-[9px] sm:text-[10px] md:text-xs mt-0.5 uppercase tracking-wide">{member.role}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
