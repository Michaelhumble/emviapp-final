/**
 * HubSpot Custom Event Helpers
 * 
 * Provides easy-to-use functions for tracking behavioral events in HubSpot.
 * Works both client-side (via _hsq) and server-side (via edge function).
 */

import { hubspotTrackEvent } from './hubspot';
import { supabase } from '@/integrations/supabase/client';

interface EventProperties {
  [key: string]: any;
}

/**
 * Track a custom event in HubSpot
 * Tries client-side first, falls back to server-side endpoint
 */
export async function trackHubSpotEvent(
  eventName: string, 
  properties: EventProperties = {},
  email?: string,
  userId?: string
): Promise<boolean> {
  try {
    // Try client-side tracking first (faster)
    const clientSuccess = hubspotTrackEvent(eventName, properties);
    
    if (clientSuccess) {
      console.log('HubSpot: Client-side event tracked', eventName);
      return true;
    }

    // Fallback to server-side tracking
    const { data, error } = await supabase.functions.invoke('hubspot-event', {
      body: {
        eventName,
        email,
        userId, 
        properties
      }
    });

    if (error) {
      console.warn('HubSpot: Server-side event failed', error);
      return false;
    }

    console.log('HubSpot: Server-side event tracked', eventName);
    return true;

  } catch (error) {
    console.error('HubSpot: Event tracking failed', error);
    return false;
  }
}

// Pre-defined event helpers for common actions
export const HubSpotEvents = {
  // User engagement
  profileViewed: (profileId: string, profileType: 'artist' | 'salon') =>
    trackHubSpotEvent('profile_viewed', { profile_id: profileId, profile_type: profileType }),

  jobViewed: (jobId: string, jobTitle: string, location: string) =>
    trackHubSpotEvent('job_viewed', { job_id: jobId, job_title: jobTitle, location }),

  searchPerformed: (query: string, filters: Record<string, any>, resultCount: number) =>
    trackHubSpotEvent('search_performed', { query, filters, result_count: resultCount }),

  // Conversion events
  jobApplicationStarted: (jobId: string) =>
    trackHubSpotEvent('job_application_started', { job_id: jobId }),

  jobApplicationCompleted: (jobId: string, method: string) =>
    trackHubSpotEvent('job_application_completed', { job_id: jobId, application_method: method }),

  contactFormSubmitted: (formType: string, page: string) =>
    trackHubSpotEvent('contact_form_submitted', { form_type: formType, page }),

  // Subscription events
  subscriptionUpgraded: (plan: string, previousPlan: string) =>
    trackHubSpotEvent('subscription_upgraded', { plan, previous_plan: previousPlan }),

  subscriptionCancelled: (plan: string, reason?: string) =>
    trackHubSpotEvent('subscription_cancelled', { plan, cancellation_reason: reason }),

  // Social actions
  profileShared: (platform: string, profileType: 'artist' | 'salon') =>
    trackHubSpotEvent('profile_shared', { platform, profile_type: profileType }),

  jobShared: (jobId: string, platform: string) =>
    trackHubSpotEvent('job_shared', { job_id: jobId, platform }),

  // Booking events (if applicable)
  bookingRequested: (artistId: string, serviceType: string, requestedDate: string) =>
    trackHubSpotEvent('booking_requested', { 
      artist_id: artistId, 
      service_type: serviceType, 
      requested_date: requestedDate 
    }),

  bookingConfirmed: (bookingId: string, serviceType: string, totalAmount?: number) =>
    trackHubSpotEvent('booking_confirmed', { 
      booking_id: bookingId, 
      service_type: serviceType, 
      total_amount: totalAmount 
    }),

  // Content engagement
  blogPostViewed: (postSlug: string, category: string, readingTime?: number) =>
    trackHubSpotEvent('blog_post_viewed', { 
      post_slug: postSlug, 
      category, 
      reading_time: readingTime 
    }),

  downloadCompleted: (resourceType: string, resourceName: string) =>
    trackHubSpotEvent('download_completed', { resource_type: resourceType, resource_name: resourceName }),

  // Error tracking
  errorEncountered: (errorType: string, errorMessage: string, page: string) =>
    trackHubSpotEvent('error_encountered', { 
      error_type: errorType, 
      error_message: errorMessage, 
      page 
    })
};

// Export for easy access
export default HubSpotEvents;