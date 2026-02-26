import type { Meta, StoryObj } from '@storybook/react';
import { InfoCard, InfoCardRow } from './info-card';

/**
 * InfoCard component for displaying structured information in a formatted layout.
 * 
 * Used to present key-value pairs in a clean, organized manner. Common in dashboards,
 * order summaries, user profiles, and detail views. Features highlighted rows for
 * emphasis (like totals) and consistent spacing between items.
 */
const meta = {
  title: 'UI/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title displayed above the content',
    },
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;
// ...existing code...

/**
 * Default info card with multiple rows.
 */
export const Default: Story = {
  args: {
    title: "Order Summary",
    children: null,
  },
  render: () => (
    <InfoCard title="Order Summary">
      <InfoCardRow label="Subtotal" value="$45.00" />
      <InfoCardRow label="Shipping" value="$5.00" />
      <InfoCardRow label="Tax" value="$4.50" />
      <InfoCardRow label="Total" value="$54.50" highlighted />
    </InfoCard>
  ),
};

/**
 * Empty info card with no rows.
 */
export const Empty: Story = {
  args: {
    title: "No Information",
    children: null,
  },
  render: () => (
    <InfoCard title="No Information">
      <div className="text-center py-8 text-sm text-muted-foreground">
        No data available
      </div>
    </InfoCard>
  ),
};

/**
 * Loading state with skeleton rows.
 */
export const Loading: Story = {
  args: {
    title: "Loading Details",
    children: null,
  },
  render: () => (
    <InfoCard title="Loading Details">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between pb-10 last:pb-0 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </InfoCard>
  ),
};

/**
 * Error state in info card.
 */
export const Error: Story = {
  args: {
    title: "Order Details",
    children: null,
  },
  render: () => (
    <InfoCard title="Order Details">
      <div className="text-center py-8">
        <p className="text-sm text-red-500 font-medium">Failed to load details</p>
        <button className="text-sm text-blue-500 underline mt-2">Retry</button>
      </div>
    </InfoCard>
  ),
};

/**
 * User profile information.
 */
export const UserProfile: Story = {
  args: {
    title: "User Information",
    children: null,
  },
  render: () => (
    <InfoCard title="User Information">
      <InfoCardRow label="Name" value="John Doe" />
      <InfoCardRow label="Email" value="john@example.com" />
      <InfoCardRow label="Phone" value="+1 (555) 123-4567" />
      <InfoCardRow label="Member Since" value="Jan 2024" />
      <InfoCardRow label="Status" value="Active" highlighted />
    </InfoCard>
  ),
};

/**
 * Order details with highlighted total.
 */
export const OrderDetails: Story = {
  args: {
    title: "Order #12345",
    children: null,
  },
  render: () => (
    <InfoCard title="Order #12345">
      <InfoCardRow label="Items" value={3} />
      <InfoCardRow label="Subtotal" value="$125.99" />
      <InfoCardRow label="Discount (10%)" value="-$12.60" />
      <InfoCardRow label="Shipping" value="$8.00" />
      <InfoCardRow label="Tax" value="$10.84" />
      <InfoCardRow label="Total Amount" value="$132.23" highlighted />
    </InfoCard>
  ),
};

/**
 * Product specifications.
 */
export const ProductSpecs: Story = {
  args: {
    title: "Product Specifications",
    children: null,
  },
  render: () => (
    <InfoCard title="Product Specifications">
      <InfoCardRow label="Model" value="XR-2024" />
      <InfoCardRow label="Dimensions" value="10 x 5 x 2 inches" />
      <InfoCardRow label="Weight" value="1.5 lbs" />
      <InfoCardRow label="Color" value="Space Gray" />
      <InfoCardRow label="Material" value="Aluminum" />
      <InfoCardRow label="Warranty" value="2 Years" />
    </InfoCard>
  ),
};

/**
 * Billing information.
 */
export const BillingInfo: Story = {
  args: {
    title: "Billing Details",
    children: null,
  },
  render: () => (
    <InfoCard title="Billing Details">
      <InfoCardRow label="Card Type" value="Visa" />
      <InfoCardRow label="Card Number" value="**** **** **** 4242" />
      <InfoCardRow label="Expiry Date" value="12/26" />
      <InfoCardRow label="Billing Address" value="123 Main St, City" />
      <InfoCardRow label="Next Billing" value="Mar 1, 2026" highlighted />
    </InfoCard>
  ),
};

/**
 * Shipping information.
 */
export const ShippingInfo: Story = {
  args: {
    title: "Shipping Details",
    children: null,
  },
  render: () => (
    <InfoCard title="Shipping Details">
      <InfoCardRow label="Method" value="Express Shipping" />
      <InfoCardRow label="Carrier" value="FedEx" />
      <InfoCardRow label="Tracking" value="1Z999AA10123456784" />
      <InfoCardRow label="Est. Delivery" value="Feb 28, 2026" />
      <InfoCardRow label="Status" value="In Transit" highlighted />
    </InfoCard>
  ),
};

/**
 * Account statistics.
 */
export const AccountStats: Story = {
  args: {
    title: "Account Statistics",
    children: null,
  },
  render: () => (
    <InfoCard title="Account Statistics">
      <InfoCardRow label="Total Orders" value={42} />
      <InfoCardRow label="Active Subscriptions" value={2} />
      <InfoCardRow label="Rewards Points" value={1250} />
      <InfoCardRow label="Account Balance" value="$150.00" highlighted />
    </InfoCard>
  ),
};

/**
 * Single row info card.
 */
export const SingleRow: Story = {
  args: {
    title: "Account Balance",
    children: null,
  },
  render: () => (
    <InfoCard title="Account Balance">
      <InfoCardRow label="Available Balance" value="$1,234.56" highlighted />
    </InfoCard>
  ),
};

/**
 * Custom styling with className.
 */
export const CustomWidth: Story = {
  args: {
    title: "Custom Width",
    children: null,
  },
  render: () => (
    <InfoCard title="Custom Width" className="w-96">
      <InfoCardRow label="Field 1" value="Value 1" />
      <InfoCardRow label="Field 2" value="Value 2" />
      <InfoCardRow label="Total" value="Summary" highlighted />
    </InfoCard>
  ),
};

/**
 * Multiple info cards side by side.
 */
export const MultipleCards: Story = {
  args: {
    title: "Multiple Cards",
    children: null,
  },
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <InfoCard title="Card 1" className="w-80">
        <InfoCardRow label="Item A" value="100" />
        <InfoCardRow label="Item B" value="200" />
        <InfoCardRow label="Total" value="300" highlighted />
      </InfoCard>
      
      <InfoCard title="Card 2" className="w-80">
        <InfoCardRow label="Revenue" value="$5,000" />
        <InfoCardRow label="Expenses" value="$3,000" />
        <InfoCardRow label="Profit" value="$2,000" highlighted />
      </InfoCard>
    </div>
  ),
};