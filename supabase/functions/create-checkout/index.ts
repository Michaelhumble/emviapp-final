
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
    
    // Parse request body to get any metadata
    const requestData = await req.json().catch(() => ({}));
    const metadata = requestData.metadata || {};
    
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Job Post - Premium',
          },
          unit_amount: 4999, // exactly 4999 as integer
        },
        quantity: 1,
      }],
      mode: 'payment',
      metadata: metadata,
      success_url: 'https://emvi.app/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://emvi.app/payment-canceled',
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
