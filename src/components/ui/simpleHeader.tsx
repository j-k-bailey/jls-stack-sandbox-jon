import { cn } from "@/lib/utils";

interface SimpleHeaderProps {
  pageTitle: string;
  pageDescription?: string;
  hr?: boolean;
  className?: string;
}

export function SimpleHeader({
  pageTitle,
  pageDescription,
  hr = false,
  className,
}: SimpleHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h1>{pageTitle}</h1>
      {pageDescription && <p>{pageDescription}</p>}
      {hr && <hr className="border-border" />}
    </div>
  );
}
