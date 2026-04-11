'use client';

import { motion } from 'framer-motion';
import { AvatarConfig, DEFAULT_AVATAR } from '@/lib/engine/profileTypes';
import { getAvatarLayer } from '@/lib/avatar/avatarLayers';
import { getMarketplaceItem } from '@/lib/data/marketplaceItems';

type AvatarState = 'idle' | 'cheer' | 'encourage' | 'celebrate' | 'think';

interface AvatarRendererProps {
  avatar?: AvatarConfig;
  state?: AvatarState;
  size?: number;
}

const stateAnimations = {
  idle: {
    y: [0, -6, 0],
    rotate: [0, 1.5, -1.5, 0],
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
    rotate: [0, -8, 8, -4, 0],
    scale: [1, 1.2, 1, 1.1, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
  },
  think: {
    rotate: [0, 4, 0],
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export default function AvatarRenderer({ avatar, state = 'idle', size = 120 }: AvatarRendererProps) {
  const config = avatar || DEFAULT_AVATAR;
  const anim = stateAnimations[state];

  const mouthPath = state === 'cheer' || state === 'celebrate'
    ? 'M 33 73 Q 50 92 67 73'          // huge grin
    : state === 'encourage'
      ? 'M 37 78 Q 50 72 63 78'         // gentle smile
      : state === 'think'
        ? 'M 40 77 Q 50 77 60 77'       // flat
        : 'M 34 74 Q 50 88 66 74';      // happy

  const eyeScale = state === 'cheer' || state === 'celebrate' ? 1.15 : 1;

  const dark = darkenColor(config.bottleColor, 20);
  const light = lightenColor(config.bottleColor, 18);
  const lighter = lightenColor(config.bottleColor, 35);
  const outline = darkenColor(config.bottleColor, 40);

  const hasCustomLabel = config.bottleLabel !== null;
  const hasCustomShoes = config.shoes !== null;

  return (
    <motion.div
      animate={anim}
      style={{ width: size, height: size * 1.75 }}
      className="relative select-none"
    >
      <svg viewBox="-10 -30 120 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          {/* Glossy body gradient */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={lighter} />
            <stop offset="40%" stopColor={light} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
          {/* Neck gradient */}
          <linearGradient id="neckGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={lighter} />
            <stop offset="100%" stopColor={config.bottleColor} />
          </linearGradient>
          {/* Cap gradient */}
          <linearGradient id="capGrad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor={lightenColor(config.skinColor, 20)} />
            <stop offset="100%" stopColor={darkenColor(config.skinColor, 10)} />
          </linearGradient>
          {/* Glossy shine */}
          <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* === CAPE (behind everything) === */}
        {config.shirt === 'shirt-superhero' && getAvatarLayer('shirt-superhero')}

        {/* === DROP SHADOW === */}
        <ellipse cx="50" cy="140" rx="22" ry="5" fill="#2D3436" opacity="0.12" />

        {/* === LEGS (behind body) === */}
        <rect x="33" y="106" width="11" height="26" rx="5.5" fill={config.bottleColor} stroke={outline} strokeWidth="2.5" />
        <rect x="56" y="106" width="11" height="26" rx="5.5" fill={config.bottleColor} stroke={outline} strokeWidth="2.5" />

        {/* === SHOES === */}
        {hasCustomShoes ? (
          getAvatarLayer(getMarketplaceItem(config.shoes!)?.svgLayerKey || '')
        ) : (
          <>
            <ellipse cx="34" cy="133" rx="11" ry="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 30)} strokeWidth="2.5" />
            <ellipse cx="34" cy="131" rx="8" ry="3" fill={lightenColor(config.skinColor, 25)} opacity="0.5" />
            <ellipse cx="66" cy="133" rx="11" ry="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 30)} strokeWidth="2.5" />
            <ellipse cx="66" cy="131" rx="8" ry="3" fill={lightenColor(config.skinColor, 25)} opacity="0.5" />
          </>
        )}

        {/* === ARMS (behind body) === */}
        {state === 'cheer' || state === 'celebrate' ? (
          <>
            {/* Arms up */}
            <line x1="22" y1="56" x2="4" y2="32" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="22" y1="56" x2="4" y2="32" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="2" cy="30" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
            <line x1="78" y1="56" x2="96" y2="32" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="78" y1="56" x2="96" y2="32" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="98" cy="30" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
          </>
        ) : state === 'encourage' ? (
          <>
            <line x1="22" y1="62" x2="6" y2="50" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="22" y1="62" x2="6" y2="50" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="4" cy="48" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
            <line x1="78" y1="62" x2="92" y2="68" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="78" y1="62" x2="92" y2="68" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="94" cy="69" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
          </>
        ) : (
          <>
            <line x1="22" y1="60" x2="8" y2="76" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="22" y1="60" x2="8" y2="76" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="6" cy="78" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
            <line x1="78" y1="60" x2="92" y2="76" stroke={outline} strokeWidth="10" strokeLinecap="round" />
            <line x1="78" y1="60" x2="92" y2="76" stroke={config.bottleColor} strokeWidth="7" strokeLinecap="round" />
            <circle cx="94" cy="78" r="6" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="2" />
          </>
        )}

        {/* === BOTTLE BODY (main shape) === */}
        <rect x="18" y="34" width="64" height="78" rx="18" fill="url(#bodyGrad)" stroke={outline} strokeWidth="3" />
        {/* Glossy highlight stripe */}
        <rect x="24" y="38" width="16" height="60" rx="8" fill="url(#shine)" />

        {/* === SHIRT OVERLAY === */}
        {config.shirt && config.shirt !== 'shirt-superhero' && getAvatarLayer(
          getMarketplaceItem(config.shirt)?.svgLayerKey || ''
        )}

        {/* === BOTTLE NECK === */}
        <rect x="34" y="14" width="32" height="26" rx="8" fill="url(#neckGrad)" stroke={outline} strokeWidth="3" />
        {/* Neck highlight */}
        <rect x="38" y="18" width="8" height="16" rx="4" fill="white" opacity="0.18" />

        {/* === BOTTLE CAP (ridged) === */}
        <rect x="31" y="6" width="38" height="14" rx="7" fill="url(#capGrad)" stroke={darkenColor(config.skinColor, 25)} strokeWidth="2.5" />
        {/* Cap ridges */}
        <line x1="36" y1="7" x2="36" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        <line x1="42" y1="7" x2="42" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        <line x1="48" y1="7" x2="48" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="7" x2="54" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="7" x2="60" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        <line x1="66" y1="7" x2="66" y2="19" stroke={darkenColor(config.skinColor, 15)} strokeWidth="1" opacity="0.4" />
        {/* Cap top highlight */}
        <rect x="35" y="8" width="20" height="4" rx="2" fill="white" opacity="0.25" />

        {/* === LABEL === */}
        {hasCustomLabel ? (
          getAvatarLayer(getMarketplaceItem(config.bottleLabel!)?.svgLayerKey || '')
        ) : (
          <>
            <rect x="26" y="56" width="48" height="24" rx="6" fill="white" stroke={outline} strokeWidth="1.5" />
            <rect x="28" y="58" width="44" height="20" rx="4" fill="white" />
            <text x="50" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill={config.bottleColor} fontFamily="sans-serif" stroke={outline} strokeWidth="0.3">
              MATHA
            </text>
          </>
        )}

        {/* === FACE === */}
        {/* Eyes — big bold Brawl Stars style */}
        <motion.g animate={{ scale: eyeScale }} style={{ originX: '50%', originY: '45%' }}>
          {/* Left eye */}
          <ellipse cx="38" cy="45" rx="8" ry="8.5" fill="white" stroke={outline} strokeWidth="2.5" />
          <ellipse cx="40" cy="45" rx="4.5" ry="5" fill="#2D3436" />
          <circle cx="42" cy="43" r="2" fill="white" />
          <circle cx="39" cy="47" r="0.8" fill="white" opacity="0.5" />
          {/* Right eye */}
          <ellipse cx="62" cy="45" rx="8" ry="8.5" fill="white" stroke={outline} strokeWidth="2.5" />
          <ellipse cx="64" cy="45" rx="4.5" ry="5" fill="#2D3436" />
          <circle cx="66" cy="43" r="2" fill="white" />
          <circle cx="63" cy="47" r="0.8" fill="white" opacity="0.5" />
        </motion.g>

        {/* Eyebrows */}
        {(state === 'cheer' || state === 'celebrate') && (
          <>
            <line x1="30" y1="33" x2="44" y2="34" stroke={outline} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="34" x2="70" y2="33" stroke={outline} strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Sunglasses overlay */}
        {config.accessory === 'acc-cool-shades' && getAvatarLayer('acc-cool-shades')}
        {config.accessory === 'acc-heart-glasses' && getAvatarLayer('acc-heart-glasses')}

        {/* Mouth — thick and bold */}
        <motion.path
          d={mouthPath}
          stroke="#2D3436"
          strokeWidth="3"
          strokeLinecap="round"
          fill={state === 'cheer' || state === 'celebrate' ? '#2D3436' : 'none'}
        />
        {/* Tongue on big smile */}
        {(state === 'cheer' || state === 'celebrate') && (
          <ellipse cx="50" cy="82" rx="5" ry="3" fill="#E63946" />
        )}

        {/* Cheek blush */}
        <circle cx="24" cy="54" r="5" fill="#FF69B4" opacity="0.35" />
        <circle cx="76" cy="54" r="5" fill="#FF69B4" opacity="0.35" />

        {/* === FIZZ BUBBLES (punchy) === */}
        <motion.circle
          cx="42" cy="4" r="3.5"
          fill={config.skinColor}
          stroke={darkenColor(config.skinColor, 15)}
          strokeWidth="1"
          opacity="0.8"
          animate={{ y: [0, -10, -22], opacity: [0.8, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="56" cy="2" r="2.5"
          fill="#4ECDC4"
          stroke="#3BA8A0"
          strokeWidth="0.8"
          opacity="0.7"
          animate={{ y: [0, -14, -26], opacity: [0.7, 0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="48" cy="5" r="2"
          fill="#06D6A0"
          stroke="#05B888"
          strokeWidth="0.6"
          opacity="0.6"
          animate={{ y: [0, -8, -18], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        />

        {/* === EQUIPPABLE LAYERS === */}
        {/* Hair */}
        {config.hair && getAvatarLayer(getMarketplaceItem(config.hair)?.svgLayerKey || '')}

        {/* Hat */}
        {config.hat && getAvatarLayer(getMarketplaceItem(config.hat)?.svgLayerKey || '')}

        {/* Headphones */}
        {config.accessory === 'acc-headphones' && getAvatarLayer('acc-headphones')}

        {/* Other accessories (chain, wings, stanley cup, etc) */}
        {config.accessory && config.accessory !== 'acc-cool-shades' && config.accessory !== 'acc-heart-glasses' && config.accessory !== 'acc-headphones' && getAvatarLayer(
          getMarketplaceItem(config.accessory)?.svgLayerKey || ''
        )}

        {/* === MATH BUBBLES (bold outlined) === */}
        <motion.g
          animate={{ y: [0, -14, -28], opacity: [0.9, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
        >
          <circle cx="35" cy="-2" r="7" fill={config.skinColor} stroke={darkenColor(config.skinColor, 20)} strokeWidth="1.5" opacity="0.4" />
          <text x="35" y="2" textAnchor="middle" fontSize="9" fill="#2D3436" fontWeight="bold">+</text>
        </motion.g>
        <motion.g
          animate={{ y: [0, -16, -32], opacity: [0.9, 0.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
        >
          <circle cx="62" cy="-4" r="7" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" opacity="0.4" />
          <text x="62" y="0" textAnchor="middle" fontSize="9" fill="#2D3436" fontWeight="bold">{'\u00d7'}</text>
        </motion.g>
      </svg>
    </motion.div>
  );
}

function lightenColor(hex: string, percent: number): string {
  return adjustColor(hex, percent);
}

function darkenColor(hex: string, percent: number): string {
  return adjustColor(hex, -percent);
}

function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;

  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  l = Math.max(0, Math.min(1, l + percent / 100));

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
