"use client";

import React, { useState } from "react";
import { useApply } from "../ApplyContext";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { data, submittedAppId } = useApply();
  const router = useRouter();

  // States captured when submitting successfully
  const [appId] = useState(
    () => submittedAppId || `#FL-2026-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [submittedDate] = useState(() => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  });

  const formatCurrency = (val: string | number) => {
    const num = typeof val === "number" ? val : parseFloat(val);
    if (isNaN(num)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleSuccessRedirect = (target: string = "/dashboard") => {
    // Clear localStorage on success page departure
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("funding_application");
    }
    router.push(target);
  };

  // Helper for displaying default values if empty
  const displayVal = (val: string, defaultVal: string) => {
    return val && val.trim() ? val : defaultVal;
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {/* Centered green checkmark */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#EBFDF5] text-emerald-500 flex items-center justify-center shadow-md shadow-emerald-100 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-6">
          Funding Application Submitted Successfully
        </h2>
        <p className="text-sm text-slate-500 font-semibold mt-3 max-w-xl leading-relaxed">
          We've successfully received your application and our team will now begin reviewing your business information and supporting documents.
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-10">
        
        {/* Left Column: Application Summary */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Application Summary
            </span>
            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider select-none">
              Under Review
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Application ID</span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {appId}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Requested Amount</span>
              <span className="font-bold text-primary mt-1.5 block text-lg">
                {data.requestedAmount ? formatCurrency(data.requestedAmount) : "£50,000.00"}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Business Name</span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(data.businessName, "ABC Trading Ltd.")}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Submitted On</span>
              <span className="font-semibold text-slate-500 mt-1.5 block">
                {submittedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar info cards */}
        <div className="space-y-6">
          
          {/* Blue block */}
          <div className="bg-primary text-white p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,71,207,0.08)] relative overflow-hidden">
            {/* Decorative clock background graphic */}
            <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 w-32 h-32 text-white/5 pointer-events-none select-none">
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                2-5 Days
              </h3>
              <p className="text-xs text-white/85 leading-relaxed mt-2.5 font-medium">
                Our team typically reviews applications within 2–5 business days. If we require additional information, we'll notify you via email and dashboard.
              </p>
            </div>
          </div>

          {/* Light grey card */}
          <div className="bg-[#FAFBFD] border border-slate-100 p-5 rounded-3xl flex gap-3 items-start">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.3">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Stay Updated
              </h4>
              <p className="text-xs font-semibold text-slate-400 mt-1.5 leading-relaxed">
                You'll receive updates whenever your application status changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Redirection buttons footer */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleSuccessRedirect("/dashboard")}
          className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-[#003CB5] text-white font-bold text-sm rounded-xl transition-all active:scale-97 cursor-pointer justify-center inline-flex"
        >
          Go to Dashboard
        </button>
        
        <button
          type="button"
          onClick={() => handleSuccessRedirect("/dashboard/funding")}
          className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:border-slate-350 bg-white font-bold text-sm rounded-xl text-slate-500 hover:text-slate-800 transition-all active:scale-97 cursor-pointer justify-center inline-flex"
        >
          View My Applications
        </button>
      </div>
    </div>
  );
}
