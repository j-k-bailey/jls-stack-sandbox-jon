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
  return (
    <section className={cn("p-4 space-y-2", className)}>{children}</section>
  );
}

export function ComponentHighlightTitle({
  children,
  className,
}: ComponentHighlightTitleProps) {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
}

export function ComponentHighlightDescription({
  children,
  className,
}: ComponentHighlightDescriptionProps) {
  return (
    <p className={cn("text-sm text-slate-400 mb-4", className)}>{children}</p>
  );
}

export function ComponentHighlightShowcase({
  children,
  className,
}: ComponentHighlightShowcaseProps) {
  return (
    <div className={cn("ml-6", className)}>
      <div className="mb-6">{children}</div>
    </div>
  );
}

export function ComponentHighlightProps({
  children,
  className,
}: ComponentHighlightPropsProps) {
  return (
    <div className={cn("bg-stone-900/50 rounded p-4", className)}>
      <p className="text-stone-300 text-sm">
        <strong>Props:</strong> {children}
      </p>
    </div>
  );
}
