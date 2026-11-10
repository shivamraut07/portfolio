import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Menu, X, Sun, Moon } from 'lucide-react';
import { navItems } from '@/data/chapters';

interface NavBarProps {
  isMuted: boolean;
  isDarkMode: boolean;
  onToggleMute: () => void;
  onToggleTheme: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function NavBar({
  isMuted,
  isDarkMode,
  onToggleMute,
  onToggleTheme,
  reducedMotion,
  onToggleMotion,
  activeSection,
  onNavigate,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = useCallback(
    (id: string) => {
      if (id === 'resume') {
        window.open('/ResumeSRip_v3.pdf', '_blank', 'noopener,noreferrer');
      } else {
        onNavigate(id);
      }
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  return (
    <header
      className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-[#EAEAEA] dark:bg-[#1A1A1A] border-b border-black/10 dark:border-black/50 shadow-sm"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <button
            onClick={() => handleNav('journey')}
            className="group flex items-center gap-2.5 text-left"
            aria-label="Shivam Raut � Home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded border border-[#111111]/10 bg-[#111111]/5 font-mono text-[10px] font-medium tracking-[0.18em] text-[#111111] transition-colors group-hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:group-hover:bg-white/10">
              SJ
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium tracking-[0.08em] text-[#111111] transition-colors group-hover:text-[#222222] dark:text-white dark:group-hover:text-gray-200">
                Shivam Raut
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Desktop navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative rounded px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono text-gray-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-cyan-500 after:transition-transform after:duration-300 after:content-[''] hover:text-white hover:after:origin-bottom-left hover:after:scale-x-100 ${
                    isActive
                      ? 'border border-[#111111]/10 bg-[#111111]/5 text-[#111111] dark:border-white/10 dark:bg-white/5 dark:text-white'
                      : 'text-[#444444] hover:bg-[#111111]/5 hover:text-[#111111] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 rounded border border-[#111111]/10 bg-white px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#111111] shadow-sm transition-colors hover:bg-[#111111]/10 dark:border-white/10 dark:bg-[#2A2A2A] dark:text-white dark:hover:bg-white/10"
              aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span className="hidden xl:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={onToggleMotion}
              className={`flex items-center gap-1.5 rounded border px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors ${
                reducedMotion
                  ? 'border-[#111111]/10 bg-[#111111]/5 text-[#111111] dark:border-white/10 dark:bg-white/5 dark:text-white'
                  : 'border-transparent text-[#444444] hover:bg-[#111111]/5 hover:text-[#111111] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
              aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion'}
              title={reducedMotion ? 'Animations reduced' : 'Animations active'}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">{reducedMotion ? 'Motion Off' : 'Motion On'}</span>
            </button>

            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors ${
                isMuted
                  ? 'border-[#111111]/10 bg-[#111111]/5 text-[#111111] hover:bg-[#111111]/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                  : 'border-[#111111]/10 bg-[#111111] text-white hover:bg-[#111111]/90 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:bg-white/5'
              }`}
              aria-label={isMuted ? 'Sound Off � click to turn on' : 'Sound On � click to mute'}
              title={isMuted ? 'Turn narration audio on' : 'Mute narration audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-[#444444] dark:text-gray-400" />
                  <span>Sound Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-white dark:text-gray-300" />
                  <span>Sound On</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded p-2 text-[#444444] transition-colors hover:bg-[#111111]/5 hover:text-[#111111] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#111111]/10 bg-[#F5F5F5] px-4 py-3 dark:border-white/5 dark:bg-[#0d0d0d] md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative block w-full rounded px-3 py-2 text-left text-[10px] font-mono uppercase tracking-[0.18em] text-gray-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-cyan-500 after:transition-transform after:duration-300 after:content-[''] hover:text-white hover:after:origin-bottom-left hover:after:scale-x-100 ${ 
                  activeSection === item.id
                    ? 'border-l border-[#111111]/20 bg-[#111111]/5 text-[#111111] dark:border-white/20 dark:bg-white/5 dark:text-white'
                    : 'text-[#444444] hover:bg-[#111111]/5 hover:text-[#111111] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
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
