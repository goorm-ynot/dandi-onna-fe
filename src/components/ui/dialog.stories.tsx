import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from './dialog';
import { Button } from './button';

/**
 * Dialog component for modal windows and overlays.
 * 
 * Built on Radix UI Dialog primitive. Used to display content that requires
 * user attention or interaction in a layer above the main page content.
 * Common for confirmations, forms, alerts, and detailed information.
 * Includes backdrop overlay and focus management.
 */
const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dialog with trigger button.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a default dialog with a title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Dialog content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with form content.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              defaultValue="John Doe"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="john@example.com"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Empty dialog with minimal content.
 */
export const Empty: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Empty Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Empty State</DialogTitle>
        </DialogHeader>
        <div className="py-8 text-center text-sm text-muted-foreground">
          No content available
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Loading state in dialog.
 */
export const Loading: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Loading Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Processing</DialogTitle>
          <DialogDescription>Please wait while we process your request...</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Error state dialog.
 */
export const Error: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Error Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-500">Error Occurred</DialogTitle>
          <DialogDescription>
            Something went wrong while processing your request.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-red-500">
            Unable to save changes. Please try again later.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button>Retry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Controlled dialog with state management.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open Controlled Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's open state is controlled by React state.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm">Dialog is currently: {open ? 'Open' : 'Closed'}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-sm text-muted-foreground">
          Dialog state: {open ? 'Open' : 'Closed'}
        </p>
      </div>
    );
  },
};

/**
 * Confirmation dialog.
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Large dialog with scrollable content.
 */
export const LargeContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Terms</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read our terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>
              <h4 className="font-medium mb-2">{i + 1}. Section Title</h4>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with custom width.
 */
export const CustomWidth: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Wide Dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Wide Dialog</DialogTitle>
          <DialogDescription>
            This dialog has a custom maximum width.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">Content can be wider to accommodate more information.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Success dialog with icon.
 */
export const Success: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Complete Action</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center space-y-3 py-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your changes have been saved successfully.
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter>
          <Button className="w-full">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
