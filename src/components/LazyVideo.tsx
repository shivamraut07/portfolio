import { useState } from 'react';

interface LazyVideoProps {
  videoSrc: string;
  thumbnailSrc?: string; // Now optional!
  altText?: string;
  className?: string;
}

export default function LazyVideo({
  videoSrc,
  className = '',
}: LazyVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/10 bg-slate-900 shadow-lg dark:border-white/10 ${className}`}
    >
      {!isPlaying ? (
        <div
          className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-slate-950"
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(true);
          }}
        >
          {/* Renders ONLY the 1st frame without downloading the full video */}
          <video
            src={`${videoSrc}#t=0.001`}
            preload="metadata"
            muted
            playsInline
            className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-50 pointer-events-none"
          />

          {/* Play Button Overlay */}
          <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600/90 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      ) : (
        <video
          src={videoSrc}
          autoPlay
          controls
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
          className="h-full w-full object-cover select-none"
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}