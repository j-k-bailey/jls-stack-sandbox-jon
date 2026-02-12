import { useReducer, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  subscribeToIdeaById,
  updateProductIdea,
  archiveProductIdea,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import type { ProductIdea } from "@/lib/types/productIdeas";
import type { UpdateProductIdeaInput } from "@/lib/zodSchemas/productIdea";
import { useLiveStatus } from "@/contexts/LiveStatusContext";
import { MIN_SKELETON_MS } from "@/features/ideas/constants/ideas-constants";

// ============================================================================
// TYPES
// ============================================================================

export interface UseIdeaOptions {
  ideaId: string | undefined;
  preventFormReset?: boolean; // When user is mid-edit, prevent form reset
}

export interface UseIdeaReturn {
  // Data
  idea: ProductIdea | null;

  // Loading states
  loading: boolean; // Initial load
  refreshing: boolean; // Background updates
  error: string | null;

  // Computed states
  isArchived: boolean;

  // Mutations
  updateIdea: (data: UpdateProductIdeaInput) => Promise<void>;
  archiveIdea: () => Promise<void>;
  unarchiveIdea: () => Promise<void>;

  // Mutation states
  updating: boolean;
  archiving: boolean;
  restoring: boolean;
  updateError: string | null;
}

// ============================================================================
// REDUCER
// ============================================================================

type IdeaState = {
  idea: ProductIdea | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  updating: boolean;
  archiving: boolean;
  restoring: boolean;
  updateError: string | null;
};

type IdeaAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; idea: ProductIdea }
  | { type: "NOT_FOUND" }
  | { type: "REFRESH_START" }
  | { type: "REFRESH_SUCCESS"; idea: ProductIdea }
  | { type: "ERROR"; message: string }
  | { type: "UPDATE_START" }
  | { type: "UPDATE_SUCCESS" }
  | { type: "UPDATE_ERROR"; message: string }
  | { type: "ARCHIVE_START" }
  | { type: "ARCHIVE_SUCCESS" }
  | { type: "ARCHIVE_ERROR" }
  | { type: "RESTORE_START" }
  | { type: "RESTORE_SUCCESS" }
  | { type: "RESTORE_ERROR" };

const initialState: IdeaState = {
  idea: null,
  loading: true,
  refreshing: false,
  error: null,
  updating: false,
  archiving: false,
  restoring: false,
  updateError: null,
};

function ideaReducer(state: IdeaState, action: IdeaAction): IdeaState {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state,
        loading: true,
        refreshing: false,
        error: null,
      };

    case "LOAD_SUCCESS":
      return {
        ...state,
        idea: action.idea,
        loading: false,
        refreshing: false,
        error: null,
      };

    case "NOT_FOUND":
      return {
        ...state,
        loading: false,
        error: "Idea not found.",
      };

    case "REFRESH_START":
      return {
        ...state,
        refreshing: true,
      };

    case "REFRESH_SUCCESS":
      return {
        ...state,
        idea: action.idea,
        refreshing: false,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.message,
      };

    case "UPDATE_START":
      return {
        ...state,
        updating: true,
        updateError: null,
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        updating: false,
        updateError: null,
      };

    case "UPDATE_ERROR":
      return {
        ...state,
        updating: false,
        updateError: action.message,
      };

    case "ARCHIVE_START":
      return {
        ...state,
        archiving: true,
      };

    case "ARCHIVE_SUCCESS":
      return {
        ...state,
        archiving: false,
      };

    case "ARCHIVE_ERROR":
      return {
        ...state,
        archiving: false,
      };

    case "RESTORE_START":
      return {
        ...state,
        restoring: true,
      };

    case "RESTORE_SUCCESS":
      return {
        ...state,
        restoring: false,
      };

    case "RESTORE_ERROR":
      return {
        ...state,
        restoring: false,
      };

    default:
      return state;
  }
}

// ============================================================================
// HOOK
// ============================================================================

export function useIdea(options: UseIdeaOptions): UseIdeaReturn {
  const { ideaId, preventFormReset = false } = options;

  const [state, dispatch] = useReducer(ideaReducer, initialState);
  const { registerListener, reportError } = useLiveStatus();

  // Track if we've loaded at least once (for skeleton timing)
  const ideaLoadedOnce = useRef(false);

  // Track preventFormReset for use inside subscription closure
  const preventFormResetRef = useRef(preventFormReset);
  useEffect(() => {
    preventFormResetRef.current = preventFormReset;
  }, [preventFormReset]);

  // ─── Real-time subscription ────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    const unregister = registerListener();
    ideaLoadedOnce.current = false;
    dispatch({ type: "LOAD_START" });

    const unsubscribe = subscribeToIdeaById(
      ideaId,
      async (nextIdea) => {
        if (!nextIdea) {
          dispatch({ type: "NOT_FOUND" });
          return;
        }

        const isFirstLoad = !ideaLoadedOnce.current;

        if (isFirstLoad) {
          // Show skeleton for minimum duration
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          ideaLoadedOnce.current = true;
          dispatch({ type: "LOAD_SUCCESS", idea: nextIdea });
        } else {
          // Subsequent updates - show progress bar briefly
          dispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          dispatch({ type: "REFRESH_SUCCESS", idea: nextIdea });
        }
      },
      (err) => {
        console.error("Idea subscription error:", err);
        dispatch({ type: "ERROR", message: "Failed to load idea." });
        reportError();
      },
    );

    return () => {
      unsubscribe();
      unregister();
    };
  }, [ideaId, registerListener, reportError]);

  // ─── Mutations ─────────────────────────────────────────────────────────────

  const updateIdea = useCallback(
    async (data: UpdateProductIdeaInput) => {
      if (!ideaId) return;

      dispatch({ type: "UPDATE_START" });

      try {
        await updateProductIdea(ideaId, data);
        dispatch({ type: "UPDATE_SUCCESS" });
        toast.success("Idea updated");
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to update idea. Please try again.";
        dispatch({ type: "UPDATE_ERROR", message });
        toast.error("Failed to update idea");
        throw err; // Re-throw so caller can handle if needed
      }
    },
    [ideaId],
  );

  const archiveIdea = useCallback(async () => {
    if (!ideaId) return;

    dispatch({ type: "ARCHIVE_START" });

    try {
      await archiveProductIdea(ideaId);
      dispatch({ type: "ARCHIVE_SUCCESS" });
      // Toast handled by caller
    } catch (err) {
      console.error("Error archiving idea:", err);
      dispatch({ type: "ARCHIVE_ERROR" });
      toast.error("Failed to archive idea");
      throw err;
    }
  }, [ideaId]);

  const unarchiveIdea = useCallback(async () => {
    if (!ideaId) return;

    dispatch({ type: "RESTORE_START" });

    try {
      await unarchiveProductIdea(ideaId);
      dispatch({ type: "RESTORE_SUCCESS" });
      // Toast handled by caller
    } catch (err) {
      console.error("Error restoring idea:", err);
      dispatch({ type: "RESTORE_ERROR" });
      toast.error("Failed to restore idea");
      throw err;
    }
  }, [ideaId]);

  // ─── Return ────────────────────────────────────────────────────────────────

  return {
    // Data
    idea: state.idea,

    // Loading states
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,

    // Computed states
    isArchived: !!state.idea?.archivedAt,

    // Mutations
    updateIdea,
    archiveIdea,
    unarchiveIdea,

    // Mutation states
    updating: state.updating,
    archiving: state.archiving,
    restoring: state.restoring,
    updateError: state.updateError,
  };
}
