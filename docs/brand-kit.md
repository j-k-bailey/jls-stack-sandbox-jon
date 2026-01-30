# JLS Stack Sandbox Design System

**Name**: JLS Stack Sandbox  
**Purpose**: Training playground for building stack-aligned apps quickly and correctly
**Vibe**: Experimental, disciplined, modern, accessible  
**Color Story**: Electric cyan (195°) and hot fuchsia (325°) with OKLCH precision, inspired by cyberpunk

---

## Design Principles

1. **Intuitive** — Obvious choices, zero ambiguity
2. **Accessible** — WCAG AAA where possible, AA minimum
3. **Minimal** — Only what's needed, nothing more
4. **Consistent** — Same patterns everywhere
5. **Fluid** — Scales smoothly, respects user preferences

---

## Color Foundations

### Brand Colors

- **Primary — Electric Cyan (195°)**
  - Light: `oklch(42% 0.19 195)`
  - Dark: `oklch(75% 0.18 195)`
  - Usage: Main CTAs, key interactions, active states, primary links

- **Accent — Vaporwave Fuchsia (325°)**
  - Light: `oklch(48% 0.23 325)`
  - Dark: `oklch(72% 0.25 325)`
  - Usage: Badges, highlights, secondary CTAs, alternative emphasis

### Semantic Colors

- **Success — Matrix Teal (160°)**
  - Light: `oklch(45% 0.17 160)`
  - Dark: `oklch(72% 0.19 160)`
  - Usage: Confirmations, positive states, completed operations

- **Warning — Hot Coral (10°)**
  - Light: `oklch(48% 0.21 10)`
  - Dark: `oklch(68% 0.23 10)`
  - Usage: Errors, destructive actions, critical alerts

- **Neutral — Steel-Fuchsia (315°)**
  - Light: `oklch(87% 0.018 315)`
  - Dark: `oklch(28% 0.022 315)`
  - Usage: Generic interactive elements without semantic meaning

- **Muted — Blue-Gray (240°)**
  - Light: `oklch(89% 0.012 240)`
  - Dark: `oklch(26% 0.02 240)`
  - Usage: De-emphasized content, helper text, timestamps

- **Disabled — Ghosted (220°)**
  - Light: `oklch(91% 0.004 220)`
  - Dark: `oklch(20% 0.004 220)`
  - Usage: Inactive states, disabled components

### Neutrals

- **Background**: Main canvas
  - Light: `oklch(97% 0.008 200)`
  - Dark: `oklch(12% 0.015 200)`

- **Foreground**: Primary text
  - Light: `oklch(18% 0.015 200)`
  - Dark: `oklch(95% 0.01 200)`

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

- Primary, Accent, Success, Warning: **+15-17% lightness** (with glow)
- Neutral, Muted: **+10% lightness**

**Example — Primary Cyan:**

```css
/* Light mode */
--primary: oklch(42% 0.19 195);
--primary-hover: oklch(55% 0.21 195);

/* Dark mode */
--primary: oklch(75% 0.18 195);
--primary-hover: oklch(92% 0.23 195);
```

**DO:**

- Use `hover:bg-*-hover` for all interactive backgrounds
- Ensure hover states are immediately obvious
- Test hover visibility in both light and dark modes

**DON'T:**

- Create custom hover states with manual color adjustments
- Use subtle hover changes (under 10% lightness difference)
- Forget to test hover states in both themes

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

## Z-Index System

**Philosophy:** Z-index values align with surface elevation levels. Higher surfaces get higher z-index values to maintain consistent layering.

### The Six-Level System

| Level | Z-Index | Surface    | Usage                                |
| ----- | ------- | ---------- | ------------------------------------ |
| `0`   | `0`     | background | Default page content, main canvas    |
| `1`   | `10`    | surface-1  | Cards, primary containers            |
| `2`   | `20`    | surface-2  | Nested panels, elevated cards        |
| `3`   | `30`    | surface-3  | Dropdowns, popovers, tooltips        |
| `4`   | `40`    | surface-4  | Modals, dialogs, command palettes    |
| `5`   | `50`    | —          | Toast notifications, critical alerts |

**DO:**

- Match z-index to surface level (surface-3 → z-surface-3)
- Use next higher level for elements nested inside (popover uses surface-3, input inside uses surface-4 background)
- Keep z-index jumps consistent (increments of 10)
- Reserve z-toast (50) for temporary, critical overlays only

**DON'T:**

- Use arbitrary z-index values (e.g., `z-[999]`)
- Skip z-index levels (e.g., base → surface-3)
- Use z-index without corresponding surface elevation
- Create z-index values above 50 (toast is the ceiling)

