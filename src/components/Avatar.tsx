import { motion, type Variants } from 'framer-motion';

interface AvatarProps {
  isMoving: boolean;
  reducedMotion: boolean;
  direction?: 'left' | 'right';
}

/**
 * Silicon Jack Avatar — Stylised engineering character on a wheeled chassis.
 * Seated on a minimal engineering studio chair with wheels.
 * Includes "SJ" insignia on the technical jacket.
 */
export function Avatar({ isMoving, reducedMotion, direction = 'left' }: AvatarProps) {
  // Wheel rotation matches movement direction
  const rotateDeg = direction === 'left' ? -360 : 360;

  const wheelVariants: Variants = {
    idle: { rotate: 0 },
    spinning: {
      rotate: rotateDeg,
      transition: {
        duration: 0.75,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className="relative w-full h-full flex items-end justify-center select-none"
      aria-label="Silicon Jack avatar seated on engineering mobility chassis"
    >
      <svg
        viewBox="0 0 280 400"
        className="w-full h-auto max-w-[280px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#26262e" />
            <stop offset="50%" stopColor="#18181c" />
            <stop offset="100%" stopColor="#111114" />
          </linearGradient>
          <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22222a" />
            <stop offset="100%" stopColor="#141418" />
          </linearGradient>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ─── Ambient Glow beneath chassis ─── */}
        <ellipse cx="140" cy="388" rx="80" ry="6" fill="#22d3ee" opacity="0.08" />

        {/* ─── Engineering Chassis Platform ─── */}
        <rect
          x="45"
          y="336"
          width="190"
          height="16"
          rx="8"
          fill="url(#chassisGrad)"
          stroke="#2e2e38"
          strokeWidth="1.5"
        />
        {/* Chassis accent circuit trace */}
        <line x1="65" y1="344" x2="215" y2="344" stroke="#22d3ee" strokeWidth="0.8" opacity="0.5" />
        <circle cx="65" cy="344" r="2" fill="#22d3ee" opacity="0.7" />
        <circle cx="215" cy="344" r="2" fill="#22d3ee" opacity="0.7" />

        {/* ─── Left Wheel Assembly ─── */}
        <motion.g
          variants={reducedMotion ? undefined : wheelVariants}
          animate={isMoving && !reducedMotion ? 'spinning' : 'idle'}
          style={{ originX: '80px', originY: '366px' }}
        >
          <circle cx="80" cy="366" r="20" fill="#141418" stroke="#2e2e38" strokeWidth="2" />
          <circle cx="80" cy="366" r="14" fill="#1c1c22" stroke="#26262e" strokeWidth="1" />
          <circle cx="80" cy="366" r="4" fill="#22d3ee" opacity="0.8" />
          {/* Wheel spokes */}
          <line x1="80" y1="348" x2="80" y2="384" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
          <line x1="62" y1="366" x2="98" y2="366" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
          <line x1="67" y1="353" x2="93" y2="379" stroke="#2e2e38" strokeWidth="0.8" />
          <line x1="67" y1="379" x2="93" y2="353" stroke="#2e2e38" strokeWidth="0.8" />
        </motion.g>

        {/* ─── Right Wheel Assembly ─── */}
        <motion.g
          variants={reducedMotion ? undefined : wheelVariants}
          animate={isMoving && !reducedMotion ? 'spinning' : 'idle'}
          style={{ originX: '200px', originY: '366px' }}
        >
          <circle cx="200" cy="366" r="20" fill="#141418" stroke="#2e2e38" strokeWidth="2" />
          <circle cx="200" cy="366" r="14" fill="#1c1c22" stroke="#26262e" strokeWidth="1" />
          <circle cx="200" cy="366" r="4" fill="#22d3ee" opacity="0.8" />
          {/* Wheel spokes */}
          <line x1="200" y1="348" x2="200" y2="384" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
          <line x1="182" y1="366" x2="218" y2="366" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
          <line x1="187" y1="353" x2="213" y2="379" stroke="#2e2e38" strokeWidth="0.8" />
          <line x1="187" y1="379" x2="213" y2="353" stroke="#2e2e38" strokeWidth="0.8" />
        </motion.g>

        {/* ─── Minimal Studio Chair / Seat ─── */}
        <rect x="88" y="285" width="104" height="52" rx="8" fill="#18181e" stroke="#26262e" strokeWidth="1" />
        <rect x="94" y="290" width="92" height="42" rx="5" fill="#121216" />
        {/* Chair back support */}
        <rect x="134" y="250" width="12" height="40" rx="3" fill="#202028" />

        {/* ─── Torso / Technical Jacket ─── */}
        <rect x="98" y="175" width="84" height="120" rx="12" fill="url(#jacketGrad)" stroke="#2b2b36" strokeWidth="1" />
        {/* Zipper & Technical seams */}
        <line x1="140" y1="180" x2="140" y2="290" stroke="#2a2a34" strokeWidth="1.2" />
        {/* Collar accents */}
        <path d="M125 175 L140 190 L155 175" stroke="#22d3ee" strokeWidth="1" opacity="0.4" fill="none" />
        
        {/* ─── SJ Insignia on Jacket ─── */}
        <g transform="translate(140, 226)">
          <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#0c1824" stroke="#22d3ee" strokeWidth="0.8" strokeOpacity="0.5" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="#22d3ee"
            fontSize="13"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            letterSpacing="0.05em"
          >
            SJ
          </text>
        </g>

        {/* Subtle Cyber Circuit accents on Jacket */}
        <path d="M112 245 L122 245 L122 260 L130 260" stroke="#22d3ee" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <circle cx="130" cy="260" r="1.5" fill="#22d3ee" opacity="0.4" />
        <path d="M168 245 L158 245 L158 260 L150 260" stroke="#22d3ee" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <circle cx="150" cy="260" r="1.5" fill="#22d3ee" opacity="0.4" />

        {/* ─── Folded Arms Pose ─── */}
        {/* Left shoulder/arm */}
        <path
          d="M98 190 C80 215 82 255 108 275"
          stroke="#1b1b22"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M98 190 C80 215 82 255 108 275"
          stroke="#262632"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right shoulder/arm */}
        <path
          d="M182 190 C200 215 198 255 172 275"
          stroke="#1b1b22"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M182 190 C200 215 198 255 172 275"
          stroke="#262632"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        {/* Folded Hands Center */}
        <ellipse cx="140" cy="274" rx="26" ry="11" fill="#202028" stroke="#2a2a36" strokeWidth="1" />

        {/* ─── Neck ─── */}
        <rect x="128" y="156" width="24" height="24" rx="4" fill="#d9bca0" />

        {/* ─── Head & Calm Expression ─── */}
        <ellipse cx="140" cy="126" rx="38" ry="44" fill="#d9bca0" />

        {/* ─── Hair (Dark Anime-inspired) ─── */}
        <path
          d="M96 115 C92 75 140 60 178 75 C192 100 188 135 186 142 C184 125 176 100 170 95 C155 86 130 86 114 96 C105 104 98 120 96 115 Z"
          fill="#111116"
        />
        {/* Hair Fringe Layers */}
        <path
          d="M106 95 Q125 118 140 92 Q158 116 174 96 C166 84 148 78 140 78 C128 78 114 84 106 95 Z"
          fill="#181820"
        />
        <path
          d="M120 90 L128 110 L136 90 L146 112 L154 90"
          stroke="#111116"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/* ─── Eyes & Calm Demeanor ─── */}
        <ellipse cx="125" cy="128" rx="6.5" ry="4.5" fill="#141418" />
        <ellipse cx="155" cy="128" rx="6.5" ry="4.5" fill="#141418" />
        {/* Eye reflections */}
        <circle cx="127" cy="127" r="1.8" fill="#ffffff" />
        <circle cx="157" cy="127" r="1.8" fill="#ffffff" />
        {/* Eyebrows */}
        <path d="M118 120 Q126 117 133 120" stroke="#1c1c24" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M147 120 Q154 117 162 120" stroke="#1c1c24" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Calm, confident smile */}
        <path d="M133 145 Q140 150 147 145" stroke="#a08064" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
