import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FaPalette, FaShapes, FaFont, FaRulerCombined } from "react-icons/fa6";

export function BrandKitPage() {
  return (
    <div className="space-y-section">
      <PageHeader
        pageTitle="JLS Stack Sandbox Design System"
        level="h2"
        pageDescription="Electric cyan and hot fuchsia create a cohesive color story with progressive surface elevation and comprehensive token sets."
        hr
      />

      <section>
        <h3 className="mb-stack">Design System Overview</h3>
        <ResponsiveGrid maxColumns="two">
          <FeatureCard
            icon={<FaShapes />}
            heading="Surface Elevation"
            description="Four distinct levels create clear hierarchy with progressive cyan tinting"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaPalette />}
            heading="Brand Colors"
            description="Electric cyan and hot fuchsia anchor all interactive moments"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaFont />}
            heading="Typography"
            description="Comprehensive scale from headlines to captions with optimal readability"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaRulerCombined />}
            heading="Spacing System"
            description="Content-based tokens for consistent rhythm across all components"
            emphasis="subtle"
          />
        </ResponsiveGrid>
      </section>

      <hr className="border-border" />

      {/* SURFACE ELEVATION SYSTEM */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Surface Elevation</h3>
          <p className="body-1 text-muted-foreground">
            Four distinct surface levels create clear hierarchy. Each level sits
            progressively higher, with increasing cyan tint in dark mode.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-stack">
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-background" />
            <p className="caption">Level 0</p>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-1" />
            <p className="caption">Level 1</p>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-2" />
            <p className="caption">Level 2</p>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-3" />
            <p className="caption">Level 3</p>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-4" />
            <p className="caption">Level 4</p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* BRAND COLORS */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Brand Identity</h3>
          <p className="body-1 text-muted-foreground">
            Electric cyan and hot fuchsia anchor all interactive moments.
          </p>
        </div>

        <ResponsiveGrid maxColumns="two">
          {/* Primary Cyan */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary-hover text-primary-foreground p-inset-lg rounded-large border-2 border-border-primary shadow-glow-primary">
            <div className="space-y-stack">
              <div className="inline-block bg-primary-foreground/10 backdrop-blur-sm px-inset py-inline rounded-full">
                <p className="overline-text text-primary-foreground text-[10px]">
                  PRIMARY
                </p>
              </div>
              <h4 className="headline-4">Electric Cyan</h4>
              <p className="body-2 opacity-90">
                Main CTAs • Key interactions • Active states • Primary links
              </p>
              <div className="flex gap-inline pt-stack">
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-primary-foreground">
                    HUE
                  </p>
                  <code className="caption monospace text-primary-foreground">
                    195°
                  </code>
                </div>
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-primary-foreground">
                    CHROMA
                  </p>
                  <code className="caption monospace text-primary-foreground">
                    0.19
                  </code>
                </div>
                <div className="flex-1 bg-primary-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-primary-foreground">
                    LIGHT
                  </p>
                  <code className="caption monospace text-primary-foreground">
                    42%
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Accent Fuchsia */}
          <div className="bg-gradient-to-br from-accent via-accent to-accent-hover text-accent-foreground p-inset-lg rounded-large border-2 border-border-accent shadow-glow-accent">
            <div className="space-y-stack">
              <div className="inline-block bg-accent-foreground/10 backdrop-blur-sm px-inset py-inline rounded-full">
                <p className="overline-text text-[10px] text-accent-foreground">
                  ACCENT
                </p>
              </div>
              <h4 className="headline-4">Vaporwave Fuchsia</h4>
              <p className="body-2 opacity-90">
                Badges • Highlights • Secondary CTAs • Alternative emphasis
              </p>
              <div className="flex gap-inline pt-stack">
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-accent-foreground">
                    HUE
                  </p>
                  <code className="caption monospace text-accent-foreground">
                    325°
                  </code>
                </div>
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-accent-foreground">
                    CHROMA
                  </p>
                  <code className="caption monospace text-accent-foreground">
                    0.23
                  </code>
                </div>
                <div className="flex-1 bg-accent-foreground/10 backdrop-blur-sm rounded-nested p-inset-sm">
                  <p className="caption opacity-70 mb-inline text-accent-foreground">
                    LIGHT
                  </p>
                  <code className="caption monospace text-accent-foreground">
                    48%
                  </code>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid>
          <div className="space-y-inline">
            <div className="h-20 rounded-container border-2 border-border-primary bg-primary shadow-low" />
            <p className="caption text-center">Primary</p>
          </div>
          <div className="space-y-inline">
            <div className="h-20 rounded-container border-2 border-border-primary bg-primary-hover shadow-low" />
            <p className="caption text-center">Primary Hover</p>
          </div>
          <div className="space-y-inline">
            <div className="h-20 rounded-container border-2 border-border-accent bg-accent shadow-low" />
            <p className="caption text-center">Accent</p>
          </div>
          <div className="space-y-inline">
            <div className="h-20 rounded-container border-2 border-border-accent bg-accent-hover shadow-low" />
            <p className="caption text-center">Accent Hover</p>
          </div>
        </ResponsiveGrid>
      </section>

      <hr className="border-border" />

      {/* SEMANTIC PALETTE */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Semantic Palette</h3>
          <p className="body-1 text-muted-foreground">
            Complete token sets for every semantic need.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-stack">
          {/* Success */}
          <div className="group bg-surface-1 border border-border rounded-container overflow-hidden hover:border-border-success transition-all shadow-low">
            <div className="h-24 bg-success border-b-2 border-border-success flex items-center justify-center">
              <span className="text-success-foreground headline-4">✓</span>
            </div>
            <div className="p-inset">
              <p className="button-text text-[10px] mb-inline">SUCCESS</p>
              <p className="caption">Matrix green</p>
            </div>
          </div>

          {/* Warning */}
          <div className="group bg-surface-1 border border-border rounded-container overflow-hidden hover:border-border-warning transition-all shadow-low">
            <div className="h-24 bg-warning border-b-2 border-border-warning flex items-center justify-center">
              <span className="text-warning-foreground headline-4">!</span>
            </div>
            <div className="p-inset">
              <p className="button-text text-[10px] mb-inline">WARNING</p>
              <p className="caption">Hot coral</p>
            </div>
          </div>

          {/* Neutral */}
          <div className="group bg-surface-1 border border-border rounded-container overflow-hidden hover:border-border-neutral transition-all shadow-low">
            <div className="h-24 bg-neutral border-b-2 border-border-neutral flex items-center justify-center">
              <span className="text-neutral-foreground headline-4">○</span>
            </div>
            <div className="p-inset">
              <p className="button-text text-[10px] mb-inline">NEUTRAL</p>
              <p className="caption">Cool steel</p>
            </div>
          </div>

          {/* Muted */}
          <div className="group bg-surface-1 border border-border rounded-container overflow-hidden hover:border-border-muted transition-all shadow-low">
            <div className="h-24 bg-muted border-b-2 border-border-muted flex items-center justify-center">
              <span className="text-muted-foreground headline-4">◑</span>
            </div>
            <div className="p-inset">
              <p className="button-text text-[10px] mb-inline">MUTED</p>
              <p className="caption">Blue-gray</p>
            </div>
          </div>

          {/* Disabled */}
          <div className="group bg-surface-1 border border-border rounded-container overflow-hidden shadow-low">
            <div className="h-24 bg-disabled border-b-2 border-border-disabled flex items-center justify-center">
              <span className="text-disabled-foreground headline-4">◌</span>
            </div>
            <div className="p-inset">
              <p className="button-text text-[10px] mb-inline">DISABLED</p>
              <p className="caption">Ghosted</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* INTERACTIVE COMPONENTS */}
      <section className="space-y-stack">
        <h3>Component Showcase</h3>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border space-y-section shadow-low">
          {/* Buttons */}
          <div className="space-y-stack">
            <p className="overline-text text-primary">BUTTONS</p>
            <ResponsiveGrid maxColumns="three">
              <Button semantic="primary">Primary</Button>
              <Button semantic="accent">Accent</Button>
              <Button semantic="success">Success</Button>
              <Button semantic="warning">Warning</Button>
              <Button semantic="neutral">Neutral</Button>
              <Button semantic="primary" disabled>
                Disabled
              </Button>
              <Button variant="outline" semantic="primary">
                Outline
              </Button>
              <Button variant="ghost" semantic="accent">
                Ghost
              </Button>
              <Button variant="link" semantic="success">
                Link
              </Button>
            </ResponsiveGrid>
          </div>

          {/* Badges */}
          <div className="space-y-stack">
            <p className="overline-text text-primary">BADGES</p>
            <div className="flex flex-wrap gap-inline">
              <span className="bg-primary text-primary-foreground border-2 border-border-primary px-inset py-inline rounded-full caption font-semibold shadow-low">
                Primary
              </span>
              <span className="bg-accent text-accent-foreground border-2 border-border-accent px-inset py-inline rounded-full caption font-semibold shadow-low">
                Accent
              </span>
              <span className="bg-success text-success-foreground border-2 border-border-success px-inset py-inline rounded-full caption font-semibold shadow-low">
                Success
              </span>
              <span className="bg-warning text-warning-foreground border-2 border-border-warning px-inset py-inline rounded-full caption font-semibold shadow-low">
                Warning
              </span>
              <span className="bg-neutral text-neutral-foreground border-2 border-border-neutral px-inset py-inline rounded-full caption font-semibold shadow-low">
                Neutral
              </span>
              <span className="bg-muted text-muted-foreground border-2 border-border-muted px-inset py-inline rounded-full caption font-semibold">
                Muted
              </span>
            </div>
          </div>

          {/* Subtle Badge Variants */}
          <div className="space-y-stack">
            <p className="overline-text text-primary">SUBTLE VARIANTS</p>
            <div className="flex flex-wrap gap-inline">
              <span className="bg-primary-background text-primary-on-background border border-border-primary px-inset py-inline rounded-full caption font-medium">
                Primary
              </span>
              <span className="bg-accent-background text-accent-on-background border border-border-accent px-inset py-inline rounded-full caption font-medium">
                Accent
              </span>
              <span className="bg-success-background text-success-on-background border border-border-success px-inset py-inline rounded-full caption font-medium">
                Success
              </span>
              <span className="bg-warning-background text-warning-on-background border border-border-warning px-inset py-inline rounded-full caption font-medium">
                Warning
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* TYPOGRAPHY SCALE */}
      <section className="space-y-stack">
        <h3>Typography System</h3>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border space-y-section shadow-low">
          {/* Overline */}
          <div className="space-y-inline">
            <span className="overline-text text-primary">
              OVERLINE TEXT — LABELS & CATEGORIES
            </span>
            <p className="caption">
              12px • Semibold • 0.15em letter spacing • Uppercase
            </p>
          </div>

          {/* All Headings */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <span className="headline-1">
                Heading 1 — Hero sections and main page titles
              </span>
              <p className="caption">48px • Light • -0.02em letter spacing</p>
            </div>

            <div className="space-y-inline">
              <span className="headline-2">
                Heading 2 — Major page sections and divisions
              </span>
              <p className="caption">36px • Light • -0.015em letter spacing</p>
            </div>

            <div className="space-y-inline">
              <span className="headline-3">
                Heading 3 — Subsections and card group headers
              </span>
              <p className="caption">28px • Regular • -0.01em letter spacing</p>
            </div>

            <div className="space-y-inline">
              <span className="headline-4">
                Heading 4 — Component titles and sidebar headers
              </span>
              <p className="caption">
                22px • Regular • -0.005em letter spacing
              </p>
            </div>

            <div className="space-y-inline">
              <span className="headline-5">
                Heading 5 — Small component headers and labels
              </span>
              <p className="caption">18px • Medium • Normal letter spacing</p>
            </div>

            <div className="space-y-inline">
              <span className="headline-6">
                Heading 6 — Compact headers and nested component titles
              </span>
              <p className="caption">16px • Medium • 0.005em letter spacing</p>
            </div>
          </div>

          {/* Subtitles */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <p className="subtitle-1">
                Subtitle 1 — Prominent secondary text for page subtitles and
                emphasized content
              </p>
              <p className="caption">16px • Medium • 0.01em letter spacing</p>
            </div>

            <div className="space-y-inline">
              <p className="subtitle-2">
                Subtitle 2 — Standard secondary text for component subtitles and
                helper text
              </p>
              <p className="caption">14px • Medium • 0.015em letter spacing</p>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <p className="body-1">
                Body 1 — Primary content text optimized for long-form reading.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="caption">16px • Regular • 1.6 line height</p>
            </div>

            <div className="space-y-inline">
              <p className="body-2 text-muted-foreground">
                Body 2 — Dense content and descriptions. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="caption">14px • Regular • 1.5 line height</p>
            </div>
          </div>

          {/* UI Elements */}
          <div className="space-y-inline">
            <div className="flex items-center gap-stack flex-wrap">
              <Button semantic="primary">Button Text</Button>
              <span className="caption">
                Caption text for metadata and footnotes
              </span>
            </div>
            <p className="caption">
              Button: 14px • Semibold • 0.05em | Caption: 12px • Regular •
              0.02em
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* SPACING SCALE */}
      <section className="space-y-stack">
        <h3>Spacing System</h3>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border space-y-section shadow-low">
          {/* Flow Spacing */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <h4 className="headline-5">Flow Spacing</h4>
              <p className="body-2 text-muted-foreground">
                Gaps between elements — use with{" "}
                <code className="caption monospace text-primary">gap-*</code> or{" "}
                <code className="caption monospace text-primary">
                  space-y-*
                </code>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-section">
              {[
                {
                  name: "inline",
                  token: "gap-inline",
                  size: "4px → 6px",
                  desc: "Related items",
                  example: "Buttons in group, icon+text",
                },
                {
                  name: "stack",
                  token: "gap-stack",
                  size: "8px → 12px",
                  desc: "Vertical flow",
                  example: "Label→input, paragraphs",
                },
                {
                  name: "section",
                  token: "gap-section",
                  size: "24px → 40px",
                  desc: "Content blocks",
                  example: "Between cards, major sections",
                },
                {
                  name: "layout",
                  token: "gap-layout",
                  size: "32px → 48px",
                  desc: "Page structure",
                  example: "Header, main, footer",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="bg-surface-2 p-inset rounded-nested border border-border"
                >
                  <div className="flex items-start justify-between mb-stack">
                    <div className="flex-1">
                      <p className="button-text text-primary mb-inline">
                        {s.name}
                      </p>
                      <p className="subtitle-2">{s.desc}</p>
                      <p className="caption text-muted-foreground">
                        {s.example}
                      </p>
                    </div>
                    <code className="caption monospace text-accent tabular-nums whitespace-nowrap bg-accent-background px-inset-sm py-inline rounded-interactive">
                      {s.size}
                    </code>
                  </div>

                  {/* Visual demonstration */}
                  <div className="mt-stack">
                    <p className="caption text-muted-foreground mb-inline">
                      Visual example:
                    </p>
                    <div
                      className={`flex flex-col ${s.token} bg-background p-inset-sm rounded-interactive border border-border-muted`}
                    >
                      <div className="h-8 bg-primary/30 rounded-icon flex items-center justify-center">
                        <span className="caption text-primary-on-background">
                          Item 1
                        </span>
                      </div>
                      <div className="h-8 bg-primary/30 rounded-icon flex items-center justify-center">
                        <span className="caption text-primary-on-background">
                          Item 2
                        </span>
                      </div>
                      <div className="h-8 bg-primary/30 rounded-icon flex items-center justify-center">
                        <span className="caption text-primary-on-background">
                          Item 3
                        </span>
                      </div>
                    </div>
                    <p className="caption text-center text-muted-foreground mt-inline">
                      <code className="monospace text-primary">{s.token}</code>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border" />

          {/* Inset Spacing */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <h4 className="headline-5">Inset Spacing</h4>
              <p className="body-2 text-muted-foreground">
                Padding inside containers — use with{" "}
                <code className="caption monospace text-primary">p-*</code>,{" "}
                <code className="caption monospace text-primary">px-*</code>, or{" "}
                <code className="caption monospace text-primary">py-*</code>
              </p>
            </div>

            <div className="space-y-stack">
              {[
                {
                  name: "inset-sm",
                  token: "p-inset-sm",
                  size: "6px → 8px",
                  desc: "Minimal padding",
                  example: "Compact badges, tight table cells",
                },
                {
                  name: "inset",
                  token: "p-inset",
                  size: "8px → 12px",
                  desc: "Small containers",
                  example: "Buttons, small cards, tags",
                },
                {
                  name: "inset-lg",
                  token: "p-inset-lg",
                  size: "16px → 24px",
                  desc: "Standard containers",
                  example: "Cards, dialogs, panels (default)",
                  default: true,
                },
                {
                  name: "inset-xl",
                  token: "p-inset-xl",
                  size: "24px → 32px",
                  desc: "Generous padding",
                  example: "Hero sections, feature cards",
                },
                {
                  name: "inset-2xl",
                  token: "p-inset-2xl",
                  size: "32px → 48px",
                  desc: "Large containers",
                  example: "Large immersive containers",
                },
                {
                  name: "inset-3xl",
                  token: "p-inset-3xl",
                  size: "48px → 64px",
                  desc: "Maximum padding",
                  example: "Full-page containers, landing pages",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="bg-surface-2 p-inset rounded-nested border border-border"
                >
                  <div className="flex items-start justify-between mb-stack">
                    <div className="flex-1">
                      <div className="flex items-center gap-inline mb-inline">
                        <p className="button-text text-primary">{s.name}</p>
                        {s.default && (
                          <span className="bg-accent-background text-accent-on-background px-inset-sm py-inline rounded-full caption font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="subtitle-2">{s.desc}</p>
                      <p className="caption text-muted-foreground">
                        {s.example}
                      </p>
                    </div>
                    <code className="caption monospace text-accent tabular-nums whitespace-nowrap bg-accent-background px-inset-sm py-inline rounded-interactive">
                      {s.size}
                    </code>
                  </div>

                  {/* Visual demonstration */}
                  <div className="mt-stack">
                    <p className="caption text-muted-foreground mb-inline">
                      Visual example:
                    </p>
                    <div className="bg-background rounded-interactive border border-border-muted">
                      <div
                        className={`${s.token} bg-primary/20 border-2 border-dashed border-primary/40 rounded-interactive`}
                      >
                        <div className="bg-primary/30 rounded-icon flex items-center justify-center min-h-12">
                          <span className="caption text-primary-on-background">
                            Content with {s.token}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