---

## Typography

### Design Philosophy

**Dual Font Strategy:**

- **Josefin Sans** (headings): Geometric sans-serif, modern aesthetic
- **Inter** (body, UI): Optimized for readability, excellent at all sizes

**Fluid Typography:**
All type sizes use `clamp()` to scale smoothly between mobile and desktop—no breakpoints needed.

**Critical Principle: Semantic Structure ≠ Visual Style**

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

| Utility         | Min (Mobile) | Max (Desktop) | Weight | Usage                      |
| --------------- | ------------ | ------------- | ------ | -------------------------- |
| `headline-1`    | 32px (2rem)  | 48px (3rem)   | 300    | Hero text, page titles     |
| `headline-2`    | 24px         | 36px          | 300    | Major sections             |
| `headline-3`    | 20px         | 28px          | 400    | Subsections                |
| `headline-4`    | 18px         | 22px          | 400    | Component titles           |
| `headline-5`    | 16px         | 18px          | 500    | Small headers              |
| `headline-6`    | 14px         | 16px          | 500    | Compact headers            |
| `subtitle-1`    | 14px         | 16px          | 500    | Emphasized metadata        |
| `subtitle-2`    | 13px         | 14px          | 500    | Component subtitles        |
| `body-1`        | 14px         | 16px          | 400    | Primary content            |
| `body-2`        | 13px         | 14px          | 400    | Secondary content          |
| `button-text`   | 13px         | 14px          | 600    | Buttons, CTAs (uppercase)  |
| `caption`       | 12px         | 13px          | 400    | Help text, footnotes       |
| `overline-text` | 12px         | 13px          | 500    | Section labels (uppercase) |

**DO:**

- Use semantic HTML headings for document structure
- Use typography utilities for visual styling
- Override heading styles with utilities when needed
- Use `whitespace-nowrap` for values that shouldn't wrap (stats, numbers)
- Let fluid typography scale naturally—no manual breakpoints

**DON'T:**

- Choose `<h3>` because you want that visual size
- Add manual responsive classes to typography
- Create custom font sizes outside the system
- Use fixed pixel values for type

---

## Spacing System

**Philosophy:** Name tokens after WHAT they separate, not HOW BIG they are.

### The Ten-Token System

**Flow Spacing** (gaps between elements):

| Token     | Size (Mobile → Desktop) | Purpose               | When to Use                               |
| --------- | ----------------------- | --------------------- | ----------------------------------------- |
| `inline`  | 4px → 6px               | Related inline items  | Buttons in group, icon + text, tags       |
| `stack`   | 8px → 12px              | Vertical content flow | Label → input, heading → body, paragraphs |
| `section` | 24px → 40px             | Content blocks        | Between cards, major sections             |
| `layout`  | 32px → 48px             | Page structure        | Header, main, footer                      |

**Inset Spacing** (padding inside containers):

| Token       | Size (Mobile → Desktop) | Purpose                       | When to Use                       |
| ----------- | ----------------------- | ----------------------------- | --------------------------------- |
| `inset-xs`  | 6px → 8px               | Minimal container padding     | Compact badges, tight table cells |
| `inset-sm`  | 8px → 12px              | Small container padding       | Buttons, small cards, tags        |
| `inset`     | 16px → 24px             | Standard container padding    | Cards, dialogs, panels (default)  |
| `inset-lg`  | 24px → 32px             | Generous container padding    | Hero sections, feature cards      |
| `inset-xl`  | 32px → 48px             | Maximum container padding     | Large immersive containers        |
| `inset-2xl` | 48px → 64px             | Exceptional container padding | Full-page containers, landing     |

### Decision Tree

```
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
├─ Large immersive container?
│  └─ Use: p-inset-2xl
│
└─ Full-page container, landing page?
   └─ Use: p-inset-3xl
```

### Accessibility: Hit Targets

**Philosophy:** All interactive elements must meet WCAG minimum touch/click target size.

| Token        | Value | Purpose                  |
| ------------ | ----- | ------------------------ |
| `hit-target` | 24px  | Minimum interactive area |

**Usage:**

The `hit-target` utility ensures all clickable/tappable elements are at least 24×24px, meeting WCAG 2.5.8 Level AA standards for target size. This is particularly important for:

- Icon-only buttons
- Close buttons (×)
- Toggle switches
- Checkbox/radio controls
- Small interactive badges
- Mobile touch interfaces

**DO:**

- Use `gap-inline` for button groups
- Use `space-y-stack` for form fields
- Use `p-inset` for button padding
- Use `p-inset-lg` for card padding (default)
- Use `gap-section` for grid of cards
- Use `py-layout` for page-level spacing
- Use `hit-target` for all interactive elements to ensure minimum of 24 x 24px

