'use client';

import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { Challenge } from '@/lib/engine/challengeTypes';
import { useProfileStore } from '@/lib/stores/profileStore';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import BottleCapIcon from '@/components/shared/BottleCapIcon';

interface ChallengeComparisonProps {
  challenge: Challenge;
  currentProfileId: string;
}

export default function ChallengeComparison({ challenge, currentProfileId }: ChallengeComparisonProps) {
  const profileStore = useProfileStore();
  const challengerProfile = profileStore.getProfileById(challenge.challengerId);
  const challengeeProfile = profileStore.getProfileById(challenge.challengeeId);

  const aResult = challenge.challengerResult;
  const bResult = challenge.challengeeResult;

  if (!bResult) return null;

  const aWins = aResult.score > bResult.score;
  const bWins = bResult.score > aResult.score;
  const tie = aResult.score === bResult.score;

  const iAmChallenger = challenge.challengerId === currentProfileId;
  const iWon = (iAmChallenger && aWins) || (!iAmChallenger && bWins);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Winner banner */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="text-center"
      >
        {tie ? (
          <div className="text-3xl font-bold text-fizz-yellow">It&apos;s a Tie!</div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Crown size={32} className="text-fizz-yellow" />
            <div className="text-3xl font-bold text-fizz-yellow">
              {iWon ? 'You Won!' : 'They Won!'}
            </div>
          </div>
        )}
      </motion.div>

      {/* Side by side */}
      <div className="flex gap-4 w-full">
        {/* Player A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`flex-1 bg-white rounded-2xl p-4 shadow-md flex flex-col items-center gap-2 ${
            aWins ? 'ring-2 ring-fizz-yellow' : ''
          }`}
        >
          {aWins && <Trophy size={20} className="text-fizz-yellow" />}
          <AvatarRenderer avatar={challengerProfile?.avatar} state={aWins ? 'celebrate' : 'idle'} size={60} />
          <div className="font-bold text-sm text-dark truncate max-w-full">{aResult.profileName}</div>
          <div className="text-3xl font-bold text-cola-red">{aResult.score}</div>
          <div className="text-xs text-dark/40">{aResult.correct}/{aResult.total} correct</div>
        </motion.div>

        {/* VS */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex items-center"
        >
          <div className="text-2xl font-bold text-dark/20">VS</div>
        </motion.div>

        {/* Player B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`flex-1 bg-white rounded-2xl p-4 shadow-md flex flex-col items-center gap-2 ${
            bWins ? 'ring-2 ring-fizz-yellow' : ''
          }`}
        >
          {bWins && <Trophy size={20} className="text-fizz-yellow" />}
          <AvatarRenderer avatar={challengeeProfile?.avatar} state={bWins ? 'celebrate' : 'idle'} size={60} />
          <div className="font-bold text-sm text-dark truncate max-w-full">{bResult.profileName}</div>
          <div className="text-3xl font-bold text-cola-red">{bResult.score}</div>
          <div className="text-xs text-dark/40">{bResult.correct}/{bResult.total} correct</div>
        </motion.div>
      </div>

      {/* Bonus caps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-2 bg-fizz-yellow/20 rounded-full px-5 py-2"
      >
        <BottleCapIcon size={22} />
        <span className="text-sm font-bold text-dark">
          {tie ? 'Both earned +3 bonus caps!' : `Winner earned +5 bonus caps!`}
        </span>
      </motion.div>
    </div>
  );
}
