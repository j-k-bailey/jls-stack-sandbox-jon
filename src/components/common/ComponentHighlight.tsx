import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentHighlightProps {
  children?: ReactNode;
  className?: string;
}

interface ComponentHighlightTitleProps {
  children: ReactNode;
  className?: string;
}

interface ComponentHighlightDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface ComponentHighlightShowcaseProps {
  children: ReactNode;
  className?: string;
}

interface ComponentHighlightPropsProps {
  children: ReactNode;
  className?: string;
}

export function ComponentHighlight({
  children,
  className,
}: ComponentHighlightProps) {
  return <section className={className}>{children}</section>;
}

export function ComponentHighlightTitle({
  children,
  className,
}: ComponentHighlightTitleProps) {
  return <h2 className={className}>{children}</h2>;
}

export function ComponentHighlightDescription({
  children,
  className,
}: ComponentHighlightDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground mb-compact", className)}>
      {children}
    </p>
  );
}

export function ComponentHighlightShowcase({
  children,
  className,
}: ComponentHighlightShowcaseProps) {
  return <div className={cn("ml-standard", className)}>{children}</div>;
}

export function ComponentHighlightProps({
  children,
  className,
}: ComponentHighlightPropsProps) {
  return (
    <div
      className={cn(
        "bg-surface-1 border border-border rounded-lg mt-compact p-compact",
        className,
      )}
    >
      <p className="text-foreground text-sm">
        <strong>Props:</strong> {children}
      </p>
    </div>
  );
}
