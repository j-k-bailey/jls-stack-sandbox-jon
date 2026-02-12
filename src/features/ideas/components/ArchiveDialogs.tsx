import { Loader2 } from "lucide-react";
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
import type { ProductIdea } from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export interface ArchiveDialogsProps {
  idea: ProductIdea;

  // Archive
  archiveOpen: boolean;
  onArchiveOpenChange: (open: boolean) => void;
  onArchiveConfirm: () => void;
  archiving: boolean;
  canArchive: boolean;

  // Restore
  restoreOpen: boolean;
  onRestoreOpenChange: (open: boolean) => void;
  onRestoreConfirm: () => void;
  restoring: boolean;
  canRestore: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ArchiveDialogs({
  idea,
  archiveOpen,
  onArchiveOpenChange,
  onArchiveConfirm,
  archiving,
  canArchive,
  restoreOpen,
  onRestoreOpenChange,
  onRestoreConfirm,
  restoring,
  canRestore,
}: ArchiveDialogsProps) {
  return (
    <>
      {/* Archive Dialog */}
      {canArchive && (
        <AlertDialog open={archiveOpen} onOpenChange={onArchiveOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Archive this idea?</AlertDialogTitle>
              <AlertDialogDescription>
                "{idea.title}" will be archived and become read-only. You can
                restore it later if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={archiving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onArchiveConfirm}
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

      {/* Restore Dialog */}
      {canRestore && (
        <AlertDialog open={restoreOpen} onOpenChange={onRestoreOpenChange}>
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
              <AlertDialogAction
                onClick={onRestoreConfirm}
                disabled={restoring}
              >
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
