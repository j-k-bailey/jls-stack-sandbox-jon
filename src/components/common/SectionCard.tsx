import { type ReactNode, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function SectionCard({
  title,
  description,
  className,
  children,
}: SectionCardProps) {
  const hasHeader = title || description;
  const titleId = useId();

  return (
    <section aria-labelledby={title ? titleId : undefined}>
      <Card className={cn("border-border bg-surface-1", className)}>
        {hasHeader && (
          <CardHeader className="space-y-tight pb-relaxed">
            {title && (
              <CardTitle id={titleId} level="h2" className="headline-4">
                {title}
              </CardTitle>
            )}

            {description && (
              <p className="body-2 text-muted-foreground max-w-prose  mb-standard">
                {description}
              </p>
            )}
          </CardHeader>
        )}

        <CardContent className="pt-0 space-y-relaxed">{children}</CardContent>
      </Card>
    </section>
  );
}
