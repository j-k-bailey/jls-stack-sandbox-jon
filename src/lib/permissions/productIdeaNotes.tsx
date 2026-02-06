import type { UserRole } from "@/lib/types/user";

/**
 * Shared helpers
 */
function isAdmin(role?: UserRole) {
  return role === "admin";
}

function isModerator(role?: UserRole) {
  return role === "moderator";
}

function isContributor(role?: UserRole) {
  return role === "contributor";
}

function canCreate(role?: UserRole) {
  return isAdmin(role) || isModerator(role) || isContributor(role);
}

/**
 * PRODUCT IDEA NOTES
 */

export function canReadProductIdeaNotes(isSignedIn: boolean) {
  return isSignedIn;
}

/**
 * Contributors+ can create notes they author
 */
export function canCreateProductIdeaNote(
  role?: UserRole,
  authUid?: string,
  authorId?: string,
) {
  return canCreate(role) && authUid != null && authUid === authorId;
}

/**
 * Notes are immutable
 */
export function canUpdateProductIdeaNote() {
  return false;
}

/**
 * Only authors can delete their notes
 */
export function canDeleteProductIdeaNote(isAuthor: boolean) {
  return isAuthor;
}
