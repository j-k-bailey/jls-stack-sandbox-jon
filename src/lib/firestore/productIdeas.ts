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
  CreateProductIdeaInput,
  ProductIdeaFilters,
} from "@/types/productIdeas";

// ============================================================================
// COLLECTION REFERENCES
// ============================================================================

export const productIdeasCol = () => collection(db, "productIdeas");
export const productIdeaDoc = (id: string) => doc(db, "productIdeas", id);
export const productIdeaNotesCol = (ideaId: string) =>
  collection(db, "productIdeas", ideaId, "notes");
export const productIdeaNoteDoc = (ideaId: string, noteId: string) =>
  doc(db, "productIdeas", ideaId, "notes", noteId);

// ============================================================================
// QUERY BUILDERS
// ============================================================================

export function buildProductIdeasQuery(
  filters: ProductIdeaFilters = {},
  pagination?: { pageSize: number; lastDoc?: DocumentSnapshot },
): Query {
  const constraints: QueryConstraint[] = [];

  if (filters.status) constraints.push(where("status", "==", filters.status));
  if (filters.ownerId)
    constraints.push(where("ownerId", "==", filters.ownerId));
  if (filters.tags)
    constraints.push(where("tags", "array-contains", filters.tags));
  if (filters.priority)
    constraints.push(where("priority", "==", filters.priority));

  constraints.push(orderBy("createdAt", "desc"));

  if (pagination) {
    // Fetch one extra to determine if there's a next page
    constraints.push(limit(pagination.pageSize + 1));
    if (pagination.lastDoc) constraints.push(startAfter(pagination.lastDoc));
  }

  return query(productIdeasCol(), ...constraints);
}

// ============================================================================
// DATA MAPPERS
// ============================================================================

const mapDocToIdea = (snapshot: DocumentSnapshot): ProductIdea => {
  const data = snapshot.data();
  if (!data) throw new Error("Document not found");
  return { id: snapshot.id, ...data } as ProductIdea;
};

const mapDocToNote = (snapshot: DocumentSnapshot): ProductIdeaNote => {
  const data = snapshot.data();
  if (!data) throw new Error("Note document not found");
  return { id: snapshot.id, ...data } as ProductIdeaNote;
};

// ============================================================================
// PAGINATED EXECUTOR
// ============================================================================

export async function executeProductIdeasQueryPaginated(
  q: Query,
  pageSize: number,
): Promise<{
  ideas: ProductIdea[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}> {
  const snapshot = await getDocs(q);
  const hasMore = snapshot.docs.length > pageSize;
  const docs = hasMore ? snapshot.docs.slice(0, pageSize) : snapshot.docs;

  return {
    ideas: docs.map(mapDocToIdea),
    lastDoc: docs[docs.length - 1] ?? null,
    hasMore,
  };
}

// ============================================================================
// READ OPERATIONS - PRODUCT IDEAS
// ============================================================================

export async function getProductIdea(
  ideaId: string,
): Promise<ProductIdea | null> {
  const snap = await getDoc(productIdeaDoc(ideaId));
  return snap.exists() ? mapDocToIdea(snap) : null;
}

export async function getAllProductIdeas(): Promise<ProductIdea[]> {
  const q = query(productIdeasCol(), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByStatus(
  status: ProductIdea["status"],
): Promise<ProductIdea[]> {
  const q = query(
    productIdeasCol(),
    where("status", "==", status),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByOwner(
  ownerId: string,
): Promise<ProductIdea[]> {
  const q = query(
    productIdeasCol(),
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByTag(
  tag: string,
): Promise<ProductIdea[]> {
  const q = query(
    productIdeasCol(),
    where("tags", "array-contains", tag),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getFilteredProductIdeas(
  filters: ProductIdeaFilters,
): Promise<ProductIdea[]> {
  const q = buildProductIdeasQuery(filters);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasPaginated(
  pageSize: number,
  lastDoc?: DocumentSnapshot,
  filters?: ProductIdeaFilters,
) {
  const q = buildProductIdeasQuery(filters, { pageSize, lastDoc });
  return executeProductIdeasQueryPaginated(q, pageSize);
}

// ============================================================================
// WRITE OPERATIONS - PRODUCT IDEAS
// ============================================================================

export async function createProductIdea(
  input: CreateProductIdeaInput,
  userId: string,
) {
  const docData = {
    title: input.title,
    summary: input.summary,
    status: input.status ?? "draft",
    ownerId: userId,
    ...(input.tags && { tags: input.tags }),
    ...(input.priority && { priority: input.priority }),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return await addDoc(productIdeasCol(), docData);
}

export async function updateProductIdea(
  ideaId: string,
  ownerId: string,
  updates: Partial<
    Pick<ProductIdea, "title" | "summary" | "status" | "tags" | "priority">
  >,
) {
  await updateDoc(productIdeaDoc(ideaId), {
    ...updates,
    ownerId,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProductIdea(ideaId: string) {
  await deleteDoc(productIdeaDoc(ideaId));
}

// ============================================================================
// READ OPERATIONS - NOTES
// ============================================================================

export async function getProductIdeaNotes(
  ideaId: string,
): Promise<ProductIdeaNote[]> {
  const q = query(productIdeaNotesCol(ideaId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToNote);
}

// ============================================================================
// WRITE OPERATIONS - NOTES
// ============================================================================

export async function createProductIdeaNote(
  ideaId: string,
  body: string,
  authorId: string,
) {
  return await addDoc(productIdeaNotesCol(ideaId), {
    body,
    authorId,
    createdAt: serverTimestamp(),
  });
}

export async function deleteProductIdeaNote(ideaId: string, noteId: string) {
  await deleteDoc(productIdeaNoteDoc(ideaId, noteId));
}
