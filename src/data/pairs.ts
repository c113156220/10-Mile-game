import type { DayStory, PairDialogue } from '../types'

/**
 * 共同故事：每天一件全員都會遇到的事，加上三組兩兩對話（消費者↔小農、社員↔小農、消費者↔社員）。
 * 資料來源：Excel「對話樹表」。每種結果的提問者、回覆者數值變化總和都必須為 0（npm run check 會驗證）。
 * ⚠ 所有內容皆為虛構模擬，尚待合作社校正。
 */
const e = (balance: number, community: number, efficiency: number) => ({ balance, community, efficiency })

export const dayStories: DayStory[] = [
  { day: 1, title: "開團", narration: "合作社這週開了一檔在地米的共同購買。大家都在看，這一檔能不能順利開起來。" },
  { day: 2, title: "價格與數量", narration: "訂單比預期少，價格該怎麼調整，大家都在討論。" },
  { day: 3, title: "貨運延誤", narration: "大雨前夕，原本要來載貨的車延誤，米和菜都堆在原地。" },
  { day: 4, title: "產地小旅行", narration: "合作社這週有一梯產地小旅行，也有學校想來參觀。" },
  { day: 5, title: "一季回顧", narration: "一季過去，大家聚在一起，看看這一季合作社的樣子，也想想下一季。" },
]

