"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Eligibility" | "Repayments" | "Security";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "General",
    question: "What is revenue-based financing?",
    answer: "Revenue-based financing is a type of funding where a business receives capital upfront in exchange for a percentage of its future monthly revenues. Repayments fluctuate dynamically based on your daily or monthly sales volumes, meaning you pay more when sales are strong and less when business is slower."
  },
  {
    category: "General",
    question: "How is this different from a traditional bank loan?",
    answer: "Unlike traditional bank loans, our funding requires no collateral, no personal guarantees, and no fixed monthly installments. Instead of compounding interest rates, we charge a single flat fee that is agreed upon upfront. Payments adjust naturally with your cash flow."
  },
  {
    category: "General",
    question: "How long does the application process take?",
    answer: "The online application takes less than 10 minutes to complete. By integrating securely with your business bank accounts and payment processors, our automated risk systems can evaluate your eligibility in hours. Approved offers are typically funded within 24 hours."
  },
  {
    category: "Eligibility",
    question: "Is my business eligible for funding?",
    answer: "To qualify for funding, your business must be UK-registered, have been actively trading for at least 6 months, and generate a minimum of £10,000 in monthly revenue. We support a wide variety of business models, with a special focus on retail, e-commerce, and automotive industries."
  },
  {
    category: "Eligibility",
    question: "What is the maximum amount I can request?",
    answer: "We provide funding amounts ranging from £10,000 up to £500,000. The specific amount you qualify for is determined by your historical monthly revenue trend and overall business transaction health."
  },
  {
    category: "Eligibility",
    question: "Do you perform hard credit checks?",
    answer: "No, we do not run hard credit checks that impact your personal credit score. We focus on your business's real-time financial health, cash flow data, and transaction histories to make our credit decisions."
  },
  {
    category: "Repayments",
    question: "How do repayments work?",
    answer: "Repayments are fully automated. We securely connect to your payment processor (e.g., Stripe, Shopify) or bank account and collect a pre-agreed percentage (typically between 5% and 15%) of your daily card sales until the funding amount and flat fee are settled."
  },
  {
    category: "Repayments",
    question: "Are there any hidden fees or late charges?",
    answer: "Absolutely not. We do not charge compounding interest, late payment penalties, setup fees, or hidden transaction costs. You pay a single flat fee that is agreed upon upfront before accepting the funds."
  },
  {
    category: "Repayments",
    question: "Can I pay off the funding early?",
    answer: "Yes, you can choose to make one-off manual payments to settle the remaining balance early at any time. There are no early repayment penalties or additional fees for doing so."
  },
  {
    category: "Security",
    question: "How do you protect my financial data?",
    answer: "We use bank-grade 256-bit encryption protocols to protect all incoming and outgoing data. We partner with FCA-regulated Open Banking API providers to access read-only transaction history, meaning we never see or store your login credentials."
  },
  {
    category: "Security",
    question: "Are my bank login details safe?",
    answer: "Yes, completely. Because we utilize secure FCA-regulated Open Banking integrations, you are redirected to log in directly via your bank's secure portal. We never access, store, or have visibility into your password or PIN details."
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Filtered FAQ Items
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      return (
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container>
        
        {/* Top Banner with Image Background */}
        <div className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-lg mb-10">
          <Image
            src="/faq_banner.png"
            alt="FAQ Help Center"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          
          {/* Centered Heading */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              FAQ & Help Center
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-3 max-w-md">
              Everything you need to know about our business funding, payouts, and security protocols.
            </p>
          </div>
        </div>

        {/* Search Input Section */}
        <div className="max-w-md mx-auto mb-12 animate-fade-in">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedIndex(null);
              }}
              className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary/50 shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
          </div>
        </div>

        {/* FAQs Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => handleToggle(idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-800">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 shrink-0"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    {/* Collapsible Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 border-t border-slate-50 text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white border border-slate-100 rounded-3xl"
              >
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-800">No results found</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Try checking your spelling or search using different keywords.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Card: Still have questions? */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="bg-white border border-[#E1EEFE]/40 p-8 sm:p-10 rounded-[32px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Left curved accent background */}
            <div 
              className="absolute inset-0 border-l-2 border-t-2 border-b-2 border-primary rounded-[32px] pointer-events-none" 
              style={{ clipPath: "polygon(0 0, 48px 0, 48px 100%, 0 100%)" }}
            />
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0 shadow-sm border border-[#E1EEFE]/40">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-800">
                  Still have questions?
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                  Can't find the answer you're looking for? Reach out to our dedicated support team.
                </p>
              </div>
            </div>
            
            <Link href="/contact" className="shrink-0">
              <button className="bg-primary hover:bg-[#003CB5] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-97 cursor-pointer">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
}
