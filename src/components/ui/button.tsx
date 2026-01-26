import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Shared base classes
const baseClasses =
  "inline-flex items-center justify-center gap-tight whitespace-nowrap rounded-lg typo-button transition-all outline-none shrink-0 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-border-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

// Shared size variants
const sizeVariants = {
  default: "h-9 px-compact py-tight has-[>svg]:px-compact",
  sm: "h-8 px-compact has-[>svg]:px-tight",
  lg: "h-10 px-standard has-[>svg]:px-compact",
  icon: "size-9 px-0",
  "icon-sm": "size-8 px-0",
  "icon-lg": "size-10 px-0",
};

// FILLED BUTTON (default)
const buttonVariants = cva(baseClasses, {
  variants: {
    semantic: {
      primary:
        "bg-primary text-primary-foreground border border-border-primary hover:bg-primary-hover focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-[3px]",
      accent:
        "bg-accent text-accent-foreground border border-border-accent hover:bg-accent-hover focus-visible:border-accent focus-visible:ring-accent/20 focus-visible:ring-[3px]",
      success:
        "bg-success text-success-foreground border border-border-success hover:bg-success-hover focus-visible:border-success focus-visible:ring-success/20 focus-visible:ring-[3px]",
      warning:
        "bg-warning text-warning-foreground border border-border-warning hover:bg-warning-hover focus-visible:border-warning focus-visible:ring-warning/20 focus-visible:ring-[3px]",
      neutral:
        "bg-neutral text-neutral-foreground border border-border-neutral hover:bg-neutral-hover focus-visible:border-neutral focus-visible:ring-neutral/20 focus-visible:ring-[3px]",
    },
    size: sizeVariants,
  },
  defaultVariants: {
    semantic: "neutral",
    size: "default",
  },
});

// OUTLINE BUTTON
const outlineButtonVariants = cva(
  `${baseClasses} border bg-background shadow-xs`,
  {
    variants: {
      semantic: {
        primary:
          "text-primary border-border-primary hover:bg-primary-background hover:text-primary focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-[3px]",
        accent:
          "text-accent border-border-accent hover:bg-accent-background hover:text-accent focus-visible:border-accent focus-visible:ring-accent/20 focus-visible:ring-[3px]",
        success:
          "text-success border-border-success hover:bg-success-background hover:text-success focus-visible:border-success focus-visible:ring-success/20 focus-visible:ring-[3px]",
        warning:
          "text-warning border-border-warning hover:bg-warning-background hover:text-warning focus-visible:border-warning focus-visible:ring-warning/20 focus-visible:ring-[3px]",
        neutral:
          "text-neutral-foreground border-border-neutral hover:bg-neutral-background hover:text-neutral-foreground focus-visible:border-neutral focus-visible:ring-neutral/20 focus-visible:ring-[3px]",
      },
      size: sizeVariants,
    },
    defaultVariants: {
      semantic: "neutral",
      size: "default",
    },
  },
);

// GHOST BUTTON
const ghostButtonVariants = cva(`${baseClasses} border-transparent`, {
  variants: {
    semantic: {
      primary:
        "text-primary hover:bg-primary-background hover:text-primary focus-visible:ring-primary/20 focus-visible:ring-[3px]",
      accent:
        "text-accent hover:bg-accent-background hover:text-accent focus-visible:ring-accent/20 focus-visible:ring-[3px]",
      success:
        "text-success hover:bg-success-background hover:text-success focus-visible:ring-success/20 focus-visible:ring-[3px]",
      warning:
        "text-warning hover:bg-warning-background hover:text-warning focus-visible:ring-warning/20 focus-visible:ring-[3px]",
      neutral:
        "text-neutral-foreground hover:bg-neutral-background hover:text-neutral-foreground focus-visible:ring-neutral/20 focus-visible:ring-[3px]",
    },
    size: sizeVariants,
  },
  defaultVariants: {
    semantic: "neutral",
    size: "default",
  },
});

// LINK BUTTON
const linkButtonVariants = cva(
  `${baseClasses} border-transparent underline-offset-4`,
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
    defaultVariants: {
      semantic: "neutral",
      size: "default",
    },
  },
);

// Shared interface
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// BUTTON (filled)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, semantic, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ semantic, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// OUTLINE BUTTON
const OutlineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, semantic, size, ...props }, ref) => {
    return (
      <button
        className={cn(outlineButtonVariants({ semantic, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
OutlineButton.displayName = "OutlineButton";

// GHOST BUTTON
const GhostButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, semantic, size, ...props }, ref) => {
    return (
      <button
        className={cn(ghostButtonVariants({ semantic, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
GhostButton.displayName = "GhostButton";

// LINK BUTTON
const LinkButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, semantic, size, ...props }, ref) => {
    return (
      <button
        className={cn(linkButtonVariants({ semantic, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";

export { Button, OutlineButton, GhostButton, LinkButton };
