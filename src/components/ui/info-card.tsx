import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

interface InfoCardRowProps {
  label: string;
  value: string | number;
  highlighted?: boolean;
  className?: string;
}

export function InfoCard({ title, className, children }: InfoCardProps) {
  return (
    <div className="flex flex-col gap-10">
      <Label className="body2">{title}</Label>
      <div
        className={cn(
          "w-[480px] px-14 py-10 rounded-md bg-background-normal-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function InfoCardRow({ label, value, highlighted = false, className }: InfoCardRowProps) {
  return (
    <div
      className={cn(
        "flex justify-between pb-10 last:pb-0",
        highlighted && "border-t border-border-secondary pt-10",
        className
      )}
    >
      <Label
        className={cn(
          "body1 text-foreground-secondary",
          highlighted && "body2 text-foreground-normal"
        )}
      >
        {label}
      </Label>
      <Label className="body2 text-foreground-normal">{value}</Label>
    </div>
  );
}
