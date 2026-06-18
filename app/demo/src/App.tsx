import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AppShell } from '@borderline/ui'
import { AppSidebar } from './components/AppSidebar'
import { SkipLink } from './components/SkipLink'
import { RouteFallback } from './components/RouteFallback'
import { ErrorBoundary } from './components/ErrorBoundary'
import { resetAllMarketData } from './lib/data'

/**
 * Layout route: the persistent shell (sidebar + mobile drawer via `AppShell`)
 * wrapped around a single Suspense boundary that the lazily-loaded pages stream
 * into. The sidebar stays interactive while a page's chunk/data loads.
 */
export function App() {
  return (
    <>
      <SkipLink />
      <AppShell sidebar={<AppSidebar />}>
        <div id="main" tabIndex={-1} className="outline-none">
          <ErrorBoundary label="this page" onReset={resetAllMarketData}>
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      </AppShell>
    </>
  )
}
