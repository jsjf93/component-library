import { Suspense, use } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Skeleton, StatCard } from '@borderline/ui'
import { Wallet, BarChart, X } from '@borderline/icons'
import { PageHeading } from '../components/PageHeading'
import { PriceTicker } from '../components/PriceTicker'
import { AddHoldingForm } from '../components/AddHoldingForm'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { usePortfolio, type Holding } from '../state/PortfolioContext'
import { useSettings } from '../state/SettingsContext'
import { usePortfolioPrices } from '../hooks/usePortfolioPrices'
import { assetPairsResource, resetAssetPairs } from '../lib/data'
import { formatCurrency, formatPercent, type Currency } from '../lib/format'

function PortfolioStats({ holdings }: { holdings: Holding[] }) {
  const { currency } = useSettings()
  const prices = usePortfolioPrices(holdings.map((h) => h.symbol))

  let total = 0
  let weightedChange = 0
  for (const h of holdings) {
    const last = prices[h.symbol]?.last
    if (last == null) continue
    const value = last * h.amount
    total += value
    weightedChange += value * (prices[h.symbol]?.changePct ?? 0)
  }
  const changePct = total ? weightedChange / total : 0
  const changeValue = (total * changePct) / 100

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total value"
        value={formatCurrency(total, currency)}
        icon={<Wallet />}
      />
      <StatCard
        title="24h change"
        value={`${changeValue >= 0 ? '+' : ''}${formatCurrency(changeValue, currency)}`}
        icon={<BarChart />}
        trend={{ value: formatPercent(changePct), direction: changePct >= 0 ? 'up' : 'down' }}
      />
      <StatCard title="Holdings" value={holdings.length} />
    </div>
  )
}

function HoldingRow({ holding }: { holding: Holding }) {
  const { removeHolding } = usePortfolio()
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <Link
        to={`/markets/${encodeURIComponent(holding.symbol)}`}
        className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
          {holding.base.slice(0, 3)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-foreground">{holding.symbol}</span>
          <span className="block text-sm text-muted-foreground">
            {holding.amount} {holding.base}
          </span>
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <PriceTicker symbol={holding.symbol} quote={holding.quote as Currency} amount={holding.amount} />
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Remove ${holding.symbol}`}
          onClick={() => removeHolding(holding.symbol)}
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}

/** Loads the asset list, then renders the add-holding form. */
function AddHolding() {
  const pairs = use(assetPairsResource())
  return <AddHoldingForm pairs={pairs} />
}

export default function Portfolio() {
  const { holdings } = usePortfolio()

  return (
    <div className="space-y-6 p-6 md:p-8">
      <PageHeading title="Portfolio" subtitle="Track the live value of your crypto holdings." />

      <PortfolioStats holdings={holdings} />

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground">Add a holding</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick an asset and enter how much you hold — its value updates in real time.
        </p>
        <div className="mt-4">
          <ErrorBoundary label="the asset list" onReset={resetAssetPairs}>
            <Suspense fallback={<Skeleton className="h-12 w-full max-w-md" />}>
              <AddHolding />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-foreground">Your holdings</h2>
        {holdings.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No holdings yet. Add one above to start tracking your portfolio value.
          </p>
        ) : (
          <div className="mt-2 divide-y divide-border">
            {holdings.map((h) => (
              <HoldingRow key={h.symbol} holding={h} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
