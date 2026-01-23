import { SectionCard } from "@/components/common/SectionCard";

type Stat = {
  label: string;
  value: string;
  hint?: string;
};

const defaultStats: Stat[] = [
  { label: "Routes", value: "3+" },
  { label: "Shell", value: "Online" },
  { label: "UI System", value: "Growing" },
];

export function StatsRow({ stats = defaultStats }: { stats?: Stat[] }) {
  return (
    <SectionCard
      title="Sandbox Status"
      description="High-level snapshot of what your app supports."
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-border bg-surface-1 p-standard"
          >
            <div className="text-xs text-foreground">{s.label}</div>
            <div className="text-lg font-semibold">{s.value}</div>
            {s.hint ? (
              <div className="text-xs text-surface-muted mt-compact">
                {s.hint}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
