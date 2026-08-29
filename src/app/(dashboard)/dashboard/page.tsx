"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BadgeCheck, Landmark, PiggyBank, Percent, Loader2, ArrowRight } from "lucide-react";
import StatCard from "@/components/ui/dashboard/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dashboardService, {
  OverviewCardsData,
  RepaymentProgressData,
  ChartDataPoint,
  RecentTransactionItem,
} from "@/lib/dashboardService";

// Fallback chart data in case server hasn't generated analytics yet
const defaultChartData = [
  { name: "01 Oct", repayment: 40, sales: 200 },
  { name: "04 Oct", repayment: 45, sales: 230 },
  { name: "08 Oct", repayment: 35, sales: 180 },
  { name: "11 Oct", repayment: 60, sales: 300 },
  { name: "15 Oct", repayment: 80, sales: 400 },
  { name: "18 Oct", repayment: 55, sales: 280 },
  { name: "22 Oct", repayment: 90, sales: 450 },
  { name: "25 Oct", repayment: 70, sales: 350 },
  { name: "28 Oct", repayment: 40, sales: 200 },
  { name: "30 Oct", repayment: 50, sales: 250 },
];

export default function DashboardOverviewPage() {
  const [overview, setOverview] = useState<OverviewCardsData | null>(null);
  const [progress, setProgress] = useState<RepaymentProgressData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<RecentTransactionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch all 4 APIs on mount
  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [overviewRes, progressRes, chartRes, txRes] =
          await Promise.allSettled([
            dashboardService.getOverviewCards(),
            dashboardService.getRepaymentProgress(),
            dashboardService.getChartData(),
            dashboardService.getRecentTransactions(),
          ]);

        if (!isMounted) return;

        // 1. Overview Cards
        if (overviewRes.status === "fulfilled" && overviewRes.value?.data) {
          setOverview(overviewRes.value.data);
        }

        // 2. Repayment Progress
        if (progressRes.status === "fulfilled" && progressRes.value?.data) {
          setProgress(progressRes.value.data);
        }

        // 3. Sales vs Repayment Chart
        if (chartRes.status === "fulfilled" && chartRes.value?.data) {
          const raw = chartRes.value.data;
          if (Array.isArray(raw) && raw.length > 0) {
            setChartData(
              raw.map((item) => ({
                name: item.date,
                sales: item.sales,
                repayment: item.repayments,
              }))
            );
          } else {
            setChartData(defaultChartData);
          }
        } else {
          setChartData(defaultChartData);
        }

        // 4. Recent Transactions
        if (txRes.status === "fulfilled" && txRes.value?.data) {
          const txList = txRes.value.data;
          if (Array.isArray(txList)) {
            setTransactions(txList);
          }
        }
      } catch (err) {
        console.error("Dashboard overview data fetch error:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatCurrency = (
    val: number | undefined | null,
    fallback: number = 0
  ): string => {
    const num = typeof val === "number" ? val : fallback;
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: num % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
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

  // Calculations for overview cards
  const approvedLoan = overview?.approvedLoan ?? 0;
  const outstandingBalance = overview?.outstandingBalance ?? 0;
  const totalRepaid = overview?.totalRepaid ?? 0;
  const repaymentRate = overview?.repaymentRate ?? 0;

  const paidPercent =
    approvedLoan > 0 ? Math.round((totalRepaid / approvedLoan) * 100) : 0;
  const balanceProgress =
    approvedLoan > 0
      ? Math.min(100, Math.round((outstandingBalance / approvedLoan) * 100))
      : 0;

  // Pie chart calculation
  const percentCleared = progress?.percentCleared ?? paidPercent;
  const amountPaid = progress?.amountPaid ?? totalRepaid;
  const amountTotal = progress?.amountTotal ?? approvedLoan;

  const pieData = [
    { name: "Cleared", value: Math.max(0, Math.min(100, percentCleared)) },
    {
      name: "Remaining",
      value: Math.max(0, 100 - Math.min(100, percentCleared)),
    },
  ];
  const pieColors = ["#2563EB", "#E5E7EB"];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Real-time performance and loan repayment tracking.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 self-start sm:self-auto">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Syncing live metrics...</span>
          </div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Approved Loan"
          value={formatCurrency(approvedLoan)}
          subtitle="+100%"
          subtitleColor="text-emerald-500"
          progress={100}
          progressColor="bg-[#2563EB]"
          icon={<BadgeCheck className="w-5 h-5" />}
        />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(outstandingBalance)}
          subtitle={`-${paidPercent}% Paid`}
          subtitleColor="text-red-500"
          progress={balanceProgress}
          progressColor="bg-[#2563EB]"
          icon={<Landmark className="w-5 h-5" />}
        />
        <StatCard
          title="Total Repaid"
          value={formatCurrency(totalRepaid)}
          subtitle={`${paidPercent}% of Total`}
          subtitleColor="text-emerald-500"
          progress={paidPercent}
          progressColor="bg-emerald-500"
          icon={<PiggyBank className="w-5 h-5" />}
        />
        <StatCard
          title="Repayment Rate"
          value={`${repaymentRate}%`}
          subtitle="of daily sales"
          subtitleColor="text-gray-500"
          progress={repaymentRate}
          progressColor="bg-amber-400"
          icon={<Percent className="w-5 h-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales vs Repayment Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">
                Sales vs. Repayment
              </h3>
              <p className="text-sm text-gray-500">
                Track your business growth alongside loan amortization.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#BFDBFE]"></div>
                <span className="text-xs font-medium text-gray-600">
                  Daily Sales
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-medium text-gray-600">
                  Repayment ({repaymentRate}%)
                </span>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  formatter={(value: any, name: any) => [
                    formatCurrency(value),
                    name === "sales" ? "Daily Sales" : "Repayment",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="repayment"
                  stackId="a"
                  fill="#34D399"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="sales"
                  stackId="a"
                  fill="#BFDBFE"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Repayment Progress Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center">
          <h3 className="font-semibold text-gray-900 w-full text-center mb-6">
            Repayment Progress
          </h3>
          <div className="relative w-[220px] h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={105}
                  startAngle={-270}
                  endAngle={90}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={10}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">
                {percentCleared}%
              </span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
                CLEARED
              </span>
            </div>
          </div>

          <div className="mt-8 text-center w-full">
            <p className="font-bold text-gray-900 mb-6">
              {formatCurrency(amountPaid)} paid of {formatCurrency(amountTotal)}
            </p>
            <Link
              href="/dashboard/funding"
              className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#2563EB] font-bold py-3 rounded-xl transition-colors block text-center"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">
            Recent Transactions
          </h3>
          <Link
            href="/dashboard/transactions"
            className="text-sm font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Transaction ID
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Date & Time
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Gross Sales
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Repayment ({repaymentRate}%)
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Net Payout
                </th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-400">
                    No recent transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => {
                  const { date, time } = formatDate(tx.createdAt);
                  const isCompleted = tx.status?.toLowerCase() === "completed";
                  const isPending = tx.status?.toLowerCase() === "pending";

                  return (
                    <tr
                      key={tx.transactionId || idx}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-700 font-mono">
                        {tx.transactionId}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">
                          {date}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {time}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-700">
                        {formatCurrency(tx.grossSales)}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-red-500">
                        -{formatCurrency(tx.repayment)}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-700">
                        {formatCurrency(tx.netPayout)}
                      </td>
                      <td className="py-4 px-6">
                        {isCompleted ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-600">
                            Completed
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-600">
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                            {tx.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
