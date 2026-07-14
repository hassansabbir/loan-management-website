"use client";

import Link from "next/link";
import { Globe, Earth } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 md:py-16 border-t border-blue-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left Column: Title and Copyright */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-95 transition-opacity">
              Loan
            </Link>
            <p className="text-xs sm:text-sm text-white/80 font-normal mt-1">
              © 2024 Loan Revenue Financing. All rights reserved.
            </p>
          </div>

          {/* Right Column: Links and Socials */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-x-12 gap-y-6 md:gap-x-16">
            {/* Links */}
            <div className="flex items-center gap-6 sm:gap-8">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors duration-250"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Socials / Language Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, aria: "Select Language" },
                { icon: Earth, aria: "Select Region" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 active:scale-95 cursor-pointer"
                    aria-label={item.aria}
                  >
                    <Icon className="w-5 h-5 stroke-[1.8px]" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}