import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

// Helper functions to map status/priority to badge variants
function getStatusVariant(status: ProductIdeaStatus): BadgeVariant {
  const variants: Record<ProductIdeaStatus, BadgeVariant> = {
    draft: "neutral",
    active: "default",
    paused: "warning",
    shipped: "success",
  };
  return variants[status] || "neutral-subtle";
}

function getPriorityVariant(priority: ProductIdeaPriority): BadgeVariant {
  const variants: Record<ProductIdeaPriority, BadgeVariant> = {
    now: "default",
    next: "accent",
    later: "neutral",
  };
  return variants[priority] || "muted-subtle";
}

// Badge Components
interface IdeaStatusBadgeProps {
  status: ProductIdeaStatus;
  className?: string;
}

export function IdeaStatusBadge({ status, className }: IdeaStatusBadgeProps) {
  return (
    <Badge variant={getStatusVariant(status)} className={className}>
      {status}
    </Badge>
  );
}

interface IdeaPriorityBadgeProps {
  priority: ProductIdeaPriority;
  className?: string;
}

export function IdeaPriorityBadge({
  priority,
  className,
}: IdeaPriorityBadgeProps) {
  return (
    <Badge variant={getPriorityVariant(priority)} className={className}>
      {priority}
    </Badge>
  );
}
