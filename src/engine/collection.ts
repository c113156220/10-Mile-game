/** 圖鑑進度：只存在本機瀏覽器，不需帳號（簡報第 16～17 頁）。讀寫失敗時不影響遊戲。 */
const KEY = 'shili-life-v1'

interface Saved {
  roles: string[]
  outcomes: string[]
}

function read(): Saved {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) {
      const d = JSON.parse(raw)
      return { roles: Array.isArray(d.roles) ? d.roles : [], outcomes: Array.isArray(d.outcomes) ? d.outcomes : [] }
    }
  } catch {
    // 忽略
  }
  return { roles: [], outcomes: [] }
}

export function recordPlay(roleId: string, outcomeId: string): Saved {
  const s = read()
  if (!s.roles.includes(roleId)) s.roles.push(roleId)
  if (!s.outcomes.includes(outcomeId)) s.outcomes.push(outcomeId)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // 忽略
  }
  return s
}
