import { useState, useCallback, useEffect, useRef } from 'react';
import { NavBar } from './components/NavBar';
import { AvatarStage } from './components/AvatarStage';
import { ChapterNav } from './components/ChapterNav';
import { MobileChapterNav } from './components/MobileChapterNav';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useAudio } from './hooks/useAudio';
import { chapters, projects, personalInfo } from './data/chapters';
import { X } from 'lucide-react';

/**
 * Silicon Jack — Master Portfolio Application
 * Engineering portfolio for Shivam Raut
 */
export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [activeSection, setActiveSection] = useState('journey');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { prefersReducedMotion, toggleMotion } = useReducedMotion();
  const { isMuted, toggleMute, playChapterAudio } = useAudio();

  const chapter = chapters[currentChapter];

  /**
   * Navigate to a chapter with smooth avatar gliding and audio trigger
   */
  const goToChapter = useCallback(
    (index: number) => {
      if (index === currentChapter || index < 0 || index >= chapters.length) return;

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Mark avatar as moving to spin wheels and animate glide
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

  /**
   * Top navigation routing
   */
  const handleNavigate = useCallback(
    (id: string) => {
      setActiveSection(id);
      if (id === 'journey') {
        setActiveModal(null);
        goToChapter(0);
      } else {
        // Direct access modals for Projects, About, Resume, Contact
        setActiveModal(id);
      }
    },
    [goToChapter]
  );

  /**
   * Keyboard accessibility
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
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
        case 'End':
          e.preventDefault();
          goToChapter(chapters.length - 1);
          break;
      }

      // Numeric jump keys 0-7
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 0 && num < chapters.length) {
        goToChapter(num);
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
    <div className="min-h-screen bg-graphite-950 text-gray-200 selection:bg-cyan-500/30 selection:text-white flex flex-col justify-between">
      {/* Accessibility skip button */}
      <a
        href="#stage-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-16 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:font-mono focus:text-xs focus:rounded shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <NavBar
        isMuted={isMuted}
        onToggleMute={toggleMute}
        reducedMotion={prefersReducedMotion}
        onToggleMotion={toggleMotion}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Cinematic Studio Stage */}
      <main id="stage-content" className="pt-14 pb-16 md:pb-0 flex-1 flex flex-col justify-center">
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
        />
      </main>

      {/* Desktop Vertical Progress Dots */}
      <ChapterNav
        chapters={chapters}
        currentIndex={currentChapter}
        onSelect={goToChapter}
      />

      {/* Mobile Bottom Chapter Navigation */}
      <MobileChapterNav
        chapters={chapters}
        currentIndex={currentChapter}
        onPrev={goPrev}
        onNext={goNext}
      />

      {/* Direct Access Overlay Modal (Projects, About, Resume, Contact) */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-graphite-900 border border-graphite-700 rounded-xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-subtle pb-4 mb-5">
              <h3 className="text-lg font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {activeModal}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded text-gray-400 hover:text-white hover:bg-graphite-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Projects Access */}
            {activeModal === 'projects' && (
              <div className="space-y-4">
                <p className="text-xs font-mono text-gray-400 mb-2">
                  Engineered systems across Computer Vision, IoT, and Edge AI:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-lg bg-graphite-800/80 border border-subtle hover:border-cyan-500/40 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-graphite-700 text-cyan-400">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{proj.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-graphite-900 text-gray-400"
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

            {/* About Modal */}
            {activeModal === 'about' && (
              <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
                <p className="font-medium text-white text-base">
                  {personalInfo.name}
                </p>
                <p className="text-cyan-300 font-mono text-xs">
                  {personalInfo.tagline}
                </p>
                <p>
                  Specializing in the fusion of electronics hardware, embedded firmware, and real-time computer vision algorithms.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded bg-graphite-800 border border-subtle">
                    <span className="text-gray-500 block">DISCIPLINE</span>
                    <span className="text-white">Electronics & Telecomm.</span>
                  </div>
                  <div className="p-3 rounded bg-graphite-800 border border-subtle">
                    <span className="text-gray-500 block">FOCUS</span>
                    <span className="text-white">Embedded Systems & Edge AI</span>
                  </div>
                </div>
              </div>
            )}

            {/* Resume Modal */}
            {activeModal === 'resume' && (
              <div className="space-y-4 text-sm text-gray-300">
                <p className="text-gray-400">
                  Engineering documentation, technical qualifications, and coursework summary.
                </p>
                <div className="p-4 rounded-lg bg-graphite-800/60 border border-dashed border-graphite-600 flex items-center justify-between">
                  <div>
                    <span className="text-white font-medium block">Shivam_Raut_Resume.pdf</span>
                    <span className="text-xs font-mono text-gray-500">[PDF document placeholder]</span>
                  </div>
                  <button className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Contact Modal */}
            {activeModal === 'contact' && (
              <div className="space-y-4 text-sm">
                <p className="text-gray-300">
                  Direct channels for engineering collaboration, project inquiries, or research discussions:
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 rounded bg-graphite-800 border border-subtle flex items-center justify-between">
                    <span className="text-gray-400">IDENTITY</span>
                    <span className="text-cyan-300">Silicon Jack / Shivam Raut</span>
                  </div>
                  <div className="p-3 rounded bg-graphite-800 border border-subtle flex items-center justify-between">
                    <span className="text-gray-400">EMAIL</span>
                    <span className="text-white">[contact@shivamraut.dev placeholder]</span>
                  </div>
                  <div className="p-3 rounded bg-graphite-800 border border-subtle flex items-center justify-between">
                    <span className="text-gray-400">GITHUB</span>
                    <span className="text-white">[github.com/shivamraut placeholder]</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
