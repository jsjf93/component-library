import { Suspense, use, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Input, Skeleton } from '@borderline/ui'
import { PageHeading } from '../components/PageHeading'
import { PriceTicker } from '../components/PriceTicker'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useSettings } from '../state/SettingsContext'
import { assetPairsResource, resetAssetPairs } from '../lib/data'
import type { Pair } from '../lib/kraken'
import type { Currency } from '../lib/format'

/** Curated set of well-known assets to surface first. */
const POPULAR = [
  'BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE',
  'DOT', 'LINK', 'LTC', 'AVAX', 'ATOM', 'TRX',
]

function MarketList() {
  const { currency } = useSettings()
  const pairs = use(assetPairsResource())
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const byCurrency = pairs.filter((p) => p.quote === currency)
    const popular = POPULAR.map((base) => byCurrency.find((p) => p.base === base)).filter(
      (p): p is Pair => Boolean(p),
    )
    const q = query.trim().toUpperCase()
    if (!q) return popular
    return byCurrency.filter((p) => p.base.includes(q)).slice(0, 30)
  }, [pairs, currency, query])

  return (
    <>
      <Input
        variant="search"
        label="Search assets"
        placeholder="e.g. BTC, ETH, SOL"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />

      <Card className="mt-6 p-2">
        <ul className="divide-y divide-border">
          {rows.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No assets match “{query}” in {currency}.
            </li>
          )}
          {rows.map((pair) => (
            <li key={pair.wsSymbol}>
              <Link
                to={`/markets/${encodeURIComponent(pair.wsSymbol)}`}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {pair.base.slice(0, 3)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{pair.base}</span>
                    <span className="block text-sm text-muted-foreground">{pair.wsSymbol}</span>
                  </span>
                </span>
                <PriceTicker symbol={pair.wsSymbol} quote={pair.quote as Currency} />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default function Markets() {
  return (
    <div className="space-y-2 p-6 md:p-8">
      <PageHeading title="Markets" subtitle="Live prices for popular pairs, straight from Kraken." />
      <div className="pt-4">
        <ErrorBoundary label="market data" onReset={resetAssetPairs}>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <MarketList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}
