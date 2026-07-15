"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <Section id="support" className="bg-white py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-100 rounded-3xl p-12 md:p-16 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.015)]"
        >
          <h2 className="text-3xl md:text-5.5xl font-bold text-[#111827] tracking-tight mb-8">
            Ready to grow?
          </h2>
          <Link href="/apply">
            <button className="bg-primary text-white hover:bg-primary/95 font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(0,71,207,0.15)] active:scale-97 cursor-pointer">
              Apply Now
            </button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
