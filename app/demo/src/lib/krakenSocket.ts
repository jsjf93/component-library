/**
 * Single shared connection to Kraken's WebSocket v2 ticker feed.
 *
 * Components subscribe to a symbol (e.g. `BTC/GBP`) via `useTicker`. The store
 * ref-counts subscriptions per symbol so the socket only subscribes once per
 * symbol and unsubscribes when the last consumer unmounts. State objects are
 * replaced immutably on each update so `useSyncExternalStore` can rely on
 * reference identity. Reconnects with capped exponential backoff and re-subscribes
 * everything that still has listeners.
 */

const WS_URL = 'wss://ws.kraken.com/v2'

export type TickerState = {
  symbol: string
  last: number
  changePct: number
  bid: number
  ask: number
}

type Listener = () => void

type TickerMessage = {
  channel?: string
  type?: string
  data?: Array<{
    symbol: string
    last?: number
    change_pct?: number
    bid?: number
    ask?: number
  }>
}

class KrakenSocket {
  private ws: WebSocket | null = null
  private readonly states = new Map<string, TickerState>()
  private readonly listeners = new Map<string, Set<Listener>>()
  private reconnectAttempts = 0
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null

  /** Subscribe a listener to a symbol. Returns an unsubscribe cleanup. */
  subscribe(symbol: string, listener: Listener): () => void {
    let set = this.listeners.get(symbol)
    if (!set) {
      set = new Set()
      this.listeners.set(symbol, set)
    }
    set.add(listener)
    this.ensureConnected()
    if (set.size === 1) this.send({ method: 'subscribe', params: { channel: 'ticker', symbol: [symbol] } })

    return () => {
      const current = this.listeners.get(symbol)
      if (!current) return
      current.delete(listener)
      if (current.size === 0) {
        this.listeners.delete(symbol)
        this.send({ method: 'unsubscribe', params: { channel: 'ticker', symbol: [symbol] } })
      }
    }
  }

  getSnapshot(symbol: string): TickerState | undefined {
    return this.states.get(symbol)
  }

  private ensureConnected(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return
    }
    const ws = new WebSocket(WS_URL)
    this.ws = ws

    ws.addEventListener('open', () => {
      this.reconnectAttempts = 0
      // Re-subscribe everything that still has listeners (covers reconnects and
      // subscriptions queued while the socket was connecting).
      const symbols = [...this.listeners.keys()]
      if (symbols.length) {
        this.send({ method: 'subscribe', params: { channel: 'ticker', symbol: symbols } })
      }
    })

    ws.addEventListener('message', (event) => this.handleMessage(event.data))
    ws.addEventListener('close', () => this.scheduleReconnect())
    ws.addEventListener('error', () => ws.close())
  }

  private handleMessage(raw: unknown): void {
    if (typeof raw !== 'string') return
    let msg: TickerMessage
    try {
      msg = JSON.parse(raw)
    } catch {
      return
    }
    if (msg.channel !== 'ticker' || !Array.isArray(msg.data)) return

    for (const t of msg.data) {
      if (!t.symbol) continue
      const prev = this.states.get(t.symbol)
      const next: TickerState = {
        symbol: t.symbol,
        last: t.last ?? prev?.last ?? 0,
        changePct: t.change_pct ?? prev?.changePct ?? 0,
        bid: t.bid ?? prev?.bid ?? 0,
        ask: t.ask ?? prev?.ask ?? 0,
      }
      this.states.set(t.symbol, next)
      this.notify(t.symbol)
    }
  }

  private notify(symbol: string): void {
    const set = this.listeners.get(symbol)
    if (!set) return
    for (const listener of set) listener()
  }

  private send(payload: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload))
    }
    // If not open yet, the `open` handler re-subscribes all active symbols.
  }

  private scheduleReconnect(): void {
    this.ws = null
    if (this.reconnectTimer || this.listeners.size === 0) return
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 15000)
    this.reconnectAttempts += 1
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.ensureConnected()
    }, delay)
  }
}

export const krakenSocket = new KrakenSocket()
