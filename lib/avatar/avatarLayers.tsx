import React from 'react';

type LayerRenderer = () => React.ReactNode;

export const avatarLayers: Record<string, LayerRenderer> = {

  // ===================== HATS =====================

  'hat-backwards-cap': () => (
    <g>
      <ellipse cx="50" cy="10" rx="24" ry="6" fill="#118AB2" stroke="#0A5F7A" strokeWidth="2" />
      <path d="M26 10 Q30 -4 50 -6 Q70 -4 74 10 Z" fill="#118AB2" stroke="#0A5F7A" strokeWidth="2" />
      {/* Brim backwards */}
      <path d="M26 10 L16 14 Q14 10 18 8 Z" fill="#0E6E8C" stroke="#0A5F7A" strokeWidth="1.5" />
      <circle cx="50" cy="-4" r="2.5" fill="#0E6E8C" stroke="#0A5F7A" strokeWidth="1" />
      {/* Cap shine */}
      <path d="M34 2 Q42 -4 56 0" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </g>
  ),

  'hat-beanie': () => (
    <g>
      <path d="M26 14 Q24 -8 50 -14 Q76 -8 74 14 Z" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      {/* Ribbed band */}
      <rect x="26" y="6" width="48" height="10" rx="5" fill="#CC2936" stroke="#B22530" strokeWidth="1.5" />
      {[32,38,44,50,56,62,68].map(x => (
        <line key={x} x1={x} y1="7" x2={x} y2="15" stroke="#A01E28" strokeWidth="1.2" opacity="0.5" />
      ))}
      {/* Chunky pompom */}
      <circle cx="50" cy="-14" r="7" fill="#FF6B6B" stroke="#E63946" strokeWidth="2" />
      <circle cx="47" cy="-17" r="3.5" fill="#FF8A8A" />
      <circle cx="54" cy="-13" r="2.5" fill="#FFAAAA" opacity="0.7" />
      {/* Shine */}
      <path d="M32 0 Q40 -6 52 -2" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
    </g>
  ),

  'hat-cat-ears': () => (
    <g>
      {/* Left ear */}
      <polygon points="28,14 22,-8 44,6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="31,11 26,-4 41,7" fill="#FF69B4" />
      {/* Right ear */}
      <polygon points="72,14 78,-8 56,6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="69,11 74,-4 59,7" fill="#FF69B4" />
      {/* Inner ear shine */}
      <line x1="28" y1="4" x2="34" y2="8" stroke="#FFB3D9" strokeWidth="1.5" opacity="0.5" />
      <line x1="72" y1="4" x2="66" y2="8" stroke="#FFB3D9" strokeWidth="1.5" opacity="0.5" />
    </g>
  ),

  'hat-wizard': () => (
    <g>
      {/* Wide brim */}
      <ellipse cx="50" cy="14" rx="34" ry="8" fill="#5B1D99" stroke="#3D1166" strokeWidth="2.5" />
      <ellipse cx="50" cy="12" rx="30" ry="5" fill="#7B2CBF" />
      {/* Tall cone */}
      <polygon points="26,14 50,-28 74,14" fill="#7B2CBF" stroke="#5B1D99" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="32,12 50,-22 68,12" fill="#9B59B6" />
      {/* Stars and moons */}
      <text x="42" y="2" fontSize="8" fill="#FFD166" fontWeight="bold">&#9733;</text>
      <text x="54" y="-10" fontSize="6" fill="#FFD166">&#9733;</text>
      <text x="36" y="-8" fontSize="5" fill="#4ECDC4">&#9790;</text>
      {/* Glowing tip */}
      <circle cx="50" cy="-28" r="5" fill="#FFD166" opacity="0.9" />
      <circle cx="50" cy="-28" r="8" fill="#FFD166" opacity="0.2" />
      {/* Shine */}
      <path d="M36 4 Q44 -8 50 -16" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2" />
    </g>
  ),

  'hat-unicorn-horn': () => (
    <g>
      {/* Spiral horn */}
      <polygon points="44,-26 50,-2 56,-26" fill="#FFD166" stroke="#E8A838" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="46,-22 50,-4 54,-22" fill="#FF69B4" opacity="0.6" />
      {/* Spiral lines */}
      {[-20,-14,-8].map(y => (
        <line key={y} x1="47" y1={y} x2="53" y2={y+2} stroke="#FFD166" strokeWidth="1.5" />
      ))}
      {/* Flower crown at base */}
      <circle cx="36" cy="4" r="5" fill="#FF69B4" stroke="#D44D8A" strokeWidth="1.5" />
      <circle cx="36" cy="4" r="2" fill="#FFD166" />
      <circle cx="50" cy="0" r="4.5" fill="#C9B1FF" stroke="#A08AD4" strokeWidth="1.5" />
      <circle cx="50" cy="0" r="2" fill="#FFD166" />
      <circle cx="64" cy="4" r="5" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="64" cy="4" r="2" fill="#FFD166" />
      {/* Sparkles */}
      <text x="34" y="-10" fontSize="7" fill="#FFD166">&#10022;</text>
      <text x="62" y="-16" fontSize="6" fill="#FF69B4">&#10022;</text>
      <text x="50" y="-24" fontSize="5" fill="white" opacity="0.8">&#10022;</text>
    </g>
  ),

  'hat-crown': () => (
    <g>
      {/* Crown base */}
      <rect x="28" y="0" width="44" height="16" rx="3" fill="#FFD166" stroke="#D4930A" strokeWidth="2.5" />
      {/* Points */}
      <polygon points="28,0 20,-14 38,0" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="42,0 50,-20 58,0" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="62,0 80,-14 72,0" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      {/* Gems */}
      <circle cx="29" cy="-6" r="3" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      <circle cx="50" cy="-12" r="4" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      <circle cx="71" cy="-6" r="3" fill="#E63946" stroke="#B22530" strokeWidth="1.5" />
      {/* Gem shines */}
      <circle cx="28" cy="-7.5" r="1" fill="white" opacity="0.5" />
      <circle cx="49" cy="-13.5" r="1.5" fill="white" opacity="0.5" />
      {/* Band detail */}
      <rect x="28" y="10" width="44" height="5" rx="2.5" fill="#F4A261" stroke="#D4930A" strokeWidth="1" />
      {/* Shine */}
      <rect x="34" y="2" width="18" height="3" rx="1.5" fill="white" opacity="0.25" />
    </g>
  ),

  'hat-astronaut': () => (
    <g>
      {/* Helmet dome */}
      <ellipse cx="50" cy="20" rx="36" ry="32" fill="#E0E0E0" stroke="#999" strokeWidth="3" opacity="0.5" />
      <ellipse cx="50" cy="18" rx="30" ry="28" fill="none" stroke="#B0B0B0" strokeWidth="2.5" />
      {/* Visor */}
      <path d="M28 24 Q28 4 50 0 Q72 4 72 24 Z" fill="#118AB2" opacity="0.55" stroke="#0A5F7A" strokeWidth="2" />
      <path d="M34 20 Q34 8 50 6 Q66 8 66 20 Z" fill="#4ECDC4" opacity="0.3" />
      {/* Visor shine */}
      <path d="M36 12 Q44 6 54 10" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Antenna */}
      <line x1="50" y1="-6" x2="50" y2="-18" stroke="#999" strokeWidth="2.5" />
      <circle cx="50" cy="-20" r="4" fill="#E63946" stroke="#B22530" strokeWidth="2" />
      <circle cx="49" cy="-21.5" r="1.5" fill="#FF8A8A" opacity="0.7" />
    </g>
  ),

  // ===================== HAIR =====================

  'hair-spiky-blue': () => (
    <g>
      {[{x:"31,14 24,-6 42,8", fill:"#00B4D8"}, {x:"41,14 34,-10 50,6", fill:"#0096C7"}, {x:"50,14 48,-14 58,4", fill:"#00B4D8"}, {x:"59,14 62,-10 70,6", fill:"#0096C7"}, {x:"69,14 76,-6 76,12", fill:"#00B4D8"}].map((s, i) => (
        <polygon key={i} points={s.x} fill={s.fill} stroke="#006D8A" strokeWidth="2" strokeLinejoin="round" />
      ))}
      {/* Frost tips */}
      <circle cx="25" cy="-4" r="2" fill="#90E0EF" opacity="0.8" />
      <circle cx="48" cy="-12" r="2" fill="#90E0EF" opacity="0.8" />
      <circle cx="75" cy="-4" r="2" fill="#90E0EF" opacity="0.8" />
    </g>
  ),

  'hair-curly-puff': () => (
    <g>
      {[{cx:30,cy:6,r:9},{cx:44,cy:-1,r:10},{cx:58,cy:-1,r:10},{cx:72,cy:6,r:9},{cx:37,cy:-6,r:8},{cx:63,cy:-6,r:8},{cx:50,cy:-8,r:8}].map((c,i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={i%2 ? "#A0522D" : "#8B4513"} stroke="#5C3310" strokeWidth="2" />
      ))}
      {/* Highlights */}
      <circle cx="40" cy="-4" r="3" fill="#C68642" opacity="0.4" />
      <circle cx="60" cy="-4" r="3" fill="#C68642" opacity="0.4" />
    </g>
  ),

  'hair-braids': () => (
    <g>
      {/* Hair base */}
      <path d="M28 14 Q28 0 50 -4 Q72 0 72 14" fill="#2D1B00" stroke="#1A1000" strokeWidth="2.5" />
      {/* Left braid */}
      {[18,26,34,42,50,58].map((y,i) => (
        <circle key={`l${i}`} cx={28 - i*1} cy={y} r={3.5} fill={i%2 ? "#3D2B00" : "#2D1B00"} stroke="#1A1000" strokeWidth="1.5" />
      ))}
      <circle cx="22" cy="64" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Right braid */}
      {[18,26,34,42,50,58].map((y,i) => (
        <circle key={`r${i}`} cx={72 + i*1} cy={y} r={3.5} fill={i%2 ? "#3D2B00" : "#2D1B00"} stroke="#1A1000" strokeWidth="1.5" />
      ))}
      <circle cx="78" cy="64" r="3.5" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
      {/* Beads */}
      <circle cx="25" cy="38" r="2" fill="#E63946" stroke="#B22530" strokeWidth="1" />
      <circle cx="76" cy="38" r="2" fill="#E63946" stroke="#B22530" strokeWidth="1" />
    </g>
  ),

  'hair-pigtails': () => (
    <g>
      <path d="M28 14 Q28 2 50 -2 Q72 2 72 14" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2.5" />
      {/* Left pigtail */}
      <ellipse cx="22" cy="22" rx="8" ry="12" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2" />
      <ellipse cx="20" cy="36" rx="6" ry="10" fill="#E63946" stroke="#CC2936" strokeWidth="1.5" />
      <circle cx="24" cy="12" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      {/* Right pigtail */}
      <ellipse cx="78" cy="22" rx="8" ry="12" fill="#FF6B6B" stroke="#CC2936" strokeWidth="2" />
      <ellipse cx="80" cy="36" rx="6" ry="10" fill="#E63946" stroke="#CC2936" strokeWidth="1.5" />
      <circle cx="76" cy="12" r="3.5" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" />
    </g>
  ),

  'hair-mohawk-rainbow': () => (
    <g>
      <rect x="42" y="-18" width="16" height="34" rx="8" fill="#E63946" stroke="#1a1a1a" strokeWidth="2.5" />
      {[{y:-16,fill:"#E63946"},{y:-10,fill:"#F77F00"},{y:-4,fill:"#FFD166"},{y:2,fill:"#06D6A0"},{y:8,fill:"#118AB2"},{y:14,fill:"#7B2CBF"}].map((s,i) => (
        <rect key={i} x="43" y={s.y} width="14" height="6" rx="3" fill={s.fill} />
      ))}
    </g>
  ),

  'hair-anime': () => (
    <g>
      <path d="M22 14 Q16 -6 35 -14 Q50 -18 65 -14 Q84 -6 78 14" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2.5" />
      {/* Front bangs */}
      <path d="M28 14 Q26 2 38 -2 Q50 -4 58 2 L56 14 Z" fill="#16213e" stroke="#0d0d1a" strokeWidth="2" />
      {/* Side pieces */}
      <path d="M20 14 L14 40 Q18 44 26 32 L30 14 Z" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2" />
      <path d="M80 14 L86 40 Q82 44 74 32 L70 14 Z" fill="#1a1a2e" stroke="#0d0d1a" strokeWidth="2" />
      {/* Anime shine */}
      <path d="M34 0 Q40 -6 46 2" stroke="#4ECDC4" strokeWidth="2.5" fill="none" opacity="0.5" />
    </g>
  ),

  'hair-afro': () => (
    <g>
      <circle cx="50" cy="2" r="30" fill="#2D1B00" stroke="#1A1000" strokeWidth="3" />
      <circle cx="50" cy="0" r="27" fill="#3D2B00" />
      {/* Volume highlights */}
      <circle cx="34" cy="-8" r="6" fill="#4A3600" opacity="0.4" />
      <circle cx="66" cy="-8" r="6" fill="#4A3600" opacity="0.4" />
      <circle cx="50" cy="-16" r="5" fill="#4A3600" opacity="0.3" />
      {/* Pick comb */}
      <rect x="72" y="-10" width="3" height="14" rx="1.5" fill="#E63946" stroke="#B22530" strokeWidth="1" />
      {[-14,-14,-14].map((y,i) => (
        <rect key={i} x={70 + i*2.5} y={y} width="2" height="5" rx="1" fill="#E63946" stroke="#B22530" strokeWidth="0.5" />
      ))}
    </g>
  ),

  // ===================== ACCESSORIES =====================

  'acc-cool-shades': () => (
    <g>
      <path d="M24 42 Q26 36 38 36 Q46 36 46 42 Q46 52 36 52 Q26 52 24 46 Z" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <path d="M54 42 Q56 36 66 36 Q76 36 76 42 Q76 52 66 52 Q56 52 54 46 Z" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
      <line x1="46" y1="44" x2="54" y2="44" stroke="#000" strokeWidth="3" />
      <line x1="24" y1="42" x2="16" y2="38" stroke="#000" strokeWidth="2.5" />
      <line x1="76" y1="42" x2="84" y2="38" stroke="#000" strokeWidth="2.5" />
      {/* Lens shine */}
      <path d="M28 40 Q32 36 36 40" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
      <path d="M58 40 Q62 36 66 40" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
    </g>
  ),

  'acc-heart-glasses': () => (
    <g>
      <path d="M28 44 Q28 36 36 36 Q44 36 40 48 L36 52 L32 48 Q24 36 28 44 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" />
      <path d="M60 44 Q60 36 68 36 Q76 36 72 48 L68 52 L64 48 Q56 36 60 44 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" />
      <line x1="44" y1="44" x2="56" y2="44" stroke="#D44D8A" strokeWidth="2.5" />
      <line x1="24" y1="42" x2="16" y2="38" stroke="#D44D8A" strokeWidth="2" />
      <line x1="80" y1="42" x2="88" y2="38" stroke="#D44D8A" strokeWidth="2" />
      {/* Shine */}
      <circle cx="32" cy="40" r="1.5" fill="white" opacity="0.4" />
      <circle cx="64" cy="40" r="1.5" fill="white" opacity="0.4" />
    </g>
  ),

  'acc-headphones': () => (
    <g>
      <path d="M22 38 Q22 14 50 12 Q78 14 78 38" stroke="#1a1a1a" strokeWidth="5" fill="none" />
      <path d="M22 38 Q22 16 50 14 Q78 16 78 38" stroke="#2D3436" strokeWidth="3" fill="none" />
      {/* Left cup */}
      <rect x="12" y="30" width="16" height="20" rx="6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="14" y="32" width="12" height="16" rx="4" fill="#E63946" />
      <circle cx="20" cy="40" r="3" fill="#B22530" />
      <circle cx="19" cy="39" r="1" fill="#FF6B6B" opacity="0.5" />
      {/* Right cup */}
      <rect x="72" y="30" width="16" height="20" rx="6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="74" y="32" width="12" height="16" rx="4" fill="#E63946" />
      <circle cx="80" cy="40" r="3" fill="#B22530" />
      <circle cx="79" cy="39" r="1" fill="#FF6B6B" opacity="0.5" />
    </g>
  ),

  'acc-gold-chain': () => (
    <g>
      <path d="M30 78 Q38 84 50 86 Q62 84 70 78" stroke="#FFD166" strokeWidth="3.5" fill="none" />
      <path d="M30 78 Q38 84 50 86 Q62 84 70 78" stroke="#F4A261" strokeWidth="1.5" fill="none" />
      {/* Chain links */}
      {[34,42,50,58,66].map(x => (
        <circle key={x} cx={x} cy={x < 50 ? 80 + (50-x)*0.15 : 80 + (x-50)*0.15} r="2" fill="#FFD166" stroke="#D4930A" strokeWidth="1" />
      ))}
      {/* Pendant */}
      <circle cx="50" cy="92" r="7" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <text x="50" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E63946" fontFamily="sans-serif">M</text>
      <circle cx="47" cy="89" r="2" fill="white" opacity="0.3" />
    </g>
  ),

  'acc-butterfly-wings': () => (
    <g>
      {/* Left wings */}
      <path d="M18 55 Q-4 30 8 48 Q-2 70 18 62 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" opacity="0.8" />
      <path d="M18 64 Q0 82 12 76 Q4 94 18 82 Z" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" opacity="0.75" />
      {/* Right wings */}
      <path d="M82 55 Q104 30 92 48 Q102 70 82 62 Z" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2" opacity="0.8" />
      <path d="M82 64 Q100 82 88 76 Q96 94 82 82 Z" fill="#4ECDC4" stroke="#3BA8A0" strokeWidth="1.5" opacity="0.75" />
      {/* Wing dots */}
      <circle cx="8" cy="50" r="3" fill="#FFD166" stroke="#D4930A" strokeWidth="1" opacity="0.7" />
      <circle cx="92" cy="50" r="3" fill="#FFD166" stroke="#D4930A" strokeWidth="1" opacity="0.7" />
      <circle cx="10" cy="78" r="2" fill="#C9B1FF" opacity="0.6" />
      <circle cx="90" cy="78" r="2" fill="#C9B1FF" opacity="0.6" />
    </g>
  ),

  'acc-stanley-cup': () => (
    <g>
      {/* Cup body */}
      <rect x="86" y="54" width="14" height="24" rx="4" fill="#06D6A0" stroke="#048A6A" strokeWidth="2.5" />
      <rect x="88" y="58" width="10" height="18" rx="3" fill="#08E8A0" />
      {/* Lid */}
      <rect x="84" y="50" width="18" height="6" rx="3" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      {/* Straw */}
      <line x1="96" y1="50" x2="99" y2="38" stroke="#2D3436" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="99" cy="36" r="2" fill="#2D3436" />
      {/* Handle */}
      <path d="M100 58 Q108 58 108 66 Q108 74 100 74" stroke="#06D6A0" strokeWidth="3" fill="none" />
      <path d="M100 58 Q108 58 108 66 Q108 74 100 74" stroke="#048A6A" strokeWidth="1.5" fill="none" />
      {/* Logo */}
      <circle cx="93" cy="68" r="3.5" fill="white" opacity="0.5" stroke="#048A6A" strokeWidth="0.5" />
      {/* Condensation drops */}
      <ellipse cx="89" cy="64" rx="1" ry="1.5" fill="white" opacity="0.4" />
      <ellipse cx="91" cy="70" rx="0.8" ry="1.2" fill="white" opacity="0.3" />
    </g>
  ),

  // ===================== SHIRTS =====================

  'shirt-lightning': () => (
    <g>
      <polygon points="54,38 44,56 51,56 40,78 60,52 53,52 62,38" fill="#FFD166" stroke="#D4930A" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="54,40 46,55 52,55 44,74 58,53 53,53 60,40" fill="#FFE699" opacity="0.6" />
    </g>
  ),

  'shirt-flames': () => (
    <g>
      <path d="M20 108 Q26 88 32 94 Q38 80 44 90 Q50 74 54 86 Q60 78 64 90 Q70 82 74 94 Q80 86 82 108 Z" fill="#F77F00" stroke="#D4600A" strokeWidth="2" opacity="0.75" />
      <path d="M24 108 Q30 92 36 98 Q42 84 48 92 Q52 80 56 90 Q62 84 66 96 Q72 90 76 108 Z" fill="#E63946" opacity="0.6" />
      <path d="M30 108 Q36 96 42 100 Q48 90 52 96 Q56 88 60 98 Q66 94 70 108 Z" fill="#FFD166" opacity="0.45" />
    </g>
  ),

  'shirt-galaxy': () => (
    <g opacity="0.65">
      <ellipse cx="50" cy="72" rx="28" ry="34" fill="#0d0d2b" />
      {/* Stars */}
      {[{x:33,y:48,r:1.5},{x:62,y:44,r:2},{x:44,y:82,r:1.3},{x:56,y:60,r:1},{x:38,y:66,r:1.5},{x:64,y:76,r:1},{x:36,y:92,r:1.2},{x:60,y:90,r:1.8},{x:50,y:52,r:0.8}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" />
      ))}
      {/* Nebula swirls */}
      <ellipse cx="44" cy="62" rx="12" ry="5" fill="#7B2CBF" opacity="0.5" transform="rotate(-20 44 62)" />
      <ellipse cx="56" cy="80" rx="10" ry="4" fill="#4ECDC4" opacity="0.45" transform="rotate(15 56 80)" />
      <ellipse cx="50" cy="72" rx="14" ry="4" fill="#FF69B4" opacity="0.35" transform="rotate(-10 50 72)" />
    </g>
  ),

  'shirt-superhero': () => (
    <g>
      <path d="M20 44 L2 108 Q50 124 98 108 L80 44 Z" fill="#E63946" stroke="#B22530" strokeWidth="2" opacity="0.7" />
      <path d="M20 44 L8 102 Q50 116 92 102 L80 44 Z" fill="#FF6B6B" opacity="0.35" />
    </g>
  ),

  // ===================== SHOES =====================

  'shoes-high-tops': () => (
    <g>
      {/* Left */}
      <rect x="20" y="124" width="20" height="14" rx="5" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="20" y="124" width="20" height="5" rx="2.5" fill="white" stroke="#ddd" strokeWidth="1" />
      <circle cx="30" cy="131" r="1.5" fill="white" />
      {/* Right */}
      <rect x="60" y="124" width="20" height="14" rx="5" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="60" y="124" width="20" height="5" rx="2.5" fill="white" stroke="#ddd" strokeWidth="1" />
      <circle cx="70" cy="131" r="1.5" fill="white" />
    </g>
  ),

  'shoes-roller-skates': () => (
    <g>
      {/* Left skate */}
      <rect x="18" y="124" width="22" height="12" rx="4" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2.5" />
      <rect x="18" y="124" width="22" height="4" rx="2" fill="#FF8FAB" />
      <circle cx="23" cy="138" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="35" cy="138" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="23" cy="137" r="1" fill="white" opacity="0.4" />
      <circle cx="35" cy="137" r="1" fill="white" opacity="0.4" />
      {/* Right skate */}
      <rect x="60" y="124" width="22" height="12" rx="4" fill="#FF69B4" stroke="#D44D8A" strokeWidth="2.5" />
      <rect x="60" y="124" width="22" height="4" rx="2" fill="#FF8FAB" />
      <circle cx="65" cy="138" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="77" cy="138" r="3.5" fill="#FFD166" stroke="#D4930A" strokeWidth="1.5" />
      <circle cx="65" cy="137" r="1" fill="white" opacity="0.4" />
      <circle cx="77" cy="137" r="1" fill="white" opacity="0.4" />
    </g>
  ),

  'shoes-rocket': () => (
    <g>
      {/* Left rocket boot */}
      <rect x="20" y="124" width="20" height="12" rx="4" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <polygon points="22,138 30,150 38,138" fill="#F77F00" stroke="#D4600A" strokeWidth="1.5" />
      <polygon points="24,140 30,152 36,140" fill="#FFD166" opacity="0.8" />
      <polygon points="27,142 30,148 33,142" fill="white" opacity="0.5" />
      {/* Right rocket boot */}
      <rect x="60" y="124" width="20" height="12" rx="4" fill="#E63946" stroke="#B22530" strokeWidth="2.5" />
      <polygon points="62,138 70,150 78,138" fill="#F77F00" stroke="#D4600A" strokeWidth="1.5" />
      <polygon points="64,140 70,152 76,140" fill="#FFD166" opacity="0.8" />
      <polygon points="67,142 70,148 73,142" fill="white" opacity="0.5" />
    </g>
  ),

  // ===================== LABELS =====================

  'label-math-boss': () => (
    <g>
      <rect x="26" y="56" width="48" height="24" rx="6" fill="white" stroke="#2D3436" strokeWidth="2" />
      <text x="50" y="66" textAnchor="middle" fontSize="6" fill="#2D3436" fontFamily="sans-serif" fontWeight="bold">MATH</text>
      <text x="50" y="76" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#E63946" fontFamily="sans-serif">BOSS</text>
    </g>
  ),

  'label-star': () => (
    <g>
      <rect x="26" y="56" width="48" height="24" rx="6" fill="#FFD166" stroke="#D4930A" strokeWidth="2" />
      <text x="50" y="73" textAnchor="middle" fontSize="18" fill="#E63946">&#9733;</text>
    </g>
  ),

  'label-fire': () => (
    <g>
      <rect x="26" y="56" width="48" height="24" rx="6" fill="#2D3436" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M44 74 Q47 62 50 66 Q53 58 56 66 Q58 62 56 74 Q50 76 44 74 Z" fill="#F77F00" />
      <path d="M46 74 Q48 66 50 68 Q52 62 54 68 Q55 66 54 74 Q50 75 46 74 Z" fill="#FFD166" />
      <text x="50" y="65" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#F77F00" fontFamily="sans-serif">ON FIRE</text>
    </g>
  ),
};

export function getAvatarLayer(key: string): React.ReactNode | null {
  const renderer = avatarLayers[key];
  return renderer ? renderer() : null;
}
