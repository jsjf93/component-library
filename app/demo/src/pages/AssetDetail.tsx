import { Suspense, use } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Card, Progress, Skeleton } from '@borderline/ui'
import { PageHeading } from '../components/PageHeading'
import { PriceTicker } from '../components/PriceTicker'
import { Sparkline } from '../components/Sparkline'
import { ButtonLink } from '../components/ButtonLink'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useSettings } from '../state/SettingsContext'
import {
  assetPairsResource,
  ohlcResource,
  resetAsset,
  resetAssetPairs,
  tickerResource,
} from '../lib/data'
import { formatCompact, formatCurrency, type Currency } from '../lib/format'
import type { Pair } from '../lib/kraken'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  )
}

function AssetData({ pair }: { pair: Pair }) {
  const { compactNumbers } = useSettings()
  const snapshot = use(tickerResource(pair.restName))
  const candles = use(ohlcResource(pair.restName))
  const quote = pair.quote as Currency

  const range = snapshot.high24 - snapshot.low24
  const position = range > 0 ? ((snapshot.last - snapshot.low24) / range) * 100 : 0
  const volume = compactNumbers ? formatCompact(snapshot.volume24) : snapshot.volume24.toFixed(2)

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">Live price</h2>
          <PriceTicker symbol={pair.wsSymbol} quote={quote} className="text-lg" />
        </div>
        <div className="mt-5">
          <Sparkline data={candles.map((c) => c.close)} className="h-16 w-full" />
        </div>
      </Card>

      <Card className="p-5">
        <Progress
          label="Position in 24h range"
          value={position}
          formatValue={() => `${formatCurrency(snapshot.low24, quote)} – ${formatCurrency(snapshot.high24, quote)}`}
        />
        <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <Stat label="24h high" value={formatCurrency(snapshot.high24, quote)} />
          <Stat label="24h low" value={formatCurrency(snapshot.low24, quote)} />
          <Stat label="Today's open" value={formatCurrency(snapshot.open, quote)} />
          <Stat label={`Volume (${pair.base})`} value={volume} />
        </dl>
      </Card>
    </div>
  )
}

function AssetResolver({ symbol }: { symbol: string }) {
  const pairs = use(assetPairsResource())
  const pair = pairs.find((p) => p.wsSymbol === symbol)

  if (!pair) {
    return (
      <Alert variant="warning" title="Unknown pair">
        <p>“{symbol}” isn’t a tradeable pair on Kraken.</p>
        <ButtonLink to="/markets" className="mt-3">
          Back to markets
        </ButtonLink>
      </Alert>
    )
  }

  return (
    <ErrorBoundary label={`${pair.wsSymbol} data`} onReset={() => resetAsset(pair.restName)}>
      <Suspense fallback={<Skeleton className="h-80 w-full" />}>
        <AssetData pair={pair} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function AssetDetail() {
  const { pair: symbol } = useParams<{ pair: string }>()

  return (
    <div className="space-y-6 p-6 md:p-8">
      <PageHeading
        title={symbol ?? 'Asset'}
        subtitle="Snapshot stats from Kraken's REST API with a live price overlay."
        actions={<ButtonLink to="/markets">Back to markets</ButtonLink>}
      />
      <ErrorBoundary label="the asset list" onReset={resetAssetPairs}>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          {symbol && <AssetResolver symbol={symbol} />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
