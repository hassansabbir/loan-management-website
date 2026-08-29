"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  Landmark,
  Banknote,
  Clock,
  Search,
  Calendar,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Clock3,
  Loader2,
} from "lucide-react";
import dashboardService, {
  TransactionCardsData,
  ClientTransactionItem,
  ClientTransactionMeta,
} from "@/lib/dashboardService";

export default function TransactionsPage() {
  const [cards, setCards] = useState<TransactionCardsData | null>(null);
  const [transactions, setTransactions] = useState<ClientTransactionItem[]>([]);
  const [meta, setMeta] = useState<ClientTransactionMeta | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState<boolean>(true);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<ClientTransactionItem | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 15;

  // 1. Fetch Transaction Cards on Mount
  useEffect(() => {
    let isMounted = true;
    const fetchCards = async () => {
      setIsLoadingCards(true);
      try {
        const res = await dashboardService.getTransactionCards();
        if (isMounted && res && res.data) {
          setCards(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch transaction cards:", err);
      } finally {
        if (isMounted) {
          setIsLoadingCards(false);
        }
      }
    };

    fetchCards();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Transactions List on Page/Status/Search Change
  useEffect(() => {
    let isMounted = true;
    const fetchList = async () => {
      setIsLoadingList(true);
      try {
        const res = await dashboardService.getClientTransactions({
          page,
          limit,
          status: statusFilter,
          searchTerm: searchQuery.trim() || undefined,
        });

        if (isMounted && res) {
          if (Array.isArray(res.data)) {
            setTransactions(res.data);
          }
          if (res.meta) {
            setMeta(res.meta);
          }
        }
      } catch (err) {
        console.warn("Could not fetch client transactions:", err);
      } finally {
        if (isMounted) {
          setIsLoadingList(false);
        }
      }
    };

    fetchList();
    return () => {
      isMounted = false;
    };
  }, [page, statusFilter, searchQuery]);

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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return { date: "—", time: "" };
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { date: dateStr, time: "" };
      return {
        date: d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
      };
    } catch {
      return { date: dateStr, time: "" };
    }
  };

  // Client-side fallback search filter
  const displayedTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    const lower = searchQuery.toLowerCase();
    return transactions.filter((tx) => {
      const idStr = (tx.transactionId || tx.id || tx._id || "").toLowerCase();
      const statusStr = (tx.status || "").toLowerCase();
      const { date, time } = formatDate(tx.createdAt || tx.date);
      return (
        idStr.includes(lower) ||
        statusStr.includes(lower) ||
        date.toLowerCase().includes(lower) ||
        time.toLowerCase().includes(lower)
      );
    });
  }, [transactions, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Transactions & Sales
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Review your automated repayment history and daily sales performance.
          </p>
        </div>

        {isLoadingCards && (
          <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Loading metrics...</span>
          </div>
        )}
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">
              Total Processed Sales
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              {formatCurrency(cards?.totalProcessedSales)}
            </h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-slate-100/80 flex items-center justify-center mb-4">
            <Landmark className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">
              Total Repaid to Date
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              {formatCurrency(cards?.totalRepaidToDate)}
            </h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
            <Banknote className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">
              Daily Repayment Avg
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              {formatCurrency(cards?.dailyRepaymentAvg)}
            </h2>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-slate-100/80 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-500">
              Pending Settlements
            </p>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-1">
              {formatCurrency(cards?.pendingSettlements)}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Transactions History Box */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header bar with title and action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0F172A]">
              Transactions History
            </h2>
            {isLoadingList && (
              <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Date filter dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsDateDropdownOpen(!isDateDropdownOpen);
                  setIsStatusDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{dateFilter}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
              </button>

              {isDateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20">
                  {["Last 7 Days", "Last 30 Days", "Last 90 Days", "All Time"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setDateFilter(option);
                          setIsDateDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                          dateFilter === option
                            ? "bg-blue-50 text-[#2563EB]"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Status filter dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsStatusDropdownOpen(!isStatusDropdownOpen);
                  setIsDateDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Status: {statusFilter}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20">
                  {(["All", "Completed", "Pending"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setPage(1);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        statusFilter === status
                          ? "bg-blue-50 text-[#2563EB]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      Status: {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar inside container */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full bg-[#F1F5F9]/80 border border-transparent focus:border-blue-500 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TRANSACTION ID
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DATE & TIME
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right sm:text-left">
                  GROSS SALES
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  REPAYMENT
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  NET PAYOUT
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedTransactions.map((tx, idx) => {
                const txId = tx.transactionId || tx.id || tx._id || `#TXN-${idx + 1}`;
                const { date, time } = formatDate(tx.createdAt || tx.date);
                const isCompleted = tx.status?.toLowerCase() === "completed";
                const isPending = tx.status?.toLowerCase() === "pending";

                return (
                  <tr
                    key={txId || idx}
                    onClick={() => setSelectedTxn(tx)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    {/* Transaction ID */}
                    <td className="py-4 px-6 text-sm font-semibold text-[#2563EB] font-mono">
                      {txId}
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-[#0F172A]">
                        {date}
                      </p>
                      <p className="text-xs text-slate-400 font-normal mt-0.5">
                        {time}
                      </p>
                    </td>

                    {/* Gross Sales */}
                    <td className="py-4 px-6 text-sm font-bold text-[#0F172A] text-right sm:text-left">
                      {formatCurrency(tx.grossSales)}
                    </td>

                    {/* Repayment */}
                    <td className="py-4 px-6 text-sm font-semibold text-[#EF4444] text-right">
                      -{formatCurrency(tx.repayment)}
                    </td>

                    {/* Net Payout */}
                    <td className="py-4 px-6 text-sm font-bold text-[#0F172A] text-right">
                      {formatCurrency(tx.netPayout)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-right">
                      {isCompleted ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-emerald-200/50">
                          Completed
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B] border border-amber-200/50">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          {tx.status || "Completed"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {displayedTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400 text-sm font-medium"
                  >
                    {isLoadingList
                      ? "Loading transactions..."
                      : "No transactions match your search or filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-500">
            {meta?.total !== undefined && meta.total > 0
              ? `Showing ${(page - 1) * limit + 1} to ${Math.min(
                  page * limit,
                  meta.total
                )} of ${meta.total} repayments`
              : `Showing ${displayedTransactions.length} repayments`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Transaction Details
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] font-mono">
                  {selectedTxn.transactionId ||
                    selectedTxn.id ||
                    selectedTxn._id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-500">
                  Status
                </span>
                {selectedTxn.status?.toLowerCase() === "completed" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B]">
                    <Clock3 className="w-3.5 h-3.5" />
                    {selectedTxn.status || "Pending"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">
                    Date & Time
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {formatDate(selectedTxn.createdAt || selectedTxn.date).date}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDate(selectedTxn.createdAt || selectedTxn.date).time}
                  </p>
                </div>
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Channel</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedTxn.category || "Sales Revenue"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {selectedTxn.reference || "Automated Split"}
                  </p>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-4 space-y-2.5 bg-slate-50/50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Sales</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(selectedTxn.grossSales)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Automated Repayment</span>
                  <span className="font-semibold text-red-500">
                    -{formatCurrency(selectedTxn.repayment)}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-slate-200 flex justify-between text-base font-bold">
                  <span className="text-slate-900">Net Payout</span>
                  <span className="text-[#2563EB]">
                    {formatCurrency(selectedTxn.netPayout)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTxn(null)}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
