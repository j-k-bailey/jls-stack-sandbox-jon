import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function IdeaDetailSkeleton() {
  return (
    <div className="p-inset-2xl space-y-section container max-w-4xl">
      {/* Back button skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" /> {/* Page title */}
        <Skeleton className="h-10 w-32" /> {/* Back button */}
      </div>

      {/* Status and Priority skeleton */}
      <div className="flex items-start gap-x-6">
        <div className="space-y-2">
          <Skeleton className="h-3 w-12" /> {/* STATUS label */}
          <Skeleton className="h-5 w-16" /> {/* DRAFT */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" /> {/* PRIORITY label */}
          <Skeleton className="h-5 w-12" /> {/* NEXT */}
        </div>
      </div>

      {/* Main idea card skeleton */}
      <Card>
        <CardContent className="space-y-section p-inset-xl">
          {/* Summary text */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Bottom section with tags and metadata */}
          <div className="flex flex-wrap items-end justify-between gap-stack pt-stack border-t border-dashed">
            {/* Tags */}
            <div className="flex flex-wrap gap-inline">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>

            {/* Metadata and buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-inline sm:gap-stack">
              <Skeleton className="h-4 w-32" /> {/* Edited date */}
              <Skeleton className="h-8 w-16" /> {/* Edit button */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator />

      {/* Notes section skeleton */}
      <div className="space-y-stack">
        {/* Notes header */}
        <div className="flex items-center gap-stack">
          <Skeleton className="h-5 w-5" /> {/* Icon */}
          <Skeleton className="h-6 w-24" /> {/* "Notes (0)" */}
        </div>

        {/* Add note form skeleton */}
        <Card>
          <CardContent className="p-inset-xl space-y-stack">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Label */}
              <Skeleton className="h-20 w-full" /> {/* Textarea */}
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-8 w-24" /> {/* Add Note button */}
            </div>
          </CardContent>
        </Card>

        {/* Notes list card skeleton */}
        <Card>
          <CardContent className="p-inset-xl">
            <Skeleton className="h-4 w-48" /> {/* "No notes yet" message */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
