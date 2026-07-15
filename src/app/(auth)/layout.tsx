import Image from "next/image";
import Link from "next/link";
import React from "react";
import authBg from "@/assets/authLayoutImage.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column */}
      <div className="hidden lg:flex lg:w-[50%] relative flex-col justify-between p-12 text-white overflow-hidden bg-[#0A349E]">
        {/* Background Image with Primary Color Overlay */}
        <div className="absolute inset-0 z-0 bg-primary">
          <Image
            src={authBg}
            alt="Authentication Background"
            fill
            className="object-cover object-center opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-20 w-fit">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              {/* Simple bank building icon matching the design */}
              <path d="M4 10H20V12H4V10ZM4 14H20V16H4V14ZM4 18H20V20H4V18ZM12 3L2 8V10H22V8L12 3ZM10 10H14V20H10V10Z" fill="currentColor"/>
            </svg>
            <span className="text-xl font-semibold">Loan</span>
          </Link>

          {/* Main Text */}
          <div className="mt-auto mb-auto max-w-lg">
            <h1 className="text-[40px] leading-[1.15] font-semibold mb-6 tracking-tight">
              Empowering UK Startups with Intelligent Revenue Financing.
            </h1>
            <p className="text-lg text-blue-50/90 leading-relaxed font-normal">
              Secure, transparent, and built for modern business scaling. Join over
              2,000 UK companies managing their capital with Loan.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-12 mt-16">
              <div>
                <p className="text-xl font-semibold text-white mb-1">£500M+</p>
                <p className="text-sm font-medium text-blue-200/80 tracking-wide uppercase">
                  CAPITAL DEPLOYED
                </p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-xl font-semibold text-white mb-1">24h</p>
                <p className="text-sm font-medium text-blue-200/80 tracking-wide uppercase">
                  AVG. FUNDING TIME
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto">
        <div className="w-full max-w-[440px] mx-auto flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
