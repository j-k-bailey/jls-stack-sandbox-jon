import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

// Added Priority with "now", "next", "later" as a way to allow owners to loosely prioritize product ideas
export type ProductIdeaPriority = "now" | "next" | "later";

export type ProductIdeaTag =
  // Type of work
  | "feature"
  | "enhancement"
  | "bug-fix"
  | "refactor"
  | "optimization"
  // Area of impact
  | "ux"
  | "ui"
  | "performance"
  | "security"
  | "accessibility"
  | "integration"
  | "automation"
  // Strategic alignment
  | "customer-request"
  | "revenue"
  | "retention"
  | "growth"
  | "competitive-advantage"
  | "cost-reduction"
  // Process & validation
  | "research"
  | "experiment"
  | "tech-debt"
  | "documentation"
  | "testing"
  | "analytics"
  // Platform/scope
  | "mobile"
  | "web"
  | "api"
  | "infrastructure"
  | "frontend"
  | "backend"
  // Product & project management
  | "work-management"
  | "prioritization"
  | "async"
  | "ownership"
  | "remote-teams"
  | "project-documentation"
  | "product-development"
  | "roadmap"
  | "planning"
  // Design & branding
  | "design-systems"
  | "standardization"
  | "tailwind"
  | "tokens"
  | "brand"
  | "identity"
  | "guidelines"
  | "style-guide"
  // Content & marketing
  | "writing"
  | "content"
  | "seo"
  | "copywriting"
  | "marketing"
  | "email-marketing"
  | "social-media"
  | "content-strategy"
  // PPC & advertising
  | "ppc"
  | "advertising"
  | "campaigns"
  | "ad-optimization"
  | "conversion-tracking"
  | "reporting"
  | "analytics-dashboard"
  // E-commerce & distribution
  | "e-commerce"
  | "fulfillment"
  | "inventory"
  | "white-label"
  | "manufacturing"
  | "supply-chain"
  | "logistics"
  | "vendor-management"
  // Client & operations
  | "client-portal"
  | "client-reporting"
  | "billing"
  | "invoicing"
  | "crm"
  | "support"
  | "onboarding"
  | "training"
  // Knowledge & systems
  | "llm"
  | "ai"
  | "knowledge-base"
  | "knowledge-management"
  | "sops"
  | "workflow"
  | "process-improvement"
  // Strategy & alignment
  | "strategy"
  | "alignment"
  | "scalability"
  | "internationalization"
  | "localization"
  | "compliance";

// Helper to get all tag values as an array for Zod
export const PRODUCT_IDEA_TAG_VALUES: ProductIdeaTag[] = [
  "accessibility",
  "ad-optimization",
  "advertising",
  "ai",
  "alignment",
  "analytics",
  "analytics-dashboard",
  "api",
  "async",
  "automation",
  "backend",
  "billing",
  "brand",
  "bug-fix",
  "campaigns",
  "client-portal",
  "client-reporting",
  "compliance",
  "competitive-advantage",
  "content",
  "content-strategy",
  "conversion-tracking",
  "copywriting",
  "cost-reduction",
  "crm",
  "customer-request",
  "design-systems",
  "documentation",
  "e-commerce",
  "email-marketing",
  "enhancement",
  "experiment",
  "feature",
  "frontend",
  "fulfillment",
  "growth",
  "guidelines",
  "identity",
  "infrastructure",
  "integration",
  "internationalization",
  "inventory",
  "invoicing",
  "knowledge-base",
  "knowledge-management",
  "llm",
  "localization",
  "logistics",
  "manufacturing",
  "marketing",
  "mobile",
  "onboarding",
  "optimization",
  "ownership",
  "performance",
  "planning",
  "ppc",
  "prioritization",
  "process-improvement",
  "product-development",
  "project-documentation",
  "refactor",
  "remote-teams",
  "reporting",
  "research",
  "retention",
  "revenue",
  "roadmap",
  "scalability",
  "security",
  "seo",
  "social-media",
  "sops",
  "standardization",
  "strategy",
  "style-guide",
  "supply-chain",
  "support",
  "tailwind",
  "tech-debt",
  "testing",
  "tokens",
  "training",
  "ui",
  "ux",
  "vendor-management",
  "web",
  "white-label",
  "work-management",
  "workflow",
  "writing",
];

export interface ProductIdea {
  id: string;
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  tags?: ProductIdeaTag[];
  priority?: ProductIdeaPriority;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateProductIdeaInput {
  title: string;
  summary: string;
  status?: ProductIdeaStatus;
  ownerId: string;
  tags?: string[];
  priority?: ProductIdeaPriority;
}

export interface ProductIdeaNote {
  id: string;
  body: string;
  authorId: string;
  createdAt: Timestamp;
}

export interface ProductIdeaFilters {
  status?: ProductIdeaStatus;
  tags?: ProductIdeaTag;
  priority?: ProductIdeaPriority;
  ownerId?: string;
}

export interface ProductIdeaPaginationOptions {
  pageSize: number;
  lastDoc?: DocumentSnapshot;
}
