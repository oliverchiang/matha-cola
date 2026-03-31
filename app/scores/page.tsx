'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useScoreStore } from '@/lib/stores/scoreStore';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import BubbleBackground from '@/components/shared/BubbleBackground';

const operationLabels: Record<string, string> = {
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  division: 'Division',
  mixed: 'Mixed',
};

const difficultyLabels: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const operationColors: Record<string, string> = {
  addition: 'bg-op-addition',
  subtraction: 'bg-op-subtraction',
  multiplication: 'bg-op-multiplication',
  division: 'bg-op-division',
  mixed: 'bg-cola-red',
};

export default function ScoresPage() {
  const router = useRouter();
  const scoreStore = useScoreStore();

  useEffect(() => {
    if (!scoreStore.loaded) scoreStore.load();
  }, [scoreStore]);

  const entries = Object.entries(scoreStore.highScores).sort((a, b) => b[1].score - a[1].score);

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-6">
        <motion.button
          onClick={() => router.push('/')}
          whileTap={{ scale: 0.9 }}
          className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
        >
          <ArrowLeft size={20} /> Home
        </motion.button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <Trophy size={36} className="text-fizz-yellow" />
          <h1 className="text-4xl font-bold text-dark">High Scores</h1>
        </motion.div>

        {/* Overall stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-md w-full flex justify-around"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-cola-red">{scoreStore.totalGamesPlayed}</div>
            <div className="text-sm text-dark/50">Games Played</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{scoreStore.totalCorrectAnswers}</div>
            <div className="text-sm text-dark/50">Total Correct</div>
          </div>
        </motion.div>

        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-dark/40 text-lg mt-8"
          >
            <Star size={48} className="mx-auto mb-3 text-dark/20" />
            <p>No scores yet!</p>
            <p className="text-sm mt-1">Play a game to see your scores here.</p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {entries.map(([key, entry], i) => {
              const [op, diff] = key.split('_');
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-full ${operationColors[op] || 'bg-dark/20'} flex items-center justify-center text-white font-bold text-sm`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-dark">
                      {operationLabels[op] || op} - {difficultyLabels[diff] || diff}
                    </div>
                    <div className="text-sm text-dark/50">
                      {entry.correct}/{entry.total} correct
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-cola-red">{entry.score}</div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
