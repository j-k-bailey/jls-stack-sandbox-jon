# JLS Stack Sandbox Design System

## Identity

**Name**: JLS Stack Sandbox
**Purpose**: A training playground to learn how to build stack-aligned apps quickly and correctly the JLS way
**Vibe**: experimental, disciplined, modern
**Visual Philosophy**: Monochromatic cold neutrals with pops of cyan

### Design Philosophy

**Contrast:** High contrast between elements and their foregrounds, with strategic use of colored text for visual interest  
**Elevation:** Six distinct surface heights create clear visual hierarchy through subtle lightness shifts  
**Color Space:** OKLCH for perceptually uniform colors and smooth gradients across light/dark modes

---

## Surface Height System

The design system uses a **six-level surface elevation system** to create depth and hierarchy:

- **Level 0 (`background`)**: Deepest level - the main application canvas
- **Level 1 (`surface-1` / `card`)**: First elevation - cards resting on background
- **Level 2 (`surface-2`)**: Second elevation - nested cards, elevated panels
- **Level 3 (`surface-3` / `popover`)**: Third elevation - dropdowns, popovers, tooltips
- **Level 4 (`surface-4`)**: Fourth elevation - modals, dialogs
- **Level 5 (`surface-5`)**: Fifth elevation - interactive element backgrounds at rest
- **Level 6 (`surface-6`)**: Highest elevation - hover/active states

**Usage Guidelines:**

- Each level should be visually distinct from adjacent levels
- Higher elevations appear "closer" to the user
- Use appropriate elevation for component hierarchy (modals over cards over background)
- Interactive states (hover/active) use higher surface levels
- Surfaces avoid pure white/black, maintaining the lunar/spacey aesthetic

---

## Semantic Color Categories

### Core Semantics

Each semantic category provides three tokens for comprehensive styling:

- **Base (`--[semantic]`)**: Primary color for the semantic meaning
- **Foreground (`--[semantic]-foreground`)**: High-contrast text/icons on base color
- **Border (`--border-[semantic]`)**: Border color matching semantic context

Available semantic categories:

- **Primary**: Brand identity, main CTAs, key interactive elements
- **Destructive**: Dangerous actions, deletions, critical warnings (vibrant, urgent red)
- **Success**: Positive confirmation, successful operations
- **Error**: Error states, validation failures, system errors (deeper, cooler red)
- **Warning**: Caution, non-critical alerts
- **Info**: Informational messages, helpful tips
- **Muted**: Subtle, secondary, disabled states
- **Accent**: Alternative highlights, badges, secondary CTAs
- **Link**: Hyperlinks and text links

### Surface & Layout

- **Background**: Main application canvas
- **Surface 1-6**: Elevation levels for layered UI
- **Card**: Primary card container (maps to surface-1)
- **Popover**: Floating UI elements (maps to surface-3)
- **Secondary**: Alternative backgrounds for variety

### Interactive Elements

- **Input**: Form field borders and backgrounds
- **Ring**: Focus indicators (keyboard navigation)
- **Border**: Standard borders and dividers

### Code Display Elements

- **Code Background**: Background for code blocks
- **Code Text**: Syntax-highlighted text color
- **Code Border**: Code block borders

### Navigation

- **Sidebar**: Navigation panel background
- **Sidebar Primary**: Active/selected navigation items
- **Sidebar Accent**: Hover states in navigation

### Overlay & States

- **Overlay**: Semi-transparent backdrop for modals
- **Disabled**: Fully disabled state styling
- **Focus Visible**: Keyboard-only focus indicators

### Data Visualization

- **Chart 1-5**: Consistent colors for graphs and charts (cold futuristic palette)

---

## Complete Token Reference

### Foundation

#### **radius**

- **Light**: `0.5rem`
- **Dark**: `0.5rem`
- **Usage**: Base border radius for all rounded elements
- **Classes**: `rounded-lg`, `rounded-md`, `rounded-sm`

---

### Neutrals & Surfaces

#### **background**

