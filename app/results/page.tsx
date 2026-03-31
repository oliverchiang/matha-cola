'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import { getStarCount, getEncouragingMessage } from '@/lib/engine/scoring';
import ScoreReveal from '@/components/results/ScoreReveal';
import StarAward from '@/components/results/StarAward';
import StatsDisplay from '@/components/results/StatsDisplay';
import FizzyMascot from '@/components/mascot/FizzyMascot';
import BubbleBackground from '@/components/shared/BubbleBackground';
import AnimatedButton from '@/components/shared/AnimatedButton';
import confetti from 'canvas-confetti';
import { RotateCcw, Home } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function ResultsPage() {
  const router = useRouter();
  const store = useGameStore();

  const correct = store.results.filter(r => r.correct).length;
  const total = store.results.length;
  const stars = getStarCount(store.score);
  const message = getEncouragingMessage(store.score, correct, total);

  // Celebration sounds + confetti
  useEffect(() => {
    // Star ding sounds (timed with star-drop animation delays)
    const starTimers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < stars; i++) {
      starTimers.push(setTimeout(() => sounds.starDing(i), 800 + i * 300 + 300));
    }

    if (stars >= 2) {
      const celebrationTimer = setTimeout(() => {
        sounds.celebration();
        confetti({
          particleCount: 100 + stars * 50,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0', '#7B2CBF'],
        });
      }, 2000);
      starTimers.push(celebrationTimer);
    }

    return () => starTimers.forEach(clearTimeout);
  }, [stars]);

  // Redirect if no game data
  useEffect(() => {
    if (store.results.length === 0 && store.phase !== 'finished') {
      router.push('/');
    }
  }, [store.results.length, store.phase, router]);

  if (store.results.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4 py-8">
      <BubbleBackground />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Title */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl sm:text-5xl font-bold text-center"
        >
          {stars >= 3 ? (
            <span className="text-fizz-yellow">Amazing!</span>
          ) : stars >= 2 ? (
            <span className="text-success">Great Job!</span>
          ) : stars >= 1 ? (
            <span className="text-bubble-blue">Nice Try!</span>
          ) : (
            <span className="text-cola-red">Keep Going!</span>
          )}
        </motion.h1>

        {/* Mascot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <FizzyMascot state={stars >= 2 ? 'celebrate' : stars >= 1 ? 'cheer' : 'encourage'} size={100} />
        </motion.div>

        {/* Score */}
        <ScoreReveal score={store.score} />

        {/* Stars */}
        <StarAward count={stars} />

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-lg text-dark/70 font-medium text-center"
        >
          {message}
        </motion.p>

        {/* Stats */}
        <StatsDisplay results={store.results} bestStreak={store.bestStreak} />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="flex gap-4 w-full mt-4"
        >
          <AnimatedButton
            onClick={() => {
              store.reset();
              router.push('/play');
            }}
            className="flex-1 bg-cola-red text-white font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw size={22} /> Play Again
          </AnimatedButton>

          <AnimatedButton
            onClick={() => {
              store.reset();
              router.push('/');
            }}
            className="flex-1 bg-white text-dark font-bold text-lg py-4 rounded-2xl shadow-lg border-2 border-dark/10 flex items-center justify-center gap-2"
          >
            <Home size={22} /> Home
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}
