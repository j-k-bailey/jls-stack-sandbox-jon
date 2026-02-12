import { Link } from "react-router-dom";
import { Plus, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IdeaCard } from "@/components/productIdea/IdeaCard";
import { SimpleSignIn } from "@/components/common/SimpleSignIn";
import { useAuth } from "@/contexts/AuthContext";
import {
  canReadProductIdeas,
  canCreateProductIdea,
} from "@/lib/permissions/productIdeas";
import { IdeasListSkeleton } from "@/features/ideas/components/skeletons/IdeasListSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import {
  useDevState,
  DevStateControls,
  applyDevStateOverrides,
} from "@/hooks/useDevState";
import { useIdeasFilters } from "@/features/ideas/hooks/useIdeasFilters";
import { useIdeasList } from "@/features/ideas/hooks/useIdeasList";
import { IdeasFiltersBar } from "@/features/ideas/components/IdeasFiltersBar";

// ============================================================================
// CONSTANTS
// ============================================================================

const PAGE_SIZE = 15;

// ============================================================================
// COMPONENT
// ============================================================================

export const ProductIdeasPage = () => {
  const [devState, setDevState] = useDevState();
  const { filters, hasActiveFilters, updateFilter, resetFilters } =
    useIdeasFilters();

  const { user, userProfile } = useAuth();

  const isSignedIn = !!user;
  const role = userProfile?.role;

  const canReadIdeas = canReadProductIdeas(isSignedIn);
  const canCreateIdeas = canCreateProductIdea(role, user?.uid);

  // ─── Ideas List Data ──────────────────────────────────────────────────────

  const {
    items: ideas,
    hasMore,
    initialLoading,
    filtering,
    loadingMore,
    error: fetchError,
    reload,
  } = useIdeasList({
    filters,
    userId: user?.uid,
    pageSize: PAGE_SIZE,
    enabled: canReadIdeas && devState === "normal",
    enableInfiniteScroll: true,
  });

  // ─── Dev State Override ───────────────────────────────────────────────────

  const displayState = applyDevStateOverrides(
    devState,
    { initialLoading, filtering, fetchError, ideas },
    {
      loading: {
        initialLoading: true,
        filtering: false,
        fetchError: null,
        ideas: [],
      },
      filtering: {
        initialLoading: false,
        filtering: true,
        fetchError: null,
      },
      error: {
        initialLoading: false,
        filtering: false,
        fetchError: "Failed to load ideas. Please try again.",
        ideas: [],
      },
      empty: {
        initialLoading: false,
        filtering: false,
        fetchError: null,
        ideas: [],
      },
      "empty-filtered": {
        initialLoading: false,
        filtering: false,
        fetchError: null,
        ideas: [],
      },
    },
  );

  const displayHasActiveFilters =
    devState === "empty-filtered" ? true : hasActiveFilters;

  // ─── Auth Gate ────────────────────────────────────────────────────────────

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
      {/* ─── Header ─────────────────────────────────────────────────── */}
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

      <DevStateControls currentState={devState} onStateChange={setDevState} />

      {/* ─── Search & Filters ───────────────────────────────────────── */}
      <IdeasFiltersBar
        filters={filters}
        onFilterChange={updateFilter}
        onClearAll={resetFilters}
        isFiltering={displayState.filtering}
        hasActiveFilters={hasActiveFilters}
      />

      {/* ─── Ideas List ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-stack">
        {displayState.fetchError && !displayState.initialLoading && (
          <ErrorState message={displayState.fetchError} onRetry={reload} />
        )}

        {displayState.initialLoading ? (
          <IdeasListSkeleton />
        ) : displayState.ideas.length === 0 && !displayState.fetchError ? (
          displayHasActiveFilters ? (
            <EmptyState
              icon={<Lightbulb className="h-12 w-12" />}
              title="No ideas match filters"
              description="Try adjusting your filters or search to see more ideas"
              actionLabel="Clear filters"
              onAction={resetFilters}
            />
          ) : (
            <EmptyState
              icon={<Lightbulb className="h-12 w-12" />}
              title="No ideas yet"
              description={
                canCreateIdeas
                  ? "Create your first product idea to get started"
                  : "You don't have permission to create product ideas"
              }
              customAction={
                canCreateIdeas ? (
                  <Button asChild>
                    <Link to="/ideas/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Idea
                    </Link>
                  </Button>
                ) : undefined
              }
            />
          )
        ) : (
          <>
            <div className="flex flex-col gap-stack">
              {displayState.ideas.map((idea) => (
                <IdeaCard
                  key={idea.ideaId}
                  idea={idea}
                  isOwner={idea.ownerId === user?.uid}
                  isArchived={!!idea.archivedAt}
                  maxTags={5}
                />
              ))}
            </div>

            {/* Loading indicator when fetching more */}
            {loadingMore && (
              <div className="flex justify-center py-stack">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span className="caption">Loading more ideas...</span>
                </div>
              </div>
            )}

            {/* End of list indicator */}
            {!hasMore && ideas.length > 0 && (
              <div className="flex justify-center py-stack">
                <span className="caption text-muted-foreground">
                  You've reached the end of the list
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── Footer Actions ────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-stack border-t border-border">
        {canCreateIdeas ? (
          <Button asChild variant="outline">
            <Link to="/ideas/new">
              <Plus className="h-4 w-4 mr-2" />
              New Idea
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