- **Light**: `oklch(93% 0.003 255)` (cool lunar gray, not pure white)
- **Dark**: `oklch(17% 0.003 255)` (deep space gray, not pure black)
- **Usage**: Main application canvas, deepest surface level
- **Classes**: `bg-background`

#### **foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(93% 0.003 255)` (near-white with cool undertone)
- **Usage**: Primary text color, headings, high-emphasis text
- **Classes**: `text-foreground`

#### **surface-1** (card)

- **Light**: `oklch(97% 0.002 255)` (elevated cool white, subtle cyan tint)
- **Dark**: `oklch(21% 0.003 255)` (elevated from background)
- **Usage**: First elevation - cards on background, primary containers
- **Classes**: `bg-surface-1`, `bg-card`

#### **surface-1-foreground** (card-foreground)

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text on cards and surface-1 elements
- **Classes**: `text-surface-1-foreground`, `text-card-foreground`

#### **surface-2**

- **Light**: `oklch(95% 0.003 255)` (subtle step from surface-1)
- **Dark**: `oklch(23% 0.003 255)` (elevated further)
- **Usage**: Second elevation - nested cards, elevated sections
- **Classes**: `bg-surface-2`

#### **surface-2-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text on surface-2 elements
- **Classes**: `text-surface-2-foreground`

#### **surface-3** (popover)

- **Light**: `oklch(98% 0.002 255)` (highest light elevation, subtle glow)
- **Dark**: `oklch(25% 0.003 255)` (floating UI elevation)
- **Usage**: Third elevation - dropdowns, popovers, tooltips
- **Classes**: `bg-surface-3`, `bg-popover`

#### **surface-3-foreground** (popover-foreground)

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text in popovers and dropdowns
- **Classes**: `text-surface-3-foreground`, `text-popover-foreground`

#### **surface-4**

- **Light**: `oklch(96% 0.002 255)` (modal surface)
- **Dark**: `oklch(27% 0.003 255)` (modal elevation)
- **Usage**: Fourth elevation - modals, dialogs
- **Classes**: `bg-surface-4`

#### **surface-4-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text in modals and dialogs
- **Classes**: `text-surface-4-foreground`

#### **surface-5**

- **Light**: `oklch(90% 0.004 255)` (interactive rest state)
- **Dark**: `oklch(30% 0.004 255)` (interactive background)
- **Usage**: Interactive element backgrounds at rest
- **Classes**: `bg-surface-5`

#### **surface-5-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text on interactive backgrounds
- **Classes**: `text-surface-5-foreground`

#### **surface-6**

- **Light**: `oklch(85% 0.005 255)` (hover/active state, more pronounced)
- **Dark**: `oklch(35% 0.005 255)` (hover/active elevation)
- **Usage**: Hover and active states
- **Classes**: `bg-surface-6`

#### **surface-6-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black with cool undertone)
- **Dark**: `oklch(90% 0.003 255)` (bright readable text)
- **Usage**: Text on hover/active backgrounds
- **Classes**: `text-surface-6-foreground`

---

### Borders

#### **border**

- **Light**: `oklch(82% 0.004 255)` (visible but not harsh)
- **Dark**: `oklch(32% 0.004 255)` (subtle separation)
- **Usage**: Standard borders, dividers, card outlines
- **Classes**: `border-border`

#### **border-subtle**

- **Light**: `oklch(88% 0.003 255)` (very subtle dividers)
- **Dark**: `oklch(26% 0.003 255)` (barely there)
- **Usage**: Very subtle dividers, nested card borders
- **Classes**: `border-border-subtle`

#### **border-strong**

- **Light**: `oklch(70% 0.005 255)` (emphasized borders)
- **Dark**: `oklch(40% 0.005 255)` (stronger separation)
- **Usage**: Emphasized borders, focused elements
- **Classes**: `border-border-strong`

---

### Primary Brand

#### **primary**

- **Light**: `oklch(55% 0.175 235)` (vibrant electric cyan)
- **Dark**: `oklch(70% 0.165 235)` (bright sci-fi cyan)
- **Usage**: Primary CTAs, key interactive elements, brand moments
- **Classes**: `bg-primary`, `text-primary`

