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
      "bg-stone-950/60 border border-stone-700/50 hover:bg-stone-900/50 hover:border-yellow-700/30",
    featured:
      "bg-linear-to-br from-yellow-900/40 to-amber-900/40 border-2 border-yellow-600/50 hover:border-yellow-500/70 shadow-lg shadow-yellow-900/20",
    error:
      "bg-linear-to-br from-orange-950/40 to-orange-900/40 border border-orange-800/60 hover:border-orange-700/60 shadow-lg shadow-orange-950/30",
  };

  const labelClasses = {
    default: "text-stone-500",
    featured: "text-yellow-400/80",
    error: "text-orange-400/80",
  };

  const valueClasses = {
    default: "text-yellow-500/80",
    featured:
      "bg-linear-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent",
    error: "text-orange-500",
  };

  const descriptionClasses = {
    default: "text-stone-500",
    featured: "text-yellow-400/60",
    error: "text-orange-400/60",
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
