import React from 'react';
import catetAjaIcon from '../assets/catet-aja-app-icon.png';

export function AppsTabSection() {
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
              Mobile Apps
            </span>
            <span className="absolute -inset-1 bg-[#FF5500]/15 blur-md -z-0 rounded-lg"></span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent rounded-full"></span>
          </h2>
          <p className="text-neutral-200 font-semibold text-sm sm:text-sm mt-2">
            Unduh aplikasi mobile buatan Kami.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto gap-6 px-4 sm:px-0">
          {[
            {
              title: "Catet Aja Apps",
              desc: "Catet Aja adalah aplikasi kasir dan pembukuan berbasis Android yang membantu usaha kecil hingga menengah dalam pencatatan transaksi, mengelola keuangan, mencetak struk, hingga membuat laporan penjualan harian, bulanan serta tahunan dengan sangat mudah dan praktis.",
              link: "https://drive.usercontent.google.com/download?id=1sBKSt0o37ZalKvuqEBIIqFyxktGpZj1M&export=download&authuser=0&confirm=t&uuid=35db4cda-809c-4f5f-bb4c-f40af899cb8f&at=AMrWOn0FXQg4Widt7t9ARQhUvHwY:1791055981288",
              btnText: "Download APK",
              icon: (
                <img src={catetAjaIcon} alt="Catet Aja Apps Icon" fetchPriority="high" loading="eager" className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_4px_20px_rgba(255,85,0,0.15)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 rounded-3xl" />
              )
            },
            {
              // Card coming soon
            }
          ].map((item, idx) => {
            const isActive = !!item.link;
            return (
              <div key={idx} className={`relative p-8 rounded-3xl flex flex-col justify-between opacity-0 animate-slide-up transition-all duration-500 [animation-delay:${idx * 100}ms] ${isActive ? "group hover:-translate-y-2 hover:scale-[1.02] cursor-pointer" : "bg-neutral-900/20 backdrop-blur-sm border border-neutral-900/50 select-none flex items-center justify-center min-h-[280px]"}`} onClick={isActive ? (e) => { e.stopPropagation(); window.open(item.link, "_blank"); } : undefined}>
                {isActive ? (
                  <>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-[#FF5500]/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#FF5500]/5" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#FF5500]/0 via-[#FF5500]/0 to-[#FF5500]/5 group-hover:from-[#FF5500]/5 group-hover:via-[#FF5500]/10 group-hover:to-[#FF5500]/20 transition-all duration-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FF5500]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/15 transition-all duration-700" />
                    <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                    <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent group-hover:via-[#FF5500]/60 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-[#FF5500]/30 transition-all duration-500" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 h-full">
                      <div className="shrink-0 relative">
                        <div className="absolute inset-0 bg-[#FF5500]/20 blur-2xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="relative z-10">
                          {item.icon}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col h-full text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3">
                          <h3 className="font-poppins font-bold text-3xl transition-colors duration-300 text-white group-hover:text-[#FF5500]">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-neutral-300 uppercase tracking-widest backdrop-blur-sm">APK</span>
                            <span className="px-3 py-1 bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-full text-[10px] font-mono text-[#FF5500] uppercase tracking-widest backdrop-blur-sm">Free</span>
                          </div>
                        </div>

                        <p className="text-sm font-light leading-relaxed mb-8 text-neutral-400 max-w-lg mx-auto md:mx-0">
                          {item.desc}
                        </p>

                        <div className="mt-auto flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                          <button onClick={(e) => { e.stopPropagation(); window.open(item.link, "_blank"); }}
                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#FF5500] to-[#e64a00] hover:from-[#ff661a] hover:to-[#ff5500] text-white font-chivo font-bold rounded-xl text-sm uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#FF5500]/20 group-hover:shadow-[0_0_30px_rgba(255,85,0,0.4)] flex items-center justify-center gap-3 border border-[#FF5500]/50 relative overflow-hidden group/btn">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 relative z-10 group-hover/btn:-translate-y-1 transition-transform duration-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span className="relative z-10">{item.btnText}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-center text-neutral-600 text-sm font-chivo uppercase tracking-widest font-semibold opacity-70">
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