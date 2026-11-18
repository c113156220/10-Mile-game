/**
 * 資料檢查：npm run check
 * 1. 每個選項三項變化總和 = 0，且每個事件恰好 A/B/C 三個選項
 * 2. 窮舉第 3 天 3 種事件 × 每天選項組合（729 條路徑），確認 7 種結局都能到達
 */
import { farmerDays } from '../src/data/farmer'
import { applyOption, currentEvent, decideEnding, isLastDay, nextDay } from '../src/engine/game'
import type { GameState } from '../src/engine/game'
import { START_STATS } from '../src/engine/game'
import { STAT_KEYS } from '../src/types'

let errors = 0
for (const d of farmerDays) {
  for (const ev of d.events) {
    const ids = ev.options.map((o) => o.id).join('')
    if (ids !== 'ABC') {
      console.error(`事件 ${ev.id} 選項不是 A/B/C`)
      errors++
    }
    for (const o of ev.options) {
      const sum = STAT_KEYS.reduce((s, k) => s + o.effect[k], 0)
      if (sum !== 0) {
        console.error(`選項 ${ev.id}-${o.id} 數值總和 = ${sum}，應為 0`)
        errors++
      }
      if (/[0-9]/.test(o.text + o.intent + o.result)) {
        console.error(`選項 ${ev.id}-${o.id} 的文字含阿拉伯數字`)
        errors++
      }
    }
  }
}

const counts: Record<string, number> = {}
let total = 0
for (const d3 of farmerDays[2].events) {
  const events = farmerDays.map((d, i) => (i === 2 ? d3 : d.events[0]))
  const walk = (state: GameState) => {
    if (state.dayIndex >= events.length) return
    for (const o of currentEvent(state).options) {
      const after = applyOption(state, o)
      if (isLastDay(state)) {
        const e = decideEnding(after.stats)
        counts[e.title] = (counts[e.title] ?? 0) + 1
        total++
      } else {
        walk(nextDay(after))
      }
    }
  }
  walk({ roleId: 'farmer', events, dayIndex: 0, stats: { ...START_STATS }, history: [] })
}

console.log(`共 ${total} 條路徑`)
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`${k}: ${v} (${((v / total) * 100).toFixed(1)}%)`)
}
if (Object.keys(counts).length < 7) {
  console.error('有結局無法到達')
  errors++
}
if (errors) {
  console.error(`檢查失敗：${errors} 個問題`)
  throw new Error("資料檢查失敗")
}
console.log('檢查通過')
