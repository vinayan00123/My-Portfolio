import { Mail, Github, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="min-h-screen grid-bg w-full relative pt-24 pb-12 flex flex-col">
      <div className="max-w-4xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase">// CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Let's Build Something</h1>
          <p className="text-slate-400 font-medium max-w-lg mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities, collaborations, or internships.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto w-full term-card bg-[#09090b] border border-slate-800 rounded-2xl p-10 text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
            <Mail size={28} />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Email Me</h2>
          <p className="text-slate-400 mb-8">
            The best way to reach me is directly through email. I'll try my best to get back to you!
          </p>
          
          <a 
            href="mailto:vinayanbalasubramanian@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors mb-10"
          >
            <Mail size={18} />
            vinayanbalasubramanian@gmail.com
          </a>

          <div className="flex items-center justify-center gap-4 border-t border-slate-800/50 pt-8">
            <a 
              href="https://github.com/vinayan00123" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-sm font-medium"
            >
              <Github size={16} /> GitHub
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors text-sm font-medium"
            >
              <Twitter size={16} /> Twitter / X
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 mt-12 border-t border-slate-800/50 text-slate-500 text-sm">
        <p>© 2026 Vinay Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}
