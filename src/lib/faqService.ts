import api from "./api";

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FaqResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: FaqItem[];
}

export const fallbackFaqs: FaqItem[] = [
  {
    question: "How much can I borrow?",
    answer:
      "We offer funding from £10,000 up to £2,000,000 depending on your average monthly revenue and overall financial health. Typically, you can qualify for up to 1-2x your average monthly sales.",
  },
  {
    question: "What are the repayment terms?",
    answer:
      "Repayments are flexible and tied to your daily sales. We agree on a fixed percentage (typically between 5% and 15%) of your revenue. There are no fixed monthly payments, interest rates, or late fees.",
  },
  {
    question: "Do I need a personal guarantee?",
    answer:
      "No, we do not require personal guarantees or collateral for our standard revenue-based funding. Our model is built on your business's performance, not your personal assets.",
  },
  {
    question: "How quickly can I receive funds?",
    answer:
      "Once you submit your application and supporting business documents, our underwriting team reviews your file within 24–48 hours, and payouts are transferred straight to your bank account upon approval.",
  },
];

export const faqService = {
  /**
   * Fetch public FAQs
   * GET /faqs/public
   */
  async getPublicFaqs(): Promise<FaqItem[]> {
    try {
      const response = await api.get<FaqResponse>("/faqs/public");
      if (
        response &&
        (response.success || response.statusCode === 200) &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        return response.data;
      }
      return fallbackFaqs;
    } catch (error) {
      console.warn("Using fallback FAQs due to API response:", error);
      return fallbackFaqs;
    }
  },
};

export default faqService;
