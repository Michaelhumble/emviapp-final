/**
 * iOS PWA Crash Prevention: Server-Sent Events (SSE) Endpoint
 * 
 * Provides realtime updates via SSE as a fallback when WebSockets are unavailable.
 * Used by iOS Safari, PWAs, and in-app webviews where WebSockets may be blocked.
 */

// Note: This would be implemented as a Supabase Edge Function
// but for reference, here's how it would work in a standard API route

export default async function handler(req: any, res: any) {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let isActive = true;

  // Cleanup on client disconnect
  req.on('close', () => {
    isActive = false;
  });

  req.on('end', () => {
    isActive = false;
  });

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`);

  // Mock realtime events (in real implementation, this would connect to Supabase realtime)
  const sendEvent = (eventData: any) => {
    if (!isActive) return;
    
    try {
      const data = JSON.stringify({
        ...eventData,
        timestamp: Date.now()
      });
      res.write(`data: ${data}\n\n`);
    } catch (error) {
      console.error('Error sending SSE event:', error);
    }
  };

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    if (!isActive) {
      clearInterval(heartbeat);
      return;
    }
    
    sendEvent({
      type: 'heartbeat',
      message: 'Connection alive'
    });
  }, 30000); // Every 30 seconds

  // Mock job updates (replace with actual Supabase subscription)
  const mockUpdates = setInterval(() => {
    if (!isActive) {
      clearInterval(mockUpdates);
      return;
    }

    // Simulate job events
    const events = [
      { type: 'job_created', table: 'jobs', event: 'INSERT' },
      { type: 'job_updated', table: 'jobs', event: 'UPDATE' },
      { type: 'salon_created', table: 'salon_sales', event: 'INSERT' }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    sendEvent({
      type: 'postgres_changes',
      ...randomEvent,
      payload: {
        new: { id: `mock-${Date.now()}`, status: 'active' }
      }
    });
  }, 45000); // Every 45 seconds

  // Cleanup function
  const cleanup = () => {
    isActive = false;
    clearInterval(heartbeat);
    clearInterval(mockUpdates);
  };

  // Handle various disconnect scenarios
  res.on('close', cleanup);
  res.on('error', cleanup);
  
  // Keep connection open
  // In a real implementation, this would maintain the connection
  // until the client disconnects or an error occurs
}
