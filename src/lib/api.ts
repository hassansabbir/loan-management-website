/**
 * API client for making HTTP requests
 * A simple wrapper around fetch with error handling and response parsing
 */

// Default API configuration
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
};

// Error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Timeout promise
const timeoutPromise = (ms: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new ApiError("Request timeout", 408)), ms)
  );

/**
 * Make an API request
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Promise with response data
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_CONFIG.baseUrl}${
        endpoint.startsWith("/") ? endpoint : `/${endpoint}`
      }`;

  const headers = {
    ...API_CONFIG.headers,
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    // Race between fetch and timeout
    const response = (await Promise.race([
      fetch(url, config),
      timeoutPromise(API_CONFIG.timeout),
    ])) as Response;

    // Handle HTTP errors
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error("Error parsing error response:", e);
        errorData = { message: response.statusText };
      }

      throw new ApiError(
        errorData.message || "API request failed",
        response.status,
        errorData
      );
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
 * @param endpoint - API endpoint
 * @param options - Additional fetch options
 * @returns Promise with response data
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
 * @param endpoint - API endpoint
 * @param data - Request body data
 * @param options - Additional fetch options
 * @returns Promise with response data
 */
export function post<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request
 * @param endpoint - API endpoint
 * @param data - Request body data
 * @param options - Additional fetch options
 * @returns Promise with response data
 */
export function put<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request
 * @param endpoint - API endpoint
 * @param data - Request body data
 * @param options - Additional fetch options
 * @returns Promise with response data
 */
export function patch<T = any>(
  endpoint: string,
  data?: any,
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request
 * @param endpoint - API endpoint
 * @param options - Additional fetch options
 * @returns Promise with response data
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

// Export default API object with all methods
const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  request: apiRequest,
};

export default api;
