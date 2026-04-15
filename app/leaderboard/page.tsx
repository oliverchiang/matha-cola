'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Clock, Star } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import LeaderboardEntry from '@/components/leaderboard/LeaderboardEntry';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { sounds } from '@/lib/sounds';

const operations = [
  { key: 'addition', label: 'Addition' },
  { key: 'subtraction', label: 'Subtraction' },
  { key: 'multiplication', label: 'Multiplication' },
  { key: 'division', label: 'Division' },
  { key: 'mixed', label: 'Mixed' },
  { key: 'word-problems', label: 'Word Problems' },
];

const difficulties: Record<string, { key: string; label: string }[]> = {
  addition: [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }],
  subtraction: [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }],
  multiplication: [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }, { key: 'mixedx', label: 'Mixed Tables' }],
  division: [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }],
  mixed: [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }],
  'word-problems': [{ key: 'easy', label: 'Easy' }, { key: 'medium', label: 'Medium' }, { key: 'hard', label: 'Hard' }, { key: 'super-hard', label: 'Super Hard' }],
};

interface Entry {
  profile_id: string;
  profile_name: string;
  avatar: Record<string, unknown>;
  score: number;
  time_ms: number;
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const [operation, setOperation] = useState('addition');
  const [difficulty, setDifficulty] = useState('easy');
  const [sortBy, setSortBy] = useState<'score' | 'time'>('score');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  const profile = profileStore.getActiveProfile();

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  // Reset difficulty when operation changes
  useEffect(() => {
    const diffs = difficulties[operation];
    if (diffs && !diffs.some(d => d.key === difficulty)) {
      setDifficulty(diffs[0].key);
    }
  }, [operation, difficulty]);

  const category = useMemo(() => `${operation}_${difficulty}`, [operation, difficulty]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?category=${category}&sort=${sortBy}`)
      .then(r => r.json())
      .then(data => { setEntries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, sortBy]);

  if (!profile) return null;

  const currentDiffs = difficulties[operation] || [];

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
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
          <Trophy size={32} className="text-fizz-yellow" />
          <h1 className="text-3xl font-bold text-dark">Leaderboard</h1>
        </motion.div>

        {/* Operation selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 w-full scrollbar-hide">
          {operations.map(op => (
            <motion.button
              key={op.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sounds.click(); setOperation(op.key); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                operation === op.key ? 'bg-cola-red text-white shadow-md' : 'bg-white text-dark/60 hover:bg-dark/5'
              }`}
            >
              {op.label}
            </motion.button>
          ))}
        </div>

        {/* Difficulty selector */}
        <div className="flex gap-2 w-full justify-center">
          {currentDiffs.map(d => (
            <motion.button
              key={d.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sounds.click(); setDifficulty(d.key); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                difficulty === d.key ? 'bg-bubble-blue text-white shadow-md' : 'bg-white text-dark/60 hover:bg-dark/5'
              }`}
            >
              {d.label}
            </motion.button>
          ))}
        </div>

        {/* Sort toggle */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.click(); setSortBy('score'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
              sortBy === 'score' ? 'bg-fizz-yellow text-dark shadow-md' : 'bg-white text-dark/50'
            }`}
          >
            <Star size={14} /> Score
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.click(); setSortBy('time'); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
              sortBy === 'time' ? 'bg-bubble-blue text-white shadow-md' : 'bg-white text-dark/50'
            }`}
          >
            <Clock size={14} /> Time
          </motion.button>
        </div>

        {/* Entries */}
        {loading ? (
          <p className="text-dark/40 text-sm">Loading...</p>
        ) : entries.length === 0 ? (
          <div className="text-center text-dark/40 text-sm py-8">
            <Trophy size={36} className="mx-auto mb-2 text-dark/20" />
            <p>No scores yet for this category!</p>
            <p className="text-xs mt-1">Be the first to play!</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {entries.map((e, i) => (
              <LeaderboardEntry
                key={i}
                rank={i + 1}
                name={e.profile_name}
                avatar={e.avatar}
                value={sortBy === 'score' ? `${e.score} pts` : formatTime(e.time_ms)}
                isMe={e.profile_id === profile.id}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
