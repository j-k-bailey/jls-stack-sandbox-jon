import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

import { signIn, signOutUser } from "@/lib/simpleAuth";
import { Button } from "@/components/ui/BrandButton";

export function SimpleSignIn() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsub();
  }, []);

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
    <Button
      type="button"
      variant="filled"
      semantic="accent"
      onClick={signOutUser}
    >
      Log out
    </Button>
  );
}
