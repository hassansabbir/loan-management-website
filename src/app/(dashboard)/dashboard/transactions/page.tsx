"use client";

import React, { useState, useMemo } from "react";
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
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  time: string;
  grossSales: string;
  grossValue: number;
  repayment: string;
  repaymentValue: number;
  netPayout: string;
  netValue: number;
  status: "Completed" | "Pending";
  category: string;
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-9842-AB",
    date: "Oct 24, 2024",
    time: "14:22:10 GMT",
    grossSales: "£4,250.00",
    grossValue: 4250.0,
    repayment: "-£425.00",
    repaymentValue: 425.0,
    netPayout: "£3,825.00",
    netValue: 3825.0,
    status: "Completed",
    category: "Card Terminal Sales",
    reference: "REF-88491-01",
  },
  {
    id: "TXN-9841-LM",
    date: "Oct 24, 2024",
    time: "11:05:45 GMT",
    grossSales: "£12,040.00",
    grossValue: 12040.0,
    repayment: "-£1,204.00",
    repaymentValue: 1204.0,
    netPayout: "£10,836.00",
    netValue: 10836.0,
    status: "Pending",
    category: "E-Commerce Checkout",
    reference: "REF-88490-02",
  },
  {
    id: "TXN-9839-XP",
    date: "Oct 23, 2024",
    time: "16:45:00 GMT",
    grossSales: "£890.50",
    grossValue: 890.5,
    repayment: "-£89.05",
    repaymentValue: 89.05,
    netPayout: "£801.45",
    netValue: 801.45,
    status: "Completed",
    category: "POS Terminal",
    reference: "REF-88488-05",
  },
  {
    id: "TXN-9835-KK",
    date: "Oct 23, 2024",
    time: "09:12:33 GMT",
    grossSales: "£2,450.00",
    grossValue: 2450.0,
    repayment: "-£245.00",
    repaymentValue: 245.0,
    netPayout: "£2,205.00",
    netValue: 2205.0,
    status: "Completed",
    category: "Direct Payment",
    reference: "REF-88484-12",
  },
  {
    id: "TXN-9832-WW",
    date: "Oct 22, 2024",
    time: "18:01:10 GMT",
    grossSales: "£675.25",
    grossValue: 675.25,
    repayment: "-£67.53",
    repaymentValue: 67.53,
    netPayout: "£607.72",
    netValue: 607.72,
    status: "Completed",
    category: "Card Terminal Sales",
    reference: "REF-88481-09",
  },
  {
    id: "TXN-9830-ZZ",
    date: "Oct 22, 2024",
    time: "13:44:21 GMT",
    grossSales: "£15,000.00",
    grossValue: 15000.0,
    repayment: "-£1,500.00",
    repaymentValue: 1500.0,
    netPayout: "£13,500.00",
    netValue: 13500.0,
    status: "Completed",
    category: "BACS Transfer",
    reference: "REF-88479-14",
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const matchesSearch =
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.grossSales.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || tx.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          Transactions & Sales
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Review your automated repayment history and daily sales performance.
        </p>
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
              £1,248,500.00
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
              £482,300.12
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
              £1,420.50
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
              £12,402.10
            </h2>
          </div>
        </div>
      </div>

      {/* Main Transactions History Box */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header bar with title and action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Transactions History
          </h2>

          <div className="flex items-center gap-3">
            {/* Date filter dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsDateDropdownOpen(!isDateDropdownOpen);
                  setIsStatusDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
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
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
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
                className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
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
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTxn(tx)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  {/* Transaction ID */}
                  <td className="py-4 px-6 text-sm font-semibold text-[#2563EB]">
                    {tx.id}
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-6">
                    <p className="text-sm font-bold text-[#0F172A]">
                      {tx.date}
                    </p>
                    <p className="text-xs text-slate-400 font-normal mt-0.5">
                      {tx.time}
                    </p>
                  </td>

                  {/* Gross Sales */}
                  <td className="py-4 px-6 text-sm font-bold text-[#0F172A] text-right sm:text-left">
                    {tx.grossSales}
                  </td>

                  {/* Repayment */}
                  <td className="py-4 px-6 text-sm font-semibold text-[#EF4444] text-right">
                    {tx.repayment}
                  </td>

                  {/* Net Payout */}
                  <td className="py-4 px-6 text-sm font-bold text-[#0F172A] text-right">
                    {tx.netPayout}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-right">
                    {tx.status === "Completed" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-emerald-200/50">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B] border border-amber-200/50">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-400 text-sm font-medium"
                  >
                    No transactions match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-500">
            Showing {filteredTransactions.length} of 124 repayments
          </span>

          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
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
                <h3 className="text-xl font-bold text-[#0F172A]">
                  {selectedTxn.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-500">Status</span>
                {selectedTxn.status === "Completed" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#F59E0B]">
                    <Clock3 className="w-3.5 h-3.5" />
                    Pending
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Date & Time</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedTxn.date}
                  </p>
                  <p className="text-xs text-slate-400">{selectedTxn.time}</p>
                </div>
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Channel</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedTxn.category}
                  </p>
                  <p className="text-xs text-slate-400">{selectedTxn.reference}</p>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-4 space-y-2.5 bg-slate-50/50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Sales</span>
                  <span className="font-bold text-slate-900">
                    {selectedTxn.grossSales}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Automated Repayment (10%)</span>
                  <span className="font-semibold text-red-500">
                    {selectedTxn.repayment}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-slate-200 flex justify-between text-base font-bold">
                  <span className="text-slate-900">Net Payout</span>
                  <span className="text-[#2563EB]">
                    {selectedTxn.netPayout}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTxn(null)}
                className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
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
