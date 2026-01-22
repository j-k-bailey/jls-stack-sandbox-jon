import { SimpleHeader } from "@/components/ui/simpleHeader";

export function BrandKitPage() {
  return (
    <div className="section-spacing container mx-auto px-standard pb-section">
      <SimpleHeader
        pageTitle="JLS Stack Sandbox Design System"
        pageDescription="Electric cyan and hot fuchsia create a cohesive color story with progressive surface elevation and comprehensive token sets."
        hr
      />

      {/* ===============================
          1. SURFACE ELEVATION SYSTEM
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h2 className="text-h2">Surface Elevation</h2>
          <p className="text-body-1 text-muted-foreground max-w-3xl">
            Four distinct surface levels create clear hierarchy. Each level sits
            progressively higher, with increasing cyan tint in dark mode.
          </p>
        </div>

        {/* Grid Reference */}
        <div className="grid grid-cols-5 gap-compact">
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-background" />
            <p className="text-caption text-muted-foreground">Level 0</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-1" />
            <p className="text-caption text-muted-foreground">Level 1</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-2" />
            <p className="text-caption text-muted-foreground">Level 2</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-3" />
            <p className="text-caption text-muted-foreground">Level 3</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-4" />
            <p className="text-caption text-muted-foreground">Level 4</p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          2. BRAND COLORS
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h2 className="text-h2">Brand Identity</h2>
          <p className="text-body-1 text-muted-foreground">
            Electric cyan and hot fuchsia anchor all interactive moments.
          </p>
        </div>

        {/* Large Color Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-standard">
          {/* Primary Cyan */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary-hover text-primary-foreground p-section rounded-lg border-2 border-border-primary shadow-lg">
            <div className="space-y-compact">
              <div className="inline-block bg-primary-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-overline text-[10px]">PRIMARY</p>
              </div>
              <h3 className="text-h2 font-black">Electric Cyan</h3>
              <p className="text-body-2 opacity-90 max-w-sm">
                Main CTAs • Key interactions • Active states • Primary links
              </p>
              <div className="flex gap-2 pt-compact">
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">HUE</p>
                  <code className="text-[10px] font-mono">195°</code>
                </div>
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">CHROMA</p>
                  <code className="text-[10px] font-mono">0.18</code>
                </div>
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">LIGHT</p>
                  <code className="text-[10px] font-mono">45%</code>
                </div>
              </div>
            </div>
          </div>

          {/* Accent Fuchsia */}
          <div className="bg-gradient-to-br from-accent via-accent to-accent-hover text-accent-foreground p-section rounded-lg border-2 border-border-accent shadow-lg">
            <div className="space-y-compact">
              <div className="inline-block bg-accent-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-overline text-[10px]">ACCENT</p>
              </div>
              <h3 className="text-h2 font-black">Vaporwave Fuchsia</h3>
              <p className="text-body-2 opacity-90 max-w-sm">
                Badges • Highlights • Secondary CTAs • Alternative emphasis
              </p>
              <div className="flex gap-2 pt-compact">
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">HUE</p>
                  <code className="text-[10px] font-mono">325°</code>
                </div>
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">CHROMA</p>
                  <code className="text-[10px] font-mono">0.22</code>
                </div>
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded p-2">
                  <p className="text-[9px] opacity-70 mb-1">LIGHT</p>
                  <code className="text-[10px] font-mono">50%</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Variants */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-compact">
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-primary bg-primary" />
            <p className="text-caption text-center text-muted-foreground">
              Primary
            </p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-primary bg-primary-hover" />
            <p className="text-caption text-center text-muted-foreground">
              Hover
            </p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-accent bg-accent" />
            <p className="text-caption text-center text-muted-foreground">
              Accent
            </p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-accent bg-accent-hover" />
            <p className="text-caption text-center text-muted-foreground">
              Hover
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          3. SEMANTIC PALETTE
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h2 className="text-h2">Semantic Palette</h2>
          <p className="text-body-1 text-muted-foreground">
            Complete token sets for every semantic need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-compact">
          {/* Success */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-success transition-all">
            <div className="h-24 bg-success border-b-4 border-border-success flex items-center justify-center">
              <span className="text-success-foreground text-h4 font-black">
                ✓
              </span>
            </div>
            <div className="p-compact">
              <p className="text-button text-[10px] mb-1">SUCCESS</p>
              <p className="text-caption text-muted-foreground">Matrix green</p>
            </div>
          </div>

          {/* Warning */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-warning transition-all">
            <div className="h-24 bg-warning border-b-4 border-border-warning flex items-center justify-center">
              <span className="text-warning-foreground text-h4 font-black">
                !
              </span>
            </div>
            <div className="p-compact">
              <p className="text-button text-[10px] mb-1">WARNING</p>
              <p className="text-caption text-muted-foreground">Hot coral</p>
            </div>
          </div>

          {/* Neutral */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-neutral transition-all">
            <div className="h-24 bg-neutral border-b-4 border-border-neutral flex items-center justify-center">
              <span className="text-neutral-foreground text-h4 font-black">
                ○
              </span>
            </div>
            <div className="p-compact">
              <p className="text-button text-[10px] mb-1">NEUTRAL</p>
              <p className="text-caption text-muted-foreground">Cool steel</p>
            </div>
          </div>

          {/* Muted */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-muted transition-all">
            <div className="h-24 bg-muted border-b-4 border-border-muted flex items-center justify-center">
              <span className="text-muted-foreground text-h4 font-black">
                ◑
              </span>
            </div>
            <div className="p-compact">
              <p className="text-button text-[10px] mb-1">MUTED</p>
              <p className="text-caption text-muted-foreground">Blue-gray</p>
            </div>
          </div>

          {/* Disabled */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden">
            <div className="h-24 bg-disabled border-b-4 border-border-disabled flex items-center justify-center">
              <span className="text-disabled-foreground text-h4 font-black">
                ◌
              </span>
            </div>
            <div className="p-compact">
              <p className="text-button text-[10px] mb-1">DISABLED</p>
              <p className="text-caption text-muted-foreground">Ghosted</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          4. INTERACTIVE COMPONENTS
          =============================== */}
      <section className="space-y-standard">
        <h2 className="text-h2">Component Showcase</h2>

        <div className="bg-surface-1 p-section rounded-lg border border-border space-y-section">
          {/* Buttons */}
          <div className="space-y-compact">
            <p className="text-overline text-primary">BUTTONS</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-compact">
              <button className="bg-primary text-primary-foreground hover:bg-primary-hover border-2 border-border-primary px-4 py-3 rounded-lg transition-all text-button hover:scale-105 hover:shadow-lg">
                Primary
              </button>
              <button className="bg-accent text-accent-foreground hover:bg-accent-hover border-2 border-border-accent px-4 py-3 rounded-lg transition-all text-button hover:scale-105 hover:shadow-lg">
                Accent
              </button>
              <button className="bg-success text-success-foreground hover:bg-success-hover border-2 border-border-success px-4 py-3 rounded-lg transition-all text-button hover:scale-105 hover:shadow-lg">
                Success
              </button>
              <button className="bg-warning text-warning-foreground hover:bg-warning-hover border-2 border-border-warning px-4 py-3 rounded-lg transition-all text-button hover:scale-105 hover:shadow-lg">
                Warning
              </button>
              <button className="bg-neutral text-neutral-foreground hover:bg-neutral-hover border-2 border-border-neutral px-4 py-3 rounded-lg transition-all text-button hover:scale-105">
                Neutral
              </button>
              <button
                className="bg-disabled-background text-disabled-foreground border-2 border-border-disabled px-4 py-3 rounded-lg cursor-not-allowed text-button opacity-60"
                disabled
              >
                Disabled
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-compact">
            <p className="text-overline text-primary">BADGES</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary text-primary-foreground border-2 border-border-primary px-3 py-1.5 rounded-full text-caption font-semibold shadow-sm">
                Primary
              </span>
              <span className="bg-accent text-accent-foreground border-2 border-border-accent px-3 py-1.5 rounded-full text-caption font-semibold shadow-sm">
                Accent
              </span>
              <span className="bg-success text-success-foreground border-2 border-border-success px-3 py-1.5 rounded-full text-caption font-semibold shadow-sm">
                Success
              </span>
              <span className="bg-warning text-warning-foreground border-2 border-border-warning px-3 py-1.5 rounded-full text-caption font-semibold shadow-sm">
                Warning
              </span>
              <span className="bg-neutral text-neutral-foreground border-2 border-border-neutral px-3 py-1.5 rounded-full text-caption font-semibold shadow-sm">
                Neutral
              </span>
              <span className="bg-muted text-muted-foreground border-2 border-border-muted px-3 py-1.5 rounded-full text-caption font-semibold">
                Muted
              </span>
            </div>
          </div>

          {/* Subtle Badge Variants */}
          <div className="space-y-compact">
            <p className="text-overline text-primary">SUBTLE VARIANTS</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary-background text-primary border border-border-primary px-3 py-1.5 rounded-full text-caption font-medium">
                Primary
              </span>
              <span className="bg-accent-background text-accent border border-border-accent px-3 py-1.5 rounded-full text-caption font-medium">
                Accent
              </span>
              <span className="bg-success-background text-success border border-border-success px-3 py-1.5 rounded-full text-caption font-medium">
                Success
              </span>
              <span className="bg-warning-background text-warning border border-border-warning px-3 py-1.5 rounded-full text-caption font-medium">
                Warning
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          5. TYPOGRAPHY SCALE
          =============================== */}
      <section className="space-y-standard">
        <h2 className="text-h2">Typography System</h2>

        <div className="bg-surface-1 p-section rounded-lg border border-border space-y-section">
          {/* Overline */}
          <div className="space-y-tight">
            <span className="text-overline text-primary border-b-2 border-primary pb-1 inline-block">
              OVERLINE TEXT — LABELS & CATEGORIES
            </span>
            <p className="text-caption text-muted-foreground">
              12px • Semibold • 0.15em letter spacing • Uppercase
            </p>
          </div>

          {/* All Headings */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <h1 className="text-h1">
                Heading 1 — Hero sections and main page titles
              </h1>
              <p className="text-caption text-muted-foreground">
                48px • Bold • -0.02em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <h2 className="text-h2">
                Heading 2 — Major page sections and divisions
              </h2>
              <p className="text-caption text-muted-foreground">
                36px • Semibold • -0.015em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <h3 className="text-h3">
                Heading 3 — Subsections and card group headers
              </h3>
              <p className="text-caption text-muted-foreground">
                30px • Semibold • -0.01em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <h4 className="text-h4">
                Heading 4 — Component titles and sidebar headers
              </h4>
              <p className="text-caption text-muted-foreground">
                24px • Semibold • Normal letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <h5 className="text-h5">
                Heading 5 — Small component headers and labels
              </h5>
              <p className="text-caption text-muted-foreground">
                20px • Semibold • Normal letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <h6 className="text-h6">
                Heading 6 — Compact headers and nested component titles
              </h6>
              <p className="text-caption text-muted-foreground">
                18px • Semibold • Normal letter spacing
              </p>
            </div>
          </div>

          {/* Subtitles */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <p className="text-subtitle-1">
                Subtitle 1 — Prominent secondary text for page subtitles and
                emphasized content
              </p>
              <p className="text-caption text-muted-foreground">
                16px • Medium • 0.01em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <p className="text-subtitle-2">
                Subtitle 2 — Standard secondary text for component subtitles and
                helper text
              </p>
              <p className="text-caption text-muted-foreground">
                14px • Medium • 0.01em letter spacing
              </p>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <p className="text-body-1">
                Body 1 — Primary content text optimized for long-form reading.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-caption text-muted-foreground">
                16px • Regular • 1.6 line height
              </p>
            </div>

            <div className="space-y-tight">
              <p className="text-body-2 text-muted-foreground">
                Body 2 — Dense content and descriptions. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-caption text-muted-foreground">
                14px • Regular • 1.5 line height
              </p>
            </div>
          </div>

          {/* UI Elements */}
          <div className="space-y-tight">
            <div className="flex items-center gap-compact flex-wrap">
              <span className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-button">
                Button Text
              </span>
              <span className="text-caption text-muted-foreground">
                Caption text for metadata and footnotes
              </span>
            </div>
            <p className="text-caption text-muted-foreground">
              Button: 14px • Semibold • 0.04em | Caption: 12px • Regular •
              0.02em
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          6. SPACING SCALE
          =============================== */}
      <section className="space-y-standard">
        <h2 className="text-h2">Spacing</h2>

        <div className="bg-surface-1 p-section rounded-lg border border-border space-y-section">
          <div className="space-y-standard">
            {[
              { name: "tight", size: "6px", desc: "Micro-interactions" },
              { name: "compact", size: "12px", desc: "Dense displays" },
              { name: "standard", size: "24px", desc: "Default padding" },
              { name: "section", size: "32px", desc: "Large sections" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-standard">
                <div className="flex-1">
                  <p className="text-button">{s.name}</p>
                  <p className="text-caption text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex items-center gap-compact">
                  <code className="text-caption font-mono text-primary">
                    {s.size}
                  </code>
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-8 rounded"
                    style={{ width: s.size }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
