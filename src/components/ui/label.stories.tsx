import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from './input';
import { Checkbox } from './checkbox';

/**
 * Label component for form field labels and accessibility.
 * 
 * Built on Radix UI Label primitive with peer-disabled support.
 * Automatically connects to form controls for proper accessibility.
 * Used with inputs, checkboxes, radio buttons, and other form elements.
 */
const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form control',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default label with simple text.
 */
export const Default: Story = {
  args: {
    children: 'Form Label',
  },
};

/**
 * Label with associated input field.
 * Clicking the label focuses the input.
 */
export const WithInput: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="input-1">Full Name</Label>
      <Input id="input-1" type="text" placeholder="John Doe" />
    </div>
  ),
};

/**
 * Label with required indicator.
 */
export const Required: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="input-2">
        Email Address <span className="text-red-500">*</span>
      </Label>
      <Input id="input-2" type="email" placeholder="you@example.com" required />
    </div>
  ),
};

/**
 * Label with disabled input field.
 * Shows reduced opacity through peer-disabled styling.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="input-3">Disabled Field</Label>
      <Input id="input-3" type="text" value="Cannot edit" disabled />
    </div>
  ),
};

/**
 * Label with error state styling.
 */
export const Error: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <Label htmlFor="input-4" className="text-red-500">
        Password
      </Label>
      <Input
        id="input-4"
        type="password"
        className="border-red-500"
        placeholder="Enter password"
      />
      <p className="text-xs text-red-500">Password is required</p>
    </div>
  ),
};

/**
 * Empty label (no content).
 */
export const Empty: Story = {
  args: {
    children: '',
  },
};

/**
 * Label with checkbox.
 */
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        I agree to the terms and conditions
      </Label>
    </div>
  ),
};

/**
 * Multiple labels in a form layout.
 */
export const Loading: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="loading-1" className="animate-pulse bg-gray-200 h-4 w-20 rounded" />
        <Input id="loading-1" disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="loading-2" className="animate-pulse bg-gray-200 h-4 w-24 rounded" />
        <Input id="loading-2" disabled />
      </div>
    </div>
  ),
};
