'use client';

import { motion } from 'framer-motion';
import { ItemCategory } from '@/lib/engine/profileTypes';
import { sounds } from '@/lib/sounds';

interface ShopCategoryTabsProps {
  selected: ItemCategory;
  onSelect: (category: ItemCategory) => void;
}

const categories: { key: ItemCategory; label: string }[] = [
  { key: 'hat', label: 'Hats' },
  { key: 'hair', label: 'Hair' },
  { key: 'shirt', label: 'Shirts' },
  { key: 'accessory', label: 'Accessories' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'bottleColor', label: 'Colors' },
  { key: 'bottleLabel', label: 'Labels' },
  { key: 'skinColor', label: 'Skin' },
];

export default function ShopCategoryTabs({ selected, onSelect }: ShopCategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 w-full scrollbar-hide">
      {categories.map(({ key, label }) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sounds.click();
            onSelect(key);
          }}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer transition-colors ${
            selected === key
              ? 'bg-cola-red text-white shadow-md'
              : 'bg-white text-dark/60 hover:bg-dark/5'
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
