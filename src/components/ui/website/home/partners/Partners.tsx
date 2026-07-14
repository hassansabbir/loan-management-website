"use client";

import { motion } from "framer-motion";

const partners = [
  "TechNation",
  "Finnovate",
  "UKScaleup",
  "Seedrs",
  "FoundersNetwork"
];

export default function Partners() {
  return (
    <section className="bg-[#F5F8FF] py-12 border-y border-blue-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs sm:text-sm font-semibold tracking-wider text-gray-500 uppercase mb-8 cursor-default"
        >
          Empowering high-growth startups
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16 lg:gap-x-20">
          {partners.map((partner, index) => (
            <motion.span
              key={partner}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.65, y: 0 }}
              whileHover={{ opacity: 0.95, scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-lg md:text-xl font-medium text-gray-600 tracking-tight cursor-default select-none transition-colors duration-200 hover:text-primary"
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
