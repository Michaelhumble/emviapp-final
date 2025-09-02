import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('[AFFILIATE-CONNECT-STATUS] Function invoked');

  try {
    // Initialize Stripe with secret key
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    
    const stripe = new Stripe(stripeSecretKey, { 
      apiVersion: "2023-10-16" 
    });

    // Create Supabase client with service role for DB operations
    const supabaseServiceRole = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseServiceRole.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error(`Authentication failed: ${userError?.message}`);
    }

    console.log('[AFFILIATE-CONNECT-STATUS] User authenticated:', userData.user.id);

    // Get affiliate partner record
    const { data: affiliate, error: affiliateError } = await supabaseServiceRole
      .from('affiliate_partners')
      .select('*')
      .eq('user_id', userData.user.id)
      .single();

    if (affiliateError) {
      throw new Error(`Affiliate not found: ${affiliateError.message}`);
    }

    if (!affiliate.stripe_account_id) {
      return new Response(JSON.stringify({ 
        connected: false,
        connect_status: 'not_connected',
        charges_enabled: false,
        payouts_enabled: false
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log('[AFFILIATE-CONNECT-STATUS] Fetching Stripe account:', affiliate.stripe_account_id);

    // Fetch account details from Stripe
    const account = await stripe.accounts.retrieve(affiliate.stripe_account_id);
    
    console.log('[AFFILIATE-CONNECT-STATUS] Account retrieved:', {
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted
    });

    // Determine connection status
    let connectStatus = 'pending';
    if (account.charges_enabled && account.payouts_enabled) {
      connectStatus = 'connected';
    } else if (account.requirements?.currently_due && account.requirements.currently_due.length > 0) {
      connectStatus = 'restricted';
    }

    // Update affiliate partner status
    const updateData = {
      connect_status: connectStatus,
      last_connect_check: new Date().toISOString(),
      country: account.country || null,
      default_currency: account.default_currency || null
    };

    await supabaseServiceRole
      .from('affiliate_partners')
      .update(updateData)
      .eq('id', affiliate.id);

    console.log('[AFFILIATE-CONNECT-STATUS] Updated affiliate status:', connectStatus);

    return new Response(JSON.stringify({
      connected: connectStatus === 'connected',
      connect_status: connectStatus,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
      requirements: account.requirements,
      country: account.country,
      default_currency: account.default_currency,
      stripe_account_id: affiliate.stripe_account_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[AFFILIATE-CONNECT-STATUS] Error:', errorMessage);
    
    return new Response(JSON.stringify({ 
      ok: false, 
      error: errorMessage,
      connected: false,
      connect_status: 'error'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});