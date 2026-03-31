'use client';

import { motion } from 'framer-motion';
import { AnswerResult } from '@/lib/engine/types';
import { Target, Clock, Flame } from 'lucide-react';

interface StatsDisplayProps {
  results: AnswerResult[];
  bestStreak: number;
}

export default function StatsDisplay({ results, bestStreak }: StatsDisplayProps) {
  const correct = results.filter(r => r.correct).length;
  const total = results.length;
  const avgTime = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.timeMs, 0) / results.length / 1000 * 10) / 10
    : 0;

  const stats = [
    { icon: Target, label: 'Correct', value: `${correct}/${total}`, color: 'text-success' },
    { icon: Clock, label: 'Avg Time', value: `${avgTime}s`, color: 'text-bubble-blue' },
    { icon: Flame, label: 'Best Streak', value: `${bestStreak}`, color: 'text-cola-red' },
  ];

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + i * 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-md flex flex-col items-center min-w-[100px]"
        >
          <stat.icon size={24} className={stat.color} />
          <div className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</div>
          <div className="text-xs text-dark/50 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
