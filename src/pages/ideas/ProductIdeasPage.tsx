// @/pages/ideas/ProductIdeasPage.tsx
import { useReducer, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Plus, Filter, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/productIdea/EmptyState";
import { IdeaCard, IdeaCardSkeleton } from "@/components/productIdea/IdeaCard";
import { FetchErrorBanner } from "@/components/common/FetchErrorBanner";
import { RefreshingIndicator } from "@/components/ui/RefreshingIndicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { SimpleSignIn } from "@/components/common/SimpleSignIn";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeToActiveFilteredIdeas } from "@/lib/firestore/productIdeas";
import type {
  ProductIdea,
  ProductIdeaFilters,
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";
import { IDEA_STATUSES, IDEA_PRIORITIES } from "@/lib/zodSchemas/productIdea";
import {
  canReadProductIdeas,
  canCreateProductIdea,
} from "@/lib/permissions/productIdeas";
import { ProgressBar } from "@/components/common/ProgressBar";

const SKELETON_COUNT = 4;
const MIN_SKELETON_MS = 300;

// ─── Reducer ───────────────────────────────────────────────────────────────

type PageState = {
  ideas: ProductIdea[];
  loading: boolean; // true only on very first load → skeletons
  filtering: boolean; // true when filter changed, data already loaded → bar
  refreshing: boolean; // true for brief pulse on live subscription update → bar
  fetchError: string | null;
};

type PageAction =
  | { type: "SUBSCRIBE_START_COLD" } // first ever load
  | { type: "SUBSCRIBE_START_WARM" } // filter changed, already have data
  | { type: "LOAD_SUCCESS"; ideas: ProductIdea[] }
  | { type: "REFRESH_START" } // live update incoming
  | { type: "REFRESH_SUCCESS"; ideas: ProductIdea[] }
  | { type: "ERROR"; message: string }
  | { type: "AUTH_UNAVAILABLE" };

const initialState: PageState = {
  ideas: [],
  loading: true,
  filtering: false,
  refreshing: false,
  fetchError: null,
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "SUBSCRIBE_START_COLD":
      return {
        ...state,
        loading: true,
        filtering: false,
        refreshing: false,
        fetchError: null,
      };
    case "SUBSCRIBE_START_WARM":
      return {
        ...state,
        loading: false,
        filtering: true,
        refreshing: false,
        fetchError: null,
      };
    case "LOAD_SUCCESS":
      return {
        ideas: action.ideas,
        loading: false,
        filtering: false,
        refreshing: false,
        fetchError: null,
      };
    case "REFRESH_START":
      return { ...state, refreshing: true };
    case "REFRESH_SUCCESS":
      return {
        ...state,
        ideas: action.ideas,
        filtering: false,
        refreshing: false,
        fetchError: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        filtering: false,
        refreshing: false,
        fetchError: action.message,
      };
    case "AUTH_UNAVAILABLE":
      return { ...state, loading: false };
  }
}

// ─── Component ────────────────────────────────────────────────────────────

export const ProductIdeasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, userProfile } = useAuth();

  const isSignedIn = !!user;
  const role = userProfile?.role;

  const canReadIdeas = canReadProductIdeas(isSignedIn);
  const canCreateIdeas = canCreateProductIdea(role, user?.uid);

  const [state, dispatch] = useReducer(pageReducer, initialState);
  const { ideas, loading, filtering, refreshing, fetchError } = state;

  const hasLoadedOnce = useRef(false);

  // Filters from URL
  const statusFilter = searchParams.get("status") || undefined;
  const priorityFilter = searchParams.get("priority") || undefined;
  const myIdeasFilter = searchParams.get("mine") === "true";

  const hasActiveFilters = !!(statusFilter || priorityFilter || myIdeasFilter);

  // ─── Subscription effect ─────────────────────────────────────────────────
  useEffect(() => {
    if (!user || !canReadIdeas) {
      dispatch({ type: "AUTH_UNAVAILABLE" });
      return;
    }

    // Cold if this is the very first load, warm if filters changed
    const isCold = !hasLoadedOnce.current;
    dispatch({
      type: isCold ? "SUBSCRIBE_START_COLD" : "SUBSCRIBE_START_WARM",
    });

    const filters: ProductIdeaFilters = {};
    if (statusFilter) filters.status = statusFilter as ProductIdeaStatus;
    if (priorityFilter)
      filters.priority = priorityFilter as ProductIdeaPriority;
    if (myIdeasFilter) filters.ownerId = user.uid;

    const unsubscribe = subscribeToActiveFilteredIdeas(
      filters,
      async (nextIdeas) => {
        if (!hasLoadedOnce.current) {
          // First emission on cold load — honour skeleton delay
          await new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_SKELETON_MS),
          );
          hasLoadedOnce.current = true;
          dispatch({ type: "LOAD_SUCCESS", ideas: nextIdeas });
        } else {
          // Subsequent emissions — pulse the refresh bar briefly
          dispatch({ type: "REFRESH_START" });
          await new Promise<void>((resolve) => setTimeout(resolve, 400));
          dispatch({ type: "REFRESH_SUCCESS", ideas: nextIdeas });
        }
      },
      (err) => {
        console.error("Subscription error:", err);
        dispatch({
          type: "ERROR",
          message: "Failed to load ideas in real time.",
        });
      },
    );

    return () => {
      // Don't reset hasLoadedOnce here — we want warm starts on filter changes
      unsubscribe();
    };
  }, [user, canReadIdeas, statusFilter, priorityFilter, myIdeasFilter]);

  // ─── Filter helpers ───────────────────────────────────────────────────────
  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  // ─── Auth gate ────────────────────────────────────────────────────────────
  if (!canReadIdeas) {
    return (
      <div className="p-inset-2xl space-y-section container">
        <PageHeader pageTitle="Product Ideas" />
        <Card>
          <CardContent>
            <SimpleSignIn />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="p-inset-2xl space-y-section container">
      <PageHeader
        pageTitle="Product Ideas"
        pageDescription="Track and manage product ideas from concept to launch"
        actions={
          canCreateIdeas ? (
            <Button asChild>
              <Link to="/ideas/new">
                <Plus className="h-4 w-4 mr-2" />
                New Idea
              </Link>
            </Button>
          ) : undefined
        }
      />

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-stack">
            <div className="flex items-center gap-inline">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Filters</span>
            </div>

            <ResponsiveGrid maxColumns="three" className="gap-stack">
              <Select
                value={statusFilter || "all"}
                onValueChange={(value) =>
                  handleFilterChange("status", value === "all" ? null : value)
                }
              >
                <SelectTrigger aria-label="Filter by status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {IDEA_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={priorityFilter || "all"}
                onValueChange={(value) =>
                  handleFilterChange("priority", value === "all" ? null : value)
                }
              >
                <SelectTrigger aria-label="Filter by priority">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  {IDEA_PRIORITIES.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={myIdeasFilter ? "default" : "outline"}
                onClick={() =>
                  handleFilterChange("mine", myIdeasFilter ? null : "true")
                }
              >
                My Ideas
              </Button>
            </ResponsiveGrid>

            {hasActiveFilters && (
              <Button
                variant="neutral"
                size="sm"
                onClick={clearFilters}
                className="mr-auto"
              >
                Clear all
              </Button>
            )}
          </div>
        </CardContent>
        <ProgressBar active={filtering || refreshing} />
      </Card>

      {/* Ideas Grid */}
      <div className="flex flex-col gap-stack">
        <RefreshingIndicator active={refreshing} className="-mt-stack" />

        {fetchError && !loading && <FetchErrorBanner message={fetchError} />}

        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <IdeaCardSkeleton key={i} />
          ))
        ) : ideas.length === 0 && !fetchError ? (
          <EmptyState
            icon={<Lightbulb className="h-12 w-12" />}
            title={hasActiveFilters ? "No ideas match filters" : "No ideas yet"}
            description={
              hasActiveFilters
                ? "Try adjusting your filters to see more ideas"
                : canCreateIdeas
                  ? "Create your first product idea to get started"
                  : "You don't have permission to create product ideas"
            }
            action={
              hasActiveFilters
                ? {
                    label: "Clear filters",
                    onClick: clearFilters,
                    variant: "neutral",
                  }
                : canCreateIdeas
                  ? {
                      label: "Create Idea",
                      onClick: () => null,
                      variant: "primary",
                    }
                  : undefined
            }
          />
        ) : (
          <div
            className="flex flex-col gap-stack transition-opacity duration-200"
            style={{ opacity: refreshing ? 0.6 : 1 }}
          >
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.ideaId}
                idea={idea}
                isOwner={idea.ownerId === user?.uid}
                maxTags={5}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {canCreateIdeas ? (
          <Button asChild>
            <Link to="/ideas/new">
              <Plus className="h-4 w-4 mr-2" />
              New Idea
            </Link>
          </Button>
        ) : (
          <span />
        )}

        <Button asChild variant="link" className="ml-auto mr-0 p-0">
          <Link to="/ideas/archived" className="caption text-muted-foreground">
            View archived ideas →
          </Link>
        </Button>
      </div>
    </div>
  );
};
