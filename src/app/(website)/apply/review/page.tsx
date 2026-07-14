"use client";

import React, { useState } from "react";
import { useApply, ApplicationData } from "../ApplyContext";
import { ArrowLeft, Check, CheckCircle2, Edit2, FileText, Landmark, Loader2, Building2, TrendingUp, CreditCard, Send } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ReviewStep() {
  const { data, goToPrevStep } = useApply();
  const router = useRouter();
  const [agreedInfo, setAgreedInfo] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/apply/success");
    }, 2000);
  };

  // Helper for displaying default values if empty
  const displayVal = (val: string, defaultVal: string) => {
    return val && val.trim() ? val : defaultVal;
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Main Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Review your application
          </h2>
          <p className="text-sm text-slate-500 font-semibold mt-2 leading-relaxed">
            Please double-check all details before submitting. Once submitted, your application cannot be edited during the review process.
          </p>
        </div>

        {/* Card 1: Business Details */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-primary shrink-0" />
              Business Details
            </h3>
            <Link 
              href="/apply/business"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Company Name</span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(data.businessName, "Stellar Dynamics UK Ltd")}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Registration No.</span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(data.crn, "#09823412")}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Established</span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(data.yearsInBusiness, "March 2019")}
              </span>
            </div>
            <div className="sm:col-span-3">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Registered Address</span>
              <span className="font-bold text-slate-800 mt-1.5 block leading-relaxed">
                {displayVal(data.address, "72 High Street, Shoreditch, London, E1 6JJ")}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Financials */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-primary shrink-0" />
              Financials
            </h3>
            <Link 
              href="/apply/financials"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Avg. Monthly Revenue</span>
              <span className="font-bold text-primary mt-1.5 block text-lg">
                {data.monthlyRevenue ? formatCurrency(data.monthlyRevenue) : "£85,000.00"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Funding Requested</span>
              <span className="font-bold text-primary mt-1.5 block text-lg">
                {data.requestedAmount ? formatCurrency(data.requestedAmount) : "£250,000.00"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Purpose</span>
              <span className="font-bold text-slate-800 mt-1.5 block leading-relaxed">
                {displayVal(data.fundingPurpose, "Inventory & Expansion")}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Banking */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <Landmark className="w-5 h-5 text-primary shrink-0" />
              Banking
            </h3>
            <Link 
              href="/apply/banking"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>

          <div className="space-y-3.5">
            {/* Bank Card Pill 1 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {displayVal(data.bankName, "Barclays Business Premier")}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
                    ENDS IN {data.accountNumber ? data.accountNumber.slice(-4) : "4492"} • CONNECTED VIA PLAID
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                VERIFIED
              </span>
            </div>

            {/* Bank Card Pill 2 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Stripe Payments
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
                    ID: STELLAR_LIVE_0X42 • CONNECTED
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Documents */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              Documents
            </h3>
            <Link 
              href="/apply/documents"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Doc 1 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4.5 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <span className="truncate pr-2">
                  {displayVal(data.docRegistration, "Annual_Accounts_2023.pdf")}
                </span>
              </div>
              <span className="text-slate-400 font-semibold shrink-0">1.2 MB</span>
            </div>

            {/* Doc 2 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4.5 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <span className="truncate pr-2">
                  {displayVal(data.docTaxReturn, "VAT_Return_Q4_2023.pdf")}
                </span>
              </div>
              <span className="text-slate-400 font-semibold shrink-0">840 KB</span>
            </div>

            {/* Doc 3 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4.5 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <span className="truncate pr-2">
                  {displayVal(data.docPhotoId, "Passport_Director_1.pdf")}
                </span>
              </div>
              <span className="text-slate-400 font-semibold shrink-0">2.4 MB</span>
            </div>

            {/* Doc 4 */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4.5 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <span className="truncate pr-2">
                  {displayVal(data.docBankStatements, "Bank_Statements.pdf")}
                </span>
              </div>
              <span className="text-slate-400 font-semibold shrink-0">1.8 MB</span>
            </div>
          </div>
        </div>

        {/* Declarations Panel */}
        <div className="bg-[#F8FAFC] border border-slate-100 p-6 sm:p-8 rounded-3xl space-y-4">
          <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Declarations
          </span>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedInfo}
              onChange={(e) => setAgreedInfo(e.target.checked)}
              className="mt-1 w-4.5 h-4.5 rounded text-primary focus:ring-primary border-slate-200 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
              I confirm that all information provided is accurate and truthful to the best of my knowledge. I understand that providing false information can lead to immediate rejection.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group pt-2">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-4.5 h-4.5 rounded text-primary focus:ring-primary border-slate-200 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
              I agree to the <Link href="/terms" className="text-primary hover:underline font-bold">Terms of Service</Link>, <Link href="/privacy" className="text-primary hover:underline font-bold">Privacy Policy</Link>, and the sharing of my financial data for assessment.
            </span>
          </label>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <button
            type="button"
            onClick={goToPrevStep}
            disabled={isSubmitting}
            className="px-5 py-3.5 border border-slate-200 hover:border-slate-350 text-slate-600 hover:text-slate-800 bg-white font-bold text-sm rounded-xl inline-flex items-center gap-2 transition-all active:scale-97 disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </button>

          <span className="text-xs font-semibold text-slate-400 italic">
            All data is encrypted and handled securely.
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-7 py-4 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-97 disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <Send className="w-4 h-4 rotate-45 -translate-y-0.5 shrink-0" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
