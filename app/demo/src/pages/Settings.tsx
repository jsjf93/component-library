import { Card, RadioGroup, Toggle } from '@borderline/ui'
import { PageHeading } from '../components/PageHeading'
import { useSettings } from '../state/SettingsContext'
import type { Currency } from '../lib/format'

const CURRENCY_OPTIONS = [
  { value: 'GBP', label: 'British Pound (£)', description: 'Show prices quoted in GBP' },
  { value: 'USD', label: 'US Dollar ($)', description: 'Show prices quoted in USD' },
  { value: 'EUR', label: 'Euro (€)', description: 'Show prices quoted in EUR' },
]

export default function Settings() {
  const {
    currency,
    setCurrency,
    liveAnimations,
    setLiveAnimations,
    compactNumbers,
    setCompactNumbers,
  } = useSettings()

  return (
    <div className="max-w-2xl space-y-6 p-6 md:p-8">
      <PageHeading title="Settings" subtitle="Preferences are saved to this browser." />

      <Card className="p-5">
        <RadioGroup
          name="currency"
          label="Display currency"
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={(value) => setCurrency(value as Currency)}
        />
      </Card>

      <Card className="space-y-5 p-5">
        <h2 className="text-sm font-semibold text-foreground">Display</h2>
        <Toggle
          label="Animate live price updates"
          checked={liveAnimations}
          onChange={setLiveAnimations}
        />
        <Toggle
          label="Compact large numbers (1.2K, 3.4M)"
          checked={compactNumbers}
          onChange={setCompactNumbers}
        />
      </Card>
    </div>
  )
}
