"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { RealtimeNotification } from "@/types/notification";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticatedSocket: boolean;
  notifications: RealtimeNotification[];
  unreadCount: number;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Helper to determine the socket base URL
const DEFAULT_SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://10.10.26.180:5004";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token, user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isAuthenticatedSocket, setIsAuthenticatedSocket] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setUnreadCount(0);
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }, []);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  useEffect(() => {
    // Only connect when user is authenticated with a token
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setIsAuthenticatedSocket(false);
      }
      return;
    }

    const socketUrl = DEFAULT_SOCKET_URL;
    console.log("🔌 Connecting to Socket.io server:", socketUrl);

    // Initialize socket connection with authentication token and websocket transport
    const socketInstance = io(socketUrl, {
      auth: {
        token: `Bearer ${token}`,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    // 1. Connection established
    socketInstance.on("connect", () => {
      console.log("✅ Socket connected. ID:", socketInstance.id);
      setIsConnected(true);
    });

    // 2. Authentication successful event sent by backend
    socketInstance.on("authenticated", (data: { userId?: string }) => {
      console.log("🎉 Socket authenticated for user:", data?.userId || user?._id);
      setIsAuthenticatedSocket(true);
    });

    // 3. Handle connection error (e.g. invalid token)
    socketInstance.on("connect_error", (error: Error) => {
      console.error("❌ Socket connection failed:", error.message);
      setIsConnected(false);
      setIsAuthenticatedSocket(false);
    });

    // 4. Real-time notification listener
    socketInstance.on("notification", (notification: RealtimeNotification) => {
      console.log("🔔 New notification received:", notification);

      // Add to list and increment unread badge count
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Display Toast popup to the merchant
      toast.info(notification.title || "New Notification", {
        description: notification.message,
        duration: 6000,
      });
    });

    // 5. Send periodic heartbeat every 25 seconds to maintain active user status
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
    }
    heartbeatTimerRef.current = setInterval(() => {
      if (socketInstance.connected) {
        socketInstance.emit("heartbeat");
      }
    }, 25000);

    setSocket(socketInstance);

    // Cleanup on unmount or token change
    return () => {
      console.log("🔌 Cleaning up socket connection...");
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
        heartbeatTimerRef.current = null;
      }
      socketInstance.off("connect");
      socketInstance.off("authenticated");
      socketInstance.off("connect_error");
      socketInstance.off("notification");
      socketInstance.disconnect();
      setIsConnected(false);
      setIsAuthenticatedSocket(false);
    };
  }, [token, isAuthenticated, user?._id]);

  const value: SocketContextType = {
    socket,
    isConnected,
    isAuthenticatedSocket,
    notifications,
    unreadCount,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export default SocketContext;
