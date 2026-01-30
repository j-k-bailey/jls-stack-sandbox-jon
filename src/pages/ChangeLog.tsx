import {
  ChecklistCard,
  ChecklistCardContent,
  ChecklistCardDescription,
  ChecklistCardHeader,
  ChecklistCardItem,
  ChecklistCardTitle,
} from "@/components/common/ChecklistCard";
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
  "The Field and component pattern could probably be separated into visual-only components that take props; wrapped/bridge components that set the visuals up as Fields; and then used to create a 'quick form' library for an app that needs devs to easily make unique zod + RHF forms.",
];

const updates = [
  {
    version: "v0.0.7",
    date: "January 29, 2026",
    title: "Lesson 2.7 - WCAG",
    items: [
      "Added `hit-target` utility which guarantees width and height of all click/touch targets is at least 24px",
      "Converted spacing and border radius tokens to semantic naming system for better DX",
      "Updated hover states to give better visual feedback (up to +15% contrast)",
      "Defined z-index layers/levels for consistency as more components get made",
    ],
  },
  {
    version: "v0.0.6",
    date: "January 28, 2026",
    title: "Lesson 2.7 - WCAG",
    items: [
      "Updated FieldError to always include icon prior to error for visual accessibility",
      "Updated type system and shifted from hardcoding to using relative values",
      "Tweaked colors for more contrast.",
      "Refined some spacing issues.",
    ],
  },
  {
    version: "v0.0.5",
    date: "January 27, 2026",
    title: "Lesson 2.6 - Forms",
    items: [
      "Imported Dialog, Form, Popover from shadcn",
      "Updated ButtonVariants, Command, Dialog, Form, Input, Label, and Popover from shadcn to better align with brand kit",
      "Decided to refactor to leave shadcn architecture AS predictable as possible so no issues with types, variants, etc. not being available to other components that depend on them.",
      "Added form and updated dashboard for kanban-like dash mockup",
      "Added fakerAPI to lib for simple fail/success testing with async/await state",
    ],
  },
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

export function ChangeLogPage() {
  return (
    <div className="space-y-section container p-inset-2xl">
      <PageHeader
        pageTitle="Change Log and Thoughts"
        pageDescription="Polish validation, accessibility self-audit, and design system updates."
        hr
      />

      {/* ===============================
          CHANGELOG
          =============================== */}
      <section className="space-y-stack">
        {/* To-Do List Style */}
        <ChecklistCard className="border-l-4 border-border-primary">
          <ChecklistCardHeader>
            <ChecklistCardTitle>To Do/Thoughts for Later</ChecklistCardTitle>
            <ChecklistCardDescription>
              Items to address in future iterations, or things that I thought of
              which feel out of scope for now
            </ChecklistCardDescription>
          </ChecklistCardHeader>

          <ChecklistCardContent>
            {toDoItems.map((toDoItem, index) => (
              <ChecklistCardItem key={index}>{toDoItem}</ChecklistCardItem>
            ))}
          </ChecklistCardContent>
        </ChecklistCard>

        <h2 className="mt-section mb-stack">Changelog</h2>

        <div className="space-y-stack">
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
