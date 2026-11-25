import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import { groupTexts, peopleTexts } from '../data/peopleTexts'
import { roles } from '../data/roles'
import { STAT_KEYS } from '../types'
import type { Ending, Role, Stats } from '../types'

/** 把一組數值轉成兩句話：最高的一項、最低的一項。 */
function describe(roleId: string, stats: Stats): string {
  const t = peopleTexts[roleId]
  if (!t) return ''
  const hi = STAT_KEYS.reduce((a, k) => (stats[k] > stats[a] ? k : a), STAT_KEYS[0])
  const lo = STAT_KEYS.reduce((a, k) => (stats[k] < stats[a] ? k : a), STAT_KEYS[0])
  if (stats[hi] === stats[lo]) return '這一週沒有太大的起伏。'
  return `${t[hi].high}${t[lo].low}`
}

// ⚠ 連結需和合作社確認後再公開使用
const COOP_URL = 'https://linktr.ee/coop4s.hsinchu'

export default function EndingScreen({
  role,
  ending,
  stats,
  others,
  onRestart,
}: {
  role: Role
  ending: Ending
  stats: Stats
  others: Record<string, Stats>
  onRestart: () => void
}) {
  // 只顯示這週玩家有聊到的角色，加上玩家自己
  const people = [{ role, stats, you: true }, ...Object.entries(others).map(([id, st]) => ({ role: roles.find((r) => r.id === id)!, stats: st, you: false }))]
  const avgCommunity = people.reduce((a, p) => a + p.stats.community, 0) / people.length
  const group = avgCommunity >= 6.5 ? groupTexts.close : avgCommunity <= 4.5 ? groupTexts.apart : groupTexts.middle
  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">ENDING</span>
        <span>{role.name}的一週</span>
      </div>
      <Scene>
        <PixelCharacter look={role.look} size={72} />
      </Scene>
      <div className="panel ending-card">
        <div className="ending-title">{ending.title}</div>
        <p className="ending-story">{ending.story}</p>
        <p className="note">每個選擇都有得有失，沒有標準答案。</p>
      </div>
      <Meters stats={stats} />
      <div className="panel ending-card">
        <div className="ending-title">這一週，大家過得怎麼樣</div>
        {people.map((p) => (
          <p key={p.role.id} className="ending-story">
            <strong>{p.you ? `你（${p.role.name}）` : p.role.name}</strong>：{describe(p.role.id, p.stats)}
          </p>
        ))}
        <p className="note">{group}</p>
      </div>
      <div className="share-slot">分享卡（預留：之後可產生故事卡圖片）</div>
      <button type="button" className="btn btn-primary" onClick={onRestart}>
        重新遊玩
      </button>
      <a className="btn btn-secondary" href={COOP_URL} target="_blank" rel="noreferrer">
        認識十里方圓
      </a>
      <p className="note">本遊戲的角色、事件與數值皆為虛構模擬，並非合作社真實發生的事。</p>
    </div>
  )
}
