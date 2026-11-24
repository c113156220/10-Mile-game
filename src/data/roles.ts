import type { Role } from '../types'

/**
 * 簡報「角色設計方案」的 8 個角色。
 * 第一版只有「在地小農」可玩，其餘顯示「即將開放」。
 * 新增角色：在這裡把 playable 改成 true，並在 data/ 新增該角色的劇情資料即可。
 */
export const roles: Role[] = [
  {
    id: 'farmer',
    name: '在地小農',
    tagline: '收成賣不完，怎麼辦？',
    background: '新竹郊區的小農，一個人照顧一片菜園，努力在收成、價格與生活之間找平衡。',
    playable: true,
    look: { hat: 'straw', shirt: '#D9B77A', pants: '#3F6179', accessory: 'basket' },
  },
  {
    id: 'consumer',
    name: '消費者',
    tagline: '價格與支持在地，怎麼選？',
    background: '每天都在買菜、買日用品，想支持在地，也要顧荷包。',
    playable: true,
    look: { shirt: '#DDA36C', pants: '#3E2D28', accessory: 'phone' },
  },
  {
    id: 'member',
    name: '合作社社員',
    tagline: '有限時間，要如何參與？',
    background: '加入了合作社，想參與，但工作與生活的時間都很有限。',
    playable: true,
    look: { shirt: '#A8B99A', pants: '#426B53', accessory: 'tie' },
  },
  {
    id: 'manager',
    name: '合作社經營者',
    tagline: '人力有限，先做哪件事？',
    background: '合作社的營運夥伴，每件事都重要，人手卻永遠不夠。',
    playable: false,
    look: { shirt: '#6A93B3', pants: '#3E2D28', accessory: 'tie' },
  },
  {
    id: 'student',
    name: '大學生',
    tagline: '一天 300 元怎麼分配？',
    background: '住在學校附近的大學生，生活費有限，每一筆都要計較。',
    playable: false,
    look: { shirt: '#F6F0DE', pants: '#3F6179', accessory: 'backpack' },
  },
  {
    id: 'worker',
    name: '上班族',
    tagline: '省時間還是少製造浪費？',
    background: '在竹科上班，常常加班，想少浪費卻沒什麼時間。',
    playable: false,
    look: { shirt: '#3F6179', pants: '#3E2D28' },
  },
  {
    id: 'parent',
    name: '家長',
    tagline: '家庭預算與生活品質如何兼顧？',
    background: '照顧一家老小，每週都要在預算與品質之間取捨。',
    playable: false,
    look: { shirt: '#5B8A4F', pants: '#3E2D28', accessory: 'bag' },
  },
  {
    id: 'retiree',
    name: '退休居民',
    tagline: '閒置物品可以流向哪裡？',
    background: '住在社區多年，家裡有許多還能用的東西，不知道該給誰。',
    playable: false,
    look: { hat: 'headband', shirt: '#C96B5E', pants: '#3E2D28', accessory: 'cane' },
  },
]
