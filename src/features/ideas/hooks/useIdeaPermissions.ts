import { useMemo } from "react";
import type { ProductIdea } from "@/lib/types/productIdeas";
import {
  canEditProductIdea,
  canDeleteProductIdea,
} from "@/lib/permissions/productIdeas";
import type { UserRole } from "@/lib/types/user";

// ============================================================================
// TYPES
// ============================================================================

export interface UseIdeaPermissionsOptions {
  idea: ProductIdea | null;
  userId: string | undefined;
  userRole: UserRole | undefined;
}

export interface UseIdeaPermissionsReturn {
  isOwner: boolean;
  canEdit: boolean;
  canArchive: boolean;
  canRestore: boolean;
}

// ============================================================================
// HOOK
// ============================================================================

export function useIdeaPermissions(
  options: UseIdeaPermissionsOptions,
): UseIdeaPermissionsReturn {
  const { idea, userId, userRole } = options;

  return useMemo(() => {
    if (!idea || !userId) {
      return {
        isOwner: false,
        canEdit: false,
        canArchive: false,
        canRestore: false,
      };
    }

    const isOwner = userId === idea.ownerId;
    const isArchived = !!idea.archivedAt;

    return {
      isOwner,
      canEdit: canEditProductIdea(userRole, isOwner) && !isArchived,
      canArchive: canDeleteProductIdea(isOwner) && !isArchived,
      canRestore: canDeleteProductIdea(isOwner) && isArchived,
    };
  }, [idea, userId, userRole]);
}
