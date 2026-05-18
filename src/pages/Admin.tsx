import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogIn, Plus, LogOut, Loader2, Save, Globe } from 'lucide-react';
import ProjectCard from '../components/ProjectCard.tsx';

const QUICK_STACKS = ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind', 'Next.js', 'Python', 'AI/ML'];
const QUICK_TAGS = ['Web', 'Mobile', 'Backend', 'New', 'Featured', 'MVP'];

export default function Admin() {
  const initialToken = localStorage.getItem('adminToken') || '';
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    techStack: '',
    tags: '',
    isFeatured: false,
    githubUrl: '',
    liveUrl: '',
    image: null as File | null
  });

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('adminToken', data.token);
          setIsLoggedIn(true);
        } else {
          setError(data.message || 'Access Protocol Denied: Check Credentials');
        }
      } else {
        setError('Server Error: Authentication endpoint returned non-JSON response');
      }
    } catch (err) {
      setError('System Uplink Failure: Could not reach authentication server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const formData = new FormData();
    formData.append('name', projectForm.name);
    formData.append('description', projectForm.description);
    formData.append('techStack', projectForm.techStack);
    formData.append('tags', projectForm.tags);
    formData.append('isFeatured', String(projectForm.isFeatured));
    formData.append('githubUrl', projectForm.githubUrl);
    formData.append('liveUrl', projectForm.liveUrl);
    if (projectForm.image) {
      formData.append('image', projectForm.image);
    }

    try {
      const url = '/api/projects';
      const method = 'POST';
      
      const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const contentType = res.headers.get('content-type');
      if (res.ok) {
        setSuccess('New Project Committed to Grid');
        setProjectForm({ name: '', description: '', techStack: '', tags: '', isFeatured: false, githubUrl: '', liveUrl: '', image: null });
        setTimeout(() => setSuccess(null), 3000);
      } else {
        let errorMessage = 'Operation Failed: Database Rejection';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError('System Failure: Database Connection is currently offline');
      console.error('Submit Project Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (field: 'techStack' | 'tags', value: string) => {
    const current = projectForm[field];
    const items = current ? current.split(',').map(i => i.trim()).filter(i => i !== '') : [];
    
    if (items.includes(value)) {
      const filtered = items.filter(i => i !== value);
      setProjectForm({ ...projectForm, [field]: filtered.join(', ') });
    } else {
      items.push(value);
      setProjectForm({ ...projectForm, [field]: items.join(', ') });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="term-container h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="term-card p-12 w-full max-w-md bg-slate-950/80 backdrop-blur-md relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-b from-term-cyan/5 to-transparent pointer-events-none" />
           <h2 className="text-3xl font-black mb-8 text-center text-term-cyan text-glow uppercase tracking-tighter relative z-10">sudo su</h2>
           
           {error && (
             <div className="bg-red-500/10 border border-red-500/50 rounded-none p-4 mb-6 text-red-500 text-xs font-mono text-center shadow-[0_0_10px_rgba(239,68,68,0.2)]">
               {error}
             </div>
           )}

           <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div>
                 <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Access Key</label>
                 <input
                   type="email"
                   value={authForm.email}
                   onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                   className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-white focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none font-mono transition-all"
                   placeholder="Admin Identifier"
                 />
              </div>
              <div>
                 <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Encrypted Pulse</label>
                 <input
                   type="password"
                   value={authForm.password}
                   onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                   className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-white focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none font-mono transition-all"
                   placeholder="••••••••"
                 />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-term text-term-cyan border-term-cyan hover:bg-term-cyan hover:text-black flex items-center justify-center gap-2 py-4 text-base font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)]"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={18} /> Authenticate</>}
              </button>
           </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="term-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-12 border-b border-term-cyan/20 pb-6"
      >
        <div>
          <h2 className="text-4xl font-black uppercase text-white tracking-tighter italic font-mono text-glow">./admin.sh</h2>
          <p className="text-term-cyan font-mono text-[10px] uppercase tracking-widest mt-2 text-glow">Status: Administrator Level Access</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setProjectForm({ name: '', description: '', techStack: '', tags: '', isFeatured: false, githubUrl: '', liveUrl: '', image: null });
              document.getElementById('project-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-term text-term-cyan border-term-cyan hover:bg-term-cyan hover:text-black flex items-center gap-2 text-xs py-2 px-6 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          >
             <Plus size={16} /> New Upload
          </button>
          <button onClick={handleLogout} className="btn-term flex items-center gap-2 text-xs py-2 px-6 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]">
             <LogOut size={16} /> Exit
          </button>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto mb-12">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           id="project-form"
         >
            <div className="term-card p-10 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-term-cyan/5 blur-[100px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-mono text-white tracking-tight relative z-10">
                <Plus className="text-term-cyan text-glow" size={28} /> // INITIATE_UPLOAD
              </h3>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 p-4 mb-6 text-red-500 text-[10px] font-mono text-center shadow-[0_0_10px_rgba(239,68,68,0.2)] relative z-10">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-term-cyan/10 border border-term-cyan/50 p-4 mb-6 text-term-cyan text-[10px] font-mono text-center shadow-[0_0_10px_rgba(6,182,212,0.2)] relative z-10">
                  {success}
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-8 relative z-10">
                 <div className="space-y-3">
                   <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// Project Name</label>
                   <input
                     placeholder="NeuroChain, Budgetly, etc..."
                     value={projectForm.name}
                     onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                     className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-base focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono transition-all"
                     required
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// Project Summary</label>
                   <textarea
                     placeholder="Describe your project in detail..."
                     value={projectForm.description}
                     onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                     className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-base focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono resize-none transition-all"
                     rows={5}
                     required
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// Tech Stack</label>
                     <input
                       placeholder="React, Node..."
                       value={projectForm.techStack}
                       onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                       className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-sm focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono transition-all"
                     />
                     <div className="flex flex-wrap gap-2 mt-3">
                        {QUICK_STACKS.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleItem('techStack', s)}
                            className={`text-xs px-3 py-1.5 rounded-none border transition-all font-mono ${
                              projectForm.techStack.includes(s) ? 'bg-term-cyan/20 border-term-cyan text-term-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-slate-900/50 border-term-cyan/20 text-gray-400 hover:border-term-cyan hover:text-term-cyan'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-3">
                     <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// Tags</label>
                     <input
                       placeholder="Latest, MVP..."
                       value={projectForm.tags}
                       onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                       className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-sm focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono transition-all"
                     />
                     <div className="flex flex-wrap gap-2 mt-3">
                        {QUICK_TAGS.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleItem('tags', t)}
                            className={`text-xs px-3 py-1.5 rounded-none border transition-all font-mono ${
                              projectForm.tags.includes(t) ? 'bg-term-cyan/20 border-term-cyan text-term-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-slate-900/50 border-term-cyan/20 text-gray-400 hover:border-term-cyan hover:text-term-cyan'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// GitHub URL</label>
                      <input
                        placeholder="https://github.com/..."
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                        className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-sm focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">// Live URL</label>
                      <input
                        placeholder="https://yoursite.com"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                        className="w-full bg-slate-900/50 border border-term-cyan/20 px-4 py-3 text-sm focus:border-term-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] focus:outline-none text-white font-mono transition-all"
                      />
                    </div>
                 </div>
                 <div className="flex items-center gap-4 py-4 px-5 bg-slate-900/30 border border-term-cyan/20 hover:border-term-cyan transition-colors">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={projectForm.isFeatured}
                      onChange={(e) => setProjectForm({...projectForm, isFeatured: e.target.checked})}
                      className="w-5 h-5 cursor-pointer accent-term-cyan"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-mono text-gray-300 uppercase tracking-widest cursor-pointer flex-1">Mark as Featured</label>
                 </div>
                 <div className="relative border border-dashed border-term-cyan/30 p-8 text-center group hover:border-term-cyan hover:bg-term-cyan/5 transition-all bg-slate-900/30">
                    <input
                      type="file"
                      onChange={(e) => setProjectForm({...projectForm, image: e.target.files?.[0] || null})}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="text-center font-mono relative z-0">
                      <Globe className="w-10 h-10 mx-auto mb-3 text-term-cyan/50 group-hover:text-term-cyan group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
                      <p className="text-sm text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">
                         {projectForm.image ? projectForm.image.name : 'Click to upload preview image'}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">PNG, JPG or WebP (Max 5MB)</p>
                    </div>
                 </div>
                 <div className="flex gap-4 mt-10">
                   <button
                     type="submit"
                     disabled={loading}
                     className="flex-1 btn-term text-term-cyan border-term-cyan hover:bg-term-cyan hover:text-black py-4 text-base font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                   >
                     {loading ? <Loader2 className="animate-spin inline-block mr-2" size={18} /> : <><Save size={18} className="inline-block mr-2" /> Commit Project</>}
                   </button>
                 </div>
              </form>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
