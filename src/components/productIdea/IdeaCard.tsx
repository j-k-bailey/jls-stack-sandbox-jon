// @/components/productIdea/IdeaCard.tsx
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IdeaStatusBadge,
  IdeaPriorityBadge,
} from "@/components/productIdea/IdeaBadges";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductIdea } from "@/lib/types/productIdeas";
import { format } from "date-fns";

// ================
// Skeleton
// ================

/**
 * Skeleton placeholder shown only on the very first data load.
 * Never re-shown on filter changes or background refreshes.
 */
export function IdeaCardSkeleton() {
  return (
    <Card className="h-50">
      <CardContent className="space-y-stack">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-auto">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface IdeaCardProps {
  idea: ProductIdea;
  isOwner?: boolean;
  maxTags?: number;
  /** If true, wraps the card in a Link to the idea detail page */
  linkable?: boolean;
}

export function IdeaCard({
  idea,
  isOwner = false,
  maxTags = 5,
  linkable = true,
}: IdeaCardProps) {
  const card = (
    <Card className="cursor-pointer hover:border-primary transition-colors h-full flex flex-col">
      <CardContent className="flex flex-col flex-1 gap-y-stack">
        <div className="flex flex-row gap-inline pb-stack">
          <IdeaStatusBadge status={idea.status} />
          {idea.priority && <IdeaPriorityBadge priority={idea.priority} />}
          {isOwner && (
            <Badge variant="accent-outline" className="shrink-0 ml-auto mr-0">
              Owner
            </Badge>
          )}
        </div>
        <div className="flex items-start justify-between gap-inline">
          <h2 className="headline-4 line-clamp-2">{idea.title}</h2>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-stack">
          {idea.summary}
        </p>

        {idea.tags && idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-inline mt-auto">
            {idea.tags.slice(0, maxTags).map((tag) => (
              <Badge key={tag} variant="neutral-outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {idea.tags.length > maxTags && (
              <Badge variant="muted-subtle" className="text-xs">
                +{idea.tags.length - maxTags}
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

  if (!linkable) return card;

  return (
    <Link key={idea.ideaId} to={`/ideas/${idea.ideaId}`}>
      {card}
    </Link>
  );
}
