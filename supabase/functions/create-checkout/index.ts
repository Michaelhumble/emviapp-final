
// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.4.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  console.log(`[CREATE-CHECKOUT] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Get authorization header from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: Missing authorization header");
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the request origin for success/cancel URLs
    const origin = req.headers.get("origin") || "https://emviapp.com";
    logStep("Request origin", { origin });
    
    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Create Admin Supabase client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the user from auth header
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData?.user) {
      logStep("ERROR: Unable to get user", { error: userError });
      return new Response(JSON.stringify({ error: userError?.message || "Unable to get user" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get Stripe API key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: Missing STRIPE_SECRET_KEY environment variable");
      return new Response(JSON.stringify({ error: "Server configuration error: Missing Stripe key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      logStep("Request body parsed", requestBody);
    } catch (error) {
      logStep("ERROR: Invalid JSON in request body", { error });
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const { postType, postDetails, pricingOptions } = requestBody;
    
    // Validate required parameters
    if (!postType) {
      logStep("ERROR: Missing postType parameter");
      return new Response(JSON.stringify({ error: "Missing postType parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!pricingOptions?.selectedPricingTier) {
      logStep("ERROR: Missing pricing tier");
      return new Response(JSON.stringify({ error: "Missing pricing tier" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For free tier, redirect to free post creation
    if (pricingOptions.selectedPricingTier === 'free') {
      logStep("ERROR: Free tier should not call this endpoint");
      return new Response(JSON.stringify({ error: "Free tier should use create-free-post endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Calculate price based on tier and auto-renew status
    let price = 0;
    let duration = 1; // default to 1 month
    
    // Set price based on tier (these are hardcoded values for now)
    switch (pricingOptions.selectedPricingTier) {
      case 'standard':
        price = 9.99;
        break;
      case 'gold':
        price = 19.99;
        break;
      case 'premium':
        price = 29.99;
        break;
      case 'diamond':
        price = 49.99;
        break;
      default:
        price = 9.99; // Default to standard price
    }
    
    // Apply auto-renew discount if enabled
    if (pricingOptions.autoRenew) {
      price = price * 0.95; // 5% discount
    }
    
    // Apply duration multiplier
    if (pricingOptions.duration) {
      duration = pricingOptions.duration;
      // If duration is > 1 month, apply discount based on duration
      if (duration > 1) {
        const discountMultiplier = Math.max(0.85, 1 - (duration * 0.03)); // 3% discount per month, max 15%
        price = price * discountMultiplier * duration;
      } else {
        price = price * duration;
      }
    }
    
    // Convert to cents for Stripe
    const priceInCents = Math.round(price * 100);
    
    logStep("Price calculated", { 
      tier: pricingOptions.selectedPricingTier,
      autoRenew: pricingOptions.autoRenew,
      duration,
      priceUSD: price,
      priceInCents
    });
    
    // Check if user already exists in Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Look for existing customer
    let customerId = null;
    try {
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing Stripe customer", { customerId });
      } else {
        logStep("No existing customer found, will create new one during checkout");
      }
    } catch (error) {
      logStep("ERROR: Failed to search for existing customer", { error });
      // Continue without customerId - Stripe will create one during checkout
    }

    // Temporarily create pending job record to get an ID
    let tempJobId = null;
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (duration * 30)); // Approximate 30 days per month
      
      const { data: tempJob, error: tempJobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'pending_payment',
          post_type: postType,
          pricingTier: pricingOptions.selectedPricingTier,
          expires_at: expiresAt.toISOString(),
          metadata: {
            processing_start: new Date().toISOString(),
            pricing_options: pricingOptions
          }
        })
        .select('id')
        .single();
        
      if (tempJobError) {
        logStep("ERROR: Failed to create temporary job record", { error: tempJobError });
      } else if (tempJob) {
        tempJobId = tempJob.id;
        logStep("Created temporary job record", { tempJobId });
      }
    } catch (error) {
      logStep("ERROR: Exception creating temporary job", { error });
      // Continue without tempJobId - not critical for checkout
    }
    
    // Set up success and cancel URLs
    const successUrl = `${origin}/post-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/post-canceled`;
    
    logStep("Setting up redirect URLs", { successUrl, cancelUrl });
    
    // Define line items for Stripe checkout
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${postType === 'job' ? 'Job Post' : 'Salon Post'} - ${pricingOptions.selectedPricingTier.toUpperCase()}`,
            description: `${duration} month${duration > 1 ? 's' : ''} posting${pricingOptions.autoRenew ? ' with auto-renewal' : ''}`,
          },
          unit_amount: priceInCents,
          tax_behavior: 'exclusive',
        },
        quantity: 1,
      }
    ];

    // Create Stripe checkout session
    try {
      logStep("Creating Stripe checkout session", { lineItems });
      
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        customer_email: customerId ? undefined : user.email,
        line_items: lineItems,
        mode: pricingOptions.autoRenew ? "subscription" : "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          user_id: user.id,
          post_type: postType,
          pricing_tier: pricingOptions.selectedPricingTier,
          auto_renew: pricingOptions.autoRenew ? "true" : "false",
          duration: duration.toString(),
          temp_job_id: tempJobId || "none"
        },
      });

      logStep("Checkout session created successfully", { 
        sessionId: session.id,
        url: session.url
      });
      
      // Create a payment log record
      if (tempJobId) {
        const { error: logError } = await supabaseAdmin
          .from('payment_logs')
          .insert({
            user_id: user.id,
            listing_id: tempJobId,
            plan_type: postType,
            payment_status: 'pending',
            stripe_session_id: session.id,
            auto_renew_enabled: pricingOptions.autoRenew,
            pricing_tier: pricingOptions.selectedPricingTier
          });
          
        if (logError) {
          logStep("WARNING: Failed to create payment log", { error: logError });
          // Non-critical error, continue with checkout
        } else {
          logStep("Created payment log record");
        }
      }

      // Return the successful response with checkout URL
      return new Response(JSON.stringify({ 
        url: session.url,
        session_id: session.id,
        success: true
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (stripeError) {
      logStep("ERROR: Stripe session creation failed", { 
        error: stripeError.message,
        code: stripeError.code,
        type: stripeError.type
      });
      
      return new Response(JSON.stringify({ 
        error: "Failed to create checkout session: " + stripeError.message,
        code: stripeError.code || "unknown",
        success: false
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    logStep("ERROR: Unhandled exception", { error: error.message });
    return new Response(JSON.stringify({ 
      error: "Unexpected error: " + error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
