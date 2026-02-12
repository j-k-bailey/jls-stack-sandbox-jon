import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/common/FeatureCard";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
    to?: string;
    asChild?: boolean;
    variant?: "primary" | "accent" | "neutral";
  };
  layout?: FeatureCardProps["layout"];
  emphasis?: FeatureCardProps["emphasis"];
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  layout = "vertical",
  emphasis = "subtle",
  className,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-inset-2xl">
      <FeatureCard
        layout={layout}
        emphasis={emphasis}
        icon={icon}
        heading={title}
        headingLevel="h3"
        description={description}
        cta={action}
        className={className}
      />
    </div>
  );
}
