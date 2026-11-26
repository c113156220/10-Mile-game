/**
 * 期末版（簡報第 8～10、20 頁）：一件共同事件、四位角色、四輪決策、一份影響報告。
 * 玩家扮演其中一位，其他三位由規則決定（可控、容易測試）。
 * ⚠ 所有內容皆為虛構模擬，尚待合作社校正。
 */
export type SKey = 'supply' | 'delivery' | 'labor' | 'trust'
export type SState = Record<SKey, number>

export const S_KEYS: SKey[] = ['supply', 'delivery', 'labor', 'trust']
export const S_LABELS: Record<SKey, string> = {
  supply: '供貨',
  delivery: '交期',
  labor: '人力',
  trust: '信任',
}
export const S_HINTS: Record<SKey, string> = {
  supply: '貨夠不夠',
  delivery: '準不準時',
  labor: '手夠不夠',
  trust: '互相信任',
}

/** 開局：訂單 50 份、穩定只能供 30 份，所以供貨偏低。 */
export const START_STATE: SState = { supply: 4, delivery: 5, labor: 5, trust: 5 }

const f = (supply: number, delivery: number, labor: number, trust: number): SState => ({ supply, delivery, labor, trust })

export const sharedEvent = {
  title: '共同購買需求增加',
  narration:
    '合作社收到 50 份蔬菜訂單，但小農目前只能穩定供應 30 份。接下來四個人會輪流做決定，每個決定都會改變供貨、交期、人力和信任。',
}

export const roleIntros: Record<string, string> = {
  farmer: '你是在地小農。今天有 50 份蔬菜的訂單進來，可是田裡穩定的量只有 30 份。多收你會累，少收大家要等。',
  manager: '你是合作社經營者。訂單來了 50 份，小農只穩定供應 30 份，人手又有限。你要在補貨、交期和大家的信任之間取捨。',
  consumer: '你是消費者，訂了合作社的蔬菜。聽說這次的量不夠，你要想想，價格、等待時間和支持在地，哪一個比較重要。',
  member: '你是合作社社員。工作之餘想幫忙，這次訂單比平常多，分裝和配送都缺人手，而你的時間有限。',
}

export interface RoundOption {
  id: 'A' | 'B' | 'C'
  text: string
  result: string
  effect: SState
}

export interface Round {
  roleId: 'farmer' | 'manager' | 'consumer' | 'member'
  title: string
  /** 這位角色在乎的事（簡報第 10 頁） */
  stake: string
  prompt: string
  options: [RoundOption, RoundOption, RoundOption]
}

/** 四輪，依簡報第 10 頁的順序：小農 → 經營者 → 消費者 → 社員。 */
export const rounds: Round[] = [
  {
    roleId: 'farmer',
    title: '決定供應數量',
    stake: '產能與收入',
    prompt: '50 份訂單，你穩定只有 30 份。要供應多少？',
    options: [
      { id: 'A', text: '多撐一點，我努力拉到 40 份。', result: '小農加班採收，貨多了，但人也累了。', effect: f(2, 0, -2, 0) },
      { id: 'B', text: '守住 30 份，穩穩出貨。', result: '小農照穩定的量出貨，大家知道能拿到什麼。', effect: f(1, 1, 0, 1) },
      { id: 'C', text: '先出 25 份，我需要留點力氣。', result: '小農少出一些，貨更緊，但他守住了自己的節奏。', effect: f(-1, 0, 1, -1) },
    ],
  },
  {
    roleId: 'manager',
    title: '協調其他供貨來源',
    stake: '成本與交期',
    prompt: '貨還是不夠，你要怎麼協調？',
    options: [
      { id: 'A', text: '聯絡鄰近農友補貨。', result: '經營者打了一輪電話，補到一些貨，但多花了時間和成本。', effect: f(2, -1, -1, 1) },
      { id: 'B', text: '分兩批出貨，請大家多等幾天。', result: '貨分批送到，有人要等，但每個人都拿得到。', effect: f(1, -1, 0, 1) },
      { id: 'C', text: '只出現有的量，其餘訂單先取消。', result: '交期守住了，但被取消的人很失望。', effect: f(-1, 2, 0, -2) },
    ],
  },
  {
    roleId: 'consumer',
    title: '依價格與等待時間回應',
    stake: '預算與滿意度',
    prompt: '貨可能要晚一點才會齊，你要怎麼回應？',
    options: [
      { id: 'A', text: '我願意等，也接受小漲價。', result: '消費者選擇等待，合作社鬆了一口氣。', effect: f(0, 0, 1, 2) },
      { id: 'B', text: '請準時送到，不然我就取消。', result: '消費者要求準時，大家的壓力變大。', effect: f(0, 1, -1, -1) },
      { id: 'C', text: '這次先不訂，改去別處買。', result: '消費者少訂一份，貨沒那麼緊，但關係淡了一點。', effect: f(1, 0, 1, -2) },
    ],
  },
  {
    roleId: 'member',
    title: '決定是否協助分裝配送',
    stake: '時間與參與',
    prompt: '分裝和配送缺人手，你要幫忙嗎？',
    options: [
      { id: 'A', text: '下班後我來幫忙分裝配送。', result: '社員留下來幫忙，貨準時多了。', effect: f(0, 1, 2, 1) },
      { id: 'B', text: '我只能幫一部分，其他請別人。', result: '社員幫了一些，剩下的靠大家分擔。', effect: f(0, 0, 1, 0) },
      { id: 'C', text: '這次沒空，下次再參與。', result: '社員這次沒能幫上忙，人手更吃緊。', effect: f(0, -1, -1, -1) },
    ],
  },
]

