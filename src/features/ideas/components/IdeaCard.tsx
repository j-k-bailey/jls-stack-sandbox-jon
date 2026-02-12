import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductIdea } from "@/lib/types/productIdeas";
import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";
import { format } from "date-fns";

// ─── Status / priority config ─────────────────────────────────────────────────

const STATUS_META: Record<
  ProductIdeaStatus,
  { label: string; glyph: string; textClass: string; bgBarClass: string }
> = {
  draft: {
    label: "DRAFT",
    glyph: "○",
    textClass: "text-muted-foreground",
    bgBarClass: "bg-border",
  },
  active: {
    label: "ACTIVE",
    glyph: "◉",
    textClass: "text-primary",
    bgBarClass: "bg-primary",
  },
  paused: {
    label: "PAUSED",
    glyph: "◫",
    textClass: "text-warning",
    bgBarClass: "bg-warning",
  },
  shipped: {
    label: "SHIPPED",
    glyph: "◆",
    textClass: "text-success",
    bgBarClass: "bg-success",
  },
};

const PRIORITY_META: Record<
  ProductIdeaPriority,
  { label: string; glyph: string; textClass: string }
> = {
  now: { label: "NOW", glyph: "▲", textClass: "text-accent" },
  next: { label: "NEXT", glyph: "▶", textClass: "text-primary" },
  later: { label: "LATER", glyph: "▷", textClass: "text-muted-foreground" },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function IdeaCardSkeleton() {
  return (
    <div className="flex border border-border rounded-lg overflow-hidden">
      <div className="w-1 shrink-0 bg-border/50" />
      <div className="flex-1 px-4 py-3 space-y-2.5">
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex justify-between pt-1">
          <div className="flex gap-1.5">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface IdeaCardProps {
  idea: ProductIdea;
  isOwner?: boolean;
  isArchived?: boolean;
  maxTags?: number;
  linkable?: boolean;
}

export function IdeaCard({
  idea,
  isOwner = false,
  isArchived = false,
  maxTags = 5,
  linkable = true,
}: IdeaCardProps) {
  const status = STATUS_META[idea.status] ?? STATUS_META.draft;
  const priority = idea.priority ? PRIORITY_META[idea.priority] : null;

  const card = (
    <div
      className={cn(
        "group flex border rounded-lg overflow-hidden",
        "transition-all duration-150  bg-surface-1 border-border",
        "hover:border-border-primary hover:bg-primary-background/20",
        "cursor-pointer",
      )}
    >
      {/* Status accent bar - muted if archived */}
      <div
        className={cn(
          "w-1 shrink-0 transition-colors duration-150",
          isArchived ? "bg-border/50" : status.bgBarClass,
        )}
        aria-hidden
      />

      <div className="flex flex-col flex-1 min-w-0 px-4 py-3 gap-2">
        {/* Meta row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-2.5">
            {/* Archived badge takes priority */}
            {isArchived ? (
              <div className="overline-text flex items-center gap-1 text-foreground">
                <Archive className="h-4 w-4" aria-hidden />
                <span>ARCHIVED</span>
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "overline-text flex items-center gap-1",
                    status.textClass,
                  )}
                >
                  <span aria-hidden>{status.glyph}</span>
                  <span>{status.label}</span>
                </div>

                {priority && (
                  <>
                    <span className="w-px h-3 bg-border shrink-0" aria-hidden />
                    <div
                      className={cn(
                        "overline-text flex items-center gap-1",
                        priority.textClass,
                      )}
                    >
                      <span aria-hidden>{priority.glyph}</span>
                      <span>{priority.label}</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {isOwner && (
            <div className="sm:ml-auto overline-text text-accent flex items-center gap-1 shrink-0">
              <span aria-hidden>◈</span>
              <span>MINE</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className={cn(
            "headline-3 leading-snug line-clamp-2 transition-colors duration-150 text-foreground group-hover:text-primary",
          )}
        >
          {idea.title}
        </h2>

        {/* Summary */}
        <p className="body-2 text-muted-foreground line-clamp-2 leading-relaxed">
          {idea.summary}
        </p>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 pt-0.5 mt-auto">
          <div className="flex flex-wrap gap-1 min-w-0">
            {idea.tags && idea.tags.length > 0 && (
              <>
                {idea.tags.slice(0, maxTags).map((tag) => (
                  <Badge
                    key={tag}
                    variant={isArchived ? "muted-subtle" : "neutral-outline"}
                    className="text-[10px] px-1.5 py-0 h-4.5 leading-none"
                  >
                    {tag}
                  </Badge>
                ))}
                {idea.tags.length > maxTags && (
                  <Badge
                    variant="muted-subtle"
                    className="text-[10px] px-1.5 py-0 h-4.5 leading-none"
                  >
                    +{idea.tags.length - maxTags}
                  </Badge>
                )}
              </>
            )}
          </div>

          {idea.createdAt && (
            <span className="caption text-muted-foreground/60 sm:whitespace-nowrap sm:shrink-0 sm:ml-auto">
              {format(idea.createdAt.toDate(), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!linkable) return card;

  return (
    <Link to={`/ideas/${idea.ideaId}`} className="block">
      {card}
    </Link>
  );
}