#### **primary-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black neutral)
- **Usage**: Text and icons on primary buttons
- **Classes**: `text-primary-foreground`

#### **border-primary**

- **Light**: `oklch(50% 0.175 235)` (darker cyan)
- **Dark**: `oklch(65% 0.165 235)` (cyan border)
- **Usage**: Borders for primary-colored elements
- **Classes**: `border-border-primary`

---

### Destructive (Urgent Danger Actions)

#### **destructive**

- **Light**: `oklch(60% 0.24 30)` (vibrant urgent red-orange, stoppable feel)
- **Dark**: `oklch(70% 0.22 30)` (bright warning red)
- **Usage**: Delete buttons, dangerous actions, critical warnings
- **Classes**: `bg-destructive`, `text-destructive`

#### **destructive-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on destructive buttons and backgrounds
- **Classes**: `text-destructive-foreground`

#### **border-destructive**

- **Light**: `oklch(55% 0.24 30)` (darker red-orange)
- **Dark**: `oklch(65% 0.22 30)` (red border)
- **Usage**: Borders for destructive elements
- **Classes**: `border-border-destructive`

---

### Error (System/Validation Failures)

#### **error**

- **Light**: `oklch(55% 0.22 20)` (deeper, cooler crimson red)
- **Dark**: `oklch(65% 0.20 20)` (serious system red)
- **Usage**: Error states, validation failures, system errors
- **Classes**: `bg-error`, `text-error`

#### **error-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on error backgrounds
- **Classes**: `text-error-foreground`

#### **border-error**

- **Light**: `oklch(50% 0.22 20)` (darker crimson)
- **Dark**: `oklch(60% 0.20 20)` (crimson border)
- **Usage**: Error input borders, error container outlines
- **Classes**: `border-border-error`

---

### Success

#### **success**

- **Light**: `oklch(55% 0.15 145)` (vibrant success green)
- **Dark**: `oklch(70% 0.14 145)` (bright confirmation green)
- **Usage**: Success messages, confirmations, positive indicators
- **Classes**: `bg-success`, `text-success`

#### **success-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on success backgrounds
- **Classes**: `text-success-foreground`

#### **border-success**

- **Light**: `oklch(50% 0.15 145)` (darker green)
- **Dark**: `oklch(65% 0.14 145)` (green border)
- **Usage**: Borders for success elements
- **Classes**: `border-border-success`

---

### Warning

#### **warning**

- **Light**: `oklch(65% 0.15 85)` (vibrant caution amber)
- **Dark**: `oklch(75% 0.14 85)` (bright warning yellow)
- **Usage**: Warning messages, caution indicators, non-critical alerts
- **Classes**: `bg-warning`, `text-warning`

#### **warning-foreground**

- **Light**: `oklch(15% 0.002 255)` (near-black for contrast)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on warning backgrounds
- **Classes**: `text-warning-foreground`

#### **border-warning**

- **Light**: `oklch(60% 0.15 85)` (amber border)
- **Dark**: `oklch(70% 0.14 85)` (amber border)
- **Usage**: Warning borders and outlines
- **Classes**: `border-border-warning`

---

### Info

#### **info**

- **Light**: `oklch(60% 0.15 250)` (informative blue)
- **Dark**: `oklch(70% 0.14 250)` (bright info blue)
- **Usage**: Informational messages, helpful tips, guidance
- **Classes**: `bg-info`, `text-info`

#### **info-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on info backgrounds
- **Classes**: `text-info-foreground`

#### **border-info**

- **Light**: `oklch(55% 0.15 250)` (blue border)
- **Dark**: `oklch(65% 0.14 250)` (blue border)
- **Usage**: Info borders and outlines
- **Classes**: `border-border-info`

---

### Muted & Secondary

#### **muted**

- **Light**: `oklch(90% 0.004 255)` (subtle cool gray background)
- **Dark**: `oklch(30% 0.004 255)` (muted dark gray)
- **Usage**: Disabled states, subtle backgrounds, inactive elements
- **Classes**: `bg-muted`

#### **muted-foreground**

