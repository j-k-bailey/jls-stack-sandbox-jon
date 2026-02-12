import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { IDEA_STATUSES } from "@/lib/zodSchemas/productIdea";
import { ideaTagOptions } from "@/constants/productIdeaTags";
import {
  canReadProductIdeas,
  canCreateProductIdea,
} from "@/lib/permissions/productIdeas";
import { ProgressBar } from "@/components/common/ProgressBar";
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
import { IdeasListSkeleton } from "@/components/states/skeletons/IdeasListSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import {
  useDevState,
  DevStateControls,
  applyDevStateOverrides,
} from "@/hooks/useDevState";
import { useIdeasFilters } from "@/features/ideas/hooks/useIdeasFilters";
import { useIdeasList } from "@/features/ideas/hooks/useIdeasList";
// import { ErrorBoundaryTester } from "@/components/dev/ErrorBoundaryTester";

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

  // ─── Local Search Input State (debounced) ─────────────────────────────────

  const [searchInput, setSearchInput] = useState(filters.q);

  // Debounce search input to URL params
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== filters.q) {
        updateFilter("q", searchInput);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [searchInput, filters.q, updateFilter]);

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

  // ─── UI State ─────────────────────────────────────────────────────────────

  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // ─── Filter Handlers ──────────────────────────────────────────────────────

  const handleClearFilters = () => {
    resetFilters();
    setSearchInput("");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateFilter("q", "");
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

      {/* <ErrorBoundaryTester /> */}

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
                onClick={handleClearSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Controls - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) =>
                updateFilter("status", value as typeof filters.status)
              }
            >
              <SelectTrigger
                className={cn(
                  "h-9 w-full",
                  filters.status !== "all" &&
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

            {/* Priority Filter */}
            <Select
              value={filters.priority}
              onValueChange={(value) =>
                updateFilter("priority", value as typeof filters.priority)
              }
            >
              <SelectTrigger
                className={cn(
                  "h-9 w-full",
                  filters.priority !== "all" &&
                    "border-primary/50 bg-primary-background text-primary",
                )}
              >
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="now">Now</SelectItem>
                <SelectItem value="next">Next</SelectItem>
                <SelectItem value="later">Later</SelectItem>
              </SelectContent>
            </Select>

            {/* Tag Filter */}
            <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-9 justify-between font-normal w-full capitalize",
                    "border-input hover:border-primary text-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex items-center gap-inline rounded-interactive border bg-background px-inset-sm py-inset-xs text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
                    filters.tag !== "all" &&
                      "border-primary/50 bg-primary-background text-primary",
                  )}
                >
                  <span className="truncate">
                    {filters.tag !== "all" ? filters.tag : "Tag"}
                  </span>
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
                          updateFilter("tag", "all");
                          setTagPopoverOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.tag === "all" ? "opacity-100" : "opacity-0",
                          )}
                        />
                        All tags
                      </CommandItem>
                      {ideaTagOptions.map((tag) => (
                        <CommandItem
                          key={tag}
                          value={tag}
                          onSelect={(value) => {
                            updateFilter("tag", value);
                            setTagPopoverOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              filters.tag === tag ? "opacity-100" : "opacity-0",
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
              value={filters.mine ? "mine" : "all"}
              onValueChange={(value) => {
                if (value) {
                  updateFilter("mine", value === "mine");
                }
              }}
              variant="outline"
              spacing={0}
              className="h-9 w-full sm:col-span-2 lg:col-span-1"
            >
              <ToggleGroupItem value="all" className="px-4 flex-1">
                All Ideas
              </ToggleGroupItem>
              <ToggleGroupItem value="mine" className="px-4 flex-1">
                My Ideas
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Active/Archived Toggle Group */}
            <ToggleGroup
              type="single"
              value={filters.archived ? "archived" : "active"}
              onValueChange={(value) => {
                if (value) {
                  updateFilter("archived", value === "archived");
                }
              }}
              variant="outline"
              spacing={0}
              className="h-9 w-full sm:col-span-2 lg:col-span-1"
            >
              <ToggleGroupItem value="active" className="px-4 flex-1">
                Active
              </ToggleGroupItem>
              <ToggleGroupItem value="archived" className="px-4 flex-1">
                Archived
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Clear All - Spans full width on mobile, auto on larger screens */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-foreground sm:col-span-2 lg:col-span-3 xl:col-span-6 justify-center lg:justify-start"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Active Filter Badges */}
          {(filters.q ||
            filters.status !== "all" ||
            filters.priority !== "all" ||
            filters.tag !== "all") && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>

              {/* Search Query Badge */}
              {filters.q && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={handleClearSearch}
                >
                  Search: "{filters.q}"
                  <X className="h-3 w-3" />
                </Badge>
              )}

              {/* Status Badge */}
              {filters.status !== "all" && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => updateFilter("status", "all")}
                >
                  {filters.status}
                  <X className="h-3 w-3" />
                </Badge>
              )}

              {/* Priority Badge */}
              {filters.priority !== "all" && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80 capitalize"
                  onClick={() => updateFilter("priority", "all")}
                >
                  {filters.priority}
                  <X className="h-3 w-3" />
                </Badge>
              )}

              {/* Tag Badge */}
              {filters.tag !== "all" && (
                <Badge
                  variant="accent"
                  className="gap-1 cursor-pointer hover:bg-secondary/80"
                  onClick={() => updateFilter("tag", "all")}
                >
                  {filters.tag}
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
              onAction={handleClearFilters}
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
