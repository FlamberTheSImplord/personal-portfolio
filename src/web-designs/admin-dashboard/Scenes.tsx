import type { ReactNode } from 'react'
import type { Scene } from './data'

// Drawn stand-ins for the reel's listing photography. Each keeps the photo's
// subject and dominant colours so the moderation grid reads the same.
const Sky = ({ id, top = '#3d8fe0', bottom = '#cfe6fb' }: { id: string; top?: string; bottom?: string }) => <>
  <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
  <rect width="240" height="170" fill={`url(#${id})`} />
  <path d="M18 34 q10-12 24-4 q8-10 20 0 q12 2 6 10 H14 q-6-6 4-6Z M150 22 q8-9 19-3 q9-6 16 2 q8 2 2 8 h-40 q-5-5 3-7Z" fill="#fff" opacity=".75" />
</>
const Pool = ({ y = 128, d = 'M0 128 H240 V170 H0Z' }: { y?: number; d?: string }) => <>
  <path d={d} fill="#3cc4dd" /><path d={`M0 ${y + 4} H240 V${y + 10} H0Z`} fill="#7fe0ee" opacity=".55" />
  <path d={`M20 ${y + 20} q12 -4 24 0 t24 0 M120 ${y + 28} q12 -4 24 0 t24 0 M60 ${y + 36} q12 -4 24 0 t24 0`} stroke="#c9f4fb" strokeWidth="2" fill="none" opacity=".8" />
</>
const Room = ({ wall, floor, children }: { wall: string; floor: string; children: ReactNode }) => <>
  <rect width="240" height="170" fill={wall} /><rect y="128" width="240" height="42" fill={floor} />{children}
</>
const Plant = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M0 0 q-14-18-6-38 q8 12 6 38 M0 0 q4-26 18-34 q2 18-18 34 M0 0 q-22-6-26-24 q16 2 26 24 M0 0 q16-8 26-4 q-10 10-26 4" fill="#3f8c57" />
  <path d="M-8 0 h16 l-3 16 h-10Z" fill="#e8e3da" />
</g>
const Sofa = ({ x, y, w, color, cushion }: { x: number; y: number; w: number; color: string; cushion: string }) => <g>
  <rect x={x} y={y} width={w} height="22" rx="5" fill={color} /><rect x={x - 6} y={y + 10} width={w + 12} height="22" rx="5" fill={color} />
  <rect x={x + 8} y={y + 4} width="18" height="14" rx="3" fill={cushion} /><rect x={x + w - 26} y={y + 4} width="18" height="14" rx="3" fill={cushion} />
  <rect x={x + w / 2 - 9} y={y + 4} width="18" height="14" rx="3" fill="#e9edf1" />
</g>

