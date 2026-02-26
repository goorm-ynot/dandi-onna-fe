import type { Meta, StoryObj } from '@storybook/react';
import {
  SectionCard,
  SectionCardHeader,
  SectionCardTitle,
  SectionCardContent,
} from './section-card';
import { Button } from './button';

/**
 * SectionCard component for organizing content into distinct sections.
 * 
 * A white card with header and content areas. Used to group related content
 * in dashboards, settings pages, and forms. Features a bordered header with
 * title and optional actions. Provides consistent spacing and styling across
 * the application.
 */
const meta = {
  title: 'UI/SectionCard',
  component: SectionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default section card with header and content.
 */
export const Default: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Section Title</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <p className="text-sm">This is the content area of the section card.</p>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Empty section card with no content.
 */
export const Empty: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Empty Section</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="text-center py-8 text-sm text-muted-foreground">
          No content available
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Loading state with skeleton content.
 */
export const Loading: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Loading...</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Error state.
 */
export const Error: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Error Loading Content</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="text-center py-8">
          <p className="text-sm text-red-500 font-medium mb-2">
            Failed to load content
          </p>
          <button className="text-sm text-blue-500 underline">Retry</button>
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Section card with action button in header.
 */
export const WithAction: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Recent Activity</SectionCardTitle>
        <Button size="sm">View All</Button>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>User logged in</span>
            <span className="text-muted-foreground">2 min ago</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Order #12345 completed</span>
            <span className="text-muted-foreground">1 hour ago</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Profile updated</span>
            <span className="text-muted-foreground">3 hours ago</span>
          </div>
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Profile settings section.
 */
export const ProfileSettings: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Profile Settings</SectionCardTitle>
        <Button size="sm" variant="outline">Edit</Button>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Name</span>
            <span className="text-sm font-medium">John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium">john@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Phone</span>
            <span className="text-sm font-medium">+1 (555) 123-4567</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-sm font-medium">San Francisco, CA</span>
          </div>
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Form section.
 */
export const FormSection: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Personal Information</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
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
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </form>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Statistics section.
 */
export const Statistics: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Monthly Statistics</SectionCardTitle>
        <Button size="sm" variant="ghost">⋮</Button>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-xs text-muted-foreground">Total Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">567</p>
            <p className="text-xs text-muted-foreground">New Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">89%</p>
            <p className="text-xs text-muted-foreground">Satisfaction</p>
          </div>
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * List section with items.
 */
export const ListSection: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Team Members</SectionCardTitle>
        <Button size="sm">Add Member</Button>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="space-y-3">
          {['Alice Johnson', 'Bob Smith', 'Carol Williams'].map((name, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">member@example.com</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">Remove</Button>
            </div>
          ))}
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Notification preferences section.
 */
export const NotificationSettings: Story = {
  render: () => (
    <SectionCard className="w-[600px]">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Notification Preferences</SectionCardTitle>
      </SectionCardHeader>
      <SectionCardContent>
        <div className="space-y-4">
          {[
            { label: 'Email notifications', checked: true },
            { label: 'Push notifications', checked: false },
            { label: 'SMS notifications', checked: true },
            { label: 'Weekly digest', checked: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm">{item.label}</span>
              <input type="checkbox" defaultChecked={item.checked} />
            </div>
          ))}
        </div>
      </SectionCardContent>
    </SectionCard>
  ),
};

/**
 * Multiple section cards stacked.
 */
export const MultipleCards: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <SectionCard>
        <SectionCardHeader className="p-16">
          <SectionCardTitle>Section 1</SectionCardTitle>
        </SectionCardHeader>
        <SectionCardContent>
          <p className="text-sm">First section content</p>
        </SectionCardContent>
      </SectionCard>
      
      <SectionCard>
        <SectionCardHeader className="p-16">
          <SectionCardTitle>Section 2</SectionCardTitle>
        </SectionCardHeader>
        <SectionCardContent>
          <p className="text-sm">Second section content</p>
        </SectionCardContent>
      </SectionCard>
    </div>
  ),
};

/**
 * Disabled section (read-only).
 */
export const Disabled: Story = {
  render: () => (
    <SectionCard className="w-[600px] opacity-60">
      <SectionCardHeader className="p-16">
        <SectionCardTitle>Disabled Section</SectionCardTitle>
        <Button size="sm" disabled>Action</Button>
      </SectionCardHeader>
      <SectionCardContent>
        <p className="text-sm text-muted-foreground">
          This section is currently disabled or read-only.
        </p>
      </SectionCardContent>
    </SectionCard>
  ),
};
