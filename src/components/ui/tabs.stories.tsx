import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

/**
 * Tabs component for organizing content into switchable panels.
 * 
 * Built on Radix UI Tabs primitive. Used to organize related content into
 * separate views that users can switch between. Common in settings pages,
 * dashboards, product details, and complex forms. Only one tab is active at a time.
 */
const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default active tab',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs with three panels.
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <h3 className="font-medium mb-2">Tab 1 Content</h3>
        <p className="text-sm text-muted-foreground">
          This is the content for the first tab.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <h3 className="font-medium mb-2">Tab 2 Content</h3>
        <p className="text-sm text-muted-foreground">
          This is the content for the second tab.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <h3 className="font-medium mb-2">Tab 3 Content</h3>
        <p className="text-sm text-muted-foreground">
          This is the content for the third tab.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Empty tabs with no content.
 */
export const Empty: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Empty Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <p className="text-sm text-muted-foreground text-center py-8">
          No content available
        </p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Loading state in tab content.
 */
export const Loading: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Loading</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Ready</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading content...</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <p className="text-sm">This tab loaded successfully!</p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Error state in tab content.
 */
export const Error: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Error</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">Normal</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <div className="text-center py-8 space-y-2">
          <p className="text-sm font-medium text-red-500">Failed to load content</p>
          <p className="text-xs text-muted-foreground">Please try again later</p>
          <button className="text-sm text-blue-500 underline mt-2">Retry</button>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <p className="text-sm">This tab works fine!</p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Disabled tab trigger.
 */
export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">Active</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <p className="text-sm">First tab content</p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <p className="text-sm">Third tab content</p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Account settings with multiple tabs.
 */
export const SettingsTabs: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[600px]">
      <TabsList className="w-full">
        <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
        <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
        <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-4 p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Display Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            defaultValue="Software developer"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="security" className="space-y-4 p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded-md" />
        </div>
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Email notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Push notifications</span>
          <input type="checkbox" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">SMS notifications</span>
          <input type="checkbox" />
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Product details with tabs.
 */
export const ProductTabs: Story = {
  render: () => (
    <Tabs defaultValue="description" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="p-4 space-y-2">
        <h3 className="font-semibold">Product Description</h3>
        <p className="text-sm text-muted-foreground">
          This is a high-quality product designed for everyday use. 
          It features durable construction and modern design that fits any environment.
        </p>
      </TabsContent>
      
      <TabsContent value="specs" className="p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Dimensions</dt>
            <dd className="font-medium">10 x 5 x 2 inches</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Weight</dt>
            <dd className="font-medium">1.5 lbs</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Material</dt>
            <dd className="font-medium">Premium plastic</dd>
          </div>
        </dl>
      </TabsContent>
      
      <TabsContent value="reviews" className="p-4 space-y-3">
        <div className="border-b pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">John D.</span>
            <span className="text-xs text-muted-foreground">2 days ago</span>
          </div>
          <p className="text-sm">Great product! Highly recommend.</p>
        </div>
        <div className="border-b pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">Sarah M.</span>
            <span className="text-xs text-muted-foreground">1 week ago</span>
          </div>
          <p className="text-sm">Exactly as described. Very satisfied.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Dashboard with data tabs.
 */
export const DashboardTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[700px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold">$24,567</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="text-2xl font-bold">432</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Customers</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="analytics" className="p-4">
        <p className="text-sm text-muted-foreground">Analytics dashboard content</p>
      </TabsContent>
      
      <TabsContent value="reports" className="p-4">
        <p className="text-sm text-muted-foreground">Reports and exports</p>
      </TabsContent>
      
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">Dashboard settings</p>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Vertical tabs layout.
 */
export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="general" className="flex gap-4">
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="general" className="w-full">General</TabsTrigger>
        <TabsTrigger value="advanced" className="w-full">Advanced</TabsTrigger>
        <TabsTrigger value="danger" className="w-full text-red-500">Danger Zone</TabsTrigger>
      </TabsList>
      
      <div className="flex-1">
        <TabsContent value="general" className="mt-0 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">General Settings</h3>
          <p className="text-sm text-muted-foreground">Basic configuration options</p>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-0 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground">For power users only</p>
        </TabsContent>
        
        <TabsContent value="danger" className="mt-0 p-4 border rounded-lg border-red-200">
          <h3 className="font-medium mb-2 text-red-500">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">Irreversible actions</p>
        </TabsContent>
      </div>
    </Tabs>
  ),
};
