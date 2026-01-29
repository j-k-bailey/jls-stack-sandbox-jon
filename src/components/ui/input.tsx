import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 body-1",
        "bg-background text-foreground border border-border-muted rounded-interactive",
        "p-inset-xs",
        "placeholder:text-muted-foreground",
        "transition-colors",
        "hover:border-primary",
        "disabled:pointer-events-none disabled:cursor-not-allowed",
        "disabled:bg-disabled-background disabled:text-disabled-foreground disabled:border-disabled",
        "aria-invalid:border-warning aria-invalid:ring-warning aria-invalid:text-warning-on-background",
        "file:inline-flex file:border-0 file:bg-transparent file:text-primary-on-background file:button-text",
        "file:hover:text-primary-hover file:transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