/** 電腦角色的回應規則：依目前的共同狀態決定選哪個選項（0＝A、1＝B、2＝C）。 */
export function computerPick(roundIndex: number, s: SState): 0 | 1 | 2 {
  switch (rounds[roundIndex].roleId) {
    case 'farmer':
      return 1
    case 'manager':
      return s.supply <= 4 ? 0 : s.labor <= 3 ? 2 : 1
    case 'consumer':
    case 'member':
      return s.trust >= 6 ? 0 : s.trust <= 3 ? 2 : 1
  }
}

/** 每位角色在影響報告中的處境，由共同狀態算出（簡報第 10 頁：資源與滿意度一起結算）。 */
export const roleReport: Record<
  Round['roleId'],
  { keys: [SKey, SKey]; stake: string; high: string; mid: string; low: string }
> = {
  farmer: {
    keys: ['supply', 'labor'],
    stake: '產能與收入',
    high: '貨賣得出去，人也沒有太累。',
    mid: '勉強顧得過來。',
    low: '貨沒處理好，人也撐得很辛苦。',
  },
  manager: {
    keys: ['delivery', 'labor'],
    stake: '成本與交期',
    high: '訂單和人力都調得開。',
    mid: '勉強調度，每一步都在趕。',
    low: '人力和交期都吃緊，哪邊都顧不好。',
  },
  consumer: {
    keys: ['delivery', 'trust'],
    stake: '預算與滿意度',
    high: '拿到了貨，也覺得被當一回事。',
    mid: '拿到了，但等得有點久。',
    low: '等太久，也不確定下次還要不要訂。',
  },
  member: {
    keys: ['labor', 'trust'],
    stake: '時間與參與',
    high: '有幫上忙，也沒被壓垮。',
    mid: '幫了一些，時間有點緊。',
    low: '時間被擠壓，覺得參與很吃力。',
  },
}

export interface Outcome {
  id: string
  title: string
  story: string
  test: (s: SState) => boolean
}

/** 共同結果：由上到下，第一個符合的就是結果。 */
export const outcomes: Outcome[] = [
  {
    id: 'split',
    title: '各自為政',
    story: '大家都在顧自己，訂單送出去了，卻沒有人覺得被聽見。信任少了，下一次協商會更難。',
    test: (s) => s.trust <= 3,
  },
  {
    id: 'tired',
    title: '貨到了，人累了',
    story: '貨夠了，也送到了，但幫忙的人都累壞了。這樣的合作撐得過這一次，撐不了很多次。',
    test: (s) => s.supply >= 6 && s.labor <= 4,
  },
  {
    id: 'wait',
    title: '慢一點，但大家等你',
    story: '貨晚了一些，可是大家願意等，因為彼此信得過。',
    test: (s) => s.delivery <= 4 && s.trust >= 6,
  },
  {
    id: 'together',
    title: '一起把事做成',
    story: '供貨、交期、人力和信任都顧到了。每個人都退一步，事情就成了。',
    test: (s) => s.supply >= 5 && s.delivery >= 5 && s.labor >= 5 && s.trust >= 7,
  },
  {
    id: 'barely',
    title: '勉強過關',
    story: '這一筆訂單送出去了，但每一方都留下一點遺憾。下一輪要更早開始協商。',
    test: () => true,
  },
]

/** 簡報第 18 頁：讓故事連結真實服務 */
export const services = [
  { name: '在地好物與共同購買', hint: '小農與消費者的需求如何被協調？' },
  { name: '拾理漂書', hint: '閒置書本如何產生新的使用價值？' },
  { name: '永續走走', hint: '親自走訪新竹地方與生產現場。' },
  { name: '永續聊聊', hint: '從不同觀點出發，展開地方交流。' },
]
