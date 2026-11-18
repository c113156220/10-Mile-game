import type { TextProvider, TextRequest, TextResponse } from '../types'

/**
 * 第一版：直接回傳固定版文字。
 *
 * 日後接 AI（約 12/10）只需要新增一個 provider：
 *   1. 呼叫自己的後端函式（例如 Vercel Function），API 金鑰只放在後端，絕不放前端。
 *   2. 後端用系統提示詞請 AI 回傳 JSON：{ situation, options:[{id,text}] }。
 *   3. 驗證格式：恰好 3 個選項 A/B/C、情境 60–90 字、選項 25 字內、不含阿拉伯數字與金額、
 *      不含「最好／最佳／明智／應該／正確／一定」等暗示標準答案的詞。
 *   4. 驗證失敗就重試一次，仍失敗就回傳固定版（fallbackProvider）。
 *   AI 只負責改寫文字，數值、結局、選項數量一律由程式決定。
 */
export const fixedTextProvider: TextProvider = {
  async getEventText(req: TextRequest): Promise<TextResponse> {
    return {
      situation: req.situation,
      options: req.options.map((o) => ({ id: o.id, text: o.text })),
    }
  },
}

/** 目前使用的 provider。換成 AI 版本時只改這一行。 */
export const textProvider: TextProvider = fixedTextProvider
