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

### Headings

| Style  | Size | Weight | Spacing  | Usage                           |
| ------ | ---- | ------ | -------- | ------------------------------- |
| **H1** | 48px | 700    | -0.02em  | Hero sections, Page title       |
| **H2** | 36px | 600    | -0.015em | Major sections                  |
| **H3** | 30px | 600    | -0.01em  | Subsections, Card titles        |
| **H4** | 24px | 600    | 0        | Other non-card component titles |
| **H5** | 20px | 600    | 0        | Small headers                   |
| **H6** | 18px | 600    | 0        | Compact headers                 |

### Body & UI

| Style          | Size | Weight | Spacing | Usage                |
| -------------- | ---- | ------ | ------- | -------------------- |
| **Subtitle 1** | 16px | 500    | 0.01em  | Emphasized secondary |
| **Subtitle 2** | 14px | 500    | 0.01em  | Component subtitles  |
| **Body 1**     | 16px | 400    | 0       | Main content         |
| **Body 2**     | 14px | 400    | 0       | Secondary content    |
| **Button**     | 14px | 600    | 0.04em  | Buttons, CTAs        |
| **Caption**    | 12px | 400    | 0.02em  | Captions, footnotes  |
| **Overline**   | 12px | 600    | 0.15em  | Labels (uppercase)   |

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
