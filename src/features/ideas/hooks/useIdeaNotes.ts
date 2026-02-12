import { useReducer, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  subscribeToActiveIdeaNotes,
  subscribeToArchivedIdeaNotes,
  createProductIdeaNote,
  updateProductIdeaNote,
  archiveProductIdeaNote,
} from "@/lib/firestore/productIdeas";
import type {
  ProductIdeaNote,
  CreateProductIdeaNoteInput,
  UpdateProductIdeaNoteInput,
} from "@/lib/types/productIdeas";
import { useLiveStatus } from "@/contexts/LiveStatusContext";

// ============================================================================
// CONSTANTS
// ============================================================================

const MIN_SKELETON_MS = 300;

// ============================================================================
// TYPES
// ============================================================================

export interface UseIdeaNotesOptions {
  ideaId: string | undefined;
  archived?: boolean; // When true, subscribes to archived notes instead
}

export interface UseIdeaNotesReturn {
  // Data
  notes: ProductIdeaNote[];

  // Loading states
  loading: boolean;
  refreshing: boolean;
  error: string | null;

  // Mutations
  createNote: (
    input: CreateProductIdeaNoteInput,
    userId: string,
  ) => Promise<void>;
  updateNote: (noteId: string, body: string) => Promise<void>;
  archiveNote: (noteId: string) => Promise<void>;

  // Mutation states
  creating: boolean;
  updating: boolean;
  archiving: boolean;
}

// ============================================================================
// REDUCER
// ============================================================================

type NotesState = {
  notes: ProductIdeaNote[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  creating: boolean;
  updating: boolean;
  archiving: boolean;
};

type NotesAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; notes: ProductIdeaNote[] }
  | { type: "REFRESH_START" }
  | { type: "REFRESH_SUCCESS"; notes: ProductIdeaNote[] }
  | { type: "ERROR"; message: string }
  | { type: "CREATE_START" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_ERROR" }
  | { type: "UPDATE_START" }
  | { type: "UPDATE_SUCCESS" }
  | { type: "UPDATE_ERROR" }
  | { type: "ARCHIVE_START" }
  | { type: "ARCHIVE_SUCCESS" }
  | { type: "ARCHIVE_ERROR" };

const initialState: NotesState = {
  notes: [],
  loading: true,
  refreshing: false,
  error: null,
  creating: false,
  updating: false,
  archiving: false,
};

function notesReducer(state: NotesState, action: NotesAction): NotesState {
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
        notes: action.notes,
        loading: false,
        refreshing: false,
        error: null,
      };

    case "REFRESH_START":
      return {
        ...state,
        refreshing: true,
      };

    case "REFRESH_SUCCESS":
      return {
        ...state,
        notes: action.notes,
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

    case "CREATE_START":
      return {
        ...state,
        creating: true,
      };

    case "CREATE_SUCCESS":
      return {
        ...state,
        creating: false,
      };

    case "CREATE_ERROR":
      return {
        ...state,
        creating: false,
      };

    case "UPDATE_START":
      return {
        ...state,
        updating: true,
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        updating: false,
      };

    case "UPDATE_ERROR":
      return {
        ...state,
        updating: false,
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

    default:
      return state;
  }
}

// ============================================================================
// HOOK
// ============================================================================

export function useIdeaNotes(options: UseIdeaNotesOptions): UseIdeaNotesReturn {
  const { ideaId, archived = false } = options;

  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { registerListener, reportError } = useLiveStatus();

  // Track if we've loaded at least once (for skeleton timing)
  const notesLoadedOnce = useRef(false);

  // ─── Real-time subscription ────────────────────────────────────────────────

  useEffect(() => {
    if (!ideaId) return;

    notesLoadedOnce.current = false;
    dispatch({ type: "LOAD_START" });

    const unregister = registerListener();

    const subscribe = archived
      ? subscribeToArchivedIdeaNotes
      : subscribeToActiveIdeaNotes;

    const unsubscribe = subscribe(
      ideaId,
      async (nextNotes) => {
        const isFirstLoad = !notesLoadedOnce.current;

        if (isFirstLoad) {
          // Show skeleton for minimum duration
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          notesLoadedOnce.current = true;
          dispatch({ type: "LOAD_SUCCESS", notes: nextNotes });
        } else {
          // Subsequent updates - show progress bar briefly
          dispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          dispatch({ type: "REFRESH_SUCCESS", notes: nextNotes });
        }
      },
      (err) => {
        console.error("Notes subscription error:", err);
        dispatch({
          type: "ERROR",
          message: "Failed to load notes in real time.",
        });
        reportError();
      },
    );

    return () => {
      unsubscribe();
      unregister();
    };
  }, [ideaId, archived, registerListener, reportError]);

  // ─── Mutations ─────────────────────────────────────────────────────────────

  const createNote = useCallback(
    async (input: CreateProductIdeaNoteInput, userId: string) => {
      if (!ideaId) return;

      dispatch({ type: "CREATE_START" });

      try {
        await createProductIdeaNote(ideaId, input, userId);
        dispatch({ type: "CREATE_SUCCESS" });
        toast.success("Note added");
      } catch (err) {
        console.error("Error creating note:", err);
        dispatch({ type: "CREATE_ERROR" });
        toast.error("Failed to add note");
        throw err;
      }
    },
    [ideaId],
  );

  const updateNote = useCallback(
    async (noteId: string, body: string) => {
      if (!ideaId) return;

      dispatch({ type: "UPDATE_START" });

      try {
        const updateData: UpdateProductIdeaNoteInput = { body };
        await updateProductIdeaNote(ideaId, noteId, updateData);
        dispatch({ type: "UPDATE_SUCCESS" });
        toast.success("Note updated");
      } catch (err) {
        console.error("Error updating note:", err);
        dispatch({ type: "UPDATE_ERROR" });
        toast.error("Failed to update note");
        throw err;
      }
    },
    [ideaId],
  );

  const archiveNote = useCallback(
    async (noteId: string) => {
      if (!ideaId) return;

      dispatch({ type: "ARCHIVE_START" });

      try {
        await archiveProductIdeaNote(ideaId, noteId);
        dispatch({ type: "ARCHIVE_SUCCESS" });
        toast.success("Note removed");
      } catch (err) {
        console.error("Error archiving note:", err);
        dispatch({ type: "ARCHIVE_ERROR" });
        toast.error("Failed to remove note");
        throw err;
      }
    },
    [ideaId],
  );

  // ─── Return ────────────────────────────────────────────────────────────────

  return {
    // Data
    notes: state.notes,

    // Loading states
    loading: state.loading,
    refreshing: state.refreshing,
    error: state.error,

    // Mutations
    createNote,
    updateNote,
    archiveNote,

    // Mutation states
    creating: state.creating,
    updating: state.updating,
    archiving: state.archiving,
  };
}
