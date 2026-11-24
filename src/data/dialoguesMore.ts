import type { Dialogue } from '../types'

/**
 * 其餘事件的角色對話：每個事件都有一位其他角色出現，各 1 輪（角色說一句、玩家三選一、角色回應）。
 * 小農的 D1c、D2、D4 為 3 輪版本，在 dialogues.ts。
 * 每個回覆的數值變化總和為 0，疊加在事件選項之上。
 * ⚠ 尚待合作社校正，皆為虛構。
 */
const e = (balance: number, community: number, efficiency: number) => ({ balance, community, efficiency })

export const moreDialogues: Record<string, Dialogue> = {
  "D1": {
    npcRoleId: "consumer",
    rounds: [
      {
        line: "聽說你今天菜收很多，有沒有多的可以賣我一些？",
        replies: [
          { id: "A", text: "有，我現在先留一袋給你", reply: "太好了，我傍晚去拿！", effect: e(-1, 1, 0) },
          { id: "B", text: "今天太忙，改天吧", reply: "好，那我下次再問你。", effect: e(1, -1, 0) },
          { id: "C", text: "先留一小袋，其他我還有安排", reply: "一小袋就夠了，謝謝。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D1b": {
    npcRoleId: "retiree",
    rounds: [
      {
        line: "我路過看到你的菜葉被蟲咬了，要不要我過來幫你看看？",
        replies: [
          { id: "A", text: "好，麻煩你過來看", reply: "我年輕時也種過，一起來想辦法。", effect: e(-1, 1, 0) },
          { id: "B", text: "不用，我自己處理就好", reply: "好，有需要再叫我。", effect: e(1, -1, 0) },
          { id: "C", text: "你先告訴我怎麼處理就好", reply: "簡單說，先把受害的葉子摘掉。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D2b": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "你要出貨的箱子不夠？我們這邊有一些備用的，你要先拿去用嗎？",
        replies: [
          { id: "A", text: "好，我現在過去拿", reply: "沒問題，我先幫你留著。", effect: e(-1, 1, 0) },
          { id: "B", text: "我自己再想辦法", reply: "好，需要的話再說。", effect: e(1, -1, 0) },
          { id: "C", text: "只先借一部分，下次還你", reply: "可以，這樣大家都方便。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D2c": {
    npcRoleId: "student",
    rounds: [
      {
        line: "我們社團想去田裡看看，可以開放一天讓我們參觀嗎？",
        replies: [
          { id: "A", text: "好，我來排一個時間", reply: "太好了，我們會準時到！", effect: e(-1, 1, 0) },
          { id: "B", text: "這陣子比較忙，可能要延後", reply: "沒關係，我們可以再等。", effect: e(1, -1, 0) },
          { id: "C", text: "先小規模，一次來幾個人", reply: "好，我們分批去。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D3a": {
    npcRoleId: "member",
    rounds: [
      {
        line: "聽說明天會下大雨，你田裡的菜需要人手幫忙採嗎？",
        replies: [
          { id: "A", text: "好，今天傍晚一起採", reply: "沒問題，我下班就過去。", effect: e(-1, 1, 0) },
          { id: "B", text: "我自己採得完，謝謝你", reply: "好，那你小心安全。", effect: e(1, -1, 0) },
          { id: "C", text: "幫我採最急的那一區就好", reply: "好，我先幫你把那區做完。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D3b": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "貨車那邊說要晚一點才到，我們先想想看怎麼辦？",
        replies: [
          { id: "A", text: "我自己把菜先送到合作社", reply: "好，我幫你準備收貨的位置。", effect: e(-2, 1, 1) },
          { id: "B", text: "再等一下，看車什麼時候來", reply: "好，我再幫你跟車行確認。", effect: e(1, 0, -1) },
          { id: "C", text: "請你幫我找附近有車的人", reply: "好，我來問問大家。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D3c": {
    npcRoleId: "retiree",
    rounds: [
      {
        line: "我家有一把類似的工具，你要不要先借去用？",
        replies: [
          { id: "A", text: "好，我現在去拿", reply: "沒問題，用完再還我就好。", effect: e(-1, 1, 0) },
          { id: "B", text: "不用，我自己想辦法", reply: "好，你需要再說。", effect: e(1, -1, 0) },
          { id: "C", text: "借我用一天就好", reply: "好，明天我來拿回來。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D4b": {
    npcRoleId: "student",
    rounds: [
      {
        line: "老師說想帶學生來參觀，我先來問問可以帶多少人？",
        replies: [
          { id: "A", text: "可以，我來安排導覽", reply: "太好了，我們會好好準備問題。", effect: e(-2, 2, 0) },
          { id: "B", text: "這週不太方便，下次再說", reply: "沒關係，我們之後再約。", effect: e(1, -1, 0) },
          { id: "C", text: "人數少一點，我簡單帶你們看", reply: "這樣就很好，謝謝。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D4c": {
    npcRoleId: "parent",
    rounds: [
      {
        line: "最近天氣轉涼，菜價會不會有變動啊？",
        replies: [
          { id: "A", text: "我跟你說最新的收成狀況", reply: "謝謝你，這樣我比較知道怎麼買。", effect: e(-1, 1, 0) },
          { id: "B", text: "我還不確定，晚點再說", reply: "好，有消息再告訴我。", effect: e(1, -1, 0) },
          { id: "C", text: "先給你一個大概的範圍", reply: "這樣就夠了，謝謝。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D5": {
    npcRoleId: "member",
    rounds: [
      {
        line: "下一季你打算種什麼？我們想看看有沒有什麼想吃的。",
        replies: [
          { id: "A", text: "我們可以一起討論", reply: "太好了，我來統計大家的想法。", effect: e(-1, 2, -1) },
          { id: "B", text: "我已經有想法了", reply: "好，那我們等你的消息。", effect: e(1, -1, 0) },
          { id: "C", text: "我先留一小塊地試新的", reply: "好，這樣很有趣。", effect: e(-1, 0, 1) },
        ],
      },
    ],
  },
  "D5b": {
    npcRoleId: "retiree",
    rounds: [
      {
        line: "我們幾個鄰居想把大家種的東西列個清單，你要加入嗎？",
        replies: [
          { id: "A", text: "好，一起列清單", reply: "太好了，這樣大家比較不會撞種。", effect: e(-1, 1, 0) },
          { id: "B", text: "我自己有安排，不用了", reply: "好，那我們就不排你。", effect: e(1, -1, 0) },
          { id: "C", text: "先給我看看再決定", reply: "好，我先拿給你。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D5c": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "聽說你有一塊地連續種了很多季，要不要讓它休息一下？",
        replies: [
          { id: "A", text: "好，我讓它休息一季", reply: "那我們把這批菜的量先調整一下。", effect: e(1, 0, -1) },
          { id: "B", text: "我再種一季，看情況", reply: "好，你自己判斷。", effect: e(-1, 0, 1) },
          { id: "C", text: "請你介紹有經驗的人給我", reply: "好，我幫你問問看。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "M1": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "這週的共同購買清單出來了，你有沒有想訂的？",
        replies: [
          { id: "A", text: "有，我現在挑幾樣", reply: "好，我先幫你記下來。", effect: e(-1, 0, 1) },
          { id: "B", text: "我今天比較累，明天再看", reply: "好，截止前再來找我。", effect: e(1, -1, 0) },
          { id: "C", text: "我問問朋友要不要一起", reply: "好，人多比較有折扣。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "M1b": {
    npcRoleId: "worker",
    rounds: [
      {
        line: "這週末有社員聚會，你要不要來？我也會去。",
        replies: [
          { id: "A", text: "好，我一定去", reply: "太好了，到時候見！", effect: e(-2, 2, 0) },
          { id: "B", text: "我要先買菜，去不了", reply: "好，下次再約。", effect: e(1, -1, 0) },
          { id: "C", text: "我晚點過去待一下", reply: "好，那我幫你留位置。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "M1c": {
    npcRoleId: "parent",
    rounds: [
      {
        line: "我看到你上週買了很多菜，吃得完嗎？",
        replies: [
          { id: "A", text: "正在煩惱怎麼吃", reply: "我家也有煮不完的，可以交換食譜。", effect: e(-1, 1, 0) },
          { id: "B", text: "沒關係，我慢慢吃", reply: "好，別浪費就好。", effect: e(1, -1, 0) },
          { id: "C", text: "分一些給你好嗎？", reply: "好啊，謝謝你！", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "M2": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "最近菜價漲了一點，你還會訂嗎？",
        replies: [
          { id: "A", text: "會，我支持你", reply: "謝謝，我會努力讓菜更好。", effect: e(0, 1, -1) },
          { id: "B", text: "我先少買一點", reply: "理解，大家都要顧荷包。", effect: e(1, -1, 0) },
          { id: "C", text: "能不能算便宜一點？", reply: "我再算看看，不一定能少很多。", effect: e(1, 0, -1) },
        ],
      },
    ],
  },
  "M2b": {
    npcRoleId: "student",
    rounds: [
      {
        line: "我們這次要辦產地小旅行，你要不要一起來？",
        replies: [
          { id: "A", text: "好，我報名", reply: "太好了，那天見！", effect: e(-2, 2, 0) },
          { id: "B", text: "這次想休息", reply: "好，下次再約。", effect: e(2, -1, -1) },
          { id: "C", text: "我問問朋友", reply: "好，有人想去就跟我說。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "M2c": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "這次取貨時間在平日傍晚，你方便嗎？",
        replies: [
          { id: "A", text: "我提早下班來取", reply: "好，我幫你把貨留好。", effect: e(-2, 1, 1) },
          { id: "B", text: "可以請人代取嗎？", reply: "可以，只要帶訂單編號。", effect: e(0, 1, -1) },
          { id: "C", text: "我這次先不取，可以嗎？", reply: "可以，但菜要早點領走。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
  "M3": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "聽說你這次拿到的菜不太新鮮，真的很抱歉。",
        replies: [
          { id: "A", text: "沒關係，但希望你能改進", reply: "謝謝你告訴我，我會注意。", effect: e(-1, 1, 0) },
          { id: "B", text: "沒事，我自己處理了", reply: "好，下次我會更小心。", effect: e(1, -1, 0) },
          { id: "C", text: "我想知道怎麼保存比較好", reply: "好，我告訴你幾個方法。", effect: e(-1, 0, 1) },
        ],
      },
    ],
  },
  "M3b": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "你想買的菜這週賣完了，真的不好意思。",
        replies: [
          { id: "A", text: "沒關係，那我改買別的", reply: "謝謝你體諒，下次我先留給你。", effect: e(-1, 0, 1) },
          { id: "B", text: "我去別的地方買", reply: "好，下次再來。", effect: e(1, -1, 0) },
          { id: "C", text: "有沒有其他人還有多的？", reply: "我幫你問問看。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "M3c": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "對帳這邊我可以跟你一起核對，你要不要來看看？",
        replies: [
          { id: "A", text: "好，我們一起看", reply: "好，我拿帳單過來。", effect: e(-1, 1, 0) },
          { id: "B", text: "我自己再算一次就好", reply: "好，有問題再找我。", effect: e(-1, 0, 1) },
          { id: "C", text: "差不多就好，不追究了", reply: "好，如果有問題隨時說。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
  "M4": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "這個週末分裝需要人手，你有空來幫忙嗎？",
        replies: [
          { id: "A", text: "好，我來幫忙", reply: "太好了，那天辛苦你了。", effect: e(-2, 2, 0) },
          { id: "B", text: "這次沒空，下次再說", reply: "沒關係，下次再邀你。", effect: e(1, -1, 0) },
          { id: "C", text: "我只能來一小段時間", reply: "好，這樣也很有幫助。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "M4b": {
    npcRoleId: "parent",
    rounds: [
      {
        line: "你為什麼要特地買合作社的菜？超市不是更方便嗎？",
        replies: [
          { id: "A", text: "我跟你說我的想法", reply: "原來是這樣，我也想多了解。", effect: e(-1, 1, 0) },
          { id: "B", text: "就是比較新鮮", reply: "好吧，那我也試試看。", effect: e(1, 0, -1) },
          { id: "C", text: "下次一起去取貨好嗎？", reply: "好，我跟你去看看。", effect: e(-2, 1, 1) },
        ],
      },
    ],
  },
  "M4c": {
    npcRoleId: "worker",
    rounds: [
      {
        line: "這個月開銷我也很緊，你有想省哪些地方嗎？",
        replies: [
          { id: "A", text: "我想減少訂購量", reply: "嗯，我也在想這件事。", effect: e(1, -1, 0) },
          { id: "B", text: "訂購維持，省別的", reply: "好辦法，我也想試試。", effect: e(-1, 1, 0) },
          { id: "C", text: "要不要一起分攤？", reply: "好啊，我們來試試看。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "M5": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "這一季你覺得跟合作社的合作怎麼樣？",
        replies: [
          { id: "A", text: "維持這樣就很好", reply: "好，那我們繼續這樣。", effect: e(1, -1, 0) },
          { id: "B", text: "想多參加活動", reply: "太好了，我們歡迎你。", effect: e(-2, 2, 0) },
          { id: "C", text: "想找朋友一起加入", reply: "好，人多更熱鬧。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "M5b": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "這一季有什麼建議嗎？我們很想聽你的想法。",
        replies: [
          { id: "A", text: "我認真寫下來", reply: "謝謝，我們會看的。", effect: e(-1, 1, 0) },
          { id: "B", text: "簡單說幾句", reply: "好，也謝謝你。", effect: e(1, 0, -1) },
          { id: "C", text: "沒有特別想說的", reply: "好，有需要隨時告訴我們。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
  "M5c": {
    npcRoleId: "retiree",
    rounds: [
      {
        line: "下一季你打算怎麼參與？我們想問問大家的看法。",
        replies: [
          { id: "A", text: "先小量固定訂", reply: "好，這樣很穩。", effect: e(1, 0, -1) },
          { id: "B", text: "擴大訂購，多參加活動", reply: "好，那我們一起來。", effect: e(-2, 1, 1) },
          { id: "C", text: "先跟大家討論再決定", reply: "好，我們來聊聊。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C1": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "今天有合作社便當可以訂，你要不要試試？",
        replies: [
          { id: "A", text: "好，我訂一份", reply: "好，我幫你登記。", effect: e(0, 1, -1) },
          { id: "B", text: "我今天先點外送", reply: "好，下次再試試。", effect: e(1, -1, 0) },
          { id: "C", text: "我自己帶吃的就好", reply: "好，保重身體。", effect: e(-1, 0, 1) },
        ],
      },
    ],
  },
  "C1b": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "要不要看看今天的菜？剛採的，很新鮮。",
        replies: [
          { id: "A", text: "好，我來挑幾樣", reply: "來，我幫你推薦。", effect: e(-1, 1, 0) },
          { id: "B", text: "我只是看看，謝謝", reply: "好，歡迎下次再來。", effect: e(1, 0, -1) },
          { id: "C", text: "你告訴我這個怎麼煮好嗎？", reply: "好，我跟你說幾個簡單的作法。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C1c": {
    npcRoleId: "member",
    rounds: [
      {
        line: "你有看到那張傳單嗎？我是合作社的社員，可以跟你介紹一下。",
        replies: [
          { id: "A", text: "好，我想聽聽看", reply: "太好了，我簡單說一下。", effect: e(-1, 1, 0) },
          { id: "B", text: "我先拿著，再說", reply: "好，有需要再找我。", effect: e(1, 0, -1) },
          { id: "C", text: "我拍給朋友看看", reply: "好，如果朋友有興趣，我也可以說明。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C2": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "合作社有每週蔬菜包，你要不要先訂一個試試看？",
        replies: [
          { id: "A", text: "好，先訂一個", reply: "好，我幫你登記。", effect: e(-1, 1, 0) },
          { id: "B", text: "我還是維持現在的飲食", reply: "好，需要時再找我。", effect: e(1, -1, 0) },
          { id: "C", text: "我問問家人再決定", reply: "好，你問完再告訴我。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "C2b": {
    npcRoleId: "member",
    rounds: [
      {
        line: "我最近都買在地小農的菜，你要不要也試試？",
        replies: [
          { id: "A", text: "好啊，我也想試試", reply: "太好了，我帶你去。", effect: e(0, 1, -1) },
          { id: "B", text: "覺得有點貴，還是算了", reply: "理解，大家都有預算要顧。", effect: e(1, -1, 0) },
          { id: "C", text: "你帶我一起去買好嗎？", reply: "好，我下次約你。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C2c": {
    npcRoleId: "parent",
    rounds: [
      {
        line: "今晚你要煮飯還是叫外送？冰箱還有菜。",
        replies: [
          { id: "A", text: "叫外送，菜明天再說", reply: "好，那菜要記得放冰箱。", effect: e(1, -1, 0) },
          { id: "B", text: "簡單煮一下，用掉菜", reply: "好，我也來幫忙。", effect: e(-1, 0, 1) },
          { id: "C", text: "一起煮吧", reply: "好，我來洗菜。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C3": {
    npcRoleId: "retiree",
    rounds: [
      {
        line: "你家的菜是不是吃不完？我可以教你幾種保存方法。",
        replies: [
          { id: "A", text: "好，教我吧", reply: "這個很簡單，我來示範。", effect: e(-1, 0, 1) },
          { id: "B", text: "分一些給你好嗎？", reply: "好啊，我來煮湯。", effect: e(-1, 2, -1) },
          { id: "C", text: "我再自己想辦法", reply: "好，需要再來找我。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
  "C3b": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "你看到我分享的種菜故事了嗎？謝謝你的留言。",
        replies: [
          { id: "A", text: "對，我看得很認真", reply: "謝謝你，我很開心。", effect: e(-1, 1, 0) },
          { id: "B", text: "我只是按讚而已", reply: "沒關係，謝謝你的支持。", effect: e(1, 0, -1) },
          { id: "C", text: "我想轉給朋友看", reply: "太好了，謝謝你。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C3c": {
    npcRoleId: "parent",
    rounds: [
      {
        line: "這個月預算有點緊，你覺得買菜要不要省一點？",
        replies: [
          { id: "A", text: "我想少買一點", reply: "好，那我們來調整。", effect: e(1, -1, 0) },
          { id: "B", text: "維持，其他地方省", reply: "好，那我們看看哪裡可以省。", effect: e(-1, 1, 0) },
          { id: "C", text: "我們一起討論怎麼分配", reply: "好，來列個清單。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "C4": {
    npcRoleId: "manager",
    rounds: [
      {
        line: "你有沒有想過自備餐具袋，減少包裝垃圾？",
        replies: [
          { id: "A", text: "好，我下次自備", reply: "太好了，這樣很棒。", effect: e(-1, 0, 1) },
          { id: "B", text: "覺得只是小事，不用", reply: "好，沒關係。", effect: e(1, 0, -1) },
          { id: "C", text: "我問店家有沒有簡單包裝", reply: "好，這樣也是個好方法。", effect: e(-1, 1, 0) },
        ],
      },
    ],
  },
  "C4b": {
    npcRoleId: "member",
    rounds: [
      {
        line: "這個週末有產地參觀，你要不要一起來？",
        replies: [
          { id: "A", text: "好，我報名", reply: "太好了，那天見！", effect: e(-2, 2, 0) },
          { id: "B", text: "這次先休息", reply: "好，下次再約。", effect: e(2, -1, -1) },
          { id: "C", text: "我先看活動資訊", reply: "好，我把資料傳給你。", effect: e(0, 0, 0) },
        ],
      },
    ],
  },
  "C4c": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "我們的價格比超市貴一點，你覺得值得嗎？",
        replies: [
          { id: "A", text: "值得，我願意多付", reply: "謝謝你的支持。", effect: e(0, 1, -1) },
          { id: "B", text: "我只買最便宜的", reply: "理解，大家都有預算要顧。", effect: e(1, -1, 0) },
          { id: "C", text: "兩邊都買一點", reply: "好，這樣也可以。", effect: e(0, 0, 0) },
        ],
      },
    ],
  },
  "C5": {
    npcRoleId: "student",
    rounds: [
      {
        line: "這一週你有什麼新發現嗎？我們想聽聽大家的故事。",
        replies: [
          { id: "A", text: "維持現在就好", reply: "好，也很不錯。", effect: e(1, -1, 0) },
          { id: "B", text: "我做了一點小改變", reply: "哇，真棒，可以多說說嗎？", effect: e(-1, 1, 0) },
          { id: "C", text: "我找朋友一起改變", reply: "太好了，我也想一起。", effect: e(-1, 2, -1) },
        ],
      },
    ],
  },
  "C5b": {
    npcRoleId: "worker",
    rounds: [
      {
        line: "你要不要把這幾天的經驗分享出來？",
        replies: [
          { id: "A", text: "好，我發動態", reply: "好，我幫你轉。", effect: e(-1, 1, 0) },
          { id: "B", text: "只跟親近朋友說", reply: "好，這樣很自然。", effect: e(0, 1, -1) },
          { id: "C", text: "我自己知道就好", reply: "好，也沒關係。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
  "C5c": {
    npcRoleId: "farmer",
    rounds: [
      {
        line: "下週你想不想固定來買菜？我幫你留。",
        replies: [
          { id: "A", text: "好，每週固定來", reply: "太好了，我幫你記著。", effect: e(-1, 1, 0) },
          { id: "B", text: "想到再買就好", reply: "好，歡迎隨時來。", effect: e(1, -1, 0) },
          { id: "C", text: "先設定小目標", reply: "好，我陪你慢慢來。", effect: e(0, 0, 0) },
        ],
      },
    ],
  },
}
