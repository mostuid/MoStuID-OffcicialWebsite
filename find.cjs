const fs = require('fs');
const file = 'd:/MoStu.id/OUR WEBSITE/MoStuID-OffcicialWeb/src/App.jsx';
const content = fs.readFileSync(file, 'utf8');

const matches = content.match(/activeTab === "[a-zA-Z]+"/g);
console.log(matches);
const sections = content.match(/function [A-Za-z]+TabSection/g);
console.log(sections);
