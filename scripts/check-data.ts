/**
 * 資料檢查：npm run check（期末版：共同事件 × 四位角色 × 四輪）
 * 1. 四輪的角色都存在且可玩、每輪 3 個選項、選項 A/B/C
 * 2. 每個選項都有改變共同狀態、文字不為空
 * 3. 窮舉：每個角色的 3 種選擇，印出共同結果；確認每個角色至少有 2 種結果、整體 3 種以上
 */
import { roleIntros, rounds } from '../src/data/shared'
import { roles } from '../src/data/roles'
import { decideOutcome, newSharedGame, resolveRound } from '../src/engine/shared'

let errors = 0
const fail = (m: string) => {
  console.error(m)
  errors++
}

rounds.forEach((r, i) => {
  const role = roles.find((x) => x.id === r.roleId)
  if (!role || !role.playable) fail(`第 ${i + 1} 輪角色 ${r.roleId} 不存在或不可玩`)
  if (!roleIntros[r.roleId]) fail(`${r.roleId} 缺少開場文字`)
  if (r.options.length !== 3) fail(`第 ${i + 1} 輪選項不是 3 個`)
  r.options.forEach((o, k) => {
    if (o.id !== 'ABC'[k]) fail(`第 ${i + 1} 輪選項編號錯誤`)
    if (!o.text || !o.result) fail(`第 ${i + 1} 輪 ${o.id} 文字缺漏`)
    if (Object.values(o.effect).every((v) => v === 0)) fail(`第 ${i + 1} 輪 ${o.id} 沒有改變任何狀態`)
  })
})

const all = new Set<string>()
for (const r of rounds) {
  const seen = new Set<string>()
  const line: string[] = []
  for (const pick of [0, 1, 2] as const) {
    let g = newSharedGame(r.roleId)
    rounds.forEach((_, i) => {
      g = resolveRound(g, i, r.roleId === rounds[i].roleId ? pick : undefined)
    })
    const o = decideOutcome(g.state)
    seen.add(o.id)
    all.add(o.id)
    line.push(`${'ABC'[pick]}→${o.title}`)
  }
  console.log(`${r.roleId}：${line.join('、')}`)
  if (seen.size < 2) fail(`${r.roleId} 的三種選擇只會得到同一種結果`)
}
console.log(`整體可得到 ${all.size} 種共同結果`)
if (all.size < 3) fail('整體共同結果少於 3 種')

if (errors) throw new Error(`共 ${errors} 個問題`)
console.log('資料檢查通過')
