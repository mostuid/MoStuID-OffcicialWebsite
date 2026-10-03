const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
const content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('activeTab === "products"')) {
        console.log(i + 1, line);
        // Print 5 lines before and after
        for (let j = Math.max(0, i - 5); j <= Math.min(lines.length - 1, i + 5); j++) {
            if (j !== i) console.log(`  ${j + 1}: ${lines[j]}`);
        }
    }
    
    if (line.includes('activeTab === "courses"')) {
        console.log(i + 1, line);
    }
});
