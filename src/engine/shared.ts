import { computerPick, outcomes, roleReport, rounds, START_STATE } from '../data/shared'
import type { Outcome, Round, SState } from '../data/shared'
import { S_KEYS } from '../data/shared'

const clamp = (n: number) => Math.max(0, Math.min(10, n))

export interface HistoryEntry {
  roundIndex: number
  roleId: Round['roleId']
  optionIndex: 0 | 1 | 2
  byPlayer: boolean
}

export interface SharedGame {
  roleId: Round['roleId']
  state: SState
  history: HistoryEntry[]
}

export function newSharedGame(roleId: string): SharedGame {
  return { roleId: roleId as Round['roleId'], state: { ...START_STATE }, history: [] }
}

export const applyEffect = (s: SState, e: SState): SState => {
  const out = { ...s }
  for (const k of S_KEYS) out[k] = clamp(s[k] + e[k])
  return out
}

/** 結算第 roundIndex 輪：玩家自己的回合用玩家的選擇，其他回合用規則。 */
export function resolveRound(g: SharedGame, roundIndex: number, playerPick?: 0 | 1 | 2): SharedGame {
  const r = rounds[roundIndex]
  const byPlayer = r.roleId === g.roleId
  const pick = byPlayer ? (playerPick ?? 1) : computerPick(roundIndex, g.state)
  return {
    ...g,
    state: applyEffect(g.state, r.options[pick].effect),
    history: [...g.history, { roundIndex, roleId: r.roleId, optionIndex: pick, byPlayer }],
  }
}

export const decideOutcome = (s: SState): Outcome => outcomes.find((o) => o.test(s)) as Outcome

export function describeRole(roleId: Round['roleId'], s: SState): string {
  const r = roleReport[roleId]
  const avg = (s[r.keys[0]] + s[r.keys[1]]) / 2
  return avg >= 6.5 ? r.high : avg <= 4 ? r.low : r.mid
}
