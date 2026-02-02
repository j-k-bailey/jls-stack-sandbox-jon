import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRODUCT_IDEA_NOTES } from "@/constants/productIdeaNotes";

export async function seedProductIdeaNotes() {
  for (const [ideaId, notes] of Object.entries(PRODUCT_IDEA_NOTES)) {
    const notesColRef = collection(db, "productIdeas", ideaId, "notes");

    const existing = await getDocs(notesColRef);

    // Simple idempotency guard
    if (!existing.empty) continue;

    for (const note of notes) {
      await addDoc(notesColRef, {
        ...note,
        createdAt: serverTimestamp(),
      });
    }
  }
}
