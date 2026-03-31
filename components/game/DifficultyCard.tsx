'use client';

import { motion } from 'framer-motion';
import { Difficulty, Operation } from '@/lib/engine/types';
import { getDifficultyDescription } from '@/lib/engine/difficulty';
import { Smile, Brain, Flame } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface DifficultyCardProps {
  difficulty: Difficulty;
  operation: Operation;
  onClick: () => void;
  index: number;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string; icon: typeof Smile }> = {
  easy:   { label: 'Easy',   color: 'text-white', bg: 'bg-success',    icon: Smile },
  medium: { label: 'Medium', color: 'text-white', bg: 'bg-fizz-yellow', icon: Brain },
  hard:   { label: 'Hard',   color: 'text-white', bg: 'bg-cola-red',    icon: Flame },
};

export default function DifficultyCard({ difficulty, operation, onClick, index }: DifficultyCardProps) {
  const config = difficultyConfig[difficulty];
  const Icon = config.icon;

  return (
    <motion.button
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => { sounds.click(); onClick(); }}
      className={`${config.bg} ${config.color} rounded-2xl p-5 flex items-center gap-4 shadow-lg cursor-pointer w-full transition-shadow hover:shadow-xl`}
    >
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <div className="text-left">
        <div className="text-xl font-bold">{config.label}</div>
        <div className="text-sm opacity-80">{getDifficultyDescription(operation, difficulty)}</div>
      </div>
    </motion.button>
  );
}
