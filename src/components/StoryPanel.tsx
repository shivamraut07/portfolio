import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, Terminal } from 'lucide-react';
import type { Chapter } from '@/data/chapters';

interface StoryPanelProps {
  chapter: Chapter;
  reducedMotion: boolean;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * Story panel displaying chapter narrative.
 * Alternates side with the Avatar across chapters.
 */
export function StoryPanel({
  chapter,
  reducedMotion,
  onNextChapter,
  onPrevChapter,
  isFirst = false,
  isLast = false,
}: StoryPanelProps) {
  // Content appears on the opposite side of the avatar
  const contentSide = chapter.avatarPosition === 'left' ? 'right' : 'left';
  const slideDirection = contentSide === 'right' ? 30 : -30;

  const accentColor = chapter.accentColor === 'electric' ? '#3b82f6' : '#22d3ee';
  const accentBorder = chapter.accentColor === 'electric' ? 'border-l-blue-500' : 'border-l-cyan-400';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.id}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: slideDirection, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -slideDirection, y: -10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl flex flex-col justify-center py-6 px-2 sm:px-4"
      >
        {/* Chapter metadata tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-graphite-800 border border-subtle font-mono text-[11px] text-gray-400">
            <Terminal className="w-3 h-3 text-cyan-400" />
            CHAPTER {chapter.number}
          </span>
          <span
            className="text-[11px] font-mono tracking-wider uppercase font-semibold"
            style={{ color: accentColor }}
          >
            {chapter.subtitle}
          </span>
        </div>

        {/* Chapter Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
          {chapter.number === '00' || chapter.number === '07' ? (
            <span className="text-gradient">{chapter.title}</span>
          ) : (
            chapter.title
          )}
        </h2>

        {/* Narrative Paragraphs */}
        <div className={`space-y-4 pl-4 sm:pl-5 border-l-2 ${accentBorder} mb-8`}>
          {chapter.content.map((paragraph, index) => {
            const isPlaceholder = paragraph.startsWith('[');
            return (
              <motion.p
                key={index}
                initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.1 + index * 0.08,
                  duration: 0.35,
                }}
                className={`text-sm sm:text-base leading-relaxed ${
                  isPlaceholder
                    ? 'text-gray-500 italic font-mono text-xs border border-dashed border-gray-700/80 rounded-md p-3 bg-graphite-900/50'
                    : 'text-gray-300'
                }`}
              >
                {paragraph}
              </motion.p>
            );
          })}
        </div>

        {/* Interactive Story Progression Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {isFirst ? (
            <button
              onClick={onNextChapter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold transition-all group shadow-[0_0_15px_rgba(34,211,238,0.1)] cursor-pointer"
            >
              Start Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <>
              {!isFirst && (
                <button
                  onClick={onPrevChapter}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-graphite-800 hover:bg-graphite-700 text-gray-300 hover:text-white border border-subtle font-mono text-xs transition-colors cursor-pointer"
                  aria-label="Previous chapter"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
              )}
              {!isLast && (
                <button
                  onClick={onNextChapter}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-electric-600/20 hover:bg-electric-600/30 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 font-mono text-xs uppercase tracking-wider font-semibold transition-all group cursor-pointer shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                  aria-label="Next chapter"
                >
                  Next Chapter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </>
          )}

          {/* Quick links on final chapter */}
          {isLast && (
            <div className="flex flex-wrap gap-2 w-full mt-2">
              {[
                { label: 'View Projects', href: '#projects', primary: true },
                { label: 'GitHub', href: 'https://github.com', external: true },
                { label: 'Resume', href: '#resume' },
                { label: 'Get in Touch', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono transition-colors ${
                    link.primary
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                      : 'bg-graphite-800 text-gray-300 hover:text-white border border-subtle hover:bg-graphite-700'
                  }`}
                >
                  {link.label}
                  {link.external && <ExternalLink className="w-3 h-3 text-gray-500" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
