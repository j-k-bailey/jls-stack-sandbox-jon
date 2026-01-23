import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { StatCard } from "@/components/layoutSandbox/StatCard";

export function DashboardPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <PageHeader
        pageTitle="JLS Stack Dashboard (Placeholder)"
        pageDescription="This is your future home for metrics, quick links, and key actions. For now, it just proves that routing works."
      />
      <div className="space-y-6 mt-8">
        {/* Row 1: Key Stats */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <StatCard
              label="Active Users"
              value="1234"
              description="Users online right now"
              variant="featured"
              className="h-full"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <StatCard
              label="Failed Requests"
              value="12"
              description="Errors in last 24h"
              variant="error"
              className="h-full"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <StatCard
              label="System Health"
              value="98.5%"
              description="Overall uptime"
              className="h-full"
            />
          </div>
        </div>

        {/* Row 2: Graph and Secondary Content */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <SectionCard title="Primary Graph">
              <div className="h-64 bg-muted-background border border-border-muted rounded-lg flex items-center justify-center text-muted-foreground">
                Graph placeholder
              </div>
            </SectionCard>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <SectionCard title="Secondary Content" className="h-full">
              <div className="space-y-compact"></div>
            </SectionCard>
          </div>
        </div>

        {/* Row 3: Stats Row */}
        <StatsRow
          stats={[
            {
              label: "Routes",
              value: "3+",
            },
            {
              label: "Shell",
              value: "Online",
            },
            {
              label: "UI System",
              value: "Growing",
            },
          ]}
        />

        {/* Recent Activity */}
        <SectionCard title="Recent Activity">
          <div className="space-y-compact">
            <div className="flex items-center justify-between">
              <span className="body-2 text-muted-foreground">
                No recent activity
              </span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
