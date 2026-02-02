import { type ProductIdeaPriority } from "@/types/productIdeas";
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
  Timestamp,
} from "firebase/firestore";
import type {
  ProductIdea,
  ProductIdeaNote,
  ProductIdeaStatus,
  ProductIdeaPriority,
} from "@/types/productIdeas";

// Collection references
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

// Create a new product idea
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

// Create a new note for an idea
export async function createProductIdeaNote(
  ideaId: string,
  input: {
    body: string;
    authorId: string;
  },
) {
  const docRef = await addDoc(productIdeaNotesCol(ideaId), {
    body: input.body,
    authorId: input.authorId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get a single product idea by ID
export async function getProductIdea(
  ideaId: string,
): Promise<ProductIdea | null> {
  const docSnap = await getDoc(productIdeaDoc(ideaId));

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as ProductIdea;
}

// Get all product ideas
export async function getAllProductIdeas(): Promise<ProductIdea[]> {
  const q = query(productIdeasCol(), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductIdea[];
}

// Get all product ideas of a set priority
export async function getAllProductIdeasByPriority(
  priority: ProductIdeaPriority,
): Promise<ProductIdea[]> {
  const q = query(productIdeasCol(), where("priority", "==", priority));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductIdea[];
}

// Get notes for a specific idea
export async function getProductIdeaNotes(
  ideaId: string,
): Promise<ProductIdeaNote[]> {
  const q = query(productIdeaNotesCol(ideaId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductIdeaNote[];
}

// Update a product idea
export async function updateProductIdea(
  ideaId: string,
  updates: Partial<Pick<ProductIdea, "title" | "summary" | "status" | "tags">>,
) {
  await updateDoc(productIdeaDoc(ideaId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

// Delete a product idea. NOTE: ONLY deletes the product idea, as intended behavior. Children persist but become orphaned.  For production apps, you'd want to delete all notes first, or use a Cloud Function to handle cascading deletes. For now, be aware of this behavior.
export async function deleteProductIdea(ideaId: string) {
  await deleteDoc(productIdeaDoc(ideaId));
}

// Delete a note
export async function deleteProductIdeaNote(ideaId: string, noteId: string) {
  await deleteDoc(productIdeaNoteDoc(ideaId, noteId));
}
