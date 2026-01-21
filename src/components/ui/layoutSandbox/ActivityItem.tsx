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
    <div className={isLast ? "pb-3" : "pb-3 border-b border-stone-800/50"}>
      <div className="text-stone-300 font-semibold">{name}</div>
      <div className="text-stone-500 mt-1">{action}</div>
      <div className="text-stone-600 mt-1">{timestamp}</div>
    </div>
  );
}
