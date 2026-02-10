// @/lib/db/productIdeas.ts

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
  onSnapshot,
  orderBy,
  serverTimestamp,
  limit,
  startAfter,
  DocumentSnapshot,
  Query,
  QueryConstraint,
  type Unsubscribe,
} from "firebase/firestore";
import type {
  ProductIdea,
  ProductIdeaNote,
  CreateProductIdeaInput,
  CreateProductIdeaNoteInput,
  ProductIdeaFilters,
  ArchiveFilter,
  UpdateProductIdeaInput,
  UpdateProductIdeaNoteInput,
} from "@/lib/types/productIdeas";

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
// DATA NORMALIZATION (READ-SIDE DEFENSIVE PATTERN)
// ============================================================================

const mapDocToIdea = (snapshot: DocumentSnapshot): ProductIdea => {
  const data = snapshot.data();
  if (!data) throw new Error("Document not found");

  // Normalize data defensively for type safety
  // Protects against schema migrations, manual edits, corrupted data
  return {
    ideaId: snapshot.id,
    title: data.title ?? "",
    summary: data.summary ?? "",
    status: (data.status ?? "draft") as ProductIdea["status"],
    ownerId: data.ownerId ?? "",
    // Optional fields - only include if present
    ...(Array.isArray(data.tags) &&
      data.tags.length > 0 && { tags: data.tags }),
    ...(data.priority && { priority: data.priority }),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    archivedAt: data.archivedAt ?? null,
  } as ProductIdea;
};

const mapDocToNote = (snapshot: DocumentSnapshot): ProductIdeaNote => {
  const data = snapshot.data();
  if (!data) throw new Error("Note document not found");

  return {
    noteId: snapshot.id,
    body: data.body ?? "",
    authorId: data.authorId ?? "",
    authorDisplayName: data.authorDisplayName ?? "Unknown User",
    authorPhotoURL: data.authorPhotoURL ?? null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    archivedAt: data.archivedAt ?? null,
  } as ProductIdeaNote;
};

// ============================================================================
// QUERY BUILDERS
// ============================================================================

export function buildProductIdeasQuery(
  filters: ProductIdeaFilters = {},
  pagination?: { pageSize: number; lastDoc?: DocumentSnapshot },
): Query {
  const constraints: QueryConstraint[] = [];

  // Handle archived filter (defaults to 'exclude')
  const archivedFilter: ArchiveFilter = filters.archived ?? "exclude";

  if (archivedFilter === "exclude") {
    constraints.push(where("archivedAt", "==", null));
  } else if (archivedFilter === "only") {
    constraints.push(where("archivedAt", "!=", null));
  }
  // 'include' = no filter, show everything

  // Other filters
  if (filters.status) constraints.push(where("status", "==", filters.status));
  if (filters.ownerId)
    constraints.push(where("ownerId", "==", filters.ownerId));
  if (filters.tags)
    constraints.push(where("tags", "array-contains", filters.tags));
  if (filters.priority)
    constraints.push(where("priority", "==", filters.priority));

  constraints.push(orderBy("updatedAt", "desc"));

  if (pagination) {
    // Fetch one extra to determine if there's a next page
    constraints.push(limit(pagination.pageSize + 1));
    if (pagination.lastDoc) constraints.push(startAfter(pagination.lastDoc));
  }

  return query(productIdeasCol(), ...constraints);
}

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
// SUBSCRIPTION OPERATIONS - PRODUCT IDEAS AND NOTES
// ============================================================================
export function subscribeToActiveIdeas(
  onNext: (ideas: ProductIdea[]) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  // Active ideas: archivedAt == null, newest updated first
  const q = query(
    productIdeasCol(),
    where("archivedAt", "==", null),
    orderBy("updatedAt", "desc"),
  );

  // onSnapshot gives initial results immediately, then updates on changes :contentReference[oaicite:8]{index=8}
  return onSnapshot(
    q,
    (snap) => {
      const ideas = snap.docs.map((d) => mapDocToIdea(d));
      onNext(ideas);
    },
    (err) => onError?.(err),
  );
}

