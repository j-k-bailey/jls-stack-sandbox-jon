interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  variant?: "default" | "featured" | "error";
  className?: string;
}

export function StatCard({
  label,
  value,
  description,
  variant = "default",
  className = "",
}: StatCardProps) {
  const baseClasses = "rounded-lg p-standard transition-all";

  const variantClasses = {
    default:
      "bg-surface-1 border border-border hover:bg-surface-1/80 hover:border-primary/30",
    featured:
      "bg-linear-to-br from-primary/20 to-accent/20 border-2 border-primary/50 hover:border-primary/70 shadow-lg shadow-primary/20",
    error:
      "bg-linear-to-br from-error/20 to-error/30 border border-error/60 hover:border-error/80 shadow-lg shadow-error/30",
  };

  const labelClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/80",
    error: "text-error/80",
  };

  const valueClasses = {
    default: "text-primary/80",
    featured:
      "bg-linear-to-br from-primary to-accent bg-clip-text text-transparent",
    error: "text-error",
  };

  const descriptionClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/60",
    error: "text-error/60",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`text-overline mb-tight ${labelClasses[variant]}`}>
        {label}
      </div>
      <div
        className={`text-5xl font-bold leading-none mb-tight ${valueClasses[variant]}`}
      >
        {value}
      </div>
      <p
        className={`text-caption leading-relaxed ${descriptionClasses[variant]}`}
      >
        {description}
      </p>
    </div>
  );
}
