/**
 * Authentication and User Profile Types
 */

export interface UserOnlineStatus {
  isOnline: boolean;
  lastSeen?: string;
  lastHeartbeat?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  role: string;
  email: string;
  image?: string;
  status?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  stripeCustomerId?: string;
  onlineStatus?: UserOnlineStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
