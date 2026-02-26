# Button Component - Usage Guide

## Overview

The Button component is a versatile, accessible button built with Radix UI and styled with Tailwind CSS. It supports multiple variants, sizes, and states to accommodate various UI patterns throughout the application.

## Installation

The Button component is already configured in your project. It uses:
- `@radix-ui/react-slot` for composition
- `class-variance-authority` for variant management
- Tailwind CSS for styling

## Basic Usage

```tsx
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <Button onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  );
}
```

## Variants

### Default (Primary)
High-contrast primary action button.

```tsx
<Button variant="default">Primary Action</Button>
```

### Secondary
Less prominent secondary actions.

```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Outline
Bordered button for tertiary actions.

```tsx
<Button variant="outline">Outline Button</Button>
```

### Destructive
For dangerous or irreversible actions.

```tsx
<Button variant="destructive">Delete Item</Button>
```

### Ghost
Minimal visual presence for subtle actions.

```tsx
<Button variant="ghost">Subtle Action</Button>
```

### Link
Text link styled as a button.

```tsx
<Button variant="link">Learn More</Button>
```

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="onboarding">Onboarding</Button>
```

## With Icons

### Icon + Text

```tsx
import { ShoppingCart } from 'lucide-react';

<Button>
  <ShoppingCart />
  Add to Cart
</Button>
```

### Icon Only

```tsx
import { Heart } from 'lucide-react';

<Button variant="icon" size="icon" aria-label="Add to favorites">
  <Heart />
</Button>
```

## States

### Disabled

```tsx
<Button disabled>Disabled Button</Button>
```

### Loading

```tsx
<Button disabled>
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  Loading...
</Button>
```

## Common Patterns

### Button Group

```tsx
<div className="flex gap-2">
  <Button variant="default">Confirm</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

### Full Width (Forms)

```tsx
<Button className="w-full">Submit Form</Button>
```

### Action Bar with Icons

```tsx
import { Plus, Edit, Trash } from 'lucide-react';

<div className="flex gap-2">
  <Button variant="icon" size="icon" aria-label="Add">
    <Plus />
  </Button>
  <Button variant="icon" size="icon" aria-label="Edit">
    <Edit />
  </Button>
  <Button variant="icon" size="icon" aria-label="Delete">
    <Trash />
  </Button>
</div>
```

### Filter Buttons

```tsx
// Active filter
<Button variant="filterAct">Active</Button>

// Inactive filter
<Button variant="filterNone">Inactive</Button>
```

## Advanced Usage

### As Child (Composition)

Use `asChild` to merge button props onto a child element using Radix Slot:

```tsx
import Link from 'next/link';

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Custom Styling

Override styles with className:

```tsx
<Button className="rounded-full px-8">
  Custom Styled
</Button>
```

### With Form Actions

```tsx
<form action={handleSubmit}>
  <Button type="submit">Submit</Button>
  <Button type="button" variant="outline" onClick={handleCancel}>
    Cancel
  </Button>
</form>
```

## Accessibility

- Always use descriptive text or `aria-label` for icon-only buttons
- The button is keyboard accessible by default
- Focus styles are built-in with ring utilities
- Disabled state prevents interaction

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'outlineHug' \| 'destructive' \| 'ghost' \| 'link' \| 'filterAct' \| 'filterNone' \| 'map' \| 'page' \| 'pagelink' \| 'icon'` | `'default'` | Visual style variant |
| `size` | `'default' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon' \| 'page' \| 'xs' \| 'custom' \| 'table' \| 'onboarding' \| 'map' \| 'calendar'` | `'default'` | Size variant |
| `asChild` | `boolean` | `false` | Merge props onto child using Radix Slot |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `className` | `string` | - | Additional CSS classes |

## Examples in Context

### Confirm Dialog

```tsx
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';

function ConfirmDeleteDialog({ onConfirm, onCancel }) {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to delete this item?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Card with Actions

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1">
          <ShoppingCart />
          Add to Cart
        </Button>
        <Button variant="icon" size="icon" aria-label="Add to favorites">
          <Heart />
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Pagination

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'page' : 'pagelink'}
          size="page"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
```

## Best Practices

1. **Hierarchy**: Use `default` for primary actions, `outline` or `secondary` for secondary actions
2. **Consistency**: Maintain consistent button sizing across similar contexts
3. **Accessibility**: Always provide `aria-label` for icon-only buttons
4. **Loading States**: Disable buttons during async operations and show loading feedback
5. **Destructive Actions**: Always use `destructive` variant for delete/remove actions
6. **Mobile**: Consider using larger sizes (`onboarding`) for touch interfaces

## Storybook

To view all button variants and interact with them:

```bash
npm run storybook
```

Navigate to `UI/Button` in the Storybook sidebar to explore all states and variants.
