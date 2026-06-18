import { Skeleton } from '@borderline/ui'

/** Suspense fallback for lazily-loaded routes and streaming page data. */
export function RouteFallback() {
  return (
    <div className="space-y-6 p-6 md:p-8" role="status" aria-label="Loading page">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="h-64" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
