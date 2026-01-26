import { cn } from "@/lib/utils";
interface SimpleFeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function SimpleFeatureCard({
  title,
  description,
  className,
}: SimpleFeatureCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-1 text-foreground border border-border rounded-lg p-compact",
        className,
      )}
    >
      <strong className="block sm:inline text-accent font-semibold text-subtitle-1">
        {title}
      </strong>
      <span className="block sm:inline sm:before:content-['_—_'] text-body-1">
        {description}
      </span>
    </div>
  );
}
