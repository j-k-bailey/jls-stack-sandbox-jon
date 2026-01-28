# JLS Stack Sandbox Design System

**Name**: JLS Stack Sandbox  
**Purpose**: Training playground for building stack-aligned apps quickly and correctly  
**Vibe**: Experimental, disciplined, modern  
**Color Story**: Electric cyan (195°) and hot fuchsia (325°) with OKLCH precision

---

## Color Foundations

### Brand Colors

- **Primary — Electric Cyan (195°)**
  - Light: `oklch(45% 0.18 195)`
  - Dark: `oklch(75% 0.18 195)`
  - Usage: Main CTAs, key interactions, active states, primary links
- **Accent — Vaporwave Fuchsia (325°)**
  - Light: `oklch(50% 0.22 325)`
  - Dark: `oklch(72% 0.24 325)`
  - Usage: Badges, highlights, secondary CTAs, alternative emphasis

### Semantic Colors

- **Success — Matrix Teal (160°)**:
  - Light: `oklch(48% 0.16 160)`
  - Dark: `oklch(72% 0.18 160)`
  - Usage: Confirmations, positive states, completed operations
- **Warning — Hot Coral (10°)**
  - Light: `oklch(50% 0.20 10)`
  - Dark: `oklch(68% 0.22 10)`
  - Usage: Errors, destructive actions, critical alerts
- **Neutral — Steel-Fuchsia (315°)**
  - Light: `oklch(86% 0.025 315)`
  - Dark: `oklch(30% 0.028 315)`
  - Usage: Generic interactive elements without semantic meaning
- **Muted — Blue-Gray (240°)**
  - Light: `oklch(88% 0.02 240)`
  - Dark: `oklch(28% 0.025 240)`
  - Usage: De-emphasized content, helper text, timestamps
- **Disabled — Ghosted (200°)**
  - Light: `oklch(90% 0.006 200)`
  - Dark: `oklch(22% 0.006 200)`
  - Usage: Inactive states, disabled components

### Neutrals

- **Background**: Main canvas
  - Light: `oklch(98% 0.008 200)`
  - Dark: `oklch(12% 0.015 200)`
- **Foreground**: Primary text
  - Light: `oklch(18% 0.015 200)`
  - Dark: `oklch(95% 0.01 200)`
- **Border**: Standard dividers
  - Light: `oklch(82% 0.018 200)`
  - Dark: `oklch(35% 0.030 200)`

---

## Token Structure

### Semantic Selection

- **Primary**: Main actions, brand moments
- **Accent**: Alternative emphasis, highlights
- **Success**: Positive confirmations
- **Warning**: Errors, destructive actions
- **Neutral**: No semantic meaning needed
- **Muted**: De-emphasized information
- **Disabled**: Inactive/unavailable

### Token Variation

Each semantic color has **6 tokens** for flexible, accessible usage:

#### Token Set

- `--[semantic]` — Base color (the actual hue at full intensity)
- `--[semantic]-foreground` — Text on solid base color (high contrast, for buttons)
- `--[semantic]-on-background` — Text on subtle background (high contrast, for alerts/badges)
- `--border-[semantic]` — Border matching context
- `--[semantic]-background` — Subtle tinted background (10% opacity style)
- `--[semantic]-hover` — Interactive hover state

#### Usage Patterns

**Solid backgrounds (buttons, badges):**

```tsx
className = "bg-primary text-primary-foreground";
```

→ Bright cyan background with white text

**Subtle backgrounds (alerts, info cards):**

```tsx
className = "bg-primary-background text-primary-on-background";
```

→ Light cyan background with dark cyan text

**Example — Primary Cyan**:

