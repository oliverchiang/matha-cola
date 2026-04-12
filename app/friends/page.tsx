'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import { useFriendStore } from '@/lib/stores/friendStore';
import FriendSearch from '@/components/friends/FriendSearch';
import FriendRequestCard from '@/components/friends/FriendRequestCard';
import FriendCard from '@/components/friends/FriendCard';
import BubbleBackground from '@/components/shared/BubbleBackground';

export default function FriendsPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const friendStore = useFriendStore();

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
    if (profile && !friendStore.loaded) {
      friendStore.load(profile.id);
    }
  }, [profile, friendStore]);

  if (!profile) return null;

  const pendingRequests = friendStore.getPendingRequests(profile.id);
  const sentRequests = friendStore.getSentRequests(profile.id);
  const friends = friendStore.getFriends(profile.id);

  // All IDs that have a relationship already
  const existingIds = new Set(
    friendStore.friendships.map(f =>
      f.requester_id === profile.id ? f.addressee_id : f.requester_id
    )
  );

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
          <Users size={32} className="text-bubble-blue" />
          <h1 className="text-3xl font-bold text-dark">Friends</h1>
        </motion.div>

        {/* Search */}
        <FriendSearch
          myId={profile.id}
          existingIds={existingIds}
          onSendRequest={(addresseeId) => friendStore.sendRequest(profile.id, addresseeId)}
        />

        {/* Pending requests */}
        {pendingRequests.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold text-dark mb-2">Friend Requests</h2>
            <div className="flex flex-col gap-2">
              {pendingRequests.map(f => (
                <FriendRequestCard
                  key={f.id}
                  friendship={f}
                  onAccept={() => friendStore.acceptRequest(f.id)}
                  onDecline={() => friendStore.removeFriend(f.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sent requests */}
        {sentRequests.length > 0 && (
          <div className="w-full">
            <h2 className="text-sm font-bold text-dark/40 mb-2">Sent Requests</h2>
            <div className="flex flex-col gap-2">
              {sentRequests.map(f => (
                <div key={f.id} className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 opacity-60">
                  <span className="font-medium text-sm text-dark truncate flex-1">{f.name}</span>
                  <span className="text-xs text-dark/40">Pending...</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends list */}
        <div className="w-full">
          <h2 className="text-lg font-bold text-dark mb-2">
            My Friends {friends.length > 0 && <span className="text-dark/30 text-sm">({friends.length})</span>}
          </h2>
          {friends.length === 0 ? (
            <div className="text-center text-dark/40 text-sm py-6">
              <Users size={36} className="mx-auto mb-2 text-dark/20" />
              <p>No friends yet! Search for someone above.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {friends.map(f => (
                <FriendCard
                  key={f.id}
                  friendship={f}
                  onRemove={() => friendStore.removeFriend(f.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
