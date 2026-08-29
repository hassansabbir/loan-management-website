import api from "./api";
import storage from "./storage";
import {
  ApiResponse,
  LoginCredentials,
  LoginResponseData,
  UserProfile,
} from "@/types/auth";

/**
 * Helper to set cookies on the browser
 */
function setCookie(name: string, value: string, days: number = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Helper to delete cookies from the browser
 */
function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

/**
 * Helper to get cookie by name
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Authentication Service
 * Interacts with /auth/login and /users/profile endpoints
 */
export const authService = {
  /**
   * Log in user with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponseData> {
    const response = await api.post<ApiResponse<LoginResponseData>>(
      "/auth/login",
      credentials
    );

    if (!response.data || !response.data.accessToken) {
      throw new Error(response.message || "Login failed: No access token returned");
    }

    const { accessToken, refreshToken } = response.data;

    // 1. Save tokens in storage
    storage.local.set("accessToken", accessToken);
    storage.local.set("refreshToken", refreshToken);
    storage.local.set("token", accessToken);

    // 2. Set cookies for Next.js middleware protection
    setCookie("accessToken", accessToken);
    setCookie("token", accessToken);

    // 3. Configure API client with active token
    api.setToken(accessToken);

    return response.data;
  },

  /**
   * Fetch current user's profile
   * GET /users/profile
   */
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>("/users/profile");

    if (!response.data) {
      throw new Error(response.message || "Failed to retrieve profile data");
    }

    // Cache profile in storage
    storage.local.set("user", response.data);
    return response.data;
  },

  /**
   * Clear all auth session data, tokens, and cookies from the browser
   */
  logout(): void {
    // 1. Remove specific keys from storage
    storage.local.remove("accessToken");
    storage.local.remove("refreshToken");
    storage.local.remove("token");
    storage.local.remove("user");
    storage.session.remove("accessToken");
    storage.session.remove("refreshToken");
    storage.session.remove("token");
    storage.session.remove("user");

    // 2. Clear full local/session storage
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.sessionStorage.clear();
      } catch (e) {
        console.error("Error clearing browser storage:", e);
      }
    }

    // 3. Delete cookies
    deleteCookie("accessToken");
    deleteCookie("token");

    // 4. Reset API client
    api.clearToken();
  },

  /**
   * Get cached user from storage
   */
  getCachedUser(): UserProfile | null {
    return storage.local.get<UserProfile>("user");
  },

  /**
   * Get cached access token from storage or cookie
   */
  getCachedToken(): string | null {
    const token =
      storage.local.get<string>("accessToken") ||
      storage.local.get<string>("token");

    if (token) return token;

    if (typeof window !== "undefined") {
      const localToken =
        window.localStorage.getItem("accessToken") ||
        window.localStorage.getItem("token");
      if (localToken) return localToken;

      const cookieToken = getCookie("accessToken") || getCookie("token");
      if (cookieToken) return cookieToken;
    }

    return null;
  },

  /**
   * Change user password
   * POST /auth/change-password
   */
  async changePassword(
    data: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> {
    return await api.post<ChangePasswordResponse>(
      "/auth/change-password",
      data
    );
  },
};

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export default authService;
