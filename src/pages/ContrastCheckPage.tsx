import { useEffect, useState, useMemo } from "react";

interface OklchColor {
  l: number;
  c: number;
  h: number;
  alpha: number;
}

interface WCAGResult {
  aa: boolean;
  aaa: boolean;
  level: "AAA" | "AA" | "FAIL";
  color: string;
}

interface ColorPair {
  name: string;
  fg: string;
  bg: string;
}

interface Summary {
  total: number;
  aaa: number;
  aa: number;
  fail: number;
}

type RGB = [number, number, number];

// OKLCH to RGB conversion (same as the Node script)
function oklchToRgb(l: number, c: number, h: number): RGB {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b2 = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const toSrgb = (c: number) => {
    const abs = Math.abs(c);
    if (abs > 0.0031308) {
      return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    }
    return 12.92 * c;
  };

  return [
    Math.max(0, Math.min(1, toSrgb(r))),
    Math.max(0, Math.min(1, toSrgb(g))),
    Math.max(0, Math.min(1, toSrgb(b2))),
  ];
}

function parseOklch(oklchString: string): OklchColor | null {
  const match = oklchString.match(
    /oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/,
  );
  if (!match) return null;

  return {
    l: parseFloat(match[1]) / 100,
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
    alpha: match[4] ? parseFloat(match[4]) : 1,
  };
}

