'use client';

import { useState, useEffect } from 'react';

const BUBBLE_COLORS = ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0', '#118AB2', '#F77F00', '#7B2CBF'];

interface Bubble {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 12 + Math.random() * 30,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
        opacity: 0.15 + Math.random() * 0.15,
      }))
    );
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
