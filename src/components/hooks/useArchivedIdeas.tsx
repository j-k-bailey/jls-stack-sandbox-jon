// @/hooks/useArchivedIdeas.ts
import { useState, useCallback, useRef } from "react";
import {
  getArchivedProductIdeas,
  unarchiveProductIdea,
} from "@/lib/firestore/productIdeas";
import type { ProductIdea } from "@/lib/types/productIdeas";

export function useArchivedIdeas() {
  const [ideas, setIdeas] = useState<ProductIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const hasLoadedOnce = useRef(false);

  const load = useCallback(async () => {
    const isFirst = !hasLoadedOnce.current;
    if (isFirst) setLoading(true);
    else setRefreshing(true);
    setFetchError(null);

    try {
      const fetched = await getArchivedProductIdeas();
      setIdeas(fetched);
      hasLoadedOnce.current = true;
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "Failed to load archived ideas.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

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
      // Optimistically remove successfully restored items from local state
      if (failed.length < ideaIds.length) {
        const restoredSet = new Set(
          ideaIds.filter((id) => !failed.includes(id)),
        );
        setIdeas((prev) => prev.filter((i) => !restoredSet.has(i.ideaId)));
      }
      return { failed };
    },
    [],
  );

  return { ideas, loading, refreshing, fetchError, load, restore };
}
