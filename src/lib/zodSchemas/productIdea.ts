import { z } from "zod";

// Schema definitions
export const createProductIdeaSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(1000, "Summary must be 1000 characters or less"),
  status: z.enum(["draft", "active", "paused", "shipped"], {
    error: "Please select a valid status",
  }),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").optional(),
  priority: z.enum(["now", "next", "later"]).optional(),
});

export const createNoteSchema = z.object({
  body: z
    .string()
    .min(1, "Note cannot be empty")
    .max(2000, "Note must be 2000 characters or less"),
});

export const ideaFiltersSchema = z.object({
  status: z.enum(["draft", "active", "paused", "shipped"]).optional(),
  priority: z.enum(["now", "next", "later"]).optional(),
  tag: z.string().optional(),
  ownerId: z.string().optional(),
});

// Type exports
export type CreateProductIdeaInput = z.infer<typeof createProductIdeaSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type IdeaFilters = z.infer<typeof ideaFiltersSchema>;

// Constants
export const IDEA_STATUSES = [
  { value: "draft", label: "Draft", description: "Work in progress" },
  {
    value: "active",
    label: "Active",
    description: "Currently being developed",
  },
  { value: "paused", label: "Paused", description: "On hold" },
  { value: "shipped", label: "Shipped", description: "Released to users" },
] as const;

export const IDEA_PRIORITIES = [
  { value: "now", label: "Now", description: "Urgent priority" },
  { value: "next", label: "Next", description: "High priority" },
  { value: "later", label: "Later", description: "Low priority" },
] as const;

export const IDEA_TAGS = [
  // Type of work
  "feature",
  "enhancement",
  "bug-fix",
  "refactor",

  // Area of impact
  "ux",
  "performance",
  "security",
  "accessibility",
  "integration",

  // Strategic alignment
  "customer-request",
  "revenue",
  "retention",
  "growth",

  // Process & validation
  "research",
  "experiment",
  "tech-debt",
  "documentation",

  // Platform/scope
  "mobile",
  "web",
  "api",
  "infrastructure",
] as const;
