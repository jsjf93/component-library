/**
 * Suspense "resources": cached promises read with React 19's `use()`.
 * Each returns a stable promise per key (see `cache.ts`) so a component can
 * `use(resource())` directly in render without refetching every pass.
 */
import { getCached, invalidate, invalidatePrefix } from './cache'
import { assetPairs, ohlc, ticker } from './kraken'

export const assetPairsResource = () => getCached('assetPairs', assetPairs)

export const tickerResource = (restName: string) =>
  getCached(`ticker:${restName}`, () => ticker(restName))

export const ohlcResource = (restName: string) =>
  getCached(`ohlc:${restName}`, () => ohlc(restName))

/** Reset helpers wired to ErrorBoundary "Retry" buttons. */
export const resetAssetPairs = () => invalidate('assetPairs')
export const resetAsset = (restName: string) => {
  invalidate(`ticker:${restName}`)
  invalidate(`ohlc:${restName}`)
}
export const resetAllMarketData = () => invalidatePrefix('ticker:')
