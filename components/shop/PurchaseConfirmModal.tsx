'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceItem } from '@/lib/engine/profileTypes';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import AnimatedButton from '@/components/shared/AnimatedButton';

interface PurchaseConfirmModalProps {
  item: MarketplaceItem | null;
  currentCaps: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PurchaseConfirmModal({ item, currentCaps, onConfirm, onCancel }: PurchaseConfirmModalProps) {
  if (!item) return null;

  const remaining = currentCaps - item.price;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 backdrop-blur-sm px-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full flex flex-col items-center gap-4"
        >
          <h3 className="text-xl font-bold text-dark">Buy {item.name}?</h3>
          <p className="text-sm text-dark/50 text-center">{item.description}</p>

          <div className="flex items-center gap-2 bg-fizz-yellow/20 rounded-full px-4 py-2">
            <BottleCapIcon size={24} />
            <span className="text-lg font-bold text-dark">{item.price}</span>
          </div>

          <div className="text-sm text-dark/40">
            You&apos;ll have <span className="font-bold text-dark/70">{remaining}</span> caps left
          </div>

          <div className="flex gap-3 w-full">
            <AnimatedButton
              onClick={onCancel}
              className="flex-1 bg-dark/10 text-dark/60 font-bold py-3 rounded-2xl"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={onConfirm}
              className="flex-1 bg-cola-red text-white font-bold py-3 rounded-2xl shadow-lg"
            >
              Buy!
            </AnimatedButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
