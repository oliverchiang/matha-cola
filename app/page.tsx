'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProfileStore } from '@/lib/stores/profileStore';
import { useChallengeStore } from '@/lib/stores/challengeStore';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import ChallengeBanner from '@/components/challenge/ChallengeBanner';
import ProfileSelector from '@/components/profile/ProfileSelector';
import ProfileCreator from '@/components/profile/ProfileCreator';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { Trophy, ShoppingBag, Swords, Users, Medal } from 'lucide-react';

type View = 'loading' | 'select' | 'create' | 'home';

export default function Home() {
  const profileStore = useProfileStore();
  const challengeStore = useChallengeStore();
  const [view, setView] = useState<View>('loading');

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  // Load challenges once we know the active profile
  useEffect(() => {
    if (profileStore.loaded && profileStore.activeProfileId && !challengeStore.loaded) {
      challengeStore.load(profileStore.activeProfileId);
    }
  }, [profileStore.loaded, profileStore.activeProfileId, challengeStore]);

  useEffect(() => {
    if (!profileStore.loaded) return;
    if (profileStore.activeProfileId && profileStore.getActiveProfile()) {
      setView('home');
    } else if (profileStore.profiles.length === 0) {
      setView('create');
    } else {
      setView('select');
    }
  }, [profileStore.loaded, profileStore.activeProfileId, profileStore.profiles, profileStore]);

  const profile = profileStore.getActiveProfile();

  if (view === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BubbleBackground />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden px-4">
      <BubbleBackground />

      <div className="relative z-10 flex flex-col items-center gap-4 landscape:gap-3 w-full max-w-md landscape:max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center"
        >
          <h1 className="text-6xl sm:text-8xl landscape:text-5xl font-bold tracking-tight">
            <span className="text-cola-red">MATHA</span>
            <span className="text-dark">-</span>
            <span className="text-bubble-blue">COLA</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl landscape:text-base text-dark/60 mt-1 font-medium"
          >
            Fizzy Fun Math for Kids!
          </motion.p>
        </motion.div>

        {/* Profile selection / creation */}
        {view === 'select' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <ProfileSelector
              profiles={profileStore.profiles}
              onSelect={(id, pin) => profileStore.selectProfile(id, pin)}
              onDelete={(id, pin) => profileStore.deleteProfile(id, pin)}
              onCreateNew={() => setView('create')}
            />
          </motion.div>
        )}

        {view === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <ProfileCreator
              onCreated={(name, pin) => {
                profileStore.createProfile(name, pin);
              }}
              onBack={() => {
                if (profileStore.profiles.length > 0) {
                  setView('select');
                }
              }}
            />
          </motion.div>
        )}

        {/* Active profile home screen — landscape-friendly layout */}
        {view === 'home' && profile && (
          <>
            <div className="w-full flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-10 items-center gap-4">
              {/* Left side: avatar + greeting */}
              <div className="flex flex-col items-center gap-2 landscape:gap-3">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-dark/70"
                >
                  Hey {profile.name}!
                </motion.p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
                >
                  <AvatarRenderer avatar={profile.avatar} state="idle" size={110} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 bg-white/80 rounded-full px-3 py-1.5 shadow-sm"
                >
                  <BottleCapIcon size={20} />
                  <span className="text-base font-bold text-dark">{profile.bottleCaps}</span>
                  <span className="text-xs text-dark/50">caps</span>
                </motion.div>
              </div>

              {/* Right side: actions */}
              <div className="flex flex-col items-center gap-4">
                {/* Challenge banner */}
                {(() => {
                  const pending = challengeStore.getPendingForProfile(profile.id);
                  return pending.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="w-full max-w-xs"
                    >
                      <ChallengeBanner challenges={pending} />
                    </motion.div>
                  ) : null;
                })()}

                {/* Play Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/play">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="pulse-gentle bg-cola-red text-white text-2xl landscape:text-3xl font-bold px-12 landscape:px-16 py-4 landscape:py-5 rounded-full shadow-xl
                        cursor-pointer hover:shadow-2xl transition-shadow"
                    >
                      PLAY!
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Nav grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-5 gap-3 w-full max-w-xs"
                >
                  {[
                    { href: '/shop', icon: ShoppingBag, label: 'Shop', color: 'bg-cola-red/10 text-cola-red' },
                    { href: '/challenges', icon: Swords, label: 'Battle', color: 'bg-fizz-yellow/20 text-fizz-yellow' },
                    { href: '/friends', icon: Users, label: 'Friends', color: 'bg-bubble-blue/15 text-bubble-blue' },
                    { href: '/leaderboard', icon: Medal, label: 'Ranks', color: 'bg-op-multiplication/15 text-op-multiplication' },
                    { href: '/scores', icon: Trophy, label: 'Scores', color: 'bg-success/15 text-success' },
                  ].map(({ href, icon: Icon, label, color }) => (
                    <Link key={href} href={href}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center gap-1 cursor-pointer"
                      >
                        <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-[11px] font-bold text-dark/50">{label}</span>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
