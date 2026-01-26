import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/Button";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FaPalette, FaShapes, FaFont, FaRulerCombined } from "react-icons/fa6";

export function BrandKitPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="JLS Stack Sandbox Design System"
        level="h2"
        pageDescription="Electric cyan and hot fuchsia create a cohesive color story with progressive surface elevation and comprehensive token sets."
        hr
      />

      <section>
        <h3 className="mb-standard">Design System Overview</h3>
        <ResponsiveGrid>
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
            description="Four-step scale for consistent rhythm across all components"
            emphasis="subtle"
          />
        </ResponsiveGrid>
      </section>

      <hr className="border-border" />

      {/* ===============================
          1. SURFACE ELEVATION SYSTEM
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h3>Surface Elevation</h3>
          <p className="body-1">
            Four distinct surface levels create clear hierarchy. Each level sits
            progressively higher, with increasing cyan tint in dark mode.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-compact">
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-background" />
            <p className="caption text-muted-foreground">Level 0</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-1" />
            <p className="caption text-muted-foreground">Level 1</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-2" />
            <p className="caption text-muted-foreground">Level 2</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-3" />
            <p className="caption text-muted-foreground">Level 3</p>
          </div>
          <div className="text-center space-y-tight">
            <div className="h-16 rounded border-2 border-border bg-surface-4" />
            <p className="caption text-muted-foreground">Level 4</p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          2. BRAND COLORS
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h3>Brand Identity</h3>
          <p className="body-1 text-muted-foreground">
            Electric cyan and hot fuchsia anchor all interactive moments.
          </p>
        </div>

        <ResponsiveGrid maxColumns="two">
          {/* Primary Cyan */}
          <div className="bg-linear-to-br from-primary via-primary to-primary-hover text-primary-foreground p-section rounded-lg border-2 border-border-primary shadow-lg">
            <div className="space-y-compact">
              <div className="inline-block bg-primary-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="overline-text text-[10px]">PRIMARY</p>
              </div>
              <h4 className="font-black">Electric Cyan</h4>
              <p className="body-2 opacity-90 max-w-sm">
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
          <div className="bg-linear-to-br from-accent via-accent to-accent-hover text-accent-foreground p-section rounded-lg border-2 border-border-accent shadow-lg">
            <div className="space-y-compact">
              <div className="inline-block bg-accent-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="overline-text text-[10px]">ACCENT</p>
              </div>
              <h4 className="font-black">Vaporwave Fuchsia</h4>
              <p className="body-2 opacity-90 max-w-sm">
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
        </ResponsiveGrid>
        <ResponsiveGrid>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-primary bg-primary" />
            <p className="caption text-center text-muted-foreground">Primary</p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-primary bg-primary-hover" />
            <p className="caption text-center text-muted-foreground">Hover</p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-accent bg-accent" />
            <p className="caption text-center text-muted-foreground">Accent</p>
          </div>
          <div className="space-y-1">
            <div className="h-20 rounded-lg border-2 border-border-accent bg-accent-hover" />
            <p className="caption text-center text-muted-foreground">Hover</p>
          </div>
        </ResponsiveGrid>
      </section>

      <hr className="border-border" />

      {/* ===============================
          3. SEMANTIC PALETTE
          =============================== */}
      <section className="space-y-standard">
        <div className="flex flex-col gap-tight">
          <h3>Semantic Palette</h3>
          <p className="body-1 text-muted-foreground">
            Complete token sets for every semantic need.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-compact">
          {/* Success */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-success transition-all">
            <div className="h-24 bg-success border-b-4 border-border-success flex items-center justify-center">
              <span className="text-success-foreground headline-4 font-black">
                ✓
              </span>
            </div>
            <div className="p-compact">
              <p className="button text-[10px] mb-1">SUCCESS</p>
              <p className="caption text-muted-foreground">Matrix green</p>
            </div>
          </div>

          {/* Warning */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-warning transition-all">
            <div className="h-24 bg-warning border-b-4 border-border-warning flex items-center justify-center">
              <span className="text-warning-foreground headline-4 font-black">
                !
              </span>
            </div>
            <div className="p-compact">
              <p className="button text-[10px] mb-1">WARNING</p>
              <p className="caption text-muted-foreground">Hot coral</p>
            </div>
          </div>

          {/* Neutral */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-neutral transition-all">
            <div className="h-24 bg-neutral border-b-4 border-border-neutral flex items-center justify-center">
              <span className="text-neutral-foreground headline-4 font-black">
                ○
              </span>
            </div>
            <div className="p-compact">
              <p className="button text-[10px] mb-1">NEUTRAL</p>
              <p className="caption text-muted-foreground">Cool steel</p>
            </div>
          </div>

          {/* Muted */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden hover:border-border-muted transition-all">
            <div className="h-24 bg-muted border-b-4 border-border-muted flex items-center justify-center">
              <span className="text-muted-foreground headline-4 font-black">
                ◑
              </span>
            </div>
            <div className="p-compact">
              <p className="button text-[10px] mb-1">MUTED</p>
              <p className="caption text-muted-foreground">Blue-gray</p>
            </div>
          </div>

          {/* Disabled */}
          <div className="group bg-surface-1 border border-border rounded-lg overflow-hidden">
            <div className="h-24 bg-disabled border-b-4 border-border-disabled flex items-center justify-center">
              <span className="text-disabled-foreground headline-4 font-black">
                ◌
              </span>
            </div>
            <div className="p-compact">
              <p className="button text-[10px] mb-1">DISABLED</p>
              <p className="caption text-muted-foreground">Ghosted</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ===============================
          4. INTERACTIVE COMPONENTS
          =============================== */}
      <section className="space-y-standard">
        <h3>Component Showcase</h3>

        <div className="bg-surface-1 p-section rounded-lg border border-border space-y-section">
          {/* Buttons */}
          <div className="space-y-compact">
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
          <div className="space-y-compact">
            <p className="overline-text text-primary">BADGES</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary text-primary-foreground border-2 border-border-primary px-3 py-1.5 rounded-full caption font-semibold shadow-sm">
                Primary
              </span>
              <span className="bg-accent text-accent-foreground border-2 border-border-accent px-3 py-1.5 rounded-full caption font-semibold shadow-sm">
                Accent
              </span>
              <span className="bg-success text-success-foreground border-2 border-border-success px-3 py-1.5 rounded-full caption font-semibold shadow-sm">
                Success
              </span>
              <span className="bg-warning text-warning-foreground border-2 border-border-warning px-3 py-1.5 rounded-full caption font-semibold shadow-sm">
                Warning
              </span>
              <span className="bg-neutral text-neutral-foreground border-2 border-border-neutral px-3 py-1.5 rounded-full caption font-semibold shadow-sm">
                Neutral
              </span>
              <span className="bg-muted text-muted-foreground border-2 border-border-muted px-3 py-1.5 rounded-full caption font-semibold">
                Muted
              </span>
            </div>
          </div>

          {/* Subtle Badge Variants */}
          <div className="space-y-compact">
            <p className="overline-text text-primary">SUBTLE VARIANTS</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary-background text-primary border border-border-primary px-3 py-1.5 rounded-full caption font-medium">
                Primary
              </span>
              <span className="bg-accent-background text-accent border border-border-accent px-3 py-1.5 rounded-full caption font-medium">
                Accent
              </span>
              <span className="bg-success-background text-success border border-border-success px-3 py-1.5 rounded-full caption font-medium">
                Success
              </span>
              <span className="bg-warning-background text-warning border border-border-warning px-3 py-1.5 rounded-full caption font-medium">
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
        <h3>Typography System</h3>

        <div className="bg-surface-1 p-section rounded-lg border border-border space-y-section">
          {/* overline-text */}
          <div className="space-y-tight">
            <span className="overline overline-text text-primary pb-1 inline-block">
              OVERLINE TEXT — LABELS & CATEGORIES
            </span>
            <p className="caption text-muted-foreground">
              12px • Semibold • 0.15em letter spacing • Uppercase
            </p>
          </div>

          {/* All Headings */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <span className="headline-1">
                Heading 1 — Hero sections and main page titles
              </span>
              <p className="caption text-muted-foreground">
                48px • Bold • -0.02em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <span className="headline-2">
                Heading 2 — Major page sections and divisions
              </span>
              <p className="caption text-muted-foreground">
                36px • Semibold • -0.015em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <span className="headline-3">
                Heading 3 — Subsections and card group headers
              </span>
              <p className="caption text-muted-foreground">
                30px • Semibold • -0.01em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <span className="headline-4">
                Heading 4 — Component titles and sidebar headers
              </span>
              <p className="caption text-muted-foreground">
                24px • Semibold • Normal letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <span className="headline-5">
                Heading 5 — Small component headers and labels
              </span>
              <p className="caption text-muted-foreground">
                20px • Semibold • Normal letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <span className="headline-6">
                Heading 6 — Compact headers and nested component titles
              </span>
              <p className="caption text-muted-foreground">
                18px • Semibold • Normal letter spacing
              </p>
            </div>
          </div>

          {/* Subtitles */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <p className="subtitle-1">
                Subtitle 1 — Prominent secondary text for page subtitles and
                emphasized content
              </p>
              <p className="caption text-muted-foreground">
                16px • Medium • 0.01em letter spacing
              </p>
            </div>

            <div className="space-y-tight">
              <p className="subtitle-2">
                Subtitle 2 — Standard secondary text for component subtitles and
                helper text
              </p>
              <p className="caption text-muted-foreground">
                14px • Medium • 0.01em letter spacing
              </p>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-compact">
            <div className="space-y-tight">
              <p className="body-1">
                Body 1 — Primary content text optimized for long-form reading.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="caption text-muted-foreground">
                16px • Regular • 1.6 line height
              </p>
            </div>

            <div className="space-y-tight">
              <p className="body-2 text-muted-foreground">
                Body 2 — Dense content and descriptions. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="caption text-muted-foreground">
                14px • Regular • 1.5 line height
              </p>
            </div>
          </div>

          {/* UI Elements */}
          <div className="space-y-tight">
            <div className="flex items-center gap-compact flex-wrap">
              <Button semantic="primary">Button Text</Button>
              <span className="caption text-muted-foreground">
                Caption text for metadata and footnotes
              </span>
            </div>
            <p className="caption text-muted-foreground">
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
        <h3>Spacing</h3>

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
                  <p className="button">{s.name}</p>
                  <p className="caption text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex items-center gap-compact">
                  <code className="caption font-mono text-primary">
                    {s.size}
                  </code>
                  <div
                    className="bg-linear-to-r from-primary to-accent h-8 rounded"
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
