'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Check } from 'lucide-react';
import AvatarMini from '@/components/avatar/AvatarMini';
import { sounds } from '@/lib/sounds';

interface SearchResult {
  id: string;
  name: string;
  avatar: Record<string, unknown>;
}

interface FriendSearchProps {
  myId: string;
  existingIds: Set<string>;
  onSendRequest: (addresseeId: string) => Promise<boolean>;
}

export default function FriendSearch({ myId, existingIds, onSendRequest }: FriendSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (query.length < 1) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/friends/search?q=${encodeURIComponent(query)}&excludeId=${myId}`);
        const data = await res.json();
        setResults(data);
      } catch { /* ignore */ }
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, myId]);

  const handleSend = async (id: string) => {
    sounds.click();
    const ok = await onSendRequest(id);
    if (ok) {
      sounds.correct();
      setSentIds(prev => new Set(prev).add(id));
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-3">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white shadow-sm border-2 border-transparent focus:border-bubble-blue focus:outline-none text-dark font-medium placeholder:text-dark/30"
        />
      </div>

      {searching && <p className="text-sm text-dark/40 text-center">Searching...</p>}

      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map(r => {
            const alreadyFriend = existingIds.has(r.id);
            const alreadySent = sentIds.has(r.id);
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"
              >
                <AvatarMini avatar={r.avatar as never} size={36} />
                <span className="flex-1 font-bold text-sm text-dark truncate">{r.name}</span>
                {alreadyFriend || alreadySent ? (
                  <div className="flex items-center gap-1 text-xs text-success font-bold">
                    <Check size={14} /> {alreadyFriend ? 'Friends' : 'Sent'}
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(r.id)}
                    className="flex items-center gap-1 text-xs font-bold text-white bg-bubble-blue px-3 py-1.5 rounded-full cursor-pointer"
                  >
                    <UserPlus size={14} /> Add
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
