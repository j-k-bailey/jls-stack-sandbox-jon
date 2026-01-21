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
      <h1 className="text-2xl font-bold tracking-tight">{pageTitle}</h1>
      {pageDescription && (
        <p className="text-sm text-slate-300">{pageDescription}</p>
      )}
      {hr && <hr className="border-slate-700" />}
    </div>
  );
}
