import type { PixelLook } from '../types'

const SKIN = '#F2C79B'
const HAIR = '#3E2D28'
const SHOE = '#2B2B2B'

interface Props {
  look: PixelLook
  /** 顯示寬度（px），高度依比例 */
  size?: number
}

/** 16×20 的像素角色。所有角色共用同一個身形，只換顏色與配件，方便日後替換成正式素材。 */
export default function PixelCharacter({ look, size = 96 }: Props) {
  const r = (x: number, y: number, w: number, h: number, fill: string, key: string) => (
    <rect key={key} x={x} y={y} width={w} height={h} fill={fill} />
  )
  const parts: JSX.Element[] = []

  // 背包放在身體後面
  if (look.accessory === 'backpack') parts.push(r(1, 7, 3, 6, '#6A93B3', 'bp'))

  // 頭髮與臉
  parts.push(r(4, 1, 8, 3, HAIR, 'hair'))
  parts.push(r(4, 3, 1, 3, HAIR, 'hl'), r(11, 3, 1, 3, HAIR, 'hr'))
  parts.push(r(5, 3, 6, 4, SKIN, 'face'))
  parts.push(r(6, 4, 1, 1, HAIR, 'e1'), r(9, 4, 1, 1, HAIR, 'e2'))
  parts.push(r(7, 6, 2, 1, '#D98E7F', 'mouth'))

  // 帽子
  if (look.hat === 'straw') {
    parts.push(r(4, 0, 8, 1, '#E0A94B', 'h1'), r(2, 1, 12, 2, '#E0A94B', 'h2'))
    parts.push(r(4, 2, 8, 1, '#80634C', 'hband'))
  }
  if (look.hat === 'headband') parts.push(r(4, 2, 8, 1, '#CFCFC6', 'hb'))
  if (look.hat === 'cap') parts.push(r(4, 1, 8, 2, '#DDA36C', 'cap'), r(3, 3, 3, 1, '#DDA36C', 'brim'))

  // 手臂、上衣、褲子、鞋
  parts.push(r(2, 7, 2, 5, SKIN, 'armL'), r(12, 7, 2, 5, SKIN, 'armR'))
  parts.push(r(4, 7, 8, 6, look.shirt, 'shirt'))
  parts.push(r(5, 13, 6, 4, look.pants, 'pants'))
  parts.push(r(4, 17, 3, 2, SHOE, 'shoeL'), r(9, 17, 3, 2, SHOE, 'shoeR'))

  // 配件
  if (look.accessory === 'tie') parts.push(r(7, 7, 2, 4, '#C96B5E', 'tie'))
  if (look.accessory === 'phone') {
    parts.push(r(13, 9, 3, 4, '#2B2B2B', 'ph'), r(14, 10, 1, 2, '#A8B99A', 'phs'))
  }
  if (look.accessory === 'bag') parts.push(r(12, 11, 4, 4, '#DDA36C', 'bag'), r(13, 10, 2, 1, '#80634C', 'bagh'))
  if (look.accessory === 'cane') parts.push(r(14, 8, 1, 11, '#80634C', 'cane'))
  if (look.accessory === 'basket') {
    parts.push(r(12, 12, 4, 4, '#E0A94B', 'bk'), r(12, 12, 4, 1, '#80634C', 'bkt'))
  }

  return (
    <svg
      width={size}
      height={(size * 20) / 16}
      viewBox="0 0 16 20"
      shapeRendering="crispEdges"
      role="img"
      aria-hidden="true"
    >
      {parts}
    </svg>
  )
}
