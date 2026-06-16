import type { Meta, StoryObj } from '@storybook/react-vite'
import { Leaf, Home, Wallet, Send, BarChart, Settings } from '@borderline/icons'
import { AppShell } from './AppShell'
import { Sidebar } from './sidebar/Sidebar'
import { SidebarHeader } from './sidebar/SidebarHeader'
import { SidebarNav } from './sidebar/SidebarNav'
import { SidebarItem } from './sidebar/SidebarItem'
import { SidebarFooter } from './sidebar/SidebarFooter'

const meta: Meta<typeof AppShell> = {
  title: 'Components/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof AppShell>

const nav = (
  <Sidebar>
    <SidebarHeader icon={<Leaf className="size-5" />}>Verdant</SidebarHeader>
    <SidebarNav>
      <SidebarItem active icon={<Home />}>Dashboard</SidebarItem>
      <SidebarItem icon={<Wallet />}>Accounts</SidebarItem>
      <SidebarItem icon={<Send />}>Transfers</SidebarItem>
      <SidebarItem icon={<BarChart />}>Analytics</SidebarItem>
    </SidebarNav>
    <SidebarFooter>
      <SidebarItem icon={<Settings />}>Settings</SidebarItem>
    </SidebarFooter>
  </Sidebar>
)

export const Default: Story = {
  render: () => (
    <AppShell sidebar={nav}>
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Content area</h1>
        <p className="mt-2 text-muted-foreground">
          Resize to a narrow viewport to reveal the hamburger and slide-in drawer.
        </p>
      </div>
    </AppShell>
  ),
}
