import { useState } from 'react'
import DialogBox from '../components/DialogBox'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import SharedMeters from '../components/SharedMeters'
import { roles } from '../data/roles'
import { rounds, sharedEvent } from '../data/shared'
import type { SState } from '../data/shared'

/** 共同事件頁：先說明這一回合大家共同遇到的事，並預告四位角色的出場順序。 */
export default function SharedEventScreen({ state, onContinue }: { state: SState; onContinue: () => void }) {
  const [ready, setReady] = useState(false)
  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">EVENT</span>
        <span>{sharedEvent.title}</span>
      </div>
      <SharedMeters state={state} />
      <Scene>
        <div className="duo">
          {rounds.map((r) => (
            <PixelCharacter key={r.roleId} look={roles.find((x) => x.id === r.roleId)!.look} size={48} />
          ))}
        </div>
      </Scene>
      <DialogBox speaker="今天的事" text={sharedEvent.narration} onFinish={() => setReady(true)} />
      <button type="button" className="btn btn-primary" onClick={onContinue} disabled={!ready}>
        開始第一輪
      </button>
      <p className="note">四位角色會依序決定：小農、經營者、消費者、社員。{!ready && '（點對話框可跳過）'}</p>
    </div>
  )
}
