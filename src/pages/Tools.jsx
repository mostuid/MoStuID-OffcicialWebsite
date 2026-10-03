import React from 'react';

export function ToolsTabSection() {
  return (
    <div className="mt-20">
      <div className="absolute inset-0 bg-[#FF5500]/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5500]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="py-16 w-[95%] max-w-[80%] mx-auto min-h-[75vh] flex flex-col justify-center animate-slide-up">
        <div className="text-center max-w-xl mx-auto mb-12 select-none">
          <h2 className="text-4xl sm:text-4xl font-poppins font-black mb-3 tracking-tight relative inline-block">
            <span className="bg-gradient-to-r from-[#FF5500] via-white to-[#FF5500] bg-clip-text text-transparent relative z-10">
              Digital Tools
            </span>
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>
          <p className="text-neutral-200 font-semibold text-sm sm:text-sm mt-2">
            Alat bantu bertenaga AI dan efisiensi untuk mempercepat workflow Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-6 px-4 sm:px-0">
          {[
            {
              title: "AI Voice Generator",
              desc: "Ubah teks menjadi suara manusia buatan AI. Voice over yang sangat realistis, natural, dan siap pakai untuk kebutuhan konten video marketing Anda.",
              link: "https://gemini.google.com/share/aa1654ce2d36",
              btnText: "Launch Tool ➔",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
              )
            },
            {
              title: "Page Generator",
              desc: "Rakit halaman landing page promosi produk atau portofolio bisnis Anda secara instan dalam hitungan menit tanpa koding.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 0 2.4 2.249h1.64a2.25 2.25 0 0 0 2.4-2.249 3 3 0 0 0-.66-1.128ZM9.53 16.122a3 3 0 1 1 4.94 0M9.53 16.122a3 3 0 0 0 .47.11h3.41a3 3 0 0 0 .47-.11m4.94 0a3 3 0 0 1-.66 1.128 2.25 2.25 0 0 1 2.4 2.249h1.64a2.25 2.25 0 0 1 2.4-2.249 3 3 0 0 1-5.78-1.128ZM15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )
            }
          ].map((item, idx) => {
            const isActive = !!item.link;
            return (
              <div key={idx} className={`relative p-6 rounded-2xl flex flex-col justify-between opacity-0 animate-slide-up transition-all duration-500 [animation-delay:${idx * 100}ms] ${isActive ? 'group hover:-translate-y-2 hover:scale-[1.02] cursor-pointer' : 'bg-neutral-900/20 backdrop-blur-sm border border-neutral-900 select-none'}`} onClick={isActive ? (e) => { e.stopPropagation(); window.open(item.link, "_blank"); } : undefined}>
                {isActive ? (
                  <>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/5 group-hover:via-[#FF5500]/10 group-hover:to-[#FF5500]/20 transition-all duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />
                    <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                    <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#FF5500]/20 backdrop-blur-sm border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] mb-4 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-[0_0_30px_rgba(255,85,0,0.2)]">
                        {item.icon}
                      </div>
                      <h3 className="font-poppins font-bold text-lg mb-1 transition-colors duration-300 text-white group-hover:text-[#FF5500]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-light leading-relaxed mb-4 text-neutral-400">
                        {item.desc}
                      </p>
                    </div>
                    <div className="relative z-10 mt-auto">
                      <button onClick={(e) => { e.stopPropagation(); window.open(item.link, "_blank"); }}
                        className="w-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white text-neutral-300 font-chivo font-medium py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] group-hover:shadow-[0_0_30px_rgba(255,85,0,0.1)]">
                        {item.btnText}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-center text-neutral-600 text-xs sm:text-sm font-chivo uppercase tracking-widest font-semibold opacity-70">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
