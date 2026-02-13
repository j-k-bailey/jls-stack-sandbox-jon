import { useState, useEffect, useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Trash2, Edit3, Send, MoreVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { InlineAlert } from "@/components/common/InlineAlert";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import {
  getProductIdeaNotes,
  createProductIdeaNote,
  deleteProductIdeaNote,
  deleteProductIdea,
} from "@/lib/firestore/productIdeas";
import {
  createNoteSchema,
  type CreateNoteInput,
} from "@/lib/zodSchemas/productIdea";
import type { ProductIdea, ProductIdeaNote } from "@/lib/types/productIdeas";
import { format } from "date-fns";
import { EditIdeaDialog } from "@/features/ideas/components/EditIdeaDialog";
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
} from "@/lib/permissions/productIdeaNotes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormTextarea } from "@/components/form/FormField";

interface IdeaDetailSheetProps {
  idea: ProductIdea;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: (updatedIdea?: ProductIdea) => void;
}

export function IdeaDetailSheet({
  idea: initialIdea,
  open,
  onOpenChange,
  onUpdate,
}: IdeaDetailSheetProps) {
  const { user, userProfile } = useAuth();
  const [currentIdea, setCurrentIdea] = useState<ProductIdea>(initialIdea);
  const [notes, setNotes] = useState<ProductIdeaNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingIdea, setDeletingIdea] = useState(false);

  // Update local idea when prop changes
  useEffect(() => {
    setCurrentIdea(initialIdea);
  }, [initialIdea]);

  const isOwner = user?.uid === currentIdea.ownerId;
  const userRole = userProfile?.role;

  // Permission checks
  const canEdit = canEditProductIdea(userRole, isOwner);
  const canDelete = canDeleteIdea(isOwner);
  const canAddNote = canCreateProductIdeaNote(userRole, user?.uid, user?.uid);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      body: "",
    },
  });

  const loadNotes = useCallback(async () => {
    if (!currentIdea?.id) return;

    // Only show loading state on first load
    if (isFirstLoad) {
      setLoadingNotes(true);
    }

    try {
      const fetchedNotes = await getProductIdeaNotes(currentIdea.id);
      const sortedNotes = fetchedNotes.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoadingNotes(false);
      setIsFirstLoad(false);
    }
  }, [currentIdea?.id, isFirstLoad]);

  useEffect(() => {
    if (!open) {
      // Reset first load state when sheet closes
      setIsFirstLoad(true);
      return;
    }
    loadNotes();
  }, [open, loadNotes]);

  const onSubmitNote: SubmitHandler<CreateNoteInput> = async (data) => {
    if (!user || !canAddNote) {
      setError("root", {
        type: "auth",
        message: "You must be signed in to add a note",
      });
      return;
    }

    try {
      await createProductIdeaNote(currentIdea.id, data.body, user.uid);
      reset();
      await loadNotes();
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to add note. Please try again.",
      });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteProductIdeaNote(currentIdea.id, noteId);
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };

  const handleDeleteIdea = async () => {
    setDeletingIdea(true);
    try {
      await deleteProductIdea(currentIdea.id);
      onOpenChange(false);
      onUpdate?.();
    } catch (error) {
      console.error("Error deleting idea:", error);
    } finally {
      setDeletingIdea(false);
    }
  };

  const handleIdeaUpdate = (updatedIdea: ProductIdea) => {
    // Update local state immediately
    setCurrentIdea(updatedIdea);
    setEditDialogOpen(false);
    // Notify parent to update the list
    onUpdate?.(updatedIdea);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="p-inset w-full sm:max-w-2xl lg:max-w-3xl overflow-y-auto"
          actions={
            (canEdit || canDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    semantic="neutral"
                    variant="ghost"
                    size="icon"
                    aria-label="Idea options menu"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canEdit && (
                    <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Idea
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <DropdownMenuItem
                      onClick={() => setDeleteDialogOpen(true)}
                      className="text-warning focus:text-warning"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Idea
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        >
          <SheetHeader className="space-y-3">
            <div className="min-w-0">
              <SheetTitle className="headline-1">
                {currentIdea.title}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-x-inline mt-2">
                <span className="subtitle-1 capitalize">
                  {currentIdea.status}
                </span>
                {currentIdea.priority && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span className="subtitle-1 capitalize">
                      {currentIdea.priority} priority
                    </span>
                  </>
                )}
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="relative my-6">
            <div className="absolute inset-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
            <div className="absolute inset-0 h-px bg-linear-to-r from-primary/20 via-accent/50 to-primary/20 blur-sm" />
          </div>

          <div className="space-y-section pb-6">
            {/* Summary Section */}
            <div>
              <h3 className="headline-5 mb-stack">Summary</h3>
              <p className="body-1 text-muted-foreground wrap-break-word">
                {currentIdea.summary}
              </p>
            </div>

            {/* Tags */}
            {currentIdea.tags && currentIdea.tags.length > 0 && (
              <div>
                <h3 className="headline-5 mb-stack">Tags</h3>
                <div className="flex flex-wrap gap-inline">
                  {currentIdea.tags.map((tag) => (
                    <Badge key={tag} variant="accent-subtle">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="caption text-muted-foreground space-y-inline">
              {currentIdea.createdAt && (
                <div>
                  Created{" "}
                  {format(
                    currentIdea.createdAt.toDate(),
                    "MMM d, yyyy 'at' h:mm a",
                  )}
                </div>
              )}
              {currentIdea.updatedAt && (
                <div>
                  Updated{" "}
                  {format(
                    currentIdea.updatedAt.toDate(),
                    "MMM d, yyyy 'at' h:mm a",
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* Notes Section */}
            <div className="space-y-stack">
              <div className="flex items-center gap-stack">
                <MessageSquare className="h-5 w-5" />
                <h3 className="headline-5">Notes ({notes.length})</h3>
              </div>

              {/* Notes List */}
              <div className="space-y-stack">
                {loadingNotes ? (
                  <>
                    {[1, 2].map((i) => (
                      <Card key={i}>
                        <CardContent className="space-y-stack">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-24" />
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : notes.length === 0 ? (
                  <Card>
                    <CardContent>
                      <p className="body-2 text-center text-muted-foreground py-inset-lg">
                        No notes yet.{canAddNote && " Add the first one above."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      canDelete={canDeleteProductIdeaNote(
                        user?.uid === note.authorId,
                      )}
                      onDelete={() => handleDeleteNote(note.id)}
                    />
                  ))
                )}
              </div>

              {/* Add Note Form - Only show if user can add notes */}
              {canAddNote && (
                <form
                  onSubmit={handleSubmit(onSubmitNote)}
                  className="space-y-stack mt-section"
                >
                  {errors.root?.message && (
                    <InlineAlert variant="warning" dismissible>
                      {errors.root.message}
                    </InlineAlert>
                  )}

                  <FormTextarea
                    control={control}
                    name="body"
                    label="Add a note"
                    placeholder="Add a note..."
                    error={errors.body}
                    maxLength={2000}
                    rows={3}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="filled"
                      semantic="primary"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      <Send className="h-3 w-3" />
                      {isSubmitting ? "Adding..." : "Add Note"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Dialog */}
      {canEdit && (
        <EditIdeaDialog
          idea={currentIdea}
          ideaId={currentIdea.id}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={handleIdeaUpdate}
        />
      )}

      {/* Delete Confirmation */}
      {canDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product Idea?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{currentIdea.title}" and all
                associated notes. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deletingIdea}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteIdea}
                disabled={deletingIdea}
                className="bg-warning text-warning-foreground hover:bg-warning-hover border border-border-warning"
              >
                {deletingIdea ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

// Note Card Component remains the same
interface NoteCardProps {
  note: ProductIdeaNote;
  canDelete: boolean;
  onDelete: () => void;
}

function NoteCard({ note, canDelete, onDelete }: NoteCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="group">
        <CardContent className="space-y-stack">
          {/* Desktop: hover button */}
          <div className="hidden sm:flex items-start justify-between gap-stack">
            <p className="body-1 flex-1 wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap min-w-0">
              {note.body}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  semantic="warning"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setDeleteDialogOpen(true)}
                  aria-label="Delete note"
                  className={
                    canDelete
                      ? "opacity-0 group-hover:opacity-100 transition-opacity"
                      : "invisible"
                  }
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete note</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile: no inline button */}
          <p className="body-1 sm:hidden wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap">
            {note.body}
          </p>

          {/* Footer with timestamp and mobile delete */}
          {note.createdAt && (
            <div className="flex items-center justify-between">
              <p className="caption">
                {format(note.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
              </p>
              {canDelete && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      semantic="warning"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteDialogOpen(true)}
                      aria-label="Delete note"
                      className="sm:hidden"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete note</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this note. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-warning text-warning-foreground hover:bg-warning-hover border border-border-warning"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
