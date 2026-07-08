import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { HTMLAttributes } from "react";
import { useTabsContext } from "./TabsContext";

export type TabListProps = HTMLAttributes<HTMLDivElement>;

const TAB_SELECTOR = '[role="tab"]';

export function TabList({
  className,
  children,
  onKeyDown,
  ...props
}: TabListProps) {
  const { value } = useTabsContext();
  const childCount = Children.count(children);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const hintShownRef = useRef(false);
  const prevValueRef = useRef(value);
  // Mirror of `value` for the ResizeObserver callback, which is set up once and
  // must read the latest value when it fires later. Kept in sync via an effect
  // (never mutated during render).
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [indicatorReady, setIndicatorReady] = useState(false);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const updateScrollState = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
    setIsScrollable(scrollWidth > clientWidth + 1);
    setCanScrollStart(scrollLeft > 1);
    setCanScrollEnd(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const positionIndicator = useCallback((targetValue: string) => {
    const trackEl = trackRef.current;
    if (!trackEl) return null;
    const activeTab = trackEl.querySelector<HTMLElement>(
      `${TAB_SELECTOR}[data-value="${CSS.escape(targetValue)}"]`,
    );
    if (activeTab) {
      setIndicator({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    } else {
      setIndicator((prev) => (prev.width === 0 ? prev : { ...prev, width: 0 }));
    }
    return activeTab;
  }, []);

  const updateRovingTabIndex = useCallback((targetValue: string) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const tabs = Array.from(
      trackEl.querySelectorAll<HTMLButtonElement>(TAB_SELECTOR),
    );
    if (tabs.length === 0) return;
    const activeEnabled = tabs.find(
      (tab) => tab.dataset.value === targetValue && !tab.disabled,
    );
    const firstEnabled = tabs.find((tab) => !tab.disabled);
    const target = activeEnabled ?? firstEnabled ?? tabs[0];
    tabs.forEach((tab) => {
      tab.tabIndex = tab === target ? 0 : -1;
    });
  }, []);

  useLayoutEffect(() => {
    const activeTab = positionIndicator(value);
    updateRovingTabIndex(value);

    // Only scroll the active tab into view on an actual selection change — not
    // on unrelated parent re-renders or when the tab set changes.
    const valueChanged = prevValueRef.current !== value;
    prevValueRef.current = value;
    if (valueChanged && activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "nearest",
      });
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      const raf = requestAnimationFrame(() => setIndicatorReady(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [value, childCount, positionIndicator, updateRovingTabIndex]);

  useEffect(() => {
    updateScrollState();

    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const handleResize = () => {
      updateScrollState();
      positionIndicator(valueRef.current);
      updateRovingTabIndex(valueRef.current);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(scrollEl);
    resizeObserver.observe(trackEl);

    return () => resizeObserver.disconnect();
  }, [updateScrollState, positionIndicator, updateRovingTabIndex]);

  useEffect(() => {
    if (hintShownRef.current) return;
    if (!isScrollable || !canScrollEnd) return;
    hintShownRef.current = true;
    const raf = requestAnimationFrame(() => setShowHint(true));
    const timeout = setTimeout(() => setShowHint(false), 1200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [isScrollable, canScrollEnd]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const tabs = Array.from(
      trackEl.querySelectorAll<HTMLButtonElement>(TAB_SELECTOR),
    ).filter((tab) => !tab.disabled);
    if (tabs.length === 0) return;

    const currentIndex = tabs.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    let nextIndex: number | null = null;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex =
          currentIndex === -1
            ? 0
            : (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    nextTab.click();
  };

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
          onKeyDown={(event) => {
            onKeyDown?.(event);
            handleKeyDown(event);
          }}
          className={[
            "relative inline-flex items-center gap-1 rounded-full bg-muted p-1",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            aria-hidden
            className={[
              "absolute left-0 inset-y-1 rounded-full bg-card border border-border shadow-sm",
              indicatorReady
                ? "transition-[transform,width] duration-200 ease motion-reduce:transition-none"
                : "",
            ].join(" ")}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
          {children}
        </div>
      </div>

      {isScrollable && (
        <>
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-muted to-transparent transition-opacity duration-200",
              canScrollStart ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-muted to-transparent transition-opacity duration-200",
              canScrollEnd ? "opacity-100" : "opacity-0",
              showHint ? "motion-safe:animate-tabs-scroll-hint" : "",
            ].join(" ")}
          />
        </>
      )}
    </div>
  );
}

TabList.displayName = "TabList";
