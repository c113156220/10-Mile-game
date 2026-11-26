import { useEffect, useRef, useState } from 'react'
import PixelCharacter from '../components/PixelCharacter'
import { roles } from '../data/roles'

type Phase = 'idle' | 'drawing' | 'done'

/** 角色抽取頁：有抽籤動畫。從所有可玩角色中隨機抽一個。 */
export default function RoleDrawScreen({ onStart }: { onStart: (roleId: string) => void }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [active, setActive] = useState(0)
  const timer = useRef<number | undefined>(undefined)

  const playable = roles.filter((r) => r.playable)
  // 抽中的角色在按下按鈕時才決定，之後保持不變
  const [picked, setPicked] = useState(playable[0])

  useEffect(() => () => window.clearInterval(timer.current), [])

  const draw = () => {
    const result = playable[Math.floor(Math.random() * playable.length)]
    setPicked(result)
    setPhase('drawing')
    let ticks = 0
    timer.current = window.setInterval(() => {
      ticks++
      setActive((a) => (a + 1) % roles.length)
      if (ticks >= 16) {
        window.clearInterval(timer.current)
        setActive(roles.findIndex((r) => r.id === result.id))
        setPhase('done')
      }
    }, 110)
  }

  return (
    <div className="screen">
      <h2 className="h2">抽取你的角色</h2>
      <div className="role-grid">
        {roles.map((r, i) => (
          <div key={r.id} className={`role-chip${i === active && phase !== 'idle' ? ' active' : ''}`}>
            <PixelCharacter look={r.look} size={40} />
            <span>{r.name}</span>
          </div>
        ))}
      </div>

      {phase === 'done' ? (
        <div className="panel role-card">
          <PixelCharacter look={picked.look} size={80} />
          <div>
            <div className="role-name">{picked.name}</div>
            <div className="role-tagline">{picked.tagline}</div>
            <p className="role-bg">{picked.background}</p>
          </div>
        </div>
      ) : (
        <p className="note">
          {phase === 'drawing' ? '抽取中…' : '按下按鈕，從小農、經營者、消費者、社員中隨機抽一個身分。'}
        </p>
      )}

      {phase === 'done' ? (
        <button type="button" className="btn btn-primary" onClick={() => onStart(picked.id)}>
          開始我的人生
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={draw} disabled={phase === 'drawing'}>
          抽取角色
        </button>
      )}
    </div>
  )
}
