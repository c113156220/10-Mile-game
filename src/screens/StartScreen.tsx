import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import { roles } from '../data/roles'

export default function StartScreen({ onStart }: { onStart: () => void }) {
  const farmer = roles[0]
  return (
    <div className="screen center">
      <p className="eyebrow">十里方圓合作社｜行銷概念</p>
      <h1 className="title">十里人生</h1>
      <Scene tall>
        <PixelCharacter look={farmer.look} size={96} />
      </Scene>
      <p className="lead">換個身分，過一天十里方圓的生活。</p>
      <button type="button" className="btn btn-primary" onClick={onStart}>
        開始遊戲
      </button>
      <p className="note">約 3 分鐘，手機打開網頁就能玩。故事與數值皆為虛構模擬。</p>
    </div>
  )
}
