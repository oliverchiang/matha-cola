'use client';

import { motion } from 'framer-motion';
import { MarketplaceItem } from '@/lib/engine/profileTypes';
import BottleCapIcon from '@/components/shared/BottleCapIcon';
import { getAvatarLayer } from '@/lib/avatar/avatarLayers';
import { sounds } from '@/lib/sounds';

interface ShopItemCardProps {
  item: MarketplaceItem;
  owned: boolean;
  equipped: boolean;
  canAfford: boolean;
  isPreviewing?: boolean;
  onBuy: () => void;
  onEquip: () => void;
  onPreview?: () => void;
  index: number;
}

const rarityBorders: Record<string, string> = {
  common: 'border-dark/10',
  rare: 'border-bubble-blue',
  epic: 'border-fizz-yellow',
};

const rarityLabels: Record<string, string> = {
  common: '',
  rare: 'Rare',
  epic: 'Epic',
};

const rarityLabelColors: Record<string, string> = {
  rare: 'text-bubble-blue',
  epic: 'text-fizz-yellow',
};

export default function ShopItemCard({ item, owned, equipped, canAfford, isPreviewing, onBuy, onEquip, onPreview, index }: ShopItemCardProps) {
  const borderClass = isPreviewing ? 'border-fizz-yellow' : rarityBorders[item.rarity];

  const handleCardClick = () => {
    if (!owned && onPreview) {
      sounds.click();
      onPreview();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleCardClick}
      className={`bg-white rounded-2xl p-4 shadow-md border-2 ${borderClass} flex flex-col items-center gap-2 ${
        item.rarity === 'epic' ? 'shimmer' : ''
      } ${!owned && onPreview ? 'cursor-pointer' : ''} ${isPreviewing ? 'ring-2 ring-fizz-yellow/50' : ''}`}
    >
      {/* Preview */}
      <div className="w-16 h-16 flex items-center justify-center">
        {item.previewColor ? (
          <div
            className="w-12 h-12 rounded-full border-2 border-dark/10"
            style={{ backgroundColor: item.previewColor }}
          />
        ) : (
          <svg viewBox="-10 -30 120 180" className="w-full h-full" fill="none">
            {getAvatarLayer(item.svgLayerKey)}
          </svg>
        )}
      </div>

      {/* Name + rarity */}
      <div className="text-center">
        <div className="font-bold text-sm text-dark">{item.name}</div>
        {rarityLabels[item.rarity] && (
          <div className={`text-xs font-medium ${rarityLabelColors[item.rarity]}`}>
            {rarityLabels[item.rarity]}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-dark/40 text-center leading-tight">{item.description}</p>

      {/* Try on hint for unowned items */}
      {!owned && (
        <p className="text-[10px] text-dark/30 italic">Tap to try on</p>
      )}

      {/* Action */}
      {equipped ? (
        <div className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full">
          Equipped
        </div>
      ) : owned ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onEquip();
          }}
          className="text-xs font-bold text-bubble-blue bg-bubble-blue/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-bubble-blue/20 transition-colors"
        >
          Equip
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onBuy();
          }}
          disabled={!canAfford}
          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
            canAfford
              ? 'bg-cola-red text-white hover:bg-cola-red/90 cursor-pointer'
              : 'bg-dark/10 text-dark/30 cursor-not-allowed'
          }`}
        >
          <BottleCapIcon size={14} />
          {item.price}
        </motion.button>
      )}
    </motion.div>
  );
}
