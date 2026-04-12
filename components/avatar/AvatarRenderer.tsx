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
    y: [0, -5, 0],
    rotate: [0, 1, -1, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
  cheer: {
    y: [0, -18, 0],
    scale: [1, 1.12, 1],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  encourage: {
    x: [-3, 3, -3, 3, 0],
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
  celebrate: {
    y: [0, -22, 0, -12, 0],
    rotate: [0, -8, 8, -4, 0],
    scale: [1, 1.18, 1, 1.08, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const },
  },
  think: {
    rotate: [0, 3, 0],
    y: [0, -2, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export default function AvatarRenderer({ avatar, state = 'idle', size = 120 }: AvatarRendererProps) {
  const config = avatar || DEFAULT_AVATAR;
  const anim = stateAnimations[state];
  const skin = config.skinColor;
  const skinDark = darken(skin, 15);
  const skinLight = lighten(skin, 15);
  const outline = '#2D3436';

  const isCheer = state === 'cheer' || state === 'celebrate';

  const mouthPath = isCheer
    ? 'M 38 62 Q 50 74 62 62'   // big open grin
    : state === 'encourage'
      ? 'M 40 64 Q 50 60 60 64'  // gentle smile
      : state === 'think'
        ? 'M 42 63 Q 50 63 58 63' // flat
        : 'M 39 62 Q 50 70 61 62'; // happy smile

  const hasShirt = config.shirt !== null;
  const hasCustomShoes = config.shoes !== null;

  // Default shirt color
  const shirtColor = '#4ECDC4';
  const shirtDark = '#3BA8A0';

  return (
    <motion.div
      animate={anim}
      style={{ width: size, height: size * 1.6 }}
      className="relative select-none"
    >
      <svg viewBox="-5 -20 110 175" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="skinGrad" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={skinLight} />
            <stop offset="100%" stopColor={skin} />
          </linearGradient>
          <linearGradient id="shirtGrad" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={lighten(shirtColor, 10)} />
            <stop offset="100%" stopColor={shirtColor} />
          </linearGradient>
        </defs>

        {/* === DROP SHADOW === */}
        <ellipse cx="50" cy="148" rx="20" ry="4" fill={outline} opacity="0.1" />

        {/* === LEGS === */}
        <rect x="34" y="112" width="12" height="28" rx="6" fill={skin} stroke={outline} strokeWidth="2.5" />
        <rect x="54" y="112" width="12" height="28" rx="6" fill={skin} stroke={outline} strokeWidth="2.5" />
        {/* Shorts/pants */}
        <rect x="32" y="108" width="16" height="14" rx="5" fill={outline} stroke={outline} strokeWidth="1" opacity="0.85" />
        <rect x="52" y="108" width="16" height="14" rx="5" fill={outline} stroke={outline} strokeWidth="1" opacity="0.85" />

        {/* === SHOES === */}
        {hasCustomShoes ? (
          getAvatarLayer(getMarketplaceItem(config.shoes!)?.svgLayerKey || '')
        ) : (
          <>
            <ellipse cx="37" cy="141" rx="12" ry="6" fill="#E63946" stroke={outline} strokeWidth="2.5" />
            <ellipse cx="37" cy="139" rx="8" ry="3" fill="#FF6B6B" opacity="0.4" />
            <ellipse cx="63" cy="141" rx="12" ry="6" fill="#E63946" stroke={outline} strokeWidth="2.5" />
            <ellipse cx="63" cy="139" rx="8" ry="3" fill="#FF6B6B" opacity="0.4" />
          </>
        )}

        {/* === BODY / TORSO === */}
        <path d="M28 68 Q28 58 38 55 L62 55 Q72 58 72 68 L72 112 Q72 118 62 118 L38 118 Q28 118 28 112 Z"
          fill={hasShirt ? 'url(#shirtGrad)' : skin} stroke={outline} strokeWidth="2.5" />
        {/* Default shirt stripe detail */}
        {!hasShirt && (
          <>
            <rect x="30" y="65" width="40" height="48" rx="8" fill={shirtColor} stroke={outline} strokeWidth="2" />
            <rect x="30" y="65" width="40" height="48" rx="8" fill="url(#shirtGrad)" />
            <line x1="42" y1="68" x2="42" y2="110" stroke={shirtDark} strokeWidth="1.5" opacity="0.3" />
            <line x1="58" y1="68" x2="58" y2="110" stroke={shirtDark} strokeWidth="1.5" opacity="0.3" />
            {/* Collar */}
            <path d="M40 65 L50 72 L60 65" stroke={shirtDark} strokeWidth="2" fill="none" />
          </>
        )}
        {/* Shirt overlay from equipped item */}
        {config.shirt && getAvatarLayer(getMarketplaceItem(config.shirt)?.svgLayerKey || '')}
        {/* Body shine */}
        <rect x="32" y="68" width="10" height="30" rx="5" fill="white" opacity="0.1" />

        {/* === ARMS === */}
        {isCheer ? (
          <>
            {/* Arms up */}
            <line x1="28" y1="70" x2="10" y2="42" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="28" y1="70" x2="10" y2="42" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="8" cy="39" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
            <line x1="72" y1="70" x2="90" y2="42" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="72" y1="70" x2="90" y2="42" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="92" cy="39" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
          </>
        ) : state === 'encourage' ? (
          <>
            <line x1="28" y1="74" x2="10" y2="62" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="28" y1="74" x2="10" y2="62" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="8" cy="60" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
            <line x1="72" y1="74" x2="90" y2="80" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="72" y1="74" x2="90" y2="80" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="92" cy="82" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
          </>
        ) : (
          <>
            {/* Arms at sides */}
            <line x1="28" y1="72" x2="12" y2="92" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="28" y1="72" x2="12" y2="92" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="10" cy="94" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
            <line x1="72" y1="72" x2="88" y2="92" stroke={outline} strokeWidth="12" strokeLinecap="round" />
            <line x1="72" y1="72" x2="88" y2="92" stroke={skin} strokeWidth="8" strokeLinecap="round" />
            <circle cx="90" cy="94" r="7" fill={skin} stroke={outline} strokeWidth="2.5" />
          </>
        )}

        {/* === HEAD (big, Brawl Stars style) === */}
        <circle cx="50" cy="32" r="30" fill="url(#skinGrad)" stroke={outline} strokeWidth="3" />
        {/* Head shine */}
        <ellipse cx="40" cy="20" rx="12" ry="8" fill="white" opacity="0.12" />

        {/* === EARS === */}
        <circle cx="20" cy="34" r="5" fill={skin} stroke={outline} strokeWidth="2.5" />
        <circle cx="20" cy="34" r="2.5" fill={skinDark} opacity="0.3" />
        <circle cx="80" cy="34" r="5" fill={skin} stroke={outline} strokeWidth="2.5" />
        <circle cx="80" cy="34" r="2.5" fill={skinDark} opacity="0.3" />

        {/* === FACE === */}
        {/* Eyes — big bold */}
        <motion.g animate={{ scale: isCheer ? 1.1 : 1 }} style={{ originX: '50%', originY: '35%' }}>
          <ellipse cx="38" cy="33" rx="8" ry="9" fill="white" stroke={outline} strokeWidth="2.5" />
          <ellipse cx="40" cy="34" rx="4.5" ry="5" fill="#2D3436" />
          <circle cx="42" cy="32" r="2" fill="white" />
          <circle cx="39" cy="36" r="0.8" fill="white" opacity="0.5" />

          <ellipse cx="62" cy="33" rx="8" ry="9" fill="white" stroke={outline} strokeWidth="2.5" />
          <ellipse cx="64" cy="34" rx="4.5" ry="5" fill="#2D3436" />
          <circle cx="66" cy="32" r="2" fill="white" />
          <circle cx="63" cy="36" r="0.8" fill="white" opacity="0.5" />
        </motion.g>

        {/* Eyebrows */}
        {isCheer && (
          <>
            <line x1="30" y1="21" x2="44" y2="22" stroke={outline} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="22" x2="70" y2="21" stroke={outline} strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Nose — simple dot */}
        <ellipse cx="50" cy="42" rx="2.5" ry="2" fill={skinDark} opacity="0.4" />

        {/* Face accessory (glasses etc) */}
        {config.face && getAvatarLayer(getMarketplaceItem(config.face)?.svgLayerKey || '')}

        {/* Mouth */}
        <motion.path
          d={mouthPath}
          stroke={outline}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill={isCheer ? outline : 'none'}
        />
        {isCheer && (
          <ellipse cx="50" cy="68" rx="5" ry="3" fill="#E63946" />
        )}

        {/* Cheek blush */}
        <circle cx="26" cy="42" r="5" fill="#FF69B4" opacity="0.25" />
        <circle cx="74" cy="42" r="5" fill="#FF69B4" opacity="0.25" />

        {/* === HAIR (above head) === */}
        {/* Default short hair if none equipped */}
        {!config.hair && !config.hat && (
          <path d="M22 24 Q22 4 50 0 Q78 4 78 24 Q78 14 50 10 Q22 14 22 24 Z"
            fill={outline} opacity="0.7" />
        )}
        {config.hair && getAvatarLayer(getMarketplaceItem(config.hair)?.svgLayerKey || '')}

        {/* === HAT (topmost) === */}
        {config.hat && getAvatarLayer(getMarketplaceItem(config.hat)?.svgLayerKey || '')}

        {/* === ACCESSORY (non-face) === */}
        {config.accessory && getAvatarLayer(getMarketplaceItem(config.accessory)?.svgLayerKey || '')}
      </svg>
    </motion.div>
  );
}

function lighten(hex: string, pct: number): string { return adjust(hex, pct); }
function darken(hex: string, pct: number): string { return adjust(hex, -pct); }

function adjust(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  let r = (n >> 16) & 0xFF, g = (n >> 8) & 0xFF, b = n & 0xFF;
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
  l = Math.max(0, Math.min(1, l + pct / 100));
  if (s === 0) { r = g = b = l; } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
