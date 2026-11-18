import DialogBox from '../components/DialogBox'
import PixelCharacter from '../components/PixelCharacter'
import Scene from '../components/Scene'
import type { Role } from '../types'

/** 角色故事頁：像素場景在上，RPG 對話框在下，文字逐步出現。 */
export default function StoryScreen({
  role,
  intro,
  onContinue,
}: {
  role: Role
  intro: string
  onContinue: () => void
}) {
  return (
    <div className="screen">
      <Scene tall>
        <PixelCharacter look={role.look} size={96} />
      </Scene>
      <DialogBox speaker={role.name} text={intro} />
      <button type="button" className="btn btn-primary" onClick={onContinue}>
        繼續
      </button>
      <p className="note">點對話框可以直接顯示全文。</p>
    </div>
  )
}
