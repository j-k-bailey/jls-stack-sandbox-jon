import type { Timestamp } from "firebase/firestore";

export type UserPrimaryRoles = "viewer" | "contributor" | "moderator" | "admin";

export interface UserPermissionOverrides {
  canView?: boolean;
  canCreate?: boolean;
  canEditOwn?: boolean;
  canEditAny?: boolean;
  canDeleteAny?: boolean;
}

export interface UserProfile {
  role: UserPrimaryRoles;
  firstName: string;
  lastNameInitial: string;
  permissions?: UserPermissionOverrides;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
