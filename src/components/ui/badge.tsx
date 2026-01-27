import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-tight py-0.5 overline-text w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        // Solid variants - full color backgrounds
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary-hover",
        secondary:
          "bg-accent text-accent-foreground [a&]:hover:bg-accent-hover",
        accent: "bg-accent text-accent-foreground [a&]:hover:bg-accent-hover",
        success:
          "bg-success text-success-foreground [a&]:hover:bg-success-hover",
        warning:
          "bg-warning text-warning-foreground [a&]:hover:bg-warning-hover",
        neutral:
          "bg-neutral text-neutral-foreground [a&]:hover:bg-neutral-hover",
        muted: "bg-muted text-muted-foreground [a&]:hover:bg-muted-hover",

        // Subtle variants - tinted backgrounds
        "primary-subtle":
          "bg-primary-background text-primary-on-background border-primary/20 [a&]:hover:bg-primary-background/80",
        "accent-subtle":
          "bg-accent-background text-accent-on-background border-accent/20 [a&]:hover:bg-accent-background/80",
        "success-subtle":
          "bg-success-background text-success-on-background border-success/20 [a&]:hover:bg-success-background/80",
        "warning-subtle":
          "bg-warning-background text-warning-on-background border-warning/20 [a&]:hover:bg-warning-background/80",
        "neutral-subtle":
          "bg-neutral-background text-neutral-on-background border-neutral/20 [a&]:hover:bg-neutral-background/80",
        "muted-subtle":
          "bg-muted-background text-muted-on-background border-muted/20 [a&]:hover:bg-muted-background/80",

        // Outline variants - transparent with semantic borders
        "primary-outline":
          "border-2 border-primary text-primary-on-background bg-transparent [a&]:hover:bg-primary-background",
        "accent-outline":
          "border-2 border-accent text-accent-on-background bg-transparent [a&]:hover:bg-accent-background",
        "success-outline":
          "border-2 border-success text-success-on-background bg-transparent [a&]:hover:bg-success-background",
        "warning-outline":
          "border-2 border-warning text-warning-on-background bg-transparent [a&]:hover:bg-warning-background",
        "neutral-outline":
          "border-2 border-neutral text-neutral-on-background bg-transparent [a&]:hover:bg-neutral-background",

        // Generic outline (non-semantic)
        outline:
          "border border-border text-foreground [a&]:hover:bg-neutral-background",

        // Ghost variant - minimal styling
        ghost:
          "border-transparent [a&]:hover:bg-neutral-background [a&]:hover:text-neutral-on-background",

        // Link variant
        link: "text-primary-on-background underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
