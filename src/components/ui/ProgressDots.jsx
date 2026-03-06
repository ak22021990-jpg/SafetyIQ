// src/components/ui/ProgressDots.jsx
export default function ProgressDots({ total, current, completed = [] }) {
  // current = 0-based index of active case
  // completed = array of completed indices
  return (
    <div
      className="flex items-center gap-2"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Case ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const isDone    = completed.includes(i)
        const isActive  = i === current && !isDone
        const isPending = !isDone && !isActive

        return (
          <div
            key={i}
            className="transition-all duration-200"
            style={{
              width:        isActive ? '24px' : '16px',
              height:       '6px',
              borderRadius: '100px',
              background:   isDone
                ? 'rgba(225,29,72,0.60)'
                : isActive
                  ? '#E11D48'
                  : 'rgba(255,255,255,0.15)',
            }}
            aria-label={
              isDone ? `Case ${i + 1} complete` :
              isActive ? `Case ${i + 1} active` :
              `Case ${i + 1} pending`
            }
          />
        )
      })}
    </div>
  )
}
