"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks";

export interface ApplicationData {
  // Step 1: Business Information
  businessName: string;
  crn: string;
  website: string;
  industry: string;
  yearsInBusiness: string | number;
  address: string;

  // Step 2: Financials
  requestedAmount: string | number;
  monthlyRevenue: string | number;
  annualTurnover: string | number;
  salesChannel: string;
  salesVolume: string | number;
  fundingPurpose?: string;

  // Step 3: Banking
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  iban: string;

  // Step 4: Documents (filenames)
  docRegistration: string;
  docPhotoId: string;
  docBankStatements: string;
  docTaxReturn: string;
}

export interface ApplicationFiles {
  certificateOfIncorporation: File | null;
  ownersPhotoId: File | null;
  bankStatements: File | null;
  vatReturns: File | null;
}

export const initialData: ApplicationData = {
  businessName: "Acme UK Ltd",
  crn: "12345678",
  website: "https://acme-store.co.uk",
  industry: "Retail",
  yearsInBusiness: "3",
  address: "123 High Street, London, EC1A 1BB",
  requestedAmount: "1000",
  monthlyRevenue: "25000",
  annualTurnover: "300000",
  salesChannel: "Shopify",
  salesVolume: "1200",
  fundingPurpose: "Working Capital",
  bankName: "Barclays Bank",
  accountName: "Acme UK Ltd",
  sortCode: "20-00-00",
  accountNumber: "12345678",
  iban: "GB29BARC20000012345678",
  docRegistration: "certificateOfIncorporation.pdf",
  docPhotoId: "ownersPhotoId.jpg",
  docBankStatements: "bankStatements.pdf",
  docTaxReturn: "vatReturns.pdf",
};

export const initialFiles: ApplicationFiles = {
  certificateOfIncorporation: null,
  ownersPhotoId: null,
  bankStatements: null,
  vatReturns: null,
};

export function parseYearsInBusiness(val: string | number): number {
  if (typeof val === "number") return val;
  const num = parseInt(val, 10);
  if (!isNaN(num)) return num;
  if (val.includes("Less than")) return 1;
  if (val.includes("1-2")) return 2;
  if (val.includes("2-5")) return 3;
  if (val.includes("5+")) return 5;
  return 3;
}

interface ApplyContextType {
  data: ApplicationData;
  files: ApplicationFiles;
  updateData: (fields: Partial<ApplicationData>) => void;
  setFile: (key: keyof ApplicationFiles, file: File | null) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isSaving: boolean;
  submittedAppId: string | null;
  setSubmittedAppId: (id: string | null) => void;
}

const ApplyContext = createContext<ApplyContextType | undefined>(undefined);

export const useApply = () => {
  const context = useContext(ApplyContext);
  if (!context) {
    throw new Error("useApply must be used within an ApplyProvider");
  }
  return context;
};

export function ApplyProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Use custom hook for persisting state across pages
  const [storedData, setStoredData] = useLocalStorage<ApplicationData>(
    "funding_application",
    initialData
  );
  const [files, setFilesState] = useState<ApplicationFiles>(initialFiles);
  const [isSaving, setIsSaving] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Merge storedData with initialData
  const data = React.useMemo(() => {
    return { ...initialData, ...storedData };
  }, [storedData]);

  let currentStep = 1;
  if (pathname.includes("/financials")) currentStep = 2;
  else if (pathname.includes("/banking")) currentStep = 3;
  else if (pathname.includes("/documents")) currentStep = 4;
  else if (pathname.includes("/review")) currentStep = 5;

  const steps = ["business", "financials", "banking", "documents", "review"];

  const goToNextStep = () => {
    if (currentStep < 5) {
      router.push(`/apply/${steps[currentStep]}`);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      router.push(`/apply/${steps[currentStep - 2]}`);
    }
  };

  const updateData = (fields: Partial<ApplicationData>) => {
    setIsSaving(true);
    setStoredData((prev) => {
      const safePrev = prev || initialData;
      return { ...safePrev, ...fields };
    });
  };

  const setFile = (key: keyof ApplicationFiles, file: File | null) => {
    setFilesState((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  useEffect(() => {
    if (isSaving) {
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isSaving]);

  return (
    <ApplyContext.Provider
      value={{
        data,
        files,
        updateData,
        setFile,
        currentStep,
        goToNextStep,
        goToPrevStep,
        isSaving,
        submittedAppId,
        setSubmittedAppId,
      }}
    >
      {children}
    </ApplyContext.Provider>
  );
}
