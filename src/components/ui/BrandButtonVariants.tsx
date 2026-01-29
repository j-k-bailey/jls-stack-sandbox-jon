import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Base Button Configuration                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Base button classes with hit-target system
 *
 * HIT-TARGET SYSTEM:
 * - hit-target: Enforces 24x24px visual minimum (WCAG AA)
 * - Extends interactive area to 44x44px via padding (WCAG AAA)
 *
 * IMPORTANT: When grouping buttons, use gap-section (24-40px) to prevent
 * hit-box overlap. gap-inline (4-6px) is too small.
 */
const baseClasses = [
  "inline-flex items-center justify-center gap-inline",
  "whitespace-nowrap shrink-0",
  "hit-target", // 24px visual min + proper touch target via padding
  "rounded-interactive", // 4px radius per brand kit
  "button-text", // Typography utility
  "transition-colors duration-25 transition-ease", // Efficient transitions
  "active:scale-98",
  "disabled:pointer-events-none",
  "disabled:bg-disabled-background",
  "disabled:text-disabled-foreground",
  "disabled:border-border-disabled",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  "[&_svg:not([class*='size-'])]:size-5",
].join(" ");

/**
 * Size variants with semantic padding tokens
 *
 * PADDING SCALE (inset tokens only):
 * - sm: Minimal compact padding (inset-sm)
 * - default: Standard button padding (inset)
 * - lg: Generous prominent padding (inset-lg)
 * - icon: Symmetric padding for square buttons
 */
const sizeVariants = {
  sm: "p-inset-xs text-xs font-medium", // Compact: 6-8px
  default: "px-inset-sm py-inset-xs text-sm font-semibold", // Standard: 8-12px
  lg: "px-inset py-inset-xs text-base font-bold", // Prominent: 16-24px

  "icon-sm": "aspect-square min-h-8 [&_svg]:size-3", // 12px icon
  icon: "aspect-square min-h-10 p-inset-xs [&_svg]:size-5", // 20px icon (default)
  "icon-lg": "aspect-square min-h-12 p-inset-sm [&_svg]:size-7", // 28px icon
};

/* -------------------------------------------------------------------------- */
/* Filled Button                                                               */
/* -------------------------------------------------------------------------- */

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
    glow: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      semantic: "primary",
      glow: true,
      className: "shadow-glow-primary",
    },
    {
      semantic: "accent",
      glow: true,
      className: "shadow-glow-accent",
    },
    {
      semantic: "success",
      glow: true,
      className: "shadow-glow-success",
    },
    {
      semantic: "warning",
      glow: true,
      className: "shadow-glow-warning",
    },
  ],
  defaultVariants: { semantic: "neutral", size: "default", glow: false },
});

export interface FilledButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof filledButtonVariants> {
  asChild?: boolean;
}

export const FilledButton = React.forwardRef<
  HTMLButtonElement,
  FilledButtonProps
>(({ className, semantic, size, glow, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(filledButtonVariants({ semantic, size, glow }), className)}
      {...props}
    />
  );
});
FilledButton.displayName = "FilledButton";

/* -------------------------------------------------------------------------- */
/* Outline Button                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Outline buttons use border-emphasis (2px) per brand kit
 */
const outlineButtonVariants = cva(
  `${baseClasses} bg-transparent border border-2`,
  {
    variants: {
      semantic: {
        primary:
          "text-primary-on-background border-border-primary hover:bg-primary hover:text-primary-foreground",
        accent:
          "text-accent-on-background border-accent hover:bg-accent hover:text-accent-foreground",
        success:
          "text-success-on-background border-border-success hover:bg-success hover:text-success-foreground",
        warning:
          "text-warning-on-background border-border-warning hover:bg-warning hover:text-warning-foreground",
        neutral:
          "text-neutral-on-background border-border-neutral hover:bg-neutral hover:text-neutral-foreground",
      },
      size: sizeVariants,
    },
    defaultVariants: { semantic: "neutral", size: "default" },
  },
);

export interface OutlineButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof outlineButtonVariants> {
  asChild?: boolean;
}

export const OutlineButton = React.forwardRef<
  HTMLButtonElement,
  OutlineButtonProps
>(({ className, semantic, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(outlineButtonVariants({ semantic, size }), className)}
      {...props}
    />
  );
});
OutlineButton.displayName = "OutlineButton";

/* -------------------------------------------------------------------------- */
/* Ghost Button                                                                */
/* -------------------------------------------------------------------------- */

const ghostButtonVariants = cva(`${baseClasses} border border-transparent`, {
  variants: {
    semantic: {
      primary:
        "text-primary-on-background hover:bg-primary hover:text-primary-foreground",
      accent:
        "text-accent-on-background hover:bg-accent hover:text-accent-foreground",
      success:
        "text-success-on-background hover:bg-success hover:text-success-foreground",
      warning:
        "text-warning-on-background hover:bg-warning hover:text-warning-foreground",
      neutral:
        "text-neutral-on-background hover:bg-neutral hover:text-neutral-foreground",
    },
    size: sizeVariants,
  },
  defaultVariants: { semantic: "neutral", size: "default" },
});

export interface GhostButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ghostButtonVariants> {
  asChild?: boolean;
}

export const GhostButton = React.forwardRef<
  HTMLButtonElement,
  GhostButtonProps
>(({ className, semantic, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(ghostButtonVariants({ semantic, size }), className)}
      {...props}
    />
  );
});
GhostButton.displayName = "GhostButton";

/* -------------------------------------------------------------------------- */
/* Link Button                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Link buttons don't scale on active (override base active:scale-98)
 */
const linkButtonVariants = cva(
  `${baseClasses} bg-transparent border-transparent underline-offset-4 active:scale-100`,
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
    VariantProps<typeof linkButtonVariants> {
  asChild?: boolean;
}

export const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, semantic, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(linkButtonVariants({ semantic, size }), className)}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";
