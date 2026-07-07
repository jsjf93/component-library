import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./Modal";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Alert } from "../Alert";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  args: { open: false, onClose: () => {} },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="md">
          <ModalHeader title="Modal Title" onClose={() => setOpen(false)} />
          <ModalBody>
            <p className="text-sm text-muted-foreground">
              This is the modal body. You can put any content here — forms,
              data, confirmations, or anything else.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader title="Delete Account" onClose={() => setOpen(false)} />
          <ModalBody>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Send Transfer</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="md">
          <ModalHeader title="New Transfer" onClose={() => setOpen(false)} />
          <ModalBody>
            <div className="space-y-4">
              <Alert variant="info" title="Note">
                Transfers typically settle within 1–2 business days.
              </Alert>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="recipient"
                >
                  Recipient
                </label>
                <Input id="recipient" placeholder="Account number or email" />
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="amount"
                >
                  Amount (USD)
                </label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="note"
                >
                  Note (optional)
                </label>
                <Textarea
                  id="note"
                  placeholder="What's this transfer for?"
                  rows={3}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send Transfer</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const transactions = [
      {
        id: 1,
        date: "21 Jun 2026",
        description: "Stripe payout",
        amount: "+$4,200.00",
        status: "Settled",
      },
      {
        id: 2,
        date: "20 Jun 2026",
        description: "AWS subscription",
        amount: "-$312.00",
        status: "Settled",
      },
      {
        id: 3,
        date: "19 Jun 2026",
        description: "Contractor payment",
        amount: "-$1,800.00",
        status: "Pending",
      },
      {
        id: 4,
        date: "18 Jun 2026",
        description: "Stripe payout",
        amount: "+$3,850.00",
        status: "Settled",
      },
      {
        id: 5,
        date: "17 Jun 2026",
        description: "Office supplies",
        amount: "-$94.50",
        status: "Settled",
      },
    ];
    return (
      <>
        <Button onClick={() => setOpen(true)}>View Transactions</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <ModalHeader
            title="Transaction History"
            onClose={() => setOpen(false)}
          />
          <ModalBody>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-3 text-muted-foreground">{tx.date}</td>
                    <td className="py-3 text-foreground">{tx.description}</td>
                    <td
                      className={[
                        "py-3 text-right font-medium tabular-nums",
                        tx.amount.startsWith("+")
                          ? "text-success-foreground"
                          : "text-foreground",
                      ].join(" ")}
                    >
                      {tx.amount}
                    </td>
                    <td className="py-3 text-right text-muted-foreground">
                      {tx.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="secondary">Export CSV</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const NoHeader: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Headerless Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalBody>
            <p className="text-sm text-muted-foreground">
              A modal with no header or footer — just raw content. Pressing
              Escape or clicking the backdrop will still close it.
            </p>
          </ModalBody>
        </Modal>
      </>
    );
  },
};
