import type {
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/lib/types/productIdeas";

interface ProductIdeaSeed {
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  tags?: string[];
  priority?: ProductIdeaPriority;
  // These will be added automatically by seed function:
  // ownerId, createdAt, updatedAt, archivedAt
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
    title: "Interval",
    summary:
      "A spaced-repetition flashcard app designed for serious learners who want to build deep, durable knowledge. Interval uses evidence-based scheduling algorithms to optimize retention while keeping the interface clean, fast, and distraction-free.",
    status: "active",
    tags: [
      "learning",
      "spaced-repetition",
      "flashcards",
      "education",
      "memory",
    ],
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

interface ProductIdeaNoteSeed {
  body: string;
  // These will be added automatically by seed function:
  // authorId, authorDisplayName, authorPhotoURL, createdAt, updatedAt, archivedAt
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

  interval: [
    {
      body: "Interval is built on spaced-repetition principles (SM-2 algorithm or similar) to maximize long-term retention with minimal daily review time.",
    },
    {
      body: "The core UX philosophy is speed and focus: cards should be reviewable in seconds, not minutes. No clutter, no gamification, no distractions.",
    },
    {
      body: "Unlike Anki (powerful but clunky) or Quizlet (accessible but shallow), Interval aims to be both scientifically rigorous and beautiful to use daily.",
    },
    {
      body: "Key features: markdown support for cards, deck organization, scheduling transparency (users can see why a card is due), offline-first architecture, and clean mobile experience.",
    },
    {
      body: "Target users: students, professionals, language learners, and anyone building knowledge that compounds over years, not weeks.",
    },
  ],

  "lorebook-sop-wiki-training-hub": [
    {
      body: "Lorebook is a structured knowledge and training hub designed to capture institutional knowledge that doesn't fit neatly into tasks or docs.",
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

export const PRODUCT_IDEAS_2 = [
  {
    title: "SOP Orchestrator",
    summary:
      "Centralized SOP authoring system with version control, role-based visibility, and automated review reminders.",
    tags: [
      "sops",
      "documentation",
      "workflow",
      "approvals",
      "permissions",
      "knowledge-base",
    ],
    priority: "now",
    status: "active",
  },
  {
    title: "Onboarding Path Builder",
    summary:
      "Role-based onboarding journeys that auto-assign training, documentation, and flashcards to new hires.",
    tags: [
      "onboarding",
      "training",
      "learning",
      "workflow",
      "spaced-repetition",
    ],
    priority: "now",
    status: "draft",
  },
  {
    title: "Internal Knowledge Graph",
    summary:
      "Searchable wiki that maps relationships between docs, owners, and business concepts.",
    tags: ["knowledge-management", "wiki", "search", "knowledge-base"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Async Decision Log",
    summary:
      "Structured async decision-making tool with approvals, ownership tracking, and rationale history.",
    tags: ["async", "alignment", "approvals", "documentation", "ownership"],
    priority: "now",
    status: "active",
  },
  {
    title: "Content Production Pipeline",
    summary:
      "Kanban-style workflow for managing content ideation through publishing with SEO validation.",
    tags: ["content", "workflow", "seo", "approvals", "reporting"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Experiment Tracker",
    summary:
      "Centralized experimentation dashboard for hypotheses, metrics, and post-mortems.",
    tags: ["analytics", "reporting", "dashboards", "strategy"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Permissions Matrix Manager",
    summary:
      "Role and system access tracker with audit logging and approval workflows.",
    tags: ["permissions", "approvals", "workflow", "reporting"],
    priority: "now",
    status: "active",
  },
  {
    title: "Training Memory Engine",
    summary:
      "Spaced repetition tool for institutional knowledge reinforcement across teams.",
    tags: ["flashcards", "spaced-repetition", "learning", "memory"],
    priority: "now",
    status: "active",
  },
  {
    title: "Design System Governance Portal",
    summary:
      "Token registry and component documentation hub with change approvals.",
    tags: ["design-systems", "tokens", "frontend", "guidelines", "approvals"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Meeting-to-Task Extractor",
    summary:
      "LLM-powered extraction of action items from meeting transcripts into workflow boards.",
    tags: ["llm", "automation", "workflow", "async"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Quarterly Prioritization Engine",
    summary:
      "Structured prioritization scoring tool aligned to strategy and ownership.",
    tags: ["prioritization", "strategy", "dashboards", "reporting"],
    priority: "now",
    status: "active",
  },
  {
    title: "Internal SEO Hub",
    summary:
      "Workflow and documentation system for semantic SEO processes and audits.",
    tags: ["seo", "documentation", "analytics", "workflow"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Asset Registry",
    summary:
      "Track hardware, software, licenses, and renewals with reminders and ownership.",
    tags: ["asset-management", "inventory", "reminders", "reporting"],
    priority: "now",
    status: "active",
  },
  {
    title: "Feedback Capture System",
    summary:
      "Unified intake for async feedback across products, content, and processes.",
    tags: ["feedback", "forms", "async", "notifications"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Approval Workflow Builder",
    summary:
      "No-code internal approvals engine for publishing, hiring, spending, and releases.",
    tags: ["workflow", "automation", "approvals", "forms"],
    priority: "now",
    status: "active",
  },
  {
    title: "Internal API Catalog",
    summary:
      "Documentation hub for internal APIs with search and ownership tracking.",
    tags: ["api", "documentation", "search", "backend"],
    priority: "later",
    status: "draft",
  },
  {
    title: "Performance Snapshot Dashboard",
    summary:
      "Unified dashboard pulling analytics from multiple systems into role-specific views.",
    tags: ["dashboards", "analytics", "integrations", "reporting"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Guideline Compliance Checker",
    summary:
      "LLM-assisted review of documents for brand, accessibility, and writing compliance.",
    tags: ["llm", "guidelines", "accessibility", "writing"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Internal Calendar Sync Hub",
    summary:
      "Cross-team visibility into launches, campaigns, and training schedules.",
    tags: ["calendar", "scheduling", "alignment", "notifications"],
    priority: "later",
    status: "draft",
  },
  {
    title: "Strategy Mapping Board",
    summary:
      "Visual map connecting initiatives to company strategy and outcomes.",
    tags: ["strategy", "alignment", "dashboards", "ownership"],
    priority: "now",
    status: "active",
  },
  {
    title: "Documentation Freshness Monitor",
    summary: "Tracks stale documentation and auto-assigns review reminders.",
    tags: ["documentation", "reminders", "automation", "knowledge-base"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Internal Wiki Analytics",
    summary:
      "Analytics layer for tracking knowledge usage and gaps across the org.",
    tags: ["wiki", "analytics", "reporting", "knowledge-management"],
    priority: "later",
    status: "draft",
  },
  {
    title: "Remote Team Alignment Board",
    summary: "Async weekly planning and visibility tool for distributed teams.",
    tags: ["remote-teams", "async", "alignment", "ownership"],
    priority: "now",
    status: "active",
  },
  {
    title: "Form-to-Workflow Router",
    summary:
      "Intake forms that auto-route submissions into structured workflows.",
    tags: ["forms", "workflow", "automation", "notifications"],
    priority: "now",
    status: "active",
  },
  {
    title: "Internal Search Index",
    summary: "Cross-system search layer indexing docs, boards, and dashboards.",
    tags: ["search", "integrations", "knowledge-management"],
    priority: "next",
    status: "draft",
  },
  {
    title: "LLM Prompt Library",
    summary:
      "Centralized repository of tested prompts for internal workflows and automation.",
    tags: ["llm", "documentation", "templates", "ai"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Ownership Directory",
    summary:
      "Role-based directory mapping initiatives, systems, and assets to accountable owners.",
    tags: ["employee-directory", "ownership", "knowledge-management"],
    priority: "now",
    status: "active",
  },
  {
    title: "Internal Reporting Automator",
    summary:
      "Scheduled automated reporting across systems with executive-ready summaries.",
    tags: ["reporting", "automation", "integrations", "analytics"],
    priority: "next",
    status: "draft",
  },
  {
    title: "Release Approval Gatekeeper",
    summary:
      "Pre-release checklist with automated approvals and compliance checks.",
    tags: ["approvals", "workflow", "backend", "documentation"],
    priority: "later",
    status: "draft",
  },
  {
    title: "Knowledge Certification Tracker",
    summary:
      "Tracks training completion and knowledge mastery via spaced repetition.",
    tags: ["training", "learning", "spaced-repetition", "reporting"],
    priority: "next",
    status: "draft",
  },
];

// Helper to convert idea title to slug for note lookup
export function getIdeaSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
