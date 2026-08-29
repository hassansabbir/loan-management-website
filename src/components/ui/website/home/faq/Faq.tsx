"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";
import faqService, { FaqItem, fallbackFaqs } from "@/lib/faqService";

export default function Faq() {
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    let mounted = true;
    const fetchFaqs = async () => {
      try {
        const items = await faqService.getPublicFaqs();
        if (mounted && items.length > 0) {
          setFaqs(items);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFaqs();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="bg-[#F5F8FF] py-20 md:py-24 border-t border-blue-100/30 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50 mb-3 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mt-1">
            Common Questions
          </h2>
          <p className="mt-3 text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about our revenue financing process and terms.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {isLoading ? (
            // Skeleton loader
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-blue-100/40 rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-5 bg-slate-200 rounded-md w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded-md w-full" />
                </div>
              ))}
            </div>
          ) : (
            faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item._id || item.question || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-blue-100/60 hover:border-blue-200 rounded-2xl shadow-[0_2px_12px_rgba(0,71,207,0.02)] transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => toggleOpen(index)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-900 pr-4 leading-snug">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`shrink-0 transition-colors ${
                        isOpen ? "text-primary" : "text-gray-400"
                      }`}
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
                        <div className="px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-50/80 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </Section>
  );
}
