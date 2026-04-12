import { MarketplaceItem, ItemCategory } from '@/lib/engine/profileTypes';

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // === HATS ===
  { id: 'hat-backwards-cap', name: 'Backwards Cap', category: 'hat', price: 45, description: 'Chillin\' like a villain', rarity: 'common', svgLayerKey: 'hat-backwards-cap' },
  { id: 'hat-beanie', name: 'Cozy Beanie', category: 'hat', price: 54, description: 'Warm and trendy', rarity: 'common', svgLayerKey: 'hat-beanie' },
  { id: 'hat-cat-ears', name: 'Cat Ears', category: 'hat', price: 24, description: 'Meow! Purrfect style', rarity: 'common', svgLayerKey: 'hat-cat-ears' },
  { id: 'hat-wizard', name: 'Wizard Hat', category: 'hat', price: 36, description: 'You\'re a math wizard!', rarity: 'rare', svgLayerKey: 'hat-wizard' },
  { id: 'hat-crown', name: 'Royal Crown', category: 'hat', price: 75, description: 'Rule the math kingdom!', rarity: 'epic', svgLayerKey: 'hat-crown' },
  { id: 'hat-headband', name: 'Sport Headband', category: 'hat', price: 36, description: 'Game face on!', rarity: 'common', svgLayerKey: 'hat-headband' },
  { id: 'hat-astronaut', name: 'Space Helmet', category: 'hat', price: 84, description: 'Houston, we have a genius', rarity: 'epic', svgLayerKey: 'hat-astronaut' },

  // === HAIR ===
  { id: 'hair-spiky', name: 'Blue Spikes', category: 'hair', price: 45, description: 'Electric blue energy!', rarity: 'common', svgLayerKey: 'hair-spiky' },
  { id: 'hair-curly', name: 'Curly Puff', category: 'hair', price: 54, description: 'Big bouncy curls', rarity: 'common', svgLayerKey: 'hair-curly' },
  { id: 'hair-braids', name: 'Box Braids', category: 'hair', price: 30, description: 'Long beautiful braids', rarity: 'rare', svgLayerKey: 'hair-braids' },
  { id: 'hair-pigtails', name: 'Pigtails', category: 'hair', price: 24, description: 'Double the fun!', rarity: 'common', svgLayerKey: 'hair-pigtails' },
  { id: 'hair-mohawk', name: 'Rainbow Mohawk', category: 'hair', price: 45, description: 'Bold and colourful!', rarity: 'rare', svgLayerKey: 'hair-mohawk' },
  { id: 'hair-long', name: 'Long & Flowing', category: 'hair', price: 24, description: 'Fabulous flow!', rarity: 'common', svgLayerKey: 'hair-long' },
  { id: 'hair-afro', name: 'Big Afro', category: 'hair', price: 36, description: 'Volume to 100!', rarity: 'rare', svgLayerKey: 'hair-afro' },
  { id: 'hair-anime', name: 'Anime Hair', category: 'hair', price: 60, description: 'Main character energy', rarity: 'epic', svgLayerKey: 'hair-anime' },

  // === FACE (glasses, expressions) ===
  { id: 'face-cool-shades', name: 'Cool Shades', category: 'face', price: 45, description: 'Too cool for school', rarity: 'common', svgLayerKey: 'face-cool-shades' },
  { id: 'face-heart-glasses', name: 'Heart Glasses', category: 'face', price: 54, description: 'Spreading the love!', rarity: 'common', svgLayerKey: 'face-heart-glasses' },
  { id: 'face-star-eyes', name: 'Star Eyes', category: 'face', price: 30, description: 'Starstruck!', rarity: 'rare', svgLayerKey: 'face-star-eyes' },
  { id: 'face-nerd-glasses', name: 'Nerd Glasses', category: 'face', price: 36, description: 'Smart and proud', rarity: 'common', svgLayerKey: 'face-nerd-glasses' },

  // === SHIRTS ===
  { id: 'shirt-lightning', name: 'Lightning Tee', category: 'shirt', price: 24, description: 'Electrifying!', rarity: 'common', svgLayerKey: 'shirt-lightning' },
  { id: 'shirt-flames', name: 'Flame Jersey', category: 'shirt', price: 30, description: 'You\'re on fire!', rarity: 'rare', svgLayerKey: 'shirt-flames' },
  { id: 'shirt-galaxy', name: 'Galaxy Hoodie', category: 'shirt', price: 54, description: 'The universe is yours', rarity: 'epic', svgLayerKey: 'shirt-galaxy' },
  { id: 'shirt-striped', name: 'Striped Tee', category: 'shirt', price: 36, description: 'Classic stripes', rarity: 'common', svgLayerKey: 'shirt-striped' },
  { id: 'shirt-superhero', name: 'Hero Cape', category: 'shirt', price: 60, description: 'Math hero!', rarity: 'epic', svgLayerKey: 'shirt-superhero' },

  // === ACCESSORIES (body accessories: headphones, chains, wings, backpacks) ===
  { id: 'acc-headphones', name: 'DJ Headphones', category: 'accessory', price: 36, description: 'Drop the math beat!', rarity: 'rare', svgLayerKey: 'acc-headphones' },
  { id: 'acc-gold-chain', name: 'Gold Chain', category: 'accessory', price: 45, description: 'Bling bling!', rarity: 'rare', svgLayerKey: 'acc-gold-chain' },
  { id: 'acc-butterfly-wings', name: 'Butterfly Wings', category: 'accessory', price: 66, description: 'Flutter through numbers!', rarity: 'epic', svgLayerKey: 'acc-butterfly-wings' },
  { id: 'acc-cape', name: 'Red Cape', category: 'accessory', price: 30, description: 'Super math powers!', rarity: 'rare', svgLayerKey: 'acc-cape' },
  { id: 'acc-backpack', name: 'Backpack', category: 'accessory', price: 54, description: 'Ready for school!', rarity: 'common', svgLayerKey: 'acc-backpack' },

  // === SHOES ===
  { id: 'shoes-high-tops', name: 'High Tops', category: 'shoes', price: 45, description: 'Classic kicks', rarity: 'common', svgLayerKey: 'shoes-high-tops' },
  { id: 'shoes-roller-skates', name: 'Roller Skates', category: 'shoes', price: 36, description: 'Rolling through equations!', rarity: 'rare', svgLayerKey: 'shoes-roller-skates' },
  { id: 'shoes-rocket', name: 'Rocket Boots', category: 'shoes', price: 66, description: 'Blast off!', rarity: 'epic', svgLayerKey: 'shoes-rocket' },
  { id: 'shoes-sandals', name: 'Beach Sandals', category: 'shoes', price: 9, description: 'Chill vibes', rarity: 'common', svgLayerKey: 'shoes-sandals' },

  // === SKIN COLORS ===
  { id: 'skin-light', name: 'Light', category: 'skinColor', price: 0, description: 'Light skin tone', rarity: 'common', svgLayerKey: 'skin-light', previewColor: '#FDDCB5' },
  { id: 'skin-medium', name: 'Medium', category: 'skinColor', price: 0, description: 'Medium skin tone', rarity: 'common', svgLayerKey: 'skin-medium', previewColor: '#F4C49C' },
  { id: 'skin-tan', name: 'Tan', category: 'skinColor', price: 0, description: 'Tan skin tone', rarity: 'common', svgLayerKey: 'skin-tan', previewColor: '#D4956A' },
  { id: 'skin-brown', name: 'Brown', category: 'skinColor', price: 0, description: 'Brown skin tone', rarity: 'common', svgLayerKey: 'skin-brown', previewColor: '#A0674B' },
  { id: 'skin-dark', name: 'Dark', category: 'skinColor', price: 0, description: 'Dark skin tone', rarity: 'common', svgLayerKey: 'skin-dark', previewColor: '#6B4226' },
  { id: 'skin-cool-blue', name: 'Cool Blue', category: 'skinColor', price: 24, description: 'Alien vibes!', rarity: 'rare', svgLayerKey: 'skin-cool-blue', previewColor: '#89CFF0' },
  { id: 'skin-green', name: 'Goblin Green', category: 'skinColor', price: 24, description: 'Math goblin mode', rarity: 'rare', svgLayerKey: 'skin-green', previewColor: '#90EE90' },

  // === MYTHICAL ===
  { id: 'acc-stanley-cup', name: 'Stanley Cup', category: 'accessory', price: 500, description: 'The ultimate hydration flex', rarity: 'mythical', svgLayerKey: 'acc-stanley-cup' },
  { id: 'hat-dragon-horns', name: 'Dragon Horns', category: 'hat', price: 500, description: 'Unleash the math dragon!', rarity: 'mythical', svgLayerKey: 'hat-dragon-horns' },
  { id: 'shirt-lava', name: 'Lava Armor', category: 'shirt', price: 600, description: 'Forged in volcanic equations', rarity: 'mythical', svgLayerKey: 'shirt-lava' },
  { id: 'shoes-cloud', name: 'Cloud Walkers', category: 'shoes', price: 450, description: 'Walking on air!', rarity: 'mythical', svgLayerKey: 'shoes-cloud' },
  { id: 'acc-angel-wings', name: 'Angel Wings', category: 'accessory', price: 550, description: 'Heavenly math powers', rarity: 'mythical', svgLayerKey: 'acc-angel-wings' },
  { id: 'hair-flame', name: 'Flame Hair', category: 'hair', price: 500, description: 'Hair literally on fire!', rarity: 'mythical', svgLayerKey: 'hair-flame' },
  { id: 'face-laser-eyes', name: 'Laser Eyes', category: 'face', price: 500, description: 'Pew pew! Math vision!', rarity: 'mythical', svgLayerKey: 'face-laser-eyes' },

  // === LEGENDARY ===
  { id: 'acc-iphone', name: 'iPhone', category: 'accessory', price: 2000, description: 'The ultimate status symbol', rarity: 'legendary', svgLayerKey: 'acc-iphone' },
  { id: 'acc-ipad', name: 'iPad', category: 'accessory', price: 2500, description: 'Big screen energy', rarity: 'legendary', svgLayerKey: 'acc-ipad' },
  { id: 'hat-diamond-crown', name: 'Diamond Crown', category: 'hat', price: 3000, description: 'The rarest crown in existence', rarity: 'legendary', svgLayerKey: 'hat-diamond-crown' },
  { id: 'shirt-galaxy-armor', name: 'Galaxy Armor', category: 'shirt', price: 2500, description: 'Woven from stardust', rarity: 'legendary', svgLayerKey: 'shirt-galaxy-armor' },
  { id: 'acc-pet-dragon', name: 'Pet Dragon', category: 'accessory', price: 5000, description: 'Your own math dragon!', rarity: 'legendary', svgLayerKey: 'acc-pet-dragon' },
  { id: 'shoes-lightning', name: 'Lightning Kicks', category: 'shoes', price: 2000, description: 'Faster than the speed of math', rarity: 'legendary', svgLayerKey: 'shoes-lightning' },
  { id: 'skin-rainbow', name: 'Rainbow', category: 'skinColor', price: 1500, description: 'Every colour at once!', rarity: 'legendary', svgLayerKey: 'skin-rainbow', previewColor: '#FF69B4' },
];

export function getMarketplaceItem(id: string): MarketplaceItem | undefined {
  return MARKETPLACE_ITEMS.find(item => item.id === id);
}

export function getItemsByCategory(category: ItemCategory): MarketplaceItem[] {
  return MARKETPLACE_ITEMS.filter(item => item.category === category);
}
