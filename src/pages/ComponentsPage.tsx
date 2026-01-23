import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import { FeatureCard } from "@/components/layoutSandbox/FeatureCard";
import { SelectInput } from "@/components/layoutSandbox/SelectInput";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { TaskItem } from "@/components/layoutSandbox/TaskItem";
import {
  ComponentHighlight,
  ComponentHighlightDescription,
  ComponentHighlightProps,
  ComponentHighlightShowcase,
  ComponentHighlightTitle,
} from "@/components/common/ComponentHighlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UpdateCard,
  UpdateCardContent,
  UpdateCardDate,
  UpdateCardHeader,
  UpdateCardItem,
  UpdateCardTitle,
  UpdateCardVersion,
} from "@/components/common/UpdateCard";
import AppLogo from "@/components/common/AppLogo";
import { ThemeToggle } from "@/components/ui/themeToggle";

export function ComponentsPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <PageHeader
        pageTitle="Component Gallery"
        pageDescription="A showcase of UI components created for JLS Stack Sandbox"
        hr
      />

      {/* ActivityItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ActivityItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to keep styling of various text consistent when
          displaying recent activity
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Activity Items">
            <div className="space-y-4">
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
          </SectionCard>
          <ComponentHighlightProps>
            name (string), action (string), timestamp (string), isLast (boolean)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
      <hr />

      {/* AppLogo Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>AppLogo</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Brand logo component displaying the app name and current section with
          visual icon indicator.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="App Logo">
            <div className="flex items-center justify-center p-8 bg-surface-1 rounded-lg">
              <div className="flex">
                <AppLogo />
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>No props required</ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Button Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Button</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Versatile button component with multiple semantic variants, sizes, and
          styles including default, outline, ghost, and link variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Buttons">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-3">Semantic Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button semantic="primary">Primary</Button>
                  <Button semantic="accent">Accent</Button>
                  <Button semantic="success">Success</Button>
                  <Button semantic="warning">Warning</Button>
                  <Button semantic="neutral">Neutral</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3">Style Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3">Sizes</p>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-3">Combined Variants</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="primary" variant="default">
                      Primary Default
                    </Button>
                    <Button semantic="primary" variant="outline">
                      Primary Outline
                    </Button>
                    <Button semantic="primary" variant="ghost">
                      Primary Ghost
                    </Button>
                    <Button semantic="primary" variant="link">
                      Primary Link
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="success" variant="default" size="sm">
                      Success Sm
                    </Button>
                    <Button semantic="success" variant="outline" size="default">
                      Success Default
                    </Button>
                    <Button semantic="success" variant="ghost" size="lg">
                      Success Lg
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button semantic="warning" variant="default" size="icon">
                      🗑️
                    </Button>
                    <Button semantic="accent" variant="default" size="icon-lg">
                      →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            semantic ("primary" | "accent" | "success" | "warning" | "neutral"),
            variant ("default" | "outline" | "ghost" | "link"), size ("sm" |
            "default" | "lg" | "icon" | "icon-sm" | "icon-lg"), asChild
            (boolean)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Input Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Input</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Text input component with support for file uploads, placeholders, and
          form validation with accessibility features.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Input Fields">
            <div className="space-y-4 max-w-sm">
              <Input placeholder="Enter text here..." />
              <Input placeholder="Email address..." type="email" />
              <Input placeholder="Password..." type="password" />
              <Input type="file" />
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            type (string), placeholder (string), className (string), disabled
            (boolean)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
      <hr />

      {/* FeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>FeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A simple card that can look like a "emphasized feature — description"
          format on larger screens.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Feature Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </SectionCard>
          <ComponentHighlightProps>
            title (string), description (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* PageHeader Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>PageHeader</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Header component for page sections with title, subtitle, description,
          and optional actions.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Page Header Preview">
            <PageHeader
              pageTitle="Example Page"
              pageSubtitle="Subtitle text"
              pageDescription="This is a longer description of the page content."
              level="h2"
            />
          </SectionCard>
          <ComponentHighlightProps>
            pageTitle (string), pageSubtitle (string), pageDescription (string),
            actions (ReactNode), hr (boolean), level ("h1" - "h6")
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* SectionCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SectionCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Card component for organizing content in sections with a title and
          optional description.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="mb-6">
            <SectionCard
              title="Card Title"
              description="Optional description of the card content"
            >
              <p>Card content goes here</p>
            </SectionCard>
          </div>
          <ComponentHighlightProps>
            title (string), description (string), className (string), children
            (ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* SelectInput Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SelectInput</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to make simple selection boxes blend in with the
          brand kit theming.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Select Inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Select a Framework"
                options={["React", "Vue", "Angular", "Svelte"]}
              />
              <SelectInput
                label="Select a Priority"
                options={["Low", "Medium", "High", "Critical"]}
              />
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            label (string), options (string[])
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* StatCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>StatCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Used to emphasize a stat, with featured and error variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Stat Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </SectionCard>
          <ComponentHighlightProps>
            label (string), value (string | number), description (string),
            variant ("default" | "featured" | "error"), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* StatsRow Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>StatsRow</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Displays a grid of statistics with labels, values, and optional hints.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <div className="mb-6">
            <StatsRow />
          </div>
          <ComponentHighlightProps>
            stats (Array of {"{label, value, hint?}"})
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* TaskItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>TaskItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Card to mark lists of items with high priority tasks visually
          emphasized.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Task Items">
            <div className="space-y-compact">
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
          </SectionCard>
          <ComponentHighlightProps>
            title (string), metadata (string), priority ("high" | "medium" |
            "low")
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* ThemeToggle Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ThemeToggle</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Button component for switching between light and dark theme modes with
          persistent localStorage support.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Theme Toggle">
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <p className="text-sm text-muted-foreground">
                Click to toggle between light and dark themes
              </p>
            </div>
          </SectionCard>
          <ComponentHighlightProps>No props required</ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* UpdateCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>UpdateCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Compound card component for displaying update information with
          version, date, title, and content list.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Update Cards">
            <UpdateCard>
              <UpdateCardHeader>
                <UpdateCardVersion>v2.1.0</UpdateCardVersion>
                <UpdateCardDate>March 15, 2024</UpdateCardDate>
              </UpdateCardHeader>
              <UpdateCardTitle>New Features Released</UpdateCardTitle>
              <UpdateCardContent>
                <UpdateCardItem>Added dark mode support</UpdateCardItem>
                <UpdateCardItem>Improved performance</UpdateCardItem>
                <UpdateCardItem>Fixed accessibility issues</UpdateCardItem>
              </UpdateCardContent>
            </UpdateCard>
          </SectionCard>
          <ComponentHighlightProps>
            UpdateCard, UpdateCardHeader, UpdateCardVersion, UpdateCardDate,
            UpdateCardTitle, UpdateCardContent, UpdateCardItem
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
    </div>
  );
}
