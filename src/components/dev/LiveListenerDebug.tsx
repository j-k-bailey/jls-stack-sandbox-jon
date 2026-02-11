import { useState } from "react";
import { useLiveStatus } from "@/contexts/LiveStatusContext";
import { cn } from "@/lib/utils";

export function LiveListenerDebug() {
  const { activeCount, status } = useLiveStatus();
  const [expanded, setExpanded] = useState(true);

  if (!import.meta.env.DEV) return null;

  const isLeaking = activeCount > 4;

  return (
    <div
      className={cn(
        "fixed bottom-0 right-6 z-50",
        "font-mono uppercase tracking-widest",
        "border-x border-t rounded-t-container",
        "transition-all duration-200",
        !isLeaking &&
          "border-border-primary bg-primary-background text-primary-on-background",
        isLeaking &&
          "border-border-warning bg-warning-background text-warning-on-background",
      )}
      aria-label="Dev: Firestore listener debug panel"
    >
      {/* ── Tab / collapsed state ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex items-center gap-2.5 px-4 py-2.5 w-full text-left",
          "text-xs cursor-pointer select-none",
          "hover:opacity-80 transition-opacity",
        )}
        aria-expanded={expanded}
        aria-controls="listener-debug-panel"
      >
        {/* Dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          {status === "live" && !isLeaking && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          )}
          {isLeaking && (
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-warning opacity-60" />
          )}
          <span
            className={cn(
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              status === "live" && !isLeaking && "bg-primary",
              status === "error" && "bg-accent",
              status === "off" && "bg-muted-foreground opacity-40",
              isLeaking && "bg-warning",
            )}
          />
        </span>

        {/* Count */}
        <span className="text-sm font-bold tabular-nums leading-none">
          {activeCount}
        </span>
        <span className="text-xs opacity-60 leading-none">
          {activeCount === 1 ? "listener" : "listeners"}
        </span>

        {isLeaking && (
          <span className="ml-1 text-warning-on-background">⚠</span>
        )}

        {/* Chevron */}
        <span
          className={cn(
            "ml-auto text-[10px] opacity-50 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        >
          ▲
        </span>
      </button>

      {/* ── Expanded panel ── */}
      <div
        id="listener-debug-panel"
        className={cn(
          "overflow-hidden transition-all duration-200",
          expanded ? "max-h-48" : "max-h-0",
        )}
      >
        <div
          className={cn(
            "px-3 pb-3 pt-1 space-y-2 border-t",
            !isLeaking && "border-border-primary",
            isLeaking && "border-border-warning",
          )}
        >
          {/* Big count */}
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-3xl font-bold leading-none tabular-nums",
                !isLeaking && "text-primary-on-background",
                isLeaking && "text-warning-on-background",
              )}
            >
              {activeCount}
            </span>
            <span className="text-[10px] opacity-60">active</span>
          </div>

          {/* Status row */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="opacity-60">status</span>
            <span
              className={cn(
                "font-bold",
                status === "live" && !isLeaking && "text-primary-on-background",
                status === "error" && "text-accent-on-background",
                status === "off" && "text-muted-foreground",
                isLeaking && "text-warning-on-background",
              )}
            >
              {isLeaking ? "leak?" : status}
            </span>
          </div>

          {/* StrictMode note */}
          <p className="text-[9px] opacity-40 leading-relaxed normal-case tracking-normal max-w-40">
            {isLeaking
              ? "Count exceeds expected max. Check useEffect cleanup."
              : "StrictMode: expect mount→unmount→remount in dev. Count should stabilize."}
          </p>
        </div>
      </div>
    </div>
  );
}
