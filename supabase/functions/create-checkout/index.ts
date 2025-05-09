
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      throw new Error("Missing Stripe secret key in environment");
    }
    
    // Initialize Stripe with the live key
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    console.log("Creating minimal Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Job Post - Premium',
          },
          unit_amount: 4999,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://emvi.app/payment-success',
      cancel_url: 'https://emvi.app/payment-cancelled',
    });
    
    console.log("Stripe checkout session created:", session.id);
    
    return new Response(
      JSON.stringify({
        url: session.url,
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
