// @/pages/ideas/ProductIdeasPage.tsx
import { useState, useEffect, useCallback, useRef } from "react";
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
import { getFilteredProductIdeas } from "@/lib/firestore/productIdeas";
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

const SKELETON_COUNT = 4;

export const ProductIdeasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, userProfile } = useAuth();

  const isSignedIn = !!user;
  const role = userProfile?.role;

  const canReadIdeas = canReadProductIdeas(isSignedIn);
  const canCreateIdeas = canCreateProductIdea(role, user?.uid);

  const [ideas, setIdeas] = useState<ProductIdea[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /**
   * `loading` — true only on the very first fetch (shows skeleton cards)
   * `refreshing` — true on all subsequent fetches (shows slim progress bar only)
   */
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const hasLoadedOnce = useRef(false);

  // Filters from URL
  const statusFilter = searchParams.get("status") || undefined;
  const priorityFilter = searchParams.get("priority") || undefined;
  const myIdeasFilter = searchParams.get("mine") === "true";

  const loadIdeas = useCallback(async () => {
    if (!user) return;

    const isFirst = !hasLoadedOnce.current;

    if (isFirst) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setFetchError(null);

    try {
      const filters: ProductIdeaFilters = {};
      if (statusFilter) filters.status = statusFilter as ProductIdeaStatus;
      if (priorityFilter)
        filters.priority = priorityFilter as ProductIdeaPriority;
      if (myIdeasFilter) filters.ownerId = user.uid;

      const fetchedIdeas = await getFilteredProductIdeas(filters);

      // Brief minimum delay on first load only — prevents flash of skeleton
      if (isFirst) {
        const MIN_SKELETON_MS = 300;
        await new Promise<void>((resolve) =>
          setTimeout(resolve, MIN_SKELETON_MS),
        );
      }

      setIdeas(fetchedIdeas);
      hasLoadedOnce.current = true;
    } catch (error) {
      console.error("Error loading ideas:", error);
      setFetchError(
        error instanceof Error
          ? error.message
          : "Unable to load ideas. Please try again.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user, statusFilter, priorityFilter, myIdeasFilter]);

  useEffect(() => {
    if (!user || !canReadIdeas) {
      setLoading(false);
      return;
    }
    loadIdeas();
  }, [user, canReadIdeas, loadIdeas]);

  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});

  const hasActiveFilters = statusFilter || priorityFilter || myIdeasFilter;

  // ─── Auth gate ─────────────────────────────────────────────────────────────
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

  // ─── Render ────────────────────────────────────────────────────────────────
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
      </Card>

      {/* Ideas Grid */}
      <div className="flex flex-col gap-stack">
        {/* Non-disruptive refresh indicator — shown only on filter changes / reloads */}
        <RefreshingIndicator active={refreshing} className="-mt-stack" />

        {/* Fetch error */}
        {fetchError && !loading && (
          <FetchErrorBanner message={fetchError} onRetry={loadIdeas} />
        )}

        {loading ? (
          /* First-load skeletons */
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <IdeaCardSkeleton key={i} />
          ))
        ) : ideas.length === 0 && !fetchError ? (
          /* Empty state */
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
          /* Content — stays visible during background refreshes (opacity hint) */
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
          <Link to="/ideas/archived" className="caption text-muted-foreground ">
            View archived ideas →
          </Link>
        </Button>
      </div>
    </div>
  );
};
