'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/stores/gameStore';
import { useProfileStore } from '@/lib/stores/profileStore';
import { getStarCount, getEncouragingMessage } from '@/lib/engine/scoring';
import { getOperationSymbol } from '@/lib/engine/questionGenerator';
import StarAward from '@/components/results/StarAward';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import BubbleBackground from '@/components/shared/BubbleBackground';
import AnimatedButton from '@/components/shared/AnimatedButton';
import confetti from 'canvas-confetti';
import { Home, Check, X } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function ResultsPage() {
  const router = useRouter();
  const store = useGameStore();
  const profileStore = useProfileStore();

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  const profile = profileStore.getActiveProfile();

  const correct = store.results.filter(r => r.correct).length;
  const incorrect = store.results.filter(r => !r.correct).length;
  const total = store.results.length;
  const stars = getStarCount(store.score);
  const message = getEncouragingMessage(store.score, correct, total);

  // Celebration sounds + confetti
  useEffect(() => {
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
    <div className="flex flex-col items-center min-h-screen relative px-4 py-8">
      <BubbleBackground />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-md">
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
          <AvatarRenderer avatar={profile?.avatar} state={stars >= 2 ? 'celebrate' : stars >= 1 ? 'cheer' : 'encourage'} size={90} />
        </motion.div>

        {/* Stars */}
        <StarAward count={stars} />

        {/* Score + Correct/Incorrect summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-xl w-full"
        >
          {/* Total Score */}
          <div className="text-center mb-4">
            <div className="text-sm font-medium text-dark/50">Total Score</div>
            <div className="text-5xl font-bold text-cola-red">{store.score}</div>
          </div>

          {/* Correct / Incorrect boxes */}
          <div className="flex gap-3">
            <div className="flex-1 bg-success/10 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Check size={20} className="text-success" strokeWidth={3} />
                <span className="text-sm font-medium text-success">Correct</span>
              </div>
              <div className="text-4xl font-bold text-success">{correct}</div>
              <div className="text-xs text-dark/40">out of {total}</div>
            </div>
            <div className="flex-1 bg-cola-red/10 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <X size={20} className="text-cola-red" strokeWidth={3} />
                <span className="text-sm font-medium text-cola-red">Incorrect</span>
              </div>
              <div className="text-4xl font-bold text-cola-red">{incorrect}</div>
              <div className="text-xs text-dark/40">out of {total}</div>
            </div>
          </div>
        </motion.div>

        {/* Encouraging message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg text-dark/70 font-medium text-center"
        >
          {message}
        </motion.p>

        {/* Question-by-question review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full"
        >
          <div className="text-sm font-medium text-dark/50 mb-2">Question Review</div>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-dark/5">
            {store.results.map((result, i) => {
              const q = result.question;
              const isMakeTens = q.operation === 'make-tens';
              const equation = isMakeTens
                ? (q.blankPosition === 'left'
                    ? `${q.answer} + ${q.operand1} = ${q.target}`
                    : `${q.operand1} + ${q.answer} = ${q.target}`)
                : `${q.operand1} ${getOperationSymbol(q.operation)} ${q.operand2} = ${q.answer}`;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${result.correct ? '' : 'bg-cola-red/5'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    result.correct ? 'bg-success' : 'bg-cola-red'
                  }`}>
                    {result.correct
                      ? <Check size={16} className="text-white" strokeWidth={3} />
                      : <X size={16} className="text-white" strokeWidth={3} />
                    }
                  </div>
                  <div className="flex-1 font-medium text-dark">
                    {equation}
                  </div>
                  {!result.correct && (
                    <div className="text-sm text-cola-red/70">
                      You said {result.userAnswer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Done button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="w-full mt-2 pb-4"
        >
          <AnimatedButton
            onClick={() => {
              sounds.click();
              store.reset();
              router.push('/');
            }}
            className="w-full bg-cola-red text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Home size={24} /> Done
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}
