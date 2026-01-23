import { SimpleHeader } from "@/components/ui/simpleHeader";
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
    <div className="section-spacing container px-standard pb-section">
      <SimpleHeader
        pageTitle="Quality Check & Changelog"
        pageDescription="Polish validation, accessibility self-audit, and design system updates."
        hr
      />

      {/* ===============================
          CHANGELOG
          =============================== */}
      <section className="space-y-standard">
        <h2>To Do</h2>
        <div className="space-y-compact">
          {/* Add new entries here */}

          <div className="bg-surface-1 border-l-4 border-primary p-standard rounded">
            <ul className="space-y-1 body-2 list-disc ml-standard">
              {toDoItems.map((toDoItem, index) => (
                <li key={index}>{toDoItem}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Changelog</h2>

        <div className="space-y-compact">
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
