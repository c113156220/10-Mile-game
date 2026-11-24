import type { DayPlan } from '../types'
import { extraEvents } from './farmerExtra'

/**
 * 小農 5 天劇情（固定版）。
 * ⚠ 所有情節都是虛構模擬，尚待合作社校正，不代表合作社真實事件。
 * 數值順序：balance 生活餘裕 / community 社群連結 / efficiency 資源效率
 * 每個選項三項變化總和必須為 0（執行 npm run check 會驗證）。
 */
const e = (balance: number, community: number, efficiency: number) => ({
  balance,
  community,
  efficiency,
})

export const farmerIntro =
  '你是新竹郊區的一位小農。這一週，田裡的事、市場的事、鄰里的事，都要你一件一件做決定。沒有哪個選擇是標準答案，每個選擇都有得有失。'

const baseDays: DayPlan[] = [
  {
    day: 1,
    events: [
      {
        id: 'D1',
        title: '晨間收成',
        situation: '清晨巡田，青菜長得比預期多，今天只有你一個人手。',
        options: [
          {
            id: 'A',
            text: '一個人拚到天黑，全部採完',
            effect: e(-2, 0, 2),
            intent: '獨自全部採收：不浪費，但非常疲累',
            result: '菜一棵都沒浪費，你的腰也撐到了極限。',
          },
          {
            id: 'B',
            text: '只採一半，其餘明天再說',
            effect: e(1, 0, -1),
            intent: '只採一部分：比較輕鬆，但留在田裡的菜可能放壞',
            result: '今天輕鬆不少，只是田裡的菜不一定等得到明天。',
          },
          {
            id: 'C',
            text: '請鄰近農友來幫忙，之後換你幫他',
            effect: e(-2, 2, 0),
            intent: '請鄰近農友互相幫忙：多一份人情，也要花時間協調與回禮',
            result: '大家一起忙完，你欠了一份人情，也多了一份默契。',
          },
        ],
      },
    ],
  },
  {
    day: 2,
    events: [
      {
        id: 'D2',
        title: '收購價下降',
        situation: '今天蔬菜收成較多，市場的收購價格卻下降了。',
        options: [
          {
            id: 'A',
            text: '直接交給通路',
            effect: e(1, -1, 0),
            intent: '直接交給通路：處理快速，議價空間有限',
            result: '很快處理完，價錢沒什麼談的餘地。',
          },
          {
            id: 'B',
            text: '自己接單販售',
            effect: e(-2, 1, 1),
            intent: '自己接單販售：保留彈性，時間成本高',
            result: '賣得比較有彈性，但整個晚上都在回訊息和包貨。',
          },
          {
            id: 'C',
            text: '嘗試合作共購',
            effect: e(-1, 2, -1),
            intent: '嘗試與他人合作共同購買：需要協調，可能開拓新的銷售管道',
            result: '協調花了不少時間，但這批菜不是你一個人在扛了。',
          },
        ],
      },
    ],
  },
  {
    day: 3,
    // 第 3 天從三個突發事件中隨機抽一個
    events: [
      {
        id: 'D3a',
        title: '大雨前夕',
        situation: '氣象預報明天有大雨，田裡還有一批菜沒採。',
        options: [
          {
            id: 'A',
            text: '連夜搶收全部',
            effect: e(-2, 0, 2),
            intent: '連夜獨自搶收：減少損失，但非常疲累',
            result: '菜保住了，你一整晚沒睡好。',
          },
          {
            id: 'B',
            text: '只搶收好賣的，其餘任它',
            effect: e(1, 0, -1),
            intent: '只搶收一部分：比較輕鬆，其餘可能被雨泡壞',
            result: '你早早收工，只是留下的那批菜只能看天吃飯。',
          },
          {
            id: 'C',
            text: '通知鄰居分工一起搶收',
            effect: e(-2, 2, 0),
            intent: '請鄰近農友分工搶收：多人合作，要花時間聯繫與協調',
            result: '大家分頭搶收，雨前趕完了，電話也打到手酸。',
          },
        ],
      },
      {
        id: 'D3b',
        title: '貨運延誤',
        situation: '原本要來載貨的車臨時延誤，菜放在田邊越放越不新鮮。',
        options: [
          {
            id: 'A',
            text: '就近降價賣給鄰里',
            effect: e(-1, 1, 0),
            intent: '就近降價賣給鄰里：貨出得快，賺得較少，也多認識幾個人',
            result: '菜很快賣完，賺得少了點，但多認識了幾位鄰居。',
          },
          {
            id: 'B',
            text: '自己開車送出去',
            effect: e(-2, 0, 2),
            intent: '自己開車送貨：貨可以出，但花油錢與時間',
            result: '貨準時送到，你的一整天都花在路上。',
          },
          {
            id: 'C',
            text: '先放著，隔天一起出貨',
            effect: e(1, 0, -1),
            intent: '暫存到隔天：今天比較輕鬆，但部分菜可能變差',
            result: '今天悠哉不少，只是部分菜的狀態沒那麼好了。',
          },
        ],
      },
      {
        id: 'D3c',
        title: '農具故障',
        situation: '常用的採收工具突然壞了，今天還有活要做。',
        options: [
          {
            id: 'A',
            text: '買一個新的',
            effect: e(-2, 0, 2),
            intent: '買新工具：馬上能用，要花一筆錢',
            result: '新工具很順手，荷包輕了一些。',
          },
          {
            id: 'B',
            text: '向鄰居借',
            effect: e(0, 1, -1),
            intent: '向鄰居借工具：省錢，但要配合對方時間，也欠一份人情',
            result: '工具借到了，但得配合對方的時間，也欠了一份人情。',
          },
          {
            id: 'C',
            text: '先修舊的湊合著用',
            effect: e(1, -1, 0),
            intent: '修舊工具：省錢，但可能再壞，只能自己想辦法',
            result: '勉強能用，只是不知道哪天又會壞。',
          },
        ],
      },
    ],
  },
  {
    day: 4,
    events: [
      {
        id: 'D4',
        title: '社員來訊',
        situation: '一位社員問你，下週能不能供應一批菜，同時家人說這個週末想一起休息。',
        options: [
          {
            id: 'A',
            text: '答應，這週末多準備',
            effect: e(-2, 2, 0),
            intent: '答應供應：多一位穩定的買家，週末要用來準備',
            result: '多了一位穩定的買家，週末則忙著準備。',
          },
          {
            id: 'B',
            text: '婉拒，這週末休息',
            effect: e(2, -1, -1),
            intent: '婉拒供應：週末可以休息，錯過一次合作',
            result: '週末全家好好休息，這次合作的機會就錯過了。',
          },
          {
            id: 'C',
            text: '答應一小部分數量',
            effect: e(0, 1, -1),
            intent: '答應部分數量：兼顧休息與合作，但出貨量有限',
            result: '兼顧了休息與合作，只是出貨量不多。',
          },
        ],
      },
    ],
  },
  {
    day: 5,
    events: [
      {
        id: 'D5',
        title: '季末回顧',
        situation: '一週過去，你坐在田埂上，想著下一季要種什麼。',
        options: [
          {
            id: 'A',
            text: '照舊種熟悉的作物',
            effect: e(1, -1, 0),
            intent: '沿用熟悉的作物：穩定省力，新機會較少',
            result: '你決定照舊，省力又穩定，新的機會就少了些。',
          },
          {
            id: 'B',
            text: '留一小塊地試種新作物',
            effect: e(-1, 0, 1),
            intent: '試種新作物：可能有新機會，要多花心力',
            result: '你留了一小塊地試種，多花心力，也多了點期待。',
          },
          {
            id: 'C',
            text: '先找社員與農友聊聊再決定',
            effect: e(-1, 2, -1),
            intent: '先和他人討論再決定：了解需求，但花時間，決定較慢',
            result: '你先去聽大家怎麼說，花了時間，也更知道大家要什麼。',
          },
        ],
      },
    ],
  },
]

/** 每天的事件池：原本的事件在前，新增事件在後（與 Excel 場景表順序一致）。開局時每天抽 1 個。 */
export const farmerDays: DayPlan[] = baseDays.map((d) => ({
  ...d,
  events: [...d.events, ...(extraEvents[d.day] ?? [])],
}))
