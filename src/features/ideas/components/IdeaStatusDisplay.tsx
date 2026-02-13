import { cn } from "@/lib/utils";
import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";

// ─── Status config ────────────────────────────────────────────────────────────

interface StatusConfig {
  label: string;
  glyph: string; // Leading sigil — keeps it terse + terminal
  colorClass: string; // Tailwind text color
  borderClass: string; // Left accent rule color
  bgClass: string; // Very faint bg wash
}

const STATUS_CONFIG: Record<ProductIdeaStatus, StatusConfig> = {
  draft: {
    label: "DRAFT",
    glyph: "○",
    colorClass: "text-muted-foreground",
    borderClass: "border-l-border",
    bgClass: "bg-transparent",
  },
  active: {
    label: "ACTIVE",
    glyph: "◉",
    colorClass: "text-primary",
    borderClass: "border-l-primary",
    bgClass: "bg-primary-background",
  },
  paused: {
    label: "PAUSED",
    glyph: "◫",
    colorClass: "text-warning",
    borderClass: "border-l-warning",
    bgClass: "bg-warning-background",
  },
  shipped: {
    label: "SHIPPED",
    glyph: "◆",
    colorClass: "text-success",
    borderClass: "border-l-success",
    bgClass: "bg-success-background",
  },
};

// ─── Priority config ──────────────────────────────────────────────────────────

interface PriorityConfig {
  label: string;
  glyph: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
}

const PRIORITY_CONFIG: Record<ProductIdeaPriority, PriorityConfig> = {
  now: {
    label: "NOW",
    glyph: "▲",
    colorClass: "text-accent",
    borderClass: "border-l-accent",
    bgClass: "bg-accent-background",
  },
  next: {
    label: "NEXT",
    glyph: "▶",
    colorClass: "text-primary",
    borderClass: "border-l-primary",
    bgClass: "bg-primary-background",
  },
  later: {
    label: "LATER",
    glyph: "▷",
    colorClass: "text-muted-foreground",
    borderClass: "border-l-border",
    bgClass: "bg-transparent",
  },
};

// ─── Shared block component ───────────────────────────────────────────────────

interface StatusBlockProps {
  overline: string; // e.g. "STATUS" or "PRIORITY"
  value: string; // e.g. "ACTIVE" or "NOW"
  glyph: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  className?: string;
}

function StatusBlock({
  overline,
  value,
  glyph,
  colorClass,
  borderClass,
  bgClass,
  className,
}: StatusBlockProps) {
  return (
    <div
      className={cn(
        // Left accent rule — the defining cyberpunk detail
        "border-l-[3px] pl-3",
        borderClass,
        bgClass,
        "py-stack pr-3 rounded-r-sm",
        className,
      )}
    >
      {/* Overline label */}
      <p className="overline text-muted-foreground tracking-[0.18em] leading-none mb-stack">
        {overline}
      </p>

      {/* Value — headline weight, color-coded */}
      <p
        className={cn(
          "headline-3 leading-none font-bold tracking-tight flex items-center gap-2",
          colorClass,
        )}
      >
        <span className="text-[0.7em] opacity-80 select-none" aria-hidden>
          {glyph}
        </span>
        {value}
      </p>
    </div>
  );
}

// ─── Public components ────────────────────────────────────────────────────────

interface IdeaStatusDisplayProps {
  status: ProductIdeaStatus;
  className?: string;
}

export function IdeaStatusDisplay({
  status,
  className,
}: IdeaStatusDisplayProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <StatusBlock
      overline="STATUS"
      value={config.label}
      glyph={config.glyph}
      colorClass={config.colorClass}
      borderClass={config.borderClass}
      bgClass={config.bgClass}
      className={className}
    />
  );
}

interface IdeaPriorityDisplayProps {
  priority: ProductIdeaPriority;
  className?: string;
}

export function IdeaPriorityDisplay({
  priority,
  className,
}: IdeaPriorityDisplayProps) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.later;
  return (
    <StatusBlock
      overline="PRIORITY"
      value={config.label}
      glyph={config.glyph}
      colorClass={config.colorClass}
      borderClass={config.borderClass}
      bgClass={config.bgClass}
      className={className}
    />
  );
}
