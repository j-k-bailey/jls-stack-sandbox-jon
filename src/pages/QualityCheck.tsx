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
  "Make navigation component with nav items",
];

const updates = [
  {
    version: "v0.0.2",
    date: "January 23, 2026",
    title: "App Wrapper and Maintenance",
    items: [
      "Created update card component",
      "Misunderstood how spacing utilities needed to be implemented, so removed unneeded utilities that prevented viewport-responsive spacing",
      "Updated to keep shell static (including overlay addition and setting z-index properly)",
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
        <h2 className="text-h2">To Do</h2>
        <div className="space-y-compact">
          {/* Add new entries here */}

          <div className="bg-surface-1 border-l-4 border-primary p-standard rounded">
            <ul className="space-y-1 text-body-2 list-disc ml-standard">
              {toDoItems.map((toDoItem, index) => (
                <li key={index}>{toDoItem}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-h2">Changelog</h2>

        <div className="space-y-compact">
          {/* <div className="bg-surface-1 border-l-4 border-primary p-standard rounded">
            <div className="flex items-center gap-2 mb-tight">
              <span className="text-overline text-primary">v0.0.1</span>
              <span className="text-caption text-muted-foreground">
                January 22, 2026
              </span>
            </div>
            <h3 className="text-h6 mb-tight">Initial Design System</h3>
            <ul className="space-y-1 text-body-2 list-disc ml-standard">
              <li>OKLCH color system with cyan/fuchsia brand colors</li>
              <li>4-level surface elevation system</li>
              <li>Complete semantic palette (7 semantics × 5 tokens each)</li>
              <li>Typography scale and spacing system</li>
              <li>Shadcn/UI compatibility tokens</li>
              <li>
                Updated most components to use new tokens for ease of editing in
                the future
              </li>
            </ul>
          </div> */}
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
