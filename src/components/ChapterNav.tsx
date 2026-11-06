import type { Chapter } from '@/data/chapters';

interface ChapterNavProps {
  chapters: Chapter[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Vertical chapter progress indicator.
 * Shows dots for each chapter with the current chapter highlighted.
 */
export function ChapterNav({ chapters, currentIndex, onSelect }: ChapterNavProps) {
  return (
    <nav
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
      aria-label="Chapter navigation"
      role="tablist"
    >
      {chapters.map((chapter, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;

        return (
          <button
            key={chapter.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
            onClick={() => onSelect(index)}
            className="group relative flex items-center"
          >
            {/* Dot */}
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'bg-cyan-400 border-cyan-400 scale-125'
                  : isPast
                  ? 'bg-graphite-600 border-gray-600'
                  : 'bg-transparent border-gray-700 group-hover:border-gray-500'
              }`}
            />

            {/* Label tooltip */}
            <span
              className="absolute right-6 whitespace-nowrap text-xs font-mono text-gray-500 
                         opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {chapter.number} — {chapter.subtitle}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
