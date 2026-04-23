'use client';

import { useEffect, useRef, useState } from 'react';

interface QuestionTimerProps {
  durationMs: number;
  /** When this changes, the timer resets. */
  resetKey: string | number;
  /** While true, the timer pauses (e.g. while feedback is showing). */
  paused?: boolean;
  onTimeout: () => void;
}

export default function QuestionTimer({
  durationMs,
  resetKey,
  paused = false,
  onTimeout,
}: QuestionTimerProps) {
  const [remaining, setRemaining] = useState(durationMs);
  const startRef = useRef<number>(0);
  const pausedAtRef = useRef<number | null>(null);
  const pauseAccumRef = useRef(0);
  const firedRef = useRef(false);

  // Reset whenever the question changes. The rAF loop below (also keyed on
  // resetKey) will publish the new remaining value on its first tick.
  useEffect(() => {
    startRef.current = Date.now();
    pausedAtRef.current = null;
    pauseAccumRef.current = 0;
    firedRef.current = false;
  }, [resetKey, durationMs]);

  // Track pause transitions so pause time doesn't count toward the limit.
  useEffect(() => {
    if (paused) {
      if (pausedAtRef.current === null) pausedAtRef.current = Date.now();
    } else if (pausedAtRef.current !== null) {
      pauseAccumRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
  }, [paused]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const now = Date.now();
      const activePause = pausedAtRef.current ? now - pausedAtRef.current : 0;
      const elapsed = now - startRef.current - pauseAccumRef.current - activePause;
      const r = Math.max(0, durationMs - elapsed);
      setRemaining(r);
      if (r <= 0 && !firedRef.current) {
        firedRef.current = true;
        onTimeout();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onTimeout, resetKey]);

  const pct = Math.max(0, Math.min(1, remaining / durationMs));
  const seconds = Math.ceil(remaining / 1000);
  const urgent = remaining > 0 && remaining < 3000;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-baseline mb-1">
        <span className={`text-xs font-medium ${urgent ? 'text-cola-red' : 'text-dark/50'}`}>
          Time
        </span>
        <span
          className={`text-sm font-bold tabular-nums ${urgent ? 'text-cola-red' : 'text-dark/60'}`}
        >
          {seconds}s
        </span>
      </div>
      <div className="h-2 bg-dark/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${urgent ? 'bg-cola-red' : 'bg-bubble-blue'}`}
          style={{ width: `${pct * 100}%`, transition: 'width 100ms linear' }}
        />
      </div>
    </div>
  );
}
