'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  if (streak < 2) return null;

  const flameSize = Math.min(24 + streak * 2, 40);
  const isOnFire = streak >= 5;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-lg
          ${isOnFire ? 'bg-cola-red text-white' : 'bg-fizz-yellow text-dark'}`}
      >
        <motion.div
          animate={isOnFire ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <Flame size={flameSize} className={isOnFire ? 'text-fizz-yellow' : 'text-cola-red'} />
        </motion.div>
        <motion.span
          key={streak}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          {streak}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
