import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

// Added Priority with "now", "next", "later" as a way to allow owners to loosely prioritize product ideas
export type ProductIdeaPriority = "now" | "next" | "later";

export interface ProductIdea {
  id: string;
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  tags?: string[];
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

export interface ProductIdeaMetadata {
  tags: string[];
  tagCounts: Record<string, number>;
  statusCounts: Record<ProductIdeaStatus, number>;
  priorityCounts: {
    unassigned: number;
    later: number;
    next: number;
    now: number;
  };
  totalIdeas: number;
  lastUpdated: Timestamp;
}

export interface ProductIdeaFilters {
  status?: ProductIdeaStatus;
  tags?: string;
  priority?: ProductIdeaPriority;
}

export interface ProductIdeaPaginationOptions {
  pageSize: number;
  lastDoc?: DocumentSnapshot;
}
