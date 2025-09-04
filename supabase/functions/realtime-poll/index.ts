/**
 * Supabase Edge Function: HTTP Polling for Realtime Fallback
 * 
 * Provides realtime updates via polling when WebSockets and SSE are unavailable
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(req.url);
    const since = parseInt(url.searchParams.get('since') || '0') || (Date.now() - 60000);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 50);

    console.log(`📊 [POLL] Request: since=${since}, limit=${limit}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const events: any[] = [];
    const sinceDate = new Date(since);

    // Query recent job updates
    try {
      const { data: recentJobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title, status, created_at, updated_at')
        .or(`created_at.gt.${sinceDate.toISOString()},updated_at.gt.${sinceDate.toISOString()}`)
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (jobsError) {
        console.warn('Error querying jobs:', jobsError);
      } else if (recentJobs) {
        for (const job of recentJobs) {
          const timestamp = new Date(job.updated_at || job.created_at).getTime();
          if (timestamp > since) {
            events.push({
              id: `job-${job.id}-${timestamp}`,
              type: 'postgres_changes',
              table: 'jobs',
              event: timestamp === new Date(job.created_at).getTime() ? 'INSERT' : 'UPDATE',
              timestamp,
              payload: {
                new: job
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    // Query recent salon updates
    try {
      const { data: recentSalons, error: salonsError } = await supabase
        .from('salon_sales')
        .select('id, name, status, created_at, updated_at')
        .or(`created_at.gt.${sinceDate.toISOString()},updated_at.gt.${sinceDate.toISOString()}`)
        .order('updated_at', { ascending: false })
        .limit(Math.max(1, limit - events.length));

      if (salonsError) {
        console.warn('Error querying salons:', salonsError);
      } else if (recentSalons) {
        for (const salon of recentSalons) {
          const timestamp = new Date(salon.updated_at || salon.created_at).getTime();
          if (timestamp > since) {
            events.push({
              id: `salon-${salon.id}-${timestamp}`,
              type: 'postgres_changes',
              table: 'salon_sales',
              event: timestamp === new Date(salon.created_at).getTime() ? 'INSERT' : 'UPDATE',
              timestamp,
              payload: {
                new: salon
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching salons:', error);
    }

    // Sort events by timestamp
    events.sort((a, b) => a.timestamp - b.timestamp);

    const currentTime = Date.now();
    const response = {
      events: events.slice(0, limit),
      timestamp: currentTime,
      hasMore: events.length > limit,
      nextPoll: currentTime + 3000 // Suggest next poll in 3 seconds
    };

    console.log(`✅ [POLL] Returning ${events.length} events`);

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Polling endpoint error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      events: [],
      timestamp: Date.now()
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});