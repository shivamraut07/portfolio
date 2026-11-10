import type { Chapter } from '@/data/chapters';

interface MobileChapterNavProps {
  chapters: Chapter[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

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
    <div className="surface-elevated fixed bottom-0 left-0 right-0 z-40 border-t border-[#111111]/10 bg-[#F5F5F5] dark:border-white/5 dark:bg-[#0d0d0d] md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="rounded-md p-2 text-[#444444] transition-colors hover:bg-[#111111]/5 hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Previous chapter"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-center">
          <p className="text-xs font-mono text-[#444444] dark:text-gray-500">
            {current.number} / {String(chapters.length - 1).padStart(2, '0')}
          </p>
          <p className="mt-0.5 max-w-[200px] truncate text-xs text-[#444444] dark:text-gray-400">
            {current.subtitle}
          </p>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-md p-2 text-[#444444] transition-colors hover:bg-[#111111]/5 hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Next chapter"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="h-0.5 bg-[#111111]/10 dark:bg-[#111111]">
        <div
          className="h-full bg-[#111111]/60 transition-all duration-500 dark:bg-cyan-500/50"
          style={{ width: `${((currentIndex + 1) / chapters.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
