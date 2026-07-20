"use client";

import React, { useState } from "react";
import {
  Calendar,
  BadgeCheck,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Download,
} from "lucide-react";

interface Payout {
  id: string;
  amount: string;
  amountValue: number;
  date: string;
  status: "Succeeded" | "Processing" | "Failed";
  destinationBank: string;
  accountNumber: string;
  reference: string;
}

const mockPayouts: Payout[] = [
  {
    id: "PY-99281-XC",
    amount: "£24,500.00",
    amountValue: 24500.0,
    date: "July 18, 2024",
    status: "Succeeded",
    destinationBank: "Barclays",
    accountNumber: "•••• 4409",
    reference: "SETTLE-20240718-01",
  },
  {
    id: "PY-99150-LQ",
    amount: "£18,200.50",
    amountValue: 18200.5,
    date: "July 16, 2024",
    status: "Succeeded",
    destinationBank: "Barclays",
    accountNumber: "•••• 4409",
    reference: "SETTLE-20240716-04",
  },
  {
    id: "PY-98992-MM",
    amount: "£31,000.00",
    amountValue: 31000.0,
    date: "July 14, 2024",
    status: "Processing",
    destinationBank: "Barclays",
    accountNumber: "•••• 4409",
    reference: "SETTLE-20240714-08",
  },
  {
    id: "PY-98774-BB",
    amount: "£12,450.00",
    amountValue: 12450.0,
    date: "July 12, 2024",
    status: "Succeeded",
    destinationBank: "Barclays",
    accountNumber: "•••• 4409",
    reference: "SETTLE-20240712-02",
  },
  {
    id: "PY-98661-ZZ",
    amount: "£9,800.00",
    amountValue: 9800.0,
    date: "July 10, 2024",
    status: "Failed",
    destinationBank: "Lloyds Bank",
    accountNumber: "•••• 2111",
    reference: "SETTLE-20240710-09",
  },
];

export default function PayoutsPage() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          Payouts
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Manage your revenue disbursements and view payout schedule.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: NEXT SCHEDULED PAYOUT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                NEXT SCHEDULED PAYOUT
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-1">
              July 24, 2024
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Automatic transfer to Barclays Business •••• 4409
            </p>
          </div>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-full text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Pending: £42,102.50 processing
            </span>
          </div>
        </div>

        {/* Card 2: TOTAL PAID OUT */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                TOTAL PAID OUT
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-1">
              £1,240,000.00
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Total across 48 successful transfers
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full"
                style={{ width: "75%" }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              75% of limit
            </span>
          </div>
        </div>

        {/* Card 3: AVAILABLE BALANCE */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle top right background accent */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-linear-to-bl from-blue-50/70 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded bg-[#2563EB] flex items-center justify-center">
                <CreditCard className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                AVAILABLE BALANCE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-2">
              £142,500.00
            </h2>
          </div>
        </div>
      </div>

      {/* Info Notice Banner */}
      <div className="bg-[#EEF2FF]/80 border border-blue-100/80 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-8 h-8 rounded-xl bg-blue-100/70 flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-[#2563EB] text-sm md:text-base mb-1">
            How your payouts are calculated
          </h3>
          <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed">
            Your payouts consist of your daily gross revenue minus the agreed % loan deduction. Transfers are batched every 24 hours and settled to your primary bank account within 1-3 business days.
          </p>
        </div>
      </div>

      {/* Payout History Section */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#0F172A]">
            Payout History
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  TRANSACTION ID
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  PAYOUT AMOUNT
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DATE
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  DESTINATION BANK
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  onClick={() => setSelectedPayout(payout)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  {/* Transaction ID */}
                  <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                    {payout.id}
                  </td>

                  {/* Payout Amount */}
                  <td className="py-4 px-6 text-sm font-bold text-[#0F172A]">
                    {payout.amount}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-sm font-medium text-slate-500">
                    {payout.date}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    {payout.status === "Succeeded" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        Succeeded
                      </span>
                    )}

                    {payout.status === "Processing" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                        Processing
                      </span>
                    )}

                    {payout.status === "Failed" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#EF4444]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                        Failed
                      </span>
                    )}
                  </td>

                  {/* Destination Bank */}
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">
                    {payout.destinationBank} {payout.accountNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-400">
            Showing 1-5 of 48 payouts
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

      {/* Payout Details Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Disbursement Details
                </span>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  {selectedPayout.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPayout(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl">
                <span className="text-xs font-medium text-slate-500">Status</span>
                {selectedPayout.status === "Succeeded" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Succeeded
                  </span>
                )}
                {selectedPayout.status === "Processing" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">
                    <Clock3 className="w-3.5 h-3.5" />
                    Processing
                  </span>
                )}
                {selectedPayout.status === "Failed" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#EF4444]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Failed
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Date</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedPayout.date}
                  </p>
                </div>
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Destination</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedPayout.destinationBank}
                  </p>
                  <p className="text-xs text-slate-400">{selectedPayout.accountNumber}</p>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Settlement Batch Ref</span>
                  <span className="font-mono text-slate-700">{selectedPayout.reference}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold">
                  <span className="text-slate-900">Total Payout</span>
                  <span className="text-[#2563EB]">{selectedPayout.amount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPayout(null)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Downloading receipt for ${selectedPayout.id}...`)}
                className="flex-1 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
