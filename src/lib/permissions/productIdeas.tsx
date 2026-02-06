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

function canEditAny(role?: UserRole) {
  return isAdmin(role) || isModerator(role);
}

/**
 * PRODUCT IDEAS
 */

export function canReadProductIdeas(isSignedIn: boolean) {
  return isSignedIn;
}

/**
 * Contributors+ can create ideas they own
 */
export function canCreateProductIdea(role?: UserRole, authUid?: string) {
  return canCreate(role) && authUid != null;
}

/**
 * Admins/mods can edit anything
 * Contributors can edit their own
 */
export function canEditProductIdea(
  role: UserRole | undefined,
  isOwner: boolean,
) {
  return canEditAny(role) || isOwner;
}

/**
 * ownerId is immutable
 */
export function canChangeProductIdeaOwner(
  originalOwnerId: string,
  newOwnerId: string,
) {
  return originalOwnerId === newOwnerId;
}

/**
 * Admins, mods, contributors can delete *their own*
 */
export function canDeleteProductIdea(isOwner: boolean) {
  return isOwner;
}
