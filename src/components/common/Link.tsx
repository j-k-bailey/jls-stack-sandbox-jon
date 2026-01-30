import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Link({ className = "", ...props }: LinkProps) {
  return (
    <RouterLink
      data-discover-link
      className={cn(
        "relative inline-flex items-baseline \
        text-link underline underline-offset-2 decoration-1 decoration-current \
        transition-color duration-200 ease-in-out \
        hover:text-link-hover hover:decoration-2 \
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-link-hover",
        className,
      )}
      {...props}
    />
  );
}
