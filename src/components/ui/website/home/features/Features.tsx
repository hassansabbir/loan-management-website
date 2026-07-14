"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { ArrowRight, Accessibility, BarChart3, Shield, Zap, Lock, Headphones } from "lucide-react";

import flexibleRepaymentImg from "@/assets/features/flexibleRepaymentImage.png";
import fourthCardImg from "@/assets/features/fourthCardImage.png";

export default function Features() {
  return (
    <Section className="bg-[#FAFBFD] py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Growth without dilution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-[#00349A] rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between min-h-[350px] shadow-[0_10px_35px_rgba(0,71,207,0.06)]"
          >
            <div>
              <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Built for Founders
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 leading-tight">
                Growth without <br />
                dilution.
              </h3>
              <p className="mt-4 text-white/80 text-[15px] leading-relaxed max-w-sm">
                Keep 100% of your equity. Our revenue-based funding is designed for founders who want to scale while maintaining control of their vision.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/apply">
                <button className="bg-white text-primary hover:bg-white/95 font-bold text-sm px-5 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-md active:scale-97 cursor-pointer">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Flexible Repayments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center min-h-[350px] shadow-[0_10px_30px_rgba(0,0,0,0.015)] overflow-hidden"
          >
            <div className="flex flex-col items-start justify-center">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                <Accessibility className="w-5 h-5 stroke-[2.2px]" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mt-6 tracking-tight">
                Flexible repayments
              </h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium">
                Your repayments mirror your sales performance. Pay more when you're booming, pay less during slow months. It's the ultimate cash-flow friendly finance.
              </p>
            </div>
            <div className="relative w-full h-[220px] sm:h-full min-h-[240px] flex items-center justify-center">
              <Image
                src={flexibleRepaymentImg}
                alt="Flexible Repayments chart"
                fill
                className="object-contain scale-110 sm:scale-115"
                sizes="(max-width: 640px) 100vw, 30vw"
                priority
              />
            </div>
          </motion.div>

          {/* Card 3: Transparent Reporting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 flex flex-col justify-start min-h-[350px] shadow-[0_10px_30px_rgba(0,0,0,0.015)]"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mt-6 tracking-tight">
              Transparent reporting
            </h3>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium max-w-sm">
              Access real-time dashboards to track your growth, see exactly how much you've repaid, and understand your funding health at a glance.
            </p>
          </motion.div>

          {/* Card 4: Dark 3D Chart Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-linear-to-br from-[#011A47] to-[#023EAB] rounded-3xl border border-[#0A1D3F]/20 min-h-[350px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative"
          >
            <div className="absolute inset-0 p-8">
              <div className="relative w-full h-full">
                <Image
                  src={fourthCardImg}
                  alt="3D Growth graph"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom highlights summary section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.015)] mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-150"
        >
          {/* Highlight 1 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
              <Shield className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-[15px]">Found Friendly</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[180px]">No personal guarantees or collateral.</p>
            </div>
          </div>
          
          {/* Highlight 2 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
              <Zap className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-[15px]">Fast & Simple</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[180px]">Quick approval and funding within 24 hours.</p>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
              <Lock className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-[15px]">Secure & Compliant</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[180px]">Bank-level security to keep your data and business safe.</p>
            </div>
          </div>

          {/* Highlight 4 */}
          <div className="flex items-center gap-4 lg:px-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white">
              <Headphones className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-[15px]">Dedicated Support</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[180px]">A team that's with you at every stage of growth.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}
