import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen grid-bg w-full relative pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase">// ABOUT</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Building Software That Works</h1>
          <p className="text-slate-400 font-medium">Focusing on clean code and scalable applications.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Code Window Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Editor Window */}
            <div className="term-card p-0 overflow-hidden bg-[#09090b] border border-slate-800 rounded-2xl flex flex-col shadow-2xl">
              <div className="bg-slate-900 px-4 py-3 flex items-center border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <img src="/profile_img.jpg" alt="Profile" className="w-full object-cover max-h-80" />
            </div>

            {/* Terminal Window */}
            <div className="term-card p-0 overflow-hidden bg-[#09090b] border border-slate-800 rounded-2xl flex flex-col shadow-2xl">
              <div className="bg-slate-900 px-4 py-2 flex items-center border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                </div>
                <span className="mx-auto text-xs font-mono text-slate-500">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <p className="text-slate-300"><span className="text-green-400 mr-2">$</span>whoami</p>
                <p className="text-cyan-400 mb-2">&gt; vinay_kumar</p>
                <p className="text-slate-300"><span className="text-green-400 mr-2">$</span>cat status.txt</p>
                <p className="text-cyan-400 mb-2">&gt; Seeking full-time roles & internships</p>
                <p className="text-slate-300"><span className="text-green-400 mr-2">$</span>echo $GOAL</p>
                <p className="text-cyan-400">&gt; building the future</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="text-slate-300 text-lg leading-relaxed space-y-6 mb-12">
              <p>
                I'm Vinayan.B, a software engineer passionate about building responsive, full-stack applications. I specialize in the modern web ecosystem — from crafting intuitive React interfaces to designing robust Node.js architectures.
              </p>
              <p>
                My work spans frontend development, backend APIs, and database design. I believe the best code isn't just functional — it's readable, maintainable, and built with the user in mind.
              </p>
              <p>
                As a recent graduate, I'm eager to bring my academic foundation and project experience to a professional engineering team.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="term-card border border-slate-800 bg-[#09090b] rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
                <h3 className="text-3xl font-bold text-white mb-2">1</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Projects Built</p>
              </div>
              <div className="term-card border border-slate-800 bg-[#09090b] rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
                <h3 className="text-3xl font-bold text-white mb-2">0</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Years Coding</p>
              </div>
              <div className="term-card border border-slate-800 bg-[#09090b] rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
                <h3 className="text-3xl font-bold text-white mb-2">0</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Commits Made</p>
              </div>
              <div className="term-card border border-slate-800 bg-[#09090b] rounded-2xl p-6 text-center hover:border-slate-700 transition-colors">
                <h3 className="text-3xl font-bold text-white mb-2">∞</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Hunger to Learn</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

