import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarItem } from '@borderline/ui'

type NavItemProps = {
  to: string
  icon?: ReactNode
  children: ReactNode
  /** Close the mobile drawer (if open) after navigating. */
  onNavigate?: () => void
}

/**
 * A router-aware `SidebarItem`: renders a real `<Link>` and derives `active`
 * from the current location, so the library's `aria-current="page"` is correct.
 */
export function NavItem({ to, icon, children, onNavigate }: NavItemProps) {
  const { pathname } = useLocation()
  const active = to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <SidebarItem as={Link} to={to} icon={icon} active={active} onClick={onNavigate}>
      {children}
    </SidebarItem>
  )
}
