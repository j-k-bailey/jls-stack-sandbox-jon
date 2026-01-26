import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Define variants BEFORE the interface
const responsiveGridVariants = cva("grid", {
  variants: {
    maxColumns: {
      two: "grid-cols-1 md:grid-cols-2",
      three: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      four: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
    gap: {
      tight: "gap-2",
      compact: "gap-4",
      standard: "gap-6",
      section: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      stretch: "items-stretch",
      end: "items-end",
    },
  },
  defaultVariants: {
    maxColumns: "four",
    gap: "standard",
    align: "stretch",
  },
});

// 2. Extend VariantProps and add additional props
export interface ResponsiveGridProps extends VariantProps<
  typeof responsiveGridVariants
> {
  children: React.ReactNode;
  className?: string;
}

// 3. Use the correct variant name in component
export const ResponsiveGrid = ({
  maxColumns,
  gap,
  align,
  children,
  className,
}: ResponsiveGridProps) => {
  return (
    <div
      className={cn(
        responsiveGridVariants({ maxColumns, gap, align }),
        className,
      )}
    >
      {children}
    </div>
  );
};

ResponsiveGrid.displayName = "ResponsiveGrid";
