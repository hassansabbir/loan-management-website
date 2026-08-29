"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPin } from "lucide-react";

export default function ContactHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full aspect-[2.2/1] min-h-[360px] sm:min-h-[420px] md:min-h-[460px] rounded-[32px] overflow-hidden shadow-xl mb-12 flex items-center"
    >
      <Image
        src="/contact_banner.png"
        alt="Loan London Office"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Navy gradient overlay matching site's theme */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(8, 20, 39, 0.98) 0%, rgba(8, 20, 39, 0.9) 40%, rgba(8, 20, 39, 0.55) 70%, rgba(8, 20, 39, 0.15) 100%)",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-20 px-8 sm:px-14 py-10 text-left max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#38BDF8] uppercase tracking-widest mb-3">
          <MapPin className="w-3.5 h-3.5" />
          Covent Garden, London HQ
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Let's Fuel Your Next <br />
          <span className="text-[#38BDF8] block my-1">Stage of Growth.</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-slate-200/90 font-medium leading-relaxed max-w-xl">
          Connect directly with our UK financing specialists. Whether you're exploring revenue-based capital, tracking an application, or discussing partnership, we're ready to help.
        </p>

        {/* Quick Highlights Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 pt-5 border-t border-white/15">
          <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>&lt; 2h Average Response</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Bank-Grade 256-Bit SSL</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>London Advisors Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
