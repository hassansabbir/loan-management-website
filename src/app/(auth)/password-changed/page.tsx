"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PasswordChangedPage() {
  return (
    <div className="w-full flex flex-col items-center text-center">
      {/* Success Icon */}
      <div className="relative mb-8 mt-4">
        {/* Decorative Confetti Background (simplified CSS shapes) */}
        <div className="absolute inset-0 -m-8 flex items-center justify-center opacity-70 pointer-events-none">
          <div className="w-32 h-32 relative animate-[spin_20s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-1.5 h-3 bg-yellow-400 rounded-full rotate-45" />
            <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-500 rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-1.5 h-3 bg-green-400 rounded-full rotate-120" />
            <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-blue-400 rounded-sm rotate-12" />
            <div className="absolute top-1/4 left-1/4 w-1.5 h-2 bg-orange-400 rounded-sm -rotate-12" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-1.5 bg-yellow-500 rounded-full rotate-45" />
          </div>
        </div>

        {/* Main Check Icon */}
        <div className="w-20 h-20 bg-[#2563EB] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,99,235,0.4)] relative z-10">
          <Check className="w-10 h-10 text-white stroke-3" />
        </div>
      </div>

      <h2 className="text-[28px] font-bold text-gray-900 mb-3 leading-snug tracking-tight">
        Password changed!
      </h2>
      <p className="text-[15px] text-gray-500 mb-10 leading-relaxed max-w-[320px]">
        Your password has been updated successfully. You can now sign in securely.
      </p>

      <div className="w-full">
        {/* Get Started Button */}
        <Link href="/sign-in" passHref legacyBehavior>
          <button
            type="button"
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
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
      </div>
    </div>
  );
}
