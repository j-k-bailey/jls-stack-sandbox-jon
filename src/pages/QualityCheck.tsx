import { PageHeader } from "@/components/common/PageHeader";
import {
  UpdateCard,
  UpdateCardContent,
  UpdateCardDate,
  UpdateCardHeader,
  UpdateCardItem,
  UpdateCardTitle,
  UpdateCardVersion,
} from "@/components/common/UpdateCard";

const toDoItems = [
  "Change pages to not need styling for proper spacing/padding (outlet at app layout should provide)",
  "z-index usage should probably be in brand-kit to define levels and their usage",
];

const updates = [
  {
    version: "v0.0.4",
    date: "January 26, 2026",
    title: "Lesson 2.5 - Reusable Components & Patterns - Part 2",
    items: [
      "Experimented with different ways to work with really complicated variants with different styling based on props. E.g., primary filled vs. outline button. Settled on wrapper pattern as best blend of DX for restyling and using in other components without friction.",
      "Old FeatureCard became SimpleFeatureCard",
      "shadcn using lowercase for file names low-key drove me crazy. So changed it for files which have been customized already.",
      "Added ResponsiveGrid, InlineAlert, and FeatureCard (the new one).",
      "Added *-on-background to semantic tokens/brand kit for more versatility in color tokens",
      "Updated pages to use new components: Dashboard, LayoutSandbox, Components, Aesthetic, Brand Kit",
      "Fixed broken feature cards.",
    ],
  },
  {
    version: "v0.0.3",
    date: "January 23, 2026",
    title: "Lesson 2.5 - Reusable Components & Patterns",
    items: [
      "Prototyped grid-based dashboard for dashboard page",
      "Moved form- and layout-Sandbox directories to exist in @/components/ rather than @/components/ui",
      "Moved NavigationItem, Sidebar, and Topbar from @/components/layouts to @/components/ui",
      "Refactored SimpleHeader into PageHeader",
      "Made SectionCard and StatsRow components",
    ],
  },
  {
    version: "v0.0.2",
    date: "January 23, 2026",
    title: "App Wrapper and Maintenance",
    items: [
      "Created update card component",
      "Misunderstood how utilities needed to be implemented, so removed unneeded spacing utilities that prevented viewport-responsive spacing",
      "Updated text utilities to better approach that wouldn't cause conflict with Tailwind CSS text utilities",
      "Updated to keep shell static (including overlay addition and setting z-index properly)",
      "Updated nav to have nav groups: Main, development, and System",
      "Added whitespace to let the nav breathe better",
      "Added nav item components so it's easier to restyle without manually editing hardcoding",
      "Tweaked bg and surfaces and updated brand kit",
    ],
  },
  {
    version: "v0.0.1",
    date: "January 22, 2026",
    title: "Initial Design System",
    items: [
      "OKLCH color system with cyan/fuchsia brand colors",
      "4-level surface elevation system",
      "Complete semantic palette (7 semantics × 5 tokens each)",
      "Typography scale and spacing system",
      "Shadcn/UI compatibility tokens",
      "Updated most components to use new tokens for ease of editing in the future",
    ],
  },
];

export function QualityCheckPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="Quality Check & Changelog"
        pageDescription="Polish validation, accessibility self-audit, and design system updates."
        hr
      />

      {/* ===============================
          CHANGELOG
          =============================== */}
      <section className="space-y-standard">
        <h2 className="mb-compact">To Do</h2>
        <div className="space-y-compact">
          <div className="bg-surface-1 border-l-4 border-primary p-standard rounded">
            <ul className="space-y-1 body-2 list-disc ml-standard">
              {toDoItems.map((toDoItem, index) => (
                <li key={index}>{toDoItem}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mb-compact">Changelog</h2>

        <div className="space-y-section">
          {updates.map((update, index) => (
            <UpdateCard key={index}>
              <UpdateCardHeader>
                <UpdateCardVersion>{update.version}</UpdateCardVersion>
                <UpdateCardDate>{update.date}</UpdateCardDate>
              </UpdateCardHeader>

              <UpdateCardTitle>{update.title}</UpdateCardTitle>

              <UpdateCardContent>
                {update.items.map((item, itemIndex) => (
                  <UpdateCardItem key={itemIndex}>{item}</UpdateCardItem>
                ))}
              </UpdateCardContent>
            </UpdateCard>
          ))}
        </div>
      </section>
    </div>
  );
}
