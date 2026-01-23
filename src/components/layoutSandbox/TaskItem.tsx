import { cn } from "@/lib/utils";
interface TaskItemProps {
  title: string;
  metadata: string;
  priority?: "high" | "medium" | "low";
  className?: string;
}

export function TaskItem({
  title,
  metadata,
  priority = "low",
  className,
}: TaskItemProps) {
  const borderColor =
    priority === "high"
      ? "border-accent"
      : priority === "medium"
        ? "border-muted-foreground"
        : "border-border";

  return (
    <div
      className={cn(
        `bg-muted/50 rounded-lg p-compact border-l-2 ${borderColor}`,
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="body-2 font-semibold text-foreground">{title}</div>
          <div className="caption text-muted-foreground mt-tight">
            {metadata}
          </div>
        </div>
      </div>
    </div>
  );
}
