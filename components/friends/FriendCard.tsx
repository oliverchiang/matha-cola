'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserMinus } from 'lucide-react';
import { Friendship } from '@/lib/stores/friendStore';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import AvatarMini from '@/components/avatar/AvatarMini';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import { sounds } from '@/lib/sounds';

interface FriendCardProps {
  friendship: Friendship;
  onRemove: () => void;
}

export default function FriendCard({ friendship, onRemove }: FriendCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <motion.button
        onClick={() => { sounds.click(); setExpanded(!expanded); }}
        className="w-full p-4 flex items-center gap-3 cursor-pointer"
      >
        <AvatarMini avatar={friendship.avatar} size={40} />
        <div className="flex-1 min-w-0 text-left">
          <div className="font-bold text-sm text-dark truncate">{friendship.name}</div>
          <div className="flex items-center gap-2 text-xs text-dark/40">
            <span>{friendship.total_games_played} games</span>
            <span className="flex items-center gap-0.5">
              <BottleCapIcon size={12} /> {friendship.bottle_caps}
            </span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="text-dark/30"
        >
          &#9660;
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col items-center gap-3 border-t border-dark/5 pt-3">
              <AvatarRenderer avatar={friendship.avatar} state="idle" size={80} />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { sounds.click(); onRemove(); }}
                className="flex items-center gap-1 text-xs text-cola-red/60 hover:text-cola-red cursor-pointer"
              >
                <UserMinus size={14} /> Remove Friend
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
