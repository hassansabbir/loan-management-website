"use client";

import React from "react";
import { BadgeCheck, Landmark, PiggyBank, Percent } from "lucide-react";
import StatCard from "@/components/ui/dashboard/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const barChartData = [
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

const pieData = [
  { name: "Cleared", value: 28 },
  { name: "Remaining", value: 72 },
];
const pieColors = ["#2563EB", "#E5E7EB"];

const recentTransactions = [
  {
    id: "#LN-882910",
    date: "Oct 28, 2024",
    time: "14:22:10 GMT",
    grossSales: "£12,450.00",
    repayment: "-£747.00",
    netPayout: "£11,703.00",
    status: "Completed",
  },
  {
    id: "#LN-882909",
    date: "Oct 27, 2024",
    time: "14:22:10 GMT",
    grossSales: "£9,120.00",
    repayment: "-£547.20",
    netPayout: "£8,572.80",
    status: "Completed",
  },
  {
    id: "#LN-882908",
    date: "Oct 26, 2024",
    time: "14:22:10 GMT",
    grossSales: "£14,200.00",
    repayment: "-£852.00",
    netPayout: "£13,348.00",
    status: "Pending",
  },
];

export default function DashboardOverviewPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Real-time performance and loan repayment tracking.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Approved Loan"
          value="£250,000"
          subtitle="+100%"
          subtitleColor="text-emerald-500"
          progress={100}
          progressColor="bg-[#2563EB]"
          icon={<BadgeCheck className="w-5 h-5" />}
        />
        <StatCard
          title="Outstanding Balance"
          value="£180,000"
          subtitle="-28% Paid"
          subtitleColor="text-red-500"
          progress={72}
          progressColor="bg-[#2563EB]"
          icon={<Landmark className="w-5 h-5" />}
        />
        <StatCard
          title="Total Repaid"
          value="£70,000"
          subtitle="28% of Total"
          subtitleColor="text-emerald-500"
          progress={28}
          progressColor="bg-emerald-500"
          icon={<PiggyBank className="w-5 h-5" />}
        />
        <StatCard
          title="Repayment Rate"
          value="6%"
          subtitle="of daily sales"
          subtitleColor="text-gray-500"
          progress={6}
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
              <h3 className="font-semibold text-gray-900">Sales vs. Repayment</h3>
              <p className="text-sm text-gray-500">
                Track your business growth alongside loan amortization.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#BFDBFE]"></div>
                <span className="text-xs font-medium text-gray-600">Daily Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-medium text-gray-600">Repayment (6%)</span>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
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
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="repayment" stackId="a" fill="#34D399" radius={[0, 0, 4, 4]} />
                <Bar dataKey="sales" stackId="a" fill="#BFDBFE" radius={[4, 4, 0, 0]} />
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
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-900">28%</span>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
                CLEARED
              </span>
            </div>
          </div>
          
          <div className="mt-8 text-center w-full">
            <p className="font-bold text-gray-900 mb-6">
              £70,000 paid of £250,000
            </p>
            <button className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#2563EB] font-bold py-3 rounded-xl transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">Recent Transactions</h3>
          <button className="text-sm font-semibold text-[#2563EB] hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Transaction ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Date & Time</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Gross Sales</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Repayment (6%)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Net Payout</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-700 w-1/6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {tx.id}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-900">{tx.date}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{tx.time}</p>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {tx.grossSales}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-red-500">
                    {tx.repayment}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {tx.netPayout}
                  </td>
                  <td className="py-4 px-6">
                    {tx.status === "Completed" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-600">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-600">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
