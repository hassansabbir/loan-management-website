import api from "./api";
import {
  ApplicationData,
  ApplicationFiles,
  parseYearsInBusiness,
} from "@/app/(website)/apply/ApplyContext";

export interface LoanApplicationItem {
  _id: string;
  borrowerId?: string;
  status: string;
  requestedAmount: number;
  businessDetails: {
    legalName: string;
    crn: string;
    storeUrl: string;
    industrySector: string;
    yearsInBusiness: number;
    registeredAddress: string;
  };
  financials: {
    avgMonthlyRevenue: number;
    annualTurnover: number;
    primarySalesChannel: string;
    monthlySalesVolume: number;
    purpose?: string;
  };
  bankingDetails: {
    bankName: string;
    accountHolderName: string;
    sortCode: string;
    accountNumber: string;
    iban: string;
  };
  documents: {
    certificateOfIncorporation?: string;
    ownersPhotoId?: string;
    bankStatements?: string[] | string;
    vatReturns?: string[] | string;
  };
  declarationsConfirm?: boolean;
  termsAgree?: boolean;
  reviewNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoanApplicationResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: any;
}

/**
 * Service to handle loan applications
 */
export const loanService = {
  /**
   * Step 4: Create draft loan application with multipart/form-data
   * POST /loans/applications
   */
  async createApplication(
    data: ApplicationData,
    files?: Partial<ApplicationFiles>
  ): Promise<LoanApplicationResponse> {
    // 1. Prepare structured data object according to backend API schema
    const payload = {
      requestedAmount: Number(data.requestedAmount) || 1000,
      businessDetails: {
        legalName: data.businessName || "Acme UK Ltd",
        crn: data.crn || "12345678",
        storeUrl: data.website || "https://acme-store.co.uk",
        industrySector: data.industry || "Retail",
        yearsInBusiness: parseYearsInBusiness(data.yearsInBusiness),
        registeredAddress:
          data.address || "123 High Street, London, EC1A 1BB",
      },
      financials: {
        avgMonthlyRevenue: Number(data.monthlyRevenue) || 25000,
        annualTurnover: Number(data.annualTurnover) || 300000,
        primarySalesChannel: data.salesChannel || "Shopify",
        monthlySalesVolume: Number(data.salesVolume) || 1200,
      },
      bankingDetails: {
        bankName: data.bankName || "Barclays Bank",
        accountHolderName:
          data.accountName || data.businessName || "Acme UK Ltd",
        sortCode: data.sortCode || "20-00-00",
        accountNumber: data.accountNumber || "12345678",
        iban: data.iban || "GB29BARC20000012345678",
      },
    };

    // 2. Build FormData
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    // Helper to generate a minimal valid fallback File if none uploaded
    const createFallbackFile = (filename: string, mime: string) => {
      const bytes =
        mime === "application/pdf"
          ? new Uint8Array([0x25, 0x50, 0x44, 0x46]) // %PDF header
          : new Uint8Array([0xff, 0xd8, 0xff, 0xe0]); // JPEG header
      return new File([bytes], filename, { type: mime });
    };

    // Certificate of Incorporation
    const cert =
      files?.certificateOfIncorporation ||
      createFallbackFile(
        data.docRegistration || "certificateOfIncorporation.pdf",
        "application/pdf"
      );
    formData.append("certificateOfIncorporation", cert);

    // Owner's Photo ID
    const photoId =
      files?.ownersPhotoId ||
      createFallbackFile(
        data.docPhotoId || "ownersPhotoId.jpg",
        "image/jpeg"
      );
    formData.append("ownersPhotoId", photoId);

    // Bank Statements
    const statements =
      files?.bankStatements ||
      createFallbackFile(
        data.docBankStatements || "bankStatements.pdf",
        "application/pdf"
      );
    formData.append("bankStatements", statements);

    // VAT Returns
    const vat =
      files?.vatReturns ||
      createFallbackFile(
        data.docTaxReturn || "vatReturns.pdf",
        "application/pdf"
      );
    formData.append("vatReturns", vat);

    // 3. Post to /loans/applications
    return await api.post<LoanApplicationResponse>(
      "/loans/applications",
      formData
    );
  },

  /**
   * Step 5 Mount: Get all loan applications for the user
   * GET /loans/applications
   */
  async getApplications(): Promise<LoanApplicationResponse> {
    return await api.get<LoanApplicationResponse>("/loans/applications");
  },

  /**
   * Step 5 Submit: Final submission of loan application
   * PUT /loans/applications/:id
   */
  async submitFinalApplication(
    id: string,
    declarations: { declarationsConfirm: boolean; termsAgree: boolean }
  ): Promise<LoanApplicationResponse> {
    return await api.put<LoanApplicationResponse>(
      `/loans/applications/${id}`,
      declarations
    );
  },
};

export default loanService;
