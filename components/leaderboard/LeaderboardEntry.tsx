'use client';

import { motion } from 'framer-motion';
import AvatarMini from '@/components/avatar/AvatarMini';

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  avatar: Record<string, unknown>;
  value: string;
  isMe: boolean;
  index: number;
}

const rankColors: Record<number, string> = {
  1: 'bg-fizz-yellow text-dark',
  2: 'bg-[#C0C0C0] text-dark',
  3: 'bg-[#CD7F32] text-white',
};

export default function LeaderboardEntry({ rank, name, avatar, value, isMe, index }: LeaderboardEntryProps) {
  const rankClass = rankColors[rank] || 'bg-dark/10 text-dark/60';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`flex items-center gap-3 p-3 rounded-xl ${isMe ? 'bg-bubble-blue/10 ring-2 ring-bubble-blue' : 'bg-white'} shadow-sm`}
    >
      <div className={`w-8 h-8 rounded-full ${rankClass} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
        {rank}
      </div>
      <AvatarMini avatar={avatar as never} size={32} />
      <span className="flex-1 font-bold text-sm text-dark truncate">{name}</span>
      <span className="font-bold text-dark/70 text-sm tabular-nums">{value}</span>
    </motion.div>
  );
}