```css
/* Light mode */
--primary: oklch(45% 0.18 195); /* Base cyan */
--primary-foreground: oklch(98% 0.01 195); /* White text on cyan button */
--primary-on-background: oklch(30% 0.2 195); /* Dark cyan on light bg */
--border-primary: oklch(38% 0.19 195); /* Darker cyan border */
--primary-background: oklch(94% 0.07 195); /* Subtle cyan tint */
--primary-hover: oklch(50% 0.19 195); /* Brighter on hover */

/* Dark mode */
--primary: oklch(75% 0.18 195); /* Bright cyan */
--primary-foreground: oklch(8% 0.02 195); /* Dark text on cyan button */
--primary-on-background: oklch(88% 0.2 195); /* Bright cyan on dark bg */
--border-primary: oklch(88% 0.2 195); /* Glowing cyan border */
--primary-background: oklch(20% 0.1 195); /* Dark cyan tint */
--primary-hover: oklch(85% 0.2 195); /* Even brighter on hover */
```

**Contrast Compliance:**

- `*-foreground` tokens: ≥ 7:1 contrast on solid `*` backgrounds (WCAG AAA)
- `*-on-background` tokens: ≥ 4.5:1 contrast on `*-background` surfaces (WCAG AA)

---

## Surface Elevation

Four levels with progressive cyan tint (hue shifts from 200° → 192°):

| Level              | Light | Dark | Usage                     |
| ------------------ | ----- | ---- | ------------------------- |
| **0** (background) | 98%   | 12%  | Main canvas               |
| **1** (surface-1)  | 95%   | 15%  | Cards, primary containers |
| **2** (surface-2)  | 92%   | 18%  | Nested panels             |
| **3** (surface-3)  | 89%   | 21%  | Popovers, tooltips        |
| **4** (surface-4)  | 86%   | 24%  | Modals, dialogs           |

**Dark Mode**: Chroma increases with elevation (0.025 → 0.055) for "backlit" effect  
**Light Mode**: Chroma increases subtly (0.015 → 0.030)

---

## Typography

### Design Philosophy

**Dual Font Strategy:**

- **Roboto Mono** (headings, technical text): Monospaced for data density, technical precision, cyberpunk aesthetic
- **Inter** (body, UI): Optimized for extended reading, excellent legibility at all sizes

**Critical Principle: Semantic Structure ≠ Visual Style**

HTML headings (`<h1>`–`<h6>`) define **document structure and accessibility**. Typography utilities (`headline-1` through `headline-6`, `body-1`, `subtitle-1`, etc.) define **visual emphasis**. The two systems are coordinated by context, not forced to match.

**Golden Rules:**

1. Never pick a heading level for how it looks
2. Never pick a font size for what it means
3. Heading elements define document structure
4. Typography tokens define visual emphasis
5. Use utilities to override default heading styles when needed

**Scale & Hierarchy:**

- **Perfect Fourth (1.333)**: Primary heading scale for strong hierarchy
- **16px base**: Industry standard for optimal readability (1rem)
- **Negative tracking**: Large sizes get tighter letter-spacing for optical balance (-0.02em to -0.005em)
- **Generous line-height**: Body text at 1.6 (160%) for WCAG AA compliance and improved comprehension
- **Weight progression**: Light (300) on largest headings → Semi-bold (600) on smallest for visual consistency

**Accessibility First:**

- All contrast ratios meet WCAG AA minimum (4.5:1 for body text)
- Line-height never below 1.5 for body text (WCAG recommendation)
- Text remains readable when user overrides font-size
- Focus states highly visible with outline-offset

---

### HTML Heading Elements (Semantic Structure)

Base styles applied automatically to HTML elements. **Use these for document structure only.**

| Element   | Font Family | Size     | Weight | Line Height | Letter Spacing | Purpose                   |
| --------- | ----------- | -------- | ------ | ----------- | -------------- | ------------------------- |
| `<h1>`    | Roboto Mono | 3rem     | 300    | 1.1         | -0.02em        | Page title, hero          |
| `<h2>`    | Roboto Mono | 2.25rem  | 300    | 1.15        | -0.015em       | Major sections            |
| `<h3>`    | Roboto Mono | 1.75rem  | 400    | 1.2         | -0.01em        | Subsections               |
| `<h4>`    | Roboto Mono | 1.375rem | 400    | 1.25        | -0.005em       | Component titles          |
| `<h5>`    | Roboto Mono | 1.125rem | 500    | 1.3         | 0              | Small headers             |
| `<h6>`    | Roboto Mono | 1rem     | 600    | 1.35        | 0.005em        | Compact headers           |
| `<p>`     | Inter       | 1rem     | 400    | 1.6         | normal         | Body text (WCAG AA: 160%) |
| `<small>` | Inter       | 0.875rem | 400    | 1.5         | 0.01em         | Fine print (min readable) |

