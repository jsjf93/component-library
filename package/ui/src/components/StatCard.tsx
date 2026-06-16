import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { Card } from './Card'
import { TrendUp, TrendDown } from '@borderline/icons'

export type StatCardTrend = {
  value: string
  direction: 'up' | 'down'
}

export type StatCardProps = {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: StatCardTrend
  className?: string
}


export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, icon, trend, className }, ref) => (
    <Card ref={ref} className={['p-5', className].filter(Boolean).join(' ')}>
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon && (
          <div className="flex items-center justify-center size-9 rounded-lg bg-secondary text-secondary-foreground shrink-0">
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold text-foreground tracking-tight">
        {value}
      </p>
      {trend && (
        <div
          className={[
            'mt-2 flex items-center gap-1.5 text-sm font-medium',
            trend.direction === 'up' ? 'text-success-foreground' : 'text-danger-foreground',
          ].join(' ')}
        >
          {trend.direction === 'up' ? <TrendUp className="size-4 shrink-0" /> : <TrendDown className="size-4 shrink-0" />}
          <span>{trend.value}</span>
        </div>
      )}
    </Card>
  ),
)

StatCard.displayName = 'StatCard'
