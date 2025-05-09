
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Parse request body
    const { postType = "job", postDetails, pricingOptions } = await req.json();
    console.log("Request received:", { postType, pricingDetails: !!postDetails, pricingOptions });
    
    // Get user info from auth token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || ""
    );
    
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    console.log("User authenticated:", { id: user.id, email: user.email });
    
    // Check if the user already exists as a Stripe customer
    let customerId: string | undefined;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing Stripe customer:", customerId);
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
      console.log("Created new Stripe customer:", customerId);
    }
    
    // Determine price based on tier and duration
    const tier = pricingOptions?.selectedPricingTier || "standard";
    const duration = pricingOptions?.durationMonths || 1;
    
    // Create a payment record in the database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    const { data: paymentLog, error: paymentError } = await supabaseAdmin
      .from("payment_logs")
      .insert({
        user_id: user.id,
        post_type: postType,
        post_details: postDetails || {},
        pricing_options: pricingOptions || {},
        status: "pending",
        stripe_customer_id: customerId,
        price_amount: 4999  // $49.99 in cents
      })
      .select('id')
      .single();
      
    if (paymentError) {
      console.error("Error creating payment log:", paymentError);
      throw new Error("Failed to create payment record");
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: 4999,
          product_data: {
            name: `${postType.charAt(0).toUpperCase() + postType.slice(1)} Post - ${tier} (${duration} month${duration > 1 ? 's' : ''})`
          }
        },
        quantity: 1
      }],
      success_url: `${req.headers.get("origin") || "https://emviapp.app"}/post-success?payment_log_id=${paymentLog.id}`,
      cancel_url: `${req.headers.get("origin") || "https://emviapp.app"}/post-cancelled`,
      metadata: {
        payment_log_id: paymentLog.id,
        user_id: user.id
      }
    });
    
    // Update payment log with session ID
    await supabaseAdmin
      .from("payment_logs")
      .update({ 
        stripe_session_id: session.id,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentLog.id);
    
    return new Response(
      JSON.stringify({
        url: session.url,
        session_id: session.id,
        payment_log_id: paymentLog.id
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
