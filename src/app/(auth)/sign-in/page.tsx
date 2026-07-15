"use client";

import Link from "next/link";
import AuthToggle from "@/components/ui/auth/AuthToggle";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <AuthToggle />

      <h2 className="text-[22px] font-medium text-gray-800 mb-8 leading-snug">
        Enter your business credentials to access your dashboard.
      </h2>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Business Email */}
        <div className="space-y-2">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            BUSINESS EMAIL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 stroke-[1.5]" />
            </div>
            <input
              type="email"
              placeholder="name@company.co.uk"
              className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
              PASSWORD
            </label>
            <Link
              href="/reset-password"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 stroke-[1.5]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium tracking-widest"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 stroke-[1.5]" />
              ) : (
                <Eye className="h-5 w-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center pt-1 pb-2">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="ml-3 text-sm text-gray-600 font-medium cursor-pointer"
          >
            Remember this device for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>Sign In to Dashboard</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      {/* Footer Link */}
      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-primary font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
