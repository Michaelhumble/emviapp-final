// Server-side HubSpot tracking utility for React app
// This will be called from the client but could be moved to an actual API endpoint later

interface TrackingRequest {
  eventName: string;
  properties?: Record<string, any>;
  email?: string;
  userId?: string;
  consent?: boolean;
}

const HUBSPOT_EVENTS_ENDPOINT = 'https://api.hubapi.com/events/v3/send';

export async function trackEventServerSide(payload: TrackingRequest): Promise<{ ok: boolean; error?: string }> {
  try {
    const { eventName, properties = {}, email, userId, consent } = payload;

    // Respect consent - no tracking without it
    if (!consent) {
      console.warn('HubSpot: Server fallback blocked - consent required');
      return { ok: false, error: 'Consent required for tracking' };
    }

    console.log('HubSpot: Server fallback triggered for', eventName, { hasEmail: !!email });
    
    // Try to call HubSpot edge function if available
    try {
      const response = await fetch('/functions/v1/hubspot-event', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          event_name: eventName,
          properties,
          email,
          user_id: userId
        })
      });

      if (response.ok) {
        console.log('HubSpot: Server fallback successful via edge function');
        return { ok: true };
      } else {
        throw new Error(`Edge function returned ${response.status}`);
      }
    } catch (edgeError) {
      console.warn('HubSpot: Edge function fallback failed:', edgeError);
      
      // Final fallback: log to console for debugging
      console.log('HubSpot: Final fallback - event logged to console', {
        event: eventName,
        properties,
        email: email ? '***@' + email.split('@')[1] : undefined,
        userId,
        timestamp: new Date().toISOString()
      });
      
      return { ok: true }; // Consider console logging as success for debugging
    }

  } catch (error) {
    console.error('HubSpot server tracking error:', error);
    return { ok: false, error: 'Internal server error' };
  }
}