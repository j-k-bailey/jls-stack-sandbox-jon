# JLS Stack Sandbox Design System

**Name**: JLS Stack Sandbox  
**Purpose**: Training playground for building stack-aligned apps quickly and correctly  
**Vibe**: Experimental, disciplined, modern, accessible  
**Color Story**: Electric cyan (195°) and hot fuchsia (325°) with OKLCH precision, inspired by cyberpunk

---

## Design System Architecture

This design system follows Tailwind 4 best practices with three distinct layers:

### **Layer 1: Primitives** (`--sandbox-primitive-{category}-{name}`)

Raw foundational values that never change:

- Color palettes (50-950 scales for all semantic colors)
- Spacing units (base = 0.25rem, scale = percentages)
- Border radius values (0, 1, 2, 3, 4, 6, full)
- Font families (heading, body, mono)

**Example:**

```css
--sandbox-primitive-color-cyan-500: oklch(65% 0.19 195);
--sandbox-primitive-space-4: 1rem; /* 400% of 0.25rem base */
--sandbox-primitive-radius-2: 4px;
```

### **Layer 2: Semantics** (`--{semantic-name}`)

Design decisions mapped to primitives:

- Color semantics (primary, accent, success, warning, etc.)
- Spacing tokens (inline, stack, section, layout, inset-\*)
- Radius tokens (interactive, nested, container, large, icon, full)
- Shadow levels, focus rings, surface elevation

**Example:**

```css
--primary: var(--sandbox-primitive-color-cyan-700);
--spacing-inset-lg: clamp(
  var(--sandbox-primitive-space-6),
  1.25rem + 1vw,
  var(--sandbox-primitive-space-8)
);
--radius-interactive: var(--sandbox-primitive-radius-2);
```

### **Layer 3: Components** (`@utility` declarations)

Composite utilities for common patterns:

- Typography utilities (headline-1 through -6, body-1/2, caption)
- Grid utilities (grid-basic, grid-extended, grid-wide)
- Interactive utilities (hit-target)

**Example:**

```css
@utility headline-1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  font-weight: 300;
  line-height: 1.1;
}
```

---

## Design Principles

1. **Intuitive** — Obvious choices, zero ambiguity
2. **Accessible** — WCAG AAA where possible, AA minimum
3. **Minimal** — Only what's needed, nothing more
4. **Consistent** — Same patterns everywhere
5. **Fluid** — Scales smoothly, respects user preferences
6. **Maintainable** — Change primitives → semantics update → components inherit

---

## Color Foundations

### Primitive Color Palettes

All semantic colors are built from complete 50-950 primitive palettes using OKLCH:

| Palette     | Hue | Usage Base                         |
| ----------- | --- | ---------------------------------- |
| **Cyan**    | 195 | Primary brand color, main CTAs     |
| **Fuchsia** | 325 | Accent brand color, highlights     |
| **Teal**    | 160 | Success states, confirmations      |
| **Coral**   | 10  | Warnings, errors, destructive      |
| **Steel**   | 315 | Neutral interactions, generic UI   |
| **Slate**   | 240 | Muted content, de-emphasized text  |
| **Gray**    | 220 | Base surfaces, foundation neutrals |

**Example Primitive Scale (Cyan):**

```css
--sandbox-primitive-color-cyan-50: oklch(98% 0.015 195); /* Lightest */
--sandbox-primitive-color-cyan-100: oklch(95% 0.045 195);
--sandbox-primitive-color-cyan-200: oklch(92% 0.08 195);
--sandbox-primitive-color-cyan-300: oklch(85% 0.15 195);
--sandbox-primitive-color-cyan-400: oklch(75% 0.18 195);
--sandbox-primitive-color-cyan-500: oklch(65% 0.19 195); /* Mid-tone */
--sandbox-primitive-color-cyan-600: oklch(55% 0.21 195);
--sandbox-primitive-color-cyan-700: oklch(42% 0.19 195); /* Dark mode base */
--sandbox-primitive-color-cyan-800: oklch(35% 0.2 195);
--sandbox-primitive-color-cyan-900: oklch(25% 0.21 195);
--sandbox-primitive-color-cyan-950: oklch(15% 0.15 195); /* Darkest */
```

### Brand Colors (Semantic Layer)

- **Primary — Electric Cyan (195°)**
  - Light: Built from `--sandbox-primitive-color-cyan-700`
  - Dark: Built from `--sandbox-primitive-color-cyan-400`
  - Usage: Main CTAs, key interactions, active states, primary links

