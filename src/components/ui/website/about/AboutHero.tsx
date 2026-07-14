"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full aspect-[2.1/1] min-h-[380px] sm:min-h-[450px] md:min-h-[500px] rounded-[32px] overflow-hidden shadow-xl mb-12 flex items-center"
    >
      <Image
        src="/aboutUsBannerImg.png"
        alt="About Us Banner"
        fill
        className="object-cover object-center"
        priority
      />
      {/* Custom Left-sided Navy Blue Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          background: "linear-gradient(to right, rgba(8, 20, 39, 0.98) 0%, rgba(8, 20, 39, 0.88) 35%, rgba(8, 20, 39, 0.5) 65%, rgba(8, 20, 39, 0) 100%)" 
        }} 
      />
      
      {/* Banner Text Overlays */}
      <div className="relative z-20 px-8 sm:px-14 py-12 text-left max-w-2xl">
        <span className="block text-xs sm:text-sm font-extrabold text-[#38BDF8] uppercase tracking-widest mb-3.5">
          Redefining Excellence
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Smart Lending.<br />
          <span className="text-[#38BDF8] block my-1">Trusted Partnerships.</span>
          Faster Funding.
        </h1>
        <p className="mt-6 text-sm sm:text-base text-slate-200/90 font-medium leading-relaxed max-w-lg">
          We bridge the gap between traditional reliability and fintech agility, empowering businesses to reach their full potential through seamless financial solutions.
        </p>
        
        <div className="mt-8">
          <Link href="/apply">
            <button className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-97 cursor-pointer inline-flex items-center gap-2">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
