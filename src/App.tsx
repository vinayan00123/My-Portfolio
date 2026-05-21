import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import ThreeBackground from './components/ThreeBackground.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Skills from './pages/Skills.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';

// Main layout for the single-page scrolling portfolio
function MainLayout() {
  return (
    <div className="pb-12 w-full">
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="projects"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ThreeBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin" element={
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-12 min-h-screen"
          >
            <Admin />
          </motion.main>
        } />
      </Routes>
      <footer className="w-full border-t border-slate-900/60 bg-[#000000]/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-row items-center justify-between text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Vinay Kumar. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/vinayan00123" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </Router>
  );
}
