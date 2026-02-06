import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import type { UserProfile, UserRole, UserCustomClaims } from "@/lib/types/user";
import { db } from "@/lib/firebase";

// ============================================================================
// COLLECTION REFERENCES
// ============================================================================

export function usersCol() {
  return collection(db, "users");
}

export function userDoc(userId: string) {
  return doc(db, "users", userId);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function parseDisplayName(displayName: string | null): {
  firstName: string;
  lastNameInitial: string;
} {
  if (!displayName) {
    return { firstName: "User", lastNameInitial: "" };
  }

  const parts = displayName.trim().split(" ");
  const firstName = parts[0] || "User";
  const lastName = parts[parts.length - 1];
  const lastNameInitial =
    lastName && lastName !== firstName ? lastName[0].toUpperCase() : "";

  return { firstName, lastNameInitial };
}

// ============================================================================
// USER PROFILE OPERATIONS
// ============================================================================

/**
 * Create or update user profile on sign-in
 * Cloud Function will automatically sync custom claims
 */
export async function createOrUpdateUserProfile(user: User): Promise<void> {
  const userRef = userDoc(user.uid);
  const userSnap = await getDoc(userRef);
  const { firstName, lastNameInitial } = parseDisplayName(user.displayName);

  if (!userSnap.exists()) {
    // New user - create profile with viewer role by default
    const newProfile: UserProfile = {
      firstName,
      lastNameInitial,
      role: "viewer",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, newProfile);

    // Force token refresh to get claims from Cloud Function
    await user.getIdToken(true);
  } else {
    // Existing user - update name if changed
    const existing = userSnap.data();

    if (
      existing.firstName !== firstName ||
      existing.lastNameInitial !== lastNameInitial
    ) {
      await updateDoc(userRef, {
        firstName,
        lastNameInitial,
        updatedAt: serverTimestamp(),
      });
    }
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userSnap = await getDoc(userDoc(uid));

  if (!userSnap.exists()) return null;

  const data = userSnap.data();
  return {
    firstName: data.firstName,
    lastNameInitial: data.lastNameInitial,
    role: data.role,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * Get user's custom claims from their Firebase Auth token
 * These are FREE to access (no Firestore reads)
 */
export async function getUserCustomClaims(
  user: User,
): Promise<UserCustomClaims | null> {
  const idTokenResult = await user.getIdTokenResult();
  const claims = idTokenResult.claims;

  if (!claims.role) return null;

  return {
    role: claims.role as UserRole,
  };
}

/**
 * Force refresh user's ID token to get updated custom claims
 * Call this after an admin updates a user's role
 */
export async function refreshUserToken(user: User): Promise<void> {
  await user.getIdToken(true);
}

// ============================================================================
// ADMIN OPERATIONS
// ============================================================================

/**
 * Admin function to update user role
 * Cloud Function will automatically sync custom claims
 */
export async function updateUserRole(
  uid: string,
  role: UserRole,
): Promise<void> {
  await updateDoc(userDoc(uid), {
    role,
    updatedAt: serverTimestamp(),
  });
  // Custom claims will be synced by Cloud Function
}
