"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Landmark,
  Settings,
  Component,
  LogOut,
} from "lucide-react";
import { storage } from "@/lib";

import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Funding", icon: Wallet, href: "/dashboard/funding" },
  { label: "Transactions", icon: ArrowRightLeft, href: "/dashboard/transactions" },
  { label: "Payouts", icon: Landmark, href: "/dashboard/payouts" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  { label: "Integrations", icon: Component, href: "/dashboard/integrations" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
            {/* Simple white bank icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path d="M4 10H20V12H4V10ZM4 14H20V16H4V14ZM4 18H20V20H4V18ZM12 3L2 8V10H22V8L12 3ZM10 10H14V20H10V10Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h1 className="text-[#2563EB] font-bold text-lg leading-none">Loan</h1>
            <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-1">
              Revenue Financing
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
        {menuItems.map((item) => {
          // Simplistic exact matching or prefix matching
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-[15px] ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 rounded-xl text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-colors mb-4 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
        <p className="text-center text-xs text-gray-400 font-medium">
          Copyright@app
        </p>
      </div>
    </aside>
  );
}
