import { useReducer, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArchiveRestore,
  Archive,
  ArrowLeft,
  Edit3,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IdeaDetailSkeleton } from "@/components/states/skeletons/IdeaDetailSkeleton";
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
import { ArchivedIdeaBanner } from "@/components/productIdea/ArchivedIdeaBanner";
import { InlineAlert } from "@/components/common/InlineAlert";
import { ProgressBar } from "@/components/common/ProgressBar";
import {
  IdeaStatusDisplay,
  IdeaPriorityDisplay,
} from "@/components/productIdea/IdeaStatusDisplay";
import { IdeaNotesSection } from "@/pages/ideas/IdeaNotesSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { FormTagInput } from "@/components/form/FormTagInput";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToIdeaById,
  updateProductIdea,
  archiveProductIdea,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import {
  updateProductIdeaSchema,
  type UpdateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
} from "@/lib/zodSchemas/productIdea";
import type { ProductIdea } from "@/lib/types/productIdeas";
import {
  canEditProductIdea,
  canDeleteProductIdea as canArchiveOrRestoreIdea,
} from "@/lib/permissions/productIdeas";
import { useLiveStatus } from "@/contexts/LiveStatusContext";
import { ErrorState } from "@/components/states/ErrorState";

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function IdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const { registerListener, reportError } = useLiveStatus();

  const [ideaState, ideaDispatch] = useReducer(ideaReducer, ideaInitialState);
  const { idea, loading, refreshing, error } = ideaState;

  const ideaLoadedOnce = useRef(false);
  const isEditModeRef = useRef(false);
  const wasArchivedRef = useRef<boolean | null>(null);
  const isNavigatingRef = useRef(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [cancelEditDialogOpen, setCancelEditDialogOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [restoring, setRestoring] = useState(false);

  // Keep ref in sync for use inside subscription closure
  useEffect(() => {
    isEditModeRef.current = isEditMode;
  }, [isEditMode]);

  const isArchived = !!idea?.archivedAt;
  const isOwner = user?.uid === idea?.ownerId;
  const userRole = userProfile?.role;
  const canEdit = canEditProductIdea(userRole, isOwner) && !isArchived;
  const canArchive = canArchiveOrRestoreIdea(isOwner) && !isArchived;
  const canRestore = canArchiveOrRestoreIdea(isOwner) && isArchived;

  // ─── Edit form ─────────────────────────────────────────────────────────────

  const {
    control: editControl,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: {
      errors: editErrors,
      isSubmitting: isSubmittingEdit,
      isDirty: isEditDirty,
    },
    setError: setEditError,
  } = useForm<UpdateProductIdeaInput>({
    resolver: zodResolver(updateProductIdeaSchema),
    mode: "onBlur",
  });

  // ─── Idea subscription ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    const unregister = registerListener();
    ideaLoadedOnce.current = false;
    wasArchivedRef.current = null;
    ideaDispatch({ type: "LOAD_START" });

    const unsubscribe = subscribeToIdeaById(
      ideaId,
      async (nextIdea) => {
        if (!nextIdea) {
          ideaDispatch({ type: "NOT_FOUND" });
          return;
        }

        const isFirst = !ideaLoadedOnce.current;
        const isNowArchived = !!nextIdea.archivedAt;

        if (isFirst) {
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          ideaLoadedOnce.current = true;
          wasArchivedRef.current = isNowArchived;
          ideaDispatch({ type: "LOAD_SUCCESS", idea: nextIdea });
        } else {
          const wasArchived = wasArchivedRef.current;

          // Always update the ref before any early return
          wasArchivedRef.current = isNowArchived;

          // Detect archive state transition
          if (wasArchived !== null && wasArchived !== isNowArchived) {
            // Only redirect if this change came from another session,
            // not from an action the user took in this window
            if (!isNavigatingRef.current) {
              if (isNowArchived) {
                navigate(`/ideas/archived/${ideaId}`, { replace: true });
              } else {
                navigate(`/ideas/${ideaId}`, { replace: true });
              }
            }
            return;
          }

          ideaDispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          ideaDispatch({ type: "REFRESH_SUCCESS", idea: nextIdea });
        }

        // Resync edit form base state unless user is mid-edit
        if (!isEditModeRef.current) {
          resetEdit({
            title: nextIdea.title,
            summary: nextIdea.summary,
            status: nextIdea.status,
            tags: nextIdea.tags ?? [],
            priority: nextIdea.priority,
          });
        }
      },
      (err) => {
        console.error("Idea subscription error:", err);
        ideaDispatch({ type: "ERROR", message: "Failed to load idea." });
        reportError();
      },
    );

    return () => {
      isNavigatingRef.current = false;
      unsubscribe();
      unregister();
    };
  }, [ideaId, navigate, resetEdit, registerListener, reportError]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleEnterEditMode = () => setIsEditMode(true);

  const handleCancelEdit = () => {
    if (isEditDirty) {
      setCancelEditDialogOpen(true);
    } else {
      setIsEditMode(false);
      resetEdit();
    }
  };

  const handleConfirmCancelEdit = () => {
    setIsEditMode(false);
    resetEdit();
    setCancelEditDialogOpen(false);
  };

  const onSubmitEdit: SubmitHandler<UpdateProductIdeaInput> = async (data) => {
    if (!ideaId) return;
    try {
      await updateProductIdea(ideaId, data);
      toast.success("Idea updated");
      setIsEditMode(false);
    } catch (err) {
      console.log(data);
      setEditError("root", {
        type: "server",
        message:
          err instanceof Error
            ? err.message
            : "Failed to update idea. Please try again.",
      });
      toast.error("Failed to update idea");
    }
  };

  const handleArchive = async () => {
    if (!ideaId) return;
    setArchiving(true);
    try {
      await archiveProductIdea(ideaId);
      toast.success("Idea archived");
      // Flag before navigating so the subscription's transition
      // detection doesn't race with our intentional navigation
      isNavigatingRef.current = true;
      navigate("/ideas");
    } catch (err) {
      console.error("Error archiving idea:", err);
      toast.error("Failed to archive idea");
      setArchiving(false);
      setArchiveDialogOpen(false);
    }
  };

  const handleRestore = async () => {
    if (!ideaId) return;
    setRestoring(true);
    try {
      await unarchiveProductIdea(ideaId);
      toast.success("Idea restored");
      // Flag so the subscription redirect takes over cleanly
      // rather than racing with any navigation we might add here
      isNavigatingRef.current = true;
      // No explicit navigate — subscription detects archivedAt: null
      // and redirects to /ideas/:ideaId
    } catch (err) {
      console.error("Error restoring idea:", err);
      toast.error("Failed to restore idea");
      setRestoring(false);
      setRestoreDialogOpen(false);
    }
  };

  // ─── Loading / error states ────────────────────────────────────────────────

  if (loading) return <IdeaDetailSkeleton />;

  if (error || !idea) {
    return (
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle="Product Idea"
          actions={
            <Button
              variant="ghost"
              onClick={() =>
                navigate(isArchived ? "/ideas/archived" : "/ideas")
              }
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />
        <ErrorState
          message={error || "Idea not found."}
          onRetry={error ? () => window.location.reload() : undefined}
        />
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle={idea.title}
          actions={
            <Button
              variant="ghost"
              onClick={() =>
                navigate(isArchived ? "/ideas/archived" : "/ideas")
              }
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isArchived ? "Back to Archive" : "Back to Ideas"}
            </Button>
          }
        />

        {isArchived && (
          <ArchivedIdeaBanner
            message={
              idea.archivedAt
                ? `This idea was archived on ${format(idea.archivedAt.toDate(), "MMMM d, yyyy")}. It is read-only until restored.`
                : "This idea is archived and read-only until restored."
            }
          />
        )}

        <div
          className={
            isArchived
              ? "flex items-start gap-x-6 opacity-70"
              : "flex items-start gap-x-6"
          }
        >
          <IdeaStatusDisplay status={idea.status} />
          {idea.priority && <IdeaPriorityDisplay priority={idea.priority} />}
        </div>

        <Card
          className={
            isArchived
              ? "overflow-hidden border-border-neutral bg-neutral-background"
              : "overflow-hidden"
          }
        >
          <CardContent className="space-y-section p-inset-xl">
            {isEditMode ? (
              <form
                onSubmit={handleSubmitEdit(onSubmitEdit)}
                className="space-y-section"
              >
                {editErrors.root?.message && (
                  <InlineAlert variant="warning" dismissible>
                    {editErrors.root.message}
                  </InlineAlert>
                )}

                <FormInput
                  control={editControl}
                  name="title"
                  label="Title"
                  required
                  error={editErrors.title}
                  maxLength={100}
                  showCharCount
                />

                <FormTextarea
                  control={editControl}
                  name="summary"
                  label="Summary"
                  required
                  error={editErrors.summary}
                  maxLength={1000}
                  rows={5}
                />

                <ResponsiveGrid maxColumns="two" className="gap-stack">
                  <FormSelect
                    control={editControl}
                    name="status"
                    label="Status"
                    required
                    error={editErrors.status}
                    options={IDEA_STATUSES.map((s) => ({
                      value: s.value,
                      label: s.label,
                      description: s.description,
                    }))}
                  />
                  <FormSelect
                    control={editControl}
                    name="priority"
                    label="Priority"
                    error={editErrors.priority}
                    options={IDEA_PRIORITIES.map((p) => ({
                      value: p.value,
                      label: p.label,
                      description: p.description,
                    }))}
                  />
                </ResponsiveGrid>

                <FormTagInput
                  control={editControl}
                  name="tags"
                  label="Tags"
                  error={editErrors.tags}
                  maxTags={10}
                  maxLength={30}
                  placeholder="design, feature, bug-fix"
                  helpText="Separate tags with commas"
                />

                <div className="caption text-muted-foreground space-y-inline py-section">
                  {idea.createdAt && (
                    <div>
                      Created{" "}
                      {format(
                        idea.createdAt.toDate(),
                        "MMM d, yyyy 'at' h:mm a",
                      )}
                    </div>
                  )}
                  {idea.updatedAt && (
                    <div>
                      Updated{" "}
                      {format(
                        idea.updatedAt.toDate(),
                        "MMM d, yyyy 'at' h:mm a",
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-stack pt-stack border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isSubmittingEdit}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingEdit || !isEditDirty}
                    className="ml-auto"
                  >
                    {isSubmittingEdit ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <p className="body-1 text-foreground wrap-break-word leading-relaxed">
                  {idea.summary}
                </p>

                <div
                  className={`flex flex-wrap items-end justify-between gap-stack pt-stack border-t ${isArchived ? "border-dashed border-border-neutral" : "border-dashed"}`}
                >
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
                        onClick={handleEnterEditMode}
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
                        onClick={() => setArchiveDialogOpen(true)}
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
                        onClick={() => setRestoreDialogOpen(true)}
                      >
                        <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" />
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <ProgressBar active={refreshing} />
        </Card>

        <Separator />

        <IdeaNotesSection ideaId={ideaId} hideForm={isArchived || isEditMode} />
      </div>

      {/* Cancel edit dialog */}
      <AlertDialog
        open={cancelEditDialogOpen}
        onOpenChange={setCancelEditDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Editing</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancelEdit}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive dialog */}
      {canArchive && (
        <AlertDialog
          open={archiveDialogOpen}
          onOpenChange={setArchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive this idea?</AlertDialogTitle>
              <AlertDialogDescription>
                "{idea.title}" will be archived and become read-only. You can
                restore it later from the archived ideas view.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={archiving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleArchive}
                disabled={archiving}
                className="bg-warning text-warning-foreground hover:bg-warning-hover border border-border-warning"
              >
                {archiving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Archiving…
                  </>
                ) : (
                  "Archive"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Restore dialog */}
      {canRestore && (
        <AlertDialog
          open={restoreDialogOpen}
          onOpenChange={setRestoreDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Restore this idea?</AlertDialogTitle>
              <AlertDialogDescription>
                "{idea.title}" will be moved back to your active ideas and
                become editable again.
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
      )}
    </>
  );
}
