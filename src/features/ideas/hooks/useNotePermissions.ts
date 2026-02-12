import { useMemo } from "react";
import type { ProductIdeaNote } from "@/lib/types/productIdeas";
import {
  canCreateProductIdeaNote,
  canEditProductIdeaNote,
  canDeleteProductIdeaNote,
} from "@/lib/permissions/productIdeaNotes";
import type { UserRole } from "@/lib/types/user";

// ============================================================================
// TYPES
// ============================================================================

export interface UseNotePermissionsOptions {
  userId: string | undefined;
  userRole: UserRole | undefined;
  ownerId: string | undefined; // Idea owner ID
  isParentArchived: boolean; // Parent idea archive state
}

export interface UseNotePermissionsReturn {
  canCreate: boolean;
}

export interface UseNoteItemPermissionsOptions {
  note: ProductIdeaNote;
  userId: string | undefined;
  userRole: UserRole | undefined;
  isParentArchived: boolean; // Parent idea archive state
}

export interface UseNoteItemPermissionsReturn {
  canEdit: boolean;
  canArchive: boolean;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Permission to create new notes
 */
export function useNotePermissions(
  options: UseNotePermissionsOptions,
): UseNotePermissionsReturn {
  const { userId, userRole, ownerId, isParentArchived } = options;

  return useMemo(() => {
    // Cannot create notes if parent idea is archived
    if (isParentArchived) {
      return { canCreate: false };
    }

    return {
      canCreate: canCreateProductIdeaNote(userRole, ownerId, userId),
    };
  }, [userId, userRole, ownerId, isParentArchived]);
}

/**
 * Permissions for individual note items (edit, archive)
 */
export function useNoteItemPermissions(
  options: UseNoteItemPermissionsOptions,
): UseNoteItemPermissionsReturn {
  const { note, userId, userRole, isParentArchived } = options;

  return useMemo(() => {
    // Cannot edit or archive notes if parent idea is archived
    if (isParentArchived) {
      return {
        canEdit: false,
        canArchive: false,
      };
    }

    const isAuthor = userId === note.authorId;

    return {
      canEdit: canEditProductIdeaNote(isAuthor, userRole),
      canArchive: canDeleteProductIdeaNote(isAuthor),
    };
  }, [note, userId, userRole, isParentArchived]);
}
