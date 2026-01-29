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
import { Button, type ButtonProps } from "@/components/ui/BrandButton";

const baselineStyling =
  "flex flex-col sm:flex-row border border-t-4 rounded-b-container shadow-low items-start gap-inset-sm p-inset-sm ";

const inlineAlertVariants = cva(baselineStyling, {
  variants: {
    variant: {
      primary:
        "bg-primary-background border-border-primary text-primary-on-background",
      neutral:
        "bg-muted-background border-border-neutral text-neutral-on-background",
      accent:
        "bg-accent-background border-border-accent text-accent-on-background",
      success:
        "bg-success-background border-border-success text-success-on-background",
      warning:
        "bg-warning-background border-border-warning text-warning-on-background",
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
  title?: React.ReactNode;
  body?: React.ReactNode;
}

export const InlineAlert = ({
  variant = "neutral",
  children,
  className,
  dismissible = false,
  onDismiss,
  textOnly = false,
  icon,
  title,
}: InlineAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const Icon = icon || iconMap[variant as keyof typeof iconMap];
  const semantic = variant ?? undefined;

  return (
    <div className={cn(inlineAlertVariants({ variant }), className)}>
      <InlineAlertIcon Icon={Icon} textOnly={textOnly} />
      <div className="flex flex-col cols-1 w-full">
        {title && <InlineAlertTitle>{title}</InlineAlertTitle>}

        {children && <InlineAlertBody>{children}</InlineAlertBody>}
      </div>

      {dismissible && (
        <InlineAlertDismiss onClick={handleDismiss} variant={semantic} />
      )}
    </div>
  );
};

/* Subcomponents for composition (shadcn-like) */
export const InlineAlertTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn("font-semibold body-1 pb-inset-xs leading-none", className)}
    >
      {children}
    </p>
  );
};

export const InlineAlertBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={cn("body-2", className)}>{children}</p>;
};

const InlineAlertIcon = ({
  Icon,
  textOnly = false,
  className,
}: {
  Icon?: LucideIcon | null;
  textOnly?: boolean;
  className?: string;
}) => {
  if (textOnly || !Icon) return null;
  return <Icon className={cn("h-5 w-5 shrink-0 mx-auto", className)} />;
};

const InlineAlertDismiss = ({
  onClick,
  variant = "neutral",
}: {
  onClick?: () => void;
  variant?: ButtonProps["semantic"];
}) => {
  return (
    <Button
      variant="ghost"
      semantic={variant}
      size="icon-sm"
      onClick={onClick}
      className="-mt-0.5 shrink-0 mx-auto"
      aria-label="Dismiss alert"
    >
      <X />
    </Button>
  );
};
