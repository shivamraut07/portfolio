import type { Chapter } from '@/data/chapters';

interface ChapterNavProps {
  chapters: Chapter[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function ChapterNav({ chapters, currentIndex, onSelect }: ChapterNavProps) {
  return (
    <nav
      className="fixed right-4 top-1/2 z-40 hidden max-h-screen -translate-y-1/2 flex-col items-center gap-3 overflow-y-auto pb-12 md:flex no-scrollbar"
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
            <div
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'scale-125 border-[#111111] bg-[#111111] dark:border-white dark:bg-white'
                  : isPast
                    ? 'border-[#111111]/50 bg-[#111111]/60 dark:border-gray-600 dark:bg-gray-600'
                    : 'border-[#111111]/30 bg-transparent group-hover:border-[#111111]/60 dark:border-white/20 dark:group-hover:border-white/40'
              }`}
            />

            <span className="pointer-events-none absolute right-6 whitespace-nowrap text-xs font-mono text-[#444444] opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-500">
              {chapter.number} - {chapter.subtitle}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
