import { Github, ExternalLink, Trash2, Pencil, Folder } from 'lucide-react';

interface Project {
  _id: string;
  name: string;
  description: string;
  techStack: string[];
  tags: string[];
  isFeatured: boolean;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (project: Project) => void;
}

export default function ProjectCard({ project, isAdmin, onDelete, onEdit }: ProjectCardProps) {
  return (
    <div className="term-card flex flex-col h-full bg-[#09090b] border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700 shadow-lg">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-cyan-400">
            <Folder size={20} />
          </div>
          <h3 className="font-bold text-white text-lg tracking-tight">{project.name}</h3>
        </div>
        {project.isFeatured && (
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full font-medium tracking-wide uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-6 flex-1 font-sans leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Pills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span key={i} className="text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex gap-4 pt-4 border-t border-slate-800/50 mt-auto">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
            <Github size={16} /> Code
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium">
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-dashed border-red-900/30">
          <button onClick={() => onEdit?.(project)} className="text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-all">
            <Pencil size={14} /> Edit
          </button>
          <button onClick={() => onDelete?.(project._id)} className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-all">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
