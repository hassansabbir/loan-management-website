"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { ApplyProvider, useApply } from "./ApplyContext";

function StepperContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentStep } = useApply();

  let activeStep = 1;
  if (pathname.includes("/financials")) activeStep = 2;
  else if (pathname.includes("/banking")) activeStep = 3;
  else if (pathname.includes("/documents")) activeStep = 4;
  else if (pathname.includes("/review")) activeStep = 5;

  const stepList = [
    { number: 1, label: "Business", path: "/apply/business" },
    { number: 2, label: "Financials", path: "/apply/financials" },
    { number: 3, label: "Banking", path: "/apply/banking" },
    { number: 4, label: "Documents", path: "/apply/documents" },
    { number: 5, label: "Review", path: "/apply/review" },
  ];

  const isSuccessPage = pathname.includes("/success");

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24 pt-6">
      <Container className="max-w-4xl">
        {/* Stepper Container */}
        {!isSuccessPage && (
          <div className="w-full py-8 mb-4">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
              {/* Line background */}
              <div className="absolute top-[20px] left-6 right-6 h-[2px] bg-slate-200 z-0" />
              
              {/* Line foreground progress */}
              <motion.div 
                className="absolute top-[20px] left-6 h-[2px] bg-primary z-0"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${((activeStep - 1) / (stepList.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {stepList.map((step) => {
                const isActive = activeStep === step.number;
                const isCompleted = activeStep > step.number;

                return (
                  <div key={step.number} className="flex flex-col items-center relative z-10 w-20">
                    <button
                      type="button"
                      onClick={() => {
                        if (step.number <= activeStep || isCompleted) {
                          router.push(step.path);
                        }
                      }}
                      disabled={step.number > activeStep && !isCompleted}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive 
                          ? "bg-primary text-white shadow-md shadow-blue-200 scale-105" 
                          : isCompleted
                          ? "bg-primary text-white hover:bg-primary/95"
                          : "bg-slate-100 text-slate-400 border-2 border-transparent cursor-not-allowed"
                      }`}
                    >
                      {step.number}
                    </button>
                    <span 
                      className={`mt-2.5 text-xs font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-primary font-bold" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Steps Content Area with slide animations */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApplyProvider>
      <StepperContent>{children}</StepperContent>
    </ApplyProvider>
  );
}
