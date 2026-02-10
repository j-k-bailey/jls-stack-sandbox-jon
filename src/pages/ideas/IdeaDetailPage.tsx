// @/pages/ideas/IdeaDetailPage.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageSquare,
  Archive,
  Send,
  ArrowLeft,
  Edit3,
  X,
  Save,
  Loader2,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProductIdea,
  getProductIdeaNotes,
  createProductIdeaNote,
  updateProductIdea,
  archiveProductIdea,
  updateProductIdeaNote,
  archiveProductIdeaNote,
} from "@/lib/firestore/productIdeas";
import {
  createNoteSchema,
  type CreateNoteInput,
  updateProductIdeaSchema,
  type UpdateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
} from "@/lib/zodSchemas/productIdea";
import type {
  CreateProductIdeaNoteInput,
  ProductIdea,
  ProductIdeaNote,
} from "@/lib/types/productIdeas";
import { format } from "date-fns";
import { NoteCard } from "@/components/productIdea/NoteCard";
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
  canCreateProductIdeaNote,
  canDeleteProductIdeaNote,
  canEditProductIdeaNote,
} from "@/lib/permissions/productIdeaNotes";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { FormTagInput } from "@/components/form/FormTagInput";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

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
      {/* Notes skeleton */}
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

  const [idea, setIdea] = useState<ProductIdea | null>(null);
  const [notes, setNotes] = useState<ProductIdeaNote[]>([]);

  // Idea loading
  const [ideaLoading, setIdeaLoading] = useState(true); // first load only
  const [ideaError, setIdeaError] = useState<string | null>(null);

  // Notes loading — no skeleton; use inline indicator + error instead
  const [notesRefreshing, setNotesRefreshing] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const hasLoadedNotesOnce = useRef(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [cancelEditDialogOpen, setCancelEditDialogOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const isOwner = user?.uid === idea?.ownerId;
  const userRole = userProfile?.role;

  const canEdit = canEditProductIdea(userRole, isOwner);
  const canArchive = canDeleteIdea(isOwner);
  const canAddNote = canCreateProductIdeaNote(userRole, user?.uid, user?.uid);

  // ─── Note form ─────────────────────────────────────────────────────────────

  const {
    control: noteControl,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    formState: {
      errors: noteErrors,
      isSubmitting: isSubmittingNote,
      isDirty: isNoteDirty,
    },
    setError: setNoteError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { body: "" },
  });

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

  // ─── Load idea ─────────────────────────────────────────────────────────────

  const loadIdea = useCallback(async () => {
    if (!ideaId) return;

    setIdeaError(null);
    try {
      const fetchedIdea = await getProductIdea(ideaId);
      if (!fetchedIdea) {
        setIdeaError("Idea not found.");
        return;
      }
      setIdea(fetchedIdea);
      resetEdit({
        title: fetchedIdea.title,
        summary: fetchedIdea.summary,
        status: fetchedIdea.status,
        tags: fetchedIdea.tags || [],
        priority: fetchedIdea.priority,
      });
    } catch (err) {
      console.error("Error loading idea:", err);
      setIdeaError(err instanceof Error ? err.message : "Failed to load idea.");
    } finally {
      setIdeaLoading(false);
    }
  }, [ideaId, resetEdit]);

  // ─── Load notes ────────────────────────────────────────────────────────────

  const loadNotes = useCallback(async () => {
    if (!ideaId) return;

    setNotesRefreshing(true);
    setNotesError(null);

    try {
      const fetchedNotes = await getProductIdeaNotes(ideaId);
      const sortedNotes = fetchedNotes.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setNotes(sortedNotes);
      hasLoadedNotesOnce.current = true;
    } catch (err) {
      console.error("Error loading notes:", err);
      setNotesError(
        err instanceof Error ? err.message : "Failed to load notes.",
      );
    } finally {
      setNotesRefreshing(false);
    }
  }, [ideaId]);

  useEffect(() => {
    loadIdea();
    loadNotes();
  }, [loadIdea, loadNotes]);

  // ─── Note handlers ─────────────────────────────────────────────────────────

  const onSubmitNote: SubmitHandler<CreateNoteInput> = async (data) => {
    if (!user || !canAddNote || !ideaId) {
      setNoteError("root", {
        type: "auth",
        message: "You must be signed in to add a note.",
      });
      return;
    }

    try {
      const authorDisplayName = userProfile
        ? `${userProfile.firstName}${userProfile.lastNameInitial ? ` ${userProfile.lastNameInitial}.` : ""}`
        : user.displayName || user.email?.split("@")[0] || "Anonymous";

      const noteInput: CreateProductIdeaNoteInput = {
        body: data.body,
        authorDisplayName,
        authorPhotoURL: user.photoURL ?? null,
      };

      await createProductIdeaNote(ideaId, noteInput, user.uid);
      resetNote();
      toast.success("Note added");
      await loadNotes();
    } catch (err) {
      setNoteError("root", {
        type: "server",
        message:
          err instanceof Error
            ? err.message
            : "Failed to add note. Please try again.",
      });
      toast.error("Failed to add note");
    }
  };

  const handleUpdateNote = async (noteId: string, body: string) => {
    if (!ideaId) return;
    try {
      await updateProductIdeaNote(ideaId, noteId, { body });
      toast.success("Note updated");
      await loadNotes();
    } catch (err) {
      console.error("Error updating note:", err);
      toast.error("Failed to update note");
      throw err;
    }
  };

  const handleArchiveNote = async (noteId: string) => {
    if (!ideaId) return;
    try {
      await archiveProductIdeaNote(ideaId, noteId);
      toast.success("Note removed");
      await loadNotes();
    } catch (err) {
      console.error("Error archiving note:", err);
      toast.error("Failed to remove note");
      throw err;
    }
  };

  // ─── Idea handlers ─────────────────────────────────────────────────────────

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
      await loadIdea();
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

  // ─── States ────────────────────────────────────────────────────────────────

  // First load skeleton
  if (ideaLoading) {
    return <IdeaDetailSkeleton />;
  }

  // Load error — idea not found or network failure
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
        <FetchErrorBanner
          message={ideaError || "Idea not found."}
          onRetry={loadIdea}
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
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />

        {/* Status + priority — headline-weight typographic display, not badges */}
        <div className="flex items-start gap-x-6">
          <IdeaStatusDisplay status={idea.status} />
          {idea.priority && <IdeaPriorityDisplay priority={idea.priority} />}
        </div>

        <Card>
          <CardContent className="space-y-section p-inset-xl">
            {isEditMode ? (
              /* ── EDIT MODE ── */
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
              /* ── VIEW MODE ── */
              <>
                {/* Summary — no label, it's the content */}
                <p className="body-1 text-foreground wrap-break-word leading-relaxed">
                  {idea.summary}
                </p>

                {/* Footer strip: tags left · meta + actions right */}
                <div className="flex flex-wrap items-end justify-between gap-stack pt-stack border-t border-dashed">
                  {/* Tags */}
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

                  {/* Meta + actions — right-aligned, grouped tightly */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-inline sm:gap-stack m-auto mt-section sm:mt-stack sm:ml-auto sm:mr-0">
                    {/* Date meta — single condensed line; updated takes priority */}
                    <p className="caption text-muted-foreground">
                      {idea.updatedAt
                        ? `Edited ${format(idea.updatedAt.toDate(), "MMM d, yyyy")}`
                        : idea.createdAt
                          ? `Created ${format(idea.createdAt.toDate(), "MMM d, yyyy")}`
                          : null}
                    </p>

                    {/* Action buttons — subtle until needed */}
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
        </Card>

        <Separator />

        {/* ── Notes Section ── */}
        <div className="space-y-stack">
          <div className="flex items-center gap-stack">
            <MessageSquare className="h-5 w-5" />
            <h2 className="headline-4">Notes ({notes.length})</h2>
            {/* Non-disruptive notes refresh indicator */}
            {notesRefreshing && (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground ml-auto" />
            )}
          </div>

          {/* Notes fetch error */}
          {notesError && (
            <FetchErrorBanner message={notesError} onRetry={loadNotes} />
          )}

          {/* Add note form */}
          {canAddNote && !isEditMode && (
            <Card>
              <CardContent className="p-inset-xl">
                <form
                  onSubmit={handleSubmitNote(onSubmitNote)}
                  className="space-y-stack"
                >
                  {noteErrors.root?.message && (
                    <InlineAlert variant="warning" dismissible>
                      {noteErrors.root.message}
                    </InlineAlert>
                  )}

                  <FormTextarea
                    control={noteControl}
                    name="body"
                    label="Add a note"
                    placeholder="Add a note..."
                    error={noteErrors.body}
                    maxLength={2000}
                    rows={3}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="filled"
                      semantic="primary"
                      size="sm"
                      aria-label="Submit note"
                      disabled={isSubmittingNote || !isNoteDirty}
                    >
                      {isSubmittingNote ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Adding…
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Add Note
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notes list */}
          <div className="space-y-stack">
            {!notesError && notes.length === 0 ? (
              <Card>
                <CardContent className="p-inset-xl">
                  <p className="body-2 text-center text-muted-foreground py-inset-lg">
                    No notes yet.{canAddNote && " Add the first one above."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note.noteId}
                  note={note}
                  canEdit={canEditProductIdeaNote(
                    user?.uid === note.authorId,
                    userRole,
                  )}
                  canArchive={canDeleteProductIdeaNote(
                    user?.uid === note.authorId,
                  )}
                  onUpdate={handleUpdateNote}
                  onArchive={handleArchiveNote}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Cancel edit confirmation ── */}
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

      {/* ── Archive confirmation ── */}
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
