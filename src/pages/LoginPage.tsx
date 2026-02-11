import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/BrandButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa6";

export function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they were trying to visit, or default to home
  const from = location.state?.from?.pathname || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-1">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show login page if already logged in (will redirect via useEffect)
  if (user) {
    return null;
  }

  return (
    <div className="container p-inset-2xl flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your product ideas and collaborate with your team
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Button
              type="button"
              variant="filled"
              semantic="primary"
              onClick={signIn}
              className="w-full"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>

            {from !== "/" && (
              <p className="text-sm text-muted-foreground text-center">
                You'll be redirected to{" "}
                <span className="font-medium text-foreground">{from}</span>{" "}
                after signing in
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-3 text-muted-foreground">
                New here?
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              semantic="primary"
              onClick={() => signIn()}
              className="w-full"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              Create an account
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              New accounts start in the{" "}
              <span className="font-medium text-foreground">
                default organization
              </span>{" "}
              with a <span className="font-medium text-foreground">viewer</span>{" "}
              role.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
