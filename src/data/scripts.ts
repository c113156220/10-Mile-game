import type { DayPlan } from '../types'
import { consumerDays } from './consumer'
import { farmerDays } from './farmer'
import { memberDays } from './member'
import { intros } from './roleTexts'

/** 每個可玩角色的 5 天劇情。新增角色：在 data/ 新增劇情檔，再加到這裡，並把 roles.ts 的 playable 改成 true。 */
export const scripts: Record<string, { days: DayPlan[]; intro: string }> = {
  farmer: { days: farmerDays, intro: intros.farmer },
  member: { days: memberDays, intro: intros.member },
  consumer: { days: consumerDays, intro: intros.consumer },
}
