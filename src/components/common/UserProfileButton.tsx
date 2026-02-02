import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export function UserProfileButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  const photoURL = user?.photoURL ?? null;
  const initial = user?.displayName?.charAt(0).toUpperCase() ?? "Y";

  return (
    <button
      type="button"
      aria-label={user ? "User menu" : "Sign in"}
      className="hit-target relative flex h-8 w-8 items-center justify-center"
    >
      {/* Avatar circle */}
      <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border-muted bg-muted caption font-bold text-muted-foreground">
        {photoURL ? (
          <img
            src={photoURL}
            alt={user?.displayName ?? "User profile"}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{initial}</span>
        )}
      </span>

      {/* Notification badge */}
      <span
        aria-hidden="true"
        className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground"
      >
        3
      </span>
    </button>
  );
}
