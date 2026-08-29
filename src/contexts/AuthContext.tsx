"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import authService from "@/lib/authService";
import { LoginCredentials, UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<UserProfile>;
  logout: () => void;
  refreshProfile: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from storage and verify with backend
  useEffect(() => {
    const initAuth = async () => {
      try {
        const cachedToken = authService.getCachedToken();
        const cachedUser = authService.getCachedUser();

        if (cachedToken) {
          setToken(cachedToken);
          if (cachedUser) {
            setUser(cachedUser);
          }

          // Fetch fresh profile in background
          try {
            const freshProfile = await authService.getProfile();
            setUser(freshProfile);
          } catch (profileError) {
            console.warn("Session expired or invalid token:", profileError);
            // If token is invalid (401), clean up
            authService.logout();
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Log in user, fetch profile, and update state
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<UserProfile> => {
      setIsLoading(true);
      try {
        // Step 1: Call login endpoint and store tokens
        const loginData = await authService.login(credentials);
        setToken(loginData.accessToken);

        // Step 2: Call get profile endpoint
        const profile = await authService.getProfile();
        setUser(profile);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth_state_changed"));
        }

        return profile;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Refresh current user profile
   */
  const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      return profile;
    } catch (err) {
      console.error("Failed to refresh profile:", err);
      return null;
    }
  }, []);

  /**
   * Log out user, clean storage and cookies, and redirect to sign-in
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("auth_state_changed"));
      window.location.href = "/sign-in";
    } else {
      router.replace("/sign-in");
    }
  }, [router]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