export function subscribeToIdeaById(
  id: string,
  onNext: (idea: ProductIdea | null) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  const ref = productIdeaDoc(id);

  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onNext(null);
        return;
      }
      onNext(mapDocToIdea(snap));
    },
    (err) => onError?.(err),
  );
}

export function subscribeToActiveFilteredIdeas(
  filters: ProductIdeaFilters,
  onNext: (ideas: ProductIdea[]) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  const constraints: QueryConstraint[] = [];

  // Always exclude archived in the "active" subscription
  constraints.push(where("archivedAt", "==", null));

  // Apply optional filters
  if (filters.status) constraints.push(where("status", "==", filters.status));
  if (filters.ownerId)
    constraints.push(where("ownerId", "==", filters.ownerId));
  if (filters.tags)
    constraints.push(where("tags", "array-contains", filters.tags));
  if (filters.priority)
    constraints.push(where("priority", "==", filters.priority));

  constraints.push(orderBy("updatedAt", "desc"));

  const q = query(productIdeasCol(), ...constraints);

  return onSnapshot(
    q,
    (snap) => onNext(snap.docs.map((d) => mapDocToIdea(d))),
    (err) => onError?.(err),
  );
}

export function subscribeToArchivedIdeas(
  onNext: (ideas: ProductIdea[]) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  const q = query(
    productIdeasCol(),
    where("archivedAt", "!=", null),
    orderBy("archivedAt", "desc"),
  );

  return onSnapshot(
    q,
    (snap) => onNext(snap.docs.map((d) => mapDocToIdea(d))),
    (err) => onError?.(err),
  );
}

export function subscribeToActiveIdeaNotes(
  ideaId: string,
  onNext: (ideaNotes: ProductIdeaNote[]) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  // Active ideas: archivedAt == null, newest updated first
  const q = query(
    productIdeaNotesCol(ideaId),
    where("archivedAt", "==", null),
    orderBy("createdAt", "asc"),
  );

  // onSnapshot gives initial results immediately, then updates on changes :contentReference[oaicite:8]{index=8}
  return onSnapshot(
    q,
    (snap) => {
      const ideaNotes = snap.docs.map((d) => mapDocToNote(d));
      onNext(ideaNotes);
    },
    (err) => onError?.(err),
  );
}

export function subscribeToIdeaNoteById(
  ideaId: string,
  noteId: string,
  onNext: (ideaNote: ProductIdeaNote | null) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  const ref = productIdeaNoteDoc(ideaId, noteId);

  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onNext(null);
        return;
      }
      onNext(mapDocToNote(snap));
    },
    (err) => onError?.(err),
  );
}

export function subscribeToArchivedIdeaNotes(
  ideaId: string,
  onNext: (notes: ProductIdeaNote[]) => void,
  onError?: (err: unknown) => void,
): Unsubscribe {
  const q = query(
    productIdeaNotesCol(ideaId),
    where("archivedAt", "!=", null),
    orderBy("archivedAt", "desc"),
  );

  return onSnapshot(
    q,
    (snap) => onNext(snap.docs.map((d) => mapDocToNote(d))),
    (err) => onError?.(err),
  );
}

/**
 * Optional: "presence" / debug ping — lets you see realtime in action by changing updatedAt.
 * Useful for testing in two tabs.
 */
export async function touchIdea(id: string) {
  const ref = productIdeaDoc(id);
  return updateDoc(ref, { updatedAt: serverTimestamp() });
}

