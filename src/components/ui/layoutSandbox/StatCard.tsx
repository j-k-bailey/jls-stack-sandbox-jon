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
      "bg-linear-to-br from-primary/20 to-accent/20 border-2 border-primary/50 shadow-sm shadow-primary/20",
    error:
      "bg-linear-to-br from-warning/20 to-warning/30 border border-warning/60  shadow-sm shadow-warning/30",
  };

  const labelClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/80",
    error: "text-warning/80",
  };

  const valueClasses = {
    default: "text-primary/80",
    featured:
      "bg-linear-to-br from-primary to-accent bg-clip-text text-transparent",
    error: "text-warning",
  };

  const descriptionClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/80",
    error: "text-warning/80-",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className={`overline-text mb-tight ${labelClasses[variant]}`}>
        {label}
      </div>
      <div
        className={`text-5xl font-bold leading-none mb-tight ${valueClasses[variant]}`}
      >
        {value}
      </div>
      <p className={`caption leading-relaxed ${descriptionClasses[variant]}`}>
        {description}
      </p>
    </div>
  );
}
