"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        
        {/* Top Banner with Image Background */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-lg mb-10">
          <Image
            src="/privacy_banner.png"
            alt="Privacy Policy"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          
          {/* Centered Heading */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Privacy Policy
            </h1>
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.015)] text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="font-semibold text-slate-500">
            Your privacy is important to us. This Privacy Policy explains how (“App”, “Platform”, “we”, “our”) collects, uses, stores, and protects your information when you use our B2B application and services.
          </p>
          <p className="font-semibold text-slate-500 pb-2">
            By accessing or using the App, you agree to the collection and use of information as described in this Privacy Policy.
          </p>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-4">
              1. Information We Collect
            </h2>
            
            <div className="space-y-6 mt-4">
              {/* Subsection a */}
              <div>
                <h3 className="text-base font-bold text-slate-700 mb-2">
                  a. Personal & Business Information
                </h3>
                <ul className="list-disc pl-6 space-y-1.5 font-semibold text-slate-500">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Business name & address</li>
                  <li>Account credentials</li>
                  <li>Role type (Super Admin, Supplier, Grocery market)</li>
                </ul>
              </div>

              {/* Subsection b */}
              <div>
                <h3 className="text-base font-bold text-slate-700 mb-2">
                  b. Usage & Technical Information
                </h3>
                <ul className="list-disc pl-6 space-y-1.5 font-semibold text-slate-500">
                  <li>App activity (pages visited, actions taken)</li>
                  <li>Order interactions and preferences</li>
                  <li>Device information and log data</li>
                  <li>Language and region settings</li>
                </ul>
              </div>

              {/* Subsection c */}
              <div>
                <h3 className="text-base font-bold text-slate-700 mb-2">
                  c. Transaction & Order Information
                </h3>
                <ul className="list-disc pl-6 space-y-1.5 font-semibold text-slate-500">
                  <li>Order details and quantities</li>
                  <li>Pricing (regular & bulk)</li>
                  <li>Discount progress and group order participation</li>
                  <li>Payment method details (no sensitive payment data is stored by Orienco)</li>
                  <li>Payment processing is handled securely through trusted third-party gateways.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-4">
              3. How We Use Your Information
            </h2>
            <p className="font-semibold text-slate-500 mb-3">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 font-semibold text-slate-500">
              <li>Operate and maintain the platform</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
