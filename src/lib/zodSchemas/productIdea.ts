import { z } from "zod";
import { PRODUCT_IDEA_TAG_VALUES } from "@/lib/types/productIdeas";

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
    message: "Please select a valid status",
  }),
  tags: z
    .array(
      z.enum(PRODUCT_IDEA_TAG_VALUES as [string, ...string[]], {
        message: "Please select a valid tag",
      }),
    )
    .max(10, "Maximum 10 tags allowed")
    .optional(),
  priority: z
    .enum(["now", "next", "later"], {
      message: "Please select a valid priority",
    })
    .optional(),
});

export const updateProductIdeaSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less")
    .optional(),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(1000, "Summary must be 1000 characters or less")
    .optional(),
  status: z.enum(["draft", "active", "paused", "shipped"]).optional(),
  tags: z
    .array(
      z.enum(PRODUCT_IDEA_TAG_VALUES as [string, ...string[]], {
        message: "Please select a valid tag",
      }),
    )
    .max(10, "Maximum 10 tags allowed")
    .optional(),
  priority: z
    .enum(["now", "next", "later"], {
      message: "Please select a valid priority",
    })
    .optional(),
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
export type UpdateProductIdeaInput = z.infer<typeof updateProductIdeaSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type IdeaFilters = z.infer<typeof ideaFiltersSchema>;
