import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { FeatureCard } from "@/components/common/FeatureCard";
import {
  FaPalette,
  FaShapes,
  FaFont,
  FaRulerCombined,
  FaLayerGroup,
  FaCubes,
} from "react-icons/fa6";

export function BrandKitPage() {
  return (
    <div className="space-y-section">
      <PageHeader
        pageTitle="JLS Stack Sandbox Design System"
        level="h2"
        pageDescription="A three-layer design system following Tailwind 4 best practices: primitives define raw values, semantics map design decisions, and components provide reusable patterns."
        hr
      />

      {/* THREE-LAYER ARCHITECTURE */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Three-Layer Architecture</h3>
          <p className="body-1 text-muted-foreground">
            Our design system follows Tailwind 4 best practices with clear
            separation between foundation, semantics, and implementation.
          </p>
        </div>

        <ResponsiveGrid maxColumns="three">
          <FeatureCard
            icon={<FaCubes />}
            heading="Layer 1: Primitives"
            description="Raw foundational values that never change. Full color palettes (50-950), spacing scale (1-24), radius values, font families."
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaLayerGroup />}
            heading="Layer 2: Semantics"
            description="Design decisions mapped to primitives. Color semantics, spacing tokens (inline, stack, inset-*), radius tokens (interactive, container)."
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaShapes />}
            heading="Layer 3: Components"
            description="Composite utilities built with @utility. Typography (headline-1-6), grid patterns (grid-basic), interactive utilities (hit-target)."
            emphasis="subtle"
          />
        </ResponsiveGrid>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border shadow-low">
          <h4 className="headline-5 mb-stack">System Flow</h4>
          <div className="flex flex-col md:flex-row gap-stack items-center">
            <div className="flex-1 bg-surface-2 p-inset rounded-nested border border-border">
              <p className="overline-text text-primary mb-inline">PRIMITIVES</p>
              <code className="caption monospace text-accent block mb-inline">
                --sandbox-primitive-color-cyan-700
              </code>
              <code className="caption monospace text-accent block">
                oklch(42% 0.19 195)
              </code>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="flex-1 bg-surface-2 p-inset rounded-nested border border-border">
              <p className="overline-text text-primary mb-inline">SEMANTICS</p>
              <code className="caption monospace text-accent block mb-inline">
                --primary
              </code>
              <code className="caption monospace text-muted-foreground block">
                var(--sandbox-primitive-color-cyan-700)
              </code>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="flex-1 bg-surface-2 p-inset rounded-nested border border-border">
              <p className="overline-text text-primary mb-inline">COMPONENTS</p>
              <code className="caption monospace text-accent block">
                bg-primary
              </code>
            </div>
          </div>
          <p className="caption text-muted-foreground mt-stack">
            <strong>Change primitives</strong> → semantics automatically update
            → components inherit changes. Maintainable by design.
          </p>
        </div>
      </section>

      <hr className="border-border" />

      {/* DESIGN SYSTEM OVERVIEW */}
      <section>
        <h3 className="mb-stack">Design System Overview</h3>
        <ResponsiveGrid maxColumns="two">
          <FeatureCard
            icon={<FaPalette />}
            heading="Full Color Palettes"
            description="Complete 50-950 scales for cyan, fuchsia, teal, coral, steel, slate, and gray using OKLCH color space"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaRulerCombined />}
            heading="Unified Spacing Scale"
            description="Base unit (0.25rem) with percentage-based scale. Everything uses the same foundational rhythm"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaFont />}
            heading="Component Typography"
            description="13 utilities (headline-1-6, body-1/2, caption) defined with @utility, overridable via cn()"
            emphasis="subtle"
          />
          <FeatureCard
            icon={<FaShapes />}
            heading="Surface Elevation"
            description="Four distinct levels with progressive cyan tinting create clear visual hierarchy"
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
            <div className="h-16 rounded-container border-2 border-border bg-background shadow-low" />
            <p className="caption">Level 0</p>
            <code className="caption monospace text-muted-foreground">
              background
            </code>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-1 shadow-low" />
            <p className="caption">Level 1</p>
            <code className="caption monospace text-muted-foreground">
              surface-1
            </code>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-2 shadow-low" />
            <p className="caption">Level 2</p>
            <code className="caption monospace text-muted-foreground">
              surface-2
            </code>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-3 shadow-low" />
            <p className="caption">Level 3</p>
            <code className="caption monospace text-muted-foreground">
              surface-3
            </code>
          </div>
          <div className="text-center space-y-inline">
            <div className="h-16 rounded-container border-2 border-border bg-surface-4 shadow-low" />
            <p className="caption">Level 4</p>
            <code className="caption monospace text-muted-foreground">
              surface-4
            </code>
          </div>
        </div>

        <div className="bg-surface-1 p-inset rounded-container border border-border">
          <p className="caption text-muted-foreground">
            <strong>Prefer surface elevation over shadows</strong> for
            hierarchy. Shadows reserved for floating elements (modals,
            dropdowns).
          </p>
        </div>
      </section>

      <hr className="border-border" />

      {/* BRAND COLORS */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Brand Identity</h3>
          <p className="body-1 text-muted-foreground">
            Electric cyan and hot fuchsia anchor all interactive moments. Built
            from complete primitive palettes for maximum flexibility.
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
                    PALETTE
                  </p>
                  <code className="caption monospace text-primary-foreground">
                    50-950
                  </code>
                </div>
              </div>
              <div className="pt-inline">
                <p className="caption text-primary-foreground/70 mb-inline">
                  Semantic token built from:
                </p>
                <code className="caption monospace text-primary-foreground bg-primary-foreground/10 px-inset-sm py-inline rounded-interactive inline-block">
                  --sandbox-primitive-color-cyan-700
                </code>
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
                    PALETTE
                  </p>
                  <code className="caption monospace text-accent-foreground">
                    50-950
                  </code>
                </div>
              </div>
              <div className="pt-inline">
                <p className="caption text-accent-foreground/70 mb-inline">
                  Semantic token built from:
                </p>
                <code className="caption monospace text-accent-foreground bg-accent-foreground/10 px-inset-sm py-inline rounded-interactive inline-block">
                  --sandbox-primitive-color-fuchsia-700
                </code>
              </div>
            </div>
          </div>
        </ResponsiveGrid>

        {/* Color Swatches */}
        <div className="bg-surface-1 p-inset-lg rounded-container border border-border shadow-low">
          <p className="overline-text text-primary mb-stack">
            6-TOKEN SEMANTIC PATTERN
          </p>
          <ResponsiveGrid>
            <div className="space-y-inline">
              <div className="h-20 rounded-container border-2 border-border-primary bg-primary shadow-low" />
              <p className="caption text-center font-semibold">Base</p>
              <code className="caption monospace text-center block text-muted-foreground">
                primary
              </code>
            </div>
            <div className="space-y-inline">
              <div className="h-20 rounded-container border-2 border-border-primary bg-primary-hover shadow-low" />
              <p className="caption text-center font-semibold">Hover</p>
              <code className="caption monospace text-center block text-muted-foreground">
                primary-hover
              </code>
            </div>
            <div className="space-y-inline">
              <div className="h-20 rounded-container border-2 border-border-primary bg-primary-background shadow-low flex items-center justify-center">
                <span className="caption text-primary-on-background font-semibold">
                  Text
                </span>
              </div>
              <p className="caption text-center font-semibold">Background</p>
              <code className="caption monospace text-center block text-muted-foreground">
                primary-background
              </code>
            </div>
            <div className="space-y-inline">
              <div className="h-20 rounded-container border-2 border-border-primary bg-background shadow-low flex items-center justify-center">
                <span className="caption text-primary-on-background font-semibold">
                  Text
                </span>
              </div>
              <p className="caption text-center font-semibold">On Background</p>
              <code className="caption monospace text-center block text-muted-foreground">
                on-background
              </code>
            </div>
          </ResponsiveGrid>
        </div>
      </section>

      <hr className="border-border" />

      {/* SEMANTIC PALETTE */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Semantic Palette</h3>
          <p className="body-1 text-muted-foreground">
            Complete token sets for every semantic need, all built from full
            primitive palettes.
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
              <p className="caption">Matrix teal</p>
              <code className="caption monospace text-muted-foreground block mt-inline">
                teal-700
              </code>
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
              <code className="caption monospace text-muted-foreground block mt-inline">
                coral-700
              </code>
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
              <code className="caption monospace text-muted-foreground block mt-inline">
                steel-300
              </code>
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
              <code className="caption monospace text-muted-foreground block mt-inline">
                slate-200
              </code>
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
              <code className="caption monospace text-muted-foreground block mt-inline">
                gray-200
              </code>
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
            <p className="overline-text text-primary">SOLID BADGES</p>
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
        <div className="space-y-inline">
          <h3>Typography System</h3>
          <p className="body-1 text-muted-foreground">
            Component-level utilities defined with @utility, fully overridable
            via cn() with standard Tailwind classes.
          </p>
        </div>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border space-y-section shadow-low">
          {/* Overline */}
          <div className="space-y-inline">
            <span className="overline-text text-primary">
              OVERLINE TEXT — LABELS & CATEGORIES
            </span>
            <p className="caption">
              12px • Semibold • 0.15em letter spacing • Uppercase
            </p>
            <code className="caption monospace text-muted-foreground block">
              @utility overline-text
            </code>
          </div>

          {/* Headings */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <span className="headline-1">
                Heading 1 — Hero sections and main page titles
              </span>
              <p className="caption">48px • Light • -0.02em letter spacing</p>
              <code className="caption monospace text-muted-foreground">
                @utility headline-1
              </code>
            </div>

            <div className="space-y-inline">
              <span className="headline-2">
                Heading 2 — Major page sections
              </span>
              <p className="caption">36px • Light • -0.015em letter spacing</p>
            </div>

            <div className="space-y-inline">
              <span className="headline-3">Heading 3 — Subsections</span>
              <p className="caption">28px • Regular • -0.01em letter spacing</p>
            </div>
          </div>

          {/* Body Text */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <p className="body-1">
                Body 1 — Primary content text optimized for long-form reading.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className="caption">16px • Regular • 1.6 line height</p>
            </div>

            <div className="space-y-inline">
              <p className="body-2 text-muted-foreground">
                Body 2 — Dense content and descriptions. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
              <p className="caption">14px • Regular • 1.5 line height</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* SPACING SCALE */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Spacing System</h3>
          <p className="body-1 text-muted-foreground">
            Built from primitive scale (base = 0.25rem, numbers = percentages)
            with fluid semantic tokens using clamp().
          </p>
        </div>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border space-y-section shadow-low">
          {/* Primitive Scale */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <h4 className="headline-5">Primitive Scale</h4>
              <p className="body-2 text-muted-foreground">
                Base unit: 0.25rem (4px) • Scale: Numbers = percentages
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
              {[
                { num: "1", value: "4px", pct: "100%" },
                { num: "2", value: "8px", pct: "200%" },
                { num: "4", value: "16px", pct: "400%" },
                { num: "6", value: "24px", pct: "600%" },
                { num: "8", value: "32px", pct: "800%" },
                { num: "12", value: "48px", pct: "1200%" },
                { num: "16", value: "64px", pct: "1600%" },
                { num: "24", value: "96px", pct: "2400%" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="bg-surface-2 p-inset-sm rounded-nested border border-border text-center"
                >
                  <code className="caption monospace text-primary font-semibold block mb-inline">
                    space-{s.num}
                  </code>
                  <p className="caption text-muted-foreground">{s.value}</p>
                  <p className="caption text-muted-foreground">({s.pct})</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border" />

          {/* Flow Spacing */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <h4 className="headline-5">Flow Spacing (Semantic)</h4>
              <p className="body-2 text-muted-foreground">
                Gaps between elements — fluid clamp() using primitives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-section">
              {[
                {
                  name: "inline",
                  token: "gap-inline",
                  size: "4px → 6px",
                  desc: "Related items",
                  example: "Buttons, icon+text",
                  formula: "clamp(space-1, 0.2rem + 0.25vw, space-2)",
                },
                {
                  name: "stack",
                  token: "gap-stack",
                  size: "8px → 12px",
                  desc: "Vertical flow",
                  example: "Label→input",
                  formula: "clamp(space-2, 0.375rem + 0.5vw, space-3)",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="bg-surface-2 p-inset rounded-nested border border-border"
                >
                  <p className="button-text text-primary mb-inline">{s.name}</p>
                  <p className="subtitle-2 mb-inline">{s.desc}</p>
                  <code className="caption monospace text-accent block mb-stack bg-accent-background px-inset-sm py-inline rounded-interactive">
                    {s.formula}
                  </code>

                  <div
                    className={`flex flex-col ${s.token} bg-background p-inset-sm rounded-interactive border border-border-muted`}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 bg-primary/30 rounded-icon flex items-center justify-center"
                      >
                        <span className="caption text-primary-on-background">
                          Item {i}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-border" />

          {/* Inset Spacing */}
          <div className="space-y-stack">
            <div className="space-y-inline">
              <h4 className="headline-5">Inset Spacing (Semantic)</h4>
              <p className="body-2 text-muted-foreground">
                Padding inside containers — fluid clamp() using primitives
              </p>
            </div>

            <div className="space-y-stack">
              {[
                {
                  name: "inset",
                  token: "p-inset",
                  size: "16px → 24px",
                  desc: "Standard containers",
                  default: true,
                  formula: "clamp(space-4, 0.75rem + 1vw, space-6)",
                },
                {
                  name: "inset-lg",
                  token: "p-inset-lg",
                  size: "24px → 32px",
                  desc: "Cards, panels (default)",
                  default: false,
                  formula: "clamp(space-6, 1.25rem + 1vw, space-8)",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="bg-surface-2 p-inset rounded-nested border border-border"
                >
                  <div className="flex items-center gap-inline mb-stack">
                    <p className="button-text text-primary">{s.name}</p>
                    {s.default && (
                      <span className="bg-accent-background text-accent-on-background px-inset-sm py-inline rounded-full caption font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <code className="caption monospace text-accent block mb-stack bg-accent-background px-inset-sm py-inline rounded-interactive">
                    {s.formula}
                  </code>

                  <div className="bg-background rounded-interactive border border-border-muted">
                    <div
                      className={`${s.token} bg-primary/20 border-2 border-dashed border-primary/40 rounded-interactive`}
                    >
                      <div className="bg-primary/30 rounded-icon flex items-center justify-center min-h-12">
                        <span className="caption text-primary-on-background">
                          {s.token}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* TAILWIND MERGE COMPATIBILITY */}
      <section className="space-y-stack">
        <div className="space-y-inline">
          <h3>Tailwind Merge Compatibility</h3>
          <p className="body-1 text-muted-foreground">
            All component utilities properly conflict with standard Tailwind
            classes via extended twMerge configuration.
          </p>
        </div>

        <div className="bg-surface-1 p-inset-lg rounded-container border border-border shadow-low">
          <div className="space-y-section">
            <div className="space-y-inline">
              <p className="overline-text text-primary">CONFLICT RESOLUTION</p>
              <p className="body-2 text-muted-foreground">
                Component utilities can be overridden with standard Tailwind
                classes using cn()
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-stack">
              <div className="bg-surface-2 p-inset rounded-nested border border-border">
                <code className="caption monospace text-accent block mb-inline">
                  cn("headline-1", "text-sm")
                </code>
                <p className="caption text-muted-foreground">
                  text-sm wins (overrides font-size)
                </p>
              </div>

              <div className="bg-surface-2 p-inset rounded-nested border border-border">
                <code className="caption monospace text-accent block mb-inline">
                  cn("grid-wide", "px-12")
                </code>
                <p className="caption text-muted-foreground">
                  px-12 overrides grid padding
                </p>
              </div>

              <div className="bg-surface-2 p-inset rounded-nested border border-border">
                <code className="caption monospace text-accent block mb-inline">
                  cn("p-inset-lg", "pt-2")
                </code>
                <p className="caption text-muted-foreground">
                  pt-2 overrides top padding only
                </p>
              </div>

              <div className="bg-surface-2 p-inset rounded-nested border border-border">
                <code className="caption monospace text-accent block mb-inline">
                  cn("rounded-interactive", "rounded-full")
                </code>
                <p className="caption text-muted-foreground">
                  rounded-full wins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
