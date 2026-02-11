import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Plus,
  Lightbulb,
  Search,
  X,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdeaCard } from "@/components/productIdea/IdeaCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SimpleSignIn } from "@/components/common/SimpleSignIn";
import { useAuth } from "@/contexts/AuthContext";
import { fetchIdeasPage } from "@/lib/firestore/productIdeas";
import type {
  ProductIdea,
  ProductIdeaFilters,
  ProductIdeaStatus,
} from "@/lib/types/productIdeas";
import { IDEA_STATUSES } from "@/lib/zodSchemas/productIdea";
import { ideaTagOptions } from "@/constants/productIdeaTags";
import {
  canReadProductIdeas,
  canCreateProductIdea,
} from "@/lib/permissions/productIdeas";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IdeasListSkeleton } from "@/components/states/IdeasListSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import {
  useDevState,
  DevStateControls,
  applyDevStateOverrides,
} from "@/hooks/useDevState";

// ============================================================================
// CONSTANTS
// ============================================================================

const MIN_SKELETON_MS = 400;
const MIN_FILTER_MS = 400;
const PAGE_SIZE = 15;
const SCROLL_THRESHOLD = 400; // px from bottom to trigger load

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

type PageState = {
  ideas: ProductIdea[];
  cursor: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  initialLoading: boolean;
  filtering: boolean;
  loadingMore: boolean;
  fetchError: string | null;
};

type PageAction =
  | { type: "FETCH_START_INITIAL" }
  | { type: "FETCH_START_FILTER" }
  | { type: "FETCH_START_MORE" }
  | {
      type: "FETCH_SUCCESS";
      ideas: ProductIdea[];
      cursor: QueryDocumentSnapshot<DocumentData> | null;
      append?: boolean;
    }
  | { type: "ERROR"; message: string }
  | { type: "AUTH_UNAVAILABLE" };

