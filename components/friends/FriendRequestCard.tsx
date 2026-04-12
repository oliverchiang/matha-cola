'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Friendship } from '@/lib/stores/friendStore';
import AvatarMini from '@/components/avatar/AvatarMini';
import { sounds } from '@/lib/sounds';

interface FriendRequestCardProps {
  friendship: Friendship;
  onAccept: () => void;
  onDecline: () => void;
}

export default function FriendRequestCard({ friendship, onAccept, onDecline }: FriendRequestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-3"
    >
      <AvatarMini avatar={friendship.avatar} size={40} />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-dark truncate">{friendship.name}</div>
        <div className="text-xs text-dark/40">Wants to be friends!</div>
      </div>
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { sounds.correct(); onAccept(); }}
          className="w-9 h-9 rounded-full bg-success flex items-center justify-center cursor-pointer"
        >
          <Check size={18} className="text-white" strokeWidth={3} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => { sounds.click(); onDecline(); }}
          className="w-9 h-9 rounded-full bg-dark/10 flex items-center justify-center cursor-pointer"
        >
          <X size={18} className="text-dark/40" strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
}