**DON'T:**

- Use `stack` for padding (it's for flow, not inset)
- Use `inset` for gaps between cards (use `section`)
- Use flow tokens (`inline`, `stack`) as inset padding
- Use inset tokens (`inset-*`) as gaps/margins
- Mix spacing tokens randomly
- Create custom spacing values outside the system

---

## Border Radius

**Philosophy:** Semantic naming based on usage context, not arbitrary sizes.

### The Six-Token System

| Token         | Size   | Usage                              | Examples                         |
| ------------- | ------ | ---------------------------------- | -------------------------------- |
| `interactive` | 4px    | Small interactive elements         | Buttons, inputs, small badges    |
| `nested`      | 6px    | Elements inside rounded containers | Buttons inside cards             |
| `container`   | 8px    | Standard containers                | Cards, panels, dialogs (default) |
| `large`       | 12px   | Large feature areas                | Hero cards, feature sections     |
| `icon`        | 2px    | Icon backgrounds                   | Icon buttons (when feasible)     |
| `full`        | 9999px | Pill shapes                        | Pills, badges, tags              |

### Decision Tree

```
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

- Use `rounded-interactive` for all buttons and inputs
- Use `rounded-nested` for elements inside cards
- Use `rounded-container` as default for cards
- Use smaller radius inside larger (8px card → 6px button)
- Use consistent radius for same element types

**DON'T:**

- Use radius when element touches parent edge
- Use radius when element touches viewport edge
- Mix different radius sizes for similar elements
- Use arbitrary radius values (e.g., `rounded-[10px]`)

---

## Border Width

**Philosophy:** Two widths only—standard and emphasis.

| Token      | Size | Tailwind Utility | Usage                                       |
| ---------- | ---- | ---------------- | ------------------------------------------- |
| `default`  | 1px  | `border`         | Standard borders, dividers, inputs          |
| `emphasis` | 2px  | `border-2`       | Featured cards, active states, primary CTAs |

**Pragmatic Note:** While we define semantic tokens (`--border-width-default`, `--border-width-emphasis`), we use Tailwind's standard utilities (`border`, `border-2`) to avoid class naming conflicts. This is more maintainable than custom utilities.

**DO:**

- Use `border` (1px) for standard borders
- Use `border-2` (2px) for featured or active states
- Use borders to define boundaries
- Prefer surface elevation over borders for hierarchy
- Use `border-color-{semantic}` utilities for colors

**DON'T:**

- Create borders thicker than 2px
- Use borders for purely decorative purposes
- Mix 1px and 2px borders on same component
- Try to create custom border-width utilities (causes conflicts)

---

## Shadow System

**Philosophy:** Minimize shadow use. Prefer surface elevation for hierarchy. Reserve shadows for floating elements and high-priority overlays.

### The Five-Level System

| Token             | Offset | Blur    | Usage                                        |
| ----------------- | ------ | ------- | -------------------------------------------- |
| `none`            | —      | —       | **Default** (use surface colors)             |
| `low`             | 0 1px  | 2px     | Subtle card lift (optional)                  |
| `medium`          | 0 4px  | 6px     | Dropdowns, sticky elements, popovers         |
| `high`            | 0 20px | 25px    | Modals, dialogs, high-priority overlays      |
| `glow-{semantic}` | 0 0    | 20-40px | Hero CTAs, primary buttons (semantic colors) |

### Semantic Glow Shadows

Special shadows that use brand colors for emphasis:

- `shadow-glow-primary` — Electric cyan glow
- `shadow-glow-accent` — Vaporwave fuchsia glow
- `shadow-glow-success` — Matrix teal glow
- `shadow-glow-warning` — Hot coral glow

**DO:**

- Default to NO shadow (use `bg-surface-1`, `bg-surface-2`, etc.)
- Use `shadow-low` for subtle card lift (if needed)
- Use `shadow-medium` for dropdowns and sticky elements
- Use `shadow-high` for modals and critical overlays
- Use semantic glows sparingly for hero moments
- Prefer surface elevation over shadows for hierarchy

**DON'T:**

- Add shadows to every card (creates visual noise)
- Use shadows inside panels (use surface elevation)
- Combine multiple shadow levels on same element
- Use shadows as primary hierarchy method

---

## Focus States

**Philosophy:** Keyboard navigation must be highly visible. Focus indicators are non-negotiable for accessibility.

### Focus Ring Specification

- **Width:** 3px (thick for maximum visibility)
- **Color:** Bright cyan (`oklch(75% 0.19 195)` light / `oklch(88% 0.22 195)` dark)
- **Offset:** 2px (clear separation from element)
- **Visibility:** Keyboard-only (not on mouse click)
- **Contrast:** WCAG AAA compliant in both themes

**DO:**

- Use automatic focus rings on all interactive elements
- Ensure 3px width for visibility
- Maintain 2px offset from elements
- Test keyboard navigation in both themes
- Respect element's border radius

**DON'T:**

- Remove focus indicators (ever)
- Use low-contrast focus colors
- Reduce ring width below 3px
- Show focus ring on mouse click

**Automatic Application:**

Focus rings are automatically applied to:

- `a:focus-visible`
- `button:focus-visible`
- `input:focus-visible`
- `textarea:focus-visible`
- `select:focus-visible`
- `[tabindex]:focus-visible`

---

## Grid System

**Philosophy:** Fluid grid that scales with spacing system. Grid gap aligns with `spacing-section` for visual rhythm.

### The Four-Grid System

| Grid        | Columns | Max Width | Usage                                  |
| ----------- | ------- | --------- | -------------------------------------- |
| `basic`     | 12      | 1440px    | Main content (default)                 |
| `extended`  | 14      | 1600px    | Stretched containers, immersive images |
| `wide`      | 16      | 1920px    | With persistent sidebar/navigation     |
| `fullbleed` | 1       | 100vw     | Hero backgrounds (immersive moments)   |

**Grid Gap:** Aligned with `spacing-section` (24px → 40px fluid)

### Responsive Behavior

- **Desktop (≥640px):** Uses full column count
- **Mobile (<640px):** All grids collapse to **6 columns**

### Decision Tree

```
Q: What kind of layout?

├─ Main content area?
│  └─ Use: grid-basic (12 col)
│
├─ Immersive image moment?
│  └─ Use: grid-extended (14 col)
│
├─ Interactive part of app with persistent sidebar?
│  └─ Use: grid-wide (16 col)
│
└─ Hero background only?
   └─ Use: grid-fullbleed
```

**DO:**

- Use `grid-basic` for main content (default)
- Align left-edge of text to same vertical line
- Use `grid-extended` for stretched containers
- Use `grid-wide` for apps with sidebar
- Use `grid-fullbleed` only for backgrounds
- Let gap scale with `spacing-section`

**DON'T:**

- Scale elements beyond 1920px max width
- Use different grids on same page level
- Break grid alignment for decoration
- Use custom gap values (use `gap-section`)

---

## Quick Reference

### Color Hues

- **Brand:** Cyan 195° • Fuchsia 325°
- **Semantic:** Teal 160° • Coral 10° • Steel 315° • Blue-Gray 240°
- **Neutral:** Cool Blue 200°
- **Surface Shift:** 200° → 192° (progressive cyan tint)

### Token Patterns

- **Colors:** 6 tokens per semantic (base, foreground, on-background, border, background, hover)
- **Flow Spacing:** 4 tokens (inline, stack, section, layout)
- **Inset Spacing:** 6 tokens (inset-sm, inset, inset-lg, inset-xl, inset-2xl, inset-3xl)
- **Radius:** 6 tokens (interactive, nested, container, large, icon, full)
- **Shadows:** 5 levels (none, low, medium, high, glow-\*)
- **Grid:** 4 variants (basic, extended, wide, fullbleed)

### Contrast Requirements

- **Foreground tokens:** ≥7:1 on solid backgrounds (WCAG AAA)
- **On-background tokens:** ≥4.5:1 on tinted backgrounds (WCAG AA)
- **Focus rings:** ≥7:1 contrast in both themes (WCAG AAA)

### Dark Mode

- **Semantic borders:** 80-88% lightness (glow effect)
- **Surface elevation:** Increasing chroma (0.025 → 0.055)
- **Hover states:** +15-17% lightness with enhanced glow

### Typography

- **Fluid scaling:** All sizes use `clamp()` (no breakpoints)
- **Scale range:** 32px → 48px (headline-1) down to 12px → 13px (caption)
- **Line heights:** 1.1 (large headings) to 1.6 (body text)

---

## Accessibility Checklist

- [ ] All text meets WCAG AA contrast (4.5:1 minimum)
- [ ] Focus indicators visible on all interactive elements
- [ ] Focus ring width ≥3px with high contrast
- [ ] Typography respects user font-size preferences
- [ ] Touch targets ≥44x44px
- [ ] Keyboard navigation works everywhere
- [ ] No content loss with 200% zoom
- [ ] Screen readers announce semantic structure correctly
- [ ] Color is not the only indicator of state
