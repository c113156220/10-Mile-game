import { useMemo, useState } from 'react'
import DialogBox from '../components/DialogBox'
import Meters from '../components/Meters'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import type { DayStory, PairDialogue, PairReply, Role, Stats } from '../types'

interface Props {
  player: Role
  npc: Role
  pair: PairDialogue
  playerIsAsker: boolean
  story: DayStory
  stats: Stats
  /** 玩家這次對話造成的數值變化（只在玩家做出選擇時呼叫一次） */
  onEffect: (effect: Stats) => void
  onFinish: () => void
  isLast: boolean
}

const pickRandom = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]

/**
 * 兩兩對話頁。
 * - 玩家是提問者：自己選問題，對方的回覆隨機抽一個。
 * - 玩家是回覆者：對方的問題隨機抽一個，自己選回覆。
 * 目前內容是事先寫好的；日後可換成 AI，畫面與規則不用改。
 */
export default function PairTalkScreen({ player, npc, pair, playerIsAsker, story, stats, onEffect, onFinish, isLast }: Props) {
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  // 隨機抽到的問題（玩家是回覆者時）
  const randomQuestion = useMemo(() => pickRandom(pair.questions), [pair])
  const [result, setResult] = useState<{ youSaid: string; theySaid: string; deltas: Stats } | null>(null)

  const chooseQuestion = (qi: number) => {
    const q = pair.questions[qi]
    const reply: PairReply = pickRandom(q.replies)
    setResult({ youSaid: q.text, theySaid: reply.text, deltas: reply.askerEffect })
    setDone(false)
    onEffect(reply.askerEffect)
  }

  const chooseReply = (reply: PairReply) => {
    setResult({ youSaid: reply.text, theySaid: '', deltas: reply.replierEffect })
    setDone(true)
    onEffect(reply.replierEffect)
  }

  return (
    <div className="screen">
      <div className="topbar">
        <span className="pixel-font">TALK</span>
        <span>{story.title}</span>
      </div>
      <Meters stats={stats} deltas={result ? result.deltas : undefined} />
      <Scene>
        <div className="duo">
          <PixelCharacter look={player.look} size={64} />
          <PixelCharacter look={npc.look} size={64} />
        </div>
      </Scene>

      {!result && playerIsAsker && (
        <>
          <DialogBox key="ask" speaker={player.name} text={`我想問問${npc.name}…`} onFinish={() => setReady(true)} />
          <div className="options">
            {pair.questions.map((q, i) => (
              <button key={i} type="button" className="option" disabled={!ready} onClick={() => chooseQuestion(i)}>
                <span className="option-id">{'ABC'[i]}</span>
                <span className="option-text">{q.text}</span>
              </button>
            ))}
          </div>
          <p className="note">選一個問題。對方會怎麼回，每次可能不一樣。</p>
        </>
      )}

      {!result && !playerIsAsker && (
        <>
          <DialogBox key="q" speaker={npc.name} text={randomQuestion.text} onFinish={() => setReady(true)} />
          <div className="options">
            {randomQuestion.replies.map((r) => (
              <button key={r.id} type="button" className="option" disabled={!ready} onClick={() => chooseReply(r)}>
                <span className="option-id">{r.id}</span>
                <span className="option-text">{r.text}</span>
              </button>
            ))}
          </div>
          <p className="note">選一句話回應。{!ready && '（點對話框可跳過）'}</p>
        </>
      )}

      {result && (
        <>
          <div className="option chosen">
            <span className="option-id">你</span>
            <span className="option-text">{result.youSaid}</span>
          </div>
          {playerIsAsker && (
            <DialogBox key="reply" speaker={npc.name} text={result.theySaid} onFinish={() => setDone(true)} />
          )}
          <button type="button" className="btn btn-primary" onClick={onFinish} disabled={!done}>
            {isLast ? '看這一週的結果' : '繼續，下一天'}
          </button>
        </>
      )}
    </div>
  )
}
