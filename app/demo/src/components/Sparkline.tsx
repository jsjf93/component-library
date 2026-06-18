type SparklineProps = {
  /** Series of values (e.g. close prices), oldest first. */
  data: number[]
  width?: number
  height?: number
  className?: string
}

/**
 * A dependency-free inline SVG sparkline. Decorative (`aria-hidden`) — the
 * surrounding stats convey the same information to assistive tech. Line colour
 * reflects whether the series finished up or down.
 */
export function Sparkline({ data, width = 240, height = 64, className }: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data
    .map((value, i) => {
      const x = i * stepX
      const y = height - ((value - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const up = data[data.length - 1] >= data[0]
  const stroke = up ? 'var(--color-success-foreground)' : 'var(--color-destructive)'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
