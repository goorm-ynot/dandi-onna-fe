import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

/**
 * RadioGroup component for single-choice selection from multiple options.
 * 
 * Built on Radix UI Radio Group primitive. Used when users need to select
 * exactly one option from a set of mutually exclusive choices. Common in
 * forms, settings, preferences, and configuration interfaces.
 */
const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable all radio items',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with multiple options.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Radio group with no selection (empty state).
 */
export const Empty: Story = {
  render: () => (
    <RadioGroup>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="empty-1" />
        <Label htmlFor="empty-1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="empty-2" />
        <Label htmlFor="empty-2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="disabled-1" />
        <Label htmlFor="disabled-1">Option 1 (Selected, Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="disabled-2" />
        <Label htmlFor="disabled-2">Option 2 (Disabled)</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Individual disabled radio item.
 */
export const PartiallyDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="partial-1" />
        <Label htmlFor="partial-1">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="partial-2" disabled />
        <Label htmlFor="partial-2">Disabled option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="partial-3" />
        <Label htmlFor="partial-3">Another available option</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Loading state with skeleton placeholders.
 */
export const Loading: Story = {
  render: () => (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-2 animate-pulse">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  ),
};

/**
 * Error state with validation message.
 */
export const Error: Story = {
  render: () => (
    <div className="space-y-2">
      <RadioGroup className="border border-red-500 rounded-md p-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-1" id="error-1" />
          <Label htmlFor="error-1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-2" id="error-2" />
          <Label htmlFor="error-2">Option 2</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-red-500">Please select an option</p>
    </div>
  ),
};

/**
 * Interactive controlled radio group.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="int-1" />
            <Label htmlFor="int-1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="int-2" />
            <Label htmlFor="int-2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="int-3" />
            <Label htmlFor="int-3">Option 3</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Selected: {value || 'None'}
        </p>
      </div>
    );
  },
};

/**
 * Payment method selection example.
 */
export const PaymentMethod: Story = {
  render: () => {
    const [method, setMethod] = useState('card');
    
    return (
      <div className="w-96 space-y-4">
        <h3 className="font-medium">Select Payment Method</h3>
        <RadioGroup value={method} onValueChange={setMethod}>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="cursor-pointer flex-1">
              <div className="font-medium">Credit/Debit Card</div>
              <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="cursor-pointer flex-1">
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank" className="cursor-pointer flex-1">
              <div className="font-medium">Bank Transfer</div>
              <div className="text-sm text-muted-foreground">Direct bank transfer</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    );
  },
};

/**
 * Shipping options with pricing.
 */
export const ShippingOptions: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      <h3 className="font-medium">Shipping Method</h3>
      <RadioGroup defaultValue="standard">
        <div className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard">
              <div className="font-medium">Standard Shipping</div>
              <div className="text-sm text-muted-foreground">5-7 business days</div>
            </Label>
          </div>
          <span className="font-medium">$5.99</span>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="express" id="express" />
            <Label htmlFor="express">
              <div className="font-medium">Express Shipping</div>
              <div className="text-sm text-muted-foreground">2-3 business days</div>
            </Label>
          </div>
          <span className="font-medium">$12.99</span>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="overnight" id="overnight" />
            <Label htmlFor="overnight">
              <div className="font-medium">Overnight Shipping</div>
              <div className="text-sm text-muted-foreground">Next business day</div>
            </Label>
          </div>
          <span className="font-medium">$24.99</span>
        </div>
      </RadioGroup>
    </div>
  ),
};

/**
 * Size selection for products.
 */
export const SizeSelection: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="font-medium">Select Size</h3>
      <RadioGroup defaultValue="medium" className="flex gap-2">
        <div className="flex items-center">
          <RadioGroupItem value="small" id="small" className="sr-only" />
          <Label
            htmlFor="small"
            className="px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
          >
            S
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="medium" id="medium" className="sr-only" />
          <Label
            htmlFor="medium"
            className="px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
          >
            M
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="large" id="large" className="sr-only" />
          <Label
            htmlFor="large"
            className="px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
          >
            L
          </Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="xlarge" id="xlarge" className="sr-only" />
          <Label
            htmlFor="xlarge"
            className="px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
          >
            XL
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
};
