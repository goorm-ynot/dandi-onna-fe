import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectItem } from './select';

/**
 * Select component for choosing one option from a dropdown list.
 * 
 * A native HTML select element with consistent styling. Ideal for forms where
 * users need to pick from a predefined set of options. Works well with keyboard
 * navigation and screen readers. For more complex scenarios, consider using a
 * custom dropdown component.
 */
const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default select with multiple options.
 */
export const Default: Story = {
  args: { children: null },
  render: () => (
    <Select className="w-64">
      <SelectItem value="">Select an option</SelectItem>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </Select>
  ),
};

/**
 * Select with no options (empty state).
 */
export const Empty: Story = {
  args: { children: null },
  render: () => (
    <Select className="w-64">
      <SelectItem value="">No options available</SelectItem>
    </Select>
  ),
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
  args: { children: null },
  render: () => (
    <Select className="w-64" disabled>
      <SelectItem value="">Select an option</SelectItem>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </Select>
  ),
};

/**
 * Loading state.
 */
export const Loading: Story = {
  args: { children: null },
  render: () => (
    <div className="w-64 space-y-2">
      <Select disabled>
        <SelectItem value="">Loading options...</SelectItem>
      </Select>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </div>
    </div>
  ),
};

/**
 * Error state with validation message.
 */
export const Error: Story = {
  args: { children: null },
  render: () => (
    <div className="w-64 space-y-2">
      <Select className="border-red-500 focus:ring-red-500">
        <SelectItem value="">Select an option</SelectItem>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </Select>
      <p className="text-sm text-red-500">Please select a valid option</p>
    </div>
  ),
};

/**
 * Controlled select with state.
 */
export const Interactive: Story = {
  args: { children: null },
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4">
        <Select
          className="w-64"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <SelectItem value="">Choose a country</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
        </Select>
        <p className="text-sm text-muted-foreground">
          Selected: {value || 'None'}
        </p>
      </div>
    );
  },
};

/**
 * Select with label.
 */
export const WithLabel: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-2 w-64">
      <label htmlFor="country" className="text-sm font-medium">
        Country
      </label>
      <Select id="country">
        <SelectItem value="">Select a country</SelectItem>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
      </Select>
    </div>
  ),
};

/**
 * Select with grouped options.
 */
export const Grouped: Story = {
  args: { children: null },
  render: () => (
    <Select className="w-64">
      <SelectItem value="">Select a food</SelectItem>
      <optgroup label="Fruits">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </optgroup>
      <optgroup label="Vegetables">
        <SelectItem value="carrot">Carrot</SelectItem>
        <SelectItem value="broccoli">Broccoli</SelectItem>
        <SelectItem value="spinach">Spinach</SelectItem>
      </optgroup>
    </Select>
  ),
};

/**
 * Month and year selectors.
 */
export const DateSelector: Story = {
  args: { children: null },
  render: () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentYear = 2026;
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    
    return (
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Birth Date</label>
          <div className="flex gap-2">
            <Select className="flex-1">
              <SelectItem value="">Month</SelectItem>
              {months.map((month, index) => (
                <SelectItem key={month} value={String(index + 1)}>
                  {month}
                </SelectItem>
              ))}
            </Select>
            <Select className="w-24">
              <SelectItem value="">Year</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Quantity selector.
 */
export const Quantity: Story = {
  args: { children: null },
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Quantity</label>
      <Select className="w-32" defaultValue="1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <SelectItem key={num} value={String(num)}>
            {num}
          </SelectItem>
        ))}
      </Select>
    </div>
  ),
};

/**
 * Form with multiple selects.
 */
export const FormExample: Story = {
  args: { children: null },
  render: () => (
    <form className="w-80 space-y-4">
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Category <span className="text-red-500">*</span>
        </label>
        <Select id="category" required>
          <SelectItem value="">Select a category</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="books">Books</SelectItem>
          <SelectItem value="home">Home & Garden</SelectItem>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority
        </label>
        <Select id="priority" defaultValue="medium">
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select id="status" defaultValue="active">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </Select>
      </div>
    </form>
  ),
};