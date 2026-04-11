'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Swords } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import { useChallengeStore } from '@/lib/stores/challengeStore';
import { useGameStore } from '@/lib/stores/gameStore';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { sounds } from '@/lib/sounds';

export default function ChallengesPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const challengeStore = useChallengeStore();
  const gameStore = useGameStore();

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  useEffect(() => {
    if (profileStore.loaded && profileStore.activeProfileId && !challengeStore.loaded) {
      challengeStore.load(profileStore.activeProfileId);
    }
  }, [profileStore.loaded, profileStore.activeProfileId, challengeStore]);

  const profile = profileStore.getActiveProfile();

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  if (!profile) return null;

  const pending = challengeStore.getPendingForProfile(profile.id);
  // Also show challenges I sent that are pending
  const sentPending = challengeStore.challenges.filter(
    c => c.challengerId === profile.id && c.status === 'pending'
  );
  const completed = challengeStore.getCompletedForProfile(profile.id);

  const handleAccept = (challengeId: string) => {
    const challenge = challengeStore.getChallengeById(challengeId);
    if (!challenge) return;
    sounds.click();
    gameStore.startFromChallenge(challenge.config, challenge.id, challenge.questions);
    router.push('/play');
  };

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
          <Swords size={32} className="text-cola-red" />
          <h1 className="text-3xl font-bold text-dark">Challenges</h1>
        </motion.div>

        {/* Pending challenges (received) */}
        {pending.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold text-dark mb-2">Accept a Challenge</h2>
            <div className="flex flex-col gap-3">
              {pending.map((c, i) => (
                <ChallengeCard
                  key={c.id}
                  challenge={c}
                  currentProfileId={profile.id}
                  onAccept={() => handleAccept(c.id)}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sent pending */}
        {sentPending.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold text-dark/60 mb-2">Waiting for Response</h2>
            <div className="flex flex-col gap-3">
              {sentPending.map((c, i) => (
                <ChallengeCard
                  key={c.id}
                  challenge={c}
                  currentProfileId={profile.id}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed challenges */}
        {completed.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold text-dark/60 mb-2">Completed</h2>
            <div className="flex flex-col gap-3">
              {completed.map((c, i) => (
                <ChallengeCard
                  key={c.id}
                  challenge={c}
                  currentProfileId={profile.id}
                  onView={() => router.push(`/challenges/${c.id}`)}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {pending.length === 0 && sentPending.length === 0 && completed.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-dark/40 text-lg mt-8"
          >
            <Swords size={48} className="mx-auto mb-3 text-dark/20" />
            <p>No challenges yet!</p>
            <p className="text-sm mt-1">Play a game and challenge a friend.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
