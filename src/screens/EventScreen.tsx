import { useState } from 'react'
import DialogBox from '../components/DialogBox'
import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import type { DayStory, Role, Stats } from '../types'

/** 共同事件頁：每天一件大家都會遇到的事，並告訴玩家今天會跟誰聊。 */
export default function EventScreen({
  player,
  npc,
  story,
  total,
  stats,
  onContinue,
}: {
  player: Role
  npc: Role
  story: DayStory
  total: number
  stats: Stats
  onContinue: () => void
}) {
  const [ready, setReady] = useState(false)
  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">
          DAY {story.day} / {total}
        </span>
        <span>{story.title}</span>
      </div>
      <Meters stats={stats} />
      <Scene>
        <div className="duo">
          <PixelCharacter look={player.look} size={64} />
          <PixelCharacter look={npc.look} size={64} />
        </div>
      </Scene>
      <DialogBox key={story.day} speaker="今天的事" text={story.narration} onFinish={() => setReady(true)} />
      <button type="button" className="btn btn-primary" onClick={onContinue} disabled={!ready}>
        去找{npc.name}聊聊
      </button>
      <p className="note">{!ready && '點對話框可以直接顯示全文。'}</p>
    </div>
  )
}
