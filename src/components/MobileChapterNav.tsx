import type { Chapter } from '@/data/chapters';

interface MobileChapterNavProps {
  chapters: Chapter[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Mobile bottom navigation for chapter browsing.
 * Shows prev/next buttons and current chapter indicator.
 */
export function MobileChapterNav({
  chapters,
  currentIndex,
  onPrev,
  onNext,
}: MobileChapterNavProps) {
  const current = chapters[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 surface-elevated border-t border-subtle">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-graphite-700 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous chapter"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Current chapter info */}
        <div className="text-center">
          <p className="text-xs font-mono text-gray-600">
            {current.number} / {String(chapters.length - 1).padStart(2, '0')}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 max-w-[200px] truncate">
            {current.subtitle}
          </p>
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-graphite-700 
                     disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next chapter"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-graphite-800">
        <div
          className="h-full bg-cyan-500/50 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / chapters.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