const scenes: Record<Scene, ReactNode> = {
  villa: <><Sky id="s-villa" />
    <rect x="28" y="62" width="150" height="62" fill="#f4f6f7" /><rect x="80" y="38" width="112" height="32" fill="#fbfcfc" /><rect x="76" y="34" width="120" height="6" fill="#dfe4e8" />
    <rect x="90" y="46" width="34" height="18" fill="#2d3e4f" /><rect x="132" y="46" width="48" height="18" fill="#35485b" /><path d="M132 55 H180" stroke="#9db3c6" strokeWidth="1" />
    <rect x="40" y="80" width="30" height="34" fill="#263645" /><rect x="78" y="80" width="56" height="34" fill="#2f4254" /><rect x="142" y="80" width="26" height="34" fill="#263645" />
    <rect x="178" y="70" width="40" height="54" fill="#e9edf0" /><rect x="186" y="84" width="24" height="26" fill="#30465a" />
    <rect x="0" y="118" width="240" height="12" fill="#e6e1d8" /><Pool y={128} /></>,
  'palm-villa': <><Sky id="s-palm" top="#2f7fd8" bottom="#d6ebfb" />
    <rect x="20" y="58" width="132" height="64" fill="#f7f8f8" /><rect x="14" y="52" width="144" height="7" fill="#e3e7ea" />
    <rect x="34" y="72" width="104" height="44" fill="#22303d" /><path d="M60 72 V116 M86 72 V116 M112 72 V116" stroke="#8a9aa8" strokeWidth="1.5" />
    <path d="M0 122 L160 116 L240 128 V170 H0Z" fill="#cfc8bd" /><path d="M0 140 L120 132 L130 170 H0Z" fill="#3cc0da" /><path d="M10 148 q12-4 24 0 t24 0" stroke="#c9f4fb" strokeWidth="2" fill="none" />
    <path d="M206 170 V70" stroke="#6a5a3e" strokeWidth="6" /><path d="M206 72 q-30-6-46 10 M206 72 q-24-24-48-22 M206 72 q8-30 30-36 M206 72 q30-6 40 14 M206 72 q-6-34-24-44" stroke="#2f7a3c" strokeWidth="9" fill="none" strokeLinecap="round" />
    <ellipse cx="190" cy="140" rx="40" ry="30" fill="#2e6e35" /><ellipse cx="226" cy="128" rx="26" ry="34" fill="#3b8743" /></>,
  'gallery-lounge': <Room wall="#ece8e1" floor="#c9c1b5">
    <rect x="12" y="24" width="40" height="64" fill="#f8fafb" stroke="#d8d4cc" strokeWidth="3" /><rect x="188" y="24" width="40" height="64" fill="#f8fafb" stroke="#d8d4cc" strokeWidth="3" />
    <rect x="88" y="22" width="64" height="62" fill="#f4f1ec" stroke="#cdbfa8" strokeWidth="2" />
    <circle cx="108" cy="44" r="12" fill="#3a8fb3" opacity=".8" /><circle cx="128" cy="58" r="14" fill="#7cc3d4" opacity=".8" /><circle cx="114" cy="66" r="9" fill="#1f5b86" opacity=".7" /><path d="M96 74 q20-12 48-4" stroke="#2c6b8a" strokeWidth="2" fill="none" />
    <path d="M32 96 h14 l-4-14 h-6Z" fill="#f2efe8" /><rect x="38" y="96" width="2" height="22" fill="#9a8f80" /><path d="M196 96 h14 l-4-14 h-6Z" fill="#f2efe8" /><rect x="202" y="96" width="2" height="22" fill="#9a8f80" />
    <Sofa x={62} y={104} w={116} color="#e9e6e0" cushion="#1f3552" /><rect x="80" y={112} width="16" height="12" rx="3" fill="#7f8da0" /><rect x="144" y={112} width="16" height="12" rx="3" fill="#7f8da0" />
    <path d="M104 150 q-8-8 0-16 q8 8 0 16Z M136 150 q-8-8 0-16 q8 8 0 16Z" fill="#2a8fb8" /><rect x="86" y="148" width="68" height="6" rx="3" fill="#b9b0a2" />
  </Room>,
  'bright-lounge': <Room wall="#f1ece4" floor="#c8945f">
    <path d="M0 128 L240 128" stroke="#a87a4b" /><path d="M10 140 l20 10 M40 140 l20 10 M70 140 l20 10 M100 140 l20 10 M130 140 l20 10 M160 140 l20 10 M190 140 l20 10 M20 156 l20 10 M60 156 l20 10 M100 156 l20 10 M140 156 l20 10 M180 156 l20 10" stroke="#a97646" strokeWidth="1.5" />
    <rect x="70" y="20" width="76" height="70" fill="#fafbfb" stroke="#ddd5c8" strokeWidth="3" /><path d="M108 20 V90 M70 55 H146" stroke="#ddd5c8" strokeWidth="2" />
    <path d="M150 16 q6 40 0 82 h18 q-6-40 0-82Z" fill="#e3ddd2" /><path d="M154 22 v72 M160 22 v72" stroke="#cfc6b6" />
    <rect x="152" y="104" width="88" height="24" rx="2" fill="#fbfbfa" /><rect x="214" y="40" width="26" height="50" fill="#2b2d33" />
    <path d="M10 98 q2-14 22-14 q22 0 24 14 v26 h-46Z" fill="#1f4f9a" /><rect x="6" y="104" width="54" height="18" rx="6" fill="#2a5fb0" />
    <path d="M58 120 h14 v-26" stroke="#2c2c2c" strokeWidth="2" fill="none" /><ellipse cx="72" cy="92" rx="9" ry="4" fill="#f2efe8" />
    <Plant x={172} y={104} s={.6} /><Plant x={196} y={104} s={.8} />
  </Room>,
  'red-chair': <Room wall="#ede7df" floor="#b98d64">
    <rect x="150" y="10" width="76" height="98" fill="#e4ecf2" stroke="#d2c8bb" strokeWidth="3" /><path d="M188 10 V108" stroke="#d2c8bb" strokeWidth="2" /><rect x="164" y="24" width="20" height="30" fill="#d07b62" opacity=".55" /><rect x="196" y="20" width="18" height="40" fill="#c99a6c" opacity=".55" />
    <path d="M136 6 q6 50 0 116 h14 q-4-60 0-116Z" fill="#b4b7bb" />
    <rect x="34" y="28" width="30" height="40" fill="#f6efe2" stroke="#2f2f2f" strokeWidth="2" /><path d="M40 56 l8-14 l8 14Z" fill="#c3413a" /><rect x="74" y="34" width="24" height="30" fill="#f6efe2" stroke="#2f2f2f" strokeWidth="2" /><circle cx="86" cy="49" r="7" fill="#d36b4d" />
    <path d="M86 96 q2-16 20-16 q20 0 22 16 v28 h-42Z" fill="#c9272d" /><rect x="80" y="104" width="54" height="20" rx="7" fill="#d93136" /><path d="M90 124 v12 M126 124 v12" stroke="#5a3a2a" strokeWidth="3" />
    <rect x="20" y="100" width="44" height="28" fill="#f5f2ec" /><Plant x={42} y={100} s={.5} />
  </Room>,
  'plant-lounge': <Room wall="#f3efe8" floor="#d1c2ad">
    <rect x="8" y="14" width="64" height="112" fill="#faf8f4" stroke="#e1d9cc" strokeWidth="2" /><path d="M8 42 H72 M8 70 H72 M8 98 H72" stroke="#e1d9cc" strokeWidth="3" />
    <rect x="14" y="26" width="8" height="16" fill="#8a6a4a" /><rect x="24" y="30" width="6" height="12" fill="#c5a27c" /><rect x="40" y="56" width="20" height="14" fill="#9fb5a5" /><rect x="16" y="84" width="10" height="14" fill="#6f8b9f" /><Plant x={50} y={42} s={.35} /><Plant x={22} y={126} s={.5} />
    <rect x="96" y="12" width="78" height="80" fill="#f9fbfc" stroke="#e0d8ca" strokeWidth="3" /><path d="M135 12 V92" stroke="#e0d8ca" strokeWidth="2" />
    <Sofa x={84} y={104} w={110} color="#b7b0a5" cushion="#8f8577" /><rect x="116" y="146" width="56" height="8" rx="4" fill="#9c7b58" />
    <Plant x={214} y={128} s={1.4} />
  </Room>,
  loft: <Room wall="#3a3f47" floor="#5b4a3e">
    <rect x="20" y="14" width="200" height="98" fill="#9cc7e6" /><path d="M20 112 V80 h18 v-20 h14 v34 h12 V54 h20 v58 M100 112 V70 h16 v-14 h10 v56 M140 112 V62 h22 v50 M170 112 V76 h14 v-20 h16 v56 h20" fill="#5d7f9b" />
    <path d="M86 14 V112 M153 14 V112 M20 63 H220" stroke="#272a30" strokeWidth="3" /><Sofa x={60} y={116} w={120} color="#c4b49f" cushion="#e0874a" />
  </Room>,
  'garden-house': <><Sky id="s-garden" top="#5aa0e8" bottom="#e1f0fb" />
    <path d="M50 70 L120 30 L190 70Z" fill="#7d4e3a" /><rect x="60" y="70" width="120" height="58" fill="#f2ece2" /><rect x="76" y="84" width="22" height="22" fill="#3d5468" /><rect x="142" y="84" width="22" height="22" fill="#3d5468" /><rect x="110" y="96" width="20" height="32" fill="#6a4535" />
    <rect y="124" width="240" height="46" fill="#5fa54e" /><ellipse cx="30" cy="118" rx="28" ry="26" fill="#3f8a3c" /><ellipse cx="214" cy="112" rx="30" ry="32" fill="#468f40" /><path d="M110 128 l-14 42 h48 l-14-42Z" fill="#d8cdb8" /></>,
  studio: <Room wall="#e8eef2" floor="#c3a888">
    <rect x="150" y="18" width="70" height="80" fill="#f8fbfd" stroke="#d5dde2" strokeWidth="3" /><rect x="20" y="96" width="110" height="32" rx="4" fill="#f4f4f2" /><rect x="20" y="88" width="34" height="14" rx="4" fill="#9fc3db" /><rect x="14" y="56" width="10" height="72" fill="#7a6250" />
    <rect x="160" y="104" width="50" height="6" fill="#8b6b4f" /><path d="M166 110 v18 M204 110 v18" stroke="#8b6b4f" strokeWidth="3" /><Plant x={186} y={104} s={.45} />
  </Room>,
}

export function SceneArt({ scene, title }: { scene: Scene; title: string }) {
  return <svg className="ad-scene" viewBox="0 0 240 170" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Illustration: ${title}`}>{scenes[scene]}</svg>
}
