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
      {/* iPad held in right hand */}
      <rect x="76" y="64" width="32" height="42" rx="4" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <rect x="78" y="67" width="28" height="36" rx="2" fill="#4ECDC4" />
      {/* Screen — math game on it! */}
      <text x="92" y="82" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold" fontFamily="sans-serif">2+2=?</text>
      <rect x="82" y="88" width="9" height="5" rx="2" fill="#06D6A0" opacity="0.8" />
      <rect x="93" y="88" width="9" height="5" rx="2" fill="#E63946" opacity="0.8" />
      <text x="86" y="92" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">4</text>
      <text x="98" y="92" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">5</text>
      {/* Camera dot */}
      <circle cx="92" cy="65" r="0.8" fill="#333" />
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

  // ===================== NEW ACCESSORIES =====================

  'acc-sunglasses': () => (
    <g>
      {/* Aviator shades pushed up on forehead */}
      <path d="M30 16 Q38 12 46 14" stroke="#FFD166" strokeWidth="1.5" fill="none" />
      <path d="M54 14 Q62 12 70 16" stroke="#FFD166" strokeWidth="1.5" fill="none" />
      <line x1="46" y1="14" x2="54" y2="14" stroke="#FFD166" strokeWidth="1.5" />
      <ellipse cx="38" cy="14" rx="9" ry="5" fill="#118AB2" opacity="0.55" stroke="#FFD166" strokeWidth="1.5" />
      <ellipse cx="62" cy="14" rx="9" ry="5" fill="#118AB2" opacity="0.55" stroke="#FFD166" strokeWidth="1.5" />
      <path d="M33 12 Q36 10 39 12" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M57 12 Q60 10 63 12" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
    </g>
  ),

  'acc-friendship-bracelet': () => (
    <g>
      {/* Colorful woven bands on both wrists */}
      <rect x="76" y="94" width="12" height="6" rx="3" fill="#FF69B4" stroke="#D44D8A" strokeWidth="1.5" />
      <line x1="76" y1="95.5" x2="88" y2="95.5" stroke="#FFD166" strokeWidth="1.5" />
      <line x1="76" y1="98" x2="88" y2="98" stroke="#4ECDC4" strokeWidth="1.5" />
      <rect x="12" y="94" width="12" height="6" rx="3" fill="#7B2CBF" stroke="#5B1D99" strokeWidth="1.5" />
      <line x1="12" y1="95.5" x2="24" y2="95.5" stroke="#06D6A0" strokeWidth="1.5" />
      <line x1="12" y1="98" x2="24" y2="98" stroke="#FF69B4" strokeWidth="1.5" />
    </g>
  ),

  'acc-lanyard': () => (
    <g>
      {/* Lanyard strap around neck */}
      <path d="M38 55 L44 82" stroke="#E63946" strokeWidth="3" fill="none" />
      <path d="M62 55 L56 82" stroke="#E63946" strokeWidth="3" fill="none" />
      {/* Badge card */}
      <rect x="40" y="80" width="20" height="26" rx="2" fill="white" stroke="#CCC" strokeWidth="1.5" />
      <rect x="43" y="84" width="14" height="10" rx="1" fill="#4ECDC4" opacity="0.4" />
      <text x="50" y="92" textAnchor="middle" fontSize="6" fill="#2D3436" fontWeight="bold" fontFamily="sans-serif">VIP</text>
      <rect x="44" y="96" width="12" height="2" rx="1" fill="#CCC" />
      <rect x="46" y="100" width="8" height="2" rx="1" fill="#CCC" />
      {/* Metal clip */}
      <rect x="47" y="78" width="6" height="4" rx="1" fill="#999" stroke="#777" strokeWidth="1" />
    </g>
  ),

  'acc-fidget-spinner': () => (
    <g>
      {/* Fidget spinner held in right hand */}
      <circle cx="92" cy="80" r="3.5" fill="#2D3436" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="92" cy="80" r="1.5" fill="#999" />
      {/* Three arms */}
      <ellipse cx="92" cy="70" rx="5" ry="6" fill="#FF69B4" stroke="#D44D8A" strokeWidth="1.5" />
      <circle cx="92" cy="68" r="2.5" fill="#2D3436" />
      <ellipse cx="83" cy="85" rx="5" ry="6" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="81" cy="87" r="2.5" fill="#2D3436" />
      <ellipse cx="101" cy="85" rx="5" ry="6" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="103" cy="87" r="2.5" fill="#2D3436" />
      {/* Motion lines */}
      <path d="M86 66 Q84 64 82 66" stroke="#CCC" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M102 66 Q104 64 106 66" stroke="#CCC" strokeWidth="0.8" fill="none" opacity="0.6" />
    </g>
  ),

  'acc-skateboard': () => (
    <g>
      {/* Skateboard held under right arm */}
      <rect x="78" y="72" width="30" height="6" rx="3" fill="#E63946" stroke="#B22530" strokeWidth="2" />
      {/* Deck graphic */}
      <rect x="84" y="73.5" width="18" height="3" rx="1.5" fill="#FF6B6B" opacity="0.6" />
      <text x="93" y="76.5" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold" fontFamily="sans-serif">SK8</text>
      {/* Kicktails */}
      <path d="M78 75 Q76 72 78 72" stroke="#B22530" strokeWidth="2" fill="#E63946" />
      <path d="M108 75 Q110 72 108 72" stroke="#B22530" strokeWidth="2" fill="#E63946" />
      {/* Wheels */}
      <circle cx="83" cy="80" r="3" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="83" cy="80" r="1" fill="#D4930A" />
      <circle cx="103" cy="80" r="3" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="103" cy="80" r="1" fill="#D4930A" />
      {/* Trucks */}
      <rect x="80" y="77" width="6" height="2" rx="1" fill="#999" />
      <rect x="100" y="77" width="6" height="2" rx="1" fill="#999" />
    </g>
  ),

  'acc-basketball': () => (
    <g>
      {/* Basketball spinning on finger */}
      <circle cx="92" cy="62" r="10" fill="#F77F00" stroke="#D4600A" strokeWidth="2" />
      {/* Ball lines */}
      <path d="M82 62 Q92 56 102 62" stroke="#D4600A" strokeWidth="1.5" fill="none" />
      <path d="M82 62 Q92 68 102 62" stroke="#D4600A" strokeWidth="1.5" fill="none" />
      <line x1="92" y1="52" x2="92" y2="72" stroke="#D4600A" strokeWidth="1.5" />
      {/* Spin effect */}
      <path d="M84 54 Q80 52 78 56" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M100 54 Q104 52 106 56" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Highlight */}
      <circle cx="88" cy="58" r="2" fill="white" opacity="0.3" />
    </g>
  ),

  'acc-soccer-ball': () => (
    <g>
      {/* Soccer ball at feet */}
      <circle cx="10" cy="140" r="9" fill="white" stroke="#2D3436" strokeWidth="2" />
      {/* Pentagon pattern */}
      <polygon points="10,133 14,136 12,140 8,140 6,136" fill="#2D3436" />
      <polygon points="4,143 8,140 6,136 1,137" fill="#2D3436" opacity="0.7" />
      <polygon points="16,143 12,140 14,136 19,137" fill="#2D3436" opacity="0.7" />
      <polygon points="7,147 10,148 13,147 12,140 8,140" fill="#2D3436" opacity="0.5" />
      {/* Shine */}
      <circle cx="7" cy="135" r="1.5" fill="white" opacity="0.6" />
    </g>
  ),

  'acc-magic-wand': () => (
    <g>
      {/* Wand held in right hand */}
      <line x1="86" y1="92" x2="100" y2="56" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
      <line x1="86" y1="92" x2="100" y2="56" stroke="#5B1D99" strokeWidth="2" strokeLinecap="round" />
      {/* Handle wrap */}
      <line x1="87" y1="88" x2="89" y2="82" stroke="#FFD166" strokeWidth="1.5" />
      <line x1="88" y1="85" x2="90" y2="79" stroke="#FFD166" strokeWidth="1.5" />
      {/* Star tip */}
      <text x="100" y="56" fontSize="14" fill="#FFD166" textAnchor="middle" dominantBaseline="central">&#9733;</text>
      {/* Sparkles */}
      <circle cx="106" cy="48" r="1.5" fill="#FFD166" opacity="0.8" />
      <circle cx="94" cy="50" r="1" fill="#FF69B4" opacity="0.7" />
      <circle cx="104" cy="60" r="1" fill="#4ECDC4" opacity="0.7" />
      <text x="108" y="54" fontSize="5" fill="#FFD166" opacity="0.6">&#10022;</text>
      <text x="92" y="44" fontSize="4" fill="#FF69B4" opacity="0.5">&#10022;</text>
    </g>
  ),

  'acc-boba-tea': () => (
    <g>
      {/* Cup held in right hand */}
      <path d="M82 68 L84 96 Q88 100 96 100 L98 68 Z" fill="white" stroke="#CCC" strokeWidth="2" />
      {/* Tea liquid */}
      <path d="M83 74 L85 96 Q88 98 95 98 L97 74 Z" fill="#D4956A" opacity="0.7" />
      {/* Dome lid */}
      <path d="M80 68 Q90 58 100 68" fill="white" stroke="#CCC" strokeWidth="1.5" />
      {/* Straw */}
      <line x1="93" y1="58" x2="96" y2="42" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round" />
      {/* Boba pearls */}
      {[{x:87,y:92},{x:91,y:94},{x:95,y:91},{x:89,y:88},{x:93,y:86},{x:86,y:95}].map((b,i) => (
        <circle key={i} cx={b.x} cy={b.y} r="2" fill="#2D3436" opacity="0.8" />
      ))}
      {/* Highlight */}
      <line x1="85" y1="72" x2="85" y2="82" stroke="white" strokeWidth="1.5" opacity="0.4" />
    </g>
  ),

  'acc-energy-drink': () => (
    <g>
      {/* Can held in right hand */}
      <rect x="82" y="66" width="16" height="28" rx="4" fill="#06D6A0" stroke="#048A6A" strokeWidth="2" />
      {/* Can design */}
      <rect x="82" y="66" width="16" height="8" rx="4" fill="#2D3436" />
      <rect x="82" y="86" width="16" height="8" rx="4" fill="#2D3436" />
      {/* Lightning bolt on can */}
      <polygon points="90,72 87,80 91,78 88,86 93,76 89,78 92,72" fill="#FFD166" />
      {/* Pull tab */}
      <ellipse cx="90" cy="66" rx="3" ry="1.5" fill="#CCC" stroke="#999" strokeWidth="0.5" />
      {/* Shine */}
      <line x1="84" y1="70" x2="84" y2="82" stroke="white" strokeWidth="1" opacity="0.3" />
    </g>
  ),

  'acc-gaming-headset': () => (
    <g>
      {/* Headband */}
      <path d="M16 30 Q16 2 50 0 Q84 2 84 30" stroke="#2D3436" strokeWidth="5" fill="none" />
      <path d="M16 30 Q16 4 50 2 Q84 4 84 30" stroke="#333" strokeWidth="3" fill="none" />
      {/* Left ear cup */}
      <rect x="6" y="24" width="18" height="22" rx="7" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="8" y="26" width="14" height="18" rx="5" fill="#333" />
      {/* RGB glow left */}
      <rect x="9" y="28" width="12" height="3" rx="1.5" fill="#FF69B4" opacity="0.8" />
      <rect x="9" y="33" width="12" height="3" rx="1.5" fill="#4ECDC4" opacity="0.8" />
      <rect x="9" y="38" width="12" height="3" rx="1.5" fill="#7B2CBF" opacity="0.8" />
      {/* Right ear cup */}
      <rect x="76" y="24" width="18" height="22" rx="7" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="78" y="26" width="14" height="18" rx="5" fill="#333" />
      {/* RGB glow right */}
      <rect x="79" y="28" width="12" height="3" rx="1.5" fill="#FF69B4" opacity="0.8" />
      <rect x="79" y="33" width="12" height="3" rx="1.5" fill="#4ECDC4" opacity="0.8" />
      <rect x="79" y="38" width="12" height="3" rx="1.5" fill="#7B2CBF" opacity="0.8" />
      {/* Microphone arm */}
      <path d="M8 40 Q4 44 2 50 Q0 54 4 56" stroke="#555" strokeWidth="2.5" fill="none" />
      <circle cx="4" cy="56" r="3" fill="#333" stroke="#555" strokeWidth="1.5" />
      <circle cx="4" cy="56" r="1.5" fill="#E63946" opacity="0.8" />
    </g>
  ),

  'acc-ring-light': () => (
    <g opacity="0.7">
      {/* Ring light behind/around character */}
      <ellipse cx="50" cy="50" rx="42" ry="42" fill="none" stroke="white" strokeWidth="4" opacity="0.3" />
      <ellipse cx="50" cy="50" rx="42" ry="42" fill="none" stroke="#FFD166" strokeWidth="2" opacity="0.2" />
      <ellipse cx="50" cy="50" rx="38" ry="38" fill="none" stroke="white" strokeWidth="1" opacity="0.15" />
      {/* Light glow spots */}
      <circle cx="50" cy="8" r="4" fill="white" opacity="0.4" />
      <circle cx="8" cy="50" r="3" fill="white" opacity="0.3" />
      <circle cx="92" cy="50" r="3" fill="white" opacity="0.3" />
      <circle cx="50" cy="92" r="3" fill="white" opacity="0.25" />
      {/* Tripod hint */}
      <line x1="50" y1="92" x2="50" y2="110" stroke="#555" strokeWidth="2" />
      <line x1="50" y1="110" x2="42" y2="130" stroke="#555" strokeWidth="1.5" />
      <line x1="50" y1="110" x2="58" y2="130" stroke="#555" strokeWidth="1.5" />
    </g>
  ),

  'acc-jetpack': () => (
    <g>
      {/* Jetpack on back */}
      <rect x="68" y="58" width="22" height="32" rx="6" fill="#999" stroke="#777" strokeWidth="2" />
      <rect x="70" y="60" width="18" height="28" rx="4" fill="#CCC" />
      {/* Thrusters */}
      <circle cx="74" cy="92" r="5" fill="#555" stroke="#333" strokeWidth="1.5" />
      <circle cx="84" cy="92" r="5" fill="#555" stroke="#333" strokeWidth="1.5" />
      {/* Flames! */}
      <path d="M74 97 Q72 108 70 116 Q74 110 74 118 Q76 110 78 116 Q76 108 74 97" fill="#FF4500" opacity="0.9" />
      <path d="M74 100 Q73 108 72 112 Q74 106 76 112 Q75 108 74 100" fill="#FFD166" opacity="0.7" />
      <path d="M84 97 Q82 108 80 116 Q84 110 84 118 Q86 110 88 116 Q86 108 84 97" fill="#FF4500" opacity="0.9" />
      <path d="M84 100 Q83 108 82 112 Q84 106 86 112 Q85 108 84 100" fill="#FFD166" opacity="0.7" />
      {/* Details */}
      <rect x="72" y="64" width="14" height="4" rx="2" fill="#E63946" />
      <circle cx="79" cy="74" r="3" fill="#118AB2" stroke="#0A5F7A" strokeWidth="1" />
    </g>
  ),

  'acc-lightsaber': () => (
    <g>
      {/* Handle held in right hand */}
      <rect x="86" y="82" width="8" height="18" rx="2" fill="#999" stroke="#777" strokeWidth="1.5" />
      <rect x="87" y="84" width="6" height="3" rx="1" fill="#333" />
      <rect x="87" y="90" width="6" height="2" rx="1" fill="#333" />
      <rect x="87" y="94" width="6" height="3" rx="1" fill="#E63946" />
      <circle cx="90" cy="86" r="1" fill="#E63946" opacity="0.8" />
      {/* Blade - glowing */}
      <rect x="88" y="32" width="4" height="50" rx="2" fill="#4ECDC4" opacity="0.9" />
      <rect x="89" y="32" width="2" height="50" rx="1" fill="white" opacity="0.6" />
      {/* Glow effect */}
      <rect x="86" y="32" width="8" height="50" rx="4" fill="#4ECDC4" opacity="0.15" />
      {/* Blade tip */}
      <ellipse cx="90" cy="32" rx="2" ry="3" fill="#4ECDC4" opacity="0.8" />
      <ellipse cx="90" cy="32" rx="1" ry="2" fill="white" opacity="0.5" />
    </g>
  ),

  'acc-bubble-shield': () => (
    <g>
      {/* Translucent bubble shield around character */}
      <ellipse cx="50" cy="65" rx="48" ry="55" fill="#4ECDC4" opacity="0.08" stroke="#4ECDC4" strokeWidth="2" />
      <ellipse cx="50" cy="65" rx="46" ry="53" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.15" />
      {/* Highlight reflections */}
      <path d="M18 30 Q22 20 30 16" stroke="white" strokeWidth="2.5" fill="none" opacity="0.35" />
      <path d="M14 45 Q16 38 20 34" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
      {/* Hex pattern hints */}
      <polygon points="70,18 76,22 76,28 70,32 64,28 64,22" fill="none" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.2" />
      <polygon points="24,80 30,84 30,90 24,94 18,90 18,84" fill="none" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.15" />
      <polygon points="78,70 84,74 84,80 78,84 72,80 72,74" fill="none" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.15" />
      {/* Energy sparkles */}
      <circle cx="20" cy="25" r="1.5" fill="white" opacity="0.4" />
      <circle cx="80" cy="100" r="1" fill="#4ECDC4" opacity="0.3" />
    </g>
  ),

  'acc-hoverboard': () => (
    <g>
      {/* Hoverboard under feet */}
      <ellipse cx="50" cy="148" rx="28" ry="5" fill="#7B2CBF" stroke="#5B1D99" strokeWidth="2" />
      <ellipse cx="50" cy="147" rx="26" ry="4" fill="#9B59B6" />
      {/* Neon glow strip */}
      <ellipse cx="50" cy="148" rx="22" ry="2" fill="#4ECDC4" opacity="0.8" />
      <ellipse cx="50" cy="148" rx="22" ry="2" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.4" />
      {/* Foot pads */}
      <ellipse cx="38" cy="146" rx="6" ry="2" fill="#2D3436" opacity="0.4" />
      <ellipse cx="62" cy="146" rx="6" ry="2" fill="#2D3436" opacity="0.4" />
      {/* Hover glow underneath */}
      <ellipse cx="50" cy="154" rx="20" ry="3" fill="#4ECDC4" opacity="0.2" />
      <ellipse cx="50" cy="156" rx="14" ry="2" fill="#4ECDC4" opacity="0.1" />
      {/* Speed lines */}
      <line x1="22" y1="150" x2="10" y2="152" stroke="#4ECDC4" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="148" x2="14" y2="149" stroke="#4ECDC4" strokeWidth="0.8" opacity="0.2" />
    </g>
  ),

  // ===================== NEW MYTHICAL ACCESSORIES =====================

  'acc-mech-suit': () => (
    <g opacity="0.85">
      {/* Exoskeleton frame around character */}
      {/* Shoulder pads */}
      <path d="M16 52 Q10 48 8 54 L12 62 L22 58 Z" fill="#999" stroke="#777" strokeWidth="2" />
      <path d="M84 52 Q90 48 92 54 L88 62 L78 58 Z" fill="#999" stroke="#777" strokeWidth="2" />
      {/* Arm frames */}
      <path d="M12 62 L8 86 L16 88 L20 66" stroke="#777" strokeWidth="2.5" fill="none" />
      <path d="M88 62 L92 86 L84 88 L80 66" stroke="#777" strokeWidth="2.5" fill="none" />
      {/* Gauntlets */}
      <rect x="4" y="84" width="14" height="10" rx="3" fill="#999" stroke="#777" strokeWidth="1.5" />
      <rect x="82" y="84" width="14" height="10" rx="3" fill="#999" stroke="#777" strokeWidth="1.5" />
      {/* Chest plate */}
      <path d="M30 56 L50 52 L70 56 L68 70 L50 72 L32 70 Z" fill="none" stroke="#777" strokeWidth="2" />
      <circle cx="50" cy="62" r="4" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="50" cy="62" r="2" fill="white" opacity="0.5" />
      {/* Leg frames */}
      <path d="M30 110 L26 130 L34 132" stroke="#777" strokeWidth="2" fill="none" />
      <path d="M70 110 L74 130 L66 132" stroke="#777" strokeWidth="2" fill="none" />
      {/* Power lines */}
      <line x1="50" y1="66" x2="50" y2="72" stroke="#4ECDC4" strokeWidth="1" opacity="0.6" />
      <circle cx="11" cy="89" r="1.5" fill="#4ECDC4" opacity="0.6" />
      <circle cx="89" cy="89" r="1.5" fill="#4ECDC4" opacity="0.6" />
    </g>
  ),

  'acc-lightning-aura': () => (
    <g>
      {/* Lightning bolts crackling around body */}
      <path d="M14 30 L20 40 L16 42 L24 55" stroke="#FFD166" strokeWidth="2.5" fill="none" opacity="0.9" />
      <path d="M14 30 L20 40 L16 42 L24 55" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M86 25 L80 38 L84 40 L76 52" stroke="#FFD166" strokeWidth="2.5" fill="none" opacity="0.9" />
      <path d="M86 25 L80 38 L84 40 L76 52" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M8 70 L16 78 L12 80 L20 92" stroke="#FFD166" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M92 68 L84 76 L88 78 L80 90" stroke="#FFD166" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Smaller sparks */}
      <path d="M20 10 L24 18 L22 20 L28 28" stroke="#FFD166" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M78 100 L82 108 L80 110 L86 118" stroke="#FFD166" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Electric dots */}
      <circle cx="14" cy="30" r="2" fill="#FFD166" opacity="0.6" />
      <circle cx="86" cy="25" r="2" fill="#FFD166" opacity="0.6" />
      <circle cx="24" cy="55" r="1.5" fill="white" opacity="0.5" />
      <circle cx="76" cy="52" r="1.5" fill="white" opacity="0.5" />
      {/* Glow aura */}
      <ellipse cx="50" cy="60" rx="40" ry="50" fill="#FFD166" opacity="0.04" />
    </g>
  ),

  'acc-portal-gun': () => (
    <g>
      {/* Gun held in right hand */}
      <rect x="82" y="76" width="18" height="10" rx="3" fill="white" stroke="#CCC" strokeWidth="2" />
      <rect x="84" y="78" width="6" height="6" rx="1" fill="#333" />
      {/* Barrel */}
      <rect x="98" y="78" width="10" height="6" rx="2" fill="#2D3436" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Handle */}
      <rect x="86" y="86" width="6" height="10" rx="2" fill="white" stroke="#CCC" strokeWidth="1.5" />
      {/* Orange portal - left side */}
      <ellipse cx="6" cy="60" rx="8" ry="18" fill="none" stroke="#F77F00" strokeWidth="3" opacity="0.8" />
      <ellipse cx="6" cy="60" rx="5" ry="14" fill="#F77F00" opacity="0.15" />
      <ellipse cx="6" cy="60" rx="3" ry="10" fill="#FFD166" opacity="0.1" />
      {/* Blue portal - right side */}
      <ellipse cx="110" cy="70" rx="8" ry="18" fill="none" stroke="#118AB2" strokeWidth="3" opacity="0.8" />
      <ellipse cx="110" cy="70" rx="5" ry="14" fill="#118AB2" opacity="0.15" />
      <ellipse cx="110" cy="70" rx="3" ry="10" fill="#4ECDC4" opacity="0.1" />
      {/* Gun glow */}
      <circle cx="108" cy="81" r="3" fill="#F77F00" opacity="0.4" />
    </g>
  ),

  'acc-drone': () => (
    <g>
      {/* Drone body hovering above left shoulder */}
      <rect x="0" y="30" width="18" height="8" rx="3" fill="#2D3436" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Camera lens */}
      <circle cx="9" cy="38" r="2.5" fill="#333" stroke="#555" strokeWidth="1" />
      <circle cx="9" cy="38" r="1" fill="#E63946" opacity="0.7" />
      {/* Propeller arms */}
      <line x1="-4" y1="32" x2="4" y2="32" stroke="#555" strokeWidth="2" />
      <line x1="14" y1="32" x2="22" y2="32" stroke="#555" strokeWidth="2" />
      {/* Propellers (spinning) */}
      <ellipse cx="-4" cy="30" rx="6" ry="1.5" fill="#CCC" opacity="0.5" />
      <ellipse cx="22" cy="30" rx="6" ry="1.5" fill="#CCC" opacity="0.5" />
      {/* LED lights */}
      <circle cx="2" cy="34" r="1" fill="#06D6A0" opacity="0.8" />
      <circle cx="16" cy="34" r="1" fill="#E63946" opacity="0.8" />
      {/* Motion lines below */}
      <line x1="4" y1="42" x2="6" y2="46" stroke="#CCC" strokeWidth="0.8" opacity="0.3" />
      <line x1="12" y1="42" x2="14" y2="46" stroke="#CCC" strokeWidth="0.8" opacity="0.3" />
    </g>
  ),

  'acc-rainbow-trail': () => (
    <g opacity="0.6">
      {/* Rainbow arc trailing behind character */}
      <path d="M-10 120 Q-8 80 10 50 Q20 30 30 20" stroke="#E63946" strokeWidth="3" fill="none" />
      <path d="M-8 124 Q-6 84 12 54 Q22 34 32 24" stroke="#F77F00" strokeWidth="3" fill="none" />
      <path d="M-6 128 Q-4 88 14 58 Q24 38 34 28" stroke="#FFD166" strokeWidth="3" fill="none" />
      <path d="M-4 132 Q-2 92 16 62 Q26 42 36 32" stroke="#06D6A0" strokeWidth="3" fill="none" />
      <path d="M-2 136 Q0 96 18 66 Q28 46 38 36" stroke="#118AB2" strokeWidth="3" fill="none" />
      <path d="M0 140 Q2 100 20 70 Q30 50 40 40" stroke="#7B2CBF" strokeWidth="3" fill="none" />
      {/* Sparkles at end */}
      <circle cx="30" cy="20" r="2" fill="white" opacity="0.5" />
      <text x="34" y="18" fontSize="5" fill="#FFD166" opacity="0.7">&#10022;</text>
    </g>
  ),

  'acc-flaming-sword': () => (
    <g>
      {/* Sword held in right hand */}
      {/* Handle */}
      <rect x="86" y="86" width="8" height="14" rx="2" fill="#8B4513" stroke="#5C3310" strokeWidth="1.5" />
      {/* Crossguard */}
      <rect x="82" y="82" width="16" height="5" rx="2" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Pommel */}
      <circle cx="90" cy="102" r="3" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Blade */}
      <polygon points="87,82 90,30 93,82" fill="#CCC" stroke="#999" strokeWidth="1.5" />
      <polygon points="88,80 90,36 92,80" fill="#E0E0E0" opacity="0.6" />
      {/* Flames on blade! */}
      <path d="M86 70 Q82 58 84 50 Q88 60 86 70" fill="#FF4500" opacity="0.8" />
      <path d="M94 65 Q98 52 96 44 Q92 54 94 65" fill="#FF4500" opacity="0.8" />
      <path d="M87 55 Q84 44 86 36 Q90 46 87 55" fill="#F77F00" opacity="0.7" />
      <path d="M93 50 Q96 40 94 34 Q91 42 93 50" fill="#F77F00" opacity="0.7" />
      {/* Inner flame glow */}
      <path d="M89 60 Q87 50 88 42 Q91 52 89 60" fill="#FFD166" opacity="0.5" />
      <path d="M91 48 Q93 40 92 34" stroke="#FFD166" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Ember particles */}
      <circle cx="82" cy="46" r="1" fill="#FF4500" opacity="0.6" />
      <circle cx="98" cy="40" r="1.5" fill="#FFD166" opacity="0.5" />
      <circle cx="84" cy="36" r="0.8" fill="#FF4500" opacity="0.4" />
    </g>
  ),

  // ===================== NEW LEGENDARY ACCESSORIES =====================

  'acc-diamond-armor': () => (
    <g>
      {/* Diamond armor overlay on torso */}
      <path d="M28 55 L50 50 L72 55 L72 110 L50 115 L28 110 Z" fill="#89CFF0" opacity="0.3" stroke="#4ECDC4" strokeWidth="2" />
      {/* Chest plate facets */}
      <polygon points="38,58 50,54 62,58 62,72 50,76 38,72" fill="#89CFF0" opacity="0.4" stroke="#4ECDC4" strokeWidth="1.5" />
      <polygon points="38,76 50,80 62,76 62,94 50,98 38,94" fill="#89CFF0" opacity="0.35" stroke="#4ECDC4" strokeWidth="1" />
      {/* Diamond sparkles */}
      <polygon points="50,62 47,66 50,70 53,66" fill="white" stroke="#89CFF0" strokeWidth="0.8" />
      <polygon points="42,84 40,87 42,90 44,87" fill="white" stroke="#89CFF0" strokeWidth="0.8" />
      <polygon points="58,84 56,87 58,90 60,87" fill="white" stroke="#89CFF0" strokeWidth="0.8" />
      {/* Shoulder gems */}
      <polygon points="30,58 26,62 30,66 34,62" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1" />
      <polygon points="70,58 66,62 70,66 74,62" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1" />
      {/* Sparkle effects */}
      <text x="50" y="60" fontSize="6" fill="white" opacity="0.8" textAnchor="middle">&#10022;</text>
      <text x="36" y="70" fontSize="4" fill="#89CFF0" opacity="0.6">&#10022;</text>
      <text x="64" y="70" fontSize="4" fill="#89CFF0" opacity="0.6">&#10022;</text>
      <text x="50" y="96" fontSize="5" fill="white" opacity="0.5" textAnchor="middle">&#10022;</text>
      {/* Arm guards */}
      <rect x="14" y="72" width="10" height="16" rx="3" fill="#89CFF0" opacity="0.3" stroke="#4ECDC4" strokeWidth="1.5" />
      <rect x="76" y="72" width="10" height="16" rx="3" fill="#89CFF0" opacity="0.3" stroke="#4ECDC4" strokeWidth="1.5" />
    </g>
  ),

  'acc-math-crown': () => (
    <g>
      {/* Golden crown */}
      <rect x="24" y="-2" width="52" height="16" rx="3" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      <polygon points="24,-2 16,-18 38,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="42,-2 50,-22 58,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="62,-2 84,-18 76,-2" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <rect x="24" y="8" width="52" height="5" rx="2.5" fill="#F4A261" stroke="#D4930A" strokeWidth="1" />
      {/* Floating math symbols */}
      <text x="26" y="-8" fontSize="8" fill="#E63946" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">+</text>
      <text x="48" y="-12" fontSize="9" fill="#4ECDC4" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">=</text>
      <text x="70" y="-8" fontSize="8" fill="#7B2CBF" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">%</text>
      {/* Gem on front */}
      <polygon points="50,4 46,8 50,12 54,8" fill="white" stroke="#89CFF0" strokeWidth="1" />
      {/* Floating equations above */}
      <text x="16" y="-26" fontSize="5" fill="#FFD166" opacity="0.6" fontFamily="sans-serif">3x</text>
      <text x="72" y="-28" fontSize="5" fill="#FFD166" opacity="0.5" fontFamily="sans-serif">42</text>
      <text x="44" y="-30" fontSize="4" fill="#FFD166" opacity="0.4" fontFamily="sans-serif">&pi;</text>
      {/* Sparkle */}
      <text x="36" y="-20" fontSize="5" fill="white" opacity="0.6">&#10022;</text>
      <text x="62" y="-22" fontSize="4" fill="white" opacity="0.5">&#10022;</text>
    </g>
  ),

  'acc-dj-turntable': () => (
    <g>
      {/* Single turntable deck on right side */}
      <rect x="70" y="100" width="40" height="6" rx="2" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      {/* Deck */}
      <rect x="72" y="104" width="36" height="28" rx="3" fill="#333" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="90" cy="118" r="11" fill="#1a1a1a" stroke="#555" strokeWidth="1.5" />
      <circle cx="90" cy="118" r="8" fill="#2D3436" />
      <circle cx="90" cy="118" r="2" fill="#E63946" />
      {/* Vinyl grooves */}
      <circle cx="90" cy="118" r="4" fill="none" stroke="#444" strokeWidth="0.5" />
      <circle cx="90" cy="118" r="6" fill="none" stroke="#444" strokeWidth="0.5" />
      <circle cx="90" cy="118" r="10" fill="none" stroke="#444" strokeWidth="0.3" />
      {/* Mixer strip on left edge */}
      <rect x="72" y="106" width="8" height="24" rx="2" fill="#444" stroke="#333" strokeWidth="1" />
      <rect x="73" y="110" width="3" height="6" rx="1" fill="#06D6A0" opacity="0.8" />
      <rect x="73" y="118" width="3" height="6" rx="1" fill="#E63946" opacity="0.8" />
      {/* RGB strip */}
      <rect x="72" y="130" width="36" height="3" rx="1.5" fill="#7B2CBF" opacity="0.7" />
      <rect x="72" y="130" width="18" height="3" rx="1.5" fill="#FF69B4" opacity="0.5" />
      {/* Crossfader knob */}
      <circle cx="76" cy="128" r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="0.8" />
    </g>
  ),

  'acc-rocket-ship': () => (
    <g>
      {/* Mini rocket on the right side */}
      {/* Rocket body */}
      <ellipse cx="95" cy="110" rx="10" ry="18" fill="#E63946" stroke="#B22530" strokeWidth="2" />
      {/* Nose cone */}
      <path d="M85 97 Q95 80 105 97" fill="#E63946" stroke="#B22530" strokeWidth="2" />
      <path d="M88 97 Q95 84 102 97" fill="#FF6B6B" opacity="0.4" />
      {/* Window */}
      <circle cx="95" cy="102" r="5" fill="#118AB2" stroke="#0A5F7A" strokeWidth="1.5" />
      <circle cx="95" cy="102" r="3.5" fill="#4ECDC4" opacity="0.6" />
      <circle cx="93" cy="100" r="1.2" fill="white" opacity="0.4" />
      {/* Fins */}
      <polygon points="85,122 78,132 87,128" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <polygon points="105,122 112,132 103,128" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Flames from bottom! */}
      <path d="M88 126 Q87 134 86 140 Q90 136 91 142 Q93 136 95 144 Q97 136 99 142 Q100 136 104 140 Q103 134 102 126" fill="#FF4500" opacity="0.9" />
      <path d="M89 128 Q88 134 88 136 Q92 132 95 138 Q98 132 102 136 Q101 132 100 128" fill="#FFD166" opacity="0.7" />
      {/* Rivets */}
      <circle cx="90" cy="108" r="1" fill="#B22530" />
      <circle cx="100" cy="108" r="1" fill="#B22530" />
      {/* Stars */}
      <text x="76" y="88" fontSize="5" fill="#FFD166" opacity="0.6">&#9733;</text>
      <text x="110" y="96" fontSize="4" fill="#FFD166" opacity="0.5">&#9733;</text>
    </g>
  ),

  'acc-golden-toilet': () => (
    <g>
      {/* Golden toilet on right side — the ultimate flex */}
      {/* Base */}
      <ellipse cx="95" cy="142" rx="15" ry="4" fill="#D4930A" stroke="#A07008" strokeWidth="1.5" />
      {/* Bowl */}
      <path d="M80 132 Q80 142 95 144 Q110 142 110 132 Z" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <path d="M83 132 Q83 138 95 140 Q107 138 107 132 Z" fill="#FFE699" opacity="0.5" />
      {/* Seat */}
      <ellipse cx="95" cy="132" rx="15" ry="5" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <ellipse cx="95" cy="132" rx="11" ry="3.5" fill="#F4A261" opacity="0.3" />
      {/* Tank back */}
      <rect x="84" y="114" width="22" height="18" rx="3" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <rect x="86" y="116" width="18" height="14" rx="2" fill="#FFE699" opacity="0.4" />
      {/* Lid */}
      <rect x="82" y="112" width="26" height="4" rx="2" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Flush handle */}
      <path d="M106 120 Q112 118 114 122" stroke="#D4930A" strokeWidth="2" fill="none" />
      <circle cx="114" cy="122" r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      {/* Sparkles */}
      <text x="78" y="120" fontSize="5" fill="white" opacity="0.7">&#10022;</text>
      <text x="108" y="114" fontSize="4" fill="white" opacity="0.6">&#10022;</text>
      <text x="48" y="108" fontSize="5" fill="white" opacity="0.8">&#10022;</text>
      {/* Diamond on tank */}
      <polygon points="50,118 47,122 50,126 53,122" fill="white" stroke="#89CFF0" strokeWidth="0.8" />
    </g>
  ),

  'acc-ipad-pro': () => (
    <g>
      {/* iPad Pro held in right hand — big screen */}
      <rect x="72" y="56" width="40" height="54" rx="5" fill="#1a1a1a" stroke="#000" strokeWidth="3" />
      <rect x="75" y="59" width="34" height="48" rx="3" fill="#0d0d2b" />
      {/* App header */}
      <rect x="75" y="59" width="34" height="8" rx="3" fill="#118AB2" />
      <text x="92" y="66" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold" fontFamily="sans-serif">MATHA COLA</text>
      {/* Equation */}
      <text x="92" y="80" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold" fontFamily="sans-serif">7&times;8=?</text>
      {/* Answer buttons */}
      <rect x="77" y="86" width="10" height="7" rx="2" fill="#06D6A0" />
      <text x="82" y="92" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">56</text>
      <rect x="89" y="86" width="10" height="7" rx="2" fill="#E63946" />
      <text x="94" y="92" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">54</text>
      {/* Timer bar */}
      <rect x="77" y="96" width="28" height="2" rx="1" fill="#333" />
      <rect x="77" y="96" width="18" height="2" rx="1" fill="#06D6A0" />
      {/* Camera dot */}
      <circle cx="92" cy="57.5" r="1" fill="#333" />
      {/* Apple Pencil */}
      <rect x="113" y="62" width="2.5" height="40" rx="1.25" fill="#CCC" stroke="#999" strokeWidth="0.5" />
      <rect x="113" y="62" width="2.5" height="5" rx="1.25" fill="#999" />
      {/* Sparkle */}
      <text x="70" y="62" fontSize="4" fill="white" opacity="0.6">&#10022;</text>
      <text x="108" y="104" fontSize="4" fill="white" opacity="0.5">&#10022;</text>
    </g>
  ),

  // ===================== NEW PET =====================

  'pet-poop': () => (
    <g>
      {/* Classic poop emoji as a pet */}
      {/* Body — swirly poop shape */}
      <path d="M95 142 Q85 140 84 134 Q83 128 90 126 Q86 122 88 118 Q90 114 95 116 Q92 110 96 108 Q100 106 102 110 Q106 108 108 112 Q110 116 106 118 Q110 120 110 126 Q110 132 104 134 Q108 138 104 142 Z" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" />
      {/* Lighter swirl highlights */}
      <path d="M90 126 Q88 122 90 118 Q92 116 95 118" stroke="#A07E1C" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M96 132 Q94 128 96 124" stroke="#A07E1C" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Eyes — big cute googly eyes */}
      <circle cx="92" cy="122" r="4" fill="white" stroke="#6B4F10" strokeWidth="1.5" />
      <circle cx="93" cy="121" r="2" fill="#2D3436" />
      <circle cx="94" cy="120" r="0.8" fill="white" />
      <circle cx="102" cy="122" r="4" fill="white" stroke="#6B4F10" strokeWidth="1.5" />
      <circle cx="103" cy="121" r="2" fill="#2D3436" />
      <circle cx="104" cy="120" r="0.8" fill="white" />
      {/* Happy mouth */}
      <path d="M93 128 Q97 132 101 128" stroke="#6B4F10" strokeWidth="1.5" fill="none" />
      {/* Rosy cheeks */}
      <circle cx="89" cy="127" r="2" fill="#FF69B4" opacity="0.4" />
      <circle cx="105" cy="127" r="2" fill="#FF69B4" opacity="0.4" />
      {/* Stink lines */}
      <path d="M92 106 Q90 100 92 96" stroke="#90EE90" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M98 104 Q96 98 98 94" stroke="#90EE90" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M104 106 Q102 100 104 96" stroke="#90EE90" strokeWidth="1" fill="none" opacity="0.3" />
    </g>
  ),

  'pet-67': () => (
    <g>
      {/* The legendary 67 meme pet */}
      {/* Glow aura */}
      <ellipse cx="95" cy="124" rx="18" ry="14" fill="#FFD166" opacity="0.12" />
      {/* Big bold "67" as the body */}
      <text x="95" y="132" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="sans-serif" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5">67</text>
      {/* Googly eyes on the 6 */}
      <circle cx="86" cy="118" r="4" fill="white" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="87" cy="117" r="2" fill="#2D3436" />
      <circle cx="88" cy="116" r="0.7" fill="white" />
      {/* Googly eyes on the 7 */}
      <circle cx="100" cy="116" r="4" fill="white" stroke="#2D3436" strokeWidth="1.5" />
      <circle cx="101" cy="115" r="2" fill="#2D3436" />
      <circle cx="102" cy="114" r="0.7" fill="white" />
      {/* Little legs */}
      <rect x="84" y="134" width="3" height="7" rx="1.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      <rect x="90" y="134" width="3" height="7" rx="1.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      <rect x="98" y="134" width="3" height="7" rx="1.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      <rect x="104" y="134" width="3" height="7" rx="1.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      {/* Little shoes */}
      <ellipse cx="85.5" cy="141.5" rx="3" ry="1.5" fill="#D4930A" />
      <ellipse cx="91.5" cy="141.5" rx="3" ry="1.5" fill="#D4930A" />
      <ellipse cx="99.5" cy="141.5" rx="3" ry="1.5" fill="#D4930A" />
      <ellipse cx="105.5" cy="141.5" rx="3" ry="1.5" fill="#D4930A" />
      {/* Sparkles */}
      <text x="76" y="112" fontSize="5" fill="#FFD166" opacity="0.7">&#10022;</text>
      <text x="112" y="120" fontSize="4" fill="#FFD166" opacity="0.6">&#10022;</text>
      <text x="80" y="138" fontSize="3" fill="#FFD166" opacity="0.5">&#10022;</text>
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
