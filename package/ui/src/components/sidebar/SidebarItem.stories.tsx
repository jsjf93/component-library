import type { ComponentPropsWithoutRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home, Wallet, Send, BarChart } from '@borderline/icons'
import { SidebarItem } from './SidebarItem'

/** Stand-in for a router Link (e.g. React Router) to show the `as` prop. */
const RouterLink = ({ to, ...props }: { to: string } & ComponentPropsWithoutRef<'a'>) => (
  <a href={to} {...props} />
)

const meta: Meta<typeof SidebarItem> = {
  title: 'Components/Sidebar/SidebarItem',
  component: SidebarItem,
  parameters: { layout: 'centered' },
  args: { children: 'Dashboard' },
  argTypes: {
    active: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-56 rounded-lg border border-border bg-card p-2">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarItem>

export const Active: Story = {
  args: { active: true, icon: <Home />, children: 'Dashboard' },
}

export const Inactive: Story = {
  args: { active: false, icon: <Wallet />, children: 'Accounts' },
}

export const WithoutIcon: Story = {
  args: { children: 'Settings' },
}

export const AsRouterLink: Story = {
  render: () => (
    <SidebarItem as={RouterLink} to="/dashboard" active icon={<Home />}>
      Dashboard
    </SidebarItem>
  ),
}

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <SidebarItem active icon={<Home />}>Dashboard</SidebarItem>
      <SidebarItem icon={<Wallet />}>Accounts</SidebarItem>
      <SidebarItem icon={<Send />}>Transfers</SidebarItem>
      <SidebarItem icon={<BarChart />}>Analytics</SidebarItem>
    </div>
  ),
}
