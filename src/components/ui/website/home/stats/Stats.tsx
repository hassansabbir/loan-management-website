"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "£50M+",
    label: "Total Funded to Date",
  },
  {
    value: "2,500+",
    label: "Businesses Empowered",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-10 md:py-12 border-y border-gray-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400 mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
