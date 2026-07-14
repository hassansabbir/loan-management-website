"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Leadership() {
  return (
    <div className="mt-28 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-left mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Meet the Leadership
        </h2>
        <p className="text-slate-500 font-semibold text-sm sm:text-base mt-2.5">
          Visionaries driving the future of capital.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Leader 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          className="group"
        >
          <div className="relative w-full aspect-4/5 rounded-[24px] overflow-hidden shadow-md bg-slate-100">
            <Image
              src="/leader_alexandra.png"
              alt="Alexandra Chen"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
          </div>
          <span className="block text-slate-800 font-bold text-base mt-4">
            Alexandra Chen
          </span>
          <span className="block text-slate-400 font-semibold text-xs mt-1">
            Chief Executive Officer
          </span>
        </motion.div>

        {/* Leader 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group"
        >
          <div className="relative w-full aspect-4/5 rounded-[24px] overflow-hidden shadow-md bg-slate-100">
            <Image
              src="/leader_marcus.png"
              alt="Marcus Thorne"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
          </div>
          <span className="block text-slate-800 font-bold text-base mt-4">
            Marcus Thorne
          </span>
          <span className="block text-slate-400 font-semibold text-xs mt-1">
            Chief Operations Officer
          </span>
        </motion.div>

        {/* Leader 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group"
        >
          <div className="relative w-full aspect-4/5 rounded-[24px] overflow-hidden shadow-md bg-slate-100">
            <Image
              src="/leader_elena.png"
              alt="Elena Rodriguez"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
          </div>
          <span className="block text-slate-800 font-bold text-base mt-4">
            Elena Rodriguez
          </span>
          <span className="block text-slate-400 font-semibold text-xs mt-1">
            Head of Product Strategy
          </span>
        </motion.div>

        {/* Leader 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group"
        >
          <div className="relative w-full aspect-4/5 rounded-[24px] overflow-hidden shadow-md bg-slate-100">
            <Image
              src="/leader_david.png"
              alt="David Wu"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-103"
            />
          </div>
          <span className="block text-slate-800 font-bold text-base mt-4">
            David Wu
          </span>
          <span className="block text-slate-400 font-semibold text-xs mt-1">
            Chief Risk Officer
          </span>
        </motion.div>
      </div>
    </div>
  );
}
