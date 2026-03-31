'use client';

import { motion } from 'framer-motion';
import { Operation } from '@/lib/engine/types';
import { Plus, Minus, X, Divide, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface OperationCardProps {
  operation: Operation;
  onClick: () => void;
  index: number;
}

const operationConfig: Record<Operation, { label: string; color: string; bg: string; icon: typeof Plus }> = {
  addition:       { label: 'Addition',       color: 'text-white', bg: 'bg-op-addition',       icon: Plus },
  subtraction:    { label: 'Subtraction',    color: 'text-white', bg: 'bg-op-subtraction',    icon: Minus },
  multiplication: { label: 'Multiplication', color: 'text-white', bg: 'bg-op-multiplication', icon: X },
  division:       { label: 'Division',       color: 'text-white', bg: 'bg-op-division',       icon: Divide },
  mixed:          { label: 'Mixed',          color: 'text-white', bg: 'bg-cola-red',           icon: Sparkles },
};

export default function OperationCard({ operation, onClick, index }: OperationCardProps) {
  const config = operationConfig[operation];
  const Icon = config.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.06, rotate: Math.random() > 0.5 ? 2 : -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { sounds.click(); onClick(); }}
      className={`${config.bg} ${config.color} rounded-3xl p-6 flex flex-col items-center justify-center gap-3 shadow-lg cursor-pointer
        min-h-[140px] w-full transition-shadow hover:shadow-xl
        ${operation === 'mixed' ? 'bg-gradient-to-br from-op-addition via-op-multiplication to-op-division' : ''}`}
    >
      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
        <Icon size={32} strokeWidth={3} />
      </div>
      <span className="text-xl font-bold">{config.label}</span>
    </motion.button>
  );
}
