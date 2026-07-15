"use client";

import Link from "next/link";
import AuthToggle from "@/components/ui/auth/AuthToggle";
import { Mail, Lock, Eye, EyeOff, Flag } from "lucide-react";
import { useState } from "react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full">
      <AuthToggle />

      <h2 className="text-[28px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
        Create Your Business Account
      </h2>
      <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
        Join thousands of UK businesses growing with revenue-based financing.
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            FULL NAME
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="John Smith"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Business Email */}
        <div className="space-y-1.5">
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
              className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            PHONE NUMBER
          </label>
          <div className="relative flex">
            {/* Simple static flag/code prefix for now to match design */}
            <div className="flex items-center justify-center pl-4 pr-2 bg-[#F8FAFC] border border-transparent border-r-gray-200 rounded-l-xl">
              <span className="text-blue-600 mr-1.5 text-lg leading-none">⚑</span>
              <span className="text-gray-900 text-sm font-medium">+44</span>
            </div>
            <input
              type="tel"
              placeholder="7123 456 789"
              className="w-full pl-3 pr-4 py-3 bg-[#F8FAFC] border border-transparent rounded-r-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Create Password */}
        <div className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-gray-700 uppercase tracking-wide">
            CREATE PASSWORD
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400 stroke-2" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
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
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-[#F8FAFC] border border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium tracking-widest"
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

        {/* Terms */}
        <div className="flex items-center pt-2 pb-2">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
            required
          />
          <label
            htmlFor="terms"
            className="ml-3 text-sm text-gray-600 font-medium cursor-pointer"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
        >
          <span>Sign Up</span>
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
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
