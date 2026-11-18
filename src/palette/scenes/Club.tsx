import {LayerHero} from '../scene-kit/LayerHero'
import manifest from '../scene-kit/layers/club.json'
import './club.css'

// Base Club, recreated from the reel shown by anthonyalxnder. The two avatars are rendered in Blender.
// Yellow Punk arrives as hand-drawn marks, the only vector artwork in the reference.

export default function Club({accent}: {accent: boolean}) {
  return <LayerHero scene="club" prefix="cb" accent={accent} manifest={manifest}>
    <h3 className="cb-word sk-rise"><span style={{left: 322, top: 202, width: 643}}>CLUB</span><span style={{left: 110, top: 356, width: 1056}}>SOCIALFI</span><span style={{left: 187, top: 506, width: 921}}>PEOPLE</span></h3>
    <header className="cb-nav sk-rise"><b><i>BASE</i>CLUB</b>{([['About Club', 437], ['Medals', 553], ['Tokenomics', 660], ['Airdrop', 790]] as const).map(([label, left]) => <span key={label} style={{left}}>{label}</span>)}<em>Connect wallet</em></header>
    <article className="cb-card cb-a"><img src="/palettes/club/avatar-punk.webp" alt=""/><b>basedpunk.eth</b><small>42 referrals</small></article>
    <article className="cb-card cb-b"><img src="/palettes/club/avatar-bear.webp" alt=""/><b>baseclub.eth</b><small>88 referrals</small></article>
    <svg className="cb-marks" viewBox="0 0 1280 891" aria-hidden="true">
      <path className="cb-m" pathLength={1} d="M278 170 258 300M326 168 304 298M238 216 346 198M226 266 334 248"/>
      <path className="cb-m" pathLength={1} d="M925 306C965 260 1060 280 1058 352 1055 425 975 468 908 450M908 450 958 410M908 450 966 482"/>
      <path className="cb-m" pathLength={1} d="M238 650C205 690 300 682 276 728 258 762 196 750 228 708 268 660 360 762 280 804M280 804 332 790M280 804 300 750"/>
    </svg>
    <div className="cb-badge"><svg viewBox="0 0 270 270" aria-hidden="true"><defs><path id="cb-ring" d="M135 135m-99 0a99 99 0 1 1 198 0a99 99 0 1 1-198 0"/></defs><circle cx="135" cy="135" r="133"/><text><textPath href="#cb-ring">GET STARTED FOR FREE · GET STARTED FOR FREE ·</textPath></text><path pathLength={1} d="M88 150c28-42 42 30 62-16 12-30-20-34-20 0 0 28 34 24 52-8m0 0-28 2m28-2 4 28"/></svg></div>
  </LayerHero>
}
