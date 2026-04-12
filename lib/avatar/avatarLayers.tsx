import React from 'react';

type LayerRenderer = () => React.ReactNode;
const O = '#2D3436'; // outline color

export const avatarLayers: Record<string, LayerRenderer> = {

  // ===================== HATS =====================

  'hat-backwards-cap': () => (
    <g>
      <ellipse cx="50" cy="8" rx="28" ry="7" fill="#118AB2" stroke="#0A5F7A" strokeWidth="2.5" />
      <path d="M22 8 Q24 -6 50 -10 Q76 -6 78 8 Z" fill="#118AB2" stroke="#0A5F7A" strokeWidth="2.5" />
      <path d="M22 8 L12 12 Q10 8 14 6 Z" fill="#0E6E8C" stroke="#0A5F7A" strokeWidth="1.5" />
      <circle cx="50" cy="-8" r="3" fill="#0E6E8C" stroke="#0A5F7A" strokeWidth="1" />
      <path d="M32 0 Q42 -8 58 -2" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
    </g>
  ),

  'hat-beanie': () => (
    <g>
      <path d="M22 10 Q20 -12 50 -18 Q80 -12 78 10 Z" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <rect x="22" y="2" width="56" height="12" rx="6" fill="#CC2936" stroke="#B22530" strokeWidth="1.5" />
      <circle cx="50" cy="-18" r="8" fill="#FF6B6B" stroke="#E63946" strokeWidth="2" />
      <circle cx="47" cy="-21" r="4" fill="#FF8A8A" />
    </g>
  ),

  'hat-cat-ears': () => (
    <g>
      <polygon points="24,10 18,-12 42,2" fill={O} stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="27,7 22,-8 39,3" fill="#FF69B4" />
      <polygon points="76,10 82,-12 58,2" fill={O} stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="73,7 78,-8 61,3" fill="#FF69B4" />
    </g>
  ),

  'hat-wizard': () => (
    <g>
      <ellipse cx="50" cy="10" rx="36" ry="9" fill="#5B1D99" stroke="#3D1166" strokeWidth="2.5" />
      <polygon points="22,10 50,-34 78,10" fill="#7B2CBF" stroke="#5B1D99" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="30,8 50,-28 70,8" fill="#9B59B6" />
      <text x="44" y="-2" fontSize="9" fill="#FFD166" fontWeight="bold">&#9733;</text>
      <text x="56" y="-14" fontSize="7" fill="#FFD166">&#9733;</text>
      <circle cx="50" cy="-34" r="6" fill="#FFD166" opacity="0.9" />
      <circle cx="50" cy="-34" r="10" fill="#FFD166" opacity="0.2" />
    </g>
  ),

  'hat-crown': () => (
    <g>
      <rect x="24" y="-2" width="52" height="16" rx="3" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      <polygon points="24,-2 14,-18 38,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="42,-2 50,-24 58,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="62,-2 86,-18 76,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="26" cy="-8" r="3.5" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      <circle cx="50" cy="-16" r="4.5" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="74" cy="-8" r="3.5" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      <rect x="24" y="8" width="52" height="5" rx="2.5" fill="#F4A261" stroke="#D4930A" strokeWidth="1" />
    </g>
  ),

  'hat-headband': () => (
    <g>
      <path d="M20 14 Q20 6 50 4 Q80 6 80 14" stroke="#E63946" strokeWidth="6" fill="none" />
      <path d="M20 14 Q20 6 50 4 Q80 6 80 14" stroke="#FF6B6B" strokeWidth="3" fill="none" />
    </g>
  ),

  'hat-astronaut': () => (
    <g>
      <ellipse cx="50" cy="16" rx="38" ry="36" fill="#E0E0E0" stroke="#999" strokeWidth="3" opacity="0.45" />
      <ellipse cx="50" cy="14" rx="34" ry="32" fill="none" stroke="#B0B0B0" strokeWidth="2.5" />
      <path d="M24 20 Q24 0 50 -4 Q76 0 76 20 Z" fill="#118AB2" opacity="0.5" stroke="#0A5F7A" strokeWidth="2" />
      <path d="M30 16 Q30 4 50 0 Q70 4 70 16 Z" fill="#4ECDC4" opacity="0.3" />
      <line x1="50" y1="-10" x2="50" y2="-22" stroke="#999" strokeWidth="2.5" />
      <circle cx="50" cy="-24" r="4" fill="#E63946" stroke="#B22530" strokeWidth="2" />
    </g>
  ),

  // ===================== HAIR =====================

  'hair-spiky': () => (
    <g>
      {[{p:"26,10 18,-10 40,4"},{p:"38,10 30,-16 52,2"},{p:"50,8 48,-18 58,0"},{p:"62,10 64,-14 76,4"},{p:"72,10 80,-8 80,8"}].map((s,i) => (
        <polygon key={i} points={s.p} fill={i%2?"#0096C7":"#00B4D8"} stroke="#006D8A" strokeWidth="2" strokeLinejoin="round" />
      ))}
      <circle cx="19" cy="-8" r="2.5" fill="#90E0EF" opacity="0.8" />
      <circle cx="48" cy="-16" r="2.5" fill="#90E0EF" opacity="0.8" />
    </g>
  ),

  'hair-curly': () => (
    <g>
      {[{cx:26,cy:8,r:10},{cx:40,cy:0,r:12},{cx:60,cy:0,r:12},{cx:74,cy:8,r:10},{cx:33,cy:-6,r:9},{cx:67,cy:-6,r:9},{cx:50,cy:-10,r:10}].map((c,i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={i%2?"#A0522D":"#8B4513"} stroke="#5C3310" strokeWidth="2" />
      ))}
    </g>
  ),

  'hair-braids': () => (
    <g>
      <path d="M22 10 Q22 -2 50 -8 Q78 -2 78 10" fill="#2D1B00" stroke="#1A1000" strokeWidth="2.5" />
      {[14,22,30,38,46,54].map((y,i) => (
        <circle key={`l${i}`} cx={22-i*1.2} cy={y} r={4} fill={i%2?"#3D2B00":"#2D1B00"} stroke="#1A1000" strokeWidth="1.5" />
      ))}
      <circle cx="15" cy="60" r="4" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {[14,22,30,38,46,54].map((y,i) => (
        <circle key={`r${i}`} cx={78+i*1.2} cy={y} r={4} fill={i%2?"#3D2B00":"#2D1B00"} stroke="#1A1000" strokeWidth="1.5" />
      ))}
      <circle cx="85" cy="60" r="4" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
    </g>
  ),

  'hair-pigtails': () => (
    <g>
      <path d="M22 10 Q22 0 50 -4 Q78 0 78 10" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2.5" />
      <ellipse cx="16" cy="18" rx="10" ry="14" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2" />
      <ellipse cx="14" cy="34" rx="8" ry="12" fill="#E63946" stroke="#CC2936" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="4" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <ellipse cx="84" cy="18" rx="10" ry="14" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2" />
      <ellipse cx="86" cy="34" rx="8" ry="12" fill="#E63946" stroke="#CC2936" strokeWidth="1.5" />
      <circle cx="80" cy="8" r="4" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
    </g>
  ),

  'hair-mohawk': () => (
    <g>
      <rect x="40" y="-22" width="20" height="36" rx="10" fill="#E63946" stroke="#1a1a1a" strokeWidth="2.5" />
      {[{y:-20,f:"#E63946"},{y:-14,f:"#F77F00"},{y:-8,f:"#FFD166"},{y:-2,f:"#06D6A0"},{y:4,f:"#118AB2"},{y:10,f:"#7B2CBF"}].map((s,i) => (
        <rect key={i} x="41" y={s.y} width="18" height="6" rx="3" fill={s.f} />
      ))}
    </g>
  ),

  'hair-long': () => (
    <g>
      <path d="M20 10 Q18 -4 50 -10 Q82 -4 80 10" fill="#5C3310" stroke="#3D2200" strokeWidth="2.5" />
      <path d="M18 10 L12 60 Q14 64 22 50 L26 10 Z" fill="#5C3310" stroke="#3D2200" strokeWidth="2" />
      <path d="M82 10 L88 60 Q86 64 78 50 L74 10 Z" fill="#5C3310" stroke="#3D2200" strokeWidth="2" />
      <path d="M26 10 Q24 30 18 50" stroke="#6B3D1A" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M74 10 Q76 30 82 50" stroke="#6B3D1A" strokeWidth="1.5" fill="none" opacity="0.4" />
    </g>
  ),

  'hair-afro': () => (
    <g>
      <circle cx="50" cy="0" r="34" fill="#2D1B00" stroke="#1A1000" strokeWidth="3" />
      <circle cx="50" cy="-2" r="31" fill="#3D2B00" />
      <circle cx="34" cy="-12" r="7" fill="#4A3600" opacity="0.4" />
      <circle cx="66" cy="-12" r="7" fill="#4A3600" opacity="0.4" />
      <rect x="76" y="-14" width="3" height="14" rx="1.5" fill="#E63946" stroke="#B22530" strokeWidth="1" />
    </g>
  ),

  'hair-anime': () => (
    <g>
      <path d="M18 10 Q12 -10 35 -18 Q50 -22 65 -18 Q88 -10 82 10" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2.5" />
      <path d="M24 10 Q22 -2 38 -6 Q50 -8 60 -2 L58 10 Z" fill="#16213e" stroke="#0d0d1a" strokeWidth="2" />
      <path d="M16 10 L8 42 Q14 46 24 30 L28 10 Z" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2" />
      <path d="M84 10 L92 42 Q86 46 76 30 L72 10 Z" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2" />
      <path d="M30 -4 Q38 -10 46 -2" stroke="#4ECDC4" strokeWidth="2.5" fill="none" opacity="0.4" />
    </g>
  ),

  // ===================== FACE ACCESSORIES =====================

  'face-cool-shades': () => (
    <g>
      <path d="M22 30 Q24 24 36 24 Q44 24 44 30 Q44 40 36 40 Q24 40 22 34 Z" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <path d="M56 30 Q58 24 68 24 Q78 24 78 30 Q78 40 68 40 Q58 40 56 34 Z" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <line x1="44" y1="32" x2="56" y2="32" stroke="#000" strokeWidth="3" />
      <line x1="22" y1="30" x2="16" y2="28" stroke="#000" strokeWidth="2" />
      <line x1="78" y1="30" x2="84" y2="28" stroke="#000" strokeWidth="2" />
      <path d="M26 28 Q30 24 34 28" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </g>
  ),

  'face-heart-glasses': () => (
    <g>
      <path d="M24 32 Q24 24 32 24 Q40 24 36 36 L32 40 L28 36 Q20 24 24 32 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" />
      <path d="M62 32 Q62 24 70 24 Q78 24 74 36 L70 40 L66 36 Q58 24 62 32 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" />
      <line x1="40" y1="32" x2="58" y2="32" stroke="#D44D8A" strokeWidth="2.5" />
      <line x1="20" y1="30" x2="14" y2="28" stroke="#D44D8A" strokeWidth="2" />
      <line x1="82" y1="30" x2="88" y2="28" stroke="#D44D8A" strokeWidth="2" />
    </g>
  ),

  'face-star-eyes': () => (
    <g>
      <text x="38" y="40" textAnchor="middle" fontSize="16" fill="#FFD166" stroke="#D4930A" strokeWidth="0.5">&#9733;</text>
      <text x="62" y="40" textAnchor="middle" fontSize="16" fill="#FFD166" stroke="#D4930A" strokeWidth="0.5">&#9733;</text>
    </g>
  ),

  'face-nerd-glasses': () => (
    <g>
      <circle cx="38" cy="33" r="10" fill="none" stroke={O} strokeWidth="2.5" />
      <circle cx="62" cy="33" r="10" fill="none" stroke={O} strokeWidth="2.5" />
      <line x1="48" y1="33" x2="52" y2="33" stroke={O} strokeWidth="2.5" />
      <line x1="28" y1="31" x2="22" y2="29" stroke={O} strokeWidth="2" />
      <line x1="72" y1="31" x2="78" y2="29" stroke={O} strokeWidth="2" />
      {/* Tape on bridge */}
      <rect x="48" y="31" width="4" height="4" rx="0.5" fill="#F4A261" opacity="0.8" />
    </g>
  ),

  // ===================== SHIRTS =====================

  'shirt-lightning': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <polygon points="52,60 42,78 49,78 40,100 58,74 51,74 60,60" fill="#E63946" stroke="#B22530" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M40 55 L50 62 L60 55" stroke="#D4930A" strokeWidth="2" fill="none" />
    </g>
  ),

  'shirt-flames': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M28 110 Q34 92 38 98 Q42 84 46 92 Q50 78 54 88 Q58 82 62 94 Q66 88 68 98 Q72 90 72 110" fill="#F77F00" opacity="0.8" />
      <path d="M32 110 Q36 96 40 100 Q44 90 48 96 Q52 84 56 92 Q60 88 64 100 Q68 94 70 110" fill="#E63946" opacity="0.6" />
      <path d="M36 110 Q40 100 44 104 Q48 94 52 100 Q56 92 60 102 Q64 98 68 110" fill="#FFD166" opacity="0.4" />
    </g>
  ),

  'shirt-galaxy': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#0d0d2b" stroke="#1a1a1a" strokeWidth="2" />
      {[{x:34,y:64,r:1.5},{x:58,y:60,r:2},{x:44,y:90,r:1.3},{x:52,y:74,r:1},{x:38,y:80,r:1.5},{x:62,y:86,r:1},{x:56,y:100,r:1.5}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" />
      ))}
      <ellipse cx="44" cy="76" rx="10" ry="4" fill="#7B2CBF" opacity="0.5" transform="rotate(-20 44 76)" />
      <ellipse cx="56" cy="90" rx="8" ry="3" fill="#4ECDC4" opacity="0.4" transform="rotate(15 56 90)" />
    </g>
  ),

  'shirt-striped': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="white" stroke={O} strokeWidth="2" />
      {[62,70,78,86,94,102].map(y => (
        <line key={y} x1="30" y1={y} x2="70" y2={y} stroke="#118AB2" strokeWidth="2.5" opacity="0.5" />
      ))}
      <path d="M40 55 L50 62 L60 55" stroke={O} strokeWidth="2" fill="none" />
    </g>
  ),

  'shirt-superhero': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#E63946" stroke="#B22530" strokeWidth="2" />
      {/* S emblem */}
      <circle cx="50" cy="82" r="10" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <text x="50" y="87" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#E63946" fontFamily="sans-serif">M</text>
    </g>
  ),

  // ===================== ACCESSORIES =====================

  'acc-headphones': () => (
    <g>
      <path d="M18 30 Q18 6 50 4 Q82 6 82 30" stroke="#1a1a1a" strokeWidth="5" fill="none" />
      <path d="M18 30 Q18 8 50 6 Q82 8 82 30" stroke="#2D3436" strokeWidth="3" fill="none" />
      <rect x="8" y="24" width="16" height="20" rx="6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="10" y="26" width="12" height="16" rx="4" fill="#E63946" />
      <rect x="76" y="24" width="16" height="20" rx="6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="78" y="26" width="12" height="16" rx="4" fill="#E63946" />
    </g>
  ),

  'acc-gold-chain': () => (
    <g>
      <path d="M32 60 Q40 66 50 68 Q60 66 68 60" stroke="#FFD166" strokeWidth="3.5" fill="none" />
      {[36,44,50,56,64].map(x => (
        <circle key={x} cx={x} cy={x < 50 ? 62 + (50-x)*0.15 : 62 + (x-50)*0.15} r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      ))}
      <circle cx="50" cy="74" r="7" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <text x="50" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E63946" fontFamily="sans-serif">M</text>
    </g>
  ),

  'acc-butterfly-wings': () => (
    <g>
      <path d="M14 75 Q-8 50 6 65 Q-4 88 14 80 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" opacity="0.75" />
      <path d="M14 82 Q-2 100 10 94 Q2 112 14 100 Z" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" opacity="0.7" />
      <path d="M86 75 Q108 50 94 65 Q104 88 86 80 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" opacity="0.75" />
      <path d="M86 82 Q102 100 90 94 Q98 112 86 100 Z" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" opacity="0.7" />
      <circle cx="6" cy="68" r="3" fill="#FFD166" opacity="0.6" />
      <circle cx="94" cy="68" r="3" fill="#FFD166" opacity="0.6" />
    </g>
  ),

  'acc-cape': () => (
    <g>
      <path d="M28 62 L10 130 Q50 145 90 130 L72 62 Z" fill="#E63946" stroke="#B22530" strokeWidth="2" opacity="0.7" />
      <path d="M28 62 L16 125 Q50 138 84 125 L72 62 Z" fill="#FF6B6B" opacity="0.3" />
    </g>
  ),

  'acc-backpack': () => (
    <g>
      <rect x="72" y="62" width="18" height="24" rx="5" fill="#118AB2" stroke="#0A5F7A" strokeWidth="2" />
      <rect x="74" y="64" width="14" height="8" rx="3" fill="#0E6E8C" />
      <rect x="78" y="74" width="6" height="3" rx="1.5" fill="#FFD166" stroke="#D4930A" strokeWidth="0.5" />
    </g>
  ),

  // ===================== SHOES =====================

  'shoes-high-tops': () => (
    <g>
      <rect x="23" y="134" width="22" height="14" rx="5" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="23" y="134" width="22" height="5" rx="2.5" fill="white" stroke="#ddd" strokeWidth="1" />
      <circle cx="34" cy="141" r="1.5" fill="white" />
      <rect x="55" y="134" width="22" height="14" rx="5" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="55" y="134" width="22" height="5" rx="2.5" fill="white" stroke="#ddd" strokeWidth="1" />
      <circle cx="66" cy="141" r="1.5" fill="white" />
    </g>
  ),

  'shoes-roller-skates': () => (
    <g>
      <rect x="21" y="134" width="24" height="12" rx="4" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2.5" />
      <rect x="21" y="134" width="24" height="4" rx="2" fill="#FF8FAB" />
      <circle cx="26" cy="148" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="40" cy="148" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <rect x="55" y="134" width="24" height="12" rx="4" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2.5" />
      <rect x="55" y="134" width="24" height="4" rx="2" fill="#FF8FAB" />
      <circle cx="60" cy="148" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="74" cy="148" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
    </g>
  ),

  'shoes-rocket': () => (
    <g>
      <rect x="23" y="134" width="22" height="12" rx="4" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <polygon points="25,148 34,158 43,148" fill="#F77F00" stroke="#D4600A" strokeWidth="1.5" />
      <polygon points="28,150 34,160 40,150" fill="#FFD166" opacity="0.8" />
      <rect x="55" y="134" width="22" height="12" rx="4" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <polygon points="57,148 66,158 75,148" fill="#F77F00" stroke="#D4600A" strokeWidth="1.5" />
      <polygon points="60,150 66,160 72,150" fill="#FFD166" opacity="0.8" />
    </g>
  ),

  'shoes-sandals': () => (
    <g>
      <ellipse cx="37" cy="143" rx="12" ry="5" fill="#D4956A" stroke="#A0674B" strokeWidth="2" />
      <line x1="30" y1="140" x2="37" y2="136" stroke="#A0674B" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="140" x2="37" y2="136" stroke="#A0674B" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="63" cy="143" rx="12" ry="5" fill="#D4956A" stroke="#A0674B" strokeWidth="2" />
      <line x1="56" y1="140" x2="63" y2="136" stroke="#A0674B" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="140" x2="63" y2="136" stroke="#A0674B" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  // ===================== MYTHICAL =====================

  'acc-stanley-cup': () => (
    <g>
      {/* Big chunky Stanley tumbler held in hand */}
      <rect x="84" y="68" width="16" height="28" rx="5" fill="#06D6A0" stroke="#048A6A" strokeWidth="2.5" />
      <rect x="86" y="72" width="12" height="22" rx="3" fill="#08E8A0" />
      {/* Lid */}
      <rect x="82" y="64" width="20" height="6" rx="3" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      {/* Straw */}
      <line x1="96" y1="64" x2="100" y2="50" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
      {/* Handle */}
      <path d="M100 72 Q110 72 110 82 Q110 92 100 92" stroke="#06D6A0" strokeWidth="3.5" fill="none" />
      {/* Condensation sparkle */}
      <circle cx="89" cy="78" r="1.5" fill="white" opacity="0.6" />
      <circle cx="92" cy="86" r="1" fill="white" opacity="0.4" />
      <text x="92" y="84" textAnchor="middle" fontSize="6" fill="white" opacity="0.5" fontWeight="bold">S</text>
    </g>
  ),

  'hat-dragon-horns': () => (
    <g>
      {/* Left horn */}
      <path d="M26,8 Q18,-16 22,-28 Q26,-22 30,-10 Z" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <path d="M27,4 Q20,-14 24,-24" stroke="#FF6B6B" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Right horn */}
      <path d="M74,8 Q82,-16 78,-28 Q74,-22 70,-10 Z" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <path d="M73,4 Q80,-14 76,-24" stroke="#FF6B6B" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Horn glow tips */}
      <circle cx="22" cy="-28" r="3" fill="#FF6B6B" opacity="0.6" />
      <circle cx="78" cy="-28" r="3" fill="#FF6B6B" opacity="0.6" />
    </g>
  ),

  'shirt-lava': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      {/* Lava cracks */}
      <path d="M32 70 L38 75 L34 85 L40 92 L36 105" stroke="#FF4500" strokeWidth="2.5" fill="none" opacity="0.9" />
      <path d="M56 65 L62 72 L58 82 L64 90 L60 100 L66 110" stroke="#FF4500" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M44 60 L48 68 L44 78 L50 88" stroke="#FFD166" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Glow effect */}
      <path d="M32 70 L38 75 L34 85 L40 92" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Molten core */}
      <circle cx="50" cy="82" r="6" fill="#FF4500" opacity="0.3" />
      <circle cx="50" cy="82" r="3" fill="#FFD166" opacity="0.4" />
    </g>
  ),

  'shoes-cloud': () => (
    <g>
      {/* Left cloud shoe */}
      <ellipse cx="37" cy="142" rx="14" ry="7" fill="white" stroke="#B0C4DE" strokeWidth="2" />
      <circle cx="30" cy="140" r="5" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      <circle cx="37" cy="137" r="6" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      <circle cx="44" cy="140" r="5" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      {/* Right cloud shoe */}
      <ellipse cx="63" cy="142" rx="14" ry="7" fill="white" stroke="#B0C4DE" strokeWidth="2" />
      <circle cx="56" cy="140" r="5" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      <circle cx="63" cy="137" r="6" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      <circle cx="70" cy="140" r="5" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      {/* Sparkles */}
      <text x="34" y="132" fontSize="5" fill="#4ECDC4" opacity="0.7">&#10022;</text>
      <text x="66" y="132" fontSize="4" fill="#4ECDC4" opacity="0.6">&#10022;</text>
    </g>
  ),

  'acc-angel-wings': () => (
    <g opacity="0.85">
      {/* Left wing — large feathered */}
      <path d="M16 70 Q-10 45 0 55 Q-14 35 4 48 Q-8 25 10 42 Q-2 65 16 70 Z" fill="white" stroke="#B0C4DE" strokeWidth="2" />
      <path d="M16 80 Q-4 95 6 88 Q-2 108 16 95 Z" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      {/* Right wing */}
      <path d="M84 70 Q110 45 100 55 Q114 35 96 48 Q108 25 90 42 Q102 65 84 70 Z" fill="white" stroke="#B0C4DE" strokeWidth="2" />
      <path d="M84 80 Q104 95 94 88 Q102 108 84 95 Z" fill="white" stroke="#B0C4DE" strokeWidth="1.5" />
      {/* Feather shine */}
      <line x1="6" y1="50" x2="14" y2="60" stroke="white" strokeWidth="2" opacity="0.5" />
      <line x1="94" y1="50" x2="86" y2="60" stroke="white" strokeWidth="2" opacity="0.5" />
      {/* Halo */}
      <ellipse cx="50" cy="-8" rx="18" ry="5" fill="none" stroke="#FFD166" strokeWidth="2.5" opacity="0.8" />
      <ellipse cx="50" cy="-8" rx="18" ry="5" fill="none" stroke="#FFE699" strokeWidth="1" opacity="0.4" />
    </g>
  ),

  'hair-flame': () => (
    <g>
      <path d="M22 10 Q20 -6 50 -10 Q80 -6 78 10" fill="#FF4500" stroke="#CC3700" strokeWidth="2" />
      {/* Flame wisps */}
      <path d="M28 6 Q24 -14 32 -22 Q36 -12 30 -4" fill="#FF6347" opacity="0.9" />
      <path d="M40 2 Q36 -20 44 -30 Q48 -18 42 -6" fill="#FF4500" opacity="0.85" />
      <path d="M50 0 Q48 -24 54 -34 Q58 -20 52 -4" fill="#FF6347" opacity="0.9" />
      <path d="M60 2 Q58 -18 64 -28 Q68 -14 62 -4" fill="#FF4500" opacity="0.85" />
      <path d="M72 6 Q70 -12 76 -20 Q78 -8 74 0" fill="#FF6347" opacity="0.9" />
      {/* Inner glow */}
      <path d="M36 -2 Q34 -16 40 -24" stroke="#FFD166" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M52 -2 Q50 -20 56 -28" stroke="#FFD166" strokeWidth="2" fill="none" opacity="0.5" />
    </g>
  ),

  'face-laser-eyes': () => (
    <g>
      {/* Red glow around eyes */}
      <circle cx="38" cy="33" r="12" fill="#FF0000" opacity="0.15" />
      <circle cx="62" cy="33" r="12" fill="#FF0000" opacity="0.15" />
      {/* Laser beams shooting out */}
      <line x1="38" y1="33" x2="-10" y2="45" stroke="#FF0000" strokeWidth="3" opacity="0.7" />
      <line x1="38" y1="33" x2="-10" y2="45" stroke="#FF6666" strokeWidth="1.5" opacity="0.5" />
      <line x1="62" y1="33" x2="110" y2="45" stroke="#FF0000" strokeWidth="3" opacity="0.7" />
      <line x1="62" y1="33" x2="110" y2="45" stroke="#FF6666" strokeWidth="1.5" opacity="0.5" />
      {/* Eye glow core */}
      <circle cx="40" cy="34" r="5" fill="#FF0000" opacity="0.6" />
      <circle cx="40" cy="34" r="2.5" fill="white" opacity="0.5" />
      <circle cx="64" cy="34" r="5" fill="#FF0000" opacity="0.6" />
      <circle cx="64" cy="34" r="2.5" fill="white" opacity="0.5" />
    </g>
  ),

  // ===================== LEGENDARY =====================

  'acc-iphone': () => (
    <g>
      {/* iPhone held in right hand */}
      <rect x="84" y="72" width="14" height="24" rx="3" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
      <rect x="86" y="74" width="10" height="18" rx="1.5" fill="#4ECDC4" />
      {/* Screen content — mini icons */}
      <rect x="87" y="75" width="4" height="4" rx="1" fill="#FF69B4" opacity="0.8" />
      <rect x="92" y="75" width="3" height="4" rx="1" fill="#FFD166" opacity="0.8" />
      <rect x="87" y="80" width="3" height="3" rx="1" fill="#06D6A0" opacity="0.8" />
      <rect x="91" y="80" width="4" height="3" rx="1" fill="#118AB2" opacity="0.8" />
      {/* Notch */}
      <rect x="88" y="74" width="6" height="1.5" rx="0.75" fill="#1a1a1a" />
      {/* Home bar */}
      <rect x="89" y="91" width="4" height="1" rx="0.5" fill="white" opacity="0.5" />
    </g>
  ),

  'acc-ipad': () => (
    <g>
      {/* iPad held with both hands — behind body */}
      <rect x="20" y="88" width="60" height="40" rx="4" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <rect x="23" y="91" width="54" height="34" rx="2" fill="#4ECDC4" />
      {/* Screen — math game on it! */}
      <text x="50" y="105" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="sans-serif">2 + 2 = ?</text>
      <rect x="38" y="110" width="10" height="6" rx="2" fill="#06D6A0" opacity="0.8" />
      <rect x="52" y="110" width="10" height="6" rx="2" fill="#E63946" opacity="0.8" />
      <text x="43" y="115" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">4</text>
      <text x="57" y="115" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">5</text>
      {/* Camera dot */}
      <circle cx="50" cy="89" r="1" fill="#333" />
    </g>
  ),

  'hat-diamond-crown': () => (
    <g>
      {/* Crown base — diamond-encrusted */}
      <rect x="22" y="-2" width="56" height="18" rx="4" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="2.5" />
      {/* Diamond points */}
      <polygon points="22,-2 10,-22 38,-2" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="40,-2 50,-28 60,-2" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="62,-2 90,-22 78,-2" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="2" strokeLinejoin="round" />
      {/* Diamonds on points */}
      <polygon points="24,-12 20,-16 24,-20 28,-16" fill="white" stroke="#89CFF0" strokeWidth="1" />
      <polygon points="50,-18 46,-22 50,-26 54,-22" fill="white" stroke="#89CFF0" strokeWidth="1" />
      <polygon points="76,-12 72,-16 76,-20 80,-16" fill="white" stroke="#89CFF0" strokeWidth="1" />
      {/* Diamond sparkle */}
      <text x="50" y="-26" fontSize="6" fill="white" opacity="0.9">&#10022;</text>
      <text x="24" y="-20" fontSize="4" fill="white" opacity="0.7">&#10022;</text>
      <text x="76" y="-20" fontSize="4" fill="white" opacity="0.7">&#10022;</text>
      {/* Band with gems */}
      <rect x="22" y="8" width="56" height="6" rx="3" fill="#3BA8A0" />
      {[30,40,50,60,70].map(x => (
        <polygon key={x} points={`${x},9 ${x-2},11 ${x},13 ${x+2},11`} fill="white" stroke="#89CFF0" strokeWidth="0.5" />
      ))}
    </g>
  ),

  'shirt-galaxy-armor': () => (
    <g>
      <rect x="28" y="55" width="44" height="58" rx="10" fill="#0d0d2b" stroke="#1a1a1a" strokeWidth="2.5" />
      {/* Armor plates */}
      <path d="M30 60 L50 55 L70 60 L70 80 L50 85 L30 80 Z" fill="#1a1a4e" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.8" />
      <path d="M30 85 L50 90 L70 85 L70 110 L50 115 L30 110 Z" fill="#1a1a4e" stroke="#7B2CBF" strokeWidth="1.5" opacity="0.7" />
      {/* Central gem */}
      <circle cx="50" cy="72" r="6" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="50" cy="72" r="3" fill="white" opacity="0.5" />
      {/* Stars */}
      {[{x:36,y:64},{x:62,y:66},{x:40,y:98},{x:58,y:102},{x:50,y:108}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r={1} fill="white" />
      ))}
      {/* Energy lines */}
      <line x1="50" y1="78" x2="50" y2="85" stroke="#4ECDC4" strokeWidth="1" opacity="0.6" />
      <line x1="44" y1="72" x2="38" y2="72" stroke="#7B2CBF" strokeWidth="1" opacity="0.5" />
      <line x1="56" y1="72" x2="62" y2="72" stroke="#7B2CBF" strokeWidth="1" opacity="0.5" />
    </g>
  ),

  'acc-pet-dragon': () => (
    <g>
      {/* Mini dragon perched on shoulder */}
      {/* Body */}
      <ellipse cx="10" cy="54" rx="8" ry="6" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      {/* Head */}
      <circle cx="4" cy="46" r="6" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="2" cy="44" r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="0.5" />
      <circle cx="2" cy="44" r="1" fill="#2D3436" />
      {/* Snout */}
      <ellipse cx="-1" cy="48" rx="3" ry="2" fill="#08E8A0" stroke="#048A6A" strokeWidth="1" />
      {/* Nostrils — tiny fire */}
      <circle cx="-3" cy="47" r="0.8" fill="#FF4500" opacity="0.8" />
      <circle cx="0" cy="48" r="0.6" fill="#FF4500" opacity="0.6" />
      {/* Wings */}
      <path d="M14 48 Q22 36 18 44 Q26 38 20 48" fill="#06D6A0" stroke="#048A6A" strokeWidth="1.5" />
      {/* Tail */}
      <path d="M18 56 Q24 60 22 64 Q20 62 18 58" fill="#06D6A0" stroke="#048A6A" strokeWidth="1.5" />
      {/* Tail spike */}
      <polygon points="22,64 24,60 26,64" fill="#FFD166" />
      {/* Belly */}
      <ellipse cx="10" cy="56" rx="5" ry="3" fill="#08E8A0" opacity="0.5" />
    </g>
  ),

  'shoes-lightning': () => (
    <g>
      {/* Left shoe */}
      <rect x="23" y="134" width="22" height="14" rx="5" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      <polygon points="28,136 25,142 32,140 29,148 36,138 31,140 34,134" fill="#FF4500" stroke="#CC3700" strokeWidth="0.5" />
      {/* Energy sparks */}
      <circle cx="24" cy="134" r="1.5" fill="white" opacity="0.6" />
      <circle cx="44" cy="136" r="1" fill="white" opacity="0.4" />
      {/* Right shoe */}
      <rect x="55" y="134" width="22" height="14" rx="5" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      <polygon points="60,136 57,142 64,140 61,148 68,138 63,140 66,134" fill="#FF4500" stroke="#CC3700" strokeWidth="0.5" />
      <circle cx="56" cy="134" r="1.5" fill="white" opacity="0.6" />
      <circle cx="76" cy="136" r="1" fill="white" opacity="0.4" />
    </g>
  ),
  // ===================== PETS =====================
  // All pets render to the right of the character, near ground level

  'pet-puppy': () => (
    <g>
      {/* Body */}
      <ellipse cx="95" cy="132" rx="10" ry="8" fill="#D4956A" stroke="#A0674B" strokeWidth="2" />
      {/* Head */}
      <circle cx="88" cy="122" r="8" fill="#D4956A" stroke="#A0674B" strokeWidth="2" />
      {/* Ears (floppy) */}
      <ellipse cx="82" cy="118" rx="4" ry="7" fill="#A0674B" stroke="#7A4F30" strokeWidth="1.5" transform="rotate(-20 82 118)" />
      <ellipse cx="94" cy="117" rx="4" ry="6" fill="#A0674B" stroke="#7A4F30" strokeWidth="1.5" transform="rotate(15 94 117)" />
      {/* Eyes */}
      <circle cx="85" cy="121" r="2.5" fill="white" stroke="#2D3436" strokeWidth="1" />
      <circle cx="86" cy="121" r="1.2" fill="#2D3436" />
      <circle cx="91" cy="121" r="2.5" fill="white" stroke="#2D3436" strokeWidth="1" />
      <circle cx="92" cy="121" r="1.2" fill="#2D3436" />
      {/* Nose */}
      <ellipse cx="88" cy="126" rx="2" ry="1.5" fill="#2D3436" />
      {/* Tongue */}
      <ellipse cx="89" cy="129" rx="1.5" ry="2" fill="#FF69B4" />
      {/* Tail */}
      <path d="M105 128 Q112 120 108 116" stroke="#D4956A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <rect x="87" y="136" width="4" height="6" rx="2" fill="#D4956A" stroke="#A0674B" strokeWidth="1" />
      <rect x="99" y="136" width="4" height="6" rx="2" fill="#D4956A" stroke="#A0674B" strokeWidth="1" />
    </g>
  ),

  'pet-kitten': () => (
    <g>
      {/* Body */}
      <ellipse cx="95" cy="132" rx="9" ry="7" fill="#808080" stroke="#555" strokeWidth="2" />
      {/* Head */}
      <circle cx="88" cy="124" r="7" fill="#808080" stroke="#555" strokeWidth="2" />
      {/* Pointy ears */}
      <polygon points="82,118 79,108 86,116" fill="#808080" stroke="#555" strokeWidth="1.5" />
      <polygon points="82,118 80,110 85,117" fill="#FF69B4" opacity="0.5" />
      <polygon points="94,118 97,108 90,116" fill="#808080" stroke="#555" strokeWidth="1.5" />
      <polygon points="94,118 96,110 91,117" fill="#FF69B4" opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="85" cy="123" rx="2.5" ry="3" fill="#06D6A0" stroke="#048A6A" strokeWidth="1" />
      <ellipse cx="86" cy="123" rx="1" ry="2.5" fill="#2D3436" />
      <ellipse cx="91" cy="123" rx="2.5" ry="3" fill="#06D6A0" stroke="#048A6A" strokeWidth="1" />
      <ellipse cx="92" cy="123" rx="1" ry="2.5" fill="#2D3436" />
      {/* Nose + whiskers */}
      <polygon points="87,127 88,126 89,127" fill="#FF69B4" />
      <line x1="82" y1="126" x2="76" y2="124" stroke="#999" strokeWidth="0.8" />
      <line x1="82" y1="128" x2="76" y2="128" stroke="#999" strokeWidth="0.8" />
      <line x1="94" y1="126" x2="100" y2="124" stroke="#999" strokeWidth="0.8" />
      <line x1="94" y1="128" x2="100" y2="128" stroke="#999" strokeWidth="0.8" />
      {/* Tail */}
      <path d="M104 130 Q112 126 110 118 Q108 114 106 116" stroke="#808080" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),

  'pet-bunny': () => (
    <g>
      {/* Body */}
      <ellipse cx="95" cy="134" rx="8" ry="7" fill="white" stroke="#CCC" strokeWidth="2" />
      {/* Head */}
      <circle cx="90" cy="124" r="7" fill="white" stroke="#CCC" strokeWidth="2" />
      {/* Long ears */}
      <ellipse cx="86" cy="108" rx="3" ry="10" fill="white" stroke="#CCC" strokeWidth="1.5" />
      <ellipse cx="86" cy="108" rx="1.5" ry="8" fill="#FF69B4" opacity="0.3" />
      <ellipse cx="94" cy="106" rx="3" ry="10" fill="white" stroke="#CCC" strokeWidth="1.5" />
      <ellipse cx="94" cy="106" rx="1.5" ry="8" fill="#FF69B4" opacity="0.3" />
      {/* Eyes */}
      <circle cx="87" cy="123" r="2.5" fill="#E63946" stroke="#B22530" strokeWidth="1" />
      <circle cx="88" cy="122" r="1" fill="white" opacity="0.6" />
      <circle cx="93" cy="123" r="2.5" fill="#E63946" stroke="#B22530" strokeWidth="1" />
      <circle cx="94" cy="122" r="1" fill="white" opacity="0.6" />
      {/* Nose */}
      <ellipse cx="90" cy="127" rx="1.5" ry="1" fill="#FF69B4" />
      {/* Fluffy tail */}
      <circle cx="103" cy="132" r="4" fill="white" stroke="#CCC" strokeWidth="1.5" />
    </g>
  ),

  'pet-parrot': () => (
    <g>
      {/* Body */}
      <ellipse cx="94" cy="128" rx="7" ry="10" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      {/* Belly */}
      <ellipse cx="94" cy="132" rx="5" ry="6" fill="#FFD166" opacity="0.6" />
      {/* Head */}
      <circle cx="92" cy="116" r="6" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      {/* Eye */}
      <circle cx="89" cy="115" r="2" fill="white" stroke="#2D3436" strokeWidth="1" />
      <circle cx="89.5" cy="115" r="1" fill="#2D3436" />
      {/* Beak */}
      <polygon points="86,118 82,116 86,120" fill="#F77F00" stroke="#D4600A" strokeWidth="1" />
      {/* Wing */}
      <path d="M98 122 Q108 118 106 130 Q104 134 100 132" fill="#118AB2" stroke="#0A5F7A" strokeWidth="1.5" />
      {/* Tail feathers */}
      <path d="M94 138 L90 148" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
      <path d="M96 138 L96 150" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" />
      <path d="M98 138 L102 148" stroke="#118AB2" strokeWidth="2" strokeLinecap="round" />
      {/* Feet */}
      <line x1="91" y1="136" x2="89" y2="140" stroke="#F77F00" strokeWidth="1.5" />
      <line x1="97" y1="136" x2="99" y2="140" stroke="#F77F00" strokeWidth="1.5" />
    </g>
  ),

  'pet-panda': () => (
    <g>
      {/* Body */}
      <ellipse cx="95" cy="132" rx="9" ry="8" fill="white" stroke="#2D3436" strokeWidth="2" />
      {/* Head */}
      <circle cx="90" cy="122" r="8" fill="white" stroke="#2D3436" strokeWidth="2" />
      {/* Black ears */}
      <circle cx="83" cy="114" r="4" fill="#2D3436" />
      <circle cx="97" cy="114" r="4" fill="#2D3436" />
      {/* Eye patches */}
      <ellipse cx="86" cy="121" rx="4" ry="4.5" fill="#2D3436" />
      <ellipse cx="94" cy="121" rx="4" ry="4.5" fill="#2D3436" />
      {/* Eyes */}
      <circle cx="86" cy="121" r="2" fill="white" />
      <circle cx="87" cy="121" r="1" fill="#2D3436" />
      <circle cx="94" cy="121" r="2" fill="white" />
      <circle cx="95" cy="121" r="1" fill="#2D3436" />
      {/* Nose */}
      <ellipse cx="90" cy="126" rx="2" ry="1.5" fill="#2D3436" />
      {/* Bamboo */}
      <line x1="102" y1="118" x2="102" y2="140" stroke="#06D6A0" strokeWidth="2.5" />
      <line x1="100" y1="122" x2="96" y2="120" stroke="#06D6A0" strokeWidth="1.5" />
      {/* Black arms holding bamboo */}
      <ellipse cx="100" cy="130" rx="4" ry="3" fill="#2D3436" />
    </g>
  ),

  'pet-chicken': () => (
    <g>
      {/* BIG FAT BODY — absolute unit */}
      <ellipse cx="92" cy="128" rx="16" ry="14" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      {/* Even fatter belly */}
      <ellipse cx="92" cy="132" rx="14" ry="11" fill="#FFE699" />
      {/* Chunky thighs */}
      <ellipse cx="84" cy="138" rx="5" ry="4" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <ellipse cx="100" cy="138" rx="5" ry="4" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Little orange feet */}
      <path d="M82 142 L78 148 L82 146 L84 148 L86 142" fill="#F77F00" stroke="#D4600A" strokeWidth="1" />
      <path d="M98 142 L94 148 L98 146 L100 148 L102 142" fill="#F77F00" stroke="#D4600A" strokeWidth="1" />
      {/* Tiny wings on big body */}
      <path d="M76 124 Q70 120 72 128 Q74 132 78 128" fill="#FFE699" stroke="#D4930A" strokeWidth="1.5" />
      <path d="M108 124 Q114 120 112 128 Q110 132 106 128" fill="#FFE699" stroke="#D4930A" strokeWidth="1.5" />
      {/* Head (comically small for the body) */}
      <circle cx="88" cy="112" r="8" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      {/* Comb on head */}
      <circle cx="86" cy="104" r="3" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      <circle cx="90" cy="103" r="3.5" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      <circle cx="94" cy="105" r="2.5" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      {/* Eyes — beady and judgy */}
      <circle cx="85" cy="111" r="2.5" fill="white" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="86" cy="111" r="1.2" fill="#2D3436" />
      <circle cx="91" cy="111" r="2.5" fill="white" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="92" cy="111" r="1.2" fill="#2D3436" />
      {/* Beak */}
      <polygon points="86,116 82,114 84,118" fill="#F77F00" stroke="#D4600A" strokeWidth="1.5" />
      {/* Wattle */}
      <ellipse cx="84" cy="119" rx="2" ry="3" fill="#E63946" stroke="#B22530" strokeWidth="1" />
      {/* Tail feathers sticking up */}
      <path d="M108 120 Q114 112 112 108" stroke="#D4930A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M106 118 Q114 108 110 104" stroke="#FFD166" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108 122 Q116 116 114 112" stroke="#F77F00" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ),

  'pet-unicorn': () => (
    <g>
      {/* Body */}
      <ellipse cx="95" cy="130" rx="10" ry="8" fill="white" stroke="#C9B1FF" strokeWidth="2" />
      {/* Head */}
      <circle cx="88" cy="118" r="7" fill="white" stroke="#C9B1FF" strokeWidth="2" />
      {/* Horn */}
      <polygon points="88,111 86,98 90,111" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <line x1="87" y1="106" x2="89" y2="107" stroke="#FFD166" strokeWidth="1" />
      <line x1="87" y1="102" x2="89" y2="103" stroke="#FFD166" strokeWidth="1" />
      {/* Ear */}
      <polygon points="84,112 82,104 88,110" fill="white" stroke="#C9B1FF" strokeWidth="1" />
      {/* Eye */}
      <circle cx="86" cy="117" r="2.5" fill="#7B2CBF" stroke="#5B1D99" strokeWidth="1" />
      <circle cx="87" cy="116" r="1" fill="white" opacity="0.6" />
      {/* Mane — rainbow */}
      <path d="M92 112 Q96 108 94 114" stroke="#FF69B4" strokeWidth="2" fill="none" />
      <path d="M93 114 Q98 110 96 118" stroke="#C9B1FF" strokeWidth="2" fill="none" />
      <path d="M94 118 Q100 114 97 122" stroke="#4ECDC4" strokeWidth="2" fill="none" />
      {/* Rainbow tail */}
      <path d="M105 128 Q112 122 114 126" stroke="#FF69B4" strokeWidth="2" fill="none" />
      <path d="M105 130 Q114 124 116 128" stroke="#C9B1FF" strokeWidth="2" fill="none" />
      <path d="M105 132 Q114 128 116 132" stroke="#4ECDC4" strokeWidth="2" fill="none" />
      {/* Legs */}
      <rect x="88" y="136" width="3" height="6" rx="1.5" fill="white" stroke="#C9B1FF" strokeWidth="1" />
      <rect x="99" y="136" width="3" height="6" rx="1.5" fill="white" stroke="#C9B1FF" strokeWidth="1" />
      {/* Sparkles */}
      <text x="82" y="100" fontSize="5" fill="#FFD166">&#10022;</text>
      <text x="100" y="114" fontSize="4" fill="#FF69B4">&#10022;</text>
    </g>
  ),

  // Rename old pet dragon key
  'pet-dragon': () => (
    <g>
      {/* Mini dragon perched on shoulder */}
      <ellipse cx="10" cy="54" rx="8" ry="6" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      <circle cx="4" cy="46" r="6" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      <circle cx="2" cy="44" r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="0.5" />
      <circle cx="2" cy="44" r="1" fill="#2D3436" />
      <ellipse cx="-1" cy="48" rx="3" ry="2" fill="#08E8A0" stroke="#048A6A" strokeWidth="1" />
      <circle cx="-3" cy="47" r="0.8" fill="#FF4500" opacity="0.8" />
      <path d="M14 48 Q22 36 18 44 Q26 38 20 48" fill="#06D6A0" stroke="#048A6A" strokeWidth="1.5" />
      <path d="M18 56 Q24 60 22 64 Q20 62 18 58" fill="#06D6A0" stroke="#048A6A" strokeWidth="1.5" />
      <polygon points="22,64 24,60 26,64" fill="#FFD166" />
      <ellipse cx="10" cy="56" rx="5" ry="3" fill="#08E8A0" opacity="0.5" />
    </g>
  ),
};

export function getAvatarLayer(key: string): React.ReactNode | null {
  const renderer = avatarLayers[key];
  return renderer ? renderer() : null;
}
