'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords } from 'lucide-react';
import { Profile } from '@/lib/engine/profileTypes';
import AvatarMini from '@/components/avatar/AvatarMini';
import { sounds } from '@/lib/sounds';

interface ChallengePickerModalProps {
  open: boolean;
  profiles: Profile[];
  currentProfileId: string;
  onPick: (profileId: string) => void;
  onClose: () => void;
}

export default function ChallengePickerModal({ open, profiles, currentProfileId, onPick, onClose }: ChallengePickerModalProps) {
  const others = profiles.filter(p => p.id !== currentProfileId);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Swords size={24} className="text-cola-red" />
              <h3 className="text-xl font-bold text-dark">Challenge a Friend!</h3>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-dark/10 cursor-pointer"
            >
              <X size={20} className="text-dark/40" />
            </motion.button>
          </div>

          <p className="text-sm text-dark/50 text-center">Pick someone to beat your score!</p>

          <div className="grid grid-cols-2 gap-3 w-full">
            {others.map((profile, i) => (
              <motion.button
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sounds.click();
                  onPick(profile.id);
                }}
                className="bg-cream rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-cola-red/30"
              >
                <AvatarMini avatar={profile.avatar} size={45} />
                <span className="font-bold text-sm text-dark truncate max-w-full">{profile.name}</span>
              </motion.button>
            ))}
          </div>

          {others.length === 0 && (
            <p className="text-dark/40 text-sm">No other profiles to challenge. Create another profile first!</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
