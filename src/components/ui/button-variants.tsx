// button.tsx
import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Shared base classes
const baseClasses = [
  "inline-flex items-center justify-center gap-tight",
  "whitespace-nowrap rounded-lg shrink-0",
  "button-text transition-all outline-none",
  "hover:cursor-pointer active:scale-98",
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "focus-visible:ring-foreground",
  "disabled:pointer-events-none disabled:bg-disabled-background",
  "disabled:text-disabled-foreground/80 disabled:border-border-disabled",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  "[&_svg:not([class*='size-'])]:size-4",
].join(" ");

// Shared size variants
const sizeVariants = {
  default: "h-9 px-compact py-tight has-[>svg]:px-compact",
  sm: "h-8 px-compact has-[>svg]:px-tight",
  lg: "h-10 px-standard has-[>svg]:px-compact",
  icon: "size-9 px-0",
  "icon-sm": "size-8 px-0",
  "icon-lg": "size-10 px-0",
};

// ============================================================================
// FILLED BUTTON (default)
// ============================================================================
const filledButtonVariants = cva(baseClasses, {
  variants: {
    semantic: {
      primary:
        "bg-primary text-primary-foreground border border-border-primary hover:bg-primary-hover",
      accent:
        "bg-accent text-accent-foreground border border-border-accent hover:bg-accent-hover",
      success:
        "bg-success text-success-foreground border border-border-success hover:bg-success-hover",
      warning:
        "bg-warning text-warning-foreground border border-border-warning hover:bg-warning-hover",
      neutral:
        "bg-neutral text-neutral-foreground border border-border-neutral hover:bg-neutral-hover",
    },
    size: sizeVariants,
  },
  defaultVariants: { semantic: "neutral", size: "default" },
});

export interface FilledButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filledButtonVariants> {}

export const FilledButton = React.forwardRef<
  HTMLButtonElement,
  FilledButtonProps
>(({ className, semantic, size, ...props }, ref) => (
  <button
    className={cn(filledButtonVariants({ semantic, size, className }))}
    ref={ref}
    {...props}
  />
));
FilledButton.displayName = "Button";

// ============================================================================
// OUTLINE BUTTON
// ============================================================================
const outlineButtonVariants = cva(`${baseClasses} border-2 shadow-xs`, {
  variants: {
    semantic: {
      primary:
        "text-primary border-border-primary hover:bg-primary-background hover:text-primary",
      accent:
        "text-accent border-border-accent hover:bg-accent-background hover:text-accent",
      success:
        "text-success border-border-success hover:bg-success-background hover:text-success",
      warning:
        "text-warning border-border-warning hover:bg-warning-background hover:text-warning",
      neutral:
        "text-neutral-foreground border-border-neutral hover:bg-neutral-background hover:text-neutral-foreground",
    },
    size: sizeVariants,
  },
  defaultVariants: { semantic: "neutral", size: "default" },
});

export interface OutlineButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof outlineButtonVariants> {}

export const OutlineButton = React.forwardRef<
  HTMLButtonElement,
  OutlineButtonProps
>(({ className, semantic, size, ...props }, ref) => (
  <button
    className={cn(outlineButtonVariants({ semantic, size, className }))}
    ref={ref}
    {...props}
  />
));
OutlineButton.displayName = "OutlineButton";

// ============================================================================
// GHOST BUTTON
// ============================================================================
const ghostButtonVariants = cva(`${baseClasses} border-transparent`, {
  variants: {
    semantic: {
      primary:
        "border border-transparent text-primary hover:bg-primary-background hover:text-primary hover:border-border-primary",
      accent:
        "border border-transparent text-accent hover:bg-accent-background hover:text-accent hover:border-border-accent",
      success:
        "border border-transparent text-success hover:bg-success-background hover:text-success hover:border-border-success",
      warning:
        "border border-transparent text-warning hover:bg-warning-background hover:text-warning hover:border-border-warning",
      neutral:
        "border border-transparent text-neutral-foreground hover:bg-neutral-background hover:text-neutral-foreground hover:border-border-neutral",
    },

    size: sizeVariants,
  },
  defaultVariants: { semantic: "neutral", size: "default" },
});

export interface GhostButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ghostButtonVariants> {}

export const GhostButton = React.forwardRef<
  HTMLButtonElement,
  GhostButtonProps
>(({ className, semantic, size, ...props }, ref) => (
  <button
    className={cn(ghostButtonVariants({ semantic, size, className }))}
    ref={ref}
    {...props}
  />
));
GhostButton.displayName = "GhostButton";

// ============================================================================
// LINK BUTTON
// ============================================================================
const linkButtonVariants = cva(
  `${baseClasses} border-transparent underline-offset-4 active:scale-100`,
  {
    variants: {
      semantic: {
        primary: "text-primary hover:underline hover:text-primary-hover",
        accent: "text-accent hover:underline hover:text-accent-hover",
        success: "text-success hover:underline hover:text-success-hover",
        warning: "text-warning hover:underline hover:text-warning-hover",
        neutral:
          "text-neutral-foreground hover:underline hover:text-neutral-hover",
      },
      size: sizeVariants,
    },
    defaultVariants: { semantic: "neutral", size: "default" },
  },
);

export interface LinkButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof linkButtonVariants> {}

export const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, semantic, size, ...props }, ref) => (
    <button
      className={cn(linkButtonVariants({ semantic, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
LinkButton.displayName = "LinkButton";
