// @/components/auth/RequirePermission.tsx
import { useAuth } from "@/contexts/AuthContext";
import { checkPermission } from "@/lib/firestore/users";
import type { UserPermissionOverrides } from "@/lib/types/user";

interface RequirePermissionProps {
  children: React.ReactNode;
  permission: keyof UserPermissionOverrides;
  fallback?: React.ReactNode;
}

export function RequirePermission({
  children,
  permission,
  fallback = null,
}: RequirePermissionProps) {
  const { userProfile } = useAuth();

  if (!userProfile || !checkPermission(userProfile, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
