import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/types/productIdeas";

interface ProductIdeaSeed {
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  tags?: string[];
  priority?: ProductIdeaPriority;
  // These will be added automatically by seed function:
  // ownerName, teamId, teamName, orgId
}

export const PRODUCT_IDEAS: ProductIdeaSeed[] = [
  {
    title: "Dock",
    summary:
      "A system for tracking long-lived Work so priorities don't drift as tasks change. Dock keeps responsibilities visible across time, helping remote teams stay aligned on what actually matters.",
    status: "draft",
    tags: [
      "work-management",
      "prioritization",
      "async",
      "ownership",
      "remote-teams",
    ],
    priority: "next",
  },
  {
    title: "Foundry (Design System Builder)",
    summary:
      "A guided design-system builder that turns ad-hoc styles into a coherent, accessible token system. Foundry helps teams define primitives, map semantic tokens, and preview real components with built-in WCAG validation.",
    status: "draft",

    tags: ["design-systems", "accessibility", "frontend", "tailwind", "tokens"],
    priority: "next",
  },
  {
    title: "Ghostwrite",
    summary:
      "A structured writing workspace that guides authors from idea to publication-ready content. Ghostwrite combines step-by-step workflows, intelligent research, and project-level memory to produce high-quality writing at scale.",
    status: "active",

    tags: ["writing", "content", "seo", "llm", "knowledge-base"],
    priority: "now",
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
    priority: "later",
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
    priority: "later",
  },
];

export interface ProductIdeaNoteSeed {
  body: string;
}

export const PRODUCT_IDEA_NOTES: Record<string, ProductIdeaNoteSeed[]> = {
  dock: [
    {
      body: "Dock is an execution-first project management tool focused on clarity, ownership, and momentum. It intentionally avoids becoming a strategy, knowledge, or documentation hub.",
    },
    {
      body: "The core philosophy of Dock is that work should be visible, scoped, and owned. Projects move forward because responsibility is explicit, not because process is heavy.",
    },
    {
      body: "Dock should not absorb long-term planning, brand identity, or decision guardrails. Those belong upstream (e.g., Vector). Dock exists to ship.",
    },
    {
      body: "Compared to tools like Linear, Asana, or Jira, Dock emphasizes narrative context and intent alongside tasks, without turning into a wiki or SOP system.",
    },
  ],

  "foundry-design-system-builder": [
    {
      body: "Foundry is a design system builder focused on primitives, tokens, and constraints rather than finished components. It exists to help teams define how decisions are made in UI, not just what buttons look like.",
    },
    {
      body: "The goal is to make accessibility, consistency, and scalability the default by encoding them at the token and primitive level.",
    },
    {
      body: "Foundry supports teams that build systems iteratively: new tokens and primitives emerge as needed, but once created they become shared, enforceable constraints.",
    },
    {
      body: "Unlike Tailwind alone or static design kits, Foundry aims to provide customizable yet portable semantic tokens across projects and understandable by any developer joining the team.",
    },
  ],

  ghostwrite: [
    {
      body: "Ghostwrite is an AI-assisted writing and ideation tool focused on producing usable drafts that align with defined voice, tone, and intent.",
    },
    {
      body: "The emphasis is not on novelty or creativity for its own sake, but on reducing friction between intent and execution in writing tasks.",
    },
    {
      body: "Ghostwrite should integrate with or reference higher-level guidelines (brand voice, audience, goals) rather than redefining them itself.",
    },
    {
      body: "This tool is especially useful for repeatable writing contexts: product copy, documentation, marketing content, and internal communications.",
    },
  ],

  "lorebook-sop-wiki-training-hub": [
    {
      body: "Lorebook is a structured knowledge and training hub designed to capture institutional knowledge that doesn’t fit neatly into tasks or docs.",
    },
    {
      body: "It is intended to replace ad-hoc Google Drive folders and outdated SOP documents with a more intentional, navigable system.",
    },
    {
      body: "Lorebook focuses on teaching and continuity: helping new and existing team members understand how and why things are done.",
    },
    {
      body: "Unlike Dock, Lorebook is not time-bound or execution-oriented. Its value compounds over time as organizational memory.",
    },
  ],

  vector: [
    {
      body: "Vector is a strategic identity and direction system that defines guardrails, guidelines, and goalposts for long-term decision-making.",
    },
    {
      body: "It acts as a CMO- and strategist-emulator: capturing brand identity, product philosophy, audience definitions, and positioning in a living system.",
    },
    {
      body: "Vector is explicitly upstream of tools like Dock, Foundry, and Ghostwrite. It answers 'why' and 'in what direction' before execution begins.",
    },
    {
      body: "The core value is cohesion over time: ensuring that creative, marketing, and product decisions remain aligned even as teams and contexts change.",
    },
  ],
};
