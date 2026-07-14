"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        
        {/* Top Banner with Image Background */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-lg mb-10">
          <Image
            src="/terms_banner.png"
            alt="Terms of Services"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          
          {/* Centered Heading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Terms of Services
            </h1>
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.015)] text-slate-650 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="font-semibold text-slate-500 pb-2">
            Please read these Terms and Conditions carefully before using our tradesperson platform Tradelock. By accessing or using the Platform, you agree to be bound by these Terms and Conditions.
          </p>

          {/* Section 1 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="font-semibold text-slate-500 mb-2">
              By creating an account and using the Tradelock, you confirm that you have read, understood, and agreed to these Terms and Conditions.
            </p>
            <p className="font-semibold text-slate-500">
              If you do not agree with any part of these terms, you must not use the Platform.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
              2. User Accounts
            </h2>
            <div className="space-y-3 font-semibold text-slate-500">
              <p>
                To access certain features, you must create an account as a Client, Tradesperson, or Company.
              </p>
              <p>
                You agree to provide accurate, complete, and up-to-date information.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                You are fully responsible for all activities conducted under your account.
              </p>
              <p>
                If you suspect unauthorized access or misuse, you must notify us immediately.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
              3. Privacy Policy
            </h2>
            <div className="space-y-3 font-semibold text-slate-500">
              <p>
                All job details (scope, pricing, timeline) must be agreed upon before work begins.
              </p>
              <p>
                Once a job is set up and approved, it becomes an official agreement between the client and the tradesperson.
              </p>
              <p>
                Any changes must be mutually agreed upon through the Platform.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
              4. Governing Law
            </h2>
            <div className="space-y-3 font-semibold text-slate-500">
              <p>
                Payments may be held securely in escrow until job completion is confirmed.
              </p>
              <p>
                Funds are released only after the client approves the completed work.
              </p>
              <p>
                The Platform is not responsible for disputes arising outside the agreed job scope.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
