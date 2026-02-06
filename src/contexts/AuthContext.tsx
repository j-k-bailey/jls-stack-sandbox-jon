import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { signIn, signOutUser } from "@/lib/simpleAuth";
import {
  getUserProfile,
  createOrUpdateUserProfile,
  getUserCustomClaims,
  refreshUserToken,
} from "@/lib/firestore/users";
import type { UserProfile, UserCustomClaims } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  customClaims: UserCustomClaims | null;
  loading: boolean;
  signIn: typeof signIn;
  signOut: typeof signOutUser;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [customClaims, setCustomClaims] = useState<UserCustomClaims | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          // Create/update profile if needed
          await createOrUpdateUserProfile(user);

          // Fetch profile and claims
          const [profile, claims] = await Promise.all([
            getUserProfile(user.uid),
            getUserCustomClaims(user),
          ]);

          setUserProfile(profile);
          setCustomClaims(claims);
        } catch (error) {
          console.error("Error loading user data:", error);
          setUserProfile(null);
          setCustomClaims(null);
        }
      } else {
        setUserProfile(null);
        setCustomClaims(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleRefreshToken = async () => {
    if (user) {
      await refreshUserToken(user);
      const claims = await getUserCustomClaims(user);
      setCustomClaims(claims);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    customClaims,
    loading,
    signIn,
    signOut: signOutUser,
    refreshToken: handleRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
