import { FeatureCard } from "@/components/layoutSandbox/FeatureCard";
import { SelectInput } from "@/components/layoutSandbox/SelectInput";
import { TaskItem } from "@/components/layoutSandbox/TaskItem";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { SectionCard } from "@/components/common/SectionCard";

export function LayoutSandbox() {
  return (
    <div className="max-w-6xl mx-auto section-spacing p-standard">
      {/* Section 1: Page Title */}
      <section className="space-y-tight border-b border-border pb-section">
        <h1 className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          TaskForge Pro
        </h1>
        <p className="subtitle-2 text-muted-foreground">
          Professional task management for ambitious teams (But actually just
          pt. 2 of Tailwind Layout Sandbox, Week 2 – Day 1a: Practicing spacing,
          flex, grid, and responsive utilities)
        </p>
      </section>

      {/* Section 2: Feature List */}
      <section className="space-y-compact">
        <h2>Vertical Stack ("Feature List")</h2>
        <SectionCard className="bg-surface-1 border border-border rounded-lg p-standard gap-compact shadow-sm">
          <FeatureCard
            title="AI-Powered Task Prioritization"
            description="Let machine learning analyze your workload and automatically surface the most critical tasks based on deadlines, dependencies, and team capacity."
            className="bg-surface-2"
          />
          <FeatureCard
            title="Advanced Team Analytics"
            description="Gain deep insights into productivity patterns, bottlenecks, and team velocity with comprehensive dashboards and custom reports."
            className="bg-surface-2"
          />
          <FeatureCard
            title="Real-Time Collaboration"
            description="Work seamlessly with your team through live updates, @mentions, file sharing, and integrated video calls. All without leaving the platform."
            className="bg-surface-2"
          />
        </SectionCard>
      </section>

      {/* Section 3: Responsive flex rows */}
      <section className="space-y-compact">
        <h2>Responsive Flex Row ("Sidebar + Content")</h2>
        <div className="space-y-standard">
          <div>
            <h3 className="text-primary mb-tight">Filter Bar with Content</h3>
            <p className="subtitle-2 text-muted-foreground mb-compact">
              Filters stack above content on mobile, move to left sidebar on
              desktop for better use of horizontal space.
            </p>
            <SectionCard>
              <div className="flex flex-col md:flex-row gap-compact">
                <div className="bg-surface-2 text-foreground border border-border rounded-lg p-compact md:basis-1/4">
                  <h4 className="text-primary mb-compact">Filter</h4>
                  <div className="space-y-compact">
                    <SelectInput
                      label="Status"
                      options={[
                        "All Tasks",
                        "Open",
                        "In Progress",
                        "Completed",
                        "Overdue",
                      ]}
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
                </div>
                <div className="bg-surface-2 text-foreground border border-border rounded-lg p-compact flex-1 md:basis-3/4">
                  <div className="flex items-center justify-between mb-compact">
                    <h4 className="text-primary">Task List</h4>
                  </div>
                  <div className="space-y-tight">
                    <TaskItem
                      title="Complete Q4 revenue report"
                      metadata="Due tomorrow • High priority • Assigned to you"
                      priority="high"
                      className="bg-surface-3"
                    />
                    <TaskItem
                      title="Review design mockups"
                      metadata="Due in 3 days • Medium priority • Jane Doe"
                      priority="medium"
                      className="bg-surface-3"
                    />
                    <TaskItem
                      title="Update API documentation"
                      metadata="Due next week • Low priority • John Smith"
                      priority="low"
                      className="bg-surface-3"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          <div>
            <h3 className="text-primary mb-tight">Activity Sidebar</h3>
            <p className="subtitle-2 text-muted-foreground mb-compact">
              Right sidebar shows recent activity and team updates. Hidden on
              smaller screens to maximize workspace.
            </p>
            <SectionCard>
              <div className="flex flex-row gap-compact">
                <div className="bg-surface-2 text-foreground border border-border rounded-lg p-compact flex-1">
                  <h4 className="text-primary mb-tight">Active Tasks</h4>
                  <p className="body-2 text-muted-foreground leading-relaxed mb-compact">
                    Your current focus area with today's priorities and
                    in-progress work.
                  </p>
                  <div className="space-y-tight">
                    <div className="bg-muted rounded-lg p-compact caption">
                      <div className="text-foreground font-medium">
                        Draft marketing copy
                      </div>
                      <div className="text-muted-foreground">In progress</div>
                    </div>
                    <div className="bg-muted rounded-lg p-compact caption">
                      <div className="text-foreground font-medium">
                        Code review for PR #247
                      </div>
                      <div className="text-muted-foreground">
                        Waiting on feedback
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-2 text-foreground border border-border rounded-lg p-compact hidden md:block md:basis-1/3">
                  <h4 className="text-primary mb-tight">Recent Activity</h4>
                  <div className="space-y-tight">
                    <ActivityItem
                      name="Jane Doe"
                      action='Completed "User research synthesis"'
                      timestamp="2 minutes ago"
                    />
                    <ActivityItem
                      name="John Smith"
                      action='Added comment on "API integration"'
                      timestamp="15 minutes ago"
                    />
                    <ActivityItem
                      name="Team Update"
                      action="3 new tasks assigned to Engineering"
                      timestamp="1 hour ago"
                      isLast
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </section>

      {/* Section 4: Dashboard Stats */}
      <section className="space-y-compact">
        <h2>Your Overview (Responsive Grid)</h2>
        <p className="subtitle-2 text-muted-foreground">
          Real-time insights into your workload and team performance.
        </p>
        <SectionCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-compact">
            <StatCard
              label="Open Tasks"
              value={12}
              description="Tasks waiting to be started or assigned to team members"
              variant="featured"
            />
            <StatCard
              label="In Progress"
              value={7}
              description="Currently active tasks being worked on by your team"
              className="bg-surface-2"
            />
            <StatCard
              label="Completed This Week"
              value={34}
              description="Tasks successfully finished in the last 7 days"
              className="bg-surface-2"
            />
            <StatCard
              label="Overdue"
              value={3}
              description="Tasks that have passed their deadline and need attention"
              variant="error"
              className="bg-surface-2"
            />
            <StatCard
              label="Team Members Active"
              value={8}
              description="Team members currently online or active in the last hour"
              className="sm:col-span-2 lg:col-span-4 bg-surface-2"
            />
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
