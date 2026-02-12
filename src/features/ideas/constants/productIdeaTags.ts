/**
 * High-level tags for categorizing product ideas.
 * Focused on business domains, app types, and cross-cutting functions
 * that apply to multiple web app ideas.
 */

export const PRODUCT_IDEA_TAGS = [
  // === BUSINESS DOMAINS ===
  "work-management",
  "knowledge-management",
  "content",
  "learning",
  "design-systems",
  "strategy",
  "brand",
  "identity",

  // === APP TYPES / FUNCTIONS ===
  "documentation",
  "writing",
  "onboarding",
  "training",
  "sops",
  "guidelines",
  "wiki",
  "flashcards",
  "accessibility",

  // === INTERNAL TOOLS (HR & OPERATIONS) ===
  "employee-directory",
  "time-tracking",
  "expense-management",
  "asset-management",
  "inventory",
  "permissions",
  "reporting",
  "analytics",
  "dashboards",

  // === COLLABORATION & COMMUNICATION ===
  "async",
  "remote-teams",
  "alignment",
  "ownership",
  "prioritization",
  "feedback",
  "approvals",
  "notifications",

  // === WORKFLOW & AUTOMATION ===
  "workflow",
  "automation",
  "templates",
  "forms",
  "scheduling",
  "calendar",
  "reminders",

  // === TECHNICAL CAPABILITIES ===
  "frontend",
  "backend",
  "llm",
  "ai",
  "search",
  "api",
  "integrations",
  "webhooks",

  // === SPECIALIZED FEATURES ===
  "seo",
  "tokens",
  "tailwind",
  "spaced-repetition",
  "memory",
  "education",
  "knowledge-base",
] as const;

export type ProductIdeaTag = (typeof PRODUCT_IDEA_TAGS)[number];

// Export for use in forms/selects
export const ideaTagOptions = [...PRODUCT_IDEA_TAGS].sort();
