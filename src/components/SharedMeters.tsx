import { S_HINTS, S_KEYS, S_LABELS } from '../data/shared'
import type { SKey, SState } from '../data/shared'

const COLORS: Record<SKey, string> = {
  supply: '#DDA36C',
  delivery: '#6A93B3',
  labor: '#A8B99A',
  trust: '#426B53',
}

/** 共同狀態條：供貨、交期、人力、信任。只顯示長度，不顯示精確數字。 */
export default function SharedMeters({ state, deltas }: { state: SState; deltas?: SState }) {
  return (
    <div className="panel meters">
      {S_KEYS.map((k) => {
        const d = deltas?.[k]
        return (
          <div className="meter-row" key={k}>
            <div className="meter-label">
              {S_LABELS[k]}
              <small className="meter-hint">{S_HINTS[k]}</small>
            </div>
            <div className="meter-bar" role="meter" aria-label={S_LABELS[k]} aria-valuemin={0} aria-valuemax={10} aria-valuenow={state[k]}>
              <div className="meter-fill" style={{ width: `${state[k] * 10}%`, background: COLORS[k] }} />
            </div>
            <div className="meter-delta">{d === undefined ? '' : d > 0 ? '▲ 增加' : d < 0 ? '▼ 減少' : '－ 不變'}</div>
          </div>
        )
      })}
    </div>
  )
}
