"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  BadgeCheck,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Download,
  Loader2,
} from "lucide-react";
import dashboardService, {
  PayoutCardsData,
  ClientPayoutItem,
  ClientPayoutMeta,
} from "@/lib/dashboardService";

export default function PayoutsPage() {
  const [cards, setCards] = useState<PayoutCardsData | null>(null);
  const [payouts, setPayouts] = useState<ClientPayoutItem[]>([]);
  const [meta, setMeta] = useState<ClientPayoutMeta | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState<boolean>(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedPayout, setSelectedPayout] = useState<ClientPayoutItem | null>(null);
  const limit = 10;

  // 1. Fetch Payout Cards on Mount
  useEffect(() => {
    let isMounted = true;
    const fetchCards = async () => {
      setIsLoadingCards(true);
      try {
        const res = await dashboardService.getPayoutCards();
        if (isMounted && res && res.data) {
          setCards(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch payout cards:", err);
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

  // 2. Fetch Payout History on Page Change
  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const res = await dashboardService.getPayoutHistory({
          page,
          limit,
        });

        if (isMounted && res) {
          if (Array.isArray(res.data)) {
            setPayouts(res.data);
          }
          if (res.meta) {
            setMeta(res.meta);
          }
        }
      } catch (err) {
        console.warn("Could not fetch payout history:", err);
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
  }, [page]);

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

  const formatDate = (dateStr?: string, fallback: string = "Pending") => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const nextPayoutDate = cards?.nextScheduledPayout
    ? formatDate(cards.nextScheduledPayout)
    : "No scheduled payout";

  const bankName = cards?.bankName || "Barclays Bank";
  const bankLast4 = cards?.bankLast4 || "5678";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Payouts
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Manage your revenue disbursements and view payout schedule.
          </p>
        </div>

        {isLoadingCards && (
          <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Loading payout details...</span>
          </div>
        )}
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
              {nextPayoutDate}
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Automatic transfer to {bankName} •••• {bankLast4}
            </p>
          </div>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-full text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Pending: {formatCurrency(cards?.pendingAmount)} processing
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
              {formatCurrency(cards?.totalPaidOut)}
            </h2>
            <p className="text-xs text-slate-400 font-normal">
              Total across successful transfers
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full"
                style={{
                  width: `${
                    cards?.totalPaidOut && cards.totalPaidOut > 0 ? "100%" : "0%"
                  }`,
                }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Settled
            </span>
          </div>
        </div>

        {/* Card 3: AVAILABLE BALANCE */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden">
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
              {formatCurrency(cards?.availableBalance)}
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
            Your payouts consist of your daily gross revenue minus the agreed %
            loan deduction. Transfers are batched every 24 hours and settled to
            your primary bank account within 1-3 business days.
          </p>
        </div>
      </div>

      {/* Payout History Section */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0F172A]">Payout History</h2>
            {isLoadingHistory && (
              <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
            )}
          </div>
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
              {payouts.map((payout, idx) => {
                const txId =
                  payout.transactionId ||
                  payout.id ||
                  payout._id ||
                  `#PY-${idx + 1}`;
                const amountFormatted = formatCurrency(
                  payout.amount ?? payout.payoutAmount
                );
                const dateFormatted = formatDate(
                  payout.date || payout.createdAt
                );
                const status = payout.status || "Succeeded";
                const isSucceeded =
                  status.toLowerCase() === "succeeded" ||
                  status.toLowerCase() === "completed";
                const isProcessing =
                  status.toLowerCase() === "processing" ||
                  status.toLowerCase() === "pending";
                const isFailed = status.toLowerCase() === "failed";

                const destBank =
                  payout.destinationBank ||
                  payout.bankName ||
                  cards?.bankName ||
                  "Barclays Bank";
                const destLast4 =
                  payout.bankLast4 ||
                  (payout.accountNumber
                    ? payout.accountNumber.slice(-4)
                    : cards?.bankLast4 || "5678");

                return (
                  <tr
                    key={txId || idx}
                    onClick={() => setSelectedPayout(payout)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    {/* Transaction ID */}
                    <td className="py-4 px-6 text-sm font-semibold text-slate-800 font-mono">
                      {txId}
                    </td>

                    {/* Payout Amount */}
                    <td className="py-4 px-6 text-sm font-bold text-[#0F172A]">
                      {amountFormatted}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-sm font-medium text-slate-500">
                      {dateFormatted}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {isSucceeded && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                          Succeeded
                        </span>
                      )}

                      {isProcessing && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                          Processing
                        </span>
                      )}

                      {isFailed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#EF4444]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
                          Failed
                        </span>
                      )}

                      {!isSucceeded && !isProcessing && !isFailed && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          {status}
                        </span>
                      )}
                    </td>

                    {/* Destination Bank */}
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {destBank} •••• {destLast4}
                    </td>
                  </tr>
                );
              })}

              {payouts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400 text-sm font-medium"
                  >
                    {isLoadingHistory
                      ? "Loading payout history..."
                      : "No payout history found for your account."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-400">
            {meta?.total !== undefined && meta.total > 0
              ? `Showing ${(page - 1) * limit + 1} to ${Math.min(
                  page * limit,
                  meta.total
                )} of ${meta.total} payouts`
              : `Showing ${payouts.length} payouts`}
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

      {/* Payout Details Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  Disbursement Details
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] font-mono">
                  {selectedPayout.transactionId ||
                    selectedPayout.id ||
                    selectedPayout._id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPayout(null)}
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
                {selectedPayout.status?.toLowerCase() === "succeeded" ||
                selectedPayout.status?.toLowerCase() === "completed" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Succeeded
                  </span>
                ) : selectedPayout.status?.toLowerCase() === "processing" ||
                  selectedPayout.status?.toLowerCase() === "pending" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">
                    <Clock3 className="w-3.5 h-3.5" />
                    Processing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#EF4444]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {selectedPayout.status || "Failed"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">Date</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {formatDate(selectedPayout.date || selectedPayout.createdAt)}
                  </p>
                </div>
                <div className="p-3.5 border border-slate-100 rounded-xl">
                  <p className="text-xs font-medium text-slate-400">
                    Destination
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {selectedPayout.destinationBank ||
                      selectedPayout.bankName ||
                      cards?.bankName ||
                      "Barclays Bank"}
                  </p>
                  <p className="text-xs text-slate-400">
                    ••••{" "}
                    {selectedPayout.bankLast4 ||
                      (selectedPayout.accountNumber
                        ? selectedPayout.accountNumber.slice(-4)
                        : cards?.bankLast4 || "5678")}
                  </p>
                </div>
              </div>

              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Settlement Batch Ref</span>
                  <span className="font-mono text-slate-700">
                    {selectedPayout.reference || "SETTLE-AUTO-BATCH"}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold">
                  <span className="text-slate-900">Total Payout</span>
                  <span className="text-[#2563EB]">
                    {formatCurrency(
                      selectedPayout.amount ?? selectedPayout.payoutAmount
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedPayout(null)}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
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
