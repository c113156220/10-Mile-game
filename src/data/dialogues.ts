import type { Dialogue } from '../types'
import { moreDialogues } from './dialoguesMore'

/**
 * 角色對話（試點）：玩家選完事件後，與其他角色最多 3 輪對話。
 * 每個回覆的數值變化總和為 0，疊加在事件選項之上。
 * ⚠ 對話內容尚待合作社校正，皆為虛構。
 * 之後換成真的 AI 時，只要把 replies 的固定回應換成後端呼叫即可。
 */
const e = (balance: number, community: number, efficiency: number) => ({ balance, community, efficiency })

const longDialogues: Record<string, Dialogue> = {
  "D1c": {
    npcRoleId: "consumer",
    rounds: [
      {
        line: "我家今晚要請客，想要一箱剛採的菜，可以嗎？",
        replies: [
          { id: "A", text: "我現在就去採", reply: "太好了，謝謝你！", effect: e(-1, 1, 0) },
          { id: "B", text: "今天比較忙，明天可以嗎？", reply: "好吧，那我先想想別的辦法。", effect: e(1, -1, 0) },
          { id: "C", text: "可以，但只能先給你一部分", reply: "一部分也行，剩下的我再看看。", effect: e(0, 1, -1) },
        ],
      },
      {
        line: "對了，你的菜是怎麼種的？我想多了解。",
        replies: [
          { id: "A", text: "我簡單跟你說說種法", reply: "原來是這樣，感覺更安心了。", effect: e(-1, 1, 0) },
          { id: "B", text: "這個說來話長，下次再講", reply: "好的，那等下次囉。", effect: e(1, -1, 0) },
          { id: "C", text: "我整理成簡單的說明給你", reply: "這樣很方便，謝謝！", effect: e(-1, 0, 1) },
        ],
      },
      {
        line: "如果以後常常需要，能不能約固定的時間？",
        replies: [
          { id: "A", text: "可以，我們約每週固定一天", reply: "太好了，這樣我也好安排。", effect: e(-1, 1, 0) },
          { id: "B", text: "要看收成，不一定每次都有", reply: "了解，有的時候再聯絡你。", effect: e(1, 0, -1) },
          { id: "C", text: "可以找其他人一起訂，比較好安排", reply: "好主意，我來問問鄰居。", effect: e(0, 1, -1) },
        ],
      },
    ],
  },
  "D2": {
    npcRoleId: "member",
    rounds: [
      {
        line: "聽說這週收購價掉了，我們有幾位想一起訂，你覺得呢？",
        replies: [
          { id: "A", text: "好啊，我們可以約個數量", reply: "那我先統計大家要多少。", effect: e(-1, 1, 0) },
          { id: "B", text: "我先看看通路那邊再說", reply: "好，你決定了再跟我說。", effect: e(1, -1, 0) },
          { id: "C", text: "我想先知道大家大概要多少", reply: "我先問問，晚點給你數字。", effect: e(0, 1, -1) },
        ],
      },
      {
        line: "大家比較在意的是價格公道，還有菜新不新鮮。",
        replies: [
          { id: "A", text: "我可以告訴大家採收日期", reply: "這樣大家會比較放心。", effect: e(-1, 1, 0) },
          { id: "B", text: "價格我要先算一下成本", reply: "理解，你算好再跟我們說。", effect: e(1, 0, -1) },
          { id: "C", text: "新鮮的先給你們，剩下的再賣別處", reply: "這樣也行，謝謝你先想到我們。", effect: e(-1, 0, 1) },
        ],
      },
      {
        line: "那下週的取貨，要怎麼安排比較好？",
        replies: [
          { id: "A", text: "約一個固定的時間和地點", reply: "好，我來通知大家。", effect: e(-1, 1, 0) },
          { id: "B", text: "我送到一個地方，你們再自己分", reply: "這樣可以，我們來分。", effect: e(0, 1, -1) },
          { id: "C", text: "這次先小量試試看", reply: "好，先試一次看看。", effect: e(1, 0, -1) },
        ],
      },
    ],
  },
  "D4": {
    npcRoleId: "member",
    rounds: [
      {
        line: "下週想訂一批菜，這個週末前可以先跟我確定嗎？",
        replies: [
          { id: "A", text: "可以，我今晚就確認", reply: "太好了，我等你消息。", effect: e(-1, 1, 0) },
          { id: "B", text: "這個週末我想先休息，下週一再回你", reply: "好的，週一再聊。", effect: e(1, 0, -1) },
          { id: "C", text: "我先告訴你大概能出多少", reply: "這樣我也好跟大家說。", effect: e(0, 1, -1) },
        ],
      },
      {
        line: "大家比較想要新鮮的葉菜，量不用太多。",
        replies: [
          { id: "A", text: "葉菜我可以優先留給你們", reply: "謝謝，我們會很期待。", effect: e(-1, 1, 0) },
          { id: "B", text: "每種的量要看當週收成", reply: "理解，我們配合你的狀況。", effect: e(1, -1, 0) },
          { id: "C", text: "我可以搭配一些別的菜", reply: "這樣也不錯，大家可以多試試。", effect: e(-1, 0, 1) },
        ],
      },
      {
        line: "如果這週真的太忙，也可以直接跟我們說。",
        replies: [
          { id: "A", text: "謝謝，我會盡量安排", reply: "不用勉強，我們可以調整。", effect: e(0, 1, -1) },
          { id: "B", text: "我其實有點排不開，可以少一點嗎？", reply: "沒問題，少一點也很好。", effect: e(1, 0, -1) },
          { id: "C", text: "我再想想，晚點給你答覆", reply: "好，沒關係。", effect: e(1, -1, 0) },
        ],
      },
    ],
  },
}

/** 所有事件的對話：每個事件都會遇到另一個角色。 */
export const dialogues: Record<string, Dialogue> = { ...longDialogues, ...moreDialogues }
