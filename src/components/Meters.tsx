import type { Stats } from '../types'
import { STAT_KEYS, STAT_LABELS } from '../types'

const COLORS: Record<string, string> = {
  balance: '#DDA36C',
  community: '#426B53',
  efficiency: '#6A93B3',
}

/** 數值條：只顯示長度，不顯示精確數字。 */
export default function Meters({ stats, deltas }: { stats: Stats; deltas?: Partial<Stats> }) {
  return (
    <div className="panel meters">
      {STAT_KEYS.map((k) => {
        const d = deltas?.[k]
        return (
          <div className="meter-row" key={k}>
            <div className="meter-label">{STAT_LABELS[k]}</div>
            <div
              className="meter-bar"
              role="meter"
              aria-label={STAT_LABELS[k]}
              aria-valuemin={0}
              aria-valuemax={10}
              aria-valuenow={stats[k]}
            >
              <div className="meter-fill" style={{ width: `${stats[k] * 10}%`, background: COLORS[k] }} />
            </div>
            <div className="meter-delta">
              {d === undefined ? '' : d > 0 ? '▲ 增加' : d < 0 ? '▼ 略減' : '－ 不變'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
