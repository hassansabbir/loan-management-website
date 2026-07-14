/**
 * Shared error handling utilities
 */

export class AppError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string = 'internal_error', status: number = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}

/**
 * Capture and log errors consistently
 */
export const handleError = (error: unknown, context?: string) => {
  const message = error instanceof Error ? error.message : String(error);
  const logMessage = context ? `[${context}] ${message}` : message;
  
  console.error(logMessage);
  
  // Here you would integrate with Sentry or other monitoring tools
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error);
  }
};

/**
 * Safe JSON parse that returns a default value instead of throwing
 */
export function safeJsonParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return defaultValue;
  }
}
