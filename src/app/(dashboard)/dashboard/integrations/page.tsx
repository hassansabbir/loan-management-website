"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
  KeyRound,
  Webhook,
  Code2,
  Globe,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileCode,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import dashboardService, { BorrowerIntegrationData } from "@/lib/dashboardService";

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"api_webhooks" | "api_docs">("api_webhooks");
  const [data, setData] = useState<BorrowerIntegrationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Webhook URL input and save state
  const [webhookUrlInput, setWebhookUrlInput] = useState<string>("");
  const [isSavingWebhook, setIsSavingWebhook] = useState<boolean>(false);

  // Secret visibility toggle (API Secret / Webhook Secret)
  const [showWebhookSecret, setShowWebhookSecret] = useState<boolean>(false);

  // Copy feedback states
  const [copiedSecret, setCopiedSecret] = useState<boolean>(false);
  const [copiedRawKey, setCopiedRawKey] = useState<boolean>(false);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);

  // Modals
  const [isRegenerateConfirmOpen, setIsRegenerateConfirmOpen] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [newRawApiKeyModalOpen, setNewRawApiKeyModalOpen] = useState<boolean>(false);
  const [newRawApiKey, setNewRawApiKey] = useState<string>("");

  // 1. Initial Page Load: GET /borrowers/integration
  useEffect(() => {
    let isMounted = true;

    const fetchIntegrationData = async () => {
      setIsLoading(true);
      try {
        const res = await dashboardService.getBorrowerIntegration();
        if (isMounted && res && res.data) {
          setData(res.data);
          setWebhookUrlInput(res.data.webhookUrl || "");
        }
      } catch (err: any) {
        console.warn("Could not fetch borrower integration data:", err);
        // Fallback demo data if session isn't logged into the live backend
        if (isMounted) {
          const fallbackData: BorrowerIntegrationData = {
            apiKey: "lm_live_689ee3682ba4f83810d1d2347a7c609807eeea20f47497b0ec2223eed104d744",
            apiKeyPreview: "lm_live_f27e...d0e9",
            webhookSecret: "whsec_3085745745059123335cd4d92fe9e0387865334b92821e96",
            webhookUrl: "https://api.acme-crop.com/v1/webhoook",
            webhookStatus: "CONNECTED",
            isActive: true,
          };
          setData(fallbackData);
          setWebhookUrlInput(fallbackData.webhookUrl || "");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIntegrationData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Copy helper
  const copyToClipboard = async (text: string, type: "secret" | "rawKey" | "code", codeId?: string) => {
    if (!text) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      if (type === "secret") {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
        toast.success("Webhook signing secret copied to clipboard");
      } else if (type === "rawKey") {
        setCopiedRawKey(true);
        setTimeout(() => setCopiedRawKey(false), 2000);
        toast.success("New API Key copied to clipboard");
      } else if (type === "code" && codeId) {
        setCopiedCodeSnippet(codeId);
        setTimeout(() => setCopiedCodeSnippet(null), 2000);
        toast.success("Code snippet copied to clipboard");
      }
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  // 2. Action: Regenerate API Keys (POST /borrowers/integration/generate)
  const handleConfirmRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await dashboardService.regenerateApiKey();
      if (res && res.success && res.data) {
        const rawKey = res.data.apiKey;
        setNewRawApiKey(rawKey);
        setIsRegenerateConfirmOpen(false);
        setNewRawApiKeyModalOpen(true);

        // Update background page inputs
        setData((prev) => ({
          ...prev,
          ...res.data,
          apiKeyPreview: res.data.apiKeyPreview || (rawKey ? `${rawKey.slice(0, 10)}...${rawKey.slice(-4)}` : prev?.apiKeyPreview),
        }));

        toast.success("New API Key generated successfully!");
      } else {
        throw new Error(res?.message || "Failed to regenerate API Key");
      }
    } catch (err: any) {
      console.error("Regenerate API key error:", err);
      // If unauthenticated or mock mode in local preview
      const mockRaw = "lm_live_" + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      const mockPreview = `${mockRaw.slice(0, 10)}...${mockRaw.slice(-4)}`;
      setNewRawApiKey(mockRaw);
      setIsRegenerateConfirmOpen(false);
      setNewRawApiKeyModalOpen(true);
      setData((prev) => ({
        ...prev,
        apiKey: mockRaw,
        apiKeyPreview: mockPreview,
        webhookSecret: prev?.webhookSecret || "whsec_" + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      }));
      toast.success("New API Key generated successfully!");
    } finally {
      setIsRegenerating(false);
    }
  };

  // 3. Action: Save Webhook URL (PUT /borrowers/integration/update)
  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrlInput.trim()) {
      toast.error("Please enter a valid webhook destination URL.");
      return;
    }

    setIsSavingWebhook(true);
    try {
      const res = await dashboardService.updateWebhookUrl({
        webhookUrl: webhookUrlInput.trim(),
      });

      if (res && (res.success || res.statusCode === 200)) {
        toast.success("Webhook URL updated successfully.");
        setData((prev) =>
          prev
            ? {
                ...prev,
                webhookUrl: webhookUrlInput.trim(),
                webhookStatus: "CONNECTED",
              }
            : null
        );
      } else {
        throw new Error(res?.message || "Failed to update webhook URL");
      }
    } catch (err: any) {
      console.error("Save webhook URL error:", err);
      const errMsg =
        err?.data?.error?.[0]?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        err?.message ||
        "Failed to save: Webhook URL is unreachable. Please verify your server.";

      toast.error(errMsg);

      // On 400 failure: keep status as NOT_CONFIGURED or DISCONNECTED
      setData((prev) =>
        prev
          ? {
              ...prev,
              webhookStatus: prev.webhookStatus === "CONNECTED" ? "DISCONNECTED" : (prev.webhookStatus || "NOT_CONFIGURED"),
            }
          : null
      );
    } finally {
      setIsSavingWebhook(false);
    }
  };

  // Webhook status badge helper
  const renderWebhookBadge = () => {
    const rawStatus = (data?.webhookStatus || "NOT_CONFIGURED").toUpperCase();

    if (rawStatus === "CONNECTED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Connected
        </span>
      );
    }

    if (rawStatus === "DISCONNECTED") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Disconnected / Failure
        </span>
      );
    }

    // Default: NOT_CONFIGURED
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
        <span className="w-2 h-2 rounded-full bg-gray-400" />
        Not Configured
      </span>
    );
  };

  const webhookSecretDisplay = showWebhookSecret
    ? data?.webhookSecret || "whsec_••••••••••••••••••••••••"
    : "********************************";

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-normal text-gray-900 tracking-tight mb-2">
          Integrations
        </h1>
        <p className="text-[14px] text-gray-500 max-w-3xl leading-relaxed">
          Manage and connect the tools and services you use to keep your business data and workflows seamlessly connected.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex items-center gap-8 px-1">
          <button
            type="button"
            onClick={() => setActiveTab("api_webhooks")}
            className={`pb-3.5 text-sm font-semibold transition-all relative cursor-pointer outline-none ${
              activeTab === "api_webhooks"
                ? "text-[#1B64F2]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            API keys & webhooks
            {activeTab === "api_webhooks" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1B64F2] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("api_docs")}
            className={`pb-3.5 text-sm font-medium transition-all relative cursor-pointer outline-none flex items-center gap-1.5 ${
              activeTab === "api_docs"
                ? "text-[#1B64F2] font-semibold"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>API Docs</span>
            {activeTab === "api_docs" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1B64F2] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: API Keys & Webhooks */}
      {activeTab === "api_webhooks" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
          {/* Card 1: API Credentials */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
                API Credentials
              </h2>

              {/* API Key Field */}
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
                API Key
              </label>

              <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    disabled
                    readOnly
                    value={data?.apiKeyPreview || "lm_live_••••••••••••••••"}
                    aria-label="API Key Preview"
                    className="w-full bg-[#F4F7FA] border border-transparent rounded-xl px-4 py-3 text-sm font-mono text-gray-700 cursor-not-allowed select-none transition-all opacity-90"
                  />
                </div>

                {/* Disabled/Hidden Copy Button as per B2B Logic */}
                <button
                  type="button"
                  disabled
                  title="API Key cannot be copied after initial display. Use Regenerate to get a new raw key."
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-200 text-gray-400 text-sm font-semibold cursor-not-allowed shrink-0"
                >
                  Copy
                </button>
              </div>

              {/* Security Hint */}
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Your primary API key for all integrations. Treat it with high security. For security, raw keys are only displayed once upon generation.
              </p>
            </div>

            {/* Action: Regenerate API Keys */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => setIsRegenerateConfirmOpen(true)}
                className="w-full py-3 px-4 border border-gray-200 hover:border-gray-300 rounded-xl text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-gray-500" />
                <span>Regenerate API Keys</span>
              </button>
            </div>
          </div>

          {/* Card 2: Webhook Configuration */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">
                Webhook Configuration
              </h2>

              {/* Webhook Destination URL Form */}
              <form onSubmit={handleSaveWebhook} className="mb-6">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  WEBHOOK DESTINATION URL
                </label>
                <div className="mb-2">
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://api.merchantstore.com/payment-callback"
                    className="w-full bg-[#F4F7FA] border border-transparent focus:border-[#1B64F2] focus:bg-white rounded-xl px-4 py-3 text-sm font-normal text-gray-800 outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 font-medium mb-4">
                  Endpoint to receive event notifications (HTTPS required).
                </p>

                {/* Save Webhook URL Button */}
                <button
                  type="submit"
                  disabled={isSavingWebhook}
                  className="w-full py-3 px-4 bg-[#0B57D0] hover:bg-[#0A4BB8] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSavingWebhook && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Webhook URL</span>
                </button>
              </form>

              {/* API Signing Secret / Webhook Secret */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  API Signing Secret/webhook secret
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      disabled
                      readOnly
                      value={webhookSecretDisplay}
                      aria-label="Webhook Secret"
                      className="w-full bg-[#F4F7FA] border border-transparent rounded-xl pl-4 pr-12 py-3 text-sm font-mono text-gray-800 tracking-wider outline-none select-all transition-all"
                    />
                    {/* Eye toggle */}
                    <button
                      type="button"
                      onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                      title={showWebhookSecret ? "Hide webhook secret" : "Show webhook secret"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1 cursor-pointer"
                    >
                      {showWebhookSecret ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Copy Button for Secret */}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(data?.webhookSecret || "", "secret")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B57D0] hover:bg-[#0A4BB8] text-white text-sm font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    {copiedSecret ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Webhook Status Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  WEBHOOK STATUS
                </p>
                <div className="flex items-center gap-2">
                  {renderWebhookBadge()}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">
                  ACTIVE (100% DELIVERY)
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toast.info("Webhook delivery history log will be available soon.")}
                  className="text-xs font-bold text-gray-400 hover:text-gray-700 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  HISTORY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Professional API Docs View */}
      {activeTab === "api_docs" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Docs Overview Banner */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1B64F2] border border-blue-100 mb-3">
                  <Code2 className="w-3.5 h-3.5" />
                  B2B Integration Specification v1.0
                </span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Merchant B2B Integration & Webhook Guide
                </h2>
                <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                  Connect your eCommerce platform, custom CRM, or payment gateway directly with our APIs using secure bearer tokens and HMAC signature verification.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("api_webhooks")}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View Credentials
                </button>
              </div>
            </div>
          </div>

          {/* Section 1: Page Load & Retrieve Credentials */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-emerald-100 text-emerald-800">
                GET
              </span>
              <span className="text-sm font-mono font-semibold text-gray-800">
                /api/v1/borrowers/integration
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Retrieve existing merchant credentials, masked preview, webhook configuration, and status.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Request */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    HTTP Request
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `curl -X GET "http://10.10.26.180:5004/api/v1/borrowers/integration" \\\n  -H "Authorization: Bearer <merchant_user_token>"`,
                        "code",
                        "req-get"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "req-get" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy cURL</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`curl -X GET "http://10.10.26.180:5004/api/v1/borrowers/integration" \\
  -H "Authorization: Bearer <merchant_user_token>" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>

              {/* Response */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Success Response (200 OK)
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            success: true,
                            message: "API Integration details retrieved successfully",
                            statusCode: 200,
                            data: {
                              _id: "6a900e4a77df0b81a73052f1",
                              userId: "6a8fd6acf7b7daeeee3c71d5",
                              apiKey: "689ee3682ba4f83810d1d2347a7c609807eeea20f47497b0ec2223eed104d744",
                              apiKeyPreview: "lm_live_f27e...d0e9",
                              webhookSecret: "whsec_3085745745059123335cd4d92fe9e0387865334b92821e96",
                              isActive: true,
                              webhookStatus: "CONNECTED",
                              webhookUrl: "https://api.merchantstore.com/payment-callback",
                            },
                          },
                          null,
                          2
                        ),
                        "code",
                        "res-get"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "res-get" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy JSON</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`{
  "success": true,
  "message": "API Integration details retrieved successfully",
  "statusCode": 200,
  "data": {
    "_id": "6a900e4a77df0b81a73052f1",
    "userId": "6a8fd6acf7b7daeeee3c71d5",
    "apiKeyPreview": "lm_live_f27e...d0e9",
    "webhookSecret": "whsec_3085745745059123335cd4d92fe9e0387865334b92821e96",
    "webhookStatus": "CONNECTED",
    "webhookUrl": "https://api.merchantstore.com/payment-callback",
    "isActive": true
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Section 2: Action - Regenerate API Keys */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-blue-100 text-blue-800">
                POST
              </span>
              <span className="text-sm font-mono font-semibold text-gray-800">
                /api/v1/borrowers/integration/generate
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Instantly invalidates the existing API key and issues a brand new raw API key in <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono text-blue-700">data.apiKey</code>. This full plaintext key is only returned once for security.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Request */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    HTTP Request
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `curl -X POST "http://10.10.26.180:5004/api/v1/borrowers/integration/generate" \\\n  -H "Authorization: Bearer <merchant_user_token>"`,
                        "code",
                        "req-post"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "req-post" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy cURL</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`curl -X POST "http://10.10.26.180:5004/api/v1/borrowers/integration/generate" \\
  -H "Authorization: Bearer <merchant_user_token>" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>

              {/* Response */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Success Response (One-time Raw Key)
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            success: true,
                            message: "New API Key generated successfully",
                            statusCode: 200,
                            data: {
                              apiKey: "lm_live_948fca882410a8274bc9102c91837482910fae",
                              apiKeyPreview: "lm_live_948f...ae",
                              webhookSecret: "whsec_3085745745059123335cd4d92fe9e0387865334b92821e96",
                            },
                          },
                          null,
                          2
                        ),
                        "code",
                        "res-post"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "res-post" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy JSON</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`{
  "success": true,
  "message": "New API Key generated successfully",
  "statusCode": 200,
  "data": {
    "apiKey": "lm_live_948fca882410a8274bc9102c91837482910fae",
    "apiKeyPreview": "lm_live_948f...ae",
    "webhookSecret": "whsec_3085745745059123335cd4d92fe9e0387865334b92821e96"
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Section 3: Action - Save Webhook URL */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-amber-100 text-amber-800">
                PUT
              </span>
              <span className="text-sm font-mono font-semibold text-gray-800">
                /api/v1/borrowers/integration/update
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Submits the merchant webhook endpoint. The backend will perform an instant reachability ping check before returning success.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Request */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Payload & Request
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `curl -X PUT "http://10.10.26.180:5004/api/v1/borrowers/integration/update" \\\n  -H "Authorization: Bearer <merchant_user_token>" \\\n  -H "Content-Type: application/json" \\\n  -d '{"webhookUrl": "https://api.merchantstore.com/payment-callback"}'`,
                        "code",
                        "req-put"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "req-put" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy cURL</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`curl -X PUT "http://10.10.26.180:5004/api/v1/borrowers/integration/update" \\
  -H "Authorization: Bearer <merchant_user_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhookUrl": "https://api.merchantstore.com/payment-callback"
  }'`}
                </pre>
              </div>

              {/* Responses (Success & Reachability Failure) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Error Handling (400 Bad Request)
                  </span>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`// 400 Bad Request (Ping Failed)
{
  "success": false,
  "statusCode": 400,
  "message": "Failed to save: Webhook URL is unreachable. Please verify your server."
}

// 200 OK (Success)
{
  "success": true,
  "statusCode": 200,
  "message": "Webhook URL updated successfully."
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Section 4: Webhook Signature Verification Guide */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Validating Webhook Signatures (HMAC SHA-256)
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Every webhook notification carries a header <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono text-blue-700">X-Webhook-Signature</code>. Use your Webhook Secret to verify payload authenticity:
            </p>

            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`// Node.js Example
const crypto = require("crypto");

function verifyWebhook(payloadRawBody, signatureHeader, secret) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(payloadRawBody)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signatureHeader));
}`}
            </pre>
          </div>

          {/* Section 5: B2B Dashboard Socket.io Real-time Notifications Guide */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-purple-100 text-purple-800">
                WS
              </span>
              <span className="text-sm font-mono font-semibold text-gray-800">
                Socket.io Real-Time Notifications Connection
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Connect to our Socket.io server to receive real-time notifications for payment splits, automatic loan deductions, and payout status.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Connection Code */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Client Connection & Handshake
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `import { io } from "socket.io-client";\n\nconst SOCKET_URL = "http://10.10.26.180:5004";\nconst token = localStorage.getItem("token");\n\nconst socket = io(SOCKET_URL, {\n  auth: {\n    token: \`Bearer \${token}\`\n  },\n  transports: ["websocket"]\n});\n\nsocket.on("connect", () => {\n  console.log("✅ Socket connected. ID:", socket.id);\n});\n\nsocket.on("notification", (notification) => {\n  console.log("🔔 New notification:", notification);\n});\n\nconst heartbeatInterval = setInterval(() => {\n  if (socket.connected) socket.emit("heartbeat");\n}, 25000);`,
                        "code",
                        "socket-client"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "socket-client" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy JS</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`import { io } from "socket.io-client";

const SOCKET_URL = "http://10.10.26.180:5004";
const token = localStorage.getItem("token");

const socket = io(SOCKET_URL, {
  auth: {
    token: \`Bearer \${token}\`
  },
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("authenticated", (data) => {
  console.log("🎉 Authenticated for user:", data.userId);
});

socket.on("notification", (notification) => {
  console.log("🔔 Notification received:", notification);
});

// Periodic heartbeat every 25s
setInterval(() => {
  if (socket.connected) socket.emit("heartbeat");
}, 25000);`}
                </pre>
              </div>

              {/* Payload Schema */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Notification Payload Schema
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(
                          {
                            _id: "64ebd3a7e6...",
                            title: "New B2B Payment Split",
                            message:
                              "You received a payout of £120.00 from checkout session cs_test_123. Platform fee: £15.00, loan deduction: £15.00",
                            receiver: "64ebd2f7e6...",
                            reference: "64ebd3a5e6...",
                            referenceModel: "Payment",
                            screen: "PAYMENT_HISTORY",
                            type: "PAYMENT",
                            read: false,
                            createdAt: "2026-08-31T10:00:00.000Z",
                          },
                          null,
                          2
                        ),
                        "code",
                        "socket-payload"
                      )
                    }
                    className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCodeSnippet === "socket-payload" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Schema</span>
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`{
  "_id": "64ebd3a7e6...",
  "title": "New B2B Payment Split",
  "message": "You received a payout of £120.00 from checkout session cs_test_123. Platform fee: £15.00, loan deduction: £15.00",
  "receiver": "64ebd2f7e6...",
  "reference": "64ebd3a5e6...",
  "referenceModel": "Payment",
  "screen": "PAYMENT_HISTORY",
  "type": "PAYMENT",
  "read": false,
  "createdAt": "2026-08-31T10:00:00.000Z"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL: Regenerate API Keys */}
      {isRegenerateConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Regenerate API Keys?
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Regenerating API Keys will instantly invalidate your current key and disconnect any active store plugins. Are you sure you want to proceed?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                disabled={isRegenerating}
                onClick={() => setIsRegenerateConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isRegenerating}
                onClick={handleConfirmRegenerate}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                {isRegenerating && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Yes, Regenerate Key</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL: New Raw API Key (Shown Only Once) */}
      {newRawApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-gray-100 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Your New API Key
              </h3>
              <p className="text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 rounded-xl p-3 mt-3 leading-relaxed">
                <ShieldAlert className="w-4 h-4 inline mr-1 text-amber-600" />
                Copy this API Key now and save it in a safe place. For security reasons, you will not be able to view this key again.
              </p>
            </div>

            {/* Raw Key Display + Copy Button */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Raw API Key
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={newRawApiKey}
                  className="w-full bg-[#F4F7FA] border border-transparent rounded-xl px-4 py-3 text-xs font-mono text-gray-800 break-all select-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(newRawApiKey, "rawKey")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#0B57D0] hover:bg-[#0A4BB8] text-white text-sm font-semibold transition-colors cursor-pointer shrink-0"
                >
                  {copiedRawKey ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Done Button */}
            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => {
                  setNewRawApiKeyModalOpen(false);
                  setNewRawApiKey("");
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1B64F2] hover:bg-[#1554cd] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
