'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Check, X, Swords } from 'lucide-react';
import { useGameStore } from '@/lib/stores/gameStore';
import { useProfileStore } from '@/lib/stores/profileStore';
import { useChallengeStore } from '@/lib/stores/challengeStore';
import { ChallengeConfig } from '@/lib/engine/challengeTypes';
import ChallengePickerModal from '@/components/challenge/ChallengePickerModal';
import { getStarCount, getEncouragingMessage, getCapsPerCorrect } from '@/lib/engine/scoring';
import { getOperationSymbol } from '@/lib/engine/questionGenerator';
import { Operation, Difficulty, TimesTable } from '@/lib/engine/types';
import OperationCard from '@/components/game/OperationCard';
import DifficultyCard from '@/components/game/DifficultyCard';
import TimesTableCard from '@/components/game/TimesTableCard';
import MixedRangeSelector from '@/components/game/MixedRangeSelector';
import CountdownOverlay from '@/components/game/CountdownOverlay';
import ProgressBar from '@/components/game/ProgressBar';
import StreakCounter from '@/components/game/StreakCounter';
import QuestionCard from '@/components/game/QuestionCard';
import NumberPad from '@/components/game/NumberPad';
import GameTimer, { formatTime } from '@/components/game/GameTimer';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import StarAward from '@/components/results/StarAward';
import AnimatedButton from '@/components/shared/AnimatedButton';
import BubbleBackground from '@/components/shared/BubbleBackground';
import confetti from 'canvas-confetti';
import { sounds } from '@/lib/sounds';

const operations: Operation[] = ['addition', 'subtraction', 'multiplication', 'division', 'mixed'];
const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
const timesTables: TimesTable[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'mixed'];

