import type { DayPlan } from '../types'

/**
 * 合作社社員 5 天劇情（固定版）。
 * ⚠ 所有情節都是虛構模擬，尚待合作社校正，不代表合作社真實事件。
 * 資料來源：Excel 場景表（編號 M…）。每個選項三項變化總和必須為 0（npm run check 會驗證）。
 */
const e = (balance: number, community: number, efficiency: number) => ({ balance, community, efficiency })

export const memberDays: DayPlan[] = [
  {
    day: 1,
    events: [
      {
        id: "M1",
        title: "下班後的通知",
        situation: "下班後很累，手機跳出合作社這週共同購買的通知。",
        options: [
          {
            id: 'A',
            text: "馬上看，挑幾樣下單",
            effect: e(-1, 0, 1),
            intent: "馬上挑選下單：買到需要的東西，花了一些時間與精神",
            result: "買到需要的東西，花了一些時間與精神。",
          },
          {
            id: 'B',
            text: "太累了，明天再看",
            effect: e(1, -1, 0),
            intent: "先休息：保留體力，可能錯過這週的訂購",
            result: "保留體力，可能錯過這週的訂購。",
          },
          {
            id: 'C',
            text: "在群組問問有沒有人想一起訂",
            effect: e(-1, 2, -1),
            intent: "邀人一起訂：多一點互動，也要花時間溝通",
            result: "多一點互動，也要花時間溝通。",
          },
        ],
      },
      {
        id: "M1b",
        title: "週末的安排",
        situation: "週末快到了，家裡的菜快吃完，同一天剛好有一場社員聚會。",
        options: [
          {
            id: 'A',
            text: "先去聚會，認識其他社員",
            effect: e(-2, 2, 0),
            intent: "參加聚會：認識更多人，但整個下午被佔滿",
            result: "認識更多人，但整個下午被佔滿。",
          },
          {
            id: 'B',
            text: "先去買菜，聚會不去了",
            effect: e(1, -1, 0),
            intent: "優先處理生活所需：比較輕鬆，少了認識人的機會",
            result: "比較輕鬆，少了認識人的機會。",
          },
          {
            id: 'C',
            text: "買完菜再去聚會待一下",
            effect: e(-1, 1, 0),
            intent: "兩邊都顧一點：有參與，但行程比較趕",
            result: "有參與，但行程比較趕。",
          },
        ],
      },
      {
        id: "M1c",
        title: "吃不完的菜",
        situation: "上週買的菜還有一大袋沒吃完，今天又收到新的訂購通知。",
        options: [
          {
            id: 'A',
            text: "先把剩的煮完，這週不訂",
            effect: e(-1, -1, 2),
            intent: "先消化庫存：不浪費，但少了一次參與",
            result: "不浪費，但少了一次參與。",
          },
          {
            id: 'B',
            text: "分一些給同事或鄰居",
            effect: e(-1, 2, -1),
            intent: "把多的菜分享出去：多一份人情，也要花時間聯絡",
            result: "多一份人情，也要花時間聯絡。",
          },
          {
            id: 'C',
            text: "照常訂，剩的再說",
            effect: e(1, 0, -1),
            intent: "維持習慣：省事，可能又吃不完",
            result: "省事，可能又吃不完。",
          },
        ],
      },
    ],
  },
  {
    day: 2,
    events: [
      {
        id: "M2",
        title: "菜價變動",
        situation: "這週的菜價比上週高，你看著訂單猶豫要不要買。",
        options: [
          {
            id: 'A',
            text: "照買，支持在地小農",
            effect: e(0, 1, -1),
            intent: "照常購買：支持生產者，花費比預期多",
            result: "支持生產者，花費比預期多。",
          },
          {
            id: 'B',
            text: "少買一點",
            effect: e(1, -1, 0),
            intent: "減少購買量：比較不心疼，少了一點支持",
            result: "比較不心疼，少了一點支持。",
          },
          {
            id: 'C',
            text: "改去超市買比較便宜的",
            effect: e(1, -2, 1),
            intent: "改買較便宜的：省錢方便，和合作社的關係變淡",
            result: "省錢方便，和合作社的關係變淡。",
          },
        ],
      },
      {
        id: "M2b",
        title: "活動報名",
        situation: "你看到一場產地小旅行的報名，時間剛好在你原本想休息的週末。",
        options: [
          {
            id: 'A',
            text: "報名參加",
            effect: e(-2, 2, 0),
            intent: "參加活動：認識產地與人，但犧牲休息",
            result: "認識產地與人，但犧牲休息。",
          },
          {
            id: 'B',
            text: "這次先不報名",
            effect: e(2, -1, -1),
            intent: "選擇休息：養足精神，少了一次體驗",
            result: "養足精神，少了一次體驗。",
          },
          {
            id: 'C',
            text: "先問朋友要不要一起去",
            effect: e(-1, 1, 0),
            intent: "揪朋友一起：多了伴，但要多花時間協調",
            result: "多了伴，但要多花時間協調。",
          },
        ],
      },
      {
        id: "M2c",
        title: "取貨時間",
        situation: "共同購買的取貨時間在平日傍晚，你可能要提早下班。",
        options: [
          {
            id: 'A',
            text: "提早下班去取",
            effect: e(-2, 1, 1),
            intent: "自己去取貨：菜新鮮到手，工作被打亂",
            result: "菜新鮮到手，工作被打亂。",
          },
          {
            id: 'B',
            text: "請同事或鄰居順便代取",
            effect: e(0, 1, -1),
            intent: "請人代取：省時間，欠一份人情",
            result: "省時間，欠一份人情。",
          },
          {
            id: 'C',
            text: "這次先不取，下次再說",
            effect: e(1, -1, 0),
            intent: "放棄這次取貨：輕鬆，但可能浪費訂購",
            result: "輕鬆，但可能浪費訂購。",
          },
        ],
      },
    ],
  },
  {
    day: 3,
    events: [
      {
        id: "M3",
        title: "不太新鮮的菜",
        situation: "取回的菜裡，有幾顆看起來不太新鮮。",
        options: [
          {
            id: 'A',
            text: "向合作社或小農反映",
            effect: e(-1, 1, 0),
            intent: "主動反映問題：幫助改進，要花時間說明",
            result: "幫助改進，要花時間說明。",
          },
          {
            id: 'B',
            text: "自己處理掉，不多說",
            effect: e(1, -1, 0),
            intent: "默默吸收：省事，問題沒被知道",
            result: "省事，問題沒被知道。",
          },
          {
            id: 'C',
            text: "趕快煮掉，順便問大家怎麼保存",
            effect: e(-1, 0, 1),
            intent: "趕快處理並請教：減少浪費，要多花一點心力",
            result: "減少浪費，要多花一點心力。",
          },
        ],
      },
      {
        id: "M3b",
        title: "缺貨",
        situation: "你想買的菜這週賣完了，晚餐的菜單得重新想。",
        options: [
          {
            id: 'A',
            text: "改買其他品項試試",
            effect: e(-1, 0, 1),
            intent: "換個品項：嘗試新東西，要重新規劃",
            result: "嘗試新東西，要重新規劃。",
          },
          {
            id: 'B',
            text: "去超市補齊需要的",
            effect: e(1, -1, 0),
            intent: "去其他地方買：快又方便，和合作社無關",
            result: "快又方便，和合作社無關。",
          },
          {
            id: 'C',
            text: "在群組問有沒有人能分一點",
            effect: e(-1, 2, -1),
            intent: "向其他人求助：多一份互助，也要等回覆",
            result: "多一份互助，也要等回覆。",
          },
        ],
      },
      {
        id: "M3c",
        title: "帳目對不上",
        situation: "對帳時你發現，這週的金額和你記的不太一樣。",
        options: [
          {
            id: 'A',
            text: "留言問清楚",
            effect: e(-1, 1, 0),
            intent: "主動詢問：把事情弄清楚，要花時間來回溝通",
            result: "把事情弄清楚，要花時間來回溝通。",
          },
          {
            id: 'B',
            text: "自己再算一次，先不問",
            effect: e(-1, 0, 1),
            intent: "自己核對：確認數字，少了溝通",
            result: "確認數字，少了溝通。",
          },
          {
            id: 'C',
            text: "金額差不多，就不追究了",
            effect: e(1, -1, 0),
            intent: "不追究：省事，可能有誤會沒解開",
            result: "省事，可能有誤會沒解開。",
          },
        ],
      },
    ],
  },
  {
    day: 4,
    events: [
      {
        id: "M4",
        title: "週末的志工需求",
        situation: "有人在群組問，這個週末能不能有人來幫忙整理、分裝。",
        options: [
          {
            id: 'A',
            text: "報名幫忙",
            effect: e(-2, 2, 0),
            intent: "報名當志工：多認識人、幫上忙，週末被佔滿",
            result: "多認識人、幫上忙，週末被佔滿。",
          },
          {
            id: 'B',
            text: "這次沒空，下次再說",
            effect: e(1, -1, 0),
            intent: "婉拒：保留自己的時間，少了參與",
            result: "保留自己的時間，少了參與。",
          },
          {
            id: 'C',
            text: "只幫忙一小段時間",
            effect: e(-1, 1, 0),
            intent: "幫忙一部分：兼顧自己的時間與參與",
            result: "兼顧自己的時間與參與。",
          },
        ],
      },
      {
        id: "M4b",
        title: "家人的疑問",
        situation: "家人問你：為什麼要特地買合作社的菜，超市不是更方便嗎？",
        options: [
          {
            id: 'A',
            text: "好好說明自己的想法",
            effect: e(-1, 1, 0),
            intent: "認真解釋：互相理解，要花時間溝通",
            result: "互相理解，要花時間溝通。",
          },
          {
            id: 'B',
            text: "簡單說比較新鮮就好",
            effect: e(1, 0, -1),
            intent: "簡單帶過：省力，家人未必真的了解",
            result: "省力，家人未必真的了解。",
          },
          {
            id: 'C',
            text: "下次帶家人一起去取貨看看",
            effect: e(-2, 1, 1),
            intent: "邀請家人體驗：增進了解，要多花時間安排",
            result: "增進了解，要多花時間安排。",
          },
        ],
      },
      {
        id: "M4c",
        title: "預算吃緊",
        situation: "這個月開銷比較多，你得檢查哪些地方可以省。",
        options: [
          {
            id: 'A',
            text: "減少合作社的訂購量",
            effect: e(1, -1, 0),
            intent: "減少訂購：減輕負擔，少了支持",
            result: "減輕負擔，少了支持。",
          },
          {
            id: 'B',
            text: "維持訂購，改省其他地方",
            effect: e(-1, 1, 0),
            intent: "維持參與：多了取捨，生活其他地方要節省",
            result: "多了取捨，生活其他地方要節省。",
          },
          {
            id: 'C',
            text: "找人一起分攤訂購",
            effect: e(-1, 2, -1),
            intent: "找人分攤：成本變輕，要花時間協調",
            result: "成本變輕，要花時間協調。",
          },
        ],
      },
    ],
  },
  {
    day: 5,
    events: [
      {
        id: "M5",
        title: "季末回顧",
        situation: "一季過去，你回頭看自己和合作社的關係。",
        options: [
          {
            id: 'A',
            text: "維持現在的方式就好",
            effect: e(1, -1, 0),
            intent: "維持現狀：穩定省力，關係不再深入",
            result: "穩定省力，關係不再深入。",
          },
          {
            id: 'B',
            text: "多參與一點活動",
            effect: e(-2, 2, 0),
            intent: "增加參與：連結變多，時間變少",
            result: "連結變多，時間變少。",
          },
          {
            id: 'C',
            text: "找朋友一起加入",
            effect: e(-1, 2, -1),
            intent: "邀人加入：擴大圈子，要花時間說明",
            result: "擴大圈子，要花時間說明。",
          },
        ],
      },
      {
        id: "M5b",
        title: "意見回饋",
        situation: "合作社問大家，對這一季有什麼建議。",
        options: [
          {
            id: 'A',
            text: "認真寫下建議",
            effect: e(-1, 1, 0),
            intent: "認真回饋：幫助改進，花時間整理想法",
            result: "幫助改進，花時間整理想法。",
          },
          {
            id: 'B',
            text: "簡單回幾個字",
            effect: e(1, 0, -1),
            intent: "簡單回覆：省事，能提供的資訊有限",
            result: "省事，能提供的資訊有限。",
          },
          {
            id: 'C',
            text: "跳過不回",
            effect: e(1, -1, 0),
            intent: "不回覆：不費力，少了一次參與",
            result: "不費力，少了一次參與。",
          },
        ],
      },
      {
        id: "M5c",
        title: "下一季計畫",
        situation: "下一季開始前，要決定訂多少，要不要多參加活動。",
        options: [
          {
            id: 'A',
            text: "先小量固定訂購",
            effect: e(1, 0, -1),
            intent: "小量固定：穩定省心，投入有限",
            result: "穩定省心，投入有限。",
          },
          {
            id: 'B',
            text: "擴大訂購，也多參加活動",
            effect: e(-2, 1, 1),
            intent: "積極參與：用得上也用得完，時間會變緊",
            result: "用得上也用得完，時間會變緊。",
          },
          {
            id: 'C',
            text: "先和其他社員討論再決定",
            effect: e(-1, 2, -1),
            intent: "先討論：了解大家想法，決定得比較慢",
            result: "了解大家想法，決定得比較慢。",
          },
        ],
      },
    ],
  },
]
