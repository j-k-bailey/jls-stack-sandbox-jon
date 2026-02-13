import type { ProductIdeaNote } from "@/lib/types/productIdeas";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/BrandButton";
import { Edit3, X, Save, Archive } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
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
import { FormTextarea } from "@/components/form/FormField";
import {
  updateNoteSchema,
  type UpdateNoteInput,
} from "@/lib/zodSchemas/productIdea";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: ProductIdeaNote;
  canEdit: boolean;
  canArchive: boolean;
  onUpdate: (noteId: string, body: string) => Promise<void>;
  onArchive: (noteId: string) => Promise<void>;
  className?: string;
  isParentArchived?: boolean;
}

export function NoteCard({
  note,
  canEdit,
  canArchive,
  onUpdate,
  onArchive,
  className,
  isParentArchived = false,
}: NoteCardProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [cancelEditDialogOpen, setCancelEditDialogOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<UpdateNoteInput>({
    resolver: zodResolver(updateNoteSchema),
    mode: "onBlur",
    defaultValues: {
      body: note.body,
    },
  });

  const handleEnterEditMode = () => {
    setIsEditMode(true);
    reset({ body: note.body });
  };

  const handleCancelEdit = () => {
    if (isDirty) {
      setCancelEditDialogOpen(true);
    } else {
      setIsEditMode(false);
      reset();
    }
  };

  const handleConfirmCancelEdit = () => {
    setIsEditMode(false);
    reset();
    setCancelEditDialogOpen(false);
  };

  const onSubmit: SubmitHandler<UpdateNoteInput> = async (data) => {
    try {
      await onUpdate(note.noteId, data.body);
      toast.success("Note updated");
      setIsEditMode(false);
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update note. Please try again.",
      });
      toast.error("Failed to update note");
    }
  };

  const handleArchive = async () => {
    setArchiving(true);
    try {
      await onArchive(note.noteId);
      toast.success("Note archived");
      setArchiveDialogOpen(false);
    } catch (error) {
      console.error("Error archiving note:", error);
      toast.error("Failed to archive note");
    } finally {
      setArchiving(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card
        className={cn(
          "group",
          isParentArchived
            ? "bg-neutral-background border-border-neutral"
            : "bg-surface-1 border-border",
          className,
        )}
      >
        <CardContent className={"space-y-stack"}>
          {/* Author Header */}
          <div className="flex items-center justify-between gap-inline">
            <div className="flex items-center gap-inline min-w-0">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage
                  src={note.authorPhotoURL || undefined}
                  alt={note.authorDisplayName}
                />
                <AvatarFallback className="text-xs">
                  {getInitials(note.authorDisplayName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {note.authorDisplayName}
                </p>
                {note.createdAt && (
                  <p className="text-xs text-muted-foreground">
                    {format(note.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            {!isEditMode && (canEdit || canArchive) && (
              <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0">
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleEnterEditMode}
                    aria-label="Edit note"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                )}
                {canArchive && (
                  <Button
                    semantic="warning"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setArchiveDialogOpen(true)}
                    aria-label="Archive note"
                  >
                    <Archive className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}

            {/* Mobile Action Buttons */}
            {!isEditMode && (canEdit || canArchive) && (
              <div className="sm:hidden flex items-center gap-1 shrink-0">
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleEnterEditMode}
                    aria-label="Edit note"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                )}
                {canArchive && (
                  <Button
                    semantic="warning"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setArchiveDialogOpen(true)}
                    aria-label="Archive note"
                  >
                    <Archive className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {isEditMode ? (
            /* EDIT MODE */
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-stack pl-11"
            >
              <FormTextarea
                control={control}
                name="body"
                label="Note"
                error={errors.body}
                maxLength={2000}
                rows={3}
              />

              <div className="flex gap-stack">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="ml-auto"
                >
                  <Save className="h-3 w-3 mr-1" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          ) : (
            /* VIEW MODE */
            <p className="body-1 text-foreground wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap pl-11">
              {note.body}
            </p>
          )}
        </CardContent>
      </Card>

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
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Note?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive this note. You can restore it later from the
              archived notes view.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={archiving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleArchive}
              disabled={archiving}
              className="bg-warning text-warning-foreground hover:bg-warning-hover border border-border-warning"
            >
              {archiving ? "Archiving..." : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
