'use client';

import BottleCapIcon from '@/components/shared/BottleCapIcon';

interface BottleCapDisplayProps {
  count: number;
  size?: 'sm' | 'lg';
}

export default function BottleCapDisplay({ count, size = 'sm' }: BottleCapDisplayProps) {
  const iconSize = size === 'lg' ? 28 : 20;
  const textClass = size === 'lg' ? 'text-xl font-bold' : 'text-sm font-bold';

  return (
    <div className="flex items-center gap-1.5">
      <BottleCapIcon size={iconSize} />
      <span className={`${textClass} text-dark`}>{count}</span>
    </div>
  );
}
