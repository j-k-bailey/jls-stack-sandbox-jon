import { SimpleHeader } from "@/components/ui/simpleHeader";

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
        <h2 className="text-h2">Changelog</h2>

        <div className="space-y-compact">
          {/* Add new entries here */}

          <div className="bg-surface-1 border-l-4 border-primary p-standard rounded">
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
          </div>
        </div>
      </section>
    </div>
  );
}
