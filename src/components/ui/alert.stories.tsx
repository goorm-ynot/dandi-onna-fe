import type { Meta, StoryObj } from '@storybook/react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './alert';

/**
 * Alert component for displaying important messages and notifications.
 * 
 * Used to draw attention to important information, warnings, errors, or success messages.
 * Supports default and destructive variants with optional icons and descriptions.
 * Commonly used for form validation feedback, system notifications, and user alerts.
 */
const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert with title and description.
 */
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a default alert message with some helpful information.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Destructive alert for errors and warnings.
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Success alert with checkmark icon.
 */
export const Success: Story = {
  render: () => (
    <Alert className="w-96 border-green-500 text-green-700">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Warning alert with alert triangle icon.
 */
export const Warning: Story = {
  render: () => (
    <Alert className="w-96 border-yellow-500 text-yellow-700">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert with only title, no description.
 */
export const TitleOnly: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>Quick notification message</AlertTitle>
    </Alert>
  ),
};

/**
 * Alert with no icon.
 */
export const NoIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Simple Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon for a cleaner look.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Empty alert (minimal state).
 */
export const Empty: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertDescription>No messages at this time.</AlertDescription>
    </Alert>
  ),
};

/**
 * Loading alert state.
 */
export const Loading: Story = {
  render: () => (
    <Alert className="w-96">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <AlertTitle>Loading</AlertTitle>
      <AlertDescription>Please wait while we process your request...</AlertDescription>
    </Alert>
  ),
};

/**
 * Error alert with action button.
 */
export const Error: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Failed</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>Unable to connect to the server. Please check your internet connection.</p>
        <button className="text-sm underline hover:no-underline">Retry</button>
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Various alert states shown together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert variant</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Destructive alert variant</AlertDescription>
      </Alert>
      
      <Alert className="border-green-500 text-green-700">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Success alert variant</AlertDescription>
      </Alert>
      
      <Alert className="border-yellow-500 text-yellow-700">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Warning alert variant</AlertDescription>
      </Alert>
    </div>
  ),
};
