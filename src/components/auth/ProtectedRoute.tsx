// @/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/lib/types/user";

interface ProtectedRouteProps {
  requiredRole?: UserRole;
  requireAuth?: boolean;
  children?: React.ReactNode;
}

export function ProtectedRoute({
  requiredRole,
  requireAuth = true,
  children,
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userProfile) {
    const roleHierarchy: UserRole[] = [
      "viewer",
      "contributor",
      "moderator",
      "admin",
    ];

    if (
      roleHierarchy.indexOf(userProfile.role) <
      roleHierarchy.indexOf(requiredRole)
    ) {
      return <Navigate to="/403" replace />;
    }
  }

  // 🔑 children for single-route usage, Outlet for layout usage
  return children ? <>{children}</> : <Outlet />;
}
