// @/components/common/RefreshingIndicator.tsx
import { cn } from "@/lib/utils";

interface RefreshingIndicatorProps {
  /** Whether a background refresh is in progress */
  active: boolean;
  className?: string;
}

/**
 * A slim animated progress bar that appears at the top of a content region
 * during non-first-load refreshes (filter changes, refetches, etc.).
 *
 * Deliberately subtle — does not displace content or show skeletons.
 */
export function RefreshingIndicator({
  active,
  className,
}: RefreshingIndicatorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-0.5 w-full overflow-hidden rounded-full",
        "transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "h-full bg-primary origin-left rounded-full",
          active && "animate-refreshing",
        )}
        style={
          active
            ? {
                animation: "refreshing 1.4s ease-in-out infinite",
              }
            : undefined
        }
      />
      <style>{`
        @keyframes refreshing {
          0%   { transform: translateX(-100%) scaleX(0.3); }
          40%  { transform: translateX(-10%) scaleX(0.7); }
          100% { transform: translateX(110%) scaleX(0.3); }
        }
      `}</style>
    </div>
  );
}
