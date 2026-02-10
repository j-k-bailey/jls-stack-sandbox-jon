// @/hooks/usePageData.ts
import { useState, useCallback, useRef } from "react";

interface UsePageDataOptions {
  /** If true, show full skeleton on first load only. Subsequent loads are non-disruptive. */
  skeletonOnFirstLoad?: boolean;
}

interface UsePageDataReturn<T> {
  data: T | null;
  loading: boolean; // True only on first load (shows skeletons)
  refreshing: boolean; // True on subsequent loads (non-disruptive spinner)
  error: string | null;
  setError: (error: string | null) => void;
  load: (fetcher: () => Promise<T>) => Promise<void>;
  setData: (data: T) => void;
}

/**
 * Standardized page-level data fetching hook.
 *
 * - First load: sets `loading = true` (shows skeletons / full loading state)
 * - Subsequent loads: sets `refreshing = true` (non-disruptive spinner only)
 * - Surfaces errors as `error` string
 * - Clears error on successful load
 */
export function usePageData<T>(
  options: UsePageDataOptions = {},
): UsePageDataReturn<T> {
  const { skeletonOnFirstLoad = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasLoadedOnce = useRef(false);

  const load = useCallback(
    async (fetcher: () => Promise<T>) => {
      const isFirst = !hasLoadedOnce.current;

      if (isFirst && skeletonOnFirstLoad) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      try {
        const result = await fetcher();
        setData(result);
        setError(null);
        hasLoadedOnce.current = true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [skeletonOnFirstLoad],
  );

  return { data, loading, refreshing, error, setError, load, setData };
}
