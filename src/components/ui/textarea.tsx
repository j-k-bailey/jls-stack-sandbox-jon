import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input hover:border-border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive body-2 placeholder:text-muted-foreground rounded-interactive border bg-background px-inset-sm py-inset-xs transition-colors aria-invalid:ring-[3px] flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
