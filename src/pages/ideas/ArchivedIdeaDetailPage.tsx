// @/pages/ideas/ArchivedIdeaDetailPage.tsx
import { useReducer, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArchiveRestore, ArrowLeft, Loader2 } from "lucide-react";
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
import { ProgressBar } from "@/components/common/ProgressBar";
import {
  IdeaStatusDisplay,
  IdeaPriorityDisplay,
} from "@/components/productIdea/IdeaStatusDisplay";
import { IdeaNotesSection } from "@/pages/ideas/IdeaNotesSection";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToIdeaById,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import { canDeleteProductIdea as canRestoreIdea } from "@/lib/permissions/productIdeas";
import type { ProductIdea } from "@/lib/types/productIdeas";

const MIN_SKELETON_MS = 300;

// ─── Reducer ──────────────────────────────────────────────────────────────────

type IdeaState = {
  idea: ProductIdea | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
};

type IdeaAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; idea: ProductIdea }
  | { type: "NOT_FOUND" }
  | { type: "REFRESH_START" }
  | { type: "REFRESH_SUCCESS"; idea: ProductIdea }
  | { type: "ERROR"; message: string };

const ideaInitialState: IdeaState = {
  idea: null,
  loading: true,
  refreshing: false,
  error: null,
};

function ideaReducer(state: IdeaState, action: IdeaAction): IdeaState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, refreshing: false, error: null };
    case "LOAD_SUCCESS":
      return {
        idea: action.idea,
        loading: false,
        refreshing: false,
        error: null,
      };
    case "NOT_FOUND":
      return { ...state, loading: false, error: "Idea not found." };
    case "REFRESH_START":
      return { ...state, refreshing: true };
    case "REFRESH_SUCCESS":
      return { ...state, idea: action.idea, refreshing: false, error: null };
    case "ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.message,
      };
  }
}

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ArchivedIdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ideaState, ideaDispatch] = useReducer(ideaReducer, ideaInitialState);
  const { idea, loading, refreshing, error } = ideaState;
  const ideaLoadedOnce = useRef(false);

  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const isOwner = user?.uid === idea?.ownerId;
  const canRestore = canRestoreIdea(isOwner);

  // ─── Idea subscription ────────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    ideaLoadedOnce.current = false;
    ideaDispatch({ type: "LOAD_START" });

    const unsubscribe = subscribeToIdeaById(
      ideaId,
      async (nextIdea) => {
        if (!nextIdea) {
          ideaDispatch({ type: "NOT_FOUND" });
          return;
        }

        // If idea has been restored, redirect to active detail page
        if (!nextIdea.archivedAt) {
          navigate(`/ideas/${ideaId}`, { replace: true });
          return;
        }

        const isFirst = !ideaLoadedOnce.current;

        if (isFirst) {
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          ideaLoadedOnce.current = true;
          ideaDispatch({ type: "LOAD_SUCCESS", idea: nextIdea });
        } else {
          ideaDispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          ideaDispatch({ type: "REFRESH_SUCCESS", idea: nextIdea });
        }
      },
      (err) => {
        console.error("Archived idea subscription error:", err);
        ideaDispatch({ type: "ERROR", message: "Failed to load idea." });
      },
    );

    return () => unsubscribe();
  }, [ideaId, navigate]);

  // ─── Restore handler ──────────────────────────────────────────────────────

  const handleRestore = async () => {
    if (!ideaId) return;
    setRestoring(true);
    try {
      await unarchiveProductIdea(ideaId);
      toast.success("Idea restored");
      // Subscription will detect archivedAt becoming null and redirect
    } catch (err) {
      console.error("Error restoring idea:", err);
      toast.error("Failed to restore idea");
      setRestoring(false);
      setRestoreDialogOpen(false);
    }
  };

  // ─── States ───────────────────────────────────────────────────────────────

  if (loading) return <ArchivedDetailSkeleton />;

  if (error || !idea) {
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
        <FetchErrorBanner message={error || "Idea not found."} />
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

        <ArchivedIdeaBanner
          message={
            idea.archivedAt
              ? `This idea was archived on ${format(idea.archivedAt.toDate(), "MMMM d, yyyy")}. It is read-only until restored.`
              : "This idea is archived and read-only until restored."
          }
        />

        <div className="flex items-start gap-x-6 opacity-70">
          <IdeaStatusDisplay status={idea.status} />
          {idea.priority && <IdeaPriorityDisplay priority={idea.priority} />}
        </div>

        <Card className="overflow-hidden border-border-neutral bg-neutral-background">
          <CardContent className="p-inset-xl space-y-section">
            <p className="body-1 text-foreground wrap-break-word leading-relaxed">
              {idea.summary}
            </p>

            <div className="flex flex-wrap items-start sm:items-end justify-between gap-stack pt-stack border-t border-dashed border-border-neutral">
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

              <div className="flex flex-col sm:flex-row sm:items-center gap-inline sm:gap-stack sm:ml-auto">
                <p className="caption text-muted-foreground">
                  {idea.updatedAt
                    ? `Last edited ${format(idea.updatedAt.toDate(), "MMM d, yyyy")}`
                    : idea.createdAt
                      ? `Created ${format(idea.createdAt.toDate(), "MMM d, yyyy")}`
                      : null}
                </p>

                {canRestore && (
                  <Button
                    variant="outline"
                    semantic="neutral"
                    size="sm"
                    onClick={() => setRestoreDialogOpen(true)}
                  >
                    <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" />
                    Restore
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <ProgressBar active={refreshing} />
        </Card>

        <Separator />

        <IdeaNotesSection ideaId={ideaId} hideForm archived />
      </div>

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
