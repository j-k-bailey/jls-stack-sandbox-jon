import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FilledButton } from "@/components/ui/BrandButtonVariants";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const featureCardVariants = cva("relative", {
  variants: {
    layout: {
      vertical: "flex flex-col ",
      horizontal: "flex flex-col p-inset-lg md:flex-row",
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
      vertical: "w-full aspect-video rounded-t-nested",
      horizontal:
        "w-full md:w-2/5 lg:w-1/3 aspect-video md:aspect-square rounded-t-nested md:rounded-l-nested md:rounded-tr-none",
    },
  },
});

const contentContainerVariants = cva("flex flex-col gap-inline", {
  variants: {
    layout: {
      vertical: "",
      horizontal: "md:flex-1",
    },
  },
});

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
    href?: string; // External link (uses <a>)
    to?: string; // React Router link (uses <Link>)
    onClick?: () => void;
    asChild?: boolean; // If true, renders children instead of button
    variant?: "primary" | "accent" | "neutral";
  };
  badges?: Array<{
    text: string;
    variant?:
      | "default"
      | "accent"
      | "success"
      | "warning"
      | "neutral"
      | "muted"
      | "primary-subtle"
      | "accent-subtle"
      | "success-subtle"
      | "warning-subtle"
      | "neutral-subtle"
      | "muted-subtle"
      | "primary-outline"
      | "accent-outline"
      | "success-outline"
      | "warning-outline"
      | "neutral-outline"
      | "outline"
      | "ghost"
      | "link";
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
        "p-inset-lg rounded-large",
        className,
      )}
      onClick={onClick}
    >
      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant={badge.variant || "default"}>
              {badge.text}
            </Badge>
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
        <HeadingTag className="headline-3 font-bold">{heading}</HeadingTag>

        <div className="body-1 text-muted-on-background flex-1">
          {description}
        </div>

        {/* CTA */}
        {cta && (
          <div className="mt-stack">
            {/* React Router Link */}
            {cta.to ? (
              <FilledButton asChild semantic={cta.variant || "primary"}>
                <Link to={cta.to}>{cta.label}</Link>
              </FilledButton>
            ) : /* External Link */
            cta.href ? (
              <FilledButton asChild semantic={cta.variant || "primary"}>
                <a href={cta.href}>{cta.label}</a>
              </FilledButton>
            ) : (
              /* Button with onClick */
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
