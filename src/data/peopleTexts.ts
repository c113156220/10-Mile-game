import type { StatKey } from '../types'

// ⚠ 虛構模擬文字，尚待合作社校正。不可含阿拉伯數字。
type Pair = { high: string; low: string }
export const peopleTexts: Record<string, Record<StatKey, Pair>> = {
  farmer: {
    balance: { high: '這週田裡的步調還算從容。', low: '這週忙得喘不過氣，幾乎沒有休息。' },
    community: { high: '覺得有人一起扛，不是自己一個人在種。', low: '覺得自己一個人在撐，沒什麼人說話。' },
    efficiency: { high: '收成大多順利送到有需要的人手上。', low: '有些收成沒找到去處，感到可惜。' },
  },
  member: {
    balance: { high: '社務排得不擠，還有餘力顧自己。', low: '社務和雜事堆在一起，累得有點撐不住。' },
    community: { high: '和大家走得更近，社裡有熱鬧的感覺。', low: '覺得社裡的人各忙各的，不太好聯絡。' },
    efficiency: { high: '貨和訂單接得很順，沒有浪費。', low: '訂單和貨對不起來，有些忙白了。' },
  },
  consumer: {
    balance: { high: '買菜這件事變得輕鬆，不用多花心力。', low: '要配合的事有點多，覺得有些負擔。' },
    community: { high: '覺得跟產地、跟合作社更靠近了。', low: '還是覺得自己像個外人，沒有被接住。' },
    efficiency: { high: '買到剛好需要的量，沒有浪費。', low: '買的和需要的有落差，有些放壞了。' },
  },
}

export const groupTexts = {
  close: '這一週，合作社裡的人靠得比較近。',
  middle: '這一週，大家有互動，也還有一些距離。',
  apart: '這一週，大家各忙各的，互動不多。',
}
