import { useCallback, useEffect, useReducer, useRef } from "react";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import type { IdeasFilterState } from "./useIdeasFilters";
import type {
  ProductIdea,
  ProductIdeaFilters,
  ProductIdeaPriority,
  ProductIdeaStatus,
} from "@/lib/types/productIdeas";
import { fetchIdeasPage } from "@/lib/firestore/productIdeas";

// ============================================================================
// CONSTANTS
// ============================================================================

const MIN_SKELETON_MS = 400;
const MIN_FILTER_MS = 400;
const SCROLL_THRESHOLD = 400; // px from bottom to trigger load

// ============================================================================
// TYPES
// ============================================================================

type IdeasListState = {
  items: ProductIdea[];
  cursor: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  initialLoading: boolean;
  filtering: boolean;
  loadingMore: boolean;
  error: string | null;
};

type IdeasListAction =
  | { type: "FETCH_START_INITIAL" }
  | { type: "FETCH_START_FILTER" }
  | { type: "FETCH_START_MORE" }
  | {
      type: "FETCH_SUCCESS";
      items: ProductIdea[];
      cursor: QueryDocumentSnapshot<DocumentData> | null;
      pageSize: number;
      append?: boolean;
    }
  | { type: "FETCH_ERROR"; message: string }
  | { type: "RESET" };

// ============================================================================
// REDUCER
// ============================================================================

const initialState: IdeasListState = {
  items: [],
  cursor: null,
  hasMore: false,
  initialLoading: true,
  filtering: false,
  loadingMore: false,
  error: null,
};

function ideasListReducer(
  state: IdeasListState,
  action: IdeasListAction,
): IdeasListState {
  switch (action.type) {
    case "FETCH_START_INITIAL":
      return {
        ...state,
        initialLoading: true,
        filtering: false,
        loadingMore: false,
        error: null,
      };

    case "FETCH_START_FILTER":
      return {
        ...state,
        initialLoading: false,
        filtering: true,
        loadingMore: false,
        error: null,
      };

    case "FETCH_START_MORE":
      return {
        ...state,
        initialLoading: false,
        filtering: false,
        loadingMore: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        items: action.append ? [...state.items, ...action.items] : action.items,
        cursor: action.cursor,
        hasMore: action.items.length === action.pageSize,
        initialLoading: false,
        filtering: false,
        loadingMore: false,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        initialLoading: false,
        filtering: false,
        loadingMore: false,
        error: action.message,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

// ============================================================================
// HELPER
// ============================================================================

/**
 * Convert filter state to API filters
 */
function buildApiFilters(
  filters: IdeasFilterState,
  userId?: string,
): ProductIdeaFilters {
  const apiFilters: ProductIdeaFilters = {
    archived: filters.archived,
  };

  if (filters.status !== "all") {
    apiFilters.status = filters.status as ProductIdeaStatus;
  }

  if (filters.priority !== "all") {
    apiFilters.priority = filters.priority as ProductIdeaPriority;
  }

  if (filters.tag !== "all") {
    apiFilters.tag = filters.tag;
  }

  if (filters.mine && userId) {
    apiFilters.ownerId = userId;
  }

  if (filters.q.trim()) {
    apiFilters.q = filters.q.trim();
  }

  return apiFilters;
}

// ============================================================================
// HOOK
// ============================================================================

type UseIdeasListOptions = {
  filters: IdeasFilterState;
  userId?: string;
  pageSize?: number;
  enabled?: boolean;
  enableInfiniteScroll?: boolean;
  scrollThreshold?: number;
};

export function useIdeasList({
  filters,
  userId,
  pageSize = 15,
  enabled = true,
  enableInfiniteScroll = false,
  scrollThreshold = SCROLL_THRESHOLD,
}: UseIdeasListOptions) {
  const [state, dispatch] = useReducer(ideasListReducer, initialState);
  const hasLoadedOnce = useRef(false);
  const isLoadingRef = useRef(false);

  // Track loading state for infinite scroll
  useEffect(() => {
    isLoadingRef.current = state.loadingMore;
  }, [state.loadingMore]);

  // ─── Load First Page ──────────────────────────────────────────────────────

  const loadFirstPage = useCallback(async () => {
    if (!enabled) return;

    const isCold = !hasLoadedOnce.current;

    if (isCold) {
      dispatch({ type: "FETCH_START_INITIAL" });
    } else {
      dispatch({ type: "FETCH_START_FILTER" });
    }

    try {
      const apiFilters = buildApiFilters(filters, userId);
      const minDelay = isCold ? MIN_SKELETON_MS : MIN_FILTER_MS;

      const [result] = await Promise.all([
        fetchIdeasPage({
          filters: apiFilters,
          pageSize,
          cursor: null,
        }),
        new Promise<void>((resolve) => setTimeout(resolve, minDelay)),
      ]);

      hasLoadedOnce.current = true;

      dispatch({
        type: "FETCH_SUCCESS",
        items: result.items,
        cursor: result.nextCursor,
        pageSize,
        append: false,
      });
    } catch (err) {
      console.error("Failed to load ideas:", err);
      dispatch({
        type: "FETCH_ERROR",
        message: "Failed to load ideas. Please try again.",
      });
    }
  }, [enabled, filters, userId, pageSize]);

  // ─── Load More (Pagination) ───────────────────────────────────────────────

  const loadMore = useCallback(async () => {
    if (!enabled || !state.cursor || state.loadingMore) return;

    dispatch({ type: "FETCH_START_MORE" });

    try {
      const apiFilters = buildApiFilters(filters, userId);

      const result = await fetchIdeasPage({
        filters: apiFilters,
        pageSize,
        cursor: state.cursor,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        items: result.items,
        cursor: result.nextCursor,
        pageSize,
        append: true,
      });
    } catch (err) {
      console.error("Failed to load more ideas:", err);
      dispatch({
        type: "FETCH_ERROR",
        message: "Failed to load more ideas. Please try again.",
      });
    }
  }, [enabled, state.cursor, state.loadingMore, filters, userId, pageSize]);

  // ─── Reset ────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    hasLoadedOnce.current = false;
  }, []);

  // ─── Auto-load on Filter Change ───────────────────────────────────────────

  useEffect(() => {
    if (enabled) {
      loadFirstPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.q,
    filters.status,
    filters.priority,
    filters.tag,
    filters.mine,
    filters.archived,
    enabled,
    // Note: We intentionally don't include loadFirstPage to avoid infinite loops
    // The callback is stable enough and filters changing is what matters
  ]);

  // ─── Infinite Scroll ──────────────────────────────────────────────────────

  useEffect(() => {
    if (
      !enableInfiniteScroll ||
      !state.hasMore ||
      state.initialLoading ||
      state.filtering
    ) {
      return;
    }

    const handleScroll = () => {
      // Don't trigger if already loading
      if (isLoadingRef.current) {
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Trigger load when within threshold of bottom
      if (distanceFromBottom < scrollThreshold) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    enableInfiniteScroll,
    state.hasMore,
    state.initialLoading,
    state.filtering,
    scrollThreshold,
    loadMore,
  ]);

  // ─── Return API ───────────────────────────────────────────────────────────

  return {
    // Data
    items: state.items,
    cursor: state.cursor,
    hasMore: state.hasMore,

    // Loading states
    initialLoading: state.initialLoading,
    filtering: state.filtering,
    loadingMore: state.loadingMore,
    isLoading: state.initialLoading || state.filtering || state.loadingMore,

    // Error
    error: state.error,

    // Actions
    reload: loadFirstPage,
    loadMore,
    reset,
  };
}