- **Light**: `oklch(52% 0.004 255)` (readable but deemphasized)
- **Dark**: `oklch(62% 0.004 255)` (muted text)
- **Usage**: Secondary text, helper text, labels, timestamps
- **Classes**: `text-muted-foreground`

#### **border-muted**

- **Light**: `oklch(85% 0.004 255)` (subtle muted border)
- **Dark**: `oklch(35% 0.004 255)` (dark muted border)
- **Usage**: Borders on muted elements
- **Classes**: `border-border-muted`

#### **secondary**

- **Light**: `oklch(90% 0.004 255)` (subtle cool gray)
- **Dark**: `oklch(30% 0.004 255)` (dark gray)
- **Usage**: Secondary buttons, alternative backgrounds
- **Classes**: `bg-secondary`

#### **secondary-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black)
- **Dark**: `oklch(93% 0.003 255)` (near-white)
- **Usage**: Text on secondary buttons
- **Classes**: `text-secondary-foreground`

---

### Accent

#### **accent**

- **Light**: `oklch(60% 0.175 235)` (slightly lighter cyan than primary)
- **Dark**: `oklch(75% 0.165 235)` (brighter accent cyan)
- **Usage**: Badges, highlights, secondary CTAs, emphasis
- **Classes**: `bg-accent`, `text-accent`

#### **accent-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on accent backgrounds
- **Classes**: `text-accent-foreground`

#### **border-accent**

- **Light**: `oklch(55% 0.175 235)` (cyan border)
- **Dark**: `oklch(70% 0.165 235)` (cyan border)
- **Usage**: Accent borders
- **Classes**: `border-border-accent`

---

### Links

#### **link**

- **Light**: `oklch(55% 0.175 235)` (cyan, matches primary)
- **Dark**: `oklch(75% 0.165 235)` (bright cyan)
- **Usage**: Hyperlinks, text links, anchor elements
- **Classes**: `text-link`

#### **link-hover**

- **Light**: `oklch(50% 0.175 235)` (darker cyan on hover)
- **Dark**: `oklch(80% 0.165 235)` (brighter cyan on hover)
- **Usage**: Link hover state
- **Classes**: `hover:text-link-hover`

#### **link-visited**

- **Light**: `oklch(50% 0.15 280)` (cool purple - visited)
- **Dark**: `oklch(70% 0.14 280)` (purple visited)
- **Usage**: Previously visited links
- **Classes**: `visited:text-link-visited`

---

### Code Display

#### **code-background**

- **Light**: `oklch(19% 0.003 255)` (deep cool black for code)
- **Dark**: `oklch(16% 0.003 255)` (deeper than dark background)
- **Usage**: Background for code blocks and inline code
- **Classes**: `bg-code-background`

#### **code-text**

- **Light**: `oklch(75% 0.165 235)` (electric cyan syntax)
- **Dark**: `oklch(80% 0.165 235)` (bright cyan code)
- **Usage**: Code text color, syntax highlighting base
- **Classes**: `text-code-text`

#### **code-border**

- **Light**: `oklch(28% 0.003 255)` (dark border for code blocks)
- **Dark**: `oklch(24% 0.003 255)` (subtle code border)
- **Usage**: Code block borders
- **Classes**: `border-code-border`

---

### Focus & Input

#### **input**

- **Light**: `oklch(82% 0.004 255)` (cool gray input border)
- **Dark**: `oklch(32% 0.004 255)` (dark input border)
- **Usage**: Input field borders, form element outlines
- **Classes**: `border-input`

#### **ring**

- **Light**: `oklch(60% 0.175 235)` (cyan focus ring)
- **Dark**: `oklch(70% 0.165 235)` (bright cyan ring)
- **Usage**: Focus rings, keyboard navigation indicators
- **Classes**: `ring-ring`, `focus-visible:ring-ring`

#### **ring-offset**

- **Light**: `oklch(97% 0.002 255)` (matches surface-1)
- **Dark**: `oklch(17% 0.003 255)` (matches dark background)
- **Usage**: Space between element and focus ring
- **Classes**: `ring-offset-ring-offset`

#### **focus-visible**

