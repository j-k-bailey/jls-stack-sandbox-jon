import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const simpleHeaderVariants = cva("", {
  variants: {
    level: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

interface SimpleHeaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof simpleHeaderVariants> {
  pageTitle: string;
  pageDescription?: string;
  hr?: boolean;
}

export function SimpleHeader({
  pageTitle,
  pageDescription,
  hr = false,
  level = "h1",
  className,
  ...props
}: SimpleHeaderProps) {
  const HeadingTag = level as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <div className={cn("space-y-tight", className)} {...props}>
      <HeadingTag className={simpleHeaderVariants({ level })}>
        {pageTitle}
      </HeadingTag>
      {pageDescription && (
        <p className="text-body-1 text-muted-foreground">{pageDescription}</p>
      )}
      {hr && <hr className="border-border" />}
    </div>
  );
}
