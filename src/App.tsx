import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.tsx';
import ThreeBackground from './components/ThreeBackground.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Skills from './pages/Skills.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';
import { useEffect, useState } from 'react';

// Main layout for the single-page scrolling portfolio
function MainLayout() {
  return (
    <div className="pt-24 pb-12 w-full">
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
    <Router>
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
      <footer className="py-12 border-t border-slate-900 glass">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Vinay Kumar. Built with React, Tailwind CSS & Passion.
        </div>
      </footer>
    </Router>
  );
}
