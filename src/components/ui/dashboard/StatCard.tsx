import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  progress: number;
  progressColor: string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  subtitleColor,
  progress,
  progressColor,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-gray-500">{icon}</div>
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-5">
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        <p className={`text-sm font-semibold ${subtitleColor} leading-none pb-0.5`}>
          {subtitle}
        </p>
      </div>

      <div className="mt-auto">
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-1.5 rounded-full ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
