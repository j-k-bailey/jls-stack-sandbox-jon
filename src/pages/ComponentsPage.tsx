import { ActivityItem } from "@/components/ui/layoutSandbox/ActivityItem";
import { FeatureCard } from "@/components/ui/layoutSandbox/FeatureCard";
import { SelectInput } from "@/components/ui/layoutSandbox/SelectInput";
import { StatCard } from "@/components/ui/layoutSandbox/StatCard";
import { TaskItem } from "@/components/ui/layoutSandbox/TaskItem";
import {
  ComponentHighlight,
  ComponentHighlightDescription,
  ComponentHighlightProps,
  ComponentHighlightShowcase,
  ComponentHighlightTitle,
} from "@/components/common/ComponentHighlight";
import { SimpleHeader } from "@/components/ui/simpleHeader";

export function ComponentsPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <SimpleHeader
        pageTitle="Component Gallery"
        pageDescription="A showcase of UI components created for JLS Stack Sandbox"
        hr
      />

      {/* ActivityItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ActivityItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to keep styling of various text consistent
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="card-standard mb-6 space-y-4">
            <ActivityItem
              name="John Doe"
              action="Created new project"
              timestamp="2 hours ago"
            />
            <ActivityItem
              name="Jane Smith"
              action="Updated component library"
              timestamp="1 hour ago"
            />
            <ActivityItem
              name="Bob Johnson"
              action="Deployed to production"
              timestamp="30 minutes ago"
              isLast
            />
          </div>
          <ComponentHighlightProps>
            name (string), action (string), timestamp (string), isLast (boolean)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr className="border-border" />

      {/* FeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>FeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A simple card that can look like a "emphasized feature — description"
          format on larger screens, or recompose to be easier to read on mobile
          screens.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FeatureCard
              title="Responsive Design"
              description="Automatically adapts to different screen sizes"
            />
            <FeatureCard
              title="Light & Dark Themes"
              description="Built with semantic color tokens that adapt to both modes"
            />
            <FeatureCard
              title="Accessible"
              description="Follows WCAG guidelines for accessibility"
            />
            <FeatureCard
              title="Customizable"
              description="Accept className props for additional styling"
            />
          </div>
          <ComponentHighlightProps>
            title (string), description (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr className="border-border" />

      {/* SelectInput Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SelectInput</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to make simple selection boxes blend in with the
          brand kit theming.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectInput
              label="Select a Framework"
              options={["React", "Vue", "Angular", "Svelte"]}
            />
            <SelectInput
              label="Select a Priority"
              options={["Low", "Medium", "High", "Critical"]}
            />
          </div>
          <ComponentHighlightProps>
            label (string), options (string[])
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr className="border-border" />

      {/* StatCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>StatCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Used to emphasize a stat, with featured and error variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard
              label="Default Variant"
              value="1,234"
              description="Standard stat card with neutral styling"
            />
            <StatCard
              label="Featured Variant"
              value="5,678"
              description="Highlighted with cyan accent colors"
              variant="featured"
            />
            <StatCard
              label="Error Variant"
              value="42"
              description="Used for alerts or warning statistics"
              variant="error"
            />
          </div>
          <ComponentHighlightProps>
            label (string), value (string | number), description (string),
            variant ("default" | "featured" | "error"), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr className="border-border" />

      {/* TaskItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>TaskItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Card to mark lists of items with high priority tasks visually
          emphasized.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="space-y-4 mb-6">
            <TaskItem
              title="Low Priority Task"
              metadata="Due: Tomorrow"
              priority="low"
            />
            <TaskItem
              title="Medium Priority Task"
              metadata="Due: This week"
              priority="medium"
            />
            <TaskItem
              title="High Priority Task"
              metadata="Due: Today"
              priority="high"
            />
          </div>
          <ComponentHighlightProps>
            title (string), metadata (string), priority ("high" | "medium" |
            "low")
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
    </div>
  );
}
