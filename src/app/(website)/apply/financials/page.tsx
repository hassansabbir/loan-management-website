"use client";

import React, { useState } from "react";
import { useApply } from "../ApplyContext";
import { ArrowLeft, ArrowRight, Info, Check } from "lucide-react";

export default function FinancialsStep() {
  const { data, updateData, goToNextStep, goToPrevStep } = useApply();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "£0";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const validate = () => {
    // Paused validation for development
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      goToNextStep();
    }
  };

  return (
    <form onSubmit={handleContinue} className="max-w-4xl mx-auto">
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Main Form Card (Col-span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,71,207,0.02)]">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Financial Information
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed font-medium">
            Provide your business's financial performance data to receive an instant funding quote.
          </p>

          <div className="mt-8 space-y-6">
            {/* Slider Container */}
            <div className="bg-[#F7FAFC] border border-slate-100 p-6 rounded-2xl">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Requested Funding Amount
              </span>
              <div className="flex items-end justify-between mt-3">
                <span className="text-3xl font-extrabold text-primary tracking-tight">
                  {formatCurrency(data.requestedAmount || "50000")}
                </span>
                <span className="text-xs font-bold text-slate-500 font-mono mb-1">
                  Max: £250,000
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={data.requestedAmount || "50000"}
                onChange={(e) => updateData({ requestedAmount: e.target.value })}
                className="w-full mt-5 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary outline-none"
              />
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Avg. Monthly Revenue */}
              <div>
                <label htmlFor="monthlyRevenue" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Avg. Monthly Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    £
                  </span>
                  <input
                    type="number"
                    id="monthlyRevenue"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={data.monthlyRevenue}
                    onChange={(e) => {
                      updateData({ monthlyRevenue: e.target.value });
                      if (errors.monthlyRevenue) setErrors(prev => ({ ...prev, monthlyRevenue: "" }));
                    }}
                    className={`w-full pl-8 pr-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                      errors.monthlyRevenue ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.monthlyRevenue && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.monthlyRevenue}</p>
                )}
              </div>

              {/* Annual Turnover */}
              <div>
                <label htmlFor="annualTurnover" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Annual Turnover
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    £
                  </span>
                  <input
                    type="number"
                    id="annualTurnover"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={data.annualTurnover}
                    onChange={(e) => {
                      updateData({ annualTurnover: e.target.value });
                      if (errors.annualTurnover) setErrors(prev => ({ ...prev, annualTurnover: "" }));
                    }}
                    className={`w-full pl-8 pr-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                      errors.annualTurnover ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.annualTurnover && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.annualTurnover}</p>
                )}
              </div>

              {/* Primary Sales Channel */}
              <div>
                <label htmlFor="salesChannel" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Primary Sales Channel
                </label>
                <select
                  id="salesChannel"
                  value={data.salesChannel}
                  onChange={(e) => updateData({ salesChannel: e.target.value })}
                  className="w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="Stripe">Stripe</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Amazon">Amazon</option>
                  <option value="PayPal">PayPal</option>
                  <option value="eBay">eBay</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Monthly Sales Volume */}
              <div>
                <label htmlFor="salesVolume" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Monthly Sales Volume
                </label>
                <input
                  type="number"
                  id="salesVolume"
                  placeholder="Number of transactions"
                  min="0"
                  value={data.salesVolume}
                  onChange={(e) => {
                    updateData({ salesVolume: e.target.value });
                    if (errors.salesVolume) setErrors(prev => ({ ...prev, salesVolume: "" }));
                  }}
                  className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                    errors.salesVolume ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
                  }`}
                />
                {errors.salesVolume && (
                  <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.salesVolume}</p>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Side Panels (Col-span 1) */}
        <div className="space-y-6">
          
          {/* Why this data? */}
          <div className="bg-[#EBF3FF] border border-[#D6E6FF]/80 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0 font-bold">i</span>
              Why this data?
            </h3>
            <p className="text-xs font-medium text-[#4A5568] leading-relaxed mt-3">
              We use your sales data to calculate your funding offer in real-time. By understanding your average monthly revenue and turnover, we can provide a personalized limit that doesn't overleverage your business.
            </p>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-extrabold shrink-0">✓</span>
                Secure data encryption
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-4.5 h-4.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-extrabold shrink-0">✓</span>
                No impact on credit score
              </div>
            </div>
          </div>

          {/* Dynamic Calculation Mock Panel */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
            {/* Visual CSS Bar Chart */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 aspect-4/3 flex items-end justify-between gap-2.5 overflow-hidden relative">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none z-0">
                <div className="border-b border-slate-100/70 w-full h-0" />
                <div className="border-b border-slate-100/70 w-full h-0" />
                <div className="border-b border-slate-100/70 w-full h-0" />
              </div>
              
              {/* Bars */}
              <div className="w-full bg-[#E2E8F0] rounded-t-md h-[40%] z-10 transition-all duration-500 hover:bg-[#CBD5E1]" />
              <div className="w-full bg-[#CBD5E1] rounded-t-md h-[65%] z-10 transition-all duration-500 hover:bg-[#94A3B8]" />
              <div className="w-full bg-[#93C5FD] rounded-t-md h-[55%] z-10 transition-all duration-500 hover:bg-[#60A5FA]" />
              <div className="w-full bg-primary/70 rounded-t-md h-[80%] z-10 transition-all duration-500 hover:bg-primary" />
              <div className="w-full bg-[#34D399] rounded-t-md h-[95%] z-10 transition-all duration-500 hover:bg-[#10B981]" />
            </div>

            <h4 className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase mt-4">
              DYNAMIC CALCULATION
            </h4>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed mt-2.5 italic">
              "Most customers see an offer within 2 minutes of completing this step."
            </p>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div className="mt-8 flex items-center justify-between px-2">
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
          Continue to Banking
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