**Example - Proper Semantic Usage:**

```tsx
// Correct: H1 is the page title even if you want it smaller visually
<h1 className="headline-3">Dashboard Overview</h1>

// Correct: Visual hierarchy with utilities, semantic structure intact
<div>
  <h2 className="headline-4">Recent Tasks</h2>
  <h3 className="subtitle-1">Completed this week</h3>
</div>

// Wrong: Choosing H3 because you want the visual size
<h3>Page Title</h3> {/* Breaks document outline */}
```

---

### Typography Utility Classes (Visual Emphasis)

Use these classes to override default heading styles or apply heading-style typography to non-heading elements. **Use these for visual design, independent of semantic meaning.**

#### Headline Utilities (Roboto Mono)

| Class        | Size     | Weight | Line Height | Letter Spacing | Usage                        |
| ------------ | -------- | ------ | ----------- | -------------- | ---------------------------- |
| `headline-1` | 3rem     | 300    | 1.1         | -0.02em        | Hero text, largest emphasis  |
| `headline-2` | 2.25rem  | 300    | 1.15        | -0.015em       | Major visual sections        |
| `headline-3` | 1.75rem  | 400    | 1.2         | -0.01em        | Subsection emphasis          |
| `headline-4` | 1.375rem | 400    | 1.25        | -0.005em       | Card/component visual titles |
| `headline-5` | 1.125rem | 500    | 1.3         | 0              | Small emphasized text        |
| `headline-6` | 1rem     | 600    | 1.35        | 0.005em        | Compact emphasized text      |

#### Subtitle Utilities (Roboto Mono)

Technical/data-focused content with medium weight and generous tracking.

| Class        | Size     | Weight | Line Height | Letter Spacing | Usage                         |
| ------------ | -------- | ------ | ----------- | -------------- | ----------------------------- |
| `subtitle-1` | 1rem     | 500    | 1.5         | 0.01em         | Emphasized metadata, labels   |
| `subtitle-2` | 0.875rem | 500    | 1.5         | 0.015em        | Component subtitles, captions |

#### Body Utilities (Inter)

Optimized for readability with generous line-height.

| Class    | Size     | Weight | Line Height | Letter Spacing | Usage                       |
| -------- | -------- | ------ | ----------- | -------------- | --------------------------- |
| `body-1` | 1rem     | 400    | 1.6         | normal         | Primary content (WCAG AA)   |
| `body-2` | 0.875rem | 400    | 1.5         | 0.01em         | Secondary content, metadata |

#### UI Text Utilities

Specialized styles for interface elements.

| Class           | Size     | Weight | Line Height | Letter Spacing | Transform | Usage                |
| --------------- | -------- | ------ | ----------- | -------------- | --------- | -------------------- |
| `button-text`   | 0.875rem | 600    | 1           | 0.05em         | UPPERCASE | Buttons, CTAs        |
| `caption`       | 0.75rem  | 400    | 1.5         | 0.02em         | —         | Help text, footnotes |
| `overline-text` | 0.75rem  | 600    | 1.5         | 0.15em         | UPPERCASE | Section labels, tags |

#### Special Utilities

| Class          | Effect                         | Usage                         |
| -------------- | ------------------------------ | ----------------------------- |
| `monospace`    | Roboto Mono + tabular numbers  | Code, data, technical content |
| `tabular-nums` | Fixed-width number alignment   | Tables, financial data        |
| `balanced`     | Better multi-line distribution | Headings, short paragraphs    |

---

