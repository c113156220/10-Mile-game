import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import type { Ending, Role, Stats } from '../types'

// ⚠ 連結需和合作社確認後再公開使用
const COOP_URL = 'https://linktr.ee/coop4s.hsinchu'

export default function EndingScreen({
  role,
  ending,
  stats,
  onRestart,
}: {
  role: Role
  ending: Ending
  stats: Stats
  onRestart: () => void
}) {
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
