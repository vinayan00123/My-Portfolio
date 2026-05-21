import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full relative">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.4]"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero_bg.jpg)` }}
      />
      {/* Gradient to fade into the solid black of the next sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      
      {/* HERO SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center text-center">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-300 tracking-wide">Available for new projects</span>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold font-sans tracking-tight mb-4"
        >
          <span className="text-white drop-shadow-lg">Vinayan</span>
          <span className="text-gradient font-extrabold drop-shadow-xl"> B</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 font-medium mb-8 tracking-wide"
        >
          @vinaycode
        </motion.p>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light"
        >
          Software engineer building intelligent systems — from scalable web applications and intuitive user interfaces to robust backend services. Turning ideas into products.
        </motion.p>
        
        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
          <div className="flex gap-4 ml-4">
            <a href="https://github.com/vinayan00123" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors bg-slate-900/50 p-3 rounded-full border border-slate-800">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors bg-slate-900/50 p-3 rounded-full border border-slate-800">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>
      
    </div>
  );
}