function getRelativeLuminance(rgb: RGB): number {
  const [r, g, b] = rgb.map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAGLevel(ratio: number): WCAGResult {
  if (ratio >= 7)
    return { aa: true, aaa: true, level: "AAA", color: "success" };
  if (ratio >= 4.5)
    return { aa: true, aaa: false, level: "AA", color: "warning" };
  return { aa: false, aaa: false, level: "FAIL", color: "warning" };
}

// Get computed CSS variable value
function getCSSVar(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

// Color pair definitions (variable names, not hardcoded colors)
const colorPairDefinitions: Record<string, ColorPair[]> = {
  foundation: [
    {
      name: "foreground on background",
      fg: "--foreground",
      bg: "--background",
    },
    { name: "foreground on surface-1", fg: "--foreground", bg: "--surface-1" },
    { name: "foreground on surface-2", fg: "--foreground", bg: "--surface-2" },
    { name: "foreground on surface-3", fg: "--foreground", bg: "--surface-3" },
    { name: "foreground on surface-4", fg: "--foreground", bg: "--surface-4" },
    {
      name: "muted-foreground on background",
      fg: "--muted-foreground",
      bg: "--background",
    },
    {
      name: "muted-foreground on surface-1",
      fg: "--muted-foreground",
      bg: "--surface-1",
    },
    {
      name: "muted-foreground on surface-2",
      fg: "--muted-foreground",
      bg: "--surface-2",
    },
    {
      name: "muted-foreground on surface-3",
      fg: "--muted-foreground",
      bg: "--surface-3",
    },
    {
      name: "muted-foreground on surface-4",
      fg: "--muted-foreground",
      bg: "--surface-4",
    },
  ],
  primary: [
    {
      name: "primary-foreground on primary",
      fg: "--primary-foreground",
      bg: "--primary",
    },
    {
      name: "primary-on-background on primary-background",
      fg: "--primary-on-background",
      bg: "--primary-background",
    },
  ],
  accent: [
    {
      name: "accent-foreground on accent",
      fg: "--accent-foreground",
      bg: "--accent",
    },
    {
      name: "accent-on-background on accent-background",
      fg: "--accent-on-background",
      bg: "--accent-background",
    },
  ],
  success: [
    {
      name: "success-foreground on success",
      fg: "--success-foreground",
      bg: "--success",
    },
    {
      name: "success-on-background on success-background",
      fg: "--success-on-background",
      bg: "--success-background",
    },
  ],
  warning: [
    {
      name: "warning-foreground on warning",
      fg: "--warning-foreground",
      bg: "--warning",
    },
    {
      name: "warning-on-background on warning-background",
      fg: "--warning-on-background",
      bg: "--warning-background",
    },
  ],
  neutral: [
    {
      name: "neutral-foreground on neutral",
      fg: "--neutral-foreground",
      bg: "--neutral",
    },
    {
      name: "neutral-on-background on neutral-background",
      fg: "--neutral-on-background",
      bg: "--neutral-background",
    },
  ],
  muted: [
    {
      name: "muted-foreground on muted",
      fg: "--muted-foreground",
      bg: "--muted",
    },
    {
      name: "muted-on-background on muted-background",
      fg: "--muted-on-background",
      bg: "--muted-background",
    },
  ],
  disabled: [
    {
      name: "disabled-foreground on disabled",
      fg: "--disabled-foreground",
      bg: "--disabled",
    },
    {
      name: "disabled-on-background on disabled-background",
      fg: "--disabled-on-background",
      bg: "--disabled-background",
    },
  ],
};

interface ContrastPairCardProps {
  pair: ColorPair;
  fgColor: string;
  bgColor: string;
  themeKey: number;
}

function ContrastPairCard({ pair, fgColor, bgColor }: ContrastPairCardProps) {
  const result = useMemo(() => {
    const fgOklch = parseOklch(fgColor);
    const bgOklch = parseOklch(bgColor);

    if (!fgOklch || !bgOklch) {
      return null;
    }

    const fgRgb = oklchToRgb(fgOklch.l, fgOklch.c, fgOklch.h);
    const bgRgb = oklchToRgb(bgOklch.l, bgOklch.c, bgOklch.h);

    const ratio = getContrastRatio(fgRgb, bgRgb);
    const wcag = getWCAGLevel(ratio);

    return {
      ratio: ratio.toFixed(2),
      wcag,
    };
  }, [fgColor, bgColor]);

  if (!result) return null;

  return (
    <div className="bg-surface-1 rounded-container border border-border overflow-hidden">
      {/* Visual Example */}
      <div
        className="p-inset-lg flex items-center justify-center min-h-24"
        style={{ backgroundColor: bgColor }}
      >
        <p className="headline-5 text-center" style={{ color: fgColor }}>
          {pair.name}
        </p>
      </div>

      {/* Stats */}
      <div className="p-inset border-t border-border space-y-stack">
        <div className="flex items-center justify-between gap-inline">
          <span className="caption">Contrast Ratio:</span>
          <span className="button-text">{result.ratio}:1</span>
        </div>

        <div className="flex items-center justify-between gap-inline">
          <span className="caption">WCAG Level:</span>
          <div className="flex items-center gap-inline">
            <span
              className={`px-inset py-inline rounded-full caption ${
                result.wcag.level === "AAA"
                  ? "bg-success-background text-success-on-background border border-border-success"
                  : result.wcag.level === "AA"
                    ? "bg-neutral-background text-neutral-on-background border border-border-neutral"
                    : "bg-warning-background text-warning-on-background border border-border-warning"
              }`}
            >
              {result.wcag.level}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-inline">
          <span className="caption">AA (≥4.5:1):</span>
          <span className="caption">
            {result.wcag.aa ? "✓ Pass" : "✗ Fail"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-inline">
          <span className="caption">AAA (≥7:1):</span>
          <span className="caption">
            {result.wcag.aaa ? "✓ Pass" : "✗ Fail"}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ContrastCategoryProps {
  title: string;
  pairs: ColorPair[];
  themeKey: number;
}

function ContrastCategory({ title, pairs, themeKey }: ContrastCategoryProps) {
  // Use useMemo to derive state instead of setState in useEffect
  const pairResults = pairs.map((pair) => ({
    ...pair,
    fgColor: getCSSVar(pair.fg),
    bgColor: getCSSVar(pair.bg),
  }));

  return (
    <section className="space-y-section">
      <h2 className="headline-3">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-section">
        {pairResults.map((pair, idx) => (
          <ContrastPairCard
            key={idx}
            pair={pair}
            fgColor={pair.fgColor}
            bgColor={pair.bgColor}
            themeKey={themeKey}
          />
        ))}
      </div>
    </section>
  );
}

export default function ContrastCheckPage() {
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    aaa: 0,
    aa: 0,
    fail: 0,
  });
  const [themeKey, setThemeKey] = useState(0);

  useEffect(() => {
    // Watch for theme changes by observing the dark class on html/body
    const observer = new MutationObserver(() => {
      // Force re-render when theme changes
      setThemeKey((prev) => prev + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Calculate summary across all categories
    let total = 0;
    let aaaCount = 0;
    let aaCount = 0;
    let failCount = 0;

    Object.values(colorPairDefinitions).forEach((pairs: ColorPair[]) => {
      pairs.forEach((pair: ColorPair) => {
        const fgColor = getCSSVar(pair.fg);
        const bgColor = getCSSVar(pair.bg);

        const fgOklch = parseOklch(fgColor);
        const bgOklch = parseOklch(bgColor);

        if (fgOklch && bgOklch) {
          const fgRgb = oklchToRgb(fgOklch.l, fgOklch.c, fgOklch.h);
          const bgRgb = oklchToRgb(bgOklch.l, bgOklch.c, bgOklch.h);
          const ratio = getContrastRatio(fgRgb, bgRgb);
          const wcag = getWCAGLevel(ratio);

          total++;
          if (wcag.aaa) aaaCount++;
          else if (wcag.aa) aaCount++;
          else failCount++;
        }
      });
    });

    setSummary({ total, aaa: aaaCount, aa: aaCount, fail: failCount });
  }, [themeKey]); // Re-calculate when theme changes

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-inset-lg md:p-inset-xl space-y-layout">
        {/* Header */}
        <header className="space-y-stack">
          <h1 className="headline-1">WCAG Contrast Checker</h1>
          <p className="body-1 text-muted-foreground max-w-3xl">
            Live validation of all color pairs in the design system against WCAG
            AA (4.5:1) and AAA (7:1) standards. Toggle between light and dark
            themes to check both modes.
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-section">
          <div className="bg-surface-1 rounded-container p-inset-lg border border-border space-y-inline">
            <p className="caption">Total Pairs</p>
            <p className="headline-2 tabular-nums">{summary.total}</p>
          </div>

          <div className="bg-success-background rounded-container p-inset-lg border border-success space-y-inline">
            <p className="caption text-success-on-background">AAA Pass</p>
            <p className="headline-2 tabular-nums text-success-on-background">
              {summary.aaa}
            </p>
            <p className="caption text-success-on-background">≥7:1</p>
          </div>

          <div className="bg-neutral-background rounded-container p-inset-lg border border-border-neutral space-y-inline">
            <p className="caption">AA Pass</p>
            <p className="headline-2 tabular-nums">{summary.aa}</p>
            <p className="caption">≥4.5:1</p>
          </div>

          <div className="bg-warning-background rounded-container p-inset-lg border border-warning space-y-inline">
            <p className="caption text-warning-on-background">Fail</p>
            <p className="headline-2 tabular-nums text-warning-on-background">
              {summary.fail}
            </p>
            <p className="caption text-warning-on-background">&lt;4.5:1</p>
          </div>
        </div>

        {/* Color Categories */}
        <div className="space-y-layout">
          <ContrastCategory
            title="Foundation"
            pairs={colorPairDefinitions.foundation}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Primary"
            pairs={colorPairDefinitions.primary}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Accent"
            pairs={colorPairDefinitions.accent}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Success"
            pairs={colorPairDefinitions.success}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Warning"
            pairs={colorPairDefinitions.warning}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Neutral"
            pairs={colorPairDefinitions.neutral}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Muted"
            pairs={colorPairDefinitions.muted}
            themeKey={themeKey}
          />
          <ContrastCategory
            title="Disabled"
            pairs={colorPairDefinitions.disabled}
            themeKey={themeKey}
          />
        </div>

        {/* Footer Note */}
        <footer className="bg-muted-background rounded-container p-inset-lg border border-muted">
          <p className="body-2 text-muted-on-background">
            <strong>Note:</strong> Disabled states intentionally have lower
            contrast to signal non-interactive elements. This is acceptable per
            WCAG guidelines when the control is actually disabled.
          </p>
        </footer>
      </div>
    </div>
  );
}
