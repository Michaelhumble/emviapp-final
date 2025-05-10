
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    // Get Stripe key with better error handling
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Missing Stripe configuration. Please check server configuration.",
          debug: "Missing STRIPE_SECRET_KEY" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500 
        }
      );
    }
    
    // Initialize Stripe with the live key
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    console.log("Creating Stripe checkout session - START");
    
    // Parse request body to get job details and pricing info
    const requestData = await req.json().catch(() => ({}));
    const { postType, postDetails, pricingOptions, pricing } = requestData;
    
    // Generate metadata from request data
    const metadata = {
      post_type: postType || 'job',
      pricing_tier: pricingOptions?.selectedPricingTier || 'standard',
      expires_at: new Date(Date.now() + ((pricingOptions?.durationMonths || 1) * 30 * 24 * 60 * 60 * 1000)).toISOString()
    };

    console.log("Creating checkout with metadata:", metadata);
    
    // Use dynamic price from request or default to $49.99
    const unitAmount = pricing?.amountInCents || 4999;
    const productName = `${metadata.pricing_tier.charAt(0).toUpperCase() + metadata.pricing_tier.slice(1)} Job Post`;
    
    // Origin for success/cancel URLs
    const origin = req.headers.get("origin") || "https://emvi.app";
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: unitAmount, // Use dynamic price from request
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: metadata,
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
    });
    
    console.log("Stripe checkout session created successfully:", session.id);
    
    return new Response(
      JSON.stringify({
        success: true,
        redirect: session.url,
        url: session.url, // Including both formats for compatibility
        session_id: session.id
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