export async function touchIdeaNote(ideaId: string, noteId: string) {
  const ref = productIdeaNoteDoc(ideaId, noteId);
  return updateDoc(ref, { updatedAt: serverTimestamp() });
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

export async function getAllProductIdeas(
  includeArchived: boolean = false,
): Promise<ProductIdea[]> {
  const q = includeArchived
    ? query(productIdeasCol(), orderBy("updatedAt", "desc"))
    : query(
        productIdeasCol(),
        where("archivedAt", "==", null),
        orderBy("updatedAt", "desc"),
      );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getActiveProductIdeas(): Promise<ProductIdea[]> {
  return getAllProductIdeas(false);
}

export async function getArchivedProductIdeas(): Promise<ProductIdea[]> {
  const q = query(
    productIdeasCol(),
    where("archivedAt", "!=", null),
    orderBy("archivedAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByStatus(
  status: ProductIdea["status"],
  includeArchived: boolean = false,
): Promise<ProductIdea[]> {
  const constraints: QueryConstraint[] = [where("status", "==", status)];

  if (!includeArchived) {
    constraints.push(where("archivedAt", "==", null));
  }

  constraints.push(orderBy("updatedAt", "desc"));

  const q = query(productIdeasCol(), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByOwner(
  ownerId: string,
  includeArchived: boolean = false,
): Promise<ProductIdea[]> {
  const constraints: QueryConstraint[] = [where("ownerId", "==", ownerId)];

  if (!includeArchived) {
    constraints.push(where("archivedAt", "==", null));
  }

  constraints.push(orderBy("updatedAt", "desc"));

  const q = query(productIdeasCol(), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToIdea);
}

export async function getProductIdeasByTag(
  tag: string,
  includeArchived: boolean = false,
): Promise<ProductIdea[]> {
  const constraints: QueryConstraint[] = [where("tags", "array-contains", tag)];

  if (!includeArchived) {
    constraints.push(where("archivedAt", "==", null));
  }

  constraints.push(orderBy("updatedAt", "desc"));

  const q = query(productIdeasCol(), ...constraints);
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
    archivedAt: null,
  };

  return await addDoc(productIdeasCol(), docData);
}

export async function updateProductIdea(
  ideaId: string,
  updates: UpdateProductIdeaInput,
) {
  const updateData = {
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.summary !== undefined && { summary: updates.summary }),
    ...(updates.status !== undefined && { status: updates.status }),
    ...(updates.tags !== undefined && { tags: updates.tags }),
    ...(updates.priority !== undefined && { priority: updates.priority }),

    updatedAt: serverTimestamp(),
  };

  await updateDoc(productIdeaDoc(ideaId), updateData);
}

export async function archiveProductIdea(ideaId: string) {
  await updateDoc(productIdeaDoc(ideaId), {
    archivedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function unarchiveProductIdea(ideaId: string) {
  await updateDoc(productIdeaDoc(ideaId), {
    archivedAt: null,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProductIdea(ideaId: string) {
  // Hard delete - prefer archiveProductIdea()
  // Consider: Should we also delete subcollection notes?
  await deleteDoc(productIdeaDoc(ideaId));
}

// ============================================================================
// READ OPERATIONS - NOTES
// ============================================================================

export async function getProductIdeaNotes(
  ideaId: string,
  includeArchived = false,
): Promise<ProductIdeaNote[]> {
  const constraints: QueryConstraint[] = [];

  if (!includeArchived) {
    constraints.push(where("archivedAt", "==", null));
  }

  constraints.push(orderBy("createdAt", "desc"));

  const q = query(productIdeaNotesCol(ideaId), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDocToNote);
}

// ============================================================================
// WRITE OPERATIONS - NOTES
// ============================================================================

export async function createProductIdeaNote(
  ideaId: string,
  input: CreateProductIdeaNoteInput,
  uid: string,
) {
  const docData = {
    body: input.body,
    authorId: uid,
    authorDisplayName: input.authorDisplayName,
    ...(input.authorPhotoURL && { authorPhotoURL: input.authorPhotoURL }),

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    archivedAt: null,
  };

  return addDoc(productIdeaNotesCol(ideaId), docData);
}

export async function updateProductIdeaNote(
  ideaId: string,
  noteId: string,
  updates: UpdateProductIdeaNoteInput,
) {
  const updateData = {
    ...(updates.body !== undefined && { body: updates.body }),
    updatedAt: serverTimestamp(),
  };

  await updateDoc(productIdeaNoteDoc(ideaId, noteId), updateData);
}

export async function archiveProductIdeaNote(ideaId: string, noteId: string) {
  await updateDoc(productIdeaNoteDoc(ideaId, noteId), {
    archivedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function unarchiveProductIdeaNote(ideaId: string, noteId: string) {
  await updateDoc(productIdeaNoteDoc(ideaId, noteId), {
    archivedAt: null,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProductIdeaNote(ideaId: string, noteId: string) {
  await deleteDoc(productIdeaNoteDoc(ideaId, noteId));
}
