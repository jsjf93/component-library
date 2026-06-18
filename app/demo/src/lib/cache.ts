/**
 * A tiny module-level promise cache so React 19's `use()` reads a *stable*
 * promise per key across renders instead of refetching on every render.
 *
 * `getCached(key, fetcher)` returns the same promise for a given key until it
 * is invalidated. `invalidate(key)` drops it so the next read refetches —
 * which is how the error-boundary "Retry" button forces a fresh request.
 */
const cache = new Map<string, Promise<unknown>>()

export function getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = cache.get(key)
  if (existing) return existing as Promise<T>

  const promise = fetcher().catch((error) => {
    // Don't cache failures — let the next attempt retry.
    cache.delete(key)
    throw error
  })
  cache.set(key, promise)
  return promise
}

export function invalidate(key: string): void {
  cache.delete(key)
}

/** Invalidate every cached key whose name starts with `prefix`. */
export function invalidatePrefix(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) cache.delete(key)
  }
}
