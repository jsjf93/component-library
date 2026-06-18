import { useCallback, useSyncExternalStore } from 'react'
import { krakenSocket, type TickerState } from '../lib/krakenSocket'

/**
 * Subscribe to the live Kraken ticker for a single `wsSymbol` (e.g. `BTC/GBP`).
 * Returns the latest `TickerState`, or `undefined` until the first frame
 * arrives. Re-renders only when *this* symbol updates.
 */
export function useTicker(symbol: string): TickerState | undefined {
  const subscribe = useCallback(
    (onStoreChange: () => void) => krakenSocket.subscribe(symbol, onStoreChange),
    [symbol],
  )
  const getSnapshot = useCallback(() => krakenSocket.getSnapshot(symbol), [symbol])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
