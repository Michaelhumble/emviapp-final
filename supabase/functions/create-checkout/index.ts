
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { postType, postDetails, pricingOptions } = await req.json();
    
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Extract token from Auth header
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`Creating checkout for ${postType} by user: ${user.id}`);

    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16", 
    });

    // Check if user already exists as a Stripe customer
    let customerId;
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log(`Found existing customer: ${customerId}`);
    } else {
      // Create a new customer if one doesn't exist
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        }
      });
      customerId = newCustomer.id;
      console.log(`Created new customer: ${customerId}`);
    }
    
    // Get pricing details from pricingOptions
    const selectedPricingTier = pricingOptions.selectedPricingTier;
    const autoRenewEnabled = pricingOptions.autoRenew || false;
    const durationMonths = pricingOptions.durationMonths || 1;
    
    // Determine price based on selected tier
    let amount = 0;
    let planName = '';
    
    switch (selectedPricingTier) {
      case 'standard':
        amount = 999; // $9.99
        planName = 'Standard';
        break;
      case 'gold':
        amount = 1999; // $19.99
        planName = 'Gold Featured';
        break;
      case 'premium':
        amount = 4999; // $49.99
        planName = 'Premium';
        break;
      case 'diamond':
        amount = 149999; // $1,499.99
        planName = 'Diamond Featured';
        break;
      default:
        amount = 999; // Default to standard if not specified
        planName = 'Standard';
    }
    
    // Apply duration multiplier
    amount = amount * durationMonths;
    
    // Generate a unique reference ID for this transaction
    const referenceId = `${postType}_${user.id}_${Date.now()}`;
    
    // Create metadata to track this transaction
    const metadata = {
      user_id: user.id,
      post_type: postType,
      pricing_tier: selectedPricingTier,
      auto_renew: autoRenewEnabled.toString(),
      duration_months: durationMonths.toString(),
      reference_id: referenceId
    };
    
    // Determine checkout mode based on auto-renew setting
    const mode = autoRenewEnabled ? 'subscription' : 'payment';
    
    // Set the success and cancel URLs
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const successUrl = `${origin}/post-success?reference=${referenceId}&status=success`;
    const cancelUrl = `${origin}/post-job?reference=${referenceId}&status=canceled`;
    
    // Create line items for the checkout session
    const lineItems = [];
    
    if (mode === 'subscription') {
      // Create or retrieve a price for the subscription
      const price = await stripe.prices.create({
        unit_amount: amount,
        currency: 'usd',
        recurring: {
          interval: 'month',
          interval_count: durationMonths
        },
        product_data: {
          name: `${planName} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post - Auto-Renew`,
          description: `${durationMonths}-month subscription with auto-renewal`
        }
      });
      
      lineItems.push({
        price: price.id,
        quantity: 1
      });
    } else {
      // One-time payment
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${planName} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post`,
            description: `${durationMonths}-month listing`
          },
          unit_amount: amount,
        },
        quantity: 1,
      });
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata,
    });
    
    // Save checkout session information to Supabase for later reference
    const { data: checkoutData, error: checkoutError } = await supabaseClient.from('checkout_sessions').insert({
      user_id: user.id,
      stripe_session_id: session.id,
      post_type: postType,
      pricing_tier: selectedPricingTier,
      auto_renew: autoRenewEnabled,
      duration_months: durationMonths,
      reference_id: referenceId,
      amount: amount / 100, // Convert to dollars for readability
      status: 'pending'
    });
    
    if (checkoutError) {
      console.error("Error saving checkout session:", checkoutError);
      // Don't fail the entire operation if only the checkout log fails
    }
    
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
