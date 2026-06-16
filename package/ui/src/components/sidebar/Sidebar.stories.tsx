import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Leaf,
  Home,
  Wallet,
  Send,
  Receipt,
  BarChart,
  CreditCard,
  Shield,
  Settings,
} from '@borderline/icons'
import { Sidebar } from './Sidebar'
import { SidebarHeader } from './SidebarHeader'
import { SidebarNav } from './SidebarNav'
import { SidebarItem } from './SidebarItem'
import { SidebarFooter } from './SidebarFooter'

const meta = {
  title: 'Components/Sidebar/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <Sidebar>
        <SidebarHeader icon={<Leaf className="size-5" />}>Verdant</SidebarHeader>
        <SidebarNav>
          <SidebarItem active icon={<Home />}>Dashboard</SidebarItem>
          <SidebarItem icon={<Wallet />}>Accounts</SidebarItem>
          <SidebarItem icon={<Send />}>Transfers</SidebarItem>
          <SidebarItem icon={<Receipt />}>Transactions</SidebarItem>
          <SidebarItem icon={<BarChart />}>Analytics</SidebarItem>
          <SidebarItem icon={<CreditCard />}>Cards</SidebarItem>
          <SidebarItem icon={<Shield />}>Security</SidebarItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarItem icon={<Settings />}>Settings</SidebarItem>
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
}
