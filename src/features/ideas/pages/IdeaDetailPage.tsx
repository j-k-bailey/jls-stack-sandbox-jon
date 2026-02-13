import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IdeaDetailSkeleton } from "@/features/ideas/components/skeletons/IdeaDetailSkeleton";
import { ArchivedIdeaBanner } from "@/features/ideas/components/ArchivedIdeaBanner";
import { ProgressBar } from "@/components/common/ProgressBar";
import {
  IdeaStatusDisplay,
  IdeaPriorityDisplay,
} from "@/features/ideas/components/IdeaStatusDisplay";
import { IdeaNotesSection } from "@/features/ideas/pages/IdeaNotesSection";
import { ErrorState } from "@/components/states/ErrorState";
import { useAuth } from "@/contexts/AuthContext";

// Hooks
import { useIdea } from "@/features/ideas/hooks/useIdea";
import { useIdeaPermissions } from "@/features/ideas/hooks/useIdeaPermissions";
import { useIdeaEdit } from "@/features/ideas/hooks/useIdeaEdit";

// Components
import { IdeaEditForm } from "@/features/ideas/components/IdeaEditForm";
import { IdeaViewMode } from "@/features/ideas/components/IdeaViewMode";
import { ArchiveDialogs } from "@/features/ideas/components/ArchiveDialogs";
import { CancelEditDialog } from "@/features/ideas/components/CancelEditDialog";

// ============================================================================
// COMPONENT
// ============================================================================

export function IdeaDetailPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  // ─── Data fetching & mutations ─────────────────────────────────────────────

  const {
    idea,
    loading,
    refreshing,
    error,
    isArchived,
    updateIdea,
    archiveIdea,
    unarchiveIdea,
    updating,
    archiving,
    restoring,
  } = useIdea({ ideaId });

  // ─── Permissions ───────────────────────────────────────────────────────────

  const { canEdit, canArchive, canRestore } = useIdeaPermissions({
    idea,
    userId: user?.uid,
    userRole: userProfile?.role,
  });

  // ─── Edit mode ─────────────────────────────────────────────────────────────

  const {
    isEditMode,
    enterEditMode,
    control,
    handleSubmit,
    errors,
    isDirty,
    isSubmitting,
    onSubmit,
    cancelEdit,
    confirmCancelEdit,
    cancelDialogOpen,
    setCancelDialogOpen,
  } = useIdeaEdit({
    idea,
    onUpdate: updateIdea,
    updating,
  });

  // ─── Dialog state ──────────────────────────────────────────────────────────

  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleArchive = async () => {
    try {
      await archiveIdea();
      toast.success("Idea archived");
      setArchiveDialogOpen(false);
    } catch (err) {
      // Error already toasted by hook
      setArchiveDialogOpen(false);
      throw err;
    }
  };

  const handleRestore = async () => {
    try {
      await unarchiveIdea();
      toast.success("Idea restored");
      setRestoreDialogOpen(false);
    } catch (err) {
      setRestoreDialogOpen(false);
      throw err;
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
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
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
        {/* Header */}
        <PageHeader
          pageTitle={idea.title}
          actions={
            <Button variant="ghost" onClick={() => navigate("/ideas")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Ideas
            </Button>
          }
        />

        {/* Archive Banner */}
        {isArchived && (
          <ArchivedIdeaBanner
            message={
              idea.archivedAt
                ? `This idea was archived on ${format(idea.archivedAt.toDate(), "MMMM d, yyyy")}. It is read-only until restored.`
                : "This idea is archived and read-only until restored."
            }
          />
        )}

        {/* Status & Priority */}
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

        {/* Main Card */}
        <Card
          className={
            isArchived
              ? "overflow-hidden border-border-neutral bg-neutral-background"
              : "overflow-hidden"
          }
        >
          <CardContent className="space-y-section p-inset-xl">
            {isEditMode ? (
              <IdeaEditForm
                control={control}
                errors={errors}
                idea={idea}
                isSubmitting={isSubmitting}
                isDirty={isDirty}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={cancelEdit}
              />
            ) : (
              <IdeaViewMode
                idea={idea}
                isArchived={isArchived}
                canEdit={canEdit}
                canArchive={canArchive}
                canRestore={canRestore}
                onEdit={enterEditMode}
                onArchive={() => setArchiveDialogOpen(true)}
                onRestore={() => setRestoreDialogOpen(true)}
              />
            )}
          </CardContent>
          <ProgressBar active={refreshing} />
        </Card>

        <Separator />

        {/* Notes Section */}
        <IdeaNotesSection
          ideaId={ideaId}
          hideForm={isEditMode}
          isParentArchived={isArchived}
          ownerId={idea.ownerId}
        />
      </div>

      {/* Dialogs */}
      <CancelEditDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={confirmCancelEdit}
      />

      <ArchiveDialogs
        idea={idea}
        archiveOpen={archiveDialogOpen}
        onArchiveOpenChange={setArchiveDialogOpen}
        onArchiveConfirm={handleArchive}
        archiving={archiving}
        canArchive={canArchive}
        restoreOpen={restoreDialogOpen}
        onRestoreOpenChange={setRestoreDialogOpen}
        onRestoreConfirm={handleRestore}
        restoring={restoring}
        canRestore={canRestore}
      />
    </>
  );
}
