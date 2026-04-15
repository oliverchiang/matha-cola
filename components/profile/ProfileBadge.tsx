'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LogOut, KeyRound, X } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import AvatarMini from '@/components/avatar/AvatarMini';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import PinEntry from './PinEntry';
import { sounds } from '@/lib/sounds';

type PinStep = 'current' | 'new' | 'confirm' | 'done' | 'error';

export default function ProfileBadge() {
  const { loaded, load, getActiveProfile, logout } = useProfileStore();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinStep, setPinStep] = useState<PinStep>('current');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    if (!loaded) load();
  }, [loaded, load]);

  const profile = getActiveProfile();
  if (!loaded || !profile) return null;

  const resetPinModal = () => {
    setShowPinModal(false);
    setPinStep('current');
    setCurrentPin('');
    setNewPin('');
    setPinError(false);
  };

  const handleCurrentPin = async (pin: string) => {
    const res = await fetch(`/api/profiles/${profile.id}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      setCurrentPin(pin);
      setPinError(false);
      setPinStep('new');
    } else {
      sounds.wrong();
      setPinError(true);
    }
  };

  const handleNewPin = (pin: string) => {
    setNewPin(pin);
    setPinError(false);
    setPinStep('confirm');
  };

  const handleConfirmPin = async (pin: string) => {
    if (pin !== newPin) {
      sounds.wrong();
      setPinError(true);
      setTimeout(() => {
        setPinError(false);
        setPinStep('new');
        setNewPin('');
      }, 600);
      return;
    }

    const res = await fetch(`/api/profiles/${profile.id}/pin`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPin, newPin }),
    });

    if (res.ok) {
      sounds.correct();
      setPinStep('done');
      setTimeout(resetPinModal, 1200);
    } else {
      sounds.wrong();
      setPinStep('error');
      setTimeout(resetPinModal, 1200);
    }
  };

  return (
    <>
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
            setShowPinModal(true);
          }}
          className="ml-1 p-1 rounded-full hover:bg-dark/10 cursor-pointer transition-colors"
          title="Change PIN"
        >
          <KeyRound size={14} className="text-dark/40" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            sounds.click();
            logout();
          }}
          className="p-1 rounded-full hover:bg-dark/10 cursor-pointer transition-colors"
          title="Switch profile"
        >
          <LogOut size={14} className="text-dark/40" />
        </motion.button>
      </motion.div>

      {/* Change PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={resetPinModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-xs flex flex-col items-center gap-4 relative"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={resetPinModal}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-dark/10 cursor-pointer"
              >
                <X size={18} className="text-dark/40" />
              </motion.button>

              {pinStep === 'current' && (
                <>
                  <KeyRound size={28} className="text-bubble-blue" />
                  <h3 className="text-lg font-bold text-dark">Change PIN</h3>
                  <p className="text-dark/50 text-sm">Enter your current PIN</p>
                  <PinEntry onComplete={handleCurrentPin} error={pinError} />
                </>
              )}

              {pinStep === 'new' && (
                <>
                  <KeyRound size={28} className="text-bubble-blue" />
                  <h3 className="text-lg font-bold text-dark">New PIN</h3>
                  <p className="text-dark/50 text-sm">Enter your new PIN</p>
                  <PinEntry onComplete={handleNewPin} error={pinError} />
                </>
              )}

              {pinStep === 'confirm' && (
                <>
                  <KeyRound size={28} className="text-bubble-blue" />
                  <h3 className="text-lg font-bold text-dark">Confirm PIN</h3>
                  <p className="text-dark/50 text-sm">Enter your new PIN again</p>
                  <PinEntry onComplete={handleConfirmPin} error={pinError} />
                </>
              )}

              {pinStep === 'done' && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center gap-2 py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <p className="font-bold text-dark">PIN Changed!</p>
                </motion.div>
              )}

              {pinStep === 'error' && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center gap-2 py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-cola-red/20 flex items-center justify-center text-2xl">
                    ✗
                  </div>
                  <p className="font-bold text-cola-red">Something went wrong</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
