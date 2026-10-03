const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const correctProto = `function PrototypeRedirect() {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const folderName = pathParts[pathParts.length - 1];
    const iframeSrc = \`/prototypes/\${folderName}/index.html\`;
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
}`;

content = content.replace(/function PrototypeRedirect\(\) \{[\s\S]*?function App\(\) \{/, correctProto + '\n\nfunction App() {');
fs.writeFileSync('src/App.jsx', content);
