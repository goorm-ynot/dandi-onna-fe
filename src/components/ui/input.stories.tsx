import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { useState } from 'react';

/**
 * Input component for text entry and user data collection.
 * 
 * A flexible, accessible input field built on native HTML input with consistent styling.
 * Supports all standard HTML input types including text, email, password, number, date, etc.
 * Features focus states, validation styling, disabled states, and proper placeholder behavior.
 * Commonly used in forms, search interfaces, filters, and data entry workflows.
 */
const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'HTML input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text input for general text entry.
 * Most common pattern for single-line text fields.
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

/**
 * Email input with proper validation type.
 * Automatically validates email format on mobile keyboards.
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'your.email@example.com',
  },
};

/**
 * Password input that masks entered characters.
 * Essential for secure credential entry.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

/**
 * Number input with up/down controls removed for cleaner appearance.
 * Suitable for quantities, prices, or numeric data.
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
};

/**
 * Search input for filtering or searching content.
 * Often paired with search icon and clear functionality.
 */
export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

/**
 * Date input with native date picker.
 * Provides consistent date selection across browsers.
 */
export const Date: Story = {
  args: {
    type: 'date',
  },
};

/**
 * Disabled input state prevents user interaction.
 * Used when field is not editable in current context.
 */
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit this',
  },
};

/**
 * Read-only input displays data without allowing edits.
 * Useful for displaying computed or locked values.
 */
export const ReadOnly: Story = {
  args: {
    type: 'text',
    value: 'Read-only value',
    readOnly: true,
  },
};

/**
 * Input with icon prefix for visual context.
 * Common pattern for search, email, and other specialized inputs.
 */
export const WithIconPrefix: Story = {
  render: () => (
    <div className="relative w-80">
      {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
      <Input
        type="text"
        placeholder="Search..."
        className="pl-9"
      />
    </div>
  ),
};

/**
 * Input with icon suffix for actions or status.
 * Used for password visibility toggle, validation status, etc.
 */
export const WithIconSuffix: Story = {
  render: () => (
    <div className="relative w-80">
      <Input
        type="text"
        placeholder="Enter email"
        className="pr-9"
      />
      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  ),
};

/**
 * Password input with toggle visibility button.
 * Allows users to verify their password entry.
 */
export const PasswordWithToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="relative w-80">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          className="pl-9 pr-9"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  },
};

/**
 * Input with label for better accessibility.
 * Standard form pattern with proper label association.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="name-input" className="text-sm font-medium">
        Full Name
      </label>
      <Input
        id="name-input"
        type="text"
        placeholder="John Doe"
      />
    </div>
  ),
};

/**
 * Input with helper text providing additional context.
 * Useful for format guidance or field descriptions.
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="username" className="text-sm font-medium">
        Username
      </label>
      <Input
        id="username"
        type="text"
        placeholder="johndoe"
      />
      <p className="text-xs text-muted-foreground">
        Only letters, numbers, and underscores allowed
      </p>
    </div>
  ),
};

/**
 * Input with error state and validation message.
 * Shows invalid input with visual feedback.
 */
export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="email-error" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email-error"
        type="email"
        placeholder="your.email@example.com"
        className="border-red-500 focus-visible:ring-red-500"
        defaultValue="invalid-email"
      />
      <p className="text-xs text-red-500">
        Please enter a valid email address
      </p>
    </div>
  ),
};

/**
 * Input with success state showing validation passed.
 * Provides positive feedback for correct input.
 */
export const WithSuccess: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <label htmlFor="email-success" className="text-sm font-medium">
        Email
      </label>
      <div className="relative">
        <Input
          id="email-success"
          type="email"
          className="border-green-500 focus-visible:ring-green-500 pr-9"
          defaultValue="valid@example.com"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-xs text-green-600">
        Email is available
      </p>
    </div>
  ),
};

/**
 * Input with character counter for limited text fields.
 * Helps users stay within character limits.
 */
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 50;
    
    return (
      <div className="w-80 space-y-2">
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
        </label>
        <Input
          id="bio"
          type="text"
          placeholder="Tell us about yourself"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
        />
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      </div>
    );
  },
};

/**
 * Small input size for compact layouts.
 * Useful in dense UIs or inline forms.
 */
export const Small: Story = {
  render: () => (
    <Input
      type="text"
      placeholder="Small input"
      className="h-8 text-sm"
    />
  ),
};

/**
 * Large input size for prominent forms.
 * Better for touch interfaces or important fields.
 */
export const Large: Story = {
  render: () => (
    <Input
      type="text"
      placeholder="Large input"
      className="h-12 text-lg"
    />
  ),
};

/**
 * Complete form demonstrating multiple input types.
 * Real-world example of a sign-up form.
 */
export const FormExample: Story = {
  render: () => (
    <form className="w-96 space-y-4">
      <div className="space-y-2">
        <label htmlFor="form-name" className="text-sm font-medium">
          Full Name *
        </label>
        <Input
          id="form-name"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="form-email" className="text-sm font-medium">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="form-email"
            type="email"
            placeholder="your.email@example.com"
            className="pl-9"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="form-password" className="text-sm font-medium">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="form-password"
            type="password"
            placeholder="Min. 8 characters"
            className="pl-9"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Must contain at least 8 characters
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="form-phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="form-phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <button
        type="submit"
        className="w-full h-10 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90"
      >
        Create Account
      </button>
    </form>
  ),
};

/**
 * Various input states displayed together.
 * Quick reference for all available states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <Input type="text" placeholder="Default input" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">With Value</p>
        <Input type="text" defaultValue="Entered text" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <Input type="text" placeholder="Disabled" disabled />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Read Only</p>
        <Input type="text" value="Read-only value" readOnly />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Error State</p>
        <Input
          type="text"
          defaultValue="Invalid input"
          className="border-red-500 focus-visible:ring-red-500"
        />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Success State</p>
        <Input
          type="text"
          defaultValue="Valid input"
          className="border-green-500 focus-visible:ring-green-500"
        />
      </div>
    </div>
  ),
};
