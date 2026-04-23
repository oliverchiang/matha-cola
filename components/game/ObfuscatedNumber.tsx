'use client';

interface ObfuscatedNumberProps {
  value: number | string;
  /** Seed for deterministic jitter — usually the question id + a slot suffix. */
  seed?: string | number;
  className?: string;
}

// Deterministic pseudo-random in [0, 1) from a numeric seed.
function rand(n: number): number {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function seedToNumber(seed: string | number): number {
  if (typeof seed === 'number') return seed;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return h;
}

/**
 * Renders a number with per-digit rotation/skew/vertical jitter to make it
 * harder for OCR (Google Lens, ChatGPT screenshot, etc.) to read. Kids read
 * the digits with no trouble because they're still recognisable glyphs.
 *
 * Exposed to screen readers via aria-label.
 */
export default function ObfuscatedNumber({
  value,
  seed = 0,
  className = '',
}: ObfuscatedNumberProps) {
  const str = String(value);
  const base = seedToNumber(seed);

  return (
    <span className={className} aria-label={str} role="img">
      {[...str].map((ch, i) => {
        const s = base + i * 7.13;
        const rotate = (rand(s) - 0.5) * 18; // ±9deg
        const skewX = (rand(s + 1.7) - 0.5) * 12; // ±6deg
        const y = (rand(s + 3.3) - 0.5) * 8; // ±4px
        const ml = i === 0 ? 0 : (rand(s + 5.1) - 0.5) * 8; // -4..+4px kerning
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transform: `translateY(${y.toFixed(1)}px) rotate(${rotate.toFixed(1)}deg) skewX(${skewX.toFixed(1)}deg)`,
              marginLeft: `${ml.toFixed(1)}px`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
