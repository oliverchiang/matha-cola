'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swords } from 'lucide-react';
import { Challenge } from '@/lib/engine/challengeTypes';
import AvatarMini from '@/components/avatar/AvatarMini';
import { useProfileStore } from '@/lib/stores/profileStore';

interface ChallengeBannerProps {
  challenges: Challenge[];
}

export default function ChallengeBanner({ challenges }: ChallengeBannerProps) {
  const profileStore = useProfileStore();
  if (challenges.length === 0) return null;

  const latest = challenges[challenges.length - 1];
  const challenger = profileStore.getProfileById(latest.challengerId);

  return (
    <Link href="/challenges">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-fizz-yellow/20 border-2 border-fizz-yellow rounded-2xl p-4 flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-fizz-yellow flex items-center justify-center flex-shrink-0">
          <Swords size={20} className="text-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-dark text-sm">
            {challenges.length === 1 ? 'You\'ve been challenged!' : `${challenges.length} challenges waiting!`}
          </div>
          <div className="text-xs text-dark/50 flex items-center gap-1">
            {challenger && <AvatarMini avatar={challenger.avatar} size={16} />}
            <span>{latest.challengerName} wants to battle!</span>
          </div>
        </div>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-dark/40 font-bold"
        >
          &rarr;
        </motion.div>
      </motion.div>
    </Link>
  );
}
