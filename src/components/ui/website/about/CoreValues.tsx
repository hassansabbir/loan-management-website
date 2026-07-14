"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CoreValues() {
  return (
    <div className="mt-28 mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs sm:text-sm font-extrabold text-primary uppercase tracking-widest block mb-2.5">
          Guiding Principles
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Our Core Values
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        
        {/* Value 1: Trust (Left curved border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 border-l-2 border-t-2 border-b-2 border-primary rounded-[20px] pointer-events-none" 
            style={{ clipPath: "polygon(0 0, 36px 0, 36px 100%, 0 100%)" }}
          />
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Trust
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            The foundation of every automotive deal and institutional partnership we build.
          </p>
        </motion.div>

        {/* Value 2: Transparency (No border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Transparency
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            Complete clarity on terms, rates, and processes from day one.
          </p>
        </motion.div>

        {/* Value 3: Innovation (Right curved border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 border-r-2 border-t-2 border-b-2 border-primary rounded-[20px] pointer-events-none" 
            style={{ clipPath: "polygon(100% 0, calc(100% - 36px) 0, calc(100% - 36px) 100%, 100% 100%)" }}
          />
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Innovation
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            Constantly refining our tech stack to provide superior financial performance.
          </p>
        </motion.div>

        {/* Value 4: Security (Left curved border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 border-l-2 border-t-2 border-b-2 border-primary rounded-[20px] pointer-events-none" 
            style={{ clipPath: "polygon(0 0, 36px 0, 36px 100%, 0 100%)" }}
          />
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Security
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            Uncompromising protection of client data and financial assets.
          </p>
        </motion.div>

        {/* Value 5: Integrity (No border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Integrity
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            Doing the right thing, every time, in every deal we facilitate.
          </p>
        </motion.div>

        {/* Value 6: Customer Success (Right curved border) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-[#F4F9FF] p-8 sm:p-9 rounded-[20px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.005)] overflow-hidden"
        >
          <div 
            className="absolute inset-0 border-r-2 border-t-2 border-b-2 border-primary rounded-[20px] pointer-events-none" 
            style={{ clipPath: "polygon(100% 0, calc(100% - 36px) 0, calc(100% - 36px) 100%, 100% 100%)" }}
          />
          <h3 className="text-xl font-bold text-primary mb-2.5">
            Customer Success
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
            We only win when our partners and clients scale their business.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