- **Accent — Vaporwave Fuchsia (325°)**
  - Light: Built from `--sandbox-primitive-color-fuchsia-700`
  - Dark: Built from `--sandbox-primitive-color-fuchsia-400`
  - Usage: Badges, highlights, secondary CTAs, alternative emphasis

### Semantic Colors

- **Success — Matrix Teal (160°)**
  - Light: Built from `--sandbox-primitive-color-teal-700`
  - Dark: Built from `--sandbox-primitive-color-teal-400`
  - Usage: Confirmations, positive states, completed operations

- **Warning — Hot Coral (10°)**
  - Light: Built from `--sandbox-primitive-color-coral-700`
  - Dark: Built from `--sandbox-primitive-color-coral-400`
  - Usage: Errors, destructive actions, critical alerts

- **Neutral — Steel-Fuchsia (315°)**
  - Light: Built from `--sandbox-primitive-color-steel-300`
  - Dark: Built from `--sandbox-primitive-color-steel-800`
  - Usage: Generic interactive elements without semantic meaning

- **Muted — Blue-Gray (240°)**
  - Light: Built from `--sandbox-primitive-color-slate-200`
  - Dark: Built from `--sandbox-primitive-color-slate-900`
  - Usage: De-emphasized content, helper text, timestamps

- **Disabled — Ghosted (220°)**
  - Light: Built from `--sandbox-primitive-color-gray-200`
  - Dark: Built from `--sandbox-primitive-color-gray-900`
  - Usage: Inactive states, disabled components

### Neutrals

- **Background**: Main canvas
  - Light: `--sandbox-primitive-color-gray-50`
  - Dark: `oklch(12% 0.015 200)`

- **Foreground**: Primary text
  - Light: `oklch(18% 0.015 200)`
  - Dark: `--sandbox-primitive-color-gray-50`

- **Border**: Standard dividers
  - Light: `oklch(82% 0.018 200)`
  - Dark: `oklch(35% 0.03 200)`

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

### 6-Token Pattern

Each semantic color has **6 tokens** for flexible, accessible usage:

| Token                        | Purpose                   | Contrast        | Usage Example                |
| ---------------------------- | ------------------------- | --------------- | ---------------------------- |
| `--[semantic]`               | Base color                | —               | `bg-primary`                 |
| `--[semantic]-foreground`    | Text on solid background  | ≥7:1 (AAA)      | `text-primary-foreground`    |
| `--[semantic]-on-background` | Text on subtle background | ≥4.5:1 (AA)     | `text-primary-on-background` |
| `--border-[semantic]`        | Border matching context   | —               | `border-primary`             |
| `--[semantic]-background`    | Subtle tinted background  | —               | `bg-primary-background`      |
| `--[semantic]-hover`         | Interactive hover state   | +15-20% lighter | `hover:bg-primary-hover`     |

### Enhanced Hover States

**Philosophy:** Hover feedback must be obvious, not subtle.

**Light Mode:**

- Primary, Accent, Success, Warning: **+13-15% lightness**
- Neutral, Muted: **+5% lightness** (more subtle)

**Dark Mode:**

- Primary, Accent, Success, Warning: **+15-20% lightness** (with glow)
- Neutral, Muted: **+10% lightness**

**Example — Primary Cyan (Built from Primitives):**

```css
/* Light mode */
--primary: var(--sandbox-primitive-color-cyan-700); /* oklch(42% 0.19 195) */
--primary-hover: var(
  --sandbox-primitive-color-cyan-500
); /* oklch(65% 0.19 195) */

/* Dark mode */
--primary: var(--sandbox-primitive-color-cyan-400); /* oklch(75% 0.18 195) */
--primary-hover: var(
  --sandbox-primitive-color-cyan-200
); /* oklch(92% 0.08 195) */
```

**DO:**

- Use `hover:bg-*-hover` for all interactive backgrounds
- Ensure hover states are immediately obvious
- Test hover visibility in both light and dark modes
- Trust the primitive palettes for consistent contrast

**DON'T:**

- Create custom hover states with manual color adjustments
- Use subtle hover changes (under 10% lightness difference)
- Forget to test hover states in both themes
- Bypass primitives when defining new semantic colors

---

## Surface Elevation

Four levels with progressive cyan tint (hue shifts from 200° → 192°):

