'use client';

import { AvatarConfig } from '@/lib/engine/profileTypes';
import AvatarRenderer from './AvatarRenderer';

interface AvatarMiniProps {
  avatar?: AvatarConfig;
  size?: number;
}

export default function AvatarMini({ avatar, size = 50 }: AvatarMiniProps) {
  return <AvatarRenderer avatar={avatar} state="idle" size={size} />;
}
