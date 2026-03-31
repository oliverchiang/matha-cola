'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium text-dark/60 mb-1">
        <span>Question {current + 1} of {total}</span>
      </div>
      <div className="w-full h-4 bg-white rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-bubble-blue to-success rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>
    </div>
  );
}
