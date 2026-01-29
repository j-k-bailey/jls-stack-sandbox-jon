import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Stat Card Variants
 * Aligned with brand kit semantic color tokens and surface elevation
 */
const statCardVariants = cva("rounded-large p-inset flex flex-col gap-inline", {
  variants: {
    variant: {
      default: "bg-surface-1 border border-border",
      featured:
        "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50 shadow-sm shadow-primary/20",
      success:
        "bg-gradient-to-br from-success/30 to-success/10 border border-success/60 shadow-sm shadow-success/20",
      error:
        "bg-gradient-to-br from-warning/30 to-warning/10 border border-warning/60 shadow-sm shadow-warning/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Label color variants using semantic tokens
 */
const labelVariants = cva("overline-text", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      featured: "text-primary-on-background",
      success: "text-success-on-background",
      error: "text-warning-on-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Value color variants using semantic tokens
 * Uses headline-1 utility for fluid typography (32px → 48px)
 */
const valueVariants = cva(
  "headline-1 font-bold leading-none mb-tight whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "text-primary-on-background",
        featured:
          "bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent",
        success: "text-success-on-background",
        error: "text-warning-on-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Description color variants using semantic tokens
 */
const descriptionVariants = cva("caption leading-relaxed", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      featured: "text-primary-on-background",
      success: "text-success-on-background",
      error: "text-warning-on-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface StatCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  description: string;
}

export function StatCard({
  label,
  value,
  description,
  variant = "default",
  className,
  ...props
}: StatCardProps) {
  // Format numbers with locale-specific separators
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div className={cn(statCardVariants({ variant }), className)} {...props}>
      {/* Label with semantic color */}
      <p className={labelVariants({ variant })}>{label}</p>

      {/* Value with fluid typography and no wrapping */}
      <p className={valueVariants({ variant })}>{formattedValue}</p>

      {/* Description with semantic color */}
      <p className={descriptionVariants({ variant })}>{description}</p>
    </div>
  );
}
