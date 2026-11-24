/** 三個數值（簡報版本） */
export type StatKey = 'balance' | 'community' | 'efficiency'

export type Stats = Record<StatKey, number>

export const STAT_LABELS: Record<StatKey, string> = {
  balance: '生活餘裕',
  community: '社群連結',
  efficiency: '資源效率',
}

export const STAT_KEYS: StatKey[] = ['balance', 'community', 'efficiency']

/** 每個選項的數值變化。規則：三項總和必須為 0（有得有失）。 */
export type Effect = Stats

export interface Option {
  id: 'A' | 'B' | 'C'
  /** 玩家看到的選項文字（固定版） */
  text: string
  effect: Effect
  /** 選項意圖：日後傳給 AI 改寫用，不給玩家看，也不含數字 */
  intent: string
  /** 選完後顯示的一句結果（固定版） */
  result: string
}

export interface GameEvent {
  /** 事件編號，例如 D1、D3a */
  id: string
  title: string
  /** 事件固定原句（備用內容） */
  situation: string
  options: [Option, Option, Option]
}

export interface DialogueReply {
  id: 'A' | 'B' | 'C'
  /** 玩家說的話 */
  text: string
  /** 角色的回應 */
  reply: string
  /** 數值變化，總和必須為 0，疊加在事件選項之上 */
  effect: Effect
}

export interface DialogueRound {
  /** 角色先說的話 */
  line: string
  replies: [DialogueReply, DialogueReply, DialogueReply]
}

/** 玩家選完事件後，與另一個角色的對話（最多 3 輪，第一版為預設內容，不需後端） */
export interface Dialogue {
  npcRoleId: string
  rounds: DialogueRound[]
}

export interface DayPlan {
  day: number
  /** 一般日只有一個事件；有多個代表從事件池隨機抽一個 */
  events: GameEvent[]
}

export interface Role {
  id: string
  name: string
  tagline: string
  background: string
  playable: boolean
  /** 像素角色外觀 */
  look: PixelLook
}

export interface PixelLook {
  hat?: 'straw' | 'headband' | 'cap'
  shirt: string
  pants: string
  accessory?: 'phone' | 'backpack' | 'bag' | 'cane' | 'tie' | 'basket'
}

export interface Ending {
  id: string
  title: string
  condition: string
  story: string
}

/** 日後 AI 改寫文字用的介面。第一版只回傳固定版文字。 */
export type StatBand = '偏低' | '普通' | '偏高'

export interface TextRequest {
  roleId: string
  day: number
  eventId: string
  /** 事件固定原句 */
  situation: string
  options: { id: 'A' | 'B' | 'C'; text: string; intent: string }[]
  /** 目前三個數值的「文字狀態」，不含數字 */
  statBands: Record<StatKey, StatBand>
  /** 前幾天的選擇摘要（文字） */
  history: string[]
}

export interface TextResponse {
  situation: string
  options: { id: 'A' | 'B' | 'C'; text: string }[]
}

export interface TextProvider {
  getEventText(req: TextRequest): Promise<TextResponse>
}
