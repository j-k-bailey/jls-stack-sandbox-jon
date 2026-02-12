import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export type IdeasFilterState = {
  q: string;
  status: ProductIdeaStatus | "all";
  priority: ProductIdeaPriority | "all";
  tag: string;
  mine: boolean;
  archived: boolean;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULTS: IdeasFilterState = {
  q: "",
  status: "all",
  priority: "all",
  tag: "all",
  mine: false,
  archived: false,
};

// ============================================================================
// HELPERS
// ============================================================================

function readBool(value: string | null, fallback: boolean): boolean {
  if (value === null) return fallback;
  return value === "true";
}

// ============================================================================
// HOOK
// ============================================================================

export function useIdeasFilters() {
  const [params, setParams] = useSearchParams();

  // Parse current filter state from URL params
  const filters: IdeasFilterState = useMemo(() => {
    return {
      q: params.get("q") ?? DEFAULTS.q,
      status: (params.get("status") as ProductIdeaStatus) ?? DEFAULTS.status,
      priority:
        (params.get("priority") as ProductIdeaPriority) ?? DEFAULTS.priority,
      tag: params.get("tag") ?? DEFAULTS.tag,
      mine: readBool(params.get("mine"), DEFAULTS.mine),
      archived: readBool(params.get("archived"), DEFAULTS.archived),
    };
  }, [params]);

  // Check if any filters are active (non-default)
  const hasActiveFilters = useMemo(() => {
    return (
      filters.q !== DEFAULTS.q ||
      filters.status !== DEFAULTS.status ||
      filters.priority !== DEFAULTS.priority ||
      filters.tag !== DEFAULTS.tag ||
      filters.mine !== DEFAULTS.mine ||
      filters.archived !== DEFAULTS.archived
    );
  }, [filters]);

  // Update specific filter(s)
  function setFilter(patch: Partial<IdeasFilterState>) {
    const next = { ...filters, ...patch };

    // Keep URLs tidy: only store non-default values
    const nextParams = new URLSearchParams();

    if (next.q.trim()) nextParams.set("q", next.q.trim());
    if (next.status !== "all") nextParams.set("status", next.status);
    if (next.priority !== "all") nextParams.set("priority", next.priority);
    if (next.tag !== "all") nextParams.set("tag", next.tag);
    if (next.mine) nextParams.set("mine", "true");
    if (next.archived) nextParams.set("archived", "true");

    setParams(nextParams, { replace: true });
  }

  // Reset all filters to defaults
  function resetFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  // Helper to update a single filter key
  function updateFilter<K extends keyof IdeasFilterState>(
    key: K,
    value: IdeasFilterState[K],
  ) {
    setFilter({ [key]: value });
  }

  return {
    filters,
    hasActiveFilters,
    setFilter,
    updateFilter,
    resetFilters,
  };
}
