import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectModalData {
  title: string;
  tech: string[];
  situation: string;
  action: string;
  result: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectModalData | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="custom-scrollbar relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/90 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/90">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
            <button onClick={onClose} className="p-2 text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white" aria-label="Close project details">✕</button>
          </div>
          <div className="space-y-8 p-6 md:p-8">
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Apparatus &amp; Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => <span key={tech} className="rounded-md border border-black/10 bg-black/5 px-3 py-1 text-sm font-mono text-gray-800 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">{tech}</span>)}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2"><h4 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Situation &amp; Task</h4><p className="leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">{project.situation}</p></div>
              <div className="space-y-2"><h4 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Action</h4><p className="leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">{project.action}</p></div>
              <div className="space-y-2 md:col-span-2"><h4 className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Result</h4><p className="leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">{project.result}</p></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
