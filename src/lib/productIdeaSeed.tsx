import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRODUCT_IDEAS, PRODUCT_IDEA_NOTES } from "@/constants/productIdeas";

export async function seedProductIdeas(currentUserId: string) {
  const colRef = collection(db, "productIdeas");
  const seededIdeas = new Map<string, string>(); // slugTitle -> docId

  for (const idea of PRODUCT_IDEAS) {
    const docData = {
      title: idea.title,
      summary: idea.summary,
      status: idea.status,
      tags: idea.tags || [],
      priority: idea.priority,
      ownerId: currentUserId, // Use current user
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(colRef, docData);

    // Create slug for mapping to notes
    const slug = idea.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    seededIdeas.set(slug, docRef.id);
  }

  // Seed notes for each idea
  for (const [slug, notes] of Object.entries(PRODUCT_IDEA_NOTES)) {
    const ideaId = seededIdeas.get(slug);
    if (!ideaId) continue;

    const notesColRef = collection(db, "productIdeas", ideaId, "notes");

    // Check if notes already exist
    const existing = await getDocs(notesColRef);
    if (!existing.empty) continue;

    for (const note of notes) {
      await addDoc(notesColRef, {
        body: note.body,
        authorId: currentUserId, // Use current user for notes too
        createdAt: serverTimestamp(),
      });
    }
  }
}
