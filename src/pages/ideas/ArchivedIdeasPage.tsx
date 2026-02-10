// @/pages/ideas/ArchivedIdeasPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArchiveRestore, ArchiveX, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { FetchErrorBanner } from "@/components/common/FetchErrorBanner";
import { ArchivedIdeaBanner } from "@/components/productIdea/ArchivedIdeaBanner";
import { EmptyState } from "@/components/productIdea/EmptyState";
import {
  IdeaStatusBadge,
  IdeaPriorityBadge,
} from "@/components/productIdea/IdeaBadges";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useArchivedIdeas } from "@/components/hooks/useArchivedIdeas";
import {
  canReadProductIdeas,
  canDeleteProductIdea as canRestoreIdea,
} from "@/lib/permissions/productIdeas";
import type { ProductIdea } from "@/lib/types/productIdeas";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ArchivedCardSkeleton() {
  return (
    <div className="flex items-start gap-3 border border-border-warning/30 rounded-lg p-4 bg-warning-background/20">
      <Skeleton className="h-4 w-4 mt-0.5 shrink-0 rounded-sm" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex justify-between">
          <div className="flex gap-1.5">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// ─── Archived idea card ───────────────────────────────────────────────────────

interface ArchivedIdeaCardProps {
  idea: ProductIdea;
  isSelected: boolean;
  onToggle: (id: string) => void;
  canRestore: boolean;
}

function ArchivedIdeaCard({
  idea,
  isSelected,
  onToggle,
  canRestore,
}: ArchivedIdeaCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 border rounded-lg p-4 transition-colors duration-150",
        "bg-warning-background/20 border-border-warning/40",
        isSelected && "border-warning bg-warning-background/50",
      )}
    >
      {/* Checkbox — only rendered for owners/admins who can restore */}
      {canRestore && (
        <Checkbox
          id={`select-${idea.ideaId}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(idea.ideaId)}
          className="mt-1 shrink-0"
          aria-label={`Select "${idea.title}" for restore`}
        />
      )}

      {/* Card body — links to archived detail */}
      <Link
        to={`/ideas/archived/${idea.ideaId}`}
        className="flex-1 min-w-0 group"
      >
        {/* Meta row: status · priority · archived date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 mb-2">
          <div className="flex items-center gap-2.5">
            <IdeaStatusBadge status={idea.status} />
            {idea.priority && <IdeaPriorityBadge priority={idea.priority} />}
          </div>
          {idea.archivedAt && (
            <span className="overline text-warning/80 tracking-[0.13em] flex items-center gap-1 sm:ml-auto shrink-0">
              <ArchiveX className="h-3 w-3" aria-hidden />
              Archived {format(idea.archivedAt.toDate(), "MMM d, yyyy")}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="headline-5 leading-snug line-clamp-2 text-foreground/70 group-hover:text-foreground transition-colors duration-150 mb-1.5">
          {idea.title}
        </h2>

        {/* Summary */}
        <p className="body-2 text-muted-foreground/70 line-clamp-2 leading-relaxed mb-3">
          {idea.summary}
        </p>

        {/* Footer: tags · created date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
          {idea.tags && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {idea.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="neutral-outline"
                  className="text-[10px] px-1.5 py-0 h-[18px] leading-none opacity-60"
                >
                  {tag}
                </Badge>
              ))}
              {idea.tags.length > 4 && (
                <Badge
                  variant="muted-subtle"
                  className="text-[10px] px-1.5 py-0 h-[18px] leading-none opacity-60"
                >
                  +{idea.tags.length - 4}
                </Badge>
              )}
            </div>
          )}
          {idea.createdAt && (
            <span className="caption text-muted-foreground/50 sm:ml-auto whitespace-nowrap">
              Created {format(idea.createdAt.toDate(), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ArchivedIdeasPage() {
  const { user } = useAuth();
  const isSignedIn = !!user;

  const canRead = canReadProductIdeas(isSignedIn);

  const { ideas, loading, refreshing, fetchError, load, restore } =
    useArchivedIdeas();

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    if (canRead) load();
  }, [canRead, load]);

  // Derive pruned selection — stale ids (removed after restore) are dropped at render time
  const ideaIdSet = new Set(ideas.map((i) => i.ideaId));
  const prunedSelected = new Set(
    [...selected].filter((id) => ideaIdSet.has(id)),
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Per-idea restore permission — owner OR admin/moderator
  const restorableIds = ideas
    .filter((i) => canRestoreIdea(i.ownerId === user?.uid))
    .map((i) => i.ideaId);

  const toggleSelectAll = () => {
    setSelected(
      prunedSelected.size === restorableIds.length
        ? new Set()
        : new Set(restorableIds),
    );
  };

  const handleRestore = async (ids: string[]) => {
    setRestoring(true);
    const { failed } = await restore(ids);
    setRestoring(false);
    setSelected(new Set());

    if (failed.length === 0) {
      toast.success(
        ids.length === 1 ? "Idea restored" : `${ids.length} ideas restored`,
      );
    } else if (failed.length < ids.length) {
      toast.warning(
        `${ids.length - failed.length} restored, ${failed.length} failed`,
      );
    } else {
      toast.error("Failed to restore ideas");
    }
  };

  const allSelected =
    restorableIds.length > 0 && prunedSelected.size === restorableIds.length;
  const someSelected = prunedSelected.size > 0 && !allSelected;

  return (
    <div className="p-inset-2xl space-y-section container">
      <PageHeader
        pageTitle="Archived Ideas"
        pageDescription="Ideas that have been archived. Restore them to make them active again."
        actions={
          <div className="flex items-center gap-stack">
            {refreshing && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            <Button variant="ghost" asChild>
              <Link to="/ideas">
                <ArchiveX className="h-4 w-4 mr-2" />
                Active Ideas
              </Link>
            </Button>
          </div>
        }
      />

      {/* Persistent archived context — always visible */}
      <ArchivedIdeaBanner />

      {/* Fetch error */}
      {fetchError && !loading && (
        <FetchErrorBanner message={fetchError} onRetry={load} />
      )}

      {/* Select-all + bulk restore toolbar */}
      {!loading && !fetchError && restorableIds.length > 0 && (
        <div className="flex items-center gap-3 py-2 border-b border-dashed border-border-warning/50">
          <Checkbox
            id="select-all"
            // indeterminate when some-but-not-all are selected
            checked={
              allSelected ? true : someSelected ? "indeterminate" : false
            }
            onCheckedChange={toggleSelectAll}
            aria-label={allSelected ? "Deselect all" : "Select all"}
          />
          <label
            htmlFor="select-all"
            className="caption text-muted-foreground cursor-pointer select-none"
          >
            {allSelected
              ? `All ${restorableIds.length} selected`
              : someSelected
                ? `${prunedSelected.size} of ${restorableIds.length} selected`
                : `Select all (${restorableIds.length})`}
          </label>

          {(someSelected || allSelected) && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRestore([...prunedSelected])}
              disabled={restoring}
              className="ml-auto border-warning/50 text-warning hover:bg-warning-background"
            >
              {restoring ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Restoring…
                </>
              ) : (
                <>
                  <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" />
                  Restore {prunedSelected.size} selected
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-stack">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <ArchivedCardSkeleton key={i} />
          ))
        ) : ideas.length === 0 && !fetchError ? (
          <EmptyState
            icon={<ArchiveX className="h-12 w-12" />}
            title="No archived ideas"
            description="Ideas you archive will appear here and can be restored at any time."
          />
        ) : (
          <div
            className="flex flex-col gap-stack transition-opacity duration-200"
            style={{ opacity: refreshing ? 0.5 : 1 }}
          >
            {ideas.map((idea) => (
              <ArchivedIdeaCard
                key={idea.ideaId}
                idea={idea}
                isSelected={prunedSelected.has(idea.ideaId)}
                onToggle={toggleSelect}
                canRestore={canRestoreIdea(idea.ownerId === user?.uid)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
