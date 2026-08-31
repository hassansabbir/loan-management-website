import api from "./api";

export interface OverviewCardsData {
  approvedLoan: number;
  outstandingBalance: number;
  totalRepaid: number;
  repaymentRate: number;
}

export interface RepaymentProgressData {
  percentCleared: number;
  amountPaid: number;
  amountTotal: number;
}

export interface ChartDataPoint {
  date: string;
  sales: number;
  repayments: number;
}

export interface RecentTransactionItem {
  transactionId: string;
  createdAt: string;
  grossSales: number;
  repayment: number;
  netPayout: number;
  status: "Completed" | "Pending" | string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface FundingOverviewData {
  hasActiveLoan: boolean;
  percentCleared: number;
  amountPaid: number;
  amountTotal: number;
  initiatedDate: string;
  weeklyAvg: number;
  totalSalesLinked: number;
  facilityId: string;
  remainingBalance: number;
  repaymentThisWeek: number;
  repaymentRate: number;
  loanAmount: number;
  disbursedDate: string;
  destinationBank: string;
  lastRepayment: any;
}

export interface FundingHistoryItem {
  id?: string;
  _id?: string;
  date?: string;
  createdAt?: string;
  saleAmount?: number;
  grossSales?: number;
  sales?: number | string;
  repayment?: number | string;
  status?: string;
}

export interface FundingHistoryMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TransactionCardsData {
  totalProcessedSales: number;
  totalRepaidToDate: number;
  dailyRepaymentAvg: number;
  pendingSettlements: number;
}

export interface ClientTransactionItem {
  id?: string;
  _id?: string;
  transactionId?: string;
  createdAt?: string;
  date?: string;
  grossSales?: number;
  repayment?: number;
  netPayout?: number;
  status?: string;
  category?: string;
  reference?: string;
}

export interface ClientTransactionMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface PayoutCardsData {
  nextScheduledPayout: string;
  bankName: string;
  accountHolderName: string;
  bankLast4: string;
  totalPaidOut: number;
  availableBalance: number;
  pendingAmount: number;
}

export interface ClientPayoutItem {
  id?: string;
  _id?: string;
  transactionId?: string;
  amount?: number;
  payoutAmount?: number;
  amountValue?: number;
  date?: string;
  createdAt?: string;
  status?: string;
  destinationBank?: string;
  bankName?: string;
  accountNumber?: string;
  bankLast4?: string;
  reference?: string;
}

export interface ClientPayoutMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BorrowerClientInfoData {
  businessDetails: {
    legalName?: string;
    crn?: string;
    storeUrl?: string;
    industrySector?: string;
    yearsInBusiness?: number | string;
    registeredAddress?: string;
  };
  primaryContact: {
    fullName?: string;
    businessEmail?: string;
    phoneNumber?: string;
  };
}

export interface BorrowerIntegrationData {
  _id?: string;
  userId?: string;
  apiKey: string;
  apiKeyPreview?: string;
  webhookSecret: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  webhookStatus?: string;
  webhookUrl?: string;
}

export const dashboardService = {
  /**
   * GET /dashboard/client/overview-cards
   */
  async getOverviewCards(): Promise<ApiResponse<OverviewCardsData>> {
    return await api.get<ApiResponse<OverviewCardsData>>(
      "/dashboard/client/overview-cards"
    );
  },

  /**
   * GET /dashboard/client/repayment-progress
   */
  async getRepaymentProgress(): Promise<ApiResponse<RepaymentProgressData>> {
    return await api.get<ApiResponse<RepaymentProgressData>>(
      "/dashboard/client/repayment-progress"
    );
  },

  /**
   * GET /dashboard/client/chart
   */
  async getChartData(): Promise<ApiResponse<ChartDataPoint[]>> {
    return await api.get<ApiResponse<ChartDataPoint[]>>(
      "/dashboard/client/chart"
    );
  },

  /**
   * GET /dashboard/client/recent-transactions
   */
  async getRecentTransactions(): Promise<ApiResponse<RecentTransactionItem[]>> {
    return await api.get<ApiResponse<RecentTransactionItem[]>>(
      "/dashboard/client/recent-transactions"
    );
  },

  /**
   * GET /loans/client/funding
   */
  async getFundingOverview(): Promise<ApiResponse<FundingOverviewData>> {
    return await api.get<ApiResponse<FundingOverviewData>>(
      "/loans/client/funding"
    );
  },

  /**
   * GET /loans/client/funding/history
   */
  async getFundingHistory(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
  }): Promise<{
    success: boolean;
    message: string;
    statusCode: number;
    data: FundingHistoryItem[];
    meta?: FundingHistoryMeta;
  }> {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    const qs = query.toString();
    return await api.get(
      `/loans/client/funding/history${qs ? `?${qs}` : ""}`
    );
  },

