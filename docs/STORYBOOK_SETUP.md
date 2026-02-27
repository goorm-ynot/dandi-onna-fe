# Storybook Setup

## Overview

This project includes a comprehensive Storybook setup for developing and documenting UI components in isolation.

## Getting Started

### 1. Install Dependencies

First, install the Storybook dependencies:

```bash
npm install --save-dev --legacy-peer-deps \
  @storybook/nextjs@8.6.17 \
  @storybook/addon-essentials@8.6.17 \
  @storybook/addon-interactions@8.6.17 \
  @storybook/addon-links@8.6.17 \
  @storybook/blocks@8.6.17 \
  @storybook/test@8.6.17 \
  storybook@8.6.17
```

> **Note**: We use `--legacy-peer-deps` due to Next.js 16 compatibility. This is safe and won't affect functionality.

### 2. Run Storybook

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### 3. Build Static Storybook

To build a static version for deployment:

```bash
npm run build-storybook
```

This creates a `storybook-static` folder that can be deployed to any static hosting service.

## Project Structure

```
.storybook/
├── main.ts           # Storybook configuration
└── preview.ts        # Global decorators and parameters

src/components/
└── ui/
    ├── button.tsx           # Component implementation
    ├── button.stories.tsx   # Storybook stories
    └── ...

docs/
└── button-usage-guide.md   # Component usage documentation
```

## Available Stories

### Button Component

Located at: `src/components/ui/button.stories.tsx`

The Button component includes comprehensive stories covering:

- **Variants**: Default, Secondary, Outline, Destructive, Ghost, Link, and more
- **Sizes**: XS, SM, MD, LG, XL, Icon, Onboarding, etc.
- **States**: Default, Disabled, Loading
- **Patterns**: With Icons, Icon Only, Button Groups, Full Width
- **Showcase**: All Variants, All Sizes comparisons

Navigate to **UI/Button** in Storybook to explore all states.

## Writing New Stories

### CSF3 Format (Recommended)

Create a `.stories.tsx` file next to your component:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

/**
 * Brief description of what this component does.
 */
const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls
    propName: {
      control: 'text',
      description: 'Description of the prop',
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with typical usage.
 */
export const Default: Story = {
  args: {
    propName: 'value',
  },
};

/**
 * Alternative state showing different props.
 */
export const Alternative: Story = {
  args: {
    propName: 'different value',
  },
};
```

## Best Practices

### 1. Documentation
- Add JSDoc comments above meta and stories
- Explain what each story demonstrates
- Include usage context

### 2. Args
- Provide realistic mock data
- Cover all important prop combinations
- Use meaningful default values

### 3. States
- Include at least 4-5 meaningful states
- Show edge cases (empty, loading, error states)
- Demonstrate interactive behavior

### 4. Organization
- Group related stories together
- Use consistent naming conventions
- Create showcase stories for comparison

### 5. Accessibility
- Test keyboard navigation in Storybook
- Include aria-label examples for icon buttons
- Document accessibility considerations

## Configuration

### Main Configuration (`.storybook/main.ts`)

- Configured for Next.js
- Includes essential addons
- Path aliases configured (`@/` -> `src/`)
- Static assets from `public/` directory

### Preview Configuration (`.storybook/preview.ts`)

- Global styles imported (`globals.css`)
- Centered layout by default
- Light/dark background options
- Control matchers for color and date pickers

## Addons

### Included Addons

1. **Essentials** - Controls, Actions, Docs, Viewport, Backgrounds, etc.
2. **Interactions** - Test user interactions
3. **Links** - Link between stories

### Adding More Addons

```bash
npm install --save-dev @storybook/addon-name
```

Then add to `.storybook/main.ts`:

```ts
addons: [
  // ... existing addons
  '@storybook/addon-name',
],
```

## Deployment

### Vercel/Netlify

```bash
npm run build-storybook
```

Deploy the `storybook-static` folder.

### GitHub Pages

Add to `.github/workflows/storybook.yml`:

```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## Troubleshooting

### Next.js 16 Compatibility

If you encounter peer dependency warnings, use `--legacy-peer-deps` flag. This is expected and won't affect functionality.

### Import Errors

Ensure path aliases are working:
- Check `tsconfig.json` has `"@/*": ["./src/*"]`
- Check `.storybook/main.ts` has webpack alias configuration

### Styling Issues

If Tailwind styles aren't appearing:
- Verify `globals.css` is imported in `.storybook/preview.ts`
- Check Tailwind config includes Storybook paths (if using JIT)

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf)
- [Next.js Integration](https://storybook.js.org/docs/react/get-started/nextjs)
- [Button Usage Guide](./docs/button-usage-guide.md)

## Next Steps

1. Install dependencies as shown above
2. Run `npm run storybook`
3. Create stories for other UI components
4. Document component usage patterns
5. Share Storybook with your team
