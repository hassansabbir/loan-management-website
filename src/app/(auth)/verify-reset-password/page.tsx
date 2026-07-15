"use client";

import Link from "next/link";
import OtpInput from "@/components/ui/auth/OtpInput";

export default function VerifyResetPasswordPage() {
  return (
    <div className="w-full">
      <h2 className="text-[28px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
        Verify Reset Password
      </h2>
      <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
        Enter the code sent to your email to reset your password.
      </p>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-center">
          <OtpInput length={6} />
        </div>

        <div className="space-y-3">
          {/* Verify Code Button */}
          <Link href="/set-new-password" passHref legacyBehavior>
            <button
              type="button"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Verify Code</span>
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
