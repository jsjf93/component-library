import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        aria-hidden
        className={['animate-skeleton-pulse rounded-md bg-muted', className]
          .filter(Boolean)
          .join(' ')}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
