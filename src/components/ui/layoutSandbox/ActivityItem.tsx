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
      <div className="text-accent font-semibold text-body-2">{name}</div>
      <div className="text-foreground mt-tight text-caption">{action}</div>
      <div className="text-muted-foreground mt-tight text-caption">
        {timestamp}
      </div>
    </div>
  );
}
