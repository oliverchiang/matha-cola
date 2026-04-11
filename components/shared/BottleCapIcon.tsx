'use client';

interface BottleCapIconProps {
  size?: number;
  className?: string;
}

export default function BottleCapIcon({ size = 24, className = '' }: BottleCapIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring with ridges */}
      <circle cx="12" cy="12" r="11" fill="#FFD166" stroke="#F4A261" strokeWidth="1" />
      {/* Ridged edge */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x1 = 12 + Math.cos(angle) * 9.5;
        const y1 = 12 + Math.sin(angle) * 9.5;
        const x2 = 12 + Math.cos(angle) * 11;
        const y2 = 12 + Math.sin(angle) * 11;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F4A261"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Inner circle */}
      <circle cx="12" cy="12" r="7" fill="#FFD166" stroke="#E8A838" strokeWidth="0.5" />
      {/* "M" for Matha */}
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#E63946"
        fontFamily="sans-serif"
      >
        M
      </text>
    </svg>
  );
}
