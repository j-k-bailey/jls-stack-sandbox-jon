interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="card-compact">
      <strong className="block sm:inline text-accent font-semibold text-subtitle-1">
        {title}
      </strong>
      <span className="block sm:inline sm:before:content-['_—_'] text-body-1">
        {description}
      </span>
    </div>
  );
}
