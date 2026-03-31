'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { sounds } from '@/lib/sounds';

interface CountdownOverlayProps {
  onComplete: () => void;
}

const colors = ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0'];

export default function CountdownOverlay({ onComplete }: CountdownOverlayProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      sounds.countdownGo();
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
    sounds.countdownBeep();
    const timer = setTimeout(() => setCount(count - 1), 800);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 3, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="text-9xl font-bold select-none"
          style={{ color: colors[count] }}
        >
          {count === 0 ? 'GO!' : count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
