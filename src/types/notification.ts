/**
 * Notification Types according to B2B Dashboard Socket.io Real-time Notifications Guide
 */

export interface RealtimeNotification {
  _id?: string;
  title: string;
  message: string;
  receiver?: string;
  reference?: string;
  referenceModel?: string;
  screen?: string;
  type?: "PAYMENT" | "LOAN" | "SYSTEM" | string;
  read?: boolean;
  createdAt?: string;
}
