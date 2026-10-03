const fs = require('fs');
let content = fs.readFileSync('src/pages/Courses.jsx', 'utf8');

// Replace the line numbers at the end of Courses.jsx
content = content.replace(/2162:                 <\/svg>/, '                </svg>');
content = content.replace(/2163:                 <span>Daftar Sekarang<\/span>/, '                <span>Daftar Sekarang</span>');
content = content.replace(/2164:               <\/a>/, '              </a>');
content = content.replace(/2165:             <\/div>/, '            </div>');
content = content.replace(/2166:           <\/div>/, '          </div>');
content = content.replace(/2167:         <\/div>/, '        </div>');
content = content.replace(/2168:       <\/div>/, '      </div>');
content = content.replace(/2169:     <\/div>/, '    </div>');
content = content.replace(/2170:   \);/, '  );');
content = content.replace(/2171: }/, '}');

fs.writeFileSync('src/pages/Courses.jsx', content);
console.log('Fixed line numbers in Courses.jsx');
