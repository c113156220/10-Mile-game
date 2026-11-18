import { useState } from 'react'
import { farmerDays, farmerIntro } from './data/farmer'
import { roles } from './data/roles'
import { applyOption, currentEvent, decideEnding, isLastDay, newGame, nextDay } from './engine/game'
import type { GameState } from './engine/game'
import ChoiceScreen from './screens/ChoiceScreen'
import EndingScreen from './screens/EndingScreen'
import RoleDrawScreen from './screens/RoleDrawScreen'
import StartScreen from './screens/StartScreen'
import StoryScreen from './screens/StoryScreen'
import type { Option } from './types'

type Screen = 'start' | 'draw' | 'story' | 'play' | 'ending'

/** 目前只有小農有劇情資料。新增角色時，在這裡依 roleId 對應該角色的資料。 */
const scripts: Record<string, { days: typeof farmerDays; intro: string }> = {
  farmer: { days: farmerDays, intro: farmerIntro },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [state, setState] = useState<GameState | null>(null)
  const [chosen, setChosen] = useState<Option | null>(null)

  const role = roles.find((r) => r.id === state?.roleId) ?? roles[0]
  const script = scripts[role.id]

  const begin = (roleId: string) => {
    setState(newGame(roleId, scripts[roleId].days))
    setChosen(null)
    setScreen('story')
  }

  const pick = (o: Option) => {
    if (!state) return
    setState(applyOption(state, o))
    setChosen(o)
  }

  const next = () => {
    if (!state) return
    setChosen(null)
    if (isLastDay(state)) setScreen('ending')
    else setState(nextDay(state))
  }

  const restart = () => {
    setState(null)
    setChosen(null)
    setScreen('draw')
  }

  return (
    <main className="app">
      {screen === 'start' && <StartScreen onStart={() => setScreen('draw')} />}
      {screen === 'draw' && <RoleDrawScreen onStart={begin} />}
      {screen === 'story' && state && (
        <StoryScreen role={role} intro={script.intro} onContinue={() => setScreen('play')} />
      )}
      {screen === 'play' && state && currentEvent(state) && (
        <ChoiceScreen
          role={role}
          state={state}
          total={state.events.length}
          chosen={chosen}
          isLast={isLastDay(state)}
          onPick={pick}
          onNext={next}
        />
      )}
      {screen === 'ending' && state && (
        <EndingScreen role={role} ending={decideEnding(state.stats)} stats={state.stats} onRestart={restart} />
      )}
    </main>
  )
}
