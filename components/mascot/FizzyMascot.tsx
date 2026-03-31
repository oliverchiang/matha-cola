'use client';

import { motion } from 'framer-motion';

type FizzyState = 'idle' | 'cheer' | 'encourage' | 'celebrate' | 'think';

interface FizzyMascotProps {
  state?: FizzyState;
  size?: number;
}

const stateAnimations = {
  idle: {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
  cheer: {
    y: [0, -20, 0],
    scale: [1, 1.15, 1],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  encourage: {
    x: [-3, 3, -3, 3, 0],
    rotate: [0, -3, 3, 0],
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
  celebrate: {
    y: [0, -25, 0, -15, 0],
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.2, 1, 1.1, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
  },
  think: {
    rotate: [0, 5, 0],
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export default function FizzyMascot({ state = 'idle', size = 120 }: FizzyMascotProps) {
  const anim = stateAnimations[state];

  // Fizzy's expression changes by state
  const mouthPath = state === 'cheer' || state === 'celebrate'
    ? 'M 35 72 Q 50 88 65 72' // big smile
    : state === 'encourage'
      ? 'M 38 78 Q 50 72 62 78' // gentle smile
      : state === 'think'
        ? 'M 42 76 Q 50 76 58 76' // neutral
        : 'M 37 74 Q 50 84 63 74'; // normal smile

  const eyeScale = state === 'cheer' || state === 'celebrate' ? 1.2 : 1;

  return (
    <motion.div
      animate={anim}
      style={{ width: size, height: size * 1.4 }}
      className="relative select-none"
    >
      <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Bottle body */}
        <rect x="20" y="35" width="60" height="75" rx="16" fill="#E63946" />
        <rect x="24" y="39" width="52" height="67" rx="12" fill="#FF6B6B" />

        {/* Bottle neck */}
        <rect x="35" y="15" width="30" height="25" rx="6" fill="#E63946" />
        <rect x="38" y="18" width="24" height="19" rx="4" fill="#FF6B6B" />

        {/* Bottle cap */}
        <rect x="33" y="8" width="34" height="12" rx="6" fill="#FFD166" />

        {/* Label */}
        <rect x="28" y="55" width="44" height="22" rx="4" fill="white" opacity="0.9" />
        <text x="50" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E63946" fontFamily="sans-serif">
          MATHA
        </text>

        {/* Eyes */}
        <motion.g animate={{ scale: eyeScale }} style={{ originX: '50%', originY: '50%' }}>
          <circle cx="38" cy="46" r="5" fill="white" />
          <circle cx="62" cy="46" r="5" fill="white" />
          <circle cx="39" cy="46" r="2.5" fill="#2D3436" />
          <circle cx="63" cy="46" r="2.5" fill="#2D3436" />
          {/* Eye shine */}
          <circle cx="40.5" cy="44.5" r="1" fill="white" />
          <circle cx="64.5" cy="44.5" r="1" fill="white" />
        </motion.g>

        {/* Mouth */}
        <motion.path
          d={mouthPath}
          stroke="#2D3436"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cheeks (blush) */}
        <circle cx="28" cy="52" r="4" fill="#FFB3BA" opacity="0.6" />
        <circle cx="72" cy="52" r="4" fill="#FFB3BA" opacity="0.6" />

        {/* Fizz bubbles coming out of top */}
        <motion.circle
          cx="42" cy="5" r="3"
          fill="#FFD166"
          opacity="0.7"
          animate={{ y: [0, -10, -20], opacity: [0.7, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="55" cy="3" r="2"
          fill="#4ECDC4"
          opacity="0.6"
          animate={{ y: [0, -12, -22], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="48" cy="6" r="2.5"
          fill="#06D6A0"
          opacity="0.5"
          animate={{ y: [0, -8, -18], opacity: [0.5, 0.3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />

        {/* Math symbol bubbles */}
        <motion.g
          animate={{ y: [0, -15, -30], opacity: [0.8, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        >
          <circle cx="35" cy="0" r="6" fill="#FFD166" opacity="0.3" />
          <text x="35" y="3" textAnchor="middle" fontSize="7" fill="#2D3436" fontWeight="bold">+</text>
        </motion.g>
        <motion.g
          animate={{ y: [0, -18, -35], opacity: [0.8, 0.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
        >
          <circle cx="60" cy="-2" r="6" fill="#4ECDC4" opacity="0.3" />
          <text x="60" y="1" textAnchor="middle" fontSize="7" fill="#2D3436" fontWeight="bold">{'\u00d7'}</text>
        </motion.g>

        {/* Arms */}
        {state === 'cheer' || state === 'celebrate' ? (
          <>
            {/* Arms up! */}
            <motion.line x1="20" y1="55" x2="8" y2="35" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
            <motion.line x1="80" y1="55" x2="92" y2="35" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : state === 'encourage' ? (
          <>
            {/* Thumbs up */}
            <line x1="20" y1="60" x2="8" y2="50" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="60" x2="88" y2="65" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Relaxed arms */}
            <line x1="20" y1="58" x2="10" y2="72" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="58" x2="90" y2="72" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* Legs */}
        <line x1="38" y1="110" x2="34" y2="130" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />
        <line x1="62" y1="110" x2="66" y2="130" stroke="#E63946" strokeWidth="4" strokeLinecap="round" />

        {/* Shoes */}
        <ellipse cx="30" cy="132" rx="8" ry="4" fill="#FFD166" />
        <ellipse cx="70" cy="132" rx="8" ry="4" fill="#FFD166" />
      </svg>
    </motion.div>
  );
}
