import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export async function signIn() {
  const auth = getAuth();
  await signInWithPopup(auth, provider);
}

export async function signOutUser() {
  const auth = getAuth();
  await signOut(auth);
}
