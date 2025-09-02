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

  console.log('[AFFILIATE-CONNECT-START] Function invoked');

  try {
    // Initialize Stripe with secret key
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    
    const stripe = new Stripe(stripeSecretKey, { 
      apiVersion: "2023-10-16" 
    });
    
    console.log('[AFFILIATE-CONNECT-START] Stripe initialized');

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
    
    console.log('[AFFILIATE-CONNECT-START] User authenticated:', userData.user.id);

    // Get affiliate partner record
    const { data: affiliate, error: affiliateError } = await supabaseServiceRole
      .from('affiliate_partners')
      .select('*')
      .eq('user_id', userData.user.id)
      .single();

    if (affiliateError) {
      throw new Error(`Affiliate not found: ${affiliateError.message}`);
    }

    console.log('[AFFILIATE-CONNECT-START] Affiliate partner found:', affiliate.id);

    let accountId = affiliate.stripe_account_id;
    
    // Create Stripe Connect account if doesn't exist
    if (!accountId) {
      console.log('[AFFILIATE-CONNECT-START] Creating new Stripe Connect account');
      
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true }
        },
        metadata: {
          affiliate_id: affiliate.id,
          user_id: userData.user.id
        }
      });
      
      accountId = account.id;
      console.log('[AFFILIATE-CONNECT-START] Created Stripe account:', accountId);

      // Update affiliate partner with stripe_account_id
      await supabaseServiceRole
        .from('affiliate_partners')
        .update({ 
          stripe_account_id: accountId,
          connect_status: 'pending',
          last_connect_check: new Date().toISOString()
        })
        .eq('id', affiliate.id);
    }

    // Create account link for onboarding
    const baseUrl = req.headers.get('origin') || 'https://www.emvi.app';
    
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/affiliate/settings?connect=refresh`,
      return_url: `${baseUrl}/affiliate/settings?connect=return`,
      type: 'account_onboarding'
    });

    console.log('[AFFILIATE-CONNECT-START] Account link created:', accountLink.url);

    return new Response(JSON.stringify({ 
      url: accountLink.url,
      account_id: accountId 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[AFFILIATE-CONNECT-START] Error:', errorMessage);
    
    return new Response(JSON.stringify({ 
      ok: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});