interface TaskItemProps {
  title: string;
  metadata: string;
  priority?: "high" | "medium" | "low";
}

export function TaskItem({ title, metadata, priority = "low" }: TaskItemProps) {
  const borderColor =
    priority === "high"
      ? "border-primary"
      : priority === "medium"
        ? "border-muted-foreground"
        : "border-border";

  return (
    <div className={`bg-muted/50 rounded-lg p-4 border-l-2 ${borderColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{metadata}</div>
        </div>
      </div>
    </div>
  );
}
