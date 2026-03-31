'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { MixedRange } from '@/lib/engine/types';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { sounds } from '@/lib/sounds';

interface MixedRangeSelectorProps {
  onSelect: (range: MixedRange) => void;
  onBack: () => void;
}

export default function MixedRangeSelector({ onSelect, onBack }: MixedRangeSelectorProps) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(12);

  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleMinSelect = (val: number) => {
    sounds.click();
    setMin(val);
    if (val > max) setMax(val);
  };

  const handleMaxSelect = (val: number) => {
    sounds.click();
    setMax(val);
    if (val < min) setMin(val);
  };

  return (
    <motion.div
      key="mixedrange"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full flex flex-col items-center gap-5"
    >
      <motion.button
        onClick={onBack}
        whileTap={{ scale: 0.9 }}
        className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
      >
        <ArrowLeft size={20} /> Back
      </motion.button>

      <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center">
        Pick Your <span className="text-op-multiplication">Range!</span>
      </h2>

      <div className="w-full bg-white rounded-2xl p-5 shadow-lg">
        {/* From */}
        <div className="mb-4">
          <div className="text-sm font-bold text-dark/50 mb-2">From</div>
          <div className="grid grid-cols-6 gap-2">
            {tables.map((n) => (
              <button
                key={`min-${n}`}
                onClick={() => handleMinSelect(n)}
                className={`rounded-xl py-2 font-bold text-lg transition-all cursor-pointer ${
                  n === min
                    ? 'bg-op-multiplication text-white shadow-md scale-110'
                    : n > max
                      ? 'bg-dark/5 text-dark/20'
                      : 'bg-dark/10 text-dark/70 hover:bg-dark/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* To */}
        <div className="mb-4">
          <div className="text-sm font-bold text-dark/50 mb-2">To</div>
          <div className="grid grid-cols-6 gap-2">
            {tables.map((n) => (
              <button
                key={`max-${n}`}
                onClick={() => handleMaxSelect(n)}
                className={`rounded-xl py-2 font-bold text-lg transition-all cursor-pointer ${
                  n === max
                    ? 'bg-op-multiplication text-white shadow-md scale-110'
                    : n < min
                      ? 'bg-dark/5 text-dark/20'
                      : 'bg-dark/10 text-dark/70 hover:bg-dark/20'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="text-center text-lg font-bold text-dark/70">
          Tables <span className="text-op-multiplication">{min}</span> to <span className="text-op-multiplication">{max}</span>
        </div>
      </div>

      <AnimatedButton
        onClick={() => {
          sounds.click();
          onSelect({ min, max });
        }}
        className="w-full bg-op-multiplication text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
      >
        <Play size={24} /> Start!
      </AnimatedButton>
    </motion.div>
  );
}
