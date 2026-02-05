import type { Timestamp } from "firebase/firestore";

export type UserRole = "viewer" | "contributor" | "moderator" | "admin";

export interface UserProfile {
  role: UserRole;
  firstName: string;
  lastNameInitial: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserCustomClaims {
  role: UserRole;
}

// Helper to compute what each role can do (used by Cloud Function)
export function getRolePermissions(role: UserRole) {
  switch (role) {
    case "admin":
      return {
        canCreate: true,
        canEditOwn: true,
        canEditAny: true,
        canDeleteOwn: true,
        canDeleteAny: true,
        canRead: true,
      };
    case "moderator":
      return {
        canCreate: true,
        canEditOwn: true,
        canEditAny: true,
        canDeleteOwn: true,
        canDeleteAny: false, // Can't delete others' stuff
        canRead: true,
      };
    case "contributor":
      return {
        canCreate: true,
        canEditOwn: true,
        canEditAny: false,
        canDeleteOwn: true,
        canDeleteAny: false,
        canRead: true,
      };
    case "viewer":
      return {
        canCreate: false,
        canEditOwn: false,
        canEditAny: false,
        canDeleteOwn: false,
        canDeleteAny: false,
        canRead: true,
      };
  }
}
