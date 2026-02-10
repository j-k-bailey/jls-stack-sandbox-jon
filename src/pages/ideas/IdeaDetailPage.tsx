import { useReducer, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Archive, ArrowLeft, Edit3, X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  IdeaStatusDisplay,
  IdeaPriorityDisplay,
} from "@/components/productIdea/IdeaStatusDisplay";
import { InlineAlert } from "@/components/common/InlineAlert";
import { FetchErrorBanner } from "@/components/common/FetchErrorBanner";
import { ProgressBar } from "@/components/common/ProgressBar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToIdeaById,
  updateProductIdea,
  archiveProductIdea,
} from "@/lib/firestore/productIdeas";
import {
  updateProductIdeaSchema,
  type UpdateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
} from "@/lib/zodSchemas/productIdea";
import type { ProductIdea } from "@/lib/types/productIdeas";
import { format } from "date-fns";
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
import {
  canEditProductIdea,
  canDeleteProductIdea as canDeleteIdea,
} from "@/lib/permissions/productIdeas";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { FormTagInput } from "@/components/form/FormTagInput";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { IdeaNotesSection } from "@/pages/ideas/IdeaNotesSection";

// ─── Reducers ─────────────────────────────────────────────────────────────────

type IdeaState = {
  idea: ProductIdea | null;
  loading: boolean; // first load → skeleton
  refreshing: boolean; // live update pulse → progress bar
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

// ─── Detail page skeleton ─────────────────────────────────────────────────────

function IdeaDetailSkeleton() {
  return (
    <div className="p-inset-2xl space-y-section container max-w-4xl">
      <div className="flex items-center gap-stack">
        <Skeleton className="h-10 w-32" />
      </div>
      <Card>
        <CardContent className="space-y-stack p-inset-xl">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
      <div className="space-y-stack">
        <Skeleton className="h-6 w-32" />
        <Card>
          <CardContent className="p-inset-xl space-y-stack">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function IdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const [ideaState, ideaDispatch] = useReducer(ideaReducer, ideaInitialState);
  const {
    idea,
    loading: ideaLoading,
    refreshing: ideaRefreshing,
    error: ideaError,
  } = ideaState;

  const ideaLoadedOnce = useRef(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [cancelEditDialogOpen, setCancelEditDialogOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);

  // Ref so the subscription callback can read current edit mode
  // without it being a dependency of the subscription effect
  const isEditModeRef = useRef(false);
  useEffect(() => {
    isEditModeRef.current = isEditMode;
  }, [isEditMode]);

  const isOwner = user?.uid === idea?.ownerId;
  const userRole = userProfile?.role;

  const canEdit = canEditProductIdea(userRole, isOwner);
  const canArchive = canDeleteIdea(isOwner);

  // ─── Edit form ──────────────────────────────────────────────────────────────

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

  // ─── Idea subscription ──────────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    ideaDispatch({ type: "LOAD_START" });

    const unsubscribe = subscribeToIdeaById(
      ideaId,
      async (nextIdea) => {
        if (!nextIdea) {
          ideaDispatch({ type: "NOT_FOUND" });
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
          await new Promise<void>((resolve) => setTimeout(resolve, 400));
          ideaDispatch({ type: "REFRESH_SUCCESS", idea: nextIdea });
        }

        // Always resync form base state unless user is mid-edit,
        // which would clobber their in-progress changes
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
        ideaDispatch({
          type: "ERROR",
          message: "Failed to load idea in real time.",
        });
      },
    );

    return () => unsubscribe();
  }, [ideaId, resetEdit]);

  // ─── Idea handlers ──────────────────────────────────────────────────────────

  const handleArchiveIdea = async () => {
    if (!ideaId) return;
    setArchiving(true);
    try {
      await archiveProductIdea(ideaId);
      toast.success("Idea archived");
      navigate("/ideas");
    } catch (err) {
      console.error("Error archiving idea:", err);
      toast.error("Failed to archive idea");
    } finally {
      setArchiving(false);
    }
  };

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
      // No manual reload — subscription fires automatically
    } catch (err) {
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

  // ─── States ─────────────────────────────────────────────────────────────────

  if (ideaLoading) {
    return <IdeaDetailSkeleton />;
  }

  if (ideaError || !idea) {
    return (
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle="Product Idea"
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />
        <FetchErrorBanner message={ideaError || "Idea not found."} />
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle={idea.title}
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />

        <div className="flex items-start gap-x-6">
          <IdeaStatusDisplay status={idea.status} />
          {idea.priority && <IdeaPriorityDisplay priority={idea.priority} />}
        </div>

        {/* Idea card — progress bar pulses on live updates */}
        <Card className="overflow-hidden">
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
                    aria-label="Cancel Product Idea Edit"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingEdit || !isEditDirty}
                    className="ml-auto"
                    aria-label="Submit Product Idea Edit"
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

                <div className="flex flex-wrap items-end justify-between gap-stack pt-stack border-t border-dashed">
                  {idea.tags && idea.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-inline">
                      {idea.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="neutral-outline"
                          className="text-xs"
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
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <ProgressBar active={ideaRefreshing} />
        </Card>

        <Separator />

        {/* ── Notes Section ── */}
        <IdeaNotesSection ideaId={ideaId} hideForm={isEditMode} />
      </div>

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

      {canArchive && (
        <AlertDialog
          open={archiveDialogOpen}
          onOpenChange={setArchiveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive Product Idea?</AlertDialogTitle>
              <AlertDialogDescription>
                This will archive "{idea.title}" and all associated notes. You
                can restore it later from the archived ideas view.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={archiving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleArchiveIdea}
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
    </>
  );
}

const MIN_SKELETON_MS = 300;
