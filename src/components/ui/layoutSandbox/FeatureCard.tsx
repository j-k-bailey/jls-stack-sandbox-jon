interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  const cardClasses =
    "bg-stone-950/60 border border-stone-700/50 rounded-lg p-6";
  const cardHover =
    "hover:bg-stone-900/50 hover:border-yellow-700/30 transition-all";

  return (
    <div className={`${cardClasses} ${cardHover}`}>
      <strong className="block sm:inline text-yellow-500 font-semibold">
        {title}
      </strong>
      <span className="block sm:inline sm:before:content-['_—_'] text-stone-300">
        {description}
      </span>
    </div>
  );
}
