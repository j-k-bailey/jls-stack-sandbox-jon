import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-inset-xs text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-inline [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        // === SOLID VARIANTS - Full color backgrounds ===
        default: "bg-primary text-primary-foreground border-transparent",
        accent: "bg-accent text-accent-foreground border-transparent",
        success: "bg-success text-success-foreground border-transparent",
        warning: "bg-warning text-warning-foreground border-transparent",
        neutral: "bg-neutral text-neutral-foreground border-transparent",
        muted: "bg-muted text-muted-foreground border-transparent",

        // === SUBTLE VARIANTS - Tinted backgrounds ===
        "primary-subtle":
          "bg-primary-background text-primary-on-background border-primary/20",
        "accent-subtle":
          "bg-accent-background text-accent-on-background border-accent/20",
        "success-subtle":
          "bg-success-background text-success-on-background border-success/20",
        "warning-subtle":
          "bg-warning-background text-warning-on-background border-warning/20",
        "neutral-subtle":
          "bg-neutral-background text-neutral-on-background border-neutral/20",
        "muted-subtle":
          "bg-muted-background text-muted-on-background border-muted/20",

        // === OUTLINE VARIANTS - Transparent with semantic borders ===
        "primary-outline":
          "border border-primary text-primary-on-background bg-transparent",
        "accent-outline":
          "border border-accent text-accent-on-background bg-transparent",
        "success-outline":
          "border border-success text-success-on-background bg-transparent",
        "warning-outline":
          "border border-warning text-warning-on-background bg-transparent",
        "neutral-outline":
          "border border-neutral text-neutral-on-background bg-transparent",

        // Generic outline (non-semantic)
        outline: "border border-border text-foreground bg-transparent",

        // === MINIMAL VARIANTS ===
        // Ghost - minimal styling
        ghost: "border-border bg-transparent text-foreground",

        // Link - underlined text
        link: "border-transparent bg-transparent text-primary-on-background underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
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
