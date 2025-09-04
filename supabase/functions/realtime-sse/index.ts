/**
 * Supabase Edge Function: Server-Sent Events for Realtime Fallback
 * 
 * Provides realtime updates via SSE when WebSockets are unavailable in iOS PWAs
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Set up Server-Sent Events response
  const stream = new ReadableStream({
    start(controller) {
      console.log('🔌 [SSE] Client connected');

      // Send initial connection message
      const send = (data: any) => {
        try {
          const message = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(new TextEncoder().encode(message));
        } catch (error) {
          console.error('Error sending SSE message:', error);
        }
      };

      // Initial connection confirmation
      send({
        type: 'connected',
        timestamp: Date.now(),
        message: 'SSE connection established'
      });

      // Set up Supabase realtime subscriptions
      const jobsChannel = supabase
        .channel('sse-jobs-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'jobs'
          },
          (payload) => {
            console.log('📝 [SSE] Jobs update:', payload);
            send({
              type: 'postgres_changes',
              table: 'jobs',
              event: payload.eventType,
              timestamp: Date.now(),
              payload: payload
            });
          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'salon_sales'
          },
          (payload) => {
            console.log('🏪 [SSE] Salon update:', payload);
            send({
              type: 'postgres_changes',
              table: 'salon_sales',
              event: payload.eventType,
              timestamp: Date.now(),
              payload: payload
            });
          }
        )
        .subscribe();

      // Heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        send({
          type: 'heartbeat',
          timestamp: Date.now(),
          message: 'Connection alive'
        });
      }, 30000); // Every 30 seconds

      // Cleanup on disconnect
      let isConnected = true;
      const cleanup = () => {
        if (!isConnected) return;
        isConnected = false;
        
        console.log('🔌 [SSE] Client disconnected, cleaning up');
        clearInterval(heartbeat);
        
        try {
          supabase.removeChannel(jobsChannel);
        } catch (error) {
          console.error('Error removing Supabase channel:', error);
        }
        
        try {
          controller.close();
        } catch (error) {
          console.error('Error closing SSE controller:', error);
        }
      };

      // Handle client disconnect
      req.signal.addEventListener('abort', cleanup);
      
      // Set cleanup timeout (max 5 minutes connection)
      setTimeout(cleanup, 300000);
    }
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
});
