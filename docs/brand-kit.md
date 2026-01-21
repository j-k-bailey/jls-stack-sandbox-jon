# JLS Stack Sandbox Brand Kit

## Identity

- Name: JLS Stack Sandbox
- Purpose: A training playground to learn how to build stack-aligned apps quickly and correctly the JLS way
- Vibe: experimental, disciplined, progressive
- Visual Philosophy: Monochromatic cold neutrals with pops of cyan

## Color Semantics

- **primary**
  - light: cyan-600
  - dark: cyan-500
  - usage: primary buttons, key CTAs, active states
  - classes: `bg-primary`, `text-primary`, `border-primary`

- **primary-foreground**
  - light: white
  - dark: slate-950
  - usage: text/icons on primary buttons
  - classes: `text-primary-foreground`

- **background**
  - light: slate-50
  - dark: slate-950
  - usage: main app background
  - classes: `bg-background`

- **foreground**
  - light: slate-900
  - dark: slate-100
  - usage: primary text (headings, important text)
  - classes: `text-foreground`

- **surface**
  - light: white
  - dark: slate-900
  - usage: cards, panels, sections (elevated above background)
  - classes: `bg-surface`

- **surface-foreground**
  - light: slate-900
  - dark: slate-200
  - usage: text inside cards/panels
  - classes: `text-surface-foreground`

- **accent**
  - light: cyan-500
  - dark: cyan-400
  - usage: badges, highlights, success messages
  - classes: `bg-accent`, `text-accent`

- **accent-foreground**
  - light: white
  - dark: slate-950
  - usage: text/icons on accent badges
  - classes: `text-accent-foreground`

- **muted**
  - light: slate-100
  - dark: slate-800
  - usage: disabled states, subtle backgrounds, inactive elements
  - classes: `bg-muted`

- **muted-foreground**
  - light: slate-500
  - dark: slate-400
  - usage: secondary text, helper text, labels
  - classes: `text-muted-foreground`

- **border**
  - light: slate-200
  - dark: slate-800
  - usage: card borders, dividers, input borders
  - classes: `border-border`

- **input**
  - light: slate-200
  - dark: slate-800
  - usage: input field borders
  - classes: `border-input`

- **destructive**
  - light: red-600
  - dark: red-500
  - usage: error states, delete buttons, validation errors
  - classes: `bg-destructive`, `text-destructive`, `border-destructive`

- **ring**
  - light: cyan-500
  - dark: cyan-500
  - usage: focus rings, active element outlines
  - classes: `ring-ring`

## Typography Scale

All typography uses semantic foreground colors for automatic light/dark mode adaptation.

- **H1 (pageTitle)**
  - usage: top-level page headings
  - classes: `text-3xl font-bold tracking-tight text-foreground`
  - auto-applied to: `<h1>` tags

- **H2 (sectionTitle)**
  - usage: major section headings inside a page
  - classes: `text-xl font-semibold tracking-tight text-foreground`
  - auto-applied to: `<h2>` tags

- **H3 (cardTitle)**
  - usage: titles inside cards
  - classes: `text-lg font-semibold text-foreground`
  - auto-applied to: `<h3>` tags

- **Body**
  - usage: paragraphs, normal text
  - classes: `text-base text-muted-foreground`
  - auto-applied to: `<p>` tags

- **Small**
  - usage: helper text, labels, captions
  - classes: `text-sm text-muted-foreground`
  - auto-applied to: `<small>` tags

## Metrics

- **sectionGap**
  - usage: vertical space between main sections
  - classes: `space-y-8` or `.section-spacing`
  - value: 2rem (32px)

- **cardPadding**
  - usage: standard card inner padding
  - classes: `p-6`
  - value: 1.5rem (24px)

- **compactCardPadding**
  - usage: small cards or badges
  - classes: `p-3`
  - value: 0.75rem (12px)

- **cornerRadius**
  - usage: cards, modals, containers
  - classes: `rounded-lg`
  - value: 0.5rem (8px)

## Component Classes

- **card-standard**
  - classes: `bg-surface text-surface-foreground border border-border rounded-lg p-6`
  - usage: standard card/panel with proper elevation and padding

- **card-compact**
  - classes: `bg-surface text-surface-foreground border border-border rounded-lg p-3`
  - usage: smaller cards or compact panels

- **section-spacing**
  - classes: `space-y-8`
  - usage: consistent vertical rhythm between sections

## Usage Notes

1. **Always use semantic tokens** (`bg-primary`, `text-foreground`) instead of hardcoded colors (`bg-cyan-500`, `text-slate-100`) for automatic theme adaptation
2. **HTML semantic tags are auto-styled** - `<h1>`, `<h2>`, `<h3>`, `<p>`, `<small>` receive brand styling automatically
3. **Focus states use cyan** - all interactive elements get cyan-500 focus rings to match brand energy
4. **Depth hierarchy**:
   - Light mode: background (slate-50) → surface (white)
   - Dark mode: background (slate-950) → surface (slate-900)
