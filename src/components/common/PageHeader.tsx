import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageHeaderVariants = cva("", {
  variants: {
    level: {
      h1: "headline-1",
      h2: "headline-2",
      h3: "headline-3",
      h4: "headline-4",
      h5: "headline-5",
      h6: "headline-6",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

interface PageHeaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  pageTitle: string;
  pageSubtitle?: string;
  pageDescription?: string;
  actions?: React.ReactNode;
  hr?: boolean;
}

export function PageHeader({
  pageTitle,
  pageSubtitle,
  pageDescription,
  actions,
  hr = false,
  level = "h1",
  className,
  ...props
}: PageHeaderProps) {
  const HeadingTag = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <div className={cn("space-y-tight", className)} {...props}>
      <div className="flex flex-col gap-tight md:flex-row md:items-start md:justify-between">
        <div className="space-y-tight">
          <HeadingTag className={pageHeaderVariants({ level })}>
            {pageTitle}
          </HeadingTag>
          {pageSubtitle ? (
            <p className="subtitle-1 text-foreground">{pageSubtitle}</p>
          ) : null}
          {pageDescription && (
            <p className="text-body-1 text-muted-foreground">
              {pageDescription}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-standard">{actions}</div>
        )}
      </div>
      {hr && <hr className="border-border" />}
    </div>
  );
}
