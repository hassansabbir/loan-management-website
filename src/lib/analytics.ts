'use client';

/**
 * Analytics service for tracking user interactions
 * This is a placeholder implementation that can be connected to services like
 * Google Analytics, Mixpanel, Segment, etc.
 */

// Types
export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
}

export interface EventData {
  [key: string]: any;
}

// Initialize analytics (call this in your app layout)
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Check if analytics is already initialized
  if ((window as any).__ANALYTICS_INITIALIZED__) return;
  (window as any).__ANALYTICS_INITIALIZED__ = true;

  // Add initialization code for your analytics service here
  console.log('Analytics initialized');

  // Track initial page view
  trackPageView({
    path: window.location.pathname,
    title: document.title,
  });
}

/**
 * Track a page view
 * @param data - Page view data
 */
export function trackPageView(data: PageViewEvent): void {
  if (typeof window === 'undefined') return;

  // Implementation for your analytics service
  console.log('Page view:', data);

  // Example Google Analytics implementation:
  // if (window.gtag) {
  //   window.gtag('config', 'GA-MEASUREMENT-ID', {
  //     page_path: data.path,
  //     page_title: data.title,
  //   });
  // }
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param data - Event data
 */
export function trackEvent(eventName: string, data: EventData = {}): void {
  if (typeof window === 'undefined') return;

  // Implementation for your analytics service
  console.log('Event:', eventName, data);

  // Example Google Analytics implementation:
  // if (window.gtag) {
  //   window.gtag('event', eventName, data);
  // }
}

/**
 * Set user properties
 * @param userId - User ID
 * @param properties - User properties
 */
export function setUserProperties(userId: string, properties: EventData = {}): void {
  if (typeof window === 'undefined') return;

  // Implementation for your analytics service
  console.log('User properties:', userId, properties);

  // Example Google Analytics implementation:
  // if (window.gtag) {
  //   window.gtag('set', 'user_properties', properties);
  //   window.gtag('set', { user_id: userId });
  // }
}

// Export default analytics object with all methods
const analytics = {
  init: initAnalytics,
  trackPageView,
  trackEvent,
  setUserProperties,
};

export default analytics;