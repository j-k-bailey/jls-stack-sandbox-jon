import { useReducer, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/BrandButton";
import { Skeleton } from "@/components/ui/skeleton";
import { InlineAlert } from "@/components/common/InlineAlert";
import { FetchErrorBanner } from "@/components/common/FetchErrorBanner";
import { ProgressBar } from "@/components/common/ProgressBar";
import { NoteCard } from "@/components/productIdea/NoteCard";
import { FormTextarea } from "@/components/form/FormField";
import { useAuth } from "@/contexts/AuthContext";
import {
  subscribeToActiveIdeaNotes,
  subscribeToArchivedIdeaNotes,
  createProductIdeaNote,
  updateProductIdeaNote,
  archiveProductIdeaNote,
} from "@/lib/firestore/productIdeas";
import {
  createNoteSchema,
  type CreateNoteInput,
} from "@/lib/zodSchemas/productIdea";
import type {
  CreateProductIdeaNoteInput,
  ProductIdeaNote,
} from "@/lib/types/productIdeas";
import {
  canCreateProductIdeaNote,
  canDeleteProductIdeaNote,
  canEditProductIdeaNote,
} from "@/lib/permissions/productIdeaNotes";
import { useLiveStatus } from "@/contexts/LiveStatusContext";

const MIN_SKELETON_MS = 300;

// ─── Reducer ──────────────────────────────────────────────────────────────────

type NotesState = {
  notes: ProductIdeaNote[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
};

type NotesAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; notes: ProductIdeaNote[] }
  | { type: "REFRESH_START" }
  | { type: "REFRESH_SUCCESS"; notes: ProductIdeaNote[] }
  | { type: "ERROR"; message: string };

const notesInitialState: NotesState = {
  notes: [],
  loading: true,
  refreshing: false,
  error: null,
};

function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, refreshing: false, error: null };
    case "LOAD_SUCCESS":
      return {
        notes: action.notes,
        loading: false,
        refreshing: false,
        error: null,
      };
    case "REFRESH_START":
      return { ...state, refreshing: true };
    case "REFRESH_SUCCESS":
      return { ...state, notes: action.notes, refreshing: false, error: null };
    case "ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.message,
      };
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface IdeaNotesSectionProps {
  ideaId?: string;
  hideForm?: boolean;
  archived?: boolean; // when true, subscribes to archived notes instead
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IdeaNotesSection({
  ideaId: propIdeaId,
  hideForm,
  archived = false,
}: IdeaNotesSectionProps) {
  const params = useParams<{ ideaId: string }>();
  const ideaId = propIdeaId ?? params.ideaId;

  const { user, userProfile } = useAuth();

  const { registerListener, reportError } = useLiveStatus();

  const [notesState, notesDispatch] = useReducer(
    notesReducer,
    notesInitialState,
  );
  const { notes, loading, refreshing, error } = notesState;
  const notesLoadedOnce = useRef(false);

  const canAddNote = canCreateProductIdeaNote(
    userProfile?.role,
    user?.uid,
    user?.uid,
  );
  const showForm = !hideForm && canAddNote;

  // ─── Subscription ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    notesLoadedOnce.current = false;
    notesDispatch({ type: "LOAD_START" });

    const unregister = registerListener();

    const subscribe = archived
      ? subscribeToArchivedIdeaNotes
      : subscribeToActiveIdeaNotes;

    const unsubscribe = subscribe(
      ideaId,
      async (nextNotes) => {
        const isFirst = !notesLoadedOnce.current;

        if (isFirst) {
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          notesLoadedOnce.current = true;
          notesDispatch({ type: "LOAD_SUCCESS", notes: nextNotes });
        } else {
          notesDispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          notesDispatch({ type: "REFRESH_SUCCESS", notes: nextNotes });
        }
      },
      (err) => {
        console.error("Notes subscription error:", err);
        notesDispatch({
          type: "ERROR",
          message: "Failed to load notes in real time.",
        });
      },
    );

    return () => {
      unsubscribe();
      unregister();
    };
  }, [ideaId, archived, registerListener, reportError]);

  // ─── Note form ─────────────────────────────────────────────────────────────

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { body: "" },
  });

  const onSubmitNote: SubmitHandler<CreateNoteInput> = async (data) => {
    if (!user || !ideaId) {
      setError("root", {
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
      reset();
      toast.success("Note added");
    } catch (err) {
      setError("root", {
        type: "server",
        message:
          err instanceof Error
            ? err.message
            : "Failed to add note. Please try again.",
      });
      toast.error("Failed to add note");
    }
  };

  // ─── Note action handlers ──────────────────────────────────────────────────

  const handleUpdateNote = async (noteId: string, body: string) => {
    if (!ideaId) return;
    try {
      await updateProductIdeaNote(ideaId, noteId, { body });
      toast.success("Note updated");
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
    } catch (err) {
      console.error("Error archiving note:", err);
      toast.error("Failed to remove note");
      throw err;
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (!ideaId) return null;

  return (
    <div className="space-y-stack">
      <div className="flex items-center gap-stack">
        <MessageSquare className="h-5 w-5" />
        <h2 className="headline-4">Notes ({loading ? "…" : notes.length})</h2>
      </div>

      {error && <FetchErrorBanner message={error} />}

      {/* Add note form */}
      {showForm && (
        <Card>
          <CardContent className="p-inset-xl">
            <form
              onSubmit={handleSubmit(onSubmitNote)}
              className="space-y-stack"
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
                  aria-label="Submit note"
                  disabled={isSubmitting || !isDirty}
                >
                  {isSubmitting ? (
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
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-inset-xl space-y-stack">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ) : !error && notes.length === 0 ? (
            <p className="body-2 text-center text-muted-foreground p-inset-xl py-inset-lg">
              No notes yet.{showForm && " Add the first one above."}
            </p>
          ) : (
            <div className="divide-y space-y-stack">
              {notes.map((note) => (
                <NoteCard
                  key={note.noteId}
                  note={note}
                  canEdit={canEditProductIdeaNote(
                    user?.uid === note.authorId,
                    userProfile?.role,
                  )}
                  canArchive={canDeleteProductIdeaNote(
                    user?.uid === note.authorId,
                  )}
                  onUpdate={handleUpdateNote}
                  onArchive={handleArchiveNote}
                  className="bg-surface-2"
                />
              ))}
            </div>
          )}
        </CardContent>
        <ProgressBar active={refreshing} />
      </Card>
    </div>
  );
}
