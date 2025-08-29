import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HubSpotEventPayload {
  eventName: string;
  email?: string;
  userId?: string;
  properties?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get authenticated user
    const {
      data: { user },
      error: userError
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Authentication failed')
    }

    // Parse request body
    const { eventName, email, userId, properties }: HubSpotEventPayload = await req.json()

    if (!eventName) {
      throw new Error('Event name is required')
    }

    // Get HubSpot Portal ID from environment
    const portalId = Deno.env.get('HUBSPOT_PORTAL_ID')
    if (!portalId) {
      throw new Error('HubSpot Portal ID not configured')
    }

    // Build HubSpot event payload
    const hubspotPayload = {
      email: email || user.email,
      eventName,
      properties: {
        userId: userId || user.id,
        timestamp: Date.now(),
        user_email: user.email,
        ...properties
      }
    }

    console.log('Sending HubSpot event:', { eventName, email: hubspotPayload.email })

    // Send to HubSpot Events API (if you have API access)
    // For free plan, we'll just track via frontend _hsq
    // This endpoint mainly logs and validates the event structure
    
    // Log event for debugging
    console.log('HubSpot Event tracked:', hubspotPayload)

    // Optionally store in Supabase for analytics
    const { error: insertError } = await supabaseClient
      .from('activity_log')
      .insert({
        user_id: user.id,
        action: 'hubspot_event',
        details: {
          event_name: eventName,
          properties: hubspotPayload.properties
        }
      })

    if (insertError) {
      console.warn('Failed to log event in activity_log:', insertError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Event tracked successfully',
        eventName 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('HubSpot event error:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})