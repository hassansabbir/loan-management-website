"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Globe, Calendar, TrendingUp } from "lucide-react";

const requirements = [
  {
    title: "UK Registered",
    description: "Your business must be a registered UK Limited company or Partnership.",
    icon: Globe,
  },
  {
    title: "6+ Months",
    description: "Trading for at least six months with consistent revenue history.",
    icon: Calendar,
  },
  {
    title: "£10k+ Monthly",
    description: "Average monthly revenue of at least £10,000 over the last quarter.",
    icon: TrendingUp,
  },
];

export default function Eligibility() {
  return (
    <Section className="bg-white py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Are you eligible?
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed font-normal">
            We fund UK companies across E-commerce, SaaS, and D2C.
          </p>
        </motion.div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {requirements.map((req, index) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_30px_rgba(0,71,207,0.02)] transition-all duration-350 group"
              >
                {/* Icon Wrapper */}
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6 stroke-[2px]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mt-6 tracking-tight">
                  {req.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed max-w-[260px]">
                  {req.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
