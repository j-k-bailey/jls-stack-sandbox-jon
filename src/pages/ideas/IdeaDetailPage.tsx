// @/pages/ideas/IdeaDetailPage.tsx
import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InlineAlert } from "@/components/common/InlineAlert";
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
  IdeaStatusBadge,
  IdeaPriorityBadge,
} from "@/components/productIdea/IdeaBadges";
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

// TODO:No allowing "save" on summary or notes if the form isn't dirty

export function IdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const [idea, setIdea] = useState<ProductIdea | null>(null);
  const [notes, setNotes] = useState<ProductIdeaNote[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [cancelEditDialogOpen, setCancelEditDialogOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = user?.uid === idea?.ownerId;
  const userRole = userProfile?.role;

  // Permission checks
  const canEdit = canEditProductIdea(userRole, isOwner);
  const canArchive = canDeleteIdea(isOwner);
  const canAddNote = canCreateProductIdeaNote(userRole, user?.uid, user?.uid);

  // Note form
  const {
    control: noteControl,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    formState: { errors: noteErrors, isSubmitting: isSubmittingNote },
    setError: setNoteError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      body: "",
    },
  });

  // Edit form
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

  // Load idea
  const loadIdea = useCallback(async () => {
    if (!ideaId) return;

    setError(null);
    try {
      const fetchedIdea = await getProductIdea(ideaId);
      if (!fetchedIdea) {
        setError("Idea not found");
        toast.error("Idea not found");
        navigate("/ideas");
        return;
      }
      setIdea(fetchedIdea);
      // Reset edit form with idea data
      resetEdit({
        title: fetchedIdea.title,
        summary: fetchedIdea.summary,
        status: fetchedIdea.status,
        tags: fetchedIdea.tags || [],
        priority: fetchedIdea.priority,
      });
    } catch (error) {
      console.error("Error loading idea:", error);
      setError("Failed to load idea");
      toast.error("Failed to load idea");
      navigate("/ideas");
    }
  }, [ideaId, navigate, resetEdit]);

  // Load notes
  const loadNotes = useCallback(async () => {
    if (!ideaId) return;

    try {
      const fetchedNotes = await getProductIdeaNotes(ideaId);
      const sortedNotes = fetchedNotes.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
      toast.error("Failed to load notes");
    }
  }, [ideaId]);

  // Load on mount
  useEffect(() => {
    loadIdea();
    loadNotes();
  }, [loadIdea, loadNotes]);

  const onSubmitNote: SubmitHandler<CreateNoteInput> = async (data) => {
    if (!user || !canAddNote || !ideaId) {
      setNoteError("root", {
        type: "auth",
        message: "You must be signed in to add a note",
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
    } catch (error) {
      setNoteError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to add note. Please try again.",
      });
      toast.error("Failed to add note");
    }
  };

  const handleUpdateNote = async (noteId: string, body: string) => {
    if (!ideaId) return;
    try {
      await updateProductIdeaNote(ideaId, noteId, { body });
      await loadNotes();
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  };

  const handleArchiveNote = async (noteId: string) => {
    if (!ideaId) return;
    try {
      await archiveProductIdeaNote(ideaId, noteId);
      await loadNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
      throw error;
    }
  };

  const handleArchiveIdea = async () => {
    if (!ideaId) return;
    setArchiving(true);
    try {
      await archiveProductIdea(ideaId);
      toast.success("Idea archived");
      navigate("/ideas");
    } catch (error) {
      console.error("Error archiving idea:", error);
      toast.error("Failed to archive idea");
    } finally {
      setArchiving(false);
    }
  };

  const handleEnterEditMode = () => {
    setIsEditMode(true);
  };

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
    } catch (error) {
      setEditError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update idea. Please try again.",
      });
      toast.error("Failed to update idea");
    }
  };

  // Show loading skeleton only on initial page load
  if (!idea && !error) {
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
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="p-inset-2xl space-y-section container max-w-4xl">
        <PageHeader
          pageTitle="Error"
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />
        <InlineAlert variant="warning">{error || "Idea not found"}</InlineAlert>
      </div>
    );
  }

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

        <div className="flex items-center gap-x-inline">
          <IdeaStatusBadge status={idea.status} />
          {idea.priority && (
            <>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <IdeaPriorityBadge priority={idea.priority} />
            </>
          )}
        </div>

        <Card>
          <CardContent className="space-y-section p-inset-xl">
            {isEditMode ? (
              /* EDIT MODE - Inline Form */
              <form
                onSubmit={handleSubmitEdit(onSubmitEdit)}
                className="space-y-stack"
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

                {/* Metadata - Read Only in Edit Mode */}
                <div className="caption text-muted-foreground space-y-inline pt-stack border-t">
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

                {/* Edit Actions */}
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
                    disabled={isSubmittingEdit}
                    className="ml-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmittingEdit ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              /* VIEW MODE - Static Content */
              <>
                <div>
                  <h3 className="headline-5 mb-stack">Summary</h3>
                  <p className="body-1 text-muted-foreground wrap-break-word">
                    {idea.summary}
                  </p>
                </div>

                {idea.tags && idea.tags.length > 0 && (
                  <div>
                    <h3 className="headline-5 mb-stack">Tags</h3>
                    <div className="flex flex-wrap gap-inline">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="accent-subtle">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="caption text-muted-foreground space-y-inline">
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

                {/* View Actions */}
                {(canEdit || canArchive) && (
                  <div className="flex gap-stack pt-stack border-t">
                    {canEdit && (
                      <Button variant="outline" onClick={handleEnterEditMode}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    {canArchive && (
                      <Button
                        variant="outline"
                        semantic="warning"
                        onClick={() => setArchiveDialogOpen(true)}
                        className="ml-auto"
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Notes Section */}
        <div className="space-y-stack">
          <div className="flex items-center gap-stack">
            <MessageSquare className="h-5 w-5" />
            <h3 className="headline-5">Notes ({notes.length})</h3>
          </div>

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
                      disabled={isSubmittingNote}
                    >
                      <Send className="h-3 w-3" />
                      {isSubmittingNote ? "Adding..." : "Add Note"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notes List - No loading skeleton, just updates */}
          <div className="space-y-stack">
            {notes.length === 0 ? (
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

      {/* Cancel Edit Confirmation */}
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

      {/* Archive Confirmation */}
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
                {archiving ? "Archiving..." : "Archive"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