- **Light**: `oklch(55% 0.175 235)` (cyan focus outline)
- **Dark**: `oklch(70% 0.165 235)` (bright cyan outline)
- **Usage**: Keyboard-only focus state
- **Classes**: `focus-visible:outline-focus-visible`

---

### Disabled States

#### **disabled-background**

- **Light**: `oklch(92% 0.003 255)` (barely elevated disabled background)
- **Dark**: `oklch(19% 0.003 255)` (subtle disabled dark)
- **Usage**: Disabled button and element backgrounds
- **Classes**: `disabled:bg-disabled-background`

#### **disabled-text**

- **Light**: `oklch(65% 0.003 255)` (low contrast disabled text)
- **Dark**: `oklch(45% 0.003 255)` (muted disabled text)
- **Usage**: Text in disabled elements
- **Classes**: `disabled:text-disabled-text`

#### **disabled-border**

- **Light**: `oklch(88% 0.003 255)` (subtle disabled border)
- **Dark**: `oklch(24% 0.003 255)` (dark disabled border)
- **Usage**: Borders on disabled elements
- **Classes**: `disabled:border-disabled-border`

---

### Overlay

#### **overlay**

- **Light**: `oklch(10% 0 0 / 0.5)` (50% dark overlay)
- **Dark**: `oklch(0% 0 0 / 0.7)` (70% black overlay - more dramatic)
- **Usage**: Modal backdrops, drawer overlays
- **Classes**: `bg-overlay`

---

### Sidebar/Navigation

#### **sidebar-background**

- **Light**: `oklch(90% 0.004 255)` (cool gray sidebar)
- **Dark**: `oklch(21% 0.003 255)` (elevated dark sidebar)
- **Usage**: Sidebar and navigation panel background
- **Classes**: `bg-sidebar-background`

#### **sidebar-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black)
- **Dark**: `oklch(93% 0.003 255)` (near-white)
- **Usage**: Text and icons in sidebar
- **Classes**: `text-sidebar-foreground`

#### **sidebar-primary**

- **Light**: `oklch(55% 0.175 235)` (cyan active item)
- **Dark**: `oklch(70% 0.165 235)` (bright cyan active)
- **Usage**: Active/selected navigation items
- **Classes**: `bg-sidebar-primary`, `text-sidebar-primary`

#### **sidebar-primary-foreground**

- **Light**: `oklch(100% 0 0)` (pure white)
- **Dark**: `oklch(15% 0.002 255)` (near-black)
- **Usage**: Text on active navigation items
- **Classes**: `text-sidebar-primary-foreground`

#### **sidebar-accent**

- **Light**: `oklch(85% 0.004 255)` (subtle hover)
- **Dark**: `oklch(30% 0.004 255)` (dark hover state)
- **Usage**: Hover state in navigation
- **Classes**: `hover:bg-sidebar-accent`

#### **sidebar-accent-foreground**

- **Light**: `oklch(22% 0.003 255)` (near-black)
- **Dark**: `oklch(93% 0.003 255)` (near-white)
- **Usage**: Text on hover navigation items
- **Classes**: `text-sidebar-accent-foreground`

#### **sidebar-border**

- **Light**: `oklch(82% 0.004 255)` (sidebar divider)
- **Dark**: `oklch(32% 0.004 255)` (dark sidebar border)
- **Usage**: Sidebar borders and dividers
- **Classes**: `border-sidebar-border`

#### **sidebar-ring**

- **Light**: `oklch(60% 0.175 235)` (cyan focus)
- **Dark**: `oklch(70% 0.165 235)` (bright cyan focus)
- **Usage**: Focus ring in sidebar navigation
- **Classes**: `focus-visible:ring-sidebar-ring`

---

### Data Visualization (Charts)

**Cold Futuristic Palette** - All colors stay in the cool spectrum (blues, cyans, purples, teals) for cohesive spacey aesthetic

#### **chart-1**

- **Light**: `oklch(60% 0.175 235)` (cyan - primary brand color)
- **Dark**: `oklch(70% 0.165 235)` (bright cyan)
- **Usage**: Primary data series
- **Classes**: `fill-chart-1`, `stroke-chart-1`

