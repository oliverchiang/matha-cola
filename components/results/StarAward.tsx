'use client';

import { Star } from 'lucide-react';

interface StarAwardProps {
  count: number;
  maxStars?: number;
}

export default function StarAward({ count, maxStars = 3 }: StarAwardProps) {
  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: maxStars }, (_, i) => (
        <div
          key={i}
          className={`star-drop ${i < count ? '' : 'opacity-20'}`}
          style={{ animationDelay: `${0.8 + i * 0.3}s`, animationFillMode: 'both' }}
        >
          <Star
            size={48}
            className={i < count ? 'text-fizz-yellow fill-fizz-yellow' : 'text-dark/20'}
            strokeWidth={1.5}
          />
        </div>
      ))}
    </div>
  );
}
