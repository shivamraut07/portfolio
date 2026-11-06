import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that detects the user's prefers-reduced-motion setting
 * and provides a manual override toggle.
 */
export function useReducedMotion(): {
  prefersReducedMotion: boolean;
  toggleMotion: () => void;
  motionOverride: boolean | null;
} {
  const [systemPreference, setSystemPreference] = useState(false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemPreference(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSystemPreference(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionOverride((prev) => {
      if (prev === null) return !systemPreference;
      return !prev;
    });
  }, [systemPreference]);

  const prefersReducedMotion = motionOverride !== null ? motionOverride : systemPreference;

  return { prefersReducedMotion, toggleMotion, motionOverride };
}
