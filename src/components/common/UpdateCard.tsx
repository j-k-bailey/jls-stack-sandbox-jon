import * as React from "react";
import { cn } from "@/lib/utils";

const UpdateCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-surface-1 border-l-4 border-primary p-standard rounded",
      className,
    )}
    {...props}
  />
));
UpdateCard.displayName = "UpdateCard";

const UpdateCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 mb-tight", className)}
    {...props}
  />
));
UpdateCardHeader.displayName = "UpdateCardHeader";

const UpdateCardVersion = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-overline text-primary", className)}
    {...props}
  />
));
UpdateCardVersion.displayName = "UpdateCardVersion";

const UpdateCardDate = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-caption text-muted-foreground", className)}
    {...props}
  />
));
UpdateCardDate.displayName = "UpdateCardDate";

const UpdateCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-h6 mb-tight", className)} {...props} />
));
UpdateCardTitle.displayName = "UpdateCardTitle";

const UpdateCardContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1 text-body-2 list-disc ml-standard", className)}
    {...props}
  />
));
UpdateCardContent.displayName = "UpdateCardContent";

const UpdateCardItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));
UpdateCardItem.displayName = "UpdateCardItem";

export {
  UpdateCard,
  UpdateCardHeader,
  UpdateCardVersion,
  UpdateCardDate,
  UpdateCardTitle,
  UpdateCardContent,
  UpdateCardItem,
};
