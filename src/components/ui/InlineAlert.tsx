import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const baselineStyling =
  "flex items-start gap-compact border border-t-4 p-compact rounded-b-lg shadow-sm shadow-warning/20";

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

const iconMap: Record<string, LucideIcon> = {
  primary: Info,
  neutral: Info,
  accent: Sparkles,
  success: CheckCircle,
  warning: AlertCircle,
};

export interface InlineAlertProps extends VariantProps<
  typeof inlineAlertVariants
> {
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  textOnly?: boolean;
  icon?: LucideIcon;
}

export const InlineAlert = ({
  variant = "neutral",
  children,
  className,
  dismissible = false,
  onDismiss,
  textOnly = false,
  icon,
}: InlineAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const Icon = icon || iconMap[variant as keyof typeof iconMap];

  return (
    <div className={cn(inlineAlertVariants({ variant }), className)}>
      {!textOnly && Icon && <Icon className="h-5 w-5 shrink-0" />}
      <div className="flex-1 body-2">{children}</div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity rounded-sm hover:bg-black/5 dark:hover:bg-white/5 p-0.5 -mt-0.5"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
