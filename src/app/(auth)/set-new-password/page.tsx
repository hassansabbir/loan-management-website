"use client";

import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SetNewPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-[28px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
        Set New Password
      </h2>
      <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
        Create a new password for your account.
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            NEW PASSWORD
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 stroke-2" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full pl-11 pr-11 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 stroke-2" />
              ) : (
                <Eye className="h-4 w-4 stroke-2" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 stroke-2" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full pl-11 pr-11 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 stroke-2" />
              ) : (
                <Eye className="h-4 w-4 stroke-2" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Confirm</span>
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

          {/* Back to Sign In Button */}
          <Link href="/sign-in" passHref legacyBehavior>
            <button
              type="button"
              className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center"
            >
              Back to Sign In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
