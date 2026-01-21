interface TaskItemProps {
  title: string;
  metadata: string;
  priority?: "high" | "medium" | "low";
}

export function TaskItem({ title, metadata, priority = "low" }: TaskItemProps) {
  const borderColor =
    priority === "high"
      ? "border-yellow-600"
      : priority === "medium"
        ? "border-stone-600"
        : "border-stone-600";

  return (
    <div className={`bg-stone-900/50 rounded-lg p-4 border-l-2 ${borderColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-semibold text-stone-200">{title}</div>
          <div className="text-xs text-stone-500 mt-1">{metadata}</div>
        </div>
      </div>
    </div>
  );
}
