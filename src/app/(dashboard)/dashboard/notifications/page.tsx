"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Funding Application Submitted",
    description: "Your funding application has been successfully submitted and is under review.",
    date: "2026-06-05 10:30 AM",
  },
  {
    id: 2,
    title: "Application Approved",
    description: "Congratulations! Your funding application has been approved.",
    date: "2026-06-04 03:15 PM",
  },
  {
    id: 3,
    title: "Repayment Collected",
    description: "A percentage of your latest sales has been automatically applied toward your loan repayment.",
    date: "2026-06-04 03:15 PM",
  },
  {
    id: 4,
    title: "Outstanding Balance Updated",
    description: "Your remaining loan balance has been updated after the latest repayment.",
    date: "2026-06-04 03:15 PM",
  },
  {
    id: 5,
    title: "Profile Updated",
    description: "Your business profile information has been saved successfully.",
    date: "2026-06-04 03:15 PM",
  },
];

export default function NotificationsPage() {
  return (
    <div className="w-full flex flex-col max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Notifications
          </h1>
        </div>
        <p className="text-[15px] text-gray-500 font-medium ml-10">
          See all system notifications
        </p>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-xl p-5 md:p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)]"
          >
            <div className="flex flex-col gap-1.5 flex-1">
              <h3 className="text-[15px] font-semibold text-gray-900">
                {notification.title}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                {notification.description}
              </p>
              <p className="text-xs font-semibold text-gray-400 mt-2">
                {notification.date}
              </p>
            </div>
            
            <div className="hidden md:flex shrink-0 text-[#2563EB]">
              <Bell className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
