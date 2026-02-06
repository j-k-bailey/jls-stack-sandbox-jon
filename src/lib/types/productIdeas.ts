import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

// Added Priority with "now", "next", "later" as a way to allow owners to loosely prioritize product ideas
export type ProductIdeaPriority = "now" | "next" | "later";

export type ProductIdeaTag =
  | "feature"
  | "enhancement"
  | "bug-fix"
  | "refactor"
  | "ux"
  | "performance"
  | "security"
  | "accessibility"
  | "integration"
  | "customer-request"
  | "revenue"
  | "retention"
  | "growth"
  | "research"
  | "experiment"
  | "tech-debt"
  | "documentation"
  | "mobile"
  | "web"
  | "api"
  | "infrastructure";

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
