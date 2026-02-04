import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { createOrUpdateUserProfile } from "@/lib/firestore/users";

const provider = new GoogleAuthProvider();

export async function signIn() {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);

  // Create/update user profile after successful sign-in
  if (result.user) {
    await createOrUpdateUserProfile(result.user);
  }

  return result.user;
}

export async function signOutUser() {
  const auth = getAuth();
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  const auth = getAuth();
  return auth.currentUser;
}
