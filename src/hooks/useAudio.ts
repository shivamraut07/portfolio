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
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      setIsMuted(true);
      audio.muted = true;
      audio.currentTime = 0;
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    setHasInteracted(true);

    if (isMuted) {
      setIsMuted(false);
      if (!audio) return;

      audio.pause();
      audio.src = '/audio/intro.mpeg';
      audio.currentTime = 0;
      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      return;
    }

    setIsMuted(true);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = true;
    }
    setIsPlaying(false);
  }, [isMuted]);

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
