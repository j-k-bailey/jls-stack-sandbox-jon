import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-tight whitespace-nowrap rounded-lg text-button transition-all disabled:pointer-events-none disabled:bg-disabled-background disabled:text-disabled-text disabled:border-disabled-border [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 aria-invalid:border-error",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-border-primary hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground border border-border-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-background text-foreground shadow-xs hover:bg-surface-5 hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
        ghost: "hover:bg-surface-5 hover:text-foreground",
        link: "text-link hover:text-link-hover underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-compact py-tight has-[>svg]:px-compact",
        sm: "h-8 rounded-lg px-compact has-[>svg]:px-tight",
        lg: "h-10 rounded-lg px-standard has-[>svg]:px-compact",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