const initialState: PageState = {
  ideas: [],
  cursor: null,
  hasMore: false,
  initialLoading: true,
  filtering: false,
  loadingMore: false,
  fetchError: null,
};

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "FETCH_START_INITIAL":
      return {
        ...state,
        initialLoading: true,
        filtering: false,
        loadingMore: false,
        fetchError: null,
      };
    case "FETCH_START_FILTER":
      return {
        ...state,
        initialLoading: false,
        filtering: true,
        loadingMore: false,
        fetchError: null,
      };
    case "FETCH_START_MORE":
      return {
        ...state,
        initialLoading: false,
        filtering: false,
        loadingMore: true,
        fetchError: null,
      };
    case "FETCH_SUCCESS":
      return {
        ideas: action.append ? [...state.ideas, ...action.ideas] : action.ideas,
        cursor: action.cursor,
        hasMore: action.ideas.length === PAGE_SIZE,
        initialLoading: false,
        filtering: false,
        loadingMore: false,
        fetchError: null,
      };
    case "ERROR":
      return {
        ...state,
        initialLoading: false,
        filtering: false,
        loadingMore: false,
        fetchError: action.message,
      };
    case "AUTH_UNAVAILABLE":
      return {
        ...state,
        initialLoading: false,
        filtering: false,
        loadingMore: false,
      };
    default:
      return state;
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export const ProductIdeasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [devState, setDevState] = useDevState();

  const { user, userProfile } = useAuth();

  const isSignedIn = !!user;
  const role = userProfile?.role;

  const canReadIdeas = canReadProductIdeas(isSignedIn);
  const canCreateIdeas = canCreateProductIdea(role, user?.uid);

  const [state, dispatch] = useReducer(pageReducer, initialState);
  const {
    ideas,
    cursor,
    hasMore,
    initialLoading,
    filtering,
    loadingMore,
    fetchError,
  } = state;

  const hasLoadedOnce = useRef(false);

  // ─── URL Filter State ─────────────────────────────────────────────────────

  const statusFilter = searchParams.get("status") || undefined;
  const tagFilter = searchParams.get("tag") || undefined;
  const myIdeasFilter = searchParams.get("mine") === "true";
  const archivedFilter = searchParams.get("archived") === "true";

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const searchQuery = searchParams.get("q") || undefined;

  const hasActiveFilters = !!(
    statusFilter ||
    tagFilter ||
    myIdeasFilter ||
    archivedFilter ||
    searchQuery
  );

  // ─── Debounced Search ─────────────────────────────────────────────────────

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          const trimmed = searchInput.trim();
          if (trimmed) next.set("q", trimmed);
          else next.delete("q");

          return next;
        },
        { replace: true },
      );
    }, 300);

    return () => clearTimeout(t);
  }, [searchInput, setSearchParams]);

  // ─── Data Fetching ────────────────────────────────────────────────────────

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
      filtering: { initialLoading: false, filtering: true, fetchError: null },
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

  const fetchIdeas = useCallback(
    async (loadMore = false) => {
      if (!user || !canReadIdeas) {
        dispatch({ type: "AUTH_UNAVAILABLE" });
        return;
      }

      const isCold = !hasLoadedOnce.current;
      if (isCold) {
        dispatch({ type: "FETCH_START_INITIAL" });
      } else if (loadMore) {
        dispatch({ type: "FETCH_START_MORE" });
      } else {
        dispatch({ type: "FETCH_START_FILTER" });
      }

      try {
        const filters: ProductIdeaFilters = {
          archived: archivedFilter,
        };
        if (statusFilter) filters.status = statusFilter as ProductIdeaStatus;
        if (tagFilter) filters.tag = tagFilter;
        if (myIdeasFilter) filters.ownerId = user.uid;
        if (searchQuery) filters.q = searchQuery;

        const minDelay = isCold ? MIN_SKELETON_MS : MIN_FILTER_MS;

        const [result] = await Promise.all([
          fetchIdeasPage({
            filters,
            pageSize: PAGE_SIZE,
            cursor: loadMore ? cursor : null,
          }),
          new Promise<void>((resolve) => setTimeout(resolve, minDelay)),
        ]);

        hasLoadedOnce.current = true;

        dispatch({
          type: "FETCH_SUCCESS",
          ideas: result.items,
          cursor: result.nextCursor,
          append: loadMore,
        });
      } catch (err) {
        console.error("Failed to fetch ideas:", err);
        dispatch({
          type: "ERROR",
          message: "Failed to load ideas. Please try again.",
        });
      }
    },
    [
      user,
      canReadIdeas,
      statusFilter,
      tagFilter,
      myIdeasFilter,
      archivedFilter,
      searchQuery,
      cursor,
    ],
  );

  useEffect(() => {
    if (devState === "normal") {
      fetchIdeas(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    statusFilter,
    tagFilter,
    myIdeasFilter,
    archivedFilter,
    searchQuery,
    devState,
  ]);

  // ─── Infinite Scroll ──────────────────────────────────────────────────────

  const isLoadingRef = useRef(false);

  useEffect(() => {
    isLoadingRef.current = loadingMore;
  }, [loadingMore]);

  useEffect(() => {
    // Don't attach scroll listener if we can't load more or still loading initial data
    if (!hasMore || initialLoading || filtering) {
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
      if (distanceFromBottom < SCROLL_THRESHOLD) {
        fetchIdeas(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, initialLoading, filtering, fetchIdeas]);

  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // ─── Filter Helpers ───────────────────────────────────────────────────────

  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchInput("");
  };

  const clearSearch = () => {
    setSearchInput("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("q");
    setSearchParams(newParams);
  };

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

      {/* ─── Search & Filters Card ─────────────────────────────────── */}
      <Card className="relative overflow-hidden">
        <CardContent className="space-y-4 pt-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search product idea name (starts with…)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-10"
            />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <Select
              value={statusFilter || "all"}
              onValueChange={(value) =>
                handleFilterChange("status", value === "all" ? null : value)
              }
            >
              <SelectTrigger
                className={cn(
                  "h-9 w-auto min-w-30",
                  statusFilter &&
                    "border-primary/50 bg-primary-background text-primary",
                )}
              >
                <SelectValue placeholder="Status" />
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

            {/* Tag Filter */}
            <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 justify-between font-normal min-w-30 border-input hover:border-primary body-2 capitalize",
                    "border-input hover:border-primary text-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-inline rounded-interactive border bg-background px-inset-sm py-inset-xs text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                    tagFilter &&
                      "border-primary/50 bg-primary-background text-primary",
                  )}
                >
                  <span className="truncate">{tagFilter || "Tag"}</span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search tags..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No tags found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="all"
                        onSelect={() => {
                          handleFilterChange("tag", null);
                          setTagPopoverOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            !tagFilter ? "opacity-100" : "opacity-0",
                          )}
                        />
                        All tags
                      </CommandItem>
                      {ideaTagOptions.map((tag) => (
                        <CommandItem
                          key={tag}
                          value={tag}
                          onSelect={(value) => {
                            handleFilterChange(
                              "tag",
                              value === tagFilter ? null : value,
                            );
                            setTagPopoverOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              tagFilter === tag ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {tag}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* All Ideas / My Ideas Toggle Group */}
            <ToggleGroup
              type="single"
              value={myIdeasFilter ? "mine" : "all"}
              onValueChange={(value) => {
                if (value) {
                  handleFilterChange("mine", value === "mine" ? "true" : null);
                }
              }}
              variant="outline"
              spacing={0}
              className="h-9"
            >
              <ToggleGroupItem value="all" className="px-4">
                All Ideas
              </ToggleGroupItem>
              <ToggleGroupItem value="mine" className="px-4">
                My Ideas
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Active/Archived Toggle Group */}
            <ToggleGroup
              type="single"
              value={archivedFilter ? "archived" : "active"}
              onValueChange={(value) => {
                if (value) {
                  handleFilterChange(
                    "archived",
                    value === "archived" ? "true" : null,
                  );
                }
              }}
              variant="outline"
              spacing={0}
              className="h-9"
            >
              <ToggleGroupItem value="active" className="px-4">
                Active
              </ToggleGroupItem>
              <ToggleGroupItem value="archived" className="px-4">
                Archived
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Clear All */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Active Filter Badges */}
          {(searchQuery || statusFilter || tagFilter) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>

              {/* Search Query Badge */}
              {searchQuery && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={clearSearch}
                >
                  Search: "{searchQuery}"
                  <X className="h-3 w-3" />
                </Badge>
              )}

              {/* Status Badge */}
              {statusFilter && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleFilterChange("status", null)}
                >
                  {statusFilter}
                  <X className="h-3 w-3" />
                </Badge>
              )}

              {/* Tag Badge */}
              {tagFilter && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleFilterChange("tag", null)}
                >
                  {tagFilter}
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <ProgressBar active={displayState.filtering} />
      </Card>

      {/* ─── Ideas List ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-stack">
        {displayState.fetchError && !displayState.initialLoading && (
          <ErrorState
            message={displayState.fetchError}
            onRetry={() => fetchIdeas(false)}
          />
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
              onAction={clearFilters}
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
