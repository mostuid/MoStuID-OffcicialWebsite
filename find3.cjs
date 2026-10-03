const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
const content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "products"')) {
        console.log("Found activeTab products at line:", i + 1);
        for (let j = Math.max(0, i - 10); j <= Math.min(lines.length - 1, i + 10); j++) {
            console.log(`  ${j + 1}: ${lines[j]}`);
        }
    }
}
