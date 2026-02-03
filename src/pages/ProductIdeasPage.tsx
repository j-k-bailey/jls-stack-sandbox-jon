import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  buildProductIdeasQuery,
  executeProductIdeasQueryPaginated,
} from "@/lib/firestore/productIdeas";
import type {
  ProductIdea,
  ProductIdeaStatus,
  ProductIdeaFilters,
} from "@/types/productIdeas";
import type { DocumentSnapshot } from "firebase/firestore";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductIdeaSkeleton } from "@/components/productIdea/ProductIdeaSkeleton";
import { ErrorState } from "@/components/productIdea/ErrorState";
import { EmptyState } from "@/components/productIdea/EmptyState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ViewMode = "live" | "loading" | "empty" | "error";

const STATUS_OPTIONS: { value: ProductIdeaStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "shipped", label: "Shipped" },
];

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const DEFAULT_PAGE_SIZE = 10;
const SKELETON_COUNT = 5;

function getCacheKey(filters: ProductIdeaFilters, pageSize: number): string {
  return JSON.stringify({ filters, pageSize });
}

function ProductIdeasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationCacheRef = useRef<Map<string, Map<number, DocumentSnapshot>>>(
    new Map(),
  );

  // Core state
  const [ideas, setIdeas] = useState<ProductIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("live");

  // URL-driven state
  const statusParam = searchParams.get("status");
  const tagFilter = searchParams.get("tag");
  const pageSize = parseInt(
    searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE),
  );
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Validate status filter
  const statusFilter =
    statusParam && statusParam !== "all"
      ? (statusParam as ProductIdeaStatus)
      : undefined;

  // Derived state
  const filters: ProductIdeaFilters = useMemo(
    () => ({
      ...(statusFilter && { status: statusFilter }),
      ...(tagFilter && { tag: tagFilter }),
    }),
    [statusFilter, tagFilter],
  );

  const cacheKey = useMemo(
    () => getCacheKey(filters, pageSize),
    [filters, pageSize],
  );

  const isLoading = viewMode === "loading" || (viewMode === "live" && loading);
  const hasError = viewMode === "error" || (viewMode === "live" && !!error);
  const isEmpty =
    viewMode === "empty" ||
    (viewMode === "live" && !loading && !error && ideas.length === 0);
  const showPagination =
    !isLoading && !hasError && !isEmpty && (currentPage > 1 || hasMore);

  // Handlers
  const updateFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "all") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      if (
        updates.status !== undefined ||
        updates.tag !== undefined ||
        updates.pageSize !== undefined
      ) {
        newParams.delete("page");
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const goToPage = useCallback(
    (page: number) => updateFilters({ page: String(page) }),
    [updateFilters],
  );

  // Clear cache when filters/pageSize change
  useEffect(() => {
    const currentCache = paginationCacheRef.current.get(cacheKey);
    paginationCacheRef.current = new Map(
      currentCache ? [[cacheKey, currentCache]] : [],
    );
  }, [cacheKey]);

  // Load ideas
  useEffect(() => {
    if (viewMode !== "live") return;

    let isMounted = true;

    async function loadIdeas() {
      setLoading(true);
      setError(null);

      try {
        const lastDoc =
          currentPage > 1
            ? paginationCacheRef.current.get(cacheKey)?.get(currentPage - 1)
            : undefined;

        const query = buildProductIdeasQuery(filters, { pageSize, lastDoc });
        const result = await executeProductIdeasQueryPaginated(query, pageSize);

        if (!isMounted) return;

        setIdeas(result.ideas);
        setHasMore(result.hasMore);
        setTotalPages(result.hasMore ? currentPage + 1 : currentPage);

        // Cache lastDoc
        if (result.lastDoc) {
          const pageCache =
            paginationCacheRef.current.get(cacheKey) || new Map();
          pageCache.set(currentPage, result.lastDoc);
          paginationCacheRef.current.set(cacheKey, pageCache);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to load product ideas:", err);
        setError("Failed to load product ideas.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadIdeas();
    return () => {
      isMounted = false;
    };
  }, [filters, pageSize, currentPage, viewMode, cacheKey]);

  return (
    <div className="container p-inset-2xl space-y-section">
      <PageHeader
        pageTitle="Product Ideas"
        pageDescription="A showcase of product ideas, driven by Firestore"
        hr
      />

      {/* Debug Controls */}
      <div className="flex justify-end">
        <Select
          value={viewMode}
          onValueChange={(value) => setViewMode(value as ViewMode)}
        >
          <SelectTrigger className="w-50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live data</SelectItem>
            <SelectItem value="loading">Force loading</SelectItem>
            <SelectItem value="empty">Force empty</SelectItem>
            <SelectItem value="error">Force error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filters - Two Column Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Status & Page Size */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="status-filter"
                className="text-sm font-medium mb-2 block"
              >
                Status
              </label>
              <Select
                value={statusFilter || "all"}
                onValueChange={(value) => updateFilters({ status: value })}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-32">
              <label
                htmlFor="page-size"
                className="text-sm font-medium mb-2 block"
              >
                Per Page
              </label>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => updateFilters({ pageSize: value })}
              >
                <SelectTrigger id="page-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column: Active Filters */}
          <div className="flex items-end justify-end">
            {tagFilter && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tag:</span>
                <Badge variant="accent" className="gap-1.5">
                  {tagFilter}
                  <button
                    onClick={() => updateFilters({ tag: undefined })}
                    className="hover:bg-accent rounded-full p-0.5 transition-colors"
                    aria-label="Remove tag filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {!isLoading && !hasError && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              {ideas.length} {ideas.length === 1 ? "idea" : "ideas"}
              {currentPage > 1 && ` · Page ${currentPage}`}
            </p>
            {showPagination && (
              <p>
                Page {currentPage}
                {hasMore
                  ? ` of ${totalPages}+`
                  : totalPages > 1
                    ? ` of ${totalPages}`
                    : ""}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <section className="space-y-4">
        {isLoading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProductIdeaSkeleton key={i} />
          ))}

        {hasError && <ErrorState message={error ?? "Something went wrong"} />}

        {isEmpty && <EmptyState />}

        {!isLoading &&
          !hasError &&
          !isEmpty &&
          ideas.map((idea) => (
            <Card key={idea.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{idea.title}</h3>
                  <Badge variant="accent">{idea.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{idea.summary}</p>

                {idea.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tagFilter === tag ? "default" : "outline"}
                        className={
                          tagFilter !== tag
                            ? "cursor-pointer hover:bg-accent transition-colors"
                            : ""
                        }
                        onClick={() =>
                          tagFilter !== tag && updateFilters({ tag })
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </section>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between border-t pt-4">
          <Button
            variant="outline"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage}
          </span>

          <Button
            variant="outline"
            onClick={() => goToPage(currentPage + 1)}
            disabled={!hasMore}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductIdeasPage;
