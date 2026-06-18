import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
} from '@borderline/ui'
import { Leaf, Home, BarChart, Settings, Wallet } from '@borderline/icons'
import { NavItem } from './NavItem'

type AppSidebarProps = {
  /** Provided by `AppShell` when it clones the sidebar for the mobile drawer. */
  open?: boolean
  onClose?: () => void
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  return (
    <Sidebar open={open} onClose={onClose}>
      <SidebarHeader icon={<Leaf className="size-5" />}>Verdant</SidebarHeader>
      <SidebarNav label="Menu">
        <NavItem to="/" icon={<Home />} onNavigate={onClose}>
          Portfolio
        </NavItem>
        <NavItem to="/markets" icon={<BarChart />} onNavigate={onClose}>
          Markets
        </NavItem>
        <NavItem to="/settings" icon={<Settings />} onNavigate={onClose}>
          Settings
        </NavItem>
      </SidebarNav>
      <SidebarFooter>
        <div className="flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground">
          <Wallet className="size-4 shrink-0" />
          <span>Live data via Kraken</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
