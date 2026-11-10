import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import { StoryPanel } from './StoryPanel';
import { Desk } from './Desk';
import type { Chapter } from '@/data/chapters';
import type { ProjectModalData } from './ProjectModal';

interface AvatarStageProps {
  chapter: Chapter;
  isMoving: boolean;
  reducedMotion: boolean;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSelectProject?: (project: ProjectModalData) => void;
  onSelectChapter: (index: number) => void;
}

export function AvatarStage({
  chapter,
  isMoving,
  reducedMotion,
  onNextChapter,
  onPrevChapter,
  isFirst,
  isLast,
  onSelectProject,
  onSelectChapter,
}: AvatarStageProps) {
  const moveDirection = chapter.avatarPosition === 'left' ? 'left' : 'right';

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 0),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 0)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative min-h-screen lg:h-screen lg:overflow-hidden w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-[35%] relative h-[60vh] lg:h-full flex flex-col justify-center items-center z-10">
          <div className="w-full flex flex-col justify-center items-center">
            <motion.div
              className="w-full max-w-[520px]"
              initial={reducedMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Avatar
                imageSrc={chapter.avatarImage}
                isMoving={isMoving}
                reducedMotion={reducedMotion}
                direction={moveDirection}
              />
            </motion.div>
            <div className="relative mx-auto mt-12 w-full max-w-sm px-4">
              <div className="absolute left-8 right-8 top-1/2 z-0 h-[1px] -translate-y-1/2 bg-white/10" />
              <div className="relative z-10 flex items-center justify-between">
                {['01', '02', '03', '04', '05', '06'].map((milestone, index) => (
                  <button
                    key={milestone}
                    onClick={() => onSelectChapter(index + 1)}
                    className="group relative flex flex-col items-center gap-2"
                    aria-label={`Go to chapter ${milestone}`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-[10px] font-mono text-gray-500 transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                      {milestone}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 dark:text-gray-500">Journey Milestones</span>
              </div>
            </div>
            <Desk />
          </div>
        </div>

        <div className="w-full lg:w-[65%] lg:h-full lg:overflow-y-auto custom-scrollbar flex flex-col gap-32 px-6 lg:px-12 pt-12 lg:pt-32 pb-32">
          <StoryPanel
            chapter={chapter}
            reducedMotion={reducedMotion}
            onSelectProject={onSelectProject}
            onNextChapter={onNextChapter}
            onPrevChapter={onPrevChapter}
            isFirst={isFirst}
            isLast={isLast}
          />
        </div>
      </div>
    </div>
  );
}

export const CinematicStage = AvatarStage;
