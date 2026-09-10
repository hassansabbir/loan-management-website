"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCheck, CreditCard, Landmark, DollarSign, Info } from "lucide-react";
import { useSocket } from "@/contexts/SocketContext";

interface DashboardNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  read: boolean;
  screen?: string;
  isRealtime?: boolean;
}

const defaultNotifications: DashboardNotification[] = [
  {
    id: "default-1",
    title: "Funding Application Submitted",
    description: "Your funding application has been successfully submitted and is under review.",
    date: "2026-06-05 10:30 AM",
    type: "LOAN",
    read: true,
  },
  {
    id: "default-2",
    title: "Application Approved",
    description: "Congratulations! Your funding application has been approved.",
    date: "2026-06-04 03:15 PM",
    type: "LOAN",
    read: true,
  },
  {
    id: "default-3",
    title: "Repayment Collected",
    description: "A percentage of your latest sales has been automatically applied toward your loan repayment.",
    date: "2026-06-04 03:15 PM",
    type: "PAYMENT",
    read: true,
    screen: "PAYMENT_HISTORY",
  },
  {
    id: "default-4",
    title: "Outstanding Balance Updated",
    description: "Your remaining loan balance has been updated after the latest repayment.",
    date: "2026-06-04 03:15 PM",
    type: "LOAN",
    read: true,
  },
  {
    id: "default-5",
    title: "Profile Updated",
    description: "Your business profile information has been saved successfully.",
    date: "2026-06-04 03:15 PM",
    type: "SYSTEM",
    read: true,
  },
];

export default function NotificationsPage() {
  const { notifications: realtimeNotifications, unreadCount, markAllAsRead } = useSocket();

  // Mark all notifications as read when viewing this page
  useEffect(() => {
    if (unreadCount > 0) {
      markAllAsRead();
    }
  }, [unreadCount, markAllAsRead]);

  // Combine real-time socket notifications with default history
  const allNotifications = [
    ...realtimeNotifications.map((n, idx) => ({
      id: n._id || `rt-${idx}-${Date.now()}`,
      title: n.title,
      description: n.message,
      date: n.createdAt
        ? new Date(n.createdAt).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "Just now",
      type: n.type || "PAYMENT",
      read: n.read || false,
      screen: n.screen,
      isRealtime: true,
    })),
    ...defaultNotifications,
  ];

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "PAYMENT":
        return <CreditCard className="w-5 h-5 text-[#2563EB]" />;
      case "LOAN":
        return <Landmark className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <div className="w-full flex flex-col max-w-5xl animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dashboard"
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-700"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-[15px] text-gray-500 font-medium ml-10">
            Real-time notifications for payment splits, funding, and system updates
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1B64F2] hover:bg-blue-50 border border-blue-100 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {allNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl p-5 md:p-6 border transition-all ${
              !notification.read
                ? "border-blue-200 bg-blue-50/20 shadow-sm"
                : "border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            } flex flex-col md:flex-row md:items-start justify-between gap-4 hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)]`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100/50 flex items-center justify-center shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-[#1B64F2]" />
                  )}
                </div>
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  {notification.description}
                </p>
                <p className="text-xs font-semibold text-gray-400 mt-1">
                  {notification.date}
                </p>
              </div>
            </div>

            {notification.screen === "PAYMENT_HISTORY" && (
              <Link
                href="/dashboard/transactions"
                className="text-xs font-semibold text-[#1B64F2] hover:underline self-end md:self-center shrink-0"
              >
                View Transaction &rarr;
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
