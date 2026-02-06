import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Filter, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import { type VariantProps } from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/productIdea/EmptyState";
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
  // ProductIdeaTag,
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";
import { IDEA_STATUSES, IDEA_PRIORITIES } from "@/lib/zodSchemas/productIdea";
import { format } from "date-fns";
import { CreateIdeaDialog } from "@/components/productIdea/CreateIdeaDialog";
import { IdeaDetailSheet } from "@/components/productIdea/IdeaDetailSheet";
import {
  canReadProductIdeas,
  canCreateProductIdea,
} from "@/lib/permissions/productIdeas";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export const ProductIdeasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, userProfile } = useAuth();

  const isSignedIn = !!user;
  const role = userProfile?.role;

  const canReadIdeas = canReadProductIdeas(isSignedIn);
  const canCreateIdeas = canCreateProductIdea(role, user?.uid);

  const [ideas, setIdeas] = useState<ProductIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<ProductIdea | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Filters from URL
  const statusFilter = searchParams.get("status") || undefined;
  const priorityFilter = searchParams.get("priority") || undefined;
  const myIdeasFilter = searchParams.get("mine") === "true";

  const loadIdeas = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const filters: ProductIdeaFilters = {};
      if (statusFilter) filters.status = statusFilter as ProductIdeaStatus;
      if (priorityFilter)
        filters.priority = priorityFilter as ProductIdeaPriority;
      if (myIdeasFilter) filters.ownerId = user.uid;

      const fetchedIdeas = await getFilteredProductIdeas(filters);
      setIdeas(fetchedIdeas);
    } catch (error) {
      console.error("Error loading ideas:", error);
    } finally {
      setLoading(false);
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

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = statusFilter || priorityFilter || myIdeasFilter;

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

  return (
    <div className="p-inset-2xl space-y-section container">
      <PageHeader
        pageTitle="Product Ideas"
        pageDescription="Track and manage product ideas from concept to launch"
        actions={
          canCreateIdeas ? (
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Idea
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
                <SelectTrigger>
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
                <SelectTrigger>
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
      {loading ? (
        <ResponsiveGrid maxColumns="three">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="space-y-stack">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </ResponsiveGrid>
      ) : ideas.length === 0 ? (
        <EmptyState
          icon={<Lightbulb className="h-12 w-12" />}
          title={hasActiveFilters ? "No ideas match filters" : "No ideas yet"}
          description={
            hasActiveFilters
              ? "Try adjusting your filters to see more ideas"
              : canCreateIdeas
                ? "Create your first product idea to get started"
                : "You don’t have permission to create product ideas"
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
                    onClick: () => setCreateDialogOpen(true),
                    variant: "primary",
                  }
                : undefined
          }
        />
      ) : (
        <ResponsiveGrid maxColumns="two">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onClick={() => setSelectedIdea(idea)}
              isOwner={idea.ownerId === user?.uid}
            />
          ))}
        </ResponsiveGrid>
      )}
      {canCreateIdeas ? (
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Idea
        </Button>
      ) : undefined}

      {/* Dialogs */}
      {canCreateIdeas && (
        <CreateIdeaDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSuccess={loadIdeas}
        />
      )}

      {selectedIdea && (
        <IdeaDetailSheet
          idea={selectedIdea}
          open={!!selectedIdea}
          onOpenChange={(open: boolean) => !open && setSelectedIdea(null)}
          onUpdate={loadIdeas}
        />
      )}
    </div>
  );
};

// Idea Card Component
interface IdeaCardProps {
  idea: ProductIdea;
  onClick: () => void;
  isOwner: boolean;
}

function IdeaCard({ idea, onClick, isOwner }: IdeaCardProps) {
  const getStatusVariant = (status: string) => {
    const variants: Record<string, BadgeVariant> = {
      draft: "neutral",
      active: "default",
      paused: "warning",
      shipped: "success",
    };
    return variants[status] || "neutral-subtle";
  };

  const getPriorityVariant = (priority?: string) => {
    const variants: Record<string, BadgeVariant> = {
      now: "default",
      next: "accent",
      later: "neutral",
    };
    return variants[priority || ""] || "muted-subtle";
  };

  return (
    <Card
      className="cursor-pointer hover:border-primary transition-colors h-full flex flex-col"
      onClick={onClick}
    >
      <CardContent className="flex flex-col flex-1 gap-y-stack">
        <div className="flex flex-row gap-inline pb-stack">
          <Badge variant={getStatusVariant(idea.status)}>{idea.status}</Badge>
          {idea.priority && (
            <Badge variant={getPriorityVariant(idea.priority)}>
              {idea.priority}
            </Badge>
          )}
          {isOwner && (
            <Badge variant="accent-outline" className="shrink-0 ml-auto mr-0">
              Owner
            </Badge>
          )}
        </div>
        <div className="flex items-start justify-between gap-inline">
          <h3 className="headline-4 line-clamp-2">{idea.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-stack">
          {idea.summary}
        </p>

        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-inline mt-auto">
            {idea.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="neutral-outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {idea.tags.length > 3 && (
              <Badge variant="muted-subtle" className="text-xs">
                +{idea.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground ml-auto mt-stack">
          {idea.createdAt && format(idea.createdAt.toDate(), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}
