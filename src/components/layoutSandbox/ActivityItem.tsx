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
    <div className={isLast ? "pb-tight" : "pb-inset-xs border-b border-border"}>
      <div className="text-accent font-semibold body-2">{name}</div>
      <div className="text-foreground mt-inset-xs caption">{action}</div>
      <div className="text-muted-foreground mt-inset-xs caption">
        {timestamp}
      </div>
    </div>
  );
}
