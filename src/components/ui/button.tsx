import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background-normal hover:bg-accent hover:text-accent-foreground',
        outlineHug: 'border border-primarity-brand3 bg-background-normal text-primary hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-system-mauve-light text-primary hover:bg-system-pink-light',
        ghost: 'border border-border-normal bg-background-normal hover:bg-accent hover:text-accent-foreground',
        link: 'text-label underline-offset-4 hover:underline',
        filterAct: 'border-b border-primary  underline-offset-4 hover:underline text-primary',
        filterNone: 'text-tableFilter-text',
        map : 'border-1 border-border-normal bg-white hover:bg-accent hover:text-accent-foreground',
        page: 'bg-system-mauve-light text-primary border-none',
        pagelink: 'text-foreground-normal'  
      },
      size: {
        default: 'h-[38px] px-5 py-2.5',
        sm: 'h-[38px] rounded-md px-3',
        lg: 'h-[38px] rounded-md px-8',
        icon: 'h-10 w-10',
        page: 'h-[24px] w-[24px] py-1 rounded-md',
        xs: 'h-[38px] w-[38px] p-[7px] rounded-[6px]',
        custom: 'h-[38px]',
        table: 'max-h-[26px]',
        onboarding: 'h-[44px] px-3 py-2.5',
        map:'w-[76px] h-[26px] rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
