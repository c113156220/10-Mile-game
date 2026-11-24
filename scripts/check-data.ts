/**
 * 資料檢查：npm run check
 * 1. 每個可玩角色：每個選項三項變化總和 = 0，每個事件恰好 A/B/C，文字不含阿拉伯數字
 * 2. 對話：每個回覆總和 = 0，最多 3 輪
 * 3. 窮舉每個角色的事件組合 × 選項組合，列出結局分布，確認 7 種結局都能到達
 */
import { dialogues } from '../src/data/dialogues'
import { roles } from '../src/data/roles'
import { scripts } from '../src/data/scripts'
import { endingFor } from '../src/data/roleTexts'
import { applyOption, currentEvent, decideEnding, isLastDay, nextDay, START_STATS } from '../src/engine/game'
import type { GameState } from '../src/engine/game'
import type { GameEvent } from '../src/types'
import { STAT_KEYS } from '../src/types'

let errors = 0
const fail = (msg: string) => {
  console.error(msg)
  errors++
}

const allEventIds = new Set(Object.values(scripts).flatMap((s) => s.days.flatMap((d) => d.events.map((e) => e.id))))
for (const [id, dlg] of Object.entries(dialogues)) {
  if (!allEventIds.has(id)) fail(`對話 ${id} 找不到對應事件`)
  if (dlg.rounds.length > 3) fail(`對話 ${id} 超過 3 輪`)
  dlg.rounds.forEach((r, ri) =>
    r.replies.forEach((rep) => {
      const sum = STAT_KEYS.reduce((s, k) => s + rep.effect[k], 0)
      if (sum !== 0) fail(`對話 ${id} 第 ${ri + 1} 輪 ${rep.id} 數值總和 = ${sum}，應為 0`)
    }),
  )
}

for (const role of roles.filter((r) => r.playable)) {
  const script = scripts[role.id]
  if (!script) {
    fail(`${role.name} 是可玩角色，但沒有劇情資料`)
    continue
  }
  const days = script.days
  for (const d of days)
    for (const ev of d.events) {
      const dlg = dialogues[ev.id]
      if (!dlg) fail(`${role.name} 事件 ${ev.id} 沒有對話（每個事件都要有其他角色互動）`)
      else if (dlg.npcRoleId === role.id) fail(`${role.name} 事件 ${ev.id} 的對話對象是自己`)
      else if (!roles.some((r) => r.id === dlg.npcRoleId)) fail(`事件 ${ev.id} 的對話角色 ${dlg.npcRoleId} 不存在`)
    }
  if (days.length !== 5) fail(`${role.name} 不是 5 天`)
  for (const d of days) {
    for (const ev of d.events) {
      if (ev.options.map((o) => o.id).join('') !== 'ABC') fail(`${role.name} 事件 ${ev.id} 選項不是 A/B/C`)
      for (const o of ev.options) {
        const sum = STAT_KEYS.reduce((s, k) => s + o.effect[k], 0)
        if (sum !== 0) fail(`${role.name} 選項 ${ev.id}-${o.id} 數值總和 = ${sum}，應為 0`)
        if (/[0-9]/.test(o.text + o.intent + o.result)) fail(`${role.name} 選項 ${ev.id}-${o.id} 的文字含阿拉伯數字`)
      }
    }
  }

  const counts: Record<string, number> = {}
  let total = 0
  const choose = (i: number): GameEvent[][] =>
    i >= days.length ? [[]] : days[i].events.flatMap((ev) => choose(i + 1).map((rest) => [ev, ...rest]))
  for (const events of choose(0)) {
    const walk = (state: GameState) => {
      for (const o of currentEvent(state).options) {
        const after = applyOption(state, o)
        if (isLastDay(state)) {
          const e = endingFor(role.id, decideEnding(after.stats))
          counts[e.title] = (counts[e.title] ?? 0) + 1
          total++
        } else walk(nextDay(after))
      }
    }
    walk({ roleId: role.id, events, dayIndex: 0, stats: { ...START_STATS }, history: [] })
  }
  console.log(`\n【${role.name}】共 ${total} 條路徑（事件組合 × 選項，未含對話）`)
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1]))
    console.log(`  ${k}: ${v} (${((v / total) * 100).toFixed(1)}%)`)
  if (Object.keys(counts).length < 7) fail(`${role.name} 有結局無法到達`)
}

if (errors) throw new Error(`資料檢查失敗：${errors} 個問題`)
console.log('\n檢查通過')
