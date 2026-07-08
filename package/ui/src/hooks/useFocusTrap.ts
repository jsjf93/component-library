import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'

/**
 * Shared dialog-style keyboard behavior: traps Tab/Shift+Tab within the
 * returned panel ref, closes on Escape, moves focus into the panel when
 * `active` becomes true, and restores focus to the previously focused
 * element when it becomes false. Used by both Modal and the Sidebar's
 * mobile drawer so they share one dialog-accessibility implementation.
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  onClose: () => void,
) {
  const panelRef = useRef<T>(null)
  const triggerRef = useRef<Element | null>(null)
  const hasOpenedRef = useRef(false)

  useEffect(() => {
    if (active) {
      hasOpenedRef.current = true
      triggerRef.current = document.activeElement
      const firstFocusable =
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      ;(firstFocusable ?? panelRef.current)?.focus()
    } else if (hasOpenedRef.current) {
      ;(triggerRef.current as HTMLElement | null)?.focus()
      triggerRef.current = null
    }
  }, [active])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!active) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, handleKeyDown])

  return panelRef
}
