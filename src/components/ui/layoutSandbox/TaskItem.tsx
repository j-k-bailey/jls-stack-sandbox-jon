interface TaskItemProps {
  title: string;
  metadata: string;
  priority?: "high" | "medium" | "low";
}

export function TaskItem({ title, metadata, priority = "low" }: TaskItemProps) {
  const borderColor =
    priority === "high"
      ? "border-accent"
      : priority === "medium"
        ? "border-muted-foreground"
        : "border-border";

  return (
    <div
      className={`bg-muted/50 rounded-lg p-compact border-l-2 ${borderColor}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-body-2 font-semibold text-foreground">
            {title}
          </div>
          <div className="text-caption text-muted-foreground mt-tight">
            {metadata}
          </div>
        </div>
      </div>
    </div>
  );
}
