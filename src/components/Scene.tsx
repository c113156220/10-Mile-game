import type { ReactNode } from 'react'

/** 簡單的像素風場景（純 CSS 色塊）。日後可替換成正式的新竹場景素材。 */
export default function Scene({ children, tall = false }: { children?: ReactNode; tall?: boolean }) {
  return (
    <div className={`scene${tall ? ' scene-tall' : ''}`} aria-hidden="true">
      <div className="scene-sun" />
      <div className="scene-cloud c1" />
      <div className="scene-cloud c2" />
      <div className="scene-hills" />
      <div className="scene-field">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="scene-actor">{children}</div>
    </div>
  )
}
