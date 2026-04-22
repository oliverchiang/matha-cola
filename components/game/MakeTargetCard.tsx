'use client';

import { motion } from 'framer-motion';
import { MakeTarget } from '@/lib/engine/types';
import { Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface MakeTargetCardProps {
  target: MakeTarget;
  onClick: () => void;
  index: number;
}

const targetColors: Record<number, string> = {
  10: 'bg-op-addition',
  20: 'bg-bubble-blue',
  30: 'bg-op-multiplication',
  40: 'bg-op-division',
  50: 'bg-cola-red',
};

export default function MakeTargetCard({ target, onClick, index }: MakeTargetCardProps) {
  const isMixed = target === 'mixed';
  const bg = isMixed
    ? 'bg-gradient-to-br from-op-addition via-op-multiplication to-op-division'
    : targetColors[target as number];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => { sounds.click(); onClick(); }}
      className={`${bg} text-white rounded-2xl shadow-lg cursor-pointer
        flex flex-col items-center justify-center gap-1 p-3 min-h-[90px]
        transition-shadow hover:shadow-xl`}
    >
      {isMixed ? (
        <>
          <Sparkles size={24} strokeWidth={2.5} />
          <span className="text-base font-bold">Mixed</span>
        </>
      ) : (
        <>
          <span className="text-3xl font-bold">{target}</span>
          <span className="text-xs font-medium opacity-80">make {target}s</span>
        </>
      )}
    </motion.button>
  );
}
