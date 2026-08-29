"use client";

import React, { useState } from "react";
import { Camera, Lock } from "lucide-react";

// Types
type TabType = "Business Info" | "Personal Info" | "Change Password" | "Notifications";

// --- Tab Components ---

import { useEffect } from "react";
import dashboardService, {
  BorrowerClientInfoData,
} from "@/lib/dashboardService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function BusinessInfoTab() {
  const [formData, setFormData] = useState({
    legalName: "Acme UK Ltd",
    crn: "12345678",
    storeUrl: "https://acme-store.co.uk",
    industrySector: "Retail",
    yearsInBusiness: "3",
    registeredAddress: "123 High Street, London, EC1A 1BB",
    fullName: "",
    businessEmail: "",
    phoneNumber: "",
  });

  const [originalData, setOriginalData] = useState(formData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchInfo = async () => {
      setIsLoading(true);
      try {
        const res = await dashboardService.getBorrowerClientInfo();
        if (isMounted && res && res.data) {
          const biz = res.data.businessDetails || {};
          const contact = res.data.primaryContact || {};

          const loaded = {
            legalName: biz.legalName || "Acme UK Ltd",
            crn: biz.crn || "12345678",
            storeUrl: biz.storeUrl || "https://acme-store.co.uk",
            industrySector: biz.industrySector || "Retail",
            yearsInBusiness:
              biz.yearsInBusiness !== undefined && biz.yearsInBusiness !== null
                ? String(biz.yearsInBusiness)
                : "3",
            registeredAddress:
              biz.registeredAddress || "123 High Street, London, EC1A 1BB",
            fullName: contact.fullName || "",
            businessEmail: contact.businessEmail || "",
            phoneNumber: contact.phoneNumber || "",
          };

          setFormData(loaded);
          setOriginalData(loaded);
        }
      } catch (err) {
        console.warn("Could not fetch borrower client info:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field: keyof typeof formData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleDiscard = () => {
    setFormData(originalData);
    toast.info("Reverted changes to previous values.");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: BorrowerClientInfoData = {
        businessDetails: {
          legalName: formData.legalName,
          crn: formData.crn,
          storeUrl: formData.storeUrl,
          industrySector: formData.industrySector,
          yearsInBusiness: Number(formData.yearsInBusiness) || 1,
          registeredAddress: formData.registeredAddress,
        },
        primaryContact: {
          fullName: formData.fullName,
          businessEmail: formData.businessEmail,
          phoneNumber: formData.phoneNumber,
        },
      };

      const res = await dashboardService.updateBorrowerClientInfo(payload);
      if (res && (res.success || res.statusCode === 200)) {
        if (res.data) {
          const biz = res.data.businessDetails || {};
          const contact = res.data.primaryContact || {};
          const updated = {
            legalName: biz.legalName || formData.legalName,
            crn: biz.crn || formData.crn,
            storeUrl: biz.storeUrl || formData.storeUrl,
            industrySector: biz.industrySector || formData.industrySector,
            yearsInBusiness:
              biz.yearsInBusiness !== undefined
                ? String(biz.yearsInBusiness)
                : formData.yearsInBusiness,
            registeredAddress:
              biz.registeredAddress || formData.registeredAddress,
            fullName:
              contact.fullName !== undefined
                ? contact.fullName
                : formData.fullName,
            businessEmail:
              contact.businessEmail !== undefined
                ? contact.businessEmail
                : formData.businessEmail,
            phoneNumber:
              contact.phoneNumber !== undefined
                ? contact.phoneNumber
                : formData.phoneNumber,
          };
          setFormData(updated);
          setOriginalData(updated);
        } else {
          setOriginalData(formData);
        }
        toast.success(res.message || "Borrower profile updated successfully!");
      } else {
        throw new Error(res?.message || "Failed to update business profile");
      }
    } catch (err: any) {
      console.error("Could not save borrower client info:", err);
      const errMsg =
        err?.data?.error?.[0]?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        err?.message ||
        "Failed to update business profile. Please try again.";
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {isLoading && (
        <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 self-start">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading verified business details from server...</span>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-6 w-full items-start">
        {/* Left Column: Business Details */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-5 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Business Legal Name
            </label>
            <input
              type="text"
              value={formData.legalName}
              onChange={(e) => handleChange("legalName", e.target.value)}
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Company Registration Number (CRN)
            </label>
            <input
              type="text"
              value={formData.crn}
              onChange={(e) => handleChange("crn", e.target.value)}
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 font-mono outline-none transition-all"
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
              value={formData.storeUrl}
              onChange={(e) => handleChange("storeUrl", e.target.value)}
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
                value={formData.industrySector}
                onChange={(e) => handleChange("industrySector", e.target.value)}
                className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Years in Business
              </label>
              <input
                type="text"
                value={formData.yearsInBusiness}
                onChange={(e) => handleChange("yearsInBusiness", e.target.value)}
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
              value={formData.registeredAddress}
              onChange={(e) => handleChange("registeredAddress", e.target.value)}
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Primary Contact */}
        <div className="w-full xl:w-[400px] bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Primary Contact
          </h2>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. John Richard Doe"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Business Email
            </label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={(e) => handleChange("businessEmail", e.target.value)}
              placeholder="e.g. john@starlight-tech.io"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="e.g. +44 7123 456 789"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 mt-2">
        <button
          type="button"
          onClick={handleDiscard}
          className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0A349E] hover:bg-[#0A349E]/90 transition-colors shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
        >
          {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>Save Profile</span>
        </button>
      </div>
    </form>
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

import authService from "@/lib/authService";
import { Eye, EyeOff } from "lucide-react";

function ChangePasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res && (res.success || res.statusCode === 200)) {
        toast.success(res.message || "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(res?.message || "Failed to change password");
      }
    } catch (err: any) {
      console.error("Change password error:", err);
      const errMsg =
        err?.data?.error?.[0]?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        err?.message ||
        "Failed to change password. Please verify your current password and try again.";
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-10 shadow-[0_2px_10px_rgba(0,0,0,0.02)] max-w-4xl animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Choose a New Password
        </h2>
        <p className="text-xs text-gray-400 font-medium">
          Enter and confirm your new password to regain access
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your old password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-11 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-11 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#2563EB] focus:bg-white rounded-lg pl-11 pr-11 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-2.5 rounded-lg text-sm font-bold text-white bg-[#0A349E] hover:bg-[#0A349E]/90 transition-colors shadow-sm cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Save</span>
          </button>
        </div>
      </form>
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
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
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
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
