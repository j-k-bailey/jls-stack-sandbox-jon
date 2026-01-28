import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { InlineAlert } from "@/components/ui/InlineAlert";
import {
  ClipboardList,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
} from "lucide-react";

export function DashboardPage() {
  // This would come from your data layer in a real app
  const hasTasks = false;
  const taskStats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0,
  };

  return (
    <div className="space-y-section container">
      <PageHeader
        pageTitle="Task Dashboard"
        pageDescription="Manage your tasks and track your productivity."
      />
      {/* Stats Overview */}
      <ResponsiveGrid maxColumns="four">
        <StatCard
          label="Total Tasks"
          value={taskStats.total.toString()}
          description="All tasks"
          variant="default"
        />
        <StatCard
          label="In Progress"
          value={taskStats.inProgress.toString()}
          description="Active tasks"
          variant="featured"
        />
        <StatCard
          label="Completed"
          value={taskStats.completed.toString()}
          description="Finished tasks"
          variant="success"
        />
        <StatCard
          label="Overdue"
          value={taskStats.overdue.toString()}
          description="Need attention"
          variant="error"
        />
      </ResponsiveGrid>
      {/* Empty State or Task Board */}
      {!hasTasks ? (
        <div className="space-y-standard">
          <InlineAlert variant="primary" icon={ClipboardList}>
            <div className="flex-1">
              <p className="font-bold">Welcome to Your Task Manager!</p>
              <p className="text-sm mt-1">
                Get started by creating your first task. Organize your work with
                priorities, deadlines, and categories.
              </p>
            </div>
          </InlineAlert>

          <SectionCard
            title="Your Task Board"
            description="Organize tasks into columns and track progress visually"
          >
            <div className="py-spacious">
              <div className="max-w-2xl mx-auto text-center space-y-standard">
                {/* Empty State Illustration */}
                <div className="flex justify-center">
                  <div className="relative">
                    <Package className="h-24 w-24 text-muted-foreground opacity-50" />
                    <div className="absolute -top-2 -right-2">
                      <Plus className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Empty State Message */}
                <div className="space-y-compact">
                  <h3 className="headline-4 text-foreground">No Tasks Yet</h3>
                  <p className="text-muted-foreground">
                    Your task board is empty. Create your first task to start
                    organizing your work and boosting your productivity.
                  </p>
                </div>

                {/* Kanban Preview */}
                <div className="grid grid-cols-3 gap-compact mt-section">
                  <div className="bg-surface-1 border border-border rounded-lg p-compact text-center">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      To Do
                    </p>
                    <div className="h-24 border-2 border-dashed border-border rounded flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">
                        Tasks will appear here
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-1 border border-border rounded-lg p-compact text-center">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      In Progress
                    </p>
                    <div className="h-24 border-2 border-dashed border-border rounded flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">
                        Active tasks
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-1 border border-border rounded-lg p-compact text-center">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Done
                    </p>
                    <div className="h-24 border-2 border-dashed border-border rounded flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-compact">
                  <FeatureCard
                    layout="vertical"
                    emphasis="bold"
                    icon={<Plus className="h-12 w-12" />}
                    heading="Create Your First Task"
                    headingLevel="h4"
                    description="Start organizing your work with our intuitive task creation form. Add priorities, deadlines, categories, and tags."
                    cta={{
                      label: "Create Task",
                      href: "/create-task",
                      variant: "primary",
                    }}
                    badges={[
                      {
                        text: "GET STARTED",
                        variant: "primary",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      ) : (
        // This section would show when tasks exist
        <SectionCard
          title="Your Task Board"
          description="Drag and drop tasks between columns"
        >
          <div className="h-96 bg-muted-background border border-border-muted rounded-lg flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <ClipboardList className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Kanban board would appear here</p>
            </div>
          </div>
        </SectionCard>
      )}
      {/* Quick Actions */}
      <SectionCard
        title="Quick Actions"
        description="Common task management actions"
      >
        <ResponsiveGrid maxColumns="three">
          <FeatureCard
            icon={<Plus className="h-12 w-12" />}
            heading="Create Task"
            headingLevel="h3"
            description="Add a new task with priority, deadline, and category to stay organized."
            cta={{
              label: "New Task",
              href: "/create-task",
              variant: "primary",
            }}
          />
          <FeatureCard
            icon={<TrendingUp className="h-12 w-12" />}
            heading="View Analytics"
            headingLevel="h3"
            description="Track your productivity with insights on completed tasks and time management."
            cta={{
              label: "View Stats",
              href: "/analytics",
              variant: "accent",
            }}
          />
          <FeatureCard
            icon={<CheckCircle2 className="h-12 w-12" />}
            heading="Manage Tasks"
            headingLevel="h3"
            description="Review all your tasks, update statuses, and mark items as complete."
            cta={{
              label: "View All",
              href: "/tasks",
              variant: "neutral",
            }}
          />
        </ResponsiveGrid>
      </SectionCard>
      {/* Tips for Getting Started */}
      {!hasTasks && (
        <SectionCard
          title="Getting Started Tips"
          description="Make the most of your task manager"
        >
          <div className="grid md:grid-cols-2 gap-compact">
            <div className="flex gap-compact items-start p-compact bg-surface-1 rounded-lg border border-border">
              <div className="text-primary shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Set Realistic Deadlines
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add deadline dates to your tasks to stay on track and
                  prioritize effectively.
                </p>
              </div>
            </div>

            <div className="flex gap-compact items-start p-compact bg-surface-1 rounded-lg border border-border">
              <div className="text-accent shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Use Priority Levels
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mark tasks as high, medium, or low priority to focus on what
                  matters most.
                </p>
              </div>
            </div>

            <div className="flex gap-compact items-start p-compact bg-surface-1 rounded-lg border border-border">
              <div className="text-success shrink-0">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Organize with Categories
                </h3>
                <p className="text-sm text-muted-foreground">
                  Group related tasks by department or project for better
                  organization.
                </p>
              </div>
            </div>

            <div className="flex gap-compact items-start p-compact bg-surface-1 rounded-lg border border-border">
              <div className="text-warning shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Tag for Quick Filtering
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add tags like "urgent" or "blocked" to quickly find and filter
                  tasks.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
