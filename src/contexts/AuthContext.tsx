// @/contexts/AuthContext.tsx
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
} from "@/lib/firestore/users";
import type { UserProfile } from "@/types/user";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: typeof signIn;
  signOut: typeof signOutUser;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    console.log("AuthProvider: Setting up auth listener");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthProvider: Auth state changed", {
        user: user?.email,
        uid: user?.uid,
      });
      setUser(user);

      if (user) {
        try {
          console.log(
            "AuthProvider: Creating/updating profile for uid:",
            user.uid,
          );
          await createOrUpdateUserProfile(user);

          console.log("AuthProvider: Fetching profile for uid:", user.uid);
          const profile = await getUserProfile(user.uid);
          console.log("AuthProvider: Got profile", profile);
          setUserProfile(profile);
        } catch (error) {
          console.error("AuthProvider: Error loading profile", error);
          console.error("Full error:", JSON.stringify(error, null, 2));
          // Set loading to false even on error
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      console.log("AuthProvider: Setting loading to false");
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signOut: signOutUser,
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
