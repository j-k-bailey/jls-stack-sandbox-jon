import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-tight whitespace-nowrap rounded-lg typo-button transition-all disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-border-disabled [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      semantic: {
        primary: "",
        accent: "",
        success: "",
        warning: "",
        neutral: "",
      },
      variant: {
        default: "",
        outline: "border bg-background shadow-xs",
        ghost: "border-transparent",
        link: "border-transparent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-compact py-tight has-[>svg]:px-compact",
        sm: "h-8 px-compact has-[>svg]:px-tight",
        lg: "h-10 px-standard has-[>svg]:px-compact",
        icon: "size-9 px-0",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-10 px-0",
      },
    },
    compoundVariants: [
      // PRIMARY + DEFAULT
      {
        semantic: "primary",
        variant: "default",
        className:
          "bg-primary text-primary-foreground border border-border-primary hover:bg-primary-hover focus-visible:border-primary focus-visible:ring-primary/20",
      },
      // PRIMARY + OUTLINE
      {
        semantic: "primary",
        variant: "outline",
        className:
          "text-primary border-border-primary hover:bg-primary-background hover:text-primary focus-visible:border-primary focus-visible:ring-primary/20",
      },
      // PRIMARY + GHOST
      {
        semantic: "primary",
        variant: "ghost",
        className:
          "text-primary hover:bg-primary-background hover:text-primary focus-visible:ring-primary/20",
      },
      // PRIMARY + LINK
      {
        semantic: "primary",
        variant: "link",
        className: "text-primary hover:text-primary-hover",
      },

      // ACCENT + DEFAULT
      {
        semantic: "accent",
        variant: "default",
        className:
          "bg-accent text-accent-foreground border border-border-accent hover:bg-accent-hover focus-visible:border-accent focus-visible:ring-accent/20",
      },
      // ACCENT + OUTLINE
      {
        semantic: "accent",
        variant: "outline",
        className:
          "text-accent border-border-accent hover:bg-accent-background hover:text-accent focus-visible:border-accent focus-visible:ring-accent/20",
      },
      // ACCENT + GHOST
      {
        semantic: "accent",
        variant: "ghost",
        className:
          "text-accent hover:bg-accent-background hover:text-accent focus-visible:ring-accent/20",
      },
      // ACCENT + LINK
      {
        semantic: "accent",
        variant: "link",
        className: "text-accent hover:text-accent-hover",
      },

      // SUCCESS + DEFAULT
      {
        semantic: "success",
        variant: "default",
        className:
          "bg-success text-success-foreground border border-border-success hover:bg-success-hover focus-visible:border-success focus-visible:ring-success/20",
      },
      // SUCCESS + OUTLINE
      {
        semantic: "success",
        variant: "outline",
        className:
          "text-success border-border-success hover:bg-success-background hover:text-success focus-visible:border-success focus-visible:ring-success/20",
      },
      // SUCCESS + GHOST
      {
        semantic: "success",
        variant: "ghost",
        className:
          "text-success hover:bg-success-background hover:text-success focus-visible:ring-success/20",
      },
      // SUCCESS + LINK
      {
        semantic: "success",
        variant: "link",
        className: "text-success hover:text-success-hover",
      },

      // WARNING + DEFAULT
      {
        semantic: "warning",
        variant: "default",
        className:
          "bg-warning text-warning-foreground border border-border-warning hover:bg-warning-hover focus-visible:border-warning focus-visible:ring-warning/20",
      },
      // WARNING + OUTLINE
      {
        semantic: "warning",
        variant: "outline",
        className:
          "text-warning border-border-warning hover:bg-warning-background hover:text-warning focus-visible:border-warning focus-visible:ring-warning/20",
      },
      // WARNING + GHOST
      {
        semantic: "warning",
        variant: "ghost",
        className:
          "text-warning hover:bg-warning-background hover:text-warning focus-visible:ring-warning/20",
      },
      // WARNING + LINK
      {
        semantic: "warning",
        variant: "link",
        className: "text-warning hover:text-warning-hover",
      },

      // NEUTRAL + DEFAULT
      {
        semantic: "neutral",
        variant: "default",
        className:
          "bg-neutral text-neutral-foreground border border-border-neutral hover:bg-neutral-hover focus-visible:border-neutral focus-visible:ring-neutral/20",
      },
      // NEUTRAL + OUTLINE
      {
        semantic: "neutral",
        variant: "outline",
        className:
          "text-neutral-foreground border-border-neutral hover:bg-neutral-background hover:text-neutral-foreground focus-visible:border-neutral focus-visible:ring-neutral/20",
      },
      // NEUTRAL + GHOST
      {
        semantic: "neutral",
        variant: "ghost",
        className:
          "text-neutral-foreground hover:bg-neutral-background hover:text-neutral-foreground focus-visible:ring-neutral/20",
      },
      // NEUTRAL + LINK
      {
        semantic: "neutral",
        variant: "link",
        className: "text-neutral-foreground hover:text-neutral-hover",
      },
    ],
    defaultVariants: {
      semantic: "neutral",
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, semantic, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ semantic, variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
