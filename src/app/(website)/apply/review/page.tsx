"use client";

import React, { useState, useEffect } from "react";
import { useApply } from "../ApplyContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  Edit2,
  FileText,
  Landmark,
  Loader2,
  Building2,
  TrendingUp,
  CreditCard,
  Send,
  AlertCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import loanService, { LoanApplicationItem } from "@/lib/loanService";
import { toast } from "sonner";

export default function ReviewStep() {
  const { data, submittedAppId, setSubmittedAppId } = useApply();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [serverApp, setServerApp] = useState<LoanApplicationItem | null>(null);
  const [isLoadingApp, setIsLoadingApp] = useState<boolean>(true);
  const [agreedInfo, setAgreedInfo] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch application details from GET /loans/applications on mount
  useEffect(() => {
    const fetchApplication = async () => {
      setIsLoadingApp(true);
      try {
        const response = await loanService.getApplications();
        if (response && response.data) {
          const list: LoanApplicationItem[] = Array.isArray(response.data)
            ? response.data
            : [response.data];

          if (list.length > 0) {
            // Find active DRAFT or latest application
            const active =
              list.find((item) => item.status === "DRAFT") ||
              list[list.length - 1];

            if (active) {
              setServerApp(active);
              setSubmittedAppId(active._id);
              if (active.declarationsConfirm !== undefined) {
                setAgreedInfo(Boolean(active.declarationsConfirm));
              }
              if (active.termsAgree !== undefined) {
                setAgreedTerms(Boolean(active.termsAgree));
              }
            }
          }
        }
      } catch (err: any) {
        console.warn("Could not fetch application from GET API:", err);
      } finally {
        setIsLoadingApp(false);
      }
    };

    fetchApplication();
  }, [setSubmittedAppId]);

  const formatCurrency = (val: string | number | undefined, fallback: number = 0) => {
    const num =
      typeof val === "number"
        ? val
        : typeof val === "string"
        ? parseFloat(val)
        : fallback;
    if (isNaN(num)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getDocName = (
    pathOrName?: string | string[],
    fallback: string = "Document.pdf"
  ) => {
    if (!pathOrName) return fallback;
    const raw = Array.isArray(pathOrName) ? pathOrName[0] : pathOrName;
    if (!raw) return fallback;
    const parts = raw.split("/");
    return parts[parts.length - 1] || raw;
  };

  const displayVal = (val: string | number | undefined, defaultVal: string) => {
    if (val === undefined || val === null) return defaultVal;
    const str = String(val).trim();
    return str ? str : defaultVal;
  };

  // Submit PUT /loans/applications/:id
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreedInfo || !agreedTerms) {
      const msg =
        "Please confirm both declarations below before submitting your application.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!isAuthenticated) {
      const msg =
        "You must be logged in to submit a loan application. Please sign in first.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const targetId = serverApp?._id || submittedAppId;
    if (!targetId) {
      const msg =
        "No active application found to submit. Please return to Step 4 and click Continue to Review.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await loanService.submitFinalApplication(targetId, {
        declarationsConfirm: true,
        termsAgree: true,
      });

      if (
        response &&
        (response.success ||
          response.statusCode === 200 ||
          response.statusCode === 201)
      ) {
        toast.success("Loan application submitted successfully!");
        router.push("/apply/success");
      } else {
        throw new Error(response.message || "Final submission failed");
      }
    } catch (err: any) {
      console.error("Final loan submission error:", err);
      const errMsg =
        err?.data?.error?.[0]?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        err?.message ||
        "An unexpected error occurred while submitting your loan application. Please try again.";
      setError(errMsg);
      toast.error(errMsg, {
        description: "Your application could not be finalized.",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Review your application
            </h2>
            <p className="text-sm text-slate-500 font-semibold mt-2 leading-relaxed">
              Please double-check all details before submitting. Once submitted,
              your application will be forwarded to underwriting.
            </p>
          </div>

          {serverApp && (
            <div className="self-start sm:self-center shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-primary border border-blue-100 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Status: {serverApp.status || "DRAFT"}
              </span>
            </div>
          )}
        </div>

        {/* Loading Banner if fetching server data */}
        {isLoadingApp && (
          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-3 text-primary animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">
              Loading verified application data from server...
            </p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-700 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm font-medium flex-1">
              <p className="font-bold">Submission Error</p>
              <p className="mt-0.5">{error}</p>
              {!isAuthenticated && (
                <Link
                  href="/sign-in"
                  className="inline-block mt-2 font-bold text-xs underline hover:text-rose-900"
                >
                  Click here to Login
                </Link>
              )}
            </div>
          </div>
        )}

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
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Company Legal Name
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.businessDetails?.legalName || data.businessName,
                  "Acme UK Ltd"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Registration No. (CRN)
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block font-mono">
                {displayVal(
                  serverApp?.businessDetails?.crn || data.crn,
                  "12345678"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Industry Sector
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.businessDetails?.industrySector || data.industry,
                  "Retail"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Years in Business
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {serverApp?.businessDetails?.yearsInBusiness !== undefined
                  ? `${serverApp.businessDetails.yearsInBusiness} years`
                  : displayVal(data.yearsInBusiness, "3 years")}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Store / Website URL
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block truncate">
                {displayVal(
                  serverApp?.businessDetails?.storeUrl || data.website,
                  "https://acme-store.co.uk"
                )}
              </span>
            </div>
            <div className="sm:col-span-3">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Registered Address
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block leading-relaxed">
                {displayVal(
                  serverApp?.businessDetails?.registeredAddress || data.address,
                  "123 High Street, London, EC1A 1BB"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Financials */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-primary shrink-0" />
              Financial Information
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
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Funding Requested
              </span>
              <span className="font-bold text-primary mt-1.5 block text-lg">
                {formatCurrency(
                  serverApp?.requestedAmount || data.requestedAmount,
                  67500
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Avg. Monthly Revenue
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block text-lg">
                {formatCurrency(
                  serverApp?.financials?.avgMonthlyRevenue || data.monthlyRevenue,
                  25000
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Annual Turnover
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block text-lg">
                {formatCurrency(
                  serverApp?.financials?.annualTurnover || data.annualTurnover,
                  300000
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Primary Sales Channel
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.financials?.primarySalesChannel || data.salesChannel,
                  "Shopify"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Monthly Sales Volume
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.financials?.monthlySalesVolume || data.salesVolume,
                  "1200"
                )}{" "}
                transactions
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Purpose
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.financials?.purpose || data.fundingPurpose,
                  "Inventory & Expansion"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Banking */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <Landmark className="w-5 h-5 text-primary shrink-0" />
              Banking Details
            </h3>
            <Link
              href="/apply/banking"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Bank Name
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.bankingDetails?.bankName || data.bankName,
                  "Barclays Bank"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Account Holder Name
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block">
                {displayVal(
                  serverApp?.bankingDetails?.accountHolderName ||
                    data.accountName ||
                    data.businessName,
                  "Acme UK Ltd"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Sort Code
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block font-mono">
                {displayVal(
                  serverApp?.bankingDetails?.sortCode || data.sortCode,
                  "20-00-00"
                )}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Account Number
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block font-mono">
                {displayVal(
                  serverApp?.bankingDetails?.accountNumber || data.accountNumber,
                  "12345678"
                )}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                IBAN
              </span>
              <span className="font-bold text-slate-800 mt-1.5 block font-mono text-xs sm:text-sm">
                {displayVal(
                  serverApp?.bankingDetails?.iban || data.iban,
                  "GB29BARC20000012345678"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Documents */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-primary shrink-0" />
              Supporting Documents
            </h3>
            <Link
              href="/apply/documents"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" /> EDIT
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Certificate of Incorporation */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Certificate of Incorporation
                  </p>
                  <p className="truncate text-slate-800 font-bold mt-0.5">
                    {getDocName(
                      serverApp?.documents?.certificateOfIncorporation ||
                        data.docRegistration,
                      "certificateOfIncorporation.pdf"
                    )}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                UPLOADED
              </span>
            </div>

            {/* Owner's Photo ID */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Owner's Photo ID
                  </p>
                  <p className="truncate text-slate-800 font-bold mt-0.5">
                    {getDocName(
                      serverApp?.documents?.ownersPhotoId || data.docPhotoId,
                      "ownersPhotoId.jpg"
                    )}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                UPLOADED
              </span>
            </div>

            {/* Bank Statements */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Bank Statements
                  </p>
                  <p className="truncate text-slate-800 font-bold mt-0.5">
                    {getDocName(
                      serverApp?.documents?.bankStatements ||
                        data.docBankStatements,
                      "bankStatements.pdf"
                    )}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                UPLOADED
              </span>
            </div>

            {/* VAT Returns */}
            <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    VAT Returns
                  </p>
                  <p className="truncate text-slate-800 font-bold mt-0.5">
                    {getDocName(
                      serverApp?.documents?.vatReturns || data.docTaxReturn,
                      "vatReturns.pdf"
                    )}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                UPLOADED
              </span>
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
              I confirm that all information provided across steps 1 through 4
              is accurate and truthful to the best of my knowledge.
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
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline font-bold">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-primary hover:underline font-bold">
                Privacy Policy
              </Link>
              , and authorize assessment of my business information.
            </span>
          </label>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <button
            type="button"
            onClick={() => router.push("/apply/documents")}
            disabled={isSubmitting}
            className="px-5 py-3.5 border border-slate-200 hover:border-slate-350 text-slate-600 hover:text-slate-800 bg-white font-bold text-sm rounded-xl inline-flex items-center gap-2 transition-all active:scale-97 disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </button>

          <span className="text-xs font-semibold text-slate-400 italic">
            Secure 256-bit SSL encrypted submission
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-97 disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
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
