import { FeatureCard } from "@/components/ui/layoutSandbox/FeatureCard";
import { SelectInput } from "@/components/ui/layoutSandbox/SelectInput";
import { TaskItem } from "@/components/ui/layoutSandbox/TaskItem";
import { StatCard } from "@/components/ui/layoutSandbox/StatCard";
import { ActivityItem } from "@/components/ui/layoutSandbox/ActivityItem";

export function LayoutSandbox() {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-neutral-900 to-stone-950 text-stone-200 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12 px-6">
        {/* Section 1: Page Title */}
        <section className="space-y-3 border-b border-stone-800/50 pb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent">
            TaskForge Pro
          </h1>
          <p className="text-sm text-stone-400">
            Professional task management for ambitious teams (But actually just
            pt. 2 of Tailwind Layout Sandbox, Week 2 – Day 1a: Practicing
            spacing, flex, grid, and responsive utilities)
          </p>
        </section>

        {/* Section 2: Feature List */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Vertical Stack (“Feature List”)
          </h2>
          <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 space-y-4 shadow-2xl">
            <FeatureCard
              title="AI-Powered Task Prioritization"
              description="Let machine learning analyze your workload and automatically surface the most critical tasks based on deadlines, dependencies, and team capacity."
            />
            <FeatureCard
              title="Advanced Team Analytics"
              description="Gain deep insights into productivity patterns, bottlenecks, and team velocity with comprehensive dashboards and custom reports."
            />
            <FeatureCard
              title="Real-Time Collaboration"
              description="Work seamlessly with your team through live updates, @mentions, file sharing, and integrated video calls. All without leaving the platform."
            />
          </div>
        </section>

        {/* Section 3: Responsive flex rows */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Responsive Flex Row (“Sidebar + Content”)
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-3">
                Filter Bar with Content
              </h3>
              <p className="text-sm text-stone-400 mb-5">
                Filters stack above content on mobile, move to left sidebar on
                desktop for better use of horizontal space.
              </p>
              <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 flex flex-col md:flex-row gap-5 shadow-2xl">
                <div className="bg-stone-950/60 border border-stone-700/50 rounded-lg p-6 md:basis-1/4">
                  <h4 className="font-semibold text-yellow-500 text-lg mb-4">
                    Filter
                  </h4>
                  <div className="space-y-4">
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
                <div className="bg-stone-950/60 border border-stone-700/50 rounded-lg p-6 flex-1 md:basis-3/4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-yellow-500 text-lg">
                      Task List
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <TaskItem
                      title="Complete Q4 revenue report"
                      metadata="Due tomorrow • High priority • Assigned to you"
                      priority="high"
                    />
                    <TaskItem
                      title="Review design mockups"
                      metadata="Due in 3 days • Medium priority • Jane Doe"
                      priority="medium"
                    />
                    <TaskItem
                      title="Update API documentation"
                      metadata="Due next week • Low priority • John Smith"
                      priority="low"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-3">
                Activity Sidebar
              </h3>
              <p className="text-sm text-stone-400 mb-5">
                Right sidebar shows recent activity and team updates. Hidden on
                smaller screens to maximize workspace.
              </p>
              <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 flex flex-row gap-5 shadow-2xl">
                <div className="bg-stone-950/60 border border-stone-700/50 rounded-lg p-6 flex-1">
                  <h4 className="font-semibold text-yellow-500 text-lg mb-3">
                    Active Tasks
                  </h4>
                  <p className="text-sm text-stone-400 leading-relaxed mb-4">
                    Your current focus area with today's priorities and
                    in-progress work.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-stone-900/50 rounded-lg p-2 text-xs">
                      <div className="text-stone-300">Draft marketing copy</div>
                      <div className="text-stone-500">In progress</div>
                    </div>
                    <div className="bg-stone-900/50 rounded-lg p-2 text-xs">
                      <div className="text-stone-300">
                        Code review for PR #247
                      </div>
                      <div className="text-stone-500">Waiting on feedback</div>
                    </div>
                  </div>
                </div>
                <div className="bg-stone-950/60 border border-stone-700/50 rounded-lg p-6 hidden md:block md:basis-1/3">
                  <h4 className="font-semibold text-yellow-500 text-lg mb-3">
                    Recent Activity
                  </h4>
                  <div className="space-y-3 text-xs">
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
            </div>
          </div>
        </section>

        {/* Section 4: Dashboard Stats */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Your Overview (Responsive Grid)
          </h2>
          <p className="text-sm text-stone-400">
            Real-time insights into your workload and team performance.
          </p>
          <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 shadow-2xl">
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
            />
            <StatCard
              label="Completed This Week"
              value={34}
              description="Tasks successfully finished in the last 7 days"
            />
            <StatCard
              label="Overdue"
              value={3}
              description="Tasks that have passed their deadline and need attention"
              variant="error"
            />
            <StatCard
              label="Team Members Active"
              value={8}
              description="Team members currently online or active in the last hour"
              className="sm:col-span-2 lg:col-span-4"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
