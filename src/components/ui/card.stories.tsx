import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

/**
 * Card component for containing and organizing related content.
 * 
 * Built with a composable structure using Card, CardHeader, CardTitle, CardDescription,
 * CardContent, and CardFooter sub-components. Ideal for displaying grouped information,
 * product details, user profiles, settings panels, and dashboard widgets.
 */
const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card with header and content.
 * Most common pattern for displaying information.
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with header, content, and footer actions.
 * Common for forms or items requiring user interaction.
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action cannot be undone. Please confirm to continue.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Product card showcasing e-commerce pattern.
 * Includes image placeholder, details, and call-to-action.
 */
export const ProductCard: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader className="p-0">
        <div className="aspect-square w-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg" />
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="mb-2">Premium Headphones</CardTitle>
        <CardDescription className="mb-4">
          High-quality wireless headphones with noise cancellation
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$299</span>
          <span className="text-sm text-muted-foreground line-through">$399</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="outline" size="icon" aria-label="Add to wishlist">
          ♥
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * User profile card with avatar and bio.
 * Common pattern for team members or social features.
 */
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[340px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
          <div>
            <CardTitle>Jane Cooper</CardTitle>
            <CardDescription>Senior Product Designer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about creating delightful user experiences. 
          Based in San Francisco, working remotely worldwide.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">Message</Button>
        <Button className="flex-1">Follow</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Stats card for dashboard displays.
 * Shows key metrics with visual indicators.
 */
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[280px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className="text-green-600">+20.1%</span> from last month
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Notification card with timestamp and actions.
 * Typical pattern for activity feeds or alerts.
 */
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400" />
            <div>
              <CardTitle className="text-base">New Order Received</CardTitle>
              <CardDescription>Order #12345 from John Doe</CardDescription>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">2m ago</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          A new order has been placed for 3 items totaling $127.50
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" variant="outline">View Details</Button>
        <Button size="sm">Process Order</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Empty state card when no content is available.
 * Helpful pattern for guiding users to take action.
 */
export const EmptyState: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="9" x2="15" y1="12" y2="12" />
            <line x1="12" x2="12" y1="9" y2="15" />
          </svg>
        </div>
        <CardTitle className="text-center mb-2">No items yet</CardTitle>
        <CardDescription className="text-center mb-6">
          Get started by creating your first item
        </CardDescription>
        <Button>Create New Item</Button>
      </CardContent>
    </Card>
  ),
};

/**
 * Form card with input fields and validation.
 * Common pattern for settings or data entry.
 */
export const FormCard: Story = {
  render: () => (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Update your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea 
            placeholder="Tell us about yourself" 
            className="w-full px-3 py-2 border rounded-md resize-none"
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Compact card for tight layouts.
 * Useful in grid layouts or mobile views.
 */
export const Compact: Story = {
  render: () => (
    <Card className="w-[240px]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Active Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * Multiple cards in a grid layout.
 * Shows how cards work together in responsive layouts.
 */
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$24,567</p>
          <p className="text-xs text-green-600">+12.5%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">New Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">432</p>
          <p className="text-xs text-green-600">+8.2%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">28</p>
          <p className="text-xs text-red-600">-3.1%</p>
        </CardContent>
      </Card>
    </div>
  ),
};
