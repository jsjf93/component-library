/* eslint-disable react-refresh/only-export-components -- provider + hook are intentionally colocated */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Currency } from '../lib/format'

type Settings = {
  currency: Currency
  /** Whether live-updating prices animate on change (respected by PriceTicker). */
  liveAnimations: boolean
  compactNumbers: boolean
}

type SettingsContextValue = Settings & {
  setCurrency: (currency: Currency) => void
  setLiveAnimations: (on: boolean) => void
  setCompactNumbers: (on: boolean) => void
}

const STORAGE_KEY = 'verdant.settings.v1'

const DEFAULTS: Settings = {
  currency: 'GBP',
  liveAnimations: true,
  compactNumbers: false,
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) }
  } catch {
    return DEFAULTS
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...settings,
      setCurrency: (currency) => setSettings((s) => ({ ...s, currency })),
      setLiveAnimations: (liveAnimations) => setSettings((s) => ({ ...s, liveAnimations })),
      setCompactNumbers: (compactNumbers) => setSettings((s) => ({ ...s, compactNumbers })),
    }),
    [settings],
  )

  return <SettingsContext value={value}>{children}</SettingsContext>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider')
  return ctx
}
