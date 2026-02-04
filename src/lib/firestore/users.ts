import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import type {
  UserProfile,
  UserPrimaryRoles,
  UserPermissionOverrides,
} from "@/types/user";
import { db } from "@/lib/firebase";

// Collection reference
export function usersCol() {
  return collection(db, "users");
}

// Helper to parse name from Google account
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

// Create or update user profile on sign-in
export async function createOrUpdateUserProfile(user: User): Promise<void> {
  console.log("createOrUpdateUserProfile: Starting for", user.uid);

  const userRef = doc(db, "users", user.uid);

  try {
    console.log("createOrUpdateUserProfile: Checking if profile exists");
    const userSnap = await getDoc(userRef);
    console.log("Yes, we got the userSnap.");
    console.log(
      "createOrUpdateUserProfile: Profile exists?",
      userSnap.exists(),
    );

    const { firstName, lastNameInitial } = parseDisplayName(user.displayName);
    console.log("createOrUpdateUserProfile: Parsed name", {
      firstName,
      lastNameInitial,
    });

    if (!userSnap.exists()) {
      console.log("createOrUpdateUserProfile: Creating new profile");
      const newProfile = {
        firstName,
        lastNameInitial,
        role: "viewer" as UserPrimaryRoles,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      console.log("createOrUpdateUserProfile: New profile data", newProfile);

      await setDoc(userRef, newProfile);
      console.log("createOrUpdateUserProfile: Profile created successfully");
    } else {
      console.log(
        "createOrUpdateUserProfile: Profile exists, checking for updates",
      );
      const existing = userSnap.data();
      if (
        existing.firstName !== firstName ||
        existing.lastNameInitial !== lastNameInitial
      ) {
        console.log("createOrUpdateUserProfile: Updating name");
        await updateDoc(userRef, {
          firstName,
          lastNameInitial,
          updatedAt: serverTimestamp(),
        });
        console.log("createOrUpdateUserProfile: Name updated");
      } else {
        console.log("createOrUpdateUserProfile: No updates needed");
      }
    }
  } catch (error) {
    console.error("createOrUpdateUserProfile: Error", error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const data = userSnap.data();
  return {
    firstName: data.firstName,
    lastNameInitial: data.lastNameInitial,
    role: data.role,
    permissions: data.permissions,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

// Admin function to update user role
export async function updateUserRole(
  uid: string,
  role: UserPrimaryRoles,
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    role,
    updatedAt: serverTimestamp(),
  });
}

// Admin function to set permission overrides
export async function updateUserPermissions(
  uid: string,
  permissions: UserPermissionOverrides,
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    permissions,
    updatedAt: serverTimestamp(),
  });
}

// Check if user has a specific permission
export function checkPermission(
  userProfile: UserProfile,
  permission: keyof UserPermissionOverrides,
): boolean {
  // Check override first
  if (userProfile.permissions?.[permission] !== undefined) {
    return userProfile.permissions[permission]!;
  }

  // Fall back to role-based permissions
  const rolePermissions: Record<
    UserPrimaryRoles,
    Set<keyof UserPermissionOverrides>
  > = {
    viewer: new Set(["canView"]),
    contributor: new Set(["canView", "canCreate", "canEditOwn"]),
    moderator: new Set([
      "canView",
      "canCreate",
      "canEditOwn",
      "canEditAny",
      "canDeleteAny",
    ]),
    admin: new Set([
      "canView",
      "canCreate",
      "canEditOwn",
      "canEditAny",
      "canDeleteAny",
    ]),
  };

  return rolePermissions[userProfile.role].has(permission);
}
