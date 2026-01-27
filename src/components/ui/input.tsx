import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-primary-on-background placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "bg-background border-input h-9 w-full min-w-0 rounded-lg border text-foreground px-compact py-tight text-base shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:hover:text-primary",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-disabled-background disabled:text-disabled-text disabled:border-disabled-border md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-4",
        "aria-invalid:ring-warning/20 aria-invalid:border-warning",
        "hover:border-accent/50 hover:shadow-xs hover:shadow-accent/40",
        "my-1",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
