import { useAuth } from "@/contexts/AuthContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/BrandButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function UserProfileButton() {
  const { user, userProfile, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <button
        type="button"
        aria-label="Loading"
        className="hit-target relative flex h-8 w-8 items-center justify-center"
        disabled
      >
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border-muted bg-muted">
          <span className="caption font-bold text-muted-foreground">...</span>
        </span>
      </button>
    );
  }

  const photoURL = user?.photoURL ?? null;
  const initial =
    userProfile?.firstName?.charAt(0).toUpperCase() ??
    user?.displayName?.charAt(0).toUpperCase() ??
    "?";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={user ? "User menu" : "Sign in"}
          className="hit-target relative flex h-8 w-8 items-center justify-center cursor-pointer"
        >
          {/* Avatar circle */}
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border-muted bg-muted caption font-bold text-muted-foreground">
            {photoURL ? (
              <img
                src={photoURL}
                alt={
                  userProfile?.firstName ?? user?.displayName ?? "User profile"
                }
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{initial}</span>
            )}
          </span>

          {/* Notification badge */}
          {user && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground"
            >
              3
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80">
        {user ? (
          // Logged in state
          <>
            <PopoverHeader>
              <PopoverTitle>
                {userProfile?.firstName} {userProfile?.lastNameInitial}
              </PopoverTitle>
              <PopoverDescription>{user.email}</PopoverDescription>
              <Badge variant="outline" className="capitalize w-fit mt-2">
                {userProfile?.role}
              </Badge>
            </PopoverHeader>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                semantic="primary"
                className="w-full justify-start"
                onClick={() => {
                  /* Navigate to profile */
                }}
              >
                View Profile
              </Button>

              <Button
                type="button"
                variant="outline"
                semantic="primary"
                className="w-full justify-start"
                onClick={() => {
                  /* Navigate to settings */
                }}
              >
                Settings
              </Button>

              <Separator className="my-2" />

              <Button
                type="button"
                variant="filled"
                semantic="accent"
                className="w-full"
                onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          // Logged out state
          <>
            <PopoverHeader>
              <PopoverTitle>Welcome!</PopoverTitle>
              <PopoverDescription>
                Sign in to access your product ideas and collaborate with your
                team.
              </PopoverDescription>
            </PopoverHeader>

            <Separator className="my-4" />

            <Button
              type="button"
              variant="filled"
              semantic="primary"
              className="w-full"
              onClick={signIn}
            >
              Sign in with Google
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