| Level              | Light | Dark | Chroma        | Usage                     |
| ------------------ | ----- | ---- | ------------- | ------------------------- |
| **0** (background) | 97%   | 12%  | 0.008 / 0.015 | Main canvas               |
| **1** (surface-1)  | 95%   | 16%  | 0.015 / 0.025 | Cards, primary containers |
| **2** (surface-2)  | 93%   | 20%  | 0.018 / 0.035 | Nested panels             |
| **3** (surface-3)  | 91%   | 24%  | 0.021 / 0.045 | Popovers, tooltips        |
| **4** (surface-4)  | 89%   | 28%  | 0.024 / 0.055 | Modals, dialogs           |

**Dark Mode**: Chroma increases with elevation (0.025 → 0.055) for "backlit" effect  
**Light Mode**: Chroma increases subtly (0.015 → 0.024)

**DO:**

- Use surface elevation for visual hierarchy
- Default to surface-1 for cards
- Use higher surfaces for overlays (modals, popovers)
- Prefer surface elevation over shadows

**DON'T:**

- Skip surface levels (e.g., background → surface-3)
- Use surfaces inconsistently for similar components
- Rely only on shadows for hierarchy

---

## Spacing System

**Philosophy:** Name tokens after WHAT they separate, not HOW BIG they are.

### Primitive Spacing Scale

Base unit: `0.25rem` (4px)  
Scale: Each number represents a percentage of the base unit

```css
--sandbox-primitive-space-0: 0;
--sandbox-primitive-space-1: 0.25rem; /* 100% = 4px */
--sandbox-primitive-space-2: 0.5rem; /* 200% = 8px */
--sandbox-primitive-space-3: 0.75rem; /* 300% = 12px */
--sandbox-primitive-space-4: 1rem; /* 400% = 16px */
--sandbox-primitive-space-6: 1.5rem; /* 600% = 24px */
--sandbox-primitive-space-8: 2rem; /* 800% = 32px */
--sandbox-primitive-space-12: 3rem; /* 1200% = 48px */
--sandbox-primitive-space-16: 4rem; /* 1600% = 64px */
```

### Semantic Spacing Tokens

Built from primitives using `clamp()` for fluid scaling:

**Flow Spacing** (gaps between elements):

| Token     | Formula                                              | Purpose               |
| --------- | ---------------------------------------------------- | --------------------- |
| `inline`  | `clamp(space-1, 0.2rem + 0.25vw, space-2)` → 4-6px   | Related inline items  |
| `stack`   | `clamp(space-2, 0.375rem + 0.5vw, space-3)` → 8-12px | Vertical content flow |
| `section` | `clamp(space-6, 1rem + 2vw, space-10)` → 24-40px     | Content blocks        |
| `layout`  | `clamp(space-8, 1.5rem + 2.5vw, space-12)` → 32-48px | Page structure        |

**Inset Spacing** (padding inside containers):

| Token       | Formula                                               | Purpose             |
| ----------- | ----------------------------------------------------- | ------------------- |
| `inset-xs`  | `clamp(space-1, 0.3125rem + 0.25vw, space-2)` → 6-8px | Minimal padding     |
| `inset-sm`  | `clamp(space-2, 0.375rem + 0.5vw, space-3)` → 8-12px  | Small containers    |
| `inset`     | `clamp(space-4, 0.75rem + 1vw, space-6)` → 16-24px    | Standard containers |
| `inset-lg`  | `clamp(space-6, 1.25rem + 1vw, space-8)` → 24-32px    | Generous padding    |
| `inset-xl`  | `clamp(space-8, 1.5rem + 2vw, space-12)` → 32-48px    | Large containers    |
| `inset-2xl` | `clamp(space-12, 2.5rem + 2vw, space-16)` → 48-64px   | Maximum padding     |

### Decision Tree

```txt
Q: What am I spacing?

FLOW (gaps between elements):
├─ Inline elements (buttons in group, icon+text)?
│  └─ Use: gap-inline
│
├─ Vertical content flow (label→input, paragraphs)?
│  └─ Use: space-y-stack / gap-stack
│
├─ Between content blocks (cards in grid)?
│  └─ Use: gap-section
│
└─ Page structure (header, main, footer)?
   └─ Use: gap-layout / space-y-layout

INSET (padding inside containers):
├─ Compact badge, tight table cell?
│  └─ Use: p-inset-sm
│
├─ Button, small card, tag?
│  └─ Use: p-inset
│
├─ Standard card, dialog, panel?
│  └─ Use: p-inset-lg (DEFAULT)
│
├─ Hero section, feature card?
│  └─ Use: p-inset-xl
│
└─ Full-page container, landing page?
   └─ Use: p-inset-2xl
```

