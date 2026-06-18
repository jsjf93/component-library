import { useEffect, useState } from 'react'
import { krakenSocket, type TickerState } from '../lib/krakenSocket'

/**
 * Subscribe to live tickers for a *set* of symbols and return a map of the
 * latest state per symbol. Used to aggregate a portfolio total across holdings
 * (a single `useTicker` only covers one symbol).
 */
export function usePortfolioPrices(symbols: string[]): Record<string, TickerState> {
  const key = symbols.join(',')
  const [prices, setPrices] = useState<Record<string, TickerState>>({})

  useEffect(() => {
    const list = key ? key.split(',') : []

    const apply = (symbol: string) => {
      const state = krakenSocket.getSnapshot(symbol)
      if (state) setPrices((prev) => ({ ...prev, [symbol]: state }))
    }

    const unsubscribers = list.map((symbol) =>
      krakenSocket.subscribe(symbol, () => apply(symbol)),
    )
    // Seed with any snapshots already cached from a prior subscription.
    list.forEach(apply)

    return () => unsubscribers.forEach((unsub) => unsub())
  }, [key])

  return prices
}
