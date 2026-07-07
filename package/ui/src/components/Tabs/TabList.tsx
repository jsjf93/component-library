import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { useTabsContext } from './Tabs'

export type TabListProps = HTMLAttributes<HTMLDivElement>

const TAB_SELECTOR = '[role="tab"]'

export function TabList({ className, children, ...props }: TabListProps) {
  const { value } = useTabsContext()
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hasMountedRef = useRef(false)
  const hintShownRef = useRef(false)

  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const [indicatorReady, setIndicatorReady] = useState(false)
  const [canScrollStart, setCanScrollStart] = useState(false)
  const [canScrollEnd, setCanScrollEnd] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const updateScrollState = () => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollEl
    setIsScrollable(scrollWidth > clientWidth + 1)
    setCanScrollStart(scrollLeft > 1)
    setCanScrollEnd(scrollLeft + clientWidth < scrollWidth - 1)
  }

  useLayoutEffect(() => {
    const trackEl = trackRef.current
    if (!trackEl) return
    const activeTab = trackEl.querySelector<HTMLElement>(
      `${TAB_SELECTOR}[data-value="${CSS.escape(value)}"]`,
    )
    if (activeTab) {
      setIndicator({ left: activeTab.offsetLeft, width: activeTab.offsetWidth })
      if (hasMountedRef.current) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
      }
    }
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      requestAnimationFrame(() => setIndicatorReady(true))
    }
  }, [value, children])

  useEffect(() => {
    updateScrollState()

    const scrollEl = scrollRef.current
    const trackEl = trackRef.current
    if (!scrollEl || !trackEl) return

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(scrollEl)
    resizeObserver.observe(trackEl)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (hintShownRef.current) return
    if (!isScrollable || !canScrollEnd) return
    hintShownRef.current = true
    setShowHint(true)
    const timeout = setTimeout(() => setShowHint(false), 1200)
    return () => clearTimeout(timeout)
  }, [isScrollable, canScrollEnd])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current
    if (!trackEl) return

    const tabs = Array.from(
      trackEl.querySelectorAll<HTMLButtonElement>(TAB_SELECTOR),
    ).filter(tab => !tab.disabled)
    if (tabs.length === 0) return

    const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement)

    let nextIndex: number | null = null
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % tabs.length
        break
      case 'ArrowLeft':
        nextIndex = currentIndex === -1 ? 0 : (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    nextTab.focus()
    nextTab.click()
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="ui-tabs-scrollbar-hide overflow-x-auto"
      >
        <div
          {...props}
          ref={trackRef}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={[
            'relative inline-flex items-center gap-1 rounded-full bg-muted p-1',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span
            aria-hidden
            className={[
              'absolute left-0 inset-y-1 rounded-full bg-card border border-border shadow-sm',
              indicatorReady ? 'transition-[transform,width] duration-200 ease motion-reduce:transition-none' : '',
            ].join(' ')}
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
          />
          {children}
        </div>
      </div>

      {isScrollable && (
        <>
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-muted to-transparent transition-opacity duration-200',
              canScrollStart ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
          <div
            aria-hidden
            className={[
              'pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-muted to-transparent transition-opacity duration-200',
              canScrollEnd ? 'opacity-100' : 'opacity-0',
              showHint ? 'motion-safe:animate-tabs-scroll-hint' : '',
            ].join(' ')}
          />
        </>
      )}
    </div>
  )
}

TabList.displayName = 'TabList'
