import { useState } from 'react'
import { dayStories, pairDialogues } from './data/pairs'
import { roles } from './data/roles'
import { endingFor } from './data/roleTexts'
import { scripts } from './data/scripts'
import { applyStoryEffect, decideEnding, newStoryGame, nextStoryDay } from './engine/game'
import type { StoryState } from './engine/game'
import EndingScreen from './screens/EndingScreen'
import EventScreen from './screens/EventScreen'
import PairTalkScreen from './screens/PairTalkScreen'
import RoleDrawScreen from './screens/RoleDrawScreen'
import StartScreen from './screens/StartScreen'
import StoryScreen from './screens/StoryScreen'

type Screen = 'start' | 'draw' | 'story' | 'event' | 'talk' | 'ending'

/**
 * 共同故事模式：每天一件全員都會遇到的事 + 與另一個角色的對話。
 * 原本的單人事件資料（data/farmer.ts、member.ts、consumer.ts、dialogues.ts）保留在專案中，目前不使用。
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [state, setState] = useState<StoryState | null>(null)

  const role = roles.find((r) => r.id === state?.roleId) ?? roles[0]
  const pair = state ? state.pairs[state.dayIndex] : null
  const playerIsAsker = !!pair && pair.asker === role.id
  const npc = pair ? (roles.find((r) => r.id === (playerIsAsker ? pair.replier : pair.asker)) ?? roles[1]) : roles[1]
  const story = state ? dayStories[state.dayIndex] : dayStories[0]
  const total = dayStories.length
  const isLast = !!state && state.dayIndex >= total - 1

  const begin = (roleId: string) => {
    setState(newStoryGame(roleId, pairDialogues, total))
    setScreen('story')
  }

  const finishDay = () => {
    if (!state) return
    if (isLast) setScreen('ending')
    else {
      setState(nextStoryDay(state))
      setScreen('event')
    }
  }

  const restart = () => {
    setState(null)
    setScreen('draw')
  }

  return (
    <main className="app">
      {screen === 'start' && <StartScreen onStart={() => setScreen('draw')} />}
      {screen === 'draw' && <RoleDrawScreen onStart={begin} />}
      {screen === 'story' && state && (
        <StoryScreen role={role} intro={scripts[role.id].intro} onContinue={() => setScreen('event')} />
      )}
      {screen === 'event' && state && pair && (
        <EventScreen player={role} npc={npc} story={story} total={total} stats={state.stats} onContinue={() => setScreen('talk')} />
      )}
      {screen === 'talk' && state && pair && (
        <PairTalkScreen
          key={`${state.dayIndex}`}
          player={role}
          npc={npc}
          pair={pair}
          playerIsAsker={playerIsAsker}
          story={story}
          stats={state.stats}
          isLast={isLast}
          onEffect={(eff) => setState((s) => (s ? applyStoryEffect(s, eff) : s))}
          onFinish={finishDay}
        />
      )}
      {screen === 'ending' && state && (
        <EndingScreen role={role} ending={endingFor(role.id, decideEnding(state.stats))} stats={state.stats} onRestart={restart} />
      )}
    </main>
  )
}
