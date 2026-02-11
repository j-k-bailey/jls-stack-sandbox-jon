import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  customAction?: ReactNode;
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
  customAction,
  icon,
  variant = "default",
  className = "",
}: Props) {
  const baseStyles =
    "rounded-xl bg-surface-1 text-center transition-colors duration-200";

  const variantStyles = {
    default: "border border-surface-1 p-8",
    compact: "border border-surface-1 p-6",
    bordered: "border-2 border-surface-2/50 p-8 hover:border-border-primary/50",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        {icon ? <div className="text-slate-300 opacity-80">{icon}</div> : null}

        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>

        {description ? (
          <p className="text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        ) : null}

        {actionLabel || secondaryActionLabel || customAction ? (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {customAction ? (
              customAction
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
