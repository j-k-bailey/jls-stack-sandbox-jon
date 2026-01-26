import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const baselineStyling =
  "flex gap-compact border border-t-4 p-tight rounded-b shadow-md";

const inlineAlertVariants = cva(baselineStyling, {
  variants: {
    variant: {
      primary:
        "bg-primary-background border-border-primary border-t-primary text-primary-on-background",
      neutral:
        "bg-muted-background border-border-neutral border-t-neutral text-neutral-on-background",
      accent:
        "bg-accent-background border-border-accent border-t-accent text-accent-on-background",
      success:
        "bg-success-background border-border-success border-t-success text-success-on-background",
      warning:
        "bg-warning-background border-border-warning border-t-warning text-warning-on-background",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export interface InlineAlertProps extends VariantProps<
  typeof inlineAlertVariants
> {
  children: React.ReactNode;
  className?: string;
}

export const InlineAlert = ({
  variant,
  children,
  className,
}: InlineAlertProps) => {
  return (
    <div className={cn(inlineAlertVariants({ variant }), className)}>
      {children}
    </div>
  );
};
