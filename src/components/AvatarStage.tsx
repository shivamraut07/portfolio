import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import { StoryPanel } from './StoryPanel';
import { Desk } from './Desk';
import type { Chapter } from '@/data/chapters';

interface AvatarStageProps {
  chapter: Chapter;
  isMoving: boolean;
  reducedMotion: boolean;
  onNextChapter: () => void;
  onPrevChapter: () => void;
  isFirst: boolean;
  isLast: boolean;
}

/**
 * AvatarStage — The cinematic split-screen stage for desktop & stacked for mobile.
 * 
 * - Desktop:
 *   Left side and Right side across a studio desk.
 *   Avatar glides seamlessly between Left and Right positions via Framer Motion layoutId.
 *   Active StoryPanel renders on the opposite side of the Avatar.
 * 
 * - Mobile:
 *   Avatar placed neatly on top, story panel directly below.
 */
export function AvatarStage({
  chapter,
  isMoving,
  reducedMotion,
  onNextChapter,
  onPrevChapter,
  isFirst,
  isLast,
}: AvatarStageProps) {
  const avatarOnLeft = chapter.avatarPosition === 'left';
  // Direction for wheel rotation: if avatar is moving to left or right
  const moveDirection = avatarOnLeft ? 'left' : 'right';

  return (
    <div className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-col justify-between overflow-hidden">
      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Radial soft ambient spotlight */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-electric-500/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-16 py-8">
        <div className="w-full max-w-6xl">
          {/* Desktop Split-Screen Stage */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[520px]">
            {/* Left Zone */}
            <div className="flex items-center justify-center min-h-[460px]">
              {avatarOnLeft ? (
                <motion.div
                  layoutId={reducedMotion ? undefined : 'silicon-jack-avatar'}
                  transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 18,
                    mass: 1,
                  }}
                  className="w-56 lg:w-64"
                >
                  <Avatar
                    isMoving={isMoving}
                    reducedMotion={reducedMotion}
                    direction={moveDirection}
                  />
                </motion.div>
              ) : (
                <StoryPanel
                  chapter={chapter}
                  reducedMotion={reducedMotion}
                  onNextChapter={onNextChapter}
                  onPrevChapter={onPrevChapter}
                  isFirst={isFirst}
                  isLast={isLast}
                />
              )}
            </div>

            {/* Right Zone */}
            <div className="flex items-center justify-center min-h-[460px]">
              {avatarOnLeft ? (
                <StoryPanel
                  chapter={chapter}
                  reducedMotion={reducedMotion}
                  onNextChapter={onNextChapter}
                  onPrevChapter={onPrevChapter}
                  isFirst={isFirst}
                  isLast={isLast}
                />
              ) : (
                <motion.div
                  layoutId={reducedMotion ? undefined : 'silicon-jack-avatar'}
                  transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 18,
                    mass: 1,
                  }}
                  className="w-56 lg:w-64"
                >
                  <Avatar
                    isMoving={isMoving}
                    reducedMotion={reducedMotion}
                    direction={moveDirection}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Vertical Layout: Avatar on top, Story below */}
          <div className="md:hidden flex flex-col items-center gap-4 py-4">
            <div className="w-36 max-w-[160px] shrink-0">
              <Avatar
                isMoving={isMoving}
                reducedMotion={reducedMotion}
                direction={moveDirection}
              />
            </div>
            <StoryPanel
              chapter={chapter}
              reducedMotion={reducedMotion}
              onNextChapter={onNextChapter}
              onPrevChapter={onPrevChapter}
              isFirst={isFirst}
              isLast={isLast}
            />
          </div>
        </div>
      </div>

      {/* Cinematic Studio Desk element grounding the stage */}
      <div className="w-full">
        <Desk />
      </div>
    </div>
  );
}

// Keep CinematicStage as an alias for backwards compatibility
export const CinematicStage = AvatarStage;
