import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressBar } from "@/components/common/ProgressBar";
import { NoteCard } from "@/features/ideas/components/NoteCard";
import type { ProductIdeaNote } from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export interface NotesListProps {
  notes: ProductIdeaNote[];
  loading: boolean;
  refreshing: boolean;
  showForm: boolean;
  userId: string | undefined;
  userRole: string | undefined;
  isParentArchived: boolean;
  onUpdate: (noteId: string, body: string) => Promise<void>;
  onArchive: (noteId: string) => Promise<void>;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotesList({
  notes,
  loading,
  refreshing,
  showForm,
  userId,
  isParentArchived,
  onUpdate,
  onArchive,
}: NotesListProps) {
  return (
    <div>
      {loading ? (
        <div className="p-inset-xl space-y-stack">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      ) : notes.length === 0 ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <p className="body-2 text-center text-muted-foreground p-inset-xl py-inset-lg">
              No notes yet.
              {showForm
                ? " Add the first one above."
                : " Notes will appear as users with permission to add them write notes."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="divide-y space-y-stack">
          {notes.map((note) => {
            const isAuthor = userId === note.authorId;

            // Cannot edit or archive if parent is archived
            const canEdit = !isParentArchived && isAuthor;
            const canArchive = !isParentArchived && isAuthor;

            return (
              <NoteCard
                key={note.noteId}
                note={note}
                canEdit={canEdit}
                canArchive={canArchive}
                onUpdate={onUpdate}
                onArchive={onArchive}
                isParentArchived={isParentArchived}
                //   className="bg-surface-2"
              />
            );
          })}
        </div>
      )}
      <ProgressBar active={refreshing} />
    </div>
  );
}
