'use client';

import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface GameTimerProps {
  startTime: number;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export { formatTime };

export default function GameTimer({ startTime }: GameTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 200);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-1.5 text-dark/60 font-medium">
      <Timer size={18} />
      <span className="tabular-nums text-lg">{formatTime(elapsed)}</span>
    </div>
  );
}
