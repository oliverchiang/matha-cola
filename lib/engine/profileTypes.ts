import { HighScoreEntry } from './types';

// === Avatar System ===
export type BodyStyle = 'neutral' | 'masculine' | 'feminine';

export type AvatarSlot = 'skinColor' | 'bodyStyle' | 'hair' | 'hat' | 'shirt' | 'accessory' | 'face' | 'shoes' | 'pet';

export interface AvatarConfig {
  skinColor: string;
  bodyStyle: BodyStyle;
  hair: string | null;
  hat: string | null;
  shirt: string | null;
  accessory: string | null;
  face: string | null;
  shoes: string | null;
  pet: string | null;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#F4C49C',
  bodyStyle: 'neutral',
  hair: null,
  hat: null,
  shirt: null,
  accessory: null,
  face: null,
  shoes: null,
  pet: null,
};

// === Profile System ===
export interface Profile {
  id: string;
  name: string;
  pin: string;
  bottleCaps: number;
  avatar: AvatarConfig;
  purchasedItems: string[];
  createdAt: string;
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  highScores: Record<string, HighScoreEntry>;
}

// === Marketplace ===
export type ItemCategory = 'hair' | 'hat' | 'shirt' | 'accessory' | 'face' | 'shoes' | 'skinColor' | 'pet';

export interface MarketplaceItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'mythical' | 'legendary';
  svgLayerKey: string;
  previewColor?: string;
}