#### **chart-2**

- **Light**: `oklch(60% 0.17 285)` (electric purple - futuristic, energetic)
- **Dark**: `oklch(70% 0.16 285)` (bright electric purple)
- **Usage**: Secondary data series
- **Classes**: `fill-chart-2`, `stroke-chart-2`

#### **chart-3**

- **Light**: `oklch(65% 0.13 190)` (teal - harmonious with cyan)
- **Dark**: `oklch(75% 0.12 190)` (bright teal)
- **Usage**: Tertiary data series
- **Classes**: `fill-chart-3`, `stroke-chart-3`

#### **chart-4**

- **Light**: `oklch(65% 0.12 250)` (arctic blue - cold, professional)
- **Dark**: `oklch(75% 0.11 250)` (icy blue)
- **Usage**: Quaternary data series
- **Classes**: `fill-chart-4`, `stroke-chart-4`

#### **chart-5**

- **Light**: `oklch(55% 0.16 280)` (deep violet - adds depth)
- **Dark**: `oklch(65% 0.15 280)` (rich violet)
- **Usage**: Additional data series
- **Classes**: `fill-chart-5`, `stroke-chart-5`

---

## Component Recipes

### Primary Button

```jsx
className =
  "bg-primary text-primary-foreground hover:bg-primary/90 border border-border-primary px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-ring-offset disabled:bg-disabled-background disabled:text-disabled-text disabled:cursor-not-allowed";
```

### Destructive Button

```jsx
className =
  "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-border-destructive px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-ring-offset";
```

### Standard Card

```jsx
className =
  "bg-surface-1 text-surface-1-foreground border border-border rounded-lg p-6";
```

### Elevated Card (nested)

```jsx
className =
  "bg-surface-2 text-surface-2-foreground border border-border-subtle rounded-lg p-4";
```

### Code Block

```jsx
className =
  "bg-code-background text-code-text border border-code-border rounded-lg p-4 font-mono text-sm";
```

### Success Badge

```jsx
className =
  "bg-success text-success-foreground border border-border-success px-2 py-1 rounded text-xs font-medium";
```

### Input Field

```jsx
className =
  "bg-surface-1 text-foreground border border-input rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-ring-offset disabled:bg-disabled-background disabled:text-disabled-text disabled:cursor-not-allowed";
```

### Error Input

```jsx
className =
  "bg-surface-1 text-foreground border-2 border-border-error rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 ring-offset-ring-offset";
```

### Link

```jsx
className =
  "text-link hover:text-link-hover visited:text-link-visited underline-offset-4 hover:underline transition-colors";
```

### Modal Container

```jsx
className = "fixed inset-0 z-50 flex items-center justify-center";
// Backdrop:
className = "fixed inset-0 bg-overlay";
// Modal:
className =
  "bg-surface-4 text-surface-4-foreground border border-border rounded-lg p-6 max-w-lg w-full mx-4 relative z-10";
```

---

## Typography Scale

All typography automatically adapts to light/dark mode via semantic foreground colors.

- **H1 (Page Title)**: `text-3xl font-bold tracking-tight text-foreground`
- **H2 (Section Title)**: `text-xl font-semibold tracking-tight text-foreground`
- **H3 (Card Title)**: `text-lg font-semibold text-foreground`
- **Body Text**: `text-base text-muted-foreground` (deemphasized) or `text-foreground` (emphasized)
- **Small Text**: `text-sm text-muted-foreground`

---

## Spacing & Layout Utilities

### Section Spacing

- **Vertical Rhythm**: `space-y-8` (2rem / 32px between sections)
- **Grid/Flex Gap**: `gap-8` (2rem / 32px in grids and flex containers)

### Card Padding

- **Standard**: `p-6` (1.5rem / 24px)
- **Compact**: `p-3` (0.75rem / 12px)

### Component Classes

- `.card-standard`: Standard card with proper elevation and padding
- `.card-compact`: Compact card for smaller UI elements
- `.section-spacing`: Consistent vertical section rhythm
- `.section-gap`: Consistent gap in flex/grid layouts