### Usage Examples

**Semantic HTML vs Visual Styling:**

```tsx
// Page with proper semantic structure but custom visual hierarchy
<main>
  {/* Semantic H1 but styled as headline-3 for visual balance */}
  <h1 className="headline-3">Project Dashboard</h1>

  {/* Semantic H2 but styled smaller for visual design */}
  <h2 className="subtitle-1 text-muted-foreground">Last updated 2 hours ago</h2>

  <section>
    {/* Semantic H3 but styled as headline-5 */}
    <h3 className="headline-5">Active Tasks</h3>

    {/* Not a heading, just emphasized text */}
    <div className="headline-6">23 tasks remaining</div>
  </section>
</main>
```

**Non-heading elements with heading styles:**

```tsx
// Stats card - no semantic heading needed, just visual emphasis
<div className="card">
  <div className="headline-2">$24.5K</div>
  <p className="caption">Total revenue</p>
</div>

// Button with proper text styling
<button className="button-text bg-primary text-primary-foreground">
  Create Task
</button>
```

**Technical content with monospace:**

```tsx
// Data table with aligned numbers
<td className="monospace tabular-nums">$1,234.56</td>

// Code snippet
<pre className="monospace text-sm">npm install react</pre>
```

---

## Spacing

| Token        | Value | Usage              |
| ------------ | ----- | ------------------ |
| **tight**    | 6px   | Micro-interactions |
| **compact**  | 12px  | Dense displays     |
| **standard** | 24px  | Default padding    |
| **section**  | 32px  | Large sections     |

---

## Border Radius

| Token          | Value | Usage              |
| -------------- | ----- | ------------------ |
| **radius-sm**  | 4px   | Small elements     |
| **radius-md**  | 6px   | Medium elements    |
| **radius-lg**  | 8px   | Standard (default) |
| **radius-xl**  | 12px  | Large containers   |
| **radius-2xl** | 16px  | Extra large        |
| **radius-3xl** | 20px  | Feature cards      |
| **radius-4xl** | 24px  | Hero sections      |

---

## Shadcn/UI Mapping

| Shadcn Token  | Maps To    | Purpose           |
| ------------- | ---------- | ----------------- |
| `card`        | surface-1  | Card containers   |
| `popover`     | background | Floating elements |
| `secondary`   | fuchsia    | Secondary buttons |
| `destructive` | warning    | Dangerous actions |
| `input`       | border     | Input borders     |
| `ring`        | primary    | Focus indicators  |

---

## Component Token Usage Examples

### Buttons

```tsx
// Primary button - solid cyan
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">

// Outlined primary button
<button className="border-2 border-primary text-primary-on-background bg-transparent">

// Ghost primary button
<button className="text-primary-on-background hover:bg-primary-background">
```

### Alerts

```tsx
// Success alert - subtle green background
<div className="bg-success-background text-success-on-background border border-success">

// Warning alert - solid coral (critical)
<div className="bg-warning text-warning-foreground">
```

### Badges

```tsx
// Accent badge - solid fuchsia
<span className="bg-accent text-accent-foreground">

// Neutral badge - subtle
<span className="bg-neutral-background text-neutral-on-background">
```

---

## Quick Reference

**Brand Hues**: Cyan 195° • Fuchsia 325°  
**Semantic Hues**: Teal 160° • Coral 10° • Steel 315° • Blue-Gray 240°  
**Neutral Hue**: Cool Blue 200°  
**Surface Hue Shift**: 200° → 192° (progressive cyan tint)

**Token Pattern**: Each semantic has 6 variants

- Base color, foreground (for solid), on-background (for subtle), border, background, hover

**Contrast Ratios**:

- Foreground tokens: ≥ 7:1 on solid backgrounds (WCAG AAA)
- On-background tokens: ≥ 4.5:1 on tinted backgrounds (WCAG AA)

**Dark Mode Glow**: Semantic borders at 80-88% lightness  
**Chart Colors**: Stay in cold spectrum (blues, purples, teals, coral accent)
