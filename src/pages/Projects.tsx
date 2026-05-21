import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard.tsx';
import staticProjects from '../data/projects.json';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const contentType = res.headers.get('content-type');
      const isApiRoute = res.headers.get('x-api-matched') === 'true';
      
      if (isApiRoute && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok) {
          setProjects(Array.isArray(data) && data.length > 0 ? data : staticProjects);
          return;
        }
      }
      setProjects(staticProjects);
    } catch (err) {
      console.error('Fetch Projects List Error:', err);
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen grid-bg w-full relative pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase">// PROJECTS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">What I've Built</h1>
          <p className="text-slate-400 font-medium">A selection of my recent work and side projects.</p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length > 0 ? (
          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
          >
            {projects.map((project) => (
              <motion.div variants={itemVars} key={project._id} className="h-full">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        
        ) : (
          <div className="text-center text-slate-500 font-medium py-16">
            No projects available right now.
          </div>
        )}
      </div>
    </div>
  );
}
