import { type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistCardProps {
  children: ReactNode;
  className?: string;
}

export function ChecklistCard({ children, className }: ChecklistCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-1 border border-border rounded-container p-inset-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ChecklistCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ChecklistCardHeader({
  children,
  className,
}: ChecklistCardHeaderProps) {
  return <div className={cn("mb-stack", className)}>{children}</div>;
}

interface ChecklistCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function ChecklistCardTitle({
  children,
  className,
}: ChecklistCardTitleProps) {
  return <p className={cn("headline-4", className)}>{children}</p>;
}

interface ChecklistCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ChecklistCardDescription({
  children,
  className,
}: ChecklistCardDescriptionProps) {
  return (
    <p className={cn("body-2 text-muted-foreground", className)}>{children}</p>
  );
}

interface ChecklistCardContentProps {
  children: ReactNode;
  className?: string;
}

export function ChecklistCardContent({
  children,
  className,
}: ChecklistCardContentProps) {
  return <ul className={cn("space-y-stack", className)}>{children}</ul>;
}

interface ChecklistCardItemProps {
  children: ReactNode;
  className?: string;
  checked?: boolean;
}

export function ChecklistCardItem({
  children,
  className,
  checked = false,
}: ChecklistCardItemProps) {
  return (
    <li className={cn("flex items-start gap-inline", className)}>
      <div
        className={cn(
          "shrink-0 flex items-center justify-center w-5 h-5 rounded border-2 mt-0.5",
          checked
            ? "bg-success border-success text-success-foreground"
            : "border-muted-foreground",
        )}
      >
        {checked && <Check className="w-3 h-3" strokeWidth={3} />}
      </div>
      <span className="body-2 flex-1">{children}</span>
    </li>
  );
}
