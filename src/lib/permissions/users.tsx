import type { UserRole } from "@/lib/types/user";

/**
 * USER PROFILES
 */

export function canReadUserProfile(isSignedIn: boolean) {
  return isSignedIn;
}

/**
 * Users can create their *own* profile once, with viewer role
 */
export function canCreateUserProfile(
  isSignedIn: boolean,
  authUid: string | undefined,
  userId: string,
  role: UserRole,
) {
  return isSignedIn && authUid === userId && role === "viewer";
}

/**
 * Only admins can update user profiles (including role changes)
 */
export function canUpdateUserProfile(role?: UserRole) {
  return role === "admin";
}

/**
 * Nobody can delete user profiles
 */
export function canDeleteUserProfile() {
  return false;
}
