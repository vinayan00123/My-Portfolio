import { Mail, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section className="min-h-screen grid-bg w-full relative pt-32 pb-24 flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col justify-center items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase">// CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 font-sans">
            Let's Build Something
          </h1>
          <p className="text-slate-400 font-medium max-w-lg mx-auto font-sans">
            Have a project in mind? I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-xl md:max-w-2xl mx-auto w-full bg-[#050505]/40 border border-slate-900/60 rounded-xl p-8 md:p-12 text-center shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <a 
              href="mailto:vinayanbalasubramanian@gmail.com" 
              className="inline-flex items-center gap-3 text-cyan-400 font-mono text-lg md:text-xl hover:text-cyan-300 transition-all duration-300"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              vinayanbalasubramanian@gmail.com
            </a>

            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://github.com/vinayan00123" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-black border border-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-900 hover:border-slate-700 rounded-full transition-all duration-300 text-sm font-medium"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-black border border-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-900 hover:border-slate-700 rounded-full transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg> Twitter
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
