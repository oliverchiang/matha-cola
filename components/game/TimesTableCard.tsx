'use client';

import { motion } from 'framer-motion';
import { TimesTable } from '@/lib/engine/types';
import { Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface TimesTableCardProps {
  table: TimesTable;
  onClick: () => void;
  index: number;
}

const tableColors = [
  'bg-op-addition',      // 1
  'bg-bubble-blue',      // 2
  'bg-op-multiplication', // 3
  'bg-op-division',       // 4
  'bg-cola-red',          // 5
  'bg-op-subtraction',    // 6
  'bg-success',           // 7
  'bg-fizz-yellow',       // 8
  'bg-op-multiplication', // 9
  'bg-bubble-blue',      // 10
  'bg-op-addition',      // 11
  'bg-cola-red',          // 12
];

export default function TimesTableCard({ table, onClick, index }: TimesTableCardProps) {
  const isMixed = table === 'mixed';
  const bg = isMixed
    ? 'bg-gradient-to-br from-op-addition via-op-multiplication to-op-division'
    : tableColors[(table as number) - 1];

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
          <span className="text-3xl font-bold">{table}</span>
          <span className="text-xs font-medium opacity-80">times table</span>
        </>
      )}
    </motion.button>
  );
}
