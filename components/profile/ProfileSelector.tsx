'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Profile } from '@/lib/engine/profileTypes';
import AvatarMini from '@/components/avatar/AvatarMini';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import PinEntry from './PinEntry';
import { sounds } from '@/lib/sounds';

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelect: (id: string, pin: string) => Promise<boolean>;
  onDelete: (id: string, pin: string) => Promise<boolean>;
  onCreateNew: () => void;
}

type Mode = 'select' | 'pin' | 'delete-confirm' | 'delete-pin';

export default function ProfileSelector({ profiles, onSelect, onDelete, onCreateNew }: ProfileSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('select');
  const [pinError, setPinError] = useState(false);

  const handleProfileClick = (id: string) => {
    sounds.click();
    setSelectedId(id);
    setMode('pin');
    setPinError(false);
  };

  const handlePinComplete = async (pin: string) => {
    if (!selectedId) return;
    const success = await onSelect(selectedId, pin);
    if (!success) {
      sounds.wrong();
      setPinError(true);
    }
  };

  const handleDeleteRequest = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sounds.click();
    setSelectedId(id);
    setMode('delete-confirm');
  };

  const handleDeletePinComplete = async (pin: string) => {
    if (!selectedId) return;
    const success = await onDelete(selectedId, pin);
    if (success) {
      sounds.correct();
      setSelectedId(null);
      setMode('select');
    } else {
      sounds.wrong();
      setPinError(true);
    }
  };

  const selectedProfile = profiles.find(p => p.id === selectedId);

  const goBack = () => {
    sounds.click();
    if (mode === 'delete-pin') {
      setMode('delete-confirm');
    } else {
      setSelectedId(null);
      setMode('select');
      setPinError(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {mode === 'pin' && selectedProfile ? (
          <motion.div
            key="pin-entry"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <AvatarMini avatar={selectedProfile.avatar} size={70} />
            <h3 className="text-xl font-bold text-dark">{selectedProfile.name}</h3>
            <p className="text-dark/50 text-sm">Enter your PIN</p>
            <PinEntry onComplete={handlePinComplete} error={pinError} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={goBack}
              className="text-dark/40 hover:text-dark/60 text-sm font-medium cursor-pointer"
            >
              Choose a different profile
            </motion.button>
          </motion.div>
        ) : mode === 'delete-confirm' && selectedProfile ? (
          <motion.div
            key="delete-confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <AvatarMini avatar={selectedProfile.avatar} size={70} />
            <h3 className="text-xl font-bold text-cola-red">Delete {selectedProfile.name}?</h3>
            <p className="text-dark/50 text-sm text-center max-w-xs">
              This will permanently delete this profile, including all scores and bottle caps. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={goBack}
                className="px-6 py-2 rounded-xl bg-dark/10 font-bold text-dark/60 text-sm cursor-pointer"
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sounds.click();
                  setMode('delete-pin');
                  setPinError(false);
                }}
                className="px-6 py-2 rounded-xl bg-cola-red text-white font-bold text-sm cursor-pointer"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ) : mode === 'delete-pin' && selectedProfile ? (
          <motion.div
            key="delete-pin"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <h3 className="text-xl font-bold text-cola-red">Enter PIN to confirm</h3>
            <p className="text-dark/50 text-sm">Enter {selectedProfile.name}&apos;s PIN to delete</p>
            <PinEntry onComplete={handleDeletePinComplete} error={pinError} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={goBack}
              className="text-dark/40 hover:text-dark/60 text-sm font-medium cursor-pointer"
            >
              Cancel
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="profile-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold text-dark text-center mb-4">Who&apos;s Playing?</h2>
            <div className="grid grid-cols-2 gap-3 w-full">
              {profiles.map((profile, i) => (
                <motion.button
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleProfileClick(profile.id)}
                  className="relative bg-white rounded-2xl p-4 shadow-md flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  {/* Delete button */}
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => handleDeleteRequest(e, profile.id)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-cola-red/10 transition-colors"
                  >
                    <Trash2 size={14} className="text-dark/20 hover:text-cola-red" />
                  </motion.div>

                  <AvatarMini avatar={profile.avatar} size={50} />
                  <div className="font-bold text-dark text-sm truncate max-w-full">{profile.name}</div>
                  <div className="flex items-center gap-1">
                    <BottleCapIcon size={16} />
                    <span className="text-xs font-medium text-dark/60">{profile.bottleCaps}</span>
                  </div>
                </motion.button>
              ))}
              {profiles.length < 8 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: profiles.length * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    sounds.click();
                    onCreateNew();
                  }}
                  className="bg-dark/5 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-dark/10 transition-colors border-2 border-dashed border-dark/20"
                >
                  <div className="w-12 h-12 rounded-full bg-bubble-blue/20 flex items-center justify-center">
                    <Plus size={24} className="text-bubble-blue" />
                  </div>
                  <div className="font-medium text-dark/50 text-sm">New Player</div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
