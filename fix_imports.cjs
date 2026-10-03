const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
content = content.replace(
  'import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";',
  `import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import Home from "./pages/Home";
import AboutTabSection from "./pages/About";
import PortfolioTabSection from "./pages/Portfolio";
import { CoursesTabSection, CourseDetailSection } from "./pages/Courses";
import { AppsTabSection } from "./pages/Apps";`
);
fs.writeFileSync('src/App.jsx', content);
console.log('Fixed imports in App.jsx');
