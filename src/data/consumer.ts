import type { DayPlan } from '../types'

/**
 * 消費者 5 天劇情（固定版）。
 * ⚠ 所有情節都是虛構模擬，尚待合作社校正，不代表合作社真實事件。
 * 資料來源：Excel 場景表（編號 C…）。每個選項三項變化總和必須為 0（npm run check 會驗證）。
 */
const e = (balance: number, community: number, efficiency: number) => ({ balance, community, efficiency })

export const consumerDays: DayPlan[] = [
  {
    day: 1,
    events: [
      {
        id: "C1",
        title: "午餐吃什麼",
        situation: "中午肚子餓，手機上同時有外送優惠和合作社的便當訂購連結。",
        options: [
          {
            id: 'A',
            text: "點外送，最快最方便",
            effect: e(1, -1, 0),
            intent: "選最方便的：省時間，和在地的連結變少",
            result: "省時間，和在地的連結變少。",
          },
          {
            id: 'B',
            text: "訂合作社的便當",
            effect: e(0, 1, -1),
            intent: "嘗試在地便當：吃得安心，要提前訂、價格略高",
            result: "吃得安心，要提前訂、價格略高。",
          },
          {
            id: 'C',
            text: "自己帶，吃昨天的剩菜",
            effect: e(-1, 0, 1),
            intent: "吃剩菜：不浪費，但準備麻煩",
            result: "不浪費，但準備麻煩。",
          },
        ],
      },
      {
        id: "C1b",
        title: "路過市集",
        situation: "下班路上，你看到一個小農市集正在擺攤。",
        options: [
          {
            id: 'A',
            text: "停下來逛逛，買幾樣菜",
            effect: e(-1, 1, 0),
            intent: "逛市集：認識攤主，花了時間",
            result: "認識攤主，花了時間。",
          },
          {
            id: 'B',
            text: "拍張照就走",
            effect: e(1, 0, -1),
            intent: "只看不買：省時間，沒有實際參與",
            result: "省時間，沒有實際參與。",
          },
          {
            id: 'C',
            text: "問攤主這些菜怎麼煮",
            effect: e(-1, 2, -1),
            intent: "多聊幾句：建立連結，要花時間",
            result: "建立連結，要花時間。",
          },
        ],
      },
      {
        id: "C1c",
        title: "宣傳傳單",
        situation: "你收到一張介紹十里方圓合作社的傳單。",
        options: [
          {
            id: 'A',
            text: "掃 QR code 看看",
            effect: e(-1, 1, 0),
            intent: "主動了解：多認識合作社，花一點時間",
            result: "多認識合作社，花一點時間。",
          },
          {
            id: 'B',
            text: "先收起來，之後再說",
            effect: e(1, 0, -1),
            intent: "先放著：沒負擔，可能就忘了",
            result: "沒負擔，可能就忘了。",
          },
          {
            id: 'C',
            text: "拍給朋友問有沒有興趣",
            effect: e(-1, 2, -1),
            intent: "分享給朋友：多一點互動，要花時間聊",
            result: "多一點互動，要花時間聊。",
          },
        ],
      },
    ],
  },
  {
    day: 2,
    events: [
      {
        id: "C2",
        title: "蔬菜包要不要",
        situation: "合作社推出每週蔬菜包，你猶豫要不要訂。",
        options: [
          {
            id: 'A',
            text: "訂一個試試看",
            effect: e(-1, 1, 0),
            intent: "嘗試訂購：支持在地，要自己處理食材",
            result: "支持在地，要自己處理食材。",
          },
          {
            id: 'B',
            text: "不訂，維持現在的飲食",
            effect: e(1, -1, 0),
            intent: "維持現狀：輕鬆，少了嘗試",
            result: "輕鬆，少了嘗試。",
          },
          {
            id: 'C',
            text: "先問家人需不需要",
            effect: e(-1, 1, 0),
            intent: "先問再決定：避免買太多，要花時間討論",
            result: "避免買太多，要花時間討論。",
          },
        ],
      },
      {
        id: "C2b",
        title: "朋友的推薦",
        situation: "朋友說他最近都買在地小農的菜，覺得比較好吃。",
        options: [
          {
            id: 'A',
            text: "也想試試看",
            effect: e(0, 1, -1),
            intent: "被說服嘗試：願意改變，花費可能增加",
            result: "願意改變，花費可能增加。",
          },
          {
            id: 'B',
            text: "覺得貴，還是算了",
            effect: e(1, -1, 0),
            intent: "覺得負擔大：省錢，少了嘗試",
            result: "省錢，少了嘗試。",
          },
          {
            id: 'C',
            text: "請朋友帶你一起買",
            effect: e(-1, 2, -1),
            intent: "和朋友一起：有人帶比較安心，要配合時間",
            result: "有人帶比較安心，要配合時間。",
          },
        ],
      },
      {
        id: "C2c",
        title: "外送還是自煮",
        situation: "今晚很累，家裡冰箱還有菜，但外送比較省事。",
        options: [
          {
            id: 'A',
            text: "叫外送，菜明天再說",
            effect: e(1, -1, 0),
            intent: "選擇方便：省力，冰箱的菜可能放壞",
            result: "省力，冰箱的菜可能放壞。",
          },
          {
            id: 'B',
            text: "簡單煮一下，把菜用掉",
            effect: e(-1, 0, 1),
            intent: "自己煮：減少浪費，要花力氣",
            result: "減少浪費，要花力氣。",
          },
          {
            id: 'C',
            text: "請家人幫忙一起煮",
            effect: e(-1, 2, -1),
            intent: "一起煮：增加互動，要協調分工",
            result: "增加互動，要協調分工。",
          },
        ],
      },
    ],
  },
  {
    day: 3,
    events: [
      {
        id: "C3",
        title: "吃不完的菜",
        situation: "上次買的菜還剩很多，你不確定怎麼處理。",
        options: [
          {
            id: 'A',
            text: "上網查食譜把它煮完",
            effect: e(-1, 0, 1),
            intent: "想辦法用完：不浪費，要花時間",
            result: "不浪費，要花時間。",
          },
          {
            id: 'B',
            text: "分給鄰居或同事",
            effect: e(-1, 2, -1),
            intent: "分享出去：多一份人情，要花時間聯絡",
            result: "多一份人情，要花時間聯絡。",
          },
          {
            id: 'C',
            text: "放著，有空再說",
            effect: e(1, -1, 0),
            intent: "先不處理：省事，可能壞掉",
            result: "省事，可能壞掉。",
          },
        ],
      },
      {
        id: "C3b",
        title: "小農的故事",
        situation: "你在網路上看到一位小農介紹自己種的菜。",
        options: [
          {
            id: 'A',
            text: "認真看完，留言支持",
            effect: e(-1, 1, 0),
            intent: "花時間了解與支持：多一份連結",
            result: "多一份連結。",
          },
          {
            id: 'B',
            text: "按個讚就滑過去",
            effect: e(1, 0, -1),
            intent: "輕鬆互動：省時間，參與很淺",
            result: "省時間，參與很淺。",
          },
          {
            id: 'C',
            text: "轉給朋友看",
            effect: e(-1, 2, -1),
            intent: "分享給朋友：擴大關注，要花時間",
            result: "擴大關注，要花時間。",
          },
        ],
      },
      {
        id: "C3c",
        title: "預算有限",
        situation: "這週花費比較多，你想檢查要不要省一點。",
        options: [
          {
            id: 'A',
            text: "減少買菜的預算",
            effect: e(1, -1, 0),
            intent: "省錢：減輕壓力，少了支持在地",
            result: "減輕壓力，少了支持在地。",
          },
          {
            id: 'B',
            text: "維持不變，省別的地方",
            effect: e(-1, 1, 0),
            intent: "維持支持：要在生活其他地方節省",
            result: "要在生活其他地方節省。",
          },
          {
            id: 'C',
            text: "和家人討論怎麼分配",
            effect: e(-1, 1, 0),
            intent: "一起討論：決定比較合理，要花時間",
            result: "決定比較合理，要花時間。",
          },
        ],
      },
    ],
  },
  {
    day: 4,
    events: [
      {
        id: "C4",
        title: "包裝垃圾",
        situation: "你發現這週的外送和網購，垃圾量變得很多。",
        options: [
          {
            id: 'A',
            text: "下次自備餐具袋",
            effect: e(-1, 0, 1),
            intent: "改變習慣：減少浪費，要多準備",
            result: "減少浪費，要多準備。",
          },
          {
            id: 'B',
            text: "覺得只是小事，不理它",
            effect: e(1, 0, -1),
            intent: "不處理：省事，浪費持續",
            result: "省事，浪費持續。",
          },
          {
            id: 'C',
            text: "問店家有沒有簡單包裝",
            effect: e(-1, 1, 0),
            intent: "主動詢問：互動增加，要花力氣",
            result: "互動增加，要花力氣。",
          },
        ],
      },
      {
        id: "C4b",
        title: "週末活動邀請",
        situation: "有人邀你參加週末的產地參觀或社區活動。",
        options: [
          {
            id: 'A',
            text: "報名參加",
            effect: e(-2, 2, 0),
            intent: "參加活動：認識人與產地，犧牲休息",
            result: "認識人與產地，犧牲休息。",
          },
          {
            id: 'B',
            text: "這次先不去",
            effect: e(2, -1, -1),
            intent: "選擇休息：養足精神，少了體驗",
            result: "養足精神，少了體驗。",
          },
          {
            id: 'C',
            text: "看看活動資訊，晚點決定",
            effect: e(0, 0, 0),
            intent: "先觀望：不做決定，也沒有影響",
            result: "不做決定，也沒有影響。",
          },
        ],
      },
      {
        id: "C4c",
        title: "價格比較",
        situation: "你拿合作社的價格，和超市同樣的東西比一比。",
        options: [
          {
            id: 'A',
            text: "覺得值得，願意多付一點",
            effect: e(0, 1, -1),
            intent: "願意多付：支持理念，花費較多",
            result: "支持理念，花費較多。",
          },
          {
            id: 'B',
            text: "只買最便宜的",
            effect: e(1, -1, 0),
            intent: "選最便宜：省錢，沒有支持在地",
            result: "省錢，沒有支持在地。",
          },
          {
            id: 'C',
            text: "兩邊都買一點，看情況",
            effect: e(0, 0, 0),
            intent: "混合選擇：不偏不倚，沒有明顯變化",
            result: "不偏不倚，沒有明顯變化。",
          },
        ],
      },
    ],
  },
  {
    day: 5,
    events: [
      {
        id: "C5",
        title: "一週回顧",
        situation: "一週過去，你想想自己這幾天的選擇。",
        options: [
          {
            id: 'A',
            text: "維持目前的生活就好",
            effect: e(1, -1, 0),
            intent: "維持現狀：安心省力，少了新嘗試",
            result: "安心省力，少了新嘗試。",
          },
          {
            id: 'B',
            text: "多做一點小改變",
            effect: e(-1, 1, 0),
            intent: "小改變：多一點參與，要花力氣",
            result: "多一點參與，要花力氣。",
          },
          {
            id: 'C',
            text: "找朋友一起改變",
            effect: e(-1, 2, -1),
            intent: "邀人同行：擴大影響，要花時間",
            result: "擴大影響，要花時間。",
          },
        ],
      },
      {
        id: "C5b",
        title: "要不要分享",
        situation: "你想不想把這幾天的經驗告訴別人。",
        options: [
          {
            id: 'A',
            text: "發一則動態分享",
            effect: e(-1, 1, 0),
            intent: "主動分享：讓更多人知道，要花時間",
            result: "讓更多人知道，要花時間。",
          },
          {
            id: 'B',
            text: "只跟親近的朋友說",
            effect: e(0, 1, -1),
            intent: "小範圍分享：自然溫和，影響有限",
            result: "自然溫和，影響有限。",
          },
          {
            id: 'C',
            text: "不特別說，自己知道就好",
            effect: e(1, -1, 0),
            intent: "自己留著：不費力，沒有擴散",
            result: "不費力，沒有擴散。",
          },
        ],
      },
      {
        id: "C5c",
        title: "下週的習慣",
        situation: "下週開始，你想訂一個固定的習慣。",
        options: [
          {
            id: 'A',
            text: "固定每週買一次在地的菜",
            effect: e(-1, 1, 0),
            intent: "固定採買：有規律的支持，要安排時間",
            result: "有規律的支持，要安排時間。",
          },
          {
            id: 'B',
            text: "想到再買就好",
            effect: e(1, -1, 0),
            intent: "隨緣：自由，容易斷掉",
            result: "自由，容易斷掉。",
          },
          {
            id: 'C',
            text: "先設定小目標，再慢慢加",
            effect: e(0, 0, 0),
            intent: "小步前進：穩定緩慢，沒有明顯變化",
            result: "穩定緩慢，沒有明顯變化。",
          },
        ],
      },
    ],
  },
]
