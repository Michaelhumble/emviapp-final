import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('[STRIPE-CONNECT-WEBHOOK] Function invoked');

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 405,
      });
    }

    // Get webhook body
    const body = await req.text();
    console.log('[STRIPE-CONNECT-WEBHOOK] Received webhook body length:', body.length);

    // For now, we accept the webhook and log it
    // In production, you would:
    // 1. Verify the webhook signature using STRIPE_WEBHOOK_SECRET
    // 2. Parse the event and handle specific Connect events
    // 3. Update affiliate partner status based on account updates

    const webhookData = JSON.parse(body);
    console.log('[STRIPE-CONNECT-WEBHOOK] Event type:', webhookData.type);
    
    // Log important Connect events
    if (webhookData.type && webhookData.type.startsWith('account.')) {
      console.log('[STRIPE-CONNECT-WEBHOOK] Account event received:', {
        type: webhookData.type,
        account_id: webhookData.data?.object?.id
      });
    }

    return new Response(JSON.stringify({ 
      ok: true,
      received: true,
      event_type: webhookData.type || 'unknown'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[STRIPE-CONNECT-WEBHOOK] Error:', errorMessage);
    
    return new Response(JSON.stringify({ 
      ok: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});