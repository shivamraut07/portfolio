import { motion } from 'framer-motion';

import { useState, useCallback, useEffect, useRef } from 'react';
import { NavBar } from './components/NavBar';
import { NetworkBackground } from './components/NetworkBackground';
import { AvatarStage } from './components/AvatarStage';
import { MobileChapterNav } from './components/MobileChapterNav';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useAudio } from './hooks/useAudio';
import { chapters, projects, personalInfo } from './data/chapters';
import { X } from 'lucide-react';
import ProjectModal, { type ProjectModalData } from './components/ProjectModal';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('journey');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectModalData | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { prefersReducedMotion, toggleMotion } = useReducedMotion();
  const { isMuted, toggleMute, playChapterAudio } = useAudio();

  const chapter = chapters[currentChapter];

  const goToChapter = useCallback(
    (index: number) => {
      if (index === currentChapter || index < 0 || index >= chapters.length) return;

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      setIsMoving(true);

      const delay = prefersReducedMotion ? 40 : 350;
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentChapter(index);
        setIsMoving(false);

        const targetChapter = chapters[index];
        if (!isMuted && targetChapter.narrationSrc) {
          playChapterAudio(targetChapter.narrationSrc);
        }
      }, delay);
    },
    [currentChapter, prefersReducedMotion, isMuted, playChapterAudio]
  );

  const goNext = useCallback(() => {
    if (currentChapter < chapters.length - 1) {
      goToChapter(currentChapter + 1);
    }
  }, [currentChapter, goToChapter]);

  const goPrev = useCallback(() => {
    if (currentChapter > 0) {
      goToChapter(currentChapter - 1);
    }
  }, [currentChapter, goToChapter]);

  const handleNavigate = useCallback(
    (id: string) => {
      setActiveSection(id);
      if (id === 'journey') {
        setActiveModal(null);
        goToChapter(0);
      } else {
        setActiveModal(id);
      }
    },
    [goToChapter]
  );

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        setActiveModal(null);
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          goToChapter(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, goToChapter]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className={isDarkMode ? 'dark' : ''}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-50 overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(79,173,255,0.08)_0%,_transparent_60%)]"
        animate={prefersReducedMotion ? { opacity: 0.8 } : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative isolate min-h-screen w-full overflow-x-hidden bg-[#F5F5F5] text-black transition-colors duration-300 dark:bg-[#151515] dark:text-white">
        <NetworkBackground isDarkMode={isDarkMode} />
        <a
          href="#stage-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-50 focus:rounded focus:border focus:border-[#111111]/10 focus:bg-[#111111]/5 focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:text-[#111111] dark:focus:border-white/10 dark:focus:bg-white/5 dark:focus:text-white"
        >
          Skip to main content
        </a>

        <NavBar
          isMuted={isMuted}
          isDarkMode={isDarkMode}
          onToggleMute={toggleMute}
          onToggleTheme={toggleTheme}
          reducedMotion={prefersReducedMotion}
          onToggleMotion={toggleMotion}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main id="stage-content" className="flex flex-1 flex-col items-start pb-16 pt-14 md:pb-0">
          <div className="sr-only" role="status" aria-live="polite">
            Chapter {chapter.number}: {chapter.title}
          </div>

          <AvatarStage
            chapter={chapter}
            isMoving={isMoving}
            reducedMotion={prefersReducedMotion}
            onNextChapter={goNext}
            onPrevChapter={goPrev}
            isFirst={currentChapter === 0}
            isLast={currentChapter === chapters.length - 1}
            onSelectProject={setActiveProject}
            onSelectChapter={goToChapter}
          />
        </main>

        <MobileChapterNav
          chapters={chapters}
          currentIndex={currentChapter}
          onPrev={goPrev}
          onNext={goNext}
        />

        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#111111]/10 bg-[#F5F5F5] p-6 shadow-2xl dark:border-white/10 dark:bg-[#111111]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between border-b border-[#111111]/10 pb-4 dark:border-white/10">
                <h3 className="flex items-center gap-2 text-lg font-mono font-semibold uppercase tracking-[0.2em] text-[#111111] dark:text-white">
                  <span className="h-2 w-2 rounded-full bg-[#111111]/70 dark:bg-white/70" />
                  {activeModal}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded p-1 text-[#444444] transition-colors hover:bg-[#111111]/5 hover:text-[#111111] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {activeModal === 'projects' && (
                <div className="space-y-4">
                  <p className="mb-2 text-xs font-mono uppercase tracking-[0.18em] text-[#444444] dark:text-gray-500">
                    Engineered systems across Computer Vision, IoT, and Edge AI:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-lg border border-[#111111]/10 bg-[#111111]/[0.02] p-4 transition-colors hover:bg-[#111111]/[0.04] dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
                      >
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#111111] dark:text-white">{proj.title}</span>
                          <span className="rounded bg-[#111111]/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#444444] dark:bg-white/5 dark:text-gray-400">
                            {proj.status}
                          </span>
                        </div>
                        <p className="mb-3 text-xs text-[#444444] dark:text-gray-400">{proj.tagline}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-[#111111]/5 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em] text-[#444444] dark:bg-[#0d0d0d] dark:text-gray-500"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === 'about' && (
                <div className="space-y-4 text-sm leading-relaxed text-[#333333] dark:text-gray-300">
                  <p className="text-base font-medium text-[#111111] dark:text-white">{personalInfo.name}</p>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#444444] dark:text-gray-500">
                    {personalInfo.tagline}
                  </p>
                  <p>
                    Specializing in the fusion of electronics hardware, embedded firmware, and real-time computer vision algorithms.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="rounded border border-[#111111]/10 bg-[#111111]/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                      <span className="block text-[#444444] dark:text-gray-500">DISCIPLINE</span>
                      <span className="text-[#111111] dark:text-white">Electronics & Telecomm.</span>
                    </div>
                    <div className="rounded border border-[#111111]/10 bg-[#111111]/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                      <span className="block text-[#444444] dark:text-gray-500">FOCUS</span>
                      <span className="text-[#111111] dark:text-white">Embedded Systems & Edge AI</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'resume' && (
                <div className="space-y-4 text-sm text-[#333333] dark:text-gray-300">
                  <p className="text-[#444444] dark:text-gray-400">
                    Engineering documentation, technical qualifications, and coursework summary.
                  </p>
                  <div className="flex items-center justify-between rounded-lg border border-dashed border-[#111111]/10 bg-[#111111]/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <div>
                      <span className="block font-medium text-[#111111] dark:text-white">Shivam_Raut_Resume.pdf</span>
                      <span className="text-xs font-mono text-[#444444] dark:text-gray-500">[PDF document placeholder]</span>
                    </div>
                    <button className="rounded border border-[#111111]/10 bg-[#111111]/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                      Download
                    </button>
                  </div>
                </div>
              )}

              {activeModal === 'contact' && (
                <div className="space-y-4 text-sm">
                  <p className="text-[#333333] dark:text-gray-300">
                    Direct channels for engineering collaboration, project inquiries, or research discussions:
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between rounded border border-[#111111]/10 bg-[#111111]/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                      <span className="text-[#444444] dark:text-gray-400">IDENTITY</span>
                      <span className="text-[#111111] dark:text-white">Silicon Jack / Shivam Raut</span>
                    </div>
                    <div className="flex items-center justify-between rounded border border-[#111111]/10 bg-[#111111]/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                      <span className="text-[#444444] dark:text-gray-400">EMAIL</span>
                      <a href="https://www.linkedin.com/in/shivam-raut-26539b341/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:underline dark:text-white">LinkedIn profile</a>
                    </div>
                    <div className="flex items-center justify-between rounded border border-[#111111]/10 bg-[#111111]/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.02]">
                      <span className="text-[#444444] dark:text-gray-400">GITHUB</span>
                      <a href="https://github.com/shivamraut07" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:underline dark:text-white">github.com/shivamraut07</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ProjectModal isOpen={!!activeProject} onClose={() => setActiveProject(null)} project={activeProject} />
      </div>
    </>
  );
}
