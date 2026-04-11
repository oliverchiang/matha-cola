'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import AvatarMini from '@/components/avatar/AvatarMini';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import { sounds } from '@/lib/sounds';

export default function ProfileBadge() {
  const { loaded, load, getActiveProfile, logout } = useProfileStore();

  useEffect(() => {
    if (!loaded) load();
  }, [loaded, load]);

  const profile = getActiveProfile();
  if (!loaded || !profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3 shadow-md"
    >
      <Link href="/avatar" className="flex items-center gap-2">
        <AvatarMini avatar={profile.avatar} size={28} />
        <span className="font-bold text-sm text-dark max-w-[80px] truncate">{profile.name}</span>
      </Link>
      <div className="flex items-center gap-1 border-l border-dark/10 pl-2">
        <BottleCapIcon size={18} />
        <span className="text-sm font-bold text-dark/70">{profile.bottleCaps}</span>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          sounds.click();
          logout();
        }}
        className="ml-1 p-1 rounded-full hover:bg-dark/10 cursor-pointer transition-colors"
        title="Switch profile"
      >
        <LogOut size={14} className="text-dark/40" />
      </motion.button>
    </motion.div>
  );
}
