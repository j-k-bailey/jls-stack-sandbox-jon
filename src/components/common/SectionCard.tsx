import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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

  return (
    <Card className={cn("border-border bg-surface-1", className)}>
      {hasHeader && (
        <CardHeader>
          {title && (
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="pt-0 gap-compact space-x-compact space-y-compact">
        {children}
      </CardContent>
    </Card>
  );
}
