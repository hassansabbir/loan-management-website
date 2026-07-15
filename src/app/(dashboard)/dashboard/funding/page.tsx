"use client";

import React from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, TrendingDown } from "lucide-react";

const repaymentHistory = [
  { date: "24 May 2024", sales: "£14,035.00", repayment: "£842.10", status: "Processed" },
  { date: "23 May 2024", sales: "£11,200.00", repayment: "£672.00", status: "Processed" },
  { date: "22 May 2024", sales: "£16,500.00", repayment: "£990.00", status: "Processed" },
  { date: "21 May 2024", sales: "£9,850.00", repayment: "£591.00", status: "Processed" },
  { date: "20 May 2024", sales: "£12,300.00", repayment: "£738.00", status: "Processed" },
  { date: "19 May 2024", sales: "£4,800.00", repayment: "£288.00", status: "Processed" },
];

export default function FundingPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Funding Overview
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Review your revenue-based financing performance and repayment status.
        </p>
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Active / Repaying
              </span>
            </div>
            <span className="text-sm font-bold text-[#2563EB]">57%</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              £142,500 <span className="text-lg font-medium text-gray-500">paid of £250,000</span>
            </h2>
          </div>

          <div className="mb-3">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-[#2563EB]"
                style={{ width: "57%" }}
              />
            </div>
          </div>
          
          <p className="text-xs font-medium text-gray-400 mb-10">
            Initiated Oct 12, 2023
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-auto">
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">Weekly Avg.</p>
              <p className="text-[15px] font-bold text-gray-900">£4,280.40</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">Total Sales Linked</p>
              <p className="text-[15px] font-bold text-gray-900">£2,375,000</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-1">Facility ID</p>
              <p className="text-[15px] font-bold text-gray-900">#GB-88219-LF</p>
            </div>
          </div>
        </div>

        {/* Right Stacked Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-3">
              Remaining Balance
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">£107,500.00</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit">
              <TrendingDown className="w-4 h-4" />
              -£4,120 this week
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-900 tracking-wider uppercase mb-3">
              Repayment Rate
            </h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">6.00%</p>
            <p className="text-sm font-medium text-gray-500">
              Fixed percentage of gross daily sales revenue.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">Loan Amount</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">£250,000</p>
          <p className="text-sm text-gray-500 font-medium">Total principal drawn</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">Disbursed Date</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">12 Oct 2023</p>
          <p className="text-sm text-gray-500 font-medium">To Barclays account<br/>****4412</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-[#2563EB] mb-2">Last Repayment</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">£842.10</p>
          <p className="text-sm text-gray-500 font-medium">Yesterday, 17:04 GMT</p>
        </div>
      </div>

      {/* Repayment History Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 gap-4">
          <h2 className="text-xl font-bold text-gray-900">Repayment History</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition-colors">
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
              placeholder="Search..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-700">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">Sale Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">Repayment (£)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {repaymentHistory.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {row.date}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700 font-mono">
                    {row.sales}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700 font-mono">
                    {row.repayment}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-500">
            Showing 6 of 124 repayments
          </span>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
