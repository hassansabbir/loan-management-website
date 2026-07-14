"use client";

import React, { useState } from "react";
import { useApply } from "../ApplyContext";
import { ArrowRight } from "lucide-react";

export default function BusinessStep() {
  const { data, updateData, goToNextStep, isSaving } = useApply();
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    <form onSubmit={handleContinue} className="max-w-3xl mx-auto">
      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,71,207,0.02)]">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Business Information
        </h2>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed font-medium">
          Tell us about your UK-registered entity to begin your application.
        </p>

        <div className="mt-8 space-y-6">
          {/* Business Legal Name */}
          <div>
            <label htmlFor="businessName" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Business Legal Name
            </label>
            <input
              type="text"
              id="businessName"
              placeholder="e.g. Acme Tech Solutions Ltd"
              value={data.businessName}
              onChange={(e) => {
                updateData({ businessName: e.target.value });
                if (errors.businessName) setErrors(prev => ({ ...prev, businessName: "" }));
              }}
              className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                errors.businessName ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
              }`}
            />
            {errors.businessName && (
              <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.businessName}</p>
            )}
          </div>

          {/* CRN */}
          <div>
            <label htmlFor="crn" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Company Registration Number (CRN)
            </label>
            <input
              type="text"
              id="crn"
              placeholder="8-digit UK registration number"
              value={data.crn}
              onChange={(e) => {
                updateData({ crn: e.target.value.toUpperCase() });
                if (errors.crn) setErrors(prev => ({ ...prev, crn: "" }));
              }}
              maxLength={8}
              className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                errors.crn ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
              }`}
            />
            <p className="mt-1.5 text-xs font-medium text-slate-400">
              Must be registered with Companies House.
            </p>
            {errors.crn && (
              <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.crn}</p>
            )}
          </div>

          {/* Business Website */}
          <div>
            <label htmlFor="website" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Business Website / Store URL
            </label>
            <input
              type="text"
              id="website"
              placeholder="https://www.yourbusiness.com"
              value={data.website}
              onChange={(e) => {
                updateData({ website: e.target.value });
                if (errors.website) setErrors(prev => ({ ...prev, website: "" }));
              }}
              className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                errors.website ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
              }`}
            />
            {errors.website && (
              <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.website}</p>
            )}
          </div>

          {/* Industry and Years Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="industry" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Industry Sector
              </label>
              <select
                id="industry"
                value={data.industry}
                onChange={(e) => updateData({ industry: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
              >
                <option value="Software / SaaS">Software / SaaS</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Retail & Wholesale">Retail & Wholesale</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Construction">Construction</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label htmlFor="yearsInBusiness" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Years in Business
              </label>
              <select
                id="yearsInBusiness"
                value={data.yearsInBusiness}
                onChange={(e) => updateData({ yearsInBusiness: e.target.value })}
                className="w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
              >
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-5 years">2-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>

          {/* Registered Office Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Registered Office Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your full registered address"
              value={data.address}
              onChange={(e) => {
                updateData({ address: e.target.value });
                if (errors.address) setErrors(prev => ({ ...prev, address: "" }));
              }}
              className={`w-full px-4 py-3.5 bg-[#F1F5FB] border border-[#E2EAF4]/60 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                errors.address ? "border-destructive focus:ring-destructive/10 focus:border-destructive" : ""
              }`}
            />
            {errors.address && (
              <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-end gap-4 px-2">
        <span className={`text-xs font-semibold text-slate-400 transition-opacity duration-300 ${
          isSaving ? "opacity-100" : "opacity-0"
        }`}>
          Saving automatically...
        </span>
        <button
          type="submit"
          className="bg-primary hover:bg-primary/95 text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-97 cursor-pointer"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
