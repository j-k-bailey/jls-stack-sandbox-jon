// @/components/common/FetchErrorBanner.tsx
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FetchErrorBannerProps {
  /** Error message to display */
  message?: string;
  /** Optional retry handler */
  onRetry?: () => void;
  className?: string;
}

/**
 * A non-modal error panel shown when a fetch/load fails.
 * Use for page-level or section-level data fetch failures.
 * For form/save errors, use InlineAlert instead.
 */
export function FetchErrorBanner({
  message = "Something went wrong while loading data.",
  onRetry,
  className,
}: FetchErrorBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-inline rounded-lg border border-destructive/30",
        "bg-destructive/5 px-inset-lg py-inset-md text-sm text-destructive",
        className,
      )}
    >
      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">Failed to load</p>
        <p className="text-destructive/80 mt-0.5">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 -mr-2"
        >
          <RefreshCcw className="h-3.5 w-3.5 mr-1.5" />
          Retry
        </Button>
      )}
    </div>
  );
}
