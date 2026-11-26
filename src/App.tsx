import { useState } from 'react'
import { roleIntros, rounds } from './data/shared'
import { roles } from './data/roles'
import { recordPlay } from './engine/collection'
import { decideOutcome, newSharedGame, resolveRound } from './engine/shared'
import type { SharedGame } from './engine/shared'
import ReportScreen from './screens/ReportScreen'
import RoleDrawScreen from './screens/RoleDrawScreen'
import RoundScreen from './screens/RoundScreen'
import SharedEventScreen from './screens/SharedEventScreen'
import StartScreen from './screens/StartScreen'
import StoryScreen from './screens/StoryScreen'

type Screen = 'start' | 'draw' | 'story' | 'event' | 'round' | 'report'

/**
 * 期末版：一件共同事件 × 四位角色 × 四輪決策 × 影響報告（簡報第 8～10、20 頁）。
 * 玩家抽到其中一個角色，其他三位由規則回應。
 * 較早的單人事件版與兩兩對話版（data/ 與 screens/ 內的其他檔案）仍保留在專案中，目前不使用。
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [game, setGame] = useState<SharedGame | null>(null)
  const [round, setRound] = useState(0)
  const [progress, setProgress] = useState<{ roles: string[]; outcomes: string[] }>({ roles: [], outcomes: [] })

  const role = roles.find((r) => r.id === game?.roleId) ?? roles[0]
  const actor = roles.find((r) => r.id === rounds[round].roleId) ?? roles[0]
  const entry = game?.history.find((h) => h.roundIndex === round)

  /** 進入某一輪：輪到電腦角色時，由規則立刻決定。 */
  const enter = (g: SharedGame, i: number) => {
    const next = rounds[i].roleId === g.roleId ? g : resolveRound(g, i)
    setGame(next)
    setRound(i)
    setScreen('round')
  }

  const begin = (roleId: string) => {
    setGame(newSharedGame(roleId))
    setRound(0)
    setScreen('story')
  }

  const pick = (i: 0 | 1 | 2) => game && setGame(resolveRound(game, round, i))

  const next = () => {
    if (!game) return
    if (round >= rounds.length - 1) {
      setProgress(recordPlay(game.roleId, decideOutcome(game.state).id))
      setScreen('report')
    } else enter(game, round + 1)
  }

  return (
    <main className="app">
      {screen === 'start' && <StartScreen onStart={() => setScreen('draw')} />}
      {screen === 'draw' && <RoleDrawScreen onStart={begin} />}
      {screen === 'story' && game && <StoryScreen role={role} intro={roleIntros[role.id]} onContinue={() => setScreen('event')} />}
      {screen === 'event' && game && <SharedEventScreen state={game.state} onContinue={() => enter(game, 0)} />}
      {screen === 'round' && game && (
        <RoundScreen key={`${round}-${entry ? 1 : 0}`} roundIndex={round} player={role} actor={actor} state={game.state} entry={entry} onPick={pick} onNext={next} />
      )}
      {screen === 'report' && game && (
        <ReportScreen
          role={role}
          game={game}
          progress={progress}
          onRestart={() => {
            setGame(null)
            setScreen('draw')
          }}
        />
      )}
    </main>
  )
}
