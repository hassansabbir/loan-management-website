"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "How quickly will an advisor contact my company?",
    answer:
      "Our London underwriting team reviews and responds to all verified business inquiries within 2 business hours during standard UK business hours (Monday – Friday, 8:00 AM – 6:30 PM GMT). Inquiries submitted after hours are prioritized first thing the following business day.",
  },
  {
    question: "What information should I have ready for an initial call?",
    answer:
      "Having an estimate of your recent monthly revenue (last 3–6 months) and the sales platforms you use (such as Stripe, Shopify, Amazon, or Open Banking) will enable our advisors to provide immediate financing ranges on your first call.",
  },
  {
    question: "Does reaching out or applying affect my credit score?",
    answer:
      "No. Reaching out to discuss your options, requesting pre-qualification, or receiving an initial term sheet does not leave a hard search footprint on your business or personal credit report.",
  },
  {
    question: "Can financial brokers, accountants, or advisors partner with Loan?",
    answer:
      "Yes, absolutely. We run an active UK intermediary and broker program with fast decision turnarounds, dedicated partner managers, and competitive commissions. Please select 'Partnership & Broker' on the form or email partners@loan.co.uk.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          Frequently Asked Questions
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Quick Answers Before You Reach Out
        </h2>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-primary/30 shadow-md shadow-blue-500/5"
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer focus:outline-none"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-3">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
