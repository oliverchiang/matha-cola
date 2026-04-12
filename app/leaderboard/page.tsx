'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Clock, Star } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import LeaderboardEntry from '@/components/leaderboard/LeaderboardEntry';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { sounds } from '@/lib/sounds';

const categories = [
  { key: 'addition_easy', label: 'Addition Easy' },
  { key: 'addition_medium', label: 'Addition Med' },
  { key: 'addition_hard', label: 'Addition Hard' },
  { key: 'subtraction_easy', label: 'Subtract Easy' },
  { key: 'subtraction_medium', label: 'Subtract Med' },
  { key: 'subtraction_hard', label: 'Subtract Hard' },
  { key: 'multiplication_mixedx', label: 'Times Mixed' },
  { key: 'division_easy', label: 'Division Easy' },
  { key: 'division_medium', label: 'Division Med' },
  { key: 'division_hard', label: 'Division Hard' },
  { key: 'mixed_easy', label: 'Mixed Easy' },
  { key: 'mixed_medium', label: 'Mixed Med' },
  { key: 'mixed_hard', label: 'Mixed Hard' },
  { key: 'word-problems_easy', label: 'Words Easy' },
  { key: 'word-problems_medium', label: 'Words Med' },
  { key: 'word-problems_hard', label: 'Words Hard' },
];

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
  const [category, setCategory] = useState(categories[0].key);
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

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?category=${category}&sort=${sortBy}`)
      .then(r => r.json())
      .then(data => { setEntries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, sortBy]);

  if (!profile) return null;

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-5">
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

        {/* Sort toggle */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.click(); setSortBy('score'); }}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold cursor-pointer ${
              sortBy === 'score' ? 'bg-fizz-yellow text-dark shadow-md' : 'bg-white text-dark/50'
            }`}
          >
            <Star size={16} /> Best Score
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { sounds.click(); setSortBy('time'); }}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold cursor-pointer ${
              sortBy === 'time' ? 'bg-bubble-blue text-white shadow-md' : 'bg-white text-dark/50'
            }`}
          >
            <Clock size={16} /> Fastest Time
          </motion.button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 w-full scrollbar-hide">
          {categories.map(c => (
            <motion.button
              key={c.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sounds.click(); setCategory(c.key); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                category === c.key ? 'bg-cola-red text-white shadow-md' : 'bg-white text-dark/60 hover:bg-dark/5'
              }`}
            >
              {c.label}
            </motion.button>
          ))}
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
