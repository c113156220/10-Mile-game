import { useCallback, useEffect, useState } from 'react'

/** 逐字顯示文字。skip() 會直接顯示全文。 */
export function useTypewriter(text: string, speed = 28) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    if (!text) return
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, speed])

  const skip = useCallback(() => setCount(text.length), [text])
  return { shown: text.slice(0, count), done: count >= text.length, skip }
}
