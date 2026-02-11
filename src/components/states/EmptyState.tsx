import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: ReactNode;
  variant?: "default" | "compact" | "bordered";
  className?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  icon,
  variant = "default",
  className = "",
}: Props) {
  const baseStyles =
    "rounded-xl bg-surface-1 text-center transition-colors duration-200";

  const variantStyles = {
    default: "border border-border p-8",
    compact: "border border-border p-6",
    bordered:
      "border-2 border-border-primary/40 p-8 hover:border-border-primary",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        {icon ? <div className="text-foreground opacity-80">{icon}</div> : null}

        <h2 className="text-lg font-semibold text-foreground">{title}</h2>

        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        {actionLabel || secondaryActionLabel ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {actionLabel && onAction ? (
              <Button onClick={onAction} size="default">
                {actionLabel}
              </Button>
            ) : null}

            {secondaryActionLabel && onSecondaryAction ? (
              <Button
                variant="outline"
                onClick={onSecondaryAction}
                size="default"
              >
                {secondaryActionLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
