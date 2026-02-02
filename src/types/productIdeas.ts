import { Timestamp } from "firebase/firestore";

export type ProductIdeaStatus = "draft" | "active" | "paused" | "shipped";

// Added Priority with "now", "next", "later" as a way to allow owners to loosely prioritize product ideas
export type ProductIdeaPriority = "now" | "next" | "later";

export interface ProductIdea {
  id: string;
  title: string;
  summary: string;
  status: ProductIdeaStatus;
  tags: string[];
  priority: ProductIdeaPriority;
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductIdeaNote {
  id: string;
  body: string;
  authorId: string;
  createdAt: Timestamp;
}