  /**
   * GET /transactions/client/transactions-cards
   */
  async getTransactionCards(): Promise<ApiResponse<TransactionCardsData>> {
    return await api.get<ApiResponse<TransactionCardsData>>(
      "/transactions/client/transactions-cards"
    );
  },

  /**
   * GET /transactions/client/transactions
   */
  async getClientTransactions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    searchTerm?: string;
  }): Promise<{
    success: boolean;
    message: string;
    statusCode: number;
    data: ClientTransactionItem[];
    meta?: ClientTransactionMeta;
  }> {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.status && params.status !== "All")
      query.append("status", params.status);
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    const qs = query.toString();
    return await api.get(
      `/transactions/client/transactions${qs ? `?${qs}` : ""}`
    );
  },

  /**
   * GET /client-payouts/cards
   */
  async getPayoutCards(): Promise<ApiResponse<PayoutCardsData>> {
    return await api.get<ApiResponse<PayoutCardsData>>("/client-payouts/cards");
  },

  /**
   * GET /client-payouts/history
   */
  async getPayoutHistory(params?: {
    page?: number;
    limit?: number;
  }): Promise<{
    success: boolean;
    message: string;
    statusCode: number;
    data: ClientPayoutItem[];
    meta?: ClientPayoutMeta;
  }> {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    const qs = query.toString();
    return await api.get(`/client-payouts/history${qs ? `?${qs}` : ""}`);
  },

  /**
   * GET /borrowers/client-info
   */
  async getBorrowerClientInfo(): Promise<ApiResponse<BorrowerClientInfoData>> {
    return await api.get<ApiResponse<BorrowerClientInfoData>>(
      "/borrowers/client-info"
    );
  },

  /**
   * PUT /borrowers/update/client-info
   */
  async updateBorrowerClientInfo(
    data: BorrowerClientInfoData
  ): Promise<ApiResponse<BorrowerClientInfoData>> {
    return await api.put<ApiResponse<BorrowerClientInfoData>>(
      "/borrowers/update/client-info",
      data
    );
  },

  /**
   * GET /borrowers/integration
   */
  async getBorrowerIntegration(): Promise<ApiResponse<BorrowerIntegrationData>> {
    return await api.get<ApiResponse<BorrowerIntegrationData>>(
      "/borrowers/integration"
    );
  },

  /**
   * POST /borrowers/integration/generate
   */
  async regenerateApiKey(): Promise<ApiResponse<BorrowerIntegrationData>> {
    return await api.post<ApiResponse<BorrowerIntegrationData>>(
      "/borrowers/integration/generate"
    );
  },

  /**
   * PUT /borrowers/integration/update
   */
  async updateWebhookUrl(payload: {
    webhookUrl: string;
  }): Promise<ApiResponse<BorrowerIntegrationData>> {
    return await api.put<ApiResponse<BorrowerIntegrationData>>(
      "/borrowers/integration/update",
      payload
    );
  },
};

export default dashboardService;
