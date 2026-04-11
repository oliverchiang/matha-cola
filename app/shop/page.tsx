'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useProfileStore } from '@/lib/stores/profileStore';
import { ItemCategory, MarketplaceItem, AvatarConfig } from '@/lib/engine/profileTypes';
import { getItemsByCategory, getMarketplaceItem } from '@/lib/data/marketplaceItems';
import ShopCategoryTabs from '@/components/shop/ShopCategoryTabs';
import ShopItemCard from '@/components/shop/ShopItemCard';
import BottleCapDisplay from '@/components/shop/BottleCapDisplay';
import PurchaseConfirmModal from '@/components/shop/PurchaseConfirmModal';
import AvatarRenderer from '@/components/avatar/AvatarRenderer';
import BubbleBackground from '@/components/shared/BubbleBackground';
import { sounds } from '@/lib/sounds';

export default function ShopPage() {
  const router = useRouter();
  const profileStore = useProfileStore();
  const [category, setCategory] = useState<ItemCategory>('hat');
  const [confirmItem, setConfirmItem] = useState<MarketplaceItem | null>(null);
  const [previewItemId, setPreviewItemId] = useState<string | null>(null);

  useEffect(() => {
    if (!profileStore.loaded) profileStore.load();
  }, [profileStore]);

  const profile = profileStore.getActiveProfile();

  useEffect(() => {
    if (profileStore.loaded && !profile) {
      router.push('/');
    }
  }, [profileStore.loaded, profile, router]);

  // Clear preview when switching categories
  useEffect(() => {
    setPreviewItemId(null);
  }, [category]);

  // Compute preview avatar
  const previewAvatar = useMemo((): AvatarConfig | undefined => {
    if (!profile) return undefined;
    if (!previewItemId) return profile.avatar;
    const item = getMarketplaceItem(previewItemId);
    if (!item) return profile.avatar;

    const av = { ...profile.avatar };
    if (item.category === 'skinColor' && item.previewColor) {
      av.skinColor = item.previewColor;
    } else if (item.category === 'bottleColor' && item.previewColor) {
      av.bottleColor = item.previewColor;
    } else {
      switch (item.category) {
        case 'hair': av.hair = item.id; break;
        case 'hat': av.hat = item.id; break;
        case 'shirt': av.shirt = item.id; break;
        case 'accessory': av.accessory = item.id; break;
        case 'bottleLabel': av.bottleLabel = item.id; break;
        case 'shoes': av.shoes = item.id; break;
      }
    }
    return av;
  }, [previewItemId, profile]);

  if (!profile) return null;

  const items = getItemsByCategory(category);

  const isEquipped = (item: MarketplaceItem): boolean => {
    const av = profile.avatar;
    if (item.category === 'bottleColor') return av.bottleColor === item.previewColor;
    if (item.category === 'skinColor') return av.skinColor === item.previewColor;
    const slot = item.category as keyof typeof av;
    return av[slot] === item.id;
  };

  const handleBuy = (item: MarketplaceItem) => {
    sounds.click();
    setConfirmItem(item);
  };

  const handleConfirmPurchase = async () => {
    if (!confirmItem) return;
    const success = await profileStore.purchaseItem(confirmItem.id);
    if (success) {
      sounds.purchase();
      await profileStore.equipItem(confirmItem.id);
      sounds.equipItem();
    }
    setConfirmItem(null);
    setPreviewItemId(null);
  };

  const handleEquip = async (item: MarketplaceItem) => {
    sounds.equipItem();
    await profileStore.equipItem(item.id);
  };

  const handlePreview = (item: MarketplaceItem) => {
    setPreviewItemId(prev => prev === item.id ? null : item.id);
  };

  const isPreviewing = previewItemId !== null && !profile.purchasedItems.includes(previewItemId);

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
          <BottleCapDisplay count={profile.bottleCaps} size="lg" />
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3"
        >
          <ShoppingBag size={32} className="text-cola-red" />
          <h1 className="text-3xl font-bold text-dark">Shop</h1>
        </motion.div>

        {/* Avatar preview with PREVIEW badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="relative"
        >
          <AvatarRenderer avatar={previewAvatar} state="idle" size={100} />
          {isPreviewing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 -translate-y-1/2 -right-20 bg-fizz-yellow text-dark text-xs font-bold px-3 py-1 rounded-full shadow-md"
            >
              PREVIEW
            </motion.div>
          )}
        </motion.div>

        {/* Category tabs */}
        <ShopCategoryTabs selected={category} onSelect={setCategory} />

        {/* Items grid */}
        <div className="grid grid-cols-2 gap-3 w-full pb-6">
          {items.map((item, i) => (
            <ShopItemCard
              key={item.id}
              item={item}
              owned={profile.purchasedItems.includes(item.id)}
              equipped={isEquipped(item)}
              canAfford={profile.bottleCaps >= item.price}
              isPreviewing={previewItemId === item.id}
              onBuy={() => handleBuy(item)}
              onEquip={() => handleEquip(item)}
              onPreview={() => handlePreview(item)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Purchase modal */}
      <PurchaseConfirmModal
        item={confirmItem}
        currentCaps={profile.bottleCaps}
        onConfirm={handleConfirmPurchase}
        onCancel={() => setConfirmItem(null)}
      />
    </div>
  );
}
