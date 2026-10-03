const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
const content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('activeTab === "products" &&')) {
        console.log("Found activeTab products content at line:", i + 1);
    }
}
