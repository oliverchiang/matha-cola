'use client';

import { motion } from 'framer-motion';
import { Delete, Check } from 'lucide-react';
import { sounds } from '@/lib/sounds';

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled: boolean;
  hasInput: boolean;
}

export default function NumberPad({ onDigit, onDelete, onSubmit, disabled, hasInput }: NumberPadProps) {
  const buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['del', '0', 'ok'],
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
      {buttons.flat().map((btn) => {
        if (btn === 'del') {
          return (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.9 }}
              onClick={() => { sounds.click(); onDelete(); }}
              disabled={disabled}
              className="numpad-btn w-full h-16 rounded-2xl bg-fizz-yellow/80 text-dark font-bold text-xl
                flex items-center justify-center shadow-md cursor-pointer disabled:opacity-40 transition-colors
                hover:bg-fizz-yellow"
            >
              <Delete size={28} />
            </motion.button>
          );
        }
        if (btn === 'ok') {
          return (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.9 }}
              onClick={() => { sounds.click(); onSubmit(); }}
              disabled={disabled || !hasInput}
              className="numpad-btn w-full h-16 rounded-2xl bg-success text-white font-bold text-xl
                flex items-center justify-center shadow-md cursor-pointer disabled:opacity-40 transition-colors
                hover:bg-success/90"
            >
              <Check size={32} strokeWidth={3} />
            </motion.button>
          );
        }
        return (
          <motion.button
            key={btn}
            whileTap={{ scale: 0.9 }}
            onClick={() => { sounds.numpad(btn); onDigit(btn); }}
            disabled={disabled}
            className="numpad-btn w-full h-16 rounded-2xl bg-white text-dark font-bold text-2xl
              shadow-md cursor-pointer disabled:opacity-40 transition-colors
              hover:bg-bubble-blue/10 active:bg-bubble-blue/20"
          >
            {btn}
          </motion.button>
        );
      })}
    </div>
  );
}
