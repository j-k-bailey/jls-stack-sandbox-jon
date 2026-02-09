// @/lib/types/productIdeas.ts

import { Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

export type ProductIdeaPriority = "low" | "medium" | "high" | "critical";

export type ArchiveFilter = "exclude" | "include" | "only";

export interface ProductIdea {
  id: string;
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  ownerId: string;
  tags?: string[];
  priority?: ProductIdeaPriority;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  archivedAt?: Timestamp | null;
}

export interface ProductIdeaNote {
  id: string;
  body: string;
  authorId: string;
  authorDisplayName: string;
  authorPhotoURL: string | null;
  createdAt: Timestamp;
}

export interface CreateProductIdeaNoteInput {
  body: string;
  authorId: string;
  authorDisplayName: string;
  authorPhotoURL?: string | null;
}

export interface CreateProductIdeaInput {
  title: string;
  summary: string;
  status?: ProductIdeaStatus;
  tags?: string[];
  priority?: ProductIdeaPriority;
}

export interface ProductIdeaFilters {
  status?: ProductIdeaStatus;
  ownerId?: string;
  tags?: string;
  priority?: ProductIdeaPriority;
  archived?: ArchiveFilter;
}
