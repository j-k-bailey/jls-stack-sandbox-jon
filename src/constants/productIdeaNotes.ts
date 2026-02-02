export interface ProductIdeaNoteSeed {
  body: string;
  authorId: string;
}

export const PRODUCT_IDEA_NOTES: Record<string, ProductIdeaNoteSeed[]> = {
  dock: [
    {
      body: "Dock is an execution-first project management tool focused on clarity, ownership, and momentum. It intentionally avoids becoming a strategy, knowledge, or documentation hub.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "The core philosophy of Dock is that work should be visible, scoped, and owned. Projects move forward because responsibility is explicit, not because process is heavy.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Dock should not absorb long-term planning, brand identity, or decision guardrails. Those belong upstream (e.g., Vector). Dock exists to ship.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Compared to tools like Linear, Asana, or Jira, Dock emphasizes narrative context and intent alongside tasks, without turning into a wiki or SOP system.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
  ],

  "foundry-design-system-builder": [
    {
      body: "Foundry is a design system builder focused on primitives, tokens, and constraints rather than finished components. It exists to help teams define how decisions are made in UI, not just what buttons look like.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "The goal is to make accessibility, consistency, and scalability the default by encoding them at the token and primitive level.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Foundry supports teams that build systems iteratively: new tokens and primitives emerge as needed, but once created they become shared, enforceable constraints.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Unlike Tailwind alone or static design kits, Foundry aims to provide customizable yet portable semantic tokens across projects and understandable by any developer joining the team.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
  ],

  ghostwrite: [
    {
      body: "Ghostwrite is an AI-assisted writing and ideation tool focused on producing usable drafts that align with defined voice, tone, and intent.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "The emphasis is not on novelty or creativity for its own sake, but on reducing friction between intent and execution in writing tasks.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Ghostwrite should integrate with or reference higher-level guidelines (brand voice, audience, goals) rather than redefining them itself.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "This tool is especially useful for repeatable writing contexts: product copy, documentation, marketing content, and internal communications.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
  ],

  "lorebook-sop-wiki-training-hub": [
    {
      body: "Lorebook is a structured knowledge and training hub designed to capture institutional knowledge that doesn’t fit neatly into tasks or docs.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "It is intended to replace ad-hoc Google Drive folders and outdated SOP documents with a more intentional, navigable system.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Lorebook focuses on teaching and continuity: helping new and existing team members understand how and why things are done.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Unlike Dock, Lorebook is not time-bound or execution-oriented. Its value compounds over time as organizational memory.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
  ],

  vector: [
    {
      body: "Vector is a strategic identity and direction system that defines guardrails, guidelines, and goalposts for long-term decision-making.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "It acts as a CMO- and strategist-emulator: capturing brand identity, product philosophy, audience definitions, and positioning in a living system.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "Vector is explicitly upstream of tools like Dock, Foundry, and Ghostwrite. It answers 'why' and 'in what direction' before execution begins.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
    {
      body: "The core value is cohesion over time: ensuring that creative, marketing, and product decisions remain aligned even as teams and contexts change.",
      authorId: "5P74HzcNNpOivUUL7B9NUt1i4DT2",
    },
  ],
};
