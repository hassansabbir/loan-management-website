import api from "./api";

export interface SettingResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: string;
}

export const settingsService = {
  /**
   * GET /settings?key=...
   */
  async getSetting(key: string): Promise<string | null> {
    try {
      const res = await api.get<SettingResponse>(`/settings?key=${key}`);
      if (
        res &&
        (res.success || res.statusCode === 200) &&
        typeof res.data === "string" &&
        res.data.trim().length > 0
      ) {
        return res.data.trim();
      }
      return null;
    } catch (err) {
      console.warn(`Could not fetch setting for key "${key}":`, err);
      return null;
    }
  },

  /**
   * Fetch Privacy Policy text
   * GET /settings?key=privacyPolicy
   */
  async getPrivacyPolicy(): Promise<string | null> {
    return await this.getSetting("privacyPolicy");
  },

  /**
   * Fetch Terms & Conditions / Terms of Service text
   * GET /settings?key=termsOfService
   */
  async getTermsOfService(): Promise<string | null> {
    const tos = await this.getSetting("termsOfService");
    if (tos) return tos;
    const tandc = await this.getSetting("termsAndConditions");
    if (tandc) return tandc;
    return await this.getSetting("terms");
  },
};

export default settingsService;
