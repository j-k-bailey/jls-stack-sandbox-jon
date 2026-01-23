import { cn } from "@/lib/utils";
interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  className,
}: FeatureCardProps) {
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
