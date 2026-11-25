/**
 * 資料檢查：npm run check
 * 1. 每則回覆的提問者／回覆者數值變化總和 = 0；每組對話 3 問 × 3 回覆；角色存在；文字不含阿拉伯數字
 * 2. 每個可玩角色每天至少有一組對話
 * 3. 窮舉每個角色所有可能的路徑，確認 7 種結局都能到達
 */
import { dayStories, pairDialogues } from '../src/data/pairs'
import { groupTexts, peopleTexts } from '../src/data/peopleTexts'
import { roles } from '../src/data/roles'
import { decideEnding, START_STATS } from '../src/engine/game'
import type { Stats } from '../src/types'
import { STAT_KEYS } from '../src/types'

let errors = 0
const fail = (m: string) => {
  console.error(m)
  errors++
}
const roleIds = new Set(roles.map((r) => r.id))
const noDigit = (t: string, where: string) => /[0-9０-９]/.test(t) && fail(`${where} 含阿拉伯數字：${t}`)
const sum = (s: Stats) => STAT_KEYS.reduce((a, k) => a + s[k], 0)

dayStories.forEach((d) => noDigit(d.narration, `第 ${d.day} 天旁白`))
for (const p of pairDialogues) {
  if (!roleIds.has(p.asker) || !roleIds.has(p.replier)) fail(`${p.id} 角色不存在`)
  if (p.asker === p.replier) fail(`${p.id} 提問者與回覆者相同`)
  if (p.questions.length !== 3) fail(`${p.id} 問題數不是 3`)
  for (const q of p.questions) {
    noDigit(q.text, p.id)
    if (q.replies.length !== 3) fail(`${p.id} 「${q.text}」回覆數不是 3`)
    for (const r of q.replies) {
      noDigit(r.text, `${p.id}/${r.id}`)
      if (sum(r.askerEffect) !== 0) fail(`${p.id}/${r.id} 提問者總和 ≠ 0`)
      if (sum(r.replierEffect) !== 0) fail(`${p.id}/${r.id} 回覆者總和 ≠ 0`)
    }
  }
}

for (const role of roles.filter((r) => r.playable)) {
  const t = peopleTexts[role.id]
  if (!t) {
    fail(`${role.name} 缺少「大家過得怎麼樣」文字`)
    continue
  }
  for (const k of STAT_KEYS) {
    noDigit(t[k].high, `${role.name} ${k} 高`)
    noDigit(t[k].low, `${role.name} ${k} 低`)
    if (!t[k].high || !t[k].low) fail(`${role.name} ${k} 文字缺漏`)
  }
}
Object.values(groupTexts).forEach((g) => noDigit(g, '整體評語'))

const clamp = (n: number) => Math.max(0, Math.min(10, n))
for (const role of roles.filter((r) => r.playable)) {
  let layer = new Map<string, Stats>([[JSON.stringify(START_STATS), { ...START_STATS }]])
  for (const day of dayStories) {
    const pool = pairDialogues.filter((p) => p.day === day.day && (p.asker === role.id || p.replier === role.id))
    if (pool.length === 0) fail(`${role.name} 第 ${day.day} 天沒有對話`)
    const next = new Map<string, Stats>()
    for (const st of layer.values())
      for (const p of pool)
        for (const q of p.questions)
          for (const r of q.replies) {
            const eff = p.asker === role.id ? r.askerEffect : r.replierEffect
            const s = { ...st }
            for (const k of STAT_KEYS) s[k] = clamp(s[k] + eff[k])
            next.set(JSON.stringify(s), s)
          }
    layer = next
  }
  const seen = new Map<string, number>()
  for (const s of layer.values()) {
    const e = decideEnding(s).id
    seen.set(e, (seen.get(e) ?? 0) + 1)
  }
  console.log(`${role.name}：可到達結局 ${seen.size}/7`, Object.fromEntries(seen))
  if (seen.size < 7) fail(`${role.name} 無法到達全部 7 種結局`)
}

if (errors) {
  throw new Error(`共 ${errors} 個問題`)
}
console.log('資料檢查通過')