export const pairDialogues: PairDialogue[] = [
  {
    id: "T1CF",
    day: 1,
    asker: "consumer",
    replier: "farmer",
    questions: [
      {
        text: "這次的米是怎麼種的？",
        replies: [
          { id: 'A', text: "我簡單跟你說，歡迎來田裡看看。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "說來話長，改天我整理給你。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "我寫一份簡單說明給你。", askerEffect: e(-1, 0, 1), replierEffect: e(-1, 0, 1) },
        ],
      },
      {
        text: "買一份大概多少錢？",
        replies: [
          { id: 'A', text: "寫在訂購頁，你先看看。", askerEffect: e(1, 0, -1), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "我幫你算一下，大概是這個價。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'C', text: "價格要看今年收成，不一定。", askerEffect: e(-1, 0, 1), replierEffect: e(0, -1, 1) },
        ],
      },
      {
        text: "一次可以訂多少？可以只買一點嗎？",
        replies: [
          { id: 'A', text: "可以，小份也沒問題。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "最少要先訂一整份。", askerEffect: e(-1, 0, 1), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "我問問合作社再回你。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  {
    id: "T1MF",
    day: 1,
    asker: "member",
    replier: "farmer",
    questions: [
      {
        text: "這檔米你打算供多少？",
        replies: [
          { id: 'A', text: "我盡量都留給合作社。", askerEffect: e(0, 1, -1), replierEffect: e(-2, 1, 1) },
          { id: 'B', text: "先留一半，看大家要多少。", askerEffect: e(1, 0, -1), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "想先跟你們聊聊需求。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
      {
        text: "有什麼我們可以幫忙的？",
        replies: [
          { id: 'A', text: "幫我宣傳一下就很感謝了。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "週末如果有空，來田裡幫忙。", askerEffect: e(-2, 2, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "謝謝你，目前還應付得來。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
        ],
      },
      {
        text: "今年天氣怎麼樣？米會不會受影響？",
        replies: [
          { id: 'A', text: "目前很穩，放心。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "有點擔心，我還在觀察。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'C', text: "說不準，要再看看。", askerEffect: e(-1, 0, 1), replierEffect: e(1, -1, 0) },
        ],
      },
    ],
  },
  {
    id: "T1CM",
    day: 1,
    asker: "consumer",
    replier: "member",
    questions: [
      {
        text: "你為什麼加入合作社？",
        replies: [
          { id: 'A', text: "想支持在地小農，也認識一些朋友。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "朋友介紹，順便試試看。", askerEffect: e(-1, 1, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "說起來很長，你要不要一起來？", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
      {
        text: "加入要花很多時間嗎？",
        replies: [
          { id: 'A', text: "不用，平常訂購就可以了。", askerEffect: e(1, 0, -1), replierEffect: e(1, -1, 0) },
          { id: 'B', text: "有活動才參加，看你自己。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "有時候要幫忙，但很有成就感。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "我可以先試訂一次嗎？",
        replies: [
          { id: 'A', text: "可以，我帶你下單。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 2, -1) },
          { id: 'B', text: "你看訂購頁，就可以自己下單。", askerEffect: e(0, 1, -1), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "先看看小農的介紹再決定。", askerEffect: e(1, -1, 0), replierEffect: e(0, 1, -1) },
        ],
      },
    ],
  },
  {
    id: "T2CF",
    day: 2,
    asker: "consumer",
    replier: "farmer",
    questions: [
      {
        text: "這次米的價格有變嗎？",
        replies: [
          { id: 'A', text: "有調整一點，希望大家體諒。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "沒變，還是原價。", askerEffect: e(1, 0, -1), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "降了一些，想讓更多人買。", askerEffect: e(1, 0, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "為什麼訂單這麼少？",
        replies: [
          { id: 'A', text: "大家可能還不知道，你幫我分享吧。", askerEffect: e(-1, 2, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "可能是價格的關係。", askerEffect: e(0, 1, -1), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "我也不確定，還在觀察。", askerEffect: e(1, -1, 0), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "可以買小包裝的嗎？",
        replies: [
          { id: 'A', text: "可以，我們有分小包。", askerEffect: e(-1, 0, 1), replierEffect: e(-1, 0, 1) },
          { id: 'B', text: "現在只有大包，下次再說。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "我跟合作社問問，看能不能做。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  {
    id: "T2MF",
    day: 2,
    asker: "member",
    replier: "farmer",
    questions: [
      {
        text: "價格怎麼調整的？",
        replies: [
          { id: 'A', text: "跟經營者談過，我願意降一點。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "我想維持原價，成本在那邊。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "想先看看大家的反應再決定。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "我們怎麼幫你多賣一點？",
        replies: [
          { id: 'A', text: "幫我揪人一起訂。", askerEffect: e(-1, 2, -1), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "幫我貼到群組給更多人看。", askerEffect: e(-1, 1, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "不用，我再想辦法。", askerEffect: e(1, -1, 0), replierEffect: e(-1, 0, 1) },
        ],
      },
      {
        text: "剩下的米要怎麼辦？",
        replies: [
          { id: 'A', text: "做成小包裝，比較好賣。", askerEffect: e(-1, 0, 1), replierEffect: e(-2, 1, 1) },
          { id: 'B', text: "先放著，慢慢賣。", askerEffect: e(1, 0, -1), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "分一些給鄰居，結個緣。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  {
    id: "T2CM",
    day: 2,
    asker: "consumer",
    replier: "member",
    questions: [
      {
        text: "這個價格合理嗎？",
        replies: [
          { id: 'A', text: "我覺得合理，是支持在地。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "有點貴，但吃得出差別。", askerEffect: e(-1, 0, 1), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "我也會比價，看自己的預算。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
        ],
      },
      {
        text: "你們社員會怎麼買？",
        replies: [
          { id: 'A', text: "大家會一起訂，分攤比較省。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 2, -1) },
          { id: 'B', text: "各買各的，看需求。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "有時候會互相交換。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "買了吃不完怎麼辦？",
        replies: [
          { id: 'A', text: "可以分給鄰居或朋友。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
          { id: 'B', text: "冷凍起來慢慢吃。", askerEffect: e(-1, 0, 1), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "我通常先估好再訂。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
        ],
      },
    ],
  },
  {
    id: "T3CF",
    day: 3,
    asker: "consumer",
    replier: "farmer",
    questions: [
      {
        text: "我訂的米什麼時候會到？",
        replies: [
          { id: 'A', text: "車延誤了，可能晚一天。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "我自己載過去，今天就到。", askerEffect: e(1, 0, -1), replierEffect: e(-2, 1, 1) },
          { id: 'C', text: "我再確認一下，馬上回你。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "可以改成自己去取嗎？",
        replies: [
          { id: 'A', text: "可以，我留給你。", askerEffect: e(-1, 1, 0), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "不用麻煩，等我送就好。", askerEffect: e(1, -1, 0), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "雨太大，建議等晴天再來。", askerEffect: e(1, -1, 0), replierEffect: e(0, 1, -1) },
        ],
      },
      {
        text: "米會不會因為延誤壞掉？",
        replies: [
          { id: 'A', text: "不會，米比較耐放，放心。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "我有做防潮，應該沒問題。", askerEffect: e(1, 0, -1), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "我也在擔心，先趕快處理。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  {
    id: "T3MF",
    day: 3,
    asker: "member",
    replier: "farmer",
    questions: [
      {
        text: "貨車延誤，需要我幫忙載嗎？",
        replies: [
          { id: 'A', text: "好，麻煩你。", askerEffect: e(-2, 2, 0), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "我自己想辦法，謝謝你。", askerEffect: e(1, -1, 0), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "只要幫我通知大家改期就好。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
        ],
      },
      {
        text: "貨放在哪裡比較安全？",
        replies: [
          { id: 'A', text: "放在倉庫，我已經蓋好了。", askerEffect: e(1, 0, -1), replierEffect: e(-1, 0, 1) },
          { id: 'B', text: "放在田邊的棚子，雨應該淋不到。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "我正在搬，你來看看。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "要不要通知大家延遲？",
        replies: [
          { id: 'A', text: "要，我先發通知。", askerEffect: e(0, 1, -1), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "拜託你幫我發。", askerEffect: e(-1, 1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "先不要，我怕大家擔心。", askerEffect: e(1, -1, 0), replierEffect: e(0, -1, 1) },
        ],
      },
    ],
  },
  {
    id: "T3CM",
    day: 3,
    asker: "consumer",
    replier: "member",
    questions: [
      {
        text: "取貨時間要改嗎？",
        replies: [
          { id: 'A', text: "要改，我們會再通知。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "照原本時間，你看狀況。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "改到週末，比較方便。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 0, 1) },
        ],
      },
      {
        text: "我可以幫忙嗎？",
        replies: [
          { id: 'A', text: "可以，一起去載貨。", askerEffect: e(-2, 2, 0), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "謝謝，有需要再找你。", askerEffect: e(1, -1, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "幫我傳訊息給其他人。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
        ],
      },
      {
        text: "這種狀況常常發生嗎？",
        replies: [
          { id: 'A', text: "不常，但偶爾會。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "天氣不好時比較常見。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'C', text: "大家都學著互相體諒。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  {
    id: "T4CF",
    day: 4,
    asker: "consumer",
    replier: "farmer",
    questions: [
      {
        text: "我想去田裡看看，可以嗎？",
        replies: [
          { id: 'A', text: "可以，歡迎你來。", askerEffect: e(-2, 2, 0), replierEffect: e(-2, 2, 0) },
          { id: 'B', text: "這次先不開放，下次再說。", askerEffect: e(1, -1, 0), replierEffect: e(2, -1, -1) },
          { id: 'C', text: "小規模可以，你先跟經營者報名。", askerEffect: e(-1, 1, 0), replierEffect: e(0, 1, -1) },
        ],
      },
      {
        text: "去田裡要準備什麼？",
        replies: [
          { id: 'A', text: "穿好走的鞋，戴帽子。", askerEffect: e(-1, 0, 1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "帶水壺，田裡沒有販賣。", askerEffect: e(-1, 0, 1), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "不用準備，我們都會安排。", askerEffect: e(1, 0, -1), replierEffect: e(-1, 0, 1) },
        ],
      },
      {
        text: "可以順便試吃嗎？",
        replies: [
          { id: 'A', text: "可以，我準備一些給大家嚐。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "看當天收成，不一定。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "可以，但要先報名，人數有限。", askerEffect: e(-1, 0, 1), replierEffect: e(0, 1, -1) },
        ],
      },
    ],
  },
  {
    id: "T4MF",
    day: 4,
    asker: "member",
    replier: "farmer",
    questions: [
      {
        text: "這次旅行要我們幫忙什麼？",
        replies: [
          { id: 'A', text: "當天幫忙帶隊。", askerEffect: e(-2, 2, 0), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "幫我招呼一下客人。", askerEffect: e(-1, 1, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "不用，我一個人可以。", askerEffect: e(1, -1, 0), replierEffect: e(-1, 0, 1) },
        ],
      },
      {
        text: "要不要事先練習導覽？",
        replies: [
          { id: 'A', text: "好，先走一遍。", askerEffect: e(-2, 1, 1), replierEffect: e(-1, 0, 1) },
          { id: 'B', text: "我自己講就好。", askerEffect: e(1, -1, 0), replierEffect: e(1, 0, -1) },
          { id: 'C', text: "找經營者一起規劃。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 2, -1) },
        ],
      },
      {
        text: "學校想來參觀，怎麼辦？",
        replies: [
          { id: 'A', text: "可以安排，另外找一天。", askerEffect: e(-1, 1, 0), replierEffect: e(-2, 2, 0) },
          { id: 'B', text: "這次先不要，人太多。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "分批，一次幾位就好。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
        ],
      },
    ],
  },
  {
    id: "T4CM",
    day: 4,
    asker: "consumer",
    replier: "member",
    questions: [
      {
        text: "你有去過產地旅行嗎？",
        replies: [
          { id: 'A', text: "去過，很值得。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "還沒去過，這次想去。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "看時間，不一定。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
        ],
      },
      {
        text: "要多少錢？",
        replies: [
          { id: 'A', text: "費用我幫你問清楚。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "大概一般旅行的價位。", askerEffect: e(1, 0, -1), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "不太貴，也包含體驗。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "可以一起去嗎？",
        replies: [
          { id: 'A', text: "好，我們一起報名。", askerEffect: e(-2, 2, 0), replierEffect: e(-2, 2, 0) },
          { id: 'B', text: "我這次有事，下次吧。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "你先去，回來跟我說。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
        ],
      },
    ],
  },
  {
    id: "T5CF",
    day: 5,
    asker: "consumer",
    replier: "farmer",
    questions: [
      {
        text: "下一季你會種什麼？",
        replies: [
          { id: 'A', text: "繼續種米，也想試新的。", askerEffect: e(0, 1, -1), replierEffect: e(-1, 0, 1) },
          { id: 'B', text: "維持現狀，比較安心。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "看大家想吃什麼。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
      {
        text: "我要怎麼持續支持你？",
        replies: [
          { id: 'A', text: "固定每週來買。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
          { id: 'B', text: "幫我分享給朋友。", askerEffect: e(-1, 2, -1), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "有空來看看就好。", askerEffect: e(1, -1, 0), replierEffect: e(0, 1, -1) },
        ],
      },
      {
        text: "這一季你過得怎麼樣？",
        replies: [
          { id: 'A', text: "很累，但很值得。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
          { id: 'B', text: "穩穩的，沒有太大波動。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "有點辛苦，需要更多人幫忙。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  {
    id: "T5MF",
    day: 5,
    asker: "member",
    replier: "farmer",
    questions: [
      {
        text: "這一季合作得怎麼樣？",
        replies: [
          { id: 'A', text: "很好，希望下一季繼續。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "還不錯，但訂單量可以再多。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "有點辛苦，希望多些人手。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
      {
        text: "下一季想怎麼合作？",
        replies: [
          { id: 'A', text: "固定每週出貨，大家好安排。", askerEffect: e(-1, 0, 1), replierEffect: e(-1, 0, 1) },
          { id: 'B', text: "多辦幾次活動。", askerEffect: e(-2, 2, 0), replierEffect: e(-2, 2, 0) },
          { id: 'C', text: "先維持這樣就好。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
        ],
      },
      {
        text: "盈餘怎麼分，你了解嗎？",
        replies: [
          { id: 'A', text: "經營者說明過，依章程。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "還不太清楚，想聽聽說明。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 0, 1) },
          { id: 'C', text: "不太關心，看經營者安排。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
        ],
      },
    ],
  },
  {
    id: "T5CM",
    day: 5,
    asker: "consumer",
    replier: "member",
    questions: [
      {
        text: "這一季你過得怎麼樣？",
        replies: [
          { id: 'A', text: "比以前更熟了，覺得不錯。", askerEffect: e(0, 1, -1), replierEffect: e(0, 1, -1) },
          { id: 'B', text: "還在適應，慢慢來。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "很忙，但覺得有意義。", askerEffect: e(-1, 1, 0), replierEffect: e(-1, 1, 0) },
        ],
      },
      {
        text: "我要不要正式加入？",
        replies: [
          { id: 'A', text: "歡迎，我帶你辦入社。", askerEffect: e(-2, 2, 0), replierEffect: e(-1, 2, -1) },
          { id: 'B', text: "先多逛幾次再決定。", askerEffect: e(1, -1, 0), replierEffect: e(0, 1, -1) },
          { id: 'C', text: "你可以先每週固定買看看。", askerEffect: e(-1, 1, 0), replierEffect: e(1, 0, -1) },
        ],
      },
      {
        text: "下一季你有什麼計畫？",
        replies: [
          { id: 'A', text: "想多參加活動。", askerEffect: e(-1, 1, 0), replierEffect: e(-2, 2, 0) },
          { id: 'B', text: "維持現在就好。", askerEffect: e(1, -1, 0), replierEffect: e(1, -1, 0) },
          { id: 'C', text: "想找朋友一起加入。", askerEffect: e(-1, 2, -1), replierEffect: e(-1, 2, -1) },
        ],
      },
    ],
  },
]
