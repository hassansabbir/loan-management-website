"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-30 w-full">
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <Link
          href="/dashboard/notifications"
          className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Link>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer focus:outline-none p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 leading-tight">
                {user?.name || "Fintech Ltd"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {user?.role || "Admin"}
              </p>
            </div>
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-white text-sm">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : user?.name ? (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <User className="text-white/80 w-5 h-5" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                {/* Profile Header in Dropdown */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user?.name || "Fintech Ltd"}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user?.email || "user@gmail.com"}
                  </p>
                  <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 uppercase tracking-wider">
                    {user?.role || "USER"}
                  </span>
                </div>

                <div className="py-2">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
