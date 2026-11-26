import { useState } from 'react'
import DialogBox from '../components/DialogBox'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import SharedMeters from '../components/SharedMeters'
import { rounds } from '../data/shared'
import type { SState } from '../data/shared'
import type { HistoryEntry } from '../engine/shared'
import type { Role } from '../types'

interface Props {
  roundIndex: number
  player: Role
  actor: Role
  state: SState
  /** 這一輪已結算時才有值 */
  entry?: HistoryEntry
  onPick: (i: 0 | 1 | 2) => void
  onNext: () => void
}

/**
 * 一輪決策。輪到玩家時由玩家選；其他角色由規則決定，結果直接顯示。
 * 之後可把「規則決定」換成 AI 角色，畫面與狀態不用改。
 */
export default function RoundScreen({ roundIndex, player, actor, state, entry, onPick, onNext }: Props) {
  const round = rounds[roundIndex]
  const [ready, setReady] = useState(false)
  const isLast = roundIndex === rounds.length - 1
  const chosen = entry ? round.options[entry.optionIndex] : null

  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">
          ROUND {roundIndex + 1} / {rounds.length}
        </span>
        <span>
          {actor.name}・{round.title}
        </span>
      </div>
      <SharedMeters state={state} deltas={chosen?.effect} />
      <Scene>
        <div className="duo">
          <PixelCharacter look={actor.look} size={64} />
          {actor.id !== player.id && <PixelCharacter look={player.look} size={40} />}
        </div>
      </Scene>

      {!entry && (
        <>
          <DialogBox key={`p${roundIndex}`} speaker={`輪到你：${actor.name}`} text={round.prompt} onFinish={() => setReady(true)} />
          <div className="options">
            {round.options.map((o, i) => (
              <button key={o.id} type="button" className="option" disabled={!ready} onClick={() => onPick(i as 0 | 1 | 2)}>
                <span className="option-id">{o.id}</span>
                <span className="option-text">{o.text}</span>
              </button>
            ))}
          </div>
          <p className="note">
            你在乎的是「{round.stake}」。選擇會改變供貨、交期、人力和信任。{!ready && '（點對話框可跳過）'}
          </p>
        </>
      )}

      {entry && chosen && (
        <>
          <DialogBox
            key={`r${roundIndex}`}
            speaker={entry.byPlayer ? `你（${actor.name}）` : actor.name}
            text={`「${chosen.text}」${chosen.result}`}
            onFinish={() => setReady(true)}
          />
          <button type="button" className="btn btn-primary" onClick={onNext} disabled={!ready}>
            {isLast ? '看影響報告' : '下一輪'}
          </button>
          <p className="note">{entry.byPlayer ? '這是你的決定。' : `${actor.name}依自己的立場做了決定。`}</p>
        </>
      )}
    </div>
  )
}
