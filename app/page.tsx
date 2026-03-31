'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FizzyMascot from '@/components/mascot/FizzyMascot';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { Trophy } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden px-4">
      <BubbleBackground />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight">
            <span className="text-cola-red">MATHA</span>
            <span className="text-dark">-</span>
            <span className="text-bubble-blue">COLA</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-dark/60 mt-2 font-medium"
          >
            Fizzy Fun Math for Kids!
          </motion.p>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
        >
          <FizzyMascot state="idle" size={140} />
        </motion.div>

        {/* Play Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/play">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="pulse-gentle bg-cola-red text-white text-3xl font-bold px-16 py-5 rounded-full shadow-xl
                cursor-pointer hover:shadow-2xl transition-shadow"
            >
              PLAY!
            </motion.div>
          </Link>
        </motion.div>

        {/* High Scores Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/scores">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-dark/50 hover:text-dark/80 font-medium text-lg cursor-pointer transition-colors"
            >
              <Trophy size={20} />
              High Scores
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
