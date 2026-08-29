/**
 * API client for making HTTP requests
 * Configured for http://10.10.26.180:5004/api/v1
 */

import storage from "./storage";

// Default API configuration
export const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL || "http://10.10.26.180:5004/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
};

// Error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;
  errorMessages?: Array<{ path: string; message: string }>;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    if (data?.errorMessages) {
      this.errorMessages = data.errorMessages;
    }
  }
}

// Timeout promise
const timeoutPromise = (ms: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new ApiError("Request timeout", 408)), ms)
  );

/**
 * Get stored authentication token if available
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    storage.local.get<string>("accessToken") ||
    storage.local.get<string>("token") ||
    window.localStorage.getItem("accessToken") ||
    window.localStorage.getItem("token")
  );
}

/**
 * Set authentication token in storage
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  storage.local.set("accessToken", token);
  storage.local.set("token", token);
}

/**
 * Remove authentication token from storage
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  storage.local.remove("accessToken");
  storage.local.remove("token");
}

/**
 * Make an API request
 * @param endpoint - API endpoint or full URL
 * @param options - Fetch options
 * @returns Promise with response data
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_CONFIG.baseUrl}${cleanEndpoint}`;

  const token = getAuthToken();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(!isFormData ? API_CONFIG.headers : {}),
    ...(options.headers as Record<string, string>),
  };

  // Automatically attach Bearer token if not explicitly provided
  if (token && !headers["Authorization"] && !headers["authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = (await Promise.race([
      fetch(url, config),
      timeoutPromise(API_CONFIG.timeout),
    ])) as Response;

    // Handle HTTP errors
    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error("Error parsing error response:", e);
        errorData = { message: response.statusText };
      }

      // Extract error message from API response format
      const message =
        errorData?.error?.[0]?.message ||
        errorData?.errorMessages?.[0]?.message ||
        errorData?.message ||
        "API request failed";

      throw new ApiError(message, response.status, errorData);
    }

    // Parse response based on content type
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    } else if (contentType.includes("text/")) {
      return (await response.text()) as unknown as T;
    } else {
      return (await response.blob()) as unknown as T;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      500
    );
  }
}

/**
 * GET request
 */
export function get<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * POST request
 */
export function post<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: isFormData ? data : data !== undefined ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 */
export function put<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: isFormData ? data : data !== undefined ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 */
export function patch<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: isFormData ? data : data !== undefined ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 */
export function del<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  request: apiRequest,
  setToken: setAuthToken,
  getToken: getAuthToken,
  clearToken: clearAuthToken,
  baseUrl: API_CONFIG.baseUrl,
};

export default api;
