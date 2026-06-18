import { TrendUp, TrendDown } from '@borderline/icons'
import { Spinner } from '@borderline/ui'
import { useTicker } from '../hooks/useTicker'
import { formatCurrency, formatPercent, type Currency } from '../lib/format'

type PriceTickerProps = {
  /** WebSocket symbol, e.g. `BTC/GBP`. */
  symbol: string
  /** Quote currency used to format the price. */
  quote: Currency
  /** When set, shows the holding value (`last × amount`) instead of unit price. */
  amount?: number
  className?: string
}

/**
 * Live last price (or holding value) for a symbol, with a directional trend.
 * Colour is paired with an explicit up/down icon and sign so meaning never
 * relies on colour alone. The price region is `aria-live="off"` (updates are
 * too frequent for a screen reader); the 24h change is announced politely.
 */
export function PriceTicker({ symbol, quote, amount, className }: PriceTickerProps) {
  const ticker = useTicker(symbol)

  if (!ticker) {
    return (
      <span className={['inline-flex items-center gap-2 text-muted-foreground', className].filter(Boolean).join(' ')}>
        <Spinner size="sm" label={`Loading ${symbol} price`} />
        <span className="text-sm">Connecting…</span>
      </span>
    )
  }

  const up = ticker.changePct >= 0
  const TrendIcon = up ? TrendUp : TrendDown
  const trendColor = up ? 'text-success-foreground' : 'text-destructive'
  const value = amount != null ? ticker.last * amount : ticker.last

  return (
    <span className={['inline-flex items-center gap-3', className].filter(Boolean).join(' ')}>
      <span className="font-mono tabular-nums text-foreground" aria-live="off">
        {formatCurrency(value, quote)}
      </span>
      <span className={['inline-flex items-center gap-1 text-sm font-medium', trendColor].join(' ')}>
        <TrendIcon className="size-4 shrink-0" aria-hidden="true" />
        <span aria-live="polite">
          {formatPercent(ticker.changePct)}
          <span className="sr-only"> 24 hour change</span>
        </span>
      </span>
    </span>
  )
}
