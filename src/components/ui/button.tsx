import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-tight whitespace-nowrap rounded-lg shrink-0 button-text transition-all outline-none hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-border-primary hover:bg-primary-hover",
        destructive:
          "bg-warning text-warning-foreground border border-border-warning hover:bg-warning-hover",
        outline:
          "border shadow-xs text-primary border-border-primary hover:bg-primary-background hover:text-primary",
        input:
          "border border-border shadow-xs text-primary bg-background hover:text-primary hover:border-accent/50 hover:shadow-xs hover:shadow-accent/40 ",
        secondary:
          "bg-accent text-accent-foreground border border-border-accent hover:bg-accent-hover",
        ghost:
          "border border-transparent text-primary hover:bg-primary-background hover:text-primary",
        link: "border-transparent underline-offset-4 text-primary hover:underline hover:text-primary-hover",
      },
      size: {
        default: "h-9 px-compact py-tight",
        sm: "h-8 px-compact text-sm",
        lg: "h-10 px-standard",
        icon: "size-9",
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
