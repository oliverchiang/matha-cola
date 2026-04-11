'use client';

import { motion } from 'framer-motion';
import { Swords, Trophy } from 'lucide-react';
import { Challenge } from '@/lib/engine/challengeTypes';
import { useProfileStore } from '@/lib/stores/profileStore';
import AvatarMini from '@/components/avatar/AvatarMini';
import AnimatedButton from '@/components/shared/AnimatedButton';

interface ChallengeCardProps {
  challenge: Challenge;
  currentProfileId: string;
  onAccept?: () => void;
  onView?: () => void;
  index: number;
}

function describeConfig(c: Challenge): string {
  if (c.config.timesTable) {
    return c.config.timesTable === 'mixed'
      ? 'Mixed Times Tables'
      : `${c.config.timesTable}x Table`;
  }
  const op = c.config.operation.charAt(0).toUpperCase() + c.config.operation.slice(1);
  const diff = c.config.difficulty ? ` (${c.config.difficulty})` : '';
  return `${op}${diff}`;
}

export default function ChallengeCard({ challenge, currentProfileId, onAccept, onView, index }: ChallengeCardProps) {
  const profileStore = useProfileStore();
  const isPending = challenge.status === 'pending';
  const iAmChallengee = challenge.challengeeId === currentProfileId;

  const opponent = iAmChallengee
    ? profileStore.getProfileById(challenge.challengerId)
    : profileStore.getProfileById(challenge.challengeeId);

  const myResult = iAmChallengee ? challenge.challengeeResult : challenge.challengerResult;
  const theirResult = iAmChallengee ? challenge.challengerResult : challenge.challengeeResult;

  const iWon = myResult && theirResult && myResult.score > theirResult.score;
  const tied = myResult && theirResult && myResult.score === theirResult.score;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-4 shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <AvatarMini avatar={opponent?.avatar} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-dark text-sm truncate">
            {isPending ? `${challenge.challengerName} challenges you!` : (opponent?.name || 'Unknown')}
          </div>
          <div className="text-xs text-dark/40 flex items-center gap-1">
            <Swords size={12} />
            {describeConfig(challenge)}
          </div>
        </div>
        {!isPending && (
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
            iWon ? 'bg-success/10 text-success' : tied ? 'bg-fizz-yellow/20 text-dark' : 'bg-cola-red/10 text-cola-red'
          }`}>
            {iWon ? 'Won!' : tied ? 'Tie' : 'Lost'}
          </div>
        )}
      </div>

      {isPending && iAmChallengee ? (
        <div className="flex items-center justify-between">
          <div className="text-sm text-dark/50">
            Their score: <span className="font-bold text-dark">{challenge.challengerResult.score}</span>
          </div>
          <AnimatedButton
            onClick={() => onAccept?.()}
            className="bg-cola-red text-white font-bold text-sm px-5 py-2 rounded-xl flex items-center gap-1"
          >
            <Swords size={16} /> Accept!
          </AnimatedButton>
        </div>
      ) : !isPending ? (
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-dark/40">You: </span>
              <span className="font-bold text-dark">{myResult?.score ?? '-'}</span>
            </div>
            <div>
              <span className="text-dark/40">Them: </span>
              <span className="font-bold text-dark">{theirResult?.score ?? '-'}</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onView}
            className="text-xs font-bold text-bubble-blue cursor-pointer"
          >
            Details &rarr;
          </motion.button>
        </div>
      ) : (
        <div className="text-sm text-dark/40">Waiting for {challenge.challengeeName} to accept...</div>
      )}
    </motion.div>
  );
}
