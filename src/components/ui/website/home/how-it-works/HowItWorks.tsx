"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";

// Custom SVG Icons matching the design exactly
const ApplyIcon = () => (
  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="13" y2="6" />
    <line x1="3" y1="12" x2="13" y2="12" />
    <line x1="3" y1="18" x2="10" y2="18" />
    <path d="M16 16l4-4a2.12 2.12 0 0 0-3-3l-4 4L13 18z" />
  </svg>
);

const GetFundedIcon = () => (
  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <line x1="6" y1="12" x2="6.01" y2="12" />
    <line x1="18" y1="12" x2="18.01" y2="12" />
  </svg>
);

const IntegratePaymentsIcon = () => (
  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <polyline points="8 13 5 15 8 17" />
    <polyline points="16 13 19 15 16 17" />
  </svg>
);

const RepayIcon = () => (
  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

const steps = [
  {
    number: "1. Apply in minutes",
    description: "Connect your banking and sales platforms securely in a few clicks.",
    icon: ApplyIcon,
  },
  {
    number: "2. Get funded",
    description: "Receive a tailored offer within 24 hours. Capital lands in your account instantly.",
    icon: GetFundedIcon,
  },
  {
    number: "3. Integrate payments",
    description: "Our system monitors your daily revenue to calculate flexible repayments.",
    icon: IntegratePaymentsIcon,
  },
  {
    number: "4. Repay automatically",
    description: "Repay a fixed % of sales. When sales are slow, you pay less. Simple.",
    icon: RepayIcon,
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-white py-24 relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            How It Works?
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed font-normal">
            Skip the bank queues and pitch decks. Our data-driven funding model gets
            you the capital you need in days, not months.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative w-full z-10">
          {/* Connecting line (Visible only on desktop/tablet) */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-blue-100 hidden md:block -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon Wrapper */}
                  <div className="w-16 h-16 rounded-full bg-white border border-blue-100 shadow-[0_4px_10px_rgba(0,71,207,0.03)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_6px_18px_rgba(0,71,207,0.08)]">
                    <Icon />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#111827] mt-6 tracking-tight">
                    {step.number}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed max-w-[250px] md:max-w-none">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
