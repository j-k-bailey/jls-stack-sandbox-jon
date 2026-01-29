import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles - brand kit compliant
  [
    // Layout & Typography
    "inline-flex items-center justify-center shrink-0",
    "button-text", // Uses brand typography utility
    "whitespace-nowrap",

    // Spacing - uses semantic tokens
    "gap-inline", // 4-6px for icon+text (inline related items)

    // Border Radius - interactive elements use 4px
    "rounded-interactive",

    // Transitions
    "transition-all",

    // Focus States - High contrast keyboard navigation (automatic from index.css)
    // 3px cyan ring with 2px offset applied via :focus-visible
    "outline-none",

    // Interaction States
    "hover:cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",

    // Icon sizing
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

    // Hit Target - ensures minimum 24x24px for accessibility
    "hit-target",
  ],
  {
    variants: {
      variant: {
        // Primary CTA - Electric Cyan
        default: [
          "bg-primary text-primary-foreground",
          "border border-border-primary",
          "hover:bg-primary-hover",
          "shadow-glow-primary",
        ],

        // Destructive - Hot Coral Warning
        destructive: [
          "bg-warning text-warning-foreground",
          "border border-border-warning",
          "hover:bg-warning-hover",
          "shadow-glow-warning",
        ],

        // Outline - Transparent with primary border
        outline: [
          "bg-transparent text-primary",
          "border border-border-primary",
          "hover:bg-primary-background hover:text-primary-on-background",
          "shadow-low",
        ],

        // Input style - For form contexts
        input: [
          "bg-background text-foreground",
          "border border-input",
          "hover:border-border-primary",
          "shadow-low",
          "hover:shadow-medium",
        ],

        // Secondary CTA - Vaporwave Fuchsia
        secondary: [
          "bg-accent text-accent-foreground",
          "border border-border-accent",
          "hover:bg-accent-hover",
          "shadow-glow-accent",
        ],

        // Ghost - Transparent, minimal
        ghost: [
          "bg-transparent text-primary",
          "border border-transparent",
          "hover:bg-primary-background hover:text-primary-on-background",
        ],

        // Link - Text-only, no background
        link: [
          "bg-transparent text-link",
          "border border-transparent",
          "underline-offset-4",
          "hover:underline hover:text-link-hover",
        ],

        // Neutral - No semantic meaning
        neutral: [
          "bg-neutral text-neutral-foreground",
          "border border-border-neutral",
          "hover:bg-neutral-hover",
        ],

        // Muted - De-emphasized
        muted: [
          "bg-muted text-muted-foreground",
          "border border-border-muted",
          "hover:bg-muted-hover",
        ],
      },

      size: {
        // Small - Compact padding
        sm: ["px-inset py-inline", "text-sm"],

        // Default - Standard button padding
        default: ["px-inset py-stack"],

        // Large - Generous padding
        lg: ["px-inset-lg py-stack"],

        // Icon only - Square with hit-target
        icon: ["size-9", "p-0"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
