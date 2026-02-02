import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PRODUCT_IDEAS } from "@/constants/productIdeas";

export async function seedProductIdeas() {
  const colRef = collection(db, "productIdeas");

  for (const idea of PRODUCT_IDEAS) {
    const { title, summary, status, tags, ownerId } = idea;

    const docId = idea.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const docRef = doc(colRef, docId);

    const existing = await getDoc(docRef);

    if (!existing.exists()) {
      await setDoc(docRef, {
        ...idea,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(
        docRef,
        {
          title,
          summary,
          status,
          tags,
          ownerId,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }
  }
}
