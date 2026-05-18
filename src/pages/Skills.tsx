import { motion } from 'motion/react';

export default function Skills() {
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "⚡",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML / CSS", level: 95 },
        { name: "TailwindCSS", level: 90 },
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js / Express", level: 85 },
        { name: "Python", level: 80 },
        { name: "PostgreSQL / SQL", level: 75 },
        { name: "MongoDB", level: 85 },
      ]
    },
    {
      title: "Infrastructure & Tools",
      icon: "🛠️",
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "Linux / Bash", level: 75 },
        { name: "AWS (Basic)", level: 60 },
      ]
    }
  ];

  return (
    <div className="min-h-screen grid-bg w-full relative pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-500 font-mono text-sm tracking-widest mb-4 uppercase">// SKILLS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Tech Stack</h1>
          <p className="text-slate-400 font-medium">The tools and technologies I work with daily.</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVars}
              className="term-card p-8 bg-[#09090b] border border-slate-800 rounded-2xl flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-lg font-bold text-white">{category.title}</h2>
              </div>
              
              <div className="space-y-6 flex-1">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-mono font-medium">
                      <span className="text-slate-200">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      {/* Progress Bar Fill */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIdx * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
