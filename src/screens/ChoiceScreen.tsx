import { useEffect, useState } from 'react'
import DialogBox from '../components/DialogBox'
import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import { statBands } from '../engine/game'
import type { GameState } from '../engine/game'
import { textProvider } from '../engine/textProvider'
import type { Option, Role, TextResponse } from '../types'
import { STAT_KEYS } from '../types'

interface Props {
  role: Role
  state: GameState
  total: number
  onPick: (option: Option) => void
  /** 選完、看完影響後按「繼續」 */
  onNext: () => void
  isLast: boolean
  /** 目前已選的選項（選完後顯示影響） */
  chosen: Option | null
}

/** 情境選擇頁：顯示當天事件與三個選項，選完後顯示這個選擇的影響。 */
export default function ChoiceScreen({ role, state, total, onPick, onNext, isLast, chosen }: Props) {
  const ev = state.events[state.dayIndex]
  const [text, setText] = useState<TextResponse | null>(null)
  const [ready, setReady] = useState(false)

  // 取得當天文字。第一版 provider 直接回傳固定版；失敗時一律退回固定版。
  useEffect(() => {
    let cancelled = false
    setText(null)
    setReady(false)
    const fallback: TextResponse = {
      situation: ev.situation,
      options: ev.options.map((o) => ({ id: o.id, text: o.text })),
    }
    textProvider
      .getEventText({
        roleId: role.id,
        day: state.dayIndex + 1,
        eventId: ev.id,
        situation: ev.situation,
        options: ev.options.map((o) => ({ id: o.id, text: o.text, intent: o.intent })),
        statBands: statBands(state.stats),
        history: state.history.map((h) => `第${h.day}天 ${h.eventId} 選了 ${h.optionId}`),
      })
      .then((r) => !cancelled && setText(r))
      .catch(() => !cancelled && setText(fallback))
    return () => {
      cancelled = true
    }
    // 只在換天時重新取得
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dayIndex, ev.id])

  const optionText = (o: Option) => text?.options.find((t) => t.id === o.id)?.text ?? o.text

  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">DAY {state.dayIndex + 1} / {total}</span>
        <span>{ev.title}</span>
      </div>
      <Meters stats={state.stats} deltas={chosen ? chosen.effect : undefined} />
      <Scene>
        <PixelCharacter look={role.look} size={72} />
      </Scene>

      {chosen ? (
        <>
          <div className="option chosen">
            <span className="option-id">{chosen.id}</span>
            <span className="option-text">{optionText(chosen)}</span>
          </div>
          <div className="panel result">
            <div className="result-title">這個選擇之後</div>
            <p>{chosen.result}</p>
            <p className="note">
              有得有失：
              {STAT_KEYS.filter((k) => chosen.effect[k] > 0).length > 0 ? '有一項變多，' : ''}
              也有一項付出了代價。
            </p>
          </div>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            {isLast ? '看我的結局' : '繼續下一天'}
          </button>
        </>
      ) : (
        <>
          {text ? (
            <DialogBox text={text.situation} onFinish={() => setReady(true)} />
          ) : (
            <div className="panel dialog">…</div>
          )}
          <div className="options" aria-disabled={!ready}>
            {ev.options.map((o) => (
              <button
                key={o.id}
                type="button"
                className="option"
                disabled={!ready}
                onClick={() => onPick(o)}
              >
                <span className="option-id">{o.id}</span>
                <span className="option-text">{optionText(o)}</span>
              </button>
            ))}
          </div>
          <p className="note">三個選項都有得有失，只能點選。{!ready && '（文字出現後可選擇，點對話框可跳過）'}</p>
        </>
      )}
    </div>
  )
}
