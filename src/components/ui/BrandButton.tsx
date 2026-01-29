// button.tsx
import * as React from "react";
import {
  FilledButton,
  OutlineButton,
  GhostButton,
  LinkButton,
} from "@/components/ui/BrandButtonVariants";

// BUTTON - Wrapper that picks the right component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "ghost" | "link";
  semantic?: "primary" | "accent" | "success" | "warning" | "neutral";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      semantic = "neutral",
      size = "default",
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Normalize "default" to actual default values

    const normalizedVariant = variant;
    const normalizedSemantic = semantic;

    const buttonMap = {
      filled: FilledButton,
      outline: OutlineButton,
      ghost: GhostButton,
      link: LinkButton,
    };

    const ButtonComponent = buttonMap[normalizedVariant];

    return (
      <ButtonComponent
        semantic={normalizedSemantic}
        size={size}
        asChild={asChild}
        className={className}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "BrandButton";
