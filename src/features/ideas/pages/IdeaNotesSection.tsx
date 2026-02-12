import { MessageSquare } from "lucide-react";
import { ErrorState } from "@/components/states/ErrorState";
import { useAuth } from "@/contexts/AuthContext";

// Hooks
import { useIdeaNotes } from "@/features/ideas/hooks/useIdeaNotes";
import { useNoteForm } from "@/features/ideas/hooks/useNoteForm";
import { useNotePermissions } from "@/features/ideas/hooks/useNotePermissions";

// Components
import { AddNoteForm } from "@/features/ideas/components/AddNoteForm";
import { NotesList } from "@/features/ideas/components/NotesList";

// ============================================================================
// TYPES
// ============================================================================

interface IdeaNotesSectionProps {
  ideaId: string | undefined;
  hideForm?: boolean; // Hide form explicitly (e.g., when editing idea)
  archived?: boolean; // When true, subscribes to archived notes instead
  isParentArchived?: boolean; // When true, notes are read-only (parent idea is archived)
  ownerId?: string; // Idea owner ID for permissions
}

// ============================================================================
// COMPONENT
// ============================================================================

export function IdeaNotesSection({
  ideaId,
  hideForm = false,
  archived = false,
  isParentArchived = false,
  ownerId,
}: IdeaNotesSectionProps) {
  const { user, userProfile } = useAuth();

  // ─── Data fetching & mutations ─────────────────────────────────────────────

  const {
    notes,
    loading,
    refreshing,
    error,
    createNote,
    updateNote,
    archiveNote,
  } = useIdeaNotes({
    ideaId,
    archived,
  });

  // ─── Permissions ───────────────────────────────────────────────────────────

  const { canCreate } = useNotePermissions({
    userId: user?.uid,
    userRole: userProfile?.role,
    ownerId,
    isParentArchived,
  });

  const showForm = !hideForm && canCreate;

  // ─── Note form ─────────────────────────────────────────────────────────────

  const { control, handleSubmit, errors, isSubmitting, isDirty, onFormSubmit } =
    useNoteForm({
      onSubmit: createNote,
      userId: user?.uid,
      userProfile: userProfile
        ? {
            firstName: userProfile.firstName,
            lastNameInitial: userProfile.lastNameInitial,
          }
        : null,
      userDisplayName: user?.displayName,
      userEmail: user?.email,
      userPhotoURL: user?.photoURL,
    });

  // ─── Render ────────────────────────────────────────────────────────────────

  if (!ideaId) return null;

  return (
    <div className="space-y-stack">
      {/* Header */}
      <div className="flex items-center gap-stack">
        <MessageSquare className="h-5 w-5" />
        <h2 className="headline-4">Notes ({loading ? "…" : notes.length})</h2>
      </div>

      {/* Error State */}
      {error && (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      )}

      {/* Content */}
      {!error && (
        <>
          {/* Add Note Form */}
          {showForm && (
            <AddNoteForm
              control={control}
              errors={errors}
              isSubmitting={isSubmitting}
              isDirty={isDirty}
              onSubmit={handleSubmit(onFormSubmit)}
            />
          )}

          {/* Notes List */}
          <NotesList
            notes={notes}
            loading={loading}
            refreshing={refreshing}
            showForm={showForm}
            userId={user?.uid}
            userRole={userProfile?.role}
            isParentArchived={isParentArchived}
            onUpdate={updateNote}
            onArchive={archiveNote}
          />
        </>
      )}
    </div>
  );
}
