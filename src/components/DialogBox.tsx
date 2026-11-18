import { useEffect } from 'react'
import { useTypewriter } from './useTypewriter'

interface Props {
  speaker?: string
  text: string
  /** 文字全部出現後呼叫（例如這時才顯示選項） */
  onFinish?: () => void
}

/** RPG 風格對話框：文字逐步出現，點一下可以直接顯示全文。 */
export default function DialogBox({ speaker, text, onFinish }: Props) {
  const { shown, done, skip } = useTypewriter(text)
  useEffect(() => {
    if (done && text) onFinish?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, text])
  return (
    <button type="button" className="panel dialog" onClick={skip} aria-live="polite">
      {speaker && <span className="dialog-speaker">{speaker}</span>}
      <span className="dialog-text">{shown}</span>
      {done && <span className="dialog-caret">▼</span>}
    </button>
  )
}
