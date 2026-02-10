// @/pages/ideas/ArchivedIdeaDetailPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArchiveRestore,
  ArrowLeft,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FetchErrorBanner } from "@/components/common/FetchErrorBanner";
import { ArchivedIdeaBanner } from "@/components/productIdea/ArchivedIdeaBanner";
import {
  IdeaStatusDisplay,
  IdeaPriorityDisplay,
} from "@/components/productIdea/IdeaStatusDisplay";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProductIdea,
  getProductIdeaNotes,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import { canDeleteProductIdea as canRestoreIdea } from "@/lib/permissions/productIdeas";
import type { ProductIdea, ProductIdeaNote } from "@/lib/types/productIdeas";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ArchivedDetailSkeleton() {
  return (
    <div className="p-inset-2xl space-y-section container max-w-4xl">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-8 w-20" />
      <Card>
        <CardContent className="space-y-stack p-inset-xl">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Read-only note ───────────────────────────────────────────────────────────

function ReadOnlyNote({ note }: { note: ProductIdeaNote }) {
  return (
    <Card className="border-border/50 bg-warning-background/10">
      <CardContent className="p-inset-xl space-y-2">
        <div className="flex items-center gap-2">
          <span className="subtitle-2 font-medium text-foreground/70">
            {note.authorDisplayName ?? "Anonymous"}
          </span>
          {note.createdAt && (
            <span className="caption text-muted-foreground/60">
              {format(note.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
            </span>
          )}
        </div>
        <p className="body-2 text-foreground/60 whitespace-pre-wrap">
          {note.body}
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ArchivedIdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [idea, setIdea] = useState<ProductIdea | null>(null);
  const [notes, setNotes] = useState<ProductIdeaNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [ideaError, setIdeaError] = useState<string | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const isOwner = user?.uid === idea?.ownerId;
  const canRestore = canRestoreIdea(isOwner);

  const loadIdea = useCallback(async () => {
    if (!ideaId) return;
    setIdeaError(null);
    try {
      const fetched = await getProductIdea(ideaId);
      if (!fetched) {
        setIdeaError("Idea not found.");
        return;
      }
      // Guard: redirect to active page if somehow not archived
      if (!fetched.archivedAt) {
        navigate(`/ideas/${ideaId}`, { replace: true });
        return;
      }
      setIdea(fetched);
    } catch (err) {
      setIdeaError(err instanceof Error ? err.message : "Failed to load idea.");
    } finally {
      setLoading(false);
    }
  }, [ideaId, navigate]);

  const loadNotes = useCallback(async () => {
    if (!ideaId) return;
    setNotesError(null);
    try {
      const fetched = await getProductIdeaNotes(ideaId, true); // include archived notes
      const sorted = [...fetched].sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setNotes(sorted);
    } catch (err) {
      setNotesError(
        err instanceof Error ? err.message : "Failed to load notes.",
      );
    }
  }, [ideaId]);

  useEffect(() => {
    loadIdea();
    loadNotes();
  }, [loadIdea, loadNotes]);

  const handleRestore = async () => {
    if (!ideaId) return;
    setRestoring(true);
    try {
      await unarchiveProductIdea(ideaId);
      toast.success("Idea restored");
      navigate(`/ideas/${ideaId}`, { replace: true });
    } catch (err) {
      console.error("Error restoring idea:", err);
      toast.error("Failed to restore idea");
    } finally {
      setRestoring(false);
      setRestoreDialogOpen(false);
    }
  };

  // ─── States ──────────────────────────────────────────────────────────────

  if (loading) return <ArchivedDetailSkeleton />;

  if (ideaError || !idea) {
    return (
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle="Archived Idea"
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas/archived")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Archive
            </Button>
          }
        />
        <FetchErrorBanner
          message={ideaError || "Idea not found."}
          onRetry={loadIdea}
        />
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle={idea.title}
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas/archived")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Archive
            </Button>
          }
        />

        {/* Archived context — always visible, above everything */}
        <ArchivedIdeaBanner
          message={
            idea.archivedAt
              ? `This idea was archived on ${format(idea.archivedAt.toDate(), "MMMM d, yyyy")}. It is read-only until restored.`
              : "This idea is archived and read-only until restored."
          }
        />

        {/* Status + priority display */}
        <div className="flex items-start gap-x-6 opacity-70">
          <IdeaStatusDisplay status={idea.status} />
          {idea.priority && <IdeaPriorityDisplay priority={idea.priority} />}
        </div>

        {/* Main content card — read-only */}
        <Card className="border-border-warning/30 bg-warning-background/10">
          <CardContent className="p-inset-xl space-y-section">
            {/* Summary */}
            <p className="body-1 text-foreground/70 wrap-break-word leading-relaxed">
              {idea.summary}
            </p>

            {/* Footer strip */}
            <div className="flex flex-wrap items-start sm:items-end justify-between gap-stack pt-stack border-t border-dashed border-border-warning/40">
              {/* Tags */}
              {idea.tags && idea.tags.length > 0 ? (
                <div className="flex flex-wrap gap-inline">
                  {idea.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="neutral-outline"
                      className="text-xs opacity-60"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span />
              )}

              {/* Meta + restore */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-inline sm:gap-stack sm:ml-auto">
                <p className="caption text-muted-foreground/60">
                  {idea.updatedAt
                    ? `Last edited ${format(idea.updatedAt.toDate(), "MMM d, yyyy")}`
                    : idea.createdAt
                      ? `Created ${format(idea.createdAt.toDate(), "MMM d, yyyy")}`
                      : null}
                </p>

                {canRestore && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRestoreDialogOpen(true)}
                    className="border-warning/50 text-warning hover:bg-warning-background hover:text-warning"
                  >
                    <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" />
                    Restore
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Notes — read-only */}
        <div className="space-y-stack">
          <div className="flex items-center gap-stack">
            <MessageSquare className="h-5 w-5 text-muted-foreground/60" />
            <h2 className="headline-4 text-foreground/70">
              Notes ({notes.length})
            </h2>
          </div>

          {notesError && (
            <FetchErrorBanner message={notesError} onRetry={loadNotes} />
          )}

          {!notesError && notes.length === 0 ? (
            <Card className="border-border/40 bg-warning-background/10">
              <CardContent className="p-inset-xl">
                <p className="body-2 text-center text-muted-foreground/60 py-inset-lg">
                  No notes were added to this idea.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-stack">
              {notes.map((note) => (
                <ReadOnlyNote key={note.noteId} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Restore confirmation */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore this idea?</AlertDialogTitle>
            <AlertDialogDescription>
              "{idea.title}" will be moved back to your active ideas and become
              editable again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={restoring}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore} disabled={restoring}>
              {restoring ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Restoring…
                </>
              ) : (
                "Restore"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
