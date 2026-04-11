import { HighScoreEntry } from './types';

// === Avatar System ===
export type AvatarSlot = 'skinColor' | 'bottleColor' | 'hair' | 'hat' | 'shirt' | 'accessory' | 'bottleLabel' | 'shoes';

export interface AvatarConfig {
  skinColor: string;
  bottleColor: string;
  hair: string | null;
  hat: string | null;
  shirt: string | null;
  accessory: string | null;
  bottleLabel: string | null;
  shoes: string | null;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#FFD166',
  bottleColor: '#E63946',
  hair: null,
  hat: null,
  shirt: null,
  accessory: null,
  bottleLabel: null,
  shoes: null,
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
export type ItemCategory = 'hair' | 'hat' | 'shirt' | 'accessory' | 'bottleColor' | 'bottleLabel' | 'shoes' | 'skinColor';

export interface MarketplaceItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  svgLayerKey: string;
  previewColor?: string;
}
