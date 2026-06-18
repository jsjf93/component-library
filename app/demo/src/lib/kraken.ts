/**
 * Thin typed client for Kraken's *public* REST API (no key required).
 * Requests go through the Vite dev proxy at `/api/kraken` (see vite.config.ts)
 * which forwards to https://api.kraken.com and avoids browser CORS issues.
 *
 * Live price streaming is handled separately in `krakenSocket.ts`.
 */

const BASE = '/api/kraken/0/public'

/** The fiat quote currencies the demo surfaces. */
const QUOTES = new Set(['GBP', 'USD', 'EUR'])

/**
 * Kraken's REST `wsname` uses legacy asset codes (XBT, XDG). The WebSocket v2
 * feed uses the common ticker symbols (BTC, DOGE). Normalise to the latter so
 * one canonical `wsSymbol` works for both display and the live socket.
 */
const WS_ALIAS: Record<string, string> = { XBT: 'BTC', XDG: 'DOGE' }

function toWsSymbol(wsname: string): string {
  const [base, quote] = wsname.split('/')
  return `${WS_ALIAS[base] ?? base}/${quote}`
}

export type Pair = {
  /** Kraken REST pair name (altname), e.g. `XBTGBP` — used for Ticker/OHLC. */
  restName: string
  /** WebSocket v2 symbol, e.g. `BTC/GBP` — used for live subscriptions + display. */
  wsSymbol: string
  base: string
  quote: string
}

type KrakenResponse<T> = { error: string[]; result: T }

async function krakenGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Kraken request failed (HTTP ${res.status})`)
  const body = (await res.json()) as KrakenResponse<T>
  if (body.error?.length) throw new Error(body.error.join(', '))
  return body.result
}

type AssetPairInfo = { altname: string; wsname?: string; status?: string }

/** All tradeable fiat (GBP/USD/EUR) pairs, sorted by symbol. */
export async function assetPairs(): Promise<Pair[]> {
  const result = await krakenGet<Record<string, AssetPairInfo>>('/AssetPairs')
  const pairs: Pair[] = []
  for (const info of Object.values(result)) {
    if (!info.wsname || info.status === 'delisted') continue
    const wsSymbol = toWsSymbol(info.wsname)
    const [base, quote] = wsSymbol.split('/')
    if (!QUOTES.has(quote)) continue
    pairs.push({ restName: info.altname, wsSymbol, base, quote })
  }
  pairs.sort((a, b) => a.wsSymbol.localeCompare(b.wsSymbol))
  return pairs
}

export type TickerSnapshot = {
  last: number
  high24: number
  low24: number
  open: number
  volume24: number
  changePct: number
}

type RestTicker = { c: string[]; h: string[]; l: string[]; o: string; v: string[] }

/** Point-in-time ticker stats for a pair (REST snapshot). */
export async function ticker(restName: string): Promise<TickerSnapshot> {
  const result = await krakenGet<Record<string, RestTicker>>(
    `/Ticker?pair=${encodeURIComponent(restName)}`,
  )
  const data = Object.values(result)[0]
  if (!data) throw new Error(`No ticker data for ${restName}`)
  const last = parseFloat(data.c[0])
  const open = parseFloat(data.o)
  return {
    last,
    high24: parseFloat(data.h[1]),
    low24: parseFloat(data.l[1]),
    open,
    volume24: parseFloat(data.v[1]),
    changePct: open ? ((last - open) / open) * 100 : 0,
  }
}

export type Candle = { time: number; close: number }

/** Recent OHLC candles (close price only) for a lightweight sparkline. */
export async function ohlc(restName: string, interval = 60): Promise<Candle[]> {
  const result = await krakenGet<Record<string, unknown>>(
    `/OHLC?pair=${encodeURIComponent(restName)}&interval=${interval}`,
  )
  const series = Object.entries(result).find(([key]) => key !== 'last')?.[1] as
    | Array<[number, string, string, string, string]>
    | undefined
  return (series ?? []).map((c) => ({ time: c[0], close: parseFloat(c[4]) }))
}