export default function PlayPage() {
  const router = useRouter();
  const store = useGameStore();
  const profileStore = useProfileStore();
  const challengeStore = useChallengeStore();
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [capsEarnedThisGame, setCapsEarnedThisGame] = useState(0);
  const [showCapAnimation, setShowCapAnimation] = useState(false);
  const [lastCapsEarned, setLastCapsEarned] = useState(1);
  const [showChallengePicker, setShowChallengePicker] = useState(false);
  const [challengeSent, setChallengeSent] = useState(false);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const userAnswerRef = useRef(userAnswer);
  userAnswerRef.current = userAnswer;
  const scoreSaved = useRef(false);

  const profile = profileStore.getActiveProfile();

  // Load stores
  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  useEffect(() => {
    if (profileStore.loaded && profileStore.activeProfileId && !challengeStore.loaded) {
      challengeStore.load(profileStore.activeProfileId);
    }
  }, [profileStore.loaded, profileStore.activeProfileId, challengeStore]);

  // Redirect to home if no active profile
  useEffect(() => {
    if (profileStore.loaded && !profileStore.activeProfileId) {
      router.push('/');
    }
  }, [profileStore.loaded, profileStore.activeProfileId, router]);

  // Reset game state on mount — but NOT if we're playing a challenge (already configured)
  useEffect(() => {
    if (!store.activeChallengeId) {
      store.reset();
    }
    scoreSaved.current = false;
    setCapsEarnedThisGame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save score when finished
  useEffect(() => {
    if (store.phase !== 'finished' || scoreSaved.current) return;
    scoreSaved.current = true;
    if (!store.operation) return;

    const key = store.timesTable
      ? `multiplication_${store.timesTable}x`
      : `${store.operation}_${store.difficulty}`;
    const correct = store.results.filter(r => r.correct).length;

    (async () => {
      await profileStore.saveScore(key, {
        score: store.score,
        date: new Date().toISOString(),
        correct,
        total: store.results.length,
      });
      await profileStore.incrementStats(correct);

      if (store.activeChallengeId && profile) {
        await challengeStore.completeChallenge(store.activeChallengeId, {
          profileId: profile.id,
          profileName: profile.name,
          score: store.score,
          correct,
          total: store.results.length,
        });
        await profileStore.refreshProfile(profile.id);
      }
    })();
  }, [store.phase, store.operation, store.difficulty, store.timesTable, store.score, store.results, store.activeChallengeId, profileStore, challengeStore, profile]);

  // Celebration confetti when finished
  useEffect(() => {
    if (store.phase !== 'finished') return;
    const stars = getStarCount(store.score);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < stars; i++) {
      timers.push(setTimeout(() => sounds.starDing(i), 800 + i * 300 + 300));
    }
    if (stars >= 2) {
      timers.push(setTimeout(() => {
        sounds.celebration();
        confetti({
          particleCount: 100 + stars * 50,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0', '#7B2CBF'],
        });
      }, 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [store.phase, store.score]);

  const handleSubmit = useCallback(() => {
    const currentAnswer = userAnswerRef.current;
    if (!currentAnswer || feedback) return;
    const answer = parseInt(currentAnswer, 10);
    const question = store.questions[store.currentQuestionIndex];
    const correct = answer === question.answer;

    if (correct) {
      setFeedback('correct');
      sounds.correct();
      // Award bottle caps based on difficulty
      const capsEarned = getCapsPerCorrect(store.operation, store.difficulty, store.timesTable);
      profileStore.awardBottleCaps(capsEarned);
      setCapsEarnedThisGame(prev => prev + capsEarned);
      setLastCapsEarned(capsEarned);
      setShowCapAnimation(true);
      setTimeout(() => setShowCapAnimation(false), 800);
      sounds.bottleCapEarn();
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
  }, [feedback, store, profileStore]);

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

  // Results data
  const correctCount = store.results.filter(r => r.correct).length;
  const incorrectCount = store.results.length - correctCount;
  const totalQuestions = store.results.length;
  const stars = getStarCount(store.score);
  const resultMessage = totalQuestions > 0 ? getEncouragingMessage(store.score, correctCount, totalQuestions) : '';
  const totalTime = store.gameEndTime - store.gameStartTime;

  if (store.phase === 'finished') {
    return (
      <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
        <BubbleBackground />
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-5">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.h2>

          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <AvatarRenderer avatar={profile?.avatar} state={stars >= 2 ? 'celebrate' : stars >= 1 ? 'cheer' : 'encourage'} size={90} />
          </motion.div>

          {/* Stars */}
          <StarAward count={stars} />

          {/* Bottle caps earned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 bg-fizz-yellow/20 rounded-full px-5 py-2"
          >
            <BottleCapIcon size={28} />
            <span className="text-xl font-bold text-dark">+{capsEarnedThisGame}</span>
            <span className="text-sm text-dark/50">bottle caps earned!</span>
          </motion.div>

          {/* Score + Correct/Incorrect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-xl w-full"
          >
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-sm font-medium text-dark/50">Total Score</div>
                <div className="text-5xl font-bold text-cola-red">{store.score}</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-dark/50">Time</div>
                <div className="text-5xl font-bold text-bubble-blue tabular-nums">{formatTime(totalTime)}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-success/10 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Check size={20} className="text-success" strokeWidth={3} />
                  <span className="text-sm font-medium text-success">Correct</span>
                </div>
                <div className="text-4xl font-bold text-success">{correctCount}</div>
                <div className="text-xs text-dark/40">out of {totalQuestions}</div>
              </div>
              <div className="flex-1 bg-cola-red/10 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <X size={20} className="text-cola-red" strokeWidth={3} />
                  <span className="text-sm font-medium text-cola-red">Incorrect</span>
                </div>
                <div className="text-4xl font-bold text-cola-red">{incorrectCount}</div>
                <div className="text-xs text-dark/40">out of {totalQuestions}</div>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-dark/70 font-medium text-center"
          >
            {resultMessage}
          </motion.p>

          {/* Question Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="w-full"
          >
            <div className="text-sm font-medium text-dark/50 mb-2">Question Review</div>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-dark/5">
              {store.results.map((result, i) => {
                const symbol = getOperationSymbol(result.question.operation);
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
                      {result.question.operand1} {symbol} {result.question.operand2} = {result.question.answer}
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

          {/* Challenge + Done Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="w-full mt-2 pb-4 flex flex-col gap-3"
          >
            {/* Challenge button — only if >1 profile and not already a challenge game */}
            {profileStore.profiles.length >= 2 && !store.activeChallengeId && !challengeSent && (
              <AnimatedButton
                onClick={() => {
                  sounds.click();
                  setShowChallengePicker(true);
                }}
                className="w-full bg-fizz-yellow text-dark font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <Swords size={22} /> Challenge a Friend!
              </AnimatedButton>
            )}
            {challengeSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-success font-bold text-sm py-2"
              >
                Challenge sent!
              </motion.div>
            )}
            {/* If this was a challenge, show link to results */}
            {store.activeChallengeId && (
              <AnimatedButton
                onClick={() => {
                  sounds.click();
                  const cid = store.activeChallengeId;
                  store.reset();
                  scoreSaved.current = false;
                  setCapsEarnedThisGame(0);
                  router.push(`/challenges/${cid}`);
                }}
                className="w-full bg-bubble-blue text-white font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <Swords size={22} /> View Challenge Result
              </AnimatedButton>
            )}
            <AnimatedButton
              onClick={() => {
                sounds.click();
                store.reset();
                scoreSaved.current = false;
                setCapsEarnedThisGame(0);
                router.push('/');
              }}
              className="w-full bg-cola-red text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <Home size={24} /> Done
            </AnimatedButton>
          </motion.div>

          {/* Challenge picker modal */}
          <ChallengePickerModal
            open={showChallengePicker}
            profiles={profileStore.profiles}
            currentProfileId={profile?.id || ''}
            onPick={(challengeeId) => {
              if (!profile) return;
              const challengee = profileStore.getProfileById(challengeeId);
              if (!challengee) return;
              const config: ChallengeConfig = {
                operation: store.operation!,
                difficulty: store.difficulty,
                timesTable: store.timesTable,
                mixedRange: store.mixedRange,
              };
              const correct = store.results.filter(r => r.correct).length;
              challengeStore.createChallenge({
                id: crypto.randomUUID(),
                config,
                questions: store.questions,
                challengerId: profile.id,
                challengerName: profile.name,
                challengeeId: challengee.id,
                challengeeName: challengee.name,
                challengerResult: {
                  profileId: profile.id,
                  profileName: profile.name,
                  score: store.score,
                  correct,
                  total: store.results.length,
                },
                challengeeResult: null,
                status: 'pending',
                createdAt: new Date().toISOString(),
                bonusAwarded: false,
              });
              setShowChallengePicker(false);
              setChallengeSent(true);
              sounds.streak();
            }}
            onClose={() => setShowChallengePicker(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
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

          {store.phase === 'selectMixedRange' && (
            <MixedRangeSelector
              key="mixedrange"
              onSelect={(range) => store.setMixedRange(range)}
              onBack={() => store.goBack()}
            />
          )}

          {store.phase === 'countdown' && (
            <CountdownOverlay
              key="countdown"
              onComplete={() => store.startPlaying()}
            />
          )}

          {store.phase === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center gap-5"
            >
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex-1">
                  <ProgressBar
                    current={store.currentQuestionIndex}
                    total={store.questions.length}
                  />
                </div>
                <StreakCounter streak={store.streak} />
              </div>

              <div className="flex items-center justify-center gap-6">
                <div className="text-2xl font-bold text-cola-red">
                  Score: {store.score}
                </div>
                <GameTimer startTime={store.gameStartTime} />
              </div>

              {/* Bottle cap earned animation */}
              <AnimatePresence>
                {showCapAnimation && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -40, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed top-20 right-16 z-50 flex items-center gap-1"
                  >
                    <BottleCapIcon size={24} />
                    <span className="text-lg font-bold text-fizz-yellow">+{lastCapsEarned}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-4 w-full justify-center">
                <div className="hidden sm:block">
                  <AvatarRenderer avatar={profile?.avatar} state={mascotState} size={80} />
                </div>
                <div className="flex-1 max-w-md">
                  <QuestionCard
                    question={store.questions[store.currentQuestionIndex]}
                    userAnswer={userAnswer}
                    feedback={feedback}
                  />
                </div>
              </div>

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
