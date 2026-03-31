'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '@/lib/stores/gameStore';
import { useScoreStore } from '@/lib/stores/scoreStore';
import { Operation, Difficulty, TimesTable } from '@/lib/engine/types';
import OperationCard from '@/components/game/OperationCard';
import DifficultyCard from '@/components/game/DifficultyCard';
import TimesTableCard from '@/components/game/TimesTableCard';
import CountdownOverlay from '@/components/game/CountdownOverlay';
import ProgressBar from '@/components/game/ProgressBar';
import StreakCounter from '@/components/game/StreakCounter';
import QuestionCard from '@/components/game/QuestionCard';
import NumberPad from '@/components/game/NumberPad';
import FizzyMascot from '@/components/mascot/FizzyMascot';
import BubbleBackground from '@/components/shared/BubbleBackground';
import confetti from 'canvas-confetti';
import { sounds } from '@/lib/sounds';

const operations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division', 'mixed'];
const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
const timesTables: TimesTable[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'mixed'];

export default function PlayPage() {
  const router = useRouter();
  const store = useGameStore();
  const scoreStore = useScoreStore();
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const userAnswerRef = useRef(userAnswer);
  userAnswerRef.current = userAnswer;
  const scoreSaved = useRef(false);

  // Load high scores
  useEffect(() => {
    if (!scoreStore.loaded) scoreStore.load();
  }, [scoreStore]);

  // Reset game state on mount
  useEffect(() => {
    store.reset();
    scoreSaved.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to results when finished
  useEffect(() => {
    if (store.phase === 'finished' && !scoreSaved.current) {
      scoreSaved.current = true;
      // Save score
      if (store.operation) {
        const key = store.timesTable
          ? `multiplication_${store.timesTable}x`
          : `${store.operation}_${store.difficulty}`;
        const correct = store.results.filter(r => r.correct).length;
        scoreStore.saveScore(key, {
          score: store.score,
          date: new Date().toISOString(),
          correct,
          total: store.results.length,
        });
        scoreStore.incrementStats(correct);
      }

      const timer = setTimeout(() => {
        router.push('/results');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [store.phase, store.operation, store.difficulty, store.timesTable, store.score, store.results, scoreStore, router]);

  const handleSubmit = useCallback(() => {
    const currentAnswer = userAnswerRef.current;
    if (!currentAnswer || feedback) return;
    const answer = parseInt(currentAnswer, 10);
    const question = store.questions[store.currentQuestionIndex];
    const correct = answer === question.answer;

    if (correct) {
      setFeedback('correct');
      sounds.correct();
      // Confetti + sound for streaks
      const newStreak = store.streak + 1;
      if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
        sounds.streak();
        confetti({
          particleCount: newStreak * 20,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0'],
        });
      }
    } else {
      setFeedback('wrong');
      sounds.wrong();
    }

    // Clear existing timeout
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);

    feedbackTimeout.current = setTimeout(() => {
      store.submitAnswer(answer);
      setUserAnswer('');
      setFeedback(null);
    }, correct ? 800 : 1500);
  }, [feedback, store]);

  // Keyboard input
  useEffect(() => {
    if (store.phase !== 'playing' || feedback) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        sounds.numpad(e.key);
        setUserAnswer(prev => {
          if (prev.length >= 6) return prev;
          return prev + e.key;
        });
      } else if (e.key === 'Backspace') {
        sounds.click();
        setUserAnswer(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter' && userAnswerRef.current.length > 0) {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store.phase, feedback, handleSubmit]);

  // Auto-submit when the typed answer matches the correct answer
  useEffect(() => {
    if (store.phase !== 'playing' || feedback || !userAnswer) return;
    const question = store.questions[store.currentQuestionIndex];
    if (!question) return;
    const typed = parseInt(userAnswer, 10);
    if (typed === question.answer) {
      handleSubmit();
    }
  }, [userAnswer, store.phase, store.questions, store.currentQuestionIndex, feedback, handleSubmit]);

  const handleDigit = (digit: string) => {
    if (feedback) return;
    setUserAnswer(prev => {
      if (prev.length >= 6) return prev;
      return prev + digit;
    });
  };

  const handleDelete = () => {
    if (feedback) return;
    setUserAnswer(prev => prev.slice(0, -1));
  };

  // Mascot state
  const mascotState = feedback === 'correct' ? 'cheer' : feedback === 'wrong' ? 'encourage' : 'idle';

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {/* Select Operation */}
        <AnimatePresence mode="wait">
          {store.phase === 'selectOperation' && (
            <motion.div
              key="operations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <motion.button
                onClick={() => router.push('/')}
                whileTap={{ scale: 0.9 }}
                className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
              >
                <ArrowLeft size={20} /> Home
              </motion.button>

              <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center">
                Choose Your <span className="text-cola-red">Challenge!</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 w-full">
                {operations.slice(0, 4).map((op, i) => (
                  <OperationCard
                    key={op}
                    operation={op}
                    onClick={() => store.setOperation(op)}
                    index={i}
                  />
                ))}
              </div>
              <div className="w-full">
                <OperationCard
                  operation="mixed"
                  onClick={() => store.setOperation('mixed')}
                  index={4}
                />
              </div>
            </motion.div>
          )}

          {/* Select Difficulty */}
          {store.phase === 'selectDifficulty' && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <motion.button
                onClick={() => store.goBack()}
                whileTap={{ scale: 0.9 }}
                className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
              >
                <ArrowLeft size={20} /> Back
              </motion.button>

              <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center">
                How <span className="text-fizz-yellow">Tough?</span>
              </h2>

              <div className="flex flex-col gap-4 w-full">
                {difficulties.map((diff, i) => (
                  <DifficultyCard
                    key={diff}
                    difficulty={diff}
                    operation={store.operation!}
                    onClick={() => store.setDifficulty(diff)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Select Times Table (multiplication only) */}
          {store.phase === 'selectTimesTable' && (
            <motion.div
              key="timestable"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <motion.button
                onClick={() => store.goBack()}
                whileTap={{ scale: 0.9 }}
                className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
              >
                <ArrowLeft size={20} /> Back
              </motion.button>

              <h2 className="text-3xl sm:text-4xl font-bold text-dark text-center">
                Pick Your <span className="text-op-multiplication">Times Table!</span>
              </h2>

              <div className="grid grid-cols-3 gap-3 w-full">
                {timesTables.map((table, i) => (
                  <TimesTableCard
                    key={String(table)}
                    table={table}
                    onClick={() => store.setTimesTable(table)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Countdown */}
          {store.phase === 'countdown' && (
            <CountdownOverlay
              key="countdown"
              onComplete={() => store.startPlaying()}
            />
          )}

          {/* Gameplay */}
          {store.phase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center gap-5"
            >
              {/* Top bar */}
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1">
                  <ProgressBar
                    current={store.currentQuestionIndex}
                    total={store.questions.length}
                  />
                </div>
                <StreakCounter streak={store.streak} />
              </div>

              {/* Score display */}
              <div className="text-2xl font-bold text-cola-red">
                Score: {store.score}
              </div>

              {/* Mascot + Question */}
              <div className="flex items-center gap-4 w-full justify-center">
                <div className="hidden sm:block">
                  <FizzyMascot state={mascotState} size={80} />
                </div>
                <div className="flex-1 max-w-md">
                  <QuestionCard
                    question={store.questions[store.currentQuestionIndex]}
                    userAnswer={userAnswer}
                    feedback={feedback}
                  />
                </div>
              </div>

              {/* Number Pad */}
              <NumberPad
                onDigit={handleDigit}
                onDelete={handleDelete}
                onSubmit={handleSubmit}
                disabled={!!feedback}
                hasInput={userAnswer.length > 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
