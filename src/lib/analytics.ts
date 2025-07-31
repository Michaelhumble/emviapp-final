// Unified Analytics System - GA4 as Single Source of Truth
// Replaces AnalyticsContext.tsx and analyticsHelpers.ts

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface EcommerceItem {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  quantity?: number;
}

interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  items?: EcommerceItem[];
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class Analytics {
  private static instance: Analytics;
  private userId: string | null = null;
  private sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeGA4();
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeGA4(): void {
    // Ensure gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Configure enhanced measurement
      window.gtag('config', 'G-RRFWGM0MPH', {
        send_page_view: true,
        page_title: document.title,
        page_location: window.location.href,
        enhanced_measurement: {
          scrolls: true,
          outbound_clicks: true,
          file_downloads: true,
          page_views: true
        }
      });
    }
  }

  public setUserId(userId: string | null): void {
    this.userId = userId;
    if (typeof window !== 'undefined' && window.gtag && userId) {
      window.gtag('config', 'G-RRFWGM0MPH', {
        user_id: userId,
        custom_map: {
          custom_user_id: userId
        }
      });
    }
  }

  // Core Event Tracking
  public trackEvent(event: GAEvent): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        user_id: this.userId,
        session_id: this.sessionId,
        ...event.custom_parameters
      });
    }
  }

  // Page View Tracking with Enhanced Data
  public trackPageView(page: string, title?: string, metadata?: Record<string, any>): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-RRFWGM0MPH', {
        page_title: title || document.title,
        page_location: window.location.href,
        custom_map: {
          user_role: metadata?.userRole,
          page_type: metadata?.pageType,
          content_category: metadata?.category
        }
      });

      // Track as custom event for detailed analytics
      this.trackEvent({
        action: 'page_view',
        category: 'navigation',
        label: page,
        custom_parameters: {
          page_type: metadata?.pageType,
          user_role: metadata?.userRole,
          referrer: document.referrer,
          ...metadata
        }
      });
    }
  }

  // User Signup Conversion
  public trackSignup(method: string, userRole?: string): void {
    // GA4 Conversion Event
    this.trackConversion({
      event_name: 'sign_up',
      value: 0,
      currency: 'USD'
    });

    // Detailed signup event
    this.trackEvent({
      action: 'sign_up',
      category: 'user_engagement',
      label: method,
      custom_parameters: {
        method,
        user_role: userRole,
        signup_timestamp: Date.now()
      }
    });
  }

  // Booking Creation Conversion
  public trackBookingCreated(bookingData: {
    bookingId: string;
    serviceType: string;
    servicePrice: number;
    artistId?: string;
    salonId?: string;
  }): void {
    // GA4 eCommerce Purchase Event
    this.trackConversion({
      event_name: 'purchase',
      value: bookingData.servicePrice,
      currency: 'USD',
      items: [{
        item_id: bookingData.bookingId,
        item_name: `${bookingData.serviceType} Service`,
        category: 'booking',
        price: bookingData.servicePrice,
        quantity: 1
      }]
    });

    // Detailed booking event
    this.trackEvent({
      action: 'booking_created',
      category: 'ecommerce',
      label: bookingData.serviceType,
      value: bookingData.servicePrice,
      custom_parameters: {
        booking_id: bookingData.bookingId,
        service_type: bookingData.serviceType,
        artist_id: bookingData.artistId,
        salon_id: bookingData.salonId,
        booking_value: bookingData.servicePrice
      }
    });
  }

  // Payment Completion
  public trackPaymentCompleted(paymentData: {
    transactionId: string;
    amount: number;
    paymentMethod: string;
    itemType: 'job_post' | 'booking' | 'subscription';
    itemId?: string;
  }): void {
    // GA4 eCommerce Purchase Event
    this.trackConversion({
      event_name: 'purchase',
      value: paymentData.amount,
      currency: 'USD',
      items: [{
        item_id: paymentData.transactionId,
        item_name: `${paymentData.itemType} Payment`,
        category: 'payment',
        price: paymentData.amount,
        quantity: 1
      }]
    });

    // Detailed payment event
    this.trackEvent({
      action: 'payment_completed',
      category: 'ecommerce',
      label: paymentData.itemType,
      value: paymentData.amount,
      custom_parameters: {
        transaction_id: paymentData.transactionId,
        payment_method: paymentData.paymentMethod,
        item_type: paymentData.itemType,
        item_id: paymentData.itemId
      }
    });
  }

  // Contact Form Submission
  public trackContactSubmission(formType: string, source?: string): void {
    // GA4 Conversion Event
    this.trackConversion({
      event_name: 'generate_lead',
      value: 0,
      currency: 'USD'
    });

    // Detailed contact event
    this.trackEvent({
      action: 'form_submit',
      category: 'lead_generation',
      label: formType,
      custom_parameters: {
        form_type: formType,
        source: source || 'unknown',
        timestamp: Date.now()
      }
    });
  }

  // Job Application Tracking
  public trackJobApplication(jobData: {
    jobId: string;
    jobType: string;
    location?: string;
    salaryRange?: string;
  }): void {
    // GA4 Conversion Event for job applications
    this.trackConversion({
      event_name: 'generate_lead',
      value: 0,
      currency: 'USD'
    });

    this.trackEvent({
      action: 'job_application',
      category: 'user_engagement',
      label: jobData.jobType,
      custom_parameters: {
        job_id: jobData.jobId,
        job_type: jobData.jobType,
        location: jobData.location,
        salary_range: jobData.salaryRange
      }
    });
  }

  // Search Tracking
  public trackSearch(query: string, category?: string, results?: number): void {
    this.trackEvent({
      action: 'search',
      category: 'site_search',
      label: query,
      value: results,
      custom_parameters: {
        search_term: query,
        search_category: category,
        results_count: results
      }
    });
  }

  // Content Engagement
  public trackContentView(contentData: {
    contentId: string;
    contentType: 'job' | 'salon' | 'artist' | 'blog' | 'profile';
    contentTitle?: string;
    category?: string;
  }): void {
    this.trackEvent({
      action: 'view_item',
      category: 'content_engagement',
      label: contentData.contentType,
      custom_parameters: {
        content_id: contentData.contentId,
        content_type: contentData.contentType,
        content_title: contentData.contentTitle,
        content_category: contentData.category
      }
    });
  }

  // Social Share Tracking
  public trackShare(platform: string, contentType: string, contentId?: string): void {
    this.trackEvent({
      action: 'share',
      category: 'social_engagement',
      label: platform,
      custom_parameters: {
        platform,
        content_type: contentType,
        content_id: contentId
      }
    });
  }

  // Private method for GA4 conversion events
  private trackConversion(conversionData: ConversionEvent): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', conversionData.event_name, {
        value: conversionData.value,
        currency: conversionData.currency,
        items: conversionData.items,
        user_id: this.userId,
        session_id: this.sessionId
      });
    }
  }

  // Enhanced eCommerce - Add to Cart (for multi-step booking)
  public trackAddToCart(item: EcommerceItem): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: item.price,
        items: [item]
      });
    }
  }

  // Enhanced eCommerce - Begin Checkout
  public trackBeginCheckout(items: EcommerceItem[], value: number): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value,
        items
      });
    }
  }

  // Performance Tracking
  public trackPerformance(metric: string, value: number, context?: Record<string, any>): void {
    this.trackEvent({
      action: 'performance_metric',
      category: 'technical',
      label: metric,
      value,
      custom_parameters: {
        metric_name: metric,
        metric_value: value,
        url: window.location.pathname,
        ...context
      }
    });
  }

  // Error Tracking
  public trackError(errorType: string, errorMessage: string, context?: Record<string, any>): void {
    this.trackEvent({
      action: 'error',
      category: 'technical',
      label: errorType,
      custom_parameters: {
        error_message: errorMessage,
        error_type: errorType,
        url: window.location.pathname,
        user_agent: navigator.userAgent,
        timestamp: Date.now(),
        ...context
      }
    });
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// React Hook for easy integration
import { useEffect } from 'react';
import { useAuth } from '@/context/auth';

export const useAnalytics = () => {
  const { user } = useAuth();

  useEffect(() => {
    analytics.setUserId(user?.id || null);
  }, [user?.id]);

  return analytics;
};

// Legacy compatibility exports (for gradual migration)
export const trackEvent = (event: GAEvent) => analytics.trackEvent(event);
export const trackPageView = (page: string, metadata?: Record<string, any>) => 
  analytics.trackPageView(page, undefined, metadata);
export const trackJobApplication = (jobId: string, metadata?: Record<string, any>) => 
  analytics.trackJobApplication({ jobId, jobType: metadata?.jobType || 'unknown', ...metadata });
export const trackJobView = (jobId: string, metadata?: Record<string, any>) => 
  analytics.trackContentView({ contentId: jobId, contentType: 'job', ...metadata });
export const trackSalonView = (salonId: string, metadata?: Record<string, any>) => 
  analytics.trackContentView({ contentId: salonId, contentType: 'salon', ...metadata });
export const trackArtistView = (artistId: string, metadata?: Record<string, any>) => 
  analytics.trackContentView({ contentId: artistId, contentType: 'artist', ...metadata });
export const trackSearch = (query: string, category?: string, results?: number) => 
  analytics.trackSearch(query, category, results);