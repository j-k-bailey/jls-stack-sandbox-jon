interface ActivityItemProps {
  name: string;
  action: string;
  timestamp: string;
  isLast?: boolean;
}

export function ActivityItem({
  name,
  action,
  timestamp,
  isLast = false,
}: ActivityItemProps) {
  return (
    <div className={isLast ? "pb-3" : "pb-3 border-b border-border"}>
      <div className="text-accent font-semibold">{name}</div>
      <div className="text-muted-foreground mt-1">{action}</div>
      <div className="text-muted-foreground mt-1">{timestamp}</div>
    </div>
  );
}
