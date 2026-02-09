// @/lib/types/productIdeas.ts

import { Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

export type ProductIdeaPriority = "now" | "next" | "later";

export type ArchiveFilter = "exclude" | "include" | "only";

export interface ProductIdea {
  ideaId: string;
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
  noteId: string;
  body: string;
  authorId: string;
  authorDisplayName: string;
  authorPhotoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  archivedAt?: Timestamp | null;
}

export type CreateProductIdeaInput = Omit<
  ProductIdea,
  "ideaId" | "ownerId" | "createdAt" | "updatedAt" | "archivedAt"
>;

export type UpdateProductIdeaInput = Partial<
  Omit<
    ProductIdea,
    "ideaId" | "ownerId" | "createdAt" | "updatedAt" | "archivedAt"
  >
>;

export type CreateProductIdeaNoteInput = Omit<
  ProductIdeaNote,
  "noteId" | "authorId" | "createdAt" | "updatedAt" | "archivedAt"
>;

export type UpdateProductIdeaNoteInput = Partial<
  Omit<
    ProductIdeaNote,
    "noteId" | "authorId" | "createdAt" | "updatedAt" | "archivedAt"
  >
>;

export interface ProductIdeaFilters {
  status?: ProductIdeaStatus;
  ownerId?: string;
  tags?: string;
  priority?: ProductIdeaPriority;
  archived?: ArchiveFilter;
}
