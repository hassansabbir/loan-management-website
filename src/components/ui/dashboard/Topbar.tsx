"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-30 w-full">
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <Link href="/dashboard/notifications" className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 leading-tight">
              Fintech Ltd
            </p>
            <p className="text-xs text-gray-500 font-medium">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
            <User className="text-white/80 w-5 h-5" />
            {/* If there was a real image, it would go here */}
            {/* <img src="/avatar.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
