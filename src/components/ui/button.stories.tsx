import type { Meta, StoryObj } from '@storybook/react';
import { Heart, ShoppingCart, Plus, X, ArrowRight } from 'lucide-react';
import { Button } from './button';

/**
 * Button component for user interactions and actions.
 * 
 * Built with Radix UI and styled with Tailwind CSS using class-variance-authority.
 * Supports multiple variants (default, secondary, outline, destructive, etc.) and sizes
 * to accommodate various UI patterns including primary actions, secondary actions,
 * icon-only buttons, links, filters, and more specialized use cases like maps and pagination.
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'outlineHug',
        'destructive',
        'ghost',
        'link',
        'filterAct',
        'filterNone',
        'map',
        'page',
        'pagelink',
        'icon',
      ],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: [
        'default',
        'sm',
        'md',
        'lg',
        'xl',
        'icon',
        'page',
        'xs',
        'custom',
        'table',
        'onboarding',
        'map',
        'calendar',
      ],
      description: 'Size variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props onto immediate child using Radix Slot',
    },
    children: {
      control: 'text',
      description: 'Button content (text, icons, or elements)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary button used for main actions and calls-to-action.
 * Features high contrast with primary brand color and hover state.
 */
export const Default: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
    size: 'default',
  },
};

/**
 * Secondary button for less prominent actions.
 * Used when multiple actions exist and hierarchy needs to be established.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
    size: 'default',
  },
};

/**
 * Outline button with border, ideal for secondary or tertiary actions.
 * Provides a lighter visual weight while maintaining clear affordance.
 */
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
  },
};

/**
 * Destructive button for dangerous or irreversible actions like delete or cancel.
 * Uses distinct coloring to signal caution to users.
 */
export const Destructive: Story = {
  args: {
    children: 'Delete Item',
    variant: 'destructive',
    size: 'default',
  },
};

/**
 * Ghost button with minimal visual presence, ideal for subtle actions.
 * Commonly used in toolbars, cards, or when space is constrained.
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
  },
};

/**
 * Link-styled button that appears as underlined text.
 * Used for navigation actions within button semantics.
 */
export const Link: Story = {
  args: {
    children: 'Learn More',
    variant: 'link',
    size: 'default',
  },
};

/**
 * Button with icon and text - a common pattern for actions.
 * Demonstrates how to combine lucide-react icons with text content.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <ShoppingCart />
        Add to Cart
      </>
    ),
    variant: 'default',
    size: 'default',
  },
};

/**
 * Icon-only button for compact toolbars or actions where space is limited.
 * Remember to add aria-label for accessibility when using icon-only buttons.
 */
export const IconOnly: Story = {
  args: {
    children: <Heart />,
    variant: 'icon',
    size: 'icon',
    'aria-label': 'Add to favorites',
  } as any,
};

/**
 * Small size button for compact layouts or inline actions.
 */
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'outline',
    size: 'sm',
  },
};

/**
 * Large size button for prominent calls-to-action or landing pages.
 */
export const Large: Story = {
  args: {
    children: 'Get Started',
    variant: 'default',
    size: 'lg',
  },
};

/**
 * Extra large button for hero sections or critical actions.
 */
export const ExtraLarge: Story = {
  args: {
    children: 'Sign Up Now',
    variant: 'default',
    size: 'xl',
  },
};

/**
 * Disabled state prevents user interaction.
 * Visual opacity is reduced to indicate unavailability.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'default',
    size: 'default',
    disabled: true,
  },
};

/**
 * Loading state button with spinner icon simulation.
 * Shows feedback during async operations.
 */
export const Loading: Story = {
  args: {
    children: (
      <>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </>
    ),
    variant: 'default',
    size: 'default',
    disabled: true,
  },
};

/**
 * Map variant for location-based interfaces.
 * Optimized size for map overlay controls.
 */
export const MapButton: Story = {
  args: {
    children: 'View',
    variant: 'map',
    size: 'map',
  },
};

/**
 * Page navigation button for pagination controls.
 */
export const PageButton: Story = {
  args: {
    children: '1',
    variant: 'page',
    size: 'page',
  },
};

/**
 * Onboarding size for first-time user experiences or tutorials.
 * Slightly larger for emphasis during critical flows.
 */
export const Onboarding: Story = {
  args: {
    children: 'Continue',
    variant: 'default',
    size: 'onboarding',
  },
};

/**
 * Active filter button showing selected state.
 * Used in filter bars or navigation tabs.
 */
export const FilterActive: Story = {
  args: {
    children: 'Active Filter',
    variant: 'filterAct',
    size: 'default',
  },
};

/**
 * Inactive filter button showing unselected state.
 */
export const FilterInactive: Story = {
  args: {
    children: 'Inactive Filter',
    variant: 'filterNone',
    size: 'default',
  },
};

/**
 * Button group demonstrating multiple buttons with consistent spacing.
 * Common pattern for action panels or toolbars.
 */
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">Confirm</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  ),
};

/**
 * Icon button group for compact action bars.
 */
export const IconButtonGroup: Story = {
  render: () => (
    <div className="flex gap-1">
      <Button variant="icon" size="icon" aria-label="Add">
        <Plus />
      </Button>
      <Button variant="icon" size="icon" aria-label="Remove">
        <X />
      </Button>
      <Button variant="icon" size="icon" aria-label="Next">
        <ArrowRight />
      </Button>
    </div>
  ),
};

/**
 * Full-width button for mobile layouts or forms.
 */
export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <Button variant="default" className="w-full">
        Submit Form
      </Button>
    </div>
  ),
};

/**
 * Various button variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="outlineHug">Outline Hug</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="filterAct">Filter Active</Button>
        <Button variant="filterNone">Filter None</Button>
        <Button variant="map" size="map">Map</Button>
      </div>
    </div>
  ),
};

/**
 * Various button sizes displayed together for comparison.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="onboarding">Onboarding</Button>
    </div>
  ),
};
