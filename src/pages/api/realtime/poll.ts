/**
 * iOS PWA Crash Prevention: HTTP Polling Endpoint
 * 
 * Provides realtime updates via HTTP polling as the final fallback
 * when both WebSockets and SSE are unavailable.
 */

// Note: This would be implemented as a Supabase Edge Function
// but for reference, here's how it would work in a standard API route

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Get timestamp parameter for incremental updates
    const since = parseInt(req.query.since as string) || (Date.now() - 60000); // Last minute by default
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50); // Max 50 events

    // In a real implementation, this would query recent changes from the database
    // For now, return mock events based on timestamp
    const mockEvents = [];
    const currentTime = Date.now();
    
    // Generate some mock events if enough time has passed
    if (currentTime - since > 30000) { // 30+ seconds since last poll
      mockEvents.push({
        id: `event-${currentTime}`,
        type: 'postgres_changes',
        table: 'jobs',
        event: 'INSERT',
        timestamp: currentTime - 15000,
        payload: {
          new: {
            id: `job-${currentTime}`,
            title: 'New Beauty Position Available',
            status: 'active',
            created_at: new Date(currentTime - 15000).toISOString()
          }
        }
      });

      // Occasionally add salon events
      if (Math.random() > 0.7) {
        mockEvents.push({
          id: `salon-${currentTime}`,
          type: 'postgres_changes',
          table: 'salon_sales',
          event: 'INSERT',
          timestamp: currentTime - 10000,
          payload: {
            new: {
              id: `salon-${currentTime}`,
              name: 'Premium Beauty Salon',
              status: 'active',
              created_at: new Date(currentTime - 10000).toISOString()
            }
          }
        });
      }
    }

    // Filter events newer than 'since' timestamp
    const filteredEvents = mockEvents
      .filter(event => event.timestamp > since)
      .slice(0, limit)
      .sort((a, b) => a.timestamp - b.timestamp);

    // Response with cache control headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.status(200).json({
      events: filteredEvents,
      timestamp: currentTime,
      hasMore: false, // In real implementation, check if there are more events
      nextPoll: currentTime + 3000 // Suggest next poll time
    });

  } catch (error) {
    console.error('Polling endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      events: [],
      timestamp: Date.now()
    });
  }
}