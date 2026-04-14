'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import { AvatarSlot, ItemCategory } from '@/lib/engine/profileTypes';
import { getMarketplaceItem, getItemsByCategory } from '@/lib/data/marketplaceItems';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { getAvatarLayer } from '@/lib/avatar/avatarLayers';
import { sounds } from '@/lib/sounds';

const slotCategories: { slot: AvatarSlot; category: ItemCategory; label: string }[] = [
  { slot: 'hat', category: 'hat', label: 'Hat' },
  { slot: 'hair', category: 'hair', label: 'Hair' },
  { slot: 'face', category: 'face', label: 'Face' },
  { slot: 'shirt', category: 'shirt', label: 'Shirt' },
  { slot: 'accessory', category: 'accessory', label: 'Acc 1' },
  { slot: 'accessory2', category: 'accessory', label: 'Acc 2' },
  { slot: 'shoes', category: 'shoes', label: 'Shoes' },
  { slot: 'pet', category: 'pet', label: 'Pet' },
  { slot: 'skinColor', category: 'skinColor', label: 'Skin' },
];

export default function AvatarPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const [selectedSlot, setSelectedSlot] = useState<AvatarSlot>('hat');

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  const profile = profileStore.getActiveProfile();

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  if (!profile) return null;

  const currentCategory = slotCategories.find(s => s.slot === selectedSlot)!;
  const allItems = getItemsByCategory(currentCategory.category);
  const ownedItems = allItems.filter(item => profile.purchasedItems.includes(item.id));

  const isEquipped = (itemId: string): boolean => {
    const item = getMarketplaceItem(itemId);
    if (!item) return false;
    const av = profile.avatar;
    if (item.category === 'skinColor') return av.skinColor === item.previewColor;
    // For accessories, check against the specific selected slot
    if (item.category === 'accessory') {
      if (selectedSlot === 'accessory2') return av.accessory2 === item.id;
      return av.accessory === item.id;
    }
    const slot = item.category as keyof typeof av;
    return av[slot] === item.id;
  };

  const handleEquip = async (itemId: string) => {
    sounds.equipItem();
    if (selectedSlot === 'accessory' || selectedSlot === 'accessory2') {
      await profileStore.equipItemToSlot(itemId, selectedSlot);
      return;
    }
    await profileStore.equipItem(itemId);
  };

  const handleUnequip = async () => {
    sounds.click();
    await profileStore.unequipSlot(selectedSlot);
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative px-4 py-6">
      <BubbleBackground />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-5">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <motion.button
            onClick={() => router.push('/')}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1 text-dark/50 hover:text-dark/80 font-medium cursor-pointer"
          >
            <ArrowLeft size={20} /> Home
          </motion.button>
          <div className="flex items-center gap-1">
            <BottleCapIcon size={20} />
            <span className="font-bold text-dark">{profile.bottleCaps}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-dark">My Avatar</h1>

        {/* Large avatar preview */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <AvatarRenderer avatar={profile.avatar} state="idle" size={160} />
        </motion.div>

        {/* Slot tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 w-full">
          {slotCategories.map(({ slot, label }) => (
            <motion.button
              key={slot}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sounds.click();
                setSelectedSlot(slot);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedSlot === slot
                  ? 'bg-bubble-blue text-white shadow-md'
                  : 'bg-white text-dark/60 hover:bg-dark/5'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Items owned for this slot */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-dark">{currentCategory.label}</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleUnequip}
              className="flex items-center gap-1 text-xs text-dark/40 hover:text-dark/60 cursor-pointer"
            >
              <RotateCcw size={12} /> Reset
            </motion.button>
          </div>

          {ownedItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-dark/40 text-sm">No items yet!</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/shop')}
                className="mt-2 text-sm font-bold text-cola-red cursor-pointer"
              >
                Visit the Shop
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {ownedItems.map(item => {
                const equipped = isEquipped(item.id);
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEquip(item.id)}
                    className={`bg-white rounded-xl p-3 shadow-sm flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      equipped ? 'ring-2 ring-success' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      {item.previewColor ? (
                        <div
                          className="w-8 h-8 rounded-full border-2 border-dark/10"
                          style={{ backgroundColor: item.previewColor }}
                        />
                      ) : (
                        <svg viewBox="-10 -30 120 180" className="w-full h-full" fill="none">
                          {getAvatarLayer(item.svgLayerKey)}
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-medium text-dark truncate max-w-full">{item.name}</span>
                    {equipped && (
                      <span className="text-[10px] font-bold text-success">Equipped</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Link to shop */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/shop')}
          className="text-cola-red font-bold text-sm cursor-pointer mt-2"
        >
          Browse Shop for More Items
        </motion.button>
      </div>
    </div>
  );
}
