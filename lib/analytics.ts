export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "security_audit_start"
  | "security_audit_complete"
  | "lead_form_start"
  | "lead_form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "service_booking_click"
  | "site_visit_request"
  | "proposal_request"
  | "solution_click"
  | "industry_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, payload);
  }
}
