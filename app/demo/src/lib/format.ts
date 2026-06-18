/** The fiat currencies the demo lets you price holdings in. */
export type Currency = 'GBP' | 'USD' | 'EUR'

const CURRENCY_LOCALE: Record<Currency, string> = {
  GBP: 'en-GB',
  USD: 'en-US',
  EUR: 'de-DE',
}

/** Format a number as a localised currency string, e.g. `£1,234.56`. */
export function formatCurrency(value: number, currency: Currency): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: value !== 0 && Math.abs(value) < 1 ? 6 : 2,
  }).format(value)
}

/** Format a signed percentage with two decimals, e.g. `+2.41%`. */
export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/** Compact number formatting for volumes, e.g. `1.2K`, `3.4M`. */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}
