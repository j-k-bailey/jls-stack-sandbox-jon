import { extendTailwindMerge } from "tailwind-merge";

type AdditionalClassGroupIds =
  | "typography"
  | "grid-layout"
  | "spacing-flow"
  | "spacing-inset"
  | "radius-semantic"
  | "shadow-semantic"
  | "hit-target"
  | "line-height"
  | "grid-template-columns";

type AdditionalThemeGroupIds =
  | "spacing-flow"
  | "spacing-inset"
  | "radius-semantic";

export const twMergeExtended = extendTailwindMerge<
  AdditionalClassGroupIds,
  AdditionalThemeGroupIds
>({
  extend: {
    // Define custom class groups for conflict resolution
    classGroups: {
      // Typography utilities - conflicts with font-size, font-weight, line-height, letter-spacing
      typography: [
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "headline-5",
        "headline-6",
        "subtitle-1",
        "subtitle-2",
        "body-1",
        "body-2",
        "button-text",
        "caption",
        "overline-text",
        "monospace",
        "tabular-nums",
        "balanced",
      ],

      // Grid layout utilities - conflicts with display, grid-template-columns, gap, padding
      "grid-layout": [
        "grid-basic",
        "grid-extended",
        "grid-wide",
        "grid-fullbleed",
      ],

      // Flow spacing utilities - conflicts with gap-*
      "spacing-flow": ["gap-inline", "gap-stack", "gap-section", "gap-layout"],

      // Inset spacing utilities - conflicts with p-*, px-*, py-*
      "spacing-inset": [
        "p-inset-xs",
        "p-inset-sm",
        "p-inset",
        "p-inset-lg",
        "p-inset-xl",
        "p-inset-2xl",
        "px-inset-xs",
        "px-inset-sm",
        "px-inset",
        "px-inset-lg",
        "px-inset-xl",
        "px-inset-2xl",
        "py-inset-xs",
        "py-inset-sm",
        "py-inset",
        "py-inset-lg",
        "py-inset-xl",
        "py-inset-2xl",
      ],

      // Radius semantic utilities - conflicts with rounded-*
      "radius-semantic": [
        "rounded-interactive",
        "rounded-nested",
        "rounded-container",
        "rounded-large",
        "rounded-icon",
      ],

      // Shadow semantic utilities - conflicts with shadow-*
      "shadow-semantic": [
        "shadow-low",
        "shadow-medium",
        "shadow-high",
        "shadow-glow-primary",
        "shadow-glow-accent",
        "shadow-glow-success",
        "shadow-glow-warning",
      ],

      // Hit target utility - conflicts with min-w-*, min-h-*
      "hit-target": ["hit-target"],
    },

    // Define theme groups for proper conflict resolution
    theme: {
      "spacing-flow": ["inline", "stack", "section", "layout"],
      "spacing-inset": [
        "inset-xs",
        "inset-sm",
        "inset",
        "inset-lg",
        "inset-xl",
        "inset-2xl",
      ],
      "radius-semantic": [
        "interactive",
        "nested",
        "container",
        "large",
        "icon",
      ],
    },

    // Define conflicts between custom utilities and Tailwind classes
    conflictingClassGroups: {
      // Typography utilities conflict with font utilities
      typography: [
        "font-size",
        "font-weight",
        "line-height",
        "tracking",
        "text-transform",
        "font-family",
      ],

      // Grid utilities conflict with display, grid, gap, padding
      "grid-layout": [
        "display",
        "grid-template-columns",
        "gap",
        "p",
        "px",
        "py",
        "max-w",
        "mx",
      ],

      // Flow spacing conflicts with gap
      "spacing-flow": ["gap", "gap-x", "gap-y"],

      // Inset spacing conflicts with padding
      "spacing-inset": ["p", "px", "py", "pt", "pr", "pb", "pl"],

      // Radius conflicts with border-radius
      "radius-semantic": ["rounded"],

      // Shadow conflicts with box-shadow
      "shadow-semantic": ["shadow"],

      // Hit target conflicts with min-width/min-height
      "hit-target": ["min-w", "min-h"],
    },
  },
});
