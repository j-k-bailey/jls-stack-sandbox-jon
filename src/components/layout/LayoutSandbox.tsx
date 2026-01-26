import { SimpleFeatureCard } from "@/components/layoutSandbox/SimpleFeatureCard";
import { SelectInput } from "@/components/layoutSandbox/SelectInput";
import { TaskItem } from "@/components/layoutSandbox/TaskItem";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { SectionCard } from "@/components/common/SectionCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

export function LayoutSandbox() {
  return (
    <div className="space-y-section">
      {/* Section 1: Vertical Stack Pattern */}
      <SectionCard
        title="Vertical Stack Pattern"
        description="SimpleFeatureCard components in a vertical layout with consistent spacing"
      >
        <div className="space-y-compact">
          <SimpleFeatureCard
            title="AI-Powered Prioritization"
            description="Automatically surface critical tasks based on deadlines, dependencies, and team capacity."
          />
          <SimpleFeatureCard
            title="Advanced Analytics"
            description="Gain insights into productivity patterns, bottlenecks, and team velocity."
          />
          <SimpleFeatureCard
            title="Real-Time Collaboration"
            description="Live updates, @mentions, and file sharing without leaving the platform."
          />
        </div>
      </SectionCard>

      {/* Section 2: Sidebar + Content Pattern */}
      <SectionCard
        title="Sidebar + Content Pattern"
        description="Responsive flex layout: stacks on mobile, side-by-side on desktop"
      >
        <div className="flex flex-col md:flex-row gap-standard">
          {/* Sidebar */}
          <div className="md:basis-1/4 space-y-compact">
            <SelectInput
              label="Status"
              options={["All Tasks", "Open", "In Progress", "Completed"]}
            />
            <SelectInput
              label="Priority"
              options={["All Priorities", "High", "Medium", "Low"]}
            />
            <SelectInput
              label="Assignee"
              options={["All Team", "Me", "Unassigned"]}
            />
          </div>

          {/* Main Content */}
          <div className="md:basis-3/4 space-y-tight">
            <TaskItem
              title="Complete Q4 revenue report"
              metadata="Due tomorrow • High priority"
              priority="high"
            />
            <TaskItem
              title="Review design mockups"
              metadata="Due in 3 days • Medium priority"
              priority="medium"
            />
            <TaskItem
              title="Update API documentation"
              metadata="Due next week • Low priority"
              priority="low"
            />
          </div>
        </div>
      </SectionCard>

      {/* Section 3: Content + Right Sidebar Pattern */}
      <SectionCard
        title="Content + Right Sidebar Pattern"
        description="Activity sidebar hidden on mobile, visible on medium+ screens"
      >
        <div className="flex flex-row gap-standard">
          {/* Main Content */}
          <div className="flex-1 space-y-compact">
            <h3 className="font-heading text-base font-semibold">
              Active Tasks
            </h3>
            <div className="space-y-tight">
              <div className="bg-surface-2 rounded-lg p-compact border border-border-muted">
                <div className="font-medium">Draft marketing copy</div>
                <div className="text-sm text-muted-foreground">In progress</div>
              </div>
              <div className="bg-surface-2 rounded-lg p-compact border border-border-muted">
                <div className="font-medium">Code review for PR #247</div>
                <div className="text-sm text-muted-foreground">
                  Waiting on feedback
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden md:block md:basis-1/3 space-y-compact">
            <h3 className="font-heading text-base font-semibold">
              Recent Activity
            </h3>
            <div className="space-y-tight">
              <ActivityItem
                name="Jane Doe"
                action="Completed research synthesis"
                timestamp="2 min ago"
              />
              <ActivityItem
                name="John Smith"
                action="Added comment on API task"
                timestamp="15 min ago"
              />
              <ActivityItem
                name="Team Update"
                action="3 new tasks assigned"
                timestamp="1 hour ago"
                isLast
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 4: Responsive Grid Pattern */}
      <SectionCard
        title="Responsive Grid Pattern"
        description="ResponsiveGrid component with StatCard items demonstrating 1→2→4 column behavior"
      >
        <ResponsiveGrid>
          <StatCard
            label="Open Tasks"
            value={12}
            description="Waiting to be started"
            variant="featured"
          />
          <StatCard
            label="In Progress"
            value={7}
            description="Currently active"
          />
          <StatCard
            label="Completed"
            value={34}
            description="Finished this week"
          />
          <StatCard
            label="Overdue"
            value={3}
            description="Need attention"
            variant="error"
          />
        </ResponsiveGrid>
      </SectionCard>

      {/* Section 5: Full-Width Grid Item */}
      <SectionCard
        title="Grid Spanning Pattern"
        description="Using manual column spans for asymmetric layouts"
      >
        <ResponsiveGrid>
          <StatCard
            label="Active Users"
            value={156}
            description="Online in the last hour"
          />
          <StatCard
            label="API Calls"
            value="2.4M"
            description="Requests this month"
          />
          <div className="lg:col-span-2">
            <StatCard
              label="System Health"
              value="99.8%"
              description="Uptime across all services"
              variant="featured"
            />
          </div>
        </ResponsiveGrid>
      </SectionCard>
    </div>
  );
}
