import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  PRODUCT_IDEAS,
  PRODUCT_IDEA_NOTES,
  getIdeaSlug,
} from "@/constants/productIdeas";

export async function seedProductIdeas(
  currentUserId: string,
  authorDisplayName: string = "Seed User",
  authorPhotoURL: string | null = null,
): Promise<{
  ideasCreated: number;
  notesCreated: number;
}> {
  const colRef = collection(db, "productIdeas");
  const seededIdeas = new Map<string, string>(); // slug -> ideaId

  let ideasCreated = 0;
  let notesCreated = 0;

  // Seed Product Ideas
  for (const idea of PRODUCT_IDEAS) {
    const docData = {
      title: idea.title,
      summary: idea.summary,
      status: idea.status,
      tags: idea.tags || [],
      priority: idea.priority,
      ownerId: currentUserId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      archivedAt: null,
    };

    const docRef = await addDoc(colRef, docData);
    const slug = getIdeaSlug(idea.title);
    seededIdeas.set(slug, docRef.id);
    ideasCreated++;
  }

  // Seed Notes for Each Idea
  for (const [slug, notes] of Object.entries(PRODUCT_IDEA_NOTES)) {
    const ideaId = seededIdeas.get(slug);
    if (!ideaId) {
      console.warn(`No idea found for slug: ${slug}`);
      continue;
    }

    const notesColRef = collection(db, "productIdeas", ideaId, "notes");

    for (const note of notes) {
      await addDoc(notesColRef, {
        body: note.body,
        authorId: currentUserId,
        authorDisplayName,
        authorPhotoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        archivedAt: null,
      });
      notesCreated++;
    }
  }

  return { ideasCreated, notesCreated };
}
