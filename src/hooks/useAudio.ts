import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Audio playback hook for chapter narration.
 * Handles play/pause, mute, and audio element lifecycle.
 */
export function useAudio() {
  const [isMuted, setIsMuted] = useState(true); // never autoplay loud
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'none';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  const playChapterAudio = useCallback(
    (src?: string) => {
      if (!audioRef.current || !src || isMuted) return;

      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.currentTime = 0;

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Audio playback blocked by browser — graceful fallback
          setIsPlaying(false);
        });
    },
    [isMuted]
  );

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  return {
    isMuted,
    isPlaying,
    hasInteracted,
    toggleMute,
    playChapterAudio,
    stopAudio,
  };
}
