"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Loader2,
  Calendar,
  CreditCard,
  History,
} from "lucide-react";
import dashboardService, {
  FundingOverviewData,
  FundingHistoryItem,
  FundingHistoryMeta,
} from "@/lib/dashboardService";

export default function FundingPage() {
  const [funding, setFunding] = useState<FundingOverviewData | null>(null);
  const [history, setHistory] = useState<FundingHistoryItem[]>([]);
  const [meta, setMeta] = useState<FundingHistoryMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const limit = 5;

  // 1. Fetch Funding Overview
  useEffect(() => {
    let isMounted = true;

    const fetchFundingOverview = async () => {
      setIsLoading(true);
      try {
        const res = await dashboardService.getFundingOverview();
        if (isMounted && res && res.data) {
          setFunding(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch funding overview:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFundingOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Repayment History
  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const res = await dashboardService.getFundingHistory({
          page,
          limit,
          searchTerm: searchTerm.trim() || undefined,
        });

        if (isMounted && res) {
          if (Array.isArray(res.data)) {
            setHistory(res.data);
          }
          if (res.meta) {
            setMeta(res.meta);
          }
        }
      } catch (err) {
        console.warn("Could not fetch repayment history:", err);
      } finally {
        if (isMounted) {
          setIsLoadingHistory(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [page, searchTerm]);

  const formatCurrency = (
    val: number | string | undefined | null,
    fallback: number = 0
  ): string => {
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
      minimumFractionDigits: num % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (dateStr?: string | null, fallback: string = "Pending") => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Filtered rows for client-side search matching (if backend search isn't populated yet)
  const filteredHistory = useMemo(() => {
    if (!searchTerm) return history;
    const lower = searchTerm.toLowerCase();
    return history.filter((item) => {
      const dateText = formatDate(item.date || item.createdAt).toLowerCase();
      const statusText = (item.status || "").toLowerCase();
      const salesText = String(item.saleAmount ?? item.sales ?? "");
      const repaymentText = String(item.repayment ?? "");
      return (
        dateText.includes(lower) ||
        statusText.includes(lower) ||
        salesText.includes(lower) ||
        repaymentText.includes(lower)
      );
    });
  }, [history, searchTerm]);

  // Derived values from funding API
  const percentCleared = funding?.percentCleared ?? 0;
  const amountPaid = funding?.amountPaid ?? 0;
  const amountTotal = funding?.amountTotal ?? 0;
  const remainingBalance = funding?.remainingBalance ?? 0;
  const repaymentRate = funding?.repaymentRate ?? 0;
  const repaymentThisWeek = funding?.repaymentThisWeek ?? 0;
  const weeklyAvg = funding?.weeklyAvg ?? 0;
  const totalSalesLinked = funding?.totalSalesLinked ?? 0;
  const facilityId = funding?.facilityId || "#0B-36EE44-LF";
  const loanAmount = funding?.loanAmount ?? 0;
  const disbursedDate = formatDate(funding?.disbursedDate, "Pending");
  const destinationBank = funding?.destinationBank || "Barclays Bank account";
  const hasActiveLoan = funding?.hasActiveLoan ?? false;

  // Last repayment display helper
  const renderLastRepayment = () => {
    if (!funding?.lastRepayment) {
      return {
        amount: "£0.00",
        subtitle: "No repayments recorded yet",
      };
    }
    if (typeof funding.lastRepayment === "object") {
      return {
        amount: formatCurrency(
          funding.lastRepayment.amount || funding.lastRepayment.repayment
        ),
        subtitle: formatDate(
          funding.lastRepayment.date || funding.lastRepayment.createdAt,
          "Recently"
        ),
      };
    }
    return {
      amount: formatCurrency(funding.lastRepayment),
      subtitle: "Recent transaction",
    };
  };

  const lastRepaymentInfo = renderLastRepayment();

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Funding Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Review your revenue-based financing performance and repayment status.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Loading funding metrics...</span>
          </div>
        )}
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-[11px] font-bold text-gray-900 tracking-wider uppercase">
                Repayment Progress
              </h3>
              {hasActiveLoan ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active / Repaying
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Pending Activation
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-[#2563EB]">
              {percentCleared}%
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {formatCurrency(amountPaid)}{" "}
              <span className="text-lg font-medium text-gray-500">
                paid of {formatCurrency(amountTotal)}
              </span>
            </h2>
          </div>

          <div className="mb-3">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-[#2563EB] transition-all duration-700"
                style={{
                  width: `${Math.min(100, Math.max(0, percentCleared))}%`,
                }}
              />
            </div>
          </div>

          <p className="text-xs font-medium text-gray-400 mb-10">
            Initiated {formatDate(funding?.initiatedDate, "Recently")}
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-auto">
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">
                Weekly Avg.
              </p>
              <p className="text-[15px] font-bold text-gray-900">
                {formatCurrency(weeklyAvg)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">
                Total Sales Linked
              </p>
              <p className="text-[15px] font-bold text-gray-900">
                {formatCurrency(totalSalesLinked)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">
                Facility ID
              </p>
              <p className="text-[15px] font-bold text-gray-900 font-mono">
                {facilityId}
              </p>
            </div>
          </div>
        </div>

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-3">
              Remaining Balance
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              {formatCurrency(remainingBalance)}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit">
              <TrendingDown className="w-4 h-4" />
              -{formatCurrency(repaymentThisWeek)} this week
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-3">
              Repayment Rate
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {repaymentRate.toFixed(2)}%
            </p>
            <p className="text-sm font-medium text-gray-500">
              Fixed percentage of gross daily sales revenue.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">
            Loan Amount
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {formatCurrency(loanAmount)}
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Total principal drawn
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">
            Disbursed Date
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {disbursedDate}
          </p>
          <p className="text-sm text-gray-500 font-medium truncate">
            To {destinationBank}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">
            Last Repayment
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {lastRepaymentInfo.amount}
          </p>
          <p className="text-sm text-gray-500 font-medium">
            {lastRepaymentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Repayment History Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              Repayment History
            </h2>
            {isLoadingHistory && (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors cursor-pointer">
            Last 30 Days
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search by date, amount, or status..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-700">
                  Date
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">
                  Sale Amount
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">
                  Repayment (£)
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-gray-400"
                  >
                    {isLoadingHistory
                      ? "Loading repayment history..."
                      : "No repayment records found for this facility."}
                  </td>
                </tr>
              ) : (
                filteredHistory.map((row, idx) => {
                  const dateText = formatDate(row.date || row.createdAt);
                  const saleVal = row.saleAmount ?? row.grossSales ?? row.sales;
                  const status = row.status || "Processed";
                  const isProcessed =
                    status.toLowerCase() === "processed" ||
                    status.toLowerCase() === "completed";

                  return (
                    <tr
                      key={row.id || row._id || idx}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {dateText}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-700 font-mono">
                        {formatCurrency(saleVal)}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-700 font-mono">
                        {formatCurrency(row.repayment)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isProcessed
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-500">
            {meta?.total !== undefined && meta.total > 0
              ? `Showing ${(page - 1) * limit + 1} to ${Math.min(
                  page * limit,
                  meta.total
                )} of ${meta.total} repayments`
              : `Showing ${filteredHistory.length} repayments`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-gray-600 px-2">
              Page {page} {meta?.totalPage ? `of ${meta.totalPage}` : ""}
            </span>
            <button
              onClick={() =>
                setPage((p) =>
                  meta?.totalPage ? Math.min(meta.totalPage, p + 1) : p + 1
                )
              }
              disabled={meta?.totalPage !== undefined && page >= meta.totalPage}
              className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
