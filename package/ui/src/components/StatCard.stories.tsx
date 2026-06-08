import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

function WalletIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 12h.01" strokeWidth="2.5" />
      <path d="M2 10h20" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  )
}

function PaymentIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  )
}

function CreditCardIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  args: {
    title: 'Total Balance',
    value: '$128,400',
    trend: { value: '+4.2% vs last month', direction: 'up' },
  },
  argTypes: {},
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { icon: <WalletIcon /> },
}

export const Showcase: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-6 max-w-4xl">
      <StatCard
        title="Total Balance"
        value="$128,400"
        icon={<WalletIcon />}
        trend={{ value: '+4.2% vs last month', direction: 'up' }}
      />
      <StatCard
        title="Monthly Revenue"
        value="$34,200"
        icon={<BarChartIcon />}
        trend={{ value: '+11.8% vs last month', direction: 'up' }}
      />
      <StatCard
        title="Pending Payments"
        value="$8,750"
        icon={<PaymentIcon />}
        trend={{ value: '-2.1% vs last month', direction: 'down' }}
      />
      <StatCard
        title="Accounts Active"
        value="12"
        icon={<CreditCardIcon />}
        trend={{ value: '+3 vs last month', direction: 'up' }}
      />
    </div>
  ),
}

export const WithoutIcon: Story = {
  args: { value: '$34,200', title: 'Monthly Revenue' },
}

export const Trends: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-6 max-w-xl">
      <StatCard
        title="Revenue"
        value="$34,200"
        trend={{ value: '+11.8% vs last month', direction: 'up' }}
      />
      <StatCard
        title="Chargebacks"
        value="$1,240"
        trend={{ value: '-2.1% vs last month', direction: 'down' }}
      />
    </div>
  ),
}
