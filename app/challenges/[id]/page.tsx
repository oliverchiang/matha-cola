'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Swords } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import { useChallengeStore } from '@/lib/stores/challengeStore';
import ChallengeComparison from '@/components/challenge/ChallengeComparison';
import AnimatedButton from '@/components/shared/AnimatedButton';
import BubbleBackground from '@/components/shared/BubbleBackground';
import confetti from 'canvas-confetti';
import { sounds } from '@/lib/sounds';

export default function ChallengeResultPage() {
  const router = useRouter();
  const params = useParams();
  const challengeId = params.id as string;
  const profileStore = useProfileStore();
  const challengeStore = useChallengeStore();

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  useEffect(() => {
    if (profileStore.loaded && profileStore.activeProfileId && !challengeStore.loaded) {
      challengeStore.load(profileStore.activeProfileId);
    }
  }, [profileStore.loaded, profileStore.activeProfileId, challengeStore]);

  const profile = profileStore.getActiveProfile();
  const challenge = challengeStore.getChallengeById(challengeId);

  // Celebration effect
  useEffect(() => {
    if (!challenge || !challenge.challengeeResult || !profile) return;
    const iAmChallenger = challenge.challengerId === profile.id;
    const myScore = iAmChallenger ? challenge.challengerResult.score : challenge.challengeeResult.score;
    const theirScore = iAmChallenger ? challenge.challengeeResult.score : challenge.challengerResult.score;

    if (myScore >= theirScore) {
      const timer = setTimeout(() => {
        sounds.celebration();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#E63946', '#FFD166', '#4ECDC4', '#06D6A0', '#7B2CBF'],
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [challenge, profile]);

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  if (!profile || !challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubbleBackground />
        <div className="relative z-10 text-dark/40">
          {challengeStore.loaded ? 'Challenge not found' : 'Loading...'}
        </div>
      </div>
    );
  }

  const isComplete = challenge.status === 'completed' && challenge.challengeeResult;

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-5">
        <motion.button
          onClick={() => router.push('/challenges')}
          whileTap={{ scale: 0.9 }}
          className="self-start flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
        >
          <ArrowLeft size={20} /> Challenges
        </motion.button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <Swords size={28} className="text-cola-red" />
          <h1 className="text-2xl font-bold text-dark">Challenge Result</h1>
        </motion.div>

        {isComplete ? (
          <ChallengeComparison challenge={challenge} currentProfileId={profile.id} />
        ) : (
          <div className="text-center text-dark/40 mt-8">
            <Swords size={48} className="mx-auto mb-3 text-dark/20" />
            <p>Waiting for {challenge.challengeeName} to complete the challenge...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full mt-4 pb-4"
        >
          <AnimatedButton
            onClick={() => {
              sounds.click();
              router.push('/');
            }}
            className="w-full bg-cola-red text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Home size={24} /> Home
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}
