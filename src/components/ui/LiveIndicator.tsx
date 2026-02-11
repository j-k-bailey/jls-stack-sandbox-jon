import { cn } from "@/lib/utils";
import { useLiveStatus } from "@/contexts/LiveStatusContext";

export function LiveIndicator({ className }: { className?: string }) {
  const { status } = useLiveStatus();

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 px-2.5 py-1 select-none",
        "font-mono text-[10px] tracking-[0.2em] uppercase",
        "rounded-radius-interactive border transition-colors duration-500",
        // Live — primary cyan
        status === "live" && [
          "border-border-primary",
          "bg-primary-background",
          "text-primary-on-background",
        ],
        // Error — warning fuchsia
        status === "error" && [
          "border-border-warning",
          "bg-warning-background",
          "text-warning-on-background",
        ],
        // Off — muted, no glow
        status === "off" && [
          "border-border-muted",
          "bg-muted-background",
          "text-muted-foreground",
        ],
        className,
      )}
      aria-label={`Realtime status: ${status}`}
    >
      {/* Corner bracket — top left */}
      <span
        className={cn(
          "absolute top-0 left-0 h-2 w-2 border-t border-l transition-colors duration-500",
          status === "live" && "border-primary",
          status === "error" && "border-warning",
          status === "off" && "border-muted-foreground opacity-30",
        )}
        aria-hidden
      />

      {/* Corner bracket — bottom right */}
      <span
        className={cn(
          "absolute bottom-0 right-0 h-2 w-2 border-b border-r transition-colors duration-500",
          status === "live" && "border-primary",
          status === "error" && "border-warning",
          status === "off" && "border-muted-foreground opacity-30",
        )}
        aria-hidden
      />

      {/* Dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status === "live" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
        )}
        {status === "error" && (
          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-warning opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full transition-colors duration-500",
            status === "live" && "bg-primary",
            status === "error" && "bg-warning",
            status === "off" && "bg-muted-foreground opacity-30",
          )}
        />
      </span>

      {/* Label */}
      <span className="leading-none">
        {status === "live" && "Live"}
        {status === "error" && "Error"}
        {status === "off" && "Off"}
      </span>
    </div>
  );
}
