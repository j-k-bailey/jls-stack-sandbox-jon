import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { FilledButton } from "@/components/ui/ButtonVariants";

const featureCardVariants = cva("relative", {
  variants: {
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-col md:flex-row",
    },
    emphasis: {
      subtle: "bg-surface-1 border-border",
      bold: "bg-gradient-to-br from-primary-background to-accent-background border-2 border-primary",
    },
  },
  defaultVariants: {
    layout: "vertical",
    emphasis: "subtle",
  },
});

const imageContainerVariants = cva("overflow-hidden", {
  variants: {
    layout: {
      vertical: "w-full aspect-video rounded-t-lg",
      horizontal:
        "w-full md:w-2/5 lg:w-1/3 aspect-video md:aspect-square rounded-t-lg md:rounded-l-lg md:rounded-tr-none",
    },
  },
});

const contentContainerVariants = cva(
  "flex flex-col gap-comfortable p-comfortable",
  {
    variants: {
      layout: {
        vertical: "",
        horizontal: "md:flex-1",
      },
    },
  },
);

export interface FeatureCardProps extends VariantProps<
  typeof featureCardVariants
> {
  image?: {
    src: string;
    alt: string;
  };
  icon?: React.ReactNode;
  heading: string;
  headingLevel?: "h2" | "h3" | "h4";
  description: string | React.ReactNode;
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "accent" | "neutral";
  };
  badges?: Array<{
    text: string;
    variant?: "primary" | "accent";
  }>;
  className?: string;
  onClick?: () => void;
}

export const FeatureCard = ({
  layout = "vertical",
  emphasis = "subtle",
  image,
  icon,
  heading,
  headingLevel = "h4",
  description,
  cta,
  badges,
  className,
  onClick,
}: FeatureCardProps) => {
  const HeadingTag = headingLevel;

  const cardContent = (
    <Card
      className={cn(
        featureCardVariants({ layout, emphasis }),
        onClick && "cursor-pointer hover:shadow-lg transition-shadow",
        className,
      )}
      onClick={onClick}
    >
      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className={cn(
                "inline-block px-3 py-1 text-xs font-bold rounded-full",
                badge.variant === "accent"
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}

      {/* Image or Icon */}
      {image && (
        <div className={cn(imageContainerVariants({ layout }))}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {icon && !image && (
        <div
          className={cn(
            "flex items-center justify-center",
            layout === "vertical"
              ? "w-full py-spacious"
              : "w-full md:w-2/5 lg:w-1/3 py-spacious md:py-0",
          )}
        >
          <div className="text-6xl" aria-hidden="true">
            {icon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(contentContainerVariants({ layout }))}>
        <HeadingTag className="text-heading-3 font-bold">{heading}</HeadingTag>

        <div className="text-body text-muted-on-background flex-1">
          {description}
        </div>

        {/* CTA */}
        {cta && (
          <div className="mt-compact">
            {cta.href ? (
              <FilledButton asChild semantic={cta.variant || "primary"}>
                <a href={cta.href}>{cta.label}</a>
              </FilledButton>
            ) : (
              <FilledButton
                onClick={cta.onClick}
                semantic={cta.variant || "primary"}
              >
                {cta.label}
              </FilledButton>
            )}
          </div>
        )}
      </div>
    </Card>
  );

  return cardContent;
};
