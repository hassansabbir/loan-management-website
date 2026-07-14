"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Banknote, Zap } from "lucide-react";

export default function Repayment() {
  return (
    <Section className="bg-[#FAFBFD] py-20 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Repayment Simulation Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-white border border-blue-200 border-l-4 border-l-primary rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,71,207,0.015)]">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                    Repayment Simulation
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                    See how a single sale flows through.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,71,207,0.12)] shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>

              {/* Simulation Flow Row */}
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Sale Circle */}
                <div className="w-24 h-24 rounded-full border border-blue-100 bg-[#F9FBFF] flex flex-col items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,71,207,0.01)]">
                  <span className="text-base font-bold text-gray-900">£1,000</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-0.5 tracking-wider uppercase">Sale</span>
                </div>

                {/* Dashed Connector Line */}
                <div className="flex-1 flex items-center justify-center gap-2 select-none">
                  <div className="border-t-2 border-dashed border-gray-200 flex-1 h-0" />
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest whitespace-nowrap px-1">
                    8% SHARE
                  </span>
                  <div className="border-t-2 border-dashed border-gray-200 flex-1 h-0" />
                </div>

                {/* Breakdown Boxes */}
                <div className="flex flex-col gap-2.5 shrink-0">
                  {/* Keep Box */}
                  <div className="bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534] rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold font-mono tracking-tight text-center whitespace-nowrap">
                    You Keep:<span className="font-bold">£920.00</span>
                  </div>
                  {/* Repayment Box */}
                  <div className="bg-[#EFF6FF] border border-[#DBEAFE] text-[#1E40AF] rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold font-mono tracking-tight text-center whitespace-nowrap">
                    Repayment:<span className="font-bold">£80.00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Automatic & Painless
            </h2>
            <p className="mt-6 text-[15px] sm:text-base text-gray-400 leading-relaxed font-normal">
              There are no manual transfers or monthly invoices to worry about.
              <br />
              <strong className="font-bold text-gray-900">Our API</strong>
              <br />
              integrates with your payment processor to automatically deduct the
              <br />
              <strong className="font-bold text-gray-900">agreed</strong>
              <br />
              percentage at the point of sale.
            </p>

            {/* List */}
            <div className="mt-8 flex flex-col gap-4 w-full">
              {[
                "No interest rates, just a simple flat fee",
                "Daily settlement matches your cash cycle",
                "Zero penalty for slow sales periods",
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary fill-primary shrink-0" />
                  <span className="text-sm md:text-[15px] text-gray-700 font-semibold tracking-tight">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
