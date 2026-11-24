import { endings } from '../data/endings'
import type {
  DayPlan,
  Ending,
  GameEvent,
  Option,
  StatBand,
  StatKey,
  Stats,
} from '../types'
import { STAT_KEYS } from '../types'

export const START_STATS: Stats = { balance: 5, community: 5, efficiency: 5 }
export const MIN_STAT = 0
export const MAX_STAT = 10

export interface PlayedDay {
  day: number
  eventId: string
  optionId: 'A' | 'B' | 'C'
}

export interface GameState {
  roleId: string
  /** 每天抽到的事件（開局就決定，第 3 天會從事件池隨機抽） */
  events: GameEvent[]
  /** 目前在第幾天（從 0 開始的索引） */
  dayIndex: number
  stats: Stats
  history: PlayedDay[]
}

const clamp = (n: number) => Math.min(MAX_STAT, Math.max(MIN_STAT, n))

/** 開局：決定每天的事件。rand 可注入，方便測試。 */
export function newGame(
  roleId: string,
  days: DayPlan[],
  rand: () => number = Math.random,
): GameState {
  const events = days.map((d) => d.events[Math.floor(rand() * d.events.length)])
  return { roleId, events, dayIndex: 0, stats: { ...START_STATS }, history: [] }
}

export function currentEvent(state: GameState): GameEvent {
  return state.events[state.dayIndex]
}

export function isLastDay(state: GameState): boolean {
  return state.dayIndex >= state.events.length - 1
}

/** 套用選項：數值變化並限制在 0–10，同時記錄歷史。回傳新狀態（未前進到下一天）。 */
export function applyOption(state: GameState, option: Option): GameState {
  const ev = currentEvent(state)
  const stats = { ...state.stats }
  for (const k of STAT_KEYS) stats[k] = clamp(stats[k] + option.effect[k])
  return {
    ...state,
    stats,
    history: [...state.history, { day: state.dayIndex + 1, eventId: ev.id, optionId: option.id }],
  }
}

/** 套用一個數值變化（例如對話的回應），一樣限制在 0–10。 */
export function applyEffect(state: GameState, effect: Stats): GameState {
  const stats = { ...state.stats }
  for (const k of STAT_KEYS) stats[k] = clamp(stats[k] + effect[k])
  return { ...state, stats }
}

export function nextDay(state: GameState): GameState {
  return { ...state, dayIndex: state.dayIndex + 1 }
}

/** 結局判定：依序檢查，符合就停。 */
export function decideEnding(stats: Stats): Ending {
  const { balance, community, efficiency } = stats
  if (balance === 0) return endings.exhausted
  if (community <= 3) return endings.alone
  if (efficiency <= 2) return endings.surplus
  const max = Math.max(balance, community, efficiency)
  const tied = [balance, community, efficiency].filter((v) => v === max).length
  if (tied > 1) return endings.tradeoff
  if (balance === max) return endings.steady
  if (community === max) return endings.together
  return endings.efficient
}

/** 數值轉文字狀態（日後傳給 AI，AI 不會看到數字）。 */
export function bandOf(value: number): StatBand {
  if (value <= 3) return '偏低'
  if (value <= 6) return '普通'
  return '偏高'
}

export function statBands(stats: Stats): Record<StatKey, StatBand> {
  return {
    balance: bandOf(stats.balance),
    community: bandOf(stats.community),
    efficiency: bandOf(stats.efficiency),
  }
}

/** 數值變化轉成文字，不顯示精確數字。 */
export function deltaWord(delta: number): string {
  if (delta > 0) return '▲ 增加'
  if (delta < 0) return '▼ 略減'
  return '－ 不變'
}
