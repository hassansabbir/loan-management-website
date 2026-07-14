"use client";

import React, { useState } from "react";
import { useApply } from "../ApplyContext";
import { ArrowLeft, ArrowRight, Lock, Landmark, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BankingStep() {
  const { data, updateData, goToNextStep, goToPrevStep } = useApply();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<"select" | "connecting" | "success">("select");
  const [selectedBank, setSelectedBank] = useState("");

  const validate = () => {
    // Paused validation for development
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const rawSort = data.sortCode || "";
      const rawAcc = data.accountNumber || "";
      const rawIban = data.iban || "";

      const cleanSortCode = rawSort.replace(/[-\s]/g, "");
      const formattedSortCode = cleanSortCode.length >= 6 
        ? `${cleanSortCode.slice(0, 2)}-${cleanSortCode.slice(2, 4)}-${cleanSortCode.slice(4, 6)}`
        : cleanSortCode;
      const cleanAccNum = rawAcc.replace(/[-\s]/g, "");
      const formattedIban = rawIban.replace(/[\s]/g, "").toUpperCase();

      updateData({
        sortCode: formattedSortCode,
        accountNumber: cleanAccNum,
        iban: formattedIban,
      });

      goToNextStep();
    }
  };

  const triggerOpenBanking = () => {
    setSelectedBank("");
    setModalStep("select");
    setShowModal(true);
  };

  const selectBank = (bank: string) => {
    setSelectedBank(bank);
    setModalStep("connecting");
    
    // Simulate linking
    setTimeout(() => {
      setModalStep("success");
      
      // Auto-fill values
      const mockSortCode = "40-02-50";
      const mockAccNum = "82736452";
      const mockIban = `GB29HSBC400250${mockAccNum}`;
      
      updateData({
        bankName: `${bank} Business Bank`,
        accountName: data.businessName || "Acme Tech Solutions Ltd",
        sortCode: mockSortCode,
        accountNumber: mockAccNum,
        iban: mockIban,
      });

      // Clear errors
      setErrors({});
      
      // Close modal
      setTimeout(() => {
        setShowModal(false);
      }, 1200);
    }, 1800);
  };

  const bankList = [
    { name: "Barclays Bank", color: "bg-sky-50 text-sky-600 border-sky-100" },
    { name: "HSBC Bank", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { name: "Lloyds Bank", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "NatWest", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { name: "Monzo Bank", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { name: "Revolut", color: "bg-slate-50 text-slate-700 border-slate-200" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleContinue} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left: Banking & Payouts card (col-span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,71,207,0.02)]">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Banking & Payouts
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed font-medium">
            Connect your business bank account to receive funding and automate repayments. We use bank-grade security to encrypt your data.
          </p>

          <div className="mt-8 space-y-6">
            {/* Open Banking Card Banner */}
            <div className="bg-[#F1F5FB]/40 border border-blue-50/70 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm shadow-blue-100">
                  <Landmark className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Connect via Open Banking
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    Verification in seconds. No manual entry needed.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={triggerOpenBanking}
                className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-md active:scale-97 cursor-pointer w-full sm:w-auto justify-center"
              >
                Connect Account
                <span className="text-[10px]">⚡</span>
              </button>
            </div>

            {/* Divider line */}
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-150" />
              </div>
              <span className="relative px-4 bg-white text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                Or enter manually
              </span>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Bank Name */}
              <div>
                <label htmlFor="bankName" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  placeholder="e.g. Barclays Bank"
                  value={data.bankName}
                  onChange={(e) => {
                    updateData({ bankName: e.target.value });
                    if (errors.bankName) setErrors(prev => ({ ...prev, bankName: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.bankName ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.bankName && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.bankName}</p>
                )}
              </div>

              {/* Account Holder Name */}
              <div>
                <label htmlFor="accountName" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  placeholder="Full Legal Name"
                  value={data.accountName}
                  onChange={(e) => {
                    updateData({ accountName: e.target.value });
                    if (errors.accountName) setErrors(prev => ({ ...prev, accountName: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.accountName ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.accountName && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.accountName}</p>
                )}
              </div>

              {/* Sort Code */}
              <div>
                <label htmlFor="sortCode" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Sort Code
                </label>
                <input
                  type="text"
                  id="sortCode"
                  placeholder="00-00-00"
                  value={data.sortCode}
                  onChange={(e) => {
                    updateData({ sortCode: e.target.value });
                    if (errors.sortCode) setErrors(prev => ({ ...prev, sortCode: "" }));
                  }}
                  maxLength={8}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.sortCode ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.sortCode && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.sortCode}</p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label htmlFor="accountNumber" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  placeholder="8-digit number"
                  value={data.accountNumber}
                  onChange={(e) => {
                    updateData({ accountNumber: e.target.value });
                    if (errors.accountNumber) setErrors(prev => ({ ...prev, accountNumber: "" }));
                  }}
                  maxLength={10}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.accountNumber ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.accountNumber && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.accountNumber}</p>
                )}
              </div>

              {/* IBAN */}
              <div className="sm:col-span-2">
                <label htmlFor="iban" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  IBAN (International Payouts)
                </label>
                <input
                  type="text"
                  id="iban"
                  placeholder="GB00 XXXX 0000 0000 0000 00"
                  value={data.iban}
                  onChange={(e) => {
                    updateData({ iban: e.target.value });
                    if (errors.iban) setErrors(prev => ({ ...prev, iban: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.iban ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.iban && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.iban}</p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right: Side Cards (col-span 1) */}
        <div className="space-y-6">
          
          {/* Secure Banking */}
          <div className="bg-[#F1F5FB]/60 border border-slate-100 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              Secure Banking
            </h3>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-4">
              Your credentials are never stored. Connections are read-only and secured via 256-bit encryption.
            </p>
          </div>

          {/* Skyscraper Building Asset */}
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative aspect-4/3 bg-slate-100 flex items-center justify-center">
            <Image
              src="/banking_sidebar.png"
              alt="Sleek skyscraper banking building at night"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>

        </div>

        {/* Footer Action Buttons */}
        <div className="col-span-1 lg:col-span-3 mt-8 flex items-center justify-between px-2">
          <button
            type="button"
            onClick={goToPrevStep}
            className="px-5 py-3 border border-slate-200 hover:border-slate-350 text-slate-600 hover:text-slate-800 bg-white font-bold text-sm rounded-xl inline-flex items-center gap-2 transition-all active:scale-97 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="submit"
            className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-97 cursor-pointer"
          >
            Continue to Documents
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

      {/* Open Banking Modal Simulation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {modalStep === "select" ? (
                <>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Connect Your Business Bank
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1.5 mb-6">
                    Select your bank to connect securely via Open Banking.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3.5">
                    {bankList.map((bank) => (
                      <button
                        key={bank.name}
                        type="button"
                        onClick={() => selectBank(bank.name)}
                        className={`flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer hover:shadow-md transition-all active:scale-97 font-bold text-xs ${bank.color}`}
                      >
                        <Landmark className="w-5 h-5 mb-2.5" />
                        {bank.name}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full mt-6 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 border border-slate-150 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : modalStep === "connecting" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <h4 className="text-base font-bold text-slate-800">
                    Connecting to {selectedBank}...
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-2 max-w-xs">
                    Please approve the connection on your bank's secure page. We are establishing a read-only tunnel.
                  </p>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Account Linked Successfully!
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-2">
                    Populating manual fields with verified details.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
