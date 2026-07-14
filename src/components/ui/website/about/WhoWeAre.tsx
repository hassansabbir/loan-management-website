"use client";

import React from "react";
import Image from "next/image";
import { Award, Rocket, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function WhoWeAre() {
  return (
    <>
      {/* Section 2: Who We Are (2-Column details) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-20">
        
        {/* Left Column: Who We Are text details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="block text-xs sm:text-sm font-bold text-primary uppercase tracking-widest">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Who We Are
          </h2>
          <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed">
            Loan is a digital-first lending platform engineered for the high-stakes world of automotive finance. We connect dealerships and businesses with flexible, high-performance funding solutions that move as fast as their inventory.
          </p>
          <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed">
            Our platform removes the traditional friction from institutional lending, replacing legacy bureaucracy with technical clarity and architectural precision.
          </p>
        </motion.div>

        {/* Right Column: Image with offset frame and glassmorphic badge */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md lg:max-w-none aspect-[1.62/1] mx-auto"
        >
          {/* Outline Frame behind the image */}
          <div className="absolute inset-0 border-[1.5px] border-primary rounded-[32px] translate-x-[-16px] translate-y-[16px] z-0" />
          
          {/* Actual Image Card */}
          <div className="absolute inset-0 rounded-[32px] overflow-hidden border border-slate-100/50 shadow-lg z-10">
            <Image
              src="/whoWeAreImg.png"
              alt="Who We Are"
              fill
              className="object-cover"
            />
            
            {/* Glassmorphic Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-6 right-6 backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg select-none min-w-[210px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                <Award className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <span className="block text-lg font-bold text-white leading-none">
                  2+ Years
                </span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider mt-1.5 block">
                  Industry Experience
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Our Mission & Our Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
        {/* Mission Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F3F8FF] border border-[#E1EEFE]/40 p-8 sm:p-10 rounded-[32px] shadow-sm relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-[0_4px_12px_rgba(0,71,207,0.03)] border border-[#E1EEFE]/30 mb-6">
            <Rocket className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
            Our Mission
          </h3>
          <p className="text-slate-500 font-semibold text-sm leading-relaxed">
            Empowering businesses with fast, secure, and transparent access to the capital they need to thrive. We believe financial empowerment should be instantaneous and uncomplicated.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[#F3F8FF] border border-[#E1EEFE]/40 p-8 sm:p-10 rounded-[32px] shadow-sm relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-[0_4px_12px_rgba(0,71,207,0.03)] border border-[#E1EEFE]/30 mb-6">
            <Eye className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
            Our Vision
          </h3>
          <p className="text-slate-500 font-semibold text-sm leading-relaxed">
            To be the most trusted and technically advanced lending platform globally, driving business growth through innovation, integrity, and unshakable authority in capital markets.
          </p>
        </motion.div>
      </div>
    </>
  );
}
