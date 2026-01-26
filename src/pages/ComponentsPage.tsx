import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import { SimpleFeatureCard } from "@/components/layoutSandbox/SimpleFeatureCard";
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
import { Button } from "@/components/ui/Button";
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
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { InlineAlert } from "@/components/ui/InlineAlert";
import {
  FaCircleInfo,
  FaBell,
  FaFaceSmile,
  FaCircleCheck,
  FaTriangleExclamation,
  FaShield,
  FaLightbulb,
  FaCode,
  FaRocket,
} from "react-icons/fa6";
import { FeatureCard } from "@/components/ui/FeatureCard";

export function ComponentsPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
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
              <AppLogo />
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
          Versatile button system with semantic color variants and multiple
          styles. Use FilledButton, OutlineButton, GhostButton, and LinkButton
          directly for static UIs, or use the Button wrapper with variant prop
          for dynamic rendering.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Buttons">
            <div className="space-y-section">
              {/* Semantic Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Semantic Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button semantic="primary">Primary</Button>
                  <Button semantic="accent">Accent</Button>
                  <Button semantic="success">Success</Button>
                  <Button semantic="warning">Warning</Button>
                  <Button semantic="neutral">Neutral</Button>
                </div>
              </div>

              {/* Style Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Style Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button semantic="primary">Default</Button>
                  <Button variant="outline" semantic="primary">
                    Outline
                  </Button>
                  <Button variant="ghost" semantic="primary">
                    Ghost
                  </Button>
                  <Button variant="link" semantic="primary">
                    Link
                  </Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Combined Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Combined Variants
                </h3>
                <div className="space-y-standard">
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="primary">Primary Default</Button>
                    <Button variant="outline" semantic="primary">
                      Primary Outline
                    </Button>
                    <Button variant="ghost" semantic="primary">
                      Primary Ghost
                    </Button>
                    <Button variant="link" semantic="primary">
                      Primary Link
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="success" size="sm">
                      Success Sm
                    </Button>
                    <Button variant="outline" semantic="success" size="default">
                      Success Default
                    </Button>
                    <Button variant="ghost" semantic="success" size="lg">
                      Success Ghost Lg
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button semantic="warning" size="icon">
                      🗑️
                    </Button>
                    <Button semantic="accent" size="icon-lg">
                      →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Button: variant ("default" | "filled" | "outline" | "ghost" |
            "link"), semantic ("default" | "primary" | "accent" | "success" |
            "warning" | "neutral"), size ("default" | "sm" | "lg" | "icon" |
            "icon-sm" | "icon-lg"). FilledButton, OutlineButton, GhostButton,
            LinkButton: semantic and size only (no variant prop needed).
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* FeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>FeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A flexible card component for showcasing features, services, or
          content with support for images, icons, badges, and CTAs. Supports
          both vertical and horizontal layouts with subtle or bold emphasis
          variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          {/* Vertical Layout - Subtle */}
          <SectionCard title="Vertical Layout - Subtle Emphasis">
            <ResponsiveGrid maxColumns="three">
              <FeatureCard
                heading="Automated Workflows"
                description="Build sophisticated automation pipelines with our visual workflow builder. Connect APIs, transform data, and automate repetitive tasks."
                image={{
                  src: "https://picsum.photos/seed/workflow/800/450",
                  alt: "Workflow automation interface",
                }}
                cta={{
                  label: "Learn More",
                  href: "#",
                }}
                badge={{ text: "New", variant: "accent" }}
              />

              <FeatureCard
                icon={<FaRocket />}
                heading="Lightning Fast"
                description="Optimized performance ensures your applications run at peak efficiency with minimal resource usage."
                cta={{
                  label: "View Benchmarks",
                  onClick: () => console.log("Benchmarks clicked"),
                }}
              />

              <FeatureCard
                image={{
                  src: "https://picsum.photos/seed/security/800/450",
                  alt: "Security dashboard",
                }}
                heading="Enterprise Security"
                headingLevel="h3"
                description="Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards to keep your data safe."
                cta={{
                  label: "Security Details",
                  href: "#",
                  variant: "neutral",
                }}
              />
            </ResponsiveGrid>
          </SectionCard>

          {/* Horizontal Layout - Bold */}
          <SectionCard title="Horizontal Layout - Bold Emphasis">
            <div className="space-y-compact">
              <FeatureCard
                layout="horizontal"
                emphasis="bold"
                image={{
                  src: "https://picsum.photos/seed/analytics/800/800",
                  alt: "Analytics dashboard",
                }}
                heading="Advanced Analytics"
                headingLevel="h2"
                description={
                  <>
                    Track every metric that matters with real-time dashboards
                    and customizable reports.
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Custom KPI tracking</li>
                      <li>Real-time data sync</li>
                      <li>Export to CSV/PDF</li>
                    </ul>
                  </>
                }
                cta={{
                  label: "Start Free Trial",
                  href: "#",
                  variant: "accent",
                }}
                badge={{ text: "Popular", variant: "primary" }}
              />

              <FeatureCard
                layout="horizontal"
                emphasis="bold"
                icon={<FaCode />}
                heading="Developer Friendly"
                description="Comprehensive API documentation, SDKs for popular languages, and extensive code examples to get you started in minutes."
                cta={{
                  label: "View API Docs",
                  href: "#",
                  variant: "primary",
                }}
              />
            </div>
          </SectionCard>

          {/* Mixed Layouts */}
          <SectionCard title="Clickable Cards & Various States">
            <ResponsiveGrid maxColumns="two">
              <FeatureCard
                heading="Click Entire Card"
                description="This entire card is clickable and shows a hover effect. Great for navigation cards or when the whole card should be interactive."
                image={{
                  src: "https://picsum.photos/seed/click/800/450",
                  alt: "Interactive card example",
                }}
                onClick={() => alert("Card clicked!")}
              />

              <FeatureCard
                icon={<FaLightbulb />}
                heading="Icon Only Card"
                description="Feature cards work great with just icons instead of images. Perfect for service or capability showcases."
                cta={{
                  label: "Explore",
                  href: "#",
                  variant: "accent",
                }}
              />

              <FeatureCard
                layout="horizontal"
                image={{
                  src: "https://picsum.photos/seed/mobile/800/800",
                  alt: "Mobile responsive design",
                }}
                heading="Responsive by Default"
                description="Horizontal cards stack vertically on mobile devices, ensuring great UX across all screen sizes."
                badge={{ text: "Responsive", variant: "accent" }}
              />

              <FeatureCard
                emphasis="bold"
                icon={<FaShield />}
                heading="No CTA Needed"
                headingLevel="h4"
                description="Cards work perfectly fine without a call-to-action button. Use them for informational content that doesn't require user interaction."
              />
            </ResponsiveGrid>
          </SectionCard>

          <ComponentHighlightProps>
            layout ("vertical" | "horizontal"), emphasis ("subtle" | "bold"),
            image ({"{ src: string, alt: string }"}), icon (ReactNode), heading
            (string), headingLevel ("h2" | "h3" | "h4"), description (string |
            ReactNode), cta (
            {
              "{ label: string, href?: string, onClick?: () => void, variant?: 'primary' | 'accent' | 'neutral' }"
            }
            ), badge ({"{ text: string, variant?: 'primary' | 'accent' }"}),
            onClick (() =&gt; void), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* InlineAlert Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>InlineAlert</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Container component for displaying contextual notifications and
          messages with visual emphasis via top accent border. Fills parent
          container width.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Inline Alert Variants">
            <div className="space-y-standard">
              {/* Primary Alert */}
              <InlineAlert variant="primary">
                <div className="shrink-0 py-1">
                  <FaCircleInfo className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">New Feature Available</p>
                  <p className="text-sm mt-1">
                    Check out our latest automation tools in the dashboard.
                  </p>
                </div>
              </InlineAlert>

              {/* Neutral Alert with Dismissal */}
              <InlineAlert variant="neutral">
                <div className="shrink-0 py-1">
                  <FaBell className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">System Maintenance Scheduled</p>
                  <p className="text-sm mt-1">
                    We'll be performing routine maintenance on Saturday from 2-4
                    AM EST.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  semantic="neutral"
                  onClick={() => console.log("Dismissed")}
                  aria-label="Dismiss"
                >
                  ×
                </Button>
              </InlineAlert>

              {/* Accent Alert with Action */}
              <InlineAlert variant="accent">
                <div className="shrink-0 py-1">
                  <FaFaceSmile className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Welcome to the JLS Stack Sandbox!</p>
                  <p className="text-sm mt-1">
                    Explore our design system and component library. Start with
                    the navigation above.
                  </p>
                </div>
                <Button semantic="accent" size="sm">
                  Get Started
                </Button>
              </InlineAlert>

              {/* Success Alert */}
              <InlineAlert variant="success">
                <div className="shrink-0 py-1">
                  <FaCircleCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Changes Saved Successfully</p>
                  <p className="text-sm mt-1">
                    Your preferences have been updated and are now active.
                  </p>
                </div>
              </InlineAlert>

              {/* Warning Alert with Link */}
              <InlineAlert variant="warning">
                <div className="shrink-0 py-1">
                  <FaTriangleExclamation className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">API Rate Limit Approaching</p>
                  <p className="text-sm mt-1">
                    You've used 85% of your monthly API quota.
                    <Button
                      variant="link"
                      semantic="warning"
                      size="sm"
                      className="ml-1 p-0 h-auto"
                    >
                      Upgrade your plan
                    </Button>
                  </p>
                </div>
              </InlineAlert>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            variant ("primary" | "neutral" | "accent" | "success" | "warning"),
            children (ReactNode), className (string)
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
            <div className="space-y-standard max-w-sm">
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
      {/* ResponsiveGrid Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ResponsiveGrid</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Opinionated layout primitive for consistent responsive grid behavior.
          Always starts at 1 column (mobile), expands to 2 columns at md
          breakpoint, then to 2, 3, or 4 columns at lg based on maxColumns
          variant.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase className="space-y-standard">
          {/* Default Grid - 4 columns */}
          <SectionCard title="Default Grid (1 → 2 → 4)">
            <ResponsiveGrid>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-primary/10 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </ResponsiveGrid>
          </SectionCard>

          {/* maxColumns Variants */}
          <SectionCard title="Max Columns Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Three Columns (1 → 2 → 3)
                </h3>
                <ResponsiveGrid maxColumns="three">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="bg-accent/10 p-4 rounded">
                      Item {i + 1}
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Two Columns (1 → 2)
                </h3>
                <ResponsiveGrid maxColumns="two">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-accent/10 p-4 rounded">
                      Item {i + 1}
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          {/* Gap Variants */}
          <SectionCard title="Gap Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Tight Gap
                </h3>
                <ResponsiveGrid gap="tight">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Compact Gap
                </h3>
                <ResponsiveGrid gap="compact">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Section Gap
                </h3>
                <ResponsiveGrid gap="section">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          {/* Alignment Variants */}
          <SectionCard title="Alignment Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Start
                </h3>
                <ResponsiveGrid align="start" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Center
                </h3>
                <ResponsiveGrid align="center" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Stretch
                </h3>
                <ResponsiveGrid align="stretch" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align End
                </h3>
                <ResponsiveGrid align="end" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          <ComponentHighlightProps>
            maxColumns ("two" | "three" | "four"), gap ("tight" | "compact" |
            "standard" | "section"), align ("start" | "center" | "stretch" |
            "end"), className (string)
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
          <SectionCard
            title="Card Title"
            description="Optional description of the card content"
          >
            <p>Card content goes here</p>
          </SectionCard>
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
            <ResponsiveGrid maxColumns="two">
              <SelectInput
                label="Select a Framework"
                options={["React", "Vue", "Angular", "Svelte"]}
              />
              <SelectInput
                label="Select a Priority"
                options={["Low", "Medium", "High", "Critical"]}
              />
            </ResponsiveGrid>
          </SectionCard>
          <ComponentHighlightProps>
            label (string), options (string[])
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />
      {/* SimpleFeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SimpleFeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A simple card that can look like a "emphasized feature — description"
          format on larger screens.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Feature Cards">
            <ResponsiveGrid maxColumns="two">
              <SimpleFeatureCard
                title="Responsive Design"
                description="Automatically adapts to different screen sizes"
              />
              <SimpleFeatureCard
                title="Light & Dark Themes"
                description="Built with semantic color tokens that adapt to both modes"
              />
              <SimpleFeatureCard
                title="Accessible"
                description="Follows WCAG guidelines for accessibility"
              />
              <SimpleFeatureCard
                title="Customizable"
                description="Accept className props for additional styling"
              />
            </ResponsiveGrid>
          </SectionCard>
          <ComponentHighlightProps>
            title (string), description (string)
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
            <ResponsiveGrid maxColumns="three">
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
            </ResponsiveGrid>
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
          <StatsRow />
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
            <div className="flex items-center gap-standard">
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
