'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface PinEntryProps {
  onComplete: (pin: string) => void;
  error?: boolean;
}

export default function PinEntry({ onComplete, error }: PinEntryProps) {
  const [pin, setPin] = useState('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);

  // Fire onComplete exactly once when pin reaches 4 digits
  useEffect(() => {
    if (pin.length === 4 && !firedRef.current) {
      firedRef.current = true;
      onCompleteRef.current(pin);
    }
  }, [pin]);

  // Reset on error
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => {
        setPin('');
        firedRef.current = false;
      }, 500);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleDigit = useCallback((digit: string) => {
    setPin(prev => {
      if (prev.length >= 4) return prev;
      sounds.numpad(digit);
      return prev + digit;
    });
  }, []);

  const handleDelete = useCallback(() => {
    sounds.click();
    setPin(prev => {
      const next = prev.slice(0, -1);
      if (next.length < 4) firedRef.current = false;
      return next;
    });
  }, []);

  // Keyboard support with proper deps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDelete]);

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* PIN dots */}
      <div className="flex gap-3">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-5 h-5 rounded-full border-2 transition-colors ${
              i < pin.length
                ? error ? 'bg-cola-red border-cola-red' : 'bg-bubble-blue border-bubble-blue'
                : 'border-dark/20 bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-2 w-48">
        {digits.map((d, i) => {
          if (d === '') return <div key={i} />;
          if (d === 'del') {
            return (
              <motion.button
                key="del"
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="h-12 rounded-xl bg-dark/10 flex items-center justify-center cursor-pointer"
              >
                <Delete size={18} className="text-dark/60" />
              </motion.button>
            );
          }
          return (
            <motion.button
              key={d}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDigit(d)}
              className="h-12 rounded-xl bg-white shadow-sm text-xl font-bold text-dark cursor-pointer hover:bg-dark/5 transition-colors"
            >
              {d}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
