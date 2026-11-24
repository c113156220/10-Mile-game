import { useState } from 'react'
import DialogBox from '../components/DialogBox'
import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import type { Dialogue, DialogueReply, Role, Stats } from '../types'

interface Props {
  player: Role
  npc: Role
  dialogue: Dialogue
  stats: Stats
  eventTitle: string
  /** 玩家選了一句話之後，套用該回覆的數值變化 */
  onEffect: (effect: Stats) => void
  onFinish: () => void
}

/**
 * 角色對話頁（試點）：最多 3 輪，每輪角色先說一句，玩家從三句話裡選一句，角色回應。
 * 目前回應是事先寫好的；日後可換成後端 AI，畫面與輪數規則不用改。
 */
export default function DialogueScreen({ player, npc, dialogue, stats, eventTitle, onEffect, onFinish }: Props) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState<DialogueReply | null>(null)
  const [ready, setReady] = useState(false)
  const [replyDone, setReplyDone] = useState(false)

  const r = dialogue.rounds[round]
  const isLast = round >= dialogue.rounds.length - 1

  const pick = (rep: DialogueReply) => {
    setPicked(rep)
    setReplyDone(false)
    onEffect(rep.effect)
  }

  const next = () => {
    if (isLast) return onFinish()
    setRound(round + 1)
    setPicked(null)
    setReady(false)
    setReplyDone(false)
  }

  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">TALK {round + 1} / {dialogue.rounds.length}</span>
        <span>{eventTitle}</span>
      </div>
      <Meters stats={stats} deltas={picked ? picked.effect : undefined} />
      <Scene>
        <div className="duo">
          <PixelCharacter look={player.look} size={64} />
          <PixelCharacter look={npc.look} size={64} />
        </div>
      </Scene>

      {!picked ? (
        <>
          <DialogBox key={`n${round}`} speaker={npc.name} text={r.line} onFinish={() => setReady(true)} />
          <div className="options" aria-disabled={!ready}>
            {r.replies.map((rep) => (
              <button key={rep.id} type="button" className="option" disabled={!ready} onClick={() => pick(rep)}>
                <span className="option-id">{rep.id}</span>
                <span className="option-text">{rep.text}</span>
              </button>
            ))}
          </div>
          <p className="note">選一句話回應。{!ready && '（點對話框可跳過）'}</p>
        </>
      ) : (
        <>
          <div className="option chosen">
            <span className="option-id">{picked.id}</span>
            <span className="option-text">你：{picked.text}</span>
          </div>
          <DialogBox key={`r${round}`} speaker={npc.name} text={picked.reply} onFinish={() => setReplyDone(true)} />
          <button type="button" className="btn btn-primary" onClick={next} disabled={!replyDone}>
            {isLast ? '結束對話' : '繼續聊'}
          </button>
        </>
      )}
    </div>
  )
}
