'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '@/lib/sounds';

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  // Start background music on first user interaction
  useEffect(() => {
    function handleInteraction() {
      if (!musicStarted) {
        sounds.startMusic();
        setMusicStarted(true);
      }
      document.removeEventListener('click', handleInteraction);
    }
    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, [musicStarted]);

  const toggle = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
    if (!musicStarted) {
      sounds.startMusic();
      setMusicStarted(true);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggle}
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md
        flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX size={22} className="text-dark/50" />
      ) : (
        <Volume2 size={22} className="text-cola-red" />
      )}
    </motion.button>
  );
}
