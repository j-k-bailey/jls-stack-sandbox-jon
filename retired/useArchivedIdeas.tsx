import { useReducer, useEffect, useRef, useCallback } from "react";
import {
  subscribeToArchivedIdeas,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import type { ProductIdea } from "@/lib/types/productIdeas";
import { useLiveStatus } from "@/contexts/LiveStatusContext";

const MIN_SKELETON_MS = 300;

// ─── Reducer ──────────────────────────────────────────────────────────────────

type State = {
  ideas: ProductIdea[];
  loading: boolean;
  refreshing: boolean;
  fetchError: string | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; ideas: ProductIdea[] }
  | { type: "REFRESH_START" }
  | { type: "REFRESH_SUCCESS"; ideas: ProductIdea[] }
  | { type: "ERROR"; message: string }
  | { type: "OPTIMISTIC_REMOVE"; ids: Set<string> };

const initialState: State = {
  ideas: [],
  loading: true,
  refreshing: false,
  fetchError: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, refreshing: false, fetchError: null };
    case "LOAD_SUCCESS":
      return {
        ideas: action.ideas,
        loading: false,
        refreshing: false,
        fetchError: null,
      };
    case "REFRESH_START":
      return { ...state, refreshing: true };
    case "REFRESH_SUCCESS":
      return {
        ...state,
        ideas: action.ideas,
        refreshing: false,
        fetchError: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        refreshing: false,
        fetchError: action.message,
      };
    case "OPTIMISTIC_REMOVE":
      return {
        ...state,
        ideas: state.ideas.filter((i) => !action.ids.has(i.ideaId)),
      };
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useArchivedIdeas() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hasLoadedOnce = useRef(false);

  const { registerListener, reportError } = useLiveStatus();

  useEffect(() => {
    hasLoadedOnce.current = false;
    dispatch({ type: "LOAD_START" });

    const unregister = registerListener();

    const unsubscribe = subscribeToArchivedIdeas(
      async (nextIdeas) => {
        const isFirst = !hasLoadedOnce.current;

        if (isFirst) {
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          hasLoadedOnce.current = true;
          dispatch({ type: "LOAD_SUCCESS", ideas: nextIdeas });
        } else {
          dispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 0));
          dispatch({ type: "REFRESH_SUCCESS", ideas: nextIdeas });
        }
      },
      (err) => {
        console.error("Archived ideas subscription error:", err);
        dispatch({ type: "ERROR", message: "Failed to load archived ideas." });
        reportError();
      },
    );

    return () => {
      unsubscribe();
      unregister();
    };
  }, [registerListener, reportError]);

  const restore = useCallback(
    async (ideaIds: string[]): Promise<{ failed: string[] }> => {
      const failed: string[] = [];

      await Promise.all(
        ideaIds.map(async (id) => {
          try {
            await unarchiveProductIdea(id);
          } catch {
            failed.push(id);
          }
        }),
      );

      // Optimistically remove restored items — subscription will confirm
      if (failed.length < ideaIds.length) {
        const restoredSet = new Set(
          ideaIds.filter((id) => !failed.includes(id)),
        );
        dispatch({ type: "OPTIMISTIC_REMOVE", ids: restoredSet });
      }

      return { failed };
    },
    [],
  );

  return { ...state, restore };
}
