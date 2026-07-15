"use client";

import React, { useState } from "react";
import { Camera, Lock } from "lucide-react";

// Types
type TabType = "Business Info" | "Personal Info" | "Change Password" | "Notifications";

// --- Tab Components ---

function BusinessInfoTab() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
        {/* Left Column */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-5 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Business Legal Name
            </label>
            <input
              type="text"
              defaultValue="Fintach Ltd"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Company Registration Number (CRN)
            </label>
            <input
              type="text"
              defaultValue="21351654620"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-400 outline-none transition-all"
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Must be registered with Companies House.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Business Website / Store URL
            </label>
            <input
              type="text"
              defaultValue="https://www.yourbusiness.com"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Industry Sector
              </label>
              <input
                type="text"
                defaultValue="Software / SaaS"
                className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Years in Business
              </label>
              <input
                type="text"
                defaultValue="Less than 1 year"
                className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Registered Office Address
            </label>
            <input
              type="text"
              defaultValue="71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-[400px] bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Primary Contact</h2>
          
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Richard Doe"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Business Email
            </label>
            <input
              type="email"
              defaultValue="john@starlight-tech.io"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue="7123 456 789"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-2">
        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
          Discard Changes
        </button>
        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0A349E] hover:bg-[#0A349E]/90 transition-colors shadow-sm">
          Save Profile
        </button>
      </div>
    </div>
  );
}

function PersonalInfoTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] max-w-4xl animate-in fade-in duration-300">
      {/* Avatar upload */}
      <div className="mb-8 relative inline-block">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 relative bg-gray-200 grayscale">
          {/* Using a placeholder gradient to represent the image in the screenshot */}
          <div className="w-full h-full bg-linear-to-br from-gray-500 to-gray-800" />
        </div>
        <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 text-orange-500 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-5 max-w-full">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Smith"
            className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            defaultValue="+123456789"
            className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue="sdfsdf@gmail.com"
            className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-10 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1e40af] transition-colors shadow-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] max-w-4xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Choose a New Password</h2>
        <p className="text-xs text-gray-400 font-medium">Enter and confirm your new password to regain access</p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Enter your old password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Enter your new password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Re-enter your new password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button className="px-10 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1e40af] transition-colors shadow-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] max-w-4xl animate-in fade-in duration-300">
      <div className="flex flex-col gap-8">
        
        {/* Email Alerts Toggle */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Email Alerts</h3>
            <p className="text-xs font-medium text-gray-400">
              Instant updates about your account activity sent to your inbox.
            </p>
          </div>
          {/* Custom Toggle Switch (Active) */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        {/* Desktop Notifications Toggle */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Desktop Notifications</h3>
            <p className="text-xs font-medium text-gray-400">
              Get notified directly on your browser while working.
            </p>
          </div>
          {/* Custom Toggle Switch (Inactive) */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        <div className="flex justify-end mt-2">
          <button className="px-10 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1D4ED8] hover:bg-[#1e40af] transition-colors shadow-sm">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}


// --- Main Page Component ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Business Info");
  
  const tabs: TabType[] = ["Business Info", "Personal Info", "Change Password", "Notifications"];

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-normal text-gray-800 tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-[14px] text-gray-500 max-w-2xl leading-relaxed">
          Manage your registered business details, banking information, and verify your identity to maintain your funding facility.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto">
        <div className="flex items-center gap-8 min-w-max px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-bold transition-all relative outline-none ${
                  isActive ? "text-[#2563EB]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "Business Info" && <BusinessInfoTab />}
        {activeTab === "Personal Info" && <PersonalInfoTab />}
        {activeTab === "Change Password" && <ChangePasswordTab />}
        {activeTab === "Notifications" && <NotificationsTab />}
      </div>
    </div>
  );
}
