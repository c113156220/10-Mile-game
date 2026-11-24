import { useState } from 'react'
import { scripts } from './data/scripts'
import { roles } from './data/roles'
import { dialogues } from './data/dialogues'
import { endingFor } from './data/roleTexts'
import { applyEffect, applyOption, currentEvent, decideEnding, isLastDay, newGame, nextDay } from './engine/game'
import type { GameState } from './engine/game'
import ChoiceScreen from './screens/ChoiceScreen'
import DialogueScreen from './screens/DialogueScreen'
import EndingScreen from './screens/EndingScreen'
import RoleDrawScreen from './screens/RoleDrawScreen'
import StartScreen from './screens/StartScreen'
import StoryScreen from './screens/StoryScreen'
import type { Option } from './types'

type Screen = 'start' | 'draw' | 'story' | 'play' | 'dialogue' | 'ending'

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

  const advance = () => {
    if (!state) return
    setChosen(null)
    if (isLastDay(state)) setScreen('ending')
    else {
      setState(nextDay(state))
      setScreen('play')
    }
  }

  // 選完事件後，如果這個事件有對話，先進入對話頁，再前進到下一天
  const next = () => {
    if (!state) return
    if (dialogues[currentEvent(state).id]) setScreen('dialogue')
    else advance()
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
          talkTo={
            dialogues[currentEvent(state).id]
              ? (roles.find((r) => r.id === dialogues[currentEvent(state).id].npcRoleId)?.name ?? null)
              : null
          }
          onPick={pick}
          onNext={next}
        />
      )}
      {screen === 'dialogue' && state && dialogues[currentEvent(state).id] && (
        <DialogueScreen
          player={role}
          npc={roles.find((r) => r.id === dialogues[currentEvent(state).id].npcRoleId) ?? roles[1]}
          dialogue={dialogues[currentEvent(state).id]}
          stats={state.stats}
          eventTitle={currentEvent(state).title}
          onEffect={(eff) => setState((s) => (s ? applyEffect(s, eff) : s))}
          onFinish={advance}
        />
      )}
      {screen === 'ending' && state && (
        <EndingScreen role={role} ending={endingFor(role.id, decideEnding(state.stats))} stats={state.stats} onRestart={restart} />
      )}
    </main>
  )
}
