import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import SharedMeters from '../components/SharedMeters'
import { roles } from '../data/roles'
import { outcomes, roleReport, rounds, S_KEYS, S_LABELS, services } from '../data/shared'
import { decideOutcome, describeRole } from '../engine/shared'
import type { SharedGame } from '../engine/shared'
import type { Role } from '../types'

// ⚠ 連結需和合作社確認後再公開使用
const COOP_URL = 'https://linktr.ee/coop4s.hsinchu'

export default function ReportScreen({
  role,
  game,
  progress,
  onRestart,
}: {
  role: Role
  game: SharedGame
  progress: { roles: string[]; outcomes: string[] }
  onRestart: () => void
}) {
  const outcome = decideOutcome(game.state)
  const fxWords = (i: number, k: number) => {
    const e = rounds[i].options[k].effect
    return S_KEYS.filter((s) => e[s] !== 0)
      .map((s) => `${S_LABELS[s]}${e[s] > 0 ? '▲' : '▼'}`)
      .join(' ')
  }
  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">REPORT</span>
        <span>影響報告</span>
      </div>
      <Scene>
        <PixelCharacter look={role.look} size={72} />
      </Scene>
      <div className="panel ending-card">
        <div className="ending-title">{outcome.title}</div>
        <p className="ending-story">{outcome.story}</p>
        <p className="note">每個決定都有得有失，沒有標準答案。</p>
      </div>

      <SharedMeters state={game.state} />

      <div className="panel ending-card">
        <div className="ending-title">這一筆訂單，大家的處境</div>
        {rounds.map((r) => {
          const who = roles.find((x) => x.id === r.roleId)!
          return (
            <p className="ending-story" key={r.roleId}>
              <strong>{r.roleId === role.id ? `你（${who.name}）` : who.name}</strong>
              <span className="note">（{roleReport[r.roleId].stake}）</span>：{describeRole(r.roleId, game.state)}
            </p>
          )
        })}
      </div>

      <div className="panel ending-card">
        <div className="ending-title">每一輪發生了什麼</div>
        <ol className="timeline">
          {game.history.map((h) => {
            const who = roles.find((x) => x.id === h.roleId)!
            const o = rounds[h.roundIndex].options[h.optionIndex]
            return (
              <li key={h.roundIndex}>
                <span className="who">{h.byPlayer ? `你（${who.name}）` : who.name}</span>：{o.text}
                <br />
                <span className="fx">{fxWords(h.roundIndex, h.optionIndex)}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="panel ending-card">
        <div className="ending-title">你的圖鑑</div>
        <p className="ending-story">
          已體驗角色 {progress.roles.length} / {rounds.length}，已收集共同結果 {progress.outcomes.length} / {outcomes.length}。
          換個角色再玩，看看同一件事在別人身上是什麼感覺。
        </p>
      </div>

      <div className="panel ending-card">
        <div className="ending-title">這件事在真實的合作社裡</div>
        <ul className="service-list">
          {services.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>：{s.hint}
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="btn btn-primary" onClick={onRestart}>
        換個角色再玩
      </button>
      <a className="btn btn-secondary" href={COOP_URL} target="_blank" rel="noreferrer">
        認識十里方圓
      </a>
      <p className="note">本遊戲的角色、事件與數值皆為虛構模擬，並非合作社真實發生的事。</p>
    </div>
  )
}
