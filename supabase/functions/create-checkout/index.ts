
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Checkout function called");
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the request body
    const body = await req.json();
    console.log("Request body:", body);
    
    // Get user info from JWT token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("Missing STRIPE_SECRET_KEY environment variable");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Initializing Stripe with key length:", stripeSecretKey.length);
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Extract data from request body
    const { postType, postDetails, pricingOptions } = body;

    if (!postType || !pricingOptions || !pricingOptions.selectedPricingTier) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate price based on tier and duration
    let priceAmount = 0;
    let durationMonths = pricingOptions.durationMonths || 1;
    
    // This is just an example - your actual pricing logic would go here
    switch (pricingOptions.selectedPricingTier) {
      case 'premium':
        priceAmount = 9900; // $99.00
        break;
      case 'featured':
        priceAmount = 4900; // $49.00
        break;
      case 'standard':
        priceAmount = 2900; // $29.00
        break;
      default:
        priceAmount = 1900; // $19.00
    }
    
    // Apply duration multiplier and any discounts
    if (durationMonths > 1) {
      // Simple duration discount example
      const discount = durationMonths >= 6 ? 0.2 : durationMonths >= 3 ? 0.1 : 0;
      priceAmount = Math.round(priceAmount * durationMonths * (1 - discount));
    }

    // Create or retrieve customer
    let customerId;
    
    // Look for existing customer
    const { data: customers } = await stripe.customers.list({
      email: user.email,
      limit: 1
    });
    
    if (customers && customers.length > 0) {
      customerId = customers[0].id;
      console.log("Using existing customer:", customerId);
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      });
      customerId = newCustomer.id;
      console.log("Created new customer:", customerId);
    }

    // First, create a payment log entry
    const { data: paymentLog, error: paymentLogError } = await supabase
      .from('payment_logs')
      .insert({
        user_id: user.id,
        payment_type: postType,
        amount: priceAmount,
        status: 'pending',
        tier: pricingOptions.selectedPricingTier,
        duration_months: durationMonths
      })
      .select()
      .single();
      
    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
    } else {
      console.log("Created payment log:", paymentLog);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${postType.toUpperCase()} - ${pricingOptions.selectedPricingTier} (${durationMonths} month${durationMonths > 1 ? 's' : ''})`,
              description: `${durationMonths} month${durationMonths > 1 ? 's' : ''} of ${pricingOptions.selectedPricingTier} visibility`,
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}&payment_log_id=${paymentLog?.id}`,
      cancel_url: `${req.headers.get("origin")}/${postType === 'job' ? 'post-job' : 'post-salon'}`,
      metadata: {
        user_id: user.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: durationMonths,
        payment_log_id: paymentLog?.id || '',
      },
    });

    console.log("Created Stripe session:", session.id);
    console.log("Session URL:", session.url);
    
    // Update the payment log with the session ID
    if (paymentLog) {
      const { error: updateError } = await supabase
        .from('payment_logs')
        .update({
          stripe_session_id: session.id
        })
        .eq('id', paymentLog.id);
        
      if (updateError) {
        console.error("Error updating payment log:", updateError);
      }
    }

    // Return the checkout URL to the client
    return new Response(
      JSON.stringify({ 
        url: session.url,
        session_id: session.id,
        payment_log_id: paymentLog?.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in checkout function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
