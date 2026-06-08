import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { StatCard } from './StatCard'
import { Badge } from './Badge'
import { Button } from './Button'

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

function SendIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function MoveIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { variant: 'default' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'highlighted'] },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    className: 'p-6 max-w-sm',
    children: (
      <div>
        <p className="text-sm font-semibold text-foreground">Card Title</p>
        <p className="mt-1 text-sm text-muted-foreground">Card content goes here. Any layout is possible inside.</p>
      </div>
    ),
  },
}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
    {children}
  </div>
)

export const Showcase: Story = {
  render: () => (
    <div className="space-y-10 p-8 bg-background min-h-screen max-w-5xl">
      <Section label="Stat Cards">
        <div className="grid grid-cols-4 gap-4">
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
      </Section>

      <Section label="Content Cards">
        <div className="grid grid-cols-3 gap-4 items-stretch">
          {/* Business Checking */}
          <Card className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">Business Checking</h3>
              <p className="mt-1 text-sm text-muted-foreground">Primary operating account</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground tracking-tight">
                $48,200<span className="text-xl font-semibold">.00</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground tracking-widest">
                ···· ···· ···· 4821
              </p>
            </div>
            <div className="mt-auto flex gap-2">
              <Button variant="outline" className="flex-1"><SendIcon /> Send</Button>
              <Button variant="outline" className="flex-1"><MoveIcon /> Move</Button>
            </div>
          </Card>

          {/* Savings Reserve */}
          <Card variant="highlighted" className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-foreground leading-snug">
                Savings Reserve
              </h3>
              <Badge variant="secondary" className="shrink-0 mt-0.5">Earning 4.8% APY</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">High-yield reserve account</p>
              <p className="mt-3 text-3xl font-bold text-foreground tracking-tight">
                $80,200<span className="text-xl font-semibold">.00</span>
              </p>
              <p className="mt-1 text-sm text-success-foreground">+$320 earned this month</p>
            </div>
            <div className="mt-auto">
              <Button fullWidth>Transfer Out</Button>
            </div>
          </Card>

          {/* Credit Line */}
          <Card className="p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold text-muted-foreground">Credit Line</h3>
              <p className="mt-1 text-sm text-muted-foreground">Not yet activated</p>
            </div>
            <div className="w-8 border-t-2 border-muted" />
            <div className="mt-auto">
              <Button variant="outline" fullWidth>Apply Now</Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section label="Badges & Chips">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="verified">Verified</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="review">Review</Badge>
          <Badge variant="failed">Failed</Badge>
        </div>
      </Section>
    </div>
  ),
}

export const Default: Story = {
  args: {
    className: 'p-6 max-w-sm',
    children: (
      <p className="text-sm text-muted-foreground">Default card — white background, subtle border.</p>
    ),
  },
}

export const Highlighted: Story = {
  args: {
    variant: 'highlighted',
    className: 'p-6 max-w-sm',
    children: (
      <p className="text-sm text-muted-foreground">Highlighted card — green border, light tinted background.</p>
    ),
  },
}

export const ContentCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-6 max-w-5xl items-stretch">
      <Card className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Business Checking</h3>
          <p className="mt-1 text-sm text-muted-foreground">Primary operating account</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground tracking-tight">
            $48,200<span className="text-xl font-semibold">.00</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground tracking-widest">···· ···· ···· 4821</p>
        </div>
        <div className="mt-auto flex gap-2">
          <Button variant="outline" className="flex-1"><SendIcon /> Send</Button>
          <Button variant="outline" className="flex-1"><MoveIcon /> Move</Button>
        </div>
      </Card>

      <Card variant="highlighted" className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-foreground leading-snug">Savings Reserve</h3>
          <Badge variant="secondary" className="shrink-0 mt-0.5">Earning 4.8% APY</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">High-yield reserve account</p>
          <p className="mt-3 text-3xl font-bold text-foreground tracking-tight">
            $80,200<span className="text-xl font-semibold">.00</span>
          </p>
          <p className="mt-1 text-sm text-success-foreground">+$320 earned this month</p>
        </div>
        <div className="mt-auto">
          <Button fullWidth>Transfer Out</Button>
        </div>
      </Card>

      <Card className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-muted-foreground">Credit Line</h3>
          <p className="mt-1 text-sm text-muted-foreground">Not yet activated</p>
        </div>
        <div className="w-8 border-t-2 border-muted" />
        <div className="mt-auto">
          <Button variant="outline" fullWidth>Apply Now</Button>
        </div>
      </Card>
    </div>
  ),
}
