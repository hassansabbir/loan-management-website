"use client";

import React from "react";
import { UserCheck, Zap, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: UserCheck,
    title: "Dedicated UK Capital Specialist",
    description:
      "No automated call centers or generic bots. You speak directly with experienced London underwriters who understand modern UK business scaling.",
    badge: "1-on-1 Advisory",
  },
  {
    icon: Zap,
    title: "24-Hour Term Sheet Delivery",
    description:
      "Review tailored funding proposals with crystal-clear terms: fixed percentage of future revenue, zero equity dilution, and no personal guarantees.",
    badge: "Fast Decision",
  },
  {
    icon: Handshake,
    title: "Flexible Long-Term Capital Partnership",
    description:
      "As your turnover scales, your borrowing capacity automatically increases. Access top-up tranches on demand through your client dashboard.",
    badge: "Ongoing Scaling",
  },
];

export default function ContactFeatures() {
  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="block text-xs sm:text-sm font-bold text-primary uppercase tracking-widest mb-2">
          The Loan Commitment
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          What Happens When You Reach Out?
        </h2>
        <p className="text-slate-500 font-medium text-sm sm:text-base mt-2.5 leading-relaxed">
          From first inquiry to capital deployment, our process is built for high-speed UK commerce.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="border border-[#E2EEFE] p-8 rounded-3xl text-left shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden group hover:shadow-[0_12px_35px_rgba(0,71,207,0.06)] hover:border-primary/30 transition-all duration-300 bg-gradient-to-b from-[#F0F6FF] to-white"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE] shadow-xs group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2.5">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
