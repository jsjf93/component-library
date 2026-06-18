/* eslint-disable react-refresh/only-export-components -- provider + hook are intentionally colocated */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** A single portfolio holding: a Kraken pair plus how much of the base asset you hold. */
export type Holding = {
  /** WebSocket symbol, e.g. `BTC/GBP`. */
  symbol: string
  /** REST pair name, e.g. `XBTGBP` (kept so detail pages can fetch without a lookup). */
  restName: string
  base: string
  quote: string
  amount: number
}

type PortfolioContextValue = {
  holdings: Holding[]
  addHolding: (holding: Holding) => void
  removeHolding: (symbol: string) => void
}

const STORAGE_KEY = 'verdant.portfolio.v1'

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

function loadHoldings(): Holding[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Holding[]) : []
  } catch {
    return []
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [holdings, setHoldings] = useState<Holding[]>(loadHoldings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings))
  }, [holdings])

  const addHolding = useCallback((holding: Holding) => {
    setHoldings((prev) => {
      // Merge amounts if the symbol is already held.
      const existing = prev.find((h) => h.symbol === holding.symbol)
      if (existing) {
        return prev.map((h) =>
          h.symbol === holding.symbol ? { ...h, amount: h.amount + holding.amount } : h,
        )
      }
      return [...prev, holding]
    })
  }, [])

  const removeHolding = useCallback((symbol: string) => {
    setHoldings((prev) => prev.filter((h) => h.symbol !== symbol))
  }, [])

  const value = useMemo(
    () => ({ holdings, addHolding, removeHolding }),
    [holdings, addHolding, removeHolding],
  )

  return <PortfolioContext value={value}>{children}</PortfolioContext>
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within a PortfolioProvider')
  return ctx
}
