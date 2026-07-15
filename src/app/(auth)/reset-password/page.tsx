"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="w-full">
      <h2 className="text-[28px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
        Reset Password
      </h2>
      <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
        Enter the email address associated with your account.
      </p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            EMAIL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 stroke-[1.5]" />
            </div>
            <input
              type="email"
              placeholder="name@company.co.uk"
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Send Reset Link Button */}
          <Link href="/verify-reset-password" passHref legacyBehavior>
            <button
              type="button"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Send Reset Link</span>
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
          </Link>

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
