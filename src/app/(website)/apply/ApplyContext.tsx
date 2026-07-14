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
  yearsInBusiness: string;
  address: string;

  // Step 2: Financials
  monthlyRevenue: string;
  requestedAmount: string;
  fundingPurpose: string;
  outstandingDebt: string;
  annualTurnover: string;
  salesChannel: string;
  salesVolume: string;

  // Step 3: Banking
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  iban: string;

  // Step 4: Documents
  docRegistration: string;
  docPhotoId: string;
  docBankStatements: string;
  docTaxReturn: string;
}

export const initialData: ApplicationData = {
  businessName: "",
  crn: "",
  website: "",
  industry: "Software / SaaS",
  yearsInBusiness: "Less than 1 year",
  address: "",
  monthlyRevenue: "",
  requestedAmount: "50000",
  fundingPurpose: "Marketing",
  outstandingDebt: "",
  annualTurnover: "",
  salesChannel: "Stripe",
  salesVolume: "",
  bankName: "",
  accountName: "",
  sortCode: "",
  accountNumber: "",
  iban: "",
  docRegistration: "",
  docPhotoId: "",
  docBankStatements: "",
  docTaxReturn: "",
};

interface ApplyContextType {
  data: ApplicationData;
  updateData: (fields: Partial<ApplicationData>) => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isSaving: boolean;
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
  
  // Use our custom hook for persisting state across pages
  const [storedData, setStoredData] = useLocalStorage<ApplicationData>("funding_application", initialData);
  const [isSaving, setIsSaving] = useState(false);

  // Merge storedData with initialData to guard against schema changes (e.g. newly added fields like iban)
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

  // Automatically reset isSaving after a short delay to simulate network sync
  useEffect(() => {
    if (isSaving) {
      const timer = setTimeout(() => {
        setIsSaving(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isSaving]);

  return (
    <ApplyContext.Provider value={{ data, updateData, currentStep, goToNextStep, goToPrevStep, isSaving }}>
      {children}
    </ApplyContext.Provider>
  );
}
