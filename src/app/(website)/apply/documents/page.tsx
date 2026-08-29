"use client";

import React, { useState, useRef } from "react";
import { useApply } from "../ApplyContext";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Loader2,
  Landmark,
  Contact,
} from "lucide-react";

interface UploadCardProps {
  id: string;
  label: string;
  subtext: string;
  badgeText: string;
  badgeStyle: string;
  hintText: string;
  value: string;
  onChange: (fileName: string, file: File | null) => void;
  error?: string;
  icon: React.ComponentType<any>;
}

function UploadCard({
  id,
  label,
  subtext,
  badgeText,
  badgeStyle,
  hintText,
  value,
  onChange,
  error,
  icon: IconComponent,
}: UploadCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setProgress(0);

    const duration = 600;
    const steps = 6;
    const intervalTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsUploading(false);
        onChange(file.name, file);
      }
    }, intervalTime);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleRemove = () => {
    onChange("", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[300px]">
      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-800 truncate">
              {label}
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
              {subtext}
            </p>
          </div>
          <span
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 select-none ${badgeStyle}`}
          >
            {badgeText}
          </span>
        </div>
      </div>

      {/* Dotted Upload Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !value && !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer mt-5 flex-1 min-h-[140px] ${
          value
            ? "border-emerald-200 bg-emerald-50/10"
            : isUploading
            ? "border-blue-200 bg-blue-50/10 cursor-wait"
            : dragActive
            ? "border-primary bg-blue-50/20 scale-[1.01]"
            : error
            ? "border-destructive bg-destructive-50/5 hover:border-destructive/80"
            : "border-slate-200 bg-[#F1F5FB]/30 hover:border-slate-350 hover:bg-[#F1F5FB]/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading || !!value}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

        {value ? (
          // Uploaded State
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate max-w-[140px] sm:max-w-[200px]">
                  {value}
                </p>
                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded successfully
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
              title="Remove file"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : isUploading ? (
          // Uploading Progress State
          <div className="w-full flex flex-col items-center">
            <Loader2 className="w-5.5 h-5.5 text-primary animate-spin mb-2" />
            <p className="text-xs font-bold text-slate-800">
              Uploading document...
            </p>
            <div className="w-40 bg-slate-100 h-1 rounded-full overflow-hidden mt-3">
              <div
                className="bg-primary h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">
              {Math.round(progress)}%
            </p>
          </div>
        ) : (
          // Empty Default State
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-3">
              <IconComponent className="w-5.5 h-5.5 stroke-[1.8px]" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              <span className="text-primary hover:underline font-extrabold">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-[10px] font-bold text-slate-400 mt-2 tracking-wider">
              {hintText}
            </p>
          </div>
        )}
      </div>

      {error && !value && !isUploading && (
        <p className="mt-2 text-[10px] font-bold text-destructive">{error}</p>
      )}
    </div>
  );
}

import { useAuth } from "@/contexts/AuthContext";
import loanService from "@/lib/loanService";
import { toast } from "sonner";

export default function DocumentsStep() {
  const { data, files, updateData, setFile, goToNextStep, goToPrevStep, setSubmittedAppId } = useApply();
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in first to submit your loan application documents.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loanService.createApplication(data, files);
      if (res && (res.success || res.statusCode === 200 || res.statusCode === 201)) {
        if (res.data?._id) {
          setSubmittedAppId(res.data._id);
        }
        toast.success("Documents & draft application uploaded successfully!");
        goToNextStep();
      } else {
        throw new Error(res.message || "Failed to create application draft");
      }
    } catch (err: any) {
      console.error("Documents step POST error:", err);
      const errMsg =
        err?.data?.error?.[0]?.message ||
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        err?.message ||
        "Failed to upload documents and create application.";

      // If user already has an active loan/application in progress, inform user and route to review
      if (
        errMsg.toLowerCase().includes("already have an active") ||
        errMsg.toLowerCase().includes("in progress")
      ) {
        toast.info(errMsg, {
          description: "Loading your existing application review...",
          duration: 5000,
        });
        goToNextStep();
      } else {
        toast.error(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleContinue} className="max-w-4xl mx-auto">
      {/* Centered Headers */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Upload Required Documents
        </h2>
        <p className="text-sm text-slate-500 font-semibold mt-3 max-w-xl mx-auto leading-relaxed">
          To finalize your revenue financing application, please provide the following documents. Digital copies or clear photos are accepted.
        </p>
      </div>

      {/* 2x2 Grid of Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Card 1: Certificate of Incorporation */}
        <UploadCard
          id="docRegistration"
          label="Certificate of Incorporation"
          subtext="Proof of registered UK business status."
          badgeText="Ready to upload"
          badgeStyle="bg-slate-100 text-slate-500"
          hintText="PDF, JPG OR PNG (MAX. 10MB)"
          value={data.docRegistration}
          onChange={(fileName, file) => {
            updateData({ docRegistration: fileName });
            setFile("certificateOfIncorporation", file);
            if (errors.docRegistration)
              setErrors((prev) => ({ ...prev, docRegistration: "" }));
          }}
          error={errors.docRegistration}
          icon={UploadCloud}
        />

        {/* Card 2: Owner's Photo ID */}
        <UploadCard
          id="docPhotoId"
          label="Owner's Photo ID"
          subtext="Passport or UK Driving License."
          badgeText="Required"
          badgeStyle="bg-slate-100 text-slate-500"
          hintText="CLEAR COLOR SCAN PREFERRED"
          value={data.docPhotoId}
          onChange={(fileName, file) => {
            updateData({ docPhotoId: fileName });
            setFile("ownersPhotoId", file);
            if (errors.docPhotoId)
              setErrors((prev) => ({ ...prev, docPhotoId: "" }));
          }}
          error={errors.docPhotoId}
          icon={Contact}
        />

        {/* Card 3: Last 3 Months Bank Statements */}
        <UploadCard
          id="docBankStatements"
          label="Last 3 Months Bank Statements"
          subtext="Official monthly business banking records."
          badgeText="Required"
          badgeStyle="bg-slate-100 text-slate-500"
          hintText="LATEST STATEMENTS IN PDF FORMAT"
          value={data.docBankStatements}
          onChange={(fileName, file) => {
            updateData({ docBankStatements: fileName });
            setFile("bankStatements", file);
            if (errors.docBankStatements)
              setErrors((prev) => ({ ...prev, docBankStatements: "" }));
          }}
          error={errors.docBankStatements}
          icon={Landmark}
        />

        {/* Card 4: VAT Returns */}
        <UploadCard
          id="docTaxReturn"
          label="VAT Returns"
          subtext="Most recent quarterly return document."
          badgeText="Ready to upload"
          badgeStyle="bg-slate-100 text-slate-500"
          hintText="OFFICIAL HMRC DOCUMENT"
          value={data.docTaxReturn}
          onChange={(fileName, file) => {
            updateData({ docTaxReturn: fileName });
            setFile("vatReturns", file);
            if (errors.docTaxReturn)
              setErrors((prev) => ({ ...prev, docTaxReturn: "" }));
          }}
          error={errors.docTaxReturn}
          icon={FileText}
        />
      </div>

      {/* Action Footer */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <button
          type="button"
          onClick={goToPrevStep}
          className="px-5 py-3 border border-slate-200 hover:border-slate-350 text-slate-600 hover:text-slate-800 bg-white font-bold text-sm rounded-xl inline-flex items-center gap-2 transition-all active:scale-97 cursor-pointer w-full sm:w-auto justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <span className="text-xs font-semibold text-slate-400 italic">
          All data is encrypted and handled securely.
        </span>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-[#003CB5] text-white font-bold text-sm px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-97 disabled:opacity-60 cursor-pointer w-full sm:w-auto justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading & Creating Application...</span>
            </>
          ) : (
            <>
              <span>Continue to Review</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
