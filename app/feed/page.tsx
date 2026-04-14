'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Activity, RefreshCw } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import AvatarMini from '@/components/avatar/AvatarMini';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { AvatarConfig } from '@/lib/engine/profileTypes';

interface FeedEntry {
  id: string;
  profile_id: string;
  profile_name: string;
  avatar: AvatarConfig;
  category: string;
  score: number;
  time_ms: number;
  created_at: string;
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  addition: { label: 'Addition', color: 'bg-success/15 text-success' },
  subtraction: { label: 'Subtraction', color: 'bg-cola-red/15 text-cola-red' },
  multiplication: { label: 'Multiplication', color: 'bg-fizz-yellow/20 text-amber-600' },
  division: { label: 'Division', color: 'bg-bubble-blue/15 text-bubble-blue' },
  mixed: { label: 'Mixed', color: 'bg-purple-100 text-purple-600' },
  'word-problems': { label: 'Word Problems', color: 'bg-orange-100 text-orange-600' },
};

function parseCategoryLabel(cat: string): { operation: string; detail: string } {
  const parts = cat.split('_');
  const op = parts[0];
  const detail = parts.slice(1).join('_');
  return { operation: op, detail };
}

function formatDetail(detail: string): string {
  if (detail.endsWith('x')) return `${detail.replace('x', '')}× tables`;
  if (detail === 'mixedx') return 'Mixed tables';
  return detail.charAt(0).toUpperCase() + detail.slice(1);
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getStars(score: number): number {
  if (score >= 120) return 3;
  if (score >= 80) return 2;
  if (score >= 50) return 1;
  return 0;
}

export default function FeedPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const [entries, setEntries] = useState<FeedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  const profile = profileStore.getActiveProfile();

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  const fetchFeed = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/feed');
      const data = await res.json();
      setEntries(data);
    } catch {
      // ignore
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Auto-refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => fetchFeed(), 15000);
    return () => clearInterval(interval);
  }, [fetchFeed]);

  // Update relative times every 10 seconds
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  if (!profile) return null;

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <motion.button
            onClick={() => router.push('/')}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
          >
            <ArrowLeft size={20} /> Home
          </motion.button>
          <motion.button
            onClick={() => fetchFeed(true)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 text-dark/40 hover:text-dark/60 cursor-pointer"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            <span className="text-xs font-medium">Refresh</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <Activity size={32} className="text-cola-red" />
          <h1 className="text-3xl font-bold text-dark">Live Feed</h1>
        </motion.div>

        <p className="text-xs text-dark/40 -mt-2">Recent games from all players</p>

        {/* Feed entries */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <RefreshCw size={24} className="animate-spin text-dark/30" />
            <p className="text-dark/40 text-sm">Loading feed...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center text-dark/40 text-sm py-8">
            <Activity size={36} className="mx-auto mb-2 text-dark/20" />
            <p>No games played yet!</p>
            <p className="text-xs mt-1">Be the first to play!</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, i) => {
                const { operation, detail } = parseCategoryLabel(entry.category);
                const catInfo = categoryLabels[operation] || { label: operation, color: 'bg-dark/10 text-dark/60' };
                const stars = getStars(entry.score);
                const isMe = entry.profile_id === profile.id;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.04 }}
                    layout
                    className={`flex items-center gap-3 p-3 rounded-xl shadow-sm ${
                      isMe ? 'bg-bubble-blue/10 ring-2 ring-bubble-blue' : 'bg-white'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <AvatarMini avatar={entry.avatar} size={36} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-dark truncate">{entry.profile_name}</span>
                        {isMe && (
                          <span className="text-[9px] font-bold bg-bubble-blue text-white px-1.5 py-0.5 rounded-full">YOU</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${catInfo.color}`}>
                          {catInfo.label}
                        </span>
                        {detail && (
                          <span className="text-[10px] text-dark/40 font-medium">
                            {formatDetail(detail)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Score + meta */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-dark tabular-nums">{entry.score}</span>
                        <span className="text-[10px] text-dark/40">pts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-dark/30 tabular-nums">{formatTime(entry.time_ms)}</span>
                        {stars > 0 && (
                          <span className="text-[10px]">{'⭐'.repeat(stars)}</span>
                        )}
                      </div>
                      <span className="text-[9px] text-dark/25 mt-0.5">{timeAgo(entry.created_at)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
