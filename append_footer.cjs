const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

const components = `
function Footer({ setActiveTab, scrollToSection }) {
  return (
    <footer className="w-full bg-black/90 py-12 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab("home");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
          >
            <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center p-2.5 border border-white/10 group-hover:border-[#FF5500]/50 transition-colors">
              <img src="/src/assets/logo-mostu.png" alt="MoStu Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-poppins font-bold text-xl text-white tracking-tight">MoStu<span className="text-[#FF5500]">.ID</span></h2>
              <p className="font-chivo text-neutral-400 text-[10px] uppercase tracking-[0.2em]">Digital & Creative</p>
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
          <p className="opacity-50">© 2026 MoStu.ID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  const navigate = require('react-router-dom').useNavigate();

  require('react').useEffect(() => {
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
`;

fs.writeFileSync('src/App.jsx', app + '\n' + components);
console.log('Successfully appended Footer and NotFound using UTF-8');
