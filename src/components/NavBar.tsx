import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { navItems } from '@/data/chapters';

interface NavBarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

/**
 * Top navigation bar with:
 * - Brand: Shivam Raut
 * - Links: Journey, Projects, About, Resume, Contact
 * - Controls: Sound Off/On toggle, Motion preference toggle
 */
export function NavBar({
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleMotion,
  activeSection,
  onNavigate,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = useCallback(
    (id: string) => {
      onNavigate(id);
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 surface-elevated border-b border-subtle backdrop-blur-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Main logo/header text: Shivam Raut */}
          <button
            onClick={() => handleNav('journey')}
            className="flex items-center gap-2.5 group text-left"
            aria-label="Shivam Raut — Home"
          >
            <span className="w-7 h-7 rounded bg-graphite-800 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors shadow-sm">
              SJ
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                Shivam Raut
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-wider hidden sm:inline">
                SILICON JACK
              </span>
            </div>
          </button>

          {/* Desktop Nav Links: Journey, Projects, About, Resume, Contact */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-mono rounded transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-graphite-700/80 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-graphite-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls: Sound toggle & Motion toggle on far right */}
          <div className="flex items-center gap-2">
            {/* Reduced Motion toggle */}
            <button
              onClick={onToggleMotion}
              className={`p-1.5 rounded border text-xs transition-colors flex items-center gap-1.5 ${
                reducedMotion
                  ? 'border-yellow-500/40 text-yellow-400 bg-graphite-800'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-graphite-800'
              }`}
              aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion'}
              title={reducedMotion ? 'Animations reduced' : 'Animations active'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px] font-mono">
                {reducedMotion ? 'Motion: Off' : 'Motion: On'}
              </span>
            </button>

            {/* Sound Off/On toggle placeholder */}
            <button
              onClick={onToggleMute}
              className={`px-2.5 py-1.5 rounded border text-xs transition-colors flex items-center gap-1.5 ${
                isMuted
                  ? 'border-subtle text-gray-400 hover:text-gray-200 bg-graphite-800/80'
                  : 'border-cyan-500/50 text-cyan-300 bg-cyan-950/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
              }`}
              aria-label={isMuted ? 'Sound Off — click to turn on' : 'Sound On — click to mute'}
              title={isMuted ? 'Turn narration audio on' : 'Mute narration audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-mono">Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-cyan-300">Sound On</span>
                </>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded text-gray-400 hover:text-white hover:bg-graphite-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-subtle bg-graphite-900/95 backdrop-blur-md px-4 py-3 space-y-1"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left px-3 py-2 text-sm font-mono uppercase tracking-wider rounded transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-graphite-800 border-l-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-graphite-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
