import {
  QueryDocumentSnapshot,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

export type ProductIdeaStatusFilter = ProductIdeaStatus | "all";

export type ProductIdeaPriority = "now" | "next" | "later";

export interface ProductIdea {
  ideaId: string;
  title: string;
  titleLower?: string;
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
  status?: ProductIdeaStatusFilter;
  ownerId?: string;
  tag?: string;
  priority?: ProductIdeaPriority;
  q?: string;
  archived?: boolean;
}

export type ProductIdeasPageResult = {
  items: ProductIdea[];
  nextCursor: QueryDocumentSnapshot<DocumentData> | null;
};
