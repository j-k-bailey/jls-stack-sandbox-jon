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
  const baseClasses = "rounded-lg p-6 transition-all";

  const variantClasses = {
    default:
      "bg-surface border border-border hover:bg-surface/80 hover:border-primary/30",
    featured:
      "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50 hover:border-primary/70 shadow-lg shadow-primary/20",
    error:
      "bg-gradient-to-br from-destructive/20 to-destructive/30 border border-destructive/60 hover:border-destructive/80 shadow-lg shadow-destructive/30",
  };

  const labelClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/80",
    error: "text-destructive/80",
  };

  const valueClasses = {
    default: "text-primary/80",
    featured:
      "bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent",
    error: "text-destructive",
  };

  const descriptionClasses = {
    default: "text-muted-foreground",
    featured: "text-primary/60",
    error: "text-destructive/60",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div
        className={`text-xs uppercase tracking-widest mb-2 font-semibold ${labelClasses[variant]}`}
      >
        {label}
      </div>
      <div
        className={`text-5xl font-bold leading-none mb-3 ${valueClasses[variant]}`}
      >
        {value}
      </div>
      <p className={`text-xs leading-relaxed ${descriptionClasses[variant]}`}>
        {description}
      </p>
    </div>
  );
}
