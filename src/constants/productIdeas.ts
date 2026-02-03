interface ProductIdea {
  title: string;
  summary: string;
  status: "draft" | "active" | "paused" | "shipped";
  tags: string[];
  ownerId: string;
  priority?: "later" | "next" | "now";
}

export const PRODUCT_IDEAS: ProductIdea[] = [
  {
    title: "Dock",
    summary:
      "A system for tracking long-lived Work so priorities don’t drift as tasks change. Dock keeps responsibilities visible across time, helping remote teams stay aligned on what actually matters.",
    status: "draft",
    tags: [
      "work-management",
      "prioritization",
      "async",
      "ownership",
      "remote-teams",
    ],
    ownerId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
  },
  {
    title: "Foundry (Design System Builder)",
    summary:
      "A guided design-system builder that turns ad-hoc styles into a coherent, accessible token system. Foundry helps teams define primitives, map semantic tokens, and preview real components with built-in WCAG validation.",
    status: "draft",
    tags: ["design-systems", "accessibility", "frontend", "tailwind", "tokens"],
    ownerId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
  },
  {
    title: "Ghostwrite",
    summary:
      "A structured writing workspace that guides authors from idea to publication-ready content. Ghostwrite combines step-by-step workflows, intelligent research, and project-level memory to produce high-quality writing at scale.",
    status: "draft",
    tags: ["writing", "content", "seo", "llm", "knowledge-base"],
    ownerId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
  },
  {
    title: "Lorebook (SOP Wiki & Training Hub)",
    summary:
      "A living knowledge system that turns SOPs into a navigable, interconnected wiki. Lorebook makes institutional knowledge legible, searchable, and easier to learn through structured modules and progress tracking.",
    status: "draft",
    tags: [
      "knowledge-management",
      "sops",
      "onboarding",
      "documentation",
      "training",
    ],
    ownerId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
  },
  {
    title: "Vector",
    summary:
      "A centralized system for defining and maintaining long-term strategic direction across brand, product, and marketing. Vector documents guardrails, guidelines, and goalposts so teams can move with clarity, consistency, and shared momentum over time.",
    status: "draft",
    tags: [
      "strategy",
      "brand",
      "identity",
      "guidelines",
      "alignment",
      "documentation",
    ],
    ownerId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
  },
];
