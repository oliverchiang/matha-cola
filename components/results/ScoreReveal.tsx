'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreRevealProps {
  score: number;
}

export default function ScoreReveal({ score }: ScoreRevealProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (score === 0) return;
    const duration = 1500;
    const steps = 30;
    const increment = score / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), score);
      setDisplayScore(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      className="text-center"
    >
      <div className="text-lg font-medium text-dark/60 mb-1">Your Score</div>
      <div className="text-7xl font-bold text-cola-red">{displayScore}</div>
    </motion.div>
  );
}
