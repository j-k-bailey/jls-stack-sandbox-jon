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
import { Textarea } from "@/components/ui/textarea";
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
import { EditIdeaDialog } from "@/components/productIdea/EditIdeaDialog";
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

interface IdeaDetailSheetProps {
  idea: ProductIdea;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
}

export function IdeaDetailSheet({
  idea,
  open,
  onOpenChange,
  onUpdate,
}: IdeaDetailSheetProps) {
  const { user, userProfile } = useAuth();
  const [notes, setNotes] = useState<ProductIdeaNote[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingIdea, setDeletingIdea] = useState(false);

  const isOwner = user?.uid === idea.ownerId;
  const userRole = userProfile?.role;

  // Permission checks
  const canEdit = canEditProductIdea(userRole, isOwner);
  const canDelete = canDeleteIdea(isOwner);
  const canAddNote = canCreateProductIdeaNote(userRole, user?.uid, user?.uid);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      body: "",
    },
  });

  const loadNotes = useCallback(async () => {
    if (!idea?.id) return;

    setLoadingNotes(true);
    try {
      const fetchedNotes = await getProductIdeaNotes(idea.id);
      const sortedNotes = fetchedNotes.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      });
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoadingNotes(false);
    }
  }, [idea?.id]);

  useEffect(() => {
    if (!open) return;
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
      await createProductIdeaNote(idea.id, data.body, user.uid);
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
      await deleteProductIdeaNote(idea.id, noteId);
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleDeleteIdea = async () => {
    setDeletingIdea(true);
    try {
      await deleteProductIdea(idea.id);
      onOpenChange(false);
      onUpdate?.();
    } catch (error) {
      console.error("Error deleting idea:", error);
    } finally {
      setDeletingIdea(false);
    }
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
                  <Button semantic="neutral" variant="ghost" size="icon">
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
              <SheetTitle className="headline-1">{idea.title}</SheetTitle>
              <SheetDescription className="flex items-center gap-x-inline mt-2">
                <span className="subtitle-1 capitalize">{idea.status}</span>
                {idea.priority && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span className="subtitle-1 capitalize">
                      {idea.priority} priority
                    </span>
                  </>
                )}
              </SheetDescription>
            </div>
          </SheetHeader>
          <div className="h-px bg-linear-to-r from-border-primary via-accent to-transparent my-6" />

          <div className="space-y-section pb-6">
            {/* Summary Section */}
            <div>
              <h3 className="headline-5 mb-stack">Summary</h3>
              <p className="body-1 text-muted-foreground wrap-break-word">
                {idea.summary}
              </p>
            </div>

            {/* Tags */}
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

            {/* Metadata */}
            <div className="caption text-muted-foreground space-y-inline">
              {idea.createdAt && (
                <div>
                  Created{" "}
                  {format(idea.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
                </div>
              )}
              {idea.updatedAt && (
                <div>
                  Updated{" "}
                  {format(idea.updatedAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
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

              {/* Add Note Form - Only show if user can add notes */}
              {canAddNote && (
                <form onSubmit={handleSubmit(onSubmitNote)}>
                  <div className="space-y-stack">
                    {errors.root?.message && (
                      <InlineAlert variant="warning" dismissible>
                        {errors.root.message}
                      </InlineAlert>
                    )}

                    <div className="space-y-inline">
                      <Textarea
                        placeholder="Add a note..."
                        rows={3}
                        {...register("body")}
                        className="resize-none"
                      />
                      {errors.body && (
                        <p className="caption text-warning">
                          {errors.body.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end pb-section">
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
                  </div>
                </form>
              )}

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
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Dialog */}
      {canEdit && (
        <EditIdeaDialog
          idea={idea}
          ideaId={idea.id}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={() => {
            setEditDialogOpen(false);
            onUpdate?.();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {canDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product Idea?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{idea.title}" and all associated
                notes. This action cannot be undone.
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

// Note Card Component
interface NoteCardProps {
  note: ProductIdeaNote;
  canDelete: boolean;
  onDelete: () => void;
}

function NoteCard({ note, canDelete, onDelete }: NoteCardProps) {
  return (
    <Card>
      <CardContent className="space-y-stack">
        <div className="flex items-start justify-between gap-stack">
          <p className="body-1 flex-1 wrap-break-word overflow-wrap-anywhere">
            {note.body}
          </p>
          {canDelete && (
            <Button
              semantic="warning"
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
        {note.createdAt && (
          <p className="caption">
            {format(note.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
