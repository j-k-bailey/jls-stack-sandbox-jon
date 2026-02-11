import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/BrandButton";

export function SimpleSignIn() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <Button type="button" variant="filled" semantic="primary" disabled>
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        type="button"
        variant="filled"
        semantic="primary"
        onClick={signIn}
      >
        Sign in with Google
      </Button>
    );
  }

  return (
    <Button type="button" variant="filled" semantic="accent" onClick={signOut}>
      Log out
    </Button>
  );
}
