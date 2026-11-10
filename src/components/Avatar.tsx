import { AnimatePresence, motion } from 'framer-motion';

interface AvatarProps {
  imageSrc: string;
  isMoving: boolean;
  reducedMotion: boolean;
  direction?: 'left' | 'right';
}

export function Avatar({ imageSrc, reducedMotion, direction = 'left' }: AvatarProps) {
  const motionStyle = reducedMotion
    ? undefined
    : {
        transform: direction === 'left' ? 'translateX(-10px)' : 'translateX(10px)',
      };

  const floatingTransition = reducedMotion
    ? undefined
    : {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };

  return (
    <div className="relative flex h-[75vh] max-h-[800px] w-full items-center justify-center select-none" aria-label="Cinematic avatar pose">
      <div className="relative flex aspect-square w-full max-w-[520px] items-center justify-center" style={{ width: 'min(100%, 75vh)' }}>
        <motion.div
          className="relative inline-flex flex-col items-center"
          style={motionStyle}
          animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={floatingTransition}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={imageSrc}
              src={imageSrc}
              alt="Silicon Jack"
              initial={reducedMotion ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
              transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: 'easeOut' }}
              className="relative z-10 max-h-[70vh] w-full max-w-[450px] object-contain grayscale contrast-[1.06] lg:max-w-[500px]"
              style={{ filter: 'drop-shadow(0 25px 30px rgba(0, 0, 0, 0.8))' }}
            />
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 left-1/2 -z-10 w-[140%] max-w-[600px] -translate-x-1/2"
            style={{ transform: 'translateX(-50%) perspective(800px) rotateX(75deg)' }}
          >
            <motion.div
              className="h-[2px] w-full bg-gradient-to-r from-transparent via-black/20 dark:via-cyan-500 to-transparent shadow-none dark:shadow-[0_0_15px_rgba(79,173,255,0.6)]"
              animate={reducedMotion ? { opacity: 0.8, scale: 1 } : { opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: reducedMotion ? 0.01 : 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
