import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export async function signIn() {
  const auth = getAuth();

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  if (!user) throw new Error("Sign in exception: No user");
  await user.getIdToken(true);
  const tokenResult = await user.getIdTokenResult(true);

  console.log("##########################################");

  console.log("CLAIMS:", tokenResult.claims);
  console.log("##########################################");
}

export async function signOutUser() {
  const auth = getAuth();
  await signOut(auth);
}
