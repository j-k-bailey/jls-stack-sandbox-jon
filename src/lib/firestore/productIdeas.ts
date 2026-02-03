import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  startAfter,
  DocumentSnapshot,
  Query,
  QueryConstraint,
} from "firebase/firestore";
import type {
  ProductIdea,
  ProductIdeaNote,
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/types/productIdeas";

export interface ProductIdeaFilters {
  status?: ProductIdeaStatus;
  ownerId?: string;
  tag?: string;
  priority?: ProductIdeaPriority;
}

// ============================================================================
// COLLECTION REFERENCES
// ============================================================================

export function productIdeasCol() {
  return collection(db, "productIdeas");
}

export function productIdeaDoc(ideaId: string) {
  return doc(db, "productIdeas", ideaId);
}

export function productIdeaNotesCol(ideaId: string) {
  return collection(db, "productIdeas", ideaId, "notes");
}

export function productIdeaNoteDoc(ideaId: string, noteId: string) {
  return doc(db, "productIdeas", ideaId, "notes", noteId);
}

// ============================================================================
// QUERY BUILDERS - Pure functions that build queries without executing them
// ============================================================================

export function buildProductIdeasQuery(
  filters: ProductIdeaFilters = {},
  pagination?: { pageSize: number; lastDoc?: DocumentSnapshot },
): Query {
  const constraints: QueryConstraint[] = [];

  // Apply filters
  if (filters.status) {
    constraints.push(where("status", "==", filters.status));
  }
  if (filters.ownerId) {
    constraints.push(where("ownerId", "==", filters.ownerId));
  }
  if (filters.tag) {
    constraints.push(where("tags", "array-contains", filters.tag));
  }
  if (filters.priority) {
    constraints.push(where("priority", "==", filters.priority));
  }

  constraints.push(orderBy("createdAt", "desc"));

  // Apply pagination
  if (pagination) {
    constraints.push(limit(pagination.pageSize + 1));
    if (pagination.lastDoc) {
      constraints.push(startAfter(pagination.lastDoc));
    }
  }

  return query(productIdeasCol(), ...constraints);
}

export function buildProductIdeaNotesQuery(ideaId: string): Query {
  return query(productIdeaNotesCol(ideaId), orderBy("createdAt", "desc"));
}

// ============================================================================
// DATA MAPPERS - Transform Firestore docs to typed objects
// ============================================================================

function mapDocToProductIdea(doc: DocumentSnapshot): ProductIdea {
  return {
    id: doc.id,
    ...doc.data(),
  } as ProductIdea;
}

function mapDocToProductIdeaNote(doc: DocumentSnapshot): ProductIdeaNote {
  return {
    id: doc.id,
    ...doc.data(),
  } as ProductIdeaNote;
}

// ============================================================================
// DATA FETCHERS - Execute queries and return typed data
// ============================================================================

export async function executeProductIdeasQuery(
  q: Query,
): Promise<ProductIdea[]> {
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToProductIdea);
}

export async function executeProductIdeaNotesQuery(
  q: Query,
): Promise<ProductIdeaNote[]> {
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToProductIdeaNote);
}

export async function executeProductIdeasQueryPaginated(
  q: Query,
  pageSize: number,
): Promise<{
  ideas: ProductIdea[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}> {
  const snapshot = await getDocs(q);

  // If more docs than pageSize, there are more pages
  const hasMore = snapshot.docs.length > pageSize;

  // Only return pageSize items (trim the extra one)
  const docs = hasMore ? snapshot.docs.slice(0, pageSize) : snapshot.docs;

  return {
    ideas: docs.map(mapDocToProductIdea),
    lastDoc: docs[docs.length - 1] ?? null,
    hasMore,
  };
}

// ============================================================================
// CONVENIENCE FUNCTIONS - Simplified API for common operations
// ============================================================================

export async function getProductIdea(
  ideaId: string,
): Promise<ProductIdea | null> {
  const docSnap = await getDoc(productIdeaDoc(ideaId));
  return docSnap.exists() ? mapDocToProductIdea(docSnap) : null;
}

export async function getAllProductIdeas(): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery());
}

export async function getProductIdeasByPriority(
  priority: ProductIdeaPriority,
): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery({ priority }));
}

export async function getProductIdeasByStatus(
  status: ProductIdeaStatus,
): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery({ status }));
}

export async function getProductIdeasByOwner(
  ownerId: string,
): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery({ ownerId }));
}

export async function getProductIdeasByTag(
  tag: string,
): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery({ tag }));
}

export async function getFilteredProductIdeas(
  filters: ProductIdeaFilters = {},
): Promise<ProductIdea[]> {
  return executeProductIdeasQuery(buildProductIdeasQuery(filters));
}

export async function getProductIdeasPaginated(
  pageSize: number,
  lastDoc?: DocumentSnapshot,
  filters?: ProductIdeaFilters,
): Promise<{
  ideas: ProductIdea[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}> {
  const q = buildProductIdeasQuery(filters, { pageSize, lastDoc });
  return executeProductIdeasQueryPaginated(q, pageSize);
}

export async function getProductIdeaNotes(
  ideaId: string,
): Promise<ProductIdeaNote[]> {
  return executeProductIdeaNotesQuery(buildProductIdeaNotesQuery(ideaId));
}

// ============================================================================
// WRITE OPERATIONS
// ============================================================================

export async function createProductIdea(input: {
  title: string;
  summary: string;
  status?: ProductIdeaStatus;
  tags?: string[];
  priority?: ProductIdeaPriority;
  ownerId: string;
}) {
  const docRef = await addDoc(productIdeasCol(), {
    title: input.title,
    summary: input.summary,
    status: input.status ?? "draft",
    tags: input.tags ?? [],
    ownerId: input.ownerId,
    priority: input.priority ?? "later",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function createProductIdeaNote(
  ideaId: string,
  input: { body: string; authorId: string },
) {
  const docRef = await addDoc(productIdeaNotesCol(ideaId), {
    body: input.body,
    authorId: input.authorId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProductIdea(
  ideaId: string,
  updates: Partial<Pick<ProductIdea, "title" | "summary" | "status" | "tags">>,
) {
  await updateDoc(productIdeaDoc(ideaId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProductIdea(ideaId: string) {
  await deleteDoc(productIdeaDoc(ideaId));
}

export async function deleteProductIdeaNote(ideaId: string, noteId: string) {
  await deleteDoc(productIdeaNoteDoc(ideaId, noteId));
}
