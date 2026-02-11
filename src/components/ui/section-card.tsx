import * as React from "react";

import { cn } from "@/lib/utils";

const SectionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full rounded-md bg-white flex flex-col", className)}
    {...props}
  />
));
SectionCard.displayName = "SectionCard";

const SectionCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-b border-border-secondary",
      className
    )}
    {...props}
  />
));
SectionCardHeader.displayName = "SectionCardHeader";

const SectionCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("title5 text-foreground-normal", className)}
    {...props}
  />
));
SectionCardTitle.displayName = "SectionCardTitle";

const SectionCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-24", className)} {...props} />
));
SectionCardContent.displayName = "SectionCardContent";

export {
  SectionCard,
  SectionCardHeader,
  SectionCardTitle,
  SectionCardContent,
};
