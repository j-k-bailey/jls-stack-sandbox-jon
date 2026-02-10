import { cn } from "@/lib/utils";

interface ProgressBarProps {
  active: boolean;
  className?: string;
}

export const ProgressBar = ({ active, className }: ProgressBarProps) => {
  return (
    <div
      className={cn(
        "h-0.5 w-full overflow-hidden rounded-none",
        // Invisible when inactive but still occupies space —
        // prevents layout shift on the filter card
        !active && "opacity-0",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "h-full w-full origin-left",
          // Cyberpunk gradient: electric cyan → hot fuchsia
          "bg-linear-to-r from-primary via-secondary to-primary",
          // Animated scan when active
          active && "animate-scan",
        )}
      />
    </div>
  );
};
