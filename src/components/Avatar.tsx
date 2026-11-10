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
    // FINAL FIX: pt-[90px] guarantees it clears the navbar. 
    // Removed strict container heights so it perfectly wraps the image.
    <div className="relative w-full pt-[90px] md:pt-[100px] pb-8 flex justify-center items-end" aria-label="Cinematic avatar pose">
      <motion.div
        className="relative flex flex-col items-center justify-end"
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
            // FINAL FIX: h-[45vh] w-auto forces the height to be exactly 45% of the screen on mobile.
            // Width will automatically shrink to fit, guaranteeing no clipping.
            className="relative z-10 h-[45vh] md:h-[65vh] max-h-[500px] md:max-h-[700px] w-auto object-contain object-bottom grayscale contrast-[1.06]"
            style={{ filter: 'drop-shadow(0 25px 30px rgba(0, 0, 0, 0.8))' }}
          />
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-[140%] max-w-[500px] -translate-x-1/2"
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
  );
}