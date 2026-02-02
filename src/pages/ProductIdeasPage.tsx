import { useEffect, useState } from "react";
import { getAllProductIdeas } from "@/lib/firestore/productIdeas";
import type { ProductIdea } from "@/types/productIdeas";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

type ViewMode = "live" | "loading" | "empty" | "error";

function ProductIdeasPage() {
  const [ideas, setIdeas] = useState<ProductIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("live");

  useEffect(() => {
    async function loadIdeas() {
      try {
        const data = await getAllProductIdeas();
        setIdeas(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product ideas.");
      } finally {
        setLoading(false);
      }
    }

    loadIdeas();
  }, []);

  const isLoading = viewMode === "loading" || (viewMode === "live" && loading);

  const hasError = viewMode === "error" || (viewMode === "live" && !!error);

  const noItems =
    viewMode === "empty" ||
    (viewMode === "live" && !loading && !error && ideas.length === 0);

  return (
    <div className="p-inset-2xl space-y-section container">
      <PageHeader
        pageTitle="Product Ideas"
        pageDescription="A showcase of product ideas, driven by Firestore"
        hr
      />
      <div className="flex justify-end">
        <Select
          value={viewMode}
          onValueChange={(value) => setViewMode(value as ViewMode)}
        >
          <SelectTrigger id="render-mode">
            <SelectValue placeholder="Select render mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live data</SelectItem>
            <SelectItem value="loading">Force loading state</SelectItem>
            <SelectItem value="empty">Force empty state</SelectItem>
            <SelectItem value="error">Force error state</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <section className="grid gap-4">
        {isLoading && (
          <>
            <ProductIdeaSkeleton />
            <ProductIdeaSkeleton />
            <ProductIdeaSkeleton />
            <ProductIdeaSkeleton />
            <ProductIdeaSkeleton />
          </>
        )}

        {!isLoading && hasError && (
          <ErrorState
            message={error ?? "Something went wrong (you forced error state)."}
          />
        )}

        {!isLoading && !hasError && noItems && <EmptyState />}

        {!isLoading &&
          !hasError &&
          !noItems &&
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

                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </section>
    </div>
  );
}

export default ProductIdeasPage;
