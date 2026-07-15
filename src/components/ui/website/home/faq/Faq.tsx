"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How much can I borrow?",
    answer:
      "We offer funding from £10,000 up to £2,000,000 depending on your average monthly revenue and overall financial health. Typically, you can qualify for up to 1-2x your average monthly sales.",
  },
  {
    question: "What are the repayment terms?",
    answer:
      "Repayments are flexible and tied to your daily sales. We agree on a fixed percentage (typically between 5% and 15%) of your revenue. There are no fixed monthly payments, interest rates, or late fees.",
  },
  {
    question: "Do I need a personal guarantee?",
    answer:
      "No, we do not require personal guarantees or collateral for our standard revenue-based funding. Our model is built on your business's performance, not your personal assets.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-[#F5F8FF] py-20 md:py-24 border-t border-blue-100/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-blue-100/50 rounded-2xl shadow-[0_2px_12px_rgba(0,71,207,0.015)] overflow-hidden"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 pr-4 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-gray-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.2px]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-gray-500 leading-relaxed font-normal border-t border-gray-50/50 pt-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
