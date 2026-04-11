'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PinEntry from './PinEntry';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { sounds } from '@/lib/sounds';

interface ProfileCreatorProps {
  onCreated: (name: string, pin: string) => void;
  onBack: () => void;
}

type Step = 'name' | 'pin' | 'confirm';

export default function ProfileCreator({ onCreated, onBack }: ProfileCreatorProps) {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmError, setConfirmError] = useState(false);
  const createdRef = useRef(false);

  const handleNameSubmit = () => {
    if (name.trim().length === 0) return;
    sounds.click();
    setStep('pin');
  };

  const handlePinComplete = (enteredPin: string) => {
    setPin(enteredPin);
    setStep('confirm');
  };

  const handleConfirmPin = (confirmPin: string) => {
    if (confirmPin === pin) {
      if (createdRef.current) return;
      createdRef.current = true;
      sounds.correct();
      onCreated(name.trim(), pin);
    } else {
      setConfirmError(true);
      sounds.wrong();
      // Reset error after shake animation
      setTimeout(() => setConfirmError(false), 600);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <motion.button
        onClick={() => {
          sounds.click();
          if (step === 'pin') setStep('name');
          else if (step === 'confirm') {
            setStep('pin');
            setConfirmError(false);
          }
          else onBack();
        }}
        whileTap={{ scale: 0.9 }}
        className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
      >
        <ArrowLeft size={20} /> Back
      </motion.button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <AvatarRenderer state="idle" size={90} />
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-4 w-full max-w-xs"
          >
            <h2 className="text-2xl font-bold text-dark">What&apos;s your name?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 16))}
              onKeyDown={e => e.key === 'Enter' && handleNameSubmit()}
              placeholder="Enter your name"
              autoFocus
              className="w-full text-center text-2xl font-bold py-3 px-4 rounded-2xl bg-white shadow-md border-2 border-transparent focus:border-bubble-blue focus:outline-none text-dark placeholder:text-dark/30"
            />
            <AnimatedButton
              onClick={handleNameSubmit}
              className="w-full bg-bubble-blue text-white font-bold text-lg py-3 rounded-2xl shadow-lg"
              disabled={name.trim().length === 0}
            >
              Next
            </AnimatedButton>
          </motion.div>
        )}

        {step === 'pin' && (
          <motion.div
            key="pin"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-bold text-dark">Choose a 4-digit PIN</h2>
            <p className="text-dark/50 text-sm">This keeps your profile safe</p>
            <PinEntry onComplete={handlePinComplete} />
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl font-bold text-dark">Confirm your PIN</h2>
            <p className="text-dark/50 text-sm">Enter it again to make sure</p>
            <PinEntry onComplete={handleConfirmPin} error={confirmError} />
            {confirmError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-cola-red text-sm font-medium"
              >
                PINs don&apos;t match, try again
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
