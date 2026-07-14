"use client";

import React from "react";
import { Zap, ShieldCheck, BarChart3, Handshake, Cpu, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <div className="mt-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Why Businesses Choose Us
        </h2>
        <p className="text-slate-500 font-semibold text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          The Loan advantage combines speed, security, and superior support.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        
        {/* Card 1: Fast Funding */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-[48px] rounded-b-none text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #F0F6FF 0%, #FFFFFF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Fast Funding
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Capital delivered in hours, not weeks, to keep your deals moving at full speed.
          </p>
        </motion.div>

        {/* Card 2: Secure Identity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-[48px] rounded-b-none text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #F0F6FF 0%, #FFFFFF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Secure Identity
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Bank-grade encryption and biometric verification for total peace of mind.
          </p>
        </motion.div>

        {/* Card 3: Transparent Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-[48px] rounded-b-none text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #F0F6FF 0%, #FFFFFF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Transparent Process
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            No hidden fees or fine print. Real-time visibility into every stage of your application.
          </p>
        </motion.div>

        {/* Card 4: Trusted Partners */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-none rounded-b-[48px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F0F6FF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <Handshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Trusted Partners
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Integrated with world-class financial institutions and credit bureaus.
          </p>
        </motion.div>

        {/* Card 5: Automated Credit */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-none rounded-b-[48px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F0F6FF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Automated Credit
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Advanced algorithms provide instant, accurate credit assessments.
          </p>
        </motion.div>

        {/* Card 6: Customer Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-[#E2EEFE] p-7.5 rounded-t-none rounded-b-[48px] text-left shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #F0F6FF 100%)" }}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-primary flex items-center justify-center border border-[#E1EEFE]/40 mb-6">
            <Headphones className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
            Customer Support
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Dedicated account managers ready to support your unique business needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
