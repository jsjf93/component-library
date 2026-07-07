import type { Meta, StoryObj } from "@storybook/react-vite";
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
} from "@borderline/icons";
import { AppShell } from "../components/AppShell/AppShell";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { SidebarHeader } from "../components/Sidebar/SidebarHeader";
import { SidebarNav } from "../components/Sidebar/SidebarNav";
import { SidebarItem } from "../components/Sidebar/SidebarItem";
import { SidebarFooter } from "../components/Sidebar/SidebarFooter";
import { StatCard } from "../components/StatCard/StatCard";
import { Card } from "../components/Card/Card";

const meta: Meta = {
  title: "Recipes/Dashboard",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const sidebar = (
  <Sidebar>
    <SidebarHeader icon={<Leaf className="size-5" />}>Verdant</SidebarHeader>
    <SidebarNav>
      <SidebarItem active icon={<Home />}>
        Dashboard
      </SidebarItem>
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
);

const activity = [
  { name: "Stripe Inc.", amount: "+$4,200.00", positive: true },
  { name: "AWS Services", amount: "-$312.50", positive: false },
  { name: "Payroll Run", amount: "-$18,400.00", positive: false },
];

export const Default: Story = {
  render: () => (
    <AppShell sidebar={sidebar}>
      <div className="space-y-6 p-6 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">Good morning, James</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Balance" value="$128,400" />
          <StatCard title="Revenue" value="$34,200" />
          <StatCard title="Pending" value="$8,750" />
        </div>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Recent Activity
          </h2>
          <div className="mt-4 divide-y divide-border">
            {activity.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="text-foreground">{row.name}</span>
                <span
                  className={[
                    "font-mono",
                    row.positive
                      ? "text-success-foreground"
                      : "text-foreground",
                  ].join(" ")}
                >
                  {row.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  ),
};