### Accessibility: Hit Targets

**Philosophy:** All interactive elements must meet WCAG minimum touch/click target size.

| Token        | Value                                | Purpose                  |
| ------------ | ------------------------------------ | ------------------------ |
| `hit-target` | `--sandbox-primitive-space-6` (24px) | Minimum interactive area |

**Usage:**

The `hit-target` utility ensures all clickable/tappable elements are at least 24×24px, meeting WCAG 2.5.8 Level AA standards.

**DO:**

- Use `gap-inline` for button groups
- Use `space-y-stack` for form fields
- Use `p-inset` for button padding
- Use `p-inset-lg` for card padding (default)
- Use `hit-target` for all interactive elements
- Trust the fluid scaling — no manual breakpoints needed

**DON'T:**

- Use `stack` for padding (it's for flow, not inset)
- Use `inset` for gaps between cards (use `section`)
- Mix spacing tokens randomly
- Create custom spacing values outside the primitive scale
- Override clamp() values manually

---

## Border Radius

**Philosophy:** Semantic naming based on usage context, not arbitrary sizes.

### Primitive Radius Scale

```css
--sandbox-primitive-radius-0: 0;
--sandbox-primitive-radius-1: 2px;
--sandbox-primitive-radius-2: 4px;
--sandbox-primitive-radius-3: 6px;
--sandbox-primitive-radius-4: 8px;
--sandbox-primitive-radius-6: 12px;
--sandbox-primitive-radius-full: 9999px;
```

### Semantic Radius Tokens

| Token         | Primitive                             | Usage                              |
| ------------- | ------------------------------------- | ---------------------------------- |
| `interactive` | `--sandbox-primitive-radius-2` (4px)  | Buttons, inputs, small badges      |
| `nested`      | `--sandbox-primitive-radius-3` (6px)  | Elements inside rounded containers |
| `container`   | `--sandbox-primitive-radius-4` (8px)  | Cards, panels, dialogs (default)   |
| `large`       | `--sandbox-primitive-radius-6` (12px) | Hero cards, feature sections       |
| `icon`        | `--sandbox-primitive-radius-1` (2px)  | Icon backgrounds                   |
| `full`        | `--sandbox-primitive-radius-full`     | Pills, badges, tags                |

### Decision Tree for Rounding

```txt
Q: What am I rounding?

├─ Button, input, small badge?
│  └─ Use: rounded-interactive (4px)
│
├─ Element nested inside another rounded container?
│  └─ Use: rounded-nested (6px)
│
├─ Standard card, panel, dialog?
│  └─ Use: rounded-container (8px) ← DEFAULT
│
├─ Large hero or feature area?
│  └─ Use: rounded-large (12px)
│
├─ Icon with background?
│  └─ Use: rounded-icon (2px)
│
└─ Pill or badge shape?
   └─ Use: rounded-full
```

**DO:**

- Use semantic tokens (rounded-interactive, rounded-container)
- Use smaller radius inside larger (8px card → 6px button)
- Use consistent radius for same element types
- Reference primitives when creating new semantic tokens

**DON'T:**

- Use radius when element touches parent edge
- Mix different radius sizes for similar elements
- Use arbitrary radius values (e.g., `rounded-[10px]`)
- Bypass semantic layer — use rounded-interactive, not rounded-[4px]

---

## Typography

### Design Philosophy

**Dual Font Strategy:**

- **Josefin Sans** (headings): Geometric sans-serif, modern aesthetic
- **Inter** (body, UI): Optimized for readability, excellent at all sizes

**Component-Level Utilities:**
All typography is defined as `@utility` declarations that can be overridden with Tailwind classes via `cn()`.

**Critical Principle:** Semantic Structure ≠ Visual Style

- HTML headings (`<h1>`–`<h6>`) define **document structure and accessibility**
- Typography utilities (`headline-1`–`headline-6`, `body-1`, etc.) define **visual emphasis**
- The two systems are coordinated by context, not forced to match

**Golden Rules:**

1. Never pick a heading level for how it looks
2. Never pick a font size for what it means
3. Heading elements define document structure
4. Typography tokens define visual emphasis
5. Use utilities to override default heading styles when needed

### Fluid Typography Scale

| Utility         | Min (Mobile) | Max (Desktop) | Weight | Line Height | Letter Spacing |
| --------------- | ------------ | ------------- | ------ | ----------- | -------------- |
| `headline-1`    | 32px (2rem)  | 48px (3rem)   | 300    | 1.1         | -0.02em        |
| `headline-2`    | 24px         | 36px          | 300    | 1.15        | -0.015em       |
| `headline-3`    | 20px         | 28px          | 400    | 1.2         | -0.01em        |
| `headline-4`    | 18px         | 22px          | 400    | 1.25        | -0.005em       |
| `headline-5`    | 16px         | 18px          | 500    | 1.3         | 0              |
| `headline-6`    | 14px         | 16px          | 500    | 1.35        | 0.005em        |
| `subtitle-1`    | 14px         | 16px          | 500    | 1.5         | 0.01em         |
| `subtitle-2`    | 13px         | 14px          | 500    | 1.5         | 0.015em        |
| `body-1`        | 14px         | 16px          | 400    | 1.6         | normal         |
| `body-2`        | 13px         | 14px          | 400    | 1.5         | 0.01em         |
| `button-text`   | 13px         | 14px          | 600    | 1           | 0.05em         |
| `caption`       | 12px         | 13px          | 400    | 1.5         | 0.02em         |
| `overline-text` | 12px         | 13px          | 500    | 1.5         | 0.15em         |

**DO:**

- Use semantic HTML headings for document structure
- Use typography utilities for visual styling
- Override with Tailwind classes when needed: `cn("headline-1", "text-sm")`
- Let fluid typography scale naturally — no manual breakpoints
- Trust the component utilities defined in `@utility`

**DON'T:**

- Choose `<h3>` because you want that visual size
- Add manual responsive classes to typography
- Create custom font sizes outside the system
- Use fixed pixel values for type

---

## Shadow System

**Philosophy:** Minimize shadow use. Prefer surface elevation for hierarchy. Reserve shadows for floating elements.

### The Five-Level System

| Token             | Offset | Blur    | Usage                                        |
| ----------------- | ------ | ------- | -------------------------------------------- |
| `none`            | —      | —       | **Default** (use surface colors)             |
| `low`             | 0 1px  | 2px     | Subtle card lift (optional)                  |
| `medium`          | 0 4px  | 6px     | Dropdowns, sticky elements, popovers         |
| `high`            | 0 20px | 25px    | Modals, dialogs, high-priority overlays      |
| `glow-{semantic}` | 0 0    | 20-40px | Hero CTAs, primary buttons (semantic colors) |

### Semantic Glow Shadows

Built from primitive color palettes:

- `shadow-glow-primary` — Electric cyan glow (cyan-400/cyan-700)
- `shadow-glow-accent` — Vaporwave fuchsia glow (fuchsia-400/fuchsia-700)
- `shadow-glow-success` — Matrix teal glow (teal-400/teal-700)
- `shadow-glow-warning` — Hot coral glow (coral-400/coral-700)

**DO:**

- Default to NO shadow (use `bg-surface-1`, `bg-surface-2`, etc.)
- Use `shadow-low` for subtle card lift (if needed)
- Use semantic glows sparingly for hero moments
- Prefer surface elevation over shadows for hierarchy

**DON'T:**

- Add shadows to every card (creates visual noise)
- Use shadows inside panels (use surface elevation)
- Combine multiple shadow levels on same element

---

## Focus States

**Philosophy:** Keyboard navigation must be highly visible. Focus indicators are non-negotiable for accessibility.

### Focus Ring Specification

- **Width:** 3px (thick for maximum visibility)
- **Color:** Bright cyan (built from `--sandbox-primitive-color-cyan-400` / `cyan-300`)
- **Offset:** 2px (clear separation from element)
- **Visibility:** Keyboard-only (not on mouse click)
- **Contrast:** WCAG AAA compliant in both themes

**Automatic Application:**

Focus rings are automatically applied to all interactive elements via `:focus-visible`.

**DO:**

- Use automatic focus rings on all interactive elements
- Ensure 3px width for visibility
- Maintain 2px offset from elements
- Test keyboard navigation in both themes

**DON'T:**

- Remove focus indicators (ever)
- Use low-contrast focus colors
- Reduce ring width below 3px
- Show focus ring on mouse click

---

## Grid System

**Philosophy:** Fluid grid that scales with spacing system. Grid gap aligns with `spacing-section`.

### Component-Level Grid Utilities

| Grid        | Columns | Max Width | Gap           | Usage                                |
| ----------- | ------- | --------- | ------------- | ------------------------------------ |
| `basic`     | 12      | 1440px    | `gap-section` | Main content (default)               |
| `extended`  | 14      | 1600px    | `gap-section` | Stretched containers                 |
| `wide`      | 16      | 1920px    | `gap-section` | With persistent sidebar              |
| `fullbleed` | 1       | 100vw     | —             | Hero backgrounds (immersive moments) |

### Responsive Behavior

- **Desktop (≥640px):** Uses full column count
- **Mobile (<640px):** All grids collapse to **6 columns**

**DO:**

- Use `grid-basic` for main content (default)
- Use grid utilities as base, override with Tailwind: `cn("grid-wide", "gap-8")`
- Let gap scale with `spacing-section`
- Trust component utilities for consistent layouts

**DON'T:**

- Scale elements beyond 1920px max width
- Use different grids on same page level
- Break grid alignment for decoration
- Create custom grid utilities (use Tailwind classes to override)

---

## Z-Index System

**Philosophy:** Z-index values align with surface elevation levels.

| Level | Z-Index | Surface    | Usage                                |
| ----- | ------- | ---------- | ------------------------------------ |
| `0`   | `0`     | background | Default page content                 |
| `1`   | `10`    | surface-1  | Cards, primary containers            |
| `2`   | `20`    | surface-2  | Nested panels, elevated cards        |
| `3`   | `30`    | surface-3  | Dropdowns, popovers, tooltips        |
| `4`   | `40`    | surface-4  | Modals, dialogs                      |
| `5`   | `50`    | —          | Toast notifications, critical alerts |

**DO:**

- Match z-index to surface level
- Use next higher level for nested elements
- Keep z-index jumps consistent (increments of 10)
- Reserve z-50 for temporary, critical overlays only

**DON'T:**

- Use arbitrary z-index values (e.g., `z-[999]`)
- Skip z-index levels
- Create z-index values above 50

---

## Quick Reference

### Three-Layer System

1. **Primitives** (`--sandbox-primitive-*`) → Raw values, never change
2. **Semantics** (`--{name}`) → Design decisions mapped to primitives
3. **Components** (`@utility`) → Composite utilities, overridable via `cn()`

### Color Hues

- **Brand:** Cyan 195° • Fuchsia 325°
- **Semantic:** Teal 160° • Coral 10° • Steel 315° • Slate 240°
- **Neutral:** Gray 220°
- **Surface Shift:** 200° → 192° (progressive cyan tint)

### Token Patterns

- **Colors:** Full 50-950 palettes → 6 semantic tokens each
- **Spacing:** Primitive scale (1-24) → 10 semantic tokens (4 flow + 6 inset)
- **Radius:** Primitive scale (0-full) → 6 semantic tokens
- **Shadows:** 5 levels (none, low, medium, high, glow-\*)
- **Grid:** 4 component utilities (basic, extended, wide, fullbleed)
- **Typography:** 13 component utilities (headlines, subtitles, body, UI)

### Contrast Requirements

- **Foreground tokens:** ≥7:1 on solid backgrounds (WCAG AAA)
- **On-background tokens:** ≥4.5:1 on tinted backgrounds (WCAG AA)
- **Focus rings:** ≥7:1 contrast in both themes (WCAG AAA)

### Tailwind Merge Support

All component utilities properly conflict with standard Tailwind classes:

- Typography utilities conflict with font-size, font-weight, etc.
- Grid utilities conflict with display, grid-template-columns, gap, padding
- Spacing utilities conflict with gap/padding classes
- Radius utilities conflict with rounded classes

**Example:**

```typescript
cn("headline-1", "text-sm"); // text-sm wins
cn("grid-wide", "px-12"); // px-12 overrides grid padding
cn("p-inset-lg", "pt-2"); // pt-2 overrides top padding only
```

---

## Accessibility Checklist

- [ ] All text meets WCAG AA contrast (4.5:1 minimum)
- [ ] Focus indicators visible on all interactive elements
- [ ] Focus ring width ≥3px with high contrast
- [ ] Typography respects user font-size preferences
- [ ] Touch targets ≥24x24px (use `hit-target` utility)
- [ ] Keyboard navigation works everywhere
- [ ] No content loss with 200% zoom
- [ ] Screen readers announce semantic structure correctly
- [ ] Color is not the only indicator of state
- [ ] Prefer surface elevation over shadows for hierarchy
