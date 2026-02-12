import { useState } from "react";
import { Search, X, ChevronsUpDown, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import { ProgressBar } from "@/components/common/ProgressBar";
import { IDEA_STATUSES } from "@/lib/zodSchemas/productIdea";
import { ideaTagOptions } from "@/features/ideas/constants/productIdeaTags";
import type { IdeasFilterState } from "@/features/ideas/hooks/useIdeasFilters";

// ============================================================================
// TYPES
// ============================================================================

type IdeasFiltersBarProps = {
  filters: IdeasFilterState;
  onFilterChange: <K extends keyof IdeasFilterState>(
    key: K,
    value: IdeasFilterState[K],
  ) => void;
  onClearAll: () => void;
  isFiltering?: boolean;
  hasActiveFilters?: boolean;
};

// ============================================================================
// COMPONENT
// ============================================================================

export function IdeasFiltersBar({
  filters,
  onFilterChange,
  onClearAll,
  isFiltering = false,
  hasActiveFilters = false,
}: IdeasFiltersBarProps) {
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // Local search state for debouncing (parent handles the actual debounce)
  const [searchInput, setSearchInput] = useState(filters.q);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onFilterChange("q", value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onFilterChange("q", "");
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="space-y-4 pt-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search product idea name (starts with…)"
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
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
              onFilterChange("status", value as typeof filters.status)
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
              onFilterChange("priority", value as typeof filters.priority)
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
                        onFilterChange("tag", "all");
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
                          onFilterChange("tag", value);
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
                onFilterChange("mine", value === "mine");
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
                onFilterChange("archived", value === "archived");
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
              onClick={onClearAll}
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
                search: "{filters.q}"
                <X className="h-3 w-3" />
              </Badge>
            )}

            {/* Status Badge */}
            {filters.status !== "all" && (
              <Badge
                variant="accent"
                className="gap-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => onFilterChange("status", "all")}
              >
                status: {filters.status}
                <X className="h-3 w-3" />
              </Badge>
            )}

            {/* Priority Badge */}
            {filters.priority !== "all" && (
              <Badge
                variant="accent"
                className="gap-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => onFilterChange("priority", "all")}
              >
                priority: {filters.priority}
                <X className="h-3 w-3" />
              </Badge>
            )}

            {/* Tag Badge */}
            {filters.tag !== "all" && (
              <Badge
                variant="accent"
                className="gap-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => onFilterChange("tag", "all")}
              >
                tag: {filters.tag}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <ProgressBar active={isFiltering} />
    </Card>
  );
}
