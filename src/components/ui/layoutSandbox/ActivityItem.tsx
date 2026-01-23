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
    <div className={isLast ? "pb-tight" : "pb-tight border-b border-border"}>
      <div className="text-accent font-semibold body-2">{name}</div>
      <div className="text-foreground mt-tight caption">{action}</div>
      <div className="text-muted-foreground mt-tight caption">{timestamp}</div>
    </div>
  );
}
