import { Archive, ArchiveRestore, Edit3 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import type { ProductIdea } from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export interface IdeaViewModeProps {
  idea: ProductIdea;
  isArchived: boolean;
  canEdit: boolean;
  canArchive: boolean;
  canRestore: boolean;
  onEdit: () => void;
  onArchive: () => void;
  onRestore: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function IdeaViewMode({
  idea,
  isArchived,
  canEdit,
  canArchive,
  canRestore,
  onEdit,
  onArchive,
  onRestore,
}: IdeaViewModeProps) {
  return (
    <>
      <p className="body-1 text-foreground wrap-break-word leading-relaxed">
        {idea.summary}
      </p>

      <div
        className={`flex flex-wrap items-end justify-between gap-stack pt-stack border-t ${
          isArchived ? "border-dashed border-border-neutral" : "border-dashed"
        }`}
      >
        {/* Tags */}
        {idea.tags && idea.tags.length > 0 ? (
          <div className="flex flex-wrap gap-inline">
            {idea.tags.map((tag) => (
              <Badge
                key={tag}
                variant="neutral-outline"
                className={`text-xs ${isArchived ? "opacity-60" : ""}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : (
          <span />
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-inline sm:gap-stack m-auto mt-section sm:mt-stack sm:ml-auto sm:mr-0">
          <p className="caption text-muted-foreground">
            {idea.updatedAt
              ? `Edited ${format(idea.updatedAt.toDate(), "MMM d, yyyy")}`
              : idea.createdAt
                ? `Created ${format(idea.createdAt.toDate(), "MMM d, yyyy")}`
                : null}
          </p>

          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit3 className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Button>
          )}

          {canArchive && (
            <Button
              variant="ghost"
              size="sm"
              semantic="warning"
              onClick={onArchive}
              className="text-muted-foreground hover:text-warning-foreground"
            >
              <Archive className="h-3.5 w-3.5 mr-1.5" />
              Archive
            </Button>
          )}

          {canRestore && (
            <Button
              variant="outline"
              semantic="neutral"
              size="sm"
              onClick={onRestore}
            >
              <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" />
              Restore
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
